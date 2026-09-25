// ============================================================
// dict.js — Motor de diccionario (búsqueda palabra → traducción)
// ============================================================
// Extraído de app.js (fase 2 de modularización, 2026-09-24): la lógica
// de indexado y búsqueda del diccionario — sin DOM, sin popup. Lo que
// sí dibuja el popup de vocabulario (showVocabPop/hideVocabPop, que
// además monta el escritor de trazos de Hanzi Writer) se quedó en
// app.js porque combina este motor con esa otra función.
//
// Es un script clásico (sin import/export), igual que audio-tts.js: se
// carga en index.html DESPUÉS de app.js (necesita EMBEDDED_SENTENCES y
// EMBEDDED_MODULE_DATA, que app.js define arriba de todo) y expone sus
// funciones/variables como globales, tal como las usaba el resto de la
// app antes de la extracción.
// ============================================================

// ===== Diccionario palabra → traducción (cajón de vocabulario + lector) =====
// Se alimenta con los datos embebidos y se va AMPLIANDO con cada módulo
// cargado (Saludos/HSK/TOCFL/DELE), así las palabras guardadas siguen
// teniendo traducción aunque cambies de módulo.
//
// v7.10 (Opción B) — el toque resuelve en TRES niveles, de mejor a peor:
//   vocabDict    → respuestas EXACTAS de las lecciones (traducción directa)
//   wordHitDict  → Capa 1: cada palabra de los TEXTOS COMPLETOS indexada
//                  ("profesora", "中国", "朋友"...) → muestra la lección donde vive
//   lemas ES     → Capa 2: "amigos"→"amigo", "comieron"→"comer" (candidatos)
//   por carácter → Capa 3: "大小" se desglosa en 大 + 小 con su ficha individual
// Cero archivos nuevos: todo se deriva de los datos que ya viajan en app.js.
const vocabDict = new Map();
const wordHitDict = new Map();
// Regex compartida por diccionario y lector interlineal (fuente única)
const READER_HANZI = /[㐀-䶿一-鿿]/;
// Palabras funcionales que NO valen como "aparece en" en español
const ES_STOP = new Set(['el','la','los','las','un','una','unos','unas','de','del','al','a','en','y','o','u','que','se','su','sus','es','son','con','por','para','pero','muy','mas','más','yo','tu','tus','mi','mis','me','te','lo','le','les','no','si','sí','hay','fue','era','este','esta','esto','estos','estas','ese','esa','eso','como','donde','dónde','cuando','cuándo','qué','sino','porque','él','ella','ellos','ellas','nosotros','usted','ustedes','hoy','ya','aún','todavia','todavía','tambien','también']);

// Segmentador zh compartido (1 sola instancia para diccionario + lector)
let _zhSegmenter;
function getZhSegmenter() {
    if (_zhSegmenter === undefined) {
        _zhSegmenter = null;
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            try { _zhSegmenter = new Intl.Segmenter('zh', { granularity: 'word' }); } catch (e) { _zhSegmenter = null; }
        }
    }
    return _zhSegmenter;
}

function esWords(text) {
    return String(text || '').toLowerCase().match(/[a-záéíóúüñ]+/g) || [];
}

// Palabras hanzi de un texto (Intl.Segmenter; sin Segmenter → carácter a carácter)
function zhWordsList(text) {
    if (!text) return [];
    const seg = getZhSegmenter();
    if (seg) {
        try {
            return Array.from(seg.segment(String(text)), s => s.segment).filter(s => READER_HANZI.test(s));
        } catch (e) { /* cae al fallback */ }
    }
    return Array.from(String(text)).filter(ch => READER_HANZI.test(ch));
}

function indexSentencesForVocab(arr) {
    (arr || []).forEach(s => {
        const es = (s.spanish_answer || '').trim();
        const zhS = (s.chinese_simp_answer || '').trim();
        const zhT = (s.chinese_trad_answer || '').trim();
        const rec = {
            es: es,
            zhSimp: zhS,
            zhTrad: zhT || zhS,
            pinyin: s.pinyin || '',
            fullEs: s.spanish_full || '',
            fullZhSimp: s.chinese_simp_full || '',
            fullZhTrad: s.chinese_trad_full || s.chinese_simp_full || ''
        };
        [es, zhS, zhT].forEach(w => {
            if (w && !vocabDict.has(w)) vocabDict.set(w, rec);
        });
        // alias minúscula del ES (tocar "Hola" en el lector encuentra "hola")
        if (es) { const lw = es.toLowerCase(); if (!vocabDict.has(lw)) vocabDict.set(lw, rec); }
        indexWordHits(rec);
    });
}

// v7.10 Capa 1: indexa cada palabra de los textos completos de la oración
function indexWordHits(rec) {
    esWords(rec.fullEs).forEach(w => {
        if (w.length >= 3 && !ES_STOP.has(w) && !wordHitDict.has(w)) wordHitDict.set(w, rec);
    });
    [rec.fullZhSimp, rec.fullZhTrad].forEach(t => zhWordsList(t).forEach(w => {
        if (!wordHitDict.has(w)) wordHitDict.set(w, rec);
    }));
}

