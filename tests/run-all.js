#!/usr/bin/env node
// Corre todas las suites y muestra una tabla: suite · comprobaciones · resultado.
//
//   node tests/run-all.js              todas
//   node tests/run-all.js ninos hsk    solo las que contienen alguno de esos textos en el nombre
//   node tests/run-all.js --list [filtro]  lista las suites (las que coinciden con el filtro) y qué necesita cada una
//   node tests/run-all.js --permitir-parciales   no falla (código 3) por suites parciales/omitidas
//   TIMEOUT_S=300 node tests/run-all.js   tope por suite (por defecto 900 s)
//
// Sin falsos verdes: una suite es VERDE solo si terminó con código 0, informó su cantidad de
// comprobaciones (> 0), no imprimió ningún fallo, mostró su marca de «todo bien» y NO declaró que
// salteó algo. Si falla, da timeout, se cae o no informa comprobaciones es ROJA.
//   · PARCIAL: la suite corrió bien pero salteó parte (imprime una línea «PARCIAL: motivo»).
//   · OMITIDA: no se pudo correr por una dependencia que falta (o imprime «OMITIDA: motivo»).
// Ninguna de las dos se muestra jamás como verde; el motivo queda en la tabla.
// Código de salida: 0 = todo verde · 1 = hay alguna ROJA · 3 = sin rojas pero con PARCIAL/OMITIDA
// (con --permitir-parciales, 3 pasa a 0: para uso explícito, p. ej. un CI sin OpenCC).
//
// Las suites de tests/*.test.js necesitan la app servida por HTTP: este script levanta un servidor
// estático local en un puerto libre y se lo pasa por BASE_URL. Las de tools/ levantan el suyo.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn, spawnSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..');
const TIMEOUT_MS = (Number(process.env.TIMEOUT_S) || 900) * 1000;

// Suites que ya vivían en tools/ (se quedan ahí). `needs`: lo que exigen además de Node.
const TOOLS = [
    { name: 'tools/check-undef', file: 'tools/check-undef.js', needs: 'eslint (npx)', cuenta: /(\d+) scripts revisados/ },
    { name: 'tools/check-ninos', file: 'tools/check-ninos.js', needs: 'Node', cuenta: /(\d+) lecciones/ },
    { name: 'tools/check-keywords', file: 'tools/check-keywords.js', needs: 'Node', cuenta: /(\d+) palabras clave/ },
    { name: 'tools/check-readings', file: 'tools/check-readings.js', needs: 'Playwright + Chromium + Python con «pip install opencc»', pre: 'opencc', cuenta: /(\d+) lecturas v2/ },
    { name: 'tools/test-classics-cq', file: 'tools/test-classics-cq.js', needs: 'Playwright + Chromium' },
    { name: 'tools/test-speak-es', file: 'tools/test-speak-es.js', needs: 'Playwright + Chromium' },
    { name: 'tools/test-dele-layout', file: 'tools/test-dele-layout.js', needs: 'Playwright + Chromium',
      parcialSi: env => env.SKIP_CONTRAST ? 'contraste omitido (SKIP_CONTRAST=1)' : '' },
    { name: 'tools/test-lecturas-ui', file: 'tools/test-lecturas-ui.js', needs: 'Playwright + Chromium' },
    { name: 'tools/test-lessons-listen', file: 'tools/test-lessons-listen.js', needs: 'Playwright + Chromium' }
];

// Suites conocidas como rotas o desactualizadas: se corren igual y se muestran con el motivo.
// (Una suite que figure acá y dé verde igual aparece verde: la nota es solo información.)
const NOTAS = {
    // 'nombre': 'motivo'
};

// Suites que no usan el navegador (necesitan otra cosa)
const NEEDS = { 'api-tts.test.js': 'Python 3 + fastapi (sin servidor, navegador ni red; edge-tts va simulado)' };

function suitesDeTests() {
    return fs.readdirSync(__dirname).filter(f => /\.test\.js$/.test(f)).sort().map(f => ({
        name: f.replace(/\.test\.js$/, ''), file: 'tests/' + f, needs: NEEDS[f] || 'servidor local (lo levanta run-all) + Playwright + Chromium', servidor: !NEEDS[f]
    }));
}

function servirEstatico() {
    const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
        '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.txt': 'text/plain; charset=utf-8' };
    const srv = http.createServer((req, res) => {
        let p = decodeURIComponent(req.url.split('?')[0]);
        if (p.endsWith('/')) p += 'index.html';
        const f = path.join(RAIZ, path.normalize(p));
        if (!f.startsWith(RAIZ + path.sep) && f !== RAIZ) { res.writeHead(403); return res.end(); }
        fs.readFile(f, (e, b) => {
            if (e) { res.writeHead(404); return res.end('no encontrado'); }
            res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
            res.end(b);
        });
    });
    return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

