const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const APP = APP_URL;
const LAY = ['exam-pop', 'placement-pop', 'mp-pop', 'talk-pop', 'srs-pop', 'write-pop', 'personal-pop', 'stats-pop', 'backup-pop', 'guide-pop', 'install-help', 'feature-tip-pop', 'vocab-pop', 'tone-legend-pop', 'handwrite-banner', 'writer-practice-banner'];

let fails = 0;
const check = (n, c, x) => { console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + x : '')); if (!c) fails++; };

async function setup(browser, opts) {
    opts = opts || {};
    const ctx = await browser.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'block', permissions: ['microphone'] });
    await ctx.addInitScript((o) => {
        try {
            if (!o.firstVisit) localStorage.setItem('ac_onboarding_done_v2', '1');
            (o.seen || []).forEach((k) => localStorage.setItem('ac_seen_' + k, '1'));
            if (o.mode) { const k = 'chino-espanol-app-v2'; const d = JSON.parse(localStorage.getItem(k) || '{}'); d.mode = o.mode; localStorage.setItem(k, JSON.stringify(d)); }
        } catch (e) {}
    }, opts);
    const modelReqs = [];
    // la descarga del modelo queda "en curso" para siempre (para ver que Atrás no la cancela)
    await ctx.route(/@huggingface\/transformers|huggingface\.co|onnxruntime-web/, (route) => { modelReqs.push(route.request().url()); });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(APP, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    return { ctx, page, errs, modelReqs };
}
const openLayers = (page) => page.evaluate((L) => L.filter((id) => { const e = document.getElementById(id); return e && !e.classList.contains('hidden'); }).concat(document.querySelector('.ve-dl-overlay') ? ['ve-dl'] : []), LAY);
const stack = (page) => page.evaluate(() => Nav.stack);
async function back(page, n) {
    for (let i = 0; i < (n || 1); i++) { try { await page.evaluate(() => history.back()); } catch (e) {} }
    await page.waitForTimeout(350);
}
const inApp = (page) => page.url().startsWith(APP);
const noErr = (errs) => errs.filter((e) => !/localStorage/.test(e));

