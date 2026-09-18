/* ============================================================
   sw.js — Service Worker PWA para Chino ⇄ Español
   ------------------------------------------------------------
   - Precachea el shell completo (HTML/JS/CSS/pinyin-pro/íconos)
     y TODOS los datos de oraciones y exámenes.
   - Estrategia cache-first con refresco en 2.º plano para GET
     del mismo origen + fallback offline para navegaciones.
   - Bonus: caché de audios TTS (POST /api/tts) → lo que ya
     escuchaste se puede reescuchar SIN conexión.
   - v7.7: caché PERSISTENTE de modelos de IA (Whisper ONNX de
     huggingface.co + runtime WASM de jsdelivr) → el motor de
     pronunciación NO se re-descarga (40 MB) en cada update.
   - v7.8: +config.js/text-utils.js en precache; pitch-analyzer.js
     se inyecta LAZY solo en modo Chino (sigue precacheado p/ offline).
   - v7.9: sin cambios de precache — lector interlineal vive en app.js
     (rubí por palabra + toque → #vocab-pop). VERSION sube solo para
     invalidar el shell cacheado (app.js + style.css).
   - v7.10: ídem v7.9 — sin cambios de precache (diccionario al toque
     vive en app.js: wordHitDict + lemas + desglose por carácter).
   - v7.11: ídem — sin cambios de precache (leyenda de tonos + esquemas
     de color viven en index.html/style.css/app.js: popup #tone-legend-pop,
     variables --tone-N con fallback y paleta Okabe-Ito para daltonismo).
   - v7.12: +dict-mini.js en precache — Capa 4: diccionario offline
     zh↔es (~1.630 entradas + 802 alias, CC-BY-SA 4.0). Archivo NUEVO
     en el shell: sin precache no existiría offline.
   - v7.13: +hanzi-writer.min.js en precache — orden de trazos (MIT).
     La librería se INYECTA lazy (cero costo inicial) pero vive en el
     shell → funciona offline desde la 1.ª instalación. Los datos de
     cada carácter (hanzi-writer-data, jsdelivr) van a una caché
     PERSISTENTE nueva (chino-es-hanzi-v1) → offline desde la 2.ª vez
     y no se borran en cada update (mismo criterio que los modelos IA).
   - v7.14: +lessons.js en precache — textos completos de las lecciones
     para el botón "📖 Leer lección" (Clásicos). Archivo PLANO de datos
     (patrón dict-mini.js): agregar lecciones nuevas NO regenera app.js,
     solo edita lessons.js. El botón carga el texto en el Lector (pinyin
     interlineal + diccionario + TTS); en CN→ES el botón se oculta.
   - v7.15: sin cambios de precache — secciones/capítulos y Biblioteca
     de Lecturas viven en lessons.js + app.js (mismo archivo plano).
     lessons.js v2: entradas con ids (secciones), group/label (Biblioteca)
     y status 'planned' (plantadas "próximamente"). VERSION sube para
     invalidar el shell (app.js + lessons.js + index.html + style.css).
   - v7.16: sin cambios de precache — el banner de práctica de trazos
     (#writer-practice-banner, se abre con ✍ Practicar del popup) usa el
     motor v7.13 ya precacheado (hanzi-writer.min.js) y la caché
     PERSISTENTE de datos por carácter. VERSION sube para invalidar el
     shell (app.js + style.css + index.html).
   ------------------------------------------------------------
   ⚠️ Al cambiar app.js / index.html / style.css / datos:
      subí VERSION (ej. 'v27') para que todos reciban el update.
   ============================================================ */
