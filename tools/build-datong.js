#!/usr/bin/env node
// tools/build-datong.js — genera classics-datong.js (el clásico 禮運大同篇 para el lector de clásicos) y docs/revision-datong.md
// desde tools/clasico-datong/fuente.json (transcripción del PDF; no se edita para corregir) + ajustes.json.
//   node tools/build-datong.js        → reescribe los dos archivos
//   node tools/build-datong.js --dry  → solo el resumen
// El zhuyin es el del PDF; el pinyin sale de ese zhuyin (tools/clasico-datong/zhuyin-pinyin.js), nunca de pinyin-pro.
// La hoja conserva tal cual el bloque «Constancia de revisión» (lo completa Ulises). tools/check-datong.js lo verifica todo.
// Sin fechas de reloj: la salida depende solo de las entradas.
'use strict';
const fs = require('fs'), path = require('path');
const { zhuyinAPinyin } = require('./clasico-datong/zhuyin-pinyin.js');
const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(__dirname, 'clasico-datong');
const OUT_JS = path.join(ROOT, 'classics-datong.js'), OUT_MD = path.join(ROOT, 'docs', 'revision-datong.md');
const C0 = '<!-- constancia: se completa a mano; build-datong.js lo conserva tal cual -->', C1 = '<!-- /constancia -->';
const HAN = /[㐀-鿿豈-﫿]/;
const han = (s) => Array.from(s).filter(c => HAN.test(c));

function derivar() {
    const F = JSON.parse(fs.readFileSync(path.join(DIR, 'fuente.json'), 'utf8'));
    const A = JSON.parse(fs.readFileSync(path.join(DIR, 'ajustes.json'), 'utf8'));
    const errores = [];
    const K = A.correcciones || {};
    // marcas del PDF con las correcciones declaradas (quitar / agregar)
    const marcas = new Set((F.marcasTono.lista || []).map(([f, i]) => f + ':' + i));
    (K.marcasQuitar || []).forEach(([f, i, c]) => { if (!marcas.delete(f + ':' + i) || han(F.frases[f - 1].zhT)[i] !== c) errores.push('corrección: no hay marca en ' + c + ' (frase ' + f + ')'); });
    (K.marcasAgregar || []).forEach(([f, i, c]) => { if (han(F.frases[f - 1].zhT)[i] !== c) errores.push('corrección: la frase ' + f + ' no tiene ' + c + ' en la posición ' + i); marcas.add(f + ':' + i); });
    const mantener = new Set(K.simplificadoMantener || []);
    const lineas = F.frases.map(f => {
        // comas agregadas (corrección): el texto del PDF + la coma, en las dos escrituras
        let zhT = f.zhT, zh = f.zh;
        (K.comas || []).filter(([n]) => n === f.n).forEach(([, antes, despues]) => {
            if (zhT !== antes) errores.push('corrección de comas: la frase ' + f.n + ' no es «' + antes + '»');
            const extra = despues.slice(antes.length); zhT = despues; zh = zh + extra;
        });
        // simplificado: se mantienen los caracteres declarados (於) en lugar de la conversión de OpenCC
        const tA = Array.from(zhT); let k = 0;
        zh = Array.from(zh).map(c => { if (!HAN.test(c)) return c; while (k < tA.length && !HAN.test(tA[k])) k++; const t = tA[k++]; return mantener.has(t) ? t : c; }).join('');
        const zyPdf = f.zy.split(' '), zy = zyPdf.slice();
        (K.zhuyin || []).filter(([n]) => n === f.n).forEach(([, c, pdf, nuevo]) => {
            const i = han(zhT).indexOf(c);
            if (i < 0 || zy[i] !== pdf) errores.push('corrección de zhuyin: ' + c + ' (frase ' + f.n + ') no es ' + pdf + ' en el PDF'); else zy[i] = nuevo;
        });
        const hT = han(zhT), hS = han(zh);
        if (hT.length !== zy.length) errores.push('frase ' + f.n + ': ' + hT.length + ' hanzi y ' + zy.length + ' sílabas de zhuyin');
        if (hS.length !== hT.length) errores.push('frase ' + f.n + ': el simplificado no tiene los mismos hanzi que el tradicional');
        const chars = zy.map((z, i) => {
            let py = '';
            try { py = zhuyinAPinyin(z); } catch (e) { errores.push('frase ' + f.n + ', ' + hT[i] + ': ' + e.message); }
            const o = { zy: z, py };
            if (marcas.has(f.n + ':' + i)) o.t32 = true; // marca naranja: 3.er tono que pasa a 2.º
            return o;
        });
        return { f, zhT, zh, chars, zyPdf };
    });
    return { F, A, lineas, errores };
}

