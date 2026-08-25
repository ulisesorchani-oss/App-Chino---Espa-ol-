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
        
        # Obtener resultado de synthesize
        result = voice.synthesize(text)
        
        # Manejar diferentes formatos de retorno de Piper
        audio_data = None
        
        if isinstance(result, np.ndarray):
            # Caso 1: Devuelve array numpy directo
            audio_data = result
        elif isinstance(result, tuple):
            # Caso 2: Devuelve tupla (sample_rate, audio) o (audio,)
            if len(result) == 2:
                audio_data = result[1]
            elif len(result) == 1:
                audio_data = result[0]
            else:
                raise ValueError(f"Tupla inesperada con {len(result)} elementos")
        elif hasattr(result, '__iter__') and not isinstance(result, (str, bytes)):
            # Caso 3: Es un generador/iterable de chunks
            chunks = []
            for chunk in result:
                if isinstance(chunk, tuple) and len(chunk) >= 2:
                    chunks.append(chunk[1])
                elif isinstance(chunk, np.ndarray):
                    chunks.append(chunk)
                else:
                    chunks.append(chunk)
            
            if len(chunks) == 1:
                audio_data = chunks[0]
            else:
                audio_data = np.concatenate(chunks)
        else:
            raise ValueError(f"Tipo de retorno desconocido: {type(result)}")
        
        # Asegurar que sea array numpy 1D
        if not isinstance(audio_data, np.ndarray):
            audio_data = np.array(audio_data, dtype=np.int16)
        
        # Convertir a WAV
        buf = io.BytesIO()
        sf.write(buf, audio_data, voice.config.sample_rate, format="WAV")
        b64_audio = base64.b64encode(buf.getvalue()).decode("utf-8")
        
        return JSONResponse(content={"audio": b64_audio})
        
    except Exception as e:
        print(f"Error TTS: {e}")
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
