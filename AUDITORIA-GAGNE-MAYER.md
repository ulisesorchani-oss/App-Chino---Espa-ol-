# Auditoría pedagógica: Nueve Eventos de Gagné + Principios de Mayer

**Huayu Diario (App-Chino-Español)** · Auditoría del código real (no del
diseño en abstracto) · 2026-09-24

## Nota sobre el alcance

El brief original describe `app.js` como "~8000 líneas, orquestador
central". Eso ya no es así: el mismo día de esta auditoría se completó una
modularización de `app.js` (9.451 → 4.128 líneas), repartiendo lógica en
11 archivos nuevos: `audio-tts.js`, `dict.js`, `trazos.js`, `srs.js`,
`reader.js`, `karaoke.js`, `classics-reader.js`, `data-embedded.js`,
`lessons-graduated.js`, `placement-test.js`, `minimal-pairs.js` y
`daily-stories.js`. Las citas de esta auditoría usan las ubicaciones
**actuales** (post-modularización).

Archivos revisados en profundidad: `app.js`, `index.html`, `style.css`,
`srs.js`, `minimal-pairs.js`, `daily-stories.js`, `lessons-graduated.js`,
`voice-evaluator.js`, `pitch-analyzer.js`, `config.js`, `VoiceRecorder.js`,
`onboarding.js`, `stats.js`. No se abrió `README-Pronunciacion.md` en esta
pasada (referenciado varias veces desde el código como fuente de la
metodología de calibración) ni se hizo una pasada completa de
`reader.js`/`classics-reader.js`/`karaoke.js` más allá de los puntos de
integración citados.

## Técnicas con evidencia empírica ya implementadas (confirmadas, no se
reinventan en esta auditoría)

| Técnica | Dónde vive | Estado |
|---|---|---|
| Repetición espaciada (SRS, Leitner 6 cajas) | `srs.js` completo | Sólida. Botones de calificación muestran el intervalo real ANTES de elegir (`updateGradeIntervals`, `app.js:2573-2582`) |
| Interleaving | `app.js:513-565` (`mulberry32` + `seededShuffle`) | Parcial — ver hallazgo crítico en Evento 6 |
| Efecto de generación | `srs.js:876-931` | Sólida, con copy explícito que cita la investigación |
| Recuperación activa (práctica antes de revelar) | `checkAnswer`/`revealAnswer`, `app.js:2358-2517` | Sólida |
| Pares mínimos (discriminación tonal) | `minimal-pairs.js` | Sólida como ejercicio aislado — ver hallazgo en Evento 9 |
| Solo oído (audio antes que texto) | `app.js:955-1140` | Sólida, buen diseño de distractores |

---

# A. Los Nueve Eventos de Instrucción de Gagné

## 1. Ganar la atención

**Dónde pasa:** header fijo con logo + slogan (`index.html:20-30`); chip de
racha 🔥 en el header si `streak > 0` (`updateHeaderStreak`,
`app.js:2766-2778`); anillo de progreso de la sesión (`session-ring`,
`index.html:71`); pantalla "🎉 ¡Sesión completa!" al llegar a la meta
(`showSessionDone`, `app.js:2715-2734`); `onboarding.js` paso 6 usa un
proverbio ("千里之行，始于足下") y framing de racha ("no hace falta saberlo
todo: hace falta no romper la cadena").

**Qué tan bien resuelto:** Bien para el usuario que **vuelve** (racha,
anillo, sesión). Para el usuario que abre la app por primera vez en el día,
no hay ningún gancho de atención más allá del contenido mismo — no hay
variación visual/sorpresa al entrar, la tarjeta de práctica se ve igual
sesión tras sesión.

**Qué falta:** Nada grave. Podría explorarse algo liviano tipo "dato del
día" o variar la apertura (hoy: siempre arranca en la última tarjeta o en
Aprender), pero no es prioritario.

## 2. Informar el objetivo de aprendizaje

