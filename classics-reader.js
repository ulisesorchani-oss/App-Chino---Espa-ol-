// ============================================================
// classics-reader.js — Lector de Clásicos
// ============================================================
// Extraído de app.js (fase 6 de modularización, 2026-09-24): el lector
// de los 9 clásicos chinos por su texto original (capítulos/pasajes),
// con la misma experiencia que el lector de lecciones — pinyin
// interlineal, traducción oculta por defecto, TTS por línea y
// navegación entre bloques. Ya era una IIFE autocontenida
// (classicsReadInit) que solo expone window.CR_open (punto de entrada
// desde el botón "Leer lección" de la tarjeta y desde la Biblioteca
// del Lector) y window.CR_DEBUG (solo lectura, para pruebas E2E).
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js (usa KARA, el karaoke de
// lectura que sigue viviendo ahí, y fetchTTS/voiceZh/etc. de
// audio-tts.js en tiempo de ejecución) y expone su API en window.CR_*
// tal cual la usaba reader.js antes de esta extracción.
// ============================================================

// ======================================================================
// v9.2 — LECTOR DE CLÁSICOS (texto original por bloques, como las lecciones)
// ======================================================================
// Los clásicos ya no se "leen" como concatenación de oraciones de práctica:
// cada módulo muestra su TEXTO ORIGINAL en bloques (capítulos/pasajes) con
// la misma experiencia que el lector de lecciones: pinyin interlineal
// opcional (pinyin-pro), traducción 🇪🇸 oculta por defecto (misma
// preferencia 'ac_lq_es'), TTS por línea (fetchTTS + fallback sistema) y
// navegación entre bloques. Datos: classics.js (window.CLASSIC_TEXTS +
// window.CLASSIC_T con tradicional horneado vía opencc).
// Entradas: (a) lista directa en la pestaña Clásicos (#cread-list);
//           (b) botón 📖 Leer lección de la tarjeta → window.CR_open(mod, oración)
//               que salta al bloque/línea donde vive la frase practicada;
//           (c) Biblioteca del Lector (entradas de clásicos).
(function classicsReadInit() {
    'use strict';
    const DATA = (typeof window.CLASSIC_TEXTS !== 'undefined') ? window.CLASSIC_TEXTS : null;
    if (!DATA) return;
    const T = (typeof window.CLASSIC_T !== 'undefined') ? window.CLASSIC_T : { line: {}, label: {} };

    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const pop = $('cread-pop');
    if (!pop) return;
    const body = $('cr-body'), progNum = $('cr-progress-num');

    const CR = { mod: null, block: 0, pinyin: false };

    // ── utilidades compartidas con lessonsInit ──
    const zhKey = () => (typeof ck === 'function') ? ck() : 'simp';
    const pyLine = (zh) => {
        try { return (typeof pinyinPro !== 'undefined') ? pinyinPro.pinyin(zh) : ''; }
        catch (e) { return ''; }
    };

    // v9.3: mismos helpers que lessonsInit — carácter tocable + chip ⚡
    const CR_RE_HANZI = /[\u3400-\u9FFF\uF900-\uFAFF]/;
    function zhCharsHtml(zh) {
        return String(zh == null ? '' : zh).split('').map(ch =>
            CR_RE_HANZI.test(ch)
                ? '<span class="lq-ch" data-ch="' + escHtml(ch) + '">' + escHtml(ch) + '</span>'
                : escHtml(ch)
        ).join('');
    }
    function speedLabel() {
        return '⚡ ' + ((typeof playbackSpeed === 'number') ? playbackSpeed : 1) + 'x';
    }
    function bindSpeedChip(btn) {
        if (!btn) return;
        btn.textContent = speedLabel();
        btn.title = 'Velocidad de la lectura: la MISMA que elegís con ⚡ en la tarjeta';
        btn.addEventListener('click', () => {
            if (typeof cycleSpeed === 'function') cycleSpeed();
            btn.textContent = speedLabel();
        });
    }

    // ── matcher: oración practicada → bloque/línea del texto original ──
    // 1) normaliza (solo Han) · 2) alias de citas abreviadas · 3) contención
    // 4) respaldo: solapamiento de pares de caracteres (Dice ≥ 0.55).
    const CR_ALIAS = { // EL MISMO mapa vive en scripts/build_classics_v92.py
        '生于忧患死于安乐': '生于忧患而死于安乐',
        '祸兮福所倚福兮祸所伏': '祸兮福之所倚福兮祸之所伏',
        '佛说世界即非世界是名世界': '如来说世界非世界是名世界',
        '行远必自迩登高必自卑': '行远必自迩辟如登高必自卑'
    };
    const CR_NO_HIT = { '百善孝为先。': 1 }; // proverbio posterior, no es del 孝经
    function crNorm(s) {
        const m = String(s == null ? '' : s).match(/[\u3400-\u9FFF\uF900-\uFAFF]/g) || [];
        return m.join('');
    }
    function crDice(a, b) {
        if (!a || !b) return 0;
        const bg = (s) => { const out = new Set(); for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2)); return out; };
        const A = bg(a), B = bg(b);
        let inter = 0;
        A.forEach(x => { if (B.has(x)) inter++; });
        return (2 * inter) / (A.size + B.size);
    }
    function findLine(mod, sentence) {
        let target = crNorm(sentence && sentence.chinese_simp_full);
        if (!target) return { block: 0, line: -1 };
        if (CR_NO_HIT[sentence.chinese_simp_full]) return { block: 0, line: -1 };
        if (CR_ALIAS[target]) target = CR_ALIAS[target];
        const blocks = DATA[mod].blocks;
        let best = { r: 0, block: 0, line: -1 };
        for (let b = 0; b < blocks.length; b++) {
            const lines = blocks[b].l;
            for (let i = 0; i < lines.length; i++) {
                const ln = crNorm(lines[i][0]);
                if (!ln) continue;
                if (ln.indexOf(target) !== -1 || target.indexOf(ln) !== -1) return { block: b, line: i };
                const r = crDice(target, ln);
                if (r > best.r) best = { r, block: b, line: i };
            }
        }
        return best.r >= 0.55 ? { block: best.block, line: best.line } : { block: 0, line: -1 };
    }

    // ── TTS: mismo pipeline que el lector de lecciones ──
    // v9.4: karaoke de lectura disponible también acá (mismo KARA).
    let crAudio = null;
    // v9.11: play/pausa en clásicos — espejo exacto del parlante de lecciones:
    // 2.º toque sobre el MISMO botón pausa, 3.º reanuda; icono 🔊/⏸/▶️.
    let crTtsU = null;
    let crPlay = { text: '', btn: null, state: 'idle' };
    let crTok = 0;
    function setCrIcon(btn, st) {
        if (!btn) return;
        if (btn.id === 'cq-speak') btn.textContent = st === 'playing' ? '⏸ Pausar' : (st === 'paused' ? '▶️ Seguir' : '🔊 Escuchar');
        else btn.textContent = st === 'playing' ? '⏸' : (st === 'paused' ? '▶️' : '🔊');
    }
    async function speakCr(text, el) {
        const karaLine = (el && el.closest) ? el.closest('.lq-line') : null;
        // v9.11: mismo botón + mismo texto → 2.º toque pausa, 3.º reanuda
        if (el && el === crPlay.btn && crPlay.text === text && crPlay.state !== 'idle') {
            if (crPlay.state === 'playing') {
                if (crAudio) crAudio.pause();
                else if (crTtsU) { try { speechSynthesis.pause(); } catch (e0) { } }
                crPlay.state = 'paused';
                if (el.classList && el.classList.contains) el.classList.remove('lq-speaking');
                setCrIcon(el, 'paused');
            } else {
                if (crAudio) {
                    try { await crAudio.play(); crPlay.state = 'playing'; } catch (e0) { crPlay.state = 'idle'; }
                } else if (crTtsU) {
                    try { speechSynthesis.resume(); crPlay.state = 'playing'; } catch (e0) { }
                }
                if (crPlay.state === 'playing') {
                    if (el.classList && el.classList.add) el.classList.add('lq-speaking');
                    setCrIcon(el, 'playing');
                } else setCrIcon(el, 'idle');
            }
            return;
        }
        const myTok = ++crTok;
        try {
            if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
            if (crAudio) { crAudio.pause(); crAudio = null; }
            crTtsU = null;
            if (crPlay.btn && crPlay.btn !== el) {
                if (crPlay.btn.classList && crPlay.btn.classList.remove) crPlay.btn.classList.remove('lq-speaking');
                setCrIcon(crPlay.btn, 'idle');
            }
            crPlay = { text: '', btn: null, state: 'idle' };
            KARA.stop(); // nueva lectura → limpia el resaltado anterior
            if (el) el.classList.add('lq-speaking');
            const resp = await fetchTTS(ttsBody(text, ttsLangFor('zh', voiceZh), voiceZh), 12000); // v9.40: +speed · v9.49: 🇹🇼 → zh-TW
            if (myTok !== crTok) { if (el && el.classList && el.classList.remove) el.classList.remove('lq-speaking'); return; }
            if (!resp.ok) throw new Error('TTS http ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('TTS sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            crAudio = new Audio(url);
            // v9.3: preservesPitch (voz natural a 0.85x/0.7x) + re-afirmar el
            // rate en 'playing' (iOS Safari puede resetearlo al cargar).
            try { crAudio.preservesPitch = true; crAudio.webkitPreservesPitch = true; } catch (e2) { }
            // v9.40: igual que lq — velocidad en el server, re-afirmada en 'playing'.
            applyTtsSpeed(crAudio, data);
            crAudio.addEventListener('playing', () => {
                applyTtsSpeed(crAudio, data);
            }, { once: true });
            KARA.prepare(karaLine); // v9.4: karaoke (no-op si está OFF)
            crPlay = { text, btn: el, state: 'playing' };
            await crAudio.play();
            if (myTok !== crTok) { crAudio.pause(); if (el && el.classList && el.classList.remove) el.classList.remove('lq-speaking'); return; }
            setCrIcon(el, 'playing');
            KARA.withAudio(crAudio, text);
            const finCr = () => { URL.revokeObjectURL(url); crAudio = null; if (el && el.classList && el.classList.remove) el.classList.remove('lq-speaking'); if (crPlay.btn === el) { crPlay.state = 'idle'; setCrIcon(el, 'idle'); } };
            crAudio.onended = finCr;
            crAudio.onerror = finCr;
        } catch (e) {
            KARA.stop(); // el audio del API no arrancó → limpia el estado
            if (myTok !== crTok) { if (el && el.classList && el.classList.remove) el.classList.remove('lq-speaking'); return; }
            try {
                if ('speechSynthesis' in window) {
                    speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(text);
                    u.lang = ttsLangFor('zh', voiceZh); // v9.49: 🇹🇼 → zh-TW
                    u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                    const sv = (typeof sysVoiceFor === 'function') ? sysVoiceFor(ttsLangFor('zh', voiceZh), voiceZh) : null;
                    if (sv) u.voice = sv;
                    KARA.prepare(karaLine); // v9.4: karaoke con la voz del sistema
                    crPlay = { text, btn: el, state: 'playing' };
                    crTtsU = u;
                    setCrIcon(el, 'playing');
                    u.onend = () => { if (crTtsU === u) crTtsU = null; if (crPlay.btn === el) { crPlay.state = 'idle'; setCrIcon(el, 'idle'); } };
                    speechSynthesis.speak(u);
                    KARA.withTts(u, text, u.rate);
                }
            } catch (e2) { /* silencioso */ }
            if (el && el.classList && el.classList.remove) el.classList.remove('lq-speaking');
        }
    }
    function stopCrSpeak() {
        if (crAudio) { crAudio.pause(); crAudio = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { }
        crTtsU = null;
        crTok++; // descarta descargas TTS en vuelo (se cerró el lector)
        if (crPlay.btn) { if (crPlay.btn.classList && crPlay.btn.classList.remove) crPlay.btn.classList.remove('lq-speaking'); setCrIcon(crPlay.btn, 'idle'); }
        crPlay = { text: '', btn: null, state: 'idle' };
        KARA.stop(); // v9.4: apaga el resaltado al cortar la lectura
        body.querySelectorAll('.lq-speaking').forEach(el => el.classList.remove('lq-speaking'));
    }

    // ── preferencia 🇪🇸 COMPARTIDA con las lecciones ('ac_lq_es') ──
    const esPref = () => { try { return localStorage.getItem('ac_lq_es') === '1'; } catch (e) { return false; } };
    const setEsPref = (v) => { try { localStorage.setItem('ac_lq_es', v ? '1' : '0'); } catch (e) { } };

    // ── overlay ──
    function openCrPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closeCrPop() {
        stopCrSpeak();
        pop.classList.add('hidden');
        syncBodyScroll(); // v9.50
        CR.mod = null;
        CQ.items = null; CQ.idx = 0; // v9.3: resetea la práctica inline
    }

    // ── vista: un bloque del texto original ──
    function renderBlock(hitLine) {
        const mod = CR.mod, info = DATA[mod];
        const k = zhKey(), trad = (k === 'trad');
        const blocks = info.blocks, b = CR.block, blk = blocks[b];
        const cinfo = (typeof CLASSICS_INFO !== 'undefined') ? CLASSICS_INFO[mod] : null;
        const titleZh = cinfo ? (trad ? cinfo.zhT : cinfo.zh) : (trad ? (T.label[mod] || '') : '');
        const flatBase = blocks.slice(0, b).reduce((a, x) => a + x.l.length, 0);
        const tlines = T.line[mod] || [];
        const tlabels = T.label[mod] || [];
        progNum.textContent = (b + 1) + '/' + blocks.length;

        const lines = blk.l.map((pair, i) => {
            const zh = trad ? (tlines[flatBase + i] || pair[0]) : pair[0];
            // v9.2 fix: si el pinyin está ON, las líneas de un bloque nuevo nacen
            // CON pinyin (antes quedaban vacías/ocultas hasta re-tocar el botón)
            const pyCls = CR.pinyin ? 'lq-line-py' : 'lq-line-py hidden';
            return '<div class="lq-line' + (i === hitLine ? ' cr-flash' : '') + '" data-i="' + i + '"' +
                (i === hitLine ? ' id="cr-hit"' : '') + ' role="button" tabindex="0" title="Tocá un carácter para verlo · 🔊 para escuchar la línea">' +
                '<div class="lq-line-zh">' + zhCharsHtml(zh) + '</div>' +
                '<button type="button" class="lq-line-say" data-zh="' + escHtml(zh) + '" aria-label="Escuchar la línea">🔊</button>' +
                '<div class="' + pyCls + '" data-zh="' + escHtml(zh) + '">' + (CR.pinyin ? escHtml(pyLine(zh)) : '') + '</div>' +
                '<div class="lq-line-es' + (esPref() ? '' : ' hidden') + '">' + escHtml(pair[1]) + '</div></div>';
        }).join('');

        const chips = blocks.map((x, i) =>
            '<button type="button" class="cr-chip' + (i === b ? ' active' : '') + '" data-b="' + i + '">' +
            escHtml(trad ? (tlabels[i] || x.n) : x.n) + '</button>').join('');

        const badgeTxt = info.badge === 'completo' ? 'texto completo' : 'selección de capítulos';
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + info.emoji + '</span>' +
            '<div><div class="lq-story-zh">' + escHtml(titleZh) + '</div>' +
            '<div class="lq-story-es">' + escHtml(info.es) + ' · ' + badgeTxt + '</div></div></div>' +
            '<p class="cr-intro">' + escHtml(info.intro) + '</p>' +
            '<div class="cr-chips" id="cr-chips">' + chips + '</div>' +
            '<div class="lq-lines" id="cr-lines">' + lines + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-es">🇪🇸 Español: ' + (esPref() ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-py">🔤 Pinyin: ' + (CR.pinyin ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-speed">⚡ …</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-kara">✨ Karaoke: ' + (KARA.on() ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-primary" id="cr-practice">🎯 Practicar este clásico</button>' +
            '</div>' +
            '<div class="cr-nav">' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-prev"' + (b === 0 ? ' disabled' : '') + '>‹ Anterior</button>' +
            '<span class="cr-nav-num">' + escHtml(trad ? (tlabels[b] || blk.n) : blk.n) + '</span>' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-next"' + (b === blocks.length - 1 ? ' disabled' : '') + '>Siguiente ›</button>' +
            '</div>';

        body.querySelector('#cr-es').addEventListener('click', (e) => {
            const v = !esPref();
            setEsPref(v);
            e.target.textContent = '🇪🇸 Español: ' + (v ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-es').forEach(el => el.classList.toggle('hidden', !v));
        });
        body.querySelector('#cr-py').addEventListener('click', (e) => {
            CR.pinyin = !CR.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (CR.pinyin ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-py').forEach(el => {
                if (CR.pinyin && !el.textContent) el.textContent = pyLine(el.dataset.zh);
                el.classList.toggle('hidden', !CR.pinyin);
            });
        });
        bindSpeedChip(body.querySelector('#cr-speed'));
        body.querySelector('#cr-kara').addEventListener('click', (e) => {
            // v9.4: karaoke de lectura en clásicos — misma preferencia compartida
            const v = !KARA.on();
            try { localStorage.setItem('ac_karaoke', v ? '1' : '0'); } catch (e2) { }
            if (!v) KARA.stop();
            e.target.textContent = '✨ Karaoke: ' + (v ? 'ON' : 'OFF');
        });
        body.querySelector('#cr-practice').addEventListener('click', () => {
            // v9.3: la práctica de clásicos es un multiple choice DENTRO del
            // lector (misma piel que las lecciones HSK) — no cambia de ventana
            // ni interrumpe la lectura. Sin datos embebidos queda el salto viejo.
            if (openCq(mod)) return;
            closeCrPop();
            if (typeof setModule === 'function') setModule(mod);
            const card = $('sentence-card');
            if (card) try { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { }
        });
        body.querySelector('#cr-prev').addEventListener('click', () => {
            if (CR.block > 0) { CR.block--; renderBlock(-1); }
        });
        body.querySelector('#cr-next').addEventListener('click', () => {
            if (CR.block < DATA[mod].blocks.length - 1) { CR.block++; renderBlock(-1); }
        });
        body.querySelector('#cr-chips').addEventListener('click', (e) => {
            const chip = e.target.closest('.cr-chip');
            if (!chip) return;
            CR.block = +chip.dataset.b;
            renderBlock(-1);
        });
        body.querySelector('#cr-lines').addEventListener('click', (e) => {
            // v9.11: SOLO el botón 🔊 de la línea reproduce audio — tocar el
            // panel ya no dispara lectura (mismo criterio que las lecciones).
            // Los caracteres tocados siguen abriendo la ficha del popup.
            const say = e.target.closest('.lq-line-say');
            if (say) { speakCr(say.dataset.zh, say); return; }
            const chEl = e.target.closest('.lq-ch');
            if (chEl && typeof showVocabPop === 'function') { showVocabPop(chEl.dataset.ch); }
        });
        if (hitLine >= 0) {
            const hit = body.querySelector('#cr-hit');
            if (hit) try { hit.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { }
        }
    }

    function openCr(mod, blockIdx, hitLine) {
        if (!DATA[mod]) return false;
        CR.mod = mod;
        CR.block = Math.max(0, Math.min(blockIdx || 0, DATA[mod].blocks.length - 1));
        openCrPop();
        renderBlock(hitLine === undefined ? -1 : hitLine);
        return true;
    }

    // API pública: abrir el lector de un clásico (y saltar a la frase si hay)
    window.CR_open = function (mod, sentence) {
        if (!DATA[mod]) return false;
        let block = 0, line = -1;
        if (sentence) {
            const hit = findLine(mod, sentence);
            block = hit.block; line = hit.line;
        }
        return openCr(mod, block, line);
    };

    // ── v9.3: PRÁCTICA INLINE del clásico — multiple choice como las lecciones ──
    // Los ítems vienen de los datos embebidos del módulo (mismos que la
    // práctica tipeada). La correcta es chinese_simp_answer; los 2
    // distractores salen del MISMO clásico (largo parecido) y, si faltaran,
    // de los otros clásicos. Mezcla Fisher-Yates por pregunta, igual que las
    // lecciones: la posición visible de la correcta nunca es predecible.
    const CQ = { items: null, idx: 0, results: null, built: null, tmap: null, answered: false };

    function cqItemsFor(mod) {
        try {
            const rows = (typeof EMBEDDED_MODULE_DATA !== 'undefined') ? EMBEDDED_MODULE_DATA[mod] : null;
            return (rows && rows.length >= 2) ? rows : null;
        } catch (e) { return null; }
    }
    function cqOptions(items, idx) {
        const it = items[idx];
        const correct = String(it.chinese_simp_answer || '').trim();
        const seen = new Set([correct]);
        const pool = [];
        const rest = items.map((x, i) => i).filter(i => i !== idx)
            .sort((a, b) =>
                Math.abs(String(items[a].chinese_simp_answer || '').length - correct.length) -
                Math.abs(String(items[b].chinese_simp_answer || '').length - correct.length));
        for (const i of rest) {
            const a = String(items[i].chinese_simp_answer || '').trim();
            if (!a || seen.has(a)) continue;
            seen.add(a); pool.push(a);
            if (pool.length >= 2) break;
        }
        if (pool.length < 2 && typeof EMBEDDED_MODULE_DATA !== 'undefined') {
            outer: for (const key of Object.keys(EMBEDDED_MODULE_DATA)) {
                if (key === mod || key.indexOf('Clasicos-') !== 0) continue;
                for (const x of EMBEDDED_MODULE_DATA[key]) {
                    const a = String(x.chinese_simp_answer || '').trim();
                    if (!a || seen.has(a)) continue;
                    seen.add(a); pool.push(a);
                    if (pool.length >= 2) break outer;
                }
            }
        }
        const opts = [correct].concat(pool.slice(0, 2));
        const d = [0, 1, 2];
        for (let i = d.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [d[i], d[j]] = [d[j], d[i]];
        }
        return { opts: opts, order: d };
    }
    function openCq(mod) {
        const items = cqItemsFor(mod);
        if (!items) return false;
        CR.mod = mod;
        CQ.items = items; CQ.idx = 0;
        CQ.results = new Array(items.length).fill(null);
        CQ.built = items.map((_, i) => cqOptions(items, i));
        // mapa simp→trad de las respuestas para el modo 繁
        CQ.tmap = {};
        items.forEach(it => {
            const s = String(it.chinese_simp_answer || '').trim();
            const t = String(it.chinese_trad_answer || '').trim();
            if (s && t) CQ.tmap[s] = t;
        });
        openCrPop();
        renderCq();
        return true;
    }
    function cqTrad(a) {
        return (zhKey() === 'trad' && CQ.tmap && CQ.tmap[a]) ? CQ.tmap[a] : a;
    }
    function cqCardHtml(label, zhTxt, cls, it) {
        const py = it && it.pinyin ? it.pinyin : '';
        const meaning = it && it.spanish_answer ? it.spanish_answer : '';
        const full = it && it.spanish_full ? it.spanish_full : '';
        const li = (t) => t ? '<li>' + escHtml(t) + '</li>' : '';
        return '<div class="lq-card ' + cls + '"><div class="lq-card-label">' + label + '</div>' +
            '<div class="lq-card-zh" lang="zh">' + escHtml(zhTxt) + '</div>' +
            (py ? '<div class="lq-card-py">' + escHtml(py) + '</div>' : '') +
            '<ul class="lq-card-es">' + li(meaning || full) + (meaning && full && full !== meaning ? li(full) : '') + '</ul></div>';
    }
    function renderCq() {
        const items = CQ.items, it = items[CQ.idx], built = CQ.built[CQ.idx];
        CQ.answered = false;
        progNum.textContent = (CQ.idx + 1) + '/' + items.length;
        const segsEl = $('cr-segments');
        if (segsEl) segsEl.innerHTML = CQ.results.map(r =>
            '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : '') + '"></span>').join('');
        const info = DATA[CR.mod];
        const cinfo = (typeof CLASSICS_INFO !== 'undefined') ? CLASSICS_INFO[CR.mod] : null;
        const title = (cinfo ? ((zhKey() === 'trad' ? cinfo.zhT : cinfo.zh) + ' · ') : '') + info.es;
        const cloze = String((zhKey() === 'trad' && it.chinese_trad_cloze) ? it.chinese_trad_cloze : it.chinese_simp_cloze || '');
        const parts = cloze.split('___');
        const ord = built.order;
        const opts = ord.map((dataIdx, pos) =>
            '<button type="button" class="lq-opt" data-pos="' + pos + '"><span class="lq-opt-letter">' +
            'ABC'[pos] + '</span><span class="lq-opt-zh" lang="zh">' + escHtml(cqTrad(built.opts[dataIdx])) + '</span></button>'
        ).join('');
        body.innerHTML =
            '<div class="lq-tag-row"><div class="lq-lesson-tag">📜 ' + escHtml(title) + '</div>' +
            '<button type="button" class="lq-btn lq-ghost lq-mini" id="cq-es">🇪🇸 Traducción: ' + (esPref() ? 'ON' : 'OFF') + '</button></div>' +
            '<div class="lq-zh" id="cq-zh">' + escHtml(parts[0] || '') + '<span class="lq-blank" id="cq-blank">？</span>' + escHtml(parts[1] || '') + '</div>' +
            '<div class="lq-es-box' + (esPref() ? '' : ' hidden') + '" id="cq-es-box">' + escHtml(it.spanish_full || '') + '</div>' +
            '<div class="lq-opts" id="cq-opts">' + opts + '</div>' +
            '<div class="lq-feedback hidden" id="cq-feedback"></div>' +
            '<div class="lq-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="cq-speak">🔊 Escuchar</button>' +
            '<button type="button" class="lq-btn lq-primary hidden" id="cq-next">Siguiente ▶</button>' +
            '</div>';
        body.querySelector('#cq-es').addEventListener('click', (e) => {
            const v = !esPref(); setEsPref(v);
            e.target.textContent = '🇪🇸 Traducción: ' + (v ? 'ON' : 'OFF');
            const box = body.querySelector('#cq-es-box');
            if (box) box.classList.toggle('hidden', !v);
        });
        body.querySelector('#cq-speak').addEventListener('click', (e) => {
            const full = String((zhKey() === 'trad' && it.chinese_trad_full) ? it.chinese_trad_full : it.chinese_simp_full || '');
            speakCr(full, e.target);
        });
        body.querySelector('#cq-opts').addEventListener('click', (e) => {
            const b = e.target.closest('.lq-opt');
            if (b && !CQ.answered) cqAnswer(+b.dataset.pos);
        });
        body.querySelector('#cq-next').addEventListener('click', cqNext);
    }
    function cqAnswer(pos) {
        CQ.answered = true;
        const it = CQ.items[CQ.idx], built = CQ.built[CQ.idx];
        const dataIdx = built.order[pos];
        const ok = dataIdx === 0;
        CQ.results[CQ.idx] = ok;
        // segmentos del encabezado (ok/bad/null) — igual que las lecciones
        const segsEl2 = $('cr-segments');
        if (segsEl2) segsEl2.innerHTML = CQ.results.map(r =>
            '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : '') + '"></span>').join('');
        const chosen = built.opts[dataIdx], right = built.opts[0];
        const blank = body.querySelector('#cq-blank');
        if (blank) {
            blank.textContent = cqTrad(chosen);
            blank.classList.add(ok ? 'fill-ok' : 'fill-bad');
        }
        body.querySelectorAll('.lq-opt').forEach((b, bi) => {
            b.disabled = true;
            if (bi === built.order.indexOf(0)) b.classList.add('is-right');
            else if (bi === pos) b.classList.add('is-wrong');
        });
        let fb;
        if (ok) {
            fb = '<div class="lq-verdict ok">✓ ¡Correcto!</div>' + cqCardHtml('LA FRASE', cqTrad(right), 'lq-card-green', it);
        } else {
            fb = '<div class="lq-verdict bad">✗ Casi — repasala en tu mazo</div>' +
                '<div class="lq-cards">' + cqCardHtml('TU RESPUESTA', cqTrad(chosen), 'lq-card-red', it) +
                cqCardHtml('RESPUESTA CORRECTA', cqTrad(right), 'lq-card-green', it) + '</div>';
        }
        const fbel = body.querySelector('#cq-feedback');
        fbel.innerHTML = fb;
        fbel.classList.remove('hidden');
        // bookkeeping idéntico al motor principal (identidad = hanzi simplificado)
        if (ok) {
            if (typeof state !== 'undefined') {
                state.knownWords.add(right);
                state.newWords.delete(right);
            }
        } else {
            if (typeof state !== 'undefined') state.newWords.add(right);
            if (typeof window.acSrsMiss === 'function') {
                window.acSrsMiss({
                    w: 1, module: 'Clásico ' + ((typeof CLASSICS_INFO !== 'undefined' && CLASSICS_INFO[CR.mod]) ? CLASSICS_INFO[CR.mod].es : CR.mod),
                    level: 0,
                    chinese_simp_answer: right, chinese_trad_answer: (CQ.tmap && CQ.tmap[right]) || right,
                    spanish_answer: it.spanish_answer, spanish_alternatives: it.spanish_alternatives || null,
                    spanish_full: it.spanish_full, chinese_simp_full: it.chinese_simp_full,
                    pinyin: it.pinyin || ''
                });
            }
        }
        try { saveProgress(); updateStats(); updateVocabularyPanel(); } catch (e) { }
        const nx = body.querySelector('#cq-next');
        nx.classList.remove('hidden');
        if (CQ.idx === CQ.items.length - 1) nx.textContent = 'Ver resultado 🏁';
    }
    function cqNext() {
        if (CQ.idx < CQ.items.length - 1) { CQ.idx++; renderCq(); return; }
        const score = CQ.results.filter(Boolean).length;
        progNum.textContent = '🏁';
        const segsEl = $('cr-segments');
        if (segsEl) segsEl.innerHTML = '';
        const total = CQ.items.length;
        const msg = score === total ? '¡Perfecto! El clásico ya es tuyo.' :
            score >= Math.ceil(total * 0.7) ? '¡Muy bien! Seguí así.' :
                'Buen intento. Leé el texto otra vez y repetí.';
        body.innerHTML =
            '<div class="lq-final">' +
            '<div class="lq-final-emoji">📜</div>' +
            '<div class="lq-final-score">' + score + '/' + total + '</div>' +
            '<div class="lq-final-msg">' + msg + '</div>' +
            '<div class="lq-final-actions">' +
            '<button type="button" class="lq-btn lq-ghost" id="cq-final-read">📖 Leer el clásico</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="cq-final-retry">🔁 Repetir práctica</button>' +
            '<button type="button" class="lq-btn lq-primary" id="cq-final-close">Seguir ✕</button>' +
            '</div></div>';
        body.querySelector('#cq-final-read').addEventListener('click', () => renderBlock(-1));
        body.querySelector('#cq-final-retry').addEventListener('click', () => openCq(CR.mod));
        body.querySelector('#cq-final-close').addEventListener('click', closeCrPop);
    }

    // ── lista directa en la pestaña Clásicos ──
    function renderCrList() {
        const wrap = $('cread-list');
        if (!wrap) return;
        const k = zhKey(), trad = (k === 'trad');
        wrap.innerHTML = '';
        Object.keys(DATA).forEach(mod => {
            const info = DATA[mod];
            const cinfo = (typeof CLASSICS_INFO !== 'undefined') ? CLASSICS_INFO[mod] : null;
            const zh = cinfo ? (trad ? cinfo.zhT : cinfo.zh) : '';
            const nLines = info.blocks.reduce((a, x) => a + x.l.length, 0);
            const card = document.createElement('div');
            card.className = 'cr-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.dataset.mod = mod;
            card.innerHTML =
                '<div class="cr-card-top"><span class="cr-emoji" aria-hidden="true">' + info.emoji + '</span>' +
                '<span class="cr-zh">' + escHtml(zh) + '</span>' +
                '<span class="cr-badge' + (info.badge === 'completo' ? ' full' : '') + '">' +
                (info.badge === 'completo' ? '✓ completo' : 'selección') + '</span></div>' +
                '<div class="cr-es">' + escHtml(info.es) + '</div>' +
                '<div class="cr-meta">' + info.blocks.length + ' bloques · ' + nLines + ' líneas</div>' +
                '<div class="cr-cta">📖 Leer el original</div>';
            wrap.appendChild(card);
        });
    }
    function bindCrList() {
        const wrap = $('cread-list');
        if (!wrap) return;
        wrap.addEventListener('click', (e) => {
            const card = e.target.closest('.cr-card');
            if (card) openCr(card.dataset.mod, 0, -1);
        });
        wrap.addEventListener('keydown', (e) => {
            const card = e.target.closest('.cr-card');
            if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openCr(card.dataset.mod, 0, -1); }
        });
    }

    function bindCrPop() {
        $('cr-close').addEventListener('click', closeCrPop);
        pop.addEventListener('click', (e) => { if (e.target === pop) closeCrPop(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden') && !topLayerOpen()) closeCrPop(); // v9.50
        });
        // el switch 简/繁 re-renderiza el bloque abierto y la lista
        document.addEventListener('ac-script-change', () => {
            if (CR.mod && !pop.classList.contains('hidden')) renderBlock(-1);
            renderCrList();
        });
    }

    function boot() {
        bindCrList();
        bindCrPop();
        renderCrList();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    // API de solo lectura para pruebas E2E
    window.CR_DEBUG = {
        get mods() { return Object.keys(DATA).length; },
        get view() { return { mod: CR.mod, block: CR.block, open: !pop.classList.contains('hidden') }; },
        get flash() { return !!body.querySelector('.cr-flash'); },
        get quiz() { return { active: !!CQ.items, items: CQ.items ? CQ.items.length : 0, idx: CQ.idx, answered: CQ.answered, results: CQ.results ? CQ.results.slice() : null }; }
    };
})();
