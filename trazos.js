// ============================================================
// trazos.js — Orden de trazos con Hanzi Writer
// ============================================================
// Extraído de app.js (fase 3 de modularización, 2026-09-24): todo lo
// que usa el motor Hanzi Writer — mostrar el orden de trazos en el
// popup de vocabulario, el banner de práctica grande (✍ Practicar,
// viendo el contorno) y la respuesta a mano en las tarjetas (✍️,
// SIN contorno, de memoria).
//
// Es un script clásico (sin import/export), igual que audio-tts.js y
// dict.js: se carga en index.html después de app.js y expone sus
// funciones/variables como globales. app.js sigue llamándolas igual
// que antes (desde "Eventos" y el mazo de repaso) y el popup de
// vocabulario (showVocabPop/hideVocabPop, que se quedó en app.js)
// sigue leyendo/escribiendo vpStrokes y llamando a mountVpStrokes tal
// cual — ningún llamador cambió.
// ============================================================

// v7.13 — ORDEN DE TRAZOS con Hanzi Writer (librería MIT, chanind).
//  · Librería LOCAL (hanzi-writer.min.js, precacheada por el SW) que se
//    INYECTA solo la 1.ª vez que el popup muestra un hanzi → cero costo
//    inicial; si el archivo local falta, fallback al CDN de jsdelivr.
//  · Los datos de cada carácter (hanzi-writer-data, jsdelivr) los cachea
//    el Service Worker en caché PERSISTENTE → offline desde la 2.ª vez.
//  · Simplificado Y tradicional: el carácter viaja tal cual (el dataset
//    cubre ambos guiones) — vale el state.charType activo al abrir.
//  · Chars duplicados (妈妈) se muestran UNA vez; tope VP_STROKES_MAX.
const VP_STROKES_MAX = 8;
const HANZI_WRITER_CDN = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
const vpStrokes = { libPromise: null, gen: 0, writers: [], boxes: [] };

function loadHanziWriter() {
    if (window.HanziWriter) return Promise.resolve();
    if (vpStrokes.libPromise) return vpStrokes.libPromise;
    vpStrokes.libPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'hanzi-writer.min.js?v=20260906j'; // local: el SW lo precachea → offline
        s.onload = () => resolve();
        s.onerror = () => {
            // Fallback CDN (mismo archivo): sin local y sin red → falla solo la
            // sección de trazos, el resto de la app sigue igual.
            const c = document.createElement('script');
            c.src = HANZI_WRITER_CDN;
            c.onload = () => resolve();
            c.onerror = () => { vpStrokes.libPromise = null; reject(new Error('Hanzi Writer no disponible')); };
            document.head.appendChild(c);
        };
        document.head.appendChild(s);
    });
    return vpStrokes.libPromise;
}

// Colores del trazo según tema (respeta body.dark-mode)
function vpStrokeColors() {
    const dark = document.body.classList.contains('dark-mode');
    return dark
        ? { stroke: '#e2e8f0', outline: '#475569', highlight: '#60a5fa', drawing: '#93c5fd' }
        : { stroke: '#1e293b', outline: '#cbd5e1', highlight: '#2563eb', drawing: '#2563eb' };
}

