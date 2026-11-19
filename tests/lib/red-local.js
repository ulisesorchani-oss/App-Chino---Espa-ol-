// tests/lib/red-local.js — guarda de red para la batería: el navegador NO sale de localhost.
// Se precarga en cada proceso con  NODE_OPTIONS="--require /ruta/absoluta/tests/lib/red-local.js"  y  AC_RED_LOCAL=1
// (lo hace .github/workflows/bateria.yml). Sin AC_RED_LOCAL=1 no hace nada.
//   · envuelve chromium.launch / launchPersistentContext de Playwright (venga de tests/lib/env.js o de los cargadores
//     propios de tools/): cada contexto nuevo recibe un context.route que ABORTA (net::ERR_BLOCKED_BY_CLIENT) todo pedido
//     http(s) que no vaya a localhost / 127.0.0.1. Las suites no cambian.
//   · las rutas simuladas de las suites siguen ganando: Playwright prueba primero las de la página y, entre las del
//     contexto, la última registrada (la de la suite se registra después que esta)
//   · no se usa --host-resolver-rules: con un proxy (como en el contenedor de desarrollo) Chromium no resuelve nombres
//     y la regla no corta nada
//   · al terminar, cada proceso que lanzó un navegador imprime en stderr qué hosts se cortaron (o que no hubo ninguno)
// Es solo para el navegador: no toca pedidos que haga Node.
'use strict';
if (process.env.AC_RED_LOCAL === '1') {
    const Module = require('module');
    const cortados = new Map(); // host → cantidad
    let usado = false;          // este proceso lanzó un navegador
    const externo = (u) => {
        let x; try { x = new URL(String(u)); } catch (e) { return false; }
        if (x.protocol !== 'http:' && x.protocol !== 'https:') return false;
        return !(x.hostname === 'localhost' || x.hostname === '127.0.0.1' || x.hostname === '[::1]');
    };
    const vigilar = async (ctx) => {
        await ctx.route(externo, (route) => {
            const h = new URL(route.request().url()).hostname;
            cortados.set(h, (cortados.get(h) || 0) + 1);
            return route.abort('blockedbyclient');
        });
        return ctx;
    };
    const parchar = (bt) => {
        if (!bt || bt.__acRedLocal) return;
        bt.__acRedLocal = true;
        const launch = bt.launch.bind(bt), persist = bt.launchPersistentContext && bt.launchPersistentContext.bind(bt);
        bt.launch = async (o) => {
            usado = true;
            const b = await launch(o);
            const nc = b.newContext.bind(b), np = b.newPage.bind(b);
            b.newContext = async (...a) => vigilar(await nc(...a));
            b.newPage = async (...a) => { const p = await np(...a); await vigilar(p.context()); return p; }; // antes de cualquier goto
            return b;
        };
        if (persist) bt.launchPersistentContext = async (dir, o) => { usado = true; return vigilar(await persist(dir, o)); };
    };
    const load = Module._load;
    Module._load = function () {
        const m = load.apply(this, arguments);
        try { if (m && typeof m === 'object' && m.chromium && typeof m.chromium.launch === 'function') parchar(m.chromium); } catch (e) { /* no es Playwright */ }
        return m;
    };
    process.on('exit', () => {
        if (!usado) return;
        const t = [...cortados].map(([h, n]) => h + ' (' + n + ')').join(', ');
        process.stderr.write('red-local: ' + (t ? 'se cortaron pedidos externos del navegador a: ' + t : 'ningún pedido externo del navegador') + '\n');
    });
}
