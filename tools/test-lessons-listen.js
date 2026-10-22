#!/usr/bin/env node
// tools/test-lessons-listen.js — «▶️ Escuchar todo» en las lecciones de aprendo chino (lessons-listen.js), con TTS SIMULADO.
//   node tools/test-lessons-listen.js                 → código de salida 1 si algo falla
//   SHOTS_DIR=/ruta node tools/test-lessons-listen.js → además guarda capturas (320 y 360 px, tres temas)
//
// El TTS se simula reemplazando fetchTTS (sin red): cada pedido se anota (instante, línea, velocidad, voz, karaoke) y responde
// tras una latencia configurable con un WAV corto de silencio (el <audio> real se reproduce y dispara 'ended').
// Qué verifica:
//   DISPOSICIÓN (320 y 360 px × claro/papel/oscuro): botón a ancho completo arriba del texto, reposo = 1 botón; sonando/pausado = 2 botones
//     «⏸ Pausar / ▶ Seguir» y «⏹ Parar» de ≥ 48 px lado a lado, sin desborde; ausente en lecturas y en el glosario
//   REPRODUCCIÓN  latencia 500 ms: un único <audio>; precarga N+1 y N+2 (tope 2) sin pedir nada dos veces; texto = data-zh (sin who); voz/velocidad
//                 actuales; SIN karaoke=1; al terminar vuelve al reposo; 0 disparos de observadores durante la escucha
//   LATENCIA 2 s  «⏳» y espera
//   429           la línea cae a voz del sistema sin reintento y la precarga espera 5 s
//   VELOCIDAD     cambio a mitad: rige desde la línea siguiente y se descartan las precargadas
//   CORTES        ✕, Atrás (Nav), Esc, abrir Practicar, tocar el 🔊 de una línea, cambiar 简/繁: todo se corta y no se pide más
//   PAUSA / SCROLL / KARAOKE  pausar y seguir; no pelea con un scroll manual de < 3 s; usa KARA si está encendido
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
const STATS_OUT = [];

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
  const launch = { headless: true, args: ['--autoplay-policy=no-user-gesture-required'] };
  for (const exe of ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROMIUM]) if (exe && fs.existsSync(exe)) { launch.executablePath = exe; break; }
  const b = await chromium.launch(launch);
  const sleep = (p, ms) => p.waitForTimeout(ms);

  async function session(w, th, opts) {
    opts = opts || {};
    const ctx = await b.newContext({ viewport: { width: w, height: 740 }, serviceWorkers: 'block' });
    await ctx.addInitScript((a) => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1');
      localStorage.setItem('theme', a.th); localStorage.setItem('ac_speed', '1'); if (a.kara) localStorage.setItem('ac_karaoke', '1'); } }, { th, kara: !!opts.kara });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1500);
    // TTS simulado + espías
    await p.evaluate(() => {
      const mk = (sec) => { const sr = 8000, n = Math.floor(sr * sec), buf = new Uint8Array(44 + n); const dv = new DataView(buf.buffer);
        const w4 = (o, s) => { for (let i = 0; i < 4; i++) buf[o + i] = s.charCodeAt(i); };
        w4(0, 'RIFF'); dv.setUint32(4, 36 + n, true); w4(8, 'WAVE'); w4(12, 'fmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true); dv.setUint32(24, sr, true);
        dv.setUint32(28, sr, true); dv.setUint16(32, 1, true); dv.setUint16(34, 8, true); w4(36, 'data'); dv.setUint32(40, n, true); buf.fill(128, 44);
        let s = ''; for (let i = 0; i < buf.length; i++) s += String.fromCharCode(buf[i]); return btoa(s); };
      window.__T = { latency: 500, audioSec: 0.4, log: [], t0: performance.now(), on429: null, wav: {}, plays: new Set(), prepared: 0, withAudio: 0, speechCalls: [] };
      window.fetchTTS = async function (body) {
        const T = window.__T, i = T.log.length;
        T.log.push({ t: performance.now() - T.t0, text: body.text, speed: body.speed, voice: body.voice, lang: body.lang, karaoke: body.karaoke, idx: window.LQ_LISTEN ? window.LQ_LISTEN.idx : -9, state: window.LQ_LISTEN ? window.LQ_LISTEN.state : '' });
        await new Promise(r => setTimeout(r, T.latency));
        if (T.on429 && T.on429(body, i)) return { ok: false, status: 429, json: async () => ({}) };
        const key = T.audioSec; T.wav[key] = T.wav[key] || mk(key);
        return { ok: true, status: 200, json: async () => ({ audio: T.wav[key], mime: 'audio/wav', speed: body.speed }) };
      };
      const op = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () { window.__T.plays.add(this); return op.apply(this, arguments); };
      const kp = KARA.prepare, kw = KARA.withAudio;
      KARA.prepare = function () { window.__T.prepared++; return kp.apply(this, arguments); };
      KARA.withAudio = function () { window.__T.withAudio++; return kw.apply(this, arguments); };
      // voz del sistema simulada: anota y termina a los 60 ms
      window.speechSynthesis.speak = function (u) { window.__T.speechCalls.push(u.text); setTimeout(() => { try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 60); };
      window.speechSynthesis.cancel = function () { };
    });
    return { ctx, p, errs };
  }
  // abre la vista Leer de una lección de aprendo chino (salta el glosario si lo hay)
  async function openLesson(p, id) {
    await p.click('#nav-aprender'); await sleep(p, 250);
    const lvl = await p.evaluate((id) => { const l = GRADED_LESSONS.find(x => x.id === id); return l.exam ? 'tocfl:' + l.examLvl : String(l.hsk); }, id);
    await p.evaluate((lvl) => { const wrap = document.getElementById('lesson-list'); wrap.dataset.level = lvl; const s = document.getElementById(lvl.indexOf('tocfl') === 0 ? 'sel-lv-tocfl' : 'sel-lv-hsk'); if (s) { s.value = lvl; s.dispatchEvent(new Event('change')); } }, lvl);
    await sleep(p, 250);
    await p.click('.lc-read[data-id="' + id + '"]'); await sleep(p, 700);
    if (await p.$('#lq-gloss-continue')) { await p.click('#lq-gloss-continue'); await sleep(p, 300); }
  }
  const state = (p) => p.evaluate(() => ({ st: LQ_LISTEN.state, idx: LQ_LISTEN.idx, s: JSON.parse(JSON.stringify(LQ_LISTEN.stats)) }));
  const waitIdle = (p, ms) => p.waitForFunction(() => LQ_LISTEN.state === 'idle', null, { timeout: ms || 60000 });
  const lineTexts = (p) => p.evaluate(() => [...document.querySelectorAll('#lq-body .lq-lines .lq-line')].map(el => el.querySelector('.lq-line-say').dataset.zh));

  // ═════════ DISPOSICIÓN: 320 y 360 px × tres temas ═════════
  for (const w of [320, 360]) for (const th of ['light', 'paper', 'dark']) {
    const tag = w + '/' + th;
    const { ctx, p, errs } = await session(w, th);
    await p.evaluate(() => { window.__T.latency = 300; window.__T.audioSec = 1.5; });
    await openLesson(p, 'h1-primer-dia');
    const L0 = await p.evaluate(() => { const bar = document.getElementById('ll-bar'), body = document.getElementById('lq-body'), lines = body.querySelector('.lq-lines'), bt = bar.querySelectorAll('.lq-btn');
      const r = bar.getBoundingClientRect(), br = body.getBoundingClientRect(), cs = getComputedStyle(body);
      return { bar: !!bar, above: !!(bar.compareDocumentPosition(lines) & Node.DOCUMENT_POSITION_FOLLOWING), n: bt.length, txt: bt[0].textContent, h: bt[0].getBoundingClientRect().height, w: r.width, cw: br.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), full: bt[0].getBoundingClientRect().width,
        ovf: document.documentElement.scrollWidth > innerWidth + 1, kind: window.LQ_UI.state.lesson.kind || null, top: r.top }; });
    ok(L0.bar && L0.above && L0.n === 1 && L0.txt === '▶️ Escuchar todo' && L0.h >= 48 && Math.abs(L0.full - L0.cw) <= 2 && !L0.ovf && L0.kind === null, tag + ' reposo: un solo botón «▶️ Escuchar todo», ancho completo, ≥ 48 px, arriba del texto ' + JSON.stringify([L0.n, L0.h, Math.round(L0.full), Math.round(L0.cw)]));
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'reposo-' + w + '-' + th + '.png') });
    await p.click('#ll-play'); await sleep(p, 1500);
    const L1 = await p.evaluate(() => { const bt = [...document.querySelectorAll('#ll-bar .lq-btn')].map(b => ({ t: b.textContent, h: b.getBoundingClientRect().height, l: b.getBoundingClientRect().left, r: b.getBoundingClientRect().right, cut: b.scrollWidth > b.clientWidth + 1 }));
      const bar = document.getElementById('ll-bar').getBoundingClientRect();
      return { bt, inside: bt.every(x => x.l >= bar.left - 1 && x.r <= bar.right + 1), side: bt.length === 2 && bt[0].r <= bt[1].l + 1, ovf: document.documentElement.scrollWidth > innerWidth + 1, st: LQ_LISTEN.state, play: document.querySelectorAll('.lq-line.is-playing').length }; });
    ok(L1.st === 'playing' && L1.bt.length === 2 && /Pausar/.test(L1.bt[0].t) && L1.bt[1].t === '⏹ Parar' && L1.bt.every(x => x.h >= 48 && !x.cut) && L1.side && L1.inside && !L1.ovf && L1.play === 1, tag + ' sonando: «⏸ Pausar» y «⏹ Parar» lado a lado, ≥ 48 px, sin texto cortado ni desborde ' + JSON.stringify(L1.bt));
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'sonando-' + w + '-' + th + '.png') });
    await p.click('#ll-pause'); await sleep(p, 200);
    const L2 = await p.evaluate(() => ({ t: document.getElementById('ll-pause').textContent, st: LQ_LISTEN.state, ps: LQ_LISTEN.audio.paused }));
    ok(L2.st === 'paused' && L2.t === '▶ Seguir' && L2.ps, tag + ' pausado: «▶ Seguir» y el audio en pausa');
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, 'pausado-' + w + '-' + th + '.png') });
    await p.click('#ll-stop'); await sleep(p, 200);
    ok((await p.evaluate(() => ({ n: document.querySelectorAll('#ll-bar .lq-btn').length, st: LQ_LISTEN.state, pl: document.querySelectorAll('.lq-line.is-playing').length }))).n === 1, tag + ' «⏹ Parar» vuelve al reposo');
    ok(errs.length === 0, tag + ' sin errores JS: ' + errs.join(' | '));
    await ctx.close();
  }

  // ═════════ lecturas y glosario: sin botón ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await p.click('#nav-aprender'); await p.click('#tab-exams'); await sleep(p, 300);
    await p.click('[data-id="rd-h3-bici"][data-act="read"]'); await sleep(p, 700);
    const g = await p.evaluate(() => ({ bar: !!document.getElementById('ll-bar'), gloss: !!document.getElementById('lq-gloss-continue') }));
    if (g.gloss) { await p.click('#lq-gloss-continue'); await sleep(p, 300); }
    const r = await p.evaluate(() => ({ bar: !!document.getElementById('ll-bar'), kind: window.LQ_UI.state.lesson.kind }));
    ok(!g.bar && !r.bar && r.kind === 'reading', 'lecturas: la vista Leer (y el glosario) NO tienen «Escuchar todo»');
    ok(errs.length === 0, 'lecturas sin errores JS');
    await ctx.close();
  }

  // ═════════ REPRODUCCIÓN con latencia de 500 ms ═════════
  {
    const { ctx, p, errs } = await session(360, 'light', { kara: true });
    await openLesson(p, 'h1-primer-dia');
    const texts = await lineTexts(p);
    const before = await state(p);
    STATS_OUT.push('desde que se abre la vista Leer hasta antes de tocar el botón: observador de #lq-body ' + before.s.body + ' disparo(s), de #lesson-pop ' + before.s.pop + ', botón puesto ' + before.s.injected + ' vez/veces');
    const vz = await p.evaluate(() => voiceZhFor(window.LQ_UI.state.lesson));
    const lang = await p.evaluate((v) => ttsLangFor('zh', v), vz);
    await p.click('#ll-play');
    await sleep(p, 250);
    const early = await p.evaluate(() => ({ n: window.__T.log.length, texts: window.__T.log.map(x => x.text) }));
    await waitIdle(p);
    const R = await p.evaluate(() => ({ log: window.__T.log, plays: window.__T.plays.size, prepared: window.__T.prepared, withAudio: window.__T.withAudio, bar: document.querySelectorAll('#ll-bar .lq-btn').length, pl: document.querySelectorAll('.lq-line.is-playing').length }));
    const after = await state(p);
    ok(early.n === 3 && early.texts.join('|') === texts.slice(0, 3).join('|'), 'reproducción: arranca pidiendo la línea 1 y precargando N+1 y N+2 (3 pedidos) ' + JSON.stringify(early.n));
    ok(R.log.length === texts.length && R.log.map(x => x.text).join('|') === texts.join('|'), 'reproducción: un pedido por línea, en orden, sin repetir (' + R.log.length + ' de ' + texts.length + ') y con el texto del 🔊 (data-zh)');
    const look = R.log.map((x, i) => i - Math.max(0, x.idx));
    ok(Math.max.apply(null, look) <= 2, 'reproducción: la precarga nunca pasa de 2 líneas adelante ' + Math.max.apply(null, look));
    ok(R.plays === 1, 'reproducción: UN solo <audio> reutilizado (' + R.plays + ')');
    ok(R.log.every(x => x.voice === vz && x.lang === lang && x.speed === 1 && x.karaoke === undefined), 'reproducción: voz por familia (' + vz + '/' + lang + '), velocidad actual y SIN karaoke=1 (ruta GET cacheable)');
    ok(R.prepared === texts.length && R.withAudio === texts.length, 'reproducción con karaoke encendido: usa el KARA existente por línea (' + R.prepared + '/' + R.withAudio + ')');
    ok(after.st === 'idle' && R.bar === 1 && R.pl === 0, 'reproducción: al terminar vuelve al reposo, sin línea resaltada');
    ok(after.s.body === before.s.body && after.s.pop === before.s.pop, 'reproducción: 0 disparos de observadores durante la escucha completa (body +' + (after.s.body - before.s.body) + ', pop +' + (after.s.pop - before.s.pop) + ')');
    STATS_OUT.push('escucha completa (15 líneas): observador de #lq-body +' + (after.s.body - before.s.body) + ', de #lesson-pop +' + (after.s.pop - before.s.pop));
    ok(errs.length === 0, 'reproducción sin errores JS: ' + errs.join(' | '));
    await ctx.close();
  }

  // ═════════ lección con etiquetas who (TOCFL Prep): no se leen ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await openLesson(p, 'tocfl-prep-gongyuan');
    const w = await p.evaluate(() => { const l = window.LQ_UI.state.lesson; return { who: Array.from(new Set(l.lines.map(x => x.whoT || x.who).filter(Boolean))), zhT: l.lines.map(x => x.zhT), zh: l.lines.map(x => x.zh), els: document.querySelectorAll('.lq-line-who').length }; });
    await p.click('#ll-play'); await waitIdle(p);
    const asked = await p.evaluate(() => window.__T.log.map(x => x.text));
    const lq = await lineTexts(p);
    ok(w.els > 0 && w.who.length > 0 && asked.join('|') === lq.join('|') && w.who.every(x => !asked.some(t => t.indexOf(x) === 0 && t.length === x.length)), 'who: la lección tiene etiquetas (' + w.who.join(',') + ') y NO se piden al TTS (solo el texto de cada línea)');
    ok(errs.length === 0, 'who sin errores JS');
    await ctx.close();
  }

  // ═════════ latencia de 2 s: «⏳» y espera ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await p.evaluate(() => { window.__T.latency = 2000; window.__T.audioSec = 0.4; });
    await openLesson(p, 'tocfl-prep-zaocan');
    await p.click('#ll-play'); await sleep(p, 600);
    const W = await p.evaluate(() => ({ t: document.getElementById('ll-pause').textContent, st: LQ_LISTEN.state, idx: LQ_LISTEN.idx, hl: document.querySelectorAll('.lq-line.is-playing').length }));
    ok(W.st === 'playing' && /⏳/.test(W.t) && W.idx === 0, 'latencia 2 s: mientras la línea no llega se muestra «⏳» y se espera ' + JSON.stringify(W.t));
    await waitIdle(p);
    const W2 = await p.evaluate(() => ({ n: window.__T.log.length, lines: window.LQ_UI.state.lesson.lines.length }));
    ok(W2.n === W2.lines, 'latencia 2 s: termina la lección con un pedido por línea (' + W2.n + ')');
    ok(errs.length === 0, 'latencia 2 s sin errores JS');
    await ctx.close();
  }

  // ═════════ 429: voz del sistema para esa línea y la precarga espera 5 s ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await p.evaluate(() => { window.__T.latency = 150; window.__T.audioSec = 0.4; let hit = false; window.__T.on429 = (body, i) => { if (!hit && i === 3) { hit = true; window.__T.t429 = performance.now() - window.__T.t0; return true; } return false; }; });
    await openLesson(p, 'h1-primer-dia');
    const texts = await lineTexts(p);
    await p.click('#ll-play'); await waitIdle(p);
    const Q = await p.evaluate(() => ({ log: window.__T.log, t429: window.__T.t429, speech: window.__T.speechCalls }));
    const tx = texts[3];
    ok(Q.speech.length === 1 && Q.speech[0] === tx, '429: la línea que falló suena con la voz del sistema (solo esa) ' + JSON.stringify(Q.speech));
    ok(Q.log.filter(x => x.text === tx).length === 1, '429: la línea NO se reintenta (1 solo pedido)');
    const within = Q.log.filter(x => x.t >= Q.t429 && x.t < Q.t429 + 5000);
    const idxOf = (t) => texts.indexOf(t);
    ok(within.every(x => idxOf(x.text) <= x.idx), '429: en los 5 s siguientes no hay precarga (solo la línea que toca) ' + JSON.stringify(within.map(x => [idxOf(x.text), x.idx])));
    ok(Q.log.length === texts.length, '429: el resto de la lección se pidió una vez por línea (' + Q.log.length + ' de ' + texts.length + ')');
    ok(errs.length === 0, '429 sin errores JS');
    await ctx.close();
  }

  // ═════════ velocidad a mitad: rige desde la línea siguiente ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await p.evaluate(() => { window.__T.latency = 150; window.__T.audioSec = 1.2; });
    await openLesson(p, 'h1-primer-dia');
    const texts = await lineTexts(p);
    await p.click('#ll-play');
    await p.waitForFunction(() => LQ_LISTEN.idx === 2);
    await p.click('#lq-story-speed'); await sleep(p, 100); // ⚡: 1 → 0.7
    const sp = await p.evaluate(() => playbackSpeed);
    await waitIdle(p);
    const V = await p.evaluate(() => window.__T.log);
    const at = (i) => V.filter(x => x.text === texts[i]);
    ok(sp !== 1 && at(2).length === 1 && at(2)[0].speed === 1, 'velocidad: la línea que suena (3.ª) sigue a la velocidad vieja (' + at(2).map(x => x.speed) + ') y no se vuelve a pedir');
    ok(at(3).length === 2 && at(3)[0].speed === 1 && at(3)[1].speed === sp && at(4).length === 2 && at(4)[1].speed === sp, 'velocidad: las precargadas (líneas 4 y 5) se DESCARTAN y se piden a ' + sp + 'x ' + JSON.stringify([at(3).map(x => x.speed), at(4).map(x => x.speed)]));
    ok(texts.slice(5).every((t, k) => at(5 + k).length === 1 && at(5 + k)[0].speed === sp), 'velocidad: desde la línea siguiente todo sale a la velocidad nueva');
    ok(errs.length === 0, 'velocidad sin errores JS');
    await ctx.close();
  }

  // ═════════ cortes ═════════
  const cut = async (name, act, post) => {
    const { ctx, p, errs } = await session(360, 'light');
    await p.evaluate(() => { window.__T.latency = 300; window.__T.audioSec = 1.0; });
    await openLesson(p, 'h1-primer-dia');
    await p.click('#ll-play');
    await p.waitForFunction(() => LQ_LISTEN.idx === 1);
    const s0 = await state(p);
    await act(p);
    await sleep(p, 250);
    const c1 = await p.evaluate(() => window.__T.log.length);
    await sleep(p, 1800);
    const R = await p.evaluate(() => ({ st: LQ_LISTEN.state, n: window.__T.log.length, paused: !LQ_LISTEN.audio || LQ_LISTEN.audio.paused || !LQ_LISTEN.audio.getAttribute('src'), pl: document.querySelectorAll('.lq-line.is-playing').length,
      urls: document.getElementById('ll-bar') ? document.querySelectorAll('#ll-bar .lq-btn').length : 0 }));
    ok(R.st === 'idle' && R.paused && R.pl === 0, 'corte «' + name + '»: se detiene (estado idle, audio parado, sin línea resaltada) ' + JSON.stringify([R.st, R.paused, R.pl]));
    ok(R.n === c1 || (post && post.allowExtra), 'corte «' + name + '»: no se piden más audios después (' + c1 + ' → ' + R.n + ')');
    if (post && post.check) await post.check(p, R);
    const s1 = await state(p);
    STATS_OUT.push('corte «' + name + '»: observador de #lq-body +' + (s1.s.body - s0.s.body) + ', de #lesson-pop +' + (s1.s.pop - s0.s.pop) + ' · cortes: ' + JSON.stringify(s1.s.stops));
    ok(errs.length === 0, 'corte «' + name + '» sin errores JS: ' + errs.join(' | '));
    await ctx.close();
  };
  await cut('✕ cerrar', (p) => p.click('#lq-close'));
  await cut('Atrás (Nav, history.back)', (p) => p.evaluate(() => { const before = Nav.stack.join(); history.back(); return before; })); // el Atrás real: nav.js responde con un click en #lq-close
  await cut('Esc', (p) => p.keyboard.press('Escape'));
  await cut('Practicar (quiz)', (p) => p.evaluate(() => document.getElementById('lq-story-practice').scrollIntoView()).then(() => p.click('#lq-story-practice')), { check: async (p) => { ok(await p.evaluate(() => LQ_DEBUG.state.view) === 'quiz', 'corte «Practicar»: se abre el quiz'); } });
  await cut('🔊 de una línea', (p) => p.click('.lq-line[data-i="5"] .lq-line-say'), { allowExtra: true, check: async (p) => {
    const L = await p.evaluate(() => ({ asked: window.__T.log.map(x => x.text).slice(-1)[0], five: document.querySelector('.lq-line[data-i="5"] .lq-line-say').dataset.zh }));
    ok(L.asked === L.five, 'corte «🔊 de una línea»: gana lo explícito — suena esa línea (la pide el 🔊, no «Escuchar todo»)'); } });
  await cut('cambiar 简/繁', (p) => p.evaluate(() => document.dispatchEvent(new Event('ac-script-change'))));

  // ═════════ pausa y seguir ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await p.evaluate(() => { window.__T.latency = 150; window.__T.audioSec = 0.8; });
    await openLesson(p, 'h1-primer-dia');
    await p.click('#ll-play'); await p.waitForFunction(() => LQ_LISTEN.idx === 2);
    await p.click('#ll-pause'); const i0 = (await state(p)).idx; await sleep(p, 1500);
    const P1 = await state(p);
    ok(P1.st === 'paused' && P1.idx === i0, 'pausa: 1,5 s en pausa y la escucha no avanza (línea ' + i0 + ')');
    await p.click('#ll-pause'); await p.waitForFunction((i) => LQ_LISTEN.idx > i, i0, { timeout: 8000 });
    ok((await state(p)).st === 'playing', 'pausa: «▶ Seguir» reanuda y continúa con la línea siguiente');
    await p.click('#ll-stop');
    ok(errs.length === 0, 'pausa sin errores JS');
    await ctx.close();
  }

  // ═════════ scroll manual: no se pelea durante 3 s ═════════
  {
    const { ctx, p, errs } = await session(360, 'light');
    await p.evaluate(() => { window.__T.latency = 100; window.__T.audioSec = 0.7; });
    await openLesson(p, 'h1-primer-dia');
    await p.click('#ll-play'); await p.waitForFunction(() => LQ_LISTEN.idx === 3);
    await p.mouse.move(180, 400); await p.mouse.wheel(0, 120); await sleep(p, 100);
    const t0 = await p.evaluate(() => document.getElementById('lq-body').scrollTop);
    const idxA = (await state(p)).idx;
    await sleep(p, 2200);
    const t1 = await p.evaluate(() => document.getElementById('lq-body').scrollTop);
    const idxB = (await state(p)).idx;
    ok(idxB > idxA && Math.abs(t1 - t0) <= 2, 'scroll manual: durante < 3 s la lectura avanza (' + idxA + '→' + idxB + ') pero NO mueve el scroll del usuario (' + t0 + '→' + t1 + ')');
    await sleep(p, 1400);
    const idxC = (await state(p)).idx;
    await sleep(p, 900);
    const t2 = await p.evaluate(() => document.getElementById('lq-body').scrollTop);
    ok(Math.abs(t2 - t1) > 2, 'scroll manual: pasados los 3 s vuelve a seguir la línea que suena (' + t1 + '→' + t2 + ', línea ' + idxC + ')');
    await p.click('#ll-stop');
    ok(errs.length === 0, 'scroll sin errores JS');
    await ctx.close();
  }

  await b.close(); server.close();
  STATS_OUT.forEach(s => console.log('  · ' + s));
  console.log('test-lessons-listen: ' + n + ' comprobaciones · ' + (fails ? fails + ' FALLAN' : 'todo en regla'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); try { server.close(); } catch (x) { /* nada */ } process.exit(1); });
