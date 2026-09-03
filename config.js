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
   generados en greedy decoding). Se compara contra este umbral
   SOLO en modo Español (cn-es) y SOLO cuando la transcripción
   coincide textualmente con el objetivo (tras normalizeText):

     confianza >= umbral  →  ✅ éxito (verde, "¡Excelente!")
     confianza <  umbral  →  ⚠️ "pronunciación dudosa" (amarillo)

   VALOR INICIAL: 0.85 — ES UN PUNTO DE PARTIDA, NO UN VALOR
   SAGRADO. Antes de fijarlo en producción hay que calibrarlo
   con datos reales (método completo en README-Pronunciacion.md):

     1. Grabar un corpus mínimo de 20–30 muestras REALES de
        hispanohablantes pronunciando frases españolas del app,
        la mitad bien y la mitad con errores típicos (rr→r,
        b/v, s final aspirada…), con el mismo tipo de
        dispositivo que usan los alumnos (celular, mic de
        fábrica, ambiente real de aula/casa).
     2. Evaluar cada muestra y anotar la confianza que reporta
        whisper-tiny (la app la muestra: "Confianza: NN %").
     3. Elegir el umbral que minimice FALSOS POSITIVOS (mala
        pronunciación marcada como buena) sin generar alertas
        en pronunciaciones aceptables (curva precisión/recall).
     4. Anotar el valor final, el corpus y el método acá abajo
        y en README-Pronunciacion.md § Calibración.

   NOTA DE HONESTIDAD TÉCNICA: whisper-tiny es un modelo ASR,
   no un evaluador de pronunciación. Su confianza refleja "qué
   tan seguro estoy de lo que escuché"; correlaciona con la
   claridad de la pronunciación pero NO mide fonema a fonema.
   El feedback fonético granular (ej. "la 'rr' necesita más
   vibración") queda para Fase 2 con Wav2Vec 2.0 (spec §3).
   ------------------------------------------------------------
   REGISTRO DE CALIBRACIÓN (completar cuando Ulises haga el
   corpus; formato sugerido:
     fecha | modelo | n muestras | umbral elegido | FP/FA )
   (aún sin calibrar → se usa el valor inicial de la spec)
   ============================================================ */
const SPANISH_CONFIDENCE_THRESHOLD = 0.85;

/* ── getMaxAcceptableDistance(wordCount) (spec v4.0 §3) ──────────
   Tolerancia léxica del modo Español a nivel de PALABRA
   (distancia de Levenshtein entre la frase esperada y la
   transcripción, ambas pasadas por normalizeText('es')).

   Escala con la longitud: acertar 10/10 palabras es mucho más
   difícil que 3/3, y una frase corta mal dicha es un error
   garrafal mientras que en una larga se perdona un tropiezo.

     ≤ 3 palabras  → 0    (frases cortas: cero tolerancia)
     ≤ 6 palabras  → 1    (frases medias: 1 palabra de margen)
     > 6 palabras  → 20 % redondeado abajo

   (spec v4.0 §6, caso QA #7: 3 palabras con 1 error → distancia
   1 > umbral 0 → rojo. Si la QA real muestra que es demasiado
   estricto, se ajusta SOLO acá.) */
function getMaxAcceptableDistance(wordCount) {
    if (wordCount <= 3) return 0;        // frases cortas: cero tolerancia
    if (wordCount <= 6) return 1;        // frases medias: 1 palabra
    return Math.floor(wordCount * 0.2);  // frases largas: 20 %
}

/* Exposición: script clásico (sin módulos ES en la app) → un solo
   global. Equivalente ES-module de la spec sería:
     export const SPANISH_CONFIDENCE_THRESHOLD = 0.85;
     export function getMaxAcceptableDistance(wordCount) { ... } */
global.PronunciationConfig = {
    SPANISH_CONFIDENCE_THRESHOLD: SPANISH_CONFIDENCE_THRESHOLD,
    getMaxAcceptableDistance: getMaxAcceptableDistance
};

})(typeof window !== 'undefined' ? window : globalThis);
