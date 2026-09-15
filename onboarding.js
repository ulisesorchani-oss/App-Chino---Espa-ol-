/* =====================================================================
   v9.22 · GUÍA INTERACTIVA DE BIENVENIDA (onboarding) — Huayu Diario
   =====================================================================
   QUÉ ES
   · Recorrido de 6 pasos (~2 minutos): cómo usar la app, qué es el SRS
     (curva del olvido + mini-quiz interactivo), las cajas de Leitner con
     los intervalos REALES del mazo (BOX_DAYS: 10 min, 1, 3, 7, 14 y 30
     días — mismos valores de app.js), cuánto practicar por día (10-15
     min) y motivación final (千里之行，始于足下).
   · BILINGÜE según el modo: 'es-cn' (aprendo chino) → guía en español;
     'cn-es' (aprendo español) → guía en chino simplificado, igual que el
     pack de UI de app.js (UI_STRINGS['cn-es'] usa 简体).
   · INTERACTIVA: mini-quiz con feedback (¿cuándo conviene repasar?) y
     cajas de Leitner tocables (tap en cada caja → cuándo vuelve la
     palabra).

   CÓMO SE INTEGRA (cero invasión)
   · Archivo NUEVO e independiente: NO toca app.js, NO toca style.css.
     Solo index.html (1 <script> antes de app.js) y sw.js (bump v69 +
     precache).
   · Se auto-inyecta: botón 📖 Guía en .header-actions + overlay
     #guide-pop con la piel .vocab-pop existente (temas claro/oscuro/
     papel gratis vía variables CSS) + sus propios estilos (<style>).
   · MODO: NO accede al state interno de app.js (IIFE). Detecta el modo
     con obProbeMode() (botón #btn-play-es + clase hidden-force que
     aplica updateUILanguage) con fallback de SOLO LECTURA a la clave
     'chino-espanol-app-v2' de localStorage (misma que app.js) y
     MutationObserver para re-etiquetar el botón en vivo al cambiar de
     modo. El idioma del contenido se decide SIEMPRE al abrir.
   · 1.ª VISITA: si localStorage 'ac_onboarding_done_v1' != '1', la guía
     se abre sola a los ~1.4 s (si no hay otro popup abierto y la pestaña
     está visible). Cualquier cierre (✕ o final) marca "vista".
   · v9.24 · ENLACE CON LA RACHA: el paso de motivación cierra el círculo
     ("no romper la cadena" → la app la mide por vos) con un callout 🔥 y
     el botón "Ver mi racha" que cierra la guía (último paso → marca
     vista, patrón openBackup de stats.js) y abre el popup #stats-pop vía
     window.HuayuStats.open(). Defensivo: si stats.js no cargó, no pasa
     nada (filosofía del módulo: si algo falla, la app sigue igual).
   · NO toca: Leitner/doGrade, cloze, SRS, lecciones, clásicos, evaluador
     de voz, pinyin-pro. Sin dependencias. Si algo falla, la app sigue
     funcionando igual (todo el init con try/catch).
   ===================================================================== */
