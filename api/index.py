# ============================================================
# api/index.py — v9.49 — TTS neuronal + CACHÉ + voces 🇦🇷/🇹🇼 (LRU memoria + CDN)
# (FastAPI — el stack que tu repo ya declara en requirements.txt:
#  fastapi + uvicorn + edge-tts)
# ------------------------------------------------------------
# CÓMO FUNCIONA EN VERCEL:
#   Vercel convierte este archivo en una función serverless
#   (api/index.py → /api/index) y el vercel.json ya subido al repo
#   redirige /api/tts → /api/index. El handler es CATCH-ALL:
#   responde POST y GET en la ruta que sea (/api/tts, /tts o
#   /api/index), así no depende del path interno.
#
# HOTFIX /api/tts 502 (oct-2026) — reintentos, semáforo y diagnóstico:
#   · edge-tts >=7.3.1,<8 (requirements.txt): el servicio de Microsoft pasó al token
#     Sec-MS-GEC «v2» y edge-tts 7.2.x quedó con «No audio was received».
#   · Hasta 2 intentos (NoAudioReceived, 403, 5xx, WebSocket, timeout) con espera 0,4-0,8 s
#     al azar; tope por intento ~8 s y total ~12 s (más holgado para textos largos).
#   · Semáforo: 2 síntesis simultáneas por instancia; si no hay lugar en 4 s → 503 «busy».
#   · Errores: Cache-Control no-store y {"error":"tts no disponible","codigo":"<corto>"}.
#   · stderr: una línea por pedido, sin textos (voz, rate, largo, intento, resultado, excepción,
#     duración, versión de edge-tts). GET sin parámetros → {ok, edge_tts}.
#   api/index.py y api/tts.py llevan EL MISMO código (tests/api-tts falla si divergen).
#
# VOZ ALTERNATIVA (zh-TW): si una voz de Taiwán (tw-f, tw-m) agota sus reintentos con «sin_audio»,
#   se prueba UNA vez la continental del mismo género (f → Xiaoxiao, m → Yunjian). Solo para sin_audio
#   (no para busy ni timeouts). Esa respuesta NUNCA se guarda: Cache-Control: no-store, X-TTS-Fallback: 1,
#   X-TTS-Audio: 1, campo fallback:true en el JSON, fuera de la caché en memoria; el service worker tampoco
#   la guarda. Tope ~4,5 s por intento de Taiwán y ~12 s en total.
#
# QUÉ CAMBIÓ EN v9.49 (voces 🇦🇷 argentina y 🇹🇼 taiwanesa):
#   el mapa VOICES suma es-AR (Elena/Tomás) y zh-TW
#   (HsiaoChen/YunJhe); el cliente las pide con lang es-AR/zh-TW
#   y claves ar-f/ar-m/tw-f/tw-m. TODO lo demás (contrato v9.40
#   de velocidad y v9.44 de caché GET/CDN + LRU) queda IGUAL.
#
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
# CONTRATO CON LA APP (idéntico al tts.py de referencia):
#   POST { text, lang, voice, speed } →
#   200 { audio(b64), mime: "audio/mpeg", voice, speed, cached }
#   GET  ?text=…&lang=…&voice=…&speed=… → mismo JSON + Cache-Control
# ============================================================
import asyncio
import base64
import io
import json
import random
import sys
import time
from collections import OrderedDict

