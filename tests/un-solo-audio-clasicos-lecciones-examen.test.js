// tests/un-solo-audio-clasicos-lecciones-examen.test.js — «un solo audio a la vez» en Clásicos (classics-reader.js: speakCr, filas A09/A10), las lecciones
// (lessons-graduated.js: speakZh, A18/A19) y la práctica tipo examen (exam-practice.js: playSeq, A13/A14) de docs/matriz-de-audio.md.
//   Antes: los tres llamaban a stopGlobalAudio pero NO a stopReader. Con el Lector leyendo, tocar un 🔊 de Clásicos o de una lección (o ▶ de la práctica
//   tipo examen) dejaba sonar al Lector encima: su audio del servidor siempre, y su voz del sistema cuando el audio del módulo venía del servidor. Con la
//   voz de reserva (servidor caído) el Lector se cortaba solo por el speechSynthesis.cancel() global del módulo, sin pasar por stopReader.
//   a. con el Lector sonando (con su audio del servidor o con su voz del sistema), arrancar el sonido del módulo (con el servidor y con la voz de reserva)
//      deja SOLO el sonido del módulo: el audio del Lector pausado, su voz cancelada y su máquina en reposo (botón «🔊 Leer»)
//   b. NO se corta nada más: un Audio propio de OTRO módulo sigue sonando
//   c. el flujo propio no cambia: sin el Lector, el 🔊 suena igual (y NO hace un speechSynthesis.cancel() de más: la traza de «Escuchar todo» no
//      puede cambiar); en Clásicos y Lecciones el 2.º toque del mismo 🔊 pausa y el 3.º reanuda; el Lector arranca bien después
//   d. con el Lector EN PAUSA también se corta (vuelve a reposo)
//   e. sin state-machine.js (el Lector usa su respaldo) todo lo anterior sigue valiendo
// Se MIDE en el navegador (Chromium) con el servidor de TTS simulado (WAV mudo de 8 s, o 503) y la voz del sistema simulada (speak/cancel registrados;
// cancel() desactiva lo que hablaba y avisa onerror('canceled')). El Lector es el real (reader-input + toggleReaderPlay). NO se prueba el audio ni la voz
// reales de un teléfono (en un navegador real cancel() avisa de forma asíncrona). No toca app.js, el SRS ni checkAnswer.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

