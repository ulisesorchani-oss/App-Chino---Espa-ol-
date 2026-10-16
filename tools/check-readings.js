#!/usr/bin/env node
// tools/check-readings.js — valida window.READINGS (readings-*.js) en un navegador real.
//   node tools/check-readings.js            → tabla por texto + código de salida 1 si algo falla
// Usa Playwright (global o local) y los scripts reales de la app (zhSegmentAll y las
// listas EMBEDDED_MODULE_DATA), sirviendo la carpeta del repo en un puerto efímero.
// Reglas (ver el encabezado de readings-pilot.js):
//   · estructura y esquema por nivel (opciones, qZh desde HSK 5, whyNot = opts − 1)
//   · cobertura de nivel ≥ 90 % en AMBOS guiones (lista acumulada HSK1..n; nombres propios fuera)
//   · todo lo que queda fuera de nivel está cubierto por keywords/names
//   · largo (hanzi) dentro del rango del nivel · keywords que aparecen en el texto
//   · sin guion mezclado (zh sin rasgos tradicionales; zhT sin rasgos simplificados)
//   · opts[0] (la correcta) no es la más larga en más de la mitad de las preguntas de un texto
const http = require('http'), fs = require('fs'), path = require('path');
let pw; for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(m); break; } catch (e) {} }
if (!pw) { console.error('Falta playwright'); process.exit(2); }
const ROOT = path.resolve(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const FILES = (process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(ROOT).filter(f => /^readings-.*\.js$/.test(f) && f !== 'readings-ui.js'));
const srv = http.createServer((q, s) => {
    const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+$/, '/index.html'));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { s.writeHead(404); return s.end(); }
    s.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(s);
});
(async () => {
    await new Promise(r => srv.listen(0, r));
    const port = srv.address().port;
    const exe = process.env.CHROMIUM || ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(fs.existsSync);
    const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
    const pg = await b.newPage();
    await pg.goto('http://localhost:' + port + '/index.html'); await pg.waitForTimeout(1800);
    // los datos que index.html ya carga no se vuelven a cargar (ids repetidos)
    for (const f of FILES) if (!(await pg.$('script[src^="' + f + '"]'))) await pg.addScriptTag({ url: '/' + f });
    const res = await pg.evaluate(async () => {
        if (typeof ensureTocflPinyin === 'function') { try { await ensureTocflPinyin(); } catch (e) { /* sin tabla TOCFL */ } }
        const HAN = /[㐀-鿿]/, RANGE = { HSK3: [80, 160, 3, false], HSK5: [200, 330, 4, true], 'TOCFL-B1': [150, 260, 4, false] }; // [mín hanzi, máx, opciones, pregunta en chino]
        const keyOf = r => r.exam === 'TOCFL' ? 'TOCFL-' + r.examLvl : 'HSK' + r.hsk;
        const SIMP = /[们这个来说时为会应对还么开关东车门问间进过现发长]/, TRAD = /[們這個來說時為會應對還麼開關東車門問間進過現發長]/;
        const CUM = k => ({ HSK3: ['HSK1', 'HSK2', 'HSK3'], HSK5: ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5'], 'TOCFL-B1': ['TOCFL-Prep', 'TOCFL-A1', 'TOCFL-A2', 'TOCFL-B3'] })[k] || []; // acumuladas
        const sets = {}, setOf = n => sets[n] || (sets[n] = (() => { const w = new Set(), c = new Set(); CUM(n).forEach(m => EMBEDDED_MODULE_DATA[m].forEach(e => [e[0], e[1]].forEach(x => { if (x) { w.add(x); Array.from(x).forEach(ch => c.add(ch)); } }))); return { w, c }; })());
        const L = window.READINGS || [], out = [], seen = new Set();
        const ids = new Set((window.GRADED_LESSONS || []).map(l => l.id));
        L.forEach(r => {
            const err = [], warn = [], pre = (r.id || '?');
            const E = m => err.push(m);
            if (!r.id || seen.has(r.id) || ids.has(r.id)) E('id vacío o repetido'); seen.add(r.id);
            if (r.kind !== 'reading') E('kind');
            const key = keyOf(r); if (!RANGE[key]) E('nivel fuera del piloto: ' + key);
            ['genre', 'emoji', 'titleZh', 'titleZhT', 'titleEs', 'blurb'].forEach(k => { if (!r[k]) E('falta ' + k); });
            if (!Array.isArray(r.lines) || r.lines.length < 3) E('lines');
            (r.lines || []).forEach((l, i) => { if (!l.zh || !l.zhT || !l.es) E('línea ' + (i + 1) + ' incompleta'); if (SIMP.test(l.zhT)) E('línea ' + (i + 1) + ': zhT con rasgos simplificados'); if (TRAD.test(l.zh)) E('línea ' + (i + 1) + ': zh con rasgos tradicionales'); });
            // pinyin generado (el mismo que usa la lectura): no vacío y sin lecturas conocidas como erróneas
            const PY_BAD = ['shuì jué', 'zhǎng dà le', 'yín xíng'];
            (r.lines || []).forEach((l, i) => { let py = ''; try { py = (typeof pinyinFor === 'function') ? pinyinFor(l.zh, r) : pinyinPro.pinyin(l.zh); } catch (e) {} if (!py) E('línea ' + (i + 1) + ': sin pinyin'); else PY_BAD.forEach(b => { if (py.includes(b)) E('línea ' + (i + 1) + ': pinyin sospechoso «' + b + '»'); }); });
            const rg = RANGE[key] || [0, 9999, 3, false], set = setOf(key);
            const names = (r.names || []).concat(r.namesT || []);
            const kwChars = new Set(); (r.keywords || []).forEach(k => [k.zh, k.zhT].forEach(x => Array.from(x || '').forEach(ch => kwChars.add(ch)))); names.forEach(n => Array.from(n).forEach(ch => kwChars.add(ch)));
            const cover = (texts) => { let tok = 0, ok = 0, ok2 = 0; const bad = new Set();
                texts.forEach(t => { let s = t; names.forEach(n => { s = s.split(n).join('、'); });
                    zhSegmentAll(s).filter(x => HAN.test(x)).forEach(x => { tok++; const inl = set.w.has(x) || Array.from(x).every(ch => set.c.has(ch)); if (inl) { ok++; ok2++; } else { bad.add(x); if (Array.from(x).every(ch => set.c.has(ch) || kwChars.has(ch))) ok2++; } }); });
                return { tok, cov: tok ? 100 * ok / tok : 100, covKw: tok ? 100 * ok2 / tok : 100, bad: [...bad] }; };
            const cs = cover((r.lines || []).map(l => l.zh)), ct = cover((r.lines || []).map(l => l.zhT));
            if (cs.cov < 90) E('cobertura zh ' + cs.cov.toFixed(1) + ' % < 90'); if (ct.cov < 90) E('cobertura zhT ' + ct.cov.toFixed(1) + ' % < 90');
            const unc = (c) => c.bad.filter(x => !Array.from(x).every(ch => set.c.has(ch) || kwChars.has(ch))).join(' ');
            if (cs.covKw < 100) E('fuera de nivel sin keyword (zh): ' + unc(cs)); if (ct.covKw < 100) E('fuera de nivel sin keyword (zhT): ' + unc(ct));
            const chars = Array.from((r.lines || []).map(l => l.zh).join('')).filter(ch => HAN.test(ch)).length;
            if (chars < rg[0] || chars > rg[1]) E('largo ' + chars + ' hanzi fuera de ' + rg[0] + '–' + rg[1]);
            const all = (r.lines || []).map(l => l.zh).join(''), allT = (r.lines || []).map(l => l.zhT).join('');
            if (!(r.keywords || []).length || r.keywords.length > 6) E('keywords: 1 a 6'); (r.keywords || []).forEach(k => { if (!k.zh || !k.zhT || !k.es) E('keyword incompleta'); else { if (!all.includes(k.zh.split('…')[0].split('…')[0]) && !k.zh.includes('…')) E('keyword «' + k.zh + '» no está en el texto'); if (!k.zh.includes('…') && !allT.includes(k.zhT)) E('keyword «' + k.zhT + '» no está en el texto (zhT)'); } });
            const qs = r.questions || []; if (qs.length < 2 || qs.length > 4) E('preguntas: 2 a 4 (hay ' + qs.length + ')');
            let longest = 0;
            qs.forEach((q, i) => { const n = 'P' + (i + 1);
                if (!['detalle', 'idea', 'inferencia', 'vocabulario'].includes(q.type)) E(n + ' type');
                if (!q.es || !q.why) E(n + ' sin es/why');
                if (!Array.isArray(q.opts) || q.opts.length !== rg[2]) E(n + ' debe tener ' + rg[2] + ' opciones');
                else { if (new Set(q.opts).size !== q.opts.length) E(n + ' opciones repetidas'); if (!Array.isArray(q.whyNot) || q.whyNot.length !== q.opts.length - 1 || q.whyNot.some(x => !x)) E(n + ' whyNot debe explicar cada distractor (' + (q.opts.length - 1) + ')');
                    const shown = (rg[3] && Array.isArray(q.optsZh)) ? q.optsZh : q.opts; if (shown.slice(1).every(o => o.length < shown[0].length)) longest++; }
                if (rg[3]) { if (!q.qZh || !q.qZhT) E(n + ' falta qZh/qZhT'); if (!Array.isArray(q.optsZh) || !Array.isArray(q.optsZhT) || q.optsZh.length !== rg[2] || q.optsZhT.length !== rg[2]) E(n + ' optsZh/optsZhT'); else { const cq = cover([q.qZh].concat(q.optsZh)); if (cq.cov < 90) E(n + ' (chino) cobertura ' + cq.cov.toFixed(1) + ' %'); if (cq.covKw < 100) E(n + ' (chino) fuera de nivel: ' + cq.bad.filter(x => !Array.from(x).every(ch => set.c.has(ch) || kwChars.has(ch))).join(' ')); } }
                else if (q.qZh) E(n + ' qZh no va en ' + key); });
            if (qs.length && longest > qs.length / 2) warn.push('la correcta es la opción más larga en ' + longest + ' de ' + qs.length);
            out.push({ id: r.id, hsk: key, chars, lines: r.lines.length, q: qs.length, cov: +cs.cov.toFixed(1), covT: +ct.cov.toFixed(1), kw: (r.keywords || []).length, fuera: cs.bad.join(' '), err, warn });
        });
        return { n: L.length, out };
    });
    await b.close(); srv.close();
    console.table(res.out.map(o => ({ id: o.id, nivel: o.hsk, hanzi: o.chars, líneas: o.lines, preg: o.q, 'cob zh %': o.cov, 'cob zhT %': o.covT, kw: o.kw, 'fuera de lista': o.fuera })));
    let bad = 0; res.out.forEach(o => { o.err.forEach(e => { bad++; console.log('✗', o.id, e); }); o.warn.forEach(w => console.log('⚠', o.id, w)); });
    console.log(res.n + ' lecturas · ' + (bad ? bad + ' error(es)' : 'todo en regla'));
    process.exit(bad || !res.n ? 1 : 0);
})();
