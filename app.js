// Los datos embebidos (EMBEDDED_SENTENCES, EMBEDDED_MODULE_DATA,
// expandWordCards) ahora viven en data-embedded.js, cargado ANTES que
// este archivo en index.html — mismos nombres globales, mismos lectores.

// ===== Constantes =====
const STORAGE_KEY = 'chino-espanol-app-v2';

const DATA_SOURCES = {
    'todas': 'data/sentences.json',
    'Saludos': 'data/sentences.json',
    'Migraciones': 'data/sentences.json',
    'Supermercado': 'data/sentences.json',
    'En un restaurante': 'data/daily/restaurante.json',
    'En el colectivo': 'data/daily/colectivo.json',
    'En el subterráneo': 'data/daily/subterraneo.json',
    'En la clase de idioma': 'data/daily/clase-idioma.json',
    'En el shopping': 'data/daily/shopping.json',
    'En el cine': 'data/daily/cine.json',
    'En el gimnasio': 'data/daily/gimnasio.json',
    'Barrio chino': 'data/daily/barrio-chino.json',
    'HSK1': 'data/exams/hsk1.json',
    'HSK2': 'data/exams/hsk2.json',
    'HSK3': 'data/exams/hsk3.json',
    'HSK4': 'data/exams/hsk4.json',
    'HSK5': 'data/exams/hsk5.json',
    'HSK6': 'data/exams/hsk6.json',
    'HSK7': 'data/hsk30/hsk7.json', // v7.19: HSK 3.0 — fallback solo; el contenido real viaja embebido
    'HSK8': 'data/hsk30/hsk8.json',
    'HSK9': 'data/hsk30/hsk9.json',
    // v8.2: TOCFL Band A — fallback solo; el vocabulario real viaja embebido
    'TOCFL-Prep': 'data/tocfl/tocfl_prep.json',
    'TOCFL-A1': 'data/tocfl/tocfl_a1.json',
    'TOCFL-A2': 'data/tocfl/tocfl_a2.json',
    'TOCFL-B3': 'data/tocfl/tocfl_b3.json', // v9.5: Band B — fallback solo; viaja embebido
    'TOCFL-B4': 'data/tocfl/tocfl_b4.json', // v9.5: Band B — fallback solo; viaja embebido
    'TOCFL': 'data/exams/tocfl.json',
    'DELE-A1-Escolares': 'data/exams/dele-a1-escolares.json',
    'DELE-A2B1-Escolares': 'data/exams/dele-a2b1-escolares.json',
    'Clasicos-Daxue': 'data/classics/daxue.json',
    'Clasicos-Lunyu': 'data/classics/lunyu.json',
    'Clasicos-Zhongyong': 'data/classics/zhongyong.json',
    'Clasicos-Mengzi': 'data/classics/mengzi.json',
    'Clasicos-Sanzijing': 'data/classics/sanzijing.json',
    'Clasicos-Xiaojing': 'data/classics/xiaojing.json',
    'Clasicos-Daodejing': 'data/classics/daodejing.json',
    'Clasicos-Xinjing': 'data/classics/xinjing.json',
    'Clasicos-Jingangjing': 'data/classics/jingangjing.json'
};

const MODULE_LABELS = {
    'todas': 'Práctica diaria (todas)',
    'Saludos': 'Saludos',
    'Migraciones': 'Migraciones',
    'Supermercado': 'Supermercado',
    'En un restaurante': 'En un restaurante',
    'En el colectivo': 'En el colectivo',
    'En el subterráneo': 'En el subterráneo',
    'En la clase de idioma': 'En la clase de idioma',
    'En el shopping': 'En el shopping',
    'En el cine': 'En el cine',
    'En el gimnasio': 'En el gimnasio',
    'Barrio chino': 'Barrio chino',
    'HSK1': 'HSK 1',
    'HSK2': 'HSK 2',
    'HSK3': 'HSK 3',
    'HSK4': 'HSK 4',
    'HSK5': 'HSK 5',
    'HSK6': 'HSK 6',
    'HSK7': 'HSK 7',
    'HSK8': 'HSK 8',
    'HSK9': 'HSK 9',
    // v8.3: TOCFL Band A — lista oficial vigente (華語八千詞表 2023, tocfl.edu.tw)
    'TOCFL-Prep': 'TOCFL · Preparación (Novice)',
    'TOCFL-A1': 'TOCFL · Nivel 1 (入門)',
    'TOCFL-A2': 'TOCFL · Nivel 2 (基礎)',
    'TOCFL-B3': 'TOCFL · Nivel 3 (進階)',
    'TOCFL-B4': 'TOCFL · Nivel 4 (高階)',
    'TOCFL': 'TOCFL',
    'DELE-A1-Escolares': 'DELE A1 · Escolares',
    'DELE-A2B1-Escolares': 'DELE A2/B1 · Escolares',
    'Clasicos-Daxue': 'Gran Estudio 大学',
    'Clasicos-Lunyu': 'Analectas 论语',
    'Clasicos-Zhongyong': 'Doctrina del Medio 中庸',
    'Clasicos-Mengzi': 'Mencio 孟子',
    'Clasicos-Sanzijing': 'Tres Caracteres 三字经',
    'Clasicos-Xiaojing': 'Piedad Filial 孝经',
    'Clasicos-Daodejing': 'Tao Te King 道德经',
    'Clasicos-Xinjing': 'Sutra del Corazón 心经',
    'Clasicos-Jingangjing': 'Sutra del Diamante 金刚经'
};

// Módulos diarios (filtran el lote de práctica) y módulos clásicos
const DAILY_MODULES = ['todas', 'Saludos', 'Migraciones', 'Supermercado',
    'En un restaurante', 'En el colectivo', 'En el subterráneo',
    'En la clase de idioma', 'En el shopping', 'En el cine',
    'En el gimnasio', 'Barrio chino'];
// v9.63: interleaving real en Diaria (AUDITORIA-GAGNE-MAYER.md, evento 6) —
// fracción del lote que se completa con frases de OTRAS situaciones cuando
// el alumno eligió una puntual. Las 11 situaciones ya comparten el mismo
// array en memoria (EMBEDDED_MODULE_DATA['todas'], ver data-embedded.js),
// así que mezclar no pide datos nuevos.
const DAILY_INTERLEAVE_RATIO = 0.2;
const CLASSICS_MODULES = ['Clasicos-Daxue', 'Clasicos-Lunyu', 'Clasicos-Zhongyong',
    'Clasicos-Mengzi', 'Clasicos-Sanzijing', 'Clasicos-Xiaojing',
    'Clasicos-Daodejing', 'Clasicos-Xinjing', 'Clasicos-Jingangjing'];

// Datos de los 9 clásicos para el dropdown: nombres en simplificado (zh) y
// tradicional (zhT) — el switch 简/繁 los actualiza en vivo (v7.0)
const CLASSICS_INFO = {
    'Clasicos-Daxue':       { zh: '大学',   zhT: '大學',   py: 'Dàxué',       es: 'Gran Estudio' },
    'Clasicos-Lunyu':       { zh: '论语',   zhT: '論語',   py: 'Lúnyǔ',       es: 'Analectas' },
    'Clasicos-Zhongyong':   { zh: '中庸',   zhT: '中庸',   py: 'Zhōngyōng',   es: 'Doctrina del Medio' },
    'Clasicos-Mengzi':      { zh: '孟子',   zhT: '孟子',   py: 'Mèngzǐ',      es: 'Mencio' },
    'Clasicos-Sanzijing':   { zh: '三字经', zhT: '三字經', py: 'Sānzìjīng',   es: 'Tres Caracteres' },
    'Clasicos-Xiaojing':    { zh: '孝经',   zhT: '孝經',   py: 'Xiàojīng',    es: 'Piedad Filial' },
    'Clasicos-Daodejing':   { zh: '道德经', zhT: '道德經', py: 'Dàodéjīng',   es: 'Tao Te King' },
    'Clasicos-Xinjing':     { zh: '心经',   zhT: '心經',   py: 'Xīnjīng',     es: 'Sutra del Corazón' },
    'Clasicos-Jingangjing': { zh: '金刚经', zhT: '金剛經', py: 'Jīngāngjīng', es: 'Sutra del Diamante' }
};

// Info de los exámenes DELE para el dropdown (v7.4): badge del botón
// (DELE · A1 Escolares) y de la insignia de la tarjeta (🇪🇸 DELE A1).
// Los exámenes para adultos se agregarán a DELE_INFO cuando lleguen.
const DELE_INFO = {
    'DELE-A1-Escolares':   { badge: 'A1' },
    'DELE-A2B1-Escolares': { badge: 'A2/B1' }
};

// v8.2: badge de la insignia de tarjeta para los módulos de vocabulario TOCFL
// (['🇹🇼 TOCFL N1 · vocabulario']). Los niveles Band B/C llegarán cuando la
// data esté lista (mismo dropdown, sección "próximamente").
const TOCFL_INFO = {
    'TOCFL-Prep': { badge: 'Prep' },
    'TOCFL-A1':   { badge: 'N1' },
    'TOCFL-A2':   { badge: 'N2' },
    'TOCFL-B3':   { badge: 'N3' },
    'TOCFL-B4':   { badge: 'N4' }
};

// Etiqueta visible de un módulo (los clásicos muestran nombre ES + zh según el script activo)
function moduleLabel(mod) {
    const info = CLASSICS_INFO[mod];
    if (info) return info.es + ' ' + (ck() === 'trad' ? info.zhT : info.zh);
    return MODULE_LABELS[mod] || mod;
}

function moduleStatus(msg, isError) {
    const el = document.getElementById('module-status');
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
    el.classList.toggle('hidden', !msg);
}

// ===== Estado =====
let state = {
    sentences: [],
    currentIndex: 0,
    mode: 'es-cn',
    charType: 'simp',
    knownWords: new Set(),
    newWords: new Set(),
    score: 0,
    activeModule: 'todas',
    translationRevealed: false,
    showPinyin: true,
    answered: false,
    filledAnswer: null,  // v7.2: 'correct' | 'wrong' | 'reveal' → el hueco se muestra completo
    // v7.11: esquema de colores de tono + leyenda
    toneScheme: 'standard',   // 'standard' | 'colorblind' | 'custom'
    toneCustomColors: null,   // {'1':'#hex',...,'5':'#hex'} — 5 = neutro
    toneLegendSeen: false,    // la leyenda ya se mostró al activar tonos
    // v7.13: contexto guardado al marcar una palabra → wordContexts[palabra] =
    // { zh: oración simplificada, zt: oración tradicional, es: oración española,
    //   py: pinyin de la PALABRA }. Se muestra en el popup ("tu ejemplo").
    wordContexts: {},
    // v9.15: PRÁCTICA INTERCALADA (interleaving). false = orden original del
    // módulo (bloque/narrativa); true = orden mezclado con Fisher-Yates
    // determinista. La semilla se persiste: al recargar, el orden mezclado es
    // el MISMO y el índice guardado sigue apuntando a la misma frase.
    interleaving: false,
    interleaveSeed: 0,   // semilla del shuffle actual (persistida)
    _shufCache: null,    // cache interno del orden mezclado (no se persiste)
    // v9.19: SOLO OÍDO — audio primero, texto oculto hasta responder (es-cn)
    listenFirst: false,
    // v10 UX: intentos por tarjeta, resultado, sesión diaria
    attempts: 0,
    lastResult: null,      // 'correct' | 'wrong' | 'reveal'
    sessionDone: 0, sessionGoal: 10, sessionTarget: 10, sessionDate: '',
    _uiReady: false
};

// Variable global para el botón de colores
let showToneColors = false; 

// lsGet, velocidad de audio y voz TTS (persistentes) ahora viven en
// audio-tts.js, cargado antes que este archivo en index.html.

// ===== Persistencia localStorage =====
function saveProgress() {
    try {
        const data = {
            knownWords: Array.from(state.knownWords),
            newWords: Array.from(state.newWords),
            score: state.score,
            mode: state.mode,
            charType: state.charType,
            currentIndex: state.currentIndex,
            activeModule: state.activeModule,
            showPinyin: state.showPinyin,
            showToneColors: showToneColors, // Guardar estado de colores
            // v7.11: esquema de tonos
            toneScheme: state.toneScheme,
            toneCustomColors: state.toneCustomColors,
            toneLegendSeen: state.toneLegendSeen,
            // v7.13: contexto de las palabras marcadas
            wordContexts: state.wordContexts,
            // v9.15: práctica intercalada (modo + semilla sobreviven al reload)
            interleaving: state.interleaving,
            interleaveSeed: state.interleaveSeed,
            // v9.19: solo oído (persistente como el resto de los toggles)
            listenFirst: state.listenFirst
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* silencioso */ }
}

// ===== v9.3: RESPALDO DE PROGRESO + EXPORTAR A ANKI =====
// Respaldo: JSON con TODAS las claves de la app (progreso, mazo SRS,
// lecciones, ajustes) → importable en otro equipo (github.io ↔ vercel.app)
// sin perder nada. Anki: TSV con las cabeceras mágicas de Anki
// (#separator/#html) → Archivo → Importar mapea las 3 columnas + tags.
function backupCollect() {
    const data = {};
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (!k) continue;
            if (k === STORAGE_KEY || k === 'theme' || /^ac_/.test(k)) data[k] = localStorage.getItem(k);
        }
    } catch (e) { /* sin storage */ }
    return data;
}
function backupDownload(name, content, mime) {
    try {
        const blob = new Blob([content], { type: mime || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { try { URL.revokeObjectURL(url); a.remove(); } catch (e) { } }, 800);
        return true;
    } catch (e) { return false; }
}
function backupHoy() { return localDay(); }
function showBackupMsg(t) {
    const el = document.getElementById('backup-msg');
    if (el) el.textContent = t;
    else moduleStatus(t);
}
function doBackupExport() {
    const payload = { app: 'huayu-diario', kind: 'respaldo', version: 1, date: new Date().toISOString(), data: backupCollect() };
    if (backupDownload('huayu-diario-respaldo-' + backupHoy() + '.json', JSON.stringify(payload), 'application/json')) {
        showBackupMsg('✅ Respaldo descargado. Guardalo en un lugar seguro.');
    }
}
function doBackupImport(file) {
    const rd = new FileReader();
    rd.onload = () => {
        try {
            const obj = JSON.parse(String(rd.result || ''));
            if (!obj || obj.app !== 'huayu-diario' || !obj.data || typeof obj.data !== 'object') throw new Error('formato');
            let n = 0;
            // v9.28: marca IMPORTACIÓN para el wrapper de stats.js — los
            // deltas de score/repasos escritos acá NO son práctica de hoy
            // (el log importado ya trae su propia historia): re-base solo,
            // sin contar nada. Sin el flag, restaurar un respaldo con pocos
            // aciertos de diferencia los contaba como aciertos del día.
            try { window.__hsImporting = true; } catch (e) { }
            // v9.50: solo se restauran las claves que la app misma exporta
            // (backupCollect: STORAGE_KEY, theme y ac_*) — un archivo ajeno o
            // manipulado ya no puede escribir claves arbitrarias del navegador.
            Object.keys(obj.data).forEach(k => {
                if (!(k === STORAGE_KEY || k === 'theme' || /^ac_/.test(k))) return;
                try { localStorage.setItem(k, String(obj.data[k])); n++; } catch (e) { }
            });
            try { window.__hsImporting = false; } catch (e) { }
            showBackupMsg('✅ Importado (' + n + ' bloques). Recargando…');
            setTimeout(() => { try { location.reload(); } catch (e) { } }, 900);
        } catch (e) {
            showBackupMsg('⚠ El archivo no parece un respaldo de Huayu Diario.');
        }
    };
    rd.readAsText(file);
}
function ankiGloss(zh) {
    try { const hit = lookupVocab(zh); if (hit && hit.rec && hit.rec.es) return hit.rec.es; } catch (e) { }
    try { const d = dictMiniLookup(zh); if (d && d.def) return d.def; } catch (e) { }
    return '';
}
function ankiPinyin(zh) {
    try {
        const hit = lookupVocab(zh);
        if (hit && hit.level === 'dict' && hit.py) return hit.py;
        if (hit && hit.rec && hit.rec.pinyin) return hit.rec.pinyin;
    } catch (e) { }
    try { if (typeof wordPinyin === 'function') { const p = wordPinyin(zh); if (p) return p; } } catch (e) { }
    try {
        if (typeof pinyinPro !== 'undefined') {
            return pinyinPro.pinyin(zh, { type: 'all' }).map(x => x.isZh ? (x.pinyin || x.origin) : x.origin).join(' ').replace(/\s+/g, ' ').trim();
        }
    } catch (e) { }
    return '';
}
function doAnkiExport() {
    const rows = [];
    const seen = new Set();
    const push = (zh, py, es, tags) => {
        zh = String(zh || '').trim();
        if (!zh || seen.has(zh) || !READER_HANZI.test(zh)) return;
        const pyF = String(py || ankiPinyin(zh) || '').replace(/\t/g, ' ').trim();
        const esF = String(es || ankiGloss(zh) || '').replace(/\t/g, ' ').replace(/\r?\n/g, '<br>').trim();
        if (!pyF && !esF) return; // sin datos útiles para estudiar
        seen.add(zh);
        rows.push([zh, pyF, esF, tags || 'huayu-diario'].join('\t'));
    };
    // 1) mazo de repaso (SRS) — con lo guardado, glosa de respaldo si falta
    try {
        const db = JSON.parse(localStorage.getItem('ac_srs') || 'null');
        if (db && db.cards) {
            Object.keys(db.cards).forEach(zh => {
                const c = db.cards[zh] || {};
                push(zh, c.py || '', c.es || '', 'huayu-repaso');
            });
        }
    } catch (e) { }
    // 2) palabras del estudio (conocidas / a repasar)
    try {
        const prog = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (prog) {
            (prog.newWords || []).forEach(w => push(w, '', '', 'huayu-a-repasar'));
            (prog.knownWords || []).forEach(w => push(w, '', '', 'huayu-conocidas'));
        }
    } catch (e) { }
    if (!rows.length) {
        showBackupMsg('⚠ Todavía no hay palabras para exportar — practicá un poco primero.');
        return;
    }
    const tsv = '#separator:tab\n#html:true\n#tags column:4\n' + rows.join('\n') + '\n';
    if (backupDownload('huayu-diario-anki-' + backupHoy() + '.txt', tsv, 'text/tab-separated-values')) {
        showBackupMsg('✅ ' + rows.length + ' palabras exportadas. En Anki: Archivo → Importar.');
    }
}
function openBackupPop() {
    const p = document.getElementById('backup-pop');
    if (p) p.classList.remove('hidden');
}
function closeBackupPop() {
    const p = document.getElementById('backup-pop');
    if (p) p.classList.add('hidden');
}

// ===== v9.3: MODO ABUELO — letras grandes para alumnos adultos mayores =====
// Persistente ('ac_grand'): agranda tarjeta, botones, lectores, repaso y
// opciones del quiz sin tocar el resto del diseño.
function applyGrand() {
    let on = false;
    try { on = localStorage.getItem('ac_grand') === '1'; } catch (e) { }
    document.body.classList.toggle('grand-mode', on);
    const b = document.getElementById('btn-grand');
    if (b) {
        b.classList.toggle('active', on);
        b.textContent = on ? '🅰 Grande ON' : '🅰 Grande';
        b.title = 'Letras grandes para leer cómodo (modo abuelo)';
    }
}
function toggleGrand() {
    try {
        localStorage.setItem('ac_grand', document.body.classList.contains('grand-mode') ? '0' : '1');
    } catch (e) { }
    applyGrand();
}

// v9.0: canonicalización trad→simp para los guardados viejos. Hasta v8.3 las
// ORACIONES guardaban la respuesta en el guion activo: quien estudió con 繁
// tiene 謝謝/時間/哪裡 en "Palabras aprendidas" en vez de 谢谢/时间/哪里. El mapa
// se construye de los datos embebidos (todo trad guardado salió de acá).
let _trad2simp = null;
function canonicalHanzi(w) {
    if (!_trad2simp) {
        _trad2simp = {};
        try {
            for (const key in EMBEDDED_MODULE_DATA) {
                const rows = EMBEDDED_MODULE_DATA[key];
                if (!Array.isArray(rows)) continue;
                for (const s of rows) {
                    if (Array.isArray(s)) {
                        if (s[1] && s[1] !== s[0]) _trad2simp[s[1]] = s[0];
                    } else if (s && s.chinese_trad_answer && s.chinese_simp_answer &&
                               s.chinese_trad_answer !== s.chinese_simp_answer) {
                        _trad2simp[s.chinese_trad_answer] = s.chinese_simp_answer;
                    }
                }
            }
        } catch (e) { /* silencioso */ }
    }
    return _trad2simp[w] || w;
}
function canonicalizeWordSet(set) {
    const out = new Set();
    set.forEach(w => out.add(canonicalHanzi(w)));
    return out;
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        // v9.0: al cargar, los guardados legacy se canonicalizan a simplificado
        if (data.knownWords) state.knownWords = canonicalizeWordSet(new Set(data.knownWords));
        if (data.newWords) state.newWords = canonicalizeWordSet(new Set(data.newWords));
        if (typeof data.score === 'number') state.score = data.score;
        if (data.mode) state.mode = data.mode;
        if (data.charType) state.charType = data.charType;
        if (typeof data.currentIndex === 'number') state.currentIndex = data.currentIndex;
        if (data.activeModule) state.activeModule = data.activeModule;
        if (data.showPinyin !== undefined) state.showPinyin = data.showPinyin;
        if (data.showToneColors !== undefined) showToneColors = data.showToneColors;
        // v7.11: esquema de tonos (validado — localStorage puede venir viejo o trucado)
        if (['standard', 'colorblind', 'custom'].indexOf(data.toneScheme) !== -1) {
            state.toneScheme = data.toneScheme;
        }
        if (data.toneCustomColors && typeof data.toneCustomColors === 'object') {
            const clean = {};
            for (let n = 1; n <= 5; n++) {
                const v = data.toneCustomColors[String(n)];
                if (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) clean[String(n)] = v;
            }
            if (Object.keys(clean).length) state.toneCustomColors = clean;
        }
        if (data.toneLegendSeen !== undefined) state.toneLegendSeen = !!data.toneLegendSeen;
        // v7.13: contextos guardados (validados — localStorage puede venir viejo)
        if (data.wordContexts && typeof data.wordContexts === 'object') {
            const clean = {};
            for (const k in data.wordContexts) {
                const c = data.wordContexts[k];
                if (k && c && typeof c === 'object') {
                    clean[k] = {
                        zh: typeof c.zh === 'string' ? c.zh : '',
                        zt: typeof c.zt === 'string' ? c.zt : '',
                        es: typeof c.es === 'string' ? c.es : '',
                        py: typeof c.py === 'string' ? c.py : ''
                    };
                }
            }
            state.wordContexts = clean;
        }
        // v9.15: práctica intercalada (validado — localStorage puede venir viejo)
        if (data.interleaving !== undefined) state.interleaving = !!data.interleaving;
        if (typeof data.interleaveSeed === 'number' && data.interleaveSeed >= 0) {
            state.interleaveSeed = data.interleaveSeed;
        }
        // v9.19: solo oído (validado — localStorage puede venir viejo)
        if (data.listenFirst !== undefined) state.listenFirst = !!data.listenFirst;
    } catch (e) { /* silencioso */ }
}

// v7.13: guarda el CONTEXTO de las palabras marcadas (la oración actual).
// Compatibilidad hacia atrás: palabras viejas sin contexto → el popup las
// muestra sin ejemplo, sin romperse. Tope de 600 entradas (borra las viejas).
const WORD_CTX_MAX = 600;
function rememberWordContext(words, s) {
    if (!words || !words.length || !s) return;
    const zhS = String(s.chinese_simp_full || '');
    const zhT = String(s.chinese_trad_full || zhS);
    const esS = String(s.spanish_full || '');
    let changed = false;
    (Array.isArray(words) ? words : [words]).forEach(w => {
        if (!w) return;
        const cur = state.wordContexts[w];
        if (cur && cur.zh === zhS && cur.zt === zhT && cur.es === esS) return; // ya está
        state.wordContexts[w] = {
            zh: zhS,
            zt: zhT,
            es: esS,
            py: isZhText(w) ? (wordPinyin(w) || (cur ? cur.py : '')) : ''
        };
        changed = true;
    });
    if (changed) {
        const keys = Object.keys(state.wordContexts);
        if (keys.length > WORD_CTX_MAX) {
            keys.slice(0, keys.length - WORD_CTX_MAX).forEach(k => delete state.wordContexts[k]);
        }
        saveProgress();
    }
}

// ===== Helpers =====
function ck() {
    return state.charType === 'trad' ? 'trad' : 'simp';
}