**Dónde pasa — y esto es INCONSISTENTE entre secciones:**

- **Lecciones** (`index.html:217`) sí lo hace, explícito: *"Leé una historia
  corta al nivel de tu vocabulario y practicá 10 oraciones sacadas del
  texto: elegí la palabra que falta entre tres opciones."*
- **Exámenes** (`index.html:225-260`): NO tiene ningún texto explicativo,
  solo el botón del test de colocación y los selectores de nivel.
- **Diaria**: el panel en sí (`index.html:303-329`) nunca tuvo intro — solo
  el dropdown de situaciones. `daily-stories.js` (agregado hoy) sí explica
  el objetivo, pero **a nivel popup, después de tocar una situación**
  ("Leé la escena completa antes de practicar las frases sueltas",
  `daily-stories.js` función `dsRenderBody`) — el panel que lista las
  situaciones sigue sin una línea de "cómo funciona esto".
- **Clásicos**: patrón similar a Exámenes, sin intro (`index.html:363-364`
  solo tiene un `<h4>` de sección, no una explicación del objetivo).
- **"Hoy" (la vista de práctica en sí)**: el único título es
  `<h2 class="sr-only">Hoy</h2>` (`index.html:45`) — **invisible**, solo
  para lectores de pantalla. No hay ningún objetivo visible al entrar a
  practicar más allá de la barra de estado del SRS ("N para repasar hoy").

**Qué falta:** Unificar el criterio. Lecciones marca el estándar correcto
(una frase, antes del contenido, explicando MÉTODO no solo TEMA); Exámenes,
Clásicos y el panel de Diaria no lo siguen.

## 3. Estimular el recuerdo de conocimiento previo

**Dónde pasa:** Test de colocación (`placement-test.js`, botón con
`title="2 aciertos por nivel y subimos: descubrí en qué nivel HSK estás
hoy"`, `index.html:235-237`) — cumple el evento de manera explícita y
literal: mide lo que el alumno ya sabe. Chip 🎯 por tarjeta
(`card-attempts`, `app.js:2074-2087`) muestra el historial de ESA tarjeta
puntual al mostrarla, activando memoria de intentos previos — pero a nivel
tarjeta individual, no de sesión completa.

**Qué falta:** No hay ningún resumen tipo "la vez pasada viste X, hoy
repasamos eso" al abrir la app — el conocimiento previo se usa para
FILTRAR (qué mostrar/repasar vía SRS) pero nunca se lo hace explícito al
alumno como punto de partida narrativo de la sesión.

## 4. Presentar el contenido

**Dónde pasa:** Cloze con hueco `___` + pinyin opcional + audio bajo
demanda + trazos bajo demanda (`renderCurrentSentence`, `app.js:2041-2170`).
`daily-stories.js` y `lessons-graduated.js` presentan un diálogo/historia
coherente ANTES de las frases sueltas (mismo patrón en los dos — el segundo
sirvió de modelo para el primero, agregado hoy). `classics-reader.js`
presenta el texto original por bloques.