// v9.5: karaoke por PALABRA completa (Intl.Segmenter), f2 = femenina adulta Xiaobei (api/tts.py nuevo), TOCFL Band B completa (N3 進階 1091 + N4 高階 2194)
// v9.6c: +2 mini-dramas HSK por nivel (lessons-extra.js en precache)
// v9.9: UX Español-First — i18n de la interfaz (UI_STRINGS), modo desde el
//       header (#btn-toggle-lang-mode), DELE solo en cn-es, HSK/TOCFL solo
//       en es-cn, pinyin/tonos ocultos al aprender español
// v9.10: tarjeta limpia — panel de herramientas colapsado tras el engranaje
//       ⚙ (#btn-tools-toggle, cerrado por defecto), 🔊/🎤 más grandes en la
//       cabecera, 🔊 ES solo en modo es-cn, 📲 Instalar al pie de la página
// v9.11: audio según dirección de estudio (es-cn → solo 🔊 CN; cn-es → solo
//       🔊 ES), en lecciones/clásicos el audio solo con el botón 🔊 (no el
//       panel de la línea) y play/pausa con ícono ⏸ en el 2.º toque
// v9.8: identidad visual — header con sello (icons/logo-sello.png), manifest.json
//       real e iconos nuevos: logo-192/512 (lockup), maskable-icon, favicon
// v9.18: voice-evaluator.js afinado — el evaluador de español (cn-es) con la
//       confianza de Whisper como SEÑAL y no como VETO (un match textual exacto
//       ya no cae a 'doubt' por el umbral duro 0.85; solo con conf MUY baja
//       < SOFT 0.5), comparador que plega tildes/números en ambos lados
//       (qué/que, sí/si, 20/veinte ya no generan falsos «Revisá: …») y
//       bitácora de calibración ve_es_conf_log. El modo chino NO cambia
//       (0.65 tono + 0.35 contenido intacto).
// v9.19: modo "solo oído" (es-cn) — el audio suena primero, el texto queda
//       tapado y el alumno elige la palabra entre opciones ANTES de ver los
//       caracteres (comprensión auditiva real; reutiliza fetchTTS/checkAnswer).
// v9.20: pares mínimos — ejercicio aislado de discriminación tonal por audio
//       ("¿cuál escuchaste?", HSK 1-2: 买/卖, 十/是…), 10 rondas, opciones
//       SOLO AUDIO hasta responder; IIFE propia + overlay #mp-pop (piel lq),
//       reutiliza fetchTTS con cache de blobs; no toca el flujo de oraciones.
// v9.21: retrieval antes de revelar en el mazo SRS — la tarjeta clásica pide
//       el pinyin (sin tonos) o el significado antes de habilitar "Ver
//       respuesta"; error no revela (reintento + escape "No lo sé"); contador
//       informativo en el resumen; cajas de Leitner intactas.
// v9.22: onboarding.js NUEVO (guía interactiva bilingüe: cómo usar la app, SRS,
//       cajas de Leitner, 10-15 min/día, motivación 千里之行). Auto-contenido:
//       no toca app.js/style.css; se auto-inyecta (botón 📖 + overlay #guide-pop
//       con piel vocab-pop). Auto-show en 1.ª visita (ac_onboarding_done_v1).
// v9.23: stats.js NUEVO (rachas y estadísticas: 🔥 racha, 📅 calendario 13
//       semanas tipo GitHub, 🎯 aciertos + dominadas, 📊 barras HSK 1-9,
//       🔢 Leitner por caja, ⏱️ minutos estimados, 📍 aviso + respaldo).
//       Auto-contenido: envuelve localStorage.setItem ANTES de app.js para
//       capturar actividad (score/ac_srs); persiste en ac_stats_v1 (viaja
//       con el respaldo). No toca app.js/style.css.
// v9.24: la guía (onboarding.js) enlaza su paso de motivación con el popup
//       de racha — callout 🔥 "Tu racha empieza hoy" + botón "Ver mi racha"
//       (看看我的打卡 en cn-es) que cierra la guía marcándola vista y abre
//       #stats-pop vía window.HuayuStats.open(). Solo toca onboarding.js.
// v9.25: guía completa — (1) paso nuevo «El mapa completo» (pantallazo de
//       toda la app: 🗣️ lector de texto, ✍️ planillas de escritura 写字 A4
//       con trazos, 📖 lecciones/clásicos, 🎤 voz, 🎧 oído, 📊 progreso);
//       (2) el paso «Tu día» abre el repaso SRS REAL (click en #btn-srs,
//       cierra la guía SIN marcarla vista); (3) el callout 🔥 muestra la
//       racha EN VIVO (stats.js expone HuayuStats.getSummary(), solo
//       lectura). Toca onboarding.js + stats.js; app.js/style.css intactos.
// v9.26: la guía ahora también en 繁體 — el pack chino del onboarding suma
//       la variante TRADICIONAL 'cn-hant' (espejo 1:1: mismos 7 pasos, ids,
//       quiz y cajas) con toggle 简/繁 visible solo en modo chino, que
//       conserva el paso actual y persiste la preferencia en
//       ac_guide_script_v1. Además FIX CRÍTICO en stats.js: el guard del
//       wrapper de captura usaba localStorage.__hsWrap (item PERSISTENTE —
//       asignar props a localStorage crea claves reales), así que tras el
//       primer reload la actividad dejaba de contarse y la racha quedaba
//       congelada; el guard ahora vive en window (por realm). Toca
//       onboarding.js + stats.js; app.js/style.css intactos.
// v9.27: 5 fixes de calidad en app.js (secciones v9.15-v9.21): (1) Revelar
//       en "solo oído" dejaba la tarjeta a medio restaurar (answer-input y
//       btn-check seguían ocultos → camino muerto visual; ahora marca
//       respondido y pasa a "Siguiente ▶" sin contar como acierto); (2) el
//       cloze de producción filtraba la respuesta si la oración propia
//       repetía la palabra (String.replace solo tocaba la 1.ª ocurrencia →
//       split/join global); (3) el alta al repaso con el mazo lleno o clave
//       inválida fallaba en silencio y PERDÍA la oración escrita (ahora el
//       formulario queda abierto con aviso inline; 'dup' trata como éxito);
//       (4) el gate de retrieval aceptaba cualquier token de la glosa ("algo"
//       ⊂ "comprar algo", "en" ⊂ "tener en común") — ahora exige el NÚCLEO
//       (1.er término no-stopword) vía srsRecallNeedTok + RECALL_STOP;
//       (5) curación de pares mínimos: fuera los falsos mínimos 中国/水果,
//       洗/西瓜, 衣服/椅子, 昨天/左边, 游泳/右边 (se distinguían sin
//       escuchar el tono) → reemplazos de sílaba idéntica 洗/西, 衣/椅,
//       左/坐, 有/又, 书/树. Toca SOLO app.js; onboarding/stats/style intactos.
// v9.28: ronda QA 2 (cruce de archivos) — (1) pares mínimos: las opciones
//       van ahora dentro de <div class="mp-opts"> (la regla CSS con gap
//       existía desde v9.20 pero las tarjetas se inyectaban sueltas y
//       quedaban pegadas); (2) #btn-mp-pairs se oculta en modo cn-es
//       (discriminación tonal del chino: para el alumno de español no
//       pinta nada); (3) #mp-pop, #stats-pop y #guide-pop ya cierran con
//       Escape y clic afuera, como todos los demás overlays (la guía
//       marca vista, igual que el ✕); (4) stats.js: importar un respaldo
//       ya NO pisa el historial de rachas ni cuenta sus deltas como
//       aciertos de hoy (flush con el setItem original, capture respeta
//       escrituras externas a ac_stats_v1, flag window.__hsImporting de
//       doBackupImport); (5) minutos de actividad a disco cada ~60 s en
//       vez de cada 15 s; (6) style.css: la tarjeta en modo "solo oído"
//       por fin destaca (regla .listen-mode pendiente desde v9.19).
//       Toca app.js, stats.js, onboarding.js, style.css, index.html.
// v9.29: fix de regresión v9.28 — el handler de "clic afuera" de los 3
//       overlays nuevos usaba pop.contains(e.target), pero responder pares
//       mínimos (mpAnswer), avanzar (mpNext) o navegar la guía
//       re-renderizan el cuerpo del popup: el botón clicado queda
//       descolgado del DOM antes de que el evento llegue a document →
//       contains() daba falso negativo y el overlay se cerraba justo
//       después del clic (síntoma: "al acertar me saca de la práctica";
//       la guía además se marcaba como vista al pasar de paso). Fix:
//       e.composedPath() como el v7.20 de placement/SRS (camino congelado
//       al iniciar el despacho, inmune a mutaciones del DOM), con
//       contains() como fallback. Toca app.js, onboarding.js, stats.js,
//       index.html; style.css intacto.
// v9.30: cn-es — (1) FIX del botón de grabación ("funciona como play pero
//       no como stop"): durante el análisis el botón tenía pointer-events:
//       none y los clics se ignoraban; la 1.ª evaluación descarga el motor
//       (~40 MB) y WASM transcribe en un hilo → el botón quedaba mudo hasta
//       2 min (maxWaitMs). Ahora el toque durante "processing" CANCELA
//       (VR._cancelProcessing + VE.cancelEval, resultado tardío descartado
//       por token) y el hint lleva ticker de segundos sin pisar el % de
//       descarga. Toca VoiceRecorder.js, voice-evaluator.js, style.css.
//       (2) Mini-dramas DELE (lessons-dele.js NUEVO): 6 diálogos escolares
//       (3×DELE A1 + 3×A2/B1, pista Escolares) con lectura línea a línea en
//       voz 🇪🇸 es-ES (fetchTTS + fallback sistema), "Escuchar todo" en
//       cola, traducción 中文 opcional (ac_dele_zh) y quiz de completar con
//       progreso ac_dele_v1. En cn-es toma #panel-lessons (chips propios);
//       en es-cn el panel HSK/TOCFL queda intacto (MutationObserver sobre
//       #btn-play-es, patrón onboarding.js). Toca index.html, sw.js.
// v9.35: (1) SENSIBILIDAD del reconocimiento de trazos ✍️ — "por más que se
//       hagan los trazos no los reconoce". El quiz de Hanzi Writer usaba
//       leniency 1 (default) y acceptBackwardsStrokes false: con el dedo en
//       el celular, un trazo bien dibujado pero en dirección inversa o un
//       poco desviado fallaba SIEMPRE. Ahora la respuesta a mano usa
//       leniency 2 (duplica la tolerancia de distancia del matcher) +
//       acceptBackwardsStrokes true + pista automática al 2.º error (antes
//       3.º) + aviso pedagógico al 1.er error (el orden y la dirección
//       importan). La práctica grande v7.16 sube a leniency 1.6 + backwards.
//       (2) PLANILLAS: fix "no genera el PDF" — html2canvas explotaba con
//       InvalidStateError en createPattern (las cruces guía de 0.22mm ≈
//       0.83px creaban un patrón de canvas 0×0; ahora 1px en el holder de
//       PDF, la hoja impresa conserva la línea fina) Y el render es página
//       por página (antes TODO el PDF salía de un solo canvas gigante que
//       reventaba el límite de memoria de canvas en iOS/Safari). Fix "suma
//       espacios cuando no los hay": las celdas de práctica ya no inflan a
//       una fila extra casi vacía (ceil((base+2)/C) → fila actual completa;
//       solo si el bloque cae justo en el borde se abren 2 celdas en fila
//       parcial) + celdas de ancho fijo (las filas parciales no se estiran).
//       El contador de "cuántos entran por hoja" usa la MISMA fórmula
//       (pzClassicRows) → contador y hoja real nunca difieren. Toca app.js,
//       index.html, sw.js (libs html2canvas/jspdf ya estaban en el repo).
// v9.34: es-cn — RESPUESTA A MANO (✍️ escribiendo el hanzi con el dedo).
//       El paso pedagógico que faltaba en las respuestas en chino: PRODUCIR
//       el carácter de memoria en vez de tipearlo. Botón ✍️ junto al input
//       de respuesta del panel diario (visible SOLO cuando la respuesta
//       esperada es china: oraciones en es-cn y palabras en cn-es, misma
//       regla expectChineseAns de checkAnswer) y botón ✍️ en el quiz de
//       repaso modo producción ("Escribí el hanzi…"). Abre un banner
//       fullscreen (#handwrite-banner) reutilizando el motor v7.13
//       (hanzi-writer.min.js ya precacheado + caché persistente de datos
//       por carácter) pero con showOutline: false: el carácter NO se ve,
//       Hanzi Writer valida trazo por trazo; 💡 Pista anima el carácter
//       cuando no sale (aprendizaje por imitación); ⌨️ Teclado vuelve al
//       input sin rellenar nada. Palabras multi-carácter → quiz secuencial
//       auto-encadenado (爸爸 se traza una vez). Al completar, el input
//       queda rellenado con la respuesta (guion 简/繁 del usuario) y la
//       corrección existente sigue EXACTAMENTE igual — la lógica de
//       puntuación no cambia ni una línea. Si el motor o los datos no
//       cargan (offline la 1.ª vez), el banner avisa y el teclado sigue
//       siendo el camino: la app no se rompe. Toca app.js, index.html,
//       style.css.
// v9.33: cn-es lecciones — PULIDO DEL PANEL DELE + más Argentina básica.
//       (1) El panel no era intuitivo: había DOS botones "mostrar todo"
//       ("Todas" en la fila de pista y "Todo" en la de nivel). Ahora hay
//       UNO SOLO: "Todas" vive en la fila de niveles; los chips de pista
//       ya no lo llevan — ver todas las pistas = tocar de nuevo el chip
//       activo (toggle). Niveles SEPARADOS (desaparece 'A2/B1'): Todas ·
//       A1 · A2 · B1 · B2 · C1 · C2 con labels cortos (los 5 dramas
//       A2/B1 pasan a A2 o B1; ids intactos → progreso seguro). Nuevo
//       contador de resultados ("18 de 24") a la derecha de la fila de
//       pistas + intro del panel reescrito. (2) 8 dramas NUEVOS pista
//       Argentina en niveles básicos: A1 café con medialunas y
//       colectivo/SUBE, A2 feria del barrio y asado de cumpleaños,
//       B1 la cancha (Boca) y milonga de San Telmo, B2 asado del
//       domingo y entrevista de trabajo (24 dramas en total: 6
//       Escolares + 18 Argentina). Toca lessons-dele.js, index.html.
// v9.32: cn-es lecciones — FIX "se siguen viendo las chinas + los chips
//       de español quedaron todos abajo". CAUSA RAÍZ: applyMode() ocultaba
//       #lesson-levels/#lesson-list con .hidden (display:none, línea 410 de
//       style.css) pero .lesson-levels/.lesson-list definen display:flex
//       MÁS ABAJO (3694/3702) → misma especificidad, gana la última → el
//       CSS real nunca escondió las lecciones de chino (el QA v9.31 medía
//       solo classList, no display computado). FIX: (1) .hidden-force
//       (display:none !important, convención app.js) en los dos contenedores;
//       (2) clase 'dele-only' a nivel de #panel-lessons con regla CSS propia
//       (cinturón y tirantes: sobrevive a re-creación de hijos por
//       renderList/boot); (3) #dele-wrap ahora se inyecta con insertBefore
//       ANTES de #lesson-levels → los chips DELE nacen ARRIBA del bloque
//       chino (antes: appendChild al final). En es-cn todo igual que antes.
//       Toca lessons-dele.js, index.html.
// v9.31: cn-es lecciones — (1) FIX "el audio solo reproduce la primera
//       frase y se para": speakEs() llama a stopSpeak() y stopSpeak()
//       apagaba dQueue → la cola de "▶️ Escuchar todo" moría antes de la
//       2.ª línea. Ahora speakEs preserva la cola (keepQ/keepI) y onGone
//       resetea el botón al terminar sola. Además: cambiar de vista
//       (lectura↔quiz) corta la lectura y tocar una línea con la cola
//       activa reanuda desde esa línea. (2) 10 mini-dramas NUEVOS pista
//       Argentina (adolescentes y adultos): mate porteño, terminal de
//       Retiro, peña salteña, tren a las nubes, Iguazú y el guaraní,
//       Vendimia mendocina, glaciar Perito Moreno, telar mapuche,
//       Pachamama jujeña y debate de radio sobre turismo y pueblos
//       originarios (A2/B1 → C2; 16 dramas en total). Chips de pista
//       (Todas/Escolares/Argentina) + estados vacíos. (3) El panel
//       nace DELE-only desde el primer cuadro en cn-es (pista de modo
//       en localStorage mientras app.js no dé señal; sin flasheo de
//       las lecciones de chino). Toca lessons-dele.js, index.html.
// v9.37: (1) FIX planillas "se desconfiguran los caracteres al final del
//       PDF": el rasterizado por página medía solo el contenido y addImage
//       estiraba SIEMPRE a 210×297 mm — la última página (poco contenido)
//       salía con celdas y glifos deformados (distorsión vertical hasta
//       ~3.4x; QA reproducido con canvas 794×327). Ahora cada holder de
//       página lleva min-height 1123px (proporción A4 exacta) y el alto en
//       mm se deriva del propio canvas (defensa pasiva de aspecto).
//       (2) FIX celdas de práctica del estilo CUADERNO en PDF: vivían en
//       .pz2-cells (grid 24mm+1fr) → el ancho no es cw y forzarles
//       height:cw las volvía rectángulos; ahora height:auto + aspect-ratio
//       1/1 (QA: 46.7×46.7). (3) FIX chip de racha 🔥 del header "no
//       funciona": el clic que abre el popup de estadísticas burbujea hasta
//       document y el cerrador de clic-afuera de stats.js (v9.28) solo
//       protegía #btn-stats → el pop se cerraba instantáneo tras abrirse.
//       #header-streak entra a la lista blanca (mismo patrón que el fix
//       v7.20/v9.29 de los overlays). Tooltip y aria-label aclaran la
//       utilidad ("Tu racha... toca para ver tu calendario y progreso").
//       (4) QA end-to-end del modo 🎧 solo oído (E1-E9) y barrido de
//       funcionalidad (F1-F5): tarjeta tapada, opciones, acierto→destape,
//       calificación y avance, Revelar, re-arma por tarjeta — sin errores
//       JS. Toca app.js, stats.js, index.html.
// v9.38: FIX calificación SRS — "fácil dice no vuelve y 'bien' no vuelve,
//       están en lo mismo": acSrsPreview devolvía el MISMO fallback
//       ('no vuelve') para Bien y Fácil cuando la palabra no estaba en el
//       mazo, y acSrsGrade no registraba nada en ese caso (mismo efecto).
//       Ahora los 3 botones prometen cosas distintas y la cumplen:
//       Otra vez → 10 min (ya estaba); Bien → 'mañana' con alta suave en
//       caja 2 (addCard soporta box 2..6; 'dup' por ‹ Anterior sube de
//       caja); Fácil → 'no vuelve' (solo conocidas). Subtítulos i18n
//       gradeTomorrow ('mañana'/'明天') y días en 天 para cn-es. Toca app.js.
// v9.39: ONBOARDING SINTÉTICO — la guía de bienvenida pasa de 7 pasos a 4
//       (~1 minuto) y explica la app ACTUAL: (1) bienvenida con el modo
//       activo (chino ⇄ español) y dónde reabrirla (🙂 Yo → 📖 Guía, su
//       ubicación real desde v10); (2) las 4 vistas de la nav (Hoy/
//       Aprender/Entrenar/Yo) con enlace real al repaso (#btn-srs);
//       (3) el ciclo de cada frase con la calificación v9.38 (Otra vez →
//       10 min · Bien → mañana · Fácil → no vuelve) + cajas de Leitner
//       tocables con los intervalos reales del mazo; (4) racha 🔥 en vivo
//       (HuayuStats.getSummary) + proverbio. Fuera: quiz de la curva del
//       olvido, paso "cuánto tiempo" y mapa largo de 6 ítems (el mapa vive
//       ahora en el paso de las 4 vistas). Mantiene: Saltar guía, 44px,
//       Escape/clic afuera, toggle 简/繁, enlaces defensivos. Toca
//       onboarding.js + index.html (sello 20260919b).
const VERSION = 'v86'; // — invalida shell (v9.39: onboarding sintético de 4 pasos)
// v9.36: (1) v10 UX integrada — rediseño completo: nav inferior de 4
//       vistas (Hoy / Aprender / Entrenar / Yo), header reducido con
//       racha en vivo, vista Yo con ajustes/respaldo/instalar, tabs de
//       contenido, skip-link de accesibilidad y “Saltar guía” en el
//       onboarding (targets táctiles de 44px). Base entregada por el
//       usuario y validada contra el estado v9.34 (la zona de
//       planillas/manuscrito quedó intacta). (2) FIXES v9.35
//       re-aplicados sobre esa base: sensibilidad del reconocimiento
//       a mano (leniency 2 + trazos en dirección inversa + pista al
//       2.º error en respuestas; leniency 1.6 en la práctica v7.16) y
//       planillas (PDF página por página seguro en iOS con cruces
//       guía visibles, sin filas casi vacías con fórmula compartida
//       contador=hoja, ancho fijo de celdas). Toca app.js, style.css,
//       onboarding.js, index.html.