(async () => {
    const browser = await chromium.launch({
        ...LAUNCH, headless: true,
        args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    });

    // A. Capas simples: abrir con el botón real → Atrás cierra → sin fantasmas (un Atrás más sale).
    const simple = [
        ['A1 test de nivel', 'placement-pop', async (p) => { await p.click('#tab-exams'); await p.click('#btn-placement'); }],
        ['A1b práctica tipo examen (desde Entrenar)', 'exam-pop', async (p) => { await p.click('#nav-entrenar'); await p.click('#btn-exam-practice'); }],
        ['A2 leyenda de tonos', 'tone-legend-pop', async (p) => { await p.click('#nav-hoy'); await p.click('#btn-tools-toggle'); await p.click('#btn-tone-info'); }],
        ['A3 repaso', 'srs-pop', async (p) => { await p.click('#nav-hoy'); await p.click('#btn-srs'); }],
        ['A4 lectura personal', 'personal-pop', async (p) => { await p.click('#nav-entrenar'); await p.fill('#reader-input', '你好，我是学生。'); await p.click('#btn-reader-save'); }],
        ['A5 estadísticas', 'stats-pop', async (p) => { await p.click('#nav-yo'); await p.click('#btn-stats'); }],
        ['A6 respaldo', 'backup-pop', async (p) => { await p.click('#nav-yo'); await p.click('#btn-backup'); }],
        ['A7 ayuda de instalación', 'install-help', async (p) => { await p.click('#nav-yo'); await p.click('#btn-install'); }],
        ['A8 guía (desde Yo)', 'guide-pop', async (p) => { await p.click('#nav-yo'); await p.click('#btn-guide'); }],
        ['A9 pares mínimos', 'mp-pop', async (p) => { await p.click('#nav-entrenar'); await p.click('#btn-mp-pairs'); }, ['pares']],
        ['A10 pronunciación libre', 'talk-pop', async (p) => { await p.click('#nav-entrenar'); await p.click('#btn-train-record'); }, ['talk-libre']],
    ];
    for (const [name, id, opener, seen] of simple) {
        const { ctx, page, errs } = await setup(browser, { seen });
        try { await opener(page); } catch (e) { check(name + ': se pudo abrir', false, e.message.split('\n')[0]); await ctx.close(); continue; }
        await page.waitForTimeout(400);
        const st = await stack(page);
        if (id === 'install-help' && !(await openLayers(page)).includes('install-help')) { console.log('PARCIAL: ' + name + ': el navegador ofreció la instalación nativa; no se probó esa capa'); await ctx.close(); continue; }
        check(name + ': abre y apila', JSON.stringify(st) === JSON.stringify([id]), JSON.stringify(st));
        await back(page);
        check(name + ': Atrás cierra y sigue en la app', (await openLayers(page)).length === 0 && inApp(page) && (await stack(page)).length === 0, JSON.stringify(await openLayers(page)));
        await back(page);
        check(name + ': sin entrada fantasma (un Atrás más sale)', !inApp(page));
        check(name + ': sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    // B. Tip: Atrás cancela (no abre la función) y lo marca visto; "Entendido" → intercambio con la función.
    for (const [name, btn, feature, key] of [['pares mínimos', '#btn-mp-pairs', 'mp-pop', 'pares'], ['pronunciación libre', '#btn-train-record', 'talk-pop', 'talk-libre']]) {
        {
            const { ctx, page } = await setup(browser);
            await page.click('#nav-entrenar'); await page.click(btn); await page.waitForTimeout(400);
            check('B tip ' + name + ': aparece y apila', JSON.stringify(await stack(page)) === '["feature-tip-pop"]', JSON.stringify(await stack(page)));
            await back(page); await page.waitForTimeout(200);
            const r = await page.evaluate((k) => localStorage.getItem('ac_seen_' + k), key);
            check('B tip ' + name + ': Atrás lo cierra SIN abrir la función', (await openLayers(page)).length === 0 && inApp(page), JSON.stringify(await openLayers(page)));
            check('B tip ' + name + ': queda marcado visto (igual que hoy)', r === '1', r);
            await ctx.close();
        }
        {
            const { ctx, page } = await setup(browser);
            await page.click('#nav-entrenar'); await page.click(btn); await page.waitForTimeout(400);
            await page.click('#btn-ft-ok'); await page.waitForTimeout(400);
            check('B tip ' + name + ': "Entendido" → intercambio (una sola entrada)', JSON.stringify(await stack(page)) === JSON.stringify([feature]), JSON.stringify(await stack(page)));
            await back(page);
            check('B tip ' + name + ': Atrás cierra la función', (await openLayers(page)).length === 0 && inApp(page));
            await back(page);
            check('B tip ' + name + ': sin entrada fantasma', !inApp(page));
            await ctx.close();
        }
    }

    // C. Estadísticas → respaldo (intercambio).
    {
        const { ctx, page } = await setup(browser);
        await page.click('#nav-yo'); await page.click('#btn-stats'); await page.waitForTimeout(400);
        await page.click('#btn-stats-backup'); await page.waitForTimeout(400);
        check('C stats → respaldo: intercambio (una sola entrada)', JSON.stringify(await stack(page)) === '["backup-pop"]', JSON.stringify(await stack(page)) + ' visibles=' + JSON.stringify(await openLayers(page)));
        await back(page);
        check('C stats → respaldo: Atrás cierra el respaldo', (await openLayers(page)).length === 0 && inApp(page));
        await back(page);
        check('C stats → respaldo: sin entrada fantasma', !inApp(page));
        await ctx.close();
    }

    // D. Guía → repaso / → estadísticas (intercambio).
    for (const [linkId, target] of [['ob-srs-btn', 'srs-pop'], ['ob-streak-btn', 'stats-pop']]) {
        const { ctx, page } = await setup(browser, { mode: 'cn-es' });
        await page.click('#nav-yo'); await page.click('#btn-guide'); await page.waitForTimeout(300);
        for (let i = 0; i < 6 && !(await page.locator('#' + linkId + ':visible').count()); i++) {
            const next = page.locator('#guide-body button:visible').filter({ hasText: /Siguiente|→|下一|▶/ }).last();
            if (!(await next.count())) break;
            await next.click(); await page.waitForTimeout(200);
        }
        if (!(await page.locator('#' + linkId + ':visible').count())) { check('D guía → ' + target + ': enlace encontrado', false); await ctx.close(); continue; }
        await page.click('#' + linkId); await page.waitForTimeout(400);
        check('D guía → ' + target + ': intercambio (una sola entrada)', JSON.stringify(await stack(page)) === JSON.stringify([target]), JSON.stringify(await stack(page)) + ' visibles=' + JSON.stringify(await openLayers(page)));
        await back(page);
        check('D guía → ' + target + ': Atrás cierra y sigue en la app', (await openLayers(page)).length === 0 && inApp(page));
        await back(page);
        check('D guía → ' + target + ': sin entrada fantasma', !inApp(page));
        await ctx.close();
    }

    // E. Guía de primera visita (se abre sola): sin entrada hasta el primer toque.
    {
        const { ctx, page, errs } = await setup(browser, { firstVisit: true });
        await page.waitForTimeout(800);
        const ol = await openLayers(page);
        if (!ol.includes('guide-pop')) { console.log('PARCIAL: la guía no se abrió sola en esta carga; no se probó su Atrás'); }
        else {
            check('E guía automática: sin entrada antes de tocarla', (await stack(page)).length === 0, JSON.stringify(await stack(page)));
            await page.locator('#guide-body .ob-title').click(); await page.waitForTimeout(400);
            check('E guía automática: el primer toque crea la entrada', JSON.stringify(await stack(page)) === '["guide-pop"]', JSON.stringify(await stack(page)));
            await back(page);
            const done = await page.evaluate(() => localStorage.getItem('ac_onboarding_done_v2'));
            check('E guía automática: Atrás la cierra como el ✕ (queda vista)', (await openLayers(page)).length === 0 && inApp(page) && done === '1', 'done=' + done);
        }
        check('E sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    // F. Escribir a mano ↔ banner de trazos.
    {
        const { ctx, page, errs } = await setup(browser);
        await page.click('#nav-entrenar'); await page.click('#btn-train-write'); await page.waitForTimeout(400);
        check('F Escribir a mano: abre y apila', JSON.stringify(await stack(page)) === '["write-pop"]', JSON.stringify(await stack(page)));
        const row = page.locator('#write-body .wr-row').first();
        if (await row.count()) {
            await row.click(); await page.waitForTimeout(400);
            check('F lista → banner: intercambio', JSON.stringify(await stack(page)) === '["handwrite-banner"]', JSON.stringify(await stack(page)));
            await back(page); await page.waitForTimeout(200);
            check('F Atrás en el banner vuelve a la lista (como el ✕)', JSON.stringify(await stack(page)) === '["write-pop"]' && (await openLayers(page)).includes('write-pop'), JSON.stringify(await stack(page)));
        } else console.log('     (lista vacía en un perfil nuevo: el cambio lista ↔ banner se cubre en G)');
        await back(page);
        check('F Atrás cierra Escribir a mano', (await openLayers(page)).length === 0 && inApp(page));
        await back(page);
        check('F sin entrada fantasma', !inApp(page));
        check('F sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    // G. Lista ↔ banner con una palabra en la lista (openWriteWord es el camino real de la fila).
    {
        const { ctx, page } = await setup(browser);
        await page.click('#nav-entrenar'); await page.click('#btn-train-write'); await page.waitForTimeout(400);
        await page.evaluate(() => { const b = document.getElementById('write-body'); const d = document.createElement('div'); d.className = 'wr-row'; d.dataset.zh = '你好'; d.textContent = '你好'; b.appendChild(d); });
        await page.click('#write-body .wr-row[data-zh="你好"]'); await page.waitForTimeout(400);
        check('G lista → banner: intercambio', JSON.stringify(await stack(page)) === '["handwrite-banner"]', JSON.stringify(await stack(page)));
        await back(page); await page.waitForTimeout(200);
        check('G Atrás en el banner vuelve a la lista', JSON.stringify(await stack(page)) === '["write-pop"]', JSON.stringify(await stack(page)));
        await back(page);
        check('G Atrás cierra la lista', (await openLayers(page)).length === 0 && inApp(page));
        await back(page);
        check('G sin entrada fantasma', !inApp(page));
        await ctx.close();
    }

    // H. Aviso de descarga: Atrás = "Ahora no"; con la descarga ya aceptada, Atrás no la cancela.
    {
        const { ctx, page, errs, modelReqs } = await setup(browser, { seen: ['talk-libre'] });
        await page.click('#nav-entrenar'); await page.click('#btn-train-record'); await page.waitForTimeout(400);
        await page.click('#tk-record'); await page.waitForTimeout(400);
        check('H aviso: apilado sobre pronunciación libre', JSON.stringify(await stack(page)) === '["talk-pop","ve-dl"]', JSON.stringify(await stack(page)));
        await back(page);
        const s1 = await page.evaluate(() => ({ cls: document.getElementById('tk-record').className, eng: VE.engine.status }));
        check('H Atrás = "Ahora no": aviso cerrado, no graba, no descarga', !(await openLayers(page)).includes('ve-dl') && (await openLayers(page)).includes('talk-pop') && !/is-recording/.test(s1.cls) && modelReqs.length === 0, JSON.stringify(s1) + ' pedidos=' + modelReqs.length);
        await page.click('#tk-record'); await page.waitForTimeout(400);
        await page.getByRole('button', { name: 'Descargar ahora' }).click(); await page.waitForTimeout(800);
        const s2 = await page.evaluate(() => ({ cls: document.getElementById('tk-record').className, eng: VE.engine.status }));
        check('H "Descargar ahora": graba y la descarga está en curso', /is-recording/.test(s2.cls) && s2.eng === 'loading' && modelReqs.length > 0, JSON.stringify(s2));
        await back(page);
        const s3 = await page.evaluate(() => ({ eng: VE.engine.status }));
        check('H Atrás cierra pronunciación libre (corta la grabación) pero NO la descarga', (await openLayers(page)).length === 0 && inApp(page) && s3.eng === 'loading', JSON.stringify(s3));
        check('H sin errores JS', noErr(errs).length === 0, noErr(errs).join(' | '));
        await ctx.close();
    }

    await browser.close();
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
