#!/usr/bin/env node
// tools/test-lecturas-ui.js — pantallas de lecturas (readings-unify.js + readings-ui.js) a 320 y 360 px, en los tres temas.
//   node tools/test-lecturas-ui.js                 → código de salida 1 si algo falla
//   SHOTS_DIR=/ruta node tools/test-lecturas-ui.js → además guarda capturas
//
// Qué verifica (servidor estático local + Chromium con Playwright, sin red real):
//   FUENTE ÚNICA  · window.LECTURAS junta los 12 v1 y los 5 v2 (ids únicos); etiqueta «Nivel aproximado: … · no oficial» en HSK y TOCFL;
//                   revision de v1 (HSK 3 revisado; HSK 5 y TOCFL pendiente); visible() con la constante 'todas'; V/F solo en v2 (Verdadero/Falso fijas)
//   LISTA         · «Lecturas tipo examen»: 17 tarjetas en HSK 3, HSK 4, HSK 5 y TOCFL B1; «Lecturas de estudio»: solo el texto de tipo 'estudio';
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

  // ── ayudas de la práctica encadenada (se ejecutan dentro de la página) ──
  // rellena el banco: wrongPairs = [[i, j]] intercambia las respuestas de esos dos huecos (queda mal); si no, todo bien
  const fillBank = (p, swap) => p.evaluate((swap) => {
    const r = window.LQ_UI.state.lesson, hs = r.banco.huecos, want = hs.map(h => h.resp);
    if (swap) { const t = want[swap[0]]; want[swap[0]] = want[swap[1]]; want[swap[1]] = t; }
    const word = (w) => { const ci = r.banco.palabras.indexOf(w); return window.LQ_UI.zhKey() === 'trad' && r.banco.palabrasT ? r.banco.palabrasT[ci] : w; };
    for (let i = 0; i < hs.length; i++) {
      const bl = document.querySelector('.rd-blank[data-i="' + i + '"]');
      if (!bl.classList.contains('is-sel')) bl.click(); // un hueco ya elegido no se vuelve a tocar (volver a tocarlo lo suelta)
      const chip = [...document.querySelectorAll('.rd-chip')].find(c => !c.disabled && c.textContent === word(want[i]));
      if (!chip) return 'sin ficha para ' + want[i];
      chip.click();
    }
    return 'ok';
  }, swap || null);
  // termina lo que falte de una práctica v2 (banco bien, parecidas con la primera opción) y cierra desde el resumen
  const finishChain = async (p) => {
    for (let g = 0; g < 8; g++) {
      const v = await p.evaluate(() => LQ_DEBUG.state.view);
      if (v === 'rbanco') { await fillBank(p); await p.click('#rd-check'); await sleep(p, 100); await p.click('#lq-next'); await sleep(p, 200); }
      else if (v === 'rparec') { await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[0].click()); await sleep(p, 100); await p.click('#lq-next'); await sleep(p, 200); }
      else if (v === 'rsum') { await p.evaluate(() => document.getElementById('lq-final-close').click()); await sleep(p, 250); return; }
      else break;
    }
  };

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
    ok(U.n === 18 && U.v1 === 12 && U.v2 === 6 && U.uniq && U.raw1 === 12 && U.raw2 === 6, tag + ' LECTURAS = 12 v1 + 6 v2, ids únicos y los datos crudos intactos ' + JSON.stringify([U.n, U.v1, U.v2]));
    ok(U.etq.h3 === 'Nivel aproximado: HSK 3 · no oficial' && U.etq.h4 === 'Nivel aproximado: HSK 4 · no oficial' && U.etq.h5 === 'Nivel aproximado: HSK 5 · no oficial' && U.etq.b1 === 'Nivel aproximado: TOCFL B1 · no oficial', tag + ' etiqueta «Nivel aproximado: … · no oficial» también en TOCFL ' + JSON.stringify(U.etq));
    ok(U.rev.h3 === 'revisado' && U.rev.h5 === 'pendiente' && U.rev.b1 === 'pendiente' && U.rev.v2 === 'revisado' && U.vis, tag + ' revision de v1 por nivel; visible() deja pasar todo con la constante «todas» ' + JSON.stringify(U.rev));
    ok(U.ex === 17 && U.es === 1 && U.esId === 'rx-h4-chunlian' && U.order === 'HSK3,HSK4,HSK5,TOCFL-B1', tag + ' examen = 17 (HSK 3, 4, 5, TOCFL B1) y estudio = solo «貼春聯» ' + JSON.stringify([U.ex, U.es, U.esId, U.order]));
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
    ok(Li.title === '📖 Lecturas tipo examen' && Li.groups.join() === 'HSK 3,HSK 4,HSK 5,TOCFL B1' && Li.cards === 17 && !Li.studyInExamen, tag + ' lista: 17 tarjetas en HSK 3, HSK 4, HSK 5 y TOCFL B1; el texto de estudio NO está ahí ' + JSON.stringify([Li.groups, Li.cards]));
    ok(Li.labels.slice(0, 4).every(t => t === 'Nivel aproximado: HSK 3 · no oficial') && Li.labels[12] === 'Nivel aproximado: HSK 5 · no oficial · Texto original; los datos son ilustrativos' && Li.labels.slice(13).every(t => t === 'Nivel aproximado: TOCFL B1 · no oficial'), tag + ' cada tarjeta lleva la etiqueta común (HSK y TOCFL)');
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
    await p.evaluate(() => LQ_READING.save('rx-h4-tren', { best: 1, of: 2, done: true, tries: 1, last: '2026-01-01', qs: [true, false], bk: { best: 5, of: 6, tries: 2 }, otra: { clave: 1 } })); // exports de lessons-graduated.js
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
    await p.click('#lq-next'); await sleep(p, 300); // fin de la comprensión → 2.ª parte (banco)
    const C = await p.evaluate(() => ({ rb: JSON.parse(localStorage.getItem('ac_reading_v1') || '{}')['rx-h4-tren'], view: LQ_DEBUG.state.view }));
    ok(C.view === 'rbanco' && C.rb && C.rb.best === 1 && C.rb.of === 2 && C.rb.done === true && C.rb.tries === 2 && JSON.stringify(C.rb.qs) === '[false,true]' && /^\d{4}-\d{2}-\d{2}$/.test(C.rb.last), tag + ' al terminar la comprensión: pasa al banco y el progreso queda en ac_reading_v1 con la forma de siempre ' + JSON.stringify(C.rb));
    ok(C.rb.otra && C.rb.otra.clave === 1 && C.rb.bk && C.rb.bk.best === 5 && C.rb.bk.tries === 2, tag + ' el registro conserva las claves que ya tuviera (bk y una ajena)');

    // ── 🧩 banco: se toca un HUECO y después una FICHA ──
    const Bk = await p.evaluate(() => ({ sec: document.querySelector('.rd-sec').textContent, blanks: document.querySelectorAll('.rd-blank').length, chips: document.querySelectorAll('.rd-chip').length, hint: document.getElementById('rd-hint').textContent,
      check: document.getElementById('rd-check').disabled, gloss: document.querySelectorAll('.lq-glossary, .lq-gloss-item, .lq-gloss-star').length, lbl: document.querySelector('.rd-approx').textContent, ovf: document.documentElement.scrollWidth > innerWidth + 1,
      mins: [...document.querySelectorAll('.rd-blank, .rd-chip, #rd-check')].map(b => b.getBoundingClientRect().height), items: document.querySelectorAll('.rd-bank-item').length,
      view: LQ_DEBUG.state.view, mine: window.LQ_UI.state.lesson.banco.palabras.length }));
    ok(Bk.view === 'rbanco' && Bk.sec === 'Parte 2 de 3 · 🧩 Palabras' && Bk.blanks === 6 && Bk.items === 6 && Bk.chips === 8 && Bk.mine === 8 && Bk.check === true && /Sobran 2 fichas/.test(Bk.hint), tag + ' banco: 6 huecos, 8 fichas (2 sobran), «Comprobar» apagado ' + JSON.stringify([Bk.sec, Bk.blanks, Bk.chips, Bk.hint]));
    ok(Bk.gloss === 0 && Bk.lbl === 'Nivel aproximado: HSK 4 · no oficial' && !Bk.ovf && Bk.mins.every(h => h >= 44), tag + ' banco: el glosario NO se muestra, etiqueta común, sin desborde y objetivos ≥ 44 px');
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'banco-' + w + '-' + th + '.png') });
    await p.evaluate(() => document.querySelector('.rd-chip').click()); await sleep(p, 100); // ficha SIN hueco elegido: no rellena nada
    const B0 = await p.evaluate(() => ({ warn: document.getElementById('rd-hint').classList.contains('is-warn'), hint: document.getElementById('rd-hint').textContent, filled: document.querySelectorAll('.rd-blank.is-filled').length, used: document.querySelectorAll('.rd-chip.is-used').length }));
    ok(B0.warn && /Primero tocá un hueco/.test(B0.hint) && B0.filled === 0 && B0.used === 0, tag + ' ficha sin hueco elegido: avisa «Primero tocá un hueco» y no rellena ' + JSON.stringify(B0));
    await p.evaluate(() => document.querySelector('.rd-blank[data-i="0"]').click()); await sleep(p, 80);
    const B1 = await p.evaluate(() => ({ sel: document.querySelector('.rd-blank[data-i="0"]').classList.contains('is-sel'), pressed: document.querySelector('.rd-blank[data-i="0"]').getAttribute('aria-pressed') }));
    await p.evaluate(() => [...document.querySelectorAll('.rd-chip')][0].click()); await sleep(p, 80);
    const B2 = await p.evaluate(() => ({ txt: document.querySelector('.rd-blank[data-i="0"]').textContent, chip: [...document.querySelectorAll('.rd-chip')][0].textContent, used: document.querySelectorAll('.rd-chip.is-used').length,
      dis: [...document.querySelectorAll('.rd-chip.is-used')].every(c => c.disabled), sel: document.querySelectorAll('.rd-blank.is-sel').length }));
    ok(B1.sel && B1.pressed === 'true' && B2.txt === B2.chip && B2.used === 1 && B2.dis && B2.sel === 0, tag + ' hueco y después ficha: el hueco elegido se rellena y la ficha queda usada ' + JSON.stringify([B1, B2]));
    await p.evaluate(() => document.querySelector('.rd-blank[data-i="0"]').click()); await sleep(p, 80); // tocar un hueco lleno devuelve la ficha
    const B3 = await p.evaluate(() => ({ txt: document.querySelector('.rd-blank[data-i="0"]').textContent, used: document.querySelectorAll('.rd-chip.is-used').length, sel: document.querySelector('.rd-blank[data-i="0"]').classList.contains('is-sel') }));
    ok(B3.txt === '＿＿' && B3.used === 0 && B3.sel, tag + ' tocar un hueco lleno devuelve la ficha al banco y deja el hueco elegido ' + JSON.stringify(B3));
    ok(await fillBank(p, [0, 1]) === 'ok' && await p.evaluate(() => !document.getElementById('rd-check').disabled && document.querySelectorAll('.rd-blank.is-filled').length === 6), tag + ' con los 6 huecos llenos «Comprobar» se enciende (huecos 1 y 2 intercambiados a propósito)');
    await p.click('#rd-check'); await sleep(p, 150);
    const Bc = await p.evaluate(() => { const r = window.LQ_UI.state.lesson, hs = r.banco.huecos;
      return { right: document.querySelectorAll('.rd-blank.is-right').length, wrong: document.querySelectorAll('.rd-blank.is-wrong').length, fb: document.getElementById('lq-feedback').innerText, fix: [...document.querySelectorAll('.rd-fix li')].map(l => l.textContent),
        want: [0, 1].map(i => (i + 1) + '. ' + hs[i].zh.replace('＿＿', hs[i].resp)), next: document.getElementById('lq-next').textContent, dis: [...document.querySelectorAll('.rd-blank, .rd-chip')].every(b => b.disabled),
        rb: JSON.parse(localStorage.getItem('ac_reading_v1'))['rx-h4-tren'] }; });
    ok(Bc.right === 4 && Bc.wrong === 2 && /4 de 6 bien/.test(Bc.fb) && Bc.fix.length === 2 && Bc.fix.join('|') === Bc.want.join('|') && /Siguiente parte/.test(Bc.next) && Bc.dis, tag + ' banco corregido: 4 de 6, muestra cómo va cada hueco errado ' + JSON.stringify([Bc.right, Bc.wrong, Bc.fix]));
    ok(Bc.rb.bk.best === 5 && Bc.rb.bk.of === 6 && Bc.rb.bk.tries === 3 && /^\d{4}-\d{2}-\d{2}$/.test(Bc.rb.bk.last) && Bc.rb.otra.clave === 1 && Bc.rb.best === 1, tag + ' bk guarda {best (el mejor), of, last, tries} y no pisa lo demás ' + JSON.stringify(Bc.rb.bk));
    await p.click('#lq-next'); await sleep(p, 250);

    // ── 🔀 parecidas ──
    const Pc = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, sec: document.querySelector('.rd-sec').textContent, opts: [...document.querySelectorAll('#lq-opts .rd-opt-zh')].map(x => x.textContent).sort().join(), sent: document.querySelector('.rd-par-sentence').textContent,
      gloss: document.querySelectorAll('.lq-glossary, .lq-gloss-item').length, next: document.getElementById('lq-next').textContent, ovf: document.documentElement.scrollWidth > innerWidth + 1 }));
    ok(Pc.view === 'rparec' && Pc.sec === 'Parte 3 de 3 · 🔀 Palabras parecidas' && Pc.opts === '关心,小心,担心' && /＿＿/.test(Pc.sent) && Pc.gloss === 0 && /Ver resultado/.test(Pc.next) && !Pc.ovf, tag + ' parecidas: 3 opciones, oración con hueco, sin glosario ' + JSON.stringify([Pc.sec, Pc.opts, Pc.sent]));
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'parecidas-' + w + '-' + th + '.png') });
    await p.evaluate(() => [...document.querySelectorAll('#lq-opts .lq-opt')].find(b => /关心/.test(b.textContent)).click()); await sleep(p, 150);
    const Pw = await p.evaluate(() => ({ right: [...document.querySelectorAll('#lq-opts .is-right')].map(b => b.querySelector('.rd-opt-zh').textContent).join(), wrong: [...document.querySelectorAll('#lq-opts .is-wrong')].map(b => b.querySelector('.rd-opt-zh').textContent).join(), fb: document.getElementById('lq-feedback').innerText }));
    ok(Pw.right === '担心' && Pw.wrong === '关心' && /No sirve/.test(Pw.fb) && /Tu respuesta: 关心/.test(Pw.fb) && /Vale: 担心/.test(Pw.fb) && /preocuparse/.test(Pw.fb), tag + ' parecidas incorrecta: marca la válida, explica y da el porqué ' + JSON.stringify(Pw.fb.slice(0, 60)));
    await p.click('#lq-next'); await sleep(p, 300);

    // ── resumen: una línea por parte, SIN total ──
    const Fin = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, rows: [...document.querySelectorAll('.rd-summary li')].map(li => li.innerText.replace(/\s+/g, ' ')), score: !!document.querySelector('.lq-final-score'), all: document.getElementById('lq-body').innerText,
      btns: [...document.querySelectorAll('.lq-final-actions .lq-btn')].map(x => x.textContent.trim()).join('|'), srs: window.__srs || 0, rb: JSON.parse(localStorage.getItem('ac_reading_v1'))['rx-h4-tren'] }));
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'resumen-' + w + '-' + th + '.png') });
    ok(Fin.view === 'rsum' && Fin.rows.join('|') === '📖 Comprensión 1/2|🧩 Palabras 4/6|🔀 Palabras parecidas 0/1', tag + ' resumen por parte ' + JSON.stringify(Fin.rows));
    ok(!Fin.score && !/total/i.test(Fin.all) && !/\b5\/9\b|\b5 de 9\b/.test(Fin.all) && /Releer/.test(Fin.btns) && /Repetir la práctica/.test(Fin.btns) && Fin.srs === 0, tag + ' sin total (ni número grande ni suma) y el SRS (acSrsMiss) sin llamadas');
    ok(Fin.rb.pc && Fin.rb.pc.best === 0 && Fin.rb.pc.of === 1 && Fin.rb.pc.tries === 1, tag + ' pc guarda el puntaje de parecidas ' + JSON.stringify(Fin.rb.pc));
    await p.evaluate(() => document.getElementById('rd-final-retry').click()); await sleep(p, 300);
    ok(await p.evaluate(() => LQ_DEBUG.state.view === 'rquiz2' && document.querySelector('.rd-sec').textContent === 'Parte 1 de 3 · 📖 Comprensión'), tag + ' «Repetir la práctica» vuelve a la 1.ª parte');
    await p.evaluate(() => document.getElementById('lq-close').click()); await sleep(p, 250);
    ok(await p.evaluate(() => document.querySelector('[data-id="rx-h4-tren"]').closest('.rd-card').querySelector('.lc-best').textContent.trim()) === '🎯 1/2 ✓', tag + ' la lista refresca el puntaje de comprensión (🎯 1/2 ✓) al cerrar');

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
    ok(await p.evaluate(() => JSON.parse(localStorage.getItem('ac_reading_v1'))['rx-h4-chunlian'].of === 2 && LQ_DEBUG.state.view === 'rbanco'), tag + ' el puntaje de V/F entra en el mismo registro (of = 2) y sigue el banco');
    await finishChain(p);
    const Cj = await p.evaluate(() => JSON.parse(localStorage.getItem('ac_reading_v1'))['rx-h4-chunlian']);
    ok(Cj.bk && Cj.bk.best === 6 && Cj.pc && Cj.pc.of === 1, tag + ' práctica completa del texto de estudio: bk 6/6 y pc guardados ' + JSON.stringify([Cj.bk, Cj.pc]));

    // ── parecidas con conjunto de válidas (texto 2: «別的 / 其他») y partes sin material ──
    await p.click('[data-id="rx-h4-encuesta"][data-act="practice"]'); await sleep(p, 500);
    for (let i = 0; i < 2; i++) { await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[0].click()); await sleep(p, 80); await p.click('#lq-next'); await sleep(p, 200); }
    await fillBank(p); await p.click('#rd-check'); await sleep(p, 100); await p.click('#lq-next'); await sleep(p, 250);
    await p.evaluate(() => [...document.querySelectorAll('#lq-opts .lq-opt')].find(b => /超过/.test(b.textContent)).click()); await sleep(p, 100); await p.click('#lq-next'); await sleep(p, 250); // 1.ª parecida (超过)
    await p.evaluate(() => [...document.querySelectorAll('#lq-opts .lq-opt')].find(b => /其他/.test(b.textContent)).click()); await sleep(p, 150);
    const Pj = await p.evaluate(() => ({ right: [...document.querySelectorAll('#lq-opts .is-right')].map(b => b.querySelector('.rd-opt-zh').textContent).sort().join(), wrong: document.querySelectorAll('#lq-opts .is-wrong').length, fb: document.getElementById('lq-feedback').innerText, prog: document.getElementById('lq-progress-num').textContent }));
    ok(Pj.prog === '2/2' && Pj.right === '其他,别的' && Pj.wrong === 0 && /¡Correcto!/.test(Pj.fb) && /Valen 别的 y 其他/.test(Pj.fb), tag + ' parecidas con conjunto: elegir 其他 vale y se marcan las dos válidas ' + JSON.stringify(Pj));
    await p.click('#lq-next'); await sleep(p, 250);
    ok(/^📖 Comprensión \d\/2\|🧩 Palabras 6\/6\|🔀 Palabras parecidas 2\/2$/.test(await p.evaluate(() => [...document.querySelectorAll('.rd-summary li')].map(li => li.innerText.replace(/\s+/g, ' ')).join('|'))), tag + ' resumen del texto 2 (comprensión · 6/6 · 2/2), sin total');
    await p.evaluate(() => document.getElementById('lq-final-close').click()); await sleep(p, 250);
    // sin banco ni parecidas (se simula quitando el material): solo comprensión, sin «Parte i de n» y resumen de una línea
    await p.evaluate(() => { const r = LECTURAS_API.get('rx-h4-casa'); window.__bk = r.banco; window.__pc = r.parecidas; r.banco = null; r.parecidas = []; });
    await p.click('[data-id="rx-h4-casa"][data-act="practice"]'); await sleep(p, 400);
    const O1 = await p.evaluate(() => ({ sec: !!document.querySelector('.rd-sec'), next: document.getElementById('lq-next').textContent }));
    await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[0].click()); await sleep(p, 80); await p.click('#lq-next'); await sleep(p, 200);
    await p.evaluate(() => document.querySelectorAll('#lq-opts .lq-opt')[0].click()); await sleep(p, 80);
    const O2 = await p.evaluate(() => document.getElementById('lq-next').textContent);
    await p.click('#lq-next'); await sleep(p, 250);
    const O3 = await p.evaluate(() => ({ view: LQ_DEBUG.state.view, rows: [...document.querySelectorAll('.rd-summary li')].map(li => li.innerText.replace(/\s+/g, ' ')) }));
    ok(!O1.sec && /Siguiente/.test(O1.next) && /Ver resultado/.test(O2) && O3.view === 'rsum' && O3.rows.length === 1 && /^📖 Comprensión \d\/2$/.test(O3.rows[0]), tag + ' sin material para banco y parecidas: se omiten (solo comprensión) ' + JSON.stringify(O3.rows));
    await p.evaluate(() => document.getElementById('lq-final-close').click()); await sleep(p, 250);
    // solo falta parecidas → «Parte 1 de 2» y «Parte 2 de 2 · Palabras»
    await p.evaluate(() => { const r = LECTURAS_API.get('rx-h4-casa'); r.banco = window.__bk; r.parecidas = []; });
    await p.click('[data-id="rx-h4-casa"][data-act="practice"]'); await sleep(p, 400);
    const O4 = await p.evaluate(() => document.querySelector('.rd-sec').textContent);
    await p.evaluate(() => { const r = LECTURAS_API.get('rx-h4-casa'); r.parecidas = window.__pc; });
    ok(O4 === 'Parte 1 de 2 · 📖 Comprensión', tag + ' solo con banco: la práctica tiene 2 partes ' + O4);
    await p.evaluate(() => document.getElementById('lq-close').click()); await sleep(p, 250);

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