function mountVpStrokes(word) {
    const wrap = document.getElementById('vp-strokes');
    if (!wrap) return;
    const myGen = ++vpStrokes.gen; // invalida el montaje anterior si el popup reabre
    vpStrokes.writers = [];
    vpStrokes.boxes = [];
    loadHanziWriter().then(() => {
        if (myGen !== vpStrokes.gen) return; // el popup ya se cerró
        const size = (window.innerWidth <= 480) ? 100 : 120;
        const cols = vpStrokeColors();
        const targets = wrap.querySelectorAll('.vp-stroke-target');
        Array.prototype.forEach.call(targets, (target) => {
            const ch = target.dataset.char;
            const box = target.parentElement;
            if (!ch || !box) return;
            try {
                const writer = HanziWriter.create(target, ch, {
                    width: size,
                    height: size,
                    padding: 5,
                    showOutline: true,
                    strokeColor: cols.stroke,
                    outlineColor: cols.outline,
                    highlightColor: cols.highlight,
                    drawingColor: cols.drawing,
                    strokeAnimationSpeed: 1,
                    delayBetweenStrokes: 220,
                    showHintAfterMisses: 2,
                    onLoadCharDataSuccess: () => {
                        if (myGen === vpStrokes.gen) box.classList.remove('loading');
                    },
                    onLoadCharDataError: () => {
                        if (myGen !== vpStrokes.gen) return;
                        box.classList.remove('loading');
                        box.classList.add('nodata');
                    }
                });
                vpStrokes.writers.push(writer);
                vpStrokes.boxes.push(box);
            } catch (e) {
                box.classList.remove('loading');
                box.classList.add('nodata');
            }
        });
    }).catch(() => {
        if (myGen !== vpStrokes.gen) return;
        wrap.querySelectorAll('.vp-stroke-char').forEach(b => { b.classList.remove('loading'); b.classList.add('nodata'); });
        const note = document.createElement('div');
        note.className = 'vp-stroke-note';
        note.textContent = '⚠ No se pudo cargar el motor de trazos (¿sin conexión la primera vez?).';
        wrap.appendChild(note);
    });
}

// ▶ Animar: trazo a trazo, carácter por carácter en secuencia
function vpStrokesAnimate() {
    vpStrokes.boxes.forEach(b => b.classList.remove('quiz-on'));
    vpStrokes.writers.forEach(wr => { try { if (wr.cancelQuiz) wr.cancelQuiz(); } catch (e) {} });
    vpStrokes.writers.reduce(
        (p, wr) => p.then(() => wr.animateCharacter()).catch(() => {}),
        Promise.resolve()
    );
}

// v7.16 — BANNER DE PRÁCTICA GRANDE (✍ Practicar del popup).
//  · Separación consulta / práctica: el popup queda para CONSULTAR
//    (traducción, pinyin, ejemplo y trazos en cuadros chicos con
//    ▶ Animar); la PRÁCTICA con el dedo va a un banner fullscreen
//    (#writer-practice-banner) con un lienzo de min(80vw, 340px).
//  · Reutiliza el motor v7.13: loadHanziWriter() (librería local +
//    fallback CDN), vpStrokeColors() (colores por tema) y la caché
//    persistente de datos por carácter (offline desde la 2.ª vez).
//  · Palabras de varios caracteres (爸爸, 谢谢) → navegación ◀ ▶ y
//    quiz secuencial: al completar un carácter avanza solo al
//    siguiente y arranca su quiz (misma "racha" que el v7.13).
//  · Generación wpPractice.gen: cerrar el banner o cambiar de
//    carácter invalida callbacks en vuelo (carga de datos, quiz,
//    animación) — mismo patrón que vpStrokes.gen del popup.
const wpPractice = { gen: 0, word: '', chars: [], idx: 0, writer: null, pending: null, resizeT: null };

function wpSetHint(msg) {
    const h = document.getElementById('wp-hint');
    if (h) h.textContent = msg;
}

function wpUpdateNav() {
    const counter = document.getElementById('wp-counter');
    if (counter) counter.textContent = (wpPractice.idx + 1) + ' / ' + wpPractice.chars.length;
    const prev = document.getElementById('btn-wp-prev');
    if (prev) prev.disabled = wpPractice.idx === 0;
    const nxt = document.getElementById('btn-wp-next');
    if (nxt) nxt.disabled = wpPractice.idx >= wpPractice.chars.length - 1;
}

