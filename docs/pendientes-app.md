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

## Diaria: la URL del audio del servidor no se libera al cortarlo (`daily-stories.js`)

- **Dónde:** `dsPlayLine` crea `URL.createObjectURL(...)` para el audio del servidor y la libera **solo** en `audio.onended`. `dsStop()` (cerrar la escena, ✕, Escape, «Practicar», Atrás, o tocar otro 🔊) pausa `dsPlayer` y lo suelta, pero **no hace `URL.revokeObjectURL`**: un audio cortado antes de terminar deja su blob en memoria hasta cerrar la pestaña.
- **Cómo se encontró:** lectura del código al arreglar el bloque 3 de `fix/un-solo-audio` (A11/A12). **No se midió.**
- **Magnitud esperada:** una frase corta de TTS por cada corte (decenas de KB); no es un problema de uso normal, pero se acumula si se cortan muchas líneas seguidas.
- **Qué falta:** guardar la URL junto a `dsPlayer` y revocarla en `dsStop()` (con cuidado de no revocarla dos veces: `onended` también lo hace). Prueba: una suite que cuente `createObjectURL` / `revokeObjectURL` con un 🔊 cortado.
- **Estado:** pendiente. No se corrigió en el bloque 3 (el pedido era el audio, no la memoria).

## «Escuchar todo» (lecciones TOCFL): resaltado de la línea activa con rayas verticales oscuras

- **Qué se vio (observación visual, sin investigar):** en «Escuchar todo» de lecciones TOCFL con texto largo, el resaltado de la línea activa (`.lq-line.is-playing`, `lessons-listen.js`) se ve con **rayas verticales oscuras** y un **bloque suelto al inicio del segundo renglón** (el texto largo se parte en dos líneas).
- **Dónde se vio:** celular (Android, Brave), en la prueba de los casos h–l (modo avión, con la voz del sistema). **No** se probó en otro navegador ni con la voz del servidor.
- **Cómo se encontró:** a ojo, mientras se probaba el audio en el celular (aviso del usuario).
- **Qué falta:** una Fase 1 de **solo lectura** (reproducir en el navegador con un texto largo y 320/360 px, ver el CSS de `.lq-line.is-playing` y el marcado de la línea), antes de cambiar nada.
- **Estado:** pendiente, sin investigar. No se tocó.

## Diaria: el 🔊 del renglón anterior queda en ⏳ deshabilitado al tocar otro

- **Dónde:** `dsPlayLine`: el botón pasa a «⏳» y `disabled` y solo vuelve en `audio.onended` / `u.onend` (con la guarda `myTok === dsTok`). Al tocar OTRO renglón, `dsStop()` sube el token y corta el audio/la voz del anterior: su restauración no corre (un audio pausado no dispara `ended`; la voz cancelada dispara su evento ya con el token nuevo).
- **Medido** (Chromium, con voz del sistema simulada que avisa `onerror` en el turno siguiente, y con el audio del servidor simulado): después de tocar el renglón 0 y luego el 1, el botón del renglón 0 queda «⏳» y deshabilitado, **igual en `main` (`ed2d19e`) que con el bloque 3**. No lo causa ni lo arregla el bloque 3. En el celular puede variar según cuándo dispare el motor el evento de la voz cancelada (**sin verificar** en un dispositivo real).
- **Qué falta:** restaurar el botón anterior al cortarlo (guardar `{btn, texto}` junto al audio/la voz en curso y devolverlo en `dsStop()`), con su prueba.
- **Estado:** pendiente. No se corrigió.

## Pinyin de «Pronunciación libre»: lecturas que siguen mal y pinyin por palabra

- **Hecho en `fix/pinyin-libre`:** las burbujas usan `pinyinFor(texto, 'hsk')` (como el Lector); 什麼, 還是, 長大, 銀行, 睡覺, 覺得, 音樂… salen bien.
- **Sin arreglar (mismo mecanismo que el Lector y las lecciones, medido en el navegador):**
  - Polifonías que dependen de la oración: 他長得很高 sale «cháng dé» (es «zhǎng de»), 一行人 «yì xíng rén» (es «yì háng rén»), 得去 «dé qù» (es «děi qù»).
  - El tono de la sílaba neutra: 還是 sale «hái shì» (los diccionarios escriben «háishi»).
  - Texto con letras latinas dentro de la transcripción: sale letra por letra, y `pinyinFor` pega una «r» suelta a la letra anterior (la regla del 兒: `/ r(?= |$)/`), así que «world» sale «w or l d» (antes «w o r l d»).
- **Pinyin agrupado por palabra** («shénme», «dōngxi», «háishi»): **no** se hizo. Las tarjetas lo muestran desde los datos de vocabulario por palabra (con `háishi` en HSK y `háishì` en TOCFL), pero ningún mecanismo de oraciones de la app agrupa; el espacio entre sílabas es la convención de la app. Sería una función nueva (segmentar por palabra y consultar los datos), no un arreglo.
- **Estado:** pendiente, sin investigar más.
- **Regresiones medidas en este cambio (43 de 7 816 formas tradicionales de los datos de la app; 578 mejoran).** `pinyinFor` pasa cada carácter a simplificado y varios tradicionales distintos caen en un simplificado polífono, así que algunas palabras que pinyin-pro leía bien en tradicional ahora salen mal, **igual que en el Lector** (es el mismo mecanismo): 為 como «wèi» en 變為, 列為, 視為, 定為, 尤為, 為人, 身為, 有為, 為師, 孝為先 (es «wéi»); 臟 en 心臟, 肝臟 (es «zàng», sale «zāng»); 髮 en 理髮, 千鈞一髮 (es «fà»); 幹 en 幹嘛, 說幹就幹 (es «gàn»); 載體, 轉動, 處在, 盡可能, 還款 («huán kuǎn»); y varios caracteres sueltos (調, 應, 夾, 桿, 鋪, 鑽, 縫, 捲, 擰, 嗆, 囂, 蔭). Arreglo posible: sumarlas a `PINYIN_ERRORES` (`pinyin-familias.js`), pero eso cambia el pinyin de toda la app, no solo de free-talk: **PR aparte, con tu OK**.
