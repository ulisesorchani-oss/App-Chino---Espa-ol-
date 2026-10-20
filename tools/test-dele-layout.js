#!/usr/bin/env node
// tools/test-dele-layout.js — pantalla «Lecciones» (mini-dramas DELE y pista Niños): disposición a 320, 360 y 412 px en los tres temas.
//   node tools/test-dele-layout.js                    → código de salida 1 si algo falla
//   SKIP_CONTRAST=1 node tools/test-dele-layout.js    → omite la medida de contraste (queda para verificación manual)
//   SHOTS_DIR=/ruta node tools/test-dele-layout.js    → además guarda capturas
//
// Qué verifica (servidor estático local + Chromium con Playwright, sin red real), para cada ancho × tema (claro, oscuro, papel):
//   · fila superior con DOS botones (🧒 Niños · 🎓 DELE): misma línea, mismo ancho, ≥ 44 px, DELE activo al abrir, con sus conteos
//   · DELE: SIN sub-filtro de pista y SIN chips de nivel; un único <select> de nivel (Todos + A1…C2) con el conteo de cada uno
//   · la lista une Escolares y Argentina, ordenada por nivel y, dentro de cada nivel, por variante (España antes que Argentina)
//   · cada tarjeta: pastilla de nivel «DELE A1» SIN bandera y UNA pastilla de país con la bandera de la tabla variante→bandera
//   · todas las lecciones tienen un `variant` presente en la tabla única (lessons-dele.js · VARIANTES)
//   · DeleLessons.showTrack: 'Escolares', 'Argentina' y 'all' abren DELE; 'Niños' abre Niños
//   · Niños sin cambios: lista directa, sin menú ni chips de nivel, sub-filtro de franja 🌱 / 🌿 con conteos
//   · sin desborde horizontal ni texto cortado; la primera tarjeta queda a la vista sin bajar una pantalla entera
//   · contraste ≥ 4,5:1 medido sobre píxeles reales (360 px, tres temas) — SKIP_CONTRAST=1 lo omite
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
const FLAG = /[\u{1F1E6}-\u{1F1FF}]/u;

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
    const chips = (sel) => [...document.querySelectorAll(sel)].filter(vis).map(e => ({ txt: e.textContent.trim(), n: (e.querySelector('.dele-n') ? +e.querySelector('.dele-n').textContent : null), label: [...e.childNodes].filter(x => x.nodeType === 3).map(x => x.textContent).join('').trim(), ...r(e), clip: e.scrollWidth > e.clientWidth + 1, active: e.classList.contains('active') }));
    const sel = document.getElementById('dele-level-sel');
    const cards = [...document.querySelectorAll('#dele-list .dele-card')].map(c => {
      const lv = c.querySelector('.lc-hsk'), vr = [...c.querySelectorAll('.lc-var')], cr = c.getBoundingClientRect();
      return { ...r(c), lvl: lv ? lv.textContent : null, vars: vr.map(v => ({ txt: v.textContent, variant: v.dataset.variant, cls: v.className, right: v.getBoundingClientRect().right })), oldTrack: !!c.querySelector('.lc-track'),
        clip: [...c.querySelectorAll('.lc-top > *, .lc-titles > *, .lc-actions > *')].some(e => e.getBoundingClientRect().right > cr.right + 0.5 || (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== 'inline')) };
    });
    return { vw: innerWidth, vh: innerHeight, W, docOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      seg: chips('#dele-seg .lv-chip'), sub: chips('#dele-sub .lv-chip'), levelChips: chips('#dele-levels .lv-chip'), anyTrackChip: document.querySelectorAll('.lv-chip[data-track]:not([data-seg])').length,
      selVisible: !!(sel && vis(sel)), selRect: sel && vis(sel) ? r(sel) : null, selClip: sel ? sel.scrollWidth > sel.clientWidth + 1 : false,
      selOpts: sel ? [...sel.options].map(o => ({ v: o.value, t: o.textContent, off: o.disabled, sel: o.selected })) : [], selValue: sel ? sel.value : null,
      selFit: (() => { if (!sel || !vis(sel)) return null; const cs = getComputedStyle(sel), c2 = document.createElement('canvas').getContext('2d'); c2.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
        const avail = sel.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); return { avail: Math.round(avail), widest: Math.round(Math.max(...[...sel.options].map(o => c2.measureText(o.textContent).width))) }; })(),
      tagSame: (() => { const t = document.querySelector('.lvsel-dele .lvsel-tag'); return !!sel && !!t && getComputedStyle(t).color === getComputedStyle(sel).color; })(),
      selInside: !!sel && !!sel.closest('.lvsel-dele'), levelboxHidden: document.getElementById('dele-levelbox').hidden || !vis(document.getElementById('dele-levelbox')),
      cards, nino: [...document.querySelectorAll('#dele-list .nino-card, #dele-list .nino-extra')].map(c => r(c)),
      overflowing: [...wrap.querySelectorAll('*')].filter(e => vis(e) && e.getBoundingClientRect().right > innerWidth + 0.5).map(e => e.className || e.tagName).slice(0, 5) };
  });
  const data = (p) => p.evaluate(() => {
    const dele = DeleDebug.data.filter(d => d.track !== 'Niños'), lv = {};
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(v => { lv[v] = dele.filter(d => d.dele === v).length; });
    const kids = { total: 0, bands: {} }; NINOS_LESSONS.forEach(l => { kids.total++; kids.bands[l.band] = (kids.bands[l.band] || 0) + 1; });
    return { total: dele.length, lv, kids, variantes: DeleDebug.variantes, rows: dele.map(d => ({ id: d.id, dele: d.dele, variant: d.variant })) };
  });
  const LV = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  for (const theme of ['light', 'dark', 'paper']) {
    for (const w of [320, 360, 412]) {
      const tag = w + 'px/' + theme + ' ';
      const { ctx, p, errs } = await open(w, theme);
      const D = await data(p); const VK = Object.keys(D.variantes);
      let m = await measure(p);
      const inside = (c) => c.l >= m.W.l - 0.5 && c.r <= m.W.r + 0.5;

      // ── datos: la tabla única variante → bandera ──
      ok(D.rows.every(r => r.variant && D.variantes[r.variant] && FLAG.test(D.variantes[r.variant].flag) && D.variantes[r.variant].nombre), tag + 'todas las lecciones tienen `variant` y está en la tabla variante→bandera');
      ok(D.rows.length === D.total && D.rows.filter(r => r.variant === 'es-ES').length === 6 && D.rows.filter(r => r.variant === 'es-AR').length === 18, tag + 'variantes: 6 de España y 18 de Argentina');

      // ── botones superiores ──
      ok(m.seg.length === 2 && Math.abs(m.seg[0].t - m.seg[1].t) < 1 && Math.abs(m.seg[0].w - m.seg[1].w) <= 2, tag + 'dos botones arriba, en la misma línea y del mismo ancho ' + JSON.stringify(m.seg.map(x => [x.txt, Math.round(x.t), Math.round(x.w)])));
      ok(m.seg.every(x => x.h >= 43.5 && inside(x) && !x.clip), tag + 'botones superiores ≥ 44 px, dentro y sin texto cortado');
      ok(m.seg[0].label === '🧒 Niños' && m.seg[0].n === D.kids.total && m.seg[1].label === '🎓 DELE' && m.seg[1].n === D.total && m.seg[1].active && !m.seg[0].active && !FLAG.test(m.seg[1].label), tag + 'abre en DELE (activo, sin bandera) y los botones muestran sus conteos ' + m.seg.map(x => x.txt).join(' | '));

      // ── DELE: sin sub-filtro ni chips; un solo menú ──
      ok(m.sub.length === 0 && m.levelChips.length === 0 && m.anyTrackChip === 0, tag + 'DELE: sin sub-filtro de pista ni chips de nivel');
      ok(m.selVisible && m.selInside && m.selRect.h >= 43.5 && inside(m.selRect) && !m.selClip, tag + 'DELE: un <select> de nivel (.lvsel-dele), ≥ 44 px, dentro y sin texto cortado');
      ok(m.selFit && m.selFit.widest <= m.selFit.avail, tag + 'ninguna opción del menú queda cortada (la más larga ' + JSON.stringify(m.selFit) + ')');
      ok(m.tagSame, tag + 'la etiqueta «NIVEL DELE» lleva el mismo color que el texto del menú (convención .lvsel)');
      ok(m.selOpts.map(o => o.v).join() === 'all,' + LV.join(), tag + 'opciones: Todos + A1…C2 ' + m.selOpts.map(o => o.v).join());
      ok(m.selOpts[0].t === 'Todos los niveles (' + D.total + ')' && LV.every((v, i) => m.selOpts[i + 1].t === v + ' (' + D.lv[v] + ')') && m.selOpts.every(o => !o.off), tag + 'cada opción muestra su conteo ' + m.selOpts.map(o => o.t).join(' | '));
      ok(m.selValue === 'all' && m.cards.length === D.total, tag + 'DELE: «Todos los niveles» y ' + D.total + ' tarjetas (Escolares y Argentina juntas)');
      ok(!m.docOverflow && m.overflowing.length === 0, tag + 'sin desborde horizontal ' + m.overflowing.join(','));
      ok(m.cards[0] && m.cards[0].t < m.vh - 60, tag + 'la primera tarjeta queda a la vista sin bajar una pantalla (top ' + Math.round(m.cards[0].t) + ' de ' + m.vh + ')');

      // ── tarjetas: nivel sin bandera, un solo país con bandera, orden ──
      ok(m.cards.every(c => /^DELE [ABC][12]$/.test(c.lvl) && !FLAG.test(c.lvl)), tag + 'pastilla de nivel «DELE A1» sin bandera');
      ok(m.cards.every(c => c.vars.length === 1 && !c.oldTrack && c.vars[0].txt === D.variantes[c.vars[0].variant].flag + ' ' + D.variantes[c.vars[0].variant].nombre && c.vars[0].right <= c.r + 0.5), tag + 'una sola pastilla de país, con la bandera y el nombre de la tabla');
      const rowOf = (c, i) => D.rows.filter(r => r.dele === c.lvl.replace('DELE ', ''))[0];
      let sorted = true;
      for (let i = 1; i < m.cards.length; i++) { const a = m.cards[i - 1], c = m.cards[i], la = LV.indexOf(a.lvl.replace('DELE ', '')), lc = LV.indexOf(c.lvl.replace('DELE ', '')); if (lc < la || (lc === la && VK.indexOf(c.vars[0].variant) < VK.indexOf(a.vars[0].variant))) sorted = false; }
      ok(sorted, tag + 'orden por nivel y, dentro de cada nivel, por variante (' + VK.join(' → ') + ')');
      ok(m.cards.every(c => !c.clip), tag + 'nada se corta dentro de las tarjetas');
      if (OUT && theme === 'light') await p.screenshot({ path: path.join(OUT, 'dele-' + w + '.png') });

      // ── el menú filtra y conserva el foco ──
      await p.focus('#dele-level-sel'); await p.evaluate(() => { window.__sel = document.getElementById('dele-level-sel'); });
      await p.selectOption('#dele-level-sel', 'A2'); await p.waitForTimeout(250); m = await measure(p);
      const focus = await p.evaluate(() => (document.activeElement && document.activeElement.id) + '|' + (document.getElementById('dele-level-sel') === window.__sel ? 'mismo-elemento' : 'se-redibujo'));
      ok(m.cards.length === D.lv.A2 && m.cards.every(c => c.lvl === 'DELE A2') && m.selValue === 'A2', tag + 'nivel A2: ' + D.lv.A2 + ' tarjetas, todas «DELE A2»');
      ok(focus === 'dele-level-sel|mismo-elemento', tag + 'al elegir, el menú no se vuelve a dibujar y conserva el foco (' + focus + ')');
      await p.selectOption('#dele-level-sel', 'C2'); await p.waitForTimeout(200); m = await measure(p);
      ok(m.cards.length === D.lv.C2 && m.cards.every(c => c.vars.length === 1), tag + 'nivel C2: ' + D.lv.C2 + ' tarjeta');
      await p.selectOption('#dele-level-sel', 'all'); await p.waitForTimeout(200);

      // ── showTrack ──
      for (const tr of ['Escolares', 'Argentina', 'all']) {
        await p.evaluate(t => DeleLessons.showTrack(t), tr); await p.waitForTimeout(250); m = await measure(p);
        ok(m.seg[1].active && m.selVisible && m.selValue === 'all' && m.cards.length === D.total && m.sub.length === 0, tag + "showTrack('" + tr + "') abre DELE con todos los niveles (" + m.cards.length + ' tarjetas)');
      }

      // ── Niños: sin cambios ──
      await p.click('#dele-seg .lv-chip[data-seg="ninos"]'); await p.waitForTimeout(350); m = await measure(p);
      ok(m.seg[0].active && !m.seg[1].active && !m.selVisible && m.levelChips.length === 0 && m.levelboxHidden, tag + 'Niños: sin menú ni chips de nivel');
      ok(m.sub.map(x => x.label).join('|') === 'Todas|🌱 6–7|🌿 8–10' && m.sub[1].n === D.kids.bands.A && m.sub[2].n === D.kids.bands.B && m.sub.every(c => c.h >= 43.5 && inside(c) && !c.clip), tag + 'Niños: sub-filtro de franja con conteos ' + m.sub.map(x => x.txt).join(' | '));
      ok(m.nino.length === D.kids.total + 1 && m.cards.length === 0 && m.nino[0].t < m.vh - 60 && !m.docOverflow && m.overflowing.length === 0, tag + 'Niños: lista directa (' + D.kids.total + ' lecciones + sonidos), primera tarjeta a la vista y sin desborde');
      if (OUT && theme === 'light') await p.screenshot({ path: path.join(OUT, 'ninos-' + w + '.png') });
      await p.click('#dele-sub .lv-chip[data-band="B"]'); await p.waitForTimeout(250); m = await measure(p);
      ok(m.nino.length === D.kids.bands.B, tag + 'franja 🌿: ' + D.kids.bands.B + ' lecciones (sin la tarjeta de sonidos)');
      await p.evaluate(() => DeleLessons.showTrack('Niños')); await p.waitForTimeout(250); m = await measure(p);
      ok(m.seg[0].active && m.nino.length === D.kids.total + 1, tag + "showTrack('Niños') abre Niños");
      await p.click('#dele-seg .lv-chip[data-seg="dele"]'); await p.waitForTimeout(300); m = await measure(p);
      ok(m.seg[1].active && m.selVisible && m.cards.length === D.total && m.sub.length === 0, tag + 'volver a DELE: menú y lista completos');
      ok(errs.length === 0, tag + 'sin errores JS: ' + errs.join(' | '));
      await ctx.close();
    }
  }

  // ── contraste (verificación opcional; SKIP_CONTRAST=1 la omite) ──
  if (!SKIP_CONTRAST) {
    const crs = [];
    for (const th of ['light', 'dark', 'paper']) {
      const { ctx, p } = await open(360, th);
      const grab = async (label, sel) => { const e = await p.$(sel); if (e) crs.push([th + ' ' + label, await contrast(p, e)]); else crs.push([th + ' ' + label + ' (no encontrado)', 0]); };
      await grab('botón Niños (inactivo)', '#dele-seg .lv-chip[data-seg="ninos"]');
      await grab('menú de nivel', '.lvsel-dele select');
      await grab('pastilla de nivel', '.dele-card .lc-hsk');
      await grab('pastilla España', '.dele-card .lc-var-es');
      await grab('pastilla Argentina', '.dele-card .lc-var-ar');
      // botón activo = texto blanco sobre un degradado: se calcula con los colores extremos del degradado (el recorte de píxeles lo subestima)
      const g = await p.evaluate(() => { const e = document.querySelector('#dele-seg .lv-chip.active'); const cols = (getComputedStyle(e).backgroundImage.match(/rgb\([^)]*\)/g) || []).map(c => c.match(/\d+/g).map(Number));
        const L = (r, g2, b2) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g2) + 0.0722 * f(b2); };
        return { cols: cols.length, min: Math.min(...cols.map(c => Math.round(1.05 / (L(...c) + 0.05) * 100) / 100)) }; });
      crs.push([th + ' botón DELE activo (blanco sobre degradado, ' + g.cols + ' colores)', g.cols ? g.min : 0]);
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
