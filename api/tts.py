# ============================================================
# api/tts.py — v9.44 — TTS neuronal + CACHÉ (LRU memoria + CDN)
# (FastAPI — el stack que tu repo ya declara en requirements.txt:
#  fastapi + uvicorn + edge-tts)
# ------------------------------------------------------------
# QUÉ CAMBIÓ EN v9.44 (caché de audios en el servidor):
#   1) GET ?text=…&lang=…&voice=…&speed=… — NUEVO camino cacheable:
#      responde con Cache-Control immutable → el CDN de Vercel
#      guarda el audio y la 2.ª petición responde en ~0,1-0,3 s
#      sin llegar al server. Visitar la URL SIN ?text= sigue
#      respondiendo el JSON "tell" (indica que la función vive).
#   2) LRU en memoria (300 audios): si el CDN expira, la instancia
#      tibia responde sin re-sintetizar. Es por instancia (se vacía
#      en arranques fríos); la capa real y compartida es el CDN.
#   3) La velocidad sigue horneada en la síntesis (contrato v9.40)
#      y SIEMPRE forma parte de la clave de caché: 0.85x y 1x son
#      audios distintos, jamás se mezclan.
#   POST { text, lang, voice, speed } sigue EXACTAMENTE igual que
#   en v9.43 (solo suma el campo informativo "cached") — total
#   compatibilidad con la app de cualquier versión.
#
# CONTRATO CON LA APP:
#   POST { text, lang, voice, speed } →
#   200 { audio(b64), mime: "audio/mpeg", voice, speed, cached }
#   GET  ?text=…&lang=…&voice=…&speed=… → mismo JSON + Cache-Control
#   - speed es opcional (default 1). edge-tts sintetiza YA lento
#     con rate="-15%" para speed 0.85: el cliente NO aplica
#     playbackRate (sin eco). El eco de "speed" en la respuesta
#     es lo que le avisa a la app.
#   - Si edge-tts falla → Piper (sin "speed" en la respuesta →
#     la app compensa con playbackRate, compatible siempre).
#   - Si Piper tampoco → 502 {"error": ...} → la app usa la voz
#     del sistema (comportamiento de siempre, sin romper nada).
# ============================================================

import base64
import io
import json
import os
from collections import OrderedDict

import edge_tts
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# La app abre el audio desde su propio dominio (same-origin): CORS no es
# estrictamente necesario, pero no molesta y facilita pruebas locales.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# Mapeo de claves del cliente → voces neuronales de Edge.
# El cliente valida con VOICE_EXPECT: f→Xiaoxiao, m→Yunjian,
# f2→Xiaobei, m2→Yunxi (si devuelve otra, avisa "server viejo").
# ------------------------------------------------------------
VOICES = {
    "zh-CN": {
        "f":  "zh-CN-XiaoxiaoNeural",
        "m":  "zh-CN-YunjianNeural",
        "f2": "zh-CN-XiaobeiNeural",
        "m2": "zh-CN-YunxiNeural",
    },
    "es-ES": {
        "f":  "es-ES-ElviraNeural",
        "m":  "es-ES-AlvaroNeural",
        "f2": "es-ES-ElviraNeural",
        "m2": "es-ES-AlvaroNeural",
    },
}
DEFAULT_VOICE_KEY = "f"

# ------------------------------------------------------------
# v9.44 — Caché LRU en memoria del serverless.
# Clave: lang|voz_resuelta|speed|text (la velocidad SIEMPRE en la
# clave: el mismo texto a otra velocidad es OTRO audio). Guarda el
# payload JSON completo (audio b64 incluido): ~300 entradas ≈ 15 MB.
# ------------------------------------------------------------
_TTS_CACHE = OrderedDict()
_TTS_CACHE_MAX = 300


def _cache_key(text, lang, voice_name, speed):
    return f"{lang}|{voice_name}|{speed:.2f}|{text}"


def _cache_get(key):
    payload = _TTS_CACHE.get(key)
    if payload is not None:
        _TTS_CACHE.move_to_end(key)
    return payload


def _cache_put(key, payload):
    _TTS_CACHE[key] = payload
    _TTS_CACHE.move_to_end(key)
    while len(_TTS_CACHE) > _TTS_CACHE_MAX:
        _TTS_CACHE.popitem(last=False)  # expulsa el más viejo


def _json_payload(payload, via_get):
    # GET → cacheable por el CDN (audios deterministas: mismo
    # text+voz+speed = mismo mp3). POST → sin cabeceras de caché
    # (el CDN no cachea POST; el navegador tampoco debe intentar).
    if via_get:
        return JSONResponse(payload, headers={
            "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
            # marca de contrato v9.44: el cliente solo acepta un GET que la
            # traiga — así un server VIEJO (que respondería el "tell" sin
            # audio con 200) no deja a la app sin voz: cae al POST.
            "X-TTS-Audio": "1",
        })
    return JSONResponse(payload)


def speed_to_rate(speed):
    """0.85 → '-15%', 1.0 → '+0%', 1.2 → '+20%' (formato edge-tts)."""
    return f"{round((speed - 1) * 100):+d}%"


