/* ============================================================
   voice-evaluator.js — v7.7 Orquestador de Evaluación de
   Pronunciación · 100 % LOCAL Y PRIVADO (spec corregida v2)
   ------------------------------------------------------------
   ARQUITECTURA (dos motores complementarios, NO uno solo):

     ┌──────────────────────────────────────────────────────┐
     │  LocalEvaluator                                      │
     │   ├─ LocalWhisperProvider  → VERIFICACIÓN DE CONTENIDO│
     │   │    "¿dijo el carácter correcto?"                 │
     │   │    Whisper WASM (@huggingface/transformers,      │
     │    │    Xenova/whisper-tiny int8, en Web Worker).    │
     │   │    ⚠️ Whisper NO mide calidad de pronunciación   │
     │   │    NI tono: solo confirma qué caracter reconoció.│
     │   └─ LocalToneAnalyzer     → EVALUACIÓN DE TONO      │
     │        "¿dijo el TONO correcto?"                     │
     │        F0 (YIN) + DTW contra el audio de referencia, │
     │        en semitonos relativos (pitch-analyzer.js).   │
     │        Esto es el CORE del feedback pedagógico.      │
     └──────────────────────────────────────────────────────┘
     Un MISMO buffer Float32Array 16 kHz mono alimenta ambos
     pipelines EN PARALELO (Promise.allSettled): si uno falla,
     el otro igual entrega feedback.

   PRIVACIDAD (feature principal)
     · La voz del alumno NUNCA sale del dispositivo: ni Whisper
       ni el análisis de tono hacen requests con el audio.
     · La única red involucrada es la descarga del MODELO
       (~40 MB, solo la 1.ª vez; queda cacheado en el navegador)
       y el audio de REFERENCIA (el mismo TTS 🔊 CN que el
       alumno ya escucha para estudiar — no es su voz).
     · setProvider('cloud') queda preparado para el futuro
       premium (Azure Pronunciation Assessment / SuperSpeech).

   INTERFAZ (spec)
     PronunciationEvaluator:
       startRecording() · stopAndEvaluate() · setProvider('local'|'cloud')
     Resultado estandarizado (misma forma para TODOS los providers):
       { transcription, toneScores[], overallFeedback, score,
         contentCheck, contours, refAudioUrl, ... }

   NOTA TÉCNICA WASM
     GitHub Pages no manda cabeceras COOP/COEP → no hay
     SharedArrayBuffer → ONNX Runtime Web corre con
     numThreads = 1 (compatibilidad total, algo más lento pero
     estable en gama baja, que es justamente el objetivo).
   ============================================================ */
