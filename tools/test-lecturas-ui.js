#!/usr/bin/env node
// tools/test-lecturas-ui.js — pantallas de lecturas (readings-unify.js + readings-ui.js) a 320 y 360 px, en los tres temas.
//   node tools/test-lecturas-ui.js                 → código de salida 1 si algo falla
//   SHOTS_DIR=/ruta node tools/test-lecturas-ui.js → además guarda capturas
//
// Qué verifica (servidor estático local + Chromium con Playwright, sin red real):
//   FUENTE ÚNICA  · window.LECTURAS junta los 12 v1 y los 5 v2 (ids únicos); etiqueta «Nivel aproximado: … · no oficial» en HSK y TOCFL;
//                   revision de v1 (HSK 3 revisado; HSK 5 y TOCFL pendiente); visible() con la constante 'todas'; V/F solo en v2 (Verdadero/Falso fijas)
//   LISTA         · «Lecturas tipo examen»: 16 tarjetas en HSK 3, HSK 4, HSK 5 y TOCFL B1; «Lecturas de estudio»: solo el texto de tipo 'estudio';
//                   botones APILADOS (Practicar principal arriba, Leer secundario abajo), sin desborde ni texto cortado
//   LEER          · glosario con * en lo fuera de nivel (v2) y leyenda; v1 sin asteriscos; 简/繁; pinyin; texto con los párrafos
//   PRACTICAR v2  · comprensión de 4 opciones y Verdadero/Falso (2 opciones fijas, letras V/F); explicaciones; progreso en ac_reading_v1
//                   (conserva las claves que ya tuviera el registro); sin tocar el SRS
//   PRACTICAR v1  · camino de siempre (vista 'rquiz', opción correcta = índice 0, 3 opciones) con la etiqueta común
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = path.resolve(__dirname, '..');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('no'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
const SHOTS = process.env.SHOTS_DIR || '';

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
  const launch = { headless: true };
  for (const exe of ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROMIUM]) if (exe && fs.existsSync(exe)) { launch.executablePath = exe; break; }
  const b = await chromium.launch(launch);
  const sleep = (p, ms) => p.waitForTimeout(ms);

  for (const w of [320, 360]) for (const th of ['light', 'paper', 'dark']) {
    const tag = w + '/' + th;
    const ctx = await b.newContext({ viewport: { width: w, height: 740 }, serviceWorkers: 'block' });
    await ctx.addInitScript((theme) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('theme', theme); } }, th);
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1600);

    // ── fuente única ──
    const U = await p.evaluate(() => {
      const A = window.LECTURAS_API, L = window.LECTURAS, ids = L.map(r => r.id);
      const vf = A.get('rx-h4-chunlian').preguntas.filter(q => q.type === 'vf')[0];
      return { n: L.length, v1: L.filter(r => r.origen === 'v1').length, v2: L.filter(r => r.origen === 'v2').length, uniq: new Set(ids).size === ids.length,
        raw1: window.READINGS.length, raw2: window.READINGS_V2.length,
        etq: { h3: A.etiqueta(A.get('rd-h3-bici')), h4: A.etiqueta(A.get('rx-h4-tren')), b1: A.etiqueta(A.get('rd-b1-fangdong')), h5: A.etiqueta(A.get('rd-h5-celular')) },
        rev: { h3: A.get('rd-h3-bici').revision, h5: A.get('rd-h5-celular').revision, b1: A.get('rd-b1-fangdong').revision, v2: A.get('rx-h4-tren').revision },
        vis: L.every(A.visible), ex: A.examen().length, es: A.estudio().length, esId: A.estudio().map(r => r.id).join(),
        order: A.examen().map(r => r.nivelKey).filter((k, i, a) => a.indexOf(k) === i).join(),
        vfShape: vf && { opts: vf.opts, ok: vf.ok, fixed: vf.fixed },
        v1vf: window.READINGS.some(r => r.questions.some(q => q.type === 'vf')) || L.filter(r => r.origen === 'v1').some(r => r.preguntas.some(q => q.type === 'vf')),
        v1ok: L.filter(r => r.origen === 'v1').every(r => r.preguntas.every(q => q.ok === 0 && !q.fixed)) };
    });
    ok(U.n === 17 && U.v1 === 12 && U.v2 === 5 && U.uniq && U.raw1 === 12 && U.raw2 === 5, tag + ' LECTURAS = 12 v1 + 5 v2, ids únicos y los datos crudos intactos ' + JSON.stringify([U.n, U.v1, U.v2]));
    ok(U.etq.h3 === 'Nivel aproximado: HSK 3 · no oficial' && U.etq.h4 === 'Nivel aproximado: HSK 4 · no oficial' && U.etq.h5 === 'Nivel aproximado: HSK 5 · no oficial' && U.etq.b1 === 'Nivel aproximado: TOCFL B1 · no oficial', tag + ' etiqueta «Nivel aproximado: … · no oficial» también en TOCFL ' + JSON.stringify(U.etq));
    ok(U.rev.h3 === 'revisado' && U.rev.h5 === 'pendiente' && U.rev.b1 === 'pendiente' && U.rev.v2 === 'revisado' && U.vis, tag + ' revision de v1 por nivel; visible() deja pasar todo con la constante «todas» ' + JSON.stringify(U.rev));
    ok(U.ex === 16 && U.es === 1 && U.esId === 'rx-h4-chunlian' && U.order === 'HSK3,HSK4,HSK5,TOCFL-B1', tag + ' examen = 16 (HSK 3, 4, 5, TOCFL B1) y estudio = solo «貼春聯» ' + JSON.stringify([U.ex, U.es, U.esId, U.order]));
    ok(U.vfShape && U.vfShape.opts.join() === 'Verdadero,Falso' && U.vfShape.ok === 1 && U.vfShape.fixed === true && !U.v1vf && U.v1ok, tag + ' V/F solo en v2 (Verdadero/Falso fijas); los v1 conservan «correcta = índice 0» ' + JSON.stringify(U.vfShape));

    // ── lista en Exámenes ──
    await p.click('#nav-aprender'); await p.click('#tab-exams'); await sleep(p, 400);
    const Li = await p.evaluate(() => {
      const wrap = document.getElementById('reading-list'), cards = [...wrap.querySelectorAll('.rd-card')], st = [...document.querySelectorAll('#reading-study .rd-card')];
      const geo = (c) => { const a = c.querySelector('.lc-practice').getBoundingClientRect(), r = c.querySelector('.lc-read').getBoundingClientRect(); return { stacked: r.top >= a.bottom - 1, sameW: Math.abs(a.width - r.width) < 2, h: [a.height, r.height], left: Math.abs(a.left - r.left) < 2 }; };
      const g = cards.concat(st).map(geo);
      return { title: document.getElementById('rd-title').textContent, groups: [...wrap.querySelectorAll('.rd-level-name')].map(x => x.textContent), cards: cards.length,
        labels: cards.map(c => c.querySelector('.rd-approx-label').textContent), btns: cards.map(c => [...c.querySelectorAll('.lq-btn')].map(x => x.textContent.trim()).join('|')),
        primary: cards.every(c => c.querySelector('.lc-practice').classList.contains('lq-primary') && !c.querySelector('.lc-read').classList.contains('lq-primary')),
        stackedAll: g.every(x => x.stacked && x.sameW && x.left && x.h[0] >= 44 && x.h[1] >= 44),
        studyHidden: document.getElementById('rd-study-section').classList.contains('hidden'), studyTitle: (document.getElementById('rd-study-title') || {}).textContent, studyCards: st.length,
        studyLabel: st.map(c => c.querySelector('.rd-approx-label').textContent).join(),
        ovf: document.documentElement.scrollWidth > innerWidth + 1, cut: cards.concat(st).some(c => c.scrollWidth > c.clientWidth + 1),
        studyInExamen: !!wrap.querySelector('[data-id="rx-h4-chunlian"]'), tradTitle: cards[0].querySelector('.lc-zh').textContent };
    });
    ok(Li.title === '📖 Lecturas tipo examen' && Li.groups.join() === 'HSK 3,HSK 4,HSK 5,TOCFL B1' && Li.cards === 16 && !Li.studyInExamen, tag + ' lista: 16 tarjetas en HSK 3, HSK 4, HSK 5 y TOCFL B1; el texto de estudio NO está ahí ' + JSON.stringify([Li.groups, Li.cards]));
    ok(Li.labels.slice(0, 4).every(t => t === 'Nivel aproximado: HSK 3 · no oficial') && Li.labels.slice(12).every(t => t === 'Nivel aproximado: TOCFL B1 · no oficial'), tag + ' cada tarjeta lleva la etiqueta común (HSK y TOCFL)');
    ok(Li.btns.every(x => x === '🎯 Practicar|📖 Leer') && Li.primary && Li.stackedAll, tag + ' botones apilados: Practicar (principal) arriba y Leer (secundario) abajo, mismo ancho, ≥ 44 px');
    ok(!Li.studyHidden && Li.studyTitle === '📚 Lecturas de estudio' && Li.studyCards === 1 && Li.studyLabel === 'Nivel aproximado: HSK 4 · no oficial', tag + ' sección aparte «📚 Lecturas de estudio» con 1 texto ' + JSON.stringify([Li.studyHidden, Li.studyCards, Li.studyLabel]));
    ok(!Li.ovf && !Li.cut, tag + ' lista sin desborde horizontal ni tarjetas cortadas');
    if (SHOTS) { await p.evaluate(() => document.querySelector('#reading-list details[data-lv="ex-HSK4"]').scrollIntoView()); await sleep(p, 150); await p.screenshot({ path: path.join(SHOTS, 'lista-' + w + '-' + th + '.png') }); }

    // ── Leer: glosario con asteriscos (v2) y sin ellos (v1) ──
    await p.click('[data-id="rx-h4-chunlian"][data-act="read"]'); await sleep(p, 700);
    const G = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, ref: window.acScriptRef && window.acScriptRef.id, stack: Nav.stack.join(),
      items: [...document.querySelectorAll('.lq-gloss-item')].map(e => ({ zh: e.querySelector('.lq-gloss-zh').textContent, star: !!e.querySelector('.lq-gloss-star'), py: e.querySelector('.lq-gloss-py').textContent, es: e.querySelector('.lq-gloss-es').textContent })),
      legend: (document.querySelector('.lq-gloss-legend') || {}).textContent || '', lbl: document.querySelector('#lq-body .rd-approx-label').textContent,
      ovf: document.documentElement.scrollWidth > innerWidth + 1, last: localStorage.getItem('ac_last_lesson_id') }));
    const want = ['春联', '家家户户', '相配', '上联', '下联', '横批', '毛笔', '现成', '气氛'];
    ok(G.view === 'story' && G.ref === 'rx-h4-chunlian' && G.stack === 'lesson-pop' && G.items.length === 11, tag + ' Leer v2 abre el visor con el glosario de 11 palabras ' + JSON.stringify([G.view, G.ref, G.stack, G.items.length]));
    ok(G.items.filter(i => i.star).map(i => i.zh.replace('*', '')).join() === want.join() && G.items.every(i => /[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(i.py) && i.es.length > 3), tag + ' asterisco EXACTO en las 9 palabras fuera de nivel, con pinyin y glosa ' + G.items.filter(i => i.star).map(i => i.zh).join(' '));
    ok(/^\* Fuera del nivel: es una palabra más difícil que HSK 4\.$/.test(G.legend) && G.lbl === 'Nivel aproximado: HSK 4 · no oficial' && !G.ovf && G.last === null, tag + ' leyenda del asterisco, etiqueta común, sin desborde y sin pisar ac_last_lesson_id');
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'glosario-' + w + '-' + th + '.png') });
    await p.click('#lq-gloss-continue'); await sleep(p, 300);
    const T = await p.evaluate(() => ({ lines: document.querySelectorAll('#lq-body .lq-line').length, says: document.querySelectorAll('#lq-body .lq-line-say').length, prac: document.getElementById('lq-story-practice').textContent,
      primary: document.getElementById('lq-story-practice').classList.contains('lq-primary'), first: document.querySelector('#lq-body .lq-line-zh').textContent.slice(0, 6), ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
    ok(T.lines === 3 && T.says === 3 && T.prac === '🎯 Practicar' && T.primary && !T.ovf, tag + ' texto v2: 3 párrafos tocables con 🔊 y botón principal «Practicar» ' + JSON.stringify(T));
    await p.evaluate(() => document.getElementById('lq-close').click()); await sleep(p, 250);

    // v1: glosario SIN asteriscos (no se calcula) y misma pantalla
    await p.click('[data-id="rd-h3-bici"][data-act="read"]'); await sleep(p, 600);
    const G1 = await p.evaluate(() => ({ n: document.querySelectorAll('.lq-gloss-item').length, stars: document.querySelectorAll('.lq-gloss-star').length, legend: !!document.querySelector('.lq-gloss-legend'), lbl: document.querySelector('#lq-body .rd-approx-label').textContent }));
    ok(G1.n === 4 && G1.stars === 0 && !G1.legend && G1.lbl === 'Nivel aproximado: HSK 3 · no oficial', tag + ' Leer v1: glosario de 4 palabras sin asteriscos ni leyenda ' + JSON.stringify(G1));
    await p.evaluate(() => document.getElementById('lq-close').click()); await sleep(p, 250);

    // 简/繁: con escritura tradicional el glosario y el texto salen en zhT
    await p.evaluate(() => { try { localStorage.setItem('ac_script_hsk', 'trad'); } catch (e) { /* noop */ } });
    const tr = await p.evaluate(() => { const r = LECTURAS_API.get('rx-h4-tren'); return { zhT: r.glosario[0].zhT, zh: r.glosario[0].zh }; });
    ok(tr.zhT === '參加' && tr.zh === '参加', tag + ' los datos v2 traen el tradicional del glosario (参加 → 參加)');
    await p.evaluate(() => { try { localStorage.removeItem('ac_script_hsk'); } catch (e) { /* noop */ } });

    // ── Practicar v2: 4 opciones ──
    await p.evaluate(() => { window.__srs = 0; if (typeof window.acSrsMiss === 'function') { const o = window.acSrsMiss; window.acSrsMiss = function () { window.__srs++; return o.apply(this, arguments); }; } });
    await p.evaluate(() => LQ_READING.save('rx-h4-tren', { best: 1, of: 2, done: true, tries: 1, last: '2026-01-01', qs: [true, false], bk: { best: 4, of: 6 } })); // exports de lessons-graduated.js
    await p.click('[data-id="rx-h4-tren"][data-act="practice"]'); await sleep(p, 600);
    let Q = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, stack: Nav.stack.join(), n: document.querySelectorAll('#lq-opts .lq-opt').length, letters: [...document.querySelectorAll('#lq-opts .lq-opt-letter')].map(x => x.textContent).join(''),
      meta: document.querySelector('.rd-q-meta').textContent, q: document.getElementById('rd-q-es').textContent, textOpen: document.querySelector('.rd-text').open, lines: document.querySelectorAll('.rd-lines .lq-line').length,
      lbl: document.querySelector('.rd-approx').textContent, prog: document.getElementById('lq-progress-num').textContent, ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
    ok(Q.view === 'rquiz2' && Q.stack === 'lesson-pop' && Q.n === 4 && Q.letters === 'ABCD' && /Detalle/.test(Q.meta) && Q.textOpen && Q.lines === 3 && Q.prog === '1/2' && !Q.ovf, tag + ' comprensión v2: 4 opciones con el texto visible ' + JSON.stringify([Q.view, Q.n, Q.meta, Q.prog]));
    ok(Q.lbl === 'Nivel aproximado: HSK 4 · no oficial' && Q.q === '¿Por qué Xiao Lin perdió el primer tren?', tag + ' etiqueta común y pregunta en español');
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'responder-' + w + '-' + th + '.png') });
    // 1.ª pregunta: elegir una INCORRECTA (la que no es «Había mucho tránsito…») → whyNot + la correcta
    const wrongPos = await p.evaluate(() => [...document.querySelectorAll('#lq-opts .lq-opt')].findIndex(b => !/tránsito/.test(b.textContent)));
    await p.evaluate((pos) => document.querySelectorAll('#lq-opts .lq-opt')[pos].click(), wrongPos); await sleep(p, 200);
    let F = await p.evaluate(() => ({ right: [...document.querySelectorAll('#lq-opts .lq-opt')].filter(b => b.classList.contains('is-right')).map(b => b.textContent).join(), wrong: document.querySelectorAll('#lq-opts .is-wrong').length,
      fb: document.getElementById('lq-feedback').innerText, nx: !document.getElementById('lq-next').classList.contains('hidden') }));
    ok(/tránsito/.test(F.right) && F.wrong === 1 && /No es esa/.test(F.fb) && /Tu respuesta:/.test(F.fb) && /La correcta \(/.test(F.fb) && /路上堵车/.test(F.fb) && F.nx, tag + ' respuesta incorrecta: marca la correcta, explica el distractor (whyNot) y cita el texto ' + JSON.stringify(F.fb.slice(0, 80)));
    await p.click('#lq-next'); await sleep(p, 200);
    const okPos = await p.evaluate(() => [...document.querySelectorAll('#lq-opts .lq-opt')].findIndex(b => /Llegó cuando la boda ya había empezado/.test(b.textContent)));
    await p.evaluate((pos) => document.querySelectorAll('#lq-opts .lq-opt')[pos].click(), okPos); await sleep(p, 200);
    ok(await p.evaluate(() => /¡Correcto!/.test(document.getElementById('lq-feedback').innerText)), tag + ' respuesta correcta: «¡Correcto!»');
    await p.click('#lq-next'); await sleep(p, 300);
    const Fin = await p.evaluate(() => ({ score: document.querySelector('.lq-final-score').textContent, rb: JSON.parse(localStorage.getItem('ac_reading_v1') || '{}')['rx-h4-tren'], srs: window.__srs || 0,
      btns: [...document.querySelectorAll('.lq-final-actions .lq-btn')].map(x => x.textContent.trim()).join('|'), brk: [...document.querySelectorAll('.rd-breakdown li')].map(li => li.innerText.replace(/\s+/g, ' ')).join(';') }));
    ok(Fin.score === '1/2' && Fin.rb && Fin.rb.best === 1 && Fin.rb.of === 2 && Fin.rb.done === true && Fin.rb.tries === 2 && JSON.stringify(Fin.rb.qs) === '[false,true]' && /^\d{4}-\d{2}-\d{2}$/.test(Fin.rb.last), tag + ' progreso en ac_reading_v1 con la forma de siempre {best, of, done, last, tries, qs} ' + JSON.stringify(Fin.rb));
    ok(Fin.rb && Fin.rb.bk && Fin.rb.bk.best === 4 && Fin.rb.bk.of === 6, tag + ' el registro conserva las claves que ya tuviera (p. ej. un puntaje de otra sección)');
    ok(Fin.srs === 0 && /Detalle 0\/1/.test(Fin.brk) && /Idea principal 1\/1/.test(Fin.brk) && /Releer/.test(Fin.btns), tag + ' resumen por tipo, botones finales y el SRS (acSrsMiss) sin llamadas ' + Fin.brk);
    await p.evaluate(() => document.getElementById('lq-final-close').click()); await sleep(p, 250);
    ok(await p.evaluate(() => document.querySelector('[data-id="rx-h4-tren"]').closest('.rd-card').querySelector('.lc-best').textContent.trim()) === '🎯 1/2 ✓', tag + ' la lista refresca el puntaje (🎯 1/2 ✓) al cerrar');

    // ── Practicar v2: Verdadero/Falso (texto de estudio «貼春聯»: 1.ª comprensión, 2.ª V/F) ──
    await p.click('[data-id="rx-h4-chunlian"][data-act="practice"]'); await sleep(p, 500);
    await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[0].click()); await sleep(p, 150);
    await p.click('#lq-next'); await sleep(p, 250);
    const V = await p.evaluate(() => ({ meta: document.querySelector('.rd-q-meta').textContent, q: document.getElementById('rd-q-es').textContent, opts: [...document.querySelectorAll('#lq-opts .lq-opt')].map(b => b.textContent.replace(/\s+/g, ' ').trim()),
      vf: document.querySelectorAll('#lq-opts .rd-opt-vf').length, prog: document.getElementById('lq-progress-num').textContent, ovf: document.documentElement.scrollWidth > innerWidth + 1,
      rects: [...document.querySelectorAll('#lq-opts .lq-opt')].map(b => b.getBoundingClientRect().height) }));
    ok(/Verdadero o falso/.test(V.meta) && V.opts.join('|') === 'VVerdadero|FFalso' && V.vf === 2 && V.prog === '2/2' && !V.ovf && V.rects.every(h => h >= 44), tag + ' V/F: 2 opciones fijas «Verdadero»/«Falso» con letras V/F y ≥ 44 px ' + JSON.stringify(V.opts));
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'vf-' + w + '-' + th + '.png') });
    await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[0].click()); await sleep(p, 200); // «Verdadero»: incorrecto (la afirmación es falsa)
    const VF = await p.evaluate(() => ({ fb: document.getElementById('lq-feedback').innerText, right: [...document.querySelectorAll('#lq-opts .is-right')].map(b => b.textContent.trim()).join(), wrong: [...document.querySelectorAll('#lq-opts .is-wrong')].map(b => b.textContent.trim()).join() }));
    ok(/No es esa/.test(VF.fb) && /La afirmación es falsa\./.test(VF.fb) && /有的家庭自己用毛笔写/.test(VF.fb) && /Falso/.test(VF.right) && /Verdadero/.test(VF.wrong), tag + ' V/F incorrecta: marca «Falso», dice que la afirmación es falsa y cita el texto ' + JSON.stringify(VF.fb.slice(0, 70)));
    await p.click('#lq-next'); await sleep(p, 300);
    ok(await p.evaluate(() => JSON.parse(localStorage.getItem('ac_reading_v1'))['rx-h4-chunlian'].of) === 2, tag + ' el puntaje de V/F entra en el mismo registro (of = 2)');
    await p.evaluate(() => document.getElementById('lq-final-close').click()); await sleep(p, 250);

    // ── Practicar v1: camino de siempre ──
    await p.click('[data-id="rd-h3-bici"][data-act="practice"]'); await sleep(p, 600);
    const V1 = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, rightPos: LQ_DEBUG.rightPos, n: document.querySelectorAll('#lq-opts .lq-opt').length, lbl: document.querySelector('.rd-approx').textContent, meta: document.querySelector('.rd-q-meta').textContent,
      letters: [...document.querySelectorAll('#lq-opts .lq-opt-letter')].map(x => x.textContent).join('') }));
    ok(V1.view === 'rquiz' && V1.n === 3 && V1.letters === 'ABC' && V1.rightPos >= 0 && /Detalle/.test(V1.meta), tag + ' Practicar v1 usa el camino de siempre (vista rquiz, 3 opciones, correcta = índice 0) ' + JSON.stringify([V1.view, V1.n, V1.rightPos]));
    ok(V1.lbl === 'Nivel aproximado: HSK 3 · no oficial', tag + ' la comprensión v1 muestra la etiqueta común ' + JSON.stringify(V1.lbl));
    await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[LQ_DEBUG.rightPos].click()); await sleep(p, 200);
    ok(await p.evaluate(() => /¡Correcto!/.test(document.getElementById('lq-feedback').innerText)), tag + ' v1: la respuesta correcta se corrige igual que antes');
    await p.evaluate(() => document.getElementById('lq-close').click()); await sleep(p, 250);
    // desde Leer, «Practicar» de un v1 también va al camino de siempre
    await p.click('[data-id="rd-b1-fangdong"][data-act="read"]'); await sleep(p, 700);
    await p.click('#lq-gloss-continue'); await sleep(p, 250); await p.click('#lq-story-practice'); await sleep(p, 500);
    const V1b = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, lbl: document.querySelector('.rd-approx').textContent, n: document.querySelectorAll('#lq-opts .lq-opt').length }));
    ok(V1b.view === 'rquiz' && V1b.lbl === 'Nivel aproximado: TOCFL B1 · no oficial' && V1b.n === 4, tag + ' Leer → Practicar en un v1 de TOCFL: camino de siempre y etiqueta «TOCFL B1» ' + JSON.stringify(V1b));
    await p.evaluate(() => document.getElementById('lq-close').click()); await sleep(p, 250);

    ok(errs.length === 0, tag + ' sin errores JS: ' + errs.join(' | '));
    await ctx.close();
  }

  await b.close(); server.close();
  console.log('test-lecturas-ui: ' + n + ' comprobaciones · ' + (fails ? fails + ' FALLAN' : 'todo en regla'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); try { server.close(); } catch (x) { /* nada */ } process.exit(1); });
