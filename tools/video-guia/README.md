# video-guia — «Cómo usar Huayu Diario» (mp4 para alumnos)

Genera `out/guia-huayu-v<VERSION>.mp4`: video vertical de ~85 s, subtítulos en español rioplatense (voseo), un círculo amarillo sobre cada cosa que se toca, sin música y con pista de audio silenciosa (para sumarle tu voz después, ver `guion.md`).

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

Variables opcionales: `FFMPEG`, `FFPROBE`, `CHROMIUM`, `DEBUG_VG=1` (muestra cada paso).

## Cómo funciona

- **Método:** secuencia de capturas (viewport 360×780 a escala 2 → 720×1560) unidas con ffmpeg (`concat` + H.264, CRF 23). Los tiempos son fijos y no dependen de la velocidad de la máquina.
- **Subtítulos, círculo de toque y marco de resaltado:** HTML inyectado sobre la app con `page.evaluate` (`overlay.js`); no dependen de fuentes de ffmpeg. El subtítulo va sobre la barra de abajo (o arriba cuando una hoja ocupa el fondo).
- **Voz (`/api/tts`):** no existe en local. Se intercepta con un audio de prueba en silencio (GET → 404, POST → JSON `{audio, mime}`), así no aparece el aviso rojo de voz.
- **Trazos de la ventana de palabra:** la app los pide a `cdn.jsdelivr.net`; se sirven desde el paquete npm `hanzi-writer-data` (en `.cache/`).
- **Perfil:** contexto nuevo en cada corrida. Solo se marcan como vistos (`ac_seen_pares`, `ac_seen_modsheet`) los avisos que no se muestran, y se fija `Math.random` para que la primera tarjeta (爱, respuesta «amar») sea siempre la misma.
- **Cualquier otro pedido a la red** se bloquea y hace fallar la corrida.

## Comprobaciones que hace en cada captura

La corrida **falla** (y no deja mp4) si aparece el aviso rojo de voz o cualquier `role=alert`, un dato personal (nombre/correo), si se toca 🎤, si el subtítulo tapa lo que se toca, si algún subtítulo tiene más de 8 palabras o no entra en su tiempo, o si la app lanza un error de JavaScript.

## Cuando cambie la app

Todo se edita en **`escenas.js`** (única fuente de verdad: subtítulo, tiempo, selector y acción de cada paso). Si cambia un texto, un `id` o el orden de la primera tarjeta, el script corta con un mensaje que nombra el selector o subtítulo. Después de cambiar tiempos, actualizá la tabla de `guion.md`.

Pasos disponibles: `tap` (círculo + clic), `click` (sin círculo), `fill`, `select`, `mira` (marco de resaltado, sin tocar), `scroll`, `espera`. Un subtítulo con dos toques usa un círculo más corto.

## Archivos

- `build.js` — servidor, grabación, codificación y comprobaciones.
- `escenas.js` — guion (escenas, subtítulos, pasos, segundos).
- `overlay.js` — subtítulo, círculo, marco y tarjetas inyectados.
- `guion.md` — guion de locución con los segundos de cada escena.
- `.gitignore` — ignora `out/` y `.cache/`.
