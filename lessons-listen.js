// ============================================================
// lessons-listen.js — «▶️ Escuchar todo» en las lecciones de aprendo chino
// ------------------------------------------------------------
// Un botón a ancho completo ARRIBA del texto (vista Leer de lessons-graduated.js; no en lecturas) que lee la
// lección entera, línea por línea, con el patrón del Lector (reader.js) aplicado por línea:
//   · UN solo <audio> reutilizado (src cambiante) y una promesa por línea (nunca se pide dos veces);
//   · precarga de UNA línea (N+1) apenas arranca N; si la siguiente no llegó se muestra «⏳» y se espera;
//   · UN solo reintento por línea (~0,8-1,2 s después) y, si también falla, voz del sistema para esa línea;
//   · si la última línea ya falló no se precarga la siguiente (solo la que toca) y, tras 2 seguidas fallidas, CORTE DE CIRCUITO: el resto de la lección va con la voz del sistema, sin
//     pedir nada más al servidor, y un aviso en la barra lo explica;
//   · la línea resaltada avanza SOLO cuando el audio de la anterior terminó de verdad y el de la nueva empezó a sonar
//     (un error del <audio> o de la voz del sistema no hace correr la marca);
//   · con la voz del sistema se resalta la LÍNEA, nunca palabra por palabra (sin karaoke: ahí los tiempos no son fiables);
//   · token de cancelación, blob URLs liberadas, estado idle | playing | paused (+ «⏳» mientras espera);
//   · tras un 429 la precarga se pausa 5 s (no se insiste); la línea que suena se pide igual, una sola vez.
// Texto = data-zh del 🔊 de cada línea (sin las etiquetas `who`, en 简/繁 según la lección); voz = voiceZhFor(lección);
// velocidad = la actual (si cambia a mitad, rige desde la línea siguiente y se descartan las precargadas).
// Pedido por GET cacheable (≤160 caracteres, como el 🔊 por línea): SIN karaoke=1 → misma caché que cada 🔊.
// Resalta la línea que suena (`is-playing`, scroll suave salvo que el usuario haya scrolleado a mano hace < 3 s)
// y, si el karaoke está encendido, usa el KARA existente.
// Cortes: cerrar la ventana (#lq-close, Atrás, Esc, fondo), abrir Practicar/quiz, tocar el 🔊 de una línea,
// cambiar 简/繁 (ac-script-change). Observadores ACOTADOS (sin subtree): uno de atributos en #lesson-pop y uno de
// hijos directos en #lq-body (para poner el botón cuando se arma la vista Leer); window.LQ_LISTEN.stats cuenta cuántas veces disparan.
// Script clásico. No toca SRS, checkAnswer ni la lógica de lecciones; lo único que lee de lessons-graduated.js es LQ_UI / LQ_TEXT.
// ============================================================
(function lessonsListenInit() {
    'use strict';
    const AHEAD = 1;            // precarga: solo N+1
    const RETRY_MS = 800;       // un reintento silencioso, a los RETRY_MS (+ hasta RETRY_JITTER_MS al azar)
    const RETRY_JITTER_MS = 400;
    const CIRCUIT_AFTER = 2;    // líneas seguidas fallidas que cortan el circuito
    const SPEECH_START_MS = 5000; // la voz del sistema que no arranca en este tiempo se da por muda
    const BACKOFF_MS = 5000;    // tras un 429, la precarga espera
    const MANUAL_SCROLL_MS = 3000;
    const FETCH_TIMEOUT = 14000; // el servidor ya reintenta por su cuenta (hasta ~12 s)
    const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

    const stats = { body: 0, pop: 0, injected: 0, requests: 0, tripped: 0, stops: {} };
    const L = {
        state: 'idle', tok: 0, lesson: null, lines: [], idx: -1, cache: new Map(), audio: null,
        speed: 1, backoffUntil: 0, lastManual: 0, waiting: false, resume: null, tts: null, vz: 'f', lang: 'zh-CN',
        fails: 0, tripped: false, reported: 0, settled: new Map()
    };
    const $ = (id) => document.getElementById(id);
    const UI = () => window.LQ_UI;
    const speedNow = () => (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
    const isGradedStory = () => {
        const u = UI(); if (!u) return false;
        const s = u.state;
        return !!s && s.view === 'story' && !!s.lesson && s.lesson.kind !== 'reading' && Array.isArray(s.lesson.lines);
    };

    // ───────────── iconos: solo si el dispositivo tiene la fuente; si no, solo texto ─────────────
    // Un carácter sin glifo se dibuja como el «tofu» (□) o en blanco: se compara su dibujo en un <canvas> con el de U+FFFF (tofu garantizado)
    // y con el vacío. Si no se puede dibujar (sin canvas), se dejan los iconos de siempre.
    const ICON_CHARS = { play: '▶️', pause: '⏸', resume: '▶', stop: '⏹', wait: '⏳' };
    const ICON_ALT = { wait: '…' }; // lo que va en lugar del icono si falta (el resto queda en texto solo)
    let ICONS = null; // { play, pause, resume, stop, wait } → icono o '' (solo texto)
    function glyphSig(ch) {
        const c = document.createElement('canvas'); c.width = 40; c.height = 40;
        const x = c.getContext('2d'); if (!x) return null;
        x.textBaseline = 'top'; x.fillStyle = '#000';
        x.font = '28px sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"';
        x.fillText(ch, 4, 4);
        const d = x.getImageData(0, 0, 40, 40).data; let h = 0;
        for (let i = 0; i < d.length; i += 4) h = (h * 31 + d[i + 3] + d[i] * 7) | 0;
        return h;
    }
    function hasGlyph(ch) {
        try {
            const a = glyphSig(ch); if (a === null) return true;
            return a !== glyphSig('\uFFFF') && a !== glyphSig('');
        } catch (e) { return true; }
    }
    function icons() {
        if (ICONS) return ICONS;
        ICONS = {};
        Object.keys(ICON_CHARS).forEach((k) => { ICONS[k] = hasGlyph(ICON_CHARS[k].replace(/\uFE0F/g, '')) ? ICON_CHARS[k] : (ICON_ALT[k] || ''); });
        return ICONS;
    }
    const withIcon = (k, text) => { const i = icons()[k]; return i ? i + ' ' + text : text; };

    const NOTE_TRIPPED = 'No llega la voz del servidor: sigo leyendo con la voz del sistema (suena más robótica).';

    // ───────────── botón (reposo | sonando) ─────────────
    function barHtml() {
        if (L.state === 'idle') return '<button type="button" class="lq-btn lq-primary ll-main" id="ll-play">' + withIcon('play', 'Escuchar todo') + '</button>';
        const wait = L.waiting ? (icons().wait ? icons().wait + ' ' : '') : '';
        const pausa = L.state === 'paused' ? withIcon('resume', 'Seguir') : withIcon('pause', 'Pausar');
        return '<button type="button" class="lq-btn lq-ghost ll-half" id="ll-pause">' + wait + pausa + '</button>' +
            '<button type="button" class="lq-btn lq-ghost ll-half" id="ll-stop">' + withIcon('stop', 'Parar') + '</button>' +
            (L.tripped ? '<p class="ll-note" id="ll-note" role="status">' + NOTE_TRIPPED + '</p>' : '');
    }
    function renderBar() {
        const bar = $('ll-bar');
        if (!bar) return;
        bar.className = 'll-bar' + (L.state === 'idle' ? '' : ' is-on');
        bar.innerHTML = barHtml();
        const p = $('ll-play'), pa = $('ll-pause'), st = $('ll-stop');
        if (p) p.addEventListener('click', start);
        if (pa) pa.addEventListener('click', togglePause);
        if (st) st.addEventListener('click', () => stopAll('boton'));
    }
    function inject() {
        const body = UI().els.body, lines = body.querySelector('.lq-lines');
        if (!lines || $('ll-bar')) return;
        const bar = document.createElement('div');
        bar.id = 'll-bar'; bar.className = 'll-bar';
        lines.parentNode.insertBefore(bar, lines);
        stats.injected++;
        renderBar();
    }

    // ───────────── pedido de una línea (con precarga) ─────────────
    function b64ToUrl(data) {
        const bin = atob(data.audio), bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
    }
    async function fetchOnce(text, tok) {
        stats.requests++;
        // silent: el aviso rojo global no sale; «Escuchar todo» tiene el suyo (corte de circuito)
        const resp = await fetchTTS(ttsBody(text, L.lang, L.vz), FETCH_TIMEOUT, { silent: true }); // sin karaoke: GET cacheable, misma caché que el 🔊
        if (resp && resp.status === 429) { const e = new Error('429'); e.code = 429; throw e; }
        if (!resp || !resp.ok) throw new Error('TTS http ' + (resp && resp.status));
        const data = await resp.json();
        if (!data || !data.audio) throw new Error('TTS sin audio');
        return { url: b64ToUrl(data), data: data, error: null };
    }
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    // Cuenta, EN ORDEN de línea, las que fallaron (después de su único reintento). 2 seguidas → se corta el circuito.
    function settle(i, failed, tok) {
        if (tok !== L.tok || L.tripped) return;
        L.settled.set(i, failed);
        while (L.settled.has(L.reported)) {
            const f = L.settled.get(L.reported); L.settled.delete(L.reported); L.reported++;
            L.fails = f ? L.fails + 1 : 0;
            if (L.fails >= CIRCUIT_AFTER) { trip(); return; }
        }
    }
    function trip() {
        L.tripped = true; stats.tripped++;
        Array.from(L.cache.keys()).forEach((k) => { if (k > L.idx) dropEntry(k); }); // lo que venía en camino ya no se usa
        renderBar();
    }
    function entryFor(i) {
        let e = L.cache.get(i);
        if (e) return e;
        const speed = speedNow(), tok = L.tok, text = L.lines[i].text;
        const p = (async () => {
            try { return await fetchOnce(text, tok); }
            catch (err) {
                if (err && err.code === 429) { L.backoffUntil = Date.now() + BACKOFF_MS; return { url: null, data: null, error: err }; } // no se insiste
                await wait(RETRY_MS + Math.random() * RETRY_JITTER_MS); // UN reintento silencioso
                if (tok !== L.tok || L.tripped) return { url: null, data: null, error: err };
                try { return await fetchOnce(text, tok); }
                catch (err2) {
                    if (err2 && err2.code === 429) L.backoffUntil = Date.now() + BACKOFF_MS;
                    return { url: null, data: null, error: err2 };
                }
            }
        })();
        e = { p: p, speed: speed, ready: false, entry: null, dropped: false };
        p.then((v) => {
            e.ready = true; e.entry = v;
            if (tok !== L.tok && v && v.url) { try { URL.revokeObjectURL(v.url); } catch (x) { /* ya */ } return; }
            if (!e.dropped) settle(i, !v || !!v.error || !v.url, tok);
        });
        L.cache.set(i, e);
        return e;
    }
    function dropEntry(i) {
        const e = L.cache.get(i); if (!e) return;
        e.dropped = true;
        L.cache.delete(i);
        e.p.then((v) => { if (v && v.url) { try { URL.revokeObjectURL(v.url); } catch (x) { /* ya */ } } });
    }
    function preload(cur) {
        if (L.tripped || Date.now() < L.backoffUntil) return; // tras un 429 la precarga espera 5 s; con el circuito cortado no se pide nada
        if (L.fails > 0) return; // con la última línea ya fallida no se adelanta nada: se pide solo la que toca (si el servidor sigue caído, no se gastan pedidos de más)
        for (let k = 1; k <= AHEAD; k++) if (cur + k < L.lines.length) entryFor(cur + k);
    }
    // si cambió la velocidad: lo precargado desde `from` a la velocidad vieja se descarta (rige desde la línea siguiente)
    function syncSpeed(from) {
        const now = speedNow();
        for (const [i, e] of Array.from(L.cache.entries())) if (i >= from && e.speed !== now) dropEntry(i);
        L.speed = now;
    }
    function onSpeedChip() { // ⚡ de la vista Leer: cycleSpeed() ya cambió playbackSpeed cuando corre este setTimeout
        setTimeout(() => { if (L.state === 'idle' || speedNow() === L.speed) return; syncSpeed(L.idx + 1); preload(L.idx); }, 0);
    }

    // ───────────── reproducción ─────────────
    function audioEl() {
        if (!L.audio) { L.audio = new Audio(); try { L.audio.preservesPitch = true; L.audio.webkitPreservesPitch = true; } catch (e) { /* noop */ } }
        return L.audio;
    }
    function markLine(i) {
        if (L.state === 'idle') return; // un evento tardío (p. ej. el «start» de una voz ya cancelada) no vuelve a marcar nada
        document.querySelectorAll('.lq-line.is-playing').forEach(el => el.classList.remove('is-playing'));
        const el = L.lines[i] && L.lines[i].el;
        if (!el) return;
        el.classList.add('is-playing');
        if (Date.now() - L.lastManual >= MANUAL_SCROLL_MS) { try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { /* sin scroll */ } }
    }
    function waitWhilePaused(tok) {
        if (L.state !== 'paused') return Promise.resolve();
        return new Promise((res) => { L.resume = () => { L.resume = null; res(); }; });
    }
    // Tiempo estimado de lectura (para no correr la marca cuando no hay audio real que esperar)
    const dwell = (text) => wait(Math.min(8000, Math.max(1200, text.length * 220 / Math.max(0.5, speedNow()))));
    // Voz del sistema para UNA línea. Se resalta la línea (markLine), NUNCA palabra por palabra: sin KARA.
    // Resuelve cuando la voz terminó de verdad; si no pudo hablar, espera lo que habría tardado en leerse.
    function speakSystem(i, tok) {
        const text = L.lines[i].text;
        return new Promise((resolve) => {
            let started = false, done = false, muda = false, wd = 0;
            const fin = () => { if (done) return; done = true; clearTimeout(wd); L.tts = null; resolve(); };
            const mudo = () => { if (muda || done) return; if (tok !== L.tok) { fin(); return; } muda = true; markLine(i); dwell(text).then(fin); }; // sin voz: la marca se queda el tiempo de lectura
            if (!('speechSynthesis' in window)) { mudo(); return; }
            const u = new SpeechSynthesisUtterance(text);
            u.lang = L.lang; u.rate = speedNow();
            try { if (typeof sysVoiceFor === 'function') { const sv = sysVoiceFor(L.lang, L.vz); if (sv) u.voice = sv; } } catch (e) { /* sin voz */ }
            u.onstart = () => { if (muda || tok !== L.tok) return; started = true; clearTimeout(wd); markLine(i); };
            u.onend = () => { if (muda) return; if (tok !== L.tok) { fin(); return; } if (!started) markLine(i); fin(); };
            u.onerror = (ev) => {
                if (muda) return; // ya la dimos por muda (el cancel() de abajo dispara este evento)
                if (tok !== L.tok || (ev && (ev.error === 'canceled' || ev.error === 'interrupted'))) { fin(); return; } // lo cortamos nosotros
                if (!started) { mudo(); return; }
                fin();
            };
            wd = setTimeout(() => { if (!started && !done) { try { speechSynthesis.cancel(); } catch (e) { /* noop */ } mudo(); } }, SPEECH_START_MS);
            L.tts = u;
            speechSynthesis.speak(u);
        });
    }
    async function playEntry(i, ent, tok) {
        const line = L.lines[i];
        if (!ent || ent.error || !ent.url) { await speakSystem(i, tok); return; }
        try { if (typeof KARA !== 'undefined') KARA.prepare(line.el); } catch (e) { /* noop */ }
        const a = audioEl();
        a.src = ent.url;
        try { applyTtsSpeed(a, ent.data); } catch (e) { /* noop */ }
        // «terminó de verdad» = evento 'ended'. Un 'error' del <audio> NO es un fin: la línea se lee con la voz del sistema.
        const fin = new Promise((res) => {
            const ok = () => { a.removeEventListener('ended', ok); a.removeEventListener('error', mal); res('ended'); };
            const mal = () => { a.removeEventListener('ended', ok); a.removeEventListener('error', mal); res('error'); };
            a.addEventListener('ended', ok); a.addEventListener('error', mal);
        });
        let sonando = true, r = 'ended';
        try {
            try { await a.play(); } catch (e) { sonando = false; } // autoplay bloqueado o fuente inválida
            if (tok !== L.tok) return;
            if (!sonando) r = 'error';
            else {
                markLine(i); // recién ahora suena esta línea: la marca avanza
                try { if (typeof KARA !== 'undefined') KARA.withAudio(a, line.text); } catch (e) { /* noop */ }
                r = await fin; // pausar no dispara 'ended'
            }
        } finally { try { URL.revokeObjectURL(ent.url); } catch (e) { /* ya */ } }
        if (tok !== L.tok) return;
        if (r === 'error') { try { a.pause(); } catch (e) { /* noop */ } await speakSystem(i, tok); }
    }
    async function run(tok) {
        for (let i = 0; i < L.lines.length; i++) {
            if (tok !== L.tok) return;
            L.idx = i;
            syncSpeed(i);
            let ent;
            if (L.tripped) { ent = { url: null, data: null, error: new Error('circuito') }; } // sin pedir nada más
            else {
                const mine = entryFor(i);
                preload(i);
                let v;
                if (!mine.ready) { L.waiting = true; renderBar(); v = await mine.p; L.waiting = false; if (tok !== L.tok) return; renderBar(); }
                else v = mine.entry;
                L.cache.delete(i);
                if (L.tripped) { // el circuito se cortó mientras esperaba: aunque haya llegado, el resto va con la voz del sistema
                    if (v && v.url) { try { URL.revokeObjectURL(v.url); } catch (e) { /* ya */ } }
                    ent = { url: null, data: null, error: new Error('circuito') };
                } else ent = v;
            }
            if (tok !== L.tok) return;
            await waitWhilePaused(tok);
            if (tok !== L.tok) return;
            await playEntry(i, ent, tok);
        }
        if (tok === L.tok) finish();
    }
    function start() {
        if (L.state !== 'idle' || !isGradedStory()) return;
        const u = UI(), lesson = u.state.lesson;
        const body = u.els.body, els = Array.from(body.querySelectorAll('.lq-lines .lq-line'));
        const lines = els.map((el) => { const s = el.querySelector('.lq-line-say'); return { el: el, text: s ? String(s.dataset.zh || '').trim() : '' }; }).filter(x => x.text);
        if (!lines.length) return;
        // un solo audio a la vez: corta el de los 🔊 por línea, el global y el Lector
        try { if (window.LQ_TEXT) window.LQ_TEXT.stop(); } catch (e) { /* noop */ }
        try { if (typeof stopGlobalAudio === 'function') stopGlobalAudio(); } catch (e) { /* noop */ }
        try { if (typeof stopReader === 'function') stopReader(); } catch (e) { /* noop */ }
        const a = audioEl();
        try { a.src = SILENT_WAV; const pr = a.play(); if (pr && pr.catch) pr.catch(() => { }); } catch (e) { /* desbloqueo del audio dentro del toque */ }
        L.lesson = lesson; L.lines = lines; L.idx = -1; L.cache = new Map(); L.backoffUntil = 0; L.waiting = false; L.resume = null;
        L.fails = 0; L.tripped = false; L.reported = 0; L.settled = new Map();
        L.vz = (typeof voiceZhFor === 'function') ? voiceZhFor(lesson) : 'f';
        L.lang = (typeof ttsLangFor === 'function') ? ttsLangFor('zh', L.vz) : 'zh-CN';
        L.speed = speedNow();
        L.state = 'playing';
        const tok = ++L.tok;
        renderBar();
        run(tok);
    }
    function finish() {
        reset();
        renderBar();
    }
    function reset() {
        L.state = 'idle'; L.idx = -1; L.waiting = false; L.tripped = false; L.fails = 0; L.reported = 0; L.settled = new Map();
        L.cache.forEach((e) => { e.p.then((v) => { if (v && v.url) { try { URL.revokeObjectURL(v.url); } catch (x) { /* ya */ } } }); });
        L.cache.clear();
        document.querySelectorAll('.lq-line.is-playing').forEach(el => el.classList.remove('is-playing'));
        try { if (typeof KARA !== 'undefined') KARA.stop(); } catch (e) { /* noop */ }
    }
    function stopAll(why) {
        if (L.state === 'idle') return;
        stats.stops[why] = (stats.stops[why] || 0) + 1;
        L.tok++; // cancela lo que esté en vuelo
        const a = L.audio;
        if (a) { try { a.pause(); a.removeAttribute('src'); a.load(); } catch (e) { /* noop */ } }
        if ('speechSynthesis' in window) { try { speechSynthesis.cancel(); } catch (e) { /* noop */ } }
        L.tts = null;
        const r = L.resume; L.resume = null; if (r) r();
        reset();
        renderBar();
    }
    function togglePause() {
        if (L.state === 'playing') {
            L.state = 'paused';
            if (L.tts) { try { speechSynthesis.pause(); } catch (e) { /* noop */ } } else if (L.audio && !L.audio.paused) { try { L.audio.pause(); } catch (e) { /* noop */ } }
        } else if (L.state === 'paused') {
            L.state = 'playing';
            if (L.resume) L.resume();
            else if (L.tts) { try { speechSynthesis.resume(); } catch (e) { /* noop */ } } else if (L.audio && L.audio.src && L.audio.paused) { L.audio.play().catch(() => { }); }
        }
        renderBar();
    }

    // ───────────── cortes ─────────────
    function boot() {
        const u = UI();
        const pop = $('lesson-pop'), body = u && u.els && u.els.body;
        if (!u || !pop || !body) return;
        // 1) eventos (sin observar nada)
        const close = $('lq-close');
        if (close) close.addEventListener('click', () => stopAll('cerrar'), true);          // ✕ y Atrás (nav.js hace click en #lq-close)
        document.addEventListener('ac-script-change', () => stopAll('escritura'));            // 简/繁
        body.addEventListener('click', (e) => {
            if (e.target.closest && e.target.closest('.lq-line-say')) stopAll('linea');       // 🔊 de una línea
            if (e.target.closest && e.target.closest('#lq-story-practice')) stopAll('practicar'); // Practicar → quiz
            if (e.target.closest && e.target.closest('#lq-story-speed')) onSpeedChip();          // ⚡ a mitad de la escucha
        }, true);
        ['wheel', 'touchmove', 'pointerdown'].forEach(ev => body.addEventListener(ev, () => { L.lastManual = Date.now(); }, { passive: true }));
        // 2) observadores ACOTADOS (sin subtree): Esc y clic en el fondo cierran sin pasar por #lq-close; la vista Leer se arma por innerHTML
        new MutationObserver(() => {
            stats.pop++;
            if (pop.classList.contains('hidden')) stopAll('ventana');
        }).observe(pop, { attributes: true, attributeFilter: ['class'] });
        new MutationObserver(() => {
            stats.body++;
            if (L.state !== 'idle' && !$('ll-bar')) { stopAll('vista'); return; } // la vista cambió (quiz, glosario, otra lección): se corta
            if (isGradedStory()) inject();
        }).observe(body, { childList: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    // setIcons: true = todos los iconos; false = solo texto; undefined = detectar la fuente (lo normal). hasGlyph se expone para las pruebas.
    window.LQ_LISTEN = { setIcons(v) { ICONS = (v === undefined) ? null : (v ? Object.assign({}, ICON_CHARS) : { play: '', pause: '', resume: '', stop: '', wait: '…' }); renderBar(); }, get icons() { return Object.assign({}, icons()); }, hasGlyph: hasGlyph, stats: stats, get state() { return L.state; }, get idx() { return L.idx; }, stop: () => stopAll('api'), get audio() { return L.audio; }, get tripped() { return L.tripped; }, config: { AHEAD, RETRY_MS, RETRY_JITTER_MS, CIRCUIT_AFTER, BACKOFF_MS, MANUAL_SCROLL_MS } };
})();
