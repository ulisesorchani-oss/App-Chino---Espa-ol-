#!/usr/bin/env node
// tools/check-datong.js — valida el clásico 禮運大同篇 (classics-datong.js + docs/revision-datong.md). Solo Node.
//   node tools/check-datong.js   → una línea por comprobación (✓ / ✗) y «comprobaciones N · FALLAS: k»; código 1 si algo falla
// Compara contra la TRANSCRIPCIÓN del PDF (tools/clasico-datong/fuente.json) y contra valores literales escritos acá; no puede
// leer el PDF: la revisión de Ulises es la verificación real.
//   · regenerable: tools/build-datong.js da exactamente classics-datong.js y la hoja (fuera del bloque de constancia)
//   · 20 frases, 107 caracteres, un zhuyin por hanzi; las dos lecturas del PDF (p.2–9 y p.10–13) coinciden sílaba por sílaba
//   · zhuyin de referencia (長, 分, 惡, 為, 與, 鰥, 謀, 不…) y pinyin derivado de referencia; el pinyin coincide con pinyin-pro
//     salvo la lista de excepciones declarada (長, 分, 惡 ×2, 謀): ninguna diferencia nueva sin declarar
//   · traducción literal del PDF, con sus erratas (no se corrigieron); marcas de cambio de tono en su lugar
//   · todo pendiente; sin «revisado», «nativo» ni revisor; permiso tal como lo informó Ulises; sin autoría inventada
//   · simplificado: OpenCC tw2s (si está instalado; si no, «PARCIAL: …», nunca verde)
//   · los otros 9 clásicos no cambian (classics.js no se toca) y el clásico nuevo no entra en Hoy (CLASSICS_MODULES)
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const B = require('./build-datong.js');
const { zhuyinAPinyin } = require('./clasico-datong/zhuyin-pinyin.js');
const ROOT = path.resolve(__dirname, '..');
let n = 0, fallas = 0;
const ok = (c, m) => { n++; if (c) console.log('✓ ' + m); else { fallas++; console.log('✗ ' + m); } };

const g = B.generar();
ok(!g.errores.length, 'la fuente y los ajustes se derivan sin errores' + (g.errores.length ? ': ' + g.errores.join(' | ') : ''));
const js = fs.readFileSync(B.OUT_JS, 'utf8'), md = fs.readFileSync(B.OUT_MD, 'utf8');
ok(g.js === js, 'classics-datong.js = lo que genera tools/build-datong.js (no se editó a mano)');
ok(g.md === md, 'docs/revision-datong.md = lo que genera tools/build-datong.js (fuera del bloque de constancia)');

// cargado como en la app: después de classics.js
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'classics.js'), 'utf8'), ctx);
const antes = Object.keys(ctx.window.CLASSIC_TEXTS).slice();
vm.runInNewContext(js, ctx);
const K = 'Clasicos-Datong', C = ctx.window.CLASSIC_TEXTS[K], TL = ctx.window.CLASSIC_T.line[K], Z = ctx.window.CLASSIC_ZY && ctx.window.CLASSIC_ZY[K];
ok(antes.length === 9 && !antes.includes(K) && Object.keys(ctx.window.CLASSIC_TEXTS).length === 10, 'los 9 clásicos de classics.js siguen y se suma uno: ' + K);
ok(C && TL && Z && C.blocks.length === 1 && C.blocks[0].l.length === 20 && TL.length === 20 && Z.lineas.length === 20, '20 frases en simplificado, tradicional y zhuyin');
const F = JSON.parse(fs.readFileSync(path.join(__dirname, 'clasico-datong', 'fuente.json'), 'utf8'));
const A = JSON.parse(fs.readFileSync(path.join(__dirname, 'clasico-datong', 'ajustes.json'), 'utf8'));
const han = B.han;
const HANc = (c) => B.HAN.test(c);
const total = TL.reduce((a, l) => a + han(l).length, 0);
ok(total === 107 && Z.lineas.every((cz, i) => cz.length === han(TL[i]).length && cz.length === han(C.blocks[0].l[i][0]).length), '107 caracteres; un zhuyin por hanzi en cada frase (tradicional y simplificado)');
const ZYRE = /^˙?[ㄅ-ㄩ]+[ˊˇˋ]?$/;
const malos = []; Z.lineas.forEach((cz, i) => cz.forEach((c, k) => { if (!ZYRE.test(c.zy)) malos.push((i + 1) + ':' + han(TL[i])[k] + ' «' + c.zy + '»'); }));
ok(!malos.length, 'cada zhuyin es una sílaba bien formada (neutro adelante, tono al final)' + (malos.length ? ': ' + malos.join(' | ') : ''));
const difT = F.frases.filter(f => f.zy !== f.testigo2.zy).map(f => f.n);
ok(!difT.length, 'las dos lecturas del PDF (p.2–9 y p.10–13) coinciden en las 20 frases' + (difT.length ? ': difieren ' + difT.join(',') : ''));

