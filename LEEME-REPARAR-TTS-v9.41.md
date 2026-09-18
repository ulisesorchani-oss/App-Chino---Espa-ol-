# 🔧 LEEME — Reparar el TTS (voz robótica) — v9.41

## Qué pasó (diagnóstico confirmado el 2026-09-19)

La app quedó **funcionando con la voz del sistema** (robótica) porque el
servidor de voz neuronal dejó de responder:

| Prueba | Resultado |
|---|---|
| `GET /` (la web) | ✅ HTTP 200 — el sitio está bien |
| `POST /api/tts` (la función de voz) | ❌ **HTTP 404 — la función no existe en el deploy** |
| `GET /api/tts.py` | ⚠️ HTTP 200 **como descarga estática** (`content-disposition: inline`) |

El punto (3) es la clave: Vercel está sirviendo el archivo `tts.py` como un
**archivo estático cualquiera** (como si fuera una foto), NO como función
serverless. El contenido del archivo es correcto — es byte-idéntico al de
referencia (md5 `984e0c414b5f72d8e81398a3ddb37652`) — el problema es **dónde
vive en el repo**, no qué dice.

Mientras tanto, la app hace lo correcto: detecta el fallo y sigue con la voz
del sistema para no quedarte sin audio. La v9.41 además muestra un aviso
visible ("⚠️ Servidor de voz no disponible…") cuando esto pasa, para que no
vuelva a ser un misterio.

---

## La reparación (3 verificaciones en tu repo de GitHub)

### ✅ Verificación 1 — Ubicación del archivo

El archivo debe estar en la **carpeta `api/` de la raíz del repo que Vercel
despliega**, con el nombre exacto:

```
repo/
├── index.html          ← la web
├── sw.js
├── app.js
├── ... (los demás archivos de la app)
└── api/
    └── tts.py          ← SOLO ACÁ es una función serverless
```

Errores típicos que producen exactamente este síntoma:

- El archivo quedó en **`public/api/tts.py`** o dentro de otra carpeta que
  Vercel sirve como estáticos → se descarga como archivo, no se ejecuta.
- El archivo quedó en la **raíz del repo** (`/tts.py`) sin carpeta `api/`.
- Al subirlo, **se movió** el que funcionaba en lugar de copiar el nuevo al
  lado: fijate que `api/tts.py` exista (no `api/tts (1).py`, no `.txt`).

> Si en Vercel tenés configurado **Root Directory** (Settings → General →
> Root Directory), la carpeta `api/` debe estar DENTRO de ese directorio.

### ✅ Verificación 2 — vercel.json

Si tu repo tiene `vercel.json` con la sección `builds` (config legada),
asegurate de que la función esté declarada:

```json
{
  "builds": [
    { "src": "api/tts.py", "use": "@vercel/python" }
  ]
}
```

Si tu `vercel.json` **no** tiene `builds` (config moderna), no hace falta
declarar nada: Vercel convierte automáticamente todo `api/*.py` en funciones.
En ese caso, si no te está creando la función, el archivo no está en `api/`
(volvé a la Verificación 1).

### ✅ Verificación 3 — requirements.txt

La función necesita la librería `edge-tts`. Si ya venía funcionando la voz
neuronal, seguramente ya lo tenés; verificá que exista un `requirements.txt`
(en la raíz del repo o dentro de `api/`) con esta línea:

```
edge-tts
```

> Sin esta librería la función existiría pero fallaría al ejecutarse (error
> 500, distinto del 404 actual). Igual conviene confirmarlo mientras estás.

---

## Cómo verificar que quedó bien (30 segundos)

Después de subir a GitHub y esperar el redeploy de Vercel (~1 min):

```bash
curl -s -X POST "https://app-chino-espa-ol.vercel.app/api/tts" \
  -H "Content-Type: application/json" \
  -d '{"text":"你好","lang":"zh-CN","voice":"f"}' | head -c 200
```

**Debe devolver** un JSON con:

- `"mime": "audio/mpeg"` ← mp3 neuronal (si dice `audio/wav` es el robot Piper)
- `"voice": "zh-CN-XiaoxiaoNeural"`
- `"speed": 1` ← el eco nuevo de la v9.40

O más fácil, con el verificador completo incluido en esta entrega:

```bash
python3 scripts/verify_tts_api.py
```

que prueba los 4 escenarios (voz normal, velocidad 0.85, español, y el
síntoma del archivo estático) y te dice exactamente qué falta.

También podés mirarlo en el dashboard: **Vercel → tu proyecto → Deployments →
último deploy → pestaña "Functions"** — ahí debe listar `api/tts`.

---

## Y del lado de la app (v9.41)

La app NO necesita nada extra para volver a la voz neuronal: en cuanto el
endpoint responda bien, los teléfonos recuperan la voz de Xiaoxiao solos
(la caché del Service Worker nunca guardó respuestas de error). La v9.41
solo agrega el aviso visible para futuros cortes.

**No toques el contenido de `tts.py`**: es correcto tal cual está. Solo
ubicarlo en `api/tts.py` de la raíz del repo.
