// tests/pinyin-correcciones.test.js — correcciones de pinyin de pinyinFor (pinyin-familias.js), el mecanismo del Lector, las lecciones, la práctica tipo
// examen y «Pronunciación libre». Medido sobre las 7 816 formas tradicionales de los datos de la app: pinyin-pro lee mal estas palabras, también en simplificado.
//   Dos capas nuevas, solo dentro de pinyinFor (NO tocan pinyinPro ni sus otros llamadores):
//   A. por CARÁCTER, sobre el texto original (tradicional) antes de la conversión: 髮 → fà, 臟 → zàng, 幹 → gàn; no pisa una sílaba que ya sale neutra
//      (頭髮 sigue «tóu fa») ni toca 發 / 乾 / 髒 / 干
//      髮 sigue la convención de la familia: HSK «fà», TOCFL «fǎ» (la lista TOCFL dice 头发 «tóu fǎ», 发型 «fǎ xíng»).
//   B. por PALABRA, con la clave en SIMPLIFICADO, aplicada al texto ya convertido (cubre al que escribe en simplificado y al que escribe en tradicional):
//      理发 心脏 肝脏 说干就干 干嘛 干吗 (grupo A, por palabra) y 变为 列为 视为 尤为 身为 还款 载体 卷入 钻空子 (grupo B). Las cinco con 为 llevan
//      «no seguida de» 什么 y 了: 不確定為什麼 (wèishénme) y 我決定為了你留下 (wèile) NO se corrigen a wéi. Se salta si el texto ORIGINAL tiene un 乾 (乾嗎, «¿está seco?»,
//      convierte a 干吗 pero es gān).
//      定为 quedó FUERA de la tabla (decisión del usuario): 一定為你 / 決定為你 / 肯定為你 («por, para», wèi) y 被定為 / 認定為 («wéi») no se distinguen con la palabra sola;
//      queda como pinyin-pro («wèi»), con los casos fijos acá, y anotada para el docente.
//      Coincidencia más larga, de izquierda a derecha; la familia TOCFL manda después (su tabla pisa a la de acá).
//   Quedan FUERA a propósito (dudosas, van al docente): 為人 有為 為師 轉動 盡可能 處在 定為 (好處在於 / 到處在找 / 一定為你 salen como antes), y los grupos C y D.
//   a. cada palabra, en simplificado y en tradicional, da la lectura esperada con la convención HSK (el Lector)
//   b. exclusiones y casos que NO deben cambiar (la lista de arriba, 頭髮, 打發, 一乾二淨, 東西…)
//   c. la familia TOCFL: sigue mandando su tabla, y la capa nueva corrige donde TOCFL no dice nada
//   d. sin regresión: en los textos de la app que no tienen ninguna de las claves ni 髮/臟/幹, pinyinFor da EXACTAMENTE lo mismo que antes
//   e. la alineación por carácter se conserva (pinyinItemsFor, el Lector, sigue 1:1)
// Se MIDE en el navegador (Chromium) llamando a pinyinFor / pinyinItemsFor. NO se prueba qué texto escribe el motor Whisper real. No toca app.js, el SRS ni checkAnswer.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

