// feat/sw-aviso-version · laboratorio del service worker (servidor propio, el sw.js real de la repo).
// Cubre: (1) el SW guarda en un caché PROPIO (huayu-diario-estado-v1) qué archivos del precache faltaron, sin abortar la
// instalación y sin que activate lo borre; el modo sin conexión (primera carga tras instalar, con la instalación completa
// o incompleta) sigue funcionando. (2) La página avisa de una versión nueva SIN recargarse sola (solo al tocar «Actualizar»),
// en español y en chino (cn-es); la primera instalación no avisa. (3) Yo → Ajustes → «Modo sin conexión» muestra el estado
// del precache (completo / archivos que faltan, con «Reintentar»); sin conexión e incompleto sale UN aviso (una vez por sesión,
// sin invitar a recargar); con conexión se reintenta una vez en silencio; la lista se recalcula contra el caché real.
// Un «404 a propósito» se simula con el servidor (bloquear = rutas que devuelven 404), sin tocar sw.js.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium, LAUNCH, shots } = require('./lib/env');

const ROOT = path.resolve(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return Math.round((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) * 100) / 100; };
const rgb = (s) => (String(s).match(/[\d.]+/g) || []).slice(0, 3).map(Number);
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
    // cada «versión» marca un script precacheado: así se distingue el JS viejo del nuevo (si no, todas serían archivos idénticos)
    if (u === '/nav.js') body = Buffer.concat([body, Buffer.from("\n;window.__cod = '" + (cfg.version || 'orig') + "';\n")]);
    res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
});

