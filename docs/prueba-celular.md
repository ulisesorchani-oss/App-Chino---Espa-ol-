# Prueba en el celular (voz del sistema, modo avión)

> **Archivo nuevo, escrito a mano.** La batería (`node tests/run-all.js`) **no prueba la voz real del teléfono**: el servidor y la voz del sistema van **simulados** (`speechSynthesis` y `/api/tts` falsos). Lo que sigue se verifica **en un dispositivo real**, a mano. Nació con la rama `fix/podcast-voz-sistema` (Podcast por frases).

## Cómo prepararse

1. **Modo avión** (Wi-Fi y datos apagados) con la app ya instalada/abierta una vez, para que cargue desde el service worker.
2. **Usá texto que nunca hayas escuchado con la voz del servidor.** El service worker guarda en `chino-es-tts-v2` los audios que ya sonaron: una línea o lección que ya escuchaste online puede sonar desde ahí **sin usar la voz del sistema**, y la prueba no prueba nada. Si dudás, borrá los datos del sitio (Ajustes del navegador → Datos del sitio) y volvé a abrir la app antes de pasar a modo avión.
3. Tené instalada una **voz china** en el teléfono (Android: Ajustes → Idioma → Salida de texto a voz; iPhone: Ajustes → Accesibilidad → Contenido leído → Voces). Probá una vez **sin** voz china, si podés: es la otra mitad de lo que se quiere saber.
4. Volumen de contenido alto y el teléfono sin silencio.

## Lista de modo avión

Para cada ítem, tildá lo que pasó. Si algo falla, anotá el celular, el navegador y **qué dijo la pantalla** (copiá el texto del estado o del aviso).

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| 1 | **Hoy 🔊** | En una tarjeta de Hoy, tocá 🔊 en una oración | Suena la voz del sistema y el 🔊 no queda trabado (un segundo toque vuelve a sonar) |
| 2 | **Lector** | Abrí una lectura y tocá ▶️/Leer | Suena la voz del sistema y el botón no queda trabado |
| 3 | **Podcast** | 🎙️ Podcast → elegí una lección que **no** hayas escuchado | Pasa por «⏳ Preparando…» hasta que la voz empieza (hasta ~5 s) y **suena** la voz del sistema; la barra dice «Frase 1 / n»; al final «🏁 Listo». **Nunca** «Listo» sin haber oído nada. Ver «Dos cosas sin verificar» |
| 4 | **«Escuchar todo»** | En una lección de aprendo chino, «Escuchar todo» | Suena la voz del sistema línea por línea (la línea que suena queda resaltada) y el botón no queda trabado |
| 5 | **Muestra de voz** | Ajustes de voz: 🇨🇳👩 / 🇦🇷👩 (los botones de muestra) | Suena la muestra y el botón no queda trabado. **Ojo con la caché:** el texto de la muestra es fijo y sin red puede sonar el audio del servidor ya guardado (voz neural), sin pasar por la voz del sistema. Anotá si sonó **robótica** (voz del sistema) o **neural** (caché): solo la robótica prueba algo |
| 6 | **Práctica tipo examen** | Entrenar → práctica tipo examen, con una pregunta con audio | Suena con la voz del sistema y el botón no queda trabado |

Después de cada ítem, tocá ▶️/🔊 **una vez más**: tiene que volver a sonar (nada queda trabado). La columna «Tiene que pasar» de los ítems 1, 2, 4, 5 y 6 es **a propósito mínima** (suena y no se traba): no describe cada detalle de esos módulos, y hay defectos conocidos sin arreglar en ellos (del informe de máquinas de estado, que no está en el repo: R9 en la navegación, `nav.js`, y R11 en la práctica tipo examen); si ves algo raro en uno de esos, anotalo igual.

## Tres cosas sin verificar en un dispositivo real

Las tres están en el Podcast con la voz del sistema (`podcast.js`) y **solo se pueden confirmar en un teléfono**; en la batería la voz es simulada. Las dos primeras son las que se acordaron; la tercera la agregó la revisión del cambio.

### 1. La regla de ~300 ms (`PD_ONEND_MIN_MS`)