/**
 * Detecta el tono de una sílaba pinyin y devuelve la clase CSS correspondiente
 */
function getToneClass(syllable) {
    if (!syllable) return 'tone-0';
    const py = syllable.toLowerCase();
    if (/[āēīōūǖ]/.test(py)) return 'tone-1';
    if (/[áéíóúǘ]/.test(py)) return 'tone-2';
    if (/[ǎěǐǒǔǚ]/.test(py)) return 'tone-3';
    if (/[àèìòùǜ]/.test(py)) return 'tone-4';
    return 'tone-0';
}

// ===== v9.15: PRÁCTICA INTERCALADA (interleaving) =====
// PRNG determinista (mulberry32): misma semilla → misma secuencia. Permite
// persistir la semilla junto al progreso y reproducir el orden mezclado al
// recargar la página (el currentIndex guardado sigue apuntando a la misma
// frase). Cada setModule siembra una semilla nueva → orden fresco al
// re-entrar a un módulo.
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Fisher-Yates sembrado. Devuelve una COPIA mezclada (no muta el original).
function seededShuffle(arr, seed) {
    const out = arr.slice();
    const rnd = mulberry32(seed || 1);
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        const tmp = out[i]; out[i] = out[j]; out[j] = tmp;
    }
    return out;
}

function newInterleaveSeed() {
    state.interleaveSeed = (Math.random() * 0x7fffffff) | 0;
}

// v9.15: misma lista que siempre (lógica original intacta), pero si el modo
// intercalado está activo devuelve el pool MEZCLADO. Todos los consumidores
// (render, verificar, revelar, marcar, navegar, audio) leen la MISMA lista
// vía filtered[state.currentIndex], así que el orden es consistente.
// El cache evita re-mezclar en cada llamada (getFiltered se consulta ~10×
// por interacción) y se invalida cuando cambian módulo, datos (loadSentences
// pone _shufCache = null), semilla o largo. El SRS / Repaso inteligente NO
// pasa por acá: tiene mazo y popup propios (IIFE srsInit).
function getFiltered() {
    const base = state.activeModule === 'todas'
        ? state.sentences
        : state.sentences.filter(s => s.module === state.activeModule);
    if (!state.interleaving) return base;
    const c = state._shufCache;
    if (c && c.mod === state.activeModule && c.seed === state.interleaveSeed &&
        c.src === state.sentences && c.n === base.length) {
        return c.data;
    }
    // v9.63: interleaving real en una situación puntual de Diaria — se suma
    // una fracción chica (DAILY_INTERLEAVE_RATIO) de OTRAS situaciones al
    // lote antes de mezclar. Los ítems traídos son COPIAS ({..s}) con
    // _mixedFrom marcado (para el chip 🔀 de origen en la tarjeta): nunca se
    // muta el array compartido EMBEDDED_MODULE_DATA['todas']. Fuera de
    // Diaria (HSK/TOCFL/DELE/Clásicos, cada uno con su propio array) el
    // comportamiento es exactamente el de antes: solo reordena base.
    let pool = base;
    const isDailyPick = state.activeModule !== 'todas' && DAILY_MODULES.indexOf(state.activeModule) !== -1;
    if (isDailyPick && base.length) {
        const others = state.sentences.filter(s => s.module !== state.activeModule && DAILY_MODULES.indexOf(s.module) !== -1);
        if (others.length) {
            const mixN = Math.max(1, Math.round(base.length * DAILY_INTERLEAVE_RATIO));
            const picked = seededShuffle(others, state.interleaveSeed ^ 0x9e3779b9).slice(0, mixN)
                .map(s => Object.assign({}, s, { _mixedFrom: s.module }));
            pool = base.concat(picked);
        }
    }
    const data = seededShuffle(pool, state.interleaveSeed);
    state._shufCache = { mod: state.activeModule, seed: state.interleaveSeed, src: state.sentences, n: base.length, data: data };
    return data;
}

// ===== Init =====
/* v9.9 I18N-BEGIN — UX Español-First: internacionalización ligera.
   'es-cn' = alumno hispanohablante (interfaz en español, por defecto).
   'cn-es' = alumno sinohablante (interfaz en chino) → DELE visible,
   herramientas de pinyin/tonos ocultas, HSK/TOCFL ocultos. */
const UI_STRINGS = {
  'es-cn': {
    appTitle: 'Huayu Diario',
    appSlogan: 'Vive el idioma, una frase al día - 日常華語',
    langSwitchBtn: '🇨🇳 Chino · cambiar a Español',
    langSwitchTitle: 'Ahora estás aprendiendo chino. Tocá para pasar a “Aprendo Español” (interfaz en chino)',
    tabDaily: '📚 Diaria', tabExams: '🎓 Exámenes', tabLessons: '📖 Lecciones', tabClassics: '📜 Clásicos',
    dailyTitle: '📚 PRÁCTICA DIARIA', dailyCurrent: 'Práctica Diaria',
    examsTitle: '🎓 EXÁMENES INTERNACIONALES',
    lessonsTitle: '📖 LECCIONES GRADUADAS', classicsTitle: '📜 CLÁSICOS ANTIGUOS',
    srsIdle: 'Repaso inteligente', srsDue: 'Repaso del día', srsOk: 'Repaso · todo al día',
    inputPlaceholder: 'Escribe la palabra faltante...',
    btnCheck: 'Verificar', btnReveal: 'No la sé, mostrar respuesta', btnKnow: 'Fácil', btnRepeat: 'Otra vez', btnGood: 'Bien', btnPrev: '‹ Anterior',
    // v10 UX: navegación, vistas, sesión, pistas
    navHoy: 'Hoy', navAprender: 'Aprender', navEntrenar: 'Entrenar', navYo: 'Yo',
    viewAprender: 'Aprender', viewAprenderSub: 'Elegí qué aprender. Al elegir un módulo volvés a Hoy.',
    viewEntrenar: 'Entrenar', viewEntrenarSub: 'Ejercicios sueltos para el oído, la voz y la mano.',
    viewYo: 'Yo', viewYoSub: 'Tu progreso, tu repaso y los ajustes de la app.',
    yoProgress: '📈 Progreso', yoSettings: '⚙️ Ajustes',
    setMode: 'Estoy aprendiendo', setTheme: 'Tema', setAudio: 'Audio', setSession: 'Meta diaria', setData: 'Datos',
    sessionLabel: 'Sesión de hoy', sessionDoneTitle: '¡Sesión completa!', sessionDoneText: 'Practicaste {n} frases hoy.',
    sessionStreak: 'Racha: {n} días 🔥', sessionMore: '{n} más', sessionClose: 'Listo por hoy',
    sessionQuality: '{a} bien, {r} para repasar', // v9.62: calidad de la sesión (Gagné 8)
    lastSession: 'La vez pasada practicaste {n} oraciones.', // v9.62: activa conocimiento previo (Gagné 3)
    srsEmpty: 'Empezá a practicar y armo tu repaso', srsDueN: '{n} para repasar hoy',
    srsRelearn: '{n} para repetir en esta sesión', srsOkNew: 'Repaso al día · volvé mañana',
    gradeNoReturn: 'no vuelve', gradeTomorrow: 'mañana', // v9.38: subtítulos diferenciados Bien/Fácil
    ttsDown: '⚠️ Servidor de voz no disponible — estoy usando la voz del sistema (suena más robótica). Revisá api/tts.py en Vercel.', // v9.41: el fallback deja de ser silencioso
    hintTone: 'Casi: revisá el tono.', hintHomophone: 'El sonido está bien, el carácter no.',
    hintPinyinOk: 'El pinyin está bien: ahora escribilo en caracteres.',
    hintAccent: 'Casi: revisá los acentos.', hintOneChar: 'Un carácter no coincide:', hintOneLetter: 'Una letra no coincide:',
    hintGeneric: 'No es esa. Probá de nuevo o tocá “No la sé”.',
    diffYou: 'Escribiste', diffAns: 'Respuesta',
    readLesson: '📖 Leer lección',
    recordHint: '👆 Tocá 🎤 para grabar tu pronunciación',
    recMy: '▶️ Escuchar mi grabación', recRef: '🔊 Referencia', recAgain: '🔁 Grabar de nuevo',
    statsKnown: '✅ Conocidas: ', statsNew: '🎖️ Nuevas: ',
    vocabTitle: '📚 Palabras aprendidas',
    vocabHint: 'Se guardan automáticamente al cerrar el navegador · tocá una palabra para ver su traducción',
    readerTitle: '🗣️ Lector de texto',
    readerPlaceholder: 'Pegá acá texto en chino 你好 o en español... y lo leo en voz alta con la voz elegida',
    libraryOpt: '📚 Biblioteca de lecturas…', libraryLoad: 'Cargar',
    readerClear: '🗑️ Limpiar', readerPlay: '🔊 Leer',
    btnReset: '🗑️ Borrar progreso', installApp: '📲 Instalar app',
    // v9.14: exámenes reordenados + guardar progreso + fuente de estudio
    placementTest: '🎯 Test de colocación — descubrí tu nivel',
    saveProgress: '💾 Guardar progreso', savedOk: '✅ Progreso guardado en este dispositivo',
    fontButtonTitle: 'Cambiar fuente china: por defecto ↔ 楷体 (caligrafía)',
    // v9.15: práctica intercalada
    interleave: '🔀 Intercalar',
    interleaveOn: '🔀 Intercalando',
    interleaveTitle: 'Práctica intercalada: mezcla el orden de las frases del módulo activo; en una situación de Diaria además suma algunas de otras situaciones (apagado = orden original)',
    interOn: '🔀 Práctica intercalada: orden mezclado',
    interOff: '📚 Orden original del módulo',
    toolsGearTitle: 'Herramientas de estudio: 简/繁 · pinyin · tonos · velocidad · voces…',
    needAnswer: 'Escribe una respuesta antes de verificar.',
    correctWord: '✅ ¡Correcto! ', validWrong: '❌ Respuestas válidas: ', validReveal: '💡 Respuestas válidas: ',
    lvlClassic: '📜 Clásico', lvlPre: 'Nivel ', lvlSuf: '', lvlVocabSuf: ' · vocabulario',
    // v9.47: contador de intentos por tarjeta (chip 🎯)
    attChip: '🎯 {n}', attTitle: 'Esta tarjeta: {n} prácticas · {ok} correctas · {ft} al primer intento',
    mixedChip: '🔀 {mod}', mixedTitle: 'Intercalada de otra situación de Práctica Diaria ({mod}) para mezclar temas — así se recuerda mejor que practicando uno solo seguido',
    // v9.48: tolerancia de trazos (leniency manual en Ajustes)
    setStrokes: 'Tolerancia de trazos',
    lenStrict: '🎯 Estricta', lenNormal: '⚖️ Normal', lenLenient: '🫧 Permisiva',
    lenTitle: 'Cuánto puede desviarse un trazo dibujado y contar como bien. Estricta te exige más; Permisiva perdona más. Se aplica desde el próximo carácter que practiques.'
  },
  'cn-es': {
    appTitle: '日常華語',
    appSlogan: '每天一句，活学活用',
    langSwitchBtn: '🇪🇸 西班牙语 · 改学中文',
    langSwitchTitle: '你现在在学西班牙语。点击切换回“学中文”（界面为西班牙语）',
    tabDaily: '📚 每日', tabExams: '🎓 考试', tabLessons: '📖 课文', tabClassics: '📜 古文',
    dailyTitle: '📚 每日练习', dailyCurrent: '每日练习',
    examsTitle: '🎓 国际考试',
    lessonsTitle: '📖 分级课文', classicsTitle: '📜 古代经典',
    srsIdle: '智能复习', srsDue: '今日复习', srsOk: '复习 · 全部完成',
    inputPlaceholder: '请输入缺少的词语…',
    btnCheck: '检查', btnReveal: '不会，显示答案', btnKnow: '简单', btnRepeat: '再来', btnGood: '记得', btnPrev: '‹ 上一句',
    navHoy: '今天', navAprender: '学习', navEntrenar: '训练', navYo: '我',
    viewAprender: '学习', viewAprenderSub: '选择要学什么。选好模块后回到“今天”。',
    viewEntrenar: '训练', viewEntrenarSub: '听力、发音和书写的单项练习。',
    viewYo: '我', viewYoSub: '你的进度、复习和应用设置。',
    yoProgress: '📈 进度', yoSettings: '⚙️ 设置',
    setMode: '我在学', setTheme: '主题', setAudio: '语音', setSession: '每日目标', setData: '数据',
    sessionLabel: '今日练习', sessionDoneTitle: '今日练习完成！', sessionDoneText: '今天练了 {n} 句。',
    sessionStreak: '连续 {n} 天 🔥', sessionMore: '再来 {n} 句', sessionClose: '今天到此为止',
    sessionQuality: '答对 {a} 句，待复习 {r} 句',
    lastSession: '上次你练习了 {n} 句。',
    srsEmpty: '开始练习，我来安排复习', srsDueN: '今天要复习 {n} 张',
    srsRelearn: '本次还要重练 {n} 张', srsOkNew: '复习完成 · 明天再来',
    gradeNoReturn: '不再出现', gradeTomorrow: '明天', // v9.38: 中文副标题
    ttsDown: '⚠️ 语音服务器不可用——暂时使用系统语音（比较机械）。请检查 Vercel 上的 api/tts.py。', // v9.41: 备用语音不再悄无声息
    hintTone: '差一点：注意声调。', hintHomophone: '读音对了，字不对。',
    hintPinyinOk: '拼音对了：请写汉字。',
    hintAccent: '差一点：注意重音符号。', hintOneChar: '有一个字不对：', hintOneLetter: '有一个字母不对：',
    hintGeneric: '不对。再试一次，或点“不会”。',
    diffYou: '你写的', diffAns: '答案',
    readLesson: '📖 阅读课文',
    recordHint: '👆 点击 🎤 录制你的发音',
    recMy: '▶️ 听我的录音', recRef: '🔊 参考音频', recAgain: '🔁 重新录音',
    statsKnown: '✅ 已掌握：', statsNew: '🎖️ 新词：',
    vocabTitle: '📚 已学词语',
    vocabHint: '关闭浏览器时自动保存 · 点击词语查看翻译',
    readerTitle: '🗣️ 文本朗读',
    readerPlaceholder: '在此粘贴中文或西班牙语文本…我会用所选语音朗读',
    libraryOpt: '📚 朗读文库…', libraryLoad: '载入',
    readerClear: '🗑️ 清空', readerPlay: '🔊 朗读',
    btnReset: '🗑️ 清除学习记录', installApp: '📲 安装应用',
    // v9.14: exámenes reordenados + guardar progreso + fuente de estudio
    placementTest: '🎯 分级测试 —— 测测你的水平',
    saveProgress: '💾 保存进度', savedOk: '✅ 进度已保存在本设备',
    fontButtonTitle: '切换中文字体：默认 ↔ 楷体（书法风格）',
    // v9.15: práctica intercalada
    interleave: '🔀 交错练习',
    interleaveOn: '🔀 交错中',
    interleaveTitle: '交错练习：打乱当前模块句子的顺序；在"日常练习"的某个场景里还会混入其他场景的句子（关闭 = 原始顺序）',
    interOn: '🔀 交错模式 · 顺序已打乱',
    interOff: '📚 原始顺序',
    toolsGearTitle: '学习工具：简/繁 · 拼音 · 声调 · 语速 · 语音…',
    needAnswer: '请先输入答案再检查。',
    correctWord: '✅ 答对！', validWrong: '❌ 有效答案：', validReveal: '💡 有效答案：',
    lvlClassic: '📜 古文', lvlPre: '第', lvlSuf: '級', lvlVocabSuf: ' · 詞彙',
    // v9.47: contador de intentos por tarjeta (chip 🎯)
    attChip: '🎯 {n}次', attTitle: '这张卡：练过 {n} 次 · 答对 {ok} 次 · 首次就答对 {ft} 次',
    mixedChip: '🔀 {mod}', mixedTitle: '穿插自「日常练习」的另一个场景（{mod}），混合练习有助于记忆——比连续练同一个场景效果更好',
    // v9.48: 笔顺容错（Ajustes 里手动设置）
    setStrokes: '笔顺容错',
    lenStrict: '🎯 严格', lenNormal: '⚖️ 标准', lenLenient: '🫧 宽容',
    lenTitle: '笔画偏差多少还算写对。严格＝要求更高；宽容＝更容易通过。从下一个字开始生效。'
  }
};

function uiT(key) {
    const pack = UI_STRINGS[(state && state.mode)] || UI_STRINGS['es-cn'];
    const v = pack[key];
    return typeof v === 'string' ? v : (UI_STRINGS['es-cn'][key] || '');
}

function updateUILanguage(mode) {
    const m = mode || (typeof state !== 'undefined' && state.mode) || 'es-cn';
    const S = UI_STRINGS[m] || UI_STRINGS['es-cn'];
    const cnMode = m === 'cn-es';

    // 1) Textos estáticos marcados con data-i18n en index.html
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const k = el.getAttribute('data-i18n');
        if (S[k] !== undefined) el.textContent = S[k];
    });

    // 2) Placeholders / títulos puntuales (atributos, no textContent)
    const set = (id, prop, val) => { const el = document.getElementById(id); if (el) el[prop] = val; };
    set('btn-toggle-lang-mode', 'textContent', S.langSwitchBtn);
    set('btn-toggle-lang-mode', 'title', S.langSwitchTitle);
    set('answer-input', 'placeholder', S.inputPlaceholder);
    set('reader-input', 'placeholder', S.readerPlaceholder);
    if (typeof window.acSrsRefreshBar === 'function') window.acSrsRefreshBar(); // v10: estados concretos
    set('btn-tools-toggle', 'title', S.toolsGearTitle); // v9.10: engranaje de herramientas
    set('btn-font-mode', 'title', S.fontButtonTitle);   // v9.14: fuente de estudio
    set('btn-interleaving', 'title', S.interleaveTitle); // v9.15: práctica intercalada

    // 3) Textos que app.js escribe dinámicamente → refrescarlos con uiT()
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateDailyBtnLabel === 'function') updateDailyBtnLabel();
    if (typeof applyInterleaveUI === 'function') applyInterleaveUI(); // v9.15: re-etiquetar según idioma
    if (typeof applyListenUI === 'function') applyListenUI(); // v9.19: re-etiquetar solo oído
    if (typeof applyLeniencyUI === 'function') applyLeniencyUI(); // v9.48: re-etiquetar tolerancia de trazos

    // 4) Lógica condicional estricta: exámenes según el sentido del estudio
    const show = (id, yes) => { const el = document.getElementById(id); if (el) el.classList.toggle('hidden-force', !yes); };
    show('dele-dropdown', cnMode);        // DELE solo aprendiendo ESPAÑOL
    show('tocfl-dropdown', !cnMode);      // TOCFL solo aprendiendo chino
    show('hsk-selector', !cnMode);        // selector de nivel HSK ídem
    show('btn-placement', !cnMode);       // test de colocación HSK (exámenes)
    show('btn-placement-daily', !cnMode); // test de colocación (diaria)

    // 5) Herramientas del alfabeto: pinyin/tonos solo al aprender chino.
    //    (简/繁 SIGUE visible: el público TW/HK prefiere 繁體 también en cn-es)
    // v9.19: el modo "solo oído" también es exclusivo de Aprendo Chino
    // v9.28: ídem los pares mínimos — discriminación tonal del CHINO con
    //    glosas en español: para el alumno cn-es no pintan nada.
    ['btn-pinyin', 'btn-tones', 'btn-tone-info', 'btn-listen', 'btn-mp-pairs'].forEach((id) => show(id, !cnMode));

    // 6) v9.11: UN solo botón de audio — siempre el idioma que se aprende.
    //    Aprendiendo chino (es-cn): 🔊 CN suena la oración china; 🔊 ES oculto.
    //    Aprendiendo español (cn-es): 🔊 ES suena la oración española; 🔊 CN oculto.
    //    (playAudio('es'/'cn') ya elige el texto correcto por idioma.)
    show('btn-play-es', cnMode);
    show('btn-play-cn', !cnMode);
}
/* v9.9 I18N-END */

document.addEventListener('DOMContentLoaded', async () => {
    loadProgress();
    applyToneScheme(); // v7.11: restaurar esquema de tonos guardado (respeta dark ya aplicado)
    await loadSentences();
    setupEventListeners();
    buildReaderLibrary(); // v7.15: poblar la Biblioteca de Lecturas (lessons.js)
    applySavedUI();
    applyFontMode(); // v9.14: restaurar fuente de estudio 默认/楷体 guardada
    updateUILanguage(); // v9.9: idioma de UI + condicional DELE/herramientas
    // v7.8 (spec v4.0): sincronizar el MODO con el evaluador de voz lo
    // antes posible. No bloquea el render: si tarda, la evaluación de
    // voz espera la transición antes de analizar (VE._setModePromise).
    if (window.VE && typeof window.VE.setMode === 'function') {
        window.VE.setMode(state.mode).catch((e) =>
            console.warn('[app] VE.setMode inicial falló:', (e && e.message) || e));
    }
    renderCurrentSentence();
    updateStats();
    updateVocabularyPanel();
    renderLastSessionNote(); // v9.62: Gagné evento 3 — "la vez pasada..." en Hoy
    state._uiReady = true; // v10 UX: a partir de acá, elegir módulo vuelve a Hoy

    // ===== v9.46: WARMUP del motor de voz (evaluación más rápida) =====
    // Antes: el modelo Whisper se terminaba de cargar DENTRO del primer
    // «Analizando…» (la descarga arrancaba recién al tocar 🎤 y una
    // grabación corta no le alcanzaba). Ahora: ~6 s después de abrir la
    // app, en idle, se precarga el motor + UNA inferencia dummy calienta
    // JIT/ONNX → el primer "evaluar" arranca ya caliente. Idempotente y
    // silencioso: si falla (sin red, navegador raro) no molesta en nada.
    setTimeout(function () {
        try {
            if (window.VE && typeof window.VE.warmup === 'function') {
                window.VE.warmup();
            }
        } catch (e) { /* el warmup jamás rompe el arranque */ }
    }, 6000); // ms — mismo valor que VE_CONFIG.warmupMs (voice-evaluator.js)
});

function applySavedUI() {
    const btnEsCn = document.getElementById('btn-es-cn');
    if (btnEsCn) btnEsCn.classList.toggle('active', state.mode === 'es-cn');

    const btnCnEs = document.getElementById('btn-cn-es');
    if (btnCnEs) btnCnEs.classList.toggle('active', state.mode === 'cn-es');

    applyGrand(); // v9.3: restaurar modo abuelo (letras grandes)
    applyInterleaveUI(); // v9.15: restaurar estado del toggle intercalado
    applyListenUI(); // v9.19: restaurar estado del toggle solo oído

        // Actualizar estado visual de botones simp/trad
    const btnSimp = document.getElementById('btn-simplified');
    const btnTrad = document.getElementById('btn-traditional');

    if (btnSimp) {
        btnSimp.classList.toggle('active', state.charType === 'simp');
        btnSimp.innerHTML = state.charType === 'simp' ? '<b>简</b> 简体' : '简 简体';
    }

    if (btnTrad) {
        btnTrad.classList.toggle('active', state.charType === 'trad');
        btnTrad.innerHTML = state.charType === 'trad' ? '<b>繁</b> 繁體' : '繁 繁體';
    }
    // Actualizar botones diarios, de exámenes Y clásicos
    const cats = document.querySelectorAll('.cat-btn, .btn-exam');
    cats.forEach(b => {
        b.classList.toggle('active', b.dataset.module === state.activeModule);
    });
    updateDailyBtnLabel();
    updateClassicsBtnLabel();
    updateDeleBtnLabel();
    updateTocflBtnLabel(); // v8.2
    updateClassicsScript();

    const pinyinBtn = document.getElementById('btn-pinyin');
    if (pinyinBtn) {
        pinyinBtn.textContent = state.showPinyin ? '📖 Pinyin: ON' : '📖 Pinyin: OFF';
        pinyinBtn.classList.toggle('active', state.showPinyin);
    }

    const btnSpeed = document.getElementById('btn-speed');
    if (btnSpeed) {
        btnSpeed.textContent = SPEED_LABELS[String(playbackSpeed)];
        btnSpeed.title = 'Velocidad del audio: ' + playbackSpeed + 'x (clic para cambiar)';
    }

    // Botones de voz (v9.49: bandera dentro del icono — 🇨🇳/🇹🇼 y 🇦🇷/🇪🇸)
    const btnVoiceZh = document.getElementById('btn-voice-zh');
    if (btnVoiceZh) {
        btnVoiceZh.textContent = VOICE_ICONS_ZH[voiceZh] || ('🇨🇳 ' + voiceZh);
        btnVoiceZh.title = 'Voz china: ' + (VOICE_NAMES[voiceZh] || voiceZh) + ' (clic para cambiar)';
    }
    const btnVoiceEs = document.getElementById('btn-voice-es');
    if (btnVoiceEs) {
        btnVoiceEs.textContent = VOICE_ICONS_ES[voiceEs] || ('🇪🇸 ' + voiceEs);
        btnVoiceEs.title = 'Voz española: ' + (VOICE_NAMES[voiceEs] || voiceEs) + ' (clic para cambiar)';
    }

    // Actualizar botón de tonos (SIEMPRE visible)
    const btnTones = document.getElementById('btn-tones');
    if (btnTones) {
        btnTones.textContent = showToneColors ? '🎨 Tonos: ON' : '🎨 Tonos: OFF';
        btnTones.classList.toggle('active', showToneColors);
        btnTones.classList.remove('hidden'); // ← Siempre visible
    }
}

