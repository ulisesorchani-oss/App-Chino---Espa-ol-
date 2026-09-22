# 🚀 Kit v9.49 — Voz 🇦🇷 ARGENTINA recuperada + voz 🇹🇼 taiwanesa

**Qué logra**:

1. **La voz argentina vuelve** (Elena 👩 / Tomás 👨 de Microsoft Neural) y queda
   como **voz española por defecto**: la app la elige sola la primera vez que
   abrís después de actualizar. El texto de las tarjetas, los dramas DELE, el
   lector libre y la referencia de la evaluación en español ahora suenan 🇦🇷.
2. **Voz china taiwanesa nueva** (小臻 HsiaoChen 👩 / 雲哲 YunJhe 👨 — mandarín
   con acento de Taiwan): entrá al botón 🇨🇳 de voz y ciclá hasta llegar a 🇹🇼.
3. El botón de voz ahora muestra la **bandera de la voz activa**:
   🇦🇷👩 → 🇦🇷👨 → 🇪🇸👩 → 🇪🇸👨 (español) · 🇨🇳👩 → 🇨🇳👨 → 🇹🇼👩 → 🇹🇼👨 → … (chino).
   Tocá el botón para cambiar y escuchás la muestra al instante.

⚠️ Esta ronda toca **la carpeta `api` Y el app**. Hacé primero el PASO 1 (api),
después el PASO 2 (app): si subís solo el app, las voces nuevas caen a la voz
de China y la app te muestra un aviso ⚠️ para recordarte subir el api.

---

## Qué hay en este kit

| Archivo del kit | Destino en tu repo | Qué es |
|---|---|---|
| `api/index.py` | `api/index.py` (REEMPLAZA) | v9.49: suma es-AR (Elena/Tomás) y zh-TW (HsiaoChen/YunJhe) |
| `api/tts.py` | `api/tts.py` (REEMPLAZA) | Idéntico a index.py (mismo comportamiento) |
| `app.js` | `app.js` (REEMPLAZA) | v9.49: ciclos de voz, migración 🇦🇷, idioma que sigue a la voz |
| `lessons-dele.js` | `lessons-dele.js` (REEMPLAZA) | Los dramas DELE usan la voz elegida (🇦🇷/🇪🇸) |
| `voice-evaluator.js` | `voice-evaluator.js` (REEMPLAZA) | La referencia de la evaluación ES usa la voz elegida |
| `sw.js` | `sw.js` (REEMPLAZA) | v94: invalida la caché del app |
| `index.html` | `index.html` (REEMPLAZA) | Sellos nuevos (20260923a) + botones con bandera |

⚠️ **NO toques**: `vercel.json`, `requirements.txt`, `stats.js`, `style.css` ni
ningún otro archivo — ya están bien.

---

## PASO 1 — Subir los 2 archivos de la carpeta api (PRIMERO)

1. Abrí tu repo en GitHub → carpeta **`api`**.
2. Entrá a **`index.py`** → botón del **lápiz** (Edit) → seleccioná TODO el
   contenido (Ctrl+A) → borralo → pegá el contenido de **`api/index.py`** de
   este kit → **Commit changes** ("Commit directly to the main branch").
3. Igual con **`api/tts.py`**: lápiz → pegar contenido del kit → Commit.

## PASO 2 — Subir los 5 archivos del app

1. En el repo → **Add file → Upload files** (en la raíz, NO dentro de api).
2. Arrastrá **`app.js`**, **`lessons-dele.js`**, **`voice-evaluator.js`**,
   **`sw.js`** e **`index.html`** de este kit.
3. **Commit changes**.

## PASO 3 — Esperar el deploy

Vercel → pestaña **Deployments** → esperá que el nuevo diga **Ready** (1-2 min).

## PASO 4 — Verificar (30 segundos)

1. Abrí **`https://app-chino-espa-ol.vercel.app/api/tts`** → debe verse JSON con
   **`"version": "v9.49"`** (si dice v9.44, el deploy no terminó).
2. Abrí la **app** en el celu (cerrala y volvé a abrir si no cambió sola):
   - El botón de voz española ya dice **🇦🇷👩** y todo el español suena argentino.
   - Tocá el botón 🇨🇳 de voz china dos veces → **🇹🇼👩** y escuchás a 小臻.
3. (Opcional, en la compu): `python3 scripts/verify_tts_api.py` → **TODO OK**
   (8 escenarios: ahora prueba también la voz 🇦🇷 y la 🇹🇼).

---

## Detalles que te pueden servir

- **¿Te gusta más la de España?** Tocá el botón de voz hasta 🇪🇸👩/🇪🇸👨 — la
  elección se guarda y la migración 🇦🇷 no vuelve a molestar (es una sola vez).
- **La velocidad ⚡ (0.85x/0.7x) sigue sin eco**: las voces nuevas sintetizan
  con el mismo contrato v9.40 (lo probé en vivo con rate="-15%").
- **La evaluación de chino no cambia en nada**; la de español ahora usa como
  referencia la voz que elijas (🇦🇷 por defecto) — más justo para tu acento.
- **Offline**: el Service Worker guarda los audios nuevos con la MISMA clave
  de siempre (text|lang|voz|velocidad) — no se mezclan con los viejos.
- **Redes de contención**: si el api quedara viejo, las voces nuevas caen a
  Xiaoxiao y la app muestra el aviso ⚠️ "subí el api/tts.py nuevo" (v9.5),
  además de seguir sonando con la voz del sistema si el server se cae.
