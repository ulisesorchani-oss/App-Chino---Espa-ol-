import json
import base64
import io
from piper import PiperVoice
import numpy as np
import soundfile as sf
from huggingface_hub import hf_hub_download

# Caché global para evitar recargar modelos en cada petición
voice_cache = {}

def get_voice(lang_code):
    if lang_code in voice_cache:
        return voice_cache[lang_code]
        
    VOICES = {
        "zh-CN": {"model": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx", "config": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx.json"},
        "es-ES": {"model": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx", "config": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx.json"}
    }
    
    repo_id = "rhasspy/piper-voices"
    info = VOICES[lang_code]
    print(f" Cargando voz {lang_code}...")
    model_path = hf_hub_download(repo_id=repo_id, filename=info["model"])
    config_path = hf_hub_download(repo_id=repo_id, filename=info["config"])
    
    voice = PiperVoice.load(model_path, config_path=config_path)
    voice_cache[lang_code] = voice
    return voice

def handler(request, response):
    """Función estándar de Vercel Python Serverless"""
    
    # 1. Manejar Preflight CORS (OPTIONS)
    if request.method == 'OPTIONS':
        response.status_code = 200
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Max-Age'] = '86400'
        return response.send('')

    # 2. Manejar Petición de Audio (POST)
    if request.method == 'POST':
        try:
            # Leer body
            content_length = int(request.headers.get('Content-Length', 0))
            body_raw = request.rfile.read(content_length).decode('utf-8')
            body = json.loads(body_raw) if body_raw else {}
            
            text = body.get("text", "")
            lang = body.get("lang", "es-ES")
            
            if not text:
                response.status_code = 400
                response.headers['Access-Control-Allow-Origin'] = '*'
                return response.send(json.dumps({"error": "Texto vacío"}))
            
            # Generar audio
            voice = get_voice(lang)
            audio_data = voice.synthesize(text)
            
            buffer = io.BytesIO()
            sf.write(buffer, audio_data, voice.config.sample_rate, format='WAV')
            wav_bytes = buffer.getvalue()
            
            # Codificar a Base64
            audio_b64 = base64.b64encode(wav_bytes).decode('utf-8')
            
            response.status_code = 200
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Content-Type'] = 'application/json'
            return response.send(json.dumps({"audio": audio_b64}))
            
        except Exception as e:
            print(f"❌ ERROR TTS: {str(e)}")
            response.status_code = 500
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response.send(json.dumps({"error": str(e)}))

    # 3. Rechazar otros métodos
    response.status_code = 405
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response.send(json.dumps({"error": "Método no permitido"}))