// ===== Carga de datos =====
async function loadSentences() {
    const label = moduleLabel(state.activeModule);
    moduleStatus('⏳ Cargando ' + label + '...');
    let data = null;
    // 1) Datos incluidos en la app: funcionan sin carpeta data/, sin red y offline
    if (typeof EMBEDDED_MODULE_DATA !== 'undefined' && EMBEDDED_MODULE_DATA[state.activeModule]) {
        let included = EMBEDDED_MODULE_DATA[state.activeModule];
        // v7.19: HSK 3.0 viaja como tuplas compactas → expandir a tarjetas (memoizado)
        if (included.length && Array.isArray(included[0])) {
            included = expandWordCards(state.activeModule, included);
        }
        data = included;
        // v8.2: los módulos de vocabulario TOCFL también cuentan en palabras
        const isWordModule = state.activeModule.startsWith('HSK') || state.activeModule.startsWith('TOCFL-');
        const unit = isWordModule ? 'palabras' : 'oraciones';
        console.log('✅ ' + data.length + ' ' + unit + ' cargadas (datos incluidos en la app)');
    } else {
        // 2) Respaldo: archivo externo data/ (solo si el módulo no viene incluido, ej. HSK6)
        try {
            const sourceFile = DATA_SOURCES[state.activeModule] || DATA_SOURCES['todas'];
            const r = await fetch(sourceFile);
            if (r.ok) {
                const d = await r.json();
                data = Array.isArray(d) ? d : (d.sentences || []);
                console.log('✅ ' + data.length + ' oraciones cargadas desde: ' + sourceFile);
            }
        } catch (e) { console.warn('⚠️ Sin datos externos para ' + label + ':', e.message); }
    }
    state.sentences = Array.isArray(data) ? data : [];
    state._shufCache = null; // v9.15: datos nuevos → invalidar el orden mezclado
    indexSentencesForVocab(state.sentences); // amplía el diccionario de traducciones
    if (state.sentences.length) {
        // v8.2: los módulos de vocabulario TOCFL también cuentan en palabras
        const isWordModule = state.activeModule.startsWith('HSK') || state.activeModule.startsWith('TOCFL-');
        const unit = isWordModule ? 'palabras' : 'oraciones';
        moduleStatus('📚 ' + label + ' · ' + state.sentences.length + ' ' + unit + ' disponibles');
    } else if (state.activeModule === 'HSK6') {
        moduleStatus('⚠ El módulo ' + label + ' todavía no tiene oraciones.', true);
    } else {
        moduleStatus('⚠ El módulo ' + label + ' no tiene oraciones.', true);
    }
}

// ===== v9.14: FUENTE DE ESTUDIO (por defecto ↔ KaiTi 楷体) =====
// Preferencia persistente 'ac_font_mode' ('default' | 'kaiti'). El prefijo
// ac_ hace que el respaldo (backupCollect) la incluya automáticamente.
// Solo cambia la tipografía del texto chino de ESTUDIO (frase de práctica,
// lecciones, clásicos, lector); la interfaz sigue con la fuente del sistema.
let fontMode = 'default';
try { fontMode = localStorage.getItem('ac_font_mode') || 'default'; } catch (e) { }

function applyFontMode() {
    document.body.classList.toggle('font-kaiti', fontMode === 'kaiti');
    const label = fontMode === 'kaiti' ? '楷体' : '默认';
    const btn = document.getElementById('btn-font-mode');
    if (btn) btn.textContent = label;
}

function toggleFontMode() {
    fontMode = fontMode === 'kaiti' ? 'default' : 'kaiti';
    try { localStorage.setItem('ac_font_mode', fontMode); } catch (e) { }
    applyFontMode();
    moduleStatus(fontMode === 'kaiti' ? '✍️ 楷体 KaiTi · fuente de caligrafía' : '✍️ Fuente por defecto · 默认字体', false);
}

// ===== v9.15: PRÁCTICA INTERCALADA — toggle del panel de herramientas =====
// ON: mezcla el orden del módulo activo (discriminación activa, práctica
// fuera de contexto). OFF: orden original (narrativa de los mini-dramas,
// orden correlativo del nivel). Al alternar se siembra una semilla nueva,
// se reinicia a la primera tarjeta y se re-renderiza. Las LECCIONES
// graduadas y los lectores no pasan por getFiltered(): quedan intactos.
// El SRS (Repaso inteligente) tampoco: tiene mazo y popup propios.
function applyInterleaveUI() {
    const btn = document.getElementById('btn-interleaving');
    if (!btn) return;
    btn.classList.toggle('active', state.interleaving);
    btn.textContent = state.interleaving ? uiT('interleaveOn') : uiT('interleave');
}

function toggleInterleaving() {
    state.interleaving = !state.interleaving;
    if (state.interleaving) newInterleaveSeed(); // orden nuevo al activar
    state._shufCache = null;
    state.currentIndex = 0;      // arrancar desde el inicio del nuevo orden
    state.translationRevealed = false;
    saveProgress();
    applyInterleaveUI();
    renderCurrentSentence();
    updateStats();
    moduleStatus(state.interleaving ? uiT('interOn') : uiT('interOff'), false);
}

// ===== v9.19 — SOLO OÍDO: escucha antes que lectura (solo es-cn) =====
// El flujo clásico muestra el texto y el audio es opcional. Acá es al revés:
// el audio SUENA SOLO al entrar a la tarjeta, el texto queda tapado y el
// alumno elige entre opciones la palabra que falta (o el significado de la
// palabra que oyó, en tarjetas de vocabulario) ANTES de ver los caracteres.
// Entrena comprensión auditiva real en vez de lectura con apoyo sonoro.
// - Reutiliza fetchTTS() vía playAudio('zh') y TODA la corrección de
//   checkAnswer() (normalización, knownWords, mazo SRS): al elegir una
//   opción se llena el input y se llama checkAnswer() tal cual.
// - Opciones: la respuesta correcta + hasta 3 distractores del POOL ACTIVO
//   (mismo módulo y longitud parecida primero). Sin distractores la tarjeta
//   cae a la vista clásica (mazos muy chicos).
// - Toggle en el panel ⚙, apagado por defecto, persistido (ac_storage).
//   Solo existe aprendiendo chino (es-cn); el cloze de siempre queda intacto.
function applyListenUI() {
    const btn = document.getElementById('btn-listen');
    if (!btn) return;
    btn.classList.toggle('active', state.listenFirst);
    btn.setAttribute('aria-pressed', state.listenFirst ? 'true' : 'false');
    const sub = btn.querySelector('.tc-sub');
    if (sub) sub.textContent = state.listenFirst
        ? 'Activado: en Hoy la frase suena antes de verse'
        : 'La frase suena antes de verse (modo de la tarjeta)';
    else btn.textContent = state.listenFirst ? '🎧 Solo oído ✓' : '🎧 Solo oído';
}

function toggleListenFirst() {
    state.listenFirst = !state.listenFirst;
    saveProgress();
    applyListenUI();
    renderCurrentSentence();
    moduleStatus(state.listenFirst
        ? '🎧 Solo oído: el audio suena primero, el texto aparece al responder'
        : '🎧 Solo oído: apagado — texto a la vista con audio opcional', false);
}

