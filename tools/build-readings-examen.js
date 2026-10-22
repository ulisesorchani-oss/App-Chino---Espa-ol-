#!/usr/bin/env node
// tools/build-readings-examen.js — genera readings-examen.js (window.READINGS_V2) desde tools/lecturas-examen/fuente-*.json.
//   node tools/build-readings-examen.js            → reescribe readings-examen.js e imprime la tabla de control
//   node tools/build-readings-examen.js --dry      → imprime la tabla sin escribir
// Las fuentes llevan SOLO chino simplificado + español. Este script agrega, con herramientas y no a mano:
//   · el tradicional (zhT) con OpenCC s2tw (tools/lecturas-examen/opencc-s2tw.py; pip install opencc) y su ida y vuelta tw2s
//   · largo (hanzi del texto), nivelLista y fueraDeNivel de cada palabra del glosario, calculados con tools/lecturas-examen/nivel.js sobre las
//     listas EMBEBIDAS de la app (HSK 3.0, GF0025-2021; EMBEDDED_MODULE_DATA + zhSegmentAll en un navegador real, igual que tools/check-readings.js)
// tools/check-readings.js vuelve a calcular todo y exige que lo guardado coincida: editar readings-examen.js a mano falla.
const http = require('http'), fs = require('fs'), path = require('path'), cp = require('child_process');
let pw; for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(m); break; } catch (e) { /* siguiente */ } }
if (!pw) { console.error('Falta playwright'); process.exit(2); }
const ROOT = path.resolve(__dirname, '..'), SRC = path.join(__dirname, 'lecturas-examen'), OUT = path.join(ROOT, 'readings-examen.js');
const BLANK = '＿＿';
const CFG = JSON.parse(fs.readFileSync(path.join(SRC, 'config.json'), 'utf8'));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

// ── 1) fuentes ──
const src = fs.readdirSync(SRC).filter(f => /^fuente-.*\.json$/.test(f)).sort().flatMap(f => JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')));

// ── 2) todo lo que lleva tradicional, en una sola pasada por OpenCC ──
const strings = [], idx = new Map();
const S = (zh) => { if (!idx.has(zh)) { idx.set(zh, strings.length); strings.push(zh); } return zh; };
src.forEach(r => {
    S(r.titulo.zh); r.parrafos.forEach(p => S(p.zh)); r.glosario.forEach(g => S(g.zh)); (r.nombres || []).forEach(S);
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
    const o = { id: r.id, schema: 2, tipo: r.tipo || 'examen', nivel: r.nivel, genero: r.genero, emoji: r.emoji, revision: r.revision || 'pendiente',
        titulo: { zh: r.titulo.zh, zhT: T(r.titulo.zh), es: r.titulo.es },
        parrafos: r.parrafos.map(p => ({ zh: p.zh, zhT: T(p.zh), es: p.es })),
        nombres: (r.nombres || []).map(n => ({ zh: n, zhT: T(n) })),
        dentroDeNivel: r.dentro || [],
        fueraDeNivelDeclarado: r.fueraManual || [],
        largo: 0,
        glosario: r.glosario.map(g => ({ zh: g.zh, zhT: T(g.zh), categoria: g.categoria, es: g.es, nivelLista: null, fueraDeNivel: false })),
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
            const o = { zh: p.frase, zhT: llenas[p.ok[0]].fraseT, opts: p.opts, optsT: llenas.map(x => x.palabraT), ok: p.ok, why: p.why }; if (p.delTexto === false) o.delTexto = false; return o; }),
        capa2: r.capa2 ? { notas: (r.capa2.notas || []).map(n => ({ zh: n.zh, zhT: T(n.zh), es: n.es })), colocaciones: (r.capa2.colocaciones || []).map(n => ({ zh: n.zh, zhT: T(n.zh), es: n.es })) } : undefined
    };
    if (!o.capa2) delete o.capa2;
    if (r.revisor) o.revisor = r.revisor;
    if (!o.nombres.length) delete o.nombres;
    if (!o.dentroDeNivel.length) delete o.dentroDeNivel;
    if (!o.fueraDeNivelDeclarado.length) delete o.fueraDeNivelDeclarado;
    return o;
});

