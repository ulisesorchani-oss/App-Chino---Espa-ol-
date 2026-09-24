// ============================================================
// minimal-pairs.js — Pares mínimos (discriminación tonal)
// ============================================================
// Extraído de app.js (fase 10 de modularización, 2026-09-24): el
// ejercicio corto de discriminación tonal por audio ("¿cuál
// escuchaste?", HSK 1-2). Ya era una IIFE autocontenida (mpInit) que
// solo expone window.MPDebug (exports para tests/QA) — nada externo
// la llama.
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js (usa fetchTTS/voiceZh/etc.
// de audio-tts.js y escHtml de reader.js en tiempo de ejecución).
// ============================================================

// ═══════════════════════════════════════════════════════════════════
// v9.20 — PARES MÍNIMOS: discriminación tonal por audio ("¿cuál escuchaste?")
// -------------------------------------------------------------------
// Ejercicio CORTO y AISLADO (IIFE, patrón lessonsInit/cqInit): 10 rondas;
// en cada una suena una palabra y el alumno elige entre 2-3 OPCIONES DE
// AUDIO (sin texto) — comparar sonidos, no leer. Recién al responder se
// revela hanzi + pinyin + glosa + tono. Datos: pares mínimos HSK 1-2
// curados a mano (misma sílaba, distinto tono; existencia y glosas
// contrastadas contra dict-mini/CC-CEDICT durante la curación, pero el
// bloque NO depende de dict-mini en runtime). Audio: reutiliza
// fetchTTS() (Vercel) con cache de blob-URLs por palabra (repetir es la
// clave del ejercicio) y fallback speechSynthesis; un solo audio a la
// vez (mismo player global de la app). No toca state, getFiltered, SRS
// ni ningún flujo existente.
// ═══════════════════════════════════════════════════════════════════
(function mpInit() {
    'use strict';

    // helpers locales (patrón lessonsInit: cero acoplamiento con el scope global)
    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    /* v9.20-PURE-BEGIN (datos + funciones puras: extraíbles para tests) */
    // ── datos curados HSK 1-2: {zh, py (con marcas de tono), es (glosa corta)} ──
    // v9.27: curación de rigurosidad — TODOS los grupos comparten la MISMA
    // sílaba (solo cambia el tono). Fuera los "falsos mínimos" que se
    // distinguían sin escuchar el tono: 中国/水果 (zhōng vs shuǐ), 洗/西瓜
    // (1 sílaba vs 2), 衣服/椅子 y 昨天/左边 y 游泳/右边 (la 2.ª sílaba
    // delataba cuál era). Reemplazos de sílaba idéntica: 洗/西, 衣/椅,
    // 左/坐, 有/又, 书/树.
    const MP_DATA = [
        { id: 'mai',    words: [{ zh: '买', py: 'mǎi', es: 'comprar' }, { zh: '卖', py: 'mài', es: 'vender' }] },
        { id: 'shi-shi', words: [{ zh: '十', py: 'shí', es: 'diez' }, { zh: '是', py: 'shì', es: 'ser; es' }] },
        { id: 'shui',   words: [{ zh: '睡', py: 'shuì', es: 'dormir' }, { zh: '水', py: 'shuǐ', es: 'agua' }] },
        { id: 'yu',     words: [{ zh: '鱼', py: 'yú', es: 'pescado' }, { zh: '雨', py: 'yǔ', es: 'lluvia' }] },
        { id: 'hui',    words: [{ zh: '会', py: 'huì', es: 'saber hacer' }, { zh: '回', py: 'huí', es: 'volver' }] },
        { id: 'hao',    words: [{ zh: '好', py: 'hǎo', es: 'bueno' }, { zh: '号', py: 'hào', es: 'número' }] },
        { id: 'he',     words: [{ zh: '喝', py: 'hē', es: 'beber' }, { zh: '和', py: 'hé', es: 'y; con' }] },
        { id: 'mei',    words: [{ zh: '没', py: 'méi', es: 'no; no tener' }, { zh: '每', py: 'měi', es: 'cada' }] },
        { id: 'ba',     words: [{ zh: '八', py: 'bā', es: 'ocho' }, { zh: '爸', py: 'bà', es: 'papá' }] },
        { id: 'xie',    words: [{ zh: '写', py: 'xiě', es: 'escribir' }, { zh: '谢', py: 'xiè', es: 'gracias' }] },
        { id: 'xiao',   words: [{ zh: '小', py: 'xiǎo', es: 'pequeño' }, { zh: '笑', py: 'xiào', es: 'reír' }] },
        { id: 'xue',    words: [{ zh: '雪', py: 'xuě', es: 'nieve' }, { zh: '学', py: 'xué', es: 'estudiar' }] },
        { id: 'zuo',    words: [{ zh: '左', py: 'zuǒ', es: 'izquierda' }, { zh: '坐', py: 'zuò', es: 'sentarse' }] },
        { id: 'na',     words: [{ zh: '哪', py: 'nǎ', es: '¿dónde? ¿cuál?' }, { zh: '那', py: 'nà', es: 'eso; allí' }] },
        { id: 'tang',   words: [{ zh: '汤', py: 'tāng', es: 'sopa' }, { zh: '糖', py: 'táng', es: 'azúcar' }] },
        { id: 'tian',   words: [{ zh: '天', py: 'tiān', es: 'día; cielo' }, { zh: '甜', py: 'tián', es: 'dulce' }] },
        { id: 'shou',   words: [{ zh: '手', py: 'shǒu', es: 'mano' }, { zh: '瘦', py: 'shòu', es: 'flaco' }] },
        { id: 'ke',     words: [{ zh: '渴', py: 'kě', es: 'tener sed' }, { zh: '课', py: 'kè', es: 'clase' }] },
        { id: 'xi',     words: [{ zh: '洗', py: 'xǐ', es: 'lavar' }, { zh: '西', py: 'xī', es: 'oeste' }] },
        { id: 'san',    words: [{ zh: '三', py: 'sān', es: 'tres' }, { zh: '伞', py: 'sǎn', es: 'paraguas' }] },
        { id: 'li',     words: [{ zh: '里', py: 'lǐ', es: 'dentro' }, { zh: '离', py: 'lí', es: 'lejos de' }] },
        { id: 'dian',   words: [{ zh: '点', py: 'diǎn', es: 'hora; punto' }, { zh: '店', py: 'diàn', es: 'tienda' }] },
        { id: 'hua',    words: [{ zh: '花', py: 'huā', es: 'flor' }, { zh: '话', py: 'huà', es: 'palabra' }] },
        { id: 'jiao',   words: [{ zh: '教', py: 'jiāo', es: 'enseñar' }, { zh: '叫', py: 'jiào', es: 'llamarse' }] },
        { id: 'jie',    words: [{ zh: '姐', py: 'jiě', es: 'hermana mayor' }, { zh: '借', py: 'jiè', es: 'prestar' }] },
        { id: 'xin',    words: [{ zh: '新', py: 'xīn', es: 'nuevo' }, { zh: '信', py: 'xìn', es: 'carta' }] },
        { id: 'yi-yi',  words: [{ zh: '衣', py: 'yī', es: 'ropa' }, { zh: '椅', py: 'yǐ', es: 'silla' }] },
        { id: 'you',    words: [{ zh: '有', py: 'yǒu', es: 'tener' }, { zh: '又', py: 'yòu', es: 'otra vez' }] },
        { id: 'yuan',   words: [{ zh: '元', py: 'yuán', es: 'yuan (moneda)' }, { zh: '远', py: 'yuǎn', es: 'lejos' }] },
        { id: 'xing',   words: [{ zh: '星', py: 'xīng', es: 'estrella' }, { zh: '姓', py: 'xìng', es: 'apellido' }] },
        { id: 'ting',   words: [{ zh: '听', py: 'tīng', es: 'escuchar' }, { zh: '停', py: 'tíng', es: 'parar' }] },
        { id: 'shu-shu', words: [{ zh: '书', py: 'shū', es: 'libro' }, { zh: '树', py: 'shù', es: 'árbol' }] },
        { id: 'ma-triada', words: [{ zh: '妈', py: 'mā', es: 'mamá' }, { zh: '马', py: 'mǎ', es: 'caballo' }, { zh: '骂', py: 'mà', es: 'regañar' }] }
    ];
    /* v9.20-PURE-DATA-END */

    // ── puro: secuencia de tonos desde pinyin con marcas ('mǎi'→[3]);
    //    cada vocal marcada suma un tono (así "xiāng" = 1 y "nǐhǎo" sin
    //    espacio = 3-3); sílabas sin marca = tono neutro 0 y no se anuncian ──
    const MP_TONE_MAP = { 'ā': 1, 'á': 2, 'ǎ': 3, 'à': 4, 'ē': 1, 'é': 2, 'ě': 3, 'è': 4, 'ī': 1, 'í': 2, 'ǐ': 3, 'ì': 4, 'ō': 1, 'ó': 2, 'ǒ': 3, 'ò': 4, 'ū': 1, 'ú': 2, 'ǔ': 3, 'ù': 4, 'ǖ': 1, 'ǘ': 2, 'ǚ': 3, 'ǜ': 4 };
    function mpToneSeq(py) {
        const out = [];
        String(py == null ? '' : py).toLowerCase().split(/\s+/).forEach(function (syl) {
            if (!syl) return;
            let marks = 0;
            for (let i = 0; i < syl.length; i++) {
                const t = MP_TONE_MAP[syl[i]];
                if (t !== undefined) { out.push(t); marks++; }
            }
            if (!marks && /^[a-zü]/.test(syl)) out.push(0);
        });
        return out;
    }
    function mpToneLabel(seq) {
        const s = (seq || []).filter(function (t) { return t > 0; });
        if (!s.length) return 'tono neutro';
        if (s.length === 1) {
            return { 1: '1.er tono (alto y plano)', 2: '2.º tono (sube)', 3: '3.er tono (baja y sube)', 4: '4.º tono (cae)' }[s[0]];
        }
        return 'tonos ' + s.join('-');
    }
    // ── puro: Fisher-Yates con rng inyectable (tests) ──
    function mpShuffle(arr, rng) {
        const r = rng || Math.random;
        const a = (arr || []).slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(r() * (i + 1));
            const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }
    // ── puro: ronda = grupo distinto del anterior; target al azar dentro del
    //    grupo; opciones = mismas palabras barajadas (2-3, solo audio) ──
    function mpBuildRound(prevId, rng, data) {
        const r = rng || Math.random;
        const src = (data || MP_DATA).filter(function (g) {
            return g && g.id && Array.isArray(g.words) && g.words.length >= 2 && g.words.length <= 3 &&
                g.words.every(function (w) { return w && w.zh && w.py && w.es; });
        });
        if (!src.length) return null;
        const pool = src.filter(function (g) { return g.id !== prevId; });
        const pickFrom = pool.length ? pool : src;
        const group = pickFrom[Math.floor(r() * pickFrom.length)];
        const target = group.words[Math.floor(r() * group.words.length)];
        return { group: group, target: target, options: mpShuffle(group.words, rng) };
    }
    /* v9.20-PURE-END */

    // ── anclajes del overlay (misma piel que lecciones/clásicos: lq-pop) ──
    const pop = $('mp-pop');
    if (!pop) return;
    const body = $('mp-body'), segs = $('mp-segments'), progNum = $('mp-progress-num');
    if (!body || !segs || !progNum) return;

    const ROUNDS = 10;
    const LETTERS = ['A', 'B', 'C'];
    // estado de sesión (solo en memoria: el ejercicio es corto, no persiste nada)
    const S = { round: 0, score: 0, results: [], cur: null, answered: false, pick: -1, lastId: null };
    let mpTimer = null;
    let mpBusyBtn = null, mpBusyHtml = '';
    const MP_CACHE = new Map(); // v9.40: 'texto@velocidad' → { url, data } (repetir = instantáneo)

    function mpRestore() { // v9.19-style anti-huérfano: un solo botón esperando
        if (mpBusyBtn) {
            mpBusyBtn.disabled = false;
            mpBusyBtn.classList.remove('mp-busy');
            mpBusyBtn.innerHTML = mpBusyHtml;
            mpBusyBtn = null; mpBusyHtml = '';
        }
    }
    function mpStopGlobal() { // un solo audio a la vez (el player global de la app)
        try {
            if (globalAudioPlayer.src) {
                globalAudioPlayer.onended = null; globalAudioPlayer.onerror = null;
                globalAudioPlayer.pause();
                globalAudioPlayer.removeAttribute('src');
                globalAudioPlayer.load();
            }
        } catch (e) { /* player aún no listo */ }
        if ('speechSynthesis' in window) { try { speechSynthesis.cancel(); } catch (e) { } }
        if (typeof stopReader === 'function') { try { stopReader(); } catch (e) { } }
    }
    // TTS por palabra: fetchTTS() (Vercel) → blob → cache; fallback voz sistema
    async function mpPlay(text, btn) {
        if (!text) return;
        mpRestore();
        mpStopGlobal();
        if (btn) { mpBusyBtn = btn; mpBusyHtml = btn.innerHTML; btn.disabled = true; btn.classList.add('mp-busy'); }
        const finish = function () { if (btn && mpBusyBtn === btn) mpRestore(); };
        const mpKey = text + '@' + playbackSpeed; // v9.40: la velocidad en la clave
        if (MP_CACHE.has(mpKey)) {
            try {
                const mpHit = MP_CACHE.get(mpKey);
                globalAudioPlayer.src = mpHit.url;
                applyTtsSpeed(globalAudioPlayer, mpHit.data); // v9.40
                await globalAudioPlayer.play();
                globalAudioPlayer.onended = finish;
                globalAudioPlayer.onerror = finish;
            } catch (e) { console.warn('[MP] autoplay bloqueado', e); finish(); }
            return;
        }
        try {
            const resp = await fetchTTS(ttsBody(text, ttsLangFor('zh', voiceZh), voiceZh), 12000); // v9.40: +speed · v9.49: 🇹🇼 → zh-TW
            if (!resp.ok) throw new Error('TTS ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            MP_CACHE.set(mpKey, { url: url, data: data });
            globalAudioPlayer.src = url;
            applyTtsSpeed(globalAudioPlayer, data); // v9.40: velocidad en el server → sin eco
            try { await globalAudioPlayer.play(); } catch (pe) { console.warn('[MP] autoplay bloqueado', pe); finish(); return; }
            globalAudioPlayer.onended = finish;
            globalAudioPlayer.onerror = finish;
        } catch (err) {
            console.warn('[MP] Vercel falló, voz sistema', err);
            if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(text);
                u.lang = ttsLangFor('zh', voiceZh); u.rate = playbackSpeed; // v9.49: 🇹🇼 → zh-TW
                const sv = (typeof sysVoiceFor === 'function') ? sysVoiceFor(ttsLangFor('zh', voiceZh), voiceZh) : null;
                if (sv) u.voice = sv;
                u.onend = finish; u.onerror = finish;
                speechSynthesis.speak(u);
            } else finish();
        }
    }

    // ── render ──
    function mpDots() {
        let html = S.results.map(function (r) {
            return '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : '') + '"></span>';
        }).join('');
        for (let i = S.results.length; i < ROUNDS; i++) html += '<span class="lq-seg"></span>';
        return html;
    }
    function mpOptHtml(i, w, c) {
        if (!S.answered) { // SOLO AUDIO: ni hanzi, ni pinyin, ni glosa antes de responder
            return '<div class="mp-opt" role="button" data-mp-act="opt" data-mp-i="' + i + '">' +
                '<span class="mp-opt-letter">' + LETTERS[i] + '</span>' +
                '<button type="button" class="mp-opt-play" data-mp-act="opt-play" data-mp-i="' + i + '" aria-label="Opción ' + LETTERS[i] + '">🔊</button>' +
                '</div>';
        }
        const cls = w === c.target ? ' mp-ok' : (i === S.pick ? ' mp-bad' : ' mp-dim');
        return '<div class="mp-opt mp-reveal' + cls + '">' +
            '<span class="mp-opt-letter">' + LETTERS[i] + '</span>' +
            '<div class="mp-zh" lang="zh">' + escHtml(w.zh) + '</div>' +
            '<div class="mp-py">' + escHtml(w.py) + '</div>' +
            '<div class="mp-es">' + escHtml(w.es) + '</div>' +
            '<div class="mp-tone">' + escHtml(mpToneLabel(mpToneSeq(w.py))) + '</div>' +
            '</div>';
    }
    function mpRenderRound() {
        const c = S.cur;
        progNum.textContent = S.round + '/' + ROUNDS;
        segs.innerHTML = mpDots();
        const last = S.results[S.results.length - 1];
        body.innerHTML =
            '<div class="mp-tag">🎯 Pares mínimos</div>' +
            '<div class="mp-q">¿Qué escuchaste?</div>' +
            '<button type="button" class="mp-target" data-mp-act="target">🔊 Escuchar</button>' +
            // v9.28: contenedor .mp-opts — la regla CSS (flex column + gap)
            // existía desde v9.20 pero las opciones se inyectaban sueltas
            // dentro de #mp-body, así que el gap nunca aplicaba y las
            // tarjetas quedaban pegadas entre sí.
            '<div class="mp-opts">' +
            c.options.map(function (w, i) { return mpOptHtml(i, w, c); }).join('') +
            '</div>' +
            (S.answered
                ? '<div class="mp-fb ' + (last === true ? 'ok' : 'bad') + '">' +
                    (last === true
                        ? '✅ ¡Eso es! — ' + escHtml(c.target.zh) + ' ' + escHtml(c.target.py) + ' · ' + escHtml(mpToneLabel(mpToneSeq(c.target.py)))
                        : '❌ Escuchaste: ' + escHtml(c.target.zh) + ' ' + escHtml(c.target.py) + ' — ' + escHtml(c.target.es)) +
                    '</div>' +
                    '<div class="mp-actions"><button type="button" class="mp-next" data-mp-act="next">' +
                    (S.round >= ROUNDS ? 'Ver resultado 🏁' : 'Siguiente ▶') + '</button></div>'
                : '<div class="mp-hint">🔊 Escuchá y compará las opciones · tocá una tarjeta para responder</div>');
    }
    function mpRenderEnd() {
        progNum.textContent = '🏁';
        segs.innerHTML = mpDots();
        const msg = S.score >= 9 ? '¡Oído afinado! 🎉' : S.score >= 6 ? 'Muy bien — seguí comparando tonos.' : 'Otra vuelta: foco en 1.er vs 4.º tono.';
        body.innerHTML =
            '<div class="mp-tag">🎯 Pares mínimos</div>' +
            '<div class="mp-score-big">' + S.score + '<span>/' + ROUNDS + '</span></div>' +
            '<div class="mp-end-msg">' + msg + '</div>' +
            '<div class="mp-actions"><button type="button" class="mp-next" data-mp-act="restart">🔄 Otra vez</button>' +
            '<button type="button" class="mp-next mp-ghost" data-mp-act="close">Cerrar</button></div>';
    }

    // ── flujo de sesión ──
    function mpAnswer(i) {
        if (!S.cur || S.answered || !S.cur.options[i]) return;
        const ok = S.cur.options[i] === S.cur.target;
        S.answered = true; S.pick = i;
        S.results.push(ok); if (ok) S.score++;
        mpRenderRound();
        mpPlay(S.cur.target.zh, null); // eco de la palabra correcta
    }
    function mpNext() {
        S.round++;
        if (S.round > ROUNDS) { mpRenderEnd(); return; }
        const r = mpBuildRound(S.lastId);
        if (!r) { mpRenderEnd(); return; }
        S.lastId = r.group.id; S.cur = r; S.answered = false; S.pick = -1;
        mpRenderRound();
        if (mpTimer) clearTimeout(mpTimer);
        mpTimer = setTimeout(function () { // autoplay tras el gesto de abrir/avanzar
            const b = body.querySelector('[data-mp-act="target"]');
            mpPlay(r.target.zh, b);
        }, 350);
    }
    function mpOpen() {
        S.round = 0; S.score = 0; S.results = []; S.cur = null;
        S.answered = false; S.pick = -1; S.lastId = null;
        pop.classList.remove('hidden');
        mpNext();
    }
    function mpClose() {
        pop.classList.add('hidden');
        if (mpTimer) { clearTimeout(mpTimer); mpTimer = null; }
        mpRestore();
        mpStopGlobal();
        // v9.50: los valores son { url, data } desde v9.40 — se revoca la URL, no el objeto
        MP_CACHE.forEach(function (v) { try { URL.revokeObjectURL(v && v.url); } catch (e) { } });
        MP_CACHE.clear();
    }

    // ── delegación (un solo listener; closest toma el ACTO más profundo:
    //    el chip 🔊 dentro de la tarjeta responde antes que la tarjeta) ──
    body.addEventListener('click', function (e) {
        const t = e.target.closest('[data-mp-act]');
        if (!t) return;
        const act = t.getAttribute('data-mp-act');
        const i = parseInt(t.getAttribute('data-mp-i') || '-1', 10);
        if (act === 'target') mpPlay(S.cur ? S.cur.target.zh : '', t);
        else if (act === 'opt-play') { if (S.cur && !S.answered && S.cur.options[i]) mpPlay(S.cur.options[i].zh, t); }
        else if (act === 'opt') { if (S.cur && !S.answered && S.cur.options[i]) mpAnswer(i); }
        else if (act === 'next') mpNext();
        else if (act === 'restart') mpOpen();
        else if (act === 'close') mpClose();
    });

    // ── entrada y cierre ──
    const btnEntry = $('btn-mp-pairs');
    if (btnEntry) btnEntry.addEventListener('click', mpOpen);
    const btnClose = $('mp-close');
    if (btnClose) btnClose.addEventListener('click', mpClose);
    // v9.28: Escape y clic afuera cierran el popup — misma convención que el
    // resto de los overlays (vocab-pop, placement, SRS, quiz, clásicos).
    // El clic sobre el botón de entrada no cuenta como "afuera": es el MISMO
    // clic que abre y, al burbujear hasta document, no debe re-cerrarlo.
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || pop.classList.contains('hidden') || topLayerOpen()) return; // v9.50
        mpClose();
    });
    document.addEventListener('click', function (e) {
        if (pop.classList.contains('hidden')) return;
        // v9.29: composedPath y NO pop.contains(e.target) — regreso de v9.28.
        // Responder (mpAnswer) o avanzar (mpNext) re-renderizan #mp-body y la
        // tarjeta clicada queda descolgada del DOM antes de que el evento
        // llegue a document → contains() daba falso negativo y el popup se
        // cerraba justo después de responder. Mismo fix v7.20 de placement/
        // SRS: composedPath es el camino congelado al iniciar el despacho,
        // inmune a mutaciones posteriores del DOM.
        const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && e.target.closest('#btn-mp-pairs')) return;
        mpClose();
    });

    // exports para tests/QA (sin efecto en la UI)
    window.MPDebug = { data: MP_DATA, toneSeq: mpToneSeq, toneLabel: mpToneLabel, shuffle: mpShuffle, buildRound: mpBuildRound };
})();
// ===== fin v9.20 =====
