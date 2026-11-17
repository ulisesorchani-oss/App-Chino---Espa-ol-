// Lector de texto libre (reader.js): PRUEBA DE ORO POR ORDEN DE EVENTOS. Igual que tests/escuchar-todo-oro.test.js: cada escenario graba, con UN solo reloj
// (dentro de la página), lo observable: pedidos y respuestas de /api/tts, play/pause/src/ended/playing del <audio> del Lector, speak/cancel/pause/resume
// de la voz del sistema, el texto del botón con el estado entre corchetes, el aviso rojo y la voz que suena. NO guarda tiempos.
// El oro (tests/data/lector-oro.json) se grabó con el código ANTERIOR a las máquinas de estado: la formalización tiene que dar la MISMA traza.
//   GOLDEN_RECORD=1 → graba/pisa el oro (3 corridas por escenario, deben dar la MISMA traza). SOLO=a,b limita; con GOLDEN_RECORD agrega/pisa solo esos.
//   LL_MUTADO=<archivo> sirve ese reader.js en lugar del del repo; NOSTRICT=1 apaga el modo estricto (producción) — los usa tests/lector-mutaciones.test.js
// Los escenarios «R2-*» documentan el defecto R2 (pausa mientras carga un trozo): hoy el audio suena igual estando en pausa.
const fs = require('fs');
const path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

const GOLD = path.join(__dirname, 'data', 'lector-oro.json');
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
// 4 trozos (de ~150 caracteres): 25 oraciones de ~20 caracteres, una por línea
const TEXTO = Array.from({ length: 25 }, (_, i) => '这是第' + (i + 1) + '句话，我们一起练习汉语。').join('\n');

