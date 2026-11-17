// ============================================================
// reader.js — Lector de texto libre
// ============================================================
// Extraído de app.js (fase 5 de modularización, 2026-09-24): el banner
// "pegá texto chino o español y lo lee" — reproducción TTS, cargar una
// lección completa o una lectura de la Biblioteca, y la vista previa
// interlineal (pinyin ruby + colores de tono, palabras tocables que
// abren el popup de vocabulario). Incluye escHtml, el escapador de
// HTML que usa el resto de la app (quedó acá porque es donde vivía en
// app.js; sigue siendo una función global de uso general).
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js/dict.js (usa READER_HANZI y
// getZhSegmenter de dict.js, y voiceZh/fetchTTS/etc. de audio-tts.js,
// en tiempo de ejecución) y expone sus funciones como globales, tal
// como las usaba el resto de la app antes de la extracción.
// ============================================================

// ===== Lector de texto libre (banner): pega chino o español y lo lee =====
const readerAudio = new Audio();
readerAudio.preservesPitch = true;        // mantiene la voz natural a distinta velocidad
readerAudio.webkitPreservesPitch = true;  // Safari
// v9.7x: LECTURA POR TROZOS CON PRECARGA — antes, un texto largo (una
// lección entera) viajaba en UN solo POST a api/tts.py; si la síntesis
// tardaba más que el maxDuration de Vercel (60 s), la función se cortaba,
// el fetch fallaba y el lector caía a la voz del sistema — que a su vez
// tiene un bug conocido de Chrome/Chromium: las utterances largas se
// cortan solas a los ~15 s de habla (~300 caracteres en chino a
// velocidad normal). Ahora el texto se parte en trozos de ~150
// caracteres (alineados a TTS_GET_MAX de audio-tts.js: cada trozo entra
// en el camino GET cacheable por el CDN) y, mientras suena el trozo N,
// ya se pide el trozo N+1 en paralelo — el mismo problema que causó
// descartar la cola por-línea de Podcast (corte audible esperando el
// siguiente) queda resuelto sin ese corte, porque acá NO se espera a
// que termine N para recién pedir N+1.
const READER_CHUNK_TARGET = 150; // chars — igual a TTS_GET_MAX (audio-tts.js)
const READER_SENT_END = '。！？.!?';

// ── Estado del Lector: tres máquinas con tabla de transiciones (state-machine.js, compartido; docs/maquinas-de-estado.md) ──
// readerPlayState y readerActiveEngine siguen existiendo como globales de SOLO LECTURA para quien los mira desde afuera (getters al final del
// bloque; dentro de este archivo se lee la máquina). Para CAMBIAR el estado hay que pasar por MAQUINA.go(estado, evento); una asignación directa la frena tools/check-maquinas.js. readerStopToken NO es estado: identifica
// «una lectura» (invalida callbacks viejos). Si state-machine.js no carga, el respaldo asigna sin validar y el Lector suena igual.
const readerSM = (typeof window.acMachine === 'function') ? window.acMachine : function (name, def) {
    let cur = def.initial; // respaldo: no valida, no registra
    return { name: name, get state() { return cur; }, is: (x) => cur === x, declared: () => true, go(to) { cur = to; return true; } };
};
// Reproducción: lo que ve el usuario en el botón (🔊 Leer | ⏸ Pausar / ▶ Continuar).
const READER_REPRO = readerSM('lector.reproduccion', {
    initial: 'idle', titulo: 'Lector: reproducción',
    rows: [
        { from: 'idle', to: 'playing', ev: 'leer', nota: '🔊 Leer: arranca una lectura nueva' },
        { from: 'playing', to: 'paused', ev: 'pausa', nota: '⏸ Pausar (también mientras carga un trozo)' },
        { from: 'paused', to: 'playing', ev: 'seguir', nota: '▶ Continuar' },
        { from: 'playing', to: 'idle', ev: 'fin', nota: 'se leyó el último trozo' },
        { from: ['playing', 'paused'], to: 'idle', ev: 'corte', nota: 'stopReader(): lo llaman Limpiar, otra lectura/audio de la app (un solo audio a la vez) y toggleReaderPlay() al arrancar' },
        { from: 'paused', to: 'idle', ev: 'fin', known: 'pausa-ignorada', nota: 'si el motor de voz del sistema ignora pause() (la voz sigue y termina sola), el último trozo termina estando en pausa y la lectura vuelve al reposo sin que nadie siga (escenario pausa-voz-ignora-pausa)' }
    ],
    defectos: []
});
// Espera: «⏳ ...» mientras al trozo que toca todavía no le llegó el audio (o su error).
const READER_ESPERA = readerSM('lector.espera', {
    initial: 'libre', titulo: 'Lector: espera del trozo',
    rows: [
        { from: 'libre', to: 'esperando', ev: 'sin-trozo-listo', nota: 'al trozo que toca todavía no le llegó el audio' },
        { from: 'esperando', to: 'libre', ev: 'llego', nota: 'llegó el audio (o el error): se sigue' },
        { from: 'esperando', to: 'libre', ev: 'corte', nota: 'stopReader() mientras esperaba' }
    ]
});
// Motor: cuál está sonando/pausado ahora (decide a quién le habla pausar/continuar).
const READER_MOTOR = readerSM('lector.motor', {
    initial: 'ninguno', titulo: 'Lector: motor de voz',
    rows: [
        { from: ['ninguno', 'speech'], to: 'audio', ev: 'trozo-con-audio', nota: 'el trozo suena con el audio del servidor' },
        { from: ['ninguno', 'audio'], to: 'speech', ev: 'trozo-sin-audio', nota: 'el trozo falló: se lee con la voz del sistema' },
        { from: ['audio', 'speech'], to: 'ninguno', ev: 'fin', nota: 'se leyó el último trozo' },
        { from: ['audio', 'speech'], to: 'ninguno', ev: 'corte', nota: 'stopReader()' }
    ]
});
Object.defineProperty(window, 'readerPlayState', { get() { return READER_REPRO.state; }, configurable: true });
Object.defineProperty(window, 'readerActiveEngine', { get() { const s = READER_MOTOR.state; return s === 'ninguno' ? null : s; }, configurable: true });
let readerChunks = [];             // trozos de texto de la lectura actual
let readerChunkIdx = -1;           // trozo que está sonando (o el último que sonó)
let readerChunkCache = new Map();  // idx -> Promise<{url,data,error}> (fetch en curso o resuelto)
let readerChunkReady = new Map();  // idx -> {url,data,error} YA resuelto (para saber si hay que mostrar "cargando")
let readerStopToken = 0;           // se incrementa en cada stop/nueva lectura: invalida callbacks viejos
let readerMotorPausado = false;    // el pausar le hizo pause() al motor: el «Continuar» (o stopReader) le debe cerrar el par
let readerResume = null;           // resolvedor de «esperando el Continuar»: playReaderChunk lo deja si el trozo llegó con la lectura en pausa (stopReader también lo suelta)
let readerSessionLangCode = null;  // idioma/voz fijados al arrancar esta lectura (igual para todos los trozos)
let readerSessionGender = null;
let readerWantKaraoke = false;     // v9.7x: karaoke ON + texto chino → se piden boundaries reales al server

function detectReaderLang(text) {
    // Si hay CJK (chino simplificado o tradicional) se lee como chino; si no, español
    return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text) ? 'zh' : 'es';
}

