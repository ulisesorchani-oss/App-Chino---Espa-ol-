// ═══════════════════════════════════════════════════════════════════
// lessons-dele.js — v9.30 · MINI-DRAMAS DELE (aprendices de español)
// -------------------------------------------------------------------
// Espejo escolar de lessons-tocfl.js: mini-dramas graduados por el
// DELE (Diploma de Español como Lengua Extranjera) para el modo cn-es
// (chino → español), pista Escolares — la misma que ya ofrece el
// dropdown DELE de oraciones diarias (DELE-A1-Escolares,
// DELE-A2B1-Escolares).
//   · DELE A1 Escolares        → dramas de vida escolar básica
//   · DELE A2/B1 Escolares     → mismos ámbitos, más gramática
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
        // 4 · 🚌 La excursión al museo — DELE A2/B1 Escolares
        //     tener que + hay que, poder, pretérito (pude)
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2-excursion',
            dele: 'A2/B1', track: 'Escolares',
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
        // 5 · 🩹 En la enfermería — DELE A2/B1 Escolares
        //     doler, sentirse, el cuerpo, consejos (toma/descansa)
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2-enfermeria',
            dele: 'A2/B1', track: 'Escolares',
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
        // 6 · 🎤 El festival de talento — DELE A2/B1 Escolares
        //     opinions (creo que), ir a + infinitivo, condición
        // ─────────────────────────────────────────────────────────
        {
            id: 'dele-a2b1-talento',
            dele: 'A2/B1', track: 'Escolares',
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

    // ── TTS español: mismos motores globales de app.js con guardas ──
    // (este archivo carga ANTES de app.js: los globals solo se tocan al
    // hacer clic, cuando app.js ya existe; fallback voz del sistema)
    let dAudio = null, dTok = 0;
    let dPlay = { text: '', btn: null, state: 'idle' }; // 'idle' | 'playing' | 'paused'
    let dQueue = null, dQIdx = 0;   // reproducción continua (▶️ Escuchar todo)

    function setSayIcon(btn, st) {
        if (!btn) return;
        btn.textContent = st === 'playing' ? '⏸' : (st === 'paused' ? '▶️' : '🔊');
    }
    function stopSpeak() {
        dTok++; // invalida respuestas TTS en vuelo
        dQueue = null; dQIdx = 0;
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
        stopSpeak();
        dTok = myTok; // stopSpeak lo avanzó: restaurar el token de ESTA lectura
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
                if (dQueue && dQIdx < dQueue.length) { playQueueStep(); return; } // ▶️ continua
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
                if (dQueue && dQIdx < dQueue.length) { playQueueStep(); return; }
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
    const DELE_ORDER = ['A1', 'A2/B1'];
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
            b.setAttribute('aria-label', 'Filtrar mini-dramas ' + label);
            chips.appendChild(b);
        };
        mk('Todo', 'all');
        const lvls = [];
        DRAMAS.forEach(d => { if (lvls.indexOf(d.dele) === -1) lvls.push(d.dele); });
        lvls.sort((a, b) => {
            const ia = DELE_ORDER.indexOf(a), ib = DELE_ORDER.indexOf(b);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
        lvls.forEach(v => mk(levelLabel(v), v));
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
        DRAMAS.filter(d => curLevel === 'all' || d.dele === curLevel).forEach(d => {
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
            if (!chip) return;
            curLevel = chip.dataset.level;
            renderChips();
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
            if (say) speakEs(say.dataset.say, say);
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
            if (intro) intro.textContent = 'Leé un diálogo corto al nivel DELE de tu examen, escuchalo con la voz 🇪🇸 y practicá con ejercicios de completar. Niveles A1 y A2/B1 (Escolares), el mismo camino que tus oraciones diarias.';
        } else {
            if (sub && SUB_ORIG !== null) sub.textContent = SUB_ORIG;
            if (intro && INTRO_ORIG !== null) intro.textContent = INTRO_ORIG;
        }
    }
    function applyMode() {
        const wrap = $('dele-wrap');
        if (!wrap) return;
        const esBtn = $('btn-play-es');
        const cnMode = esBtn ? !esBtn.classList.contains('hidden-force') : false;
        const ll = $('lesson-levels'), lst = $('lesson-list');
        if (cnMode) {
            wrap.classList.remove('hidden');
            if (ll) ll.classList.add('hidden');
            if (lst) lst.classList.add('hidden');
            swapPanelTexts(true);
        } else {
            wrap.classList.add('hidden');
            if (ll) ll.classList.remove('hidden');
            if (lst) lst.classList.remove('hidden');
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
            '<div class="lesson-levels" id="dele-levels" role="group" aria-label="Filtrar por nivel DELE"></div>' +
            '<div class="lesson-list" id="dele-list" data-level="all"></div>';
        panel.appendChild(wrap);
        renderChips();
        renderList();
        bindList();
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
            'body.dark-mode .dl-fb.bad{background:#450a0a;color:#fecaca}'
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
        renderList: renderList
    };
})();
