# Matriz de audio · «un solo audio a la vez»

> **Archivo escrito a mano, paso 1 de `fix/un-solo-audio`: solo la matriz y su validador, sin código de la app.** Lista las **26 fuentes de audio** de la app (14 `new Audio(` y 12 `speechSynthesis.speak(`), qué corta cada una al arrancar y quién puede cortarla. Los arreglos por módulo (paso 2) **no están hechos**: van después de que se revise esta matriz. **Todo lo de la columna «Hallazgo» está leído en el código; solo `srsSpeak`, `setTarget` y los `_toggle*` de VoiceRecorder se midieron en el navegador** (ver «Medido antes»). Se cita por **nombre de función o variable** (las líneas se corren con cada cambio).
> El validador es `node tools/check-audio-matriz.js` (corre también dentro de `node tests/run-all.js`): **falla** si aparece un `new Audio(` o un `speechSynthesis.speak(` que no figure en la tabla, si una fila ya no existe en el código, si un archivo llama (o deja de llamar) a `stopGlobalAudio` / `stopReader` de forma distinta de lo que dice la tabla **para ese archivo**, o si la cuenta deja de ser 26. **No** verifica fila por fila los `sí` / `no`, ni el texto de las demás columnas: eso es a mano (ver «Cómo se valida»).

## La regla y por qué hoy no se cumple

Regla que busca la matriz: **al arrancar, cada fuente corta lo que ya suena** (y al cerrar la vista, se corta a sí misma). Hoy esa regla está repartida: cada módulo llama a los cortes de **algunos** otros y no hay una tabla de quién corta a quién.

Los tres cortes compartidos, y qué NO hacen:

| Corte | Qué hace | Qué NO hace |
|---|---|---|
| `stopGlobalAudio()` (`audio-tts.js`) | invalida el pedido en vuelo de `playAudio` (`audioReqTok++`), **pausa** `globalAudioPlayer` y restaura el botón 🔊 | no detiene los `Audio` propios de otros módulos ni `speechSynthesis`; **pasar por él no equivale a «un solo audio»** |
| `stopReader()` (`reader.js`) | corta el Lector: **`speechSynthesis.cancel()` global**, pausa `readerAudio`, apaga el karaoke y resetea sus máquinas | no toca `globalAudioPlayer` ni los `Audio` de otros módulos |
| `speechSynthesis.cancel()` | corta **toda** la voz del sistema, de cualquier módulo | no toca ningún `Audio` |

Los llamadores de cada uno están en las columnas `stopGlobalAudio` y `stopReader` de la tabla (el validador los cruza con el código, archivo por archivo).

## Las 26 fuentes

Columnas: **`stopGlobalAudio`** / **`stopReader`**: ¿llama a ese corte al arrancar? (`sí` / `no`). **Qué más corta**: lo propio o a mano. **Lo corta (desde afuera)**: quién más puede detenerla. **Hallazgo**: dónde puede solaparse (leído salvo que diga «medido»).

