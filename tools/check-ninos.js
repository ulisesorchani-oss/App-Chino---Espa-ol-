#!/usr/bin/env node
// tools/check-ninos.js — valida window.NINOS_LESSONS (lessons-ninos.js). Solo Node (no necesita navegador).
//   node tools/check-ninos.js            → tabla por lección + código de salida 1 si algo falla
// Reglas (ver el encabezado de lessons-ninos.js):
//   · esquema: track 'Niños', dele 'A1', kid, band A|B, unit/order, emoji, art (reservado), ids únicos
//   · franja A: líneas de hasta 5 palabras · franja B: hasta 9 · de 6 a 9 líneas por lección
//   · máx. 8 palabras nuevas por lección; cada una aparece en las líneas de su lección
//   · reciclaje: cada lección (salvo la primera) reutiliza al menos 2 palabras nuevas de las anteriores
//   · español rioplatense: voseo (sin «tú», «tienes», «puedes»…) y sin españolismos (zumo, coger, vale…)
//   · chino: zh y zhT en todo; sin rasgos tradicionales en zh ni simplificados en zhT
//   · «Escuchá y tocá»: 4 opciones por ítem de 3 con emoji distintos; opts[0] correcta; las etiquetas son
//     palabras de las propias lecciones; «Completar»: 5 ítems, un solo ___, 3 opciones, la frase sale de una línea
//   · originalidad: ninguna línea coincide con una de las mini-dramas DELE que ya existen
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const file = process.argv[2] || path.join(ROOT, 'lessons-ninos.js');
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
const LES = ctx.window.NINOS_LESSONS || [];
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:"«»]/g, ' ').replace(/\s+/g, ' ').trim();
const wordsOf = s => norm(s).split(' ').filter(Boolean);
const SIMP = /[们这个来说时为会应对还么开关东车门问间进过现发长爱听买]/, TRAD = /[們這個來說時為會應對還麼開關東車門問間進過現發長愛聽買]/;
const TU = /\b(tú|tienes|quieres|puedes|eres|haces|sabes|vienes|piensas|prefieres|necesitas|dime|ven aquí|vosotros)\b/i;
const ESPANISMOS = /\b(zumo|coger|vale|guay|ordenador|móvil|coche|patata|chaval|tío|colegio de infantil)\b/i;
const danos = fs.readFileSync(path.join(ROOT, 'lessons-dele.js'), 'utf8');
const deleLines = new Set(); (danos.match(/sp: '([^']+)'/g) || []).forEach(m => deleLines.add(norm(m.slice(5, -1))));
const STOP = new Set('el la los las un una de del a al en y o me te se lo que es esta esta ya no si por con mi tu vos yo'.split(' '));
const tokens = s => wordsOf(s).filter(t => !STOP.has(t) && t.length > 2);
const allTokens = new Set(); LES.forEach(l => (l.lines || []).forEach(x => wordsOf(x.sp).forEach(t => allTokens.add(t))));
const linesText = l => (l.lines || []).map(x => norm(x.sp)).join(' | ');
const rows = []; let bad = 0; const seen = new Set();
LES.forEach((l, li) => {
  const err = [], warn = [], E = m => err.push(m);
  if (!l.id || seen.has(l.id)) E('id vacío o repetido'); seen.add(l.id);
  if (l.track !== 'Niños' || l.dele !== 'A1' || l.kid !== true) E('track/dele/kid');
  if (!['A', 'B'].includes(l.band)) E('band'); if (!Number.isInteger(l.unit) || !Number.isInteger(l.order)) E('unit/order');
  if (!l.emoji || !('art' in l)) E('emoji/art'); ['titleEs', 'titleZh', 'titleZhT', 'blurb', 'blurbZh', 'blurbZhT'].forEach(k => { if (!l[k]) E('falta ' + k); });
  const maxW = l.band === 'A' ? 5 : 9;
  if (!Array.isArray(l.lines) || l.lines.length < 6 || l.lines.length > 9) E('líneas: de 6 a 9 (hay ' + (l.lines || []).length + ')');
  let longest = 0;
  (l.lines || []).forEach((x, i) => { const n = wordsOf(x.sp).length; longest = Math.max(longest, n);
    if (n > maxW) E('línea ' + (i + 1) + ': ' + n + ' palabras (máx. ' + maxW + ' en la franja ' + l.band + ')');
    if (!x.who || !x.sp || !x.zh || !x.zhT) E('línea ' + (i + 1) + ' incompleta');
    if (TU.test(x.sp)) E('línea ' + (i + 1) + ': tuteo «' + x.sp + '»'); if (ESPANISMOS.test(x.sp)) E('línea ' + (i + 1) + ': españolismo');
    if (SIMP.test(x.zhT)) E('línea ' + (i + 1) + ': zhT con rasgos simplificados'); if (TRAD.test(x.zh)) E('línea ' + (i + 1) + ': zh con rasgos tradicionales');
    if (deleLines.has(norm(x.sp))) E('línea ' + (i + 1) + ' repite una mini-drama DELE existente: ' + x.sp); });
  const W = l.words || []; if (!W.length || W.length > 8) E('palabras nuevas: 1 a 8 (hay ' + W.length + ')');
  W.forEach(w => { if (!w.sp || !w.zh || !w.zhT || !('art' in w)) E('palabra incompleta ' + w.sp);
    if (!linesText(l).includes(norm(w.sp))) E('la palabra «' + w.sp + '» no aparece en las líneas'); });
  // reciclaje hacia atrás: cada lección (salvo la primera) reutiliza en sus líneas al menos 2 palabras nuevas de las anteriores
  const earlier = new Set(); LES.filter(o => o.order < l.order).forEach(o => (o.words || []).forEach(w => tokens(w.sp).forEach(t => earlier.add(t))));
  const lineTok = new Set((l.lines || []).flatMap(x => wordsOf(x.sp)));
  const recycled = Array.from(earlier).filter(t => lineTok.has(t)).length;
  if (l.order > 1 && recycled < 2) E('reciclaje: solo ' + recycled + ' palabras de lecciones anteriores reaparecen (mín. 2)');
  const Ls = l.listen || []; if (Ls.length !== 4) E('«Escuchá y tocá»: 4 ítems (hay ' + Ls.length + ')');
  Ls.forEach((x, i) => { const n = 'listen ' + (i + 1); if (!x.say || !Array.isArray(x.opts) || x.opts.length !== 3) { E(n + ': 3 opciones'); return; }
    if (new Set(x.opts.map(o => o.emoji)).size !== 3 || x.opts.some(o => !o.emoji || o.emoji.length > 12 || !o.sp || !o.zh || !o.zhT || !('art' in o))) E(n + ': emoji distintos y etiquetas completas');
    if (!norm(x.say).split(' ').includes(norm(x.opts[0].sp)) && norm(x.say) !== norm(x.opts[0].sp)) E(n + ': lo que suena no nombra la correcta «' + x.opts[0].sp + '»');
    x.opts.forEach(o => { if (!allTokens.has(norm(o.sp))) E(n + ': «' + o.sp + '» no aparece en ninguna línea del curso'); }); });
  const Q = l.quiz || []; if (Q.length !== 5) E('«Completar»: 5 ítems (hay ' + Q.length + ')');
  Q.forEach((x, i) => { const n = 'quiz ' + (i + 1); if ((x.sp.match(/___/g) || []).length !== 1 || !x.zh || !x.zhT || !Array.isArray(x.opts) || x.opts.length !== 3) { E(n + ': esquema'); return; }
    if (new Set(x.opts.map(o => norm(o.w))).size !== 3 || x.opts.some(o => !o.e || !o.eT)) E(n + ': 3 opciones distintas con glosa');
    const full = norm(x.sp.replace('___', x.opts[0].w)); if (!linesText(l).split(' | ').includes(full)) E(n + ': la frase «' + x.sp.replace('___', x.opts[0].w) + '» no sale de una línea'); });
  const nl = (l.lines || []).length, tw = (l.lines || []).reduce((s, x) => s + wordsOf(x.sp).length, 0);
  rows.push({ id: l.id, franja: l.band, unidad: l.unit, líneas: nl, 'palabras habladas': tw, 'máx. por línea': longest, 'nuevas': W.length, 'reciclaje': recycled, escuchar: Ls.length, completar: Q.length, errores: err.length });
  err.forEach(e => { bad++; console.log('✗', l.id, e); }); warn.forEach(w => console.log('⚠', l.id, w));
});
if (LES.length !== 6) { bad++; console.log('✗ el piloto son 6 lecciones (hay ' + LES.length + ')'); }
const bands = LES.reduce((m, l) => { m[l.band] = (m[l.band] || 0) + 1; return m; }, {}); if (!bands.A || !bands.B) { bad++; console.log('✗ faltan lecciones de una franja ' + JSON.stringify(bands)); }
console.table(rows);
console.log(LES.length + ' lecciones · franjas ' + JSON.stringify(bands) + ' · ' + (bad ? bad + ' error(es)' : 'todo en regla'));
process.exit(bad ? 1 : 0);
