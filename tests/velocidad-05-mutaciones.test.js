// Mutaciones de la velocidad 0.5: se ROMPE a propósito audio-tts.js (en un archivo temporal que velocidad-05.test.js sirve con page.route) y se exige que
// velocidad-05 se ponga ROJA. Si una mutación pasa en verde, la suite no está mirando el 0.5.
//   M0 control: audio-tts.js SIN mutar            → velocidad-05 VERDE (si no, las mutaciones no prueban nada)
//   M1 sacar 0.5 de SPEED_STEPS                   → ROJA
//   M2 sacar la etiqueta '0.5' de SPEED_LABELS    → ROJA (el botón diría «undefined»)
//   M3 volver al orden viejo [0.85, 1, 0.7] + 0.5 al final, o sea sin reordenar → ROJA
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

const ORIG = fs.readFileSync(path.join(ROOT, 'audio-tts.js'), 'utf8');
function mutar(desde, hacia) {
    const k = ORIG.split(desde).length - 1;
    if (k !== 1) throw new Error('la mutación no aplica una sola vez (' + k + '): «' + desde.slice(0, 60) + '»');
    return ORIG.replace(desde, hacia);
}
const PASOS = 'const SPEED_STEPS = [1, 0.85, 0.7, 0.5];';
const ETIQ = ", '0.5': '🐌 0.5x' };";
const MUT = {
    sinPaso: mutar(PASOS, 'const SPEED_STEPS = [1, 0.85, 0.7];'),
    sinEtiqueta: mutar(ETIQ, ' };'),
    ordenViejo: mutar(PASOS, 'const SPEED_STEPS = [0.85, 1, 0.7, 0.5];')
};
function correr(src, etiqueta) {
    const f = path.join(os.tmpdir(), 'vel05-' + process.pid + '-' + etiqueta + '.js');
    fs.writeFileSync(f, src);
    const r = spawnSync(process.execPath, [path.join(__dirname, 'velocidad-05.test.js')], { env: Object.assign({}, process.env, { VEL_MUTADO: f }), encoding: 'utf8', timeout: 240000 });
    try { fs.unlinkSync(f); } catch (e) { /* noop */ }
    const out = (r.stdout || '') + (r.stderr || '');
    return { code: r.status, rojas: out.split('\n').filter(l => /^FAIL/.test(l)).length, verde: /TODO OK/.test(out) };
}
ok(ORIG.indexOf(PASOS) > 0 && ORIG.indexOf(ETIQ) > 0, 'audio-tts.js trae el ciclo [1, 0.85, 0.7, 0.5] y la etiqueta de 0.5');
let r = correr(ORIG, 'control');
ok(r.code === 0 && r.verde && r.rojas === 0, 'M0 control: con audio-tts.js sin mutar velocidad-05 sale VERDE (' + r.rojas + ' rojas)');
r = correr(MUT.sinPaso, 'sinpaso');
ok(r.code !== 0 && r.rojas > 0, 'M1 sacar 0.5 de SPEED_STEPS: velocidad-05 se pone ROJA (' + r.rojas + ' comprobaciones rojas)');
r = correr(MUT.sinEtiqueta, 'sinetiqueta');
ok(r.code !== 0 && r.rojas > 0, 'M2 sacar la etiqueta de 0.5: velocidad-05 se pone ROJA (' + r.rojas + ' comprobaciones rojas)');
r = correr(MUT.ordenViejo, 'ordenviejo');
ok(r.code !== 0 && r.rojas > 0, 'M3 orden sin reordenar [0.85, 1, 0.7, 0.5]: velocidad-05 se pone ROJA (' + r.rojas + ' comprobaciones rojas)');

console.log('\n' + n + ' comprobaciones');
console.log(fails ? '\n' + fails + ' FALLAS' : '\nTODO OK');
process.exit(fails ? 1 : 0);
