#!/usr/bin/env node
// tools/check-familia.js — valida las lecciones de familia (lessons-familia.js + docs/revision-familia.md). Solo Node.
//   node tools/check-familia.js   → una línea por comprobación (✓ / ✗) y «comprobaciones N · FALLAS: k»; código 1 si algo falla
// Reglas:
//   · regenerable: tools/build-familia.js, corrido de nuevo, da EXACTAMENTE lessons-familia.js y la hoja (editarlos a mano falla)
//   · la fuente entera, una sola vez: cada pieza de fuente-guofeng.json (48 términos → 99 piezas) está en los datos con su pinyin
//     (el de la fuente, salvo el ajuste de 叔 = shú)
//   · conteos: 7 lecciones, 59 ítems formales (58 + el ancla «Yo»), 40 formas cotidianas
//   · campos completos; zhuyin con una sílaba por hanzi, tono neutro adelante (˙ㄇㄚ) y valores de referencia escritos acá
//   · revision: todos «pendiente»; ningún «revisado» ni «nativo»; verificar: true en las 19 piezas de los 6 términos marcados
//   · español sin caracteres chinos en las glosas, con voseo (sin tuteo) y sin nombres de países en lo que se muestra
//   · atribución «material del Instituto Guó Fēng» en los datos, en el visor y en la hoja
//   · simplificado: contra los pares simplificado/tradicional de la app (no es la prueba de OpenCC) y, si OpenCC está instalado,
//     ida y vuelta s2tw/tw2s con tools/lecturas-examen/opencc-s2tw.py. Sin OpenCC: «PARCIAL: …» (nunca verde)
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const D = require('./lecciones-familia/derivar.js');
const B = require('./build-familia.js');
const ROOT = D.ROOT;
let n = 0, fallas = 0;
const ok = (c, m) => { n++; if (c) console.log('✓ ' + m); else { fallas++; console.log('✗ ' + m); } };

// ── 1) regenerable ──
const g = B.generar();
ok(!g.errores.length, 'la fuente y los ajustes se derivan sin errores' + (g.errores.length ? ': ' + g.errores.join(' | ') : ''));
const jsGuardado = fs.readFileSync(B.OUT_JS, 'utf8'), mdGuardado = fs.readFileSync(B.OUT_MD, 'utf8');
ok(g.js === jsGuardado, 'lessons-familia.js = lo que genera tools/build-familia.js (no se editó a mano)');
ok(g.md === mdGuardado, 'docs/revision-familia.md = lo que genera tools/build-familia.js (fuera del bloque de constancia)');

// ── datos tal como los carga la app ──
const ctx = { window: {} };
vm.runInNewContext(jsGuardado, ctx);
const L = ctx.window.FAMILY_LESSONS || [];
const items = [], piezas = [];
L.forEach(l => (l.grupos || []).forEach(gr => gr.items.forEach(it => { items.push(it); piezas.push(Object.assign({ rol: 'formal', it }, it)); it.cotidiano.forEach(c => piezas.push(Object.assign({ rol: 'cotidiano', it }, c))); })));

// ── 2) la fuente entera, una sola vez ──
const F = JSON.parse(fs.readFileSync(D.FUENTE, 'utf8')), A = JSON.parse(fs.readFileSync(D.AJUSTES, 'utf8'));
const esperadas = [];
F.terminos.forEach(t => {
    const add = (h, p, rol) => { const H = h.split('·'), P = p.split('·').map(x => x.trim()); H.forEach((x, i) => esperadas.push({ zhT: x, py: P[i], rol, verificar: !!t.verificar })); };
    add(t.hanzi, t.pinyin, 'formal'); t.cotidiano.forEach(c => add(c.hanzi, c.pinyin, 'cotidiano'));
});
ok(F.terminos.length === 48 && esperadas.length === 99, 'fuente: 48 términos → 99 piezas (' + F.terminos.length + ' → ' + esperadas.length + ')');
const libres = piezas.slice(), faltan = [];
esperadas.forEach(e => {
    const i = libres.findIndex(p => p.zhT === e.zhT && p.rol === e.rol);
    if (i < 0) { faltan.push(e.rol + ' ' + e.zhT); return; }
    const p = libres.splice(i, 1)[0];
    const pyEsperado = A.pinyin[e.zhT] || e.py;
    if (p.py !== pyEsperado) faltan.push(e.zhT + ': pinyin «' + p.py + '» (debía «' + pyEsperado + '»)');
    if (!!p.verificar !== e.verificar) faltan.push(e.zhT + ': verificar ' + !!p.verificar + ' (fuente ' + e.verificar + ')');
});
ok(!faltan.length && !libres.length, 'cada pieza de la fuente está una sola vez, con su pinyin y su verificar' + (faltan.length || libres.length ? ': ' + faltan.concat(libres.map(p => 'sobra ' + p.zhT)).join(' | ') : ''));

