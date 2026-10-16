// ============================================================
// readings-ui.js — «Lecturas tipo examen» (pestaña Exámenes)
// ------------------------------------------------------------
// Lista por nivel de window.READINGS (readings-*.js). Cada tarjeta abre el visor de
// lecciones (lessons-graduated.js, API window.LQ_READING): 📖 Leer (glosario + texto
// tocable) o 🎯 Responder (preguntas de comprensión con el texto a la vista).
// Textos originales de la app: nivel APROXIMADO, no oficial. Progreso: ac_reading_v1
// (lo escribe lessons-graduated.js; acá solo se lee). Script clásico, sin dependencias.
// ============================================================
(function readingsUiInit() {
    'use strict';
    const $ = (id) => document.getElementById(id);
    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const closed = new Set(); // niveles plegados por el usuario (sobrevive a los re-armados)
    // nivel de una lectura: HSK3, HSK5… o TOCFL-B1 (data-lv); el orden es HSK 1→9 y después TOCFL Prep→C
    const keyOf = (r) => r.exam === 'TOCFL' ? 'TOCFL-' + r.examLvl : 'HSK' + r.hsk;
    const TOCFL_ORDER = ['Prep', 'A1', 'A2', 'B1', 'B2', 'C1'];
    const rank = (k) => k.indexOf('TOCFL-') === 0 ? 100 + TOCFL_ORDER.indexOf(k.slice(6)) : Number(k.slice(3));
    const labelOf = (k) => k.indexOf('TOCFL-') === 0 ? 'TOCFL ' + (k.slice(6) === 'C1' ? 'C' : k.slice(6)) : 'HSK ' + k.slice(3);

    function render() {
        const wrap = $('reading-list');
        if (!wrap) return;
        const R = Array.isArray(window.READINGS) ? window.READINGS : [];
        if (!R.length) { wrap.innerHTML = '<p class="lessons-intro">📭 Todavía no hay lecturas.</p>'; return; }
        const prog = (id) => (window.LQ_READING && window.LQ_READING.progress(id)) || {};
        const levels = Array.from(new Set(R.map(keyOf))).sort((a, b) => rank(a) - rank(b));
        wrap.innerHTML = levels.map(h => {
            const items = R.filter(r => keyOf(r) === h);
            const done = items.filter(r => prog(r.id).done).length;
            const cards = items.map(r => {
                const p = prog(r.id);
                const trad = (typeof scriptFor === 'function' ? scriptFor(r) : 'simp') === 'trad';
                const chars = Array.from(r.lines.map(l => l.zh).join('')).filter(c => /[㐀-鿿]/.test(c)).length;
                const best = p.done ? p.best + '/' + p.of + ' <span class="lq-done">✓</span>' : '—';
                return '<div class="lesson-card rd-card">' +
                    '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">' + esc(r.emoji) + '</span>' +
                    '<span class="lc-hsk">' + esc(labelOf(h)) + ' · aprox.</span>' +
                    '<span class="lc-best">🎯 ' + best + '</span></div>' +
                    '<div class="lc-titles"><span class="lc-zh" lang="zh">' + esc(trad ? (r.titleZhT || r.titleZh) : r.titleZh) + '</span>' +
                    '<span class="lc-es">' + esc(r.titleEs) + '</span></div>' +
                    '<p class="lc-blurb">' + esc(r.blurb) + '</p>' +
                    '<div class="lc-meta">' + esc(r.genre) + ' · ' + chars + ' 字 · ' + r.questions.length + ' preguntas</div>' +
                    '<div class="lc-actions">' +
                    '<button type="button" class="lq-btn lc-read" data-act="story" data-id="' + esc(r.id) + '">📖 Leer</button>' +
                    '<button type="button" class="lq-btn lc-practice" data-act="quiz" data-id="' + esc(r.id) + '">🎯 Responder</button>' +
                    '</div></div>';
            }).join('');
            return '<details class="rd-level" data-lv="' + h + '"' + (closed.has(h) ? '' : ' open') + '>' +
                '<summary><span class="rd-level-name">' + esc(labelOf(h)) + '</span> <span class="rd-level-sub">nivel aproximado · ' + done + '/' + items.length + ' hechas</span></summary>' +
                '<div class="rd-level-cards">' + cards + '</div></details>';
        }).join('');
    }

    function boot() {
        const wrap = $('reading-list');
        if (!wrap) return;
        wrap.addEventListener('click', (e) => {
            const b = e.target.closest('.lq-btn[data-act]');
            if (b && window.LQ_READING) window.LQ_READING.open(b.dataset.id, b.dataset.act);
        });
        wrap.addEventListener('toggle', (e) => {
            const d = e.target;
            if (!d.classList || !d.classList.contains('rd-level')) return;
            const h = d.dataset.lv;
            if (d.open) closed.delete(h); else closed.add(h);
        }, true);
        document.addEventListener('ac-script-change', render);
        document.addEventListener('ac-reading-change', render);
        render();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
