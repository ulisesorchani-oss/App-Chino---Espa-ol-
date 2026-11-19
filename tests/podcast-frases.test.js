// Podcast con la voz del sistema: el DIVISOR EN FRASES (podcastFrases, podcast.js). La lección se lee por frases de <= 150 caracteres (como el Lector) para poder avanzar/pausar por frase y
// no depender de un solo enunciado enorme. Se prueba con las 41 lecciones de GRADED_LESSONS (en simplificado y, donde existe, en tradicional) y con casos límite:
//   · TODA frase tiene entre 1 y 150 caracteres (se cuentan puntos de código, no unidades UTF-16)
//   · no se pierde ni se inventa texto (sin contar espacios ni saltos de línea) y el orden se conserva
//   · casos límite: oración larga sin puntuación, solo comas, solo signos, vacío/undefined, caracteres fuera del plano básico, una línea de 5000 caracteres
const { chromium, LAUNCH, APP_URL } = require('./lib/env');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

(async () => {
    const b = await chromium.launch(LAUNCH);
    const p = await b.newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.addInitScript(() => { localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); });
    await p.goto(APP_URL, { waitUntil: 'domcontentloaded' });
    await p.waitForFunction(() => typeof window.podcastFrases === 'function' && Array.isArray(window.GRADED_LESSONS) && window.GRADED_LESSONS.length > 0, null, { timeout: 15000 }).catch(() => { });

    const r = await p.evaluate(() => {
        const F = window.podcastFrases, L = window.GRADED_LESSONS || [];
        const sinEsp = (t) => String(t).replace(/\s+/g, '');
        const len = (t) => Array.from(t).length;
        const malas = [], perdidas = [], vacias = [];
        let casos = 0, frases = 0, masLarga = 0;
        const chequea = (etq, texto) => {
            casos++;
            const f = F(texto);
            frases += f.length;
            f.forEach((x, i) => { masLarga = Math.max(masLarga, len(x)); if (len(x) > 150) malas.push(etq + '#' + i + ' (' + len(x) + ')'); if (!x.trim()) vacias.push(etq + '#' + i); });
            if (sinEsp(f.join('')) !== sinEsp(texto)) perdidas.push(etq);
        };
        L.forEach((l) => {
            chequea(l.id + ' simp', l.lines.map((ln) => ln.zh).join('\n'));
            if (l.lines.some((ln) => ln.zhT)) chequea(l.id + ' trad', l.lines.map((ln) => ln.zhT || ln.zh).join('\n'));
        });
        const lim = {};
        const largaSinPunt = '好'.repeat(400), soloComas = '，'.repeat(400), soloSignos = '。！？；!?;…', astral = '𠮷'.repeat(200), enorme = ('我们去公园玩，').repeat(700);
        [['sin-puntuacion-400', largaSinPunt], ['solo-comas-400', soloComas], ['solo-signos', soloSignos], ['astral-200', astral], ['linea-de-5000+', enorme],
         ['una-oracion-de-300-con-comas', ('今天天气很好，').repeat(50)], ['mezcla', '你好。\n\n  \n' + '好'.repeat(160) + '。再见！\n' + 'abc'.repeat(80)]].forEach(([k, t]) => chequea('límite:' + k, t));
        lim.vacio = F('').length; lim.undef = F(undefined).length; lim.nulo = F(null).length; lim.soloEspacios = F(' \n  \n').length;
        lim.corta = F('你好。再见！');
        lim.dosLineas = F('你好\n再见');
        return { lecciones: L.length, casos, frases, masLarga, malas, perdidas, vacias, lim };
    });

    ok(r.lecciones === 41, 'hay 41 lecciones en GRADED_LESSONS (' + r.lecciones + ')');
    ok(r.malas.length === 0, 'TODA frase tiene <= 150 caracteres (' + r.casos + ' textos, ' + r.frases + ' frases, la más larga de ' + r.masLarga + ')' + (r.malas.length ? ' → ' + r.malas.slice(0, 5).join(', ') : ''));
    ok(r.vacias.length === 0, 'ninguna frase queda vacía' + (r.vacias.length ? ' → ' + r.vacias.slice(0, 5).join(', ') : ''));
    ok(r.perdidas.length === 0, 'no se pierde ni se inventa texto (sin contar espacios) en ningún texto' + (r.perdidas.length ? ' → ' + r.perdidas.slice(0, 5).join(', ') : ''));
    ok(r.lim.vacio === 0 && r.lim.undef === 0 && r.lim.nulo === 0 && r.lim.soloEspacios === 0, 'texto vacío, undefined, null o solo espacios → 0 frases');
    ok(r.lim.corta.length === 1 && r.lim.corta[0] === '你好。\n再见！', 'oraciones cortas se agrupan en una frase (separadas por salto de línea): ' + JSON.stringify(r.lim.corta));
    ok(r.lim.dosLineas.length === 1 && r.lim.dosLineas[0] === '你好\n再见', 'dos líneas cortas sin puntuación quedan en una frase: ' + JSON.stringify(r.lim.dosLineas));
    ok(errs.filter((x) => !/localStorage/.test(x)).length === 0, 'sin errores JS ' + errs.join('|'));
    await b.close();
    console.log('\n' + n + ' comprobaciones');
    console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FALLO:', e); process.exit(1); });