// [texto en simplificado, texto en tradicional, lectura esperada (HSK)]
const PALABRAS = [
  ['理发', '理髮', 'lǐ fà'], ['心脏', '心臟', 'xīn zàng'], ['肝脏', '肝臟', 'gān zàng'], ['说干就干', '說幹就幹', 'shuō gàn jiù gàn'],
  ['干嘛', '幹嘛', 'gàn ma'], ['干吗', '幹嗎', 'gàn ma'], ['心脏病', '心臟病', 'xīn zàng bìng'],
  ['变为', '變為', 'biàn wéi'], ['列为', '列為', 'liè wéi'], ['视为', '視為', 'shì wéi'], ['尤为', '尤為', 'yóu wéi'], ['身为', '身為', 'shēn wéi'],
  ['还款', '還款', 'huán kuǎn'], ['载体', '載體', 'zài tǐ'], ['卷入', '捲入', 'juǎn rù'], ['钻空子', '鑽空子', 'zuān kòng zi']
];
// Textos que NO deben cambiar respecto de la lectura «base» (pinyin-pro sobre el simplificado, como antes de este cambio)
const IGUAL_QUE_ANTES = [
  '不確定為什麼', '確定為什麼重要', '我決定為了你留下', '為人民服務', '他為人很好', '好處在於', '到處在找', // exclusiones y dudosas (為人 / 處在 quedan afuera)
  '頭髮', '打發', '一乾二淨', '東西', '乾淨', '發現', '這個東西很重要', '轉動', '盡可能', '有為', '為師',
  // 為 = «por, para» (wèi) con 一定 / 決定 / 肯定 / 確定 + pronombre, y 乾嗎 (乾 = gān) no es 干嗎
  '我一定為你加油', '他決定為她做飯', '肯定為他高興', '不確定為何', '確定為啥', '決定為此努力', '乾嗎', '他視為什麼', '列為什麼問題', '變為了現實', '身為了你',
  // 定為: FUERA de la tabla. Con la palabra sola no se distingue «por, para» (wèi) de «como» (wéi): queda como pinyin-pro en todos los casos
  '他一定為你高興', '一定為你', '決定為你', '肯定為你', '定為', '被定為國家公園', '被認定為英雄', '設定為預設', '確定為目標'
];
// Lo que SÍ tiene que decir (las exclusiones): la lectura de pinyin-pro, escrita a mano
const EXCLUSIONES = [['認定為什麼會這樣', 'rèn dìng wèi shén me huì zhè yàng'], ['設定為了你的安全', 'shè dìng wèi le nǐ de ān quán'], ['不確定為什麼', 'bú què dìng wèi shén me'], ['我決定為了你留下', 'wǒ jué dìng wèi le nǐ liú xià'], ['确定为什么重要', 'què dìng wèi shén me zhòng yào'], ['为人民服务', 'wèi rén mín fú wù'], ['頭髮', 'tóu fa'],
  // las exclusiones «什么» y «了» sobre las claves que SÍ están en la tabla (antes se medían con 定为): la clave no se aplica y queda la lectura de pinyin-pro
  ['他視為什麼', 'tā shì wèi shén me'], ['列為什麼問題', 'liè wèi shén me wèn tí'], ['變為了現實', 'biàn wèi le xiàn shí'], ['身為了你', 'shēn wèi le nǐ'],
  // 定為 (fuera de la tabla): «por, para» (wèi), lectura correcta, con la lectura escrita a mano
  ['他一定為你高興', 'tā yí dìng wèi nǐ gāo xìng'], ['一定為你', 'yí dìng wèi nǐ'], ['決定為你', 'jué dìng wèi nǐ'], ['肯定為你', 'kěn dìng wèi nǐ'],
  // …y los «wéi» que SIGUEN mal (límite conocido, para el docente): se fija que quedan como pinyin-pro y no se arreglan con la palabra sola
  ['被定為國家公園', 'bèi dìng wèi guó jiā gōng yuán'], ['被认定为英雄', 'bèi rèn dìng wèi yīng xióng']];

