#!/usr/bin/env node
// Genera guia-huayu-v<VERSION>.mp4 (ver README.md). Graba contra la copia local de la app:
// no toca el código de la app, sw.js ni VERSION. Todo lo que escribe va a tools/video-guia/out/ y .cache/.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawnSync } = require('child_process');
const E = require('./escenas');
const OV = require('./overlay');

const RAIZ = path.resolve(__dirname, '..', '..');
const OUT = path.join(__dirname, 'out');
const CACHE = path.join(__dirname, '.cache');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FFPROBE = process.env.FFPROBE || 'ffprobe';

function fallar(msg) { console.error('\n✗ ' + msg); process.exitCode = 1; throw new Error(msg); }

function cargarPlaywright() {
    for (const r of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { return require(r); } catch (e) { /* siguiente */ } }
    console.error('No se encontró Playwright. Instalalo con «npm i -D playwright» o apuntá NODE_PATH a su carpeta.'); process.exit(2);
}
function buscarChromium() {
    if (process.env.CHROMIUM) return process.env.CHROMIUM;
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    try {
        const d = fs.readdirSync(base).filter(n => /^chromium-\d+$/.test(n)).sort().pop();
        const p = d && path.join(base, d, 'chrome-linux', 'chrome');
        if (p && fs.existsSync(p)) return p;
    } catch (e) { /* Playwright usa el suyo */ }
    return undefined;
}
function version() {
    const m = fs.readFileSync(path.join(RAIZ, 'sw.js'), 'utf8').match(/const VERSION = '(v\d+)'/);
    if (!m) fallar('No encontré VERSION en sw.js'); return m[1];
}
function servirEstatico() {
    const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json',
        '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.txt': 'text/plain; charset=utf-8' };
    const srv = http.createServer((req, res) => {
        let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
        const f = path.join(RAIZ, path.normalize(p));
        if (!f.startsWith(RAIZ + path.sep) && f !== RAIZ) { res.writeHead(403); return res.end(); }
        fs.readFile(f, (e, b) => {
            if (e) { res.writeHead(404); return res.end('no encontrado'); }
            res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(b);
        });
    });
    return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

