// Podcast (podcast.js): PRUEBA DE ORO POR ORDEN DE EVENTOS. Como tests/lector-oro.test.js y tests/escuchar-todo-oro.test.js: cada escenario graba, con UN solo reloj
// (dentro de la página), lo observable: pedidos y respuestas de /api/tts, play/pause/playing/ended/error del <audio> de la lección, speak/cancel/pause/resume de la
// voz del sistema, y lo que ve el usuario (texto de #pd-status, texto y atributos de #pd-playpause). NO guarda tiempos.
// El oro (tests/data/podcast-oro.json) se grabó con el código ANTERIOR a la máquina de estados: la formalización tiene que dar la MISMA traza.
//   GOLDEN_RECORD=1 → graba/pisa el oro (3 corridas por escenario: deben dar la MISMA traza). SOLO=a,b limita; con GOLDEN_RECORD agrega/pisa solo esos.
//   PC_MUTADO=<archivo> sirve ese podcast.js en lugar del del repo · NOSTRICT=1 apaga el modo estricto.
// CLASE de cada escenario (qué tan «real» es lo que muestra):
//   real       → el navegador (Chromium) y el audio son de verdad; solo el servidor y la voz del sistema son simulados
//   sintético  → dos toques en la MISMA tarea (algo que una persona no puede hacer): muestra el estado interno, no un camino alcanzable
//   emulado    → se FUERZA el rechazo de play() (autoplay bloqueado, NotAllowedError): hay que probarlo en un dispositivo real
// Defectos conocidos (R10 del informe de máquinas de estado): R10a, R10b, R10c-real y R10c-emulado; se documentan en la tabla de podcast.js y en docs/maquinas-de-estado.md.
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
    // voz del sistema simulada
    let hablando = null, pausada = false;
    if (cfg.sinVoz) { try { delete window.speechSynthesis; } catch (e) { /* noop */ } }
    if (window.speechSynthesis) {
        speechSynthesis.getVoices = () => [];
        speechSynthesis.speak = (u) => { log('speak'); hablando = u; pausada = false; setTimeout(() => { if (hablando === u && !pausada) { log('voz.fin'); hablando = null; try { u.onend && u.onend({}); } catch (e) { /* noop */ } } }, cfg.vozMs || 700); };
        speechSynthesis.cancel = () => { log('cancel'); hablando = null; };
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
            return route.fulfill({ status, headers: Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' }),
                body: status === 200 ? JSON.stringify({ audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'no' }) });
        });
        await ctx.addInitScript('(' + instrumentar.toString() + ')(' + JSON.stringify({ triggers: esc.triggers || [], playRechaza: !!esc.playRechaza, pausaAlPlay: !!esc.pausaAlPlay, sinVoz: !!esc.sinVoz, vozMs: esc.vozMs || 0 }) + ')');
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1300);
        return { ctx, p, errs, srv };
    }

    // ───────── escenarios ─────────
    const FIN_LISTO = { re: '^estado 🏁', do: 'fin', delay: 250 }; // la lección terminó («Listo»)
    const ESC = [
        { id: 'sano', clase: 'real', triggers: [FIN_LISTO] },
        { id: 'pausa-y-seguir', clase: 'real', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'seguir', delay: 200 }, FIN_LISTO] },
        { id: 'R10b-toque-en-carga', clase: 'real', policy: (k) => (k === 0 ? { hold: true } : {}), liberar: { tras: '> toque', idx: 0, espera: 600 }, triggers: [{ re: '^estado ⏳', n: 1, do: 'toque', delay: 300 }, FIN_LISTO] },
        { id: 'control-cerrar-en-carga', clase: 'real', policy: (k) => (k === 0 ? { hold: true } : {}), liberar: { tras: '> cerrar', idx: 0, espera: 300 }, triggers: [{ re: '^estado ⏳', n: 1, do: 'cerrar', delay: 200 }, { re: '^resp 200', n: 1, do: 'fin', delay: 600 }] },
        { id: 'R10a-reanudar-y-siguiente', clase: 'sintético', policy: (k) => (k === 1 ? { hold: true } : {}), liberar: { tras: '> reanudarYSiguiente', idx: 1, espera: 800 }, triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'reanudarYSiguiente', delay: 200 }, FIN_LISTO] },
        { id: 'R10a-reanudar-y-cerrar', clase: 'sintético', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'reanudarYCerrar', delay: 200 }, { when: '> reanudarYCerrar', do: 'fin', delay: 1500 }] },
        { id: 'R10a-reanudar-y-elegir-otra', clase: 'sintético', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa', delay: 200 }, { when: 'audio.pause', do: 'reanudarYElegirOtra', delay: 200 }, { when: '> reanudarYElegirOtra', do: 'fin', delay: 1500 }] },
        { id: 'R10c-pausa-en-el-play', clase: 'real (AbortError real; ventana de un solo turno)', pausaAlPlay: true, vozMs: 1000, triggers: [{ re: '^voz\\.fin', n: 1, do: 'fin', delay: 300 }] },
        { id: 'R10c-autoplay-bloqueado', clase: 'emulado (PROBAR EN UN DISPOSITIVO REAL: play() rechazado a la fuerza)', playRechaza: true, vozMs: 2500, triggers: [{ when: 'speak', n: 1, do: 'pausa', delay: 300 }, FIN_LISTO] },
        { id: 'control-voz-del-sistema', clase: 'real (voz simulada)', policy: () => ({ status: 503 }), vozMs: 2500, triggers: [{ when: 'speak', n: 1, do: 'pausa', delay: 300 }, { when: 'voz.pause', do: 'seguir', delay: 300 }, FIN_LISTO] },
        { id: 'fallo-sin-voz', clase: 'real', policy: () => ({ status: 503 }), sinVoz: true, triggers: [{ when: 'resp 503', n: 1, do: 'fin', delay: 600 }] },
        { id: 'replay-y-cierre-tras-listo', clase: 'real', triggers: [{ re: '^estado 🏁', n: 1, do: 'toque', delay: 200 }, { re: '^estado 🏁', n: 2, do: 'cerrar', delay: 200 }, { when: '> cerrar', do: 'fin', delay: 400 }] },
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
        }
    }
    // el Podcast sigue sonando y pausando con state-machine.js BLOQUEADO (la máquina de respaldo no valida)
    if (!RECORD && !SOLO) {
        for (const id of ['sano', 'pausa-y-seguir', 'control-voz-del-sistema', 'R10b-toque-en-carga']) {
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
