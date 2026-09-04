/* ============================================================
   sw.js — Service Worker PWA para Chino ⇄ Español
   ------------------------------------------------------------
   - Precachea el shell completo (HTML/JS/CSS/pinyin-pro/íconos)
     y TODOS los datos de oraciones y exámenes.
   - Estrategia cache-first con refresco en 2.º plano para GET
     del mismo origen + fallback offline para navegaciones.
   - Bonus: caché de audios TTS (POST /api/tts) → lo que ya
     escuchaste se puede reescuchar SIN conexión.
   - v7.7: caché PERSISTENTE de modelos de IA (Whisper ONNX de
     huggingface.co + runtime WASM de jsdelivr) → el motor de
     pronunciación NO se re-descarga (40 MB) en cada update.
   - v7.8: +config.js/text-utils.js en precache; pitch-analyzer.js
     se inyecta LAZY solo en modo Chino (sigue precacheado p/ offline).
   - v7.9: sin cambios de precache — lector interlineal vive en app.js
     (rubí por palabra + toque → #vocab-pop). VERSION sube solo para
     invalidar el shell cacheado (app.js + style.css).
   - v7.10: ídem v7.9 — sin cambios de precache (diccionario al toque
     vive en app.js: wordHitDict + lemas + desglose por carácter).
   - v7.11: ídem — sin cambios de precache (leyenda de tonos + esquemas
     de color viven en index.html/style.css/app.js: popup #tone-legend-pop,
     variables --tone-N con fallback y paleta Okabe-Ito para daltonismo).
   - v7.12: +dict-mini.js en precache — Capa 4: diccionario offline
     zh↔es (~1.630 entradas + 802 alias, CC-BY-SA 4.0). Archivo NUEVO
     en el shell: sin precache no existiría offline.
   - v7.13: +hanzi-writer.min.js en precache — orden de trazos (MIT).
     La librería se INYECTA lazy (cero costo inicial) pero vive en el
     shell → funciona offline desde la 1.ª instalación. Los datos de
     cada carácter (hanzi-writer-data, jsdelivr) van a una caché
     PERSISTENTE nueva (chino-es-hanzi-v1) → offline desde la 2.ª vez
     y no se borran en cada update (mismo criterio que los modelos IA).
   - v7.14: +lessons.js en precache — textos completos de las lecciones
     para el botón "📖 Leer lección" (Clásicos). Archivo PLANO de datos
     (patrón dict-mini.js): agregar lecciones nuevas NO regenera app.js,
     solo edita lessons.js. El botón carga el texto en el Lector (pinyin
     interlineal + diccionario + TTS); en CN→ES el botón se oculta.
   ------------------------------------------------------------
   ⚠️ Al cambiar app.js / index.html / style.css / datos:
      subí VERSION (ej. 'v27') para que todos reciban el update.
   ============================================================ */
const VERSION = 'v34';
const SHELL_CACHE = `chino-es-shell-${VERSION}`;
const TTS_CACHE = 'chino-es-tts-v1';     // persiste entre versiones (no se borra)
const MODEL_CACHE = 'chino-es-models-v1'; // v7.7: modelos IA — NUNCA se borra
const DATA_CACHE = 'chino-es-hanzi-v1';  // v7.13: datos de trazos Hanzi Writer — NUNCA se borra
const TTS_MAX_ENTRIES = 80;

const PRECACHE = [
  './',
  './index.html',
  './app.js',
  './VoiceRecorder.js',    // v7.5/7.7/7.8: captura + UI de pronunciación (por modo)
  './config.js',           // v7.8: constantes calibrables (umbral de confianza, tolerancia léxica)
  './text-utils.js',       // v7.8: normalizeText por idioma + Levenshtein por palabra
  './pitch-analyzer.js',   // v7.7/7.8: F0 (YIN) + DTW + clase PitchAnalyzer (carga LAZY en es-cn)
  './voice-evaluator.js',  // v7.6-7.8: orquestador por MODO (es-cn / cn-es)
  './style.css',
  './dict-mini.js',         // v7.12: Capa 4 — diccionario offline zh↔es (CC-BY-SA 4.0)
  './lessons.js',           // v7.14: textos completos de las lecciones (📖 Leer lección)
  './hanzi-writer.min.js',  // v7.13: orden de trazos (MIT) — se inyecta LAZY pero precacheado p/ offline
  './pinyin-pro.min.js',
  './html2canvas.min.js',  // v7.1: PDF directo de planillas (carga perezosa)
  './jspdf.umd.min.js',    // v7.1: ídem
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
  // v6.2: los datos van DENTRO de app.js (EMBEDDED_MODULE_DATA) — no hace falta data/
  // v7.7: los archivos DEL MODELO Whisper (40 MB) NO van al precache:
  //       los gestiona MODEL_CACHE en runtime (ver cacheFirstModel).
  // v7.8: pitch-analyzer.js sigue en el precache aunque se cargue LAZY:
  //       así el ensurePitchScript() del modo chino funciona offline.
];

/* ---------- Install: precache tolerante (un 404 no rompe el SW) ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.all(PRECACHE.map((url) =>
      cache.add(url).catch((err) => console.warn('[SW] precache falló (no crítico):', url, err.message))
    ));
    await self.skipWaiting();
  })());
});

/* ---------- Activate: limpiar caches viejos (conservan TTS y modelos) ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k !== SHELL_CACHE && k !== TTS_CACHE && k !== MODEL_CACHE && k !== DATA_CACHE)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* ---------- Fetch: router de estrategias ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method === 'POST') {
    if (req.url.includes('/api/tts')) event.respondWith(handleTTS(req));
    return; // otros POST → red directa
  }
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstShell(req));
  } else if (isModelAsset(url)) {
    event.respondWith(cacheFirstImmutable(req, MODEL_CACHE)); // v7.7: modelos IA → caché persistente
  } else if (isHanziData(url)) {
    event.respondWith(cacheFirstImmutable(req, DATA_CACHE)); // v7.13: datos de trazos → caché persistente
  } else {
    event.respondWith(cacheFirstRuntime(req)); // CDN y otros cross-origin GET
  }
});

/* ---------- v7.13: ¿son datos de un carácter para Hanzi Writer? ----------
   JSON chicos (~15 KB) e INMUTABLES (el trazo de 你 no cambia): una vez
   cacheados funcionan offline para siempre y no se re-bajan en updates. */
