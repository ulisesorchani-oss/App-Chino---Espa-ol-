import os
os.environ["HF_HOME"] = "/tmp/hf_cache"
os.environ["TRANSFORMERS_CACHE"] = "/tmp/hf_cache"

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from piper import PiperVoice
import soundfile as sf
import io
import base64
import numpy as np
from huggingface_hub import hf_hub_download

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    print(f"Cargando voz {lang_code}...")
    
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
        
        # Piper.synthesize devuelve un generador de AudioChunk
        # Debemos extraer los bytes crudos de cada chunk
        all_audio_bytes = b""
        sample_rate = voice.config.sample_rate
        
        for chunk in voice.synthesize(text):
            # AudioChunk tiene un atributo .audio_int16_bytes con los datos crudos
            if hasattr(chunk, 'audio_int16_bytes'):
                all_audio_bytes += chunk.audio_int16_bytes
            elif hasattr(chunk, '__bytes__'):
                all_audio_bytes += bytes(chunk)
            else:
                # Fallback: intentar convertir a bytes directamente
                try:
                    all_audio_bytes += bytes(chunk)
                except:
                    raise ValueError(f"No se pudo extraer audio de chunk: {type(chunk)}")
        
        if not all_audio_bytes:
            raise ValueError("No se generó audio")
        
        # Convertir bytes int16 raw a array numpy
        audio_data = np.frombuffer(all_audio_bytes, dtype=np.int16)
        
        # Escribir a WAV
        buf = io.BytesIO()
        sf.write(buf, audio_data, sample_rate, format="WAV")
        b64_audio = base64.b64encode(buf.getvalue()).decode("utf-8")
        
        return JSONResponse(content={"audio": b64_audio})
        
    except Exception as e:
        print(f"Error TTS: {e}")
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
