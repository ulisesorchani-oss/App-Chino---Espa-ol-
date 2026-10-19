#!/usr/bin/env node
// tools/check-undef.js — busca variables SIN DEFINIR en los scripts de la app (regla `no-undef` de ESLint).
//   node tools/check-undef.js          → lista «archivo:línea:col 'nombre' is not defined»; código de salida 1 si hay alguna
//   node tools/check-undef.js --list   → además muestra qué globales entre archivos se detectaron
//
// Por qué existe: `node --check` solo mira la sintaxis. Un `ReferenceError` (como `data is not defined` en speakEs, que dejó
// mudo el audio de las lecciones desde v9.40 hasta el PR #101) solo aparece al EJECUTAR esa línea, y las pruebas rara vez
// pasan por todas las ramas. Esta herramienta lo ve sin ejecutar nada.
//
// Cómo funciona (la app son scripts clásicos que comparten globales, no módulos):
//   1) recorre TODOS los scripts de la raíz (más los <script> en línea de index.html) y junta lo que cada uno declara en el
//      ámbito global (function / var / let / const / class) o asigna a `window.X`;
//   2) lo pasa por ESLint `no-undef` con globales = navegador ∪ librerías de terceros ∪ lo anterior;
//   3) lo que quede sin definir es un error real (typo, variable fuera de su bloque, función que no existe en ningún archivo).
// Límites: no verifica el ORDEN de carga de los scripts ni que el global exista en el momento de la llamada; `typeof x` no se
// marca (es la forma segura de preguntar si existe, y la app la usa mucho como guarda).
// Se autoprueba en cada corrida: si ESLint no detecta el patrón de speakEs en un fragmento de prueba, la herramienta falla
// (así nunca «pasa en silencio» por estar mal configurada).
// ESLint no es dependencia del repo: se busca `eslint` instalado (require normal, ESLINT_PATH, o la instalación global).
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..');

function loadESLint() {
  const tries = [() => require('eslint'), () => require(process.env.ESLINT_PATH), () => require(path.join(cp.execSync('npm root -g', { encoding: 'utf8' }).trim(), 'eslint')),
    () => require('/opt/node22/lib/node_modules/eslint')];
  for (const t of tries) { try { const m = t(); if (m && m.Linter) return m; } catch (e) { /* siguiente */ } }
  console.error('✗ No encontré ESLint. Instalalo (npm i -g eslint) o indicá ESLINT_PATH=/ruta/a/node_modules/eslint');
  process.exit(2);
}
const { Linter } = loadESLint();

// ── globales del navegador (la lista de ESLint «globals» no viene con eslint, así que va acá) ──
const BROWSER = ('window document navigator location history localStorage sessionStorage console setTimeout clearTimeout setInterval clearInterval ' +
  'requestAnimationFrame cancelAnimationFrame requestIdleCallback cancelIdleCallback fetch Request Response Headers URL URLSearchParams Blob File FileReader FileList ' +
  'FormData AbortController AbortSignal Audio Image Option Event CustomEvent MouseEvent KeyboardEvent PointerEvent TouchEvent Touch WheelEvent DragEvent FocusEvent InputEvent ' +
  'ClipboardEvent StorageEvent ProgressEvent MessageEvent ErrorEvent MutationObserver IntersectionObserver ResizeObserver PerformanceObserver Node NodeFilter NodeList Element ' +
  'HTMLElement HTMLAnchorElement HTMLInputElement HTMLCanvasElement HTMLAudioElement HTMLMediaElement Range Selection getSelection DOMParser XMLSerializer XMLHttpRequest ' +
  'WebSocket Worker SharedWorker MessageChannel BroadcastChannel indexedDB IDBKeyRange caches crypto performance atob btoa alert confirm prompt getComputedStyle matchMedia ' +
  'screen innerWidth innerHeight outerWidth outerHeight scrollTo scrollBy scrollX scrollY pageXOffset pageYOffset devicePixelRatio visualViewport open close print postMessage ' +
  'addEventListener removeEventListener dispatchEvent self top parent frames TextEncoder TextDecoder structuredClone queueMicrotask Path2D AudioContext webkitAudioContext ' +
  'OfflineAudioContext AudioWorkletNode AnalyserNode GainNode MediaRecorder MediaStream MediaDevices speechSynthesis SpeechSynthesisUtterance SpeechSynthesisVoice ' +
  'SpeechRecognition webkitSpeechRecognition Notification DOMException DataTransfer ClipboardItem FontFace CSS ImageData ImageBitmap OffscreenCanvas createImageBitmap ' +
  'CanvasRenderingContext2D WebAssembly isSecureContext').split(/\s+/).filter(Boolean);
