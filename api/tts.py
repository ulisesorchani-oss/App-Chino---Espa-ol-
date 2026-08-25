from http.server import BaseHTTPRequestHandler
import json
from piper import PiperVoice
import numpy as np
import soundfile as sf
import io
from huggingface_hub import hf_hub_download
import os

# Caché global para evitar recargar modelos en cada petición (Vercel mantiene caliente la función)
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
    model_path = hf_hub_download(repo_id=repo_id, filename=info["model"])
    config_path = hf_hub_download(repo_id=repo_id, filename=info["config"])
    
    voice = PiperVoice.load(model_path, config_path=config_path)
    voice_cache[lang_code] = voice
    return voice

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            body = json.loads(post_data.decode('utf-8'))
            
            text = body.get("text", "")
            lang = body.get("lang", "es-ES")
            
            if not text:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Texto vacío"}).encode())
                return
            
            voice = get_voice(lang)
            audio_data = voice.synthesize(text)
            
            # Convertir a WAV bytes
            buffer = io.BytesIO()
            sf.write(buffer, audio_data, voice.config.sample_rate, format='WAV')
            wav_bytes = buffer.getvalue()
            
            self.send_response(200)
            self.send_header('Content-Type', 'audio/wav')
            self.send_header('Content-Length', str(len(wav_bytes)))
            self.end_headers()
            self.wfile.write(wav_bytes)
            
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