- **Qué hace el código.** Una frase que termina (`onend`) **sin** haber empezado (`onstart`) y en **menos de 300 ms** se da por **no dicha** (no se lee en 300 ms una frase de hasta 150 caracteres): el Podcast pasa a «⚠️ No pude reproducir el audio». Una frase que empieza (`onstart`) siempre cuenta, y una que termina sin `onstart` **después** de 300 ms también (se supone que habló).
- **Por qué no está verificada.** Es una heurística: depende de que el motor de voz del teléfono dispare `onstart` cuando de verdad habla. En la prueba, la voz simulada dispara `onstart`/`onend`/`onerror` como lo haría Chrome, pero no es una voz real.
- **Qué mirar.**
  - Si la voz **sonó** y aun así apareció «No pude reproducir el audio»: la regla da un **falso error** (anotá el celular y el navegador).
  - Si la voz **no sonó** y apareció «Listo»: la regla da un **falso éxito**.
  - Si la voz suena pero a los ~5 s de empezar aparece «No pude reproducir el audio» en medio de una frase: el motor **no dispara `onstart`** y la vigilancia de arranque (5 s) da por muda la frase aunque esté hablando (una frase de 150 caracteres dura bastante más de 5 s). **No te guíes por «Escuchar todo»**: con líneas cortas termina antes de los 5 s y anda igual aunque no haya `onstart`. Es la tercera cosa sin verificar (ver abajo).

### 2. La pausa retoma la frase desde el inicio

- **Qué hace el código.** Con la voz del sistema, ⏸ **corta la frase en curso** (`speechSynthesis.cancel()`) y ▶️ la **retoma desde su primera palabra**, no desde donde se cortó. Se hace así porque `speechSynthesis.pause()`/`resume()` no es fiable en Android. Es un cambio **visible** respecto de antes (antes: `pause()`/`resume()` sobre una sola frase de toda la lección).
- **Qué mirar.** En el Podcast con la voz del sistema: ⏸ a mitad de una frase → «⏸ En pausa» y silencio **enseguida**; ▶️ → vuelve a decir **esa misma frase desde el principio** y sigue con las demás hasta «Listo». Anotá si el silencio tarda en llegar, si ▶️ no hace nada, si repite la frase **anterior** o si salta una frase.

### 3. ¿El motor del teléfono dispara `onstart` cuando habla? (`PD_ARRANQUE_MS`)

- **Qué hace el código.** Cada frase tiene una vigilancia de **5 s**: si no llegó `onstart` en ese tiempo, la frase se da por muda, se corta y el Podcast pasa a «⚠️ No pude reproducir el audio». Es el mismo criterio que usa «Escuchar todo».
- **Por qué no está verificada.** En Chrome de escritorio y en Chrome de Android `onstart` llega siempre cuando la voz arranca, pero hay motores (según la voz instalada) que no lo disparan. Con una frase de hasta 150 caracteres (varios segundos de voz), un motor así sonaría y, a los 5 s, el Podcast cortaría la frase y diría «No pude reproducir el audio». «Escuchar todo» lo oculta porque sus líneas son cortas.
- **Qué mirar.** Con la voz china instalada, el Podcast tiene que **llegar a «Listo»** en una lección larga (la de 4–5 frases) sin cortarse a los 5 s. Si se corta, anotá la voz instalada (nombre y motor).

## Enter con el teclado predictivo o un IME (`fix/enter-ime`)

Con la guarda nueva, **Enter mientras se compone texto** (`isComposing` o `keyCode === 229`) ya no envía la respuesta de Hoy (`#answer-input`, `app.js`)
ni guarda la oración de «Tu propia oración» (`srs.js:979`). La suite (`tests/enter-ime.test.js`) prueba eventos sintéticos y una composición real de
**Chromium** (CDP, donde el Enter llegó con `isComposing: true` y `keyCode 13`); la mitad `keyCode 229` solo está cubierta con eventos sintéticos. **No** se probó un
IME de verdad ni un teclado de teléfono. **Estos casos no necesitan modo avión.**

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| a | **Android + Gboard con sugerencias activas**, en Hoy con el campo **«Escribe en español (conjugado)… 用西班牙语写»** (modo «aprendo español») | Escribí la respuesta **en español** con las sugerencias visibles y tocá **Enter** | **Envía al primer Enter** (la respuesta se corrige). Si hace falta tocar Enter dos veces o «Verificar», la guarda es demasiado ancha |
| b | **Android + Gboard con el teclado de pinyin**, en Hoy con el campo **«Escribe en chino (simplificado)…»** (modo «aprendo chino») | Escribí en pinyin y elegí un candidato. Tocá **Enter** mientras el texto sigue subrayado, y después otra vez | El primer Enter **confirma el candidato y no envía**; el segundo, con el texto ya confirmado, **envía**. Es un problema si el primer Enter ya envía (la guarda no alcanza) o si el segundo no envía (la guarda es demasiado ancha) |
| c | **iPhone** (si hay uno a mano) | Los mismos dos casos: teclado en español con predicción (a) y teclado de pinyin (b) | Igual que (a) y (b) |
| d | **PC con un IME de pinyin real** (Windows o macOS) | Escribí en pinyin en «Escribe en chino…», elegí un candidato y tocá **Enter** | El Enter que **confirma el candidato no envía**; el **siguiente** Enter sí envía |

