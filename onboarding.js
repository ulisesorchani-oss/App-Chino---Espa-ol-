/* =====================================================================
   v9.50 · ONBOARDING (guía de bienvenida) — Huayu Diario
   =====================================================================
   QUÉ ES
   · Recorrido de 6 pasos (~1-2 minutos) que explica la app ACTUAL con su
     flujo "primero se aprende, después se practica":
     1) bienvenida: los tres tiempos (Aprender → Hoy → Repaso) y el modo
        de aprendizaje activo (chino ⇄ español),
     2) Aprender: Lecciones · Exámenes · Diaria · Clásicos (en ese orden,
        como la pestaña) y que al elegir un módulo la app lleva a Hoy,
     3) Hoy: el ciclo de una frase (escuchar, escribir la palabra que
        falta, pista al 1.er error, respuesta al 2.º) y los ajustes 👁 Ver,
     4) calificar + repaso: Otra vez → 10 min · Bien → mañana · Fácil →
        no vuelve, y las cajas de Leitner con los intervalos REALES del
        mazo (BOX_DAYS de app.js: 10 min, 1, 3, 7, 14 y 30 días),
        con enlace al repaso inteligente,
     5) Entrenar y Yo (y cómo reabrir esta guía),
     6) la racha 🔥 (con estado EN VIVO) + proverbio + botón final.
   · Reemplaza la guía v9.39 de 4 pasos, que ponía Hoy primero y no
     explicaba el orden de la nueva navegación.
   · BILINGÜE según el modo: 'es-cn' (aprendo chino) → guía en español;
     'cn-es' (aprendo español) → guía en chino simplificado, igual que el
     pack de UI de app.js (UI_STRINGS['cn-es'] usa 简体).
   · 繁體 (v9.26, intacto): el pack chino tiene variante TRADICIONAL
     ('cn-hant'): mismos pasos, cajas y callouts con los MISMOS ids. El
     toggle 简/繁 (arriba a la derecha del cuerpo, solo visible en modo
     chino) alterna al vuelo conservando el paso; la preferencia persiste
     en localStorage 'ac_guide_script_v1' ('hans' por defecto).

   CÓMO SE INTEGRA (cero invasión)
   · Archivo independiente: NO toca app.js, NO toca style.css. Solo
     index.html (1 <script> antes de app.js) y sw.js (precache).
   · Se auto-inyecta: botón 📖 Guía en el primer .header-actions del DOM
     (en la vista Yo → Progreso) + overlay #guide-pop con la piel
     .vocab-pop existente (temas claro/oscuro/papel gratis vía variables
     CSS) + sus propios estilos (<style>).
   · MODO: NO accede al state interno de app.js (IIFE). Detecta el modo
     con obProbeMode() (botón #btn-play-es + clase hidden-force) con
     fallback de SOLO LECTURA a la clave 'chino-espanol-app-v2' y
     MutationObserver para re-etiquetar en vivo. El idioma del contenido
     se decide SIEMPRE al abrir.
   · 1.ª VISITA: si localStorage 'ac_onboarding_done_v2' != '1', la guía
     se abre sola a los ~1.4 s (si no hay otro popup y la pestaña está
     visible). Cualquier cierre (✕, Escape, clic afuera, Saltar o final)
     marca "vista". v2: la guía cambió de contenido, así que quien ya
     había visto la v1 la vuelve a ver una vez.
   · ENLACES REALES (patrón openBackup de stats.js): el paso 4 tiene
     "Ver mi repaso de hoy" → cierra SIN marcar vista y hace click en
     #btn-srs (el botón público de la barra de Hoy); el paso 6 tiene
     "Ver mi racha" → cierra marcando vista y abre #stats-pop vía
     window.HuayuStats.open(). El callout 🔥 muestra la racha EN VIVO vía
     HuayuStats.getSummary() (pura obStreakLive). Todo defensivo: si algo
     falta, queda como estaba — la app sigue igual (filosofía del módulo).
   · "Saltar guía" en todos los pasos menos el último (además de la ✕) +
     targets táctiles de 44px + Escape y clic afuera cierran.
   · NO toca: Leitner/doGrade, cloze, SRS, lecciones, clásicos, evaluador
     de voz, pinyin-pro. Sin dependencias. Todo el init con try/catch.
   ===================================================================== */
