// ============================================================
// exam-practice.js — Práctica tipo examen (piloto: TOCFL Prep, TOCFL A1, HSK 1)
// ============================================================
// Sesión de 20 ítems sin tiempo límite, armada SOLO con lo que ya existe
// (window.GRADED_LESSONS: líneas y quizzes de las lecciones de cada nivel):
//   · 🎧 Escuchar (6): suena una línea y se elige qué dice, entre 3 opciones
//     en español. Los distractores salen primero de la MISMA lección.
//   · 📖 Completar (8): el quiz de las lecciones (hueco + 3 opciones).
//   · 🧩 Ordenar (hasta 6): fichas de una oración corta (zhSegmentAll), de a una
//     cláusula: se acepta solo el orden original. Hay pocas oraciones así
//     (TOCFL Prep 4, A1 5, HSK 1 9): lo que falte se completa con Escuchar y
//     Completar para que la tanda sea siempre de 20.
// Es PRÁCTICA, no un examen oficial: no copia ítems de exámenes reales ni
// predice un puntaje. Misma piel que las lecciones (.lq-pop) y los mismos
// criterios de escritura/voz por familia (scriptFor / voiceZhFor).
// Los errores de «Completar» van al mazo SRS (window.acSrsMiss), igual que
// en las lecciones. Resultados en 'ac_exam_v1' (viaja con el respaldo ac_*).
// Script clásico, después de app.js. No toca SRS (solo su hook) ni checkAnswer.
// ============================================================
(function () {
    'use strict';

    const KEY = 'ac_exam_v1';
    const KEEP = 10;
    const N_LISTEN = 6, N_CLOZE = 8, N_ORDER = 6;
    const $ = (id) => document.getElementById(id);
    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // nivel de práctica → cómo se reconocen sus lecciones
    const LEVELS = [
        { k: 'TOCFL-Prep', name: 'TOCFL Prep', pick: l => l.exam === 'TOCFL' && l.examLvl === 'Prep' },
        { k: 'TOCFL-A1', name: 'TOCFL A1', pick: l => l.exam === 'TOCFL' && l.examLvl === 'A1' },
        { k: 'HSK1', name: 'HSK 1', pick: l => !l.exam && l.hsk === 1 }
    ];
    const levelOf = (k) => LEVELS.find(x => x.k === k);
    const SECTIONS = { listen: '🎧 Escuchar', cloze: '📖 Completar', order: '🧩 Ordenar' };

    // ── historial ──
    function readDB() {
        try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return (o && typeof o === 'object') ? o : {}; }
        catch (e) { return {}; }
    }
    function pushResult(k, rec) {
        const db = readDB();
        db[k] = (Array.isArray(db[k]) ? db[k] : []).concat([rec]).slice(-KEEP);
        try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* sin storage: sigue */ }
    }
    function lastOf(k) { const a = readDB()[k]; return Array.isArray(a) && a.length ? a[a.length - 1] : null; }

    // ── azar ──
    const shuf = (a) => {
        a = a.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
    };

    // ── datos del nivel ──
    function poolOf(k) {
        const lv = levelOf(k);
        const ls = (window.GRADED_LESSONS || []).filter(lv.pick);
        const lines = [];
        ls.forEach(l => (l.lines || []).forEach(x => lines.push({ lesson: l.id, zh: x.zh, zhT: x.zhT || x.zh, es: x.es })));
        return { lv, ls, lines, ref: ls[0] || null };
    }
    // reparte los elegidos entre las lecciones (máx. `cap` por lección)
    function spread(items, n, cap, lessonOf) {
        const cnt = {}, out = [], rest = [];
        shuf(items).forEach(x => {
            const l = lessonOf(x);
            if ((cnt[l] || 0) < cap && out.length < n) { cnt[l] = (cnt[l] || 0) + 1; out.push(x); } else rest.push(x);
        });
        return out.concat(rest).slice(0, n);
    }

    // ── generadores ──
    function genListen(P, trad, n, usedEs) {
        const ok = P.lines.filter(x => x.es.length >= 12 && x.es.length <= 100);
        const seen = new Set();
        let uniq = ok.filter(x => (seen.has(x.es) ? false : (seen.add(x.es), true)));
        const fresh = uniq.filter(x => !usedEs.has(x.es));
        if (fresh.length >= n) uniq = fresh;
        return spread(uniq, n, Math.ceil(n / Math.max(1, P.ls.length)) + 1, x => x.lesson).map(x => {
            const near = (a, b) => Math.abs(a.es.length - x.es.length) - Math.abs(b.es.length - x.es.length);
            const same = shuf(P.lines.filter(y => y.lesson === x.lesson && y.es !== x.es)).sort(near);
            const other = shuf(P.lines.filter(y => y.lesson !== x.lesson && y.es !== x.es)).sort(near);
            const dist = [];
            same.concat(other).forEach(y => { if (dist.length < 2 && y.es !== x.es && !dist.some(d => d.es === y.es)) dist.push(y); });
            return {
                type: 'listen', zh: trad ? x.zhT : x.zh, es: x.es,
                opts: shuf([{ es: x.es, ok: 1 }].concat(dist.map(d => ({ es: d.es }))))
            };
        });
    }
    const CLAUSE = /[，、；：「」『』…,;:]/;
    function genOrder(P, trad, n, usedEs) {
        const mk = (min, max) => {
            const out = [];
            for (const x of shuf(P.lines)) {
                if (out.length >= n) break;
                if (usedEs.has(x.es)) continue;
                const t = (trad ? x.zhT : x.zh).replace(/[。！？!?.]+$/, '');
                if (!t || CLAUSE.test(t)) continue; // una sola cláusula: el orden es único
                let seg = [];
                try { seg = zhSegmentAll(t); } catch (e) { seg = []; }
                if (seg.join('') !== t || !seg.every(s => /[㐀-鿿]/.test(s))) continue;
                if (seg.length < min || seg.length > max) continue;
                let ch = shuf(seg);
                if (ch.join('|') === seg.join('|')) ch = seg.slice().reverse();
                if (ch.join('|') === seg.join('|')) continue; // simétrica: no hay desorden posible
                out.push({ type: 'order', words: seg, chips: ch, es: x.es, zh: t });
                usedEs.add(x.es);
            }
            return out;
        };
        let out = mk(4, 8);
        if (out.length < n) { const more = mk(3, 9); out = out.concat(more).slice(0, n); }
        return out;
    }
    function genCloze(P, trad, n, usedEs) {
        const all = [];
        P.ls.forEach(l => (l.quiz || []).forEach(q => all.push({ lesson: l.id, q })));
        let pool = all.filter(a => !usedEs.has(a.q.es));
        if (pool.length < n) pool = all; // pocas: se repite alguna frase ya escuchada
        return spread(pool, n, Math.ceil(n / Math.max(1, P.ls.length)) + 1, a => a.lesson).map(a => ({
            type: 'cloze', es: a.q.es, zhS: a.q.zh, zhT: a.q.zhT || a.q.zh,
            zh: trad ? (a.q.zhT || a.q.zh) : a.q.zh,
            opts: shuf(a.q.opts.map((o, i) => ({ z: o.z, t: o.t || o.z, p: o.p, e: o.e, a: o.a, ok: i === 0 ? 1 : 0 })))
        }));
    }
    function buildSession(k) {
        const P = poolOf(k);
        const trad = P.ref ? scriptFor(P.ref) === 'trad' : false;
        // «Ordenar» primero: es lo más escaso (solo sirven las oraciones de una cláusula).
        // Lo que falte para las 6 fichas se compensa con Escuchar y Completar: siempre 20 ítems.
        const used = new Set();
        const order = genOrder(P, trad, N_ORDER, used);
        const deficit = N_ORDER - order.length;
        const listen = genListen(P, trad, N_LISTEN + Math.ceil(deficit / 2), used);
        listen.forEach(i => used.add(i.es));
        const cloze = genCloze(P, trad, N_CLOZE + Math.floor(deficit / 2), used);
        return { k, P, trad, items: listen.concat(cloze, order) };
    }

    // ── estado ──
    let S = null;
    let pop = null, body = null, numEl = null, segEl = null, opener = null;

    // ── audio (propio: speakZh de las lecciones es privado de su módulo) ──
    let au = null, ttsU = null, tok = 0;
    function setPlaying(on) {
        const b = $('ex-play');
        if (b) { b.classList.toggle('playing', !!on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    }
    function stopAudio() {
        tok++;
        if (au) { try { au.pause(); } catch (e) { /* noop */ } au = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* noop */ }
        ttsU = null;
        setPlaying(false);
    }
    async function playText(text) {
        const my = ++tok;
        if (au) { try { au.pause(); } catch (e) { /* noop */ } au = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* noop */ }
        const vz = (typeof voiceZhFor === 'function') ? voiceZhFor(S && S.P.ref) : null;
        const btn = $('ex-play');
        try {
            if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
            if (btn) btn.classList.add('loading');
            const resp = await fetchTTS(ttsBody(text, ttsLangFor('zh', vz), vz), 12000);
            if (my !== tok) return;
            if (!resp.ok) throw new Error('TTS http ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('TTS sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            au = new Audio(url);
            try { au.preservesPitch = true; au.webkitPreservesPitch = true; } catch (e) { /* noop */ }
            applyTtsSpeed(au, data);
            au.addEventListener('playing', () => applyTtsSpeed(au, data), { once: true });
            const fin = () => { URL.revokeObjectURL(url); if (my === tok) { au = null; setPlaying(false); } };
            au.onended = fin; au.onerror = fin;
            await au.play();
            if (my !== tok) { au.pause(); return; }
            setPlaying(true);
        } catch (e) {
            if (my !== tok) return;
            try {
                if ('speechSynthesis' in window) {
                    const u = new SpeechSynthesisUtterance(text);
                    u.lang = ttsLangFor('zh', vz);
                    u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                    const sv = (typeof sysVoiceFor === 'function') ? sysVoiceFor(ttsLangFor('zh', vz), vz) : null;
                    if (sv) u.voice = sv;
                    ttsU = u;
                    u.onend = () => { if (ttsU === u) { ttsU = null; setPlaying(false); } };
                    setPlaying(true);
                    speechSynthesis.speak(u);
                }
            } catch (e2) { /* silencioso */ }
        } finally {
            if (btn) btn.classList.remove('loading');
        }
    }

    // ── vistas ──
    function shell(num, res, html) {
        numEl.textContent = num || '';
        segEl.innerHTML = res ? res.map(r => '<span class="lq-seg' + (r === 1 ? ' ok' : r === 0 ? ' bad' : '') + '"></span>').join('') : '';
        body.innerHTML = html;
        body.scrollTop = 0;
    }
    function sectionPos(i) {
        const it = S.items[i];
        const same = S.items.filter(x => x.type === it.type);
        return { n: same.indexOf(it) + 1, of: same.length };
    }
    function pinyinOf(text) {
        try { return (typeof pinyinFor === 'function') ? pinyinFor(text, S.P.ref) : ''; } catch (e) { return ''; }
    }

    function renderEntry() {
        stopAudio();
        S = null;
        window.acScriptRef = null;
        if (!(window.GRADED_LESSONS || []).length) {
            shell('', null, '<p class="ex-sub">Todavía no hay lecciones cargadas para armar la práctica.</p>');
            return;
        }
        shell('', null,
            '<span class="ex-pill">Práctica · no oficial</span>' +
            '<h2 class="ex-title">🎯 Práctica tipo examen</h2>' +
            '<p class="ex-sub">20 ítems en 3 partes: escuchar, completar y ordenar. Sin tiempo límite. No es un examen oficial ni predice tu puntaje.</p>' +
            LEVELS.map(lv => {
                const P = poolOf(lv.k);
                const last = lastOf(lv.k);
                const info = (typeof TOCFL_INFO !== 'undefined' && TOCFL_INFO[lv.k]) ? ' ' + TOCFL_INFO[lv.k].zh : '';
                const words = (typeof EMBEDDED_MODULE_DATA !== 'undefined' && EMBEDDED_MODULE_DATA[lv.k] || []).length;
                return '<button type="button" class="ex-lv" data-k="' + lv.k + '"><span><span class="t">' + esc(lv.name) +
                    '<span lang="zh">' + esc(info) + '</span></span><span class="d">' + words + ' palabras · ' + P.ls.length + ' lecciones</span></span>' +
                    '<span class="last">' + (last ? 'Último ' + last.s + '/' + last.n : '—') + '</span></button>';
            }).join('') +
            '<p class="ex-note">Los ítems se arman con las lecciones y el vocabulario de cada nivel.</p>');
    }

    async function startSession(k, items) {
        const lv = levelOf(k);
        if (!lv) return;
        try { if (typeof ensureTocflPinyin === 'function') await ensureTocflPinyin(); } catch (e) { /* sigue sin pinyin de TOCFL */ }
        const sess = buildSession(k);
        if (items) sess.items = items.map(x => x.type === 'cloze' ? Object.assign({}, x, { opts: shuf(x.opts) }) : (x.type === 'listen' ? Object.assign({}, x, { opts: shuf(x.opts) }) : Object.assign({}, x, { chips: shuf(x.chips) })));
        if (!sess.items.length) { shell('', null, '<p class="ex-sub">No se pudieron armar ítems para este nivel.</p>'); return; }
        S = Object.assign(sess, { idx: 0, res: new Array(sess.items.length).fill(null), answered: false, retry: !!items, placed: [] });
        window.acScriptRef = S.P.ref;
        renderItem();
    }

    function renderItem() {
        stopAudio();
        const it = S.items[S.idx];
        S.answered = false;
        S.placed = [];
        const pos = sectionPos(S.idx);
        const head = '<div class="ex-sec">' + SECTIONS[it.type] + ' · ' + pos.n + ' de ' + pos.of + (S.retry ? ' · repaso' : '') + '</div>';
        const num = (S.idx + 1) + '/' + S.items.length;
        if (it.type === 'listen') {
            shell(num, S.res, head + '<p class="ex-q">¿Qué dice?</p>' +
                '<div class="ex-play"><button class="big" id="ex-play" type="button" aria-label="Escuchar la frase">🔊</button>' +
                '<span class="again">Tocá para escuchar · podés repetir</span></div>' +
                '<div class="lq-opts" id="ex-opts">' + it.opts.map((o, i) =>
                    '<button type="button" class="lq-opt" data-i="' + i + '"><span class="lq-opt-letter">' + 'ABC'[i] +
                    '</span><span class="ex-opt-es">' + esc(o.es) + '</span></button>').join('') + '</div>' +
                '<div id="ex-fb" class="ex-fbwrap" aria-live="polite"></div>');
        } else if (it.type === 'cloze') {
            const parts = it.zh.split('___');
            shell(num, S.res, head +
                '<div class="ex-cz" id="ex-cz">' + esc(parts[0]) + '<span class="lq-blank" id="ex-blank">？</span>' + esc(parts[1] || '') + '</div>' +
                '<div class="lq-opts" id="ex-opts">' + it.opts.map((o, i) =>
                    '<button type="button" class="lq-opt" data-i="' + i + '"><span class="lq-opt-letter">' + 'ABC'[i] +
                    '</span><span class="lq-opt-zh">' + esc(S.trad ? o.t : o.z) + '</span></button>').join('') + '</div>' +
                '<div id="ex-fb" class="ex-fbwrap" aria-live="polite"></div>');
        } else {
            shell(num, S.res, head + '<p class="ex-q">Armá la oración</p>' +
                '<div class="ex-tray" id="ex-tray" aria-label="Tu oración"></div>' +
                '<div class="ex-pool" id="ex-pool">' + it.chips.map((w, i) =>
                    '<button type="button" class="ex-chip" data-i="' + i + '">' + esc(w) + '</button>').join('') + '</div>' +
                '<div class="ex-actions" id="ex-act"><button type="button" class="lq-btn lq-ghost" id="ex-clear">Borrar</button>' +
                '<button type="button" class="lq-btn lq-primary" id="ex-check" disabled>Comprobar</button></div>' +
                '<div id="ex-fb" class="ex-fbwrap" aria-live="polite"></div>');
        }
    }

    function finishAnswer(ok, fbHtml) {
        S.res[S.idx] = ok ? 1 : 0;
        S.answered = true;
        const last = S.idx === S.items.length - 1;
        const fb = $('ex-fb');
        fb.innerHTML = fbHtml + '<button type="button" class="lq-btn lq-primary ex-next" id="ex-next">' + (last ? 'Ver resultado 🏁' : 'Siguiente ›') + '</button>';
        segEl.innerHTML = S.res.map(r => '<span class="lq-seg' + (r === 1 ? ' ok' : r === 0 ? ' bad' : '') + '"></span>').join('');
        const nx = $('ex-next');
        if (nx) { try { nx.focus({ preventScroll: true }); } catch (e) { /* noop */ } nx.scrollIntoView({ block: 'nearest' }); }
    }
    const verdict = (ok) => ok ? '<div class="lq-verdict ok">✓ ¡Correcto!</div>' : '<div class="lq-verdict bad">✗ Casi — repasala</div>';

    function answerChoice(i) {
        if (S.answered) return;
        const it = S.items[S.idx];
        const right = it.opts.findIndex(o => o.ok);
        const ok = i === right;
        document.querySelectorAll('#ex-opts .lq-opt').forEach((b, bi) => {
            b.disabled = true;
            if (bi === right) b.classList.add('is-right'); else if (bi === i) b.classList.add('is-wrong');
        });
        if (it.type === 'listen') {
            stopAudio();
            const py = pinyinOf(it.zh);
            finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '"><span class="ex-fb-zh" lang="zh">' + esc(it.zh) +
                '</span>' + (py ? '<span class="py">' + esc(py) + '</span>' : '') + '<span class="es">' + esc(it.es) + '</span></div>');
            return;
        }
        const r = it.opts[right], c = it.opts[i];
        const blank = $('ex-blank');
        if (blank) { blank.textContent = S.trad ? c.t : c.z; blank.classList.add(ok ? 'fill-ok' : 'fill-bad'); }
        const word = (o) => '<b lang="zh">' + esc(S.trad ? o.t : o.z) + '</b>' + (o.p ? ' (' + esc(o.p) + ')' : '') + ' — ' + esc(o.e);
        finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '">' +
            (ok ? word(r) : 'La correcta era ' + word(r)) + '<span class="es">' + esc(it.es) + '</span></div>');
        // mismo registro que las lecciones: aciertos → palabras aprendidas; errores → newWords + mazo SRS
        try {
            if (typeof state !== 'undefined') {
                if (ok) { state.knownWords.add(r.z); state.newWords.delete(r.z); } else state.newWords.add(r.z);
            }
            if (!ok && !S.retry && typeof window.acSrsMiss === 'function') {
                window.acSrsMiss({
                    w: 1, module: 'Práctica ' + S.P.lv.name, level: S.P.ref ? S.P.ref.hsk : 0,
                    chinese_simp_answer: r.z, chinese_trad_answer: r.t || r.z,
                    spanish_answer: r.e, spanish_alternatives: r.a || null,
                    spanish_full: it.es, chinese_simp_full: it.zhS, pinyin: r.p
                });
            }
            saveProgress(); updateStats(); updateVocabularyPanel();
        } catch (e) { /* el progreso general nunca bloquea la práctica */ }
    }

    // ── ordenar ──
    function paintOrder() {
        const it = S.items[S.idx];
        const tray = $('ex-tray');
        tray.innerHTML = S.placed.map((ci, p) =>
            '<button type="button" class="ex-chip in" data-p="' + p + '" aria-label="Quitar ' + esc(it.chips[ci]) + '">' + esc(it.chips[ci]) + '</button>').join('');
        document.querySelectorAll('#ex-pool .ex-chip').forEach(b => {
            const used = S.placed.indexOf(Number(b.dataset.i)) !== -1;
            b.classList.toggle('used', used);
            b.disabled = used;
        });
        $('ex-check').disabled = S.placed.length !== it.chips.length;
    }
    function checkOrder() {
        const it = S.items[S.idx];
        const mine = S.placed.map(ci => it.chips[ci]).join('');
        const ok = mine === it.words.join('');
        document.querySelectorAll('#ex-pool .ex-chip, #ex-tray .ex-chip').forEach(b => { b.disabled = true; });
        $('ex-act').classList.add('hidden');
        $('ex-tray').classList.add(ok ? 'is-right' : 'is-wrong');
        const py = pinyinOf(it.zh);
        finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '">' + (ok ? '' : 'La oración era ') +
            '<span class="ex-fb-zh" lang="zh">' + esc(it.words.join('')) + '</span>' + (py ? '<span class="py">' + esc(py) + '</span>' : '') +
            '<span class="es">' + esc(it.es) + '</span></div>');
    }

    // ── resultado ──
    function renderResult() {
        stopAudio();
        const total = S.items.length;
        const score = S.res.filter(r => r === 1).length;
        const sec = { listen: [0, 0], cloze: [0, 0], order: [0, 0] };
        S.items.forEach((it, i) => { sec[it.type][1]++; if (S.res[i] === 1) sec[it.type][0]++; });
        const wrong = S.items.filter((it, i) => S.res[i] !== 1);
        if (!S.retry) pushResult(S.k, { t: Date.now(), s: score, n: total, sec: { l: sec.listen, c: sec.cloze, o: sec.order } });
        const pct = score / total;
        const msg = pct >= 0.85 ? '¡Muy bien! Este nivel ya te resulta familiar.'
            : pct >= 0.6 ? 'Buen avance. Repasá los errores y probá otra tanda.'
                : 'Todavía cuesta: volvé a las lecciones de este nivel y probá de nuevo.';
        const zhName = (typeof TOCFL_INFO !== 'undefined' && TOCFL_INFO[S.k]) ? ' <span lang="zh">' + esc(TOCFL_INFO[S.k].zh) + '</span>' : '';
        shell('', S.res,
            '<span class="ex-pill">Práctica · no oficial</span>' +
            '<h2 class="ex-title">' + (S.retry ? 'Repaso de errores' : 'Terminaste') + ': ' + esc(S.P.lv.name) + zhName + '</h2>' +
            '<div class="ex-score">' + score + '<span>/' + total + '</span></div>' +
            Object.keys(sec).filter(t => sec[t][1]).map(t =>
                '<div class="ex-bar"><span class="nm">' + SECTIONS[t] + '</span><span class="tr"><span class="fl" style="width:' +
                Math.round(sec[t][0] / sec[t][1] * 100) + '%"></span></span><span class="n">' + sec[t][0] + '/' + sec[t][1] + '</span></div>').join('') +
            '<p class="ex-msg">' + msg + '</p>' +
            '<p class="ex-note">Práctica con el vocabulario y las lecciones de tu nivel. No equivale al examen oficial.</p>' +
            '<div class="ex-actions col">' +
            (wrong.length ? '<button type="button" class="lq-btn lq-primary" id="ex-retry">🔁 Repasar ' + (wrong.length === 1 ? 'el error' : 'los ' + wrong.length + ' errores') + '</button>' : '') +
            '<button type="button" class="lq-btn ' + (wrong.length ? 'lq-ghost' : 'lq-primary') + '" id="ex-again">▶ Otra tanda</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="ex-levels">Elegir otro nivel</button></div>');
        S.wrong = wrong;
    }

    // ── abrir / cerrar ──
    function open() {
        if (!pop) return;
        opener = document.activeElement;
        renderEntry();
        pop.classList.remove('hidden');
        if (typeof syncBodyScroll === 'function') syncBodyScroll();
        const first = body.querySelector('.ex-lv') || $('ex-close');
        try { first.focus({ preventScroll: true }); } catch (e) { /* noop */ }
    }
    function close() {
        if (!pop || pop.classList.contains('hidden')) return;
        stopAudio();
        pop.classList.add('hidden');
        S = null;
        window.acScriptRef = null;
        if (typeof syncBodyScroll === 'function') syncBodyScroll();
        if (opener && opener.isConnected && typeof opener.focus === 'function') { try { opener.focus({ preventScroll: true }); } catch (e) { /* noop */ } }
        opener = null;
    }

    function init() {
        pop = $('exam-pop'); body = $('ex-body'); numEl = $('ex-num'); segEl = $('ex-seg');
        const btn = $('btn-exam-practice');
        if (!pop || !body || !btn) return;
        btn.addEventListener('click', open);
        $('ex-close').addEventListener('click', close);
        body.addEventListener('click', (e) => {
            const t = e.target;
            const lv = t.closest('.ex-lv');
            if (lv) { startSession(lv.dataset.k); return; }
            if (t.closest('#ex-play')) { if (S) playText(S.items[S.idx].zh); return; }
            const op = t.closest('#ex-opts .lq-opt');
            if (op && S) { answerChoice(Number(op.dataset.i)); return; }
            const pc = t.closest('#ex-pool .ex-chip');
            if (pc && S && !S.answered) { S.placed.push(Number(pc.dataset.i)); paintOrder(); return; }
            const tc = t.closest('#ex-tray .ex-chip');
            if (tc && S && !S.answered) { S.placed.splice(Number(tc.dataset.p), 1); paintOrder(); return; }
            if (t.closest('#ex-clear') && S && !S.answered) { S.placed = []; paintOrder(); return; }
            if (t.closest('#ex-check') && S && !S.answered) { checkOrder(); return; }
            if (t.closest('#ex-next') && S) { if (S.idx < S.items.length - 1) { S.idx++; renderItem(); } else renderResult(); return; }
            if (t.closest('#ex-retry') && S) { startSession(S.k, S.wrong.slice()); return; }
            if (t.closest('#ex-again') && S) { startSession(S.k); return; }
            if (t.closest('#ex-levels')) { renderEntry(); return; }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden')) { e.stopImmediatePropagation(); close(); }
        }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    // solo lectura: pruebas E2E
    window.ExamDebug = { build: buildSession, open, close, state: () => S, levels: LEVELS };
})();