// ── librerías de terceros que se cargan con <script> y exponen globales (archivos *.min.js, no se revisan) ──
const VENDOR = ['pinyinPro', 'html2canvas', 'jspdf', 'HanziWriter'];
// ── solo en el service worker ──
const SW_ONLY = ['clients', 'registration', 'skipWaiting', 'importScripts', 'ServiceWorkerGlobalScope'];
// ── guardas UMD que usan algunos scripts propios (`if (typeof module …) module.exports = …`) ──
const UMD = ['module', 'exports', 'require', 'define'];

// ── hallazgos ya revisados (archivo + nombre + cuántas veces como máximo). Un hallazgo NUEVO, o uno repetido más veces, sí falla ──
//   'falso-positivo': el código es correcto; ESLint no entiende la guarda.      'pendiente': bug real, se avisa en cada corrida hasta corregirlo.
const KNOWN = [
  { file: 'text-utils.js', name: 'root', max: 1, kind: 'falso-positivo', note: "`typeof root !== 'undefined' && root.PronunciationConfig`: la guarda con typeof corta antes de usar `root`" }
];

const asObj = (names) => names.reduce((o, n) => { o[n] = 'readonly'; return o; }, {});
function makeConfig(globalsList, rules) {
  return [{ files: ['**/*.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: asObj(globalsList) }, rules: rules || { 'no-undef': 'error' } }];
}

// ── paso 1: qué declara cada script en el ámbito global ──
const collected = new Map(); // nombre → archivos
const collector = { rules: { collect: { create(context) {
  const add = (n) => { if (!collected.has(n)) collected.set(n, new Set()); collected.get(n).add(context.filename); };
  return {
    Program(node) { const sc = context.sourceCode.getScope(node); sc.variables.forEach(v => { if (v.defs.length) add(v.name); }); },
    AssignmentExpression(n) { const l = n.left; if (l.type === 'MemberExpression' && l.object.type === 'Identifier' && ['window', 'self', 'globalThis'].includes(l.object.name)) {
      if (!l.computed && l.property.type === 'Identifier') add(l.property.name); else if (l.computed && l.property.type === 'Literal') add(String(l.property.value)); } }
  };
} } } };

function sourcesOf(file) { // [{ name, code }] — un .js entero, o los <script> en línea de un .html
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (!file.endsWith('.html')) return [{ name: file, code }];
  const out = []; const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi; let m, i = 0;
  while ((m = re.exec(code))) { if (/type\s*=\s*["'](?!text\/javascript|module)/i.test(m[1]) || /type\s*=\s*["']module/i.test(m[1])) continue; if (m[2].trim()) out.push({ name: file + '#script' + (++i), code: m[2] }); }
  return out;
}
const rootFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.js') && !/\.min\.js$|\.umd\.min\.js$/.test(f)).sort();
const htmlFiles = fs.existsSync(path.join(ROOT, 'index.html')) ? ['index.html'] : [];

const linter = new Linter({ configType: 'flat' });
const parseErrors = [];
function runLint(name, code, cfg) {
  return linter.verify(code, cfg, { filename: name });
}

// ── autoprueba: el patrón exacto de speakEs (const en un try, usado fuera) debe marcarse; la versión corregida, no ──
const BUG = "async function f(){ let url = null; try { const data = await g(); url = data.audio; } catch (e) { url = null; } if (url) { use(url, data); } }";
const FIXED = "async function f(){ let url = null; let data = null; try { data = await g(); url = data.audio; } catch (e) { url = null; } if (url) { use(url, data); } }";
const stCfg = makeConfig(['g', 'use']);
const stBug = runLint('selftest-bug.js', BUG, stCfg).filter(m => m.ruleId === 'no-undef' && /'data'/.test(m.message));
const stFix = runLint('selftest-fixed.js', FIXED, stCfg);
if (stBug.length !== 1 || stFix.length !== 0) {
  console.error('✗ Autoprueba fallida: ESLint no detectó el patrón de speakEs (bug: ' + stBug.length + ' hallazgos, esperado 1; corregido: ' + stFix.length + ', esperado 0). La herramienta no es confiable.');
  process.exit(2);
}

// ── paso 1 ──
const collCfg = [{ files: ['**/*.js'], plugins: { local: collector }, languageOptions: { ecmaVersion: 'latest', sourceType: 'script' }, rules: { 'local/collect': 'error' } }];
const allSources = [];
[...rootFiles, ...htmlFiles].forEach(f => sourcesOf(f).forEach(s => allSources.push(s)));
allSources.forEach(s => {
  const msgs = linter.verify(s.code, collCfg, { filename: s.name });
  msgs.filter(m => m.fatal).forEach(m => parseErrors.push(s.name + ':' + m.line + ':' + m.column + '  error de sintaxis: ' + m.message));
});
const declared = [...collected.keys()];

// ── paso 2 ──
const problems = [];
allSources.forEach(s => {
  const isSW = s.name === 'sw.js';
  const globs = [...BROWSER, ...VENDOR, ...UMD, ...declared, ...(isSW ? SW_ONLY : [])];
  runLint(s.name, s.code, makeConfig(globs)).forEach(m => {
    if (m.fatal) return; // los errores de sintaxis ya se listaron en el paso 1
    if (m.ruleId === 'no-undef') problems.push({ file: s.name, line: m.line, col: m.column, msg: m.message });
  });
});

if (process.argv.includes('--list')) {
  console.log('Globales detectados entre archivos: ' + declared.length + ' (navegador: ' + BROWSER.length + ', terceros: ' + VENDOR.join(', ') + ')');
}
// separa lo ya conocido (KNOWN) de lo nuevo
const seenCount = {}, fresh = [], known = [];
problems.forEach(p => {
  const nm = (/'([^']+)'/.exec(p.msg) || [])[1], k = KNOWN.find(x => x.file === p.file && x.name === nm);
  const key = p.file + '|' + nm; seenCount[key] = (seenCount[key] || 0) + 1;
  if (k && seenCount[key] <= k.max) known.push({ p, k }); else fresh.push(p);
});
parseErrors.forEach(e => console.log('✗ ' + e));
fresh.forEach(p => console.log('✗ ' + p.file + ':' + p.line + ':' + p.col + '  ' + p.msg));
known.filter(x => x.k.kind === 'pendiente').forEach(x => console.log('⚠ pendiente  ' + x.p.file + ':' + x.p.line + ':' + x.p.col + '  ' + x.p.msg + ' — ' + x.k.note));
if (process.argv.includes('--list')) known.filter(x => x.k.kind === 'falso-positivo').forEach(x => console.log('· falso positivo  ' + x.p.file + ':' + x.p.line + ':' + x.p.col + '  ' + x.p.msg + ' — ' + x.k.note));
const nBad = fresh.length + parseErrors.length, nPend = known.filter(x => x.k.kind === 'pendiente').length;
console.log('check-undef: ' + allSources.length + ' scripts revisados · ' + (nBad ? nBad + ' problema(s) nuevo(s)' : 'sin variables sin definir nuevas') +
  (nPend ? ' · ' + nPend + ' bug(s) real(es) pendiente(s) de corregir' : '') + ' · ' + known.filter(x => x.k.kind === 'falso-positivo').length + ' falso(s) positivo(s) conocido(s)');
process.exit(nBad ? 1 : 0);
