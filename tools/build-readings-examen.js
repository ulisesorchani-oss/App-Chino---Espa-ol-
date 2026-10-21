#!/usr/bin/env node
// tools/build-readings-examen.js — genera readings-examen.js (window.READINGS_V2) desde tools/lecturas-examen/fuente-*.json.
//   node tools/build-readings-examen.js            → reescribe readings-examen.js e imprime la tabla de control
//   node tools/build-readings-examen.js --dry      → imprime la tabla sin escribir
// Las fuentes llevan SOLO chino simplificado + español. Este script agrega, con herramientas y no a mano:
//   · el tradicional (zhT) con OpenCC s2tw (tools/lecturas-examen/opencc-s2tw.py; pip install opencc) y su ida y vuelta tw2s
//   · largo (hanzi del texto) y fueraDeNivel de cada palabra del glosario, calculados con las listas HSK acumuladas de la app
//     (EMBEDDED_MODULE_DATA + zhSegmentAll en un navegador real, igual que tools/check-readings.js)
// tools/check-readings.js vuelve a calcular todo y exige que lo guardado coincida: editar readings-examen.js a mano falla.
const http = require('http'), fs = require('fs'), path = require('path'), cp = require('child_process');
let pw; for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(m); break; } catch (e) { /* siguiente */ } }
if (!pw) { console.error('Falta playwright'); process.exit(2); }
const ROOT = path.resolve(__dirname, '..'), SRC = path.join(__dirname, 'lecturas-examen'), OUT = path.join(ROOT, 'readings-examen.js');
const BLANK = '＿＿';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

