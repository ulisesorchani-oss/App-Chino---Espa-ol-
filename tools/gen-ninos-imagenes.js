#!/usr/bin/env node
// tools/gen-ninos-imagenes.js — guía para generar las imágenes de «Niños» (lecciones y «Sonidos del español»).
//   node tools/gen-ninos-imagenes.js            → escribe docs/ninos-imagenes.md
//   node tools/gen-ninos-imagenes.js --check    → no escribe: falla (código 1) si falta un prompt, sobra uno, o el .md quedó desactualizado
//
// Fuentes: lessons-ninos.js + ninos-sonidos.js (qué imagen hace falta y dónde se usa) y docs/ninos-imagenes-prompts.json
// (el texto de cada prompt, escrito a mano: estilo, personajes y la descripción de cada dibujo). El .md se genera: no se edita a
// mano, se edita el JSON (o el contenido de las lecciones) y se vuelve a correr este script.
// Mientras no haya imágenes, la app sigue usando los emoji (el campo `art` de cada lección, palabra y opción está en null).
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const JSON_FILE = path.join(ROOT, 'docs', 'ninos-imagenes-prompts.json'), MD_FILE = path.join(ROOT, 'docs', 'ninos-imagenes.md');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'lessons-ninos.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'ninos-sonidos.js'), 'utf8'), ctx);
const LES = ctx.window.NINOS_LESSONS.slice().sort((a, b) => a.order - b.order), SON = ctx.window.NINOS_SONIDOS;
const P = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

// nombre de archivo estable: minúsculas, sin acentos, ñ → ny, signos fuera, espacios → guion
const slug = (s) => String(s).toLowerCase().replace(/ñ/g, 'ny').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:"«»“”]/g, '').trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
const BAND = { A: '🌱 6–7', B: '🌿 8–10' };
const cell = (t) => String(t).replace(/\|/g, '/').replace(/\n/g, ' ');

// ── qué imágenes hacen falta, en orden de aparición ──
const first = new Map();          // slug → { sp, zh, emoji, donde }
const lessonItems = LES.map(l => {
  const items = [];
  const add = (o, extra) => { const k = slug(o.sp); if (items.some(i => i.k === k)) return; const fresh = !first.has(k); if (fresh) first.set(k, { sp: o.sp, zh: o.zh, emoji: o.emoji, donde: l.id }); items.push({ k, sp: o.sp, zh: o.zh, emoji: o.emoji, fresh, from: first.get(k).donde, extra }); };
  l.words.forEach(w => add(w, false));
  l.listen.forEach(x => x.opts.forEach(o => add(o, true)));
  return { l, items };
});
const soundItems = SON.cards.map(c => {
  const items = [];
  c.words.forEach(w => { const k = slug(w.sp); if (items.some(i => i.k === k)) return; const fresh = !first.has(k); if (fresh) first.set(k, { sp: w.sp, zh: w.zh, emoji: w.emoji, donde: 'sonidos:' + c.id }); items.push({ k, sp: w.sp, zh: w.zh, emoji: w.emoji, fresh, from: first.get(k).donde, extra: false }); });
  return { c, items };
});

// ── verificación: cada imagen con su prompt, y ningún prompt huérfano ──
const problems = [];
const need = { palabras: new Set(first.keys()), portadas: new Set(LES.map(l => l.id)), sonidos: new Set(['sonidos-general'].concat(SON.cards.map(c => c.id))) };
Object.keys(need).forEach(sec => {
  need[sec].forEach(k => { if (!P[sec] || !P[sec][k]) problems.push('falta el prompt de ' + sec + '/' + k); });
  Object.keys(P[sec] || {}).forEach(k => { if (!need[sec].has(k)) problems.push('prompt huérfano (ya no se usa): ' + sec + '/' + k); });
});
Object.keys(P.rasgos || {}).forEach(k => { if (!P.personajes[k]) problems.push('«rasgos» de un personaje que no existe: ' + k); });
Object.keys(P.hojas || {}).forEach(k => { if (!k.split(/ y /).every(n => P.personajes[n] || P.personajes['Familia de ' + n] || n === 'Familia de Sofi')) problems.push('hoja de personaje con un nombre que no está en «personajes»: ' + k); });
Object.keys(P.personajes).forEach(n => { if (!Object.keys(P.hojas || {}).some(k => k.split(/ y /).includes(n) || k === n)) problems.push('el personaje «' + n + '» no aparece en ninguna hoja de personaje'); });
['estilo', 'negativo', 'personajes', 'formato'].forEach(k => { if (!P[k]) problems.push('falta «' + k + '» en el JSON'); });

