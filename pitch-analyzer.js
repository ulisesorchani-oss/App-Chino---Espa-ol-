/* ============================================================
   pitch-analyzer.js — v7.7 Motor de Análisis de TONO (F0 + DTW)
   100 % LOCAL · autocontenido · sin dependencia de Whisper
   ------------------------------------------------------------
   POR QUÉ EXISTE (spec corregida)
     Whisper solo sirve para verificar CONTENIDO ("¿dijo el
     carácter correcto?"). NO mide calidad de pronunciación ni
     tono. Lo que realmente distingue una buena de una mala
     pronunciación en chino es el CONTOUR de pitch (F0) → eso
     se mide acá, con DSP clásico, sin IA y sin red:

     1. extractF0()        → YIN (autocorrelación normalizada)
                             sobre Float32Array 16 kHz mono.
     2. contourToSemis()   → contorno en SEMITONOS relativos a
                             la mediana del hablante (así la voz
                             grave del alumno no se compara injustamente
                             con la locutora de referencia).
     3. dtw()              → Dynamic Time Warping: alinea el
                             contorno del alumno con el de la
                             referencia aunque hablen a distinto ritmo.
     4. classifyTone()     → mapea la forma del contorno a las
                             4 categorías de tono (o neutro).
     5. compare()          → segmenta por carácter y devuelve
                             detected/expected/desviación por carácter.

   REFERENCIA
     El contorno de referencia puede venir de dos fuentes (las
     maneja voice-evaluator.js):
       a) audio TTS de la frase (el MISMO audio 🔊 CN que el
          alumno ya escucha; la voz del alumno JAMÁS viaja),
       b) plantillas canónicas de tono (Chao 55/35/214/51)
          cuando no hay red — ver templateForSequence().
   ============================================================ */