import edge_tts
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# v9.5x: antes "*" (cualquier origen). CORS lo hacen cumplir los
# NAVEGADORES: no frena un script/servidor que le pegue directo a la
# URL (para eso está el límite de tamaño de abajo + el rate limit del
# Firewall de Vercel, fuera de este archivo). Lo que sí evita: que OTRO
# sitio web use fetch() desde el navegador de un visitante tuyo para
# gastar tu cuota en su nombre. Incluye localhost para pruebas locales.
# v9.5x: el patrón de preview quedó ANCLADO al proyecto Y al equipo real
# de Vercel (verificado contra una URL de preview real:
# huayudiario-2wrxiu3i0-aprende-chino.vercel.app) — "huayudiario" es el
# nombre del proyecto en Vercel (el dominio de producción de abajo,
# app-chino-espa-ol.vercel.app, es un alias custom del mismo proyecto,
# no el slug real) y "aprende-chino" el equipo. El tramo del medio
# (hash de deploy o nombre de rama) es libre A PROPÓSITO — lo arbitrario
# ahí no es una brecha: para que un origen matchee hace falta ARRANCAR
# con "huayudiario-" y TERMINAR con "-aprende-chino.vercel.app", y esos
# dos extremos los asigna Vercel según el proyecto/equipo real (los
# slugs de equipo son únicos en Vercel: nadie más puede registrar
# "aprende-chino"). Antes el sufijo quedaba libre de punta a punta
# (".../app-chino-espa-ol-CUALQUIER-COSA.vercel.app" matcheaba) —
# ESO sí era una brecha real, ya cerrada acá.
ALLOWED_ORIGINS_REGEX = (
    r"^https://app-chino-espa-ol\.vercel\.app$"
    r"|^https://huayudiario-[a-z0-9-]+-aprende-chino\.vercel\.app$"
    r"|^http://localhost(:\d+)?$"
    r"|^http://127\.0\.0\.1(:\d+)?$"
)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=ALLOWED_ORIGINS_REGEX,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-TTS-Audio", "X-TTS-Fallback", "Retry-After"],
)

# ------------------------------------------------------------
# Mapeo de claves del cliente → voces neuronales de Edge.
# El cliente valida con VOICE_EXPECT: f→Xiaoxiao, m→Yunjian,
# f2→Xiaobei, m2→Yunxi (si devuelve otra, avisa "server viejo").
# ------------------------------------------------------------
# v9.49 — el mapa ahora cubre los 4 idiomas que pide la app:
#   zh-CN  → Xiaoxiao/Yunjian/Xiaobei/Yunxi (contrato v9.4/v9.5)
#   zh-TW  → HsiaoChen (f) y YunJhe (m): 普通话 con acento de Taiwan
#            (claves tw-f/tw-m del cliente v9.49; f2/m2 por simetría)
#   es-ES  → Elvira/Alvaro (España, de siempre)
#   es-AR  → Elena (f) y Tomás (m): VOZ ARGENTINA (claves ar-f/ar-m
#            del cliente v9.49). Voces verificadas en vivo contra el
#            servicio de edge-tts (2026-09-23): síntesis OK con y sin
#            rate="-15%" (contrato de velocidad v9.40 intacto).
VOICES = {
    "zh-CN": {
        "f":  "zh-CN-XiaoxiaoNeural",
        "m":  "zh-CN-YunjianNeural",
        "f2": "zh-CN-XiaobeiNeural",
        "m2": "zh-CN-YunxiNeural",
    },
    "zh-TW": {
        "f":  "zh-TW-HsiaoChenNeural",
        "m":  "zh-TW-YunJheNeural",
    },
    "es-ES": {
        "f":  "es-ES-ElviraNeural",
        "m":  "es-ES-AlvaroNeural",
    },
    "es-AR": {
        "f":  "es-AR-ElenaNeural",
        "m":  "es-AR-TomasNeural",
    },
}
DEFAULT_VOICE_KEY = "f"

# v9.5x: tope de longitud para el camino POST (ver uso en tts_endpoint).
POST_TEXT_MAX = 2000

# ------------------------------------------------------------
# v9.44 — Caché LRU en memoria del serverless.
# Clave: lang|voz_resuelta|speed|text (la velocidad SIEMPRE en la
# clave: el mismo texto a otra velocidad es OTRO audio). Guarda el
# payload JSON completo (audio b64 incluido): ~300 entradas ≈ 15 MB.
# ------------------------------------------------------------
_TTS_CACHE = OrderedDict()
_TTS_CACHE_MAX = 300


def _cache_key(text, lang, voice_name, speed, want_boundaries=False):
    # v9.7x: want_boundaries suma a la clave — sin esto, un pedido CON
    # karaoke podría pegarle a un caché viejo SIN boundaries (y quedarse
    # sin ellos silenciosamente) o viceversa.
    return f"{lang}|{voice_name}|{speed:.2f}|{int(bool(want_boundaries))}|{text}"


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


