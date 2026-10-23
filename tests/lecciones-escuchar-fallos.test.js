// «Escuchar todo» y fetchTTS con un SERVIDOR SIMULADO que falla (page.route sobre /api/tts: sin red real).
// Verifica: precarga de 1 línea, un solo reintento por línea, nada de POST tras un GET que falló, corte de circuito
// (2 líneas seguidas fallidas → voz del sistema con aviso sin «api/tts.py»), la marca de línea que avanza solo con el fin
// real del audio, y la voz del sistema sin karaoke (se resalta la línea, no las palabras).
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
const sleep = (p, ms) => p.waitForTimeout(ms);

// WAV de silencio (8 kHz, 8 bit) de `sec` segundos, en base64
function wavB64(sec) {
    const sr = 8000, len = Math.floor(sr * sec), buf = Buffer.alloc(44 + len, 128);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + len, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(len, 40);
    return buf.toString('base64');
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio' };

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // sesión con servidor simulado. `policy(req, k)` → { status, body?, mark?, delay? } ; k = nº de pedido (0, 1, …)
    async function session(policy, opts) {
        opts = opts || {};
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript((theme) => {
            if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); localStorage.setItem('theme', theme); }
        }, opts.theme || 'light');
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', e => errs.push(e.message));
        const srv = { reqs: [], inflight: 0, maxInflight: 0 };
        const audio = wavB64(opts.audioSec || 0.5);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let text = '';
            if (method === 'GET') text = new URL(req.url()).searchParams.get('text') || '';
            else { try { text = JSON.parse(req.postData() || '{}').text || ''; } catch (e) { /* sin cuerpo */ } }
            const k = srv.reqs.length;
            srv.reqs.push({ method, text, t: Date.now() });
            srv.inflight++; srv.maxInflight = Math.max(srv.maxInflight, srv.inflight);
            const r = policy({ method, text }, k, srv) || { status: 200 };
            if (r.delay) await new Promise(res => setTimeout(res, r.delay));
            srv.inflight--;
            if (r.abort) return route.abort('failed');
            const status = r.status || 200;
            const body = status === 200 ? JSON.stringify(r.body || { audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'tts no disponible', codigo: 'sin_audio' });
            const headers = Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 && r.mark !== false ? { 'x-tts-audio': '1' } : {}, status !== 200 ? { 'cache-control': 'no-store' } : {});
            return route.fulfill({ status, headers, body });
        });
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        await p.evaluate((o) => {
            const T = window.__S = { speech: [], kara: { prepare: 0, withTts: 0, withAudio: 0 }, marks: [], speechMode: o.speechMode || 'ok' };
            const kp = KARA.prepare, kt = KARA.withTts, kw = KARA.withAudio;
            KARA.prepare = function () { T.kara.prepare++; return kp.apply(this, arguments); };
            KARA.withTts = function () { T.kara.withTts++; return kt.apply(this, arguments); };
            KARA.withAudio = function () { T.kara.withAudio++; return kw.apply(this, arguments); };
            // voz del sistema simulada
            speechSynthesis.cancel = function () { };
            speechSynthesis.speak = function (u) {
                T.speech.push({ text: u.text, t: performance.now() });
                if (T.speechMode === 'error') { setTimeout(() => { try { u.onerror && u.onerror({ error: 'synthesis-failed' }); } catch (e) { /* noop */ } }, 20); return; }
                setTimeout(() => { try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } }, 30);
                setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 250);
            };
            // registro de la marca de línea (cuándo gana is-playing cada línea)
            const body = document.getElementById('lq-body');
            new MutationObserver((ms) => {
                ms.forEach((m) => { const el = m.target; if (el.classList && el.classList.contains('lq-line') && el.classList.contains('is-playing') && !(m.oldValue || '').includes('is-playing')) T.marks.push({ i: Number(el.dataset.i), t: performance.now() }); });
            }).observe(body, { subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });
        }, opts);
        await p.evaluate(() => LQ_LISTEN.setIcons(true));
        return { ctx, p, errs, srv };
    }
    async function openLesson(p, id) {
        await p.click('#nav-aprender'); await sleep(p, 250);
        const lvl = await p.evaluate((id) => { const l = GRADED_LESSONS.find(x => x.id === id); return l.exam ? 'tocfl:' + l.examLvl : String(l.hsk); }, id);
        await p.evaluate((lvl) => { const wrap = document.getElementById('lesson-list'); wrap.dataset.level = lvl; const s = document.getElementById(lvl.indexOf('tocfl') === 0 ? 'sel-lv-tocfl' : 'sel-lv-hsk'); if (s) { s.value = lvl; s.dispatchEvent(new Event('change')); } }, lvl);
        await sleep(p, 250);
        await p.click('.lc-read[data-id="' + id + '"]'); await sleep(p, 700);
        if (await p.$('#lq-gloss-continue')) { await p.click('#lq-gloss-continue'); await sleep(p, 300); }
    }
    const lineTexts = (p) => p.evaluate(() => [...document.querySelectorAll('#lq-body .lq-lines .lq-line')].map(el => el.querySelector('.lq-line-say').dataset.zh));
    const waitIdle = (p, ms) => p.waitForFunction(() => LQ_LISTEN.state === 'idle', null, { timeout: ms || 60000 });
    const LESSON = 'h1-primer-dia';

    // ═════════ 1. servidor sano: 1 GET por línea, 0 POST, precarga de 1 ═════════
    {
        const { ctx, p, errs, srv } = await session(() => ({ status: 200, delay: 120 }), { audioSec: 0.6 });
        await openLesson(p, LESSON);
        const texts = await lineTexts(p);
        await p.click('#ll-play');
        await sleep(p, 300);
        ok(srv.reqs.length === 2 && srv.reqs.map(r => r.text).join('|') === texts.slice(0, 2).join('|'), 'sano: al arrancar pide la línea 1 y precarga SOLO la 2 (' + srv.reqs.length + ' pedidos)');
        await waitIdle(p);
        ok(srv.reqs.length === texts.length && srv.reqs.every(r => r.method === 'GET'), 'sano: un GET por línea (' + srv.reqs.length + ' de ' + texts.length + ') y ningún POST');
        ok(srv.maxInflight <= 2, 'sano: nunca más de 2 pedidos a la vez (la que suena + la precarga) — máx ' + srv.maxInflight);
        const S = await p.evaluate(() => ({ speech: window.__S.speech.length, tripped: LQ_LISTEN.stats.tripped, note: !!document.getElementById('ll-note'), banner: getComputedStyle(document.getElementById('tts-down-notice') || document.body).display }));
        ok(S.speech === 0 && S.tripped === 0 && !S.note, 'sano: ninguna línea con voz del sistema, sin corte de circuito ni aviso');
        // la marca avanza en orden, una vez por línea, y cada salto espera el fin del audio (0,6 s)
        const M = await p.evaluate(() => window.__S.marks);
        ok(M.length === texts.length && M.every((m, k) => m.i === k), 'marca: pasa por las ' + texts.length + ' líneas en orden, una vez cada una ' + JSON.stringify(M.map(m => m.i)));
        const gaps = M.slice(1).map((m, k) => m.t - M[k].t);
        ok(gaps.every(g => g >= 550), 'marca: cada línea queda marcada hasta que su audio de 0,6 s termina de verdad (salto mínimo ' + Math.round(Math.min.apply(null, gaps)) + ' ms)');
        ok(errs.length === 0, 'sano sin errores JS: ' + errs.join(' | '));
        await ctx.close();
    }

    // ═════════ 2. servidor caído (502 siempre): 2 líneas → corte de circuito ═════════
    {
        const { ctx, p, errs, srv } = await session(() => ({ status: 502, delay: 60 }));
        await openLesson(p, LESSON);
        const texts = await lineTexts(p);
        await p.click('#ll-play');
        await waitIdle(p);
        const byText = (t) => srv.reqs.filter(r => r.text === t);
        ok(srv.reqs.every(r => r.method === 'GET'), 'caído: JAMÁS un POST después de un GET 502 (texto corto) — ' + srv.reqs.map(r => r.method).join(','));
        ok(byText(texts[0]).length === 2 && byText(texts[1]).length === 2, 'caído: cada línea se pide una vez y se reintenta UNA vez (2 pedidos) — ' + [byText(texts[0]).length, byText(texts[1]).length]);
        ok(srv.reqs.length === 4, 'caído: tras 2 líneas seguidas fallidas no se pide nada más (4 pedidos en total, no ' + srv.reqs.length + ')');
        const S = await p.evaluate(() => ({ speech: window.__S.speech.map(x => x.text), tripped: LQ_LISTEN.stats.tripped, kara: window.__S.kara, banner: document.getElementById('tts-down-notice') ? getComputedStyle(document.getElementById('tts-down-notice')).display : 'none' }));
        ok(S.speech.length === texts.length && S.speech.join('|') === texts.join('|'), 'caído: TODAS las líneas se leen con la voz del sistema, en orden (' + S.speech.length + ' de ' + texts.length + ')');
        ok(S.tripped === 1, 'caído: el circuito se corta una sola vez');
        ok(S.kara.withTts === 0 && S.kara.prepare === 0, 'caído: con la voz del sistema NO se usa el karaoke por palabra (prepare ' + S.kara.prepare + ', withTts ' + S.kara.withTts + ')');
        ok(S.banner === 'none', 'caído: no sale el aviso rojo global (lo reemplaza el de la barra)');
        const M = await p.evaluate(() => window.__S.marks);
        ok(M.length === texts.length && M.every((m, k) => m.i === k), 'caído: la marca recorre todas las líneas en orden ' + JSON.stringify(M.map(m => m.i)));
        ok(errs.length === 0, 'caído sin errores JS: ' + errs.join(' | '));
        await ctx.close();
    }

    // ═════════ 3. aviso del corte: claro, sin «api/tts.py», legible en los tres temas ═════════
    for (const th of ['light', 'dark', 'paper']) {
        const { ctx, p } = await session(() => ({ status: 503, delay: 40 }), { theme: th });
        await openLesson(p, LESSON);
        // frena la voz del sistema simulada para ver la barra con el aviso
        await p.evaluate(() => { speechSynthesis.speak = function (u) { window.__S.speech.push({ text: u.text }); }; });
        await p.click('#ll-play');
        await p.waitForSelector('#ll-note', { timeout: 15000 });
        const N = await p.evaluate(() => {
            const el = document.getElementById('ll-note'), cs = getComputedStyle(el), r = el.getBoundingClientRect();
            const lum = (c) => { const a = c.match(/[\d.]+/g).map(Number).slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
            const L1 = lum(cs.color), L2 = lum(cs.backgroundColor), cr = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
            return { txt: el.textContent, cr, w: r.width, bw: document.getElementById('ll-bar').getBoundingClientRect().width, ovf: document.documentElement.scrollWidth > innerWidth + 1, role: el.getAttribute('role'), btns: document.querySelectorAll('#ll-bar .lq-btn').length };
        });
        ok(/voz del sistema/i.test(N.txt) && /servidor/i.test(N.txt) && !/api\/tts|\.py|vercel/i.test(N.txt), th + ' aviso: dice que el servidor no responde y que sigue con la voz del sistema, sin «api/tts.py» (' + N.txt + ')');
        ok(N.cr >= 4.5 && N.role === 'status' && N.btns === 2 && Math.abs(N.w - N.bw) <= 2 && !N.ovf, th + ' aviso: contraste ' + N.cr.toFixed(1) + ':1, role=status, ancho completo de la barra, sin desborde, los dos botones siguen');
        await p.click('#ll-stop');
        await ctx.close();
    }

    // ═════════ 4. fallos aislados: no cortan el circuito (no son seguidos) ═════════
    {
        // las líneas 2, 4 y 6 fallan (original + reintento); el resto responde bien: nunca hay 2 seguidas
        const fallan = [];
        const s2 = await session((req) => (fallan.includes(req.text) ? { status: 502, delay: 40 } : { status: 200, delay: 40 }), { audioSec: 0.3 });
        await openLesson(s2.p, LESSON);
        const texts = await lineTexts(s2.p);
        fallan.push(texts[1], texts[3], texts[5]);
        await s2.p.click('#ll-play'); await waitIdle(s2.p);
        const S = await s2.p.evaluate(() => ({ speech: window.__S.speech.map(x => x.text), tripped: LQ_LISTEN.stats.tripped, note: !!document.getElementById('ll-note') }));
        ok(S.tripped === 0, 'aislados: tres líneas fallidas NO seguidas no cortan el circuito');
        ok(S.speech.join('|') === [texts[1], texts[3], texts[5]].join('|'), 'aislados: solo esas tres líneas usan la voz del sistema');
        ok(s2.srv.reqs.filter(r => fallan.includes(r.text)).length === 6 && s2.srv.reqs.length === texts.length + 3, 'aislados: cada línea fallida se pide 2 veces (original + 1 reintento) y las demás 1 vez (' + s2.srv.reqs.length + ' pedidos)');
        ok(s2.srv.reqs.every(r => r.method === 'GET'), 'aislados: sin POST');
        ok(s2.errs.length === 0, 'aislados sin errores JS');
        await s2.ctx.close();
    }

    // ═════════ 5. un fallo que se recupera en el reintento ═════════
    {
        const vistos = new Map();
        const { ctx, p, srv } = await session((req) => { const c = (vistos.get(req.text) || 0) + 1; vistos.set(req.text, c); return c === 1 && /./.test(req.text) && vistos.size % 3 === 0 ? { status: 502, delay: 30 } : { status: 200, delay: 30 }; }, { audioSec: 0.3 });
        await openLesson(p, LESSON);
        const texts = await lineTexts(p);
        await p.click('#ll-play'); await waitIdle(p);
        const S = await p.evaluate(() => ({ speech: window.__S.speech.length, tripped: LQ_LISTEN.stats.tripped }));
        const dobles = [...vistos.values()].filter(v => v === 2).length;
        ok(S.speech === 0 && S.tripped === 0 && dobles > 0 && srv.reqs.length === texts.length + dobles && srv.reqs.every(r => r.method === 'GET'), 'reintento: un 502 que se arregla al reintentar suena con el audio del servidor (sin voz del sistema), ' + dobles + ' línea(s) pedidas 2 veces, 0 POST');
        await ctx.close();
    }

    // ═════════ 6. 429 (límite): sin POST, sin reintento, cuenta como fallo de esa línea ═════════
    {
        const { ctx, p, srv } = await session((req, k) => (k === 2 ? { status: 429, delay: 20 } : { status: 200, delay: 20 }), { audioSec: 0.3 });
        await openLesson(p, LESSON);
        const texts = await lineTexts(p);
        await p.click('#ll-play'); await waitIdle(p);
        ok(srv.reqs.every(r => r.method === 'GET') && srv.reqs.length === texts.length, '429: sin POST ni reintento (' + srv.reqs.length + ' pedidos para ' + texts.length + ' líneas)');
        await ctx.close();
    }

    // ═════════ 7. la marca no corre cuando el audio falla ni cuando la voz del sistema no habla ═════════
    {
        // el servidor responde 200 con bytes que NO son audio: el <audio> da error → esa línea se lee con la voz del sistema
        const basura = { audio: Buffer.from('esto no es audio').toString('base64'), mime: 'audio/wav', voice: 'x', speed: 1, cached: false };
        let k0 = null;
        const { ctx, p, errs } = await session((req) => { if (k0 === null) k0 = req.text; return req.text === k0 ? { status: 200, body: basura } : { status: 200 }; }, { audioSec: 0.7 });
        await openLesson(p, LESSON);
        const texts = await lineTexts(p);
        await p.click('#ll-play');
        await p.waitForFunction(() => window.__S.marks.length >= 3, null, { timeout: 20000 });
        await p.click('#ll-stop');
        const R = await p.evaluate(() => ({ speech: window.__S.speech.map(x => x.text), marks: window.__S.marks }));
        ok(R.speech[0] === texts[0], 'audio con error: la línea cuyo <audio> falla se lee con la voz del sistema (no se salta)');
        ok(R.marks[0].i === 0 && R.marks[1].i === 1 && R.marks[1].t - R.marks[0].t >= 200, 'audio con error: la marca espera a que la voz del sistema termine antes de pasar a la siguiente (' + Math.round(R.marks[1].t - R.marks[0].t) + ' ms)');
        ok(errs.length === 0, 'audio con error sin errores JS: ' + errs.join(' | '));
        await ctx.close();
    }
    {
        const { ctx, p } = await session(() => ({ status: 502, delay: 20 }), { speechMode: 'error' });
        await openLesson(p, LESSON);
        await p.click('#ll-play');
        await p.waitForFunction(() => window.__S.marks.length >= 3, null, { timeout: 30000 });
        await p.click('#ll-stop');
        const M = await p.evaluate(() => window.__S.marks);
        const gaps = [M[1].t - M[0].t, M[2].t - M[1].t];
        ok(gaps.every(g => g >= 1100), 'voz del sistema que falla sin hablar: la marca no se dispara, queda el tiempo estimado de lectura (≥ 1,2 s) en cada línea (' + gaps.map(Math.round) + ' ms)');
        await ctx.close();
    }

    // ═════════ 8. fetchTTS directo: GET → POST solo cuando corresponde ═════════
    const body = (text) => ({ text, lang: 'zh-CN', voice: 'f', speed: 1 });
    const probe = async (policy, text) => {
        const { ctx, p, srv } = await session(policy);
        const R = await p.evaluate(async (b) => {
            try { const r = await fetchTTS(b, 8000); return { status: r.status, ok: r.ok, banner: !!document.getElementById('tts-down-notice') && getComputedStyle(document.getElementById('tts-down-notice')).display !== 'none' }; }
            catch (e) { return { error: String(e && e.message || e), banner: !!document.getElementById('tts-down-notice') && getComputedStyle(document.getElementById('tts-down-notice')).display !== 'none' }; }
        }, body(text));
        const out = { R, methods: srv.reqs.map(r => r.method).join(','), ui: await p.evaluate(() => [uiT('ttsDown')]) };
        await ctx.close();
        return out;
    };
    {
        let o = await probe(() => ({ status: 200 }), '你好');
        ok(o.R.ok && o.methods === 'GET', 'fetchTTS: GET 200 con la marca → listo, sin POST (' + o.methods + ')');
        o = await probe(() => ({ status: 502 }), '你好');
        ok(o.R.status === 502 && o.methods === 'GET', 'fetchTTS: GET 502 → se devuelve el 502 y NO hay POST (' + o.methods + ')');
        ok(o.R.banner === true && !/api\/tts|\.py/.test(o.ui[0]) && /voz del sistema/.test(o.ui[0]), 'fetchTTS: con el 502 sale el aviso rojo global, sin «api/tts.py»: ' + o.ui[0]);
        for (const st of [403, 500, 503, 504]) { o = await probe(() => ({ status: st }), '你好'); ok(o.R.status === st && o.methods === 'GET', 'fetchTTS: GET ' + st + ' → sin POST (' + o.methods + ')'); }
        o = await probe(() => ({ status: 429 }), '你好');
        ok(o.R.status === 429 && o.methods === 'GET' && o.R.banner === false, 'fetchTTS: GET 429 → sin POST y sin aviso rojo (es un límite, no una caída)');
        o = await probe(() => ({ abort: true }), '你好');
        ok(o.R.error && o.methods === 'GET', 'fetchTTS: error de red en el GET → se rechaza y NO se duplica por POST (' + o.methods + ')');
        o = await probe((req) => (req.method === 'GET' ? { status: 200, mark: false } : { status: 200 }), '你好');
        ok(o.R.ok && o.methods === 'GET,POST', 'fetchTTS: GET 200 SIN la marca (server viejo, "tell") → cae al POST de siempre (' + o.methods + ')');
        for (const st of [404, 405, 501]) { o = await probe((req) => (req.method === 'GET' ? { status: st } : { status: 200 }), '你好'); ok(o.R.ok && o.methods === 'GET,POST', 'fetchTTS: GET ' + st + ' (server sin GET) → POST (' + o.methods + ')'); }
        o = await probe(() => ({ status: 200 }), '你'.repeat(161));
        ok(o.R.ok && o.methods === 'POST', 'fetchTTS: texto de más de 160 caracteres → solo POST, sin GET (' + o.methods + ')');
        o = await probe(() => ({ status: 502 }), '你'.repeat(161));
        ok(o.R.status === 502 && o.methods === 'POST', 'fetchTTS: texto largo con 502 → un solo POST (' + o.methods + ')');
    }
    {
        // silent: el aviso global no sale
        const { ctx, p } = await session(() => ({ status: 502 }));
        const banner = await p.evaluate(async (b) => { await fetchTTS(b, 8000, { silent: true }); const el = document.getElementById('tts-down-notice'); return !!el && getComputedStyle(el).display !== 'none'; }, body('你好'));
        ok(banner === false, 'fetchTTS con { silent: true }: el 502 no dispara el aviso rojo global');
        const src = await p.evaluate(() => fetch('app.js').then(r => r.text()));
        const lineas = src.split('\n').filter(l => /^\s*ttsDown:/.test(l));
        ok(lineas.length === 2 && lineas.every(l => !/api\/tts|\.py|Vercel/.test(l)), 'textos de la interfaz (es y zh): el aviso rojo de voz no menciona api/tts.py ni Vercel (' + lineas.length + ' textos)');
        await ctx.close();
    }

    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails);
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
