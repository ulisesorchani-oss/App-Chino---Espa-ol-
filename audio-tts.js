// ============================================================
// audio-tts.js — Audio y síntesis de voz (TTS)
// ============================================================
// Extraído de app.js (fase 1 de modularización, 2026-09-24): velocidad
// y voz elegidas, el pedido al servidor de TTS (Vercel/edge-tts) con su
// fallback a la voz del sistema, y el reproductor de audio global que
// usan las tarjetas de práctica.
//
// Es un script clásico (sin import/export), igual que antes: se carga
// en index.html ANTES que app.js y declara variables/funciones
// globales que el resto de la app sigue usando tal cual (app.js,
// lessons-dele.js, etc. no cambiaron sus llamadas).
// ============================================================

// v9.50: lectura SEGURA de localStorage para las lecturas de arranque. Sin
// esto, un navegador con el almacenamiento bloqueado (modo privado, webviews)
// lanzaba una excepción en la carga del script y la app entera no arrancaba.
function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

// ===== Velocidad de audio (persistente, default 0.85) =====
const SPEED_STEPS = [0.85, 1, 0.7];
const SPEED_LABELS = { '0.85': '🐢 0.85x', '1': '⚡ 1.0x', '0.7': '🐌 0.7x' };
let playbackSpeed = parseFloat(lsGet('ac_speed'));
if (SPEED_STEPS.indexOf(playbackSpeed) === -1) playbackSpeed = 0.85;

// ===== Voz TTS (persistente) =====
// v9.4: el chino pasa de 2 a 4 voces — f (Xiaoxiao), m (Yunjian),
// f2 y m2. Las claves viajan al API igual que f/m.
// v9.5: f2 = FEMENINA ADULTA (Xiaobei), m2 = masculina joven (Yunxi).
// v9.49: VOCES REGIONALES — (a) el español RECUPERA la voz ARGENTINA:
// ar-f (Elena) y ar-m (Tomás), que pasan a ciclar PRIMERO (🇦🇷→🇪🇸) porque
// es la voz del alumno; (b) el chino suma 🇹🇼 tw-f (HsiaoChen) y tw-m
// (YunJhe): 普通话 con acento taiwanés. El idioma del TTS sigue a la
// voz elegida (ttsLangFor: ar-* → "es-AR", tw-* → "zh-TW"). Las banderas
// viven dentro de VOICE_ICONS (el botón muestra 🇦🇷/🇪🇸 o 🇨🇳/🇹🇼 según la
// voz); VOICE_EXPECT cubre las claves nuevas para seguir detectando un
// api/tts.py desactualizado (caería a Xiaoxiao/Elvira → aviso visible).
// v9.49 (QA): DOS mapas — las claves f/m existen en AMBOS idiomas y
// cada botón debe mostrar SU bandera (el mapa único pintaba 🇨🇳 en el
// botón español). VOICE_ICONS_ZH para el botón 🇨🇳/🇹🇼, VOICE_ICONS_ES
// para el botón 🇦🇷/🇪🇸.
const VOICE_ICONS_ZH = { f: '🇨🇳👩', m: '🇨🇳👨', f2: '🇨🇳👩‍💼', m2: '🇨🇳👱‍♂️',
                         'tw-f': '🇹🇼👩', 'tw-m': '🇹🇼👨' };
const VOICE_ICONS_ES = { 'ar-f': '🇦🇷👩', 'ar-m': '🇦🇷👨', f: '🇪🇸👩', m: '🇪🇸👨' };
const VOICE_NAMES = { f: 'femenina', m: 'masculina', f2: 'femenina adulta · Xiaobei', m2: 'masculina joven · Yunxi',
                      'tw-f': 'taiwanesa femenina · HsiaoChen', 'tw-m': 'taiwanesa masculina · YunJhe',
                      'ar-f': 'argentina femenina · Elena', 'ar-m': 'argentina masculina · Tomás' };
