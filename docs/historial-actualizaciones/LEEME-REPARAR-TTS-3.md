# 🔧 LEEME 3 — Reparación desde la web de GitHub, clic por clic — kit v9.43

> Todo se hace desde el navegador, en github.com y vercel.com.
> No hace falta instalar nada. Tiempo total: ~5 minutos.

---

## Qué encontré al revisar tu deploy de HOY (21/9, 11:58 GMT)

| Prueba sobre el sitio vivo | Resultado | Significado |
|---|---|---|
| GET / | 200 | El sitio y la app v9.41 están bien deployados |
| POST /api/tts | **404** | La función de voz **no existe** en el deploy |
| GET /api/index.py | **404** | El archivo clave del kit anterior **no está en tu repo** |
| GET /api/tts.py | 200 **como descarga** (actualizado hoy) | Vercel sirve el .py como archivo estático → **no construye ninguna función** |

**Conclusión:** tus deploys funcionan (por eso la app nueva y el aviso ⚠️ se ven),
pero los 2 archivos de reparación del kit anterior **nunca llegaron al repo**.
Además tu repo quedó en un modo donde Vercel no construye funciones de Python
(herencia de la configuración FastAPI original). Se arregla pegando 3 archivos
desde la web de GitHub. Por eso escuchás solo la voz robótica del sistema:
la app hace exactamente lo que debe cuando el servidor no responde.

---

## Antes de empezar (30 segundos)

1. Entrá a **github.com** y abrí **tu repositorio** (el que tiene `index.html`
   y `app.js` en la primera lista de archivos).
2. Esa lista es la **raíz del repo**. Todo lo de esta guía se hace ahí.
3. Si te pide elegir rama al confirmar: dejá marcado
   **"Commit directly to the main branch"**.

---

## Paso 1 — vercel.json (el archivo crítico)

1. En la raíz del repo, botón **Add file → Create new file**.
   *(Si ya existe `vercel.json`: abrilo, tocá el lápiz ✏️ y seguí al paso 3.)*
2. En el cuadro de nombre escribí exactamente: `vercel.json`
3. Borrá todo el contenido que tenga y pegá **exactamente esto**:

```json
{
  "rewrites": [
    { "source": "/api/tts", "destination": "/api/index" }
  ]
}
```

4. Botón verde **Commit changes**.

**¿Por qué es el crítico?** Si tu vercel.json viejo tenía una sección
`"builds"` (de la época del API FastAPI original), Vercel queda en "modo
legado" y sirve TODO como archivo estático — por eso el tts.py se descarga
en vez de ejecutarse. Con este vercel.json moderno, Vercel vuelve al modo
automático y convierte los `.py` de `api/` en funciones de verdad.

> Si tu vercel.json actual tenía además `"headers"` o `"redirects"`,
> agregales ese bloque al nuevo (junto a `"rewrites"`). Si no sabés,
> subilo igual y avisame para revisarlo.

---

## Paso 2 — api/index.py (la función FastAPI)

1. **Add file → Create new file** otra vez.
2. Escribí el nombre **con la carpeta incluida**: `api/index.py`
   (al escribir la barra `/`, GitHub crea la carpeta `api` solo).
3. Pegá el contenido completo del archivo `api/index.py` — está en el
   **Apéndice A** de este mismo LEEME (abajo de todo), y también dentro
   del zip `huayu-api-fix-v3.zip`.
4. **Commit changes**.

---

## Paso 3 — api/tts.py (reemplazar el contenido)

1. En la lista de archivos, entrá a la carpeta `api` → `tts.py` → lápiz ✏️.
2. Borrá **todo** y pegá el contenido completo del `api/tts.py` nuevo —
   está en el **Apéndice B** de este LEEME (y en el zip).
3. **Commit changes**.

El tts.py nuevo es ahora **la misma función FastAPI** que index.py (antes
era un "handler" estilo viejo). Así, sin importar en qué modo trabaje tu
repo, los dos archivos son robustos e idénticos. El viejo no estaba roto
como texto: simplemente nunca llegó a ejecutarse.

---

## Paso 4 — Esperar el deploy y verificar (1 minuto)

