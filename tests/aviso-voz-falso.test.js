// Aviso rojo de voz («Servidor de voz no disponible — estoy usando la voz del sistema»): en el LECTOR solo debe salir cuando de verdad se
// cae a la voz del sistema, no ante un pedido caído que el reintento resuelve. SERVIDOR SIMULADO (page.route sobre /api/tts: sin red real).
// Un contexto nuevo por caso (el tope de 8 min del aviso vive en memoria). Casos:
//   · servidor sano           → suena la voz del servidor, 1 pedido, sin aviso
//   · 503 y luego 200         → sin aviso, suena la voz del servidor (1 «playing»), cero voz del sistema
//   · sin conexión (fetch rechaza) → igual que con HTTP: 2 caídas = aviso; caída y luego 200 = sin aviso
//   · 503 y 503               → aviso y voz del sistema
//   · 429 y 429               → voz del sistema SIN aviso (límite propio del servidor, no una caída)
//   · 502 y luego 429         → aviso (cuenta si CUALQUIERA de los dos intentos fue una caída)
//   · 200 sin audio, dos veces → voz del sistema sin aviso (como siempre: la respuesta llegó)
//   · dos trozos, el 2.º falla mientras suena el 1.º → sin aviso hasta que el 2.º cae a la voz del sistema
//   · guardia: playAudio de Hoy (otro llamador de fetchTTS) con 503 → el aviso sale, como siempre
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sleep = (p, ms) => p.waitForTimeout(ms);

