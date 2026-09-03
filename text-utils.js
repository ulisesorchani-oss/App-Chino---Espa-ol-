/* ============================================================
   text-utils.js — v7.8 Utilitario compartido de COMPARACIÓN DE
   TEXTO para el evaluador de pronunciación (spec Prompt v4.0 §2-§3)
   ------------------------------------------------------------
   Archivo utilitario compartido (entregable 2 de la spec): lo
   consumen voice-evaluator.js (bifurcación de modos), VoiceRecorder
   (render) y los tests de Node. Autocontenido, sin dependencias.

   CONTENIDO
     · normalizeText(text, language) → normalización HONESTA y
       DIFERENTE por idioma (regla de oro: nunca cruzar idiomas).
     · levenshteinWords(a, b)        → distancia a nivel de
       PALABRA con traza de alineación (para el feedback granular
       "Acertaste X de Y palabras. Revisá: ...").
     · getMaxAcceptableDistance(n)   → reexport defensivo de
       config.js (fuente de verdad de la calibración).
     · segmentalCompare(...)         → para modo Chino: ¿el error
       es SEGMENTAL (/s/ vs /sh/) o solo TONAL (mismo fonema,
       distinta entonación)?  (spec v4.0 §1 CASO A)
   ============================================================ */
(function (root, factory) {
    /* UMD: navegador (window.TextUtils) + Node (tests) */
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.TextUtils = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

/* ============================================================
   normalizeText(text, language) — spec v4.0 §2
   ------------------------------------------------------------
   language es PARÁMETRO OBLIGATORIO ('es' | 'cn').

   ⚠️ REGLA DE ORO (spec): nunca aplicar la normalización
   española al chino ni viceversa. Cada idioma tiene su propio
   pipeline porque los "ruidos" que hay que ignorar son distintos.
   ============================================================ */
function normalizeText(text, language) {
    if (language !== 'es' && language !== 'cn') {
        throw new Error("normalizeText: language es obligatorio ('es' | 'cn'), llegó: " + language);
    }
    let s = String(text == null ? '' : text);
    if (!s) return '';

    // 1. Unicode NFC (ambos idiomas: forma canónica compuesta)
    s = s.normalize('NFC');

    if (language === 'es') {
        /* ── PIPELINE ESPAÑOL (spec v4.0 §2 CASO es) ── */
        // 2. lowercase
        s = s.toLowerCase();

        /* 3. PROTECCIÓN de la eñe ANTES de quitar diacríticos.
         *    Justificación honesta (misma lógica que la spec usa
         *    para las tildes, aplicada al caso contrario): la ñ
         *    NO es un acento prosódico sino un FONEMA distinto
         *    (/ɲ/ vs /n/: "peña" ≠ "pena"). Whisper sí la
         *    transcribe de forma consistente, así que la
         *    preservamos; solo se eliminan los ACENTOS gráficos
         *    (á é í ó ú), cuyo reconocimiento es inconsistente
         *    en el modelo. Protegemos también la ü (güe/güi,
         *    marca diacrítica del hiato) por la misma razón. */
        s = s.replace(/ñ/g, '\u0001').replace(/ü/g, '\u0002')
             .replace(/Ñ/g, '\u0001').replace(/Ü/g, '\u0002');

        // 3bis. quitar diacríticos: NFD → filtrar combining marks (\p{M}) → recomponer
        //    ⚠️ JUSTIFICACIÓN TÉCNICA (NO lingüística), spec v4.0 §2:
        //    el acento prosódico en español SÍ es fonéticamente
        //    relevante ("tomo" ≠ "tomó"). Pero Whisper transcribe
        //    tildes ortográficas de forma inconsistente y no
        //    confiable. Por limitación técnica del modelo ASR (no
        //    por irrelevancia pedagógica), normalizamos a
        //    tilde-insensible para evitar falsos negativos injustos.
        s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');

        // restaurar eñe/üe protegidas
        s = s.replace(/\u0001/g, 'ñ').replace(/\u0002/g, 'ü');

        // 4. eliminar TODA puntuación (incluye ¿ ? ¡ ! . , ; : « » — …)
        s = s.replace(/\p{P}/gu, ' ');
        // símbolos sueltos (€ $ % etc.): no aportan a la comparación léxica
        s = s.replace(/\p{S}/gu, ' ');

        // 5+6. colapsar espacios múltiples + trim
        s = s.replace(/\s+/g, ' ').trim();
        return s;
    }

    /* ── PIPELINE CHINO (spec v4.0 §2 CASO cn) ──
       1. NFC (ya hecho arriba).
       2. Eliminar puntuación china (，。！？、) y también ASCII.
       3. QUITAR todo espacio: la escritura china no usa espacios y la
          comparación es CARÁCTER-EXACTO (los errores en chino son
          categóricos, no graduales — spec §3).
       4. NO se eliminan caracteres. Sin lowercase (irrelevante para
          hanzi y peligroso si el texto mezcla pinyin/latín). */
    s = s.replace(/[\u3000-\u303F\uFF00-\uFF65]/g, ''); // CJK punct + fullwidth
    s = s.replace(/\p{P}/gu, '');
    s = s.replace(/\p{S}/gu, '');
    s = s.replace(/\s+/g, '');
    return s;
}

/* ============================================================
   levenshteinWords(a, b) — distancia a nivel de PALABRA
   ------------------------------------------------------------
   a, b: arrays de palabras (ya normalizadas + split por espacio).
   Devuelve { dist, ops } con la traza de alineación para el
   feedback granular de la spec §3:
     ops: [{ ti, hi, ok }] — ti/hi = índices en a/b (-1 = inserción
   o borrado puro), ok = las palabras coinciden.
   ============================================================ */
function levenshteinWords(a, b) {
    const n = a.length, m = b.length;
    const d = [];
    for (let i = 0; i <= n; i++) { d.push(new Array(m + 1).fill(0)); d[i][0] = i; }
    for (let j = 0; j <= m; j++) d[0][j] = j;
    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= m; j++)
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1,
                               d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    // backtrace (mismo patrón que syllAlign de VoiceRecorder.js)
    const ops = []; let i = n, j = m;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
            ops.push({ ti: i - 1, hi: j - 1, ok: a[i - 1] === b[j - 1] }); i--; j--;
        } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) { ops.push({ ti: i - 1, hi: -1, ok: false }); i--; }
        else { ops.push({ ti: -1, hi: j - 1, ok: false }); j--; }
    }
    ops.reverse();
    return { dist: d[n][m], ops: ops };
}