# ------------------------------------------------------------
# Hotfix 502 — reintentos, semáforo y registro (ver cabecera).
# ------------------------------------------------------------
MAX_ATTEMPTS = 2
BACKOFF_MIN_S = 0.4
BACKOFF_MAX_S = 0.8
ATTEMPT_TIMEOUT_S = 8.0     # tope por intento (textos de ≤ SHORT_TEXT_CHARS)
TOTAL_BUDGET_S = 12.0       # tope total por pedido (reintento incluido)
MIN_RETRY_WINDOW_S = 1.0    # si queda menos que esto, no se reintenta
SHORT_TEXT_CHARS = 160      # más allá (Podcast, Lector) el tope por intento crece con el largo
MAX_ATTEMPT_TIMEOUT_S = 25.0
MAX_CONCURRENT = 2          # síntesis simultáneas por instancia
QUEUE_WAIT_S = 4.0          # espera máxima por un lugar; si se agota → 503 «busy»
RETRY_AFTER_S = 2
EDGE_TTS_MIN = (7, 3, 1)
# Voz alternativa para zh-TW (ver cabecera)
TW_ATTEMPT_CAP_S = 4.5      # tope por intento de una voz de Taiwán
TW_PHASE_BUDGET_S = 7.0     # tope de la fase de Taiwán (reintento incluido): deja >= 5 s para la continental
FALLBACK_MIN_WINDOW_S = 2.0 # si queda menos que esto del total, no se prueba la continental
# TEMPORAL: voces de Taiwán que casi siempre dan «sin_audio» (medido: tw-m en 502 casi siempre; tw-f y las continentales en 200).
# Con UN solo intento antes del respaldo a la continental (las demás voces siguen con MAX_ATTEMPTS). Vaciar para apagarlo.
TW_UN_SOLO_INTENTO = {"zh-TW-YunJheNeural"}


def _edge_tts_version():
    try:
        from importlib import metadata
        return metadata.version("edge-tts")
    except Exception:
        return str(getattr(edge_tts, "__version__", "") or "desconocida")


EDGE_TTS_VERSION = _edge_tts_version()


def _version_tuple(v):
    out = []
    for part in str(v).split("."):
        digits = "".join(ch for ch in part if ch.isdigit())
        out.append(int(digits) if digits else 0)
    return tuple(out)


def _log(line):
    """Una línea a stderr (Vercel la guarda en los logs). Nunca rompe el pedido."""
    try:
        print(line, file=sys.stderr, flush=True)
    except Exception:
        pass


_log("tts-boot edge_tts=%s%s" % (
    EDGE_TTS_VERSION,
    "" if _version_tuple(EDGE_TTS_VERSION) >= EDGE_TTS_MIN else " AVISO=menor_a_7.3.1(token_v2)"))

_SEM = None
_SEM_LOOP = None


def _semaphore():
    """Un semáforo por event loop (en Vercel hay uno solo; los tests crean varios)."""
    global _SEM, _SEM_LOOP
    loop = asyncio.get_running_loop()
    if _SEM is None or _SEM_LOOP is not loop:
        _SEM = asyncio.Semaphore(MAX_CONCURRENT)
        _SEM_LOOP = loop
    return _SEM


async def _acquire_slot():
    """Devuelve el semáforo ya adquirido, o None si no hubo lugar en QUEUE_WAIT_S."""
    sem = _semaphore()
    task = asyncio.ensure_future(sem.acquire())
    done, _ = await asyncio.wait({task}, timeout=QUEUE_WAIT_S)
    if task in done:
        return sem
    task.cancel()
    try:
        await task
        sem.release()  # se concedió justo antes de cancelar: no perder el lugar
    except asyncio.CancelledError:
        pass
    return None


class _EmptyAudio(Exception):
    """edge-tts terminó sin error pero sin bytes de audio."""


def _classify(exc):
    """(codigo corto, ¿vale la pena reintentar?). Por NOMBRE de clase, sin importar aiohttp."""
    names = {c.__name__ for c in type(exc).__mro__}
    status = getattr(exc, "status", None)
    if isinstance(exc, (asyncio.TimeoutError, TimeoutError)):
        return "timeout", True
    if names & {"NoAudioReceived", "_EmptyAudio"}:
        return "sin_audio", True
    if "ClientResponseError" in names:  # incluye el rechazo del handshake del WebSocket
        if status == 403:
            return "403", True
        if isinstance(status, int) and status >= 500:
            return "5xx", True
        if status == 429:
            return "limite", False
        return "http_%s" % status, False
    if names & {"WebSocketError", "ClientError", "ServerDisconnectedError"} or isinstance(exc, ConnectionError):
        return "ws", True
    if "SkewAdjustmentError" in names:
        return "reloj", True
    if names & {"UnexpectedResponse", "UnknownResponse"}:
        return "respuesta", False
    return "error", False


