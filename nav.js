/* ============================================================
   nav.js — Botón Atrás (Android/APK y navegador): cierra la capa
   abierta más arriba en vez de salir de la app.
   ------------------------------------------------------------
   Diseño "observador": los módulos no se tocan. nav.js vigila las
   capas de LAYERS:
   · la app muestra una capa → pushState (misma URL) y se apila;
   · la app la oculta (✕, Escape, clic afuera, fin de un flujo) →
     su entrada se consume en silencio (history.go(-n));
   · Atrás del usuario (popstate) → se simula el clic en el ✕ de la
     capa de arriba: corre su cierre de siempre (stopSpeak, abort…).
   Cerrar una capa y abrir otra en el mismo toque (o con un setTimeout
   corto en el medio) es un INTERCAMBIO: replaceState, nunca back() +
   push. Para eso, antes de consumir una entrada se espera SETTLE_MS.

   CÓMO REGISTRAR UNA CAPA NUEVA: sumá a LAYERS { id, close }:
   · id: id del elemento. Tiene que mostrarse/ocultarse con la clase
     'hidden' (o ser hija directa de <body> y agregarse/sacarse).
   · close: selector de su ✕, DENTRO de la capa. Atrás hace
     exactamente lo mismo que tocarlo.
   El orden de LAYERS es el de apilado (las de abajo primero): si dos
   capas aparecen en el mismo cuadro, se apilan en ese orden.
   Capas "virtuales" (sin elemento, ej. una pestaña): { id, isOpen(),
   back() } y Nav.sync() cuando cambien.
   ============================================================ */
