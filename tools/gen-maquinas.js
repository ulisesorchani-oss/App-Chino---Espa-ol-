#!/usr/bin/env node
// tools/gen-maquinas.js — genera docs/maquinas-de-estado.md a partir de las TABLAS que declara el código (state-machine.js + el módulo que las usa).
//   node tools/gen-maquinas.js            → escribe docs/maquinas-de-estado.md
//   node tools/gen-maquinas.js --check    → no escribe: sale con 1 si el archivo está desactualizado (lo usa tools/check-maquinas.js)
// Solo Node. Carga state-machine.js y lessons-listen.js en un sandbox de `vm` con `document.readyState = 'loading'` (el módulo no arranca solo) y lee
// window.AC_MACHINES (tablas) y window.LQ_LISTEN.cortes. Para sumar un módulo (Lector, Podcast): agregarlo a MODULOS.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const DOC = path.join(ROOT, 'docs', 'maquinas-de-estado.md');
const MODULOS = [
    { archivo: 'lessons-listen.js', titulo: '«Escuchar todo» (lecciones de aprendo chino)', oro: 'escuchar-todo-oro', cortes: (w) => (w.LQ_LISTEN && w.LQ_LISTEN.cortes) || [] },
    { archivo: 'reader.js', titulo: 'Lector de texto libre', oro: 'lector-oro', cortes: () => [] } // el único corte es stopReader() (8 llamadores en otros archivos: su firma no cambia)
];

function cargar(archivo, texto) { // → { maquinas, cortes } con el texto dado (las mutaciones de las pruebas lo usan)
    const w = { addEventListener() { }, navigator: {}, location: { href: '' } };
    const el = () => ({ addEventListener() { }, classList: { add() { }, remove() { }, contains() { return false; } }, querySelectorAll() { return []; }, appendChild() { } });
    const doc = { readyState: 'loading', addEventListener() { }, getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement: el, documentElement: el(), body: el() };
    // window es el objeto global del sandbox: `window.x` y `x` son lo mismo
    w.window = w; w.self = w; w.document = doc;
    const sandbox = vm.createContext(Object.assign(w, { console: { log() { }, warn() { }, error() { } }, setTimeout, clearTimeout, Promise, Map, Set, Date, Math, JSON, Array, Object, String, Number, Error, URL: {}, atob: () => '', Audio: function () { } }));
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'state-machine.js'), 'utf8'), sandbox, { filename: 'state-machine.js' });
    vm.runInContext(texto != null ? texto : fs.readFileSync(path.join(ROOT, archivo), 'utf8'), sandbox, { filename: archivo });
    const mods = MODULOS.find((m) => m.archivo === archivo);
    const maquinas = Object.keys(w.AC_MACHINES || {}).map((k) => w.AC_MACHINES[k].def);
    return { maquinas: maquinas, cortes: mods ? mods.cortes(w) : [], w: w };
}

const esc = (t) => String(t || '').replace(/\|/g, '\\|');
function seccion(maq) {
    const out = [];
    out.push('### ' + (maq.titulo || maq.name) + ' (`' + maq.name + '`)', '');
    if (maq.nota) out.push(maq.nota, '');
    out.push('Estados: ' + maq.states.map((s) => '`' + s + '`').join(', ') + ' · inicial: `' + maq.initial + '`', '');
    out.push('```mermaid', 'stateDiagram-v2', '    [*] --> ' + maq.initial);
    maq.rows.forEach((r) => r.from.forEach((f) => out.push('    ' + f + ' --> ' + r.to + ' : ' + r.ev + (r.known ? ' (conocida)' : ''))));
    out.push('```', '');
    out.push('| De | A | Evento | Estado de la fila | Qué es |', '|---|---|---|---|---|');
    maq.rows.forEach((r) => out.push('| ' + r.from.map((f) => '`' + f + '`').join(', ') + ' | `' + r.to + '` | `' + r.ev + '` | ' + (r.known ? '⚠️ **conocida** (' + esc(r.known) + ')' : 'declarada') + ' | ' + esc(r.nota) + ' |'));
    out.push('');
    if (maq.defectos && maq.defectos.length) {
        out.push('Defectos conocidos de esta máquina (no son transiciones; el oro los fija tal cual hasta que se arreglen):', '');
        maq.defectos.forEach((d) => out.push('- ⚠️ **' + d.id + '** — ' + esc(d.nota) + ' Escenario del oro: `' + d.escenario + '`.'));
        out.push('');
    }
    return out;
}
function generar(textos) { // textos: { 'lessons-listen.js': '…' } opcional (para las mutaciones)
    const L = [];
    L.push('# Máquinas de estado', '',
        '> **Generado por `tools/gen-maquinas.js` a partir de las tablas que declara el código. No se edita a mano:** `node tools/gen-maquinas.js` lo regenera y `tools/check-maquinas.js` falla si está desactualizado.', '',
        'Cada máquina es una tabla `from → to · evento` declarada con `acMachine(...)` (`state-machine.js`, compartido, sin dependencias). El estado solo cambia con `máquina.go(estado, evento)`; una asignación directa (`L.state = \'x\'`) la frena el chequeo estático.', '',
        '- **Modo estricto: SOLO en pruebas** (`window.AC_SM_STRICT = true`): una transición no declarada lanza. **En producción** se registra en `window.AC_SM_LOG` y se aplica igual.',
        '- Si `state-machine.js` no carga, el módulo usa una máquina de respaldo que asigna sin validar: la app suena igual, solo se pierde la validación.',
        '- Las filas **⚠️ conocida** son defectos de hoy declarados a propósito: describen lo que el código hace ahora (la prueba de oro por orden de eventos lo fija); arreglarlos es un cambio aparte.',
        '- Los tokens de cancelación (`L.tok`, `audioReqTok`, …) NO son estado: identifican «una corrida».', '');
    MODULOS.forEach((m) => {
        const c = cargar(m.archivo, textos && textos[m.archivo]);
        L.push('## ' + m.titulo, '', 'Archivo: `' + m.archivo + '` · prueba de oro: `tests/' + m.oro + '.test.js` (`tests/data/' + m.oro + '.json`).', '');
        c.maquinas.forEach((maq) => L.push.apply(L, seccion(maq)));
        if (c.cortes.length) {
            L.push('### Cortes (`stopAll(motivo)`)', '', 'Todo lo que para la escucha pasa por `stopAll(motivo)` con uno de estos motivos; cada uno lleva a `idle` / `libre` / `cerrado` con el evento `corte`.', '', '| Motivo | Qué lo dispara |', '|---|---|');
            c.cortes.forEach((x) => L.push('| `' + x.id + '` | ' + esc(x.nota) + ' |'));
            L.push('');
        }
    });
    return L.join('\n').replace(/\n+$/, '\n');
}
module.exports = { generar, cargar, DOC, MODULOS };
if (require.main === module) {
    const txt = generar();
    if (process.argv.includes('--check')) {
        const act = fs.existsSync(DOC) ? fs.readFileSync(DOC, 'utf8') : '';
        if (act !== txt) { console.error('docs/maquinas-de-estado.md está desactualizado: corré «node tools/gen-maquinas.js».'); process.exit(1); }
        console.log('docs/maquinas-de-estado.md al día');
    } else { fs.mkdirSync(path.dirname(DOC), { recursive: true }); fs.writeFileSync(DOC, txt); console.log('escrito ' + path.relative(ROOT, DOC) + ' (' + txt.split('\n').length + ' líneas)'); }
}
