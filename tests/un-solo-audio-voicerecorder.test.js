// tests/un-solo-audio-voicerecorder.test.js — «un solo audio a la vez» en VoiceRecorder (VoiceRecorder.js: setTarget, _togglePlay, _toggleRef,
// _onBtnClick). Filas A25 (`_player`, mi grabación) y A26 (`_refPlayer`, la referencia) de docs/matriz-de-audio.md.
//   Antes: ▶ mi grabación y ▶ referencia no se pausaban entre sí, ninguno cortaba el audio compartido (globalAudioPlayer) ni el Lector
//   (readerAudio y su voz del sistema), `setTarget` solo le quitaba el `src` a `_player` (seguía sonando) y empezar a grabar dejaba sonar todo
//   eso mientras el micrófono estaba abierto.
//   a. al arrancar ▶ mi grabación o ▶ referencia, solo suena ese: el otro player de VR, el audio compartido, el audio del Lector y su voz del sistema
//      quedan cortados (y NO se corta nada más: un 🔊 propio de otro módulo no se toca, ver docs/matriz-de-audio.md)
//   b. `setTarget` (cambiar de oración) pausa mi grabación
//   c. empezar a grabar corta los dos players de VR, el audio compartido y el Lector, con el motor local (VE) y con el camino legado (MediaRecorder)
//   e. una evaluación EN VUELO no se cancela por el corte y setTarget la descarta como antes (VE simulado, resuelto a mano)
//   d. el flujo propio NO se corta: grabar → procesar → resultado, ▶ mi grabación / ▶ referencia alternando, grabar de nuevo; reproducir no cambia
//      el estado ni el token de evaluación ni llama a VE.cancelEval / VE.abort; el segundo toque de ▶ sigue pausando
// Se MIDE en el navegador (Chromium con micrófono FALSO: --use-fake-device-for-media-stream) y con la voz del sistema simulada. El camino del motor local
// simula solo VE (consentimiento y grabación): la máquina de estados de VR es la real. NO se prueba el micrófono real, el motor Whisper ni el
// audio real de un teléfono, ni que el sonido «se cuele» acústicamente al micrófono: se mide que NADA siga sonando cuando empieza la grabación.
// No toca app.js ni el algoritmo del SRS ni checkAnswer.
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