| ID | Archivo | Tipo | Sitio | stopGlobalAudio | stopReader | Qué más corta al arrancar | Lo corta (desde afuera) | Al cerrar / cambiar de vista | Hallazgo |
|---|---|---|---|---|---|---|---|---|---|
| A01 | `audio-tts.js` | Audio | `globalAudioPlayer` (🔊 de tarjeta, `playAudio`) | no | sí | a mano: pausa y resetea su propio `src`; restaura el botón anterior | `stopGlobalAudio()` de 6 módulos **al arrancar ellos**; a mano: Lector, Dramas DELE, Pares mínimos; Repaso solo lo pausa | Al cerrar, solo Dramas DELE (`stopSpeak`) y Pares mínimos (`mpStopGlobal`) lo pausan; Clásicos, Lecciones, Diaria, Examen y Podcast llaman a `stopGlobalAudio` **solo al arrancar**, no al cerrar (leído) | **Es el reproductor compartido**: lo usan `playAudio` y Pares mínimos (`src`, `play()`). Un 🔊 de tarjeta **no corta** los `Audio` propios de Clásicos, Diaria, Examen, DELE, Lecciones, «Escuchar todo» ni Podcast |
| A02 | `audio-tts.js` | speak | `playAudio` (catch: voz del sistema) | no | sí | `speechSynthesis.cancel()` justo antes | `speechSynthesis.cancel()` de cualquiera; `stopReader()` | — | `stopGlobalAudio` **no** la corta (solo pausa el player global) |
| A03 | `audio-tts.js` | speak | `speakVoiceSampleSystem` (muestra de voz, #138) | no | no | `speechSynthesis.cancel()` — **global** | `speechSynthesis.cancel()` de cualquiera | — | Corta cualquier voz del sistema en curso (p. ej. la del Lector con el servidor caído); **no** llama a `stopGlobalAudio` ni a `stopReader` |
| A04 | `audio-tts.js` | Audio | `playVoiceSample` (muestra con audio del servidor) | no | no | nada | **nadie** (`new Audio(url)` sin referencia guardada) | — | Suena encima de lo que esté sonando y nada lo detiene; dura una frase corta |
| A05 | `reader.js` | Audio | `readerAudio` (`toggleReaderPlay` / `playReaderChunk`) | no | sí | `speechSynthesis.cancel()`, y a mano: pausa `globalAudioPlayer` (`onended = null`, `pause()`, `removeAttribute('src')`) y restaura el botón | `stopReader()` (9 archivos lo llaman); ⏸ del propio Lector | `clearReader` → `stopReader` | Los demás `Audio` propios (Clásicos, Diaria, Examen, DELE, Lecciones, Podcast…) **no** se cortan al arrancar el Lector |
| A06 | `reader.js` | speak | `readerSpeakFallback` (trozo sin audio del servidor) | no | sí | — (la lectura ya cortó al arrancar) | `stopReader()`; `speechSynthesis.cancel()` de cualquiera | `stopReader` | — |
| A07 | `srs.js` | Audio | `srsSpeak` (🔊 de la tarjeta del Repaso) | no | sí | pausa `globalAudioPlayer` (solo si `!paused`) y `stopReader()` | **nadie** (`new Audio(url)` sin referencia guardada) | **ni `doGrade` ni `srsClose` lo cortan** | **Medido:** 1 clic da 1 audio y 2 clics dan 2 a la vez; tras calificar o cerrar el Repaso siguen sonando. Es el caso más notorio |
| A08 | `srs.js` | speak | `speakFallback` (dentro de `srsSpeak`) | no | sí | `speechSynthesis.cancel()` justo antes | `speechSynthesis.cancel()` de cualquiera; `stopReader()` | no la corta `srsClose` | — |
| A09 | `classics-reader.js` | Audio | `crAudio` (`speakCr`, 🔊 por frase) | sí | no | `crAudio.pause()` propio y `KARA.stop()` | `stopCrSpeak` (cierre del lector) y la próxima `speakCr`; **nadie de afuera** | `stopCrSpeak` | **No llama a `stopReader`**: el Lector sigue sonando si estaba leyendo |
| A10 | `classics-reader.js` | speak | `speakCr` (catch: voz del sistema) | sí | no | `speechSynthesis.cancel()` justo antes | `stopCrSpeak`; `speechSynthesis.cancel()` de cualquiera | `stopCrSpeak` | — |
| A11 | `daily-stories.js` | Audio | `dsPlayer` (`dsPlayLine`, 🔊 por renglón) | sí | sí | `dsStop()` propio (pausa `dsPlayer`) | `dsStop` (cierre y próxima línea); nadie de afuera | `dsStop` | — |
| A12 | `daily-stories.js` | speak | `dsPlayLine` (catch: voz del sistema) | sí | sí | — (`stopReader` ya canceló antes del pedido) | `speechSynthesis.cancel()` de cualquiera; **`dsStop` NO la corta** (solo invalida el token y pausa `dsPlayer`) | **`dsStop` no cancela la voz del sistema** | Al cerrar la Diaria, la voz del sistema en curso sigue sonando (leído: `daily-stories.js` no tiene **ningún** `speechSynthesis.cancel`; `closeDailyStory` solo llama a `dsStop`) |
| A13 | `exam-practice.js` | Audio | `playClip` (dentro de `playSeq`, práctica tipo examen) | sí | no | `playSeq` pausa su `au` y hace `speechSynthesis.cancel()`; `stopGlobalAudio()` | `stopAudio` (cierre) y la próxima `playSeq`; nadie de afuera | `stopAudio` | No llama a `stopReader` |
| A14 | `exam-practice.js` | speak | `playSeq` (catch: voz del sistema, una `speak` por parte) | sí | no | `speechSynthesis.cancel()` al empezar `playSeq` | `stopAudio`; `speechSynthesis.cancel()` de cualquiera | `stopAudio` | — |
| A15 | `free-talk.js` | Audio | `player` (`playBubble`, burbujas de «Hablá con…») | no | no | **nada** | **nadie**: ni `stopAll` ni `closePop` pausan `player` | `closePop` revoca las URLs pero no pausa | No corta lo que suene ni lo corta nadie; con el popup cerrado puede seguir sonando (leído) |
| A16 | `lessons-dele.js` | Audio | `dAudio` (`speakEs`, 🔊 y ▶️ de dramas DELE) | no | sí | `stopSpeak()` propio (pausa `dAudio`, `globalAudioPlayer` a mano y `speechSynthesis.cancel()`) | `stopSpeak` (cierre, 2.º toque de ▶️); **`DeleLessons.stop()`**, que llama `ninos-ui.js` (`stopAudio`) al cerrar su vista y al abrir una historia o «Sonidos del español» de la pista **Niños**, que habla por `DeleLessons.speak` | `stopSpeak` | Pausa el player global **a mano**, no con `stopGlobalAudio` |
| A17 | `lessons-dele.js` | speak | `speakEs` (fallback offline: voz del sistema en es-*) | no | sí | `stopSpeak()` (incluye `speechSynthesis.cancel()`) | `stopSpeak`; `DeleLessons.stop()` (`ninos-ui.js`); `speechSynthesis.cancel()` de cualquiera | `stopSpeak` | — |
| A18 | `lessons-graduated.js` | Audio | `lqAudio` (`speakZh`, 🔊 por línea de las lecciones) | sí | no | `lqAudio.pause()` propio, `KARA.stop()` | `stopSpeak` (cambia de vista) y la próxima `speakZh`; desde otros archivos: **«Escuchar todo»** (`lessons-listen.js`, `LQ_TEXT.stop()` al arrancar), **la práctica tipo examen** (`exam-practice.js`, `stopAudio` → `LQ_TEXT.stop()`) y **Fichas de familia** (`familia-ui.js`, `open` llama a `LQ_UI.stopSpeak()` al abrir una ficha) | `stopSpeak` | **No llama a `stopReader`**: el Lector sigue si estaba leyendo |
| A19 | `lessons-graduated.js` | speak | `speakZh` (catch: voz del sistema) | sí | no | `speechSynthesis.cancel()` justo antes | `stopSpeak` (y los mismos tres de A18: «Escuchar todo», examen, Fichas de familia); `speechSynthesis.cancel()` de cualquiera | `stopSpeak` | — |
| A20 | `lessons-listen.js` | Audio | `L.audio` (`audioEl`, «Escuchar todo») | sí | sí | `LQ_TEXT.stop()` (los 🔊 por línea), `stopGlobalAudio()`, `stopReader()` | `stop(motivo)` propio (cortes con motivo declarado); nadie de afuera | `stop(motivo)` | Corta a casi todos al arrancar: es la fuente que más se acerca a la regla |
| A21 | `lessons-listen.js` | speak | `speakSystem` (voz del sistema por línea) | sí | sí | — (`start` ya cortó) | `stop(motivo)` (incluye `speechSynthesis.cancel()`); `speechSynthesis.cancel()` de cualquiera | `stop(motivo)` | — |
| A22 | `minimal-pairs.js` | speak | `mpPlay` (catch: voz del sistema; el audio del servidor usa `globalAudioPlayer`, que es A01) | no | sí | `mpStopGlobal`: pausa y resetea `globalAudioPlayer`, `speechSynthesis.cancel()` y `stopReader()` | `mpClose` (→ `mpStopGlobal`); `speechSynthesis.cancel()` de cualquiera | `mpClose` | **No tiene `new Audio` propio**: reutiliza `globalAudioPlayer` (se cuenta en A01) |
| A23 | `podcast.js` | Audio | `pAudio` (`playLesson`, lección entera) | sí | sí | `stopGlobalAudio()` y `stopReader()` | `stopAll` (✕, Esc, ☰, ⏮/⏭); nadie de afuera | `stopAll` | — |
| A24 | `podcast.js` | speak | `hablarFrase` (por frases de ≤150 caracteres, desde `aVozDelSistema`) | sí | sí | — (`playLesson` ya cortó; no hay `cancel()` justo antes) | `cortarVoz` / `stopAll`; `speechSynthesis.cancel()` de cualquiera | `stopAll` | A verificar en el celular: `docs/prueba-celular.md` |
| A25 | `VoiceRecorder.js` | Audio | `_player` (reproducción de **mi grabación**) | no | no | **nada** | **nadie**; `setTarget` solo le quita el `src` (**medido: no pausa**: sigue 1,59 s tras revocar el blob) | no se pausa al cambiar de oración | **Medido:** suena a la vez que `_refPlayer` y que `globalAudioPlayer` |
| A26 | `VoiceRecorder.js` | Audio | `_refPlayer` (audio de **referencia** de la evaluación) | no | no | **nada** | `setTarget` (`_refPlayer.pause()`; **medido: queda pausado**) | `setTarget` | **Medido:** `_togglePlay` y `_toggleRef` no se pausan entre sí |

### Qué no es una fuente

Buscado con grep en los `*.js` de la raíz y en `index.html`:
- **`AudioContext` / `OfflineAudioContext`** en `VoiceRecorder.js`, `voice-evaluator.js` y `karaoke.js`: decodifican (`decodeAudioData`) o **renderizan fuera de línea** (`OfflineAudioContext` + `createBufferSource().start`, para el análisis de tono); no tienen salida a los parlantes.
- **`ninos-ui.js` (`speak`)**: delega en `DeleLessons.speak` (A16/A17); no es un motor propio.
- **No hay** `createMediaElementSource`, `<audio>` ni `<video>` en `index.html` ni en el código (las menciones de `<audio>` son comentarios), ni `createElement('audio')`, ni `createOscillator`.
- **Todo `.play()`** del código está en los 13 archivos de la tabla; `globalAudioPlayer.src` / `.play()` solo lo usan `playAudio` (`audio-tts.js`) y Pares mínimos (`minimal-pairs.js`); `lessons-dele.js` y `reader.js` lo pausan sin reproducirlo.
- Los sitios de `speak` de Fichas de familia y de 禮運大同篇 **no agregan** una fuente: reutilizan `speakZh` (A18/A19) y `speakCr` (A09/A10).

## Quién corta a quién: lo que la tabla muestra

Leyendo las columnas «Lo corta (desde afuera)». **Método:** se listó lo que cada módulo expone en `window` (`DeleLessons`, `LQ_TEXT`, `LQ_UI`, `LQ_LISTEN`, `openPodcast`, `openFreeTalk`, `CR_open`…) y se buscaron en el resto de los `*.js` de la raíz las llamadas a sus cortes y cierres; **no** es exhaustivo ante llamadas dinámicas (`window[nombre]()`), ni mira `tests/`. `LQ_LISTEN.stop` está expuesto pero solo lo usan las pruebas:

- **Solo estas fuentes se pueden cortar desde otro módulo:** `globalAudioPlayer` (A01), `readerAudio` (A05) y **toda la voz del sistema** (los 12 `speak`, por `speechSynthesis.cancel()` o `stopReader`), más `lqAudio` (A18, por «Escuchar todo», la práctica tipo examen y Fichas de familia), `dAudio` (A16, por `DeleLessons.stop()` desde `ninos-ui.js`) y `_refPlayer` (A26, por `setTarget`).
- **Nadie de afuera corta** a los **9** `Audio` de **A04, A07, A09, A11, A13, A15, A20, A23, A25**: se detienen solo por su propio control, o no se detienen nunca (A04, A07, A15, A25 no guardan referencia o nadie la pausa).
- **Quienes no llaman a ningún corte al arrancar:** A03 (cancela solo la voz del sistema), A04, A15, A25 y A26.
- **Quienes no llaman a `stopReader`** (el Lector puede seguir sonando): Clásicos (A09/A10), Examen (A13/A14), Lecciones (A18/A19), Muestra de voz (A03/A04), `free-talk` (A15) y `VoiceRecorder` (A25/A26).
- **Sitios que toman el reproductor global sin `stopGlobalAudio`** (de #133): Lector (`toggleReaderPlay`), Dramas DELE (`stopSpeak` / `speakEs`) y Pares mínimos (`mpStopGlobal`) lo pausan **a mano**; el Repaso (`srsSpeak`) **solo lo pausa** si no estaba en pausa. Un 🔊 que sigue en vuelo cuando uno de ellos arranca: `stopGlobalAudio()` invalida el pedido (#133), pero estos sitios no lo llaman.

**El rol de `nav.js` (Atrás y Escape).** `nav.js` no corta audio por su cuenta: al tocar Atrás simula el clic en el ✕ de la capa de arriba (`podcast-pop`, `daily-story-pop`, `mp-pop`, `talk-pop`, `srs-pop`…), y eso corre **el cierre propio de cada módulo** (`stopAll`, `dsStop`, `mpClose`, `srsClose`…). Por eso las columnas «Al cerrar / cambiar de vista» valen también para **Atrás**, **y heredan sus huecos**: lo que ese cierre no corta (A12 la voz de la Diaria, A15 `player` de `free-talk`, A07 `srsSpeak` al cerrar el Repaso) tampoco lo corta Atrás. **Escape** y el clic afuera los maneja cada módulo por su cuenta: **sin verificar** si pasan por el mismo cierre. Tampoco se verificó si `VoiceRecorder` (A25/A26) vive en alguna capa de `nav.js`.

Alcanzabilidad: la tabla dice **qué se solapa en el código**, no qué se puede hacer a la vez con la interfaz (muchas de estas fuentes viven en popups o vistas que no conviven). Eso hay que medirlo caso por caso en el paso 2.

## Medido antes (en el navegador, `fix/reintentos-online`; no se repitió en esta rama)

- **A07 `srsSpeak`:** 1 clic → 1 audio; 2 clics → 2 a la vez; tras calificar (`doGrade`) y tras cerrar el Repaso (`srsClose`) siguen 2; con la respuesta del TTS llegando después de cerrar el Repaso suena 1.
- **A25/A26 (`VoiceRecorder`):** `setTarget` **no** pausa `_player` (medido con un blob real revocado: sigue 1,59 s) y **sí** pausa `_refPlayer`; `_togglePlay` y `_toggleRef` no se pausan entre sí; la grabación suena junto con `globalAudioPlayer`.

## Pendiente (paso 2, después de revisar esta matriz; no hecho)

Candidatos, en el orden que sugiere la tabla, **cada uno con su propia revisión**:
1. **A07/A08 `srsSpeak` + `doGrade` + `srsClose`** (`srs.js`; solo audio, sin tocar el algoritmo ni `checkAnswer`): guardar la referencia del `Audio`, cortar el anterior y el pedido en vuelo, `speechSynthesis.cancel()`; cortar al calificar y al cerrar.
2. **A25/A26 `VoiceRecorder`**: `setTarget` pausa `_player`; `_togglePlay` y `_toggleRef` se pausan entre sí; (decidir si cortan el global).
3. **A12 `dsStop`** y **A15 `free-talk`**: cortar la voz del sistema / el `player` al cerrar.
4. Los módulos que no llaman a `stopReader` (A09/A10, A13/A14, A18/A19) y los que no llaman a ningún corte (A03/A04).
5. Decidir si conviene **una función única** (`stopAllAudio()`) que cada fuente llame al arrancar, en lugar de repartir los cortes; eso es un cambio de diseño, no un arreglo puntual.

## Notas de la semilla anterior (se conservan)

- **Podcast (A23/A24):** su audio del servidor es un `new Audio` propio (`pAudio`) que solo corta su `stopAll()`; la voz del sistema va **por frases** (`fix/podcast-voz-sistema`): voz elegida con `sysVoiceFor`, vigilancia de arranque de ~5 s, y `u.onerror` `canceled`/`interrupted` provocado por la app se ignora (se pone `s.u = null` antes de `cancel()`). ⏸ hace `speechSynthesis.cancel()` de la frase en curso y ▶️ la retoma desde su inicio.
- **Muestra de voz (A03/A04, #138):** `speakVoiceSampleSystem` hace un `speechSynthesis.cancel()` **global**; la muestra con audio del servidor (`playVoiceSample`) crea un `new Audio` propio que nadie corta.
- **Fichas de familia** (`feat/lecciones-familia`): el 🔊 de cada forma llama a `speakZh` vía `LQ_UI.bindLines` (reusa A18/A19); `closePop` corta con `stopSpeak()`. **禮運大同篇** (`feat/clasico-datong`): el mismo `speakCr` (A09/A10).

## Cómo se valida

`node tools/check-audio-matriz.js` (Node, sin navegador). Reglas:
1. Por archivo y tipo, la cantidad de `new Audio(` y `speechSynthesis.speak(` del código (sin comentarios ni cadenas) **es igual** a la de filas de la tabla; el total es **26**.
2. Cada fila tiene todas las columnas y su **sitio** (el nombre entre comillas invertidas) **existe** en ese archivo.
3. Los **IDs** son `A01`… sin saltos ni repeticiones.
4. Para cada archivo, «llama a `stopGlobalAudio` / `stopReader`» según la tabla (**alguna** fila `sí` de ese archivo) **coincide** con el código (alguna llamada `stopGlobalAudio(` o `stopReader(` fuera de su definición). Es **por archivo, no por fila**: si un archivo tiene varias fuentes (p. ej. `audio-tts.js` con A01–A04), basta con que alguna llame al corte; no distingue cuál.
5. **Cuatro mutaciones** sobre una copia del código y de la tabla (un `new Audio()` de más, una fila borrada, un sitio renombrado, una llamada a `stopReader` quitada) **tienen que dar rojo**: si alguna da verde, el propio validador falla.

**Lo que el validador NO comprueba:** los `sí` / `no` de cada fila por separado, ni qué más corta, quién la corta, qué pasa al cerrar o los hallazgos; eso es lectura a mano (y puede quedar atrasada si el código cambia sin que cambie la cuenta de fuentes). Tampoco prueba **cuándo** suena cada fuente.

Para sumar una fuente nueva: agregar su fila a la tabla (ID siguiente, ordenada por archivo) y volver a correr el validador. Si cambia lo que corta una fuente, actualizar su fila.
