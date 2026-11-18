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
// v9.71 (fix de UX real, QA post-merge): la v9.70 pedía UN audio por
// LÍNEA (cola encadenada, adaptada de "▶️ Escuchar todo" de
// lessons-dele.js) — con latencia real de red entre cada fetch, sonaba
// entrecortado ("Cargando…" entre cada oración), lejos de "de corrido".
// Se reemplaza por UN SOLO pedido de TTS con el texto de la lección
// COMPLETA concatenado — el mismo patrón que ya usa toggleReaderPlay()
// en reader.js ("pegá texto y lo lee", un solo blob de audio de punta a
// punta).
//
// v9.72 (ajuste al patrón real de reader.js + UX de podcast, no de
// cola): la v9.71 ya pedía un solo audio, pero seguía tratándolo como
// si fuera una cola de líneas: unía el texto SIN separador (perdiendo
// el salto de línea que reader.js sí conserva al mandar
// lesson.text_simp/text_trad completo a fetchTTS), y estimaba una
// "línea actual" con una línea de tiempo ponderada por caracteres para
// alimentar ⏮/⏭ (seek), el contador "N/M" y el resaltado de texto —
// todo aproximado, nada de eso viene del audio real. Se ajusta a lo que
// el patrón de un solo blob permite de verdad:
//  · fullText une las líneas con '\n' (mismo separador que usa
//    lesson.text_simp/text_trad en lessons.js) para no perder la
//    prosodia entre oraciones.
//  · ⏮/⏭ pasan a significar LECCIÓN anterior/siguiente (navegan
//    GRADED_LESSONS) — un podcast salta de episodio, no de oración.
//  · El progreso es el real del <audio> (currentTime/duration → barra
//    de tiempo transcurrido/total); con voz del sistema (fallback sin
//    red) no hay <audio> ni duration, así que la barra se oculta y
//    queda solo el texto de estado.
//  · "👁️ Ver texto" muestra la lección COMPLETA de una vez, sin
//    resaltado sincronizado (ya no hay "línea actual" que resaltar) —
//    sigue bajo demanda, sigue sin ser el default.
//  · Se elimina la línea de tiempo estimada (buildTimeline/
//    lineIdxAtProgress y sus ticks por rAF/setInterval): dead code de
//    la v9.71 sin consumidor una vez que ⏮/⏭ dejan de hacer seek.
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
    // ── Estado de la reproducción: UNA máquina con tabla de transiciones (state-machine.js, compartido; docs/maquinas-de-estado.md) ──
    // Se declara ANTES de los `return` de más abajo (sin lecciones o sin el overlay) para que el generador de la doc la vea. Para CAMBIAR el estado hay que pasar por
    // PD.go(estado, evento): una asignación directa (pState = 'x') la frena tools/check-maquinas.js. pTok NO es estado: identifica «una reproducción» (invalida callbacks viejos).
    // Si state-machine.js no carga, el respaldo asigna sin validar y el Podcast suena igual.
    const SM = (typeof window.acMachine === 'function') ? window.acMachine : function (name, def) {
        let cur = def.initial; // respaldo: no valida, no registra
        return { name: name, get state() { return cur; }, is: (x) => cur === x, declared: () => true, go(to) { cur = to; return true; } };
    };
    const PD = SM('podcast.reproduccion', {
        initial: 'idle', titulo: 'Podcast: reproducción',
        rows: [
            { from: ['idle', 'done'], to: 'loading', ev: 'leer', nota: 'se elige una lección (arranca sola) o se toca ▶️ tras «Listo»' },
            { from: 'loading', to: 'playing', ev: 'audio', nota: 'llegó el audio del servidor y arranca' },
            { from: 'loading', to: 'playing', ev: 'voz-del-sistema', nota: 'el pedido o el play() falló: se lee la lección entera con la voz del sistema' },
            { from: 'loading', to: 'idle', ev: 'sin-voz', nota: 'el pedido falló y el dispositivo no tiene voz del sistema' },
            { from: 'playing', to: 'paused', ev: 'pausa', nota: '⏸' },
            { from: 'paused', to: 'playing', ev: 'seguir', nota: '▶️ tras una pausa' },
            { from: 'playing', to: 'done', ev: 'fin', nota: 'terminó el audio (o la voz del sistema)' },
            { from: ['loading', 'playing', 'paused', 'done'], to: 'idle', ev: 'corte', nota: 'stopAll(): ✕, Esc, clic afuera, ☰ Elegir otra, ⏮/⏭ y elegir otra lección' },
            // ── defectos de hoy (R10 del informe de máquinas de estado), declarados «conocida»: describen lo que el código hace AHORA; el oro por orden de eventos los fija ──
            { from: ['idle', 'loading'], to: 'playing', ev: 'seguir', known: 'R10a', nota: 'CLASE sintética (dos toques en la MISMA tarea; una persona no puede). El .then de play() al reanudar no tiene guarda de token: tras cerrar / ☰ / ⏭ en el mismo turno vuelve a poner «playing» (en idle, sin efecto visible) o lo pone con la lección nueva todavía cargando (loading: la pantalla dice «Reproduciendo» sin que suene nada). Escenarios R10a-*' },
            { from: 'paused', to: 'playing', ev: 'voz-del-sistema', known: 'R10c-real', nota: 'CLASE real (AbortError real; ventana de un solo turno). ⏸ en el mismo turno que el primer play(): play() se rechaza, el catch manda toda la lección a la voz del sistema y el estado vuelve a «playing» pese a que se pausó. Escenario R10c-pausa-en-el-play' },
            { from: 'paused', to: 'done', ev: 'fin', known: 'R10c-emulado', nota: 'CLASE emulada: PROBAR EN UN DISPOSITIVO REAL (play() rechazado a la fuerza, como un autoplay bloqueado). La voz del sistema habla mientras la pantalla dice «En pausa» y termina estando en pausa (ver «pausa al motor equivocado»). Escenario R10c-autoplay-bloqueado' }
        ],
        defectos: [
            { id: 'R10c-emulado (pausa al motor equivocado)', escenario: 'R10c-autoplay-bloqueado', nota: 'CLASE emulada: PROBAR EN UN DISPOSITIVO REAL. Si play() se rechaza y cae a la voz del sistema, pAudio sigue apuntando al audio fallido: ⏸ le hace pause() a ESE audio y no a la voz, que sigue hablando mientras la pantalla dice «En pausa». No es una transición: es un efecto dentro del estado.' }
        ]
    });
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
    // ── reproducción: UN SOLO audio para la lección completa (v9.71) ──
    let pAudio = null;       // Audio() del API en curso (toda la lección)
    let pTtsU = null;        // utterance del fallback (voz del sistema, sin progreso real)
    let pTok = 0;            // invalida callbacks de una reproducción vieja
    // (el estado — idle | loading | playing | paused | done — vive en la máquina PD de arriba)
    let showText = false;    // "👁️ Ver texto" — NUNCA activado por defecto

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

    function fmtTime(s) {
        s = Math.max(0, Math.floor(s || 0));
        const m = Math.floor(s / 60), sec = s % 60;
        return m + ':' + (sec < 10 ? '0' : '') + sec;
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
        window.acScriptRef = null; // v9.7x
        showText = false;
    }

    // ── posición de la lección actual dentro de GRADED_LESSONS (para el
    //    contador del header y para que ⏮/⏭ naveguen episodio a episodio) ──
    function lessonIndex() { return S.lesson ? LESSONS.findIndex(l => l.id === S.lesson.id) : -1; }

    function stopAll() {
        pTok++;
        if (pAudio) { try { pAudio.pause(); } catch (e) { } pAudio = null; }
        if (pTtsU) { try { speechSynthesis.cancel(); } catch (e) { } pTtsU = null; }
        PD.go('idle', 'corte');
    }

    // ── v9.71/v9.72: UN pedido de TTS con la lección ENTERA (no una cola
    //    por línea) — mismo pipeline fetchTTS/blob/applyTtsSpeed de
    //    siempre, mismo patrón que toggleReaderPlay() en reader.js,
    //    mismo separador '\n' que lesson.text_simp/text_trad. ──
    async function playLesson() {
        if (!S.lesson) return;
        const myTok = ++pTok;
        PD.go('loading', 'leer');
        updatePlayerUI();
        if (typeof stopGlobalAudio === 'function') stopGlobalAudio();
        if (typeof stopReader === 'function') stopReader();
        const fullText = S.lesson.lines.map(ln => lineText(ln).zh).join('\n');
        // v9.7x: voz según la familia de la lección (TOCFL → 🇹🇼 si no se eligió otra)
        const gender = (typeof voiceZhFor === 'function') ? voiceZhFor(S.lesson) : ((typeof voiceZh !== 'undefined') ? voiceZh : 'f');
        try {
            const langCode = (typeof ttsLangFor === 'function') ? ttsLangFor('zh', gender) : 'zh-CN';
            const reqBody = (typeof ttsBody === 'function') ? ttsBody(fullText, langCode, gender) : { text: fullText, lang: langCode, voice: gender };
            // v7.14/v9.71: timeout escalado con el largo, mismo criterio que reader.js
            const resp = await fetchTTS(reqBody, Math.max(15000, fullText.length * 50));
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
            PD.go('playing', 'audio');
            audio.addEventListener('timeupdate', updateAudioProgress);
            updatePlayerUI();
            const gone = () => {
                URL.revokeObjectURL(url);
                if (myTok !== pTok) return;
                PD.go('done', 'fin');
                updatePlayerUI();
            };
            audio.addEventListener('ended', gone, { once: true });
            audio.addEventListener('error', gone, { once: true });
            await audio.play();
        } catch (e) {
            if (myTok !== pTok) return;
            if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(fullText);
                u.lang = (typeof ttsLangFor === 'function') ? ttsLangFor('zh', gender) : 'zh-CN'; // v9.7x: 🇹🇼 → zh-TW también sin red
                u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                pTtsU = u;
                PD.go('playing', 'voz-del-sistema');
                updatePlayerUI();
                const gone = () => {
                    if (myTok !== pTok) return;
                    pTtsU = null; PD.go('done', 'fin');
                    updatePlayerUI();
                };
                u.onend = gone;
                u.onerror = gone;
                speechSynthesis.speak(u);
            } else {
                PD.go('idle', 'sin-voz');
                updatePlayerUI();
            }
        }
    }
    function togglePlayPause() {
        if (PD.is('playing')) {
            if (pAudio) { try { pAudio.pause(); } catch (e) { } }
            else if (pTtsU) { try { speechSynthesis.pause(); } catch (e) { } }
            PD.go('paused', 'pausa');
            updatePlayerUI();
        } else if (PD.is('paused')) {
            if (pAudio) {
                pAudio.play().then(() => { PD.go('playing', 'seguir'); updatePlayerUI(); }).catch(() => { });
            } else if (pTtsU) {
                try { speechSynthesis.resume(); PD.go('playing', 'seguir'); updatePlayerUI(); } catch (e) { }
            }
        } else if (PD.is('loading')) {
            // R10b: mientras carga NO se hace nada (antes un toque en ▶️ reiniciaba el pedido: un SEGUNDO pedido de la lección entera al servidor). El botón ya lo dice: «⏳», inerte.
        } else { // idle | done → (re)empezar
            playLesson();
        }
    }
    // v9.72: ⏮/⏭ ya NO hacen seek dentro del audio — navegan a la lección
    // anterior/siguiente de GRADED_LESSONS (un podcast salta de episodio).
    function pdPrev() {
        const i = lessonIndex();
        if (i > 0) openLesson(LESSONS[i - 1].id);
    }
    function pdNext() {
        const i = lessonIndex();
        if (i !== -1 && i < LESSONS.length - 1) openLesson(LESSONS[i + 1].id);
    }

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
        stopAll(); // corta el audio de la lección anterior (⏮/⏭ vienen del propio player)
        S.lesson = l; S.view = 'player'; showText = false;
        window.acScriptRef = l; // v9.7x: el texto y el audio en la escritura de esta lección
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
            + '<button type="button" id="pd-prev" class="pd-ctrl-btn" aria-label="Lección anterior">⏮</button>'
            + '<button type="button" id="pd-playpause" class="pd-ctrl-btn pd-ctrl-main" aria-label="Reproducir">▶️</button>'
            + '<button type="button" id="pd-next" class="pd-ctrl-btn" aria-label="Lección siguiente">⏭</button>'
            + '</div>'
            + '<div class="progress-track hidden" id="pd-audio-track"><div class="progress-fill" id="pd-audio-fill" style="width:0%"></div></div>'
            + '<div class="pd-time" id="pd-time"></div>'
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
    // v9.72: progreso REAL del <audio> (currentTime/duration) — no hay
    // nada análogo para el fallback de voz del sistema (sin elemento
    // <audio>, sin duration), así que la barra se oculta en ese caso.
    function updateAudioProgress() {
        const track = $('pd-audio-track'), fill = $('pd-audio-fill'), timeEl = $('pd-time');
        if (!track || !timeEl) return;
        if (!pAudio) { track.classList.add('hidden'); timeEl.textContent = ''; return; }
        track.classList.remove('hidden');
        const cur = pAudio.currentTime || 0;
        const dur = pAudio.duration;
        const pct = (isFinite(dur) && dur > 0) ? Math.max(0, Math.min(100, (cur / dur) * 100)) : 0;
        if (fill) fill.style.width = pct + '%';
        timeEl.textContent = fmtTime(cur) + ' / ' + ((isFinite(dur) && dur > 0) ? fmtTime(dur) : '--:--');
    }
    // v9.72: con un solo audio no hay "línea actual" que resaltar — el
    // botón 👁️ Ver texto vuelca la lección COMPLETA de una sola vez.
    function fullTextHtml() {
        if (!S.lesson || !S.lesson.lines) return '';
        return S.lesson.lines.map(ln => {
            const t = lineText(ln);
            return '<div class="pd-text-line"><div class="pd-text-zh" lang="zh">' + escHtml(t.zh) + '</div>'
                + '<div class="pd-text-es">' + escHtml(t.es) + '</div></div>';
        }).join('');
    }
    // Refresca SOLO lo que cambia con el estado (no re-crea el DOM entero:
    // evita perder el foco de los controles en cada tick de progreso).
    function updatePlayerUI() {
        if (S.view !== 'player') return;
        const idx = lessonIndex();
        progNum.textContent = (idx !== -1) ? ((idx + 1) + '/' + LESSONS.length) : '🎙️';
        const statusEl = $('pd-status');
        if (statusEl) {
            statusEl.textContent =
                PD.state === 'loading' ? '⏳ Preparando el audio de toda la lección…' :
                PD.state === 'playing' ? '▶ Reproduciendo…' :
                PD.state === 'paused' ? '⏸ En pausa' :
                PD.state === 'done' ? '🏁 Listo — tocá ▶️ para volver a escuchar' :
                'Tocá ▶️ para empezar';
        }
        const ppBtn = $('pd-playpause');
        if (ppBtn) {
            const cargando = PD.state === 'loading'; // R10b: durante la carga el botón es «⏳» e inerte (antes decía ▶️ y reiniciaba el pedido)
            ppBtn.textContent = PD.state === 'playing' ? '⏸' : (cargando ? '⏳' : '▶️');
            ppBtn.setAttribute('aria-label', PD.state === 'playing' ? 'Pausar' : (cargando ? 'Preparando el audio' : 'Reproducir'));
            ppBtn.setAttribute('aria-disabled', cargando ? 'true' : 'false');
        }
        // v9.72: ⏮/⏭ ahora navegan GRADED_LESSONS — se apagan en los bordes
        // de la lista, no según haya o no audio del API en curso.
        const prevBtn = $('pd-prev'), nextBtn = $('pd-next');
        if (prevBtn) prevBtn.disabled = idx <= 0;
        if (nextBtn) nextBtn.disabled = idx === -1 || idx >= LESSONS.length - 1;
        updateAudioProgress();
        const textEl = $('pd-text');
        if (textEl) {
            if (showText) {
                textEl.innerHTML = fullTextHtml();
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
