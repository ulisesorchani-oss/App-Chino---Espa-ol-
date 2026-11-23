# Pendientes de la app · encontrados por las pruebas

Escrito a mano. Cosas de la **app** (y, al final, de las pruebas y del CI) que una prueba dejó a la vista y que todavía no se corrigen:
las ve Ulises antes de tocar código de la app.

**Índice rápido de lo consolidado el 2026-11-23** (secciones al final del archivo): [Para el docente (pinyin)](#para-el-docente-pinyin-lista-de-preguntas) · [Observaciones de Gemini en #166](#observaciones-de-gemini-en-166-muestra-de-voz-y-su-veredicto) · [`lector-oro`](#lector-oro-intermitencia-qué-se-hizo-y-qué-queda) · [Observaciones visuales](#observaciones-visuales-sin-investigar) · [Diferido](#diferido-nada-de-esto-está-aprobado-todavía).

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
- **Regresiones medidas en #162 (43 de 7 816 formas tradicionales; 578 mejoran):** tratadas en `fix/pinyin-correcciones` (abajo). El detalle original queda como historia:  `pinyinFor` pasa cada carácter a simplificado y varios tradicionales distintos caen en un simplificado polífono, así que algunas palabras que pinyin-pro leía bien en tradicional ahora salen mal, **igual que en el Lector** (es el mismo mecanismo): 為 como «wèi» en 變為, 列為, 視為, 定為, 尤為, 為人, 身為, 有為, 為師, 孝為先 (es «wéi»); 臟 en 心臟, 肝臟 (es «zàng», sale «zāng»); 髮 en 理髮, 千鈞一髮 (es «fà»); 幹 en 幹嘛, 說幹就幹 (es «gàn»); 載體, 轉動, 處在, 盡可能, 還款 («huán kuǎn»); y varios caracteres sueltos (調, 應, 夾, 桿, 鋪, 鑽, 縫, 捲, 擰, 嗆, 囂, 蔭). Arreglo posible: sumarlas a `PINYIN_ERRORES` (`pinyin-familias.js`), pero eso cambia el pinyin de toda la app, no solo de free-talk: **PR aparte, con tu OK**.

## Pinyin: lo que `fix/pinyin-correcciones` NO corrige (para el docente)

- **Dudosas, fuera de la tabla (decide el docente):**
  - **盡可能:** los datos de HSK5 dicen «jìn kěnéng»; pinyin-pro dice «jǐn kěnéng», que es lo estándar. **El error probablemente está en los datos de HSK5.**
  - **處在:** «chǔ zài» como en 處在困境, pero 好處在於 y 到處在找 se leen distinto; una entrada por palabra rompería esas frases. Quedan como pinyin-pro.
  - **為人 / 有為 / 為師:** «wéi» en 為人 (conducta), 有為, 為師; pero 為人民 es «wèi rénmín» (una entrada 為人 necesitaría la exclusión «民»).
  - **轉動:** existen «zhuǎndòng» y «zhuàndòng» con sentidos distintos; los datos dicen «zhuǎn», pinyin-pro «zhuàn».
  - **定為** (sacada de la tabla por decisión del usuario): «wèi» (por, para) en 一定為你 / 決定為你 / 肯定為你 (他一定為你高興 = «tā yí dìng wèi nǐ gāo xìng») y «wéi» (como) en 被定為國家公園, 被認定為英雄, 設定為預設, 確定為目標. Con la palabra sola no se distingue y una guarda por prefijo (一 / 決 / 肯 / 確) también tapaba 確定為目標. **Queda como pinyin-pro («wèi» siempre): los «wéi» siguen mal** (fijado en la suite como límite conocido, junto con las frases en «wèi», que siguen bien). **Para el docente:** ¿hay una regla simple para distinguirlas (qué sigue a 為: sustantivo/pronombre vs. «国家公园», «英雄»)? Sin eso no se agrega.
- **Grupos C y D de las 43** (sílaba neutra y caracteres sueltos polífonos): no se tocan; los sueltos no se arreglan con un diccionario por carácter.
- **Límite aceptado de la regla por carácter:** 臟 se lee siempre «zàng» (órganos); en texto informal se escribe 臟 por 髒 («sucio», zāng) y ahí da «zàng» (fijado en la suite: 很臟). Para quien escribe en simplificado la regla por carácter no actúa (发, 脏 y 干 son polífonos): por eso las 6 palabras del grupo A también van por palabra.
- **Otros 为 con pronombre a la derecha** (改變為你而來, 終身為你服務, 電視為你直播: «wèi») salen hoy «wéi» con las claves 变为 / 身为: **riesgo conocido, medido**, aceptado por ser raros; pero **視為你的朋友** es «wéi» (correcto) y no se puede proteger con un pronombre. Revisar con el docente.
- **TOCFL: 髮 = «fǎ»; HSK: 髮 = «fà». PENDIENTE DE CONFIRMAR CON EL DOCENTE.** «fǎ» sigue la lista TOCFL (头发 «tóu fǎ», 发型 «fǎ xíng») y el estándar de Taiwán; «fà» es el del continente. Esto cambia 理髮, 千鈞一髮 y 銀髮族 (hoy «fà») a «fǎ» en la familia TOCFL. Si el docente prefiere «fà» también en TOCFL: sacar la entrada `'髮': 'fǎ'` de `PINYIN_CARACTERES_TRAD.tocfl` y el «lǐ fǎ» de 理发 (los dos tienen mutación en `tests/pinyin-correcciones.test.js`).
- **乾嗎** («¿está seco?») no se corrige a «gàn ma» (la guarda de 乾 lo salta); queda como pinyin-pro («gàn má», que también está mal: debería ser «gān ma»).
- **Con 了 y 什么 después de una entrada con 为** se deja la lectura de pinyin-pro: «變為了現實» (biànwéi le) sale «biàn wèi le».
- **Sin mutación propia:** la regla «coincidencia más larga primero» (no hay claves que se contengan entre sí hoy).

## Para el docente (pinyin): lista de preguntas

Todo esto sale de `fix/pinyin-correcciones` (#164); el detalle y los ejemplos están arriba, en «Pinyin: lo que `fix/pinyin-correcciones` NO corrige». Ninguna de estas palabras está en la tabla (leen como pinyin-pro) salvo la nota de 髮:

1. **為人 / 有為 / 為師:** ¿«wéi» (conducta, «ser maestro»)? Ojo: 為人民 es «wèi rénmín»; una entrada 為人 necesitaría una exclusión («民»).
2. **轉動:** ¿«zhuǎndòng» o «zhuàndòng»? Los datos dicen «zhuǎn»; pinyin-pro dice «zhuàn».
3. **盡可能:** los datos de HSK5 dicen «jìn kěnéng»; pinyin-pro dice «jǐn kěnéng», que es lo estándar. **Probable error en los datos de HSK5.**
4. **處在:** «chǔ zài» en 處在困境, pero 好處在於 y 到處在找 se leen distinto (¿se puede decidir por contexto?).
5. **定為:** «wèi» (por, para) en 一定為你 / 決定為你 / 肯定為你, y «wéi» (como) en 被定為國家公園, 被認定為英雄, 設定為預設. Con la palabra sola no se distingue; hoy sale «wèi» siempre y los «wéi» siguen mal. ¿Hay una regla simple (qué sigue a 為)?
6. **髮 en TOCFL: «fǎ» frente a «fà».** Hoy TOCFL usa «fǎ» (lista TOCFL y estándar de Taiwán) y HSK «fà»; cambia 理髮, 千鈞一髮 y 銀髮族 en TOCFL. Si el docente prefiere «fà» también en TOCFL, hay que sacar `'髮': 'fǎ'` de `PINYIN_CARACTERES_TRAD.tocfl` y el «lǐ fǎ» de 理发 (los dos tienen mutación en `tests/pinyin-correcciones.test.js`).

## Observaciones de Gemini en #166 (muestra de voz) y su veredicto

La revisión informativa de Gemini en #166 dejó dos observaciones menores (no bloqueantes):

1. **«`READER_REPRO` sin guarda: posible `ReferenceError` si se invoca antes de que cargue el lector» → falsa alarma.** Verificado (solo lectura, sobre `main` con #166 y medido en el navegador):
   - `audio-tts.js` y `reader.js` son `<script>` comunes, sin `defer` (líneas 921 y 933 de `index.html`); `reader.js` carga después, pero `cortarParaMuestra` solo corre al tocar un botón.
   - `cortarParaMuestra` mira `typeof stopReader === 'function' && typeof READER_REPRO !== 'undefined'` **antes** de usar la variable (la misma condición que Clásicos, lecciones y examen).
   - Medido: sesión nueva sin abrir el Lector, Yo → Ajustes, tres toques en 🇨🇳/🇦🇷 (zh, es, zh): **sin errores JS** con el servidor sano, con el servidor caído y con `state-machine.js` bloqueado. Con `reader.js` bloqueado y llamando a `playVoiceSample` directo: sin errores de ese código y la muestra habló con la voz del sistema.
   - Nota: con `reader.js` bloqueado el botón no responde porque `app.js` falla al cargar (`readCurrentLesson is not defined`); pasa igual en `main` y es un caso artificial.
2. **«El `speechSynthesis.cancel()` global de `speakVoiceSampleSystem` puede cortar la voz de otros componentes» → diseño aprobado.** Se conserva a propósito: los navegadores encolan `speak()` y sin el cancel la muestra esperaría detrás de la otra voz; es el mismo criterio de `srsSpeak`. Sin cambios. Queda sin verificar el timing con motores de voz reales.

## `lector-oro`: intermitencia, qué se hizo y qué queda

**La suite** (`tests/lector-oro.test.js`): 17 escenarios que comparan la traza completa de eventos, en orden exacto, contra `tests/data/lector-oro.json` (con el `<audio>` real, TTS simulado por `page.route` y voz del sistema simulada). El oro se grabó con el código **anterior** a las máquinas de estado y prueba que la formalización da la misma traza: **no se puede regrabar desde `main`**; cualquier cambio debe dejar el oro idéntico (`git diff --exit-code -- tests/data/lector-oro.json`) y `tests/lector-mutaciones.test.js` en rojo.

**Frecuencia (lo que se pudo mostrar; muestras chicas):**
- CI, hasta el 2026-11-22 (antes de #167): 1 falla de `lector-oro` en unas 28 corridas completas de la batería (en #160; es un mínimo: la API solo muestra el último intento). Firma: `[sin-maquina · sano]`, evento 21, el oro espera `audio.ended` y salió `audio.playing`.
- Local sobre `main` (4 núcleos): 0 de 3 en serie; 1 de 16 con 8 en paralelo (firma distinta, abajo). El hardware de CI no se conoce.

**Mecanismos:**
- **(a) Carrera entre un `delay` fijo y la respuesta simulada de `/api/tts`** (medido). **Hecho en #167:** `R2-pausa-sin-voz` dispara con `resp L0 503` en vez de «⏳ + 20 ms»; con una latencia inyectada de 150 ms el disparador viejo falla (evento 7) y el nuevo pasa; oro idéntico, `lector-mutaciones` en rojo, 0 de 16 rojas en paralelo después (1 de 16 antes).
  - **Queda (misma carrera, sin tocar; esperan el OK):** `R2-pausa-en-carga-con-voz` (20 ms tras el 2.º ⏳; propuesta `{ when: 'resp L1 503', n: 1, do: 'pausa' }`) y `R2-pausa-voz-ignora-pausa-y-sigue` (100 ms tras `voz.end L1`; propuesta `when: 'resp L2 503'`).
  - **Se propone dejarlos** los de 30 y 50 ms (`pausa-en-voz-del-sistema`, `pausa-voz-ignora-pausa` y el de 30 del otro): compiten, según el análisis (**no medido**), con los temporizadores de 15/90 ms de la voz simulada de la propia página.
- **(b) La firma de CI: no reproducida (no refutada).** 240 corridas de `sano` (con y sin `state-machine.js`) con 8 procesos y 4 quemadores de CPU, registrando `waiting`/`stalled`/`suspend`/…: ningún `audio.playing` repetido. Sin cambios en la instrumentación. Si algún día se confirma un `playing` repetido por buffering, la dedupe debe dejar visible un doble `play()` real (quedaría un `audio.play` repetido).
- **(c) Hallazgo nuevo (sin tocar):** 5 de esas 240 corridas (2 %) difirieron del oro porque un `cancel` se movió respecto de `resp L0/L1 200`. Ese `cancel` viene de `lessons-dele.js` (`applyMode` → `stopSpeak`, también desde un `MutationObserver`). Ver «Diferido».

**Riesgo latente, sin evidencia de falla:** los `sleep(1300)` tras `goto` y `sleep(300)` al final (se podrían cambiar por esperas de condición); no se tocaron.

## Observaciones visuales (sin investigar)

- **«Escuchar todo» en TOCFL con texto largo** que se parte en dos renglones: el resaltado de la línea activa se ve con rayas verticales oscuras y un bloque suelto al inicio del segundo renglón. Detalle y lo que falta (Fase 1 de solo lectura): ver «“Escuchar todo” (lecciones TOCFL)…», arriba. Visto en el celular (Android, Brave); no probado en otro navegador.
- **Fuente monoespaciada en el título de la tarjeta, en Windows** (reportado por el usuario). **A confirmar en Chrome y en Edge** (qué pantalla y qué título exactos, y con qué fuente se dibuja). **Sin investigar.** Dato de lectura (no la causa): un `grep` de `monospace`/`Consolas`/`Courier` en todos los `*.css`, `*.js` y `*.html` del repo (sin `tests/`) solo da `diag-voz.html` (una página de diagnóstico) y la librería `jspdf`; ni `style.css` ni el CSS inyectado desde JS lo declaran. Antes de cambiar nada: Fase 1 de solo lectura con captura en Windows.

## Diferido (nada de esto está aprobado todavía)

Cada punto empieza con una Fase 1 de solo lectura y el OK del usuario antes de implementar.

1. **`speechSynthesis.cancel()` global de `lessons-dele.js` (mecanismo (c) de `lector-oro`).** `applyMode` → `stopSpeak` (líneas ~1061 y ~1661, llamado desde `injectPanel` y desde un `MutationObserver`). **Hipótesis (no medida):** fuera del modo cn-es esa ruta hace un cancel global ante mutaciones del DOM; con el Lector hablando con la voz del sistema es el tipo de cancel global que el bloque 5 midió haciendo avanzar al Lector. No se identificó qué mutación lo dispara; además queda grabado en el oro de `lector-oro`.
2. **`stopAllAudio()`** (diseño de una función única que cada fuente llame al arrancar). Es el hueco que dejan los bloques «un solo audio a la vez»: otro módulo que arranca **mientras suena la muestra de voz** (~2 s) no la corta; la **Diaria (A11)** sigue superponiéndose con ella; y hay **8 `Audio` sin corte externo** (A04, A07, A09, A11, A13, A15, A20, A23; ver `docs/matriz-de-audio.md`). La muestra que llega **tarde** (servidor lento) corta al Lector que arrancó **después** (medido en #166; antes se superponían): decisión pendiente de si debe ganar el Lector.
3. **Retoques del workflow de Gemini** (el detalle y las pruebas están en `docs/prueba-gemini-revision.md`, sección «Pendientes del workflow»; el punto de la cuota 429 se agregó ahí en este PR): aviso «probable timeout del paso» cuando `ERROR_GEMINI` venga vacío y el paso llegue a su timeout; `tools.exclude` está deprecado pero **no quitarlo** sin una prueba de que `tools.core` solo ya deniega `run_shell_command`; el detalle del error se recorta a 1500 bytes y los avisos de arranque del CLI lo pueden tapar; y un fallo por cuota (429) trae `ERROR_GEMINI` no vacío, distinto de un timeout.
4. **Atenuado visual de ▶ mientras se graba** (Pronunciación libre, #165): hoy solo `aria-disabled="true"`, sin ninguna señal visual (no hay CSS para `[aria-disabled]`); sería un cambio en `style.css` con bump de `sw.js`.
5. **`lector-oro`:** aplicar las dos propuestas pendientes de arriba (cuando el usuario escriba «seguí con lector-oro»).
