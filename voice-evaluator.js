/* ============================================================
   voice-evaluator.js — v7.6 Motor de Evaluación de Pronunciación
   con Whisper WebAssembly · 100 % LOCAL Y PRIVADO
   ------------------------------------------------------------
   QUÉ HAY ACÁ
     · PronunciationEvaluator → fachada pedida por la spec:
         startRecording() · stopAndEvaluate() · setProvider('local'|'cloud')
       Devuelve SIEMPRE el objeto estandarizado:
         { score: 0-100|null, feedback, wordScores[], transcript,
           provider, mode: 'auto'|'manual', audioBlob }
     · LocalWhisperEngine → corre Xenova/whisper-tiny (ONNX/WASM,
       quantized) con @xenova/transformers en un Web Worker, para
       no trabar la UI. Fallback automático a hilo principal en
       navegadores sin module workers (iOS < 15).
     · LocalWhisperProvider → audio → Float32Array 16 kHz mono →
       transcripción EN EL DISPOSITIVO → puntaje por pinyin con
       tonos (reutiliza el motor de VoiceRecorder.js, cero
       duplicación) → objeto estandarizado.
     · CloudSpeechProvider → PLACEHOLDER comentado para el futuro
       premium (SuperSpeech / Azure / Google). Se activa con UNA
       línea: VE.setProvider('cloud'). La clave de API NUNCA va en
       el frontend (siempre vía serverless propio).

   PRIVACIDAD (feature principal)
     El audio NUNCA sale del dispositivo: ni Whisper ni la
     comparación hacen requests con la voz. El modelo (~40 MB, la
     1.ª vez) se descarga de un CDN y queda cacheado en el
     navegador (Cache API de transformers.js) — se descarga el
     motor, no la voz del alumno.

   INTEGRACIÓN (app.js no cambia; VoiceRecorder.js delega acá)
     window.VR (UI) usa window.VE si está presente:
       VE.startRecording({ maxSeconds, onTick, onAutoStop })
       VE.stopAndEvaluate(oraciónObjetivo) → resultado
     Si este archivo no carga (offline 1.ª visita), VR vuelve
     solo al camino v7.5 (webspeech → modo manual 🎧).

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
    // Equilibrio velocidad móvil / precisión (spec): tiny por defecto.
    // Subir a 'Xenova/whisper-base' (~80 MB) si se quiere afinar más.
    model: 'Xenova/whisper-tiny',
    libUrl: 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2',
    language: 'zh',          // el objetivo de pronunciación siempre es chino
    task: 'transcribe',
    quantized: true,          // versión int8: 4× más liviana, ideal WASM
    maxWaitMs: 120000,        // espera máx al motor al evaluar (1.ª descarga)
    minRms: 0.0015            // debajo de esto → "no escuché nada"
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
    procZhS: '正在分析发音…',
    procZhT: '正在分析發音…',
    manEs: '🎧 Escuchá tu grabación y comparala con el audio CN',
    manZhS: '🎧 听一听你的录音，跟中文音频对比',
    manZhT: '🎧 聽一聽你的錄音，跟中文音頻對比',

    noteNoSpeechEs: 'No escuché nada claro — acercate al micrófono y hablá más fuerte.',
    noteNoSpeechZhS: '没听清楚，请靠近麦克风、再大声一点。',
    noteNoSpeechZhT: '沒聽清楚，請靠近麥克風、再大一點。',
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

/* ============================================================
   MOTOR WASM — Whisper en un Web Worker (hilo separado)
   ------------------------------------------------------------
   El worker se crea desde un Blob con { type: 'module' } y
   importa transformers.js por CDN. El modelo se descarga y
   queda cacheado por la Cache API del navegador (transformers.js
   lo hace solo): la 2.ª vez arranca al instante y sin red.
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
    "        quantized: " + VE_CONFIG.quantized + ",",
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

    /** Float32Array 16 kHz mono → texto (dentro del dispositivo). */
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
                }, 60000); // nunca colgar la UI más de 60 s
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
            quantized: VE_CONFIG.quantized,
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
   AUDIO → Float32Array 16 kHz mono (lo que Whisper exige)
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
   PROVIDER LOCAL — Whisper WASM → transcripción → puntaje
   ============================================================ */
