// ============================================================
// ninos-ui.js — Pista «🧒 Niños» (6–10 años): chicos de habla china que aprenden español en Argentina
// ------------------------------------------------------------
// Datos: window.NINOS_LESSONS (lessons-ninos.js). Se muestra dentro de Aprender → Lecciones cuando el modo
// es «aprendo español» (cn-es) y la pista elegida es «Niños» (lessons-dele.js delega acá la lista).
// Overlay propio #nino-pop con la piel .lq-pop. Tres pasos por lección:
//   1) 📖 Leer: palabras nuevas (emoji + español + 中文, tocables) y el diálogo con avatar, 🔊 por línea y chino visible.
//   2) 🎧 «Escuchá y tocá»: suena una palabra o frase y se toca el dibujo (emoji; art = gráfico futuro).
//   3) ✏️ «Completar»: la frase con hueco y 3 opciones grandes.
// Estrellas ⭐ (1–3) guardadas SOLO en el dispositivo (ac_ninos_v1, viaja en el respaldo). Sin ranking, sin
// anuncios, sin micrófono: el audio sale del mismo motor de voz de las mini-dramas (window.DeleLessons.speak),
// que envía solo el texto de la frase al servidor de voz.
// Resumen para el adulto (en chino) al final de cada lección. 简/繁 según la escritura elegida.
// Extra «🔊 Sonidos del español» (window.NINOS_SONIDOS, ninos-sonidos.js): tarjeta al final de la lista; 📖 compara cada
// letra o sonido con el pinyin (palabras tocables con voz argentina) y 🎮 es un «Escuchá y tocá» de 9 ítems (mismas estrellas).
// ============================================================
(function ninosUiInit() {
    'use strict';
    const LES = () => (Array.isArray(window.NINOS_LESSONS) ? window.NINOS_LESSONS.slice().sort((a, b) => a.order - b.order) : []);
    const $ = (id) => document.getElementById(id);
    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const DL = () => window.DeleLessons || null;
    const speak = (t, b) => { const d = DL(); if (d && d.speak) { try { d.speak(t, b || null); } catch (e) { /* sin audio */ } } };
    const stopAudio = () => { const d = DL(); if (d && d.stop) { try { d.stop(); } catch (e) { /* idem */ } } };

    // ── escritura: la elegida para la familia «HSK y el resto» (en «aprendo español» no hay módulo TOCFL) ──
    const useTrad = () => { try { return typeof scriptFor === 'function' && scriptFor('DELE') === 'trad'; } catch (e) { return false; } };
    const zhOf = (o, k) => (useTrad() ? (o[k + 'T'] || o[k]) : o[k]);   // k = 'zh' → zh / zhT
    const T = (s, t) => (useTrad() ? t : s);                              // textos de la interfaz en chino

    // ── progreso (solo en el dispositivo) ──
    const KEY = 'ac_ninos_v1';
    let PB = {};
    try { PB = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { PB = {}; }
    const savePB = () => { try { localStorage.setItem(KEY, JSON.stringify(PB)); } catch (e) { /* sin storage */ } };
    const progOf = (id) => PB[id] || {};
    // preferencia: chino visible (por defecto SÍ: es la lengua de los chicos y de sus padres)
    let showZh = true;
    try { showZh = localStorage.getItem('ac_ninos_zh') !== '0'; } catch (e) { /* default */ }
    const setShowZh = (v) => { showZh = !!v; try { localStorage.setItem('ac_ninos_zh', showZh ? '1' : '0'); } catch (e) { /* sin storage */ } };

    const BAND = { A: ['🌱', '6–7', '6–7 岁'], B: ['🌿', '8–10', '8–10 岁'] };
    const WHO = { 'Seño': '👩‍🏫', 'Mamá': '👩', 'Lin': '🧒', 'Sofi': '👧', 'Kiosquero': '🧔' };
    const starsOf = (n) => '⭐'.repeat(n) + '☆'.repeat(3 - n);
    // gráfico futuro: si la pieza trae art.src se usa la imagen; si no, el emoji
    const pic = (o, cls) => (o && o.art && o.art.src)
        ? '<img class="' + cls + '" src="' + esc(o.art.src) + '" alt="' + esc(o.art.alt || '') + '" loading="lazy">'
        : '<span class="' + cls + '" aria-hidden="true">' + esc((o && o.emoji) || '🙂') + '</span>';

    // ═════════ lista (dentro de #dele-list) ═════════
    function renderList(wrap, level, band) {
        const okBand = (b) => !band || band === 'all' || b === band;   // R14: filtro de franja 🌱 / 🌿
        const list = LES().filter(l => (level === 'all' || l.dele === level) && okBand(l.band));
        wrap.innerHTML = '';
        if (!list.length) {
            wrap.innerHTML = '<div class="dl-empty">Todavía no hay lecciones de ese nivel en esta pista — probá con «Todas» 🧭</div>';
            return 0;
        }
        wrap.insertAdjacentHTML('beforeend',
            '<p class="nino-intro">🌱 6–7 岁 · 🌿 8–10 岁 — ' + esc(T('每节课大约 5 分钟：先读一读，再玩游戏。', '每節課大約 5 分鐘：先讀一讀，再玩遊戲。')) + '</p>');
        list.forEach(l => {
            const p = progOf(l.id), b = BAND[l.band] || BAND.A;
            const card = document.createElement('div');
            card.className = 'lesson-card nino-card';
            card.dataset.id = l.id;
            card.innerHTML =
                '<div class="nino-card-top">' + pic(l, 'nino-card-emoji') +
                '<div class="nino-card-titles"><div class="nino-card-es">' + esc(l.titleEs) + '</div>' +
                '<div class="nino-card-zh" lang="zh">' + esc(zhOf(l, 'titleZh')) + '</div></div>' +
                '<span class="nino-band" title="' + esc(b[2]) + '">' + b[0] + ' ' + esc(b[1]) + '</span></div>' +
                '<p class="lc-blurb nino-card-blurb" lang="zh">' + esc(zhOf(l, 'blurbZh')) + '</p>' +
                '<div class="nino-card-stars" aria-label="' + (p.stars || 0) + ' / 3">' + starsOf(p.stars || 0) + '</div>' +
                '<div class="lc-actions">' +
                '<button type="button" class="lq-btn nino-go" data-act="read" data-id="' + esc(l.id) + '">📖 Leer · ' + esc(T('读', '讀')) + '</button>' +
                '<button type="button" class="lq-btn lq-primary nino-go" data-act="play" data-id="' + esc(l.id) + '">🎮 Jugar · ' + esc(T('玩', '玩')) + '</button>' +
                '</div>';
            wrap.appendChild(card);
        });
        const sl = ((level === 'all' || level === 'A1') && okBand('A')) ? soundLesson() : null;   // «Sonidos» es de la franja 🌱
        if (sl) {
            const p = progOf(sl.id), card = document.createElement('div');
            card.className = 'lesson-card nino-extra';
            card.dataset.id = sl.id;
            card.innerHTML =
                '<div class="nino-card-top">' + pic(sl, 'nino-card-emoji') +
                '<div class="nino-card-titles"><div class="nino-card-es">' + esc(sl.titleEs) + '</div>' +
                '<div class="nino-card-zh" lang="zh">' + esc(zhOf(sl, 'titleZh')) + '</div></div></div>' +
                '<p class="lc-blurb nino-card-blurb" lang="zh">' + esc(zhOf(sl, 'blurbZh')) + '</p>' +
                '<div class="nino-card-stars" aria-label="' + (p.stars || 0) + ' / 3">' + starsOf(p.stars || 0) + '</div>' +
                '<div class="lc-actions">' +
                '<button type="button" class="lq-btn nino-go" data-act="read" data-id="' + esc(sl.id) + '">📖 Leer · ' + esc(T('读', '讀')) + '</button>' +
                '<button type="button" class="lq-btn lq-primary nino-go" data-act="play" data-id="' + esc(sl.id) + '">🎮 Jugar · ' + esc(T('玩', '玩')) + '</button>' +
                '</div>';
            wrap.appendChild(card);
        }
        return list.length;
    }

    // ═════════ overlay ═════════
    let pop = null, body = null, segs = null, num = null;
    const S = { l: null, view: null, steps: [], i: 0, res: [], tries: 0, order: [], hookOn: false };
    function inject() {
        if (pop) return;
        pop = document.createElement('div');
        pop.id = 'nino-pop'; pop.className = 'lq-pop nino-pop hidden';
        pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-modal', 'true'); pop.setAttribute('aria-label', 'Lecciones para niños');
        pop.innerHTML = '<div class="lq-inner"><div class="lq-header"><span id="nino-num" class="lq-progress-num">📖</span>' +
            '<div id="nino-seg" class="lq-segments" aria-hidden="true"></div>' +
            '<button id="nino-close" class="lq-x" type="button" aria-label="Cerrar">✕</button></div>' +
            '<div id="nino-body" class="lq-body nino-body"></div></div>';
        document.body.appendChild(pop);
        body = $('nino-body'); segs = $('nino-seg'); num = $('nino-num');
        $('nino-close').addEventListener('click', close);
        pop.addEventListener('click', (e) => { if (e.target === pop) close(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden') && !(typeof topLayerOpen === 'function' && topLayerOpen())) close();
        });
        body.addEventListener('click', onBodyClick);
    }
    function openPop() { pop.classList.remove('hidden'); try { document.body.style.overflow = 'hidden'; } catch (e) { /* noop */ } }
    function close() {
        if (!pop || pop.classList.contains('hidden')) return;
        stopAudio();
        pop.classList.add('hidden');
        if (typeof syncBodyScroll === 'function') syncBodyScroll(); else { try { document.body.style.overflow = ''; } catch (e) { /* noop */ } }
        S.l = null; S.view = null;
        document.dispatchEvent(new Event('ac-ninos-change')); // refresca estrellas en la lista
    }
    // ── «Sonidos del español»: se presenta como una pieza más (id ni-sonidos) que comparte el juego y las estrellas ──
    const SND = () => (window.NINOS_SONIDOS && Array.isArray(window.NINOS_SONIDOS.cards) && window.NINOS_SONIDOS.cards.length ? window.NINOS_SONIDOS : null);
    let sndLesson = null;
    function soundLesson() {
        const d = SND(); if (!d) return null;
        if (!sndLesson) sndLesson = {
            id: 'ni-sonidos', sounds: true, order: 9999, band: 'A', emoji: d.emoji, art: d.art || null,
            titleEs: d.titleEs, titleZh: d.titleZh, titleZhT: d.titleZhT, blurbZh: d.blurbZh, blurbZhT: d.blurbZhT,
            words: d.cards.map(c => ({ sp: c.letters, zh: c.titleZh, zhT: c.titleZhT })), lines: [], listen: d.listen, quiz: []
        };
        return sndLesson;
    }
    const lessonById = (id) => LES().find(x => x.id === id) || (id === 'ni-sonidos' ? soundLesson() : null);

    // ═════════ 1) Leer ═════════
    function openStory(l) {
        if (l.sounds) return openSounds(l);
        inject();
        stopAudio();
        S.l = l; S.view = 'story';
        openPop();
        num.textContent = '📖'; segs.innerHTML = '';
        const b = BAND[l.band] || BAND.A;
        const words = l.words.map((w, i) =>
            '<button type="button" class="nino-word" data-w="' + i + '" aria-label="' + esc(w.sp) + '">' +
            pic(w, 'nino-word-pic') + '<span class="nino-word-es">' + esc(w.sp) + '</span>' +
            '<span class="nino-word-zh" lang="zh">' + esc(zhOf(w, 'zh')) + '</span></button>').join('');
        const lines = l.lines.map((x, i) =>
            '<div class="nino-line" data-i="' + i + '"><span class="nino-who" aria-hidden="true" title="' + esc(x.who) + '">' + (WHO[x.who] || '🙂') + '</span>' +
            '<div class="nino-bubble"><div class="nino-who-name">' + esc(x.who) + '</div>' +
            '<div class="nino-sp">' + esc(x.sp) + '</div>' +
            '<div class="nino-zh' + (showZh ? '' : ' hidden') + '" lang="zh">' + esc(zhOf(x, 'zh')) + '</div></div>' +
            '<button type="button" class="nino-say" data-say="' + esc(x.sp) + '" aria-label="Escuchar la línea">🔊</button></div>').join('');
        body.innerHTML =
            '<div class="nino-head">' + pic(l, 'nino-head-emoji') + '<div><h2 class="nino-title">' + esc(l.titleEs) + '</h2>' +
            '<div class="nino-title-zh" lang="zh">' + esc(zhOf(l, 'titleZh')) + ' · ' + b[0] + ' ' + esc(b[2]) + '</div></div></div>' +
            '<h3 class="nino-sec">⭐ Palabras nuevas · ' + esc(T('新词', '新詞')) + '</h3><div class="nino-words">' + words + '</div>' +
            '<h3 class="nino-sec">💬 ' + esc(T('对话', '對話')) + '</h3><div class="nino-lines">' + lines + '</div>' +
            '<div class="nino-foot"><button type="button" class="lq-btn" id="nino-playall">▶️ Escuchar todo</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="nino-zh">🇨🇳 ' + esc(T('中文', '中文')) + ': ' + (showZh ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-primary nino-big" id="nino-play">🎮 Jugar · ' + esc(T('玩游戏', '玩遊戲')) + '</button></div>';
        body.scrollTop = 0;
    }
    function openSounds(l) {
        const d = SND(); if (!d) return;
        inject();
        stopAudio();
        S.l = l; S.view = 'story';
        openPop();
        num.textContent = '🔊'; segs.innerHTML = '';
        const cards = d.cards.map((c, ci) =>
            '<section class="nino-snd" data-s="' + ci + '"><div class="nino-snd-head"><span class="nino-snd-letters" translate="no">' + esc(c.letters) + '</span>' +
            '<div class="nino-snd-titles"><div class="nino-snd-es">' + esc(c.titleEs) + '</div><div class="nino-snd-zh" lang="zh">' + esc(zhOf(c, 'titleZh')) + '</div></div></div>' +
            '<p class="nino-snd-rule" lang="zh">' + esc(zhOf(c, 'ruleZh')) + '</p>' +
            '<div class="nino-words">' + c.words.map((w, wi) =>
                '<button type="button" class="nino-word" data-s="' + ci + '" data-w="' + wi + '" aria-label="' + esc(w.sp) + '">' + pic(w, 'nino-word-pic') +
                '<span class="nino-word-es">' + esc(w.sp) + '</span><span class="nino-word-zh" lang="zh">' + esc(zhOf(w, 'zh')) + '</span>' +
                (w.like ? '<span class="nino-word-like" translate="no">≈ ' + esc(w.like) + '</span>' : '') + '</button>').join('') + '</div></section>').join('');
        body.innerHTML =
            '<div class="nino-head">' + pic(l, 'nino-head-emoji') + '<div><h2 class="nino-title">' + esc(l.titleEs) + '</h2>' +
            '<div class="nino-title-zh" lang="zh">' + esc(zhOf(l, 'titleZh')) + '</div></div></div>' +
            '<p class="nino-snd-intro" lang="zh">' + esc(zhOf(l, 'blurbZh')) + '</p>' + cards +
            '<p class="nino-snd-note" lang="zh">' + esc(zhOf(d, 'noteZh')) + '</p>' +
            '<div class="nino-foot"><button type="button" class="lq-btn lq-primary nino-big" id="nino-play">🎮 Jugar · ' + esc(T('玩游戏', '玩遊戲')) + '</button></div>';
        body.scrollTop = 0;
    }
    function markStep(idx) { // gancho de «Escuchar todo»: resalta la línea que suena
        body.querySelectorAll('.nino-line').forEach((r, i) => r.classList.toggle('nino-now', i === idx));
        const btn = $('nino-playall');
        if (btn) btn.textContent = idx >= 0 ? '⏹ Parar' : '▶️ Escuchar todo';
        if (idx >= 0) { const r = body.querySelector('.nino-line[data-i="' + idx + '"]'); if (r && r.scrollIntoView) { try { r.scrollIntoView({ block: 'nearest' }); } catch (e) { /* noop */ } } }
    }

    // ═════════ 2) y 3) Juego ═════════
    const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    function openPlay(l) {
        inject();
        stopAudio();
        S.l = l; S.view = 'play';
        S.steps = l.listen.map((x, i) => ({ k: 'listen', i })).concat(l.quiz.map((x, i) => ({ k: 'quiz', i })));
        S.i = 0; S.res = new Array(S.steps.length).fill(null); S.tries = 0;
        S.order = S.steps.map(s => shuffle([0, 1, 2]));   // la correcta (índice 0) cambia de lugar en cada vuelta
        openPop();
        renderStep();
    }
    function dots() { return S.res.map((r, i) => '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : (i === S.i ? '' : '')) + '"></span>').join(''); }
    function renderStep() {
        const l = S.l, st = S.steps[S.i];
        S.tries = 0;
        num.textContent = (S.i + 1) + '/' + S.steps.length; segs.innerHTML = dots();
        const ord = S.order[S.i];
        if (st.k === 'listen') {
            const q = l.listen[st.i];
            const tiles = ord.map((oi, pos) => {
                const o = q.opts[oi];
                return '<button type="button" class="nino-tile" data-oi="' + oi + '" data-pos="' + pos + '" aria-label="' + esc(o.sp) + '">' +
                    pic(o, 'nino-tile-pic') + '<span class="nino-tile-label hidden"><b>' + esc(o.sp) + '</b><span lang="zh">' + esc(zhOf(o, 'zh')) + '</span></span></button>';
            }).join('');
            body.innerHTML =
                '<div class="nino-q"><button type="button" class="nino-bigsay" id="nino-hear" aria-label="Escuchar">🔊</button>' +
                '<div class="nino-q-text">Escuchá y tocá · <span lang="zh">' + esc(T('听一听，点一点', '聽一聽，點一點')) + '</span></div></div>' +
                '<div class="nino-tiles">' + tiles + '</div>' +
                '<div class="nino-fb hidden" aria-live="polite"></div>' +
                '<div class="nino-actions hidden"><button type="button" class="lq-btn lq-primary nino-big" id="nino-next">' + (S.i + 1 >= S.steps.length ? 'Ver resultado 🏁' : 'Siguiente ▶') + '</button></div>';
            speak(q.say, null);
        } else {
            const q = l.quiz[st.i];
            const opts = ord.map((oi, pos) => {
                const o = q.opts[oi];
                return '<button type="button" class="nino-opt" data-oi="' + oi + '" data-pos="' + pos + '"><b>' + esc(o.w) + '</b><span lang="zh">' + esc(useTrad() ? (o.eT || o.e) : o.e) + '</span></button>';
            }).join('');
            body.innerHTML =
                '<div class="nino-q-text nino-q-zh" lang="zh">' + esc(zhOf(q, 'zh')) + '</div>' +
                '<div class="nino-sentence"><span>' + esc(q.sp).replace('___', '<span class="nino-blank" id="nino-blank">？</span>') + '</span>' +
                '<button type="button" class="nino-say nino-say-s" id="nino-hear" aria-label="Escuchar">🔊</button></div>' +
                '<div class="nino-opts">' + opts + '</div>' +
                '<div class="nino-fb hidden" aria-live="polite"></div>' +
                '<div class="nino-actions hidden"><button type="button" class="lq-btn lq-primary nino-big" id="nino-next">' + (S.i + 1 >= S.steps.length ? 'Ver resultado 🏁' : 'Siguiente ▶') + '</button></div>';
        }
        body.scrollTop = 0;
    }
    function answer(oi, btn) {
        const l = S.l, st = S.steps[S.i];
        const right = oi === 0;
        if (right) {
            if (S.res[S.i] === null) S.res[S.i] = S.tries === 0; // primer intento = punto
            btn.classList.add('ok');
            body.querySelectorAll('.nino-tile,.nino-opt').forEach(b => { b.disabled = true; });
            const fb = body.querySelector('.nino-fb');
            if (st.k === 'listen') {
                const o = l.listen[st.i].opts[0];
                body.querySelectorAll('.nino-tile-label').forEach(x => x.classList.remove('hidden'));
                fb.innerHTML = '<span class="nino-star" aria-hidden="true">⭐</span> <b>¡Muy bien!</b> <span lang="zh">' + esc(T('答对了！', '答對了！')) + '</span> — <b>' + esc(o.sp) + '</b> <span lang="zh">(' + esc(zhOf(o, 'zh')) + ')</span>';
            } else {
                const q = l.quiz[st.i], o = q.opts[0];
                const bl = $('nino-blank'); if (bl) { bl.textContent = o.w; bl.classList.add('ok'); }
                fb.innerHTML = '<span class="nino-star" aria-hidden="true">⭐</span> <b>¡Muy bien!</b> <span lang="zh">' + esc(T('答对了！', '答對了！')) + '</span>';
                speak(q.sp.replace(/_{2,}/, o.w), null);
            }
            fb.className = 'nino-fb ok';
            body.querySelector('.nino-actions').classList.remove('hidden');
            segs.innerHTML = dots();
            const nx = $('nino-next'); if (nx) { try { nx.focus({ preventScroll: true }); nx.scrollIntoView({ block: 'nearest' }); } catch (e) { /* noop */ } }
        } else {
            S.tries++;
            if (S.res[S.i] === null) S.res[S.i] = false;      // contó como fallo en el primer intento; puede volver a probar
            btn.classList.add('bad'); btn.disabled = true;
            const fb = body.querySelector('.nino-fb');
            fb.className = 'nino-fb try'; fb.classList.remove('hidden');
            fb.innerHTML = '<b>Casi… ¡probá otra vez!</b> <span lang="zh">' + esc(T('再试一次！', '再試一次！')) + '</span>';
            segs.innerHTML = dots();
        }
    }
    function nextStep() {
        if (S.i + 1 >= S.steps.length) return renderEnd();
        S.i++; renderStep();
    }

    // ═════════ resultado + resumen para el adulto ═════════
    function renderEnd() {
        const l = S.l, total = S.steps.length, ok = S.res.filter(r => r === true).length;
        // primer intento: res[i] === true solo si acertó a la primera (un fallo previo lo deja en false)
        const stars = ok >= total - 1 ? 3 : ok >= Math.ceil(total * 0.66) ? 2 : 1;
        const p = progOf(l.id);
        PB[l.id] = { stars: Math.max(p.stars || 0, stars), best: Math.max(p.best || 0, ok), of: total, done: true, tries: (p.tries || 0) + 1, last: new Date().toISOString().slice(0, 10) };
        savePB();
        num.textContent = '🏁'; segs.innerHTML = dots();
        const words = l.words.map(w => esc(w.sp) + '（' + esc(zhOf(w, 'zh')) + '）').join('、');
        const nextL = l.sounds ? null : LES().find(x => x.order > l.order);
        const msg = stars === 3 ? '¡Genial! 🎉' : stars === 2 ? '¡Muy bien! 👏' : '¡Buen intento! 💪';
        body.innerHTML =
            '<div class="nino-end">' + pic(l, 'nino-end-emoji') + '<div class="nino-end-stars" aria-label="' + stars + ' / 3">' + starsOf(stars) + '</div>' +
            '<div class="nino-end-msg">' + msg + '</div><div class="nino-end-score">' + ok + '/' + total + ' <span lang="zh">' + esc(T('一次答对', '一次答對')) + '</span></div></div>' +
            '<div class="nino-parent"><h3 lang="zh">👪 ' + esc(T('家长小结', '家長小結')) + '</h3>' +
            '<p lang="zh">' + esc(T('今天的课：', '今天的課：')) + esc(zhOf(l, 'titleZh')) + '（' + esc(l.titleEs) + '）</p>' +
            '<p lang="zh">' + esc(l.sounds ? T('学过的发音：', '學過的發音：') : T('新词：', '新詞：')) + words + '</p>' +
            '<p lang="zh">' + esc(T('第一次就答对 ' + ok + ' 题，共 ' + total + ' 题。', '第一次就答對 ' + ok + ' 題，共 ' + total + ' 題。')) + '</p>' +
            '<p lang="zh">' + esc(T('小建议：每天玩 5 分钟，大声跟着读对话，比一次学很久更有效。', '小建議：每天玩 5 分鐘，大聲跟著讀對話，比一次學很久更有效。')) + '</p></div>' +
            '<div class="nino-actions nino-end-actions">' +
            '<button type="button" class="lq-btn lq-primary nino-big" id="nino-again">🔄 Jugar otra vez · ' + esc(T('再玩一次', '再玩一次')) + '</button>' +
            '<button type="button" class="lq-btn" id="nino-reread">📖 Volver a leer · ' + esc(T('再读一遍', '再讀一遍')) + '</button>' +
            (nextL ? '<button type="button" class="lq-btn" id="nino-nextl" data-id="' + esc(nextL.id) + '">➡️ ' + esc(nextL.titleEs) + '</button>' : '') +
            '<button type="button" class="lq-btn lq-ghost" id="nino-done">Cerrar · ' + esc(T('关闭', '關閉')) + '</button></div>';
        body.scrollTop = 0;
    }

    // ═════════ clics ═════════
    function onBodyClick(e) {
        const t = e.target, l = S.l;
        if (!l) return;
        if (S.view === 'story' && l.sounds) {
            const w = t.closest('.nino-word'), d = SND();
            if (w && d) { const x = d.cards[+w.dataset.s].words[+w.dataset.w]; if (x) { speak(x.sp, null); w.classList.add('nino-tapped'); setTimeout(() => w.classList.remove('nino-tapped'), 600); } return; }
            if (t.closest('#nino-play')) openPlay(l);
            return;
        }
        if (S.view === 'story') {
            const w = t.closest('.nino-word');
            if (w) { const x = l.words[+w.dataset.w]; if (x) { speak(x.sp, null); w.classList.add('nino-tapped'); setTimeout(() => w.classList.remove('nino-tapped'), 600); } return; }
            const say = t.closest('.nino-say');
            if (say) { speak(say.dataset.say, say); return; }
            if (t.closest('#nino-playall')) {
                const d = DL(); if (!d) return;
                if (d.isQueue()) { d.stopQueue(); return; }
                d.playQueue(l.lines.map(x => x.sp), markStep);
                return;
            }
            if (t.closest('#nino-zh')) {
                setShowZh(!showZh);
                $('nino-zh').textContent = '🇨🇳 ' + T('中文', '中文') + ': ' + (showZh ? 'ON' : 'OFF');
                body.querySelectorAll('.nino-zh').forEach(x => x.classList.toggle('hidden', !showZh));
                return;
            }
            if (t.closest('#nino-play')) { openPlay(l); return; }
            return;
        }
        if (S.view === 'play') {
            if (t.closest('#nino-hear')) {
                const st = S.steps[S.i];
                speak(st.k === 'listen' ? l.listen[st.i].say : l.quiz[st.i].sp.replace(/_{2,}/, l.quiz[st.i].opts[0].w), null);
                return;
            }
            const o = t.closest('.nino-tile, .nino-opt');
            if (o && !o.disabled) { answer(+o.dataset.oi, o); return; }
            if (t.closest('#nino-next')) { nextStep(); return; }
            // resultado
            if (t.closest('#nino-again')) { openPlay(l); return; }
            if (t.closest('#nino-reread')) { openStory(l); return; }
            const nl = t.closest('#nino-nextl'); if (nl) { const n = lessonById(nl.dataset.id); if (n) openStory(n); return; }
            if (t.closest('#nino-done')) { close(); return; }
        }
    }

    // ═════════ arranque ═════════
    function boot() {
        const wrap = $('dele-list');
        if (wrap) wrap.addEventListener('click', (e) => {
            const b = e.target.closest('.nino-go');
            if (!b) return;
            const l = lessonById(b.dataset.id);
            if (l) (b.dataset.act === 'play' ? openPlay : openStory)(l);
        });
        // cambiar 简/繁 o volver de una lección redibuja la lista de «Niños» (si está a la vista)
        const redraw = () => { const w = $('dele-list'); if (w && w.querySelector('.nino-card') && window.DeleDebug && window.DeleDebug.renderList) window.DeleDebug.renderList(); };
        document.addEventListener('ac-script-change', () => {
            redraw();
            if (!pop || pop.classList.contains('hidden') || !S.l) return;
            if (S.view === 'story') openStory(S.l);                // la lectura se redibuja en la otra escritura
            else if (S.view === 'play' && S.steps[S.i] && S.res[S.i] === null) renderStep(); // el juego sigue en el mismo ítem
        });
        document.addEventListener('ac-ninos-change', redraw);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

    window.NinosUI = {
        count: () => LES().length,
        // R14: lo que necesita lessons-dele.js para los botones y chips: total, lecciones por franja y por nivel
        stats: () => { const st = { total: 0, bands: {}, levels: {} }; LES().forEach(l => { st.total++; st.bands[l.band] = (st.bands[l.band] || 0) + 1; st.levels[l.dele] = (st.levels[l.dele] || 0) + 1; }); return st; },
        renderList: renderList,
        sounds: () => SND(),
        open: (id, mode) => { const l = lessonById(id); if (!l) return false; (mode === 'play' ? openPlay : openStory)(l); return true; },
        progress: progOf,
        state: () => ({ view: S.view, i: S.i, n: S.steps.length, res: S.res.slice(), id: S.l && S.l.id })
    };
})();
