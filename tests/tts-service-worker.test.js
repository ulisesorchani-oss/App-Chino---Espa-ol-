// Service worker REAL (sw.js del repo) frente a un servidor /api/tts simulado y local (sin red):
//   · una respuesta de VOZ ALTERNATIVA (X-TTS-Fallback: 1, Cache-Control: no-store) NUNCA se guarda en chino-es-tts-v2:
//     dos pedidos iguales llegan los dos a la red y la caché queda con 0 claves (por GET y por POST);
//   · contrapartida: una respuesta normal SÍ se guarda: el segundo pedido sale de la caché (1 solo pedido a la red);
//   · el SW decide por Cache-Control: no-store aunque falte el encabezado propio;
//   · una respuesta de error (502) tampoco se guarda.
// El servidor simulado vive en otro puerto (otro origen, con CORS): así la prueba cubre también lo que el SW puede leer entre orígenes.
const http = require('http');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const AUDIO = Buffer.from('ID3' + '\0'.repeat(40)).toString('base64');
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'X-TTS-Audio, X-TTS-Fallback' };

(async () => {
    // ── servidor simulado: el MODO lo decide el texto del pedido ──
    const hits = [];
    const srv = http.createServer((req, res) => {
        const u = new URL(req.url, 'http://x');
        if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
        let cuerpo = '';
        req.on('data', (d) => { cuerpo += d; });
        req.on('end', () => {
            let text = u.searchParams.get('text') || '';
            if (!text) { try { text = JSON.parse(cuerpo || '{}').text || ''; } catch (e) { /* sin cuerpo */ } }
            hits.push({ m: req.method, text });
            const json = (obj, h) => { res.writeHead(obj.__status || 200, Object.assign({ 'content-type': 'application/json' }, CORS, h)); delete obj.__status; res.end(JSON.stringify(obj)); };
            if (/^FALLBACK/.test(text)) return json({ audio: AUDIO, mime: 'audio/mpeg', voice: 'zh-CN-YunjianNeural', speed: 0.85, fallback: true, cached: false }, { 'cache-control': 'no-store', 'x-tts-fallback': '1', 'x-tts-audio': '1' });
            if (/^SOLO-NOSTORE/.test(text)) return json({ audio: AUDIO, mime: 'audio/mpeg', voice: 'x', speed: 0.85, cached: false }, { 'cache-control': 'no-store', 'x-tts-audio': '1' }); // sin el encabezado propio
            if (/^ERROR/.test(text)) return json({ __status: 502, error: 'tts no disponible', codigo: 'sin_audio' }, { 'cache-control': 'no-store' });
            return json({ audio: AUDIO, mime: 'audio/mpeg', voice: 'zh-TW-YunJheNeural', speed: 0.85, cached: false }, { 'cache-control': 'public, max-age=31536000, s-maxage=31536000, immutable', 'x-tts-audio': '1' });
        });
    });
    await new Promise(r => srv.listen(0, '127.0.0.1', r));
    const API = 'http://127.0.0.1:' + srv.address().port + '/api/tts';

    const b = await chromium.launch({ ...LAUNCH });
    const ctx = await b.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'allow' });
    await ctx.addInitScript(() => { try { localStorage.setItem('ac_onboarding_done_v2', '1'); } catch (e) { /* noop */ } });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 30000 }).catch(async () => { await page.reload({ waitUntil: 'load' }); await page.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 30000 }); });
    const sw = await page.evaluate(() => ({ ctrl: !!navigator.serviceWorker.controller, url: navigator.serviceWorker.controller && navigator.serviceWorker.controller.scriptURL }));
    ok(sw.ctrl && /sw\.js/.test(sw.url), 'el service worker real (sw.js) controla la página: ' + sw.url);

    const cacheKeys = () => page.evaluate(async () => { const c = await caches.open('chino-es-tts-v2'); return (await c.keys()).length; });
    await page.evaluate(async () => { await caches.delete('chino-es-tts-v2'); });
    const get = (text) => page.evaluate(async ([api, text]) => { const r = await fetch(api + '?text=' + encodeURIComponent(text) + '&lang=zh-TW&voice=tw-m&speed=0.85&cv=2'); const d = await r.json().catch(() => null); return { status: r.status, fallback: r.headers.get('x-tts-fallback'), audio: r.headers.get('x-tts-audio'), voice: d && d.voice }; }, [API, text]);
    const post = (text) => page.evaluate(async ([api, text]) => { const r = await fetch(api, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, lang: 'zh-TW', voice: 'tw-m', speed: 0.85 }) }); const d = await r.json().catch(() => null); return { status: r.status, voice: d && d.voice }; }, [API, text]);
    const cuenta = (text, m) => hits.filter(h => h.text === text && (!m || h.m === m)).length;

    // ── 1. FALLBACK por GET: los dos pedidos llegan a la red; la caché queda vacía ──
    let r1 = await get('FALLBACK-GET'), r2 = await get('FALLBACK-GET');
    await sleep(700);
    ok(r1.status === 200 && r2.status === 200 && r1.voice === 'zh-CN-YunjianNeural', 'fallback GET: el cliente lo recibe tal cual (200, voz continental)');
    ok(r1.fallback === '1' && r1.audio === '1', 'fallback GET: el encabezado X-TTS-Fallback: 1 y X-TTS-Audio: 1 llegan a la página (CORS expone ambos)');
    ok(cuenta('FALLBACK-GET', 'GET') === 2, 'fallback GET: los DOS pedidos llegaron a la red (' + cuenta('FALLBACK-GET', 'GET') + ')');
    ok(await cacheKeys() === 0, 'fallback GET: chino-es-tts-v2 queda con 0 claves (' + await cacheKeys() + ')');

    // ── 2. FALLBACK por POST ──
    await post('FALLBACK-POST'); await post('FALLBACK-POST'); await sleep(700);
    ok(cuenta('FALLBACK-POST', 'POST') === 2 && await cacheKeys() === 0, 'fallback POST: los dos pedidos llegan a la red y la caché sigue con 0 claves (' + cuenta('FALLBACK-POST', 'POST') + ' pedidos, ' + await cacheKeys() + ' claves)');

    // ── 3. el SW también respeta Cache-Control: no-store (aunque falte el encabezado propio) ──
    await get('SOLO-NOSTORE'); await get('SOLO-NOSTORE'); await sleep(700);
    ok(cuenta('SOLO-NOSTORE') === 2 && await cacheKeys() === 0, 'no-store sin X-TTS-Fallback: tampoco se guarda (' + cuenta('SOLO-NOSTORE') + ' pedidos, ' + await cacheKeys() + ' claves)');

    // ── 4. un 502 tampoco se guarda ──
    const e1 = await get('ERROR-1'); await get('ERROR-1'); await sleep(500);
    ok(e1.status === 502 && cuenta('ERROR-1') === 2 && await cacheKeys() === 0, 'error 502: no se guarda (' + cuenta('ERROR-1') + ' pedidos, ' + await cacheKeys() + ' claves)');

    // ── 5. CONTRAPARTIDA: una respuesta normal SÍ se guarda y el segundo pedido sale de la caché ──
    const n1 = await get('NORMAL-GET'); await sleep(700);
    const n2 = await get('NORMAL-GET'); await sleep(300);
    ok(n1.status === 200 && n2.status === 200 && n2.voice === 'zh-TW-YunJheNeural', 'normal GET: responde con la voz de Taiwán');
    ok(cuenta('NORMAL-GET', 'GET') === 1, 'normal GET: el segundo pedido NO llega a la red, sale de la caché (' + cuenta('NORMAL-GET', 'GET') + ' pedido a la red)');
    ok(await cacheKeys() === 1, 'normal GET: chino-es-tts-v2 guardó 1 clave (' + await cacheKeys() + ')');
    await post('NORMAL-POST'); await sleep(700); await post('NORMAL-POST');
    ok(cuenta('NORMAL-POST', 'POST') === 1 && await cacheKeys() === 2, 'normal POST: también se guarda (' + cuenta('NORMAL-POST', 'POST') + ' pedido a la red, ' + await cacheKeys() + ' claves)');

    // ── 6. una vez guardada la voz de Taiwán, un fallback de la MISMA clave no la pisa ni se sirve en su lugar ──
    hits.length = 0;
    const g = await get('NORMAL-GET');
    ok(g.voice === 'zh-TW-YunJheNeural' && hits.length === 0, 'lo guardado se sigue sirviendo desde la caché sin tocar la red');

    ok(errs.length === 0, 'sin errores JS: ' + errs.join(' | '));
    await b.close(); srv.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails);
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
