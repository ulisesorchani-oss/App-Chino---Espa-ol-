#!/usr/bin/env node
// tools/test-dele-layout.js — disposición de la pantalla «Lecciones» (mini-dramas DELE y pista Niños) a 320, 360 y 412 px.
//   node tools/test-dele-layout.js         → código de salida 1 si algo falla
//   SKIP_CONTRAST=1 node tools/test-dele-layout.js   → omite la medida de contraste (queda para verificación manual)
//
// Qué verifica (servidor estático local + Chromium con Playwright, sin red real):
//   · fila superior con DOS botones (Niños · DELE): en la misma línea, mismo ancho, ≥ 44 px de alto, DELE activo al abrir
//   · DELE: sub-filtro Todas / Escolares / Argentina; chips de nivel (Todos + A1…C2) en filas que saltan de línea (ninguno a todo el
//     ancho), cada uno con su conteo; los niveles sin lecciones en la pista elegida quedan apagados; la suma de conteos = total
//   · la lista une Escolares y Argentina, ordenada por nivel y con Escolares antes que Argentina, con la marca de pista en cada tarjeta
//   · Niños: lista directa, sin chips de nivel (todas sus lecciones son «A1 adaptado»), sub-filtro de franja 🌱 / 🌿 con conteos
//   · sin desborde horizontal ni texto cortado (scrollWidth ≤ clientWidth) en botones, chips, marcas y títulos
//   · la primera tarjeta queda a la vista sin bajar una pantalla entera
//   · contraste ≥ 4,5:1 medido sobre píxeles reales (tres temas, 360 px) — se puede omitir con SKIP_CONTRAST=1
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
const SKIP_CONTRAST = !!process.env.SKIP_CONTRAST;

