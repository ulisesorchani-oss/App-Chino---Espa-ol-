/* ============================================================
   VoiceRecorder.js — v7.5 Módulo de Grabación y Evaluación de
   Pronunciación para Chino ⇄ Español
   ------------------------------------------------------------
   ARQUITECTURA (encapsulada, sin tocar la app existente):
     · Clase VoiceRecorder  → getUserMedia + MediaRecorder +
       medidor de nivel (waveform) + límite de tiempo.
     · blobToWav16k()       → convierte lo grabado a WAV PCM
       16 kHz mono 16-bit (el "estándar de oro" para APIs de
       evaluación fonética: SuperSpeech, Azure, Google…).
     · LiveRecognizer       → Web Speech API (SpeechRecognition)
       en zh-CN capturada DURANTE la grabación (FASE 1, gratis).
     · evaluatePronunciation(audioBlob, targetText) → adaptador
       que devuelve SIEMPRE un objeto estandarizado:
           { score: 0-100|null, feedback, wordScores, ... }
       FASE 2 (premium): basta cambiar EVAL_CONFIG.provider —
       la UI no se reescribe (ver "FASE 2" más abajo).
     · window.VR → controlador de UI (botón 🎤 + panel bajo la
       tarjeta). app.js solo llama VR.setTarget(texto) por oración.
   ------------------------------------------------------------
   PRIVACIDAD: el audio vive solo en memoria (nunca localStorage
   ni servidor) y se libera al cambiar de oración o grabar de
   nuevo. FASE 1 funciona 100% local (comparación en el propio
   navegador).
   ============================================================ */