async function abrir(b, opciones) {
    const o = Object.assign({ modo: 'es-cn', tema: 'light', sw: 'allow' }, opciones);
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: o.sw });
    await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
    await ctx.addInitScript(([modo, tema]) => {
        if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1');
        localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('theme', tema);
        localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode: modo }));
    }, [o.modo, o.tema]);
    const p = await ctx.newPage(); p._errs = []; p.on('pageerror', (e) => p._errs.push(e.message));
    await p.goto(o.url);
    if (o.sw === 'allow') await esperarControl(p);
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

    // ---- D. la 1.ª instalación NO avisa de «versión nueva»; sw-aviso.js está en el precache ----
    {
        ok(PRECACHE.indexOf('./sw-aviso.js') !== -1, 'D · sw-aviso.js está en el PRECACHE (funciona sin conexión)');
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(1200);
        const v = await p.evaluate(() => { const e = document.getElementById('sw-aviso'); return { existe: !!e, oculto: !e || e.classList.contains('hidden') || getComputedStyle(e).display === 'none' }; });
        ok(v.oculto, 'D · tras la 1.ª instalación (el SW toma la página por 1.ª vez) no hay cartel (' + JSON.stringify(v) + ')');
        await ctx.close();
    }

    // ---- E/F. versión nueva con la pestaña abierta: cartel, sin recarga sola, «Después» y «Actualizar» ----
    for (const [modo, txt, act, des] of [['es-cn', 'Hay una versión nueva de la app.', 'Actualizar', 'Después'], ['cn-es', '应用有新版本。', '更新', '稍后']]) {
        const T = modo + ' · ';
        const { ctx, p } = await abrir(b, { url: URL, modo });
        await p.evaluate(() => { window.__marca = 'pestaña-vieja'; });
        ok(await p.evaluate(() => window.__cod === 'orig'), T + 'partida: la pestaña corre el código «orig»');
        cfg.version = 'v-lab-A';
        await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
        const aparecio = await p.waitForFunction(() => { const e = document.getElementById('sw-aviso'); return !!e && !e.classList.contains('hidden'); }, null, { timeout: 15000 }).then(() => true, () => false);
        ok(aparecio, T + 'llega una versión nueva con la pestaña abierta: aparece el cartel');
        await p.waitForTimeout(2500);
        const c = await p.evaluate(() => {
            const e = document.getElementById('sw-aviso'), nav = document.getElementById('app-nav').getBoundingClientRect(), r = e.getBoundingClientRect();
            return { marca: window.__marca, txt: document.getElementById('sw-aviso-txt').textContent, act: document.getElementById('sw-aviso-act').textContent, no: document.getElementById('sw-aviso-no').textContent, role: e.getAttribute('role'),
                     visible: r.width > 0 && getComputedStyle(e).display !== 'none', sobreNav: r.bottom > nav.top, dentro: r.left >= 0 && r.right <= innerWidth && r.top >= 0, lang: document.documentElement.lang };
        });
        ok(c.marca === 'pestaña-vieja', T + 'la pestaña NO se recargó sola (2,5 s después sigue la marca «' + c.marca + '»)');
        ok(await p.evaluate(() => window.__cod === 'orig'), T + 'mientras el cartel está visible, la pestaña sigue corriendo el JS VIEJO («orig»)');
        ok(c.txt === txt && c.act === act && c.no === des, T + 'textos: «' + c.txt + '» · «' + c.act + '» · «' + c.no + '»');
        ok(c.visible && !c.sobreNav && c.dentro && c.role === 'status', T + 'el cartel se ve entero, no tapa la barra inferior y es role=status (' + JSON.stringify({ visible: c.visible, sobreNav: c.sobreNav, dentro: c.dentro }) + ')');
        // no tapa la acción principal: en Hoy ni el campo de respuesta ni «Verificar»; y queda ARRIBA, debajo de los paneles a pantalla completa
        const tapa = await p.evaluate(async () => {
            showView('hoy'); await new Promise((r) => setTimeout(r, 300));
            const c = document.getElementById('sw-aviso').getBoundingClientRect();
            const ix = (id) => { const e = document.getElementById(id); if (!e || !e.offsetParent) return 0; const r = e.getBoundingClientRect(); return Math.max(0, Math.min(r.right, c.right) - Math.max(r.left, c.left)) * Math.max(0, Math.min(r.bottom, c.bottom) - Math.max(r.top, c.top)); };
            const z = +getComputedStyle(document.getElementById('sw-aviso')).zIndex, zPop = +getComputedStyle(document.getElementById('lesson-pop')).zIndex, zWp = +getComputedStyle(document.getElementById('writer-practice-banner')).zIndex;
            const out = { input: ix('answer-input'), verificar: ix('btn-check'), top: Math.round(c.top), z, zPop, zWp };
            showView('aprender'); return out;
        });
        ok(tapa.input === 0 && tapa.verificar === 0 && tapa.top < 100, T + 'en Hoy el cartel no tapa el campo de respuesta ni «Verificar» y está arriba (' + JSON.stringify(tapa) + ')');
        ok(tapa.z < tapa.zPop && tapa.z < tapa.zWp, T + 'queda DEBAJO de los paneles a pantalla completa (z ' + tapa.z + ' < lección ' + tapa.zPop + ', escritura ' + tapa.zWp + '): no tapa sus acciones');
        await p.screenshot({ path: shots('sw-aviso') + 'cartel-' + modo + '.png' });
        // contraste medido con el cartel visible (texto, botones) y anillo de foco con Tab real
        const col = await p.evaluate(() => { const g = (id) => { const e = document.getElementById(id), cs = getComputedStyle(e); return { c: cs.color, b: cs.backgroundColor }; }; return { fondo: getComputedStyle(document.getElementById('sw-aviso')).backgroundColor, txt: g('sw-aviso-txt'), act: g('sw-aviso-act'), no: g('sw-aviso-no') }; });
        ok(ratio(rgb(col.txt.c), rgb(col.fondo)) >= 4.5, T + 'texto del cartel ' + col.txt.c + ' sobre ' + col.fondo + ' = ' + ratio(rgb(col.txt.c), rgb(col.fondo)) + ':1 (≥ 4,5)');
        ok(ratio(rgb(col.act.c), rgb(col.act.b)) >= 4.5, T + 'botón «Actualizar» ' + col.act.c + ' sobre ' + col.act.b + ' = ' + ratio(rgb(col.act.c), rgb(col.act.b)) + ':1 (≥ 4,5)');
        ok(ratio(rgb(col.no.c), rgb(col.fondo)) >= 4.5, T + 'botón «Después» ' + col.no.c + ' sobre ' + col.fondo + ' = ' + ratio(rgb(col.no.c), rgb(col.fondo)) + ':1 (≥ 4,5)');
        await p.evaluate(() => document.body.focus());
        let llegoAct = false; for (let i = 0; i < 120 && !llegoAct; i++) { await p.keyboard.press('Tab'); llegoAct = await p.evaluate(() => document.activeElement && document.activeElement.id === 'sw-aviso-act'); }
        await p.waitForTimeout(450);
        const f = await p.evaluate(() => { const cs = getComputedStyle(document.activeElement); return { fv: document.activeElement.matches(':focus-visible'), color: cs.outlineColor, estilo: cs.outlineStyle, ancho: parseFloat(cs.outlineWidth), sombra: cs.boxShadow }; });
        ok(llegoAct && f.fv && f.estilo === 'solid' && f.ancho >= 2 && ratio(rgb(f.color), rgb(col.fondo)) >= 3, T + 'Tab real llega a «Actualizar» y su anillo ' + f.color + ' sobre el cartel = ' + ratio(rgb(f.color), rgb(col.fondo)) + ':1 (≥ 3)');
        // «Después» lo oculta y NO recarga
        await p.click('#sw-aviso-no'); await p.waitForTimeout(300);
        const oculto = await p.evaluate(() => ({ oculto: getComputedStyle(document.getElementById('sw-aviso')).display === 'none', marca: window.__marca }));
        ok(oculto.oculto && oculto.marca === 'pestaña-vieja', T + '«Después» oculta el cartel y la pestaña sigue sin recargar');
        // otra versión: vuelve a avisar; «Actualizar» recarga SOLO al tocarlo
        cfg.version = 'v-lab-B';
        await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
        const otra = await p.waitForFunction(() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; }, null, { timeout: 15000 }).then(() => true, () => false);
        ok(otra, T + 'otra versión: el cartel vuelve a aparecer');
        await p.waitForTimeout(800);
        ok(await p.evaluate(() => window.__marca === 'pestaña-vieja' && window.__cod === 'orig'), T + 'sigue sin recargar (y con el JS viejo) mientras no se toca «Actualizar»');
        // «Actualizar» tocado SIN conexión: la recarga no puede romper una pestaña que andaba
        if (modo === 'es-cn') await ctx.setOffline(true);
        await Promise.all([p.waitForNavigation({ waitUntil: 'load', timeout: 15000 }), p.click('#sw-aviso-act')]);
        await esperarControl(p);
        if (modo === 'es-cn') {
            const off = await p.evaluate(async () => { const o = {}; for (const v of ['aprender', 'hoy', 'entrenar', 'yo']) { showView(v); await new Promise((r) => setTimeout(r, 150)); o[v] = !document.getElementById('view-' + v).classList.contains('hidden'); } return o; });
            ok(Object.values(off).every(Boolean), T + '«Actualizar» sin conexión: la app recarga, arranca y abre las 4 vistas (' + JSON.stringify(off) + ')');
            await ctx.setOffline(false);
        }
        const r = await p.evaluate(async () => ({ marca: window.__marca || null, ctrl: !!navigator.serviceWorker.controller, aviso: (() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; })() }));
        const e2 = await estadoSW(p);
        ok(r.marca === null && r.ctrl, T + 'al tocar «Actualizar» la página se recarga y queda controlada por el SW nuevo');
        ok(e2.estado && e2.estado.v === 'v-lab-B', T + 'la página recargada corre con la versión nueva (estado v ' + (e2.estado && e2.estado.v) + ')');
        ok(await p.evaluate(() => window.__cod === 'v-lab-B'), T + 'tras «Actualizar» la pestaña corre el JS NUEVO («v-lab-B»)');
        ok(!r.aviso, T + 'tras recargar no queda el cartel');
        ok(p._errs.length === 0, T + 'sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
        cfg.version = null;
    }

    // ---- H. camino real tras un deploy: una pestaña ya controlada se recarga con normalidad (sin r.update()) ----
    {
        const { ctx, p } = await abrir(b, { url: URL });
        cfg.version = 'v-lab-D';
        await p.reload(); await p.waitForTimeout(1200);
        const codPrimera = await p.evaluate(() => window.__cod);
        const sale = await p.waitForFunction(() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; }, null, { timeout: 12000 }).then(() => true, () => false);
        // se registra lo observado: el SW nuevo se instala DESPUÉS de que carga esta visita (sirvió el shell viejo), toma la página y el cartel avisa en esa MISMA visita
        ok(codPrimera === 'orig', 'H · la visita tras el deploy sirve el shell viejo («' + codPrimera + '»): el SW nuevo todavía no tomó la página');
        ok(sale, 'H · y en ESA MISMA visita el cartel avisa de la versión nueva (recarga normal, sin r.update()): ' + sale);
        const cod2 = await p.evaluate(() => window.__cod);
        ok(cod2 === 'orig', 'H · y hasta tocar «Actualizar» la pestaña corre el JS viejo («' + cod2 + '»)');
        await ctx.close();
        cfg.version = null;
    }

    // ---- G. cambiar de idioma con el cartel visible lo traduce ----
    {
        const { ctx, p } = await abrir(b, { url: URL });
        cfg.version = 'v-lab-C';
        await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
        await p.waitForFunction(() => { const e = document.getElementById('sw-aviso'); return !!e && !e.classList.contains('hidden'); }, null, { timeout: 15000 });
        const t = await p.evaluate(async () => { const a = document.getElementById('sw-aviso-txt').textContent; await setMode('cn-es'); return [a, document.getElementById('sw-aviso-txt').textContent, document.getElementById('sw-aviso-act').textContent]; });
        ok(t[0] === 'Hay una versión nueva de la app.' && t[1] === '应用有新版本。' && t[2] === '更新', 'G · al pasar a cn-es con el cartel visible se traduce («' + t.join('» · «') + '»)');
        await ctx.close();
        cfg.version = null;
    }

    // ---- Yo → Ajustes: lectura de la fila «Modo sin conexión» ----
    const fila = (p) => p.evaluate(() => {
        const vis = (id) => { const e = document.getElementById(id); return !!e && getComputedStyle(e).display !== 'none' && !e.classList.contains('hidden'); };
        return { fila: vis('row-sw-estado'), etiqueta: (document.querySelector('#row-sw-estado .set-label') || {}).textContent, txt: document.getElementById('sw-estado-txt').textContent, falta: document.getElementById('sw-estado-txt').classList.contains('falta'),
                 lista: [...document.querySelectorAll('#sw-estado-lista li')].map((x) => x.textContent), listaVis: vis('sw-estado-lista'), btn: vis('btn-sw-reintentar'), btnDis: document.getElementById('btn-sw-reintentar').disabled, btnTxt: document.getElementById('btn-sw-reintentar').textContent,
                 cartel: (() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; })() };
    });
    const hayCacheado = (p, f) => p.evaluate(async (f) => !!(await caches.match(new URL(f, document.baseURI).href, { ignoreVary: true })), f);
    const irAjustes = (p) => p.evaluate(async () => { showView('yo'); await new Promise((r) => setTimeout(r, 300)); });

    // ---- I. instalación completa: «Completo», sin lista, sin botón, sin aviso ----
    {
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(1500); await irAjustes(p);
        const f = await fila(p);
        ok(f.fila && f.etiqueta === 'Modo sin conexión' && f.txt === 'Completo' && !f.falta && !f.listaVis && !f.btn && !f.cartel, 'I · instalación completa: Ajustes dice «Completo», sin lista ni botón y sin aviso (' + JSON.stringify(f) + ')');
        await ctx.close();
    }

    // ---- J. incompleta, con conexión: la fila muestra el archivo; NO hay aviso; «Reintentar» lo baja ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(2000); await irAjustes(p);
        const f = await fila(p);
        ok(f.fila && f.falta && f.txt === 'Incompleto · archivos sin descargar: 1' && JSON.stringify(f.lista) === '["./pinyin-tocfl.js"]' && f.listaVis && f.btn && f.btnTxt === 'Reintentar', 'J · incompleta: Ajustes lista «./pinyin-tocfl.js» con «Reintentar» (' + JSON.stringify(f) + ')');
        ok(!f.cartel, 'J · con conexión NO hay aviso visible (solo la fila de Ajustes)');
        await p.evaluate(() => document.getElementById('row-sw-estado').scrollIntoView({ block: 'center' })); await p.waitForTimeout(200);
        await p.screenshot({ path: shots('sw-aviso') + 'ajustes-incompleto.png' });
        // reintento con el archivo todavía bloqueado: sigue faltando
        await p.click('#btn-sw-reintentar'); await p.waitForTimeout(1200);
        const f2 = await fila(p);
        ok(f2.falta && f2.lista.length === 1, 'J · «Reintentar» con el archivo todavía caído: sigue en la lista (' + f2.txt + ')');
        ok(!(await hayCacheado(p, './pinyin-tocfl.js')), 'J · y el archivo sigue sin estar en el caché');
        // vuelve el servidor: «Reintentar» lo baja y la fila pasa a «Completo»
        cfg.bloquear = new Set();
        await p.click('#btn-sw-reintentar');
        await p.waitForFunction(() => document.getElementById('sw-estado-txt').textContent === 'Completo', null, { timeout: 15000 }).catch(() => { });
        const f3 = await fila(p);
        ok(f3.txt === 'Completo' && !f3.falta && !f3.btn && !f3.listaVis, 'J · con el servidor de vuelta, «Reintentar» completa: «' + f3.txt + '»');
        ok(await hayCacheado(p, './pinyin-tocfl.js'), 'J · y el archivo quedó en el caché (sirve sin conexión)');
        const e = await estadoSW(p);
        ok(e.estado && e.estado.faltan.length === 1, 'J · la página NO reescribió el caché de estado (sigue la lista de la instalación: ' + JSON.stringify(e.estado && e.estado.faltan) + ')');
        ok(p._errs.length === 0, 'J · sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
    }

    // ---- K. reintento automático al abrir con conexión: una sola vez por sesión, en silencio ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(1500);
        cfg.bloquear = new Set();                                  // el servidor vuelve
        const p2 = await ctx.newPage(); p2._errs = [];            // pestaña nueva = sesión nueva (sessionStorage vacío)
        await p2.goto(URL); await esperarControl(p2);
        await p2.waitForFunction(async () => { const r = await caches.match(new URL('./pinyin-tocfl.js', document.baseURI).href); return !!r; }, null, { timeout: 15000 }).catch(() => { });
        await irAjustes(p2);
        const f = await fila(p2);
        ok(f.txt === 'Completo' && await hayCacheado(p2, './pinyin-tocfl.js'), 'K · al abrir con conexión se reintentó solo (sin tocar nada): «' + f.txt + '»');
        ok(!f.cartel, 'K · y sin ningún aviso');
        await ctx.close();
        // una sola vez por sesión, y solo si se intenta de verdad: la visita que instala no tiene estado todavía (no hay intento);
        // la 1.ª recarga con algo faltante SÍ reintenta; la siguiente no
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx: c3, p: p3 } = await abrir(b, { url: URL });
        await p3.waitForTimeout(1500);
        let pedidos = 0; p3.on('request', (r) => { if (/pinyin-tocfl\.js/.test(r.url())) pedidos++; });
        await p3.reload(); await p3.waitForTimeout(2500);
        const primera = pedidos; pedidos = 0;
        ok(primera >= 1, 'K · la 1.ª carga con algo faltante SÍ reintenta solo (' + primera + ' pedidos de pinyin-tocfl.js)');
        await p3.reload(); await p3.waitForTimeout(2500);
        ok(pedidos === 0, 'K · la carga siguiente de la misma pestaña NO lo repite (' + pedidos + ' pedidos)');
        await c3.close();
        cfg.bloquear = new Set();
    }

    // ---- L. sin conexión e incompleta: UN aviso por sesión, sin invitar a recargar; completa: nada ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(1500);
        const on = await fila(p);
        ok(!on.cartel, 'L · con conexión no hay aviso');
        await ctx.setOffline(true);
        await p.reload(); await p.waitForTimeout(2000);
        const cartel = await p.evaluate(() => { const e = document.getElementById('sw-aviso'); return { vis: !!e && getComputedStyle(e).display !== 'none', txt: document.getElementById('sw-aviso-txt') && document.getElementById('sw-aviso-txt').textContent, act: getComputedStyle(document.getElementById('sw-aviso-act')).display, no: document.getElementById('sw-aviso-no').textContent, top: Math.round(e.getBoundingClientRect().top) }; });
        ok(cartel.vis && cartel.txt === 'Modo sin conexión incompleto · archivos sin descargar: 1. Conectate a internet para completarlos.', 'L · sin conexión e incompleta aparece el aviso: «' + cartel.txt + '»');
        ok(cartel.act === 'none' && cartel.no === 'Cerrar', 'L · no invita a recargar (sin «Actualizar») y se cierra con «Cerrar»');
        await p.screenshot({ path: shots('sw-aviso') + 'aviso-sin-conexion.png' });
        await p.click('#sw-aviso-no'); await p.waitForTimeout(300);
        await p.evaluate(() => window.dispatchEvent(new Event('offline'))); await p.waitForTimeout(300);
        ok(await p.evaluate(() => getComputedStyle(document.getElementById('sw-aviso')).display === 'none'), 'L · cerrado, no vuelve a salir (aunque se repita el evento sin conexión)');
        await p.reload(); await p.waitForTimeout(2000);
        ok(await p.evaluate(() => { const e = document.getElementById('sw-aviso'); return !e || getComputedStyle(e).display === 'none'; }), 'L · cerrado, tampoco vuelve al RECARGAR la pestaña (una vez por sesión)');
        const pn = await ctx.newPage(); await pn.goto(URL); await pn.waitForTimeout(2500);
        ok(await pn.evaluate(() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; }), 'L · en una pestaña NUEVA (sesión nueva) sí vuelve a avisar');
        await pn.close();
        await irAjustes(p);
        const f = await fila(p);
        ok(f.fila && f.falta && f.lista.length === 1, 'L · y Yo → Ajustes sigue mostrando la lista sin conexión (' + f.txt + ')');
        ok(f.btn && f.btnDis, 'L · sin conexión «Reintentar» está deshabilitado (no hay nada que bajar)');
        // al volver la conexión no hay aviso
        await ctx.setOffline(false); await p.evaluate(() => window.dispatchEvent(new Event('online'))); await p.waitForTimeout(500);
        ok(await p.evaluate(() => getComputedStyle(document.getElementById('sw-aviso')).display === 'none'), 'L · con la conexión de vuelta no hay aviso');
        ok(!(await fila(p)).btnDis, 'L · y «Reintentar» se habilita de nuevo');
        await ctx.close();
        cfg.bloquear = new Set();
        // instalación completa y sin conexión: ningún aviso
        const { ctx: c2, p: p2 } = await abrir(b, { url: URL });
        await p2.waitForTimeout(1200); await c2.setOffline(true);
        await p2.reload(); await p2.waitForTimeout(2000);
        ok(await p2.evaluate(() => { const e = document.getElementById('sw-aviso'); return !e || getComputedStyle(e).display === 'none'; }), 'L · instalación completa y sin conexión: ningún aviso');
        await c2.close();
    }

    // ---- M. cn-es: fila y aviso en chino (PENDIENTE de revisión) ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL, modo: 'cn-es' });
        await p.waitForTimeout(2000); await irAjustes(p);
        const f = await fila(p);
        ok(f.etiqueta === '离线模式' && f.txt === '不完整 · 未下载的文件：1' && f.btnTxt === '重试', 'M · cn-es: la fila dice «' + f.etiqueta + '» · «' + f.txt + '» · «' + f.btnTxt + '»');
        await ctx.setOffline(true); await p.reload(); await p.waitForTimeout(2000);
        const t = await p.evaluate(() => [document.getElementById('sw-aviso-txt').textContent, document.getElementById('sw-aviso-no').textContent]);
        ok(t[0] === '离线模式不完整 · 未下载的文件：1。请联网后补全。' && t[1] === '关闭', 'M · cn-es: el aviso sin conexión dice «' + t[0] + '» · «' + t[1] + '»');
        await ctx.close();
        cfg.bloquear = new Set();
    }

    // ---- N. la lista se RECALCULA contra el caché real (el SW guardó el archivo después, al pedirlo) ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(1500);
        cfg.bloquear = new Set();
        await p.evaluate(async () => { await fetch('./pinyin-tocfl.js'); });  // pedido sin ?v= (como el respaldo del SW por nombre): el SW lo guarda al pedirlo (cacheFirstShell)
        await p.waitForTimeout(800);
        const e = await estadoSW(p);
        ok(e.estado && e.estado.faltan.length === 1, 'N · el estado de la instalación sigue listando el archivo (' + JSON.stringify(e.estado && e.estado.faltan) + ')');
        const p2 = await ctx.newPage(); await p2.goto(URL); await esperarControl(p2); await p2.waitForTimeout(800); await irAjustes(p2);
        const f = await fila(p2);
        ok(f.txt === 'Completo' && !f.btn, 'N · pero la fila dice «' + f.txt + '»: ya está en el caché real');
        await ctx.close();
    }

    // ---- O. contraste de la fila en los tres temas (incompleta) ----
    for (const tema of ['light', 'dark', 'paper']) {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL, tema });
        await p.waitForTimeout(1800); await irAjustes(p);
        // contraste sobre píxeles reales (el fondo puede ser un degradado): fondo = el color más repetido del recorte; texto = el píxel más lejano en luminancia
        for (const [k, sel] of [['txt', '#sw-estado-txt'], ['lista', '#sw-estado-lista'], ['btn', '#btn-sw-reintentar']]) {
            const buf = await (await p.$(sel)).screenshot();
            const cr = await p.evaluate(async (b64) => {
                const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
                const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
                const d = g.getImageData(0, 0, c.width, c.height).data;
                const L = (r, gg, bb) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(bb); };
                const cnt = new Map(); for (let i = 0; i < d.length; i += 4) { const key = d[i] + ',' + d[i + 1] + ',' + d[i + 2]; cnt.set(key, (cnt.get(key) || 0) + 1); }
                const bg = [...cnt.entries()].sort((x, y) => y[1] - x[1])[0][0].split(',').map(Number); const lb = L(...bg); let best = 1;
                for (let i = 0; i < d.length; i += 4) { const l = L(d[i], d[i + 1], d[i + 2]); const r = (Math.max(l, lb) + 0.05) / (Math.min(l, lb) + 0.05); if (r > best) best = r; }
                return { bg, ratio: Math.round(best * 100) / 100 };
            }, buf.toString('base64'));
            ok(cr.ratio >= 4.5, 'O · ' + tema + ' · ' + k + ' (' + sel + '): texto sobre rgb(' + cr.bg + ') = ' + cr.ratio + ':1 (≥ 4,5)');
        }
        await ctx.close();
        cfg.bloquear = new Set();
    }

    // ---- P. una versión nueva reescribe el estado: la fila lo refleja sin recargar ----
    {
        cfg.bloquear = new Set(['/pinyin-tocfl.js']);
        const { ctx, p } = await abrir(b, { url: URL });
        await p.waitForTimeout(1500);
        cfg.bloquear = new Set(); cfg.version = 'v-lab-E';
        await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
        await p.waitForFunction(() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; }, null, { timeout: 15000 });
        await p.waitForTimeout(500); await irAjustes(p);
        const f = await fila(p);
        ok(f.txt === 'Completo', 'P · la versión nueva se instaló completa: la fila pasa a «' + f.txt + '» sin recargar');
        await ctx.close();
        cfg.version = null;
    }

    // ---- Q. sin service worker (serviceWorkers: 'block'): la fila de Ajustes queda oculta y no hay avisos ----
    {
        const { ctx, p } = await abrir(b, { url: URL, sw: 'block' });
        await p.waitForTimeout(1500); await irAjustes(p);
        const f = await fila(p);
        ok(!f.fila && !f.cartel, 'Q · sin SW: la fila «Modo sin conexión» queda oculta y no hay cartel (' + JSON.stringify({ fila: f.fila, cartel: f.cartel }) + ')');
        ok(p._errs.length === 0, 'Q · sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
    }

    // ---- R. versión nueva INCOMPLETA: sin conexión «Actualizar» NO se ofrece (la recarga arrancaría sin un archivo); con conexión vuelve ----
    {
        const { ctx, p } = await abrir(b, { url: URL });
        cfg.version = 'v-lab-F'; cfg.bloquear = new Set(['/karaoke.js']);
        await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
        await p.waitForFunction(() => { const e = document.getElementById('sw-aviso'); return !!e && getComputedStyle(e).display !== 'none'; }, null, { timeout: 15000 });
        await p.waitForFunction(() => { const x = window.swAvisoEstado(); return x.faltan && x.faltan.length === 1; }, null, { timeout: 15000 }); // la relectura al quedar «activated»
        const vista = () => p.evaluate(() => { const e = document.getElementById('sw-aviso'); return { vis: !!e && getComputedStyle(e).display !== 'none', txt: document.getElementById('sw-aviso-txt').textContent, act: getComputedStyle(document.getElementById('sw-aviso-act')).display !== 'none', no: document.getElementById('sw-aviso-no').textContent }; });
        const e = await estadoSW(p);
        ok(e.estado && JSON.stringify(e.estado.faltan) === '["./karaoke.js"]', 'R · la versión nueva quedó incompleta (falta ./karaoke.js): ' + JSON.stringify(e.estado && e.estado.faltan));
        const v1 = await vista();
        ok(v1.vis && v1.act && v1.txt === 'Hay una versión nueva de la app.', 'R · con conexión: «Hay una versión nueva» con «Actualizar» (' + JSON.stringify(v1) + ')');
        await ctx.setOffline(true); await p.evaluate(() => window.dispatchEvent(new Event('offline')));
        await p.waitForFunction(() => /archivos sin descargar/.test(document.getElementById('sw-aviso-txt').textContent), null, { timeout: 10000 }).catch(() => { });
        const v2 = await vista();
        ok(v2.vis && !v2.act && /archivos sin descargar: 1/.test(v2.txt) && v2.no === 'Cerrar', 'R · sin conexión: NO se ofrece «Actualizar»; solo informa «' + v2.txt + '»');
        await ctx.setOffline(false); await p.evaluate(() => window.dispatchEvent(new Event('online')));
        await p.waitForFunction(() => document.getElementById('sw-aviso-txt').textContent === 'Hay una versión nueva de la app.' && getComputedStyle(document.getElementById('sw-aviso-act')).display !== 'none', null, { timeout: 10000 }).catch(() => { });
        const v3 = await vista();
        ok(v3.vis && v3.act && v3.txt === 'Hay una versión nueva de la app.', 'R · al volver la conexión vuelve «Actualizar»');
        await p.click('#sw-aviso-no'); await p.waitForTimeout(300);
        ok(!(await vista()).vis, 'R · «Después» lo oculta y no reaparece solo');
        await ctx.close();
        cfg.version = null; cfg.bloquear = new Set();
    }

    await b.close(); server.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