// v9.5: voz neuronal esperada por clave — si el servidor devuelve otra,
// es que el api/tts.py desplegado está desactualizado (las nuevas claves
// caerían a Xiaoxiao). v9.49: + HsiaoChen/YunJhe (zh-TW) y Elena/Tomas (es-AR).
const VOICE_EXPECT = { f: ['Xiaoxiao'], m: ['Yunjian'], f2: ['Xiaobei'], m2: ['Yunxi'],
                       'tw-f': ['HsiaoChen'], 'tw-m': ['YunJhe'],
                       'ar-f': ['Elena'], 'ar-m': ['Tomas'] };
// v9.49: ciclos — chino: China (f/m) → Taiwan (tw-f/tw-m) → extendidas;
// español: ARGENTINA primero, España después.
const VOICE_ZH_SEQ = ['f', 'm', 'tw-f', 'tw-m', 'f2', 'm2'];
const VOICE_ES_SEQ = ['ar-f', 'ar-m', 'f', 'm'];
function voiceValid(v, seq) { return seq.indexOf(v) !== -1 ? v : seq[0]; }
let voiceZh = voiceValid(lsGet('ac_voice_zh'), VOICE_ZH_SEQ);
// v9.49: MIGRACIÓN ÚNICA — quien tenía la española f/m guardada pasa a la
// argentina equivalente UNA sola vez (flag ac_voice_es_v949): es la voz que
// se percibía perdida. Tocar el botón permite volver a 🇪🇸 y ahí la elección
// se respeta para siempre (sin re-migraciones).
try {
    if (!localStorage.getItem('ac_voice_es_v949')) {
        const prevEs = localStorage.getItem('ac_voice_es');
        if (prevEs === 'f' || prevEs === 'm') {
            localStorage.setItem('ac_voice_es', prevEs === 'f' ? 'ar-f' : 'ar-m');
        }
        localStorage.setItem('ac_voice_es_v949', '1');
    }
} catch (e) { /* sin storage */ }
let voiceEs = voiceValid(lsGet('ac_voice_es'), VOICE_ES_SEQ);
const VOICE_SAMPLES = {
    zh: '你好！我们一起练习吧。',
    es: '¡Hola! Vamos a practicar juntos.'
};

// ===== Audio Global =====
const TTS_API_URL = 'https://app-chino-espa-ol.vercel.app/api/tts';
const globalAudioPlayer = new Audio();
globalAudioPlayer.preservesPitch = true;        // mantiene la voz natural a distinta velocidad
globalAudioPlayer.webkitPreservesPitch = true;  // Safari
let activeBtn = null;
let originalBtnText = '';
let isPlaying = false;

