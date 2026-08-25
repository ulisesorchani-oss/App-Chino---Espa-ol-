from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from piper import PiperVoice
import soundfile as sf
import io
import base64
import os
from huggingface_hub import hf_hub_download

app = FastAPI()

# Middleware CORS Global
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

voice_cache = {}
# Carpeta segura para Vercel
CACHE_DIR = "/tmp/piper_voices"
os.makedirs(CACHE_DIR, exist_ok=True)

def get_voice(lang_code: str):
    if lang_code in voice_cache:
        return voice_cache[lang_code]
    
    VOICES = {
        "zh-CN": {"model": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx", "config": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx.json"},
        "es-ES": {"model": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx", "config": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx.json"}
    }
    
    repo_id = "rhasspy/piper-voices"
    info = VOICES.get(lang_code, VOICES["es-ES"])
    print(f"Cargando voz {lang_code} en {CACHE_DIR}...")
    
    # FORZAR cache_dir="/tmp/piper_voices" para evitar Read-only file system
    model_path = hf_hub_download(repo_id=repo_id, filename=info["model"], cache_dir=CACHE_DIR)
    config_path = hf_hub_download(repo_id=repo_id, filename=info["config"], cache_dir=CACHE_DIR)
    
    voice = PiperVoice.load(model_path, config_path=config_path)
    voice_cache[lang_code] = voice
    return voice

@app.post("/api/tts")
async def generate_tts(request: Request):
    try:
        body = await request.json()
        text = body.get("text", "")
        lang = body.get("lang", "es-ES")
        
        if not text:
            return JSONResponse(status_code=400, content={"error": "Falta texto"})

        voice = get_voice(lang)
        audio = voice.synthesize(text)
        
        buf = io.BytesIO()
        sf.write(buf, audio, voice.config.sample_rate, format="WAV")
        b64_audio = base64.b64encode(buf.getvalue()).decode("utf-8")
        
        return JSONResponse(content={"audio": b64_audio})
        
    except Exception as e:
        print(f"Error TTS: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})
