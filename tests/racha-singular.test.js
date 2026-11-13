// Racha: «1 día seguido» (singular) y «0 / 2 días seguidos» (plural) en el modal de estadísticas (stats.js),
// en español y en chino (天 no tiene plural: no cambia). También: el chip 🔥 de la cabecera solo lleva el número,
// y «Racha: N día(s)» de la guía y de la sesión ya hacían singular (no se rompen).
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let fails = 0, n = 0;
const check = (nombre, c, x) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + nombre + (x !== undefined ? '  ' + x : '')); if (!c) fails++; };

(async () => {
    const browser = await chromium.launch({ ...LAUNCH, headless: true });
    for (const modo of ['es-cn', 'cn-es']) {
        for (const dias of [0, 1, 2]) {
            const T = '[' + modo + ' · ' + dias + ' día(s)] ';
            const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
            await ctx.addInitScript(({ modo, dias }) => {
                if (sessionStorage.getItem('__seeded')) return; // solo la 1.ª carga
                sessionStorage.setItem('__seeded', '1');
                localStorage.clear();
                localStorage.setItem('ac_onboarding_done_v2', '1');
                localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode: modo }));
                const d = {}, hoy = new Date();
                for (let i = 0; i < dias; i++) {
                    const x = new Date(hoy); x.setDate(hoy.getDate() - i);
                    d[x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0')] = { a: 1, r: 0, s: 60 };
                }
                localStorage.setItem('ac_stats_v1', JSON.stringify({ v: 1, days: d }));
            }, { modo, dias });
            const page = await ctx.newPage(); const errs = [];
            page.on('pageerror', (e) => errs.push(String(e)));
            await page.goto(APP_URL, { waitUntil: 'load' }); await page.waitForTimeout(1500);
            await page.click('#nav-yo'); await page.click('#btn-stats'); await page.waitForSelector('.st-hero');
            const hero = await page.evaluate(() => ({ n: document.querySelector('.st-hero-n').innerText.trim(), l: document.querySelector('.st-hero-l').innerText.trim() }));
            const chip = await page.evaluate(() => { const e = document.getElementById('header-streak'); return { texto: e.innerText.trim(), oculto: e.classList.contains('hidden') }; });
            check(T + 'el número de la racha es ' + dias, hero.n.replace(/\D/g, '') === String(dias), JSON.stringify(hero.n));
            if (modo === 'es-cn') {
                const esperado = dias === 1 ? 'día seguido' : 'días seguidos';
                check(T + 'unidad «' + esperado + '»', hero.l === esperado, JSON.stringify(hero.l));
                if (dias === 1) check(T + 'no queda «1 días»', !/días/.test(hero.l));
            } else {
                check(T + 'chino sin cambios (天连续学习)', hero.l === '天连续学习', JSON.stringify(hero.l));
            }
            check(T + 'chip de la cabecera: solo el número' + (dias ? '' : ' (oculto con 0)'),
                dias === 0 ? chip.oculto : (!chip.oculto && chip.texto.replace(/\D/g, '') === String(dias) && !/d[ií]as?/i.test(chip.texto)), JSON.stringify(chip));
            check(T + 'sin errores JS', errs.filter((x) => !/localStorage/.test(x)).length === 0, errs.join(' | '));
            await ctx.close();
        }
    }
    await browser.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
