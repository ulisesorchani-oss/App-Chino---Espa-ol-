// tools/lecturas-examen/nivel.js — control de NIVEL por palabras para las lecturas v2 (se inyecta en el navegador de la app).
// Lo usan tools/build-readings-examen.js y tools/check-readings.js: una sola implementación, para que lo que se genera y lo que se valida no diverjan.
//
// LISTA DE REFERENCIA: HSK 3.0 (GF0025-2021), tal como está EMBEBIDA en la app (EMBEDDED_MODULE_DATA['HSK1'..'HSK9'], tuplas [simp, trad|null, …]).
// Ojo: la lista embebida suma 10.944 palabras (el estándar publicado, según data-embedded.js, 11.092) y su encabezado avisa que HSK 4–9 no se
// re-verificó contra el original; por eso se informa también el tamaño acumulado en cada corrida. Si una palabra «no está», es que no está EN LA APP.
//
// Regla (por palabras, no por caracteres):
//   · léxico(n) = palabras HSK 1..n, en simplificado y tradicional. Se suman: la forma sin 儿/兒 de las entradas con erhua (玩儿 → 玩), las partes fijas de los
//     patrones con «…» (…分之… → 分之) y se acepta 儿/兒 detrás de cualquier palabra del léxico (点儿, 一会儿).
//   · el texto (sin los nombres propios declarados) se parte en tramos de hanzi y cada tramo se segmenta con programación dinámica: se minimizan primero los
//     caracteres sin cubrir, después los tramos sin cubrir y por último la cantidad de segmentos (gana la palabra más larga).
//   · «palabra dentro del nivel» = segmento cubierto por el léxico; «palabra fuera de nivel» = tramo sin cubrir, informado con la palabra COMPLETA que lo contiene
//     según el segmentador de la app (zhSegmentAll). cobertura % = segmentos cubiertos / (segmentos cubiertos + tramos sin cubrir).
(function (root) {
    const HAN = /[㐀-鿿]/, LISTA = 'HSK 3.0 (GF0025-2021)';
    const cache = {};
    const rowsOf = n => EMBEDDED_MODULE_DATA['HSK' + n] || [];
    function lex(n) {
        if (cache[n]) return cache[n];
        const w = new Set();
        const add = x => { if (!x) return; w.add(x); if (/[儿兒]$/.test(x) && x.length > 1) w.add(x.slice(0, -1)); };
        for (let i = 1; i <= n; i++) rowsOf(i).forEach(e => [e[0], e[1]].forEach(x => { if (!x) return; if (x.includes('…')) x.split('…').filter(Boolean).forEach(add); else add(x); }));
        return (cache[n] = w);
    }
    // nivel de la entrada EXACTA en la lista embebida (menor HSK 1–9), o null si «no está»
    function nivelExacto(word) {
        for (let i = 1; i <= 9; i++) if (rowsOf(i).some(e => e[0] === word || e[1] === word)) return i;
        return null;
    }
    function conteo(n) { let c = 0; for (let i = 1; i <= n; i++) c += rowsOf(i).length; return c; }
    // segmenta un tramo de hanzi → { cubiertos: nº de palabras de la lista, runs: [[desde, hasta)] sin cubrir }
    function dp(chunk, w) {
        const a = Array.from(chunk), n = a.length, INF = 1e12, cost = (u, r, s) => u * 1e6 + r * 1e3 + s;
        if (!n) return { cubiertos: 0, runs: [] };
        const F = Array.from({ length: n + 1 }, () => [INF, INF]), B = Array.from({ length: n + 1 }, () => [null, null]);
        F[0][0] = 0; // estado s: 1 si el carácter anterior quedó sin cubrir (el mismo tramo continúa)
        for (let i = 0; i < n; i++) for (let s = 0; s < 2; s++) {
            const c0 = F[i][s]; if (c0 >= INF) continue;
            const cu = c0 + cost(1, s ? 0 : 1, 0); if (cu < F[i + 1][1]) { F[i + 1][1] = cu; B[i + 1][1] = [i, s, 'u']; }
            for (let j = i + 1; j <= Math.min(n, i + 12); j++) {
                const t = a.slice(i, j).join('');
                if (w.has(t) || (/[儿兒]$/.test(t) && t.length > 1 && w.has(t.slice(0, -1)))) { const cc = c0 + cost(0, 0, 1); if (cc < F[j][0]) { F[j][0] = cc; B[j][0] = [i, s, 'w']; } }
            }
        }
        let s = F[n][0] <= F[n][1] ? 0 : 1, i = n; const seg = [];
        while (i > 0) { const [pi, ps, kind] = B[i][s]; seg.push([pi, i, kind]); i = pi; s = ps; }
        let cubiertos = 0; const runs = [];
        seg.reverse().forEach(([x, y, k]) => { if (k === 'w') cubiertos++; else { const last = runs[runs.length - 1]; if (last && last[1] === x) last[1] = y; else runs.push([x, y]); } });
        return { cubiertos, runs };
    }
    // palabras de varios caracteres que la lista pone en un nivel MÁS ALTO (毛笔 = 毛 + 笔 no cuenta como «dentro» solo porque 毛 y 笔 sí estén)
    const hiCache = {};
    function alto(n) {
        if (hiCache[n]) return hiCache[n];
        const w = lex(n), h = new Set();
        for (let i = n + 1; i <= 9; i++) rowsOf(i).forEach(e => [e[0], e[1]].forEach(x => { if (x && x.length > 1 && !x.includes('…') && !w.has(x)) h.add(x); }));
        return (hiCache[n] = h);
    }
    // analiza textos (lista de cadenas) al nivel n. opts.nombres = nombres propios que no cuentan; opts.dentro = coincidencias con una palabra de nivel más alto
    // que, en ese texto, son otras palabras del nivel (都会 = 都 + 会, no «metrópolis»): lista revisada a mano y declarada en el texto.
    function analizar(textos, n, opts) {
        const w = lex(n), hi = alto(n), nombres = (opts && opts.nombres) || [], dentro = (opts && opts.dentro) || []; let cub = 0, nruns = 0; const fuera = new Set();
        const pieza = toks => {
            if (!toks.length) return; const txt = toks.join(''), r = dp(txt, w); cub += r.cubiertos; nruns += r.runs.length; if (!r.runs.length) return;
            const spans = []; let p = 0; toks.forEach(tk => { const l = Array.from(tk).length; spans.push([p, p + l, tk]); p += l; });
            r.runs.forEach(([x, y]) => { const hit = spans.find(sp => sp[0] <= x && sp[1] >= y); fuera.add(hit ? hit[2] : Array.from(txt).slice(x, y).join('')); });
        };
        textos.forEach(t => {
            let s = String(t); nombres.forEach(x => { s = s.split(x).join('、'); });
            (s.match(/[㐀-鿿]+/g) || []).forEach(chunk => {
                const toks = (typeof zhSegmentAll === 'function') ? zhSegmentAll(chunk) : [chunk];
                if (toks.join('') !== chunk) { pieza([chunk]); return; }
                let buf = []; toks.forEach(tk => { if (hi.has(tk) && !dentro.includes(tk)) { pieza(buf); buf = []; nruns++; fuera.add(tk); } else buf.push(tk); }); pieza(buf);
            });
        });
        const tot = cub + nruns;
        const lista = [...fuera].filter(x => ![...fuera].some(y => y !== x && y.includes(x))); // 联 dentro de 春联: se informa solo la palabra completa
        return { cobertura: tot ? 100 * cub / tot : 100, segmentos: tot, fuera: lista };
    }
    // ¿la entrada del glosario (o cualquier palabra suelta) está fuera del nivel n? Fuera = figura en un nivel MÁS ALTO de la lista, o no se arma con palabras del nivel
    function fueraEntrada(zh, n) {
        const ex = nivelExacto(zh); if (ex !== null && ex > n && !lex(n).has(zh)) return true; if (ex !== null && ex <= n) return false;
        return analizar(String(zh).split('…'), n, {}).fuera.length > 0;
    }
    root.LecNivel = { LISTA, lex, alto, nivelExacto, conteo, analizar, fueraEntrada };
})(typeof window !== 'undefined' ? window : globalThis);
