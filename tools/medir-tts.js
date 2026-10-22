#!/usr/bin/env node
// tools/medir-tts.js — pesa los audios del TTS real para dimensionar la caché del service worker (chino-es-tts-v2, TTS_MAX_ENTRIES en sw.js).
//   node tools/medir-tts.js [--n 40] [--voice f] [--speed 1] [--lang zh-CN] [--base https://app-chino-espa-ol.vercel.app/api/tts]
// Toma N líneas al azar de las lecciones de aprendo chino (GRADED_LESSONS), las pide por la MISMA ruta GET cacheable que usa la app
// (fetchTTS: text, lang, voice, speed, cv=2; sin karaoke) y mide:
//   · json = bytes de la respuesta (lo que guarda el service worker: JSON con el audio en base64)
//   · audio = bytes del audio ya decodificado
// y proyecta cuántas entradas caben en distintos topes. Necesita red hacia el servidor de TTS (en el entorno de la nube hay que permitir el dominio).
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
let pw; for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(m); break; } catch (e) { /* siguiente */ } }
if (!pw) { console.error('Falta playwright'); process.exit(2); }
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const N = +arg('n', 40), VOICE = arg('voice', 'f'), SPEED = arg('speed', '1'), LANG = arg('lang', 'zh-CN'), BASE = arg('base', 'https://app-chino-espa-ol.vercel.app/api/tts');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const srv = http.createServer((q, s) => {
    const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+$/, '/index.html'));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { s.writeHead(404); return s.end(); }
    s.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(s);
});
(async () => {
    await new Promise(r => srv.listen(0, r));
    const exe = process.env.CHROMIUM || ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(fs.existsSync);
    const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
    const pg = await b.newPage();
    await pg.goto('http://localhost:' + srv.address().port + '/index.html'); await pg.waitForTimeout(1500);
    const lines = await pg.evaluate(() => { const o = []; GRADED_LESSONS.forEach(l => l.lines.forEach(x => o.push(x.zh))); return o; });
    await b.close(); srv.close();
    const pick = lines.slice().sort(() => Math.random() - 0.5).slice(0, N);
    const sizes = [];
    for (const t of pick) {
        const u = BASE + '?' + new URLSearchParams({ text: t, lang: LANG, voice: VOICE, speed: SPEED, cv: '2' }).toString();
        let res;
        try { res = await fetch(u); } catch (e) { console.error('✗ no hay red hacia ' + BASE + ' (' + (e.cause && e.cause.code || e.message) + '). Permití ese dominio y reintentá.'); process.exit(3); }
        if (!res.ok) { console.error('✗ HTTP ' + res.status + ' en «' + t + '»'); process.exit(3); }
        const txt = await res.text(), j = JSON.parse(txt);
        sizes.push({ chars: Array.from(t).length, json: Buffer.byteLength(txt), audio: Buffer.from(j.audio, 'base64').length });
    }
    const st = (k) => { const a = sizes.map(x => x[k]).sort((x, y) => x - y); return { media: Math.round(a.reduce((s, x) => s + x, 0) / a.length), p50: a[Math.floor(a.length / 2)], p95: a[Math.floor(a.length * 0.95)], max: a[a.length - 1] }; };
    const kb = (v) => (v / 1024).toFixed(1) + ' KB';
    const J = st('json'), A = st('audio');
    console.log('líneas medidas: ' + sizes.length + ' · voz ' + VOICE + ' · ' + SPEED + 'x · ' + LANG + ' · caracteres medios ' + (sizes.reduce((s, x) => s + x.chars, 0) / sizes.length).toFixed(1));
    console.log('audio decodificado: media ' + kb(A.media) + ' · mediana ' + kb(A.p50) + ' · p95 ' + kb(A.p95) + ' · máx ' + kb(A.max));
    console.log('entrada de la caché (JSON): media ' + kb(J.media) + ' · mediana ' + kb(J.p50) + ' · p95 ' + kb(J.p95) + ' · máx ' + kb(J.max));
    [80, 150, 300, 450, 600].forEach(c => console.log('tope ' + String(c).padStart(3) + ' entradas ≈ ' + (c * J.media / 1048576).toFixed(1) + ' MB (≈ ' + (c / 14.5).toFixed(1) + ' lecciones de 14,5 líneas con una voz y una velocidad)'));
})().catch(e => { console.error(e); try { srv.close(); } catch (x) { /* nada */ } process.exit(1); });
