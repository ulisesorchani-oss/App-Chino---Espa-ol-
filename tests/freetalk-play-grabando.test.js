// tests/freetalk-play-grabando.test.js — ▶ de una burbuja de «Pronunciación libre» (free-talk.js, fila A15 de docs/matriz-de-audio.md) MIENTRAS SE GRABA.
//   Antes: con el micrófono abierto (estado 'recording') un toque en ▶ de una burbuja vieja arrancaba la reproducción (y cortaba el audio compartido y el
//   Lector): el sonido se colaba a la grabación. Empezar a grabar ya pausaba la burbuja (bloque 3), pero nada impedía volver a tocar ▶ después.
//   Ahora (decisión del usuario, opción 1): mientras el estado es 'recording' el ▶ se IGNORA (sin efectos: no arranca la burbuja ni corta nada) y los
//   botones quedan con aria-disabled="true", sin cambiar el icono. En 'asking' (permiso del modelo) y en 'processing' (transcribiendo) el ▶ sigue andando.
//   g1. grabando: ▶ no arranca la burbuja; los ▶ llevan aria-disabled="true" y siguen mostrando ▶️
//   g2. el toque ignorado no tiene efectos: un audio compartido o una voz del sistema que sonaba NO se corta
//   g3. 'processing' (transcribiendo): ▶ anda y los botones ya no llevan aria-disabled; al terminar, la burbuja nueva se puede escuchar
//   g4. 'asking' (permiso del modelo): ▶ anda; al aceptar y empezar a grabar, la burbuja se pausa y ▶ vuelve a ignorarse. DEFENSIVO: por la interfaz casi no
//       se llega (VE.ensureModelConsent pregunta solo con el modelo sin bajar o con la descarga cortada, y las burbujas solo existen tras transcribir);
//       se fija para que un cambio futuro del estado no lo rompa por accidente
//   g5. cerrar el popup grabando y reabrir (las burbujas se borran): la burbuja nueva se escucha y su ▶ no queda con aria-disabled
//   g6. el flujo propio no cambia: sin grabar, ▶ suena y corta lo ajeno (bloque 3)
// Se MIDE en el navegador (Chromium con micrófono FALSO: --use-fake-device-for-media-stream) con la voz del sistema simulada y el motor de voz simulado
// SOLO donde hace falta (VE.ensureModelConsent / VE.transcribeFree, a veces con promesa pendiente para sostener 'asking' / 'processing'); la máquina de
// estados y las burbujas de free-talk.js son las reales. NO se prueba el micrófono real, el motor Whisper ni el audio de un teléfono, ni que el sonido
// «se cuele» acústicamente: se mide que ▶ no arranque nada mientras se graba. No toca app.js, el SRS ni checkAnswer.
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
    window.__utts = []; window.__cancels = 0;
    const fake = {
      speak(u) { u.__act = true; window.__utts.push(u); },
      cancel() { window.__cancels++; window.__utts.forEach((u) => { if (u.__act) { u.__act = false; try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { /* noop */ } } }); },
      pause() { }, resume() { }, getVoices() { return []; }, speaking: false, pending: false, paused: false, onvoiceschanged: null,
      addEventListener() { }, removeEventListener() { }
    };
    try { Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true }); } catch (e) { /* noop */ }
    window.__auds = [];
    // las burbujas son blobs de la grabación falsa (~1 s): se reemplazan por un WAV mudo de 8 s para que SUENEN el tiempo de la prueba
    window.__wavBlob = null;
    const cou = URL.createObjectURL.bind(URL);
    URL.createObjectURL = function (o) { return (window.__wavBlob && o && o.type && /^audio\//.test(o.type) && o !== window.__wavBlob) ? cou(window.__wavBlob) : cou(o); };
    const A = window.Audio;
    window.Audio = class extends A { constructor(...a) { super(...a); window.__auds.push(this); } };
  });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1500);

  const clic = async (sel) => { await p.evaluate((s) => document.querySelector(s).click(), sel); await p.waitForTimeout(150); };
  // motor de voz: inmediato; o con promesa pendiente (window.__soltarConsent / window.__soltarTrans) para sostener 'asking' / 'processing'
  const motor = (consent, trans) => p.evaluate(([c, t]) => {
    window.VE.ensureModelConsent = c === 'pend' ? () => new Promise((r) => { window.__soltarConsent = () => r(true); }) : () => Promise.resolve(true);
    window.VE.transcribeFree = t === 'pend' ? () => new Promise((r) => { window.__soltarTrans = () => r({ text: '你好', confidence: 0.9 }); }) : () => Promise.resolve({ text: '你好', confidence: 0.9 });
  }, [consent, trans]);
  await p.evaluate(async (wav) => { window.__wavBlob = await (await fetch('data:audio/wav;base64,' + wav)).blob(); }, WAV);
  const silencio = () => p.evaluate(() => {
    [globalAudioPlayer, readerAudio, ...window.__auds].forEach((a) => { try { a.pause(); } catch (e) { /* noop */ } });
    window.__utts.length = 0; window.__cancels = 0;
  });
  const abrirTalk = async () => { await p.evaluate(() => window.openFreeTalk()); await p.waitForSelector('#tk-record', { timeout: 3000 }); };
  const grabando = () => p.evaluate(() => document.getElementById('tk-record').classList.contains('is-recording'));
  const nBurbujas = () => p.evaluate(() => document.querySelectorAll('#tk-chat .tk-bubble').length);
  const empezarGrabar = async () => { await clic('#tk-record'); await p.waitForFunction(() => document.getElementById('tk-record').classList.contains('is-recording'), null, { timeout: 8000 }); await p.waitForTimeout(400); };
  const grabarBurbuja = async () => {
    const antes = await nBurbujas();
    await empezarGrabar(); await p.waitForTimeout(700); await clic('#tk-record');
    await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length === a + 1, antes, { timeout: 15000 });
  };
  const bsuena = () => p.evaluate(() => !!window.__bp && !window.__bp.paused);
  const est = () => p.evaluate(() => ({ burbuja: !!window.__bp && !window.__bp.paused, global: !globalAudioPlayer.paused, voz: window.__utts.some((u) => u.__act) }));
  const fmt = (e) => Object.keys(e).filter((k) => e[k]).join('+') || 'nada';
  const tocar = async (i) => {
    await p.evaluate(() => { window.__n0 = window.__auds.length; });
    await clic('#tk-chat .tk-play[data-i="' + (i || 0) + '"]');
    await p.evaluate(() => { if (!window.__bp && window.__auds.length > window.__n0) window.__bp = window.__auds[window.__n0]; });
  };
  const sonar = (que) => p.evaluate(async (que) => {
    if (que === 'global') { globalAudioPlayer.src = URL.createObjectURL(window.__wavBlob); await globalAudioPlayer.play(); }
    else if (que === 'voz') window.speechSynthesis.speak({ lang: 'zh-CN', ajena: true });
  }, que);
  const botones = () => p.evaluate(() => [...document.querySelectorAll('#tk-chat .tk-play')].map((x) => ({ ad: x.getAttribute('aria-disabled'), t: x.textContent })));
  const audsNuevos = () => p.evaluate(() => window.__auds.length);

  // preparación: una burbuja vieja y su reproductor creado (el ▶ la hace sonar), y después pausada
  await silencio(); await motor('ya', 'ya');
  await abrirTalk(); await grabarBurbuja();
  await tocar(0);
  ok(await bsuena(), 'preparación: con una burbuja vieja, ▶ crea el reproductor y suena');
  await silencio();

  // g1. grabando: ▶ se ignora
  await empezarGrabar();
  ok(await grabando(), 'g1. preparación: el micrófono está abierto (estado recording)');
  const a0 = await audsNuevos();
  await tocar(0); await tocar(0);
  ok(!(await bsuena()), 'g1. grabando, ▶ NO arranca la burbuja (dos toques)');
  ok((await audsNuevos()) === a0, 'g1. grabando, ▶ no crea ningún Audio nuevo');
  const bg1 = await botones();
  ok(bg1.length === 1 && bg1.every((x) => x.ad === 'true'), 'g1. grabando, el ▶ lleva aria-disabled="true" (' + JSON.stringify(bg1) + ')');
  ok(bg1.every((x) => /▶/.test(x.t) && !/⏸|⏳/.test(x.t)), 'g1. grabando, el icono no cambia (' + bg1.map((x) => x.t).join('') + ')');

  // g2. el toque ignorado no tiene efectos: nada de lo que sonaba se corta
  await sonar('global'); await sonar('voz');
  const c0 = await p.evaluate(() => window.__cancels);
  await tocar(0);
  const e2 = await est(); const c1 = await p.evaluate(() => window.__cancels);
  ok(e2.global && e2.voz && !e2.burbuja && c1 === c0, 'g2. el toque ignorado no corta el audio compartido ni la voz del sistema ni cancela nada (' + fmt(e2) + ' · cancel() ' + (c1 - c0) + ')');
  await silencio();

  // terminar la grabación → burbuja nueva (flujo propio)
  const nb = await nBurbujas();
  await clic('#tk-record');
  await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length === a + 1, nb, { timeout: 15000 });
  const bg1b = await botones();
  ok(bg1b.length === 2 && bg1b.every((x) => x.ad === null), 'g1. al terminar de grabar, los ▶ ya no llevan aria-disabled (' + JSON.stringify(bg1b) + ')');

  // g3. 'processing': ▶ anda
  await motor('ya', 'pend');
  await empezarGrabar(); await p.waitForTimeout(500); await clic('#tk-record');
  await p.waitForFunction(() => document.getElementById('tk-record').classList.contains('is-processing'), null, { timeout: 8000 });
  const bg3 = await botones();
  ok(bg3.every((x) => x.ad === null), 'g3. transcribiendo (processing): los ▶ no llevan aria-disabled (' + JSON.stringify(bg3) + ')');
  await silencio(); await tocar(0);
  ok(await bsuena(), 'g3. transcribiendo, ▶ de una burbuja vieja suena');
  await p.evaluate(() => window.__soltarTrans());
  await p.waitForFunction(() => document.querySelectorAll('#tk-chat .tk-bubble').length === 3, null, { timeout: 15000 });
  await silencio(); await tocar(2);
  ok(await bsuena(), 'g3. al terminar de transcribir, la burbuja nueva se puede escuchar');

  // g4. 'asking': ▶ anda; al aceptar, empieza a grabar, se pausa y ▶ se ignora
  await silencio(); await motor('pend', 'ya');
  await clic('#tk-record');
  const asking = await p.evaluate(() => document.getElementById('tk-status') && !document.getElementById('tk-record').classList.contains('is-recording'));
  ok(asking, 'g4. preparación: esperando el permiso del modelo (todavía no graba)');
  await tocar(0);
  ok(await bsuena(), 'g4. esperando el permiso (asking), ▶ suena');
  await p.evaluate(() => window.__soltarConsent());
  await p.waitForFunction(() => document.getElementById('tk-record').classList.contains('is-recording'), null, { timeout: 8000 });
  await p.waitForTimeout(300);
  ok(!(await bsuena()), 'g4. al empezar a grabar la burbuja se pausa (bloque 3)');
  await tocar(0);
  ok(!(await bsuena()), 'g4. y grabando, ▶ se ignora');

  // g5. cerrar el popup grabando y reabrir (borra las burbujas y vuelve a 'idle'): una burbuja nueva se escucha y su ▶ no queda con aria-disabled
  await clic('#talk-close');
  await abrirTalk(); await motor('ya', 'ya');
  ok(!(await grabando()), 'g5. tras cerrar grabando y reabrir, no está grabando');
  await grabarBurbuja();
  const bg5 = await botones();
  ok(bg5.length === 1 && bg5.every((x) => x.ad === null), 'g5. tras cerrar grabando y reabrir, el ▶ de la burbuja nueva no lleva aria-disabled (' + JSON.stringify(bg5) + ')');
  await silencio(); await tocar(0);
  ok(await bsuena(), 'g5. tras cerrar grabando y reabrir, ▶ suena');

  // g6. sin grabar, ▶ sigue cortando lo ajeno (bloque 3)
  await silencio(); await sonar('global'); await sonar('voz');
  await tocar(0);
  const e6 = await est();
  ok(e6.burbuja && !e6.global && !e6.voz, 'g6. sin grabar, ▶ corta el audio compartido y la voz y queda solo la burbuja (' + fmt(e6) + ')');

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