// ===== Petición TTS con timeout (AbortController) =====
// Evita botones trabados en "⏳" si el servidor tarda o la red falla
// ===== v9.41: aviso visible cuando el TTS del servidor no responde =====
// Hasta v9.40 el fallback a la voz del sistema era SILENCIOSO: el usuario
// escuchaba la voz robótica sin saber que el api/tts de Vercel estaba caído
// (caso real v9.41: /api/tts daba 404 porque el tts.py quedó servido como
// archivo estático en vez de función). fetchTTS es el ÚNICO punto de acceso
// al server (9 llamadas de app.js + dramas DELE): si falla acá, aviso UNA vez
// (throttle 8 min) y la app sigue con su fallback de siempre, sin romper nada.
let ttsDownLast = 0; // timestamp del último aviso (throttle en memoria)
function notifyTtsFallback() {
    try {
        const now = Date.now();
        if (now - ttsDownLast < 8 * 60 * 1000) return; // máx 1 aviso cada 8 min
        ttsDownLast = now;
        let el = document.getElementById('tts-down-notice');
        if (!el) {
            el = document.createElement('div');
            el.id = 'tts-down-notice';
            el.setAttribute('role', 'alert');
            el.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);' +
                'z-index:99999;max-width:92vw;background:#b3261e;color:#fff;padding:10px 14px;' +
                'border-radius:10px;font-size:13px;line-height:1.45;box-shadow:0 4px 16px rgba(0,0,0,.35);' +
                'cursor:pointer;display:none;text-align:center;';
            el.addEventListener('click', () => { try { el.style.display = 'none'; } catch (e) { } });
            (document.body || document.documentElement).appendChild(el);
        }
        el.textContent = uiT('ttsDown');
        el.style.display = 'block';
        clearTimeout(notifyTtsFallback._t);
        notifyTtsFallback._t = setTimeout(() => { try { el.style.display = 'none'; } catch (e) { } }, 9000);
    } catch (e) { /* defensivo: el aviso nunca rompe la app */ }
}
// ===== v9.45: GET cacheable primero (CDN de Vercel), POST de siempre de reserva =====
// El api v9.44 acepta GET ?text=&lang=&voice=&speed= y responde con
// Cache-Control immutable → el CDN guarda el audio y la 2.ª petición de la
// misma frase llega en ~0,1-0,3 s sin tocar el server. POST queda INTACTO
// como red de contención (párrafos largos del lector libre no viajan por
// GET: límite práctico de URL). Contrato de respuesta idéntico en ambos
// caminos → 0 cambios en los 9 callers. El aviso v9.41 (notifyTtsFallback)
// solo suena si POST TAMBIÉN falla: un GET sin caché no debe asustar si el
// POST salva la petición.
const TTS_GET_MAX = 160; // chars: frases/lecciones pasan por GET; párrafos → POST
function ttsGetUrl(body) {
    try {
        const t = String((body && body.text) || '').trim();
        if (!t || t.length > TTS_GET_MAX) return null;
        const q = new URLSearchParams();
        q.set('text', t);
        q.set('lang', String((body && body.lang) || 'zh-CN'));
        q.set('voice', String((body && body.voice) || 'f'));
        q.set('speed', String((body && typeof body.speed === 'number') ? body.speed : 1));
        q.set('cv', '2'); // contrato del audio: un bump futuro invalida la caché CDN
        if (body && body.karaoke) q.set('karaoke', '1'); // v9.7x: pide boundaries reales al server
        return TTS_API_URL + '?' + q.toString();
    } catch (e) { return null; }
}
function fetchTTS(body, timeoutMs) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs || 15000);
    const post = () => fetch(TTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctrl.signal
    })
        .then((res) => { if (!res || !res.ok) notifyTtsFallback(); return res; }) // v9.41: 4xx/5xx visible
        .catch((err) => { notifyTtsFallback(); throw err; }); // v9.41: red/timeout visible
    const getUrl = ttsGetUrl(body);
    if (!getUrl) return post().finally(() => clearTimeout(timer));
    // v9.45: GET cacheable → se acepta SOLO si trae la marca de contrato
    // X-TTS-Audio: 1 (un server viejo respondería el "tell" sin audio con
    // 200 — sin la marca, la app se quedaría sin voz). Cualquier otra cosa
    // (404/500/red/tell sin marca) lo salva el POST de siempre.
    return fetch(getUrl, { method: 'GET', signal: ctrl.signal })
        .then((res) => (res && res.ok && res.headers.get('x-tts-audio') === '1') ? res : post())
        .catch(() => post())
        .finally(() => clearTimeout(timer));
}

