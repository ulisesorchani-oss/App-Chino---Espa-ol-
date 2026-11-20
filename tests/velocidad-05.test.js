// Velocidad 0.5 (pedido de alumnos). Valores LITERALES, no «regenerable»:
//   · ciclo del botón (Ajustes y Hoy): 1 → 0.85 → 0.7 → 0.5 → 1, con el texto exacto del botón y ac_speed guardado
//   · recarga con ac_speed=0.5: el botón sigue en «🐌 0.5x»; un valor ajeno (0.6) o ninguno cae al default 0.85
//   · chips derivados («⚡ 0.5x») · cuerpo de fetchTTS con speed 0.5 · compensación de applyTtsSpeed (0.5/0.5 = 1) · respaldo con la voz del sistema: u.rate === 0.5
// Lo de «Escuchar todo» a 0.5 (la vuelta 0.5 → 1 a mitad de la lección) vive en tools/test-lessons-listen.js; la clave de caché del SW, en tts-service-worker.test.js;
// speed_to_rate(0.5) == «-50%» en tests/api-tts/test_api_tts.py (corre en la CI de GitHub: aquí falta fastapi).
// VEL_MUTADO=<archivo>: sirve ese archivo en lugar de audio-tts.js (lo usa velocidad-05-mutaciones.test.js para probar que esta suite se pone roja).
const fs = require('fs');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sleep = (p, ms) => p.waitForTimeout(ms);
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio, x-tts-fallback, retry-after' };

