// ============================================================
// placement-test.js — Test de colocación HSK
// ============================================================
// Extraído de app.js (fase 9 de modularización, 2026-09-24): el quiz
// adaptativo de colocación (HSK 1-9, popup clon de #vocab-pop). Ya era
// una IIFE autocontenida (placementInit, patrón pzInit) que solo
// expone window.PL_DEBUG — nada externo la llama.
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js (usa EMBEDDED_MODULE_DATA/
// expandWordCards de data-embedded.js en tiempo de ejecución).
// ============================================================

// ======================================================================
// v7.20 — TEST DE COLOCACIÓN (HSK 3.0 · 9 niveles)
// ======================================================================
// Quiz adaptativo sobre las palabras embebidas de v7.19:
//   · Empieza en HSK 1 y sube de a un nivel.
//   · Por nivel: hanzi → 4 opciones en español. 2 aciertos pasan al
//     siguiente nivel; 2 fallos terminan el test; 1-1 = desempate con
//     una tercera palabra del mismo nivel.
//   · Resultado = primer nivel donde el alumno empieza a fallar
//     (o HSK 9 si aprueba todo). Se guarda en localStorage 'ac_placement'
//     y ofrece "📚 Practicar HSK X" (setModule + pestaña Exámenes).
// Popup clon de #vocab-pop (#placement-pop + body delegado + cierre por
// ✕ / Escape / clic fuera). IIFE autocontenida al estilo pzInit: cero
// cambios en el código existente de app.js.
(function placementInit() {
    'use strict';

    const PL_KEY = 'ac_placement'; // convención ac_ del proyecto
    const MAX_LV = 9;
    const PL_DESC = {
        1: 'Elemental · arranque desde cero',
        2: 'Elemental · bases del día a día',
        3: 'Elemental · supervivencia sólida',
        4: 'Intermedio · primeras conversaciones',
        5: 'Intermedio · fluidez cotidiana',
        6: 'Intermedio · comprensión amplia',
        7: 'Superior · debate y medios',
        8: 'Superior · académico y profesional',
        9: 'Superior · nivel casi nativo'
    };

    const plEsc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g,
        (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const deacc = (s) => String(s || '').toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').trim();
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }

    const PL = {
        phase: 'idle',   // idle | intro | quiz | result
        lv: 1,           // nivel bajo prueba
        qInLv: 0,        // preguntas respondidas en el nivel actual
        rightInLv: 0,    // aciertos en el nivel actual
        qTotal: 0,
        rightTotal: 0,
        used: new Set(), // palabras ya preguntadas (por hanzi simplificado)
        cur: null        // {card, opts, correctIdx}
    };

    // ---- almacenamiento ----
    function plSave(level, allPassed) {
        try {
            localStorage.setItem(PL_KEY, JSON.stringify({
                v: 1, level: level, allPassed: !!allPassed,
                right: PL.rightTotal, total: PL.qTotal,
                date: new Date().toISOString()
            }));
        } catch (e) { /* silencioso */ }
    }
    function plSaved() {
        try {
            const r = JSON.parse(localStorage.getItem(PL_KEY) || 'null');
            if (r && r.v === 1 && r.level >= 1 && r.level <= 9) return r;
        } catch (e) { /* silencioso */ }
        return null;
    }
    function plUpdateStatus() {
        const el = document.getElementById('placement-status');
        if (!el) return;
        const r = plSaved();
        if (!r) { el.classList.add('hidden'); return; }
        let fecha = '';
        try {
            fecha = new Date(r.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        } catch (e) { /* sin fecha */ }
        el.textContent = '🎯 Último test: HSK ' + r.level + ' · ' + r.right + '/' + r.total +
            ' aciertos' + (fecha ? ' · ' + fecha : '');
        el.classList.remove('hidden');
    }

    // ---- banco de palabras (tuplas v7.19 → tarjetas memoizadas) ----
    function plWordsFor(lv) {
        const key = 'HSK' + lv;
        if (typeof EMBEDDED_MODULE_DATA === 'undefined' || !EMBEDDED_MODULE_DATA[key]) return [];
        const rows = EMBEDDED_MODULE_DATA[key];
        if (Array.isArray(rows[0])) return expandWordCards(key, rows);
        return rows; // tarjetas completas (formato futuro)
    }

    // ---- opciones: 1 correcta + 3 distractores, sin duplicados (con/sin acentos) ----
    function plBuildOptions(correct) {
        const banned = new Set([deacc(correct.spanish_full)]);
        (correct.spanish_alternatives || []).forEach((a) => banned.add(deacc(a)));
        const opts = [String(correct.spanish_full || '')];
        const addFrom = (cards) => {
            shuffle(cards);
            for (const c of cards) {
                if (opts.length >= 4) break;
                const es = String(c.spanish_full || '');
                if (!es || banned.has(deacc(es))) continue;
                opts.push(es); banned.add(deacc(es));
            }
        };
        addFrom(plWordsFor(PL.lv).filter((c) => c !== correct));
        // respaldo: niveles vecinos (por si un glosario fuera demasiado chico)
        for (let d = 1; d <= 2 && opts.length < 4; d++) {
            const near = [];
            if (PL.lv - d >= 1) near.push(...plWordsFor(PL.lv - d));
            if (PL.lv + d <= MAX_LV) near.push(...plWordsFor(PL.lv + d));
            addFrom(near);
        }
        const correctEs = String(correct.spanish_full || '');
        shuffle(opts);
        return { opts: opts, correctIdx: opts.indexOf(correctEs) };
    }

    // ---- máquina de niveles: 2 ✓ pasan · 2 ✗ cortan · 1-1 desempate ----
    function plOutcome() {
        const wrongs = PL.qInLv - PL.rightInLv;
        if (wrongs >= 2) return 'fail';
        if (PL.rightInLv >= 2) return 'pass';
        return 'keep';
    }

    function plStart() {
        PL.phase = 'quiz';
        PL.lv = 1; PL.qInLv = 0; PL.rightInLv = 0;
        PL.qTotal = 0; PL.rightTotal = 0;
        PL.used = new Set(); PL.cur = null;
        plNextQuestion();
    }

    function plNextQuestion() {
        const cards = plWordsFor(PL.lv);
        if (!cards.length) return plFinish(false); // red de seguridad
        let card = null;
        for (let t = 0; t < 40 && !card; t++) {
            const c = cards[Math.floor(Math.random() * cards.length)];
            if (!PL.used.has(String(c.chinese_simp_full))) card = c;
        }
        if (!card) card = cards[Math.floor(Math.random() * cards.length)];
        PL.used.add(String(card.chinese_simp_full));
        const built = plBuildOptions(card);
        PL.cur = { card: card, opts: built.opts, correctIdx: built.correctIdx };
        plRenderQuestion();
    }

    function plRenderQuestion() {
        const body = document.getElementById('placement-body');
        if (!body) return;
        const card = PL.cur.card;
        const hanzi = ck() === 'trad'
            ? (card.chinese_trad_full || card.chinese_simp_full)
            : card.chinese_simp_full;
        const letras = ['A', 'B', 'C', 'D'];
        body.innerHTML =
            '<div class="pl-meta">' +
                '<span class="pl-lv">HSK ' + PL.lv + '</span>' +
                '<span class="pl-count">pregunta ' + (PL.qTotal + 1) + '</span>' +
                (PL.lv > 1 ? '<span class="pl-passed">✓ ' + (PL.lv - 1) +
                    (PL.lv > 2 ? ' niveles' : ' nivel') + '</span>' : '') +
            '</div>' +
            '<p class="pl-prompt">¿Qué significa esta palabra?</p>' +
            '<div class="pl-hanzi" lang="zh">' + plEsc(hanzi) + '</div>' +
            '<div class="pl-opts">' + PL.cur.opts.map((o, i) =>
                '<button type="button" class="pl-opt" data-i="' + i + '">' +
                '<span class="pl-opt-key">' + letras[i] + '</span>' + plEsc(o) + '</button>').join('') +
            '</div>' +
            '<div id="pl-fb" class="pl-fb hidden" aria-live="polite"></div>';
    }

    function plAnswer(idx) {
        if (PL.phase !== 'quiz' || !PL.cur || PL.qTotal >= 27) return; // tope absoluto 9×3
        PL.qTotal++; PL.qInLv++;
        const ok = idx === PL.cur.correctIdx;
        if (ok) { PL.rightInLv++; PL.rightTotal++; }
        const body = document.getElementById('placement-body');
        if (body) {
            body.querySelectorAll('.pl-opt').forEach((b) => {
                b.disabled = true;
                const bi = parseInt(b.dataset.i, 10);
                if (bi === PL.cur.correctIdx) b.classList.add('is-ok');
                else if (bi === idx) b.classList.add('is-bad');
            });
        }
        const card = PL.cur.card;
        const last = plOutcome() !== 'keep'; // tras esta respuesta ya no hay más en el nivel
        const fb = document.getElementById('pl-fb');
        if (fb) {
            fb.innerHTML =
                '<div class="pl-fb-head ' + (ok ? 'is-ok' : 'is-bad') + '">' +
                    (ok ? '✅ ¡Esa es!' : '❌ No era esa') + '</div>' +
                '<div class="pl-fb-word"><b lang="zh">' + plEsc(card.chinese_simp_full) + '</b>' +
                    (card.pinyin ? ' <span class="pl-fb-py">' + plEsc(card.pinyin) + '</span>' : '') + '</div>' +
                '<div class="pl-fb-es">= ' + plEsc(String(card.spanish_full || '')) + '</div>' +
                '<button type="button" class="btn-primary pl-next">' +
                    (last ? 'Ver mi nivel 🎯' : 'Siguiente ▶') + '</button>';
            fb.classList.remove('hidden');
        }
    }

    function plAdvance() {
        const out = plOutcome();
        if (out === 'pass') {
            PL.lv++; PL.qInLv = 0; PL.rightInLv = 0;
            if (PL.lv > MAX_LV) return plFinish(true); // aprobó los 9 niveles
            return plNextQuestion();
        }
        if (out === 'fail') return plFinish(false);
        plNextQuestion(); // desempate 1-1
    }

    function plFinish(allPassed) {
        PL.phase = 'result';
        const level = allPassed ? MAX_LV : PL.lv;
        plSave(level, allPassed);
        plUpdateStatus();
        const msg = allPassed
            ? '¡Dominio sobresaliente! Aprobaste los 9 niveles del HSK 3.0.'
            : (PL.lv === 1
                ? '¡Ideal para arrancar! HSK 1 es tu punto de partida perfecto.'
                : 'Pasaste con soltura los niveles anteriores; en HSK ' + level + ' empezá a consolidar.');
        const body = document.getElementById('placement-body');
        if (body) {
            body.innerHTML =
                '<div class="pl-result-badge">🎯</div>' +
                '<p class="pl-result-kicker">Tu nivel de partida</p>' +
                '<div class="pl-result-lv">HSK ' + level + '</div>' +
                '<p class="pl-result-desc">' + plEsc(PL_DESC[level] || '') + '</p>' +
                '<p class="pl-result-msg">' + plEsc(msg) + '</p>' +
                '<p class="pl-result-stats">' + PL.rightTotal + ' aciertos en ' + PL.qTotal +
                    ' pregunta' + (PL.qTotal === 1 ? '' : 's') + '</p>' +
                '<div class="pl-result-actions">' +
                    '<button type="button" class="btn-primary pl-gopractice" data-level="' + level + '">📚 Practicar HSK ' + level + '</button>' +
                    '<button type="button" class="btn-secondary pl-repeat">🔁 Repetir test</button>' +
                '</div>';
        }
    }

    function plGoPractice(level) {
        plClose();
        const lv = Math.min(Math.max(level || 1, 1), MAX_LV);
        const sel = document.getElementById('select-hsk-level');
        if (sel) sel.value = 'HSK' + lv;  // el selector refleja el nivel recomendado
        setModule('HSK' + lv);            // carga el módulo (insignia + conteo real)
        const tab = document.getElementById('tab-exams');
        if (tab) tab.click();             // muestra Exámenes (persiste ac_tab)
    }

    function plRenderIntro() {
        const body = document.getElementById('placement-body');
        if (!body) return;
        const saved = plSaved();
        body.innerHTML =
            '<h3 class="pl-title">🎯 Test de colocación</h3>' +
            '<p class="pl-intro">Te mostramos <b>palabras reales del HSK 3.0</b> y elegís el significado entre 4 opciones. Arrancamos en HSK 1 y subimos de a un nivel: con <b>2 aciertos</b> pasás al siguiente (desempate si queda 1-1). El test termina solo, cuando el nivel ya te exige.</p>' +
            '<ul class="pl-points">' +
                '<li>⏱️ De 2 a 5 minutos · sin registro</li>' +
                '<li>📱 Pensado para el celular</li>' +
                '<li>🔒 Todo queda en tu dispositivo</li>' +
            '</ul>' +
            (saved
                ? '<div class="pl-last">Último resultado: <b>HSK ' + saved.level + '</b> · ' +
                  saved.right + '/' + saved.total + ' aciertos</div>' +
                  '<div class="pl-intro-actions">' +
                    '<button type="button" class="btn-primary pl-start">▶ Empezar de nuevo</button>' +
                    '<button type="button" class="btn-secondary pl-gopractice" data-level="' + saved.level + '">📚 Practicar HSK ' + saved.level + '</button>' +
                  '</div>'
                : '<div class="pl-intro-actions"><button type="button" class="btn-primary pl-start">▶ Empezar test</button></div>');
    }

    function plOpen() {
        PL.phase = 'intro'; PL.cur = null;
        plRenderIntro();
        const pop = document.getElementById('placement-pop');
        if (pop) pop.classList.remove('hidden');
    }
    function plClose() {
        const pop = document.getElementById('placement-pop');
        if (pop) pop.classList.add('hidden');
        PL.phase = 'idle'; PL.cur = null;
    }

    // ---- wiring (patrón pzInit: autocontenida) ----
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-placement', 'click', plOpen);
    safe('btn-placement-daily', 'click', plOpen);
    safe('btn-placement-close', 'click', plClose);

    // Delegado en #placement-body (el body se re-renderiza por fase)
    const body = document.getElementById('placement-body');
    if (body) {
        body.addEventListener('click', (e) => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.classList.contains('pl-start') || b.classList.contains('pl-repeat')) plStart();
            else if (b.classList.contains('pl-opt')) plAnswer(parseInt(b.dataset.i, 10));
            else if (b.classList.contains('pl-next')) plAdvance();
            else if (b.classList.contains('pl-gopractice')) plGoPractice(parseInt(b.dataset.level, 10));
        });
    }

    // Clic fuera cierra (mismo patrón que #vocab-pop; los botones que ABREN no cierran).
    // ⚠ Se usa e.composedPath() y NO pop.contains(e.target): los clics internos
    // (.pl-opt/.pl-next/…) re-renderizan #placement-body y el botón queda
    // descolgado del DOM antes de que el evento llegue a document → contains()
    // daría falso negativo y cerraría el popup justo después de responder.
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('placement-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && (e.target.closest('#btn-placement') ||
                                 e.target.closest('#btn-placement-daily'))) return;
        plClose();
    });

    // Escape cierra (registrada antes que la de vocab-pop → esta corre primero)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const pop = document.getElementById('placement-pop');
        if (pop && !pop.classList.contains('hidden') && !topLayerOpen()) plClose(); // v9.50
    });

    // Gancho de solo lectura para tests E2E (vacío fuera del quiz)
    window.PL_DEBUG = function () {
        if (PL.phase !== 'quiz' || !PL.cur) return null;
        return {
            lv: PL.lv, qTotal: PL.qTotal, rightTotal: PL.rightTotal,
            hanzi: PL.cur.card.chinese_simp_full,
            correct: PL.cur.card.spanish_full,
            options: PL.cur.opts.slice(), correctIdx: PL.cur.correctIdx,
            outcome: plOutcome()
        };
    };

    plUpdateStatus(); // restaura la línea "Último test" junto al selector
})();