def _budget(n_chars):
    """(tope por intento, tope total) en segundos; crecen con el largo para no cortar el Podcast."""
    attempt = ATTEMPT_TIMEOUT_S
    if n_chars > SHORT_TEXT_CHARS:
        attempt = min(MAX_ATTEMPT_TIMEOUT_S, attempt + (n_chars - SHORT_TEXT_CHARS) * 0.04)
    return attempt, max(TOTAL_BUDGET_S, attempt + (TOTAL_BUDGET_S - ATTEMPT_TIMEOUT_S))


async def synth_with_retry(text, voice_name, rate, want_boundaries, attempt_cap=None, total_cap=None, max_attempts=None):
    """Hasta MAX_ATTEMPTS intentos. Devuelve (audio, boundaries, intentos, fallos, codigo|None, codigos).

    fallos = nombres de las excepciones vistas; codigos = su código corto, en orden. Si no hubo éxito:
    audio es None y codigo es el de la última falla. attempt_cap / total_cap pisan los topes por defecto.
    """
    cap_a, cap_t = _budget(len(text))
    attempt_cap = cap_a if attempt_cap is None else attempt_cap
    total_cap = cap_t if total_cap is None else total_cap
    max_attempts = MAX_ATTEMPTS if max_attempts is None else max_attempts
    t0 = time.monotonic()
    fallos = []
    codigos = []
    codigo = "error"
    for intento in range(1, max_attempts + 1):
        if intento > 1:
            await asyncio.sleep(random.uniform(BACKOFF_MIN_S, BACKOFF_MAX_S))
        restante = total_cap - (time.monotonic() - t0)
        if intento > 1 and restante < MIN_RETRY_WINDOW_S:
            return None, None, intento - 1, fallos, codigo, codigos
        try:
            audio, boundaries = await asyncio.wait_for(
                synth_edge_bytes(text, voice_name, rate=rate, want_boundaries=want_boundaries),
                timeout=min(attempt_cap, restante))
            if not audio:
                raise _EmptyAudio("sin bytes de audio")
            return audio, boundaries, intento, fallos, None, codigos
        except Exception as e:  # noqa: BLE001 — se clasifica y se decide si reintentar
            codigo, reintentable = _classify(e)
            fallos.append(type(e).__name__)
            codigos.append(codigo)
            if not reintentable:
                return None, None, intento, fallos, codigo, codigos
    return None, None, max_attempts, fallos, codigo, codigos


def _error(codigo, status=502, retry_after=None):
    headers = {"Cache-Control": "no-store"}
    if retry_after:
        headers["Retry-After"] = str(retry_after)
    return JSONResponse({"error": "tts no disponible", "codigo": codigo}, status_code=status, headers=headers)


def _plain_error(msg, status):
    return JSONResponse({"error": msg}, status_code=status, headers={"Cache-Control": "no-store"})


def _log_request(voice, rate, largo, intento, res, fallos, t0, cola_ms, via, fallback=0):
    _log("tts voz=%s rate=%s largo=%d via=%s intento=%d res=%s exc=%s fallback=%d dur_ms=%d cola_ms=%d edge_tts=%s" % (
        voice, rate, largo, via, intento, res, ",".join(fallos) or "-", fallback,
        int((time.monotonic() - t0) * 1000), cola_ms, EDGE_TTS_VERSION))


def _continental_de(voice_name):
    """zh-TW-HsiaoChenNeural → zh-CN-XiaoxiaoNeural (f); zh-TW-YunJheNeural → zh-CN-YunjianNeural (m)."""
    for k, v in VOICES["zh-TW"].items():
        if v == voice_name:
            return VOICES["zh-CN"].get(k)
    return None


def speed_to_rate(speed):
    """0.85 → '-15%', 1.0 → '+0%', 1.2 → '+20%' (formato edge-tts)."""
    return f"{round((speed - 1) * 100):+d}%"


