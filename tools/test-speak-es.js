#!/usr/bin/env node
// tools/test-speak-es.js — prueba de regresión del audio de las lecciones (speakEs en lessons-dele.js).
//   node tools/test-speak-es.js          → código de salida 1 si algo falla
//
// Por qué existe: speakEs usaba `data` (la respuesta del servidor de voz) fuera del bloque `try` donde se declaraba
// y lanzaba «ReferenceError: data is not defined» cada vez que el servidor respondía bien: el audio de Niños,
// Escolares y Argentina quedaba mudo. `node --check` no lo ve (solo mira la sintaxis) y las pruebas anteriores
// siempre simulaban la voz o hacían fallar la red, así que nunca pasaban por la rama «hay audio».
//
// Qué hace: levanta un servidor estático local, abre la app en Chromium (Playwright), reemplaza fetchTTS por una
// respuesta simulada {audio, mime} y Audio por una clase falsa que cuenta los play(); sin red real.
//   1) 200 con speed del servidor  → se crea el Audio (blob:), suena una vez, playbackRate ≈ 1, botón ⏸, sin errores
//   2) 200 sin speed (servidor viejo) → playbackRate = velocidad elegida (⚡)
//   3) 200 sin mime               → usa audio/wav
//   4) fetchTTS rechazado          → cae a la voz del sistema (speechSynthesis), sin Audio y sin errores
//   5) applyTtsSpeed tolera data ausente/rara: null, undefined, {}, speed 0, NaN, texto  (la combinación «url cargada
//      y data ausente» no se alcanza con el código actual —url se asigna después de data—, por eso se ejercita directo)
//   6) por la interfaz: el 🔊 de una línea de Escolares, de Argentina y de Niños (y «Escuchar todo» de Niños) suena
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

// WAV mínimo válido (0,01 s de silencio) en base64
const WAV_B64 = (() => { const n = 80, b = Buffer.alloc(44 + n * 2); b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40); return b.toString('base64'); })();

