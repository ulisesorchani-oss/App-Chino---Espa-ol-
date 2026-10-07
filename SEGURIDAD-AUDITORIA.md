# Auditoría de seguridad — Huayu Diario

Fecha: 2026-10-07 · Alcance: todo el repo en `claude/sharp-thompson-5gi0wh` · Tipo: diagnóstico defensivo, sin cambios de código.

> **Nada de este informe fue "arreglado" todavía.** Es solo el mapa pedido. Esperando tu confirmación de qué atacar primero.

---

## Resumen ejecutivo (leer esto primero)

1. **El bug reportado ("usuario → admin editando el storage") no tiene dónde vivir en este código.** Busqué a fondo (`admin`, `role`, `rol`, `isAdmin`, `auth`, `token`, `session`, `premium`, `pago`, `licencia`) en todo el repo. No existe login, no existe backend de usuarios, no existe ningún concepto de rol ni de cuenta "premium" activo — las únicas menciones a "premium" son comentarios de un *placeholder* (`CloudSpeechProvider`, en `voice-evaluator.js`) que hoy solo lanza `Error('... aún no configurado')`. Todas las claves de `localStorage`/IndexedDB son preferencias y progreso del propio alumno (voz elegida, SRS, estadísticas, etc.), nunca un permiso. **Conclusión: con el código que está en este branch, no hay "admin" que escalar.** Si viste esto en la app en producción, puede ser (a) una versión vieja/distinta desplegada, (b) un malentendido de algún toggle con nombre llamativo, o (c) algo que me falta ver — decime en qué pantalla lo notaste y reviso puntualmente eso.
2. **Sí hay un hallazgo real y explotable ahora mismo**, y coincide con tu propia sospecha ("consumir mi cuota de Vercel"): el backend de TTS (`api/index.py`) acepta peticiones de **cualquier origen** (`allow_origins=["*"]`), sin autenticación, sin límite de tamaño en el texto (solo el camino GET lo limita) y sin rate limiting. Cualquiera que descubra la URL puede scriptear llamadas masivas y quemar tu cuota/minutos de función. Es el ítem de severidad **alta** de este informe.
3. No se encontraron secretos/API keys hardcodeadas, ni XSS explotable (hay disciplina real de escapado — `escHtml()` — en todos los puntos donde se interpola contenido dinámico), ni Supabase/Firebase (no aplica RLS). El resto son endurecimientos preventivos (cabeceras, SRI, versiones sin pin) — útiles pero no eran la causa del reporte.

---

## Hallazgos por severidad

### 🔴 ALTA

#### A1 — CORS abierto + cero auth + cero rate limit en el backend de TTS
- **Archivo/línea:** `api/index.py:56-60` (idéntico en `api/tts.py`)
  ```python
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```
- **Por qué importa:** no hay ninguna capa de autenticación, API key, ni límite de peticiones por IP/tiempo en todo el archivo. Sumado a que el `POST` no tiene tope de longitud de texto (ver A2), cualquier sitio o script externo puede pegarle a tu función de Vercel tantas veces como quiera.
- **Cómo reproducirlo (no destructivo, en tu propia instancia):**
  ```bash
  curl -X POST https://<tu-deploy>.vercel.app/api/tts \
       -H "Content-Type: application/json" \
       -H "Origin: https://sitio-que-no-es-el-tuyo.com" \
       -d '{"text":"prueba","lang":"es"}'
  ```
  Vas a ver que responde 200 igual, sin que el `Origin` ajeno importe, y sin pedir ninguna credencial. Repetirlo en bucle (aunque sea unas pocas veces, sin abusar de tu propia cuota) alcanza para confirmarlo.
- **Fix recomendado:** restringir `allow_origins` al dominio real de tu PWA (lista explícita, no `"*"`); agregar un rate limit básico (por IP, con algo tipo `slowapi` o un contador en memoria/KV); considerar una clave compartida simple (header secreto) entre tu frontend y el backend si querés cerrarlo del todo a terceros.

### 🟠 MEDIA

#### M1 — Sin límite de tamaño en el cuerpo del POST
- **Archivo/línea:** `api/index.py:235` — `if via_get and len(text) > 400:` — el `if` **solo corre cuando `via_get` es `True`**; el camino `POST` (el que de hecho usa el frontend, ver `audio-tts.js`) no tiene ningún tope de longitud de `text`.
- **Reproducir:** mandar un `POST` con un `text` de varios MB y ver que no lo rechaza de entrada (puede fallar después por timeout/memoria del motor TTS, pero ya gastó cómputo).
- **Fix:** aplicar el mismo (o similar) límite de longitud también en el camino POST, antes de invocar edge-tts/piper.