(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    // speed: valor inicial de ac_speed (null = sin clave)
    async function sesion(speed) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript((sp) => { if (sessionStorage.getItem('_i')) return; sessionStorage.setItem('_i', '1'); localStorage.clear();
            localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); if (sp !== null) localStorage.setItem('ac_speed', sp); }, speed);
        if (process.env.VEL_MUTADO) await ctx.route(/audio-tts\.js/, (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(process.env.VEL_MUTADO, 'utf8') }));
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', e => errs.push(e.message));
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        return { ctx, p, errs };
    }
    const botones = (p) => p.evaluate(() => ({ a: document.getElementById('btn-speed').textContent, h: document.getElementById('btn-speed-hoy').textContent,
        t: document.getElementById('btn-speed').title, ls: localStorage.getItem('ac_speed'), v: playbackSpeed }));

    // ── 1. el ciclo completo, desde 1 ──
    {
        const { ctx, p, errs } = await sesion('1');
        let s = await botones(p);
        ok(s.a === '⚡ 1.0x' && s.h === '⚡ 1.0x' && s.v === 1, 'ciclo: arranca en «⚡ 1.0x» (' + s.a + ')');
        const ESP = [['🐢 0.85x', '0.85'], ['🐌 0.7x', '0.7'], ['🐌 0.5x', '0.5'], ['⚡ 1.0x', '1']];
        for (let i = 0; i < ESP.length; i++) {
            await p.evaluate(() => document.getElementById('btn-speed').click());
            s = await botones(p);
            ok(s.a === ESP[i][0] && s.h === ESP[i][0] && s.ls === ESP[i][1] && s.v === Number(ESP[i][1]), 'ciclo, toque ' + (i + 1) + ': Ajustes y Hoy dicen «' + ESP[i][0] + '» y ac_speed = ' + ESP[i][1] + ' (salió «' + s.a + '» / «' + s.h + '» / ' + s.ls + ')');
            if (ESP[i][1] === '0.5') ok(s.t === 'Velocidad del audio: 0.5x (clic para cambiar)', 'a 0.5 el título dice «' + s.t + '»');
        }
        await p.evaluate(() => document.getElementById('btn-speed-hoy').click());
        s = await botones(p);
        ok(s.a === '🐢 0.85x' && s.h === '🐢 0.85x', 'el botón de Hoy también cicla (desde 1 → «🐢 0.85x»)');
        ok(errs.length === 0, 'ciclo sin errores JS ' + errs.join(' / '));
        await ctx.close();
    }

    // ── 2. recarga con 0.5 guardado; valores ajenos → default 0.85 ──
    {
        const { ctx, p, errs } = await sesion('0.5');
        let s = await botones(p);
        ok(s.a === '🐌 0.5x' && s.h === '🐌 0.5x' && s.v === 0.5 && s.ls === '0.5', 'ac_speed=0.5: el botón arranca en «🐌 0.5x» y playbackSpeed vale 0.5 (' + s.a + ', ' + s.v + ')');
        await p.reload({ waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        s = await botones(p);
        ok(s.a === '🐌 0.5x' && s.v === 0.5 && s.ls === '0.5', 'tras recargar sigue en «🐌 0.5x» (' + s.a + ')');
        await p.evaluate(() => document.getElementById('btn-speed').click());
        s = await botones(p);
        ok(s.a === '⚡ 1.0x' && s.ls === '1', 'desde 0.5 el siguiente toque vuelve a «⚡ 1.0x» (' + s.a + ')');
        ok(errs.length === 0, 'recarga sin errores JS ' + errs.join(' / '));
        await ctx.close();
        for (const [ini, desc] of [[null, 'sin ac_speed'], ['0.6', 'ac_speed=0.6 (valor ajeno)']]) {
            const x = await sesion(ini); const t = await botones(x.p);
            ok(t.a === '🐢 0.85x' && t.v === 0.85, desc + ' → default «🐢 0.85x» (' + t.a + ')');
            await x.ctx.close();
        }
    }

    // ── 3. chips derivados, cuerpo del pedido, compensación y voz del sistema ──
    {
        const { ctx, p, errs } = await sesion('0.5');
        // chip de la lección (mismo recorrido que ajustes-velocidad)
        await p.evaluate(() => showView('aprender')); await p.click('#tab-lessons'); await p.click('#lesson-list .lq-btn[data-act="read"]'); await sleep(p, 300);
        await p.click('#lq-gloss-continue').catch(() => { }); await sleep(p, 200);
        const lc = await p.textContent('#lq-story-speed');
        ok(lc.trim() === '⚡ 0.5x', 'chip de la lección: «⚡ 0.5x» (' + lc.trim() + ')');
        await p.click('#lq-close');
        ok(await p.evaluate(() => readerSpeedLabel()) === '⚡ 0.5x', 'chip del Lector: «⚡ 0.5x»');
        // cuerpo de ttsBody y del pedido real (servidor simulado)
        const cap = [];
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), m = req.method();
            if (m === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            cap.push(m === 'GET' ? { m, speed: new URL(req.url()).searchParams.get('speed') } : { m, speed: (JSON.parse(req.postData() || '{}')).speed });
            return route.fulfill({ status: 503, headers: Object.assign({ 'content-type': 'application/json' }, CORS), body: '{"error":"x"}' });
        });
        ok(await p.evaluate(() => ttsBody('你好', 'zh-CN', 'f').speed) === 0.5, 'ttsBody(...).speed === 0.5');
        await p.evaluate(async () => { try { await fetchTTS(ttsBody('你好', 'zh-CN', 'f'), 3000); } catch (e) { /* el 503 simulado lanza: nos importa el pedido */ } });
        ok(cap.length >= 1 && cap.every(c => c.m === 'GET' ? c.speed === '0.5' : c.speed === 0.5), 'fetchTTS: el pedido sale con speed 0.5 literal (' + JSON.stringify(cap) + ')');
        // compensación: servidor nuevo (devuelve speed 0.5) → rate 1; servidor viejo (sin speed) → rate 0.5
        const comp = await p.evaluate(() => { const a = document.createElement('audio'); const r1 = applyTtsSpeed(a, { speed: 0.5 }); const r2 = applyTtsSpeed(a, {}); return { r1, r2, pr: a.playbackRate }; });
        ok(comp.r1 === 1 && comp.r2 === 0.5 && comp.pr === 0.5, 'applyTtsSpeed: con speed 0.5 del servidor el rate es 1; sin speed (servidor viejo) es 0.5 (' + JSON.stringify(comp) + ')');
        // respaldo: voz del sistema con u.rate === 0.5
        await p.evaluate(() => {
            window.__spk = [];
            window.SpeechSynthesisUtterance = function (t) { this.text = t; this.lang = ''; this.rate = 1; this.voice = null; };
            speechSynthesis.getVoices = function () { return []; }; speechSynthesis.cancel = function () { };
            speechSynthesis.speak = function (u) { window.__spk.push({ text: u.text, rate: u.rate }); };
            speakVoiceSampleSystem('你好', 'zh-CN', 'f');
        });
        const spk = await p.evaluate(() => window.__spk);
        ok(spk.length === 1 && spk[0].rate === 0.5, 'respaldo (voz del sistema): u.rate === 0.5 (' + JSON.stringify(spk) + ')');
        ok(errs.length === 0, 'chips/pedido/respaldo sin errores JS ' + errs.join(' / '));
        await ctx.close();
    }
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