function updateReaderLang() {
    const ta = document.getElementById('reader-input');
    const label = document.getElementById('reader-lang');
    if (!ta || !label) return;
    const t = ta.value.trim();
    if (!t) { label.textContent = '🌐 Detectado: —'; return; }
    const lang = detectReaderLang(t);
    label.textContent = (lang === 'zh' ? '🇨🇳 Chino detectado' : '🇪🇸 Español detectado')
        + ' · ' + t.length + '/' + (ta.maxLength || 600);
}

// Parte una "línea" (ya sin \n) en oraciones por puntuación — SOLO se usa
// como red de contención para texto pegado libremente sin saltos de línea
// propios; las lecciones de lessons.js ya vienen una oración por \n (ver
// readerSplitSentences).
function readerSplitLongLine(line) {
    const out = [];
    let buf = '';
    for (const ch of line) {
        buf += ch;
        if (READER_SENT_END.indexOf(ch) !== -1) { out.push(buf.trim()); buf = ''; }
    }
    if (buf.trim()) out.push(buf.trim());
    return out.length ? out : [line];
}

// v9.5x — CORTE DURO: red de contención final para que ningún pedido al
// TTS supere READER_CHUNK_TARGET, pase lo que pase arriba (texto pegado
// sin NINGÚN signo de puntuación, o un tramo entre signos que de por sí
// ya es más largo que el objetivo — ver "Mis lecturas", que entra al
// Lector con ta.value = entry.text y puede traer hasta 5000 caracteres
// sin pasar por el maxlength=1200 del textarea). En chino se corta por
// CARÁCTER (no hay un límite real de "palabra"); en español, por PALABRA
// (nunca a mitad de una) — salvo que una sola palabra ya exceda el
// límite (rarísimo: una cadena/URL pegada), en cuyo caso se la corta por
// caracteres para no perder la garantía de tamaño.
function readerHardSplit(s, limit) {
    if (s.length <= limit) return [s];
    if (detectReaderLang(s) === 'zh') {
        const chars = Array.from(s);
        const out = [];
        for (let i = 0; i < chars.length; i += limit) out.push(chars.slice(i, i + limit).join(''));
        return out;
    }
    const out = [];
    let cur = '';
    s.split(' ').forEach((w) => {
        while (w.length > limit) {
            if (cur) { out.push(cur); cur = ''; }
            out.push(w.slice(0, limit));
            w = w.slice(limit);
        }
        if (cur && (cur.length + 1 + w.length) > limit) { out.push(cur); cur = w; }
        else { cur = cur ? (cur + ' ' + w) : w; }
    });
    if (cur) out.push(cur);
    return out;
}

// Oraciones del texto completo: 1 por \n (ya es así en lessons.js) — las
// líneas anormalmente largas (texto libre sin saltos) se re-parten por
// puntuación china/española, y CUALQUIER tramo que siga pasándose del
// objetivo (con o sin puntuación) se corta duro con readerHardSplit —
// ninguna oración que sale de acá supera READER_CHUNK_TARGET.
function readerSplitSentences(text) {
    const out = [];
    String(text || '').split('\n').forEach((raw) => {
        const line = raw.trim();
        if (!line) return;
        const pieces = (line.length <= 200) ? [line] : readerSplitLongLine(line);
        pieces.forEach((p) => {
            if (!p) return;
            readerHardSplit(p, READER_CHUNK_TARGET).forEach((s) => { if (s) out.push(s); });
        });
    });
    return out;
}

