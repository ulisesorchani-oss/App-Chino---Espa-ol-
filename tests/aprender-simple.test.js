// Pruebas de feat/aprender-simple sobre la app real (rama ya aplicada).
const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const fs = require('fs');
const OUT=shots('aprender-simple');
fs.mkdirSync(OUT, { recursive: true });
const HSK = ['1', '2', '3', '4', '5', '6', '7-9'];
const TOC = ['Prep', 'A1', 'A2', 'B1', 'B2', 'C1'].map(v => 'tocfl:' + v);
let fails = 0;
const ok = (cond, msg) => { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) fails++; };

async function newPage(b, { mode, theme, extra }) {
  const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
  await ctx.addInitScript(({ mode, theme, extra }) => {
    if (sessionStorage.getItem('__init')) return; // solo la 1.ª carga: los reload conservan lo guardado
    sessionStorage.setItem('__init', '1');
    localStorage.clear();
    localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_tab', 'lessons'); localStorage.setItem('theme', theme);
    localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode, interleaving: false }));
    Object.entries(extra || {}).forEach(([k, v]) => localStorage.setItem(k, v));
  }, { mode, theme, extra });
  const page = await ctx.newPage();
  page._errs = []; page.on('pageerror', e => page._errs.push(e.message));
  await page.goto(APP_URL); await page.waitForTimeout(1400);
  return { ctx, page };
}
const state = (p) => p.evaluate(() => {
  const l = document.getElementById('lesson-list'), h = document.getElementById('sel-lv-hsk'), t = document.getElementById('sel-lv-tocfl');
  return { lv: l.dataset.level, h: h.value, t: t.value, hOn: h.parentNode.classList.contains('on'), tOn: t.parentNode.classList.contains('on'),
    cards: Array.from(document.querySelectorAll('#lesson-list .lesson-card')).map(c => c.querySelector('.lq-btn').dataset.id),
    empty: !!document.querySelector('#lesson-list > p.lessons-intro'),
    view: document.querySelector('.view:not(.hidden)').id };
});
const expected = (p, v) => p.evaluate((v) => GRADED_LESSONS.filter(l => {
  if (v.indexOf('tocfl:') === 0) return l.exam === 'TOCFL' && String(l.examLvl || '') === v.slice(6);
  if (v === '7-9') return !l.exam && ['7', '8', '9'].indexOf(String(l.hsk)) !== -1;
  return !l.exam && String(l.hsk) === v; }).map(l => l.id), v);