// ── 3) conteos ──
const porLeccion = L.map(l => l.grupos ? l.grupos.reduce((a, gr) => a + gr.items.filter(it => !it.ancla).length, 0) : 'reglas ' + l.reglas.length);
ok(JSON.stringify(porLeccion) === JSON.stringify([8, 12, 6, 12, 8, 12, 'reglas 4']), '7 lecciones: ítems por lección ' + JSON.stringify(porLeccion));
const anclas = items.filter(it => it.ancla);
ok(items.length === 59 && anclas.length === 1 && anclas[0].zhT === '自己' && piezas.length === 99 && piezas.filter(p => p.rol === 'cotidiano').length === 40,
    '59 ítems formales (58 + el ancla 自己 «Yo»), 40 formas cotidianas, 99 piezas (' + items.length + ' / ' + anclas.map(a => a.zhT) + ' / ' + piezas.length + ')');
ok(L.every(l => l.kind === 'familia' && l.exam === 'TOCFL' && ['Prep', 'A1', 'A2', 'B1', 'B2', 'C1'].includes(l.examLvl) && l.nivelAprox === true && /^tocfl-fam-/.test(l.id)),
    'cada lección: kind familia, exam TOCFL, examLvl válido, nivelAprox, id tocfl-fam-*');
ok(JSON.stringify(L.map(l => l.examLvl)) === JSON.stringify(['A2', 'A2', 'Prep', 'B1', 'A2', 'B1', 'B1']), 'niveles = los propuestos en el informe ' + L.map(l => l.examLvl).join(','));

// ── 4) campos y zhuyin ──
const HAN = D.HAN;
const vacios = piezas.filter(p => !p.zh || !p.zhT || !p.py || !p.zy).map(p => p.zhT);
ok(!vacios.length, 'toda pieza tiene zh, zhT, py y zy' + (vacios.length ? ': ' + vacios.join(',') : ''));
ok(items.every(it => it.es && it.id && typeof it.gen === 'number' && it.linea && it.cat), 'todo ítem tiene es, id, gen, linea y cat');
const malZy = piezas.filter(p => p.zy.split(' ').length !== Array.from(p.zhT).length || /˙(\s|$)/.test(p.zy) || !/^[ㄅ-ㄯ˙ˊˇˋ ]+$/.test(p.zy)).map(p => p.zhT + ' «' + p.zy + '»');
ok(!malZy.length, 'zhuyin: una sílaba por hanzi, solo símbolos zhuyin y tono neutro adelante' + (malZy.length ? ': ' + malZy.join(' | ') : ''));
const REF = { '爺爺': 'ㄧㄝˊ ˙ㄧㄝ', '奶奶': 'ㄋㄞˇ ˙ㄋㄞ', '舅舅': 'ㄐㄧㄡˋ ˙ㄐㄧㄡ', '媽媽': 'ㄇㄚ ˙ㄇㄚ', '女兒': 'ㄋㄩˇ ㄦˊ', '兒子': 'ㄦˊ ˙ㄗ',
    '曾祖父': 'ㄗㄥ ㄗㄨˇ ㄈㄨˋ', '姪女': 'ㄓˊ ㄋㄩˇ', '表姊': 'ㄅㄧㄠˇ ㄐㄧㄝˇ', '叔叔': 'ㄕㄨˊ ˙ㄕㄨ', '叔父': 'ㄕㄨˊ ㄈㄨˋ', '姊姊': 'ㄐㄧㄝˇ ˙ㄐㄧㄝ', '外甥': 'ㄨㄞˋ ㄕㄥ', '阿姨': 'ㄚ ㄧˊ' };
