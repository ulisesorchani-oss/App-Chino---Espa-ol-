# Pendientes de la app · encontrados por las pruebas

Escrito a mano. Cosas de la **app** (no de las pruebas) que una prueba dejó a la vista y que todavía no se corrigen:
las ve Ulises antes de tocar código de la app.

## Entrenar: el subtítulo de «Planillas de escritura» desborda a 320 px con una fuente del sistema más ancha que Inter

- **Dónde:** vista Entrenar, bloque «✍️ Planillas de escritura 写字» (`#writer-banner`, `index.html`): el subtítulo
  `<span class="reader-lang">hojas A4 para imprimir, con orden de trazos</span>`. `.reader-lang` lleva
  `white-space: nowrap` (`style.css`), así que la frase no puede partirse.
- **Cuánto (medido el 2026-11-19, 320 × 740, Chromium de Playwright 1.63.0):** la cabecera mide 243 px de ancho.
  - Con **Inter**: el subtítulo ocupa 269 px, más ancho que su cabecera, pero termina en x = 309 px, dentro de la
    pantalla. No hay desborde. En el contenedor de desarrollo la app sale en Inter por una regla local de fontconfig
    (`/etc/fonts/conf.d/56-prefer-inter.conf`, que no viene de ningún paquete) que manda «Segoe UI», system-ui y
    sans-serif a Inter.
  - Con **DejaVu Sans** (lo que resulta sin esa regla, aun con `fonts-inter` instalado): ocupa 316 px, termina en
    x = 356,2 px y la página desborda **36,2 px** (`scrollWidth` 356 en una pantalla de 320). A 360 px no desborda con
    ninguna de las dos.
  - Roboto (la de Android) no estaba instalada: sin medir.
- **Cómo apareció:** la primera corrida de la batería en GitHub Actions (PR #144) dio roja `practica-hsk4` a 320 px.
  La comprobación junta «HSK 4 dice lecturas» con «la página no desborda», por eso el mensaje nombra a HSK 4; la fila de
  HSK 4 no desborda. Reproducido en el contenedor forzando DejaVu Sans con fontconfig (y también quitando solo la regla
  local): las mismas 8 fallas. La fuente que usó la máquina de GitHub en esa corrida no quedó registrada (desde la
  corrida 2 el workflow la imprime antes y después de instalar las fuentes).
- **Mientras tanto:** el workflow instala `fonts-inter` y la misma regla (`tests/lib/fontconfig/56-prefer-inter.conf`),
  y falla si «Segoe UI», system-ui o sans-serif no resuelven a Inter. Eso hace reproducible la CI; **no** arregla la
  app en dispositivos con una fuente más ancha.
- **Estado:** pendiente. No se corrigió.

## Reintentos del aviso del modo sin conexión (`sw-aviso.js`)

- **Dónde:** `reintentar()` (la guarda `reintentando`, líneas 46, 134, 135 y 145 en el estado de #151) y el listener del evento `online` (línea 160).
- **Qué falta:**
  - Tope de 3 reintentos por sesión en el evento `online`. No cuentan el botón «Reintentar» ni el reintento al abrir.
  - `finally` en `reintentar()` para soltar la guarda, y un tiempo máximo (`AbortController`) en el `fetch`. Hoy un pedido colgado deja el botón en «Descargando…» y los `online` siguientes no hacen nada hasta que ese pedido termine o se recargue la página.
- **Cómo se encontró:** lectura del código. No se midió.
- **Prueba a agregar:** una en `tests/sw-aviso-version.test.js` con 5 eventos `online` seguidos y otra con un pedido colgado.
- **Estado:** corregido en `fix/reintentos-online` (tope de 3 en `online`, `finally` y tiempo máximo de 15 s por pedido; pruebas S y T).

## Cabeceras `Cache-Control` del service worker

- **Qué falta:** verificar las cabeceras `Cache-Control` de `sw.js` y de los archivos del PRECACHE en producción. El `install` no usa `cache: 'reload'`. Si Vercel sirve con `max-age` largo, reforzar la instalación.
- **Cómo se encontró:** en el laboratorio (Chromium, todo servido con `max-age=31536000, immutable`) el cartel de versión nueva apareció, pero tras «Actualizar» la pestaña siguió con el `nav.js` viejo. Qué manda Vercel de verdad no se pudo verificar desde el contenedor.
- **Cómo verificarlo:** `curl -sI https://<dominio>/sw.js` o DevTools → Network (`cache-control`, `age`, `etag`).
- **Estado:** pendiente, sin verificar.

## Dominio de producción

- Revisar GitHub Pages y cuál es el dominio de producción: `app.js:256` menciona `github.io ↔ vercel.app`, y el dominio de Vercel que aparece en el código es la URL de la API de voz.
