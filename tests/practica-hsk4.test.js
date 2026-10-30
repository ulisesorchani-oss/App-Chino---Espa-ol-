// tests/practica-hsk4.test.js — Entrenar → Práctica tipo examen con HSK 4 (textos v2 de tipo «examen»)
//   · el nivel aparece en la entrada (entre HSK 3 y HSK 5) y dice «lecturas»
//   · generador: 20 ítems = escuchar + completar + las preguntas del texto (al final, contiguas, en orden);
//     sin «Ordenar» ni «Diálogo»; salen los 4 textos de examen y NUNCA el de estudio (rx-h4-chunlian)
//   · la opción correcta de cada pregunta es la primera de los datos (comprension[].opts[0]); 4 opciones sin repetir;
//     explicación `why` y `whyNot` en las incorrectas; el chino sigue la escritura (简/繁)
//   · V/F (esquema v2): opciones fijas «Verdadero»/«Falso» en ese orden, sin barajar, con la correcta según `vf`
//   · rotación de textos y vuelta al reparto genérico si no hay textos cargados
//   · pantalla a 320 y 360 px (claro/oscuro): responder, explicación, texto tocable al responder, resultado y
//     registro de la lectura en el historial; sin desborde ni errores JS
const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('practica-hsk4'); require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
    async function page(w, th, script) {
        const ctx = await b.newContext({ viewport: { width: w, height: 740 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
        await ctx.addInitScript(([th, script]) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1');
            localStorage.setItem('theme', th); localStorage.setItem('ac_view_v1', 'entrenar'); if (script) localStorage.setItem('ac_script_hsk', script); } }, [th, script || '']);
        const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
        await p.goto(APP_URL); await p.waitForTimeout(1300); return { ctx, p, errs };
    }
    const st = (p) => p.evaluate(() => { const S = ExamDebug.state(); return S ? { idx: S.idx, n: S.items.length, type: S.items[S.idx].type, answered: S.answered } : null; });
    const answer = async (p, mode) => {
        const r = await p.evaluate(() => ExamDebug.state().items[ExamDebug.state().idx].opts.findIndex(o => o.ok));
        const nOpt = await p.evaluate(() => document.querySelectorAll('#ex-opts .lq-opt').length);
        const pick = mode === 'right' ? r : [...Array(nOpt).keys()].find(x => x !== r);
        await p.click('#ex-opts .lq-opt[data-i="' + pick + '"]'); await p.waitForTimeout(60);
    };
    const next = async (p) => { await p.click('#ex-next'); await p.waitForTimeout(60); };
    const start = async (p, k) => { await p.click('#btn-exam-practice'); await p.waitForTimeout(300); await p.click('.ex-lv[data-k="' + k + '"]'); await p.waitForTimeout(500); };

    // ===== generador (sin pantalla)
    {
        const { ctx, p, errs } = await page(360, 'light');
        const g = await p.evaluate(() => {
            const o = { bad: [], reads: {}, sig: {}, consec: true, dupEs: 0 };
            const src = Object.fromEntries(LECTURAS.filter(r => r.hsk === 4 && !r.exam).map(r => [r.id, r]));
            for (let i = 0; i < 200; i++) {
                const S = ExamDebug.build('HSK4');
                if (S.items.length !== 20) o.bad.push('largo ' + S.items.length);
                const t = {}; S.items.forEach(it => t[it.type] = (t[it.type] || 0) + 1);
                const key = Object.keys(t).sort().join('+'); o.sig[key] = (o.sig[key] || 0) + 1;
                const R = S.rd; o.reads[R.id] = (o.reads[R.id] || 0) + 1;
                const rt = S.items.filter(it => it.type === 'rtext');
                const D = src[R.id];
                if (!D || D.tipo !== 'examen' || D.origen !== 'v2') o.bad.push('texto no permitido ' + R.id);
                else {
                    if (rt.length !== D.preguntas.length) o.bad.push('rtext ' + rt.length);
                    const idxs = S.items.map((it, j) => it.type === 'rtext' ? j : -1).filter(j => j >= 0);
                    if (idxs.some((j, q) => j !== 20 - D.preguntas.length + q)) o.consec = false;
                    rt.forEach((it, q) => {
                        const d = D.preguntas[q];
                        if (it.rid !== R.id || it.rd !== R || it.qi !== q) o.bad.push('orden/mezcla ' + R.id + q);
                        if (it.opts.length !== d.opts.length || it.opts.filter(x => x.ok).length !== 1 || new Set(it.opts.map(x => x.es)).size !== d.opts.length) o.bad.push('opciones ' + R.id + q);
                        if (it.opts.find(x => x.ok).es !== d.opts[d.ok]) o.bad.push('correcta ' + R.id + q);
                        if (it.qzh || it.opts.some(x => x.zh)) o.bad.push('no lleva chino en pregunta ' + R.id + q);
                        if (!it.why || it.opts.filter(x => !x.ok).some(x => !x.whyNot)) o.bad.push('explicaciones ' + R.id + q);
                        // cada incorrecta lleva SU explicación (la de los datos, en el orden original)
                        it.opts.filter(x => !x.ok).forEach(x => { const orig = d.opts.indexOf(x.es); if (x.whyNot !== d.whyNot[orig - 1]) o.bad.push('whyNot cruzada ' + R.id + q); });
                    });
                }
                const es = new Set(); let dup = false;
                S.items.forEach(it => { if (it.type === 'listen') { if (es.has(it.es)) dup = true; es.add(it.es); } });
                if (dup) o.dupEs++;
                if (S.items.some(it => ['order', 'dialogue', 'reading'].includes(it.type))) o.bad.push('tipo inesperado');
            }
            return o;
        });
        ok(g.bad.length === 0, 'generador HSK4: 20 ítems válidos, explicaciones y correcta bien ubicadas ' + JSON.stringify(g.bad.slice(0, 4)));
        ok(g.consec && g.dupEs === 0, 'generador HSK4: las preguntas del texto van juntas al final y en orden; sin «escuchar» repetidas ' + JSON.stringify([g.consec, g.dupEs]));
        ok(Object.keys(g.sig).join() === 'cloze+listen+rtext', 'generador HSK4: solo escuchar + completar + texto ' + JSON.stringify(g.sig));
        const ids = Object.keys(g.reads).sort();
        ok(JSON.stringify(ids) === JSON.stringify(['rx-h4-casa', 'rx-h4-encuesta', 'rx-h4-jiaozi', 'rx-h4-tren']), 'salen los 4 textos de examen y nunca el de estudio ' + JSON.stringify(g.reads));
        // escritura: el texto en tradicional lleva zhT
        const sc = await p.evaluate(() => { localStorage.setItem('ac_script_hsk', 'trad'); const S = ExamDebug.build('HSK4'); return { trad: S.trad, t: S.items.filter(i => i.type === 'rtext').every(i => i.trad === S.trad) }; });
        ok(sc.t, 'las preguntas del texto llevan la escritura de la sesión ' + JSON.stringify(sc));
        // V/F sintético (el esquema v2 lo permite aunque hoy ningún texto de examen lo use): opciones fijas
        const vf = await p.evaluate(() => {
            const base = LECTURAS.find(r => r.id === 'rx-h4-tren');
            const syn = Object.assign({}, base, { id: 'syn-vf', preguntas: [
                { type: 'vf', es: 'El tren salió a las seis.', opts: ['Verdadero', 'Falso'], ok: 1, fixed: true, vf: false, why: 'Salió más tarde.', whyNot: [] },
                { type: 'vf', es: 'Xiao Lin viaja en tren.', opts: ['Verdadero', 'Falso'], ok: 0, fixed: true, vf: true, why: 'Sí, viaja en tren.', whyNot: [] }] });
            const keep = LECTURAS.slice(); LECTURAS.length = 0; LECTURAS.push(syn);
            const res = []; for (let i = 0; i < 40; i++) { const S = ExamDebug.build('HSK4'); res.push(S.items.filter(x => x.type === 'rtext').map(x => x.opts.map(o => o.es + ':' + o.ok).join('|')).join(' / ')); }
            LECTURAS.length = 0; keep.forEach(x => LECTURAS.push(x));
            return [...new Set(res)];
        });
        ok(vf.length === 1 && vf[0] === 'Verdadero:0|Falso:1 / Verdadero:1|Falso:0', 'V/F: opciones fijas Verdadero/Falso, la correcta según vf, sin barajar ' + JSON.stringify(vf));
        // rotación: sale primero el texto que hace más tiempo que no aparece
        const rot = await p.evaluate(() => {
            const ids = ['rx-h4-tren', 'rx-h4-encuesta', 'rx-h4-casa', 'rx-h4-jiaozi'], res = {};
            const set = (h) => localStorage.setItem('ac_exam_v1', JSON.stringify({ HSK4: h.map((id, i) => ({ t: i, s: 1, n: 20, sec: {}, rd: [{ id, s: 1, n: 2 }] })) }));
            const pickN = () => { const m = {}; for (let i = 0; i < 60; i++) { const id = ExamDebug.build('HSK4').rd.id; m[id] = 1; } return Object.keys(m).sort(); };
            localStorage.removeItem('ac_exam_v1'); res.vacio = pickN().length;
            set([ids[0]]); res.uno = pickN(); set([ids[0], ids[1], ids[2]]); res.tres = pickN(); set(ids); res.cuatro = pickN();
            localStorage.removeItem('ac_exam_v1'); return { ids, res };
        });
        const I = rot.ids;
        ok(rot.res.vacio === 4 && JSON.stringify(rot.res.uno) === JSON.stringify([I[1], I[2], I[3]].sort()) && JSON.stringify(rot.res.tres) === JSON.stringify([I[3]]) && JSON.stringify(rot.res.cuatro) === JSON.stringify([I[0]]),
            'rotación: sale el que hace más tiempo que no aparece ' + JSON.stringify(rot.res));
        // sin textos v2 cargados vuelve al reparto genérico
        const nor = await p.evaluate(() => { const keep = LECTURAS.slice(); LECTURAS.length = 0; const S = ExamDebug.build('HSK4'); const t = {}; S.items.forEach(it => t[it.type] = (t[it.type] || 0) + 1); keep.forEach(x => LECTURAS.push(x)); return { n: S.items.length, t }; });
        ok(nor.n === 20 && !nor.t.rtext && nor.t.listen && nor.t.cloze, 'sin textos el nivel vuelve al reparto genérico ' + JSON.stringify(nor));
        // los demás niveles no cambian
        const same = await p.evaluate(() => ['HSK3', 'HSK5', 'TOCFL-B3'].map(k => { let bad = 0; const v2 = new Set(); for (let i = 0; i < 80; i++) { const S = ExamDebug.build(k); if (S.items.length !== 20 || !S.items.some(it => it.type === 'rtext')) bad++; if (S.rd.origen === 'v2') v2.add(S.rd.id); if (S.rd.origen === 'v2' && k !== 'HSK5') bad++; } return [bad, [...v2]]; }));
        ok(same.every(x => x[0] === 0) && JSON.stringify(same[1][1]) === '["rx-h5-ruido"]' && same[0][1].length === 0 && same[2][1].length === 0, 'HSK 3 y TOCFL B1 siguen solo con textos v1; HSK 5 suma el v2 «rx-h5-ruido» ' + JSON.stringify(same));
        ok(errs.length === 0, 'generador sin errores JS ' + errs);
        await ctx.close();
    }

    // ===== pantalla
    for (const w of [320, 360]) for (const th of ['light', 'dark']) {
        const tag = w + '/' + th;
        for (const sc of ['simp', 'trad']) {
            const { ctx, p, errs } = await page(w, th, sc);
            await p.click('#btn-exam-practice'); await p.waitForTimeout(300);
            const e = await p.evaluate(() => ({ lv: [...document.querySelectorAll('.ex-lv')].map(x => x.dataset.k + '|' + x.querySelector('.d').textContent), ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
            ok(e.lv.map(x => x.split('|')[0]).join() === 'TOCFL-Prep,TOCFL-A1,HSK1,HSK3,HSK4,HSK5,TOCFL-B3', tag + '/' + sc + ' entrada: HSK 4 entre HSK 3 y HSK 5 ' + JSON.stringify(e.lv));
            ok(/4 lecciones/.test(e.lv[4]) && /lecturas/.test(e.lv[4]) && !e.ovf, tag + '/' + sc + ' entrada: HSK 4 dice «lecturas» y no desborda ' + e.lv[4]);
            await p.click('.ex-lv[data-k="HSK4"]'); await p.waitForTimeout(500);
            // recorre la tanda acertando todo salvo la primera pregunta del texto, que se falla a propósito
            let sawWrong = false, textoTocable = false, ovf = false;
            for (let g = 0; g < 20; g++) { // 20 ítems; después del último queda el resultado
                const s = await st(p); if (!s) break;
                const isText = s.type === 'rtext';
                const first = isText && await p.evaluate(() => ExamDebug.state().items[ExamDebug.state().idx].qi === 0);
                await answer(p, first ? 'wrong' : 'right');
                if (isText) {
                    const fb = await p.evaluate(() => ({ why: (document.querySelector('#ex-fb .ex-fb .es:last-of-type') || {}).textContent || '', mine: /Tu respuesta/.test(document.getElementById('ex-fb').textContent), sel: document.querySelectorAll('#ex-rtext .lq-word, #ex-rtext [data-w], #ex-rtext .lq-ch').length, plain: document.getElementById('ex-rtext').classList.contains('rd-plain') }));
                    if (first) sawWrong = fb.mine && fb.why.length > 5;
                    textoTocable = textoTocable || !fb.plain;
                }
                ovf = ovf || await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
                if (g === 18 && sc === 'simp') await p.screenshot({ path: OUT + 'texto-' + w + '-' + th + '.png' });
                await next(p);
            }
            ok(sawWrong, tag + '/' + sc + ' fallar muestra «Tu respuesta» y la explicación');
            ok(textoTocable, tag + '/' + sc + ' al responder el texto deja de ser plano (tocable con pinyin)');
            ok(!ovf, tag + '/' + sc + ' sin desborde horizontal durante la tanda');
            const res = await p.evaluate(() => ({ score: document.querySelector('.ex-score').textContent.replace(/\s+/g, ''), retry: !!document.getElementById('ex-retry'), hist: JSON.parse(localStorage.getItem('ac_exam_v1') || '{}').HSK4 }));
            ok(res.score === '19/20' && res.retry, tag + '/' + sc + ' resultado 19/20 con «Repasar el error» ' + JSON.stringify(res.score));
            const h = (res.hist || [])[0];
            ok(h && h.n === 20 && h.s === 19 && h.rd && /^rx-h4-/.test(h.rd[0].id) && h.rd[0].n === 2 && h.rd[0].s === 1, tag + '/' + sc + ' el historial guarda la lectura (1 de 2) ' + JSON.stringify(h && h.rd));
            ok(errs.length === 0, tag + '/' + sc + ' sin errores JS ' + errs);
            await ctx.close();
        }
    }
    await b.close(); console.log('comprobaciones ' + n + ' · FAILS ' + fails); process.exit(fails ? 1 : 0);
})();
