// tests/escribir-a-mano-escritura.test.js — «Escribir a mano» (Entrenar): cada palabra con la escritura de SU familia, como el Repaso.
//   Antes: wrRenderBody() usaba scriptFor('hsk') para todas las filas (las tarjetas de TOCFL no podían ser tradicionales) y
//   data-zh llevaba siempre el simplificado: con 繁 la fila decía «謝謝» pero el quiz de trazos se abría con «谢谢».
//   a. ORÁCULO = el Repaso: con #srs-pop abierto, scriptForCard(card) (lo que usa srs.js: ckFor) dice qué escritura lleva cada
//      tarjeta. La lista debe mostrar y trazar lo mismo, para las 4 combinaciones de elección explícita (HSK/TOCFL × simp/trad)
//      y con un módulo activo de Hoy de HSK y de TOCFL (con #srs-pop cerrado, scriptForCard seguiría al módulo activo: por eso
//      la lista usa scriptFor('hsk') para lo que no es TOCFL).
//   b. al tocar una fila, openHandwriteAnswer y hwAns.word reciben la forma que se VE (antes: siempre el simplificado).
//   c. valores fijos para la configuración por defecto (TOCFL tradicional, HSK simplificado), contra una deriva del oráculo.
//   d. PRUEBA DE ORO de window.acSrsDueWords(): el campo nuevo `m` es lo ÚNICO que cambia (mismas tarjetas, mismo orden, mismos
//      campos). tests/data/escribir-a-mano-oro.json se GRABÓ con el código de main (antes del cambio):
//        GOLDEN_RECORD=1 BASE_URL=<app de main> node tests/escribir-a-mano-escritura.test.js
//      y el resto del tiempo se compara. Si cambia por intención, se vuelve a grabar con el código viejo, no a mano.
//   No se probó el trazo con datos de caracteres tradicionales (los carga Hanzi Writer desde un CDN; la batería no sale a la red).
//   No toca checkAnswer ni el algoritmo del SRS.
const fs = require('fs'), path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
const GOLD = path.join(__dirname, 'data', 'escribir-a-mano-oro.json');
const REC = !!process.env.GOLDEN_RECORD;
const T0 = 1800000000000, DAY = 86400000;
const TOCFL_LESSON = 'De paseo por el mercado nocturno', HSK_LESSON = 'El primer día de clase';
let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };

// ── mazo de la lista (todas vencidas): [zh, zt, m] — el mismo criterio que tests/repaso-escritura.test.js ──
const DECK = [
  ['银行', '銀行', 'TOCFL-A1'],
  ['图书馆', '圖書館', 'Práctica TOCFL B1'],
  ['市场', '市場', 'Lección ' + TOCFL_LESSON],      // solo la ETIQUETA «Lección <TOCFL>» la distingue de HSK (zh ≠ zt: si no se reconociera, se vería distinto)
  ['苹果', '蘋果', 'HSK3'],
  ['老师', '老師', 'Lección ' + HSK_LESSON],
  ['朋友', '', ''],                                  // sin zt y sin módulo
  ['学习', '學習', ''],                              // sin módulo
  ['孔子', '孔子', 'Clásico Analectas'],
  ['声调', '聲調', 'Pares mínimos'],
  ['医院', '醫院', 'TOCFL-B3']
];
const cardOf = (r, i) => ({ b: 2, d: T0 - (i + 1) * 1000, a: T0 - 9 * DAY, r: 0, l: 0, es: 'glosa ' + r[0], py: 'py' + i, zt: r[1], m: r[2], lv: 0, ctxZh: '', ctxZt: '', ctxEs: '' });
const dbOf = (rows) => { const cards = {}; rows.forEach((r, i) => { cards[r[0]] = cardOf(r, i); }); return { v: 1, cards }; };

// ── mazo de la prueba de oro: [zh, zt, m, es, py, d] — empates de d, vencidas, no vencidas y campos vacíos ──
const GL = 'De paseo por el mercado nocturno';
const GROWS = [
  ['银行', '銀行', 'TOCFL-A1', 'banco', 'yínháng', T0 - 3000],
  ['图书馆', '圖書館', 'Práctica TOCFL B1', 'biblioteca', 'túshūguǎn', T0 - 3000],   // empate de d con la anterior
  ['夜市', '夜市', 'Lección ' + GL, 'mercado nocturno', '', T0 - 5000],
  ['苹果', '蘋果', 'HSK3', 'manzana', 'píngguǒ', T0 - 1],
  ['朋友', '', '', '', '', T0 - 9000],                                                // sin zt/es/py/m
  ['学习', '學習', '', 'estudiar', '', T0],                                           // vence justo «ahora»
  ['孔子', '孔子', 'Clásico Analectas', '', 'Kǒngzǐ', T0 + 1],                        // NO vencida
  ['医院', '醫院', 'TOCFL-B3', 'hospital', 'yīyuàn', T0 + 7 * DAY]                    // NO vencida
];
const gdb = () => { const cards = {}; GROWS.forEach((r) => { cards[r[0]] = { b: 2, d: r[5], a: T0 - 9 * DAY, r: 0, l: 0, es: r[3], py: r[4], zt: r[1], m: r[2], lv: 0, ctxZh: '', ctxZt: '', ctxEs: '' }; }); return { v: 1, cards }; };