// Monta el carácter wpPractice.idx en el lienzo grande.
//  opts.quiz    → al cargar los datos arranca el quiz (racha del quiz)
//  opts.animate → al cargar los datos anima los trazos (guía visual)
function wpShowChar(opts) {
    opts = opts || {};
    const target = document.getElementById('wp-target');
    if (!target) return;
    const myGen = ++wpPractice.gen; // invalida montaje/callbacks anteriores
    wpPractice.pending = opts.quiz ? 'quiz' : (opts.animate ? 'animate' : null);
    const ch = wpPractice.chars[wpPractice.idx];
    if (!ch) return;
    if (wpPractice.writer) { try { wpPractice.writer.cancelQuiz(); } catch (e) {} }
    wpPractice.writer = null;
    target.innerHTML = ''; // nunca dos SVG montados (memoria)
    target.classList.add('loading');
    wpUpdateNav();
    loadHanziWriter().then(() => {
        if (myGen !== wpPractice.gen) return; // cerró el banner o cambió de char
        const cols = vpStrokeColors();
        const size = target.offsetWidth || 320; // el banner ya está visible
        try {
            wpPractice.writer = HanziWriter.create(target, ch, {
                width: size,
                height: size,
                padding: 16,
                showOutline: true,
                strokeColor: cols.stroke,
                outlineColor: cols.outline,
                highlightColor: cols.highlight,
                drawingColor: cols.drawing,
                strokeAnimationSpeed: 1,
                delayBetweenStrokes: 220,
                // v9.35 — SENSIBILIDAD: misma política que la respuesta a mano,
                // con leniency 1.6 (acá hay contorno visible → copiar es más fácil).
                // v9.48: el nivel lo elige el alumno en Ajustes → Tolerancia de trazos.
                leniency: strokeLeniency('practice'),
                acceptBackwardsStrokes: true,
                showHintAfterMisses: 2,
                onLoadCharDataSuccess: () => {
                    if (myGen !== wpPractice.gen) return;
                    target.classList.remove('loading');
                    if (wpPractice.pending === 'quiz') {
                        setTimeout(() => { if (myGen === wpPractice.gen) wpStartQuiz(myGen); }, 350);
                    } else if (wpPractice.pending === 'animate' && wpPractice.writer) {
                        wpPractice.writer.animateCharacter().catch(() => {});
                    }
                },
                onLoadCharDataError: () => {
                    if (myGen !== wpPractice.gen) return;
                    target.classList.remove('loading');
                    wpSetHint('⚠ No pude cargar los datos del carácter (¿sin conexión la primera vez?)');
                }
            });
        } catch (e) {
            target.classList.remove('loading');
            wpSetHint('⚠ No se pudo montar el carácter.');
        }
    }).catch(() => {
        if (myGen !== wpPractice.gen) return;
        target.classList.remove('loading');
        wpSetHint('⚠ No se pudo cargar el motor de trazos (¿sin conexión la primera vez?)');
    });
}

// ✍ Trazar: quiz del carácter actual con el dedo (o el mouse).
//  Al completar: si quedan caracteres → auto-avanza y encadena el
//  quiz; si era el último → mensaje de palabra completa.
function wpStartQuiz(myGen) {
    const wr = wpPractice.writer;
    if (!wr) return;
    if (typeof myGen === 'number' && myGen !== wpPractice.gen) return;
    try { wr.cancelQuiz(); } catch (e) {}
    // gen VIGENTE al arrancar el quiz: el botón ✍ Trazar llama sin myGen
    // (undefined) → el guard del closure compara contra este valor, nunca
    // contra el parámetro (undefined !== gen era SIEMPRE true y el
    // auto-avance onComplete no se ejecutaba jamás — bug cazado por el E2E).
    const gen = typeof myGen === 'number' ? myGen : wpPractice.gen;
    const total = wpPractice.chars.length;
    const i = wpPractice.idx;
    hanziStatsBump(wpPractice.chars[i], 't'); // v9.47: quiz de trazos iniciado
    wpSetHint(total > 1
        ? '✍ Trazá «' + wpPractice.chars[i] + '» con el dedo (' + (i + 1) + ' de ' + total + ')'
        : '✍ Trazá con el dedo sobre el carácter gris');
    wr.quiz({
        // v9.47: error de trazo → estadística por hanzi (el banner de práctica
        // no muestra avisos extra: el contorno visible ya guía solo).
        onMistake: () => {
            if (gen !== wpPractice.gen) return;
            hanziStatsBump(wpPractice.chars[i], 'm');
        },
        onComplete: () => {
            if (gen !== wpPractice.gen) return; // cerró o navegó mientras tanto
            hanziStatsBump(wpPractice.chars[i], 'q'); // v9.47: carácter completado
            if (i < total - 1) {
                wpPractice.idx++;
                wpSetHint('👏 ¡Bien! Ahora «' + wpPractice.chars[wpPractice.idx] + '» (' + (wpPractice.idx + 1) + ' de ' + total + ')');
                wpShowChar({ quiz: true }); // racha: monta el siguiente y arranca su quiz
            } else {
                wpSetHint('🎉 ¡«' + wpPractice.word + '» completa! Repasá con ▶ Animar o volvé a ✍ Trazar.');
            }
        }
    });
}

