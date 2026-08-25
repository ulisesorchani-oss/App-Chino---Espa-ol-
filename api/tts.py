from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from piper import PiperVoice
import soundfile as sf
import io
import base64
from huggingface_hub import hf_hub_download

app = FastAPI()
voice_cache = {}

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
    
    model_path = hf_hub_download(repo_id=repo_id, filename=info["model"])
    config_path = hf_hub_download(repo_id=repo_id, filename=info["config"])
    
    voice = PiperVoice.load(model_path, config_path=config_path)
    voice_cache[lang_code] = voice
    return voice

@app.options("/api/tts")
async def cors_preflight():
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    )

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
        
        return JSONResponse(
            content={"audio": b64_audio},
            headers={"Access-Control-Allow-Origin": "*"}
        )
        
    except Exception as e:
        print(f"Error TTS: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})
