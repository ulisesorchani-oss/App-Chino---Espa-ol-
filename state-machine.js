// state-machine.js — máquinas de estado mínimas y COMPARTIDAS (script clásico, sin dependencias, sin build).
//
// Para qué: que cada máquina implícita de la app (hoy «Escuchar todo»; luego el Lector y el Podcast) tenga su TABLA de transiciones escrita en un
// solo lugar, que se pueda validar en las pruebas y volcar a docs/maquinas-de-estado.md. NO es una librería de eventos ni reemplaza a los tokens
// de cancelación (L.tok, audioReqTok…): esos identifican «una corrida»; esto dice en qué ESTADO está la corrida y a cuál puede pasar.
//
//   const M = acMachine('escuchar.reproduccion', {
//       initial: 'idle',
//       rows: [ { from: 'idle', to: 'playing', ev: 'start' },
//               { from: ['playing', 'paused'], to: 'idle', ev: 'fin' },
//               { from: 'playing', to: 'paused', ev: 'pausa', known: 'R5', nota: 'defecto de hoy, declarado' } ] });
//   M.go('playing', 'start');   // aplica SIEMPRE el cambio; devuelve true si la transición (from→to, ev) está declarada
//   M.state / M.is('idle')
//
// Modo estricto: SOLO en pruebas (window.AC_SM_STRICT = true antes de cargar). Una transición no declarada se registra siempre en window.AC_SM_LOG y,
// en estricto, además lanza. En producción NUNCA lanza: se registra y se aplica igual (la app no puede romperse por una tabla incompleta).
// Pasar al estado en el que ya está no es una transición (no se valida ni se registra).
// Si este archivo no carga, cada módulo usa su respaldo (una máquina que asigna sin validar): la app suena igual, solo se pierde la validación.
(function () {
    'use strict';
    if (typeof window === 'undefined' || typeof window.acMachine === 'function') return;
    const REG = window.AC_MACHINES = window.AC_MACHINES || {};
    const LOG_MAX = 200;
    function noteBad(rec) {
        const L = window.AC_SM_LOG = window.AC_SM_LOG || [];
        if (L.length < LOG_MAX) L.push(rec);
        try { if (typeof console !== 'undefined' && console.warn) console.warn('[state-machine] transición NO declarada', rec); } catch (e) { /* noop */ }
    }
    const list = (v) => (Array.isArray(v) ? v : [v]);
    window.acMachine = function acMachine(name, def) {
        const rows = (def.rows || []).map((r) => ({ from: list(r.from), to: r.to, ev: r.ev || '', known: r.known || '', nota: r.nota || '' }));
        const table = new Set();
        rows.forEach((r) => r.from.forEach((f) => table.add(f + '>' + r.to + '@' + r.ev)));
        const states = Array.from(new Set([def.initial].concat(rows.reduce((a, r) => a.concat(r.from, [r.to]), []))));
        let cur = def.initial;
        const m = {
            name: name,
            get state() { return cur; },
            is: (s) => cur === s,
            // declared: ¿está esta transición en la tabla? (no cambia nada)
            declared: (to, ev) => table.has(cur + '>' + to + '@' + (ev || '')),
            go(to, ev) {
                ev = ev || '';
                if (to === cur) return true;
                const okRow = table.has(cur + '>' + to + '@' + ev);
                const from = cur;
                if (!okRow) {
                    noteBad({ machine: name, from: from, to: to, ev: ev });
                    if (window.AC_SM_STRICT === true) throw new Error('[state-machine] ' + name + ': transición no declarada ' + from + ' → ' + to + ' (' + ev + ')');
                }
                cur = to;
                return okRow;
            }
        };
        Object.defineProperty(m, 'def', { value: { name: name, initial: def.initial, states: states, rows: rows, titulo: def.titulo || '', nota: def.nota || '', defectos: def.defectos || [] } });
        REG[name] = m;
        return m;
    };
})();