// Agrupa oraciones consecutivas en trozos de ~150 caracteres (nunca corta
// una oración a la mitad); una oración más larga que el objetivo queda
// sola en su propio trozo.
function readerGroupChunks(sentences) {
    const chunks = [];
    let cur = '';
    sentences.forEach((s) => {
        if (cur && (cur.length + 1 + s.length) > READER_CHUNK_TARGET) {
            chunks.push(cur);
            cur = s;
        } else {
            cur = cur ? (cur + '\n' + s) : s;
        }
    });
    if (cur) chunks.push(cur);
    return chunks;
}

// Un intento de pedir el audio de un trozo (usado por readerFetchChunk,
// hasta 2 veces: el intento normal + 1 reintento silencioso).
async function readerFetchOnce(text) {
    // `silent`: el aviso rojo NO sale por un pedido que el reintento puede resolver. Se avisa solo si de verdad se cae a la voz del
    // sistema (notifyTtsFallback, en playReaderChunk). `pedidoCaido` marca los fallos que antes avisaban desde fetchTTS: un error
    // de red o timeout, o una respuesta !ok que NO sea 413/429 (límites propios del servidor: sin aviso, como siempre).
    const response = await fetchTTS(
        ttsBody(text, readerSessionLangCode, readerSessionGender, readerWantKaraoke),
        Math.max(15000, text.length * 50),
        { silent: true }
    ).catch((e) => { if (e && typeof e === 'object') e.pedidoCaido = true; throw e; });
    if (!response.ok) {
        const e = new Error('Error en servidor');
        e.pedidoCaido = response.status !== 413 && response.status !== 429;
        throw e;
    }
    const data = await response.json();
    if (!data.audio) throw new Error('Sin audio');
    const bin = atob(data.audio);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
    return { url, data, error: null };
}

// Pide (o devuelve del caché) el audio de un trozo. Se puede llamar para
// PRECARGAR (nadie espera la promesa todavía) o para reproducir (se
// awaitea) — misma promesa en ambos casos, nunca se pide dos veces.
function readerFetchChunk(idx) {
    if (idx < 0 || idx >= readerChunks.length) return Promise.resolve(null);
    if (readerChunkCache.has(idx)) return readerChunkCache.get(idx);
    const text = readerChunks[idx];
    const p = (async () => {
        try {
            return await readerFetchOnce(text);
        } catch (e) {
            // v9.7x: 1 reintento silencioso antes de resignarse a la voz del
            // sistema — la mayoría de los fallos puntuales de un trozo son
            // baches pasajeros de red o cold-start de la función de Vercel,
            // no un problema real del trozo en sí (reportado: caía a voz
            // robótica "un poco de veces" en artículos de solo ~3 trozos).
            await new Promise((r) => setTimeout(r, 400));
            try {
                return await readerFetchOnce(text);
            } catch (e2) {
                // pedidoCaido: cuenta si CUALQUIERA de los dos intentos fue una caída (red/timeout o !ok que no sea 413/429)
                return { url: null, data: null, error: e2, pedidoCaido: !!((e && e.pedidoCaido) || (e2 && e2.pedidoCaido)) };
            }
        }
    })();
    readerChunkCache.set(idx, p);
    p.then((entry) => { readerChunkReady.set(idx, entry); });
    return p;
}

// Voz del sistema como red de contención PUNTUAL: si el TTS del server
// falla para ESTE trozo, se lee con speechSynthesis y la lectura sigue
// (no se corta toda la lección por un trozo que falló).
function readerSpeakFallback(text, langCode) {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) { resolve(); return; }
        const u = new SpeechSynthesisUtterance(text);
        u.lang = langCode;
        u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
        u.onend = () => resolve();
        u.onerror = () => resolve();
        READER_MOTOR.go('speech', 'trozo-sin-audio');
        KARA.withTts(u, text, u.rate); // no-op si karaoke está OFF o no hay spans preparados
        speechSynthesis.speak(u);
    });
}

function readerAudioEnded() {
    return new Promise((resolve) => {
        const onend = () => { cleanup(); resolve(); };
        const onerr = () => { cleanup(); resolve(); };
        function cleanup() {
            readerAudio.removeEventListener('ended', onend);
            readerAudio.removeEventListener('error', onerr);
        }
        readerAudio.addEventListener('ended', onend, { once: true });
        readerAudio.addEventListener('error', onerr, { once: true });
    });
}

function readerFinishPlayback() {
    READER_REPRO.go('idle', 'fin');
    READER_MOTOR.go('ninguno', 'fin');
    readerChunkIdx = -1;
    const btn = document.getElementById('btn-reader-play');
    if (btn) { btn.textContent = '🔊 Leer'; btn.disabled = false; }
}

