#!/usr/bin/env node
// Corre la batería en N partes A LA VEZ en esta máquina: N procesos `node tests/run-all.js --shard=i/N`, cada uno con su
// propia carpeta de salidas (SHOTS_DIR/parte-i). No cambia run-all.js ni las suites: cada parte es una corrida normal.
//   node tests/run-paralelo.js                       4 partes
//   PARTES=2 node tests/run-paralelo.js              2 partes
//   node tests/run-paralelo.js --permitir-parciales  (las demás opciones pasan tal cual a cada run-all)
// Por qué no chocan: cada run-all levanta su servidor en un puerto libre (listen(0)), las suites de tools/ también, cada
// contexto de Playwright es nuevo (localStorage e IndexedDB vacíos, sin perfiles persistentes) y los archivos temporales
// llevan el pid. La batería espera más de lo que calcula (CPU ociosa la mayor parte del tiempo), así que las partes se
// solapan bien.
// Muestra la tabla unida (mismo formato que run-all, ordenada como la lista completa) y el tiempo real.
// Código de salida: 1 si alguna parte tuvo una roja; si no, 3 si alguna dio 3; si no, 0.
'use strict';
const { spawn } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');
const RAIZ = path.resolve(__dirname, '..');
const N = Math.max(1, parseInt(process.env.PARTES || '4', 10));
const args = process.argv.slice(2).filter(a => !a.startsWith('--shard'));
const BASE = process.env.SHOTS_DIR || path.join(os.tmpdir(), 'ac-tests');
const t0 = Date.now();
console.log('Batería en ' + N + ' partes a la vez · salidas en ' + BASE + '/parte-i');

function parte(i) {
    return new Promise(ok => {
        const env = Object.assign({}, process.env, { SHOTS_DIR: path.join(BASE, 'parte-' + i) });
        fs.mkdirSync(env.SHOTS_DIR, { recursive: true });
        let salida = '';
        const h = spawn(process.execPath, [path.join(__dirname, 'run-all.js'), '--shard=' + i + '/' + N].concat(args), { cwd: RAIZ, env, stdio: ['ignore', 'pipe', 'pipe'] });
        h.stdout.on('data', d => { salida += d; });
        h.stderr.on('data', d => { salida += d; });
        h.on('close', codigo => {
            const seg = (Date.now() - t0) / 1000;
            try { fs.writeFileSync(path.join(env.SHOTS_DIR, 'salida.txt'), salida); } catch (e) { /* sin disco: solo se pierde la copia */ }
            console.log('  parte ' + i + ' terminó en ' + (seg / 60).toFixed(1) + ' min (código ' + codigo + ')');
            ok({ i, codigo, salida, seg });
        });
    });
}

(async () => {
    const R = await Promise.all(Array.from({ length: N }, (_, k) => parte(k + 1)));
    // filas de la tabla de cada parte (desde «SUITE» hasta la línea en blanco) y las líneas red-local de cada suite
    const filas = [], red = [];
    for (const r of R) {
        const L = r.salida.split('\n');
        const a = L.findIndex(l => /^SUITE\s/.test(l));
        if (a < 0) { console.log('\n--- parte ' + r.i + ': sin tabla (¿se cayó?) — últimas líneas ---\n' + L.slice(-15).join('\n')); continue; }
        for (let k = a + 2; k < L.length && L[k].trim(); k++) filas.push(L[k]);
        L.forEach((l, k) => { if (/^\s+red-local:/.test(l)) red.push((L[k - 1] || '').replace(/^… /, '').split(' ')[0] + ' → ' + l.trim().replace(/^red-local: /, '')); });
        const cola = L.filter(l => /^--- /.test(l));
        if (cola.length) console.log('\nparte ' + r.i + ': ' + cola.join(' · '));
    }
    const orden = new Map();
    const lista = require('child_process').execFileSync(process.execPath, [path.join(__dirname, 'run-all.js'), '--list'], { cwd: RAIZ, encoding: 'utf8' });
    lista.split('\n').forEach((l, k) => { const n = l.split(/\s+/)[0]; if (n) orden.set(n, k); });
    filas.sort((x, y) => (orden.get(x.split(/\s+/)[0]) ?? 1e9) - (orden.get(y.split(/\s+/)[0]) ?? 1e9));
    console.log('\nSUITE (todas las partes)\n' + '-'.repeat(60));
    filas.forEach(f => console.log(f));
    const cuenta = (re) => filas.filter(f => re.test(f)).length;
    const comp = filas.reduce((s, f) => { const m = f.match(/^\S+\s+(\d+)\s/); return s + (m ? +m[1] : 0); }, 0);
    console.log('\n' + filas.length + ' suites · ' + comp + ' comprobaciones · ' + cuenta(/🟢 VERDE/) + ' verdes · ' + cuenta(/🟡 PARCIAL/) + ' parciales · ' +
        cuenta(/🟡 OMITIDA/) + ' omitidas · ' + cuenta(/🔴 ROJO/) + ' rojas');
    if (red.length) console.log('\nRed del navegador (por suite):\n' + red.map(x => '  ' + x).join('\n'));
    // tiempos por suite («… nombre ESTADO (N s)» de cada run-all): las 10 más lentas
    const tiempos = [];
    R.forEach(r => { for (const m of r.salida.matchAll(/^… (\S+) [A-ZÁÉÍÓÚ]+ \((\d+) s\)/gm)) tiempos.push([m[1], +m[2], r.i]); });
    tiempos.sort((x, y) => y[1] - x[1]);
    if (tiempos.length) console.log('\nLas 10 más lentas:\n' + tiempos.slice(0, 10).map(([n, s, i]) => '  ' + n + ' ' + s + ' s (parte ' + i + ')').join('\n') +
        '\nSuma de los tiempos por suite: ' + (tiempos.reduce((a, x) => a + x[1], 0) / 60).toFixed(1) + ' min · salida de cada parte en ' + BASE + '/parte-i/salida.txt');
    console.log('\nTiempo real: ' + ((Date.now() - t0) / 60000).toFixed(1) + ' min');
    const cods = R.map(r => r.codigo);
    process.exit(cods.includes(1) || cods.some(c => c !== 0 && c !== 3) ? 1 : (cods.includes(3) ? 3 : 0));
})();