// ── hoja de revisión (docs/lecturas-examen-hsk4-revision.md): una por texto, para revisar sin abrir código ──
const esc = x => String(x).replace(/\|/g, '\\|');
const VERIF = [['悄悄', '悄悄'], ['擦', '擦'], ['郊區', '郊区'], ['視頻', '视频'], ['春聯', '春联'], ['毛筆', '毛笔'], ['氣氛', '气氛'], ['現成', '现成'], ['橫批', '横批'], ['婚禮', '婚礼'], ['晚點', '晚点'], ['堵車', '堵车'], ['座位', '座位'], ['省', '省']]; // pedidas en la revisión: [tradicional, simplificado] ¿en qué nivel están?
function hoja(rs, ctl, meta) {
    const L = ['# Lecturas tipo examen · HSK 4 · hoja de revisión', '',
        'GENERADA por `tools/build-readings-examen.js` (no editar a mano). Nivel aproximado, no oficial. Los textos son originales, escritos para la app. `revision`: `pendiente` (sin revisar) · `revisado` (lo revisó el autor de la app) · `nativo` (lo confirmó una profesora o un hablante; exige `revisor`).', '',
        '**Lista de referencia: ' + meta.lista + '**, tal como está embebida en la app (`EMBEDDED_MODULE_DATA`): HSK 1–4 acumulado = ' + meta.conteo[4] + ' palabras (HSK 1 = ' + meta.conteo[1] + ' · 1–2 = ' + meta.conteo[2] + ' · 1–3 = ' + meta.conteo[3] + ' · 1–9 = ' + meta.conteo[9] + '). ' +
        'El encabezado de `data-embedded.js` avisa que HSK 4–9 no se re-verificó contra el original, así que «no está» significa «no está en la lista de la app».', '',
        '**Regla de nivel (por palabras):** una palabra está dentro si figura en HSK 1..n (simplificado o tradicional, con erhua 儿 y partes fijas de patrones como …分之…) o se arma con palabras de la lista; si la lista la pone en un nivel más alto (毛笔 = HSK 5) está fuera aunque sus caracteres sean conocidos. Los nombres propios no cuentan. `*` = fuera de nivel. Detalle en `tools/lecturas-examen/nivel.js`.', '',
        '| Tipo | Cobertura mínima | Tope de palabras fuera de nivel |', '|---|---|---|'];
    Object.keys(CFG.tipos).forEach(t => L.push('| `' + t + '` | ' + CFG.tipos[t].coberturaMinima + ' % | ' + (CFG.tipos[t].maxFuera === null ? 'sin tope (entra solo como estudio, no en la práctica de examen)' : CFG.tipos[t].maxFuera) + ' |'));
    L.push('', '## Verificación contra las listas embebidas', '', '| Tradicional | Simplificado | Nivel en la lista | Significado en la lista | ¿Dentro de HSK 4? |', '|---|---|---|---|---|');
    meta.verif.forEach(v => L.push('| ' + v.t + ' | ' + v.s + ' | ' + (v.nivel === null ? '**no está**' : 'HSK ' + v.nivel) + ' | ' + (v.es || '—') + ' | ' + (v.nivel !== null && v.nivel <= 4 ? 'sí' : '**no** *') + ' |'));
    L.push('', 'Nota: la lista registra 省 solo como «provincia» (HSK 2); el sentido «ahorrar» del texto 4 comparte la entrada pero no está registrado como tal. Decisión de la revisión: 省 va sin *.', '', '---', '');
    rs.forEach((r, i) => { const c = ctl[i], f = (src[i].control || {}).frases || [], letra = 'ABCD', rg = CFG.largo[r.nivel], tp = CFG.tipos[r.tipo];
        L.push('## ' + (i + 1) + '. ' + r.emoji + ' ' + r.titulo.zh + ' / ' + r.titulo.zhT + ' — ' + r.titulo.es, '', '`' + r.id + '` · ' + r.genero + ' · HSK ' + r.nivel + ' · tipo: `' + r.tipo + '`' + (r.tipo === 'estudio' ? ' (fuera de la práctica de examen)' : '') + ' · revision: ' + r.revision, '',
            '### Tabla de control', '', '| Control | Resultado |', '|---|---|',
            '| Largo | ' + r.largo + ' hanzi (rango HSK ' + r.nivel + ': ' + rg[0] + '–' + rg[1] + ') |', '| Nivel por palabras (' + meta.lista + ', HSK 1–' + r.nivel + ') | ' + c.cob.toFixed(1) + ' % (mínimo ' + tp.coberturaMinima + ' %) · ' + c.segmentos + ' palabras |',
            '| Palabras fuera de nivel en el texto | ' + (c.fuera.length ? c.fuera.map(x => x.zh + '* (' + x.nivel + ')').join(' · ') : 'ninguna') + ' — ' + c.fuera.length + (tp.maxFuera === null ? ' (sin tope)' : ' de ' + tp.maxFuera + ' permitidas') + ' |',
            '| Chino | ' + ({ pendiente: 'pendiente de revisión', revisado: 'revisado por el docente; sin confirmación de hablante nativo', nativo: 'confirmado por hablante nativo' + (r.revisor ? ' (' + r.revisor + ')' : '') })[r.revision] + ' |',
            '| Nombres propios (no cuentan) | ' + ((r.nombres || []).map(n => n.zh).join(' · ') || '—') + ' |',
            '| Coincidencias con palabra de nivel más alto, revisadas (cuentan como dentro) | ' + ((r.dentroDeNivel || []).join(' · ') || '—') + ' |',
            '| Declaradas fuera de nivel a mano (el cálculo las da como dentro; cuentan como fuera) | ' + ((r.fueraDeNivelDeclarado || []).join(' · ') || '—') + ' |',
            '| Glosario | ' + r.glosario.length + ' palabras, ' + r.glosario.filter(g => g.fueraDeNivel).length + ' con * |');
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
        L.push('', 'Palabras del banco: ' + r.banco.palabras.join(' · ') + ' (sobrantes: ' + r.banco.palabras.slice(r.banco.huecos.length).join(' · ') + ')');
        const pq = src[i].banco.porQue;
        if (pq) { L.push('', '**Por qué ningún sobrante encaja en un hueco:**', ''); r.banco.palabras.slice(r.banco.huecos.length).forEach(sb => { L.push('- **' + sb + '**'); (pq[sb] || []).forEach(x => L.push('  - ' + x)); }); }
        L.push('', '### Palabras parecidas', '');
        r.parecidas.forEach((p, k) => { L.push((k + 1) + '. ' + (p.delTexto === false ? '_(oración nueva, no está en el texto)_ ' : '') + p.zh + '  →  ' + p.opts.map((o, j) => (p.ok.includes(j) ? '✅ ' : '❌ ') + o).join(' · '), '   - ' + p.why); }); L.push('');
        L.push('### Glosario (* = fuera de nivel)', '', '| 简体 | 繁體 | Categoría | Español | Nivel en la lista |', '|---|---|---|---|---|');
        r.glosario.forEach(g => L.push('| ' + g.zh + (g.fueraDeNivel ? '*' : '') + ' | ' + g.zhT + (g.fueraDeNivel ? '*' : '') + ' | ' + g.categoria + ' | ' + g.es + ' | ' + (g.nivelLista === null ? 'no está' + (g.fueraDeNivel ? '' : ' (se arma con palabras del nivel)') : 'HSK ' + g.nivelLista) + ' |'));
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
    await pg.addScriptTag({ content: fs.readFileSync(path.join(SRC, 'nivel.js'), 'utf8') });
    const calc = await pg.evaluate(([items, verif]) => {
        const HAN = /[㐀-鿿]/, LN = window.LecNivel;
        return { lista: LN.LISTA, conteo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => LN.conteo(n)),
            verif: verif.map(([t, sm]) => { const hit = (() => { for (let i = 1; i <= 9; i++) { const e = EMBEDDED_MODULE_DATA['HSK' + i].find(e => e[0] === sm || e[1] === t); if (e) return e; } return null; })(); return { t, s: sm, nivel: LN.nivelExacto(sm) === null ? LN.nivelExacto(t) : LN.nivelExacto(sm), es: hit ? hit[3] : '' }; }),
            items: items.map(r => {
                const opts = { nombres: r.nombres, dentro: r.dentro, manual: r.manual }, a = LN.analizar(r.parrafos, r.nivel, opts);
                return { cob: a.cobertura, segmentos: a.segmentos, fuera: a.fuera.map(x => ({ zh: x, nivel: LN.nivelExacto(x) === null ? 'no está' : 'HSK ' + LN.nivelExacto(x) })),
                    largo: Array.from(r.parrafos.join('')).filter(ch => HAN.test(ch)).length,
                    gl: r.glosario.map(g => ({ nivelLista: LN.nivelExacto(g), fuera: LN.fueraEntrada(g, r.nivel, r.manual) })) };
            }) };
    }, [built.map(r => ({ nivel: r.nivel, parrafos: r.parrafos.map(p => p.zh), nombres: (r.nombres || []).map(n => n.zh), dentro: r.dentroDeNivel || [], manual: r.fueraDeNivelDeclarado || [], glosario: r.glosario.map(g => g.zh) })), VERIF]);
    await b.close(); srv.close();
    built.forEach((r, i) => { const c = calc.items[i]; r.control = c; r.largo = c.largo; r.glosario.forEach((g, j) => { g.nivelLista = c.gl[j].nivelLista; g.fueraDeNivel = c.gl[j].fuera; }); });

    // ── 5) archivo ──
    const header = [
        '// ============================================================',
        '// readings-examen.js — LECTURAS tipo examen · ESQUEMA v2 (solo datos, sin pantalla)',
        '// ------------------------------------------------------------',
        '// GENERADO por tools/build-readings-examen.js desde tools/lecturas-examen/fuente-*.json — NO editar a mano:',
        '// tools/check-readings.js vuelve a calcular largo, fueraDeNivel y el tradicional y falla si no coinciden.',
        '// Textos originales escritos para la app. Nivel aproximado, NO oficial. Tradicional: OpenCC s2tw (ida y vuelta tw2s verificada).',
        '// Lista de referencia del nivel: HSK 3.0 (GF0025-2021), la embebida en la app (ver tools/lecturas-examen/nivel.js).',
        '// tipo: \'examen\' (corto, entra en la práctica de examen: ≥ 90 % de nivel y ≤ 5 palabras fuera) | \'estudio\' (solo lectura/estudio, fuera de la práctica de examen).',
        '//',
        '// Aditivo y separado de window.READINGS (v1): la rama de interfaz unificará ambas en una sola fuente.',
        '//   { id, schema: 2, tipo: \'examen\', nivel: 3|4|5, genero, emoji, revision: \'pendiente\'|\'revisado\'|\'nativo\',',
        '//     revisor?: \'nombre\',                             // obligatorio si revision = \'nativo\' (quién lo confirmó)',
        '//     titulo: { zh, zhT, es },',
        '//     parrafos: [{ zh, zhT, es }],                     // el texto, por párrafos (visible durante las preguntas)',
        '//     nombres?: [{ zh, zhT }],                         // nombres propios del texto: no cuentan para el nivel',
        '//     dentroDeNivel?: [zh],                            // coincidencias con una palabra de nivel más alto revisadas a mano (都会 = 都 + 会)',
        '//     fueraDeNivelDeclarado?: [zh],                    // el cálculo las da como dentro (se arman con palabras de la lista) pero el autor las declara fuera (大年三十); el validador falla si sobran',
        '//     largo,                                           // hanzi del texto — CALCULADO',
        '//     glosario: [{ zh, zhT, categoria, es, nivelLista, fueraDeNivel }],  // 8–12; nivelLista = HSK 1–9 de la entrada exacta o null; ambos CALCULADOS',
        '//     comprension: [ { tipo: idea|detalle|vocabulario, es, opts[], why, whyNot[] }   // opts[0] = CORRECTA (se baraja al mostrar)',
        '//                  | { tipo: \'vf\', es, vf: true|false, why } ],                    // verdadero/falso: la pantalla lo resuelve la rama de interfaz',
        '//     banco: { huecos: [{ zh (con ＿＿), zhT, resp, respT }], palabras[], palabrasT[] },  // palabras = respuestas + 1–2 sobrantes',
        '//     parecidas: [{ zh (con ＿＿), zhT, opts[], optsT[], ok: [índices válidos], why, delTexto?: false }],   // desde HSK 4; delTexto:false = oración nueva',
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
    console.table(built.map((r, i) => ({ id: r.id, tipo: r.tipo, hanzi: r.largo, 'nivel %': +ctl[i].cob.toFixed(1), 'fuera de nivel (texto)': ctl[i].fuera.map(x => x.zh).join(' '), glosario: r.glosario.length, 'glosario con *': r.glosario.filter(g => g.fueraDeNivel).map(g => g.zh).join(' ') })));
    if (process.argv.includes('--dry')) return;
    fs.writeFileSync(OUT, code);
    fs.writeFileSync(path.join(ROOT, 'docs', 'lecturas-examen-hsk4-revision.md'), hoja(built, ctl, calc));
    console.log('escrito ' + path.relative(ROOT, OUT) + ' (' + built.length + ' textos)');
})().catch(e => { console.error(e); try { srv.close(); } catch (x) { /* nada */ } process.exit(1); });