(function () {
'use strict';

/* ============================================================
   CONFIG — tocar solo acá para cambiar de motor o de modelo
   ============================================================ */
const VE_CONFIG = {
    // Verificación de contenido: tiny prioriza velocidad móvil sobre
    // precisión (solo se usa para chequear QUÉ carácter dijo, no
    // para puntuar calidad — eso lo hace el análisis de tono).
    // Subir a 'Xenova/whisper-base' (~80 MB) si se quiere afinar.
    model: 'Xenova/whisper-tiny',
    // @xenova/transformers quedó deprecado desde v3 → paquete actual
    // @huggingface/transformers (los modelos siguen bajo el namespace
    // Xenova/ en el Hub). Pin fijo: sin sorpresas de breaking changes.
    libUrl: 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1',
    language: 'zh',           // el objetivo de pronunciación siempre es chino
    task: 'transcribe',
    dtype: 'q8',              // int8: 4× más liviano, ideal WASM
    device: 'wasm',           // spec: WebAssembly determinista (sin WebGPU)
    maxWaitMs: 120000,        // espera máx al motor al evaluar (1.ª descarga)
    transcribeTimeoutMs: 60000,
    minRms: 0.0015,           // debajo de esto → "no escuché nada"
    refFramesPerChar: 8       // frames de plantilla por carácter (fallback sin TTS)
};

/* ============================================================
   TEXTOS (ES + zh simplificado/tradicional según preferencia)
   ============================================================ */
const S = {
    dlEs: function (p) { return '⬇️ Descargando motor de voz (solo la 1.ª vez): ' + p + ' %'; },
    dlZhS: '正在下载语音引擎（仅需一次）…',
    dlZhT: '正在下載語音引擎（僅需一次）…',
    readyEs: '✅ Motor de voz listo',
    readyZhS: '语音引擎已就绪',
    readyZhT: '語音引擎已就緒',
    procEs: '🧠 Analizando tono…',
    procZhS: '分析中…',
    procZhT: '分析中…',
    manEs: '🎧 Escuchá tu grabación y comparala con el audio CN',
    manZhS: '🎧 听一听你的录音，跟中文音频对比',
    manZhT: '🎧 聽一聽你的錄音，跟中文音頻對比',

    noteNoSpeechEs: 'No escuché nada claro — acercate al micrófono y hablá más fuerte.',
    noteNoSpeechZhS: '没听清楚，请靠近麦克风、再大声一点。',
    noteNoSpeechZhT: '沒聽清楚，請靠近麥克風、再大一點。',
    noteNoVoiceEs: 'No se detectó voz suficiente para analizar el tono — sostené cada sílaba y alejate del ruido.',
    noteNoVoiceZhS: '没有检测到足够的声音来分析声调——每个字读长一点，远离噪音。',
    noteNoVoiceZhT: '沒有檢測到足夠的聲音來分析聲調——每個字讀長一點，遠離噪音。',
    noteNoContentEs: 'El verificador de contenido no arrancó esta vez, pero el análisis de tono sí funciona.',
    noteNoContentZhS: '这次内容校验没能启动，但声调分析是好的。',
    noteNoContentZhT: '這次內容校驗沒能啟動，但聲調分析是好的。',
    noteTimeoutEs: 'El motor de voz sigue descargándose (solo la 1.ª vez) — la evaluación automática va a andar en unos minutos.',
    noteTimeoutZhS: '语音引擎还在下载（仅需一次），几分钟后自动评估就能用了。',
    noteTimeoutZhT: '語音引擎還在下載（僅需一次），幾分鐘後自動評估就能用了。',
    noteEngineEs: 'El motor de voz no arrancó en este dispositivo — escuchar tu grabación y comparar sigue funcionando.',
    noteEngineZhS: '语音引擎在这个设备上没能启动，但听录音对照的功能照常。',
    noteEngineZhT: '語音引擎在這個設備上沒能啟動，但聽錄音對照的功能照常。',
    noteCloudEs: 'El proveedor de nube todavía no está configurado — por hoy, tu mejor evaluador es tu oído.',
    noteCloudZhS: '云端评估还没配置，先用耳朵对照吧。',
    noteCloudZhT: '雲端評估還沒配置，先用耳朵對照吧。',
    noteDefaultEs: 'Esta vez no hubo evaluación automática — escucharte y comparar sirve igual.',
    noteDefaultZhS: '这次没能自动评估，自己听录音对照也一样有效。',
    noteDefaultZhT: '這次沒能自動評估，自己聽錄音對照也一樣有效。'
};

/* Nombres de tono para el feedback cualitativo (spec: "sonó como
   2º tono, buscá 4º tono (bajada fuerte)") */
const TONE_NAMES = {
    '1': { es: '1.er tono (plano y alto)',      zhS: '一声（平）',      zhT: '一聲（平）' },
    '2': { es: '2.º tono (sube)',               zhS: '二声（升）',      zhT: '二聲（升）' },
    '3': { es: '3.er tono (baja y sube)',       zhS: '三声（降升）',    zhT: '三聲（降升）' },
    '4': { es: '4.º tono (cae fuerte)',         zhS: '四声（降）',      zhT: '四聲（降）' },
    '0': { es: 'tono neutro (suave y corto)',   zhS: '轻声',            zhT: '輕聲' }
};

/* ============================================================
   MOTOR WASM — Whisper en un Web Worker (hilo separado)
   ------------------------------------------------------------
   El worker se crea desde un Blob con { type: 'module' } e
   importa @huggingface/transformers por CDN. El modelo se
   descarga y queda cacheado por el navegador (Cache API de
   transformers.js): la 2.ª vez arranca al instante y sin red.
   ============================================================ */
const WORKER_SRC = [
    "import { pipeline, env } from '" + VE_CONFIG.libUrl + "';",
    "env.allowLocalModels = false;      // el modelo viene del CDN de HuggingFace",
    "env.useBrowserCache = true;        // cachea el modelo → 1.ª vez sola",
    "env.backends.onnx.wasm.numThreads = 1; // sin COOP/COEP no hay SharedArrayBuffer",
    "env.backends.onnx.wasm.proxy = false;  // ya estamos en un worker",
    "",
    "let asr = null;",
    "self.onmessage = async (e) => {",
    "  const m = e.data || {};",
    "  if (m.type === 'load') {",
    "    try {",
    "      asr = await pipeline('automatic-speech-recognition', '" + VE_CONFIG.model + "', {",
    "        dtype: '" + VE_CONFIG.dtype + "', device: '" + VE_CONFIG.device + "',",
    "        progress_callback: (p) => self.postMessage({ type: 'progress', data: {",
    "          status: p.status, file: p.file, loaded: p.loaded, total: p.total } })",
    "      });",
    "      self.postMessage({ type: 'loaded' });",
    "    } catch (err) {",
    "      self.postMessage({ type: 'load-error', message: String((err && err.message) || err) });",
    "    }",
    "  } else if (m.type === 'transcribe') {",
    "    try {",
    "      const out = await asr(m.audio, { language: '" + VE_CONFIG.language + "', task: '" + VE_CONFIG.task + "' });",
    "      self.postMessage({ type: 'result', id: m.id, text: (out && out.text) || '' });",
    "    } catch (err) {",
    "      self.postMessage({ type: 'transcribe-error', id: m.id,",
    "        message: String((err && err.message) || err) });",
    "    }",
    "  }",
    "};"
].join('\n');

class LocalWhisperEngine {
    constructor() {
        this.status = 'idle';        // idle | loading | ready | error
        this.progress = 0;           // 0-99 durante la descarga
        this.errorMsg = '';
        this._loadingPromise = null;
        this._onProgress = null;     // callback UI (última gana)
        this._worker = null;
        this._mode = '';             // 'worker' | 'main'
        this._mainPipe = null;
        this._files = new Map();     // progreso por archivo → % global
        this._seq = 0;
        this._pending = new Map();   // id → {resolve, reject} de transcripciones
    }

    get ready() { return this.status === 'ready'; }

    /** Idempotente: arranca la carga una sola vez aunque se llame mil veces. */
    preload(onProgress) {
        if (onProgress) this._onProgress = onProgress;
        if (this.status === 'ready') return Promise.resolve();
        if (this._loadingPromise) return this._loadingPromise;
        this.status = 'loading';
        this.progress = 0;
        this._files.clear();
        this._loadingPromise = (async () => {
            try {
                try {
                    await this._loadInWorker();
                    this._mode = 'worker';
                } catch (wErr) {
                    console.warn('[VE] Worker no disponible → hilo principal:', (wErr && wErr.message) || wErr);
                    await this._loadOnMain();
                    this._mode = 'main';
                }
                this.status = 'ready';
                this.progress = 100;
            } catch (err) {
                this.status = 'error';
                this.errorMsg = String((err && err.message) || err);
                this._loadingPromise = null;   // permite reintentar en el próximo clic
                throw err;
            }
        })();
        return this._loadingPromise;
    }

    /** Float32Array 16 kHz mono → texto (dentro del dispositivo).
     *  SOLO verificación de contenido: el tono lo mide LocalToneAnalyzer. */
    async transcribe(float32) {
        await this.preload();
        if (this._mode === 'worker') {
            const id = ++this._seq;
            const self = this;
            return new Promise((resolve, reject) => {
                self._pending.set(id, { resolve: resolve, reject: reject });
                self._worker.postMessage({ type: 'transcribe', id: id, audio: float32 });
                setTimeout(() => {
                    if (self._pending.has(id)) {
                        self._pending.delete(id);
                        reject(new Error('transcribe-timeout'));
                    }
                }, VE_CONFIG.transcribeTimeoutMs); // nunca colgar la UI más de 60 s
            });
        }
        const out = await this._mainPipe(float32, { language: VE_CONFIG.language, task: VE_CONFIG.task });
        return (out && out.text) || '';
    }

    /* ---------- carga en worker (camino principal) ---------- */
    _loadInWorker() {
        const self = this;
        return new Promise((resolve, reject) => {
            let blobUrl = null;
            try {
                blobUrl = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }));
                self._worker = new Worker(blobUrl, { type: 'module' });
            } catch (e) {
                if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e2) {} }
                reject(e); return;
            }
            self._worker.onmessage = (e) => {
                const m = e.data || {};
                if (m.type === 'progress') { self._aggProgress(m.data); return; }
                if (m.type === 'loaded') { resolve(); return; }
                if (m.type === 'load-error') { reject(new Error(m.message || 'worker-load-error')); return; }
                if (m.type === 'result' || m.type === 'transcribe-error') {
                    const p = self._pending.get(m.id);
                    if (p) {
                        self._pending.delete(m.id);
                        if (m.type === 'result') p.resolve(m.text || '');
                        else p.reject(new Error(m.message || 'transcribe-error'));
                    }
                }
            };
            self._worker.onerror = (ev) => {
                reject(new Error('worker-error: ' + ((ev && ev.message) || 'desconocido')));
            };
            self._worker.postMessage({ type: 'load' });
        });
    }

    /* ---------- carga en hilo principal (fallback iOS < 15) ---------- */
    async _loadOnMain() {
        const mod = await import(VE_CONFIG.libUrl);
        if (!mod || !mod.pipeline) throw new Error('transformers-import-failed');
        mod.env.allowLocalModels = false;
        mod.env.useBrowserCache = true;
        if (mod.env.backends && mod.env.backends.onnx && mod.env.backends.onnx.wasm) {
            mod.env.backends.onnx.wasm.numThreads = 1;
            mod.env.backends.onnx.wasm.proxy = false;
        }
        const self = this;
        this._mainPipe = await mod.pipeline('automatic-speech-recognition', VE_CONFIG.model, {
            dtype: VE_CONFIG.dtype, device: VE_CONFIG.device,
            progress_callback: function (p) { self._aggProgress(p); }
        });
    }

    /* ---------- progreso global de descarga (varios archivos) ---------- */
    _aggProgress(d) {
        if (!d || !d.file) return;
        if (d.status === 'progress' && d.total) {
            this._files.set(d.file, { loaded: d.loaded || 0, total: d.total });
            let loaded = 0, total = 0;
            this._files.forEach(function (f) { loaded += f.loaded; total += f.total; });
            if (total > 0) {
                this.progress = Math.min(99, Math.floor((loaded / total) * 100));
                this._notify();
            }
        }
    }
    _notify() {
        if (typeof this._onProgress === 'function') {
            try { this._onProgress(this.progress); } catch (e) { /* la UI nunca rompe el motor */ }
        }
    }
}