// ───────── instrumentación que corre DENTRO de la página (un solo reloj) ─────────
function instrumentar(cfg) {
    const E = window.__E = [];
    const log = window.__log = (s) => { E.push(s); disparar(s); };
    const idx = (t) => { try { const i = readerChunks.indexOf(t); return i === -1 ? '?' : String(i); } catch (e) { return '?'; } };
    const click = (sel) => { const e = document.querySelector(sel); if (e) e.click(); };
    const ACC = {
        pausa: () => click('#btn-reader-play'), seguir: () => click('#btn-reader-play'), parar: () => stopReader(), limpiar: () => clearReader(),
        global: () => stopGlobalAudio(), leer: () => { document.getElementById('reader-input').value = window.__texto; toggleReaderPlay(); }, fin: () => { window.__fin = true; }
    };
    const COND = { pausado: () => window.__estado && window.__estado() === 'paused' };
    const trig = (cfg.triggers || []).map((t) => Object.assign({ visto: 0, usado: false }, t));
    function disparar(s) {
        if (!E.includes('# inicio')) return; // nada se dispara antes de que arranque la grabación
        trig.forEach((t) => {
            if (t.usado || !(t.re ? new RegExp(t.re).test(s) : t.when === s)) return;
            t.visto++; if (t.visto < (t.n || 1)) return;
            t.usado = true;
            const f = () => { if (t.cond && !COND[t.cond]()) return; log('> ' + t.do); (ACC[t.do] || (() => { }))(); };
            if (t.delay) setTimeout(f, t.delay); else queueMicrotask(f);
        });
    }
    window.__mark = (m) => log('# ' + m);
    // fetch (solo /api/tts): pedido y respuesta, con el índice del trozo
    const f0 = window.fetch;
    window.fetch = function (u, o) {
        let i = null;
        try {
            const url = String(u);
            if (/\/api\/tts/.test(url)) {
                let text = '';
                if (o && o.body) { try { text = JSON.parse(o.body).text || ''; } catch (e) { /* sin cuerpo */ } } else text = new URL(url, location.href).searchParams.get('text') || '';
                i = idx(text); log('fetch ' + ((o && o.method) || 'GET') + ' L' + i);
            }
        } catch (e) { /* noop */ }
        const r = f0.apply(this, arguments);
        if (i === null) return r;
        return r.then((x) => { log('resp L' + i + ' ' + x.status); return x; }, (e) => { log('resp L' + i + ' red'); throw e; });
    };
    // <audio> del Lector
    const proto = HTMLMediaElement.prototype;
    const play0 = proto.play, pause0 = proto.pause;
    const srcD = Object.getOwnPropertyDescriptor(proto, 'src');
    const esLector = (el) => { try { return el === readerAudio; } catch (e) { return false; } };
    const dur = (s) => (s || '').slice(0, 5) === 'blob:' ? 'blob' : (s ? 'otra' : 'vacia');
    proto.play = function () {
        if (!esLector(this)) return play0.apply(this, arguments);
        if (!this.__ev) { this.__ev = 1; this.addEventListener('ended', () => log('audio.ended'), true); this.addEventListener('error', () => log('audio.error'), true); this.addEventListener('playing', () => log('audio.playing'), true); } // en captura: se registra ANTES de que reader.js reaccione
        log('audio.play ' + dur(this.src));
        const r = play0.apply(this, arguments);
        if (r && r.then) r.then(() => log('audio.play→ok'), (e) => log('audio.play→rechazado ' + (e && e.name)));
        return r;
    };
    proto.pause = function () { if (esLector(this)) log('audio.pause'); return pause0.apply(this, arguments); };
    Object.defineProperty(proto, 'src', { get: srcD.get, set(v) { if (esLector(this)) log('audio.src=' + dur(v)); return srcD.set.call(this, v); }, configurable: true });
    const rm0 = Element.prototype.removeAttribute;
    Element.prototype.removeAttribute = function (name) { if (name === 'src' && this instanceof HTMLMediaElement && esLector(this)) log('audio.src=quitado'); return rm0.apply(this, arguments); };
    // voz del sistema simulada
    let hablando = null, pausada = false;
    const fin = (u, tipo) => { if (hablando !== u) return; hablando = null; try { if (tipo === 'end') u.onend && u.onend({}); else u.onerror && u.onerror({ error: tipo }); } catch (e) { /* noop */ } };
    if (cfg.sinVoz) { try { delete window.speechSynthesis; } catch (e) { /* noop */ } }
    if (window.speechSynthesis) {
        speechSynthesis.getVoices = function () { return []; };
        speechSynthesis.speak = function (u) {
            log('speak L' + idx(u.text)); hablando = u; pausada = false;
            setTimeout(() => { if (hablando !== u) return; try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } log('voz.start L' + idx(u.text)); }, 15);
            const terminar = () => { if (hablando !== u) return; if (pausada) { u.__pend = true; return; } log('voz.end L' + idx(u.text)); fin(u, 'end'); };
            setTimeout(terminar, 90); u.__terminar = terminar;
        };
        speechSynthesis.cancel = function () { log('cancel'); const u = hablando; if (u) setTimeout(() => { if (hablando === u) { log('voz.canceled'); fin(u, 'canceled'); } }, 0); };
        speechSynthesis.pause = function () { log('voz.pause'); if (!cfg.vozIgnoraPausa) pausada = true; }; // vozIgnoraPausa: un motor cuyo pause() no pausa (la voz sigue y termina sola)
        speechSynthesis.resume = function () { log('voz.resume'); pausada = false; const u = hablando; if (u && u.__pend) { u.__pend = false; setTimeout(u.__terminar, 5); } };
    }
    // texto del botón del Lector (con el estado entre corchetes)
    const td = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
    Object.defineProperty(Node.prototype, 'textContent', { get: td.get, set(v) { if (this.id === 'btn-reader-play') log('btn ' + v + ' [' + (window.__estado ? window.__estado() : '?') + ']'); return td.set.call(this, v); }, configurable: true });
}

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // sesión: servidor simulado con compuertas por TROZO; `policy({idx, k}, intento)` → { status, hold }
    async function sesion(esc) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); } });
        await ctx.addInitScript((process.env.NOSTRICT === '1' ? '' : 'window.AC_SM_STRICT = true; ') + 'window.AC_SM_LOG = [];'); // modo estricto SOLO en pruebas
        if (process.env.LL_MUTADO) await ctx.route(/\/reader\.js/, (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(process.env.LL_MUTADO, 'utf8') }));
        if (esc.sinMaquina) await ctx.route(/state-machine\.js/, (r) => r.abort());
        const p = await ctx.newPage(); const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        const srv = { gates: new Map(), distintos: [], intentos: new Map(), reqs: 0 };
        const audio = wavB64(esc.audioSec || 0.5);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let text = '';
            if (method === 'GET') text = new URL(req.url()).searchParams.get('text') || '';
            else { try { text = JSON.parse(req.postData() || '{}').text || ''; } catch (e) { /* sin cuerpo */ } }
            if (!srv.distintos.includes(text)) srv.distintos.push(text);
            const idx = srv.distintos.indexOf(text), intento = srv.intentos.get(idx) || 0; srv.intentos.set(idx, intento + 1);
            const pol = (esc.policy || (() => ({})))({ idx, k: srv.reqs++ }, intento) || {};
            if (pol.hold) await new Promise((res) => srv.gates.set(idx, res));
            const status = pol.status || 200;
            const body = status === 200 ? JSON.stringify({ audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'tts no disponible', codigo: 'sin_audio' });
            return route.fulfill({ status, headers: Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' }), body });
        });
        await ctx.addInitScript('(' + instrumentar.toString() + ')(' + JSON.stringify({ triggers: esc.triggers || [], sinVoz: !!esc.sinVoz, vozIgnoraPausa: !!esc.vozIgnoraPausa }) + ')');
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1300);
        await p.evaluate(() => {
            window.__estado = () => readerPlayState; // se lee igual con la variable de antes y con el getter de las máquinas
            const nt = window.notifyTtsFallback; window.notifyTtsFallback = function () { window.__log('aviso-rojo'); return nt.apply(this, arguments); };
        });
        return { ctx, p, errs, srv };
    }

    // ───────── escenarios ─────────
    const FIN_IDLE = { re: '^btn 🔊 Leer', n: 2, do: 'fin', delay: 200 }; // el botón vuelve al reposo (la 1.ª vez es el stopReader() con el que arranca toggleReaderPlay)
    const ESC = [
        { id: 'sano', triggers: [FIN_IDLE] },
        { id: 'pausa-seguir-parar', triggers: [{ when: 'audio.playing', n: 1, do: 'pausa' }, { when: 'audio.pause', do: 'seguir', delay: 200 }, { when: 'audio.playing', n: 3, do: 'parar' }, FIN_IDLE] },
        { id: 'R2-pausa-en-carga', policy: ({ idx }) => (idx === 0 ? { hold: true } : {}), liberar: { tras: '> pausa', idx: 0 }, triggers: [{ when: 'fetch GET L0', do: 'pausa', delay: 30 }, { re: '^resp L0', do: 'seguir', delay: 400 }, FIN_IDLE] },
        { id: 'R2-pausa-en-hueco', policy: ({ idx }) => (idx === 1 ? { hold: true } : {}), liberar: { tras: '> pausa', idx: 1 }, triggers: [{ re: '^btn ⏳', n: 2, do: 'pausa' }, { re: '^resp L1', do: 'seguir', delay: 400 }, FIN_IDLE] },
        { id: 'R2-continuar-antes-de-llegar', policy: ({ idx }) => (idx === 1 ? { hold: true } : {}), liberar: { tras: '> seguir', idx: 1, espera: 300 }, triggers: [{ re: '^btn ⏳', n: 2, do: 'pausa' }, { when: '> pausa', do: 'seguir', delay: 200 }, FIN_IDLE] },
        { id: 'fallo-bache', policy: ({ idx }, intento) => (idx === 0 && intento === 0 ? { status: 503 } : {}), triggers: [FIN_IDLE] },
        { id: 'fallo-voz', policy: () => ({ status: 503 }), triggers: [FIN_IDLE] },
        { id: 'pausa-en-voz-del-sistema', policy: () => ({ status: 503 }), triggers: [{ when: 'speak L0', do: 'pausa', delay: 50 }, { when: 'voz.pause', do: 'seguir', delay: 200 }, FIN_IDLE] },
        { id: 'R2-pausa-sin-voz', sinVoz: true, policy: () => ({ status: 503 }), triggers: [{ re: '^btn ⏳', n: 1, do: 'pausa', delay: 20 }, { when: '> pausa', do: 'seguir', delay: 2500, cond: 'pausado' }, FIN_IDLE] },
        { id: 'mixto-un-trozo-falla', policy: ({ idx }) => (idx === 1 ? { status: 503 } : {}), triggers: [FIN_IDLE] },
        { id: 'corte-en-carga-y-nueva-lectura', policy: ({ idx }, intento) => (idx === 0 && intento === 0 ? { hold: true } : {}), liberar: { tras: '> leer', idx: 0, espera: 400 }, triggers: [{ when: 'fetch GET L0', n: 1, do: 'parar', delay: 30 }, { when: '> parar', do: 'leer', delay: 50 }, { re: '^btn 🔊 Leer', n: 4, do: 'fin', delay: 200 }] }, // el 4.º «🔊 Leer»: arranque, corte, arranque de la nueva y fin de la nueva
        { id: 'R2-pausa-en-carga-con-voz', policy: () => ({ status: 503 }), triggers: [{ re: '^btn ⏳', n: 2, do: 'pausa', delay: 20 }, { when: '> pausa', do: 'seguir', delay: 700, cond: 'pausado' }, FIN_IDLE] },
        { id: 'pausa-voz-ignora-pausa', vozIgnoraPausa: true, policy: () => ({ status: 503 }), triggers: [{ when: 'speak L3', do: 'pausa', delay: 30 }, FIN_IDLE] },
        { id: 'corte-limpiar', triggers: [{ when: 'audio.playing', n: 2, do: 'limpiar' }, FIN_IDLE] },
        { id: 'corte-stopReader', triggers: [{ when: 'audio.playing', n: 2, do: 'parar' }, FIN_IDLE] },
        { id: 'corte-global', triggers: [{ when: 'audio.playing', n: 2, do: 'global' }, FIN_IDLE] }
    ];
    async function correr(esc, opts) {
        const { ctx, p, errs, srv } = await sesion(Object.assign({}, esc, opts || {}));
        await p.evaluate(() => window.__mark('inicio'));
        await p.evaluate((t) => { window.__texto = t; document.getElementById('reader-input').value = t; toggleReaderPlay(); }, TEXTO);
        if (esc.liberar) { // una respuesta quedó retenida: se suelta tras el evento indicado (la marca '# liberar' queda en la traza)
            await p.waitForFunction((e) => window.__E.includes(e), esc.liberar.tras, { timeout: 15000 });
            await sleep(p, esc.liberar.espera || 300);
            await p.evaluate(() => window.__mark('liberar'));
            const g = srv.gates.get(esc.liberar.idx); if (g) g();
        }
        await p.waitForFunction(() => window.__fin === true, null, { timeout: 60000 }).catch(() => { });
        await sleep(p, 300);
        const traza = await p.evaluate(() => window.__E.slice());
        const sm = await p.evaluate(() => ({ log: (window.AC_SM_LOG || []).slice(), maquinas: Object.keys(window.AC_MACHINES || {}) }));
        await ctx.close();
        return { traza, sm, errs };
    }
    // trozos que suenan o hablan DESPUÉS de que el botón pasó a «Continuar» y ANTES de que alguien siga (> seguir): lo que R2 no permite
    function sonidoEnPausa(traza) {
        const mal = []; let pausada = false;
        traza.forEach((e, i) => {
            if (/^btn ▶ Continuar/.test(e)) pausada = true;
            else if (e === '> seguir') pausada = false;
            else if (pausada && /^(audio\.play |audio\.playing|speak |voz\.start|aviso-rojo|btn ⏸ Pausar)/.test(e)) mal.push({ en: i, evento: e });
        });
        return mal;
    }
    // cada voz.pause se cierra con voz.resume o cancel ANTES de la próxima voz (el simulador no puede mostrar una voz «trabada»: solo se exige el par)
    function vozPareada(traza) {
        const mal = []; let abierta = false;
        traza.forEach((e, i) => {
            if (e === 'voz.pause') abierta = true;
            else if (e === 'voz.resume' || e === 'cancel') abierta = false;
            else if (abierta && /^speak /.test(e)) mal.push({ en: i, evento: e });
        });
        return mal;
    }
    function difer(a, c) { for (let i = 0; i < Math.max(a.length, c.length); i++) if (a[i] !== c[i]) return { en: i, oro: a[i], ahora: c[i] }; return null; }

    const oro = RECORD ? {} : JSON.parse(fs.readFileSync(GOLD, 'utf8'));
    const SOLO = process.env.SOLO ? process.env.SOLO.split(',') : null;
    const nuevo = (RECORD && SOLO) ? JSON.parse(fs.readFileSync(GOLD, 'utf8')) : {};
    const MAQ = ['lector.reproduccion', 'lector.espera', 'lector.motor'];
    for (const esc of ESC) {
        if (SOLO && !SOLO.includes(esc.id)) continue;
        const veces = RECORD ? (process.env.VECES ? +process.env.VECES : 3) : 1;
        const trazas = []; let r;
        for (let i = 0; i < veces; i++) { r = await correr(esc); trazas.push(JSON.stringify(r.traza)); }
        if (RECORD) {
            ok(trazas.every((t) => t === trazas[0]), '[' + esc.id + '] grabación estable: ' + veces + ' corridas dan la MISMA traza (' + r.traza.length + ' eventos)');
            nuevo[esc.id] = r.traza;
        } else {
            const g = oro[esc.id], igual = !!g && JSON.stringify(g) === JSON.stringify(r.traza);
            ok(igual, '[' + esc.id + '] la traza por orden de eventos es IDÉNTICA al oro (' + r.traza.length + ' eventos)' + (igual ? '' : ' → primera diferencia: ' + JSON.stringify(difer(g || [], r.traza))));
            ok(MAQ.every((k) => r.sm.maquinas.includes(k)), '[' + esc.id + '] las 3 máquinas del Lector están registradas (state-machine.js cargó antes que reader.js)');
            ok(r.sm.log.length === 0, '[' + esc.id + '] modo estricto: ninguna transición sin declarar (AC_SM_LOG vacío)' + (r.sm.log.length ? ' → ' + JSON.stringify(r.sm.log.slice(0, 3)) : ''));
            ok(r.errs.filter((x) => !/localStorage/.test(x)).length === 0, '[' + esc.id + '] sin errores JS ' + r.errs.join('|'));
            if (esc.id === 'R2-pausa-en-carga-con-voz') {
                const mal = vozPareada(r.traza);
                ok(mal.length === 0, '[' + esc.id + '] cada voz.pause se cierra con voz.resume o cancel antes de la próxima voz' + (mal.length ? ' → ' + JSON.stringify(mal.slice(0, 4)) : ''));
            }
            if (['R2-pausa-en-carga', 'R2-pausa-en-hueco', 'R2-pausa-sin-voz', 'R2-pausa-en-carga-con-voz'].includes(esc.id)) { // el defecto R2 NO se tolera: en pausa no suena, no habla, no avisa
                const mal = sonidoEnPausa(r.traza);
                ok(mal.length === 0, '[' + esc.id + '] en pausa (botón «Continuar») no suena ni habla nada ni cambia el botón' + (mal.length ? ' → ' + JSON.stringify(mal.slice(0, 4)) : ''));
            }
        }
    }
    // el Lector sigue sonando con state-machine.js BLOQUEADO (la máquina de respaldo no valida)
    if (!RECORD && !SOLO) {
        for (const id of ['sano', 'pausa-seguir-parar', 'fallo-voz']) {
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
