# ============================================================
# api/index.py — v9.42 — TTS neuronal con velocidad en la síntesis
# (FastAPI — el stack que tu repo ya declara en requirements.txt:
#  fastapi + uvicorn + edge-tts + piper-tts)
# ------------------------------------------------------------
# CÓMO FUNCIONA EN VERCEL:
#   Vercel convierte este archivo en una función serverless
#   (api/index.py → /api/index) y el vercel.json que acompaña
#   este paquete redirige /api/tts → /api/index.
#   El handler es CATCH-ALL: responde POST en la ruta que sea
#   (/api/tts, /tts o /api/index), así no depende del path interno.
#
# CONTRATO CON LA APP (idéntico al tts.py de referencia v9.40):
#   POST { text, lang, voice, speed }  →
#   200 { audio(b64), mime: "audio/mpeg", voice, speed }
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


async def tts_endpoint(body):
    text = str(body.get("text") or "").strip()
    if not text:
        return JSONResponse({"error": "text requerido"}, status_code=400)

    try:
        speed = float(body.get("speed", 1) or 1)
    except (TypeError, ValueError):
        speed = 1.0
    speed = min(1.5, max(0.5, speed))  # clamp defensivo

    lang, voice_name = _pick_voice(body)
    rate = speed_to_rate(speed)

    try:
        # v9.40: la velocidad se hornea EN la síntesis (sin eco en el cliente)
        audio = await synth_edge_bytes(text, voice_name, rate=rate)
        return JSONResponse({
            "audio": base64.b64encode(audio).decode("ascii"),
            "mime": "audio/mpeg",
            "voice": voice_name,
            "speed": speed,  # ← eco: la app NO aplica playbackRate
        })
    except Exception as e_edge:
        try:
            audio = synth_piper(text, lang)
            return JSONResponse({
                "audio": base64.b64encode(audio).decode("ascii"),
                "mime": "audio/wav",
                "voice": "piper",
                # sin "speed": la app compensa (compatible)
            })
        except Exception as e_piper:
            return JSONResponse({
                "error": "tts no disponible",
                "detalle": str(e_edge)[:200] + " | piper: " + str(e_piper)[:200],
            }, status_code=502)


# CATCH-ALL: responde POST en cualquier ruta (/api/tts, /tts, /api/index…)
@app.post("/{full_path:path}")
async def catch_post(request: Request, full_path: str = ""):
    return await tts_endpoint(_parse_body(await request.body()))


# GET informativo: al visitar la URL en el navegador debe responder JSON
# (si da 404, la función no se construyó — mirá LEEME-REPARAR-TTS-2.md)
@app.get("/{full_path:path}")
async def catch_get(full_path: str = ""):
    return {
        "ok": True,
        "service": "tts",
        "version": "v9.42",
        "hint": "POST {text, lang, voice, speed} → {audio, mime, voice, speed}",
    }
