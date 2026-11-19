#!/usr/bin/env node
// tools/build-familia.js — genera lessons-familia.js (window.FAMILY_LESSONS) y docs/revision-familia.md desde
// tools/lecciones-familia/fuente-guofeng.json (no se edita) + tools/lecciones-familia/ajustes.json.
//   node tools/build-familia.js         → reescribe los dos archivos
//   node tools/build-familia.js --dry   → solo muestra el resumen
// La hoja conserva TAL CUAL el bloque «Constancia de revisión» (entre las marcas <!-- constancia --> … <!-- /constancia -->):
// lo completa Ulises a mano. tools/check-familia.js vuelve a calcular todo y exige que lo guardado coincida.
'use strict';
const fs = require('fs'), path = require('path');
const D = require('./lecciones-familia/derivar.js');
const OUT_JS = path.join(D.ROOT, 'lessons-familia.js'), OUT_MD = path.join(D.ROOT, 'docs', 'revision-familia.md');
const C0 = '<!-- constancia: se completa a mano; build-familia.js lo conserva tal cual -->', C1 = '<!-- /constancia -->';
const CONSTANCIA_VACIA = [
    '| Fecha | Quién | Qué se revisó | Resultado |',
    '|---|---|---|---|',
    '| — | — | — | — |'
].join('\n');

function constanciaDe(md) {
    if (!md) return CONSTANCIA_VACIA;
    const a = md.indexOf(C0), b = md.indexOf(C1);
    return (a >= 0 && b > a) ? md.slice(a + C0.length, b).replace(/^\n+|\n+$/g, '') : CONSTANCIA_VACIA;
}

function textoDatos(d) {
    const L = D.datos(d);
    const linea = (o) => JSON.stringify(o);
    const partes = L.map(l => {
        const cab = Object.assign({}, l); delete cab.grupos; delete cab.reglas;
        let s = '  ' + linea(cab).replace(/}$/, '');
        if (l.grupos) s += ',\n   "grupos": [\n' + l.grupos.map(g => '    {"titulo": ' + JSON.stringify(g.titulo) + ', "items": [\n' +
            g.items.map(it => '     ' + linea(it)).join(',\n') + '\n    ]}').join(',\n') + '\n   ]';
        if (l.reglas) s += ',\n   "reglas": [\n' + l.reglas.map(r => '    ' + linea(r)).join(',\n') + '\n   ]';
        return s + '}';
    });
    return [
        '// ═══════════════════════════════════════════════════════════════════',
        '// lessons-familia.js — LECCIONES DE FAMILIA (fichas) · TOCFL, nivel aproximado',
        '// GENERADO por tools/build-familia.js desde tools/lecciones-familia/fuente-guofeng.json + ajustes.json. NO editar a mano:',
        '// tools/check-familia.js lo vuelve a calcular y falla si no coincide.',
        '// Fuente: ' + d.A.fuente + ' («Mapa de la familia», transcrito de una captura). Permiso de uso: a confirmar con el maestro.',
        '// revision: todos «pendiente» (el chino lo revisa Ulises; constancia en docs/revision-familia.md). Zhuyin derivado del pinyin',
        '// de la fuente (tono neutro adelante: ˙ㄇㄚ), pendiente de revisión. No entra en GRADED_LESSONS ni en el SRS.',
        '// Esquema: { id, kind:"familia", hsk, exam:"TOCFL", examLvl, nivelAprox, emoji, titleZh, titleZhT, titleEs, blurb, fuente,',
        '//   grupos:[{ titulo, items:[{ id, zh, zhT, py, zy, es, gen, linea, cat, revision, verificar?, ancla?, destacarCotidiano?,',
        '//   cotidianoIgual?, cotidiano:[{ zh, zhT, py, zy, verificar?, repetido? }] }] }] | reglas:[{ marcas, es, ejemplos }] }',
        '// ═══════════════════════════════════════════════════════════════════',
        'window.FAMILY_LESSONS = [',
        partes.join(',\n'),
        '];',
        ''
    ].join('\n');
}

