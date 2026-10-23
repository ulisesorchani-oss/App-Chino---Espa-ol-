// Matriz de pruebas de fix/escritura-tradicional (6 pantallas × escrituras).
const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const fs = require('fs');
const OUT=shots('escritura-tradicional'); fs.mkdirSync(OUT, { recursive: true });
let fails = 0; const rows = [];
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const TOC = 'tocfl-a1-taifeng', HSK = 'h1-gato';

async function page(b, init) {
  const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
  await ctx.addInitScript((init) => {
    if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1'); localStorage.clear();
    localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_tab', 'lessons');
    localStorage.setItem('chino-espanol-app-v2', JSON.stringify(Object.assign({ mode: 'es-cn' }, init.prog || {})));
    Object.entries(init.ls || {}).forEach(([k, v]) => localStorage.setItem(k, v));
  }, init || {});
  const p = await ctx.newPage(); p._errs = []; p.on('pageerror', e => p._errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1400);
  // el audio no sale a la red en la prueba: se registra el texto que se mandaría
  await p.evaluate(() => { window.__tts = []; const f = window.fetchTTS; window.fetchTTS = (body) => { try { window.__tts.push(body.text); } catch (e) { } return Promise.reject(new Error('sin red')); }; });
  return { ctx, p };
}
async function chooseScript(p, module, ct) { // elección explícita desde Hoy con un módulo de esa familia
  await p.evaluate((m) => setModule(m), module); await p.waitForTimeout(500);
  await p.evaluate(() => { showView('hoy'); }); await p.click('#btn-tools-toggle').catch(() => { });
  await p.click(ct === 'simp' ? '#btn-simplified' : '#btn-traditional'); await p.waitForTimeout(200);
  await p.click('#btn-tools-toggle').catch(() => { });
}
// las 6 pantallas de una lección; devuelve qué escritura vio en cada una
async function screens(p, id, tag) {
  const L = await p.evaluate((id) => GRADED_LESSONS.find(l => l.id === id), id);
  const want = (t, s, z) => t === z ? 'igual' : (s === t ? 'trad' : (s === z ? 'simp' : '¿' + s + '?'));
  const lv = L.exam === 'TOCFL' ? 'tocfl:' + L.examLvl : String(L.hsk);
  await p.evaluate(() => showView('aprender')); await p.click('#tab-lessons');
  await p.selectOption(L.exam === 'TOCFL' ? '#sel-lv-tocfl' : '#sel-lv-hsk', lv); await p.waitForTimeout(150);
  const r = {};
  r.lista = want(L.titleZhT, await p.$eval('.lq-btn[data-id="' + id + '"]', b => b.closest('.lesson-card').querySelector('.lc-zh').textContent), L.titleZh);
  await p.evaluate((id) => document.querySelector('.lq-btn[data-id="' + id + '"]').closest('.lesson-card').scrollIntoView({ block: 'center' }), id);
  await p.screenshot({ path: OUT + '/' + tag + '-1-lista.png' });
  await p.click('.lq-btn[data-act="read"][data-id="' + id + '"]'); await p.waitForTimeout(300);
  const gl = await p.$$eval('.lq-gloss-zh', x => x.map(e => e.textContent));
  const T = L.lines.map(x => x.zhT).join(''), S = L.lines.map(x => x.zh).join('');
  r.glosario = gl.length < 3 ? 'sin glosario' : (gl.every(w => T.includes(w)) && !gl.every(w => S.includes(w)) ? 'trad' : (gl.every(w => S.includes(w)) && !gl.every(w => T.includes(w)) ? 'simp' : (gl.every(w => T.includes(w) && S.includes(w)) ? 'igual' : '¿' + gl.join(' ') + '?')));
  await p.screenshot({ path: OUT + '/' + tag + '-4-glosario.png' });
  await p.click('#lq-gloss-continue').catch(() => { }); await p.waitForTimeout(250);
  r.encabezado = want(L.titleZhT, await p.textContent('.lq-story-zh'), L.titleZh);
  const lines = await p.$$eval('.lq-line-zh', x => x.map(e => e.textContent));
  r.historia = lines.every((t, i) => t === L.lines[i].zhT) ? 'trad' : (lines.every((t, i) => t === L.lines[i].zh) ? 'simp' : '¿mezcla?');
  await p.screenshot({ path: OUT + '/' + tag + '-2-3-historia.png' });
  await p.click('#lq-story-practice'); await p.waitForTimeout(250);
  const qz = await p.textContent('#lq-zh'), opts = await p.$$eval('.lq-opt-zh', x => x.map(e => e.textContent));
  const q = L.quiz[0];
  const qs = qz === q.zhT.replace('___', '？') ? 'trad' : (qz === q.zh.replace('___', '？') ? 'simp' : '¿' + qz + '?');
  const os = opts.every(o => q.opts.some(x => x.t === o)) && opts.some(o => !q.opts.some(x => x.z === o)) ? 'trad' : (opts.every(o => q.opts.some(x => x.z === o)) && opts.some(o => !q.opts.some(x => x.t === o)) ? 'simp' : (opts.every(o => q.opts.some(x => x.t === o && x.z === o)) ? 'igual' : '¿opciones?'));
  r.quiz = qs === os || os === 'igual' ? qs : qs + '/' + os;
  await p.screenshot({ path: OUT + '/' + tag + '-5-quiz.png' });
  await p.click('#lq-close'); await p.waitForTimeout(200);
  // Podcast: texto en pantalla ("Ver texto") y texto que se manda al audio
  await p.evaluate(() => { window.__tts = []; showView('entrenar'); }); await p.click('#btn-podcast'); await p.waitForTimeout(300);
  await p.click('.pd-item[data-pd-id="' + id + '"]'); await p.waitForTimeout(400);
  await p.click('#pd-toggle-text'); await p.waitForTimeout(200);
  const pdt = await p.$$eval('.pd-text-zh', x => x.map(e => e.textContent));
  const sent = await p.evaluate(() => window.__tts.join('\n'));
  const pdTxt = pdt.every((t, i) => t === L.lines[i].zhT) ? 'trad' : (pdt.every((t, i) => t === L.lines[i].zh) ? 'simp' : '¿?');
  const pdAud = sent === L.lines.map(x => x.zhT).join('\n') ? 'trad' : (sent === L.lines.map(x => x.zh).join('\n') ? 'simp' : (sent ? '¿' + sent.slice(0, 20) + '?' : 'sin pedido'));
  r.podcast = pdTxt === pdAud ? pdTxt : pdTxt + '/' + pdAud;
  await p.screenshot({ path: OUT + '/' + tag + '-6-podcast.png' });
  await p.click('#pd-close'); await p.waitForTimeout(200);
  r.contexto = await p.evaluate(() => window.acScriptRef === null || window.acScriptRef === undefined ? 'limpio' : 'QUEDÓ PUESTO');
  return r;
}
function check(name, r, want) {
  const keys = ['lista', 'encabezado', 'historia', 'glosario', 'quiz', 'podcast'];
  const bad = keys.filter(k => r[k] !== want);
  rows.push([name].concat(keys.map(k => r[k])));
  ok(!bad.length && r.contexto === 'limpio', name + ' → ' + keys.map(k => k + '=' + r[k]).join(' · ') + (bad.length ? '  ✗ ' + bad.join(',') : '') + (r.contexto !== 'limpio' ? '  ✗ contexto' : ''));
}

