// tests/un-solo-audio-diaria-freetalk.test.js — «un solo audio a la vez» en la Diaria (daily-stories.js, fila A12 de docs/matriz-de-audio.md: la voz
// del sistema de reserva de «🔊 por renglón») y en Pronunciación libre (free-talk.js, fila A15: el reproductor de las burbujas ▶).
//   Antes: la voz del sistema de la Diaria seguía hablando después de cerrar la escena (✕, Escape, «Practicar»); ▶ de una burbuja de Pronunciación
//   libre no cortaba el audio compartido ni el Lector, cerrar el popup / «Borrar historial» / reabrirlo dejaba sonar la burbuja, y empezar a grabar
//   dejaba sonar todo eso mientras el micrófono estaba abierto.
//   D. Diaria
//     d1. cerrar la escena (✕, Escape, «Practicar», Atrás) con SU voz del sistema hablando la corta
//     d2. NUNCA un cancel() global si la voz activa es de otro módulo: sin voz propia (nunca habló, ya terminó, o ya la cortó otro) cerrar no llama a
//         speechSynthesis.cancel() y una voz ajena sigue hablando; con audio del servidor sonando pausa SU audio y tampoco cancela la voz ajena
//     d3. un 🔊 nuevo con su voz hablando deja una sola voz; el flujo propio no cambia (la voz termina sola → el botón vuelve; reserva tardía tras cerrar
//         no habla)
//   F. Pronunciación libre
//     f1. ▶ de una burbuja corta el audio compartido, el Lector (su audio y su voz del sistema): queda solo la burbuja; un Audio propio de OTRO módulo
//         no se toca (queda para stopAllAudio)
//     f2. cerrar el popup (✕, Escape, clic afuera, Atrás), «Borrar historial» y reabrirlo con la burbuja sonando la pausan
//     f3. empezar a grabar corta la burbuja, el audio compartido y el Lector (su audio y su voz); no corta un Audio propio de otro módulo
//     f4. el flujo propio no se corta: grabar → transcribir → burbuja, ▶, grabar de nuevo → segunda burbuja
// Se MIDE en el navegador (Chromium con micrófono FALSO: --use-fake-device-for-media-stream), con la voz del sistema simulada (speak/cancel registrados;
// cancel() desactiva lo que hablaba y llama a onerror('canceled'), como el navegador) y con el motor de voz simulado SOLO donde hace falta
// (VE.ensureModelConsent y VE.transcribeFree); la máquina de estados de free-talk.js es la real. NO se prueba el micrófono real, el motor Whisper ni
// el audio real de un teléfono, ni que el sonido «se cuele» acústicamente al micrófono: se mide que NADA siga sonando cuando empieza la grabación.
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
    // voz del sistema simulada: speak/cancel registrados; cancel() desactiva lo que hablaba y avisa onerror('canceled'), como el navegador
    window.__utts = []; window.__cancels = 0;
    const fake = {
      speak(u) { u.__act = true; window.__utts.push(u); },
      cancel() { window.__cancels++; window.__utts.forEach((u) => { if (u.__act) { u.__act = false; try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { /* noop */ } } }); },
      pause() { }, resume() { }, getVoices() { return []; }, speaking: false, pending: false, paused: false, onvoiceschanged: null,
      addEventListener() { }, removeEventListener() { }
    };
    try { Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true }); } catch (e) { /* noop */ }
    // registro de los Audio creados (el reproductor de las burbujas de free-talk.js se crea al primer ▶ y no se expone)
    window.__auds = [];
    // las burbujas de free-talk.js son blobs de la grabación falsa (~1 s): se reemplazan por un WAV mudo de 8 s para que SUENEN el tiempo de la prueba
    // (sin esto la burbuja terminaría sola antes de medir). El resto de la lógica de free-talk.js es la real.
    window.__wavBlob = null;
    const cou = URL.createObjectURL.bind(URL);
    URL.createObjectURL = function (o) { return (window.__wavBlob && o && o.type && /^audio\//.test(o.type) && o !== window.__wavBlob) ? cou(window.__wavBlob) : cou(o); };
    const A = window.Audio;
    window.Audio = class extends A { constructor(...a) { super(...a); window.__auds.push(this); } };
  });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1500);

  const clic = async (sel) => { await p.evaluate((s) => document.querySelector(s).click(), sel); await p.waitForTimeout(150); };
  const voces = () => p.evaluate(() => window.__utts.filter((u) => u.__act).length);
  const cancels = () => p.evaluate(() => window.__cancels);
  const silencio = () => p.evaluate(() => {
    [globalAudioPlayer, readerAudio, ...window.__auds].forEach((a) => { try { a.pause(); } catch (e) { /* noop */ } });
    window.__utts.length = 0; window.__cancels = 0;
  });

  // ══════════════ D. Diaria ══════════════
  // El servidor de TTS «caído»: fetchTTS rechaza → cae a la voz del sistema. «sirve»: responde un WAV mudo (audio del servidor).
  const modoTTS = (m) => p.evaluate(([m, wav]) => {
    if (m === 'caido') window.fetchTTS = () => Promise.reject(new Error('sin servidor'));
    else window.fetchTTS = () => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ audio: wav, mime: 'audio/wav' }) });
  }, [m, WAV]);
  const abrirDiaria = async () => {
    await p.evaluate(() => { closeDailyStory(); openDailyStory('Saludos'); });
    await p.evaluate(() => { const s = document.getElementById('btn-ds-skip'); if (s) s.click(); });
    await p.waitForSelector('#daily-story-body .ds-play', { timeout: 5000 });
  };
  const cerrarDiaria = async (como) => {
    if (como === 'x') await clic('#btn-daily-story-close');
    else if (como === 'esc') { await p.keyboard.press('Escape'); await p.waitForTimeout(150); }
    else if (como === 'atras') await atras('daily-story-pop');
    else await clic('#btn-ds-practice');
  };
  // Atrás (nav.js lo simula con el ✕ de la capa de arriba): se espera a que nav.js haya apilado la capa (history.state) en vez de dormir un tiempo fijo
  const atras = async (capa) => {
    await p.waitForFunction((c) => history.state && history.state.nav === c, capa, { timeout: 5000 });
    await p.evaluate(() => history.back());
    await p.waitForFunction((c) => document.getElementById(c).classList.contains('hidden'), capa, { timeout: 5000 });
  };
  const diariaAbierta = () => p.evaluate(() => !document.getElementById('daily-story-pop').classList.contains('hidden'));
  const tocarLinea = async (i) => { await clic('#daily-story-body .ds-play[data-ds-idx="' + (i || 0) + '"]'); };
  const hablaPropia = async () => { await p.waitForFunction(() => window.__utts.some((u) => u.__act), null, { timeout: 5000 }); };
  const textoBoton = () => p.evaluate(() => { const bt = document.querySelector('#daily-story-body .ds-play[data-ds-idx="0"]'); return bt ? bt.textContent + (bt.disabled ? '(off)' : '') : '?'; });
  const hablaAjena = () => p.evaluate(() => { const u = { lang: 'es-AR', ajena: true, __act: false }; window.speechSynthesis.speak(u); return true; });
  const hayAjena = () => p.evaluate(() => window.__utts.some((u) => u.ajena && u.__act));

  // d1. cerrar con SU voz hablando la corta (✕, Escape, «Practicar»)
  for (const como of ['x', 'esc', 'practicar', 'atras']) {
    await silencio(); await modoTTS('caido'); await abrirDiaria();
    await tocarLinea(0); await hablaPropia();
    const antes = await voces();
    await cerrarDiaria(como);
    const despues = await voces();
    const cerrada = !(await diariaAbierta());
    ok(antes === 1 && despues === 0 && cerrada, 'd1. cerrar la escena (' + como + ') con su voz del sistema hablando la corta (voces ' + antes + ' → ' + despues + ', escena cerrada ' + cerrada + ')');
  }

  // d2. NUNCA un cancel() global si la voz activa es de otro módulo
  // (a) sin voz propia: nunca habló
  await silencio(); await modoTTS('caido'); await abrirDiaria();
  await hablaAjena();
  let c0 = await cancels(); await cerrarDiaria('x');
  ok((await hayAjena()) && (await cancels()) === c0, 'd2. cerrar la escena sin voz propia NO cancela una voz ajena ni llama a speechSynthesis.cancel() (llamadas ' + c0 + ' → ' + (await cancels()) + ')');
  // (b) su voz ya terminó sola; después habla una ajena
  await silencio(); await abrirDiaria(); await tocarLinea(0); await hablaPropia();
  await p.evaluate(() => { const u = window.__utts.find((x) => x.__act); u.__act = false; u.onend && u.onend(); }); // terminó sola
  const btnVolvio = await textoBoton();
  await hablaAjena(); c0 = await cancels(); await cerrarDiaria('esc');
  ok((await hayAjena()) && (await cancels()) === c0 && btnVolvio === '🔊', 'd2. su voz terminó sola (botón ' + btnVolvio + '): cerrar después NO cancela la voz ajena (llamadas ' + c0 + ' → ' + (await cancels()) + ')');
  // (c) su voz la cortó otro módulo (cancel global desde afuera); después habla una ajena
  await silencio(); await abrirDiaria(); await tocarLinea(0); await hablaPropia();
  await p.evaluate(() => window.speechSynthesis.cancel()); // la corta otro (p. ej. el Lector)
  await hablaAjena(); c0 = await cancels(); await cerrarDiaria('x');
  ok((await hayAjena()) && (await cancels()) === c0, 'd2. su voz la cortó otro módulo: cerrar después NO cancela la voz ajena que empezó (llamadas ' + c0 + ' → ' + (await cancels()) + ')');
  // (d) audio del SERVIDOR sonando: cerrar pausa SU audio y no cancela la voz ajena
  await silencio(); await modoTTS('sirve'); await abrirDiaria(); await tocarLinea(0);
  await p.waitForFunction(() => window.__auds.some((a) => !a.paused && a !== readerAudio && a !== globalAudioPlayer), null, { timeout: 5000 });
  await hablaAjena(); c0 = await cancels(); await cerrarDiaria('x');
  const ds = await p.evaluate(() => window.__auds.filter((a) => !a.paused && a !== readerAudio && a !== globalAudioPlayer).length);
  ok(ds === 0 && (await hayAjena()) && (await cancels()) === c0, 'd2. audio del servidor sonando: cerrar pausa SU audio (' + ds + ' sonando) y no cancela la voz ajena (llamadas ' + c0 + ' → ' + (await cancels()) + ')');

  // d3. un 🔊 nuevo con su voz hablando: una sola voz; flujo propio intacto
  await silencio(); await modoTTS('caido'); await abrirDiaria();
  await tocarLinea(0); await hablaPropia();
  await tocarLinea(1); await p.waitForFunction(() => window.__utts.filter((u) => u.__act).length >= 1, null, { timeout: 5000 });
  await p.waitForTimeout(200);
  const v2 = await voces();
  ok(v2 === 1, 'd3. un 🔊 nuevo con su voz hablando deja UNA sola voz (' + v2 + ')');
  // termina sola → el botón vuelve a 🔊 y se puede cerrar sin cancelar
  const textoAntes = await p.evaluate(() => document.querySelector('#daily-story-body .ds-play[data-ds-idx="1"]').textContent);
  await p.evaluate(() => { const u = window.__utts.find((x) => x.__act); u.__act = false; u.onend && u.onend(); });
  const textoDesp = await p.evaluate(() => { const bt = document.querySelector('#daily-story-body .ds-play[data-ds-idx="1"]'); return bt.textContent + (bt.disabled ? '(off)' : ''); });
  ok(textoAntes === '⏳' && textoDesp === '🔊', 'd3. la voz termina sola: el botón vuelve (' + textoAntes + ' → ' + textoDesp + ')');
  // reserva tardía tras cerrar: el servidor «cae» DESPUÉS de cerrar → no habla
  await silencio();
  await p.evaluate(() => { window.__rechazar = null; window.fetchTTS = () => new Promise((_, rej) => { window.__rechazar = () => rej(new Error('tarde')); }); });
  await abrirDiaria(); await tocarLinea(0);
  await p.waitForFunction(() => !!window.__rechazar, null, { timeout: 5000 });
  await cerrarDiaria('x'); await p.evaluate(() => window.__rechazar()); await p.waitForTimeout(300);
  ok((await voces()) === 0, 'd3. la reserva que llega tarde, con la escena ya cerrada, no habla (' + await voces() + ' voces)');

  // ══════════════ F. Pronunciación libre ══════════════
  await modoTTS('caido');
  await p.evaluate(() => {
    window.VE.ensureModelConsent = () => Promise.resolve(true);
    window.VE.transcribeFree = (blob, lang) => Promise.resolve({ text: lang === 'zh' ? '你好' : 'hola', confidence: 0.9 });
  });
  await p.evaluate(async (wav) => { window.__wavBlob = await (await fetch('data:audio/wav;base64,' + wav)).blob(); }, WAV);
  const abrirTalk = async () => { await p.evaluate(() => window.openFreeTalk()); await p.waitForSelector('#tk-record', { timeout: 3000 }); };
  const grabandoTalk = () => p.evaluate(() => document.getElementById('tk-record').classList.contains('is-recording'));
  const talkAbierto = () => p.evaluate(() => !document.getElementById('talk-pop').classList.contains('hidden'));
  const nBurbujas = () => p.evaluate(() => document.querySelectorAll('#tk-chat .tk-bubble').length);
  // graba y transcribe una burbuja (micrófono FALSO: grabación real de MediaRecorder)
  const grabarBurbuja = async () => {
    const antes = await nBurbujas();
    await clic('#tk-record'); await p.waitForFunction(() => document.getElementById('tk-record').classList.contains('is-recording'), null, { timeout: 8000 });
    await p.waitForTimeout(1000);
    await clic('#tk-record');
    await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length === a + 1, antes, { timeout: 15000 });
  };
  // Estado de cada fuente: burbuja (el reproductor creado por free-talk.js), audio compartido, audio del Lector, voz del sistema, Audio ajeno
  const est = () => p.evaluate(() => ({
    burbuja: !!window.__bp && !window.__bp.paused, global: !globalAudioPlayer.paused, lector: !readerAudio.paused,
    voz: window.__utts.some((u) => u.__act), ajeno: !!window.__ajeno && !window.__ajeno.paused
  }));
  const fmt = (e) => Object.keys(e).filter((k) => e[k]).join('+') || 'nada';
  const FUENTES = ['burbuja', 'global', 'lector', 'voz'];
  // ▶ de la burbuja i; la primera vez identifica el reproductor (el Audio nuevo que crea free-talk.js)
  const tocarBurbuja = async (i) => {
    await p.evaluate(() => { window.__n0 = window.__auds.length; });
    await clic('#tk-chat .tk-play[data-i="' + (i || 0) + '"]');
    await p.evaluate(() => { if (!window.__bp && window.__auds.length > window.__n0) window.__bp = window.__auds[window.__n0]; });
  };
  const sonar = (que) => p.evaluate(async (que) => {
    if (que === 'burbuja') { await window.__bp.play(); }
    else if (que === 'global') { globalAudioPlayer.src = URL.createObjectURL(window.__wavBlob); await globalAudioPlayer.play(); }
    else if (que === 'lector') { readerAudio.src = URL.createObjectURL(window.__wavBlob); await readerAudio.play(); }
    else if (que === 'voz') window.speechSynthesis.speak({ lang: 'zh-CN', ajena: true });
    else if (que === 'ajeno') { window.__ajeno = new Audio(URL.createObjectURL(window.__wavBlob)); await window.__ajeno.play(); }
  }, que);

  await silencio();
  await abrirTalk(); await grabarBurbuja();
  await tocarBurbuja(0); // crea el reproductor
  const bpOK = await p.evaluate(() => !!window.__bp && !window.__bp.paused);
  ok(bpOK, 'preparación: ▶ de la burbuja crea su reproductor y suena');

  // f1. ▶ de una burbuja corta lo demás
  for (const otra of ['global', 'lector', 'voz']) {
    await silencio(); await sonar(otra);
    const antes = await est();
    await tocarBurbuja(0);
    const e = await est();
    ok(antes[otra] && e.burbuja && !e.global && !e.lector && !e.voz, 'f1. ▶ de la burbuja con «' + otra + '» sonando: queda solo la burbuja (antes: ' + fmt(antes) + ' · después: ' + fmt(e) + ')');
  }
  await silencio(); for (const f of ['global', 'lector', 'voz']) await sonar(f);
  await tocarBurbuja(0);
  const e1 = await est();
  ok(e1.burbuja && !e1.global && !e1.lector && !e1.voz, 'f1. ▶ de la burbuja con el audio compartido, el Lector y su voz sonando a la vez: queda solo la burbuja (' + fmt(e1) + ')');
  // …y NO corta el Audio propio de otro módulo (queda para stopAllAudio)
  await silencio(); await sonar('ajeno'); await tocarBurbuja(0);
  const e1b = await est();
  ok(e1b.burbuja && e1b.ajeno, 'f1. ▶ de la burbuja NO corta el Audio propio de otro módulo (solo el compartido y el Lector): ' + fmt(e1b));
  await p.evaluate(() => window.__ajeno.pause());

  // f2. cerrar / borrar historial / reabrir con la burbuja sonando la pausa
  const cierres = [
    ['✕', () => clic('#talk-close')],
    ['Escape', async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(150); }],
    ['clic afuera', () => p.evaluate(() => document.body.click())],
    ['Atrás', () => atras('talk-pop')],
  ];
  for (const [nombre, cerrar] of cierres) {
    await silencio(); await abrirTalk(); await grabarBurbuja(); await tocarBurbuja(0);
    const antes = await est();
    await cerrar(); await p.waitForTimeout(150);
    const e = await est();
    ok(antes.burbuja && !e.burbuja && !(await talkAbierto()), 'f2. cerrar el popup (' + nombre + ') con la burbuja sonando la pausa (antes: ' + fmt(antes) + ' · después: ' + fmt(e) + ')');
  }
  await silencio(); await abrirTalk(); await grabarBurbuja(); await tocarBurbuja(0);
  const antesH = await est(); await clic('#tk-clear');
  const eH = await est(); const nb = await nBurbujas();
  ok(antesH.burbuja && !eH.burbuja && nb === 0, 'f2. «Borrar historial» con la burbuja sonando la pausa (antes: ' + fmt(antesH) + ' · después: ' + fmt(eH) + ', burbujas ' + nb + ')');
  await silencio(); await abrirTalk(); await grabarBurbuja(); await tocarBurbuja(0);
  const antesR = await est(); await abrirTalk(); // reabrir (openFreeTalk) con la burbuja sonando
  const eR = await est();
  ok(antesR.burbuja && !eR.burbuja, 'f2. reabrir el popup con la burbuja sonando la pausa (antes: ' + fmt(antesR) + ' · después: ' + fmt(eR) + ')');

  // f3. empezar a grabar corta todo
  await silencio(); await abrirTalk(); await grabarBurbuja(); await tocarBurbuja(0);
  const otrasDeBurbuja = ['global', 'lector', 'voz'];
  for (const f of otrasDeBurbuja) await sonar(f);
  const antesG = await est();
  await clic('#tk-record'); await p.waitForTimeout(400);
  const gr = await grabandoTalk(); const eG = await est();
  ok(gr && FUENTES.every((f) => antesG[f]) && FUENTES.every((f) => !eG[f]), 'f3. empezar a grabar corta la burbuja, el audio compartido y el Lector (estado grabando ' + gr + '; sonaba: ' + fmt(antesG) + ' · después: ' + fmt(eG) + ')');
  const nG = await nBurbujas();
  await clic('#tk-record'); await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length > a, nG, { timeout: 15000 });
  for (const f of FUENTES) {
    await silencio();
    if (f !== 'burbuja') await p.evaluate(() => { if (window.__bp) window.__bp.pause(); });
    await sonar(f);
    const antes = await est();
    await clic('#tk-record'); await p.waitForTimeout(300);
    const grab = await grabandoTalk(); const e = await est();
    ok(antes[f] && grab && FUENTES.every((k) => !e[k]), 'f3. empezar a grabar corta «' + f + '» (estado grabando ' + grab + ', después: ' + fmt(e) + ')');
    const nAntes = await nBurbujas();
    await clic('#tk-record'); await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length > a && !document.getElementById('tk-record').classList.contains('is-recording'), nAntes, { timeout: 15000 });
  }
  // …y no corta un Audio propio de otro módulo
  await silencio(); await sonar('ajeno'); await clic('#tk-record'); await p.waitForTimeout(300);
  const eA = await est(); const grA = await grabandoTalk();
  ok(grA && eA.ajeno, 'f3. empezar a grabar NO corta el Audio propio de otro módulo (grabando ' + grA + ' · ' + fmt(eA) + ')');
  await p.evaluate(() => window.__ajeno.pause());
  const nA = await nBurbujas();
  await clic('#tk-record'); await p.waitForFunction((a) => document.querySelectorAll('#tk-chat .tk-bubble').length > a, nA, { timeout: 15000 });

  // f4. el flujo propio no se corta: grabar → transcribir → burbuja, ▶, grabar de nuevo → segunda burbuja
  await silencio(); await clic('#talk-close'); await abrirTalk();
  await grabarBurbuja();
  const t1 = await p.evaluate(() => [...document.querySelectorAll('#tk-chat .tk-bubble-text')].map((x) => x.textContent));
  await tocarBurbuja(0); const sonoB = (await est()).burbuja;
  await grabarBurbuja();
  const t2 = await p.evaluate(() => ({ textos: [...document.querySelectorAll('#tk-chat .tk-bubble-text')].map((x) => x.textContent), estado: document.getElementById('tk-status').textContent }));
  ok(t1.length === 1 && t1[0] === '你好' && sonoB && t2.textos.length === 2 && !(await grabandoTalk()),
    'f4. flujo intacto: grabar → transcribir → burbuja, ▶ suena, grabar de nuevo → segunda burbuja (' + JSON.stringify(t1) + ' → ' + JSON.stringify(t2.textos) + ' · estado «' + t2.estado + '»)');
  await tocarBurbuja(1); ok((await est()).burbuja, 'f4. ▶ de la segunda burbuja suena');
  await clic('#talk-close');

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