(function () {
'use strict';

/* ============================================================
   CONFIG DE EVALUACIÓN — el único lugar que se toca en FASE 2
   ============================================================ */
const EVAL_CONFIG = {
    // FASE 1 (hoy, gratis y sin servidor): 'webspeech'
    // FASE 2 (futuro premium, ver stubs abajo):
    //   'whisper-serverless' | 'azure' | 'superspeech'
    provider: 'webspeech',

    // FASE 2 — descomentar y completar cuando se contrate el servicio:
    // whisperEndpoint: 'https://app-chino-espa-ol.vercel.app/api/pron-eval',
    // azure: { host: '<region>.stt.speech.microsoft.com', key: 'EN VERCEL, NO ACÁ' },
    // superspeech: { appId: '...' },

    maxSeconds: 20,          // límite por grabación (15–20 s → archivos livianos)
    targetSampleRate: 16000, // WAV de salida (16 kHz mono 16-bit)
    goodThreshold: 80        // ≥80 → "bien" (regla del enunciado)
};

/* ============================================================
   TEXTOS BILINGÜES (ES para alumnos hispanos + zh para apoyo)
   ============================================================ */
const T = {
    hintTap:    '👆 Tocá 🎤 para grabar tu pronunciación',
    hintRec:    '🔴 Grabando… tocá 🎤 para terminar (máx 20 s)',
    hintProc:   '🎯 Evaluando tu pronunciación… 正在评估发音',
    listening:  '🎧 Compará tu grabación con el audio CN',
    privacy:    '🔒 Tu voz se procesa localmente y no se guarda · 你的声音只在设备上处理，不会保存',

    errDenied:  '🎤 Permiso de micrófono denegado. Tocá el candado 🔒 de la barra de direcciones y permití el micrófono.',
    errNoMic:   '🎤 No encontré micrófono en este dispositivo.',
    errBusy:    '🎤 El micrófono está ocupado (¿otra app lo está usando?). Cerrala e intentalo de nuevo.',
    errSupport: '🎤 Tu navegador no soporta grabación. Probá con Chrome o con Safari actualizado.',
    errSecure:  '🎤 La grabación necesita HTTPS (o localhost). Abri la app en su dirección oficial.',
    errGeneric: '🎤 No pude grabar. Intentalo otra vez.',

    manEs: '🎧 Escuchá tu grabación y comparala con el audio CN',
    manZh: '🎧 听一听你的录音，跟中文音频对比',
    manNote: 'Este navegador no permite evaluar automáticamente — para practicar sirve igual.',

    againBtn: '🔁 Grabar de nuevo',
    playBtn:  '▶️ Escuchar mi grabación',
    stopBtn:  '⏸ Pausar'
};

/* ============================================================
   CLASE VoiceRecorder — captura encapsulada del micrófono
   ============================================================ */
class VoiceRecorder {
    constructor(opts) {
        opts = opts || {};
        this.maxSeconds = opts.maxSeconds || EVAL_CONFIG.maxSeconds;
        this._stream = null;
        this._recorder = null;
        this._chunks = [];
        this._ctx = null;
        this._analyser = null;
        this._timerId = null;
        this._startedAt = 0;
        this.recording = false;
        this.mime = '';
    }

    static pickMime() {
        if (typeof MediaRecorder === 'undefined') return '';
        // Preferencia: WebM/Opus (Chrome/Android) → MP4/AAC (iOS Safari) → OGG (Firefox)
        const candidates = ['audio/webm;codecs=opus', 'audio/webm',
                            'audio/mp4', 'audio/ogg;codecs=opus'];
        for (const m of candidates) {
            try { if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) return m; }
            catch (e) { /* sigue con el próximo */ }
        }
        return ''; // el navegador elige el default
    }

    static supported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia &&
                  typeof MediaRecorder !== 'undefined');
    }

    /** Abre el micro, empieza a grabar. onTick(seconds) avanza el temporizador. */
    async start(onTick) {
        if (this.recording) return;
        if (!VoiceRecorder.supported()) { const e = new Error('unsupported'); e.name = 'UnsupportedBrowser'; throw e; }

        const constraints = {
            audio: {
                channelCount: 1,        // mono (requisito de las APIs de evaluación)
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        };
        // iOS Safari: getUserMedia debe llamarse dentro del gesto del usuario —
        // start() siempre se invoca desde el click del botón 🎤.
        this._stream = await navigator.mediaDevices.getUserMedia(constraints);

        // AudioContext + AnalyserNode SOLO para el medidor de nivel (waveform).
        const AC = window.AudioContext || window.webkitAudioContext;
        try {
            this._ctx = new AC();
            if (this._ctx.state === 'suspended' && this._ctx.resume) await this._ctx.resume();
            const src = this._ctx.createMediaStreamSource(this._stream);
            this._analyser = this._ctx.createAnalyser();
            this._analyser.fftSize = 512;
            src.connect(this._analyser);
        } catch (e) { this._analyser = null; } // sin waveform igual graba

        this.mime = VoiceRecorder.pickMime();
        this._chunks = [];
        this._lastResult = null;
        try {
            this._recorder = this.mime ? new MediaRecorder(this._stream, { mimeType: this.mime })
                                       : new MediaRecorder(this._stream);
        } catch (e) {
            this._cleanup();
            throw e;
        }
        this._recorder.ondataavailable = (ev) => { if (ev.data && ev.data.size) this._chunks.push(ev.data); };

        this._stoppedByUser = false;
        this._stopPromise = new Promise((resolve) => { this._resolveStop = resolve; });
        this._recorder.onstop = () => {
            const type = this._recorder.mimeType || this.mime || 'audio/webm';
            const blob = new Blob(this._chunks, { type: type.split(';')[0] });
            this._cleanup();
            this.recording = false;
            this._lastResult = { blob: blob, seconds: (Date.now() - this._startedAt) / 1000, mime: type };
            resolve(this._resolveStop, this._lastResult);
        };

        this._startedAt = Date.now();
        this.recording = true;
        this._recorder.start(250); // chunks cada 250 ms

        // Temporizador visible + límite de tiempo (auto-stop a los 20 s)
        if (typeof onTick === 'function') {
            this._timerId = setInterval(() => {
                const s = (Date.now() - this._startedAt) / 1000;
                onTick(Math.floor(s));
            }, 200);
        }
        this._autoStop = setTimeout(() => {
            this.stop().then((res) => { if (typeof this.onAutoStop === 'function') this.onAutoStop(res); })
                       .catch(() => {});
        }, this.maxSeconds * 1000 + 300);
        return true;
    }

    /** Corta la grabación y devuelve { blob, seconds, mime }.
     *  Idempotente: si ya cortó (ej. auto-stop), devuelve ese mismo resultado. */
    async stop() {
        if (!this._recorder) return null;
        clearTimeout(this._autoStop);
        clearInterval(this._timerId);
        if (!this.recording) return this._lastResult || null;
        try { if (this._recorder.state !== 'inactive') this._recorder.stop(); } catch (e) { this._cleanup(); }
        return await this._stopPromise;
    }

    /** Aborta sin devolver nada (navegación a otra oración, etc.). */
    abort() {
        clearTimeout(this._autoStop);
        clearInterval(this._timerId);
        this._resolveStop = null;
        try { if (this._recorder && this._recorder.state !== 'inactive') this._recorder.abort(); } catch (e) {}
        this._cleanup();
        this.recording = false;
    }

    /** Niveles 0..1 para la waveform (n barras). No lanza si no hay analizador. */
    levels(n) {
        const out = new Array(n || 24).fill(0);
        if (!this._analyser || !this.recording) return out;
        const buf = new Uint8Array(this._analyser.fftSize);
        try { this._analyser.getByteTimeDomainData(buf); } catch (e) { return out; }
        const step = Math.floor(buf.length / out.length);
        for (let i = 0; i < out.length; i++) {
            let peak = 0;
            for (let j = i * step; j < (i + 1) * step && j < buf.length; j++) {
                const d = Math.abs(buf[j] - 128);
                if (d > peak) peak = d;
            }
            out[i] = Math.min(1, peak / 96);
        }
        return out;
    }

    _cleanup() {
        clearInterval(this._timerId); this._timerId = null;
        clearTimeout(this._autoStop); this._autoStop = null;
        try { if (this._analyser) this._analyser.disconnect(); } catch (e) {}
        try { if (this._ctx && this._ctx.state !== 'closed') this._ctx.close(); } catch (e) {}
        this._ctx = null; this._analyser = null;
        try { if (this._stream) this._stream.getTracks().forEach((t) => t.stop()); } catch (e) {}
        this._stream = null;
    }
}