// v9.13: dict-mini.js cobertura TOTAL (+1948 glosas de práctica diaria: 到/看/打/请/
//        吃/做… y 2736 chars del corpus completo → 0 sin glosa; polifónicos a mano)
//        + slogan v9.13 "Vive el idioma, una frase al día - 日常華語".
// v9.12: dict-mini.js ampliado (+742 glosas de clásicos/lecciones; 電=electricidad;
//        讀/道/孝 sin "No tengo la traducción") + desglose por carácter usa el
//        diccionario como respaldo. app.js: lookupVocab capa 'chars' con dict-mini.
// v9.11: audio según dirección; play/pausa con ícono en lecciones/clásicos; panel
//        de oración sin audio (solo botón parlante).
const SHELL_CACHE = `huayu-diario-shell-${VERSION}`;
const TTS_CACHE = 'chino-es-tts-v1';     // persiste entre versiones (no se borra)
const MODEL_CACHE = 'chino-es-models-v1'; // v7.7: modelos IA — NUNCA se borra
const DATA_CACHE = 'chino-es-hanzi-v1';  // v7.13: datos de trazos Hanzi Writer — NUNCA se borra
const TTS_MAX_ENTRIES = 80;

const PRECACHE = [
  './',
  './index.html',
  './app.js',
  './VoiceRecorder.js',    // v7.5/7.7/7.8: captura + UI de pronunciación (por modo)
  './config.js',           // v7.8: constantes calibrables (umbral de confianza, tolerancia léxica)
  './text-utils.js',       // v7.8: normalizeText por idioma + Levenshtein por palabra
  './pitch-analyzer.js',   // v7.7/7.8: F0 (YIN) + DTW + clase PitchAnalyzer (carga LAZY en es-cn)
  './voice-evaluator.js',  // v7.6-7.8: orquestador por MODO (es-cn / cn-es)
  './style.css',
  './dict-mini.js',         // v7.12: Capa 4 — diccionario offline zh↔es (CC-BY-SA 4.0)
  './lessons.js',           // v7.14: textos completos de las lecciones (📖 Leer lección)
  './lessons-tocfl.js',     // v9.6: mini-dramas TOCFL (se concatenan a GRADED_LESSONS)
  './lessons-extra.js',     // v9.6c: mini-dramas HSK extra (+2 por nivel)
  './lessons-dele.js',      // v9.30: mini-dramas DELE para cn-es (aprendices de español)
  './classics.js',          // v9.2: TEXTO ORIGINAL de los 9 clásicos por bloques (lector de clásicos)
  './onboarding.js',        // v9.22: guía interactiva de bienvenida (bilingüe según modo)
  './stats.js',             // v9.23: rachas y estadísticas (bilingüe según modo)
  './hanzi-writer.min.js',  // v7.13: orden de trazos (MIT) — se inyecta LAZY pero precacheado p/ offline
  './pinyin-pro.min.js',
  './html2canvas.min.js',  // v7.1: PDF directo de planillas (carga perezosa)
  './jspdf.umd.min.js',    // v7.1: ídem
  './manifest.json',
  './icons/logo-192.png',      // v9.8: ícono PWA (lockup completo 日常華語)
  './icons/logo-512.png',      // v9.8: ícono PWA alta resolución
  './icons/logo-sello.png',    // v9.8: sello rojo del header
  './icons/maskable-icon.png', // v9.8: ícono adaptable (safe zone círculo)
  './icons/favicon.png'        // v9.8: favicon PNG del sello
  // v6.2: los datos van DENTRO de app.js (EMBEDDED_MODULE_DATA) — no hace falta data/
  // v7.7: los archivos DEL MODELO Whisper (40 MB) NO van al precache:
  //       los gestiona MODEL_CACHE en runtime (ver cacheFirstModel).
  // v7.8: pitch-analyzer.js sigue en el precache aunque se cargue LAZY:
  //       así el ensurePitchScript() del modo chino funciona offline.
];

