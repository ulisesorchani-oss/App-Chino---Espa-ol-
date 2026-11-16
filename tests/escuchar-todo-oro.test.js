// «Escuchar todo» (lessons-listen.js): PRUEBA DE ORO POR ORDEN DE EVENTOS. Cada escenario graba, con UN solo reloj (dentro de la página),
// la secuencia de lo observable: pedidos al servidor, play/pause/src/ended del <audio>, speak/cancel/pause/resume de la voz del sistema,
// los botones de la barra y la línea marcada. NO guarda tiempos. El oro (tests/data/escuchar-todo-oro.json) se grabó con el código ANTERIOR a la
// máquina de estados: la formalización (state-machine.js + tablas) tiene que dar la MISMA traza.
//   GOLDEN_RECORD=1 → graba/pisa el oro (corre cada escenario 3 veces y exige trazas idénticas: si no, no sirve de oráculo)
// Además, en cada escenario (con el modo estricto de state-machine.js): AC_SM_LOG vacío = ninguna transición sin declarar.
// El escenario «sin-maquina» corre con state-machine.js BLOQUEADO (page.route abort): «Escuchar todo» tiene que sonar igual y dar la misma traza.
// Los escenarios «R5-*» documentan el defecto conocido R5 (pausa justo al arrancar el audio).
const fs = require('fs');
const path = require('path');
const { chromium, LAUNCH, APP_URL } = require('./lib/env');

const GOLD = path.join(__dirname, 'data', 'escuchar-todo-oro.json');
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
const LESSON = 'h1-primer-dia';

