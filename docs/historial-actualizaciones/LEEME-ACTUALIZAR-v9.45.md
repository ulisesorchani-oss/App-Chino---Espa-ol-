# 🚀 Kit v9.45 — Caché de audios en el servidor

**Qué logra**: la 2.ª vez que el app pide un audio que ya pidió (frases de
lecciones, SRS, karaoke, tarjetas…), responde en **~0,1-0,3 segundos** en vez
de 1-3 s: el CDN de Vercel guarda cada audio y ni siquiera consulta el
servidor. La 1.ª vez de cada frase tarda lo de siempre. Además el servidor
queda más aliviado (menos llamadas a Microsoft = menos riesgo de bloqueo).

**Sin cambios visibles**: mismas voces, misma velocidad, mismos botones.
El aviso de "TTS caído" (v9.41) sigue funcionando igual.

---

## Qué hay en este kit

| Archivo | Destino en tu repo | Qué es |
|---|---|---|
| `api/index.py` | `api/index.py` (REEMPLAZA) | Función v9.44: suma GET cacheable + caché LRU |
| `api/tts.py` | `api/tts.py` (REEMPLAZA) | Idéntico a index.py (mismo comportamiento) |
| `app.js` | `app.js` (REEMPLAZA) | v9.45: pide por GET primero; POST de reserva |
| `sw.js` | `sw.js` (REEMPLAZA) | v90: el GET comparte la caché offline del POST |
| `index.html` | `index.html` (REEMPLAZA) | Sello nuevo del app (20260922a) |

⚠️ **NO toques** `vercel.json` ni `requirements.txt`: ya están bien en tu repo.

---

## PASO 1 — Subir los 2 archivos de la carpeta api

1. Abrí tu repo en GitHub → carpeta **`api`**.
2. Entrá a **`index.py`** → botón del **lápiz** (Edit) → seleccioná TODO el
   contenido (Ctrl+A) → borralo → pegá el contenido de
   **`api/index.py`** de este kit → **Commit changes**
   ("Commit directly to the main branch").
3. Igual con **`api/tts.py`**: lápiz → pegar contenido del kit → Commit.

## PASO 2 — Subir los 3 archivos del app

1. En el repo → **Add file → Upload files**.
2. Arrastrá **`app.js`**, **`sw.js`** e **`index.html`** de este kit.
3. **Commit changes**.

## PASO 3 — Esperar el deploy

Vercel → pestaña **Deployments** → esperá que el nuevo diga **Ready** (1-2 min).

## PASO 4 — Verificar (2 maneras)

**A. Navegador (30 segundos):**
1. Abrí **`https://app-chino-espa-ol.vercel.app/api/tts`** → debe verse JSON
   con **`"version": "v9.44"`** (si dice v9.43, el deploy no terminó).
2. Abrí la **app** en el celu → reproducí una frase → repetila → la 2.ª vez
   sale rápida. (El app se actualiza sola al 2.º arranque; si no, cerrá y
   volvé a abrir.)

**B. Script (opcional, en la compu):**
```
python3 scripts/verify_tts_api.py
```
Debe decir **TODO OK** (6 escenarios, incluye el GET cacheable nuevo).

---

## Por qué es seguro (redes de contención)

- **POST intacto**: si el GET falla por cualquier motivo (404, deploy a
  medias, server viejo), el app cae al POST de siempre. Nunca se queda sin voz.
- **Marca de contrato `X-TTS-Audio: 1`**: el app solo acepta un GET que traiga
  la marca. Si el server fuera viejo (responde el "tell" sin audio con 200),
  el app lo detecta y va al POST. Ni un momento de voz rota.
- **Velocidad en la clave**: 0.85x y 1x son entradas de caché distintas —
  nunca se mezclan (mismo criterio que la caché offline del app desde v9.40).
- **Párrafos largos** (lector libre > 160 caracteres) van directo por POST,
  sin intentar GET (límite práctico de URLs).
- La evaluación de chino y de español **no cambia en nada** (esto solo toca
  la síntesis de audios, no la evaluación).

## Detalle técnico (resumen)

- `GET /api/tts?text=…&lang=…&voice=…&speed=…&cv=1` responde el mismo JSON
  que el POST + `Cache-Control: immutable` → el CDN de Vercel lo guarda.
- LRU en memoria del serverless (300 audios ≈ 15 MB) como 2.ª capa: si el
  CDN expira, la instancia tibia no re-sintetiza.
- El Service Worker (v90) deriva el GET a la MISMA clave
  `text|lang|voice|speed` que el POST → la reescucha offline sigue andando.
- `cv=1` es la versión del contrato de audio: si algún día cambia la
  síntesis, se sube y toda la caché CDN se invalida sola.
