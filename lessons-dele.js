// ═══════════════════════════════════════════════════════════════════
// lessons-dele.js — v9.33 · MINI-DRAMAS DELE (aprendices de español)
// -------------------------------------------------------------------
// Mini-dramas graduados por el DELE (Diploma de Español como Lengua
// Extranjera) para el modo cn-es (chino → español), en DOS PISTAS:
//   · Escolares (v9.30)  → espejo del dropdown DELE de oraciones:
//     DELE A1 y A2/B1 de vida escolar (niños)
//   · Argentina (v9.31)  → adolescentes y adultos: contextos locales,
//     viajes a las provincias y culturas originarias (A2/B1 → C2):
//     mate porteño, terminal de Retiro, peña salteña, tren a las
//     nubes, Iguazú y el guaraní, Vendimia mendocina, glaciar
//     Perito Moreno, telar mapuche, Pachamama jujeña y un debate
//     de radio sobre turismo y pueblos originarios.
// v9.33 panel pulido ("no es tan intuitivo, hay 'Todas' y 'todo'"):
//   · UN SOLO botón "mostrar todo": "Todas" en la fila de niveles; los
//     chips de pista ya NO tienen "Todas" — ver todas las pistas = tocar
//     de nuevo el chip activo (toggle). Niveles SEPARADOS (adiós A2/B1):
//     Todas · A1 · A2 · B1 · B2 · C1 · C2, con labels cortos y re-tap que
//     vuelve a "Todas". Contador de resultados ("18 de 24") a la derecha
//     de la fila de pistas.
//   · 8 dramas NUEVOS pista Argentina en niveles básicos (petición del
//     usuario): A1 café con medialunas + colectivo/SUBE, A2 feria del
//     barrio + asado de cumpleaños, B1 la cancha (fútbol) + milonga de
//     San Telmo, B2 asado del domingo + entrevista de trabajo.
//     24 dramas en total (6 Escolares + 18 Argentina).
// v9.31 filtro de pista (hoy superado): chips Todas/Escolares/Argentina
// sobre la fila de niveles DELE.
// v9.31 fix "Escuchar todo": stopSpeak() apagaba la cola dentro del
// propio speakEs() → solo sonaba la 1.ª línea (reporte del usuario).
// Es ARCHIVO ADITIVO Y AUTOCONTENIDO (patrón onboarding.js/mpInit):
// inyecta su lista dentro de #panel-lessons cuando el modo es cn-es
// (la pestaña 📖 Lecciones muestra HSK/TOCFL solo en es-cn) y abre su
// propio overlay #dele-pop con la piel .lq-pop. NO modifica lessonsInit
// ni ningún flujo existente: si algo falla, la app sigue igual.
// Audio: fetchTTS (Vercel) es-ES con la voz 🇪🇸 elegida por el alumno
// (voiceEs) + velocidad ⚡ global + fallback speechSynthesis.
// Progreso: ac_dele_v1 { id: { best, completed } } — viaja en el
// respaldo (filtro /^ac_/ de backupCollect) como ac_lessons_v1.
// ─────────────────────────────────────────────────────────────────
// Esquema por drama (contrato interno v9.30):
//   { id, dele: 'A1'|'A2/B1', track: 'Escolares', emoji,
//     titleEs, titleZh, blurb, blurbZh,
//     lines: [{ who (opcional), sp, zh }],
//     quiz:  [{ sp (con ___), zh, opts: [{ w, e } × 3] }]  → opts[0] = correcta }
// ═══════════════════════════════════════════════════════════════════
(function () {
    'use strict';

    // helpers locales (patrón mpInit: cero acoplamiento con el scope global)
    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    /* ══════════════ DATOS: 6 mini-dramas DELE ══════════════ */
    const DRAMAS = [

        // ─────────────────────────────────────────────────────────
        // 1 · 🏫 Primer día de clase — DELE A1 Escolares
        //     saludos, presentaciones, ser/estar, objetos de clase
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a1-primer-dia',
            dele: 'A1', track: 'Escolares',
            emoji: '🏫',
            titleEs: 'Primer día de clase',
            titleZh: '开学第一天',
            blurb: 'Mateo llega a su nueva escuela. Laura lo recibe: presentaciones, el pupitre junto a la ventana y un lápiz prestado. Vocabulario de la clase y verbos ser, estar y tener.',
            blurbZh: '马特奥来到新学校。劳拉接待他：自我介绍、靠窗的座位和一支借来的铅笔。课堂词汇和 ser、estar、tener 三个动词。',
            lines: [
                { who: 'Laura', sp: '¡Buenos días! ¿Eres el alumno nuevo?', zh: '早上好！你是新来的学生吗？' },
                { who: 'Mateo', sp: 'Sí, me llamo Mateo. ¿Y tú?', zh: '是的，我叫马特奥。你呢？' },
                { who: 'Laura', sp: 'Yo soy Laura. Bienvenido a la clase.', zh: '我叫劳拉。欢迎来到我们班。' },
                { who: 'Mateo', sp: 'Gracias. ¿Dónde está mi pupitre?', zh: '谢谢。我的课桌在哪里？' },
                { who: 'Laura', sp: 'Está junto a la ventana, al lado de mí.', zh: '在窗户旁边，在我旁边。' },
                { who: 'Mateo', sp: '¿Tienes un lápiz? Olvidé el mío en casa.', zh: '你有铅笔吗？我把我的忘在家里了。' },
                { who: 'Laura', sp: 'Claro, aquí tienes uno verde.', zh: '当然，给你一支绿色的。' },
                { who: 'Profesora', sp: 'Silencio, por favor. ¡Empezamos la clase!', zh: '请安静。我们开始上课！' },
                { who: 'Mateo', sp: '¡Gracias, Laura! Eres muy amable.', zh: '谢谢你，劳拉！你真好。' }
            ],
            quiz: [
                { sp: 'Me llamo Mateo. ¿Y ___?', zh: '我叫马特奥。你呢？',
                  opts: [{ w: 'tú', e: '你' }, { w: 'yo', e: '我' }, { w: 'él', e: '他' }] },
                { sp: '¿Dónde ___ mi pupitre?', zh: '我的课桌在哪里？',
                  opts: [{ w: 'está', e: '在（位置）' }, { w: 'es', e: '是' }, { w: 'tengo', e: '我有' }] },
                { sp: 'Está junto ___ la ventana.', zh: '在窗户旁边。',
                  opts: [{ w: 'a', e: '到（junto a：在…旁边）' }, { w: 'de', e: '的' }, { w: 'en', e: '在…里' }] },
                { sp: '¿Tienes un ___? Olvidé el mío.', zh: '你有铅笔吗？我忘带了。',
                  opts: [{ w: 'lápiz', e: '铅笔' }, { w: 'perro', e: '狗' }, { w: 'año', e: '年' }] },
                { sp: 'Eres muy ___, Laura.', zh: '你真好，劳拉。',
                  opts: [{ w: 'amable', e: '友善的' }, { w: 'verde', e: '绿色的' }, { w: 'nuevo', e: '新的' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 2 · 🧃 En el kiosco del colegio — DELE A1 Escolares
        //     números, precios, querer/comprar, cortesía
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a1-kiosco',
            dele: 'A1', track: 'Escolares',
            emoji: '🧃',
            titleEs: 'En el kiosco del colegio',
            titleZh: '学校的小卖部',
            blurb: 'Paula y Diego compran la merienda: un jugo, dos galletas y el cambio de cinco euros. Precios, números del 1 al 10 y las palabras mágicas por favor y gracias.',
            blurbZh: '保拉和迭戈买点心：一杯果汁、两块饼干和五欧元的找零。价格、1 到 10 的数字，以及“请”和“谢谢”这两个魔法词。',
            lines: [
                { who: 'Paula', sp: '¡Qué hambre! Voy al kiosco. ¿Vienes?', zh: '好饿啊！我去小卖部。你来吗？' },
                { who: 'Diego', sp: 'Sí, quiero un jugo de naranja.', zh: '好，我想要一杯橙汁。' },
                { who: 'Paula', sp: 'Buenos días, ¿cuánto cuesta un jugo?', zh: '早上好，一杯果汁多少钱？' },
                { who: 'Vendedor', sp: 'El jugo cuesta dos euros y la galleta, un euro.', zh: '果汁两欧元，饼干一欧元。' },
                { who: 'Paula', sp: 'Un jugo y dos galletas, por favor.', zh: '请给我一杯果汁和两块饼干。' },
                { who: 'Vendedor', sp: 'Son cuatro euros.', zh: '一共四欧元。' },
                { who: 'Paula', sp: 'Aquí tienes. ¿Tienes cambio de cinco?', zh: '给你。五欧元能找开吗？' },
                { who: 'Vendedor', sp: 'Sí, aquí tienes tu vuelto: un euro.', zh: '可以，这是找你的零钱：一欧元。' },
                { who: 'Diego', sp: '¡Está rico! Mañana vuelvo por otro jugo.', zh: '很好喝！明天我再来买一杯果汁。' }
            ],
            quiz: [
                { sp: '¡Qué ___! Voy al kiosco.', zh: '好饿啊！我去小卖部。',
                  opts: [{ w: 'hambre', e: '饿' }, { w: 'frío', e: '冷' }, { w: 'suerte', e: '运气' }] },
                { sp: '¿Cuánto ___ un jugo?', zh: '一杯果汁多少钱？',
                  opts: [{ w: 'cuesta', e: '花费' }, { w: 'come', e: '吃' }, { w: 'quiere', e: '想要' }] },
                { sp: 'Un jugo y dos ___, por favor.', zh: '请给我一杯果汁和两块饼干。',
                  opts: [{ w: 'galletas', e: '饼干' }, { w: 'casas', e: '房子' }, { w: 'años', e: '年' }] },
                { sp: 'Son cuatro ___.', zh: '一共四欧元。',
                  opts: [{ w: 'euros', e: '欧元' }, { w: 'libros', e: '书' }, { w: 'días', e: '天' }] },
                { sp: 'Aquí tienes tu ___: un euro.', zh: '这是找你的零钱：一欧元。',
                  opts: [{ w: 'vuelto', e: '零钱' }, { w: 'lápiz', e: '铅笔' }, { w: 'clase', e: '班级' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 3 · ⚽ Fútbol en el recreo — DELE A1 Escolares
        //     gustar/querer jugar, días de la semana, la hora
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a1-recreo',
            dele: 'A1', track: 'Escolares',
            emoji: '⚽',
            titleEs: 'Fútbol en el recreo',
            titleZh: '课间足球',
            blurb: 'Sofía quiere jugar al fútbol con el equipo de Tomás: faltan dos jugadores, el partido es a las once y media y el viernes hay música. Días de la semana y la hora.',
            blurbZh: '索菲亚想加入托马斯的足球队：还缺两个人，比赛十一点半开始，周五有音乐课。星期和钟点。',
            lines: [
                { who: 'Sofía', sp: '¿Juegan al fútbol en el recreo?', zh: '课间你们踢足球吗？' },
                { who: 'Tomás', sp: 'Sí, todos los días jugamos en la cancha.', zh: '对，我们每天都在球场踢。' },
                { who: 'Sofía', sp: 'Yo también quiero jugar. ¿Puedo?', zh: '我也想玩。可以吗？' },
                { who: 'Tomás', sp: '¡Claro! Somos cuatro y faltan dos.', zh: '当然！我们只有四个人，还差两个。' },
                { who: 'Sofía', sp: 'Mi hermano juega muy bien. Él viene también.', zh: '我哥哥踢得很好。他也来。' },
                { who: 'Tomás', sp: 'Perfecto. El partido es a las once y media.', zh: '太好了。比赛十一点半开始。' },
                { who: 'Sofía', sp: '¿El viernes también juegan?', zh: '周五你们也踢吗？' },
                { who: 'Tomás', sp: 'No, el viernes tenemos música a esa hora.', zh: '不行，周五那个时间我们有音乐课。' },
                { who: 'Sofía', sp: 'Entonces el lunes juegan los dos equipos.', zh: '那就周一，两个队一起踢。' }
            ],
            quiz: [
                { sp: '¿___ al fútbol en el recreo?', zh: '课间你们踢足球吗？',
                  opts: [{ w: 'Juegan', e: '他们踢（球）' }, { w: 'Comen', e: '他们吃' }, { w: 'Leen', e: '他们读' }] },
                { sp: 'Somos cuatro y ___ dos.', zh: '我们四个人，还缺两个。',
                  opts: [{ w: 'faltan', e: '缺少' }, { w: 'hay', e: '有' }, { w: 'son', e: '是' }] },
                { sp: 'Mi ___ juega muy bien.', zh: '我哥哥踢得很好。',
                  opts: [{ w: 'hermano', e: '哥哥' }, { w: 'ventana', e: '窗户' }, { w: 'galleta', e: '饼干' }] },
                { sp: 'El partido es a las ___ y media.', zh: '比赛十一点半开始。',
                  opts: [{ w: 'once', e: '十一（点）' }, { w: 'siete', e: '七（点）' }, { w: 'nueve', e: '九（点）' }] },
                { sp: 'El ___ tenemos música.', zh: '周五我们有音乐课。',
                  opts: [{ w: 'viernes', e: '周五' }, { w: 'lunes', e: '周一' }, { w: 'domingo', e: '周日' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 4 · 🚌 La excursión al museo — DELE A2 Escolares (v9.33: A2/B1→A2)
        //     tener que + hay que, poder, pretérito (pude)
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2-excursion',
            dele: 'A2', track: 'Escolares',
            emoji: '🚌',
            titleEs: 'La excursión al museo',
            titleZh: '博物馆远足',
            blurb: 'La señorita Ana organiza la excursión: salida a las ocho y media, entradas pagadas y nada de fotos en las salas. Obligaciones con tener que y hay que, y pasado con pude.',
            blurbZh: '安娜老师组织远足：八点半出发，门票已买好，展厅里不能拍照。用 tener que 和 hay que 表达义务，用 pude 讲过去。',
            lines: [
                { who: 'Señorita Ana', sp: 'Mañana tenemos la excursión al museo. ¿Todos saben a qué hora salimos?', zh: '明天我们去博物馆远足。大家都知道几点出发吗？' },
                { who: 'Martín', sp: 'A las ocho y media, en la puerta del colegio.', zh: '八点半，在学校门口。' },
                { who: 'Señorita Ana', sp: 'Muy bien. ¿Qué hay que llevar?', zh: '很好。需要带什么？' },
                { who: 'Lucía', sp: '¿Tenemos que llevar dinero para la entrada?', zh: '我们要带门票钱吗？' },
                { who: 'Señorita Ana', sp: 'No hace falta; la escuela ya pagó las entradas.', zh: '不用；学校已经买好票了。' },
                { who: 'Martín', sp: '¿Puedo llevar mi cámara?', zh: '我可以带相机吗？' },
                { who: 'Señorita Ana', sp: 'Sí, pero no se pueden tomar fotos dentro de las salas.', zh: '可以，但展厅里面不能拍照。' },
                { who: 'Lucía', sp: 'Señorita, anoche no pude dormir de la emoción.', zh: '老师，我昨晚激动得睡不着。' },
                { who: 'Señorita Ana', sp: 'Ja, ja. Entonces hoy duerman temprano: mañana caminamos mucho.', zh: '哈哈。那今晚早点睡：明天要走很多路。' },
                { who: 'Martín', sp: '¿A qué hora volvemos al colegio?', zh: '我们几点回学校？' },
                { who: 'Señorita Ana', sp: 'A las cuatro de la tarde. Cada uno trae su almuerzo.', zh: '下午四点。每个人自己带午饭。' }
            ],
            quiz: [
                { sp: '¿Todos saben a qué ___ salimos?', zh: '大家都知道几点出发吗？',
                  opts: [{ w: 'hora', e: '时间' }, { w: 'color', e: '颜色' }, { w: 'puerta', e: '门' }] },
                { sp: '¿Tenemos que ___ dinero para la entrada?', zh: '我们要带门票钱吗？',
                  opts: [{ w: 'llevar', e: '带' }, { w: 'dormir', e: '睡觉' }, { w: 'cantar', e: '唱歌' }] },
                { sp: 'No hace ___; la escuela ya pagó.', zh: '不用；学校已经买好了。',
                  opts: [{ w: 'falta', e: '需要（hacer falta）' }, { w: 'gusto', e: '高兴' }, { w: 'caso', e: '情况' }] },
                { sp: 'Anoche no ___ dormir de la emoción.', zh: '我昨晚激动得睡不着。',
                  opts: [{ w: 'pude', e: '能（过去时）' }, { w: 'puedo', e: '能（现在时）' }, { w: 'voy', e: '去' }] },
                { sp: 'Mañana ___ mucho.', zh: '明天我们要走很多路。',
                  opts: [{ w: 'caminamos', e: '我们走路' }, { w: 'comemos', e: '我们吃' }, { w: 'compramos', e: '我们买' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 5 · 🩹 En la enfermería — DELE A2 Escolares (v9.33: A2/B1→A2)
        //     doler, sentirse, el cuerpo, consejos (toma/descansa)
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2-enfermeria',
            dele: 'A2', track: 'Escolares',
            emoji: '🩹',
            titleEs: 'En la enfermería',
            titleZh: '在医务室',
            blurb: 'Emma se marea en gimnasia: le duele la cabeza y tiene fiebre. La enfermera le toma la temperatura y la manda a descansar. Partes del cuerpo y verbos doler y sentirse.',
            blurbZh: '艾玛在体育课上头晕：她头疼、发烧。护士给她量体温，让她休息。身体部位和 doler、sentirse 两个动词。',
            lines: [
                { who: 'Enfermera', sp: 'Hola, ¿qué te pasa?', zh: '你好，你怎么了？' },
                { who: 'Emma', sp: 'Me duele la cabeza y tengo un poco de fiebre.', zh: '我头疼，还有点发烧。' },
                { who: 'Enfermera', sp: '¿Desde cuándo te sientes así?', zh: '你这样感觉多久了？' },
                { who: 'Emma', sp: 'Desde esta mañana. En la clase de gimnasia me mareé.', zh: '从今天早上开始。体育课上我头晕。' },
                { who: 'Enfermera', sp: 'Te tomo la temperatura... treinta y ocho grados.', zh: '我给你量个体温……三十八度。' },
                { who: 'Emma', sp: '¿Es grave? Hoy tengo examen de historia.', zh: '严重吗？我今天有历史考试。' },
                { who: 'Enfermera', sp: 'No te preocupes. Voy a llamar a tus papás.', zh: '别担心。我给你父母打电话。' },
                { who: 'Emma', sp: '¿Puedo ir a la clase de mañana?', zh: '我明天可以去上课吗？' },
                { who: 'Enfermera', sp: 'Si te sientes mejor, sí. Descansa y toma mucha agua.', zh: '如果你感觉好些，就可以。好好休息，多喝水。' }
            ],
            quiz: [
                { sp: 'Me ___ la cabeza.', zh: '我头疼。',
                  opts: [{ w: 'duele', e: '疼' }, { w: 'canta', e: '唱歌' }, { w: 'mira', e: '看' }] },
                { sp: 'Tengo un poco de ___.', zh: '我有点发烧。',
                  opts: [{ w: 'fiebre', e: '发烧' }, { w: 'tarea', e: '作业' }, { w: 'suerte', e: '运气' }] },
                { sp: '¿Desde cuándo te ___ así?', zh: '你这样感觉多久了？',
                  opts: [{ w: 'sientes', e: '感觉' }, { w: 'llamas', e: '叫、打电话' }, { w: 'quedas', e: '留下' }] },
                { sp: 'Te tomo la ___... treinta y ocho grados.', zh: '我给你量个体温……三十八度。',
                  opts: [{ w: 'temperatura', e: '体温' }, { w: 'mochila', e: '书包' }, { w: 'leche', e: '牛奶' }] },
                { sp: 'Descansa y toma mucha ___.', zh: '好好休息，多喝水。',
                  opts: [{ w: 'agua', e: '水' }, { w: 'foto', e: '照片' }, { w: 'historia', e: '历史' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 6 · 🎤 El festival de talento — DELE B1 Escolares (v9.33: A2/B1→B1)
        //     opinions (creo que), ir a + infinitivo, condición
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2b1-talento',
            dele: 'B1', track: 'Escolares',
            emoji: '🎤',
            titleEs: 'El festival de talento',
            titleZh: '才艺节',
            blurb: 'Valeria y Bruno preparan el festival: dos canciones, un baile y muchos nervios. Opiniones con creo que, planes con ir a y una condición: si sale bien, van al concurso provincial.',
            blurbZh: '瓦莱里娅和布鲁诺准备才艺节：两首歌、一支舞和不少紧张。用 creo que 表达看法，用 ir a 谈计划，还有条件句：顺利的话就去省里比赛。',
            lines: [
                { who: 'Valeria', sp: 'El festival de talento es el sábado. ¿Ya tienen su número listo?', zh: '才艺表演就在周六。你们的节目准备好了吗？' },
                { who: 'Bruno', sp: 'Casi. Voy a cantar dos canciones, pero me pongo muy nervioso.', zh: '差不多。我要唱两首歌，但我会很紧张。' },
                { who: 'Valeria', sp: 'Yo creo que vas a estar genial: ensayas todos los días.', zh: '我觉得你会表现得很棒：你每天都排练。' },
                { who: 'Bruno', sp: '¿Tú qué vas a presentar?', zh: '你打算表演什么？' },
                { who: 'Valeria', sp: 'Un baile con mi hermana. Ensayamos desde hace un mes.', zh: '和我妹妹跳一支舞。我们排练了一个月。' },
                { who: 'Bruno', sp: '¿Cuánto dura el número?', zh: '节目多长时间？' },
                { who: 'Valeria', sp: 'Tres minutos. Si sale bien, participamos en el concurso provincial.', zh: '三分钟。如果顺利，我们就去参加省里的比赛。' },
                { who: 'Bruno', sp: 'Ojalá todo salga bien. ¿A qué hora hay que llegar?', zh: '希望一切顺利。几点得到场？' },
                { who: 'Valeria', sp: 'A las nueve en el auditorio. No llegues tarde, por favor.', zh: '九点，在礼堂。请别迟到。' },
                { who: 'Bruno', sp: 'Nos vemos el sábado. ¡Mucha suerte para las dos!', zh: '周六见。祝你们俩好运！' }
            ],
            quiz: [
                { sp: 'Voy a ___ dos canciones.', zh: '我要唱两首歌。',
                  opts: [{ w: 'cantar', e: '唱' }, { w: 'comer', e: '吃' }, { w: 'dormir', e: '睡' }] },
                { sp: 'Yo ___ que vas a estar genial.', zh: '我觉得你会表现得很棒。',
                  opts: [{ w: 'creo', e: '认为' }, { w: 'voy', e: '去' }, { w: 'tengo', e: '有' }] },
                { sp: 'Ensayamos ___ hace un mes.', zh: '我们排练了一个月。',
                  opts: [{ w: 'desde', e: '从' }, { w: 'para', e: '为了' }, { w: 'entre', e: '在…之间' }] },
                { sp: 'Si ___ bien, participamos en el concurso.', zh: '如果顺利，我们就去参加比赛。',
                  opts: [{ w: 'sale', e: '进行（顺利）' }, { w: 'sales', e: '你进行' }, { w: 'salimos', e: '我们进行' }] },
                { sp: 'No llegues ___.', zh: '请别迟到。',
                  opts: [{ w: 'tarde', e: '迟到、晚' }, { w: 'temprano', e: '早' }, { w: 'lento', e: '慢' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 7 · 🧉 El primer mate — DELE A2 · Argentina (v9.31; v9.33: A2/B1→A2)
        //     Buenos Aires, adolescente; voseo suave, la casa,
        //     compartir (mate = amistad)
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2b1-mate',
            dele: 'A2', track: 'Argentina',
            emoji: '🧉',
            titleEs: 'El primer mate',
            titleZh: '第一次喝马黛茶',
            blurb: 'Wei, un estudiante chino en Buenos Aires, prueba por primera vez el mate con la familia de Camila: la yerba, la bombilla, el agua caliente y la ronda de amigos. Vocabulario de la casa y el voseo argentino (querés, vos).',
            blurbZh: '在布宜诺斯艾利斯的中国学生魏第一次和卡米拉一家喝马黛茶：马黛茶叶、金属吸管、热水和朋友间的分享轮。家庭词汇和阿根廷的 voseo（querés、vos）称呼。',
            lines: [
                { who: 'Camila', sp: 'Wei, ¿querés probar el mate? Es la bebida típica de acá.', zh: '魏，你想尝尝马黛茶吗？这是我们这儿的特色饮品。' },
                { who: 'Wei', sp: 'Sí, gracias. ¿Es igual que el té de mi país?', zh: '好，谢谢。它和我老家的茶一样吗？' },
                { who: 'Camila', sp: 'No exactamente. Se toma con una calabaza y una bombilla.', zh: '不完全一样。它用一个小葫芦和一根金属吸管来喝。' },
                { who: 'Hernán', sp: 'La yerba va acá, dentro del mate. Y el agua no debe hervir.', zh: '茶叶放在这里，马黛壶里面。水不能烧开。' },
                { who: 'Wei', sp: '¿Amargo o dulce?', zh: '是苦的还是甜的？' },
                { who: 'Hernán', sp: 'Los argentinos lo tomamos amargo. Pero podemos ponerle azúcar.', zh: '我们阿根廷人喝苦的。不过也可以加糖。' },
                { who: 'Camila', sp: 'El mismo mate se comparte entre todos. Primero yo, después vos.', zh: '同一个壶大家轮流喝。先我，然后你。' },
                { who: 'Wei', sp: '¡Qué interesante! Es como una ronda de amistad.', zh: '真有意思！就像一个友谊的圆圈。' },
                { who: 'Hernán', sp: 'Eso es. El mate se comparte y se conversa. Sentate con nosotros.', zh: '就是这样。喝马黛茶就要聊天。坐下来和我们一起吧。' },
                { who: 'Wei', sp: 'Gracias. En China también compartimos el té con la familia.', zh: '谢谢。在中国我们也和家人一起喝茶。' },
                { who: 'Camila', sp: 'Entonces tenemos algo en común. ¡Bienvenido a Buenos Aires!', zh: '那我们有共同点啦。欢迎来到布宜诺斯艾利斯！' }
            ],
            quiz: [
                { sp: '¿Querés ___ el mate?', zh: '你想尝尝马黛茶吗？',
                  opts: [{ w: 'probar', e: '尝、试' }, { w: 'comer', e: '吃' }, { w: 'dormir', e: '睡觉' }] },
                { sp: 'Se toma con una calabaza y una ___.', zh: '用小葫芦和一根吸管来喝。',
                  opts: [{ w: 'bombilla', e: '（马黛茶）金属吸管' }, { w: 'ventana', e: '窗户' }, { w: 'bicicleta', e: '自行车' }] },
                { sp: 'El agua no debe ___.', zh: '水不能烧开。',
                  opts: [{ w: 'hervir', e: '煮沸' }, { w: 'cantar', e: '唱歌' }, { w: 'llegar', e: '到达' }] },
                { sp: 'El mismo mate se ___ entre todos.', zh: '同一个马黛壶大家轮流喝。',
                  opts: [{ w: 'comparte', e: '分享' }, { w: 'vende', e: '卖' }, { w: 'pierde', e: '丢' }] },
                { sp: '___ con nosotros. (voseo)', zh: '坐下来和我们一起吧。（阿根廷式说法）',
                  opts: [{ w: 'Sentate', e: '坐下（voseo）' }, { w: 'Sentar', e: '使坐下（原形）' }, { w: 'Sentamos', e: '我们坐下' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 8 · 🎫 Pasajes a Bariloche — DELE A2 · Argentina (v9.31; v9.33: A2/B1→A2)
        //     Terminal de Retiro; números, precios, pesos, viaje
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2b1-bariloche',
            dele: 'A2', track: 'Argentina',
            emoji: '🎫',
            titleEs: 'Pasajes a Bariloche',
            titleZh: '去巴里洛切的车票',
            blurb: 'Mei y Vale compran en la terminal de Retiro los pasajes a Bariloche: colectivo cama, horarios, pesos argentinos y el consejo de llegar con tiempo. Números, precios y viajes en ómnibus por la Patagonia.',
            blurbZh: '梅伊和瓦莱在雷蒂罗长途汽车站买去巴里洛切的车票：卧铺长途车、班次、阿根廷比索，以及“提前到站”的建议。数字、价格和去巴塔哥尼亚的长途汽车旅行。',
            lines: [
                { who: 'Mei', sp: 'Quiero conocer Bariloche en las vacaciones de invierno. ¿Vamos juntas?', zh: '寒假我想去巴里洛切看看。我们一起去吗？' },
                { who: 'Vale', sp: '¡Sí! Vamos a la terminal de Retiro a comprar los pasajes.', zh: '好啊！我们去雷蒂罗汽车站买车票。' },
                { who: 'Empleado', sp: 'Buenas, ¿a dónde viajan?', zh: '您好，你们去哪儿？' },
                { who: 'Mei', sp: 'A Bariloche, por favor. ¿Qué horarios hay?', zh: '去巴里洛切，麻烦了。有哪些班次？' },
                { who: 'Empleado', sp: 'Tenemos un colectivo cama a las ocho de la tarde.', zh: '晚上八点有一班卧铺长途车。' },
                { who: 'Vale', sp: '¿Colectivo cama? ¿Qué es eso?', zh: '卧铺长途车？那是什么？' },
                { who: 'Empleado', sp: 'Los asientos se reclinan como camas. El viaje son veinte horas.', zh: '座椅可以放平当床用。全程二十个小时。' },
                { who: 'Mei', sp: '¿Veinte horas? ¿Y cuánto cuesta el pasaje?', zh: '二十个小时？那车票多少钱？' },
                { who: 'Empleado', sp: 'Cincuenta mil pesos, ida y vuelta, con descuento de estudiante.', zh: '五万比索往返，有学生折扣。' },
                { who: 'Mei', sp: 'Aquí está el pago. ¿De qué andén sale el ómnibus?', zh: '给您钱。长途车从几号站台出发？' },
                { who: 'Empleado', sp: 'Del andén doce, a las ocho en punto. Lleguen con tiempo.', zh: '十二号站台，八点整发车。请提前一点到。' },
                { who: 'Vale', sp: '¡Listo! El sábado arrancamos la aventura en la Patagonia.', zh: '搞定！周六我们的巴塔哥尼亚之旅就出发啦。' }
            ],
            quiz: [
                { sp: 'Compramos los ___ en la terminal.', zh: '我们在汽车站买车票。',
                  opts: [{ w: 'pasajes', e: '车票' }, { w: 'libros', e: '书' }, { w: 'pasteles', e: '糕点' }] },
                { sp: 'El ___ cama es más cómodo para viajar de noche.', zh: '卧铺长途车晚上坐更舒服。',
                  opts: [{ w: 'colectivo', e: '长途车、公交' }, { w: 'mercado', e: '市场' }, { w: 'jugo', e: '果汁' }] },
                { sp: '¿De qué ___ sale el ómnibus?', zh: '长途车从几号站台出发？',
                  opts: [{ w: 'andén', e: '站台' }, { w: 'año', e: '年' }, { w: 'hora', e: '小时' }] },
                { sp: 'Cincuenta mil ___, ida y vuelta.', zh: '五万比索，往返票。',
                  opts: [{ w: 'pesos', e: '比索' }, { w: 'euros', e: '欧元' }, { w: 'minutos', e: '分钟' }] },
                { sp: 'Lleguen con ___ a la terminal.', zh: '请提前一点到汽车站。',
                  opts: [{ w: 'tiempo', e: '提前（字面：带着时间来）' }, { w: 'hambre', e: '饿' }, { w: 'frío', e: '冷' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 9 · 🏜 Una peña en Salta — DELE B1 · Argentina (v9.31)
        //     adulto joven; folklore, pretérito, planes
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b1-pena-salta',
            dele: 'B1', track: 'Argentina',
            emoji: '🏜️',
            titleEs: 'Una peña en Salta',
            titleZh: '萨尔塔的民俗酒馆',
            blurb: 'Huang visita Salta y Diego le presenta una peña folclórica: chacarera, zamba, bombo legüero y empanadas salteñas. Para mañana, el cerro San Bernardo y el teleférico. Folklore y sabores del norte argentino.',
            blurbZh: '黄到萨尔塔旅游，迭戈带她去民俗酒馆：恰卡雷拉舞曲、桑巴舞曲、羊皮大鼓和萨尔塔烤饺。明天的计划：圣贝尔纳多山和缆车。阿根廷北部的民俗与美食。',
            lines: [
                { who: 'Huang', sp: 'Diego, ¿qué se hace a la noche en Salta?', zh: '迭戈，萨尔塔的晚上有什么好玩的？' },
                { who: 'Diego', sp: 'Hoy hay una peña folclórica. Vas a escuchar chacarera y zamba en vivo.', zh: '今晚有一家民俗酒馆有活动。你能现场听到恰卡雷拉和桑巴舞曲。' },
                { who: 'Huang', sp: '¿Qué es una peña, exactamente?', zh: '“peña”到底是什么？' },
                { who: 'Diego', sp: 'Un lugar donde se come, se toma vino y se baila folklore.', zh: '就是一个能吃饭、喝酒、跳民俗舞的地方。' },
                { who: 'Huang', sp: 'Me encanta la idea. ¿La música se parece a la de otros países?', zh: '太合我意了。这种音乐和别的国家的像吗？' },
                { who: 'Diego', sp: 'Tiene bombo legüero y guitarras. Cada provincia tiene su propio ritmo.', zh: '有羊皮大鼓和吉他。每个省都有自己的节奏。' },
                { who: 'Huang', sp: 'Ayer probé las empanadas salteñas. Estaban riquísimas.', zh: '昨天我尝了萨尔塔烤饺，太好吃了。' },
                { who: 'Diego', sp: 'Aquí las hacemos brillantes, con repulgue. Si vas al norte, probá también los tamales.', zh: '我们这儿的烤饺捏了花边，特别漂亮。你要是再往北走，还可以尝尝玉米粽。' },
                { who: 'Huang', sp: '¿Y el cerro San Bernardo? Quiero una vista de toda la ciudad.', zh: '那圣贝尔纳多山呢？我想看全城的景色。' },
                { who: 'Diego', sp: 'Subís en teleférico o a pie. Desde arriba, Salta es preciosa.', zh: '你可以坐缆车或者步行上去。从山顶看，萨尔塔美极了。' },
                { who: 'Huang', sp: 'Entonces mañana subo temprano y a la noche vamos a la peña.', zh: '那我明天一早上山，晚上我们去酒馆。' },
                { who: 'Diego', sp: 'Perfecto. Avísame y te paso a buscar por el hotel.', zh: '好极了。跟我说一声，我去酒店接你。' }
            ],
            quiz: [
                { sp: 'En la ___ se baila folklore y se come bien.', zh: '在民俗酒馆里跳舞、吃美食。',
                  opts: [{ w: 'peña', e: '民俗酒馆' }, { w: 'biblioteca', e: '图书馆' }, { w: 'farmacia', e: '药房' }] },
                { sp: 'Vas a escuchar chacarera y ___ en vivo.', zh: '你能现场听到恰卡雷拉和桑巴舞曲。',
                  opts: [{ w: 'zamba', e: '桑巴舞曲（阿根廷）' }, { w: 'ópera', e: '歌剧' }, { w: 'jazz', e: '爵士乐' }] },
                { sp: 'Ayer ___ las empanadas salteñas.', zh: '昨天我尝了萨尔塔烤饺。',
                  opts: [{ w: 'probé', e: '我尝了（过去时）' }, { w: 'pruebo', e: '我尝（现在时）' }, { w: 'probaré', e: '我将尝（将来时）' }] },
                { sp: 'Subís en ___ o a pie.', zh: '你坐缆车或者步行上去。',
                  opts: [{ w: 'teleférico', e: '缆车' }, { w: 'ascensor', e: '电梯' }, { w: 'barco', e: '船' }] },
                { sp: '___ y te paso a buscar por el hotel.', zh: '跟我说一声，我去酒店接你。',
                  opts: [{ w: 'Avísame', e: '通知我' }, { w: 'Olvídame', e: '忘了我吧' }, { w: 'Mírame', e: '看我' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 10 · 🚂 El tren a las nubes — DELE B1 · Argentina (v9.31)
        //      Salta → San Antonio de los Cobres; altura, andes,
        //      vicuñas, consejos (impersonal se + imperativo)
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b1-tren-nubes',
            dele: 'B1', track: 'Argentina',
            emoji: '🚂',
            titleEs: 'El tren a las nubes',
            titleZh: '云端列车',
            blurb: 'El tren a las nubes sube desde Salta a más de cuatro mil metros: el mal de altura, el mate de coca de los pueblos andinos, las vicuñas de la puna y un pueblo entre montañas. Consejos para viajar en el altiplano.',
            blurbZh: '“云端列车”从萨尔塔攀升到海拔四千米以上：高原反应、安第斯民族的古柯茶、高原上的小羊驼，还有群山之间的小镇。高原旅行的实用建议。',
            lines: [
                { who: 'Rosa', sp: 'Bienvenidos al tren a las nubes. Hoy vamos a estar a más de cuatro mil metros de altura.', zh: '欢迎乘坐云端列车。今天我们要到海拔四千多米的地方。' },
                { who: 'Liu', sp: '¿Cuatro mil? ¿Es seguro para la salud?', zh: '四千米？对健康安全吗？' },
                { who: 'Rosa', sp: 'Tranquilo. El tren sube despacio y por eso el cuerpo se adapta.', zh: '放心。火车慢慢往上爬，所以身体能适应。' },
                { who: 'Marta', sp: 'Mi abuela decía que hay que mascar hojas de coca para el mal de altura.', zh: '我奶奶常说，有高原反应要嚼古柯叶。' },
                { who: 'Rosa', sp: 'Es un consejo tradicional de los pueblos andinos. También se toma mate de coca.', zh: '这是安第斯民族的传统偏方。也可以喝古柯茶。' },
                { who: 'Liu', sp: '¿Y esos animales? Parecen camellos pequeños.', zh: '那些动物是什么？看起来像小骆驼。' },
                { who: 'Rosa', sp: 'Son vicuñas y guanacos, parientes del llama. Viven libres en la puna.', zh: '是小羊驼和原驼，大羊驼的亲戚。它们自由地生活在高原上。' },
                { who: 'Marta', sp: 'Qué silencio... Solo se escucha el viento entre las montañas.', zh: '真安静……只听得见风在群山间穿行的声音。' },
                { who: 'Rosa', sp: 'En San Antonio de los Cobres almorzamos y conocemos el pueblo.', zh: '到圣安东尼奥-德洛斯科布雷斯后，我们吃午饭，逛逛小镇。' },
                { who: 'Liu', sp: '¿Hace mucho frío ahí arriba?', zh: '上面很冷吗？' },
                { who: 'Rosa', sp: 'Sí. Traigan abrigo y gorro: la temperatura baja mucho en la tarde.', zh: '冷。带上厚衣服和帽子：下午温度会降很多。' },
                { who: 'Marta', sp: 'Nunca vi paisajes así. Vale cada hora de viaje.', zh: '我从没见过这样的风景。路上的每一小时都值。' }
            ],
            quiz: [
                { sp: 'Hoy vamos a estar a más de cuatro mil ___ de altura.', zh: '今天我们要到海拔四千多米的地方。',
                  opts: [{ w: 'metros', e: '米' }, { w: 'años', e: '年' }, { w: 'litros', e: '升' }] },
                { sp: 'Hay que ___ hojas de coca para el mal de altura.', zh: '有高原反应要嚼古柯叶。',
                  opts: [{ w: 'mascar', e: '咀嚼' }, { w: 'comprar', e: '买' }, { w: 'romper', e: '撕破' }] },
                { sp: 'Son ___, parientes del llama.', zh: '那是小羊驼，大羊驼的亲戚。',
                  opts: [{ w: 'vicuñas', e: '小羊驼（vicuña）' }, { w: 'gallinas', e: '母鸡' }, { w: 'ovejas', e: '绵羊' }] },
                { sp: '___ abrigo y gorro: hace mucho frío.', zh: '带上厚衣服和帽子：很冷。',
                  opts: [{ w: 'Traigan', e: '带上（你们）' }, { w: 'Tiren', e: '扔掉' }, { w: 'Vendan', e: '卖掉' }] },
                { sp: 'El tren sube despacio y el cuerpo se ___.', zh: '火车慢慢爬升，身体就能适应。',
                  opts: [{ w: 'adapta', e: '适应' }, { w: 'duerme', e: '睡觉' }, { w: 'pierde', e: '迷失' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 11 · 💦 Iguazú y la memoria guaraní — DELE B2 · Argentina (v9.31)
        //      Misiones; subjuntivo de recomendación, el guaraní,
        //      naturaleza y comunidades originarias
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b2-iguazu',
            dele: 'B2', track: 'Argentina',
            emoji: '💦',
            titleEs: 'Iguazú y la memoria guaraní',
            titleZh: '伊瓜苏与瓜拉尼的记忆',
            blurb: 'En el parque nacional Iguazú, el guía Benítez presenta la Garganta del Diablo, la lengua guaraní y las comunidades mbya de Misiones: la yerba mate (ka\'a) nació acá. Subjuntivo para recomendar y describir la selva.',
            blurbZh: '在伊瓜苏国家公园，贝尼特斯导游介绍“魔鬼喉咙”、瓜拉尼语和米西奥内斯的姆比亚原住民社区：马黛茶（ka\'a）就发源于此。用虚拟式表达建议，描写米西奥内斯丛林。',
            lines: [
                { who: 'Benítez', sp: 'Antes de entrar al parque, una recomendación: lleven repelente y agua, porque la selva es intensa.', zh: '进公园之前先提醒一句：带上驱蚊液和水，丛林里可不轻松。' },
                { who: 'Sofía', sp: '¿Es cierto que los saltos son más anchos que las cataratas del Niágara?', zh: '这些瀑布真的比尼亚加拉大瀑布还宽吗？' },
                { who: 'Benítez', sp: 'El sistema del Iguazú tiene doscientos setenta saltos. La Garganta del Diablo cae desde ochenta metros.', zh: '伊瓜苏水系有两百七十个瀑布。“魔鬼喉咙”从八十米高处落下。' },
                { who: 'Tomás', sp: 'Increíble. ¿Y de dónde viene el nombre Iguazú?', zh: '难以置信。“伊瓜苏”这个名字是怎么来的？' },
                { who: 'Benítez', sp: 'Del guaraní: igüá significa agua y guazú, grande. "Agua grande".', zh: '来自瓜拉尼语：igüá 意思是水，guazú 意思是大，就是“大水”。' },
                { who: 'Sofía', sp: '¿Los guaraníes siguen viviendo en la región?', zh: '瓜拉尼人还生活在这个地区吗？' },
                { who: 'Benítez', sp: 'Sí, hay comunidades mbya en Misiones. Ellos enseñaron al mundo la yerba mate: la ka\'a.', zh: '在，米西奥内斯有姆比亚社区。是他们把马黛茶——ka\'a——介绍给了全世界。' },
                { who: 'Tomás', sp: 'O sea que el mate que tomamos en todo el país empieza acá.', zh: '也就是说，我们全国都在喝的马黛茶是从这儿起源的。' },
                { who: 'Benítez', sp: 'Exacto. Y recomiendo que visiten la reserva: es posible que vean tucanes y monos.', zh: '没错。我建议你们去保护区看看：有可能看到巨嘴鸟和猴子。' },
                { who: 'Sofía', sp: '¿Se puede nadar en el río?', zh: '可以在河里游泳吗？' },
                { who: 'Benítez', sp: 'No dentro del parque: las corrientes son peligrosas. Prefiero que disfruten las pasarelas.', zh: '公园里不行：水流很危险。我更希望你们好好走一走栈道。' },
                { who: 'Tomás', sp: 'Hecho. Hoy la selva nos cuenta su historia.', zh: '一言为定。今天让丛林给我们讲讲它的历史。' }
            ],
            quiz: [
                { sp: '___ que lleven repelente y agua.', zh: '我建议你们带上驱蚊液和水。',
                  opts: [{ w: 'Recomiendo', e: '我建议' }, { w: 'Niego', e: '我否认' }, { w: 'Olvido', e: '我忘记' }] },
                { sp: 'La Garganta del Diablo ___ ochenta metros de caída.', zh: '“魔鬼喉咙”落差八十米。',
                  opts: [{ w: 'mide', e: '高（量度）为' }, { w: 'pesa', e: '重' }, { w: 'cuesta', e: '花费' }] },
                { sp: '"Iguazú" significa "agua ___" en guaraní.', zh: '在瓜拉尼语里“伊瓜苏”意思是“大水”。',
                  opts: [{ w: 'grande', e: '大' }, { w: 'chico', e: '小' }, { w: 'frío', e: '冷' }] },
                { sp: 'Es posible que ___ tucanes y monos.', zh: '有可能看到巨嘴鸟和猴子。',
                  opts: [{ w: 'vean', e: '看到（虚拟式）' }, { w: 'ven', e: '看到（陈述式）' }, { w: 'vieron', e: '看到了（过去时）' }] },
                { sp: 'Ellos enseñaron al mundo la yerba mate: la ___.', zh: '是他们把马黛茶——ka\'a——教给了世界。',
                  opts: [{ w: "ka'a", e: '瓜拉尼语“马黛茶”' }, { w: 'pizza', e: '披萨' }, { w: 'quinoa', e: '藜麦' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 12 · 🍷 Vendimia en Mendoza — DELE B2 · Argentina (v9.31)
        //      adultos; cosecha, vino, fiesta; porcentajes,
        //      conectores, futuro
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b2-vendimia',
            dele: 'B2', track: 'Argentina',
            emoji: '🍷',
            titleEs: 'Vendimia en Mendoza',
            titleZh: '门多萨的葡萄收获节',
            blurb: 'Nadia llega a Mendoza en marzo: cosecha de uva, pisada tradicional en la bodega, Malbec y la Fiesta de la Vendimia con su reina. Conectores, porcentajes y la cultura del vino al pie de los Andes.',
            blurbZh: '娜迪亚三月来到门多萨：葡萄采收、酒庄里的传统踩葡萄、马尔贝克葡萄酒，以及选出“葡萄女王”的葡萄收获节。连接词、百分比和安第斯山脚下的葡萄酒文化。',
            lines: [
                { who: 'Carlos', sp: 'Si venís en marzo, agarrás la Vendimia: la cosecha de la uva y la fiesta más grande de Mendoza.', zh: '你要是三月份来，就赶上收获节了：葡萄采收，还有门多萨最盛大的节日。' },
                { who: 'Nadia', sp: 'Me lo confirmaron en el hostal. ¿Los visitantes pueden participar?', zh: '青旅的人跟我说过了。游客可以参加吗？' },
                { who: 'Carlos', sp: 'Claro. Hay quien corta uvas un día en las fincas y después todos vamos al acto central.', zh: '当然。有人会在庄园里采摘一天葡萄，然后大家一起去看主会场庆典。' },
                { who: 'Nadia', sp: '¿Y qué se hace en la bodega durante la cosecha?', zh: '收获季酒庄里都做什么？' },
                { who: 'Carlos', sp: 'Pisamos la uva como antes, cantamos y después probamos el vino nuevo.', zh: '我们像从前一样踩葡萄、唱歌，然后品尝新酒。' },
                { who: 'Nadia', sp: '¿El Malbec se da bien por acá?', zh: '马尔贝克在这里长得好吗？' },
                { who: 'Carlos', sp: 'Mendoza produce el setenta por ciento del vino argentino. El clima seco y la altura hacen su magia.', zh: '门多萨出产阿根廷百分之七十的葡萄酒。干燥的气候和海拔自有它的魔力。' },
                { who: 'Nadia', sp: 'Leí que la Fiesta de la Vendimia elige a una reina cada año.', zh: '我看到资料说，收获节每年会选出一位“葡萄女王”。' },
                { who: 'Carlos', sp: 'Sí, cada departamento presenta a su candidata. Es tradición desde hace casi cien años.', zh: '对，每个县都推出自己的候选人。这个传统快一百年了。' },
                { who: 'Nadia', sp: 'Además del vino, ¿qué no me puedo perder?', zh: '除了酒，还有什么我不能错过的？' },
                { who: 'Carlos', sp: 'Un asado con vista a los Andes. Y si te gustan las aguas calientes, las termas de Cacheuta.', zh: '对着安第斯山吃一顿烤肉。要是喜欢泡温泉，就去卡舒埃塔温泉。' },
                { who: 'Nadia', sp: 'Ya tengo el viaje armado: uvas, montañas y un buen Malbec.', zh: '这趟旅行安排齐了：葡萄、群山，再来一杯好喝的马尔贝克。' }
            ],
            quiz: [
                { sp: 'Si ___ en marzo, agarrás la Vendimia.', zh: '你要是三月份来，就赶上收获节。',
                  opts: [{ w: 'venís', e: '你来（voseo）' }, { w: 'vas', e: '你去' }, { w: 'sales', e: '你出发' }] },
                { sp: 'Mendoza produce el ___ por ciento del vino argentino.', zh: '门多萨出产阿根廷百分之七十的葡萄酒。',
                  opts: [{ w: 'setenta', e: '七十' }, { w: 'dos', e: '二' }, { w: 'mil', e: '千' }] },
                { sp: 'Cada departamento presenta a su ___.', zh: '每个县都推出自己的候选人。',
                  opts: [{ w: 'candidata', e: '候选人（女）' }, { w: 'maestra', e: '女教师' }, { w: 'vecina', e: '女邻居' }] },
                { sp: 'Además del vino, ¿qué no me puedo ___?', zh: '除了酒，还有什么我不能错过的？',
                  opts: [{ w: 'perder', e: '错过' }, { w: 'comer', e: '吃' }, { w: 'beber', e: '喝' }] },
                { sp: 'La ___ de la uva se celebra en marzo.', zh: '葡萄的收获在三月庆祝。',
                  opts: [{ w: 'cosecha', e: '收获' }, { w: 'siembra', e: '播种' }, { w: 'lluvia', e: '下雨' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 13 · 🧊 El glaciar Perito Moreno — DELE B2 · Argentina (v9.31)
        //      Patagonia austral; condicionales, descripciones,
        //      clima y paisaje
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b2-glaciar',
            dele: 'B2', track: 'Argentina',
            emoji: '🧊',
            titleEs: 'El glaciar Perito Moreno',
            titleZh: '莫雷诺大冰川',
            blurb: 'En el parque nacional Los Glaciares, Fernanda explica el desprendimiento del Perito Moreno, el azul del hielo antiguo y el clima patagónico. Condicionales, descripciones y el paisaje del sur profundo.',
            blurbZh: '在冰川国家公园，费尔南达讲解莫雷诺冰川的冰崩、古老冰体的蓝色和巴塔哥尼亚多变的天气。条件句、描写和南方尽头的壮美风景。',
            lines: [
                { who: 'Fernanda', sp: 'Bienvenidos a las pasarelas. Si escuchan un trueno, es el hielo rompiéndose: no se asusten.', zh: '欢迎来到观景栈道。要是听到雷声，那是冰在断裂：别害怕。' },
                { who: 'Gómez', sp: 'El frente del glaciar, ¿cuántos metros tiene de alto?', zh: '冰川的冰壁有多高？' },
                { who: 'Fernanda', sp: 'Sesenta metros sobre el lago, y se extiende treinta kilómetros por la cordillera.', zh: '湖面以上六十米，沿着安第斯山绵延三十公里。' },
                { who: 'Gómez', sp: '¿Y por qué es tan famoso este glaciar?', zh: '那这座冰川为什么这么有名？' },
                { who: 'Fernanda', sp: 'Porque avanza y corta el lago. Cada tantos años el agua rompe el hielo: es el desprendimiento.', zh: '因为它会不断推进、拦住湖水。每隔几年，湖水冲破冰墙：那就是冰崩。' },
                { who: 'Gómez', sp: 'La última vez que hubo desprendimiento, miles de personas viajaron para verlo.', zh: '上次冰崩的时候，成千上万的人专门赶来看。' },
                { who: 'Fernanda', sp: 'Exacto. Es uno de los pocos glaciares del mundo que no retrocede.', zh: '是的。它是世界上少数没有退缩的冰川之一。' },
                { who: 'Gómez', sp: '¿Y por qué el hielo tiene ese color azul?', zh: '那冰为什么是那种蓝色？' },
                { who: 'Fernanda', sp: 'El hielo antiguo absorbe los otros colores y devuelve el azul. Por eso lo vemos así.', zh: '古老的冰吸收其他颜色，只把蓝色反射出来。所以我们看到的就是蓝色。' },
                { who: 'Gómez', sp: 'Hace viento y sol al mismo tiempo. El clima patagónico es impredecible.', zh: '又是风又是太阳。巴塔哥尼亚的天气真是说不准。' },
                { who: 'Fernanda', sp: 'Por eso recomiendo ir por capas: remera, abrigo y una campera impermeable.', zh: '所以我建议分层穿衣：打底衫、保暖层，再来一件防水外套。' },
                { who: 'Gómez', sp: 'La naturaleza acá te recuerda que sos chico. Y es hermoso sentirlo.', zh: '这里的自然让你想起自己的渺小。这种感觉还挺美好的。' }
            ],
            quiz: [
                { sp: 'Si ___ un trueno, es el hielo rompiéndose.', zh: '要是听到雷声，那是冰在断裂。',
                  opts: [{ w: 'escuchan', e: '他们听到' }, { w: 'comen', e: '他们吃' }, { w: 'compran', e: '他们买' }] },
                { sp: 'El frente ___ sesenta metros sobre el lago.', zh: '冰壁在湖面以上六十米。',
                  opts: [{ w: 'mide', e: '高（量度）为' }, { w: 'paga', e: '支付' }, { w: 'lee', e: '读' }] },
                { sp: 'Es uno de los pocos glaciares que no ___.', zh: '它是少数没有退缩的冰川之一。',
                  opts: [{ w: 'retrocede', e: '退缩' }, { w: 'avanza', e: '推进' }, { w: 'existe', e: '存在' }] },
                { sp: 'Recomiendo ir por ___ de ropa.', zh: '我建议分层穿衣。',
                  opts: [{ w: 'capas', e: '层（分层穿）' }, { w: 'cajas', e: '箱子' }, { w: 'sillas', e: '椅子' }] },
                { sp: 'El hielo antiguo ___ el azul.', zh: '古老的冰把蓝色反射出来。',
                  opts: [{ w: 'devuelve', e: '反射出、还给' }, { w: 'desayuna', e: '吃早餐' }, { w: 'enseña', e: '教' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 14 · 🧶 El telar de la abuela mapuche — DELE C1 (v9.31)
        //      Neuquén; subjuntivo pasado, condicional, identidad
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-c1-telar-mapuche',
            dele: 'C1', track: 'Argentina',
            emoji: '🧶',
            titleEs: 'El telar de la abuela mapuche',
            titleZh: '马普切外婆的织机',
            blurb: 'En una comunidad mapuche del sur, la artesana Rosa Ancalao explica su telar: los ñimin, la lana hilada a mano, el mapudungun y la memoria familiar. Subjuntivo pasado, condicional y una charla sobre identidad.',
            blurbZh: '在南方的马普切社区，织工罗莎·安卡拉奥讲解她的织机：ñimin 图案、手工纺线、马普切语（马普敦贡语）和家族记忆。过去虚拟式、条件式，以及一场关于身份认同的谈话。',
            lines: [
                { who: 'Valentina', sp: 'Doña Rosa, ¿me permite preguntarle cómo aprendió a tejer?', zh: '罗莎大妈，能问问您是怎么学会织布的吗？' },
                { who: 'Rosa', sp: 'No me lo enseñó nadie en un colegio: aprendí mirando a mi ñuke, mi madre. El telar es memoria.', zh: '不是在学校学的：我是看着我 ñuke——我妈妈——织布学会的。织机就是记忆。' },
                { who: 'Valentina', sp: 'Los dibujos tienen significado, ¿verdad?', zh: '这些图案都有含义，对吗？' },
                { who: 'Rosa', sp: 'Cada ñimin cuenta algo: la lluvia, la montaña, la familia. Si yo me callara, el hilo no hablaría.', zh: '每一个 ñimin 都在讲述：雨、山、家人。我要是不说了，线就不会说话了。' },
                { who: 'Valentina', sp: '¿Y la lana? Supongo que la preparan ustedes desde el principio.', zh: '那毛线呢？我猜从头到尾都是你们自己准备的。' },
                { who: 'Rosa', sp: 'Oveja por medio, hilo por medio. Lavamos, hilamos y teñimos con plantas de aquí. Nada de fábrica.', zh: '一只羊一只羊地来，一根线一根线地纺。洗、纺、再用本地植物染色。工厂的东西一点都不用。' },
                { who: 'Valentina', sp: 'He leído que la palabra mapuche significa "gente de la tierra".', zh: '我读到过，mapuche 这个词的意思是“大地的人们”。' },
                { who: 'Rosa', sp: 'Mapu es tierra, che es gente. Si la tierra está bien, nosotros estamos bien. Es una misma cosa.', zh: 'Mapu 是大地，che 是人。大地好，我们才好。这是一回事。' },
                { who: 'Valentina', sp: '¿Los jóvenes de la comunidad siguen hablando mapudungun?', zh: '社区里的年轻人还说马普切语吗？' },
                { who: 'Rosa', sp: 'Algunos lo hablan y otros lo están recuperando. Una lengua que se calla se apaga; una que se habla, vive.', zh: '有些人说，有些人正在重新学。一门语言没人说了就会熄灭；有人说了，它就活着。' },
                { who: 'Valentina', sp: '¿Y qué espera usted para las próximas generaciones?', zh: '那您对下一代有什么期望？' },
                { who: 'Rosa', sp: 'Que nadie tenga vergüenza de su apellido. Tejer es eso también: no olvidarse de quién uno es.', zh: '希望没有人再为自己的姓氏感到羞耻。织布也是这个意思：别忘了自己是谁。' }
            ],
            quiz: [
                { sp: 'Aprendí mirando a mi ___, mi madre.', zh: '我是看着我的 ñuke，也就是我妈妈，学会的。',
                  opts: [{ w: 'ñuke', e: '马普切语“妈妈”' }, { w: 'vecina', e: '邻居' }, { w: 'profesora', e: '老师' }] },
                { sp: 'Si yo me ___, el hilo no hablaría.', zh: '我要是不说了，线就不会说话。',
                  opts: [{ w: 'callara', e: '沉默（过去虚拟式）' }, { w: 'calla', e: '沉默（现在时）' }, { w: 'calló', e: '沉默了（过去时）' }] },
                { sp: '___ con plantas de aquí, nada de fábrica.', zh: '用这里的植物染色，不用工厂的东西。',
                  opts: [{ w: 'Teñimos', e: '我们染色' }, { w: 'Comemos', e: '我们吃' }, { w: 'Rompemos', e: '我们打破' }] },
                { sp: 'Una lengua que se ___ se apaga.', zh: '一门没人说的语言会熄灭。',
                  opts: [{ w: 'calla', e: '不被说出口' }, { w: 'lava', e: '洗' }, { w: 'vende', e: '卖' }] },
                { sp: 'Que nadie tenga ___ de su apellido.', zh: '希望没有人再为自己的姓氏感到羞耻。',
                  opts: [{ w: 'vergüenza', e: '羞耻' }, { w: 'hambre', e: '饿' }, { w: 'suerte', e: '运气' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 15 · 🌽 La Pachamama en Tilcara — DELE C1 (v9.31)
        //      Jujuy, Quebrada de Humahuaca; voz pasiva con se,
        //      discurso indirecto, espiritualidad andina
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-c1-pachamama',
            dele: 'C1', track: 'Argentina',
            emoji: '🌽',
            titleEs: 'La Pachamama en Tilcara',
            titleZh: '蒂尔卡拉的大地母亲节',
            blurb: 'Agosto en Tilcara, Jujuy: la ceremonia de la Pachamama, la poza con sus ofrendas, la challa antes de beber y la paciencia de la Quebrada de Humahuaca. Voz pasiva con se, discurso indirecto y espiritualidad andina.',
            blurbZh: '八月，胡胡伊省蒂尔卡拉：帕查玛玛（大地母亲）仪式、埋供品的土坑、喝酒前的 challa 洒酒礼，以及乌马瓦卡峡谷教人的耐心。无人称被动句、间接引语和安第斯的灵性文化。',
            lines: [
                { who: 'Javier', sp: 'Doña Elvira, en agosto veo pozos en la tierra y gente brindando en la calle... ¿qué se celebra?', zh: '埃尔维拉大妈，八月里我看到地上挖了坑，人们还在街上举杯敬酒……这是在庆祝什么？' },
                { who: 'Elvira', sp: 'La Pachamama, la Madre Tierra. Todo agosto la esperamos con comida, vino y hojas de coca.', zh: '是帕查玛玛，大地母亲。整个八月我们用食物、酒和古柯叶迎接她。' },
                { who: 'Javier', sp: '¿Puedo participar en la ceremonia o es solo para la familia?', zh: '我可以参加仪式吗，还是只限家里人？' },
                { who: 'Elvira', sp: 'Acá todos son bienvenidos si llegan con respeto. Primero se cava la poza, el hoyo en la tierra.', zh: '只要心怀敬意，这里欢迎所有人。先挖好土坑，就是地上的那个坑。' },
                { who: 'Javier', sp: '¿Y qué se entierra en la poza?', zh: '那坑里埋什么？' },
                { who: 'Elvira', sp: 'Ofrendas: coca, chicha, hojas de maíz, todo lo que la tierra nos da. Después se tapa con flores.', zh: '供品：古柯叶、奇恰酒、玉米叶，都是大地给我们的东西。然后用花盖上。' },
                { who: 'Javier', sp: 'He oído hablar de la challa. ¿Es lo mismo?', zh: '我听说过 challa。是同一回事吗？' },
                { who: 'Elvira', sp: 'La challa es el brindis: se echan unas gotas a la tierra antes de tomar. Pachamama toma primero.', zh: 'challa 是敬酒：喝之前先往地上洒几滴。帕查玛玛先喝。' },
                { who: 'Javier', sp: 'Qué forma tan hermosa de agradecer. En mi ciudad casi nadie piensa en la tierra que pisa.', zh: '这是多美的感恩方式啊。在我的城市，几乎没人想过脚下踩着的土地。' },
                { who: 'Elvira', sp: 'Por eso venís: la Quebrada enseña paciencia. Aquí el maíz crece a su tiempo, no al tiempo de nosotros.', zh: '所以你来了：峡谷教会人耐心。这里的玉米按自己的时节生长，不按我们的时间表。' },
                { who: 'Javier', sp: '¿Los jóvenes siguen la tradición o se está perdiendo?', zh: '年轻人还延续这个传统吗，还是正在丢失？' },
                { who: 'Elvira', sp: 'Los que se van, vuelven en agosto. La Pachamama sabe esperar, como toda madre.', zh: '走出去的人，八月都会回来。帕查玛玛懂得等待，就像所有的母亲一样。' }
            ],
            quiz: [
                { sp: 'La Pachamama es la ___ Tierra.', zh: '帕查玛玛就是大地母亲。',
                  opts: [{ w: 'Madre', e: '母亲' }, { w: 'Nueva', e: '新的' }, { w: 'Lejana', e: '遥远的' }] },
                { sp: 'Primero se ___ la poza, el hoyo en la tierra.', zh: '先挖好土坑。',
                  opts: [{ w: 'cava', e: '挖' }, { w: 'compra', e: '买' }, { w: 'pinta', e: '画' }] },
                { sp: 'Se echan unas gotas a la tierra antes de ___.', zh: '喝之前先往地上洒几滴。',
                  opts: [{ w: 'tomar', e: '喝' }, { w: 'dormir', e: '睡觉' }, { w: 'salir', e: '出门' }] },
                { sp: 'Todo lo que la tierra ___ da.', zh: '都是大地给我们的东西。',
                  opts: [{ w: 'nos', e: '给我们' }, { w: 'te', e: '给你' }, { w: 'los', e: '把它们' }] },
                { sp: 'El maíz crece a su tiempo, no al tiempo de ___.', zh: '玉米按自己的时节生长，不按我们的时间表。',
                  opts: [{ w: 'nosotros', e: '我们' }, { w: 'yo', e: '我' }, { w: 'ellos', e: '他们' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 16 · 📻 Debate: ¿turismo para quién? — DELE C2 (v9.31)
        //      radio provincial, adultos; conectores discursivos,
        //      condicional compuesto, argumentación
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-c2-radio-turismo',
            dele: 'C2', track: 'Argentina',
            emoji: '📻',
            titleEs: 'Debate: ¿turismo para quién?',
            titleZh: '辩论：旅游业为了谁？',
            blurb: 'En una radio provincial, una empresaria turística y un antropólogo debaten: empleo frente a territorio, miradores y comunidades originarias, postales y personas. Conectores discursivos, condicional compuesto y argumentación de nivel C2.',
            blurbZh: '在省级广播电台，旅游企业主与人类学家展开辩论：就业与领地、观景台与原住民社区、风景明信片与真实的人。话语连接词、复合条件式和 C2 级议论文体。',
            lines: [
                { who: 'Mabel', sp: 'Buenas noches. Hoy: el turismo en el norte argentino, ¿oportunidad compartida o negocio de pocos? Los acompaño, Mabel Ríos.', zh: '晚上好。今天的话题：阿根廷北部的旅游业，是大家共享的机会，还是少数人的生意？我是梅布尔·里奥斯，陪伴各位。' },
                { who: 'Ibarra', sp: 'Sin hoteles no hay empleo. El año pasado recibimos cuarenta mil visitantes y el pueblo vivió de eso todo el invierno.', zh: '没有酒店就没有就业。去年我们接待了四万名游客，整个冬天镇上都靠这个过日子。' },
                { who: 'Quipildor', sp: 'Nadie discute los empleos, señora. Lo que cuestiono es quién decide: las comunidades originarias llevan décadas esperando ser consultadas.', zh: '没有人否认就业，女士。我质疑的是由谁来做决定：原住民社区等别人来征求意见已经等了几十年。' },
                { who: 'Ibarra', sp: 'Pero si las comunidades ya ofrecen sus servicios: guías, hospedajes, artesanías...', zh: '可社区现在已经在提供他们的服务了：导游、住宿、手工艺品……' },
                { who: 'Quipildor', sp: 'Ofrecen lo que pueden, no lo que quieren. No obstante, cuando un lugar se vuelve postal, su gente termina trabajando para la foto.', zh: '他们提供的是他们能提供的，而不是他们想提供的。然而，当一个地方变成明信片，住在那里的人最后就成了给照片打工的。' },
                { who: 'Mabel', sp: '¿Podríamos poner números sobre la mesa?', zh: '我们能不能摆一摆数字？' },
                { who: 'Quipildor', sp: 'Con gusto: si se hubiera consultado a las comunidades antes de construir el mirador, otro sería hoy el debate.', zh: '很乐意：要是当年建观景台之前征求过社区的意见，今天的辩论就不是这个样子了。' },
                { who: 'Ibarra', sp: 'Aun así, el mirador trae visitantes, y los visitantes traen clientes a los talleres.', zh: '即便如此，观景台带来了游客，游客给工坊带来了客人。' },
                { who: 'Quipildor', sp: 'Traen también agua embotellada y basura a un territorio frágil. No en vano los ancianos hablan de "visitar" la montaña, nunca de "conquistarla".', zh: '可他们也给脆弱的土地带来了瓶装水和垃圾。难怪长者们说的是“拜访”大山，从来不说“征服”大山。' },
                { who: 'Mabel', sp: 'Señora Ibarra, ¿cómo responde?', zh: '伊巴拉女士，您怎么回应？' },
                { who: 'Ibarra', sp: 'Reconozco que nos falta diálogo. Habría propuesto mesas de gestión si hubiera tenido interlocutores claros; desde ya, acepto coordinarlas.', zh: '我承认我们缺少对话。要是一开始就有明确的对话方，我早就提议建立共管协商桌了；从现在起，我愿意来协调。' },
                { who: 'Quipildor', sp: 'Es un comienzo. En definitiva, la pregunta no es cuántos turistas podemos recibir, sino quiénes escribimos la historia del lugar.', zh: '这是个开始。归根结底，问题不在于我们能接待多少游客，而在于由谁来书写这个地方的历史。' }
            ],
            quiz: [
                { sp: 'Lo que cuestiono es ___ decide.', zh: '我质疑的是由谁来做决定。',
                  opts: [{ w: 'quién', e: '谁' }, { w: 'qué hora', e: '几点' }, { w: 'cuánto cuesta', e: '多少钱' }] },
                { sp: '___, cuando un lugar se vuelve postal, su gente trabaja para la foto.', zh: '然而，当一个地方变成明信片，那里的人就成了给照片打工的。',
                  opts: [{ w: 'No obstante', e: '然而' }, { w: 'Por supuesto', e: '当然' }, { w: 'A menudo', e: '经常' }] },
                { sp: 'Si se ___ a las comunidades antes, otro sería el debate.', zh: '要是当年征求过社区的意见，今天的辩论就不是这个样子。',
                  opts: [{ w: 'hubiera consultado', e: '征求意见（过去虚拟式）' }, { w: 'consulta', e: '征求意见（现在时）' }, { w: 'consultará', e: '将征求意见（将来时）' }] },
                { sp: 'Reconozco que ___ falta diálogo.', zh: '我承认我们缺少对话。',
                  opts: [{ w: 'nos', e: '我们' }, { w: 'le', e: '他/她' }, { w: 'os', e: '你们（西班牙用法）' }] },
                { sp: 'La pregunta no es cuántos recibimos, ___ quiénes escribimos la historia.', zh: '问题不在于我们接待多少，而在于由谁来书写历史。',
                  opts: [{ w: 'sino', e: '而是' }, { w: 'si no', e: '否则' }, { w: 'pero', e: '但是' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 17 · ☕ Café con medialunas — DELE A1 · Argentina (v9.33)
        //      desayuno porteño; pedir, precios, cortesía básica
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a1-cafe',
            dele: 'A1', track: 'Argentina',
            emoji: '☕',
            titleEs: 'Café con medialunas',
            titleZh: '咖啡配牛角面包',
            blurb: 'Wei desayuna por primera vez en un café porteño con Camila: café con leche, medialunas y el mozo que apunta el pedido. Pedir en voz alta, preguntar el precio y dar las gracias como en Buenos Aires.',
            blurbZh: '魏第一次和卡米拉在布宜诺斯艾利斯的咖啡馆吃早餐：牛奶咖啡、牛角面包，还有记单的服务员。大声点单、问价格，像本地人一样道谢。',
            lines: [
                { who: 'Camila', sp: 'Wei, hoy te invito a desayunar como un porteño.', zh: '魏，今天我请你像布宜诺斯艾利斯人一样吃早餐。' },
                { who: 'Wei', sp: '¿Qué desayunan los porteños?', zh: '布宜诺斯艾利斯人早餐吃什么？' },
                { who: 'Camila', sp: 'Café con leche y medialunas. Aquí llegamos.', zh: '牛奶咖啡和牛角面包。我们到了。' },
                { who: 'Mozo', sp: 'Buenos días. ¿Qué van a tomar?', zh: '早上好。你们想喝点什么？' },
                { who: 'Camila', sp: 'Dos cafés con leche y cuatro medialunas, por favor.', zh: '请给我们两杯牛奶咖啡和四个牛角面包。' },
                { who: 'Mozo', sp: '¿Algo más? También hay tostadas.', zh: '还要别的吗？我们也有吐司。' },
                { who: 'Wei', sp: 'No, gracias. Por ahora esto está bien.', zh: '不用了，谢谢。这些就够了。' },
                { who: 'Mozo', sp: 'Marchando. Ya vuelvo.', zh: '马上就来。我很快回来。' },
                { who: 'Wei', sp: '¡Qué rico! ¿Y cuánto cuesta el desayuno?', zh: '太好吃了！这顿早餐多少钱？' },
                { who: 'Camila', sp: 'Barato: cinco mil pesos por los dos. Aquí se desayuna todos los días.', zh: '很便宜：我们俩一共五千比索。这里可以天天来吃早餐。' }
            ],
            quiz: [
                { sp: 'Dos cafés con leche y cuatro ___, por favor.', zh: '请给我们两杯牛奶咖啡和四个牛角面包。',
                  opts: [{ w: 'medialunas', e: '牛角面包（阿根廷）' }, { w: 'manzanas', e: '苹果' }, { w: 'sillas', e: '椅子' }] },
                { sp: 'Buenos días. ¿Qué van a ___?', zh: '早上好。你们想喝点什么？',
                  opts: [{ w: 'tomar', e: '点、喝' }, { w: 'cantar', e: '唱歌' }, { w: 'comprar', e: '买' }] },
                { sp: '___, gracias. Eso es todo.', zh: '不用了，谢谢。就这些。',
                  opts: [{ w: 'No', e: '不用' }, { w: 'Sí', e: '是的' }, { w: 'Hoy', e: '今天' }] },
                { sp: '¿Y ___ cuesta el desayuno?', zh: '这顿早餐多少钱？',
                  opts: [{ w: 'cuánto', e: '多少（钱）' }, { w: 'quién', e: '谁' }, { w: 'cómo', e: '怎样' }] },
                { sp: 'Barato: cinco mil pesos por los ___.', zh: '很便宜：两个人一共五千比索。',
                  opts: [{ w: 'dos', e: '二、两' }, { w: 'tres', e: '三' }, { w: 'diez', e: '十' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 18 · 🚏 El colectivo a Palermo — DELE A1 · Argentina (v9.33)
        //      transporte básico: parada, SUBE, preguntar el camino
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a1-colectivo',
            dele: 'A1', track: 'Argentina',
            emoji: '🚏',
            titleEs: 'El colectivo a Palermo',
            titleZh: '去巴勒莫的公交车',
            blurb: 'Wei quiere conocer Palermo y Camila le enseña lo básico de Buenos Aires: el colectivo, la parada de la esquina y la tarjeta SUBE. Preguntar dónde está, cuántas paradas hay y cómo pagar el viaje.',
            blurbZh: '魏想去巴勒莫逛逛，卡米拉教他布宜诺斯艾利斯的出行基础：公交车、街角的站台和 SUBE 交通卡。问在哪里、坐几站、怎么付车费。',
            lines: [
                { who: 'Wei', sp: 'Camila, quiero conocer Palermo. ¿Está lejos?', zh: '卡米拉，我想去巴勒莫看看。远吗？' },
                { who: 'Camila', sp: 'Un poco. Pero es fácil: puedes tomar el colectivo 152.', zh: '有一点远。不过很简单：你可以坐 152 路公交车。' },
                { who: 'Wei', sp: '¿Colectivo? ¿Qué es un colectivo?', zh: 'colectivo？那是什么？' },
                { who: 'Camila', sp: 'El autobús. Aquí al autobús le decimos colectivo.', zh: '就是公交车。在这儿我们管公交车叫 colectivo。' },
                { who: 'Wei', sp: 'Perfecto. ¿Dónde está la parada?', zh: '太好了。车站在哪里？' },
                { who: 'Camila', sp: 'Muy cerca: en la esquina, al lado del kiosco.', zh: '很近：就在街角，小卖部旁边。' },
                { who: 'Wei', sp: '¿Y cómo pago el viaje?', zh: '那坐车怎么付钱？' },
                { who: 'Camila', sp: 'Con la tarjeta SUBE. Se carga en el kiosco de la esquina.', zh: '用 SUBE 卡。在街角的小卖部充值。' },
                { who: 'Wei', sp: '¿Cuántas paradas son hasta Palermo?', zh: '到巴勒莫有多少站？' },
                { who: 'Camila', sp: 'Como doce. Te aviso cuando bajemos. ¡Vamos!', zh: '大概十二站。我们下车的时候我提醒你。走吧！' }
            ],
            quiz: [
                { sp: 'Puedes tomar el ___ 152.', zh: '你可以坐 152 路公交车。',
                  opts: [{ w: 'colectivo', e: '公交车（阿根廷说法）' }, { w: 'avión', e: '飞机' }, { w: 'bote', e: '小船' }] },
                { sp: 'Aquí al autobús le decimos ___.', zh: '在这儿我们管公交车叫 colectivo。',
                  opts: [{ w: 'colectivo', e: 'colectivo（公交车）' }, { w: 'lápiz', e: '铅笔' }, { w: 'ventana', e: '窗户' }] },
                { sp: '¿Dónde está la ___?', zh: '车站在哪里？',
                  opts: [{ w: 'parada', e: '车站' }, { w: 'puerta', e: '门' }, { w: 'carne', e: '肉' }] },
                { sp: 'Pago el viaje con la tarjeta ___.', zh: '我用 SUBE 卡付车费。',
                  opts: [{ w: 'SUBE', e: 'SUBE 卡（布市交通卡）' }, { w: 'verde', e: '绿色的' }, { w: 'libros', e: '书' }] },
                { sp: '¿Cuántas ___ son hasta Palermo?', zh: '到巴勒莫有多少站？',
                  opts: [{ w: 'paradas', e: '（公交）站' }, { w: 'semanas', e: '星期' }, { w: 'puertas', e: '门' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 19 · 🍅 La feria del barrio — DELE A2 · Argentina (v9.33)
        //      compras al aire libre; kilo, precios, frutillas
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2-feria',
            dele: 'A2', track: 'Argentina',
            emoji: '🍅',
            titleEs: 'La feria del barrio',
            titleZh: '社区集市',
            blurb: 'Vale descubre con Mei la feria del sábado: verduras frescas, precios por kilo y la vendedora que regala el perejil. Comprar al aire libre, preguntar cuánto sale y agradecer como los vecinos.',
            blurbZh: '瓦莱和梅伊一起逛周六的社区集市：新鲜蔬菜、按公斤计价，还有送欧芹的女摊主。在露天市场买东西、问价，像邻居们一样道谢。',
            lines: [
                { who: 'Mei', sp: 'Vale, los sábados hay una feria en la plaza. ¿Vamos?', zh: '瓦莱，周六广场上有集市。我们去吗？' },
                { who: 'Vale', sp: '¿Feria? ¿Es como un supermercado?', zh: '集市？跟超市一样吗？' },
                { who: 'Mei', sp: 'Al aire libre y más barato. Los vecinos venden lo que cultivan.', zh: '在露天，而且更便宜。邻居们卖自己种的东西。' },
                { who: 'Verdulera', sp: 'Buenos días. Los tomates están re frescos hoy.', zh: '早上好。今天的西红柿特别新鲜。' },
                { who: 'Mei', sp: 'Un kilo de tomates y medio de frutillas, por favor.', zh: '麻烦来一公斤西红柿和半公斤草莓。' },
                { who: 'Vale', sp: '¿Cuánto sale el kilo de tomates?', zh: '西红柿一公斤多少钱？' },
                { who: 'Verdulera', sp: 'Tres mil pesos. ¿Algo más? Le regalo un poco de perejil.', zh: '三千比索。还要别的吗？送您一点欧芹。' },
                { who: 'Mei', sp: 'Sí, también seis huevos y una lechuga.', zh: '好，再来六个鸡蛋和一棵生菜。' },
                { who: 'Verdulera', sp: 'Son seis mil quinientos. Acá tiene la bolsita.', zh: '一共六千五百。袋子在这儿。' },
                { who: 'Vale', sp: '¡Qué barato! Acá la comida cuesta la mitad que en el súper.', zh: '真便宜！这里的菜比超市便宜一半。' }
            ],
            quiz: [
                { sp: 'Los sábados hay una ___ en la plaza.', zh: '周六广场上有集市。',
                  opts: [{ w: 'feria', e: '集市' }, { w: 'escuela', e: '学校' }, { w: 'flor', e: '花' }] },
                { sp: 'Un kilo de tomates y ___ de frutillas.', zh: '一公斤西红柿和半公斤草莓。',
                  opts: [{ w: 'medio', e: '一半' }, { w: 'doble', e: '两倍' }, { w: 'resto', e: '剩余部分' }] },
                { sp: '¿Cuánto ___ el kilo de tomates?', zh: '西红柿一公斤多少钱？',
                  opts: [{ w: 'sale', e: '卖（价格，¿cuánto sale?）' }, { w: 'entra', e: '进入' }, { w: 'baja', e: '下降' }] },
                { sp: 'Le regalo un poco de ___.', zh: '送您一点欧芹。',
                  opts: [{ w: 'perejil', e: '欧芹' }, { w: 'azúcar', e: '糖' }, { w: 'vino', e: '酒' }] },
                { sp: 'Acá la comida cuesta la ___ que en el súper.', zh: '这里的菜比超市便宜一半。',
                  opts: [{ w: 'mitad', e: '一半' }, { w: 'doble', e: '两倍' }, { w: 'semana', e: '星期' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 20 · 🎂 El cumpleaños de Sofía — DELE A2 · Argentina (v9.33)
        //      invitación al asado; ofrecer, aceptar, hora flexible
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2-cumple',
            dele: 'A2', track: 'Argentina',
            emoji: '🎂',
            titleEs: 'El cumpleaños de Sofía',
            titleZh: '索菲亚的生日',
            blurb: 'Sofía invita a sus amigos a un asado de cumpleaños: traer algo para tomar, carne a la parrilla y la hora flexible argentina — a las ocho, más o menos. Invitar, ofrecer y aceptar con naturalidad.',
            blurbZh: '索菲亚邀请朋友们参加生日烤肉会：带点喝的、烤架上的肉，还有阿根廷式的弹性时间——八点“左右”到。自然地邀请、提供和接受。',
            lines: [
                { who: 'Sofía', sp: 'Chicos, el sábado cumplo años y hago un asado en casa. ¿Vienen?', zh: '朋友们，周六我过生日，在家里办一场烤肉会。你们来吗？' },
                { who: 'Wei', sp: '¡Claro! ¿A qué hora llegamos?', zh: '当然来！我们几点到？' },
                { who: 'Sofía', sp: 'A las ocho. O un poco después: acá nadie llega en punto.', zh: '八点。或者晚一点点：这儿没人准点到。' },
                { who: 'Vale', sp: '¿Llevamos algo?', zh: '我们要带点什么吗？' },
                { who: 'Sofía', sp: 'Pueden traer una ensalada o algo para tomar. Yo me encargo de la carne.', zh: '你们可以带一份沙拉或者喝的东西。肉我来负责。' },
                { who: 'Wei', sp: '¿Y el asado qué es? ¿Una sopa grande?', zh: '那“asado”是什么？是一种大汤吗？' },
                { who: 'Sofía', sp: '¡No! Es carne cocinada a la parrilla, al fuego. Es la comida de los domingos y de los cumpleaños.', zh: '不是！是在烤架上用炭火烤的肉。是周日和生日必吃的大餐。' },
                { who: 'Vale', sp: '¿Puedo llevar a mi hermano menor?', zh: '我可以带我弟弟去吗？' },
                { who: 'Sofía', sp: 'Obvio, cuanto más, mejor. Y el domingo sobra comida para todos.', zh: '当然，人越多越好。周日剩下的肉够所有人吃。' },
                { who: 'Wei', sp: 'Entonces ya estamos. ¡Feliz cumpleaños, Sofía!', zh: '那就说定了。生日快乐，索菲亚！' }
            ],
            quiz: [
                { sp: 'El sábado cumplo ___ y hago un asado.', zh: '周六我过生日，办一场烤肉会。',
                  opts: [{ w: 'años', e: '岁（cumplir años：过生日）' }, { w: 'libros', e: '书' }, { w: 'frío', e: '冷' }] },
                { sp: 'Acá nadie llega ___.', zh: '这儿没人准点到。',
                  opts: [{ w: 'en punto', e: '准点、整点' }, { w: 'temprano', e: '早' }, { w: 'verdad', e: '真的' }] },
                { sp: 'Es carne cocinada a la ___.', zh: '是在烤架上烤的肉。',
                  opts: [{ w: 'parrilla', e: '烤架' }, { w: 'mesa', e: '桌子' }, { w: 'cocina', e: '厨房' }] },
                { sp: 'Yo me encargo de la ___.', zh: '肉由我来负责。',
                  opts: [{ w: 'carne', e: '肉' }, { w: 'semana', e: '星期' }, { w: 'lluvia', e: '雨' }] },
                { sp: 'Cuanto más, ___.', zh: '人越多越好。',
                  opts: [{ w: 'mejor', e: '更好' }, { w: 'menor', e: '更小' }, { w: 'peor', e: '更糟' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 21 · 🏟 Ir a la cancha — DELE B1 · Argentina (v9.33)
        //      fútbol: platea/popular, la hinchada, planes
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b1-cancha',
            dele: 'B1', track: 'Argentina',
            emoji: '🏟️',
            titleEs: 'Ir a la cancha',
            titleZh: '去球场看球',
            blurb: 'Diego invita a Huang a ver a Boca en la Bombonera: platea o popular, la hinchada que canta noventa minutos y llegar dos horas antes. El fútbol como se vive en Argentina.',
            blurbZh: '迭戈邀请黄去糖果盒球场看博卡青年：看台座还是站立区，唱满九十分钟的球迷，以及提前两小时到场。在阿根廷，足球是这样被体验的。',
            lines: [
                { who: 'Diego', sp: 'Huang, el domingo juega Boca. ¿Te animás a venir a la cancha con nosotros?', zh: '黄，周日博卡有比赛。敢不敢跟我们一起去球场？' },
                { who: 'Huang', sp: '¿La cancha? Yo pensé que ir a la cancha era ir a correr.', zh: '球场？我原以为去 cancha 是去跑步呢。' },
                { who: 'Diego', sp: 'Jaja, no. En Argentina la cancha es el estadio de fútbol.', zh: '哈哈，不是。在阿根廷，cancha 指的是足球场。' },
                { who: 'Huang', sp: '¡Me encantaría! Pero nunca vi un partido ahí. ¿Cómo conseguimos entradas?', zh: '太想去啦！可我从没在那儿看过比赛。我们怎么买票？' },
                { who: 'Diego', sp: 'Yo las compro por internet. Hay dos opciones: platea o popular.', zh: '我在网上买。有两种选择：看台座或者站立区。' },
                { who: 'Huang', sp: '¿Y cuál es la diferencia?', zh: '有什么区别？' },
                { who: 'Diego', sp: 'En la platea estás sentado y pagás más. La popular es de pie, con la hinchada entera.', zh: '看台座有座位，贵一些。站立区站着看，和所有球迷挤在一起。' },
                { who: 'Huang', sp: 'Prefiero sentado. Me contaron que cantan todo el tiempo.', zh: '我还是坐着吧。听说他们从头到尾都在唱歌。' },
                { who: 'Diego', sp: 'Noventa minutos sin parar. Los hinchas llevan bombos y banderas gigantes.', zh: '九十分钟不停。球迷们带着大鼓和巨大的旗帜。' },
                { who: 'Huang', sp: '¿Y a qué hora hay que llegar?', zh: '那需要几点到？' },
                { who: 'Diego', sp: 'El partido es a las cinco, pero llegamos dos horas antes: acá el fútbol se vive desde temprano.', zh: '比赛五点开始，但我们提前两小时到：在这儿，看球从一大早就开始了。' }
            ],
            quiz: [
                { sp: '¿Te animás a venir a la ___ con nosotros?', zh: '敢不敢跟我们一起去球场？',
                  opts: [{ w: 'cancha', e: '球场（阿根廷说法）' }, { w: 'peluquería', e: '理发店' }, { w: 'pileta', e: '泳池' }] },
                { sp: 'Hay dos opciones: platea o ___.', zh: '有两种选择：看台座或者站立区。',
                  opts: [{ w: 'popular', e: '站立区（无座）' }, { w: 'privada', e: '私人的' }, { w: 'lejana', e: '远的' }] },
                { sp: 'La popular es de pie, con la ___ entera.', zh: '站立区站着看，和所有球迷在一起。',
                  opts: [{ w: 'hinchada', e: '球迷群体' }, { w: 'bicicleta', e: '自行车' }, { w: 'ventana', e: '窗户' }] },
                { sp: 'Los ___ llevan bombos y banderas gigantes.', zh: '球迷们带着大鼓和巨大的旗帜。',
                  opts: [{ w: 'hinchas', e: '球迷' }, { w: 'maestros', e: '老师' }, { w: 'niños', e: '孩子们' }] },
                { sp: 'Acá el fútbol se ___ desde temprano.', zh: '在这儿，看球从一大早就开始了。',
                  opts: [{ w: 'vive', e: '体验、感受' }, { w: 'vende', e: '卖' }, { w: 'olvida', e: '忘记' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 22 · 💃 Una milonga en San Telmo — DELE B1 · Argentina (v9.33)
        //      feria dominical, tango, la milonga; pasado simple
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b1-milonga',
            dele: 'B1', track: 'Argentina',
            emoji: '💃',
            titleEs: 'Una milonga en San Telmo',
            titleZh: '圣特尔莫的探戈舞会',
            blurb: 'Después de la feria dominical de San Telmo, Diego lleva a Huang a una milonga: bailarines callejeros, tango abrazado y una mesa para principiantes. La noche porteña de la mano del tango.',
            blurbZh: '逛完圣特尔莫的周日集市，迭戈带黄去探戈舞会：街头的舞者、紧紧相拥的探戈，还有新手桌。跟随探戈，感受布宜诺斯艾利斯的夜晚。',
            lines: [
                { who: 'Huang', sp: 'Diego, hoy fui a la feria de San Telmo. ¡Es enorme!', zh: '迭戈，我今天去了圣特尔莫集市。大得惊人！' },
                { who: 'Diego', sp: 'Los domingos llena toda la plaza: antigüedades, artesanías, música.', zh: '周日整个广场都摆满了：古董、手工艺品、音乐。' },
                { who: 'Huang', sp: 'Y en una esquina vi una pareja bailando tango. La gente le tiraba monedas.', zh: '在一个街角我看到一对舞者跳探戈，人们往他们那儿扔硬币。' },
                { who: 'Diego', sp: 'Los bailarines callejeros son buenos, pero esta noche te muestro el tango de verdad.', zh: '街头舞者很棒，不过今晚我带你看真正的探戈。' },
                { who: 'Huang', sp: '¿A dónde vamos?', zh: '我们去哪儿？' },
                { who: 'Diego', sp: 'A una milonga en San Telmo. ¿Sabés qué es una milonga?', zh: '去圣特尔莫的一家探戈舞会。你知道 milonga 是什么吗？' },
                { who: 'Huang', sp: '¿Es un baile o un lugar? Nunca lo escuché.', zh: '是一种舞还是一个地方？我从没听过这个词。' },
                { who: 'Diego', sp: 'Las dos cosas: el lugar donde la gente va a bailar tango... y también un ritmo parecido.', zh: '两个意思都有：是大家跳探戈的地方……也是一种相似的舞曲节奏。' },
                { who: 'Huang', sp: '¿Y yo puedo bailar si no sé nada?', zh: '那我一点也不会，也能跳吗？' },
                { who: 'Diego', sp: 'Claro. Hay mesas para principiantes y antes te tomo una clase express.', zh: '当然。有新手桌，之前我先给你上一节速成课。' },
                { who: 'Huang', sp: 'Entonces me pongo los zapatos cómodos. Esta noche aprendo tango.', zh: '那我穿上舒服的鞋子。今晚我要学探戈。' }
            ],
            quiz: [
                { sp: 'Los domingos llena toda la ___: antigüedades y artesanías.', zh: '周日整个广场都摆满了：古董和手工艺品。',
                  opts: [{ w: 'plaza', e: '广场' }, { w: 'cocina', e: '厨房' }, { w: 'fábrica', e: '工厂' }] },
                { sp: 'Vi una pareja ___ tango en la esquina.', zh: '在街角我看到一对舞者跳探戈。',
                  opts: [{ w: 'bailando', e: '跳舞（正在）' }, { w: 'comiendo', e: '吃饭（正在）' }, { w: 'durmiendo', e: '睡觉（正在）' }] },
                { sp: 'La milonga es el lugar donde la gente va a ___.', zh: 'milonga 是大家去跳舞的地方。',
                  opts: [{ w: 'bailar tango', e: '跳探戈' }, { w: 'comprar pan', e: '买面包' }, { w: 'ver películas', e: '看电影' }] },
                { sp: 'Hay mesas para ___ y una clase express.', zh: '有新手桌，还有速成课。',
                  opts: [{ w: 'principiantes', e: '初学者' }, { w: 'profesores', e: '老师' }, { w: 'extranjeros', e: '外国人' }] },
                { sp: 'Me pongo los zapatos ___.', zh: '我穿上舒服的鞋子。',
                  opts: [{ w: 'cómodos', e: '舒服的' }, { w: 'nuevos', e: '新的' }, { w: 'caros', e: '贵的' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 23 · 🥩 El asado del domingo — DELE B2 · Argentina (v9.33)
        //      el ritual completo: cortes, asador, sobremesa
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b2-asado',
            dele: 'B2', track: 'Argentina',
            emoji: '🥩',
            titleEs: 'El asado del domingo',
            titleZh: '周日的烤肉',
            blurb: 'Hernán es el asador y Wei ya aprendió la ley no escrita: nadie toca la carne sin permiso. Cortes, provoleta de entrada y sobremesa eterna: el ritual argentino completo, con humor de familia.',
            blurbZh: '埃尔南是主烤人，魏已经学会了那条不成文的规矩：没有得到允许，谁也不能碰肉。各种部位、开场的前菜烤奶酪、没完没了的饭后闲聊——完整的阿根廷仪式，配上家庭式的玩笑。',
            lines: [
                { who: 'Hernán', sp: 'Hoy aso yo: vacío, entraña, chorizos y provoleta para empezar.', zh: '今天我来烤：牛腩排、牛横膈膜排、香肠，开场先烤奶酪。' },
                { who: 'Wei', sp: 'Desde el cumpleaños de Sofía aprendí una cosa: el asador manda.', zh: '从索菲亚的生日那以后，我记住了一件事：主烤人说了算。' },
                { who: 'Hernán', sp: 'Jaja, es verdad. Y la primera ley es que nadie toca la carne sin permiso.', zh: '哈哈，没错。第一条规矩就是：没有得到允许，谁也不能碰肉。' },
                { who: 'Camila', sp: 'El año pasado mi primo la pinchó para ver si estaba lista. Aún lo recordamos.', zh: '去年我表哥戳了一下肉想看看熟没熟。我们还记着这事呢。' },
                { who: 'Wei', sp: '¿Tan grave es? Parece una ceremonia religiosa.', zh: '有那么严重吗？这简直像一场宗教仪式。' },
                { who: 'Hernán', sp: 'Para nosotros sí. Cada corte tiene su tiempo: el vacío lento, la entraña rápida al fuego.', zh: '对我们来说就是。每种肉有自己的火候：牛腩排要慢，牛横膈膜排要在火上快速烤。' },
                { who: 'Camila', sp: 'Y mientras esperamos, provoleta y un buen vino. El hambre se hace larga.', zh: '等待的时候，先吃烤奶酪，配点好酒。等肉的时候人特别容易饿。' },
                { who: 'Wei', sp: '¿Y es verdad que el asado no termina cuando uno termina de comer?', zh: '听说烤肉会不会在吃完的那一刻就结束，是真的吗？' },
                { who: 'Camila', sp: 'Jamás. Después viene la sobremesa: charla, café, mate y risas por un par de horas más.', zh: '绝不会。接下来是饭后闲聊：聊天、咖啡、马黛茶和笑声，还要再持续好几个小时。' },
                { who: 'Wei', sp: 'En China también nos quedamos en la mesa, pero dos horas me parece un récord.', zh: '在中国我们也喜欢饭后坐着聊，但两小时在我看来算纪录了。' },
                { who: 'Hernán', sp: 'Acá se dice que la carne es la excusa: lo importante es la mesa.', zh: '这儿有句话说，肉只是个由头：重要的是围坐在一起的这一桌人。' }
            ],
            quiz: [
                { sp: 'Hoy aso yo: vacío, entraña, chorizos y ___.', zh: '今天我来烤：牛腩排、牛横膈膜排、香肠和烤奶酪。',
                  opts: [{ w: 'provoleta', e: '烤奶酪（前菜）' }, { w: 'paella', e: '西班牙海鲜饭' }, { w: 'ensalada', e: '沙拉' }] },
                { sp: 'Nadie toca la carne sin ___.', zh: '没有得到允许，谁也不能碰肉。',
                  opts: [{ w: 'permiso', e: '允许' }, { w: 'hambre', e: '饿' }, { w: 'sal', e: '盐' }] },
                { sp: 'Cada corte tiene su ___: el vacío lento, la entraña rápida.', zh: '每种肉有自己的火候：牛腩排慢，牛横膈膜排快。',
                  opts: [{ w: 'tiempo', e: '火候、时间' }, { w: 'precio', e: '价格' }, { w: 'tamaño', e: '大小' }] },
                { sp: 'Después viene la ___: charla, café y mate.', zh: '接下来是饭后闲聊：聊天、咖啡和马黛茶。',
                  opts: [{ w: 'sobremesa', e: '饭后闲聊' }, { w: 'sobrecarga', e: '超载' }, { w: 'sobrina', e: '侄女' }] },
                { sp: 'La carne es la excusa: lo importante es la ___.', zh: '肉只是个由头：重要的是这一桌人。',
                  opts: [{ w: 'mesa', e: '桌子、一桌人' }, { w: 'carne', e: '肉' }, { w: 'parrilla', e: '烤架' }] }
            ]
        },

        // ─────────────────────────────────────────────────────────
        // 24 · 💼 La entrevista de trabajo — DELE B2 · Argentina (v9.33)
        //      español profesional; voseo formal, plazos, equipo
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-b2-entrevista',
            dele: 'B2', track: 'Argentina',
            emoji: '💼',
            titleEs: 'La entrevista de trabajo',
            titleZh: '求职面试',
            blurb: 'Mei entrevista en una empresa de Buenos Aires: presentarse con el voseo de por medio, hablar de plazos, del equipo y de lo que uno aporta. El español profesional con acento argentino.',
            blurbZh: '梅在布宜诺斯艾利斯的一家公司面试：用阿根廷式称呼自我介绍，谈工期、团队和自己能带来什么。带着阿根廷口音的职场西班牙语。',
            lines: [
                { who: 'Entrevistadora', sp: 'Mei, gracias por venir. Pasá y sentate, hacé como en tu casa.', zh: '梅，谢谢你来。进来坐吧，别拘束。' },
                { who: 'Mei', sp: 'Gracias por recibirme. Estoy muy interesada en el puesto.', zh: '谢谢您接待我。我对这个职位非常感兴趣。' },
                { who: 'Entrevistadora', sp: 'Contame un poco de vos: experiencia, estudios, qué te motiva.', zh: '跟我介绍一下你自己吧：经历、学历，还有你的动力是什么。' },
                { who: 'Mei', sp: 'Trabajé tres años en atención al cliente en un banco de Shanghái y quiero sumarme a un equipo con proyectos internacionales.', zh: '我在上海的一家银行做了三年客户服务，想加入一个有国际项目的团队。' },
                { who: 'Entrevistadora', sp: 'El puesto pide manejar cuentas en chino y en español. ¿Te sentís segura con eso?', zh: '这个职位要求用中文和西班牙语管理客户。你对此有把握吗？' },
                { who: 'Mei', sp: 'El idioma es mi punto fuerte. Lo que me cuesta es el voseo: todavía lo estudio.', zh: '语言是我的强项。难的是阿根廷式称呼：我还在学。' },
                { who: 'Entrevistadora', sp: 'Tranquila, acá lo aprendés rápido. ¿Y cómo trabajás con plazos ajustados?', zh: '别担心，在这儿很快就能学会。那工期很紧的时候你怎么工作？' },
                { who: 'Mei', sp: 'Organizo prioridades y aviso con tiempo si algo se complica. No me gusta improvisar a último momento.', zh: '我会理清优先级，如果情况有变就提前沟通。我不喜欢最后一刻才临时应付。' },
                { who: 'Entrevistadora', sp: 'Perfecto. ¿Tenés alguna pregunta sobre el equipo?', zh: '很好。关于团队你有什么问题吗？' },
                { who: 'Mei', sp: 'Sí: ¿cómo es el ambiente de trabajo y cuántos seríamos?', zh: '有：工作氛围怎么样？团队会有多少人？' },
                { who: 'Entrevistadora', sp: 'Somos ocho, muy buena onda. La próxima semana te contamos la decisión.', zh: '我们八个人，氛围特别好。下周我们告诉你结果。' }
            ],
            quiz: [
                { sp: 'Pasá y ___, hacé como en tu casa.', zh: '进来坐吧，别拘束。',
                  opts: [{ w: 'sentate', e: '坐下（voseo）' }, { w: 'sentar', e: '使坐下（原形）' }, { w: 'sentamos', e: '我们坐下' }] },
                { sp: 'Quiero ___ a un equipo con proyectos internacionales.', zh: '我想加入一个有国际项目的团队。',
                  opts: [{ w: 'sumarme', e: '加入' }, { w: 'dormirme', e: '睡着' }, { w: 'levantarme', e: '起床' }] },
                { sp: 'El idioma es mi punto ___.', zh: '语言是我的强项。',
                  opts: [{ w: 'fuerte', e: '强项（punto fuerte）' }, { w: 'débil', e: '弱项' }, { w: 'medio', e: '中等' }] },
                { sp: 'Aviso con ___ si algo se complica.', zh: '如果情况有变，我会提前沟通。',
                  opts: [{ w: 'tiempo', e: '提前（con tiempo）' }, { w: 'retraso', e: '延误' }, { w: 'miedo', e: '害怕' }] },
                { sp: 'Somos ocho, muy buena ___.', zh: '我们八个人，氛围特别好。',
                  opts: [{ w: 'onda', e: '氛围（muy buena onda）' }, { w: 'cara', e: '脸' }, { w: 'suerte', e: '运气' }] }
            ]
        }
    ];
    /* ══════════════ fin de datos ══════════════ */

    if (!DRAMAS.length) return; // sin datos → módulo dormido (cero errores)

    // ── progreso por drama (misma forma que ac_lessons_v1) ──
    const LKEY = 'ac_dele_v1';
    let LB = {};
    try { LB = JSON.parse(localStorage.getItem(LKEY) || '{}') || {}; } catch (e) { LB = {}; }
    const saveLB = () => { try { localStorage.setItem(LKEY, JSON.stringify(LB)); } catch (e) { } };
    const progOf = (id) => LB[id] || {};

    // v9.30: traducción 中文 OCULTA por defecto en la lectura (inmersión
    // primero, espejo del 🇪🇸 OFF de las lecciones chinas). Preferencia
    // persistente ac_dele_zh.
    let verZh = false;
    try { verZh = localStorage.getItem('ac_dele_zh') === '1'; } catch (e) { }
    const setVerZh = (v) => {
        verZh = !!v;
        try { localStorage.setItem('ac_dele_zh', verZh ? '1' : '0'); } catch (e) { }
    };

    // ── estado de la sesión abierta ──
    const S = { drama: null, view: null, idx: 0, results: [], order: [], answered: false };
    let curLevel = 'all';
    let curTrack = 'all'; // v9.31: 'all' | 'Escolares' | 'Argentina'

    // ── TTS español: mismos motores globales de app.js con guardas ──
    // (este archivo carga ANTES de app.js: los globals solo se tocan al
    // hacer clic, cuando app.js ya existe; fallback voz del sistema)
    let dAudio = null, dTok = 0;
    let dPlay = { text: '', btn: null, state: 'idle' }; // 'idle' | 'playing' | 'paused'
    let dQueue = null, dQIdx = 0;   // reproducción continua (▶️ Escuchar todo)

    // v9.31: la cola terminó sola (última línea) → restaurar el botón
    function resetPlayAll() {
        dQueue = null; dQIdx = 0;
        const b = $('dele-playall');
        if (b) b.textContent = '▶️ Escuchar todo';
    }

    function setSayIcon(btn, st) {
        if (!btn) return;
        btn.textContent = st === 'playing' ? '⏸' : (st === 'paused' ? '▶️' : '🔊');
    }
    function stopSpeak() {
        dTok++; // invalida respuestas TTS en vuelo
        dQueue = null; dQIdx = 0;
        // v9.31: oJO — stopSpeak NO toca el rótulo de #dele-playall: speakEs
        // lo llama en CADA paso de la cola ▶️ y el botón parpadearía a '▶️'
        // durante la reproducción (lo detectó la QA). Cada camino de parada
        // explícito (playAll 2.º toque, resetPlayAll) restaura su etiqueta.
        if (dAudio) { try { dAudio.pause(); } catch (e) { } dAudio = null; }
        try { if (typeof globalAudioPlayer !== 'undefined' && globalAudioPlayer.src) globalAudioPlayer.pause(); } catch (e) { }
        if ('speechSynthesis' in window) { try { speechSynthesis.cancel(); } catch (e) { } }
        if (dPlay.btn) setSayIcon(dPlay.btn, 'idle');
        dPlay = { text: '', btn: null, state: 'idle' };
    }
    function pauseOrResume(btn) {
        // 2.º toque sobre el mismo botón: pausa; 3.º: reanuda (patrón v9.11)
        if (dAudio) {
            if (dPlay.state === 'playing') { try { dAudio.pause(); } catch (e) { } dPlay.state = 'paused'; setSayIcon(btn, 'paused'); }
            else { dAudio.play().then(() => { dPlay.state = 'playing'; setSayIcon(btn, 'playing'); }).catch(() => { }); }
            return true;
        }
        return false;
    }
    async function speakEs(text, btn) {
        if (!text) return;
        if (btn && btn === dPlay.btn && dPlay.text === text && dPlay.state !== 'idle') {
            pauseOrResume(btn); // mismo botón, mismo texto → pausa/seguir
            return;
        }
        const myTok = ++dTok;
        // v9.31 FIX "el audio solo reproduce la primera frase y se para":
        // stopSpeak() apaga la cola ▶️ (dQueue = null); si ESTA lectura es
        // un paso de la cola hay que preservarla para que la 2.ª línea y
        // las siguientes encadenen (v9.30 la mataba acá mismo).
        const keepQ = dQueue, keepI = dQIdx;
        stopSpeak();
        dTok = myTok; // stopSpeak lo avanzó: restaurar el token de ESTA lectura
        dQueue = keepQ; dQIdx = keepI; // ▶️ continúa tras la línea actual
        dPlay = { text: text, btn: btn, state: 'loading' };
        if (btn) { btn.disabled = true; btn.textContent = '…'; }
        // un solo audio a la vez: corta el player global y el lector
        try {
            if (typeof globalAudioPlayer !== 'undefined' && globalAudioPlayer.src) {
                globalAudioPlayer.onended = null; globalAudioPlayer.onerror = null;
                globalAudioPlayer.pause();
                if (typeof isPlaying !== 'undefined') isPlaying = false;
            }
            if (typeof stopReader === 'function') { try { stopReader(); } catch (e0) { } }
        } catch (e) { }
        let url = null;
        try {
            if (typeof fetchTTS === 'function') {
                const vEs = (typeof voiceEs !== 'undefined') ? voiceEs : 'f';
                const resp = await fetchTTS({ text: text, lang: 'es-ES', voice: vEs }, 12000);
                if (myTok !== dTok) return; // mientras tanto sonó otra línea
                if (!resp.ok) throw new Error('TTS http ' + resp.status);
                const data = await resp.json();
                if (!data.audio) throw new Error('TTS sin audio');
                const bin = atob(data.audio);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            }
        } catch (err) {
            console.warn('[DELE] fetchTTS falló, voz del sistema', err);
            url = null;
        }
        if (myTok !== dTok) { if (url) { try { URL.revokeObjectURL(url); } catch (e) { } } return; }
        if (btn) { btn.disabled = false; setSayIcon(btn, 'playing'); }
        if (url) {
            dAudio = new Audio(url);
            try { dAudio.preservesPitch = true; dAudio.webkitPreservesPitch = true; } catch (e2) { }
            dAudio.playbackRate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
            const onGone = () => {
                if (myTok !== dTok) return;
                if (dQueue) {
                    if (dQIdx < dQueue.length) { playQueueStep(); return; } // ▶️ continua
                    resetPlayAll(); // cola terminada: botón a '▶️' (v9.31)
                }
                dPlay.state = 'idle';
                setSayIcon(dPlay.btn, 'idle');
            };
            dAudio.addEventListener('ended', onGone);
            dAudio.addEventListener('error', onGone);
            dAudio.play().then(() => { dPlay.state = 'playing'; }).catch(() => {
                dPlay.state = 'idle'; setSayIcon(dPlay.btn, 'idle');
            });
        } else if ('speechSynthesis' in window) {
            // fallback offline: voz del sistema en es-*
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'es-ES';
            u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
            try {
                if (typeof sysVoiceFor === 'function') {
                    const sv = sysVoiceFor('es-ES', (typeof voiceEs !== 'undefined') ? voiceEs : 'f');
                    if (sv) u.voice = sv;
                }
            } catch (e3) { }
            u.onend = () => {
                if (myTok !== dTok) return;
                if (dQueue) {
                    if (dQIdx < dQueue.length) { playQueueStep(); return; }
                    resetPlayAll(); // cola terminada: botón a '▶️' (v9.31)
                }
                dPlay.state = 'idle'; setSayIcon(dPlay.btn, 'idle');
            };
            dPlay.state = 'playing';
            speechSynthesis.speak(u);
        } else {
            dPlay.state = 'idle';
            setSayIcon(dPlay.btn, 'idle');
        }
    }
    // ▶️ Escuchar todo: cola de líneas del drama actual, secuencial
    function playAll(btn) {
        if (dQueue) { // 2.º toque: corta la cola
            dQueue = null; dQIdx = 0;
            stopSpeak();
            if (btn) btn.textContent = '▶️ Escuchar todo';
            return;
        }
        if (!S.drama) return;
        dQueue = S.drama.lines.map(l => l.sp);
        dQIdx = 0;
        if (btn) btn.textContent = '⏹ Parar';
        playQueueStep(btn);
    }
    function playQueueStep(btn) {
        if (!dQueue || dQIdx >= dQueue.length) {
            dQueue = null; dQIdx = 0;
            const b = $('dele-playall');
            if (b) b.textContent = '▶️ Escuchar todo';
            return;
        }
        const lineBtn = $('dele-body').querySelector('.dl-line[data-i="' + dQIdx + '"] .lq-line-say');
        const text = dQueue[dQIdx++];
        speakEs(text, lineBtn || $('dele-body').querySelector('.lq-line-say'));
    }

    // ── chips + lista del panel ──
    // v9.33: niveles SEPARADOS — 'A2/B1' desaparece como nivel de chip
    // (los 5 dramas que lo usaban pasan a A2 o B1 según su contenido).
    const DELE_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    function levelLabel(v) { return 'DELE ' + v; }
    function renderChips() {
        const chips = $('dele-levels');
        if (!chips) return;
        chips.innerHTML = '';
        const mk = (label, value) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'lv-chip lv-chip-dele' + (curLevel === value ? ' active' : '');
            b.dataset.level = value;
            b.textContent = label;
            b.setAttribute('aria-label', value === 'all' ? 'Mostrar todos los niveles' : 'Filtrar mini-dramas DELE ' + label);
            chips.appendChild(b);
        };
        // v9.33: UN solo botón "mostrar todo" y va AQUÍ, en niveles; el
        // redundante "Todas" de pistas desaparece de renderTrackChips.
        mk('Todas', 'all');
        const lvls = [];
        DRAMAS.forEach(d => { if (lvls.indexOf(d.dele) === -1) lvls.push(d.dele); });
        lvls.sort((a, b) => {
            const ia = DELE_ORDER.indexOf(a), ib = DELE_ORDER.indexOf(b);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
        // labels cortos (A1…C2): el "DELE X" completo ya viaja en cada
        // tarjeta y en el aria-label — la fila queda compacta en móvil.
        lvls.forEach(v => mk(v, v));
    }
    // v9.33: chips de pista SIN "Todas" — solo las pistas reales, con emoji
    // para distinguir la fila de la de niveles de un golpe de vista. "Ver
    // todas las pistas" = tocar de nuevo el chip activo (toggle, v9.33) o
    // tocar "Todas" en la fila de niveles. Se generan de los datos, igual
    // que los de nivel, para que una pista nueva cree su chip solo.
    function renderTrackChips() {
        const chips = $('dele-tracks');
        if (!chips) return;
        const cnt = $('dele-count'); // v9.33: el contador viaja en esta fila
        chips.innerHTML = '';
        const meta = { 'Escolares': '🏫 Escolares', 'Argentina': '🇦🇷 Argentina' };
        const mk = (label, value) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'lv-chip lv-chip-dele' + (curTrack === value ? ' active' : '');
            b.dataset.track = value;
            b.textContent = label;
            b.setAttribute('aria-label', 'Filtrar dramas de pista ' + label);
            chips.appendChild(b);
        };
        DRAMAS.forEach(d => { if (d.track && !chips.querySelector('[data-track="' + d.track + '"]')) mk(meta[d.track] || d.track, d.track); });
        if (cnt) chips.appendChild(cnt); // re-anclaje tras el re-render
    }
    function bestLabel(d) {
        const p = progOf(d.id);
        const best = (p.best != null) ? p.best + '/' + d.quiz.length : '—';
        return '🎯 ' + best + (p.completed ? ' <span class="lq-done">✓ completada</span>' : '');
    }
    function renderList() {
        const wrap = $('dele-list');
        if (!wrap) return;
        wrap.innerHTML = '';
        const shown = DRAMAS.filter(d =>
            (curLevel === 'all' || d.dele === curLevel) &&
            (curTrack === 'all' || d.track === curTrack));
        // v9.33: contador de resultados — cuántos dramas se ven del total
        // (estado inicial: "24 mini-dramas"; filtrado: "5 de 24").
        const cnt = $('dele-count');
        if (cnt) cnt.textContent = (shown.length === DRAMAS.length)
            ? DRAMAS.length + ' mini-dramas'
            : shown.length + ' de ' + DRAMAS.length;
        if (!shown.length) {
            // v9.31: nivel+pista sin dramas (p. ej. DELE C1 × Escolares)
            wrap.innerHTML = '<div class="dl-empty">Todavía no hay dramas de ese nivel en esta pista — probá otra combinación 🧭</div>';
            return;
        }
        shown.forEach(d => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.innerHTML =
                '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">' + d.emoji + '</span>' +
                '<span class="lc-hsk">🇪🇸 ' + escHtml(levelLabel(d.dele)) + ' · ' + escHtml(d.track) + '</span>' +
                '<span class="lc-best">' + bestLabel(d) + '</span></div>' +
                '<div class="lc-titles"><span class="lc-zh">' + escHtml(d.titleEs) + '</span>' +
                '<span class="lc-es">' + escHtml(d.titleZh) + '</span></div>' +
                '<p class="lc-blurb">' + escHtml(d.blurb) + '</p>' +
                '<div class="lc-meta">' + d.lines.length + ' líneas · ' + d.quiz.length + ' ejercicios</div>' +
                '<div class="lc-actions">' +
                '<button type="button" class="lq-btn lc-read" data-act="read" data-id="' + d.id + '">📖 Leer</button>' +
                '<button type="button" class="lq-btn lc-practice" data-act="practice" data-id="' + d.id + '">🎯 Practicar</button>' +
                '</div>';
            wrap.appendChild(card);
        });
    }
    function bindList() {
        const wrap = $('dele-list');
        if (!wrap) return;
        wrap.addEventListener('click', (e) => {
            const btn = e.target.closest('.lq-btn[data-act]');
            if (!btn) return;
            const d = DRAMAS.find(x => x.id === btn.dataset.id);
            if (!d) return;
            if (btn.dataset.act === 'read') openStory(d);
            else openQuiz(d);
        });
        const chips = $('dele-levels');
        if (chips) chips.addEventListener('click', (e) => {
            const chip = e.target.closest('.lv-chip');
            if (!chip || !chip.dataset.level) return; // (los de pista van en #dele-tracks)
            // v9.33: re-tap en el nivel activo vuelve a "Todas" (toggle)
            curLevel = (curLevel === chip.dataset.level) ? 'all' : chip.dataset.level;
            renderChips();
            renderList();
        });
        const tracks = $('dele-tracks');
        if (tracks) tracks.addEventListener('click', (e) => {
            const chip = e.target.closest('.lv-chip');
            if (!chip || !chip.dataset.track) return;
            // v9.31: filtro por pista · v9.33: re-tap = ver TODAS las pistas
            // (por eso esta fila ya no necesita un chip "Todas" propio)
            curTrack = (curTrack === chip.dataset.track) ? 'all' : chip.dataset.track;
            renderTrackChips();
            renderList();
        });
    }

    // ── overlay propio (piel .lq-pop, ids propios) ──
    let pop = null, body = null, segs = null, progNum = null;
    function injectOverlay() {
        if (pop || !$('panel-lessons')) return;
        pop = document.createElement('div');
        pop.id = 'dele-pop';
        pop.className = 'lq-pop hidden';
        pop.setAttribute('role', 'dialog');
        pop.setAttribute('aria-modal', 'true');
        pop.setAttribute('aria-label', 'Mini-dramas DELE: lectura y práctica de español');
        pop.innerHTML =
            '<div class="lq-inner">' +
            '<div class="lq-header">' +
            '<span id="dele-progress-num" class="lq-progress-num">📖</span>' +
            '<div id="dele-segments" class="lq-segments" aria-hidden="true"></div>' +
            '<button id="dele-close" class="lq-x" type="button" aria-label="Cerrar">✕</button>' +
            '</div>' +
            '<div id="dele-body" class="lq-body"></div>' +
            '</div>';
        document.body.appendChild(pop);
        body = $('dele-body'); segs = $('dele-segments'); progNum = $('dele-progress-num');
        $('dele-close').addEventListener('click', closePop);
        pop.addEventListener('click', (e) => {
            if (e.target === pop) closePop(); // clic en el fondo (convención lecciones)
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden')) closePop();
        });
    }
    function openPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closePop() {
        stopSpeak();
        pop.classList.add('hidden');
        try { document.body.style.overflow = ''; } catch (e) { }
        S.drama = null; S.view = null;
        renderList(); // refresca el mejor puntaje
    }

    // ── vista LECTURA ──
    function openStory(d) {
        S.drama = d; S.view = 'story';
        stopSpeak(); // v9.31: cambiar de vista corta la lectura (convención lecciones)
        openPop();
        progNum.textContent = '📖';
        segs.innerHTML = '';
        const lines = d.lines.map((ln, i) => {
            return '<div class="dl-line" data-i="' + i + '">' +
                '<button type="button" class="lq-line-say" data-say="' + escHtml(ln.sp) + '" aria-label="Escuchar la línea">🔊</button>' +
                '<div class="dl-line-body">' +
                (ln.who ? '<div class="dl-who">' + escHtml(ln.who) + '</div>' : '') +
                '<div class="dl-sp">' + escHtml(ln.sp) + '</div>' +
                '<div class="dl-zh' + (verZh ? '' : ' hidden') + '">' + escHtml(ln.zh) + '</div>' +
                '</div></div>';
        }).join('');
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + d.emoji + '</span>' +
            '<div><div class="lq-story-zh dl-title-es">' + escHtml(d.titleEs) + '</div>' +
            '<div class="lq-story-es dl-title-zh">' + escHtml(d.titleZh) + ' · DELE ' + escHtml(d.dele) + '</div></div></div>' +
            '<p class="lq-blurb">' + escHtml(d.blurb) + '</p>' +
            '<p class="lq-blurb dl-blurb-zh">' + escHtml(d.blurbZh) + '</p>' +
            '<div class="lq-lines">' + lines + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-primary" id="dele-playall">▶️ Escuchar todo</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="dele-story-zh">🇨🇳 中文: ' + (verZh ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="dele-story-speed">⚡ …</button>' +
            '<button type="button" class="lq-btn" id="dele-story-practice">🎯 Practicar ' + d.quiz.length + '</button>' +
            '</div>';
        const sp = $('dele-story-speed');
        if (sp) {
            sp.textContent = '⚡ ' + ((typeof playbackSpeed === 'number') ? playbackSpeed : 1) + 'x';
            sp.title = 'Velocidad de la lectura: la MISMA que elegís con ⚡ en la tarjeta';
            sp.addEventListener('click', () => {
                if (typeof cycleSpeed === 'function') cycleSpeed();
                sp.textContent = '⚡ ' + ((typeof playbackSpeed === 'number') ? playbackSpeed : 1) + 'x';
            });
        }
        $('dele-story-practice').addEventListener('click', () => openQuiz(d));
        $('dele-story-zh').addEventListener('click', (e) => {
            setVerZh(!verZh);
            e.target.textContent = '🇨🇳 中文: ' + (verZh ? 'ON' : 'OFF');
            body.querySelectorAll('.dl-zh').forEach(el => el.classList.toggle('hidden', !verZh));
        });
        $('dele-playall').addEventListener('click', (e) => playAll(e.target));
        body.querySelector('.lq-lines').addEventListener('click', (e) => {
            const say = e.target.closest('.lq-line-say');
            if (!say) return;
            // v9.31: con la cola activa, tocar una línea continúa desde ella
            if (dQueue) {
                const row = say.closest('.dl-line');
                const i = row ? parseInt(row.dataset.i, 10) : NaN;
                if (!isNaN(i)) dQIdx = i + 1;
            }
            speakEs(say.dataset.say, say);
        });
        body.scrollTop = 0;
    }

    // ── vista PRÁCTICA ──
    function shuffle3() {
        const d = [0, 1, 2];
        for (let i = d.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = d[i]; d[i] = d[j]; d[j] = t;
        }
        return d;
    }
    function openQuiz(d) {
        S.drama = d; S.view = 'quiz'; S.idx = 0; S.answered = false;
        stopSpeak(); // v9.31: que "Escuchar todo" no siga sonando sobre el quiz
        S.results = new Array(d.quiz.length).fill(null);
        // mezcla por sesión: opts[0] = correcta en los datos; el orden visible
        // se baraja acá para que la posición no sea predecible (patrón lecciones)
        S.order = d.quiz.map(() => shuffle3());
        openPop();
        renderQuiz();
    }
    function quizDots() {
        let html = S.results.map(r => '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : '') + '"></span>').join('');
        return html;
    }
    function renderQuiz() {
        const d = S.drama;
        const q = d.quiz[S.idx];
        S.answered = false;
        progNum.textContent = (S.idx + 1) + '/' + d.quiz.length;
        segs.innerHTML = quizDots();
        const optsHtml = S.order[S.idx].map((oi, pos) => {
            const o = q.opts[oi];
            return '<button type="button" class="dl-opt" data-oi="' + oi + '" data-pos="' + pos + '">' +
                '<b>' + escHtml(o.w) + '</b><span>' + escHtml(o.e) + '</span></button>';
        }).join('');
        body.innerHTML =
            '<div class="dl-quiz-tag">' + d.emoji + ' ' + escHtml(d.titleEs) + ' · DELE ' + escHtml(d.dele) + '</div>' +
            '<div class="dl-quiz-zh">' + escHtml(q.zh) + '</div>' +
            '<div class="dl-quiz-sentence">' + escHtml(q.sp) + '</div>' +
            '<div class="dl-opts">' + optsHtml + '</div>' +
            '<div class="dl-fb hidden" aria-live="polite"></div>' +
            '<div class="dl-actions hidden"><button type="button" class="lq-btn" id="dele-next">' +
            (S.idx + 1 >= d.quiz.length ? 'Ver resultado 🏁' : 'Siguiente ▶') + '</button></div>';
        body.querySelector('.dl-opts').addEventListener('click', (e) => {
            const b = e.target.closest('.dl-opt');
            if (!b || S.answered) return;
            answerQuiz(parseInt(b.dataset.oi, 10));
        });
        $('dele-next').addEventListener('click', nextQuiz);
        body.scrollTop = 0;
        // 1.er ejercicio: escucha automática de la oración (gesto de abrir ya dado)
    }
    function answerQuiz(oi) {
        const d = S.drama;
        const q = d.quiz[S.idx];
        const ok = oi === 0; // opts[0] = correcta en los datos
        S.answered = true;
        S.results[S.idx] = ok;
        const opts = body.querySelectorAll('.dl-opt');
        opts.forEach(b => {
            const thisOi = parseInt(b.dataset.oi, 10);
            b.disabled = true;
            if (thisOi === 0) b.classList.add('ok');        // la correcta SIEMPRE en verde
            else if (thisOi === oi) b.classList.add('bad'); // la elegida errónea en rojo
        });
        const fb = body.querySelector('.dl-fb');
        fb.className = 'dl-fb ' + (ok ? 'ok' : 'bad');
        fb.innerHTML = ok
            ? '✅ ¡Eso es! — <b>' + escHtml(q.opts[0].w) + '</b> <span>(' + escHtml(q.opts[0].e) + ')</span>'
            : '❌ Era: <b>' + escHtml(q.opts[0].w) + '</b> <span>(' + escHtml(q.opts[0].e) + ')</span>';
        const act = body.querySelector('.dl-actions');
        act.classList.remove('hidden');
        // eco de audio de la oración completa (refuerzo, patrón pares mínimos)
        const clean = q.sp.replace(/_{2,}/g, ' ' + q.opts[0].w + ' ');
        speakEs(clean, null);
    }
    function nextQuiz() {
        const d = S.drama;
        S.idx++;
        if (S.idx >= d.quiz.length) { renderEnd(); return; }
        renderQuiz();
    }
    function renderEnd() {
        const d = S.drama;
        const total = d.quiz.length;
        const score = S.results.filter(Boolean).length;
        const p = progOf(d.id);
        p.best = Math.max(p.best || 0, score);
        p.completed = p.completed || (score === total);
        LB[d.id] = p;
        saveLB();
        progNum.textContent = '🏁';
        segs.innerHTML = quizDots();
        const msg = score === total ? '¡Perfecto! Nivel DELE dominado 🎉'
            : score >= Math.ceil(total * 0.7) ? 'Muy bien — repasá las que faltaron.'
                : 'Otra vuelta: escuchá el drama de nuevo y volvé a practicar.';
        body.innerHTML =
            '<div class="dl-quiz-tag">' + d.emoji + ' ' + escHtml(d.titleEs) + '</div>' +
            '<div class="dl-score">' + score + '<span>/' + total + '</span></div>' +
            '<div class="dl-end-msg">' + msg + '</div>' +
            '<div class="dl-actions">' +
            '<button type="button" class="lq-btn" id="dele-again">🔄 Otra vez</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="dele-reread">📖 Volver a leer</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="dele-end-close">Cerrar</button>' +
            '</div>';
        $('dele-again').addEventListener('click', () => openQuiz(d));
        $('dele-reread').addEventListener('click', () => openStory(d));
        $('dele-end-close').addEventListener('click', closePop);
        body.scrollTop = 0;
    }

    // ── inyección en #panel-lessons + cambio de modo ──
    let SUB_ORIG = null, INTRO_ORIG = null;
    function swapPanelTexts(cnMode) {
        const panel = $('panel-lessons');
        if (!panel) return;
        const sub = panel.querySelector('.lessons-sub');
        const intro = panel.querySelector('.lessons-intro');
        if (sub && SUB_ORIG === null) SUB_ORIG = sub.textContent;
        if (intro && INTRO_ORIG === null) INTRO_ORIG = intro.textContent;
        if (cnMode) {
            if (sub) sub.textContent = '(mini-dramas DELE · 学西班牙语)';
            if (intro) intro.textContent = 'Leé un diálogo al nivel DELE de tu examen, escuchalo con la voz 🇪🇸 y practicá con ejercicios de completar. Dos pistas — 🏫 Escolares (A1 a B1) y 🇦🇷 Argentina (A1 a C2) — con niveles separados. Elegí pista y nivel con los chips; el contador te dice cuántos dramas hay.';
        } else {
            if (sub && SUB_ORIG !== null) sub.textContent = SUB_ORIG;
            if (intro && INTRO_ORIG !== null) intro.textContent = INTRO_ORIG;
        }
    }
    // v9.31: ¿estamos en modo español (cn-es)? Señal fuerte: app.js OCULTA
    // #btn-play-es con .hidden-force al estar en es-cn. Si aún no dio señal
    // (arranque: el DOMContentLoaded de app.js corre después del nuestro),
    // se usa el modo guardado en localStorage como pista — así el panel
    // nace DELE-only desde el primer cuadro, sin flasheo de las lecciones
    // de chino (petición del usuario: "en modo español que se vea solo
    // las de DELE"). Sin storage y sin señal → es-cn (default de la app).
    const MODE_KEY = 'chino-espanol-app-v2';
    function storedModeHint() {
        try {
            const st = JSON.parse(localStorage.getItem(MODE_KEY) || '{}');
            if (st && st.mode === 'cn-es') return true;
            if (st && st.mode === 'es-cn') return false;
        } catch (e) { }
        return null;
    }
    function cnModeNow() {
        const esBtn = $('btn-play-es');
        if (esBtn && esBtn.classList.contains('hidden-force')) return false; // app.js: es-cn
        const hint = storedModeHint();
        return hint === null ? false : hint;
    }
    function applyMode() {
        const wrap = $('dele-wrap');
        if (!wrap) return;
        const cnMode = cnModeNow();
        const ll = $('lesson-levels'), lst = $('lesson-list');
        const panel = $('panel-lessons');
        if (cnMode) {
            wrap.classList.remove('hidden');
            // v9.32: .hidden NO alcanzaba — .lesson-levels/.lesson-list definen
            // display:flex MÁS ABAJO en style.css (3694/3702) que .hidden (410);
            // misma especificidad → gana la última y las lecciones de chino
            // quedaban visibles ("se siguen viendo las chinas", report v9.31).
            // Fix doble: .hidden-force (display:none !important, convención de
            // app.js) + clase 'dele-only' a nivel de panel (cinturón y tirantes:
            // sobrevive a que app.js re-cree los hijos con renderList/boot).
            if (ll) ll.classList.add('hidden-force');
            if (lst) lst.classList.add('hidden-force');
            if (panel) panel.classList.add('dele-only');
            swapPanelTexts(true);
        } else {
            wrap.classList.add('hidden');
            if (ll) ll.classList.remove('hidden-force');
            if (lst) lst.classList.remove('hidden-force');
            if (panel) panel.classList.remove('dele-only');
            swapPanelTexts(false);
            stopSpeak(); // por si quedó sonando un drama
        }
    }
    function injectPanel() {
        const panel = $('panel-lessons');
        if (!panel || $('dele-wrap')) return;
        const wrap = document.createElement('div');
        wrap.id = 'dele-wrap';
        wrap.className = 'hidden'; // se muestra solo en cn-es (applyMode)
        wrap.innerHTML =
            '<div class="lesson-levels dele-tracks-row" id="dele-tracks" role="group" aria-label="Filtrar por pista">' +
            '<span id="dele-count" class="dele-count" aria-live="polite"></span>' +
            '</div>' +
            '<div class="lesson-levels" id="dele-levels" role="group" aria-label="Filtrar por nivel DELE"></div>' +
            '<div class="lesson-list" id="dele-list" data-level="all"></div>';
        // v9.32: ARRIBA del bloque chino (después del intro) y no al final —
        // report v9.31: "los chips de lecciones en español quedaron todos
        // abajo". Con appendChild el wrap nacía bajo #lesson-list.
        const llFirst = $('lesson-levels');
        if (llFirst && llFirst.parentNode === panel) panel.insertBefore(wrap, llFirst);
        else panel.appendChild(wrap);
        renderTrackChips();
        renderChips();
        renderList();
        bindList();
        applyMode(); // v9.31: estado correcto desde el primer cuadro (sin esperar app.js)
    }
    function injectStyles() {
        if ($('dele-styles')) return;
        const st = document.createElement('style');
        st.id = 'dele-styles';
        st.textContent = [
            '.dl-line{display:flex;gap:10px;align-items:flex-start;padding:9px 2px;border-bottom:1px dashed rgba(100,116,139,.25)}',
            '.dl-line .lq-line-say{flex:0 0 auto}',
            '.dl-line-body{flex:1;min-width:0}',
            '.dl-who{font-size:.72rem;font-weight:700;color:var(--primary,#2563eb);margin-bottom:1px}',
            '.dl-sp{font-size:1.02rem;line-height:1.45;color:var(--text,#0f172a)}',
            '.dl-zh{font-size:.86rem;color:#64748b;margin-top:2px}',
            '.dl-title-es{font-size:1.05rem}',
            '.dl-title-zh{font-size:.85rem}',
            '.dl-blurb-zh{font-size:.85rem;color:#64748b;margin-top:-6px}',
            '.dl-quiz-tag{font-size:.78rem;font-weight:700;color:#64748b;margin-bottom:6px}',
            '.dl-quiz-zh{font-size:.9rem;color:#475569;margin-bottom:8px}',
            '.dl-quiz-sentence{font-size:1.22rem;line-height:1.5;font-weight:600;margin-bottom:14px}',
            '.dl-opts{display:flex;flex-direction:column;gap:10px}',
            '.dl-opt{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;text-align:left;padding:11px 14px;border:1.5px solid rgba(100,116,139,.35);border-radius:12px;background:#fff;cursor:pointer;font-size:1rem}',
            '.dl-opt b{font-weight:700}',
            '.dl-opt span{font-size:.82rem;color:#64748b}',
            '.dl-opt.ok{border-color:#16a34a;background:#f0fdf4}',
            '.dl-opt.bad{border-color:var(--danger,#dc2626);background:#fef2f2}',
            '.dl-fb{margin-top:12px;padding:10px 12px;border-radius:10px;font-size:.95rem}',
            '.dl-fb.ok{background:#f0fdf4;color:#166534}',
            '.dl-fb.bad{background:#fef2f2;color:#991b1b}',
            '.dl-actions{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}',
            '.dl-score{font-size:3rem;font-weight:800;text-align:center;margin:18px 0 4px}',
            '.dl-score span{font-size:1.2rem;color:#64748b}',
            '.dl-end-msg{text-align:center;color:#475569;margin-bottom:8px}',
            'body.dark-mode .dl-opt{background:#1e293b;border-color:rgba(148,163,184,.3)}',
            'body.dark-mode .dl-sp{color:#e2e8f0}',
            'body.dark-mode .dl-opt.ok{background:#052e16}',
            'body.dark-mode .dl-opt.bad{background:#450a0a}',
            'body.dark-mode .dl-fb.ok{background:#052e16;color:#bbf7d0}',
            'body.dark-mode .dl-fb.bad{background:#450a0a;color:#fecaca}',
            // v9.31: fila de pistas + estado vacío
            '.dele-tracks-row{margin-bottom:6px}',
            '.dele-tracks-row .lv-chip{opacity:.92}',
            // v9.33: contador de resultados a la derecha de la fila de pistas
            '.dele-tracks-row{align-items:center}',
            '.dele-count{margin-left:auto;font-size:.78rem;font-weight:600;color:#64748b;white-space:nowrap}',
            'body.dark-mode .dele-count{color:#94a3b8}',
            '.dl-empty{padding:18px 10px;text-align:center;color:#64748b;font-size:.92rem;border:1.5px dashed rgba(100,116,139,.35);border-radius:12px;margin-top:4px}',
            'body.dark-mode .dl-empty{color:#94a3b8;border-color:rgba(148,163,184,.3)}',
            // v9.32: ocultación a nivel de panel — gana al display:flex de
            // .lesson-levels/.lesson-list aunque app.js re-cree los hijos
            '#panel-lessons.dele-only #lesson-levels,' +
            '#panel-lessons.dele-only #lesson-list{display:none !important}'
        ].join('\n');
        document.head.appendChild(st);
    }
    function watchMode() {
        // app.js re-monta la visibilidad de los botones de audio en cada
        // setMode() → observer sobre la clase de #btn-play-es (patrón onboarding.js)
        try {
            const es = $('btn-play-es');
            if (es && typeof MutationObserver !== 'undefined') {
                new MutationObserver(applyMode).observe(es, { attributes: true, attributeFilter: ['class'] });
            }
            // sync inicial diferido: el DOMContentLoaded de app.js corre después
            setTimeout(applyMode, 400);
            setTimeout(applyMode, 1500);
        } catch (e) { /* cosmético */ }
    }

    // ── boot ──
    function init() {
        injectStyles();
        injectPanel();
        injectOverlay();
        watchMode();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // exports para tests/QA (sin efecto en la UI)
    window.DeleDebug = {
        data: DRAMAS,
        state: S,
        progOf: progOf,
        applyMode: applyMode,
        renderList: renderList,
        // v9.31: ganchos de test para la cola ▶️ y el filtro de modo
        playAll: playAll,
        speakEs: speakEs,
        queue: function () { return { q: dQueue, i: dQIdx }; },
        cnModeNow: cnModeNow
    };
})();