// ───────── instrumentación que corre DENTRO de la página (un solo reloj) ─────────
function instrumentar(cfg) {
    const E = window.__E = [];
    const log = (s) => { E.push(s); disparar(s); };
    window.__texts = [];
    const idx = (t) => { const i = window.__texts.indexOf(t); return i === -1 ? '?' : String(i); };
    const dur = (s) => (s || '').slice(0, 5) === 'blob:' ? 'blob' : (s || '').slice(0, 5) === 'data:' ? 'silencio' : (s ? 'otra' : 'vacia');
    const esLA = (el) => !!(window.LQ_LISTEN && window.LQ_LISTEN.audio && el === window.LQ_LISTEN.audio);
    // acciones disparables por eventos (se ejecutan en la página, no desde Node)
    const click = (sel) => { const e = document.querySelector(sel); if (e) e.click(); };
    const ACC = {
        pausa: () => click('#ll-pause'), seguir: () => click('#ll-pause'), parar: () => click('#ll-stop'), cerrar: () => click('#lq-close'),
        linea: () => click('#lq-body .lq-line-say'), practicar: () => click('#lq-story-practice'), velocidad: () => click('#lq-story-speed'),
        escritura: () => document.dispatchEvent(new CustomEvent('ac-script-change')), ventana: () => document.getElementById('lesson-pop').classList.add('hidden'),
        api: () => window.LQ_LISTEN.stop(), vista: () => { const b = document.getElementById('ll-bar'); if (b) b.remove(); document.getElementById('lq-body').appendChild(document.createElement('div')); }, fin: () => { window.__fin = true; }
    };
    const trig = (cfg.triggers || []).map((t) => Object.assign({ usado: false }, t));
    function disparar(s) {
        if (!E.includes('# inicio')) return; // nada se dispara antes de que arranque la grabación
        trig.forEach((t) => { if (!t.usado && (t.re ? new RegExp(t.re).test(s) : t.when === s)) { t.usado = true; const f = () => { log('> ' + t.do); (ACC[t.do] || (() => {}))(); }; if (t.delay) setTimeout(f, t.delay); else queueMicrotask(f); } });
    }
    window.__mark = (m) => log('# ' + m);
    // fetch (solo /api/tts)
    const f0 = window.fetch;
    window.fetch = function (u, o) {
        try { const url = String(u); if (/\/api\/tts/.test(url)) { const q = new URL(url).searchParams; log('fetch ' + ((o && o.method) || 'GET') + ' L' + idx(q.get('text')) + ' speed=' + q.get('speed')); } } catch (e) { /* noop */ }
        return f0.apply(this, arguments);
    };
    // <audio> de «Escuchar todo»
    const proto = HTMLMediaElement.prototype;
    const play0 = proto.play, pause0 = proto.pause, load0 = proto.load;
    const srcD = Object.getOwnPropertyDescriptor(proto, 'src');
    proto.play = function () {
        if (!esLA(this)) return play0.apply(this, arguments);
        // el WAV mudo que desbloquea el audio en el toque (data:) NO se registra más que su src y su play(): sus eventos y su promesa llegan
        // en un orden que decide el navegador, no la app (y no dicen nada de la máquina)
        const sil = (el) => dur(el.src) === 'silencio';
        if (!this.__ev) { this.__ev = 1; this.addEventListener('ended', () => { if (!sil(this)) log('audio.ended'); }); this.addEventListener('error', () => { if (!sil(this)) log('audio.error'); }); this.addEventListener('playing', () => { if (!sil(this)) log('audio.playing'); }); }
        const esSil = sil(this);
        log('audio.play ' + dur(this.src));
        const r = play0.apply(this, arguments);
        if (cfg.alPlay && dur(this.src) === 'blob' && !window.__alPlayUsado) { window.__alPlayUsado = true; ACC[cfg.alPlay](); } // R5: actúa en el MISMO turno que play()
        if (r && r.then && !esSil) r.then(() => log('audio.play→ok'), (e) => log('audio.play→rechazado ' + (e && e.name)));
        return r;
    };
    proto.pause = function () { if (esLA(this)) log('audio.pause'); return pause0.apply(this, arguments); };
    proto.load = function () { if (esLA(this)) log('audio.load'); return load0.apply(this, arguments); };
    Object.defineProperty(proto, 'src', { get: srcD.get, set(v) { if (esLA(this)) log('audio.src=' + dur(v)); return srcD.set.call(this, v); }, configurable: true });
    const rm0 = Element.prototype.removeAttribute;
    Element.prototype.removeAttribute = function (name) { if (name === 'src' && this instanceof HTMLMediaElement && esLA(this)) log('audio.src=quitado'); return rm0.apply(this, arguments); };
    // voz del sistema simulada (modo: 'ok' = arranca y termina; 'rapido')
    let hablando = null, pausada = false;
    const fin = (u, tipo) => { if (hablando !== u) return; hablando = null; try { if (tipo === 'end') u.onend && u.onend({}); else u.onerror && u.onerror({ error: tipo }); } catch (e) { /* noop */ } };
    speechSynthesis.getVoices = function () { return []; };
    speechSynthesis.speak = function (u) {
        log('speak L' + idx(u.text)); hablando = u; pausada = false;
        if (cfg.vozMudaDesde != null && +idx(u.text) >= cfg.vozMudaDesde) return; // voz muda: ni arranca ni termina (la app la da por muda a los 5 s)
        setTimeout(() => { if (hablando !== u) return; try { u.onstart && u.onstart({}); } catch (e) { /* noop */ } log('voz.start L' + idx(u.text)); }, 15);
        const terminar = () => { if (hablando !== u) return; if (pausada) { u.__pend = true; return; } log('voz.end L' + idx(u.text)); fin(u, 'end'); };
        setTimeout(terminar, cfg.vozMs || 90); u.__terminar = terminar;
    };
    speechSynthesis.cancel = function () { log('cancel'); const u = hablando; if (u) setTimeout(() => { if (hablando === u) { log('voz.canceled'); fin(u, 'canceled'); } }, 0); };
    speechSynthesis.pause = function () { log('voz.pause'); pausada = true; };
    speechSynthesis.resume = function () { log('voz.resume'); pausada = false; const u = hablando; if (u && u.__pend) { u.__pend = false; setTimeout(u.__terminar, 5); } };
    // DOM: barra y línea marcada
    let ultimaBarra = null;
    const barra = () => { const b = document.getElementById('ll-bar'); if (!b) return; const t = [...b.querySelectorAll('button,p')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()).join(' | ') + (b.classList.contains('is-on') ? ' [on]' : ''); if (t !== ultimaBarra) { ultimaBarra = t; log('barra ' + t); } };
    const marcas = new WeakSet();
    new MutationObserver((ms) => {
        ms.forEach((m) => {
            if (m.type === 'attributes' && m.target.classList && m.target.classList.contains('is-playing') && m.target.classList.contains('lq-line') && !(m.oldValue || '').includes('is-playing')) {
                const els = [...document.querySelectorAll('#lq-body .lq-lines .lq-line')]; log('marca ' + els.indexOf(m.target));
            }
        });
        barra();
    }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true, characterData: true });
    window.__barra = barra;
}

