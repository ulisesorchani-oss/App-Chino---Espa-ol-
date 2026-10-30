// tests/lectura-hsk5-ruido.test.js — texto HSK 5 expositivo «¿Los sonidos afectan la atención?» (rx-h5-ruido)
//   a. datos: tipo examen, nivel 5, expositivo, revisión pendiente, largo 220–380, 5 preguntas EN CHINO (idea, detalle, inferencia con casos nuevos, vocabulario y un V/F),
//      banco de 6 huecos con 2 sobrantes (提高, 价格), 3 parecidas, sin capa 2, nota visible; 干扰 es objetivo en UN solo ejercicio;
//      ninguna pregunta usa 正确率 ni habla de «eficiencia»; la respuesta de la inferencia NO está escrita en el texto (aplica la regla a un examen difícil y a ordenar el cuarto);
//      redacción cautelosa y sin institución ni año
//   b. Exámenes (320/360 px, 简/繁): tarjeta en HSK 5 con la nota, preguntas en chino con «Ver en español», cadena comprensión → banco → parecidas → resumen
//   c. Entrenar: HSK 5 pasa a 5 textos; el v2 sale con sus 5 preguntas en chino, el botón y la nota; los 4 v1 siguen saliendo
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
const NOTA = 'Texto original; los datos son ilustrativos';
(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
  async function page(w, sc) {
    const ctx = await b.newContext({ viewport: { width: w, height: 740 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
    await ctx.addInitScript(([sc]) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1');
      localStorage.setItem('theme', 'light'); localStorage.setItem('ac_view_v1', 'entrenar'); localStorage.setItem('ac_script_hsk', sc); } }, [sc]);
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(APP_URL); await p.waitForTimeout(1300); return { ctx, p, errs };
  }
  // ---------- a. datos ----------
  { const { ctx, p, errs } = await page(360, 'simp');
    const d = await p.evaluate(() => {
      const r = READINGS_V2.find(x => x.id === 'rx-h5-ruido'), L = LECTURAS.find(x => x.id === 'rx-h5-ruido');
      const texto = r.parrafos.map(x => x.zh).join(''), hz = s => s.replace(/[^㐀-鿿]/g, '');
      const q3 = r.comprension[2], q5 = r.comprension[4];
      return { r, L: { origen: L.origen, tipo: L.tipo, nivelKey: L.nivelKey, revision: L.revision, nota: L.nota, etiqueta: LECTURAS_API.etiqueta(L), nq: L.preguntas.length, zh: L.preguntas.every(q => q.qZh && q.qZhT && q.optsZh.length === (q.type === 'vf' ? 2 : 4) && q.optsZhT.length === (q.type === 'vf' ? 2 : 4)), vf: { ok: L.preguntas[4].ok, fixed: L.preguntas[4].fixed, opts: L.preguntas[4].opts, optsZh: L.preguntas[4].optsZh, optsZhT: L.preguntas[4].optsZhT } },
        largo: hz(texto).length, textoZh: texto,
        qTipos: r.comprension.map(q => q.tipo), qZh: r.comprension.map(q => q.qZh + '|' + (q.optsZh || []).join('|')),
        q3enTexto: hz(texto).includes(hz(q3.optsZh[0])), q3why: q3.why, q3zh: q3.qZh, q5: { tipo: q5.tipo, vf: q5.vf, zh: q5.qZh, es: q5.es, why: q5.why }, todo: JSON.stringify(r) };
    });
    const r = d.r;
    ok(r.tipo === 'examen' && r.nivel === 5 && r.genero === 'expositivo' && r.revision === 'pendiente' && !('capa2' in r) && r.nota === NOTA, 'a. ficha: examen, nivel 5, expositivo, pendiente, sin capa 2, nota ' + JSON.stringify([r.tipo, r.nivel, r.genero, r.revision, r.nota]));
    ok(d.largo >= 220 && d.largo <= 380 && r.parrafos.length === 4, 'a. largo ' + d.largo + ' hanzi en 4 párrafos (220–380)');
    ok(JSON.stringify(d.qTipos) === '["idea","detalle","inferencia","vocabulario","vf"]' && d.L.zh && d.L.nq === 5, 'a. 5 preguntas en chino: idea, detalle, inferencia, vocabulario y V/F ' + JSON.stringify(d.qTipos));
    ok(d.L.origen === 'v2' && d.L.tipo === 'examen' && d.L.nivelKey === 'HSK5' && d.L.revision === 'pendiente' && d.L.nota === NOTA && d.L.etiqueta === 'Nivel aproximado: HSK 5 · no oficial · ' + NOTA, 'a. LECTURAS: nivel HSK 5, pendiente y la nota junto a «Nivel aproximado» ' + JSON.stringify(d.L));
    ok(r.glosario.length >= 8 && r.glosario.length <= 12 && r.glosario.filter(g => g.fueraDeNivel).map(g => g.zh).join() === '噪音', 'a. glosario de 8–12 con solo 噪音* fuera de nivel ' + r.glosario.length);
    ok(r.banco.huecos.length === 6 && JSON.stringify(r.banco.palabras) === '["安静","集中","平均","减少","建议","耳机","提高","价格"]', 'a. banco: 6 huecos (安静 集中 平均 减少 建议 耳机) y los sobrantes 提高 y 价格 ' + JSON.stringify(r.banco.palabras));
    ok(r.parecidas.length === 3 && r.parecidas.every(p => p.ok.length === 2 && p.opts.length === 3 && p.delTexto === false), 'a. 3 palabras parecidas (2 válidas y 1 claramente incorrecta cada una)');
    const targets = [].concat(r.banco.huecos.map(h => h.resp), r.banco.palabras.slice(6), r.parecidas.flatMap(p => p.opts));
    ok(!targets.includes('干扰') && r.comprension.filter(q => q.qZh.includes('干扰')).length === 1, 'a. 干扰 es objetivo de UN solo ejercicio (la pregunta de vocabulario); no está en el banco ni en las parecidas');
    ok(!JSON.stringify(r.comprension).includes('正确率') && !JSON.stringify(r.comprension).includes('正確率'), 'a. ninguna pregunta usa 正确率');
    ok(d.textoZh.includes('结果显示') && d.textoZh.includes('研究人员认为') && !/\d{4}年|[一-鿿]{2,}大学(?!生)|研究所|研究院|研究中心/.test(d.textoZh), 'a. redacción cautelosa (结果显示, 研究人员认为), sin año ni institución');
    ok(!d.q3enTexto && !d.textoZh.includes('考试') && !d.textoZh.includes('房间') && /考试/.test(d.q3zh) && /房间/.test(d.q3zh) && /«复杂的工作，最好选择安静的地方»/.test(d.q3why) && /«做简单的事情时，有一点声音也没关系»/.test(d.q3why),
      'a. la inferencia aplica la regla a casos NUEVOS (examen difícil / ordenar el cuarto, que el texto no menciona) y su respuesta no está escrita en el texto ' + d.q3enTexto);
    ok(d.textoZh.includes('三种环境里的题目都一样，有简单的，也有复杂的') && !d.textoZh.includes('难度'), 'a. P2: las preguntas eran las mismas en los tres ambientes e incluían simples y complejas');
    ok(d.textoZh.includes('答对的题目会明显减少') && !d.todo.includes('效率') && !d.todo.includes('降低'), 'a. P3 habla del número de aciertos (no de eficiencia): sin 效率 ni 降低 en el texto, las preguntas, el glosario ni el banco');
    ok(d.q5.tipo === 'vf' && d.q5.vf === false && d.q5.zh === '有普通说话声时，结果比安静时更好。' && d.q5.es === 'Con voces normales el resultado fue mejor que en silencio.' && /80 %/.test(d.q5.why) && /85 %/.test(d.q5.why)
      && d.L.vf.ok === 1 && d.L.vf.fixed && JSON.stringify(d.L.vf.opts) === '["Verdadero","Falso"]' && JSON.stringify(d.L.vf.optsZh) === '["对","错"]' && JSON.stringify(d.L.vf.optsZhT) === '["對","錯"]', 'a. V/F «con voces normales fue mejor que en silencio»: falso (80 % contra 85 %), con opciones fijas 对/错 ' + JSON.stringify(d.q5));
    ok(errs.length === 0, 'a. sin errores JS ' + errs); await ctx.close(); }
  const pant = (p) => p.evaluate(() => ({ qZh: (document.querySelector('.rd-q-zh') || {}).textContent || '', qEsOculta: document.getElementById('rd-q-es').classList.contains('hidden'), ver: !!document.getElementById('rd-es') && !document.getElementById('rd-es').classList.contains('hidden'),
    optsZh: [...document.querySelectorAll('#lq-opts .rd-opt-zh')].map(e => e.textContent), optsEsOcultas: [...document.querySelectorAll('#lq-opts .rd-opt-es')].every(e => e.classList.contains('hidden')),
    nota: document.querySelector('.rd-approx').textContent, ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
  // ---------- b. Exámenes ----------
  for (const w of [320, 360]) for (const sc of ['simp', 'trad']) {
    const { ctx, p, errs } = await page(w, sc); const tag = w + '/' + sc;
    await p.evaluate(() => { showView('aprender'); document.getElementById('tab-exams').click(); }); await p.waitForTimeout(300);
    const card = await p.evaluate(() => { const c = document.querySelector('.rd-card[data-id="rx-h5-ruido"]'); return c ? { lv: c.closest('.rd-level').dataset.lv, label: c.querySelector('.rd-approx-label').textContent, titulo: c.querySelector('.lc-zh').textContent, meta: c.querySelector('.lc-meta').textContent, n: c.closest('.rd-level').querySelectorAll('.rd-card').length } : null; });
    ok(card && card.lv === 'ex-HSK5' && card.n === 5 && card.label.includes(NOTA) && card.titulo === (sc === 'trad' ? '聲音會影響注意力嗎？' : '声音会影响注意力吗？') && /expositivo · 347 字 · 5 preguntas/.test(card.meta), 'b. ' + tag + ' tarjeta en HSK 5 (5 textos) con la nota ' + JSON.stringify(card));
    await p.click('.lc-read[data-id="rx-h5-ruido"]'); await p.waitForTimeout(300);
    ok(await p.evaluate((nota) => document.querySelector('#lesson-pop .rd-approx-label').textContent.includes(nota), NOTA), 'b. ' + tag + ' «Leer»: la nota se ve junto a «Nivel aproximado»');
    await p.evaluate(() => document.getElementById('lq-close').click()); await p.waitForTimeout(200);
    await p.click('.lc-practice[data-id="rx-h5-ruido"]'); await p.waitForTimeout(300);
    for (let i = 0; i < 5; i++) {
      const q = await pant(p);
      ok(q.qZh && q.qEsOculta && q.ver && q.optsZh.length === (i === 4 ? 2 : 4) && q.optsZh.every(Boolean) && q.optsEsOcultas && q.nota.includes(NOTA) && !q.ovf, 'b. ' + tag + ' P' + (i + 1) + ' en chino con «Ver en español», la nota y sin desborde ' + JSON.stringify(q));
      if (i === 0) { ok(q.qZh === (sc === 'trad' ? '這篇文章主要介紹了什麼？' : '这篇文章主要介绍了什么？'), 'b. ' + tag + ' P1 sigue la escritura elegida');
        await p.click('#rd-es'); await p.waitForTimeout(40); ok(await p.evaluate(() => !document.getElementById('rd-q-es').classList.contains('hidden') && /Ocultar el español/.test(document.getElementById('rd-es').textContent)), 'b. ' + tag + ' «Ver en español» muestra la pregunta'); }
      const rp = await p.evaluate(() => { const S = LQ_UI.state; return S.order[S.idx].indexOf(S.lesson.preguntas[S.idx].ok); });
      await p.click('#lq-opts .lq-opt[data-pos="' + rp + '"]'); await p.waitForTimeout(80);
      ok(await p.evaluate(() => /Correcto/.test(document.getElementById('lq-feedback').textContent) && [...document.querySelectorAll('#lq-opts .rd-opt-es')].every(e => !e.classList.contains('hidden'))), 'b. ' + tag + ' P' + (i + 1) + ' acierto: feedback y español a la vista');
      await p.click('#lq-next'); await p.waitForTimeout(150);
    }
    const bk = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, blanks: document.querySelectorAll('.rd-blank').length, chips: document.querySelectorAll('.rd-chip').length, lbl: document.querySelector('.rd-approx').textContent }));
    ok(bk.view === 'rbanco' && bk.blanks === 6 && bk.chips === 8 && bk.lbl.includes(NOTA), 'b. ' + tag + ' banco: 6 huecos, 8 fichas (2 sobrantes) y la nota ' + JSON.stringify(bk));
    const fill = await p.evaluate(() => { const r = LQ_UI.state.lesson, hs = r.banco.huecos; const word = (w) => { const ci = r.banco.palabras.indexOf(w); return LQ_UI.zhKey() === 'trad' ? r.banco.palabrasT[ci] : w; };
      for (let i = 0; i < hs.length; i++) { const bl = document.querySelector('.rd-blank[data-i="' + i + '"]'); if (!bl.classList.contains('is-sel')) bl.click(); const chip = [...document.querySelectorAll('.rd-chip')].find(c => !c.disabled && c.textContent === word(hs[i].resp)); if (!chip) return 'sin ficha ' + hs[i].resp; chip.click(); } return 'ok'; });
    ok(fill === 'ok', 'b. ' + tag + ' se pueden completar los 6 huecos con sus respuestas ' + fill);
    await p.click('#rd-check'); await p.waitForTimeout(100);
    ok(await p.evaluate(() => document.querySelectorAll('.rd-blank.is-ok, .rd-blank.is-right').length === 6 || /6\s*\/\s*6|6 de 6/.test(document.body.innerText)), 'b. ' + tag + ' banco: 6 de 6');
    await p.click('#lq-next'); await p.waitForTimeout(200);
    for (let k = 0; k < 3; k++) {
      ok(await p.evaluate(() => LQ_DEBUG.state.view) === 'rparec' && await p.evaluate((nota) => document.querySelector('.rd-approx').textContent.includes(nota), NOTA), 'b. ' + tag + ' parecida ' + (k + 1) + ': pantalla con la nota');
      const pos = await p.evaluate(() => { const S = LQ_UI.state, pc = S.lesson.parecidas[S.idx]; const w = pc.opts[pc.ok[0]]; const wT = pc.optsT[pc.ok[0]]; const t = LQ_UI.zhKey() === 'trad' ? wT : w;
        return [...document.querySelectorAll('#lq-opts .lq-opt')].findIndex(b => b.textContent.includes(t)); });
      ok(pos >= 0, 'b. ' + tag + ' parecida ' + (k + 1) + ': la opción válida está en pantalla');
      await p.evaluate((pos) => document.querySelectorAll('#lq-opts .lq-opt')[pos].click(), pos); await p.waitForTimeout(100);
      await p.click('#lq-next'); await p.waitForTimeout(200);
    }
    ok(await p.evaluate(() => LQ_DEBUG.state.view) === 'rsum', 'b. ' + tag + ' termina en el resumen de las 3 partes');
    ok(errs.length === 0, 'b. ' + tag + ' sin errores JS ' + errs); await ctx.close();
  }
  // ---------- c. Entrenar ----------
  for (const sc of ['simp', 'trad']) {
    const { ctx, p, errs } = await page(360, sc);
    const g = await p.evaluate(() => { const ids = {}; for (let i = 0; i < 300; i++) { const S = ExamDebug.build('HSK5'); ids[S.rd.id] = (ids[S.rd.id] || 0) + 1; }
      let v2 = null; for (let i = 0; i < 300 && !v2; i++) { const S = ExamDebug.build('HSK5'); if (S.rd.id === 'rx-h5-ruido') v2 = S; }
      return { ids: Object.keys(ids).sort(), v2: v2 && { n: v2.items.length, rt: v2.items.filter(i => i.type === 'rtext').map(i => ({ qzh: i.qzh, zh: i.opts.map(o => o.zh).every(Boolean), ok: i.opts.filter(o => o.ok).length, nota: i.rd.nota })) } }; });
    ok(JSON.stringify(g.ids) === JSON.stringify(['rd-h5-carta', 'rd-h5-celular', 'rd-h5-libros', 'rd-h5-sueno', 'rx-h5-ruido']), 'c. Entrenar/' + sc + ' HSK 5 pasa de 4 a 5 textos y salen todos ' + JSON.stringify(g.ids));
    ok(g.v2 && g.v2.n === 20 && g.v2.rt.length === 5 && g.v2.rt.every(x => x.qzh && x.zh && x.ok === 1 && x.nota === NOTA), 'c. Entrenar/' + sc + ' el v2: 20 ítems, 5 preguntas en chino (la última V/F con 对/错) y la nota ' + JSON.stringify(g.v2));
    await p.evaluate(() => { for (const id of ['rd-h5-celular', 'rd-h5-carta', 'rd-h5-sueno', 'rd-h5-libros']) { const i = LECTURAS.findIndex(r => r.id === id); if (i >= 0) LECTURAS.splice(i, 1); } window.READINGS = []; });
    await p.click('#btn-exam-practice'); await p.waitForTimeout(300); await p.click('.ex-lv[data-k="HSK5"]'); await p.waitForTimeout(500);
    for (let k = 0; k < 20; k++) { const t = await p.evaluate(() => ExamDebug.state().items[ExamDebug.state().idx].type); if (t === 'rtext') break;
      const r = await p.evaluate(() => ExamDebug.state().items[ExamDebug.state().idx].opts.findIndex(o => o.ok)); await p.click('#ex-opts .lq-opt[data-i="' + r + '"]'); await p.waitForTimeout(40); await p.click('#ex-next'); await p.waitForTimeout(40); }
    const e = await p.evaluate(() => ({ zh: (document.querySelector('.rd-q-zh') || {}).textContent || '', btn: !!document.getElementById('ex-rd-es'), nota: (document.querySelector('.rd-nota') || {}).textContent || '', ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
    ok(e.zh && e.btn && e.nota === NOTA && !e.ovf, 'c. Entrenar/' + sc + ' pantalla: pregunta en chino, «Ver en español» y la nota ' + JSON.stringify(e));
    ok(errs.length === 0, 'c. Entrenar/' + sc + ' sin errores JS ' + errs); await ctx.close();
  }
  await b.close(); console.log('comprobaciones ' + n + ' · FAILS ' + fails); process.exit(fails ? 1 : 0);
})();