(function () {
    'use strict';
    if (window.HuayuGuide) return; // idempotente

    // ---------------- helpers ----------------
    var LS_DONE = 'ac_onboarding_done_v2';      // 1 = guía (v9.50) ya vista
    var LS_SCRIPT = 'ac_guide_script_v1';       // v9.26: 'hant' = pack chino en 繁體
    var MODE_KEY = 'chino-espanol-app-v2';      // SOLO LECTURA (misma clave de app.js)
    var AUTO_DELAY = 1400;                      // ms hasta el auto-show de 1.ª visita

    function $(id) { return document.getElementById(id); }
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privado */ } }

    /* ===== OB-PURE-BEGIN (funciones puras — testeables en sandbox) ===== */

    // Modo actual leyendo el DOM de app.js: updateUILanguage() marca
    // hidden-force en #btn-play-es cuando se aprende CHINO (es-cn) y lo
    // deja visible cuando se aprende ESPAÑOL (cn-es).
    // Devuelve 'es-cn' | 'cn-es' | null (si el DOM aún no está montado).
    function obProbeMode(docLike) {
        if (!docLike || typeof docLike.getElementById !== 'function') return null;
        var es = docLike.getElementById('btn-play-es');
        if (!es || !es.classList || typeof es.classList.contains !== 'function') return null;
        return es.classList.contains('hidden-force') ? 'es-cn' : 'cn-es';
    }

    // Fallback: modo guardado por app.js en localStorage (JSON). SOLO LECTURA
    // y validado estrictamente; cualquier otra cosa → null.
    function obStoredMode(raw) {
        if (typeof raw !== 'string' || !raw) return null;
        try {
            var m = (JSON.parse(raw) || {}).mode;
            return (m === 'es-cn' || m === 'cn-es') ? m : null;
        } catch (e) { return null; }
    }

    // Idioma de la guía para un modo dado (defensivo: default es-cn).
    function obLangFor(mode) { return mode === 'cn-es' ? 'cn-es' : 'es-cn'; }

    // Cajas de Leitner con los intervalos REALES del mazo (app.js: AGAIN_MS =
    // 10 min y BOX_DAYS = {2:1, 3:3, 4:7, 5:14, 6:30}). days: 0 = misma sesión.
    // v9.26: zhH/zhHD = etiqueta y detalle en 繁體 (caja 4/5 usan 週, no 周).
    // Son la parte interactiva del paso 4.
    var OB_BOXES = [
        { b: 1, days: 0,  es: '10 minutos', zh: '10 分钟', zhH: '10 分鐘',
          esD: 'Recién fallada (o nueva): vuelve en <b>10 minutos</b>, dentro de esta misma sesión.',
          zhD: '刚答错（或新词）：<b>10 分钟</b>后回来，就在本次学习里。',
          zhHD: '剛答錯（或新詞）：<b>10 分鐘</b>後回來，就在本次學習裡。' },
        { b: 2, days: 1,  es: '1 día', zh: '1 天', zhH: '1 天',
          esD: 'Mañana vuelve a aparecer: ya empezó a quedarse. Vence en <b>1 día</b>.',
          zhD: '明天会再出现：它开始住进你的记忆了。<b>1 天</b>后到期。',
          zhHD: '明天會再出現：它開始住進你的記憶了。<b>1 天</b>後到期。' },
        { b: 3, days: 3,  es: '3 días', zh: '3 天', zhH: '3 天',
          esD: 'La próxima cita es en <b>3 días</b>: si la recordás, ya es memoria de mediano plazo.',
          zhD: '下次见面是 <b>3 天</b>后：如果还想得起来，它已经进入中期记忆。',
          zhHD: '下次見面是 <b>3 天</b>後：如果還想得起來，它已經進入中期記憶。' },
        { b: 4, days: 7,  es: '1 semana', zh: '1 周', zhH: '1 週',
          esD: 'Vuelve en <b>1 semana</b>. Una semana sin verla y sigue ahí: buen trabajo.',
          zhD: '<b>1 周</b>后才回来。一周不见它还在：干得漂亮。',
          zhHD: '<b>1 週</b>後才回來。一週不見它還在：幹得漂亮。' },
        { b: 5, days: 14, es: '2 semanas', zh: '2 周', zhH: '2 週',
          esD: 'Vuelve en <b>2 semanas</b>: ya casi no hace falta pensarla.',
          zhD: '<b>2 周</b>后回来：几乎不用刻意想它了。',
          zhHD: '<b>2 週</b>後回來：幾乎不用刻意想它了。' },
        { b: 6, days: 30, es: '1 mes 🎉', zh: '1 个月 🎉', zhH: '1 個月 🎉',
          esD: 'La cita final: <b>1 mes</b>. Si la recordás acá, la palabra es tuya. 🎉',
          zhD: '最后一站：<b>1 个月</b>。这时候还记得，这个词就是你的了。🎉',
          zhHD: '最後一站：<b>1 個月</b>。這時候還記得，這個詞就是你的了。🎉' }
    ];

    // v9.25: título/estado EN VIVO del callout de racha, a partir del
    // resumen de HuayuStats.getSummary(). Devuelve null si no hay datos
    // o la racha es 0 (el pack ya trae el texto por defecto "empieza hoy").
    // PURA: sin DOM, testeable en sandbox.
    // v9.26: 3.er parámetro hant → estados en 繁體 (el título 你的打卡：N 天
    // es idéntico en ambos guiones; solo cambian los estados). Con 2 args
    // el comportamiento queda exactamente como en v9.25.
    function obStreakLive(sum, zhMode, hant) {
        if (!sum || typeof sum !== 'object') return null;
        if (typeof sum.streak !== 'number' || !isFinite(sum.streak) || sum.streak <= 0) return null;
        var n = sum.streak;
        var out = {
            title: zhMode ? ('🔥 你的打卡：' + n + ' 天')
                          : ('🔥 Tu racha: ' + n + (n === 1 ? ' día' : ' días')),
            status: ''
        };
        if (sum.todayPracticed) {
            out.status = zhMode
                ? (hant ? ('今天已經打卡 ✓ 連續第 ' + n + ' 天。')
                        : ('今天已经打卡 ✓ 连续第 ' + n + ' 天。'))
                : ('Hoy ya practicaste ✓ — día ' + n + ' de la cadena.');
        } else {
            out.status = zhMode
                ? (hant ? ('⚠ 今天還沒打卡：練一下，別斷鏈。')
                        : ('⚠ 今天还没打卡：练一下，别断链。'))
                : ('⚠ Hoy falta practicar: una sesión y la cadena sigue.');
        }
        return out;
    }

    /* ===== OB-PURE-END ===== */

    // ---------------- estilos (auto-inyectados, respetan los 3 temas) ----------------
    var OB_CSS = [
        '#guide-pop{max-height:min(76vh,620px);}',
        '#guide-body{max-height:calc(min(76vh,620px) - 96px);overflow-y:auto;-webkit-overflow-scrolling:touch;}',
        '.ob-center{text-align:center;}',
        '.ob-hero{font-size:2.9rem;line-height:1;margin:4px 0 8px;}',
        '.ob-ico{font-size:1.7rem;line-height:1;margin-bottom:6px;}',
        '.ob-title{margin:0 0 10px;font-size:1.14rem;font-weight:800;color:var(--text-primary);}',
        '.ob-text{color:var(--text-secondary);font-size:.94rem;line-height:1.55;margin:0 0 10px;}',
        '.ob-text b{color:var(--text-primary);}',
        '.ob-item{display:flex;gap:10px;padding:9px 11px;border:1px solid var(--border);border-radius:11px;margin-bottom:8px;background:var(--bg-light);text-align:left;}',
        '.ob-item-ico{font-size:1.25rem;line-height:1.3;}',
        '.ob-item-title{font-weight:700;color:var(--text-primary);font-size:.92rem;margin-bottom:2px;}',
        '.ob-item-desc{color:var(--text-secondary);font-size:.85rem;line-height:1.45;}',
        '.ob-flow{display:flex;align-items:stretch;gap:6px;margin:10px 0 12px;}',
        '.ob-flow-step{flex:1;min-width:0;border:1px solid var(--border);background:var(--bg-light);border-radius:11px;padding:9px 6px;text-align:center;}',
        '.ob-flow-ico{display:block;font-size:1.35rem;line-height:1.2;}',
        '.ob-flow-l{display:block;font-weight:800;color:var(--text-primary);font-size:.86rem;margin-top:2px;}',
        '.ob-flow-d{display:block;color:var(--text-secondary);font-size:.74rem;line-height:1.35;margin-top:3px;}',
        '.ob-flow-arrow{align-self:center;color:var(--text-secondary);font-weight:800;}',
        '.ob-stat{text-align:center;font-size:2rem;font-weight:900;color:var(--primary);margin:6px 0 10px;letter-spacing:-.5px;}',
        '.ob-stat-sub{text-align:center;color:var(--text-secondary);font-size:.86rem;margin:-4px 0 10px;}',
        '.ob-quote{margin:12px 0;padding:14px 10px;border-radius:12px;background:var(--bg-light);border:1px dashed var(--border);text-align:center;}',
        '.ob-quote-zh{font-size:1.45rem;font-weight:800;color:var(--primary);letter-spacing:2px;}',
        '.ob-quote-src{color:var(--text-secondary);font-size:.84rem;margin-top:6px;font-style:italic;}',
        '.ob-streak{margin-top:12px;padding:13px 12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--bg-light);text-align:center;}',
        '.ob-streak-title{font-weight:800;color:var(--text-primary);font-size:1rem;margin-bottom:5px;}',
        '.ob-streak-status{font-weight:700;color:var(--primary);font-size:.9rem;margin:0 0 8px;}',
        '.ob-streak .ob-text{margin-bottom:0;}',
        '.ob-streak-btn{min-width:186px;margin-top:11px;}',
        '.ob-srs-btn{display:block;min-width:172px;margin:2px auto 10px;padding:8px 12px;font-size:.86rem;}',
        '.ob-grade-row{display:flex;gap:6px;margin:10px 0 2px;}',
        '.ob-grade{flex:1;min-width:0;border:2px solid var(--border);background:var(--bg-card);border-radius:10px;padding:8px 4px;text-align:center;}',
        '.og-l{display:block;font-weight:800;color:var(--text-primary);font-size:.85rem;}',
        '.og-i{display:block;font-weight:700;color:var(--primary);font-size:.78rem;margin-top:3px;}',
        '.ob-script-row{display:flex;justify-content:flex-end;margin:0 0 8px;}',
        '.ob-script-btn{border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);border-radius:999px;padding:3px 11px;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;line-height:1.5;transition:border-color .15s,color .15s;}',
        '.ob-script-btn:hover{border-color:var(--primary);color:var(--primary);}',
        '.ob-tip{font-size:.84rem;color:var(--text-secondary);background:var(--bg-light);border-radius:10px;padding:9px 11px;line-height:1.5;margin-top:10px;}',
        '.ob-boxes{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:10px 0 8px;}',
        '.ob-box{border:2px solid var(--border);background:var(--bg-card);color:var(--text-primary);border-radius:10px;padding:7px 9px;font-size:.8rem;font-weight:700;cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s;}',
        '.ob-box.sel{border-color:var(--primary);background:var(--primary);color:#fff;}',
        '.ob-detail{text-align:center;color:var(--text-secondary);font-size:.86rem;line-height:1.5;min-height:2.6em;margin-bottom:8px;}',
        '.ob-detail b{color:var(--primary);}',
        '.ob-nav{display:flex;align-items:center;gap:8px;margin-top:12px;}',
        '.ob-back.ghost{visibility:hidden;}',
        '.ob-dots{flex:1;display:flex;gap:5px;justify-content:center;}',
        '.ob-dot{width:7px;height:7px;border-radius:4px;background:var(--border);transition:all .2s;}',
        '.ob-dot.on{background:var(--primary);width:18px;}',
        '.ob-next{min-width:112px;min-height:44px;}',
        '.ob-back{min-height:44px;}',
        '.ob-skip{background:transparent;border:0;color:var(--text-secondary);text-decoration:underline;text-underline-offset:3px;cursor:pointer;font-family:inherit;font-size:.85rem;min-height:44px;padding:6px 10px;border-radius:8px;}',
        '.ob-skip:hover{color:var(--primary);}',
        '.ob-nav{flex-wrap:wrap;}',
        '#btn-guide-close{width:44px;height:44px;min-width:44px;min-height:44px;display:grid;place-items:center;}'
    ].join('\n');

    // ---------------- contenido: pack ESPAÑOL (modo es-cn · aprendo chino) ----------------
    var PACK_ES = {
        btnLabel: '📖 Guía',
        btnTitle: 'Guía rápida: aprender, practicar, el repaso y tu racha',
        aria: 'Guía interactiva de la app',
        ui: { back: '◀ Atrás', next: 'Siguiente ▶', done: '🚀 ¡Empezar!', dots: 'Paso', skip: 'Saltar guía' },
        steps: [
            { // 1 · bienvenida — los tres tiempos
                ico: '🌏', center: true,
                title: '¡Hola! Primero se aprende, después se practica',
                html:
                    '<div class="ob-hero">🌏</div>' +
                    '<p class="ob-text ob-center"><b>Material real, frases para practicar y un repaso que se agenda solo</b></p>' +
                    '<div class="ob-flow">' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">📚</span><span class="ob-flow-l">Aprender</span><span class="ob-flow-d">elegís qué estudiar</span></div>' +
                        '<span class="ob-flow-arrow">›</span>' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">🀄</span><span class="ob-flow-l">Hoy</span><span class="ob-flow-d">practicás frases</span></div>' +
                        '<span class="ob-flow-arrow">›</span>' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">🔁</span><span class="ob-flow-l">Repaso</span><span class="ob-flow-d">vuelve lo que cuesta</span></div>' +
                    '</div>' +
                    '<p class="ob-text">Con unos 10 minutos por día alcanza: la app recuerda <b>qué repasarte y cuándo</b>, para que lo estudiado no se escape.</p>' +
                    '<p class="ob-text">Ahora estás aprendiendo <b>chino</b>: respondés en 汉字, con el teclado o trazando a mano ✍️. ¿Preferís al revés (aprender español)? Lo cambiás en 🙂 <b>Yo</b>.</p>'
            },
            { // 2 · Aprender — las 4 pestañas
                ico: '📚',
                title: 'Aprender: elegí qué estudiar',
                html:
                    '<p class="ob-text">Es la primera pantalla de la app. Arriba tenés cuatro pestañas:</p>' +
                    '<div class="ob-item"><span class="ob-item-ico">📖</span><span><span class="ob-item-title">Lecciones</span><br><span class="ob-item-desc">Historias cortas con pinyin y audio, más 10 ejercicios de elegir la palabra que falta. Un buen punto de partida.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎓</span><span><span class="ob-item-title">Exámenes</span><br><span class="ob-item-desc">Vocabulario por nivel: HSK y TOCFL (y DELE para español). ¿No sabés tu nivel? Hacé el 🎯 <b>test de colocación</b>.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">📚</span><span><span class="ob-item-title">Diaria</span><br><span class="ob-item-desc">Frases de la vida real por tema: saludos, supermercado, colectivo, restaurante…</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">📜</span><span><span class="ob-item-title">Clásicos</span><br><span class="ob-item-desc">Textos antiguos como el Tao Te King, con el original leído por bloques.</span></span></div>' +
                    '<div class="ob-tip">💡 Al elegir un módulo, la app te lleva a <b>Hoy</b> para practicarlo. Con 🔀 <b>Intercalar</b> se mezcla el orden de las frases.</div>'
            },
            { // 3 · Hoy — el ciclo de una frase
                ico: '🀄',
                title: 'Hoy: practicá una frase',
                html:
                    '<p class="ob-text">1️⃣ Leé la frase y escuchala (🔊). 2️⃣ Escribí la palabra que falta — con el teclado o a mano ✍️ — y tocá <b>Verificar</b>. 3️⃣ Si fallás, la primera vez te damos una <b>pista</b>; la segunda, la respuesta.</p>' +
                    '<div class="ob-item"><span class="ob-item-ico">👁</span><span><span class="ob-item-title">Ver</span><br><span class="ob-item-desc">Cambiá 简/繁, mostrá el pinyin y los colores de tono, o agrandá la letra.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎤</span><span><span class="ob-item-title">Pronunciación</span><br><span class="ob-item-desc">Grabá tu voz y compará con la referencia. Se procesa en tu dispositivo.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">⭕</span><span><span class="ob-item-title">Sesión de hoy</span><br><span class="ob-item-desc">El anillo cuenta tus frases del día. La meta (5, 10 o 20) la elegís en 🙂 Yo.</span></span></div>' +
                    '<div class="ob-tip">💡 ¿No la sabés? Tocá <b>No la sé, mostrar respuesta</b>: no pasa nada, esa frase volverá pronto.</div>'
            },
            { // 4 · calificar + cajas + enlace al repaso
                ico: '🔄',
                title: 'Calificá y el repaso se agenda solo',
                html:
                    '<p class="ob-text">Después de responder, calificá honesto:</p>' +
                    '<div class="ob-grade-row">' +
                        '<div class="ob-grade"><span class="og-l">🔁 Otra vez</span><span class="og-i">10 min</span></div>' +
                        '<div class="ob-grade"><span class="og-l">👍 Bien</span><span class="og-i">mañana</span></div>' +
                        '<div class="ob-grade"><span class="og-l">⭐ Fácil</span><span class="og-i">no vuelve</span></div>' +
                    '</div>' +
                    '<p class="ob-text">Eso es todo el método: <b>lo que fallás vuelve antes</b>, lo que sabés se aleja. Con los aciertos el intervalo crece — tocá cada caja:</p>' +
                    '<div id="ob-boxes" class="ob-boxes"></div>' +
                    '<p class="ob-detail" id="ob-detail"></p>' +
                    '<button type="button" id="ob-srs-btn" class="btn-secondary ob-srs-btn">🔁 Ver mi repaso de hoy</button>' +
                    '<p class="ob-text">En <b>Hoy</b>, la barra 🔁 <b>Repaso inteligente</b> te dice cuántas tarjetas te tocan.</p>'
            },
            { // 5 · Entrenar y Yo
                ico: '🧭',
                title: 'Entrenar y Yo',
                html:
                    '<div class="ob-item"><span class="ob-item-ico">🎯</span><span><span class="ob-item-title">Entrenar</span><br><span class="ob-item-desc">Ejercicios sueltos: pares mínimos y solo oído 🎧 para el oído, pronunciación 🎤, escribir a mano ✍️, lector 🗣️ y planillas 写字 para imprimir.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🙂</span><span><span class="ob-item-title">Yo</span><br><span class="ob-item-desc">Tu progreso y tus <b>palabras aprendidas</b> (tocá una para ver su traducción), y los ajustes: chino ⇄ español, tema claro u oscuro, voz y velocidad, meta diaria y respaldo 💾.</span></span></div>' +
                    '<div class="ob-tip">💡 Esta guía la reabrís cuando quieras: 🙂 Yo → <b>📖 Guía</b>.</div>'
            },
            { // 6 · racha (en vivo) + proverbio + final
                ico: '🔥', center: true,
                title: 'Un paso por día',
                html:
                    '<div class="ob-quote"><div class="ob-quote-zh">千里之行，始于足下</div><div class="ob-quote-src">«Un camino de mil kilómetros empieza con un primer paso» · Lao zi</div></div>' +
                    '<p class="ob-text ob-center">No hace falta saberlo todo: hace falta <b>no romper la cadena</b>. La racha 🔥 crece cada día que practicás.</p>' +
                    '<div class="ob-streak">' +
                        '<div class="ob-streak-title" id="ob-streak-title">🔥 Tu racha empieza hoy</div>' +
                        '<p class="ob-text">Días seguidos, calendario y palabras dominadas: miralo al terminar cada sesión.</p>' +
                        '<button type="button" id="ob-streak-btn" class="btn-primary ob-streak-btn">🔥 Ver mi racha</button>' +
                    '</div>'
            }
        ]
    };

    // ---------------- contenido: pack CHINO 简体 (modo cn-es · aprendo español) ----------------
    var PACK_ZH = {
        btnLabel: '📖 指南',
        btnTitle: '快速指南：学习、练习、复习循环和打卡',
        aria: '应用互动指南',
        ui: { back: '◀ 上一步', next: '下一步 ▶', done: '🚀 开始吧！', dots: '第', skip: '跳过导览' },
        steps: [
            { // 1 · bienvenida — los tres tiempos
                ico: '🌏', center: true,
                title: '你好！先学习，再练习',
                html:
                    '<div class="ob-hero">🌏</div>' +
                    '<p class="ob-text ob-center"><b>真实材料 + 句子练习 + 自动安排的复习</b></p>' +
                    '<div class="ob-flow">' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">📚</span><span class="ob-flow-l">学习</span><span class="ob-flow-d">挑要学的内容</span></div>' +
                        '<span class="ob-flow-arrow">›</span>' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">🀄</span><span class="ob-flow-l">今天</span><span class="ob-flow-d">练习句子</span></div>' +
                        '<span class="ob-flow-arrow">›</span>' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">🔁</span><span class="ob-flow-l">复习</span><span class="ob-flow-d">难记的会回来</span></div>' +
                    '</div>' +
                    '<p class="ob-text">每天练 10 分钟左右就够了：该复习什么、什么时候复习，App 替你记着，学过的不会溜走。</p>' +
                    '<p class="ob-text">你现在在学<b>西班牙语</b>：用西语句子和 🎓 DELE 材料练习。想换成学中文？在 🙂 <b>我的</b> 里切换。</p>'
            },
            { // 2 · Aprender
                ico: '📚',
                title: '学习：挑要学的内容',
                html:
                    '<p class="ob-text">这是 App 的第一个页面，上方有四个标签：</p>' +
                    '<div class="ob-item"><span class="ob-item-ico">📖</span><span><span class="ob-item-title">课文</span><br><span class="ob-item-desc">带拼音和录音的短故事，配 10 道选词填空练习。很适合作为起点。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎓</span><span><span class="ob-item-title">考试</span><br><span class="ob-item-desc">按等级的词汇：HSK、TOCFL（学西语则有 DELE）。不知道自己的水平？做 🎯 <b>分级测试</b>。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">📚</span><span><span class="ob-item-title">每日</span><br><span class="ob-item-desc">真实生活主题的句子：问候、超市、公交、餐厅……</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">📜</span><span><span class="ob-item-title">古文</span><br><span class="ob-item-desc">《道德经》等古代经典，按段落阅读原文。</span></span></div>' +
                    '<div class="ob-tip">💡 选好内容后，App 会带你去<b>今天</b>练习。🔀 <b>交错练习</b>会打乱句子的顺序。</div>'
            },
            { // 3 · Hoy
                ico: '🀄',
                title: '今天：练一句',
                html:
                    '<p class="ob-text">1️⃣ 看句子、听录音 🔊。2️⃣ 填上缺的词——键盘或手写 ✍️——点 <b>检查</b>。3️⃣ 第一次答错会给<b>提示</b>，第二次才显示答案。</p>' +
                    '<div class="ob-item"><span class="ob-item-ico">👁</span><span><span class="ob-item-title">查看</span><br><span class="ob-item-desc">切换简/繁、显示拼音和声调颜色，或放大字体。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎤</span><span><span class="ob-item-title">发音</span><br><span class="ob-item-desc">录下你的声音，和标准音对比。录音只在你的设备上处理。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">⭕</span><span><span class="ob-item-title">今日练习</span><br><span class="ob-item-desc">圆环记录今天练了几句。每日目标（5、10 或 20 句）在 🙂 我的 里设置。</span></span></div>' +
                    '<div class="ob-tip">💡 不会？点<b>不会，显示答案</b>：没关系，这一句很快会再出现。</div>'
            },
            { // 4 · calificar + cajas + enlace al repaso
                ico: '🔄',
                title: '评分，复习自动安排',
                html:
                    '<p class="ob-text">答完后，诚实地给自己评分：</p>' +
                    '<div class="ob-grade-row">' +
                        '<div class="ob-grade"><span class="og-l">🔁 再来</span><span class="og-i">10 min</span></div>' +
                        '<div class="ob-grade"><span class="og-l">👍 记得</span><span class="og-i">明天</span></div>' +
                        '<div class="ob-grade"><span class="og-l">⭐ 简单</span><span class="og-i">不再出现</span></div>' +
                    '</div>' +
                    '<p class="ob-text">方法就这么简单：<b>错的先回来</b>，会的越走越远。答对之后间隔会变长——点每个盒子看看：</p>' +
                    '<div id="ob-boxes" class="ob-boxes"></div>' +
                    '<p class="ob-detail" id="ob-detail"></p>' +
                    '<button type="button" id="ob-srs-btn" class="btn-secondary ob-srs-btn">🔁 看看我的复习</button>' +
                    '<p class="ob-text">在<b>今天</b>里，🔁 <b>智能复习</b>栏会告诉你今天有几张卡到期。</p>'
            },
            { // 5 · Entrenar y Yo
                ico: '🧭',
                title: '训练和我的',
                html:
                    '<div class="ob-item"><span class="ob-item-ico">🎯</span><span><span class="ob-item-title">训练</span><br><span class="ob-item-desc">单项练习：最小对立词和纯听力 🎧、发音 🎤、手写 ✍️、朗读 🗣️，以及可打印的写字练习纸。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🙂</span><span><span class="ob-item-title">我的</span><br><span class="ob-item-desc">你的进度和<b>已学词语</b>（点一个词看翻译），以及设置：中文 ⇄ 西语、明暗主题、语音和语速、每日目标和备份 💾。</span></span></div>' +
                    '<div class="ob-tip">💡 这份指南随时可以再看：🙂 我的 → <b>📖 指南</b>。</div>'
            },
            { // 6 · racha + final
                ico: '🔥', center: true,
                title: '每天一小步',
                html:
                    '<div class="ob-quote"><div class="ob-quote-zh">千里之行，始于足下</div><div class="ob-quote-src">——老子《道德经》· 每天一小步</div></div>' +
                    '<p class="ob-text ob-center">不用什么都会：<b>不断链</b>就行。🔥 会随着你每天练习一点点长大。</p>' +
                    '<div class="ob-streak">' +
                        '<div class="ob-streak-title" id="ob-streak-title">🔥 你的打卡，今天开始</div>' +
                        '<p class="ob-text">连续天数、学习日历、掌握词汇：每次练完看一眼。</p>' +
                        '<button type="button" id="ob-streak-btn" class="btn-primary ob-streak-btn">🔥 看看我的打卡</button>' +
                    '</div>'
            }
        ]
    };

    // ---------------- contenido: pack CHINO 繁體 (v9.26 · variante tradicional) ----------------
    // Espejo 1:1 de PACK_ZH: mismos 6 pasos, mismos ids y misma estructura;
    // solo cambia el guion (简体 → 繁體). El toggle 简/繁 alterna entre ambos
    // conservando el paso actual. Conversión a mano (uso TW): 學習, 課文, 帶,
    // 錄音, 選詞填空, 練習, 導覽, 複習, 這, 點, 聲調, 錄, 詞彙, 設置, 備份.
    var PACK_ZH_HANT = {
        btnLabel: '📖 指南',
        btnTitle: '快速指南：學習、練習、複習循環和打卡',
        aria: '應用互動指南',
        ui: { back: '◀ 上一步', next: '下一步 ▶', done: '🚀 開始吧！', dots: '第', skip: '跳過導覽' },
        steps: [
            { // 1 · bienvenida — los tres tiempos
                ico: '🌏', center: true,
                title: '你好！先學習，再練習',
                html:
                    '<div class="ob-hero">🌏</div>' +
                    '<p class="ob-text ob-center"><b>真實材料 + 句子練習 + 自動安排的複習</b></p>' +
                    '<div class="ob-flow">' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">📚</span><span class="ob-flow-l">學習</span><span class="ob-flow-d">挑要學的內容</span></div>' +
                        '<span class="ob-flow-arrow">›</span>' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">🀄</span><span class="ob-flow-l">今天</span><span class="ob-flow-d">練習句子</span></div>' +
                        '<span class="ob-flow-arrow">›</span>' +
                        '<div class="ob-flow-step"><span class="ob-flow-ico">🔁</span><span class="ob-flow-l">複習</span><span class="ob-flow-d">難記的會回來</span></div>' +
                    '</div>' +
                    '<p class="ob-text">每天練 10 分鐘左右就夠了：該複習什麼、什麼時候複習，App 替你記著，學過的不會溜走。</p>' +
                    '<p class="ob-text">你現在在學<b>西班牙語</b>：用西語句子和 🎓 DELE 材料練習。想換成學中文？在 🙂 <b>我的</b> 裡切換。</p>'
            },
            { // 2 · Aprender
                ico: '📚',
                title: '學習：挑要學的內容',
                html:
                    '<p class="ob-text">這是 App 的第一個頁面，上方有四個標籤：</p>' +
                    '<div class="ob-item"><span class="ob-item-ico">📖</span><span><span class="ob-item-title">課文</span><br><span class="ob-item-desc">帶拼音和錄音的短故事，配 10 道選詞填空練習。很適合作為起點。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎓</span><span><span class="ob-item-title">考試</span><br><span class="ob-item-desc">按等級的詞彙：HSK、TOCFL（學西語則有 DELE）。不知道自己的水平？做 🎯 <b>分級測驗</b>。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">📚</span><span><span class="ob-item-title">每日</span><br><span class="ob-item-desc">真實生活主題的句子：問候、超市、公車、餐廳……</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">📜</span><span><span class="ob-item-title">古文</span><br><span class="ob-item-desc">《道德經》等古代經典，按段落閱讀原文。</span></span></div>' +
                    '<div class="ob-tip">💡 選好內容後，App 會帶你去<b>今天</b>練習。🔀 <b>交錯練習</b>會打亂句子的順序。</div>'
            },
            { // 3 · Hoy
                ico: '🀄',
                title: '今天：練一句',
                html:
                    '<p class="ob-text">1️⃣ 看句子、聽錄音 🔊。2️⃣ 填上缺的詞——鍵盤或手寫 ✍️——點 <b>檢查</b>。3️⃣ 第一次答錯會給<b>提示</b>，第二次才顯示答案。</p>' +
                    '<div class="ob-item"><span class="ob-item-ico">👁</span><span><span class="ob-item-title">檢視</span><br><span class="ob-item-desc">切換簡/繁、顯示拼音和聲調顏色，或放大字體。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎤</span><span><span class="ob-item-title">發音</span><br><span class="ob-item-desc">錄下你的聲音，和標準音對比。錄音只在你的裝置上處理。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">⭕</span><span><span class="ob-item-title">今日練習</span><br><span class="ob-item-desc">圓環記錄今天練了幾句。每日目標（5、10 或 20 句）在 🙂 我的 裡設定。</span></span></div>' +
                    '<div class="ob-tip">💡 不會？點<b>不會，顯示答案</b>：沒關係，這一句很快會再出現。</div>'
            },
            { // 4 · calificar + cajas + enlace al repaso
                ico: '🔄',
                title: '評分，複習自動安排',
                html:
                    '<p class="ob-text">答完後，誠實地給自己評分：</p>' +
                    '<div class="ob-grade-row">' +
                        '<div class="ob-grade"><span class="og-l">🔁 再來</span><span class="og-i">10 min</span></div>' +
                        '<div class="ob-grade"><span class="og-l">👍 記得</span><span class="og-i">明天</span></div>' +
                        '<div class="ob-grade"><span class="og-l">⭐ 簡單</span><span class="og-i">不再出現</span></div>' +
                    '</div>' +
                    '<p class="ob-text">方法就這麼簡單：<b>錯的先回來</b>，會的越走越遠。答對之後間隔會變長——點每個盒子看看：</p>' +
                    '<div id="ob-boxes" class="ob-boxes"></div>' +
                    '<p class="ob-detail" id="ob-detail"></p>' +
                    '<button type="button" id="ob-srs-btn" class="btn-secondary ob-srs-btn">🔁 看看我的複習</button>' +
                    '<p class="ob-text">在<b>今天</b>裡，🔁 <b>智慧複習</b>欄會告訴你今天有幾張卡到期。</p>'
            },
            { // 5 · Entrenar y Yo
                ico: '🧭',
                title: '訓練和我的',
                html:
                    '<div class="ob-item"><span class="ob-item-ico">🎯</span><span><span class="ob-item-title">訓練</span><br><span class="ob-item-desc">單項練習：最小對立詞和純聽力 🎧、發音 🎤、手寫 ✍️、朗讀 🗣️，以及可列印的寫字練習紙。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🙂</span><span><span class="ob-item-title">我的</span><br><span class="ob-item-desc">你的進度和<b>已學詞語</b>（點一個詞看翻譯），以及設定：中文 ⇄ 西語、明暗主題、語音和語速、每日目標和備份 💾。</span></span></div>' +
                    '<div class="ob-tip">💡 這份指南隨時可以再看：🙂 我的 → <b>📖 指南</b>。</div>'
            },
            { // 6 · racha + final
                ico: '🔥', center: true,
                title: '每天一小步',
                html:
                    '<div class="ob-quote"><div class="ob-quote-zh">千里之行，始於足下</div><div class="ob-quote-src">——老子《道德經》· 每天一小步</div></div>' +
                    '<p class="ob-text ob-center">不用什麼都會：<b>不斷鏈</b>就行。🔥 會隨著你每天練習一點點長大。</p>' +
                    '<div class="ob-streak">' +
                        '<div class="ob-streak-title" id="ob-streak-title">🔥 你的打卡，今天開始</div>' +
                        '<p class="ob-text">連續天數、學習日曆、掌握詞彙：每次練完看一眼。</p>' +
                        '<button type="button" id="ob-streak-btn" class="btn-primary ob-streak-btn">🔥 看看我的打卡</button>' +
                    '</div>'
            }
        ]
    };

    var PACKS = { 'es-cn': PACK_ES, 'cn-es': PACK_ZH, 'cn-hant': PACK_ZH_HANT };

    // ---------------- estado ----------------
    var lang = 'es-cn';   // idioma de contenido en uso ('es-cn'|'cn-es'|'cn-hant')
    var cur = 0;          // paso actual (0..5)
    var boxSel = 0;       // caja seleccionada en las cajas del paso 4

    // ---------------- modo (DOM primero, localStorage de app.js como fallback) ----------------
    function currentMode() {
        var m = obProbeMode(document);
        if (m) return m;
        m = obStoredMode(lsGet(MODE_KEY));
        return m || 'es-cn';
    }
    // v9.26: guion del pack chino ('hans' | 'hant'), persistente y defensivo:
    // cualquier valor inesperado → 'hans' (comportamiento idéntico al anterior).
    function getScriptPref() { return lsGet(LS_SCRIPT) === 'hant' ? 'hant' : 'hans'; }
    // Idioma de contenido para un modo, aplicando la preferencia 简/繁:
    // 'es-cn' → 'es-cn' (sin toggle); 'cn-es' → 'cn-hant' si el usuario
    // eligió 繁體. Es la ÚNICA puerta de entrada al pack tradicional.
    function langForMode(mode) {
        var l = obLangFor(mode);
        return (l === 'cn-es' && getScriptPref() === 'hant') ? 'cn-hant' : l;
    }
    function applyLabel() {
        var btn = $('btn-guide');
        if (!btn) return;
        var P = PACKS[langForMode(currentMode())]; // v9.26: refleja 简/繁
        btn.textContent = P.btnLabel;
        btn.title = P.btnTitle;
    }
    // app.js re-monta la visibilidad de los botones de audio en cada
    // setMode() → observer sobre la clase de #btn-play-es.
    function watchMode() {
        try {
            var es = $('btn-play-es');
            if (es && typeof MutationObserver !== 'undefined') {
                new MutationObserver(applyLabel).observe(es, { attributes: true, attributeFilter: ['class'] });
            }
            // sync inicial diferido: el DOMContentLoaded de app.js corre después
            setTimeout(applyLabel, 400);
            setTimeout(applyLabel, 1500);
        } catch (e) { /* cosmético */ }
    }

    // ---------------- inyección de UI ----------------
    function injectStyles() {
        if ($('ob-styles')) return;
        var st = document.createElement('style');
        st.id = 'ob-styles';
        st.textContent = OB_CSS;
        document.head.appendChild(st);
    }
    function injectButton() {
        if ($('btn-guide')) return;
        var host = document.querySelector('.header-actions');
        if (!host) return;
        var btn = document.createElement('button');
        btn.id = 'btn-guide';
        btn.type = 'button';
        btn.className = 'lang-switch-btn';           // misma piel del pill del header
        btn.addEventListener('click', function () { open(); });
        host.insertBefore(btn, host.firstChild);
        applyLabel();
    }
    function buildOverlay() {
        if ($('guide-pop')) return;
        var pop = document.createElement('div');
        pop.id = 'guide-pop';
        pop.className = 'vocab-pop hidden';
        pop.setAttribute('role', 'dialog');
        pop.setAttribute('aria-modal', 'true');
        var P = PACKS[langForMode(currentMode())]; // v9.26: aria con 简/繁
        pop.setAttribute('aria-label', P.aria);
        var x = document.createElement('button');
        x.id = 'btn-guide-close';
        x.className = 'vocab-pop-close';
        x.type = 'button';
        x.setAttribute('aria-label', 'Cerrar');
        x.textContent = '✕';
        x.addEventListener('click', function () { close(true); });
        var body = document.createElement('div');
        body.id = 'guide-body';
        pop.appendChild(x);
        pop.appendChild(body);
        document.body.appendChild(pop);
    }

    // ---------------- render ----------------
    function renderStep() {
        var P = PACKS[lang];
        var st = P.steps[cur];
        var body = $('guide-body');
        if (!body) return;
        body.innerHTML =
            '<h3 class="ob-title' + (st.center ? ' ob-center' : '') + '">' +
              (st.center ? '' : '<span class="ob-ico">' + st.ico + '</span> ') + st.title + '</h3>' +
            st.html;
        if (st.center) {
            var hero = body.querySelector('.ob-hero');
            if (!hero) { // steps centrados sin hero explícito
                body.insertAdjacentHTML('afterbegin', '<div class="ob-hero">' + st.ico + '</div>');
            }
        }
        // v9.26: toggle 简/繁 arriba a la derecha — SOLO en el pack chino
        // (es-cn no lo tiene: la guía en español no cambia). Alternar
        // conserva el paso actual (cur no se toca).
        if (lang !== 'es-cn') {
            var srow = document.createElement('div');
            srow.className = 'ob-script-row';
            var sb = document.createElement('button');
            sb.id = 'ob-script-btn';
            sb.type = 'button';
            sb.className = 'ob-script-btn';
            sb.textContent = (lang === 'cn-hant') ? '简体' : '繁體';
            sb.setAttribute('aria-label', (lang === 'cn-hant')
                ? 'Cambiar a chino simplificado'
                : 'Cambiar a chino tradicional (繁體)');
            sb.addEventListener('click', function (ev) {
                // corta la burbuja: el click queda DENTRO de #guide-pop, pero
                // por simetría con bindSrs ningún handler externo reacciona.
                if (ev && typeof ev.stopPropagation === 'function') ev.stopPropagation();
                toggleScript();
            });
            srow.appendChild(sb);
            body.insertBefore(srow, body.firstChild);
        }
        // widgets
        if ($('ob-boxes')) renderBoxes();
        if ($('ob-srs-btn')) bindSrs();              // paso "calificar" → repaso SRS real
        if ($('ob-streak-title')) renderStreakLive(); // v9.25: callout con racha en vivo
        if ($('ob-streak-btn')) bindStreak();   // v9.24: paso final → racha
        // nav
        var nav = document.createElement('div');
        nav.className = 'ob-nav';
        var back = document.createElement('button');
        back.className = 'btn-secondary ob-back' + (cur === 0 ? ' ghost' : '');
        back.type = 'button';
        back.textContent = P.ui.back;
        back.addEventListener('click', function () { if (cur > 0) { cur--; renderStep(); } });
        var dots = document.createElement('div');
        dots.className = 'ob-dots';
        dots.setAttribute('aria-label', P.ui.dots + ' ' + (cur + 1) + ' / ' + P.steps.length);
        for (var i = 0; i < P.steps.length; i++) {
            var d = document.createElement('span');
            d.className = 'ob-dot' + (i === cur ? ' on' : '');
            dots.appendChild(d);
        }
        var next = document.createElement('button');
        next.className = 'btn-primary ob-next';
        next.type = 'button';
        next.textContent = (cur === P.steps.length - 1) ? P.ui.done : P.ui.next;
        next.addEventListener('click', function () {
            if (cur < P.steps.length - 1) { cur++; renderStep(); }
            else close(true);
        });
        nav.appendChild(back);
        nav.appendChild(dots);
        nav.appendChild(next);
        body.appendChild(nav);
        // "Saltar guía" en todos los pasos menos el último (además de la ✕)
        if (cur < P.steps.length - 1) {
            var skipRow = document.createElement('div');
            skipRow.style.textAlign = 'center';
            var skip = document.createElement('button');
            skip.type = 'button';
            skip.className = 'ob-skip';
            skip.textContent = P.ui.skip || 'Saltar guía';
            skip.addEventListener('click', function () { close(true); });
            skipRow.appendChild(skip);
            body.appendChild(skipRow);
        }
        body.scrollTop = 0;
    }
    function renderBoxes() {
        var host = $('ob-boxes');
        if (!host) return;
        host.innerHTML = '';
        OB_BOXES.forEach(function (bx, i) {
            var P = PACKS[lang];
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'ob-box' + (i === boxSel ? ' sel' : '');
            b.setAttribute('data-i', String(i));
            // v9.26: etiqueta según guion (zhH = 繁體, con fallback defensivo)
            b.textContent = (lang === 'es-cn' ? 'Caja' : '盒') + ' ' + bx.b + ' · ' +
                (lang === 'es-cn' ? bx.es : (lang === 'cn-hant' ? (bx.zhH || bx.zh) : bx.zh));
            b.addEventListener('click', function () {
                boxSel = i;
                host.querySelectorAll('.ob-box').forEach(function (x) { x.classList.remove('sel'); });
                b.classList.add('sel');
                showBoxDetail();
            });
            host.appendChild(b);
        });
        showBoxDetail();
    }
    function showBoxDetail() {
        var d = $('ob-detail');
        var bx = OB_BOXES[boxSel];
        // v9.26: detalle según guion (zhHD = 繁體, con fallback defensivo)
        if (d && bx) d.innerHTML = (lang === 'es-cn' ? bx.esD : (lang === 'cn-hant' ? (bx.zhHD || bx.zhD) : bx.zhD));
    }

    // ---------------- enlace con el popup de racha (v9.24) ----------------
    // El paso final cierra el círculo: "no romper la cadena" → la app la
    // mide por vos. Un solo lugar para la acción (patrón openBackup
    // de stats.js): cierra la guía marcándola como vista (es el último
    // paso; reabrible con 📖) y abre el popup #stats-pop de stats.js.
    // Defensivo: sin stats.js (no cargó / bloqueado) NO hace nada y la
    // guía queda abierta — la app sigue igual, filosofía del módulo.
    function streakGo() {
        try {
            if (window.HuayuStats && typeof window.HuayuStats.open === 'function') {
                close(true);
                window.HuayuStats.open();
                return true;
            }
        } catch (e) { console.warn('[guía] no se pudo abrir la racha:', e); }
        return false;
    }
    function bindStreak() {
        var b = $('ob-streak-btn');
        if (b) b.addEventListener('click', function (ev) {
            // v9.39: corta la burbuja — el click ORIGINAL sobre ob-streak-btn
            // burbujea a document y el cerrador de clic-afuera de stats.js
            // (v9.28, lista blanca #btn-stats/#header-streak) vería el popup
            // recién abierto con un target fuera de la lista → lo cerraría al
            // instante (mismo género de bug que el chip 🔥 en v9.37).
            if (ev && typeof ev.stopPropagation === 'function') ev.stopPropagation();
            streakGo();
        });
    }

    // ---------------- enlace con el repaso inteligente (v9.25) ----------------
    // El paso "calificar" muestra el botón "Ver mi repaso de hoy": cierra
    // la guía SIN marcarla como vista (paso intermedio — el tour sigue
    // pendiente y volverá a auto-mostrarse hasta completarse) y abre el
    // popup REAL del SRS haciendo click en #btn-srs, el mismo botón de la
    // barra de Hoy (patrón openBackup() de stats.js con #btn-backup). Cero
    // conocimiento del DOM interno del SRS: solo su botón público.
    // Defensivo: sin el botón NO pasa nada y la guía queda abierta.
    function srsGo() {
        try {
            var b = $('btn-srs');
            if (b) { close(false); b.click(); return true; }
        } catch (e) { console.warn('[guía] no se pudo abrir el repaso:', e); }
        return false;
    }
    function bindSrs() {
        var b = $('ob-srs-btn');
        if (b) b.addEventListener('click', function (ev) {
            // El click ORIGINAL sobre ob-srs-btn burbujea a document y el
            // handler "clic fuera cierra" de app.js (v7.20) vería el popup
            // ya abierto con un target fuera de #srs-pop → lo cerraría al
            // instante. Cortamos la burbuja acá: el click SINTÉTICO en
            // #btn-srs (mismo tick) ya está exento por su propio guard
            // (e.target.closest('#btn-srs') → return).
            if (ev && typeof ev.stopPropagation === 'function') ev.stopPropagation();
            srsGo();
        });
    }

    // ---------------- racha en vivo en el callout (v9.25) ----------------
    // El callout del paso final muestra la racha REAL al momento de
    // renderizar el paso, vía HuayuStats.getSummary() (solo lectura).
    // Sin stats.js, con racha 0 o con cualquier error → queda el texto
    // por defecto del pack (degradación grácil, filosofía del módulo).
    function renderStreakLive() {
        var t = $('ob-streak-title');
        if (!t) return;
        var S = null;
        try {
            if (window.HuayuStats && typeof window.HuayuStats.getSummary === 'function') {
                S = window.HuayuStats.getSummary();
            }
        } catch (e) { S = null; }
        // v9.26: zhMode = todo pack chino; hant = variante tradicional
        var live = obStreakLive(S, lang !== 'es-cn', lang === 'cn-hant');
        if (!live) return;
        t.textContent = live.title;
        var old = $('ob-streak-status');
        if (live.status) {
            if (!old) {
                old = document.createElement('p');
                old.id = 'ob-streak-status';
                t.insertAdjacentElement('afterend', old);
            }
            old.className = 'ob-streak-status';
            old.textContent = live.status;
        } else if (old) {
            old.parentNode.removeChild(old);
        }
    }

    // ---------------- open / close ----------------
    function open() {
        try {
            injectStyles(); buildOverlay();
            var pop = $('guide-pop');
            if (!pop) return;
            lang = langForMode(currentMode()); // idioma SIEMPRE al abrir (+ pref 简/繁 v9.26)
            cur = 0;
            boxSel = 0;
            pop.setAttribute('aria-label', PACKS[lang].aria);
            pop.classList.remove('hidden');
            renderStep();
        } catch (e) { console.warn('[guía] no se pudo abrir:', e); }
    }
    function close(markDone) {
        var pop = $('guide-pop');
        if (pop) pop.classList.add('hidden');
        if (markDone) lsSet(LS_DONE, '1');
    }

    // v9.28: Escape y clic afuera cierran la guía — convención del resto de
    // los overlays (vocab-pop, placement, SRS, quiz, clásicos, stats).
    // Ambos gestos equivalen al ✕ → close(true): salir a medias TAMBIÉN
    // marca la guía como vista, igual que hoy lo hace el botón ✕ (si no,
    // el auto-open del primer visitaría la re-abriría en cada recarga y
    // sería pesado). #btn-guide es el launcher: el MISMO clic que abre
    // burbujea hasta document y no debe re-cerrarla. Los enlaces internos
    // (_srsGo → #btn-srs, _streakGo → stats) ya cierran con close(false)
    // ANTES de disparar su click sintético: cuando ese click llegue a
    // document, el pop ya está hidden → este handler no toca nada.
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var pop = $('guide-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        close(true);
    });
    document.addEventListener('click', function (e) {
        var pop = $('guide-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        // v9.29: composedPath y NO contains() (mismo fix v7.20 de placement/
        // SRS): atrás/siguiente re-renderizan el paso y el botón queda
        // descolgado del DOM al burbujear; contains() daría falso negativo y
        // la guía se cerraba (¡marcándose como vista!) justo después de
        // navegar.
        var path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && e.target.closest('#btn-guide')) return;
        close(true);
    });

    // ---------------- toggle 简/繁 del pack chino (v9.26) ----------------
    // Alterna entre PACK_ZH (简体) y PACK_ZH_HANT (繁體) conservando el paso
    // actual, guarda la preferencia y re-etiqueta el botón 📖 del header.
    // En modo es-cn no existe el toggle (la guía en español no cambia).
    // Defensivo: si el render falla, la preferencia ya quedó guardada y el
    // próximo open() muestra el guion elegido; la app sigue igual.
    function toggleScript() {
        try {
            lang = (lang === 'cn-hant') ? 'cn-es' : 'cn-hant';
            lsSet(LS_SCRIPT, lang === 'cn-hant' ? 'hant' : 'hans');
            var pop = $('guide-pop');
            if (pop && PACKS[lang]) pop.setAttribute('aria-label', PACKS[lang].aria);
            applyLabel();
            renderStep();
        } catch (e) { console.warn('[guía] no se pudo alternar 简/繁:', e); }
    }

    // ---------------- init ----------------
    function autoShow() {
        if (lsGet(LS_DONE) === '1') return;
        // cortesía: no abrir si hay otro popup/baner activo o la pestaña está oculta
        if (document.hidden) return;
        if (document.querySelector('.vocab-pop:not(.hidden), .lq-pop:not(.hidden), .wp-banner:not(.hidden), #install-help:not(.hidden)')) return;
        open();
    }
    function init() {
        try {
            injectStyles();
            injectButton();
            buildOverlay();
            watchMode();
            var seen = lsGet(LS_DONE);
            if (seen !== '1') setTimeout(autoShow, AUTO_DELAY);
        } catch (e) {
            console.warn('[guía] init falló (la app sigue igual):', e);
        }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    // API pública mínima (botón manual, QA y tests)
    window.HuayuGuide = {
        open: open,
        close: close,
        _streakGo: streakGo,       // v9.24: enlace guía → popup de racha (QA/tests)
        _srsGo: srsGo,             // v9.25: enlace guía → repaso SRS real (QA/tests)
        _toggleScript: toggleScript, // v9.26: alterna 简⇄繁 (QA/tests)
        _scriptPref: getScriptPref,  // v9.26: 'hans' | 'hant' (QA/tests)
        _langForMode: langForMode,   // v9.26: modo + preferencia → pack (tests)
        _pure: {
            probeMode: obProbeMode,
            storedMode: obStoredMode,
            langFor: obLangFor,
            boxes: OB_BOXES,
            packs: PACKS,
            streakLive: obStreakLive   // v9.25: racha en vivo (pura)
        }
    };
})();
