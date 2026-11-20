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
//
// Estado del precache (instalación incompleta): sw.js guarda en el caché propio huayu-diario-estado-v1 qué archivos del PRECACHE
// no se pudieron bajar al instalar. Esta página lo lee y lo muestra en Yo → Ajustes («Modo sin conexión: Completo / Incompleto ·
// archivos sin descargar: N», con la lista y «Reintentar»). Como AVISO visible sale solo si el alumno está SIN conexión y falta algo
// (no en cada visita), una vez por sesión, y sin invitar a recargar. Al abrir la app con conexión se reintenta, una sola vez por
// sesión y en silencio, bajar lo que falta; el evento «online» reintenta como mucho 3 veces por sesión (sin contar el botón ni el reintento
// al abrir), y cada pedido tiene un tiempo máximo (15 s) para que uno colgado no deje trabado el botón. La página NUNCA escribe en el caché de estado: la lista se recalcula contra el caché
// real (un archivo que el SW guardó después al pedirlo ya no falta).
// Textos: UI_STRINGS de app.js (sw*, español y chino). El chino de cn-es está PENDIENTE DE REVISIÓN (docs/revision-aviso-sw.md).
// ============================================================
(function () {
    'use strict';
    if (!('serviceWorker' in navigator)) return;

    const ES = {
        swNuevaTxt: 'Hay una versión nueva de la app.', swActualizar: 'Actualizar', swDespues: 'Después', swCerrar: 'Cerrar',
        swEstadoOk: 'Completo', swEstadoFaltan: 'Incompleto · archivos sin descargar: {n}', swReintentar: 'Reintentar', swReintentando: 'Descargando…',
        swOfflineTxt: 'Modo sin conexión incompleto · archivos sin descargar: {n}. Conectate a internet para completarlos.'
    };
    function T(k, n) {
        let s = '';
        try { if (typeof uiT === 'function') s = uiT(k); } catch (e) { /* sin textos: queda el español */ }
        return String(s || ES[k] || k).replace('{n}', n === undefined ? '' : n);
    }
    const ESTADO_CACHE = 'huayu-diario-estado-v1';
    const ESTADO_URL = location.origin + '/__estado__/precache'; // clave sintética que escribe sw.js (la app no la pide)

    let habiaControl = !!navigator.serviceWorker.controller; // ¿ya había un SW controlando esta pestaña al cargar?
    let modo = null;                                          // lo que se muestra: 'nueva' | 'offline' | null (lo decide decidirAviso)
    let hayNueva = false;                                     // llegó una versión nueva y el alumno todavía no tocó «Después»
    let faltan = null;                                        // null = sin dato (sin SW/estado) · [] = completo · [...] = archivos que faltan
    let estadoShell = null;                                   // nombre del caché del shell actual (según el estado)
    // sessionStorage (no una variable): el aviso sin conexión sale UNA vez por sesión, también tras recargar; sessionStorage no viaja en el respaldo
    const ssGet = (k) => { try { return sessionStorage.getItem(k) === '1'; } catch (e) { return false; } };
    const ssSet = (k) => { try { sessionStorage.setItem(k, '1'); } catch (e) { /* sin sessionStorage */ } };
    // contador de reintentos por «online» en esta sesión (sessionStorage: sobrevive a recargas y no viaja en el respaldo)
    const nOnline = () => { try { return parseInt(sessionStorage.getItem('sw_reintentos_online'), 10) || 0; } catch (e) { return 0; } };
    const sumaOnline = () => { try { sessionStorage.setItem('sw_reintentos_online', String(nOnline() + 1)); } catch (e) { /* sin sessionStorage */ } };
    let reintentando = false;
    const MAX_ONLINE = 3;                                     // tope de reintentos AUTOMÁTICOS por sesión disparados por el evento «online»
    const TIMEOUT_MS = (window.SW_AVISO_TIMEOUT_MS | 0) || 15000; // tiempo máximo de cada pedido de reintento (SW_AVISO_TIMEOUT_MS: solo pruebas)

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
        no.addEventListener('click', () => { if (modo === 'offline') ssSet('sw_aviso_cerrado'); else hayNueva = false; decidirAviso(); });
        el.appendChild(txt); el.appendChild(act); el.appendChild(no);
        (document.body || document.documentElement).appendChild(el);
        return el;
    }
    function pintar() {
        const el = cartel();
        if (!modo) { el.classList.add('hidden'); return; }
        const act = el.querySelector('#sw-aviso-act');
        if (modo === 'nueva') {
            el.querySelector('#sw-aviso-txt').textContent = T('swNuevaTxt');
            act.textContent = T('swActualizar'); act.classList.remove('hidden');
            el.querySelector('#sw-aviso-no').textContent = T('swDespues');
        } else {
            // sin conexión e incompleto: solo informa (no invita a recargar: una recarga sin red no baja nada)
            el.querySelector('#sw-aviso-txt').textContent = T('swOfflineTxt', faltan ? faltan.length : 0);
            act.classList.add('hidden');
            el.querySelector('#sw-aviso-no').textContent = T('swCerrar');
        }
        el.classList.remove('hidden');
    }

    // ---------- estado del precache ----------
    async function leerEstado() {
        try {
            if (!window.caches || !(await caches.has(ESTADO_CACHE))) return null; // has() primero: open() crearía un caché vacío
            const r = await (await caches.open(ESTADO_CACHE)).match(ESTADO_URL);
            return r ? await r.json() : null;
        } catch (e) { return null; }
    }
    // la lista de sw.js es la de la INSTALACIÓN; se recalcula contra el caché real
    async function sigueFaltando(lista) {
        const out = [];
        for (const f of lista) {
            let hay = false;
            try { hay = !!(await caches.match(new URL(f, document.baseURI).href, { ignoreVary: true })); } catch (e) { /* cuenta como faltante */ }
            if (!hay) out.push(f);
        }
        return out;
    }
    function pintarFila() {
        const fila = document.getElementById('row-sw-estado');
        if (!fila) return;
        if (faltan === null) { fila.classList.add('hidden'); return; }
        fila.classList.remove('hidden');
        const txt = document.getElementById('sw-estado-txt'), lista = document.getElementById('sw-estado-lista'), btn = document.getElementById('btn-sw-reintentar');
        txt.textContent = reintentando ? T('swReintentando') : (faltan.length ? T('swEstadoFaltan', faltan.length) : T('swEstadoOk'));
        txt.classList.toggle('falta', faltan.length > 0);
        lista.textContent = '';
        faltan.forEach((f) => { const li = document.createElement('li'); li.textContent = f; lista.appendChild(li); });
        lista.classList.toggle('hidden', !faltan.length);
        btn.textContent = T('swReintentar');
        btn.disabled = reintentando || !navigator.onLine; // sin conexión no hay nada que bajar
        btn.classList.toggle('hidden', !faltan.length);
    }
    // Qué se muestra. «Actualizar» recarga la página: sin conexión y con archivos faltantes esa recarga arrancaría una versión con
    // piezas que no se pueden bajar (medido: faltando karaoke.js, la app abre pero el Karaoke da error), así que ahí NO se ofrece:
    // solo se informa (una vez por sesión). Con conexión de nuevo, vuelve el aviso de versión nueva.
    function decidirAviso() {
        const sinRed = !navigator.onLine, incompleto = !!(faltan && faltan.length);
        if (hayNueva && !(sinRed && incompleto)) modo = 'nueva';
        else if (sinRed && incompleto && !ssGet('sw_aviso_cerrado')) modo = 'offline';
        else modo = null;
        pintar();
        pintarFila(); // «Reintentar» se habilita/deshabilita con la conexión
    }
    async function refrescarEstado() {
        const est = await leerEstado();
        if (!est || !Array.isArray(est.faltan)) { faltan = null; estadoShell = null; }
        else { estadoShell = est.shell || null; faltan = est.faltan.length ? await sigueFaltando(est.faltan) : []; }
        pintarFila();
        decidirAviso();
    }
    // origen: 'manual' (botón) | 'abrir' (al abrir con conexión) | 'online' (evento). Solo 'online' cuenta para el tope (MAX_ONLINE).
    async function reintentar(origen) {
        if (reintentando || !faltan || !faltan.length || !navigator.onLine) return; // guarda: nunca dos intentos a la vez
        if (origen === 'online') sumaOnline(); // se cuenta solo cuando el intento arranca de verdad
        reintentando = true; pintarFila();
        try {
            const lista = faltan.slice();
            for (const f of lista) {
                // cada pedido tiene un tiempo máximo: uno colgado no deja la guarda puesta (ni el botón en «Descargando…»)
                const ac = new AbortController(); const t = setTimeout(() => ac.abort(), TIMEOUT_MS);
                try {
                    const url = new URL(f, document.baseURI).href;
                    const res = await fetch(url, { cache: 'reload', signal: ac.signal });
                    // se guarda en el caché del shell SOLO si existe (si la versión cambió y se borró, open() lo recrearía vacío)
                    if (res.ok && estadoShell && await caches.has(estadoShell)) await (await caches.open(estadoShell)).put(url, res.clone());
                } catch (e) { /* sigue sin red, se cortó por tiempo o el archivo sigue sin estar: queda en la lista */ }
                finally { clearTimeout(t); }
            }
        } finally {
            reintentando = false; // pase lo que pase, la guarda se suelta
        }
        await refrescarEstado();
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // 1.ª instalación: el SW toma la página por primera vez y no hay versión «nueva» que avisar
        if (!habiaControl) habiaControl = true; else hayNueva = true;
        refrescarEstado(); // la instalación deja un estado nuevo (y decide qué mostrar al terminar de leerlo)
        // controllerchange llega cuando el SW nuevo toma la página, ANTES de que activate termine: medido dentro del evento, el SW está
        // «activating» y el shell VIEJO todavía existe (se borra recién al quedar «activated»), así que un archivo que falta en el
        // nuevo se encuentra en el viejo y la 1.ª lectura da «nada falta». Se relee al quedar «activated».
        const sw = navigator.serviceWorker.controller;
        if (sw && sw.state !== 'activated') sw.addEventListener('statechange', function h() { if (sw.state === 'activated') { sw.removeEventListener('statechange', h); refrescarEstado(); } });
    });
    window.addEventListener('offline', decidirAviso);
    window.addEventListener('online', () => { decidirAviso(); if (nOnline() < MAX_ONLINE) reintentar('online'); });

    function iniciar() {
        const b = document.getElementById('btn-sw-reintentar');
        if (b) b.addEventListener('click', () => reintentar('manual'));
        refrescarEstado().then(() => {
            // al abrir con conexión y con algo faltante: UN reintento silencioso por sesión. La marca se gasta solo si se intenta de verdad
            // (la visita que instala no tiene estado todavía: el 1.er intento es en la siguiente carga)
            if (faltan && faltan.length && navigator.onLine && !ssGet('sw_reintento')) { ssSet('sw_reintento'); reintentar('abrir'); }
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();

    window.swAvisoRefrescar = () => { pintar(); pintarFila(); }; // updateUILanguage (app.js) lo llama al cambiar de idioma
    window.swAvisoEstado = () => ({ hayNueva, faltan: faltan && faltan.slice(), modo, shell: estadoShell, reintentando, reintentosOnline: nOnline() }); // solo lectura (pruebas)
})();