let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
  const launch = { headless: true };
  for (const exe of ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROMIUM]) if (exe && fs.existsSync(exe)) { launch.executablePath = exe; break; }
  const b = await chromium.launch(launch);
  const ctx = await b.newContext({ viewport: { width: 390, height: 780 }, serviceWorkers: 'block' });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.removeItem('ac_speed'); } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
  await p.evaluate(() => setMode('cn-es')); await p.waitForTimeout(800);

  // simulacros: fetchTTS (respuesta del servidor), Audio (cuenta los play) y speechSynthesis.speak
  await p.evaluate((wav) => {
    window.__errs = []; window.addEventListener('unhandledrejection', e => window.__errs.push('unhandledrejection: ' + (e.reason && e.reason.message || e.reason)));
    window.__tts = { calls: [], mode: 'ok' };
    window.fetchTTS = async (body) => {
      window.__tts.calls.push(body);
      const m = window.__tts.mode;
      if (m === 'reject') throw new Error('red caída (simulada)');
      const data = { audio: wav, mime: 'audio/wav' };
      if (m === 'ok') data.speed = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
      if (m === 'nomime') { delete data.mime; data.speed = (typeof playbackSpeed === 'number') ? playbackSpeed : 1; }
      return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    };
    window.__audios = [];
    window.Audio = class FakeAudio {
      constructor(src) { this.src = src || ''; this.playbackRate = 1; this.plays = 0; this.l = {}; window.__audios.push(this); }
      addEventListener(t, f) { (this.l[t] = this.l[t] || []).push(f); }
      play() { this.plays++; return Promise.resolve(); }
      pause() {}
    };
    window.__sys = []; try { speechSynthesis.speak = (u) => { window.__sys.push(u.text); }; speechSynthesis.cancel = () => {}; } catch (e) { /* sin speechSynthesis */ }
  }, WAV_B64);
  const reset = (mode) => p.evaluate((m) => { window.__tts.calls = []; window.__tts.mode = m; window.__audios.length = 0; window.__sys.length = 0; window.__errs.length = 0; DeleLessons.stop(); }, mode);
  const state = () => p.evaluate(() => ({ audios: window.__audios.map(a => ({ src: a.src.slice(0, 5), rate: a.playbackRate, plays: a.plays })), sys: window.__sys.slice(), calls: window.__tts.calls.length, errs: window.__errs.slice(), want: playbackSpeed }));
  const speak = async (text) => {
    const btn = await p.evaluateHandle(() => { const x = document.createElement('button'); x.textContent = '🔊'; document.body.appendChild(x); return x; });
    let thrown = null;
    try { await p.evaluate(([t, x]) => DeleLessons.speak(t, x), [text, btn]); } catch (e) { thrown = e.message; }
    await p.waitForTimeout(80);
    const txt = await btn.evaluate(x => x.textContent); await btn.evaluate(x => x.remove());
    return { thrown, txt };
  };

  // 1) servidor responde 200 con speed
  await reset('ok'); let r = await speak('Hola, ¿cómo estás?'); let s = await state();
  ok(!r.thrown, '1) speakEs no lanza (data accesible fuera del try): ' + r.thrown);
  ok(s.calls === 1 && s.audios.length === 1 && s.audios[0].src === 'blob:' && s.audios[0].plays === 1, '1) crea un Audio blob: y lo reproduce una vez ' + JSON.stringify(s));
  ok(s.audios.length === 1 && Math.abs(s.audios[0].rate - 1) < 0.01, '1) con speed del servidor, playbackRate ≈ 1 (' + (s.audios[0] && s.audios[0].rate) + ')');
  ok(r.txt === '⏸', '1) el botón pasa a ⏸ (' + r.txt + ')');
  ok(s.sys.length === 0 && s.errs.length === 0, '1) sin voz del sistema y sin promesas rechazadas ' + JSON.stringify(s.errs));

  // 2) servidor viejo: sin speed → playbackRate = velocidad elegida
  await reset('nospeed'); r = await speak('Buen día'); s = await state();
  ok(!r.thrown && s.audios.length === 1 && s.audios[0].plays === 1 && Math.abs(s.audios[0].rate - s.want) < 0.001, '2) sin speed: playbackRate = ' + s.want + ' → ' + JSON.stringify(s.audios));

  // 3) sin mime → audio/wav por defecto (la reproducción no se corta)
  await reset('nomime'); r = await speak('Chau'); s = await state();
  ok(!r.thrown && s.audios.length === 1 && s.audios[0].plays === 1, '3) respuesta sin mime también suena ' + JSON.stringify(s.audios));

  // 4) fetchTTS rechazado → voz del sistema
  await reset('reject'); r = await speak('Gracias'); s = await state();
  ok(!r.thrown && s.audios.length === 0 && s.sys.join() === 'Gracias' && s.errs.length === 0, '4) red caída → voz del sistema ' + JSON.stringify(s.sys));

  // 5) applyTtsSpeed tolera data ausente o rara (sin lanzar y con velocidad válida)
  const t5 = await p.evaluate(() => {
    const want = playbackSpeed, out = {};
    for (const [k, d] of [['null', null], ['undefined', undefined], ['{}', {}], ['speed 0', { speed: 0 }], ['speed NaN', { speed: NaN }], ['speed texto', { speed: 'x' }], ['sin audio', { mime: 'audio/wav' }]]) {
      const a = { playbackRate: 1 }; let err = null, ret = null;
      try { ret = applyTtsSpeed(a, d); } catch (e) { err = e.message; }
      out[k] = { err, rate: a.playbackRate, ret };
    }
    return { want, out };
  });
  Object.entries(t5.out).forEach(([k, v]) => ok(!v.err && Math.abs(v.rate - t5.want) < 0.001, '5) applyTtsSpeed(audio, ' + k + ') tolera y deja playbackRate = ' + t5.want + ' → ' + JSON.stringify(v)));

  // 6) por la interfaz: 🔊 de una línea de cada pista
  for (const track of ['Escolares', 'Argentina']) {
    await reset('ok');
    await p.evaluate(() => { showView('aprender'); document.getElementById('tab-lessons').click(); }); await p.waitForTimeout(300);
    await p.click('#dele-tracks .lv-chip[data-track="' + track + '"]'); await p.waitForTimeout(250);
    await p.click('#dele-list .lesson-card [data-act="read"]'); await p.waitForTimeout(400);
    await p.evaluate(() => document.querySelector('#dele-body .lq-line-say').click()); await p.waitForTimeout(500);
    s = await state();
    ok(s.audios.length === 1 && s.audios[0].plays === 1 && s.errs.length === 0, '6) ' + track + ': el 🔊 de la línea suena ' + JSON.stringify(s.audios));
    await p.evaluate(() => { DeleLessons.stop(); const c = document.getElementById('dele-close'); if (c) c.click(); }); await p.waitForTimeout(200);
  }
  await reset('ok');
  await p.evaluate(() => { showView('aprender'); document.getElementById('tab-lessons').click(); }); await p.waitForTimeout(300);
  await p.click('#dele-tracks .lv-chip[data-track="Niños"]'); await p.waitForTimeout(250);
  await p.click('.nino-card[data-id="ni-hola"] .nino-go[data-act="read"]'); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector('#nino-body .nino-say').click()); await p.waitForTimeout(500); s = await state();
  ok(s.audios.length === 1 && s.audios[0].plays === 1 && s.errs.length === 0, '6) Niños: el 🔊 de la línea suena ' + JSON.stringify(s.audios));
  await reset('ok'); await p.evaluate(() => document.getElementById('nino-playall').click()); await p.waitForTimeout(700); s = await state();
  ok(s.audios.length >= 1 && s.audios[0].plays === 1 && s.errs.length === 0, '6) Niños: «Escuchar todo» arranca la cola ' + JSON.stringify(s.audios));
  await p.evaluate(() => DeleLessons.stopQueue());

  ok(errs.length === 0, 'sin errores JS en la página (pageerror): ' + errs.join(' | '));
  await b.close(); server.close();
  console.log('test-speak-es: ' + n + ' comprobaciones · ' + (fails ? fails + ' FALLAN' : 'todo en regla'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); try { server.close(); } catch (x) { /* nada */ } process.exit(1); });