/* ---------- Install: precache tolerante (un 404 no rompe el SW) ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.all(PRECACHE.map((url) =>
      cache.add(url).catch((err) => console.warn('[SW] precache falló (no crítico):', url, err.message))
    ));
    await self.skipWaiting();
  })());
});

/* ---------- Activate: limpiar caches viejos (conservan TTS y modelos) ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k !== SHELL_CACHE && k !== TTS_CACHE && k !== MODEL_CACHE && k !== DATA_CACHE)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* ---------- Fetch: router de estrategias ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method === 'POST') {
    if (req.url.includes('/api/tts')) event.respondWith(handleTTS(req));
    return; // otros POST → red directa
  }
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstShell(req));
  } else if (isModelAsset(url)) {
    event.respondWith(cacheFirstImmutable(req, MODEL_CACHE)); // v7.7: modelos IA → caché persistente
  } else if (isHanziData(url)) {
    event.respondWith(cacheFirstImmutable(req, DATA_CACHE)); // v7.13: datos de trazos → caché persistente
  } else {
    event.respondWith(cacheFirstRuntime(req)); // CDN y otros cross-origin GET
  }
});

/* ---------- v7.13: ¿son datos de un carácter para Hanzi Writer? ----------
   JSON chicos (~15 KB) e INMUTABLES (el trazo de 你 no cambia): una vez
   cacheados funcionan offline para siempre y no se re-bajan en updates. */
