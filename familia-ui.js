// ============================================================
// familia-ui.js — visor de las FICHAS DE FAMILIA (window.FAMILY_LESSONS, lessons-familia.js)
// ------------------------------------------------------------
// La lista vive en lessons-graduated.js (#fam-list, con un nivel TOCFL elegido); acá solo el visor, con las piezas que
// lessons-graduated.js exporta en window.LQ_UI (el mismo popup, el mismo 🔊 por línea vía bindLines → speakZh y el
// chip de velocidad). Nada nuevo de audio: no toca audio-tts.js, el servidor de voz ni las máquinas de estado.
//   · cada ficha: forma formal y su forma cotidiana (si la fuente la trae), con 🔊 por forma, pinyin o zhuyin
//     (el de la FUENTE, guardado en los datos: nunca se genera) y el español siempre a la vista
//   · sin caracteres tocables (.lq-ch) ni .lq-line-py: la ficha de palabra y el pinyin generado mostrarían otra lectura
//     (姊 = zǐ, 叔 = shū) y ofrecerían «Sumar a mi repaso»; sin .lq-lines: «Escuchar todo» no se engancha (S.view = 'fichas')
//   · sin práctica ni progreso: no toca el SRS, checkAnswer ni ac_lessons_v1
// Preferencia propia: ac_fam_pron ('py' | 'zy').
// ============================================================
(function familiaUiInit() {
    'use strict';
    const FAMS = () => (Array.isArray(window.FAMILY_LESSONS) ? window.FAMILY_LESSONS : []);
    const U = () => window.LQ_UI;
    const PKEY = 'ac_fam_pron';
    let pron = 'py';
    try { if (localStorage.getItem(PKEY) === 'zy') pron = 'zy'; } catch (e) { /* sin storage: pinyin */ }

    const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const zhOf = (p, k) => (k === 'trad' ? (p.zhT || p.zh) : p.zh);
    const pronLabel = () => (pron === 'zy' ? 'ㄅㄆㄇ Zhuyin' : '🔤 Pinyin');

    // una forma (formal o cotidiana): hanzi + pinyin/zhuyin + 🔊 (botón .lq-line-say: lo atiende bindLines)
    function rowHtml(p, k, cls, etiqueta) {
        const zh = zhOf(p, k);
        return '<div class="fam-row ' + cls + '">' +
            (etiqueta ? '<span class="fam-tag">' + esc(etiqueta) + '</span>' : '') +
            '<span class="fam-zh" lang="' + (k === 'trad' ? 'zh-Hant' : 'zh-Hans') + '">' + esc(zh) + '</span>' +
            '<span class="fam-pron" data-py="' + esc(p.py) + '" data-zy="' + esc(p.zy) + '">' + esc(pron === 'zy' ? p.zy : p.py) + '</span>' +
            '<button type="button" class="lq-line-say fam-say" data-zh="' + esc(zh) + '" aria-label="Escuchar ' + esc(zh) + '">🔊</button>' +
            '</div>';
    }
    function itemHtml(it, k) {
        const cot = it.cotidiano.filter(c => !c.repetido);
        let rows;
        if (it.destacarCotidiano && cot.length) {
            // 子 / 女 / 媳: la forma cotidiana a la vista; la formal, debajo y más chica
            rows = cot.map((c, i) => rowHtml(c, k, 'fam-row-main', i ? 'Cotidiano' : '')).join('') + rowHtml(it, k, 'fam-row-sec', 'Formal');
        } else {
            rows = rowHtml(it, k, 'fam-row-main', '') + cot.map(c => rowHtml(c, k, 'fam-row-sec', 'Cotidiano')).join('');
        }
        const notas = [];
        if (it.ancla) notas.push('Punto de partida del mapa.');
        if (it.destacarCotidiano) notas.push('La forma formal casi no se usa sola.');
        if (it.cotidianoIgual) notas.push('La forma cotidiana es la misma.');
        return '<div class="fam-item' + (it.ancla ? ' fam-ancla' : '') + '" data-id="' + esc(it.id) + '">' + rows +
            '<div class="fam-es">' + esc(it.es) + '</div>' +
            notas.map(n => '<div class="fam-nota">' + esc(n) + '</div>').join('') + '</div>';
    }
    function reglaHtml(r, k) {
        return '<section class="fam-grp fam-regla">' +
            '<div class="fam-marcas">' + r.marcas.map(m => '<span class="fam-marca"><span class="fam-zh" lang="zh">' + esc(zhOf(m, k)) + '</span>' +
                '<span class="fam-pron" data-py="' + esc(m.py) + '" data-zy="' + esc(m.zy) + '">' + esc(pron === 'zy' ? m.zy : m.py) + '</span></span>').join('') + '</div>' +
            '<p class="fam-regla-es">' + esc(r.es) + '</p>' +
            '<div class="fam-item fam-ejemplos">' + r.ejemplos.map(e => rowHtml(e, k, 'fam-row-sec', '')).join('') + '</div>' +
            '</section>';
    }

    function render(l) {
        const u = U(), k = u.zhKey(), body = u.els.body;
        const grupos = l.grupos ? l.grupos.map(g => '<section class="fam-grp"><h4 class="fam-grp-title">' + esc(g.titulo) + '</h4>' +
            g.items.map(it => itemHtml(it, k)).join('') + '</section>').join('') : l.reglas.map(r => reglaHtml(r, k)).join('');
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + l.emoji + '</span>' +
            '<div><div class="lq-story-zh" lang="zh">' + esc(k === 'trad' ? (l.titleZhT || l.titleZh) : l.titleZh) + '</div>' +
            '<div class="lq-story-es">' + esc(l.titleEs) + '</div>' +
            '<div class="fam-approx">' + esc(u.lessonTag(l)) + '</div></div></div>' +
            '<p class="lq-blurb">' + esc(l.blurb) + '</p>' +
            '<div class="fam-tools">' +
            '<button type="button" class="lq-btn lq-ghost" id="fam-pron" aria-label="Cambiar entre pinyin y zhuyin">' + pronLabel() + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="fam-speed">⚡ …</button>' +
            '</div>' +
            '<div class="fam-wrap">' + grupos + '</div>' +
            '<p class="fam-fuente">Fuente: ' + esc(l.fuente) + '. El chino y el zhuyin están pendientes de revisión.</p>';
        u.bindSpeedChip(body.querySelector('#fam-speed'));
        body.querySelector('#fam-pron').addEventListener('click', (e) => {
            pron = (pron === 'zy') ? 'py' : 'zy';
            try { localStorage.setItem(PKEY, pron); } catch (e2) { /* sin storage: no se recuerda */ }
            e.currentTarget.textContent = pronLabel();
            body.querySelectorAll('.fam-pron').forEach(el => { el.textContent = el.dataset[pron]; });
        });
        u.bindLines(body.querySelector('.fam-wrap')); // 🔊 → speakZh de lessons-graduated.js (voz según la familia: TOCFL)
    }

    function open(id) {
        const u = U(), l = FAMS().find(x => x.id === id);
        if (!u || !l) return false;
        const S = u.state;
        u.stopSpeak();
        S.lesson = l; S.view = 'fichas'; S.pinyin = false;
        window.acScriptRef = l; // 简/繁 y voz según la familia (TOCFL) de ESTA lección
        u.openPop();
        u.els.progNum.textContent = '🗂'; u.els.segs.innerHTML = '';
        render(l);
        return true;
    }
    // 简/繁 cambiado con el visor abierto: se vuelve a dibujar en la escritura nueva
    document.addEventListener('ac-script-change', () => {
        const u = U(), S = u && u.state;
        if (S && S.view === 'fichas' && S.lesson && S.lesson.kind === 'familia') render(S.lesson);
    });

    window.LQ_FAMILIA = {
        open,
        get pron() { return pron; },
        get lessons() { return FAMS().length; }
    };
})();