Repetí (a) y (b) en **«Tu propia oración»** (el campo que aparece al tocar «🔁 Sumar a mi repaso» en el popup de una palabra): el Enter que confirma el candidato no tiene que guardar la tarjeta.

**Dónde probar antes del merge.** Hace falta abrir la rama en el teléfono: una URL con `fix/enter-ime` desplegada (no pude verificar si Vercel genera una vista previa del PR) o la rama servida
en tu PC (`python3 -m http.server`) y abierta desde el teléfono en la misma red (sin HTTPS no hay service worker, pero para esto no hace falta).
**Probar hoy, sin desplegar nada:** los campos del Repaso ya llevan esta misma guarda en producción (`srs.js:577` y `:586`): **«Pinyin o significado…»** (acepta pinyin o el significado en español) y **«Escribí el hanzi…»**.
Con Gboard, (a) y (b) se pueden mirar ahí desde ya; si ahí el Enter falla igual, el problema no es de esta rama.

> **Si en (a) el Enter no envía, o en (b) el segundo Enter no envía, hay que acotar la guarda antes de mergear** (por ejemplo, tomar `keyCode 229` solo cuando `isComposing` es `true`).
> Ojo: ese recorte equivale a dejar solo `isComposing`, así que **no arregla** el caso en que el teléfono marque `isComposing: true` en el Enter de una respuesta normal. Decidirlo con lo que se observe.

## «Escribir a mano» con 繁 y con TOCFL (`fix/escribir-a-mano-escritura`)

Cada palabra de la lista de **Entrenar → «Escribir a mano»** se ve y se traza con la escritura de **su familia** (como el Repaso): las tarjetas de **TOCFL**, con la de TOCFL (tradicional por defecto); el resto, con la de «HSK y el resto» (simplificado por defecto). Al tocar una fila, el quiz recibe la forma que se ve. La suite (`tests/escribir-a-mano-escritura.test.js`) prueba la **lista** y lo que recibe `openHandwriteAnswer`, pero **no** el trazo con datos de caracteres tradicionales: Hanzi Writer los baja de un CDN (`jsdelivr`) y la batería no sale a la red. **Estos casos necesitan conexión la primera vez** (los datos de cada carácter quedan cacheados).

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| e | **Con un módulo de HSK activo en Hoy (p. ej. HSK 1)**: **Yo → Ajustes → Escritura → 繁 繁體** (ese botón guarda la elección de la familia del módulo activo: con HSK, la de «HSK y el resto»; con un módulo TOCFL, la de TOCFL), y en el Repaso una palabra que se vea como **謝謝** | **Entrenar → «Escribir a mano»**, tocá **謝謝** | La fila dice **謝謝** y el quiz se abre con el carácter **謝** (tradicional, no 谢) y carga el trazo |
| f | Palabras de **TOCFL** en el Repaso (p. ej. **爺爺**), con la escritura de TOCFL en el valor por defecto | **«Escribir a mano»**, tocá **爺爺** | La fila dice **爺爺** (en tradicional aunque «HSK y el resto» esté en simplificado) y el quiz trae **爺** |
| g | **Sin conexión** y sin haber trazado nunca ese carácter | Tocá **謝謝** o **爺爺** | Aparece el aviso «⚠ No pude cargar los datos del carácter (¿sin conexión la primera vez?)» **sin trabar** la pantalla; con conexión, el trazo carga |

**Qué mirar especialmente en (e) y (f):** si algún carácter tradicional **no tiene datos** en Hanzi Writer, el aviso de (g) aparece **con conexión**: antes ese usuario trazaba el simplificado y ahora vería el error. Anotá el carácter exacto y el aviso tal cual.

## Repaso: un solo audio de la tarjeta (`fix/un-solo-audio-srs`)

