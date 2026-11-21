// tests/pinyin-libre.test.js — el pinyin de las burbujas de «Pronunciación libre» (free-talk.js, pinyinOf).
//   Antes: pinyinOf llamaba directo a pinyinPro.pinyin(texto, { toneType: 'mark' }). El motor de voz transcribe en TRADICIONAL (什麼, 還是, 東西…) y
//   pinyin-pro lee el tradicional carácter por carácter, sin las lecturas por palabra: 什麼 → «shén mó» (麼 solo es mó), 還是 → «huán shì»,
//   長大 → «cháng dà», 銀行 → «yín xíng», 睡覺 → «shuì jué»… El Lector y las lecciones usan pinyinFor (pinyin-familias.js), que pasa cada carácter
//   a simplificado SOLO para generar el pinyin y acierta esas palabras.
//   Ahora: pinyinOf usa pinyinFor(texto, 'hsk') (la convención del Lector, lecturas del continente) y deja a pinyinPro de respaldo.
//   a. las palabras de lectura ambigua dan el pinyin esperado en la burbuja (tabla de abajo; la oración de la evidencia: «nǐ shén me dōng xi ? …»)
//   b. la burbuja da EXACTAMENTE lo que da pinyinFor(texto, 'hsk') (mismo mecanismo que el Lector, no una copia)
//   c. convención HSK, no TOCFL: 便宜 → «pián yi» (la lista TOCFL dice «pián yí»)
//   d. respaldo: sin pinyinFor, o si lanza, la burbuja sale igual con el pinyin de pinyin-pro (sin errores)
//   e. el modo cn-es (la burbuja es en español) no muestra pinyin, y un texto sin chino no inventa lecturas chinas
// Se MIDE en el navegador (Chromium con micrófono FALSO: --use-fake-device-for-media-stream) y con el motor de voz simulado SOLO donde hace falta
// (VE.ensureModelConsent y VE.transcribeFree devuelven el texto de la tabla); la grabación y las burbujas de free-talk.js son las reales.
// NO se prueba el motor Whisper real (qué texto transcribe: tradicional o simplificado) ni el micrófono real. No toca app.js, el SRS ni checkAnswer.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

// [texto transcripto (tradicional), pinyin esperado con la convención de la app: una sílaba por carácter, separadas por espacio]
const TABLA = [
  ['你什麼東西?我才問你,你還是問我', 'nǐ shén me dōng xi ? wǒ cái wèn nǐ , nǐ hái shì wèn wǒ'], // la evidencia
  ['什麼', 'shén me'], ['為什麼', 'wèi shén me'], ['還是', 'hái shì'], ['還有', 'hái yǒu'],
  ['東西', 'dōng xi'], ['好像', 'hǎo xiàng'], ['重要', 'zhòng yào'], ['行李', 'xíng li'],
  ['長大', 'zhǎng dà'], ['生長', 'shēng zhǎng'], ['長輩', 'zhǎng bèi'],
  ['銀行', 'yín háng'], ['睡覺', 'shuì jiào'], ['覺得', 'jué de'], ['音樂', 'yīn yuè'],
  // las más frecuentes que el pinyin-pro directo leía mal en tradicional (車 → «jū»: la pieza del ajedrez), y guardas de que pasar a simplificado NO rompe
  // lo que estaba bien (髮/發 → 发, 隻/只, 鬥/斗: se leen igual que antes)
  ['車', 'chē'], ['時間', 'shí jiān'], ['高興', 'gāo xìng'], ['嗎', 'ma'], ['乾淨', 'gān jìng'],
  ['發現', 'fā xiàn'], ['兩隻貓', 'liǎng zhī māo'], ['戰鬥', 'zhàn dòu'], ['頭髮', 'tóu fa']
];