class LocalWhisperProvider {
    constructor(engine) {
        this.engine = engine;
        this.id = 'local';
    }
    async evaluate(audioBlob, targetText, ctx) {
        ctx = ctx || {};
        const M = window.VoiceRecorderModule || {};
        if (typeof M.scoreTranscript !== 'function' || typeof M.feedbackFor !== 'function')
            throw new Error('score-module-missing');

        const float32 = await blobToFloat32_16k(audioBlob);
        if (isSilence(float32)) {
            const e = new Error('no-speech'); throw e;
        }

        // 🧠 Transcripción 100 % en el dispositivo (sin red, sin servidor)
        const heard = String(await this.engine.transcribe(float32) || '').trim();
        if (!heard) throw new Error('no-speech');

        // Puntaje por pinyin con tonos — el mismo motor de v7.5, sin duplicar
        const s = M.scoreTranscript(targetText, heard);
        const fb = M.feedbackFor(s.score, s.wordScores, ctx.script === 't' ? 't' : 's');
        return {
            score: s.score,
            feedback: fb.es + '\n' + fb.zh,
            wordScores: s.wordScores,
            transcript: heard,
            provider: 'local',
            mode: 'auto'
        };
    }
}

/* ============================================================
   PROVIDER NUBE — CloudSpeechProvider (PLACEHOLDER, FASE premium)
   ------------------------------------------------------------
   CÓMO CONECTAR SuperSpeech / Azure / Google MAÑANA:
     1. Implementar evaluate() haciendo fetch al serverless propio
        (la clave de API NUNCA va en el frontend).
     2. Descomentar this.cloud = new CloudSpeechProvider() en el
        constructor de PronunciationEvaluator.
     3. Cambiar UNA línea:  VE.setProvider('cloud')
     La UI (window.VR) no se toca: el objeto de salida es el mismo.
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
        //   const d = await r.json();                      // { transcript } o
        //   const s = M.scoreTranscript(targetText, d.transcript); // { score por palabra }
        //   const fb = M.feedbackFor(s.score, s.wordScores, ctx.script);
        //   return { score: s.score, feedback: fb.es + '\n' + fb.zh,
        //            wordScores: s.wordScores, transcript: d.transcript,
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
        this.local = new LocalWhisperProvider(this.engine);
        // this.cloud = new CloudSpeechProvider({ endpoint: '...' }); // ← FASE premium
        this.script = 's';                             // 's' | 't' (简体/繁體)
        this._recorder = null;                         // instancia de VoiceRecorder (v7.5)
        this._lastBlob = null;
    }

    /** 'local' (Whisper WASM, default) | 'cloud' (placeholder premium).
     *  'webspeech'/'off' devuelven el control al camino legado de VR. */
    setProvider(p) {
        this.provider = (p === 'cloud' || p === 'local' || p === 'webspeech' || p === 'off')
            ? p : 'local';
    }
    setScript(s) { this.script = s === 't' ? 't' : 's'; }
    get activeRecorder() { return this._recorder; }

    /* ---------- captura ---------- */
    async startRecording(opts) {
        opts = opts || {};
        if (!window.VoiceRecorder) {
            const e = new Error('sin módulo de captura'); e.name = 'UnsupportedBrowser'; throw e;
        }
        this.abort(); // por si quedó algo de una sesión anterior

        // El motor arranca a descargarse EN PARALELO (no bloquea el micro).
        // Solo la 1.ª vez (~40 MB) → después sale del cache del navegador.
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
        const res = await this.local.evaluate(blob, targetText, { script: this.script });
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
            } else if (msg.indexOf('engine-timeout') >= 0) {
                note = this._zh(S.noteTimeoutZhS, S.noteTimeoutZhT, S.noteTimeoutEs);
            } else if (msg.indexOf('cloud-not-configured') >= 0) {
                note = this._zh(S.noteCloudZhS, S.noteCloudZhT, S.noteCloudEs);
            } else if (msg.indexOf('engine-error') >= 0 || msg.indexOf('decode') >= 0 ||
                       msg.indexOf('no-audiocontext') >= 0 || msg.indexOf('score-module') >= 0) {
                note = this._zh(S.noteEngineZhS, S.noteEngineZhT, S.noteEngineEs);
            }
        }
        return {
            score: null,
            feedback: es + '\n' + zh,
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
    /** zh según preferencia 简/繁 (zhT/zhoS opcionales, es como extra). */
    _zh(zhS, zhT, es) {
        return this.script === 't' ? (zhT || zhS) : (zhS || zhT || es || '');
    }
}

/* ============================================================
   EXPORTS + instancia única
   ============================================================ */
window.PronunciationEvaluator = PronunciationEvaluator;   // clase (spec/tests)
window.LocalWhisperProvider = LocalWhisperProvider;       // visibilidad p/ FASE premium
window.CloudSpeechProvider = CloudSpeechProvider;         // placeholder documentado
window.VE = new PronunciationEvaluator();                 // instancia única que usa VR

})();
