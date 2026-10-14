/* ═══════════════════════════════════════════════════════════════════
 * pinyin-familias.js — v9.7x · pinyin por familia (TOCFL / HSK y el resto)
 *
 * Dos capas sobre pinyin-pro:
 *  1. «Errores»: lecturas que pinyin-pro genera mal en CUALQUIER familia
 *     (还书 huán, 包子 y 裙子 con zi neutro, 东西 dōngxi, 客气 kèqi). Se
 *     cargan UNA sola vez, al arrancar, con customPinyin: ese diccionario
 *     es estado global de la librería y vale para toda la app.
 *  2. «Convención»: TOCFL = la lista TOCFL embebida (pinyin-tocfl.js, se
 *     carga solo la primera vez que una pantalla TOCFL la pide); HSK y el
 *     resto = pinyin-pro tal cual (lecturas del continente). Esta capa NO
 *     usa customPinyin: pinyinFor reemplaza en la salida de pinyin-pro las
 *     palabras de la tabla (de izquierda a derecha, la más larga), así una
 *     familia nunca pisa a la otra al cambiar de pantalla.
 *
 * El pinyin se genera desde el simplificado. Para texto que solo existe en
 * tradicional (lo que se pega en el Lector), los caracteres se pasan a
 * simplificado UNO POR UNO, solo para generar el pinyin: el texto que se
 * muestra no cambia. La tabla carácter → carácter se arma con los datos de
 * la propia app la primera vez que hace falta (t2sForPinyin).
 * ═══════════════════════════════════════════════════════════════════ */

// ── capa «errores» (global, una sola vez) ──
const PINYIN_ERRORES = {
    '还书': 'huán shū', '還書': 'huán shū',
    '包子': 'bāo zi',
    '裙子': 'qún zi',
    '东西': 'dōng xi', '東西': 'dōng xi',
    '客气': 'kè qi', '客氣': 'kè qi'
};
try {
    if (typeof pinyinPro !== 'undefined' && pinyinPro.customPinyin) pinyinPro.customPinyin(PINYIN_ERRORES);
} catch (e) { /* sin pinyin-pro: el resto de la app ya degrada a sin pinyin */ }

// ── tabla TOCFL (carga perezosa) ──
const PINYIN_TOCFL_SRC = 'pinyin-tocfl.js?v=20261014a';
let _tocflPyPromise = null;
function ensureTocflPinyin() {
    if (window.PINYIN_TOCFL) return Promise.resolve(true);
    if (_tocflPyPromise) return _tocflPyPromise;
    _tocflPyPromise = new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = PINYIN_TOCFL_SRC;
        s.onload = () => resolve(!!window.PINYIN_TOCFL);
        s.onerror = () => { _tocflPyPromise = null; resolve(false); }; // sin tabla: pinyin-pro tal cual
        document.head.appendChild(s);
    });
    return _tocflPyPromise;
}
let _tocflPyMax = 0;
function tocflPyMax() {
    if (!_tocflPyMax && window.PINYIN_TOCFL) {
        Object.keys(window.PINYIN_TOCFL).forEach(k => { _tocflPyMax = Math.max(_tocflPyMax, Array.from(k).length); });
    }
    return _tocflPyMax;
}