(function () {
'use strict';

const LAYERS = [
    { id: 'lesson-pop', close: '#lq-close' },
    { id: 'dele-pop', close: '#dele-close' },
    { id: 'cread-pop', close: '#cr-close' },
    { id: 'podcast-pop', close: '#pd-close' },
    { id: 'daily-story-pop', close: '#btn-daily-story-close' },
    { id: 'placement-pop', close: '#btn-placement-close' },
    { id: 'mp-pop', close: '#mp-close' },
    { id: 'talk-pop', close: '#talk-close' },
    { id: 'srs-pop', close: '#btn-srs-close' },
    { id: 'write-pop', close: '#btn-write-close' },
    { id: 'personal-pop', close: '#btn-personal-close' },
    { id: 'stats-pop', close: '#btn-stats-close' },
    { id: 'backup-pop', close: '#btn-backup-close' },
    { id: 'guide-pop', close: '#btn-guide-close' },
    { id: 'install-help', close: '#btn-install-help-close' },
    // Tip: Atrás cancela (no abre la función que venía detrás); se marca visto igual que con ✕.
    { id: 'feature-tip-pop', close: '#btn-feature-tip-close',
      back: () => (typeof window.cancelFeatureTip === 'function' ? (window.cancelFeatureTip(), true) : false) },
    { id: 'vocab-pop', close: '#btn-vocab-pop-close' },
    { id: 'tone-legend-pop', close: '#btn-tone-legend-close' },
    { id: 'writer-practice-banner', close: '#btn-wp-close' },
    { id: 'handwrite-banner', close: '#btn-hw-close' },
    // Aviso de descarga del modelo (voice-evaluator.js): sin id, se agrega y se saca de <body>.
    // Atrás = "Ahora no". Una descarga ya aceptada no depende de ninguna capa: Atrás nunca la cancela.
    { id: 've-dl', sel: '.ve-dl-overlay', close: '.ve-dl-actions .btn-secondary' }
];
// Margen para detectar un intercambio: los flujos encadenados de la app
// reabren con setTimeout(…, 0) como mucho.
const SETTLE_MS = 60;
// Distingue las entradas de esta carga de las que dejó una recarga.
const LOAD = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

let stack = [];               // ids abiertos, de abajo hacia arriba (= entradas sobre la raíz)
const detached = new Set();   // Atrás no las pudo cerrar: fuera de la pila hasta que se oculten
let silentPops = 0;           // popstate de nuestros propios consumos, a ignorar
let frame = 0;
let settleT = 0;
const stats = { observer: 0, syncs: 0 };

const layerById = (id) => LAYERS.find((l) => l.id === id);
const elOf = (l) => (l.sel ? document.querySelector(l.sel) : document.getElementById(l.id));
function isOpen(l) {
    if (!l) return false;
    if (typeof l.isOpen === 'function') { try { return !!l.isOpen(); } catch (e) { return false; } }
    const el = elOf(l);
    return !!el && el.parentNode !== null && !el.classList.contains('hidden');
}
// depth = capas abiertas en esa entrada (0 = raíz): distingue Atrás de Adelante.
const entry = (id, depth) => ({ nav: id || 'root', load: LOAD, depth: depth || 0 });

// Solo el atributo class de las capas registradas + hijos directos de body
// (capas creadas por JS). Nada de subtree: el karaoke y los re-render
// internos de cada capa no disparan nada.
const observed = new WeakSet();
const mo = new MutationObserver(() => { stats.observer++; schedule(); });
function watchLayers() {
    LAYERS.forEach((l) => {
        if (typeof l.isOpen === 'function') return;
        const el = elOf(l);
        if (el && !observed.has(el)) {
            observed.add(el);
            mo.observe(el, { attributes: true, attributeFilter: ['class'] });
        }
    });
}

// Todo cambio se agrupa en una sola sincronización por cuadro.
function schedule() {
    if (frame) return;
    const run = () => { frame = 0; sync(false); };
    frame = (typeof requestAnimationFrame === 'function') ? requestAnimationFrame(run) : setTimeout(run, 16);
}

// Chrome saltea con Atrás las entradas creadas sin un toque del usuario. Una
// capa que se abre sola (guía de la 1.ª visita) recién entra a la pila con el
// primer clic dentro de ella (clic: en táctil, pointerdown no cuenta como gesto).
const touched = new Set();
const armed = new WeakSet();
function needsGesture(l, el) {
    const ua = navigator.userActivation;
    if (!ua || ua.isActive || touched.has(l.id) || !el) return false;
    if (!armed.has(el)) {
        armed.add(el);
        el.addEventListener('click', () => { touched.add(l.id); armed.delete(el); schedule(); }, { capture: true, once: true });
    }
    return true;
}

// Compara lo visible con la pila y ajusta el historial. También es la red
// de seguridad: una capa oculta que siga en la pila sale y consume su entrada.
function sync(final) {
    stats.syncs++;
    watchLayers();
    detached.forEach((id) => { if (!isOpen(layerById(id))) detached.delete(id); });
    touched.forEach((id) => { if (!isOpen(layerById(id))) touched.delete(id); });
    const vis = LAYERS.filter((l) => !detached.has(l.id) && isOpen(l)).map((l) => l.id);
    const gone = stack.filter((id) => vis.indexOf(id) === -1);
    const fresh = vis.filter((id) => stack.indexOf(id) === -1 && !needsGesture(layerById(id), elOf(layerById(id))));
    if (!gone.length && !fresh.length) { clearTimeout(settleT); settleT = 0; return; }
    if (gone.length > fresh.length && !final) {
        // Puede venir otra capa en camino (intercambio): esperar antes de consumir.
        if (!settleT) settleT = setTimeout(() => { settleT = 0; sync(true); }, SETTLE_MS);
        return;
    }
    clearTimeout(settleT); settleT = 0;
    stack = stack.filter((id) => vis.indexOf(id) !== -1).concat(fresh);
    const delta = fresh.length - gone.length;
    const top = stack[stack.length - 1];
    try {
        if (delta > 0) {
            for (let i = 0; i < delta; i++) history.pushState(entry(top, stack.length - delta + i + 1), '');
        }
        else if (delta < 0) { silentPops++; history.go(delta); }
        else history.replaceState(entry(top, stack.length), '');
    } catch (e) { /* history no disponible: la app sigue igual que antes */ }
}

// Atrás: exactamente el ✕ de la capa. Si no hay ✕ o la capa sigue visible,
// sale de la pila igual: Atrás nunca queda muerto.
function closeByBack(l) {
    let done = false;
    if (typeof l.back === 'function') { try { done = l.back() !== false; } catch (e) { done = false; } }
    if (!done && l.close) {
        const el = elOf(l);
        const btn = el && el.querySelector(l.close);
        if (btn) { try { btn.click(); } catch (e) { /* noop */ } }
    }
    if (isOpen(l)) detached.add(l.id);
}

function onPopState(e) {
    if (silentPops > 0) { silentPops--; return; }
    const st = e.state || {};
    // Entrada que dejó una carga anterior (recarga con una capa abierta): saltarla.
    if (st.load && st.load !== LOAD && !stack.length) { history.back(); return; }
    // Adelante (navegador de escritorio) a una entrada ya cerrada: deshacerlo.
    // Normal: Atrás llega a depth = pila - 1. Igual = nada que cerrar.
    if (st.load === LOAD && typeof st.depth === 'number' && st.depth >= stack.length) {
        if (st.depth > stack.length) { silentPops++; history.go(stack.length - st.depth); }
        return;
    }
    // Una capa ya oculta esperaba consumir su entrada: esta pulsación la consume.
    for (let i = stack.length - 1; i >= 0; i--) {
        if (!isOpen(layerById(stack[i]))) {
            stack.splice(i, 1);
            if (stack.every((id) => isOpen(layerById(id)))) { clearTimeout(settleT); settleT = 0; }
            return;
        }
    }
    const id = stack.pop();
    if (id) closeByBack(layerById(id));
}

function init() {
    try { history.replaceState(entry('root'), ''); } catch (e) { return; }
    watchLayers();
    mo.observe(document.body, { childList: true });
    window.addEventListener('popstate', onPopState);
}

window.Nav = {
    /** Para capas virtuales (ej. pestañas) o cambios fuera del observador. */
    register(layer) { if (layer && layer.id && !layerById(layer.id)) { LAYERS.push(layer); schedule(); } },
    sync() { schedule(); },
    get stack() { return stack.slice(); },
    stats: stats
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
})();
