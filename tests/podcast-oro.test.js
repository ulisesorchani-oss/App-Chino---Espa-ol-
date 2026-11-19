// Podcast (podcast.js): PRUEBA DE ORO POR ORDEN DE EVENTOS. Como tests/lector-oro.test.js y tests/escuchar-todo-oro.test.js: cada escenario graba, con UN solo reloj
// (dentro de la página), lo observable: pedidos y respuestas de /api/tts, play/pause/playing/ended/error del <audio> de la lección, speak/cancel/pause/resume de la
// voz del sistema, y lo que ve el usuario (texto de #pd-status, texto y atributos de #pd-playpause). NO guarda tiempos.
// El oro (tests/data/podcast-oro.json): los escenarios que NO pasan por la voz del sistema se grabaron con el código ANTERIOR a la máquina de estados (la formalización dio la MISMA traza) y siguen
// idénticos; los que SÍ pasan por la voz del sistema (R10c ×2, voz del sistema, sin voz y los de «voz …», «audio-corrupto…», «error-y-reintento») se grabaron en fix/podcast-voz-sistema, con el Podcast por frases.
//   GOLDEN_RECORD=1 → graba/pisa el oro (3 corridas por escenario: deben dar la MISMA traza). SOLO=a,b limita; con GOLDEN_RECORD agrega/pisa solo esos.
//   PC_MUTADO=<archivo> sirve ese podcast.js en lugar del del repo · NOSTRICT=1 apaga el modo estricto.
// CLASE de cada escenario (qué tan «real» es lo que muestra):
//   real       → el navegador (Chromium) y el audio son de verdad; solo el servidor y la voz del sistema son simulados
//   sintético  → dos toques en la MISMA tarea (algo que una persona no puede hacer): muestra el estado interno, no un camino alcanzable
//   emulado    → se FUERZA el rechazo de play() (autoplay bloqueado, NotAllowedError): hay que probarlo en un dispositivo real
// Defectos conocidos (R10 del informe de máquinas de estado): R10a sigue declarado «conocida» (tabla de podcast.js y docs/maquinas-de-estado.md). R10b se arregló en #139. R10c (real y emulado) quedó resuelto como EFECTO LATERAL
// de la voz por frases en fix/podcast-voz-sistema (el audio fallido ya no es el motor: ⏸ y «Seguir» van a la voz, y un ⏸ en el mismo turno del primer play() la deja esperando el «Seguir»); sus escenarios se conservan.
const fs = require('fs');
const path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

const GOLD = path.join(__dirname, 'data', 'podcast-oro.json');
const RECORD = process.env.GOLDEN_RECORD === '1';
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sleep = (p, ms) => p.waitForTimeout(ms);

function wavB64(sec) {
    const sr = 8000, len = Math.floor(sr * sec), buf = Buffer.alloc(44 + len, 128);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + len, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(len, 40);
    return buf.toString('base64');
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'access-control-expose-headers': 'x-tts-audio, x-tts-fallback, retry-after' };