/* ============================================================
   AUDIO → Float32Array 16 kHz mono (lo que Whisper y el
   analizador de tono exigen)
   ------------------------------------------------------------
   Mismo pipeline robusto que el WAV de v7.5: decodeAudioData a
   la tasa nativa + OfflineAudioContext re-muestreando a 16 kHz.
   Devuelve Float32Array (no PCM16: el modelo WASM come floats).
   ============================================================ */
async function blobToFloat32_16k(blob) {
    const AC = window.AudioContext || window.webkitAudioContext;
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AC || !OAC) throw new Error('no-audiocontext');

    const arr = await blob.arrayBuffer();
    let decoded;
    const c = new AC();
    try {
        decoded = await new Promise((res, rej) => {
            const p = c.decodeAudioData(arr.slice(0), res, rej); // arr.slice(0): Safari
            if (p && p.then) p.then(res, rej);
        });
    } catch (e) {
        throw new Error('decode-failed');
    } finally {
        try { c.close(); } catch (e2) {}
    }

    const SR = 16000;
    const frames = Math.max(1, Math.ceil(decoded.duration * SR));
    const off = new OAC(1, frames, SR);           // 1 canal = mono
    const src = off.createBufferSource();
    src.buffer = decoded;
    src.connect(off.destination);
    src.start(0);
    const rendered = await (off.startRendering ? off.startRendering() : off);
    const ch = rendered.getChannelData(0);
    const out = new Float32Array(ch.length);       // copia propia (segura p/ worker)
    out.set(ch);
    return out;
}

/** ¿Silencio total? ( RMS por debajo del umbral → no vale la pena evaluar) */
function isSilence(float32) {
    if (!float32 || float32.length < 4800) return true; // < 0.3 s
    let sum = 0;
    const step = Math.max(1, Math.floor(float32.length / 20000)); // muestra ≤20k puntos
    let n = 0;
    for (let i = 0; i < float32.length; i += step) { sum += float32[i] * float32[i]; n++; }
    const rms = Math.sqrt(sum / Math.max(1, n));
    return rms < VE_CONFIG.minRms;
}

