import os
os.environ["HF_HOME"] = "/tmp/hf_cache"
os.environ["TRANSFORMERS_CACHE"] = "/tmp/hf_cache"

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import io
import base64

# ============================================================
# 1) edge-tts (voces neuronales de Microsoft, calidad natural)
#    - Chino:  femenina (Xiaoxiao) y masculina (Yunjian)
#    - Español: variante LATINOAMERICANA (Argentina)
#      femenina (Elena) y masculina (Tomás)
# ============================================================
import edge_tts

# ============================================================
# 2) Piper (respaldo, igual que la versión anterior)
#    La importación es tolerante: si no está instalado,
#    la API sigue funcionando solo con edge-tts.
# ============================================================
PIPER_AVAILABLE = False
try:
    from piper import PiperVoice
    import soundfile as sf
    import numpy as np
    from huggingface_hub import hf_hub_download
    PIPER_AVAILABLE = True
except Exception as _piper_err:
    print(f"Piper no disponible ({_piper_err}); se usará solo edge-tts")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mapa de voces edge-tts: (idioma, género) -> voz neuronal
EDGE_VOICES = {
    ("zh-CN", "f"): "zh-CN-XiaoxiaoNeural",   # 🇨🇳 femenina, cálida y clara
    ("zh-CN", "m"): "zh-CN-YunjianNeural",    # 🇨🇳 masculina, madura
    ("es-ES", "f"): "es-AR-ElenaNeural",      # 🇦🇷 femenina, acento argentino
    ("es-ES", "m"): "es-AR-TomasNeural",      # 🇦🇷 masculina, acento argentino
}

# ---------- Piper (respaldo) ----------
voice_cache = {}
CACHE_DIR = "/tmp/piper_voices"
os.makedirs(CACHE_DIR, exist_ok=True)
os.makedirs("/tmp/hf_cache", exist_ok=True)

def get_voice(lang_code: str):
    if lang_code in voice_cache:
        return voice_cache[lang_code]

    VOICES = {
        "zh-CN": {"model": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx", "config": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx.json"},
        "es-ES": {"model": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx", "config": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx.json"}
    }

    repo_id = "rhasspy/piper-voices"
    info = VOICES.get(lang_code, VOICES["es-ES"])
    print(f"Cargando voz Piper {lang_code}...")

    model_path = hf_hub_download(repo_id=repo_id, filename=info["model"], cache_dir=CACHE_DIR)
    config_path = hf_hub_download(repo_id=repo_id, filename=info["config"], cache_dir=CACHE_DIR)

    voice = PiperVoice.load(model_path, config_path=config_path)
    voice_cache[lang_code] = voice
    return voice

async def synth_edge(text: str, voice_name: str) -> bytes:
    """Sintetiza con edge-tts y devuelve los bytes MP3."""
    communicate = edge_tts.Communicate(text, voice_name)
    buf = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
    data = buf.getvalue()
    if not data:
        raise ValueError("edge-tts no devolvió audio")
    return data

def synth_piper(lang_code: str, text: str) -> bytes:
    """Sintetiza con Piper y devuelve los bytes WAV."""
    voice = get_voice(lang_code)
    all_audio_bytes = b""
    sample_rate = voice.config.sample_rate

    for chunk in voice.synthesize(text):
        if hasattr(chunk, 'audio_int16_bytes'):
            all_audio_bytes += chunk.audio_int16_bytes
        elif hasattr(chunk, '__bytes__'):
            all_audio_bytes += bytes(chunk)
        else:
            try:
                all_audio_bytes += bytes(chunk)
            except Exception:
                raise ValueError(f"No se pudo extraer audio de chunk: {type(chunk)}")

    if not all_audio_bytes:
        raise ValueError("No se generó audio")

    audio_data = np.frombuffer(all_audio_bytes, dtype=np.int16)
    buf = io.BytesIO()
    sf.write(buf, audio_data, sample_rate, format="WAV")
    return buf.getvalue()

@app.post("/api/tts")
async def generate_tts(request: Request):
    try:
        body = await request.json()
        text = (body.get("text") or "").strip()
        lang = body.get("lang", "es-ES")
        # 'voice' = 'f' (femenina) o 'm' (masculina); acepta 'gender' por compatibilidad
        gender = str(body.get("voice", body.get("gender", "f"))).lower()

        if not text:
            return JSONResponse(status_code=400, content={"error": "Falta texto"})
        if lang not in ("zh-CN", "es-ES"):
            lang = "es-ES"
        if gender not in ("f", "m"):
            gender = "f"

        voice_name = EDGE_VOICES.get((lang, gender), EDGE_VOICES[("es-ES", "f")])

        # 1) edge-tts (voz neuronal, MP3)
        try:
            audio_bytes = await synth_edge(text, voice_name)
            return JSONResponse(content={
                "audio": base64.b64encode(audio_bytes).decode("utf-8"),
                "mime": "audio/mpeg",
                "engine": "edge-tts",
                "voice": voice_name,
            })
        except Exception as edge_err:
            print(f"edge-tts falló ({edge_err}); intentando Piper...")

        # 2) Piper (respaldo, WAV)
        if not PIPER_AVAILABLE:
            return JSONResponse(status_code=503, content={"error": "Sin motor TTS disponible"})

        wav_bytes = synth_piper(lang, text)
        return JSONResponse(content={
            "audio": base64.b64encode(wav_bytes).decode("utf-8"),
            "mime": "audio/wav",
            "engine": "piper",
            "voice": f"piper-{lang}",
        })

    except Exception as e:
        print(f"Error TTS: {e}")
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