// ◀ ▶ navegación manual entre los caracteres de la palabra
function wpNavStep(dir) {
    const next = wpPractice.idx + dir;
    if (next < 0 || next >= wpPractice.chars.length) return;
    wpPractice.idx = next;
    wpShowChar({ animate: true }); // navegar = ver cómo se escribe
}

// Punto de entrada (delegación .vp-stroke-quiz del popup): cierra la
// consulta y abre el banner con los caracteres únicos de la palabra.
function openWriterPractice(word) {
    const w = String(word || '').trim();
    const chars = [];
    for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
    const banner = document.getElementById('writer-practice-banner');
    if (!chars.length || !banner) {
        moduleStatus('ℹ️ Tocá una palabra china para practicar sus trazos.', true);
        return;
    }
    hideVocabPop(); // primero se cierra el popup de consulta
    wpPractice.gen++;
    wpPractice.word = w;
    wpPractice.chars = chars.slice(0, VP_STROKES_MAX); // mismo tope que el popup
    wpPractice.idx = 0;
    wpPractice.pending = null;
    const title = document.getElementById('wp-title');
    if (title) title.textContent = 'Practicar: ' + w;
    const nav = document.getElementById('wp-nav');
    if (nav) nav.classList.toggle('hidden', wpPractice.chars.length < 2);
    banner.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // fullscreen: sin scroll detrás
    wpShowChar({ animate: true }); // guía: anima el primer carácter al abrir
}

function closeWriterPractice() {
    wpPractice.gen++; // invalida callbacks en vuelo (carga, quiz, animación)
    if (wpPractice.writer) { try { wpPractice.writer.cancelQuiz(); } catch (e) {} }
    wpPractice.writer = null;
    const banner = document.getElementById('writer-practice-banner');
    if (banner) banner.classList.add('hidden');
    const target = document.getElementById('wp-target');
    if (target) target.innerHTML = ''; // libera el SVG
    syncBodyScroll(); // v9.50: restaura el scroll solo si no queda otro overlay abierto
}

// v9.34 — RESPUESTA A MANO (✍️ junto al input de respuesta).
//  El paso pedagógico que faltaba: PRODUCIR el carácter de memoria.
//  A diferencia del banner de práctica (v7.16), acá el hanzi NO se
//  ve (showOutline: false): el alumno traza de memoria y Hanzi
//  Writer valida trazo por trazo; la pista 💡 anima el carácter
//  cuando no sale. Al completar TODOS los caracteres, el input
//  queda rellenado con la respuesta y el flujo de corrección
//  existente (checkAnswer / prodCheck) sigue exactamente igual —
//  NADA de la lógica de puntuación cambia. Si el motor o los datos
//  no cargan (offline la 1.ª vez), el teclado siempre está: la app
//  no se rompe (filosofía de la casa).
//  Reutiliza el motor v7.13: loadHanziWriter() (librería local +
//  fallback CDN), vpStrokeColors() (colores por tema) y la caché
//  persistente de datos por carácter (chino-es-hanzi-v1, offline
//  desde la 2.ª vez). Palabras de varios caracteres → quiz
//  secuencial auto-encadenado (patrón wpPractice); caracteres
//  repetidos (爸爸) se trazan UNA sola vez y el input recibe la
//  palabra completa.
const hwAns = { gen: 0, word: '', chars: [], idx: 0, writer: null, fill: null, misses: 0, resizeT: null };

function hwSetHint(msg) {
    const h = document.getElementById('hw-hint');
    if (h) h.textContent = msg;
}