function textoJs(d) {
    const { F, A, lineas } = d, K = A.clave;
    const tituloPy = F.titulo.zy.split(' ').map(zhuyinAPinyin);
    const info = {
        es: A.es, subtitulo: A.subtitulo, emoji: A.emoji, badge: A.badge, intro: A.intro,
        zh: F.titulo.zh, zhT: F.titulo.zhT, py: A.py, nivel: A.nivel, fuente: F.fuente, escritura: A.escritura, zhuyin: true, practica: false,
        blocks: [{ n: A.bloque, l: lineas.map(l => [l.zh, l.f.es]) }]
    };
    const zyData = {
        titulo: F.titulo.zy.split(' ').map((z, i) => ({ zy: z, py: tituloPy[i] })),
        lineas: lineas.map(l => l.chars),
        notas: lineas.map(({ f }) => f.nota || null)
    };
    return [
        '/* ============================================================',
        '   classics-datong.js — 禮運大同篇 (' + A.es + ') para el lector de clásicos.',
        '   GENERADO por tools/build-datong.js desde tools/clasico-datong/fuente.json + ajustes.json: NO editar a mano',
        '   (tools/check-datong.js lo vuelve a calcular y falla si no coincide).',
        '   · Fuente: ' + F.fuente + '. Permiso: ' + F.permiso.estado + ', informado por ' + F.permiso.informadoPor + ' el ' + F.permiso.fechaInforme + '.',
        '   · Zhuyin por carácter: el del PDF (transcripto de imágenes), con las correcciones declaradas (' + (A.correcciones || {}).origen + ').',
        '     Pinyin: derivado de ese zhuyin, nunca de pinyin-pro.',
        '   · Traducción: la del PDF, literal (con sus erratas: docs/revision-datong.md). Todo pendiente de revisión.',
        '   · Se suma a window.CLASSIC_TEXTS / window.CLASSIC_T (classics.js, cargado antes) y agrega window.CLASSIC_ZY.',
        '   ============================================================ */',
        '(function () {',
        '"use strict";',
        'var C = window.CLASSIC_TEXTS, T = window.CLASSIC_T;',
        'if (!C || !T) return;',
        'C[' + JSON.stringify(K) + '] = ' + JSON.stringify(info, null, 1) + ';',
        'T.line[' + JSON.stringify(K) + '] = ' + JSON.stringify(lineas.map(l => l.zhT)) + ';',
        'T.label[' + JSON.stringify(K) + '] = ' + JSON.stringify([A.bloque]) + ';',
        'window.CLASSIC_ZY = window.CLASSIC_ZY || {};',
        'window.CLASSIC_ZY[' + JSON.stringify(K) + '] = ' + JSON.stringify(zyData) + ';',
        '})();',
        ''
    ].join('\n');
}

function constanciaDe(md) {
    const vacia = '| Fecha | Quién | Qué se revisó | Resultado |\n|---|---|---|---|\n| — | — | — | — |';
    if (!md) return vacia;
    const a = md.indexOf(C0), b = md.indexOf(C1);
    return (a >= 0 && b > a) ? md.slice(a + C0.length, b).replace(/^\n+|\n+$/g, '') : vacia;
}