#### M2 — Archivos de backend duplicados (`api/index.py` / `api/tts.py`)
- **Archivo:** ambos, confirmado por `diff` que son casi idénticos (mismo CORS, mismo mapa `VOICES`, misma lógica; solo difieren comentarios).
- **Por qué importa:** duplica la superficie de ataque — cualquier fix de A1/M1 hay que aplicarlo en los dos archivos o uno queda vulnerable. Vercel probablemente despliega ambos como funciones separadas (`/api/index` y `/api/tts`), aunque `vercel.json` además reescribe `/api/tts` → `/api/index`; vale la pena confirmar en el dashboard de Vercel si `api/tts.py` sigue siendo alcanzable de forma directa o quedó muerto.
- **Fix:** unificar en un solo archivo, o que uno importe/reexporte la lógica del otro.

#### M3 — Faltan cabeceras de seguridad (CSP, X-Frame-Options, Referrer-Policy)
- **Archivo:** `vercel.json` — el único bloque `headers` existente solo define COOP/COEP (necesarias para el WASM de Whisper):
  ```json
  { "source": "/(.*)", "headers": [
      { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
      { "key": "Cross-Origin-Embedder-Policy", "value": "credentialless" }
  ]}
  ```
- **Riesgo:** sin `X-Frame-Options`/`frame-ancestors`, la app se puede embeber en un `<iframe>` ajeno (clickjacking). Sin CSP, un XSS futuro (aunque hoy no encontré ninguno explotable) tendría manos libres.
- **Fix:** agregar al mismo bloque `X-Frame-Options: DENY` (o `frame-ancestors 'self'` vía CSP), `Referrer-Policy: strict-origin-when-cross-origin`, y una CSP que al menos fije `default-src 'self'` + los orígenes CDN que ya usás (`cdn.jsdelivr.net`, `unpkg.com`, `huggingface.co`).

#### M4 — Scripts de CDN sin Subresource Integrity (SRI)
- **Archivos/líneas:**
  - `index.html:860` — fallback de `pinyin-pro.min.js` a `https://unpkg.com/pinyin-pro` vía `onerror` + `createElement('script')`.
  - `trazos.js:29` — `HANZI_WRITER_CDN = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js'`.
  - `voice-evaluator.js:154` — `libUrl: 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1'`.
- **Riesgo:** si alguno de esos CDNs es comprometido (o hay un typosquat de la cuenta del paquete), el script cargado corre con los mismos privilegios que tu app, sin que un `integrity=` lo bloquee. Hoy es un riesgo de cadena de suministro de terceros, no algo que puedas explotar vos mismo para probarlo — solo queda constatar que no hay `integrity=` en ninguno de los tres.
- **Fix:** agregar `integrity="sha384-..."` + `crossorigin="anonymous"` a los `<script>` que sí conocés el hash de antemano (el de `index.html`); para los que se inyectan dinámicamente (`trazos.js`, `voice-evaluator.js`), setear `script.integrity`/`script.crossOrigin` antes de `appendChild`. Alternativa más simple: vendorizar esas libs como ya hiciste con `hanzi-writer.min.js`/`html2canvas.min.js`/`jspdf.umd.min.js` (serían locales, sin CDN en absoluto).

#### M5 — jsPDF 2.5.2 vendorizado tiene CVEs conocidos (no explotables con el uso actual, pero vale actualizar)
- **Archivo:** `jspdf.umd.min.js` (header confirma v2.5.2, build 2024-09-17), usado en `app.js:4326` (`new window.jspdf.jsPDF(...)`).
- **CVEs encontrados** (búsqueda web, no pude correr un scanner de verdad por las restricciones de red de este sandbox — verificar con `npm audit`/Snyk si tenés package.json en algún momento):
  - **CVE-2026-25535** (alta, 8.7) — DoS vía `addImage`/`html` con GIF malicioso (dimensiones gigantes → OOM). Afecta <4.2.0.
  - **CVE-2026-25755** (alta, 8.1) — inyección de objetos PDF vía `addJS()`. Afecta <4.2.0.
  - **CVE-2025-68428** — path traversal vía `loadFile`, pero **solo afecta el build de Node** (`dist/jspdf.node.js`), no el UMD de navegador que usás acá.
