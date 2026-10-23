// Entorno común de las suites con navegador (Playwright + Chromium).
//   BASE_URL   dirección donde se sirve la app (la pone tests/run-all.js; a mano: BASE_URL=http://localhost:8960)
//   CHROMIUM   ruta del ejecutable de Chromium (opcional)
//   SHOTS_DIR  carpeta de capturas y archivos de salida (por defecto, la carpeta temporal del sistema: nada se escribe en el repo)
const fs = require('fs');
const os = require('os');
const path = require('path');

function cargarPlaywright() {
    const rutas = ['playwright', '/opt/node22/lib/node_modules/playwright'];
    for (const r of rutas) { try { return require(r); } catch (e) { /* siguiente */ } }
    console.error('No se encontró Playwright. Instalalo con «npm i -D playwright» o apuntá NODE_PATH a su carpeta.');
    process.exit(2);
}

function buscarChromium() {
    if (process.env.CHROMIUM) return process.env.CHROMIUM;
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    try {
        const d = fs.readdirSync(base).filter(n => /^chromium-\d+$/.test(n)).sort().pop();
        const p = d && path.join(base, d, 'chrome-linux', 'chrome');
        if (p && fs.existsSync(p)) return p;
    } catch (e) { /* sin carpeta: Playwright usa el suyo */ }
    return undefined;
}

const BASE = (process.env.BASE_URL || '').replace(/\/+$/, '');
if (!BASE) {
    console.error('Falta BASE_URL (ej.: BASE_URL=http://localhost:8960). tests/run-all.js la define solo.');
    process.exit(2);
}

const exe = buscarChromium();
const LAUNCH = exe ? { executablePath: exe } : {};

function shots(nombre) {
    const d = path.join(process.env.SHOTS_DIR || path.join(os.tmpdir(), 'ac-tests'), nombre);
    fs.mkdirSync(d, { recursive: true });
    return d + '/';
}

module.exports = { chromium: cargarPlaywright().chromium, LAUNCH, BASE, APP_URL: BASE + '/index.html', shots };
