/* =====================================================================
   v9.23 · RACHAS Y ESTADÍSTICAS — Huayu Diario  (v9.25: + getSummary())
   (v9.47: + sección «✍️ Tus caracteres difíciles» — lee ac_hanzi_stats_v1,
     escrito por los banners de trazos de app.js, y deja practicar cada
     hanzi con un toque)
   =====================================================================
   QUÉ ES
   · Popup #stats-pop (piel .vocab-pop, mismo estilo que SRS / colocación
     / respaldo) con:
       🔥 Racha: días seguidos practicando (+ mejor racha histórica)
       📅 Calendario de actividad de 13 semanas (estilo GitHub)
       🎯 Aciertos totales + palabras dominadas
       📊 Palabras dominadas por nivel HSK (barras 1-9)
       🔢 Mazo SRS por caja (mini gráfico Leitner 10m→30d)
       ✍️ Caracteres difíciles: tus hanzi con más errores de trazo (v9.47)
       ⏱️ Minutos practicados (estimación honesta) + total
       📍 Aviso: "tus datos viven en este dispositivo" + 💾 respaldo
   · BILINGÜE según el modo: es-cn (aprendo chino) → español; cn-es
     (aprendo español) → 简体. Mismo criterio que la guía v9.22.

   CÓMO CAPTURA LA ACTIVIDAD (cero invasión)
   · NO toca app.js ni style.css. Envuelve localStorage.setItem (queda
     instalado ANTES de app.js porque index.html carga este archivo
     primero) y observa DOS claves:
       - 'chino-espanol-app-v2' (saveProgress): delta de state.score →
         aciertos del día (delta normal = 1 por respuesta correcta).
       - 'ac_srs' (grade del mazo): delta de sum(r)+sum(l) → repasos
         del día (good/easy suman r; again suma l).
     Deltas fuera de rango (respaldo importado, reset) → re-base sin
     contar nada. Nunca escribe en esas claves: solo las mira.
   · ⏱️ Minutos: latido propio cada 15 s suma 15 s si la pestaña está
     visible y hubo interacción en los últimos 2 min. Es una ESTIMACIÓN.
   · Persistencia: 'ac_stats_v1' — clave ac_* que el respaldo de app.js
     (backupCollect) ya incluye: las rachas viajan con tu respaldo JSON.
   · Día activo = ≥1 acierto, ≥1 repaso SRS o ≥1 minuto activo.
   · RACHA: días activos consecutivos hasta hoy (o hasta ayer si hoy
     todavía no practicaste → queda "en riesgo", nunca se rompe sola).

   v9.25 · LECTURA PARA OTROS MÓDULOS: HuayuStats.getSummary() devuelve
     un resumen de solo lectura {streak, streakRisk, todayPracticed,
     best, todayA, todayR, minutesToday, minutesTotal} — lo usa la guía
     (onboarding.js) para mostrar la racha EN VIVO en su callout 🔥.
     NUNCA escribe: si algo falla devuelve null y el que llama degrada
     con gracia (la guía queda con su texto por defecto).

   v9.26 · FIX CRÍTICO DE CAPTURA: el guard del wrapper vivía en una
     propiedad de localStorage (`__hsWrap`) — pero asignar propiedades a
     localStorage crea ITEMS REALES y persistentes → tras el primer reload
     installCapture() hacía early-return y la actividad dejaba de
     capturarse (racha congelada para quien recargara la app). Ahora el
     guard vive en window (solo del realm) y se limpia el item legado.
     Detectado y verificado por el QA de v9.26 (reload + acierto).

   v9.28 · 4 MEJORAS DE LA RONDA QA 2 (cruce app.js ↔ stats.js):
     (1) flush() escribe con _origSet (el setItem SIN envolver): antes
         reentraba por capture() y, durante una importación de respaldo,
         podía pisar el LOG recién importado con el LOG en memoria
         (el orden de las claves del respaldo no es determinista).
     (2) capture() respeta escrituras EXTERNAS a la propia clave
         (k === LS_KEY → LOG = hsParseLog(v)): importar un respaldo
         actualiza el historial en memoria en vez de ser pisado.
     (3) capture() honra window.__hsImporting (flag de doBackupImport en
         app.js): una importación re-basa baselines y NO cuenta los
         deltas como aciertos/repasos de hoy.
     (4) el latido de minutos acumula en memoria y va a disco cada ~60 s
         (4 ticks) en vez de un setItem sincrónico cada 15 s: mismo
         corte de día activo (hsIsActive usa 60 s) con 4× menos
         escrituras durante la práctica.
     + #stats-pop ahora cierra con Escape y clic afuera (convención del
     resto de los overlays).

   NO toca: Leitner/doGrade, cloze, solo oído, pares mínimos, lecciones,
   clásicos, evaluador de voz, pinyin-pro, guía. Sin dependencias. Si
   algo falla, la app sigue funcionando igual (todo con try/catch).
   ===================================================================== */