function wavMudo(seg) { // WAV mudo (8 kHz, 8 bits, mono) en base64
  const sr = 8000, len = sr * seg, b = Buffer.alloc(44 + len, 0x80);
  b.write('RIFF', 0); b.writeUInt32LE(36 + len, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(sr, 24); b.writeUInt32LE(sr, 28); b.writeUInt16LE(1, 32); b.writeUInt16LE(8, 34); b.write('data', 36); b.writeUInt32LE(len, 40);
  return b.toString('base64');
}
const WAV = wavMudo(8);
const TEXTO = '你好，我们一起练习汉语。今天天气很好。我想去公园玩。你呢？我们明天再见。谢谢你的帮助。这个周末你有空吗？我喜欢喝茶。';
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' };

(async () => {
  const b = await chromium.launch({ ...LAUNCH, args: [...(LAUNCH.args || []), '--autoplay-policy=no-user-gesture-required'] });

  // Una sesión limpia: TTS simulado (modo 'ok' | 'caido'), voz del sistema simulada y registro de los Audio creados
  async function sesion(opts) {
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
    if (opts && opts.sinMaquina) await ctx.route(/state-machine\.js/, (r) => r.abort()); // el Lector tiene respaldo sin la máquina de estados (reader.js: readerSM)
    await ctx.addInitScript(() => {
      if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); }
      window.__utts = []; window.__cancels = 0; window.__auds = [];
      const fake = {
        speak(u) { u.__act = true; window.__utts.push(u); },
        cancel() { window.__cancels++; window.__utts.forEach((u) => { if (u.__act) { u.__act = false; try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { /* noop */ } } }); },
        pause() { }, resume() { }, getVoices() { return []; }, speaking: false, pending: false, paused: false, addEventListener() { }, removeEventListener() { }
      };
      Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true });
      const A = window.Audio; window.Audio = class extends A { constructor(...a) { super(...a); window.__auds.push(this); } };
    });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    const S = { ctx, p, errs, modo: 'ok' };
    await p.route(/\/api\/tts/, async (route) => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      if (S.modo === 'ok') return route.fulfill({ status: 200, headers: { 'content-type': 'application/json', ...CORS, 'x-tts-audio': '1' }, body: JSON.stringify({ audio: WAV, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) });
      return route.fulfill({ status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS }, body: JSON.stringify({ error: 'x', codigo: 'sin_audio' }) });
    });
    await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
    return S;
  }
  // Cada módulo: cómo se abre y cómo se dispara su sonido
  const MODULOS = {
    clasicos: {
      nombre: 'Clásicos (speakCr)',
      abrir: async (p) => { await p.evaluate(() => CR_open('Clasicos-Lunyu')); await p.waitForTimeout(500); },
      tocar: (p) => p.evaluate(() => { const bt = [...document.querySelectorAll('.lq-line-say')].find((x) => x.offsetParent !== null); bt.click(); })
    },
    lecciones: {
      nombre: 'Lecciones (speakZh)',
      abrir: async (p) => {
        await p.click('#nav-aprender'); await p.waitForTimeout(250);
        await p.evaluate(() => { const id = 'h1-primer-dia'; const l = GRADED_LESSONS.find((x) => x.id === id); const lvl = l.exam ? 'tocfl:' + l.examLvl : String(l.hsk); const wrap = document.getElementById('lesson-list'); wrap.dataset.level = lvl; const s = document.getElementById('lesson-level-select'); if (s) { s.value = lvl; s.dispatchEvent(new Event('change', { bubbles: true })); } });
        await p.waitForTimeout(250); await p.click('.lc-read[data-id="h1-primer-dia"]'); await p.waitForTimeout(700);
        if (await p.$('#lq-gloss-continue')) { await p.click('#lq-gloss-continue'); await p.waitForTimeout(300); }
      },
      tocar: (p) => p.evaluate(() => { document.querySelector('#lq-body .lq-line-say').click(); })
    },
    examen: {
      nombre: 'Práctica tipo examen (playSeq)',
      abrir: async (p) => { await p.evaluate(() => showView('entrenar')); await p.waitForTimeout(250); await p.click('#btn-exam-practice'); await p.waitForTimeout(400); await p.click('.ex-lv[data-k="HSK1"]'); await p.waitForTimeout(600); },
      tocar: (p) => p.evaluate(() => { document.getElementById('ex-play').click(); })
    }
  };
  const estado = (p) => p.evaluate(() => ({
    lectorAudio: !readerAudio.paused,
    lectorEstado: ['idle', 'playing', 'paused'].find((s) => READER_REPRO.is(s)),
    boton: document.getElementById('btn-reader-play').textContent,
    voces: window.__utts.filter((u) => u.__act).map((u) => u.text.slice(0, 6)),
    propioAudio: window.__auds.filter((a) => !a.paused && a !== readerAudio && a !== globalAudioPlayer).length
  }));
  const fmt = (e) => 'Lector ' + (e.lectorAudio ? 'audio' : e.lectorEstado === 'playing' ? 'voz' : 'quieto') + '/' + e.lectorEstado + ' «' + e.boton + '» · voces ' + e.voces.length + ' · audio propio ' + e.propioAudio;
  // arranca el Lector real: con su audio del servidor ('audio') o con su voz del sistema ('voz', servidor caído)
  async function leer(S, como) {
    S.modo = como === 'audio' ? 'ok' : 'caido';
    await S.p.evaluate((t) => { document.getElementById('reader-input').value = t; toggleReaderPlay(); }, TEXTO);
    await S.p.waitForFunction((c) => c === 'audio' ? !readerAudio.paused : window.__utts.some((u) => u.__act), como, { timeout: 8000 });
  }

  // ── a. con el Lector sonando, el sonido del módulo corta al Lector ──
  for (const [clave, M] of Object.entries(MODULOS)) {
    for (const como of ['audio', 'voz']) {
      for (const srv of ['ok', 'caido']) {
        const S = await sesion();
        await M.abrir(S.p);
        await leer(S, como);
        const antes = await estado(S.p);
        S.modo = srv; await M.tocar(S.p); await S.p.waitForTimeout(1200);
        const e = await estado(S.p);
        const propio = srv === 'ok' ? e.propioAudio >= 1 && e.voces.length === 0 : e.voces.length >= 1 && e.propioAudio === 0; // suena el módulo, y solo él
        ok(((como === 'audio' && antes.lectorAudio) || (como === 'voz' && antes.voces.length)) && !e.lectorAudio && e.lectorEstado === 'idle' && e.boton === '🔊 Leer' && propio,
          'a. ' + M.nombre + ' con el Lector ' + (como === 'audio' ? 'con su audio' : 'con su voz') + ' y ' + (srv === 'ok' ? 'el servidor' : 'la voz de reserva') + ': queda solo el módulo (antes: ' + fmt(antes) + ' · después: ' + fmt(e) + ')');
        ok(S.errs.length === 0, 'a. sin errores JS (' + clave + '/' + como + '/' + srv + ') ' + S.errs.slice(0, 2).join(' | '));
        await S.ctx.close();
      }
    }
  }

  // ── b. no corta un Audio propio de otro módulo ──
  for (const [clave, M] of Object.entries(MODULOS)) {
    const S = await sesion();
    await M.abrir(S.p);
    await S.p.evaluate(async (wav) => { const bl = await (await fetch('data:audio/wav;base64,' + wav)).blob(); window.__ajeno = new Audio(URL.createObjectURL(bl)); await window.__ajeno.play(); }, WAV);
    S.modo = 'ok'; await M.tocar(S.p); await S.p.waitForTimeout(1000);
    const e = await estado(S.p);
    const ajeno = await S.p.evaluate(() => !window.__ajeno.paused);
    ok(ajeno && e.propioAudio >= 2, 'b. ' + M.nombre + ' NO corta el Audio propio de otro módulo (ajeno sonando ' + ajeno + ' · sonando ' + e.propioAudio + ')');
    await S.ctx.close();
  }

  // ── c. el flujo propio no cambia ──
  for (const [clave, M] of Object.entries(MODULOS)) {
    const S = await sesion();
    await M.abrir(S.p);
    S.modo = 'ok'; await M.tocar(S.p); await S.p.waitForTimeout(900);
    const e1 = await estado(S.p);
    ok(e1.propioAudio >= 1 && e1.lectorEstado === 'idle', 'c. ' + M.nombre + ' sin el Lector: el 🔊 suena igual (' + fmt(e1) + ')');
    // con el Lector en reposo NO se agrega ningún speechSynthesis.cancel() global (la traza de «Escuchar todo» no puede cambiar): solo Clásicos y Lecciones,
    // porque playSeq ya hace su propio cancel() al empezar
    if (clave !== 'examen') {
      const S2 = await sesion(); await M.abrir(S2.p);
      const c0 = await S2.p.evaluate(() => window.__cancels); S2.modo = 'ok'; await M.tocar(S2.p); await S2.p.waitForTimeout(700);
      const c1 = await S2.p.evaluate(() => window.__cancels);
      ok(c1 === c0, 'c. ' + M.nombre + ' con el Lector en reposo no hace ningún speechSynthesis.cancel() (' + c0 + ' → ' + c1 + ')');
      await S2.ctx.close();
    }
    if (clave !== 'examen') { // 2.º toque del mismo 🔊 pausa y 3.º reanuda
      await M.tocar(S.p); await S.p.waitForTimeout(500);
      const e2 = await estado(S.p);
      await M.tocar(S.p); await S.p.waitForTimeout(700);
      const e3 = await estado(S.p);
      ok(e2.propioAudio === 0 && e3.propioAudio >= 1, 'c. ' + M.nombre + ': el 2.º toque del mismo 🔊 pausa y el 3.º reanuda (sonando: ' + e1.propioAudio + ' → ' + e2.propioAudio + ' → ' + e3.propioAudio + ')');
    }
    // el Lector arranca bien después (con su audio) y el módulo no se lo impide
    await leer(S, 'audio');
    const e4 = await estado(S.p);
    ok(e4.lectorAudio && e4.lectorEstado === 'playing', 'c. ' + M.nombre + ': el Lector arranca bien después (' + fmt(e4) + ')');
    ok(S.errs.length === 0, 'c. sin errores JS (' + clave + ') ' + S.errs.slice(0, 2).join(' | '));
    await S.ctx.close();
  }

  // ── d. con el Lector EN PAUSA también se corta (no solo «sonando»): vuelve a reposo y su botón a «🔊 Leer» ──
  for (const [clave, M] of Object.entries(MODULOS)) {
    const S = await sesion();
    await M.abrir(S.p);
    await leer(S, 'audio');
    await S.p.evaluate(() => document.getElementById('btn-reader-play').click()); await S.p.waitForTimeout(300); // ⏸ Pausar
    const antes = await estado(S.p);
    S.modo = 'ok'; await M.tocar(S.p); await S.p.waitForTimeout(1000);
    const e = await estado(S.p);
    ok(antes.lectorEstado === 'paused' && e.lectorEstado === 'idle' && e.boton === '🔊 Leer' && !e.lectorAudio && e.propioAudio >= 1,
      'd. ' + M.nombre + ' con el Lector EN PAUSA lo corta (antes: ' + fmt(antes) + ' · después: ' + fmt(e) + ')');
    await S.ctx.close();
  }

  // ── e. sin state-machine.js (el Lector usa su respaldo sin validar) la condición sigue valiendo: corta con el Lector activo y no hace cancel() de más en reposo ──
  for (const [clave, M] of Object.entries(MODULOS)) {
    const S = await sesion({ sinMaquina: true });
    const sinM = await S.p.evaluate(() => typeof window.acMachine !== 'function');
    await M.abrir(S.p);
    await leer(S, 'audio');
    S.modo = 'ok'; await M.tocar(S.p); await S.p.waitForTimeout(1000);
    const e = await estado(S.p);
    ok(sinM && !e.lectorAudio && e.lectorEstado === 'idle' && e.boton === '🔊 Leer' && e.propioAudio >= 1, 'e. ' + M.nombre + ' SIN state-machine.js corta al Lector activo (sin máquina ' + sinM + ' · ' + fmt(e) + ')');
    await S.ctx.close();
  }
  {
    const S = await sesion({ sinMaquina: true });
    await MODULOS.clasicos.abrir(S.p);
    const c0 = await S.p.evaluate(() => window.__cancels); S.modo = 'ok'; await MODULOS.clasicos.tocar(S.p); await S.p.waitForTimeout(700);
    const c1 = await S.p.evaluate(() => window.__cancels);
    ok(c1 === c0, 'e. Clásicos SIN state-machine.js con el Lector en reposo no hace ningún speechSynthesis.cancel() (' + c0 + ' → ' + c1 + ')');
    await S.ctx.close();
  }

  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