// Resuelve cuando la lectura NO está en pausa (de inmediato si ya no lo está). toggleReaderPlay() la suelta al «Continuar»; stopReader(), al cortar.
function readerWaitWhilePaused() {
    if (!READER_REPRO.is('paused')) return Promise.resolve();
    return new Promise((resolve) => { readerResume = () => { readerResume = null; resolve(); }; });
}

function readerAdvanceAfterChunk(idx, myToken) {
    if (myToken !== readerStopToken) return;
    const nextIdx = idx + 1;
    if (nextIdx >= readerChunks.length) { readerFinishPlayback(); return; }
    const btn = document.getElementById('btn-reader-play');
    // Solo se muestra "cargando" si de verdad el siguiente trozo no está
    // listo — con trozos de ~150 caracteres, lo normal es que ya lo esté.
    if (btn && !readerChunkReady.has(nextIdx) && !READER_REPRO.is('paused')) btn.textContent = '⏳ ...'; // en pausa el botón sigue diciendo «Continuar»
    playReaderChunk(nextIdx, myToken);
}

async function playReaderChunk(idx, myToken) {
    if (myToken !== readerStopToken) return;
    readerChunkIdx = idx;
    if (!readerChunkReady.has(idx)) READER_ESPERA.go('esperando', 'sin-trozo-listo');
    const entry = await readerFetchChunk(idx);
    if (myToken !== readerStopToken) return; // (si hubo corte, stopReader() ya dejó la espera libre)
    READER_ESPERA.go('libre', 'llego');
    // R2: si la lectura se pausó mientras el trozo cargaba, NADA suena ni se avisa hasta el «Continuar» (ni audio, ni voz del sistema, ni aviso rojo, ni karaoke)
    await readerWaitWhilePaused();
    if (myToken !== readerStopToken) return;

    const btn = document.getElementById('btn-reader-play');
    // v9.7x: karaoke — el contenedor de este trozo en la vista previa es
    // exactamente el <div class="reader-line" data-chunk="idx"> que arma
    // renderReaderPreview() con la MISMA función de agrupamiento que acá
    // (readerGroupChunks). KARA.prepare no-opea si el karaoke está OFF o
    // no hay spans .lq-ch (texto en español, por ejemplo).
    const lineEl = document.querySelector('#reader-preview [data-chunk="' + idx + '"]');
    if (lineEl) KARA.prepare(lineEl);

    if (!entry || entry.error || !entry.url) {
        // El aviso rojo sale AQUÍ, cuando de verdad se lee con la voz del sistema (y solo si el trozo falló por una caída del servidor).
        if (entry && entry.pedidoCaido && typeof notifyTtsFallback === 'function') notifyTtsFallback();
        await readerSpeakFallback(readerChunks[idx], readerSessionLangCode);
        if (myToken !== readerStopToken) return;
        readerAdvanceAfterChunk(idx, myToken);
        return;
    }

    READER_MOTOR.go('audio', 'trozo-con-audio');
    readerAudio.src = entry.url;
    applyTtsSpeed(readerAudio, entry.data); // v9.40: velocidad en el server → sin eco
    KARA.withAudio(readerAudio, readerChunks[idx], entry.data && entry.data.boundaries, idx);
    if (btn) { btn.textContent = '⏸ Pausar'; btn.disabled = false; }

    const ended = readerAudioEnded();
    try { await readerAudio.play(); } catch (e) { /* autoplay bloqueado: seguimos igual */ }
    if (myToken !== readerStopToken) return;

    // Precarga del trozo N+1 apenas arranca N — NO se espera a "ended"
    // (ese es justo el patrón que se descartó en Podcast por el corte
    // audible entre trozos).
    readerFetchChunk(idx + 1);

    await ended; // nunca se resuelve solo por pausar (pause() no dispara 'ended')
    if (myToken !== readerStopToken) return;
    readerAdvanceAfterChunk(idx, myToken);
}

function stopReader() {
    readerStopToken++;
    readerMotorPausado = false;
    if (readerResume) readerResume(); // suelta a un playReaderChunk que esperaba el «Continuar»: al ver el token nuevo, se va
    KARA.stop(); // v9.7x: apaga el resaltado si estaba activo (no-op si ya estaba parado)
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    readerAudio.pause();
    try { readerAudio.currentTime = 0; } catch (e) { /* sin src válido */ }
    if (readerAudio.src && readerAudio.src.startsWith('blob:')) URL.revokeObjectURL(readerAudio.src);
    readerAudio.removeAttribute('src');
    readerChunkCache.forEach((p) => {
        p.then((entry) => { if (entry && entry.url) { try { URL.revokeObjectURL(entry.url); } catch (e) { /* ya liberada */ } } });
    });
    readerChunkCache.clear();
    readerChunkReady.clear();
    readerChunks = [];
    readerChunkIdx = -1;
    READER_REPRO.go('idle', 'corte');
    READER_MOTOR.go('ninguno', 'corte');
    READER_ESPERA.go('libre', 'corte');
    const btn = document.getElementById('btn-reader-play');
    if (btn) { btn.textContent = '🔊 Leer'; btn.disabled = false; }
}

