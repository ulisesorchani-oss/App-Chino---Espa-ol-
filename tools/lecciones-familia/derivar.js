// tools/lecciones-familia/derivar.js — arma las lecciones de familia desde la fuente (fuente-guofeng.json, que NO se edita)
// y los ajustes (ajustes.json). Lo usan tools/build-familia.js (escribe lessons-familia.js y docs/revision-familia.md) y
// tools/check-familia.js (vuelve a calcular todo y exige que lo guardado coincida: editar lessons-familia.js a mano falla).
//   · separa los pares con «·» en piezas (hanzi, pinyin y español por separado)
//   · simplificado: tabla escrita a mano (ajustes.simplificado)
//   · zhuyin: del pinyin de la fuente, alineado sílaba por sílaba con las lecturas posibles de pinyin-pro y convertido con la
//     MISMA tabla de app.js (pzPinyinToZhuyin, leída del archivo, sin copiarla); la marca del tono neutro va ADELANTE (˙ㄇㄚ)
// Sin fechas de reloj: la salida depende solo de las entradas.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..');
const FUENTE = path.join(__dirname, 'fuente-guofeng.json'), AJUSTES = path.join(__dirname, 'ajustes.json');

const leer = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const HAN = /[㐀-䶿一-鿿豈-﫿]/;

// ── tabla pinyin → zhuyin de app.js (no se toca la función: se la lee y se la evalúa aparte) ──
function tablaZhuyin() {
    const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
    const a = app.indexOf('const PZ_ZY_INITIALS'), b = app.indexOf('function pzZhuyinOf');
    if (a < 0 || b < a) throw new Error('no encontré la tabla pinyin→zhuyin en app.js (PZ_ZY_INITIALS … pzZhuyinOf)');
    const ctx = {};
    vm.runInNewContext(app.slice(a, b) + '\nthis.f = pzPinyinToZhuyin;', ctx);
    return ctx.f;
}
function cargarPinyinPro() {
    return require(path.join(ROOT, 'pinyin-pro.min.js'));
}
// tabla TOCFL de la app (pinyin-tocfl.js), solo para listar dónde la fuente y la app difieren
function tablaTocfl() {
    const ctx = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'pinyin-tocfl.js'), 'utf8'), ctx);
    return ctx.window.PINYIN_TOCFL || {};
}

const MARCAS = { 'ā': 'a1', 'á': 'a2', 'ǎ': 'a3', 'à': 'a4', 'ē': 'e1', 'é': 'e2', 'ě': 'e3', 'è': 'e4', 'ī': 'i1', 'í': 'i2', 'ǐ': 'i3', 'ì': 'i4',
    'ō': 'o1', 'ó': 'o2', 'ǒ': 'o3', 'ò': 'o4', 'ū': 'u1', 'ú': 'u2', 'ǔ': 'u3', 'ù': 'u4', 'ǖ': 'ü1', 'ǘ': 'ü2', 'ǚ': 'ü3', 'ǜ': 'ü4' };
// sílaba con marca → [base sin tono, tono 1-5]
function sinTono(s) {
    let base = '', tono = '5';
    for (const c of s.normalize('NFC')) { if (MARCAS[c]) { base += MARCAS[c][0]; tono = MARCAS[c][1]; } else base += c; }
    return [base.toLowerCase(), tono];
}

