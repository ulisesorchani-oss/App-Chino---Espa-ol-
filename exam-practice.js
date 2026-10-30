// ============================================================
// exam-practice.js — Práctica tipo examen (piloto: TOCFL Prep, A1 y B1, HSK 1, HSK 3, HSK 4 y HSK 5)
// ============================================================
// Sesión de 20 ítems sin tiempo límite. Se arma con las lecciones de cada nivel
// (window.GRADED_LESSONS) y, si existe, con el banco escrito de exam-items.js
// (window.EXAM_ITEMS: diálogos, lecturas y oraciones para ordenar por nivel):
//   · 🎧 Escuchar (4): suena una línea y se elige qué dice, entre 3 opciones en
//     español. Los distractores salen primero de la MISMA lección.
//   · 🎧 Diálogo (3): suena un diálogo de dos voces y se responde una pregunta.
//   · 📖 Completar (5): el quiz de las lecciones (hueco + 3 opciones).
//   · 📖 Lectura (3): un texto corto y una pregunta.
//   · 🧩 Ordenar (3): fichas de una oración de UNA cláusula, SOLO del banco escrito y revisado
//     (nada de las lecciones). Cada ítem trae sus fichas a mano y la lista de órdenes ACEPTADOS
//     (el original + las variantes confirmadas, mismas fichas en otro orden); las que esperan
//     confirmación (st: 'pend') no salen. Baraja guardada entre tandas ('ac_order_deck_v1'): no se
//     repite ninguna hasta usar todas las del nivel. Si faltan, se compensa con Escuchar y Completar.
//   Sin banco para un nivel: 6 Escuchar + 8 Completar + 6 Ordenar (como antes).
//   R9 — Niveles con LECTURAS (window.READINGS v1: HSK 3, HSK 5 y TOCFL B1; y las de tipo «examen» del esquema v2
//   en window.LECTURAS, readings-unify.js: HSK 4): la tanda lleva
//   un texto con 3 o 4 preguntas («📖 Texto», cuentan en la parte «Leer») + Escuchar y Completar
//   hasta los 20; sin «Ordenar» (no hay banco revisado para esos niveles). El texto va PLANO
//   mientras se responde (es un examen) y al responder se vuelve tocable, con pinyin y
//   traducción (window.LQ_TEXT de lessons-graduated.js). El historial suma rd: [{ id, s, n }].
//   Rota los textos: sale primero el que hace más tiempo que no aparece.
//   HSK 4: sin banco escrito ni «Ordenar»/«Diálogo» (no hay material revisado); los textos v2 traen
//   sus preguntas ya normalizadas (opción correcta = índice `ok`; V/F con opciones fijas Verdadero/Falso).
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
    const N_LISTEN = 6, N_CLOZE = 8, N_ORDER = 6;            // sin banco escrito
    const MIX = { listen: 5, dialogue: 3, cloze: 6, reading: 3, order: 3 }; // con banco (suma 20)
    const DECK_KEY = 'ac_order_deck_v1';
    const $ = (id) => document.getElementById(id);
    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // nivel de práctica → cómo se reconocen sus lecciones
    const LEVELS = [
        { k: 'TOCFL-Prep', name: 'TOCFL Prep', pick: l => l.exam === 'TOCFL' && l.examLvl === 'Prep' },
        { k: 'TOCFL-A1', name: 'TOCFL A1', pick: l => l.exam === 'TOCFL' && l.examLvl === 'A1' },
        { k: 'HSK1', name: 'HSK 1', pick: l => !l.exam && l.hsk === 1 },
        { k: 'HSK3', name: 'HSK 3', pick: l => !l.exam && l.hsk === 3, reads: 3 },
        { k: 'HSK4', name: 'HSK 4', pick: l => !l.exam && l.hsk === 4, reads: 4 },
        { k: 'HSK5', name: 'HSK 5', pick: l => !l.exam && l.hsk === 5, reads: 5 },
        // TOCFL B1 (módulo 'TOCFL-B3' en la app): lecturas de readings-tocfl.js
        { k: 'TOCFL-B3', name: 'TOCFL B1', pick: l => l.exam === 'TOCFL' && l.examLvl === 'B1', reads: { exam: 'TOCFL', lvl: 'B1' } }
    ];
    const levelOf = (k) => LEVELS.find(x => x.k === k);
    const SECTIONS = { listen: '🎧 Escuchar', dialogue: '🎧 Diálogo', cloze: '📖 Completar', reading: '📖 Lectura', rtext: '📖 Texto', order: '🧩 Ordenar' };
    // el resultado agrupa en 3 partes (y el historial guarda l / c / o)
    const GROUP = { listen: 'l', dialogue: 'l', cloze: 'c', reading: 'c', rtext: 'c', order: 'o' };
    const GROUP_NAME = { l: '🎧 Escuchar', c: '📖 Leer', o: '🧩 Ordenar' };
    // la voz B de un diálogo es la del otro género en la misma familia
    const OPP_VOICE = { f: 'm', m: 'f', 'tw-f': 'tw-m', 'tw-m': 'tw-f', f2: 'm2', m2: 'f2' };

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
    // una oración → ítem de ordenar (o null si no sirve: varias cláusulas, segmentación rara, simétrica)
    function makeOrder(text, es, min, max) {
        const t = String(text || '').replace(/[。！？!?.]+$/, '');
        if (!t || CLAUSE.test(t)) return null; // una sola cláusula: el orden es único
        let seg = [];
        try { seg = zhSegmentAll(t); } catch (e) { seg = []; }
        if (seg.join('') !== t || !seg.every(w => /[㐀-鿿]/.test(w))) return null;
        if (seg.length < min || seg.length > max) return null;
        let ch = shuf(seg);
        if (ch.join('|') === seg.join('|')) ch = seg.slice().reverse();
        if (ch.join('|') === seg.join('|')) return null; // simétrica: no hay desorden posible
        return { type: 'order', words: seg, chips: ch, es: es, zh: t };
    }
    function genOrder(P, trad, n, usedEs) {
        const mk = (min, max) => {
            const out = [];
            for (const x of shuf(P.lines)) {
                if (out.length >= n) break;
                if (usedEs.has(x.es)) continue;
                const it = makeOrder(trad ? x.zhT : x.zh, x.es, min, max);
                if (!it) continue;
                out.push(it);
                usedEs.add(x.es);
            }
            return out;
        };
        let out = mk(4, 8);
        if (out.length < n) { const more = mk(3, 9); out = out.concat(more).slice(0, n); }
        return out;
    }
    // ── «Ordenar» del banco escrito: fichas a mano, órdenes aceptados y baraja guardada ──
    const activeOrders = (B) => (B.orders || []).filter(o => o.st === 'ok' && Array.isArray(o.w) && o.w.length >= 3);
    function readDeck() {
        try { const o = JSON.parse(localStorage.getItem(DECK_KEY) || '{}'); return (o && typeof o === 'object') ? o : {}; }
        catch (e) { return {}; }
    }
    // Baraja guardada: una COLA de oraciones armada con «bolsas» (cada bolsa = todas las del nivel, una vez cada
    // una → salen parejo). Cada tanda saca `n` de la cola. Al faltar se arma otra bolsa al azar pero respetando una
    // SEPARACIÓN mínima entre dos apariciones de la misma oración (3 tandas = 3·n lugares; si no entra, 2 tandas,
    // y si no, 1): con 9 o más oraciones no hay repetidas en 3 tandas seguidas, y nunca dentro de una tanda.
    // Estado en 'ac_order_deck_v1': { [nivel]: { d: cola, l: última tanda, u: último lugar de cada una, i: lugar de d[0] } }
    function planBag(ids, u, idx0, gap) {
        const rel = (id) => (typeof u[id] === 'number') ? u[id] + gap : -Infinity;
        const feasible = (rem, idx) => rem.map(rel).sort((x, y) => x - y).every((v, j) => v <= idx + j);
        const bag = [], rem = ids.slice();
        for (let idx = idx0; rem.length; idx++) {
            const okIds = rem.filter(id => rel(id) <= idx && feasible(rem.filter(x => x !== id), idx + 1));
            if (!okIds.length) return null;
            const id = okIds[Math.floor(Math.random() * okIds.length)];
            bag.push(id); rem.splice(rem.indexOf(id), 1);
        }
        return bag;
    }
    function drawOrders(k, B, n) {
        const act = activeOrders(B), ids = act.map(o => o.id);
        if (!ids.length) return [];
        const db = readDeck(), cur = (db[k] && typeof db[k] === 'object') ? db[k] : {};
        let q = (Array.isArray(cur.d) ? cur.d : []).filter((id, i, a) => ids.indexOf(id) !== -1 && a.indexOf(id) === i);
        const u = {};
        ids.forEach(id => { if (cur.u && typeof cur.u[id] === 'number') u[id] = cur.u[id]; });
        let i0 = (typeof cur.i === 'number') ? cur.i : 0;
        const take = Math.min(n, ids.length);
        if (q.length < take) {
            const at = i0 + q.length;
            let bag = planBag(ids, u, at, 3 * take) || planBag(ids, u, at, 2 * take) || planBag(ids, u, at, take);
            if (!bag) bag = shuf(ids).sort((a, b) => (typeof u[a] === 'number' ? u[a] : -1) - (typeof u[b] === 'number' ? u[b] : -1));
            bag.forEach((id, j) => { u[id] = at + j; });
            q = q.concat(bag);
        }
        const pick = q.slice(0, take);
        db[k] = { d: q.slice(take), l: pick, u: u, i: i0 + take };
        try { localStorage.setItem(DECK_KEY, JSON.stringify(db)); } catch (e) { /* sin storage: sale al azar */ }
        return pick.map(id => act.find(o => o.id === id));
    }
    // lo que se muestra nunca es ya una respuesta válida
    function shufChips(words, accept) {
        let ch = shuf(words), t = 0;
        while (accept.indexOf(ch.join('')) !== -1 && t++ < 30) ch = shuf(words);
        if (accept.indexOf(ch.join('')) !== -1) ch = words.slice().reverse();
        return ch;
    }
    function makeBankOrder(o, trad) {
        const words = trad ? o.wT : o.w;
        if (!Array.isArray(words) || words.length < 3) return null;
        const zh = words.join('');
        const accept = [zh].concat(((trad ? o.altT : o.alt) || []).filter(a => a !== zh));
        return { type: 'order', words: words, chips: shufChips(words, accept), es: o.es, zh: zh, accept: accept };
    }
    const isAcceptedOrder = (it, mine) => (it.accept || [it.words.join('')]).indexOf(mine) !== -1;
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
    // ── banco escrito (exam-items.js) ──
    const bankOf = (k) => {
        const b = window.EXAM_ITEMS && window.EXAM_ITEMS[k];
        return (b && Array.isArray(b.dialogues) && Array.isArray(b.readings) && Array.isArray(b.orders)) ? b : null;
    };
    const zhPick = (o, trad) => (trad ? (o.zhT || o.zh) : o.zh);
    const choices = (q) => shuf(q.opts.map((t, i) => ({ es: t, ok: i === 0 ? 1 : 0 })));
    function genDialogue(B, trad, n) {
        return shuf(B.dialogues).slice(0, n).map(d => ({
            type: 'dialogue', id: d.id, q: d.q.es, opts: choices(d.q),
            lines: d.lines.map(l => ({ who: l.who, zh: zhPick(l, trad), es: l.es }))
        }));
    }
    function genReading(B, trad, n) {
        return shuf(B.readings).slice(0, n).map(r => ({
            type: 'reading', id: r.id, zh: zhPick(r, trad), es: r.es, q: r.q.es, opts: choices(r.q)
        }));
    }
    // ── lecturas con varias preguntas (R9) ──
    const readingsOf = (k) => {
        const h = (levelOf(k) || {}).reads;
        if (!h) return [];
        const same = (typeof h === 'object') ? (r => r.exam === h.exam && r.examLvl === h.lvl) : (r => !r.exam && r.hsk === h);
        const v1 = (window.READINGS || []).filter(r => r && r.kind === 'reading' && same(r) && Array.isArray(r.questions) && r.questions.length && Array.isArray(r.lines));
        // esquema v2 (readings-examen.js, ya normalizado en LECTURAS): solo los de tipo «examen» y visibles; los de estudio no entran
        const vis = (window.LECTURAS_API && window.LECTURAS_API.visible) || (() => true);
        const v2 = (window.LECTURAS || []).filter(r => r && r.origen === 'v2' && r.tipo === 'examen' && vis(r) && same(r) && Array.isArray(r.preguntas) && r.preguntas.length && Array.isArray(r.lines));
        return v1.concat(v2);
    };
    // rota: sale el texto que hace más tiempo que no aparece (los que nunca salieron, primero)
    function pickReading(k) {
        const rs = readingsOf(k);
        if (!rs.length) return null;
        const hist = Array.isArray(readDB()[k]) ? readDB()[k] : [];
        const recent = hist.map(r => (r.rd && r.rd[0]) ? r.rd[0].id : null);
        const age = (r) => recent.lastIndexOf(r.id); // -1 = nunca; más alto = más reciente
        const min = Math.min.apply(null, rs.map(age));
        return shuf(rs.filter(r => age(r) === min))[0];
    }
    function genRText(r, trad) {
        const pk = (a, aT) => (trad && aT) ? aT : a;
        if (r.origen === 'v2') { // preguntas normalizadas: opción correcta = `ok`; V/F con opciones fijas (sin barajar)
            return r.preguntas.map((q, qi) => {
                const zhQ = !!q.qZh; // HSK 5 v2 con preguntas en chino
                const opts = q.opts.map((t, i) => ({
                    es: t, zh: zhQ ? pk(q.optsZh[i], (q.optsZhT || [])[i]) : '', ok: i === q.ok ? 1 : 0,
                    whyNot: (q.type === 'vf' || i === q.ok) ? '' : ((q.whyNot || [])[i - (i > q.ok ? 1 : 0)] || '')
                }));
                return { type: 'rtext', rid: r.id, qi: qi, rd: r, trad: trad, q: q.es, qzh: zhQ ? pk(q.qZh, q.qZhT) : '', why: q.why, opts: q.fixed ? opts : shuf(opts) };
            });
        }
        return r.questions.map((q, qi) => {
            const zhQ = !!q.qZh; // desde HSK 5 la pregunta va en chino
            return {
                type: 'rtext', rid: r.id, qi: qi, rd: r, trad: trad,
                q: q.es, qzh: zhQ ? pk(q.qZh, q.qZhT) : '', why: pk(q.why, q.whyT),
                opts: shuf(q.opts.map((t, i) => ({
                    es: t, zh: zhQ ? pk(q.optsZh[i], (q.optsZhT || [])[i]) : '', ok: i === 0 ? 1 : 0,
                    whyNot: i ? pk((q.whyNot || [])[i - 1], (q.whyNotT || [])[i - 1]) : ''
                })))
            };
        });
    }
    function buildSession(k) {
        const P = poolOf(k);
        const trad = P.ref ? scriptFor(P.ref) === 'trad' : false;
        const B = bankOf(k);
        const R = B ? null : pickReading(k);
        if (R) {
            const texto = genRText(R, trad);
            const rest = 20 - texto.length, used = new Set();
            const listen = genListen(P, trad, Math.ceil(rest * 0.45), used);
            listen.forEach(i => used.add(i.es));
            const cloze = genCloze(P, trad, rest - listen.length, used);
            return { k, P, trad, rd: R, items: listen.concat(cloze, texto) };
        }
        if (B) {
            const used = new Set();
            const order = drawOrders(k, B, MIX.order).map(o => makeBankOrder(o, trad)).filter(Boolean); // solo del banco revisado
            order.forEach(o => used.add(o.es));
            const deficit = MIX.order - order.length;
            const listen = genListen(P, trad, MIX.listen + Math.ceil(deficit / 2), used);
            listen.forEach(i => used.add(i.es));
            const cloze = genCloze(P, trad, MIX.cloze + Math.floor(deficit / 2), used);
            return { k, P, trad, items: listen.concat(genDialogue(B, trad, MIX.dialogue), cloze, genReading(B, trad, MIX.reading), order) };
        }
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
        if (window.LQ_TEXT) { try { window.LQ_TEXT.stop(); } catch (e) { /* noop */ } }
        if (au) { try { au.pause(); } catch (e) { /* noop */ } au = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* noop */ }
        ttsU = null;
        setPlaying(false);
    }
    // Reproduce una lista de partes en orden: [{ text, b }]. b = voz del otro género (diálogos).
    async function playSeq(parts) {
        const my = ++tok;
        if (au) { try { au.pause(); } catch (e) { /* noop */ } au = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* noop */ }
        const base = (typeof voiceZhFor === 'function') ? voiceZhFor(S && S.P.ref) : null;
        const voiceOf = (pt) => (pt.b ? (OPP_VOICE[base] || base) : base);
        const btn = $('ex-play');
        const clip = async (pt) => {
            const vz = voiceOf(pt);
            const resp = await fetchTTS(ttsBody(pt.text, ttsLangFor('zh', vz), vz), 12000);
            if (!resp.ok) throw new Error('TTS http ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('TTS sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return { url: URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' })), data };
        };
        const playClip = (c) => new Promise((resolve, reject) => {
            const a = new Audio(c.url);
            au = a;
            try { a.preservesPitch = true; a.webkitPreservesPitch = true; } catch (e) { /* noop */ }
            applyTtsSpeed(a, c.data);
            a.addEventListener('playing', () => applyTtsSpeed(a, c.data), { once: true });
            const done = () => { URL.revokeObjectURL(c.url); resolve(); };
            a.onended = done; a.onpause = done; a.onerror = done;
            a.play().catch(reject);
        });
        try {
            if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
            if (btn) btn.classList.add('loading');
            let next = clip(parts[0]);
            next.catch(() => { /* se maneja al esperarla */ });
            for (let i = 0; i < parts.length; i++) {
                const c = await next;
                if (my !== tok) { URL.revokeObjectURL(c.url); return; }
                if (i + 1 < parts.length) { next = clip(parts[i + 1]); next.catch(() => { /* idem */ }); }
                if (btn) btn.classList.remove('loading');
                setPlaying(true);
                await playClip(c);
                if (my !== tok) return;
            }
            au = null;
            setPlaying(false);
        } catch (e) {
            if (my !== tok) return;
            try {
                if ('speechSynthesis' in window) {
                    // respaldo: voz del sistema (el segundo hablante, con tono distinto)
                    parts.forEach((pt, i) => {
                        const vz = voiceOf(pt);
                        const u = new SpeechSynthesisUtterance(pt.text);
                        u.lang = ttsLangFor('zh', vz);
                        u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                        u.pitch = pt.b ? 0.8 : 1.1;
                        const sv = (typeof sysVoiceFor === 'function') ? sysVoiceFor(ttsLangFor('zh', vz), vz) : null;
                        if (sv) u.voice = sv;
                        if (i === parts.length - 1) u.onend = () => { if (my === tok) setPlaying(false); };
                        ttsU = u;
                        speechSynthesis.speak(u);
                    });
                    setPlaying(true);
                }
            } catch (e2) { /* silencioso */ }
        } finally {
            if (btn) btn.classList.remove('loading');
        }
    }
    const playText = (text) => playSeq([{ text }]);

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
            '<p class="ex-sub">20 ítems en 3 partes: escuchar (frases y diálogos), leer (completar y lecturas) y ordenar. Sin tiempo límite. No es un examen oficial ni predice tu puntaje.</p>' +
            LEVELS.map(lv => {
                const P = poolOf(lv.k);
                const last = lastOf(lv.k);
                const info = (typeof TOCFL_INFO !== 'undefined' && TOCFL_INFO[lv.k]) ? ' ' + TOCFL_INFO[lv.k].zh : '';
                const words = (typeof EMBEDDED_MODULE_DATA !== 'undefined' && EMBEDDED_MODULE_DATA[lv.k] || []).length;
                return '<button type="button" class="ex-lv" data-k="' + lv.k + '"><span><span class="t">' + esc(lv.name) +
                    '<span lang="zh">' + esc(info) + '</span></span><span class="d">' + words + ' palabras · ' + P.ls.length + ' lecciones' + (readingsOf(lv.k).length ? ' · lecturas' : '') + '</span></span>' +
                    '<span class="last">' + (last ? 'Último ' + last.s + '/' + last.n : '—') + '</span></button>';
            }).join('') +
            '<p class="ex-note">Los ítems se arman con las lecciones y el vocabulario de cada nivel.</p>' +
            (LEVELS.some(lv => readingsOf(lv.k).length)
                ? '<p class="ex-note">En los niveles con «lecturas» la tanda trae un texto con varias preguntas (nivel aproximado) y, por ahora, no trae «Ordenar».</p>' : ''));
    }

    async function startSession(k, items) {
        const lv = levelOf(k);
        if (!lv) return;
        try { if (typeof ensureTocflPinyin === 'function') await ensureTocflPinyin(); } catch (e) { /* sigue sin pinyin de TOCFL */ }
        let sess;
        if (items) { // el repaso de errores no arma una tanda nueva (no gasta la baraja de «Ordenar»)
            const P = poolOf(k);
            sess = { k, P, trad: P.ref ? scriptFor(P.ref) === 'trad' : false };
            sess.items = items.map(x => x.opts ? Object.assign({}, x, { opts: shuf(x.opts) }) : Object.assign({}, x, { chips: shufChips(x.words, x.accept || [x.words.join('')]) }));
        } else sess = buildSession(k);
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
        } else if (it.type === 'dialogue') {
            shell(num, S.res, head + '<p class="ex-q">Escuchá el diálogo y respondé</p>' +
                '<div class="ex-play"><button class="big" id="ex-play" type="button" aria-label="Escuchar el diálogo">🔊</button>' +
                '<span class="again">Dos voces, ' + it.lines.length + ' líneas · podés repetir</span></div>' +
                '<p class="ex-qtext">' + esc(it.q) + '</p>' +
                '<div class="lq-opts" id="ex-opts">' + it.opts.map((o, i) =>
                    '<button type="button" class="lq-opt" data-i="' + i + '"><span class="lq-opt-letter">' + 'ABC'[i] +
                    '</span><span class="ex-opt-es">' + esc(o.es) + '</span></button>').join('') + '</div>' +
                '<div id="ex-fb" class="ex-fbwrap" aria-live="polite"></div>');
        } else if (it.type === 'reading') {
            shell(num, S.res, head + '<div class="ex-text" lang="zh">' + esc(it.zh) + '</div>' +
                '<p class="ex-qtext">' + esc(it.q) + '</p>' +
                '<div class="lq-opts" id="ex-opts">' + it.opts.map((o, i) =>
                    '<button type="button" class="lq-opt" data-i="' + i + '"><span class="lq-opt-letter">' + 'ABC'[i] +
                    '</span><span class="ex-opt-es">' + esc(o.es) + '</span></button>').join('') + '</div>' +
                '<div id="ex-fb" class="ex-fbwrap" aria-live="polite"></div>');
        } else if (it.type === 'rtext') {
            const zhQ = !!it.qzh;
            shell(num, S.res, head +
                '<details class="rd-text"' + (S.rTextOpen === false ? '' : ' open') + '><summary>📄 Texto</summary>' +
                (it.rd.nota ? '<p class="rd-nota">' + esc(it.rd.nota) + '</p>' : '') +
                '<div class="lq-lines rd-lines rd-plain" id="ex-rtext" lang="zh">' + it.rd.lines.map(l => '<p>' + esc(it.trad ? (l.zhT || l.zh) : l.zh) + '</p>').join('') + '</div></details>' +
                '<div class="rd-q">' + (zhQ
                    ? '<div class="rd-q-zh" lang="zh">' + esc(it.qzh) + '</div><div class="rd-q-es hidden" id="rd-q-es">' + esc(it.q) + '</div>' +
                      '<button type="button" class="lq-btn lq-ghost lq-mini" id="ex-rd-es">🇪🇸 Ver en español</button>'
                    : '<div class="rd-q-es" id="rd-q-es">' + esc(it.q) + '</div>') +
                '<div class="lq-opts rd-opts" id="ex-opts">' + it.opts.map((o, i) =>
                    '<button type="button" class="lq-opt rd-opt" data-i="' + i + '"><span class="lq-opt-letter">' + 'ABCD'[i] + '</span><span class="rd-opt-body">' + (zhQ
                        ? '<span class="rd-opt-zh" lang="zh">' + esc(o.zh) + '</span><span class="rd-opt-es hidden">' + esc(o.es) + '</span>'
                        : '<span class="rd-opt-es">' + esc(o.es) + '</span>') + '</span></button>').join('') + '</div>' +
                '<div id="ex-fb" class="ex-fbwrap" aria-live="polite"></div></div>');
            const det = body.querySelector('.rd-text');
            if (det) det.addEventListener('toggle', (e) => { S.rTextOpen = e.target.open; });
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
        if (it.type === 'dialogue') {
            stopAudio();
            finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '">' + it.lines.map(l => {
                const py = pinyinOf(l.zh);
                return '<div class="ex-tr"><span class="lq-line-who lq-who-' + l.who + '">' + l.who.toUpperCase() + '</span><div>' +
                    '<span class="ex-fb-zh" lang="zh">' + esc(l.zh) + '</span>' + (py ? '<span class="py">' + esc(py) + '</span>' : '') +
                    '<span class="es">' + esc(l.es) + '</span></div></div>';
            }).join('') + '</div>');
            return;
        }
        if (it.type === 'rtext') {
            // tras responder: todo en español, explicación y el texto pasa a ser tocable (pinyin + traducción)
            document.querySelectorAll('#rd-q-es, .rd-opt-es').forEach(el => el.classList.remove('hidden'));
            const eb = $('ex-rd-es'); if (eb) eb.classList.add('hidden');
            const chosen = it.opts[i];
            finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '">' +
                (ok || !chosen.whyNot ? '' : '<span class="es"><b>Tu respuesta:</b> ' + esc(chosen.whyNot) + '</span>') +
                '<span class="es">' + (ok ? '' : '<b>La correcta (' + 'ABCD'[right] + '):</b> ') + esc(it.why) + '</span></div>');
            const box = $('ex-rtext');
            if (box && window.LQ_TEXT) {
                box.classList.remove('rd-plain');
                box.removeAttribute('lang');
                box.innerHTML = window.LQ_TEXT.linesHtml(it.rd, true);
                window.LQ_TEXT.bind(box);
                window.LQ_TEXT.showPinyin(box, S.P.ref);
            }
            return;
        }
        if (it.type === 'reading') {
            const py = pinyinOf(it.zh);
            finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '">' +
                (py ? '<span class="py">' + esc(py) + '</span>' : '') + '<span class="es">' + esc(it.es) + '</span></div>');
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
        const ok = isAcceptedOrder(it, mine);
        const canon = it.words.join('');
        const shown = ok ? mine : canon; // si valía otro orden, se muestra el tuyo
        document.querySelectorAll('#ex-pool .ex-chip, #ex-tray .ex-chip').forEach(b => { b.disabled = true; });
        $('ex-act').classList.add('hidden');
        $('ex-tray').classList.add(ok ? 'is-right' : 'is-wrong');
        const py = pinyinOf(shown);
        finishAnswer(ok, verdict(ok) + '<div class="ex-fb' + (ok ? ' ok' : ' bad') + '">' + (ok ? '' : 'La oración era ') +
            '<span class="ex-fb-zh" lang="zh">' + esc(shown) + '</span>' + (py ? '<span class="py">' + esc(py) + '</span>' : '') +
            '<span class="es">' + esc(it.es) + '</span>' +
            (ok && mine !== canon ? '<span class="es">También se dice: <b lang="zh">' + esc(canon) + '</b></span>' : '') + '</div>');
    }

    // ── resultado ──
    function renderResult() {
        stopAudio();
        const total = S.items.length;
        const score = S.res.filter(r => r === 1).length;
        const sec = { l: [0, 0], c: [0, 0], o: [0, 0] };
        S.items.forEach((it, i) => { const g = GROUP[it.type]; sec[g][1]++; if (S.res[i] === 1) sec[g][0]++; });
        const wrong = S.items.filter((it, i) => S.res[i] !== 1);
        const rec = { t: Date.now(), s: score, n: total, sec: { l: sec.l, c: sec.c, o: sec.o } };
        const rq = S.items.map((it, i) => ({ it, ok: S.res[i] === 1 })).filter(x => x.it.type === 'rtext');
        if (rq.length) rec.rd = [{ id: rq[0].it.rid, s: rq.filter(x => x.ok).length, n: rq.length }]; // R9: la lectura de la tanda
        if (!S.retry) pushResult(S.k, rec);
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
                '<div class="ex-bar"><span class="nm">' + GROUP_NAME[t] + '</span><span class="tr"><span class="fl" style="width:' +
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
            if (t.closest('#ex-rd-es') && S) {
                const hid = $('rd-q-es').classList.contains('hidden');
                document.querySelectorAll('#rd-q-es, .rd-opt-es').forEach(el => el.classList.toggle('hidden', !hid));
                $('ex-rd-es').textContent = hid ? '🇨🇳 Ocultar el español' : '🇪🇸 Ver en español';
                return;
            }
            if (t.closest('#ex-play')) {
                if (S) {
                    const cur = S.items[S.idx];
                    if (cur.type === 'dialogue') playSeq(cur.lines.map(l => ({ text: l.zh, b: l.who === 'b' })));
                    else playText(cur.zh);
                }
                return;
            }
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
            if (e.key === 'Escape' && !pop.classList.contains('hidden')) {
                if (typeof topLayerOpen === 'function' && topLayerOpen()) return; // una ficha de palabra encima: esa cierra primero
                e.stopImmediatePropagation(); close();
            }
        }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    // solo lectura: pruebas E2E
    window.ExamDebug = { build: buildSession, open, close, state: () => S, levels: LEVELS, accepts: isAcceptedOrder, deck: readDeck, draw: drawOrders, bankOrder: makeBankOrder };
})();