async def synth_edge_bytes(text, voice_name, rate=None, want_boundaries=False):
    """Sintetiza con edge-tts. Devuelve (mp3 bytes, boundaries|None).

    v9.7x — karaoke con timestamps REALES: si want_boundaries, se pide
    boundary="WordBoundary" (edge-tts 7.2.8 lo soporta nativo, confirmado
    leyendo edge_tts/communicate.py — no docs genéricas) y se juntan los
    eventos WordBoundary del stream junto con el audio. offset/duration
    vienen en ticks de 100ns (10_000_000 ticks = 1s) → se convierten a ms
    acá para que el cliente no tenga que saber nada de "ticks". Si no se
    pidieron boundaries, se devuelve None (mismo payload de siempre).
    """
    kwargs = {}
    if rate and rate not in ("+0%", "-0%", "0%"):
        kwargs["rate"] = rate
    if want_boundaries:
        kwargs["boundary"] = "WordBoundary"
    communicate = edge_tts.Communicate(text, voice_name, **kwargs)
    buf = io.BytesIO()
    boundaries = [] if want_boundaries else None
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
        elif want_boundaries and chunk["type"] == "WordBoundary":
            boundaries.append({
                "text": chunk["text"],
                "offsetMs": chunk["offset"] / 10000.0,
                "durMs": chunk["duration"] / 10000.0,
            })
    return buf.getvalue(), boundaries


def _parse_body(raw):
    try:
        return json.loads((raw or b"").decode("utf-8") or "{}")
    except Exception:
        return {}


def _pick_voice(body):
    lang = str(body.get("lang") or "zh-CN")
    key = str(body.get("voice") or DEFAULT_VOICE_KEY)
    # v9.50 fix: el cliente manda claves con prefijo de locale para las
    # voces nuevas (ar-f/ar-m/tw-f/tw-m), pero VOICES["es-AR"]/["zh-TW"]
    # usan "f"/"m" pelado. Sin esto, voices.get(key, ...) nunca matcheaba
    # y TODO pedido (f o m) caía al DEFAULT_VOICE_KEY → siempre femenina.
    if "-" in key:
        key = key.split("-")[-1]  # ar-f→f, ar-m→m, tw-f→f, tw-m→m
    voices = VOICES.get(lang, VOICES["zh-CN"])
    return lang, voices.get(key, voices[DEFAULT_VOICE_KEY])


def _truthy(v):
    return str(v).strip().lower() in ("1", "true", "yes", "on")


