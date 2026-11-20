// fix/pequenos-gemini · punto 3: «🗑️ Borrar progreso» borra también la sesión del día (ac_session_v1) y la racha (ac_stats_v1),
// pone el anillo en 0 y refresca la cabecera SIN recargar. No toca el algoritmo SRS ni checkAnswer (el mazo se vacía como antes).
//   · «racha en 0 tras un evento nuevo» se prueba en sus dos lecturas:
//       (a) un volcado que NO es práctica (segundos < 60, escritura ajena) → la racha sigue en 0;
//       (b) un acierto real hoy → la racha es 1 (hoy cuenta, por diseño), y los días viejos NO vuelven a ac_stats_v1.
//   · sin recargar y tras recargar: anillo 0, racha 0, sin días viejos.
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

const dia = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    const hoy = new Date(), dias = {};
    for (let i = 0; i < 5; i++) { const x = new Date(hoy); x.setDate(hoy.getDate() - i); dias[dia(x)] = { a: 3, r: 1, s: 120 }; }
    const HOY = dia(hoy);

    async function abrir(extra) {
        const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block' });
        await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
        await ctx.addInitScript(([dias, HOY, extra]) => {
            if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1'); localStorage.clear();
            localStorage.setItem('ac_onboarding_done_v2', '1');
            localStorage.setItem('ac_stats_v1', JSON.stringify({ v: 1, days: dias }));
            localStorage.setItem('ac_session_v1', JSON.stringify({ date: HOY, done: 7, goal: 20, target: 20 }));
            localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode: 'es-cn', score: 12 }));
            Object.entries(extra || {}).forEach(([k, v]) => localStorage.setItem(k, v));
        }, [dias, HOY, extra]);
        const p = await ctx.newPage(); p._errs = []; p.on('pageerror', (e) => p._errs.push(e.message)); p.on('dialog', (d) => d.accept());
        await p.goto(APP_URL); await p.waitForTimeout(1500);
        return { ctx, p };
    }
    const estado = (p) => p.evaluate(() => {
        const S = HuayuStats.getSummary(), chip = document.getElementById('header-streak');
        const raw = localStorage.getItem('ac_stats_v1'), ses = localStorage.getItem('ac_session_v1');
        let dias = null; try { dias = raw ? Object.keys(JSON.parse(raw).days || {}) : null; } catch (e) { /* roto */ }
        return { anillo: document.getElementById('session-ring-txt').textContent, racha: S.streak, chip: chip.classList.contains('hidden') ? 'oculto' : chip.textContent.trim(), claveStats: raw !== null, claveSesion: ses !== null, dias, hechas: state.sessionDone, meta: state.sessionGoal, metaBtn: (document.querySelector('#session-goal-group .goal-btn.active') || {}).dataset ? document.querySelector('#session-goal-group .goal-btn.active').dataset.goal : null };
    });

    // ---- antes: la sesión y la racha están cargadas ----
    let { ctx, p } = await abrir();
    const a0 = await estado(p);
    ok(a0.anillo === '7/20' && a0.racha === 5, 'partida: anillo 7/20 y racha 5 (' + JSON.stringify({ anillo: a0.anillo, racha: a0.racha, chip: a0.chip }) + ')');
    ok(a0.claveStats && a0.claveSesion, 'partida: ac_stats_v1 y ac_session_v1 existen');

    const conMazo = await p.evaluate(() => { window.acSrsAdd({ zh: '你好', zt: '你好', py: 'nǐ hǎo', es: 'hola', m: 'Saludos' }); return window.acSrsHas('你好'); });
    ok(conMazo, 'partida: hay una tarjeta en el mazo SRS');
    // ---- borrar progreso (confirm aceptado), SIN recargar ----
    await p.evaluate(() => { document.getElementById('btn-reset').click(); });
    await p.waitForTimeout(400);
    const a1 = await estado(p);
    ok(a1.anillo === '0/10', 'sin recargar: el anillo marca 0/10 (' + a1.anillo + ')');
    ok(a1.hechas === 0 && a1.meta === 10 && String(a1.metaBtn) === '10', 'sin recargar: la memoria coincide con una recarga (hechas ' + a1.hechas + ', meta ' + a1.meta + ', botón de meta ' + a1.metaBtn + ')');
    ok(a1.racha === 0 && a1.chip === 'oculto', 'sin recargar: racha 0 y el chip 🔥 de la cabecera oculto (' + a1.racha + ' · ' + a1.chip + ')');
    ok(!a1.claveSesion, 'ac_session_v1 ya no está');
    ok(!a1.claveStats, 'ac_stats_v1 ya no está');
    // lo que ya hacía sigue igual: score y mazo
    const r = await p.evaluate(() => ({ score: state.score, srs: localStorage.getItem('ac_srs') }));
    ok(r.score === 0, 'el puntaje queda en 0 (como antes)');
    ok(!(await p.evaluate(() => window.acSrsHas('你好'))), 'el mazo SRS queda vacío, como antes (la tarjeta ya no está)');

    // (a) un volcado que NO es práctica: la racha sigue en 0 y no reaparecen días viejos
    await p.evaluate(() => { localStorage.setItem('ac_cualquier_cosa', '1'); window.dispatchEvent(new Event('pagehide')); });
    const a2 = await estado(p);
    ok(a2.racha === 0 && !a2.claveStats, '(a) volcado ajeno (pagehide + otra clave): racha 0 y ac_stats_v1 sigue AUSENTE (' + JSON.stringify(a2.dias) + ')');
    ok(a2.anillo === '0/10', '(a) el anillo sigue en 0/10');

    // (b) un acierto real hoy: racha 1 por diseño; los días viejos no vuelven
    await p.evaluate(() => { state.score = 1; saveProgress(); });
    const a3 = await estado(p);
    ok(a3.racha === 1, '(b) tras UN acierto real hoy la racha es 1, no 6 ni 5 (' + a3.racha + ') — hoy cuenta, por diseño');
    ok(a3.dias && a3.dias.length === 1 && a3.dias[0] === HOY, '(b) ac_stats_v1 tiene solo hoy: ' + JSON.stringify(a3.dias));
    await p.evaluate(() => window.dispatchEvent(new Event('pagehide')));
    const a4 = await estado(p);
    ok(a4.dias && a4.dias.length === 1 && a4.racha === 1, '(b) tras vaciar lo pendiente a disco sigue solo hoy (' + JSON.stringify(a4.dias) + ')');
    // recargar: sigue igual
    await p.reload(); await p.waitForTimeout(1500);
    const a5 = await estado(p);
    ok(a5.racha === 1 && a5.dias.length === 1, '(b) tras recargar: racha 1, un solo día');
    ok(p._errs.length === 0, 'sin errores JS ' + p._errs.join(' / '));
    await ctx.close();

    // ---- (c) borrar y recargar SIN eventos nuevos: todo en 0 ----
    ({ ctx, p } = await abrir());
    await p.evaluate(() => { document.getElementById('btn-reset').click(); });
    await p.waitForTimeout(300);
    await p.reload(); await p.waitForTimeout(1500);
    const c1 = await estado(p);
    ok(c1.anillo === '0/10' && c1.racha === 0 && c1.chip === 'oculto', '(c) borrar y recargar sin practicar: anillo 0/10, racha 0, chip oculto (' + JSON.stringify({ a: c1.anillo, r: c1.racha, c: c1.chip }) + ')');
    ok(!c1.claveSesion && !c1.claveStats, '(c) tras recargar: ac_session_v1 y ac_stats_v1 siguen ausentes (' + JSON.stringify(c1.dias) + ')');
    await ctx.close();

    // ---- (d) los segundos acumulados en memoria (sin volcar aún) tampoco reaparecen ----
    ({ ctx, p } = await abrir());
    await p.evaluate(() => { document.getElementById('btn-reset').click(); });
    await p.waitForTimeout(300);
    const d1 = await p.evaluate(() => { window.dispatchEvent(new Event('pagehide')); const raw = localStorage.getItem('ac_stats_v1'); return raw === null ? null : Object.keys(JSON.parse(raw).days); });
    ok(d1 === null, '(d) lo que había en memoria no se vuelca a disco tras el reinicio: la clave sigue ausente (' + JSON.stringify(d1) + ')');
    await ctx.close();

    // ---- (e) con el panel «sesión completa» abierto, la tarjeta vuelve ----
    ({ ctx, p } = await abrir());
    await p.evaluate(() => { state.sessionDone = state.sessionTarget; showSessionDone(); });
    const e0 = await p.evaluate(() => ({ panel: !document.getElementById('session-done').classList.contains('hidden'), tarjeta: !document.getElementById('sentence-card').classList.contains('hidden') }));
    ok(e0.panel && !e0.tarjeta, '(e) partida: el panel «sesión completa» tapa la tarjeta');
    await p.evaluate(() => { document.getElementById('btn-reset').click(); });
    await p.waitForTimeout(300);
    const e1 = await p.evaluate(() => ({ panel: !document.getElementById('session-done').classList.contains('hidden'), tarjeta: !document.getElementById('sentence-card').classList.contains('hidden'), anillo: document.getElementById('session-ring-txt').textContent }));
    ok(!e1.panel && e1.tarjeta && e1.anillo === '0/10', '(e) tras borrar: panel oculto, tarjeta visible, anillo 0/10 (' + JSON.stringify(e1) + ')');
    ok(!(await estado(p)).claveSesion, '(e) y no se reescribió ac_session_v1');
    await ctx.close();

    // ---- (f) con la tarjeta a la vista (panel «sesión completa» cerrado), borrar no la toca ni la duplica ----
    ({ ctx, p } = await abrir());
    await p.evaluate(() => { document.getElementById('sentence-card').classList.add('hidden'); });
    await p.evaluate(() => { document.getElementById('btn-reset').click(); });
    await p.waitForTimeout(300);
    ok(await p.evaluate(() => document.getElementById('sentence-card').classList.contains('hidden')), '(f) sin el panel abierto, borrar no muestra una tarjeta que estaba oculta por otra causa');
    await ctx.close();

    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