// Opciones de escucha (FUNCIÓN PURA, testeable en sandbox):
// devuelve [{val, ok}] mezcladas, la correcta incluida. null → no se pudo.
// s: tarjeta actual · pool: getFiltered() · k: 'simp'|'trad'
function listenOptions(s, pool, k) {
    try {
        if (!s) return null;
        const isWord = !!s.w; // es-cn palabra → opciones en español; oración → en chino
        const correct = isWord
            ? String(s.spanish_answer || '').trim()
            : String(s['chinese_' + k + '_answer'] || '').trim();
        if (!correct) return null;
        const normZh = (t) => String(t == null ? '' : t).normalize('NFC')
            .replace(/[\s\u00A0\u3000]+/g, '')
            .replace(/[。，、！？：；「」『』《》（）〈〉·…―—–\-.!?;:,"'“”‘’()\[\]{}]/g, '');
        const normEs = (t) => String(t == null ? '' : t).normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').toLowerCase()
            .replace(/^[¿¡"'“”(\[\s]+/, '').replace(/[.!?,;:)"“”'\]\s]+$/g, '')
            .replace(/\s+/g, ' ').trim();
        const norm = isWord ? normEs : normZh;
        // respuestas válidas de ESTA tarjeta → jamás valen como distractores
        // (así un sinónimo aceptado nunca se presenta como opción trampa)
        const valid = new Set([norm(correct)]);
        if (isWord) {
            const alts = s.spanish_alternatives;
            (Array.isArray(alts) ? alts : String(alts || '').split('|')).forEach(a => {
                const n = normEs(a); if (n) valid.add(n);
            });
        } else {
            ['simp', 'trad'].forEach(sc => {
                const n = normZh(s['chinese_' + sc + '_answer']); if (n) valid.add(n);
            });
        }
        const cand = [];
        (Array.isArray(pool) ? pool : []).forEach(o => {
            if (!o || o === s) return;
            if (!!o.w !== isWord) return; // mismo tipo de tarjeta
            const c = isWord
                ? String(o.spanish_answer || '').trim()
                : String(o['chinese_' + k + '_answer'] || '').trim();
            if (!c) return;
            const n = norm(c);
            if (!n || valid.has(n)) return;
            cand.push({ val: c, n: n, same: o.module === s.module,
                        dl: Math.abs(String(c).length - String(correct).length) });
        });
        if (!cand.length) return null; // sin distractores → tarjeta clásica
        // mismos módulos y longitud parecida primero; de los 8 finalistas, 3 al azar
        cand.sort((a, b) => ((b.same ? 1 : 0) - (a.same ? 1 : 0)) || (a.dl - b.dl));
        const top = cand.slice(0, 8);
        for (let i = top.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = top[i]; top[i] = top[j]; top[j] = t;
        }
        const opts = [{ val: correct, ok: true }]
            .concat(top.slice(0, 3).map(p => ({ val: p.val, ok: false })));
        for (let i = opts.length - 1; i > 0; i--) { // la correcta, entre todas
            const j = Math.floor(Math.random() * (i + 1));
            const t = opts[i]; opts[i] = opts[j]; opts[j] = t;
        }
        return opts;
    } catch (e) { return null; }
}

// Monta (o desmonta) la caja de escucha sobre la tarjeta ya renderizada.
// Se llama al FINAL de renderCurrentSentence: en modo normal solo limpia.
function applyListenCard() {
    const cardEl = document.getElementById('sentence-card');
    if (!cardEl) return;
    const prev = document.getElementById('listen-box');
    if (prev) prev.remove();
    cardEl.classList.remove('listen-mode');
    const st = document.getElementById('sentence-text');
    const inp = document.getElementById('answer-input');
    const chk = document.getElementById('btn-check');
    if (st) st.classList.remove('hidden');
    if (inp) inp.classList.remove('hidden');
    if (chk) chk.classList.remove('hidden');
    if (!(state.mode === 'es-cn' && state.listenFirst)) return; // modo clásico
    const filtered = getFiltered();
    const s = filtered ? filtered[state.currentIndex] : null;
    if (!s) return;
    const opts = listenOptions(s, filtered, ck());
    if (!opts) return; // mazo muy chico → tarjeta clásica de siempre
    // tapar TODO lo que delata la respuesta
    cardEl.classList.add('listen-mode');
    if (st) st.classList.add('hidden');
    const py = document.getElementById('pinyin-display');
    if (py) py.classList.add('hidden');
    if (inp) inp.classList.add('hidden');
    if (chk) chk.classList.add('hidden');
    const lesson = document.getElementById('btn-read-lesson');
    if (lesson) lesson.classList.add('hidden'); // el lector mostraría la oración
    // caja de escucha al tope del contenedor de la oración
    const box = document.createElement('div');
    box.id = 'listen-box';
    box.className = 'listen-box';
    const hint = document.createElement('div');
    hint.className = 'listen-hint';
    hint.textContent = s.w ? '🎧 Escuchá la palabra y elegí su significado'
                           : '🎧 Escuchá y elegí la palabra que falta';
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'listen-play';
    play.textContent = '🔊 Escuchar';
    const optsEl = document.createElement('div');
    optsEl.className = 'listen-opts';
    opts.forEach(o => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'listen-opt';
        b.textContent = o.val;
        b.dataset.ok = o.ok ? '1' : '0';
        b.setAttribute('lang', s.w ? 'es' : 'zh');
        optsEl.appendChild(b);
    });
    box.appendChild(hint);
    box.appendChild(play);
    box.appendChild(optsEl);
    const cont = document.querySelector('#sentence-card .sentence-container') || cardEl;
    cont.insertBefore(box, cont.firstChild);
    // el audio MANDA: suena solo al entrar (si el navegador bloquea el
    // autoplay queda el botón 🔊, igual que en la tarjeta clásica)
    playAudio('zh');
}

// Elegir opción = responder: reutiliza checkAnswer() entero (normalización,
// knownWords, mazo SRS, refill) con el texto de la opción en el input.
function listenPick(optBtn) {
    if (!optBtn || state.answered) return;
    const val = String(optBtn.textContent || '').trim();
    if (!val) return;
    const box = document.getElementById('listen-box');
    if (box) {
        box.querySelectorAll('.listen-opt').forEach(b => {
            b.disabled = true;
            if (b.dataset.ok === '1') b.classList.add('listen-ok');
            else if (b === optBtn) b.classList.add('listen-bad');
        });
    }
    const st = document.getElementById('sentence-text');
    if (st) st.classList.remove('hidden'); // el texto aparece AHORA (con su hueco)
    const inp = document.getElementById('answer-input');
    if (inp) inp.value = val;
    state.attempts = 1; // v10: elegir una opción es el único intento (sin pista ni reintento)
    state._listenSingle = true; // v9.50: ese único intento SÍ cuenta como "al primer intento" en la estadística
    checkAnswer();
}

function listenReplay() { playAudio('zh'); }
// ===== fin v9.19 =====

// ===== Eventos =====
// v7.18: TABS de selectores de contenido — un solo panel visible, tab activo
// persistido. Solo mueve clases 'hidden'/'active': los dropdowns internos
// (daily/dele/classics) siguen usando su propia lógica y setModule() intactos.
function setupModuleTabs() {
    const bar = document.getElementById('module-tabs');
    if (!bar) return;
    // v9.0: + panel-lessons (Lecciones graduadas)
    const panels = { lessons: 'panel-lessons', exams: 'panel-exams', daily: 'panel-daily', classics: 'panel-classics' };
    const TAB_KEY = 'ac_tab';
    const activate = (name, save) => {
        if (!panels[name]) name = 'lessons';
        bar.querySelectorAll('.mtab').forEach(b => {
            const on = b.dataset.tab === name;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
            b.tabIndex = on ? 0 : -1; // v10 UX: roving tabindex
        });
        Object.keys(panels).forEach(k => {
            const p = document.getElementById(panels[k]);
            if (p) p.classList.toggle('hidden', k !== name);
        });
        if (save) { try { localStorage.setItem(TAB_KEY, name); } catch (e) {} }
    };
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('.mtab');
        if (b) activate(b.dataset.tab, true);
    });
    let saved = null;
    try { saved = localStorage.getItem(TAB_KEY); } catch (e) {}
    activate(saved || 'lessons', false);
}

function setupEventListeners() {
    // Función auxiliar para evitar errores si falta algún botón
    const safeAdd = (id, callback) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', callback);
    };

    // v7.18: tabs de módulos (Diaria / Exámenes / Clásicos)
    setupModuleTabs();

    // Modo ES/CN
    safeAdd('btn-es-cn', () => setMode('es-cn'));
    safeAdd('btn-cn-es', () => setMode('cn-es'));
    // v9.9: botón discreto del header (los del modo se quitaron de la tarjeta)
    safeAdd('btn-toggle-lang-mode', () => setMode(state.mode === 'es-cn' ? 'cn-es' : 'es-cn'));
    
    // Tipo de carácter (Simplificado/Tradicional)
    safeAdd('btn-simplified', () => setCharType('simp'));
    safeAdd('btn-traditional', () => setCharType('trad'));
    
    // Acciones principales
    safeAdd('btn-check', checkAnswer);
    safeAdd('btn-reveal', revealAnswer);
    // v10 UX: calificación en dos etapas (Otra vez / Bien / Fácil) + Anterior
    safeAdd('btn-know', () => gradeCard('easy'));
    safeAdd('btn-good', () => gradeCard('good'));
    safeAdd('btn-not-know', () => gradeCard('again'));
    safeAdd('btn-prev', prevSentence);
    setupAppNav();
    setupSessionUI();
    safeAdd('header-streak', () => { const b = document.getElementById('btn-stats'); if (b) b.click(); });
    safeAdd('btn-record', () => { const d = document.getElementById('record-details'); if (d) d.open = true; });
    safeAdd('btn-train-record', () => {
        showView('hoy');
        const d = document.getElementById('record-details'); if (d) d.open = true;
        const r = document.getElementById('btn-record');
        if (r) { try { r.scrollIntoView({ behavior: 'smooth', block: 'center' }); r.focus({ preventScroll: true }); } catch (e) { r.focus(); } }
    });
    // v9.67 (AUDITORIA-GAGNE-MAYER.md, evento 5): guía corta, una sola vez,
    // la primera vez que se abre Pronunciación. El <details> dispara
    // 'toggle' con CUALQUIER apertura (clic en el <summary>, o los dos
    // btn-record*/btn-train-record de arriba que asignan .open = true) —
    // un solo hook cubre las tres formas de entrar.
    (function () {
        const d = document.getElementById('record-details');
        if (!d) return;
        d.addEventListener('toggle', () => {
            if (d.open && typeof window.showFeatureTip === 'function') {
                window.showFeatureTip('pronunciacion', '🎤', 'Pronunciación', [
                    'Tocá 🎤, grabá la oración en voz alta y soltá para terminar.',
                    'Vas a ver tu grabación comparada con la referencia — así identificás qué tono o sonido ajustar.'
                ]);
            }
        });
    })();
    safeAdd('btn-train-write', () => {
        showView('hoy');
        const h = document.getElementById('btn-handwrite');
        if (h && !h.classList.contains('hidden')) h.click(); else focusAnswerInput();
    });
    safeAdd('btn-read-lesson', readCurrentLesson); // v7.14: leer lección completa
    safeAdd('btn-library-load', loadLibraryLesson); // v7.15: Biblioteca de Lecturas
    safeAdd('btn-reset', resetProgress);
    safeAdd('btn-pinyin', togglePinyin);
    safeAdd('btn-tones', toggleToneColors);

    // v9.14: fuente de estudio (默认/楷体) + Guardar progreso del pie
    safeAdd('btn-font-mode', toggleFontMode);
    safeAdd('btn-interleaving', toggleInterleaving); // v9.15: práctica intercalada
    safeAdd('btn-listen', toggleListenFirst); // v9.19: solo oído (escucha antes que lectura)
    safeAdd('btn-save-progress', () => {
        saveProgress();
        moduleStatus(uiT('savedOk'), false);
        // confirmación junto al dedo: el propio botón lo dice 1.8 s
        const b = document.getElementById('btn-save-progress');
        if (b && !b.dataset.busy) {
            b.dataset.busy = '1';
            const prev = b.textContent;
            b.textContent = uiT('savedOk');
            setTimeout(() => { b.textContent = prev; delete b.dataset.busy; }, 1800);
        }
    });

    // ── v7.11: leyenda de tonos + esquema de colores ──
    safeAdd('btn-tone-info', showToneLegend);
    safeAdd('btn-tone-legend-close', hideToneLegend);
    // Cambio de esquema (radios estáticos → listener directo con 'change')
    document.querySelectorAll('input[name="tone-scheme"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.toneScheme = e.target.value;
            const customDiv = document.getElementById('tone-custom-colors');
            if (customDiv) customDiv.classList.toggle('hidden', state.toneScheme !== 'custom');
            if (state.toneScheme === 'custom' && !state.toneCustomColors) {
                // Sembrar el custom con el look actual (TONE_CUSTOM_DEFAULT)
                state.toneCustomColors = {};
                for (let n = 1; n <= 5; n++) {
                    state.toneCustomColors[String(n)] = TONE_CUSTOM_DEFAULT[String(n)];
                    const inp = document.getElementById('tc-' + n);
                    if (inp) inp.value = TONE_CUSTOM_DEFAULT[String(n)];
                }
            }
            applyToneScheme();
            saveProgress();
        });
    });
    // Colores personalizados: SOLO 'input' (actualización en vivo).
    // ⚠ No usar safeAdd (click) acá: dispararía doble con 'input'.
    for (let n = 1; n <= 5; n++) {
        const inp = document.getElementById('tc-' + n);
        if (inp) inp.addEventListener('input', (e) => {
            if (!state.toneCustomColors) state.toneCustomColors = {};
            state.toneCustomColors[String(n)] = e.target.value;
            applyToneScheme();
            saveProgress();
        });
    }
    // "No mostrar esta leyenda al activar los tonos"
    const chkLegend = document.getElementById('chk-tone-legend-once');
    if (chkLegend) chkLegend.addEventListener('change', (e) => {
        state.toneLegendSeen = !!e.target.checked;
        saveProgress();
    });
    // Clic fuera cierra el popup (mismo patrón que #vocab-pop). Los botones
    // que lo ABREN (🎨 Tonos y ℹ️) no deben cerrarlo con el mismo clic, y
    // 🌙 tema tampoco: sirven para previsualizar el esquema en ambos modos.
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('tone-legend-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        if (pop.contains(e.target)) return;
        if (e.target.closest && (e.target.closest('#btn-tones') || e.target.closest('#btn-tone-info') || e.target.closest('#btn-theme'))) return;
        hideToneLegend();
    });
    safeAdd('btn-speed', cycleSpeed);
    // v9.3: respaldo de progreso + exportar a Anki + modo abuelo
    safeAdd('btn-backup', openBackupPop);
    safeAdd('btn-backup-close', closeBackupPop);
    safeAdd('btn-backup-export', doBackupExport);
    safeAdd('btn-backup-import', () => {
        const f = document.getElementById('backup-file');
        if (f) f.click();
    });
    const backupFileEl = document.getElementById('backup-file');
    if (backupFileEl) backupFileEl.addEventListener('change', (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) doBackupImport(f);
        e.target.value = ''; // permite re-importar el mismo archivo
    });
    safeAdd('btn-anki-export', doAnkiExport);
    safeAdd('btn-grand', toggleGrand);
    safeAdd('btn-voice-zh', () => cycleVoice('zh'));
    safeAdd('btn-voice-es', () => cycleVoice('es'));

    // Lector de texto libre (banner)
    safeAdd('btn-reader-play', toggleReaderPlay);
    safeAdd('btn-reader-clear', clearReader);
    const readerTa = document.getElementById('reader-input');
    if (readerTa) {
        readerTa.addEventListener('input', () => {
            updateReaderLang();
            renderReaderPreview();
        });
        updateReaderLang();
        renderReaderPreview();
    }
    // v7.9: toque en palabra del lector → popup de vocabulario.
    // DELEGADO en #reader-preview (sobrevive a cada re-render del innerHTML).
    const readerPrev = document.getElementById('reader-preview');
    if (readerPrev) {
        readerPrev.addEventListener('click', (e) => {
            const w = e.target.closest('.reader-word');
            if (w && w.dataset.word) showVocabPop(w.dataset.word);
        });
    }
    
    // Input Enter
    const input = document.getElementById('answer-input');
    if (input) {
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (state.answered) confirmDefaultGrade(); else checkAnswer();
            }
        });
    }

    // Hueco de la oración → foco en el banner de escritura (feedback de alumnos)
    const sentEl = document.getElementById('sentence-text');
    if (sentEl) {
        sentEl.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('blank-slot')) {
                e.preventDefault();
                focusAnswerInput();
            }
        });
    }

    // Cajón de vocabulario: clic en palabra → popup con traducción zh↔es
    const vocabList = document.getElementById('vocab-list');
    if (vocabList) {
        vocabList.addEventListener('click', (e) => {
            const chip = e.target.closest('.vocab-item');
            if (chip && chip.dataset.word) showVocabPop(chip.dataset.word);
        });
    }
    // v9.19: opciones del modo "solo oído" — delegado en la tarjeta (estática):
    // la caja #listen-box se re-arma en cada tarjeta, el listener sobrevive.
    const scard19 = document.getElementById('sentence-card');
    if (scard19) {
        scard19.addEventListener('click', (e) => {
            const opt = e.target.closest('.listen-opt');
            if (opt) { listenPick(opt); return; }
            if (e.target.closest('.listen-play')) listenReplay();
        });
    }
    safeAdd('btn-vocab-pop-close', hideVocabPop);
    // v7.13: botones ▶ Animar / ✍ Practicar de la sección de trazos.
    // DELEGADO en #vocab-pop (el body del popup se re-renderiza en cada
    // apertura → los botones nuevos no necesitan listeners propios).
    const vocabPopEl = document.getElementById('vocab-pop');
    if (vocabPopEl) {
        vocabPopEl.addEventListener('click', (e) => {
            if (e.target.closest && e.target.closest('.vp-stroke-anim')) { vpStrokesAnimate(); return; }
            // v7.16: ✍ Practicar ya NO traza en los cuadros chicos del popup
            // (frustrante con el dedo) → cierra la consulta y abre el banner
            // de práctica grande con los caracteres de la palabra tocada.
            if (e.target.closest && e.target.closest('.vp-stroke-quiz')) {
                const vpBody = document.getElementById('vocab-pop-body');
                const word = vpBody && vpBody.dataset ? vpBody.dataset.word : '';
                openWriterPractice(word || '');
            }
        });
    }
    // v7.13: Escape cierra el popup de vocabulario y la leyenda de tonos
    // (los popups ya se cerraban con ✕ y clic fuera; teclado incluido).
    // v7.16: primero el banner de práctica (está siempre encima).
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        // v9.34: el banner de respuesta a mano está un nivel más arriba:
        // cierra SIN rellenar nada (el teclado sigue siendo el camino).
        const hwb = document.getElementById('handwrite-banner');
        if (hwb && !hwb.classList.contains('hidden')) { closeHandwrite(); return; }
        const wpb = document.getElementById('writer-practice-banner');
        if (wpb && !wpb.classList.contains('hidden')) { closeWriterPractice(); return; }
        const tl = document.getElementById('tone-legend-pop');
        if (tl && !tl.classList.contains('hidden')) { hideToneLegend(); return; }
        hideVocabPop();
    });
    // v9.34: ✍️ del panel diario → respuesta a mano con el hanzi del
    // guion activo (简/繁 ya resuelto por ck()); la respuesta se recala
    // en el clic (nunca queda desincronizada de la tarjeta visible).
    safeAdd('btn-handwrite', () => {
        const filtered = getFiltered();
        const s = filtered && filtered[state.currentIndex];
        if (!s) return;
        const learningChinese = state.mode === 'es-cn';
        const answerIsZh = s.w ? !learningChinese : learningChinese;
        const zh = answerIsZh ? String(s['chinese_' + ck() + '_answer'] || '').trim() : '';
        if (!zh) return;
        const ok = openHandwriteAnswer(zh, (word) => {
            const inp = document.getElementById('answer-input');
            if (inp && !inp.disabled) {
                inp.value = word;
                try { inp.focus(); } catch (e) { /* sin foco disponible */ }
            }
        });
        if (!ok) moduleStatus('ℹ️ Escribí la respuesta con el teclado.', true);
    });
    // v9.34: botones del banner de respuesta a mano (HTML estático → safeAdd)
    safeAdd('btn-hw-close', closeHandwrite);
    safeAdd('btn-hw-keyboard', closeHandwrite); // volver al teclado SIN rellenar
    safeAdd('btn-hw-hint', hwHint);
    // v7.16: botones del banner de práctica (HTML estático → safeAdd sirve)
    safeAdd('btn-wp-close', closeWriterPractice);
    safeAdd('btn-wp-animate', () => {
        if (!wpPractice.writer) return;
        try { wpPractice.writer.cancelQuiz(); } catch (e) {}
        wpSetHint('▶ Mirá el orden de los trazos…');
        wpPractice.writer.animateCharacter().catch(() => {});
    });
    safeAdd('btn-wp-quiz', () => wpStartQuiz());
    safeAdd('btn-wp-prev', () => wpNavStep(-1));
    safeAdd('btn-wp-next', () => wpNavStep(1));
    // v7.16: rotación/redimensionado con el banner abierto → remonta el
    // lienzo al tamaño nuevo (debounce; solo si hay writer activo).
    window.addEventListener('resize', () => {
        const wpb = document.getElementById('writer-practice-banner');
        if (wpb && !wpb.classList.contains('hidden') && wpPractice.writer) {
            clearTimeout(wpPractice.resizeT);
            wpPractice.resizeT = setTimeout(() => wpShowChar({}), 250);
        }
        // v9.34: rotación con el banner de respuesta abierto → remonta el
        // carácter actual (los ya completados quedan registrados en hwAns).
        // Independiente del bloque de arriba: los banners nunca conviven.
        const hwb = document.getElementById('handwrite-banner');
        if (hwb && !hwb.classList.contains('hidden') && hwAns.writer) {
            clearTimeout(hwAns.resizeT);
            hwAns.resizeT = setTimeout(() => hwShowChar(), 250);
        }
    });
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('vocab-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        if (pop.contains(e.target)) return;
        // v7.9: los .reader-word del lector ABREN el popup — ese mismo clic
        // no debe cerrarlo (igual que las chips .vocab-item del cajón)
        // v9.3: ídem los caracteres tocables .lq-ch de lecciones y clásicos
        if (e.target.closest && (e.target.closest('.vocab-item') || e.target.closest('.reader-word') || e.target.closest('.lq-ch'))) return;
        hideVocabPop();
    });
    
    // Audio
    safeAdd('btn-play-es', () => playAudio('es'));
    safeAdd('btn-play-cn', () => playAudio('cn'));

    // v9.10: engranaje de herramientas — abre/cierra el panel de controles
    // de la tarjeta (简/繁, pinyin, tonos, velocidad, voces, grande, respaldo).
    // Cerrado por defecto: la clase .tools-open vive en .card-tools-header y
    // el CSS decide qué se ve. aria-expanded para lectores de pantalla.
    safeAdd('btn-tools-toggle', () => {
        const head = document.querySelector('.card-tools-header');
        if (!head) return;
        const open = head.classList.toggle('tools-open');
        const t = document.getElementById('btn-tools-toggle');
        if (t) t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    
    // Filtros y Selects
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(btn => {
        btn.addEventListener('click', () => {
            const mod = btn.dataset.module;
            // v9.61: los ítems de Práctica Diaria (situaciones) muestran primero
            // la escena completa (diálogo coherente) si existe; "todas" y el
            // resto de los .cat-btn (Clásicos/TOCFL/DELE) siguen yendo directo
            // a la práctica, igual que antes.
            if (btn.closest('#daily-menu') && mod !== 'todas' &&
                typeof openDailyStory === 'function' &&
                typeof DAILY_STORIES !== 'undefined' && DAILY_STORIES[mod]) {
                if (openDailyStory(mod)) return;
            }
            setModule(mod);
        });
    });
    // (Los clásicos van por dropdown: sus ítems .cat-btn ya quedaron conectados arriba)
    initDailyDropdown();
    initClassicsDropdown();
    initDeleDropdown();
    initTocflDropdown(); // v8.2

    const hskSelect = document.getElementById('select-hsk-level');
    if (hskSelect) {
        hskSelect.addEventListener('change', (e) => setModule(e.target.value));
    }
}

// ===== Funciones de Estado =====
// v7.8 (spec v4.0 §4/§5): el cambio de modo es ASÍNCRONO. El evaluador
// de voz (window.VE) aborta la evaluación en curso y hace
// await pitchAnalyzer.dispose() ANTES de que mutemos state.mode (la
// Promise de dispose SIEMPRE resuelve — timeout 2 s — así que el
// cambio nunca se bloquea). Modo inválido → console.error y NO cambia.
async function setMode(mode) {
    if (mode !== 'es-cn' && mode !== 'cn-es') {
        console.error('[app] state.mode inválido: "' + mode +
                      '" — debe ser exactamente "es-cn" o "cn-es" (spec v4.0 §5)');
        return;
    }
    if (window.VE && typeof window.VE.setMode === 'function') {
        try { await window.VE.setMode(mode); }
        catch (e) {
            console.warn('[app] VE.setMode falló, no se cambia el modo:', (e && e.message) || e);
            return;
        }
    }
    state.mode = mode;
    // v9.9: null-guards (los botones del modo ya no están en la tarjeta) + i18n
    const bEsCn = document.getElementById('btn-es-cn');
    if (bEsCn) bEsCn.classList.toggle('active', mode === 'es-cn');
    const bCnEs = document.getElementById('btn-cn-es');
    if (bCnEs) bCnEs.classList.toggle('active', mode === 'cn-es');
    updateUILanguage(mode);
    saveProgress();
    renderCurrentSentence();
}

function setCharType(ct) {
    state.charType = ct;
    
    const btnSimp = document.getElementById('btn-simplified');
    const btnTrad = document.getElementById('btn-traditional');
    
    if (btnSimp) {
        btnSimp.classList.toggle('active', ct === 'simp');
        btnSimp.innerHTML = ct === 'simp' ? '<b>简</b> 简体' : '简 简体';
    }
    
    if (btnTrad) {
        btnTrad.classList.toggle('active', ct === 'trad');
        btnTrad.innerHTML = ct === 'trad' ? '<b>繁</b> 繁體' : '繁 繁體';
    }
    
    saveProgress();
    updateClassicsScript();   // nombres de clásicos en 简/繁
    updateClassicsBtnLabel();
    renderCurrentSentence();
    // v9.2: hook para módulos nuevos (lector de clásicos) que siguen el guion
    try { document.dispatchEvent(new CustomEvent('ac-script-change')); } catch (e) { }
}

function setModule(mod) {
    state.activeModule = mod;
    state.currentIndex = 0;
    state.translationRevealed = false;
    if (state.interleaving) newInterleaveSeed(); // v9.15: orden nuevo al re-entrar al módulo
    
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(b => {
        b.classList.toggle('active', b.dataset.module === mod);
    });
    updateDailyBtnLabel();
    updateClassicsBtnLabel();
    updateDeleBtnLabel();
    updateTocflBtnLabel(); // v8.2
    updateClassicsScript();
    
    saveProgress();
    loadSentences().then(() => {
        renderCurrentSentence();
        updateStats();
        if (state._uiReady) showView('hoy'); // v10 UX: elegir un módulo vuelve a practicar
    });
}

// ===== Dropdown de Práctica Diaria (v6.9) =====
function updateDailyBtnLabel() {
    const lbl = document.getElementById('daily-current');
    if (!lbl) return;
    if (DAILY_MODULES.includes(state.activeModule) && state.activeModule !== 'todas') {
        lbl.textContent = MODULE_LABELS[state.activeModule] || state.activeModule;
    } else {
        lbl.textContent = uiT('dailyCurrent');
    }
}

function initDailyDropdown() {
    const wrap = document.getElementById('daily-dropdown');
    const btn = document.getElementById('btn-daily-toggle');
    const menu = document.getElementById('daily-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        // foco inicial: ítem activo si existe, sino el primero
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    // cerrar al elegir un ítem (setModule lo dispara el wiring global del .cat-btn)
    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    // cerrar al hacer clic afuera
    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    // navegación por teclado (menú ARIA estándar)
    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}

// ===== Dropdown de Clásicos Antiguos (v7.0) =====
// El botón muestra el clásico activo (o el título de la sección) y los
// nombres chinos del menú siguen el switch 简/繁 en tiempo real.
function updateClassicsBtnLabel() {
    const lbl = document.getElementById('classics-current');
    if (!lbl) return;
    const info = CLASSICS_INFO[state.activeModule];
    if (info) {
        const zh = (ck() === 'trad') ? info.zhT : info.zh;
        lbl.textContent = zh + ' · ' + info.es;
    } else {
        lbl.textContent = 'Clásicos Antiguos';
    }
}

function updateClassicsScript() {
    const menu = document.getElementById('classics-menu');
    if (!menu) return;
    const trad = ck() === 'trad';
    menu.querySelectorAll('.classic-item').forEach(item => {
        const info = CLASSICS_INFO[item.dataset.module];
        const zhEl = item.querySelector('.ci-zh');
        if (info && zhEl) zhEl.textContent = trad ? info.zhT : info.zh;
    });
}

function initClassicsDropdown() {
    const wrap = document.getElementById('classics-dropdown');
    const btn = document.getElementById('btn-classics-toggle');
    const menu = document.getElementById('classics-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        // foco inicial: ítem activo si existe, sino el primero
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    // cerrar al elegir un ítem (setModule lo dispara el wiring global del .cat-btn)
    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    // cerrar al hacer clic afuera
    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    // navegación por teclado (menú ARIA estándar)
    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}
// ===== Dropdown de TOCFL (v8.2) — mismo patrón que DELE =====
// Band A: Preparación (Novice) + Nivel 1 (入門) + Nivel 2 (基礎) + las 20
// oraciones de muestra; v9.5 suma Band B completa: Nivel 3 (進階 B1) y
// Nivel 4 (高階 B2) — lista oficial vigente 華語八千詞表 2023.
function updateTocflBtnLabel() {
    const lbl = document.getElementById('tocfl-current');
    if (!lbl) return;
    const info = TOCFL_INFO[state.activeModule];
    lbl.textContent = info ? 'TOCFL · ' + info.badge : 'TOCFL';
}

function initTocflDropdown() {
    const wrap = document.getElementById('tocfl-dropdown');
    const btn = document.getElementById('btn-tocfl-toggle');
    const menu = document.getElementById('tocfl-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]:not([disabled])'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}
// ===== Dropdown de DELE (v7.4) — mismo patrón que Clásicos =====
// El botón muestra el examen activo (o "DELE") y el menú agrupa
// Escolares (11 a 17 años) primero; para adultos se sumará después.
function updateDeleBtnLabel() {
    const lbl = document.getElementById('dele-current');
    if (!lbl) return;
    const info = DELE_INFO[state.activeModule];
    lbl.textContent = info ? 'DELE · ' + info.badge + ' Escolares' : 'DELE';
}

function initDeleDropdown() {
    const wrap = document.getElementById('dele-dropdown');
    const btn = document.getElementById('btn-dele-toggle');
    const menu = document.getElementById('dele-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]:not([disabled])'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}
// ============================================================
// v7.2 — Hueco de la oración: posición por CLOZE (no por indexOf del
// answer) y relleno al responder. Antes: si el answer no figuraba
// contiguo en la oración completa (挨/捱, Mediante/mediante) o aparecía
// dos veces, el hueco no se mostraba o quedaba en el lugar equivocado.
// ============================================================
function pzIsHanCh(ch) {
    const c = ch.codePointAt(0);
    return (c >= 0x3400 && c <= 0x9FFF) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0x20000 && c <= 0x2FA1F);
}

// (escHtml vive más abajo, junto al lector interlineal: v9.50 quitó la copia duplicada)

// Posición del hueco en coordenadas de caracteres han: el prefijo del
// cloze hasta '___' es idéntico al de la oración completa.
function blankZoneFromCloze(s, k) {
    const cloze = s['chinese_' + k + '_cloze'] || '';
    const bi = cloze.indexOf('___');
    if (bi === -1) return null;
    let start = 0;
    for (const ch of cloze.slice(0, bi)) if (pzIsHanCh(ch)) start++;
    let len = 0;
    for (const ch of (s['chinese_' + k + '_answer'] || '')) if (pzIsHanCh(ch)) len++;
    return len > 0 ? { start: start, len: len } : null;
}

// Segmento REAL de la oración completa que ocupa el hueco (p.ej. muestra
// 捱 aunque el answer sea 挨 — la respuesta del usuario se valida aparte).
function fullSegmentAt(fullText, zone) {
    if (!fullText || !zone) return null;
    const chars = Array.from(fullText);
    let seen = 0, sIdx = -1, eIdx = -1;
    for (let i = 0; i < chars.length; i++) {
        if (pzIsHanCh(chars[i])) {
            if (seen === zone.start) sIdx = i;
            seen++;
            if (seen === zone.start + zone.len) { eIdx = i + 1; break; }
        }
    }
    return (sIdx !== -1 && eIdx !== -1) ? chars.slice(sIdx, eIdx).join('') : null;
}

// v7.2 — Completa el hueco de la oración actual con la respuesta real:
// verde = correcto · rojo = error (muestra la palabra correcta) · ámbar = Revelar.
function refillBlank(cls) {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    if (!s) return;
    state.filledAnswer = cls;
    renderSentenceText(s);
}

// v8.1: renderiza el hanzi de una tarjeta de palabra con colores de tono si
// están activos (fallback texto plano). Lo usa renderSentenceText.
function renderWordHanzi(el, zhWord) {
    if (showToneColors && typeof pinyinPro !== 'undefined') {
        try {
            const items = pinyinPro.pinyin(zhWord, { type: 'all' });
            let html = '';
            for (const it of items) {
                html += it.isZh ? '<span class="tone-' + (it.num || 5) + '">' + escHtml(it.origin) + '</span>' : escHtml(it.origin);
            }
            el.innerHTML = html;
            return;
        } catch (e) { console.warn('Error en pinyin-pro, mostrando texto plano:', e); }
    }
    el.textContent = zhWord || 'Error en datos';
}

// Renderiza SOLO el texto de la oración (hueco/tonos/relleno). La usa
// renderCurrentSentence para una oración nueva y refillBlank al responder.
function renderSentenceText(s) {
    const learningChinese = state.mode === 'es-cn';
    const k = ck();
    const sentenceTextEl = document.getElementById('sentence-text');
    const fill = state.filledAnswer;
    const fillSpan = (txt) => '<span class="blank-fill ' + fill + '">' + escHtml(txt) + '</span>';

    if (learningChinese) {
        // v8.1: tarjeta de palabra (HSK 3.0) → el prompt es el HANZI (con colores
        // de tono si están activos) y el alumno responde con el significado en
        // español. El pinyin de la palabra sigue de guía debajo si está ON.
        if (s.w) {
            renderWordHanzi(sentenceTextEl, s['chinese_' + k + '_full'] || '');
            return;
        }
        const displayText = s['chinese_' + k + '_full'];
        const cloze = s['chinese_' + k + '_cloze'] || '';
        const zone = blankZoneFromCloze(s, k);
        const fillTxt = zone ? (fullSegmentAt(displayText, zone) || s['chinese_' + k + '_answer'] || '') : '';

        // Con colores de tono: se recorren solo los caracteres han
        if (showToneColors && typeof pinyinPro !== 'undefined') {
            try {
                const items = pinyinPro.pinyin(displayText, { type: 'all' });
                let html = '';
                let charPos = 0; // contador solo para caracteres chinos
                for (const it of items) {
                    if (it.isZh) {
                        if (zone && charPos >= zone.start && charPos < zone.start + zone.len) {
                            if (charPos === zone.start) html += fill ? fillSpan(fillTxt) : '___';
                        } else {
                            const toneNum = it.num || 5;
                            html += `<span class="tone-${toneNum}">${it.origin}</span>`;
                        }
                        charPos++;
                    } else {
                        html += it.origin;
                    }
                }
                sentenceTextEl.innerHTML = html;
            } catch (e) {
                console.warn('Error en pinyin-pro, mostrando texto plano:', e);
                if (fill && cloze.includes('___')) {
                    sentenceTextEl.innerHTML = escHtml(cloze).replace('___', fillSpan(fillTxt));
                } else {
                    sentenceTextEl.textContent = (cloze.includes('___') ? cloze : displayText) || 'Error en datos';
                }
            }
        } else {
            // Fallback: texto plano. ⚠ En ES→CN se usa el cloze (con ___)
            // para NO revelar la respuesta; makeBlanksClickable() lo hace
            // clicable y con el relleno la oración queda completa.
            let plain = displayText || 'Error en datos';
            if (cloze.includes('___')) plain = cloze;
            if (fill && cloze.includes('___')) {
                sentenceTextEl.innerHTML = escHtml(cloze).replace('___', fillSpan(fillTxt));
            } else {
                sentenceTextEl.textContent = plain;
            }
        }
        return;
    }

    // CN→ES: el español se muestra con cloze; al responder, la oración completa
    // v8.1: tarjeta de palabra → modo espejo: se muestra la palabra ESPAÑOLA y
    // el alumno produce el hanzi (el hanzi se revela al verificar/revelar).
    if (s.w) {
        sentenceTextEl.textContent = s.spanish_full || 'Error en datos';
        return;
    }
    const shown = s.spanish_cloze || s.spanish_full;
    if (fill) {
        const full = s.spanish_full || shown || '';
        const a = s.spanish_answer || '';
        const idx = a ? full.toLowerCase().indexOf(a.toLowerCase()) : -1;
        if (idx !== -1) {
            sentenceTextEl.innerHTML = escHtml(full.slice(0, idx)) + fillSpan(full.slice(idx, idx + a.length)) + escHtml(full.slice(idx + a.length));
        } else {
            sentenceTextEl.innerHTML = escHtml(full);
        }
    } else {
        sentenceTextEl.textContent = shown || 'Error en datos';
    }
}

function renderCurrentSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    
    // Reiniciar índice si nos salimos de rango
    if (state.currentIndex >= filtered.length) state.currentIndex = 0;
    
    const s = filtered[state.currentIndex];
    if (!s) return;

    state.answered = false;
    state.filledAnswer = null;   // v7.2: oración nueva → hueco otra vez vacío
    state.attempts = 0;          // v10 UX: dos intentos por tarjeta
    state._listenSingle = false; // v9.50: se reactiva solo al elegir una opción en "solo oído"
    state.lastResult = null;
    const btnCheck = document.getElementById('btn-check');
    if (btnCheck) btnCheck.textContent = uiT('btnCheck');
    setAnswerStage('pre');

    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // Actualizar Header (los clásicos muestran su propia insignia)
    const deleInfo = DELE_INFO[s.module];
    const tocflInfo = TOCFL_INFO[s.module]; // v8.2: vocabulario TOCFL Band A
    document.getElementById('card-level').textContent =
        (s.module || '').startsWith('Clasicos-') ? uiT('lvlClassic') :
        (deleInfo ? '🇪🇸 DELE ' + deleInfo.badge :
        (tocflInfo ? '🇹🇼 TOCFL ' + tocflInfo.badge :
        (s.w ? uiT('lvlPre') + s.level + uiT('lvlSuf') + uiT('lvlVocabSuf')
             : uiT('lvlPre') + s.level + uiT('lvlSuf'))));
    document.getElementById('card-number').textContent = (state.currentIndex + 1) + '/' + filtered.length;

    // v9.47: chip 🎯 con el historial de esta tarjeta (oculto si nunca la vio)
    const attEl = document.getElementById('card-attempts');
    if (attEl) {
        const r = attemptsBadgeFor(s);
        if (r) {
            attEl.textContent = uiT('attChip').replace('{n}', r.n);
            attEl.title = uiT('attTitle').replace('{n}', r.n).replace('{ok}', r.ok).replace('{ft}', r.ft);
            attEl.classList.remove('hidden');
        } else {
            attEl.textContent = '';
            attEl.removeAttribute('title');
            attEl.classList.add('hidden');
        }
    }

    // v9.63: chip 🔀 — esta tarjeta vino de OTRA situación de Diaria
    // (interleaving real, getFiltered/DAILY_INTERLEAVE_RATIO). Oculto si
    // la tarjeta no está mezclada (s._mixedFrom solo existe en esas copias).
    const mixEl = document.getElementById('card-mixed-chip');
    if (mixEl) {
        if (s._mixedFrom) {
            const lbl = moduleLabel(s._mixedFrom);
            mixEl.textContent = uiT('mixedChip').replace('{mod}', lbl);
            mixEl.title = uiT('mixedTitle').replace('{mod}', lbl);
            mixEl.classList.remove('hidden');
        } else {
            mixEl.textContent = '';
            mixEl.removeAttribute('title');
            mixEl.classList.add('hidden');
        }
    }

    // 1-3. Texto de la oración (hueco posicionado por cloze + tonos + relleno)
    renderSentenceText(s);

    // 4. Mostrar Pinyin debajo (si está activado)
    var pinyinEl = document.getElementById('pinyin-display');
    if (learningChinese && s.pinyin && state.showPinyin) {
        pinyinEl.textContent = s.pinyin;
        pinyinEl.classList.remove('hidden');
    } else {
        pinyinEl.classList.add('hidden');
    }

    // 5. Resetear traducción y feedback
    state.translationRevealed = false;
    const transEl = document.getElementById('translation-text');
    transEl.textContent = '💡 La traducción aparecerá al verificar...';
    transEl.style.opacity = '0.4';
    transEl.style.fontStyle = 'italic';

    document.getElementById('answer-input').value = '';
    hideFeedback();

    // 6. Placeholder dinámico (v8.1: las tarjetas de palabra invierten la dirección)
    const input = document.getElementById('answer-input');
    const charLabel = state.charType === 'trad' ? 'tradicional' : 'simplificado';
    if (s.w) {
        input.placeholder = learningChinese
            ? 'Escribí el significado en español...'
            : 'Escribe en chino (' + charLabel + ')...';
    } else if (learningChinese) {
        input.placeholder = 'Escribe en chino (' + charLabel + ')...';
    } else {
        input.placeholder = 'Escribe en español (conjugado)... 用西班牙语写';
    }

    // v9.34: ✍️ "respuesta a mano" — visible SOLO cuando la respuesta
    // esperada es CHINA (palabras en cn-es u oraciones en es-cn, misma
    // regla expectChineseAns de checkAnswer) y el hanzi del guion activo
    // existe. En los otros caminos el teclado es el único camino.
    const btnHw = document.getElementById('btn-handwrite');
    if (btnHw) {
        const answerIsZh = s.w ? !learningChinese : learningChinese;
        const zhAns = answerIsZh ? String(s['chinese_' + k + '_answer'] || '').trim() : '';
        btnHw.classList.toggle('hidden', !(answerIsZh && zhAns));
    }

    // 6b. v10 UX: las etiquetas de acción las pone updateUILanguage (data-i18n).

    // v7.14: botón "📖 Leer lección" — SOLO si la oración pertenece a un
    // texto continuo (p. ej. Clásicos) y el modo es "Aprendo Chino" (es-cn).
    // En CN→ES el botón desaparece (el texto de la lección es chino).
    const btnLesson = document.getElementById('btn-read-lesson');
    if (btnLesson) {
        const hasLesson = state.mode === 'es-cn' && !!lessonForSentence(s);
        btnLesson.classList.toggle('hidden', !hasLesson);
    }

    // 7. Barra de progreso
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = ((state.currentIndex + 1) / filtered.length * 100) + '%';
    updateSessionUI(); // v10 UX: anillo de sesión

    // 8. Hacer el hueco "___" clicable (los alumnos intentan tocarlo para escribir)
    makeBlanksClickable();

    // 9. Módulo de pronunciación (v7.5): nueva oración → nuevo objetivo + reset.
    //    v7.8 (spec v4.0 §1): el objetivo depende del MODO —
    //      · es-cn (Aprendo Chino)   → oración china completa + pinyin
    //        (pipeline completo: Whisper contenido + F0/DTW tonos).
    //      · cn-es (Aprendo Español) → oración ESPAÑOLA, sin pinyin
    //        (SOLO Whisper: el español no es lengua tonal).
    if (window.VR && typeof window.VR.setTarget === 'function') {
        // v7.6: 3.er arg = guion activo (s/t) → mensajes zh en 简/繁
        // v7.8: 4.º arg = idioma del objetivo ('zh'|'es')
        const esMode = state.mode === 'cn-es';
        const target = esMode ? (s.spanish_full || '') : s['chinese_' + k + '_full'];
        window.VR.setTarget(target, esMode ? '' : (s.pinyin || ''), k, esMode ? 'es' : 'zh');
    }

    // 10. v9.19: modo "solo oído" — tapa el texto, arma opciones y manda el audio
    applyListenCard();
} // <--- ¡CIERRE DE LA FUNCIÓN!

// ===== Hueco clicable: tocar el "___" lleva al banner de escritura =====
function makeBlanksClickable() {
    const el = document.getElementById('sentence-text');
    if (!el) return;
    // Envolver cada "___" de los nodos de texto en un span clicable
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
        if (!n.nodeValue || n.nodeValue.indexOf('___') === -1) return;
        const frag = document.createDocumentFragment();
        n.nodeValue.split('___').forEach((part, i) => {
            if (i > 0) {
                const b = document.createElement('span');
                b.className = 'blank-slot';
                b.setAttribute('role', 'button');
                b.setAttribute('aria-label', 'Tocá acá para escribir tu respuesta');
                b.setAttribute('title', 'Tocá el hueco para escribir');
                b.textContent = '___';
                frag.appendChild(b);
            }
            if (part) frag.appendChild(document.createTextNode(part));
        });
        n.parentNode.replaceChild(frag, n);
    });
}

function focusAnswerInput() {
    const input = document.getElementById('answer-input');
    if (!input) return;
    try { input.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { input.scrollIntoView(); }
    try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
    const sec = document.getElementById('answer-section');
    if (sec) {
        sec.classList.remove('answer-glow');
        void sec.offsetWidth; // fuerza reinicio de la animación
        sec.classList.add('answer-glow');
    }
}
function togglePinyin() {
    state.showPinyin = !state.showPinyin;
    var btn = document.getElementById('btn-pinyin');
    
    if (btn) {
        btn.textContent = state.showPinyin ? '📖 Pinyin: ON' : '📖 Pinyin: OFF';
        btn.classList.toggle('active', state.showPinyin);
    }
    
    saveProgress();
    renderCurrentSentence();
    renderReaderPreview(); // el lector libre también usa el pinyin
}

function toggleToneColors() {
    showToneColors = !showToneColors;
    const btn = document.getElementById('btn-tones');
    
    if (btn) {
        btn.textContent = showToneColors ? '🎨 Tonos: ON' : '🎨 Tonos: OFF';
        btn.classList.toggle('active', showToneColors);
    }
    
    // v7.11: la PRIMERA vez que se activan los tonos se muestra la leyenda.
    // Se marca toneLegendSeen acá mismo (si no, reaparecería en cada
    // activación aunque no marcaras el checkbox); con el botón ℹ️ del panel
    // se puede reabrir cuando quieras.
    if (showToneColors && !state.toneLegendSeen) {
        state.toneLegendSeen = true;
        showToneLegend();
    }
    
    saveProgress();
    renderCurrentSentence();
    renderReaderPreview(); // el lector libre también usa los colores de tono
}

// ===== v7.11: esquemas de color para los tonos =====
// Estándar NO se aplica por JS: son las variables nativas de la app
// (--primary/--warning/--success/--danger/--text-secondary) a las que el CSS
// cae cuando no hay variable --tone-N definida. Así el look de siempre no
// cambia ni una pixel, y el modo oscuro sigue adaptándose solo.
const TONE_SCHEMES = {
    colorblind: { // paleta Okabe-Ito (segura para deuteranopía/protanopía)
        light: { 1: '#0072B2', 2: '#E69F00', 3: '#009E73', 4: '#D55E00', 5: '#999999' },
        dark:  { 1: '#56B4E9', 2: '#E69F00', 3: '#009E73', 4: '#D55E00', 5: '#999999' } // azul cielo: legible sobre fondo oscuro
    }
};
// Semilla del esquema personalizado = look actual de la app (el usuario parte
// de lo que conoce y ajusta desde ahí). Claves SIEMPRE como string '1'..'5'.
const TONE_CUSTOM_DEFAULT = { 1: '#2563eb', 2: '#d97706', 3: '#16a34a', 4: '#dc2626', 5: '#64748b' };

// Paleta activa según esquema + modo (light/dark). null = estándar → el CSS
// usa sus fallbacks nativos y NO se pisan los colores del usuario.
function toneActivePalette() {
    if (state.toneScheme === 'colorblind') {
        return document.body.classList.contains('dark-mode')
            ? TONE_SCHEMES.colorblind.dark
            : TONE_SCHEMES.colorblind.light;
    }
    if (state.toneScheme === 'custom' && state.toneCustomColors) return state.toneCustomColors;
    return null;
}

// Aplica (o limpia) las variables --tone-N en :root. El neutro (5) comparte
// la variable --tone-0 porque el CSS estiliza .tone-0 y .tone-5 juntas.
function applyToneScheme() {
    const root = document.documentElement;
    const pal = toneActivePalette();
    for (let n = 1; n <= 5; n++) {
        const varName = (n === 5) ? '--tone-0' : ('--tone-' + n);
        const val = pal ? pal[String(n)] : null;
        if (val) root.style.setProperty(varName, val);
        else root.style.removeProperty(varName);
    }
}

function showToneLegend() {
    const pop = document.getElementById('tone-legend-pop');
    if (!pop) return;
    // Sincronizar radios + grilla custom + checkbox con el estado real
    document.querySelectorAll('input[name="tone-scheme"]').forEach(r => {
        r.checked = (r.value === state.toneScheme);
    });
    const customDiv = document.getElementById('tone-custom-colors');
    if (customDiv) customDiv.classList.toggle('hidden', state.toneScheme !== 'custom');
    const colors = state.toneCustomColors || TONE_CUSTOM_DEFAULT;
    for (let n = 1; n <= 5; n++) {
        const inp = document.getElementById('tc-' + n);
        if (inp && colors[String(n)]) inp.value = colors[String(n)];
    }
    const chk = document.getElementById('chk-tone-legend-once');
    if (chk) chk.checked = !!state.toneLegendSeen;
    pop.classList.remove('hidden');
}

function hideToneLegend() {
    const pop = document.getElementById('tone-legend-pop');
    if (pop) pop.classList.add('hidden');
}

// ===== Lógica de Juego =====
function showFullTranslation() {
    if (state.translationRevealed) return;
    state.translationRevealed = true;

    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // v8.1: la revelación muestra la OTRA lengua respecto del prompt. Con la
    // inversión v8.1 de las tarjetas de palabra esta misma línea cubre los 4
    // casos: es-cn oración (prompt chino) → español · cn-es oración (prompt
    // español) → hanzi · es-cn palabra (prompt hanzi) → glosa española ·
    // cn-es palabra (prompt glosa) → hanzi.
    let translationText = learningChinese ? s.spanish_full : s['chinese_' + k + '_full'];

    const el = document.getElementById('translation-text');
    el.textContent = translationText || 'Error en datos';
    el.style.opacity = '1';
    el.style.fontStyle = 'normal';
}

function getValidAnswers(s, learningChinese, k) {
    const answers = [];
    // v8.1: en tarjetas de palabra (HSK 3.0) los modos invierten la dirección:
    // Aprendo Chino (es-cn) muestra el hanzi y espera la glosa española;
    // Aprendo Español (cn-es) muestra la glosa y espera el hanzi. Las
    // oraciones mantienen su dirección histórica.
    const expectChinese = s.w ? !learningChinese : learningChinese;
    if (expectChinese) {
        if (s.chinese_simp_answer) answers.push(s.chinese_simp_answer);
        if (s.chinese_trad_answer && s.chinese_trad_answer !== s.chinese_simp_answer) {
            answers.push(s.chinese_trad_answer);
        }
    } else {
        answers.push(s.spanish_answer);
        if (s.spanish_alternatives) {
            s.spanish_alternatives.forEach(alt => {
                if (!answers.includes(alt)) answers.push(alt);
            });
        }
    }
    return answers;
}

function checkAnswer() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    if (state.answered) { nextSentence(); return; } // el botón ahora dice "Siguiente ▶"
    const s = filtered[state.currentIndex];
    const input = document.getElementById('answer-input').value.trim();
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    if (!input) {
        showFeedback(uiT('needAnswer'), 'incorrect');
        return;
    }

    const validAnswers = getValidAnswers(s, learningChinese, k);

    // v8.1: identidad canónica de una tarjeta de palabra = el hanzi
    // (el panel de vocabulario, las stats y el popup usan el hanzi como clave)
    const wordKey = s.w ? String(s.chinese_simp_answer || validAnswers[0] || '').trim() : null;

    // v7.19: tarjetas de palabra → coincidencia EXACTA (sin acentos y sin mayúsculas).
    // El matching por inclusión de las oraciones sería demasiado laxo con glosas cortas.
    // v9.3: normalización ROBUSTA de la corrección. Caso real (明明德): el teclado
    // chino del celular mete ESPACIOS entre candidatos ("明 明 德"), agrega
    // puntuación de arrastre o escribe el español sin acentos — y la respuesta
    // correcta se marcaba mal. Ahora se comparan versiones normalizadas: sin
    // espacios (el chino no usa), sin puntuación, sin acentos y sin mayúsculas.
    // La inclusión se conserva: responder la oración completa o una parte del
    // blank sigue contando como antes.
    const deacc = (x) => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normZh = (t) => deacc(String(t == null ? '' : t)).toLowerCase()
        .replace(/[\s\u00A0\u3000]+/g, '')
        .replace(/[。，、！？：；「」『』《》（）〈〉·…―—–\-.!?;:,"'“”‘’()\[\]{}]/g, '');
    const normEs = (t) => deacc(String(t == null ? '' : t)).toLowerCase()
        .replace(/^[¿¡"'“”(\[\s]+/, '').replace(/[.!?,;:)"“”'\]\s]+$/g, '')
        .replace(/\s+/g, ' ').trim();
    const expectChineseAns = s.w ? !learningChinese : learningChinese;
    const isCorrect = s.w
        ? validAnswers.some(ans => normEs(ans) === normEs(input))
        : (() => {
            const iN = expectChineseAns ? normZh(input) : normEs(input);
            if (!iN) return false;
            return validAnswers.some(ans => {
                const aN = expectChineseAns ? normZh(ans) : normEs(ans);
                // v9.50: escribir MÁS que la respuesta (oración completa) sigue valiendo;
                // escribir MENOS solo vale si cubre ≥70 % (antes "a" o "记" pasaban)
                return !!aN && (iN === aN || iN.includes(aN) ||
                    (aN.includes(iN) && iN.length >= aN.length * 0.7));
            });
        })();

    const allOptions = validAnswers.join(' / ');

    // v10 UX: primer error → pista graduada sin revelar; segundo → respuesta + diff
    if (!isCorrect) {
        state.attempts = (state.attempts || 0) + 1;
        if (state.attempts < 2) {
            showFeedback(answerHint(input, validAnswers, expectChineseAns), 'hint');
            const inpEl = document.getElementById('answer-input');
            if (inpEl) { try { inpEl.focus({ preventScroll: true }); inpEl.select(); } catch (e) { /* noop */ } }
            return;
        }
    }
    showFullTranslation();

    if (isCorrect) {
        state.lastResult = 'correct';
        showFeedback(uiT('correctWord') + '"' + allOptions + '"', 'correct');
        // v8.1: palabras → se registra el hanzi canónico (no las glosas)
        if (wordKey) {
            state.knownWords.add(wordKey);
            state.newWords.delete(wordKey);
        } else {
            // v9.0: oraciones → se registra UNA entrada canónica (el hanzi
            // SIMPLIFICADO si la respuesta es china). Antes se guardaban todas
            // las respuestas válidas en el guion activo: estudiando con 繁
            // quedaba 謝謝 (y además entraban simp+trad como dos palabras).
            const canon = learningChinese
                ? String(s.chinese_simp_answer || validAnswers[0] || '').trim()
                : validAnswers[0];
            state.knownWords.add(canon);
            state.newWords.delete(canon);
        }
        state.score++;
        rememberWordContext(wordKey ? [wordKey] : validAnswers, s); // v7.13: contexto de la oración actual
        refillBlank('correct');   // v7.2: la oración queda completa (verde)
        // v9.47: pase resuelto en acierto — intentos = errados previos + este
        recordCardAttempt(s, state._listenSingle ? 1 : state.attempts + 1, 'ok');
    } else {
        state.lastResult = 'wrong';
        showFeedback(uiT('validWrong') + '"' + allOptions + '"', 'incorrect',
            answerDiffHtml(input, validAnswers[0], expectChineseAns));
        state.newWords.add(wordKey || validAnswers[0]);
        rememberWordContext(wordKey ? [wordKey] : [validAnswers[0]], s); // v7.13
        if (typeof window.acSrsMiss === 'function') window.acSrsMiss(s); // v7.21: alimenta el mazo de repaso
        refillBlank('wrong');     // v7.2: se muestra la palabra correcta (rojo)
        // v9.47: pase resuelto en error — todos los intentos de este pase fueron errados
        recordCardAttempt(s, state.attempts, 'ko');
    }

    state.answered = true;
    setAnswerStage('post'); // v10 UX: Otra vez / Bien / Fácil

    saveProgress();
    updateStats();
    updateVocabularyPanel();
}

function revealAnswer() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    const validAnswers = getValidAnswers(s, learningChinese, k);
    // v8.1: identidad canónica de palabra = hanzi (coherente con checkAnswer)
    const wordKey = s.w ? String(s.chinese_simp_answer || validAnswers[0] || '').trim() : null;
    if (state.answered && state.lastResult) return; // ya respondida: nada que revelar
    showFullTranslation();
    // v10 UX: revelar NO es acertar → clase propia (ámbar) y entra al repaso
    showFeedback(uiT('validReveal') + '"' + validAnswers.join(' / ') + '"', 'reveal');
    if (typeof window.acSrsMiss === 'function') window.acSrsMiss(s);
    state.lastResult = 'reveal';
    recordCardAttempt(s, state.attempts + 1, 'rv'); // v9.47: revelar también cierra el pase
    refillBlank('reveal');       // v7.2: oración completa con la respuesta (ámbar)
    // v9.19: en "solo oído", Revelar también destapa la oración y cierra opciones
    if (state.mode === 'es-cn' && state.listenFirst) {
        const stl = document.getElementById('sentence-text');
        if (stl) stl.classList.remove('hidden');
        const pyl = document.getElementById('pinyin-display');
        if (pyl && state.showPinyin && s.pinyin) pyl.classList.remove('hidden');
        const boxl = document.getElementById('listen-box');
        if (boxl) boxl.querySelectorAll('.listen-opt').forEach(b => {
            b.disabled = true;
            if (b.dataset.ok === '1') b.classList.add('listen-ok');
        });
        // v9.27: restaurar la tarjeta COMPLETA (igual que listenPick). Antes
        // answer-input y btn-check quedaban ocultos → camino muerto visual.
        // Como la respuesta ya se vio, "Verificar" no tiene sentido: se marca
        // respondido y el botón pasa a "Siguiente ▶" (checkAnswer →
        // nextSentence) SIN contar como acierto — revelar no es practicar.
    }

    if (wordKey) {
        state.newWords.add(wordKey);
    } else {
        // v9.0: oraciones → canónico simplificado (coherente con checkAnswer)
        const canon = learningChinese
            ? String(s.chinese_simp_answer || validAnswers[0] || '').trim()
            : validAnswers[0];
        state.newWords.add(canon);
    }
    rememberWordContext(wordKey ? [wordKey] : validAnswers, s); // v7.13: contexto de la oración actual
    state.answered = true;
    setAnswerStage('post'); // v10 UX: calificación (Otra vez preseleccionado)
    saveProgress();
    updateStats();
    updateVocabularyPanel();
}

// ===== v10 UX: calificación en dos etapas, pistas, diff, sesión, navegación =====
function gradeCard(kind) {
    const filtered = getFiltered();
    if (!filtered.length || !state.answered) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();
    const answer = s.w
        ? String(s.chinese_simp_answer || s['chinese_' + k + '_answer']).trim()
        : (learningChinese ? String(s.chinese_simp_answer || s['chinese_' + k + '_answer']).trim() : s.spanish_answer);
    if (kind === 'again') {
        state.newWords.add(answer);
        state.knownWords.delete(answer);
        // tras error o revelar la tarjeta YA está en caja 1 (checkAnswer/revealAnswer)
        if (state.lastResult === 'correct' && typeof window.acSrsMiss === 'function') window.acSrsMiss(s);
    } else {
        state.knownWords.add(answer);
        state.newWords.delete(answer);
        if (typeof window.acSrsGrade === 'function') window.acSrsGrade(s, kind);
    }
    rememberWordContext([answer], s);
    sessionTick();
    saveProgress();
    updateStats();
    updateVocabularyPanel();
    nextSentence();
}

function setAnswerStage(stage) {
    const post = stage === 'post';
    const pre = document.getElementById('pre-answer-row');
    const row = document.getElementById('grade-row');
    const chk = document.getElementById('btn-check');
    const inp = document.getElementById('answer-input');
    const hw = document.getElementById('btn-handwrite');
    if (pre) pre.classList.toggle('hidden', post);
    if (row) row.classList.toggle('hidden', !post);
    if (chk) chk.classList.toggle('hidden', post);
    if (inp) inp.readOnly = post;
    if (hw && post) hw.classList.add('hidden');
    if (post && row) {
        updateGradeIntervals();
        const def = state.lastResult === 'correct' ? 'good' : 'again';
        row.querySelectorAll('.btn-grade').forEach(b => b.classList.toggle('is-default', b.dataset.grade === def));
        const d = row.querySelector('.btn-grade.is-default');
        if (d) { try { d.focus({ preventScroll: true }); } catch (e) { d.focus(); } }
    }
}

function confirmDefaultGrade() {
    const b = document.querySelector('#grade-row .btn-grade.is-default');
    if (b) b.click();
}

function updateGradeIntervals() {
    const filtered = getFiltered();
    const s = filtered && filtered[state.currentIndex];
    if (!s) return;
    const p = (typeof window.acSrsPreview === 'function') ? window.acSrsPreview(s) : null;
    const set = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
    set('g-int-again', p ? p.again : '10 min');
    set('g-int-good', p ? p.good : uiT('gradeTomorrow')); // v9.38: Bien → mañana (antes igual que Fácil)
    set('g-int-easy', p ? p.easy : uiT('gradeNoReturn'));
}

function prevSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    state.currentIndex = (state.currentIndex - 1 + filtered.length) % filtered.length;
    saveProgress();
    renderCurrentSentence(); // no toca el repaso: solo vuelve a mostrar la frase
}

// ---- pistas graduadas (primer error) ----
function stripAccents(t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
function pinyinOf(zh, tone) {
    try {
        if (typeof pinyinPro !== 'undefined' && zh) {
            return pinyinPro.pinyin(zh, { toneType: tone ? 'symbol' : 'none' }).replace(/\s+/g, '').toLowerCase();
        }
    } catch (e) { /* sin pinyin */ }
    return '';
}
function levArr(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = new Array(n + 1), cur = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
        cur[0] = i;
        for (let j = 1; j <= n; j++) {
            cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
        [prev, cur] = [cur, prev];
    }
    return prev[n];
}
// La respuesta del alumno con "_" en la posición que difiere (no revela la correcta)
function maskDiffPos(a, b) {
    const A = Array.from(a), B = Array.from(b);
    let out = '';
    for (let i = 0; i < A.length; i++) out += (A[i] === B[i]) ? A[i] : '_';
    return out;
}
function answerHint(input, validAnswers, expectZh) {
    const inp = String(input || '').trim();
    const ans = String(validAnswers[0] || '').trim();
    if (expectZh) {
        const cIn = inp.replace(/[\s\u3000]+/g, '');
        const cAns = ans.replace(/[\s\u3000]+/g, '');
        const hasHan = /[\u3400-\u9fff]/.test(cIn);
        if (!hasHan && cIn) {
            // escribió latino: ¿es el pinyin de la respuesta?
            const pIn = stripAccents(cIn.toLowerCase()).replace(/[0-9]/g, '');
            const pAns = pinyinOf(cAns, false);
            if (pAns && pIn === pAns) {
                const tIn = cIn.toLowerCase(), tAns = pinyinOf(cAns, true);
                return (tAns && tIn !== tAns && stripAccents(tIn) === stripAccents(tAns) && /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(tIn))
                    ? uiT('hintTone') : uiT('hintPinyinOk');
            }
            return uiT('hintGeneric');
        }
        const tl = pinyinOf(cIn, false), ta = pinyinOf(cAns, false);
        if (tl && ta && tl === ta && cIn !== cAns) return uiT('hintHomophone');
        const A = Array.from(cIn), B = Array.from(cAns);
        if (A.length === B.length && A.length > 1 && levArr(A, B) === 1) return uiT('hintOneChar') + ' ' + maskDiffPos(cIn, cAns);
        return uiT('hintGeneric');
    }
    const a = inp.toLowerCase(), b = ans.toLowerCase();
    if (a !== b && stripAccents(a) === stripAccents(b)) return uiT('hintAccent');
    if (a.length === b.length && a.length > 2 && levArr(a.split(''), b.split('')) === 1) return uiT('hintOneLetter') + ' ' + maskDiffPos(a, b);
    return uiT('hintGeneric');
}
// Diff visual (segundo error): lo escrito vs. la respuesta, carácter a carácter
function answerDiffHtml(input, answer, expectZh) {
    const A = Array.from(String(input || '').trim());
    const B = Array.from(String(answer || '').trim());
    if (!A.length || !B.length) return '';
    const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const cmp = (x, y) => expectZh ? x === y : stripAccents(x).toLowerCase() === stripAccents(y).toLowerCase();
    let you = '', want = '';
    const L = Math.max(A.length, B.length);
    for (let i = 0; i < L; i++) {
        const same = A[i] !== undefined && B[i] !== undefined && cmp(A[i], B[i]);
        if (A[i] !== undefined) you += '<span class="' + (same ? 'd-ok' : 'd-no') + '">' + esc(A[i]) + '</span>';
        if (B[i] !== undefined) want += '<span class="' + (same ? 'd-ok' : 'd-want') + '">' + esc(B[i]) + '</span>';
    }
    const lang = expectZh ? ' lang="zh"' : '';
    return '<span class="fb-diff-row"><span class="fb-diff-lbl">' + esc(uiT('diffYou')) + '</span><span class="fb-diff-txt"' + lang + '>' + you + '</span></span>' +
           '<span class="fb-diff-row"><span class="fb-diff-lbl">' + esc(uiT('diffAns')) + '</span><span class="fb-diff-txt"' + lang + '>' + want + '</span></span>';
}

// ---- sesión diaria ----
const SESSION_KEY = 'ac_session_v1';
// v9.50: fecha LOCAL (yyyy-mm-dd). toISOString() daba la fecha UTC: en
// Argentina (UTC-3) el "día" cambiaba a las 21:00 y la sesión se reiniciaba.
function localDay(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function sessionToday() { return localDay(); }
function loadSession() {
    state.sessionDate = sessionToday();
    try {
        const r = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        if (r && typeof r === 'object') {
            state.sessionGoal = [5, 10, 20].indexOf(r.goal) !== -1 ? r.goal : 10;
            const sameDay = r.date === sessionToday();
            state.sessionDone = sameDay ? (r.done | 0) : 0;
            state.sessionTarget = sameDay && r.target >= state.sessionGoal ? (r.target | 0) : state.sessionGoal;
        }
    } catch (e) { /* sin sesión */ }
    if (!state.sessionTarget) state.sessionTarget = state.sessionGoal;
}
function saveSession() {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify({ date: sessionToday(), done: state.sessionDone, goal: state.sessionGoal, target: state.sessionTarget })); } catch (e) { /* noop */ }
}
function sessionTick() {
    if (state.sessionDate !== sessionToday()) { state.sessionDone = 0; state.sessionDate = sessionToday(); state.sessionTarget = state.sessionGoal; }
    state.sessionDone++;
    saveSession();
    updateSessionUI();
    updateHeaderStreak();
    if (state.sessionDone === state.sessionTarget) showSessionDone();
}
function updateSessionUI() {
    const t = state.sessionTarget || state.sessionGoal || 10;
    const pct = Math.min(100, Math.round((state.sessionDone || 0) / t * 100));
    const ring = document.getElementById('session-ring');
    if (ring) ring.style.setProperty('--pct', pct + '%');
    const txt = document.getElementById('session-ring-txt');
    if (txt) txt.textContent = Math.min(state.sessionDone || 0, t) + '/' + t;
    const lbl = document.getElementById('session-label');
    if (lbl) lbl.textContent = uiT('sessionLabel');
    document.querySelectorAll('#session-goal-group .goal-btn').forEach(b => b.classList.toggle('active', +b.dataset.goal === state.sessionGoal));
}
function showSessionDone() {
    const d = document.getElementById('session-done');
    const c = document.getElementById('sentence-card');
    if (!d) return;
    const set = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
    set('sd-title', uiT('sessionDoneTitle'));
    let txt = uiT('sessionDoneText').replace('{n}', state.sessionDone);
    try {
        const s = window.HuayuStats && HuayuStats.getSummary && HuayuStats.getSummary();
        if (s && s.streak > 0) txt += ' ' + uiT('sessionStreak').replace('{n}', s.streak).replace('días', s.streak === 1 ? 'día' : 'días');
        // v9.62: calidad de la sesión (Gagné 8) — todayA (stats.js, aciertos
        // observados hoy vía delta de score) vs. state.sessionDone (tarjetas
        // calificadas hoy, incluye "Otra vez"). No toca checkAnswer/SRS: son
        // dos contadores día-scoped ya existentes, solo se combinan acá.
        if (s && typeof s.todayA === 'number' && state.sessionDone > 0) {
            const bien = Math.min(s.todayA, state.sessionDone);
            const repasar = Math.max(0, state.sessionDone - bien);
            txt += ' ' + uiT('sessionQuality').replace('{a}', bien).replace('{r}', repasar);
        }
    } catch (e) { /* sin stats */ }
    set('sd-text', txt);
    set('btn-session-more', uiT('sessionMore').replace('{n}', state.sessionGoal));
    set('btn-session-done', uiT('sessionClose'));
    d.classList.remove('hidden');
    if (c) c.classList.add('hidden');
    try { d.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { /* noop */ }
    const m = document.getElementById('btn-session-more');
    if (m) { try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); } }
}
// v9.62: Gagné evento 3 (activar conocimiento previo) — al abrir "Hoy",
// si hubo una sesión anterior (dato de stats.js, sin tracking nuevo) se
// muestra una línea breve. Sin sesión previa o sin datos: queda oculto
// (fallback silencioso, no toca getFiltered/checkAnswer/SRS/mazo).
function renderLastSessionNote() {
    const el = document.getElementById('last-session-note');
    if (!el) return;
    try {
        const ls = window.HuayuStats && HuayuStats.getLastSession && HuayuStats.getLastSession();
        if (ls && ls.a > 0) {
            el.textContent = uiT('lastSession').replace('{n}', ls.a);
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    } catch (e) { el.classList.add('hidden'); }
}
function hideSessionDone(more) {
    const d = document.getElementById('session-done');
    const c = document.getElementById('sentence-card');
    if (more) state.sessionTarget = (state.sessionTarget || state.sessionGoal) + state.sessionGoal;
    saveSession();
    if (d) d.classList.add('hidden');
    if (c) c.classList.remove('hidden');
    updateSessionUI();
    if (more) focusAnswerInput();
}
function setupSessionUI() {
    loadSession();
    document.querySelectorAll('#session-goal-group .goal-btn').forEach(b => b.addEventListener('click', () => {
        state.sessionGoal = +b.dataset.goal;
        if (state.sessionDone < state.sessionGoal || state.sessionTarget < state.sessionGoal) state.sessionTarget = state.sessionGoal;
        saveSession();
        updateSessionUI();
    }));
    // v9.48: Ajustes → Tolerancia de trazos (leniency de HanziWriter)
    const lenGrp = document.getElementById('stroke-leniency-group');
    if (lenGrp) lenGrp.addEventListener('click', (e) => {
        const b = e.target.closest('.len-btn');
        if (b) setLeniencyLevel(b.dataset.lv);
    });
    const m = document.getElementById('btn-session-more');
    if (m) m.addEventListener('click', () => hideSessionDone(true));
    const dn = document.getElementById('btn-session-done');
    if (dn) dn.addEventListener('click', () => hideSessionDone(false));
    updateSessionUI();
    updateHeaderStreak();
}
function updateHeaderStreak() {
    try {
        const s = window.HuayuStats && HuayuStats.getSummary && HuayuStats.getSummary();
        const el = document.getElementById('header-streak');
        const n = document.getElementById('header-streak-n');
        if (!el || !n) return;
        if (s && s.streak > 0) {
            n.textContent = s.streak;
            el.classList.remove('hidden');
            el.classList.toggle('at-risk', !!s.streakRisk);
        } else el.classList.add('hidden');
    } catch (e) { /* sin stats */ }
}

// ---- navegación inferior (4 vistas) ----
const APP_VIEWS = ['aprender', 'hoy', 'entrenar', 'yo'];
function showView(name, save) {
    if (APP_VIEWS.indexOf(name) === -1) name = 'aprender';
    APP_VIEWS.forEach(v => { const sec = document.getElementById('view-' + v); if (sec) sec.classList.toggle('hidden', v !== name); });
    document.querySelectorAll('#app-nav .nav-btn').forEach(b => {
        const on = b.dataset.view === name;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
    });
    if (save !== false) {
        try { localStorage.setItem('ac_view_v1', name); } catch (e) { /* noop */ }
        try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) { window.scrollTo(0, 0); }
    }
}
function rovingTabs(container, sel, activate) {
    container.addEventListener('keydown', (e) => {
        const tabs = Array.from(container.querySelectorAll(sel)).filter(t => t.offsetParent !== null);
        const i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        let j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = tabs.length - 1;
        if (j === null) return;
        e.preventDefault();
        tabs[j].focus();
        activate(tabs[j]);
    });
}
function setupAppNav() {
    const nav = document.getElementById('app-nav');
    if (!nav) return;
    nav.addEventListener('click', (e) => { const b = e.target.closest('.nav-btn'); if (b) showView(b.dataset.view); });
    rovingTabs(nav, '.nav-btn', (b) => showView(b.dataset.view));
    const mt = document.getElementById('module-tabs');
    if (mt) rovingTabs(mt, '.mtab', (b) => b.click());
    let saved = null;
    try { saved = localStorage.getItem('ac_view_v1'); } catch (e) { /* noop */ }
    showView(saved || 'aprender', false);
}
// v9.50: varios overlays fullscreen pueden apilarse (lección → ficha de palabra →
// práctica de trazos). Cada uno ponía body.overflow='' al cerrarse, así que
// cerrar el de arriba desbloqueaba el scroll de la página detrás de los de abajo.
// Ahora el bloqueo se recalcula según lo que siga abierto.
function syncBodyScroll() {
    let open = false;
    try {
        open = !!document.querySelector('.lq-pop:not(.hidden), #writer-practice-banner:not(.hidden), #handwrite-banner:not(.hidden)');
    } catch (e) { /* selector no soportado */ }
    try { document.body.style.overflow = open ? 'hidden' : ''; } catch (e) { /* noop */ }
}
// v9.50: capas que se dibujan POR ENCIMA de los overlays de lecciones/clásicos/
// pares mínimos/repaso/test. Con una abierta, Escape debe cerrar solo esa capa
// (antes cerraba también el overlay de abajo en el mismo toque).
function topLayerOpen() {
    return ['vocab-pop', 'writer-practice-banner', 'handwrite-banner', 'tone-legend-pop'].some((id) => {
        const el = document.getElementById(id);
        return !!el && !el.classList.contains('hidden');
    });
}
// ===== fin v10 UX =====

// ============================================================
// v9.47 — ESTADÍSTICAS DE PRÁCTICA (cero invasión, pura lectura
// para el alumno): (1) contador de intentos por TARJETA — cada vez
// que una tarjeta se resuelve (correcto / mal / revelar) se suma un
// "pase" con sus intentos; el chip 🎯 de la cabecera muestra cuántas
// veces la practicaste y cuántas salieron al primer intento.
// (2) estadística de TRAZOS por hanzi — los dos banners de escritura
// (práctica v7.13 y respuesta a mano v9.34) reportan errores de
// trazo, pistas y quizzes completados por carácter; el popup de
// rachas (stats.js) muestra tus hanzi más difíciles y los deja
// practicar con un toque.
// Almacenamiento: claves ac_* → viajan solas en el respaldo JSON
// (backupCollect incluye /^ac_/) y se borran con 🗑️ Borrar progreso.
// Nunca bloquean nada: todo en try/catch, si falla el storage la
// app sigue igual (filosofía de la casa).
// ============================================================
const ATTEMPTS_KEY = 'ac_attempts_v1';
const HANZI_STATS_KEY = 'ac_hanzi_stats_v1';

function attemptsDbRead(key) {
    try {
        const o = JSON.parse(localStorage.getItem(key) || 'null');
        return o || null;
    } catch (e) { return null; }
}

// Identidad canónica de una tarjeta (misma convención v8.1 del resto
// de la app: palabra → hanzi simplificado; oración → prefijo s: para
// que una palabra y una oración con la misma respuesta no se mezclen).
function cardKeyOf(s) {
    if (!s) return null;
    const k = ck();
    if (s.w) {
        const w = String(s.chinese_simp_answer || s['chinese_' + k + '_answer'] || '').trim();
        return w ? 'w:' + w : null;
    }
    const a = String(s.chinese_simp_answer || s['chinese_' + k + '_answer'] || s.spanish_answer || '').trim();
    return a ? 's:' + a : null;
}

// Registra un pase resuelto de la tarjeta: tries = intentos gastados
// en este pase (1 = al primer intento), res = 'ok' | 'ko' | 'rv'.
function recordCardAttempt(s, tries, res) {
    const key = cardKeyOf(s);
    if (!key) return;
    let db = attemptsDbRead(ATTEMPTS_KEY);
    if (!db || db.v !== 1 || !db.cards) db = { v: 1, cards: {} };
    const r = db.cards[key] || { n: 0, ok: 0, ft: 0, last: '', lr: '' };
    r.n++;
    if (res === 'ok') { r.ok++; if (tries <= 1) r.ft++; }
    r.last = sessionToday();
    r.lr = res === 'ok' ? 'ok' : (res === 'rv' ? 'rv' : 'ko');
    db.cards[key] = r;
    try { localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(db)); } catch (e) { /* sin storage: la app sigue */ }
}

// Lo que muestra el chip 🎯 para la tarjeta dada (null = nunca vista).
function attemptsBadgeFor(s) {
    const key = cardKeyOf(s);
    if (!key) return null;
    const db = attemptsDbRead(ATTEMPTS_KEY);
    const r = db && db.v === 1 && db.cards ? db.cards[key] : null;
    return (r && r.n) ? { n: r.n, ok: r.ok, ft: r.ft, lr: r.lr } : null;
}

// Suma 1 a un campo de un hanzi. Campos: t = quiz iniciado,
// m = error de trazo (onMistake), h = pista 💡 usada, q = quiz completo.
function hanziStatsBump(ch, field) {
    const c = String(ch == null ? '' : ch);
    if (!c || !READER_HANZI.test(c) || c.length !== 1) return; // solo hanzi de un carácter
    if (['t', 'm', 'h', 'q'].indexOf(field) === -1) return;
    let db = attemptsDbRead(HANZI_STATS_KEY);
    if (!db || db.v !== 1 || !db.chars) db = { v: 1, chars: {} };
    const r = db.chars[c] || { t: 0, m: 0, h: 0, q: 0 };
    r[field] = (r[field] || 0) + 1;
    db.chars[c] = r;
    try { localStorage.setItem(HANZI_STATS_KEY, JSON.stringify(db)); } catch (e) { /* silencioso */ }
}
// ===== fin v9.47 estadísticas de práctica =====

// ============================================================
// v9.48 — INTENTOS EN EL MAZO + LENIENCY MANUAL
// (1) recordSrsAttempt: el repaso del mazo registra sus pases en la MISMA
//     base ac_attempts_v1 que la práctica (identidad 'w:' + hanzi
//     simplificado — la tarjeta del mazo ES una palabra: repasar 谢谢 y
//     practicar 谢谢 comparten contador). El pase cierra al REVELAR:
//     ok = retrieval/producción resuelta antes de mirar · ko = producción
//     mal · rv = revelada sin acierto verificable ("No lo sé" o reveal
//     directo). "Otra vez" re-encola → nuevo pase → nuevo registro.
// (2) Leniency manual: Ajustes → Tolerancia de trazos. Es la CUÁNTO puede
//     desviarse un trazo dibujado y aún contar como bien (HanziWriter
//     mide ~350·leniency px en espacio de datos). Tres niveles, práctica/
//     memoria: estricta 1.2/1.6 · normal 1.6/2.0 (los fijos del v9.35) ·
//     permisiva 2.2/2.8. Clave ac_leniency_v1: viaja en el respaldo
//     (/^ac_/) y SOBREVIVE a 🗑️ Borrar progreso (es preferencia, como el
//     tema). Aplica al montar el PRÓXIMO carácter (cada carácter crea su
//     writer). Nunca bloquea nada: try/catch, si falla la app sigue.
// ============================================================
function recordSrsAttempt(zh, tries, res) {
    const w = String(zh || '').trim();
    if (!w || w.length > 20) return; // identidad inválida → silencio
    const key = 'w:' + w;
    let db = attemptsDbRead(ATTEMPTS_KEY);
    if (!db || db.v !== 1 || !db.cards) db = { v: 1, cards: {} };
    const r = db.cards[key] || { n: 0, ok: 0, ft: 0, last: '', lr: '' };
    r.n++;
    if (res === 'ok') { r.ok++; if (tries <= 1) r.ft++; }
    r.last = sessionToday();
    r.lr = res === 'ok' ? 'ok' : (res === 'rv' ? 'rv' : 'ko');
    db.cards[key] = r;
    try { localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(db)); } catch (e) { /* sin storage: la app sigue */ }
}