1. Cada commit dispara un deploy automático en Vercel. Dashboard →
   **Deployments** → esperá el círculo verde **Ready** (~1 minuto).
2. Abrí en el navegador:

   **https://app-chino-espa-ol.vercel.app/api/tts**

   - ✅ Debe verse un JSON: `{"ok":true,"service":"tts","version":"v9.43",...}`
     → **¡FUNCIÓN VIVA!** Abrí la app: la voz neuronal (Xiaoxiao) vuelve
     sola en todos los teléfonos — el 404 nunca quedó cacheado — y el
     aviso ⚠️ deja de aparecer. Probá una voz en Ajustes para celebrar.
   - ❌ `NOT_FOUND` → Paso 5.

---

## Paso 5 — Solo si sigue en NOT_FOUND

Dashboard de Vercel → tu proyecto → **Settings → General** → sección
**Build & Output Settings**:

| Setting | Valor correcto |
|---|---|
| Framework Preset | **Other** |
| Build Command | **vacío** |
| Output Directory | **vacío** |
| Root Directory | **vacío** (importantísimo: si apunta a una subcarpeta, nada de esto se aplica) |

Si cambiaste algo ahí, tocá **Redeploy** (Deployments → último deploy →
menú ⋯ → Redeploy).

Y revisá el deploy: **Deployments → último → Build Logs** → buscá (Ctrl+F)
`python` → debe aparecer una línea construyendo `api/index.py` / `api/tts.py`.

Si sigue fallando, mandame estas 3 cosas y lo cierro de una:
1. Screenshot de la lista de archivos de la **raíz del repo** en GitHub.
2. Screenshot del **Build Logs** del último deploy.
3. Screenshot de **Settings → General** (Build & Output Settings).

---

## Checklist final (así debe verse tu repo)

```
tu-repo/
├── api/
│   ├── index.py      ← NUEVO (Paso 2)
│   └── tts.py        ← reemplazado (Paso 3)
├── index.html
├── app.js
├── sw.js
├── vercel.json       ← NUEVO/REEMPLAZADO (Paso 1)
├── requirements.txt  ← ya está, NO tocar (tiene edge-tts ✓)
└── ... (resto de la app)
```

`vercel.json` y `requirements.txt` al mismo nivel que `index.html`.
La carpeta `api` también al mismo nivel (no adentro de `public/` ni de
ninguna otra carpeta).

---
---

## Apéndice A — contenido de `api/index.py` (pegar completo)

