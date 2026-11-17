// Muestra de voz (botones 🇨🇳👩 / 🇦🇷👩 de Hoy y Ajustes → cycleVoice → playVoiceSample, audio-tts.js): al cambiar de voz suena una frase corta para escucharla.
// Si el servidor de voz falla, la muestra tiene que CAER A LA VOZ DEL SISTEMA (con la voz acorde a la elegida) y el aviso rojo «Servidor de voz no disponible» solo
// sale si de verdad se cae a la voz del sistema por una caída del servidor (misma regla que el Lector, #131): 413/429 (límites propios) y un 200 sin audio caen a la voz
// del sistema SIN aviso. SERVIDOR SIMULADO (page.route sobre /api/tts: sin red real); la voz del sistema también es simulada. Un contexto nuevo por caso.
//   · servidor sano            → suena la voz del SERVIDOR (1 «playing»), 1 pedido, sin voz del sistema, sin aviso
//   · 503 / 502 / caída de red → voz del sistema con el texto de la muestra y una voz acorde; aviso UNA vez; el botón sigue habilitado y el siguiente toque vuelve a andar
//   · 429 y 413                → voz del sistema SIN aviso (no es una caída)
//   · 200 sin audio            → voz del sistema SIN aviso (la respuesta llegó)
//   · español                  → idem con es-*
//   · toques rápidos           → una sola voz del sistema a la vez (cancel antes de cada speak) y el botón no queda trabado
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

    // sesión con servidor simulado. `policy({method, text}, k)` → { status, body?, abort? } ; k = nº de pedido (0, 1, …)
    async function session(policy) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); } });
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', e => errs.push(e.message));
        const srv = { reqs: [] };
        const audio = wavB64(0.4);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let text = '';
            if (method === 'GET') text = new URL(req.url()).searchParams.get('text') || '';
            else { try { text = JSON.parse(req.postData() || '{}').text || ''; } catch (e) { /* sin cuerpo */ } }
            const k = srv.reqs.length;
            srv.reqs.push({ method, text });
            const r = policy({ method, text }, k) || { status: 200 };
            if (r.abort) return route.abort('failed'); // sin conexión: el fetch del cliente RECHAZA (no hay estado HTTP)
            const status = r.status || 200;
            const body = status === 200 ? JSON.stringify(r.body || { audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'tts no disponible', codigo: 'sin_audio' });
            const headers = Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' });
            return route.fulfill({ status, headers, body });
        });
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        await p.evaluate(() => {
            const T = window.__S = { speech: [], cancels: 0, playing: 0, notif: 0 };
            const nt = window.notifyTtsFallback; window.notifyTtsFallback = function () { T.notif++; return nt.apply(this, arguments); }; // cuenta las veces que se pide el aviso
            const VOCES = [{ lang: 'zh-CN', name: 'zh-A' }, { lang: 'zh-CN', name: 'zh-B' }, { lang: 'zh-TW', name: 'tw-A' }, { lang: 'zh-TW', name: 'tw-B' }, { lang: 'es-ES', name: 'es-A' }, { lang: 'es-ES', name: 'es-B' }, { lang: 'es-AR', name: 'ar-A' }, { lang: 'es-AR', name: 'ar-B' }];
            window.SpeechSynthesisUtterance = function (t) { this.text = t; this.lang = ''; this.rate = 1; this.voice = null; }; // simulado: el real lanza TypeError con una voz que no es una SpeechSynthesisVoice
            window.__sinVoces = false;
            speechSynthesis.getVoices = function () { return window.__sinVoces ? [] : VOCES; };
            speechSynthesis.cancel = function () { T.cancels++; };
            speechSynthesis.speak = function (u) { // voz del sistema simulada
                T.speech.push({ text: u.text, lang: u.lang, rate: u.rate, voice: u.voice ? u.voice.name : null });
                setTimeout(() => { try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } }, 20);
                setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 120);
            };
            const play0 = HTMLMediaElement.prototype.play; // el <audio> de la muestra no es global: se cuenta por prototipo (solo audios con blob:)
            HTMLMediaElement.prototype.play = function () { if (String(this.src).slice(0, 5) === 'blob:') { this.addEventListener('playing', () => { T.playing++; }, { once: true }); } return play0.apply(this, arguments); };
            window.noticeOn = () => { const e = document.getElementById('tts-down-notice'); return !!e && getComputedStyle(e).display !== 'none'; };
        });
        return { ctx, p, errs, srv };
    }
    const tap = (p, id) => p.evaluate((i) => document.getElementById(i).click(), id);
    const S = (p) => p.evaluate(() => ({ speech: window.__S.speech.slice(), cancels: window.__S.cancels, playing: window.__S.playing, notif: window.__S.notif, aviso: window.noticeOn(), nodos: document.querySelectorAll('#tts-down-notice').length }));
    const btnOk = (p, id) => p.evaluate((i) => { const e = document.getElementById(i); return !!e && !e.disabled; }, id);
    const noErr = (e) => e.filter(x => !/localStorage/.test(x));
    const ZH = '你好！我们一起练习吧。', ES = '¡Hola! Vamos a practicar juntos.';

    // ═════════ 0. servidor sano: suena la voz del servidor, un pedido, sin voz del sistema ni aviso ═════════
    {
        const { ctx, p, errs, srv } = await session(() => ({ status: 200 }));
        await tap(p, 'btn-voice-zh'); await sleep(p, 900);
        const s = await S(p);
        ok(srv.reqs.length === 1 && srv.reqs[0].method === 'GET' && srv.reqs[0].text === ZH, 'sano: un solo GET con la frase de la muestra (' + srv.reqs.map(r => r.method).join(',') + ')');
        ok(s.playing === 1 && s.speech.length === 0, 'sano: suena la voz del SERVIDOR (1 «playing») y ninguna del sistema (playing ' + s.playing + ', speak ' + s.speech.length + ')');
        ok(!s.aviso && s.notif === 0, 'sano: SIN aviso rojo (pedidos de aviso: ' + s.notif + ')');
        ok(noErr(errs).length === 0, 'sano: sin errores JS ' + noErr(errs).join('|'));
        await ctx.close();
    }
    // ═════════ 1. el servidor falla (503, 502, red caída): la muestra cae a la voz del sistema y el aviso sale UNA vez ═════════
    for (const [nombre, pol] of [['503', () => ({ status: 503 })], ['502', () => ({ status: 502 })], ['red caída', () => ({ abort: true })]]) {
        const { ctx, p, errs, srv } = await session(pol);
        await tap(p, 'btn-voice-zh'); await sleep(p, 900);
        const s = await S(p);
        ok(s.speech.length === 1 && s.speech[0].text === ZH && /^zh/.test(s.speech[0].lang) && s.speech[0].voice, nombre + ': la muestra cae a la VOZ DEL SISTEMA con su texto, en chino y con una voz acorde ' + JSON.stringify(s.speech));
        ok(s.playing === 0, nombre + ': no suena nada del servidor (playing ' + s.playing + ')');
        ok(s.aviso && s.notif === 1 && s.nodos === 1, nombre + ': el aviso rojo sale UNA vez porque de verdad se cae (pedidos de aviso ' + s.notif + ', elementos ' + s.nodos + ')');
        ok(srv.reqs.every(r => r.method === 'GET'), nombre + ': sin POST de más (' + srv.reqs.map(r => r.method).join(',') + ')');
        ok(await btnOk(p, 'btn-voice-zh'), nombre + ': el botón de voz sigue habilitado');
        // el botón NO queda trabado: el siguiente toque vuelve a cambiar de voz y a probarla
        const antes = await p.evaluate(() => document.getElementById('btn-voice-zh').textContent);
        await tap(p, 'btn-voice-zh'); await sleep(p, 900);
        const despues = await p.evaluate(() => document.getElementById('btn-voice-zh').textContent);
        const s2 = await S(p);
        ok(antes !== despues && s2.speech.length === 2 && await btnOk(p, 'btn-voice-zh'), nombre + ': un segundo toque cambia de voz (' + antes + ' → ' + despues + ') y vuelve a sonar con la voz del sistema (speak ' + s2.speech.length + ')');
        ok(noErr(errs).length === 0, nombre + ': sin errores JS ' + noErr(errs).join('|'));
        await ctx.close();
    }
    // ═════════ 2. límites propios (429, 413) y 200 sin audio: voz del sistema SIN aviso ═════════
    for (const [nombre, pol] of [['429', () => ({ status: 429 })], ['413', () => ({ status: 413 })], ['200 sin audio', () => ({ status: 200, body: { mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1 } })]]) {
        const { ctx, p } = await session(pol);
        await tap(p, 'btn-voice-zh'); await sleep(p, 900);
        const s = await S(p);
        ok(s.speech.length === 1 && s.speech[0].text === ZH, nombre + ': la muestra cae a la voz del sistema (speak ' + s.speech.length + ')');
        ok(!s.aviso && s.notif === 0, nombre + ': SIN aviso (no es una caída del servidor; pedidos de aviso ' + s.notif + ')');
        ok(await btnOk(p, 'btn-voice-zh'), nombre + ': el botón de voz sigue habilitado');
        await ctx.close();
    }
    // ═════════ 3. español: la muestra en español con una voz es-* y el aviso al caerse ═════════
    {
        const { ctx, p } = await session(() => ({ status: 503 }));
        await tap(p, 'btn-voice-es'); await sleep(p, 900);
        const s = await S(p);
        ok(s.speech.length === 1 && s.speech[0].text === ES && /^es/.test(s.speech[0].lang) && s.speech[0].voice, 'español 503: voz del sistema con la muestra en español y una voz es-* ' + JSON.stringify(s.speech));
        ok(s.aviso && s.notif === 1, 'español 503: el aviso sale una vez (pedidos de aviso ' + s.notif + ')');
        ok(await btnOk(p, 'btn-voice-es'), 'español 503: el botón de voz sigue habilitado');
        await ctx.close();
    }
    // ═════════ 3b. sin voces del sistema instaladas: la muestra igual se pide a la voz del sistema (sin voz elegida) y el aviso sale ═════════
    {
        const { ctx, p, errs } = await session(() => ({ status: 503 }));
        await p.evaluate(() => { window.__sinVoces = true; });
        await tap(p, 'btn-voice-zh'); await sleep(p, 900);
        const s = await S(p);
        ok(s.speech.length === 1 && s.speech[0].text === ZH && s.speech[0].voice === null, 'sin voces del sistema: igual habla la muestra, con la voz por defecto del sistema ' + JSON.stringify(s.speech));
        ok(s.aviso && s.notif === 1 && await btnOk(p, 'btn-voice-zh') && noErr(errs).length === 0, 'sin voces del sistema: aviso una vez, botón habilitado y sin errores JS');
        await ctx.close();
    }
    // ═════════ 4. toques rápidos con el servidor caído: una sola voz a la vez, el botón no se traba ═════════
    {
        const { ctx, p, errs } = await session(() => ({ status: 503 }));
        await p.evaluate(() => { const b = document.getElementById('btn-voice-zh'); b.click(); b.click(); b.click(); });
        await sleep(p, 1200);
        const s = await S(p);
        const esperada = await p.evaluate(() => { const v = sysVoiceFor(ttsLangFor('zh', voiceZh), voiceZh); return v ? v.name : null; }); // la voz del sistema acorde a la ÚLTIMA elección
        ok(s.speech.length === 1 && s.speech[0].text === ZH && s.speech[0].voice === esperada && s.cancels >= 1, 'toques rápidos: solo el último toque cae a la voz del sistema, con la voz de la última elección (speak ' + s.speech.length + ', voz ' + (s.speech[0] && s.speech[0].voice) + ' = ' + esperada + ', cancel ' + s.cancels + ')');
        ok(s.aviso && s.nodos === 1, 'toques rápidos: el aviso rojo se ve UNA vez (un solo elemento; notifyTtsFallback ya se limita a un aviso cada 8 min; llamadas ' + s.notif + ')');
        ok(await btnOk(p, 'btn-voice-zh'), 'toques rápidos: el botón de voz no queda trabado');
        ok(noErr(errs).length === 0, 'toques rápidos: sin errores JS ' + noErr(errs).join('|'));
        await ctx.close();
    }
    // ═════════ 5. guardia: otro llamador de fetchTTS (🔊 de la tarjeta de Hoy) con 503 → el aviso sale, como siempre ═════════
    {
        const { ctx, p } = await session(() => ({ status: 503 }));
        await p.evaluate(() => { try { playAudio('你好', 'zh-CN', null); } catch (e) { /* noop */ } });
        await sleep(p, 900);
        const s = await S(p);
        ok(s.aviso && s.notif === 1, 'guardia: playAudio de Hoy con 503 sigue mostrando el aviso (pedidos de aviso ' + s.notif + ')');
        await ctx.close();
    }
    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch(e => { console.error('FALLO:', e); process.exit(1); });