const LENIENCY_KEY = 'ac_leniency_v1';
const LENIENCY_LEVELS = [
    { id: 'strict',  wp: 1.2, hw: 1.6 },
    { id: 'normal',  wp: 1.6, hw: 2.0 },
    { id: 'lenient', wp: 2.2, hw: 2.8 }
];
function leniencyLevel() {
    try {
        const v = localStorage.getItem(LENIENCY_KEY);
        return LENIENCY_LEVELS.some((l) => l.id === v) ? v : 'normal';
    } catch (e) { return 'normal'; }
}
// kind: 'practice' (banner con contorno, v7.16) | 'memory' (de memoria, v9.34)
function strokeLeniency(kind) {
    const l = LENIENCY_LEVELS.filter((x) => x.id === leniencyLevel())[0] || LENIENCY_LEVELS[1];
    return kind === 'memory' ? l.hw : l.wp;
}
function setLeniencyLevel(id) {
    if (!LENIENCY_LEVELS.some((l) => l.id === id)) return;
    try { localStorage.setItem(LENIENCY_KEY, id); } catch (e) { /* sin storage: la app sigue */ }
    applyLeniencyUI();
}
// Estado visual del grupo en Ajustes + tooltip según idioma. Se llama en el
// arranque (vía updateUILanguage) y en cada cambio (vía setLeniencyLevel).
function applyLeniencyUI() {
    const grp = document.getElementById('stroke-leniency-group');
    if (!grp) return;
    const cur = leniencyLevel();
    grp.querySelectorAll('.len-btn').forEach((b) => b.classList.toggle('active', b.dataset.lv === cur));
    const lbl = document.querySelector('[data-i18n="setStrokes"]');
    if (lbl) lbl.title = uiT('lenTitle');
    grp.title = uiT('lenTitle');
}
// ===== fin v9.48 =====