// valores de referencia (zhuyin del PDF)
const zyDe = (frase, ch, nth) => { const h = han(TL[frase - 1]); let k = -1; for (let i = 0, c = 0; i < h.length; i++) if (h[i] === ch && c++ === (nth || 0)) { k = i; break; } return k < 0 ? null : Z.lineas[frase - 1][k]; };
const REF = [[9, '長', 'ㄓㄤˇ', 'zhǎng'], [12, '分', 'ㄈㄣˋ', 'fèn'], [13, '惡', 'ㄨˋ', 'wù'], [15, '惡', 'ㄨˋ', 'wù'], [17, '謀', 'ㄇㄡˊ', 'móu'],
    [2, '為', 'ㄨㄟˊ', 'wéi'], [16, '為', 'ㄨㄟˋ', 'wèi'], [3, '與', 'ㄩˇ', 'yǔ'], [1, '行', 'ㄒㄧㄥˊ', 'xíng'], [14, '藏', 'ㄘㄤˊ', 'cáng'], [17, '興', 'ㄒㄧㄥ', 'xīng'],
    [10, '鰥', 'ㄍㄨㄢ', 'guān'], [7, '有', 'ㄧㄡˇ', 'yǒu'], [9, '幼', 'ㄧㄡˋ', 'yòu'], [12, '女', 'ㄋㄩˇ', 'nǚ'], [6, '子', 'ㄗˇ', 'zǐ'],
    [14, '不', 'ㄅㄨˊ', 'bú'], [16, '不', 'ㄅㄨˊ', 'bú'], [18, '不', 'ㄅㄨˊ', 'bú'], [19, '不', 'ㄅㄨˊ', 'bú'], [15, '不', 'ㄅㄨˋ', 'bù'], [17, '不', 'ㄅㄨˋ', 'bù'], [5, '不', 'ㄅㄨˋ', 'bù']];
const malRef = REF.filter(([f, c, zy, py]) => { const x = zyDe(f, c); return !x || x.zy !== zy || x.py !== py; }).map(([f, c, zy, py]) => f + ':' + c + ' (debía ' + zy + ' ' + py + ', hay ' + JSON.stringify(zyDe(f, c)) + ')');
ok(!malRef.length, 'zhuyin y pinyin de referencia (' + REF.length + ' casos: polifónicos, 鰥, 有, 不 con y sin cambio de tono)' + (malRef.length ? ': ' + malRef.join(' | ') : ''));
ok(Z.titulo.map(t => t.zy).join(' ') === 'ㄌㄧˇ ㄩㄣˋ ㄉㄚˋ ㄊㄨㄥˊ ㄆㄧㄢ' && Z.titulo.map(t => t.py).join(' ') === 'lǐ yùn dà tóng piān', 'título 禮運大同篇: ㄌㄧˇ ㄩㄣˋ ㄉㄚˋ ㄊㄨㄥˊ ㄆㄧㄢ (lǐ yùn dà tóng piān)');
// el pinyin guardado sale del zhuyin guardado…
const desv = []; Z.lineas.forEach((cz, i) => cz.forEach((c, k) => { if (zhuyinAPinyin(c.zy) !== c.py) desv.push((i + 1) + ':' + k); }));
ok(!desv.length, 'el pinyin guardado es el que sale del zhuyin guardado' + (desv.length ? ': ' + desv.join(',') : ''));
// …y solo difiere de pinyin-pro en las excepciones declaradas
const PP = require(path.join(ROOT, 'pinyin-pro.min.js'));
const dif = [];
// sobre el simplificado de OpenCC (于): pinyin-pro lee 於 como «wū»; el texto que se muestra mantiene 於 (corrección)
C.blocks[0].l.forEach(([zh], i) => { const hs = han(zh), auto = PP.pinyin(hs.join('').replace(/於/g, '于'), { type: 'array' }); hs.forEach((c, k) => { if (Z.lineas[i][k].py !== auto[k]) dif.push([i + 1, han(TL[i])[k], Z.lineas[i][k].py, auto[k]]); }); });
const decl = A.pinyinExcepciones.lista.map(x => x.join('|')), vistas = dif.map(x => x.join('|'));
ok(JSON.stringify(vistas) === JSON.stringify(decl), 'contra pinyin-pro solo difieren las ' + decl.length + ' excepciones declaradas (長, 分, 惡 ×2)' + (JSON.stringify(vistas) === JSON.stringify(decl) ? '' : ': ' + vistas.join(' ; ')));