- **Por qué NO son explotables hoy:** revisé el único uso real en `app.js:4326-4349` — `addImage` solo recibe el *data URL* que genera `html2canvas` localmente a partir del propio DOM de la app (nunca una URL/archivo externo ni un GIF subido por nadie), y `addJS()` no se llama en ningún lugar del repo. O sea: la superficie que tienen esos dos CVEs (texto/imagen controlado por un atacante) no existe en tu flujo.
- **Fix recomendado (igual, por las dudas / para no acumular deuda):** actualizar a jsPDF ≥ 4.2.0 cuando tengas una ventana, vendorizando el nuevo build igual que el actual. No es urgente.

### 🟡 BAJA

#### B1 — El backend filtra detalle de excepciones internas al cliente
- **Archivo/línea:** `api/index.py:292-296`
  ```python
  except Exception as e_piper:
      return JSONResponse({
          "error": "tts no disponible",
          "detalle": str(e_edge)[:200] + " | piper: " + str(e_piper)[:200],
      }, status_code=502)
  ```
- **Riesgo:** bajo (son 200 caracteres de un mensaje de excepción de una librería de TTS, no de tu lógica de negocio ni credenciales), pero es buena práctica no devolver internals crudos.
- **Fix:** loguear el detalle completo del lado del servidor (`print`/logger) y devolver al cliente un mensaje genérico.

#### B2 — Dependencias de Python sin versión fijada
- **Archivo:** `requirements.txt` (completo):
  ```
  fastapi
  uvicorn
  edge-tts
  piper-tts
  numpy
  soundfile
  huggingface_hub
  ```
- **Riesgo:** no es una vulnerabilidad en sí (no pude determinar qué versión exacta corre en tu deploy desde el repo solo), sino un problema de reproducibility/supply-chain: un día el build de Vercel puede traer una versión nueva con un bug o breaking change sin que lo hayas pedido.
- **Fix:** fijar versiones (`fastapi==0.11x.x`, etc.) y correr `pip list --outdated` / `pip-audit` periódicamente.

#### B3 — `pinyin-pro.min.js` sin versión identificable
- El header del archivo minificado no trae número de versión (a diferencia de `html2canvas.min.js` v1.4.1, `jspdf.umd.min.js` v2.5.2, `hanzi-writer.min.js` v3.5.0, que sí lo traen). No pude confirmar si tiene CVEs conocidos sin saber qué versión es.
- **Fix:** si en algún momento lo volvés a descargar del CDN, anotar la versión en un comentario del propio archivo o en un `README` de terceros.

---

## Lo que audité y **NO** es un hallazgo (para que no se pierda tiempo mirando esto después)