// Alinea el pinyin de una palabra con sus caracteres: cada tramo tiene que ser una lectura posible del carácter
function alinear(zhT, py, PP, manual, simp) {
    const ch = Array.from(zhT), raw = py.normalize('NFC').replace(/['’\s]/g, '');
    const lecturas = ch.map(c => {
        const s = simp(c), set = new Set();
        [s, c].forEach(x => PP.pinyin(x, { multiple: true, type: 'array', toneType: 'none' }).forEach(r => set.add(r.replace(/ü/g, 'v'))));
        (manual[c] || []).forEach(r => set.add(r.replace(/ü/g, 'v')));
        return set;
    });
    const go = (i, k) => {
        if (k === ch.length) return i === raw.length ? [] : null;
        for (let j = Math.min(raw.length, i + 7); j > i; j--) {
            const tramo = raw.slice(i, j), [b] = sinTono(tramo);
            if (lecturas[k].has(b.replace(/ü/g, 'v'))) { const r = go(j, k + 1); if (r) return [tramo, ...r]; }
        }
        return null;
    };
    return go(0, 0);
}

function derivar() {
    const F = leer(FUENTE), A = leer(AJUSTES);
    const PP = cargarPinyinPro(), p2z = tablaZhuyin(), TT = tablaTocfl();
    const mapS = A.simplificado;
    const simp = (t) => Array.from(t).map(c => mapS[c] || c).join('');
    const errores = [];
    const zhuyinDe = (zhT, py) => {
        const s = alinear(zhT, py, PP, A.alineadoManual, simp);
        if (!s) { errores.push('no alinea el pinyin «' + py + '» con ' + zhT); return { zy: '', silabas: [] }; }
        const zy = s.map(x => {
            const [b, t] = sinTono(x), z = p2z(b + t);
            if (!z) errores.push('la tabla de app.js no convierte la sílaba «' + x + '» de ' + zhT);
            return z.endsWith('˙') ? '˙' + z.slice(0, -1) : z; // neutro adelante: ˙ㄇㄚ
        });
        return { zy: zy.join(' '), silabas: s };
    };
    const pyApp = (zh) => TT[zh] || PP.pinyin(zh);
    const pieza = (zhT, pyFuente, rol, t) => {
        const py = A.pinyin[zhT] || pyFuente;
        const { zy, silabas } = zhuyinDe(zhT, py);
        const p = { zh: simp(zhT), zhT, py, zy, rol, gen: t.gen, linea: t.linea, cat: t.cat, verificar: !!t.verificar, pyFuente, silabas };
        p.pyApp = pyApp(p.zh);
        return p;
    };
    // 1) piezas de la fuente, en el orden de la fuente
    const items = [], todas = [];
    F.terminos.forEach((t, ti) => {
        const H = t.hanzi.split('·'), P = t.pinyin.split('·').map(x => x.trim());
        if (H.length !== P.length) errores.push('par desparejo hanzi/pinyin: ' + t.hanzi);
        const formales = H.map((h, i) => {
            const p = pieza(h, P[i], 'formal', t);
            p.esFuente = t.es; p.termino = ti;
            p.es = A.espanol[h] || (H.length === 1 ? t.es : null);
            if (!p.es) errores.push('falta el español de la pieza ' + h + ' (par «' + t.hanzi + '»)');
            p.cotidiano = [];
            return p;
        });
        const cot = [];
        t.cotidiano.forEach(c => {
            const ch = c.hanzi.split('·'), cp = c.pinyin.split('·').map(x => x.trim());
            if (ch.length !== cp.length) errores.push('par desparejo hanzi/pinyin: ' + c.hanzi);
            ch.forEach((h, i) => cot.push(pieza(h, cp[i], 'cotidiano', t)));
        });
        // asignación de las formas cotidianas a las formales
        if (cot.length === formales.length) cot.forEach((c, i) => formales[i].cotidiano.push(c));
        else if (formales.length === 1) cot.forEach(c => formales[0].cotidiano.push(c));
        else cot.forEach(c => {
            const dest = A.asignarCotidiano[c.zhT], f = formales.find(x => x.zhT === dest);
            if (!f) errores.push('forma cotidiana ' + c.zhT + ' sin asignar (par «' + t.hanzi + '»): falta en ajustes.asignarCotidiano');
            else f.cotidiano.push(c);
        });
        formales.forEach(f => { items.push(f); todas.push(f); f.cotidiano.forEach(c => todas.push(c)); });
    });
    // 2) pantalla
    const P = A.pantalla;
    items.forEach(it => {
        it.id = 'fam-' + it.silabas.map(s => sinTono(s)[0]).join('').replace(/ü/g, 'v');
        it.revision = 'pendiente';
        if (P.ancla.includes(it.zhT)) it.ancla = true;
        if (P.destacarCotidiano.includes(it.zhT)) {
            if (!it.cotidiano.length) errores.push(it.zhT + ' en destacarCotidiano pero sin forma cotidiana');
            it.destacarCotidiano = true;
        }
        if (P.cotidianoIgual.includes(it.zhT)) {
            const rep = it.cotidiano.find(c => c.zhT === it.zhT);
            if (!rep) errores.push(it.zhT + ' en cotidianoIgual pero su forma cotidiana no se repite');
            else rep.repetido = true;
            it.cotidianoIgual = true;
        }
    });
    const porT = new Map(items.map(it => [it.zhT, it]));
    const ids = new Set(); items.forEach(it => { if (ids.has(it.id)) errores.push('id repetido ' + it.id); ids.add(it.id); });
    // 3) lecciones
    const usados = new Map();
    const piezaPorT = (h) => todas.find(p => p.zhT === h && !p.repetido);
    const lecciones = A.lecciones.map(L => {
        const out = { id: L.id, kind: 'familia', hsk: L.hsk, exam: 'TOCFL', examLvl: L.examLvl, nivelAprox: true, emoji: L.emoji,
            titleZh: L.titleZh, titleZhT: L.titleZhT, titleEs: L.titleEs, blurb: L.blurb, fuente: A.fuente };
        // los títulos son chino escrito por nosotros (no de la fuente): los dos se escriben a mano y se verifican con la ida y vuelta s2tw
        if (!L.titleZh || !L.titleZhT) errores.push(L.id + ': falta el título en alguna escritura');
        if (L.grupos) out.grupos = L.grupos.map(g => ({ titulo: g.titulo, items: g.items.map(h => {
            const it = porT.get(h);
            if (!it) { errores.push(L.id + ': ' + h + ' no es una pieza formal de la fuente'); return null; }
            if (usados.has(h)) errores.push(h + ' está en dos lecciones (' + usados.get(h) + ', ' + L.id + ')');
            usados.set(h, L.id);
            return it;
        }).filter(Boolean) }));
        if (L.reglas) out.reglas = L.reglas.map(r => ({
            marcas: r.marcas.map(m => {
                // pinyin y zhuyin de la marca: los de esa misma sílaba en las piezas (así 叔 sale shú, como en 叔父)
                const p = items.concat(todas).find(x => Array.from(x.zhT).includes(m));
                if (!p) { errores.push('marca ' + m + ' sin pieza que la use'); return { zh: m, zhT: m, py: '', zy: '' }; }
                const k = Array.from(p.zhT).indexOf(m);
                return { zh: simp(m), zhT: m, py: p.silabas[k], zy: p.zy.split(' ')[k] };
            }),
            es: r.es,
            ejemplos: r.ejemplos.map(h => { const p = piezaPorT(h); if (!p) errores.push('ejemplo ' + h + ' no es una pieza de la fuente'); return p; }).filter(Boolean)
        }));
        return out;
    });
    items.forEach(it => { if (!usados.has(it.zhT)) errores.push(it.zhT + ' no está en ninguna lección'); });
    return { F, A, items, todas, lecciones, errores, simp };
}

// Lo que se guarda en lessons-familia.js (sin campos internos)
function limpiarPieza(p) {
    const o = { zh: p.zh, zhT: p.zhT, py: p.py, zy: p.zy };
    if (p.verificar) o.verificar = true;
    if (p.repetido) o.repetido = true;
    return o;
}
function limpiarItem(it) {
    const o = { id: it.id, zh: it.zh, zhT: it.zhT, py: it.py, zy: it.zy, es: it.es, gen: it.gen, linea: it.linea, cat: it.cat, revision: it.revision };
    if (it.verificar) o.verificar = true;
    ['ancla', 'destacarCotidiano', 'cotidianoIgual'].forEach(k => { if (it[k]) o[k] = true; });
    o.cotidiano = it.cotidiano.map(limpiarPieza);
    return o;
}
function datos(d) {
    return d.lecciones.map(L => {
        const o = Object.assign({}, L);
        if (L.grupos) o.grupos = L.grupos.map(g => ({ titulo: g.titulo, items: g.items.map(limpiarItem) }));
        if (L.reglas) o.reglas = L.reglas.map(r => ({ marcas: r.marcas, es: r.es, ejemplos: r.ejemplos.map(limpiarPieza) }));
        return o;
    });
}

module.exports = { derivar, datos, sinTono, HAN, ROOT, FUENTE, AJUSTES };
