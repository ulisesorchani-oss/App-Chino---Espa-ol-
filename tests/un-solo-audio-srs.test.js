// tests/un-solo-audio-srs.test.js — «un solo audio a la vez» en el Repaso (srs.js: srsSpeak, doGrade, srsClose, renderStats, renderIntro)
//   Antes: srsSpeak creaba `new Audio(url)` SIN guardar la referencia (A07 de docs/matriz-de-audio.md): dos clics en 🔊 sonaban a la vez, y el
//   audio seguía sonando tras calificar la tarjeta o cerrar el Repaso; una respuesta del TTS que llegaba DESPUÉS de cerrar sonaba igual.
//   Con la voz del sistema (la caída del servidor) pasaba lo mismo con la utterance.
//   Se MIDE en el navegador con un TTS simulado (WAV mudo de 6 s) y la voz del sistema simulada (speak/cancel registrados):
//   a. dos clics en 🔊 → suena UNO (el anterior queda en pausa)
//   b. calificar (😵/🙂/😎) corta el audio de la tarjeta
//   c. cerrar corta: ✕, Escape, clic afuera y Atrás
//   d. una respuesta del TTS que llega tarde (ya se calificó o se cerró) NO suena
//   e. con la voz del sistema: se cancela la utterance PROPIA al calificar y al cerrar; sin utterance propia el corte NO llama a speechSynthesis.cancel()
//      (cancel() es global) y una voz AJENA (p. ej. la del Lector) no se toca. El cancel() previo a hablar y stopReader() de srsSpeak no cambian
//   f. los cortes defensivos de renderStats y renderIntro (no se llega a ellos con audio desde la interfaz: se simulan con el botón de cada
//      vista inyectado en la tarjeta)
//   g. el algoritmo no cambia: calificar con audio sonando deja las mismas cajas y fechas que sin audio (la prueba de oro repaso-oro cubre el resto)
// No toca el algoritmo del SRS ni checkAnswer. No se probó con un teléfono: ver docs/prueba-celular.md.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