// ── tradicional → simplificado, carácter por carácter, SOLO para el pinyin ──
// Pares alineados de las palabras de la app: vocabulario HSK/TOCFL embebido
// ([simplificado, tradicional]) y entradas de dict-mini con su tradicional.
// Los alias sueltos de dict-mini NO entran: algunos apuntan del tradicional al
// simplificado y otros a otra palabra (這本 → 一本). Quedan afuera: 畫 (画 o 划), los caracteres con más de
// un simplificado posible y los que también se usan como simplificado en la
// propia app (著 de 显著, por ejemplo): así pasar texto ya simplificado no
// cambia nada.
let _t2s = null;
function t2sForPinyin() {
    if (_t2s) return _t2s;
    const cand = new Map();   // tradicional → Set(simplificados)
    const simpChars = new Set();
    let pairs = 0;
    const pair = (simp, trad) => {
        const a = Array.from(String(simp || '')), b = Array.from(String(trad || ''));
        if (!a.length || a.length !== b.length) return;
        pairs++;
        a.forEach((c, i) => {
            simpChars.add(c);
            if (b[i] !== c) {
                if (!cand.has(b[i])) cand.set(b[i], new Set());
                cand.get(b[i]).add(c);
            }
        });
    };
    if (typeof EMBEDDED_MODULE_DATA !== 'undefined') {
        Object.keys(EMBEDDED_MODULE_DATA).forEach(k => {
            const rows = EMBEDDED_MODULE_DATA[k];
            if (Array.isArray(rows)) rows.forEach(r => { if (Array.isArray(r) && r[1]) pair(r[0], r[1]); });
        });
    }
    const raw = (typeof window !== 'undefined' && window.DICT_MINI) || {};
    Object.keys(raw).forEach(k => {
        const v = raw[k];
        if (Array.isArray(v) && v[2]) pair(k, v[2]);        // entrada con su tradicional
    });
    const map = new Map();
    let ambiguous = 0, usedAsSimp = 0;
    cand.forEach((set, t) => {
        if (t === '畫') return;
        if (set.size !== 1) { ambiguous++; return; }
        if (simpChars.has(t)) { usedAsSimp++; return; }
        map.set(t, set.values().next().value);
    });
    _t2s = map;
    t2sForPinyin.stats = { pairs: pairs, chars: map.size, ambiguous: ambiguous, usedAsSimp: usedAsSimp };
    return map;
}
function simpForPinyin(text) {
    const m = t2sForPinyin();
    let out = '';
    for (const c of String(text || '')) out += m.get(c) || c;
    return out;
}

// ── tono de una sílaba con marca (1–4; 5 = neutro) ──
function pinyinToneNum(syl) {
    const s = String(syl || '');
    if (/[āēīōūǖĀĒĪŌŪǕ]/.test(s)) return 1;
    if (/[áéíóúǘÁÉÍÓÚǗ]/.test(s)) return 2;
    if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(s)) return 3;
    if (/[àèìòùǜÀÈÌÒÙǛ]/.test(s)) return 4;
    return 5;
}

// Sílabas 1:1 con los caracteres de `text` (mismo formato que
// pinyinPro.pinyin(text, {type:'array'})), en la convención de la familia
// de `ref` (lección, id de módulo, 'tocfl' o 'hsk'; ver familyOf en app.js).
function pinyinArrayFor(text, ref) {
    if (typeof pinyinPro === 'undefined') return [];
    const src = simpForPinyin(text);
    let arr;
    try { arr = pinyinPro.pinyin(src, { type: 'array' }); } catch (e) { return []; }
    const fam = (typeof familyOf === 'function') ? familyOf(ref) : 'hsk';
    const T = (fam === 'tocfl') ? window.PINYIN_TOCFL : null;
    const chars = Array.from(src);
    if (T && arr.length === chars.length) {
        const max = tocflPyMax();
        for (let i = 0; i < chars.length;) {
            let hit = 0;
            for (let L = Math.min(max, chars.length - i); L >= 2; L--) {
                const w = chars.slice(i, i + L).join('');
                if (T[w]) {
                    const syl = T[w].split(' ');
                    if (syl.length === L) { for (let j = 0; j < L; j++) arr[i + j] = syl[j]; hit = L; }
                    break;
                }
            }
            i += hit || 1;
        }
    }
    return arr;
}

// Texto de pinyin (como pinyinPro.pinyin(text)): sílabas separadas por espacio;
// el 兒 final de la lista TOCFL ("r") se pega a la sílaba anterior.
function pinyinFor(text, ref) {
    return pinyinArrayFor(text, ref).join(' ').replace(/ r(?= |$)/g, 'r');
}

// Ítems como pinyinPro.pinyin(text, {type:'all'}) — origin = el carácter
// ORIGINAL (tradicional si lo era), pinyin y tono según la familia.
function pinyinItemsFor(text, ref) {
    const chars = Array.from(String(text || ''));
    const arr = pinyinArrayFor(text, ref);
    if (arr.length !== chars.length) return null;
    const han = /[㐀-鿿豈-﫿]/;
    return chars.map((c, i) => {
        const isZh = han.test(c);
        return { origin: c, pinyin: isZh ? arr[i] : c, num: isZh ? pinyinToneNum(arr[i]) : 0, isZh: isZh };
    });
}
