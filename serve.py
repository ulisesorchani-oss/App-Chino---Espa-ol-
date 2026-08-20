import http.server
import socketserver
import os

os.chdir('/home/z/my-project/chino-espanol-app')

PORT = 8084
handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