async def tts_endpoint(body, via_get=False):
    text = str(body.get("text") or "").strip()
    if not text:
        return _plain_error("text requerido", 400)
    if via_get and len(text) > 400:
        # por GET solo viajan frases; textos largos → el cliente usa POST
        return _plain_error("text demasiado largo para GET", 400)
    if len(text) > POST_TEXT_MAX:
        # v9.5x: tope también en POST (antes solo lo tenía GET). El pedido
        # legítimo más largo hoy es la lección completa del Podcast
        # (~700 caracteres, HSK9/TOCFL-C1 — playLesson() en podcast.js, la
        # única llamada que manda MÁS de una oración/línea suelta por
        # pedido). El Lector (reader.js) puede recibir hasta 5000
        # caracteres de una lectura de "Mis lecturas" (openInReader() los
        # mete con ta.value = entry.text, esquivando el maxlength=1200 del
        # textarea — ese atributo solo limita lo tecleado a mano), pero
        # ahora SIEMPRE trocea en ≤150 caracteres por pedido (readerHardSplit
        # en reader.js corta duro cualquier tramo que la puntuación no
        # alcance a partir, por carácter en chino / por palabra en español)
        # — ya no es un caso a cubrir acá. 2000 deja margen real sobre el
        # máximo legítimo de hoy (~700) sin aceptar un texto arbitrariamente
        # grande.
        return _plain_error("text demasiado largo", 413)

    try:
        speed = float(body.get("speed", 1) or 1)
    except (TypeError, ValueError):
        speed = 1.0
    speed = min(1.5, max(0.5, speed))  # clamp defensivo
    speed = round(speed, 2)            # clave y eco estables (0.85, no 0.8500001)

    # v9.7x: karaoke con timestamps reales — opt-in (el cliente solo lo
    # pide cuando el karaoke está activado Y el idioma es chino; acá se
    # confía en lo que mande, no se fuerza por lang para no acoplar el
    # servidor a una decisión de UI del cliente).
    want_boundaries = _truthy(body.get("karaoke"))

    lang, voice_name = _pick_voice(body)
    key = _cache_key(text, lang, voice_name, speed, want_boundaries)

    t0 = time.monotonic()
    via = "get" if via_get else "post"
    rate = speed_to_rate(speed)

    # v9.44 — 1.ª capa: LRU en memoria (sirve sin re-sintetizar ni ocupar un lugar del semáforo)
    hit = _cache_get(key)
    if hit is not None:
        payload = dict(hit)
        payload["cached"] = True
        _log_request(voice_name, rate, len(text), 0, "cache", [], t0, 0, via)
        return _json_payload(payload, via_get)

    slot = await _acquire_slot()
    cola_ms = int((time.monotonic() - t0) * 1000)
    if slot is None:
        _log_request(voice_name, rate, len(text), 0, "busy", [], t0, cola_ms, via)
        return _error("busy", status=503, retry_after=RETRY_AFTER_S)
    es_tw = voice_name.startswith("zh-TW-")
    t_slot = time.monotonic()
    try:
        # v9.40: la velocidad se hornea EN la síntesis (sin eco en el cliente)
        if es_tw:
            audio, boundaries, intentos, fallos, codigo, codigos = await synth_with_retry(
                text, voice_name, rate, want_boundaries,
                attempt_cap=TW_ATTEMPT_CAP_S, total_cap=min(TW_PHASE_BUDGET_S, _budget(len(text))[1]),
                max_attempts=1 if voice_name in TW_UN_SOLO_INTENTO else None)
        else:
            audio, boundaries, intentos, fallos, codigo, codigos = await synth_with_retry(
                text, voice_name, rate, want_boundaries)

        # Voz alternativa: la voz de Taiwán agotó sus reintentos SOLO con «sin_audio» → UNA prueba con la
        # continental del mismo género. Nunca se guarda (ver cabecera): no entra en la caché en memoria.
        fb_voice = _continental_de(voice_name) if es_tw else None
        if audio is None and fb_voice and codigo == "sin_audio" and codigos and all(c == "sin_audio" for c in codigos):
            restante = _budget(len(text))[1] - (time.monotonic() - t_slot)
            if restante >= FALLBACK_MIN_WINDOW_S:
                try:
                    a2, b2 = await asyncio.wait_for(
                        synth_edge_bytes(text, fb_voice, rate=rate, want_boundaries=want_boundaries),
                        timeout=min(_budget(len(text))[0], restante))
                    intentos += 1
                    if a2:
                        out = {
                            "audio": base64.b64encode(a2).decode("ascii"),
                            "mime": "audio/mpeg",
                            "voice": fb_voice,
                            "speed": speed,
                            "fallback": True,
                            "cached": False,
                        }
                        if want_boundaries and b2:
                            out["boundaries"] = b2
                        _log_request(voice_name, rate, len(text), intentos, "ok", fallos, t0, cola_ms, via, fallback=1)
                        return JSONResponse(out, headers={"Cache-Control": "no-store", "X-TTS-Fallback": "1", "X-TTS-Audio": "1"})
                    fallos.append("_EmptyAudio")
                except Exception as e:  # noqa: BLE001 — la continental también falló: se informa el código original
                    intentos += 1
                    fallos.append(type(e).__name__)
    finally:
        slot.release()

    if audio is None:
        _log_request(voice_name, rate, len(text), intentos, "error_" + codigo, fallos, t0, cola_ms, via)
        return _error(codigo)

    payload = {
        "audio": base64.b64encode(audio).decode("ascii"),
        "mime": "audio/mpeg",
        "voice": voice_name,
        "speed": speed,  # ← eco: la app NO aplica playbackRate
    }
    if want_boundaries and boundaries:
        payload["boundaries"] = boundaries  # [{text, offsetMs, durMs}, ...]
    _cache_put(key, payload)
    out = dict(payload)
    out["cached"] = False
    _log_request(voice_name, rate, len(text), intentos, "ok", fallos, t0, cola_ms, via)
    return _json_payload(out, via_get)


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
            "karaoke": qp.get("karaoke") or "",
        }
        return await tts_endpoint(body, via_get=True)
    return JSONResponse({
        "ok": True,
        "edge_tts": EDGE_TTS_VERSION,
        "service": "tts",
        "version": "v9.49",
        "cache": f"LRU memoria {_TTS_CACHE_MAX} audios + CDN (GET immutable)",
        "voices": "zh-CN · zh-TW (nuevo v9.49) · es-ES · es-AR (nuevo v9.49)",
        "hint": "GET ?text=…&lang=…&voice=…&speed=… | POST {text, lang, voice, speed}",
    }, headers={"Cache-Control": "no-store"})
