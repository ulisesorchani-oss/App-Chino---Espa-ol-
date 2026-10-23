const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('onboarding');
const APP = APP_URL;
let fails = 0;
const check = (n, c, x) => { console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + x : '')); if (!c) fails++; };

async function setup(browser, opts) {
    opts = opts || {};
    const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
    await ctx.addInitScript((o) => {
        if (sessionStorage.getItem('__seeded')) return; // solo la 1.ª carga: las recargas conservan lo guardado
        sessionStorage.setItem('__seeded', '1');
        Object.entries(o.ls || {}).forEach(([k, v]) => localStorage.setItem(k, v));
        if (o.dark) document.addEventListener('DOMContentLoaded', () => document.body.classList.add('dark-mode'));
    }, opts);
    if (opts.noStats) await ctx.route('**/stats.js*', (r) => r.fulfill({ status: 404, body: '' }));
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(APP, { waitUntil: 'load' });
    return { ctx, page, errs };
}
const guideOpen = (p) => p.evaluate(() => { const g = document.getElementById('guide-pop'); return !!g && !g.classList.contains('hidden'); });
const ls = (p, k) => p.evaluate((k) => localStorage.getItem(k), k);
const bodyText = (p) => p.evaluate(() => (document.getElementById('guide-body') || {}).innerText || '');
const noErr = (e) => e.filter((x) => !/localStorage/.test(x));

async function runFlow(page, choice) {
    await page.waitForSelector('#guide-pop:not(.hidden)', { timeout: 4000 });
    await page.click('#guide-body .ob-next'); // Empezar
    if (choice) await page.click('#guide-body .ob-s-choice[data-choice="' + choice + '"]');
    await page.click('#guide-body .ob-next'); // Siguiente
    const label = await page.textContent('#guide-body .ob-next');
    await page.click('#guide-body .ob-next'); // botón final
    await page.waitForTimeout(1200);
    return label.trim();
}