async function toggleReaderPlay() {
    const btn = document.getElementById('btn-reader-play');
    if (!btn) return;

    if (READER_REPRO.is('playing')) {
        // R2b: mientras carga un trozo NO suena nada (el motor que quedó marcado es el del trozo anterior): no se le pide pausa a ningún motor
        if (!READER_ESPERA.is('esperando')) {
            if (READER_MOTOR.is('speech')) { if ('speechSynthesis' in window) speechSynthesis.pause(); }
            else { readerAudio.pause(); }
            readerMotorPausado = true; // el «Continuar» le debe el resume() (se cierra el par pause/resume)
        }
        READER_REPRO.go('paused', 'pausa');
        btn.textContent = '▶ Continuar';
        return;
    }
    if (READER_REPRO.is('paused')) {
        READER_REPRO.go('playing', 'seguir');
        const motorPausado = readerMotorPausado; readerMotorPausado = false;
        // R2b: si el trozo sigue cargando no hay nada que reanudar: el botón vuelve a «⏳ ...» y el trozo arranca solo al llegar (antes se repetía el anterior)
        btn.textContent = (READER_ESPERA.is('esperando') && !readerResume) ? '⏳ ...' : '⏸ Pausar';
        // si el pausar le hizo pause() a la voz del sistema, el «Continuar» le debe SIEMPRE el resume() (se cierra el par), también cuando no hay nada que reanudar
        const cerrarParDeVoz = () => { if (motorPausado && READER_MOTOR.is('speech') && 'speechSynthesis' in window) speechSynthesis.resume(); };
        if (readerResume) { // el trozo ya había llegado y esperaba: arranca él (no se le pide play() al audio viejo)
            cerrarParDeVoz();
            readerResume();
            return;
        }
        if (READER_ESPERA.is('esperando')) { cerrarParDeVoz(); return; }
        if (READER_MOTOR.is('speech')) { if ('speechSynthesis' in window) speechSynthesis.resume(); }
        else { try { await readerAudio.play(); } catch (e) { /* nada que reanudar */ } }
        return;
    }

    // idle → arranca una lectura nueva desde el principio
    const ta = document.getElementById('reader-input');
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) { ta.focus(); return; }

    stopReader(); // por si quedó algo de una lectura anterior
    // Un solo audio a la vez: cortar voz del sistema, tarjeta y lector
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (isPlaying && activeBtn) { restoreButton(); isPlaying = false; }
    if (globalAudioPlayer.src) {
        globalAudioPlayer.onended = null;
        globalAudioPlayer.pause();
        globalAudioPlayer.removeAttribute('src');
    }

    const lang = detectReaderLang(text);
    const gender = lang === 'zh' ? voiceZh : voiceEs; // usa la voz elegida en los botones 👩/👨
    readerSessionGender = gender;
    readerSessionLangCode = ttsLangFor(lang, gender); // v9.49: la voz manda (🇦🇷 es-AR · 🇹🇼 zh-TW)
    readerWantKaraoke = (lang === 'zh') && KARA.on(); // v9.7x: solo pide boundaries si hacen falta

    readerChunks = readerGroupChunks(readerSplitSentences(text));
    if (!readerChunks.length) { ta.focus(); return; }

    READER_REPRO.go('playing', 'leer');
    btn.textContent = '⏳ ...';
    btn.disabled = false;
    const myToken = readerStopToken;
    playReaderChunk(0, myToken); // no se espera: la cadena de trozos sigue sola
}

// v9.7x: chip ⚡ de velocidad — mismo patrón chico que bindSpeedChip en
// podcast.js/lessons-graduated.js: muestra y cambia la MISMA velocidad
// global (playbackSpeed/cycleSpeed de audio-tts.js), sin selector nuevo.
function readerSpeedLabel() {
    return '⚡ ' + ((typeof playbackSpeed === 'number') ? playbackSpeed : 1) + 'x';
}
function bindReaderSpeedChip(btn) {
    if (!btn) return;
    btn.textContent = readerSpeedLabel();
    btn.title = 'Velocidad de la lectura: la MISMA que elegís con ⚡ en la tarjeta';
    btn.addEventListener('click', () => {
        if (typeof cycleSpeed === 'function') cycleSpeed();
        btn.textContent = readerSpeedLabel();
    });
}

function clearReader() {
    const ta = document.getElementById('reader-input');
    stopReader();
    if (ta) { ta.value = ''; ta.focus(); }
    updateReaderLang();
    renderReaderPreview();
}

// ===== v7.14/v7.15: LEER LA LECCIÓN COMPLETA + BIBLIOTECA =====
// Los textos viven en lessons.js (archivo plano de datos, patrón
// dict-mini.js) — agregar lecciones o secciones nuevas NO toca app.js:
// solo se agrega una entrada al array de LESSONS_DATA.
// Mapeo oración → lección:
//   · L.ids contiene s.id    → SECCIÓN / capítulo (coincidencia
//     específica — v7.15: GANA sobre el módulo entero)
//   · L.module === s.module  → el módulo entero es la lección
//   · L.status === 'planned' → plantada sin texto: solo Biblioteca
function lessonForSentence(s) {
    if (!s || typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) return null;
    const list = LESSONS_DATA.lessons;
    let exact = null, broad = null;
    for (let i = 0; i < list.length; i++) {
        const L = list[i];
        if (L.status === 'planned') continue; // plantada: sin texto, solo Biblioteca
        if (Array.isArray(L.ids) && L.ids.indexOf(s.id) !== -1) {
            if (!exact) exact = L;
        } else if (L.module && s.module === L.module) {
            if (!broad) broad = L;
        }
    }
    return exact || broad; // la sección (específica) gana sobre el módulo
}