(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  const ctx = await b.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'block' });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1500);
  await p.evaluate(() => ensureTocflPinyin()); await p.waitForTimeout(600);

  const hsk = (t) => p.evaluate((x) => pinyinFor(x, 'hsk'), t);
  // lectura «base»: pinyin-pro sobre el simplificado (lo que daba pinyinFor antes de este cambio, familia HSK)
  const base = (t) => p.evaluate((x) => pinyinPro.pinyin(simpForPinyin(x), { type: 'array' }).join(' ').replace(/ r(?= |$)/g, 'r'), t);

  // a. las palabras, en simplificado y en tradicional
  for (const [s, t, esp] of PALABRAS) {
    const gs = await hsk(s), gt = await hsk(t);
    ok(gs === esp, 'a. ' + s + ' (simplificado) → «' + gs + '» (esperado «' + esp + '»)');
    ok(gt === esp, 'a. ' + t + ' (tradicional) → «' + gt + '» (esperado «' + esp + '»)');
  }
  // a2. SOLO la regla por carácter (palabras que no están en la tabla): 髮 → fà, 臟 → zàng sobre el tradicional; lo demás no se toca
  for (const [t, esp] of [['千鈞一髮', 'qiān jūn yì fà'], ['內臟', 'nèi zàng'], ['腎臟', 'shèn zàng'], ['五臟六腑', 'wǔ zàng liù fǔ']]) { const g = await hsk(t); ok(g === esp, 'a. (por carácter) ' + t + ' → «' + g + '» (esperado «' + esp + '»)'); }
  for (const [t, esp] of [['白髮', 'bái fà'], ['髒話', 'zāng huà'], ['乾杯', 'gān bēi'], ['若干', 'ruò gān'], ['干涉', 'gān shè'], ['樹幹', 'shù gàn'], ['幹部', 'gàn bù']]) { const g = await hsk(t); ok(g === esp, 'b. (no se pisa) ' + t + ' → «' + g + '» (esperado «' + esp + '»)'); }
  // límite conocido, ACEPTADO: en texto informal se escribe 臟 por 髒 («sucio», zāng) y la regla por carácter lo lee «zàng». Se fija acá para que se vea.
  const sucio = await hsk('很臟');
  ok(sucio === 'hěn zàng', 'b. límite conocido (aceptado): 很臟 (臟 por 髒) → «' + sucio + '» (la regla por carácter lo lee zàng)');
  // …dentro de una oración (la coincidencia no depende de estar solo)
  const oracion = await hsk('他被視為英雄,我還款了');
  ok(/shì wéi/.test(oracion) && /huán kuǎn/.test(oracion), 'b. dentro de una oración: «' + oracion + '»');

  // b. exclusiones y casos que no cambian
  for (const [t, esp] of EXCLUSIONES) { const g = await hsk(t); ok(g === esp, 'b. ' + t + ' → «' + g + '» (esperado «' + esp + '»)'); }
  for (const t of IGUAL_QUE_ANTES) { const g = await hsk(t), bs = await base(t); ok(g === bs, 'b. ' + t + ' queda como pinyin-pro (' + g + ')'); }
  // 發 / 乾 / 髒 / 干 no se tocan
  const intactos = [['打發', 'dǎ fā'], ['一乾二淨', 'yì gān èr jìng']];
  for (const [t, esp] of intactos) { const g = await hsk(t); ok(g === esp, 'b. ' + t + ' → «' + g + '» (esperado «' + esp + '»: 發 y 乾 no se tocan)'); }

  // c0. convención de 髮 por familia: TOCFL «fǎ» (como su lista), HSK «fà»
  const tocflFa = await p.evaluate(() => ['理髮', '千鈞一髮', '頭髮', '髮型'].map((t) => pinyinFor(t, 'tocfl')).join(' | '));
  ok(tocflFa === 'lǐ fǎ | qiān jūn yì fǎ | tóu fǎ | fǎ xíng', 'c. 髮 en la familia TOCFL: «fǎ», como su lista (' + tocflFa + ')');
  // c. TOCFL: su tabla manda; donde no dice nada, la capa nueva corrige
  const tocflNuevo = await p.evaluate(() => pinyinFor('变为', 'tocfl'));
  ok(tocflNuevo === 'biàn wéi', 'c. 变为 en la familia TOCFL (sin entrada en su tabla) → «' + tocflNuevo + '»');
  const manda = await p.evaluate(() => { const T = window.PINYIN_TOCFL; const prev = T['变为']; T['变为'] = 'biàn wèi'; const r = pinyinFor('变为', 'tocfl'); if (prev === undefined) delete T['变为']; else T['变为'] = prev; return r; });
  ok(manda === 'biàn wèi', 'c. si la tabla TOCFL tiene la palabra, MANDA su lectura (' + manda + ')');
  const tocflOk = await p.evaluate(() => [pinyinFor('视为', 'tocfl'), pinyinFor('身为', 'tocfl'), pinyinFor('心臟', 'tocfl')].join(' | '));
  ok(tocflOk === 'shì wéi | shēn wéi | xīn zàng', 'c. TOCFL sigue acertando lo que ya acertaba (' + tocflOk + ')');

  // d. sin regresión: los textos de la app sin ninguna clave dan exactamente lo mismo que antes
  const reg = await p.evaluate(() => {
    const HAN = /[㐀-鿿]/, seen = new Set(), corpus = [];
    const walk = (o, d) => { if (d > 7 || o == null) return; if (typeof o === 'string') { if (o.length >= 2 && o.length < 300 && HAN.test(o) && !seen.has(o)) { seen.add(o); corpus.push(o); } return; } if (typeof o !== 'object' || o instanceof Node || o === window) return; try { for (const k of Object.keys(o)) walk(o[k], d + 1); } catch (e) { /* noop */ } };
    ['GRADED_LESSONS', 'EMBEDDED_MODULE_DATA', 'DAILY_STORIES', 'DICT_MINI'].forEach((k) => { try { if (window[k] !== undefined) walk(window[k], 0); } catch (e) { /* noop */ } });
    const CLAVES = ['理发', '心脏', '肝脏', '说干就干', '干嘛', '干吗', '变为', '列为', '视为', '尤为', '身为', '还款', '载体', '卷入', '钻空子'];
    const sinClave = (t) => { const s = simpForPinyin(t); return !/[髮臟幹]/.test(t) && !CLAVES.some((c) => s.indexOf(c) !== -1); };
    let comp = 0, dif = [];
    for (const t of corpus) { if (!sinClave(t)) continue; comp++; const a = pinyinFor(t, 'hsk'), bs = pinyinPro.pinyin(simpForPinyin(t), { type: 'array' }).join(' ').replace(/ r(?= |$)/g, 'r'); if (a !== bs) dif.push(t.slice(0, 30)); }
    return { total: corpus.length, comp, dif: dif.slice(0, 5), nd: dif.length };
  });
  ok(reg.comp > 1000 && reg.nd === 0, 'd. ' + reg.comp + ' textos de la app sin ninguna clave: pinyinFor da exactamente lo de antes (diferencias ' + reg.nd + ' ' + JSON.stringify(reg.dif) + ')');

  // e. el Lector (pinyinItemsFor) conserva la alineación 1:1 por carácter
  const items = await p.evaluate(() => { const t = '他被視為英雄,說幹就幹,我還款了。'; const it = pinyinItemsFor(t, 'hsk'); return { ok: !!it && it.length === Array.from(t).length, py: it ? it.filter((x) => x.isZh).map((x) => x.pinyin).join(' ') : '' }; });
  ok(items.ok && /shì wéi/.test(items.py) && /shuō gàn jiù gàn/.test(items.py), 'e. pinyinItemsFor conserva el 1:1 y trae las lecturas corregidas (' + items.py + ')');

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
