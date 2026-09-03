/* ============================================================
   sw.js — Service Worker PWA para Chino ⇄ Español
   ------------------------------------------------------------
   - Precachea el shell completo (HTML/JS/CSS/pinyin-pro/íconos)
     y TODOS los datos de oraciones y exámenes.
   - Estrategia cache-first con refresco en 2.º plano para GET
     del mismo origen + fallback offline para navegaciones.
   - Bonus: caché de audios TTS (POST /api/tts) → lo que ya
     escuchaste se puede reescuchar SIN conexión.
   ------------------------------------------------------------
   ⚠️ Al cambiar app.js / index.html / style.css / datos:
      subí VERSION (ej. 'v6') para que todos reciban el update.
   ============================================================ */
const VERSION = 'v25';
const SHELL_CACHE = `chino-es-shell-${VERSION}`;
const TTS_CACHE = 'chino-es-tts-v1'; // persiste entre versiones (no se borra)
const TTS_MAX_ENTRIES = 80;

const PRECACHE = [
  './',
  './index.html',
  './app.js',
  './VoiceRecorder.js',    // v7.5: grabación y evaluación de pronunciación
  './style.css',
  './pinyin-pro.min.js',
  './html2canvas.min.js',  // v7.1: PDF directo de planillas (carga perezosa)
  './jspdf.umd.min.js',    // v7.1: ídem
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
  // v6.2: los datos van DENTRO de app.js (EMBEDDED_MODULE_DATA) — no hace falta data/
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

/* ---------- Activate: limpiar caches viejos (conserva audio TTS) ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k !== SHELL_CACHE && k !== TTS_CACHE)
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
  } else {
    event.respondWith(cacheFirstRuntime(req)); // CDN y otros cross-origin GET
  }
});

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
