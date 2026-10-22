const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('navegacion-tanda1');
const APP = APP_URL;
const LAY = ['lesson-pop', 'dele-pop', 'cread-pop', 'podcast-pop', 'daily-story-pop', 'vocab-pop', 'writer-practice-banner', 'handwrite-banner'];

// WAV de 30 s (8 kHz, 16 bit, mono, tono suave) para simular /api/tts
function wav(seconds) {
    const sr = 8000, n = sr * seconds, buf = Buffer.alloc(44 + n * 2);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
    buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24);
    buf.writeUInt32LE(sr * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
    for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(800 * Math.sin(2 * Math.PI * 220 * i / sr)), 44 + i * 2);
    return buf.toString('base64');
}
const WAV30 = wav(30);
const WAV2 = wav(2);

let fails = 0;
const check = (n, c, x) => { console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + x : '')); if (!c) fails++; };

async function setup(browser, opts) {
    opts = opts || {};
    const ctx = await browser.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'block' });
    await ctx.addInitScript((o) => {
        try {
            localStorage.setItem('ac_onboarding_done_v2', '1');
            if (o.kara) localStorage.setItem('ac_karaoke', '1');
            if (o.mode) { const k = 'chino-espanol-app-v2'; const d = JSON.parse(localStorage.getItem(k) || '{}'); d.mode = o.mode; localStorage.setItem(k, JSON.stringify(d)); }
        } catch (e) {}
        // audio sonando ahora (para verificar que Atrás lo corta)
        window.__playing = new Set();
        const P = HTMLMediaElement.prototype, play = P.play, pause = P.pause;
        P.play = function () { window.__playing.add(this); this.addEventListener('ended', () => window.__playing.delete(this), { once: true }); return play.apply(this, arguments); };
        P.pause = function () { window.__playing.delete(this); return pause.apply(this, arguments); };
    }, opts);
    await ctx.route('**/api/tts**', (route) => {
        if (route.request().method() === 'GET') return route.fulfill({ status: 404, body: '' });
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ audio: opts.short ? WAV2 : WAV30, mime: 'audio/wav' }) });
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(APP, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    return { ctx, page, errs };
}
const openLayers = (page) => page.evaluate((L) => L.filter((id) => { const e = document.getElementById(id); return e && !e.classList.contains('hidden'); }), LAY);
const stack = (page) => page.evaluate(() => Nav.stack);
async function back(page, n) {
    for (let i = 0; i < (n || 1); i++) { try { await page.evaluate(() => history.back()); } catch (e) { /* salió de la app */ } }
    await page.waitForTimeout(350);
}
const inApp = (page) => page.url().startsWith(APP);
async function openLesson(page) {
    await page.locator('[data-act="read"]:visible').first().click();
    await page.waitForTimeout(250);
    if (await page.locator('#lq-gloss-continue:visible').count()) await page.click('#lq-gloss-continue');
    await page.waitForTimeout(250);
}