// WAV mudo de 6 s (8 kHz, 8 bits, mono) en base64
function wavMudo(seg) {
  const sr = 8000, len = sr * seg, b = Buffer.alloc(44 + len, 0x80);
  b.write('RIFF', 0); b.writeUInt32LE(36 + len, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(sr, 24); b.writeUInt32LE(sr, 28); b.writeUInt16LE(1, 32); b.writeUInt16LE(8, 34); b.write('data', 36); b.writeUInt32LE(len, 40);
  return b.toString('base64');
}
const WAV = wavMudo(6);
const DECK = [['银行', '銀行'], ['图书馆', '圖書館'], ['苹果', '蘋果'], ['老师', '老師'], ['朋友', '']];
const mazo = () => { const cards = {}, now = Date.now(); DECK.forEach((r, i) => { cards[r[0]] = { b: 2, d: now - (i + 1) * 60000, a: now - 9 * 86400000, r: 0, l: 0, es: 'glosa ' + r[0], py: '', zt: r[1], m: '', lv: 0, ctxZh: '', ctxZt: '', ctxEs: '' }; }); return { v: 1, cards }; };

(async () => {
  const b = await chromium.launch({ ...LAUNCH });
  const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
  await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.clear(); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); }
    // todos los Audio que crea la app quedan registrados
    window.__auds = [];
    const Orig = window.Audio;
    window.__playRechaza = false; // true: play() queda pendiente y la prueba lo RECHAZA a mano (autoplay bloqueado, como en un teléfono)
    window.__playRej = [];
    window.__rechazarPlay = () => { window.__playRej.splice(0).forEach((f) => f(new Error('NotAllowedError'))); };
    window.Audio = class extends Orig {
      constructor(u) { super(u); window.__auds.push(this); }
      play() { return window.__playRechaza ? new Promise((_, rej) => { window.__playRej.push(rej); }) : super.play(); }
    };
    // voz del sistema simulada: speak/cancel registrados; cancel() dispara onerror('canceled') de lo que sonaba, como el navegador
    window.__utts = []; window.__cancels = 0;
    const fake = {
      speak(u) { u.__act = true; window.__utts.push(u); },
      cancel() { window.__cancels++; window.__utts.forEach((u) => { if (u.__act) { u.__act = false; try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { /* noop */ } } }); },
      pause() { }, resume() { }, getVoices() { return []; }, speaking: false, pending: false, paused: false, onvoiceschanged: null,
      addEventListener() { }, removeEventListener() { }
    };
    try { Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true }); } catch (e) { /* noop */ }
  });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(APP_URL); await p.waitForTimeout(1300);

  const sonando = () => p.evaluate(() => window.__auds.filter((a) => !a.paused && !a.ended).length);
  const voces = () => p.evaluate(() => window.__utts.filter((u) => u.__act).length);
  const preparar = async (servidor) => { // mazo vencido, TTS simulado (servidor ok / caído / manual) y Repaso abierto en la primera tarjeta
    await p.evaluate(([db, wav, modo]) => {
      localStorage.setItem('ac_srs', JSON.stringify(db));
      window.__auds.length = 0; window.__utts.length = 0; window.__cancels = 0; window.__pend = []; window.__playRej = []; window.__playRechaza = (modo === 'play-rechaza');
      window.fetchTTS = () => {
        if (modo === 'caido') return Promise.resolve({ ok: false });
        if (modo === 'manual-caido') return new Promise((res) => { window.__pend.push(() => res({ ok: false })); });
        if (modo === 'manual-rechaza') return new Promise((res, rej) => { window.__pend.push(() => rej(new Error('red caída'))); });
        const resp = { ok: true, json: () => Promise.resolve({ audio: wav, mime: 'audio/wav' }) };
        if (modo === 'manual') return new Promise((res) => { window.__pend.push(() => res(resp)); });
        return Promise.resolve(resp);
      };
      const pop = document.getElementById('srs-pop'); if (pop && !pop.classList.contains('hidden')) document.getElementById('btn-srs-close').click();
    }, [mazo(), WAV, servidor]);
    await p.evaluate(() => document.getElementById('btn-srs').click()); await p.waitForTimeout(100);
    await p.click('#srs-body .srs-start'); await p.waitForTimeout(100);
  };
  const clicSpeak = async () => { await p.evaluate(() => document.querySelector('#srs-body .srs-speak').click()); await p.waitForTimeout(150); };
  const calificar = (k) => p.evaluate((k) => { const g = document.querySelector('#srs-body .srs-grade[data-k="' + k + '"]'); if (g) g.click(); return !!g; }, k);
  const fase = () => p.evaluate(() => window.SRS_DEBUG().phase);
  const cerrar = async (como) => {
    if (como === 'x') await p.evaluate(() => document.getElementById('btn-srs-close').click());
    else if (como === 'esc') await p.keyboard.press('Escape');
    else if (como === 'afuera') await p.evaluate(() => { const e = document.createElement('div'); e.id = '__fuera'; document.body.appendChild(e); e.dispatchEvent(new MouseEvent('click', { bubbles: true })); e.remove(); });
    else if (como === 'atras') await p.evaluate(() => history.back());
    await p.waitForTimeout(250);
  };

  // ── a. dos clics → suena uno ──
  await preparar('ok');
  await clicSpeak();
  ok(await sonando() === 1, 'a. un clic en 🔊: suena 1 audio (' + await sonando() + ')');
  await clicSpeak();
  const a2 = await p.evaluate(() => ({ total: window.__auds.length, sonando: window.__auds.filter((a) => !a.paused && !a.ended).length, primeroPausado: window.__auds[0] ? window.__auds[0].paused : null }));
  ok(a2.total === 2 && a2.sonando === 1 && a2.primeroPausado === true, 'a. dos clics en 🔊: el segundo audio corta al primero (creados ' + a2.total + ', suenan ' + a2.sonando + ', el 1.º en pausa: ' + a2.primeroPausado + ')');

  // ── b. calificar corta ──
  for (const k of ['again', 'good', 'easy']) {
    await preparar('ok'); await clicSpeak();
    const antes = await sonando();
    const hubo = await calificar(k); await p.waitForTimeout(200);
    ok(antes === 1 && hubo && await sonando() === 0, 'b. calificar «' + k + '» con el audio sonando lo corta (antes ' + antes + ', después ' + await sonando() + ')');
  }
  // y con la tarjeta siguiente ya en pantalla, un clic nuevo vuelve a sonar normal (el corte no deja nada trabado)
  await clicSpeak();
  ok(await sonando() === 1, 'b. tras calificar, el 🔊 de la tarjeta siguiente suena (' + await sonando() + ')');

  // ── c. cerrar corta ──
  for (const como of ['x', 'esc', 'afuera', 'atras']) {
    await preparar('ok'); await clicSpeak();
    const antes = await sonando();
    await cerrar(como);
    ok(antes === 1 && await sonando() === 0 && await fase() === 'idle', 'c. cerrar con «' + como + '» corta el audio (antes ' + antes + ', después ' + await sonando() + ', fase ' + await fase() + ')');
  }

  // ── d. respuesta tardía ──
  await preparar('manual'); await clicSpeak();
  ok(await p.evaluate(() => window.__pend.length) === 1 && await sonando() === 0, 'd. con el TTS pendiente todavía no suena nada');
  await cerrar('x');
  await p.evaluate(() => window.__pend.forEach((f) => f())); await p.waitForTimeout(250);
  ok(await sonando() === 0 && await p.evaluate(() => window.__auds.length) === 0, 'd. la respuesta del TTS que llega DESPUÉS de cerrar no suena ni crea un Audio (creados ' + await p.evaluate(() => window.__auds.length) + ')');
  await preparar('manual'); await clicSpeak();
  await p.evaluate(() => { const g = document.querySelector('#srs-body .srs-grade[data-k="good"]'); g.click(); });
  await p.evaluate(() => window.__pend.forEach((f) => f())); await p.waitForTimeout(250);
  ok(await sonando() === 0, 'd. la respuesta del TTS que llega DESPUÉS de calificar no suena (' + await sonando() + ')');
  // dos pedidos en vuelo: solo el último puede sonar
  await preparar('manual'); await clicSpeak(); await clicSpeak();
  await p.evaluate(() => window.__pend.forEach((f) => f())); await p.waitForTimeout(250);
  ok(await sonando() === 1, 'd. dos pedidos en vuelo: al llegar suena solo el último (' + await sonando() + ')');

  // la caída a la voz del sistema que llega tarde (el servidor falla DESPUÉS de cerrar o de calificar) tampoco habla
  await preparar('manual-caido'); await clicSpeak();
  await cerrar('x');
  await p.evaluate(() => window.__pend.forEach((f) => f())); await p.waitForTimeout(250);
  ok(await voces() === 0 && await p.evaluate(() => window.__utts.length) === 0, 'd. la caída a la voz del sistema que llega DESPUÉS de cerrar no habla (utterances creadas ' + await p.evaluate(() => window.__utts.length) + ')');
  await preparar('manual-caido'); await clicSpeak(); await calificar('good');
  await p.evaluate(() => window.__pend.forEach((f) => f())); await p.waitForTimeout(250);
  ok(await voces() === 0 && await p.evaluate(() => window.__utts.length) === 0, 'd. la caída a la voz del sistema que llega DESPUÉS de calificar no habla (utterances creadas ' + await p.evaluate(() => window.__utts.length) + ')');

  // el pedido que FALLA (se rechaza la promesa) o el play() bloqueado que se resuelve DESPUÉS de cerrar o calificar: tampoco habla
  await preparar('manual-rechaza'); await clicSpeak();
  await cerrar('x');
  await p.evaluate(() => window.__pend.forEach((f) => f())); await p.waitForTimeout(250);
  ok(await p.evaluate(() => window.__utts.length) === 0, 'd. el pedido que falla DESPUÉS de cerrar no cae a la voz del sistema (utterances creadas ' + await p.evaluate(() => window.__utts.length) + ')');
  await preparar('play-rechaza'); await clicSpeak(); // el audio llega, pero su play() queda pendiente
  await calificar('good'); await p.evaluate(() => window.__rechazarPlay()); await p.waitForTimeout(250); // y se rechaza DESPUÉS de calificar
  ok(await p.evaluate(() => window.__utts.length) === 0, 'd. el play() bloqueado que se rechaza DESPUÉS de calificar no cae a la voz del sistema (utterances creadas ' + await p.evaluate(() => window.__utts.length) + ')');
  await preparar('play-rechaza'); await clicSpeak(); await p.evaluate(() => window.__rechazarPlay()); await p.waitForTimeout(250);
  ok(await p.evaluate(() => window.__utts.filter((u) => u.__act).length) === 1, 'd. con el play() bloqueado y SIN calificar, sí cae a la voz del sistema (1 utterance activa)');

  // ── e. voz del sistema ──
  await preparar('caido'); await clicSpeak();
  ok(await voces() === 1, 'e. con el servidor caído habla la voz del sistema (1 utterance activa: ' + await voces() + ')');
  await calificar('good'); await p.waitForTimeout(200);
  ok(await voces() === 0, 'e. calificar cancela la utterance propia (' + await voces() + ')');
  await preparar('caido'); await clicSpeak();
  await cerrar('x');
  ok(await voces() === 0, 'e. cerrar cancela la utterance propia (' + await voces() + ')');
  // una voz AJENA (el Lector, por ejemplo) no se toca: el Repaso solo cancela lo suyo
  await preparar('ok');
  await clicSpeak(); // el Repaso suena con SU audio (el servidor responde); no tiene utterance propia
  await p.evaluate(() => { const u = { lang: 'zh-CN', ajena: true }; window.speechSynthesis.speak(u); }); // una voz de OTRO módulo, que arranca después
  const c0 = await p.evaluate(() => window.__cancels);
  await calificar('good'); await p.waitForTimeout(200);
  const ajena = await p.evaluate(() => window.__utts.filter((u) => u.ajena && u.__act).length);
  ok(await sonando() === 0 && ajena === 1, 'e. calificar corta SU audio y NO cancela la voz ajena (suenan ' + await sonando() + ', ajenas activas ' + ajena + ')');
  const c1 = await p.evaluate(() => window.__cancels);
  ok(c1 === c0, 'e. sin utterance propia, el corte no llama a speechSynthesis.cancel() (cancels ' + c0 + ' → ' + c1 + ')');

  // ── f. cortes defensivos de renderStats / renderIntro ──
  await preparar('ok'); await clicSpeak();
  await p.evaluate(() => { const bt = document.createElement('button'); bt.className = 'srs-stats-btn'; document.getElementById('srs-body').appendChild(bt); bt.click(); }); await p.waitForTimeout(200);
  ok(await fase() === 'stats' && await sonando() === 0, 'f. renderStats corta el audio (fase ' + await fase() + ', suenan ' + await sonando() + ')');
  await preparar('ok'); await clicSpeak();
  await p.evaluate(() => { const bt = document.createElement('button'); bt.className = 'srs-prod-toggle'; document.getElementById('srs-body').appendChild(bt); bt.click(); }); await p.waitForTimeout(200);
  ok(await fase() === 'intro' && await sonando() === 0, 'f. renderIntro corta el audio (fase ' + await fase() + ', suenan ' + await sonando() + ')');

  // ── g. el algoritmo no cambia con audio sonando ──
  const caja = () => p.evaluate(() => { const d = JSON.parse(localStorage.getItem('ac_srs')); return Object.entries(d.cards).sort((x, y) => x[0] < y[0] ? -1 : 1).map(([zh, c]) => [zh, c.b, c.r, c.l, c.d > Date.now() ? 'futura' : 'vencida']); });
  await preparar('ok'); await calificar('good'); await p.waitForTimeout(150); const sinAudio = await caja();
  await preparar('ok'); await clicSpeak(); await calificar('good'); await p.waitForTimeout(150); const conAudio = await caja();
  ok(JSON.stringify(sinAudio) === JSON.stringify(conAudio), 'g. calificar con y sin audio sonando deja las mismas cajas y vencimientos ' + JSON.stringify(conAudio));

  ok(errs.length === 0, 'sin errores JS ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