// traducción literal y marcas
ok(C.blocks[0].l.every(([, es], i) => es === F.frases[i].es) && Z.notas.every((x, i) => (x || null) === (F.frases[i].nota || null)), 'traducción y notas = las del PDF (transcripción), frase por frase');
ok(F.frases[12].es.includes('no sé desperdiciarán') && F.frases[15].nota.includes('sino teme'), 'las erratas del PDF siguen tal cual («no sé desperdiciarán», «sino teme»): no se corrigieron en silencio');
ok(/no \*\*sé\*\* desperdiciarán/.test(md) && /sino que teme/.test(md) && /CARACTER/.test(md), 'las erratas están anotadas en la hoja de revisión');
const t32 = []; Z.lineas.forEach((cz, i) => cz.forEach((c, k) => { if (c.t32) t32.push((i + 1) + ':' + han(TL[i])[k]); }));
ok(JSON.stringify(t32) === JSON.stringify(['7:使', '7:有', '8:有', '9:所', '11:有', '12:女']), 'marcas de cambio de tono en su lugar (使 y 有 en 使老有所終, corregido): ' + t32.join(' '));
// los datos publicados difieren de la transcripción del PDF SOLO en las correcciones declaradas
{
    const K = A.correcciones, dif = [];
    F.frases.forEach((f, i) => {
        const coma = K.comas.find(([n]) => n === f.n);
        const zhTesp = coma ? coma[2] : f.zhT;
        if (TL[i] !== zhTesp) dif.push('tradicional ' + f.n);
        const tA = Array.from(TL[i]).filter(c => HANc(c)), sEsp = Array.from(f.zh + (coma ? coma[2].slice(coma[1].length) : '')), out = [];
        let k = 0; sEsp.forEach(c => { if (!HANc(c)) { out.push(c); return; } const t = tA[k++]; out.push(K.simplificadoMantener.includes(t) ? t : c); });
        if (C.blocks[0].l[i][0] !== out.join('')) dif.push('simplificado ' + f.n);
        const zyEsp = f.zy.split(' ');
        K.zhuyin.filter(([n]) => n === f.n).forEach(([, c, pdf, nuevo]) => { const j = han(f.zhT).indexOf(c); if (zyEsp[j] === pdf) zyEsp[j] = nuevo; });
        if (Z.lineas[i].map(c => c.zy).join(' ') !== zyEsp.join(' ')) dif.push('zhuyin ' + f.n);
    });
    const mEsp = new Set(F.marcasTono.lista.map(([f, i]) => f + ':' + i));
    K.marcasQuitar.forEach(([f, i]) => mEsp.delete(f + ':' + i)); K.marcasAgregar.forEach(([f, i]) => mEsp.add(f + ':' + i));
    const mVis = new Set(); Z.lineas.forEach((cz, i) => cz.forEach((c, j) => { if (c.t32) mVis.add((i + 1) + ':' + j); }));
    if (JSON.stringify([...mEsp].sort()) !== JSON.stringify([...mVis].sort())) dif.push('marcas');
    ok(!dif.length && K.origen === 'consulta a la docente del instituto, 2026-11-19', 'los datos = la transcripción del PDF + solo las correcciones declaradas (' + K.origen + ')' + (dif.length ? ': difieren ' + dif.join(', ') : ''));
}
ok(zyDe(17, '謀').zy === 'ㄇㄡˊ' && F.frases[16].zy.split(' ')[2] === 'ㄇㄡˇ', '謀: se muestra ㄇㄡˊ (móu); la transcripción del PDF sigue diciendo ㄇㄡˇ');
ok(TL[12].endsWith('也,') && TL[14].endsWith('也,') && C.blocks[0].l[12][0].endsWith('也,') && C.blocks[0].l[14][0].endsWith('也,'), 'coma después de los dos 也 (frases 13 y 15), en las dos escrituras');
ok([12, 13, 14].every(i => C.blocks[0].l[i][0].includes('於')) && !C.blocks[0].l.some(([zh]) => zh.includes('于')), 'simplificado: se mantiene 於 (frases 13–15) y no aparece 于');
const NOTA_MARCAS = 'Las marcas siguen la fuente (PDF). Regla de referencia: ante dos terceros tonos seguidos, el primero pasa a 2.º. La única corrección de la docente fue 使老有所終 (marcas en 使 y 有). Que 有所長 y 有所養 lleven marca solo en un carácter es decisión de Ulises; uniformar la regla es cambio opcional futuro.'; // literal, tal como lo dictó Ulises
ok(A.notaMarcas === NOTA_MARCAS && md.includes(NOTA_MARCAS) &&
    ['| 8 | 壯有所用 | 有 | sí | sigue la fuente (PDF) |', '| 9 | 幼有所長 | 所 | sí | sigue la fuente (PDF)', '| 11 | 廢疾者皆有所養 | 有 | sí | sigue la fuente (PDF) |'].every(x => md.includes(x)) && !/pendiente de confirmar/.test(md),
    'las marcas de 壯有所用, 幼有所長 y 皆有所養 siguen el PDF, con la nota de la regla y la decisión de Ulises (sin «pendiente de confirmar»)');