function resolve(fn, val) { if (typeof fn === 'function') fn(val); }

/* ============================================================
   WAV 16 kHz mono 16-bit — el formato que piden las APIs
   de evaluación fonética (16bit + 16kHz + mono)
   ============================================================ */
async function blobToWav16k(blob) {
    const AC = window.AudioContext || window.webkitAudioContext;
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AC || !OAC) throw new Error('no-audiocontext');

    const arr = await blob.arrayBuffer();
    let decoded;
    try {
        // Contexto temporal SOLO para decodificar (se cierra → sin fugas).
        // arr.slice(0): Safari requiere un buffer exclusivo para decodeAudioData.
        const c = new AC();
        try {
            decoded = await new Promise((res, rej) => {
                const p = c.decodeAudioData(arr.slice(0), res, rej);
                if (p && p.then) p.then(res, rej); // navegadores con versión promisificada
            });
        } finally { try { c.close(); } catch (e2) {} }
    } catch (e) { throw new Error('decode-failed'); }

    const frames = Math.max(1, Math.ceil(decoded.duration * EVAL_CONFIG.targetSampleRate));
    const off = new OAC(1, frames, EVAL_CONFIG.targetSampleRate); // 1 canal = mono
    const src = off.createBufferSource();
    src.buffer = decoded;
    src.connect(off.destination);
    src.start(0);
    const rendered = await (off.startRendering ? off.startRendering() : off);

    // Entrelazar a mono + convertir a PCM 16-bit
    const ch = rendered.getChannelData(0);
    const pcm = new Int16Array(ch.length);
    for (let i = 0; i < ch.length; i++) {
        const s = Math.max(-1, Math.min(1, ch[i]));
        pcm[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return new Blob([wavHeader(pcm.length, EVAL_CONFIG.targetSampleRate), pcm], { type: 'audio/wav' });
}

/** Cabecera RIFF/WAVE PCM de 44 bytes. */
function wavHeader(numSamples, sampleRate) {
    const bytesPerSample = 2, numCh = 1;
    const blockAlign = numCh * bytesPerSample;
    const dataSize = numSamples * bytesPerSample;
    const buf = new ArrayBuffer(44), v = new DataView(buf);
    const wstr = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    wstr(0, 'RIFF'); v.setUint32(4, 36 + dataSize, true); wstr(8, 'WAVE');
    wstr(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); // PCM
    v.setUint16(22, numCh, true); v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * blockAlign, true);
    v.setUint16(32, blockAlign, true); v.setUint16(34, 16, true); // bits por muestra
    wstr(36, 'data'); v.setUint32(40, dataSize, true);
    return buf;
}

/* ============================================================
   COMPARACIÓN (FASE 1) — por pinyin con tonos
   ------------------------------------------------------------
   ¿Por qué pinyin y no los caracteres crudos?
     · SpeechRecognition zh-CN SIEMPRE devuelve simplificado:
       comparar contra 繁體 fallaría; el pinyin es idéntico.
     · Reconoce a veces dígitos ("2本") → normalizo a hanzi.
     · La comparación silábica con tono (ej. "xue2" vs "xue3")
       detecta errores de tono, que es lo que más cuesta.
   ============================================================ */
