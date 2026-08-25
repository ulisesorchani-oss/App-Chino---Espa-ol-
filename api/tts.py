import json
import base64
import io

# Caché global para mantener las voces vivas entre peticiones
voice_cache = {}

def app(req, res):
    """Entrypoint principal para Vercel Python Serverless"""
    
    # 1. Manejo de Preflight CORS (OPTIONS)
    if req.method == "OPTIONS":
        res.status_code = 200
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        res.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return res.send("")

    # 2. Manejo de Peticiones POST
    if req.method == "POST":
        try:
            # Importación diferida: Solo carga Piper cuando llega una petición real
            from piper import PiperVoice
            import soundfile as sf
            from huggingface_hub import hf_hub_download
            
            # Leer el cuerpo de la petición
            length = int(req.headers.get("Content-Length", 0))
            raw_body = req.rfile.read(length).decode("utf-8") if length > 0 else "{}"
            data = json.loads(raw_body)
            
            text = data.get("text", "")
            lang = data.get("lang", "es-ES")
            
            if not text:
                res.status_code = 400
                res.headers["Access-Control-Allow-Origin"] = "*"
                return res.send(json.dumps({"error": "Falta texto"}))

            # Cargar voz solo si no está en caché
            if lang not in voice_cache:
                VOICES = {
                    "zh-CN": {
                        "model": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx", 
                        "config": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx.json"
                    },
                    "es-ES": {
                        "model": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx", 
                        "config": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx.json"
                    }
                }
                
                repo_id = "rhasspy/piper-voices"
                info = VOICES[lang]
                print(f"Cargando voz {lang} desde HF Hub...")
                
                model_path = hf_hub_download(repo_id=repo_id, filename=info["model"])
                config_path = hf_hub_download(repo_id=repo_id, filename=info["config"])
                
                voice = PiperVoice.load(model_path, config_path=config_path)
                voice_cache[lang] = voice
                print(f"✅ Voz {lang} lista en caché")
            else:
                voice = voice_cache[lang]

            # Generar audio
            audio = voice.synthesize(text)
            
            # Convertir a WAV y luego a Base64
            buf = io.BytesIO()
            sf.write(buf, audio, voice.config.sample_rate, format="WAV")
            b64_audio = base64.b64encode(buf.getvalue()).decode("utf-8")
            
            res.status_code = 200
            res.headers["Access-Control-Allow-Origin"] = "*"
            res.headers["Content-Type"] = "application/json"
            return res.send(json.dumps({"audio": b64_audio}))
            
        except Exception as e:
            print(f"❌ Error TTS: {e}")
            res.status_code = 500
            res.headers["Access-Control-Allow-Origin"] = "*"
            return res.send(json.dumps({"error": str(e)}))

    # 3. Rechazar otros métodos HTTP
    res.status_code = 405
    res.headers["Access-Control-Allow-Origin"] = "*"
    return res.send(json.dumps({"error": "Solo POST permitido"}))