// ===== v9.40: velocidad en el SERVIDOR (fin del eco a 0.85x) =====
// Antes: el api/tts.py sintetizaba a velocidad normal y el cliente ESTIRABA
// el audio con playbackRate + preservesPitch → a 0.85x/0.7x quedaba un eco
// artificial. Ahora el body lleva `speed` y edge-tts sintetiza YA lento
// (rate="-15%"): sin post-proceso no hay eco y el tono queda intacto
// (lo maneja el modelo neuronal, no un algoritmo de estiramiento).
// COMPATIBILIDAD (red de contención): si la respuesta NO trae `speed`
// (api/tts.py viejo sin actualizar), applyTtsSpeed aplica el playbackRate
// de siempre → la app funciona igual antes y después de subir el api,
// y NUNCA se aplican los dos efectos a la vez.
let ttsServerSpeed = false; // alguna respuesta ya vino sintetizada a pedido
// v9.49: el idioma del TTS SIGUE a la voz elegida (bandera del botón):
//   español → ar-* pide lang "es-AR" (argentina), resto "es-ES" (España);
//   chino   → tw-* pide lang "zh-TW" (taiwanesa), resto "zh-CN" (China).
// El api v9.49 mapea esos lang a Elena/Tomás y HsiaoChen/YunJhe; con un api
// viejo la clave cae a la voz default (Xiaoxiao) y el aviso de server
// desactualizado (warnStaleVoice) lo hace visible en la muestra de voz.
function ttsLangFor(lang, v) {
    const k = String(v || '');
    if (lang === 'es') return k.indexOf('ar-') === 0 ? 'es-AR' : 'es-ES';
    return k.indexOf('tw-') === 0 ? 'zh-TW' : 'zh-CN';
}
function ttsBody(text, lang, voice, wantBoundaries) {
    const b = { text: text, lang: lang, voice: voice,
                speed: (typeof playbackSpeed === 'number') ? playbackSpeed : 1 };
    // v9.7x: karaoke con timestamps reales — opt-in, solo lo piden los
    // llamadores que van a sincronizar resaltado (ver karaoke.js). El
    // campo se omite por completo si no se pide, cero cambio para los
    // demás ~9 llamadores existentes.
    if (wantBoundaries) b.karaoke = true;
    return b;
}
function applyTtsSpeed(audio, data) {
    const want = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
    let rate = want; // fallback: api viejo sin speed → comportamiento clásico
    if (data && typeof data.speed === 'number' && data.speed > 0) {
        ttsServerSpeed = true; // el server ya sintetizó a la velocidad pedida
        rate = want / data.speed; // ≈1 — solo compensa si el server clampeó
    }
    if (!(rate >= 0.5 && rate <= 2)) rate = want; // defensa numérica
    try { audio.playbackRate = rate; } catch (e) { /* audio sin rate */ }
    return rate;
}

// v9.50: token de petición — si mientras el TTS viaja se pide otra tarjeta
// (Siguiente rápido, "solo oído"), la respuesta vieja se descarta en vez de
// sonar encima (o después) del audio de la tarjeta actual.
let audioReqTok = 0;
async function playAudio(lang) {
    const btn = document.activeElement.tagName === 'BUTTON' ? document.activeElement : null;
    // (v9.50: se quitó una rama de "cancelar mientras carga" que buscaba '⏳' en el
    //  botón, pero el botón muestra '...' y además queda deshabilitado: nunca corría)

    if (globalAudioPlayer.src) {
        globalAudioPlayer.onended = null;
        globalAudioPlayer.onerror = null;
        globalAudioPlayer.pause();
        globalAudioPlayer.currentTime = 0;
        if (globalAudioPlayer.src.startsWith('blob:')) URL.revokeObjectURL(globalAudioPlayer.src);
        globalAudioPlayer.removeAttribute('src');
        globalAudioPlayer.load();
    }
    stopReader(); // si el lector libre está sonando, se corta (un solo audio a la vez)

    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    if (!s) return; // v9.50: módulo sin tarjetas → nada que reproducir
    const myTok = ++audioReqTok;
    const k = ck();

    let text = lang === 'es' ? s.spanish_full : s['chinese_' + k + '_full'];
    let voiceGender = lang === 'es' ? voiceEs : voiceZh;
    let langCode = ttsLangFor(lang, voiceGender); // v9.49: la voz manda (🇦🇷 es-AR · 🇹🇼 zh-TW)

    // v9.19: si un playAudio anterior dejó su botón esperando ('...'), restaurarlo
    // ANTES de capturar el nuevo — al tocar Siguiente (o cambiar de tarjeta en el
    // modo 🎧 solo oído) con el TTS aún en vuelo, el botón anterior quedaba
    // colgado deshabilitado (su onended se pierde al resetear el player).
    if (activeBtn) restoreButton();

    activeBtn = btn;
    originalBtnText = activeBtn ? activeBtn.innerText : '';

    if (activeBtn) {
        activeBtn.innerText = '...';
        activeBtn.disabled = true;
    }

    try {
        const response = await fetchTTS(ttsBody(text, langCode, voiceGender)); // v9.40: +speed
        if (myTok !== audioReqTok) return; // v9.50: ya se pidió otra tarjeta

        if (!response.ok) throw new Error('Error en servidor');
        const data = await response.json();
        if (myTok !== audioReqTok) return;
        if (!data.audio) { restoreButton(); return; }

        const binaryString = atob(data.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);

        const blob = new Blob([bytes], { type: data.mime || 'audio/wav' });
        const url = URL.createObjectURL(blob);
        globalAudioPlayer.src = url;
        applyTtsSpeed(globalAudioPlayer, data); // v9.40: velocidad en el server → sin eco

        try {
            isPlaying = true;
            await globalAudioPlayer.play();
        } catch (playErr) {
            console.warn('Autoplay bloqueado:', playErr);
            if (myTok === audioReqTok) restoreButton(); // si fue reemplazado, el botón ya es de la otra petición
            return;
        }
        if (myTok !== audioReqTok) return; // v9.50: reemplazado mientras arrancaba

        globalAudioPlayer.onended = () => { isPlaying = false; restoreButton(); URL.revokeObjectURL(url); };
        globalAudioPlayer.onerror = () => { console.error('Error audio'); restoreButton(); };

    } catch (error) {
        console.warn('Vercel falló, usando voz sistema:', error);
        if (myTok !== audioReqTok) return; // v9.50: otra tarjeta ya tomó el audio
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = langCode; u.rate = playbackSpeed;
            const sv = sysVoiceFor(langCode, voiceGender); // v9.4: voz sistema acorde a la elegida
            if (sv) u.voice = sv;
            u.onend = restoreButton; u.onerror = restoreButton;
            speechSynthesis.speak(u);
        } else { restoreButton(); }
    }
}