// contraste real: el color de fondo es el más repetido del recorte; el texto, el píxel más lejano en luminancia
async function contrast(p, el) {
  const buf = await el.screenshot();
  return p.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    const L = (r, g, b) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const cnt = new Map(); for (let i = 0; i < d.length; i += 4) { const k = d[i] + ',' + d[i + 1] + ',' + d[i + 2]; cnt.set(k, (cnt.get(k) || 0) + 1); }
    const bg = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number); const lb = L(...bg); let best = 1;
    for (let i = 0; i < d.length; i += 4) { const l = L(d[i], d[i + 1], d[i + 2]); const cr = (Math.max(l, lb) + 0.05) / (Math.min(l, lb) + 0.05); if (cr > best) best = cr; }
    return Math.round(best * 100) / 100;
  }, buf.toString('base64'));
}

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
  const launch = { headless: true };
  for (const exe of ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROMIUM]) if (exe && fs.existsSync(exe)) { launch.executablePath = exe; break; }
  const b = await chromium.launch(launch);
  const OUT = process.env.SHOTS_DIR || null; if (OUT) fs.mkdirSync(OUT, { recursive: true });

  async function open(w, theme) {
    const ctx = await b.newContext({ viewport: { width: w, height: 780 }, serviceWorkers: 'block' });
    await ctx.addInitScript(([th]) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('theme', th); } }, [theme || 'light']);
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1400);
    await p.evaluate(() => setMode('cn-es')); await p.waitForTimeout(800);
    await p.evaluate(() => { showView('aprender'); document.getElementById('tab-lessons').click(); }); await p.waitForTimeout(500);
    return { ctx, p, errs };
  }
  // medidas de la pantalla actual
  const measure = (p) => p.evaluate(() => {
    const r = (e) => { const x = e.getBoundingClientRect(); return { l: x.left, t: x.top, r: x.right, b: x.bottom, w: x.width, h: x.height }; };
    const wrap = document.getElementById('dele-wrap'), W = r(wrap);
    const vis = (e) => e && e.offsetParent !== null;
    const chips = (sel) => [...document.querySelectorAll(sel)].filter(vis).map(e => ({ txt: e.textContent.trim(), n: (e.querySelector('.dele-n') ? +e.querySelector('.dele-n').textContent : null), label: [...e.childNodes].filter(x => x.nodeType === 3).map(x => x.textContent).join('').trim(), ...r(e), clip: e.scrollWidth > e.clientWidth + 1, off: e.disabled, active: e.classList.contains('active'), data: { ...e.dataset } }));
    const cards = [...document.querySelectorAll('#dele-list .dele-card')].map(c => ({ ...r(c), lvl: (c.querySelector('.lc-hsk') || {}).textContent, trk: (c.querySelector('.lc-track') || {}).textContent, trkRect: c.querySelector('.lc-track') ? r(c.querySelector('.lc-track')) : null,
      clip: [...c.querySelectorAll('.lc-top > *, .lc-titles > *, .lc-actions > *')].some(e => e.getBoundingClientRect().right > c.getBoundingClientRect().right + 0.5 || (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== 'inline')) }));
    const nino = [...document.querySelectorAll('#dele-list .nino-card, #dele-list .nino-extra')].map(c => r(c));
    return { vw: innerWidth, vh: innerHeight, W, docOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      seg: chips('#dele-seg .lv-chip'), sub: chips('#dele-sub .lv-chip'), lvl: chips('#dele-levels .lv-chip'), lvlHidden: !vis(document.getElementById('dele-levels')),
      cards, nino, countEl: !!document.getElementById('dele-count'),
      overflowing: [...wrap.querySelectorAll('*')].filter(e => vis(e) && e.getBoundingClientRect().right > innerWidth + 0.5).map(e => e.className || e.tagName).slice(0, 5) };
  });
  const data = async (p) => p.evaluate(() => {
    const dele = DeleDebug.data.filter(d => d.track !== 'Niños'), by = (f) => dele.filter(f);
    const lv = {}; ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(v => { lv[v] = { all: by(d => d.dele === v).length, esc: by(d => d.dele === v && d.track === 'Escolares').length, arg: by(d => d.dele === v && d.track === 'Argentina').length }; });
    return { total: dele.length, esc: by(d => d.track === 'Escolares').length, arg: by(d => d.track === 'Argentina').length, lv, kids: (() => { const st = { total: 0, bands: {}, levels: {} }; NINOS_LESSONS.forEach(l => { st.total++; st.bands[l.band] = (st.bands[l.band] || 0) + 1; st.levels[l.dele] = (st.levels[l.dele] || 0) + 1; }); return st; })() };
  });
  const rows = (arr) => new Set(arr.map(c => Math.round(c.t))).size;
  const num = (c) => c.n;

  for (const w of [320, 360, 412]) {
    const tag = w + 'px ';
    const { ctx, p, errs } = await open(w);
    const D = await data(p);
    let m = await measure(p);
    const inside = (c) => c.l >= m.W.l - 0.5 && c.r <= m.W.r + 0.5;

    // ── DELE (vista por defecto) ──
    ok(m.seg.length === 2 && Math.abs(m.seg[0].t - m.seg[1].t) < 1 && Math.abs(m.seg[0].w - m.seg[1].w) <= 2, tag + 'DELE: dos botones arriba, en la misma línea y del mismo ancho ' + JSON.stringify(m.seg.map(x => [x.txt, Math.round(x.t), Math.round(x.w)])));
    ok(m.seg.every(x => x.h >= 43.5 && inside(x) && !x.clip), tag + 'DELE: botones superiores ≥ 44 px, dentro del contenedor y sin texto cortado');
    ok(/Niños/.test(m.seg[0].label) && num(m.seg[0]) === D.kids.total && /DELE/.test(m.seg[1].label) && num(m.seg[1]) === D.total && m.seg[1].active && !m.seg[0].active, tag + 'DELE: abre en DELE (activo) y los botones muestran sus conteos ' + m.seg.map(x => x.txt).join(' | '));
    ok(m.sub.map(x => x.label).join('|') === 'Todas|🏫 Escolares|🇦🇷 Argentina' && num(m.sub[1]) === D.esc && num(m.sub[2]) === D.arg, tag + 'DELE: sub-filtro Todas / Escolares / Argentina con conteos ' + m.sub.map(x => x.txt).join(' | '));
    ok(m.lvl.length === 7 && m.lvl[0].label === 'Todos' && num(m.lvl[0]) === D.total, tag + 'DELE: chips Todos + A1…C2 (7) ' + m.lvl.map(x => x.txt).join(' | '));
    ok(m.lvl.slice(1).every((c, i) => num(c) === D.lv['A1 A2 B1 B2 C1 C2'.split(' ')[i]].all) && m.lvl.slice(1).reduce((s, c) => s + num(c), 0) === D.total, tag + 'DELE: cada chip de nivel muestra su conteo y la suma da ' + D.total);
    ok(m.lvl.every(c => c.w < m.W.w * 0.6 && c.h >= 43.5 && inside(c) && !c.clip) && m.sub.every(c => c.w < m.W.w * 0.7 && c.h >= 43.5 && inside(c) && !c.clip), tag + 'chips compactos: ninguno a todo el ancho, ≥ 44 px, dentro y sin texto cortado');
    ok(rows(m.lvl) >= 2 && rows(m.lvl) <= 2, tag + 'chips de nivel en 2 filas que saltan de línea (' + rows(m.lvl) + ')');
    ok(!m.docOverflow && m.overflowing.length === 0, tag + 'sin desborde horizontal ' + m.overflowing.join(','));
    ok(!m.countEl, tag + 'el contador «24 mini-dramas» ya no existe');
    ok(m.cards.length === D.total, tag + 'la lista junta Escolares y Argentina (' + m.cards.length + ' tarjetas)');
    const lvlOf = (c) => c.lvl.replace(/\D*DELE\s*/, '').trim(), order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    let sorted = true; for (let i = 1; i < m.cards.length; i++) { const a = m.cards[i - 1], c = m.cards[i], la = order.indexOf(lvlOf(a)), lc = order.indexOf(lvlOf(c)); if (lc < la || (lc === la && /Argentina/.test(a.trk) && /Escolares/.test(c.trk))) sorted = false; }
    ok(sorted, tag + 'orden por nivel y, dentro de cada nivel, Escolares antes que Argentina');
    ok(m.cards.every(c => /Escolares|Argentina/.test(c.trk || '') && c.trkRect && c.trkRect.r <= c.r + 0.5) && m.cards.every(c => !c.clip), tag + 'cada tarjeta lleva su marca de pista y nada se corta dentro de la tarjeta');
    ok(m.cards[0] && m.cards[0].t < m.vh - 60, tag + 'la primera tarjeta queda a la vista sin bajar una pantalla (top ' + Math.round(m.cards[0].t) + ' de ' + m.vh + ')');
    if (OUT) await p.screenshot({ path: path.join(OUT, 'dele-' + w + '.png') });

    // ── Escolares: se apagan B2, C1 y C2 ──
    await p.click('#dele-sub .lv-chip[data-track="Escolares"]'); await p.waitForTimeout(250); m = await measure(p);
    ok(m.cards.length === D.esc && m.cards.every(c => /Escolares/.test(c.trk)), tag + 'Escolares: ' + D.esc + ' tarjetas, todas de esa pista');
    ok(m.lvl.slice(1).every((c, i) => num(c) === D.lv['A1 A2 B1 B2 C1 C2'.split(' ')[i]].esc && c.off === (D.lv['A1 A2 B1 B2 C1 C2'.split(' ')[i]].esc === 0)) && num(m.lvl[0]) === D.esc, tag + 'Escolares: los niveles sin lecciones quedan apagados y los demás muestran su conteo ' + m.lvl.map(x => x.txt + (x.off ? '✗' : '')).join(' | '));
    const stuck = await p.evaluate(() => { const off = document.querySelector('#dele-levels .lv-chip:disabled'); off.click(); return document.querySelectorAll('#dele-list .dele-card').length; });
    ok(stuck === D.esc, tag + 'un chip apagado no filtra');
    // nivel elegido que no existe en la pista siguiente → vuelve a «Todos»
    await p.click('#dele-sub .lv-chip[data-track="Escolares"]'); await p.waitForTimeout(150);      // re-tap → Todas
    await p.click('#dele-levels .lv-chip[data-level="C1"]'); await p.waitForTimeout(150);
    let cnt = await p.evaluate(() => document.querySelectorAll('#dele-list .dele-card').length);
    ok(cnt === D.lv.C1.all, tag + 'nivel C1: ' + D.lv.C1.all + ' tarjetas');
    await p.click('#dele-sub .lv-chip[data-track="Escolares"]'); await p.waitForTimeout(200); m = await measure(p);
    ok(m.lvl[0].active && m.cards.length === D.esc, tag + 'al pasar a Escolares el nivel C1 (que no existe ahí) vuelve a «Todos» (' + m.cards.length + ' tarjetas)');
    // Argentina: los 6 niveles existen
    await p.click('#dele-sub .lv-chip[data-track="Argentina"]'); await p.waitForTimeout(250); m = await measure(p);
    ok(m.cards.length === D.arg && m.lvl.every(c => !c.off) && m.lvl.slice(1).every((c, i) => num(c) === D.lv['A1 A2 B1 B2 C1 C2'.split(' ')[i]].arg), tag + 'Argentina: ' + D.arg + ' tarjetas y los 6 niveles activos');
    ok(!m.docOverflow && m.cards.every(c => !c.clip), tag + 'Argentina: sin desborde ni texto cortado');
    await p.click('#dele-sub .lv-chip[data-track="Todas"], #dele-sub .lv-chip[data-track="all"]'); await p.waitForTimeout(200);

    // ── Niños ──
    await p.click('#dele-seg .lv-chip[data-seg="ninos"]'); await p.waitForTimeout(350); m = await measure(p);
    ok(m.seg[0].active && !m.seg[1].active, tag + 'Niños: el botón Niños queda activo');
    ok(m.lvlHidden && m.lvl.length === 0, tag + 'Niños: sin chips de nivel (todas sus lecciones son A1 adaptado)');
    ok(m.sub.map(x => x.label).join('|') === 'Todas|🌱 6–7|🌿 8–10' && num(m.sub[1]) === D.kids.bands.A && num(m.sub[2]) === D.kids.bands.B, tag + 'Niños: sub-filtro de franja con conteos ' + m.sub.map(x => x.txt).join(' | '));
    ok(m.sub.every(c => c.h >= 43.5 && inside(c) && !c.clip) && m.seg.every(c => inside(c) && !c.clip), tag + 'Niños: botones y chips ≥ 44 px, dentro y sin texto cortado');
    ok(m.nino.length === D.kids.total + 1 && m.cards.length === 0, tag + 'Niños: lista directa (' + D.kids.total + ' lecciones + tarjeta de sonidos)');
    ok(m.nino[0] && m.nino[0].t < m.vh - 60 && !m.docOverflow && m.overflowing.length === 0, tag + 'Niños: la primera tarjeta queda a la vista (top ' + Math.round((m.nino[0] || {}).t) + ') y no hay desborde');
    if (OUT) await p.screenshot({ path: path.join(OUT, 'ninos-' + w + '.png') });
    await p.click('#dele-sub .lv-chip[data-band="A"]'); await p.waitForTimeout(250); m = await measure(p);
    ok(m.nino.length === D.kids.bands.A + 1, tag + 'franja 🌱: ' + D.kids.bands.A + ' lecciones + sonidos (' + m.nino.length + ')');
    await p.click('#dele-sub .lv-chip[data-band="B"]'); await p.waitForTimeout(250); m = await measure(p);
    ok(m.nino.length === D.kids.bands.B, tag + 'franja 🌿: ' + D.kids.bands.B + ' lecciones y sin la tarjeta de sonidos (' + m.nino.length + ')');
    await p.click('#dele-seg .lv-chip[data-seg="dele"]'); await p.waitForTimeout(300); m = await measure(p);
    ok(m.seg[1].active && m.lvl.length === 7 && m.cards.length === D.total && !m.lvlHidden, tag + 'volver a DELE: filtros y lista completos');
    ok(errs.length === 0, tag + 'sin errores JS: ' + errs.join(' | '));
    await ctx.close();
  }

  // ── contraste (verificación opcional; SKIP_CONTRAST=1 la omite) ──
  if (!SKIP_CONTRAST) {
    const crs = [];
    for (const th of ['light', 'dark', 'paper']) {
      const { ctx, p } = await open(360, th);
      const grab = async (label, sel) => { const e = await p.$(sel); if (e) crs.push([th + ' ' + label, await contrast(p, e)]); };
      await grab('botón Niños (inactivo)', '#dele-seg .lv-chip[data-seg="ninos"]');
      await grab('botón DELE (activo)', '#dele-seg .lv-chip[data-seg="dele"]');
      await grab('chip Escolares', '#dele-sub .lv-chip[data-track="Escolares"]');
      await grab('chip nivel A1', '#dele-levels .lv-chip[data-level="A1"]');
      await grab('marca Escolares', '.lc-track-esc');
      await grab('marca Argentina', '.lc-track-arg');
      // chip activo = texto blanco sobre un degradado: se calcula con los colores extremos del degradado (el recorte de píxeles lo subestima)
      const g = await p.evaluate(() => { const e = document.querySelector('#dele-sub .lv-chip.active'); const cols = (getComputedStyle(e).backgroundImage.match(/rgb\([^)]*\)/g) || []).map(c => c.match(/\d+/g).map(Number));
        const L = (r, g2, b2) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g2) + 0.0722 * f(b2); };
        return { cols: cols.length, min: Math.min(...cols.map(c => Math.round(1.05 / (L(...c) + 0.05) * 100) / 100)) }; });
      crs.push([th + ' chip activo (blanco sobre degradado, ' + g.cols + ' colores)', g.cols ? g.min : 0]);
      await p.click('#dele-seg .lv-chip[data-seg="ninos"]'); await p.waitForTimeout(300);
      await grab('chip franja 🌱', '#dele-sub .lv-chip[data-band="A"]');
      await ctx.close();
    }
    const bad = crs.filter(([, c]) => c < 4.5);
    bad.forEach(([m2, c]) => ok(false, 'contraste ' + m2 + ' = ' + c));
    ok(bad.length === 0, 'contraste de ' + crs.length + ' elementos ≥ 4,5:1 (mín ' + Math.min(...crs.map(x => x[1])) + ')');
  }

  await b.close(); server.close();
  console.log('test-dele-layout: ' + n + ' comprobaciones · ' + (fails ? fails + ' FALLAN' : 'todo en regla'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); try { server.close(); } catch (x) { /* nada */ } process.exit(1); });
