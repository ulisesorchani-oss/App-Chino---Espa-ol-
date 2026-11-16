// :hover pegado en el celular. Todas las reglas :hover (style.css y los CSS inyectados por stats.js y onboarding.js) van dentro de
// @media (hover: hover): en un dispositivo táctil (hover: none) no se aplican, y un toque no deja el estilo «pegado».
//   1) CSSOM de la página: ningún selector con :hover fuera de (hover: hover); ningún :focus / :focus-visible dentro de él.
//   2) Fuente: las 3 reglas inyectadas por JS (stats.js, onboarding.js) están envueltas.
//   3) Contexto TÁCTIL de Playwright (hasTouch + isMobile): (hover: hover) no coincide; tras un TOQUE, el estilo calculado de cada
//      elemento con regla :hover vuelve al base. Probado en los 3 temas (claro, oscuro, papel).
//   4) Con MOUSE (escritorio): el estilo calculado al pasar el mouse es IDÉNTICO al de antes del cambio (oro grabado con el código
//      anterior en tests/data/hover-oro.json: GOLDEN_RECORD=1 lo vuelve a grabar) y distinto del base (el hover sigue funcionando).
const fs = require('fs');
const path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

const ROOT = path.resolve(__dirname, '..');
const GOLD = path.join(__dirname, 'data', 'hover-oro.json');
const RECORD = process.env.GOLDEN_RECORD === '1';
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sleep = (p, ms) => p.waitForTimeout(ms);
const THEMES = ['light', 'dark', 'paper'];
const VIEWS = ['aprender', 'hoy', 'entrenar', 'yo'];

// Se evalúa en la página: reglas :hover del CSSOM (con su cadena de @media) y chequeo de envoltura
function cssomHover() {
    const out = [];
    const splitSel = (t) => { const r = []; let d = 0, last = 0; for (let i = 0; i < t.length; i++) { const c = t[i]; if (c === '(' || c === '[') d++; else if (c === ')' || c === ']') d--; else if (c === ',' && d === 0) { r.push(t.slice(last, i).trim()); last = i + 1; } } r.push(t.slice(last).trim()); return r; };
    const walk = (rules, chain) => {
        for (const r of rules) {
            if (r.type === 1) splitSel(r.selectorText).forEach((s) => out.push({ s, props: Array.from(r.style), envuelto: chain.some((c) => /hover:\s*hover/.test(c)) }));
            else if (r.type === 4) walk(r.cssRules, chain.concat(r.conditionText || ''));
            else if (r.cssRules && r.type !== 7) walk(r.cssRules, chain);
        }
    };
    for (const sh of Array.from(document.styleSheets)) { try { walk(sh.cssRules, []); } catch (e) { /* hoja de otro origen */ } }
    return out;
}
// Se evalúa en la página: elementos probables de cada regla :hover (visibles, en el tema actual)
function objetivos() {
    const splitSel = (t) => { const r = []; let d = 0, last = 0; for (let i = 0; i < t.length; i++) { const c = t[i]; if (c === '(' || c === '[') d++; else if (c === ')' || c === ']') d--; else if (c === ',' && d === 0) { r.push(t.slice(last, i).trim()); last = i + 1; } } r.push(t.slice(last).trim()); return r; };
    const rules = [];
    const walk = (rs) => { for (const r of rs) { if (r.type === 1) splitSel(r.selectorText).forEach((s) => { if (/:hover(?![\w-])/.test(s) && s.indexOf('::') === -1) rules.push({ s, props: Array.from(r.style) }); }); else if (r.cssRules && r.type !== 7) walk(r.cssRules); } };
    for (const sh of Array.from(document.styleSheets)) { try { walk(sh.cssRules); } catch (e) { /* noop */ } }
    const found = []; let i = 0;
    for (const r of rules) {
        const base = r.s.replace(/:hover(?![\w-])/g, '');
        let el = null; try { el = document.querySelector(base); } catch (e) { /* selector no válido sin :hover */ }
        if (!el) continue;
        const rc = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (rc.width < 4 || rc.height < 4 || cs.visibility === 'hidden' || cs.display === 'none' || el.disabled) continue;
        const id = el.getAttribute('data-hv') || ('hv' + (i++)); el.setAttribute('data-hv', id); // un elemento puede tener varias reglas :hover: un solo id
        found.push({ id, sel: r.s, props: r.props });
    }
    return found;
}
const leer = ([id, props]) => { const el = document.querySelector('[data-hv="' + id + '"]'); const cs = getComputedStyle(el); const o = {}; props.forEach((p) => { o[p] = cs.getPropertyValue(p); }); return o; };
const centro = (id) => { const el = document.querySelector('[data-hv="' + id + '"]'); el.scrollIntoView({ block: 'center', inline: 'center' }); const r = el.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; };