// ── el .md ──
const F = P.formato, chars = Object.keys(P.personajes);
const who = (txt) => chars.filter(n => n !== 'Familia de Sofi' ? new RegExp('\\b' + n + '\\b').test(txt) : /family|father|grandmother/i.test(txt));
const out = [];
const w = (s) => out.push(s === undefined ? '' : s);
const nPal = first.size, nPort = LES.length, nSon = SON.cards.length + 1;
w('# Niños — guía para generar las imágenes');
w();
w('> Generado por `node tools/gen-ninos-imagenes.js` a partir de `lessons-ninos.js`, `ninos-sonidos.js` y `docs/ninos-imagenes-prompts.json`.');
w('> **No se edita a mano**: editá el JSON (o las lecciones) y volvé a correr el script. `--check` verifica que no falte ni sobre ningún prompt.');
w();
w('## Resumen');
w();
w('| Qué | Cantidad |');
w('|---|---|');
w('| Imágenes de palabras (se reutilizan entre lecciones) | **' + nPal + '** |');
w('| Portadas de lección (escena con los personajes) | **' + nPort + '** |');
w('| Portadas de «Sonidos del español» (1 general + ' + SON.cards.length + ' tarjetas) | **' + nSon + '** |');
w('| **Total** | **' + (nPal + nPort + nSon) + '** |');
w();
w('Hoy la app usa emoji; el campo `art` (`null`) de cada lección, palabra y opción de «Escuchá y tocá» está reservado para estas imágenes.');
w();
w('## 1. Cómo usar los prompts');
w();
w('1. **Estilo (siempre al principio de cada prompt):**');
w();
w('```text');
w(P.estilo);
w('```');
w();
w('2. **Prompt negativo** (si el generador lo admite):');
w();
w('```text');
w(P.negativo);
w('```');
w();
w('3. **Prompt completo** = `ESTILO` + `, ` + el texto de la tabla. En las **portadas** agregá, entre el estilo y la escena, la descripción de los personajes que aparecen (indicados en cada lección). Ejemplo de palabra: `' + (P.estilo.slice(0, 48)) + '…, ' + P.palabras.pelota + '`. En las palabras, «a child» es un chico cualquiera; si querés coherencia total, reemplazalo por Lin o por Sofi.');
w();
w('4. **Personajes** (usar SIEMPRE el mismo texto para que se parezcan en todas las escenas; si el generador acepta imágenes de referencia o una semilla, generá primero una hoja de personaje —frente, perfil y tres cuartos, cara neutra y feliz— y usala de referencia):');
w();
chars.forEach(n => { w('   - **' + n + '** — ' + P.personajes[n].replace(/^[^:]+:\s*/, '')); if ((P.rasgos || {})[n]) w('     *' + P.rasgos[n] + '*'); });
w();
w('   **Hoja de personaje (model sheet)** — generala primero y usala de referencia en todas las escenas. Una por pareja o grupo; la de Tian y Mati es la ficha original (los personajes nuevos), las demás están armadas con la misma plantilla:');
w();
Object.keys(P.hojas || {}).forEach(k => { w('   *' + k + ':*'); w(); w('   ```text'); w('   ' + P.hojas[k]); w('   ```'); w(); });
w();
w('5. **Formato y archivos:**');
w();
w('| Tipo | Carpeta | Proporción | Tamaño | Peso |');
w('|---|---|---|---|---|');
['palabras', 'portadas', 'sonidos'].forEach(k => w('| ' + k + ' | `' + F[k].carpeta + '/` | ' + F[k].proporcion + ' | ' + F[k].px + ' | ' + F[k].peso + ' |'));
w();
w('   Nombre de archivo = el que figura en cada tabla (minúsculas, sin acentos, `ñ` → `ny`). Fondo blanco liso (o transparente) y sin texto dentro de la imagen.');
w();
w('6. **Cómo se conectan** (cuando haya imágenes; hoy no hace falta tocar nada): en `lessons-ninos.js` / `ninos-sonidos.js`, el campo `art` de la pieza pasa de `null` a `{ "src": "img/ninos/palabras/pelota.webp", "alt": "Una pelota de fútbol" }`. `ninos-ui.js` ya dibuja el `<img>` cuando hay `art.src` y el emoji cuando no, así que se puede ir cargando de a poco. Al sumar las imágenes habrá que decidir qué se precachea en `sw.js` (' + (nPal + nPort + nSon) + ' imágenes de ~40–120 KB son varios MB: conviene cachear al usarlas, no todas de entrada).');
w();
w('## 2. Lección por lección');
w();
lessonItems.forEach(({ l, items }, i) => {
  const cover = P.portadas[l.id] || '(falta el prompt)';
  w('### ' + (i + 1) + ' · ' + l.titleEs + ' — ' + l.titleZh + ' · `' + l.id + '` · ' + BAND[l.band] + ' · unidad ' + l.unit);
  w();
  w('**Portada** · `' + F.portadas.carpeta + '/' + l.id + '.webp` · ' + F.portadas.proporcion + ' · emoji hoy: ' + l.emoji);
  w();
  w('> ' + cover);
  const ws = who(cover); if (ws.length) w('>\n> *Personajes:* ' + ws.join(', ') + ' (copiar su descripción de la sección 1).');
  w();
  w('| # | Español | 中文 | Emoji hoy | Archivo (`' + F.palabras.carpeta + '/`) | Prompt (agregar el estilo antes) |');
  w('|---|---|---|---|---|---|');
  items.forEach((it, j) => {
    const pr = it.fresh ? cell(P.palabras[it.k] || '(falta)') : '↩ misma imagen que en `' + it.from + '` (ya descrita)';
    w('| ' + (j + 1) + ' | ' + cell(it.sp) + (it.extra ? ' *(opción de «Escuchá y tocá»)*' : '') + ' | ' + cell(it.zh) + ' | ' + it.emoji + ' | `' + it.k + '.webp` | ' + pr + ' |');
  });
  w();
});
w('## 3. Sonidos del español');
w();
const sg = P.sonidos['sonidos-general'];
w('**Portada general** · `' + F.sonidos.carpeta + '/sonidos-general.webp` · ' + F.sonidos.proporcion + ' · emoji hoy: ' + SON.emoji);
w();
w('> ' + sg);
w();
soundItems.forEach(({ c, items }) => {
  w('### ' + c.letters + ' — ' + c.titleEs + ' (' + c.titleZh + ') · `' + c.id + '`');
  w();
  w('**Portada** · `' + F.sonidos.carpeta + '/' + c.id + '.webp` · ' + F.sonidos.proporcion + ' · emoji hoy: ' + c.emoji);
  w();
  w('> ' + (P.sonidos[c.id] || '(falta)'));
  w();
  w('| # | Español | 中文 | Emoji hoy | Archivo (`' + F.palabras.carpeta + '/`) | Prompt (agregar el estilo antes) |');
  w('|---|---|---|---|---|---|');
  items.forEach((it, j) => {
    const pr = it.fresh ? cell(P.palabras[it.k] || '(falta)') : '↩ misma imagen que en `' + it.from + '` (ya descrita)';
    w('| ' + (j + 1) + ' | ' + cell(it.sp) + ' | ' + cell(it.zh) + ' | ' + it.emoji + ' | `' + it.k + '.webp` | ' + pr + ' |');
  });
  w();
});
w('## 4. Lista de verificación al recibir las imágenes');
w();
w('- [ ] Mismo estilo y paleta en todas; los personajes se reconocen de una escena a otra.');
w('- [ ] Sin texto, letras ni números dentro de la imagen (el calendario es solo una grilla de colores).');
w('- [ ] Nada que asuste o resulte inadecuado para chicos de 6 a 10 años; sin marcas reales.');
w('- [ ] Las banderas y la ropa argentinas (guardapolvo blanco, celeste y blanco) son correctas; los rasgos de Lin y de Mamá son respetuosos y no caricaturescos.');
w('- [ ] Cada archivo con el nombre exacto de la tabla y dentro del peso indicado.');
w();
const md = out.join('\n');

if (process.argv.includes('--check')) {
  if (!fs.existsSync(MD_FILE) || fs.readFileSync(MD_FILE, 'utf8') !== md) problems.push('docs/ninos-imagenes.md está desactualizado: corré `node tools/gen-ninos-imagenes.js`');
  if (problems.length) { problems.forEach(p => console.log('✗ ' + p)); process.exit(1); }
  console.log('gen-ninos-imagenes: ' + (nPal + nPort + nSon) + ' imágenes con prompt (' + nPal + ' palabras · ' + nPort + ' portadas · ' + nSon + ' de sonidos) · .md al día');
  process.exit(0);
}
if (problems.length) { problems.forEach(p => console.log('✗ ' + p)); process.exit(1); }
fs.writeFileSync(MD_FILE, md);
console.log('escrito docs/ninos-imagenes.md — ' + (nPal + nPort + nSon) + ' imágenes (' + nPal + ' palabras · ' + nPort + ' portadas · ' + nSon + ' de sonidos)');