function wavB64(sec) { // WAV de silencio (8 kHz, 8 bit) de `sec` segundos, en base64
    const sr = 8000, len = Math.floor(sr * sec), buf = Buffer.alloc(44 + len, 128);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + len, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(len, 40);
    return buf.toString('base64');
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio, x-tts-fallback, retry-after' };

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // sesión con servidor simulado. `policy({method, text}, k)` → { status, body?, delay? } ; k = nº de pedido (0, 1, …)
    async function session(policy, opts) {
        opts = opts || {};
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); } });
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', e => errs.push(e.message));
        const srv = { reqs: [] };
        const audio = wavB64(opts.audioSec || 0.6);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let text = '';
            if (method === 'GET') text = new URL(req.url()).searchParams.get('text') || '';
            else { try { text = JSON.parse(req.postData() || '{}').text || ''; } catch (e) { /* sin cuerpo */ } }
            const k = srv.reqs.length;
            srv.reqs.push({ method, text });
            const r = policy({ method, text }, k) || { status: 200 };
            if (r.delay) await new Promise(res => setTimeout(res, r.delay));
            if (r.abort) return route.abort('failed'); // sin conexión: el fetch del cliente RECHAZA (no hay estado HTTP)
            const status = r.status || 200;
            const body = status === 200 ? JSON.stringify(r.body || { audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'tts no disponible', codigo: 'sin_audio' });
            const headers = Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' });
            return route.fulfill({ status, headers, body });
        });
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        await p.evaluate(() => {
            const T = window.__S = { speech: [], playing: 0, noticeAtFirstPlaying: null, notif: 0 };
            const nt = window.notifyTtsFallback; window.notifyTtsFallback = function () { T.notif++; return nt.apply(this, arguments); }; // cuenta las veces que se pide el aviso
            speechSynthesis.cancel = function () { };
            speechSynthesis.speak = function (u) { // voz del sistema simulada
                T.speech.push({ text: u.text });
                setTimeout(() => { try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } }, 30);
                setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 200);
            };
            readerAudio.addEventListener('playing', () => { T.playing++; if (T.noticeAtFirstPlaying === null) T.noticeAtFirstPlaying = noticeOn(); });
            window.noticeOn = noticeOn;
            function noticeOn() { const e = document.getElementById('tts-down-notice'); return !!e && getComputedStyle(e).display !== 'none'; }
        });
        return { ctx, p, errs, srv };
    }
    const notice = (p) => p.evaluate(() => window.noticeOn());
    const state = (p) => p.evaluate(() => ({ speech: window.__S.speech.length, playing: window.__S.playing, notif: window.__S.notif, nodos: document.querySelectorAll('#tts-down-notice').length }));
    const TEXT = '你好，我们一起练习汉语。';
    const startReader = (p, text) => p.evaluate((t) => { document.getElementById('reader-input').value = t; toggleReaderPlay(); }, text);
    const waitIdle = (p) => p.waitForFunction(() => readerPlayState === 'idle', null, { timeout: 20000 });
    const noErr = (e) => e.filter(x => !/localStorage/.test(x));

    // ═════════ 0. servidor sano: suena la voz del servidor, un solo pedido, sin aviso ═════════
    {
        const { ctx, p, errs, srv } = await session(() => ({ status: 200 }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(srv.reqs.length === 1 && srv.reqs[0].method === 'GET', 'servidor sano: un solo GET (' + srv.reqs.length + ')');
        ok(S.playing === 1 && S.speech === 0, 'servidor sano: suena la voz del SERVIDOR (1 «playing») y ninguna del sistema (playing ' + S.playing + ', speak ' + S.speech + ')');
        ok((await notice(p)) === false && S.notif === 0, 'servidor sano: SIN aviso rojo (pedidos de aviso: ' + S.notif + ')');
        ok(noErr(errs).length === 0, 'servidor sano: sin errores JS ' + noErr(errs).join('|'));
        await ctx.close();
    }
    // ═════════ 1. 503 y luego 200: el reintento resuelve → sin aviso, suena la voz del servidor ═════════
    {
        const { ctx, p, errs, srv } = await session((r, k) => ({ status: k === 0 ? 503 : 200 }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(srv.reqs.length === 2 && srv.reqs.every(r => r.method === 'GET'), '503 y luego 200: dos GET (el reintento) y ningún POST (' + srv.reqs.map(r => r.method).join(',') + ')');
        ok(S.playing === 1 && S.speech === 0, '503 y luego 200: suena la voz del SERVIDOR (1 «playing») y ninguna del sistema (playing ' + S.playing + ', speak ' + S.speech + ')');
        ok((await notice(p)) === false && S.notif === 0, '503 y luego 200: SIN aviso rojo (pedidos de aviso: ' + S.notif + ')');
        ok(noErr(errs).length === 0, '503 y luego 200: sin errores JS ' + noErr(errs).join('|'));
        await ctx.close();
    }
    // ═════════ 2. dos fallos: de verdad se cae a la voz del sistema → aviso ═════════
    {
        const { ctx, p, srv } = await session(() => ({ status: 503 }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(srv.reqs.length === 2, 'dos fallos: dos pedidos (el original y su reintento) (' + srv.reqs.length + ')');
        ok(S.speech === 1 && S.playing === 0, 'dos fallos: lee con la voz del sistema (speak ' + S.speech + ', playing ' + S.playing + ')');
        ok((await notice(p)) === true && S.notif === 1 && S.nodos === 1, 'dos fallos: SALE el aviso rojo UNA vez (pedidos de aviso ' + S.notif + ', elementos ' + S.nodos + ')');
        await ctx.close();
    }
    // ═════════ 3. 429 y 429: límite propio del servidor → voz del sistema SIN aviso (como siempre) ═════════
    {
        const { ctx, p } = await session(() => ({ status: 429 }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(S.speech === 1 && S.playing === 0, '429 y 429: lee con la voz del sistema (speak ' + S.speech + ')');
        ok((await notice(p)) === false, '429 y 429: SIN aviso (no es una caída)');
        await ctx.close();
    }
    // ═════════ 4. 502 y luego 429: cuenta si CUALQUIERA de los intentos fue una caída ═════════
    {
        const { ctx, p } = await session((r, k) => ({ status: k === 0 ? 502 : 429 }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(S.speech === 1, '502 y luego 429: lee con la voz del sistema');
        ok((await notice(p)) === true, '502 y luego 429: SALE el aviso (el primer intento fue una caída)');
        await ctx.close();
    }
    // ═════════ 5. 200 sin audio, dos veces: la respuesta llegó → voz del sistema sin aviso (como siempre) ═════════
    {
        const { ctx, p } = await session(() => ({ status: 200, body: {} }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(S.speech === 1 && S.playing === 0, '200 sin audio: lee con la voz del sistema');
        ok((await notice(p)) === false, '200 sin audio: SIN aviso (como antes)');
        await ctx.close();
    }
    // ═════════ 6. dos trozos: el 2.º falla (2 intentos) mientras suena el 1.º → el aviso espera a que el 2.º caiga a la voz del sistema ═════════
    {
        const { ctx, p, srv } = await session((r) => ({ status: r.text.indexOf('再见') !== -1 ? 503 : 200 }), { audioSec: 2.5 });
        const LARGO = '我们今天一起学习汉语，练习听力和口语。'.repeat(8) + '再见朋友，明天我们还要继续学习汉语。'.repeat(3);
        await startReader(p, LARGO);
        const chunks = await p.evaluate(() => readerChunks.map(c => c.indexOf('再见') !== -1));
        ok(chunks.length === 2 && chunks[0] === false && chunks[1] === true, 'dos trozos: el texto se parte en 2 y solo el 2.º lleva 再见 (' + JSON.stringify(chunks) + ')');
        await p.waitForFunction(() => window.__S.playing >= 1, null, { timeout: 8000 });
        for (let i = 0; i < 80 && srv.reqs.filter(r => r.text.indexOf('再见') !== -1).length < 2; i++) await sleep(p, 100); // el 2.º trozo ya se pidió (y falló 2 veces) mientras suena el 1.º
        await sleep(p, 300);
        const dur = await p.evaluate(() => ({ speech: window.__S.speech.length, playing: window.__S.playing }));
        ok(srv.reqs.filter(r => r.text.indexOf('再见') !== -1).length === 2, 'dos trozos: el 2.º ya se pidió 2 veces mientras suena el 1.º (' + srv.reqs.length + ' pedidos)');
        ok(dur.speech === 0 && (await notice(p)) === false, 'dos trozos: mientras suena el 1.º NO hay aviso ni voz del sistema todavía');
        await p.waitForFunction(() => window.__S.speech.length >= 1, null, { timeout: 12000 });
        ok((await notice(p)) === true, 'dos trozos: cuando el 2.º cae a la voz del sistema, SALE el aviso');
        await ctx.close();
    }
    // ═════════ 8. sin conexión (el fetch rechaza) dos veces: de verdad se cae a la voz del sistema → aviso UNA vez ═════════
    {
        const { ctx, p, srv } = await session(() => ({ abort: true }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(srv.reqs.length === 2, 'sin conexión: dos pedidos (el original y su reintento) (' + srv.reqs.length + ')');
        ok(S.speech === 1 && S.playing === 0, 'sin conexión: lee con la voz del sistema (speak ' + S.speech + ', playing ' + S.playing + ')');
        ok((await notice(p)) === true && S.notif === 1 && S.nodos === 1, 'sin conexión: SALE el aviso rojo UNA vez (pedidos de aviso ' + S.notif + ', elementos ' + S.nodos + ')');
        await ctx.close();
    }
    // ═════════ 9. sin conexión y luego 200: el reintento resuelve → sin aviso, suena la voz del servidor ═════════
    {
        const { ctx, p, srv } = await session((r, k) => (k === 0 ? { abort: true } : { status: 200 }));
        await startReader(p, TEXT); await waitIdle(p);
        const S = await state(p);
        ok(srv.reqs.length === 2, 'sin conexión y luego 200: dos pedidos (' + srv.reqs.length + ')');
        ok(S.playing === 1 && S.speech === 0, 'sin conexión y luego 200: suena la voz del SERVIDOR (playing ' + S.playing + ', speak ' + S.speech + ')');
        ok((await notice(p)) === false && S.notif === 0, 'sin conexión y luego 200: SIN aviso rojo (pedidos de aviso: ' + S.notif + ')');
        await ctx.close();
    }
    // ═════════ 7. guardia: otro llamador de fetchTTS (playAudio de Hoy) con 503 → el aviso sale, sin cambios ═════════
    {
        const { ctx, p } = await session(() => ({ status: 503 }));
        await p.evaluate(() => { playAudio('zh'); });
        await p.waitForFunction(() => window.__S.speech.length >= 1, null, { timeout: 10000 });
        ok((await notice(p)) === true, 'guardia: playAudio de Hoy con 503 sigue mostrando el aviso (otro llamador, sin cambios)');
        await ctx.close();
    }

    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