/* ============================================================
   getMaxAcceptableDistance — reexport defensivo
   ------------------------------------------------------------
   La fuente de VERDAD es config.js (calibración en un solo
   lugar). Este fallback solo protege si config.js no cargó.
   ============================================================ */
function getMaxAcceptableDistance(wordCount) {
    const C = (typeof root !== 'undefined' && root.PronunciationConfig) ||
              (typeof globalThis !== 'undefined' && globalThis.PronunciationConfig);
    if (C && typeof C.getMaxAcceptableDistance === 'function') return C.getMaxAcceptableDistance(wordCount);
    if (wordCount <= 3) return 0;
    if (wordCount <= 6) return 1;
    return Math.floor(wordCount * 0.2);
}

/* ============================================================
   VALIDACIÓN SEGMENTAL (modo Chino) — spec v4.0 §1 CASO A
   ------------------------------------------------------------
   ¿El carácter escuchado es el mismo fonema que el objetivo?
     · 'same'      → carácter exacto.
     · 'homophone' → OTRO carácter pero MISMA sílaba base
                     (妈/麻 = /ma/): NO es error segmental → el
                     veredicto lo da el ANÁLISIS TONAL (F0+DTW),
                     jamás la inferencia del transcript.
                     Ej. QA #1: objetivo 妈 (mā, 1.er tono), el
                     alumno lo dijo con tono 2 → Whisper oyó 麻
                     (má, misma sílaba /ma/) → se evalúa el TONO
                     real medido → "Sonó como 2.º tono, buscá
                     1.er tono".
     · 'segmental' → sílaba base DISTINTA (四 /si/ vs 是 /shi/):
                     ERROR SEGMENTAL → se reporta PRIMERO y se
                     OMITE el análisis tonal de ese segmento
                     (spec: "reportar Error Segmental y omitir
                     análisis tonal para ese segmento"). QA #2.
     · null        → sin datos de pinyin → no se concluye nada.
   ============================================================ */
const ZH_INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l',
                     'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];

/** 'shi4' → { base: 'shi', tone: '4' } (acepta 'xue', 'ma5', 'lue3'). */
function splitSyllable(p) {
    const m = String(p || '').match(/^([a-zü]+)([0-5])?$/);
    return m ? { base: m[1], tone: m[2] || '' } : { base: '', tone: '' };
}
/** Inicial del pinyin (los dígrafos zh/ch/sh primero — orden importa). */
function initialOf(base) {
    for (let i = 0; i < ZH_INITIALS.length; i++)
        if (base.indexOf(ZH_INITIALS[i]) === 0) return ZH_INITIALS[i];
    return '';
}

function segmentalCompare(targetChar, heardChar, pySyllFn) {
    if (typeof pySyllFn !== 'function') return null;
    if (!targetChar || !heardChar) return null;
    if (heardChar === targetChar) return { kind: 'same' };
    const tp = String(pySyllFn(targetChar) || '');
    const hp = String(pySyllFn(heardChar) || '');
    if (!tp || !hp) return null;                    // sin pinyin confiable
    const T = splitSyllable(tp), H = splitSyllable(hp);
    if (!T.base || !H.base) return null;
    if (T.base === H.base) return { kind: 'homophone', heardPinyin: hp, expectedPinyin: tp };
    const ti = initialOf(T.base), hi = initialOf(H.base);
    if (ti !== hi) {
        return { kind: 'segmental', unit: 'inicial', heard: hi, expected: ti,
                 heardPinyin: hp, expectedPinyin: tp };
    }
    return { kind: 'segmental', unit: 'final',
             heard: H.base.slice(hi.length), expected: T.base.slice(ti.length),
             heardPinyin: hp, expectedPinyin: tp };
}

/* ---------- EXPORT ---------- */
return {
    normalizeText: normalizeText,
    levenshteinWords: levenshteinWords,
    getMaxAcceptableDistance: getMaxAcceptableDistance,
    segmentalCompare: segmentalCompare,
    splitSyllable: splitSyllable,
    initialOf: initialOf
};

});
