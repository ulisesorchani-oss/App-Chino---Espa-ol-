# ============================================================
# tts.py — v9.40 — VELOCIDAD EN LA SÍNTESIS (fin del eco a 0.85x)
# Destino: api/tts.py en el repo de Vercel (app-chino-espa-ol)
# ------------------------------------------------------------
# PROBLEMA: hasta v9.39 este api sintetizaba SIEMPRE a velocidad
# normal y la app estiraba el audio del lado del cliente con
# playbackRate + preservesPitch. A 0.85x (y más a 0.7x) ese
# estiramiento produce el ECO/reverberación artificial que se
# escucha: el algoritmo de time-stretch superpone colas de las
# ventanas de análisis.
#
# SOLUCIÓN: pedirle la velocidad a edge-tts EN la síntesis:
#     edge_tts.Communicate(text, voice_name, rate="-15%")
# La voz sale YA despacio generada por el modelo neuronal: no hay
# post-proceso (no hay eco) y el tono queda intacto porque lo
# maneja el modelo, no un re-sampler.
#
# ============================================================
# EL PARCHE EN TU api/tts.py ACTUAL (3 pasos, pocas líneas)
# ============================================================
#
#   1) En el handler, junto a donde leés text/lang/voice del body:
#
#         speed = float(body.get("speed", 1) or 1)
#         speed = min(1.5, max(0.5, speed))          # clamp defensivo
#
#   2) Convertir a porcentaje y pasarlo a Communicate (en synth_edge):
#
#         rate = f"{round((speed - 1) * 100):+d}%"   # 0.85 → "-15%"
#         communicate = edge_tts.Communicate(text, voice_name, rate=rate)
#
#      (si tu synth_edge hoy es Communicate(text, voice_name) sin más,
#       agrégale el parámetro rate; con rate="+0%" edge-tts es idéntico
#       a no pasarlo.)
#
#   3) En la respuesta JSON, ecoar la velocidad SOLO cuando sintetizó
#      edge-tts (si cae al fallback Piper, OMITIR la clave — ver abajo):
#
#         payload["speed"] = speed
#
#      El cliente usa ese eco para NO aplicar playbackRate (sin eco).
#      Si la clave no viene, el cliente cae al playbackRate clásico:
#      la app sigue funcionando igual aunque el server quede viejo,
#      y NUNCA se aplican los dos efectos a la vez.
#
# NOTA PIPER (synth_piper): VITS/Piper controla la velocidad con
#   length_scale, no con rate. Como es SOLO el respaldo cuando
#   edge-tts falla, en v9.40 se deja sin cambio de velocidad: la
#   respuesta de Piper NO lleva "speed" y el cliente lo compensa.
#
# NOTA CACHÉ: si en el futuro agregás caché de audios en el server,
#   la clave debe incluir la velocidad (texto+voz ya no alcanza).
#   El Service Worker de la app ya lo hace (sw.js v9.40: speed en la
#   clave de la caché TTS).
# ============================================================

import base64
import io
import json
import asyncio

import edge_tts

# ------------------------------------------------------------
# Mapeo de claves del cliente → voces neuronales de Edge.
# (El cliente verifica estas voces con VOICE_EXPECT: f→Xiaoxiao,
#  m→Yunjian, f2→Xiaobei, m2→Yunxi. Si tu api actual usa otros
#  nombres para español, mantené los tuyos acá.)
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


def synth_edge(text, voice_name, rate=None):
    """Sintetiza con edge-tts. rate=None o '+0%' = velocidad normal.

    v9.40: rate lo pide el CLIENTE vía body.speed (0.85 → '-15%').
    La velocidad queda horneada en el audio: sin playbackRate del
    cliente no hay eco y el pitch lo mantiene el modelo neuronal.
    """
    kwargs = {}
    if rate and rate not in ("+0%", "-0%", "0%"):
        kwargs["rate"] = rate
    communicate = edge_tts.Communicate(text, voice_name, **kwargs)
    return communicate


async def synth_edge_bytes(text, voice_name, rate=None):
    """Devuelve (mp3_bytes, voice_name) o lanza excepción si edge falla."""
    communicate = synth_edge(text, voice_name, rate)
    buf = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
    return buf.getvalue(), voice_name


def synth_piper(text, lang):
    """Fallback local (solo cuando edge-tts falla).

    SIN cambio de velocidad en v9.40 (Piper usa length_scale, otro
    mecanismo). La respuesta de Piper NO lleva "speed" → el cliente
    aplica su playbackRate clásico como siempre (compatible).
    """
    # ... tu implementación Piper actual, sin cambios ...
    raise RuntimeError("Piper no configurado en esta copia de referencia")


def speed_to_rate(speed):
    """0.85 → '-15%', 1.0 → '+0%', 1.2 → '+20%' (formato de edge-tts)."""
    return f"{round((speed - 1) * 100):+d}%"


# ============================================================
# HANDLER DE REFERENCIA (Vercel Python runtime)
# Si tu api/tts.py actual tiene otra forma (Flask/FastAPI), la
# idea es LA MISMA: leer speed → rate → Communicate(rate=rate)
# → ecoar "speed" en el JSON de respuesta (solo edge).
# ============================================================
def handler(request):
    try:
        body = json.loads((request.body or b"").decode("utf-8") or "{}")
    except Exception:
        body = {}

    text = str(body.get("text") or "").strip()
    lang = str(body.get("lang") or "zh-CN")
    voice_key = str(body.get("voice") or DEFAULT_VOICE_KEY)
    # v9.40: velocidad pedida por el cliente (0.7 / 0.85 / 1.0)
    try:
        speed = float(body.get("speed", 1) or 1)
    except (TypeError, ValueError):
        speed = 1.0
    speed = min(1.5, max(0.5, speed))  # clamp defensivo

    if not text:
        return _json_response({"error": "text requerido"}, 400)

    voices = VOICES.get(lang, VOICES["zh-CN"])
    voice_name = voices.get(voice_key, voices[DEFAULT_VOICE_KEY])

    rate = speed_to_rate(speed)
    try:
        audio_bytes, used_voice = asyncio.run(
            synth_edge_bytes(text, voice_name, rate=rate))
        payload = {
            "audio": base64.b64encode(audio_bytes).decode("ascii"),
            "mime": "audio/mpeg",
            "voice": used_voice,
            "speed": speed,  # ← eco: el cliente NO aplica playbackRate
        }
    except Exception:
        # Fallback Piper: SIN "speed" en la respuesta → el cliente
        # compensa con playbackRate (comportamiento clásico, sin eco doble).
        try:
            audio_bytes = synth_piper(text, lang)
            payload = {
                "audio": base64.b64encode(audio_bytes).decode("ascii"),
                "mime": "audio/wav",
                "voice": "piper",
            }
        except Exception:
            return _json_response({"error": "tts no disponible"}, 502)

    return _json_response(payload, 200)


def _json_response(payload, status=200):
    """Respuesta mínima compatible con el runtime handler(request)."""
    body = json.dumps(payload, ensure_ascii=False)
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json; charset=utf-8"},
        "body": body,
    }
