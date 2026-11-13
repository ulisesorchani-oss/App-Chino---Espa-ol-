# video-guia — «Cómo usar Huayu Diario» (mp4 para alumnos)

Genera `out/guia-huayu-v<VERSION>.mp4`: video vertical de ~88 s en español rioplatense (voseo). Cada paso con toque lleva un **globo de 2 a 4 palabras pegado al elemento** (con flechita) y un **aro amarillo** sobre lo que se toca; la barra de subtítulos queda solo para los pasos sin toque (título, cierre, «Al abrir, verás tres pantallas.» y «También hay exámenes.»). Sin música y con pista de audio silenciosa (para sumarle tu voz después, ver `guion.md`).

Graba contra la **copia local** de la app: levanta un servidor estático propio (como `tests/run-all.js`) y maneja Chromium con Playwright. **No toca el código de la app, `sw.js` ni `VERSION`**; solo lee `VERSION` para nombrar el archivo. Esta carpeta está en `.vercelignore` (no se publica) y el mp4 **no se sube al repo** (`out/` está ignorado).

## Requisitos

- Node 18+ y `playwright` con Chromium (el mismo que usan las suites de `tests/`; se busca `playwright` o `/opt/node22/lib/node_modules/playwright`, y Chromium en `PLAYWRIGHT_BROWSERS_PATH` o `/opt/pw-browsers`).
- `ffmpeg` y `ffprobe` en el PATH (con `libx264` y `aac`). Alternativa: `FFMPEG=/ruta/ffmpeg FFPROBE=/ruta/ffprobe`.
- Una fuente de emojis a color (en Linux, «Noto Color Emoji»); si no, 🔊 y los íconos salen como cuadrados.
- Red solo la primera vez: `npm pack hanzi-writer-data@2.0.1` (trazos de la ventana de palabra) se baja a `.cache/`.

## Uso

```bash
node tools/video-guia/build.js
```

Tarda unos 3–4 minutos. Salidas en `tools/video-guia/out/`: el mp4 y tres fotogramas de control (`fotograma-inicio/medio/final.png`). Al terminar imprime una lista de comprobaciones (códec, 720 px de ancho y alto par, pista AAC, peso < 15 MB, duración 70–100 s) y sale con error si alguna falla.

Muestra rápida (sin codificar el mp4): `node tools/video-guia/build.js --muestra` recorre todo el guion pero solo guarda capturas de los pasos marcados con `muestra` en `escenas.js` (`out/muestra/`) y las junta en hojas de contacto (`out/hoja-N.png`). Sirve para revisar el diseño de los globos antes del render completo.

Al terminar (en las dos modalidades) imprime la **tabla de duraciones** (segundos en pantalla de cada globo y cada barra, por escena; también en `out/duraciones.json`) y un informe de globos —qué elementos quedaron pegados a un borde y cómo se ubicó cada uno (`out/globos.json`)—. Las capturas de los globos corridos hasta el margen de 16 px quedan en `out/bordes/` y en las hojas `out/hoja-bordes-N.png`.

Variables opcionales: `FFMPEG`, `FFPROBE`, `CHROMIUM`, `DEBUG_VG=1` (muestra cada paso).

## Cómo funciona

- **Método:** secuencia de capturas (viewport 360×780 a escala 2 → 720×1560) unidas con ffmpeg (`concat` + H.264, CRF 23). Los tiempos son fijos y no dependen de la velocidad de la máquina.
- **Globos, aro de toque, marco de resaltado y subtítulos:** HTML inyectado sobre la app con `page.evaluate` (`overlay.js`); no dependen de fuentes de ffmpeg. Mismo estilo para todos los globos: letra grande, fondo oscuro y borde amarillo (contraste alto, legible con poco brillo).
- **Globo anclado:** se ubica con el rectángulo del elemento en pantalla, **arriba o abajo según haya espacio**, con una flechita hacia el elemento, margen de 16 px a los costados y **uno solo a la vez** (con dos toques en un subtítulo, el globo se mueve de un elemento al otro). Se vuelve a ubicar antes de cada captura (el elemento puede moverse por el scroll). Si una ventana tapa el elemento, el globo se esconde.
  - **Regla dura** (si no hay posición posible, la corrida corta con el nombre de la escena): nunca pisa el elemento tocado, la barra de estado (franja de 28 px arriba), la barra inferior, el hanzi grande de la tarjeta (`#sentence-text`), los avisos de primera vez (`.ob-hint`, `.ob-win`, `#feature-tip-pop`), el nombre (título) de la tarjeta que contiene al elemento ni las etiquetas de su misma fila.
  - **Regla suave:** entre las posiciones posibles (arriba/abajo, centrado o corrido) elige la que **oculta menos texto de la app** (los títulos pesan 6 veces más) y se aleja del centro solo si eso ahorra bastante texto.
  - **Duración:** cada globo dura **2,5 s o más** en pantalla. Si el elemento desaparece al tocarlo (p. ej. «Verificar»), el cuadro anterior se estira con el tiempo que sobra del subtítulo; si no alcanza, la corrida corta y dice cuántos segundos faltan.
