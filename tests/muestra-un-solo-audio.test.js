// tests/muestra-un-solo-audio.test.js — «un solo audio a la vez» en la MUESTRA DE VOZ (botones 🇨🇳/🇦🇷 de Yo → Ajustes: cycleVoice → playVoiceSample, audio-tts.js; filas A03 y A04
// de docs/matriz-de-audio.md). A03 = muestra con la voz del sistema (speakVoiceSampleSystem, servidor caído); A04 = muestra con el audio del servidor (new Audio).
//   Antes (medido en Chromium contra main, Fase 1 del bloque 5):
//     A04 no cortaba nada al arrancar ni guardaba su Audio: sonaba ENCIMA del Lector (servidor o voz del sistema) y del 🔊 de Hoy; tres toques seguidos dejaban TRES muestras
//         a la vez (el token solo protegía a la voz del sistema); una respuesta tardía de un toque viejo sonaba igual.
//     A03 hacía un speechSynthesis.cancel() global y nada más: con el Lector hablando con la voz del sistema (texto de 3+ trozos) el Lector AVANZABA al trozo siguiente y
//         hablaba a la vez que la muestra; con audio de servidor (Lector, 🔊 de Hoy) la muestra sonaba encima.
//   Ahora (decisión del usuario, opción (a)): al sonar, la muestra corta el audio compartido (stopGlobalAudio) y el Lector (stopReader, SOLO si el Lector no está en 'idle': sin
//   él no hay un cancel() global de más); A04 guarda su Audio (voiceSampleAudio): un toque nuevo pausa y libera la muestra anterior (y cancela su voz del sistema propia), y el
//   token descarta la respuesta tardía. A03 conserva su cancel() global (los navegadores encolan speak(): sin él la muestra esperaría detrás de la otra voz).
//   h1. A03 con el Lector hablando (voz del sistema, 3+ trozos): queda solo la muestra, el Lector queda en idle y NO habla el trozo siguiente
//   h2. A03 con el Lector con audio de servidor y con el 🔊 de Hoy sonando: se cortan; queda solo la muestra
//   h3. A03 con el Lector en idle: un solo cancel() (el propio); sin muestra anterior no hay cortes de más
//   h4. A04 con el Lector (servidor y voz del sistema, 3+ trozos) y con el 🔊 de Hoy sonando: queda solo la muestra
//   h5. A04: tres toques seguidos (zh, zh, es) dejan UNA muestra sonando; las anteriores quedan pausadas y su URL liberada
//   h6. A04: la respuesta tardía de un toque viejo se descarta (no suena una segunda muestra); la última manda
//   h7. mezcla: el 1.er toque cae a la voz del sistema y el 2.º llega con audio del servidor: la voz propia se corta
//   h8. el flujo propio no cambia: sola con el servidor sano (una muestra), sola con el servidor caído (una voz), dos toques con el servidor caído (una voz: se conserva el cancel() global)
//   h9. LÍMITE CONOCIDO (se fija para que se vea): otro módulo que arranca MIENTRAS suena la muestra (~2 s) no la corta (el Lector, A04), y la Diaria (A11) sigue superponiéndose;
//       los dos quedan para el diseño de stopAllAudio()
// Se MIDE en el navegador (Chromium) con el servidor de TTS simulado (page.route: WAV mudo de 8 s o 503) y la voz del sistema simulada (speak/cancel registrados; cancel() desactiva lo
// que hablaba y avisa onerror('canceled'), como el navegador). El Lector, el 🔊 de Hoy y los botones de voz son los reales. NO se prueban los motores de voz reales (los navegadores
// ENCOLAN speak() y avisan canceled/interrupted de forma asíncrona; el simulado habla en paralelo: las filas «voz contra voz» miden quién queda ACTIVO, no el timing real), ni un audio
// de ~2 s, ni un teléfono. No toca app.js, el SRS ni checkAnswer.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0; const todosErrs = [];
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