const malRef = Object.keys(REF).filter(h => { const p = piezas.find(x => x.zhT === h); return !p || p.zy !== REF[h]; }).map(h => h + ' «' + ((piezas.find(x => x.zhT === h) || {}).zy) + '» (debía «' + REF[h] + '»)');
ok(!malRef.length, 'zhuyin de referencia (' + Object.keys(REF).length + ' piezas, con tono neutro y 叔 = ㄕㄨˊ)' + (malRef.length ? ': ' + malRef.join(' | ') : ''));
const pyRef = { '叔父': 'shúfù', '叔母': 'shúmǔ', '叔叔': 'shúshu', '姊': 'jiě', '表姊': 'biǎojiě', '姊夫': 'jiěfū', '女兒': "nǚ'ér" };
const malPy = Object.keys(pyRef).filter(h => (piezas.find(x => x.zhT === h) || {}).py !== pyRef[h]);
ok(!malPy.length, 'pinyin de referencia: 叔 = shú, 姊 = jiě, apóstrofe de nǚ\'ér' + (malPy.length ? ': ' + malPy.join(',') : ''));

// ── 5) revisión ──
ok(items.every(it => it.revision === 'pendiente'), 'los 59 ítems tienen revision «pendiente»');
ok(!/"(revisado|nativo)"|revisor/.test(jsGuardado), 'ningún «revisado», «nativo» ni revisor en los datos');
ok(piezas.filter(p => p.verificar).length === 19 && F.terminos.filter(t => t.verificar).length === 6, 'verificar: true en las 19 piezas de los 6 términos marcados en la fuente');
const C0 = mdGuardado.indexOf('<!-- constancia'), C1 = mdGuardado.indexOf('<!-- /constancia -->');
ok(C0 > 0 && C1 > C0 && /Fecha \| Quién/.test(mdGuardado.slice(C0, C1)), 'la hoja tiene el bloque de constancia (quién y cuándo, a mano)');
const constancia = mdGuardado.slice(C0, C1);
const filas = constancia.split('\n').filter(f => /^\|/.test(f) && !/Fecha \| Quién|^\|-/.test(f)).map(f => f.split('|').slice(1, -1).map(x => x.trim()));
const filasMal = filas.filter(c => c.some(x => x && x !== '—') && (!/^\d{4}-\d{2}-\d{2}$/.test(c[0]) || !c[1] || c[1] === '—'));
ok(!filasMal.length, 'cada fila completada de la constancia lleva fecha (AAAA-MM-DD) y quién' + (filasMal.length ? ': ' + filasMal.map(c => c.join(' | ')).join(' / ') : ''));

