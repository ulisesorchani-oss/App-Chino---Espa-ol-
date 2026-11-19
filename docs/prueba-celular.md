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

## Qué anotar

| Dato | Ejemplo |
|---|---|
| Celular y versión de Android/iOS | Samsung A54, Android 14 |
| **¿APK instalado (TWA) o Chrome?** y navegador predeterminado | APK `com.huayudiario.app`; predeterminado: Chrome |
| Navegador y versión | Chrome 130 |
| ¿Voz china instalada? | Sí, «中文 (中国)» |
| Ítem de la lista (1–6) o de «Tres cosas sin verificar» | 3 |
| Texto del estado / del aviso, tal cual | «⚠️ No pude reproducir el audio — tocá ▶️ para reintentar» |
| ¿Se oyó la voz? ¿Cuánto tardó el aviso? | No se oyó; el aviso salió a los 5 s |