function wavMudo(seg) { // WAV mudo (8 kHz, 8 bits, mono) en base64
  const sr = 8000, len = sr * seg, b = Buffer.alloc(44 + len, 0x80);
  b.write('RIFF', 0); b.writeUInt32LE(36 + len, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(sr, 24); b.writeUInt32LE(sr, 28); b.writeUInt16LE(1, 32); b.writeUInt16LE(8, 34); b.write('data', 36); b.writeUInt32LE(len, 40);
  return b.toString('base64');
}
const WAV = wavMudo(8);
const UNA = '你好，我们一起练习汉语。今天天气很好，我想去公园玩，你想一起去吗？我们明天再见，谢谢你的帮助。这个周末你有空吗？我喜欢喝茶，也喜欢看书。';
const TEXTO = (UNA + '\n\n').repeat(5); // 3 trozos del Lector
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' };

(async () => {
  const b = await chromium.launch({ ...LAUNCH, args: [...(LAUNCH.args || []), '--autoplay-policy=no-user-gesture-required'] });

  // Una sesión limpia. S.regla(k) → { modo: 'ok' | 'caido', demora: ms } para el pedido k-ésimo a /api/tts (por defecto S.modo / sin demora)
  async function sesion() {
    const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
    await ctx.addInitScript(() => {
      if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); }
      window.__utts = []; window.__cancels = 0; window.__auds = []; window.__revoked = [];
      const fake = {
        speak(u) { u.__act = true; window.__utts.push(u); },
        cancel() { window.__cancels++; window.__utts.forEach((u) => { if (u.__act) { u.__act = false; try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { /* noop */ } } }); },
        pause() { }, resume() { }, getVoices() { return []; }, speaking: false, pending: false, paused: false, addEventListener() { }, removeEventListener() { }
      };
      Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true });
      const A = window.Audio; window.Audio = class extends A { constructor(...a) { super(...a); window.__auds.push(this); } };
      const rev = URL.revokeObjectURL.bind(URL); URL.revokeObjectURL = (u) => { window.__revoked.push(u); return rev(u); };
    });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => { errs.push(e.message); todosErrs.push(e.message); });
    const S = { ctx, p, errs, modo: 'ok', regla: null, k: 0 };
    await p.route(/\/api\/tts/, async (route) => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      const k = S.k++; const r = S.regla ? S.regla(k) : { modo: S.modo, demora: 0 };
      if (r.demora) await new Promise((res) => setTimeout(res, r.demora));
      if (r.modo === 'ok') return route.fulfill({ status: 200, headers: { 'content-type': 'application/json', ...CORS, 'x-tts-audio': '1' }, body: JSON.stringify({ audio: WAV, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural' }) });
      return route.fulfill({ status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS }, body: JSON.stringify({ error: 'x', codigo: 'sin_audio' }) });
    });
    await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
    return S;
  }
  // quién suena: Lector (servidor), 🔊 de Hoy (global), muestras (Audio sueltos con blob:), voces del sistema activas; y el estado del Lector
  const est = (p) => p.evaluate(() => ({
    lector: !readerAudio.paused && !!readerAudio.src, global: !globalAudioPlayer.paused && !!globalAudioPlayer.src,
    muestras: window.__auds.filter((a) => a !== readerAudio && a !== globalAudioPlayer && !a.paused && a.src).length,
    voces: window.__utts.filter((u) => u.__act).length, hablo: window.__utts.length, cancels: window.__cancels,
    idle: READER_REPRO.is('idle')
  }));
  const fmt = (e) => 'lector=' + e.lector + ' global=' + e.global + ' muestras=' + e.muestras + ' voces=' + e.voces + ' cancel()=' + e.cancels + ' idle=' + e.idle;
  const irYo = async (p) => { await p.click('#nav-yo'); await p.waitForTimeout(300); };
  const voz = async (p, l) => { await p.evaluate((l) => document.getElementById('btn-voice-' + l).click(), l); await p.waitForTimeout(500); };
  const lector = async (p) => { await p.click('#nav-aprender'); await p.evaluate((t) => { document.getElementById('reader-input').value = t; toggleReaderPlay(); }, TEXTO); await p.waitForTimeout(900); };
  const hoy = async (p) => { await p.click('#nav-hoy'); await p.waitForTimeout(500); await p.evaluate(() => playAudio('zh')); await p.waitForTimeout(700); };
  const creadas = (p) => p.evaluate(() => window.__auds.filter((a) => a !== readerAudio && a !== globalAudioPlayer && /^blob:/.test(a.src)).length);

  // ── h1. A03 con el Lector hablando (voz del sistema) ──
  { const S = await sesion(); const p = S.p; S.modo = 'caido'; await lector(p);
    const a = await est(p); const chunks = await p.evaluate(() => readerChunks.length);
    ok(chunks >= 3 && a.voces === 1 && !a.idle, 'h1. preparación: el Lector habla con la voz del sistema, texto de ' + chunks + ' trozos (' + fmt(a) + ')');
    await irYo(p); await voz(p, 'zh'); await p.waitForTimeout(2200); const d = await est(p);
    const txt = await p.evaluate(() => window.__utts.filter((u) => u.__act).map((u) => u.text.slice(0, 5)).join('|'));
    ok(d.voces === 1 && /^你好！/.test(txt), 'h1. A03 + Lector (voz del sistema): queda solo la muestra (' + fmt(d) + ' · activa «' + txt + '»)');
    ok(d.idle && d.hablo === a.hablo + 1, 'h1. el Lector queda en idle y NO habla el trozo siguiente (' + (d.hablo - a.hablo) + ' voz nueva)');
    const btn = await p.evaluate(() => document.getElementById('btn-reader-play').textContent);
    ok(/Leer/.test(btn), 'h1. el botón del Lector vuelve a «🔊 Leer» (' + btn + ')'); await S.ctx.close(); }

  // ── h2. A03 con audio de servidor sonando ──
  { const S = await sesion(); const p = S.p; await lector(p); S.modo = 'caido'; await irYo(p); const a = await est(p); await voz(p, 'zh'); const d = await est(p);
    ok(a.lector && !d.lector && d.voces === 1 && d.idle, 'h2. A03 + Lector (audio de servidor): se corta y queda solo la muestra (antes: ' + fmt(a) + ' · después: ' + fmt(d) + ')'); await S.ctx.close(); }
  { const S = await sesion(); const p = S.p; await hoy(p); S.modo = 'caido'; await irYo(p); const a = await est(p); await voz(p, 'zh'); const d = await est(p);
    ok(a.global && !d.global && d.voces === 1, 'h2. A03 + 🔊 de Hoy (audio de servidor): se corta y queda solo la muestra (antes: ' + fmt(a) + ' · después: ' + fmt(d) + ')');
    const bhoy = await p.evaluate(() => [...document.querySelectorAll('button')].filter((x) => x.innerText === '...' && x.disabled).length);
    ok(bhoy === 0, 'h2. y el 🔊 de Hoy no queda trabado en «...» (' + bhoy + ' botones trabados)'); await S.ctx.close(); }

  // ── h3. A03 con el Lector en idle: sin cortes de más ──
  { const S = await sesion(); const p = S.p; S.modo = 'caido'; await irYo(p); const a = await est(p); await voz(p, 'zh'); const d = await est(p);
    ok(a.idle && d.cancels - a.cancels === 1 && d.voces === 1, 'h3. A03 con el Lector en idle: UN cancel() (el propio de la muestra), no uno más del Lector (' + (d.cancels - a.cancels) + ')'); await S.ctx.close(); }

  // ── h4. A04 con otros sonando ──
  { const S = await sesion(); const p = S.p; await lector(p); await irYo(p); const a = await est(p); await voz(p, 'zh'); const d = await est(p);
    ok(a.lector && !d.lector && d.muestras === 1 && d.idle, 'h4. A04 + Lector (audio de servidor): se corta y suena solo la muestra (antes: ' + fmt(a) + ' · después: ' + fmt(d) + ')'); await S.ctx.close(); }
  { const S = await sesion(); const p = S.p; S.modo = 'caido'; await lector(p); S.modo = 'ok'; await irYo(p); const a = await est(p); await voz(p, 'zh'); await p.waitForTimeout(1800); const d = await est(p);
    ok(a.voces === 1 && d.voces === 0 && d.muestras === 1 && d.idle && d.hablo === a.hablo, 'h4. A04 + Lector (voz del sistema, 3+ trozos): se corta, no habla el trozo siguiente y suena solo la muestra (antes: ' + fmt(a) + ' · después: ' + fmt(d) + ')'); await S.ctx.close(); }
  { const S = await sesion(); const p = S.p; await hoy(p); await irYo(p); const a = await est(p); await voz(p, 'es'); const d = await est(p);
    ok(a.global && !d.global && d.muestras === 1, 'h4. A04 + 🔊 de Hoy: se corta y suena solo la muestra (antes: ' + fmt(a) + ' · después: ' + fmt(d) + ')'); await S.ctx.close(); }

  // ── h5. A04: tres toques seguidos ──
  { const S = await sesion(); const p = S.p; await irYo(p); await voz(p, 'zh'); await voz(p, 'zh'); await voz(p, 'es'); const d = await est(p);
    ok(d.muestras === 1, 'h5. tres toques seguidos (zh, zh, es): UNA muestra sonando (' + d.muestras + ')');
    const r = await p.evaluate(() => { const ms = window.__auds.filter((a) => a !== readerAudio && a !== globalAudioPlayer && /^blob:/.test(a.src)); return { n: ms.length, pausadas: ms.slice(0, -1).every((a) => a.paused), liberadas: ms.slice(0, -1).every((a) => window.__revoked.indexOf(a.src) !== -1), ultima: !ms[ms.length - 1].paused }; });
    ok(r.n === 3 && r.pausadas && r.ultima, 'h5. las dos primeras quedan pausadas y la última suena (' + JSON.stringify(r) + ')');
    ok(r.liberadas, 'h5. y su URL de blob se libera (revokeObjectURL)'); await S.ctx.close(); }

  // ── h6. A04: la respuesta tardía de un toque viejo se descarta ──
  { const S = await sesion(); const p = S.p; S.regla = (k) => ({ modo: 'ok', demora: k === 0 ? 1500 : 0 }); await irYo(p);
    await p.evaluate(() => document.getElementById('btn-voice-zh').click()); await p.waitForTimeout(150);
    await p.evaluate(() => document.getElementById('btn-voice-es').click()); await p.waitForTimeout(700);
    const a = await est(p); const c0 = await creadas(p);
    await p.waitForTimeout(1500); const d = await est(p); const c1 = await creadas(p);
    ok(a.muestras === 1 && c0 === 1, 'h6. el 2.º toque suena enseguida (una muestra; ' + c0 + ' creada)');
    ok(d.muestras === 1 && c1 === 1, 'h6. cuando llega la respuesta tardía del 1.er toque NO suena una segunda muestra (' + c1 + ' creadas, ' + d.muestras + ' sonando)'); await S.ctx.close(); }

  // ── h7. mezcla: voz del sistema propia + audio del servidor ──
  { const S = await sesion(); const p = S.p; S.regla = (k) => ({ modo: k === 0 ? 'caido' : 'ok', demora: 0 }); await irYo(p);
    await voz(p, 'zh'); const a = await est(p); await voz(p, 'es'); const d = await est(p);
    ok(a.voces === 1 && d.voces === 0 && d.muestras === 1, 'h7. el 1.er toque habla con la voz del sistema; el 2.º llega con audio del servidor y la voz propia se corta (antes: ' + fmt(a) + ' · después: ' + fmt(d) + ')'); await S.ctx.close(); }

  // ── h8. el flujo propio no cambia ──
  { const S = await sesion(); const p = S.p; await irYo(p); await voz(p, 'zh'); const d = await est(p);
    ok(d.muestras === 1 && d.voces === 0 && d.global === false && d.lector === false, 'h8. sola, con el servidor sano: una muestra del servidor y nada más (' + fmt(d) + ')'); await S.ctx.close(); }
  { const S = await sesion(); const p = S.p; S.modo = 'caido'; await irYo(p); await voz(p, 'zh'); const d = await est(p);
    ok(d.muestras === 0 && d.voces === 1, 'h8. sola, con el servidor caído: una voz del sistema (' + fmt(d) + ')'); await S.ctx.close(); }

  { const S = await sesion(); const p = S.p; S.modo = 'caido'; await irYo(p); await voz(p, 'zh'); await voz(p, 'es'); const d = await est(p);
    ok(d.voces === 1 && d.muestras === 0, 'h8. servidor caído, dos toques seguidos (zh, es): UNA voz del sistema (el cancel() global propio se conserva) (' + fmt(d) + ')'); await S.ctx.close(); }

  // ── h9. LÍMITE CONOCIDO: otro módulo que arranca mientras suena la muestra no la corta ──
  { const S = await sesion(); const p = S.p; await irYo(p); await voz(p, 'zh'); await lector(p); const d = await est(p);
    ok(d.muestras === 1 && d.lector, 'h9. LÍMITE CONOCIDO: el Lector arranca con la muestra sonando y ninguno corta al otro (' + fmt(d) + '); queda para stopAllAudio()'); await S.ctx.close(); }

  ok(todosErrs.length === 0, 'sin errores JS ' + todosErrs.slice(0, 3).join(' | '));
  await b.close();
  console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