const PY_CACHE = new Map(); // char → sílaba con tono numérico ('xue3' | '')
function pySyll(ch) {
    if (PY_CACHE.has(ch)) return PY_CACHE.get(ch);
    let s = '';
    try {
        if (typeof pinyinPro !== 'undefined' && /[\u3400-\u9fff]/.test(ch)) {
            s = pinyinPro.pinyin(ch, { toneType: 'num', type: 'string' }).trim();
        }
    } catch (e) { s = ''; }
    if (!/^[a-zü]+[0-5]?$/.test(s)) s = /^[a-z]+$/.test(s) ? s : ''; // sanidad
    PY_CACHE.set(ch, s);
    return s;
}

/** Dígitos que el reconocedor mete a veces → hanzi aproximado. */
function digitsToHanzi(s) {
    const map = { '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
                  '5': '五', '6': '六', '7': '七', '8': '八', '9': '九', '10': '十' };
    return s.replace(/10/g, '十').replace(/[0-9]/g, (d) => map[d] || d);
}

/** Solo hanzi (sin puntuación/espacios) — lista de caracteres. */
function hanziChars(text) {
    return digitsToHanzi(String(text || '')).replace(/[\s，。！？、；：""''¿?¡!.,;:()（）…—·]/g, '')
        .split('').filter((c) => /[\u3400-\u9fff]/.test(c));
}

/** Distancia de Levenshtein sobre listas de sílabas + traza de operaciones. */
function syllAlign(targetSyll, heardSyll) {
    const n = targetSyll.length, m = heardSyll.length;
    const d = [];
    for (let i = 0; i <= n; i++) { d.push(new Array(m + 1).fill(0)); d[i][0] = i; }
    for (let j = 0; j <= m; j++) d[0][j] = j;
    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= m; j++)
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1,
                               d[i - 1][j - 1] + (targetSyll[i - 1] === heardSyll[j - 1] ? 0 : 1));
    // Backtrace: marca por cada char objetivo si fue "dicho bien"
    const ops = []; let i = n, j = m;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (targetSyll[i - 1] === heardSyll[j - 1] ? 0 : 1)) {
            ops.push({ ti: i - 1, ok: targetSyll[i - 1] === heardSyll[j - 1] }); i--; j--;
        } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) { ops.push({ ti: i - 1, ok: false }); i--; }
        else { ops.push({ ti: -1, ok: false }); j--; }
    }
    ops.reverse();
    return { dist: d[n][m], ops: ops, maxLen: Math.max(n, m) };
}

/** Puntaje 0-100 + detalle por carácter, a partir de lo transcrito. */
function scoreTranscript(targetText, transcript) {
    const tChars = hanziChars(targetText);
    const hChars = hanziChars(transcript);
    if (!tChars.length) return { score: null, wordScores: [], sim: 0 };
    const tSyll = tChars.map(pySyll), hSyll = hChars.map(pySyll);
    const al = syllAlign(tSyll, hSyll);

    const okCount = al.ops.filter((o) => o.ti >= 0 && o.ok).length;
    const saidCount = al.ops.filter((o) => o.ti >= 0).length;
    // Similitud: caracteres bien dichos / totales (la distancia de Levenshtein
    // normalizada castiga de más cuando el alumno se come una palabra; esto es
    // más justo y más motivador).
    let sim = saidCount > 0 ? okCount / tChars.length : 0;
    if (!hChars.length) sim = 0;

    const wordScores = tChars.map((c, idx) => ({ char: c, pinyin: pySyll(c), ok: false }));
    al.ops.forEach((o) => { if (o.ti >= 0) wordScores[o.ti].ok = o.ok; });

    let score = Math.round(sim * 100);
    if (score > 100) score = 100;
    return { score: score, wordScores: wordScores, sim: sim };
}

/** Mensaje motivador bilingüe según puntaje. */
function feedbackFor(score, wordScores) {
    if (score === null || score === undefined)
        return { es: T.manEs, zh: T.manZh };
    if (score >= 90) return { es: '¡Excelente pronunciación! 🎉', zh: '发音太棒了！' };
    if (score >= EVAL_CONFIG.goodThreshold) return { es: '¡Muy bien! Suenas casi nativo 👏', zh: '很好！非常接近原音！' };
    if (score >= 60) return { es: '¡Bien! Practicá las letras marcadas 🎯', zh: '不错！练一练标红的字。' };
    return { es: 'Escuchá el audio CN e intentalo de nuevo 💪', zh: '听一听中文音频，再试一次！' };
}

