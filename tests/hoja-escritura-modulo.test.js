// fix/pequenos-gemini · punto 1: «📋 Usar módulo» de la planilla de escritura respeta la escritura por familia (ck())
// y la etiqueta #pz-module-name sigue al módulo activo (al elegirlo y al recargar con uno guardado).
//   · TOCFL (sin elección explícita): tradicional · HSK (sin elección): simplificado — igual que hoy.
//   · elección explícita de cada familia (ac_script_tocfl / ac_script_hsk): manda.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

async function abrir(b, ls, modulo) {
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
    await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
    await ctx.addInitScript(([ls, modulo]) => {
        if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1'); localStorage.clear();
        localStorage.setItem('ac_onboarding_done_v2', '1');
        if (modulo) localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode: 'es-cn', activeModule: modulo }));
        Object.entries(ls || {}).forEach(([k, v]) => localStorage.setItem(k, v));
    }, [ls, modulo]);
    const p = await ctx.newPage(); p._errs = []; p.on('pageerror', (e) => p._errs.push(e.message));
    await p.goto(APP_URL); await p.waitForTimeout(1500);
    return { ctx, p };
}
// Qué debería cargar el botón: los primeros 40 hanzi distintos de la respuesta de cada tarjeta, en el campo dado (literal, sin ck()).
const esperado = (p, campo) => p.evaluate((campo) => {
    const seen = new Set(); let out = '';
    for (const s of getFiltered()) { for (const ch of String(s[campo] || '')) { if (!pzIsHan(ch) || seen.has(ch)) continue; seen.add(ch); out += ch; if (seen.size >= 40) break; } if (seen.size >= 40) break; }
    return out;
}, campo);
const cargar = (p, mod) => p.evaluate(async (mod) => {
    setModule(mod, { stay: true }); await new Promise((r) => setTimeout(r, 700));
    document.getElementById('pz-input').value = '';
    document.getElementById('btn-pz-module').click();
    return { ck: ck(), input: document.getElementById('pz-input').value, etiqueta: document.getElementById('pz-module-name').textContent, estado: (document.getElementById('pz-status') || {}).textContent || '' };
}, mod);

(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    const casos = [
        // [nombre, localStorage, módulo, escritura esperada]
        ['TOCFL A1, sin elección → tradicional', {}, 'TOCFL-A1', 'trad'],
        ['TOCFL A1, elige simplificado → simplificado', { ac_script_tocfl: 'simp' }, 'TOCFL-A1', 'simp'],
        ['HSK 1, sin elección → simplificado (como hoy)', {}, 'HSK1', 'simp'],
        ['HSK 1, elige tradicional → tradicional', { ac_script_hsk: 'trad' }, 'HSK1', 'trad'],
        ['HSK 1, elige tradicional pero TOCFL no → HSK tradicional; la otra familia no cambia', { ac_script_hsk: 'trad', ac_script_tocfl: 'simp' }, 'HSK1', 'trad']
    ];
    for (const [nombre, ls, mod, esc] of casos) {
        const { ctx, p } = await abrir(b, ls);
        const r = await cargar(p, mod);
        const campo = esc === 'trad' ? 'chinese_trad_answer' : 'chinese_simp_answer';
        const otro = esc === 'trad' ? 'chinese_simp_answer' : 'chinese_trad_answer';
        const exp = await esperado(p, campo), expOtro = await esperado(p, otro);
        ok(r.ck === esc, nombre + ' · ck() = ' + esc + ' (dio ' + r.ck + ')');
        ok(r.input.length > 0 && r.input === exp, nombre + ' · el cuadro trae los caracteres en ' + esc + ' (' + r.input.slice(0, 12) + '… = ' + exp.slice(0, 12) + '…)');
        if (exp !== expOtro) ok(r.input !== expOtro, nombre + ' · y no los de la otra escritura (' + expOtro.slice(0, 12) + '…)');
        ok(r.etiqueta === (mod === 'HSK1' ? 'HSK 1' : 'TOCFL A1'), nombre + ' · etiqueta «' + r.etiqueta + '»');
        ok(r.estado.indexOf(mod === 'HSK1' ? 'HSK 1' : 'TOCFL A1') !== -1, nombre + ' · el aviso nombra el módulo («' + r.estado.slice(0, 60) + '»)');
        ok(p._errs.length === 0, nombre + ' · sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
    }
    // el contrato «mismo resultado que hoy» en simplificado: los campos son los de siempre
    {
        const { ctx, p } = await abrir(b, {});
        const r = await cargar(p, 'HSK1'); const exp = await esperado(p, 'chinese_simp_answer');
        ok(r.input === exp, 'HSK 1 por defecto: idéntico a lo que cargaba antes (chinese_simp_answer)');
        await ctx.close();
    }
    // etiqueta: sigue al módulo al cambiarlo, y arranca bien al recargar con un módulo guardado
    {
        const { ctx, p } = await abrir(b, {}, 'TOCFL-A1');
        const al = await p.evaluate(() => document.getElementById('pz-module-name').textContent);
        ok(al === 'TOCFL A1', 'recarga con TOCFL A1 guardado: la etiqueta ya dice «TOCFL A1» (dice «' + al + '»)');
        const cambios = await p.evaluate(async () => {
            const o = {};
            for (const m of ['HSK3', 'todas', 'TOCFL-B3']) { setModule(m, { stay: true }); await new Promise((r) => setTimeout(r, 300)); o[m] = document.getElementById('pz-module-name').textContent; }
            return o;
        });
        ok(cambios.HSK3 === 'HSK 3' && cambios.todas === 'Práctica diaria (todas)' && cambios['TOCFL-B3'] === 'TOCFL B1', 'setModule actualiza la etiqueta (' + JSON.stringify(cambios) + ')');
        ok(p._errs.length === 0, 'sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
    }
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