- **Rol/admin/privilegios:** grep exhaustivo de `admin|role|rol|isAdmin|auth|token|session|premium|pago|licencia|unlock|paywall` en todo el repo. Los únicos hits reales son: (a) vocabulario HSK/TOCFL (ej. "administración", "licenciar" como palabras del idioma, no código), y (b) comentarios sobre una fase futura de pago (`FASE premium`) que hoy es un `throw new Error(...)` sin implementar. **No hay ningún `if (rol === 'admin')` ni equivalente en toda la app.**
- **Inventario de `localStorage`:** todas las claves están prefijadas `ac_*` (más `theme` y `chino-espanol-app-v2`) y guardan preferencias/progreso (voz TTS elegida, velocidad, SRS, estadísticas de pronunciación, estado de toggles de UI). Ninguna determina permisos — como mucho, desbloquean *contenido* (ej. flags de qué lección ya viste), nunca una capacidad administrativa.
- **IndexedDB:** un solo uso (`personal-lessons.js`, DB `PL_DB_NAME`) para las lecturas personales del alumno (texto, nombre, nivel) — con sanitización de tipos y longitud ya implementada (`plSanitizeEntry`, límites de 200/5000 caracteres).
- **Secuestro de sesión / Supabase / Firebase:** no existen — no hay backend de usuarios de ningún tipo, solo el endpoint de TTS sin estado.
- **Secretos hardcodeados:** grep de `api[_-]?key|apikey|secret|Bearer |AIza...|sk-...` en todo `.js/.html/.py/.json` — todos los hits son la palabra española "secreto" en contenido de lecciones (vocabulario), cero claves reales.
- **XSS:** barrido completo de `innerHTML =` / `insertAdjacentHTML` en los 17 archivos JS propios del repo (excluyendo librerías vendorizadas) — **en absolutamente todos los puntos que interpolan contenido dinámico se usa `escHtml()` (o equivalente local: `esc()`, `escH()`, `plEsc()`)** antes de tocar el DOM, incluyendo: el texto transcripto por voz en `free-talk.js`, el nombre/nivel que el alumno escribe en "Mis lecturas" (`personal-lessons.js`), y el diff de respuesta en `app.js`. El resto de los sinks son 100% contenido estático de la propia app (diccionarios, lecciones, dramas).
  - Caso particular revisado a fondo — **exportación a PDF/impresión** (`app.js:4280-4349`, `pzSheetHTML` en `app.js:4031-4147`): esta función usa `DOMParser` + mover nodos a un DOM vivo + `document.write()` (línea 4381) para imprimir, un patrón que en general SÍ sería explotable si el HTML incluyera atributos tipo `onerror=` controlados por un atacante. Pero el único input del usuario que llega ahí (`pz-input`, un textarea donde escribe los caracteres a practicar) pasa por `pzParseInput()` (`app.js:3709-3719`), que **filtra carácter por carácter y descarta todo lo que no sea Han (`pzIsHan`)** — no puede colarse `<`, `>`, `"` ni ningún carácter ASCII especial. No es explotable con el código actual.
- **Importación de respaldo (backup JSON):** `doBackupImport()` (`app.js:284-336`) ya tiene un allowlist estricto de claves (`STORAGE_KEY`, `theme`, `/^ac_/`) agregado en una versión previa ("v9.50: solo se restauran las claves que la app misma exporta... un archivo ajeno o manipulado ya no puede escribir claves arbitrarias del navegador" — comentario del propio código, línea ~297-299) y `PL.importAll()` (`personal-lessons.js:112-137`) valida tipo y longitud de cada campo antes de persistir. Esto ya estaba bien resuelto de una ronda de hardening anterior — no es un hallazgo nuevo, lo marco para que sepas que ya está cubierto.
- **`eval`/`new Function`/`location.search`/`location.hash`:** cero usos en todo el repo (fuera de las libs vendorizadas). No hay superficie de XSS vía parámetros de URL porque la app simplemente no los lee.
- **`postMessage`:** todos los usos son entre la página y sus propios Web Workers dedicados (pitch-analyzer, Whisper) — no hay un listener de `window.addEventListener('message', ...)` cross-origin que pueda ser abusado por otra pestaña/origen.
- **html2canvas 1.4.1 / Hanzi Writer 3.5.0:** sin CVEs conocidos encontrados en las bases consultadas (Snyk, NVD) al momento de este informe.

---

## Limitaciones de este informe

- No pude correr un scanner de dependencias real (`npm audit`, `pip-audit`, Snyk CLI) porque este sandbox tiene la salida de red restringida a una lista corta de dominios; los CVEs citados vienen de búsquedas web puntuales, no de un SCA automatizado — vale la pena correr uno de verdad (ej. GitHub Dependabot, ya que el repo está en GitHub) para tener cobertura completa y continua.
- No tengo acceso al dashboard de Vercel, así que no pude confirmar si `api/tts.py` es efectivamente alcanzable por su propia URL además de vía el rewrite, ni ver logs reales de abuso/tráfico del endpoint de TTS.
- El informe cubre el código de este branch (`claude/sharp-thompson-5gi0wh`); si el deploy de producción difiere, convendría re-chequear contra ese estado exacto.

---

## Orden sugerido para arreglar (si estás de acuerdo)

1. **A1** (CORS + rate limit del TTS) — es la única que coincide con tu sospecha original y es trivial de explotar hoy.
2. **M1** (tope de longitud en POST) — va de la mano con A1, mismo archivo, mismo momento.
3. **M3** (cabeceras CSP/X-Frame-Options) — barato, buen endurecimiento general.
4. **M2** (unificar `api/index.py`/`api/tts.py`) — limpieza + reduce superficie.
5. **M4/M5/B1/B2/B3** — hardening sin apuro, cuando tengas tiempo.

Decime cuáles confirmás y en qué orden las encaro.