function hwUpdateCount() {
    const c = document.getElementById('hw-count');
    if (c) c.textContent = (hwAns.idx + 1) + ' / ' + hwAns.chars.length;
}

// Quiz del carácter actual (sin verlo). onMistake acumula para
// sugerir la pista; onComplete encadena el siguiente carácter y, al
// terminar la palabra, rellena el input y cierra (patrón gen de
// wpStartQuiz: el closure compara contra el gen VIGENTE).
function hwStartQuiz(myGen) {
    const wr = hwAns.writer;
    if (!wr) return;
    if (typeof myGen === 'number' && myGen !== hwAns.gen) return;
    const gen = typeof myGen === 'number' ? myGen : hwAns.gen;
    try { wr.cancelQuiz(); } catch (e) { }
    hwAns.misses = 0;
    hanziStatsBump(hwAns.chars[hwAns.idx], 't'); // v9.47: quiz de memoria iniciado
    wr.quiz({
        onMistake: () => {
            if (gen !== hwAns.gen) return;
            hwAns.misses++;
            hanziStatsBump(hwAns.chars[hwAns.idx], 'm'); // v9.47: error de trazo por hanzi
            // v9.35: aviso temprano (el orden y la dirección de los trazos importan)
            // y sugerencia de pista al 2.º error en vez del 3.º — menos frustación.
            if (hwAns.misses === 1) hwSetHint('💡 El ORDEN y la DIRECCIÓN de los trazos importan — no pasa nada, seguí probando.');
            else if (hwAns.misses >= 2) hwSetHint('🤔 Tranquilo — tocá 💡 Pista y mirá cómo se escribe.');
        },
        onComplete: () => {
            if (gen !== hwAns.gen) return; // cerró el banner mientras tanto
            hanziStatsBump(hwAns.chars[hwAns.idx], 'q'); // v9.47: carácter producido de memoria
            const total = hwAns.chars.length;
            if (hwAns.idx < total - 1) {
                hwAns.idx++;
                hwSetHint('👏 ¡Bien! Ahora el carácter ' + (hwAns.idx + 1) + ' de ' + total + ' (de memoria)');
                hwShowChar(); // racha: monta el siguiente y arranca su quiz
            } else {
                hwSetHint('🎉 ¡Completado! Tu respuesta ya está en el campo.');
                const fill = hwAns.fill;
                setTimeout(() => {
                    if (gen !== hwAns.gen) return; // cerró durante el retardo
                    closeHandwrite();
                    if (typeof fill === 'function') fill(hwAns.word);
                }, 550);
            }
        }
    });
}

// Monta el carácter actual SIN contorno (producción de memoria) y
// arranca el quiz cuando los datos del carácter están listos.
function hwShowChar() {
    const target = document.getElementById('hw-target');
    if (!target) return;
    const myGen = ++hwAns.gen; // invalida montaje/callbacks anteriores
    const ch = hwAns.chars[hwAns.idx];
    if (!ch) return;
    if (hwAns.writer) { try { hwAns.writer.cancelQuiz(); } catch (e) { } }
    hwAns.writer = null;
    target.innerHTML = ''; // nunca dos SVG montados (memoria)
    target.classList.add('loading');
    hwUpdateCount();
    loadHanziWriter().then(() => {
        if (myGen !== hwAns.gen) return; // cerró el banner mientras tanto
        const cols = vpStrokeColors();
        const size = target.offsetWidth || 300; // el banner ya está visible
        try {
            hwAns.writer = HanziWriter.create(target, ch, {
                width: size,
                height: size,
                padding: 16,
                showOutline: false,   // ← LA diferencia con la práctica v7.16: de memoria
                strokeColor: cols.stroke,
                outlineColor: cols.outline,
                highlightColor: cols.highlight,
                drawingColor: cols.drawing,
                strokeAnimationSpeed: 1,
                delayBetweenStrokes: 220,
                // v9.35 — SENSIBILIDAD (el quiz hace merge sobre estas opciones):
                // leniency 2 = duplica la tolerancia de distancia del matcher
                // (350·leniency px en espacio de datos); acceptBackwardsStrokes
                // acepta trazos bien hechos pero en dirección inversa — con el
                // dedo en el celular es el error más común y antes fallaba TODO.
                // v9.48: nivel de Ajustes (normal = 2, igual que el fijo v9.35).
                leniency: strokeLeniency('memory'),
                acceptBackwardsStrokes: true,
                showHintAfterMisses: 2, // tras 2 errores: resalta el próximo trazo
                onLoadCharDataSuccess: () => {
                    if (myGen !== hwAns.gen) return;
                    target.classList.remove('loading');
                    setTimeout(() => { if (myGen === hwAns.gen) hwStartQuiz(myGen); }, 350);
                },
                onLoadCharDataError: () => {
                    if (myGen !== hwAns.gen) return;
                    target.classList.remove('loading');
                    hwSetHint('⚠ No pude cargar los datos del carácter (¿sin conexión la primera vez?) — usá ⌨️ Teclado.');
                }
            });
        } catch (e) {
            target.classList.remove('loading');
            hwSetHint('⚠ No se pudo montar el carácter — usá ⌨️ Teclado.');
        }
    }).catch(() => {
        if (myGen !== hwAns.gen) return;
        target.classList.remove('loading');
        hwSetHint('⚠ Sin motor de trazos (¿sin conexión la primera vez?) — usá ⌨️ Teclado.');
    });
}

