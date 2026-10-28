// Voz masculina de Taiwán (tw-m) «no disponible por ahora»: VOCES_NO_DISPONIBLES = ['tw-m'] (audio-tts.js, temporal).
// Con la constante activa NO sale ningún pedido a tw-m (se pide la continental m); la elección del alumno (ac_voice_zh) y el botón de voz
// no se tocan; el aviso sale UNA vez por sesión. Apagada (arreglo vacío) vuelve el comportamiento de antes. tw-f y las continentales no cambian.
// Servidor /api/tts simulado con page.route (sin red).
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
const sleep = (p, ms) => p.waitForTimeout(ms);
const AVISO = 'La voz masculina de Taiwán no está disponible por ahora: uso la masculina continental.';

function wavB64(sec) {
    const sr = 8000, len = Math.floor(sr * sec), buf = Buffer.alloc(44 + len, 128);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + len, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(len, 40);
    return buf.toString('base64');
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio, x-tts-fallback, retry-after' };

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });
    const audio = wavB64(0.4);

    // sesión nueva: `voz` = valor guardado de ac_voice_zh (null = automático)
    async function session(voz, opts) {
        opts = opts || {};
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(([voz]) => {
            if (!sessionStorage.getItem('_i')) {
                sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1');
                if (voz) localStorage.setItem('ac_voice_zh', voz); else localStorage.removeItem('ac_voice_zh');
            }
        }, [voz]);
        const p = await ctx.newPage(); const errs = [], reqs = [];
        p.on('pageerror', e => errs.push(String(e)));
        await p.route(/\/api\/tts/, async (route) => {
            const r = route.request();
            if (r.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let voice = null, lang = null, text = '';
            if (r.method() === 'GET') { const u = new URL(r.url()); voice = u.searchParams.get('voice'); lang = u.searchParams.get('lang'); text = u.searchParams.get('text') || ''; }
            else { try { const j = JSON.parse(r.postData() || '{}'); voice = j.voice; lang = j.lang; text = j.text || ''; } catch (e) { /* sin cuerpo */ } }
            reqs.push({ m: r.method(), voice, lang, text });
            return route.fulfill({ status: 200, headers: Object.assign({ 'content-type': 'application/json', 'x-tts-audio': '1' }, CORS),
                body: JSON.stringify({ audio, mime: 'audio/wav', voice: voice === 'm' ? 'zh-CN-YunjianNeural' : 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) });
        });
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1400);
        // espías: avisos (veces que el aviso pasa a visible), console.warn y moduleStatus
        await p.evaluate(() => {
            window.__V = { visible: 0, warns: [], status: [] };
            const obs = new MutationObserver(() => {
                const el = document.getElementById('tts-voice-notice');
                if (el && el.style.display === 'block' && !el.__vis) { el.__vis = true; window.__V.visible++; }
                if (el && el.style.display === 'none') el.__vis = false;
            });
            obs.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] });
            const w = console.warn; console.warn = function () { window.__V.warns.push([].join.call(arguments, ' ')); return w.apply(console, arguments); };
            const ms = window.moduleStatus; window.moduleStatus = function (m) { window.__V.status.push(String(m)); return ms && ms.apply(this, arguments); };
            speechSynthesis.speak = function (u) { setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 50); };
            speechSynthesis.cancel = function () { };
        });
        if (opts.apagada) await p.evaluate(() => { VOCES_NO_DISPONIBLES.splice(0); });
        return { ctx, p, errs, reqs };
    }
    async function openLesson(p, id) {
        await p.click('#nav-aprender'); await sleep(p, 250);
        const lvl = await p.evaluate((id) => { const l = GRADED_LESSONS.find(x => x.id === id); return l.exam ? 'tocfl:' + l.examLvl : String(l.hsk); }, id);
        await p.evaluate((lvl) => { const wrap = document.getElementById('lesson-list'); wrap.dataset.level = lvl; const s = document.getElementById(lvl.indexOf('tocfl') === 0 ? 'sel-lv-tocfl' : 'sel-lv-hsk'); if (s) { s.value = lvl; s.dispatchEvent(new Event('change')); } }, lvl);
        await sleep(p, 250);
        await p.click('.lc-read[data-id="' + id + '"]'); await sleep(p, 700);
        if (await p.$('#lq-gloss-continue')) { await p.click('#lq-gloss-continue'); await sleep(p, 300); }
    }
    const zh = (reqs) => reqs.filter(r => /^zh-/.test(r.lang || ''));

    // ═════════ 1. constante ACTIVA y elección guardada = tw-m ═════════
    {
        const { ctx, p, errs, reqs } = await session('tw-m');
        const E = await p.evaluate(() => ({ lista: VOCES_NO_DISPONIBLES.slice(), elegida: voiceZhFor(null), guardada: localStorage.getItem('ac_voice_zh'), boton: document.getElementById('btn-voice-zh').textContent, icono: VOICE_ICONS_ZH['tw-m'],
            lang: ttsLangFor('zh', 'tw-m'), body: ttsBody('你好', ttsLangFor('zh', 'tw-m'), 'tw-m'), langF: ttsLangFor('zh', 'tw-f'), bodyF: ttsBody('你好', 'zh-TW', 'tw-f').voice }));
        ok(JSON.stringify(E.lista) === '["tw-m"]', 'la constante temporal es VOCES_NO_DISPONIBLES = [\'tw-m\'] (' + JSON.stringify(E.lista) + ')');
        ok(E.elegida === 'tw-m' && E.guardada === 'tw-m', 'la elección del alumno NO se toca: voiceZhFor → tw-m y ac_voice_zh sigue guardada (' + E.elegida + ' / ' + E.guardada + ')');
        ok(E.boton === E.icono, 'el botón de voz sigue mostrando la elección del alumno (' + E.boton + ')');
        ok(E.lang === 'zh-CN' && E.body.voice === 'm' && E.body.lang === 'zh-CN', 'ttsLangFor/ttsBody: tw-m se pide como m en zh-CN (' + E.lang + ', ' + E.body.voice + ')');
        ok(E.langF === 'zh-TW' && E.bodyF === 'tw-f', 'tw-f no cambia (zh-TW / tw-f)');
        // el aviso ya salió por el ttsBody de arriba (primer pedido con voz sustituida)
        await sleep(p, 200);
        const A0 = await p.evaluate(() => ({ visible: window.__V.visible, txt: (document.getElementById('tts-voice-notice') || {}).textContent, role: (document.getElementById('tts-voice-notice') || document.body).getAttribute('role') }));
        ok(A0.visible === 1 && A0.txt === AVISO && A0.role === 'status', 'aviso breve la primera vez que se pide una voz sustituida: «' + A0.txt + '»');

        // 🔊 de una línea
        await openLesson(p, 'h1-primer-dia');
        await p.click('.lq-line[data-i="1"] .lq-line-say'); await sleep(p, 900);
        // «Escuchar todo» (unas líneas)
        await p.click('#ll-play');
        await p.waitForFunction(() => window.__V && LQ_LISTEN.idx >= 3, null, { timeout: 30000 });
        await p.click('#ll-stop');
        // muestra de voz del botón (playVoiceSample con voiceZh = tw-m) y avisos de «servidor desactualizado»
        await p.evaluate(() => { playVoiceSample('zh'); });
        await sleep(p, 900);
        await p.evaluate(() => { warnStaleVoice('tw-m', { voice: 'zh-CN-YunjianNeural' }); });
        const Z = zh(reqs);
        ok(Z.length >= 5, 'se hicieron pedidos de chino (' + Z.length + ')');
        ok(reqs.filter(r => r.voice === 'tw-m').length === 0, 'NINGÚN pedido a tw-m (' + reqs.filter(r => r.voice === 'tw-m').length + ')');
        ok(Z.every(r => r.voice === 'm' && r.lang === 'zh-CN'), 'todos los pedidos de chino salen como m / zh-CN ' + JSON.stringify(Array.from(new Set(Z.map(r => r.voice + '/' + r.lang)))));
        ok(Z.some(r => r.text === '你好！我们一起练习吧。'), 'la muestra de voz del botón también sale con la continental');
        const A1 = await p.evaluate(() => ({ visible: window.__V.visible, warns: window.__V.warns.filter(w => /servidor TTS no tiene/.test(w)).length, status: window.__V.status.filter(s => /no está en el servidor/.test(s)).length, guardada: localStorage.getItem('ac_voice_zh'), boton: document.getElementById('btn-voice-zh').textContent }));
        ok(A1.visible === 1, 'el aviso sale UNA sola vez aunque haya muchos pedidos (' + A1.visible + ')');
        ok(A1.warns === 0 && A1.status === 0, 'la voz sustituida no dispara el aviso de «servidor desactualizado»');
        ok(A1.guardada === 'tw-m' && A1.boton === E.icono, 'al final la elección sigue siendo tw-m y el botón sigue mostrándola');
        // recarga en la misma pestaña: no repite el aviso (una vez por sesión)
        await p.reload({ waitUntil: 'domcontentloaded' }); await sleep(p, 1200);
        await p.evaluate(() => { window.__V = { visible: 0 }; const o = new MutationObserver(() => { const el = document.getElementById('tts-voice-notice'); if (el && el.style.display === 'block' && !el.__vis) { el.__vis = true; window.__V.visible++; } if (el && el.style.display === 'none') el.__vis = false; }); o.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] }); ttsBody('你好', 'zh-CN', 'tw-m'); });
        await sleep(p, 300);
        ok((await p.evaluate(() => window.__V.visible)) === 0, 'tras recargar la misma pestaña el aviso no se repite (una vez por sesión)');
        ok(errs.length === 0, 'activa: sin errores JS: ' + errs.join(' | '));
        await ctx.close();
    }

    // ═════════ 2. constante APAGADA: vuelve el comportamiento de antes ═════════
    {
        const { ctx, p, errs, reqs } = await session('tw-m', { apagada: true });
        const E = await p.evaluate(() => ({ lista: VOCES_NO_DISPONIBLES.length, lang: ttsLangFor('zh', 'tw-m'), voz: ttsBody('x', ttsLangFor('zh', 'tw-m'), 'tw-m').voice }));
        ok(E.lista === 0 && E.lang === 'zh-TW' && E.voz === 'tw-m', 'apagada: tw-m se pide como tw-m en zh-TW (' + E.lang + ', ' + E.voz + ')');
        await openLesson(p, 'h1-primer-dia');
        await p.click('.lq-line[data-i="1"] .lq-line-say'); await sleep(p, 900);
        const Z = zh(reqs);
        ok(Z.length >= 1 && Z.every(r => r.voice === 'tw-m' && r.lang === 'zh-TW'), 'apagada: los pedidos salen a tw-m / zh-TW ' + JSON.stringify(Array.from(new Set(Z.map(r => r.voice + '/' + r.lang)))));
        ok((await p.evaluate(() => window.__V.visible)) === 0 && !(await p.$('#tts-voice-notice')), 'apagada: no hay aviso');
        ok(errs.length === 0, 'apagada: sin errores JS');
        await ctx.close();
    }

    // ═════════ 3. TOCFL en automático (tw-f) y las continentales: sin cambios ni aviso ═════════
    {
        const { ctx, p, errs, reqs } = await session(null);
        await openLesson(p, 'tocfl-prep-gongyuan');
        await p.click('.lq-line[data-i="1"] .lq-line-say'); await sleep(p, 900);
        const Z = zh(reqs);
        ok(Z.length >= 1 && Z.every(r => r.voice === 'tw-f' && r.lang === 'zh-TW'), 'TOCFL automático: sigue pidiendo tw-f / zh-TW ' + JSON.stringify(Array.from(new Set(Z.map(r => r.voice + '/' + r.lang)))));
        ok((await p.evaluate(() => window.__V.visible)) === 0 && !(await p.$('#tts-voice-notice')), 'TOCFL automático: sin aviso');
        ok(errs.length === 0, 'TOCFL automático sin errores JS');
        await ctx.close();
    }
    for (const v of ['f', 'm', 'f2', 'm2', 'tw-f']) {
        const { ctx, p, reqs } = await session(v);
        const body = await p.evaluate((v) => ({ lang: ttsLangFor('zh', v), voz: ttsBody('x', ttsLangFor('zh', v), v).voice, visible: window.__V.visible }), v);
        ok(body.voz === v && body.lang === (v === 'tw-f' ? 'zh-TW' : 'zh-CN') && body.visible === 0, 'voz ' + v + ': sin cambios ni aviso (' + body.lang + ', ' + body.voz + ')');
        await ctx.close();
    }
    {
        // TOCFL con tw-m elegida: sustituye la voz y, al apagar, vuelve
        const { ctx, p, reqs } = await session('tw-m');
        await openLesson(p, 'tocfl-prep-gongyuan');
        await p.click('.lq-line[data-i="1"] .lq-line-say'); await sleep(p, 900);
        const Z = zh(reqs);
        ok(Z.length >= 1 && Z.every(r => r.voice === 'm' && r.lang === 'zh-CN'), 'TOCFL con tw-m elegida: se pide m / zh-CN (la lección sigue en tradicional)');
        await ctx.close();
    }

    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails);
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