ok(han(TL.join('')).includes('鰥') && !han(TL.join('')).includes('矜') && /矜.*鰥|鰥.*矜/.test(md), 'se usa 鰥 (PDF) y la variante 矜 del texto base queda anotada');

// revisión, permiso, autoría, título
ok(!/"(revisado|nativo)"|revisor/.test(js), 'ningún «revisado», «nativo» ni revisor en los datos');
ok(/todo \*\*pendiente\*\*/.test(md) && md.includes('<!-- constancia') && md.includes('<!-- /constancia -->'), 'la hoja declara todo pendiente y tiene el bloque de constancia');
ok(/Permiso de uso: confirmado, informado por Ulises el 2026-11-19\./.test(md) && /autoría a confirmar/.test(C.fuente) && !/autor[ae]?:/i.test(js), 'permiso «confirmado, informado por Ulises el 2026-11-19» y autoría a confirmar (sin autor inventado)');
ok(C.es === 'Texto de la Gran Armonía' && C.subtitulo === 'Del capítulo Liyun (禮運) del Libro de los Ritos (禮記)' && /SUTRA DE LA MANCOMUNIDAD/.test(md) &&
    /篇 es un texto con introducción, desarrollo y cierre, que puede leerse por separado; el capítulo es 禮運 y el libro, 禮記; «sutra» corresponde a 佛經/.test(md) && !/篇 es «capítulo»/.test(md),
    'título «Texto de la Gran Armonía» con la línea del capítulo y el libro; en la hoja, el título del PDF y el motivo nuevo (sin el viejo)');
ok(/en la imagen la marca arranca sobre el zhuyin de 有/.test(md), 'la hoja conserva la nota de que la marca de 幼有所長 es ambigua en la imagen');
ok(/puntuación china completa .* es decisión de Ulises/.test(md) && /No se verificó\*\* cómo lee los polifónicos \(惡, 為, 行, 長, 興, 鰥\)/.test(md) && /rótulo del bloque «全文/.test(md),
    'la hoja anota: la puntuación china como decisión de Ulises, el audio sin verificar y el chino escrito por nosotros (全文)');
ok(C.nivel === 'avanzado (nivel aproximado)' && C.escritura === 'trad' && C.practica === false, 'nivel aproximado, arranca en tradicional, sin práctica');
const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
ok(!app.includes(K), 'el clásico nuevo no entra en Hoy: app.js (CLASSICS_MODULES, CLASSICS_INFO) no lo menciona');
const TUTEO = /(?<!\p{L})(tú|tienes|quieres|puedes|toca|mira|elige)(?!\p{L})/iu;
ok(!TUTEO.test(C.intro) && /(?<!\p{L})tocá(?!\p{L})/iu.test(C.intro), 'la presentación usa voseo');

// simplificado con OpenCC
const PY = process.env.PYTHON || 'python3';
if (cp.spawnSync(PY, ['-c', 'import opencc'], { encoding: 'utf8' }).status !== 0) {
    console.log('PARCIAL: sin OpenCC (pip install opencc): no se verificó el simplificado con tw2s');
} else {
    const pares = C.blocks[0].l.map(([zh], i) => [zh, TL[i]]).concat([[C.zh, C.zhT]]);
    const out = JSON.parse(cp.execFileSync(PY, ['-c', 'import json,sys,opencc\nP=json.load(sys.stdin);c=opencc.OpenCC("tw2s")\njson.dump([c.convert(t) for s,t in P],sys.stdout,ensure_ascii=False)'], { input: JSON.stringify(pares), encoding: 'utf8' }));
    const exc = (x) => x.replace(/於/g, '于'); // 於 se mantiene en simplificado (corrección declarada)
    const mal = pares.filter(([s], i) => out[i] !== exc(s)).map(([s, t], i) => t + ' → ' + out[i] + ' (guardado ' + s + ')');
    ok(!mal.length, 'simplificado = OpenCC tw2s del tradicional en las 20 frases y el título, salvo 於 (excepción declarada)' + (mal.length ? ': ' + mal.join(' | ') : ''));
}

console.log('\ncomprobaciones ' + n + ' · FALLAS: ' + fallas);
process.exit(fallas ? 1 : 0);