async def synth_edge_bytes(text, voice_name, rate=None):
    """Sintetiza con edge-tts. Devuelve mp3 bytes (velocidad horneada)."""
    kwargs = {}
    if rate and rate not in ("+0%", "-0%", "0%"):
        kwargs["rate"] = rate
    communicate = edge_tts.Communicate(text, voice_name, **kwargs)
    buf = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
    return buf.getvalue()


def synth_piper(text, lang):
    """Fallback local cuando edge-tts falla (voz robótica de reserva).

    SIN cambio de velocidad: la respuesta de Piper NO lleva "speed"
    → la app compensa con playbackRate como siempre (compatible).
    Si tenías tu propia implementación Piper, dejala acá dentro.
    """
    model = os.environ.get("PIPER_MODEL") or ""
    if not model:
        # buscá modelos .onnx junto a este archivo (api/models/xxx.onnx)
        base = os.path.dirname(os.path.abspath(__file__))
        mdir = os.path.join(base, "models")
        pref = "es" if lang and lang.startswith("es") else "zh"
        if os.path.isdir(mdir):
            for fn in sorted(os.listdir(mdir)):
                if fn.endswith(".onnx") and pref in fn:
                    model = os.path.join(mdir, fn)
                    break
    if not model or not os.path.isfile(model):
        raise RuntimeError("Piper sin modelo configurado (env PIPER_MODEL o api/models/*.onnx)")
    from piper import PiperVoice  # import tardío: solo si hay modelo
    voice = PiperVoice.load(model)
    wav = io.BytesIO()
    voice.synthesize(text, wav)
    return wav.getvalue()


def _parse_body(raw):
    try:
        return json.loads((raw or b"").decode("utf-8") or "{}")
    except Exception:
        return {}


def _pick_voice(body):
    lang = str(body.get("lang") or "zh-CN")
    key = str(body.get("voice") or DEFAULT_VOICE_KEY)
    voices = VOICES.get(lang, VOICES["zh-CN"])
    return lang, voices.get(key, voices[DEFAULT_VOICE_KEY])


async def tts_endpoint(body, via_get=False):
    text = str(body.get("text") or "").strip()
    if not text:
        return JSONResponse({"error": "text requerido"}, status_code=400)
    if via_get and len(text) > 400:
        # por GET solo viajan frases; textos largos → el cliente usa POST
        return JSONResponse({"error": "text demasiado largo para GET"}, status_code=400)

    try:
        speed = float(body.get("speed", 1) or 1)
    except (TypeError, ValueError):
        speed = 1.0
    speed = min(1.5, max(0.5, speed))  # clamp defensivo
    speed = round(speed, 2)            # clave y eco estables (0.85, no 0.8500001)

    lang, voice_name = _pick_voice(body)
    key = _cache_key(text, lang, voice_name, speed)

    # v9.44 — 1.ª capa: LRU en memoria (sirve sin re-sintetizar)
    hit = _cache_get(key)
    if hit is not None:
        payload = dict(hit)
        payload["cached"] = True
        return _json_payload(payload, via_get)

    rate = speed_to_rate(speed)

    try:
        # v9.40: la velocidad se hornea EN la síntesis (sin eco en el cliente)
        audio = await synth_edge_bytes(text, voice_name, rate=rate)
        payload = {
            "audio": base64.b64encode(audio).decode("ascii"),
            "mime": "audio/mpeg",
            "voice": voice_name,
            "speed": speed,  # ← eco: la app NO aplica playbackRate
        }
        _cache_put(key, payload)
        out = dict(payload)
        out["cached"] = False
        return _json_payload(out, via_get)
    except Exception as e_edge:
        try:
            audio = synth_piper(text, lang)
            payload = {
                "audio": base64.b64encode(audio).decode("ascii"),
                "mime": "audio/wav",
                "voice": "piper",
                # sin "speed": la app compensa (compatible)
            }
            _cache_put(key, payload)
            out = dict(payload)
            out["cached"] = False
            return _json_payload(out, via_get)
        except Exception as e_piper:
            return JSONResponse({
                "error": "tts no disponible",
                "detalle": str(e_edge)[:200] + " | piper: " + str(e_piper)[:200],
            }, status_code=502)


# CATCH-ALL: responde POST en cualquier ruta (/api/tts, /tts, /api/index…)
@app.post("/{full_path:path}")
async def catch_post(request: Request, full_path: str = ""):
    return await tts_endpoint(_parse_body(await request.body()))


# GET: con ?text=… es una petición TTS cacheable (v9.44); sin ?text= es
# el "tell" informativo — al visitar la URL en el navegador debe responder
# JSON (si da 404, la función no se construyó — mirá LEEME-REPARAR-TTS-3.md)
@app.get("/{full_path:path}")
async def catch_get(request: Request, full_path: str = ""):
    qp = request.query_params
    text = (qp.get("text") or "").strip()
    if text:
        body = {
            "text": text,
            "lang": qp.get("lang") or "zh-CN",
            "voice": qp.get("voice") or DEFAULT_VOICE_KEY,
            "speed": qp.get("speed") or 1,
        }
        return await tts_endpoint(body, via_get=True)
    return {
        "ok": True,
        "service": "tts",
        "version": "v9.44",
        "cache": f"LRU memoria {_TTS_CACHE_MAX} audios + CDN (GET immutable)",
        "hint": "GET ?text=…&lang=…&voice=…&speed=… | POST {text, lang, voice, speed}",
    }
