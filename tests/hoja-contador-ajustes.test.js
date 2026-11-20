// fix/pequenos-gemini · punto 4: el contador «Hoja A4» se actualiza al cambiar «部 Radical» y «Pronunciación»
// (antes solo lo hacían trazos, celdas, estilo y significado → el número quedaba viejo y el docente imprimía de más/de menos).
// Se compara lo que muestra la pantalla tras el cambio con lo que da pzCounterRender() recalculado, y que el número cambió de verdad.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const num = (t) => (/entran (≈?\d+(?: de \d+)?)/.exec(t) || [0, '?'])[1];
const TXT = '你是哪国人我们学习中文好吗谢谢再见老师朋友喜欢吃饭喝茶';

(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
    await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
    await ctx.addInitScript(() => { if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(APP_URL); await p.waitForTimeout(1500);
    // diccionario de radicales inyectado (sin red): hace que «Radical» agregue una línea de info a cada carácter
    const preparar = (estilo) => p.evaluate(([estilo, TXT]) => {
        _pzRadicalMap = {}; for (const c of TXT) _pzRadicalMap[c] = '口';
        pzStyle = estilo; pzRadical = false; pzPron = 'none'; pzSignificado = false; pzTrazos = true; pzCells = 12;
        pzUpdateControls(); document.getElementById('pz-input').value = TXT; pzCounterRender();
        return document.getElementById('pz-counter').textContent;
    }, [estilo, TXT]);
    // los controles de la planilla viven en un panel plegado: se accionan por DOM (mismos listeners que un toque)
    const elegir = (v) => p.evaluate((v) => { const e = document.getElementById('select-pz-pron'); e.value = v; e.dispatchEvent(new Event('change', { bubbles: true })); }, v);
    const tocar = (id) => p.evaluate((id) => document.getElementById(id).click(), id);
    const contador = () => p.evaluate(() => document.getElementById('pz-counter').textContent);
    const fresco = () => p.evaluate(() => { pzCounterRender(); return document.getElementById('pz-counter').textContent; });

    for (const estilo of ['clasica', 'cuaderno']) {
        const base = await preparar(estilo);
        // Pronunciación: ninguna → pinyin (select real)
        await elegir('pinyin');
        const trasPron = await contador(), pronFresco = await fresco();
        ok(trasPron === pronFresco, estilo + ' · tras cambiar Pronunciación el contador ya está al día (« ' + num(trasPron) + ' » = recalculado)');
        if (estilo === 'clasica') ok(trasPron !== base, estilo + ' · y el número cambió respecto de la base (antes «' + num(base) + '», ahora «' + num(trasPron) + '»)');
        // Radical: OFF → ON (botón real)
        await elegir('none');
        await p.evaluate(() => pzCounterRender());
        const base2 = await contador();
        await tocar('btn-pz-radical');
        const trasRad = await contador(), radFresco = await fresco();
        ok(trasRad === radFresco, estilo + ' · tras prender Radical el contador ya está al día (« ' + num(trasRad) + ' » = recalculado)');
        if (estilo === 'clasica') ok(trasRad !== base2, estilo + ' · y el número cambió respecto de la base (antes «' + num(base2) + '», ahora «' + num(trasRad) + '»)');
        // y apagarlo también refresca
        await tocar('btn-pz-radical');
        const apagado = await contador(), apagadoFresco = await fresco();
        ok(apagado === apagadoFresco, estilo + ' · al apagar Radical el contador vuelve a estar al día');
        if (estilo === 'clasica') ok(apagado === base2, estilo + ' · y vuelve al número de antes');
    }
    // lo que ya funcionaba sigue funcionando (significado y estilo)
    await preparar('clasica');
    await tocar('btn-pz-significado');
    ok((await contador()) === (await fresco()), 'Significado: sigue al día');
    ok(errs.length === 0, 'sin errores JS ' + errs.join(' / '));
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