function isHanziData(url) {
  return url.hostname === 'cdn.jsdelivr.net' &&
         url.pathname.includes('hanzi-writer-data');
}

/* ---------- v7.7: ¿es un archivo del motor de IA (grande, inmutable)? ---------- */
function isModelAsset(url) {
  return url.hostname === 'huggingface.co' ||
         url.hostname.endsWith('.hf.co') ||
         (url.hostname === 'cdn.jsdelivr.net' &&
          (url.pathname.includes('@huggingface/transformers') ||
           url.pathname.includes('onnxruntime-web')));
}

/* ---------- v7.7/7.13: inmutables — cache-first SIN refresco ----------
   Modelos IA (40 MB) y datos de caracteres de Hanzi Writer: acá no
   conviene revalidar en background. Cache parametrizable para que
   cada familia viva en su caché persistente. */
async function cacheFirstImmutable(req, cacheName) {
  const cacheToUse = cacheName || MODEL_CACHE;
  const cached = await caches.match(req, { ignoreVary: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      try { const c = await caches.open(cacheToUse); await c.put(req, res.clone()); } catch (e) { /* noop */ }
    }
    return res;
  } catch (err) {
    throw err;
  }
}

/* ---------- Shell mismo origen: cache-first + refresh en background ---------- */
async function cacheFirstShell(req) {
  let cached = await caches.match(req, { ignoreVary: true });
  if (!cached) {
    // Fallback sin query: 'app.js?v=20260901c' matchea el './app.js' precacheado
    // (así el offline funciona desde la 1ª visita). Online siempre gana la red:
    // un ?v= nuevo no está en caché → fetch → se guarda con su query completa.
    try {
      const u = new URL(req.url);
      if (u.search) cached = await caches.match(u.pathname, { ignoreVary: true });
    } catch (e) { /* noop */ }
  }
  if (cached) {
    // refresca la copia en silencio para la próxima visita
    fetch(req).then((res) => {
      if (res && res.ok) caches.open(SHELL_CACHE).then((c) => c.put(req, res)).catch(() => {});
    }).catch(() => {});
    return cached;
  }
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      try { const c = await caches.open(SHELL_CACHE); await c.put(req, res.clone()); } catch (e) { /* noop */ }
    }
    return res;
  } catch (err) {
    if (req.mode === 'navigate') {
      const idx = await caches.match('./index.html', { ignoreVary: true });
      if (idx) return idx; // modo avión: sirve la app igual
    }
    throw err;
  }
}