(async () => {
    const b = await chromium.launch(LAUNCH);
    const oro = RECORD ? {} : JSON.parse(fs.readFileSync(GOLD, 'utf8'));
    const nuevo = {};

    async function sesion(tactil, tema) {
        const ctx = await b.newContext(tactil ? { viewport: { width: 360, height: 780 }, hasTouch: true, isMobile: true, serviceWorkers: 'block' } : { viewport: { width: 360, height: 780 }, serviceWorkers: 'block' });
        await ctx.addInitScript((t) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); localStorage.setItem('theme', t); } }, tema);
        const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
        await p.goto(APP_URL, { waitUntil: 'load' }); await sleep(p, 1500);
        await p.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' }); // el estado se lee sin esperar transiciones
        return { ctx, p, errs };
    }

    // ═════════ 1 y 2. envoltura (CSSOM de la página y fuente de los CSS inyectados) ═════════
    {
        const { ctx, p } = await sesion(false, 'light');
        await p.evaluate(() => { try { window.HuayuStats && HuayuStats.open(); } catch (e) { /* noop */ } }); await sleep(p, 300);
        await p.evaluate(() => { try { document.getElementById('btn-stats-close').click(); } catch (e) { /* noop */ } });
        const R = await p.evaluate(cssomHover);
        const hov = R.filter((r) => /:hover(?![\w-])/.test(r.s));
        ok(hov.length >= 85, 'CSSOM: hay ' + hov.length + ' selectores con :hover (≥ 85 esperados)');
        const sin = hov.filter((r) => !r.envuelto);
        ok(sin.length === 0, 'CSSOM: ningún selector con :hover fuera de @media (hover: hover)' + (sin.length ? ' → ' + sin.slice(0, 5).map((r) => r.s).join(' | ') : ''));
        const foco = R.filter((r) => /:focus/.test(r.s) && r.envuelto);
        ok(foco.length === 0, 'CSSOM: ningún :focus / :focus-visible dentro de (hover: hover)' + (foco.length ? ' → ' + foco.slice(0, 5).map((r) => r.s).join(' | ') : ''));
        const hovDeMas = R.filter((r) => !/:hover(?![\w-])/.test(r.s) && r.envuelto);
        ok(hovDeMas.length === 0, 'CSSOM: nada sin :hover quedó dentro de (hover: hover)' + (hovDeMas.length ? ' → ' + hovDeMas.slice(0, 5).map((r) => r.s).join(' | ') : ''));
        for (const f of ['stats.js', 'onboarding.js']) {
            const src = fs.readFileSync(path.join(ROOT, f), 'utf8').split('\n').map((l, i) => ({ l, i: i + 1 })).filter((x) => /:hover/.test(x.l) && /^\s*'/.test(x.l));
            ok(src.length > 0 && src.every((x) => /@media\s*\(hover:\s*hover\)\s*\{/.test(x.l)), f + ': las ' + src.length + ' reglas :hover del CSS inyectado van dentro de @media (hover: hover) (líneas ' + src.map((x) => x.i).join(', ') + ')');
        }
        ok((await p.evaluate(() => matchMedia('(hover: hover)').matches)) === true, 'escritorio con mouse: (hover: hover) coincide');
        await ctx.close();
    }
    {
        const { ctx, p } = await sesion(true, 'light');
        ok((await p.evaluate(() => matchMedia('(hover: hover)').matches)) === false && (await p.evaluate(() => matchMedia('(hover: none)').matches)) === true, 'contexto táctil: (hover: hover) NO coincide y (hover: none) sí');
        await ctx.close();
    }

    // ═════════ 3 y 4. comportamiento, por tema ═════════
    let totalTactil = 0, totalMouse = 0;
    for (const tema of THEMES) {
        // — mouse (escritorio): el estilo al pasar el mouse es el de siempre (oro) y distinto del base —
        {
            const { ctx, p, errs } = await sesion(false, tema);
            let probados = 0, conEfecto = 0, comparados = 0, distintoOro = [], faltanEnOro = [];
            for (const v of VIEWS) {
                await p.evaluate((v) => showView(v), v); await sleep(p, 250);
                const objs = await p.evaluate(objetivos);
                for (const o of objs) {
                    await p.mouse.move(1, 1);
                    const base = await p.evaluate(leer, [o.id, o.props]);
                    const c = await p.evaluate(centro, o.id); await p.mouse.move(c.x, c.y); await sleep(p, 30);
                    const hov = await p.evaluate(leer, [o.id, o.props]);
                    const key = tema + '|' + o.sel + '|' + o.props.join(','); // el mismo selector puede estar en varias reglas con otras propiedades
                    probados++; if (JSON.stringify(base) !== JSON.stringify(hov)) conEfecto++;
                    if (RECORD) nuevo[key] = hov;
                    else if (!oro[key]) faltanEnOro.push(key);
                    else { comparados++; if (JSON.stringify(oro[key]) !== JSON.stringify(hov)) { distintoOro.push(o.sel); if (process.env.HV_DEBUG) console.log('DIFF', key, JSON.stringify(oro[key]), JSON.stringify(hov)); } }
                    await p.mouse.move(1, 1);
                }
            }
            totalMouse += probados;
            ok(probados >= 8, '[' + tema + '] mouse: ' + probados + ' reglas :hover con elemento visible probadas (≥ 8)');
            ok(conEfecto >= Math.ceil(probados / 3), '[' + tema + '] mouse: el hover sigue cambiando el estilo en ' + conEfecto + ' de ' + probados);
            ok(RECORD || (distintoOro.length === 0 && comparados === probados && faltanEnOro.length === 0), '[' + tema + '] mouse: estilo al pasar el mouse IDÉNTICO al del código anterior (oro): ' + comparados + ' de ' + probados + ' comparados' + (distintoOro.length ? ' → difiere: ' + distintoOro.slice(0, 5).join(' | ') : '') + (faltanEnOro.length ? ' → sin oro: ' + faltanEnOro.slice(0, 3).join(' | ') : ''));
            ok(errs.filter((x) => !/localStorage/.test(x)).length === 0, '[' + tema + '] mouse: sin errores JS');
            await ctx.close();
        }
        // — táctil: tras un toque, el estilo calculado vuelve al base —
        {
            const { ctx, p } = await sesion(true, tema);
            await p.evaluate(() => { document.addEventListener('click', (e) => e.stopImmediatePropagation(), true); }); // el toque no dispara la app: solo prueba el estilo
            let probados = 0, pegados = [], pegadosHover = 0;
            for (const v of VIEWS) {
                await p.evaluate((v) => showView(v), v); await sleep(p, 250);
                const objs = await p.evaluate(objetivos);
                for (const o of objs) {
                    const base = await p.evaluate(leer, [o.id, o.props]);
                    const c = await p.evaluate(centro, o.id);
                    await p.touchscreen.tap(c.x, c.y); await sleep(p, 40);
                    const tras = await p.evaluate(leer, [o.id, o.props]);
                    const sticky = await p.evaluate((id) => document.querySelector('[data-hv="' + id + '"]').matches(':hover'), o.id); // ¿el navegador dejó el :hover pegado?
                    probados++; if (sticky) pegadosHover++;
                    if (JSON.stringify(base) !== JSON.stringify(tras)) pegados.push(o.sel);
                    await p.touchscreen.tap(1, 1); await sleep(p, 10);
                }
            }
            totalTactil += probados;
            ok(probados >= 8, '[' + tema + '] táctil: ' + probados + ' reglas :hover con elemento visible probadas (≥ 8)');
            ok(pegados.length === 0, '[' + tema + '] táctil: tras un toque el estilo calculado vuelve al base en las ' + probados + ' (el navegador dejó :hover pegado en ' + pegadosHover + ')' + (pegados.length ? ' → PEGADO: ' + pegados.slice(0, 6).join(' | ') : ''));
            await ctx.close();
        }
    }
    console.log('(reglas probadas: ' + totalMouse + ' con mouse, ' + totalTactil + ' con toque)');

    if (RECORD) { fs.writeFileSync(GOLD, JSON.stringify(nuevo, null, 1)); console.log('oro grabado: ' + Object.keys(nuevo).length + ' estilos en ' + GOLD); }
    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
