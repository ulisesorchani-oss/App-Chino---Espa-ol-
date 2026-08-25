import json

def handler(req, res):
    if req.method == "OPTIONS":
        res.status_code = 200
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        res.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return res.send("")

    if req.method == "POST":
        res.status_code = 200
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Content-Type"] = "application/json"
        return res.send(json.dumps({"message": "Hola desde Vercel!"}))

    res.status_code = 405
    res.headers["Access-Control-Allow-Origin"] = "*"
    return res.send(json.dumps({"error": "Solo POST"}))
