# 🎙️ README — Evaluador de pronunciación (calibración y método)

Documentación viva del evaluador de pronunciación de Huayu Diario
(`voice-evaluator.js` + `config.js` + `VoiceRecorder.js`). Archivo
referenciado por config.js desde v7.8; creado con la primera calibración
formal (v9.44, 2026-09-21).

---

## 1. Arquitectura (resumen honesto)

- **Modo Chino (es-cn)**: Whisper tiny (contenido, «¿dijo el carácter
  correcto?») + F0/YIN + DTW contra el audio de referencia (tono real).
  Ver `pitch-analyzer.js`.
- **Modo Español (cn-es)**: SOLO Whisper. La métrica es la **confianza
  promedio por token**: `exp(media de las log-probabilities de los
  tokens de texto generados)`. NO mide fonema a fonema (whisper es un
  modelo ASR): correlaciona con la claridad global del audio.
- Todo corre LOCAL en el dispositivo (Web Worker + WASM, int8/q8,
  `Xenova/whisper-tiny`, transformers.js 3.8.1). La voz del alumno
  nunca sale del teléfono.

## 2. Cómo se decide el veredicto en español (v9.18 → v9.44)

```
dist = distancia de Levenshtein por palabra (texto normalizado y plegado)

dist === 0      →  conf < SOFT  ?  ⚠️ dudosa  :  ✅ perfect
dist <= maxD    →  🟡 close   (maxD = getMaxAcceptableDistance(n))
dist >  maxD    →  🔴 mismatch
```

- **SOFT** = `SPANISH_CONFIDENCE_SOFT` (config.js) — el umbral que
  DECIDE en transcripciones exactas. Calibrado: **0.50**.
- **THRESH** = `SPANISH_CONFIDENCE_THRESHOLD` (config.js, 0.85) — techo
  histórico de la spec v4.0. Hoy NO decide nada: el corpus demostró que
  es inalcanzable para audio sano (ver § Calibración).
- La UI (VoiceRecorder) muestra «Confianza: NN % · piso 50 %».

### v9.44 — fix crítico de la métrica

Desde v7.8 el worker pedía `gen.scores` a transformers.js, pero la
librería **nunca lo devuelve** (el campo está comentado con `TODO` dentro
de `src/models.js`). Resultado silencioso: la confianza era **siempre
null**, el piso jamás actuó y la UI mostraba «—». Corregido con
**teacher forcing**: después de `generate()`, un forward extra recibe la
secuencia completa como `decoder_input_ids` y se extrae la log-prob del
token elegido en cada posición (`log-softmax`), excluyendo los tokens
especiales/timestamp (id ≥ 50257). Misma definición de la métrica, sin
depender de campos no implementados.

---

## 3. Calibración

### 3.1 Método

1. **Corpus**: 84 muestras = 6 frases **REALES del app** (lessons-dele.js,
   3-11 palabras, con retos fonéticos: rr, b/v, ñ, ü, números) × 14
   condiciones de escucha que replican cómo usa la app un alumno real:
   4 voces neuronales (es-ES Elvira/Álvaro = las voces de referencia,
   es-AR Elena, es-MX Dalia), micrófono de teléfono (bandpass
   300-3400 Hz), ruido rosa/blanco a SNR 20/10/5/0 dB, reverb de pieza,
   velocidad −20 %/+15 % y pitch +25 Hz. Síntesis edge-tts, procesado
   con scipy (16 kHz mono PCM16 — el mismo formato que llega a Whisper).
2. **Medición**: el MISMO modelo y dtype que corre en el navegador
   (whisper-tiny q8), con el MISMO código de confianza (en
   Node/onnxruntime-node 1.21; en el dispositivo corre wasm/q8 — mismas
   cuantizaciones, diferencias numéricas mínimas).
3. **Análisis**: la población donde SOFT decide es la de transcripciones
   EXACTAS (dist = 0). Se barre la grilla de SOFT y se elige el valor
   con 0 % de falsos «dudosa» en audio sano y máxima detección de audio
   hostil, priorizando el margen de seguridad (filosofía v9.18: la
   confianza es señal, no veto).

### 3.2 Resultados (2026-09-21)

| Población (dist = 0) | n | conf min | conf media | conf máx |
|---|---|---|---|---|
| Audio pasable (limpio/mic/acentos/rate/pitch) | 31 | 0.557 | 0.663 | 0.830 |
| Zona gris (SNR 10 dB) | 1 | — | 0.503 | — |
| Audio hostil (SNR 5/0 dB) | 0 | — | — | — |

- El umbral histórico **0.85 es inalcanzable**: 0 % del corpus sano lo
  alcanza (máximo observado 0.830). Como umbral DURO castigaría al
  100 % del audio sano — v9.18 tenía razón al degradarlo a informativo.
- **Grilla de SOFT** (FP = % de audio sano con «dudosa»; detección =
  % de audio hostil-exacto detectado): SOFT 0.50 → FP 0 % / detección
  0 %; SOFT 0.55 → FP 0 % / detección 100 % (pero a 0.007 del piso
  real: riesgo entre dispositivos); SOFT 0.60 → FP 22.6 %.
- **ELECCIÓN: SOFT = 0.50.** FP 0 % con margen amplio (piso real
  0.557). El caso de frontera (0.503) queda en el borde a propósito:
  prefiere no castigar pronunciación clara antes que detectar un caso
  dudoso más. El registro completo está en config.js.

### 3.3 Limitaciones honestas del corpus sintético

- Las «voces de alumnos» son voces neuronales con degradaciones
  acústicas: cubren el canal (mic, ruido, reverb) pero no todos los
  acentos/errores articulatorios de estudiantes reales de chino.
- tiny sigue fallando en contenido con frases largas: «sábado» →
  «Salvador», «bombo legüero» → «bolegero» (por eso existe la capa
  léxica tolerante y su calibración v9.40). Si se quisiera más
  precisión de contenido, el paso natural es `whisper-base` (~80 MB,
  ya previsto en VE_CONFIG).

### 3.4 Re-calibración con datos reales (sin tocar código)

La app guarda una bitácora local de las últimas 24 evaluaciones de
español: `localStorage.getItem('ve_es_conf_log')` (consola del
navegador). Cuando haya suficiente corpus real de dispositivos:

1. Exportar el log de varios dispositivos y juntarlo.
2. Repetir la grilla de SOFT sobre `dist === 0` (mismo criterio:
   0 % FP en audio claro, máxima detección).
3. Actualizar `SPANISH_CONFIDENCE_SOFT` en config.js (con fecha y
   números en el REGISTRO) y esta sección.

---

## 4. Tabla de constantes (fuente de verdad: config.js)

| Constante | Valor | Qué decide |
|---|---|---|
| `SPANISH_CONFIDENCE_THRESHOLD` | 0.85 | Nada (techo histórico, mostrado como referencia) |
| `SPANISH_CONFIDENCE_SOFT` | 0.50 | «dudosa» en transcripciones exactas |
| `getMaxAcceptableDistance(n)` | 1 / 1 / 20 % | Tolerancia léxica por longitud (≤3, ≤6, >6 palabras) |
| `VE_CONFIG.minRms` | 0.0015 | Silencio → «no escuché nada» |