(async () => {
    const b = await chromium.launch({ ...LAUNCH, args: ['--autoplay-policy=no-user-gesture-required'] });

    // sesión: servidor simulado con compuertas; `policy({text}, k)` → { status, hold }
    async function sesion(esc) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.addInitScript(() => { if (!sessionStorage.getItem('_i')) { sessionStorage.setItem('_i', '1'); localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); localStorage.setItem('ac_speed', '1'); } });
        // modo estricto SOLO en pruebas (NOSTRICT=1 lo apaga para probar el modo de producción: una transición no declarada se registra y se aplica igual)
        await ctx.addInitScript((process.env.NOSTRICT === '1' ? '' : 'window.AC_SM_STRICT = true; ') + 'window.AC_SM_LOG = [];');
        // LL_MUTADO=<archivo>: sirve ese lessons-listen.js en lugar del del repo (lo usa tests/escuchar-todo-mutaciones.test.js)
        if (process.env.LL_MUTADO) await ctx.route(/lessons-listen\.js/, (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(process.env.LL_MUTADO, 'utf8') }));
        if (esc.sinMaquina) await ctx.route(/state-machine\.js/, (r) => r.abort());
        const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
        const srv = { gates: new Map(), reqs: 0 };
        const audio = wavB64(esc.audioSec || 0.25);
        await p.route(/\/api\/tts/, async (route) => {
            const req = route.request(), method = req.method();
            if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            const text = method === 'GET' ? (new URL(req.url()).searchParams.get('text') || '') : '';
            const k = srv.reqs++;
            const pol = (esc.policy || (() => ({})))({ text }, k) || {};
            if (pol.hold) { await new Promise((res) => srv.gates.set(text, res)); }
            const status = pol.status || 200;
            const body = status === 200 ? JSON.stringify({ audio, mime: 'audio/wav', voice: 'zh-CN-XiaoxiaoNeural', speed: 1, cached: false }) : JSON.stringify({ error: 'tts no disponible', codigo: 'sin_audio' });
            return route.fulfill({ status, headers: Object.assign({ 'content-type': 'application/json' }, CORS, status === 200 ? { 'x-tts-audio': '1' } : { 'cache-control': 'no-store' }), body });
        });
        await ctx.addInitScript('(' + instrumentar.toString() + ')(' + JSON.stringify({ triggers: esc.triggers || [], alPlay: esc.alPlay || null, vozMs: esc.vozMs || 0, vozMudaDesde: esc.vozMudaDesde == null ? null : esc.vozMudaDesde }) + ')');
        await p.goto(APP_URL, { waitUntil: 'domcontentloaded' }); await sleep(p, 1300);
        return { ctx, p, errs, srv };
    }
    async function abrirLeccion(p) {
        await p.click('#nav-aprender'); await sleep(p, 250);
        await p.evaluate((id) => { const l = GRADED_LESSONS.find((x) => x.id === id); const lvl = String(l.hsk); const wrap = document.getElementById('lesson-list'); wrap.dataset.level = lvl; const s = document.getElementById('sel-lv-hsk'); if (s) { s.value = lvl; s.dispatchEvent(new Event('change', { bubbles: true })); } }, LESSON);
        await sleep(p, 250);
        await p.click('.lc-read[data-id="' + LESSON + '"]'); await sleep(p, 700);
        if (await p.$('#lq-gloss-continue')) { await p.click('#lq-gloss-continue'); await sleep(p, 300); }
        await p.evaluate(() => { window.__texts = [...document.querySelectorAll('#lq-body .lq-lines .lq-line-say')].map((e) => e.dataset.zh); LQ_LISTEN.setIcons(true); });
    }

    // ───────── escenarios ─────────
    // `fin`: cuándo termina la grabación (el evento que dispara la acción «fin»)
    const FIN_IDLE = { re: '^barra .*Escuchar todo$', do: 'fin', delay: 200 }; // la barra vuelve al reposo
    const ESC = [
        { id: 'sano', opts: {}, triggers: [FIN_IDLE], arranque: 'click' },
        { id: 'pausa-seguir-parar', opts: {}, triggers: [{ when: 'marca 2', do: 'pausa' }, { when: 'audio.pause', do: 'seguir', delay: 120 }, { when: 'marca 4', do: 'parar' }, FIN_IDLE] },
        { id: 'pausa-en-espera', opts: { policy: ({ text }, k) => (k === 0 ? { hold: true } : {}) }, triggers: [{ when: 'fetch GET L0 speed=1', do: 'pausa', delay: 30 }, { when: 'barra ▶ Seguir | ⏹ Parar [on]', do: 'seguir' }, { when: 'marca 3', do: 'parar' }, FIN_IDLE], liberar: true },
        { id: 'circuito', opts: { policy: () => ({ status: 502 }) }, triggers: [FIN_IDLE] },
        { id: 'corte-boton', opts: {}, triggers: [{ when: 'marca 2', do: 'parar' }, FIN_IDLE] },
        { id: 'corte-cerrar', opts: {}, triggers: [{ when: 'marca 2', do: 'cerrar' }, { re: '^barra .*Escuchar todo$', do: 'fin', delay: 200 }] },
        { id: 'corte-linea', opts: {}, triggers: [{ when: 'marca 2', do: 'linea' }, { re: '^barra .*Escuchar todo$', do: 'fin', delay: 250 }] },
        { id: 'corte-practicar', opts: {}, triggers: [{ when: 'marca 2', do: 'practicar' }, { when: 'audio.src=quitado', do: 'fin', delay: 250 }] },
        { id: 'corte-escritura', opts: {}, triggers: [{ when: 'marca 2', do: 'escritura' }, FIN_IDLE] },
        { id: 'corte-ventana', opts: {}, triggers: [{ when: 'marca 2', do: 'ventana' }, { when: 'audio.src=quitado', do: 'fin', delay: 250 }] },
        { id: 'corte-vista', opts: {}, triggers: [{ when: 'marca 2', do: 'vista' }, { when: 'audio.src=quitado', do: 'fin', delay: 250 }] },
        { id: 'corte-api', opts: {}, triggers: [{ when: 'marca 2', do: 'api' }, FIN_IDLE] },
        { id: 'velocidad', opts: {}, triggers: [{ when: 'marca 1', do: 'velocidad' }, { when: 'marca 4', do: 'parar' }, FIN_IDLE] },
        { id: 'pausa-voz-muda-ultima', opts: { policy: () => ({ status: 502 }), vozMudaDesde: 14 }, triggers: [{ when: 'speak L14', do: 'pausa', delay: 50 }, FIN_IDLE] },
        { id: 'R5-pausa-al-arrancar', opts: { alPlay: 'pausa' }, triggers: [{ when: 'voz.start L0', do: 'seguir', delay: 150 }, { when: 'marca 2', do: 'parar' }, FIN_IDLE] }
    ];
    async function correr(esc, opts) {
        const { ctx, p, errs, srv } = await sesion(Object.assign({}, esc.opts, { triggers: esc.triggers, sinMaquina: opts && opts.sinMaquina }));
        await abrirLeccion(p);
        await p.evaluate(() => window.__mark('inicio'));
        await p.click('#ll-play');
        if (esc.liberar) { // la respuesta de la línea 0 estaba retenida con la barra en pausa: se suelta (la marca '# liberar' queda en la traza)
            await p.waitForFunction(() => window.__E.includes('> pausa'), null, { timeout: 15000 });
            await sleep(p, 300);
            const t0 = await p.evaluate(() => { window.__mark('liberar'); return window.__texts[0]; });
            const g = srv.gates.get(t0); if (g) g();
        }
        await p.waitForFunction(() => window.__fin === true, null, { timeout: 60000 }).catch(() => { });
        await sleep(p, 300);
        const traza = await p.evaluate(() => window.__E.slice());
        const sm = await p.evaluate(() => ({ log: (window.AC_SM_LOG || []).slice(), maquinas: Object.keys(window.AC_MACHINES || {}) }));
        await ctx.close();
        return { traza, sm, errs };
    }

    const oro = RECORD ? {} : JSON.parse(fs.readFileSync(GOLD, 'utf8'));
    const SOLO0 = process.env.SOLO; const nuevo = (RECORD && SOLO0) ? JSON.parse(fs.readFileSync(GOLD, 'utf8')) : {}; // SOLO + GOLDEN_RECORD: agrega o pisa solo esos escenarios
    const SOLO = process.env.SOLO ? process.env.SOLO.split(',') : null; // depuración: SOLO=sano,circuito
    for (const esc of ESC) {
        if (SOLO && !SOLO.includes(esc.id)) continue;
        const veces = RECORD ? (process.env.VECES ? +process.env.VECES : 3) : 1;
        const trazas = [];
        let r;
        for (let i = 0; i < veces; i++) { r = await correr(esc); trazas.push(JSON.stringify(r.traza)); }
        if (RECORD) {
            const estable = trazas.every((t) => t === trazas[0]);
            ok(estable, '[' + esc.id + '] grabación estable: 3 corridas dan la MISMA traza (' + r.traza.length + ' eventos)');
            nuevo[esc.id] = r.traza;
        } else {
            const g = oro[esc.id];
            ok(!!g && JSON.stringify(g) === JSON.stringify(r.traza), '[' + esc.id + '] la traza por orden de eventos es IDÉNTICA al oro (' + r.traza.length + ' eventos)' + ((!g || JSON.stringify(g) !== JSON.stringify(r.traza)) ? ' → primera diferencia: ' + JSON.stringify(difer(g || [], r.traza)) : ''));
            ok(['escuchar.reproduccion', 'escuchar.espera', 'escuchar.circuito'].every((k) => r.sm.maquinas.includes(k)), '[' + esc.id + '] las 3 máquinas están registradas (state-machine.js cargó)');
            ok(r.sm.log.length === 0, '[' + esc.id + '] modo estricto: ninguna transición sin declarar (AC_SM_LOG vacío)' + (r.sm.log.length ? ' → ' + JSON.stringify(r.sm.log.slice(0, 3)) : ''));
            ok(r.errs.filter((x) => !/localStorage/.test(x)).length === 0, '[' + esc.id + '] sin errores JS ' + r.errs.join('|'));
        }
    }
    // «Escuchar todo» sigue sonando con state-machine.js BLOQUEADO (la máquina de respaldo no valida)
    if (!RECORD) {
        for (const id of ['sano', 'pausa-seguir-parar', 'circuito']) {
            const esc = ESC.find((e) => e.id === id);
            const r = await correr(esc, { sinMaquina: true });
            ok(JSON.stringify(oro[id]) === JSON.stringify(r.traza), '[sin-maquina · ' + id + '] con state-machine.js bloqueado la traza es IDÉNTICA al oro' + (JSON.stringify(oro[id]) !== JSON.stringify(r.traza) ? ' → ' + JSON.stringify(difer(oro[id] || [], r.traza)) : ''));
            ok(r.sm.maquinas.length === 0, '[sin-maquina · ' + id + '] no hay máquinas registradas (el archivo no cargó)');
        }
    }
    function difer(a, c) { for (let i = 0; i < Math.max(a.length, c.length); i++) if (a[i] !== c[i]) return { en: i, oro: a[i], ahora: c[i] }; return null; }

    if (RECORD) { fs.writeFileSync(GOLD, JSON.stringify(nuevo, null, 1)); console.log('oro grabado: ' + Object.keys(nuevo).length + ' escenarios en ' + GOLD); }
    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