// v7.15: vuelca el texto de una lección/sección en el Lector y avisa.
// Devuelve true si cargó texto (las plantadas avisan y devuelven false).
function fillReaderWithLesson(lesson) {
    const k = (typeof scriptFor === 'function') ? scriptFor('hsk') : ck(); // v9.7x: Lector = "HSK y el resto"
    const text = (k === 'trad' ? (lesson.text_trad || lesson.text_simp)
                               : (lesson.text_simp || lesson.text_trad)) || '';
    if (!text) {
        moduleStatus('📝 "' + (lesson.title || lesson.id) + '" todavía no tiene texto — está plantada para rellenar.');
        return false;
    }

    const ta = document.getElementById('reader-input');
    if (!ta) return false;

    stopReader(); // regla "un solo audio" — si el lector estaba sonando, se corta
    ta.value = text;
    if (typeof updateReaderLang === 'function') updateReaderLang();
    if (typeof renderReaderPreview === 'function') renderReaderPreview();

    // Bajar al lector + destello para que se entienda de dónde salió el texto
    const banner = document.getElementById('reader-banner');
    if (banner && banner.scrollIntoView) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
        banner.classList.remove('lesson-glow');
        void banner.offsetWidth; // reinicia la animación si ya estaba
        banner.classList.add('lesson-glow');
        setTimeout(() => banner.classList.remove('lesson-glow'), 2500);
    }

    const chars = text.replace(/\n/g, '').length;
    moduleStatus('📖 Leyendo: ' + (lesson.title || lesson.id) + ' · ' + chars + ' caracteres en el Lector');
    return true;
}

// Carga el texto de la lección/sección de la oración actual en el Lector
// (pinyin interlineal, tonos, diccionario al toque y lectura en voz alta).
async function readCurrentLesson() {
    if (state.mode !== 'es-cn') {
        moduleStatus('ℹ️ La lectura completa está disponible en modo "Aprendo Chino".');
        return;
    }
    const filtered = getFiltered();
    const s = filtered && filtered[state.currentIndex];
    if (!s) return;

    // v9.2: los CLÁSICOS abren su lector propio (texto original por bloques,
    // como las lecciones) en el bloque donde vive la frase practicada — ya no
    // vuelcan la concatenación de oraciones de práctica en el Lector.
    if (s.module && String(s.module).indexOf('Clasicos-') === 0 && typeof window.CR_open === 'function') {
        if (window.CR_open(s.module, s)) return;
    }

    if (typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) {
        moduleStatus('⚠ No se pudo cargar lessons.js — revisá que el archivo esté subido.', true);
        return;
    }

    const lesson = lessonForSentence(s);
    if (!lesson) {
        moduleStatus('ℹ️ Esta oración no pertenece a un texto continuo.');
        return;
    }

    fillReaderWithLesson(lesson);
}

// ===== v7.15: BIBLIOTECA DE LECTURAS (en el Lector) =====
// Un <select> + botón Cargar: cualquier lectura o sección de lessons.js
// se puede leer SIN estar estudiando ese módulo. Las plantadas
// (status 'planned') aparecen como "· próximamente" deshabilitadas.
function buildReaderLibrary() {
    const sel = document.getElementById('reader-library');
    if (!sel) return;
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = '';
    ph.textContent = '📚 Elegí una lectura…';
    sel.appendChild(ph);

    if (typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) {
        sel.disabled = true;
        return;
    }
    sel.disabled = false;

    // Orden del archivo = orden del autor; un óptgroup por 'group'
    // v9.7x: el "texto completo" de cada clásico (L.module = 'Clasicos-*')
    // queda AFUERA de esta Biblioteca — "Cargar" promete llenar el Lector y
    // esos ítems en realidad abrían un popup aparte (el Lector de Clásicos,
    // CR_open), sin tocar el Lector para nada. Siguen 100% disponibles
    // desde Aprender → 📜 Clásicos, que es su lector propio. Las SECCIONES
    // de cada clásico (sanzijing-s1, daodejing-01, etc.) no tienen `module`
    // y sí cargan texto real en el Lector, así que esas quedan.
    const groups = [];
    const byGroup = {};
    LESSONS_DATA.lessons.forEach(L => {
        if (L.module && String(L.module).indexOf('Clasicos-') === 0) return;
        const g = L.group || 'Lecturas';
        if (!byGroup[g]) { byGroup[g] = []; groups.push(g); }
        byGroup[g].push(L);
    });
    // v10 UX: las plantadas (status 'planned') van juntas al final, en un
    // solo grupo "En preparación (N)", para no ocupar espacio de decisión.
    const planned = [];
    groups.forEach(g => {
        const og = document.createElement('optgroup');
        og.label = g;
        byGroup[g].forEach(L => {
            if (L.status === 'planned') { planned.push(L); return; }
            const o = document.createElement('option');
            o.value = L.id;
            o.textContent = L.label || L.title;
            og.appendChild(o);
        });
        if (og.childElementCount) sel.appendChild(og);
    });
    if (planned.length) {
        const pg = document.createElement('optgroup');
        pg.label = '🔜 En preparación (' + planned.length + ')';
        planned.forEach(L => {
            const o = document.createElement('option');
            o.value = L.id;
            o.disabled = true;
            o.textContent = (L.label || L.title) + ' · próximamente';
            pg.appendChild(o);
        });
        sel.appendChild(pg);
    }
}

