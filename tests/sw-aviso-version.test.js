// feat/sw-aviso-version · laboratorio del service worker (servidor propio, el sw.js real de la repo).
// Cubre: (1) el SW guarda en un caché PROPIO (huayu-diario-estado-v1) qué archivos del precache faltaron, sin abortar la
// instalación y sin que activate lo borre; el modo sin conexión (primera carga tras instalar, con la instalación completa
// o incompleta) sigue funcionando. Las secciones de la página (aviso de versión nueva, Yo → Ajustes) se suman en sus commits.
// Un «404 a propósito» se simula con el servidor (bloquear = rutas que devuelven 404), sin tocar sw.js.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium, LAUNCH } = require('./lib/env');

const ROOT = path.resolve(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

// ---- servidor del laboratorio ----
const cfg = { bloquear: new Set(), version: null };       // version: reemplaza «const VERSION = '…'» de sw.js (simula una versión nueva)
const SW_ORIG = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const PRECACHE = (() => { const a = SW_ORIG.indexOf('const PRECACHE = ['), b = SW_ORIG.indexOf('\n];', a); return (SW_ORIG.slice(a, b).match(/'\.\/[^']*'/g) || []).map((x) => x.slice(1, -1)); })();
const server = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    if (cfg.bloquear.has(u)) { res.writeHead(404); return res.end('no'); }
    const f = path.join(ROOT, u === '/' ? 'index.html' : u);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
    let body = fs.readFileSync(f);
    if (u === '/sw.js' && cfg.version) body = Buffer.from(SW_ORIG.replace(/const VERSION = '[^']*'/, "const VERSION = '" + cfg.version + "'"));
    res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
});

async function abrir(b, opciones) {
    const o = Object.assign({ modo: 'es-cn' }, opciones);
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'allow' });
    await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
    await ctx.addInitScript((modo) => {
        if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1');
        localStorage.setItem('ac_onboarding_done_v2', '1');
        localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode: modo }));
    }, o.modo);
    const p = await ctx.newPage(); p._errs = []; p.on('pageerror', (e) => p._errs.push(e.message));
    await p.goto(o.url);
    await esperarControl(p);
    return { ctx, p };
}
// espera a que el SW esté activo Y controle la página (clients.claim)
async function esperarControl(p) {
    await p.evaluate(async () => {
        await navigator.serviceWorker.ready;
        for (let i = 0; i < 100 && !navigator.serviceWorker.controller; i++) await new Promise((r) => setTimeout(r, 100));
    });
    await p.waitForTimeout(400);
}
const estadoSW = (p) => p.evaluate(async () => {
    const keys = await caches.keys(); const out = { keys: keys.sort(), estado: null, entradas: {} };
    for (const k of keys) out.entradas[k] = (await (await caches.open(k)).keys()).length;
    if (keys.indexOf('huayu-diario-estado-v1') !== -1) { const r = await (await caches.open('huayu-diario-estado-v1')).match(location.origin + '/__estado__/precache'); out.estado = r ? await r.json() : null; }
    return out;
});