```python
# ============================================================
# api/index.py — v9.43 — TTS neuronal con velocidad en la síntesis
# (FastAPI — el stack que tu repo ya declara en requirements.txt:
#  fastapi + uvicorn + edge-tts + piper-tts)
# ------------------------------------------------------------
# CÓMO FUNCIONA EN VERCEL:
#   Vercel convierte este archivo en una función serverless
#   (api/index.py → /api/index) y el vercel.json del kit
#   redirige /api/tts → /api/index.
#   El handler es CATCH-ALL: responde POST en la ruta que sea
#   (/api/tts, /tts o /api/index), así no depende del path interno.
#
# CONTRATO CON LA APP (idéntico al contrato v9.40):
#   POST { text, lang, voice, speed }  →
#   200 { audio(b64), mime: "audio/mpeg", voice, speed }
#   - speed es opcional (default 1). edge-tts sintetiza YA lento
#     con rate="-15%" para speed 0.85: el cliente NO aplica
#     playbackRate (sin eco). El eco de "speed" en la respuesta
#     es lo que le avisa a la app.
#   - Si edge-tts falla → Piper (sin "speed" en la respuesta →
#     la app compensa con playbackRate, compatible siempre).
#   - Si Piper tampoco → 502 {"error": ...} → la app usa la voz
#     del sistema (comportamiento de siempre, sin romper nada).
# ============================================================

import base64
import io
import json
import os

import edge_tts
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# La app abre el audio desde su propio dominio (same-origin): CORS no es
# estrictamente necesario, pero no molesta y facilita pruebas locales.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# Mapeo de claves del cliente → voces neuronales de Edge.
# El cliente valida con VOICE_EXPECT: f→Xiaoxiao, m→Yunjian,
# f2→Xiaobei, m2→Yunxi (si devuelve otra, avisa "server viejo").
# ------------------------------------------------------------
VOICES = {
    "zh-CN": {
        "f":  "zh-CN-XiaoxiaoNeural",
        "m":  "zh-CN-YunjianNeural",
        "f2": "zh-CN-XiaobeiNeural",
        "m2": "zh-CN-YunxiNeural",
    },
    "es-ES": {
        "f":  "es-ES-ElviraNeural",
        "m":  "es-ES-AlvaroNeural",
        "f2": "es-ES-ElviraNeural",
        "m2": "es-ES-AlvaroNeural",
    },
}
DEFAULT_VOICE_KEY = "f"


def speed_to_rate(speed):
    """0.85 → '-15%', 1.0 → '+0%', 1.2 → '+20%' (formato edge-tts)."""
    return f"{round((speed - 1) * 100):+d}%"


async def synth_edge_bytes(text, voice_name, rate=None):
    """Sintetiza con edge-tts. Devuelve mp3 bytes (velocidad horneada)."""
    kwargs = {}
    if rate and rate not in ("+0%", "-0%", "0%"):
        kwargs["rate"] = rate
    communicate = edge_tts.Communicate(text, voice_name, **kwargs)
    buf = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
    return buf.getvalue()


def synth_piper(text, lang):
    """Fallback local cuando edge-tts falla (voz robótica de reserva).

    SIN cambio de velocidad: la respuesta de Piper NO lleva "speed"
    → la app compensa con playbackRate como siempre (compatible).
    Si tenías tu propia implementación Piper, dejala acá dentro.
    """
    model = os.environ.get("PIPER_MODEL") or ""
    if not model:
        # buscá modelos .onnx junto a este archivo (api/models/xxx.onnx)
        base = os.path.dirname(os.path.abspath(__file__))
        mdir = os.path.join(base, "models")
        pref = "es" if lang and lang.startswith("es") else "zh"
        if os.path.isdir(mdir):
            for fn in sorted(os.listdir(mdir)):
                if fn.endswith(".onnx") and pref in fn:
                    model = os.path.join(mdir, fn)
                    break
    if not model or not os.path.isfile(model):
        raise RuntimeError("Piper sin modelo configurado (env PIPER_MODEL o api/models/*.onnx)")
    from piper import PiperVoice  # import tardío: solo si hay modelo
    voice = PiperVoice.load(model)
    wav = io.BytesIO()
    voice.synthesize(text, wav)
    return wav.getvalue()


def _parse_body(raw):
    try:
        return json.loads((raw or b"").decode("utf-8") or "{}")
    except Exception:
        return {}


def _pick_voice(body):
    lang = str(body.get("lang") or "zh-CN")
    key = str(body.get("voice") or DEFAULT_VOICE_KEY)
    voices = VOICES.get(lang, VOICES["zh-CN"])
    return lang, voices.get(key, voices[DEFAULT_VOICE_KEY])


async def tts_endpoint(body):
    text = str(body.get("text") or "").strip()
    if not text:
        return JSONResponse({"error": "text requerido"}, status_code=400)

    try:
        speed = float(body.get("speed", 1) or 1)
    except (TypeError, ValueError):
        speed = 1.0
    speed = min(1.5, max(0.5, speed))  # clamp defensivo

    lang, voice_name = _pick_voice(body)
    rate = speed_to_rate(speed)

    try:
        # v9.40: la velocidad se hornea EN la síntesis (sin eco en el cliente)
        audio = await synth_edge_bytes(text, voice_name, rate=rate)
        return JSONResponse({
            "audio": base64.b64encode(audio).decode("ascii"),
            "mime": "audio/mpeg",
            "voice": voice_name,
            "speed": speed,  # ← eco: la app NO aplica playbackRate
        })
    except Exception as e_edge:
        try:
            audio = synth_piper(text, lang)
            return JSONResponse({
                "audio": base64.b64encode(audio).decode("ascii"),
                "mime": "audio/wav",
                "voice": "piper",
                # sin "speed": la app compensa (compatible)
            })
        except Exception as e_piper:
            return JSONResponse({
                "error": "tts no disponible",
                "detalle": str(e_edge)[:200] + " | piper: " + str(e_piper)[:200],
            }, status_code=502)


# CATCH-ALL: responde POST en cualquier ruta (/api/tts, /tts, /api/index…)
@app.post("/{full_path:path}")
async def catch_post(request: Request, full_path: str = ""):
    return await tts_endpoint(_parse_body(await request.body()))


# GET informativo: al visitar la URL en el navegador debe responder JSON
# (si da 404, la función no se construyó — mirá LEEME-REPARAR-TTS-3.md)
@app.get("/{full_path:path}")
async def catch_get(full_path: str = ""):
    return {
        "ok": True,
        "service": "tts",
        "version": "v9.43",
        "hint": "POST {text, lang, voice, speed} → {audio, mime, voice, speed}",
    }
```

