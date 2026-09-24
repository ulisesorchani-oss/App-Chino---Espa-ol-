// ============================================================
// srs.js — Mazo de repaso (repetición espaciada, Leitner de 6 cajas)
// ============================================================
// Extraído de app.js (fase 4 de modularización, 2026-09-24): el mazo
// de repaso espaciado completo — ya era una IIFE autocontenida que
// solo expone su API pública como window.acSrs* (acSrsMiss, acSrsAdd,
// acSrsHas, acSrsReset, acSrsGrade, acSrsPreview, acSrsRefreshBar).
// Fue el módulo más fácil de separar: no tenía variables sueltas en
// el scope global para empezar.
//
// Es un script clásico (sin import/export), igual que los anteriores:
// se carga en index.html después de app.js/dict.js/trazos.js (usa
// fetchTTS, voiceZh, lookupVocab, openHandwriteAnswer, etc. en tiempo
// de ejecución) y expone su API en window.acSrs* tal cual la usaba el
// resto de la app antes de la extracción.
// ============================================================

// ======================================================================
// v7.21 — REPASO SRS (repetición espaciada · Leitner de 6 cajas)
// ======================================================================
// El mazo se llena con las palabras que cuestan y con las que el usuario decide repasar:
//   · ❌ respuesta incorrecta en la práctica   (hook en checkAnswer)
//   · 🔄 botón "Repetir" de la tarjeta         (hook en markWord)
//   · 🔁 "Sumar a mi repaso" del popup de vocabulario
//   · 🌱 semilla opcional desde el nivel del test de colocación
//   · 🟢 "Bien" sobre palabra nueva → alta suave en caja 2, vuelve mañana (v9.38)
// Algoritmo: 6 cajas — 1 = relearning (10 min, re-encola en la sesión),
// 2..6 = 1 / 3 / 7 / 14 / 30 días. Botones Otra vez / Bien / Fácil
// (estilo Anki-lite). Todo persiste en localStorage 'ac_srs' (clave =
// hanzi simplificado, canónica). Popup #srs-pop clon de #placement-pop;
// IIFE autocontenida: el código existente solo llama hooks window.acSrs*.
(function srsInit() {
    'use strict';

    const SRS_KEY = 'ac_srs';
    const DAY = 86400000;
    const MIN = 60000;
    const AGAIN_MS = 10 * MIN;          // caja 1: relearning dentro de la sesión
    const BOX_DAYS = { 2: 1, 3: 3, 4: 7, 5: 14, 6: 30 };
    const MAX_CARDS = 1000;             // tope del mazo (localStorage sanísimo)
    const SESSION_MAX = 25;             // tarjetas por tanda
    const SEED_SIZE = 12;               // semilla desde el test de colocación

    // ---- almacenamiento ----
    let DB = { v: 1, cards: {} };
    function load() {
        try {
            const r = JSON.parse(localStorage.getItem(SRS_KEY) || 'null');
            if (r && r.v === 1 && r.cards && typeof r.cards === 'object') DB = r;
        } catch (e) { /* corrupto → mazo vacío */ }
    }
    function save() {
        try { localStorage.setItem(SRS_KEY, JSON.stringify(DB)); } catch (e) { /* silencioso */ }
    }

    // ---- consultas ----
    function dueList() {
        const now = Date.now(); const out = [];
        for (const zh in DB.cards) {
            const c = DB.cards[zh];
            if (c && c.d <= now) out.push({ zh: zh, card: c });
        }
        out.sort((a, b) => a.card.d - b.card.d); // la más vencida primero
        return out;
    }
    function dueCount() { return dueList().length; }
    function totalCount() { return Object.keys(DB.cards).length; }
    function futureCount() { return totalCount() - dueCount(); }
    function nextDueMs() {
        let m = Infinity;
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c.d > Date.now() && c.d < m) m = c.d; }
        return m;
    }
    function boxDist() {
        const dist = [0, 0, 0, 0, 0, 0, 0]; // índice = caja
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c.b >= 1 && c.b <= 6) dist[c.b]++; }
        return dist;
    }
    function fmtRel(ms) {
        if (ms <= AGAIN_MS + 2000) return '10 min';
        const d = Math.round(ms / DAY);
        if (d <= 1) return 'mañana';
        return 'en ' + d + ' días';
    }

    // ---- altas ----
    // Devuelve true si agregó; 'dup' si ya estaba; false si clave inválida o mazo lleno.
    function addCard(o) {
        const zh = String(o && o.zh || '').trim();
        if (!zh || zh.length > 20 || !READER_HANZI.test(zh)) return false;
        if (DB.cards[zh]) return 'dup';
        if (totalCount() >= MAX_CARDS) return false;
        const now = Date.now();
        // v9.38: alta directa en caja 2..6 (p.ej. "Bien" sobre palabra nueva → vuelve mañana)
        const box = (o.box >= 2 && o.box <= 6) ? o.box : 1;
        DB.cards[zh] = {
            b: box, d: o.dueNow ? now : (box === 1 ? now + AGAIN_MS : now + (BOX_DAYS[box] || 1) * DAY), a: now, r: 0, l: 0,
            es: o.es || '', py: o.py || '', zt: o.zt || '',
            m: o.m || '', lv: o.lv || 0,
            ctxZh: o.ctxZh || '', ctxZt: o.ctxZt || '', ctxEs: o.ctxEs || ''
        };
        save(); updateBar();
        return true;
    }

    // Hook desde la práctica (checkAnswer ✗ y markWord(false)): recibe la oración.
    window.acSrsMiss = function (s) {
        if (!s) return;
        const zh = String(s.chinese_simp_answer || '').trim();
        const cur = DB.cards[zh];
        if (cur) { cur.b = 1; cur.d = Date.now() + AGAIN_MS; cur.l++; save(); updateBar(); return; }
        addCard({
            zh: zh,
            zt: s.chinese_trad_answer || '',
            // v9.50: w:1 → la glosa es spanish_answer (la PALABRA). Antes usaba
            // spanish_full, que en los ejercicios de lecciones/clásicos es la
            // traducción de toda la frase. En tarjetas HSK/TOCFL ambos coinciden.
            es: s.w ? (s.spanish_answer || s.spanish_full || '') : '',
            py: '', m: s.module || '', lv: s.level || 0,
            ctxZh: s.w ? '' : (s.chinese_simp_full || ''),
            ctxZt: s.w ? '' : (s.chinese_trad_full || ''),
            ctxEs: s.w ? '' : (s.spanish_full || '')
        });
    };

    // Alta manual (popup de vocabulario / semilla)
    window.acSrsAdd = function (o) { return addCard(o); };
    window.acSrsHas = function (w) { return !!DB.cards[String(w || '').trim()]; };
    window.acSrsReset = function () { DB = { v: 1, cards: {} }; save(); updateBar(); };
    // v10 UX: calificación desde la tarjeta de práctica + intervalos reales
    // v9.38: "Bien" sobre palabra NUEVA → alta suave en caja 2 (vuelve mañana);
    // "Fácil" sobre palabra nueva → solo conocidas (no vuelve): ahora los subtítulos
    // y el efecto de los tres botones son distintos y coinciden con lo prometido.
    window.acSrsGrade = function (s, kind) {
        if (!s) return false;
        const zh = String(s.chinese_simp_answer || '').trim();
        if (!DB.cards[zh]) {
            if (kind !== 'good') return false; // Fácil sin mazo: queda en conocidas, nada más
            const added = addCard({
                zh: zh,
                zt: s.chinese_trad_answer || '',
                es: s.w ? (s.spanish_answer || s.spanish_full || '') : '', // v9.50: glosa de la palabra
                py: '', m: s.module || '', lv: s.level || 0,
                ctxZh: s.w ? '' : (s.chinese_simp_full || ''),
                ctxZt: s.w ? '' : (s.chinese_trad_full || ''),
                ctxEs: s.w ? '' : (s.spanish_full || ''),
                box: 2
            });
            if (added === true) return true;
            if (added === 'dup') { grade(zh, 'good'); return true; } // v9.38: ya estaba (‹ Anterior) → sube de caja
            return false;
        }
        grade(zh, kind === 'easy' ? 'easy' : 'good');
        return true;
    };
    window.acSrsPreview = function (s) {
        const zh = s ? String(s.chinese_simp_answer || '').trim() : '';
        const c = DB.cards[zh];
        const cnUI = (typeof state !== 'undefined' && state && state.mode === 'cn-es');
        const lbl = (n) => (n === 1 ? '10 min' : (BOX_DAYS[n] === 1 ? (cnUI ? '1 天' : '1 día') : (cnUI ? BOX_DAYS[n] + ' 天' : BOX_DAYS[n] + ' días')));
        if (!c) return { again: '10 min', good: uiT('gradeTomorrow'), easy: uiT('gradeNoReturn'), inDeck: false }; // v9.38: diferenciados
        return { again: '10 min', good: lbl(Math.min(c.b + 1, 6)), easy: lbl(Math.min(c.b + 2, 6)), inDeck: true };
    };
    window.acSrsRefreshBar = function () { updateBar(); };
    function relearnCount() {
        const now = Date.now(); let n = 0;
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c && c.b === 1 && c.d > now) n++; }
        return n;
    }

    // Glosa de respaldo para tarjetas sin es guardado (módulos de oraciones)
    function srsGloss(zh, card) {
        if (card && card.es) return card.es;
        try {
            const hit = lookupVocab(zh);
            if (hit && hit.rec && hit.rec.es) return hit.rec.es;
        } catch (e) { /* módulo no cargado */ }
        try {
            const d = dictMiniLookup(zh);
            if (d && d.def) return d.def;
        } catch (e) { /* sin diccionario */ }
        return '';
    }

    // ---- semilla desde el test de colocación ----
    function placementLevel() {
        try {
            const r = JSON.parse(localStorage.getItem('ac_placement') || 'null');
            if (r && r.v === 1 && r.level >= 1 && r.level <= 9) return r.level;
        } catch (e) { /* sin colocación */ }
        return 0;
    }
    function seedFromPlacement() {
        const lv = placementLevel();
        if (!lv) return 0;
        const key = 'HSK' + lv;
        if (typeof EMBEDDED_MODULE_DATA === 'undefined' || !EMBEDDED_MODULE_DATA[key]) return 0;
        const rows = EMBEDDED_MODULE_DATA[key];
        const cards = Array.isArray(rows[0]) ? expandWordCards(key, rows) : rows;
        const pool = cards.slice();
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        let n = 0;
        for (const c of pool) {
            if (n >= SEED_SIZE) break;
            const zh = String(c.chinese_simp_full || '');
            if (DB.cards[zh]) continue;
            if (addCard({ zh: zh, zt: c.chinese_trad_full || '', es: c.spanish_full || '',
                          py: c.pinyin || '', m: key, lv: lv, dueNow: true }) === true) n++;
        }
        return n;
    }

    // ---- calificación ----
    function grade(zh, kind) {
        const c = DB.cards[zh];
        if (!c) return;
        const now = Date.now();
        if (kind === 'again') { c.b = 1; c.d = now + AGAIN_MS; c.l++; }
        else if (kind === 'easy') { c.b = Math.min(c.b + 2, 6); c.d = now + (BOX_DAYS[c.b] * DAY); c.r++; }
        else { c.b = Math.min(c.b + 1, 6); c.d = now + (BOX_DAYS[c.b] * DAY); c.r++; }
        save(); updateBar();
    }

    // ---- TTS de la tarjeta (mismo pipeline que la app: Vercel → voz sistema) ----
    function srsSpeak(text) {
        const t = String(text || '').trim();
        if (!t) return;
        try {
            if (globalAudioPlayer && !globalAudioPlayer.paused) { globalAudioPlayer.pause(); }
            if (typeof stopReader === 'function') stopReader();
        } catch (e) { /* silencioso */ }
        const speakFallback = () => {
            if (!('speechSynthesis' in window)) return;
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(t);
            u.lang = ttsLangFor('zh', voiceZh); u.rate = playbackSpeed; // v9.49: 🇹🇼 → zh-TW
            speechSynthesis.speak(u);
        };
        fetchTTS(ttsBody(t, ttsLangFor('zh', voiceZh), voiceZh)) // v9.40: +speed · v9.49: 🇹🇼 → zh-TW
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                if (!d || !d.audio) return speakFallback();
                const bin = atob(d.audio);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                const url = URL.createObjectURL(new Blob([bytes], { type: d.mime || 'audio/wav' }));
                const a = new Audio(url);
                applyTtsSpeed(a, d); // v9.40: velocidad en el server → sin eco
                a.onended = () => URL.revokeObjectURL(url);
                a.play().catch(() => { speakFallback(); });
            })
            .catch(speakFallback);
    }

    // ---- sesión ----
    const SR = { phase: 'idle', queue: [], i: 0, total: 0, unique: 0, done: 0, again: 0, cur: null, revealed: false, prodOk: 0, prodTried: 0, recOk: 0, recTried: 0, recall: null, curTries: 0, curRes: '', attDone: false }; // v9.21: recOk/recTried/recall · v9.48: pase del mazo

    function startSession() {
        SR.queue = dueList().slice(0, SESSION_MAX);
        if (!SR.queue.length) return renderIntro();
        SR.phase = 'quiz'; SR.i = 0; SR.total = SR.queue.length; SR.unique = SR.queue.length;
        SR.done = 0; SR.again = 0; SR.cur = null; SR.revealed = false;
        SR.prodOk = 0; SR.prodTried = 0; SR.recOk = 0; SR.recTried = 0; // v9.17 producción + v9.21 retrieval
        renderQuiz();
    }
    function aheadSession() {
        // "Adelantar": repasa hasta 10 tarjetas aún no vencidas (las más próximas)
        const now = Date.now(); const fut = [];
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c.d > now) fut.push({ zh: zh, card: c }); }
        fut.sort((a, b) => a.card.d - b.card.d);
        SR.queue = fut.slice(0, 10);
        if (!SR.queue.length) return renderStats();
        SR.phase = 'quiz'; SR.i = 0; SR.total = SR.queue.length; SR.unique = SR.queue.length;
        SR.done = 0; SR.again = 0; SR.cur = null; SR.revealed = false;
        SR.prodOk = 0; SR.prodTried = 0; SR.recOk = 0; SR.recTried = 0; // v9.17 + v9.21
        renderQuiz();
    }

    // ===== v9.17 — RECUPERACIÓN ACTIVA: modo producción (opcional) =====
    // Antes de revelar, la app pide ESCRIBIR el hanzi (producir, no solo
    // reconocer): C — cloze de tu propia oración (v9.16) con la palabra
    // tapada + pista 🇪🇸; B — sin oración, pista 🇪🇸 y a escribir.
    // Acepta 简 o 繁 (card.zt + alias de dict-mini) y normaliza espacios/
    // puntuación que el IME meta de más. El ✅/❌ SOLO informa: la nota la
    // pone siempre el alumno (cajas/intervalos intactos). Toggle apagado
    // por defecto, persistido en DB.prod (ac_srs).
    // ===== fin v9.17 (marcadores para tests) =====
    function prodNormalize(s) {
        return String(s || '')
            .toLowerCase()
            .normalize('NFC')
            .replace(/[^0-9a-z\u4e00-\u9fff\u3400-\u4dbf]/g, ''); // solo hanzi + latín/dígitos
    }
    function dictSimpToTrad(w) {
        // dictMiniAlias (v7.12) mapea trad→simp; invertimos UNA sola vez
        if (!dictSimpToTrad._rev) {
            dictSimpToTrad._rev = new Map();
            try {
                dictMiniAlias.forEach((simp, trad) => {
                    if (!dictSimpToTrad._rev.has(simp)) dictSimpToTrad._rev.set(simp, trad);
                });
            } catch (e) { /* sin dict-mini */ }
        }
        const w2 = String(w || '');
        if (!w2) return '';
        if (dictSimpToTrad._rev.has(w2)) return dictSimpToTrad._rev.get(w2);
        let out = '', hits = 0;
        for (const ch of w2) { const t = dictSimpToTrad._rev.get(ch); if (t) { out += t; hits++; } else out += ch; }
        return hits ? out : ''; // solo per-char si hay al menos un mapeo
    }
    function prodVariants(item) {
        const card = item.card || {};
        const set = [];
        const push = (w) => { const n = prodNormalize(w); if (n && set.indexOf(n) === -1) set.push(n); };
        push(item.zh);                  // clave canónica (simplificado)
        push(card.zt);                  // tradicional guardado en la tarjeta
        push(dictSimpToTrad(item.zh));  // tradicional desde alias dict-mini
        return set;
    }
    function prodPlan(item) {
        const card = item.card || {};
        const trad = ck() === 'trad';
        const wordSimp = item.zh;
        const wordTrad = card.zt || dictSimpToTrad(wordSimp) || '';
        const es = srsGloss(item.zh, card);
        const sentRaw = String((trad ? (card.ctxZt || card.ctxZh) : card.ctxZh) || '');
        const blankWord = [wordSimp, wordTrad].find(w => w && sentRaw.indexOf(w) !== -1) || '';
        if (sentRaw && blankWord) {
            // v9.27: split/join = reemplazo GLOBAL. String.replace solo tocaba
            // la 1.ª ocurrencia → si la oración propia repite la palabra
            // ("我喜欢学习，学习很有用") la respuesta quedaba a la vista junto
            // al hueco. Ahora TODAS las ocurrencias se tapan.
            return { mode: 'cloze', sent: sentRaw.split(blankWord).join('＿＿＿'), es: es, answer: blankWord };
        }
        if (es) return { mode: 'word', es: es };
        return null; // sin pista posible → tarjeta clásica
    }
    // ===== fin v9.17 =====

    // ===== v9.21 — RETRIEVAL ANTES DE REVELAR (tarjeta clásica del mazo) =====
    // El "👁️ Ver respuesta" deja de estar disponible de entrada: la tarjeta
    // clásica pide PRIMERO el pinyin (sin tonos — escribir ǔ en teclado ES es
    // irreal) o el significado en español, tolerante a typos pequeños.
    // Correcto → habilita revelar. Error → feedback SIN mostrar la respuesta
    // (se puede reintentar) + escape "🤷 No lo sé" tras el 1.er fallo: nunca
    // dead-end, pero obliga a intentar al menos una vez. El resultado es SOLO
    // informativo (contador en el resumen): la nota la pone siempre el alumno
    // — cajas/intervalos de Leitner intactos. Tarjeta sin py verificable NI
    // glosa → sin gate (comportamiento anterior). El modo producción (v9.17)
    // NO cambia: su reveal sigue libre porque sin IME chino quedarías trabado.
    // ===== v9.21 PURE (inicio) =====
    function srsRecallNorm(s) {
        return String(s || '').toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // tonos + tildes fuera
            .replace(/[^0-9a-z\s]/g, ' ')                     // puntuación → espacio
            .replace(/\s+/g, ' ').trim();
    }
    function srsRecallLev(a, b) {
        const m = a.length, n = b.length;
        if (!m) return n;
        if (!n) return m;
        let prev = new Array(n + 1), cur = new Array(n + 1);
        for (let j = 0; j <= n; j++) prev[j] = j;
        for (let i = 1; i <= m; i++) {
            cur[0] = i;
            for (let j = 1; j <= n; j++) {
                cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
                    prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
            }
            const t = prev; prev = cur; cur = t;
        }
        return prev[n];
    }
    // clave pinyin: sin tildes/espacios/dígitos de tono; v/lü → u ("lv" = "lü")
    function srsRecallPyKey(s) {
        return srsRecallNorm(s).replace(/[^a-z]/g, '').replace(/v/g, 'u');
    }
    function srsRecallPyList(py) {
        const out = [];
        String(py || '').split(/[;,\/·|]+/).forEach((sg) => {
            const k = srsRecallPyKey(sg);
            if (k && out.indexOf(k) === -1) out.push(k);
        });
        return out;
    }
    function srsRecallEsList(gloss) {
        const raw = String(gloss || '');
        if (!raw.trim()) return [];
        const out = [srsRecallNorm(raw)];
        raw.split(/[;,\/·|]+/).forEach((sg) => {
            const n = srsRecallNorm(sg);
            if (n && out.indexOf(n) === -1) out.push(n);
        });
        return out;
    }
    function srsRecallFuzzy(typed, cand) {
        if (!typed || !cand) return false;
        if (typed === cand) return true;
        const tol = cand.length >= 10 ? 2 : (cand.length >= 5 ? 1 : 0);
        if (!tol || Math.abs(typed.length - cand.length) > tol) return false;
        return srsRecallLev(typed, cand) <= tol;
    }
    // v9.27: NÚCLEO de una glosa normalizada — el 1.er token significativo,
    // fuera stopwords de glosa (artículos/preposiciones/conectivos que el
    // subset dejaba pasar: "el" ⊂ "el libro", "en" ⊂ "tener en común").
    // Si TODO es stopword/tiny → fallback al 1.er token crudo (que exista).
    const RECALL_STOP = ['el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'al', 'a',
        'en', 'con', 'por', 'para', 'que', 'y', 'o', 'u', 'se', 'su', 'sus', 'es', 'son'];
    function srsRecallNeedTok(cc) {
        const toks = String(cc || '').split(' ').filter(Boolean);
        const core = toks.filter((t) => t.length > 1 && RECALL_STOP.indexOf(t) === -1);
        return core.length ? core[0] : (toks.length ? toks[0] : '');
    }
    // → 'py' | 'es' | '' — el orden importa: pinyin primero (es lo natural
    // delante de hanzi), español después. v9.27: el subset de tokens ya no
    // basta — el intento tiene que contener el NÚCLEO de la glosa (ver
    // srsRecallNeedTok): "comprar" cuenta frente a "comprar algo", pero
    // tipear solo "algo" o "en" ya NO. Defensivo: cada candidato se
    // SEGMENTA (un crudo "comprar; vender" aporta sus tramos igual que una
    // lista ya procesada por srsRecallEsList) y acepta crudos (mǎi) o
    // procesados (mai).
    function srsRecallHit(typedRaw, pyList, esList) {
        const norm = srsRecallNorm(typedRaw);
        if (!norm) return '';
        const pyTyped = srsRecallPyKey(typedRaw);
        for (const k of (pyList || [])) {
            const kk = srsRecallPyKey(k);
            if (kk && (pyTyped === kk || srsRecallFuzzy(pyTyped, kk))) return 'py';
        }
        const segs = [];
        (esList || []).forEach((c) => srsRecallEsList(c).forEach((s) => {
            if (s && segs.indexOf(s) === -1) segs.push(s);
        }));
        for (const cc of segs) {
            if (cc === norm || srsRecallFuzzy(norm, cc)) return 'es';
            const toks = norm.split(' ').filter((t) => t.length > 1);
            const gtoks = cc.split(' ');
            // v9.27: sin el núcleo de la glosa no hay acierto informativo
            const need = srsRecallNeedTok(cc);
            if (need && toks.indexOf(need) === -1) continue;
            if (toks.length && gtoks.length >= toks.length &&
                toks.every((t) => gtoks.indexOf(t) !== -1)) return 'es';
        }
        return '';
    }
    // ===== v9.21 PURE (fin) =====
    // Datos del gate: py de la tarjeta + fallback pinyin-pro (wordPinyin) y
    // glosa vía srsGloss (que ya cae a lookupVocab/dict-mini). null → sin gate.
    function recallData(item) {
        const card = item.card || {};
        const py = String(card.py || '') || String((item.zh && wordPinyin(item.zh)) || '');
        const pyList = srsRecallPyList(py);
        const esList = srsRecallEsList(srsGloss(item.zh, card));
        if (!pyList.length && !esList.length) return null;
        return {
            pyList: pyList, esList: esList,
            ph: (pyList.length && esList.length) ? 'Pinyin o significado…'
                : (pyList.length ? 'Escribí el pinyin…' : 'Escribí el significado…')
        };
    }
    // ===== fin v9.21 (marcadores para tests) =====

    // v9.17: bloque de respuesta compartido (tarjeta clásica y producción).
    // withHanzi agrega el hanzi grande DENTRO de la respuesta: en producción
    // el hanzi no se muestra como pista porque es justo lo que se pide.
    function srsAnsHtml(item, card, withHanzi) {
        const nextGood = Math.min(card.b + 1, 6);
        const nextEasy = Math.min(card.b + 2, 6);
        const hintB = (n) => (n === 1 ? '10 min' : (BOX_DAYS[n] === 1 ? '1 día' : BOX_DAYS[n] + ' días'));
        const zhAns = ck() === 'trad' ? (card.zt || item.zh) : item.zh;
        return (withHanzi ? '<div class="srs-ans-zh" lang="zh">' + escHtml(zhAns) + '</div>' : '') +
            (card.py ? '<div class="srs-py">📖 ' + escHtml(card.py) + '</div>' : '') +
            '<div class="srs-es">🇪🇸 ' + (srsGloss(item.zh, card)
                ? escHtml(srsGloss(item.zh, card)) : '<span class="srs-es-missing">—</span>') + '</div>' +
            ((card.ctxZh || card.ctxEs) ? '<div class="srs-ctx"><div class="srs-ctx-title">📌 Tu ejemplo</div>' +
                (card.ctxZh ? '<div class="srs-ctx-zh" lang="zh">' + escHtml(ck() === 'trad' ? (card.ctxZt || card.ctxZh) : card.ctxZh) + '</div>' : '') +
                (card.ctxEs ? '<div class="srs-ctx-es">“' + escHtml(card.ctxEs) + '”</div>' : '') + '</div>' : '') +
            '<div class="srs-grades">' +
                '<button type="button" class="srs-grade srs-g-again" data-k="again">😵 Otra vez<small>' + hintB(1) + '</small></button>' +
                '<button type="button" class="srs-grade srs-g-good" data-k="good">🙂 Bien<small>' + hintB(nextGood) + '</small></button>' +
                '<button type="button" class="srs-grade srs-g-easy" data-k="easy">😎 Fácil<small>' + hintB(nextEasy) + '</small></button>' +
            '</div>';
    }

    function renderQuiz() {
        const body = document.getElementById('srs-body');
        if (!body) return;
        const item = SR.queue[SR.i];
        if (!item) return renderSummary();
        SR.cur = item; SR.revealed = false;
        SR.curTries = 0; SR.curRes = ''; SR.attDone = false; // v9.48: pase fresco
        const card = item.card;
        const zh = ck() === 'trad' ? (card.zt || item.zh) : item.zh;
        const box = card.b;

        // v9.17: plan de producción para esta tarjeta (null → clásica)
        const plan = DB.prod ? prodPlan(item) : null;
        // v9.21: gate de retrieval para la tarjeta clásica (null → sin gate)
        const gate = plan ? null : recallData(item);
        SR.recall = gate;

        // v9.48: chip 🎯 — misma base ac_attempts_v1 que la práctica (w:zh)
        const attB = attemptsBadgeFor({ w: 1, chinese_simp_answer: String(item.zh || '') });
        const attChip = attB
            ? '<span class="srs-chip srs-chip-att" title="' + escHtml(uiT('attTitle')
                .replace('{n}', attB.n).replace('{ok}', attB.ok).replace('{ft}', attB.ft)) + '">'
                + escHtml(uiT('attChip').replace('{n}', attB.n)) + '</span>'
            : '';
        body.innerHTML =
            '<div class="srs-meta">' +
                '<span class="srs-chip">Repaso</span>' + attChip +
                (plan ? '<span class="srs-chip srs-chip-prod">✍️ producción</span>' : '') +
                '<span class="srs-count">' + (SR.i + 1) + ' / ' + SR.total + '</span>' +
                (card.lv ? '<span class="srs-lv">HSK ' + card.lv + '</span>' : '') +
                '<span class="srs-box">caja ' + box + '</span>' +
            '</div>' +
            (plan
                ? // — producción: hanzi OCULTO hasta revelar —
                  (plan.mode === 'cloze'
                    ? '<div class="srs-card srs-card-cloze" lang="zh">' + escHtml(plan.sent) + '</div>'
                    : '') +
                  (plan.es ? '<div class="srs-prod-hint">' + (plan.mode === 'cloze' ? '💡 ' : '🇪🇸 ') +
                      escHtml(plan.es) + '</div>' : '') +
                  '<div class="srs-prod-tools">' +
                      '<button type="button" class="srs-tool srs-speak" title="Pista de audio">🔊</button>' +
                  '</div>' +
                  '<div class="srs-prod-row">' +
                      '<input type="text" class="srs-prod-input" maxlength="20" autocomplete="off" ' +
                          'autocapitalize="off" spellcheck="false" enterkeyhint="go" placeholder="Escribí el hanzi…">' +
                      // v9.34: ✍️ escribir el hanzi a mano (producción de memoria)
                      '<button type="button" class="btn-secondary srs-prod-hw" title="Escribir a mano">✍️</button>' +
                      '<button type="button" class="btn-primary srs-prod-check">Comprobar</button>' +
                  '</div>' +
                  '<div id="srs-prod-fb" class="srs-prod-fb" aria-live="polite"></div>' +
                  '<button type="button" class="btn-secondary srs-reveal-btn srs-reveal">👁️ Ver respuesta</button>' +
                  '<div id="srs-ans" class="srs-ans hidden">' + srsAnsHtml(item, card, true) + '</div>'
                : // — clásica: hanzi a la vista + retrieval ANTES de revelar (v9.21) —
                  '<div class="srs-card" lang="zh">' + escHtml(zh) + '</div>' +
                  '<div class="srs-tools">' +
                      '<button type="button" class="srs-tool srs-speak" title="Escuchar la palabra">🔊</button>' +
                      '<button type="button" class="srs-tool srs-write" title="Practicar los trazos">✍</button>' +
                  '</div>' +
                  (gate ? // v9.21: retrieval gate + reveal deshabilitado + escape tras 1 fallo
                      '<div class="srs-recall-row">' +
                          '<input type="text" class="srs-recall-input" maxlength="60" autocomplete="off" ' +
                              'autocapitalize="off" spellcheck="false" enterkeyhint="go" placeholder="' + gate.ph + '">' +
                          '<button type="button" class="btn-primary srs-recall-check">Comprobar</button>' +
                      '</div>' +
                      '<div class="srs-recall-fb" aria-live="polite"></div>' +
                      '<button type="button" class="btn-primary srs-reveal-btn srs-reveal" disabled>👁️ Ver respuesta</button>' +
                      '<button type="button" class="btn-secondary srs-reveal-btn srs-recall-giveup hidden">🤷 No lo sé, ver respuesta</button>'
                  : // sin py ni glosa verificables → reveal directo (comportamiento anterior)
                      '<button type="button" class="btn-primary srs-reveal-btn srs-reveal">👁️ Ver respuesta</button>') +
                  '<div id="srs-ans" class="srs-ans hidden">' + srsAnsHtml(item, card, false) + '</div>');
        const ans = document.getElementById('srs-ans');
        if (ans) ans.classList.add('hidden');
        const pin = document.querySelector('#srs-body .srs-prod-input');
        if (pin) {
            try { pin.focus(); } catch (e) { /* sin foco disponible */ }
            pin.addEventListener('keydown', (ev) => {
                if (ev.isComposing || ev.keyCode === 229) return; // IME: elegir candidato ≠ enviar
                if (ev.key === 'Enter') { ev.preventDefault(); prodCheck(); }
            });
        }
        // v9.21: Enter en el input de retrieval (SIN autofocus a propósito:
        // primero mirá el hanzi y pensá — el teclado no tapa la tarjeta)
        const rin = document.querySelector('#srs-body .srs-recall-input');
        if (rin) {
            rin.addEventListener('keydown', (ev) => {
                if (ev.isComposing || ev.keyCode === 229) return;
                if (ev.key === 'Enter') { ev.preventDefault(); recallCheck(); }
            });
        }
    }

    function prodCheck() {
        const item = SR.cur;
        if (!item || SR.revealed) return;
        const inp = document.querySelector('#srs-body .srs-prod-input');
        if (!inp || inp.disabled) return;
        const typed = prodNormalize(inp.value);
        if (!typed) { try { inp.focus(); } catch (e) { /* vacío → ignorar */ } return; }
        const ok = prodVariants(item).indexOf(typed) !== -1;
        SR.prodTried++; if (ok) SR.prodOk++;
        if (ok) { SR.curRes = 'ok'; } else { SR.curTries++; SR.curRes = 'ko'; } // v9.48: resultado del pase
        const fb = document.getElementById('srs-prod-fb');
        if (fb) fb.innerHTML = ok
            ? '<span class="srs-prod-ok">✅ ¡Correcto!</span>'
            : '<span class="srs-prod-bad">❌ Era: <b lang="zh">' +
              escHtml(ck() === 'trad' ? (item.card.zt || item.zh) : item.zh) + '</b></span>';
        inp.disabled = true;
        const chk = document.querySelector('#srs-body .srs-prod-check');
        if (chk) chk.disabled = true;
        doReveal();
    }

    // v9.21: comprobar el intento de retrieval (tarjeta clásica). SOLO informa:
    // ✅ habilita "Ver respuesta"; ❌ deja reintentar y muestra el escape
    // "No lo sé" — sin revelar la respuesta (a diferencia del modo producción).
    function recallCheck() {
        const item = SR.cur;
        if (!item || SR.revealed) return;
        const inp = document.querySelector('#srs-body .srs-recall-input');
        if (!inp || inp.disabled) return;
        const typed = String(inp.value || '');
        if (!typed.trim()) { try { inp.focus(); } catch (e) { /* vacío → ignorar */ } return; }
        const g = SR.recall || { pyList: [], esList: [] };
        const hit = srsRecallHit(typed, g.pyList, g.esList);
        SR.recTried++; if (hit) SR.recOk++;
        if (hit) { SR.curRes = 'ok'; } else { SR.curTries++; } // v9.48: resultado del pase
        const fb = document.querySelector('#srs-body .srs-recall-fb');
        if (fb) fb.innerHTML = hit
            ? '<span class="srs-prod-ok">✅ ¡Bien! Ahora compará con la respuesta.</span>'
            : '<span class="srs-prod-bad">❌ No coincide — probá de nuevo.</span>';
        const giveup = document.querySelector('#srs-body .srs-recall-giveup');
        if (hit) {
            inp.disabled = true;
            const chk = document.querySelector('#srs-body .srs-recall-check');
            if (chk) chk.disabled = true;
            const btn = document.querySelector('#srs-body .srs-reveal');
            if (btn) { btn.disabled = false; btn.classList.add('srs-reveal-ready'); }
            if (giveup) giveup.classList.add('hidden');
        } else if (giveup) {
            giveup.classList.remove('hidden');
        }
    }

    function doReveal() {
        SR.revealed = true;
        // v9.48: el pase del mazo cierra acá — UN registro por tarjeta revelada
        // ('again' re-encola la tarjeta → renderQuiz resets → nuevo pase).
        if (!SR.attDone) {
            SR.attDone = true;
            if (SR.cur && typeof recordSrsAttempt === 'function') {
                recordSrsAttempt(SR.cur.zh, SR.curTries + 1,
                    SR.curRes === 'ok' ? 'ok' : (SR.curRes === 'ko' ? 'ko' : 'rv'));
            }
            const chip = (typeof document !== 'undefined') ? document.querySelector('#srs-body .srs-chip-att') : null;
            if (chip && SR.cur) {
                const b2 = attemptsBadgeFor({ w: 1, chinese_simp_answer: String(SR.cur.zh || '') });
                if (b2) {
                    chip.textContent = uiT('attChip').replace('{n}', b2.n);
                    chip.title = uiT('attTitle').replace('{n}', b2.n).replace('{ok}', b2.ok).replace('{ft}', b2.ft);
                }
            }
        }
        const ans = document.getElementById('srs-ans');
        // v9.21: esconder TODOS los botones de revelado (reveal + escape)
        document.querySelectorAll('#srs-body .srs-reveal-btn').forEach((b) => b.classList.add('hidden'));
        if (ans) ans.classList.remove('hidden');
        // v9.17: congelar el input de producción (venga de ✅/❌ o del escape)
        const pin = document.querySelector('#srs-body .srs-prod-input');
        if (pin) pin.disabled = true;
        const pchk = document.querySelector('#srs-body .srs-prod-check');
        if (pchk) pchk.disabled = true;
        // v9.21: congelar el gate de retrieval
        const rin2 = document.querySelector('#srs-body .srs-recall-input');
        if (rin2) rin2.disabled = true;
        const rchk2 = document.querySelector('#srs-body .srs-recall-check');
        if (rchk2) rchk2.disabled = true;
    }

    function doGrade(kind) {
        if (!SR.cur) return;
        const item = SR.cur;
        grade(item.zh, kind);
        SR.done++;
        if (kind === 'again') {
            SR.again++;
            if (!item.requeued) { item.requeued = true; SR.queue.push(item); SR.total++; }
        }
        SR.i++;
        if (SR.i >= SR.queue.length) return renderSummary();
        renderQuiz();
    }

    function renderSummary() {
        SR.phase = 'result'; SR.cur = null;
        const body = document.getElementById('srs-body');
        if (!body) return;
        const left = dueCount();
        const nxt = nextDueMs();
        const nextTxt = left > 0
            ? 'Quedan ' + left + ' vencida' + (left === 1 ? '' : 's') + ' para hoy'
            : (isFinite(nxt) ? 'Tu próxima tanda es ' + fmtRel(nxt - Date.now()) : 'Tu mazo sigue activo');
        body.innerHTML =
            '<div class="srs-done-badge">🎉</div>' +
            '<h3 class="srs-title" style="text-align:center">¡Repaso listo!</h3>' +
            '<p class="srs-sum-line">' + SR.done + ' respuesta' + (SR.done === 1 ? '' : 's') +
                ' · ' + SR.unique + ' tarjeta' + (SR.unique === 1 ? '' : 's') +
                (SR.again ? ' · ' + SR.again + ' para volver a ver' : '') + '</p>' +
            (SR.prodTried ? '<p class="srs-sum-line">✍️ ' + SR.prodOk + ' de ' + SR.prodTried +
                ' escrita' + (SR.prodTried === 1 ? '' : 's') + ' bien antes de revelar</p>' : '') +
            (SR.recTried ? '<p class="srs-sum-line">🧠 ' + SR.recOk + ' de ' + SR.recTried +
                ' recordada' + (SR.recTried === 1 ? '' : 's') + ' antes de mirar</p>' : '') +
            '<p class="srs-sum-next">' + nextTxt + '</p>' +
            '<div class="srs-actions">' +
                (left > 0 ? '<button type="button" class="btn-primary srs-start">▶ Seguir repaso (' + left + ')</button>' : '') +
                '<button type="button" class="btn-primary srs-close-btn">Listo ✅</button>' +
                '<button type="button" class="btn-secondary srs-stats-btn">📊 Ver mi mazo</button>' +
            '</div>';
    }

    function renderStats() {
        SR.phase = 'stats'; SR.cur = null;
        const body = document.getElementById('srs-body');
        if (!body) return;
        const total = totalCount(); const due = dueCount(); const fut = futureCount();
        const dist = boxDist();
        const nxt = nextDueMs();
        const boxNames = ['—', 'relearning', '1 d', '3 d', '7 d', '14 d', '30 d'];
        let rows = '';
        for (let b = 1; b <= 6; b++) {
            if (!dist[b]) continue;
            rows += '<div class="srs-stat-row"><span class="srs-stat-k">caja ' + b +
                ' <small>(' + boxNames[b] + ')</small></span><span class="srs-stat-v">' + dist[b] + '</span></div>';
        }
        body.innerHTML =
            '<h3 class="srs-title">📊 Mi mazo de repaso</h3>' +
            '<div class="srs-stat-row srs-stat-hero"><span class="srs-stat-k">Palabras</span><span class="srs-stat-v">' + total + '</span></div>' +
            '<div class="srs-stat-row"><span class="srs-stat-k">Vencen hoy</span><span class="srs-stat-v">' + due + '</span></div>' +
            (rows || '<p class="srs-sum-line">El mazo se llena solo: cada palabra que fallás en la práctica o marcás con 🔄 Repetir entra acá.</p>') +
            (isFinite(nxt) && fut > 0 ? '<p class="srs-sum-next">Próxima tarjeta ' + fmtRel(nxt - Date.now()) + '</p>' : '') +
            (total > 0 ? '<button type="button" class="srs-prod-toggle' + (DB.prod ? ' on' : '') + '">' +
                (DB.prod ? '✍️ Modo producción: activo' : '✍️ Modo producción: apagado') + '</button>' +
                '<p class="srs-prod-note">Te pide escribir el hanzi antes de revelar (acepta 简 o 繁).</p>' : '') +
            '<div class="srs-actions">' +
                (due > 0 ? '<button type="button" class="btn-primary srs-start">▶ Empezar repaso (' + due + ')</button>' : '') +
                (fut > 0 ? '<button type="button" class="btn-secondary srs-ahead">🌅 Adelantar (hasta 10)</button>' : '') +
                '<button type="button" class="btn-secondary srs-close-btn">Cerrar</button>' +
            '</div>' +
            (total > 0 ? '<button type="button" class="srs-clear">🗑️ Vaciar mazo</button>' : '');
    }

    function renderIntro() {
        SR.phase = 'intro'; SR.cur = null;
        const body = document.getElementById('srs-body');
        if (!body) return;
        const total = totalCount(); const due = dueCount();
        if (total === 0) {
            const lv = placementLevel();
            body.innerHTML =
                '<h3 class="srs-title">🔁 Repaso inteligente</h3>' +
                '<p class="srs-intro">Repasá <b>justo antes de olvidar</b>. Tu mazo se llena solo con las palabras que cuestan:</p>' +
                '<ul class="srs-points">' +
                    '<li>❌ Cada respuesta incorrecta de la práctica</li>' +
                    '<li>🔄 Cada palabra marcada con “Repetir”</li>' +
                    '<li>🔁 “Sumar a mi repaso” en el popup de vocabulario</li>' +
                '</ul>' +
                '<p class="srs-intro">Cada tarjeta vuelve a los <b>1 · 3 · 7 · 14 · 30 días</b>, y si la fallás, reaparece en minutos.</p>' +
                (lv ? '<div class="srs-actions"><button type="button" class="btn-primary srs-seed">🌱 Empezar con ' + SEED_SIZE +
                        ' palabras de HSK ' + lv + '</button></div>' :
                    '<p class="srs-sum-next">🎯 ¿No sabés por dónde empezar? Hacé el <b>test de colocación</b> y sembramos tu mazo con tu nivel.</p>') +
                '<div class="srs-actions"><button type="button" class="btn-secondary srs-close-btn">Entendido</button></div>';
            return;
        }
        // hay mazo
        if (due > 0) {
            body.innerHTML =
                '<h3 class="srs-title">🔁 Repaso del día</h3>' +
                '<div class="srs-hero-due">' + due + '</div>' +
                '<p class="srs-sum-line">tarjeta' + (due === 1 ? '' : 's') + ' vencida' + (due === 1 ? '' : 's') + ' de un mazo de ' + total + '</p>' +
                (due > SESSION_MAX ? '<p class="srs-sum-next">Esta tanda: ' + SESSION_MAX + ' · el resto sigue mañana</p>' : '') +
                '<button type="button" class="srs-prod-toggle' + (DB.prod ? ' on' : '') + '">' +
                    (DB.prod ? '✍️ Modo producción: activo' : '✍️ Modo producción: apagado') + '</button>' +
                '<p class="srs-prod-note">Te pide escribir el hanzi antes de revelar (acepta 简 o 繁, sin tonos que tipear).</p>' +
                '<div class="srs-actions">' +
                    '<button type="button" class="btn-primary srs-start">▶ Empezar repaso (' + Math.min(due, SESSION_MAX) + ')</button>' +
                    '<button type="button" class="btn-secondary srs-stats-btn">📊 Ver mi mazo</button>' +
                '</div>';
            return;
        }
        renderStats(); // mazo activo, nada vencido → estadísticas
    }

    // ---- barra sticky (label + badge) ----
    function updateBar() {
        const btn = document.getElementById('btn-srs');
        if (!btn) return;
        const label = document.getElementById('srs-bar-label');
        const badge = document.getElementById('srs-bar-badge');
        const total = totalCount(); const due = dueCount();
        btn.classList.toggle('has-due', due > 0);
        if (badge) {
            if (due > 0) { badge.textContent = due > 99 ? '99+' : String(due); badge.classList.remove('hidden'); }
            else badge.classList.add('hidden');
        }
        if (label) {
            // v10 UX: estado concreto — nunca "al día" con tarjetas en caja 1
            const relearn = relearnCount();
            label.textContent = total === 0 ? uiT('srsEmpty')
                : (due > 0 ? uiT('srsDueN').replace('{n}', due)
                : (relearn > 0 ? uiT('srsRelearn').replace('{n}', relearn) : uiT('srsOkNew')));
            btn.classList.toggle('has-relearn', due === 0 && relearn > 0);
        }
        btn.title = 'Repaso con repetición espaciada' +
            (total ? ' · ' + total + ' en el mazo' : '') + (due ? ' · ' + due + ' vencen hoy' : '');
    }

    // ---- abrir / cerrar ----
    function srsOpen() {
        load(); // por si otra pestaña modificó el mazo
        renderIntro();
        const pop = document.getElementById('srs-pop');
        if (pop) pop.classList.remove('hidden');
    }
    function srsClose() {
        const pop = document.getElementById('srs-pop');
        if (pop) pop.classList.add('hidden');
        SR.phase = 'idle'; SR.cur = null;
    }

    // ---- wiring (patrón placementInit: autocontenido) ----
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-srs', 'click', srsOpen);
    safe('btn-srs-close', 'click', srsClose);

    // Delegado en #srs-body (el body se re-renderiza por fase)
    const body = document.getElementById('srs-body');
    if (body) {
        body.addEventListener('click', (e) => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.classList.contains('srs-start')) startSession();
            else if (b.classList.contains('srs-reveal')) doReveal();
            else if (b.classList.contains('srs-prod-check')) prodCheck(); // v9.17
            else if (b.classList.contains('srs-recall-check')) recallCheck(); // v9.21
            else if (b.classList.contains('srs-recall-giveup')) doReveal(); // v9.21: escape
            else if (b.classList.contains('srs-prod-toggle')) {           // v9.17
                DB.prod = !DB.prod; save();
                if (SR.phase === 'stats') renderStats(); else renderIntro();
            }
            else if (b.classList.contains('srs-grade')) doGrade(b.dataset.k);
            else if (b.classList.contains('srs-seed')) {
                const n = seedFromPlacement();
                if (n > 0) startSession();
                else renderIntro();
            }
            else if (b.classList.contains('srs-ahead')) aheadSession();
            else if (b.classList.contains('srs-stats-btn')) renderStats();
            else if (b.classList.contains('srs-close-btn')) srsClose();
            else if (b.classList.contains('srs-speak')) {
                if (SR.cur) srsSpeak(ck() === 'trad' ? (SR.cur.card.zt || SR.cur.zh) : SR.cur.zh);
            }
            else if (b.classList.contains('srs-prod-hw')) { // v9.34: ✍️ a mano
                if (SR.cur) {
                    const zh = ck() === 'trad' ? (SR.cur.card.zt || SR.cur.zh) : SR.cur.zh;
                    openHandwriteAnswer(zh, (word) => {
                        const pin = document.querySelector('#srs-body .srs-prod-input');
                        if (pin && !pin.disabled) {
                            pin.value = word;
                            try { pin.focus(); } catch (e) { /* sin foco disponible */ }
                        }
                    });
                }
            }
            else if (b.classList.contains('srs-write')) {
                if (SR.cur) openWriterPractice(SR.cur.zh); // banner grande de trazos (v7.16)
            }
            else if (b.classList.contains('srs-clear')) {
                if (confirm('¿Vaciar todo el mazo de repaso? Las palabras podrán sumarse de nuevo.')) {
                    window.acSrsReset();
                    renderIntro();
                }
            }
        });
    }

    // Botón "🔁 Sumar a mi repaso" del popup de vocabulario (delegado)
    // v9.16: EFECTO DE GENERACIÓN — al sumar una palabra se ofrece un input
    // opcional para que el alumno escriba SU propia oración con la palabra
    // ANTES de guardarla (se retiene mejor lo que se produce que lo que se
    // consume). La oración propia viaja en los campos ctx que ya existían:
    // con caracteres han → ctxZh (ejemplo en chino); solo latín → ctxEs.
    // El formulario se inserta IN-SITU (v7.20: nunca re-renderizar el body
    // del popup — el botón quedaría descolgado y el clic-afuera lo cerraría).
    const vpop = document.getElementById('vocab-pop');
    if (vpop) {
        vpop.addEventListener('click', (e) => {
            const btnEl = e.target.closest ? e.target.closest('.vp-srs-add') : null;
            if (!btnEl || btnEl.classList.contains('is-in')) return;
            const vb = document.getElementById('vocab-pop-body');
            const w = (vb && vb.dataset ? vb.dataset.word : '') || '';
            const zh = String(w).trim();
            if (!zh || DB.cards[zh]) return;

            // mostrar el formulario de generación (el botón vuelve al guardar)
            btnEl.style.display = 'none';
            const form = document.createElement('div');
            form.className = 'vp-own-form';
            form.innerHTML =
                '<div class="vp-own-title">✍️ Tu propia oración <small>(opcional)</small></div>' +
                '<div class="vp-own-hint">Escribila vos y la vas a recordar mejor. También podés guardarla sin oración.</div>' +
                '<input type="text" class="vp-own-input" maxlength="120" autocomplete="off" ' +
                    'placeholder="Mi oración con ' + escHtml(zh) + '…">' +
                '<div class="vp-own-actions">' +
                    '<button type="button" class="vp-own-save">✅ Guardar en mi repaso</button>' +
                    '<button type="button" class="vp-own-skip">⤵ Sin oración</button>' +
                '</div>';
            btnEl.after(form);
            const inp = form.querySelector('.vp-own-input');
            try { inp.focus(); } catch (err) { /* sin foco disponible */ }

            // glosa ES y tradicional del diccionario (igual que v7.21)
            const resolveGloss = () => {
                let es = '', zt = '';
                try {
                    const hit = lookupVocab(zh);
                    if (hit && hit.rec) { es = hit.rec.es || ''; zt = hit.rec.zhTrad || ''; }
                } catch (err) { /* sin módulo cargado */ }
                try {
                    if (!es) { const d = dictMiniLookup(zh); if (d && d.def) es = d.def; }
                } catch (err) { /* sin diccionario */ }
                return { es: es, zt: zt };
            };
            const doAdd = (own) => {
                const g = resolveGloss();
                const hasHan = READER_HANZI.test(own || '');
                return addCard({
                    zh: zh, zt: g.zt, es: g.es, py: wordPinyin(zh), dueNow: true,
                    ctxZh: hasHan ? own : '',
                    ctxZt: '',
                    ctxEs: hasHan ? '' : own
                });
            };
            const finish = (added) => {
                if (added === true || added === 'dup') {
                    // dup: ya estaba en el mazo → mismo resultado que el alta
                    // (v9.27: antes 'dup' también moría en silencio)
                    form.remove();
                    btnEl.style.display = '';
                    // Actualización IN SITU (sin re-render): ver nota v7.20 arriba
                    btnEl.classList.add('is-in');
                    btnEl.textContent = '✓ Ya está en tu repaso';
                    return;
                }
                // v9.27: false (mazo lleno o clave inválida) ya NO es silencioso.
                // El formulario QUEDA abierto con la oración del alumno intacta
                // (puede reintentar o copiarla) y un aviso inline reutiliza
                // .vp-own-hint (los 3 temas gratis, cero cambios de CSS).
                const msg = (totalCount() >= MAX_CARDS)
                    ? '⚠ Tu mazo está lleno (' + MAX_CARDS + ' tarjetas). Repasá y limpiá las que ya domines.'
                    : '⚠ No se pudo guardar esta palabra. Revisá el texto e intentá de nuevo.';
                let fb = form.querySelector('.vp-own-fb');
                if (!fb) {
                    fb = document.createElement('div');
                    fb.className = 'vp-own-hint vp-own-fb';
                    const acts = form.querySelector('.vp-own-actions');
                    if (acts) acts.before(fb); else form.appendChild(fb);
                }
                fb.textContent = msg;
            };
            form.querySelector('.vp-own-save').addEventListener('click', () => {
                finish(doAdd(String(inp.value || '').trim()));
            });
            form.querySelector('.vp-own-skip').addEventListener('click', () => {
                finish(doAdd('')); // alta clásica v7.21, sin ctx propio
            });
            inp.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter') { ev.preventDefault(); finish(doAdd(String(inp.value || '').trim())); }
            });
        });
    }

    // Clic fuera cierra (composedPath, mismo fix v7.20: el body se re-renderiza)
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('srs-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && e.target.closest('#btn-srs')) return;
        srsClose();
    });

    // Escape cierra (después de vocab/placement: cada popup cierra el propio)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const pop = document.getElementById('srs-pop');
        if (pop && !pop.classList.contains('hidden') && !topLayerOpen()) srsClose(); // v9.50
    });

    // Vuelta a la pestaña / app: refresca el badge (vencimientos por timestamp)
    window.addEventListener('focus', () => { load(); updateBar(); });

    // Gancho de solo lectura para tests E2E
    window.SRS_DEBUG = function () {
        return {
            total: totalCount(), due: dueCount(), phase: SR.phase,
            i: SR.i, totalQ: SR.total, done: SR.done, again: SR.again,
            cur: SR.cur ? SR.cur.zh : null, revealed: SR.revealed
        };
    };

    load();
    updateBar();
})();