/* ---------- Cross-origin GET: cache-first runtime (CDN etc.) ---------- */
async function cacheFirstRuntime(req) {
  const cached = await caches.match(req, { ignoreVary: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      try { const c = await caches.open(SHELL_CACHE); await c.put(req, res.clone()); } catch (e) { /* noop */ }
    }
    return res;
  } catch (err) {
    throw err;
  }
}

/* ---------- TTS: POST → clave estable por (texto|idioma|voz) ---------- */
async function handleTTS(req) {
  let key = null;
  try {
    const body = await req.clone().json();
    const raw = `${body.text || ''}|${body.lang || ''}|${body.voice || ''}`;
    key = self.location.origin + '/__tts__/' + djb2(raw);
  } catch (e) { /* body no-JSON → sin caché, pasa a red */ }

  if (key) {
    const hit = await caches.match(key, { ignoreVary: true, cacheName: TTS_CACHE });
    if (hit) return hit; // 🎉 reescucha offline de audio ya sintetizado
  }
  try {
    const res = await fetch(req);
    if (res && res.ok && key) {
      putTTS(key, res.clone()).catch(() => {});
    }
    return res;
  } catch (err) {
    // sin red y sin caché → el frontend usa la voz del sistema (fallback existente)
    throw err;
  }
}

