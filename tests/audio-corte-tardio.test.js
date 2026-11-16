// Corte tardío del audio global (R1): stopGlobalAudio() tiene que invalidar un playAudio EN VUELO. Antes solo pausaba si ya había un
// src, así que la respuesta que llegaba después arrancaba el audio igual («audio sonando tras cerrar»).
// SERVIDOR SIMULADO con compuerta (page.route sobre /api/tts: la respuesta se libera cuando la prueba lo decide, sin esperas fijas).
//   a1) pedido en vuelo + corte + respuesta  → CERO «playing» del reproductor global
//   a2) pedido en vuelo + corte + respuesta 503 → CERO voz del sistema (el pedido invalidado tampoco cae al respaldo)
//   b)  corte y luego un 🔊 nuevo (playAudio) → suena
//   c)  dos toques rápidos al mismo 🔊 → un solo pedido y un solo «playing»; dos botones distintos → suena solo el último
//   d)  cada llamador sigue sonando tras un corte anterior: Hoy, Lector, Podcast, práctica tipo examen, lecciones (🔊 por línea y «Escuchar todo»)
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sleep = (p, ms) => p.waitForTimeout(ms);

function wavB64(sec) { // WAV de silencio (8 kHz, 8 bit), en base64
    const sr = 8000, len = Math.floor(sr * sec), buf = Buffer.alloc(44 + len, 128);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + len, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(len, 40);
    return buf.toString('base64');
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio, x-tts-fallback, retry-after' };

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // sesión con servidor simulado. `policy(req, k)` → { status, hold, delay } ; hold = espera la compuerta (srv.release())
    async function session(policy, opts) {
        opts = opts || {};
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => {
            if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); }
            // registra cada «playing» de CUALQUIER <audio> (aunque no esté en el DOM), con su dueño
            const T = window.__T = { playing: [], speak: 0 };
            const orig = HTMLMediaElement.prototype.play;
            HTMLMediaElement.prototype.play = function () {
                if (!this.__hv) {
                    this.__hv = 1;
                    this.addEventListener('playing', () => {
                        const g = (typeof globalAudioPlayer !== 'undefined' && this === globalAudioPlayer) ? 'global' : (typeof readerAudio !== 'undefined' && this === readerAudio) ? 'lector' : 'otro';
                        T.playing.push(g);
                    });
                }
                return orig.apply(this, arguments);
            };
        });
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        const srv = { reqs: [], release: null, gate: null };
        srv.gate = new Promise((res) => { srv.release = res; });
        const audio = wavB64(opts.audioSec || 1.5);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            const k = srv.reqs.length; srv.reqs.push({ method });
            const r = policy({ method }, k) || { status: 200 };
            if (r.hold) await srv.gate;
            if (r.delay) await new Promise((res) => setTimeout(res, r.delay));
            const status = r.status || 200;
            const body = status === 200 ? JSON.stringify({ audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'tts no disponible', codigo: 'sin_audio' });
            const headers = Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' });
            return route.fulfill({ status, headers, body });
        });
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        await p.evaluate(() => {
            speechSynthesis.cancel = function () { };
            speechSynthesis.speak = function (u) { window.__T.speak++; setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 50); };
            showView('hoy');
        });
        await sleep(p, 300);
        return { ctx, p, errs, srv };
    }
    const T = (p) => p.evaluate(() => ({ playing: window.__T.playing.slice(), speak: window.__T.speak }));
    const cuenta = (t, quien) => t.playing.filter((x) => x === quien).length;
    const boton = (p, id) => p.evaluate((id) => { const e = document.getElementById(id); return { texto: e.innerText.trim(), disabled: e.disabled }; }, id);
    const esperaPedidos = async (p, srv, k) => { for (let i = 0; i < 100 && srv.reqs.length < k; i++) await sleep(p, 30); return srv.reqs.length >= k; };
    const noErr = (e) => e.filter((x) => !/localStorage/.test(x));
    // corta un 🔊 de Hoy en vuelo: pedido retenido → stopGlobalAudio() → se libera la respuesta (y se espera a que llegue)
    async function cortarEnVuelo(p, srv) {
        await p.evaluate(() => { const b = document.getElementById('btn-play-cn'); b.focus(); b.click(); });
        await esperaPedidos(p, srv, 1);
        await p.evaluate(() => stopGlobalAudio());
        const llego = p.waitForResponse((r) => /\/api\/tts/.test(r.url()), { timeout: 8000 }).catch(() => null);
        srv.release(); await llego; await sleep(p, 400);
    }
    const hold1 = (r, k) => ({ status: 200, hold: k === 0 }); // solo el 1.er pedido espera la compuerta

    // ═════════ a1. pedido en vuelo + corte + respuesta ═════════
    {
        const { ctx, p, errs, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        const t = await T(p);
        const est = await p.evaluate(() => ({ src: !!globalAudioPlayer.getAttribute('src'), pausado: globalAudioPlayer.paused, isPlaying }));
        ok(srv.reqs.length === 1, 'a1: hubo 1 pedido (el que se cortó) (' + srv.reqs.length + ')');
        ok(cuenta(t, 'global') === 0, 'a1: CERO «playing» del reproductor global tras el corte (' + cuenta(t, 'global') + ')');
        ok(est.pausado && est.isPlaying === false, 'a1: el reproductor global queda quieto (pausado ' + est.pausado + ', isPlaying ' + est.isPlaying + ')');
        ok(noErr(errs).length === 0, 'a1: sin errores JS ' + noErr(errs).join('|'));
        await ctx.close();
    }
    // ═════════ a2. pedido en vuelo + corte + respuesta 503: tampoco cae a la voz del sistema ═════════
    {
        const { ctx, p, srv } = await session((r, k) => ({ status: 503, hold: k === 0 }));
        await cortarEnVuelo(p, srv);
        const t = await T(p);
        ok(t.speak === 0 && cuenta(t, 'global') === 0, 'a2: con 503 tras el corte NO habla la voz del sistema ni suena nada (speak ' + t.speak + ')');
        await ctx.close();
    }
    // ═════════ b. corte y luego un 🔊 nuevo: suena ═════════
    {
        const { ctx, p, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        await p.evaluate(() => { playAudio('cn'); }); // por playAudio: sin la restauración del botón en el corte (otro commit), el 🔊 queda deshabilitado
        await p.waitForFunction(() => window.__T.playing.length >= 1, null, { timeout: 8000 });
        const t = await T(p);
        ok(cuenta(t, 'global') === 1 && srv.reqs.length === 2, 'b: tras el corte, un 🔊 nuevo (playAudio) SUENA (1 «playing», 2 pedidos en total) (' + cuenta(t, 'global') + ', ' + srv.reqs.length + ')');
        await ctx.close();
    }
    // ═════════ c. dos toques rápidos ═════════
    {
        const { ctx, p, srv } = await session(() => ({ status: 200, delay: 200 }));
        await p.evaluate(() => { const b = document.getElementById('btn-play-cn'); b.focus(); b.click(); b.click(); }); // el 2.º toque cae en un botón deshabilitado
        await p.waitForFunction(() => window.__T.playing.length >= 1, null, { timeout: 8000 }); await sleep(p, 500);
        const t = await T(p);
        ok(srv.reqs.length === 1 && cuenta(t, 'global') === 1, 'c: dos toques rápidos al MISMO 🔊 → 1 pedido y 1 «playing» (' + srv.reqs.length + ', ' + cuenta(t, 'global') + ')');
        await ctx.close();
    }
    {
        const { ctx, p, srv } = await session(() => ({ status: 200, delay: 300 }));
        await p.evaluate(() => { const a = document.getElementById('btn-play-cn'), c = document.getElementById('btn-listen'); a.focus(); playAudio('cn'); c.focus(); playAudio('cn'); });
        await p.waitForFunction(() => window.__T.playing.length >= 1, null, { timeout: 8000 }); await sleep(p, 600);
        const t = await T(p), ba = await boton(p, 'btn-play-cn');
        ok(srv.reqs.length === 2 && cuenta(t, 'global') === 1, 'c: dos botones distintos seguidos → 2 pedidos pero suena UNO solo, el último (' + srv.reqs.length + ' pedidos, ' + cuenta(t, 'global') + ' «playing»)');
        ok(ba.disabled === false && ba.texto === '🔊 CN', 'c: el primer botón queda restaurado (' + JSON.stringify(ba) + ')');
        await ctx.close();
    }
    // ═════════ d. cada llamador sigue sonando tras un corte anterior ═════════
    const abrirLeccion = async (p, id) => {
        await p.click('#nav-aprender'); await sleep(p, 250);
        await p.evaluate((id) => { const l = GRADED_LESSONS.find((x) => x.id === id); const lvl = l.exam ? 'tocfl:' + l.examLvl : String(l.hsk); const wrap = document.getElementById('lesson-list'); wrap.dataset.level = lvl; const s = document.getElementById(lvl.indexOf('tocfl') === 0 ? 'sel-lv-tocfl' : 'sel-lv-hsk'); if (s) { s.value = lvl; s.dispatchEvent(new Event('change', { bubbles: true })); } }, id);
        await sleep(p, 250);
        await p.click('.lc-read[data-id="' + id + '"]'); await sleep(p, 700);
        if (await p.$('#lq-gloss-continue')) { await p.click('#lq-gloss-continue'); await sleep(p, 300); }
    };
    const sonoOtro = (p, desde) => p.waitForFunction((d) => window.__T.playing.slice(d).some((x) => x !== 'global'), desde, { timeout: 12000 }).then(() => true).catch(() => false);
    {   // Lector
        const { ctx, p, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        await p.evaluate(() => { document.getElementById('reader-input').value = '你好，我们一起练习汉语。'; toggleReaderPlay(); });
        await p.waitForFunction(() => window.__T.playing.includes('lector'), null, { timeout: 12000 }).catch(() => { });
        const t = await T(p);
        ok(cuenta(t, 'lector') >= 1 && cuenta(t, 'global') === 0, 'd: el LECTOR suena tras un corte anterior (lector ' + cuenta(t, 'lector') + ', global ' + cuenta(t, 'global') + ')');
        await ctx.close();
    }
    {   // Podcast
        const { ctx, p, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        await p.evaluate(() => showView('entrenar')); await sleep(p, 250);
        await p.click('#btn-podcast'); await sleep(p, 500);
        const antes = (await T(p)).playing.length;
        await p.click('.pd-item >> nth=0');          // abrir un episodio puede arrancar solo (manos libres): se espera antes de tocar ▶️
        let sono = await p.waitForFunction((d) => window.__T.playing.slice(d).some((x) => x !== 'global'), antes, { timeout: 4000 }).then(() => true).catch(() => false);
        if (!sono) { await p.click('#pd-playpause'); sono = await sonoOtro(p, antes); }
        ok(sono, 'd: el PODCAST suena tras un corte anterior');
        await ctx.close();
    }
    {   // Práctica tipo examen
        const { ctx, p, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        await p.evaluate(() => showView('entrenar')); await sleep(p, 250);
        await p.click('#btn-exam-practice'); await sleep(p, 400);
        await p.click('.ex-lv[data-k="HSK1"]'); await sleep(p, 600);
        const hay = await p.$('#ex-play');
        const antes = (await T(p)).playing.length;
        if (hay) await p.click('#ex-play');
        const sono = hay ? await sonoOtro(p, antes) : false;
        ok(!!hay && sono, 'd: la PRÁCTICA tipo examen suena tras un corte anterior (🔊 presente: ' + !!hay + ')');
        await ctx.close();
    }
    {   // Lecciones: 🔊 por línea
        const { ctx, p, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        await abrirLeccion(p, 'h1-primer-dia');
        const antes = (await T(p)).playing.length;
        await p.click('#lq-body .lq-line-say >> nth=0');
        ok(await sonoOtro(p, antes), 'd: las LECCIONES (🔊 por línea) suenan tras un corte anterior');
        await ctx.close();
    }
    {   // Lecciones: «Escuchar todo»
        const { ctx, p, srv } = await session(hold1);
        await cortarEnVuelo(p, srv);
        await abrirLeccion(p, 'h1-primer-dia');
        const antes = (await T(p)).playing.length;
        await p.click('#ll-play');
        ok(await sonoOtro(p, antes), 'd: «Escuchar todo» suena tras un corte anterior');
        await ctx.close();
    }

    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
