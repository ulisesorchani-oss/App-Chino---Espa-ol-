#!/usr/bin/env node
// tools/check-readings.js — valida window.READINGS (readings-*.js) en un navegador real.
//   node tools/check-readings.js            → tabla por texto + código de salida 1 si algo falla
// Usa Playwright (global o local) y los scripts reales de la app (zhSegmentAll y las
// listas EMBEDDED_MODULE_DATA), sirviendo la carpeta del repo en un puerto efímero.
// Además valida window.READINGS_V2 (readings-examen.js, esquema v2): parámetros en tools/lecturas-examen/config.json; recalcula largo, fueraDeNivel
// y el tradicional (OpenCC s2tw + ida y vuelta tw2s; requiere `pip install opencc`, OPENCC_PYTHONPATH opcional) y exige que lo guardado coincida.
// Reglas de v1 (ver el encabezado de readings-pilot.js):
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
    const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'lecturas-examen', 'config.json'), 'utf8'));
    const res = await pg.evaluate(async (cfgL) => {
        if (typeof ensureTocflPinyin === 'function') { try { await ensureTocflPinyin(); } catch (e) { /* sin tabla TOCFL */ } }
        const HAN = /[㐀-鿿]/, RANGE = { HSK3: cfgL[3].concat([3, false]), HSK5: cfgL[5].concat([4, true]), 'TOCFL-B1': [150, 260, 4, false] }; // [mín hanzi, máx, opciones, pregunta en chino]
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
    }, cfg.largo);
    // ── lecturas v2 (window.READINGS_V2, readings-examen.js): reglas y parámetros en tools/lecturas-examen/config.json ──
    await pg.addScriptTag({ content: fs.readFileSync(path.join(__dirname, 'lecturas-examen', 'nivel.js'), 'utf8') });
    const res2 = await pg.evaluate(async (cfg) => {
        const HAN = /[㐀-鿿]/, BLANK = '＿＿', SIMP = /[们这个来说时为会应对还么开关东车门问间进过现发长]/, TRAD = /[們這個來說時為會應對還麼開關東車門問間進過現發長]/;
        const hz = s => String(s || '').replace(/[^㐀-鿿]/g, ''), LN = window.LecNivel;
        const L = window.READINGS_V2 || [], seen = new Set(), out = [], pairs = [], v1pairs = [];
        const used = new Set((window.READINGS || []).map(r => r.id).concat((window.GRADED_LESSONS || []).map(l => l.id)));
        const rng = (v, a) => v >= a[0] && v <= a[1];
        L.forEach(r => {
            const err = [], warn = [], E = m => err.push(m), W = m => warn.push(m);
            if (!r.id || seen.has(r.id) || used.has(r.id)) E('id vacío o repetido (también contra v1 y las lecciones)'); seen.add(r.id);
            if (r.schema !== 2) E('schema debe ser 2'); if (!cfg.tipos[r.tipo]) E('tipo: ' + Object.keys(cfg.tipos).join(' | '));
            const nv = r.nivel, rgL = cfg.largo[nv]; if (!rgL) E('nivel ' + nv + ' sin configuración');
            if (!cfg.generos.includes(r.genero)) E('genero «' + r.genero + '» fuera de la lista'); if (!r.emoji) E('falta emoji');
            if (!['pendiente', 'revisado', 'nativo'].includes(r.revision)) E('revision: pendiente | revisado | nativo'); if (r.revision === 'nativo' && !String(r.revisor || '').trim()) E('revision «nativo» exige revisor (quién lo confirmó: profesora o hablante)'); else if (r.revisor && r.revision !== 'nativo') E('revisor solo va con revision «nativo»');
            const T = r.titulo || {}; if (!T.zh || !T.zhT || !T.es) E('titulo incompleto');
            const ps = r.parrafos || []; if (!ps.length) E('sin párrafos');
            ps.forEach((p, i) => { if (!p.zh || !p.zhT || !p.es) E('párrafo ' + (i + 1) + ' incompleto'); });
            const scr = (s, w) => { if (SIMP.test(s.zhT || '')) E(w + ': zhT con rasgos simplificados'); if (TRAD.test(s.zh || '')) E(w + ': zh con rasgos tradicionales'); };
            scr(T, 'titulo'); ps.forEach((p, i) => scr(p, 'párrafo ' + (i + 1)));
            const text = ps.map(p => p.zh).join(''), textT = ps.map(p => p.zhT).join(''), H = hz(text), HT = hz(textT);
            const tp = cfg.tipos[r.tipo] || cfg.tipos.examen, nom = (r.nombres || []).map(n => n.zh), dentro = r.dentroDeNivel || [];
            (r.nombres || []).forEach(n => { if (!n.zh || !n.zhT) E('nombre incompleto'); else { if (!H.includes(hz(n.zh))) E('nombre «' + n.zh + '» no aparece en el texto'); if (!HT.includes(hz(n.zhT))) E('nombre «' + n.zhT + '» no aparece en el texto (zhT)'); } });
            dentro.forEach(x => { if (!H.includes(hz(x))) E('dentroDeNivel «' + x + '» no aparece en el texto'); else if (!LN.alto(nv).has(x)) E('dentroDeNivel «' + x + '» no coincide con ninguna palabra de nivel más alto (sobra)'); });
            // largo (calculado) y rango
            const largo = H.length; if (r.largo !== largo) E('largo guardado ' + r.largo + ' ≠ calculado ' + largo); if (rgL && !rng(largo, rgL)) E('largo ' + largo + ' hanzi fuera de ' + rgL.join('–'));
            // glosario
            const gl = r.glosario || [], glChars = new Set(); gl.forEach(g => [g.zh, g.zhT].forEach(x => Array.from(x || '').forEach(ch => glChars.add(ch))));
            if (!rng(gl.length, cfg.glosario)) E('glosario: ' + cfg.glosario.join(' a ') + ' palabras (hay ' + gl.length + ')');
            if (new Set(gl.map(g => g.zh)).size !== gl.length) E('glosario con palabras repetidas');
            gl.forEach(g => { if (!g.zh || !g.zhT || !g.categoria || !g.es || typeof g.fueraDeNivel !== 'boolean' || !('nivelLista' in g)) { E('glosario «' + g.zh + '» incompleto'); return; }
                scr(g, 'glosario «' + g.zh + '»');
                const calc = LN.fueraEntrada(g.zh, nv), lv = LN.nivelExacto(g.zh); if (calc !== g.fueraDeNivel) E('glosario «' + g.zh + '»: fueraDeNivel guardado ' + g.fueraDeNivel + ' ≠ calculado ' + calc); if (lv !== g.nivelLista) E('glosario «' + g.zh + '»: nivelLista guardado ' + g.nivelLista + ' ≠ calculado ' + lv);
                if (!g.zh.split('…').filter(Boolean).every(x => H.includes(hz(x)))) E('glosario «' + g.zh + '» no aparece en el texto'); if (!g.zhT.split('…').filter(Boolean).every(x => HT.includes(hz(x)))) E('glosario «' + g.zhT + '» no aparece en el texto (zhT)'); });
            // nivel por palabras (lista de referencia: LN.LISTA) y tope de palabras fuera, según el tipo
            const cubierta = x => gl.some(g => g.zh.split('…').some(pt => pt && (pt.includes(x) || x.includes(pt))));
            const an = LN.analizar(ps.map(p => p.zh), nv, { nombres: nom, dentro });
            if (an.cobertura < tp.coberturaMinima) E('nivel por palabras ' + an.cobertura.toFixed(1) + ' % < ' + tp.coberturaMinima + ' % (' + r.tipo + ')');
            if (tp.maxFuera !== null && an.fuera.length > tp.maxFuera) E(an.fuera.length + ' palabras fuera de nivel (' + an.fuera.join(' ') + ') > tope ' + tp.maxFuera + ' en tipo ' + r.tipo);
            const sinGl = an.fuera.filter(x => !cubierta(x)); if (sinGl.length) E('fuera de nivel sin glosario: ' + sinGl.join(' '));
            const lvl = (texts, w) => { const c = LN.analizar(texts, nv, { nombres: nom }).fuera.filter(x => !cubierta(x)); if (c.length) E(w + ': fuera de nivel sin glosario: ' + c.join(' ')); };
            // comprensión
            const qs = r.comprension || [], nOpt = cfg.opcionesComprension[nv], rgQ = cfg.comprension[nv]; let longest = 0, nOptQ = 0;
            if (rgQ && !rng(qs.length, rgQ)) E('comprensión: ' + rgQ.join(' a ') + ' preguntas (hay ' + qs.length + ')');
            qs.forEach((q, i) => { const n = 'P' + (i + 1);
                if (!['idea', 'detalle', 'vf', 'vocabulario'].includes(q.tipo)) E(n + ' tipo'); if (!q.es || !q.why) E(n + ' sin es/why');
                // la respuesta tiene que estar respaldada por el texto: el why cita en «» el pasaje chino (partes separadas por …)
                const quotes = (String(q.why || '').match(/«[^»]*»/g) || []).map(x => x.slice(1, -1)).flatMap(x => x.split('…')).map(hz).filter(x => x.length >= 2);
                if (!quotes.length) E(n + ' el why debe citar en «» el pasaje chino que respalda la respuesta'); else quotes.forEach(x => { if (!H.includes(x)) E(n + ' el pasaje citado «' + x + '» no está en el texto'); });
                if (q.tipo === 'vf') { if (typeof q.vf !== 'boolean') E(n + ' vf debe ser true/false'); if (q.opts) E(n + ' vf no lleva opts'); return; }
                nOptQ++;
                if (!Array.isArray(q.opts) || q.opts.length !== nOpt) { E(n + ' debe tener ' + nOpt + ' opciones'); return; }
                if (new Set(q.opts).size !== q.opts.length) E(n + ' opciones repetidas');
                if (!Array.isArray(q.whyNot) || q.whyNot.length !== q.opts.length - 1 || q.whyNot.some(x => !x)) E(n + ' whyNot debe explicar cada distractor (' + (q.opts.length - 1) + ')');
                if (nv === 5) { if (!q.qZh || !q.qZhT || !Array.isArray(q.optsZh) || q.optsZh.length !== nOpt) E(n + ' HSK 5 lleva qZh/qZhT/optsZh/optsZhT'); } else if (q.qZh) E(n + ' qZh solo desde HSK 5');
                if (q.opts.slice(1).every(o => o.length < q.opts[0].length)) longest++; });
            if (nOptQ && longest > nOptQ / 2) W('la correcta es la opción más larga en ' + longest + ' de ' + nOptQ);
            // banco de palabras
            const bk = r.banco || {}, hu = bk.huecos || [], pal = bk.palabras || [];
            if (hu.length !== cfg.huecos) E('banco: ' + cfg.huecos + ' huecos (hay ' + hu.length + ')');
            hu.forEach((h, i) => { const n = 'hueco ' + (i + 1);
                if ((h.zh || '').split(BLANK).length !== 2 || (h.zhT || '').split(BLANK).length !== 2) { E(n + ' debe tener exactamente un ' + BLANK); return; }
                if (!h.resp || !h.respT) { E(n + ' sin resp/respT'); return; }
                if (!H.includes(hz(h.zh.replace(BLANK, h.resp)))) E(n + ' con «' + h.resp + '» no reproduce una frase del texto'); if (!HT.includes(hz(h.zhT.replace(BLANK, h.respT)))) E(n + ' (zhT) con «' + h.respT + '» no reproduce una frase del texto');
                const fits = pal.filter(w => H.includes(hz(h.zh.replace(BLANK, w)))); if (fits.length !== 1) E(n + ': ' + fits.length + ' palabras del banco reproducen el texto (debe ser 1)'); });
            const resps = hu.map(h => h.resp), extra = pal.filter(w => !resps.includes(w));
            if (new Set(pal).size !== pal.length) E('banco: palabras repetidas'); if (resps.some(w => !pal.includes(w))) E('banco: falta una respuesta en palabras');
            if (!rng(extra.length, cfg.sobrantes)) E('banco: ' + cfg.sobrantes.join(' a ') + ' sobrantes (hay ' + extra.length + ')');
            if (!Array.isArray(bk.palabrasT) || bk.palabrasT.length !== pal.length) E('banco: palabrasT debe tener ' + pal.length + ' elementos');
            extra.forEach(w => { if (H.includes(hz(w))) W('sobrante «' + w + '» aparece en el texto'); });
            lvl(pal, 'banco');
            // palabras parecidas
            const pc = r.parecidas || [];
            if (nv >= cfg.parecidasDesdeNivel) { if (!rng(pc.length, cfg.parecidas)) E('parecidas: ' + cfg.parecidas.join(' a ') + ' (hay ' + pc.length + ')'); } else if (pc.length) E('parecidas solo desde HSK ' + cfg.parecidasDesdeNivel);
            pc.forEach((p, i) => { const n = 'parecida ' + (i + 1);
                if ((p.zh || '').split(BLANK).length !== 2 || (p.zhT || '').split(BLANK).length !== 2) { E(n + ' debe tener exactamente un ' + BLANK); return; }
                if (!Array.isArray(p.opts) || p.opts.length < 3 || p.opts.length > 4 || new Set(p.opts).size !== p.opts.length || !Array.isArray(p.optsT) || p.optsT.length !== p.opts.length) { E(n + ': 3 o 4 opciones distintas (y optsT)'); return; }
                if (!Array.isArray(p.ok) || !p.ok.length || new Set(p.ok).size !== p.ok.length || p.ok.some(k => !Number.isInteger(k) || k < 0 || k >= p.opts.length) || p.ok.length >= p.opts.length) E(n + ': ok debe ser un conjunto de índices válidos y dejar al menos una opción incorrecta');
                if (!p.why) E(n + ' sin why');
                else if (Array.isArray(p.ok) && p.ok.every(k => H.includes(hz(p.zh.replace(BLANK, p.opts[k]))) === false)) W(n + ': ninguna opción válida reproduce la frase del texto');
                lvl([p.zh.split(BLANK).join('')].concat(p.opts), n); });
            // capa 2
            const c2 = r.capa2; if (c2) ['notas', 'colocaciones'].forEach(k => { (c2[k] || []).forEach((x, i) => { if (!x.zh || !x.zhT || !x.es) E('capa2.' + k + ' ' + (i + 1) + ' incompleto'); scr(x, 'capa2.' + k + ' ' + (i + 1)); }); lvl((c2[k] || []).map(x => x.zh), 'capa2.' + k); });
            // pares zh/zhT para el ida y vuelta con OpenCC (en Node)
            const P = (w, zh, zhT) => pairs.push({ id: r.id, w, zh, zhT });
            P('titulo', T.zh, T.zhT); ps.forEach((p, i) => P('párrafo ' + (i + 1), p.zh, p.zhT)); gl.forEach(g => P('glosario', g.zh, g.zhT));
            // OpenCC depende del contexto (面 → 麵 solo en «吃了一碗面»): lo que lleva ＿＿ se compara con la palabra puesta en la frase
            hu.forEach(h => { if (h.zh && h.zhT && h.resp && h.respT) P('hueco', h.zh.replace(BLANK, h.resp), h.zhT.replace(BLANK, h.respT)); });
            pal.forEach((w, i) => { if (!resps.includes(w)) P('palabra sobrante', w, (bk.palabrasT || [])[i]); });
            pc.forEach(p => (p.opts || []).forEach((o, i) => { if (p.zh && p.zhT) P('parecida', p.zh.replace(BLANK, o), p.zhT.replace(BLANK, (p.optsT || [])[i] || '')); }));
            if (c2) ['notas', 'colocaciones'].forEach(k => (c2[k] || []).forEach(x => P('capa2', x.zh, x.zhT)));
            out.push({ id: r.id, tipo: r.tipo, nivel: nv, largo, cov: +an.cobertura.toFixed(1), fuera: an.fuera.join(' '), nFuera: an.fuera.length, gl: gl.length, glFuera: gl.filter(g => g.fueraDeNivel).length, q: qs.length, huecos: hu.length, sobr: extra.length, par: pc.length, err, warn });
        });
        // v1 (sin cambios): se listan sus pares para ver si usan la misma conversión
        (window.READINGS || []).forEach(r => { const P = (w, zh, zhT) => { if (zh || zhT) v1pairs.push({ id: r.id, w, zh, zhT }); };
            P('titulo', r.titleZh, r.titleZhT); (r.lines || []).forEach((l, i) => P('línea ' + (i + 1), l.zh, l.zhT)); (r.keywords || []).forEach(k => P('keyword', k.zh, k.zhT));
            (r.names || []).forEach((n, i) => P('nombre', n, (r.namesT || [])[i])); (r.questions || []).forEach((q, i) => { P('P' + (i + 1) + ' pregunta', q.qZh, q.qZhT); (q.optsZh || []).forEach((o, k) => P('P' + (i + 1) + ' opción', o, (q.optsZhT || [])[k])); }); });
        return { n: L.length, out, pairs, v1pairs, lista: LN.LISTA, conteo: [LN.conteo(1), LN.conteo(2), LN.conteo(3), LN.conteo(4)].join(' / ').replace(/^/, '1: ').replace(' / ', ' · 1–2: ').replace(' / ', ' · 1–3: ').replace(' / ', ' · 1–4: ') };
    }, cfg);
    // ida y vuelta con OpenCC s2tw / tw2s: lo guardado debe ser EXACTAMENTE s2tw(zh) y tw2s(zhT) debe devolver zh
    const rt = { diffsV2: [], diffsV1: [], skipped: null, total: 0 };
    const all = res2.pairs.map(p => Object.assign({ v: 2 }, p)).concat(res2.v1pairs.map(p => Object.assign({ v: 1 }, p)));
    try {
        const o = JSON.parse(require('child_process').execFileSync('python3', [path.join(__dirname, 'lecturas-examen', 'opencc-s2tw.py')], { input: JSON.stringify(all.map(p => p.zh || '')), encoding: 'utf8', maxBuffer: 1 << 26, env: Object.assign({}, process.env, process.env.OPENCC_PYTHONPATH ? { PYTHONPATH: process.env.OPENCC_PYTHONPATH } : {}) }));
        rt.total = all.length;
        all.forEach((p, i) => { const t = o.t[i], back = o.back[i]; if (!p.zh || (t === p.zhT && back === p.zh)) return;
            const d = []; Array.from(p.zh).forEach((ch, k) => { const tc = Array.from(p.zhT || '')[k], oc = Array.from(t)[k]; if (tc !== oc) d.push(ch + ': guardado ' + tc + ' · s2tw ' + oc); });
            const e = { id: p.id, w: p.w, zh: p.zh, guardado: p.zhT, s2tw: t, vuelta: back, d }; (p.v === 2 ? rt.diffsV2 : rt.diffsV1).push(e); });
    } catch (e) { rt.skipped = String(e.message || e).split('\n').filter(Boolean).slice(-1)[0]; }
    await b.close(); srv.close();
    console.table(res.out.map(o => ({ id: o.id, nivel: o.hsk, hanzi: o.chars, líneas: o.lines, preg: o.q, 'cob zh %': o.cov, 'cob zhT %': o.covT, kw: o.kw, 'fuera de lista': o.fuera })));
    let bad = 0; res.out.forEach(o => { o.err.forEach(e => { bad++; console.log('✗', o.id, e); }); o.warn.forEach(w => console.log('⚠', o.id, w)); });
    console.log(res.n + ' lecturas v1 · ' + (bad ? bad + ' error(es)' : 'todo en regla'));
    // ── v2 ──
    console.log('\nLecturas v2 (READINGS_V2) — control por texto · lista de referencia: ' + res2.lista + ' (embebida; palabras acumuladas HSK ' + res2.conteo + ')');
    if (res2.n) console.table(res2.out.map(o => ({ id: o.id, tipo: o.tipo, nivel: 'HSK ' + o.nivel, hanzi: o.largo, 'nivel % (palabras)': o.cov, 'fuera de nivel': o.nFuera + ': ' + o.fuera, glosario: o.gl + ' (' + o.glFuera + ' fuera)', preg: o.q, huecos: o.huecos + '+' + o.sobr, parecidas: o.par })));
    let bad2 = 0; res2.out.forEach(o => { o.err.forEach(e => { bad2++; console.log('✗', o.id, e); }); o.warn.forEach(w => console.log('⚠', o.id, w)); });
    if (rt.skipped) { bad2++; console.log('✗ no pude correr OpenCC (pip install opencc): ' + rt.skipped); }
    else {
        rt.diffsV2.forEach(d => { bad2++; console.log('✗', d.id, d.w, '«' + d.zh + '» → guardado «' + d.guardado + '» · s2tw «' + d.s2tw + '» · tw2s «' + d.vuelta + '»  [' + d.d.join('; ') + ']'); });
        console.log('OpenCC s2tw/tw2s · v2: ' + res2.pairs.length + ' cadenas, ' + (rt.diffsV2.length ? rt.diffsV2.length + ' con diferencias' : 'ida y vuelta sin diferencias') + ' · v1 (sin cambios): ' + res2.v1pairs.length + ' cadenas, ' + (rt.diffsV1.length ? rt.diffsV1.length + ' con diferencias (informativo)' : 'ida y vuelta sin diferencias'));
        rt.diffsV1.forEach(d => console.log('  ≠ v1', d.id, d.w, '«' + d.zh + '» guardado «' + d.guardado + '» · s2tw «' + d.s2tw + '» · tw2s «' + d.vuelta + '»  [' + d.d.join('; ') + ']'));
    }
    console.log(res2.n + ' lecturas v2 · ' + (bad2 ? bad2 + ' error(es)' : 'todo en regla'));
    process.exit(bad || bad2 || !res.n ? 1 : 0);
})();