function markWord(known) {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // v8.1: palabras → el hanzi es la identidad canónica (coherente con
    // checkAnswer); v9.0: oraciones también registran el hanzi SIMPLIFICADO
    // canónico (antes usaban el guion activo → 謝謝 en vez de 谢谢).
    let answer = s.w
        ? String(s.chinese_simp_answer || s['chinese_' + k + '_answer']).trim()
        : (learningChinese ? String(s.chinese_simp_answer || s['chinese_' + k + '_answer']).trim() : s.spanish_answer);

    if (known) {
        state.knownWords.add(answer);
        state.newWords.delete(answer);
    } else {
        state.newWords.add(answer);
        state.knownWords.delete(answer);
        if (typeof window.acSrsMiss === 'function') window.acSrsMiss(s); // v7.21: "🔄 Repetir" también alimenta el mazo
    }
    rememberWordContext([answer], s); // v7.13: contexto de la oración actual

    saveProgress();
    updateStats();
    updateVocabularyPanel();
    nextSentence();
}

function nextSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    state.currentIndex = (state.currentIndex + 1) % filtered.length;
    saveProgress();
    renderCurrentSentence();
}

function showFeedback(msg, type, extraHtml) {
    const el = document.getElementById('feedback');
    if (!el) return;
    el.textContent = msg;
    if (extraHtml) {
        const d = document.createElement('div');
        d.className = 'fb-diff';
        d.innerHTML = extraHtml;
        el.appendChild(d);
    }
    el.className = 'feedback ' + type;
    el.classList.remove('hidden');
}

function hideFeedback() {
    document.getElementById('feedback').classList.add('hidden');
}

function updateStats() {
    document.getElementById('stats-known').textContent = uiT('statsKnown') + state.knownWords.size;
    document.getElementById('stats-new').textContent = uiT('statsNew') + state.newWords.size;
}

function updateVocabularyPanel() {
    const list = document.getElementById('vocab-list');
    list.innerHTML = '';
    const mk = (w, cls) => {
        const el = document.createElement('span');
        el.className = 'vocab-item ' + cls;
        el.textContent = w;
        el.dataset.word = w;
        el.setAttribute('title', 'Tocá para ver la traducción');
        list.appendChild(el);
    };
    state.knownWords.forEach(w => mk(w, 'known'));
    state.newWords.forEach(w => mk(w, ''));
}

// El motor de diccionario (vocabDict, wordHitDict, dictMini*, lookupVocab,
// isZhText, wordPinyin, etc.) ahora vive en dict.js, cargado después de
// este archivo en index.html (necesita EMBEDDED_SENTENCES/EMBEDDED_MODULE_DATA
// definidos arriba). Lo que sigue acá es el popup que dibuja sus resultados.

// Ejemplo EN CHINO de una lección (respeta 简/繁 elegido) + pinyin + apoyo ES
function vpZhExampleHtml(rec, word) {
    let h = '';
    const ejemploZh = (ck() === 'trad' ? (rec.fullZhTrad || rec.fullZhSimp) : (rec.fullZhSimp || rec.fullZhTrad)) || '';
    if (ejemploZh && ejemploZh !== word) {
        h += '<div class="vp-example">🇨🇳 ' + escHtml(ejemploZh) + '</div>';
        const pyEj = rec.pinyin || wordPinyin(ejemploZh);
        if (pyEj) h += '<div class="vp-example-py">📖 ' + escHtml(pyEj) + '</div>';
        if (rec.fullEs) h += '<div class="vp-example-alt">🇪🇸 “' + escHtml(rec.fullEs) + '”</div>';
    }
    return h;
}

// Ejemplo EN ESPAÑOL de una lección + apoyo en chino con pinyin
function vpEsExampleHtml(rec, word) {
    let h = '';
    if (rec.fullEs && rec.fullEs !== word) {
        h += '<div class="vp-example">🇪🇸 “' + escHtml(rec.fullEs) + '”</div>';
    }
    const apoyoZh = (ck() === 'trad' ? (rec.fullZhTrad || rec.fullZhSimp) : (rec.fullZhSimp || rec.fullZhTrad)) || '';
    if (apoyoZh) {
        const pyAp = wordPinyin(apoyoZh) || rec.pinyin;
        h += '<div class="vp-example-alt">🇨🇳 ' + escHtml(apoyoZh) + (pyAp ? ' <span class="vp-example-py-inline">(' + escHtml(pyAp) + ')</span>' : '') + '</div>';
    }
    return h;
}

// Traducción directa ES→ZH (respuesta exacta tocada desde el modo español)
function vpEsExactHtml(rec, word) {
    let h = '';
    let zhLine = rec.zhSimp ? escHtml(rec.zhSimp) : '';
    if (rec.zhTrad && rec.zhTrad !== rec.zhSimp) zhLine += ' <span class="vp-trad">(' + escHtml(rec.zhTrad) + ')</span>';
    if (zhLine) h += '<div class="vp-trans">🇨🇳 ' + zhLine + '</div>';
    const py = wordPinyin(rec.zhSimp) || rec.pinyin;
    if (py) h += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
    h += vpEsExampleHtml(rec, word);
    return h;
}

