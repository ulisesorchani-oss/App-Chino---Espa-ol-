#!/usr/bin/env node
// tools/check-keywords.js — valida las `keywords` del glosario de TODAS las lecciones graduadas
// (window.GRADED_LESSONS = lessons.js + lessons-tocfl.js + lessons-extra.js). Solo Node (no necesita navegador).
//   node tools/check-keywords.js        → tabla por lección + código de salida 1 si algo falla
// Reglas:
//   · toda lección tiene keywords (si alguna queda sin lista, falla: el glosario automático ya no se usa)
//   · 3 a 8 palabras por lección (el glosario no se muestra con menos de 3)
//   · cada palabra aparece en el texto de su lección en las DOS escrituras: zh en las líneas zh, zhT en las zhT
//     (si falta zhT, la palabra debe ser igual en ambas escrituras)
//   · la glosa (es) no lleva caracteres chinos y tiene un espacio tras cada «;» (nunca «;» pegado ni con espacio antes)
//   · py / pyT, si existen, son pinyin (letras con tono o números; sin caracteres chinos)
//   · sin palabras repetidas dentro de una lección
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const ctx = { window: {}, console }; ctx.self = ctx.window; vm.createContext(ctx);
['lessons.js', 'lessons-tocfl.js', 'lessons-extra.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }));
const LES = ctx.window.GRADED_LESSONS || [];
const HAN = /[㐀-䶿一-鿿豈-﫿]/, PY = /^[\p{Script=Latin}\u0300-\u036f1-5\s'·\-]+$/u;
const rows = []; let bad = 0, nw = 0;
LES.forEach(l => {
  const err = [], E = m => err.push(m), K = l.keywords;
  if (!Array.isArray(K) || !K.length) E('sin keywords');
  else {
    if (K.length < 3 || K.length > 8) E('de 3 a 8 palabras (hay ' + K.length + ')');
    const zhText = (l.lines || []).map(x => x.zh || '').join('|'), zhTText = (l.lines || []).map(x => x.zhT || x.zh || '').join('|');
    const seen = new Set();
    K.forEach(k => {
      nw++; const n = '«' + k.zh + '»';
      if (!k.zh || !k.es) { E(n + ': falta zh o es'); return; }
      if (seen.has(k.zh)) E(n + ': repetida'); seen.add(k.zh);
      if (!zhText.includes(k.zh)) E(n + ': no aparece en el texto simplificado');
      const t = k.zhT || k.zh; if (!zhTText.includes(t)) E(n + ': «' + t + '» no aparece en el texto tradicional');
      if (HAN.test(k.es)) E(n + ': la glosa lleva caracteres chinos («' + k.es + '»)');
      if (/;(?! )/.test(k.es)) E(n + ': falta el espacio tras «;» («' + k.es + '»)');
      if (/ ;|;\s{2,}|;\s*$|\s{2,}/.test(k.es) || k.es !== k.es.trim()) E(n + ': espacios sobrantes en la glosa («' + k.es + '»)');
      ['py', 'pyT'].forEach(f => { if (k[f] != null && (HAN.test(k[f]) || !PY.test(k[f]) || !k[f].trim())) E(n + ': ' + f + ' no es pinyin («' + k[f] + '»)'); });
    });
  }
  if (err.length) bad++;
  rows.push({ id: l.id, hsk: l.hsk, palabras: (K || []).length, estado: err.length ? 'ERROR' : 'ok' });
  err.forEach(m => console.log('  ✗ ' + l.id + ': ' + m));
});
console.table(rows);
console.log(LES.length + ' lecciones · ' + nw + ' palabras clave · ' + (bad ? bad + ' lección(es) con error' : 'todo en regla'));
process.exit(bad ? 1 : 0);
