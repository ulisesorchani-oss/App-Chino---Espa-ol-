// ============================================================
// free-talk.js — Pronunciación libre: grabá y mirá qué entendió la IA
// ============================================================
// Reemplaza el atajo "Pronunciación" de Entrenar (btn-train-record),
// que hasta ahora saltaba a Hoy y abría el comparador contra la frase
// objetivo (VR/VE + record-details) — ESO SIGUE EXISTIENDO ahí, sin
// tocar una línea: sigue siendo el mejor camino para practicar una
// frase puntual del temario. Esto es otra cosa: un evaluador LIBRE,
// estilo TalkPal/chat — grabás lo que quieras decir (hasta 30 s), sin
// frase objetivo, y la app te muestra la transcripción como un mensaje
// de chat para que TE autoevalúes ("¿es eso lo que quise decir?").
// Sin objetivo no hay con qué comparar → sin puntaje, sin tonos: eso
// solo tiene sentido contra un texto conocido (ver VoiceRecorder.js).
//
// ARQUITECTURA "PLUGIN" (pedido explícito: dejar la base para
// integraciones futuras sin reescribir esto): este archivo no sabe
// NADA de cómo se transcribe — llama a window.VE.transcribeFree(blob,
// lang), un método chico agregado a PronunciationEvaluator
// (voice-evaluator.js) que hoy corre 100% local (Whisper WASM,
// Xenova/whisper-tiny, el mismo motor ya cacheado por el comparador de
// Hoy) y el día que el presupuesto dé para un proveedor pago (Azure
// Pronunciation Assessment, SuperSpeech...) solo hay que completar
// CloudSpeechProvider.transcribeFree() ahí — este archivo, la UI y el
// resto de la app no cambian una línea (VE.setProvider('cloud') ya
// existe para ese switch, ver voice-evaluator.js).
//
// Reusa: window.VoiceRecorder (VoiceRecorder.js: getUserMedia +
// MediaRecorder + medidor de nivel + límite de tiempo — la MISMA
// captura que usa el comparador de Hoy, otra instancia), window.VE
// (voice-evaluator.js: motor Whisper WASM, ya se precarga con
// VE.warmup() al abrir la app), state.mode (app.js: es-cn → target
// zh, cn-es → target es — sigue el modo activo de la app, igual que
// el resto de los módulos) y el shell de popup .lq-pop (mismo patrón
// que podcast.js/minimal-pairs.js).
//
// Es un script clásico (sin import/export): se carga en index.html
// después de VoiceRecorder.js/voice-evaluator.js/app.js y engancha
// #btn-train-record — Entrenar deja de redirigir a Hoy para este botón.
//
// PRIVACIDAD: igual que el resto del módulo de voz — el audio vive
// SOLO en memoria de esta pestaña (nunca localStorage ni servidor) y
// se libera al cerrar el popup o al borrar el historial.
// ============================================================
(function freeTalkInit() {
    'use strict';

    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const pop = $('talk-pop');
    if (!pop) return;
    const body = $('tk-body');

    const MAX_SECONDS = 30; // spec: grabación libre "estilo chat", hasta 30 s

    const T = {
        introEs: 'Grabá lo que quieras decir en voz alta (hasta 30 s) y mirá qué entendió la IA — así podés autoevaluarte vos mismo, sin frase objetivo.',
        privacy: '🔒 Tu voz se procesa en tu dispositivo y no se guarda ni se envía a ningún servidor.',
        tapToRecord: '👆 Tocá 🎤 para grabar',
        recording: '🔴 Grabando… tocá para terminar (máx 30 s)',
        transcribing: '🧠 Transcribiendo…',
        empty: 'Todavía no grabaste nada.',
        errDenied: '🎤 Permiso de micrófono denegado. Tocá el candado 🔒 de la barra de direcciones y permití el micrófono.',
        errNoMic: '🎤 No encontré micrófono en este dispositivo.',
        errBusy: '🎤 El micrófono está ocupado (¿otra app lo está usando?). Cerrala e intentalo de nuevo.',
        errSupport: '🎤 Tu navegador no soporta grabación. Probá con Chrome o con Safari actualizado.',
        errSecure: '🎤 La grabación necesita HTTPS (o localhost). Abrí la app en su dirección oficial.',
        errNoSpeech: 'No escuché nada claro — acercate al micrófono y hablá más fuerte.',
        errGeneric: 'No pude transcribir esa grabación. Probá de nuevo.',
        clear: '🗑️ Borrar historial'
    };

    // S.bubbles: [{ url, text, lang, confidence }] — SOLO en memoria,
    // se libera (URL.revokeObjectURL) al cerrar el popup o al borrar.
    const S = { recorder: null, state: 'idle', bubbles: [], tok: 0, errorMsg: '', tickLabel: '' };
    let player = null;
    let rafId = 0;

    function targetLang() {
        return (typeof state === 'object' && state && state.mode === 'cn-es') ? 'es' : 'zh';
    }
    function langLabel(lang) { return lang === 'es' ? '🇪🇸 Español' : '🇨🇳 中文'; }

    function errText(err) {
        const n = err && err.name;
        if (n === 'NotAllowedError' || n === 'PermissionDeniedError') return T.errDenied;
        if (n === 'NotFoundError' || n === 'DevicesNotFoundError') return T.errNoMic;
        if (n === 'NotReadableError' || n === 'TrackStartError') return T.errBusy;
        if (n === 'UnsupportedBrowser') return T.errSupport;
        return T.errGeneric;
    }

    // ── overlay: abrir/cerrar ──
    function openPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closePop() {
        stopAll();
        releaseBubbles();
        S.bubbles = [];
        pop.classList.add('hidden');
        try { if (typeof syncBodyScroll === 'function') syncBodyScroll(); else document.body.style.overflow = ''; } catch (e) { }
    }
    function stopAll() {
        S.tok++;
        cancelWave();
        if (S.recorder) { try { S.recorder.abort(); } catch (e) { } S.recorder = null; }
        S.state = 'idle';
    }
    function releaseBubbles() {
        S.bubbles.forEach((b) => { if (b.url) { try { URL.revokeObjectURL(b.url); } catch (e) { } } });
    }

    function openTalk() {
        stopAll();
        releaseBubbles();
        S.bubbles = [];
        S.errorMsg = '';
        openPop();
        renderShell();
    }

    // ── shell: se construye UNA sola vez por apertura (evita perder
    //    foco/reiniciar la waveform en cada tick de progreso — mismo
    //    criterio que podcast.js/VoiceRecorder.js) ──
    function renderShell() {
        body.innerHTML =
            '<div class="tk-head">🎤 Pronunciación libre</div>'
            + '<p class="tk-intro">' + escHtml(T.introEs) + '</p>'
            + '<div class="tk-chat" id="tk-chat"></div>'
            + '<canvas class="tk-wave" id="tk-wave"></canvas>'
            + '<div class="tk-status" id="tk-status"></div>'
            + '<div class="tk-controls">'
            + '<button type="button" id="tk-record" class="tk-record-btn" aria-label="Grabar">🎤</button>'
            + '</div>'
            + '<button type="button" id="tk-clear" class="lq-btn lq-ghost tk-clear hidden">' + escHtml(T.clear) + '</button>'
            + '<p class="record-privacy">' + escHtml(T.privacy) + '</p>';
        $('tk-record').addEventListener('click', onRecordClick);
        $('tk-clear').addEventListener('click', clearHistory);
        renderChat();
        updateStatus();
        updateBtn();
    }

    // ── piezas actualizadas SIN re-crear el DOM entero ──
    function renderChat() {
        const chat = $('tk-chat');
        if (!chat) return;
        if (!S.bubbles.length) {
            chat.innerHTML = '<p class="tk-empty">' + escHtml(T.empty) + '</p>';
        } else {
            chat.innerHTML = S.bubbles.map((b, i) =>
                '<div class="tk-bubble">'
                + '<div class="tk-bubble-head">'
                + '<button type="button" class="tk-play" data-i="' + i + '" aria-label="Escuchar mi grabación">▶️</button>'
                + '<span class="tk-bubble-lang">' + escHtml(langLabel(b.lang)) + '</span>'
                + '</div>'
                + '<div class="tk-bubble-text"' + (b.lang === 'zh' ? ' lang="zh"' : '') + '>' + escHtml(b.text) + '</div>'
                + '</div>'
            ).join('');
            chat.querySelectorAll('.tk-play').forEach((btn) => {
                btn.addEventListener('click', () => playBubble(parseInt(btn.dataset.i, 10)));
            });
        }
        const clearBtn = $('tk-clear');
        if (clearBtn) clearBtn.classList.toggle('hidden', !S.bubbles.length);
        chat.scrollTop = chat.scrollHeight;
    }
    function updateStatus() {
        const el = $('tk-status');
        if (!el) return;
        el.textContent =
            S.state === 'recording' ? T.recording :
            S.state === 'processing' ? T.transcribing :
            S.errorMsg || T.tapToRecord;
        el.classList.toggle('is-error', !!S.errorMsg && S.state === 'idle');
    }
    function updateBtn() {
        const btn = $('tk-record');
        if (!btn) return;
        btn.className = 'tk-record-btn' + (S.state === 'recording' ? ' is-recording' : S.state === 'processing' ? ' is-processing' : '');
        btn.textContent = S.state === 'recording' ? (S.tickLabel || '🔴 00:00') : S.state === 'processing' ? '' : '🎤';
        btn.setAttribute('aria-label', S.state === 'recording' ? 'Terminar grabación' : 'Grabar');
        const wave = $('tk-wave');
        if (wave) wave.classList.toggle('is-on', S.state === 'recording');
    }

    // ── flujo principal ──
    async function onRecordClick() {
        if (S.state === 'recording') { finishRecording(); return; }
        if (S.state !== 'idle') return; // 'processing': ignorar (sin cancelación — grabaciones cortas)

        if (!window.VoiceRecorder || !VoiceRecorder.supported()) {
            showError(!navigator.mediaDevices ? T.errSecure : T.errSupport);
            return;
        }
        S.errorMsg = '';
        S.state = 'recording';
        S.tickLabel = '🔴 00:00';
        updateStatus(); updateBtn();
        try {
            S.recorder = new VoiceRecorder({ maxSeconds: MAX_SECONDS });
            await S.recorder.start((s) => {
                const mm = String(Math.floor(s / 60)).padStart(2, '0');
                const ss = String(s % 60).padStart(2, '0');
                S.tickLabel = '🔴 ' + mm + ':' + ss;
                updateBtn();
            });
            S.recorder.onAutoStop = () => { if (S.state === 'recording') finishRecording(); };
            loopWave();
        } catch (err) {
            S.recorder = null;
            S.state = 'idle';
            showError(errText(err));
        }
    }

    async function finishRecording() {
        if (S.state !== 'recording' || !S.recorder) return;
        const myTok = ++S.tok;
        cancelWave();
        S.state = 'processing';
        updateStatus(); updateBtn();

        const rec = S.recorder;
        S.recorder = null;
        const res = await rec.stop();
        if (myTok !== S.tok) return;

        const blob = res && res.blob;
        if (!blob || !blob.size) { S.state = 'idle'; showError(T.errGeneric); return; }

        const lang = targetLang();
        try {
            const out = await window.VE.transcribeFree(blob, lang);
            if (myTok !== S.tok) return; // se cerró el popup mientras transcribía
            S.bubbles.push({ url: URL.createObjectURL(blob), text: out.text, lang: lang, confidence: out.confidence });
            S.errorMsg = '';
            S.state = 'idle';
            renderChat(); updateStatus(); updateBtn();
        } catch (err) {
            if (myTok !== S.tok) return;
            S.state = 'idle';
            const msg = String((err && err.message) || err || '');
            showError(msg.indexOf('no-speech') >= 0 ? T.errNoSpeech : T.errGeneric);
        }
    }

    function showError(msg) {
        S.errorMsg = msg;
        updateStatus(); updateBtn();
    }

    function clearHistory() {
        releaseBubbles();
        S.bubbles = [];
        renderChat();
    }

    function playBubble(i) {
        const b = S.bubbles[i];
        if (!b || !b.url) return;
        if (!player) player = new Audio();
        if (player.src !== b.url) player.src = b.url;
        try { player.currentTime = 0; } catch (e) { }
        player.play().catch(() => { });
    }

    // ── waveform mientras graba (mismo dibujo que VoiceRecorder.js,
    //    copia chica: su versión es privada a esa IIFE) ──
    function loopWave() {
        cancelWave();
        const cv = $('tk-wave');
        if (!cv) return;
        fitCanvas(cv);
        const draw = () => {
            if (!S.recorder || !S.recorder.recording) { rafId = 0; return; }
            const c = cv.getContext('2d');
            if (!c) return;
            const w = cv.width, h = cv.height;
            const lv = S.recorder.levels(28);
            c.clearRect(0, 0, w, h);
            c.fillStyle = '#dc2626';
            const bw = w / (28 * 1.6);
            lv.forEach((v, i) => {
                const bh = Math.max(3, v * h * 0.92);
                c.fillRect(i * (w / 28), (h - bh) / 2, bw, bh);
            });
            rafId = requestAnimationFrame(draw);
        };
        rafId = requestAnimationFrame(draw);
    }
    function cancelWave() { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } }
    function fitCanvas(cv) {
        const dpr = window.devicePixelRatio || 1;
        const cssW = cv.clientWidth || 260;
        cv.width = Math.round(cssW * dpr);
        cv.height = Math.round(34 * dpr);
    }

    // ── entrada y cierre (mismo patrón que podcast.js/minimal-pairs.js) ──
    document.addEventListener('DOMContentLoaded', () => {
        const btnEntry = $('btn-train-record');
        if (btnEntry) btnEntry.addEventListener('click', () => {
            if (typeof window.showFeatureTip === 'function') {
                window.showFeatureTip('talk-libre', '🎤', 'Pronunciación libre', [
                    'Tocá 🎤, decí lo que quieras en voz alta (hasta 30 s) y soltá para terminar.',
                    'La IA transcribe lo que entendió — comparalo con lo que quisiste decir para autoevaluarte.'
                ], openTalk);
            } else {
                openTalk();
            }
        });
        const closeBtn = $('talk-close');
        if (closeBtn) closeBtn.addEventListener('click', closePop);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden') && !(typeof topLayerOpen === 'function' && topLayerOpen())) closePop();
        });
        document.addEventListener('click', (e) => {
            if (pop.classList.contains('hidden')) return;
            const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
            if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
            if (e.target.closest && e.target.closest('#btn-train-record')) return;
            closePop();
        });
    });

    // API pública mínima (por si algún otro punto de entrada quiere abrirlo)
    window.openFreeTalk = openTalk;
})();
