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
    await page.evaluate((css) => { window.__VG_CSS = css; }, OV.CSS); await page.evaluate(OV.instalar);

    // ---------- captura ----------
    const frames = []; let nf = 0;
    const espera = (ms) => page.waitForTimeout(ms);
    async function revisar() {
        const r = await page.evaluate(() => {
            const n = document.getElementById('tts-down-notice');
            const rojo = n && getComputedStyle(n).display !== 'none';
            const alerta = [...document.querySelectorAll('[role=alert]')].some(e => e.offsetParent !== null && e.innerText.trim());
            const txt = document.body.innerText;
            return { rojo, alerta, personal: /ulises|orchani|@gmail|@hotmail|@outlook/i.test(txt), mic: window.__vg.mic };
        });
        if (r.rojo || r.alerta) fallar('Apareció un aviso rojo/alerta en la captura ' + nf);
        if (r.personal) fallar('Apareció un dato personal en la captura ' + nf);
        if (r.mic) fallar('Se tocó 🎤 (captura ' + nf + ')');
    }
    async function cap(ms) {
        await revisar();
        const f = path.join(OUT, 'frames', String(++nf).padStart(4, '0') + '.png');
        await page.screenshot({ path: f, type: 'png' }); frames.push({ f, ms }); return ms;
    }
    const loc = (sel, nth) => page.locator(sel).nth(nth || 0);
    async function el(sel, nth) { const l = loc(sel, nth); await l.waitFor({ state: 'attached', timeout: 8000 }); return l; }
    let subRect = null, rapido = false; // rapido: subtítulos con dos toques usan un marcador más corto
    const tapa = (b) => !!subRect && b.y < subRect.b + 4 && b.y + b.height > subRect.y - 4;
    async function asegurar(l, sel) {
        // Deja el elemento a la vista y por encima del subtítulo (nunca tapado); el desplazamiento se ve en varias capturas.
        const ymin = () => (subRect && subRect.arriba ? subRect.b + 10 : 8);
        const ymax = () => (subRect ? (subRect.arriba ? subRect.nav - 8 : subRect.y - 14) : E.H - 130);
        let r = await l.boundingBox(); if (!r) fallar('Elemento sin caja: ' + sel);
        if (!tapa(r) && r.y >= 0 && r.y + r.height <= E.H) return 0; // a la vista y sin subtítulo encima (la barra de abajo cuenta)
        const actual = await page.evaluate(() => window.scrollY);
        const objetivo = Math.max(0, Math.round(actual + r.y + r.height / 2 - (ymin() + ymax()) / 2));
        let gastado = 0;
        for (let i = 1; i <= 4; i++) {
            await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(actual + (objetivo - actual) * i / 4)); await espera(60);
            gastado += await cap(100);
        }
        r = await l.boundingBox();
        if (tapa(r) || r.y < 0 || r.y + r.height > E.H) fallar('El subtítulo tapa o deja fuera de pantalla: ' + sel);
        return gastado;
    }
    async function ejecutar(p, ms) {
        if (process.env.DEBUG_VG) console.log('  paso', JSON.stringify(p));
        // devuelve milisegundos usados por las capturas del paso
        let usado = 0;
        if (p.espera != null) return cap(p.espera * 1000);
        if (p.scroll) {
            const l = await el(p.scroll); const act = await page.evaluate(() => window.scrollY); const b = await l.boundingBox();
            const meta = Math.max(0, Math.round(act + b.y - 70));
            for (let i = 1; i <= 5; i++) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(act + (meta - act) * i / 5)); await espera(60); usado += await cap(i === 5 ? 700 : 100); }
            return usado;
        }
        if (p.mira) {
            const l = await el(p.mira, p.nth); usado += await asegurar(l, p.mira);
            const b = await l.boundingBox(); if (tapa(b)) fallar('El subtítulo tapa: ' + p.mira);
            await page.evaluate((h) => window.__vg.hi(h), await l.elementHandle()); usado += await cap(p.hold ? p.hold * 1000 : 900);
            await page.evaluate(() => window.__vg.hi(null)); return usado;
        }
        if (p.click) { const l = await el(p.click, p.nth); await l.click(); await espera(500); return 0; }
        if (p.select) {
            await page.selectOption(p.select, p.value); await espera(500); return cap((p.hold || 0.5) * 1000);
        }
        if (p.fill) {
            const l = await el(p.fill); await l.focus(); await page.evaluate(() => { const i = document.activeElement; if (i) i.value = ''; });
            for (const ch of p.text) { await page.keyboard.type(ch); await espera(40); usado += await cap(300); }
            return usado;
        }
        if (p.tap) {
            const l = await el(p.tap, p.nth); usado += await asegurar(l, p.tap);
            const b = await l.boundingBox(); if (tapa(b)) fallar('El subtítulo tapa: ' + p.tap);
            const h = await l.elementHandle();
            for (const [est, t] of (rapido ? [['a', 150], ['b', 550], ['c', 150]] : [['a', 200], ['b', 850], ['c', 200]])) { await page.evaluate(([x, e]) => window.__vg.tap(x, e), [h, est]); usado += await cap(t); }
            await page.evaluate(() => window.__vg.tap(null));
            if (p.click !== false) { await l.click(); await espera(550); }
            usado += await cap((p.hold != null ? p.hold : 0.6) * 1000);
            return usado;
        }
        fallar('Paso desconocido: ' + JSON.stringify(p));
    }

    let totalMs = 0; const resumen = [];
    for (const esc of E.escenas) {
        const t0 = totalMs;
        if (esc.tarjeta) {
            await page.evaluate(([a, b, c]) => window.__vg.card(a, b, c), [esc.tarjeta.t1, esc.tarjeta.t2 || '', esc.tarjeta.icono || '']);
            await page.locator('#vg-card img').waitFor({ state: 'visible' }).catch(() => { }); await espera(150);
            if (esc.id === 'titulo') { await page.locator('.ob-next').first().waitFor({ state: 'attached', timeout: 10000 }); }
            await cap(esc.secs * 1000); totalMs += esc.secs * 1000;
            await page.evaluate(() => window.__vg.card(null)); resumen.push([esc.nombre, (totalMs - t0) / 1000, 1]); continue;
        }
        for (const s of esc.subs) {
            subRect = await page.evaluate(([t, a]) => window.__vg.sub(t, a), [s.txt, !!s.arriba]);
            if (s.txt.split(/\s+/).length > 8) fallar('Subtítulo de más de 8 palabras: ' + s.txt);
            const inicio = frames.length; let usado = 0; rapido = s.pasos.filter(p => p.tap).length > 1;
            for (const p of s.pasos) usado += await ejecutar(p);
            const budget = s.secs * 1000;
            if (frames.length === inicio) fallar('Subtítulo sin capturas: ' + s.txt);
            const sobra = budget - usado;
            if (sobra < 250) fallar('Tiempo insuficiente (' + (sobra | 0) + ' ms) en «' + s.txt + '»: bajá los hold o subí secs en escenas.js');
            frames[frames.length - 1].ms += sobra; totalMs += budget;
        }
        await page.evaluate(() => window.__vg.sub(null)); subRect = null;
        resumen.push([esc.nombre, (totalMs - t0) / 1000, esc.subs.length]);
    }
    await revisar();
    if (errores.length) fallar('Errores de JavaScript en la app: ' + errores.join(' | '));
    const extra = externas.filter(x => x.startsWith('BLOQUEADA')); if (extra.length) fallar('Salieron pedidos no previstos: ' + extra.join(' | '));
    await browser.close(); srv.close();

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
