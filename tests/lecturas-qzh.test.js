// tests/lecturas-qzh.test.js — preguntas EN CHINO con «ver en español» (HSK 5 v2) y nota visible del texto
//   a. Los 4 HSK 5 v1 NO cambian (ya se preguntan en chino con «Ver en español» vía lessons-graduated.js): tests/data/lecturas-hsk5-v1-oro.json se GRABÓ con el código de main (antes del cambio):
//        GOLDEN_RECORD=1 BASE_URL=<app de main> node tests/lecturas-qzh.test.js
//      y se compara la lista normalizada, la pantalla de preguntas de Exámenes (en chino con su botón) y las
//      preguntas de Entrenar (en chino, como siempre).
//   b. Un texto v2 que trae qZh/optsZh (sintético: no depende de ningún texto real): en Exámenes la pregunta y las opciones van en
//      chino (簡/繁 según la escritura), el español queda oculto hasta «Ver en español» o hasta responder; Entrenar lo mismo con su botón.
//   c. Los textos v2 que NO las traen (HSK 4) siguen en español. La nota del texto se ve junto a «Nivel aproximado» y en Entrenar.
const fs = require('fs'), path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
const GOLD = path.join(__dirname, 'data', 'lecturas-hsk5-v1-oro.json');
const REC = !!process.env.GOLDEN_RECORD;
const V1 = ['rd-h5-celular', 'rd-h5-carta', 'rd-h5-sueno', 'rd-h5-libros'];
(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
  async function page(w, extra, conSintetico) {
    const ctx = await b.newContext({ viewport: { width: w, height: 740 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
    await ctx.addInitScript(([extra]) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1');
      localStorage.setItem('theme', 'light'); localStorage.setItem('ac_view_v1', 'entrenar'); Object.entries(extra || {}).forEach(([k, v]) => localStorage.setItem(k, v)); } }, [extra]);
    if (conSintetico) await ctx.addInitScript((raw) => { window.READINGS_V2 = raw; }, RAW()); // antes de readings-examen.js/readings-unify.js: pasa por normV2 de verdad
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(APP_URL); await p.waitForTimeout(1300); return { ctx, p, errs };
  }
  const aExamenes = (p) => p.evaluate(() => { showView('aprender'); document.getElementById('tab-exams').click(); }).then(() => p.waitForTimeout(300));
  const abrirPractica = async (p, id) => { await p.evaluate(() => document.dispatchEvent(new Event('ac-reading-change'))); await p.waitForTimeout(120);
    await p.click('.lc-practice[data-id="' + id + '"]'); await p.waitForTimeout(300); };
  const pantalla = (p) => p.evaluate(() => ({ qEs: (document.getElementById('rd-q-es') || {}).textContent || '', qEsOculta: !!(document.getElementById('rd-q-es') && document.getElementById('rd-q-es').classList.contains('hidden')),
    qZh: (document.querySelector('.rd-q-zh') || {}).textContent || '', ver: !!document.getElementById('rd-es') && !document.getElementById('rd-es').classList.contains('hidden'), verTxt: (document.getElementById('rd-es') || {}).textContent || '',
    optsEs: [...document.querySelectorAll('#lq-opts .rd-opt-es')].map(e => e.textContent).sort(), optsEsOcultas: [...document.querySelectorAll('#lq-opts .rd-opt-es')].every(e => e.classList.contains('hidden')),
    optsZh: [...document.querySelectorAll('#lq-opts .rd-opt-zh')].map(e => e.textContent).sort(), sombra: document.documentElement.scrollWidth > innerWidth + 1 }));
  const responder = async (p, bien) => { const rp = await p.evaluate(() => { const S = LQ_UI.state; return S.order[S.idx].indexOf(S.view === 'rquiz2' ? S.lesson.preguntas[S.idx].ok : 0); }); const nOpt = await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt').length);
    const pos = bien ? rp : [...Array(nOpt).keys()].find(x => x !== rp); await p.click('#lq-opts .lq-opt[data-pos="' + pos + '"]'); await p.waitForTimeout(80); };
  // ---------- a. los 4 HSK 5 v1: instantánea ----------
  const snap = { lista: {}, exam: {}, entrenar: {} };
  { const { ctx, p, errs } = await page(360);
    snap.lista = await p.evaluate((ids) => Object.fromEntries(ids.map(id => { const r = LECTURAS.find(x => x.id === id); return [id, { origen: r.origen, tipo: r.tipo, revision: r.revision, nivelKey: r.nivelKey, etiqueta: LECTURAS_API.etiqueta(r), preguntas: r.preguntas }]; })), V1);
    await aExamenes(p);
    for (const id of V1) { await abrirPractica(p, id); const qs = [];
      const total = await p.evaluate(() => LQ_DEBUG.state.results.length);
      for (let i = 0; i < total; i++) { qs.push(await pantalla(p)); await responder(p, true); qs[i].tras = await p.evaluate(() => ({ fb: document.getElementById('lq-feedback').textContent.length > 0, esVisible: [...document.querySelectorAll('#lq-opts .rd-opt-es')].every(e => !e.classList.contains('hidden')) })); await p.click('#lq-next'); await p.waitForTimeout(80); }
      snap.exam[id] = qs; await p.evaluate(() => { const c = document.getElementById('lq-close'); if (c) c.click(); }); await p.waitForTimeout(150);
      await p.evaluate(() => { showView('aprender'); document.getElementById('tab-exams').click(); }); await p.waitForTimeout(150); }
    snap.entrenar = await p.evaluate((ids) => { const o = {}; for (let i = 0; i < 160; i++) { const S = ExamDebug.build('HSK5'); if (!ids.includes(S.rd.id)) continue;
      const x = o[S.rd.id] = o[S.rd.id] || {}; S.items.filter(it => it.type === 'rtext').forEach(it => { const k = it.qi; x[k] = x[k] || { qzh: it.qzh, q: it.q, opts: [] };
        const s = it.opts.map(a => a.zh + '|' + a.es + '|' + a.ok).sort().join(' ; '); if (!x[k].opts.includes(s)) x[k].opts.push(s); }); } return o; }, V1);
    ok(errs.length === 0, 'instantánea sin errores JS ' + errs); await ctx.close(); }
  if (REC) { fs.writeFileSync(GOLD, JSON.stringify({ nota: 'GRABADO con el código de main, ANTES del soporte de qZh (GOLDEN_RECORD=1)', snap }, null, 1)); console.log('oro grabado en ' + GOLD); await b.close(); process.exit(0); }
  const G = JSON.parse(fs.readFileSync(GOLD, 'utf8')).snap;
  for (const k of ['lista', 'exam', 'entrenar']) for (const id of V1) ok(JSON.stringify(snap[k][id]) === JSON.stringify(G[k][id]), 'a. ' + id + ' (' + k + ') igual que con el código de main\n   sale:  ' + JSON.stringify(snap[k][id]).slice(0, 400) + '\n   debía: ' + JSON.stringify(G[k][id]).slice(0, 400));
  ok(V1.every(id => G.exam[id].every(q => q.qZh && q.ver && q.qEsOculta && q.optsZh.length === 4)), 'a. en Exámenes los HSK 5 v1 ya se preguntan en chino con «Ver en español» (lessons-graduated.js): es la referencia para los v2');
  ok(V1.every(id => Object.values(G.entrenar[id]).every(q => q.qzh)), 'a. en Entrenar los HSK 5 v1 se preguntan en chino, como siempre');
  // ---------- b y c. texto v2 sintético con preguntas en chino ----------
  // textos v2 CRUDOS (esquema de readings-examen.js) que se cargan antes que readings-unify.js
  function RAW() {
    const base = (id, titulo, extra) => Object.assign({ id, schema: 2, tipo: 'examen', nivel: 5, genero: 'expositivo', emoji: '🎧', revision: 'pendiente',
      titulo: { zh: '测试', zhT: '測試', es: titulo },
      parrafos: [{ zh: '这是一个很短的测试文章。', zhT: '這是一個很短的測試文章。', es: 'Un texto corto.' }, { zh: '声音会影响我们。', zhT: '聲音會影響我們。', es: 'El sonido nos afecta.' }],
      glosario: [{ zh: '声音', zhT: '聲音', categoria: 'sustantivo', es: 'sonido', nivelLista: 2, fueraDeNivel: false }],
      banco: { huecos: [], palabras: [], palabrasT: [] }, parecidas: [], largo: 20 }, extra);
    const mc = (tipo, es, opts, why, whyNot, zh) => Object.assign({ tipo, es, opts, why, whyNot }, zh || {});
    return [
      base('syn-qzh', 'Texto sintético', { nota: 'Texto original; los datos son ilustrativos', comprension: [
        mc('detalle', '¿Dónde ocurre?', ['En la estación', 'En la escuela', 'En el parque', 'En casa'], 'Dice la estación.', ['a', 'b', 'c'],
          { qZh: '故事发生在哪里？', qZhT: '故事發生在哪裡？', optsZh: ['在车站', '在学校', '在公园', '在家里'], optsZhT: ['在車站', '在學校', '在公園', '在家裡'] }),
        mc('inferencia', '¿Qué tema tiene?', ['Un viaje', 'Una cena', 'Un examen', 'Un regalo'], 'Un viaje.', ['a', 'b', 'c'],
          { qZh: '这个故事说的是什么？', qZhT: '這個故事說的是什麼？', optsZh: ['一次旅行', '一顿晚饭', '一场考试', '一个礼物'], optsZhT: ['一次旅行', '一頓晚飯', '一場考試', '一個禮物'] })] }),
      base('syn-sin', 'Sin chino', { comprension: [mc('detalle', '¿Qué dice?', ['Una cosa', 'Otra', 'Otra más', 'La última'], 'Esa.', ['a', 'b', 'c'])] })];
  }
  for (const w of [320, 360]) for (const sc of ['simp', 'trad']) {
    const { ctx, p, errs } = await page(w, { ac_script_hsk: sc }, true); const tag = w + '/' + sc;
    await aExamenes(p);
    const lbl = await p.evaluate(() => { document.dispatchEvent(new Event('ac-reading-change')); return [...document.querySelectorAll('.rd-card')].filter(c => /syn-/.test(c.dataset.id)).map(c => [c.dataset.id, c.querySelector('.rd-approx-label').textContent]); });
    ok(lbl.find(x => x[0] === 'syn-qzh')[1].includes('Texto original; los datos son ilustrativos') && !lbl.find(x => x[0] === 'syn-sin')[1].includes('ilustrativos'), 'b/c. ' + tag + ' la nota se ve en la tarjeta solo del texto que la trae ' + JSON.stringify(lbl));
    await abrirPractica(p, 'syn-qzh');
    const q1 = await pantalla(p);
    ok(q1.qZh === (sc === 'trad' ? '故事發生在哪裡？' : '故事发生在哪里？') && q1.qEsOculta && q1.ver && q1.optsZh.length === 4 && q1.optsEsOcultas && !q1.sombra, 'b. ' + tag + ' pregunta y opciones en chino con el español oculto y el botón a la vista ' + JSON.stringify(q1));
    ok(JSON.stringify(q1.optsZh) === JSON.stringify((sc === 'trad' ? ['在學校', '在公園', '在家裡', '在車站'] : ['在车站', '在学校', '在公园', '在家里']).sort()), 'b. ' + tag + ' las opciones siguen la escritura elegida ' + JSON.stringify(q1.optsZh));
    ok(await p.evaluate(() => document.querySelector('.rd-approx').textContent.includes('Texto original; los datos son ilustrativos')), 'b. ' + tag + ' la nota se ve en la pantalla de preguntas');
    await p.click('#rd-es'); await p.waitForTimeout(60);
    const q1b = await pantalla(p);
    ok(!q1b.qEsOculta && q1b.qEs === '¿Dónde ocurre?' && q1b.ver && /Ocultar el español/.test(q1b.verTxt) && !q1b.optsEsOcultas && q1b.optsEs.length === 4, 'b. ' + tag + ' «Ver en español» muestra la pregunta y las opciones (el botón pasa a «Ocultar el español», como en los v1) ' + JSON.stringify(q1b));
    await p.click('#rd-es'); await p.waitForTimeout(60);
    const q1c = await pantalla(p);
    ok(q1c.qEsOculta && q1c.optsEsOcultas && /Ver en español/.test(q1c.verTxt), 'b. ' + tag + ' pulsarlo otra vez vuelve a ocultar el español ' + JSON.stringify(q1c));
    ok(await p.evaluate(() => document.querySelectorAll('.rd-q-zh .lq-ch').length > 4), 'b. ' + tag + ' los caracteres de la pregunta son tocables (abre el diccionario), como en los v1');
    await responder(p, true); await p.click('#lq-next'); await p.waitForTimeout(80);
    const q2 = await pantalla(p);
    ok(q2.qEsOculta && q2.ver, 'b. ' + tag + ' la pregunta siguiente vuelve a empezar en chino ' + JSON.stringify(q2));
    await responder(p, false);   // responder sin pulsar el botón también muestra el español
    const q2b = await pantalla(p);
    ok(!q2b.qEsOculta && !q2b.optsEsOcultas && !q2b.ver && await p.evaluate(() => /Tu respuesta/.test(document.getElementById('lq-feedback').textContent)), 'b. ' + tag + ' al responder todo pasa a español y el feedback sale ' + JSON.stringify(q2b));
    await p.evaluate(() => { const c = document.getElementById('lq-close'); if (c) c.click(); }); await p.waitForTimeout(150);
    await aExamenes(p); await abrirPractica(p, 'syn-sin');
    const q3 = await pantalla(p);
    ok(q3.qZh === '' && !q3.ver && !q3.qEsOculta && q3.optsZh.length === 0, 'c. ' + tag + ' un texto v2 sin qZh se pregunta en español como siempre ' + JSON.stringify(q3));
    ok(!await p.evaluate(() => document.querySelector('.rd-approx').textContent.includes('ilustrativos')), 'c. ' + tag + ' sin nota, la etiqueta no cambia');
    ok(errs.length === 0, tag + ' sin errores JS ' + errs); await ctx.close();
  }
  // ---------- b. Entrenar con el texto sintético ----------
  for (const sc of ['simp', 'trad']) {
    const { ctx, p, errs } = await page(360, { ac_script_hsk: sc }, true);
    await p.evaluate(() => { LECTURAS.splice(LECTURAS.findIndex(r => r.id === 'syn-sin'), 1); }); // solo el que trae preguntas en chino (si no, Entrenar elige al azar entre los dos)
    const g = await p.evaluate(() => { const keep = window.READINGS; window.READINGS = []; const S = ExamDebug.build('HSK5'); window.READINGS = keep;
      return { id: S.rd.id, rt: S.items.filter(i => i.type === 'rtext').map(i => ({ qzh: i.qzh, zh: i.opts.map(o => o.zh).sort(), ok: i.opts.filter(o => o.ok).length, nota: i.rd.nota })) }; });
    ok(g.rt.length >= 2 && g.rt.slice(0, 2).every(x => x.qzh && x.zh.every(Boolean) && x.ok === 1), 'b. Entrenar/' + sc + ' el texto v2 trae pregunta y opciones en chino ' + JSON.stringify(g));
    await p.evaluate(() => { window.READINGS = []; });
    await p.click('#btn-exam-practice'); await p.waitForTimeout(300); await p.click('.ex-lv[data-k="HSK5"]'); await p.waitForTimeout(500);
    for (let g2 = 0; g2 < 20; g2++) { const t = await p.evaluate(() => ExamDebug.state().items[ExamDebug.state().idx].type); if (t === 'rtext') break;
      const r = await p.evaluate(() => ExamDebug.state().items[ExamDebug.state().idx].opts.findIndex(o => o.ok)); await p.click('#ex-opts .lq-opt[data-i="' + r + '"]'); await p.waitForTimeout(50); await p.click('#ex-next'); await p.waitForTimeout(50); }
    const e = await p.evaluate(() => ({ zh: (document.querySelector('.rd-q-zh') || {}).textContent || '', btn: !!document.getElementById('ex-rd-es'), esOculto: document.getElementById('rd-q-es').classList.contains('hidden'),
      nota: (document.querySelector('.rd-nota') || {}).textContent || '', ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
    ok(e.zh && e.btn && e.esOculto && e.nota === 'Texto original; los datos son ilustrativos' && !e.ovf, 'b. Entrenar/' + sc + ' pantalla: pregunta en chino, «Ver en español» y la nota ' + JSON.stringify(e));
    ok(errs.length === 0, 'Entrenar/' + sc + ' sin errores JS ' + errs); await ctx.close();
  }
  await b.close(); console.log('comprobaciones ' + n + ' · FAILS ' + fails); process.exit(fails ? 1 : 0);
})();
