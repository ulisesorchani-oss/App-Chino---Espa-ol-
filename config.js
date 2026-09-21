/* ============================================================
   config.js — v7.8 Constantes extraíbles del evaluador de
   pronunciación (spec Prompt v4.0, §3 — "documentadas para
   calibración")
   ------------------------------------------------------------
   Este archivo existe para que NUNCA haya un número mágico
   enterrado en la lógica: todo lo que se calibra con datos
   reales vive acá, documentado y en un solo lugar. Si mañana
   cambia el modelo (whisper-tiny → base) o el micrófono típico,
   se recalibra ACÁ sin tocar la lógica.
   ============================================================ */
(function (global) {
'use strict';

/* ── SPANISH_CONFIDENCE_THRESHOLD (spec v4.0 §1 CASO B) ──────────
   Métrica: confianza PROMEDIO POR TOKEN de Whisper, calculada
   como exp(media de las log-probabilities de los tokens de texto
   generados (v9.44: vía teacher forcing — ver abajo por qué).
   Se compara contra este umbral SOLO en modo Español (cn-es) y
   SOLO cuando la transcripción coincide textualmente con el
   objetivo (tras normalizeText):

     confianza >= umbral  →  ✅ éxito (verde, "¡Excelente!")
     confianza <  umbral  →  ⚠️ "pronunciación dudosa" (amarillo)

   VALOR INICIAL: 0.85 — punto de partida de la spec.

   ⚠️ REGISTRO DE CALIBRACIÓN 2026-09-21 (corpus 84 muestras):
   la confianza REAL de whisper-tiny para audio pasable con
   transcripción exacta quedó entre 0.557 y 0.830 (media 0.663):
   NINGUNA muestra sana alcanza 0.85 (0 % del corpus). Por eso
   desde v9.18 este valor NO decide el veredicto: queda como
   techo histórico/orientativo. El umbral que DECIDE es
   SPANISH_CONFIDENCE_SOFT (abajo), calibrado con datos.
   Método completo, tablas y condiciones del corpus:
   README-Pronunciacion.md § Calibración.

   NOTA DE HONESTIDAD TÉCNICA: whisper-tiny es un modelo ASR,
   no un evaluador de pronunciación. Su confianza refleja "qué
   tan seguro estoy de lo que escuché"; correlaciona con la
   claridad de la pronunciación pero NO mide fonema a fonema.
   El feedback fonético granular (ej. "la 'rr' necesita más
   vibración") queda para Fase 2 con Wav2Vec 2.0 (spec §3).
   ------------------------------------------------------------
   v9.44 — POR QUÉ LA CONFIANZA AHORA ES REAL: desde v7.8 el
   worker pedía gen.scores a transformers.js, pero la lib NUNCA
   lo devuelve (campo comentado con TODO dentro de la propia
   lib) → la confianza era SIEMPRE null y ningún umbral actuó
   jamás. Corregido con teacher forcing: un forward extra con la
   secuencia completa como decoder_input_ids y log-softmax por
   posición (misma definición de la métrica, ver voice-evaluator.js).
   ============================================================ */
const SPANISH_CONFIDENCE_THRESHOLD = 0.85;

/* ── SPANISH_CONFIDENCE_SOFT (v9.18, CALIBRADO v9.44) ────────────
   PISO de confianza para el caso de transcripción EXACTA
   (dist === 0): conf < SOFT → ⚠️ "dudosa" (delata audio tan
   ruidoso/ilegible que aunque tiny entendió la frase completa,
   la medición es poco confiable). conf >= SOFT → ✅ "perfect".
   En frases con diferencia léxica (dist > 0) NO actúa: ahí
   deciden getMaxAcceptableDistance() y el feedback por palabra.

   ┌─ REGISTRO DE CALIBRACIÓN ──────────────────────────────────
   │ fecha         : 2026-09-21
   │ modelo        : Xenova/whisper-tiny q8 (transformers.js 3.8.1;
   │                 medición en Node/onnxruntime-node 1.21, mismo
   │                 dtype q8 que corre el navegador en wasm)
   │ corpus        : 84 muestras sintéticas = 6 frases REALES del
   │                 app (lessons-dele.js, 3-11 palabras, con rr,
   │                 b/v, ñ, ü, números) × 14 condiciones: 4 voces
   │                 neuronales (es-ES f/m, es-AR, es-MX), mic de
   │                 teléfono 300-3400 Hz, ruido rosa/blanco SNR
   │                 20/10/5/0 dB, reverb, rate -20%/+15%, pitch +25Hz
   │ población clave: transcripciones EXACTAS (dist = 0) — la única
   │                 donde SOFT decide
   │     audio pasable  : n=31, conf 0.557-0.830, media 0.663
   │     zona gris      : n=1,  conf 0.503 (SNR 10 dB)
   │     audio hostil   : n=0 con dist=0 (el ruido fuerte rompe la
   │                 transcripción → ahí ya decide la distancia léxica)
   │ elección      : 0.50 — 0 % de falsos «dudosa» en el corpus,
   │                 con margen de seguridad bajo el piso real
   │                 (0.557); el caso de frontera (0.503) queda
   │                 al borde a propósito: prioridad pedagógica =
   │                 NUNCA castigar pronunciación clara (v9.18)
   │ grilla probada: 0.05-0.80; 0.55 habría detectado el caso gris
   │                 pero con margen de 0.007 al piso → riesgo de
   │                 falsos «dudosa» entre dispositivos (wasm vs node);
   │                 0.60 ya castiga al 22.6 % del audio sano
   │ próximo paso  : la bitácora ve_es_conf_log (localStorage,
   │                 últimas 24) acumula conf/dist REALES de los
   │                 alumnos; cuando haya corpus de dispositivos
   │                 reales, re-correr la grilla y actualizar acá
   └────────────────────────────────────────────────────────────
   Constante exportada desde v9.44 (antes era un fallback
   enterrado en voice-evaluator.js: filosofía del archivo =
   ningún número mágico fuera de config.js). */
const SPANISH_CONFIDENCE_SOFT = 0.5;

/* ── getMaxAcceptableDistance(wordCount) (spec v4.0 §3) ──────────
   Tolerancia léxica del modo Español a nivel de PALABRA
   (distancia de Levenshtein entre la frase esperada y la
   transcripción, ambas pasadas por normalizeText('es')).

   Escala con la longitud: acertar 10/10 palabras es mucho más
   difícil que 3/3, y una frase corta mal dicha es un error
   garrafal mientras que en una larga se perdona un tropiezo.

     ≤ 3 palabras  → 1    (v9.40: 1 palabra de margen — ver NOTA abajo)
     ≤ 6 palabras  → 1    (frases medias: 1 palabra de margen)
     > 6 palabras  → 20 % redondeado abajo

   (spec v4.0 §6, caso QA #7: 3 palabras con 1 error → distancia
   1 > umbral 0 → rojo. NOTA v9.40 — ese caso resultó demasiado
   estricto en la práctica: whisper-tiny comete errores ocasionales
   de transcripción (marca/omite un artículo, confunde una palabra)
   y con tolerancia 0 las frases cortas — justo las que más
   practica un principiante — salían rojas con pronunciación
   correcta (falsos negativos). En las largas ya había 20 % de
   tolerancia; las cortas quedaban sin colchón → ahora comparten
   el mismo margen de 1 palabra que las medias.) */
function getMaxAcceptableDistance(wordCount) {
    if (wordCount <= 3) return 1;        // v9.40: colchón anti falsos negativos de tiny
    if (wordCount <= 6) return 1;        // frases medias: 1 palabra
    return Math.floor(wordCount * 0.2);  // frases largas: 20 %
}

/* Exposición: script clásico (sin módulos ES en la app) → un solo
   global. Equivalente ES-module de la spec sería:
     export const SPANISH_CONFIDENCE_THRESHOLD = 0.85;
     export const SPANISH_CONFIDENCE_SOFT = 0.5;
     export function getMaxAcceptableDistance(wordCount) { ... } */
global.PronunciationConfig = {
    SPANISH_CONFIDENCE_THRESHOLD: SPANISH_CONFIDENCE_THRESHOLD,
    SPANISH_CONFIDENCE_SOFT: SPANISH_CONFIDENCE_SOFT,
    getMaxAcceptableDistance: getMaxAcceptableDistance
};

})(typeof window !== 'undefined' ? window : globalThis);