function restoreButton() {
    if (activeBtn) {
        activeBtn.innerText = originalBtnText || '🔊';
        activeBtn.disabled = false;
        activeBtn = null;
        originalBtnText = '';
    }
}

// Detiene el reproductor global desde otros módulos (lección-quiz, lector de
// clásicos) sin que cada uno repita el mismo bloque pause()+isPlaying=false.
function stopGlobalAudio() {
    if (globalAudioPlayer.src) {
        globalAudioPlayer.pause();
        isPlaying = false;
    }
}

// ===== Botón de velocidad: 0.85x -> 1.0x -> 0.7x =====
function cycleSpeed() {
    const idx = SPEED_STEPS.indexOf(playbackSpeed);
    playbackSpeed = SPEED_STEPS[(idx + 1) % SPEED_STEPS.length];
    try { localStorage.setItem('ac_speed', String(playbackSpeed)); } catch (e) { /* sin storage */ }
    const btn = document.getElementById('btn-speed');
    if (btn) {
        btn.textContent = SPEED_LABELS[String(playbackSpeed)];
        btn.title = 'Velocidad del audio: ' + playbackSpeed + 'x (clic para cambiar)';
    }
    // v9.40: en vivo SOLO en fallback (api sin speed). Con el server nuevo el
    // audio en curso ya salió sintetizado a la velocidad anterior y el PRÓXIMO
    // pedido sale a la nueva — tocar el rate acá sería doble efecto.
    if (!ttsServerSpeed) globalAudioPlayer.playbackRate = playbackSpeed;
    if ('speechSynthesis' in window) speechSynthesis.cancel(); // el próximo TTS usará la nueva velocidad
}