// ── 6) español, voseo, países ──
const glosas = items.map(it => it.es);
ok(glosas.every(s => !HAN.test(s)), 'las glosas en español no llevan caracteres chinos');
const uiFam = fs.readFileSync(path.join(ROOT, 'familia-ui.js'), 'utf8');
const literales = (src) => (src.replace(/^\s*\/\/.*$/gm, '').match(/'(?:[^'\\\n]|\\.)*'/g) || []).map(s => s.slice(1, -1));
const textosUi = L.flatMap(l => [l.titleEs, l.blurb].concat((l.grupos || []).map(gr => gr.titulo), (l.reglas || []).map(r => r.es)))
    .concat(glosas, literales(uiFam).filter(s => /[a-záéíóúñ]{3}/i.test(s) && !/^[.#]|^[a-z-]+$|^ac_/.test(s)));
// límites de palabra Unicode (\b de JS es solo ASCII: no corta después de «ú» ni de «á»)
const TUTEO = /(?<!\p{L})(tú|tienes|quieres|puedes|eres|haces|piensas|prefieres|sabes|necesitas|fíjate|escucha|toca|elige|mira)(?!\p{L})/iu;
const tuteo = textosUi.filter(s => TUTEO.test(s));
ok(!tuteo.length, 'sin tuteo en los textos que se muestran' + (tuteo.length ? ': ' + tuteo.join(' | ') : ''));
ok(L.some(l => /(?<!\p{L})(tocá|podés|vos)(?!\p{L})/iu.test(l.blurb)), 'con voseo (tocá / podés / vos en las descripciones)');
const PAIS = /Taiw[aá]n|China(?!\p{L})|continental|Argentin|España|México|Chile|Uruguay|(?<!\p{L})país|🇹🇼|🇨🇳|🇦🇷|🇪🇸/iu;
const paises = textosUi.filter(s => PAIS.test(s));
ok(!paises.length, 'sin nombres de países ni banderas en los textos que se muestran' + (paises.length ? ': ' + paises.join(' | ') : ''));

// ── 7) atribución ──
ok(L.every(l => l.fuente === 'material del Instituto Guó Fēng'), 'cada lección lleva fuente «material del Instituto Guó Fēng»');
ok(/Fuente: ' \+ esc\(l\.fuente\)/.test(uiFam), 'el visor muestra «Fuente: …» al pie de cada lección');
ok(/Fuente: ' \+ escHtml\(l\.fuente\)/.test(fs.readFileSync(path.join(ROOT, 'lessons-graduated.js'), 'utf8')), 'la tarjeta de la lista muestra «Fuente: …»');
ok(mdGuardado.includes('**Fuente: material del Instituto Guó Fēng**') && mdGuardado.includes(B.textoPermiso(A)), 'la hoja de revisión lleva la atribución y el estado del permiso («' + B.textoPermiso(A) + '»)');
const P = A.permiso || {};
ok(P.estado !== 'confirmado' || (/^\d{4}-\d{2}-\d{2}$/.test(P.fecha || '') && P.quien && filas.some(c => c[0] === P.fecha && /permiso/i.test(c.join(' ')) && /confirmad/i.test(c.join(' ')))),
    'un permiso «confirmado» lleva fecha y quién, y su fila en la constancia de la hoja');

// ── 8) simplificado ──
// 8a) contra los pares [simplificado, tradicional] del vocabulario embebido de la app (NO es la prueba de OpenCC)
const de = fs.readFileSync(path.join(ROOT, 'data-embedded.js'), 'utf8');
const par = new Map(); // tradicional → set de simplificados vistos en la app
for (const m of de.matchAll(/\["([^"]+)",\s*"([^"]+)",\s*"/g)) {
    const s = Array.from(m[1]), t = Array.from(m[2]);
    if (s.length !== t.length) continue;
    t.forEach((c, i) => { if (!par.has(c)) par.set(c, new Set()); par.get(c).add(s[i]); });
}
const choques = [], sinPar = new Set();
piezas.forEach(p => Array.from(p.zhT).forEach((c, i) => {
    const s = Array.from(p.zh)[i];
    if (s === c) { if (par.has(c) && !par.get(c).has(c)) choques.push(c + ' queda igual, pero la app lo simplifica a ' + [...par.get(c)].join('/')); return; }
    if (!par.has(c)) sinPar.add(c + '→' + s); else if (!par.get(c).has(s)) choques.push(c + '→' + s + ' (la app: ' + [...par.get(c)].join('/') + ')');
}));
ok(!choques.length, 'simplificado coherente con los pares de la app (no es OpenCC)' + (choques.length ? ': ' + [...new Set(choques)].join(' | ') : '') + (sinPar.size ? ' · sin par en la app: ' + [...sinPar].join(', ') : ''));
// 8b) ida y vuelta con OpenCC (el mismo paquete que tools/lecturas-examen/opencc-s2tw.py): s2tw(simplificado) = tradicional y
//     tw2s(tradicional) = simplificado en TODOS los pares de los datos (ítems, cotidianos, marcas, ejemplos y títulos).
//     Solo se aceptan las diferencias de ajustes.excepcionesOpencc (姪 → 侄, decisión de Ulises); cualquier otra falla.
const PY = process.env.PYTHON || 'python3';
const conOpencc = cp.spawnSync(PY, ['-c', 'import opencc'], { encoding: 'utf8' }).status === 0;
if (!conOpencc) {
    console.log('PARCIAL: sin OpenCC (pip install opencc): no se verificó la ida y vuelta s2tw/tw2s del simplificado');
} else {
    const pares = new Map();
    const add = (o) => { if (o && o.zh && o.zhT) pares.set(o.zh + '|' + o.zhT, { zh: o.zh, zhT: o.zhT }); };
    L.forEach(l => { add({ zh: l.titleZh, zhT: l.titleZhT }); (l.grupos || []).forEach(gr => gr.items.forEach(it => { add(it); it.cotidiano.forEach(add); }));
        (l.reglas || []).forEach(r => { r.marcas.forEach(add); r.ejemplos.forEach(add); }); });
    const lista = [...pares.values()];
    const py = 'import json,sys,opencc\nfrom importlib.metadata import version\nP=json.load(sys.stdin);a,b=opencc.OpenCC("s2tw"),opencc.OpenCC("tw2s")\n' +
        'json.dump({"v":version("opencc"),"t":[a.convert(p["zh"]) for p in P],"s":[b.convert(p["zhT"]) for p in P]},sys.stdout,ensure_ascii=False)';
    const r = JSON.parse(cp.execFileSync(PY, ['-c', py], { input: JSON.stringify(lista), encoding: 'utf8' }));
    const EXC = Object.entries(A.excepcionesOpencc || {}).filter(([k]) => k[0] !== '_'); // [tradicional, simplificado]
    const sinExc = (x) => EXC.reduce((acc, [t, si]) => acc.split(t).join(si), x); // lleva los dos lados a la forma simplificada de la excepción
    const difs = lista.map((p, i) => ({ p, t: r.t[i], s: r.s[i] })).filter(x => x.t !== x.p.zhT || x.s !== x.p.zh);
    const ajenas = difs.filter(x => sinExc(x.t) !== sinExc(x.p.zhT) || sinExc(x.s) !== sinExc(x.p.zh));
    ok(!ajenas.length, 'OpenCC ' + r.v + ': ida y vuelta s2tw/tw2s en ' + lista.length + ' pares; ' + (lista.length - difs.length) + ' coinciden, ' +
        (difs.length - ajenas.length) + ' difieren solo por la excepción declarada (' + EXC.map(([t, si]) => t + '→' + si).join(', ') + '): ' + difs.filter(x => !ajenas.includes(x)).map(x => x.p.zhT).join(', ') +
        (ajenas.length ? ' · DIFERENCIAS NO DECLARADAS: ' + ajenas.map(x => x.p.zh + '/' + x.p.zhT + ' → s2tw ' + x.t + ' · tw2s ' + x.s).join(' | ') : ''));
    const m = (A.resultadoOpencc || '').match(/sobre los (\d+) pares[^:]*: (\d+) coinciden/);
    ok(m && Number(m[1]) === lista.length && Number(m[2]) === lista.length - difs.length, // la versión anotada es informativa: otra versión de OpenCC con los mismos conteos pasa
        'el resultado de OpenCC anotado en la hoja (ajustes.resultadoOpencc) coincide con esta corrida (' + lista.length + ' pares, ' + (lista.length - difs.length) + ' coinciden, OpenCC ' + r.v + ')');
}

console.log('\ncomprobaciones ' + n + ' · FALLAS: ' + fallas);
process.exit(fallas ? 1 : 0);