(async () => {
  const b = await chromium.launch({ ...LAUNCH, args: [...(LAUNCH.args || []), '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'block', permissions: ['microphone'] });
  await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); }
    // voz del sistema simulada: speak/cancel registrados; cancel() desactiva lo que hablaba, como el navegador
    window.__utts = [];
    const fake = {
      speak(u) { u.__act = true; window.__utts.push(u); },
      cancel() { window.__utts.forEach((u) => { if (u.__act) { u.__act = false; try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { /* noop */ } } }); },
      pause() { }, resume() { }, getVoices() { return []; }, speaking: false, pending: false, paused: false, onvoiceschanged: null,
      addEventListener() { }, removeEventListener() { }
    };
    try { Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true }); } catch (e) { /* noop */ }
  });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1500);

  // Estado de cada fuente: mía, referencia, audio compartido, audio del Lector, voz del sistema (la del Lector)
  const est = () => p.evaluate(() => ({ mia: !VR._player.paused, ref: !VR._refPlayer.paused, global: !globalAudioPlayer.paused, lector: !readerAudio.paused, voz: window.__utts.some((u) => u.__act) }));
  const fmt = (e) => Object.keys(e).filter((k) => e[k]).join('+') || 'nada';
  // Deja VR con una grabación y una referencia, y TODO en silencio y en reposo
  const preparar = (provider) => p.evaluate(async ([wav, provider]) => {
    const blob = await (await fetch('data:audio/wav;base64,' + wav)).blob();
    [VR._player, VR._refPlayer, globalAudioPlayer, readerAudio].forEach((a) => { try { a.pause(); } catch (e) { /* noop */ } });
    window.__utts.length = 0;
    VR.state = 'idle'; VR._cancelWave && VR._cancelWave();
    VR._recUrl = URL.createObjectURL(blob); VR._player.src = VR._recUrl;
    VR._refUrl = URL.createObjectURL(blob); VR._refPlayer.src = VR._refUrl;
    window.__bUrl = URL.createObjectURL(blob);
    VR.playBtn.classList.remove('hidden'); VR.refBtn.classList.remove('hidden'); VR.rowActions.classList.remove('hidden');
    window.VE.provider = provider;
    window.__veCalls = [];
    ['cancelEval', 'abort'].forEach((k) => { if (!window.VE['__orig_' + k]) window.VE['__orig_' + k] = window.VE[k] || (() => { }); window.VE[k] = function () { window.__veCalls.push(k); return window.VE['__orig_' + k].apply(this, arguments); }; });
    return true;
  }, [WAV, provider]);
  // Arranca una fuente DIRECTAMENTE (sin pasar por los botones de VR)
  const sonar = (que) => p.evaluate(async (que) => {
    if (que === 'mia') await VR._player.play();
    else if (que === 'ref') await VR._refPlayer.play();
    else if (que === 'global') { globalAudioPlayer.src = window.__bUrl; await globalAudioPlayer.play(); }
    else if (que === 'lector') { readerAudio.src = window.__bUrl; await readerAudio.play(); }
    else if (que === 'voz') window.speechSynthesis.speak({ lang: 'zh-CN', ajena: true });
  }, que);
  const clic = async (id) => { await p.evaluate((id) => document.getElementById(id).click(), id); await p.waitForTimeout(200); };

  // ── a. reproducir corta lo demás ──
  const FUENTES = ['mia', 'ref', 'global', 'lector', 'voz'];
  for (const [boton, quien] of [['btn-play-my-rec', 'mia'], ['btn-play-ref', 'ref']]) {
    for (const otra of FUENTES.filter((f) => f !== quien)) {
      await preparar('local'); await sonar(otra);
      const antes = await est();
      await clic(boton);
      const e = await est();
      const solo = FUENTES.every((f) => (f === quien) === !!e[f === 'mia' ? 'mia' : f === 'ref' ? 'ref' : f]);
      ok(antes[otra === 'mia' ? 'mia' : otra] && solo, 'a. ▶ ' + (quien === 'mia' ? 'mi grabación' : 'la referencia') + ' con «' + otra + '» sonando: queda solo «' + quien + '» (antes: ' + fmt(antes) + ' · después: ' + fmt(e) + ')');
    }
  }
  // …y NO corta un audio propio de OTRO módulo (queda para stopAllAudio): un Audio ajeno creado por otro módulo sigue sonando
  await preparar('local');
  await p.evaluate(async () => { window.__ajeno = new Audio(window.__bUrl); await window.__ajeno.play(); });
  await clic('btn-play-my-rec');
  ok((await p.evaluate(() => !window.__ajeno.paused)) && (await est()).mia, 'a. reproducir NO corta el Audio propio de otro módulo (solo el compartido y el Lector)');
  await p.evaluate(() => window.__ajeno.pause());
  // el segundo toque sigue pausando, y reproducir solo (sin nada más) funciona
  await preparar('local'); await clic('btn-play-my-rec');
  const s1 = await est(); await clic('btn-play-my-rec'); const s2 = await est();
  ok(s1.mia && !s2.mia, 'a. ▶ mi grabación sola suena y el segundo toque la pausa (' + fmt(s1) + ' → ' + fmt(s2) + ')');
  await preparar('local'); await clic('btn-play-ref');
  const r1 = await est(); await clic('btn-play-ref'); const r2 = await est();
  ok(r1.ref && !r2.ref, 'a. ▶ referencia sola suena y el segundo toque la pausa (' + fmt(r1) + ' → ' + fmt(r2) + ')');

  // ── b. setTarget pausa mi grabación ──
  await preparar('local'); await clic('btn-play-my-rec');
  const antesB = await est();
  await p.evaluate(() => VR.setTarget('你好', 'nǐ hǎo', 's', 'zh')); await p.waitForTimeout(150);
  const despB = await est();
  ok(antesB.mia && !despB.mia, 'b. setTarget (cambiar de oración) pausa mi grabación (antes: ' + fmt(antesB) + ' · después: ' + fmt(despB) + ')');

  // ── c. empezar a grabar corta todo ──
  // motor local: se simula SOLO VE (consentimiento y grabación); la máquina de estados de VR es la real
  const simularVE = () => p.evaluate(() => {
    window.VE.ensureModelConsent = () => Promise.resolve(true);
    window.VE.startRecording = () => Promise.resolve();
    window.VE.activeRecorder = { levels: () => new Array(28).fill(0), recording: true };
  });
  for (const sitio of ['local', 'legado']) {
    await preparar(sitio === 'local' ? 'local' : 'ninguno');
    if (sitio === 'local') await simularVE();
    for (const f of FUENTES) await sonar(f);
    const antesC = await est();
    await clic('btn-record'); await p.waitForTimeout(500);
    const estado = await p.evaluate(() => VR.state);
    const e = await est();
    ok(estado === 'recording' && FUENTES.every((f) => antesC[f]) && Object.values(e).every((v) => !v), 'c. empezar a grabar (' + sitio + ') corta los dos players de VR, el audio compartido y el Lector (estado ' + estado + '; sonaba: ' + fmt(antesC) + ' · después: ' + fmt(e) + ')');
    // cada fuente por separado: ninguna se cuela
    if (sitio === 'legado') { await clic('btn-record'); await p.waitForFunction(() => VR.state === 'idle', null, { timeout: 15000 }).catch(() => { }); } // detiene la grabación real (legado) y espera a que termine
    else await p.evaluate(() => { VR._backToIdle(); VR._cancelWave && VR._cancelWave(); });
    for (const f of FUENTES) {
      await preparar(sitio === 'local' ? 'local' : 'ninguno'); if (sitio === 'local') await simularVE();
      await sonar(f); await clic('btn-record'); await p.waitForTimeout(400);
      const e2 = await est(); const st = await p.evaluate(() => VR.state);
      ok(st === 'recording' && !e2[f], 'c. empezar a grabar (' + sitio + ') corta «' + f + '» (estado ' + st + ', después: ' + fmt(e2) + ')');
      if (sitio === 'legado') { await clic('btn-record'); await p.waitForFunction(() => VR.state === 'idle', null, { timeout: 15000 }).catch(() => { }); } else await p.evaluate(() => { VR._backToIdle(); VR._cancelWave && VR._cancelWave(); });
    }
  }

  // ── d. el flujo propio no se corta (camino legado con micrófono FALSO: grabación real de MediaRecorder) ──
  await preparar('ninguno');
  await p.evaluate(() => { VR._recUrl = null; VR._refUrl = null; }); // sin grabación previa
  const tokAntes = await p.evaluate(() => VR._evalTok);
  // historial de estados de VR (el análisis del camino legado es casi instantáneo: no se llega a mirar «processing» a tiempo con un sondeo)
  await p.evaluate(() => { let v = VR.state; window.__hist = []; Object.defineProperty(VR, 'state', { get() { return v; }, set(x) { window.__hist.push(x); v = x; }, configurable: true }); });
  await clic('btn-record'); await p.waitForTimeout(1200);
  await clic('btn-record'); // detener → procesar
  await p.waitForFunction(() => VR.state === 'idle', null, { timeout: 15000 }).catch(() => { });
  const d3 = await p.evaluate(() => ({ estado: VR.state, hist: window.__hist.slice(), grab: !!VR._recUrl, resultado: !document.getElementById('record-result').classList.contains('hidden') }));
  ok(JSON.stringify(d3.hist) === JSON.stringify(['recording', 'processing', 'idle']) && d3.grab && d3.resultado, 'd. grabar → procesar → resultado (estados ' + d3.hist.join(' → ') + ' · grabación ' + d3.grab + ' · resultado visible ' + d3.resultado + ')');
  // reproducir (mía y referencia, alternando) no toca el estado, el token ni el motor
  await p.evaluate(async () => { const bl = await (await fetch(VR._recUrl)).blob(); VR._refUrl = URL.createObjectURL(bl); VR.refBtn.classList.remove('hidden'); });
  const tokA = await p.evaluate(() => VR._evalTok);
  await clic('btn-play-my-rec'); await clic('btn-play-ref'); await clic('btn-play-my-rec'); await clic('btn-play-ref');
  const tokB = await p.evaluate(() => VR._evalTok);
  const dd = await p.evaluate(() => ({ estado: VR.state, llamadas: window.__veCalls.slice() }));
  ok(dd.estado === 'idle' && tokA === tokB && dd.llamadas.length === 0, 'd. alternar ▶ mi grabación / ▶ referencia no cambia el estado (' + dd.estado + '), el token de evaluación (' + tokA + ' → ' + tokB + ') ni llama a VE.cancelEval / VE.abort (' + JSON.stringify(dd.llamadas) + ')');
  // grabar de nuevo, con la referencia sonando, completa igual
  await sonar('ref');
  await clic('btn-record'); await p.waitForTimeout(1200);
  const e1 = await p.evaluate(() => ({ estado: VR.state, ref: !VR._refPlayer.paused }));
  await clic('btn-record');
  await p.waitForFunction(() => VR.state === 'idle', null, { timeout: 15000 }).catch(() => { });
  const e3 = await p.evaluate(() => ({ estado: VR.state, grab: !!VR._recUrl, resultado: !document.getElementById('record-result').classList.contains('hidden') }));
  ok(e1.estado === 'recording' && !e1.ref && e3.estado === 'idle' && e3.grab && e3.resultado, 'd. grabar de nuevo con la referencia sonando: la corta y la grabación se completa (' + e1.estado + ' · referencia sonando ' + e1.ref + ' → ' + e3.estado + ', resultado ' + e3.resultado + ')');
  ok(tokAntes < await p.evaluate(() => VR._evalTok), 'd. el token de evaluación avanza solo con grabar/evaluar y setTarget (' + tokAntes + ' → ' + await p.evaluate(() => VR._evalTok) + ')');

  // ── e. una evaluación EN VUELO (motor local con VE simulado que se resuelve a mano) ──
  const enVuelo = async () => { // deja VR en «processing» con la evaluación pendiente
    await preparar('local'); await simularVE();
    await p.evaluate(() => {
      window.VE.stopAndEvaluate = () => new Promise((res) => { window.__resolverEval = () => res({ mode: 'manual', score: null, feedback: 'x', wordScores: [], note: '', audioBlob: new Blob([new Uint8Array(2000)], { type: 'audio/wav' }) }); });
      VR._recUrl = null; VR._refUrl = null;
    });
    await clic('btn-record'); await p.waitForTimeout(300);   // grabando
    await clic('btn-record'); await p.waitForTimeout(300);   // detener → procesando (pendiente)
    return p.evaluate(() => VR.state);
  };
  const st1 = await enVuelo();
  const tok1 = await p.evaluate(() => VR._evalTok);
  await p.evaluate(() => { if (typeof VR._cortarAudios === 'function') VR._cortarAudios(); }); // el corte (lo que hacen ▶ y 🎤) con una evaluación en vuelo (sin el corte, en el código de antes, no hace nada)
  const tok2 = await p.evaluate(() => VR._evalTok);
  const calls1 = await p.evaluate(() => window.__veCalls.slice());
  await p.evaluate(() => window.__resolverEval()); await p.waitForTimeout(300);
  const fin1 = await p.evaluate(() => ({ estado: VR.state, resultado: !document.getElementById('record-result').classList.contains('hidden'), grab: !!VR._recUrl }));
  ok(st1 === 'processing' && tok1 === tok2 && calls1.length === 0 && fin1.estado === 'idle' && fin1.resultado && fin1.grab, 'e. el corte con una evaluación en vuelo NO la cancela: el resultado llega (estado ' + st1 + ', token ' + tok1 + ' → ' + tok2 + ', VE.cancelEval/abort ' + JSON.stringify(calls1) + ' · al llegar: ' + fin1.estado + ', resultado visible ' + fin1.resultado + ', grabación ' + fin1.grab + ')');
  const st2 = await enVuelo();
  await p.evaluate(() => VR.setTarget('你好', 'nǐ hǎo', 's', 'zh')); // cambiar de oración SÍ descarta la evaluación en vuelo (como antes)
  await p.evaluate(() => window.__resolverEval()); await p.waitForTimeout(300);
  const fin2 = await p.evaluate(() => ({ estado: VR.state, resultado: !document.getElementById('record-result').classList.contains('hidden'), grab: !!VR._recUrl }));
  ok(st2 === 'processing' && fin2.estado === 'idle' && !fin2.resultado && !fin2.grab, 'e. setTarget con una evaluación en vuelo la descarta, como antes: el resultado tardío no se muestra ni deja grabación (estado ' + st2 + ' → ' + fin2.estado + ', resultado visible ' + fin2.resultado + ', grabación ' + fin2.grab + ')');

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