// ===== Botones de voz (persistente + muestra de audio) =====
// v9.4: el chino cicla 4 voces (👩 → 👨 → 👩‍🦰 → 👱‍♂️); el español mantiene f/m.
function cycleVoice(lang) {
    if (lang === 'es') {
        voiceEs = VOICE_ES_SEQ[(VOICE_ES_SEQ.indexOf(voiceEs) + 1) % VOICE_ES_SEQ.length];
        try { localStorage.setItem('ac_voice_es', voiceEs); } catch (e) { /* sin storage */ }
    } else {
        voiceZh = VOICE_ZH_SEQ[(VOICE_ZH_SEQ.indexOf(voiceZh) + 1) % VOICE_ZH_SEQ.length];
        try { localStorage.setItem('ac_voice_zh', voiceZh); } catch (e) { /* sin storage */ }
    }
    applySavedUI();
    playVoiceSample(lang); // reproduce una frase corta para escuchar la voz nueva
}

// v9.4: voz del SISTEMA coherente con la elegida (fallback sin red).
// Devuelve una voz zh*/es* distinta según f/m/f2/m2 (si hay varias).
function sysVoiceFor(langCode, v) {
    try {
        const full = String(langCode || '').toLowerCase().replace('_', '-');
        const pref = full.slice(0, 2);
        const vs = speechSynthesis.getVoices().filter(x => x.lang && String(x.lang).toLowerCase().replace('_', '-').indexOf(pref) === 0);
        if (!vs.length) return null;
        // v9.49: con idioma regional (es-AR / zh-TW) preferir las voces del
        // país exacto si el dispositivo las tiene; si no, las del idioma.
        const exact = full.length > 2 ? vs.filter(x => String(x.lang).toLowerCase().replace('_', '-').indexOf(full) === 0) : [];
        const pool = exact.length ? exact : vs;
        const idx = ({ f: 0, m: 1, f2: 2, m2: 3, 'ar-f': 0, 'ar-m': 1, 'tw-f': 0, 'tw-m': 1 })[v] || 0;
        return pool[idx % pool.length];
    } catch (e) { return null; }
}

// v9.5: si el servidor devuelve una voz neuronal DISTINTA de la esperada para
// la clave pedida, es que el api/tts.py desplegado está desactualizado (las
// claves nuevas caen a Xiaoxiao). Aviso visible + consola, sin romper nada.
function warnStaleVoice(key, data) {
    try {
        if (!data || !data.voice) return;               // servidor viejo sin campo voice → nada
        const want = VOICE_EXPECT[key] || null;
        if (!want) return;                              // español u otra clave sin mapeo
        if (want.some(w => String(data.voice).indexOf(w) !== -1)) return; // OK
        console.warn('⚠️ El servidor TTS no tiene aún la voz “' + key + '” (devuelve ' + data.voice + '). Subí el api/tts.py actualizado (v9.49).');
        if (typeof moduleStatus === 'function') {
            moduleStatus('⚠️ Esta voz aún no está en el servidor — subí el api/tts.py nuevo (LEEME SUBIR-A-GITHUB)', true);
        }
    } catch (e) { /* silencioso */ }
}

function playVoiceSample(lang) {
    try {
        const text = VOICE_SAMPLES[lang];
        const gender = lang === 'es' ? voiceEs : voiceZh;
        const langCode = ttsLangFor(lang, gender); // v9.49: la voz manda (🇦🇷 es-AR · 🇹🇼 zh-TW)
        fetchTTS(ttsBody(text, langCode, gender)) // v9.41: pasa por el choke point único (timeout + aviso si el server cae)
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                // v9.49: chequeo de server viejo SOLO para claves regionales
                // (las f/m de España no tienen expectativa en VOICE_EXPECT).
                if (lang === 'es') { if (gender.indexOf('ar-') === 0) warnStaleVoice(gender, d); }
                else if (gender.indexOf('tw-') === 0) warnStaleVoice(gender, d);
                if (!d || !d.audio) return;
                const bin = atob(d.audio);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                const url = URL.createObjectURL(new Blob([bytes], { type: d.mime || 'audio/wav' }));
                const a = new Audio(url);
                applyTtsSpeed(a, d); // v9.40: velocidad en el server → sin eco
                a.onended = () => URL.revokeObjectURL(url);
                a.play().catch(() => { /* autoplay bloqueado */ });
            })
            .catch(() => { /* sin muestra de audio */ });
    } catch (e) { /* silencioso */ }
}
