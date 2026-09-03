# 🎙️ Módulo de Evaluación de Pronunciación — v7.8 (spec Prompt v4.0)

Documentación del módulo de voz: arquitectura por MODO, normalización honesta de
texto, calibración del umbral de confianza y casos de prueba de integración/QA.
Todo el pipeline es **100 % local y privado**: la voz del alumno **jamás** sale
del dispositivo.

---

## 1. Arquitectura: bifurcación estricta por `state.mode`

El evaluador (`voice-evaluator.js`, fachada `PronunciationEvaluator` / `window.VE`)
valida que el modo sea **exactamente** `'es-cn'` o `'cn-es'`; cualquier otro
valor hace `console.error` y **detiene el pipeline** (spec v4.0 §5).

| Modo | Pipeline | Métrica principal |
|------|----------|-------------------|
| `es-cn` (Aprendo Chino) | Whisper WASM (contenido) **+** F0+DTW (tono real, `pitch-analyzer.js`) | Tono medido por carácter + verificación segmental |
| `cn-es` (Aprendo Español) | **SOLO** Whisper WASM — *prohibido* instanciar/consultar `PitchAnalyzer` | Confianza promedio por token + comparación léxica tolerante |

### Modo Chino (`es-cn`) — orden de veredictos

1. **Validación SEGMENTAL primero** (spec v4.0 §1): se alinea la transcripción
   de Whisper con el objetivo carácter a carácter (por *sílaba base*, sin tono).
   - Mismo fonema, otro carácter (妈→麻, /ma/) → **NO** es segmental: el
     veredicto lo da el **tono medido** (F0+DTW), jamás la inferencia del
     transcript. Ej. QA #1: "Sonó como 2.º tono, buscá 1.er tono".
   - Sílaba distinta (是 /shi/ → 四 /si/) → **Error segmental**:
     *"Fonema incorrecto: se detectó /s/, se esperaba /sh/"* y se **omite** el
     análisis tonal de ese segmento (QA #2).
2. **Análisis tonal** (F0 YIN → semitonos relativos al hablante → DTW contra
   la referencia TTS de la frase → clasificación 1/2/3/4 + neutro) para los
   caracteres sin error segmental.
3. La confianza de Whisper **no se muestra** en este modo (spec §5).

### Modo Español (`cn-es`)

- Whisper transcribe con `language: 'es'` y se extrae la **confianza promedio
  por token** (media de log-probabilities de los tokens generados, excluyendo
  especiales/timestamps). Es una métrica de *certeza del ASR*, no un score
  fonético — el feedback fonético granular (rr, b/v…) llega en Fase 2 con
  Wav2Vec 2.0.
- Comparación **tolerante**, nunca igualdad estricta (spec §3):
  `normalizeText('es')` en ambos lados → Levenshtein **por palabra** →
  umbral dinámico `getMaxAcceptableDistance(wordCount)`.
- Veredictos: `perfect` (✅ verde) · `doubt` (⚠️ amarillo, confianza baja) ·
  `close` (⚠️ "Acertaste X de Y palabras. Revisá: …") · `mismatch` (❌
  "Se detectó: «…» — Se esperaba: «…»").

---

## 2. Normalización honesta (`text-utils.js` → `normalizeText(text, language)`)

El parámetro `language` es **obligatorio** (`'es'` | `'cn'`); **nunca** se
aplica la normalización española al chino ni viceversa (regla de oro).

- **Español** (`'es'`): NFC → lowercase → **quitar diacríticos** (NFD →
  filtrar `\p{M}` → NFC) → eliminar toda puntuación (`\p{P}`, `¿ ? ¡ ! . ,`) →
  colapsar espacios → trim. Ejemplo consistente:
  `"¿Cómo estás?"` → `"como estas"`.
  - **Justificación técnica (NO lingüística), spec v4.0 §2:** el acento
    prosódico en español **sí es fonéticamente relevante** ("tomo" ≠ "tomó").
    Se normaliza a tilde-insensible porque **Whisper transcribe tildes de
    forma inconsistente** — es una limitación del modelo ASR, no una
    afirmación pedagógica.
  - La **ñ** (y la **ü** de güe/güi) se **preservan**: son fonemas/marcas
    reales (peña ≠ pena), y Whisper sí las transcribe de forma consistente.
- **Chino** (`'cn'`): NFC → eliminar puntuación (，。！？、 y ASCII) →
  colapsar espacios. **No** se eliminan caracteres ni "tonos": la comparación
  es carácter-exacto (los errores en chino son categóricos, no graduales).

---

## 3. Calibración de `SPANISH_CONFIDENCE_THRESHOLD` (config.js)

Valor inicial: **0.85** — punto de partida de la spec, **no** un valor fijo en
producción. Método de calibración empírica:

1. **Corpus mínimo**: 20–30 muestras **reales** de hispanohablantes
   pronunciando frases españolas de la app, la mitad bien y la mitad con
   errores típicos (rr→r, b/v, s final aspirada,…
   ej. fixtures QA #3/#4). Grabar con el mismo tipo de dispositivo de los
   alumnos: **celular**, micrófono de fábrica, ambiente real (aula/calle/casa).
2. **Medición**: evaluar cada muestra (la app muestra "Confianza: NN %") y
   tabular: `(frase, transcripción, confianza, veredicto humano OK/NO-OK)`.
3. **Umbral**: elegir el valor que **minimice falsos positivos** (mala
   pronunciación marcada como buena) sin generar alertas en pronunciaciones
   aceptables (curva precisión/recall sobre la tabla del paso 2).
4. **Registro**: anotar en `config.js` (bloque "REGISTRO DE CALIBRACIÓN") el
   valor final + fecha + modelo (whisper-tiny @3.8.1) + n de muestras + FP/FA.

Recalibrar si cambia el modelo (`whisper-base`), el idioma dominante del
corpus o el perfil de micrófono típico.

### `getMaxAcceptableDistance(wordCount)` (config.js)

Tolerancia léxica escalable (spec §3): `≤3` palabras → 0 · `≤6` → 1 ·
`>6` → `floor(20 %)`. Si la QA real la muestra muy estricta, se ajusta **solo
en config.js**.

---

## 4. Ciclo de vida del motor de tono (memoria, spec §4)

- **Lazy real**: `pitch-analyzer.js` **no** se carga al iniciar la app; se
  inyecta solo al entrar al modo chino. El **Worker** de DSP se crea recién
  en la **primera evaluación** `es-cn` (`PitchAnalyzer.create()`). Si el
  alumno nunca practica chino, el script y su Worker **no existen**.
- **`PitchAnalyzer.dispose()`** devuelve una `Promise<void>` que **siempre
  resuelve** (nunca rechaza): envía `terminate` al Worker, espera el *ack*
  con timeout de **2000 ms**; si vence, `worker.terminate()` forzoso; limpia
  referencias y resuelve igual. *"Esta Promise siempre resuelve. El timeout
  es fallback de seguridad, no error."*
  (Nota honesta de arquitectura: el DSP de pitch es JS puro sin AudioContext
  propio — la captura pertenece a VoiceRecorder y los AudioContext de decode
  son transitorios; dispose libera lo que la clase posee: Worker + promesas
  en vuelo + cache de contornos.)
- **`setMode(newMode)`** (en `window.VE`, y `app.js setMode()` es async):
  1. aborta la evaluación en curso (AbortController; el resultado descartado
     no pisa la UI);
  2. si se sale de `es-cn` → `await pitchAnalyzer.dispose()` **antes** de
     mutar `state.mode`;
  3. muta el modo; 4. carga bajo demanda.
- **Estrés QA #8**: alternar `es-cn`↔`cn-es` ×10 en 5 s → cero Workers
  zombis, sin excepciones (test `scripts/test-mode-lifecycle.js`).

---

## 5. Casos de Prueba de Integración / QA (spec v4.0 §6)

> ⚠️ Estos casos **requieren fixtures de audio** (grabaciones reales o
> sintetizadas con TTS). **No son tests unitarios puros**: sirven para
> validación manual, semi-automatizada (Playwright, como `scripts/test_v7_*`)
> o tests de integración con `MediaRecorder` mockeado. Los casos #4–#7 son
> además reproducibles a nivel lógico en Node (ver `scripts/test-text-utils.js`).

| # | Modo | Input de audio (fixture) | Comportamiento esperado |
|---|------|--------------------------|--------------------------|
| 1 | `es-cn` | "mā" pronunciado con tono 2 (Whisper oirá 麻, misma sílaba /ma/) | Feedback tonal del F0 medido: *"Sonó como 2.º tono, buscá 1.er tono"* |
| 2 | `es-cn` | "shì" pronunciado /sì/ (Whisper oirá 四) | *"Fonema incorrecto: se detectó /s/, se esperaba /sh/"* — sin análisis tonal para ese carácter |
| 3 | `cn-es` | "perro" bien pronunciado (TTS es-ES o grabación real) | ✅ Verde + *"¡Excelente pronunciación!"* (confianza ≥ threshold) |
| 4 | `cn-es` | "pero" (omite la vibrante) | ⚠️ *"Acertaste 0 de 1 palabras. Revisá: «perro» (se entendió «pero»)"* |
| 5 | `cn-es` | "Necesito renovar mi visa" cambiando 1 palabra (4 total) | ⚠️ *"Acertaste 3 de 4 palabras"* (distancia 1 ≤ umbral 1) |
| 6 | `cn-es` | "¿Cómo estás?" bien pronunciado | ✅ Verde (la normalización elimina tilde+puntuación → `como estas`) |
| 7 | `cn-es` | "El gato negro" con 1 palabra mal (3 palabras) | ❌ Rojo: distancia 1 > umbral 0 (frases cortas: cero tolerancia) |
| 8 | transición | Alternar `es-cn`↔`cn-es` ×10 en 5 s durante una evaluación | DevTools → Memory: cero Workers zombis; `setMode` esperó `dispose()`; sin excepciones |

**Cómo generar los fixtures**: sintetizar con el endpoint TTS propio
(`POST /api/tts`, `lang: 'es-ES'` / `'zh-CN'`) o grabar a alumnos reales
(recomendado para los casos #1–#3). Los fixtures #1/#2 también se pueden
producir en Node sintetizando el F0 (así lo hacen `test-pitch-analyzer.js`).

**Qué se cubre automatizado hoy** (sin audio real):
- Lógica de normalización, Levenshtein por palabra, umbral dinámico y
  veredictos (`scripts/test-text-utils.js`, casos #4–#7 a nivel lógico).
- `dispose()` always-resolve, `setMode` con espera de dispose, validación de
  modo inválido y estrés de cambios de modo (`scripts/test-mode-lifecycle.js`).
- DSP de tonos con PCM sintético (`scripts/test-pitch-analyzer.js`).

---

## 6. Privacidad

- La voz del alumno **nunca** sale del dispositivo (ni Whisper ni el análisis
  de tono hacen requests con el audio).
- La única red involucrada: la descarga del **modelo** (~40 MB, una sola vez,
  cacheada) y el audio de **referencia** (el mismo TTS 🔊 ES/CN que el alumno
  ya escucha — no es su voz).
- Fase 2 (futuro): feedback fonético granular con Wav2Vec 2.0, y
  `CloudSpeechProvider` (Azure Pronunciation Assessment / GOP) ya preparado
  como placeholder — una sola línea: `VE.setProvider('cloud')`.