// WAV de silencio (mono, 16 kHz): el audio de prueba de /api/tts. Dura lo justo para que «Escuchar todo» avance de línea.
function wavSilencio(seg) {
    const n = Math.round(16000 * seg), b = Buffer.alloc(44 + n * 2);
    b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
    b.writeUInt32LE(16000, 24); b.writeUInt32LE(32000, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
    return b.toString('base64');
}

// Trazos de la ventana de palabra: la app los pide a cdn.jsdelivr.net (hanzi-writer-data). Sin red se ve «sin datos»,
// así que se sirven desde el paquete npm (se baja una vez a .cache/ y se lee de ahí).
function trazo(ch) {
    const tgz = path.join(CACHE, 'hanzi-writer-data-2.0.1.tgz');
    if (!fs.existsSync(tgz)) {
        fs.mkdirSync(CACHE, { recursive: true });
        const r = spawnSync('npm', ['pack', 'hanzi-writer-data@2.0.1', '--pack-destination', CACHE, '--silent'], { encoding: 'utf8' });
        if (r.status !== 0 || !fs.existsSync(tgz)) return null;
    }
    const r = spawnSync('tar', ['-xzOf', tgz, 'package/' + ch + '.json'], { encoding: 'buffer', maxBuffer: 1 << 24 });
    return r.status === 0 && r.stdout.length ? r.stdout : null;
}

let _browser = null, _srv = null;
async function main() {
    const VER = version();
    const salida = path.join(OUT, 'guia-huayu-' + VER + '.mp4');
    fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(path.join(OUT, 'frames'), { recursive: true });
    for (const bin of [FFMPEG, FFPROBE]) if (spawnSync(bin, ['-version']).status !== 0) fallar('No encuentro «' + bin + '». Instalá ffmpeg (ver README).');

    const srv = await servirEstatico(); const BASE = 'http://127.0.0.1:' + srv.address().port;
    const { chromium } = cargarPlaywright(); const exe = buscarChromium();
    const browser = _browser = await chromium.launch(exe ? { executablePath: exe } : {}); _srv = srv;
    const ctx = await browser.newContext({ viewport: { width: E.W, height: E.H }, deviceScaleFactor: E.DPR, serviceWorkers: 'block', locale: 'es-AR', timezoneId: 'America/Argentina/Buenos_Aires' });
    // Perfil nuevo: solo se marcan como vistos los avisos que NO se muestran, y se fija el azar (la primera tarjeta no cambia).
    await ctx.addInitScript(() => {
        try { localStorage.setItem('ac_seen_pares', '1'); localStorage.setItem('ac_seen_modsheet', '1'); } catch (e) { /* noop */ }
        let s = 20260101; Math.random = () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    });
    const externas = [], errores = [], wav = wavSilencio(2);
    // Voz: el servidor no existe en local → audio de prueba en silencio (GET 404 → POST con JSON {audio, mime}).
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, async (route) => {
        const r = route.request(), u = new URL(r.url());
        if (u.hostname === 'app-chino-espa-ol.vercel.app' && u.pathname === '/api/tts') {
            externas.push('tts');
            if (r.method() === 'GET') return route.fulfill({ status: 404, body: '' });
            return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ audio: wav, mime: 'audio/wav' }) });
        }
        if (u.hostname === 'cdn.jsdelivr.net' && /hanzi-writer-data/.test(u.pathname)) {
            const ch = decodeURIComponent(path.basename(u.pathname, '.json')); const b = trazo(ch); externas.push('trazo');
            return b ? route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: b }) : route.fulfill({ status: 404, body: '' });
        }
        externas.push('BLOQUEADA ' + r.method() + ' ' + r.url().slice(0, 100)); return route.abort();
    });
    const page = await ctx.newPage(); page.on('pageerror', e => errores.push(e.message));
    await page.goto(BASE + '/index.html'); await page.evaluate(() => document.fonts.ready);
    await page.evaluate((css) => { window.__VG_CSS = css; }, OV.CSS); await page.evaluate(OV.instalar, OV.GLOBO);

    // ---------- captura ----------
    const frames = []; let nf = 0;
    const MUESTRA = process.argv.includes('--muestra');   // solo capturas de muestra (sin codificar el mp4)
    if (MUESTRA) fs.mkdirSync(path.join(OUT, 'muestra'), { recursive: true });
    const espera = (ms) => page.waitForTimeout(ms);
    let escActual = '', subActual = null;
    const donde = () => 'Escena «' + escActual + '»' + (subActual ? ' · «' + subActual.txt + '»' : '');
    const ctxFallo = (m) => fallar(donde() + ': ' + m);
    async function revisar() {
        const r = await page.evaluate(() => {
            const n = document.getElementById('tts-down-notice');
            const rojo = n && getComputedStyle(n).display !== 'none';
            const alerta = [...document.querySelectorAll('[role=alert]')].some(e => e.offsetParent !== null && e.innerText.trim());
            const txt = document.body.innerText;
            return { rojo, alerta, personal: /ulises|orchani|@gmail|@hotmail|@outlook/i.test(txt), mic: window.__vg.mic };
        });
        if (r.rojo || r.alerta) ctxFallo('apareció un aviso rojo/alerta en la captura ' + nf);
        if (r.personal) ctxFallo('apareció un dato personal en la captura ' + nf);
        if (r.mic) ctxFallo('se tocó 🎤 (captura ' + nf + ')');
    }
    const loc = (sel, nth) => page.locator(sel).nth(nth || 0);
    async function el(sel, nth) { const l = loc(sel, nth); await l.waitFor({ state: 'attached', timeout: 8000 }); return l; }

    // --- globo anclado: se vuelve a ubicar antes de CADA captura (el elemento puede moverse por scroll o cambios de pantalla) ---
    let ancla = null, tolerante = false, gVisible = null, barraTxt = null, estadoRing = null, bordeKey = null; const colocados = new Map();
    async function colocar() {
        gVisible = null; bordeKey = null;
        if (!ancla) { await page.evaluate(() => window.__vg.globo(null)); return; }
        const h = await loc(ancla.sel, ancla.nth).elementHandle({ timeout: 300 }).catch(() => null);
        if (!h) { await page.evaluate(() => window.__vg.globo(null)); return; }   // el elemento ya no está (cambió la pantalla)
        const r = await page.evaluate(([e, t]) => window.__vg.globo(e, t), [h, ancla.g]);
        if (!r.ok && !r.oculto) { if (tolerante) { await page.evaluate(() => window.__vg.globo(null)); return; } ctxFallo(r.motivo); }
        if (r.ok && !r.oculto) {
            gVisible = ancla.g;
            // Comprobación automática, independiente de la ubicación: lo que quedó dibujado no puede tapar el elemento ni salirse.
            const errs = await page.evaluate((e) => window.__vg.chequear(e), h);
            if (errs.length && !tolerante) ctxFallo('el globo «' + ancla.g + '» ' + errs.join(', '));
            const k = escActual + '|' + (subActual && subActual.txt) + '|' + ancla.sel + (ancla.nth || 0) + '|' + ancla.g;
            if (!tolerante && r.ajuste.some(a => /margen/.test(a))) bordeKey = k.replace(/[^a-zA-Z0-9]+/g, '-').slice(0, 70);
            if (!tolerante) colocados.set(k, { escena: escActual, sub: subActual && subActual.txt, sel: ancla.sel, globo: ancla.g, lado: r.lado, pegado: r.pegado, ajuste: r.ajuste, destino: r.destino, ocultaTexto: r.ocultaTexto });
        }
    }
    async function cap(ms) {
        await colocar(); await revisar();
        const f = path.join(OUT, 'frames', String(++nf).padStart(4, '0') + '.png');
        await page.screenshot({ path: f, type: 'png' }); frames.push({ f, ms, g: gVisible, b: barraTxt });
        if (bordeKey && estadoRing) { fs.mkdirSync(path.join(OUT, 'bordes'), { recursive: true }); fs.copyFileSync(f, path.join(OUT, 'bordes', bordeKey + '.png')); }
        return ms;
    }
    let nMuestra = 0;
    async function foto(nombre, etapa) {
        if (!MUESTRA || !subActual || !subActual.muestra) return;
        await page.screenshot({ path: path.join(OUT, 'muestra', String(++nMuestra).padStart(2, '0') + '-' + subActual.muestra + (etapa ? '-' + etapa : '') + '.png'), type: 'png' });
    }
    let subRect = null, rapido = false; // rapido: subtítulos con dos o más globos usan un aro más corto
    const tapa = (b) => !!subRect && b.y < subRect.b + 4 && b.y + b.height > subRect.y - 4;
    async function asegurar(l, sel) {
        // Deja el elemento a la vista, sobre la barra inferior (salvo que esté en ella), con lugar para el globo; el desplazamiento se ve en varias capturas.
        const nav = await page.evaluate(() => window.__vg.navTop());
        let r = await l.boundingBox(); if (!r) ctxFallo('elemento sin caja: ' + sel);
        const enNav = /^#nav-/.test(sel); // los botones de la barra inferior están donde deben; el resto tiene que quedar por encima de ella
        const fijo = await l.evaluate((e) => { for (; e && e !== document.body; e = e.parentElement) if (getComputedStyle(e).position === 'fixed') return true; return false; });
        const ok = (b, aire) => !tapa(b) && b.y >= 8 && (enNav || b.y + b.height <= nav - aire);
        if (fijo ? ok(r, 4) : ok(r, 40)) return 0;   // en hojas fijas no se puede desplazar: alcanza con que no toque la barra inferior
        if (fijo) ctxFallo('el elemento queda tapado o fuera de pantalla: ' + sel);
        const actual = await page.evaluate(() => window.scrollY);
        const objetivo = Math.max(0, Math.round(actual + r.y + r.height / 2 - (64 + nav - 64) / 2));
        let gastado = 0; tolerante = true;
        for (let i = 1; i <= 4; i++) {
            await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(actual + (objetivo - actual) * i / 4)); await espera(60);
            gastado += await cap(100);
        }
        tolerante = false;
        r = await l.boundingBox();
        if (!ok(r, 4)) ctxFallo('el elemento queda tapado o fuera de pantalla: ' + sel);
        return gastado;
    }
    async function ejecutar(p) {
        // devuelve milisegundos usados por las capturas del paso
        if (process.env.DEBUG_VG) console.log('  paso', JSON.stringify(p));
        let usado = 0;
        if (p.espera != null) return cap(p.espera * 1000);
        if (p.ancla) { ancla = { sel: p.ancla, g: p.g }; return 0; }
        if (p.scroll) {
            const l = await el(p.scroll); const act = await page.evaluate(() => window.scrollY); const b = await l.boundingBox();
            const meta = Math.max(0, Math.round(act + b.y - 70)); tolerante = true;
            for (let i = 1; i <= 5; i++) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(act + (meta - act) * i / 5)); await espera(60); tolerante = i < 5; usado += await cap(i === 5 ? 700 : 100); }
            tolerante = false; return usado;
        }
        if (p.mira) {
            const l = await el(p.mira, p.nth); ancla = { sel: p.mira, nth: p.nth, g: p.g }; usado += await asegurar(l, p.mira);
            const b = await l.boundingBox(); if (tapa(b)) ctxFallo('el subtítulo tapa: ' + p.mira);
            await page.evaluate((h) => window.__vg.hi(h), await l.elementHandle()); estadoRing = 'mira'; usado += await cap(p.hold ? p.hold * 1000 : 900); estadoRing = null;
            await foto('mira'); await page.evaluate(() => window.__vg.hi(null)); return usado;
        }
        if (p.click) { const l = await el(p.click, p.nth); await l.click(); await espera(500); return 0; }
        if (p.select) { await page.selectOption(p.select, p.value); await espera(500); return cap((p.hold || 0.5) * 1000); }
        if (p.fill) {
            const l = await el(p.fill); await l.focus(); await page.evaluate(() => { const i = document.activeElement; if (i) i.value = ''; });
            for (const ch of p.text) { await page.keyboard.type(ch); await espera(40); usado += await cap(300); }
            return usado;
        }
        if (p.tap) {
            const l = await el(p.tap, p.nth); ancla = { sel: p.tap, nth: p.nth, g: p.g }; usado += await asegurar(l, p.tap);
            const b = await l.boundingBox(); if (tapa(b)) ctxFallo('el subtítulo tapa: ' + p.tap);
            const h = await l.elementHandle();
            for (const [est, t] of (rapido ? [['a', 150], ['b', 550], ['c', 150]] : [['a', 200], ['b', 850], ['c', 200]])) {
                await page.evaluate(([x, e]) => window.__vg.tap(x, e), [h, est]); estadoRing = est === 'b' ? 'b' : null; usado += await cap(t); estadoRing = null; if (est === 'b') await foto('toque');
            }
            await page.evaluate(() => window.__vg.tap(null));
            if (p.click !== false) { await l.click(); await espera(550); }
            usado += await cap((p.hold != null ? p.hold : 0.6) * 1000);
            return usado;
        }
        ctxFallo('paso desconocido: ' + JSON.stringify(p));
    }

    const MIN_GLOBO_MS = 2500, TOPE_TOTAL_S = 92.5; const subs = [], faltantes = [];
    let totalMs = 0; const resumen = [];
    for (const esc of E.escenas) {
        const t0 = totalMs; escActual = esc.nombre; subActual = null;
        if (esc.tarjeta) {
            await page.evaluate(([a, b, c]) => window.__vg.card(a, b, c), [esc.tarjeta.t1, esc.tarjeta.t2 || '', esc.tarjeta.icono || '']);
            await page.locator('#vg-card img').waitFor({ state: 'visible' }).catch(() => { }); await espera(150);
            if (esc.id === 'titulo') { await page.locator('.ob-next').first().waitFor({ state: 'attached', timeout: 10000 }); }
            ancla = null; barraTxt = null; const i0 = frames.length; await cap(esc.secs * 1000); totalMs += esc.secs * 1000;
            subs.push({ escena: esc.nombre, txt: esc.tarjeta.t1, secs: esc.secs, tarjeta: true, inicio: i0, fin: frames.length });
            await page.evaluate(() => window.__vg.card(null)); resumen.push([esc.nombre, (totalMs - t0) / 1000, 1]); continue;
        }
        for (const s of esc.subs) {
            subActual = s; ancla = null;
            if (s.txt.split(/\s+/).length > 8) ctxFallo('subtítulo de más de 8 palabras');
            if (s.barra && s.pasos.some(p => p.tap || p.mira || p.ancla)) ctxFallo('la barra de subtítulos es solo para pasos sin toque ni elemento');
            if (s.barra) {
                subRect = await page.evaluate(([t, a]) => window.__vg.sub(t, a), [s.txt, !!s.arriba]);
            } else {
                subRect = null; await page.evaluate(() => window.__vg.sub(null));
                // Globos: uno por cada paso con elemento, en orden (2 a 4 palabras).
                const con = s.pasos.filter(p => p.tap || p.mira || p.ancla);
                const gl = Array.isArray(s.globo) ? s.globo : con.map(() => s.globo);
                if (!con.length || gl.length !== con.length || gl.some(g => !g)) ctxFallo('hace falta un texto de globo por cada paso con elemento (' + con.length + ')');
                gl.forEach((g) => { const n = g.trim().split(/\s+/).length; if (n < 2 || n > 4) ctxFallo('el globo «' + g + '» tiene ' + n + ' palabras (deben ser 2 a 4)'); });
                con.forEach((p, i) => { p.g = gl[i]; });
                rapido = con.length > 1;
            }
            if (s.barra) rapido = false;
            barraTxt = s.barra ? s.txt : null;
            const inicio = frames.length; let usado = 0;
            for (const p of s.pasos) usado += await ejecutar(p);
            const budget = s.secs * 1000;
            if (frames.length === inicio) ctxFallo('subtítulo sin capturas');
            if (s.barra) await foto('barra');
            let sobra = budget - usado;
            if (sobra < 250) { faltantes.push(donde() + ': tiempo insuficiente (faltan ' + ((250 - sobra) / 1000).toFixed(2) + ' s): subí secs o bajá los hold en escenas.js'); sobra = 250; }
            // Cada globo tiene que durar en pantalla MIN_GLOBO_MS o más (si se esconde después del toque, se estira el cuadro anterior con el tiempo que sobra).
            const porG = new Map();
            for (let i = inicio; i < frames.length; i++) if (frames[i].g) porG.set(frames[i].g, (porG.get(frames[i].g) || 0) + frames[i].ms);
            for (const [g, ms] of porG) {
                if (ms >= MIN_GLOBO_MS) continue;
                const falta = MIN_GLOBO_MS - ms;
                if (falta > sobra - 250) { faltantes.push(donde() + ': el globo «' + g + '» dura ' + (ms / 1000).toFixed(1) + ' s (mínimo ' + MIN_GLOBO_MS / 1000 + ' s): subí secs de este subtítulo en ' + ((falta - sobra + 250) / 1000).toFixed(2) + ' s o más'); continue; }
                let ult = -1; for (let i = inicio; i < frames.length; i++) if (frames[i].g === g) ult = i;
                frames[ult].ms += falta; sobra -= falta;
            }
            frames[frames.length - 1].ms += sobra; totalMs += budget;
            subs.push({ escena: esc.nombre, txt: s.txt, secs: s.secs, barra: !!s.barra, inicio, fin: frames.length });
        }
        await page.evaluate(() => { window.__vg.sub(null); window.__vg.globo(null); }); subRect = null; ancla = null;
        resumen.push([esc.nombre, (totalMs - t0) / 1000, esc.subs.length]);
    }
    if (faltantes.length) { await browser.close(); srv.close(); fallar('Tiempos que no alcanzan:\n  - ' + faltantes.join('\n  - ')); }
    await revisar();
    if (errores.length) fallar('Errores de JavaScript en la app: ' + errores.join(' | '));
    const extra = externas.filter(x => x.startsWith('BLOQUEADA')); if (extra.length) fallar('Salieron pedidos no previstos: ' + extra.join(' | '));
    await browser.close(); srv.close();

    // ---------- duraciones: cuánto dura en pantalla cada globo y cada barra ----------
    let tt = 0; const t0s = frames.map(fr => { const a = tt; tt += fr.ms; return a; });
    const fmt = (ms) => { const s = ms / 1000, m = Math.floor(s / 60); return m + ':' + (s - m * 60).toFixed(1).padStart(4, '0'); };
    const escenasDur = [];
    for (const s of subs) {
        let e = escenasDur.find(x => x.nombre === s.escena); if (!e) { e = { nombre: s.escena, items: [], desdeMs: t0s[s.inicio] }; escenasDur.push(e); }
        const hastaMs = t0s[s.fin - 1] + frames[s.fin - 1].ms; e.hastaMs = hastaMs;
        if (s.tarjeta) { e.items.push({ tipo: 'tarjeta', texto: s.txt, seg: (hastaMs - t0s[s.inicio]) / 1000, desde: t0s[s.inicio] / 1000, hasta: hastaMs / 1000 }); continue; }
        if (s.barra) { e.items.push({ tipo: 'barra', frase: s.txt, texto: s.txt, seg: (hastaMs - t0s[s.inicio]) / 1000, desde: t0s[s.inicio] / 1000, hasta: hastaMs / 1000 }); continue; }
        const g = new Map();
        for (let i = s.inicio; i < s.fin; i++) if (frames[i].g) { const x = g.get(frames[i].g) || { ms: 0, d: t0s[i], h: 0 }; x.ms += frames[i].ms; x.h = t0s[i] + frames[i].ms; g.set(frames[i].g, x); }
        for (const [texto, x] of g) e.items.push({ tipo: 'globo', frase: s.txt, texto, seg: x.ms / 1000, desde: x.d / 1000, hasta: x.h / 1000 });
    }
    escenasDur.forEach(e => { e.desde = e.desdeMs / 1000; e.hasta = e.hastaMs / 1000; e.seg = (e.hastaMs - e.desdeMs) / 1000; delete e.desdeMs; delete e.hastaMs; });
    const totalS = tt / 1000;
    fs.writeFileSync(path.join(OUT, 'duraciones.json'), JSON.stringify({ total: totalS, escenas: escenasDur }, null, 1));
    console.log('\nDuraciones (segundos en pantalla):');
    for (const e of escenasDur) {
        console.log('  ' + e.nombre.padEnd(11) + ' ' + fmt(e.desde * 1000) + '–' + fmt(e.hasta * 1000) + '  ' + e.seg.toFixed(1).padStart(5) + ' s');
        for (const it of e.items) console.log('      ' + it.tipo.padEnd(8) + ' ' + ('«' + it.texto + '»').padEnd(34) + ' ' + it.seg.toFixed(1).padStart(5) + ' s' + (it.tipo === 'globo' && it.seg < MIN_GLOBO_MS / 1000 ? '  ← MENOS DEL MÍNIMO' : ''));
    }
    console.log('  Total: ' + totalS.toFixed(1) + ' s');
    if (totalS > TOPE_TOTAL_S) fallar('El video dura ' + totalS.toFixed(1) + ' s y el tope es ' + TOPE_TOTAL_S + ' s: acortá secs en escenas.js');
    // Hojas de contacto de los globos corridos hasta el margen de 16 px (una captura por globo, con el aro/marco a la vista).
    try {
        const dir = path.join(OUT, 'bordes'); const lista = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.png$/.test(f)).sort() : [];
        for (let k = 0; k * 8 < lista.length; k++) {
            const grupo = lista.slice(k * 8, k * 8 + 8), args = ['-y', '-v', 'error']; grupo.forEach(f => args.push('-i', path.join(dir, f)));
            args.push('-filter_complex', grupo.map((_, i) => '[' + i + ':v]scale=360:-2[s' + i + ']').join(';') + ';' + grupo.map((_, i) => '[s' + i + ']').join('') + 'xstack=inputs=' + grupo.length + ':layout=' + grupo.map((_, i) => (i % 4) * 360 + '_' + Math.floor(i / 4) * 780).join('|'), path.join(OUT, 'hoja-bordes-' + (k + 1) + '.png'));
            spawnSync(FFMPEG, args);
        }
        console.log('\nGlobos corridos a un borde: ' + lista.length + ' capturas → hoja-bordes-N.png');
    } catch (e) { console.log('(no se pudo armar la hoja de bordes: ' + e.message + ')'); }

    // ---------- informe de globos: qué elementos quedaron pegados a un borde y cómo se resolvió ----------
    const pegados = [...colocados.values()].filter(x => x.pegado.length || x.ajuste.length);
    console.log('\nGlobos ubicados: ' + colocados.size + ' · con elemento pegado a un borde o ajuste: ' + pegados.length);
    for (const x of pegados) console.log('  · ' + x.escena + ' · «' + x.globo + '» → ' + x.sel + ' [' + Math.round(x.destino.x) + ',' + Math.round(x.destino.y) + ' ' + Math.round(x.destino.w) + '×' + Math.round(x.destino.h) + ']: '
        + (x.pegado.length ? 'elemento pegado a: ' + x.pegado.join(', ') + '; ' : '') + 'globo ' + x.lado + (x.ajuste.length ? '; ' + x.ajuste.join(', ') : ''));
    fs.writeFileSync(path.join(OUT, 'globos.json'), JSON.stringify([...colocados.values()], null, 1));
    if (MUESTRA) {
        // Hojas de contacto (4 capturas por hoja) para mirarlas de una vez.
        const fotos = fs.readdirSync(path.join(OUT, 'muestra')).filter(f => /^\d+-.*\.png$/.test(f)).sort();
        for (let k = 0; k * 4 < fotos.length; k++) {
            const grupo = fotos.slice(k * 4, k * 4 + 4); const args = ['-y', '-v', 'error'];
            grupo.forEach(f => args.push('-i', path.join(OUT, 'muestra', f)));
            args.push('-filter_complex', grupo.map((_, i) => '[' + i + ':v]scale=480:-2[s' + i + ']').join(';') + ';' + grupo.map((_, i) => '[s' + i + ']').join('') + 'hstack=inputs=' + grupo.length,
                path.join(OUT, 'hoja-' + (k + 1) + '.png'));
            spawnSync(FFMPEG, args);
        }
        console.log('\nMuestra: ' + fotos.length + ' capturas en ' + path.join(OUT, 'muestra') + ' (hojas: hoja-N.png). No se codificó el mp4.');
        fs.rmSync(path.join(OUT, 'frames'), { recursive: true, force: true }); return;
    }

    // ---------- codificación ----------
    const lista = path.join(OUT, 'lista.txt');
    fs.writeFileSync(lista, 'ffconcat version 1.0\n' + frames.map(x => "file '" + x.f.replace(/'/g, "'\\''") + "'\nduration " + (x.ms / 1000).toFixed(3)).join('\n') + "\nfile '" + frames[frames.length - 1].f + "'\n");
    const seg = (totalMs / 1000).toFixed(3);
    const r = spawnSync(FFMPEG, ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lista, '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
        '-vf', 'fps=' + E.FPS + ',scale=' + (E.W * E.DPR) + ':-2:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-profile:v', 'high',
        '-c:a', 'aac', '-b:a', '32k', '-t', seg, '-movflags', '+faststart', salida], { encoding: 'utf8' });
    if (r.status !== 0) fallar('ffmpeg falló: ' + r.stderr);

    // ---------- comprobación ----------
    const pr = JSON.parse(spawnSync(FFPROBE, ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', salida], { encoding: 'utf8' }).stdout);
    const v = pr.streams.find(s => s.codec_type === 'video'), a = pr.streams.find(s => s.codec_type === 'audio');
    const mb = fs.statSync(salida).size / 1048576, dur = parseFloat(pr.format.duration);
    const lineas = [];
    const ver = (ok, txt) => { lineas.push((ok ? '✓ ' : '✗ ') + txt); if (!ok) process.exitCode = 1; };
    ver(v.codec_name === 'h264', 'video ' + v.codec_name + ' ' + v.width + '×' + v.height + ' (alto ' + (v.height % 2 === 0 ? 'par' : 'IMPAR') + ')');
    ver(v.width === E.W * E.DPR && v.height % 2 === 0, 'ancho ' + v.width + ' px, alto par');
    ver(!!a && a.codec_name === 'aac', 'pista de audio ' + (a ? a.codec_name : 'NO HAY') + ' (silenciosa)');
    ver(mb < 15, 'peso ' + mb.toFixed(2) + ' MB (< 15)');
    ver(dur >= 70 && dur <= 100, 'duración ' + dur.toFixed(2) + ' s (70–100)');
    for (const [nombre, t] of [['inicio', 0.5], ['medio', dur / 2], ['final', dur - 0.5]])
        spawnSync(FFMPEG, ['-y', '-v', 'error', '-ss', String(t), '-i', salida, '-frames:v', '1', path.join(OUT, 'fotograma-' + nombre + '.png')]);
    console.log('\nEscenas:'); for (const [n, s, c] of resumen) console.log('  ' + n.padEnd(11) + String(s).padStart(5) + ' s  ' + c + ' subtítulo(s)');
    console.log('\n' + lineas.join('\n') + '\n\nArchivo: ' + salida + '\nCapturas: ' + frames.length + ' · pedidos: ' + [...new Set(externas)].join(', '));
    // Las capturas sueltas ya no hacen falta.
    fs.rmSync(path.join(OUT, 'frames'), { recursive: true, force: true }); fs.rmSync(lista, { force: true });
}
main().catch(e => { if (!process.exitCode) process.exitCode = 1; console.error(e.stack || e); }).finally(async () => { try { if (_browser) await _browser.close(); } catch (e) { /* noop */ } try { if (_srv) _srv.close(); } catch (e) { /* noop */ } });
