// ============================================================
// Aviso de versión nueva de la app (service worker).
// ------------------------------------------------------------
// Problema: el SW usa skipWaiting + clients.claim, así que cuando llega una versión nueva toma la pestaña abierta SIN
// recargarla. La pestaña sigue ejecutando el JS viejo mientras su próximo pedido lo atiende el SW nuevo (mezcla de versiones).
// Solución: avisar con un cartel discreto («Hay una versión nueva · Actualizar»). La página NUNCA se recarga sola: solo
// recarga cuando el alumno toca «Actualizar» (si estaba a mitad de una respuesta, puede elegir «Después»).
// La primera instalación no cuenta como «versión nueva»: el SW toma la página por primera vez y no hay nada que avisar.
//
// Es un script clásico (como los demás), se carga después de app.js (usa uiT) y no depende de nada más: si falta
// serviceWorker, caches o uiT, no hace nada y la app sigue igual. No toca sw.js, la estrategia de caché ni el modo sin conexión.
// Textos: UI_STRINGS de app.js (swNueva*, español y chino). El chino de cn-es está PENDIENTE DE REVISIÓN (docs/revision-aviso-sw.md).
// ============================================================
(function () {
    'use strict';
    if (!('serviceWorker' in navigator)) return;

    const ES = { swNuevaTxt: 'Hay una versión nueva de la app.', swActualizar: 'Actualizar', swDespues: 'Después' };
    function T(k) {
        let s = '';
        try { if (typeof uiT === 'function') s = uiT(k); } catch (e) { /* sin textos: queda el español */ }
        return s || ES[k] || k;
    }

    let habiaControl = !!navigator.serviceWorker.controller; // ¿ya había un SW controlando esta pestaña al cargar?
    let modo = null;                                          // 'nueva' | null

    function cartel() {
        let el = document.getElementById('sw-aviso');
        if (el) return el;
        el = document.createElement('div');
        el.id = 'sw-aviso';
        el.className = 'sw-aviso hidden';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        const txt = document.createElement('span'); txt.className = 'sw-aviso-txt'; txt.id = 'sw-aviso-txt';
        const act = document.createElement('button'); act.type = 'button'; act.className = 'sw-aviso-btn'; act.id = 'sw-aviso-act';
        const no = document.createElement('button'); no.type = 'button'; no.className = 'sw-aviso-x'; no.id = 'sw-aviso-no';
        act.addEventListener('click', () => { if (modo === 'nueva') location.reload(); });
        no.addEventListener('click', () => { modo = null; pintar(); });
        el.appendChild(txt); el.appendChild(act); el.appendChild(no);
        (document.body || document.documentElement).appendChild(el);
        return el;
    }
    function pintar() {
        const el = cartel();
        if (!modo) { el.classList.add('hidden'); return; }
        el.querySelector('#sw-aviso-txt').textContent = T('swNuevaTxt');
        el.querySelector('#sw-aviso-act').textContent = T('swActualizar');
        el.querySelector('#sw-aviso-no').textContent = T('swDespues');
        el.classList.remove('hidden');
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!habiaControl) { habiaControl = true; return; } // 1.ª instalación: el SW toma la página por primera vez
        modo = 'nueva';
        pintar();
    });

    window.swAvisoRefrescar = pintar; // updateUILanguage (app.js) lo llama al cambiar de idioma
})();