**Hallazgo crítico:** Absolutamente todo el contenido nuevo (vocabulario,
gramática, cultura) se presenta en **texto y audio únicamente**. Cero
imágenes o diagramas ligados al SIGNIFICADO de una palabra o concepto
(confirmado: el único `<img>` en `index.html` es el logo de marca,
`index.html:28`). HanziWriter (`trazos.js`) anima la FORMA de escritura de
un carácter — es visual, pero representa cómo se traza, no qué significa.
La ÚNICA visualización real que existe en toda la app es el gráfico de
contorno de tono en el evaluador de pronunciación (ver Mayer, "principio
de imagen", abajo) — y ese gráfico es feedback de DESEMPEÑO propio, no
codificación dual de un concepto nuevo.

## 5. Proveer guía de aprendizaje

**Dónde pasa:** `onboarding.js` — guía de 6 pasos, muy bien construida:

1. **Bienvenida**: explica el flujo Aprender→Hoy→Repaso con el PORQUÉ
   ("con unos 10 minutos por día alcanza: la app recuerda qué repasarte y
   cuándo, para que lo estudiado no se escape").
2. **Aprender**: describe las 4 pestañas.
3. **Hoy**: describe el ciclo de respuesta (escuchar → escribir/trazar →
   Verificar → pista al primer error → respuesta al segundo).
4. **Calificá**: explica el mecanismo Leitner con datos reales de
   intervalo (10min/1/3/7/14/30 días) y un widget interactivo — explica el
   PORQUÉ del sistema, no solo qué botón tocar.
5. **Entrenar y Yo**: qué hay en esas pestañas.
6. **Un paso por día**: motivación + racha en vivo.

Es saltable en cualquier momento (excepto el último paso), se auto-abre una
sola vez (`localStorage['ac_onboarding_done_v2']`) y queda siempre
reabrible manualmente vía el botón 📖 Guía. Además: pistas graduadas MUY
bien resueltas dentro de la práctica misma — ver Evento 7.

**Qué tan bien resuelto:** Muy bien, de los puntos más fuertes de toda la
app. Explica el PORQUÉ (no solo el QUÉ) en los pasos que más importan
(1 y 4).

**Qué falta:** La guía es una experiencia ÚNICA (una vez, salvo que se
reabra a mano) — no hay guía incremental "just-in-time" la primera vez que
el alumno entra a una sección nueva (ej. la primera vez que toca 🎤
Pronunciación, o la primera vez que ve Pares Mínimos). Todo el conocimiento
procedimental se entrega de una sola vez al principio, con el riesgo
típico de que se olvide para cuando se necesita.

## 6. Provocar el desempeño (práctica)

**Dónde pasa:** Escribir la respuesta, elegir opción en "solo oído",
grabar la voz (`voice-evaluator.js`), trazar a mano — múltiples
modalidades de producción activa real, no solo lectura pasiva.

**Hallazgo — Interleaving no es lo que dice ser en el caso general:**
`getFiltered()` (`app.js:552-565`) solo mezcla DENTRO del módulo activo
cuando `state.activeModule !== 'todas'` — es decir, si estás practicando
"HSK2" con intercalado activado, lo que se mezcla es el ORDEN de las
oraciones de HSK2 entre sí, no una alternancia con otras categorías
distintas (que es lo que la investigación sobre interleaving documenta
como beneficioso — discriminar entre tipos, no memorizar una secuencia
fija). El interleaving "de verdad" (mezcla de categorías genuinamente
distintas) solo ocurre cuando el módulo activo es `'todas'`. El nombre de
la función y el toggle (`🔀 Intercalar`) sugieren la técnica completa; en
la práctica, para el caso más común (estudiar un módulo específico), es
solo aleatorización de orden.

**Otro hallazgo:** el panel de grabación de pronunciación está COLAPSADO
por defecto (`<details id="record-details">`, `index.html:176`, cerrado).
Reduce la carga inicial de la tarjeta, pero también reduce la
descubribilidad — un alumno puede pasar muchas sesiones sin notar que
existe.

## 7. Dar feedback

**Dónde pasa:** 4 estados de feedback textual: correct (verde), incorrect
(rojo), hint (ámbar), reveal (ámbar) — `style.css:407-415` y `:5210-5211`.
Pistas graduadas MUY bien resueltas: primer error → pista sin revelar
(detecta acento mal, pinyin-correcto-tono-mal, homófono, un-carácter-off
con máscara — `answerHint`, `app.js:2623-2651`); segundo error → revela +
diff carácter a carácter coloreado (`answerDiffHtml`, `app.js:2653-2669`).
En pronunciación: feedback multicapa muy rico — mensaje cualitativo por
carácter, mensaje global, chip de puntaje 0-100, gráfico de contorno de
tono (`voice-evaluator.js`, `VoiceRecorder.js` — ver detalle abajo en
Mayer).

**Hallazgo crítico:** `.feedback.hint` y `.feedback.reveal`
(`style.css:5210-5211`) comparten **exactamente el mismo CSS** (mismo
fondo, mismo color, mismo borde), a pesar de que el propio comentario del
código en `revealAnswer()` dice explícitamente *"revelar NO es acertar →
clase propia (ámbar)"* — la intención de diferenciarlos está documentada
en un comentario pero nunca se implementó visualmente distinto. Un alumno
no puede distinguir de un vistazo "todavía estoy jugando, esto es una
pista" (hint) de "ya me rendí, esto es directamente la respuesta"
(reveal) — son estados pedagógicamente opuestos con la misma piel.

**Hallazgo menor (verificado, no es bug real):** el HTML estático de
`btn-know`/Fácil muestra `3 días` como placeholder (`index.html:153`),
mientras que la lógica real (`srs.js:161`, `acSrsPreview`) puede devolver
"no vuelve" (tarjeta nueva) o un intervalo real de 7/14/30 días (tarjeta ya
en el mazo). En la práctica esto no se ve nunca mal: `updateGradeIntervals()`
se llama de forma síncrona en `setAnswerStage('post')` antes de que la fila
de calificación se muestre (`app.js:2559-2560`), así que el placeholder
nunca queda visible. Vale la pena igual limpiar el valor estático para que
no confunda a quien lea el HTML.

**Otro hallazgo (CSS, coherencia):** existen al menos TRES sistemas de
color correcto/incorrecto totalmente independientes y sin unificar:
`.feedback.correct/.incorrect` (genérico, cloze), `.rec-*`
(pronunciación — `.rec-score.ok/.mid/.low`, `.rec-bad`, `.rec-approx`) y
`.pl-opt.is-ok/.is-bad` + `.lq-opt.is-wrong` (test de colocación y quiz de
lecciones). Cada uno define sus propios verdes/rojos por separado en vez
de compartir un único token de "correcto"/"incorrecto" — no rompe nada
funcionalmente, pero es una señal de que el lenguaje visual del feedback
no está unificado en toda la app (relevante para Mayer, principio de
coherencia).

## 8. Evaluar el desempeño

**Dónde pasa:** Test de colocación = evaluación explícita de nivel.
`stats.js` trackea: racha, calendario de actividad (13 semanas × 7 días,
estilo GitHub), aciertos totales, palabras dominadas, minutos practicados,
distribución de palabras por nivel HSK, distribución del mazo SRS por caja
Leitner, y (v9.47) un ranking de caracteres con más errores de trazo.
Pronunciación: puntaje 0-100 por intento (`voice-evaluator.js:1070-1079`
chino, `:1190-1198` español), con fórmula documentada como "orientativa"
en el propio comentario del código (65% tono + 35% contenido en chino).

**Qué tan bien resuelto:** Muy completo en STATS.js — probablemente la
pieza más rica de todo el sistema de evaluación de progreso.

**Qué falta:** No hay "resumen de sesión" más allá de "practicaste N
frases hoy" + racha (`showSessionDone`, `app.js:2715-2734`) — no dice
CUÁNTO aprendiste en esa sesión puntual (aciertos vs. errores, por
ejemplo), solo la cantidad de tarjetas vistas. El resumen post-sesión es
de VOLUMEN, no de CALIDAD del desempeño.

## 9. Reforzar retención y transferencia

**Dónde pasa:** El SRS es la pieza central de este evento y funciona bien.
Respaldo/exportación a Anki (sección "RESPALDO DE PROGRESO",
`app.js:222-357`) permite transferencia FUERA de la app.

**Hallazgo crítico:** Pares Mínimos (`minimal-pairs.js`) está deliberadamente
aislado — el propio comentario del archivo lo documenta: *"No toca state,
getFiltered, SRS ni ningún flujo existente"*. Esto significa que un error
de discriminación tonal en Pares Mínimos **no alimenta el mazo de
repaso**: si un alumno confunde sistemáticamente 买/卖 (mǎi/mài), ese error
no vuelve a aparecer programado más tarde vía SRS — es una oportunidad de
refuerzo espaciado que se pierde por diseño.

**Otro hallazgo:** las escenas de `daily-stories.js` (agregadas hoy) no
tienen ningún mecanismo de refuerzo posterior — una vez leída la escena,
no vuelve a aparecer ni se referencia de nuevo más adelante (a diferencia
de las oraciones sueltas, que sí entran al SRS al fallar). Es un evento
único de "Evento 4" (presentación) sin conexión al Evento 9.

---

# B. Los 12 Principios de Mayer sobre aprendizaje multimedia

## 1. Coherencia
La fila "👁 Ver" en la tarjeta de práctica (`index.html:78-88`) expone 6
controles simultáneamente arriba de la tarjeta (简/繁, pinyin ON/OFF,
tonos, leyenda ℹ️, letra grande, tipografía) — mucha superficie de control
visible todo el tiempo. Es personalización legítima, pero también carga
extraña (extraneous load) potencial para un alumno principiante que solo
quiere responder la frase. Los TRES sistemas de color correcto/incorrecto
sin unificar (ver Evento 7) también son una forma de incoherencia visual
de bajo nivel.

## 2. Señalización
Bien aplicado en los colores de tono (`.tone-1`..`.tone-4`,
`style.css:623-630`) y en el diff de respuesta (`.d-ok`/`.d-no`/`.d-want`,
`style.css:5218-5220` — notablemente, `.d-no` usa tachado ADEMÁS de rojo y
`.d-want` usa subrayado ADEMÁS de verde, es decir, no dependen solo del
color, buena práctica de accesibilidad). Perdido en el par hint/reveal
(mismo color para dos estados distintos, ver Evento 7).

## 3. Redundancia
**Investigado específicamente, con buen resultado:** no se encontró ningún
lugar donde el TTS lea una oración que esté simultáneamente visible por
completo en pantalla sin acción del usuario. Los botones 🔊 ES/🔊 CN de la
tarjeta son manuales (`app.js`, `safeAdd('btn-play-es', ...)`,
`safeAdd('btn-play-cn', ...)`) y antes de responder el texto tiene el
hueco `___` sin completar (el audio da MÁS información que lo visible, no
es redundante). El único lugar donde el audio se dispara automáticamente
sin clic es el modo "Solo oído" (`app.js`, comentario *"el audio MANDA:
suena solo al entrar"*) — y ahí el texto está deliberadamente OCULTO
mientras suena (`index.html:387`: *"La frase suena antes de verse"*). Es
decir: la app evita la violación de redundancia por diseño deliberado, no
por casualidad — un acierto real que vale la pena documentar como tal.

## 4. Contigüidad espacial
Buena en el lector interlineal (`reader.js`, pinyin renderizado como ruby
DEBAJO de cada carácter, contiguo palabra por palabra). Un poco menos
contigua en la tarjeta de práctica principal: `pinyin-display`
(`index.html:115`) es un párrafo aparte debajo de `sentence-text`, no
alineado carácter por carácter — funciona, pero es menos preciso que el
patrón del lector.

## 5. Contigüidad temporal
El feedback (`showFeedback`) aparece inmediatamente después de verificar,
sin demora — bien resuelto. El gráfico de contorno de tono en el
evaluador de pronunciación se muestra apenas termina el análisis, en el
mismo panel donde se grabó — bien resuelto también.

## 6. Segmentación
Las pistas en dos etapas (primer error liviano y específico, segundo
error con diff completo — `app.js:2412-2420`) son un buen ejemplo de
segmentación pedagógica: no se entrega toda la información de una vez, se
dosifica según la necesidad real del alumno. El panel de grabación
colapsado por defecto también segmenta la carga inicial de la tarjeta
(con el costo de descubribilidad ya mencionado en Evento 6).

## 7. Pre-entrenamiento
El test de colocación cumple parcialmente este rol (ubica al alumno antes
de empezar un nivel), pero no hay pre-entrenamiento de VOCABULARIO clave
antes de un mini-drama o escena nueva — se entra directo al texto
completo. `lessons-graduated.js` y `daily-stories.js` no pre-enseñan
palabras difíciles antes de mostrar la historia; el vocabulario nuevo se
encuentra "en caliente", dentro del propio texto.

## 8. Modalidad
Bien aplicado en general: audio para el contenido hablado, texto para el
contenido escrito, sin forzar todo a un solo canal. "Solo oído"
(`app.js:955-1140`) es el ejemplo más puro: usa el canal auditivo como
ÚNICO canal de entrada inicial, forzando comprensión auditiva real en vez
de lectura con apoyo sonoro — justo lo que el principio de modalidad
recomienda para ese tipo de ejercicio.

## 9. Principio multimedia (palabras + imágenes > solo palabras)
**Este es el principio peor atendido de toda la auditoría.** No existe
NINGUNA imagen o diagrama ligado al significado de una palabra, concepto
gramatical o escena cultural en toda la app. Todo el "más allá del texto"
se resuelve con audio (otro canal verbal/simbólico) o con la animación de
trazos de HanziWriter (que representa FORMA, no significado). La única
excepción real es el gráfico de contorno de tono del evaluador de
pronunciación (`VoiceRecorder.js`, función `_drawPitch`) — pero ese
gráfico es data-visualización de DESEMPEÑO propio (tu voz vs. la
referencia), no una imagen que ayude a recordar el SIGNIFICADO de una
palabra nueva.

## 10. Personalización
Buena: tono informal "vos" consistente (rioplatense) en el contenido
nuevo (`daily-stories.js`), copy conversacional en general ("Escribila vos
y la vas a recordar mejor", `srs.js:899`), mensajes de racha con segunda
persona directa. El modo "abuelo" (letra grande) y la elección de fuente
(默认/楷体) son formas adicionales de personalización de la presentación.

## 11. Principio de voz
No evaluado en profundidad en esta pasada — las voces TTS
(`audio-tts.js`) son voces neuronales (Microsoft Edge, Xiaoxiao/Yunjian/
Elena/Tomás, etc.), no sintéticas robóticas por defecto, lo cual favorece
este principio (una voz "amigable" ayuda más que una máquina fría), pero
no hay una voz de "narrador/guía" diferenciada de la voz de "contenido a
aprender" — todo el TTS usa las mismas voces de práctica.

## 12. Principio de imagen (mostrar la cara del instructor no ayuda,
a veces distrae)
No aplica directamente — la app no tiene "cara de instructor" en ningún
lado (ni video, ni avatar). Esto es, si acaso, un punto a favor por
omisión: no hay riesgo de una cara distrayendo, pero tampoco hay ningún
elemento de calidez humana visual (todo es texto/audio/UI). El gráfico de
contorno de tono en el evaluador de pronunciación cumple el rol más
cercano a "imagen útil" de toda la app — vale la pena señalarlo como el
ÚNICO lugar donde el equipo ya demostró que sabe construir una
visualización pedagógicamente valiosa, y que ese mismo criterio no se
extendió a ningún otro lugar (vocabulario, gramática, cultura).

---

# Paso 2 — Propuesta de rediseño priorizada

Ordenada por relación costo/beneficio (no por orden de aparición arriba).
Riesgo evaluado con el mismo criterio informal usado en toda esta sesión
de trabajo: Bajo = archivo(s) acotado(s), sin tocar lógica central de
puntaje/SRS; Medio = toca flujo compartido pero de forma quirúrgica;
Alto = toca `checkAnswer`/SRS/datos existentes de forma amplia.

| # | Cambio | Evento/principio | Riesgo | Archivos/funciones | Por qué vale la pena |
|---|---|---|---|---|---|
| 1 | Diferenciar visualmente `.feedback.hint` de `.feedback.reveal` (color/ícono distinto) | Evento 7 (feedback), Mayer señalización | **Bajo** | `style.css:5210-5211` (2 reglas nuevas, sin tocar JS) | El código YA documenta la intención de diferenciarlos; es alinear la implementación con un comentario propio, cero riesgo de romper lógica |
| 2 | Agregar una línea de "cómo funciona esto" al panel de Exámenes, Clásicos y al panel de Diaria (antes del dropdown) | Evento 2 (objetivo) | **Bajo** | `index.html` (agregar `<p>` como el de Lecciones en `:217`), sin tocar JS | Lecciones ya prueba que este patrón funciona y es barato; falta extenderlo, no inventarlo |
| 3 | Unificar los 3 sistemas de color correcto/incorrecto en tokens CSS compartidos (`--color-correct`/`--color-incorrect`/`--color-hint`) | Mayer coherencia | **Medio** | `style.css` (varias reglas dispersas: `.feedback.*`, `.rec-*`, `.pl-opt.*`, `.lq-opt.*`) | Reduce inconsistencia visual sin tocar ninguna lógica — es refactor puro de CSS, pero toca muchas reglas dispersas, por eso Medio y no Bajo |
| 4 | Conectar los errores de Pares Mínimos al mazo SRS (opcional, vía `window.acSrsMiss` con un objeto sintético `{chinese_simp_answer, ...}`) | Evento 9 (retención) | **Medio** | `minimal-pairs.js` (un solo punto de integración al fallar una ronda) | El propio archivo documenta que NO toca SRS "a propósito" — cambiarlo es una decisión de diseño real, no un bug, por eso conviene priorizarlo bajo pero no urgente |
| 5 | Agregar un resumen de CALIDAD (aciertos/errores) al cierre de sesión, no solo cantidad | Evento 8 (evaluar desempeño) | **Bajo** | `showSessionDone`, `app.js:2715-2734` (ya tiene los datos en `state.score`/intentos, solo falta mostrarlos) | Los datos ya existen en `state`; es una mejora de presentación, no de lógica nueva |
| 6 | Pre-entrenar 3-5 palabras clave antes de abrir una escena de `daily-stories.js` o un mini-drama de `lessons-graduated.js` (mini-glosario previo) | Mayer pre-entrenamiento | **Medio** | `daily-stories.js` (`dsRenderBody`), `lessons-graduated.js` (vista de lectura) | Contenido nuevo a escribir (glosario corto por escena/lección) + cambio de UI acotado a esos dos módulos |
| 7 | Guías "just-in-time" cortas (un solo popup, una vez) la primera vez que se abre Pronunciación o Pares Mínimos, en vez de todo en el onboarding inicial | Evento 5 (guía) | **Medio** | Nuevo mini-patrón reutilizable (localStorage flags por feature), aplicado en 2-3 puntos de entrada | Complementa (no reemplaza) el onboarding ya sólido; reduce el "todo de una vez al principio" |
| 8 | Explorar 1-2 imágenes/iconos conceptuales para vocabulario de alta frecuencia (ej. en `daily-stories.js`, un ícono por escena más allá del emoji genérico, o tarjetas de vocabulario con un pictograma simple) | Mayer principio multimedia | **Alto** | Requiere contenido visual nuevo (no solo código) + posible archivo de assets + tocar `dict.js`/`trazos.js` (popup de vocabulario) para mostrarlo | Es el hallazgo más importante de todo el informe, pero también el más caro: implica conseguir/crear arte, no solo escribir JS — por eso va último en la lista pese a ser el más impactante |

**Nada de esto está implementado.** Quedo a la espera de que confirmes
cuáles priorizar antes de tocar código.