indexSentencesForVocab(typeof EMBEDDED_SENTENCES !== 'undefined' ? EMBEDDED_SENTENCES : []);
// v7.10: el diccionario nace COMPLETO — además del módulo base, indexa TODOS
// los módulos embebidos (deduplicados por referencia: los alias apuntan a la
// misma lista). Así "profesora" o "中国" resuelven aunque ese módulo no se abrió.
if (typeof EMBEDDED_MODULE_DATA !== 'undefined') {
    const _seenModArr = new Set();
    Object.keys(EMBEDDED_MODULE_DATA).forEach(k => {
        const arr = EMBEDDED_MODULE_DATA[k];
        // v7.19: las tuplas HSK 3.0 no se indexan al arrancar (se expanden al abrir
        // el módulo y ahí alimentan el diccionario) — evita iterar 11.092 registros
        if (Array.isArray(arr) && arr.length && Array.isArray(arr[0])) return;
        if (Array.isArray(arr) && !_seenModArr.has(arr)) {
            _seenModArr.add(arr);
            indexSentencesForVocab(arr);
        }
    });
}

// ===== v7.12 Capa 4 — diccionario offline (dict-mini.js, CC-BY-SA 4.0) =====
// ~1.630 entradas frecuentes zh→es seleccionadas del vocabulario del curso +
// CC-CEDICT (MDBG); definiciones ES propias. Los ALIAS (formas tradicionales y
// variantes) apuntan a la entrada real: "嗎"→"吗". Además se construye un índice
// INVERSO es→zh para tocar palabras españolas y proponer candidatos chinos.
const DICT_MINI_RAW = (typeof window !== 'undefined' && window.DICT_MINI) || {};
const dictMini = new Map();     // clave → { py, def }
const dictMiniAlias = new Map(); // alias → clave real
(function () {
    const keys = Object.keys(DICT_MINI_RAW);
    keys.forEach(k => {
        const v = DICT_MINI_RAW[k];
        if (Array.isArray(v)) dictMini.set(k, { py: v[0] || '', def: v[1] || '' });
    });
    keys.forEach(k => {
        const v = DICT_MINI_RAW[k];
        if (typeof v === 'string') { if (dictMini.has(v)) dictMiniAlias.set(k, v); return; }
        if (v[2] && dictMini.has(k) && !dictMini.has(v[2])) dictMiniAlias.set(v[2], k);
    });
})();

function dictMiniLookup(word) {
    const w = String(word || '').trim();
    if (!w) return null;
    const key = dictMini.has(w) ? w : (dictMiniAlias.get(w) || '');
    return key ? dictMini.get(key) : null;
}

// Índice inverso ES→ZH: cada sentido de cada entrada aporta sus palabras ES (≥3
// letras, sin stop words) → hasta 3 candidatos chinos por palabra española.
const dictMiniEs = new Map();
(function () {
    const push = (es, z, py, def) => {
        if (!ES_STOP.has(es)) {
            if (!dictMiniEs.has(es)) dictMiniEs.set(es, []);
            const list = dictMiniEs.get(es);
            if (list.length < 3 && !list.some(x => x.z === z)) list.push({ z: z, py: py, def: def });
        }
    };
    dictMini.forEach((val, z) => {
        (val.def || '').split(';').forEach(sense => {
            (sense.toLowerCase().match(/[a-záéíóúüñ]+/g) || []).forEach(tok => {
                if (tok.length >= 3) push(tok, z, val.py, sense.trim());
            });
        });
    });
})();

// v7.10 Capa 2: candidatos de lema para una palabra española (el 1.º es la
// palabra misma; el resto plurales y conjugaciones frecuentes → infinitivo)
function esLemmaCandidates(w) {
    const out = [w];
    const add = x => { if (x && x.length >= 3 && out.indexOf(x) === -1) out.push(x); };
    if (w.length >= 4) {
        if (/es$/.test(w)) add(w.slice(0, -2));
        if (/s$/.test(w)) add(w.slice(0, -1));
    }
    if (w.length >= 5) {
        const map = [
            ['ando', ['ar']], ['iendo', ['er', 'ir']],
            ['aron', ['ar']], ['ieron', ['er', 'ir']],
            ['aste', ['ar']], ['iste', ['er', 'ir']],
            ['amos', ['ar']], ['emos', ['er']], ['imos', ['ir']],
            ['aban', ['ar']], ['aba', ['ar']], ['ía', ['er', 'ir', 'ar']],
            ['an', ['ar', 'er', 'ir']], ['as', ['ar', 'er']],
            ['o', ['ar', 'er', 'ir']], ['a', ['ar', 'er']], ['é', ['ar']], ['ó', ['ar', 'er']]
        ];
        for (const pair of map) {
            if (w.endsWith(pair[0])) {
                const stem = w.slice(0, -pair[0].length);
                if (stem.length >= 3) {
                    pair[1].forEach(r => add(stem + r));
                    add(stem);
                }
                break;   // un solo sufijo: el más específico que matchea
            }
        }
    }
    return out;
}

