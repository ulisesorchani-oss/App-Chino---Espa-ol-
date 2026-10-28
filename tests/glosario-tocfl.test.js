// tests/glosario-tocfl.test.js — glosario de las 8 lecciones TOCFL A2–C1 (keywords elegidas) y pinyin por escritura.
//   · el glosario muestra EXACTAMENTE las keywords de la lección, en la escritura elegida (simp/trad), con la glosa escrita
//   · pinyin: `py` rige para simplificado y `pyT` para tradicional; si falta el de la escritura elegida, se genera como siempre
//     (sin copiar el de la otra escritura). Casos reales: 盐酥鸡/鹹酥雞 (xián sū jī) y 屏幕/螢幕 (yíng mù)
//   · escritorio y Android (Intl.Segmenter por caracteres), 320 y 360 px: sin desborde horizontal ni errores JS
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
const stub = () => { class S { segment(t) { const a = []; let i = 0; for (const c of String(t)) { a.push({ segment: c, index: i, input: t }); i += c.length; } return a; } } Intl.Segmenter = S; };
const LECCIONES = { 'tocfl-a2-yeshi': 'A2', 'tocfl-a2-jieyun': 'A2', 'tocfl-b1-kaihue': 'B1', 'tocfl-b1-shouji': 'B1',
    'tocfl-b2-mianshi': 'B2', 'tocfl-b2-huanbao': 'B2', 'tocfl-c1-dushi': 'C1', 'tocfl-c1-luyan': 'C1' };
(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
    async function abrir(id, { mode, sc, w, mutar }) {
        const ctx = await b.newContext({ viewport: { width: w, height: 740 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
        if (mode === 'android') await ctx.addInitScript(stub);
        await ctx.addInitScript(([sc, lv]) => { localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_lesson_level', 'tocfl:' + lv);
            if (sc === 'simp') localStorage.setItem('ac_script_tocfl', 'simp'); }, [sc, LECCIONES[id]]);
        const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
        await p.goto(APP_URL); await p.waitForTimeout(1100);
        if (mutar) await p.evaluate(([id, mutar]) => { const l = GRADED_LESSONS.find(x => x.id === id); eval('(' + mutar + ')')(l); }, [id, mutar]);
        await p.evaluate(() => showView('aprender'));
        await p.click('.lq-btn[data-act="read"][data-id="' + id + '"]'); await p.waitForTimeout(450);
        const g = await p.$$eval('.lq-gloss-item', a => a.map(x => [x.querySelector('.lq-gloss-zh').textContent, x.querySelector('.lq-gloss-py').textContent, x.querySelector('.lq-gloss-es').textContent]));
        return { ctx, p, g, errs };
    }
    // 1) las 8 lecciones: glosario = keywords (zh por escritura, py/pyT o generado, glosa)
    for (const mode of ['escritorio', 'android']) for (const sc of ['trad', 'simp']) for (const w of [320, 360]) for (const id of Object.keys(LECCIONES)) {
        const { ctx, p, g, errs } = await abrir(id, { mode, sc, w });
        const want = await p.evaluate(([id, sc]) => GRADED_LESSONS.find(x => x.id === id).keywords.map(k =>
            [sc === 'trad' ? (k.zhT || k.zh) : k.zh, (sc === 'trad' ? k.pyT : k.py) || pinyinFor(k.zh, 'tocfl'), k.es]), [id, sc]);
        const tag = mode + '/' + sc + '/' + w + '/' + id;
        ok(g.length >= 3 && JSON.stringify(g) === JSON.stringify(want), tag + ' glosario = keywords\n   sale:  ' + JSON.stringify(g) + '\n   debía: ' + JSON.stringify(want));
        const desb = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        ok(!desb, tag + ' desborde horizontal');
        ok(!errs.length, tag + ' errores JS ' + errs.join('/'));
        await ctx.close();
    }
    // 2) casos con pinyin distinto por escritura
    const casos = [['tocfl-a2-yeshi', '盐酥鸡', '鹹酥雞', 'xián sū jī'], ['tocfl-b1-shouji', '屏幕', '螢幕', 'yíng mù']];
    for (const [id, s, t, pyT] of casos) {
        let r = await abrir(id, { mode: 'escritorio', sc: 'trad', w: 360 });
        let f = r.g.find(x => x[0] === t); ok(f && f[1] === pyT, id + ' trad: ' + t + ' debe llevar «' + pyT + '» (sale ' + JSON.stringify(f) + ')'); await r.ctx.close();
        r = await abrir(id, { mode: 'escritorio', sc: 'simp', w: 360 });
        f = r.g.find(x => x[0] === s); ok(f && f[1] && f[1] !== pyT, id + ' simp: ' + s + ' NO hereda el pinyin tradicional (sale ' + JSON.stringify(f) + ')'); await r.ctx.close();
    }
    // 3) reglas de py/pyT sobre una lección con keywords alteradas (sin tocar el texto): se pide siempre la 1.ª palabra
    const MUT = {
        py: 'l=>{l.keywords[0].py="AA bb";delete l.keywords[0].pyT;}',
        pyT: 'l=>{l.keywords[0].pyT="CC dd";delete l.keywords[0].py;}',
        ambos: 'l=>{l.keywords[0].py="AA bb";l.keywords[0].pyT="CC dd";}',
        ninguno: 'l=>{delete l.keywords[0].py;delete l.keywords[0].pyT;}'
    };
    const id = 'tocfl-a2-yeshi';
    const gen = await (async () => { const r = await abrir(id, { mode: 'escritorio', sc: 'simp', w: 360, mutar: MUT.ninguno }); const v = r.g[0][1]; await r.ctx.close(); return v; })();
    ok(gen && !/AA|CC/.test(gen), 'sin py ni pyT: se genera (sale «' + gen + '»)');
    for (const [caso, esperado] of [['py', { simp: 'AA bb', trad: null }], ['pyT', { simp: null, trad: 'CC dd' }], ['ambos', { simp: 'AA bb', trad: 'CC dd' }]]) {
        for (const sc of ['simp', 'trad']) {
            const r = await abrir(id, { mode: 'escritorio', sc, w: 360, mutar: MUT[caso] });
            const v = r.g[0][1]; const quiero = esperado[sc];
            if (quiero) ok(v === quiero, caso + '/' + sc + ': debe usar «' + quiero + '» (sale «' + v + '»)');
            else ok(v && !/AA|CC/.test(v), caso + '/' + sc + ': falta el de esta escritura → se genera, no se copia el de la otra (sale «' + v + '»)');
            await r.ctx.close();
        }
    }
    await b.close(); console.log('comprobaciones ' + n + ' · FAILS ' + fails); process.exit(fails ? 1 : 0);
})();
