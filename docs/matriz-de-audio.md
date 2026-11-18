# Matriz de audio · semilla (borrador)

> **Archivo nuevo, escrito a mano.** Es la **semilla** de la matriz «un solo audio a la vez»: anota los sitios que se fueron encontrando. **La matriz completa y su validador** (que fallaría solo ante un `new Audio` o un `speechSynthesis.speak` NUEVO que no figure acá) **van en la rama aparte, todavía pendiente de OK**; esta lista no está clasificada ni es exhaustiva. Se cita por **nombre de función** (las líneas se corren con cada cambio).

Regla que busca la matriz: al arrancar, cada módulo corta lo que ya suena. Hoy esa regla vive repartida: cada módulo llama a los cortes de algunos otros (`stopGlobalAudio()`, `stopReader()`, `speechSynthesis.cancel()`…) y no hay una tabla de quién corta a quién.

## Sitios de `speechSynthesis.speak` anotados

| Sitio | Función (archivo) | Qué corta antes de hablar | Observaciones |
|---|---|---|---|
| **Podcast** | `playLesson`, en el `catch` (`podcast.js`) | `stopGlobalAudio()` y `stopReader()` (este último cancela la voz del sistema), al arrancar la carga | **Un solo sitio de `speak` en el Podcast** (toda la lección en una frase). Su audio del servidor es un `new Audio` propio (`pAudio`) que solo corta su `stopAll()`. No hay `cancel()` justo antes de hablar |
| **Muestra de voz** (#138) | `speakVoiceSampleSystem` (`audio-tts.js`) | `speechSynthesis.cancel()` — **global** | Corta cualquier frase de la voz del sistema en curso (por ejemplo la del Lector con el servidor caído); antes la muestra fallida no hacía nada. **No** llama a `stopGlobalAudio()` ni a `stopReader()`. La muestra con audio del servidor (`playVoiceSample`) crea un `new Audio` propio que nadie corta |

## Sitios que toman el reproductor global sin pasar por `stopGlobalAudio` (de #133)

| Sitio | Función (archivo) | Qué hace con `globalAudioPlayer` |
|---|---|---|
| Lector | `toggleReaderPlay` (`reader.js`) | lo pausa a mano (`onended = null`, `pause()`, `removeAttribute('src')`) |
| Dramas DELE | `stopSpeak` y la lectura de dramas (`lessons-dele.js`) | lo pausa a mano |
| Pares mínimos | la reproducción de pares (`minimal-pairs.js`) | lo pausa a mano y **además lo usa para su propio audio** (`src`, `play()`) |
| Repaso | el flujo de audio del repaso (`srs.js`) | solo lo pausa (`pause()`). **SRS está fuera de alcance: no se toca** |

Un 🔊 que sigue en vuelo cuando uno de estos sitios arranca les suena encima: `stopGlobalAudio()` invalida el pedido (#133) pero estos sitios no lo llaman.

## Inventario crudo

`grep -n "speechSynthesis.speak" *.js` da, en el commit de esta rama, **12 sitios**: `audio-tts.js` (2: el `catch` de `playAudio` y la muestra de voz), `classics-reader.js`, `daily-stories.js`, `exam-practice.js`, `lessons-dele.js`, `lessons-graduated.js`, `lessons-listen.js`, `minimal-pairs.js`, `podcast.js`, `reader.js` y `srs.js`. Clasificarlos es trabajo de la rama de la matriz.