/** Tip de tono: revisa los tonos de los caracteres fallados. */
function toneTip(wordScores) {
    const bad = (wordScores || []).filter((w) => !w.ok && w.pinyin);
    // Poco fiable si falló más de la mitad de la oración → sin tip
    if (!bad.length || bad.length > Math.ceil(wordScores.length / 2)) return '';
    const tones = new Set();
    bad.forEach((w) => { const m = w.pinyin.match(/[1-5]$/); if (m) tones.add(m[0]); });
    if (tones.size === 1) {
        const n = [...tones][0];
        const names = { 1: '1.er tono (ā, plano)', 2: '2.º tono (á, sube)', 3: '3.er tono (ǎ, baja y sube)', 4: '4.º tono (à, cae)', 5: 'tono neutro' };
        return 'Practicá el ' + names[n] + ' · 练一练' + n + '声';
    }
    return '';
}

/* ============================================================
   LiveRecognizer — Web Speech API (zh-CN) durante la grabación
   ============================================================ */
class LiveRecognizer {
    constructor() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.SR = SR || null;
        this.supported = !!SR;
        this.transcript = '';
        this.error = '';
        this._rec = null;
        this._active = false;
        this._restarts = 0;
    }
    start() {
        if (!this.supported) return;
        try {
            const r = new this.SR();
            r.lang = 'zh-CN';                 // el objetivo siempre es chino
            r.continuous = true;
            r.interimResults = true;
            r.maxAlternatives = 1;
            r.onresult = (ev) => {
                for (let i = ev.resultIndex; i < ev.results.length; i++) {
                    if (ev.results[i].isFinal)
                        this.transcript += ev.results[i][0].transcript;
                }
            };
            r.onerror = (ev) => { this.error = this.error || ev.error; };
            r.onend = () => {
                // Chrome corta la escucha en silencios → relanzamos mientras graba
                if (this._active && this._restarts < 8) {
                    this._restarts++;
                    try { r.start(); } catch (e) { this._active = false; }
                }
            };
            this._rec = r;
            this._active = true;
            r.start();
        } catch (e) { this.supported = false; this.error = this.error || 'init'; }
    }
    /** Corta y espera el resultado final (máx ~2.5 s). */
    async stop() {
        if (!this._rec) return { transcript: this.transcript, error: this.error || 'unsupported' };
        const done = new Promise((res) => {
            const prev = this._rec.onend;
            this._rec.onend = () => { if (typeof prev === 'function') prev(); res(); };
            setTimeout(res, 2500); // nunca colgar la UI
        });
        this._active = false;
        try { this._rec.stop(); } catch (e) { try { this._rec.abort(); } catch (e2) {} }
        await done;
        return { transcript: this.transcript, error: this.error };
    }
    abort() {
        this._active = false;
        try { if (this._rec) this._rec.abort(); } catch (e) {}
    }
}

/* ============================================================
   ADAPTADOR DE EVALUACIÓN — evaluatePronunciation(audioBlob, targetText)
   Devuelve SIEMPRE: { score: 0-100|null, feedback: string,
                       wordScores: [{char, pinyin, ok}], ... }
   La UI solo consume este objeto → cambiar de proveedor en
   FASE 2 no exige tocar nada del frontend.
   ============================================================ */
async function evaluatePronunciation(audioBlob, targetText, extra) {
    extra = extra || {};
    const provider = EVAL_CONFIG.provider;

    // ── FASE 1: Web Speech API (transcripción capturada en vivo, gratis) ──
    if (provider === 'webspeech') {
        const heard = extra.transcript || '';
        const recogErr = extra.recogError || '';
        if (!heard || recogErr === 'network' || recogErr === 'not-allowed' ||
            recogErr === 'service-not-allowed' || recogErr === 'unsupported') {
            // Sin Web Speech (Firefox/iOS/sin conexión) → modo comparación manual.
            // El audio sigue siendo utilizable: el alumno se autocorrige escuchándose.
            const fb = feedbackFor(null);
            return { score: null, feedback: fb.es + '\n' + fb.zh,
                     wordScores: [], transcript: '', provider: provider, mode: 'manual',
                     note: T.manNote };
        }
        const s = scoreTranscript(targetText, heard);
        const fb = feedbackFor(s.score, s.wordScores);
        return { score: s.score, feedback: fb.es + '\n' + fb.zh,
                 wordScores: s.wordScores, transcript: heard, provider: provider,
                 mode: 'auto' };
    }

    // ── FASE 2: proveedores premium (preparado, inactivo hoy) ──
    if (provider === 'whisper-serverless') {
        // Endpoint serverless propio (Vercel) con Whisper Tiny (open source):
        // recibe el WAV 16 kHz mono y devuelve {transcript}. La comparación
        // por pinyin de arriba se reutiliza tal cual.
        const wav = await blobToWav16k(audioBlob);
        const fd = new FormData();
        fd.append('audio', wav, 'pron.wav');
        fd.append('target', targetText);
        const res = await fetch(EVAL_CONFIG.whisperEndpoint, { method: 'POST', body: fd });
        if (!res.ok) throw new Error('pron-eval HTTP ' + res.status);
        const data = await res.json();
        const s = scoreTranscript(targetText, data.transcript || '');
        const fb = feedbackFor(s.score, s.wordScores);
        return { score: s.score, feedback: fb.es + '\n' + fb.zh, wordScores: s.wordScores,
                 transcript: data.transcript || '', provider: provider, mode: 'auto' };
    }
    if (provider === 'azure' || provider === 'superspeech') {
        // Esqueleto de integración (completar cuando se contrate el servicio):
        //   1. subir wav → serverless propio (la clave NUNCA va en el front)
        //   2. el serverless llama Azure Pronunciation Assessment / SuperSpeech
        //      con referenceText = targetText
        //   3. mapear su respuesta a { score, wordScores:[{char,pinyin,ok}], ... }
        // Ej.: const wav = await blobToWav16k(audioBlob); ... fetch(endpoint) ...
        throw new Error('proveedor premium aún no configurado (' + provider + ')');
    }

    throw new Error('proveedor desconocido: ' + provider);
}

