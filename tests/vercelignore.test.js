// .vercelignore no puede dejar fuera NADA que la app o sw.js carguen.
// Junta, de cuatro fuentes, todo lo que se publica "con uso":
//   1. el PRECACHE de sw.js;
//   2. lo que referencia el código: index.html (scripts, estilos, íconos), manifest.json, cargas perezosas
//      (pinyin-tocfl, hanzi-writer, pitch-analyzer, html2canvas, jsPDF…) y cualquier cadena de la app que sea una ruta de archivo del repo;
//   3. lo que el navegador REALMENTE pide al recorrer todas las vistas, pestañas y ventanas;
//   4. la función de voz (api/, requirements.txt, vercel.json) y /.well-known/assetlinks.json.
// y lo compara con las reglas de .vercelignore (se evalúan con el motor de patrones de git: la sintaxis es la de .gitignore).
// Además: el respaldo `DATA_SOURCES` de app.js (data/…) solo se usa si un módulo NO viene embebido: se comprueba que todos vienen embebidos.
// Sin git, sale OMITIDA.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium, LAUNCH, BASE, APP_URL } = require('./lib/env');

const ROOT = path.resolve(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };

try { execFileSync('git', ['--version'], { stdio: 'ignore' }); } catch (e) { console.log('OMITIDA: falta git (se usa para evaluar las reglas de .vercelignore)'); process.exit(0); }

const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean);
const trackedSet = new Set(tracked);

// ── motor de reglas: un repo temporal cuyo .gitignore ES el .vercelignore (sin mezclar el .gitignore real) ──
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vi-'));
execFileSync('git', ['init', '-q', tmp]);
fs.copyFileSync(path.join(ROOT, '.vercelignore'), path.join(tmp, '.gitignore'));
function ignorados(paths) {
    const uniq = Array.from(new Set(paths));
    if (!uniq.length) return new Set();
    let out = '';
    try { out = execFileSync('git', ['check-ignore', '--no-index', '-z', '--stdin'], { cwd: tmp, input: uniq.join('\0'), encoding: 'utf8' }); }
    catch (e) { out = e.status === 1 ? '' : (() => { throw e; })(); } // status 1 = ninguno ignorado
    return new Set(out.split('\0').filter(Boolean));
}

// ── 1. PRECACHE de sw.js ──
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const pre = (sw.match(/const PRECACHE = \[([\s\S]*?)\];/) || [])[1] || '';
const precache = Array.from(pre.matchAll(/'\.\/([^']*)'/g)).map(m => m[1] || 'index.html');
ok(precache.length >= 50, 'PRECACHE: se leyeron ' + precache.length + ' archivos de sw.js');
const faltan = precache.filter(f => !trackedSet.has(f));
ok(faltan.length === 0, 'PRECACHE: todo archivo del precaché existe en el repo ' + JSON.stringify(faltan));

// ── 2. referencias del código (estático) ──
const refs = new Map(); // ruta → de dónde viene
const add = (p, from) => { p = p.replace(/^\.\//, '').replace(/^\//, '').split(/[?#]/)[0]; if (p && trackedSet.has(p) && !refs.has(p)) refs.set(p, from); };
const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const m of idx.matchAll(/\b(?:src|href)=["']([^"':]+)["']/g)) add(m[1], 'index.html');
const man = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
(man.icons || []).forEach(i => add(i.src, 'manifest.json'));
add(man.start_url || '', 'manifest.json');
const appFiles = tracked.filter(f => /^[^/]+\.(js|css|html|json)$/.test(f) && f !== 'package-lock.json');
const EXT = '(?:js|css|json|png|svg|ico|jpg|jpeg|webp|gif|woff2?|ttf|mp3|wav|ogg|webmanifest|txt|html|wasm|onnx)';
const reLit = new RegExp('[\'"`]((?:\\./)?[A-Za-z0-9_][A-Za-z0-9_./-]*\\.' + EXT + ')(?:\\?[^\'"`]*)?[\'"`]', 'g');
for (const f of appFiles) {
    if (/^(data-embedded|dict-mini|dict)\.js$/.test(f)) continue; // datos: cadenas chinas/españolas, no rutas
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of src.matchAll(reLit)) add(m[1], f);
}
// servidor y configuración que Vercel necesita
['api/index.py', 'api/tts.py', 'requirements.txt', 'vercel.json', '.well-known/assetlinks.json', 'sw.js', 'index.html', 'manifest.json'].forEach(f => add(f, 'configuración de Vercel / PWA'));