/* ============================================================
   MOTOR DE TONO LOCAL — LocalToneAnalyzer (F0 + DTW)
   ------------------------------------------------------------
   Core del feedback pedagógico (spec): mide el contorno de
   pitch REAL del alumno y lo compara con el de la referencia.
   Referencia = audio TTS de la frase (el MISMO 🔊 CN que el
   alumno ya escucha; pedirlo NO expone la voz del alumno) con
   fallback a plantillas canónicas de tono si no hay red.
   ============================================================ */
const TTS_API_URL = 'https://app-chino-espa-ol.vercel.app/api/tts';

class LocalToneAnalyzer {
    constructor() {
        if (typeof window.PitchAnalyzerModule !== 'object') {
            throw new Error('pitch-analyzer-missing'); // index.html debe cargarlo antes
        }
        this.PA = window.PitchAnalyzerModule;
        this._refCache = new Map();   // clave text|voice → referencia lista
    }

    /** Tono esperado por carácter, desde pinyin-pro (pySyll → 'xue3').
     *  Devuelve '1'..'4' o '0' (neutro); null si no se pudo. */
    expectedToneOf(ch) {
        const M = window.VoiceRecorderModule || {};
        let p = '';
        try { p = typeof M.pySyll === 'function' ? M.pySyll(ch) : ''; } catch (e) { p = ''; }
        const m = p.match(/[0-5]$/);
        if (!m) return null;
        return (m[0] === '5' || m[0] === '0') ? '0' : m[0];
    }

    /** Contorno del alumno + control de "voz suficiente" (spec:
     *  el F0 falla en audio muy corto o con ruido → error propio). */
    analyzeStudent(pcm16k) {
        const f0r = this.PA.extractF0(pcm16k, 16000);
        const enough = f0r.voicedRatio >= this.PA.CONFIG.minVoicedRatio &&
                       f0r.voicedFrames >= 10;
        const ct = this.PA.contourToSemis(f0r.f0);
        if (!enough || ct.semis.length < 8) {
            const e = new Error('no-voice-tono');
            e.details = { voicedRatio: f0r.voicedRatio, voicedFrames: f0r.voicedFrames };
            throw e;
        }
        return { contour: ct, voicedRatio: f0r.voicedRatio, durationSec: f0r.durationSec };
    }

    /** Referencia de tono para la frase: TTS → decode → contorno.
     *  Cacheada por (texto|voz). Sin red → plantillas canónicas. */
    async getReference(targetText, expectedTones, voice) {
        const key = targetText + '|' + (voice || 'f');
        if (this._refCache.has(key)) return this._refCache.get(key);

        const self = this;
        const fallback = function (reason) {
            const tpl = self.PA.templateForSequence(
                expectedTones.map(function (t) { return t || '1'; }),
                VE_CONFIG.refFramesPerChar);
            const ref = {
                semis: tpl.semis, boundaries: tpl.boundaries,
                refIsTemplate: true, refAudioUrl: null, reason: reason || 'no-network'
            };
            self._refCache.set(key, ref);
            return ref;
        };

        try {
            // ⚠️ PRIVACIDAD: esto pide el audio DE REFERENCIA (TTS de la
            // frase, el mismo que el botón 🔊 CN ya genera) — el audio del
            // ALUMNO jamás viaja por la red.
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 15000);
            const resp = await fetch(TTS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: targetText, lang: 'zh-CN', voice: voice || 'f' }),
                signal: ctrl.signal
            }).finally(() => clearTimeout(timer));
            if (!resp.ok) return fallback('tts-http-' + resp.status);

            const data = await resp.json();
            if (!data || !data.audio) return fallback('tts-empty');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const blob = new Blob([bytes], { type: data.mime || 'audio/wav' });

            // decode + re-muestreo a 16 kHz mono (mismo pipeline que el alumno)
            const AC = window.AudioContext || window.webkitAudioContext;
            const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            if (!AC || !OAC) return fallback('no-audiocontext');
            const c = new AC();
            let decoded;
            try {
                decoded = await new Promise((res, rej) => {
                    const p = c.decodeAudioData(bytes.buffer.slice(0), res, rej);
                    if (p && p.then) p.then(res, rej);
                });
            } finally { try { c.close(); } catch (e2) {} }
            const frames = Math.max(1, Math.ceil(decoded.duration * 16000));
            const off = new OAC(1, frames, 16000);
            const src = off.createBufferSource();
            src.buffer = decoded; src.connect(off.destination); src.start(0);
            const rendered = await (off.startRendering ? off.startRendering() : off);

            const f0r = this.PA.extractF0(rendered.getChannelData(0), 16000);
            const ct = this.PA.contourToSemis(f0r.f0);
            if (ct.semis.length < 6) return fallback('ref-sin-pitch');

            const ref = {
                semis: ct.semis, boundaries: null,
                refIsTemplate: false,
                refAudioUrl: URL.createObjectURL(blob), // para el botón "🔊 Referencia"
                reason: 'tts'
            };
            this._refCache.set(key, ref);
            return ref;
        } catch (err) {
            return fallback(String((err && err.message) || err));
        }
    }

    /** Evaluación de tonos completa para un buffer del alumno. */
    async evaluateTones(pcm16k, chars, expectedTones, voice) {
        const student = this.analyzeStudent(pcm16k);
        const ref = await this.getReference(
            chars.join(''), expectedTones, voice); // clave estable sin puntuación

        const cmp = this.PA.compare(
            student.contour.semis, ref.semis, chars.length, expectedTones);

        const toneScores = chars.map((ch, k) => {
            const c = cmp.chars[k] || { status: 'nodata', detected: null, deviation: 0 };
            return {
                char: ch,
                pinyin: (window.VoiceRecorderModule && window.VoiceRecorderModule.pySyll ?
                         window.VoiceRecorderModule.pySyll(ch) : '') || '',
                expected: expectedTones[k],
                detected: c.detected,
                status: c.status,          // 'ok' | 'approx' | 'wrong' | 'nodata'
                deviation: c.deviation,
                msgEs: this._charMsgEs(k, ch, c, expectedTones[k]),
                msgZh: this._charMsgZh(k, ch, c, expectedTones[k])
            };
        });

        return {
            toneScores: toneScores,
            contours: {
                student: student.contour.semis,   // semitonos (solo frames sonoros)
                ref: ref.semis,
                refBounds: cmp.chars.map(function (c) { return c.refStart; }),
                refIsTemplate: ref.refIsTemplate
            },
            refAudioUrl: ref.refAudioUrl,
            refIsTemplate: ref.refIsTemplate,
            voicedRatio: student.voicedRatio,
            durationSec: student.durationSec
        };
    }

    /* ---------- mensajes cualitativos por carácter ---------- */
    _toneName(t, script) {
        const n = TONE_NAMES[t || '0'];
        return script === 't' ? (n ? n.zhT : '?') : (n ? n.zhS : '?');
    }
    _charMsgEs(k, ch, c, expected) {
        const num = 'N.º ' + (k + 1);
        if (c.status === 'ok') return num + ': ✅ tono correcto' + (expected ? ' (' + (TONE_NAMES[expected] || {}).es + ')' : '');
        if (c.status === 'approx') return num + ': 🟡 cerca del tono esperado — escuchá la referencia y afiná';
        if (c.status === 'wrong' && c.detected && expected) {
            const d = TONE_NAMES[c.detected] || {}, e = TONE_NAMES[expected] || {};
            return num + ': sonó como ' + (d.es || '?') + ', buscá ' + (e.es || '?');
        }
        if (c.status === 'wrong') return num + ': el tono se desvió bastante de la referencia';
        return num + ': no se escuchó con claridad';
    }
    _charMsgZh(k, ch, c, expected) {
        const t = this._script === 't';
        const num = t ? '第' + (k + 1) + '個字' : '第' + (k + 1) + '个字';
        if (c.status === 'ok') return num + (t ? '：聲調正確 ✅' : '：声调正确 ✅');
        if (c.status === 'approx') return num + (t ? '：聲調接近，再聽聽參考音頻' : '：声调接近，再听听参考音频');
        if (c.status === 'wrong' && c.detected && expected) {
            const d = TONE_NAMES[c.detected] || {}, e = TONE_NAMES[expected] || {};
            return num + (t ? '：聽起來像' : '：听起来像') + (t ? (d.zhT || '?') : (d.zhS || '?')) +
                   (t ? '，要讀' : '，要读') + (t ? (e.zhT || '?') : (e.zhS || '?'));
        }
        if (c.status === 'wrong') return num + (t ? '：聲調和參考差得比較多' : '：声调和参考差得比较多');
        return num + (t ? '：沒聽清楚' : '：没听清楚');
    }
}

