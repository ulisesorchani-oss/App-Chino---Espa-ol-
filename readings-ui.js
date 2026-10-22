// ============================================================
// readings-ui.js — «Lecturas tipo examen» (pestaña Exámenes)
// ------------------------------------------------------------
// Lee la fuente única window.LECTURAS (readings-unify.js: lecturas v1 + v2). Tres pantallas:
//   · lista en Exámenes: «Lecturas tipo examen» (tipo 'examen', por nivel) y «Lecturas de estudio»
//     (tipo 'estudio', sección aparte). Cada tarjeta: 🎯 Practicar (principal) y 📖 Leer (secundario).
//   · 📖 Leer (todos los textos): glosario con asterisco en lo que está FUERA del nivel + texto tocable,
//     con pinyin, español, audio y karaoke. Usa las piezas del visor de lecciones que
//     lessons-graduated.js exporta en window.LQ_UI (ese archivo no lleva lógica de lecturas v2).
//   · 🎯 Practicar: v1 → la comprensión de siempre (lessons-graduated.js, vía LQ_READING.open);
//     v2 → comprensión de acá, con Verdadero/Falso (opciones fijas) además de las de 4 opciones.
// Etiqueta de TODOS los textos (HSK y TOCFL): «Nivel aproximado: HSK n · no oficial».
// Progreso: ac_reading_v1 (LQ_READING.progress / .save). No toca el SRS ni las palabras aprendidas.
// Script clásico, sin dependencias.
// ============================================================
(function readingsUiInit() {
    'use strict';
    const $ = (id) => document.getElementById(id);
    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const closed = new Set(); // niveles plegados por el usuario (sobrevive a los re-armados)
    const API = () => window.LECTURAS_API;
    const U = () => window.LQ_UI;
    const prog = (id) => (window.LQ_READING && window.LQ_READING.progress(id)) || {};
    const isTrad = (r) => (typeof scriptFor === 'function' ? scriptFor(r) : 'simp') === 'trad';
    const RD_TYPE = { detalle: 'Detalle', idea: 'Idea principal', inferencia: 'Inferencia', vocabulario: 'Vocabulario', vf: 'Verdadero o falso' };
    const hanzi = (r) => Array.from(r.lines.map(l => l.zh).join('')).filter(c => /[㐀-鿿]/.test(c)).length;

    // ───────────────────────── lista en Exámenes ─────────────────────────
    function cardHtml(r) {
        const p = prog(r.id), best = p.done ? p.best + '/' + p.of + ' <span class="lq-done">✓</span>' : '—';
        const n = r.preguntas.length;
        return '<div class="lesson-card rd-card" data-id="' + esc(r.id) + '">' +
            '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">' + esc(r.emoji) + '</span>' +
            '<span class="lc-best">🎯 ' + best + '</span></div>' +
            '<div class="rd-approx-label">' + esc(API().etiqueta(r)) + '</div>' +
            '<div class="lc-titles"><span class="lc-zh" lang="zh">' + esc(isTrad(r) ? (r.titleZhT || r.titleZh) : r.titleZh) + '</span>' +
            '<span class="lc-es">' + esc(r.titleEs) + '</span></div>' +
            (r.blurb ? '<p class="lc-blurb">' + esc(r.blurb) + '</p>' : '') +
            '<div class="lc-meta">' + esc(r.genre) + ' · ' + hanzi(r) + ' 字 · ' + n + ' pregunta' + (n === 1 ? '' : 's') + '</div>' +
            '<div class="lc-actions">' +
            '<button type="button" class="lq-btn lq-primary lc-practice" data-act="practice" data-id="' + esc(r.id) + '">🎯 Practicar</button>' +
            '<button type="button" class="lq-btn lq-ghost lc-read" data-act="read" data-id="' + esc(r.id) + '">📖 Leer</button>' +
            '</div></div>';
    }
    function groupsHtml(items, prefix) {
        const levels = [];
        items.forEach(r => { if (!levels.some(l => l.key === r.nivelKey)) levels.push({ key: r.nivelKey, label: r.nivelLabel }); });
        return levels.map(lv => {
            const its = items.filter(r => r.nivelKey === lv.key), done = its.filter(r => prog(r.id).done).length, id = prefix + lv.key;
            return '<details class="rd-level" data-lv="' + esc(id) + '"' + (closed.has(id) ? '' : ' open') + '>' +
                '<summary><span class="rd-level-name">' + esc(lv.label) + '</span> <span class="rd-level-sub">nivel aproximado · ' + done + '/' + its.length + ' hechas</span></summary>' +
                '<div class="rd-level-cards">' + its.map(cardHtml).join('') + '</div></details>';
        }).join('');
    }
    function render() {
        const wrap = $('reading-list');
        if (!wrap || !API()) return;
        const ex = API().examen(), es = API().estudio();
        wrap.innerHTML = ex.length ? groupsHtml(ex, 'ex-') : '<p class="lessons-intro">📭 Todavía no hay lecturas.</p>';
        const sec = $('rd-study-section'), sw = $('reading-study');
        if (sec && sw) { sec.classList.toggle('hidden', !es.length); sw.innerHTML = es.length ? groupsHtml(es, 'es-') : ''; }
    }

    // ───────────────────────── 📖 Leer (todos los textos) ─────────────────────────
    function headHtml(r, extra) {
        return '<div class="lq-story-head"><span class="lq-story-emoji">' + esc(r.emoji) + '</span>' +
            '<div><div class="lq-story-zh">' + esc(isTrad(r) ? (r.titleZhT || r.titleZh) : r.titleZh) + '</div>' +
            '<div class="lq-story-es">' + esc(r.titleEs) + '</div>' +
            '<div class="rd-approx-label">' + esc(API().etiqueta(r)) + '</div></div></div>' + (extra || '');
    }
    function openStory(r) {
        const u = U(), S = u.state;
        S.lesson = r; S.view = 'story'; S.pinyin = false;
        window.acScriptRef = r; // 简/繁 y pinyin según la familia de ESTE texto
        u.openPop();
        u.els.progNum.textContent = '📖'; u.els.segs.innerHTML = '';
        u.pyReady(r).then(() => {
            if (S.lesson !== r || S.view !== 'story') return; // se cerró o se cambió de texto mientras cargaba
            if (r.glosario.length >= 3) renderGlossary(r); else renderStory(r);
        });
    }
    function renderGlossary(r) {
        const u = U(), k = u.zhKey(), body = u.els.body;
        const stars = r.glosario.some(g => g.fueraDeNivel === true);
        body.innerHTML = headHtml(r, '<p class="lq-blurb">Antes de leer, estas son algunas palabras clave del texto:</p>') +
            '<div class="lq-glossary">' + r.glosario.map(g =>
                '<div class="lq-gloss-item">' +
                '<span class="lq-gloss-zh" lang="zh">' + esc(k === 'trad' ? (g.zhT || g.zh) : g.zh) +
                (g.fueraDeNivel === true ? '<span class="lq-gloss-star" title="Fuera del nivel" aria-label="fuera del nivel">*</span>' : '') + '</span>' +
                '<span class="lq-gloss-py">' + esc(g.py || u.pyLine(g.zh)) + '</span>' +
                '<span class="lq-gloss-es">' + esc(g.es) + '</span></div>').join('') + '</div>' +
            (stars ? '<p class="lq-gloss-legend">* Fuera del nivel: es una palabra más difícil que ' + esc(r.nivelLabel) + '.</p>' : '') +
            '<div class="lq-gloss-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-gloss-skip">Saltar</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-gloss-continue">Leer el texto →</button></div>';
        body.querySelector('#lq-gloss-skip').addEventListener('click', () => renderStory(r));
        body.querySelector('#lq-gloss-continue').addEventListener('click', () => renderStory(r));
    }
    function renderStory(r) {
        const u = U(), S = u.state, body = u.els.body;
        body.innerHTML = headHtml(r, r.blurb ? '<p class="lq-blurb">' + esc(r.blurb) + '</p>' : '') +
            '<div class="lq-lines">' + u.linesHtml(r, u.getVerEs()) + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-es">🇪🇸 Español: ' + (u.getVerEs() ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-pinyin">🔤 Pinyin: OFF</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-speed">⚡ …</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-kara">✨ Karaoke: ' + ((typeof KARA !== 'undefined' && KARA.on()) ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-story-practice">🎯 Practicar</button></div>';
        u.bindSpeedChip(body.querySelector('#lq-story-speed'));
        body.querySelector('#lq-story-kara').addEventListener('click', (e) => {
            const v = !(typeof KARA !== 'undefined' && KARA.on());
            try { localStorage.setItem('ac_karaoke', v ? '1' : '0'); } catch (e2) { /* sin storage */ }
            if (!v && typeof KARA !== 'undefined') KARA.stop();
            e.target.textContent = '✨ Karaoke: ' + (v ? 'ON' : 'OFF');
        });
        body.querySelector('#lq-story-practice').addEventListener('click', () => practicar(r));
        body.querySelector('#lq-story-es').addEventListener('click', (e) => {
            u.setVerEs(!u.getVerEs());
            e.target.textContent = '🇪🇸 Español: ' + (u.getVerEs() ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-es').forEach(el => el.classList.toggle('hidden', !u.getVerEs()));
        });
        body.querySelector('#lq-story-pinyin').addEventListener('click', (e) => {
            S.pinyin = !S.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF');
            u.pyReady(r).then(() => body.querySelectorAll('.lq-line-py, .lq-who-py').forEach(el => {
                if (S.pinyin && !el.textContent) el.textContent = u.pyLine(el.dataset.zh);
                el.classList.toggle('hidden', !S.pinyin);
            }));
        });
        u.bindLines(body.querySelector('.lq-lines'));
    }

    // ───────────────────────── 🎯 Practicar ─────────────────────────
    // v1: la comprensión de siempre. v2: la de acá (con V/F). Los v1 NO pasan por el código nuevo.
    function practicar(r) {
        if (r.origen === 'v1') { window.LQ_READING.open(r.id, 'quiz'); return; }
        openQuiz(r);
    }
    function permOf(n) {
        const d = Array.from({ length: n }, (_, i) => i);
        for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
        return d;
    }
    function openQuiz(r) {
        const u = U(), S = u.state;
        S.lesson = r; S.view = 'rquiz2'; S.idx = 0; S.picks = [];
        S.results = new Array(r.preguntas.length).fill(null);
        // la correcta (índice ok) cambia de lugar en cada sesión; Verdadero/Falso siempre en ese orden
        S.order = r.preguntas.map(q => q.fixed ? q.opts.map((_, i) => i) : permOf(q.opts.length));
        S.pinyin = false; S.rTextOpen = true;
        window.acScriptRef = r;
        u.openPop();
        renderQ();
    }
    function renderQ() {
        const u = U(), S = u.state, body = u.els.body, r = S.lesson, q = r.preguntas[S.idx], ord = S.order[S.idx], n = r.preguntas.length;
        const k = u.zhKey();
        S.answered = false;
        u.els.progNum.textContent = (S.idx + 1) + '/' + n;
        u.renderSegments();
        const letter = (pos) => q.type === 'vf' ? 'VF'[pos] : 'ABCD'[pos];
        const optHtml = ord.map((di, pos) =>
            '<button type="button" class="lq-opt rd-opt' + (q.type === 'vf' ? ' rd-opt-vf' : '') + '" data-pos="' + pos + '"><span class="lq-opt-letter">' + letter(pos) + '</span>' +
            '<span class="rd-opt-body"><span class="rd-opt-es">' + esc(q.opts[di]) + '</span></span></button>').join('');
        body.innerHTML =
            '<div class="lq-tag-row"><div class="lq-lesson-tag">' + esc(r.emoji) + ' ' + esc(r.titleEs) + '</div>' +
            '<span class="rd-approx">' + esc(API().etiqueta(r)) + '</span></div>' +
            '<details class="rd-text"' + (S.rTextOpen === false ? '' : ' open') + '><summary>📄 Texto <span lang="zh">' +
            esc(k === 'trad' ? (r.titleZhT || r.titleZh) : r.titleZh) + '</span></summary>' +
            '<div class="lq-lines rd-lines">' + u.linesHtml(r, false) + '</div>' +
            '<div class="rd-text-tools"><button type="button" class="lq-btn lq-ghost lq-mini" id="rd-py">🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF') + '</button></div></details>' +
            '<div class="rd-q"><div class="rd-q-meta">Pregunta ' + (S.idx + 1) + ' de ' + n + ' · ' + esc(RD_TYPE[q.type] || q.type) + '</div>' +
            '<div class="rd-q-es" id="rd-q-es">' + esc(q.es) + '</div>' +
            '<div class="lq-opts rd-opts" id="lq-opts">' + optHtml + '</div>' +
            '<div class="lq-feedback hidden" id="lq-feedback"></div>' +
            '<div class="lq-foot"><button type="button" class="lq-btn lq-primary hidden" id="lq-next">' +
            (S.idx === n - 1 ? 'Ver resultado 🏁' : 'Siguiente ▶') + '</button></div></div>';
        u.bindLines(body.querySelector('.rd-lines'));
        body.querySelector('.rd-text').addEventListener('toggle', (e) => { S.rTextOpen = e.target.open; });
        const applyPy = () => u.pyReady(r).then(() => body.querySelectorAll('.rd-lines .lq-line-py').forEach(el => {
            if (S.pinyin && !el.textContent) el.textContent = u.pyLine(el.dataset.zh);
            el.classList.toggle('hidden', !S.pinyin);
        }));
        if (S.pinyin) applyPy();
        body.querySelector('#rd-py').addEventListener('click', (e) => {
            S.pinyin = !S.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF');
            applyPy();
        });
        body.querySelector('#lq-opts').addEventListener('click', (e) => {
            const b = e.target.closest('.lq-opt');
            if (b && !S.answered) answer(+b.dataset.pos);
        });
        body.querySelector('#lq-next').addEventListener('click', next);
    }
    function answer(pos) {
        const u = U(), S = u.state, body = u.els.body, r = S.lesson, q = r.preguntas[S.idx], ord = S.order[S.idx];
        S.answered = true;
        const di = ord[pos], ok = di === q.ok, rightPos = ord.indexOf(q.ok);
        S.results[S.idx] = ok; S.picks[S.idx] = di;
        u.renderSegments();
        body.querySelectorAll('.lq-opt').forEach((b, bi) => {
            b.disabled = true;
            if (bi === rightPos) b.classList.add('is-right');
            else if (bi === pos) b.classList.add('is-wrong');
        });
        let fb;
        if (q.type === 'vf') {
            fb = (ok ? '<div class="lq-verdict ok">✓ ¡Correcto!</div>' : '<div class="lq-verdict bad">✗ No es esa</div>') +
                '<p class="rd-why"><b>La afirmación es ' + (q.ok === 0 ? 'verdadera' : 'falsa') + '.</b> ' + esc(q.why) + '</p>';
        } else {
            const whyNot = di !== q.ok ? (q.whyNot || [])[di > q.ok ? di - 1 : di] : '';
            fb = ok
                ? '<div class="lq-verdict ok">✓ ¡Correcto!</div><p class="rd-why">' + esc(q.why) + '</p>'
                : '<div class="lq-verdict bad">✗ No es esa</div><p class="rd-why rd-why-bad"><b>Tu respuesta:</b> ' + esc(whyNot) + '</p>' +
                  '<p class="rd-why"><b>La correcta (' + 'ABCD'[rightPos] + '):</b> ' + esc(q.why) + '</p>';
        }
        const fbel = body.querySelector('#lq-feedback');
        fbel.innerHTML = fb; fbel.classList.remove('hidden');
        const nx = body.querySelector('#lq-next');
        nx.classList.remove('hidden');
        try { nx.scrollIntoView({ block: 'nearest' }); } catch (e) { /* sin scroll */ }
    }
    function next() {
        const u = U(), S = u.state, body = u.els.body, r = S.lesson, n = r.preguntas.length;
        if (S.idx < n - 1) { S.idx++; renderQ(); return; }
        const score = S.results.filter(Boolean).length, prev = prog(r.id);
        // se conserva lo que ya hubiera en el registro (otras secciones) y se actualiza la comprensión
        window.LQ_READING.save(r.id, Object.assign({}, prev, { best: Math.max(prev.best || 0, score), of: n, done: true, last: localDay(), tries: (prev.tries || 0) + 1, qs: S.results.map(Boolean) }));
        u.els.progNum.textContent = '🏁'; u.els.segs.innerHTML = '';
        const by = {};
        r.preguntas.forEach((q, i) => { const t = by[q.type] || (by[q.type] = { ok: 0, n: 0 }); t.n++; if (S.results[i]) t.ok++; });
        const breakdown = Object.keys(by).map(t => '<li><span>' + esc(RD_TYPE[t] || t) + '</span><b>' + by[t].ok + '/' + by[t].n + '</b></li>').join('');
        const msg = score === n ? '¡Perfecto! Entendiste todo el texto.' : score / n >= 0.66 ? '¡Muy bien! Entendiste lo esencial.' : 'Releé el texto con calma y probá de nuevo.';
        const others = API().all().filter(x => API().visible(x) && x.id !== r.id);
        const nxt = others.find(x => x.nivelKey === r.nivelKey && !prog(x.id).done) || others.find(x => !prog(x.id).done) || others[0];
        body.innerHTML =
            '<div class="lq-final"><div class="lq-final-emoji">' + esc(r.emoji) + '</div>' +
            '<div class="lq-final-score">' + score + '/' + n + '</div>' +
            '<div class="lq-final-msg">' + msg + '</div>' +
            '<ul class="rd-breakdown">' + breakdown + '</ul>' +
            '<div class="lq-final-actions">' +
            '<button type="button" class="lq-btn lq-ghost" id="rd-final-read">📖 Releer el texto</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="rd-final-retry">🔁 Repetir las preguntas</button>' +
            (nxt ? '<button type="button" class="lq-btn lq-ghost" id="rd-final-next">➡️ Otro texto</button>' : '') +
            '<button type="button" class="lq-btn lq-primary" id="lq-final-close">Seguir ✕</button></div></div>';
        body.querySelector('#rd-final-read').addEventListener('click', () => openStory(r));
        body.querySelector('#rd-final-retry').addEventListener('click', () => openQuiz(r));
        const nb = body.querySelector('#rd-final-next');
        if (nb) nb.addEventListener('click', () => openStory(nxt));
        body.querySelector('#lq-final-close').addEventListener('click', () => u.closePop());
    }

    // ───────────────────────── arranque ─────────────────────────
    // La comprensión v1 (lessons-graduated.js) tiene su propio rótulo «Lectura · HSK n (aprox.) · no oficial»:
    // se reemplaza por la etiqueta común sin tocar ese archivo (solo mientras haya un v1 abierto).
    function unifyV1Label() {
        const u = U(), l = u && u.state.lesson;
        if (!l || l.kind !== 'reading') return;
        const r = API().get(l.id);
        if (!r || r.origen !== 'v1') return;
        const el = u.els.body.querySelector('.rd-approx'), t = API().etiqueta(r);
        if (el && el.textContent !== t) el.textContent = t;
    }
    function boot() {
        const wrap = $('reading-list');
        if (!wrap || !API() || !U()) return;
        const click = (e) => {
            const b = e.target.closest('.lq-btn[data-act]');
            if (!b) return;
            const r = API().get(b.dataset.id);
            if (!r) return;
            if (b.dataset.act === 'practice') practicar(r); else openStory(r);
        };
        const toggle = (e) => {
            const d = e.target;
            if (!d.classList || !d.classList.contains('rd-level')) return;
            if (d.open) closed.delete(d.dataset.lv); else closed.add(d.dataset.lv);
        };
        [wrap, $('reading-study')].forEach(w => { if (w) { w.addEventListener('click', click); w.addEventListener('toggle', toggle, true); } });
        new MutationObserver(unifyV1Label).observe(U().els.body, { childList: true, subtree: true });
        document.addEventListener('ac-script-change', render);
        document.addEventListener('ac-reading-change', render);
        render();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