// v7.10: resolución del toque — exacta > lema > aparece-en > por carácter
function lookupVocab(word) {
    const w = String(word || '').trim();
    if (!w) return { level: 'none' };
    const zh = isZhText(w);
    // 1) respuesta exacta (alias minúscula incluido)
    if (vocabDict.has(w)) return { level: 'exact', rec: vocabDict.get(w) };
    const lw = zh ? w : w.toLowerCase();
    if (!zh && lw !== w && vocabDict.has(lw)) return { level: 'exact', rec: vocabDict.get(lw) };
    // 2) ES: algún lema es respuesta exacta
    if (!zh) {
        for (const cand of esLemmaCandidates(lw)) {
            if (cand !== lw && vocabDict.has(cand)) return { level: 'lemma', lemma: cand, rec: vocabDict.get(cand) };
        }
    }
    // v7.12 Capa 4: definición breve del diccionario offline (dict-mini.js).
    // ZH: la entrada da pinyin de diccionario + sentidos ES (+ contexto de
    // lección si además vive en algún texto). ES: índice inverso → candidatos
    // chinos con pinyin y sentido.
    if (zh) {
        const d = dictMiniLookup(w);
        if (d) return { level: 'dict', py: d.py, def: d.def, rec: wordHitDict.get(w) || null };
    } else {
        let dItems = dictMiniEs.get(lw) || null;
        let dLemma = '';
        if (!dItems) {
            for (const cand of esLemmaCandidates(lw)) {
                if (cand !== lw && dictMiniEs.has(cand)) { dItems = dictMiniEs.get(cand); dLemma = cand; break; }
            }
        }
        if (dItems) return { level: 'dict-es', items: dItems, lemma: dLemma, rec: wordHitDict.get(w) || wordHitDict.get(lw) || null };
    }
    // 3) la palabra vive dentro del texto de una lección
    if (wordHitDict.has(w)) return { level: 'hit', rec: wordHitDict.get(w) };
    if (!zh && lw !== w && wordHitDict.has(lw)) return { level: 'hit', rec: wordHitDict.get(lw) };
    if (!zh) {
        for (const cand of esLemmaCandidates(lw)) {
            if (cand !== lw && wordHitDict.has(cand)) return { level: 'hit', lemma: cand, rec: wordHitDict.get(cand) };
        }
    }
    // 4) ZH: desglose carácter a carácter — con ficha de lección o, desde
    // v9.12, entrada del diccionario (dict-mini) como respaldo: antes los
    // caracteres clásicos (讀, 電, 道…) quedaban sin glosa en el desglose.
    if (zh) {
        const chars = [];
        for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
        const parts = chars.map(ch => {
            const d = dictMiniLookup(ch);
            const rec = vocabDict.get(ch) || wordHitDict.get(ch)
                || (d ? { es: d.def, zhSimp: ch, zhTrad: ch, pinyin: d.py, fullEs: '', fullZhSimp: '', fullZhTrad: '' } : null);
            return { ch: ch, py: (d && d.py) || wordPinyin(ch), rec: rec };
        });
        if (parts.length && parts.some(p => p.rec)) return { level: 'chars', parts: parts };
    }
    return { level: 'none' };
}

function isZhText(t) { return READER_HANZI.test(t || ''); }

function wordPinyin(word) {
    try {
        if (typeof pinyinPro !== 'undefined' && word) return pinyinPro.pinyin(word, { toneType: 'mark' });
    } catch (e) {}
    return '';
}

// v9.66 (AUDITORIA-GAGNE-MAYER.md, Mayer #7 — pre-entrenamiento): dado el
// texto en chino de UNA escena/lección puntual (daily-stories.js,
// lessons-graduated.js), extrae 3-5 palabras clave con pinyin+glosa para
// mostrar en un paso corto ANTES del texto completo. No cura contenido a
// mano: segmenta el propio texto de esa escena (zhWordsList, ya existe),
// prioriza palabras de 2+ caracteres (vocabulario de contenido, no
// partículas sueltas como 的/了/吗) y — a igualdad de eso — las más
// repetidas DENTRO de esa escena puntual; resuelve pinyin/glosa con el
// diccionario offline (dictMiniLookup, ya existe) y descarta las que no
// tengan entrada. Sin dependencias nuevas, sin tocar SRS/checkAnswer.
function extractKeyWords(zhLines, max) {
    max = max || 5;
    const counts = new Map(); // palabra → veces vista en esta escena
    const order = [];         // primera aparición (desempate estable)
    (zhLines || []).forEach(line => {
        zhWordsList(line).forEach(w => {
            if (!counts.has(w)) { counts.set(w, 0); order.push(w); }
            counts.set(w, counts.get(w) + 1);
        });
    });
    const ranked = order
        .map(w => ({ w: w, n: counts.get(w), long: w.length >= 2 ? 1 : 0 }))
        .sort((a, b) => (b.long - a.long) || (b.n - a.n));
    const out = [];
    for (const cand of ranked) {
        if (out.length >= max) break;
        const hit = dictMiniLookup(cand.w);
        if (!hit || !hit.def) continue; // sin entrada de diccionario → no sirve como glosario
        out.push({ zh: cand.w, py: hit.py || '', es: hit.def });
    }
    return out;
}
