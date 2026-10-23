// api/index.py y api/tts.py con edge-tts SIMULADO: reintentos, semáforo, errores, registro y que los dos
// archivos no diverjan. No usa navegador, servidor ni red; necesita Python 3 + fastapi (NO edge-tts).
// Corre tests/api-tts/test_api_tts.py (unittest) y lo traduce al formato de run-all.
const { spawnSync } = require('child_process');
const path = require('path');
const PY = process.env.PYTHON || 'python3';
const dir = path.join(__dirname, 'api-tts');
const env = Object.assign({}, process.env, { PYTHONDONTWRITEBYTECODE: '1' });

const dep = spawnSync(PY, ['-c', 'import fastapi, starlette'], { encoding: 'utf8', env });
if (dep.error || dep.status !== 0) {
    console.log('OMITIDA: falta ' + (dep.error ? PY : 'fastapi (pip install fastapi)') + ': las pruebas de api/*.py no corrieron');
    process.exit(0);
}
const r = spawnSync(PY, ['-I', '-m', 'unittest', 'discover', '-s', dir, '-t', dir], { encoding: 'utf8', env: Object.assign({}, env, { PYTHONPATH: dir }) });
const salida = (r.stdout || '') + (r.stderr || '');
const ran = (salida.match(/Ran (\d+) tests?/) || [])[1];
const f = (salida.match(/failures=(\d+)/) || [])[1];
const e = (salida.match(/errors=(\d+)/) || [])[1];
const fails = Number(f || 0) + Number(e || 0);
if (!ran) { console.log(salida.trim().split('\n').slice(-15).join('\n')); console.log('FAIL: no se pudo correr unittest'); process.exit(1); }
if (r.status !== 0 || fails) {
    console.log(salida.split('\n').filter(l => /^(FAIL|ERROR|AssertionError|Traceback)|Error:/.test(l)).join('\n'));
    console.log('FAIL: unittest');
}
console.log('comprobaciones ' + ran + ' · FAILS ' + (fails || (r.status !== 0 ? 1 : 0)));
process.exit(r.status === 0 && !fails ? 0 : 1);