function isHanziData(url) {
  return url.hostname === 'cdn.jsdelivr.net' &&
         url.pathname.includes('hanzi-writer-data');
}

/* ---------- v7.7: ¿es un archivo del motor de IA (grande, inmutable)? ---------- */
function isModelAsset(url) {
  return url.hostname === 'huggingface.co' ||
         url.hostname.endsWith('.hf.co') ||
         (url.hostname === 'cdn.jsdelivr.net' &&
          (url.pathname.includes('@huggingface/transformers') ||
           url.pathname.includes('onnxruntime-web')));
}

/* ---------- v7.7/7.13: inmutables — cache-first SIN refresco ----------
   Modelos IA (40 MB) y datos de caracteres de Hanzi Writer: acá no
   conviene revalidar en background. Cache parametrizable para que
   cada familia viva en su caché persistente. */
async function cacheFirstImmutable(req, cacheName) {
  const cacheToUse = cacheName || MODEL_CACHE;
  const cached = await caches.match(req, { ignoreVary: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      try { const c = await caches.open(cacheToUse); await c.put(req, res.clone()); } catch (e) { /* noop */ }
    }
    return res;
  } catch (err) {
    throw err;
  }
}

/* ---------- Shell mismo origen: cache-first + refresh en background ---------- */
async function cacheFirstShell(req) {
  let cached = await caches.match(req, { ignoreVary: true });
  if (!cached) {
    // Fallback sin query: 'app.js?v=20260901c' matchea el './app.js' precacheado
    // (así el offline funciona desde la 1ª visita). Online siempre gana la red:
    // un ?v= nuevo no está en caché → fetch → se guarda con su query completa.
    try {
      const u = new URL(req.url);
      if (u.search) cached = await caches.match(u.pathname, { ignoreVary: true });
    } catch (e) { /* noop */ }
  }
  if (cached) {
    // refresca la copia en silencio para la próxima visita
    fetch(req).then((res) => {
      if (res && res.ok) caches.open(SHELL_CACHE).then((c) => c.put(req, res)).catch(() => {});
    }).catch(() => {});
    return cached;
  }
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      try { const c = await caches.open(SHELL_CACHE); await c.put(req, res.clone()); } catch (e) { /* noop */ }
    }
    return res;
  } catch (err) {
    if (req.mode === 'navigate') {
      const idx = await caches.match('./index.html', { ignoreVary: true });
      if (idx) return idx; // modo avión: sirve la app igual
    }
    throw err;
  }
}

/* ---------- Cross-origin GET: cache-first runtime (CDN etc.) ---------- */
async function cacheFirstRuntime(req) {
  const cached = await caches.match(req, { ignoreVary: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      try { const c = await caches.open(SHELL_CACHE); await c.put(req, res.clone()); } catch (e) { /* noop */ }
    }
    return res;
  } catch (err) {
    throw err;
  }
}

/* ---------- TTS: POST → clave estable por (texto|idioma|voz) ---------- */
async function handleTTS(req) {
  let key = null;
  try {
    const body = await req.clone().json();
    const raw = `${body.text || ''}|${body.lang || ''}|${body.voice || ''}`;
    key = self.location.origin + '/__tts__/' + djb2(raw);
  } catch (e) { /* body no-JSON → sin caché, pasa a red */ }

  if (key) {
    const hit = await caches.match(key, { ignoreVary: true, cacheName: TTS_CACHE });
    if (hit) return hit; // 🎉 reescucha offline de audio ya sintetizado
  }
  try {
    const res = await fetch(req);
    if (res && res.ok && key) {
      putTTS(key, res.clone()).catch(() => {});
    }
    return res;
  } catch (err) {
    // sin red y sin caché → el frontend usa la voz del sistema (fallback existente)
    throw err;
  }
}

async function putTTS(key, res) {
  const cache = await caches.open(TTS_CACHE);
  const headers = new Headers(res.headers);
  headers.set('x-tts-time', String(Date.now()));
  headers.set('x-tts-key', key.slice(-12));
  const stored = new Response(await res.clone().arrayBuffer(), { status: res.status, headers });
  await cache.put(key, stored);
  trimTTS(cache).catch(() => {});
}

async function trimTTS(cache) {
  const keys = await cache.keys();
  if (keys.length <= TTS_MAX_ENTRIES) return;
  const entries = await Promise.all(keys.map(async (k) => {
    const r = await cache.match(k, { ignoreVary: true });
    const t = r ? parseInt(r.headers.get('x-tts-time') || '0', 10) : 0;
    return { k, t };
  }));
  entries.sort((a, b) => a.t - b.t); // más viejos primero
  const toDelete = entries.slice(0, entries.length - TTS_MAX_ENTRIES);
  await Promise.all(toDelete.map((e) => cache.delete(e.k)));
}

/* ---------- hash djb2 (clave corta y estable) ---------- */
function djb2(str) {
  let h1 = 5381, h2 = 52711;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = ((h1 << 5) + h1 + c) >>> 0;
    h2 = ((h2 << 5) + h2 + c) >>> 0;
  }
  return h1.toString(36) + h2.toString(36);
}
