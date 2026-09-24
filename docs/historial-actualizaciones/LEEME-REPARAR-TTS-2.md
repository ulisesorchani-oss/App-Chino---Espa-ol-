# 🔧 LEEME 2 — El archivo está en api/ pero sigue en 404 — v9.42

## Qué descubrí al re-verificar tu deployment (2026-09-19)

1. El aviso en pantalla ya funciona → **la v9.41 de la app está deployada OK**.
2. `/api/tts` sigue en **404** y `api/tts.py` sigue servido como **archivo
   estático** (descarga), aunque está en la carpeta `api/`.
3. **Pista decisiva**: tu `requirements.txt` (visible en el sitio) declara
   `fastapi` + `uvicorn` + `edge-tts` + `piper-tts` → tu API original era una
   app **FastAPI** (`api/index.py` con un `app = FastAPI()`), no un archivo
   suelto. Y ese `api/index.py` **ya no existe** en el deploy (404).
4. Conclusión: al subir el tts.py nuevo se perdió el **entrypoint** que
   Vercel sí reconocía como función. Además, el síntoma "todo servido como
   estático" indica que tu `vercel.json` tiene una config legada de
   `builds` que no incluye el builder de Python (o hay un "Output
   Directory" configurado que se come la carpeta api/).

## La reparación (2 archivos nuevos, 3 minutos)

Subí a la **raíz del repo** (al lado de index.html) estos dos archivos que
vienen en `huayu-api-fix-v2.zip`:

```
repo/
├── index.html          ← ya está
├── requirements.txt    ← ya está (fastapi/uvicorn/edge-tts ✓)
├── vercel.json         ← NUEVO (reemplazá el que haya)
└── api/
    ├── index.py        ← NUEVO (FastAPI, el entrypoint que faltaba)
    └── tts.py          ← el que ya subiste (puede quedarse, no molesta)
```

### Paso 1 — vercel.json (en la RAÍZ del repo)

```json
{
  "rewrites": [
    { "source": "/api/tts", "destination": "/api/index" }
  ]
}
```

> Si tu vercel.json actual tenía otras secciones (headers, redirects),
> no las pierdas: agregale el bloque `"rewrites"` a lo que ya tiene.
> Si no sabés, avisame y lo revisamos juntos.

### Paso 2 — api/index.py (FastAPI)

Es el archivo que viene en el ZIP. Puntos clave:
- expone `app = FastAPI()` (lo que Vercel necesita para armar la función)
- implementa POST en **cualquier ruta** (catch-all): /api/tts funciona
  venga de donde venga
- mantiene el contrato v9.40 completo: `speed` → rate de edge-tts →
  eco de `speed` en la respuesta (sin eco en el audio)
- GET en cualquier ruta devuelve un JSON informativo: si visitás
  `https://app-chino-espa-ol.vercel.app/api/tts` en el navegador y ves
  `{"ok": true, "service": "tts", ...}` → la función está VIVA

### Paso 3 — Revisar Settings (solo si sigue en 404)

Dashboard de Vercel → tu proyecto → **Settings → General**:

| Setting | Valor correcto |
|---|---|
| Framework Preset | **Other** |
| Build Command | **vacío** |
| Output Directory | **vacío** |
| Root Directory | **vacío** |

Si "Output Directory" tiene algo puesto (p. ej. `public` o `.`), la carpeta
`api/` queda atrapada en los estáticos y ninguna función se construye — es
exactamente tu síntoma. Borrá ese valor y guardá.

### Paso 4 — Verificar

1. Esperá que el deploy quede **Ready** (~1 min después de subir).
2. Dashboard → Deployments → último deploy → debe listar **Functions**
   (algo como `api/index`).
3. Corré el verificador desde tu compu: `python3 scripts/verify_tts_api.py`
   → debe decir **TODO OK** (voz Xiaoxiao + eco speed 0.85 + español).
4. Abrí la app: la voz neuronal vuelve sola (el 404 nunca quedó cacheado)
   y el aviso rojo deja de aparecer.

## Si todavía nada

Mandame y lo resolvemos al toque:
- screenshot del deploy en Vercel (pestaña **Functions** y **Build Logs**), o
- el contenido de tu `vercel.json` actual, o
- qué muestra Settings → General en "Build & Output Settings".