(async () => {
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
    const b = await chromium.launch({ ...LAUNCH });
    const VERSION_REAL = (SW_ORIG.match(/const VERSION = '([^']*)'/) || [])[1];
    ok(PRECACHE.length >= 50, 'el laboratorio lee el PRECACHE de sw.js (' + PRECACHE.length + ' archivos)');

    // ---- A. instalación completa ----
    {
        const { ctx, p } = await abrir(b, { url: URL });
        const e = await estadoSW(p);
        ok(e.keys.indexOf('huayu-diario-estado-v1') !== -1, 'A · existe el caché propio huayu-diario-estado-v1 (' + e.keys.join(', ') + ')');
        ok(e.estado && e.estado.v === VERSION_REAL && e.estado.total === PRECACHE.length && Array.isArray(e.estado.faltan) && e.estado.faltan.length === 0, 'A · instalación completa: faltan [] de ' + PRECACHE.length + ' (' + JSON.stringify(e.estado && { v: e.estado.v, total: e.estado.total, faltan: e.estado.faltan }) + ')');
        ok(e.estado && e.entradas[e.estado.shell] === PRECACHE.length, 'A · el caché del shell tiene las ' + PRECACHE.length + ' entradas');
        ok(e.entradas['huayu-diario-estado-v1'] === 1, 'A · el caché de estado guarda UNA sola entrada (' + e.entradas['huayu-diario-estado-v1'] + ')');
        // primera carga tras instalar, SIN conexión: arranca y recorre las 4 vistas
        await ctx.setOffline(true);
        await p.reload(); await p.waitForTimeout(1500);
        const off = await p.evaluate(async () => { const o = {}; for (const v of ['aprender', 'hoy', 'entrenar', 'yo']) { showView(v); await new Promise((r) => setTimeout(r, 150)); o[v] = !document.getElementById('view-' + v).classList.contains('hidden'); } return { vistas: o, titulo: document.title, ctrl: !!navigator.serviceWorker.controller }; });
        ok(Object.values(off.vistas).every(Boolean) && off.ctrl, 'A · sin conexión (1.ª carga tras instalar): arranca controlada por el SW y abre las 4 vistas (' + JSON.stringify(off.vistas) + ')');
        ok(p._errs.length === 0, 'A · sin errores JS sin conexión ' + p._errs.join(' / '));
        await ctx.close();
    }

    // ---- B. instalación incompleta: el archivo bloqueado se registra, la instalación NO se aborta ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL });
        const e = await estadoSW(p);
        ok(e.estado && JSON.stringify(e.estado.faltan) === JSON.stringify(['./pinyin-tocfl.js']), 'B · el estado lista el archivo que falló: ' + JSON.stringify(e.estado && e.estado.faltan));
        ok(e.estado && e.entradas[e.estado.shell] === PRECACHE.length - 1, 'B · el shell quedó con ' + (PRECACHE.length - 1) + ' de ' + PRECACHE.length + ' (' + (e.estado && e.entradas[e.estado.shell]) + ')');
        const act = await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); return { activo: r.active && r.active.state, ctrl: !!navigator.serviceWorker.controller }; });
        ok(act.activo === 'activated' && act.ctrl, 'B · la instalación NO se abortó: SW activado y controlando (' + JSON.stringify(act) + ')');
        await ctx.setOffline(true);
        await p.reload(); await p.waitForTimeout(1500);
        const off = await p.evaluate(async () => { const o = {}; for (const v of ['aprender', 'hoy', 'entrenar', 'yo']) { showView(v); await new Promise((r) => setTimeout(r, 150)); o[v] = !document.getElementById('view-' + v).classList.contains('hidden'); } return o; });
        ok(Object.values(off).every(Boolean), 'B · sin conexión con la instalación incompleta: la app arranca y abre las 4 vistas (' + JSON.stringify(off) + ')');
        ok(p._errs.length === 0, 'B · sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
        cfg.bloquear = new Set();
    }

    // ---- C. versión nueva: activate conserva el caché de estado y borra el shell viejo; sin conexión sigue andando ----
    {
        const { ctx, p } = await abrir(b, { url: URL });
        const e0 = await estadoSW(p);
        const viejo = e0.keys.filter((k) => /^huayu-diario-shell-/.test(k));
        ok(viejo.length === 1, 'C · partida: un solo shell (' + viejo.join(', ') + ')');
        cfg.version = 'v-lab-2';
        // se espera (en la página, con tope) a que la versión nueva esté instalada Y activada: el shell nuevo existe y el viejo ya no
        const hecho = await p.evaluate(async (viejo) => {
            const r = await navigator.serviceWorker.getRegistration(); await r.update();
            for (let i = 0; i < 150; i++) { const ks = await caches.keys(); if (ks.indexOf('huayu-diario-shell-v-lab-2') !== -1 && ks.indexOf(viejo) === -1) return { ok: true, t: i * 100 }; await new Promise((x) => setTimeout(x, 100)); }
            return { ok: false, keys: await caches.keys() };
        }, viejo[0]);
        ok(hecho.ok, 'C · tras la actualización el shell viejo se borró y existe el nuevo (a los ' + (hecho.t || 0) + ' ms)');
        await p.waitForTimeout(1500);
        const e1 = await estadoSW(p);
        ok(e1.keys.indexOf('huayu-diario-estado-v1') !== -1, 'C · activate NO borró el caché de estado (' + e1.keys.join(', ') + ')');
        ok(e1.estado && e1.estado.v === 'v-lab-2' && e1.estado.shell === 'huayu-diario-shell-v-lab-2' && e1.estado.faltan.length === 0, 'C · el estado se reescribió con la versión nueva (' + JSON.stringify(e1.estado && { v: e1.estado.v, shell: e1.estado.shell }) + ')');
        ok(e1.keys.indexOf(viejo[0]) === -1, 'C · 1,5 s después el shell viejo sigue sin existir (' + e1.keys.join(', ') + (e1.entradas[viejo[0]] !== undefined ? ' · entradas del viejo: ' + e1.entradas[viejo[0]] : '') + ')');
        ok(e1.keys.every((k) => k === 'huayu-diario-estado-v1' || /^(huayu-diario-shell-|chino-es-)/.test(k)), 'C · no quedan cachés ajenos (' + e1.keys.join(', ') + ')');
        // sin conexión, con el shell nuevo y el caché de estado conviviendo
        await ctx.setOffline(true);
        await p.reload(); await p.waitForTimeout(1500);
        const off = await p.evaluate(async () => { const o = {}; for (const v of ['aprender', 'hoy', 'entrenar', 'yo']) { showView(v); await new Promise((r) => setTimeout(r, 150)); o[v] = !document.getElementById('view-' + v).classList.contains('hidden'); } return o; });
        ok(Object.values(off).every(Boolean), 'C · sin conexión tras la actualización: la app arranca y abre las 4 vistas (' + JSON.stringify(off) + ')');
        ok(p._errs.length === 0, 'C · sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
        cfg.version = null;
    }

    await b.close(); server.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