// 💡 Pista: anima el carácter actual (se ve la forma y el orden de
// los trazos) y al terminar vuelve a pedir el quiz del MISMO
// carácter — aprendizaje por imitación, sin penalización.
function hwHint() {
    const wr = hwAns.writer;
    if (!wr) return;
    try { wr.cancelQuiz(); } catch (e) { }
    const gen = hwAns.gen;
    hanziStatsBump(hwAns.chars[hwAns.idx], 'h'); // v9.47: pista usada (aprendizaje por imitación)
    hwSetHint('▶ Mirá cómo se escribe y volvé a trazarlo…');
    Promise.resolve(wr.animateCharacter()).then(() => {
        if (gen !== hwAns.gen || hwAns.writer !== wr) return;
        hwSetHint('✍ Ahora trazalo vos, de memoria');
        hwStartQuiz(gen);
    }).catch(() => {
        if (gen !== hwAns.gen) return;
        hwStartQuiz(gen); // la animación falló: el quiz vuelve a estar activo
    });
}

// Punto de entrada: word = la respuesta china esperada (guion 简/繁
// ya resuelto por el caller), fill(word) = cómo rellenar el input.
// Devuelve false si no hay hanzi o banner → el caller deja seguir
// con el teclado. Los caracteres se trazan en orden de aparición,
// sin duplicados, con el mismo tope de la práctica (VP_STROKES_MAX).
function openHandwriteAnswer(word, fill) {
    const w = String(word || '').trim();
    const chars = [];
    for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
    const banner = document.getElementById('handwrite-banner');
    if (!chars.length || !banner) return false;
    hwAns.gen++;
    hwAns.word = w;
    hwAns.chars = chars.slice(0, VP_STROKES_MAX);
    hwAns.idx = 0;
    hwAns.fill = fill || null;
    hwAns.misses = 0;
    banner.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // fullscreen: sin scroll detrás
    hwSetHint('✍ Escribí de memoria: ' + hwAns.chars.length +
        (hwAns.chars.length > 1 ? ' caracteres' : ' carácter') + ' — trazo por trazo, en orden');
    hwShowChar();
    return true;
}

function closeHandwrite() {
    hwAns.gen++; // invalida callbacks en vuelo (carga, quiz, animación, retardo)
    if (hwAns.writer) { try { hwAns.writer.cancelQuiz(); } catch (e) { } }
    hwAns.writer = null;
    const banner = document.getElementById('handwrite-banner');
    if (banner) banner.classList.add('hidden');
    const target = document.getElementById('hw-target');
    if (target) target.innerHTML = ''; // libera el SVG
    syncBodyScroll(); // v9.50: restaura el scroll solo si no queda otro overlay abierto
}