(async () => {
    const browser = await chromium.launch({ ...LAUNCH, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });

    // 1. Lección: Atrás cierra y no sale; con nada abierto, Atrás sale.
    {
        const { ctx, page, errs } = await setup(browser);
        await openLesson(page);
        check('1. abrir lección apila', JSON.stringify(await stack(page)) === '["lesson-pop"]', JSON.stringify(await stack(page)));
        await back(page);
        check('1. Atrás cierra la lección y sigue en la app', (await openLayers(page)).length === 0 && inApp(page) && (await stack(page)).length === 0);
        await back(page);
        check('1. con nada abierto, Atrás sale de la app', !inApp(page), page.url());
        check('1. sin errores JS', errs.filter((e) => !/localStorage/.test(e)).length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 2/3. Capas apiladas: lección + ficha. Atrás de a una; luego doble Atrás rápido.
    for (const rapid of [false, true]) {
        const { ctx, page } = await setup(browser);
        await openLesson(page);
        await page.locator('#lesson-pop .lq-ch:visible').first().click();
        await page.waitForTimeout(300);
        const st = await stack(page);
        check((rapid ? '3' : '2') + '. lección + ficha apiladas', JSON.stringify(st) === '["lesson-pop","vocab-pop"]', JSON.stringify(st));
        if (!rapid) {
            await back(page);
            check('2. 1.er Atrás cierra solo la ficha', JSON.stringify(await openLayers(page)) === '["lesson-pop"]', JSON.stringify(await openLayers(page)));
            await back(page);
            check('2. 2.º Atrás cierra la lección, sigue en la app', (await openLayers(page)).length === 0 && inApp(page));
        } else {
            await page.evaluate(() => { history.back(); history.back(); });
            await page.waitForTimeout(500);
            check('3. doble Atrás rápido: cierra las dos y sigue en la app', (await openLayers(page)).length === 0 && inApp(page) && (await stack(page)).length === 0, JSON.stringify(await openLayers(page)));
            await back(page);
            check('3. después, un Atrás sale de la app', !inApp(page));
        }
        await ctx.close();
    }

    // 4. Cerrar por ✕ / Escape / fondo no deja entradas fantasma.
    for (const how of ['✕', 'Escape', 'fondo']) {
        const { ctx, page } = await setup(browser);
        await openLesson(page);
        if (how === '✕') await page.click('#lq-close');
        else if (how === 'Escape') await page.keyboard.press('Escape');
        else {
            const pt = await page.evaluate(() => {
                const pop = document.getElementById('lesson-pop');
                for (let y = 2; y < innerHeight; y += 6) for (const x of [2, innerWidth - 3]) if (document.elementFromPoint(x, y) === pop) return { x, y };
                return null;
            });
            if (pt) await page.mouse.click(pt.x, pt.y);
            else await page.evaluate(() => document.getElementById('lesson-pop').click()); // sin fondo visible a este ancho: clic sobre la capa misma
            console.log('     fondo:', pt ? 'toque real en ' + JSON.stringify(pt) : 'no hay fondo visible a 400 px → clic sobre la capa');
        }
        await page.waitForTimeout(250);
        check('4. cierre por ' + how + ': capa cerrada', (await openLayers(page)).length === 0);
        await back(page);
        check('4. cierre por ' + how + ': sin entrada fantasma (un Atrás sale)', !inApp(page), page.url());
        await ctx.close();
    }

    // 5. Ficha → Practicar (intercambio o apilado) y vuelta atrás ordenada.
    {
        const { ctx, page, errs } = await setup(browser);
        await openLesson(page);
        await page.locator('#lesson-pop .lq-ch:visible').first().click();
        await page.waitForTimeout(300);
        await page.locator('#vocab-pop .vp-stroke-quiz:visible').first().click();
        await page.waitForTimeout(400);
        const ol = await openLayers(page), st = await stack(page);
        check('5. Practicar: pila = capas visibles', JSON.stringify(ol) === JSON.stringify(st), 'visibles=' + JSON.stringify(ol) + ' pila=' + JSON.stringify(st));
        await back(page);
        check('5. Atrás cierra el banner de trazos', !(await openLayers(page)).includes('writer-practice-banner'), JSON.stringify(await openLayers(page)));
        const rest = (await openLayers(page)).length;
        await back(page, rest);
        check('5. Atrás hasta vaciar: sigue en la app', (await openLayers(page)).length === 0 && inApp(page));
        await back(page);
        check('5. un Atrás más sale (historial consistente)', !inApp(page));
        check('5. sin errores JS', errs.filter((e) => !/localStorage/.test(e)).length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 6/7. Karaoke 30 s: el observador no dispara; Atrás corta audio y karaoke.
    {
        const { ctx, page, errs } = await setup(browser, { kara: true, short: true });
        await openLesson(page);
        await page.evaluate(() => {
            window.__karaMut = 0;
            new MutationObserver((r) => { window.__karaMut += r.length; }).observe(document.getElementById('lesson-pop'), { subtree: true, attributes: true, attributeFilter: ['class'] });
        });
        const before = await page.evaluate(() => ({ ...Nav.stats }));
        const lines = page.locator('#lesson-pop .lq-line-say');
        const nLines = await lines.count();
        const t0 = Date.now(); let i = 0, played = 0;
        while (Date.now() - t0 < 30000) {
            await lines.nth(i % nLines).scrollIntoViewIfNeeded().catch(() => {});
            await lines.nth(i % nLines).click().catch(() => {});
            await page.waitForTimeout(400);
            if (await page.evaluate(() => window.__playing.size > 0)) played++;
            i++;
            await page.waitForTimeout(1900);
        }
        const after = await page.evaluate(() => ({ ...Nav.stats, kara: window.__karaMut }));
        console.log('     karaoke 30 s (' + i + ' líneas): cambios de clase del karaoke =', after.kara, '| observador de nav.js:', after.observer - before.observer, 'disparos,', after.syncs - before.syncs, 'sincronizaciones');
        check('6. el audio de las líneas suena', played > 0, played + '/' + i);
        check('7. karaoke activo durante los 30 s', after.kara > 0, after.kara);
        check('7. el observador de nav.js no dispara durante el karaoke', after.observer - before.observer === 0, after.observer - before.observer);
        await lines.nth(0).click();
        await page.waitForTimeout(600);
        const pre = await page.evaluate(() => ({ playing: window.__playing.size, kOn: document.querySelectorAll('.k-on').length }));
        await back(page);
        const s2 = await page.evaluate(() => ({ playing: window.__playing.size, kOn: document.querySelectorAll('.k-on').length }));
        check('6. Atrás corta audio y karaoke (stopSpeak)', pre.playing > 0 && s2.playing === 0 && s2.kOn === 0, 'antes=' + JSON.stringify(pre) + ' después=' + JSON.stringify(s2));
        check('6. sin errores JS', errs.length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 8. Lector de clásicos. 9. Escena diaria. 10. Podcast.
    const simple = [
        ['8. clásicos', 'cread-pop', async (p) => { await p.click('#tab-classics'); await p.locator('#cread-list .cr-card').first().click(); }],
        ['9. escena diaria', 'daily-story-pop', async (p) => {
            await p.click('#tab-daily'); await p.click('#btn-daily-toggle');
            const mod = await p.evaluate(() => Object.keys(DAILY_STORIES)[0]);
            await p.locator('#daily-menu .cat-btn[data-module="' + mod + '"]').first().click();
        }],
        ['10. podcast', 'podcast-pop', async (p) => { await p.click('#nav-entrenar'); await p.click('#btn-podcast'); }],
    ];
    for (const [name, id, opener] of simple) {
        const { ctx, page, errs } = await setup(browser);
        try { await opener(page); } catch (e) { check(name + ': se pudo abrir', false, e.message.split('\n')[0]); await ctx.close(); continue; }
        await page.waitForTimeout(400);
        check(name + ': abre y apila', JSON.stringify(await stack(page)) === JSON.stringify([id]), JSON.stringify(await stack(page)));
        await back(page);
        check(name + ': Atrás cierra y sigue en la app', (await openLayers(page)).length === 0 && inApp(page) && (await stack(page)).length === 0);
        check(name + ': sin errores JS', errs.length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 11. DELE (interfaz en chino): Atrás; y Escape con la ficha encima cierra solo la ficha.
    {
        const { ctx, page, errs } = await setup(browser, { mode: 'cn-es' });
        const btn = page.locator('#dele-wrap [data-act="read"]:visible, #dele-wrap button:visible:has-text("阅读")').first();
        try { await btn.click(); } catch (e) { check('11. DELE: se pudo abrir', false, e.message.split('\n')[0]); }
        await page.waitForTimeout(400);
        check('11. DELE: abre y apila', JSON.stringify(await stack(page)) === '["dele-pop"]', JSON.stringify(await stack(page)));
        const ch = page.locator('#dele-pop .lq-ch:visible').first();
        if (await ch.count()) {
            await ch.click(); await page.waitForTimeout(300);
            await page.keyboard.press('Escape'); await page.waitForTimeout(300);
            check('11. DELE: Escape con la ficha encima cierra solo la ficha', JSON.stringify(await openLayers(page)) === '["dele-pop"]', JSON.stringify(await openLayers(page)));
        } else console.log('     (DELE sin caracteres tocables en esta vista: Escape+ficha no aplica)');
        await back(page);
        check('11. DELE: Atrás cierra y sigue en la app', (await openLayers(page)).length === 0 && inApp(page));
        check('11. sin errores JS', errs.length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 12. Banner de respuesta a mano (desde Hoy).
    {
        const { ctx, page, errs } = await setup(browser);
        await page.click('#nav-hoy'); await page.waitForTimeout(300);
        const b = page.locator('#btn-handwrite:visible');
        if (await b.count()) {
            await b.click(); await page.waitForTimeout(400);
            check('12. respuesta a mano: abre y apila', JSON.stringify(await stack(page)) === '["handwrite-banner"]', JSON.stringify(await stack(page)));
            await back(page);
            check('12. respuesta a mano: Atrás cierra', (await openLayers(page)).length === 0 && inApp(page));
        } else console.log('     (✍️ no visible en esta tarjeta: se prueba en la tanda 2 desde Escribir a mano)');
        check('12. sin errores JS', errs.length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 13. Atrás con un input enfocado (teclado abierto) y una capa encima.
    {
        const { ctx, page } = await setup(browser);
        await page.click('#nav-hoy'); await page.waitForTimeout(300);
        await page.fill('#answer-input', 'hola');
        await page.locator('#vocab-list .vocab-item, .vocab-item').first().click().catch(() => {});
        await page.waitForTimeout(300);
        if (!(await openLayers(page)).includes('vocab-pop')) {
            await page.evaluate(() => { if (typeof showVocabPop === 'function') showVocabPop('你好'); });
            await page.waitForTimeout(300);
        }
        await page.focus('#answer-input');
        await page.waitForTimeout(150);
        const opened = (await openLayers(page)).includes('vocab-pop');
        await back(page);
        const r = await page.evaluate(() => ({ v: document.getElementById('answer-input').value, open: !document.getElementById('vocab-pop').classList.contains('hidden') }));
        check('13. input enfocado + ficha: Atrás cierra la ficha y el texto queda', opened && !r.open && r.v === 'hola' && inApp(page), JSON.stringify({ opened, ...r }));
        await ctx.close();
    }

    // 14. Recarga dentro de una lección.
    {
        const { ctx, page, errs } = await setup(browser);
        await openLesson(page);
        await page.reload({ waitUntil: 'load' });
        await page.waitForTimeout(700);
        check('14. tras recargar: ninguna capa abierta', (await openLayers(page)).length === 0);
        const loads = [];
        page.on('load', () => loads.push(page.url()));
        await back(page);
        await page.waitForTimeout(800);
        check('14. tras recargar, un Atrás sale de la app (sin pulsaciones de más)', !inApp(page), page.url() + ' cargas intermedias=' + loads.length);
        check('14. sin errores JS', errs.filter((e) => !/localStorage/.test(e)).length === 0, errs.join(' | '));
        await ctx.close();
    }

    // 15. Adelante (escritorio) después de cerrar con Atrás.
    {
        const { ctx, page } = await setup(browser);
        await openLesson(page);
        await back(page);
        try { await page.evaluate(() => history.forward()); } catch (e) {}
        await page.waitForTimeout(400);
        check('15. Adelante no reabre ni rompe la pila', (await openLayers(page)).length === 0 && (await stack(page)).length === 0 && inApp(page));
        await back(page);
        check('15. después, un Atrás sale de la app', !inApp(page));
        await ctx.close();
    }

    await browser.close();
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
