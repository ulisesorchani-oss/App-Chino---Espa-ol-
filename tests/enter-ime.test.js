// fix/enter-ime: Enter MIENTRAS se compone con un IME (pinyin, zhuyin…) no envía la respuesta ni guarda la oración propia.
// Con un IME, Enter confirma el candidato elegido y el keydown lleva isComposing: true o keyCode 229. Se filtran las dos señales
// (la misma guarda que ya usan prodCheck/recallCheck en srs.js:577 y :586).
//   · #answer-input (app.js): antes enviaba la respuesta (checkAnswer / confirmDefaultGrade) a medio escribir.
//   · .vp-own-input de «Sumar a mi repaso» (srs.js): antes guardaba la tarjeta con la oración a medias.
//   · El Enter normal sigue enviando, y el keydown de composición NO se cancela (preventDefault): el IME lo necesita.
// Dos niveles: eventos SINTÉTICOS (keydown con isComposing/keyCode) y, en Chromium, teclado y composición REALES (Playwright +
// CDP Input.imeSetComposition). No se probó con un IME de verdad (pinyin del sistema) ni en teclados de celular.
// No toca checkAnswer ni el algoritmo del SRS (se espían, no se cambian).
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

    // ---- #answer-input ----
    const casos = [
        ['Enter normal', {}, true],
        ['isComposing: true', { isComposing: true }, false],
        ['keyCode 229 solo', { keyCode: 229 }, false],
        ['isComposing: true y keyCode 229', { isComposing: true, keyCode: 229 }, false]
    ];
    for (const answered of [false, true]) {
        for (const [nombre, init, debeEnviar] of casos) {
            const r = await p.evaluate(([answered, init]) => {
                showView('hoy');
                const inp = document.getElementById('answer-input'); let chk = 0, conf = 0;
                const oc = window.checkAnswer, ocg = window.confirmDefaultGrade;
                window.checkAnswer = function () { chk++; }; window.confirmDefaultGrade = function () { conf++; };   // espías (no se modifica el código)
                state.answered = answered;
                const ev = new KeyboardEvent('keydown', Object.assign({ key: 'Enter', bubbles: true, cancelable: true }, init));
                inp.dispatchEvent(ev);
                window.checkAnswer = oc; window.confirmDefaultGrade = ocg; state.answered = false;
                return { chk, conf, prevenido: ev.defaultPrevented };
            }, [answered, init]);
            const envio = answered ? r.conf : r.chk, otro = answered ? r.chk : r.conf;
            ok(envio === (debeEnviar ? 1 : 0) && otro === 0, '#answer-input · ' + (answered ? 'ya respondida' : 'sin responder') + ' · ' + nombre + ' → ' + (debeEnviar ? 'envía' : 'NO envía') + ' (' + JSON.stringify(r) + ')');
            ok(r.prevenido === debeEnviar, '#answer-input · ' + (answered ? 'ya respondida' : 'sin responder') + ' · ' + nombre + ' → keydown ' + (debeEnviar ? 'cancelado' : 'SIN cancelar (el IME lo necesita)'));
        }
    }
    // otra tecla durante la composición: nada
    const otra = await p.evaluate(() => { let chk = 0; const oc = window.checkAnswer; window.checkAnswer = function () { chk++; }; state.answered = false; document.getElementById('answer-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'a', isComposing: true, bubbles: true, cancelable: true })); window.checkAnswer = oc; return chk; });
    ok(otra === 0, '#answer-input · otra tecla durante la composición no envía');

    // ---- .vp-own-input («Sumar a mi repaso») ----
    const abrirForm = () => p.evaluate(() => {
        acSrsReset();
        const vb = document.getElementById('vocab-pop-body'); vb.dataset.word = '你好';
        vb.innerHTML = '<button type="button" class="vp-srs-add">🔁 Sumar a mi repaso</button>';
        vb.querySelector('.vp-srs-add').click();
        const inp = document.querySelector('#vocab-pop-body .vp-own-input'); if (inp) inp.value = '我说你';
        return !!inp;
    });
    const enter = (init) => p.evaluate((init) => {
        const inp = document.querySelector('#vocab-pop-body .vp-own-input');
        const ev = new KeyboardEvent('keydown', Object.assign({ key: 'Enter', bubbles: true, cancelable: true }, init)); inp.dispatchEvent(ev);
        return { enMazo: acSrsHas('你好'), prevenido: ev.defaultPrevented, formSigue: !!document.querySelector('#vocab-pop-body .vp-own-input') };
    }, init);
    for (const [nombre, init, debeGuardar] of casos) {
        ok(await abrirForm(), 'vp-own-input · abre el formulario «Tu propia oración» (' + nombre + ')');
        const r = await enter(init);
        ok(r.enMazo === debeGuardar && r.prevenido === debeGuardar, 'vp-own-input · ' + nombre + ' → ' + (debeGuardar ? 'guarda la tarjeta' : 'NO guarda; el formulario sigue') + ' (' + JSON.stringify(r) + ')');
        if (!debeGuardar) ok(r.formSigue, 'vp-own-input · ' + nombre + ' → el formulario y la oración a medias siguen en pantalla');
    }
    // ---- teclado y composición REALES (Playwright + CDP, Chromium): no son eventos sintéticos ----
    const cdp = await ctx.newCDPSession(p);
    const espiar = (answered) => p.evaluate((answered) => {
        showView('hoy'); window.__chk = 0; window.__conf = 0; window.__k = [];
        window.__oc = window.checkAnswer; window.__ocg = window.confirmDefaultGrade;
        window.checkAnswer = function () { window.__chk++; }; window.confirmDefaultGrade = function () { window.__conf++; };   // espías
        state.answered = answered;
        const i = document.getElementById('answer-input'); i.value = ''; i.focus();
        if (!window.__espia) { window.__espia = true; i.addEventListener('keydown', (e) => window.__k.push({ key: e.key, comp: e.isComposing, kc: e.keyCode }), true); }
    }, answered);
    const soltar = () => p.evaluate(() => { window.checkAnswer = window.__oc; window.confirmDefaultGrade = window.__ocg; state.answered = false; return { chk: window.__chk, conf: window.__conf, k: window.__k }; });
    for (const answered of [false, true]) {
        await espiar(answered); await p.keyboard.press('Enter');
        let r = await soltar();
        ok((answered ? r.conf : r.chk) === 1 && (answered ? r.chk : r.conf) === 0, 'Enter REAL (teclado) · ' + (answered ? 'ya respondida' : 'sin responder') + ' → envía 1 vez, como siempre (' + JSON.stringify({ chk: r.chk, conf: r.conf }) + ')');
        await espiar(answered);
        await cdp.send('Input.imeSetComposition', { text: 'ni', selectionStart: 2, selectionEnd: 2 });   // composición real: arranca el IME
        await p.keyboard.press('Enter'); await p.waitForTimeout(200);
        r = await soltar();
        const compuesto = r.k.some((e) => e && e.key === 'Enter' && e.comp === true);
        ok(compuesto, 'Enter durante una composición REAL (CDP imeSetComposition) · ' + (answered ? 'ya respondida' : 'sin responder') + ' → el keydown llega con isComposing: true (' + JSON.stringify(r.k) + ')');
        ok(r.chk === 0 && r.conf === 0, 'Enter durante una composición REAL · ' + (answered ? 'ya respondida' : 'sin responder') + ' → NO envía (' + JSON.stringify({ chk: r.chk, conf: r.conf }) + ')');
    }
    // «Tu propia oración»: composición real + Enter no guarda
    ok(await abrirForm(), 'vp-own-input · abre el formulario (composición real)');
    await p.evaluate(() => document.querySelector('#vocab-pop-body .vp-own-input').focus());
    await cdp.send('Input.imeSetComposition', { text: 'wo', selectionStart: 2, selectionEnd: 2 });
    await p.keyboard.press('Enter'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => !acSrsHas('你好') && !!document.querySelector('#vocab-pop-body .vp-own-input')), 'vp-own-input · Enter durante una composición REAL no guarda y el formulario sigue');
    ok(errs.length === 0, 'sin errores JS ' + errs.join(' / '));
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