/* ============================================================
   EVALUADOR LOCAL — LocalEvaluator (Whisper + Tono compuestos)
   ------------------------------------------------------------
   Un MISMO Float32Array alimenta ambos pipelines EN PARALELO.
   Resultado con la MISMA forma que tendrá el provider cloud:
   { transcription, toneScores[], overallFeedback, ... }
   ============================================================ */
class LocalEvaluator {
    constructor(engine) {
        this.whisper = new LocalWhisperProvider(engine);
        this.tone = new LocalToneAnalyzer();
    }

    async evaluate(audioBlob, targetText, ctx) {
        ctx = ctx || {};
        this.tone._script = ctx.script === 't' ? 't' : 's';

        const pcm = await blobToFloat32_16k(audioBlob);
        if (isSilence(pcm)) throw new Error('no-speech');

        const M = window.VoiceRecorderModule || {};
        const chars = (typeof M.hanziChars === 'function') ? M.hanziChars(targetText) : [];
        const expectedTones = chars.map((ch) => this.tone.expectedToneOf(ch));

        // ── dos pipelines en paralelo sobre el MISMO buffer ──
        const [wRes, tRes] = await Promise.allSettled([
            this.whisper.transcribe(pcm),                    // (a) ¿qué carácter dijo?
            this.tone.evaluateTones(pcm, chars, expectedTones, ctx.voice) // (b) ¿qué tono dijo?
        ]);

        const heard = (wRes.status === 'fulfilled') ? String(wRes.value || '').trim() : null;
        const toneData = (tRes.status === 'fulfilled') ? tRes.value : null;
        const toneErr = (tRes.status === 'rejected') ? tRes.reason : null;

        // Si TODO falló → que la fachada caiga al modo manual 🎧
        if (!heard && !toneData) {
            throw (toneErr || new Error('engine-error'));
        }

        /* ── verificación de contenido (Whisper, solo texto) ── */
        let contentCheck = null, contentWordScores = [];
        if (heard && chars.length && typeof M.scoreTranscript === 'function') {
            const s = M.scoreTranscript(targetText, heard);
            if (s && s.wordScores) {
                contentWordScores = s.wordScores;          // ok = carácter CORRECTO (no tono)
                contentCheck = {
                    saidCount: s.wordScores.filter((w) => w.ok).length,
                    total: chars.length,
                    sim: s.sim
                };
            }
        }

        /* ── métricas de tono ── */
        let toneScores = [], toneAcc = null, contours = null,
            refAudioUrl = null, refIsTemplate = false, voicedRatio = null;
        if (toneData) {
            toneScores = toneData.toneScores || [];
            contours = toneData.contours || null;
            refAudioUrl = toneData.refAudioUrl || null;
            refIsTemplate = !!toneData.refIsTemplate;
            voicedRatio = toneData.voicedRatio;
            if (toneScores.length) {
                let acc = 0;
                toneScores.forEach((t) => {
                    if (t.status === 'ok') acc += 1;
                    else if (t.status === 'approx') acc += 0.5;
                });
                toneAcc = acc / toneScores.length;
            }
        }

        /* ── puntaje compuesto (el feedback es cualitativo; el chip es
              orientativo: contenido 35 % + tono 65 %) ── */
        let score = null;
        if (toneAcc !== null) {
            const contentPart = contentCheck ? contentCheck.sim : 1; // sin Whisper no se castiga
            score = Math.round(100 * (0.65 * toneAcc + 0.35 * contentPart));
        }

        const fb = this._overallFeedback(toneScores, toneAcc, contentCheck, ctx.script);
        return {
            // spec: misma forma de datos para TODOS los providers
            transcription: heard,
            toneScores: toneScores,
            overallFeedback: fb,
            score: score,
            feedback: fb.es + '\n' + fb.zh,      // compat con la UI v7.5/v7.6
            wordScores: contentWordScores,        // compat (contenido, no tono)
            contentCheck: contentCheck,
            contours: contours,
            refAudioUrl: refAudioUrl,
            refIsTemplate: refIsTemplate,
            voicedRatio: voicedRatio,
            provider: 'local',
            mode: 'auto',
            note: this._noteFor(heard, toneErr, ctx.script === 't' ? 't' : 's'),
            audioBlob: audioBlob
        };
    }