(function () {
    'use strict';
    if (window.HuayuGuide) return; // idempotente

    // ---------------- helpers ----------------
    var LS_DONE = 'ac_onboarding_done_v1';      // 1 = guía ya vista
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
    var OB_BOXES = [
        { b: 1, days: 0,  es: '10 minutos', zh: '10 分钟',
          esD: 'Recién fallada (o nueva): vuelve en <b>10 minutos</b>, dentro de esta misma sesión.',
          zhD: '刚答错（或新词）：<b>10 分钟</b>后回来，就在本次学习里。' },
        { b: 2, days: 1,  es: '1 día', zh: '1 天',
          esD: 'Mañana vuelve a aparecer: ya empezó a quedarse. Vence en <b>1 día</b>.',
          zhD: '明天会再出现：它开始住进你的记忆了。<b>1 天</b>后到期。' },
        { b: 3, days: 3,  es: '3 días', zh: '3 天',
          esD: 'La próxima cita es en <b>3 días</b>: si la recordás, ya es memoria de mediano plazo.',
          zhD: '下次见面是 <b>3 天</b>后：如果还想得起来，它已经进入中期记忆。' },
        { b: 4, days: 7,  es: '1 semana', zh: '1 周',
          esD: 'Vuelve en <b>1 semana</b>. Una semana sin verla y sigue ahí: buen trabajo.',
          zhD: '<b>1 周</b>后才回来。一周不见它还在：干得漂亮。' },
        { b: 5, days: 14, es: '2 semanas', zh: '2 周',
          esD: 'Vuelve en <b>2 semanas</b>: ya casi no hace falta pensarla.',
          zhD: '<b>2 周</b>后回来：几乎不用刻意想它了。' },
        { b: 6, days: 30, es: '1 mes 🎉', zh: '1 个月 🎉',
          esD: 'La cita final: <b>1 mes</b>. Si la recordás acá, la palabra es tuya. 🎉',
          zhD: '最后一站：<b>1 个月</b>。这时候还记得，这个词就是你的了。🎉' }
    ];

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
        '.ob-stat{text-align:center;font-size:2rem;font-weight:900;color:var(--primary);margin:6px 0 10px;letter-spacing:-.5px;}',
        '.ob-stat-sub{text-align:center;color:var(--text-secondary);font-size:.86rem;margin:-4px 0 10px;}',
        '.ob-quote{margin:12px 0;padding:14px 10px;border-radius:12px;background:var(--bg-light);border:1px dashed var(--border);text-align:center;}',
        '.ob-quote-zh{font-size:1.45rem;font-weight:800;color:var(--primary);letter-spacing:2px;}',
        '.ob-quote-src{color:var(--text-secondary);font-size:.84rem;margin-top:6px;font-style:italic;}',
        '.ob-streak{margin-top:12px;padding:13px 12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--bg-light);text-align:center;}',
        '.ob-streak-title{font-weight:800;color:var(--text-primary);font-size:1rem;margin-bottom:5px;}',
        '.ob-streak .ob-text{margin-bottom:0;}',
        '.ob-streak-btn{min-width:186px;margin-top:11px;}',
        '.ob-tip{font-size:.84rem;color:var(--text-secondary);background:var(--bg-light);border-radius:10px;padding:9px 11px;line-height:1.5;margin-top:10px;}',
        '.ob-quiz-q{font-weight:700;color:var(--text-primary);margin:12px 0 8px;font-size:.95rem;}',
        '.ob-opt{display:block;width:100%;text-align:left;padding:11px 12px;margin-bottom:8px;border-radius:11px;border:2px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-size:.92rem;line-height:1.4;cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s;}',
        '.ob-opt.ob-ok{border-color:#16a34a;background:rgba(22,163,74,.08);}',
        '.ob-opt.ob-bad{border-color:#dc2626;background:rgba(220,38,38,.07);}',
        '.ob-fb{border-radius:10px;padding:9px 11px;font-size:.85rem;line-height:1.5;margin:2px 0 8px;}',
        '.ob-fb-ok{background:rgba(22,163,74,.1);color:#15803d;}',
        '.ob-fb-bad{background:rgba(220,38,38,.08);color:#b91c1c;}',
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
        '.ob-next{min-width:112px;}',
        'body.dark-mode .ob-fb-ok{color:#4ade80;}',
        'body.dark-mode .ob-fb-bad{color:#f87171;}'
    ].join('\n');

    // ---------------- contenido: pack ESPAÑOL (modo es-cn · aprendo chino) ----------------
    var PACK_ES = {
        btnLabel: '📖 Guía',
        btnTitle: 'Guía rápida: cómo usar la app, qué es el SRS y cuánto practicar',
        aria: 'Guía interactiva de la app',
        ui: { back: '◀ Atrás', next: 'Siguiente ▶', done: '🚀 ¡Empezar hoy!', dots: 'Paso' },
        steps: [
            {
                ico: '🌏', center: true,
                title: '¡Bienvenido a Huayu Diario!',
                html:
                    '<div class="ob-hero">🌏</div>' +
                    '<p class="ob-text ob-center"><b>日常華語 · tu diario de mandarín</b></p>' +
                    '<p class="ob-text">Esta app te enseña chino con frases reales de todos los días: escuchás, escribís, hablás. Y lo más importante: tiene un sistema que <b>recuerda por vos qué repasar cada día</b>, para que lo que estudiás no se escape.</p>' +
                    '<p class="ob-text">Esta visita guiada toma <b>2 minutos</b>. Al final vas a saber exactamente cómo usarla. 💪</p>' +
                    '<div class="ob-tip">💡 Esta guía se cierra y podés volver a verla cuando quieras: está el botón <b>📖 Guía</b> arriba a la derecha.</div>'
            },
            {
                ico: '🧭',
                title: 'Tu día en la app (10 minutos)',
                html:
                    '<div class="ob-item"><span class="ob-item-ico">📚</span><span><span class="ob-item-title">Práctica diaria</span><br><span class="ob-item-desc">Una frase con una palabra faltante. Escribila y tocá Verificar: con eso ya estudiaste algo real.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🔊</span><span><span class="ob-item-title">Escuchá y repetí</span><br><span class="ob-item-desc">🔊 CN suena la frase; con ⚙️ cambiás velocidad y voz. Tocá 🎤 y grabate para comparar tu pronunciación.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🔁</span><span><span class="ob-item-title">Repaso inteligente</span><br><span class="ob-item-desc">El botón de arriba te avisa cuántas tarjetas vencen hoy. Ese repaso es lo más valioso de la app.</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎧</span><span><span class="ob-item-title">Cuando quieras más</span><br><span class="ob-item-desc">🎧 Solo oído (escuchás antes de leer), 🎯 Pares mínimos (afiná el oído con los tonos), 📖 Lecciones y 📜 Clásicos para leer de verdad.</span></span></div>' +
                    '<p class="ob-text">¿Recién empezás? Con la <b>frase del día + el repaso inteligente</b> ya está. De a poco descubrís el resto.</p>'
            },
            {
                ico: '🧠',
                title: '¿Qué es el SRS?',
                html:
                    '<p class="ob-text">SRS = <b>Repetición Espaciada</b>. Tu cerebro borra las cosas siguiendo una curva (la famosa <b>curva del olvido</b>). El truco del SRS es repasar cada palabra <b>justo antes</b> de que se caiga por esa curva.</p>' +
                    '<p class="ob-quiz-q">🤔 ¿Cuándo conviene repasar una palabra?</p>' +
                    '<div id="ob-quiz"></div>'
            },
            {
                ico: '📫',
                title: 'Las cajas de Leitner',
                html:
                    '<p class="ob-text">Tu mazo funciona como un archivador con <b>6 cajas</b>. Tocá cada caja para ver cuándo vuelve esa palabra:</p>' +
                    '<div id="ob-boxes" class="ob-boxes"></div>' +
                    '<p class="ob-detail" id="ob-detail"></p>' +
                    '<p class="ob-text">✅ La recordás → avanza de caja y se repasa <b>menos seguido</b>. ❌ La fallás → vuelve a la caja 1. No es castigo: <b>es el método funcionando</b>. Y «✅ La sé» la hace saltar dos cajas: premia lo que ya dominás.</p>'
            },
            {
                ico: '⏱️',
                title: '¿Cuánto tiempo al día?',
                html:
                    '<div class="ob-stat">10–15 min</div>' +
                    '<p class="ob-text ob-center">En serio: no necesitás más. <b>Una frase nueva + el repaso del día</b> = misión cumplida.</p>' +
                    '<p class="ob-text">La constancia le gana a la intensidad: mejor 10 minutos todos los días que 2 horas un domingo. Tu cerebro consolida la memoria <b>entre sesiones</b> (sobre todo mientras dormís).</p>' +
                    '<div class="ob-tip">📅 <b>10 min × 90 días ≈ 15 horas de chino real.</b> Y a los 3 meses la mayoría de tu mazo ya vive en las cajas lejanas: cada vez cuesta menos mantenerlo.</div>'
            },
            {
                ico: '💪', center: true,
                title: 'El primer paso',
                html:
                    '<div class="ob-quote"><div class="ob-quote-zh">千里之行，始于足下</div><div class="ob-quote-src">«Un camino de mil kilómetros empieza con un primer paso» · Lao zi, 道德经</div></div>' +
                    '<p class="ob-text">Vas a equivocarte <b>muchísimo</b>. Está diseñado así: cada error le enseña al sistema qué repasarte. Las tarjetas que vuelven a la caja 1 no son fracasos — <b>son tu plan de estudio de mañana</b>. 📅</p>' +
                    '<p class="ob-text">No compares tu día 1 con el día 100 de nadie. Con 10 minutos diarios, en 3 meses vas a releer tus primeras lecciones… <b>y las vas a entender</b>. El objetivo no es saberlo todo: es <b>no romper la cadena</b>.</p>' +
                    '<div class="ob-streak">' +
                        '<div class="ob-streak-title">🔥 Tu racha empieza hoy</div>' +
                        '<p class="ob-text">Esa «cadena» que no hay que romper, la app la mide por vos: días seguidos, calendario de constancia, palabras dominadas y minutos practicados. Mirala al terminar cada sesión — <b>verla crecer es el mejor combustible</b>.</p>' +
                        '<button type="button" id="ob-streak-btn" class="btn-primary ob-streak-btn">🔥 Ver mi racha</button>' +
                    '</div>'
            }
        ]
    };

    // ---------------- contenido: pack CHINO 简体 (modo cn-es · aprendo español) ----------------
    var PACK_ZH = {
        btnLabel: '📖 指南',
        btnTitle: '快速指南：怎么用这个 App、什么是 SRS、每天学多久',
        aria: '应用互动指南',
        ui: { back: '◀ 上一步', next: '下一步 ▶', done: '🚀 今天就开始！', dots: '第' },
        steps: [
            {
                ico: '🌏', center: true,
                title: '欢迎来到 Huayu Diario!',
                html:
                    '<div class="ob-hero">🌏</div>' +
                    '<p class="ob-text ob-center"><b>你的每日西班牙语日记</b></p>' +
                    '<p class="ob-text">这款 App 用真实的日常句子教你西班牙语：听、写、说。最重要的是，它有一套系统，<b>替你安排每天该复习什么</b>，让你学过的东西不再溜走。</p>' +
                    '<p class="ob-text">这份小导览只要 <b>2 分钟</b>，看完你就知道怎么用了 💪</p>' +
                    '<div class="ob-tip">💡 导览随时可以再看：点右上角的 <b>📖 指南</b> 就行。</div>'
            },
            {
                ico: '🧭',
                title: '每天怎么用（10 分钟）',
                html:
                    '<div class="ob-item"><span class="ob-item-ico">📚</span><span><span class="ob-item-title">每日练习</span><br><span class="ob-item-desc">一句缺了一个词的西语句子。填上它，点检查——这样就算完成今天的学习了。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🔊</span><span><span class="ob-item-title">听录音、跟读</span><br><span class="ob-item-desc">🔊 ES 播放句子；在 ⚙️ 里可以调速、换音色。点 🎤 录下自己的发音，和原音对比。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🔁</span><span><span class="ob-item-title">聪明复习</span><br><span class="ob-item-desc">顶部的按钮会告诉你今天有几张卡片到期。这个复习是整个 App 最有价值的部分。</span></span></div>' +
                    '<div class="ob-item"><span class="ob-item-ico">🎓</span><span><span class="ob-item-title">想要更多？</span><br><span class="ob-item-desc">上方的标签页：🎓 DELE 考试、📖 课文、📜 经典阅读，随时可以探索。</span></span></div>' +
                    '<p class="ob-text">刚开始？<b>每日一句 + 聪明复习</b>就够了，其他慢慢来。</p>'
            },
            {
                ico: '🧠',
                title: '什么是间隔重复（SRS）?',
                html:
                    '<p class="ob-text">SRS = <b>间隔重复</b>（Spaced Repetition System）。人的遗忘是有规律的——著名的<b>遗忘曲线</b>。SRS 的诀窍就是：在每个词<b>快要被忘掉的那一刻</b>安排复习。</p>' +
                    '<p class="ob-quiz-q">🤔 什么时候复习一个词最有效？</p>' +
                    '<div id="ob-quiz"></div>'
            },
            {
                ico: '📫',
                title: '莱特纳盒子',
                html:
                    '<p class="ob-text">你的词卡像一组抽屉，一共 <b>6 盒</b>。点每个盒子，看看这个词什么时候回来：</p>' +
                    '<div id="ob-boxes" class="ob-boxes"></div>' +
                    '<p class="ob-detail" id="ob-detail"></p>' +
                    '<p class="ob-text">✅ 答对了 → 往前跳一盒，复习间隔<b>越来越长</b>。❌ 答错了 → 回到盒 1。这不是惩罚，<b>而是方法本身</b>。点「我会」还能一次跳两盒，奖励你已掌握的词。</p>'
            },
            {
                ico: '⏱️',
                title: '每天学多久？',
                html:
                    '<div class="ob-stat">10–15 分钟</div>' +
                    '<p class="ob-text ob-center">真的不用更多：<b>一句新句子 + 今天的复习</b> = 完成。</p>' +
                    '<p class="ob-text">坚持 &gt; 强度：每天 10 分钟，胜过周日突击 2 小时。大脑是在学习<b>之间</b>巩固记忆的（尤其是睡觉的时候）。</p>' +
                    '<div class="ob-tip">📅 <b>10 分钟 × 90 天 ≈ 15 小时的有效学习。</b>三个月后，你的大部分卡片已经进入远期盒子：维持起来越来越轻松。</div>'
            },
            {
                ico: '💪', center: true,
                title: '第一步，就是今天',
                html:
                    '<div class="ob-quote"><div class="ob-quote-zh">千里之行，始于足下</div><div class="ob-quote-src">——老子《道德经》· 第一步，就是今天</div></div>' +
                    '<p class="ob-text">你一定会大量出错。这正是设计的一部分：每一次错误都在告诉系统该复习什么。回到盒 1 的卡片不是失败——<b>那就是你明天的学习计划</b>。📅</p>' +
                    '<p class="ob-text">别拿自己的第 1 天去比别人的第 100 天。每天 10 分钟，3 个月后你会重读最初的课文……<b>并且看得懂</b>。目标不是学会一切，而是<b>不断链</b>。</p>' +
                    '<div class="ob-streak">' +
                        '<div class="ob-streak-title">🔥 你的打卡，今天开始</div>' +
                        '<p class="ob-text">那条「不能断的链」，App 会替你记着：连续天数、学习日历、掌握词汇和练习时长。每次学完看一眼——<b>看着它一天天长大，就是最好的动力</b>。</p>' +
                        '<button type="button" id="ob-streak-btn" class="btn-primary ob-streak-btn">🔥 看看我的打卡</button>' +
                    '</div>'
            }
        ]
    };

    var PACKS = { 'es-cn': PACK_ES, 'cn-es': PACK_ZH };
    // El quiz también es contenido (lo consumen los tests): 1 correcta + feedback.
    var OB_QUIZ = {
        'es-cn': {
            q: '¿Cuándo conviene repasar una palabra?',
            opts: [
                { t: 'Muchas veces seguidas, el mismo día', ok: false,
                  fb: '❌ Se siente productivo, pero es memoria de corto plazo: mañana ya no está.' },
                { t: 'Justo cuando estás por olvidarla', ok: true,
                  fb: '✅ Ese «esfuerzo de recordar» es exactamente lo que fija la palabra en la memoria de largo plazo. Es el corazón del SRS.' }
            ]
        },
        'cn-es': {
            q: '什么时候复习一个词最有效？',
            opts: [
                { t: '同一天连续背很多遍', ok: false,
                  fb: '❌ 感觉很高效，但只是短期记忆：明天就忘了。' },
                { t: '快要忘记的那一刻', ok: true,
                  fb: '✅ 这种「用力想起来」的过程，正是把词写进长期记忆的关键。这就是 SRS 的核心。' }
            ]
        }
    };

    // ---------------- estado ----------------
    var lang = 'es-cn';   // idioma de contenido en uso
    var cur = 0;          // paso actual (0..5)
    var quizOk = {};      // clave lang+':'+idx → true (quiz acertado, queda verde)
    var boxSel = 0;       // caja seleccionada en el paso Leitner

    // ---------------- modo (DOM primero, localStorage de app.js como fallback) ----------------
    function currentMode() {
        var m = obProbeMode(document);
        if (m) return m;
        m = obStoredMode(lsGet(MODE_KEY));
        return m || 'es-cn';
    }
    function applyLabel() {
        var btn = $('btn-guide');
        if (!btn) return;
        var P = PACKS[obLangFor(currentMode())];
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
        var P = PACKS[obLangFor(currentMode())];
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
        // widgets
        if ($('ob-quiz')) renderQuiz();
        if ($('ob-boxes')) renderBoxes();
        if ($('ob-streak-btn')) bindStreak();   // v9.24: paso motivación → racha
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
        body.scrollTop = 0;
    }
    function renderQuiz() {
        var host = $('ob-quiz');
        var Q = OB_QUIZ[lang];
        var key = lang + ':' + cur;
        var doneOk = !!quizOk[key];
        var h = '';
        Q.opts.forEach(function (o, i) {
            var cls = 'ob-opt';
            if (doneOk && o.ok) cls += ' ob-ok';
            h += '<button type="button" class="' + cls + '" data-i="' + i + '">' + o.t + '</button>';
        });
        h += '<div id="ob-fb"></div>';
        host.innerHTML = h;
        host.querySelectorAll('.ob-opt').forEach(function (b) {
            b.addEventListener('click', function () {
                var o = Q.opts[parseInt(b.getAttribute('data-i'), 10)];
                var fb = $('ob-fb');
                if (o.ok) {
                    quizOk[key] = true;
                    b.classList.add('ob-ok');
                    host.querySelectorAll('.ob-opt').forEach(function (x) {
                        if (x !== b) x.disabled = true;
                    });
                    if (fb) { fb.className = 'ob-fb ob-fb-ok'; fb.innerHTML = o.fb; }
                } else {
                    b.classList.add('ob-bad');
                    if (fb) { fb.className = 'ob-fb ob-fb-bad'; fb.innerHTML = o.fb; }
                    setTimeout(function () { b.classList.remove('ob-bad'); }, 900);
                }
            });
        });
        if (doneOk) { // estado ya resuelto al volver: mostrar feedback verde
            var fb = $('ob-fb');
            var okOpt = Q.opts.filter(function (o) { return o.ok; })[0];
            if (fb && okOpt) { fb.className = 'ob-fb ob-fb-ok'; fb.innerHTML = okOpt.fb; }
        }
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
            b.textContent = (lang === 'cn-es' ? '盒' : 'Caja') + ' ' + bx.b + ' · ' + (lang === 'cn-es' ? bx.zh : bx.es);
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
        if (d && bx) d.innerHTML = (lang === 'cn-es' ? bx.zhD : bx.esD);
    }

    // ---------------- enlace con el popup de racha (v9.24) ----------------
    // El paso de motivación cierra el círculo: "no romper la cadena" → la
    // app la mide por vos. Un solo lugar para la acción (patrón openBackup
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
        if (b) b.addEventListener('click', streakGo);
    }

    // ---------------- open / close ----------------
    function open() {
        try {
            injectStyles(); buildOverlay();
            var pop = $('guide-pop');
            if (!pop) return;
            lang = obLangFor(currentMode());  // idioma SIEMPRE al abrir
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
        _streakGo: streakGo,   // v9.24: enlace guía → popup de racha (QA/tests)
        _pure: {
            probeMode: obProbeMode,
            storedMode: obStoredMode,
            langFor: obLangFor,
            boxes: OB_BOXES,
            quiz: OB_QUIZ,
            packs: PACKS
        }
    };
})();