---

## Apéndice B — contenido de `api/tts.py` (pegar completo, reemplaza todo)

> Es exactamente el mismo código que el Apéndice A, con una cabecera
> distinta. Si preferís, podés copiar de acá o del archivo que viene en
> `huayu-api-fix-v3.zip` — son idénticos.

```python
# ============================================================
# api/tts.py — v9.43 — TTS neuronal con velocidad en la síntesis
# (FastAPI — el stack que tu repo ya declara en requirements.txt:
#  fastapi + uvicorn + edge-tts)
# ------------------------------------------------------------
# QUÉ CAMBIÓ RESPECTO AL tts.py ANTERIOR (el del "handler"):
#   Antes era un handler estilo viejo (def handler(request)).
#   Ahora es FastAPI/ASGI, EXACTAMENTE IGUAL a api/index.py:
#   es el modo de función de Python más probado en Vercel y el
#   que tu repo ya usaba originalmente. Dos archivos, un solo
#   comportamiento — funcionan en ambos modos de Vercel:
#     · Detección automática:  api/tts.py  →  /api/tts
#     · Con el vercel.json del kit: /api/tts llega acá igual
#       (y vía rewrite a /api/index, mismo código).
#
# CONTRATO CON LA APP (idéntico al contrato v9.40, sin cambios):
#   POST { text, lang, voice, speed }  →
#   200 { audio(b64), mime: "audio/mpeg", voice, speed }
#   - speed es opcional (default 1). edge-tts sintetiza YA lento
#     con rate="-15%" para speed 0.85: el cliente NO aplica
#     playbackRate (sin eco). El eco de "speed" en la respuesta
#     es lo que le avisa a la app.
#   - Si edge-tts falla → Piper (sin "speed" en la respuesta →
#     la app compensa con playbackRate, compatible siempre).
#   - Si Piper tampoco → 502 {"error": ...} → la app usa la voz
#     del sistema (comportamiento de siempre, sin romper nada).
#
# GET informativo: al visitar la URL en el navegador responde un
# JSON {"ok": true, "service": "tts", ...} — el "tell" de que la
# función está VIVA (404 = no se construyó).
# ============================================================

import base64
import io
import json
import os

import edge_tts
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# La app abre el audio desde su propio dominio (same-origin): CORS no es
# estrictamente necesario, pero no molesta y facilita pruebas locales.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# Mapeo de claves del cliente → voces neuronales de Edge.
# El cliente valida con VOICE_EXPECT: f→Xiaoxiao, m→Yunjian,
# f2→Xiaobei, m2→Yunxi (si devuelve otra, avisa "server viejo").
# ------------------------------------------------------------
VOICES = {
    "zh-CN": {
        "f":  "zh-CN-XiaoxiaoNeural",
        "m":  "zh-CN-YunjianNeural",
        "f2": "zh-CN-XiaobeiNeural",
        "m2": "zh-CN-YunxiNeural",
    },
    "es-ES": {
        "f":  "es-ES-ElviraNeural",
        "m":  "es-ES-AlvaroNeural",
        "f2": "es-ES-ElviraNeural",
        "m2": "es-ES-AlvaroNeural",
    },
}
DEFAULT_VOICE_KEY = "f"


def speed_to_rate(speed):
    """0.85 → '-15%', 1.0 → '+0%', 1.2 → '+20%' (formato edge-tts)."""
    return f"{round((speed - 1) * 100):+d}%"


async def synth_edge_bytes(text, voice_name, rate=None):
    """Sintetiza con edge-tts. Devuelve mp3 bytes (velocidad horneada)."""
    kwargs = {}
    if rate and rate not in ("+0%", "-0%", "0%"):
        kwargs["rate"] = rate
    communicate = edge_tts.Communicate(text, voice_name, **kwargs)
    buf = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
    return buf.getvalue()


def synth_piper(text, lang):
    """Fallback local cuando edge-tts falla (voz robótica de reserva).

    SIN cambio de velocidad: la respuesta de Piper NO lleva "speed"
    → la app compensa con playbackRate como siempre (compatible).
    Si tenías tu propia implementación Piper, dejala acá dentro.
    """
    model = os.environ.get("PIPER_MODEL") or ""
    if not model:
        # buscá modelos .onnx junto a este archivo (api/models/xxx.onnx)
        base = os.path.dirname(os.path.abspath(__file__))
        mdir = os.path.join(base, "models")
        pref = "es" if lang and lang.startswith("es") else "zh"
        if os.path.isdir(mdir):
            for fn in sorted(os.listdir(mdir)):
                if fn.endswith(".onnx") and pref in fn:
                    model = os.path.join(mdir, fn)
                    break
    if not model or not os.path.isfile(model):
        raise RuntimeError("Piper sin modelo configurado (env PIPER_MODEL o api/models/*.onnx)")
    from piper import PiperVoice  # import tardío: solo si hay modelo
    voice = PiperVoice.load(model)
    wav = io.BytesIO()
    voice.synthesize(text, wav)
    return wav.getvalue()


def _parse_body(raw):
    try:
        return json.loads((raw or b"").decode("utf-8") or "{}")
    except Exception:
        return {}


def _pick_voice(body):
    lang = str(body.get("lang") or "zh-CN")
    key = str(body.get("voice") or DEFAULT_VOICE_KEY)
    voices = VOICES.get(lang, VOICES["zh-CN"])
    return lang, voices.get(key, voices[DEFAULT_VOICE_KEY])


async def tts_endpoint(body):
    text = str(body.get("text") or "").strip()
    if not text:
        return JSONResponse({"error": "text requerido"}, status_code=400)

    try:
        speed = float(body.get("speed", 1) or 1)
    except (TypeError, ValueError):
        speed = 1.0
    speed = min(1.5, max(0.5, speed))  # clamp defensivo

    lang, voice_name = _pick_voice(body)
    rate = speed_to_rate(speed)

    try:
        # v9.40: la velocidad se hornea EN la síntesis (sin eco en el cliente)
        audio = await synth_edge_bytes(text, voice_name, rate=rate)
        return JSONResponse({
            "audio": base64.b64encode(audio).decode("ascii"),
            "mime": "audio/mpeg",
            "voice": voice_name,
            "speed": speed,  # ← eco: la app NO aplica playbackRate
        })
    except Exception as e_edge:
        try:
            audio = synth_piper(text, lang)
            return JSONResponse({
                "audio": base64.b64encode(audio).decode("ascii"),
                "mime": "audio/wav",
                "voice": "piper",
                # sin "speed": la app compensa (compatible)
            })
        except Exception as e_piper:
            return JSONResponse({
                "error": "tts no disponible",
                "detalle": str(e_edge)[:200] + " | piper: " + str(e_piper)[:200],
            }, status_code=502)


# CATCH-ALL: responde POST en cualquier ruta (/api/tts, /tts, /api/index…)
@app.post("/{full_path:path}")
async def catch_post(request: Request, full_path: str = ""):
    return await tts_endpoint(_parse_body(await request.body()))


# GET informativo: al visitar la URL en el navegador debe responder JSON
# (si da 404, la función no se construyó — mirá LEEME-REPARAR-TTS-3.md)
@app.get("/{full_path:path}")
async def catch_get(full_path: str = ""):
    return {
        "ok": True,
        "service": "tts",
        "version": "v9.43",
        "hint": "POST {text, lang, voice, speed} → {audio, mime, voice, speed}",
    }
```