(async () => {
    // ── 3. lo que el navegador pide al recorrer todo ──
    const b = await chromium.launch({ ...LAUNCH });
    const ctx = await b.newContext({ viewport: { width: 400, height: 800 }, serviceWorkers: 'block' });
    await ctx.addInitScript(() => { try { localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('ac_seen_modsheet', '1'); } catch (e) { /* noop */ } });
    const page = await ctx.newPage();
    const pedidos = new Map(), errs = [], no200 = [];
    const origen = new URL(BASE).origin;
    page.on('pageerror', e => errs.push(String(e)));
    page.on('response', (r) => {
        const u = new URL(r.url());
        if (u.origin !== origen) return;
        const p = decodeURIComponent(u.pathname).replace(/^\//, '') || 'index.html';
        pedidos.set(p, true);
        if (r.status() >= 400) no200.push(p + ' → ' + r.status());
    });
    const sleep = (ms) => page.waitForTimeout(ms);
    const intenta = async (f) => { try { await f(); } catch (e) { /* una vista que no abre no invalida el resto */ } };

    await page.goto(APP_URL, { waitUntil: 'load' }); await sleep(1500);
    const views = await page.evaluate(() => (typeof APP_VIEWS !== 'undefined' ? APP_VIEWS.slice() : []));
    ok(views.length >= 4, 'recorrido: se encontraron las vistas de la app (' + views.join(', ') + ')');
    for (const v of views) {
        await intenta(() => page.evaluate((v) => showView(v), v)); await sleep(350);
        if (v === 'aprender') {
            for (const t of ['lessons', 'daily', 'exams', 'classics', 'personal']) { await intenta(() => page.click('#tab-' + t, { timeout: 2000 })); await sleep(300); }
            await intenta(() => page.click('#tab-lessons', { timeout: 2000 })); await sleep(300);
        }
    }
    // ventanas (se abren por su botón o, si no hay, mostrándolas): cada una carga lo suyo
    await intenta(() => page.evaluate(() => { showView('aprender'); }));
    for (const pop of ['srs-pop', 'placement-pop', 'podcast-pop', 'mp-pop', 'talk-pop', 'write-pop', 'personal-pop', 'backup-pop', 'vocab-pop', 'tone-legend-pop', 'exam-pop', 'daily-story-pop', 'cread-pop', 'lesson-pop']) {
        await intenta(() => page.evaluate((id) => { const e = document.getElementById(id); if (e) e.classList.remove('hidden'); }, pop)); await sleep(120);
        await intenta(() => page.evaluate((id) => { const e = document.getElementById(id); if (e) e.classList.add('hidden'); }, pop));
    }
    // lecciones, lecturas, DELE, Niños y clásicos: abrir una de cada tipo
    await intenta(async () => {
        await page.evaluate(() => { showView('aprender'); const w = document.getElementById('lesson-list'); if (w) w.dataset.level = '1'; });
        await sleep(300);
        const id = await page.evaluate(() => (GRADED_LESSONS.find(l => l.hsk === 1 && !l.exam) || GRADED_LESSONS[0]).id);
        await page.click('.lc-read[data-id="' + id + '"]', { timeout: 3000 }); await sleep(600);
        await page.evaluate(() => { const c = document.getElementById('lq-close'); if (c) c.click(); }); await sleep(250);
    });
    await intenta(async () => {
        await page.click('#tab-exams', { timeout: 2000 }); await sleep(300);
        await page.click('#reading-list [data-act="read"]', { timeout: 3000 }); await sleep(600);
        await page.evaluate(() => { const c = document.getElementById('lq-close'); if (c) c.click(); }); await sleep(250);
    });
    await intenta(async () => { await page.evaluate(() => { showView('aprender'); const t = document.getElementById('tab-lessons'); if (t) t.click(); }); await sleep(300); await page.click('#dele-wrap [data-act="read"]', { timeout: 3000 }); await sleep(500); await page.evaluate(() => { const c = document.querySelector('#dele-pop .lq-close, #dele-pop [id$="close"]'); if (c) c.click(); }); });
    await intenta(() => page.evaluate(() => { showView('entrenar'); })); await sleep(500);
    // cargas perezosas (cada una inyecta un <script> local)
    const lazy = await page.evaluate(async () => {
        const out = {};
        const probar = async (nombre, f) => { try { if (typeof f === 'function') { await Promise.race([f(), new Promise(r => setTimeout(r, 4000))]); out[nombre] = 'ok'; } else out[nombre] = 'sin función'; } catch (e) { out[nombre] = 'error: ' + e.message; } };
        await probar('pinyin-tocfl', typeof ensureTocflPinyin === 'function' ? ensureTocflPinyin : null);
        await probar('hanzi-writer', typeof loadHanziWriter === 'function' ? loadHanziWriter : null);
        // ensurePitchScript() es privada de voice-evaluator.js (IIFE): se inyecta el mismo <script> que ella inyecta
        await probar('pitch-analyzer', typeof pzLoadScript === 'function' ? () => pzLoadScript('pitch-analyzer.js') : null);
        await probar('html2canvas', typeof pzLoadScript === 'function' ? () => pzLoadScript('html2canvas.min.js') : null);
        await probar('jspdf', typeof pzLoadScript === 'function' ? () => pzLoadScript('jspdf.umd.min.js') : null);
        return out;
    });
    ok(Object.values(lazy).every(v => v === 'ok'), 'cargas perezosas: cada una inyecta su script local sin error ' + JSON.stringify(lazy));
    // el respaldo de data/ solo se usa si un módulo no viene embebido
    const sinEmbeber = await page.evaluate(() => (typeof DATA_SOURCES === 'undefined' || typeof EMBEDDED_MODULE_DATA === 'undefined') ? null : Object.keys(DATA_SOURCES).filter(k => !EMBEDDED_MODULE_DATA[k]));
    ok(Array.isArray(sinEmbeber) && sinEmbeber.length === 0, 'respaldo data/: TODOS los módulos de DATA_SOURCES vienen embebidos, así que app.js nunca pide data/ ' + JSON.stringify(sinEmbeber));
    ok(errs.length === 0, 'recorrido sin errores JS: ' + errs.slice(0, 3).join(' | '));
    await b.close();

    const pedidosRuta = Array.from(pedidos.keys()).filter(p => trackedSet.has(p));
    ok(pedidosRuta.length >= 40, 'recorrido: el navegador pidió ' + pedidosRuta.length + ' archivos del repo');
    const noRepo = no200.filter(x => !/^api\//.test(x));
    console.log('  · pedidos con 4xx/5xx durante el recorrido (sin contar api/): ' + (noRepo.length ? noRepo.join(', ') : 'ninguno'));

    // ── comparación ──
    const uso = new Map();
    precache.forEach(p => uso.set(p, 'precaché de sw.js'));
    refs.forEach((from, p) => { if (!uso.has(p)) uso.set(p, 'referenciado desde ' + from); });
    pedidosRuta.forEach(p => { if (!uso.has(p)) uso.set(p, 'pedido al recorrer las vistas'); });
    // la única excepción documentada: las rutas de DATA_SOURCES (respaldo inalcanzable, comprobado arriba)
    const appSrc = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
    const dataSources = (appSrc.match(/const DATA_SOURCES = \{[\s\S]*?\n\};/) || [''])[0];
    const enRespaldo = new Set(Array.from(dataSources.matchAll(/'(data\/[^']+)'/g)).map(m => m[1]));
    const conUso = Array.from(uso.keys());
    const caidos = ignorados(conUso);
    const graves = conUso.filter(p => caidos.has(p) && !enRespaldo.has(p));
    ok(graves.length === 0, 'NADA que la app o sw.js carguen queda ignorado por .vercelignore (' + conUso.length + ' archivos con uso) ' + JSON.stringify(graves.map(p => p + ' ← ' + uso.get(p))));
    const delRespaldo = conUso.filter(p => caidos.has(p) && enRespaldo.has(p));
    console.log('  · rutas de respaldo DATA_SOURCES que existen en data/ y quedan ignoradas (inalcanzables): ' + delRespaldo.length);

    // ── lo que SÍ debe quedar fuera ──
    const debeIgnorar = ['tests/run-all.js', 'tests/README.md', 'tools/check-ninos.js', 'tools/build-readings-examen.js', 'tools/lecturas-examen/nivel.js', 'docs/ninos-imagenes.md',
        'docs/historial-actualizaciones/LEEME-VOCES.txt', 'data/hsk1.json', 'data/exams/hsk1.json', 'data/README.md', 'README.md', 'README-Pronunciacion.md', 'AUDITORIA-GAGNE-MAYER.md', 'serve.py'];
    const noIgn = debeIgnorar.filter(p => trackedSet.has(p) && !ignorados([p]).has(p));
    ok(debeIgnorar.every(p => trackedSet.has(p)), '.vercelignore: los archivos de ejemplo existen en el repo');
    ok(noIgn.length === 0, '.vercelignore: tests/, tools/, docs/, data/ y los 4 archivos de raíz SÍ quedan fuera ' + JSON.stringify(noIgn));
    // y lo que debe publicarse
    const debePublicar = ['index.html', 'sw.js', 'manifest.json', 'vercel.json', 'requirements.txt', 'api/index.py', 'api/tts.py', '.well-known/assetlinks.json', 'icons/logo-192.png'];
    const malIgn = debePublicar.filter(p => ignorados([p]).has(p));
    ok(malIgn.length === 0, '.vercelignore: index.html, sw.js, manifest, vercel.json, requirements.txt, api/ y .well-known/ se siguen publicando ' + JSON.stringify(malIgn));
    const quedan = tracked.filter(f => !caidos.has(f) && !ignorados([f]).has(f));
    const sinUso = quedan.filter(f => !uso.has(f));
    console.log('  · se publican ' + quedan.length + ' de ' + tracked.length + ' archivos; sin uso conocido (informativo): ' + (sinUso.length ? sinUso.join(', ') : 'ninguno'));

    fs.rmSync(tmp, { recursive: true, force: true });
    console.log('comprobaciones ' + n + ' · FAILS ' + fails);
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