(function () {
    'use strict';
    if (window.HuayuStats) return; // idempotente

    var LS_KEY = 'ac_stats_v1';             // {v:1, days:{'YYYY-MM-DD':{a,r,s}}}
    var MODE_KEY = 'chino-espanol-app-v2';  // SOLO LECTURA (misma clave de app.js)
    var SRS_KEY = 'ac_srs';                 // SOLO LECTURA (mazo del SRS)
    var TICK_MS = 15000;                    // latido de minutos
    var ACT_WIN_MS = 120000;                // interacción reciente ≤ 2 min
    var WEEKS = 13;                         // 13 semanas × 7 días = 91 celdas

    function $(id) { return document.getElementById(id); }
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privado */ } }

    /* ===== HS-PURE-BEGIN (funciones puras — testeables en sandbox) ===== */

    // Clave de día en hora LOCAL (no UTC: la racha debe cortar a medianoche
    // del usuario, no del servidor).
    function hsDayKey(d) {
        d = d || new Date();
        var m = d.getMonth() + 1, day = d.getDate();
        return d.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
    }
    function hsShiftKey(key, deltaDays) {
        var p = String(key || '').split('-');
        var d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
        d.setDate(d.getDate() + deltaDays);
        return hsDayKey(d);
    }
    function hsAddDay(days, key, field, n) {
        if (!days[key] || typeof days[key] !== 'object') days[key] = { a: 0, r: 0, s: 0 };
        if (typeof days[key][field] !== 'number') days[key][field] = 0;
        days[key][field] += n;
        return days;
    }
    // Día activo: ≥1 acierto, ≥1 repaso SRS o ≥1 minuto de tiempo activo.
    function hsIsActive(d) {
        return !!d && ((d.a || 0) > 0 || (d.r || 0) > 0 || (d.s || 0) >= 60);
    }
    function hsWalkBack(days, key, cap) {
        var n = 0;
        cap = cap || 3650;
        while (n < cap && hsIsActive(days[key])) { n++; key = hsShiftKey(key, -1); }
        return n;
    }
    // Racha: consecutivos hasta hoy; si hoy aún no hay actividad, hasta ayer
    // (risk=true: la racha sigue viva pero se pierde si hoy no practica).
    function hsStreak(days, todayKey) {
        if (hsIsActive(days[todayKey])) return { n: hsWalkBack(days, todayKey), risk: false, alive: true };
        var y = hsShiftKey(todayKey, -1);
        if (hsIsActive(days[y])) return { n: hsWalkBack(days, y), risk: true, alive: true };
        return { n: 0, risk: false, alive: false };
    }
    function hsBest(days) {
        var keys = Object.keys(days).filter(function (k) { return hsIsActive(days[k]); }).sort();
        var best = 0, run = 0, prev = '';
        for (var i = 0; i < keys.length; i++) {
            run = (prev && hsShiftKey(prev, 1) === keys[i]) ? run + 1 : 1;
            if (run > best) best = run;
            prev = keys[i];
        }
        return best;
    }
    // Intensidad 0..4 (tipo GitHub): umbrales fijos y previsibles.
    function hsLevel(c) {
        if (!c || c <= 0) return 0;
        if (c <= 2) return 1;
        if (c <= 6) return 2;
        if (c <= 14) return 3;
        return 4;
    }
    // Grilla de `weeks` columnas × 7 filas (lun=0) terminando en la semana
    // actual. Celdas futuras → future=true (se dibujan invisibles).
    function hsCalendar(todayKey, weeks) {
        weeks = weeks || WEEKS;
        var p = String(todayKey).split('-');
        var today = new Date(+p[0], +p[1] - 1, +p[2]);
        var dow = (today.getDay() + 6) % 7; // lunes = 0
        var start = new Date(today);
        start.setDate(start.getDate() - (weeks - 1) * 7 - dow);
        var cells = [], months = [];
        for (var i = 0; i < weeks * 7; i++) {
            var d = new Date(start);
            d.setDate(start.getDate() + i);
            var col = Math.floor(i / 7);
            cells.push({
                key: hsDayKey(d),
                future: d > today,
                count: 0,
                level: 0,
                dow: i % 7,
                col: col
            });
            if (i % 7 === 0) months.push({ col: col, m: d.getMonth() + 1 });
        }
        return { cells: cells, months: months };
    }
    // Distribución del mazo por caja: [_, b1..b6] (índice = caja).
    function hsBoxDist(cards) {
        var dist = [0, 0, 0, 0, 0, 0, 0];
        if (cards && typeof cards === 'object') {
            for (var zh in cards) {
                var c = cards[zh];
                if (c && c.b >= 1 && c.b <= 6) dist[c.b]++;
            }
        }
        return dist;
    }
    // Mapa palabra→nivel HSK desde los datos embebidos de app.js
    // (EMBEDDED_MODULE_DATA: cada oración trae level 1..9). Devuelve el mapa
    // y NO muta los datos (compara referencias de arrays, sin marcadores).
    function hsWordLevelMap(modData) {
        var map = {};
        if (!modData || typeof modData !== 'object') return map;
        var seen = [];
        var arrays = [];
        try {
            var keys = Object.keys(modData);
            for (var i = 0; i < keys.length; i++) {
                var arr = modData[keys[i]];
                if (Array.isArray(arr) && seen.indexOf(arr) === -1) { seen.push(arr); arrays.push(arr); }
            }
        } catch (e) { return map; }
        for (var a = 0; a < arrays.length; a++) {
            var rows = arrays[a];
            for (var r = 0; r < rows.length; r++) {
                var s = rows[r];
                var lv = s && s.level;
                if (typeof lv !== 'number' || lv < 1 || lv > 9) continue;
                var ws = [s.chinese_simp_answer, s.chinese_trad_answer, s.spanish_answer];
                for (var w = 0; w < ws.length; w++) {
                    var word = String(ws[w] || '').trim();
                    if (word && !(word in map)) map[word] = lv;
                }
            }
        }
        return map;
    }
    // Histograma 1..9 de palabras dominadas. Fallback: lv de la tarjeta SRS.
    function hsHskHist(words, map, cards) {
        var hist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        var un = 0, list = words || [];
        for (var i = 0; i < list.length; i++) {
            var lv = map ? map[list[i]] : 0;
            if (!(lv >= 1 && lv <= 9) && cards) {
                var c = cards[list[i]];
                if (c && c.lv >= 1 && c.lv <= 9) lv = c.lv;
            }
            if (lv >= 1 && lv <= 9) hist[lv]++;
            else un++;
        }
        return { hist: hist, un: un, total: list.length };
    }
    function hsTotals(days) {
        var a = 0, r = 0, s = 0;
        for (var k in days) {
            if (!days[k]) continue; // v9.28: basta con esto (hsIsActive no filtraba nada aquí y despistaba al leer)
            var d = days[k] || {};
            a += d.a || 0; r += d.r || 0; s += d.s || 0;
        }
        return { a: a, r: r, s: s };
    }
    // Extractores defensivos de las claves de app.js (solo lectura).
    function hsReadScore(raw) {
        if (typeof raw !== 'string' || !raw) return null;
        try {
            var o = JSON.parse(raw);
            return (o && typeof o.score === 'number') ? o.score : null;
        } catch (e) { return null; }
    }
    function hsReadSrsSum(raw) {
        if (typeof raw !== 'string' || !raw) return null;
        try {
            var o = JSON.parse(raw);
            if (!o || !o.cards || typeof o.cards !== 'object') return null;
            var sum = 0, n = 0;
            for (var k in o.cards) {
                var c = o.cards[k];
                if (c && typeof c === 'object') { sum += (c.r || 0) + (c.l || 0); n++; }
            }
            return { sum: sum, cards: n };
        } catch (e) { return null; }
    }
    function hsParseState(raw) {
        var out = { score: 0, known: [] };
        try {
            var o = JSON.parse(raw || 'null');
            if (o && typeof o === 'object') {
                if (typeof o.score === 'number') out.score = o.score;
                if (Array.isArray(o.knownWords)) out.known = o.knownWords.filter(function (w) { return typeof w === 'string' && w; });
            }
        } catch (e) { /* corrupto → ceros */ }
        return out;
    }
    function hsParseLog(raw) {
        try {
            var o = JSON.parse(raw || 'null');
            if (o && o.v === 1 && o.days && typeof o.days === 'object') return o;
        } catch (e) { /* corrupto → nuevo */ }
        return { v: 1, days: {} };
    }

    /* ===== HS-PURE-END ===== */

    // ---------------- captura de actividad (wrapper de setItem) ----------------
    var LOG = { v: 1, days: {} };
    var _lastScore = null;   // baseline leída al init (antes de app.js)
    var _lastSrs = null;
    var _origSet = null;

    function flush() {
        // v9.28: escribe con _origSet (el setItem SIN envolver). Antes pasaba
        // por el wrapper → capture() reentraba por la propia clave; durante
        // una importación de respaldo ese reingreso podía pisar el LOG
        // recién importado con el LOG en memoria (orden de claves no
        // determinista: a veces ganaba el import, a veces no).
        try {
            if (_origSet) _origSet(LS_KEY, JSON.stringify(LOG));
            else localStorage.setItem(LS_KEY, JSON.stringify(LOG));
        } catch (e) { /* lleno/privado */ }
    }
    // Acepta deltas chicos (respuesta a respuesta). Saltos grandes o
    // negativos = importación de respaldo / reset → re-base sin contar.
    function logAdd(field, n) {
        try {
            hsAddDay(LOG.days, hsDayKey(), field, n);
            flush();
        } catch (e) { /* nunca romper la app */ }
    }
    function capture(k, v) {
        // v9.28: escritura EXTERNA a la propia clave (import de respaldo,
        // restauración, otra versión) → se RESPETA: el LOG en memoria se
        // recarga del valor recién escrito. flush() ya no pasa por acá
        // (usa _origSet), así que toda escritura de LS_KEY que llega es
        // genuinamente externa.
        if (k === LS_KEY) {
            try { LOG = hsParseLog(v); } catch (e) { /* valor raro → LOG intacto */ }
            return;
        }
        // v9.28: importación de respaldo en curso (flag de doBackupImport,
        // app.js) → re-base de baselines SIN contar nada: el log importado
        // ya trae su propia historia y esos deltas no son práctica de hoy.
        var importing = false;
        try { importing = !!window.__hsImporting; } catch (e) { /* sin flag */ }
        if (importing) {
            if (k === MODE_KEY) {
                var scI = hsReadScore(v);
                if (scI !== null) _lastScore = scI;
            } else if (k === SRS_KEY) {
                var smI = hsReadSrsSum(v);
                if (smI !== null) _lastSrs = smI.sum;
            }
            return;
        }
        if (k === MODE_KEY) {
            var sc = hsReadScore(v);
            if (sc === null) return;
            if (_lastScore === null) { _lastScore = sc; return; }
            var d = sc - _lastScore;
            _lastScore = sc;
            if (d >= 1 && d <= 20) logAdd('a', d);
            // d > 20 (import) o d < 0 (reset): re-base silencioso
        } else if (k === SRS_KEY) {
            var sm = hsReadSrsSum(v);
            if (sm === null) return;
            if (_lastSrs === null) { _lastSrs = sm.sum; return; }
            var d2 = sm.sum - _lastSrs;
            _lastSrs = sm.sum;
            if (d2 >= 1 && d2 <= 30) logAdd('r', d2);
        }
    }
    function installCapture() {
        try {
            // v9.26 FIX CRÍTICO: el guard era `localStorage.__hsWrap` — pero
            // ASIGNAR una propiedad a localStorage crea un ITEM REAL y
            // persistente (setter de propiedades con nombre del Storage), así
            // que tras el PRIMER reload este early-return volaba para siempre:
            // la captura moría y la racha se congelaba (detectado por el QA de
            // v9.26 con reload + acierto: days:{}). El guard ahora vive en
            // window (propiedad de realm: muere con la página, nunca viaja a
            // disco) y de paso se limpia el item legado si existiera.
            if (window.__hsWrap) return;
            try { localStorage.removeItem('__hsWrap'); } catch (e2) { /* legado */ }
            _origSet = localStorage.setItem.bind(localStorage);
            // Baselines: valor guardado, o 0 si todavía no hay estado. 0 es
            // seguro: en perfil fresco la 1.ª escritura puede ser directamente
            // el 1.er acierto (score 1 → delta 1 ✓) y una importación de
            // respaldo salta el re-base por delta grande.
            var sc0 = hsReadScore(lsGet(MODE_KEY));
            _lastScore = (sc0 === null) ? 0 : sc0;
            var s0 = hsReadSrsSum(lsGet(SRS_KEY));
            _lastSrs = s0 ? s0.sum : 0;
            window.__hsWrap = true;
            localStorage.setItem = function (k, v) {
                try { capture(k, v); } catch (e) { /* jamás bloquear */ }
                return _origSet(k, v);
            };
        } catch (e) { /* sin storage: solo minutos visibles en vivo */ }
    }

    // ---------------- minutos activos (estimación) ----------------
    var _lastAct = 0;
    function poke() { _lastAct = Date.now(); }
    function installTracker() {
        try {
            ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (ev) {
                document.addEventListener(ev, poke, { passive: true, capture: true });
            });
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) flush();
                else poke();
            });
            window.addEventListener('pagehide', flush);
            // v9.28: los segundos se acumulan EN MEMORIA y van a disco cada
            // ~60 s (4 latidos) en vez de un setItem sincrónico cada 15 s
            // durante toda la práctica. Mismo corte de "día activo":
            // hsIsActive ya usa granularidad de 60 s. visibilitychange y
            // pagehide siguen vaciando lo pendiente al ocultar/salir.
            var _pend = 0;
            setInterval(function () {
                try {
                    if (!document.hidden && Date.now() - _lastAct <= ACT_WIN_MS) {
                        _pend += TICK_MS / 1000;
                        hsAddDay(LOG.days, hsDayKey(), 's', TICK_MS / 1000); // solo memoria
                        if (_pend >= 60) { _pend = 0; flush(); }             // disco ~1×/min
                    }
                } catch (e) { /* silencioso */ }
            }, TICK_MS);
        } catch (e) { /* silencioso */ }
    }

    // ---------------- modo (mismo criterio que la guía v9.22) ----------------
    // DOM primero: updateUILanguage() marca hidden-force en #btn-play-es
    // cuando se aprende CHINO (es-cn) y lo quita en cn-es.
    function hsProbeMode(docLike) {
        if (!docLike || typeof docLike.getElementById !== 'function') return null;
        var es = docLike.getElementById('btn-play-es');
        if (!es || !es.classList || typeof es.classList.contains !== 'function') return null;
        return es.classList.contains('hidden-force') ? 'es-cn' : 'cn-es';
    }
    function hsStoredMode(raw) {
        if (typeof raw !== 'string' || !raw) return null;
        try {
            var m = (JSON.parse(raw) || {}).mode;
            return (m === 'es-cn' || m === 'cn-es') ? m : null;
        } catch (e) { return null; }
    }
    function hsLangFor(mode) { return mode === 'cn-es' ? 'cn-es' : 'es-cn'; }
    function currentMode() {
        var m = hsProbeMode(document);
        if (m) return m;
        m = hsStoredMode(lsGet(MODE_KEY));
        return m || 'es-cn';
    }

    // ---------------- estilos (auto-inyectados, respeta los 3 temas) ----------------
    var ST_CSS = [
        '#stats-pop{max-height:min(82vh,660px);}',
        '#stats-body{max-height:calc(min(82vh,660px) - 92px);overflow-y:auto;-webkit-overflow-scrolling:touch;}',
        '.st-title{margin:0 0 10px;font-size:1.14rem;font-weight:800;color:var(--text-primary);}',
        '.st-hero{text-align:center;background:var(--bg-light);border:1px solid var(--border);border-radius:12px;padding:10px 8px;margin-bottom:12px;}',
        '.st-hero-n{font-size:2.3rem;font-weight:900;color:var(--primary);line-height:1;letter-spacing:-.5px;}',
        '.st-hero-n .st-fire{font-size:1.5rem;}',
        '.st-hero-l{font-size:.84rem;color:var(--text-secondary);margin-top:2px;}',
        '.st-hero-sub{font-size:.78rem;color:var(--text-secondary);margin-top:5px;}',
        '.st-risk{display:inline-block;margin-top:6px;font-size:.78rem;font-weight:700;color:#b45309;background:rgba(217,119,6,.12);border:1px solid rgba(217,119,6,.35);border-radius:9px;padding:3px 9px;}',
        '.st-ok{display:inline-block;margin-top:6px;font-size:.78rem;font-weight:700;color:#15803d;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.3);border-radius:9px;padding:3px 9px;}',
        '.st-sec{font-size:.9rem;font-weight:800;color:var(--text-primary);margin:12px 0 7px;}',
        '.st-cal{margin:0 auto;width:max-content;max-width:100%;overflow-x:auto;padding-bottom:2px;}',
        '.st-cal-months{display:grid;grid-auto-flow:column;grid-auto-columns:13px;margin-bottom:3px;}',
        '.st-cal-months span{font-size:.6rem;color:var(--text-secondary);white-space:nowrap;}',
        '.st-cal-grid{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,11px);grid-auto-columns:11px;gap:2px;}',
        '.st-cell{width:11px;height:11px;border-radius:3px;background:var(--border);}',
        '.st-cell.l1{background:var(--primary);opacity:.25;}',
        '.st-cell.l2{background:var(--primary);opacity:.45;}',
        '.st-cell.l3{background:var(--primary);opacity:.7;}',
        '.st-cell.l4{background:var(--primary);opacity:1;}',
        '.st-cell.fut{visibility:hidden;}',
        '.st-cell.today{outline:2px solid var(--primary);outline-offset:1px;}',
        '.st-legend{display:flex;align-items:center;gap:4px;justify-content:flex-end;margin-top:5px;font-size:.68rem;color:var(--text-secondary);}',
        '.st-legend i{display:inline-block;width:9px;height:9px;border-radius:2.5px;}',
        '.st-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}',
        '.st-tile{background:var(--bg-light);border:1px solid var(--border);border-radius:11px;padding:9px 4px;text-align:center;}',
        '.st-tile-v{font-size:1.2rem;font-weight:900;color:var(--primary);line-height:1.15;}',
        '.st-tile-k{font-size:.68rem;color:var(--text-secondary);margin-top:2px;line-height:1.3;}',
        '.st-hrow{display:flex;align-items:center;gap:7px;margin-bottom:5px;}',
        '.st-hk{width:40px;font-size:.72rem;color:var(--text-secondary);text-align:right;flex:none;}',
        '.st-htrack{flex:1;height:11px;background:var(--bg-light);border-radius:6px;overflow:hidden;}',
        '.st-hbar{display:block;height:100%;background:var(--primary);border-radius:6px;}',
        '.st-hn{width:26px;font-size:.72rem;font-weight:800;color:var(--text-primary);flex:none;}',
        '.st-note-sm{font-size:.74rem;color:var(--text-secondary);margin-top:6px;line-height:1.45;}',
        '.st-leit{display:flex;align-items:flex-end;gap:7px;height:74px;margin-top:2px;}',
        '.st-leit-col{flex:1;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;}',
        '.st-leit-bar{width:100%;max-width:36px;border-radius:5px 5px 2px 2px;background:var(--primary);}',
        '.st-leit-n{font-size:.68rem;font-weight:700;color:var(--text-primary);}',
        '.st-leit-l{font-size:.62rem;color:var(--text-secondary);}',
        '.st-foot{margin-top:14px;padding:10px 11px;border:1px dashed var(--border);border-radius:11px;background:var(--bg-light);font-size:.82rem;color:var(--text-secondary);line-height:1.5;}',
        '.st-foot b{color:var(--text-primary);}',
        '.st-actions{display:flex;gap:8px;margin-top:10px;}',
        '.st-actions .btn-primary{flex:1;}',
        // v9.47: chips de hanzi difíciles
        '.st-hz-grid{display:flex;flex-wrap:wrap;gap:7px;margin-top:2px;}',
        '.st-hz{display:flex;flex-direction:column;align-items:center;gap:1px;min-width:52px;padding:7px 8px 5px;background:var(--bg-light);border:1px solid var(--border);border-radius:10px;cursor:pointer;font-family:inherit;}',
        '.st-hz:hover{border-color:var(--primary);}',
        '.st-hz-ch{font-size:1.5rem;line-height:1.15;font-weight:700;color:var(--text-primary);}',
        '.st-hz-m{font-size:.66rem;font-weight:800;color:#b91c1c;line-height:1.2;}',
        '.st-hz-q{font-size:.6rem;color:var(--text-secondary);line-height:1.2;}'
    ].join('\n');

    // ---------------- textos bilingües ----------------
    var PACKS = {
        'es-cn': {
            btnLabel: '📊 Racha',
            btnTitle: 'Tu racha, tu calendario y tu progreso',
            aria: 'Rachas y estadísticas',
            title: '🔥 Tu racha',
            heroUnit: 'días seguidos',
            heroZero: '¡Empezá hoy tu racha! 10 minutos alcanzan.',
            risk: '⚠ Practicá hoy para no perderla',
            okToday: 'Hoy ya practicaste ✓',
            best: 'Mejor racha',
            today: 'hoy',
            aciertosToday: 'aciertos',
            calTitle: '📅 Actividad · 13 semanas',
            calEmpty: 'Cuando practiques, acá se va pintando tu constancia.',
            less: 'menos', more: 'más',
            tAciertos: '🎯 Aciertos totales',
            tDominadas: '📚 Palabras dominadas',
            tMinutos: '⏱️ Minutos',
            minHoy: 'hoy', minEst: 'estimado',
            hskTitle: '📊 Dominadas por nivel HSK',
            hskNote: 'Cada palabra se clasifica con el nivel de la frase donde la aprendiste.',
            hskUn: 'sin clasificar',
            leitTitle: '🔢 Mazo SRS por caja',
            leitNote: 'palabras en el mazo · a más caja, más lejos está el próximo repaso',
            leitL: ['10m', '1d', '3d', '7d', '14d', '30d'],
            months: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            footA: '📍 <b>Tus estadísticas viven solo en este dispositivo</b> (localStorage del navegador). No se suben a ningún servidor.',
            footB: 'Para no perderlas —o llevarlas a otro equipo— descargá tu respaldo de vez en cuando: las rachas viajan con él.',
            btnBackup: '💾 Abrir respaldo',
            hzTitle: '✍️ Tus caracteres difíciles',
            hzEmpty: 'Practicá el orden de trazos (✍ en cualquier palabra china) y acá vas a ver cuáles te cuestan más.',
            hzNote: '✗ errores al trazar · × veces trazado · tocá un carácter para practicarlo'
        },
        'cn-es': {
            btnLabel: '📊 打卡',
            btnTitle: '你的打卡、日历和进步统计',
            aria: '打卡与统计',
            title: '🔥 你的打卡',
            heroUnit: '天连续学习',
            heroZero: '今天开始打卡！10 分钟就够了。',
            risk: '⚠ 今天练一练，别断链！',
            okToday: '今天已经学习 ✓',
            best: '最长连续',
            today: '今天',
            aciertosToday: '次答对',
            calTitle: '📅 学习日历 · 13 周',
            calEmpty: '开始学习后，这里会记录你的坚持。',
            less: '少', more: '多',
            tAciertos: '🎯 累计答对',
            tDominadas: '📚 掌握词汇',
            tMinutos: '⏱️ 分钟',
            minHoy: '今天', minEst: '估算',
            hskTitle: '📊 掌握词汇的 HSK 级别',
            hskNote: '每个词按你学会它的那个句子的级别来归类。',
            hskUn: '未分级',
            leitTitle: '🔢 复习卡盒分布',
            leitNote: '张卡在册 · 盒数越高，下次复习隔得越久',
            leitL: ['10分', '1天', '3天', '7天', '14天', '30天'],
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            footA: '📍 <b>你的统计只保存在这台设备上</b>（浏览器的 localStorage），不会上传到任何服务器。',
            footB: '想不丢数据、或者换台设备继续学，就定期下载备份：打卡记录会跟着备份一起走。',
            btnBackup: '💾 打开备份',
            hzTitle: '✍️ 你的难写汉字',
            hzEmpty: '练一练笔顺（点汉字选 ✍ 练习），这里会显示你觉得最难写的字。',
            hzNote: '✗ 写错次数 · × 练习次数 · 点一个字来练习'
        }
    };

    // ---------------- lecturas en vivo (solo lectura) ----------------
    function readState() { return hsParseState(lsGet(MODE_KEY)); }
    function readCards() {
        var sm = hsReadSrsSum(lsGet(SRS_KEY));
        var cards = null;
        try {
            var o = JSON.parse(lsGet(SRS_KEY) || 'null');
            if (o && o.cards && typeof o.cards === 'object') cards = o.cards;
        } catch (e) { /* sin mazo */ }
        return { cards: cards, count: sm ? sm.cards : 0 };
    }
    function readDays() { return hsParseLog(lsGet(LS_KEY)).days; }
    function readEmbedded() {
        try { return EMBEDDED_MODULE_DATA; } catch (e) { return null; } // ReferenceError → sin mapa
    }

    // ---------------- v9.47: trazos por hanzi (ac_hanzi_stats_v1) ----------------
    // Escrito por app.js (banners de trazos): { v:1, chars: { 字: {t,m,h,q} } }
    //   t = quizzes iniciados · m = errores de trazo · h = pistas 💡 · q = completados.
    // Devuelve { count, top } — top = los más difíciles primero (más errores;
    // desempate: menos completados). Solo lectura: app.js es el dueño de la clave.
    function readHanziStats() {
        var chars = {};
        try {
            var o = JSON.parse(lsGet('ac_hanzi_stats_v1') || 'null');
            if (o && o.v === 1 && o.chars) chars = o.chars;
        } catch (e) { chars = {}; }
        var arr = [];
        for (var ch in chars) {
            if (!Object.prototype.hasOwnProperty.call(chars, ch)) continue;
            var r = chars[ch] || {};
            var m = r.m || 0, q = r.q || 0, t = r.t || 0, h = r.h || 0;
            if (m || q || t || h) arr.push({ ch: ch, m: m, q: q, t: t, h: h });
        }
        arr.sort(function (a, b) {
            if (b.m !== a.m) return b.m - a.m; // más errores de trazo primero
            if (a.q !== b.q) return a.q - b.q; // desempate: menos veces completado
            return a.ch < b.ch ? -1 : 1;
        });
        return { count: arr.length, top: arr.slice(0, 8) };
    }

    // ---------------- inyección de UI ----------------
    function injectStyles() {
        if ($('stats-styles')) return;
        var st = document.createElement('style');
        st.id = 'stats-styles';
        st.textContent = ST_CSS;
        document.head.appendChild(st);
    }
    function injectButton() {
        if ($('btn-stats')) return;
        var host = document.querySelector('.header-actions');
        if (!host) return;
        var btn = document.createElement('button');
        btn.id = 'btn-stats';
        btn.type = 'button';
        btn.className = 'lang-switch-btn';           // misma piel del pill del header
        btn.addEventListener('click', function () { open(); });
        // Posición estable: DESPUÉS de 📖 Guía (v9.22). Los listeners
        // DOMContentLoaded corren en orden de script (onboarding → stats),
        // así que #btn-guide ya existe acá; si no, cae al inicio.
        var guide = $('btn-guide');
        if (guide && guide.parentNode === host) host.insertBefore(btn, guide.nextSibling);
        else host.insertBefore(btn, host.firstChild);
        applyLabel();
    }
    function applyLabel() {
        var btn = $('btn-stats');
        if (!btn) return;
        var P = PACKS[hsLangFor(currentMode())];
        btn.textContent = P.btnLabel;
        btn.title = P.btnTitle;
    }
    function watchMode() {
        try {
            var es = $('btn-play-es');
            if (es && typeof MutationObserver !== 'undefined') {
                new MutationObserver(applyLabel).observe(es, { attributes: true, attributeFilter: ['class'] });
            }
            setTimeout(applyLabel, 400);
            setTimeout(applyLabel, 1500);
        } catch (e) { /* cosmético */ }
    }
    function buildOverlay() {
        if ($('stats-pop')) return;
        var pop = document.createElement('div');
        pop.id = 'stats-pop';
        pop.className = 'vocab-pop hidden';
        pop.setAttribute('role', 'dialog');
        pop.setAttribute('aria-modal', 'true');
        var P = PACKS[hsLangFor(currentMode())];
        pop.setAttribute('aria-label', P.aria);
        var x = document.createElement('button');
        x.id = 'btn-stats-close';
        x.className = 'vocab-pop-close';
        x.type = 'button';
        x.setAttribute('aria-label', 'Cerrar');
        x.textContent = '✕';
        x.addEventListener('click', close);
        var body = document.createElement('div');
        body.id = 'stats-body';
        pop.appendChild(x);
        pop.appendChild(body);
        // v9.47: tocar un hanzi difícil → cierra el pop y abre la práctica de
        // trazos de ese carácter (openWriterPractice vive en app.js; si no
        // estuviera, el pop simplemente se cierra — la app sigue).
        body.addEventListener('click', function (e) {
            var b = e.target && e.target.closest ? e.target.closest('.st-hz') : null;
            if (!b) return;
            var ch = b.getAttribute('data-hz') || '';
            if (!ch) return;
            close();
            if (typeof window.openWriterPractice === 'function') {
                try { window.openWriterPractice(ch); } catch (err) { /* la app sigue */ }
            }
        });
        document.body.appendChild(pop);
    }

    /* ---------------- render ---------------- */
    function escH(t) {
        return String(t).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function cellTitle(P, c, d) {
        var parts = [];
        parts.push(c.key);
        parts.push(P.aciertosToday + ': ' + (d ? (d.a || 0) : 0));
        parts.push('SRS: ' + (d ? (d.r || 0) : 0));
        parts.push(P.tMinutos + ': ' + Math.round((d ? (d.s || 0) : 0) / 60) + ' ' + P.minEst);
        return parts.join(' · ');
    }
    function render() {
        var P = PACKS[hsLangFor(currentMode())];
        var body = $('stats-body');
        if (!body) return;

        var days = readDays();
        var todayKey = hsDayKey();
        var st = readState();
        var deck = readCards();
        var cards = deck.cards;
        var tot = hsTotals(days);
        var streak = hsStreak(days, todayKey);
        var best = Math.max(hsBest(days), streak.n);
        var today = days[todayKey] || { a: 0, r: 0, s: 0 };
        var minTotal = Math.round(tot.s / 60);
        var minHoy = Math.round((today.s || 0) / 60);

        var h = '<h3 class="st-title">' + escH(P.title) + '</h3>';

        // --- hero racha ---
        h += '<div class="st-hero">' +
            '<div class="st-hero-n"><span class="st-fire">🔥</span> ' + streak.n + '</div>' +
            '<div class="st-hero-l">' + escH(P.heroUnit) + '</div>';
        if (streak.n === 0) {
            h += '<div class="st-hero-sub">' + escH(P.heroZero) + '</div>';
        } else if (streak.risk) {
            h += '<div><span class="st-risk">' + escH(P.risk) + '</span></div>';
        } else {
            h += '<div><span class="st-ok">' + escH(P.okToday) + '</span></div>';
        }
        h += '<div class="st-hero-sub">' + escH(P.best) + ': ' + best +
            ' · ' + escH(P.today) + ': +' + (today.a || 0) + ' ' + escH(P.aciertosToday) +
            ' / +' + (today.r || 0) + ' SRS</div></div>';

        // --- calendario 13 semanas ---
        h += '<div class="st-sec">' + escH(P.calTitle) + '</div>';
        var cal = hsCalendar(todayKey, WEEKS);
        var dmap = days;
        cal.cells.forEach(function (c) {
            var d = dmap[c.key];
            c.count = (d ? (d.a || 0) + (d.r || 0) : 0);
            c.level = hsLevel(c.count);
        });
        var mh = '<div class="st-cal-months">';
        cal.months.forEach(function (m, i) {
            var prev = i > 0 ? cal.months[i - 1].m : -1;
            mh += '<span>' + (m.m !== prev ? escH(P.months[m.m - 1]) : '') + '</span>';
        });
        mh += '</div>';
        var gh = '<div class="st-cal-grid">';
        cal.cells.forEach(function (c) {
            gh += '<i class="st-cell' + (c.level ? ' l' + c.level : '') + (c.future ? ' fut' : '') +
                (c.key === todayKey ? ' today' : '') + '" title="' + escH(cellTitle(P, c, dmap[c.key])) + '"></i>';
        });
        gh += '</div>';
        h += '<div class="st-cal">' + mh + gh + '</div>';
        h += '<div class="st-legend">' + escH(P.less) +
            ' <i style="background:var(--border)"></i><i class="st-cell l1" style="width:9px;height:9px"></i>' +
            '<i class="st-cell l2" style="width:9px;height:9px"></i><i class="st-cell l3" style="width:9px;height:9px"></i>' +
            '<i class="st-cell l4" style="width:9px;height:9px"></i> ' + escH(P.more) + '</div>';
        if (tot.a + tot.r + tot.s === 0) h += '<p class="st-note-sm">' + escH(P.calEmpty) + '</p>';

        // --- tiles: aciertos / dominadas / minutos ---
        h += '<div class="st-tiles" style="margin-top:12px;">' +
            '<div class="st-tile"><div class="st-tile-v">' + (st.score || 0) + '</div><div class="st-tile-k">' + escH(P.tAciertos) + '</div></div>' +
            '<div class="st-tile"><div class="st-tile-v">' + (st.known ? st.known.length : 0) + '</div><div class="st-tile-k">' + escH(P.tDominadas) + '</div></div>' +
            '<div class="st-tile"><div class="st-tile-v">' + minTotal + '</div><div class="st-tile-k">' + escH(P.tMinutos) + ' · ' + escH(P.minHoy) + ' ' + minHoy + '</div></div>' +
            '</div>';

        // --- barras HSK 1-9 ---
        var map = hsWordLevelMap(readEmbedded());
        var hh = hsHskHist(st.known, map, cards);
        var maxH = 0;
        for (var lv = 1; lv <= 9; lv++) if (hh.hist[lv] > maxH) maxH = hh.hist[lv];
        h += '<div class="st-sec">' + escH(P.hskTitle) + '</div>';
        for (var l2 = 1; l2 <= 9; l2++) {
            var n = hh.hist[l2];
            var w = maxH ? Math.round(n / maxH * 100) : 0;
            h += '<div class="st-hrow"><span class="st-hk">HSK ' + l2 + '</span>' +
                '<span class="st-htrack"><span class="st-hbar" style="width:' + w + '%"></span></span>' +
                '<span class="st-hn">' + n + '</span></div>';
        }
        h += '<p class="st-note-sm">' + escH(P.hskNote) + (hh.un > 0 ? ' (' + escH(P.hskUn) + ': ' + hh.un + ')' : '') + '</p>';

        // --- mazo SRS por caja (mini Leitner) ---
        var dist = hsBoxDist(cards);
        var maxB = 0;
        for (var b = 1; b <= 6; b++) if (dist[b] > maxB) maxB = dist[b];
        h += '<div class="st-sec">' + escH(P.leitTitle) + '</div><div class="st-leit">';
        for (var b2 = 1; b2 <= 6; b2++) {
            var hgt = dist[b2] ? Math.max(10, Math.round(dist[b2] / maxB * 44)) : 3;
            h += '<div class="st-leit-col">' +
                '<span class="st-leit-n">' + dist[b2] + '</span>' +
                '<span class="st-leit-bar" style="height:' + (dist[b2] ? hgt : 3) + 'px;' + (dist[b2] ? '' : 'background:var(--border);') + '"></span>' +
                '<span class="st-leit-l">' + escH(P.leitL[b2 - 1]) + '</span>' +
                '</div>';
        }
        h += '</div><p class="st-note-sm">' + deck.count + ' ' + escH(P.leitNote) + '</p>';

        // --- v9.47: caracteres difíciles (trazos por hanzi) ---
        var hz = readHanziStats();
        h += '<div class="st-sec">' + escH(P.hzTitle) + '</div>';
        if (!hz.count) {
            h += '<p class="st-note-sm">' + escH(P.hzEmpty) + '</p>';
        } else {
            h += '<div class="st-hz-grid">';
            hz.top.forEach(function (r) {
                h += '<button type="button" class="st-hz" data-hz="' + escH(r.ch) + '" title="' +
                    escH(r.ch + ' · ✗ ' + r.m + ' · ' + r.q + '×') + '">' +
                    '<span class="st-hz-ch">' + escH(r.ch) + '</span>' +
                    '<span class="st-hz-m">✗ ' + r.m + '</span>' +
                    '<span class="st-hz-q">' + r.q + '×</span></button>';
            });
            h += '</div>';
            h += '<p class="st-note-sm">' + escH(P.hzNote) + '</p>';
        }

        // --- aviso honesto + respaldo ---
        h += '<div class="st-foot"><p style="margin:0 0 4px;">' + P.footA + '</p><p style="margin:0;">' + P.footB + '</p></div>' +
            '<div class="st-actions"><button type="button" class="btn-primary" id="btn-stats-backup">' + escH(P.btnBackup) + '</button></div>';

        body.innerHTML = h;
        var bb = $('btn-stats-backup');
        if (bb) bb.addEventListener('click', openBackup);
        body.scrollTop = 0;
    }
    function openBackup() {
        try {
            var b = $('btn-backup');                     // botón real del respaldo (app.js)
            if (b) { close(); b.click(); return; }
        } catch (e) { /* cae al aviso */ }
    }

    // ---------------- lectura pública (v9.25: racha en vivo de la guía) ----------------
    // Resumen de SOLO LECTURA de lo ya calculado para el popup. Sin DOM,
    // sin escrituras: los mismos datos del hero, en forma de objeto.
    // El que llama debe tratar null como "sin datos" (degradar con gracia).
    function getSummary() {
        try {
            var days = readDays();
            var todayKey = hsDayKey();
            var streak = hsStreak(days, todayKey);
            var today = days[todayKey] || { a: 0, r: 0, s: 0 };
            return {
                streak: streak.n,                     // días seguidos (0 = todavía nada)
                streakRisk: !!streak.risk,            // viva pero hoy no practicó
                todayPracticed: hsIsActive(today),    // ¿ya hubo actividad hoy?
                best: Math.max(hsBest(days), streak.n),
                todayA: today.a || 0,                 // aciertos hoy
                todayR: today.r || 0,                 // repasos SRS hoy
                minutesToday: Math.round((today.s || 0) / 60),
                minutesTotal: Math.round(hsTotals(days).s / 60)
            };
        } catch (e) { return null; }
    }

    // ---------------- open / close ----------------
    function open() {
        try {
            injectStyles(); buildOverlay();
            var pop = $('stats-pop');
            if (!pop) return;
            pop.setAttribute('aria-label', PACKS[hsLangFor(currentMode())].aria);
            render();
            pop.classList.remove('hidden');
        } catch (e) { console.warn('[stats] no se pudo abrir:', e); }
    }
    function close() {
        var pop = $('stats-pop');
        if (pop) pop.classList.add('hidden');
    }

    // v9.28: Escape y clic afuera cierran el popup — convención del resto de
    // los overlays (vocab-pop, placement, SRS, quiz, clásicos). #btn-stats y
    // #header-streak (chip 🔥 de racha, launcher doble desde v9.37) abren el
    // pop: el MISMO clic que abre burbujea hasta document y no debe
    // re-cerrarlo (v9.37: el chip quedaba fuera de la lista blanca → el pop
    // se cerraba instantáneo tras abrirse = "el botón 🔥 no funciona").
    // ⚠ #btn-stats-backup vive DENTRO del pop → contains() lo
    // protege; su handler hace close() antes de abrir el respaldo.
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var pop = $('stats-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        close();
    });
    document.addEventListener('click', function (e) {
        var pop = $('stats-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        // v9.29: composedPath y NO contains() (mismo fix v7.20 de placement/
        // SRS): si un clic interno re-renderiza el cuerpo, el botón queda
        // descolgado del DOM al burbujear y contains() daría falso negativo
        // (cerraría el popup justo después del clic).
        var path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && (e.target.closest('#btn-stats') || e.target.closest('#header-streak'))) return;
        close();
    });

    // ---------------- init ----------------
    function init() {
        try {
            installCapture();     // ANTES que app.js: baseline + wrapper
            LOG = hsParseLog(lsGet(LS_KEY));
            installTracker();
        } catch (e) { console.warn('[stats] captura no disponible:', e); }
        try {
            injectStyles();
            injectButton();
            watchMode();
        } catch (e) { console.warn('[stats] init falló (la app sigue igual):', e); }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    // API pública mínima (QA, tests y otros módulos)
    window.HuayuStats = {
        open: open,
        close: close,
        getSummary: getSummary,   // v9.25: resumen de solo lectura (racha en vivo de la guía)
        _pure: {
            dayKey: hsDayKey,
            shiftKey: hsShiftKey,
            addDay: hsAddDay,
            isActive: hsIsActive,
            streak: hsStreak,
            best: hsBest,
            level: hsLevel,
            calendar: hsCalendar,
            boxDist: hsBoxDist,
            wordLevelMap: hsWordLevelMap,
            hskHist: hsHskHist,
            totals: hsTotals,
            readScore: hsReadScore,
            readSrsSum: hsReadSrsSum,
            parseState: hsParseState,
            parseLog: hsParseLog,
            probeMode: hsProbeMode,
            storedMode: hsStoredMode,
            langFor: hsLangFor
        }
    };
})();
