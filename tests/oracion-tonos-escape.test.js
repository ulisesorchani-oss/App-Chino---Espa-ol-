// fix/pequenos-gemini · punto 2: con colores de tono, renderSentenceText() escapa el texto que arma (it.origin).
// Una oración con «<b>», «&» y «&amp;» se ve LITERAL (sin elemento <b>, sin doble escape), y el hueco y su relleno siguen igual.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
    await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
    await ctx.addInitScript(() => { if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(APP_URL); await p.waitForTimeout(1500);

    const LITERAL = '<b>吃</b>苹果 & 梨 &amp; 茶 <i>';
    const caso = (tonos, fill) => p.evaluate(([tonos, fill, LITERAL]) => {
        state.mode = 'es-cn'; showToneColors = tonos; state.filledAnswer = fill;
        const s = { chinese_simp_full: '我喜欢' + LITERAL, chinese_simp_cloze: '我___' + LITERAL, chinese_simp_answer: '喜欢',
                    chinese_trad_full: '我喜歡' + LITERAL, chinese_trad_cloze: '我___' + LITERAL, chinese_trad_answer: '喜歡', spanish_full: 'x', spanish_answer: 'x' };
        renderSentenceText(s);
        const el = document.getElementById('sentence-text');
        return { ck: ck(), texto: el.textContent, b: el.querySelectorAll('b, i').length, tonos: el.querySelectorAll('[class^="tone-"]').length, fill: [...el.querySelectorAll('.blank-fill')].map((x) => x.textContent), html: el.innerHTML };
    }, [tonos, fill, LITERAL]);

    const hueco = await caso(true, null);
    ok(hueco.ck === 'simp', 'escritura simplificada (' + hueco.ck + ')');
    ok(hueco.b === 0, 'tonos ON: «<b>» e «<i>» NO se crean como elementos (' + hueco.b + ')');
    ok(hueco.texto === '我___' + LITERAL, 'tonos ON: el texto se ve literal, con «&amp;» sin convertir y el hueco «___» (' + JSON.stringify(hueco.texto) + ')');
    ok(hueco.tonos > 0, 'tonos ON: siguen los <span class="tone-N"> (' + hueco.tonos + ')');
    ok(hueco.html.indexOf('&lt;b&gt;') !== -1 && hueco.html.indexOf('&amp;amp;') !== -1, 'el HTML lleva «&lt;b&gt;» y «&amp;amp;» (un solo escape)');

    const lleno = await caso(true, 'blank-ok');
    ok(lleno.fill.length === 1 && lleno.fill[0] === '喜欢', 'tonos ON + relleno: el hueco se completa con 喜欢 (' + JSON.stringify(lleno.fill) + ')');
    ok(lleno.texto === '我喜欢' + LITERAL && lleno.b === 0, 'tonos ON + relleno: oración completa y literal (' + JSON.stringify(lleno.texto) + ')');

    const plano = await caso(false, null);
    ok(plano.texto === '我___' + LITERAL && plano.b === 0, 'tonos OFF (camino de texto plano): mismo texto, sin elementos (' + JSON.stringify(plano.texto) + ')');

    // sin caracteres especiales el resultado es el de siempre: mismos tonos y mismo texto
    const limpio = await p.evaluate(() => {
        state.mode = 'es-cn'; showToneColors = true; state.filledAnswer = null;
        renderSentenceText({ chinese_simp_full: '我喜欢吃苹果', chinese_simp_cloze: '我___吃苹果', chinese_simp_answer: '喜欢', chinese_trad_full: '我喜歡吃蘋果', chinese_trad_cloze: '我___吃蘋果', chinese_trad_answer: '喜歡' });
        const el = document.getElementById('sentence-text'); return { t: el.textContent, n: el.querySelectorAll('[class^="tone-"]').length, h: el.innerHTML };
    });
    ok(limpio.t === '我___吃苹果' && limpio.n === 4, 'oración sin caracteres especiales: «' + limpio.t + '» con ' + limpio.n + ' tonos (igual que antes)');
    ok(errs.length === 0, 'sin errores JS ' + errs.join(' / '));
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
