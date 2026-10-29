// tests/repaso-escritura.test.js — escritura del Repaso (SRS) por tarjeta
//   a. PRUEBA DE ORO: la misma secuencia de calificaciones sobre un mazo de ejemplo (reloj fijo) deja las MISMAS cajas y fechas que
//      con el código anterior. tests/data/repaso-oro.json se GRABÓ con el código de main (antes del cambio):
//        GOLDEN_RECORD=1 BASE_URL=<app de main> node tests/repaso-escritura.test.js
//      y el resto del tiempo se compara. Si cambia por intención, se vuelve a grabar con el código viejo, no a mano.
//   b. una respuesta tecleada en simplificado y otra en tradicional se aceptan igual (tarjetas TOCFL y HSK, con y sin elección explícita)
//   c. tarjetas de TOCFL (etiqueta TOCFL-…, Práctica TOCFL…, Lección <TOCFL>) en tradicional y de HSK en simplificado; la elección
//      explícita de cada familia gana; se ve en el hanzi, el ejemplo con hueco, la respuesta, el ❌, la voz y la escritura a mano
//   d. tarjetas sin módulo (y de Clásicos / Pares mínimos): NO se convierten; se dibujan como antes (igual que el oro grabado con main)
const fs = require('fs'), path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
const GOLD = path.join(__dirname, 'data', 'repaso-oro.json');
const REC = !!process.env.GOLDEN_RECORD;
const T0 = 1800000000000, DAY = 86400000;
const TOCFL_LESSON = 'De paseo por el mercado nocturno', HSK_LESSON = 'El primer día de clase';
// mazo de ejemplo: [zh, zt, m, caja, ejemplo simp, ejemplo trad]
const DECK = [
  ['银行', '銀行', 'TOCFL-A1', 1, '我去银行取钱。', '我去銀行取錢。'],
  ['图书馆', '圖書館', 'Práctica TOCFL B1', 2, '他在图书馆看书。', '他在圖書館看書。'],
  ['夜市', '夜市', 'Lección ' + TOCFL_LESSON, 3, '我们去夜市吃东西。', '我們去夜市吃東西。'],
  ['苹果', '蘋果', 'HSK3', 4, '我喜欢吃苹果。', '我喜歡吃蘋果。'],
  ['老师', '老師', 'Lección ' + HSK_LESSON, 5, '老师今天很高兴。', '老師今天很高興。'],
  ['朋友', '', '', 1, '他是我的朋友。', ''],
  ['学习', '學習', '', 2, '我每天学习汉语。', '我每天學習漢語。'],
  ['孔子', '孔子', 'Clásico Analectas', 3, '孔子是老师。', '孔子是老師。'],
  ['声调', '聲調', 'Pares mínimos', 4, '', ''],
  ['医院', '醫院', 'TOCFL-B3', 2, '', '']
];
const cardOf = (r, i) => ({ b: r[3], d: T0 - (i + 1) * 1000, a: T0 - 9 * DAY, r: 0, l: 0, es: 'glosa ' + r[0], py: '', zt: r[1], m: r[2], lv: 0, ctxZh: r[4], ctxZt: r[5], ctxEs: r[4] ? 'ejemplo' : '' });
const dbOf = (rows, prod) => { const cards = {}; rows.forEach((r, i) => { cards[r[0]] = cardOf(r, i); }); return { v: 1, prod: !!prod, cards }; };
(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
  const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
  await ctx.addInitScript(([T0]) => {
    if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); }
    let off = 0; Date.now = () => T0 + off; window.__adv = ms => { off += ms; };
    window.__spoken = []; window.__hw = [];
  }, [T0]);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1300);
  await p.evaluate(() => { window.fetchTTS = (body) => { window.__spoken.push(body && body.text); return Promise.resolve({ ok: false }); };
    window.openHandwriteAnswer = (zh) => { window.__hw.push(zh); }; });
  const setDB = (db, scripts) => p.evaluate(([db, sc]) => { localStorage.setItem('ac_srs', JSON.stringify(db)); localStorage.removeItem('ac_script_hsk'); localStorage.removeItem('ac_script_tocfl');
    Object.entries(sc || {}).forEach(([k, v]) => localStorage.setItem('ac_script_' + k, v)); window.__spoken.length = 0; window.__hw.length = 0; }, [db, scripts]);
  const open = async () => { await p.evaluate(() => document.getElementById('btn-srs').click()); await p.waitForTimeout(80); await p.click('#srs-body .srs-start'); await p.waitForTimeout(80); };
  const close = async () => { await p.evaluate(() => document.getElementById('btn-srs-close').click()); await p.waitForTimeout(40); };
  const dbNow = () => p.evaluate(() => { const d = JSON.parse(localStorage.getItem('ac_srs')); return Object.entries(d.cards).sort((x, y) => x[0] < y[0] ? -1 : 1).map(([zh, c]) => [zh, c.b, c.d, c.a, c.r, c.l]); });
  const sesion = async (pat) => { // una tanda completa en modo producción: revelar y calificar cada tarjeta con el patrón dado
    let i = 0;
    for (let g = 0; g < 40; g++) {
      if (!await p.$('#srs-body .srs-reveal')) break;
      await p.click('#srs-body .srs-reveal'); await p.waitForTimeout(25);
      await p.click('#srs-body .srs-grade[data-k="' + pat[i++ % pat.length] + '"]'); await p.waitForTimeout(25);
    } };
  // ---------- a. prueba de oro ----------
  const oro = {};
  await setDB(dbOf(DECK, true), {});
  await open(); await sesion(['good', 'again', 'easy', 'good', 'again', 'good', 'easy', 'good', 'again', 'easy']); await close();
  oro.dia0 = await dbNow();
  await p.evaluate(() => { window.__adv(2 * 86400000); window.acSrsMiss({ w: 1, module: 'TOCFL-A1', level: 1, chinese_simp_answer: '车站', chinese_trad_answer: '車站', spanish_answer: 'estación', spanish_full: 'estación' });
    window.acSrsGrade({ chinese_simp_answer: '地铁', chinese_trad_answer: '地鐵', spanish_answer: 'metro', w: 1, module: 'HSK3' }, 'good');
    window.acSrsGrade({ chinese_simp_answer: '银行' }, 'easy'); window.acSrsMiss({ w: 1, module: 'HSK3', chinese_simp_answer: '苹果', chinese_trad_answer: '蘋果', spanish_answer: 'manzana' }); });
  await open(); await sesion(['easy', 'good', 'again', 'good', 'easy', 'again']); await close();
  oro.dia2 = await dbNow();
  await p.evaluate(() => window.__adv(7 * 86400000));
  await open(); await sesion(['good', 'good', 'again', 'easy']); await close();
  oro.dia9 = await dbNow();
  // ---------- observación de lo que se DIBUJA (para b, c y d) ----------
  async function ver(row, scripts) {
    await setDB(dbOf([row], true), scripts); await open();
    const o = {};
    o.hueco = await p.evaluate(() => (document.querySelector('#srs-body .srs-card') || {}).textContent || '');
    await p.click('#srs-body .srs-speak'); await p.waitForTimeout(40);
    await p.click('#srs-body .srs-prod-hw'); await p.waitForTimeout(40);
    o.voz = await p.evaluate(() => window.__spoken[window.__spoken.length - 1] || '');
    o.mano = await p.evaluate(() => window.__hw[window.__hw.length - 1] || '');
    await p.fill('#srs-body .srs-prod-input', '错'); await p.click('#srs-body .srs-prod-check'); await p.waitForTimeout(40);
    o.era = await p.evaluate(() => (document.getElementById('srs-prod-fb') || {}).textContent || '');
    o.resp = await p.evaluate(() => (document.querySelector('#srs-ans .srs-ans-zh') || {}).textContent || '');
    o.ejemplo = await p.evaluate(() => (document.querySelector('#srs-ans .srs-ctx-zh') || {}).textContent || '');
    await close(); return o;
  }
  const CFGS = { 'sin elección': {}, 'hsk=trad': { hsk: 'trad' }, 'hsk=simp': { hsk: 'simp' } };
  const render = {};
  for (const r of DECK) { if (/TOCFL/.test(r[2]) || r[2] === 'Lección ' + TOCFL_LESSON) continue;
    for (const [k, sc] of Object.entries(CFGS)) render[r[0] + '|' + k] = await ver(r, sc); }
  if (REC) { fs.writeFileSync(GOLD, JSON.stringify({ nota: 'GRABADO con el código de main, ANTES del cambio de escritura del Repaso (GOLDEN_RECORD=1)', oro, render }, null, 1)); console.log('oro grabado en ' + GOLD); await b.close(); process.exit(0); }
  const G = JSON.parse(fs.readFileSync(GOLD, 'utf8'));
  for (const k of ['dia0', 'dia2', 'dia9']) ok(JSON.stringify(oro[k]) === JSON.stringify(G.oro[k]), 'a. oro ' + k + ': cajas y fechas iguales a las de main\n   sale:  ' + JSON.stringify(oro[k]) + '\n   debía: ' + JSON.stringify(G.oro[k]));
  ok(oro.dia0.length === DECK.length && oro.dia9.length >= DECK.length + 2, 'a. el mazo de oro tiene las tarjetas esperadas (' + oro.dia0.length + ' → ' + oro.dia9.length + ')');
  // ---------- d. sin módulo / HSK / Clásicos / Pares mínimos = igual que main ----------
  for (const [k, o] of Object.entries(render)) ok(JSON.stringify(o) === JSON.stringify(G.render[k]), 'd. ' + k + ' se dibuja como antes (sin convertir)\n   sale:  ' + JSON.stringify(o) + '\n   debía: ' + JSON.stringify(G.render[k]));
  const sinZt = render['朋友|hsk=trad'];
  ok(sinZt && sinZt.resp === '朋友' && sinZt.voz === '朋友' && sinZt.mano === '朋友', 'd. tarjeta sin módulo y SIN tradicional guardado: con hsk=trad no se convierte, queda como está ' + JSON.stringify(sinZt));
  ok(render['学习|hsk=trad'].resp === '學習' && render['学习|sin elección'].resp === '学习', 'd. tarjeta sin módulo CON tradicional guardado: usa el suyo si la familia es tradicional, simplificado si no');
  // ---------- c. familias ----------
  const row = (z) => DECK.find(r => r[0] === z);
  const esperar = async (z, scripts, t, s, tag) => { const o = await ver(row(z), scripts); const want = t ? row(z)[1] : z; const sent = t ? row(z)[5] : row(z)[4];
    ok(o.resp === want && o.voz === want && o.mano === want && o.era.includes(want) && (!sent || (o.ejemplo === sent && o.hueco && !o.hueco.includes(want))), 'c. ' + tag + ' → ' + (t ? 'tradicional' : 'simplificado') + ' ' + JSON.stringify(o)); };
  for (const z of ['银行', '图书馆', '夜市', '医院']) {
    await esperar(z, {}, true, null, z + ' (TOCFL) sin elección');
    await esperar(z, { hsk: 'trad' }, true, null, z + ' (TOCFL) con hsk=trad: sigue su familia');
    await esperar(z, { tocfl: 'simp' }, false, null, z + ' (TOCFL) con tocfl=simp: gana la elección');
    await esperar(z, { tocfl: 'trad', hsk: 'simp' }, true, null, z + ' (TOCFL) con tocfl=trad');
  }
  for (const z of ['苹果', '老师']) {
    await esperar(z, {}, false, null, z + ' (HSK) sin elección');
    await esperar(z, { tocfl: 'trad' }, false, null, z + ' (HSK) con tocfl=trad: no la toca');
    await esperar(z, { hsk: 'trad' }, true, null, z + ' (HSK) con hsk=trad: gana la elección');
  }
  // ---------- b. lo tecleado se acepta igual en las dos escrituras ----------
  async function teclear(z, texto, scripts) { await setDB(dbOf([row(z)], true), scripts); await open();
    await p.fill('#srs-body .srs-prod-input', texto); await p.click('#srs-body .srs-prod-check'); await p.waitForTimeout(40);
    const fb = await p.evaluate(() => document.getElementById('srs-prod-fb').textContent); await close(); return fb; }
  for (const z of ['银行', '苹果', '夜市', '老师']) for (const sc of [{}, { tocfl: 'simp', hsk: 'trad' }, { tocfl: 'trad', hsk: 'simp' }]) {
    const t = row(z)[1];
    const fs_ = await teclear(z, z, sc), ft = await teclear(z, t, sc);
    ok(/✅/.test(fs_) && /✅/.test(ft) && !/❌/.test(fs_ + ft), 'b. ' + z + ' ' + JSON.stringify(sc) + ': simplificado «' + z + '» → ' + fs_ + ' · tradicional «' + t + '» → ' + ft);
  }
  const mal = await teclear('银行', '错', {}); ok(/❌/.test(mal), 'b. una respuesta incorrecta sigue marcándose ❌ ' + mal);
  ok(errs.length === 0, 'sin errores JS ' + errs);
  await b.close(); console.log('comprobaciones ' + n + ' · FAILS ' + fails); process.exit(fails ? 1 : 0);
})();