(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  for (const theme of ['light', 'dark', 'paper']) {
    // ─────────── es ───────────
    const { ctx, page: p } = await newPage(b, { mode: 'es-cn', theme });
    const T = '[es ' + theme + '] ';
    await p.evaluate(() => showView('aprender'));
    ok((await p.textContent('[data-i18n="viewAprenderSub"]')) === 'Elegí qué aprender.', T + 'subtítulo sin "volvés a Hoy"');
    ok(!(await p.$('#view-aprender #btn-interleaving')) && !!(await p.$('#control-panel #btn-interleaving')), T + 'Intercalar está en Hoy (#control-panel), no en Aprender');
    let s = await state(p);
    ok(s.lv === '1' && s.h === '1' && s.t === '' && s.hOn && !s.tOn, T + 'arranque: HSK 1 activo, TOCFL en placeholder');
    ok(await p.$eval('#sel-lv-tocfl', sel => Array.from(sel.options).map(o => o.value + (o.disabled ? '(dis)' : '')).join(',')) === '(dis),tocfl:Prep,tocfl:A1,tocfl:A2,tocfl:B1,tocfl:B2,tocfl:C1', T + 'opciones TOCFL desde TOCFL_ORDER, placeholder deshabilitado');
    ok(await p.$eval('#sel-lv-hsk', sel => sel.options[0].disabled && sel.options[0].value === ''), T + 'placeholder HSK deshabilitado');
    const h0 = await p.evaluate(() => history.length);
    let all13 = true, detail = [];
    for (const v of HSK.concat(TOC)) {
      await p.selectOption(v.indexOf('tocfl:') === 0 ? '#sel-lv-tocfl' : '#sel-lv-hsk', v); await p.waitForTimeout(60);
      s = await state(p); const exp = await expected(p, v);
      const isT = v.indexOf('tocfl:') === 0;
      const good = s.lv === v && JSON.stringify(s.cards) === JSON.stringify(exp) && (exp.length || s.empty) && s.view === 'view-aprender' &&
        (isT ? (s.t === v && s.h === '' && s.tOn && !s.hOn) : (s.h === v && s.t === '' && s.hOn && !s.tOn));
      if (!good) all13 = false; detail.push(v.replace('tocfl:', 'T') + '=' + (exp.length || 'vacío'));
    }
    ok(all13, T + 'los 13 niveles filtran la lista, sin cambiar de pestaña, un solo resaltado [' + detail.join(' ') + ']');
    ok((await p.evaluate(() => history.length)) === h0, T + 'elegir niveles no agrega entradas al historial');
    await p.selectOption('#sel-lv-hsk', '3'); await p.selectOption('#sel-lv-tocfl', 'tocfl:B1'); await p.selectOption('#sel-lv-hsk', '2');
    s = await state(p); ok(s.lv === '2' && s.h === '2' && s.t === '' && s.hOn && !s.tOn, T + 'HSK 3 → TOCFL B1 → HSK 2');
    await p.selectOption('#sel-lv-tocfl', 'tocfl:A2'); await p.waitForTimeout(80);
    if (theme === 'light' || true) { await p.evaluate(() => { document.getElementById('lesson-levels').scrollIntoView({ block: 'start' }); window.scrollBy(0, -150); }); await p.waitForTimeout(150); await p.screenshot({ path: OUT + '/es-' + theme + '-tocfl.png' }); }
    // abrir y cerrar con ✕
    await p.click('#lesson-list .lq-btn[data-act="read"]'); await p.waitForTimeout(250);
    ok(!(await p.$eval('#lesson-pop', e => e.classList.contains('hidden'))), T + 'abre la lección');
    await p.click('#lq-close'); await p.waitForTimeout(200);
    s = await state(p); ok(s.lv === 'tocfl:A2' && s.t === 'tocfl:A2' && s.tOn, T + 'cerrar con ✕ mantiene TOCFL A2');
    // abrir y cerrar con Atrás
    await p.click('#lesson-list .lq-btn[data-act="practice"]'); await p.waitForTimeout(300);
    await p.click('#lq-body button.lq-opt, #lq-body button').catch(() => { }); await p.waitForTimeout(250); // 1.er clic dentro (regla de gesto)
    await p.evaluate(() => history.back()); await p.waitForTimeout(400);
    s = await state(p);
    ok((await p.$eval('#lesson-pop', e => e.classList.contains('hidden'))) && s.lv === 'tocfl:A2' && s.view === 'view-aprender', T + 'Atrás cierra la lección y conserva el nivel');
    // recordar el nivel
    await p.reload(); await p.waitForTimeout(1400); await p.evaluate(() => showView('aprender'));
    s = await state(p); ok(s.lv === 'tocfl:A2' && s.t === 'tocfl:A2' && s.tOn && s.h === '', T + 'recarga: recuerda TOCFL A2 (ac_lesson_level)');
    // hints
    const hints = await p.$$eval('.aprender-hoy-hint', xs => xs.map(x => x.textContent));
    ok(hints.length === 2 && hints[0].includes('Practicar en Hoy'), T + 'avisos en Diaria y Clásicos (R3: Exámenes sin selector)');
    await p.click('#tab-exams'); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(150);
    await p.screenshot({ path: OUT + '/es-' + theme + '-examenes.png' });
    // test de colocación: abre y cierra igual
    await p.click('#btn-placement'); await p.waitForTimeout(300);
    const plOpen = !(await p.$eval('#placement-pop', e => e.classList.contains('hidden')));
    await p.click('#btn-placement-close'); await p.waitForTimeout(200);
    ok(plOpen && (await p.$eval('#placement-pop', e => e.classList.contains('hidden'))), T + 'test de colocación abre y cierra');
    await p.click('#tab-lessons');
    // Intercalar en Hoy
    await p.evaluate(() => { showView('hoy'); window.scrollTo(0, 0); }); await p.waitForTimeout(300);
    await p.click('#btn-interleaving'); await p.waitForTimeout(200);
    const ms = await p.evaluate(() => { const e = document.getElementById('module-status'), r = e.getBoundingClientRect();
      return { txt: e.textContent, vis: !e.classList.contains('hidden') && r.top >= 0 && r.bottom <= innerHeight }; });
    const saved = await p.evaluate(() => JSON.parse(localStorage.getItem('chino-espanol-app-v2')).interleaving);
    ok(ms.vis && ms.txt.includes('intercalada') && saved === true && (await p.$eval('#btn-interleaving', e => e.classList.contains('active') && e.textContent.includes('Intercalando'))), T + 'Intercalar: activo, guardado en "interleaving" y aviso visible («' + ms.txt + '»)');
    await p.screenshot({ path: OUT + '/es-' + theme + '-hoy.png' });
    await p.reload(); await p.waitForTimeout(1400);
    ok(await p.$eval('#btn-interleaving', e => e.classList.contains('active')), T + 'Intercalar sobrevive a la recarga');
    await p.click('#btn-interleaving'); await p.waitForTimeout(150);
    ok((await p.evaluate(() => JSON.parse(localStorage.getItem('chino-espanol-app-v2')).interleaving)) === false, T + 'Intercalar se apaga');
    // Podcast
    await p.evaluate(() => showView('entrenar')); await p.click('#btn-podcast'); await p.waitForTimeout(400);
    const pd = await p.evaluate(() => ({ open: !document.getElementById('podcast-pop').classList.contains('hidden'), n: GRADED_LESSONS.length }));
    await p.click('#pd-close'); await p.waitForTimeout(200);
    ok(pd.open && pd.n === 41, T + 'Podcast abre con las 41 lecciones');
    ok(p._errs.length === 0, T + 'sin errores JS ' + p._errs.join(' / '));
    await ctx.close();

    // nivel guardado inválido → vuelve a HSK 1
    if (theme === 'light') {
      const { ctx: c2, page: q } = await newPage(b, { mode: 'es-cn', theme, extra: { ac_lesson_level: 'tocfl:Z9' } });
      s = await state(q); ok(s.lv === '1' && s.h === '1' && s.hOn, '[es light] valor guardado inválido → HSK 1');
      await c2.close();
    }

    // ─────────── zh ───────────
    const { ctx: cz, page: z } = await newPage(b, { mode: 'cn-es', theme });
    const Z = '[zh ' + theme + '] ';
    await z.evaluate(() => showView('aprender')); await z.waitForTimeout(200);
    ok((await z.textContent('[data-i18n="viewAprenderSub"]')) === '选择要学什么。', Z + 'subtítulo zh');
    ok(!(await z.$eval('#lesson-levels', e => getComputedStyle(e).display !== 'none')), Z + 'botones HSK/TOCFL ocultos (DELE)');
    const zh = await z.$$eval('.aprender-hoy-hint', xs => xs.map(x => x.textContent));
    ok(zh.length === 2 && zh.every(t => t.includes('“今天”')), Z + 'avisos zh con “今天”');
    const d0 = await z.$$eval('#dele-list .lesson-card', x => x.length);
    // R15: DELE ya no tiene chips de nivel: un único <select id="dele-level-sel"> (Todos + A1…C2)
    await z.selectOption('#dele-level-sel', 'A1'); await z.waitForTimeout(150);
    const d1 = await z.$$eval('#dele-list .lesson-card', x => x.length);
    ok(d0 === 24 && d1 === 5, Z + 'DELE: 24 dramas, el nivel A1 (select) filtra a 5');
    await z.evaluate(() => window.scrollTo(0, 0)); await z.screenshot({ path: OUT + '/zh-' + theme + '-lecciones.png' });
    await z.evaluate(() => { showView('hoy'); window.scrollTo(0, 0); }); await z.waitForTimeout(300);
    await z.click('#btn-interleaving'); await z.waitForTimeout(200);
    ok((await z.textContent('#module-status')).includes('交错'), Z + 'Intercalar con aviso zh');
    await z.screenshot({ path: OUT + '/zh-' + theme + '-hoy.png' });
    ok(z._errs.length === 0, Z + 'sin errores JS ' + z._errs.join(' / '));
    await cz.close();
  }
  console.log(fails ? 'FALLAS: ' + fails : 'TODO OK');
  await b.close();
})().catch(e => { console.error('FALLO', e); process.exit(1); });