function textoHoja(d, constancia) {
    const esc = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|');
    const cot = (it) => it.cotidiano.filter(c => !c.repetido).map(c => c.zhT + (c.zh !== c.zhT ? ' / ' + c.zh : '') + ' ' + c.py + ' ' + c.zy + (c.verificar ? ' ⚠' : '')).join('; ') || (it.cotidianoIgual ? '(la misma)' : '—');
    const L = [];
    L.push('# Lecciones de familia · hoja de revisión', '');
    L.push('GENERADA por `tools/build-familia.js` (no editar a mano, salvo el bloque «Constancia de revisión», que se conserva al regenerar).');
    L.push('', '**Fuente: ' + d.A.fuente + '** («Mapa de la familia», `tools/lecciones-familia/fuente-guofeng.json`, transcrito de una captura). ' +
        '**Permiso de uso: a confirmar con el maestro** (el PR queda sin mergear hasta confirmarlo). Nivel aproximado, no oficial.');
    L.push('', '`revision`: los ' + d.items.length + ' ítems están en `pendiente`. Ninguno es `revisado` ni `nativo`. Una etiqueta distinta de `pendiente` solo se escribe si ' +
        'la constancia de abajo registra quién la puso y cuándo (regla 4 de «Después de editar» en el `README.md`).');
    L.push('', '## Constancia de revisión', '', C0, constancia, C1, '');
    L.push('## A confirmar con el maestro', '');
    L.push('- **叔 = shú** (ㄕㄨˊ), la convención TOCFL de la app (`pinyin-tocfl.js`, módulo TOCFL-A2). La fuente dice **shū**. Afecta a: ' +
        Object.keys(d.A.pinyin).filter(k => k[0] !== '_').map(k => k + ' (fuente: ' + d.todas.find(p => p.zhT === k).pyFuente + ')').join(', ') + ' y la marca 叔 de «Cómo se arman los términos».');
    L.push('- **姊夫 / 妹夫**: el «mayor / menor» lo agregamos nosotros; la fuente dice «Cuñado (esposo de la hermana)».');
    const ver = d.F.terminos.filter(t => t.verificar);
    L.push('- **Letra chica en la captura** (`verificar: true`, se conserva en los datos): ' + ver.length + ' términos, ' + d.todas.filter(p => p.verificar).length + ' piezas: ' +
        ver.map(t => t.hanzi + ' (' + [t.hanzi].concat(t.cotidiano.map(c => c.hanzi)).join(' → ') + ')').join('; ') + '.');
    L.push('', '## Decisiones de armado (`tools/lecciones-familia/ajustes.json`)', '');
    L.push('- **Simplificado** escrito a mano, carácter por carácter: ' + Object.keys(d.A.simplificado).filter(k => k[0] !== '_').map(k => k + '→' + d.A.simplificado[k]).join(', ') +
        '. 姊 queda 姊 en las dos escrituras. **Resultado de OpenCC:** ' + d.A.resultadoOpencc);
    L.push('- **Zhuyin** derivado del pinyin de la fuente con la tabla de `app.js` (`pzPinyinToZhuyin`, sin modificarla), alineado sílaba por sílaba; ' +
        'la marca del tono neutro va **adelante** (˙ㄇㄚ). Alineado a mano (pinyin-pro no conoce la lectura): ' +
        Object.keys(d.A.alineadoManual).filter(k => k[0] !== '_').map(k => k + ' = ' + d.A.alineadoManual[k].join('/')).join(', ') + '. **Todo el zhuyin está pendiente de revisión.**');
    L.push('- **Pares con «·»**: se separan por posición. Forma cotidiana única para dos formales, asignada por significado: ' +
        Object.keys(d.A.asignarCotidiano).filter(k => k[0] !== '_').map(k => k + ' → ' + d.A.asignarCotidiano[k]).join(', ') + '.');
    L.push('- **Español**: el de la fuente, salvo las ' + Object.keys(d.A.espanol).filter(k => k[0] !== '_').length + ' piezas de los pares y las dos glosas que llevaban caracteres chinos (表兄·表弟, 表姊·表妹), escritas por nosotros.');
    L.push('- **Chino escrito por nosotros** (no está en la fuente; a revisar): los títulos de las lecciones (' + d.lecciones.map(l => l.titleZhT).join(', ') + ').');
    L.push('- **«Cómo se arman los términos»**: las 4 reglas de la fuente, reordenadas en marca + explicación + ejemplos.');
    L.push('', '### Notas por término (solo en esta hoja)', '');
    Object.keys(d.A.notasRevision).filter(k => k[0] !== '_').forEach(k => L.push('- **' + k + '**: ' + d.A.notasRevision[k]));
    L.push('', '## Pinyin: dónde la fuente y la app difieren', '');
    L.push('Se muestra siempre el pinyin de la fuente (o el ajuste de 叔); nunca el generado. Columna «app»: lo que generaría la app (pinyin-pro + tabla TOCFL por palabra entera).', '');
    L.push('| Pieza | Fuente | Se muestra | App |', '|---|---|---|---|');
    const norm = (p) => p.normalize('NFC').replace(/['’\s]/g, '').toLowerCase();
    d.todas.filter(p => !p.repetido && (norm(p.pyApp) !== norm(p.pyFuente) || p.py !== p.pyFuente))
        .forEach(p => L.push('| ' + p.zhT + ' | ' + p.pyFuente + ' | ' + p.py + ' | ' + p.pyApp + ' |'));
    L.push('', '## Ítems por lección', '');
    d.lecciones.forEach(l => {
        L.push('### ' + l.emoji + ' ' + l.titleEs + ' · ' + l.titleZhT + (l.titleZh !== l.titleZhT ? ' / ' + l.titleZh : '') + ' · TOCFL ' + l.examLvl + ' (nivel aproximado)', '');
        if (l.grupos) {
            L.push('| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |', '|---|---|---|---|---|---|---|');
            l.grupos.forEach(g => g.items.forEach(it => L.push('| ' + it.zhT + (it.zh !== it.zhT ? ' / ' + it.zh : '') + (it.verificar ? ' ⚠' : '') + ' | ' + it.py + ' | ' + it.zy + ' | ' + esc(it.es) +
                ' | ' + esc(cot(it)) + ' | ' + [it.ancla && 'ancla «Yo» (fuera del conteo)', it.destacarCotidiano && 'cotidiano a la vista', it.cotidianoIgual && 'una sola vez'].filter(Boolean).join(', ') + ' | ' + it.revision + ' |')));
        } else {
            l.reglas.forEach(r => L.push('- ' + r.marcas.map(m => m.zhT + ' ' + m.py + ' ' + m.zy).join(' · ') + ': ' + r.es + ' Ejemplos: ' + r.ejemplos.map(e => e.zhT).join(', ') + '.'));
        }
        L.push('');
    });
    L.push('⚠ = `verificar: true` (letra chica en la captura).', '');
    L.push('## La fuente no trae forma cotidiana', '');
    L.push('En pantalla no se muestra la línea «cotidiano» (no se inventa una forma): ' + d.items.filter(it => !it.cotidiano.length).map(it => it.zhT).join(', ') + '.', '');
    return L.join('\n');
}

function generar() {
    const d = D.derivar();
    if (d.errores.length) return { d, errores: d.errores };
    const prev = fs.existsSync(OUT_MD) ? fs.readFileSync(OUT_MD, 'utf8') : '';
    return { d, errores: [], js: textoDatos(d), md: textoHoja(d, constanciaDe(prev)) };
}

module.exports = { generar, OUT_JS, OUT_MD };

if (require.main === module) {
    const g = generar();
    if (g.errores.length) { g.errores.forEach(e => console.error('✗ ' + e)); process.exit(1); }
    const d = g.d, n = d.items.filter(it => !it.ancla).length;
    console.log(d.lecciones.map(l => '  ' + l.id + ' · TOCFL ' + l.examLvl + ' · ' + (l.grupos ? l.grupos.reduce((a, gr) => a + gr.items.filter(it => !it.ancla).length, 0) + ' ítems' : l.reglas.length + ' reglas')).join('\n'));
    console.log('fuente: ' + d.F.terminos.length + ' términos → ' + d.items.length + ' ítems formales (' + n + ' + 1 ancla) y ' + (d.todas.length - d.items.length) + ' formas cotidianas = ' + d.todas.length + ' piezas');
    if (process.argv.includes('--dry')) process.exit(0);
    fs.writeFileSync(OUT_JS, g.js); fs.writeFileSync(OUT_MD, g.md);
    console.log('escrito: lessons-familia.js, docs/revision-familia.md');
}
