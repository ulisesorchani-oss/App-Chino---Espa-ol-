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
let readerPlaying = false;

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

function stopReader() {
    if (!readerPlaying && !readerAudio.src) return;
    readerPlaying = false;
    readerAudio.onended = null;
    readerAudio.onerror = null;
    readerAudio.pause();
    try { readerAudio.currentTime = 0; } catch (e) { /* sin src válido */ }
    if (readerAudio.src && readerAudio.src.startsWith('blob:')) URL.revokeObjectURL(readerAudio.src);
    readerAudio.removeAttribute('src');
    const btn = document.getElementById('btn-reader-play');
    if (btn) { btn.textContent = '🔊 Leer'; btn.disabled = false; }
}

async function toggleReaderPlay() {
    if (readerPlaying) { stopReader(); return; }

    const ta = document.getElementById('reader-input');
    const btn = document.getElementById('btn-reader-play');
    if (!ta || !btn) return;
    const text = ta.value.trim();
    if (!text) { ta.focus(); return; }

    const lang = detectReaderLang(text);
    const gender = lang === 'zh' ? voiceZh : voiceEs; // usa la voz elegida en los botones 👩/👨
    const langCode = ttsLangFor(lang, gender); // v9.49: la voz manda (🇦🇷 es-AR · 🇹🇼 zh-TW)

    btn.textContent = '⏳ ...';
    btn.disabled = true;

    // Un solo audio a la vez: cortar voz del sistema, tarjeta y lector
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (isPlaying && activeBtn) { restoreButton(); isPlaying = false; }
    if (globalAudioPlayer.src) {
        globalAudioPlayer.onended = null;
        globalAudioPlayer.pause();
        globalAudioPlayer.removeAttribute('src');
    }
    stopReader();

    try {
        // v7.14: timeout escalado con el largo — una lección completa tarda
        // más de 15 s en sintetizarse (15 s base + 50 ms por carácter).
        const response = await fetchTTS(ttsBody(text, langCode, gender), Math.max(15000, text.length * 50)); // v9.40: +speed
        if (!response.ok) throw new Error('Error en servidor');
        const data = await response.json();
        if (!data.audio) throw new Error('Sin audio');

        const bin = atob(data.audio);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
        readerAudio.src = url;
        applyTtsSpeed(readerAudio, data); // v9.40: velocidad en el server → sin eco

        readerPlaying = true;
        btn.textContent = '⏹ Detener';
        btn.disabled = false;
        await readerAudio.play();
        readerAudio.onended = stopReader;
        readerAudio.onerror = stopReader;
    } catch (err) {
        console.warn('Lector: falló el TTS del servidor, usando voz del sistema:', err);
        stopReader();
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(text);
            u.lang = langCode;
            u.rate = playbackSpeed;
            speechSynthesis.speak(u);
        }
    }
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
    const k = ck();
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
    const groups = [];
    const byGroup = {};
    LESSONS_DATA.lessons.forEach(L => {
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
            if (false) {
                /* planned: agrupadas abajo */
            } else if (L.module && String(L.module).indexOf('Clasicos-') === 0) {
                // v9.2: los clásicos abren el lector de clásicos (texto original)
                o.textContent = '📖 Leer el texto original (lector de clásicos)';
            } else {
                o.textContent = L.label || L.title;
            }
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
    // v9.2: los clásicos de la Biblioteca abren el lector de clásicos
    // (texto original por bloques) — los textos viejos de lessons.js eran
    // la concatenación de oraciones de práctica.
    if (L.module && String(L.module).indexOf('Clasicos-') === 0 && typeof window.CR_open === 'function') {
        window.CR_open(L.module);
        return;
    }
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
            const all = pinyinPro.pinyin(word, { type: 'all' });
            if (all && all.length) items = all;
        }
    } catch (e) { items = null; }
    _readerPyCache.set(word, items);
    return items;
}

function readerWordCols(word, wantPinyin, wantTones) {
    // Columnas ruby de una palabra; si items no aligna 1:1 → degrada a sin pinyin
    const items = (wantPinyin || wantTones) ? readerPinyinItems(word) : null;
    const chars = Array.from(word);
    const useItems = !!(items && items.length === chars.length);
    let cols = '';
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const it = useItems ? items[i] : null;
        const isZhChar = !!(it && it.isZh);
        const toneCls = (wantTones && isZhChar) ? ' tone-' + (it.num || 5) : '';
        let col = '<span class="ruby-col"><span class="ruby-char' + toneCls + '">' + escHtml(ch) + '</span>';
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
    const flush = () => {
        if (!lastWord) return;
        out.push('<span class="reader-word" data-word="' + escHtml(lastWord.text) + '">'
            + lastWord.cols + lastWord.punct + '</span>');
        lastWord = null;
    };

    for (const seg of segs) {
        if (!seg) continue;
        if (READER_HANZI.test(seg)) {
            flush();
            lastWord = { text: seg, cols: readerWordCols(seg, wantPinyin, wantTones), punct: '' };
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
        prev.innerHTML = text.split('\n').map(l =>
            '<div class="reader-line">' + (l ? renderZhLineHtml(l, wantPinyin, wantTones) : '&nbsp;') + '</div>'
        ).join('');
        prev.classList.remove('hidden');
    } catch (e) {
        console.warn('Lector: error renderizando interlineal:', e);
        prev.innerHTML = '<div class="reader-hz">' + escHtml(text).replace(/\n/g, '<br>') + '</div>';
        prev.classList.remove('hidden');
    }
}