async function putTTS(key, res) {
  const cache = await caches.open(TTS_CACHE);
  const headers = new Headers(res.headers);
  headers.set('x-tts-time', String(Date.now()));
  headers.set('x-tts-key', key.slice(-12));
  const stored = new Response(await res.clone().arrayBuffer(), { status: res.status, headers });
  await cache.put(key, stored);
  trimTTS(cache).catch(() => {});
}

async function trimTTS(cache) {
  const keys = await cache.keys();
  if (keys.length <= TTS_MAX_ENTRIES) return;
  const entries = await Promise.all(keys.map(async (k) => {
    const r = await cache.match(k, { ignoreVary: true });
    const t = r ? parseInt(r.headers.get('x-tts-time') || '0', 10) : 0;
    return { k, t };
  }));
  entries.sort((a, b) => a.t - b.t); // más viejos primero
  const toDelete = entries.slice(0, entries.length - TTS_MAX_ENTRIES);
  await Promise.all(toDelete.map((e) => cache.delete(e.k)));
}

/* ---------- hash djb2 (clave corta y estable) ---------- */
function djb2(str) {
  let h1 = 5381, h2 = 52711;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = ((h1 << 5) + h1 + c) >>> 0;
    h2 = ((h2 << 5) + h2 + c) >>> 0;
  }
  return h1.toString(36) + h2.toString(36);
}