function showVocabPop(word) {
    const pop = document.getElementById('vocab-pop');
    const body = document.getElementById('vocab-pop-body');
    if (!pop || !body) return;
    const w = String(word || '').trim();
    body.dataset.word = w; // v7.16: la práctica grande necesita la palabra tocada
    const zh = isZhText(w);
    const hit = lookupVocab(w);
    const rec = hit.rec;
    let html = '<div class="vp-word">' + escHtml(w) + '</div>';
    if (zh) {
        // Palabra china: pinyin SIEMPRE — v7.12: si hay entrada de diccionario
        // (dict-mini) su pinyin de diccionario va primero (tonos neutros reales)
        const py = (hit.level === 'dict' && hit.py) || wordPinyin(w) || (rec ? rec.pinyin : '');
        if (py) html += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
    }
    if (hit.level === 'exact') {
        // Respuesta exacta: EXACTAMENTE lo mismo que mostraba siempre
        if (zh) {
            if (rec && rec.es) html += '<div class="vp-trans">🇪🇸 ' + escHtml(rec.es) + '</div>';
            // v7.12: la ficha de la lección + sentidos extra del diccionario si suman
            const dX = dictMiniLookup(w);
            if (dX && dX.def && (!rec || !rec.es || rec.es.toLowerCase() !== dX.def.toLowerCase())) {
                html += '<div class="vp-def">📖 ' + escHtml(dX.def) + '</div>';
            }
            if (rec) html += vpZhExampleHtml(rec, w);
        } else if (rec) {
            html += vpEsExactHtml(rec, w);
        }
    } else if (hit.level === 'dict') {
        // v7.12 Capa 4: definición breve del diccionario offline (dict-mini.js)
        if (hit.def) html += '<div class="vp-def">🇪🇸 ' + escHtml(hit.def) + '</div>';
        if (hit.rec) html += '<div class="vp-note">🔎 También aparece en una lección:</div>' + vpZhExampleHtml(hit.rec, '');
    } else if (hit.level === 'dict-es') {
        // v7.12 Capa 4: candidatos chinos para una palabra española
        html += '<div class="vp-note">📖 Diccionario' + (hit.lemma ? ' (lema «' + escHtml(hit.lemma) + '»)' : '') + ':</div>';
        hit.items.forEach(it => {
            html += '<div class="vp-dict-es-row"><span class="vp-dict-zh">🇨🇳 ' + escHtml(it.z) + '</span>'
                + (it.py ? ' <span class="vp-dict-py">(' + escHtml(it.py) + ')</span>' : '')
                + ' <span class="vp-dict-def">— ' + escHtml(it.def) + '</span></div>';
        });
        if (hit.rec) html += vpEsExampleHtml(hit.rec, '');
    } else if (hit.level === 'lemma') {
        // v7.10 Capa 2: tocó una conjugación/plural → ficha del LEMA
        if (rec && rec.es) html += '<div class="vp-trans">🇪🇸 ' + escHtml(rec.es) + '</div>';
        html += '<div class="vp-note">🔎 Por el lema «' + escHtml(hit.lemma) + '»</div>';
        html += vpEsExampleHtml(rec, '');
    } else if (hit.level === 'hit') {
        // v7.10 Capa 1: la palabra vive dentro del texto de una lección.
        // Honestidad: se muestra la lección como contexto, NO como traducción 1:1.
        html += '<div class="vp-note">🔎 Aparece en una lección' + (hit.lemma ? ' (lema «' + escHtml(hit.lemma) + '»)' : '') + ':</div>';
        html += zh ? vpZhExampleHtml(rec, '') : vpEsExampleHtml(rec, '');
    } else if (hit.level === 'chars') {
        // v7.10 Capa 3: desglose carácter a carácter
        html += '<div class="vp-note">🔤 Carácter por carácter:</div><div class="vp-chars">';
        hit.parts.forEach(p => {
            html += '<div class="vp-char-row"><span class="vp-char">' + escHtml(p.ch) + '</span>'
                + (p.py ? '<span class="vp-char-py">' + escHtml(p.py) + '</span>' : '')
                + (p.rec && p.rec.es ? '<span class="vp-char-es">🇪🇸 ' + escHtml(p.rec.es) + '</span>' : '')
                + '</div>';
        });
        html += '</div>';
    } else {
        html += '<div class="vp-missing">🤔 No tengo la traducción de esta palabra en este módulo. Cargá el módulo donde la aprendiste y volvé a tocarla.</div>';
    }
    // v7.13: contexto guardado al marcar la palabra ("tu ejemplo").
    // Palabras viejas sin contexto → no hay sección (compatibilidad hacia atrás).
    const ctx = state.wordContexts[w];
    if (ctx) {
        const zhCtx = ck() === 'trad' ? (ctx.zt || ctx.zh) : (ctx.zh || ctx.zt);
        let inner = '';
        if (zhCtx) inner += '<div class="vp-ctx-zh">🇨🇳 ' + escHtml(zhCtx)
            + (zh && ctx.py ? ' <span class="vp-ctx-py">(' + escHtml(ctx.py) + ')</span>' : '') + '</div>';
        if (ctx.es) inner += '<div class="vp-ctx-es">🇪🇸 “' + escHtml(ctx.es) + '”</div>';
        if (inner) html += '<div class="vp-ctx"><div class="vp-ctx-title">📌 Tu ejemplo (donde la marcaste)</div>' + inner + '</div>';
    }
    // v7.13: ORDEN DE TRAZOS (Hanzi Writer) — solo palabras CHINAS.
    // En modo CN→ES la palabra es española → sin sección de trazos: queda la
    // palabra grande + ejemplo + traducción al chino (diccionario inverso).
    if (zh) {
        let chars = [];
        for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
        if (chars.length) {
            html += '<div class="vp-strokes" id="vp-strokes">'
                + '<div class="vp-strokes-title">✍️ Orden de trazos</div>'
                + '<div class="vp-stroke-row">'
                + chars.slice(0, VP_STROKES_MAX).map(ch =>
                    '<div class="vp-stroke-char loading"><div class="vp-stroke-target" data-char="' + escHtml(ch) + '"></div></div>'
                  ).join('')
                + '</div>'
                + (chars.length > VP_STROKES_MAX ? '<div class="vp-stroke-note">…y ' + (chars.length - VP_STROKES_MAX) + ' carácter(es) más</div>' : '')
                + '<div class="vp-stroke-btns">'
                + '<button type="button" class="vp-stroke-btn vp-stroke-anim">▶ Animar</button>'
                + '<button type="button" class="vp-stroke-btn vp-stroke-quiz">✍ Practicar</button>'
                + '</div>'
                + '<div class="vp-stroke-hint">Tocá ✍ Practicar para pasar a la pantalla grande y trazar con el dedo</div>'
                + '</div>';
        }
    }
    // v7.21: botón "Sumar a mi repaso" (SRS) para palabras chinas.
    // El handler delegado vive en la IIFE srsInit (final de app.js).
    if (zh && typeof window.acSrsHas === 'function') {
        const inDeck = !!window.acSrsHas(w);
        html += '<button type="button" class="vp-srs-add' + (inDeck ? ' is-in' : '') + '">'
            + (inDeck ? '✓ Ya está en tu repaso' : '🔁 Sumar a mi repaso') + '</button>';
    }
    body.innerHTML = html;
    pop.classList.remove('hidden');
    if (zh) mountVpStrokes(w); // v7.13: carga lazy del motor + instancias por carácter
}

function hideVocabPop() {
    // v7.13: corta quizzes/animaciones y montajes en curso de Hanzi Writer
    vpStrokes.gen++;
    vpStrokes.writers.forEach(wr => { try { if (wr.cancelQuiz) wr.cancelQuiz(); } catch (e) {} });
    vpStrokes.writers = [];
    vpStrokes.boxes = [];
    const pop = document.getElementById('vocab-pop');
    if (pop) pop.classList.add('hidden');
}

// El motor de trazos con Hanzi Writer (orden de trazos, práctica con el
// dedo, respuesta a mano) ahora vive en trazos.js, cargado después de
// este archivo en index.html. showVocabPop/hideVocabPop siguen acá y
// llaman a mountVpStrokes/vpStrokes igual que antes.

function resetProgress() {
    if (!confirm('¿Borrar todo el progreso guardado?')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ATTEMPTS_KEY);   // v9.47: el contador de intentos también se borra
    localStorage.removeItem(HANZI_STATS_KEY); // v9.47: la estadística de trazos también se borra
    if (typeof window.acSrsReset === 'function') window.acSrsReset(); // v7.21: el mazo de repaso también se borra
    state.knownWords = new Set();
    state.newWords = new Set();
    state.wordContexts = {}; // v7.13
    state.score = 0;
    state.currentIndex = 0;
    showToneColors = false;
    updateStats();
    updateVocabularyPanel();
    renderCurrentSentence();
    applySavedUI();
}

// ===== Audio Global =====
// Todo el bloque de audio/TTS (globalAudioPlayer, fetchTTS, playAudio,
// cycleSpeed, cycleVoice, etc.) vive ahora en audio-tts.js, cargado antes
// que este archivo en index.html — las funciones siguen siendo globales.

// El Lector de texto libre (readerAudio, stopReader, toggleReaderPlay,
// readCurrentLesson, buildReaderLibrary, renderReaderPreview, escHtml,
// etc.) ahora vive en reader.js, cargado después de este archivo en
// index.html — misma API, mismos llamadores.

// ===== Tema: claro · papel de arroz · oscuro (v9.4) =====
// Ciclo 🌙 → 🏮 → ☀️ : el botón muestra el ícono del PRÓXIMO tema.
// 'paper' redefine las variables CSS con crema/ámbar (cálido, para
// sesiones largas) sin perder legibilidad ni los colores de tonos.
const THEME_SEQ = ['light', 'paper', 'dark'];
const THEME_NEXT_ICON = { light: '🏮', paper: '🌙', dark: '☀️' }; // ícono del tema al que se pasa
const THEME_NAME = { light: 'claro', paper: 'papel de arroz 🏮', dark: 'oscuro' };
const themeBtn = document.getElementById('btn-theme');
function applyTheme(t) {
    document.body.classList.toggle('dark-mode', t === 'dark');
    document.body.classList.toggle('paper-mode', t === 'paper');
    if (themeBtn) {
        const nxt = THEME_SEQ[(THEME_SEQ.indexOf(t) + 1) % THEME_SEQ.length];
        themeBtn.textContent = THEME_NEXT_ICON[t] || '🌙';
        themeBtn.title = 'Tema: ' + (THEME_NAME[t] || t) + ' (clic → ' + (THEME_NAME[nxt] || nxt) + ')';
    }
}
let curTheme = voiceValid(lsGet('theme'), THEME_SEQ); // reutiliza validador genérico
applyTheme(curTheme);
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        curTheme = THEME_SEQ[(THEME_SEQ.indexOf(curTheme) + 1) % THEME_SEQ.length];
        try { localStorage.setItem('theme', curTheme); } catch (e) { /* sin storage */ }
        applyTheme(curTheme);
        applyToneScheme(); // los esquemas preset tienen variante oscura (Okabe-Ito)
    });
}

// ===== Utilidad Pinyin (Opcional, por si se necesita en el futuro) =====
function splitGroupedPinyin(word) {
    if (!word) return [];
    const syllables = [];
    let currentSyllable = '';
    for (const char of word) {
        const isTonedVowel = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(char);
        if (isTonedVowel && currentSyllable.length > 0 && /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/.test(currentSyllable.slice(-1))) {
             if (/[āáǎàēéěèīíǐìōóòūúǔùǘǚǜ]/.test(currentSyllable)) {
                 syllables.push(currentSyllable);
                 currentSyllable = char;
                 continue;
             }
        }
        currentSyllable += char;
    }
    if (currentSyllable) syllables.push(currentSyllable);
    return syllables.length > 0 ? syllables : [word];
}

// ===== PWA: botón "📲 Instalar app" + guía de instalación + indicador offline =====
// El botón está SIEMPRE visible (salvo que la app ya esté instalada).
// Si el navegador dispara beforeinstallprompt → instalación nativa.
// Si no (algunas versiones de Chrome lo retarden o lo omiten) → muestra
// una guía con los pasos exactos según el dispositivo.
(function setupPWA() {
    const btn = document.getElementById('btn-install');
    const pill = document.getElementById('offline-pill');
    const help = document.getElementById('install-help');
    let deferredPrompt = null;

    const ua = navigator.userAgent || '';
    const isIOS = /iphone|ipad|ipod/i.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /android/i.test(ua);
    const isOperaDesktop = /OPR\/|Opera/i.test(ua) && !isAndroid && !isIOS;

    // Clave de plataforma (Opera Android cae en 'android': su menú también
    // tiene "Añadir a pantalla de inicio"). Función pura para poder probarla
    // con UAs falsas desde la consola (__pwaDebug.detectaUA).
    function detectaUA(s) {
        s = String(s || '');
        if (/android/i.test(s)) return 'android';
        if (/iphone|ipad|ipod/i.test(s)) return 'ios';
        if (/OPR\/|Opera/i.test(s)) return 'opera';
        return 'desktop';
    }
    function platformKey() {
        if (isAndroid) return 'android';
        if (isIOS) return 'ios';
        if (isOperaDesktop) return 'opera';
        return 'desktop';
    }
    const alreadyStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

    function showHelp(show) {
        if (help) help.classList.toggle('hidden', !show);
    }

    const closeBtn = document.getElementById('btn-install-help-close');
    if (closeBtn) closeBtn.addEventListener('click', () => showHelp(false));
    if (help) {
        help.addEventListener('click', (e) => { if (e.target === help) showHelp(false); });
    }

    function highlightPlatform() {
        if (!help) return;
        const key = platformKey();
        help.querySelectorAll('[data-platform]').forEach((col) => {
            col.classList.toggle('install-help-active', col.getAttribute('data-platform') === key);
        });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        if (alreadyStandalone) return;
        deferredPrompt = e;
        console.log('[PWA] El navegador confirma: la app es instalable ✅');
        if (btn) btn.classList.remove('hidden');
    });

    if (btn) {
        if (!alreadyStandalone) {
            // pequeño delay para darle prioridad al diálogo nativo si viene
            setTimeout(() => btn.classList.remove('hidden'), 1500);
        }
        btn.addEventListener('click', async () => {
            if (deferredPrompt) {
                btn.textContent = '⏳ Instalando…';
                let outcome = 'dismissed';
                try {
                    deferredPrompt.prompt();
                    // seguro anti-cuelgue: algunos navegadores raros nunca resuelven
                    const choice = await Promise.race([
                        deferredPrompt.userChoice,
                        new Promise((res) => setTimeout(() => res(null), 30000))
                    ]);
                    if (choice && choice.outcome) outcome = choice.outcome;
                    else outcome = 'timeout'; // v9.50: venció el seguro anti-cuelgue sin respuesta
                } catch (err) { /* usuario canceló o diálogo no disponible */ }
                deferredPrompt = null;
                btn.textContent = uiT('installApp');
                // v9.50: antes 'timeout' nunca se asignaba y el botón se ocultaba igual
                if (outcome !== 'timeout') btn.classList.add('hidden');
                return;
            }
            // Sin diálogo nativo disponible → guía paso a paso
            highlightPlatform();
            showHelp(true);
        });
    }

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (btn) btn.classList.add('hidden');
        showHelp(false);
        console.log('[PWA] ¡App instalada! 🎉');
    });

    function updatePill() {
        if (!pill) return;
        pill.classList.toggle('hidden', navigator.onLine);
    }
    window.addEventListener('online', updatePill);
    window.addEventListener('offline', updatePill);
    updatePill();

    // gancho de diagnóstico (consola): __pwaDebug
    window.__pwaDebug = {
        showHelp: showHelp,
        hayDialogoNativo: function () { return !!deferredPrompt; },
        plataforma: platformKey,
        detectaUA: detectaUA
    };
})();

// ============================================================
// ✍️ Generador de planillas de escritura 写字 (v6.5)
// Hoja A4 para imprimir con el formato XieZi: celda modelo +
// secuencia de trazos progresivos (gris) + celdas vacías con
// cruz guía. Datos de trazos: hanzi-writer-data vía CDN —
// el Service Worker los cachea → funcionan offline después
// del primer uso. Sin datos de red, la hoja se genera igual
// (carácter modelo con la fuente del sistema).
// ============================================================
const PZ_MEM = new Map();               // char → datos|null (memoria de sesión)
let pzTrazos = lsGet('ac_pz_trazos') !== '0';   // default ON
// v9.1: estilo de hoja — 'clasica' (de siempre) o 'cuaderno' (筆順 + 寫字 como la referencia)
let pzStyle = lsGet('ac_pz_style') === 'cuaderno' ? 'cuaderno' : 'clasica';
let pzCells = parseInt(lsGet('ac_pz_cells'), 10) || 12;
let pzLastSheet = '';                   // HTML de la última hoja generada

function pzIsHan(ch) {
    const c = ch.codePointAt(0);
    return (c >= 0x3400 && c <= 0x9FFF) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0x20000 && c <= 0x2FA1F);
}

// Extrae caracteres han únicos (en orden de aparición), tope 40 por hoja
function pzParseInput(str) {
    const seen = new Set();
    const out = [];
    for (const ch of String(str || '')) {
        if (!pzIsHan(ch) || seen.has(ch)) continue;
        seen.add(ch);
        out.push(ch);
        if (out.length >= 40) break;
    }
    return out;
}

// Descarga los datos de trazos de un carácter (2 CDNs de respaldo)
async function pzFetchChar(ch) {
    if (PZ_MEM.has(ch)) return PZ_MEM.get(ch);
    const urls = [
        'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/' + ch + '.json',
        'https://unpkg.com/hanzi-writer-data@2.0/' + ch + '.json'
    ];
    for (const u of urls) {
        try {
            const r = await fetch(u, { mode: 'cors' });
            if (r.ok) {
                const d = await r.json();
                if (d && Array.isArray(d.strokes) && d.strokes.length) {
                    PZ_MEM.set(ch, d);
                    return d;
                }
            }
        } catch (e) { /* probá el próximo CDN */ }
    }
    PZ_MEM.set(ch, null);
    return null;
}

// SVG del carácter con los primeros `upto` trazos (formato Make Me a Hanzi).
// v9.1: lastFill pinta el TRAZO NUEVO de cada etapa más oscuro — se ve qué
// trazo se agrega (antes todas las etapas eran el mismo gris clarito).
function pzSvg(data, upto, fill, lastFill) {
    const n = data.strokes.length;
    const k = Math.max(1, Math.min(upto || n, n));
    let paths = '';
    for (let i = 0; i < k; i++) {
        const f = (lastFill && i === k - 1 && k > 1) ? lastFill : fill;
        paths += '<path d="' + data.strokes[i] + '" fill="' + f + '"/>';
    }
    // width/height explícitos: el CSS de la celda los pisa (86%), pero
    // html2canvas necesita tamaño intrínseco para rasterizar el SVG.
    return '<svg viewBox="0 0 1024 1024" width="1024" height="1024" aria-hidden="true"><g transform="scale(1, -1) translate(0, -900)">' + paths + '</g></svg>';
}

function pzStatus(msg, isError) {
    const el = document.getElementById('pz-status');
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
    el.classList.toggle('hidden', !msg);
}

// Colores v9.1: etapas previas MÁS OSCURAS que antes (#c9ced6 → #a0a6ae) y el
// trazo nuevo aún más oscuro (#47505c) — antes en impresoras con poca tinta
// casi no se notaba. Renglones verdes más finos: borde 0.5→0.3mm, cruz 0.4→0.22mm.
const PZ_PREV_FILL = '#a0a6ae';   // trazos ya escritos en la etapa
const PZ_CUR_FILL = '#47505c';    // el trazo nuevo de la etapa
const PZ_TRACE_FILL = '#b5d6c4';  // calco verde suave (fila 寫字 del estilo cuaderno)

// CSS autocontenido de la hoja (verde estilo XieZi, A4)
const PZ_SHEET_CSS = [
    '@page { size: A4; margin: 11mm; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { font-family: "Segoe UI", Arial, "Helvetica Neue", sans-serif; background: #fff; }',
    '@media screen { body { padding: 9mm; } }',
    '.pz-title { font-size: 15pt; font-weight: 700; color: #16a085; margin-bottom: 2.5mm; }',
    '.pz-title .pz-hz span { margin: 0 1.5mm; }',
    '.pz-meta { font-size: 9pt; color: #475569; border-bottom: 0.5mm solid #16a085; padding-bottom: 2mm; margin-bottom: 3.5mm; }',
    '.pz-row { display: flex; gap: 1.2mm; margin-bottom: 1.8mm; break-inside: avoid; page-break-inside: avoid; }',
    '.pz-cell { flex: 1 1 0; aspect-ratio: 1 / 1; border: 0.3mm solid #2f9e77; position: relative; overflow: hidden; }',
    '.pz-cell::before { content: ""; position: absolute; inset: 0; background:',
    '  repeating-linear-gradient(to right, transparent 0 2.4mm, #a7d9c4 2.4mm 4.4mm) center / 100% 0.22mm no-repeat,',
    '  repeating-linear-gradient(to bottom, transparent 0 2.4mm, #a7d9c4 2.4mm 4.4mm) center / 0.22mm 100% no-repeat; }',
    '.pz-cell svg, .pz-cell span.pz-glyph { position: absolute; left: 7%; top: 7%; width: 86%; height: 86%; display: block; }',
    '.pz-cell span.pz-glyph { display: flex; align-items: center; justify-content: center; font-size: 42pt; line-height: 1; color: #1f2937;',
    '  font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "WenQuanYi Zen Hei", sans-serif; }',
    '.pz-cell svg path { stroke-linejoin: round; }',
    '.pz-note { font-size: 8pt; color: #b45309; margin-top: 3mm; }',
    // ── v9.1 estilo CUADERNO (筆順 + 寫字, como el modelo de la referencia) ──
    // v9.4: SIN las etiquetas repetidas por bloque (筆順/寫字) — la fila de
    // progresión y los casilleros se entienden solos; queda más ancho para
    // practicar. Grid de 2 columnas: tarjeta + contenido.
    '.pz2-block { display: grid; grid-template-columns: 24mm 1fr; gap: 2.5mm 2.5mm; align-items: center;',
    '  margin-bottom: 4mm; break-inside: avoid; page-break-inside: avoid; }',
    '.pz2-card { grid-row: span 2; border: 0.3mm solid #64748b; border-radius: 1.5mm; padding: 2mm 1mm;',
    '  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5mm; min-height: 24mm; }',
    '.pz2-card .pz2-hz svg { width: 17mm; height: 17mm; display: block; }',
    '.pz2-card .pz2-hz span.pz2-fallback { font-size: 30pt; line-height: 1; color: #1f2937;',
    '  font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "WenQuanYi Zen Hei", sans-serif; }',
    '.pz2-card .pz2-py { font-size: 9pt; color: #475569; }',
    '.pz2-strokes { display: flex; flex-wrap: wrap; gap: 0.6mm; align-items: center; }',
    '.pz2-strokes svg { width: 9.5mm; height: 9.5mm; display: block; }',
    '.pz2-cells { display: flex; gap: 1.2mm; }',
    '.pz2-cells .pz-cell { flex: 1 1 0; }'
].join('\n');

// Pinyin por carácter (mapa perezoso desde las tuplas HSK 3.0 + TOCFL embebidas)
let _pzPyMap = null;
function pzPinyinOf(ch) {
    if (!_pzPyMap) {
        _pzPyMap = {};
        try {
            for (const key in EMBEDDED_MODULE_DATA) {
                const rows = EMBEDDED_MODULE_DATA[key];
                if (!Array.isArray(rows)) continue;
                for (const r of rows) {
                    if (Array.isArray(r) && r[0] && r[0].length === 1 && r[2] && !_pzPyMap[r[0]]) {
                        _pzPyMap[r[0]] = String(r[2]).split('(')[0].trim();
                    }
                }
            }
        } catch (e) { _pzPyMap = {}; }
    }
    return _pzPyMap[ch] || '';
}

// v9.35 — FILAS POR CARÁCTER (estilo clásico): las celdas de práctica
// completan la fila ACTUAL y nada más; solo si el bloque cae justo en el
// borde (base % C === 0) se abre una fila parcial con 2 celdas. Antes
// ceil((base+2)/C) inflaba SIEMPRE a fila completa → un carácter de 8
// trazos con 10 celdas sumaba una fila VACÍA de 10 ("suma espacios cuando
// no los hay"). La usa TAMBIÉN el contador (v9.2) para que ambos coincidan.
function pzClassicRows(base, C) {
    const rem = base % C;
    const total = (rem === 0) ? base + 2 : base + (C - rem);
    return Math.ceil(total / C);
}
function pzCellWidthCss(C) {
    return '.pz-row .pz-cell{flex:0 0 auto;width:calc((100% - ' + ((C - 1) * 1.2).toFixed(2) + 'mm)/' + C + ');}';
}

