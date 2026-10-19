#!/usr/bin/env node
// tools/test-classics-cq.js — prueba de regresión de la práctica de los clásicos (classics-reader.js · cqOptions).
//   node tools/test-classics-cq.js       → código de salida 1 si algo falla
//
// Por qué existe: cqOptions() buscaba distractores en OTROS clásicos con `key === mod`, pero `mod` no era parámetro ni variable
// de esa función (lo encontró tools/check-undef.js): lanzaba «ReferenceError: mod is not defined» cada vez que el propio clásico
// no alcanzaba 2 distractores. Con los datos actuales (12 filas por clásico) esa rama no se ejecuta, por eso nada lo notó.
// El arreglo usa CR.mod (openCq() lo fija antes de armar las opciones).
//
// Qué hace: servidor estático local + Chromium (Playwright), sin red real. Abre la práctica de un clásico
//   1) con sus 12 filas (camino normal): 12 preguntas con 3 opciones distintas, sin errores
//   2) reducido a 2 filas (fuerza el camino que usa `mod`): sin ReferenceError, 3 opciones distintas por pregunta, y la tercera
//      opción sale de OTRO clásico (nunca del mismo)
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

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
  const launch = { headless: true };
  for (const exe of ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROMIUM]) if (exe && fs.existsSync(exe)) { launch.executablePath = exe; break; }
  const b = await chromium.launch(launch);
  const MOD = 'Clasicos-Daxue';

  // abre la práctica del clásico y la recorre entera; devuelve las opciones de cada pregunta
  async function run(reduceTo) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 780 }, serviceWorkers: 'block' });
    await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); } });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
    const info = await p.evaluate(([mod, k]) => {
      if (k) EMBEDDED_MODULE_DATA[mod] = EMBEDDED_MODULE_DATA[mod].slice(0, k);
      const own = EMBEDDED_MODULE_DATA[mod].map(r => String(r.chinese_simp_answer || '').trim());
      const others = []; Object.keys(EMBEDDED_MODULE_DATA).filter(x => x.indexOf('Clasicos-') === 0 && x !== mod).forEach(x => EMBEDDED_MODULE_DATA[x].forEach(r => others.push(String(r.chinese_simp_answer || '').trim())));
      return { own, others, rows: own.length };
    }, [MOD, reduceTo || 0]);
    const opened = await p.evaluate((mod) => { const r = window.CR_open(mod); return r; }, MOD); await p.waitForTimeout(400);
    await p.evaluate(() => document.getElementById('cr-practice').click()); await p.waitForTimeout(400);
    const qs = [];
    for (let i = 0; i < info.rows; i++) {
      const view = await p.evaluate(() => ({ opts: [...document.querySelectorAll('#cq-opts .lq-opt-zh')].map(x => x.textContent), tag: (document.getElementById('cq-zh') || {}).textContent || '' }));
      qs.push(view);
      await p.evaluate(() => { const o = document.querySelector('#cq-opts .lq-opt'); if (o) o.click(); }); await p.waitForTimeout(60);
      await p.evaluate(() => { const nx = document.getElementById('cq-next'); if (nx) nx.click(); }); await p.waitForTimeout(80);
    }
    await ctx.close();
    return { info, opened, qs, errs };
  }

  // 1) camino normal
  let r = await run(0);
  ok(r.opened === true && r.qs.length === 12 && r.qs.every(q => q.opts.length === 3 && new Set(q.opts).size === 3), '1) clásico completo: 12 preguntas con 3 opciones distintas ' + JSON.stringify(r.qs.map(q => q.opts.length)));
  ok(r.errs.length === 0, '1) sin errores JS: ' + r.errs.join(' | '));

  // 2) clásico reducido a 2 filas: el propio clásico da 1 distractor y el otro sale de los demás (rama que usa CR.mod)
  r = await run(2);
  ok(r.errs.length === 0, '2) sin «mod is not defined» ni otros errores: ' + r.errs.join(' | '));
  ok(r.opened === true && r.qs.length === 2 && r.qs.every(q => q.opts.length === 3 && new Set(q.opts).size === 3), '2) 2 preguntas con 3 opciones distintas ' + JSON.stringify(r.qs.map(q => q.opts)));
  const ownSet = new Set(r.info.own), othersSet = new Set(r.info.others);
  r.qs.forEach((q, i) => {
    const mine = q.opts.filter(o => ownSet.has(o)), foreign = q.opts.filter(o => !ownSet.has(o));
    ok(mine.length === 2 && foreign.length === 1 && othersSet.has(foreign[0]), '2) pregunta ' + (i + 1) + ': 2 opciones del propio clásico (la correcta y el otro ítem) + 1 de OTRO clásico ' + JSON.stringify({ mine, foreign }));
  });

  await b.close(); server.close();
  console.log('test-classics-cq: ' + n + ' comprobaciones · ' + (fails ? fails + ' FALLAN' : 'todo en regla'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); try { server.close(); } catch (x) { /* nada */ } process.exit(1); });
