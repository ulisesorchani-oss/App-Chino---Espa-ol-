// ============================================================
// karaoke.js — Karaoke de lectura
// ============================================================
// Extraído de app.js (fase 11 de modularización, 2026-09-24): el
// resaltado de caracteres al ritmo del audio (estilo Du Chinese,
// desactivado por defecto). Es un módulo puro (sin variables/funciones
// sueltas más allá del propio KARA): const KARA = (function(){...})()
// que expone prepare/withAudio/withTts/stop/on. Cero dependencias
// externas — lo usan reader.js/classics-reader.js/lessons-graduated.js.
//
// Es un script clásico (sin import/export): se carga en index.html
// después de app.js pero ANTES de classics-reader.js y
// lessons-graduated.js (que llaman a KARA en tiempo de ejecución).
// ============================================================

// ═══════════════════════════════════════════════════════════════════
// v9.4 — KARAOKE DE LECTURA (estilo Du Chinese, DESACTIVADO por defecto)
// -------------------------------------------------------------------
// Al escuchar una línea del lector (lecciones o clásicos), los caracteres
// se van iluminando con un "marcador" ámbar al ritmo del audio. Se activa
// con el botón ✨ Karaoke del lector (persistente 'ac_karaoke').
//  · Audio del API (blob): progreso currentTime/duration (RAF) — el
//    playbackRate no afecta: currentTime recorre el medio completo.
//  · Voz del sistema (fallback): onboundary (charIndex → span) y, si el
//    navegador no dispara boundary (Safari a veces), temporizador estimado
//    (≈215 ms/carácter ponderado, ajustado por la velocidad elegida).
// v9.5 — RESALTADO POR PALABRA COMPLETA (pedido del usuario): los spans
//  se agrupan en palabras con Intl.Segmenter('zh', {granularity:'word'})
//  y el marcador enciende la palabra ENTERA apenas llega a su primer
//  carácter (los tres motores calculan un índice de carácter; un mapa
//  endSpan[car] → último span de su palabra lo expande a la palabra).
//  Sin Intl.Segmenter (Firefox < 125) cae al modo por carácter de v9.4.
//  Los spans siguen siendo .lq-ch por carácter: el toque LingQ (ficha
//  de cada carácter) queda intacto.
// v9.6 — SINCRONIZACIÓN REAL (fix "el karaoke va más lento que la voz"):
//  1) Línea de tiempo PONDERADA: la puntuación (，。！？…) consume audio
//     pero no tiene span → su pausa se cobra ANTES del span siguiente y
//     el marcador espera la pausa en vez de correr por delante/detrás.
//  2) RECORTE DE SILENCIO: el WAV del TTS trae ~0.1-0.5 s inicial y hasta
//     ~1 s final de silencio; se decodifica el blob (WebAudio + RMS en
//     ventanas de 10 ms) y el progreso se mapea sobre la ventana real de
//     habla [t0,t1], no sobre el medio completo. Fallback: mapeo viejo.
//  3) VOZ DEL SISTEMA recalibrada: 290→215 ms/car (voces zh reales ≈
//     4.5-5.5 car/s), reloj anclado al evento 'start' (fuera la latencia
//     de arranque de la voz) y anticipación de 80 ms (mejor 1 pelo
//     adelante que atrás).
//  4) duration = Infinity (quirk de Chrome con algunos WAV): reloj propio
//     × playbackRate para que el resaltado nunca quede muerto.
// v9.7x — TIMESTAMPS REALES (karaoke del Lector + upgrade general):
//  api/index.py ahora puede devolver boundaries reales de edge-tts
//  ([{text, offsetMs, durMs}], WordBoundary nativo de la librería) cuando
//  el caller pidió `karaoke:true`. withAudio(audio, text, boundaries)
//  usa esos timestamps de punta a punta si vienen y se pudieron ubicar
//  en el texto (buildBoundaryMap) — nada de línea de tiempo ponderada ni
//  recorte de silencio por RMS, innecesarios con datos reales. Si no
//  vienen (Piper, español, caché vieja, o el matching falla), cae
//  intacto al modo estimado de siempre — cero regresión.
// API: prepare(line) → withAudio(audio, text, boundaries?) | withTts(u, text, rate) → stop().
const KARA = (function () {
    'use strict';
    const RE_HAN = /[\u3400-\u9FFF\uF900-\uFAFF]/;
    // v9.6 RECALIBRADO: las voces zh reales (API y sistema) hablan ~4.5-5.5
    // car/s a 1x (≈180-220 ms/carácter). Con 290 ms el estimado quedaba
    // ATRASADO de forma acumulativa → "el karaoke va más lento que la voz".
    const MS_PER_CHAR = 215;
    const MS_LEAD = 80;      // anticipación perceptual: mejor 1 pelo adelante que atrás
    const W_COMMA = 1.6;     // ，、：； → pausa corta (en equivalentes de carácter)
    const W_STOP = 2.6;      // 。！？…— → pausa larga
    const W_OTHER = 0.5;     // espacios / latino / otros
    let act = null;          // { line, spans, endSpan, raf, timer }
    let acShared = null;     // AudioContext perezoso (recorte de silencio)

    function on() {
        try { return localStorage.getItem('ac_karaoke') === '1'; } catch (e) { return false; }
    }
    function spansOf(line) {
        return line ? Array.prototype.slice.call(line.querySelectorAll('.lq-ch')) : [];
    }
    function paint(spans, upto) {
        for (let i = 0; i < spans.length; i++) spans[i].classList.toggle('k-on', i <= upto);
    }
    // v9.5: mapa palabra→spans. endSpan[c] = índice del ÚLTIMO span de la
    // palabra que contiene al carácter c. Null = modo por carácter.
    function buildWordEnd(spans) {
        let seg = null;
        try {
            if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                seg = new Intl.Segmenter('zh', { granularity: 'word' });
            }
        } catch (e) { seg = null; }
        if (!seg || spans.length < 2) return null;
        let text = '';
        for (let i = 0; i < spans.length; i++) {
            text += spans[i].getAttribute('data-ch') || spans[i].textContent || '';
        }
        if (!text) return null;
        const n = spans.length;
        const endSpan = new Array(n);
        try {
            for (const s of seg.segment(text)) {
                const from = s.index;
                const len = String(s.segment || '').length; // unidades UTF-16 (los spans son BMP)
                let to = from + len - 1;
                if (from >= n) break;
                if (to >= n) to = n - 1;
                if (s.isWordLike === false) {          // puntuación/símbolo → carácter suelto
                    for (let c = from; c <= to; c++) endSpan[c] = c;
                } else {                               // palabra entera → todos apuntan a su final
                    for (let c = from; c <= to; c++) endSpan[c] = to;
                }
            }
            for (let c = 0; c < n; c++) if (endSpan[c] === undefined) endSpan[c] = c;
            return endSpan;
        } catch (e) { return null; }
    }
    // índice de carácter → hasta qué span pintar (fin de su palabra)
    function spanUptoFor(ci) {
        if (!act || !act.endSpan) return ci; // sin Segmenter: por carácter (v9.4)
        const e = act.endSpan[Math.max(0, Math.min(act.endSpan.length - 1, ci))];
        return (e === undefined || e < 0) ? ci : e;
    }
    // ── v9.6: LÍNEA DE TIEMPO PONDERADA ──────────────────────────────
    // El texto leído tiene pausas (puntuación) que consumen audio pero no
    // tienen span propio. starts[i] = peso acumulado ANTES del span i; cada
    // pausa se cobra ANTES del span siguiente → el marcador ESPERA durante
    // la pausa en vez de seguir avanzando. total = peso de toda la línea.
    function pauseWeight(ch) {
        if (/[,\uff0c\u3001\uff1a\uff1b;]/.test(ch)) return W_COMMA;
        if (/[.\u3002\uff01\uff1f!?\u2026\u2014\u2013\u00b7]/.test(ch)) return W_STOP;
        return W_OTHER;
    }
    function buildTimeline(text, n) {
        const starts = new Array(n);
        let acc = 0, si = 0, i = 0;
        const src = String(text == null ? '' : text);
        while (i < src.length && si < n) {
            const ch = src[i];
            if (RE_HAN.test(ch)) { starts[si++] = acc; acc += 1; }
            else acc += pauseWeight(ch);
            i += 1;
        }
        while (si < n) { starts[si++] = acc; acc += 1; } // spans sin texto → evenos
        for (let k = 0; k < n; k++) if (typeof starts[k] !== 'number') starts[k] = k;
        return { starts: starts, total: Math.max(1, acc) };
    }
    // progreso p∈[0,1] → índice del span que suena (mayor i con starts[i] <= p·total)
    function idxAt(tl, p) {
        const target = p * tl.total;
        let lo = 0, hi = tl.starts.length - 1, res = 0;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (tl.starts[mid] <= target) { res = mid; lo = mid + 1; } else hi = mid - 1;
        }
        return res;
    }
    // ── v9.7x: TIMESTAMPS REALES (WordBoundary de edge-tts) ──────────
    // boundaries llega en el ORDEN en que edge-tts fue leyendo el texto;
    // b.text es el token tal cual lo separó el motor (no necesariamente
    // 1 palabra china = 1 boundary, puede incluir puntuación pegada).
    // Se ubica cada boundary en `text` con indexOf secuencial (cursor
    // que solo avanza) para no confundir apariciones repetidas de la
    // misma palabra, y se mapea el final de cada boundary al último
    // span de carácter Han que cubre — así el "upto" ya viene resuelto
    // por el propio motor de síntesis, sin adivinar con Intl.Segmenter.
    function buildBoundaryMap(text, boundaries) {
        if (!boundaries || !boundaries.length) return null;
        const src = String(text == null ? '' : text);
        const hanziIdx = [];
        for (let i = 0; i < src.length; i++) if (RE_HAN.test(src[i])) hanziIdx.push(i);
        if (!hanziIdx.length) return null;
        const marks = [];
        let cursor = 0;
        for (let bi = 0; bi < boundaries.length; bi++) {
            const b = boundaries[bi];
            const t = String((b && b.text) || '');
            if (!t) continue;
            let at = src.indexOf(t, cursor);
            if (at === -1) at = src.indexOf(t); // red de contención: el orden no matcheó, buscar igual
            if (at === -1) continue;            // no se pudo ubicar este boundary puntual → se salta
            const end = at + t.length - 1;
            cursor = at + t.length;
            let upto = -1;
            for (let k = 0; k < hanziIdx.length; k++) {
                if (hanziIdx[k] <= end) upto = k; else break;
            }
            if (upto === -1) continue; // boundary sin ningún hanzi (puntuación suelta)
            marks.push({ atMs: Number(b.offsetMs) || 0, upto: upto });
        }
        return marks.length ? marks : null;
    }
    // ms transcurridos → índice del span que suena (mayor mark con atMs <= ms)
    function idxAtReal(marks, ms) {
        let lo = 0, hi = marks.length - 1, res = 0;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (marks[mid].atMs <= ms) { res = mid; lo = mid + 1; } else hi = mid - 1;
        }
        return marks[res].upto;
    }
    function stop() {
        if (!act) return;
        if (act.raf) cancelAnimationFrame(act.raf);
        if (act.timer) clearInterval(act.timer);
        act.spans.forEach(sp => sp.classList.remove('k-on'));
        if (act.line) act.line.classList.remove('kara-active');
        act = null;
    }
    // Registra la línea que va a sonar. No-op si el karaoke está OFF o la
    // línea no tiene spans de caracteres (ej.: botón 🔊 de la práctica).
    function prepare(line) {
        if (!on()) return null;
        stop();
        const spans = spansOf(line);
        if (!spans.length) return null;
        act = { line: line, spans: spans, endSpan: buildWordEnd(spans), raf: 0, timer: 0 };
        line.classList.add('kara-active');
        return act;
    }
    // ── v9.6: RECORTE DEL SILENCIO DE PUNTA A PUNTA ──────────────────
    // El WAV del TTS trae ~0.1-0.5 s de silencio inicial y hasta ~1 s final.
    // Repartirlos linealmente atrasaba el marcador respecto de la voz:
    // decodificamos el blob y ubicamos la ventana real de habla [t0, t1].
    function ensureCtx() {
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            if (!acShared) acShared = new AC();
            if (acShared.state === 'suspended') { try { acShared.resume(); } catch (e) { } }
            return acShared;
        } catch (e) { return null; }
    }
    async function detectSpeechWindow(src) {
        try {
            if (!src) return null;
            const resp = await fetch(src);
            const buf = await resp.arrayBuffer();
            const ctx = ensureCtx();
            if (!ctx) return null;
            const ab = await new Promise((res, rej) => {
                try { ctx.decodeAudioData(buf, res, rej); } catch (e) { rej(e); }
            });
            const ch0 = ab.getChannelData(0);
            const sr = ab.sampleRate || 16000;
            const step = Math.max(1, Math.floor(sr * 0.01)); // ventanas de 10 ms
            const nW = Math.floor(ch0.length / step);
            if (nW < 8) return null;
            const half = Math.max(1, step >> 1);
            const rms = new Float32Array(nW);
            let peak = 0;
            for (let w = 0; w < nW; w++) {
                let s = 0;
                const off = w * step;
                for (let k = 0; k < half; k++) { const v = ch0[off + k] || 0; s += v * v; }
                rms[w] = Math.sqrt(s / half);
                if (rms[w] > peak) peak = rms[w];
            }
            if (peak <= 0.0005) return null;
            const th = Math.max(peak * 0.04, 0.0035);
            let a = 0, b = nW - 1;
            while (a < nW && rms[a] < th) a++;
            while (b > a && rms[b] < th) b--;
            if (a >= b) return null;
            const t0 = Math.max(0, (a * step) / sr - 0.02);
            const t1 = Math.min(ab.duration, ((b + 1) * step) / sr + 0.02);
            if (t1 - t0 < 0.25 || (t1 - t0) < ab.duration * 0.35) return null; // dudoso → no recortar
            return { t0: t0, t1: t1 };
        } catch (e) { return null; }
    }
    // Variante A: audio del API. v9.7x: si llegaron boundaries reales y se
    // pudieron ubicar en el texto, se usan de punta a punta (currentTime en
    // ms comparado directo contra offsetMs — el propio motor de síntesis ya
    // da la posición exacta, sin estimar nada). Si no, cae al modo v9.6 de
    // siempre: progreso sobre la VENTANA DE HABLA (recorte de silencio por
    // RMS) + línea de tiempo ponderada por puntuación.
    function withAudio(audio, text, boundaries) {
        if (!act || !audio) return;
        const n = act.spans.length;
        const marks = buildBoundaryMap(text, boundaries);
        const tl = marks ? null : buildTimeline(text, n);
        let finished = false;
        let win = null;   // { t0, t1 } ventana de habla real (solo modo estimado)
        let t0wall = 0;   // reloj propio si duration = Infinity/NaN (solo modo estimado)
        const done = () => {
            if (finished || !act) return;
            finished = true;
            if (act.raf) cancelAnimationFrame(act.raf);
            paint(act.spans, n - 1);        // destello final: línea iluminada
            setTimeout(stop, 450);
        };
        const tick = () => {
            if (!act || finished) return;
            if (marks) {
                paint(act.spans, idxAtReal(marks, audio.currentTime * 1000));
                act.raf = requestAnimationFrame(tick);
                return;
            }
            const d = audio.duration;
            if (isFinite(d) && d > 0) {
                const t = audio.currentTime;
                let p;
                if (win && win.t1 > win.t0) p = (t - win.t0) / (win.t1 - win.t0);
                else p = t / d;
                p = Math.max(0, Math.min(1, p));
                paint(act.spans, spanUptoFor(idxAt(tl, p)));
            } else {
                // WAV sin duración (quirk de Chrome): reloj propio × playbackRate
                if (!t0wall) t0wall = performance.now();
                const media = ((performance.now() - t0wall) / 1000) * (audio.playbackRate || 1);
                const est = (tl.total * MS_PER_CHAR) / 1000; // duración estimada del medio
                const p = Math.max(0, Math.min(1, media / est));
                paint(act.spans, spanUptoFor(idxAt(tl, p)));
            }
            act.raf = requestAnimationFrame(tick);
        };
        act.raf = requestAnimationFrame(tick);
        audio.addEventListener('ended', done, { once: true });
        audio.addEventListener('error', done, { once: true });
        if (!marks) {
            detectSpeechWindow(audio.src).then(function (w) {
                if (act && !finished && w) win = w;
            }).catch(function () { });
        }
    }
    // Variante B: voz del sistema → boundary si existe; si no, estimado.
    // v9.6: el reloj arranca con el evento 'start' (antes contaba desde
    // speak(), sumando 0.2-0.6 s de latencia de la voz → atraso inicial),
    // la estimación usa la línea ponderada y va 80 ms adelantada.
    function withTts(u, text, rate) {
        if (!act || !u) return;
        const n = act.spans.length;
        const rateN = (typeof rate === 'number' && rate > 0) ? rate : 1;
        const tl = buildTimeline(text, n);
        const hanziIdx = [];
        let i = 0;
        const src = String(text == null ? '' : text);
        for (const ch of src) { if (RE_HAN.test(ch)) hanziIdx.push(i); i++; }
        let boundaryMode = false, finished = false, elapsed = 0, wall = 0, started = false;
        const estMs = Math.max(1200, (tl.total * MS_PER_CHAR) / rateN);
        const done = () => {
            if (finished || !act) return;
            finished = true;
            if (act.timer) clearInterval(act.timer);
            paint(act.spans, n - 1);
            setTimeout(stop, 450);
        };
        u.addEventListener('start', () => { started = true; elapsed = 0; });
        u.addEventListener('boundary', (ev) => {
            if (!act || finished) return;
            boundaryMode = true;
            if (act.timer) { clearInterval(act.timer); act.timer = 0; }
            const c = (ev && ev.charIndex) || 0;
            let j = 0;
            while (j < hanziIdx.length && hanziIdx[j] <= c) j++;
            paint(act.spans, spanUptoFor(Math.max(0, Math.min(n - 1, j - 1)))); // v9.5: palabra entera
        });
        u.addEventListener('end', done);
        u.addEventListener('error', done);
        act.timer = setInterval(() => { // estimación ponderada (cede ante boundary)
            if (!act || finished) { if (act && act.timer) clearInterval(act.timer); return; }
            if (boundaryMode) { if (act.timer) { clearInterval(act.timer); act.timer = 0; } return; }
            wall += 100;
            if (!started && wall >= 800) started = true; // seguro: alguna voz no dispara 'start'
            if (!started) return;
            elapsed += 100;
            const p = Math.max(0, Math.min(1, (elapsed - MS_LEAD) / estMs));
            paint(act.spans, spanUptoFor(idxAt(tl, p)));
        }, 100);
    }
    return { prepare: prepare, withAudio: withAudio, withTts: withTts, stop: stop, on: on };
})();