/* ============================================================
   CONTROLADOR DE UI — window.VR
   Estados del botón: idle 🎤 → recording 🔴+timer →
   processing spinner → resultado ✅/✗ (o 🎧 modo manual)
   ============================================================ */
const VR = {
    state: 'idle',          // idle | recording | processing
    targetZh: '',           // oración china completa (objetivo de pronunciación)
    _recorder: null,
    _recognizer: null,
    _recUrl: null,          // ObjectURL de la última grabación (para escucharla)
    _player: null,
    _rafId: 0,

    init() {
        this.btn = document.getElementById('btn-record');
        this.panel = document.getElementById('record-panel');
        this.wave = document.getElementById('record-wave');
        this.hint = document.getElementById('record-hint');
        this.result = document.getElementById('record-result');
        this.rowActions = document.getElementById('record-row-actions');
        this.playBtn = document.getElementById('btn-play-my-rec');
        this.againBtn = document.getElementById('btn-rec-again');
        if (!this.btn || !this.panel) return; // HTML viejo → módulo dormido, cero errores

        this._player = new Audio();
        this._player.preload = 'auto';

        this.btn.addEventListener('click', () => this._onBtnClick());
        this.againBtn.addEventListener('click', () => this._onBtnClick());
        this.playBtn.addEventListener('click', () => this._togglePlay());
        this._player.addEventListener('ended', () => { this.playBtn.textContent = T.playBtn; });
        this._player.addEventListener('pause', () => { if (!this._player.ended) this.playBtn.textContent = T.playBtn; });

        // Seguridad: si la pestaña se oculta grabando, cortar (evita micro abierto)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.state === 'recording') this._finishRecording();
        });

        this._drawIdleWave();
    },

    /** app.js lo llama en cada oración nueva: fija objetivo y resetea la UI. */
    setTarget(zhText, pinyinText) {
        if (this.state === 'recording') { this._recorder.abort(); this._recognizer.abort(); }
        this.state = 'idle';
        this.targetZh = String(zhText || '');
        this._releaseUrl();
        this._player.removeAttribute('src');
        this._setBtn('🎤', '');
        this.panel.classList.remove('is-recording');
        this.hint.textContent = T.hintTap;
        this.hint.classList.remove('hidden');
        this.result.classList.add('hidden');
        this.result.innerHTML = '';
        this.rowActions.classList.add('hidden');
        this.playBtn.classList.add('hidden');
        this.againBtn.classList.add('hidden');
        this._drawIdleWave();
    },

    /* ---------- flujo principal ---------- */
    async _onBtnClick() {
        if (this.state === 'recording') { this._finishRecording(); return; }
        if (this.state !== 'idle') return; // processing: ignorar clics

        // Soporte del navegador (MediaRecorder/getUserMedia)
        if (!VoiceRecorder.supported()) {
            this._showError(!navigator.mediaDevices ? T.errSecure : T.errSupport);
            return;
        }

        this.state = 'recording';
        this._setBtn('🔴 00:00', 'is-recording');
        this.panel.classList.add('is-recording');
        this.hint.textContent = T.hintRec;
        this.hint.classList.remove('hidden');
        this.result.classList.add('hidden');
        this.rowActions.classList.add('hidden');
        this._releaseUrl();

        // FASE 1: el reconocimiento arranca JUNTO con la grabación
        this._recognizer = new LiveRecognizer();
        this._recognizer.start();

        try {
            this._recorder = new VoiceRecorder({ maxSeconds: EVAL_CONFIG.maxSeconds });
            await this._recorder.start((s) => {
                const mm = String(Math.floor(s / 60)).padStart(2, '0');
                const ss = String(s % 60).padStart(2, '0');
                this._setBtn('🔴 ' + mm + ':' + ss, 'is-recording');
            });
            // Auto-stop a los 20 s: el recorder avisa por callback (no llamamos
            // stop() acá — eso cortaría la grabación de inmediato).
            this._recorder.onAutoStop = (res) => {
                if (res && this.state === 'recording') this._finishRecording();
            };
            this._loopWave(); // waveform animada mientras graba
        } catch (err) {
            try { this._recognizer.abort(); } catch (e) {}
            this._backToIdle();
            this._showError(this._errText(err));
            return;
        }
    },

    async _finishRecording() {
        if (this.state !== 'recording') return;
        this.state = 'processing';
        this._cancelWave();
        this._setBtn('', 'is-processing');      // spinner CSS (texto vacío)
        this.hint.textContent = T.hintProc;

        const blobRes = await this._recorder.stop();
        const recog = await this._recognizer.stop();
        this._backToIdle();

        if (!blobRes || !blobRes.blob || !blobRes.blob.size) {
            this._showError(T.errGeneric);
            return;
        }
        this._recUrl = URL.createObjectURL(blobRes.blob);
        this._player.src = this._recUrl;

        // Adaptador estandarizado (hoy FASE 1; FASE 2 sin tocar la UI).
        // blobToWav16k en paralelo: valida el pipeline WAV para el futuro.
        let res;
        try {
            const [evaluation] = await Promise.all([
                evaluatePronunciation(blobRes.blob, this.targetZh,
                                      { transcript: recog.transcript, recogError: recog.error }),
                blobToWav16k(blobRes.blob).catch(() => null) // WAV listo para FASE 2
            ]);
            res = evaluation;
        } catch (err) {
            res = { score: null, feedback: T.manEs + '\n' + T.manZh, wordScores: [],
                    mode: 'manual', note: T.manNote };
        }
        this._showResult(res);
    },

    _backToIdle() {
        this.state = 'idle';
        this.panel.classList.remove('is-recording');
        this._setBtn('🎤', '');
        this.hint.textContent = T.hintTap;
    },

    _showError(msg) {
        this.result.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'rec-error';
        p.textContent = msg;
        this.result.appendChild(p);
        this.result.classList.remove('hidden');
        this.hint.classList.add('hidden');
    },

    /* ---------- resultado ---------- */
    _showResult(res) {
        this.result.innerHTML = '';
        const isManual = res.mode === 'manual' || res.score === null || res.score === undefined;

        if (!isManual) {
            this._setBtn(res.score >= EVAL_CONFIG.goodThreshold ? '✅' : '✗',
                         res.score >= EVAL_CONFIG.goodThreshold ? 'is-ok' : 'is-bad');
            const chip = document.createElement('span');
            chip.className = 'rec-score ' + (res.score >= EVAL_CONFIG.goodThreshold ? 'ok' :
                                             (res.score >= 60 ? 'mid' : 'low'));
            chip.textContent = res.score + '/100';
            this.result.appendChild(chip);
        } else {
            this._setBtn('🎧', 'is-manual'); // sin autoevaluación: invita a escucharse
        }

        const lines = String(res.feedback || '').split('\n');
        const es = document.createElement('p'); es.className = 'rec-msg-es'; es.textContent = lines[0] || '';
        const zh = document.createElement('p'); zh.className = 'rec-msg-zh'; zh.textContent = lines[1] || '';
        this.result.appendChild(es); this.result.appendChild(zh);

        // Caracteres a practicar (máx. 3) + tip de tono
        if (!isManual && Array.isArray(res.wordScores)) {
            const bad = res.wordScores.filter((w) => !w.ok).slice(0, 3);
            if (bad.length && bad.length < res.wordScores.length) {
                const box = document.createElement('div'); box.className = 'rec-words';
                bad.forEach((w) => {
                    const chipW = document.createElement('span');
                    chipW.className = 'rec-word';
                    // Pinyin en formato tono-numérico (ej. xue3) — refuerza el tono a practicar
                    chipW.textContent = w.char + (w.pinyin ? ' (' + w.pinyin + ')' : '');
                    box.appendChild(chipW);
                });
                this.result.appendChild(box);
                const tip = toneTip(res.wordScores);
                if (tip) {
                    const p = document.createElement('p'); p.className = 'rec-tip'; p.textContent = '🎯 ' + tip;
                    this.result.appendChild(p);
                }
            }
        }
        if (res.note) {
            const p = document.createElement('p'); p.className = 'rec-tip'; p.textContent = res.note;
            this.result.appendChild(p);
        }

        this.hint.classList.add('hidden');
        this.result.classList.remove('hidden');
        this.rowActions.classList.remove('hidden');
        this.playBtn.classList.remove('hidden');
        this.playBtn.textContent = T.playBtn;
        this.againBtn.classList.remove('hidden');
        this.againBtn.textContent = T.againBtn;
    },

    /* ---------- waveform ---------- */
    _drawIdleWave() {
        if (!this.wave || !this.wave.getContext) return;
        const c = this.wave.getContext('2d');
        this._fitCanvas();
        const w = this.wave.width, h = this.wave.height;
        c.clearRect(0, 0, w, h);
        c.fillStyle = 'rgba(37, 99, 235, 0.18)';
        const n = 28, bw = w / (n * 1.6);
        for (let i = 0; i < n; i++) {
            const bh = Math.max(3, h * 0.12);
            c.fillRect(i * (w / n), (h - bh) / 2, bw, bh);
        }
    },
    _loopWave() {
        this._cancelWave();
        this._fitCanvas(); // ahora sí es visible → tamaño CSS real
        const draw = () => {
            if (!this._recorder || !this._recorder.recording) return;
            const c = this.wave.getContext('2d');
            const w = this.wave.width, h = this.wave.height;
            const lv = this._recorder.levels(28);
            c.clearRect(0, 0, w, h);
            c.fillStyle = '#dc2626';
            const bw = w / (28 * 1.6);
            lv.forEach((v, i) => {
                const bh = Math.max(3, v * h * 0.92);
                c.fillRect(i * (w / 28), (h - bh) / 2, bw, bh);
            });
            this._rafId = requestAnimationFrame(draw);
        };
        this._rafId = requestAnimationFrame(draw);
    },
    _cancelWave() { if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = 0; } },
    _fitCanvas() {
        if (!this.wave) return;
        const dpr = window.devicePixelRatio || 1;
        const cssW = this.wave.clientWidth || 300;
        this.wave.width = Math.round(cssW * dpr);
        this.wave.height = Math.round(34 * dpr);
    },

    /* ---------- reproducción de la grabación ---------- */
    _togglePlay() {
        if (!this._recUrl) return;
        if (this._player.paused) {
            this._player.play().then(() => { this.playBtn.textContent = T.stopBtn; }).catch(() => {});
        } else {
            this._player.pause();
            this.playBtn.textContent = T.playBtn;
        }
    },

    _releaseUrl() {
        if (this._recUrl) { try { URL.revokeObjectURL(this._recUrl); } catch (e) {} this._recUrl = null; }
    },

    _setBtn(text, cls) {
        if (!this.btn) return;
        this.btn.className = 'btn-audio-mini btn-record' + (cls ? ' ' + cls : '');
        if (text) this.btn.textContent = text;
        else if (cls === 'is-processing') this.btn.textContent = ''; // spinner CSS
    },

    _errText(err) {
        const n = err && err.name;
        if (n === 'NotAllowedError' || n === 'PermissionDeniedError') return T.errDenied;
        if (n === 'NotFoundError' || n === 'DevicesNotFoundError') return T.errNoMic;
        if (n === 'NotReadableError' || n === 'TrackStartError') return T.errBusy;
        if (n === 'UnsupportedBrowser') return T.errSupport;
        if (n === 'OverconstrainedError') return T.errSupport;
        return T.errGeneric;
    },

    /* ---------- ganchos para tests (no afectan producción) ---------- */
    _debugScore(targetZh, transcript) {
        const s = scoreTranscript(targetZh, transcript);
        const fb = feedbackFor(s.score, s.wordScores);
        return { score: s.score, feedback: fb.es, wordScores: s.wordScores };
    }
};

/* ============================================================
   EXPORTS + arranque
   ============================================================ */
window.VR = VR;                                  // lo único que app.js necesita
window.evaluatePronunciation = evaluatePronunciation; // adaptador público (spec)
window.VoiceRecorder = VoiceRecorder;            // clase encapsulada (futuro/tests)
window.VoiceRecorderModule = { EVAL_CONFIG: EVAL_CONFIG, blobToWav16k: blobToWav16k,
                               LiveRecognizer: LiveRecognizer };

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VR.init());
} else {
    VR.init();
}

})();
