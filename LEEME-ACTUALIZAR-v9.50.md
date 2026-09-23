# 🚀 Kit v9.50 — Aprender primero · modo oscuro en capas · voces masculinas arregladas

**Qué logra**:

1. **Aprender es la pantalla de inicio.** "Primero se aprende, luego se practica":
   la barra inferior queda **Aprender · Hoy · Entrenar · Yo** y la app abre en
   Aprender. Al elegir un módulo seguís volviendo a Hoy para practicar. El
   subtítulo ahora dice "Elegí qué aprender" (español y chino).
2. **Pestañas de Aprender reordenadas**: **Lecciones · Exámenes · Diaria ·
   Clásicos**, y se abre en Lecciones.
3. **Modo oscuro mejorado**:
   - Las **palabras aprendidas ya se ven** (antes tenían fondo verde claro con
     texto blanco: invisibles). Ahora son verde translúcido con texto claro.
   - **Capas de gris** en vez de todo negro: fondo de página < paneles <
     elementos elevados (tarjetas de lección, chips, pestañas, botones) <
     popups. Bordes más visibles para distinguir cada panel.
4. **Voces masculinas 🇦🇷 (Tomás) y 🇹🇼 (YunJhe) arregladas.** El api recibía las
   claves `ar-m` / `tw-m` y no las reconocía, así que siempre respondía la
   femenina. Ahora el api las traduce bien. Además se invalidaron las cachés
   de audio (service worker y CDN) que conservaban los audios femeninos viejos.

⚠️ Esta ronda toca **la carpeta `api` Y el app**. Hacé primero el PASO 1 (api),
después el PASO 2 (app).

---

## Qué hay en este kit

| Archivo | Destino en tu repo | Qué es |
|---|---|---|
| `api/index.py` | `api/index.py` (REEMPLAZA) | `_pick_voice`: `ar-m`/`tw-m` → `m` (voz masculina real) |
| `api/tts.py` | `api/tts.py` (REEMPLAZA) | Idéntico a index.py |
| `app.js` | `app.js` (REEMPLAZA) | Aprender por defecto, orden de vistas y pestañas, subtítulo, `cv=2` en el GET de audio |
| `index.html` | `index.html` (REEMPLAZA) | Barra y pestañas reordenadas, sello `app.js?v=20260923b` |
| `style.css` | `style.css` (REEMPLAZA) | Bloque v12 al final: modo oscuro en capas + palabras aprendidas |
| `sw.js` | `sw.js` (REEMPLAZA) | v98 y caché de audios `chino-es-tts-v2` (descarta los audios femeninos viejos) |

⚠️ **NO toques**: `vercel.json`, `requirements.txt`, `stats.js`, `lessons*.js`,
`voice-evaluator.js` ni ningún otro archivo — ya están bien.

---

## PASO 1 — Subir los 2 archivos de la carpeta api (PRIMERO)

1. Abrí tu repo en GitHub → carpeta **`api`**.
2. Entrá a **`index.py`** → botón del **lápiz** (Edit) → seleccioná TODO el
   contenido (Ctrl+A) → borralo → pegá el contenido de **`api/index.py`** de
   este kit → **Commit changes** ("Commit directly to the main branch").
3. Igual con **`api/tts.py`**: lápiz → pegar contenido del kit → Commit.

## PASO 2 — Subir los 4 archivos del app

1. En el repo → **Add file → Upload files** (en la raíz, NO dentro de api).
2. Arrastrá **`app.js`**, **`index.html`**, **`style.css`** y **`sw.js`**.
3. **Commit changes**.

## PASO 3 — Esperar el deploy

Vercel → pestaña **Deployments** → esperá que el nuevo diga **Ready** (1-2 min).

## PASO 4 — Verificar (1 minuto)

1. Comprobá el api abriendo estas dos direcciones (con tu dominio). El campo
   `voice` del JSON debe ser masculino; `&cv=99` evita ver una respuesta guardada:
   - `https://app-chino-espa-ol.vercel.app/api/tts?text=你好&lang=zh-TW&voice=tw-m&cv=99`
     → `"voice": "zh-TW-YunJheNeural"`
   - `https://app-chino-espa-ol.vercel.app/api/tts?text=hola&lang=es-AR&voice=ar-m&cv=99`
     → `"voice": "es-AR-TomasNeural"`
   
   Si aparece `HsiaoChenNeural` o `ElenaNeural`, el deploy del api no terminó
   o quedó el `index.py` viejo (la función `_pick_voice` debe tener
   `if "-" in key:`).
2. Abrí la **app** y recargala **dos veces** (Ctrl+F5 en la compu; en el celu
   cerrala y volvé a abrir) para que entre el service worker nuevo:
   - Abre en **Aprender**, con **Lecciones** como primera pestaña.
   - Barra inferior: Aprender · Hoy · Entrenar · Yo.
   - Botón de voz 🇦🇷 → 👨 y 🇹🇼 → 👨: suenan masculinas, y en la consola no
     aparece el aviso ⚠️ "El servidor TTS no tiene aún la voz…".
   - Modo oscuro (🌙): "Palabras aprendidas" se lee bien y los paneles se
     distinguen del fondo.

---

## Detalles que te pueden servir

- **Nota sobre el JSON del api**: sin `?text=` el api sigue diciendo
  `"version": "v9.49"`; ese texto no cambió. Para saber si el arreglo está
  desplegado usá la prueba del PASO 4, no la versión.
- **Abre siempre en Aprender solo la primera vez**: la app recuerda la última
  vista (`ac_view_v1`) y la última pestaña de Aprender (`ac_tab`). Si tu
  navegador de prueba abre en otra, elegí Aprender/Lecciones una vez.
- **Por qué seguían saliendo voces femeninas aunque el api ya estaba bien**:
  el service worker guardaba cada audio con la clave `texto|idioma|voz|velocidad`
  sin versión, y el GET del audio tiene caché `immutable` de un año. Por eso
  esta ronda sube el nombre de la caché de audios (`v1` → `v2`) y el parámetro
  `cv` (`1` → `2`). Los audios se vuelven a generar una vez; después quedan
  guardados como siempre.
- **Offline**: los audios que ya reescuchaste en `v1` se pierden una vez (se
  vuelven a descargar al oírlos con conexión).
- **Bump futuro de voces**: si algún día cambiás qué voz responde a una clave,
  subí de nuevo `cv` en `app.js` y `TTS_CACHE` en `sw.js`.