(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
  await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
  await ctx.addInitScript(([T0]) => {
    if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); }
    Date.now = () => T0;
  }, [T0]);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1300);

  // ── d. oro de acSrsDueWords ──
  const salida = await p.evaluate((db) => { localStorage.setItem('ac_srs', JSON.stringify(db)); return JSON.parse(JSON.stringify(window.acSrsDueWords())); }, gdb());
  if (REC) {
    fs.writeFileSync(GOLD, JSON.stringify({ T0, nota: 'salida de window.acSrsDueWords() con el código de main, ANTES de sumar el campo m', salida: salida }, null, 1) + '\n');
    console.log('GRABADO ' + GOLD + ' (' + salida.length + ' filas)'); await b.close(); process.exit(0);
  }
  const oro = JSON.parse(fs.readFileSync(GOLD, 'utf8'));
  const sinM = salida.map((o) => { const c = Object.assign({}, o); delete c.m; return c; });
  ok(oro.salida.length === 6, 'oro: la grabación trae 6 tarjetas vencidas (' + oro.salida.length + ')');
  ok(JSON.stringify(sinM) === JSON.stringify(oro.salida), 'oro: acSrsDueWords sin el campo m es IDÉNTICA a la de main (mismas tarjetas, mismo orden, mismos campos y valores)');
  ok(JSON.stringify(salida.map((o) => o.zh)) === JSON.stringify(['朋友', '夜市', '银行', '图书馆', '苹果', '学习']), 'oro: orden por vencimiento (la más vencida primero; empate en el orden del mazo) ' + salida.map((o) => o.zh).join(','));
  const mEsperado = salida.map((o) => (GROWS.find((r) => r[0] === o.zh) || [])[2] || '');
  ok(JSON.stringify(salida.map((o) => o.m)) === JSON.stringify(mEsperado), 'oro: m = card.m || «» en cada tarjeta ' + JSON.stringify(salida.map((o) => o.m)));
  ok(salida.every((o) => Object.keys(o).join(',') === 'zh,zt,es,py,m'), 'oro: los campos, en orden: zh, zt, es, py, m');
  ok(!salida.some((o) => o.zh === '孔子' || o.zh === '医院'), 'oro: las no vencidas siguen fuera');

  // ── a / b / c. la lista ──
  const setup = (db, sc, mod) => p.evaluate(([db, sc, mod]) => {
    localStorage.setItem('ac_srs', JSON.stringify(db));
    localStorage.removeItem('ac_script_hsk'); localStorage.removeItem('ac_script_tocfl');
    Object.entries(sc).forEach(([k, v]) => { if (v) localStorage.setItem('ac_script_' + k, v); });
    state.activeModule = mod; window.acScriptRef = null;
    window.__hw = [];
    if (!window.__origHW) { window.__origHW = window.openHandwriteAnswer; window.openHandwriteAnswer = function (w, f) { window.__hw.push(w); return window.__origHW(w, f); }; }
  }, [db, sc, mod]);
  // El oráculo: lo que dibuja el Repaso — con #srs-pop abierto, scriptForCard(card) de srs.js (ckFor)
  const oraculo = () => p.evaluate(() => {
    const pop = document.getElementById('srs-pop'); const estaba = pop.classList.contains('hidden');
    pop.classList.remove('hidden');
    const db = JSON.parse(localStorage.getItem('ac_srs')); const out = {};
    Object.keys(db.cards).forEach((zh) => { const c = db.cards[zh]; out[zh] = scriptForCard(c) === 'trad' ? (c.zt || zh) : zh; });
    if (estaba) pop.classList.add('hidden');
    return out;
  });
  const lista = () => p.evaluate(() => { openWriteDaily(); return [...document.querySelectorAll('#write-body .wr-row')].map((r) => ({ data: r.dataset.zh, vis: r.querySelector('.wr-hanzi').textContent })); });
  const cerrar = () => p.evaluate(() => { try { closeHandwrite(); } catch (e) { } try { closeWriteDaily(); } catch (e) { } });
  const ordenDeck = DECK.map((r, i) => [r[0], i]).sort((x, y) => (T0 - (x[1] + 1) * 1000) - (T0 - (y[1] + 1) * 1000)).map((x) => x[0]); // d ascendente

  const combos = [];
  for (const mod of ['HSK1', 'TOCFL-A1']) for (const hsk of ['simp', 'trad']) for (const tocfl of ['simp', 'trad']) combos.push([hsk, tocfl, mod]);
  combos.push([null, null, 'HSK1'], [null, null, 'TOCFL-A1']);
  let diferenciasSimpTrad = 0;
  for (const [hsk, tocfl, mod] of combos) {
    const etq = 'HSK=' + (hsk || 'defecto') + ' · TOCFL=' + (tocfl || 'defecto') + ' · módulo activo ' + mod;
    await setup(dbOf(DECK), { hsk, tocfl }, mod);
    const orac = await oraculo();
    const filas = await lista();
    ok(filas.length === DECK.length, etq + ': la lista trae las ' + DECK.length + ' palabras vencidas (' + filas.length + ')');
    ok(JSON.stringify(filas.map((f) => f.vis)) === JSON.stringify(ordenDeck.map((zh) => orac[zh])), etq + ': cada fila muestra lo mismo que el Repaso para esa tarjeta, en el orden de vencimiento — ' + filas.map((f) => f.vis).join(' '));
    ok(filas.every((f) => f.data === f.vis), etq + ': data-zh lleva la forma que se ve ' + JSON.stringify(filas.filter((f) => f.data !== f.vis)));
    diferenciasSimpTrad += filas.filter((f, i) => f.vis !== ordenDeck[i]).length;
    // b. al tocar una fila: el quiz recibe la forma que se ve
    for (const zh of ['银行', '苹果', '朋友', '医院']) {
      await p.evaluate(() => { window.__hw.length = 0; openWriteDaily(); });
      try { await p.click('#write-body .wr-row[data-zh="' + orac[zh] + '"]', { timeout: 1500 }); } catch (e) { ok(false, etq + ': no hay una fila con data-zh «' + orac[zh] + '» para tocar'); await cerrar(); continue; }
      await p.waitForTimeout(60);
      const r = await p.evaluate(() => ({ spy: window.__hw.slice(), word: hwAns.word, chars: hwAns.chars.join('') }));
      ok(r.spy.length === 1 && r.spy[0] === orac[zh] && r.word === orac[zh], etq + ': tocar «' + orac[zh] + '» abre el quiz con esa forma (recibió ' + JSON.stringify(r.spy) + ', hwAns.word «' + r.word + '»)');
      ok([...orac[zh]].filter((c, i, a) => a.indexOf(c) === i).join('') === r.chars, etq + ': los caracteres del quiz son los de «' + orac[zh] + '» («' + r.chars + '»)');
      await cerrar();
    }
  }
  ok(diferenciasSimpTrad > 0, 'sanidad: en algún caso la lista muestra una forma distinta de la simplificada (si no, la prueba no distinguiría nada)');

  // ── c. valores fijos, configuración por defecto (TOCFL tradicional, HSK simplificado), con cualquier módulo activo ──
  for (const mod of ['HSK1', 'TOCFL-A1']) {
    await setup(dbOf(DECK), { hsk: null, tocfl: null }, mod);
    const f = await lista(); const por = {}; f.forEach((r, i) => { por[ordenDeck[i]] = r.vis; });
    ok(por['银行'] === '銀行' && por['图书馆'] === '圖書館' && por['市场'] === '市場' && por['医院'] === '醫院', 'defecto · ' + mod + ': las tarjetas de TOCFL (TOCFL-A1, Práctica TOCFL, Lección TOCFL, TOCFL-B3) en tradicional ' + JSON.stringify([por['银行'], por['图书馆'], por['市场'], por['医院']]));
    ok(por['苹果'] === '苹果' && por['老师'] === '老师' && por['学习'] === '学习' && por['声调'] === '声调' && por['孔子'] === '孔子' && por['朋友'] === '朋友', 'defecto · ' + mod + ': HSK, Lección HSK, sin módulo, Pares mínimos y Clásicos siguen en simplificado (el resto, como el Repaso) ' + JSON.stringify([por['苹果'], por['老师'], por['学习'], por['声调']]));
    await cerrar();
  }
  // elección explícita: HSK en tradicional y TOCFL en simplificado (al revés del defecto)
  await setup(dbOf(DECK), { hsk: 'trad', tocfl: 'simp' }, 'HSK1');
  const inv = await lista(); const porI = {}; inv.forEach((r, i) => { porI[ordenDeck[i]] = r.vis; });
  ok(porI['银行'] === '银行' && porI['医院'] === '医院' && porI['苹果'] === '蘋果' && porI['学习'] === '學習' && porI['朋友'] === '朋友', 'explícita HSK=trad/TOCFL=simp: TOCFL en simplificado, el resto en tradicional (朋友 sin zt queda como está) ' + JSON.stringify([porI['银行'], porI['苹果'], porI['学习'], porI['朋友']]));
  await cerrar();

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