El 🔊 de la tarjeta del Repaso (`srsSpeak`) ahora guarda su audio: pedirlo dos veces seguidas ya no suena doble, y **calificar** o **cerrar** el Repaso (✕, Atrás o tocar afuera) corta el audio (con el servidor y con la voz del sistema). La suite (`tests/un-solo-audio-srs.test.js`) lo prueba con un TTS y una voz del sistema **simulados** en Chromium; **no** prueba el audio real ni la voz real del teléfono.

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| h | **Repaso** con conexión | Tocá 🔊 dos veces seguidas (rápido) | Suena **un solo** audio: el segundo corta al primero |
| i | **Repaso** con conexión | Tocá 🔊 y, con el audio sonando, calificá (😵 / 🙂 / 😎) | El audio **se corta** y la tarjeta siguiente queda sin sonido; su 🔊 vuelve a sonar normal |
| j | **Repaso** con conexión | Tocá 🔊 y, sonando, cerrá con ✕ (después repetí con Atrás y tocando afuera) | El audio **se corta** al cerrar |
| k | **Repaso en modo avión** (con una voz china instalada) | Tocá 🔊 (habla la voz del sistema) y calificá; repetí cerrando | La voz **se corta** al calificar y al cerrar. Anotá si la voz del teléfono se corta de verdad o termina la frase |
| l | **Repaso**, internet lento | Tocá 🔊 en una conexión muy lenta y cerrá el Repaso **antes** de que suene | Después de cerrar **no** aparece ningún sonido tardío |

## Grabar y evaluar la pronunciación: un solo audio (`fix/un-solo-audio-voicerecorder`)

En el panel de grabación (🎤), ▶ **mi grabación** y ▶ **referencia** ahora se pausan entre sí y cortan el audio compartido (el 🔊 de una tarjeta) y el Lector; **empezar a grabar** corta los dos y todo lo demás que suene; y cambiar de oración pausa mi grabación. La suite (`tests/un-solo-audio-voicerecorder.test.js`) lo prueba en Chromium con un **micrófono falso** y la voz del sistema simulada, y simula el motor local (consentimiento y grabación): **no** prueba el micrófono real, el motor Whisper real, ni que el sonido «se cuele» acústicamente al micrófono (solo mide que no siga sonando nada cuando empieza la grabación).

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| m | **Grabar y evaluar** (repetí la prueba que hiciste en modo avión) | Grabá la oración, esperá el resultado y mirá: el **score**, el **feedback por carácter** y el **contorno de tono** | Aparecen los tres, igual que antes del cambio |
| n | Después de evaluar, con la referencia disponible | Tocá ▶ **referencia** y, sonando, tocá ▶ **mi grabación** (y al revés) | Suena **uno solo**: el segundo corta al primero; un segundo toque sobre el que suena lo pausa |
| o | Con el audio de una tarjeta sonando (🔊) o el **Lector** leyendo | Tocá ▶ mi grabación o ▶ referencia | Se **corta** el 🔊 / el Lector y suena solo el ▶ |
| p | Con la referencia (o mi grabación) sonando | Tocá 🎤 para **empezar a grabar** | El audio se **corta** antes de grabar (no queda sonando con el micrófono abierto); **anotá si en el celular el sonido igual se cuela** en la grabación |
| q | Con mi grabación sonando | Pasá a **otra oración** (siguiente tarjeta) | Mi grabación **se corta** al cambiar de oración |
| r | Sin conexión (modo avión), con el modelo local ya descargado | Repetí m y p | Igual que con conexión; si el micrófono o la evaluación fallan, anotá el texto del aviso |

## Diaria y Pronunciación libre: un solo audio (`fix/un-solo-audio-diaria-freetalk`)