// ───────── instrumentación que corre DENTRO de la página (un solo reloj) ─────────
function instrumentar(cfg) {
    const E = window.__E = [];
    const log = window.__log = (s) => { E.push(s); disparar(s); };
    const click = (id) => { const e = document.getElementById(id); if (e) e.click(); };
    const ACC = {
        toque: () => click('pd-playpause'), pausa: () => click('pd-playpause'), seguir: () => click('pd-playpause'), cerrar: () => click('pd-close'), siguiente: () => click('pd-next'),
        // sintético: «reanudar» y cambiar/cerrar en la MISMA tarea (una persona no puede)
        reanudarYSiguiente: () => { click('pd-playpause'); click('pd-next'); }, reanudarYCerrar: () => { click('pd-playpause'); click('pd-close'); }, reanudarYElegirOtra: () => { click('pd-playpause'); click('pd-back'); },
        fin: () => { window.__fin = true; }
    };
    const trig = (cfg.triggers || []).map((t) => Object.assign({ visto: 0, usado: false }, t));
    function disparar(s) {
        if (!E.includes('# inicio')) return;
        trig.forEach((t) => {
            if (t.usado || !(t.re ? new RegExp(t.re).test(s) : t.when === s)) return;
            t.visto++; if (t.visto < (t.n || 1)) return;
            t.usado = true;
            const f = () => { log('> ' + t.do); (ACC[t.do] || (() => { }))(); };
            if (t.delay) setTimeout(f, t.delay); else queueMicrotask(f);
        });
    }
    window.__mark = (m) => log('# ' + m);
    // pedidos al servidor
    const f0 = window.fetch;
    window.fetch = function (u, o) {
        if (!/\/api\/tts/.test(String(u))) return f0.apply(this, arguments);
        log('fetch ' + ((o && o.method) || 'GET'));
        return f0.apply(this, arguments).then((x) => { log('resp ' + x.status); return x; }, (e) => { log('resp red'); throw e; });
    };
    // <audio> de la lección (el único con src blob: durante el Podcast)
    const proto = HTMLMediaElement.prototype, play0 = proto.play, pause0 = proto.pause;
    const esPod = (el) => String(el.src).slice(0, 5) === 'blob:';
    proto.play = function () {
        if (!esPod(this)) return play0.apply(this, arguments);
        if (!this.__ev) { this.__ev = 1; ['playing', 'ended', 'error'].forEach((t) => this.addEventListener(t, () => log('audio.' + t), true)); }
        log('audio.play');
        const r = cfg.playRechaza ? Promise.reject(Object.assign(new Error('x'), { name: 'NotAllowedError' })) : play0.apply(this, arguments); // emulado: autoplay bloqueado
        if (cfg.pausaAlPlay && !window.__yaPauso) { window.__yaPauso = true; const b = document.getElementById('pd-playpause'); if (b) b.click(); } // R10c real: ⏸ en el MISMO turno del primer play()
        r.then(() => log('audio.play→ok'), (e) => log('audio.play→rechazado ' + (e && e.name)));
        return r;
    };
    proto.pause = function () { if (esPod(this)) log('audio.pause'); return pause0.apply(this, arguments); };
    // voz del sistema simulada, COMO CHROME: speak() → (async) onstart → (tras vozMs) onend; cancel() sobre lo que habla → (async) onerror('interrupted') en esa frase;
    // pause()/resume() solo se anotan (el Podcast ya no las usa). Modos (cfg.voz): 'normal' · 'inmediato' (onend al instante, SIN onstart) · 'error:<código>' (onerror al instante,
    // p. ej. language-unavailable / synthesis-failed) · 'muda' (nunca arranca ni termina) · 'sin-onstart' (habla y termina tras vozMs pero NUNCA dispara onstart: hay motores así). cfg.arranqueMs retrasa el onstart (voz lenta en arrancar).
    let hablando = null, pausada = false;
    if (cfg.sinVoz) { try { delete window.speechSynthesis; } catch (e) { /* noop */ } }
    if (window.speechSynthesis) {
        const modo = cfg.voz || 'normal';
        const marca = (t) => 'speak ' + Array.from(t).length + ' ' + Array.from(t).slice(0, 4).join('');
        speechSynthesis.getVoices = () => [];
        speechSynthesis.speak = (u) => {
            log(marca(u.text)); hablando = u; pausada = false;
            if (modo === 'muda') return;
            if (modo === 'inmediato') { setTimeout(() => { if (hablando !== u) return; log('voz.fin'); hablando = null; try { u.onend && u.onend({}); } catch (e) { /* noop */ } }, 0); return; }
            if (modo.startsWith('error:')) { setTimeout(() => { if (hablando !== u) return; log('voz.error ' + modo.slice(6)); hablando = null; try { u.onerror && u.onerror({ error: modo.slice(6) }); } catch (e) { /* noop */ } }, 0); return; }
            if (modo !== 'sin-onstart') setTimeout(() => { if (hablando !== u) return; log('voz.start'); try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } }, cfg.arranqueMs || 0);
            setTimeout(() => { if (hablando === u && !pausada) { log('voz.fin'); hablando = null; try { u.onend && u.onend({}); } catch (e) { /* noop */ } } }, (cfg.arranqueMs || 0) + (cfg.vozMs || 700));
        };
        speechSynthesis.cancel = () => {
            log('cancel');
            const u = hablando; hablando = null;
            if (u) setTimeout(() => { log('voz.cortada'); try { u.onerror && u.onerror({ error: 'interrupted' }); } catch (e) { /* noop */ } }, 0);
        };
        speechSynthesis.pause = () => { log('voz.pause'); pausada = true; };
        speechSynthesis.resume = () => { log('voz.resume'); pausada = false; };
    }
    // lo que ve el usuario: #pd-status y #pd-playpause (solo cuando cambian)
    const ult = {};
    const td = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
    Object.defineProperty(Node.prototype, 'textContent', { get: td.get, set(v) {
        if (this.id === 'pd-status' || this.id === 'pd-playpause') { const k = this.id; if (ult[k] !== v) { ult[k] = v; log((k === 'pd-status' ? 'estado ' : 'boton ') + v); } }
        return td.set.call(this, v); }, configurable: true });
    const sa = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name, v) {
        if (this.id === 'pd-playpause') { const k = 'attr:' + name; if (ult[k] !== String(v)) { ult[k] = String(v); log('boton ' + name + '=' + v); } }
        return sa.apply(this, arguments);
    };
}

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // sesión: servidor simulado con compuertas por PEDIDO (0, 1, …); `policy(k)` → { status, hold }
    async function sesion(esc) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); } });
        await ctx.addInitScript((process.env.NOSTRICT === '1' ? '' : 'window.AC_SM_STRICT = true; ') + 'window.AC_SM_LOG = [];'); // modo estricto SOLO en pruebas
        if (process.env.PC_MUTADO) await ctx.route(/\/podcast\.js/, (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(process.env.PC_MUTADO, 'utf8') }));
        if (esc.sinMaquina) await ctx.route(/state-machine\.js/, (r) => r.abort());
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        const srv = { gates: [], reqs: 0 };
        const audio = wavB64(esc.audioSec || 2.0);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            const k = srv.reqs++;
            const pol = (esc.policy || (() => ({})))(k) || {};
            if (pol.hold) await new Promise((res) => { srv.gates[k] = res; });
            const status = pol.status || 200;
            const audioK = pol.corrupto ? Buffer.from('esto no es audio, es texto suelto que ningún navegador sabe decodificar').toString('base64') : audio; // 200 con un audio que NO se decodifica
            return route.fulfill({ status, headers: Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' }),
                body: status === 200 ? JSON.stringify({ audio: audioK, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'no' }) });
        });
        await ctx.addInitScript('(' + instrumentar.toString() + ')(' + JSON.stringify({ triggers: esc.triggers || [], playRechaza: !!esc.playRechaza, pausaAlPlay: !!esc.pausaAlPlay, sinVoz: !!esc.sinVoz, vozMs: esc.vozMs || 0, voz: esc.voz || 'normal', arranqueMs: esc.arranqueMs || 0 }) + ')');
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1300);
        return { ctx, p, errs, srv };
    }

    // ───────── escenarios ─────────
    const FIN_LISTO = { re: '^estado 🏁', do: 'fin', delay: 250 }; // la lección terminó («Listo»)
    const FIN_ERROR = { re: '^estado ⚠️', do: 'fin', delay: 300 };  // no sonó nada: «No pude reproducir el audio»
    const ESC = [
        { id: 'sano', clase: 'real', triggers: [FIN_LISTO] },
        { id: 'pausa-y-seguir', clase: 'real', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'seguir', delay: 200 }, FIN_LISTO] },
        { id: 'R10b-toque-en-carga', clase: 'real', policy: (k) => (k === 0 ? { hold: true } : {}), liberar: { tras: '> toque', idx: 0, espera: 600 }, triggers: [{ re: '^estado ⏳', n: 1, do: 'toque', delay: 300 }, FIN_LISTO] },
        { id: 'control-cerrar-en-carga', clase: 'real', policy: (k) => (k === 0 ? { hold: true } : {}), liberar: { tras: '> cerrar', idx: 0, espera: 300 }, triggers: [{ re: '^estado ⏳', n: 1, do: 'cerrar', delay: 200 }, { re: '^resp 200', n: 1, do: 'fin', delay: 600 }] },
        { id: 'R10a-reanudar-y-siguiente', clase: 'sintético', policy: (k) => (k === 1 ? { hold: true } : {}), liberar: { tras: '> reanudarYSiguiente', idx: 1, espera: 800 }, triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'reanudarYSiguiente', delay: 200 }, FIN_LISTO] },
        { id: 'R10a-reanudar-y-cerrar', clase: 'sintético', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'reanudarYCerrar', delay: 200 }, { when: '> reanudarYCerrar', do: 'fin', delay: 1500 }] },
        { id: 'R10a-reanudar-y-elegir-otra', clase: 'sintético', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'reanudarYElegirOtra', delay: 200 }, { when: '> reanudarYElegirOtra', do: 'fin', delay: 1500 }] },
        { id: 'R10c-pausa-en-el-play', clase: 'real (AbortError real; ventana de un solo turno)', pausaAlPlay: true, vozMs: 1000, triggers: [{ when: 'audio.play→rechazado AbortError', do: 'seguir', delay: 600 }, FIN_LISTO] },
        { id: 'R10c-autoplay-bloqueado', clase: 'emulado (PROBAR EN UN DISPOSITIVO REAL: play() rechazado a la fuerza)', playRechaza: true, vozMs: 2500, triggers: [{ re: '^speak ', n: 1, do: 'pausa', delay: 300 }, { when: 'voz.cortada', do: 'seguir', delay: 300 }, FIN_LISTO] },
        { id: 'control-voz-del-sistema', clase: 'real (voz simulada)', policy: () => ({ status: 503 }), vozMs: 2500, triggers: [{ re: '^speak ', n: 1, do: 'pausa', delay: 300 }, { when: 'voz.cortada', do: 'seguir', delay: 300 }, FIN_LISTO] },
        { id: 'fallo-sin-voz', clase: 'real', policy: () => ({ status: 503 }), sinVoz: true, triggers: [{ when: 'resp 503', n: 1, do: 'fin', delay: 600 }] },
        { id: 'replay-y-cierre-tras-listo', clase: 'real', triggers: [{ re: '^estado 🏁', n: 1, do: 'toque', delay: 200 }, { re: '^estado 🏁', n: 2, do: 'cerrar', delay: 200 }, { when: '> cerrar', do: 'fin', delay: 400 }] },
        // ── voz del sistema POR FRASES (fix/podcast-voz-sistema): el servidor falla (503) y la voz del dispositivo se porta mal. `sinSonido`: NUNCA «Listo»; estado de error y ▶️ habilitado ──
        { id: 'voz-onend-inmediato', clase: 'real (voz simulada: onend al instante, sin onstart)', sinSonido: true, policy: () => ({ status: 503 }), voz: 'inmediato', triggers: [FIN_ERROR, FIN_LISTO] },
        { id: 'voz-onerror-language-unavailable', clase: 'real (voz simulada: onerror language-unavailable)', sinSonido: true, policy: () => ({ status: 503 }), voz: 'error:language-unavailable', triggers: [FIN_ERROR, FIN_LISTO] },
        { id: 'voz-onerror-synthesis-failed', clase: 'real (voz simulada: onerror synthesis-failed)', sinSonido: true, policy: () => ({ status: 503 }), voz: 'error:synthesis-failed', triggers: [FIN_ERROR, FIN_LISTO] },
        { id: 'voz-nunca-arranca', clase: 'real (voz simulada: no arranca ni termina; vigilancia de ~5 s)', sinSonido: true, policy: () => ({ status: 503 }), voz: 'muda', triggers: [FIN_ERROR, FIN_LISTO] },
        { id: 'voz-pausa-y-sigue-la-frase', clase: 'real (voz simulada)', policy: () => ({ status: 503 }), vozMs: 1500, triggers: [{ re: '^speak ', n: 1, do: 'pausa', delay: 400 }, { when: 'voz.cortada', do: 'seguir', delay: 300 }, FIN_LISTO] },
        { id: 'voz-pausa-entre-frases-sin-arrancar', clase: 'real (voz simulada: la 2.ª frase tarda en arrancar y se pausa >5 s)', policy: () => ({ status: 503 }), arranqueMs: 400, vozMs: 500, triggers: [{ when: 'voz.fin', n: 1, do: 'pausa', delay: 100 }, { when: 'voz.cortada', do: 'seguir', delay: 5600 }, FIN_LISTO] },
        { id: 'voz-sin-onstart', clase: 'real (voz simulada: habla y termina pero sin onstart)', policy: () => ({ status: 503 }), voz: 'sin-onstart', vozMs: 900, triggers: [FIN_LISTO] },
        { id: 'audio-corrupto-cae-a-la-voz', clase: 'real (el servidor responde 200 con un audio que no se decodifica; voz simulada)', policy: () => ({ corrupto: true }), vozMs: 400, triggers: [FIN_LISTO] },
        { id: 'error-y-reintento', clase: 'real (voz simulada)', sinSonido: true, reintento: true, policy: (k) => (k === 0 ? { status: 503 } : {}), voz: 'inmediato', triggers: [{ re: '^estado ⚠️', n: 1, do: 'toque', delay: 300 }, FIN_LISTO] },
        { id: 'siguiente-leccion', clase: 'real', triggers: [{ when: 'audio.playing', n: 1, do: 'siguiente', delay: 300 }, { re: '^estado 🏁', do: 'fin', delay: 250 }] }
    ];
    async function correr(esc, opts) {
        const { ctx, p, errs, srv } = await sesion(Object.assign({}, esc, opts || {}));
        await p.evaluate(() => window.__mark('inicio'));
        await p.evaluate(() => { document.getElementById('btn-podcast').click(); }); await sleep(p, 500);              // abre el Podcast (selector de lecciones)
        await p.evaluate(() => { document.querySelector('.pd-item[data-pd-id]').click(); });                             // elige la 1.ª: ARRANCA SOLA (openLesson → togglePlayPause)
        if (esc.liberar) { // una respuesta quedó retenida: se suelta tras el evento indicado (la marca '# liberar' queda en la traza)
            await p.waitForFunction((e) => window.__E.includes(e), esc.liberar.tras, { timeout: 15000 });
            await sleep(p, esc.liberar.espera || 300);
            await p.evaluate(() => window.__mark('liberar'));
            const g = srv.gates[esc.liberar.idx]; if (g) g();
        }
        await p.waitForFunction(() => window.__fin === true, null, { timeout: 60000 }).catch(() => { });
        await sleep(p, 300);
        const traza = await p.evaluate(() => window.__E.slice());
        const sm = await p.evaluate(() => ({ log: (window.AC_SM_LOG || []).slice(), maquinas: Object.keys(window.AC_MACHINES || {}) }));
        await ctx.close();
        return { traza, sm, errs, pedidos: srv.reqs };
    }
    // R10b: un toque en ▶️ MIENTRAS carga no lanza un segundo pedido: tras «> toque» no hay ningún `fetch` más y el total es UN pedido
    function pedidosTrasElToque(traza) { const i = traza.indexOf('> toque'); return i === -1 ? -1 : traza.slice(i).filter((e) => /^fetch /.test(e)).length; }
    // coherencia durante la carga: mientras el estado dice «⏳ Preparando…» el botón dice «⏳» y está inerte (aria-disabled=true); fuera de la carga, no
    function botonCoherente(traza) {
        const mal = []; let est = '', btn = '', dis = 'false';
        traza.forEach((e, i) => {
            if (/^estado /.test(e)) {
                if (est.startsWith('⏳') && !e.startsWith('estado ⏳') && (btn !== '⏳' || dis !== 'true')) mal.push({ en: i, evento: 'salió de la carga con el botón «' + btn + '» aria-disabled=' + dis });
                est = e.slice(7);
            } else if (/^boton aria-disabled=/.test(e)) dis = e.split('=')[1];
            else if (/^boton aria-label=/.test(e)) { /* se mira con el texto */ }
            else if (/^boton /.test(e)) btn = e.slice(6);
        });
        return mal;
    }
    // ── aserciones con NOMBRE de «no suena nada» (en rojo contra el podcast.js anterior: ahí terminaba en «Listo» con el botón ▶️) ──
    const estados = (t) => t.filter((e) => /^estado /.test(e)).map((e) => e.slice(7));
    const ultimoBoton = (t) => { const b = t.filter((e) => /^boton /.test(e) && !/^boton (aria-|attr)/.test(e)); return b.length ? b[b.length - 1].slice(6) : ''; };
    const ultimoDis = (t) => { const b = t.filter((e) => /^boton aria-disabled=/.test(e)); return b.length ? b[b.length - 1].split('=')[1] : ''; };
    function difer(a, c) { for (let i = 0; i < Math.max(a.length, c.length); i++) if (a[i] !== c[i]) return { en: i, oro: a[i], ahora: c[i] }; return null; }

    const oro = RECORD ? {} : JSON.parse(fs.readFileSync(GOLD, 'utf8'));
    const SOLO = process.env.SOLO ? process.env.SOLO.split(',') : null;
    const nuevo = (RECORD && SOLO) ? JSON.parse(fs.readFileSync(GOLD, 'utf8')) : {};
    const MAQ = ['podcast.reproduccion'];
    for (const esc of ESC) {
        if (SOLO && !SOLO.includes(esc.id)) continue;
        const veces = RECORD ? (process.env.VECES ? +process.env.VECES : 3) : 1;
        const trazas = []; let r;
        for (let i = 0; i < veces; i++) { r = await correr(esc); trazas.push(JSON.stringify(r.traza)); }
        if (RECORD) {
            ok(trazas.every((t) => t === trazas[0]), '[' + esc.id + ' · ' + esc.clase + '] grabación estable: ' + veces + ' corridas dan la MISMA traza (' + r.traza.length + ' eventos)');
            nuevo[esc.id] = r.traza;
        } else {
            const g = oro[esc.id], igual = !!g && JSON.stringify(g) === JSON.stringify(r.traza);
            ok(igual, '[' + esc.id + ' · ' + esc.clase + '] la traza por orden de eventos es IDÉNTICA al oro (' + r.traza.length + ' eventos)' + (igual ? '' : ' → primera diferencia: ' + JSON.stringify(difer(g || [], r.traza))));
            ok(MAQ.every((k) => r.sm.maquinas.includes(k)), '[' + esc.id + '] la máquina del Podcast está registrada (state-machine.js cargó antes que podcast.js)');
            ok(r.sm.log.length === 0, '[' + esc.id + '] modo estricto: ninguna transición sin declarar (AC_SM_LOG vacío)' + (r.sm.log.length ? ' → ' + JSON.stringify(r.sm.log.slice(0, 3)) : ''));
            ok(r.errs.filter((x) => !/localStorage/.test(x)).length === 0, '[' + esc.id + '] sin errores JS ' + r.errs.join('|'));
            if (esc.id === 'R10b-toque-en-carga') { // R10b: el toque durante la carga NO reinicia el pedido
                ok(r.pedidos === 1 && pedidosTrasElToque(r.traza) === 0, '[R10b] un toque en ▶️ mientras carga NO lanza un segundo pedido (pedidos al servidor: ' + r.pedidos + '; «fetch» tras el toque: ' + pedidosTrasElToque(r.traza) + ')');
            }
            if (esc.sinSonido) { // nada suena: NO «Listo»; estado real y ▶️ habilitado
                const est = estados(r.traza), irA = r.traza.indexOf('> reintento');
                if (!esc.reintento) {
                    ok(!est.some((e) => e.startsWith('🏁')), '[' + esc.id + '] NO pasa a «Listo» (no sonó nada)');
                    ok(est.length && est[est.length - 1].startsWith('⚠️ No pude reproducir el audio'), '[' + esc.id + '] el estado final es «No pude reproducir el audio» (final: «' + (est[est.length - 1] || '') + '»)');
                    ok(ultimoBoton(r.traza) === '▶️' && ultimoDis(r.traza) === 'false', '[' + esc.id + '] el botón vuelve a ▶️ y está habilitado (botón «' + ultimoBoton(r.traza) + '», aria-disabled=' + ultimoDis(r.traza) + ')');
                } else { // error y reintento: tras el error, un toque vuelve a pedir y, con el servidor sano, suena y llega a «Listo» de verdad
                    ok(est.some((e) => e.startsWith('⚠️ No pude reproducir el audio')), '[' + esc.id + '] primero se ve «No pude reproducir el audio»');
                    ok(r.pedidos === 2 && r.traza.includes('audio.playing') && est[est.length - 1].startsWith('🏁'), '[' + esc.id + '] un toque en ▶️ vuelve a pedir la lección (pedidos: ' + r.pedidos + ') y suena de verdad antes de «Listo»');
                }
            }
            if (esc.id === 'voz-pausa-y-sigue-la-frase') { // pausa por frase: se corta la que suena y «Seguir» la retoma DESDE SU INICIO (misma frase), sin pasar por el error
                const sp = r.traza.filter((e) => /^speak /.test(e));
                ok(sp.length >= 2 && sp[0] === sp[1] && r.traza.indexOf('cancel') < r.traza.lastIndexOf(sp[0]), '[' + esc.id + '] «Seguir» retoma la MISMA frase desde el inicio (' + sp[0] + ' → ' + sp[1] + ')');
                ok(!estados(r.traza).some((e) => e.startsWith('⚠️')) && estados(r.traza).some((e) => e === '⏸ En pausa'), '[' + esc.id + '] la pausa por frase no cae al error (pasa por «En pausa» y termina en «Listo»)');
            }
            if (esc.id === 'voz-pausa-entre-frases-sin-arrancar') { // la vigilancia de arranque se apaga al pausar: 5,6 s en pausa y NO hay error
                ok(!estados(r.traza).some((e) => e.startsWith('⚠️')) && estados(r.traza)[estados(r.traza).length - 1].startsWith('🏁'), '[' + esc.id + '] pausada >5 s antes de arrancar la 2.ª frase: no se da por muda y al «Seguir» termina en «Listo»');
            }
            if (esc.id === 'voz-sin-onstart') { // un motor sin onstart que SÍ habló: pasa por «Reproduciendo» (botón ⏸ habilitado) y termina en «Listo»; nunca queda en «⏳» ni en error
                const est = estados(r.traza), iR = est.findIndex((e) => e.startsWith('▶ Reproduciendo')), iL = est.findIndex((e) => e.startsWith('🏁'));
                ok(iR !== -1 && iL !== -1 && iR < iL && !est.some((e) => e.startsWith('⚠️')), '[' + esc.id + '] pasa por «Reproduciendo» antes de «Listo» y no cae al error (estados: ' + JSON.stringify(est.filter((e, i) => i === 0 || e !== est[i - 1])) + ')');
                ok(r.traza.includes('boton ⏸'), '[' + esc.id + '] mientras habla el botón es «⏸» (no queda en «⏳» inerte)');
            }
            if (esc.id === 'audio-corrupto-cae-a-la-voz') { // antes: el error del <audio> mandaba a «Listo» sin sonar
                const iL = r.traza.findIndex((e) => /^estado 🏁/.test(e)), iV = r.traza.indexOf('voz.start');
                ok(iV !== -1 && iV < iL, '[' + esc.id + '] el audio que no se decodifica cae a la voz del sistema y SUENA antes de «Listo»');
            }
            if (esc.id === 'R10c-pausa-en-el-play') { // lo que antes era el defecto R10c-real: pausó, y la voz NO habla hasta el «Seguir»
                const iS = r.traza.indexOf('> seguir'), ant = r.traza.slice(0, iS === -1 ? 0 : iS);
                ok(iS !== -1 && !ant.some((e) => /^speak /.test(e)), '[R10c-real] pausado en el mismo turno que el primer play(): la voz del sistema NO habla antes del «Seguir»');
            }
            { const mal = botonCoherente(r.traza); // en TODOS los escenarios
              ok(mal.length === 0, '[' + esc.id + '] durante la carga el botón dice «⏳» y está inerte (aria-disabled=true)' + (mal.length ? ' → ' + JSON.stringify(mal.slice(0, 2)) : '')); }
        }
    }
    // el Podcast sigue sonando y pausando con state-machine.js BLOQUEADO (la máquina de respaldo no valida)
    if (!RECORD && !SOLO) {
        for (const id of ['sano', 'pausa-y-seguir', 'control-voz-del-sistema', 'R10b-toque-en-carga', 'voz-onend-inmediato', 'voz-onerror-synthesis-failed', 'voz-pausa-y-sigue-la-frase']) {
            const r = await correr(ESC.find((e) => e.id === id), { sinMaquina: true });
            ok(JSON.stringify(oro[id]) === JSON.stringify(r.traza), '[sin-maquina · ' + id + '] con state-machine.js bloqueado la traza es IDÉNTICA al oro' + (JSON.stringify(oro[id]) !== JSON.stringify(r.traza) ? ' → ' + JSON.stringify(difer(oro[id] || [], r.traza)) : ''));
            ok(r.sm.maquinas.length === 0, '[sin-maquina · ' + id + '] no hay máquinas registradas (el archivo no cargó)');
        }
    }
    if (RECORD) { fs.writeFileSync(GOLD, JSON.stringify(nuevo, null, 1)); console.log('oro grabado: ' + Object.keys(nuevo).length + ' escenarios en ' + GOLD); }
    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