(function (root, factory) {
    /* UMD: navegador (window.PitchAnalyzerModule) + Node (tests) */
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.PitchAnalyzerModule = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

/* ============================================================
   CONFIG — todo el DSP vive acá
   ============================================================ */
const PA_CONFIG = {
    sampleRate: 16000,
    frameSize: 960,       // 60 ms de ventana (mín. 2 períodos de 60 Hz)
    corrWindow: 480,      // W de la función de diferencia YIN (30 ms)
    hopSize: 320,         // 20 ms → 50 contornos por segundo
    fmin: 60,             // Hz — voz humana grave
    fmax: 500,            // Hz — voz aguda / niños
    yinThreshold: 0.15,   // umbral CMND clásico del paper YIN
    yinAbsMax: 0.48,      // por encima de esto el frame es sordo
    frameRmsMin: 0.006,   // puerta de energía por frame (ruido de fondo)
    medianFilter: 5,      // mediana deslizante del F0 (frames impares)
    minVoicedRun: 3,      // runs sonoros más cortos → ruido, se descartan
    minVoicedRatio: 0.12, // spec: "no se detectó voz suficiente" si hay menos
    // Clasificación de tonos (en semitonos relativos a la mediana)
    t4Fall: -1.6,         // caída neta → 4.º tono
    t2Rise: 1.4,          // subida neta → 2.º tono
    t1Flat: 0.9,          // ± de esto → contorno plano
    t1Range: 1.7,         // rango máx del 1.er tono
    t3DipDepth: 1.0,      // profundidad mínima del valle del 3.er tono
    approxDeviation: 2.3  // semitonos: debajo de esto → "tono aprox. correcto"
};

/* ============================================================
   YIN — detección de pitch por frame (de Cheveigné & Kawahara)
   ------------------------------------------------------------
   d(τ)  = Σ (x[j] − x[j+τ])²          función de diferencia
   d'(τ) = d(τ)·τ / Σ_{i≤τ} d(i)       CMND (normalizada 0..1)
   τ*    = primer mínimo local bajo umbral + interpolación parabólica
   ============================================================ */
function yinFrame(buf, offset, cfg) {
    const W = cfg.corrWindow;
    const tauMin = Math.max(2, Math.floor(cfg.sampleRate / cfg.fmax));
    const tauMax = Math.min(cfg.frameSize - W, Math.ceil(cfg.sampleRate / cfg.fmin));
    if (tauMax <= tauMin) return { f0: 0, prob: 0 };

    // energía del frame → puerta de silencio barata
    let energy = 0;
    for (let j = 0; j < W; j++) { const v = buf[offset + j]; energy += v * v; }
    const rms = Math.sqrt(energy / W);
    if (rms < cfg.frameRmsMin) return { f0: 0, prob: 0 };

    // función de diferencia
    const d = new Float32Array(tauMax + 1);
    for (let tau = tauMin; tau <= tauMax; tau++) {
        let sum = 0;
        for (let j = 0; j < W; j++) { const diff = buf[offset + j] - buf[offset + j + tau]; sum += diff * diff; }
        d[tau] = sum;
    }
    // CMND
    const cmnd = new Float32Array(tauMax + 1);
    cmnd[0] = 1;
    let running = 0;
    for (let tau = tauMin; tau <= tauMax; tau++) {
        running += d[tau];
        cmnd[tau] = running > 0 ? d[tau] * (tau - tauMin + 1) / running : 1;
    }
    // primer mínimo local bajo el umbral; si no hay, el global mínimo
    let tauEst = -1, bestVal = Infinity;
    for (let tau = tauMin + 1; tau < tauMax; tau++) {
        if (cmnd[tau] < bestVal) bestVal = cmnd[tau];
        if (cmnd[tau] < cfg.yinThreshold && cmnd[tau] <= cmnd[tau + 1]) { tauEst = tau; break; }
    }
    if (tauEst < 0) {
        if (bestVal > cfg.yinAbsMax) return { f0: 0, prob: bestVal };
        for (let tau = tauMin + 1; tau < tauMax; tau++) if (cmnd[tau] === bestVal) { tauEst = tau; break; }
        if (tauEst < 0) return { f0: 0, prob: 1 };
    }
    // interpolación parabólica alrededor de tauEst (precisión sub-muestra)
    let betterTau = tauEst;
    const x0 = tauEst > tauMin ? tauEst - 1 : tauEst;
    const x2 = tauEst + 1 <= tauMax ? tauEst + 1 : tauEst;
    if (x2 !== x0) {
        const s0 = cmnd[x0], s1 = cmnd[tauEst], s2 = cmnd[x2];
        const denom = 2 * (2 * s1 - s2 - s0);
        if (denom !== 0) betterTau = tauEst + (s2 - s0) / denom;
    }
    return { f0: cfg.sampleRate / betterTau, prob: cmnd[tauEst] };
}

/* ---------- F0 por toda la señal → contorno crudo ---------- */
function extractF0(pcm, sampleRate, opts) {
    const cfg = Object.assign({}, PA_CONFIG, opts || {});
    const sr = sampleRate || cfg.sampleRate;
    const hop = cfg.hopSize, frame = cfg.frameSize;
    const nFrames = Math.max(0, Math.floor((pcm.length - frame) / hop) + 1);
    const f0 = new Float32Array(nFrames);

    for (let i = 0; i < nFrames; i++) {
        const r = yinFrame(pcm, i * hop, cfg);
        f0[i] = r.f0;
    }
    _cleanF0(f0, cfg);           // mediana + runs cortos fuera

    let vCount = 0;
    for (let i = 0; i < nFrames; i++) if (f0[i] > 0) vCount++;
    return {
        f0: f0,
        sr: sr,
        hop: hop,
        voicedRatio: nFrames ? vCount / nFrames : 0,
        voicedFrames: vCount,
        totalFrames: nFrames,
        durationSec: pcm.length / sr
    };
}

/** Mediana deslizante + descarte de runs sonoros muy cortos (espurios). */
function _cleanF0(f0, cfg) {
    const n = f0.length;
    if (!n) return;
    const half = Math.floor(cfg.medianFilter / 2);
    const vals = [];
    for (let i = 0; i < n; i++) {
        vals.length = 0;
        for (let j = Math.max(0, i - half); j <= Math.min(n - 1, i + half); j++) if (f0[j] > 0) vals.push(f0[j]);
        if (f0[i] > 0 && vals.length >= 3) {
            vals.sort(function (a, b) { return a - b; });
            f0[i] = vals[Math.floor(vals.length / 2)]; // mediana solo entre vecinos sonoros
        }
    }
    // runs sonoros de < minVoicedRun frames → ruido
    let run = 0;
    for (let i = 0; i <= n; i++) {
        if (i < n && f0[i] > 0) { run++; continue; }
        if (run > 0 && run < cfg.minVoicedRun) for (let j = i - run; j < i; j++) f0[j] = 0;
        run = 0;
    }
}

/* ============================================================
   SEMITONOS — contorno relativo al HABLANTE (no en Hz absolutos)
   ------------------------------------------------------------
   st = 12·log2(f / f_mediana_del_hablante)
   → la voz grave del alumno y la aguda de la referencia quedan
     en la misma escala; solo importa la FORMA del tono.
   ============================================================ */
function medianOf(vals) {
    const a = Array.prototype.slice.call(vals).sort(function (x, y) { return x - y; });
    return a.length ? a[Math.floor(a.length / 2)] : 0;
}
function percentileOf(vals, p) {
    const a = Array.prototype.slice.call(vals).sort(function (x, y) { return x - y; });
    if (!a.length) return 0;
    const idx = Math.min(a.length - 1, Math.max(0, Math.round((a.length - 1) * p)));
    return a[idx];
}

function contourToSemis(f0Arr) {
    const voicedHz = [];
    for (let i = 0; i < f0Arr.length; i++) if (f0Arr[i] > 0) voicedHz.push(f0Arr[i]);
    const med = medianOf(voicedHz);
    const semis = [], idxs = [];
    if (med > 0) {
        for (let i = 0; i < f0Arr.length; i++) {
            if (f0Arr[i] > 0) {
                semis.push(12 * Math.log(f0Arr[i] / med) / Math.LN2);
                idxs.push(i);
            }
        }
    }
    return { semis: semis, idxs: idxs, medianHz: med };
}

/* ============================================================
   ALINEACIÓN DE REGISTRO — comparar FORMAS, no registros
   ------------------------------------------------------------
   Ambos contornos ya están en semitonos relativos a la mediana
   de SU propio hablante. Igual conviene re-centrar la referencia
   sobre la distribución del alumno y escalar su rango (p90−p10)
   antes del DTW: así una voz aguda/grave o un rango estrecho no
   penalizan — solo importa la forma del tono.
   ============================================================ */
function alignRange(refSemis, studentSemis) {
    if (!refSemis.length || !studentSemis.length) return refSemis.slice();
    const rMed = medianOf(refSemis), sMed = medianOf(studentSemis);
    const rRange = Math.max(0.3, percentileOf(refSemis, 0.9) - percentileOf(refSemis, 0.1));
    const sRange = Math.max(0.3, percentileOf(studentSemis, 0.9) - percentileOf(studentSemis, 0.1));
    // escala acotada: evita amplificar ruido cuando algún lado es casi plano
    const scale = Math.min(2.5, Math.max(0.4, sRange / rRange));
    return refSemis.map(function (v) { return (v - rMed) * scale + sMed; });
}

/* ============================================================
   DTW — alineación temporal de dos contornos (semitonos)
   ------------------------------------------------------------
   Con banda de Sakoe-Chiba (|i−j| ≤ banda) para evitar
   alineaciones absurdas y ahorrar CPU en móviles.
   Costo normalizado = media de |a−b| sobre el camino óptimo.
   ============================================================ */
function dtw(a, b, opts) {
    const n = a.length, m = b.length;
    if (!n || !m) return { path: [], cost: 0 };
    // Banda de Sakoe-Chiba que SIEMPRE garantiza conectividad (0,0)→(n,m):
    // si las longitudes difieren mucho (alumno se comió sílabas, referencia
    // más larga), la banda crece — si son parecidas, queda acotada y rápida.
    const band = Math.max(24, Math.abs(n - m) + Math.ceil(Math.min(n, m) * 0.15));
    const INF = 1e12;
    const cost = [], acc = [];
    for (let i = 0; i <= n; i++) { cost.push(new Float64Array(m + 1)); acc.push(new Float64Array(m + 1).fill(INF)); }
    acc[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        const jLo = Math.max(1, i - band), jHi = Math.min(m, i + band);
        for (let j = jLo; j <= jHi; j++) {
            const c = Math.abs(a[i - 1] - b[j - 1]);
            cost[i][j] = c;
            acc[i][j] = c + Math.min(acc[i - 1][j], acc[i][j - 1], acc[i - 1][j - 1]);
        }
    }
    if (acc[n][m] >= INF) return { path: [], cost: 0 };
    // backtrace
    const path = [];
    let i = n, j = m;
    while (i > 0 && j > 0) {
        path.push([i - 1, j - 1]);
        const best = Math.min(acc[i - 1][j], acc[i][j - 1], acc[i - 1][j - 1]);
        if (best === acc[i - 1][j - 1]) { i--; j--; }
        else if (best === acc[i - 1][j]) i--;
        else j--;
    }
    path.reverse();
    return { path: path, cost: acc[n][m] / path.length };
}

/* ============================================================
   CLASIFICADOR DE TONO — forma del contorno → 1/2/3/4/0
   ------------------------------------------------------------
   Perfil clásico (Chao tone letters, en semitonos):
     1.er tono  55 → plano y alto
     2.º tono   35 → sube
     3.er tono  214 → baja en pico y remonta (o 21 medio-bajo)
     4.º tono   51 → cae fuerte
     neutro     ·  → corto, suave, sin contorno marcado
   ============================================================ */
function classifyTone(seg) {
    const n = seg.length;
    if (n < 3) return { tone: null, conf: 0 };
    const head = Math.max(1, Math.round(n * 0.3));
    const tail = Math.max(1, Math.round(n * 0.3));
    let start = 0, end = 0;
    for (let i = 0; i < head; i++) start += seg[i];
    start /= head;
    for (let i = n - tail; i < n; i++) end += seg[i];
    end /= tail;

    // mínimo del valle (para el 3.er tono)
    let minV = Infinity, minPos = 0, maxV = -Infinity;
    for (let i = 0; i < n; i++) {
        if (seg[i] < minV) { minV = seg[i]; minPos = i / (n - 1); }
        if (seg[i] > maxV) maxV = seg[i];
    }
    const range = percentileOf(seg, 0.9) - percentileOf(seg, 0.1);
    const mean = seg.reduce(function (s, v) { return s + v; }, 0) / n;
    const delta = end - start;

    // 3.er tono: valle en el medio, con profundidad, SIN remontada
    // fuerte (una subida de +2 st ya es un 2.º tono, no un 3.er tono)
    if (minPos > 0.2 && minPos < 0.8 && (start - minV) >= PA_CONFIG.t3DipDepth &&
        end >= minV + 0.6 && (end - start) < 2.2) {
        return { tone: '3', conf: Math.min(1, (start - minV) / 2.2) };
    }
    // 4.º tono: caída neta fuerte
    if (delta <= PA_CONFIG.t4Fall && range >= 1.4) {
        return { tone: '4', conf: Math.min(1, -delta / 3.2) };
    }
    // 2.º tono: subida neta (el mínimo al inicio, no en el medio)
    if (delta >= PA_CONFIG.t2Rise && minPos < 0.5) {
        return { tone: '2', conf: Math.min(1, delta / 3.0) };
    }
    // neutro: MUY corto y sin contorno (antes del 1.er tono: una sílaba
    // breve y plana es 轻声, no un 1.er tono incompleto)
    if (n <= 5 && range < 1.6 && Math.abs(delta) < 1.0) return { tone: '0', conf: 0.4 };
    // 1.er tono: plano y (relativamente) alto
    if (Math.abs(delta) < PA_CONFIG.t1Flat && range < PA_CONFIG.t1Range) {
        if (mean >= -1.2) return { tone: '1', conf: 0.8 };
        return { tone: '3', conf: 0.35 }; // plano MUY grave ≈ medio 3.er tono (21)
    }
    // resto: lo más cercano por pendiente
    if (delta >= 0.45) return { tone: '2', conf: 0.3 };
    if (delta <= -0.45) return { tone: '4', conf: 0.3 };
    return { tone: '1', conf: 0.25 };
}

/* ============================================================
   PLANTILLAS CANÓNICAS — referencia de tono sin audio
   ------------------------------------------------------------
   Si no hay audio TTS disponible (offline 1.ª vez), se compara
   contra el contorno canónico de cada tono esperado
   (valores Chao convertidos a semitonos ~ voz media).
   ============================================================ */
const TONE_TEMPLATES = {
    '1': [4.4, 4.5, 4.5, 4.5, 4.5, 4.4, 4.3, 4.3],
    '2': [-0.8, -0.2, 0.7, 1.6, 2.6, 3.6, 4.3, 4.8],
    '3': [1.6, 0.4, -0.9, -2.1, -2.6, -1.9, -0.9, -0.2],
    '4': [4.6, 3.6, 2.4, 1.1, -0.4, -1.9, -3.1, -4.0],
    '0': [-0.8, -0.5, -0.3, -0.2]
};

function templateFor(tone, nFrames) {
    const t = TONE_TEMPLATES[tone] || TONE_TEMPLATES['1'];
    const out = [];
    for (let i = 0; i < nFrames; i++) {
        const x = i / Math.max(1, nFrames - 1) * (t.length - 1);
        const i0 = Math.floor(x), i1 = Math.min(t.length - 1, i0 + 1);
        out.push(t[i0] + (t[i1] - t[i0]) * (x - i0)); // interpolación lineal
    }
    return out;
}

/** Contorno de referencia sintético para una secuencia de tonos
 *  esperados. Devuelve { semis, boundaries } (índices donde empieza
 *  cada carácter, para segmentar y dibujar). */
function templateForSequence(expectedTones, framesPerChar) {
    const fpc = framesPerChar || 8;
    const semis = [], boundaries = [];
    for (let k = 0; k < expectedTones.length; k++) {
        boundaries.push(semis.length);
        const t = templateFor(expectedTones[k] || '1', fpc);
        for (let i = 0; i < t.length; i++) semis.push(t[i]);
    }
    return { semis: semis, boundaries: boundaries };
}

/* ---------- recorte robusto de bordes: el núcleo del segmento ----------
   Las transiciones (remontada final del 3.er tono, salto a la sílaba
   siguiente, ataque de la primera) viven en los BORDES del segmento
   y contaminan la clasificación. Recorto progresivamente hasta frac
   del total, siempre el extremo más alejado de la mediana: el núcleo
   del contorno queda intacto y las plantillas no cambian (son suaves). */
function trimEnds(seg, frac) {
    const arr = seg.slice();
    let budget = Math.floor(arr.length * (frac || 0.25));
    while (budget > 0 && arr.length > 4) {
        const med = medianOf(arr);
        const headDev = Math.abs(arr[0] - med);
        const tailDev = Math.abs(arr[arr.length - 1] - med);
        if (headDev >= tailDev) arr.shift(); else arr.pop();
        budget--;
    }
    return arr;
}

/* ============================================================
   COMPARACIÓN ALUMNO ↔ REFERENCIA, POR CARÁCTER
   ------------------------------------------------------------
   1. DTW global (contorno alumno vs contorno referencia).
   2. La referencia se corta en N grupos (un grupo por carácter
      — las sílabas chinas duran aproximadamente lo mismo).
   3. Cada grupo arrastra los frames del alumno alineados por el
      camino de DTW → segmento por carácter.
   4. Por carácter: clasifico el tono del alumno, la desviación
      media en semitonos contra la referencia y el estado.
   ============================================================ */
function compare(studentContour, refContour, nChars, expectedTones) {
    const S = studentContour, R = alignRange(refContour, studentContour);
    if (!S.length || !R.length || !nChars) {
        return { chars: [], alignmentCost: 0 };
    }
    const al = dtw(S, R);
    const chars = [];
    const m = R.length;

    // límites de cada grupo de referencia (para segmentar y dibujar)
    const refBounds = [];
    for (let k = 0; k < nChars; k++) refBounds.push(Math.floor(k / nChars * m));

    // bucket de cada frame de referencia → carácter
    const bucketOf = function (ri) {
        return Math.min(nChars - 1, Math.floor(ri / m * nChars));
    };

    // si → TODOS los ri a los que el camino de DTW lo mapea
    const siMap = new Map();
    for (let p = 0; p < al.path.length; p++) {
        const si = al.path[p][0], ri = al.path[p][1];
        if (!siMap.has(si)) siMap.set(si, []);
        siMap.get(si).push(ri);
    }

    // Segmento por carácter: frames del alumno cuyo mapeo cae SOLO
    // dentro del grupo (los "frontera" — ej. remontada final del
    // 3.er tono + transición a la sílaba siguiente, que DTW mapea a
    // ambos grupos — se excluyen para no contaminar la clasificación;
    // sí cuentan para la desviación, que es más tolerante).
    const framesPerChar = new Array(nChars);
    for (let k = 0; k < nChars; k++) framesPerChar[k] = [];
    siMap.forEach(function (ris, si) {
        let minK = nChars, maxK = 0;
        for (let q = 0; q < ris.length; q++) {
            const b = bucketOf(ris[q]);
            if (b < minK) minK = b;
            if (b > maxK) maxK = b;
        }
        if (minK === maxK) framesPerChar[minK].push(si);
    });
    // fallback: grupo sin frames limpios → acepta frames frontera
    for (let k = 0; k < nChars; k++) {
        if (framesPerChar[k].length) continue;
        siMap.forEach(function (ris, si) {
            for (let q = 0; q < ris.length; q++) {
                if (bucketOf(ris[q]) === k) { framesPerChar[k].push(si); break; }
            }
        });
    }
    for (let k = 0; k < nChars; k++) framesPerChar[k].sort(function (a, b) { return a - b; });

    for (let k = 0; k < nChars; k++) {
        const rawSeg = framesPerChar[k].map(function (i) { return S[i]; });
        const studentSeg = trimEnds(rawSeg, 0.25); // núcleo sin transiciones
        const det = classifyTone(studentSeg);
        // desviación media alumno↔referencia dentro del carácter
        let dev = 0, pairs = 0;
        for (let p = 0; p < al.path.length; p++) {
            if (bucketOf(al.path[p][1]) === k) {
                dev += Math.abs(S[al.path[p][0]] - R[al.path[p][1]]); pairs++;
            }
        }
        dev = pairs ? dev / pairs : 0;
        const expected = (expectedTones && expectedTones[k]) || null;
        let status = 'nodata';
        if (rawSeg.length >= 3 && det.tone) {
            if (expected && det.tone === expected) status = 'ok';
            else if (dev < PA_CONFIG.approxDeviation) status = 'approx';
            else status = 'wrong';
        }
        chars.push({
            index: k,
            expected: expected,
            detected: det.tone,
            conf: det.conf,
            deviation: Math.round(dev * 100) / 100,
            frames: framesPerChar[k],
            refStart: refBounds[k],
            refEnd: (k + 1 < nChars ? refBounds[k + 1] : m),
            status: status
        });
    }
    return { chars: chars, alignmentCost: Math.round(al.cost * 100) / 100 };
}

/* ============================================================
   EXPORT
   ============================================================ */
return {
    CONFIG: PA_CONFIG,
    extractF0: extractF0,
    contourToSemis: contourToSemis,
    classifyTone: classifyTone,
    trimEnds: trimEnds,
    dtw: dtw,
    compare: compare,
    alignRange: alignRange,
    templateFor: templateFor,
    templateForSequence: templateForSequence,
    medianOf: medianOf,
    percentileOf: percentileOf,
    TONE_TEMPLATES: TONE_TEMPLATES
};

});
