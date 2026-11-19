// Podcast: si la carga FALLA (503 o error de red), el botón no queda en «⏳» ni inerte. Tras el fallo:
//   · con voz del sistema → cae a ella (por frases): estado «Reproduciendo», el botón dice «⏸» y está habilitado (suena algo); al terminar la voz queda «Listo» y el botón vuelve a «▶️», habilitado
//   · sin voz del sistema → estado «No pude reproducir el audio» (antes: reposo mudo, «Tocá ▶️ para empezar»): el botón dice «▶️» y está habilitado
// y en ambos casos un toque en ▶️ vuelve a pedir la lección (no queda trabado). SERVIDOR Y VOZ DEL SISTEMA SIMULADOS (page.route; speechSynthesis). Un contexto nuevo por caso.
// Esta prueba tiene que ponerse ROJA contra un botón que no se rehabilita tras el fallo (con PC_MUTADO=<archivo> se sirve otro podcast.js: ver el informe de la rama).
//   PC_MUTADO=<archivo> sirve ese podcast.js en lugar del del repo (para las mutaciones)
const fs = require('fs');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sleep = (p, ms) => p.waitForTimeout(ms);
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio, x-tts-fallback, retry-after' };
function wavB64(sec) {
    const sr = 8000, len = Math.floor(sr * sec), buf = Buffer.alloc(44 + len, 128);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + len, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(len, 40);
    return buf.toString('base64');
}

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // `pol(k)` → 'ok' | 503 | 'red' (error de red) para el pedido k (0, 1, …); `sinVoz`: borra speechSynthesis
    async function sesion(pol, sinVoz) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); } });
        if (process.env.PC_MUTADO) await ctx.route(/\/podcast\.js/, (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(process.env.PC_MUTADO, 'utf8') }));
        await ctx.addInitScript((sv) => {
            if (sv) { try { delete window.speechSynthesis; } catch (e) { /* noop */ } return; }
            window.__voz = { speak: 0 };
            speechSynthesis.getVoices = () => [];
            speechSynthesis.cancel = () => { };
            speechSynthesis.pause = () => { }; speechSynthesis.resume = () => { };
            speechSynthesis.speak = (u) => { window.__voz.speak++; setTimeout(() => { try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } }, 0); setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 900); }; // como Chrome: onstart y, 0,9 s después, onend (por frase)
        }, !!sinVoz);
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        const srv = { reqs: 0 }; const audio = wavB64(1.5);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request();
            if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            const k = srv.reqs++, r = pol(k);
            if (r === 'red') return route.abort('failed');
            const status = r === 'ok' ? 200 : 503;
            return route.fulfill({ status, headers: Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' }),
                body: status === 200 ? JSON.stringify({ audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'no' }) });
        });
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1300);
        return { ctx, p, errs, srv };
    }
    const abrir = async (p) => { await p.evaluate(() => document.getElementById('btn-podcast').click()); await sleep(p, 400); await p.evaluate(() => document.querySelector('.pd-item[data-pd-id]').click()); };
    const ui = (p) => p.evaluate(() => { const s = document.getElementById('pd-status'), b = document.getElementById('pd-playpause'); return { estado: s ? s.textContent.trim() : '', boton: b ? b.textContent.trim() : '', label: b ? b.getAttribute('aria-label') : '', dis: b ? b.getAttribute('aria-disabled') : '', disabled: b ? b.disabled : null }; });
    const salioDeLaCarga = (p) => p.waitForFunction(() => { const s = document.getElementById('pd-status'); return s && !/^⏳/.test(s.textContent.trim()); }, null, { timeout: 4000 }).then(() => true, () => false);
    const esperaListo = (p) => p.waitForFunction(() => /Listo/.test((document.getElementById('pd-status') || {}).textContent || ''), null, { timeout: 6000 }).then(() => true, () => false);
    const tocable = (u) => u.boton !== '⏳' && u.dis !== 'true' && u.disabled === false;

    const CASOS = [['503', () => 503], ['error de red', () => 'red']];
    for (const [nombre, falla] of CASOS) {
        // ═════════ con voz del sistema: cae a la voz; el botón no queda en ⏳ ni inerte; al terminar la voz vuelve a ▶️ ═════════
        {
            const { ctx, p, errs, srv } = await sesion(() => falla(), false);
            await abrir(p); const sale1 = await salioDeLaCarga(p); await sleep(p, 100);
            const u1 = await ui(p);
            ok(sale1, nombre + ' + voz: la carga TERMINA (el estado deja de decir «⏳» en 4 s; si queda trabado: «' + u1.estado + '», botón «' + u1.boton + '»)');
            ok(/Reproduciendo/.test(u1.estado) && u1.boton === '⏸' && tocable(u1), nombre + ' + voz: tras el fallo cae a la voz del sistema; el botón dice «⏸» y está habilitado (estado «' + u1.estado + '», botón «' + u1.boton + '», aria-disabled=' + u1.dis + ')');
            const listo = await esperaListo(p);
            const u2 = await ui(p);
            ok(listo, nombre + ' + voz: la voz termina y el estado pasa a «Listo»');
            ok(u2.boton === '▶️' && u2.label === 'Reproducir' && tocable(u2), nombre + ' + voz: al terminar la voz queda «Listo» y el botón vuelve a «▶️» habilitado (botón «' + u2.boton + '», aria-label «' + u2.label + '», aria-disabled=' + u2.dis + ')');
            const antes = srv.reqs; await p.evaluate(() => document.getElementById('pd-playpause').click()); await sleep(p, 500);
            ok(srv.reqs === antes + 1, nombre + ' + voz: un toque en ▶️ vuelve a pedir la lección (pedidos ' + antes + ' → ' + srv.reqs + ')');
            ok(errs.filter((x) => !/localStorage/.test(x)).length === 0, nombre + ' + voz: sin errores JS ' + errs.join('|'));
            await ctx.close();
        }
        // ═════════ sin voz del sistema: «No pude reproducir el audio»; el botón dice ▶️ y está habilitado; un toque vuelve a pedir ═════════
        {
            const { ctx, p, errs, srv } = await sesion(() => falla(), true);
            await abrir(p); const sale2 = await salioDeLaCarga(p); await sleep(p, 100);
            const u = await ui(p);
            ok(sale2, nombre + ' sin voz: la carga TERMINA (el estado deja de decir «⏳» en 4 s; si queda trabado: «' + u.estado + '», botón «' + u.boton + '»)');
            ok(/No pude reproducir el audio/.test(u.estado) && u.boton === '▶️' && u.label === 'Reproducir' && tocable(u), nombre + ' sin voz: «No pude reproducir el audio»; el botón dice «▶️» y se puede tocar (estado «' + u.estado + '», botón «' + u.boton + '», aria-label «' + u.label + '», aria-disabled=' + u.dis + ')');
            const antes = srv.reqs; await p.evaluate(() => document.getElementById('pd-playpause').click()); await sleep(p, 400);
            ok(srv.reqs === antes + 1, nombre + ' sin voz: un toque en ▶️ vuelve a pedir la lección (pedidos ' + antes + ' → ' + srv.reqs + ')');
            const sale3 = await salioDeLaCarga(p); await sleep(p, 100);
            const u3 = await ui(p);
            ok(sale3, nombre + ' sin voz: tras el segundo fallo la carga TERMINA');
            ok(u3.boton === '▶️' && tocable(u3), nombre + ' sin voz: tras el segundo fallo el botón vuelve a «▶️» y se puede tocar (botón «' + u3.boton + '», aria-disabled=' + u3.dis + ')');
            ok(errs.filter((x) => !/localStorage/.test(x)).length === 0, nombre + ' sin voz: sin errores JS ' + errs.join('|'));
            await ctx.close();
        }
    }
    // ═════════ el servidor se recupera: tras un fallo, ▶️ vuelve a andar y suena ═════════
    {
        const { ctx, p } = await sesion((k) => (k === 0 ? 503 : 'ok'), true);
        await abrir(p); await salioDeLaCarga(p); await sleep(p, 100);
        await p.evaluate(() => document.getElementById('pd-playpause').click());
        const reproduce = await p.waitForFunction(() => /Reproduciendo/.test((document.getElementById('pd-status') || {}).textContent || ''), null, { timeout: 5000 }).then(() => true, () => false);
        const u = await ui(p);
        ok(reproduce, 'recuperación: tras un fallo y un toque en ▶️ el servidor sano hace sonar la lección');
        ok(u.boton === '⏸' && tocable(u), 'recuperación: tras un fallo, un toque en ▶️ carga bien y el botón pasa a «⏸» habilitado (botón «' + u.boton + '»)');
        await ctx.close();
    }
    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
