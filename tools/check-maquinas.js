#!/usr/bin/env node
// tools/check-maquinas.js — chequeo ESTÁTICO de las máquinas de estado (solo Node, sin navegador).
//   node tools/check-maquinas.js        → resumen + código de salida 1 si algo falla
// Reglas (por módulo de MODULOS en tools/gen-maquinas.js):
//   1. ninguna asignación directa a un campo de estado (L.state = 'x', L.waiting = …, L.tripped = …): el estado solo cambia con MAQUINA.go(estado, evento)
//   2. cada MAQUINA.go('a', 'ev') con literales corresponde a una fila declarada (a, ev) de ESA máquina (el origen lo valida el modo estricto en las pruebas)
//   3. cada fila declarada NO «conocida» se emite en el código (un go con ese destino y ese evento, o con evento dinámico hacia ese destino)
//   4. cada stopAll('motivo') del código está en la tabla de cortes, y cada corte de la tabla tiene su stopAll('motivo')
//   5. docs/maquinas-de-estado.md está al día (tools/gen-maquinas.js --check)
// `revisar(texto)` se exporta: tests/escuchar-todo-mutaciones.test.js lo corre sobre código MUTADO y exige que falle.
const fs = require('fs'), path = require('path');
const { cargar, generar, DOC, MODULOS } = require('./gen-maquinas');
const ROOT = path.resolve(__dirname, '..');
// Por módulo: la variable de cada máquina (en el código) y los campos de estado que NO se asignan a mano.
const CONFIG = {
    'lessons-listen.js': { maquinas: { REPRO: 'escuchar.reproduccion', ESPERA: 'escuchar.espera', CIRCUITO: 'escuchar.circuito' }, objeto: 'L', campos: ['state', 'waiting', 'tripped'], stop: 'stopAll' },
    // reader.js: variables globales sueltas (no un objeto). stopReader() no recibe motivo: no hay tabla de cortes; sus filas 'corte' se verifican como cualquier fila emitida
    // podcast.js: variable local de un IIFE (pState); stopAll() no recibe motivo: sus filas 'corte' se verifican como cualquier fila emitida
    'podcast.js': { maquinas: { PD: 'podcast.reproduccion' }, variables: ['pState'] },
    'reader.js': { maquinas: { READER_REPRO: 'lector.reproduccion', READER_ESPERA: 'lector.espera', READER_MOTOR: 'lector.motor' }, variables: ['readerPlayState', 'readerActiveEngine'] }
};
// Quita comentarios (// y /* */) conservando el largo de las líneas; respeta los literales de cadena.
function sinComentarios(t) {
    let o = '', i = 0, q = null;
    while (i < t.length) {
        const c = t[i], n = t[i + 1];
        if (q) { o += c; if (c === '\\') { o += n || ''; i += 2; continue; } if (c === q) q = null; i++; continue; }
        if (c === '\'' || c === '"' || c === '`') { q = c; o += c; i++; continue; }
        if (c === '/' && n === '/') { while (i < t.length && t[i] !== '\n') i++; continue; }
        if (c === '/' && n === '*') { i += 2; while (i < t.length && !(t[i] === '*' && t[i + 1] === '/')) { o += t[i] === '\n' ? '\n' : ' '; i++; } i += 2; continue; }
        o += c; i++;
    }
    return o;
}
function revisar(archivo, texto, docs) { // → { errores: [], resumen: {…} }
    const E = [], cfg = CONFIG[archivo];
    texto = texto != null ? texto : fs.readFileSync(path.join(ROOT, archivo), 'utf8');
    const codigo = sinComentarios(texto);
    let c;
    try { c = cargar(archivo, texto); } catch (e) { return { errores: ['el módulo no carga en el sandbox: ' + e.message], resumen: {} }; }
    // 1) asignaciones directas
    const campos = (cfg.campos || []).map((c) => cfg.objeto + '\\.' + c).concat(cfg.variables || []);
    const ra = new RegExp('\\b(' + campos.join('|') + ')\\s*(=(?!=)|\\+=|-=|\\|\\|=|&&=)', 'g');
    let m, directas = 0;
    while ((m = ra.exec(codigo))) { directas++; E.push('asignación directa «' + m[1].replace(/\\/g, '') + ' = …» (línea ' + (codigo.slice(0, m.index).split('\n').length) + '): usá MAQUINA.go(estado, evento)'); }
    // 2) go() literales ↔ filas
    const filas = {}; c.maquinas.forEach((mq) => { filas[mq.name] = mq.rows; });
    const usados = {}; let literales = 0;
    Object.keys(cfg.maquinas).forEach((v) => {
        const nombre = cfg.maquinas[v], rows = filas[nombre];
        if (!rows) { E.push('la máquina «' + nombre + '» (' + v + ') no se declaró'); return; }
        const re = new RegExp('\\b' + v + '\\.go\\(\\s*\'([^\']+)\'\\s*(?:,\\s*(\'[^\']*\'|[A-Za-z_$][\\w$]*))?\\s*\\)', 'g');
        let g;
        while ((g = re.exec(codigo))) {
            literales++;
            const to = g[1], ev = g[2] && g[2][0] === '\'' ? g[2].slice(1, -1) : null; // null = evento dinámico
            usados[nombre + '>' + to + '@' + (ev == null ? '*' : ev)] = 1;
            if (ev != null && !rows.some((r) => r.to === to && r.ev === ev)) E.push(v + '.go(\'' + to + '\', \'' + ev + '\') no tiene fila declarada en «' + nombre + '»');
            if (ev == null && !rows.some((r) => r.to === to)) E.push(v + '.go(\'' + to + '\', …) no tiene ninguna fila con ese destino en «' + nombre + '»');
            if (g[2] == null) E.push(v + '.go(\'' + to + '\') sin evento: toda transición lleva su evento');
        }
        // 3) filas sin emisor
        rows.forEach((r) => {
            if (r.known) return;
            const emitida = usados[nombre + '>' + r.to + '@' + r.ev] || usados[nombre + '>' + r.to + '@*'];
            if (!emitida) E.push('la fila ' + r.from.join('|') + ' → ' + r.to + ' (' + r.ev + ') de «' + nombre + '» no se emite en ningún lado (¿sobra o falta el código?)');
        });
    });
    // 4) cortes
    const re4 = new RegExp('\\b' + (cfg.stop || 'nuncaHayCorte') + '\\(\\s*\'([^\']+)\'\\s*\\)', 'g');
    const deCodigo = new Set(); let s;
    while (cfg.stop && (s = re4.exec(codigo))) deCodigo.add(s[1]);
    const tabla = new Set(c.cortes.map((x) => x.id));
    deCodigo.forEach((id) => { if (!tabla.has(id)) E.push('stopAll(\'' + id + '\') no está en la tabla de cortes'); });
    tabla.forEach((id) => { if (!deCodigo.has(id)) E.push('el corte «' + id + '» está en la tabla pero ningún stopAll(\'' + id + '\') lo dispara (¿se saltearon el corte?)'); });
    return { errores: E, resumen: { maquinas: c.maquinas.length, filas: c.maquinas.reduce((a, x) => a + x.rows.length, 0), conocidas: c.maquinas.reduce((a, x) => a + x.rows.filter((r) => r.known).length, 0), go: literales, cortes: tabla.size, directas: directas } };
}
module.exports = { revisar, sinComentarios, CONFIG };
if (require.main === module) {
    let malos = 0, tot = { maquinas: 0, filas: 0, conocidas: 0, go: 0, cortes: 0 };
    MODULOS.forEach((md) => {
        const r = revisar(md.archivo);
        Object.keys(tot).forEach((k) => { tot[k] += r.resumen[k] || 0; });
        if (r.errores.length) { malos += r.errores.length; console.error('✗ ' + md.archivo); r.errores.forEach((e) => console.error('  - ' + e)); } else console.log('✓ ' + md.archivo + ': ' + r.resumen.maquinas + ' máquinas · ' + r.resumen.filas + ' filas (' + r.resumen.conocidas + ' conocidas) · ' + r.resumen.go + ' go() · ' + r.resumen.cortes + ' cortes · 0 asignaciones directas');
    });
    const act = fs.existsSync(DOC) ? fs.readFileSync(DOC, 'utf8') : '';
    if (act !== generar()) { malos++; console.error('✗ docs/maquinas-de-estado.md está desactualizado: corré «node tools/gen-maquinas.js»'); } else console.log('✓ docs/maquinas-de-estado.md al día');
    console.log(tot.maquinas + ' máquinas · ' + tot.filas + ' filas · ' + tot.go + ' go() · ' + tot.cortes + ' cortes');
    console.log(malos ? '\nFALLAS: ' + malos : '\nTODO OK');
    process.exit(malos ? 1 : 0);
}