// Carga en el Lector la lectura elegida en la Biblioteca
function loadLibraryLesson() {
    const sel = document.getElementById('reader-library');
    if (!sel || !sel.value) {
        moduleStatus('📚 Elegí una lectura de la Biblioteca primero.');
        return;
    }
    if (typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) {
        moduleStatus('⚠ No se pudo cargar lessons.js — revisá que el archivo esté subido.', true);
        return;
    }
    let L = null;
    for (let i = 0; i < LESSONS_DATA.lessons.length; i++) {
        if (LESSONS_DATA.lessons[i].id === sel.value) { L = LESSONS_DATA.lessons[i]; break; }
    }
    if (!L) {
        moduleStatus('⚠ No encontré esa lectura en lessons.js.', true);
        return;
    }
    // v9.7x: el "texto completo" de los clásicos (L.module) ya no aparece en
    // esta Biblioteca (ver buildReaderLibrary) — todo lo que llega acá tiene
    // texto propio para el Lector.
    fillReaderWithLesson(L);
}

// ===== Lector: vista previa con pinyin y colores de tono =====
// Reutiliza los toggles 📖 Pinyin y 🎨 Tonos de la app (y pinyin-pro)
function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===== v7.9: LECTOR INTERLINEAL =====
// Cambios clave vs v7.8 (dos filas planas pinyin/hanzi):
//  1. El texto chino se renderiza POR PALABRA (Intl.Segmenter): cada hanzi
//     lleva su pinyin DEBAJO (columnas ruby interlineales, como libro de texto).
//  2. Cada palabra es TOCABLE → abre el popup de vocabulario (#vocab-pop, el
//     mismo del cajón de palabras aprendidas). Base para Opción B/C.
//  3. Los toggles siguen mandando: 📖 Pinyin OFF oculta la fila de abajo;
//     🎨 Tonos ON colorea hanzi y pinyin (clases tone-1..5 existentes).
//  4. El pinyin se calcula POR SEGMENTO (no sobre el texto completo): la
//     alineación carácter↔pinyin queda garantizada dentro de cada palabra y
//     desaparece el problema de sincronizar el array global de pinyin-pro
//     con los límites de palabra del Segmenter. Cache por palabra: pinyin-pro
//     es lookup de diccionario y las palabras repetidas dominan el texto real.
const _readerPyCache = new Map();   // segmento → items|null (memoria de sesión)
// Puntuación que NO debe arrancar renglón: se pega dentro de la palabra anterior
const READER_STICKY = /[，。！？、；：…—·（）()《》〈〉「」『』,.!?;:]/;

function readerSegmentLine(line) {
    // Palabras naturales del chino (你好 = 1 palabra); fallback: carácter a carácter.
    // v7.10: comparte la ÚNICA instancia de Intl.Segmenter con el diccionario.
    // v9.7x: con respaldo por diccionario cuando el navegador corta suelto (Android).
    if (typeof zhSegmentAll === 'function') return zhSegmentAll(line);
    const seg = getZhSegmenter();
    if (seg) {
        try { return Array.from(seg.segment(line), s => s.segment); } catch (e) { /* cae al fallback */ }
    }
    return Array.from(line);
}

function readerPinyinItems(word) {
    // items 1:1 con los caracteres del segmento: [{origin, pinyin, num, isZh}, ...]
    if (_readerPyCache.has(word)) return _readerPyCache.get(word);
    let items = null;
    try {
        if (typeof pinyinPro !== 'undefined' && READER_HANZI.test(word)) {
            // v9.7x: pinyinItemsFor (pinyin-familias.js) pasa un texto pegado en
            // tradicional a simplificado SOLO para generar el pinyin (她還在家 → hái);
            // el texto que se muestra no cambia.
            const all = (typeof pinyinItemsFor === 'function') ? pinyinItemsFor(word, 'hsk') : pinyinPro.pinyin(word, { type: 'all' });
            if (all && all.length) items = all;
        }
    } catch (e) { items = null; }
    _readerPyCache.set(word, items);
    return items;
}

function readerWordCols(word, wantPinyin, wantTones, lineItems) {
    // Columnas ruby de una palabra; si items no aligna 1:1 → degrada a sin pinyin
    // v9.7x: lineItems = el pinyin de ESTA palabra sacado de la línea entera
    // (con contexto: 我要還書 → huán); si no vino, se calcula por palabra.
    const items = (wantPinyin || wantTones) ? (lineItems || readerPinyinItems(word)) : null;
    const chars = Array.from(word);
    const useItems = !!(items && items.length === chars.length);
    let cols = '';
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const it = useItems ? items[i] : null;
        const isZhChar = !!(it && it.isZh);
        const toneCls = (wantTones && isZhChar) ? ' tone-' + (it.num || 5) : '';
        // v9.7x: lq-ch (+ data-ch) — el mismo contrato que usan classics-reader.js/
        // lessons-graduated.js para que KARA (karaoke.js) pueda resaltar acá también.
        let col = '<span class="ruby-col"><span class="ruby-char lq-ch' + toneCls + '" data-ch="' + escHtml(ch) + '">' + escHtml(ch) + '</span>';
        if (wantPinyin && isZhChar) col += '<span class="ruby-py' + toneCls + '">' + escHtml(it.pinyin || ch) + '</span>';
        col += '</span>';
        cols += col;
    }
    return cols;
}