    /* ---------- feedback cualitativo global (spec UX) ---------- */
    _overallFeedback(toneScores, toneAcc, contentCheck, script) {
        const t = script === 't';
        const wrong = toneScores.filter((x) => x.status === 'wrong');
        const okN = toneScores.filter((x) => x.status === 'ok').length;

        // 1. línea global según precisión de tono
        let es, zh;
        if (toneAcc !== null && wrong.length === 0 && okN > 0) {
            es = '¡Buen tono! 🎉 La entonación de la frase suena natural.';
            zh = t ? '聲調真棒！整句聽起來很自然。' : '声调真棒！整句听起来很自然。';
        } else if (toneAcc !== null && wrong.length <= 2 && toneAcc >= 0.6) {
            es = '¡Casi! Practicá los caracteres marcados 🎯';
            zh = t ? '就差一點！練一練標記的字。' : '就差一点！练一练标记的字。';
        } else if (toneAcc !== null) {
            es = 'Escuchá la referencia y repetí despacio, tono por tono 💪';
            zh = t ? '聽參考音頻，一個字一個字慢慢練。' : '听参考音频，一个字一个字慢慢练。';
        } else {
            es = S.manEs; zh = t ? S.manZhT : S.manZhS;
        }

        // 2. detalles por carácter (máx 2 en la línea global; el resto
        //    se ve en el detalle de la UI) — estilo spec:
        //    "5to carácter: sonó como 2º tono, buscá 4º tono (bajada fuerte)"
        const worst = wrong.slice(0, 2).map((x) => x.msgEs);
        if (worst.length) es += ' ' + worst.join(' · ');
        const worstZh = wrong.slice(0, 2).map((x) => x.msgZh);
        if (worstZh.length) zh += ' ' + worstZh.join(' · ');

        // 3. verificación de contenido (Whisper): solo informa QUÉ se entendió
        if (contentCheck && contentCheck.total) {
            if (contentCheck.saidCount === contentCheck.total) {
                es += ' Dijiste los caracteres correctos ✅';
                zh += t ? '內容全對 ✅' : '内容全对 ✅';
            } else if (contentCheck.saidCount >= contentCheck.total * 0.6) {
                es += ' Se entendieron ' + contentCheck.saidCount + ' de ' +
                      contentCheck.total + ' caracteres.';
                zh += t ? '聽懂了 ' + contentCheck.saidCount + '/' + contentCheck.total + ' 個字。'
                        : '听懂了 ' + contentCheck.saidCount + '/' + contentCheck.total + ' 个字。';
            } else {
                es += ' Se entendieron pocos caracteres — hablá más despacio.';
                zh += t ? '聽懂的字不多——說慢一點。' : '听懂的字不多——说慢一点。';
            }
        }
        return { es: es, zh: zh };
    }

    _noteFor(heard, toneErr, script) {
        const t = script === 't';
        if (!heard) {
            const m = String((toneErr && toneErr.message) || toneErr || '');
            if (m.indexOf('no-voice-tono') >= 0) return t ? S.noteNoVoiceZhT : S.noteNoVoiceZhS;
            return t ? S.noteNoContentZhT : S.noteNoContentZhS;
        }
        if (toneErr && String(toneErr.message || toneErr).indexOf('no-voice-tono') >= 0)
            return t ? S.noteNoVoiceZhT : S.noteNoVoiceZhS;
        return '';
    }
}

/* ============================================================
   PROVIDER LOCAL — LocalWhisperProvider (solo transcripción)
   ============================================================ */
class LocalWhisperProvider {
    constructor(engine) {
        this.engine = engine;
        this.id = 'local';
    }
    /** Float32Array 16 kHz → texto en el dispositivo.
     *  ⚠️ Whisper NO puntúa pronunciación ni tono — solo transcribe. */
    async transcribe(float32) {
        const heard = String(await this.engine.transcribe(float32) || '').trim();
        if (!heard) throw new Error('no-speech');
        return heard;
    }
    /** Compatibilidad con la fachada v7.6 (blob → transcripción). */
    async evaluate(audioBlob, targetText, ctx) {
        const pcm = await blobToFloat32_16k(audioBlob);
        if (isSilence(pcm)) throw new Error('no-speech');
        return { transcription: await this.transcribe(pcm), provider: 'local' };
    }
}

