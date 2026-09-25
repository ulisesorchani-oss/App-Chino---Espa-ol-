// ============================================================
// feature-tips.js — Guía corta, una sola vez, por sección
// ============================================================
// v9.67 (AUDITORIA-GAGNE-MAYER.md, evento 5): onboarding.js es un
// recorrido completo y sólido, pero es una experiencia ÚNICA al
// principio — no había guía incremental la primera vez que el alumno
// entra a una sección puntual (🎤 Pronunciación, 🎯 Pares Mínimos).
// Este módulo es el patrón CHICO y reutilizable para eso: un popup de
// una sola vez POR FEATURE (flag propio en localStorage,
// 'ac_seen_<key>'), con 2-3 líneas de qué hacer y por qué — nunca
// repite el onboarding completo, y no toca onboarding.js ni su flag
// ('ac_onboarding_done_v2').
//
// API pública: window.showFeatureTip(key, emoji, title, lines, onClose)
//   key     → sufijo del flag: localStorage['ac_seen_' + key].
//   emoji   → ícono del título ('🎤', '🎯', ...).
//   title   → título corto.
//   lines   → array de 2-3 strings (cada uno un renglón).
//   onClose → opcional. Si ya se vio, se llama DE INMEDIATO (no hay
//             nada que mostrar); si no se vio, se llama recién al
//             cerrar el popup (✕/Escape/clic afuera/Entendido). Así el
//             que llama puede usarlo como "gate" sin duplicar el
//             chequeo de localStorage (ver mpOpen en minimal-pairs.js).
//
// Reusa la piel .vocab-pop (mismo patrón que #daily-story-pop: posición/
// ancho/animación gratis, temas claro/oscuro/papel vía variables CSS) +
// el overlay #feature-tip-pop de index.html. Es un script clásico (sin
// import/export): se carga antes de app.js, así app.js y
// minimal-pairs.js ya lo tienen disponible al enganchar sus triggers.
// No toca state, getFiltered, checkAnswer, SRS ni el mazo.
// ============================================================
(function () {
    'use strict';

    let currentKey = null;
    let pendingOnClose = null;
    let justOpened = false; // v9.67: ver nota en showFeatureTip

    function escHtml(t) {
        return String(t == null ? '' : t).replace(/[&<>"']/g,
            c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function closeTip() {
        const pop = document.getElementById('feature-tip-pop');
        if (pop) pop.classList.add('hidden');
        if (currentKey) {
            try { localStorage.setItem('ac_seen_' + currentKey, '1'); } catch (e) { /* sin storage: se repetirá, no rompe nada */ }
            currentKey = null;
        }
        const cb = pendingOnClose;
        pendingOnClose = null;
        // v9.67: el onClose (ej. mpOpenReal) puede abrir OTRO popup con su
        // propio listener de "clic afuera" en document. Si se llama
        // sincrónico acá, ese popup se abre TODAVÍA dentro del mismo clic
        // que cerró este — y al seguir burbujeando hasta document, el
        // listener del otro popup lo ve como "clic afuera" y lo cierra de
        // nuevo en el mismo ciclo. setTimeout(…, 0) lo corre después de que
        // termine de burbujear el clic que disparó este cierre.
        if (typeof cb === 'function') setTimeout(cb, 0);
    }

    window.showFeatureTip = function (key, emoji, title, lines, onClose) {
        let seen = false;
        try { seen = localStorage.getItem('ac_seen_' + key) === '1'; } catch (e) { /* sin storage: tratar como no visto */ }
        if (seen) {
            if (typeof onClose === 'function') onClose();
            return;
        }
        const pop = document.getElementById('feature-tip-pop');
        const body = document.getElementById('feature-tip-body');
        if (!pop || !body) { if (typeof onClose === 'function') onClose(); return; } // sin popup en el DOM: no bloquear la feature real

        currentKey = key;
        pendingOnClose = onClose;
        body.innerHTML = '<div class="ft-head">' + escHtml(emoji || '💡') + ' ' + escHtml(title || '') + '</div>'
            + (lines || []).map(l => '<p class="ft-line">' + escHtml(l) + '</p>').join('')
            + '<div class="ft-actions"><button type="button" id="btn-ft-ok" class="btn-primary">Entendido</button></div>';
        pop.classList.remove('hidden');
        const ok = document.getElementById('btn-ft-ok');
        if (ok) ok.addEventListener('click', closeTip);
        // v9.67: showFeatureTip suele llamarse DESDE el propio handler de clic
        // del botón que abre la sección (ej. #btn-mp-pairs) — ese mismo clic
        // sigue burbujeando hasta document DESPUÉS de mostrar el popup, y sin
        // esto el listener de "clic afuera" de más abajo lo cerraría en el
        // mismo ciclo síncrono en el que se acaba de abrir. setTimeout(…, 0)
        // limpia el flag recién en el próximo tick, después de que termine de
        // burbujear el clic que abrió.
        justOpened = true;
        setTimeout(() => { justOpened = false; }, 0);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const closeBtn = document.getElementById('btn-feature-tip-close');
        if (closeBtn) closeBtn.addEventListener('click', closeTip);
        const pop = document.getElementById('feature-tip-pop');
        if (!pop) return;
        document.addEventListener('click', (e) => {
            if (justOpened) return;
            if (!pop.classList.contains('hidden') && !pop.contains(e.target)) closeTip();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden')) closeTip();
        });
    });
})();