(async () => {
  const b = await chromium.launch({ ...LAUNCH, args: [...(LAUNCH.args || []), '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'block', permissions: ['microphone'] });
  await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); }
  });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1500);

  // el motor de voz devuelve el texto que se le pida (window.__texto); lo demás es real
  await p.evaluate(() => {
    window.VE.ensureModelConsent = () => Promise.resolve(true);
    window.VE.transcribeFree = () => Promise.resolve({ text: window.__texto, confidence: 0.9 });
    return ensureTocflPinyin();
  });
  await p.evaluate(() => window.openFreeTalk()); await p.waitForSelector('#tk-record');
  const clic = async (sel) => { await p.evaluate((s) => document.querySelector(s).click(), sel); await p.waitForTimeout(120); };
  // graba (micrófono falso) y devuelve el pinyin de la burbuja nueva (null si la burbuja no lleva pinyin)
  const burbuja = async (texto) => {
    const antes = await p.evaluate(() => document.querySelectorAll('#tk-chat .tk-bubble').length);
    await p.evaluate((t) => { window.__texto = t; }, texto);
    await clic('#tk-record');
    await p.waitForFunction(() => document.getElementById('tk-record').classList.contains('is-recording'), null, { timeout: 8000 });
    await p.waitForTimeout(700);
    await clic('#tk-record');
    await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length === a + 1, antes, { timeout: 15000 });
    return p.evaluate(() => { const bs = document.querySelectorAll('#tk-chat .tk-bubble'); const el = bs[bs.length - 1].querySelector('.tk-pinyin'); return el ? el.textContent : null; });
  };
  const deLaApp = (texto) => p.evaluate((t) => pinyinFor(t, 'hsk'), texto);

  // a + b. la tabla: el pinyin esperado Y exactamente el de pinyinFor
  for (const [texto, esperado] of TABLA) {
    const got = await burbuja(texto);
    ok(got === esperado, 'a. ' + texto + ' → «' + got + '» (esperado «' + esperado + '»)');
    ok(got === await deLaApp(texto), 'b. ' + texto + ': la burbuja da lo mismo que pinyinFor(texto, \'hsk\') (el mecanismo del Lector)');
  }

  // c. convención HSK (continente), no la lista TOCFL
  const tocfl = await p.evaluate(() => pinyinFor('便宜', 'tocfl'));
  const got = await burbuja('便宜');
  ok(tocfl !== 'pián yi' && got === 'pián yi', 'c. 便宜 → «' + got + '» (convención HSK; la lista TOCFL daría «' + tocfl + '»)');

  // d. respaldo: sin pinyinFor, o si lanza, sale igual con pinyin-pro
  const viejo = await p.evaluate(() => pinyinPro.pinyin('什麼', { toneType: 'mark' }));
  await p.evaluate(() => { window.__pf = window.pinyinFor; window.pinyinFor = undefined; });
  const sinPf = await burbuja('什麼');
  await p.evaluate(() => { window.pinyinFor = () => { throw new Error('boom'); }; });
  const lanza = await burbuja('什麼');
  await p.evaluate(() => { window.pinyinFor = window.__pf; });
  ok(sinPf === viejo && viejo === 'shén mó', 'd. sin pinyinFor la burbuja sale con el pinyin de pinyin-pro (' + sinPf + ')');
  ok(lanza === viejo, 'd. si pinyinFor lanza la burbuja sale con el pinyin de pinyin-pro (' + lanza + ')');

  // e. sin chino no hay pinyin; en cn-es (la burbuja es español) tampoco
  const latin = await burbuja('hello');
  ok(latin === null || !/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(latin), 'e. un texto sin chino no inventa lecturas con tono (' + JSON.stringify(latin) + ')');
  await p.evaluate(() => { state.mode = 'cn-es'; });
  await clic('#talk-close'); await p.evaluate(() => window.openFreeTalk()); await p.waitForSelector('#tk-record');
  const es = await burbuja('hola');
  ok(es === null, 'e. modo cn-es: la burbuja en español no lleva pinyin (' + es + ')');

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