/* ============================================================
   PROVIDER NUBE — CloudSpeechProvider (PLACEHOLDER, FASE premium)
   ------------------------------------------------------------
   CÓMO CONECTAR Azure Pronunciation Assessment / SuperSpeech:
     1. Implementar evaluate() haciendo fetch al serverless propio
        (la clave de API NUNCA va en el frontend). Azure es la
        mejor opción futura: scoring GOP fonema por fonema con
        precisión superior a cualquier pipeline local.
     2. Descomentar this.cloud = new CloudSpeechProvider() en el
        constructor de PronunciationEvaluator.
     3. Cambiar UNA línea:  VE.setProvider('cloud')
     La UI (window.VR) no se toca: el objeto de salida debe tener
     LA MISMA FORMA que LocalEvaluator:
       { transcription, toneScores[{char, pinyin, expected,
         detected, status, msgEs, msgZh}], overallFeedback{es,zh},
         score, contentCheck, provider:'cloud', mode:'auto' }
   ============================================================ */
class CloudSpeechProvider {
    constructor(opts) {
        opts = opts || {};
        // ej. 'https://app-chino-espa-ol.vercel.app/api/pron-eval'
        this.endpoint = opts.endpoint || '';
        this.id = 'cloud';
    }
    async evaluate(audioBlob, targetText, ctx) {
        // Esqueleto para el futuro (documentado, inactivo):
        //   const M = window.VoiceRecorderModule;
        //   const wav = await M.blobToWav16k(audioBlob);   // WAV 16 kHz mono 16-bit
        //   const fd = new FormData();
        //   fd.append('audio', wav, 'pron.wav');
        //   fd.append('target', targetText);
        //   const r = await fetch(this.endpoint, { method: 'POST', body: fd });
        //   if (!r.ok) throw new Error('cloud HTTP ' + r.status);
        //   const d = await r.json();   // Azure devuelve score fonema a fonema (GOP)
        //   // → mapear a la MISMA forma: { transcription, toneScores[], overallFeedback }
        //   return { transcription: d.transcript, toneScores: d.toneScores,
        //            overallFeedback: d.feedback, score: d.score,
        //            provider: 'cloud', mode: 'auto' };
        throw new Error('CloudSpeechProvider no configurado todavía (FASE premium)');
    }
}

/* ============================================================
   FACHADA — PronunciationEvaluator
   startRecording() · stopAndEvaluate() · setProvider('local'|'cloud')
   ============================================================ */
class PronunciationEvaluator {
    constructor() {
        this.provider = 'local';                       // 'local' | 'cloud'
        this.engine = new LocalWhisperEngine();
        try {
            this.local = new LocalEvaluator(this.engine);
        } catch (e) {
            // pitch-analyzer.js no cargó → Whisper solo (sin tono)
            console.warn('[VE] LocalToneAnalyzer no disponible:', (e && e.message) || e);
            this.local = null;
        }
        // this.cloud = new CloudSpeechProvider({ endpoint: '...' }); // ← FASE premium
        this.script = 's';                             // 's' | 't' (简体/繁體)
        this._recorder = null;                         // instancia de VoiceRecorder (v7.5)
        this._lastBlob = null;
    }

    /** 'local' (Whisper WASM + F0/DTW, default) | 'cloud' (placeholder premium).
     *  'webspeech'/'off' devuelven el control al camino legado de VR. */
    setProvider(p) {
        this.provider = (p === 'cloud' || p === 'local' || p === 'webspeech' || p === 'off')
            ? p : 'local';
    }
    setScript(s) { this.script = s === 't' ? 't' : 's'; }
    /** Voz TTS de referencia ('f'|'m') — la misma que usa 🔊 CN. */
    setVoice(v) { this._voice = v === 'm' ? 'm' : 'f'; }
    get voice() { return this._voice || this._storedVoice(); }
    _storedVoice() {
        try { return localStorage.getItem('ac_voice_zh') === 'm' ? 'm' : 'f'; }
        catch (e) { return 'f'; }
    }
    get activeRecorder() { return this._recorder; }

    /* ---------- captura ---------- */
    async startRecording(opts) {
        opts = opts || {};
        if (!window.VoiceRecorder) {
            const e = new Error('sin módulo de captura'); e.name = 'UnsupportedBrowser'; throw e;
        }
        this.abort(); // por si quedó algo de una sesión anterior

        // Ambos motores arrancan a cargarse EN PARALELO (no bloquean el
        // micro). Solo la 1.ª vez (~40 MB) → luego sale del cache del
        // navegador. La referencia TTS se pide recién al evaluar (y queda
        // cacheada por frase).
        if (this.provider === 'local') {
            const self = this;
            this.engine.preload(function (pct) { self._pushProgress(pct); });
        }

        this._recorder = new window.VoiceRecorder({ maxSeconds: opts.maxSeconds || 20 });
        await this._recorder.start(opts.onTick);
        this._recorder.onAutoStop = function (res) {
            if (typeof opts.onAutoStop === 'function') opts.onAutoStop(res);
        };
        return true;
    }

    /** Aborta la captura (navegación a otra oración). El motor sigue
     *  descargando en background: es solo banda ancha, no micrófono. */
    abort() {
        if (this._recorder) {
            try { this._recorder.abort(); } catch (e) {}
            this._recorder = null;
        }
    }

    /* ---------- corte + evaluación → objeto estandarizado SIEMPRE ---------- */
    async stopAndEvaluate(targetText) {
        const rec = this._recorder;
        this._recorder = null;
        if (!rec) return this._manual(null, null);

        const blobRes = await rec.stop(); // { blob, seconds, mime } (idempotente)
        const blob = blobRes && blobRes.blob;
        if (!blob || !blob.size) {
            return { mode: 'error', errorMsg: '🎤 No pude grabar. Intentalo otra vez.' };
        }
        this._lastBlob = blob;

        try {
            if (this.provider === 'local') return await this._evalLocal(blob, targetText);
            if (this.provider === 'cloud') {
                if (!this.cloud) {
                    const err = new Error('cloud-not-configured');
                    return this._manual(blob, err);
                }
                const r = await this.cloud.evaluate(blob, targetText, { script: this.script });
                r.audioBlob = blob;
                return r;
            }
            return this._manual(blob, null); // webspeech/off → camino legado de VR
        } catch (err) {
            return this._manual(blob, err);  // JAMÁS rompemos la UI: fallback 🎧
        }
    }

