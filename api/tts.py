import json
import base64
import io
from piper import PiperVoice
import numpy as np
import soundfile as sf
from huggingface_hub import hf_hub_download

# Caché global (Vercel mantiene la función caliente entre peticiones)
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
    print(f"Descargando voz {lang_code}...") # Visible en logs de Vercel
    model_path = hf_hub_download(repo_id=repo_id, filename=info["model"])
    config_path = hf_hub_download(repo_id=repo_id, filename=info["config"])
    
    voice = PiperVoice.load(model_path, config_path=config_path)
    voice_cache[lang_code] = voice
    return voice

def handler(request):
    # 1. RESPONDER AL PREFLIGHT DE CORS (OPTIONS)
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    # 2. PROCESAR LA PETICIÓN DE AUDIO (POST)
    if request.method == 'POST':
        try:
            body = json.loads(request.body or '{}')
            text = body.get("text", "")
            lang = body.get("lang", "es-ES")
            
            if not text:
                return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({"error": "Texto vacío"})}
            
            voice = get_voice(lang)
            audio_data = voice.synthesize(text)
            
            # Convertir a WAV
            buffer = io.BytesIO()
            sf.write(buffer, audio_data, voice.config.sample_rate, format='WAV')
            wav_bytes = buffer.getvalue()
            
            # Codificar a Base64 para envío seguro via JSON
            audio_b64 = base64.b64encode(wav_bytes).decode('utf-8')
            
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({"audio": audio_b64})
            }
            
        except Exception as e:
            print(f"ERROR TTS: {str(e)}")
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({"error": str(e)})
            }

    # 3. RECHAZAR OTROS MÉTODOS
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({"error": "Método no permitido"})
    }
