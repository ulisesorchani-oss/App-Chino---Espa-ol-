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
// v9.66: antes de la vista LECTURA, un paso corto y salteable con 3-5
// palabras clave de esa misma lección (renderGlossary/extractKeyWords,
// dict.js) — pre-entrenamiento (Mayer #7): activar el vocabulario antes
// de leer el mini-drama completo, sin curar contenido nuevo a mano.
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js (usa KARA, el karaoke que
// sigue en app.js, escHtml de reader.js, fetchTTS/voiceZh/etc. de
// audio-tts.js, extractKeyWords de dict.js y window.acSrsMiss de
// srs.js, todo en tiempo de ejecución).
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

    // ── LECTURAS tipo examen (window.READINGS, readings-*.js) ──
    // Mismo visor que las lecciones (texto tocable, glosario, audio, karaoke) +
    // preguntas de comprensión con el texto a la vista. Progreso aparte
    // ('ac_reading_v1'): comprensión no se mezcla con los huecos de ac_lessons_v1.
    const RKEY = 'ac_reading_v1';
    let RB = {};
    try { RB = JSON.parse(localStorage.getItem(RKEY) || '{}') || {}; } catch (e) { RB = {}; }
    const saveRB = () => { try { localStorage.setItem(RKEY, JSON.stringify(RB)); } catch (e) { } };
    const READS = () => (Array.isArray(window.READINGS) ? window.READINGS : []);
    const isRd = (l) => !!l && l.kind === 'reading';
    const nPractice = (l) => isRd(l) ? l.questions.length : l.quiz.length;

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
    // v9.7x: palabra del diccionario que contiene el carácter tocado (公 o 園
    // de 公園 → 公園). Si la palabra no está en el diccionario, null → carácter.
    function lqWordAt(chEl) {
        const line = chEl.closest('.lq-line');
        const say = line && line.querySelector('.lq-line-say');
        const text = say ? say.dataset.zh : '';
        const o = parseInt(chEl.dataset.o, 10);
        if (!text || isNaN(o) || typeof zhSegmentAll !== 'function') return null;
        let pos = 0;
        for (const s of zhSegmentAll(text)) {
            if (o >= pos && o < pos + s.length) {
                return (s.length > 1 && typeof zhIsDictWord === 'function' && zhIsDictWord(s)) ? s : null;
            }
            pos += s.length;
        }
        return null;
    }
    function zhCharsHtml(zh) {
        // v9.7x: data-o = posición en la línea, para que el toque abra la PALABRA
        // (los spans siguen siendo por carácter: el karaoke no cambia).
        return String(zh == null ? '' : zh).split('').map((ch, o) =>
            LQ_RE_HANZI.test(ch)
                ? '<span class="lq-ch" data-ch="' + escHtml(ch) + '" data-o="' + o + '">' + escHtml(ch) + '</span>'
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
    // v9.7x: escritura de una lección puntual (la lista muestra TOCFL y HSK a la vez)
    const lessonScript = (l) => (typeof scriptFor === 'function') ? scriptFor(l) : zhKey();
    // v9.7x: pinyin según la familia de la lección abierta (pinyinFor en
    // pinyin-familias.js: TOCFL = lista TOCFL; HSK y el resto = pinyin-pro).
    const pyLine = (zh) => {
        try {
            if (typeof pinyinFor === 'function') return pinyinFor(zh, S.lesson);
            return (typeof pinyinPro !== 'undefined') ? pinyinPro.pinyin(zh) : '';
        } catch (e) { return ''; }
    };
    // v9.7x: la tabla TOCFL se carga la primera vez que una lección TOCFL pide pinyin
    const pyReady = (l) => (typeof ensureTocflPinyin === 'function' && typeof familyOf === 'function' && familyOf(l) === 'tocfl')
        ? ensureTocflPinyin() : Promise.resolve(true);

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
        // v9.7x: voz según la familia de la lección (TOCFL → 🇹🇼 si no se eligió otra)
        const vz = (typeof voiceZhFor === 'function') ? voiceZhFor(S.lesson) : voiceZh;
        try {
            if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
            if (lqAudio) { lqAudio.pause(); lqAudio = null; }
            lqTtsU = null;
            if (lqPlay.btn && lqPlay.btn !== btn) setSayIcon(lqPlay.btn, 'idle'); // apaga el ícono del botón anterior
            lqPlay = { text: '', btn: null, state: 'idle' };
            KARA.stop(); // nueva lectura → limpia el resaltado anterior
            if (btn) { btn.disabled = true; btn.classList.add('lq-loading'); }
            const resp = await fetchTTS(ttsBody(text, ttsLangFor('zh', vz), vz), 12000); // v9.40: +speed · v9.49: 🇹🇼 → zh-TW
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
                    u.lang = ttsLangFor('zh', vz); // v9.49: 🇹🇼 → zh-TW
                    u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                    const sv = (typeof sysVoiceFor === 'function') ? sysVoiceFor(ttsLangFor('zh', vz), vz) : null;
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
        const filt = wrap.dataset.level || '1';
        // v9.6b: accesos paralelos HSK / TOCFL. Los chips 'tocfl:XX' filtran
        // por examen+nivel (A1/A2/B1/B2/C1); los chips HSK muestran SOLO
        // lecciones sin exam — cada examen tiene su propia fila de accesos.
        // v9.7x: '7-9' es el chip HSK avanzado (reservado, sin lecciones
        // todavía) — agrupa los tres niveles bajo un solo acceso.
        const tocflLvl = filt.indexOf('tocfl:') === 0 ? filt.slice(6) : null;
        const hskAdvanced = filt === '7-9';
        wrap.innerHTML = '';
        const filtered = LESSONS.filter(l => {
            if (tocflLvl) return l.exam === 'TOCFL' && String(l.examLvl || '') === tocflLvl;
            if (hskAdvanced) return !l.exam && ['7', '8', '9'].indexOf(String(l.hsk)) !== -1;
            return !l.exam && String(l.hsk) === filt;
        });
        if (!filtered.length) {
            wrap.innerHTML = '<p class="lessons-intro">📭 Todavía no hay lecciones en este nivel — queda reservado para cuando se sumen.</p>';
            return;
        }
        filtered.forEach(l => {
            const p = progOf(l.id);
            const best = (p.best != null) ? p.best + '/10' : '—';
            const flag = p.completed ? ' <span class="lq-done">✓ completada</span>' : '';
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.innerHTML =
                '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">' + l.emoji + '</span>' +
                '<span class="lc-hsk">' + escHtml(lessonTag(l)) + '</span>' +
                '<span class="lc-best">🎯 ' + best + flag + '</span></div>' +
                '<div class="lc-titles"><span class="lc-zh">' + escHtml(lessonScript(l) === 'trad' ? (l.titleZhT || l.titleZh) : l.titleZh) + '</span>' +
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

    // v9.6b: accesos TOCFL junto a los de HSK.
    // v9.7x: ya NO depende de qué niveles tengan lecciones — se ofrecen
    // los 6 siempre (準備→流利), igual que HSK ofrece 7-9 aunque todavía no
    // tenga contenido. Un nivel sin lecciones muestra el estado vacío.
    // v9.7x: antes eran chips; ahora son las opciones del <select> TOCFL
    // (#sel-lv-tocfl), con el mismo valor 'tocfl:XX' que lee renderList.
    const TOCFL_ORDER = ['Prep', 'A1', 'A2', 'B1', 'B2', 'C1'];
    // v9.7x: nombre VISIBLE del nivel (nomenclatura única: el C cubre C1-C2);
    // el valor guardado ('tocfl:C1') y el examLvl de los datos no cambian.
    const TOCFL_LABEL = { C1: 'C' };
    const tocflLvlLabel = (v) => TOCFL_LABEL[v] || v;
    const lessonTag = (l) => isRd(l) ? 'Lectura · ' + (l.exam === 'TOCFL' ? 'TOCFL ' + tocflLvlLabel(l.examLvl || '') : 'HSK ' + l.hsk) + ' (aprox.)' : l.exam ? (l.exam + ' ' + (l.exam === 'TOCFL' ? tocflLvlLabel(l.examLvl || '') : (l.examLvl || l.hsk))) : 'HSK ' + l.hsk;
    function buildTocflOptions() {
        const sel = $('sel-lv-tocfl');
        if (!sel) return;
        TOCFL_ORDER.forEach(v => {
            const o = document.createElement('option');
            o.value = 'tocfl:' + v;
            o.textContent = tocflLvlLabel(v); // v9.7x: sin "TOCFL " (lo dice la etiqueta chica de arriba)
            sel.appendChild(o);
        });
    }

    // v9.7x: recordar el último nivel elegido en Lecciones. Solo se APLICA
    // al cargar (antes del primer renderList) y solo si coincide con una
    // opción real de los <select>; si no, queda el data-level del HTML ('1').
    const LEVEL_KEY = 'ac_lesson_level';
    function restoreLevel() {
        const wrap = $('lesson-list');
        let v = null;
        try { v = localStorage.getItem(LEVEL_KEY); } catch (e) { /* sin storage */ }
        if (!wrap || !v) return;
        const ok = ['sel-lv-hsk', 'sel-lv-tocfl'].some(id => {
            const s = $(id);
            return s && Array.from(s.options).some(o => o.value === v && !o.disabled);
        });
        if (ok) wrap.dataset.level = v;
    }

    // v9.7x: los dos <select> (HSK / TOCFL) REFLEJAN data-level de
    // #lesson-list, la única fuente de verdad del nivel. El del examen
    // activo muestra el nivel y queda resaltado (.on); el otro vuelve a su
    // placeholder deshabilitado (el rango: "1–9" / "Prep–C"), que no se puede elegir.
    function syncLevelSelects() {
        const wrap = $('lesson-list');
        const sh = $('sel-lv-hsk'), st = $('sel-lv-tocfl');
        if (!wrap || !sh || !st) return;
        const lv = wrap.dataset.level || '1';
        const isT = lv.indexOf('tocfl:') === 0;
        sh.value = isT ? '' : lv;
        st.value = isT ? lv : '';
        sh.parentNode.classList.toggle('on', !isT);
        st.parentNode.classList.toggle('on', isT);
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
        // v9.7x: elegir en cualquiera de los dos <select> cambia data-level
        // (igual que antes el chip) y re-arma la lista, sin cambiar de pestaña.
        ['sel-lv-hsk', 'sel-lv-tocfl'].forEach(id => {
            const sel = $(id);
            if (sel) sel.addEventListener('change', () => {
                if (!sel.value) return;
                wrap.dataset.level = sel.value;
                try { localStorage.setItem(LEVEL_KEY, sel.value); } catch (e) { /* sin storage: no se recuerda */ }
                renderList();
            });
        });
        // Si cualquier otro código cambia data-level, los <select> lo siguen.
        new MutationObserver(syncLevelSelects).observe(wrap, { attributes: true, attributeFilter: ['data-level'] });
        syncLevelSelects();
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
        window.acScriptRef = null; // v9.7x: vuelve el contexto de Hoy
        renderList(); // refresca el mejor puntaje
        document.dispatchEvent(new Event('ac-reading-change')); // la lista de Exámenes refresca su puntaje
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

    // ── vista GLOSARIO (v9.66, Mayer #7 — pre-entrenamiento) ──
    // Paso corto y salteable ANTES de la historia completa, con 3-5
    // palabras clave extraídas de la propia lección (extractKeyWords,
    // dict.js) — sin curar contenido nuevo a mano.
    function renderGlossary(l, keyWords) {
        const k = zhKey();
        let html = '<div class="lq-story-head"><span class="lq-story-emoji">' + l.emoji + '</span>' +
            '<div><div class="lq-story-zh">' + escHtml(k === 'trad' ? (l.titleZhT || l.titleZh) : l.titleZh) + '</div>' +
            '<div class="lq-story-es">' + escHtml(l.titleEs) + '</div></div></div>' +
            '<p class="lq-blurb">Antes de leer, estas son algunas palabras clave de la historia:</p>' +
            '<div class="lq-glossary">' +
            keyWords.map(kw =>
                '<div class="lq-gloss-item">' +
                '<span class="lq-gloss-zh" lang="zh">' + escHtml(kw.zh) + '</span>' +
                '<span class="lq-gloss-py">' + escHtml(kw.pyFix || pyLine(kw.zhS || kw.zh) || kw.py) + '</span>' +
                '<span class="lq-gloss-es">' + escHtml(kw.es) + '</span>' +
                '</div>'
            ).join('') +
            '</div>' +
            '<div class="lq-gloss-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-gloss-skip">Saltar</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-gloss-continue">Leer la historia →</button>' +
            '</div>';
        body.innerHTML = html;
        const skip = $('lq-gloss-skip'), cont = $('lq-gloss-continue');
        if (skip) skip.addEventListener('click', () => renderStory(l));
        if (cont) cont.addEventListener('click', () => renderStory(l));
    }

    // R8: líneas del texto (tocables, con 🔊, pinyin y traducción ocultos) — las usan la lectura de
    // lecciones, la de lecturas y el texto que queda a la vista al responder.
    function linesHtml(l, withEs) {
        const k = zhKey();
        // v9.7x: hablantes (who/whoT opcionales) — etiqueta chica arriba de la
        // línea, FUERA de .lq-line-zh: no entra en el karaoke, ni en el audio,
        // ni en el glosario o el quiz. Color por persona (orden de aparición;
        // hasta 4 colores: las lecciones C1 tienen 3 y 4 personas).
        const WHO_CLS = ['a', 'b', 'c', 'd'];
        const whoIdx = new Map();
        l.lines.forEach(ln => { if (ln.who && !whoIdx.has(ln.who)) whoIdx.set(ln.who, WHO_CLS[whoIdx.size % WHO_CLS.length]); });
        const lines = l.lines.map((ln, i) => {
            const zh = (k === 'trad' ? ln.zhT : ln.zh);
            const who = ln.who ? (k === 'trad' ? (ln.whoT || ln.who) : ln.who) : '';
            const whoHtml = who
                ? '<div class="lq-line-who lq-who-' + whoIdx.get(ln.who) + '"><span lang="zh">' + escHtml(who) + '</span>' +
                  '<span class="lq-who-py hidden" data-zh="' + escHtml(ln.who) + '"></span></div>'
                : '';
            return '<div class="lq-line" data-i="' + i + '" role="button" tabindex="0" title="Tocá un carácter para verlo · 🔊 para escuchar la línea">' +
                whoHtml +
                '<div class="lq-line-zh">' + zhCharsHtml(zh) + '</div>' +
                '<button type="button" class="lq-line-say" data-zh="' + escHtml(zh) + '" aria-label="Escuchar la línea">🔊</button>' +
                '<div class="lq-line-py hidden" data-zh="' + escHtml(ln.zh) + '"></div>' +
                '<div class="lq-line-es' + (withEs ? '' : ' hidden') + '">' + escHtml(ln.es) + '</div></div>';
        }).join('');
        return lines;
    }
    // clic en un carácter (ficha de palabra) o en 🔊 (audio de la línea); S.lesson fija voz y pinyin
    function bindLines(root) {
        root.addEventListener('click', (e) => {
            // v9.11: SOLO el botón 🔊 de la línea reproduce audio — tocar el
            // panel de la oración ya NO dispara lectura (pedido del usuario).
            // Los caracteres tocados siguen abriendo su ficha en el popup.
            const say = e.target.closest('.lq-line-say');
            if (say) { speakZh(say.dataset.zh, say); return; }
            const chEl = e.target.closest('.lq-ch');
            if (chEl && typeof showVocabPop === 'function') { showVocabPop(lqWordAt(chEl) || chEl.dataset.ch); }
        });
    }

    // ── vista LECTURA ──
    function openStory(l) {
        S.lesson = l; S.view = 'story'; S.pinyin = false;
        window.acScriptRef = l; // v9.7x: ck() = escritura de ESTA lección (scriptFor) mientras está abierta
        openPop();
        progNum.textContent = '📖';
        segs.innerHTML = '';
        // v9.70: marca la última lección ABIERTA (no solo completada, como LB) —
        // la usa podcast.js para preseleccionar "seguir con lo último que viste".
        // Storage propio, de solo lectura para quien la consulta: no es progreso,
        // no toca LB/ac_lessons_v1 ni state.
        // R8: las lecturas no son lecciones del podcast: no pisan el marcador
        if (!isRd(l)) { try { localStorage.setItem('ac_last_lesson_id', l.id); } catch (e) { /* sin storage: podcast.js no preselecciona nada */ } }
        // v9.7x: minLevel = l.hsk → descarta candidatas más básicas que el
        // nivel de la propia lección (ej. 他/一/工 en una lección HSK6), ver
        // hskLevelOf/extractKeyWords en dict.js.
        // v9.7x: si la lección trae keywords, el glosario las usa TAL CUAL (sin
        // diccionario ni corte de palabras), en la escritura elegida y con la
        // glosa escrita para esa lección; py solo para excepciones.
        const keyWords = (Array.isArray(l.keywords) && l.keywords.length)
            ? l.keywords.map(kw => ({ zh: zhKey() === 'trad' ? (kw.zhT || kw.zh) : kw.zh, zhS: kw.zh, pyFix: kw.py || '', es: kw.es }))
            : (typeof extractKeyWords === 'function')
                ? extractKeyWords(l.lines.map(ln => (zhKey() === 'trad' ? (ln.zhT || ln.zh) : ln.zh)), 5, l.hsk) // v9.7x: en la escritura elegida (el diccionario busca el tradicional por alias)
                : [];
        // v9.7x: el glosario muestra pinyin generado con la misma función que el texto → espera la tabla TOCFL
        pyReady(l).then(() => {
            if (S.lesson !== l || S.view !== 'story') return; // se cerró o se cambió de lección mientras cargaba
            if (keyWords.length >= 3) renderGlossary(l, keyWords);
            else renderStory(l);
        });
    }
    function renderStory(l) {
        const k = zhKey();
        const lines = linesHtml(l, verEs);
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + l.emoji + '</span>' +
            '<div><div class="lq-story-zh">' + escHtml(k === 'trad' ? (l.titleZhT || l.titleZh) : l.titleZh) + '</div>' +
            '<div class="lq-story-es">' + escHtml(l.titleEs) + ' · ' + escHtml(lessonTag(l)) + '</div></div></div>' +
            '<p class="lq-blurb">' + escHtml(l.blurb) + '</p>' +
            '<div class="lq-lines">' + lines + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-es">🇪🇸 Español: ' + (verEs ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-pinyin">🔤 Pinyin: OFF</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-speed">⚡ …</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-kara">✨ Karaoke: ' + (KARA.on() ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-story-practice">' + (isRd(l)
                ? '🎯 Responder ' + l.questions.length + ' pregunta' + (l.questions.length === 1 ? '' : 's')
                : '🎯 Practicar ' + l.quiz.length) + '</button>' +
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
        body.querySelector('#lq-story-practice').addEventListener('click', () => (isRd(l) ? openReadingQuiz(l) : openQuiz(l)));
        body.querySelector('#lq-story-es').addEventListener('click', (e) => {
            setVerEs(!verEs);
            e.target.textContent = '🇪🇸 Español: ' + (verEs ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-es').forEach(el => el.classList.toggle('hidden', !verEs));
        });
        body.querySelector('#lq-story-pinyin').addEventListener('click', (e) => {
            S.pinyin = !S.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF');
            pyReady(l).then(() => body.querySelectorAll('.lq-line-py, .lq-who-py').forEach(el => { // v9.7x: también el nombre del hablante
                if (S.pinyin && !el.textContent) el.textContent = pyLine(el.dataset.zh);
                el.classList.toggle('hidden', !S.pinyin);
            }));
        });
        bindLines(body.querySelector('.lq-lines'));
    }
    // ── vista PRÁCTICA ──
    function openQuiz(l) {
        S.lesson = l; S.view = 'quiz'; S.idx = 0; S.results = new Array(l.quiz.length).fill(null);
        window.acScriptRef = l; // v9.7x
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


    // ═══════════════════════════════════════════════════════════════
    // R8 — LECTURAS tipo examen: preguntas de comprensión con el texto a la vista
    // -------------------------------------------------------------------
    // Reusa el visor de lecciones (linesHtml/bindLines: texto tocable, 🔊, pinyin) y el
    // mismo overlay. HSK 3: pregunta y opciones en español. Desde HSK 5: en chino, con
    // «Ver en español» (pregunta + opciones) y la traducción completa tras responder.
    // Datos: window.READINGS (readings-*.js; opts[0] = correcta). Progreso: 'ac_reading_v1'.
    // Comprensión no toca el SRS ni las palabras aprendidas (solo mide lectura).
    // ═══════════════════════════════════════════════════════════════
    const RD_TYPE = { detalle: 'Detalle', idea: 'Idea principal', inferencia: 'Inferencia', vocabulario: 'Vocabulario' };
    const rprog = (id) => RB[id] || {};
    function permOf(n) {
        const d = Array.from({ length: n }, (_, i) => i);
        for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
        return d;
    }
    function openReadingQuiz(l) {
        S.lesson = l; S.view = 'rquiz'; S.idx = 0; S.picks = [];
        S.results = new Array(l.questions.length).fill(null);
        S.order = l.questions.map(q => permOf(q.opts.length)); // la correcta (índice 0) cambia de lugar en cada sesión
        S.pinyin = false; S.rTextOpen = true;
        window.acScriptRef = l;
        openPop();
        renderReadingQ();
    }
    function renderReadingQ() {
        const l = S.lesson, q = l.questions[S.idx], ord = S.order[S.idx], k = zhKey(), n = l.questions.length;
        const zhQ = !!q.qZh; // desde HSK 5 la pregunta va en chino
        S.answered = false;
        progNum.textContent = (S.idx + 1) + '/' + n;
        renderSegments();
        const pick = (a, aT) => (k === 'trad' && aT) ? aT : a;
        const optHtml = ord.map((di, pos) =>
            '<button type="button" class="lq-opt rd-opt" data-pos="' + pos + '"><span class="lq-opt-letter">' + 'ABCD'[pos] + '</span>' +
            '<span class="rd-opt-body">' + (zhQ
                ? '<span class="rd-opt-zh" lang="zh">' + escHtml(pick(q.optsZh[di], (q.optsZhT || [])[di])) + '</span><span class="rd-opt-es hidden">' + escHtml(q.opts[di]) + '</span>'
                : '<span class="rd-opt-es">' + escHtml(q.opts[di]) + '</span>') +
            '</span></button>').join('');
        body.innerHTML =
            '<div class="lq-tag-row"><div class="lq-lesson-tag">' + l.emoji + ' ' + escHtml(l.titleEs) + '</div>' +
            '<span class="rd-approx">' + escHtml(lessonTag(l)) + ' · no oficial</span></div>' +
            '<details class="rd-text"' + (S.rTextOpen === false ? '' : ' open') + '><summary>📄 Texto <span lang="zh">' +
            escHtml(pick(l.titleZh, l.titleZhT)) + '</span></summary>' +
            '<div class="lq-lines rd-lines">' + linesHtml(l, false) + '</div>' +
            '<div class="rd-text-tools"><button type="button" class="lq-btn lq-ghost lq-mini" id="rd-py">🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF') + '</button></div></details>' +
            '<div class="rd-q"><div class="rd-q-meta">Pregunta ' + (S.idx + 1) + ' de ' + n + ' · ' + escHtml(RD_TYPE[q.type] || q.type) + '</div>' +
            (zhQ
                ? '<div class="rd-q-zh" lang="zh">' + zhCharsHtml(pick(q.qZh, q.qZhT)) + '</div>' +
                  '<div class="rd-q-es hidden" id="rd-q-es">' + escHtml(q.es) + '</div>' +
                  '<button type="button" class="lq-btn lq-ghost lq-mini" id="rd-es">🇪🇸 Ver en español</button>'
                : '<div class="rd-q-es" id="rd-q-es">' + escHtml(q.es) + '</div>') +
            '<div class="lq-opts rd-opts" id="lq-opts">' + optHtml + '</div>' +
            '<div class="lq-feedback hidden" id="lq-feedback"></div>' +
            '<div class="lq-foot"><button type="button" class="lq-btn lq-primary hidden" id="lq-next">' +
            (S.idx === n - 1 ? 'Ver resultado 🏁' : 'Siguiente ▶') + '</button></div></div>';
        bindLines(body.querySelector('.rd-lines'));
        body.querySelector('.rd-text').addEventListener('toggle', (e) => { S.rTextOpen = e.target.open; });
        const applyPy = () => pyReady(l).then(() => body.querySelectorAll('.rd-lines .lq-line-py').forEach(el => {
            if (S.pinyin && !el.textContent) el.textContent = pyLine(el.dataset.zh);
            el.classList.toggle('hidden', !S.pinyin);
        }));
        if (S.pinyin) applyPy();
        body.querySelector('#rd-py').addEventListener('click', (e) => {
            S.pinyin = !S.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF');
            applyPy();
        });
        const esBtn = body.querySelector('#rd-es');
        const showEs = (on) => body.querySelectorAll('#rd-q-es, .rd-opt-es').forEach(el => el.classList.toggle('hidden', !on));
        if (esBtn) esBtn.addEventListener('click', () => {
            const on = body.querySelector('#rd-q-es').classList.contains('hidden');
            showEs(on);
            esBtn.textContent = on ? '🇨🇳 Ocultar el español' : '🇪🇸 Ver en español';
        });
        const qz = body.querySelector('.rd-q-zh');
        if (qz) qz.addEventListener('click', (e) => {
            const chEl = e.target.closest('.lq-ch');
            if (chEl && typeof showVocabPop === 'function') showVocabPop(chEl.dataset.ch);
        });
        body.querySelector('#lq-opts').addEventListener('click', (e) => {
            const b = e.target.closest('.lq-opt');
            if (b && !S.answered) answerReading(+b.dataset.pos);
        });
        body.querySelector('#lq-next').addEventListener('click', nextReading);
    }
    function answerReading(pos) {
        const l = S.lesson, q = l.questions[S.idx], ord = S.order[S.idx], k = zhKey();
        S.answered = true;
        const di = ord[pos], ok = di === 0;
        S.results[S.idx] = ok; S.picks[S.idx] = di;
        renderSegments();
        body.querySelectorAll('.lq-opt').forEach((b, bi) => {
            b.disabled = true;
            if (bi === ord.indexOf(0)) b.classList.add('is-right');
            else if (bi === pos) b.classList.add('is-wrong');
        });
        // tras responder se ve todo en español (la pregunta y cada opción)
        body.querySelectorAll('#rd-q-es, .rd-opt-es').forEach(el => el.classList.remove('hidden'));
        const esBtn = body.querySelector('#rd-es');
        if (esBtn) esBtn.classList.add('hidden');
        const tr = (a, aT) => (k === 'trad' && aT) ? aT : a;
        const why = tr(q.why, q.whyT);
        const whyNot = di > 0 ? tr((q.whyNot || [])[di - 1], (q.whyNotT || [])[di - 1]) : '';
        const fb = ok
            ? '<div class="lq-verdict ok">✓ ¡Correcto!</div><p class="rd-why">' + escHtml(why) + '</p>'
            : '<div class="lq-verdict bad">✗ No es esa</div>' +
              '<p class="rd-why rd-why-bad"><b>Tu respuesta:</b> ' + escHtml(whyNot) + '</p>' +
              '<p class="rd-why"><b>La correcta (' + 'ABCD'[ord.indexOf(0)] + '):</b> ' + escHtml(why) + '</p>';
        const fbel = body.querySelector('#lq-feedback');
        fbel.innerHTML = fb;
        fbel.classList.remove('hidden');
        const nx = body.querySelector('#lq-next');
        nx.classList.remove('hidden');
        try { nx.scrollIntoView({ block: 'nearest' }); } catch (e) { }
    }
    function nextReading() {
        const l = S.lesson, n = l.questions.length;
        if (S.idx < n - 1) { S.idx++; renderReadingQ(); return; }
        const score = S.results.filter(Boolean).length;
        const prev = rprog(l.id);
        RB[l.id] = { best: Math.max(prev.best || 0, score), of: n, done: true, last: localDay(), tries: (prev.tries || 0) + 1, qs: S.results.map(Boolean) };
        saveRB();
        progNum.textContent = '🏁'; segs.innerHTML = '';
        const by = {};
        l.questions.forEach((q, i) => { const t = by[q.type] || (by[q.type] = { ok: 0, n: 0 }); t.n++; if (S.results[i]) t.ok++; });
        const breakdown = Object.keys(by).map(t => '<li><span>' + escHtml(RD_TYPE[t] || t) + '</span><b>' + by[t].ok + '/' + by[t].n + '</b></li>').join('');
        const msg = score === n ? '¡Perfecto! Entendiste todo el texto.' : score / n >= 0.66 ? '¡Muy bien! Entendiste lo esencial.' : 'Releé el texto con calma y probá de nuevo.';
        const others = READS().filter(x => x.id !== l.id);
        const lvOf = (x) => (x.exam || 'HSK') + (x.examLvl || x.hsk);
        const next = others.find(x => lvOf(x) === lvOf(l) && !rprog(x.id).done) || others.find(x => !rprog(x.id).done) || others[0];
        body.innerHTML =
            '<div class="lq-final"><div class="lq-final-emoji">' + l.emoji + '</div>' +
            '<div class="lq-final-score">' + score + '/' + n + '</div>' +
            '<div class="lq-final-msg">' + msg + '</div>' +
            '<ul class="rd-breakdown">' + breakdown + '</ul>' +
            '<div class="lq-final-actions">' +
            '<button type="button" class="lq-btn lq-ghost" id="rd-final-read">📖 Releer el texto</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="rd-final-retry">🔁 Repetir las preguntas</button>' +
            (next ? '<button type="button" class="lq-btn lq-ghost" id="rd-final-next">➡️ Otro texto</button>' : '') +
            '<button type="button" class="lq-btn lq-primary" id="lq-final-close">Seguir ✕</button>' +
            '</div></div>';
        body.querySelector('#rd-final-read').addEventListener('click', () => openStory(l));
        body.querySelector('#rd-final-retry').addEventListener('click', () => openReadingQuiz(l));
        const nb = body.querySelector('#rd-final-next');
        if (nb) nb.addEventListener('click', () => openStory(next));
        body.querySelector('#lq-final-close').addEventListener('click', closePop);
    }

    // ── arranque ──
    function boot() {
        buildTocflOptions(); // v9.6b/v9.7x: opciones TOCFL del <select>, desde TOCFL_ORDER
        // v9.7x: cambiar 简/繁 (Hoy o Ajustes) redibuja la lista sin recargar
        document.addEventListener('ac-script-change', () => renderList());
        restoreLevel();      // v9.7x: último nivel elegido (ac_lesson_level)
        bindList();
        bindPop();
        renderList();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    // API de solo lectura para pruebas E2E
    // R9: la práctica tipo examen (exam-practice.js) muestra el texto plano mientras se responde y, al
    // responder, lo vuelve tocable con pinyin y traducción usando estas mismas piezas (sin duplicarlas).
    window.LQ_TEXT = {
        linesHtml: (l, withEs) => linesHtml(l, withEs),   // l = { lines:[{ zh, zhT, es, who? }] }
        bind: (root) => bindLines(root),                  // ficha de palabra al tocar + 🔊 por línea
        showPinyin: (root, ref) => {                      // rellena y muestra el pinyin generado de cada línea
            root.querySelectorAll('.lq-line-py, .lq-who-py').forEach(el => {
                if (!el.textContent) {
                    try { el.textContent = (typeof pinyinFor === 'function') ? pinyinFor(el.dataset.zh, ref)
                        : ((typeof pinyinPro !== 'undefined') ? pinyinPro.pinyin(el.dataset.zh) : ''); } catch (e) { /* sin pinyin */ }
                }
                el.classList.remove('hidden');
            });
        },
        stop: () => stopSpeak()
    };
    // R8: la lista «Lecturas tipo examen» (readings-ui.js, pestaña Exámenes) abre el visor y lee el progreso
    window.LQ_READING = {
        open(id, mode) {
            const l = READS().find(x => x.id === id);
            if (!l) return false;
            if (mode === 'quiz') openReadingQuiz(l); else openStory(l);
            return true;
        },
        progress(id) { return rprog(id); }
    };
    window.LQ_DEBUG = {
        get lessons() { return LESSONS.length; },
        get state() { return { view: S.view, idx: S.idx, answered: S.answered, results: S.results.slice() }; },
        get rightPos() { return ((S.view === 'quiz' || S.view === 'rquiz') && S.order) ? S.order[S.idx].indexOf(0) : -1; }
    };
})();
