// ============================================================
// lessons-graduated.js — Lecciones graduadas (mini-dramas)
// ============================================================
// Extraído de app.js (fase 8 de modularización, 2026-09-24): el quiz
// de lecciones graduadas HSK 3.0/TOCFL (window.GRADED_LESSONS de
// lessons.js/lessons-tocfl.js) — lector de la historia con pinyin
// interlineal y TTS por línea, y la práctica estilo test con huecos
// y distractores. Ya era una IIFE autocontenida (lessonsInit) que
// solo expone window.LQ_DEBUG (solo lectura, pruebas E2E) — nada
// externo llama a su API.
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js (usa KARA, el karaoke que
// sigue en app.js, escHtml de reader.js, fetchTTS/voiceZh/etc. de
// audio-tts.js y window.acSrsMiss de srs.js, todo en tiempo de
// ejecución).
// ============================================================

// ═══════════════════════════════════════════════════════════════════
// v9.0 — LECCIONES GRADUADAS (Huayu Diario 日常華語)
// -------------------------------------------------------------------
// Mini-dramas HSK 3.0 + TOCFL 華測 (window.GRADED_LESSONS; lessons.js + lessons-tocfl.js):
//  · Lector de la historia con pinyin interlineal opcional y TTS por línea.
//  · Práctica estilo test: 10 oraciones del texto con un hueco ___ y 3
//    opciones (1 correcta + 2 distractores del mismo nivel), con ficha
//    comparativa al responder (tu respuesta vs correcta, como la referencia).
//  · Integración: aciertos → palabras aprendidas; errores → newWords +
//    mazo SRS (window.acSrsMiss). Progreso por lección en 'ac_lessons_v1'.
// Patrón IIFE (pzInit/srsInit/lessonsInit): cero acoplamiento, listeners
// delegados en #lesson-list / #lesson-pop.
// ═══════════════════════════════════════════════════════════════════
(function lessonsInit() {
    'use strict';
    const LESSONS = (typeof window.GRADED_LESSONS !== 'undefined') ? window.GRADED_LESSONS : [];
    if (!LESSONS.length) return;

    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ── progreso por lección ──
    const LKEY = 'ac_lessons_v1';
    let LB = {};
    try { LB = JSON.parse(localStorage.getItem(LKEY) || '{}') || {}; } catch (e) { LB = {}; }
    const saveLB = () => { try { localStorage.setItem(LKEY, JSON.stringify(LB)); } catch (e) { } };
    const progOf = (id) => LB[id] || {};

    // ── estado de la sesión abierta ──
    const S = { lesson: null, view: null, idx: 0, results: [], answered: false, pinyin: false };
    // v9.1: traducción OCULTA por defecto (lector y práctica) — el alumno elige
    // verla con el botón 🇪🇸. Preferencia persistente.
    let verEs = lsGet('ac_lq_es') === '1';
    const setVerEs = (v) => {
        verEs = !!v;
        try { localStorage.setItem('ac_lq_es', verEs ? '1' : '0'); } catch (e) { }
    };

    const pop = $('lesson-pop');
    if (!pop) return;
    const body = $('lq-body'), segs = $('lq-segments'), progNum = $('lq-progress-num');

    // v9.3: cada carácter han tocable (estilo LingQ/DuChinese): lo toqués →
    // popup con su pinyin, su significado y “🔁 Sumar a mi repaso” (el MISMO
    // popup de vocabulario de toda la app). Los no-han quedan como texto.
    const LQ_RE_HANZI = /[\u3400-\u9FFF\uF900-\uFAFF]/;
    function zhCharsHtml(zh) {
        return String(zh == null ? '' : zh).split('').map(ch =>
            LQ_RE_HANZI.test(ch)
                ? '<span class="lq-ch" data-ch="' + escHtml(ch) + '">' + escHtml(ch) + '</span>'
                : escHtml(ch)
        ).join('');
    }
    // v9.3: chip ⚡ de velocidad — muestra y cambia la MISMA velocidad que el
    // botón ⚡ de la tarjeta (queda sincronizado: llama a cycleSpeed global).
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

    // ── utilidades compartidas ──
    const ckKey = (typeof ck === 'function') ? ck() : 'simp';
    const zhKey = () => (typeof ck === 'function') ? ck() : 'simp';
    const pyLine = (zh) => {
        try { return (typeof pinyinPro !== 'undefined') ? pinyinPro.pinyin(zh) : ''; }
        catch (e) { return ''; }
    };

    // TTS: reutiliza fetchTTS/Vercel con fallback speechSynthesis (patrón SRS)
    // v9.4: si ✨ Karaoke está ON y la lectura sale de una línea del lector,
    // KARA ilumina sus caracteres al ritmo del audio (prepare → with*).
    let lqAudio = null;
    // v9.11: play/pausa del parlante de lecciones — el 2.º toque sobre el
    // MISMO botón pausa, el 3.º reanuda. Icono: 🔊 reposo · ⏸ sonando · ▶️ pausado.
    // lqTok descarta respuestas TTS viejas si mientras tanto sonó otra línea.
    let lqTtsU = null;                                   // utterance activa (fallback voz sistema)
    let lqPlay = { text: '', btn: null, state: 'idle' }; // 'idle' | 'playing' | 'paused'
    let lqTok = 0;
    function setSayIcon(btn, st) {
        if (!btn) return;
        if (btn.id === 'lq-speak') btn.textContent = st === 'playing' ? '⏸ Pausar' : (st === 'paused' ? '▶️ Seguir' : '🔊 Escuchar');
        else btn.textContent = st === 'playing' ? '⏸' : (st === 'paused' ? '▶️' : '🔊');
    }
    async function speakZh(text, btn) {
        const karaLine = (btn && btn.closest) ? btn.closest('.lq-line') : null;
        // v9.11: mismo botón + mismo texto → 2.º toque pausa, 3.º reanuda
        if (btn && btn === lqPlay.btn && lqPlay.text === text && lqPlay.state !== 'idle') {
            if (lqPlay.state === 'playing') {
                if (lqAudio) lqAudio.pause();
                else if (lqTtsU) { try { speechSynthesis.pause(); } catch (e0) { } }
                lqPlay.state = 'paused';
                setSayIcon(btn, 'paused');
            } else {
                if (lqAudio) {
                    try { await lqAudio.play(); lqPlay.state = 'playing'; } catch (e0) { lqPlay.state = 'idle'; }
                } else if (lqTtsU) {
                    try { speechSynthesis.resume(); lqPlay.state = 'playing'; } catch (e0) { }
                }
                setSayIcon(btn, lqPlay.state === 'playing' ? 'playing' : 'idle');
            }
            return;
        }
        const myTok = ++lqTok;
        try {
            if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
            if (lqAudio) { lqAudio.pause(); lqAudio = null; }
            lqTtsU = null;
            if (lqPlay.btn && lqPlay.btn !== btn) setSayIcon(lqPlay.btn, 'idle'); // apaga el ícono del botón anterior
            lqPlay = { text: '', btn: null, state: 'idle' };
            KARA.stop(); // nueva lectura → limpia el resaltado anterior
            if (btn) { btn.disabled = true; btn.classList.add('lq-loading'); }
            const resp = await fetchTTS(ttsBody(text, ttsLangFor('zh', voiceZh), voiceZh), 12000); // v9.40: +speed · v9.49: 🇹🇼 → zh-TW
            if (myTok !== lqTok) return; // mientras tanto sonó otra línea → descartar
            if (!resp.ok) throw new Error('TTS http ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('TTS sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            lqAudio = new Audio(url);
            // v9.3: la lectura respeta la velocidad elegida (⚡ arriba) Y con
            // preservesPitch la voz sigue natural a 0.85x/0.7x. Se re-afirma
            // en 'playing' porque iOS Safari puede resetear el rate al cargar.
            try { lqAudio.preservesPitch = true; lqAudio.webkitPreservesPitch = true; } catch (e2) { }
            // v9.40: el server sintetiza la velocidad (sin eco); con api viejo
            // applyTtsSpeed cae al playbackRate clásico. Se re-afirma en 'playing'
            // porque iOS Safari puede resetear el rate al cargar.
            applyTtsSpeed(lqAudio, data);
            lqAudio.addEventListener('playing', () => {
                applyTtsSpeed(lqAudio, data);
            }, { once: true });
            KARA.prepare(karaLine); // v9.4: karaoke (no-op si está OFF)
            lqPlay = { text, btn, state: 'playing' };
            await lqAudio.play();
            if (myTok !== lqTok) { lqAudio.pause(); return; }
            setSayIcon(btn, 'playing');
            KARA.withAudio(lqAudio, text); // pausar el <audio> congela el resaltado; al reanudar sigue
            const finLq = () => { URL.revokeObjectURL(url); lqAudio = null; if (lqPlay.btn === btn) { lqPlay.state = 'idle'; setSayIcon(btn, 'idle'); } };
            lqAudio.onended = finLq;
            lqAudio.onerror = finLq;
        } catch (e) {
            // fallback: voz del sistema
            KARA.stop(); // el audio del API no arrancó → limpia el estado
            if (myTok !== lqTok) return;
            try {
                if ('speechSynthesis' in window) {
                    speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(text);
                    u.lang = ttsLangFor('zh', voiceZh); // v9.49: 🇹🇼 → zh-TW
                    u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                    const sv = (typeof sysVoiceFor === 'function') ? sysVoiceFor(ttsLangFor('zh', voiceZh), voiceZh) : null;
                    if (sv) u.voice = sv;
                    KARA.prepare(karaLine); // v9.4: karaoke también con la voz del sistema
                    lqPlay = { text, btn, state: 'playing' };
                    lqTtsU = u;
                    setSayIcon(btn, 'playing');
                    u.onend = () => { if (lqTtsU === u) lqTtsU = null; if (lqPlay.btn === btn) { lqPlay.state = 'idle'; setSayIcon(btn, 'idle'); } };
                    speechSynthesis.speak(u);
                    KARA.withTts(u, text, u.rate);
                }
            } catch (e2) { /* silencioso */ }
        } finally {
            if (btn) { btn.disabled = false; btn.classList.remove('lq-loading'); }
        }
    }
    function stopSpeak() {
        if (lqAudio) { lqAudio.pause(); lqAudio = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { }
        lqTtsU = null;
        lqTok++; // descarta cualquier descarga TTS en vuelo (cambió la vista)
        if (lqPlay.btn) setSayIcon(lqPlay.btn, 'idle');
        lqPlay = { text: '', btn: null, state: 'idle' };
        KARA.stop(); // v9.4: apaga el resaltado al cortar la lectura
    }

    // ── lista de lecciones ──
    function renderList() {
        const wrap = $('lesson-list');
        if (!wrap) return;
        const filt = wrap.dataset.level || 'all';
        // v9.6b: accesos paralelos HSK / TOCFL. Los chips 'tocfl:XX' filtran
        // por examen+nivel (A1/A2/B1/B2/C1); los chips HSK muestran SOLO
        // lecciones sin exam — cada examen tiene su propia fila de accesos.
        const tocflLvl = filt.indexOf('tocfl:') === 0 ? filt.slice(6) : null;
        wrap.innerHTML = '';
        LESSONS.filter(l => filt === 'all' ||
            (tocflLvl
                ? (l.exam === 'TOCFL' && String(l.examLvl || '') === tocflLvl)
                : (!l.exam && String(l.hsk) === filt))).forEach(l => {
            const p = progOf(l.id);
            const best = (p.best != null) ? p.best + '/10' : '—';
            const flag = p.completed ? ' <span class="lq-done">✓ completada</span>' : '';
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.innerHTML =
                '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">' + l.emoji + '</span>' +
                '<span class="lc-hsk">' + (l.exam ? escHtml(l.exam + ' ' + (l.examLvl || l.hsk)) : 'HSK ' + l.hsk) + '</span>' +
                '<span class="lc-best">🎯 ' + best + flag + '</span></div>' +
                '<div class="lc-titles"><span class="lc-zh">' + escHtml(l.titleZh) + '</span>' +
                '<span class="lc-es">' + escHtml(l.titleEs) + '</span></div>' +
                '<p class="lc-blurb">' + escHtml(l.blurb) + '</p>' +
                '<div class="lc-meta">' + l.lines.length + ' líneas · ' + l.quiz.length + ' ejercicios</div>' +
                '<div class="lc-actions">' +
                '<button type="button" class="lq-btn lc-read" data-act="read" data-id="' + l.id + '">📖 Leer</button>' +
                '<button type="button" class="lq-btn lc-practice" data-act="practice" data-id="' + l.id + '">🎯 Practicar</button>' +
                '</div>';
            wrap.appendChild(card);
        });
    }

    // v9.6b: accesos TOCFL junto a los de HSK — un chip por nivel TOCFL
    // presente en los datos (A1 → C1), tras un separador · que divide la
    // fila HSK de la fila TOCFL. Se generan SOLO los niveles con lecciones:
    // agregar un mini-drama nuevo con examLvl 'B2' crea su chip solo,
    // sin tocar el HTML. Si no hay lecciones TOCFL, no se dibuja nada.
    const TOCFL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1'];
    function buildTocflChips() {
        const chips = $('lesson-levels');
        if (!chips) return;
        const lvls = [];
        LESSONS.forEach(l => {
            if (!l || l.exam !== 'TOCFL' || !l.examLvl) return;
            const v = String(l.examLvl);
            if (lvls.indexOf(v) === -1) lvls.push(v);
        });
        if (!lvls.length) return;
        lvls.sort((a, b) => {
            const ia = TOCFL_ORDER.indexOf(a), ib = TOCFL_ORDER.indexOf(b);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
        const sep = document.createElement('span');
        sep.className = 'lv-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '·';
        chips.appendChild(sep);
        lvls.forEach(v => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'lv-chip lv-chip-tocfl';
            b.dataset.level = 'tocfl:' + v;
            b.setAttribute('aria-label', 'Filtrar lecciones TOCFL ' + v);
            b.textContent = 'TOCFL ' + v;
            chips.appendChild(b);
        });
    }

    function bindList() {
        const wrap = $('lesson-list');
        if (!wrap) return;
        wrap.addEventListener('click', (e) => {
            const btn = e.target.closest('.lq-btn[data-act]');
            if (!btn) return;
            const l = LESSONS.find(x => x.id === btn.dataset.id);
            if (!l) return;
            if (btn.dataset.act === 'read') openStory(l);
            else openQuiz(l);
        });
        const chips = $('lesson-levels');
        if (chips) chips.addEventListener('click', (e) => {
            const chip = e.target.closest('.lv-chip');
            if (!chip) return;
            chips.querySelectorAll('.lv-chip').forEach(c => c.classList.toggle('active', c === chip));
            wrap.dataset.level = chip.dataset.level;
            renderList();
        });
    }

    // ── overlay: abrir/cerrar ──
    function openPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closePop() {
        stopSpeak();
        pop.classList.add('hidden');
        syncBodyScroll(); // v9.50
        S.lesson = null; S.view = null;
        renderList(); // refresca el mejor puntaje
    }
    function bindPop() {
        $('lq-close').addEventListener('click', closePop);
        pop.addEventListener('click', (e) => {
            if (e === null) return;
            const t = e.target;
            if (t === pop) closePop();                 // clic en el fondo
            if (t.closest && t.closest('#lq-close')) return;
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden') && !topLayerOpen()) closePop(); // v9.50: si hay una capa encima, esa cierra primero
        });
    }

    // ── vista LECTURA ──
    function openStory(l) {
        S.lesson = l; S.view = 'story'; S.pinyin = false;
        openPop();
        progNum.textContent = '📖';
        segs.innerHTML = '';
        const k = zhKey();
        const lines = l.lines.map((ln, i) => {
            const zh = (k === 'trad' ? ln.zhT : ln.zh);
            return '<div class="lq-line" data-i="' + i + '" role="button" tabindex="0" title="Tocá un carácter para verlo · 🔊 para escuchar la línea">' +
                '<div class="lq-line-zh">' + zhCharsHtml(zh) + '</div>' +
                '<button type="button" class="lq-line-say" data-zh="' + escHtml(zh) + '" aria-label="Escuchar la línea">🔊</button>' +
                '<div class="lq-line-py hidden" data-zh="' + escHtml(ln.zh) + '"></div>' +
                '<div class="lq-line-es' + (verEs ? '' : ' hidden') + '">' + escHtml(ln.es) + '</div></div>';
        }).join('');
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + l.emoji + '</span>' +
            '<div><div class="lq-story-zh">' + escHtml(k === 'trad' ? (l.titleZhT || l.titleZh) : l.titleZh) + '</div>' +
            '<div class="lq-story-es">' + escHtml(l.titleEs) + ' · ' + (l.exam ? escHtml(l.exam + ' ' + (l.examLvl || l.hsk)) : 'HSK ' + l.hsk) + '</div></div></div>' +
            '<p class="lq-blurb">' + escHtml(l.blurb) + '</p>' +
            '<div class="lq-lines">' + lines + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-es">🇪🇸 Español: ' + (verEs ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-pinyin">🔤 Pinyin: OFF</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-speed">⚡ …</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-kara">✨ Karaoke: ' + (KARA.on() ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-story-practice">🎯 Practicar ' + l.quiz.length + '</button>' +
            '</div>';
        bindSpeedChip(body.querySelector('#lq-story-speed'));
        body.querySelector('#lq-story-kara').addEventListener('click', (e) => {
            // v9.4: karaoke de lectura — apagado por defecto, persistente;
            // el cambio vale para la próxima línea escuchada.
            const v = !KARA.on();
            try { localStorage.setItem('ac_karaoke', v ? '1' : '0'); } catch (e2) { }
            if (!v) KARA.stop();
            e.target.textContent = '✨ Karaoke: ' + (v ? 'ON' : 'OFF');
        });
        body.querySelector('#lq-story-practice').addEventListener('click', () => openQuiz(l));
        body.querySelector('#lq-story-es').addEventListener('click', (e) => {
            setVerEs(!verEs);
            e.target.textContent = '🇪🇸 Español: ' + (verEs ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-es').forEach(el => el.classList.toggle('hidden', !verEs));
        });
        body.querySelector('#lq-story-pinyin').addEventListener('click', (e) => {
            S.pinyin = !S.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-py').forEach(el => {
                if (S.pinyin && !el.textContent) el.textContent = pyLine(el.dataset.zh);
                el.classList.toggle('hidden', !S.pinyin);
            });
        });
        body.querySelector('.lq-lines').addEventListener('click', (e) => {
            // v9.11: SOLO el botón 🔊 de la línea reproduce audio — tocar el
            // panel de la oración ya NO dispara lectura (pedido del usuario).
            // Los caracteres tocados siguen abriendo su ficha en el popup.
            const say = e.target.closest('.lq-line-say');
            if (say) { speakZh(say.dataset.zh, say); return; }
            const chEl = e.target.closest('.lq-ch');
            if (chEl && typeof showVocabPop === 'function') { showVocabPop(chEl.dataset.ch); }
        });
    }
    // ── vista PRÁCTICA ──
    function openQuiz(l) {
        S.lesson = l; S.view = 'quiz'; S.idx = 0; S.results = new Array(l.quiz.length).fill(null);
        // mezcla por sesión: los datos traen opts[0]=correcta; el orden visible
        // se baraja acá para que la posición de la correcta no sea predecible.
        S.order = l.quiz.map(() => {
            const d = [0, 1, 2];
            for (let i = d.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [d[i], d[j]] = [d[j], d[i]];
            }
            return d;
        });
        openPop();
        renderQuestion();
    }
    function renderSegments() {
        segs.innerHTML = S.results.map(r =>
            '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : '') + '"></span>').join('');
    }
    function renderQuestion() {
        const l = S.lesson, q = l.quiz[S.idx], ord = S.order[S.idx];
        S.answered = false;
        progNum.textContent = (S.idx + 1) + '/' + l.quiz.length;
        renderSegments();
        const k = zhKey();
        const zhFull = (k === 'trad' ? q.zhT : q.zh);
        const parts = zhFull.split('___');
        const zhHtml = escHtml(parts[0]) + '<span class="lq-blank" id="lq-blank">？</span>' + escHtml(parts[1] || '');
        const rightPos = ord.indexOf(0); // posición visible de la correcta
        const opts = ord.map((dataIdx, pos) => {
            const o = q.opts[dataIdx];
            const zh = (k === 'trad' && o.t) ? o.t : o.z;
            return '<button type="button" class="lq-opt" data-pos="' + pos + '"><span class="lq-opt-letter">' +
                'ABC'[pos] + '</span><span class="lq-opt-zh">' + escHtml(zh) + '</span></button>';
        }).join('');
        body.innerHTML =
            '<div class="lq-tag-row"><div class="lq-lesson-tag">' + l.emoji + ' ' + escHtml(l.titleEs) + '</div>' +
            '<button type="button" class="lq-btn lq-ghost lq-mini" id="lq-es-toggle">🇪🇸 Traducción: ' + (verEs ? 'ON' : 'OFF') + '</button></div>' +
            '<div class="lq-zh" id="lq-zh">' + zhHtml + '</div>' +
            '<div class="lq-es-box' + (verEs ? '' : ' hidden') + '" id="lq-es-box">' + escHtml(q.es) + '</div>' +
            '<div class="lq-opts" id="lq-opts">' + opts + '</div>' +
            '<div class="lq-feedback hidden" id="lq-feedback"></div>' +
            '<div class="lq-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-speak">🔊 Escuchar</button>' +
            '<button type="button" class="lq-btn lq-primary hidden" id="lq-next">Siguiente ▶</button>' +
            '</div>';
        body.querySelector('#lq-speak').addEventListener('click', (e) =>
            speakZh(zhFull.replace('___', q.opts[0].z), e.target));
        body.querySelector('#lq-es-toggle').addEventListener('click', (e) => {
            setVerEs(!verEs);
            e.target.textContent = '🇪🇸 Traducción: ' + (verEs ? 'ON' : 'OFF');
            const box = body.querySelector('#lq-es-box');
            if (box) box.classList.toggle('hidden', !verEs);
        });
        body.querySelector('#lq-opts').addEventListener('click', (e) => {
            const b = e.target.closest('.lq-opt');
            if (b && !S.answered) answer(+b.dataset.pos);
        });
        body.querySelector('#lq-next').addEventListener('click', next);
    }
    function wordCard(o, label, cls) {
        // ficha de palabra: hanzi con colores de tono + pinyin + 🔊 + significados
        let zhHtml = escHtml(o.z);
        try {
            if (typeof showToneColors !== 'undefined' && showToneColors && typeof pinyinPro !== 'undefined') {
                zhHtml = pinyinPro.pinyin(o.z, { type: 'all' }).map(it =>
                    it.isZh ? '<span class="tone-' + (it.num || 5) + '">' + escHtml(it.origin) + '</span>' : escHtml(it.origin)).join('');
            }
        } catch (e) { /* plano */ }
        const meanings = ['<li>' + escHtml(o.e) + '</li>'].concat((o.a || []).map(a => '<li>' + escHtml(a) + '</li>')).join('');
        return '<div class="lq-card ' + cls + '"><div class="lq-card-label">' + label + '</div>' +
            '<div class="lq-card-zh">' + zhHtml + '</div>' +
            '<div class="lq-card-py">' + escHtml(o.p) + ' <button type="button" class="lq-say" data-zh="' + escHtml(o.z) + '" aria-label="Escuchar palabra">🔊</button></div>' +
            '<ul class="lq-card-es">' + meanings + '</ul></div>';
    }
    function answer(pos) {
        const l = S.lesson, q = l.quiz[S.idx], ord = S.order[S.idx];
        S.answered = true;
        const dataIdx = ord[pos];
        const ok = dataIdx === 0;
        S.results[S.idx] = ok;
        renderSegments();
        // rellena el hueco con lo elegido y marca las opciones
        const blank = body.querySelector('#lq-blank');
        const k = zhKey();
        const chosen = q.opts[dataIdx], right = q.opts[0];
        if (blank) {
            blank.textContent = (k === 'trad' && chosen.t) ? chosen.t : chosen.z;
            blank.classList.add(ok ? 'fill-ok' : 'fill-bad');
        }
        body.querySelectorAll('.lq-opt').forEach((b, bi) => {
            b.disabled = true;
            if (bi === ord.indexOf(0)) b.classList.add('is-right');
            else if (bi === pos) b.classList.add('is-wrong');
        });
        // feedback: correcto → una tarjeta; error → tu respuesta vs correcta
        let fb;
        if (ok) {
            fb = '<div class="lq-verdict ok">✓ ¡Correcto!</div>' + wordCard(right, 'LA PALABRA', 'lq-card-green');
        } else {
            fb = '<div class="lq-verdict bad">✗ Casi — repasala en tu mazo</div>' +
                '<div class="lq-cards">' + wordCard(chosen, 'TU RESPUESTA', 'lq-card-red') +
                wordCard(right, 'RESPUESTA CORRECTA', 'lq-card-green') + '</div>';
        }
        const fbel = body.querySelector('#lq-feedback');
        fbel.innerHTML = fb;
        fbel.classList.remove('hidden');
        // bookkeeping idéntico al motor principal (identidad = hanzi simplificado)
        if (ok) {
            if (typeof state !== 'undefined') {
                state.knownWords.add(right.z);
                state.newWords.delete(right.z);
            }
        } else {
            if (typeof state !== 'undefined') state.newWords.add(right.z);
            if (typeof window.acSrsMiss === 'function') {
                window.acSrsMiss({
                    w: 1, module: 'Lección ' + l.titleEs, level: l.hsk,
                    chinese_simp_answer: right.z, chinese_trad_answer: right.t || right.z,
                    spanish_answer: right.e, spanish_alternatives: right.a || null,
                    spanish_full: q.es, chinese_simp_full: q.zh, pinyin: right.p
                });
            }
        }
        try { saveProgress(); updateStats(); updateVocabularyPanel(); } catch (e) { }
        // botón siguiente (o terminar)
        const nx = body.querySelector('#lq-next');
        nx.classList.remove('hidden');
        if (S.idx === l.quiz.length - 1) nx.textContent = 'Ver resultado 🏁';
    }
    function next() {
        const l = S.lesson;
        if (S.idx < l.quiz.length - 1) { S.idx++; renderQuestion(); return; }
        // resultado final
        const score = S.results.filter(Boolean).length;
        const prev = progOf(l.id);
        LB[l.id] = {
            best: Math.max(prev.best || 0, score),
            completed: true,
            last: localDay()
        };
        saveLB();
        progNum.textContent = '🏁';
        segs.innerHTML = '';
        const msg = score === 10 ? '¡Perfecto! Diez de diez.' :
            score >= 7 ? '¡Muy bien! La historia ya es tuya.' :
                'Buen intento. Leé la historia otra vez y repetí.';
        body.innerHTML =
            '<div class="lq-final">' +
            '<div class="lq-final-emoji">' + l.emoji + '</div>' +
            '<div class="lq-final-score">' + score + '/' + l.quiz.length + '</div>' +
            '<div class="lq-final-msg">' + msg + '</div>' +
            '<div class="lq-final-actions">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-final-read">📖 Leer la historia</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-final-retry">🔁 Repetir práctica</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-final-close">Seguir ✕</button>' +
            '</div></div>';
        body.querySelector('#lq-final-read').addEventListener('click', () => openStory(l));
        body.querySelector('#lq-final-retry').addEventListener('click', () => openQuiz(l));
        body.querySelector('#lq-final-close').addEventListener('click', closePop);
    }

    // ── arranque ──
    function boot() {
        buildTocflChips(); // v9.6b: crea los accesos TOCFL junto a los HSK
        bindList();
        bindPop();
        renderList();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    // API de solo lectura para pruebas E2E
    window.LQ_DEBUG = {
        get lessons() { return LESSONS.length; },
        get state() { return { view: S.view, idx: S.idx, answered: S.answered, results: S.results.slice() }; },
        get rightPos() { return (S.view === 'quiz' && S.order) ? S.order[S.idx].indexOf(0) : -1; }
    };
})();
