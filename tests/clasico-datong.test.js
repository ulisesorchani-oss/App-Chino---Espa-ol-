// tests/clasico-datong.test.js — el clásico 禮運大同篇 en el lector de clásicos (classics-datong.js + classics-reader.js).
//   · aparece en la lista de Clásicos (10.º) y NO en la hoja de módulos de Hoy (siguen 9)
//   · arranca en tradicional; con 简 elegido para «HSK y el resto», simplificado; con 繁 elegido, tradicional
//   · cada carácter muestra el zhuyin GUARDADO (el del PDF); el botón Pinyin muestra el pinyin guardado (長 zhǎng, 惡 wù, 分 fèn),
//     nunca el de pinyin-pro (cháng, è, fēn), también si el pinyin ya estaba ON al abrir y tras re-dibujar
//   · sin fichas (.lq-ch), sin karaoke ni «Practicar»; 🔊 pide el audio del texto de la línea; marcas de cambio de tono
//   · traducción y notas del PDF; nivel aproximado y fuente a la vista; sin desborde a 320/360 px en los tres temas
//   · regresión: 大學 sigue con caracteres tocables, karaoke, práctica y pinyin generado
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS' };
const K = 'Clasicos-Datong';
(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
    async function abrir({ th = 'light', sc = '', w = 360, pyOn = false, mod = K } = {}) {
        const ctx = await b.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
        await ctx.addInitScript(([th, sc]) => { localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('theme', th); if (sc) localStorage.setItem('ac_script_hsk', sc); }, [th, sc]);
        const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
        const tts = [];
        await p.route(/\/api\/tts/, (route) => {
            const req = route.request();
            if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let text = new URL(req.url()).searchParams.get('text') || '';
            try { text = JSON.parse(req.postData() || '{}').text || text; } catch (e) { /* GET */ }
            tts.push(text);
            return route.fulfill({ status: 503, headers: Object.assign({ 'content-type': 'application/json', 'cache-control': 'no-store' }, CORS), body: '{"error":"prueba"}' });
        });
        await p.goto(APP_URL); await p.waitForTimeout(1200);
        await p.evaluate(() => showView('aprender')); await p.click('#tab-classics'); await p.waitForTimeout(250);
        if (pyOn) { // el pinyin queda ON en el lector (CR.pinyin) al abrir otro clásico antes
            await p.click('#cread-list .cr-card[data-mod="Clasicos-Daxue"]'); await p.waitForTimeout(250);
            await p.click('#cr-py'); await p.waitForTimeout(150); await p.click('#cr-close'); await p.waitForTimeout(150);
        }
        await p.click('#cread-list .cr-card[data-mod="' + mod + '"]'); await p.waitForTimeout(350);
        return { ctx, p, errs, tts };
    }
    const leer = (p) => p.evaluate((K) => {
        const Z = CLASSIC_ZY[K], T = CLASSIC_T.line[K], L = CLASSIC_TEXTS[K].blocks[0].l, body = document.getElementById('cr-body');
        const lines = [...body.querySelectorAll('.lq-line')];
        return {
            n: lines.length,
            zh: lines.map(l => [...l.querySelectorAll('.cr-h')].map(x => x.textContent).join('')),
            zy: lines.map(l => [...l.querySelectorAll('.cr-zy')].map(x => x.textContent).join(' ')),
            zyVis: [...body.querySelectorAll('.cr-zy')].filter(x => x.offsetParent !== null).length,
            py: lines.map(l => l.querySelector('.lq-line-py')), // se lee abajo
            pyTxt: lines.map(l => l.querySelector('.lq-line-py').textContent), pyHidden: lines.map(l => l.querySelector('.lq-line-py').classList.contains('hidden')),
            say: lines.map(l => l.querySelector('.lq-line-say').dataset.zh),
            es: lines.map(l => l.querySelector('.lq-line-es').textContent), notas: [...body.querySelectorAll('.cr-nota')].map(x => x.textContent),
            want: { zy: Z.lineas.map(cz => cz.map(c => c.zy).join(' ')), py: Z.lineas.map(cz => cz.map(c => c.py).join(' ')), trad: T.map(t => [...t].filter(c => /[㐀-鿿]/.test(c)).join('')),
                simp: L.map(x => [...x[0]].filter(c => /[㐀-鿿]/.test(c)).join('')), es: L.map(x => x[1]), notas: Z.notas.filter(Boolean),
                gen: L.map(x => pinyinPro.pinyin(x[0].replace(/[^㐀-鿿]/g, ''))) },
            lch: body.querySelectorAll('.lq-ch').length, t32: [...body.querySelectorAll('.cr-t32 .cr-h')].map(x => x.textContent).join(''),
            kara: !!document.getElementById('cr-kara'), pract: !!document.getElementById('cr-practice'), zyBtn: !!document.getElementById('cr-zy'),
            texto: body.innerText, titulo: body.querySelector('.lq-story-zh').textContent,
            desb: document.documentElement.scrollWidth > innerWidth + 1,
            fuera: [...body.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 0.5; }).map(e => e.className).slice(0, 3)
        };
    }, K);

    // 1) lista y hoja de módulos
    {
        const { ctx, p, errs } = await abrir();
        const L = await p.evaluate(() => ({ cards: [...document.querySelectorAll('#cread-list .cr-card')].map(c => c.dataset.mod), mods: CR_DEBUG.mods, enHoy: CLASSICS_MODULES.includes('Clasicos-Datong') }));
        ok(L.cards.length === 10 && L.cards[9] === K && L.mods === 10, 'lista de Clásicos: 10 tarjetas, la nueva al final ' + L.cards.slice(-1));
        ok(!L.enHoy, 'no entra en Hoy (CLASSICS_MODULES)');
        await p.click('#cr-close'); await p.evaluate(() => showView('hoy')); await p.click('#mod-btn'); await p.waitForTimeout(300);
        const cls = await p.evaluate(() => document.querySelectorAll('.ms-sec[data-sec="classics"] .ms-item').length);
        ok(cls === 9, 'hoja de módulos de Hoy: siguen 9 clásicos (' + cls + ')');
        ok(!errs.length, 'lista sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    // 2) el lector, por escritura, tema y ancho
    for (const [th, sc, w] of [['light', '', 320], ['dark', 'simp', 320], ['paper', 'trad', 360], ['light', 'simp', 360]]) {
        const { ctx, p, errs, tts } = await abrir({ th, sc, w });
        const tag = th + '/' + (sc || 'sin elegir') + '/' + w;
        let r = await leer(p);
        const trad = sc !== 'simp';
        ok(r.n === 20, tag + ' 20 frases');
        ok(JSON.stringify(r.zh) === JSON.stringify(trad ? r.want.trad : r.want.simp), tag + ' escritura ' + (trad ? 'tradicional' : 'simplificada') + ' (título ' + r.titulo + ')');
        ok(r.titulo === (trad ? '禮運大同篇' : '礼运大同篇'), tag + ' título en la escritura');
        ok(JSON.stringify(r.zy) === JSON.stringify(r.want.zy) && r.zyVis === 107, tag + ' zhuyin guardado sobre los 107 caracteres');
        ok(r.lch === 0 && !r.kara && !r.pract && r.zyBtn, tag + ' sin fichas, sin karaoke ni «Practicar»; con botón ㄅ');
        ok(r.t32 === '老有有所有女', tag + ' marcas de cambio de tono: ' + r.t32);
        ok(JSON.stringify(r.es) === JSON.stringify(r.want.es) && JSON.stringify(r.notas) === JSON.stringify(r.want.notas), tag + ' traducción y notas del PDF');
        ok(/Nivel: avanzado \(nivel aproximado\)/.test(r.texto) && /Fuente: PDF «Presentación con traducción» \(autoría a confirmar\)/.test(r.texto), tag + ' nivel aproximado y fuente a la vista');
        ok(r.pyHidden.every(Boolean), tag + ' pinyin oculto al abrir');
        await p.click('#cr-py'); await p.waitForTimeout(150); r = await leer(p);
        ok(JSON.stringify(r.pyTxt) === JSON.stringify(r.want.py), tag + ' Pinyin ON: el pinyin guardado (del zhuyin), frase por frase');
        ok(r.pyTxt[8].includes('zhǎng') && r.pyTxt[12].includes('wù') && r.pyTxt[11].includes('fèn') && !r.pyTxt[8].split(' ').includes('cháng') && !r.pyTxt[12].split(' ').includes('è') && !r.pyTxt[11].split(' ').includes('fēn'), tag + ' 長 zhǎng, 惡 wù, 分 fèn (no el pinyin generado)');
        await p.click('#cr-zy'); await p.waitForTimeout(100);
        r = await leer(p); ok(r.zyVis === 0, tag + ' ㄅ OFF oculta el zhuyin');
        await p.click('#cr-zy'); await p.waitForTimeout(100);
        r = await leer(p); ok(r.zyVis === 107, tag + ' ㄅ ON lo vuelve a mostrar');
        ok(!r.desb && !r.fuera.length, tag + ' sin desborde horizontal ' + JSON.stringify(r.fuera));
        // tocar un carácter no abre la ficha
        await p.click('#cr-body .cr-h >> nth=3'); await p.waitForTimeout(200);
        const pop = await p.evaluate(() => { const v = document.getElementById('vocab-pop'); return !!v && !v.classList.contains('hidden'); });
        ok(!pop, tag + ' tocar un carácter no abre la ficha de palabra');
        if (th === 'light' && w === 320) {
            await p.click('#cr-body .lq-line-say >> nth=0'); await p.waitForTimeout(600);
            ok(tts.includes(r.say[0]), tag + ' 🔊 pide el audio de «' + r.say[0] + '» ' + JSON.stringify(tts.slice(-1)));
        }
        ok(!errs.length, tag + ' sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    // 3) pinyin ya ON al abrir (viene de otro clásico) y re-dibujado por cambio de escritura
    {
        const { ctx, p, errs } = await abrir({ pyOn: true });
        let r = await leer(p);
        ok(!r.pyHidden[0] && JSON.stringify(r.pyTxt) === JSON.stringify(r.want.py), 'pinyin ON al abrir: el guardado, no el generado');
        await p.evaluate(() => setCharType('simp')); await p.waitForTimeout(250);
        r = await leer(p);
        ok(JSON.stringify(r.zh) === JSON.stringify(r.want.simp) && JSON.stringify(r.pyTxt) === JSON.stringify(r.want.py), 'tras 简 (re-dibujado): simplificado y el mismo pinyin guardado');
        ok(!errs.length, 'pinyin ON sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    // 4) regresión: 大學 no cambia
    {
        const { ctx, p, errs } = await abrir({ mod: 'Clasicos-Daxue' });
        await p.click('#cr-py'); await p.waitForTimeout(150);
        const r = await p.evaluate(() => { const body = document.getElementById('cr-body'), l = body.querySelector('.lq-line');
            return { lch: body.querySelectorAll('.lq-ch').length, zy: body.querySelectorAll('.cr-zy, #cr-zy').length, kara: !!document.getElementById('cr-kara'), pract: !!document.getElementById('cr-practice'),
                py: l.querySelector('.lq-line-py').textContent, gen: pinyinPro.pinyin(l.querySelector('.lq-line-say').dataset.zh), nivel: !!body.querySelector('.cr-nivel') }; });
        ok(r.lch > 0 && r.zy === 0 && r.kara && r.pract && !r.nivel, '大學: caracteres tocables, karaoke y «Practicar»; sin zhuyin ni nivel');
        ok(r.py === r.gen, '大學: pinyin generado como siempre');
        ok(!errs.length, '大學 sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails);
    process.exit(fails ? 1 : 0);
})();
