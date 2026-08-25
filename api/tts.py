import json

def handler(req, res):
    # Manejo de CORS Preflight
    if req.method == "OPTIONS":
        res.status_code = 200
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        res.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return res.send("")

    # Manejo de POST
    if req.method == "POST":
        try:
            # Leer body
            length = int(req.headers.get("Content-Length", 0))
            raw = req.rfile.read(length).decode("utf-8") if length > 0 else "{}"
            data = json.loads(raw)
            
            text = data.get("text", "Hola")
            
            res.status_code = 200
            res.headers["Access-Control-Allow-Origin"] = "*"
            res.headers["Content-Type"] = "application/json"
            return res.send(json.dumps({
                "message": f"Recibido: {text}",
                "status": "ok"
            }))
            
        except Exception as e:
            res.status_code = 500
            res.headers["Access-Control-Allow-Origin"] = "*"
            return res.send(json.dumps({"error": str(e)}))

    # Método no permitido
    res.status_code = 405
    res.headers["Access-Control-Allow-Origin"] = "*"
    return res.send(json.dumps({"error": "Solo POST"}))