function textoHoja(d, constancia) {
    const { F, A, lineas } = d, D = A.decisiones;
    const esc = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|');
    const L = [];
    L.push('# 禮運大同篇 · hoja de revisión', '');
    L.push('GENERADA por `tools/build-datong.js` (no editar a mano, salvo el bloque «Constancia de revisión», que se conserva al regenerar).', '');
    L.push('**Fuente:** ' + F.fuente + ' (15 páginas de imágenes). **Permiso de uso: ' + F.permiso.estado + ', informado por ' + F.permiso.informadoPor + ' el ' +
        F.permiso.fechaInforme + '.** ' + F.permiso.nota + ' El PDF no está en el repo: solo la transcripción (`tools/clasico-datong/fuente.json`).', '');
    L.push('`revision`: todo **pendiente** (chino, zhuyin, pinyin derivado y traducción). Nada es `revisado` ni `nativo`. Una etiqueta distinta solo se escribe si la constancia de abajo registra quién y cuándo (regla 4 de «Después de editar» en el `README.md`).', '');
    L.push('## Constancia de revisión', '', C0, constancia, C1, '');
    L.push('## Título', '');
    L.push('- PDF, p.1: «' + F.titulo.esPdf + '». p.2, glosa por carácter: «' + F.titulo.glosaPdf + '».');
    L.push('- Interfaz: «' + A.es + '», con la línea «' + A.subtitulo + '» debajo (`' + F.titulo.zhT + '` / `' + F.titulo.zh + '`, `' + A.py + '`). En la línea, 禮運 y 禮記 quedan en tradicional en las dos escrituras. ' + D.titulo);
    L.push('- «mancomunidad» no aparece en otros lugares de la interfaz; **sí** queda en la traducción literal de la frase 2 («será una mancomunidad»).', '');
    const K = A.correcciones;
    L.push('## Correcciones: ' + K.origen, '');
    L.push('Se aplican sobre la transcripción del PDF (`fuente.json` sigue siendo el PDF tal cual). La etiqueta general no cambia: todo sigue **pendiente**.', '');
    L.push('| Qué | PDF | Se muestra |', '|---|---|---|');
    K.zhuyin.forEach(([n, c, pdf, nuevo]) => L.push('| Zhuyin de ' + c + ' (frase ' + n + ') | ' + pdf + ' (' + zhuyinAPinyin(pdf) + ') | ' + nuevo + ' (' + zhuyinAPinyin(nuevo) + ') |'));
    L.push('| Marca de cambio de tono en 使老有所終 (frase 7) | 老 y 有 | 使 y 有 |');
    K.comas.forEach(([n, antes, despues]) => L.push('| Coma después de 也 (frase ' + n + ') | ' + antes + ' | ' + despues + ' |'));
    L.push('| Simplificado de ' + K.simplificadoMantener.join(', ') + ' | 于 (OpenCC tw2s) | ' + K.simplificadoMantener.join(', ') + ' (se mantiene; excepción declarada) |');
    L.push('| Título en la interfaz | «Capítulo de la Gran Armonía» (versión anterior de esta rama) | «' + A.es + '» + «' + A.subtitulo + '» |', '');
    L.push('Con 謀 = ㄇㄡˊ (móu) deja de haber diferencia con el pinyin automático en ese carácter.', '');
    L.push('**Fusiones de OpenCC** en este texto (solo se anotan, no se cambian): ' + A.fusionesOpencc.lista.join(' · ') + '. El único que se mantiene sin convertir es 於.', '');
    L.push('## Decisiones', '');
    Object.keys(D).filter(k => k[0] !== '_' && k !== 'titulo').forEach(k => L.push('- **' + k + '**: ' + D[k]));
    L.push('- **Chino escrito por nosotros** (no está en el PDF; a revisar): el rótulo del bloque «' + A.bloque + '». También son nuestros, en español: la presentación («' + A.intro + '»), el nivel y el agrupado del pinyin del título («' + A.py + '»).');
    L.push('', '## Diferencias con el texto base de Ulises', '');
    L.push('Único carácter distinto: **矜** (texto base) → **鰥** (PDF). Además: el texto base usa 、 entre 鰥寡孤獨, 「大同」 y puntuación china; el PDF no.', '');
    L.push('## Pinyin: dónde el que se muestra difiere del automático (pinyin-pro)', '');
    L.push('| Frase | Carácter | Zhuyin → pinyin | pinyin-pro |', '|---|---|---|---|');
    A.pinyinExcepciones.lista.forEach(([n, c, pdf, auto]) => L.push('| ' + n + ' | ' + c + ' | ' + lineas[n - 1].chars[han(lineas[n - 1].zhT).indexOf(c)].zy + ' → ' + pdf + ' | ' + auto + ' |'));
    L.push('', A.pinyinExcepciones._nota, '');
    L.push('## Marcas de cambio de tono (3.º → 2.º, naranjas en p.11 y p.14–15)', '');
    L.push('| Frase | Texto | Carácter marcado (se muestra) | En el PDF | Estado |', '|---|---|---|---|---|');
    lineas.forEach(l => l.chars.forEach((c, i) => {
        if (!c.t32) return;
        const f = l.f.n, ch = han(l.zhT)[i];
        const enPdf = F.marcasTono.lista.some(([ff, ii]) => ff === f && ii === i);
        const estado = enPdf ? 'sigue la fuente (PDF)' + (f === 9 ? '; en la imagen la marca arranca sobre el zhuyin de 有; medida, cae dentro de 所 en p.11 y p.14' : '')
            : 'corregida (' + K.origen + ')';
        L.push('| ' + f + ' | ' + han(l.zhT).join('') + ' | ' + ch + ' | ' + (enPdf ? 'sí' : 'no (el PDF la pone en 老)') + ' | ' + estado + ' |');
    }));
    L.push('', A.notaMarcas, '', F.marcasTono._nota, '');
    L.push('## Erratas y dudas de la traducción (se anotan, no se corrigen)', '');
    L.push('1. Frase 13 (p.6): «no **sé** desperdiciarán» (lo esperable: «se»).');
    L.push('2. Nota de la frase 16 (p.7): «sino teme» (lo esperable: «sino que teme»).');
    L.push('3. p.1: «PRACTICAR LECTURA DE CARACTER» (lo esperable: «carácter»).');
    L.push('4. Estilo: «sólo» con tilde (frases 5 y 16); «la gran armonía» en minúscula (frase 20).', '');
    L.push('## Texto, zhuyin y pinyin derivado, frase por frase', '');
    L.push('| # | p. | Tradicional / simplificado | Zhuyin (PDF, con correcciones) | Pinyin (del zhuyin) | Traducción (PDF) |', '|---|---|---|---|---|---|');
    lineas.forEach(({ f, zhT, zh, chars }) => L.push('| ' + f.n + ' | ' + f.p + ' | ' + esc(zhT) + ' / ' + esc(zh) + ' | ' + chars.map(c => c.zy + (c.t32 ? '⁺' : '')).join(' ') + ' | ' +
        chars.map(c => c.py).join(' ') + ' | ' + esc(f.es) + (f.nota ? ' ' + esc(f.nota) : '') + ' |'));
    L.push('', '⁺ = marca de cambio de tono. La segunda versión del PDF (p.10–13) coincide sílaba por sílaba con la transcripción de p.2–9 (lo verifica `tools/check-datong.js`); esta tabla ya tiene aplicadas las correcciones.', '');
    L.push('## Fuera de esta versión', '');
    L.push('- La vista «solo tonos» (p.14–15) y la práctica quedan para después.');
    L.push('- Audio: el 🔊 de cada frase usa el mismo camino de voz que los demás clásicos (`speakCr` → servidor de voz, o la voz del sistema si falla). **No se verificó** cómo lee los polifónicos (惡, 為, 行, 長, 興, 鰥): el contenedor de desarrollo no llega al servidor de voz.');
    L.push('- La tabla pinyin→zhuyin de `app.js` (`pzPinyinToZhuyin`) convertía «you» en «ㄧ» en lugar de «ㄧㄡ» (有, 又, 右…); corregido en v240. Este clásico no la usa: su zhuyin sale del PDF.', '');
    return L.join('\n');
}

function generar() {
    const d = derivar();
    if (d.errores.length) return { d, errores: d.errores };
    const prev = fs.existsSync(OUT_MD) ? fs.readFileSync(OUT_MD, 'utf8') : '';
    return { d, errores: [], js: textoJs(d), md: textoHoja(d, constanciaDe(prev)) };
}
module.exports = { generar, derivar, OUT_JS, OUT_MD, HAN, han };

if (require.main === module) {
    const g = generar();
    if (g.errores.length) { g.errores.forEach(e => console.error('✗ ' + e)); process.exit(1); }
    const n = g.d.lineas.reduce((a, l) => a + l.chars.length, 0);
    console.log(g.d.lineas.length + ' frases · ' + n + ' caracteres · ' + g.d.F.marcasTono.lista.length + ' marcas de cambio de tono');
    if (process.argv.includes('--dry')) process.exit(0);
    fs.writeFileSync(OUT_JS, g.js); fs.writeFileSync(OUT_MD, g.md);
    console.log('escrito: classics-datong.js, docs/revision-datong.md');
}