(async () => {
    const browser = await chromium.launch({ ...LAUNCH, headless: true });

    // 1. Usuario nuevo, español: pantallas, "Desde cero", pista, acierto, recarga.
    {
        const { ctx, page, errs } = await setup(browser);
        await page.waitForSelector('#guide-pop:not(.hidden)', { timeout: 4000 });
        const t1 = await bodyText(page);
        check('1. se abre sola con la pantalla 1', /¡Hola! 你好/.test(t1) && /Un poquito cada día/.test(t1) && /Empezar/.test(t1) && /Saltar/.test(t1), JSON.stringify(t1.slice(0, 120)));
        const act = await page.evaluate(() => navigator.userActivation && navigator.userActivation.isActive);
        const stk0 = JSON.stringify(await page.evaluate(() => Nav.stack));
        // La entrada solo puede existir si la página ya tenía activación del usuario (Chrome no la saltea).
        check('1. entrada de historial solo con activación del usuario', act ? stk0 === '["guide-pop"]' : stk0 === '[]', 'activación=' + act + ' pila=' + stk0);
        await page.click('#guide-body .ob-next');
        const t2 = await bodyText(page);
        check('1. pantalla 2: tres opciones + pie', (await page.locator('.ob-s-choice').count()) === 3 && /Primeras palabras \(HSK 1\)/.test(t2) && /Lo podés cambiar cuando quieras\./.test(t2) && /Saltar/.test(t2));
        check('1. el primer toque creó la entrada de historial', JSON.stringify(await page.evaluate(() => Nav.stack)) === '["guide-pop"]');
        await page.click('.ob-s-choice[data-choice="cero"]');
        await page.click('#guide-body .ob-next');
        const t3 = await bodyText(page);
        check('1. pantalla 3: cuatro pestañas y "Empezar ▶"', (await page.locator('.ob-s-tab').count()) === 4 && /Empezar ▶/.test(t3) && /Saltar/.test(t3));
        await page.screenshot({ path: OUT + '/impl-3.png' });
        await page.click('#guide-body .ob-next');
        await page.waitForTimeout(1200);
        const st = await page.evaluate(() => ({ mod: state.activeModule, hoy: !document.getElementById('view-hoy').classList.contains('hidden'), hint: !!document.getElementById('ob-hint'), nav: Nav.stack }));
        check('1. "Empezar ▶": guía cerrada, HSK1, en Hoy, con la pista', !(await guideOpen(page)) && st.mod === 'HSK1' && st.hoy && st.hint, JSON.stringify(st));
        check('1. guía vista (v2) y pendencias marcadas', (await ls(page, 'ac_onboarding_done_v2')) === '1' && (await ls(page, 'ac_first_hint_v1')) === 'pending' && (await ls(page, 'ac_first_win_v1')) === 'pending');
        const hintTxt = await page.textContent('#ob-hint');
        check('1. texto de la pista sin "te damos una pista"', /Escribí tu respuesta y tocá Verificar\./.test(hintTxt) && !/pista/.test(hintTxt), JSON.stringify(hintTxt));
        await page.locator('#ob-hint').scrollIntoViewIfNeeded();
        await page.screenshot({ path: OUT + '/impl-hint.png' });
        await page.fill('#answer-input', 'xyz'); await page.click('#btn-check'); await page.waitForTimeout(300);
        check('1. al primer Verificar la pista se va (y no hay mensaje de racha con un error)', !(await page.$('#ob-hint')) && !(await page.$('#ob-win')) && (await ls(page, 'ac_first_hint_v1')) === 'done');
        const ans = await page.evaluate(() => { const s = getFiltered()[state.currentIndex]; return getValidAnswers(s, state.mode === 'es-cn', ck())[0]; });
        await page.fill('#answer-input', ans); await page.click('#btn-check'); await page.waitForTimeout(300);
        const win = await page.evaluate(() => { const w = document.getElementById('ob-win'); return w ? w.textContent : null; });
        check('1. primer acierto: "🔥 ¡Bien! Tu racha empieza hoy."', win === '🔥 ¡Bien! Tu racha empieza hoy.' && (await ls(page, 'ac_first_win_v1')) === 'done', win);
        await page.locator('#ob-win').scrollIntoViewIfNeeded();
        await page.screenshot({ path: OUT + '/impl-win.png' });
        await page.locator('.grade-btn, #btn-good, [data-grade]').first().click().catch(() => {});
        await page.waitForTimeout(500);
        await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(2200);
        check('1. tras recargar: sin guía, sin pista, sin mensaje', !(await guideOpen(page)) && !(await page.$('#ob-hint')) && !(await page.$('#ob-win')));
        check('1. sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    // 2/3/4. "Ya sé algo" → test; "Preparo un examen" → Exámenes; sin elegir → "Listo".
    for (const [choice, label, verify] of [
        ['test', 'Hacer el test ▶', async (p) => JSON.stringify(await p.evaluate(() => Nav.stack)) === '["placement-pop"]' && await p.evaluate(() => !document.getElementById('placement-pop').classList.contains('hidden'))],
        ['examen', 'Elegir examen ▶', async (p) => { await p.waitForTimeout(300); return p.evaluate(() => !document.getElementById('view-hoy').classList.contains('hidden') && !document.getElementById('mod-sheet').classList.contains('hidden') && [...document.querySelectorAll('#ms-body .ms-sec[open]')].map(s => s.dataset.sec).join() === 'hsk,tocfl' && JSON.stringify(Nav.stack) === '["mod-sheet"]'); }],
        [null, 'Listo', async (p) => p.evaluate(() => state.activeModule === 'todas' && !document.getElementById('view-aprender').classList.contains('hidden'))],
    ]) {
        const { ctx, page, errs } = await setup(browser);
        const got = await runFlow(page, choice);
        check((choice || 'sin elegir') + ': botón final "' + label + '"', got === label, got);
        check((choice || 'sin elegir') + ': aplica la elección', await verify(page));
        check((choice || 'sin elegir') + ': sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    // 5. Saltar: guía vista, sin pista; al recargar las claves quedan "done".
    {
        const { ctx, page } = await setup(browser);
        await page.waitForSelector('#guide-pop:not(.hidden)', { timeout: 4000 });
        await page.click('.ob-s-skip');
        check('5. Saltar cierra y marca vista, sin pista', !(await guideOpen(page)) && (await ls(page, 'ac_onboarding_done_v2')) === '1' && !(await page.$('#ob-hint')) && (await ls(page, 'ac_first_hint_v1')) === null);
        await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(600);
        check('5. tras recargar: pista y racha quedan "done"', (await ls(page, 'ac_first_hint_v1')) === 'done' && (await ls(page, 'ac_first_win_v1')) === 'done');
        await ctx.close();
    }

    // 6. Usuarios existentes: v1 cuenta como vista; con respuestas guardadas → "done" al cargar.
    {
        const { ctx, page } = await setup(browser, { ls: { ac_onboarding_done_v1: '1' } });
        await page.waitForTimeout(2200);
        check('6. solo done_v1: no se abre la guía y pista/racha "done"', !(await guideOpen(page)) && (await ls(page, 'ac_first_hint_v1')) === 'done');
        await ctx.close();
    }
    {
        const { ctx, page } = await setup(browser, { ls: { 'chino-espanol-app-v2': JSON.stringify({ score: 7, knownWords: ['你好'] }) } });
        await page.waitForTimeout(600);
        check('6. con respuestas guardadas: pista/racha "done" al cargar', (await ls(page, 'ac_first_hint_v1')) === 'done' && (await ls(page, 'ac_first_win_v1')) === 'done');
        const label = await runFlow(page, 'cero');
        check('6. con respuestas guardadas: terminar la guía no activa la pista', !(await page.$('#ob-hint')) && (await ls(page, 'ac_first_hint_v1')) === 'done', label);
        await ctx.close();
    }

    // 7. 📖 Guía desde Yo + Atrás la cierra (nav.js).
    {
        const { ctx, page } = await setup(browser, { ls: { ac_onboarding_done_v2: '1' } });
        await page.waitForTimeout(500);
        await page.click('#nav-yo'); await page.click('#btn-guide'); await page.waitForTimeout(300);
        check('7. 📖 Guía abre la guía simple sin opción elegida', /¡Hola! 你好/.test(await bodyText(page)) && JSON.stringify(await page.evaluate(() => Nav.stack)) === '["guide-pop"]');
        await page.evaluate(() => history.back()); await page.waitForTimeout(400);
        check('7. Atrás cierra la guía y sigue en la app', !(await guideOpen(page)) && page.url().startsWith(APP));
        check('7. reabrirla no cambió el módulo', await page.evaluate(() => state.activeModule === 'todas'));
        await ctx.close();
    }

    // 8. Interfaz en chino: queda la guía de 6 pasos.
    {
        const { ctx, page } = await setup(browser, { ls: { 'chino-espanol-app-v2': JSON.stringify({ mode: 'cn-es' }) } });
        await page.waitForSelector('#guide-pop:not(.hidden)', { timeout: 4000 });
        const t = await bodyText(page);
        check('8. interfaz en chino: guía actual de 6 pasos', /先学习，再练习/.test(t) && (await page.locator('#guide-body .ob-dot').count()) === 6 && !(await page.evaluate(() => document.getElementById('guide-body').classList.contains('ob-simple'))), JSON.stringify(t.slice(0, 40)));
        await ctx.close();
    }

    // 9. Sin stats.js funciona igual (y con tema oscuro, captura del mensaje).
    {
        const { ctx, page, errs } = await setup(browser, { noStats: true, dark: true });
        check('9. stats.js no cargó', await page.evaluate(() => typeof window.HuayuStats === 'undefined'));
        const label = await runFlow(page, 'cero');
        const ans = await page.evaluate(() => { const s = getFiltered()[state.currentIndex]; return getValidAnswers(s, state.mode === 'es-cn', ck())[0]; });
        await page.fill('#answer-input', ans); await page.click('#btn-check'); await page.waitForTimeout(300);
        check('9. sin stats.js: guía, pista y "Tu racha empieza hoy" funcionan', label === 'Empezar ▶' && !!(await page.$('#ob-win')), label);
        await page.locator('#ob-win').scrollIntoViewIfNeeded();
        await page.screenshot({ path: OUT + '/impl-win-oscuro.png' });
        check('9. sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    await browser.close();
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