Dos cambios: en la **escena de la Diaria** (Aprender → Diaria → una situación con escena), cerrar la escena (✕, Escape, «Practicar» o Atrás) ahora corta **su** voz del sistema (la de reserva cuando el servidor no responde) y **solo esa**: si habla otro módulo, no se toca. En **Pronunciación libre** (🎤 de Entrenar), ▶ de una burbuja corta el audio compartido y el Lector; cerrar el popup, «Borrar historial» o reabrirlo pausan la burbuja; y **empezar a grabar** corta la burbuja, el audio compartido y el Lector. La suite (`tests/un-solo-audio-diaria-freetalk.test.js`) lo prueba en Chromium con un **micrófono falso** y la voz del sistema **simulada**; **no** prueba el micrófono real, el motor Whisper ni el audio o la voz reales del teléfono, ni que el sonido «se cuele» a la grabación.

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| s | **Diaria en modo avión** (con una voz china instalada) | Abrí una situación con escena, tocá 🔊 de un renglón (habla la voz del sistema) y, hablando, cerrá con ✕ (repetí con Atrás y con «Practicar») | La voz **se corta** al cerrar. Anotá si la voz del teléfono se corta de verdad o termina la frase |
| t | **Diaria** con conexión | Tocá 🔊 de un renglón y, sonando, cerrá la escena; después tocá otro 🔊 mientras suena el primero | Al cerrar el audio **se corta**; el segundo 🔊 corta al primero (suena **uno solo**). **Anotá si el botón 🔊 del primero queda en ⏳ y sin respuesta**: es un fallo **anterior** a este cambio (medido igual en `main`, ver `docs/pendientes-app.md`), no se arregló acá |
| u | **Pronunciación libre**, con una burbuja ya grabada | Con el 🔊 de una tarjeta o el **Lector** sonando, tocá ▶ de la burbuja | Se **corta** el 🔊 / el Lector y suena solo la burbuja |
| v | **Pronunciación libre** | Con una burbuja sonando, cerrá el popup (✕, Atrás, tocar afuera), después repetí con «Borrar historial» | La burbuja **se corta** al cerrar y al borrar (antes seguía sonando) |
| w | **Pronunciación libre**, con una burbuja sonando | Tocá 🎤 para **empezar a grabar** (repetí con el 🔊 de una tarjeta o el Lector sonando) | Todo se **corta** antes de grabar (no queda sonando con el micrófono abierto); **anotá si en el celular el sonido igual se cuela** en la grabación |
| x | **Pronunciación libre** (modo avión, modelo local ya descargado) | Grabá, esperá la transcripción, tocá ▶, y **repetí grabar y transcribir** | Aparece la transcripción en cada burbuja, igual que antes del cambio; si el micrófono o el motor fallan, anotá el texto del aviso |

## Pinyin de Pronunciación libre (`fix/pinyin-libre`)

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| y | **Pronunciación libre** (🎤 de Entrenar), modo es→zh | Grabá en voz alta «你什麼東西？我才問你，你還是問我» (o «為什麼», «銀行», «睡覺») | El pinyin de la burbuja sale **«nǐ shén me dōng xi ? wǒ cái wèn nǐ , nǐ hái shì wèn wǒ»** (con «shén **me**», «**hái** shì»; antes «shén mó», «huán shì»). Anotá **qué texto escribió la IA** (tradicional o simplificado) y cualquier palabra cuyo pinyin te suene mal |

## Clásicos, lecciones y práctica tipo examen cortan al Lector (`fix/un-solo-audio-clasicos-lecciones-examen`)

El 🔊 de un **Clásico**, el 🔊 por línea de una **lección** y ▶ de la **práctica tipo examen** ahora cortan al **Lector** (su audio y su voz del sistema) al arrancar; antes el Lector seguía leyendo encima. La suite (`tests/un-solo-audio-clasicos-lecciones-examen.test.js`) lo prueba en Chromium con el TTS y la voz del sistema **simulados**; **no** prueba el audio ni la voz reales del teléfono (allí `cancel()` avisa de forma asíncrona).

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| z | **Lector** con conexión + **un Clásico** (Aprender → Clásicos → Leer) | Pegá un texto en el Lector y tocá 🔊 Leer; con el Lector sonando abrí un Clásico y tocá el 🔊 de una frase | El Lector **se corta** (su botón vuelve a «🔊 Leer») y suena solo la frase |
| aa | **Lector** + **una lección** | Igual que z, con el 🔊 de una línea de una lección | Igual que z |
| ab | **Lector** + **práctica tipo examen** (Entrenar) | Igual que z, con ▶ de una práctica con audio | Igual que z |
| ac | **Modo avión** (con una voz china instalada) | Repetí z–ab: el Lector habla con la voz del sistema y el módulo también | Habla **una sola voz**; anotá si la del Lector se corta de verdad o termina la frase, y si el botón del Lector queda bien |
| ad | Cualquiera de los anteriores | Tocá dos veces el mismo 🔊 de una frase (Clásicos o lección) | El 2.º toque **pausa** y el 3.º **reanuda**, igual que antes |

