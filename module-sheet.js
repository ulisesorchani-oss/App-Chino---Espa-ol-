// ============================================================
// module-sheet.js — Botón del módulo en Hoy + hoja «¿Qué practicás?»
// ============================================================
// El distintivo de la tarjeta de Hoy (#mod-btn: bandera, nombre, ▾ y
// contador) abre una hoja con los módulos del modo activo:
//   · aprendo chino (es-cn): HSK, TOCFL, Diaria y Clásicos;
//   · aprendo español (cn-es): DELE, Diaria y Clásicos.
// Elegir carga el módulo con setModule(mod, { stay: true }) — sin saltar
// de vista — y cierra la hoja. nav.js la registra: Atrás = ✕.
// Si el botón no entra en una línea, cede primero el contador (nunca la
// bandera). Aviso de una sola vez con showFeatureTip ('ac_seen_modsheet').
// Script clásico, después de app.js. No toca SRS ni checkAnswer.
// ============================================================
(function () {
    'use strict';

    const TIP_KEY = 'modsheet';
    const isZh = () => state.mode === 'cn-es';
    const T = (es, zh) => (isZh() ? zh : es);
    const fmt = (n) => Number(n).toLocaleString('es-AR');
    const count = (mod) => (EMBEDDED_MODULE_DATA[mod] || []).length;
    const $ = (id) => document.getElementById(id);
    function esc(t) {
        return String(t == null ? '' : t).replace(/[&<>"']/g,
            c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // HSK 7-9 es un solo tramo oficial, repartido en tercios para dosificar
    const HSK_SUB = { 1: 'Elemental', 2: 'Elemental', 3: 'Elemental', 4: 'Intermedio', 5: 'Intermedio',
        6: 'Intermedio', 7: 'Avanzado 1/3', 8: 'Avanzado 2/3', 9: 'Avanzado 3/3' };
    const TOCFL_GROUPS = [
        ['🎯 Band A (Prep → A2)', ['TOCFL-Prep', 'TOCFL-A1', 'TOCFL-A2']],
        ['🚀 Band B (B1 → B2)', ['TOCFL-B3', 'TOCFL-B4']],
        ['💫 Band C', ['TOCFL-C']],
        ['💬 Fuera de los niveles', ['TOCFL']]
    ];

    // Secciones del modo activo: { id, title, items: [{ mod, code, sub, subZh, n, dis } | { group }], note }
    function sections() {
        const S = [];
        if (!isZh()) {
            const c = (typeof hskCumulativeCounts === 'function') ? hskCumulativeCounts() : {};
            S.push({
                id: 'hsk', title: 'HSK', exam: true,
                items: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
                    mod: 'HSK' + n, code: n <= 6 ? String(n) : '7-9', sub: HSK_SUB[n],
                    n: c['HSK' + n] ? fmt(c['HSK' + n]) + ' palabras' : ''
                })),
                note: c.TOTAL ? 'Palabras acumuladas hasta cada nivel, de ' + fmt(c.TOTAL) + ' en total.' : ''
            });
            const items = [];
            TOCFL_GROUPS.forEach(([g, mods]) => {
                items.push({ group: g });
                mods.forEach(m => items.push({
                    mod: m, code: TOCFL_INFO[m].badge, sub: TOCFL_INFO[m].zh, subZh: true,
                    n: fmt(count(m)) + (m === 'TOCFL' ? ' frases' : ' palabras')
                }));
            });
            S.push({ id: 'tocfl', title: '🇹🇼 TOCFL', exam: true, items });
        } else {
            // R4: lecciones para chicos (pista «Niños» de las mini-dramas DELE): va a
            // Aprender → Lecciones con la pista ya elegida, no a Hoy (no es un módulo de tarjetas)
            const kids = (window.DeleLessons && window.DeleLessons.count('Niños')) || 0;
            const items = [{ group: '🧒 儿童' },
                { track: 'Niños', code: 'Niños', sub: '儿童', subZh: true, n: kids ? kids + ' 课' : '即将推出' },
                { group: '🎒 青少年（11–17 岁）' }];
            Object.keys(DELE_INFO).forEach(m => items.push({
                mod: m, code: DELE_INFO[m].badge, sub: DELE_INFO[m].zh, subZh: true, n: count(m) + ' 句'
            }));
            items.push({ group: '🌍 成人' }, { code: 'A1–C2', n: '即将推出', dis: true });
            S.push({ id: 'dele', title: '🇪🇸 DELE', exam: true, items });
        }
        // Diaria: mismos nombres e íconos que el menú de la pestaña Diaria
        const daily = Array.from(document.querySelectorAll('#daily-menu [data-module]')).map(b => ({
            mod: b.dataset.module,
            code: b.dataset.module === 'todas' ? T('📖 Todas', '📖 全部') : b.textContent.trim()
        }));
        S.push({ id: 'daily', title: T('📚 Diaria', '📚 日常'), items: daily });
        S.push({
            id: 'classics', title: T('📜 Clásicos', '📜 经典'),
            items: CLASSICS_MODULES.map(m => {
                const ci = CLASSICS_INFO[m];
                const zh = scriptFor(m) === 'trad' ? ci.zhT : ci.zh;
                return isZh()
                    ? { mod: m, code: zh, sub: ci.es, n: count(m) + ' 句' }
                    : { mod: m, code: ci.es, sub: zh, subZh: true, n: count(m) + ' frases' };
            })
        });
        return S;
    }

    function render(opts) {
        const cur = state.activeModule;
        const secs = sections();
        const hasCur = secs.some(s => s.items.some(i => i.mod === cur));
        $('ms-body').innerHTML = secs.map(s => {
            const curItem = s.items.find(i => i.mod && i.mod === cur);
            const open = (opts && opts.exam) ? s.exam : (curItem || (!hasCur && s.exam));
            return '<details class="ms-sec" data-sec="' + s.id + '"' + (open ? ' open' : '') + '>' +
                '<summary><span class="ms-sec-title">' + esc(s.title) + '</span>' +
                '<span class="ms-cur">' + (curItem ? esc(curItem.code) : '') + '</span></summary>' +
                '<ul class="ms-list">' + s.items.map(i => i.group
                    ? '<li class="ms-group">' + esc(i.group) + '</li>'
                    : '<li><button type="button" class="ms-item' + (i.mod && i.mod === cur ? ' on' : '') + '"' +
                      (i.dis ? ' disabled' : i.track ? ' data-track="' + esc(i.track) + '"' : ' data-module="' + esc(i.mod) + '"') +
                      (i.mod === cur ? ' aria-current="true"' : '') + '>' +
                      '<span class="mi-code">' + esc(i.code) + '</span>' +
                      (i.sub ? '<span class="mi-sub"' + (i.subZh ? ' lang="zh"' : '') + '>' + esc(i.sub) + '</span>' : '') +
                      (i.n ? '<span class="mi-n">' + esc(i.n) + '</span>' : '') +
                      '</button></li>').join('') + '</ul>' +
                (s.note ? '<p class="ms-note">' + esc(s.note) + '</p>' : '') +
                '</details>';
        }).join('');
    }

    let opener = null;
    function open(opts) {
        const ov = $('mod-sheet');
        if (!ov) return;
        try { localStorage.setItem('ac_seen_' + TIP_KEY, '1'); } catch (e) { /* noop */ }
        opener = document.activeElement;
        $('ms-title').textContent = T('¿Qué practicás?', '练习什么？');
        $('btn-mod-sheet-close').setAttribute('aria-label', T('Cerrar', '关闭'));
        render(opts);
        ov.classList.remove('hidden');
        if (typeof syncBodyScroll === 'function') syncBodyScroll();
        const body = $('ms-body');
        // el activo solo cuenta si su sección quedó abierta (con { exam } puede no estarlo)
        const on = body.querySelector('.ms-sec[open] .ms-item.on');
        const sec = on ? on.closest('.ms-sec') : null;
        body.scrollTop = sec ? sec.offsetTop - body.offsetTop : 0;
        try { (on || $('btn-mod-sheet-close')).focus({ preventScroll: true }); } catch (e) { /* noop */ }
    }
    function close() {
        const ov = $('mod-sheet');
        if (!ov || ov.classList.contains('hidden')) return;
        ov.classList.add('hidden');
        if (typeof syncBodyScroll === 'function') syncBodyScroll();
        if (opener && opener.isConnected && typeof opener.focus === 'function') {
            try { opener.focus({ preventScroll: true }); } catch (e) { /* noop */ }
        }
        opener = null;
    }

    // Cede primero el contador: si nombre + contador no entran, se oculta
    // el contador. Solo se mide con Hoy visible (oculto, todo mide 0).
    function fit() {
        const b = $('mod-btn');
        if (!b) return;
        const name = $('card-level').textContent;
        const num = $('card-number').textContent;
        b.setAttribute('aria-label', T('Módulo: ', '模块：') + name + ' · ' + num + '. ' + T('Cambiar de módulo', '切换模块'));
        if (b.offsetParent === null) return;
        b.classList.remove('no-count');
        const nm = b.querySelector('.mb-name');
        const meta = b.parentElement;
        if (nm.scrollWidth > nm.clientWidth + 1 || b.scrollWidth > b.clientWidth + 1 ||
            b.getBoundingClientRect().right > meta.getBoundingClientRect().right + 0.5) {
            b.classList.add('no-count');
        }
    }

    // Aviso de una sola vez: solo para quien ya había terminado la guía al
    // cargar (no se suma a la primera visita) y con Hoy a la vista sin otra capa.
    let tipAllowed = false;
    try {
        tipAllowed = localStorage.getItem('ac_onboarding_done_v2') === '1' ||
                     localStorage.getItem('ac_onboarding_done_v1') === '1';
    } catch (e) { /* sin storage: sin aviso */ }
    // Si el alumno toca o teclea algo antes de que salga, se cancela: queda
    // para la próxima entrada a Hoy (nunca aparece en medio de otra acción).
    let tipT = 0;
    function cancelTip() {
        clearTimeout(tipT);
        document.removeEventListener('pointerdown', cancelTip, true);
        document.removeEventListener('keydown', cancelTip, true);
    }
    function maybeTip() {
        cancelTip();
        if (!tipAllowed || typeof window.showFeatureTip !== 'function') return;
        try { if (localStorage.getItem('ac_seen_' + TIP_KEY) === '1') return; } catch (e) { return; }
        document.addEventListener('pointerdown', cancelTip, true);
        document.addEventListener('keydown', cancelTip, true);
        tipT = setTimeout(() => {
            cancelTip();
            const b = $('mod-btn');
            if (!b || b.offsetParent === null || !state._uiReady) return;
            try { if (localStorage.getItem('ac_seen_' + TIP_KEY) === '1') return; } catch (e) { return; }
            // nada encima (popups, lectores, banners de trazos, guía) y sin estar escribiendo
            if ((window.Nav && window.Nav.stack.length) ||
                document.querySelector('.vocab-pop:not(.hidden), .lq-pop:not(.hidden), .wp-banner:not(.hidden), ' +
                '#guide-pop:not(.hidden), #dele-pop:not(.hidden), #stats-pop:not(.hidden), #install-help:not(.hidden), ' +
                '#mod-sheet:not(.hidden), .ve-dl-overlay')) return;
            const ae = document.activeElement;
            if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable)) return;
            b.classList.add('mb-pulse');
            window.showFeatureTip(TIP_KEY, '🔀', T('Cambiar de módulo', '切换模块'), [
                T('Tocá el botón con el nombre del módulo, arriba de la tarjeta, para cambiar de examen, nivel o situación.',
                  '点卡片上方的模块名称按钮，可以换考试、级别或场景。'),
                T('Al elegir, el módulo se carga acá mismo, sin cambiar de pantalla.', '选好后直接在这里加载，不换页面。')
            ]);
        }, 700);
    }

    function onHoy() {
        requestAnimationFrame(fit);
        maybeTip();
    }

    function init() {
        const b = $('mod-btn');
        const ov = $('mod-sheet');
        if (!b || !ov) return;
        b.addEventListener('click', () => open());
        b.addEventListener('animationend', () => b.classList.remove('mb-pulse'));
        $('btn-mod-sheet-close').addEventListener('click', close);
        ov.addEventListener('click', (e) => {
            if (e.target === ov) { close(); return; }
            const tr = e.target.closest('.ms-item[data-track]');
            if (tr) { // R4: pista de lecciones → Aprender → Lecciones, con la pista elegida
                close();
                showView('aprender');
                const tab = $('tab-lessons');
                if (tab) tab.click();
                if (window.DeleLessons) window.DeleLessons.showTrack(tr.dataset.track);
                return;
            }
            const it = e.target.closest('.ms-item[data-module]');
            if (!it) return;
            close();
            setModule(it.dataset.module, { stay: true });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !ov.classList.contains('hidden')) { e.stopImmediatePropagation(); close(); }
        }, true);
        let rT = 0;
        window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(fit, 120); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    window.ModSheet = { open, close, fit, onHoy };
})();