- **Barra de subtítulos:** solo para pasos sin toque (`barra: true` en `escenas.js`); va abajo, sobre la barra inferior, o arriba cuando una hoja ocupa el fondo.
- **Voz (`/api/tts`):** no existe en local. Se intercepta con un audio de prueba en silencio (GET → 404, POST → JSON `{audio, mime}`), así no aparece el aviso rojo de voz.
- **Trazos de la ventana de palabra:** la app los pide a `cdn.jsdelivr.net`; se sirven desde el paquete npm `hanzi-writer-data` (en `.cache/`).
- **Perfil:** contexto nuevo en cada corrida. Solo se marcan como vistos (`ac_seen_pares`, `ac_seen_modsheet`) los avisos que no se muestran, y se fija `Math.random` para que la primera tarjeta (爱, respuesta «amar») sea siempre la misma.
- **Cualquier otro pedido a la red** se bloquea y hace fallar la corrida.

## Comprobaciones que hace en cada captura

La corrida **falla** (y no deja mp4) con un mensaje que nombra la escena y el subtítulo si:
- un **globo** toca el elemento tocado, se sale de la pantalla (márgenes de 16 px), queda sobre la barra de estado, la barra inferior, el hanzi o un aviso de primera vez, o no hay lugar para él (la comprobación lee lo que realmente quedó dibujado, aparte de la lógica que lo ubica);
- el texto de un globo tiene menos de 2 o más de 4 palabras, o no cabe en 2 líneas (acortalo);
- un globo dura menos de 2,5 s, o el video pasa de 92,5 s;
- aparece el aviso rojo de voz o cualquier `role=alert`, un dato personal (nombre/correo), o se toca 🎤;
- el subtítulo de la barra tapa algo, tiene más de 8 palabras o no entra en su tiempo;
- la app lanza un error de JavaScript.

## Cuando cambie la app

Todo se edita en **`escenas.js`** (única fuente de verdad: subtítulo, tiempo, selector y acción de cada paso). Si cambia un texto, un `id` o el orden de la primera tarjeta, el script corta con un mensaje que nombra el selector o subtítulo. Después de cambiar tiempos, actualizá la tabla de `guion.md`.

Cada subtítulo tiene `txt` (la frase completa, la de `guion.md`), `secs` (segundos exactos: **no cambian** al cambiar el diseño, así la voz grabada con `guion.md` sigue sirviendo), `globo` (2 a 4 palabras; un texto por cada paso con elemento, en orden) o `barra: true`.

Cada escena tiene además `locucion` (texto corto para grabar la voz). Después de un render, `node tools/video-guia/guion.js` regenera `guion.md` con los textos finales, los segundos de cada globo/barra/escena y la locución.

Pasos disponibles: `tap` (aro + globo + clic), `click` (clic sin aro ni globo), `fill`, `select`, `mira` (marco de resaltado + globo, sin tocar), `ancla` (solo globo), `scroll`, `espera`. Un subtítulo con dos globos usa un aro más corto.

## Archivos

- `build.js` — servidor, grabación, codificación y comprobaciones.
- `escenas.js` — guion (escenas, subtítulos, pasos, segundos).
- `overlay.js` — globo, aro, marco, barra de subtítulos y tarjetas inyectados.
- `guion.js` — regenera `guion.md` desde `escenas.js` y `out/duraciones.json`.
- `guion.md` — guion de locución con el texto final de cada globo y barra, y los segundos de cada uno y de cada escena (se genera con `guion.js`).
- `.gitignore` — ignora `out/` y `.cache/`.