function renderZhLineHtml(line, wantPinyin, wantTones) {
    const segs = readerSegmentLine(line);
    const out = [];
    let lastWord = null;    // palabra en construcción (para pegarle puntuación)
    // v9.7x: pinyin de la línea completa (pinyin-familias.js), repartido por palabra
    let lineItems = null;
    try {
        if ((wantPinyin || wantTones) && typeof pinyinItemsFor === 'function') lineItems = pinyinItemsFor(line, 'hsk');
    } catch (e) { lineItems = null; }
    let off = 0;            // posición (en caracteres) del segmento dentro de la línea
    const flush = () => {
        if (!lastWord) return;
        out.push('<span class="reader-word" data-word="' + escHtml(lastWord.text) + '">'
            + lastWord.cols + lastWord.punct + '</span>');
        lastWord = null;
    };

    for (const seg of segs) {
        if (!seg) continue;
        const n = Array.from(seg).length;
        const segItems = (lineItems && lineItems.length === Array.from(line).length) ? lineItems.slice(off, off + n) : null;
        off += n;
        if (READER_HANZI.test(seg)) {
            flush();
            lastWord = { text: seg, cols: readerWordCols(seg, wantPinyin, wantTones, segItems), punct: '' };
        } else if (lastWord && seg.length === 1 && READER_STICKY.test(seg)) {
            // puntuación pegada a la palabra anterior (columna propia, sin pinyin)
            lastWord.punct += '<span class="ruby-col ruby-punct"><span class="ruby-char">' + escHtml(seg) + '</span></span>';
        } else {
            flush();
            out.push('<span class="reader-non-zh">' + escHtml(seg) + '</span>');
        }
    }
    flush();
    return out.join('');
}

// v7.10: tokeniza una línea en ESPAÑOL envolviendo cada palabra en un span
// tocable (.reader-word-plain = mismo popup, visual plano sin ruby).
// Los números solos quedan como texto (no hay nada que traducir).
function readerEsLineHtml(line) {
    let out = '';
    let last = 0;
    const re = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g;
    let m;
    while ((m = re.exec(line))) {
        if (m.index > last) out += escHtml(line.slice(last, m.index));
        out += '<span class="reader-word reader-word-plain" data-word="' + escHtml(m[0]) + '">' + escHtml(m[0]) + '</span>';
        last = m.index + m[0].length;
    }
    out += escHtml(line.slice(last));
    return out;
}

function renderReaderPreview() {
    const prev = document.getElementById('reader-preview');
    if (!prev) return;
    const ta = document.getElementById('reader-input');
    const text = (ta && ta.value ? ta.value : '').trim();
    const wantPinyin = state.showPinyin;
    const wantTones = showToneColors;

    // Sin texto → placeholder (el box se descubre desde el arranque)
    if (!text) {
        prev.innerHTML = '<span class="reader-placeholder">Pegá texto chino o español acá… con chino verás el pinyin debajo de cada carácter y podés tocar cualquier palabra.</span>';
        prev.classList.remove('hidden');
        return;
    }

    // Español / no-chino → texto plano con saltos; SIN ruby pero con palabras
    // tocables (v7.10): el mismo popup de vocabulario sirve también en CN→ES.
    if (detectReaderLang(text) !== 'zh') {
        prev.innerHTML = '<div class="reader-es">' + text.split('\n').map(readerEsLineHtml).join('<br>') + '</div>';
        prev.classList.remove('hidden');
        return;
    }

    // Chino sin librería (CDN caído y sin precache) → plano legible, nunca romper
    if (typeof pinyinPro === 'undefined') {
        prev.innerHTML = '<div class="reader-hz">' + escHtml(text).replace(/\n/g, '<br>') + '</div>';
        prev.classList.remove('hidden');
        return;
    }

    try {
        // v9.7x: se agrupa por TROZO (mismo readerGroupChunks/readerSplitSentences
        // que usa la reproducción) en vez de una línea por \n — así cada bloque de
        // la vista previa es exactamente el contenedor que KARA necesita para
        // resaltar un trozo completo (spansOf busca .lq-ch dentro de UN elemento).
        const chunks = readerGroupChunks(readerSplitSentences(text));
        prev.innerHTML = chunks.map((chunkText, ci) =>
            '<div class="reader-line" data-chunk="' + ci + '">'
                + chunkText.split('\n').map((l) => l ? renderZhLineHtml(l, wantPinyin, wantTones) : '&nbsp;').join('<br>')
                + '</div>'
        ).join('');
        prev.classList.remove('hidden');
    } catch (e) {
        console.warn('Lector: error renderizando interlineal:', e);
        prev.innerHTML = '<div class="reader-hz">' + escHtml(text).replace(/\n/g, '<br>') + '</div>';
        prev.classList.remove('hidden');
    }
}