    /** Adaptador público independiente (spec): blob + texto → resultado.
     *  Útil para tests y para futuras integraciones sin pasar por la UI. */
    async evaluatePronunciation(audioBlob, targetText) {
        try {
            if (this.provider === 'cloud') {
                if (!this.cloud) throw new Error('cloud-not-configured');
                return await this.cloud.evaluate(audioBlob, targetText, { script: this.script });
            }
            if (this.provider === 'webspeech' || this.provider === 'off')
                return this._manual(audioBlob, null); // sin motor local → modo escucha
            return await this._evalLocal(audioBlob, targetText);
        } catch (err) {
            return this._manual(audioBlob, err);
        }
    }

    /* ---------- internals ---------- */
    async _evalLocal(blob, targetText) {
        const ui = this._ui();
        // Espera acotada al motor (1.ª vez): la barra sigue en pantalla
        await this._waitForEngine();
        if (ui) ui.setVoiceStatus(S.procEs, this._zh(S.procZhS, S.procZhT), null);
        if (!this.local) throw new Error('engine-error'); // pitch-analyzer faltante
        const res = await this.local.evaluate(blob, targetText, {
            script: this.script,
            voice: this.voice
        });
        res.audioBlob = blob;
        return res;
    }

    _waitForEngine() {
        if (this.engine.ready) return Promise.resolve();
        const self = this;
        if (this.engine.status === 'idle') {
            this.engine.preload(function (pct) { self._pushProgress(pct); })
                .catch(function () {}); // el error lo maneja el polling de abajo
        }
        const started = Date.now();
        return new Promise((resolve, reject) => {
            const iv = setInterval(() => {
                if (self.engine.ready) { clearInterval(iv); resolve(); }
                else if (self.engine.status === 'error') {
                    clearInterval(iv);
                    reject(new Error('engine-error: ' + self.engine.errorMsg));
                } else if (Date.now() - started > VE_CONFIG.maxWaitMs) {
                    clearInterval(iv);
                    reject(new Error('engine-timeout'));
                }
            }, 250);
        });
    }

    _manual(blob, err) {
        let es = S.manEs, zh = this._zh(S.manZhS, S.manZhT), note = this._zh(S.noteDefaultZhS, S.noteDefaultZhT, S.noteDefaultEs);
        if (err) {
            const msg = String((err && err.message) || err);
            if (msg.indexOf('no-speech') >= 0) {
                note = this._zh(S.noteNoSpeechZhS, S.noteNoSpeechZhT, S.noteNoSpeechEs);
            } else if (msg.indexOf('no-voice-tono') >= 0) {
                note = this._zh(S.noteNoVoiceZhS, S.noteNoVoiceZhT, S.noteNoVoiceEs);
            } else if (msg.indexOf('engine-timeout') >= 0) {
                note = this._zh(S.noteTimeoutZhS, S.noteTimeoutZhT, S.noteTimeoutEs);
            } else if (msg.indexOf('cloud-not-configured') >= 0) {
                note = this._zh(S.noteCloudZhS, S.noteCloudZhT, S.noteCloudEs);
            } else if (msg.indexOf('engine-error') >= 0 || msg.indexOf('decode') >= 0 ||
                       msg.indexOf('no-audiocontext') >= 0 || msg.indexOf('pitch-analyzer') >= 0) {
                note = this._zh(S.noteEngineZhS, S.noteEngineZhT, S.noteEngineEs);
            }
        }
        return {
            score: null,
            feedback: es + '\n' + zh,
            transcription: '', toneScores: [], overallFeedback: { es: es, zh: zh },
            wordScores: [],
            transcript: '',
            provider: this.provider,
            mode: 'manual',
            note: note,
            audioBlob: blob
        };
    }

    /* ---------- puente de UI con window.VR (si está) ---------- */
    _ui() {
        return (window.VR && typeof window.VR.setVoiceStatus === 'function') ? window.VR : null;
    }
    _pushProgress(pct) {
        const ui = this._ui();
        if (!ui) return;
        // Mientras graba, solo la barra (no tapar el texto "Grabando…")
        if (this._recorder && this._recorder.recording) {
            ui.setVoiceProgress(pct >= 100 ? null : pct);
            return;
        }
        if (pct >= 100) {
            ui.setVoiceStatus(S.readyEs, this._zh(S.readyZhS, S.readyZhT), null);
        } else {
            ui.setVoiceStatus(S.dlEs(pct), this._zh(S.dlZhS, S.dlZhT), pct);
        }
    }
    /** zh según preferencia 简/繁 (zhT/zhS opcionales, es como extra). */
    _zh(zhS, zhT, es) {
        return this.script === 't' ? (zhT || zhS) : (zhS || zhT || es || '');
    }
}

/* ============================================================
   EXPORTS + instancia única
   ============================================================ */
window.PronunciationEvaluator = PronunciationEvaluator;   // clase (spec/tests)
window.LocalWhisperProvider = LocalWhisperProvider;       // transcripción local
window.LocalToneAnalyzer = LocalToneAnalyzer;             // F0 + DTW local
window.LocalEvaluator = LocalEvaluator;                   // composición (spec v2)
window.CloudSpeechProvider = CloudSpeechProvider;         // placeholder documentado
window.VE = new PronunciationEvaluator();                 // instancia única que usa VR

})();
