// ============================================================
// podcast.js — Podcast: escuchar una lección entera, manos libres
// ============================================================
// v9.70 (AUDITORIA-GAGNE-MAYER.md, evento 9 / repaso): reemplaza a
// "Solo oído" en Entrenar (v9.69, mudado a Hoy). Elegís una lección de
// las de Aprender (window.GRADED_LESSONS, lessons-graduated.js) y la
// escuchás entera de corrido — sin interactuar oración por oración.
// Pensado para REPASAR contenido que ya viste, no para primera
// exposición: por eso el texto queda oculto por defecto (entrenar el
// oído sin la muleta visual, la misma lógica que ya justificaba "Solo
// oído"), con un botón chico "👁️ Ver texto" para un vistazo bajo
// demanda si te perdiste una palabra — nunca activado solo.
//
// MOTOR DE COLA: adaptado de "▶️ Escuchar todo" (lessons-dele.js,
// dQueue/dQIdx/playQueueStep, ~línea 1027-1182) — confirmado en
// diagnóstico previo que es genérico (array de strings + una función
// que reproduce uno y avisa cuándo termina), no específico de DELE/
// español. Acá la función que reproduce es propia (pdPlayLine más
// abajo) porque la de lessons-graduated.js (speakZh) es privada a su
// propia IIFE — mismo pipeline fetchTTS/blob/applyTtsSpeed que usa
// TODO el resto de la app, no una forma nueva de hacerlo.
//
// SELECCIÓN DE LECCIÓN (híbrida): lessonForSentence() (reader.js) NO
// sirve acá — mapea a window.LESSONS_DATA (el lector 📖 de texto
// libre), una fuente de datos DISTINTA de GRADED_LESSONS (los
// mini-dramas que toca este módulo); no son compatibles. En su lugar,
// lessons-graduated.js marca 'ac_last_lesson_id' cada vez que se abre
// la vista de lectura de una lección (openStory) — un marcador chico
// y nuevo, de solo lectura acá, que este módulo usa para preseleccionar
// "seguí con lo último que viste" arriba de la lista completa.
//
// VELOCIDAD: reusa playbackSpeed/cycleSpeed (audio-tts.js, global) —
// nada nuevo que resolver, el server ya sintetiza al rate pedido.
//
// Es un script clásico (sin import/export): se carga en index.html
// después de app.js/audio-tts.js/lessons.js+lessons-tocfl.js+
// lessons-extra.js (usa GRADED_LESSONS, fetchTTS/ttsBody/ttsLangFor/
// applyTtsSpeed/playbackSpeed/cycleSpeed/voiceZh, ck(), stopGlobalAudio/
// stopReader, todo en tiempo de ejecución) y expone openPodcast como
// global — app.js NO lo llama: el propio archivo engancha #btn-podcast.
// No toca SRS, checkAnswer, getFiltered ni el state global de Hoy.
// ============================================================
(function podcastInit() {
    'use strict';
    const LESSONS = (typeof window.GRADED_LESSONS !== 'undefined') ? window.GRADED_LESSONS : [];
    if (!LESSONS.length) return;

    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const zhKey = () => (typeof ck === 'function') ? ck() : 'simp';

    const pop = $('podcast-pop');
    if (!pop) return;
    const body = $('pd-body'), progNum = $('pd-progress-num');

    const S = { view: null, lesson: null };
    // ── motor de cola (adaptado de lessons-dele.js: dQueue/dQIdx/playQueueStep) ──
    let pQueue = null;      // array de líneas [{zh, es}] de la lección actual
    let pIdx = 0;           // índice actual dentro de la cola
    let pAudio = null;      // Audio() del API en curso
    let pTtsU = null;       // utterance del fallback (voz del sistema) en curso
    let pTok = 0;           // invalida callbacks de una reproducción vieja
    let pState = 'idle';    // 'idle' | 'loading' | 'playing' | 'paused' | 'done'
    let showText = false;   // "👁️ Ver texto" — NUNCA activado por defecto

    function getLastLessonId() {
        try { return localStorage.getItem('ac_last_lesson_id') || null; } catch (e) { return null; }
    }

    // ── velocidad: mismo patrón chico que bindSpeedChip (lessons-graduated.js) ──
    function speedLabel() { return '⚡ ' + ((typeof playbackSpeed === 'number') ? playbackSpeed : 1) + 'x'; }
    function bindSpeedChip(btn) {
        if (!btn) return;
        btn.textContent = speedLabel();
        btn.addEventListener('click', () => { if (typeof cycleSpeed === 'function') cycleSpeed(); btn.textContent = speedLabel(); });
    }

    // ── overlay: abrir/cerrar ──
    function openPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closePop() {
        stopAll();
        pop.classList.add('hidden');
        try { if (typeof syncBodyScroll === 'function') syncBodyScroll(); else document.body.style.overflow = ''; } catch (e) { }
        S.lesson = null; S.view = null;
        pQueue = null; pIdx = 0; showText = false;
    }

    // ── audio: una línea, con el MISMO pipeline fetchTTS/blob/applyTtsSpeed
    //    que usa todo el resto de la app (daily-stories.js, classics-reader.js,
    //    lessons-graduated.js) — sin reinventar la síntesis ni la velocidad. ──
    function stopAll() {
        pTok++;
        if (pAudio) { try { pAudio.pause(); } catch (e) { } pAudio = null; }
        if (pTtsU) { try { speechSynthesis.cancel(); } catch (e) { } pTtsU = null; }
        pState = 'idle';
    }
    function currentLine() {
        return (pQueue && pIdx >= 0 && pIdx < pQueue.length) ? pQueue[pIdx] : null;
    }
    async function playCurrent() {
        const line = currentLine();
        if (!line) { onQueueDone(); return; }
        const myTok = ++pTok;
        pState = 'loading';
        updatePlayerUI();
        if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
        if (typeof stopReader === 'function') stopReader();
        try {
            const gender = (typeof voiceZh !== 'undefined') ? voiceZh : 'f';
            const langCode = (typeof ttsLangFor === 'function') ? ttsLangFor('zh', gender) : 'zh-CN';
            const reqBody = (typeof ttsBody === 'function') ? ttsBody(line.zh, langCode, gender) : { text: line.zh, lang: langCode, voice: gender };
            const resp = await fetchTTS(reqBody, 12000);
            if (myTok !== pTok) return;
            if (!resp.ok) throw new Error('tts http ' + resp.status);
            const data = await resp.json();
            if (myTok !== pTok) return;
            if (!data.audio) throw new Error('sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            const audio = new Audio(url);
            try { audio.preservesPitch = true; audio.webkitPreservesPitch = true; } catch (e2) { }
            if (typeof applyTtsSpeed === 'function') applyTtsSpeed(audio, data);
            pAudio = audio;
            pState = 'playing';
            updatePlayerUI();
            const gone = () => { URL.revokeObjectURL(url); if (myTok === pTok) { pAudio = null; advance(); } };
            audio.addEventListener('ended', gone, { once: true });
            audio.addEventListener('error', gone, { once: true });
            await audio.play();
        } catch (e) {
            if (myTok !== pTok) return;
            if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(line.zh);
                u.lang = 'zh-CN';
                u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                pTtsU = u;
                pState = 'playing';
                updatePlayerUI();
                const gone = () => { if (myTok === pTok) { pTtsU = null; advance(); } };
                u.onend = gone;
                u.onerror = gone;
                speechSynthesis.speak(u);
            } else {
                pState = 'idle';
                updatePlayerUI();
            }
        }
    }
    function advance() {
        pIdx++;
        if (!currentLine()) { onQueueDone(); return; }
        updatePlayerUI();
        playCurrent();
    }
    function onQueueDone() {
        pState = 'done';
        updatePlayerUI();
    }
    function togglePlayPause() {
        if (pState === 'playing') {
            if (pAudio) { try { pAudio.pause(); } catch (e) { } }
            else if (pTtsU) { try { speechSynthesis.pause(); } catch (e) { } }
            pState = 'paused';
            updatePlayerUI();
        } else if (pState === 'paused') {
            if (pAudio) {
                pAudio.play().then(() => { pState = 'playing'; updatePlayerUI(); }).catch(() => { });
            } else if (pTtsU) {
                try { speechSynthesis.resume(); pState = 'playing'; updatePlayerUI(); } catch (e) { }
            }
        } else { // idle | done → arrancar (de nuevo desde 0 si la cola terminó)
            if (pState === 'done') pIdx = 0;
            playCurrent();
        }
    }
    function pdNext() { stopAll(); pIdx = Math.min((pQueue ? pQueue.length : 1) - 1, pIdx + 1); playCurrent(); }
    function pdPrev() { stopAll(); pIdx = Math.max(0, pIdx - 1); playCurrent(); }

    // ── vista LISTA (híbrida: "seguí con lo último" + lista completa) ──
    function renderPicker() {
        S.view = 'picker';
        progNum.textContent = '🎙️';
        const lastId = getLastLessonId();
        const lastLesson = lastId ? LESSONS.find(l => l.id === lastId) : null;
        let html = '<div class="pd-head">🎙️ Podcast</div>';
        html += '<p class="pd-intro">Elegí una lección de Aprender y escuchala entera, sin interrupciones.</p>';
        if (lastLesson) {
            html += '<button type="button" class="pd-continue" id="pd-continue">'
                + '<span class="pd-continue-label">▶ Seguir con lo último que viste</span>'
                + '<span class="pd-continue-title">' + escHtml(lastLesson.emoji) + ' ' + escHtml(lastLesson.titleEs) + '</span>'
                + '</button>';
        }
        html += '<div class="pd-list">';
        LESSONS.forEach(l => {
            html += '<button type="button" class="lq-line pd-item" data-pd-id="' + escHtml(l.id) + '">'
                + '<span class="pd-item-ico">' + escHtml(l.emoji) + '</span>'
                + '<span class="pd-item-text">'
                + '<span class="pd-item-title">' + escHtml(l.titleEs) + '</span>'
                + '<span class="pd-item-meta">HSK ' + escHtml(l.hsk) + ' · ' + l.lines.length + ' líneas</span>'
                + '</span></button>';
        });
        html += '</div>';
        body.innerHTML = html;
        const cont = $('pd-continue');
        if (cont) cont.addEventListener('click', () => openLesson(lastLesson.id));
        body.querySelectorAll('.pd-item').forEach(btn => {
            btn.addEventListener('click', () => openLesson(btn.dataset.pdId));
        });
    }

    // ── vista REPRODUCTOR (manos libres — sin texto por defecto) ──
    function openLesson(id) {
        const l = LESSONS.find(x => x.id === id);
        if (!l) return;
        S.lesson = l; S.view = 'player';
        pQueue = l.lines; pIdx = 0; pState = 'idle'; showText = false;
        renderPlayer();
        togglePlayPause(); // arranca solo al elegir una lección
    }
    function lineText(line) {
        if (!line) return { zh: '', es: '' };
        const k = zhKey();
        return { zh: (k === 'trad' && line.zhT) ? line.zhT : line.zh, es: line.es || '' };
    }
    function renderPlayer() {
        const l = S.lesson;
        body.innerHTML =
            '<div class="pd-player">'
            + '<div class="pd-lesson-head">' + escHtml(l.emoji) + ' ' + escHtml(l.titleEs) + '</div>'
            + '<div class="pd-status" id="pd-status"></div>'
            + '<div class="pd-controls">'
            + '<button type="button" id="pd-prev" class="pd-ctrl-btn" aria-label="Línea anterior">⏮</button>'
            + '<button type="button" id="pd-playpause" class="pd-ctrl-btn pd-ctrl-main" aria-label="Reproducir">▶️</button>'
            + '<button type="button" id="pd-next" class="pd-ctrl-btn" aria-label="Línea siguiente">⏭</button>'
            + '</div>'
            + '<div class="pd-foot">'
            + '<button type="button" id="pd-speed" class="lq-btn lq-ghost"></button>'
            + '<button type="button" id="pd-toggle-text" class="lq-btn lq-ghost" aria-pressed="false">👁️ Ver texto</button>'
            + '<button type="button" id="pd-back" class="lq-btn lq-ghost">☰ Elegir otra</button>'
            + '</div>'
            + '<div class="pd-text hidden" id="pd-text"></div>'
            + '</div>';
        bindSpeedChip($('pd-speed'));
        $('pd-prev').addEventListener('click', pdPrev);
        $('pd-next').addEventListener('click', pdNext);
        $('pd-playpause').addEventListener('click', togglePlayPause);
        $('pd-back').addEventListener('click', () => { stopAll(); renderPicker(); });
        $('pd-toggle-text').addEventListener('click', (e) => {
            showText = !showText;
            e.target.setAttribute('aria-pressed', showText ? 'true' : 'false');
            updatePlayerUI();
        });
        updatePlayerUI();
    }
    // Refresca SOLO lo que cambia con el estado (no re-crea el DOM entero:
    // evita perder el foco de los controles en cada avance de la cola).
    function updatePlayerUI() {
        if (S.view !== 'player') return;
        const total = pQueue ? pQueue.length : 0;
        progNum.textContent = total ? (Math.min(pIdx + 1, total) + '/' + total) : '';
        const statusEl = $('pd-status');
        if (statusEl) {
            statusEl.textContent =
                pState === 'loading' ? '⏳ Cargando…' :
                pState === 'playing' ? '▶ Reproduciendo…' :
                pState === 'paused' ? '⏸ En pausa' :
                pState === 'done' ? '🏁 Listo — tocá ▶️ para volver a escuchar' :
                'Tocá ▶️ para empezar';
        }
        const ppBtn = $('pd-playpause');
        if (ppBtn) {
            ppBtn.textContent = pState === 'playing' ? '⏸' : '▶️';
            ppBtn.setAttribute('aria-label', pState === 'playing' ? 'Pausar' : 'Reproducir');
        }
        const prevBtn = $('pd-prev'), nextBtn = $('pd-next');
        if (prevBtn) prevBtn.disabled = pIdx <= 0;
        if (nextBtn) nextBtn.disabled = !pQueue || pIdx >= pQueue.length - 1;
        const textEl = $('pd-text');
        if (textEl) {
            if (showText) {
                const t = lineText(currentLine());
                textEl.innerHTML = '<div class="pd-text-zh" lang="zh">' + escHtml(t.zh) + '</div>'
                    + '<div class="pd-text-es">' + escHtml(t.es) + '</div>';
                textEl.classList.remove('hidden');
            } else {
                textEl.classList.add('hidden');
            }
        }
    }

    function openPodcast() {
        openPop();
        renderPicker();
    }

    // ── entrada y cierre (mismo patrón que daily-stories.js/minimal-pairs.js) ──
    document.addEventListener('DOMContentLoaded', () => {
        const btnEntry = $('btn-podcast');
        if (btnEntry) btnEntry.addEventListener('click', openPodcast);
        const closeBtn = $('pd-close');
        if (closeBtn) closeBtn.addEventListener('click', closePop);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden') && !(typeof topLayerOpen === 'function' && topLayerOpen())) closePop();
        });
        document.addEventListener('click', (e) => {
            if (pop.classList.contains('hidden')) return;
            const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
            if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
            if (e.target.closest && e.target.closest('#btn-podcast')) return;
            closePop();
        });
    });

    // API pública mínima (por si algún otro punto de entrada quiere abrirlo)
    window.openPodcast = openPodcast;
})();