function pzSheetHTML(chars, datas, trazos, cells, style) {
    const fecha = new Date().toLocaleDateString('es-AR');
    const C = Math.min(20, Math.max(6, parseInt(cells, 10) || 12));
    const esCuaderno = (style === 'cuaderno');
    if (esCuaderno) {
        // ── estilo CUADERNO (v9.1): tarjeta del carácter + fila 筆順
        // (progresión de trazos) + fila 寫字 (calco + casilleros).
        // v9.4: sin rótulos por bloque — se entienden solos. ──
        let blocks = '';
        chars.forEach((ch, i) => {
            const d = datas[i];
            const py = pzPinyinOf(ch);
            const hz = d
                ? pzSvg(d, d.strokes.length, '#1f2937')
                : '<span class="pz2-fallback">' + ch + '</span>';
            const trazosHtml = (trazos && d)
                ? (() => {
                    const n = d.strokes.length;
                    let s = '';
                    for (let k = 1; k <= n; k++) {
                        s += pzSvg(d, k, PZ_PREV_FILL, PZ_CUR_FILL);
                    }
                    s += pzSvg(d, n, '#c9ced6'); // el carácter completo en gris, como el modelo
                    return '<div class="pz2-strokes">' + s + '</div>';
                })()
                : '<div class="pz2-strokes"><span class="pz-glyph" style="position:static;font-size:18pt;color:#94a3b8;">—</span></div>';
            const boxes = Math.max(4, C);
            let cellsHtml = '';
            for (let b = 0; b < boxes; b++) {
                const traced = (trazos && d && b < 3) ? pzSvg(d, d.strokes.length, PZ_TRACE_FILL) : '';
                cellsHtml += '<div class="pz-cell">' + traced + '</div>';
            }
            blocks += '<div class="pz2-block">'
                + '<div class="pz2-card"><div class="pz2-hz">' + hz + '</div>'
                + (py ? '<div class="pz2-py">' + py + '</div>' : '') + '</div>'
                + trazosHtml
                + '<div class="pz2-cells">' + cellsHtml + '</div>'
                + '</div>';
        });
        const hz2 = chars.map((c) => '<span>' + c + '</span>').join(' ');
        return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Planilla de práctica 写字</title>'
            + '<style>' + PZ_SHEET_CSS + '</style></head><body>'
            + '<div class="pz-title">Planilla de práctica · Caracteres <span class="pz-hz">' + hz2 + '</span></div>'
            + '<div class="pz-meta">Nombre: ____________________________ &nbsp;&nbsp; Curso: ______________ &nbsp;&nbsp; Fecha: ' + fecha + '</div>'
            + blocks + '</body></html>';
    }
    let rows = '';
    chars.forEach((ch, i) => {
        const d = datas[i];
        // Contenido del bloque del carácter: modelo + etapas de trazos
        const celdas = ['<div class="pz-cell">' + (d ? pzSvg(d, d.strokes.length, '#1f2937') : '<span class="pz-glyph">' + ch + '</span>') + '</div>'];
        if (trazos && d) {
            const n = d.strokes.length;
            // v9.1: el trazo NUEVO de cada etapa va más oscuro — se ve qué trazo se agrega
            for (let k = 1; k <= n; k++) celdas.push('<div class="pz-cell">' + pzSvg(d, k, PZ_PREV_FILL, PZ_CUR_FILL) + '</div>');
        }
        // v9.35 — relleno compacto: las celdas de práctica completan la fila
        // ACTUAL del carácter y nada más (antes la fila extra casi vacía).
        // Solo si el bloque cae justo en el borde (base % C === 0) se abre
        // una fila parcial con 2 celdas de práctica — con ancho fijo
        // (pzCellWidthCss) las filas parciales no se estiran.
        const base = celdas.length;
        const rem = base % C;
        const total = (rem === 0) ? base + 2 : base + (C - rem);
        while (celdas.length < total) celdas.push('<div class="pz-cell"></div>');
        for (let r = 0; r < total; r += C) {
            rows += '<div class="pz-row">' + celdas.slice(r, r + C).join('') + '</div>';
        }
    });
    const faltan = chars.filter((c, i) => !datas[i]);
    const nota = faltan.length ? '<p class="pz-note">Sin datos de trazos para: ' + faltan.join(' ') + ' — el carácter modelo usa la fuente del sistema.</p>' : '';
    const hz = chars.map((c) => '<span>' + c + '</span>').join(' ');
    return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Planilla de práctica 写字</title>'
        + '<style>' + PZ_SHEET_CSS + pzCellWidthCss(C) + '</style></head><body>'
        + '<div class="pz-title">Planilla de práctica · Caracteres <span class="pz-hz">' + hz + '</span></div>'
        + '<div class="pz-meta">Nombre: ____________________________ &nbsp;&nbsp; Curso: ______________ &nbsp;&nbsp; Fecha: ' + fecha + '</div>'
        + rows + nota + '</body></html>';
}

async function pzGenerate() {
    const ta = document.getElementById('pz-input');
    const chars = pzParseInput(ta ? ta.value : '');
    if (!chars.length) {
        pzStatus('✍️ Escribí primero los caracteres a practicar (ej.: 你是哪国人)', true);
        return;
    }
    const btn = document.getElementById('btn-pz-generate');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Generando…'; }
    pzStatus('⏳ Descargando trazos (0/' + chars.length + ')…');
    const datas = new Array(chars.length).fill(null);
    let done = 0;
    await Promise.all(chars.map(async (ch, i) => {
        datas[i] = await pzFetchChar(ch);
        done++;
        pzStatus('⏳ Descargando trazos (' + done + '/' + chars.length + ')…');
    }));
    pzLastSheet = pzSheetHTML(chars, datas, pzTrazos, pzCells, pzStyle);
    pzRenderPreview();
    pzCounterRender(); // v9.2: con datos reales el contador es exacto
    ['btn-pz-pdf', 'btn-pz-print'].forEach((id) => {
        const b = document.getElementById(id);
        if (b) b.classList.remove('hidden');
    });
    const faltan = datas.filter((d) => !d).length;
    pzStatus(faltan
        ? '⚠ Hoja lista, pero sin datos de trazos para ' + faltan + ' carácter(es) (¿sin conexión la primera vez?). Se usa el modelo del sistema.'
        : '✅ Hoja lista (' + chars.length + ' caracteres). Tocá ⬇️ Descargar PDF.');
    if (btn) { btn.disabled = false; btn.textContent = '📄 Generar hoja'; }
}

// Vista previa: iframe escalado al ancho disponible
function pzRenderPreview() {
    const wrap = document.getElementById('pz-preview');
    if (!wrap || !pzLastSheet) return;
    wrap.classList.remove('hidden');
    let f = wrap.querySelector('iframe');
    if (!f) {
        f = document.createElement('iframe');
        f.title = 'Vista previa de la planilla';
        wrap.appendChild(f);
    }
    f.srcdoc = pzLastSheet;
    f.onload = () => pzFitPreview();
}

function pzFitPreview() {
    const wrap = document.getElementById('pz-preview');
    if (!wrap) return;
    const f = wrap.querySelector('iframe');
    if (!f) return;
    try {
        const doc = f.contentDocument;
        if (!doc || !doc.body) return;
        const W = 794; // 210mm a 96dpi
        const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 1123);
        const scale = Math.min(1, wrap.clientWidth / W);
        f.style.width = W + 'px';
        f.style.height = h + 'px';
        f.style.transform = 'scale(' + scale + ')';
        wrap.style.height = Math.ceil(h * scale) + 'px';
    } catch (e) { /* vista previa es best-effort */ }
}

// ============================================================
// v7.1 — Descargar PDF directo (SIN abrir el diálogo de impresora)
// html2canvas rasteriza la hoja (SVGs incluidos) y jsPDF la envuelve
// en páginas A4. Libs LOCALES al repo (offline tras el 1er uso: el
// SW las precachea) y de carga PEREZOSA (no penalizan el arranque).
// ============================================================
function pzLoadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('No se pudo cargar ' + src));
        document.head.appendChild(s);
    });
}

async function pzEnsurePdfLibs() {
    if (!window.html2canvas) await pzLoadScript('html2canvas.min.js');
    if (!(window.jspdf && window.jspdf.jsPDF)) await pzLoadScript('jspdf.umd.min.js');
}

// CSS de la hoja re-escopado al holder: las reglas globales de la hoja
// (*, body, @page) no deben tocar el resto de la app.
function pzHolderCss() {
    return PZ_SHEET_CSS
        .replace('@page { size: A4; margin: 11mm; }', '')
        .replace('* { box-sizing: border-box; margin: 0; padding: 0; }',
                 '#pz-pdf-holder, #pz-pdf-holder * { box-sizing: border-box; margin: 0; padding: 0; }')
        .replace(/body \{[^}]*\}/g, '')
        .replace('@media screen {  }', '');
}

function pzPdfHolderStyle(C, cw) {
    return pzHolderCss()
        + '.pz-cell{height:' + cw.toFixed(2) + 'px;}'
        + '#pz-pdf-holder .pz-row .pz-cell{width:' + cw.toFixed(2) + 'px;flex:0 0 auto;}'
        + '#pz-pdf-holder .pz-cell::before{content:"";position:absolute;inset:0;'
        + 'background-image:linear-gradient(#a7d9c4,#a7d9c4),linear-gradient(#a7d9c4,#a7d9c4);'
        + 'background-size:100% 1px,1px 100%;'
        + 'background-position:0 50%,50% 0;background-repeat:no-repeat,no-repeat;}'
        // v9.37: en CUADERNO las celdas viven en .pz2-cells (grid 24mm+1fr) →
        // su ancho NO es cw: forzarles height:cw las deformaba (rectángulos).
        // El ancho lo resuelve el flex del bloque; aspect-ratio re-cuadra.
        + '#pz-pdf-holder .pz2-cells .pz-cell{height:auto;aspect-ratio:1/1;}';
}
function pzPdfHolder() {
    const holder = document.createElement('div');
    holder.id = 'pz-pdf-holder';
    holder.style.cssText = 'position:fixed;left:-12000px;top:0;width:794px;'
        + 'background:#fff;font-family:"Segoe UI",Arial,"Helvetica Neue",sans-serif;padding:42px;';
    return holder;
}

async function pzDownloadPDF() {
    if (!pzLastSheet) return;
    const btn = document.getElementById('btn-pz-pdf');
    try {
        if (btn) btn.disabled = true;
        await pzEnsurePdfLibs();
        pzStatus('⏳ Generando PDF…');

        const doc = new DOMParser().parseFromString(pzLastSheet, 'text/html');
        const C = Math.min(20, Math.max(6, parseInt(pzCells, 10) || 12));
        const GAP = 1.2 * 96 / 25.4;
        const cw = (794 - 84 - (C - 1) * GAP) / C;

        // ── 1) Holder de MEDICIÓN: mismo CSS que el render final ──
        const meas = pzPdfHolder();
        const st = document.createElement('style');
        st.textContent = pzPdfHolderStyle(C, cw);
        meas.appendChild(st);
        while (doc.body.firstChild) meas.appendChild(doc.body.firstChild);
        document.body.appendChild(meas);

        // Clasificar bloques: filas (lo paginable), cabecera y nota final
        const esCuad = (pzStyle === 'cuaderno');
        const rowCls = esCuad ? 'pz2-block' : 'pz-row';
        const header = [], tail = [], rowsArr = [];
        Array.prototype.forEach.call(meas.children, (n) => {
            if (n.tagName === 'STYLE') return;
            if (n.classList && n.classList.contains(rowCls)) rowsArr.push(n);
            else if (n.classList && n.classList.contains('pz-note')) tail.push(n);
            else header.push(n);
        });

        // ── 2) Partir en páginas A4 midiendo bloques REALES (misma lógica
        // de flujo que la impresión nativa: cada página arranca a 11mm) ──
        const gapY = (esCuad ? 4 : 1.8) * 96 / 25.4;      // margen inferior del bloque
        const headerH = rowsArr.length ? rowsArr[0].offsetTop : 42;
        const pages = [[]];
        let y = headerH;
        rowsArr.forEach((r) => {
            const h = r.offsetHeight + gapY;
            if (y + h > 1123 - 42 && pages[pages.length - 1].length) {
                pages.push([]);
                y = 42;
            }
            pages[pages.length - 1].push(r);
            y += h;
        });
        meas.remove(); // los nodos quedan vivos: se re-montan por página

        // ── 3) Render página por página: cada canvas es 1588×2246 ≈ 3.6MP.
        // Antes se rasterizaba TODA la hoja en un solo canvas — con hojas
        // largas reventaba el límite de memoria de canvas de iOS/Safari. ──
        const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        for (let p = 0; p < pages.length; p++) {
            pzStatus('⏳ Generando PDF… página ' + (p + 1) + ' de ' + pages.length);
            const holder = pzPdfHolder();
            // v9.37: página SIEMPRE con proporción A4 (794×1123 @96dpi). Antes
            // el holder medía solo lo que ocupaba su contenido y addImage lo
            // estiraba a 210×297 mm completos: la ÚLTIMA página (poco
            // contenido) salía con celdas y caracteres deformadísimos —
            // "se desconfiguran los caracteres al final del PDF".
            holder.style.minHeight = '1123px';
            const st2 = document.createElement('style');
            st2.textContent = pzPdfHolderStyle(C, cw);
            holder.appendChild(st2);
            if (p === 0) header.forEach((n) => holder.appendChild(n));
            pages[p].forEach((n) => holder.appendChild(n));
            if (p === pages.length - 1) tail.forEach((n) => holder.appendChild(n));
            document.body.appendChild(holder);
            const canvas = await window.html2canvas(holder, { scale: 2, backgroundColor: '#ffffff', logging: false });
            holder.remove();
            if (p > 0) pdf.addPage();
            // v9.37: alto en mm derivado del PROPIO canvas (defensa pasiva:
            // si el canvas no es exactamente A4, se conserva el aspecto en
            // vez de estirar). Con minHeight 1123 → mmH ≈ 297 siempre.
            const mmH = Math.min(297, 210 * canvas.height / canvas.width);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, mmH, undefined, 'FAST');
        }
        const t = new Date();
        const pad = (x) => String(x).padStart(2, '0');
        const nombre = 'planilla-hanzi-' + t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate())
            + '-' + pad(t.getHours()) + pad(t.getMinutes()) + '.pdf';
        pdf.save(nombre);
        pzStatus('✅ PDF descargado: ' + nombre + (pages.length > 1 ? ' (' + pages.length + ' páginas)' : ''));
    } catch (err) {
        console.warn('[Planillas] descarga de PDF falló:', err);
        pzStatus('⚠ No se pudo generar el PDF. Probá el botón 🖨️ para imprimir y elegir "Guardar como PDF".', true);
    } finally {
        if (btn) btn.disabled = false;
    }
}

// Imprimir (secundario): hoja sola, sin la interfaz de la app
function pzPrint() {
    if (!pzLastSheet) return;
    const f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(f);
    f.srcdoc = pzLastSheet;
    f.onload = () => {
        setTimeout(() => {
            try {
                f.contentWindow.focus();
                f.contentWindow.print();
            } catch (e) {
                const w = window.open('', '_blank');
                if (w) {
                    w.document.write(pzLastSheet);
                    w.document.close();
                    setTimeout(() => { try { w.focus(); w.print(); } catch (e2) { /* noop */ } }, 400);
                }
            }
            setTimeout(() => f.remove(), 60000);
        }, 250);
    };
}

// Llena el input con los caracteres de las palabras del módulo activo
function pzUseModule() {
    const seen = new Set();
    let out = '';
    for (const s of getFiltered()) {
        for (const ch of String(s.chinese_simp_answer || '')) {
            if (!pzIsHan(ch) || seen.has(ch)) continue;
            seen.add(ch);
            out += ch;
            if (seen.size >= 40) break;
        }
        if (seen.size >= 40) break;
    }
    const ta = document.getElementById('pz-input');
    if (ta && out) {
        ta.value = out;
        pzStatus('📋 ' + seen.size + ' caracteres del módulo ' + (MODULE_LABELS[state.activeModule] || state.activeModule) + '. Ahora tocá 📄 Generar hoja.');
        pzCounterUpdate(); // v9.2: el módulo cargado entra al contador
    } else {
        pzStatus('⚠ El módulo activo no tiene palabras para practicar.', true);
    }
}

function pzUpdateControls() {
    const bt = document.getElementById('btn-pz-trazos');
    if (bt) {
        bt.textContent = '✍️ Trazos: ' + (pzTrazos ? 'ON' : 'OFF');
        bt.classList.toggle('active', pzTrazos);
    }
    const sel = document.getElementById('select-pz-cells');
    if (sel) sel.value = String(pzCells);
    const stl = document.getElementById('select-pz-style');
    if (stl) stl.value = pzStyle;
    const nm = document.getElementById('pz-module-name');
    if (nm) nm.textContent = MODULE_LABELS[state.activeModule] || state.activeModule;
}

// ======================================================================
// v9.2 — CONTADOR DE CARACTERES POR HOJA A4 (según 10/12/14 celdas)
// ======================================================================
// Le responde al docente la pregunta práctica: "¿cuántos caracteres entran
// en UNA hoja A4 con la config elegida y cuántos quedan por fuera?".
// · Estilo clásico: cada carácter ocupa ceil((modelo + etapas + 2)/C) filas
//   de celdas de altura fija → capacidad analítica con header medido.
// · Estilo cuaderno: se mide cada bloque real (la tira 筆順 envuelve según
//   los trazos) en un holder con la MISMA geometría del PDF (794px, pad 42px).
// · Sin datos de trazos todavía → n estimado 10 trazos y se marca "≈" — el
//   contador precarga los datos en silencio y se afila solo a exacto.
const PZ_PAGE_H = 1123;                    // A4 a 96dpi
const PZ_PAGE_PAD = 42;                    // padding del holder ≈ 11mm de margen
const PZ_PAGE_LIMIT = PZ_PAGE_PAD + (PZ_PAGE_H - 2 * PZ_PAGE_PAD); // fondo página 1
const PZ_MM = 96 / 25.4;                   // px por mm

function pzCounterData() {
    const ta = document.getElementById('pz-input');
    const raw = ta ? ta.value : '';
    const chars = pzParseInput(raw);
    let rawHan = 0;
    for (const ch of String(raw)) if (pzIsHan(ch)) rawHan++;
    return { chars, rawHan };
}

function pzCounterCompute() {
    const { chars, rawHan } = pzCounterData();
    const C = Math.min(20, Math.max(6, parseInt(pzCells, 10) || 12));
    const GAP = 1.2 * PZ_MM;
    const cw = (794 - 84 - (C - 1) * GAP) / C;
    const rowH = cw + 1.8 * PZ_MM;
    const datas = chars.map((ch) => (PZ_MEM.has(ch) ? PZ_MEM.get(ch) : null));
    const unknown = datas.filter((d) => !d).length;
    const estN = (i) => (pzTrazos ? (datas[i] ? datas[i].strokes.length : 10) : 0);

    let headerH = 60, blocks = null;
    try {
        // mide la hoja REAL (misma geometría que el PDF) — la altura de la
        // cabecera y de cada bloque cuaderno depende del contenido
        const html = pzSheetHTML(chars, datas, pzTrazos, pzCells, pzStyle);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const holder = document.createElement('div');
        holder.style.cssText = 'position:fixed;left:-12000px;top:0;width:794px;background:#fff;padding:42px;';
        const st = document.createElement('style');
        st.textContent = pzHolderCss() + '.pz-cell{height:' + cw.toFixed(2) + 'px;}';
        holder.appendChild(st);
        while (doc.body.firstChild) holder.appendChild(doc.body.firstChild);
        document.body.appendChild(holder);
        const first = holder.querySelector(pzStyle === 'cuaderno' ? '.pz2-block' : '.pz-row');
        const meta = holder.querySelector('.pz-meta');
        if (first) headerH = first.offsetTop;
        else if (meta) headerH = meta.offsetTop + meta.offsetHeight + 3.5 * PZ_MM;
        if (pzStyle === 'cuaderno') {
            blocks = [];
            holder.querySelectorAll('.pz2-block').forEach((b) => {
                blocks.push({ top: b.offsetTop, h: b.offsetHeight + 4 * PZ_MM });
            });
        }
        holder.remove();
    } catch (e) { /* medidas por defecto */ }

    let fit = 0, capOnly = 0;
    if (pzStyle === 'cuaderno') {
        if (blocks && blocks.length) {
            for (const b of blocks) { if (b.top + b.h <= PZ_PAGE_LIMIT) fit++; else break; }
        } else {
            const estH = 26 * PZ_MM; // bloque típico (tarjeta 24mm + envolturas)
            fit = Math.floor((PZ_PAGE_LIMIT - headerH) / estH);
        }
        capOnly = fit;
    } else {
        const rowsAvail = Math.floor((PZ_PAGE_LIMIT - headerH) / rowH);
        if (!chars.length) {
            // capacidad genérica: carácter de referencia de 10 trazos
            const rows1 = pzClassicRows(1 + (pzTrazos ? 10 : 0), C);
            capOnly = Math.floor(rowsAvail / Math.max(1, rows1));
        } else {
            let acc = 0;
            // v9.35: misma fórmula de filas que pzSheetHTML (pzClassicRows) —
            // el contador y la hoja real nunca difieren.
            while (fit < chars.length && acc + pzClassicRows(1 + estN(fit), C) <= rowsAvail) {
                acc += pzClassicRows(1 + estN(fit), C);
                fit++;
            }
            capOnly = Math.floor(rowsAvail / Math.max(1, pzClassicRows(1 + (pzTrazos ? 10 : 0), C)));
        }
    }
    return { chars: chars.length, rawHan, fit, capOnly, unknown, est: unknown > 0 && chars.length > 0 };
}

function pzCounterRender() {
    const el = document.getElementById('pz-counter');
    if (!el) return;
    const C = Math.min(20, Math.max(6, parseInt(pzCells, 10) || 12));
    const r = pzCounterCompute();
    const cfg = C + ' celdas/fila · ' + (pzStyle === 'cuaderno' ? 'cuaderno 筆順' : 'clásica');
    if (!r.chars) {
        el.textContent = '📊 Hoja A4 (' + cfg + '): entran ≈' + r.capOnly +
            ' caracteres por hoja (carácter de referencia, 10 trazos).';
        return;
    }
    const est = r.est ? ' (≈ estimado: faltan datos de trazos)' : '';
    const sobran = Math.max(0, r.chars - r.fit);
    if (sobran === 0) {
        el.textContent = '📊 Hoja A4 (' + cfg + '): los ' + r.chars + ' caracteres entran en una hoja' + est +
            (r.rawHan > r.chars ? ' · solo los primeros 40 se usan' : '') + '.';
    } else {
        el.textContent = '📊 Hoja A4 (' + cfg + '): entran ' + r.fit + ' de ' + r.chars +
            ' caracteres · ' + sobran + ' quedan por fuera (hoja 2+)' + est +
            (r.rawHan > r.chars ? ' · solo los primeros 40 se usan' : '') + '.';
    }
}

// Precarga silenciosa de datos de trazos → el contador pasa de ≈ a exacto
function pzCounterPrefetch() {
    const { chars } = pzCounterData();
    const missing = chars.filter((ch) => !PZ_MEM.has(ch));
    if (!missing.length) return;
    Promise.all(missing.map((ch) => pzFetchChar(ch)))
        .then(() => pzCounterRender())
        .catch(() => { });
}

let pzCounterTimer = null;
function pzCounterUpdate() {
    pzCounterRender();
    clearTimeout(pzCounterTimer);
    pzCounterTimer = setTimeout(() => { pzCounterPrefetch(); }, 450);
}

(function pzInit() {
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-pz-generate', 'click', pzGenerate);
    safe('btn-pz-pdf', 'click', pzDownloadPDF);
    safe('btn-pz-print', 'click', pzPrint);
    safe('btn-pz-module', 'click', pzUseModule);
    safe('btn-pz-trazos', 'click', () => {
        pzTrazos = !pzTrazos;
        localStorage.setItem('ac_pz_trazos', pzTrazos ? '1' : '0');
        pzUpdateControls();
        pzCounterUpdate(); // v9.2: los trazos cambian cuánto ocupa cada carácter
    });
    safe('select-pz-cells', 'change', (e) => {
        pzCells = parseInt(e.target.value, 10) || 12;
        localStorage.setItem('ac_pz_cells', String(pzCells));
        pzCounterUpdate(); // v9.2: 10/12/14 cambian la capacidad de la hoja
    });
    safe('select-pz-style', 'change', (e) => {
        pzStyle = (e.target.value === 'cuaderno') ? 'cuaderno' : 'clasica';
        localStorage.setItem('ac_pz_style', pzStyle);
        pzCounterUpdate(); // v9.2: el estilo cambia el tamaño de cada bloque
    });
    safe('pz-input', 'input', pzCounterUpdate); // v9.2: contador en vivo
    window.addEventListener('resize', () => {
        const wrap = document.getElementById('pz-preview');
        if (wrap && !wrap.classList.contains('hidden')) pzFitPreview();
    });
    pzUpdateControls();
    pzCounterRender(); // v9.2: capacidad al abrir el panel
})();

// El Test de colocación HSK (window.PL_DEBUG) ahora vive en
// placement-test.js, cargado después de este archivo en index.html.


// El mazo de repaso SRS (window.acSrsMiss/acSrsAdd/acSrsHas/acSrsReset/
// acSrsGrade/acSrsPreview/acSrsRefreshBar) ahora vive en srs.js, cargado
// después de este archivo en index.html — misma API, mismos llamadores.

// El Karaoke de lectura (KARA) ahora vive en karaoke.js, cargado
// después de este archivo en index.html.


// Las Lecciones graduadas (window.LQ_DEBUG) ahora viven en
// lessons-graduated.js, cargado después de este archivo en index.html.


// El Lector de Clásicos (window.CR_open, window.CR_DEBUG) ahora vive
// en classics-reader.js, cargado después de este archivo en index.html
// — misma API, mismos llamadores (reader.js sigue llamando CR_open).

// Pares mínimos (window.MPDebug) ahora vive en minimal-pairs.js,
// cargado después de este archivo en index.html.
