// Mutaciones del Lector: se ROMPE a propósito reader.js (en memoria; se sirve el mutado con page.route) y se exige que las defensas lo noten.
//   M1 sacar una fila de la tabla        → estático: el go() queda sin fila · estricto: lanza/registra · producción: la traza sigue IDÉNTICA pero AC_SM_LOG no queda vacío
//   M2 asignación directa (readerPlayState = …) → estático: la marca · navegador: el escenario de pausa falla (la variable es solo de lectura)
//   M3 saltear el reinicio de stopReader() (el «corte») → estático: la fila `corte` ya no se emite · navegador: la traza del oro cambia
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { revisar } = require('../tools/check-maquinas');
const ROOT = path.resolve(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

const ORIG = fs.readFileSync(path.join(ROOT, 'reader.js'), 'utf8');
function mutar(desde, hacia) {
    const k = ORIG.split(desde).length - 1;
    if (k !== 1) throw new Error('la mutación no aplica una sola vez (' + k + '): «' + desde.slice(0, 60) + '»');
    return ORIG.replace(desde, hacia);
}
const FILA = "        { from: 'idle', to: 'playing', ev: 'leer', nota: '🔊 Leer: arranca una lectura nueva' },\n";
const MUT = {
    fila: mutar(FILA, ''),
    directa: mutar("READER_REPRO.go('paused', 'pausa');", "readerPlayState = 'paused';"),
    corte: mutar("    READER_REPRO.go('idle', 'corte');\n", '')
};
const base = revisar('reader.js', ORIG);
ok(base.errores.length === 0, 'el código real pasa el chequeo estático (' + base.errores.length + ' errores)');

// ───────── estático ─────────
const r1 = revisar('reader.js', MUT.fila);
ok(r1.errores.some((e) => /sin fila|no tiene fila|ninguna fila/.test(e)), 'M1 (sacar la fila idle→playing): el chequeo estático la nota → ' + (r1.errores[0] || '—'));
const r2 = revisar('reader.js', MUT.directa);
ok(r2.errores.some((e) => /asignación directa/.test(e)), 'M2 (readerPlayState = \'paused\'): el chequeo estático marca la asignación directa → ' + (r2.errores[0] || '—'));
const r3 = revisar('reader.js', MUT.corte);
ok(r3.errores.some((e) => /corte/.test(e)), 'M3 (stopReader sin su reinicio de reproducción): el chequeo estático nota que la fila «corte» ya no se emite → ' + (r3.errores[0] || '—'));

// ───────── navegador (el oro por orden de eventos, con el archivo mutado) ─────────
function correrOro(mutado, solo, extra) {
    const f = path.join(os.tmpdir(), 'rd-mutado-' + process.pid + '-' + solo + '.js');
    fs.writeFileSync(f, mutado);
    const r = spawnSync(process.execPath, [path.join(__dirname, 'lector-oro.test.js')], { env: Object.assign({}, process.env, { LL_MUTADO: f, SOLO: solo }, extra || {}), encoding: 'utf8', timeout: 240000 });
    try { fs.unlinkSync(f); } catch (e) { /* noop */ }
    return { out: (r.stdout || '') + (r.stderr || ''), code: r.status };
}
const linea = (out, re) => out.split('\n').filter((l) => re.test(l));
let b = correrOro(MUT.fila, 'sano');
ok(b.code !== 0 && linea(b.out, /^FAIL/).length > 0, 'M1 estricto: con la fila sacada la prueba de oro FALLA (' + linea(b.out, /^FAIL/).length + ' comprobaciones rojas)');
b = correrOro(MUT.fila, 'sano', { NOSTRICT: '1' });
ok(linea(b.out, /^PASS .*traza por orden de eventos es IDÉNTICA/).length === 1, 'M1 producción: sin el modo estricto la traza sigue IDÉNTICA al oro (la transición no declarada se aplica igual)');
ok(linea(b.out, /^FAIL .*ninguna transición sin declarar/).length === 1, 'M1 producción: …pero AC_SM_LOG NO queda vacío (la transición no declarada se registró)');
b = correrOro(MUT.directa, 'pausa-seguir-parar');
ok(b.code !== 0 && linea(b.out, /^FAIL/).length > 0, 'M2 navegador: con readerPlayState asignado a mano el escenario de pausa FALLA');
b = correrOro(MUT.corte, 'corte-stopReader');
ok(linea(b.out, /^FAIL .*traza por orden de eventos es IDÉNTICA/).length === 1, 'M3 navegador: sin el reinicio del corte la traza del oro CAMBIA');

console.log('\n' + n + ' comprobaciones');
console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
process.exit(fails ? 1 : 0);