// ── 1) fuentes ──
const src = fs.readdirSync(SRC).filter(f => /^fuente-.*\.json$/.test(f)).sort().flatMap(f => JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')));

// ── 2) todo lo que lleva tradicional, en una sola pasada por OpenCC ──
const strings = [], idx = new Map();
const S = (zh) => { if (!idx.has(zh)) { idx.set(zh, strings.length); strings.push(zh); } return zh; };
src.forEach(r => {
    S(r.titulo.zh); r.parrafos.forEach(p => S(p.zh)); r.glosario.forEach(g => S(g.zh));
    r.banco.huecos.forEach(h => { S(h.frase); S(h.resp); }); r.banco.sobrantes.forEach(S);
    r.parecidas.forEach(p => p.opts.forEach(o => S(p.frase.replace(BLANK, o))));
    ((r.capa2 || {}).notas || []).forEach(n => S(n.zh)); ((r.capa2 || {}).colocaciones || []).forEach(n => S(n.zh));
});
const oc = JSON.parse(cp.execFileSync('python3', [path.join(SRC, 'opencc-s2tw.py')], { input: JSON.stringify(strings), encoding: 'utf8', env: Object.assign({}, process.env, process.env.OPENCC_PYTHONPATH ? { PYTHONPATH: process.env.OPENCC_PYTHONPATH } : {}) }));
const T = zh => oc.t[idx.get(zh)];
// OpenCC convierte según el contexto (p. ej. 面 → 麵 solo dentro de «吃了一碗面»): los huecos y las palabras parecidas se convierten con la
// frase COMPLETA y el tradicional de la palabra se corta de ahí (s2tw conserva el largo carácter a carácter), no suelto ni con el ＿＿ puesto.
const alinear = (frase, palabra, id) => { const tf = Array.from(T(frase)), zf = Array.from(frase);
    if (tf.length !== zf.length) throw new Error(id + ': s2tw cambió el largo de «' + frase + '»');
    const i = Array.from(frase.slice(0, frase.indexOf(palabra))).length, n = Array.from(palabra).length;
    return { palabraT: tf.slice(i, i + n).join(''), fraseT: tf.slice(0, i).join('') + BLANK + tf.slice(i + n).join('') }; };

// ── 3) armado del esquema v2 ──
const corregidas = strings.filter((zh, i) => oc.raw[i] !== oc.t[i]).length;
const built = src.map(r => {
    const o = { id: r.id, schema: 2, tipo: 'examen', nivel: r.nivel, genero: r.genero, emoji: r.emoji, revision: 'pendiente',
        titulo: { zh: r.titulo.zh, zhT: T(r.titulo.zh), es: r.titulo.es },
        parrafos: r.parrafos.map(p => ({ zh: p.zh, zhT: T(p.zh), es: p.es })),
        largo: 0,
        glosario: r.glosario.map(g => ({ zh: g.zh, zhT: T(g.zh), categoria: g.categoria, es: g.es, fueraDeNivel: false })),
        comprension: r.comprension.map(q => {
            if (q.tipo === 'vf') return { tipo: 'vf', es: q.es, vf: q.vf, why: q.why };
            return { tipo: q.tipo, es: q.es, opts: q.opts, why: q.why, whyNot: q.whyNot };
        }),
        banco: {
            huecos: r.banco.huecos.map(h => { if (h.frase.split(h.resp).length !== 2) throw new Error(r.id + ': «' + h.resp + '» debe aparecer una sola vez en «' + h.frase + '»');
                const a = alinear(h.frase, h.resp, r.id); return { zh: h.frase.replace(h.resp, BLANK), zhT: a.fraseT, resp: h.resp, respT: a.palabraT }; }),
            palabras: r.banco.huecos.map(h => h.resp).concat(r.banco.sobrantes),
            palabrasT: r.banco.huecos.map(h => alinear(h.frase, h.resp, r.id).palabraT).concat(r.banco.sobrantes.map(T))
        },
        parecidas: r.parecidas.map(p => { const llenas = p.opts.map(o => alinear(p.frase.replace(BLANK, o), o, r.id));
            return { zh: p.frase, zhT: llenas[p.ok[0]].fraseT, opts: p.opts, optsT: llenas.map(x => x.palabraT), ok: p.ok, why: p.why }; }),
        capa2: r.capa2 ? { notas: (r.capa2.notas || []).map(n => ({ zh: n.zh, zhT: T(n.zh), es: n.es })), colocaciones: (r.capa2.colocaciones || []).map(n => ({ zh: n.zh, zhT: T(n.zh), es: n.es })) } : undefined
    };
    if (!o.capa2) delete o.capa2;
    return o;
});

// ── hoja de revisión (docs/lecturas-examen-hsk4-revision.md): una por texto, para revisar sin abrir código ──
const esc = x => String(x).replace(/\|/g, '\\|');
function hoja(rs, ctl) {
    const L = ['# Lecturas tipo examen · HSK 4 · hoja de revisión', '',
        'GENERADA por `tools/build-readings-examen.js` (no editar a mano). Nivel aproximado, no oficial. Los textos son originales, escritos para la app. `revision: pendiente` hasta que un hablante nativo los revise.', ''];
    rs.forEach((r, i) => { const c = ctl[i], f = (src[i].control || {}).frases || [], letra = 'ABCD';
        L.push('## ' + (i + 1) + '. ' + r.emoji + ' ' + r.titulo.zh + ' / ' + r.titulo.zhT + ' — ' + r.titulo.es, '', '`' + r.id + '` · ' + r.genero + ' · HSK ' + r.nivel + ' · revision: ' + r.revision, '',
            '### Tabla de control', '', '| Control | Resultado |', '|---|---|',
            '| Largo | ' + r.largo + ' hanzi (rango HSK ' + r.nivel + ': 100–200) |', '| Nivel (listas HSK 1–' + r.nivel + ' acumuladas) | ' + c.cov + ' % en simplificado · ' + c.covT + ' % en tradicional (mínimo 90 %) |',
            '| Palabras fuera de lista | ' + (c.bad.length ? c.bad.join(' · ') : 'ninguna') + ' |', '| Glosario | ' + r.glosario.length + ' palabras, ' + r.glosario.filter(g => g.fueraDeNivel).length + ' marcadas «fuera del nivel»: ' + (r.glosario.filter(g => g.fueraDeNivel).map(g => g.zh).join(' · ') || '—') + ' |');
        f.forEach((x, k) => L.push('| Frase buscada ' + (k + 1) + ' | «' + x.zh + '» → ' + x.resultado + ' |'));
        L.push('', '### Texto', '', '| 简体 | 繁體 (s2tw) | Español |', '|---|---|---|');
        r.parrafos.forEach(p => L.push('| ' + esc(p.zh) + ' | ' + esc(p.zhT) + ' | ' + esc(p.es) + ' |'));
        L.push('', '### Comprensión (✅ = correcta)', '');
        r.comprension.forEach((q, k) => { L.push((k + 1) + '. **' + q.es + '** _(' + q.tipo + ')_');
            if (q.tipo === 'vf') L.push('   - ' + (q.vf ? '✅ Verdadero' : '✅ Falso') + ' — ' + q.why);
            else { q.opts.forEach((o, j) => L.push('   - ' + letra[j] + ') ' + (j === 0 ? '✅ ' : '') + o + ' — ' + (j === 0 ? q.why : q.whyNot[j - 1]))); }
            L.push(''); });
        L.push('_(En pantalla el orden de las opciones se baraja; acá la correcta va primera.)_', '', '### Banco de palabras', '', '| # | Frase con hueco | Respuesta |', '|---|---|---|');
        r.banco.huecos.forEach((h, k) => L.push('| ' + (k + 1) + ' | ' + h.zh + ' | **' + h.resp + '** |'));
        L.push('', 'Palabras del banco: ' + r.banco.palabras.join(' · ') + ' (sobrantes: ' + r.banco.palabras.slice(r.banco.huecos.length).join(' · ') + ')', '', '### Palabras parecidas', '');
        r.parecidas.forEach((p, k) => { L.push((k + 1) + '. ' + p.zh + '  →  ' + p.opts.map((o, j) => (p.ok.includes(j) ? '✅ ' : '❌ ') + o).join(' · '), '   - ' + p.why); }); L.push('');
        L.push('### Glosario', '', '| 简体 | 繁體 | Categoría | Español | Fuera del nivel |', '|---|---|---|---|---|');
        r.glosario.forEach(g => L.push('| ' + g.zh + ' | ' + g.zhT + ' | ' + g.categoria + ' | ' + g.es + ' | ' + (g.fueraDeNivel ? 'sí' : '') + ' |'));
        if (r.capa2) { L.push('', '### Capa 2 (opcional)', ''); r.capa2.notas.forEach(n => L.push('- Nota: **' + n.zh + '** — ' + n.es)); r.capa2.colocaciones.forEach(n => L.push('- Colocación: **' + n.zh + '** (' + n.zhT + ') — ' + n.es)); }
        L.push('', '---', ''); });
    return L.join('\n');
}

// ── 4) cálculo de largo y fueraDeNivel en el navegador de la app ──
const srv = http.createServer((q, s) => {
    const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+$/, '/index.html'));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { s.writeHead(404); return s.end(); }
    s.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(s);
});
(async () => {
    await new Promise(r => srv.listen(0, r));
    const exe = process.env.CHROMIUM || ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(fs.existsSync);
    const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
    const pg = await b.newPage();
    await pg.goto('http://localhost:' + srv.address().port + '/index.html'); await pg.waitForTimeout(1800);
    const calc = await pg.evaluate((items) => {
        const HAN = /[㐀-鿿]/, sets = {};
        const setOf = n => sets[n] || (sets[n] = (() => { const w = new Set(); for (let i = 1; i <= n; i++) EMBEDDED_MODULE_DATA['HSK' + i].forEach(e => { if (e[0]) w.add(e[0]); if (e[1]) w.add(e[1]); }); return w; })());
        return items.map(r => {
            const w = setOf(r.nivel);
            const sc = Array.from(Array(r.nivel), (_, i) => i + 1).reduce((o, i) => { EMBEDDED_MODULE_DATA['HSK' + i].forEach(e => [e[0], e[1]].forEach(x => { if (x) Array.from(x).forEach(ch => o.add(ch)); })); return o; }, new Set());
            const cover = k => { let tok = 0, ok = 0; const bad = new Set(); r.parrafos.forEach(p => zhSegmentAll(p[k]).filter(x => HAN.test(x)).forEach(x => { tok++; if (w.has(x) || Array.from(x).every(ch => sc.has(ch))) ok++; else bad.add(x); })); return { cov: +(100 * ok / tok).toFixed(1), bad: [...bad] }; };
            const cz = cover('zh'), ctt = cover('zhT');
            return { cov: cz.cov, covT: ctt.cov, bad: cz.bad,
                largo: Array.from(r.parrafos.map(p => p.zh).join('')).filter(ch => HAN.test(ch)).length,
                fuera: r.glosario.map(g => zhSegmentAll(g.zh).filter(x => HAN.test(x)).some(x => !w.has(x))) };
        });
    }, built.map(r => ({ nivel: r.nivel, parrafos: r.parrafos, glosario: r.glosario })));
    await b.close(); srv.close();
    built.forEach((r, i) => { r.control = calc[i]; });
    built.forEach((r, i) => { r.largo = calc[i].largo; r.glosario.forEach((g, j) => { g.fueraDeNivel = calc[i].fuera[j]; }); });

    // ── 5) archivo ──
    const header = [
        '// ============================================================',
        '// readings-examen.js — LECTURAS tipo examen · ESQUEMA v2 (solo datos, sin pantalla)',
        '// ------------------------------------------------------------',
        '// GENERADO por tools/build-readings-examen.js desde tools/lecturas-examen/fuente-*.json — NO editar a mano:',
        '// tools/check-readings.js vuelve a calcular largo, fueraDeNivel y el tradicional y falla si no coinciden.',
        '// Textos originales escritos para la app. Nivel aproximado, NO oficial. Tradicional: OpenCC s2tw (ida y vuelta tw2s verificada).',
        '//',
        '// Aditivo y separado de window.READINGS (v1): la rama de interfaz unificará ambas en una sola fuente.',
        '//   { id, schema: 2, tipo: \'examen\', nivel: 3|4|5, genero, emoji, revision: \'pendiente\'|\'nativo\',',
        '//     titulo: { zh, zhT, es },',
        '//     parrafos: [{ zh, zhT, es }],                     // el texto, por párrafos (visible durante las preguntas)',
        '//     largo,                                           // hanzi del texto — CALCULADO',
        '//     glosario: [{ zh, zhT, categoria, es, fueraDeNivel }],  // 8–12; fueraDeNivel CALCULADO (pinyin: pinyinFor en pantalla)',
        '//     comprension: [ { tipo: idea|detalle|vocabulario, es, opts[], why, whyNot[] }   // opts[0] = CORRECTA (se baraja al mostrar)',
        '//                  | { tipo: \'vf\', es, vf: true|false, why } ],                    // verdadero/falso: la pantalla lo resuelve la rama de interfaz',
        '//     banco: { huecos: [{ zh (con ＿＿), zhT, resp, respT }], palabras[], palabrasT[] },  // palabras = respuestas + 1–2 sobrantes',
        '//     parecidas: [{ zh (con ＿＿), zhT, opts[], optsT[], ok: [índices válidos], why }],   // desde HSK 4',
        '//     capa2?: { notas: [{ zh, zhT, es }], colocaciones: [{ zh, zhT, es }] } }',
        '// Progreso: clave ac_reading_v1 (la misma de las lecturas v1).',
        '// ============================================================'
    ].join('\n');
    const ctl = built.map(r => { const c = r.control; delete r.control; return c; });
    const body = 'window.READINGS_V2 = (window.READINGS_V2 || []).concat(' + JSON.stringify(built, null, 1) + ');\n';
    const code = header + '\n' + body;

    // ── 6) ida y vuelta (tw2s) ──
    const diffs = [];
    strings.forEach((zh, i) => { if (oc.back[i] !== zh) { const d = []; Array.from(zh).forEach((ch, k) => { const bk = Array.from(oc.back[i])[k]; if (bk !== ch) d.push(ch + '→' + oc.t[i][k] + '→' + bk); }); diffs.push({ zh, t: oc.t[i], back: oc.back[i], d }); } });
    console.log('OpenCC ' + oc.version + ' · s2tw/tw2s · ' + strings.length + ' cadenas (' + corregidas + ' con corrección de config.json) · ida y vuelta: ' + (diffs.length ? diffs.length + ' con diferencias' : 'sin diferencias'));
    diffs.forEach(x => console.log('  ≠ ' + x.zh + '  →  ' + x.t + '  →  ' + x.back + '   [' + x.d.join(' ') + ']'));
    console.table(built.map(r => ({ id: r.id, nivel: r.nivel, hanzi: r.largo, párrafos: r.parrafos.length, glosario: r.glosario.length, 'fuera de nivel': r.glosario.filter(g => g.fueraDeNivel).map(g => g.zh).join(' ') })));
    if (process.argv.includes('--dry')) return;
    fs.writeFileSync(OUT, code);
    fs.writeFileSync(path.join(ROOT, 'docs', 'lecturas-examen-hsk4-revision.md'), hoja(built, ctl));
    console.log('escrito ' + path.relative(ROOT, OUT) + ' (' + built.length + ' textos)');
})().catch(e => { console.error(e); try { srv.close(); } catch (x) { /* nada */ } process.exit(1); });
