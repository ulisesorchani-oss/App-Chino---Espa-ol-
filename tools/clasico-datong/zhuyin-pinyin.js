// tools/clasico-datong/zhuyin-pinyin.js — convierte UNA sílaba de zhuyin (注音) a pinyin con marca de tono.
// Lo usa tools/clasico-datong/derivar.js para guardar, junto al zhuyin del PDF, el pinyin que sale de ese zhuyin
// (nunca el de pinyin-pro). Tabla mecánica estándar; ante un símbolo que no conoce, lanza un error (no adivina).
//   zhuyinAPinyin('ㄓㄤˇ') → 'zhǎng' · zhuyinAPinyin('˙ㄗ') → 'zi' · zhuyinAPinyin('ㄍㄨㄢ') → 'guān'
'use strict';
const INI = { 'ㄅ': 'b', 'ㄆ': 'p', 'ㄇ': 'm', 'ㄈ': 'f', 'ㄉ': 'd', 'ㄊ': 't', 'ㄋ': 'n', 'ㄌ': 'l', 'ㄍ': 'g', 'ㄎ': 'k', 'ㄏ': 'h',
    'ㄐ': 'j', 'ㄑ': 'q', 'ㄒ': 'x', 'ㄓ': 'zh', 'ㄔ': 'ch', 'ㄕ': 'sh', 'ㄖ': 'r', 'ㄗ': 'z', 'ㄘ': 'c', 'ㄙ': 's' };
const FIN = { 'ㄚ': 'a', 'ㄛ': 'o', 'ㄜ': 'e', 'ㄝ': 'ê', 'ㄞ': 'ai', 'ㄟ': 'ei', 'ㄠ': 'ao', 'ㄡ': 'ou', 'ㄢ': 'an', 'ㄣ': 'en', 'ㄤ': 'ang', 'ㄥ': 'eng', 'ㄦ': 'er' };
const TONO = { 'ˊ': 2, 'ˇ': 3, 'ˋ': 4, '˙': 5 };
const MARCAS = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', 'ü': 'ǖǘǚǜ' };

// cuerpo sin tono (inicial + medial + final) → pinyin sin tono
function cuerpo(ini, med, fin) {
    const I = ini ? INI[ini] : '';
    const F = fin ? FIN[fin] : '';
    if (!med) {
        if (!F) {
            if (['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].includes(I)) return I + 'i'; // ㄓ = zhi, ㄗ = zi …
            throw new Error('sílaba sin vocal');
        }
        return I + (F === 'ê' ? 'e' : F);
    }
    if (med === 'ㄧ') {
        const r = { '': 'i', 'a': 'ia', 'o': 'io', 'ê': 'ie', 'ai': 'iai', 'ao': 'iao', 'ou': 'iu', 'an': 'ian', 'en': 'in', 'ang': 'iang', 'eng': 'ing' }[F];
        if (r == null) throw new Error('ㄧ + ' + fin);
        if (I) return I + r;
        return { 'i': 'yi', 'in': 'yin', 'ing': 'ying', 'iu': 'you' }[r] || ('y' + r.slice(1));
    }
    if (med === 'ㄨ') {
        const r = { '': 'u', 'a': 'ua', 'o': 'uo', 'ai': 'uai', 'ei': 'ui', 'an': 'uan', 'en': 'un', 'ang': 'uang', 'eng': 'ong' }[F];
        if (r == null) throw new Error('ㄨ + ' + fin);
        if (I) return I + r;
        return { 'u': 'wu', 'ui': 'wei', 'un': 'wen', 'ong': 'weng' }[r] || ('w' + r.slice(1));
    }
    if (med === 'ㄩ') {
        const r = { '': 'ü', 'ê': 'üe', 'an': 'üan', 'en': 'ün', 'eng': 'iong' }[F];
        if (r == null) throw new Error('ㄩ + ' + fin);
        if (!I) return { 'ü': 'yu', 'üe': 'yue', 'üan': 'yuan', 'ün': 'yun', 'iong': 'yong' }[r];
        if (['j', 'q', 'x'].includes(I)) return I + r.replace('ü', 'u');      // ju, quan, xiong
        if (['n', 'l'].includes(I)) return I + r;                             // nü, lüe
        throw new Error(ini + ' + ㄩ');
    }
    throw new Error('medial desconocida ' + med);
}
// marca de tono sobre la vocal que corresponde (a/e antes que nada; «ou» en la o; si no, la última vocal)
function marcar(s, t) {
    if (t === 5) return s;                    // neutro: sin marca
    const tono = t - 1;                       // 1.º tono: macrón (ā), que en zhuyin no lleva marca
    let i = s.search(/[ae]/);
    if (i < 0) i = s.indexOf('ou');
    if (i < 0) { const m = [...s.matchAll(/[iouü]/g)]; i = m.length ? m[m.length - 1].index : -1; }
    if (i < 0) throw new Error('sin vocal para marcar: ' + s);
    return s.slice(0, i) + MARCAS[s[i]][tono] + s.slice(i + 1);
}
function zhuyinAPinyin(z) {
    let s = String(z || '').trim(), t = 1;
    if (s[0] === '˙') { t = 5; s = s.slice(1); }
    const last = s[s.length - 1];
    if (TONO[last]) { t = TONO[last]; s = s.slice(0, -1); }
    const ch = Array.from(s);
    let ini = null, med = null, fin = null;
    if (ch.length && INI[ch[0]]) ini = ch.shift();
    if (ch.length && 'ㄧㄨㄩ'.includes(ch[0])) med = ch.shift();
    if (ch.length && FIN[ch[0]]) fin = ch.shift();
    if (ch.length) throw new Error('zhuyin no reconocido: «' + z + '»');
    return marcar(cuerpo(ini, med, fin), t);
}
module.exports = { zhuyinAPinyin };