function tieneModuloPython(m) {
    const r = spawnSync(process.env.PYTHON || 'python3', ['-c', 'import ' + m], { encoding: 'utf8' });
    return r.status === 0;
}

// Interpreta la salida: { n: comprobaciones | null, falla: motivo | null, marca: true/false }
function analizar(salida, extra) {
    const txt = salida.replace(/\x1b\[[0-9;]*m/g, '');
    let n = null, marca = false, falla = null;
    let m;
    if (extra && extra.cuenta && (m = txt.match(extra.cuenta))) n = Number(m[1]);
    else if ((m = txt.match(/comprobaciones\s+(\d+)/i))) n = Number(m[1]);
    else if ((m = txt.match(/(\d+)\s+(?:comprobaciones|checks)/i))) n = Number(m[1]);
    if (n === null) {
        const pass = (txt.match(/^\s*(?:PASS|✓|✔|OK)\b/gm) || []).length;
        const fail = (txt.match(/^\s*(?:FAIL|✗|✘)\b/gm) || []).length;
        if (pass + fail > 0) n = pass + fail;
    }
    if (/FAILS?\s*[:=]?\s*0\b/.test(txt) || /FALLAS?:\s*0\b/.test(txt) || /TODO OK/.test(txt) || /todo en regla/.test(txt)
        || /sin variables sin definir nuevas/.test(txt)) marca = true;
    const malas = [];
    if ((m = txt.match(/FAILS?\s*[:=]?\s*([1-9]\d*)/))) malas.push('FAILS ' + m[1]);
    if ((m = txt.match(/FALLAS?:\s*([1-9]\d*)/))) malas.push('FALLAS ' + m[1]);
    const lineasFail = txt.split('\n').filter(l => /^\s*(?:FAIL|✗|✘|FALLO|ERROR)\b/.test(l));
    if (lineasFail.length) malas.push(lineasFail.length + ' línea(s) FAIL');
    if (/\b(?:TimeoutError|Unhandled|UnhandledPromiseRejection|Cannot find module)\b/.test(txt)) malas.push('excepción en la salida');
    if (malas.length) falla = malas.join(' · ');
    // Lo que la suite declara que salteó: «PARCIAL: motivo» / «OMITIDA: motivo» (una línea por motivo)
    const dec = { PARCIAL: [], OMITIDA: [] };
    for (const l of txt.split('\n')) {
        const mm = l.match(/^\s*(PARCIAL|OMITIDA)\s*[:—-]\s*(.+?)\s*$/);
        if (mm && !dec[mm[1]].includes(mm[2])) dec[mm[1]].push(mm[2]);
    }
    return { n, marca, falla, parcial: dec.PARCIAL, omitida: dec.OMITIDA };
}

function correr(s, env) {
    return new Promise(resolve => {
        const t0 = Date.now();
        let salida = '', vencio = false;
        const hijo = spawn(process.execPath, [path.join(RAIZ, s.file)], { cwd: env.SHOTS_DIR, env, stdio: ['ignore', 'pipe', 'pipe'] });
        hijo.stdout.on('data', d => { salida += d; });
        hijo.stderr.on('data', d => { salida += d; });
        const reloj = setTimeout(() => { vencio = true; hijo.kill('SIGKILL'); }, TIMEOUT_MS);
        hijo.on('error', e => { clearTimeout(reloj); resolve({ salida: String(e), codigo: -1, seg: 0, vencio }); });
        hijo.on('close', (codigo, senal) => {
            clearTimeout(reloj);
            resolve({ salida, codigo, senal, seg: (Date.now() - t0) / 1000, vencio });
        });
    });
}

function pad(t, n) { t = String(t); return t.length >= n ? t : t + ' '.repeat(n - t.length); }

(async () => {
    const args = process.argv.slice(2);
    let todas = suitesDeTests().concat(TOOLS);
    const filtros = args.filter(a => !a.startsWith('--'));
    if (filtros.length) todas = todas.filter(s => filtros.some(f => s.name.includes(f)));
    if (args.includes('--list')) {
        todas.forEach(s => console.log(pad(s.name, 30) + ' ' + pad(s.file, 48) + ' ' + s.needs + (NOTAS[s.name] ? '  [' + NOTAS[s.name] + ']' : '')));
        return;
    }
    if (!todas.length) { console.error('Ninguna suite coincide con: ' + filtros.join(' ')); process.exit(2); }

    let srv = null;
    const env = Object.assign({}, process.env, { SHOTS_DIR: process.env.SHOTS_DIR || path.join(os.tmpdir(), 'ac-tests') });
    if (todas.some(s => s.servidor)) {
        srv = await servirEstatico();
        env.BASE_URL = 'http://127.0.0.1:' + srv.address().port;
        console.log('Servidor local: ' + env.BASE_URL + ' · tope por suite: ' + TIMEOUT_MS / 1000 + ' s · salidas en ' + env.SHOTS_DIR + '\n');
    }

    fs.mkdirSync(env.SHOTS_DIR, { recursive: true }); // las suites corren desde acá: ninguna escritura relativa cae en el repo
    const filas = [];
    for (const s of todas) {
        process.stdout.write('… ' + s.name + ' ');
        let r;
        if (s.pre && !tieneModuloPython(s.pre)) {
            r = { estado: 'OMITIDA', n: null, nota: 'no se corrió: falta «pip install ' + s.pre + '» (sin eso no hay verificación de las lecturas)', seg: 0 };
        } else {
            const x = await correr(s, env);
            const a = analizar(x.salida, s);
            let estado = 'VERDE', nota = '';
            if (x.vencio) { estado = 'ROJO'; nota = 'TIMEOUT (' + TIMEOUT_MS / 1000 + ' s)'; }
            else if (x.codigo !== 0) { estado = 'ROJO'; nota = 'salió con código ' + (x.codigo === null ? x.senal : x.codigo) + (a.falla ? ' · ' + a.falla : ''); }
            else if (a.falla) { estado = 'ROJO'; nota = a.falla; }
            else if (a.omitida.length) { estado = 'OMITIDA'; nota = a.omitida.join(' · '); }
            else if (!a.n) { estado = 'ROJO'; nota = 'no informó comprobaciones (no se puede dar por verde)'; }
            else if (!a.marca) { estado = 'ROJO'; nota = 'no mostró su marca de «todo bien»'; }
            else {
                const motivos = a.parcial.slice();
                if (s.parcialSi && s.parcialSi(env)) motivos.push(s.parcialSi(env));
                if (motivos.length) { estado = 'PARCIAL'; nota = motivos.join(' · '); }
            }
            r = { estado, n: a.n, nota, seg: x.seg, cola: x.salida.trim().split('\n').slice(-12).join('\n') };
        }
        if (NOTAS[s.name]) r.nota = (r.nota ? r.nota + ' · ' : '') + 'NOTA: ' + NOTAS[s.name];
        filas.push(Object.assign({ s }, r));
        console.log(r.estado + ' (' + r.seg.toFixed(0) + ' s)');
    }
    if (srv) srv.close();

    const w = Math.max(5, ...filas.map(f => f.s.name.length));
    console.log('\n' + pad('SUITE', w) + '  ' + pad('COMPROBACIONES', 14) + '  RESULTADO');
    console.log('-'.repeat(w + 40));
    for (const f of filas) {
        const marca = { VERDE: '🟢 VERDE', PARCIAL: '🟡 PARCIAL', OMITIDA: '🟡 OMITIDA', ROJO: '🔴 ROJO' }[f.estado];
        console.log(pad(f.s.name, w) + '  ' + pad(f.n === null || f.n === undefined ? '—' : f.n, 14) + '  ' + marca + (f.nota ? ' — ' + f.nota : ''));
    }
    const cuenta = e => filas.filter(f => f.estado === e).length;
    const rojas = filas.filter(f => f.estado === 'ROJO');
    const total = filas.reduce((a, f) => a + (f.n || 0), 0);
    console.log('\n' + filas.length + ' suites · ' + total + ' comprobaciones · ' + cuenta('VERDE') + ' verdes · ' + cuenta('PARCIAL') + ' parciales · '
        + cuenta('OMITIDA') + ' omitidas · ' + rojas.length + ' rojas');
    if (!rojas.length && (cuenta('PARCIAL') || cuenta('OMITIDA'))) console.log('Sin rojas, pero NO es todo verde: hay suites parciales/omitidas (ver los motivos arriba).');
    for (const f of rojas) {
        console.log('\n--- ' + f.s.name + ' (' + f.s.file + ') — últimas líneas ---\n' + (f.cola || f.nota));
    }
    const incompletas = cuenta('PARCIAL') + cuenta('OMITIDA');
    process.exit(rojas.length ? 1 : (incompletas && !args.includes('--permitir-parciales') ? 3 : 0));
})();