## Pinyin: correcciones de lecturas (`fix/pinyin-correcciones`)

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| ae | **Lector** (Leer), con «Pinyin» activado | Pegá «他被視為英雄,說幹就幹。理髮店在哪裡?我決定為了你留下。不確定為什麼。他一定為你高興。» y mirá el pinyin | «shì **wéi**», «shuō **gàn** jiù **gàn**», «lǐ **fà**», «wèi le» (no «wéi le») «wèi shén me» (no «wéi shén me») y «yí dìng **wèi** nǐ» (no «wéi»). Anotá cualquier palabra cuyo pinyin te suene mal |
| af | **Pronunciación libre** (modo es→zh) | Decí «變為», «還款», «心臟» | El pinyin de la burbuja sale «biàn wéi», «huán kuǎn», «xīn zàng» (anotá qué texto escribió la IA) |

## Pronunciación libre: ▶ mientras se graba (`fix/freetalk-play-grabando`)

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| ag | **Pronunciación libre**, con una burbuja ya grabada | Tocá 🎤 (graba) y, **sin terminar**, tocá ▶ de la burbuja vieja (dos veces) | ▶ **no suena** (ni se corta nada) mientras graba; el ▶ no cambia de icono |
| ah | Igual | Terminá la grabación y esperá a que aparezca la burbuja nueva; tocá ▶ de las dos | Las dos suenan; ▶ **sí** anda mientras «Transcribiendo…» |

## Muestra de voz: un solo audio (`fix/muestra-de-voz`)

| # | Dónde | Qué hacer | Tiene que pasar |
|---|---|---|---|
| ai | **Leer** (Lector) → **Yo → Ajustes** | Pegá un texto largo en el Lector y tocá 🔊 Leer; mientras habla, andá a **Yo → Ajustes** y tocá 🇨🇳 (y después 🇦🇷) | El Lector **se corta** y suena **solo la muestra** (nunca las dos voces a la vez); el Lector no sigue con el trozo siguiente. Anotá si queda el botón en «⏳ ...» |
| aj | Igual, con el celular en **modo avión** (voz del sistema) | Repetí ai | Igual: queda solo la muestra, y el Lector no avanza |
| ak | **Hoy** → 🔊 de una tarjeta | Con la tarjeta sonando, andá a **Yo → Ajustes** y tocá 🇨🇳 | La tarjeta se corta y suena solo la muestra; al volver a Hoy el 🔊 no queda en «...» |
| al | **Yo → Ajustes** | Tocá 🇨🇳, 🇨🇳 y 🇦🇷 lo más rápido que puedas | Suena **una sola** muestra (la última), no tres |
| am | Igual | Tocá 🇨🇳 y, **mientras suena**, andá a Leer y tocá 🔊 Leer | **Límite conocido:** el Lector no corta la muestra (~2 s) y se superponen un momento. Anotá cuánto dura el solapamiento |

## Qué anotar

| Dato | Ejemplo |
|---|---|
| Celular y versión de Android/iOS | Samsung A54, Android 14 |
| **¿APK instalado (TWA) o Chrome?** y navegador predeterminado | APK `com.huayudiario.app`; predeterminado: Chrome |
| Navegador y versión | Chrome 130 |
| ¿Voz china instalada? | Sí, «中文 (中国)» |
| Ítem de la lista (1–6), de «Tres cosas sin verificar», de «Enter con el teclado predictivo» (a–d), de «Escribir a mano» (e–g), de «Repaso: un solo audio» (h–l) o de «Grabar y evaluar: un solo audio» (m–r) o de «Diaria y Pronunciación libre: un solo audio» (s–x) o de «Pinyin de Pronunciación libre» (y) o de «Clásicos, lecciones y práctica tipo examen cortan al Lector» (z–ad) o de «Pinyin: correcciones de lecturas» (ae–af) o de «Pronunciación libre: ▶ mientras se graba» (ag–ah) o de «Muestra de voz: un solo audio» (ai–am) | 3 · b |
| Texto del estado / del aviso, tal cual | «⚠️ No pude reproducir el audio — tocá ▶️ para reintentar» |
| ¿Se oyó la voz? ¿Cuánto tardó el aviso? | No se oyó; el aviso salió a los 5 s |
| Teclado y versión (para los casos a–d de Enter) | Gboard 14.3, sugerencias activas · IME de pinyin de Windows 11 |
| ¿Cuántos Enter hicieron falta para enviar? | 1 (envía) · 2 (el primero solo confirmó) |