(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  // 1) sin elegir nada
  let { ctx, p } = await page(b, {});
  check('TOCFL sin elegir', await screens(p, TOC, 'A-tocfl-sin'), 'trad');
  check('HSK sin elegir', await screens(p, HSK, 'B-hsk-sin'), 'simp');
  // Diaria, Clásicos y SRS siguen "HSK y el resto" aunque Hoy esté en un módulo TOCFL
  await p.evaluate(() => setModule('TOCFL-A1')); await p.waitForTimeout(500);
  const card = await p.evaluate(() => { const F = getFiltered(); const i = F.findIndex(x => (x.chinese_trad_full || '') !== (x.chinese_simp_full || '')); state.currentIndex = i; renderCurrentSentence(); const s = F[i]; return { ck: ck(), shown: document.getElementById('sentence-text').textContent.replace(/\s/g, ''), t: (s.chinese_trad_full || '').replace(/\s/g, ''), z: (s.chinese_simp_full || '').replace(/\s/g, '') }; });
  ok(card.ck === 'trad' && card.shown.includes(card.t) && card.t !== card.z, 'Hoy, módulo TOCFL-A1 sin elegir: tarjeta en tradicional (' + card.t + ')');
  const rest = await p.evaluate(() => {
    const srs = document.getElementById('srs-pop'); srs.classList.remove('hidden'); const inSrs = ck(); srs.classList.add('hidden');
    const cl = document.querySelector('#classics-menu .classic-item[data-module="Clasicos-Lunyu"] .ci-zh').textContent;
    return { inSrs, cl, daily: scriptFor('hsk') };
  });
  ok(rest.inSrs === 'simp' && rest.cl === '论语' && rest.daily === 'simp', 'con Hoy en TOCFL: Repaso (SRS) = simp, menú de Clásicos = 论语, Diaria = simp (sin cambios)');
  await p.evaluate(() => { showView('aprender'); }); await p.click('#tab-daily'); await p.click('#btn-daily-toggle'); await p.click('#daily-menu .cat-btn[data-module="En el subterráneo"]'); await p.waitForTimeout(400); await p.click('#btn-ds-continue').catch(() => { }); await p.waitForTimeout(300);
  const ds = await p.evaluate(() => { const t = document.getElementById('daily-story-body').textContent; return { simp: ['请','园','号','线'].every(c => t.includes(c)), trad: ['請','園','號','線'].some(c => t.includes(c)) }; });
  ok(ds.simp && !ds.trad, 'Diaria (escena del subte) en simplificado con Hoy en TOCFL');
  await p.click('#btn-daily-story-close').catch(() => { });
  ok(p._errs.length === 0, 'sin errores JS ' + p._errs.join(' / ')); await ctx.close();

  // 2) elección explícita: 简 en TOCFL, 繁 en HSK
  ({ ctx, p } = await page(b, {}));
  await chooseScript(p, 'TOCFL-A1', 'simp');
  ok(await p.evaluate(() => localStorage.getItem('ac_script_tocfl') === 'simp' && !localStorage.getItem('ac_script_hsk')), '简 con un módulo TOCFL guarda solo ac_script_tocfl=simp');
  check('TOCFL con 简 elegido', await screens(p, TOC, 'C-tocfl-simp'), 'simp');
  check('HSK sin elegir (TOCFL en 简)', await screens(p, HSK, 'D-hsk-sin2'), 'simp');
  await chooseScript(p, 'HSK1', 'trad');
  ok(await p.evaluate(() => localStorage.getItem('ac_script_hsk') === 'trad' && JSON.parse(localStorage.getItem('chino-espanol-app-v2')).charType === 'trad'), '繁 con un módulo HSK guarda ac_script_hsk=trad (y charType=trad)');
  check('HSK con 繁 elegido', await screens(p, HSK, 'E-hsk-trad'), 'trad');
  check('TOCFL con 简 (no lo pisa HSK)', await screens(p, TOC, 'F-tocfl-simp2'), 'simp');
  // cambiar 简/繁 en Hoy y volver a Aprender: la lista se redibuja sin recargar
  await p.evaluate(() => { showView('aprender'); }); await p.click('#tab-lessons'); await p.selectOption('#sel-lv-tocfl', 'tocfl:A1');
  const before = await p.$eval('.lq-btn[data-id="' + TOC + '"]', b => b.closest('.lesson-card').querySelector('.lc-zh').textContent);
  await chooseScript(p, 'TOCFL-A1', 'trad');
  await p.evaluate(() => showView('aprender'));
  const after = await p.$eval('.lq-btn[data-id="' + TOC + '"]', b => b.closest('.lesson-card').querySelector('.lc-zh').textContent);
  ok(before === '台风天' && after === '颱風天', 'lista redibujada sin recargar: ' + before + ' → ' + after);
  // Lector: biblioteca = "HSK y el resto"; texto pegado NUNCA se convierte
  const lect = await p.evaluate(() => { const inp = document.getElementById('reader-input'); inp.value = '我們還在學習。'; inp.dispatchEvent(new Event('input')); return inp.value; });
  ok(lect === '我們還在學習。', 'Lector: el texto pegado queda tal cual (' + lect + ')');
  ok(p._errs.length === 0, 'sin errores JS ' + p._errs.join(' / ')); await ctx.close();

  // 3) migración del 简/繁 de antes
  ({ ctx, p } = await page(b, { prog: { charType: 'trad' } }));
  ok(await p.evaluate(() => scriptFor('tocfl') === 'trad' && scriptFor('hsk') === 'trad' && localStorage.getItem('ac_script_hsk') === 'trad' && localStorage.getItem('ac_script_tocfl') === 'trad'), 'migración: un «trad» guardado cuenta como explícito para las dos familias');
  check('HSK tras migrar «trad»', await screens(p, HSK, 'G-hsk-migr'), 'trad');
  await ctx.close();
  ({ ctx, p } = await page(b, { prog: { charType: 'simp' } }));
  ok(await p.evaluate(() => scriptFor('tocfl') === 'trad' && scriptFor('hsk') === 'simp' && !localStorage.getItem('ac_script_hsk') && !localStorage.getItem('ac_script_tocfl')), 'migración: un «simp» guardado NO cuenta (TOCFL trad, HSK simp, sin claves)');
  await ctx.close();
  fs.writeFileSync(shots('escritura-tradicional') + 'rows.json', JSON.stringify(rows));
  console.log(fails ? 'FALLAS: ' + fails : 'TODO OK'); await b.close();
})().catch(e => { console.error('FALLO', e); process.exit(1); });
