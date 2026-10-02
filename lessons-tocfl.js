// ═══════════════════════════════════════════════════════════════════
// lessons-tocfl.js — v1.0 (2026-09-10) · LECCIONES TOCFL 華語文能力測驗
// -------------------------------------------------------------------
// Mini-dramas alineados al TOCFL (Test of Chinese as a Foreign Language,
// examen oficial de Taiwán) con vocabulario y situaciones de Taiwán:
// 夜市, 捷運, 悠遊卡, 螢幕, 保修...
//  · TOCFL 入門/基礎級 (A2) ≈ HSK 2  → hsk: 2 (aparece con el filtro HSK 2)
//  · TOCFL 進階級 (B1)      ≈ HSK 4  → hsk: 4 (filtro HSK 4)
// Es ARCHIVO ADITIVO: concatena sus lecciones a window.GRADED_LESSONS
// (definido por lessons.js). No modifica nada existente. Cargarlo
// DESPUÉS de lessons.js y ANTES de app.js.
// Esquema por lección (contrato de app.js v9.x):
//   { id, hsk, exam, examLvl, emoji, titleZh, titleZhT, titleEs, blurb,
//     lines: [{ zh, zhT, es }],
//     quiz:  [{ zh (con ___), zhT (con ___), es,
//               opts: [{z, t, p, e, a?} × 3] }]  → opts[0] = correcta }
// ═══════════════════════════════════════════════════════════════════
(function () {
    'use strict';
    var TOCFL_LESSONS = [

    // ─────────────────────────────────────────────────────────────
    // 1 · 夜市小吃 — TOCFL 入門/基礎 A2 (≈HSK 2) · comida y precios
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-a2-yeshi',
        hsk: 2, exam: 'TOCFL', examLvl: 'A2',
        emoji: '🧋',
        titleZh: '夜市小吃',
        titleZhT: '夜市小吃',
        titleEs: 'De paseo por el mercado nocturno',
        blurb: 'Martina y su amiga taiwanesa van al 士林夜市: pollo frito, té con perlas y juegos. Comida, precios y gustos — vocabulario básico del TOCFL.',
        lines: [
            { zh: '今天晚上，玛蒂娜和小林一起去逛夜市。', zhT: '今天晚上，瑪蒂娜和小林一起去逛夜市。', es: 'Esta noche, Martina y Xiaolin van juntas a pasear por el mercado nocturno.' },
            { zh: '玛蒂娜：哇，人真多！我闻到好香的鸡排味。', zhT: '瑪蒂娜：哇，人真多！我聞到好香的雞排味。', es: 'Martina: ¡Guau, cuánta gente! Siento un rico olor a pollo frito.' },
            { zh: '小林：这是士林夜市最有名的盐酥鸡，我请客！', zhT: '小林：這是士林夜市最有名的鹹酥雞，我請客！', es: 'Xiaolin: Este es el pollo frito más famoso del mercado de Shilin, ¡invito yo!' },
            { zh: '玛蒂娜：太好了！我要一个小的，可以少放一点辣吗？', zhT: '瑪蒂娜：太好了！我要一個小的，可以少放一點辣嗎？', es: 'Martina: ¡Genial! Quiero uno chico, ¿puede ponerle menos picante?' },
            { zh: '老板：没问题。要不要加九层塔？很香哦。', zhT: '老闆：沒問題。要不要加九層塔？很香哦。', es: 'Vendedor: Sin problema. ¿Le agrego albahaca? Es muy aromática.' },
            { zh: '玛蒂娜：好，加一点。老板，多少钱？', zhT: '瑪蒂娜：好，加一點。老闆，多少錢？', es: 'Martina: Sí, un poco. Señor, ¿cuánto cuesta?' },
            { zh: '老板：小的六十块，大的九十块。', zhT: '老闆：小的六十塊，大的九十塊。', es: 'Vendedor: El chico sesenta dólares (NT$), el grande noventa.' },
            { zh: '小林：我们两个都买小的，再拿两杯珍珠奶茶。', zhT: '小林：我們兩個都買小的，再拿兩杯珍珠奶茶。', es: 'Xiaolin: Compremos los dos chicos, y llevamos también dos tés de leche con perlas.' },
            { zh: '玛蒂娜：珍珠奶茶是甜的还是不甜的？', zhT: '瑪蒂娜：珍珠奶茶是甜的還是不甜的？', es: 'Martina: ¿El té de leche con perlas es dulce o no?' },
            { zh: '小林：有点甜。你可以选糖和冰的多少。', zhT: '小林：有點甜。你可以選糖和冰的多少。', es: 'Xiaolin: Es un poco dulce. Puedes elegir cuánto azúcar y hielo llevar.' },
            { zh: '玛蒂娜：那我要半糖、少冰，谢谢！', zhT: '瑪蒂娜：那我要半糖、少冰，謝謝！', es: 'Martina: Entonces quiero media azúcar y poco hielo, ¡gracias!' },
            { zh: '小林：吃饱了，我们去玩套圈圈好吗？', zhT: '小林：吃飽了，我們去玩套圈圈好嗎？', es: 'Xiaolin: Ya estamos llenos, ¿jugamos al aro?' },
            { zh: '玛蒂娜：下次吧，今天我想早点回去写作业。', zhT: '瑪蒂娜：下次吧，今天我想早點回去寫作業。', es: 'Martina: La próxima; hoy quiero volver temprano para escribir la tarea.' }
        ],
        quiz: [
            { zh: '今天晚上，玛蒂娜和小林一起去___夜市。', zhT: '今天晚上，瑪蒂娜和小林一起去___夜市。', es: 'Esta noche, Martina y Xiaolin van juntas a pasear por el mercado nocturno.',
              opts: [
                { z: '逛', t: '逛', p: 'guàng', e: 'Pasear, recorrer', a: ['Dar una vuelta'] },
                { z: '买', t: '買', p: 'mǎi', e: 'Comprar' },
                { z: '看', t: '看', p: 'kàn', e: 'Mirar, ver' } ] },
            { zh: '哇，我___到好香的鸡排味！', zhT: '哇，我___到好香的雞排味！', es: '¡Guau, siento un rico olor a pollo frito!',
              opts: [
                { z: '闻', t: '聞', p: 'wén', e: 'Oler' },
                { z: '听', t: '聽', p: 'tīng', e: 'Escuchar' },
                { z: '吃', t: '吃', p: 'chī', e: 'Comer' } ] },
            { zh: '这是我的生日，今天我___客！', zhT: '這是我的生日，今天我___客！', es: '¡Es mi cumpleaños, hoy invito yo!',
              opts: [
                { z: '请', t: '請', p: 'qǐng', e: 'Invitar', a: ['Por favor'] },
                { z: '谢', t: '謝', p: 'xiè', e: 'Agradecer' },
                { z: '打', t: '打', p: 'dǎ', e: 'Golpear', a: ['Hacer (una llamada)'] } ] },
            { zh: '这个菜太___了，我不能吃。', zhT: '這個菜太___了，我不能吃。', es: 'Este plato es muy picante, no puedo comerlo.',
              opts: [
                { z: '辣', t: '辣', p: 'là', e: 'Picante' },
                { z: '甜', t: '甜', p: 'tián', e: 'Dulce' },
                { z: '咸', t: '鹹', p: 'xián', e: 'Salado' } ] },
            { zh: '老板，这两杯奶茶一共多___钱？', zhT: '老闆，這兩杯奶茶一共多___錢？', es: 'Señor, ¿cuánto cuestan estos dos tés de leche en total?',
              opts: [
                { z: '多', t: '多', p: 'duō', e: 'Cuánto (多少钱)', a: ['Muchos'] },
                { z: '很', t: '很', p: 'hěn', e: 'Muy' },
                { z: '太', t: '太', p: 'tài', e: 'Demasiado' } ] },
            { zh: '我要___糖、少冰，谢谢！', zhT: '我要___糖、少冰，謝謝！', es: 'Quiero media azúcar y poco hielo, ¡gracias!',
              opts: [
                { z: '半', t: '半', p: 'bàn', e: 'Medio', a: ['Mitad'] },
                { z: '一', t: '一', p: 'yī', e: 'Uno' },
                { z: '双', t: '雙', p: 'shuāng', e: 'Par, doble' } ] },
            { zh: '我最喜欢的饮料是___奶茶。', zhT: '我最喜歡的飲料是___奶茶。', es: 'Mi bebida favorita es el té de leche con perlas.',
              opts: [
                { z: '珍珠', t: '珍珠', p: 'zhēnzhū', e: 'Perla (té de perlas)' },
                { z: '珍贵', t: '珍貴', p: 'zhēnguì', e: 'Valioso' },
                { z: '真的', t: '真的', p: 'zhēnde', e: 'Verdadero, de verdad' } ] },
            { zh: '两杯珍珠奶茶一共一百___。', zhT: '兩杯珍珠奶茶一共一百___。', es: 'Dos tés de leche con perlas cuestan cien dólares en total.',
              opts: [
                { z: '块', t: '塊', p: 'kuài', e: 'Dólar (NT$, coloquial)', a: ['Pedazo'] },
                { z: '个', t: '個', p: 'gè', e: 'Clasificador general' },
                { z: '杯', t: '杯', p: 'bēi', e: 'Vaso; clasificador de vasos' } ] },
            { zh: '今天我想早点回去___作业。', zhT: '今天我想早點回去___作業。', es: 'Hoy quiero volver temprano para escribir la tarea.',
              opts: [
                { z: '写', t: '寫', p: 'xiě', e: 'Escribir' },
                { z: '玩', t: '玩', p: 'wán', e: 'Jugar', a: ['Divertirse'] },
                { z: '买', t: '買', p: 'mǎi', e: 'Comprar' } ] },
            { zh: '奶茶___甜，可是很好喝。', zhT: '奶茶___甜，可是很好喝。', es: 'El té de leche es un poco dulce, pero está muy rico.',
              opts: [
                { z: '有点', t: '有點', p: 'yǒudiǎn', e: 'Un poco (de algo no deseado)', a: ['Algo'] },
                { z: '一点', t: '一點', p: 'yìdiǎn', e: 'Un poquito (de cantidad)' },
                { z: '很多', t: '很多', p: 'hěnduō', e: 'Mucho' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 2 · 第一次坐捷運 — TOCFL 入門/基礎 A2 (≈HSK 2) · transporte
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-a2-jieyun',
        hsk: 2, exam: 'TOCFL', examLvl: 'A2',
        emoji: '🚇',
        titleZh: '第一次坐捷运',
        titleZhT: '第一次坐捷運',
        titleEs: 'Primera vez en el metro (MRT)',
        blurb: 'David viaja solo en el 捷運 de Taipéi por primera vez: pregunta cómo llegar a 淡水, compra una 悠遊卡 y aprende a hacer transbordo.',
        lines: [
            { zh: '这个星期六，大卫第一次自己坐台北的捷运。', zhT: '這個星期六，大衛第一次自己坐台北的捷運。', es: 'Este sábado, David toma por primera vez solo el metro de Taipéi.' },
            { zh: '大卫：请问，去淡水是在这边等车吗？', zhT: '大衛：請問，去淡水是在這邊等車嗎？', es: 'David: Disculpe, ¿para ir a Tamsui se espera el tren por acá?' },
            { zh: '服务员：不是，你要先坐到台北车站，然后换红线。', zhT: '服務員：不是，你要先坐到台北車站，然後換紅線。', es: 'Empleado: No; primero ve hasta la estación de Taipéi y después cambia a la línea roja.' },
            { zh: '大卫：换车要出站再进站吗？', zhT: '大衛：換車要出站再進站嗎？', es: 'David: ¿Para cambiar de tren hay que salir y volver a entrar?' },
            { zh: '服务员：不用，在里面跟着指示走就可以了。', zhT: '服務員：不用，在裡面跟著指示走就可以了。', es: 'Empleado: No; adentro, sigue las indicaciones y listo.' },
            { zh: '大卫：车票多少钱？我可以刷卡吗？', zhT: '大衛：車票多少錢？我可以刷卡嗎？', es: 'David: ¿Cuánto cuesta el boleto? ¿Puedo pagar con tarjeta?' },
            { zh: '服务员：用悠游卡比较方便，加一百块可以用很久。', zhT: '服務員：用悠遊卡比較方便，加一百塊可以用很久。', es: 'Empleado: Con la EasyCard es más cómodo; con cien dólares viajas un buen rato.' },
            { zh: '大卫：好，请给我一张悠游卡。', zhT: '大衛：好，請給我一張悠遊卡。', es: 'David: Bien, deme una EasyCard, por favor.' },
            { zh: '大卫进了车站，先看了看地图。', zhT: '大衛進了車站，先看了看地圖。', es: 'David entra a la estación y primero mira el mapa.' },
            { zh: '大卫：哦，我明白了：先坐蓝线，四个站，再换红线。', zhT: '大衛：哦，我明白了：先坐藍線，四個站，再換紅線。', es: 'David: Ah, entiendo: primero la línea azul, cuatro estaciones, y cambio a la roja.' },
            { zh: '十五分钟以后，大卫上了去淡水的车。', zhT: '十五分鐘以後，大衛上了去淡水的車。', es: 'Quince minutos después, David sube al tren hacia Tamsui.' },
            { zh: '大卫：台北的捷运真快，下次我还想坐！', zhT: '大衛：台北的捷運真快，下次我還想坐！', es: 'David: ¡El metro de Taipéi es rapidísimo, la próxima quiero viajar de nuevo!' }
        ],
        quiz: [
            { zh: '你要先___到台北车站，然后换红线。', zhT: '你要先___到台北車站，然後換紅線。', es: 'Primero viaja hasta la estación de Taipéi y después cambia a la línea roja.',
              opts: [
                { z: '坐', t: '坐', p: 'zuò', e: 'Tomar (transporte)', a: ['Sentarse'] },
                { z: '走', t: '走', p: 'zǒu', e: 'Caminar', a: ['Irse'] },
                { z: '跑', t: '跑', p: 'pǎo', e: 'Correr' } ] },
            { zh: '先坐到台北车站，然后___红线。', zhT: '先坐到台北車站，然後___紅線。', es: 'Primero llega a la estación de Taipéi y después cambia a la línea roja.',
              opts: [
                { z: '换', t: '換', p: 'huàn', e: 'Cambiar, hacer transbordo', a: ['Intercambiar'] },
                { z: '打', t: '打', p: 'dǎ', e: 'Golpear', a: ['Hacer (una llamada)'] },
                { z: '拿', t: '拿', p: 'ná', e: 'Tomar, llevar en la mano' } ] },
            { zh: '在里面跟着___走就可以了。', zhT: '在裡面跟著___走就可以了。', es: 'Adentro basta con seguir las indicaciones.',
              opts: [
                { z: '指示', t: '指示', p: 'zhǐshì', e: 'Indicaciones, señales' },
                { z: '电脑', t: '電腦', p: 'diànnǎo', e: 'Computadora' },
                { z: '电视', t: '電視', p: 'diànshì', e: 'Televisor' } ] },
            { zh: '用悠游卡比较___。', zhT: '用悠遊卡比較___。', es: 'Con la EasyCard es más práctico.',
              opts: [
                { z: '方便', t: '方便', p: 'fāngbiàn', e: 'Cómodo, práctico' },
                { z: '高兴', t: '高興', p: 'gāoxìng', e: 'Alegre, contento' },
                { z: '便宜', t: '便宜', p: 'piányi', e: 'Barato' } ] },
            { zh: '我要买___报纸，在哪儿拿？', zhT: '我要買___報紙，在哪兒拿？', es: 'Quiero comprar un (ejemplar de) periódico, ¿dónde lo tomo?',
              opts: [
                { z: '一张', t: '一張', p: 'yì zhāng', e: 'Una (para cosas planas: papel, boleto)' },
                { z: '一本', t: '一本', p: 'yì běn', e: 'Una (para libros, cuadernos)' },
                { z: '一条', t: '一條', p: 'yì tiáo', e: 'Una (para cosas largas)' } ] },
            { zh: '车票多少钱？我可以___卡吗？', zhT: '車票多少錢？我可以___卡嗎？', es: '¿Cuánto cuesta el boleto? ¿Puedo pagar con tarjeta?',
              opts: [
                { z: '刷', t: '刷', p: 'shuā', e: 'Pasar (tarjeta), pagar con tarjeta' },
                { z: '画', t: '畫', p: 'huà', e: 'Dibujar' },
                { z: '写', t: '寫', p: 'xiě', e: 'Escribir' } ] },
            { zh: '十五分钟___，大卫上了去淡水的车。', zhT: '十五分鐘___，大衛上了去淡水的車。', es: 'Quince minutos después, David sube al tren hacia Tamsui.',
              opts: [
                { z: '以后', t: '以後', p: 'yǐhòu', e: 'Después (de)', a: ['Más adelante'] },
                { z: '以前', t: '以前', p: 'yǐqián', e: 'Antes (de)' },
                { z: '现在', t: '現在', p: 'xiànzài', e: 'Ahora' } ] },
            { zh: '先坐蓝线，四___，再换红线。', zhT: '先坐藍線，四___，再換紅線。', es: 'Primero la línea azul, cuatro estaciones, y cambio a la roja.',
              opts: [
                { z: '个站', t: '個站', p: 'gè zhàn', e: 'Estaciones (de tren/metro)' },
                { z: '条路', t: '條路', p: 'tiáo lù', e: 'Caminos, calles' },
                { z: '个号', t: '個號', p: 'gè hào', e: 'Números' } ] },
            { zh: '台北的捷运真___，下次我还想坐！', zhT: '台北的捷運真___，下次我還想坐！', es: '¡El metro de Taipéi es rapidísimo, la próxima quiero viajar de nuevo!',
              opts: [
                { z: '快', t: '快', p: 'kuài', e: 'Rápido', a: ['Pronto'] },
                { z: '慢', t: '慢', p: 'màn', e: 'Lento' },
                { z: '远', t: '遠', p: 'yuǎn', e: 'Lejos' } ] },
            { zh: '好，请___我一张悠游卡。', zhT: '好，請___我一張悠遊卡。', es: 'Bien, deme una EasyCard, por favor.',
              opts: [
                { z: '给', t: '給', p: 'gěi', e: 'Dar, entregar' },
                { z: '拿', t: '拿', p: 'ná', e: 'Tomar (uno mismo)' },
                { z: '借', t: '借', p: 'jiè', e: 'Prestar; pedir prestado' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 3 · 開學第一天 — TOCFL 進階級 B1 (≈HSK 4) · universidad
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-b1-kaihue',
        hsk: 4, exam: 'TOCFL', examLvl: 'B1',
        emoji: '🏫',
        titleZh: '开学第一天',
        titleZhT: '開學第一天',
        titleEs: 'El primer día de clases',
        blurb: 'Ana elige sus materias del semestre en la universidad: créditos, horarios que chocan y un curso de expresión oral exigente. Vocabulario académico del TOCFL 進階級.',
        lines: [
            { zh: '九月一号是林安娜开学第一天，她有点紧张。', zhT: '九月一號是林安娜開學第一天，她有點緊張。', es: 'El primero de septiembre es el primer día de clases de Ana; está un poco nerviosa.' },
            { zh: '她是语言系一年级的学生，主修中文。', zhT: '她是語言系一年級的學生，主修中文。', es: 'Es estudiante de primer año de la carrera de lenguas, con especialización en chino.' },
            { zh: '她的朋友高伟说：别担心，选课很容易。', zhT: '她的朋友高偉說：別擔心，選課很容易。', es: 'Su amigo Gao Wei le dice: no te preocupes, elegir materias es fácil.' },
            { zh: '高伟：你先看看这门课的教授怎么样，再决定。', zhT: '高偉：你先看看這門課的教授怎麼樣，再決定。', es: 'Gao Wei: Primero mira cómo es el profesor de cada materia y después decide.' },
            { zh: '安娜：我想选口语课，可是时间跟听力课一样。', zhT: '安娜：我想選口語課，可是時間跟聽力課一樣。', es: 'Ana: Quiero elegir el curso de expresión oral, pero el horario coincide con el de comprensión auditiva.' },
            { zh: '高伟：那你的学分够吗？一学期至少要十个学分。', zhT: '高偉：那你的學分夠嗎？一學期至少要十個學分。', es: 'Gao Wei: ¿Y te alcanzan los créditos? Cada semestre necesitas al menos diez.' },
            { zh: '安娜：够了。我上学期已经拿了十二个学分。', zhT: '安娜：夠了。我上學期已經拿了十二個學分。', es: 'Ana: Me alcanzan. El semestre pasado ya conseguí doce créditos.' },
            { zh: '高伟：口语课的作业多不多？', zhT: '高偉：口語課的作業多不多？', es: 'Gao Wei: ¿El curso oral tiene mucha tarea?' },
            { zh: '安娜：每个星期要录音、写短文，还要准备期中报告。', zhT: '安娜：每個星期要錄音、寫短文，還要準備期中報告。', es: 'Ana: Cada semana hay que grabar audio, escribir textos cortos y preparar un informe a mitad de semestre.' },
            { zh: '高伟：听起来不少，不过你的口语真的会进步。', zhT: '高偉：聽起來不少，不過你的口語真的會進步。', es: 'Gao Wei: Suena a mucho, pero tu expresión oral de verdad va a mejorar.' },
            { zh: '安娜：对，我还是选吧。老师说，练习最重要。', zhT: '安娜：對，我還是選吧。老師說，練習最重要。', es: 'Ana: Sí, me anoto igual. La profesora dice que practicar es lo más importante.' },
            { zh: '下课以后，两个朋友一起去食堂吃饭，聊了很久。', zhT: '下課以後，兩個朋友一起去食堂吃飯，聊了很久。', es: 'Después de clase, los dos amigos van juntos al comedor y conversan un buen rato.' }
        ],
        quiz: [
            { zh: '开学第一天，她有点___。', zhT: '開學第一天，她有點___。', es: 'El primer día de clases está un poco nerviosa.',
              opts: [
                { z: '紧张', t: '緊張', p: 'jǐnzhāng', e: 'Nerviosa, tensa', a: ['Ansiosa'] },
                { z: '生气', t: '生氣', p: 'shēngqì', e: 'Enojada' },
                { z: '高兴', t: '高興', p: 'gāoxìng', e: 'Contenta' } ] },
            { zh: '她是语言系一年___的学生。', zhT: '她是語言系一年___的學生。', es: 'Es estudiante de primer año de la carrera de lenguas.',
              opts: [
                { z: '级', t: '級', p: 'jí', e: 'Año, grado (一年级 = primer año)' },
                { z: '期', t: '期', p: 'qī', e: 'Período, semestre' },
                { z: '班', t: '班', p: 'bān', e: 'Clase, grupo' } ] },
            { zh: '你先看看教授怎么样，再___。', zhT: '你先看看教授怎麼樣，再___。', es: 'Primero mira cómo es el profesor y después decide.',
              opts: [
                { z: '决定', t: '決定', p: 'juédìng', e: 'Decidir, decidirse' },
                { z: '准备', t: '準備', p: 'zhǔnbèi', e: 'Preparar' },
                { z: '开始', t: '開始', p: 'kāishǐ', e: 'Comenzar' } ] },
            { zh: '口语课的时间___听力课一样。', zhT: '口語課的時間___聽力課一樣。', es: 'El horario del curso oral coincide con el de comprensión auditiva.',
              opts: [
                { z: '跟', t: '跟', p: 'gēn', e: 'Con (跟…一样 = igual que)', a: ['Seguir a'] },
                { z: '对', t: '對', p: 'duì', e: 'Hacia, correcto' },
                { z: '从', t: '從', p: 'cóng', e: 'Desde' } ] },
            { zh: '一学期至少要十个___。', zhT: '一學期至少要十個___。', es: 'Cada semestre necesitas al menos diez créditos.',
              opts: [
                { z: '学分', t: '學分', p: 'xuéfèn', e: 'Créditos (académicos)' },
                { z: '时间', t: '時間', p: 'shíjiān', e: 'Tiempo' },
                { z: '学生', t: '學生', p: 'xuésheng', e: 'Estudiantes' } ] },
            { zh: '我上学期已经___了十二个学分。', zhT: '我上學期已經___了十二個學分。', es: 'El semestre pasado ya conseguí doce créditos.',
              opts: [
                { z: '拿', t: '拿', p: 'ná', e: 'Conseguir, obtener (拿学分)', a: ['Tomar en la mano'] },
                { z: '吃', t: '吃', p: 'chī', e: 'Comer' },
                { z: '借', t: '借', p: 'jiè', e: 'Prestar; pedir prestado' } ] },
            { zh: '每个星期要录___、写短文。', zhT: '每個星期要錄___、寫短文。', es: 'Cada semana hay que grabar audio y escribir textos cortos.',
              opts: [
                { z: '音', t: '音', p: 'yīn', e: 'Sonido, audio (录音 = grabar)' },
                { z: '机', t: '機', p: 'jī', e: 'Máquina' },
                { z: '电', t: '電', p: 'diàn', e: 'Electricidad' } ] },
            { zh: '还要准备期___报告。', zhT: '還要準備期___報告。', es: 'También hay que preparar el informe de mitad de semestre.',
              opts: [
                { z: '中', t: '中', p: 'zhōng', e: 'Mitad (期中 = parcial de mitades)', a: ['Centro'] },
                { z: '末', t: '末', p: 'mò', e: 'Final (期末 = de fin de semestre)' },
                { z: '间', t: '間', p: 'jiān', e: 'Entre, sala' } ] },
            { zh: '听起来___，不过你的口语真的会进步。', zhT: '聽起來___，不過你的口語真的會進步。', es: 'Suena a bastante, pero tu expresión oral de verdad va a mejorar.',
              opts: [
                { z: '不少', t: '不少', p: 'bùshǎo', e: 'Bastante, no poco' },
                { z: '很少', t: '很少', p: 'hěnshǎo', e: 'Muy poco' },
                { z: '一样', t: '一樣', p: 'yíyàng', e: 'Igual' } ] },
            { zh: '老师说，练习最___。', zhT: '老師說，練習最___。', es: 'La profesora dice que practicar es lo más importante.',
              opts: [
                { z: '重要', t: '重要', p: 'zhòngyào', e: 'Importante' },
                { z: '忙', t: '忙', p: 'máng', e: 'Ocupado' },
                { z: '多', t: '多', p: 'duō', e: 'Mucho, muchos' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 4 · 手機壞了 — TOCFL 進階級 B1 (≈HSK 4) · reparaciones y garantía
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-b1-shouji',
        hsk: 4, exam: 'TOCFL', examLvl: 'B1',
        emoji: '📱',
        titleZh: '手机坏了',
        titleZhT: '手機壞了',
        titleEs: 'El celular se rompió',
        blurb: 'A Marcos se le cae el celular y la pantalla se rompe: taller, presupuesto, regateo amable, garantía y una buena recomendación. Vocabulario del TOCFL 進階級.',
        lines: [
            { zh: '星期三早上，马克的手机摔到地上，屏幕裂了。', zhT: '星期三早上，馬克的手機摔到地上，螢幕裂了。', es: 'El miércoles a la mañana, a Marcos se le cae el celular al piso y la pantalla se agrieta.' },
            { zh: '马克：糟糕！屏幕裂了，什么都看不清楚了。', zhT: '馬克：糟糕！螢幕裂了，什麼都看不清楚了。', es: 'Marcos: ¡Mal! Se agrietó la pantalla, no veo nada con claridad.' },
            { zh: '他记得学校附近有一家修理手机的店。', zhT: '他記得學校附近有一家修理手機的店。', es: 'Recuerda que cerca de la facultad hay un local que repara celulares.' },
            { zh: '店员：您好，手机怎么了？', zhT: '店員：您好，手機怎麼了？', es: 'Vendedor: Hola, ¿qué le pasa al celular?' },
            { zh: '马克：屏幕坏了。请问修一下大概要多少钱？', zhT: '馬克：螢幕壞了。請問修一下大概要多少錢？', es: 'Marcos: Se rompió la pantalla. ¿Cuánto sale más o menos arreglarlo?' },
            { zh: '店员：这个牌子换屏幕八百块，两个小时以后可以拿。', zhT: '店員：這個牌子換螢幕八百塊，兩個小時以後可以拿。', es: 'Vendedor: En esta marca cambiar la pantalla son ochocientos dólares; lo retira en dos horas.' },
            { zh: '马克：八百块？有点贵。可以便宜一点吗？', zhT: '馬克：八百塊？有點貴。可以便宜一點嗎？', es: 'Marcos: ¿Ochocientos? Es bastante caro. ¿No me hace un poco de precio?' },
            { zh: '店员：真的很抱歉，换屏幕的价钱是固定的，不能少。', zhT: '店員：真的很抱歉，換螢幕的價錢是固定的，不能少。', es: 'Vendedor: Lo siento de verdad: el precio del cambio de pantalla es fijo, no se puede bajar.' },
            { zh: '马克：那我的手机还在保修吗？', zhT: '馬克：那我的手機還在保修嗎？', es: 'Marcos: ¿Y mi celular todavía está en garantía?' },
            { zh: '店员：您的手机买了不到一年，可以先回原店问问。', zhT: '店員：您的手機買了不到一年，可以先回原店問問。', es: 'Vendedor: Su celular tiene menos de un año; primero puede consultar en la tienda original.' },
            { zh: '马克：好，谢谢你。如果太贵，我就回原来的店修。', zhT: '馬克：好，謝謝你。如果太貴，我就回原來的店修。', es: 'Marcos: Bien, gracias. Si es muy caro, lo arreglo en la tienda de origen.' },
            { zh: '店员：修好以后，记得给手机加一个保护壳。', zhT: '店員：修好以後，記得給手機加一個保護殼。', es: 'Vendedor: Cuando lo arregle, acuérdese de ponerle una funda protectora.' },
            { zh: '马克：你说得对，我一定买！谢谢您的建议。', zhT: '馬克：你說得對，我一定買！謝謝您的建議。', es: 'Marcos: Tiene razón, ¡seguro la compro! Gracias por el consejo.' }
        ],
        quiz: [
            { zh: '屏幕裂了，什么都看不清___了。', zhT: '螢幕裂了，什麼都看不清___了。', es: 'Se agrietó la pantalla, no veo nada con claridad.',
              opts: [
                { z: '楚', t: '楚', p: 'chǔ', e: 'Claro (看清楚 = ver con claridad)' },
                { z: '处', t: '處', p: 'chù', e: 'Lugar (mismo sonido, otro sentido)' },
                { z: '碰', t: '碰', p: 'pèng', e: 'Tocar, chocar' } ] },
            { zh: '学校附近有一家___手机的店。', zhT: '學校附近有一家___手機的店。', es: 'Cerca de la facultad hay un local que repara celulares.',
              opts: [
                { z: '修理', t: '修理', p: 'xiūlǐ', e: 'Reparar, arreglar' },
                { z: '卖', t: '賣', p: 'mài', e: 'Vender' },
                { z: '借', t: '借', p: 'jiè', e: 'Prestar; pedir prestado' } ] },
            { zh: '请问___一下大概要多少钱？', zhT: '請問___一下大概要多少錢？', es: '¿Cuánto sale más o menos arreglarlo?',
              opts: [
                { z: '修', t: '修', p: 'xiū', e: 'Reparar, arreglar' },
                { z: '看', t: '看', p: 'kàn', e: 'Mirar' },
                { z: '用', t: '用', p: 'yòng', e: 'Usar' } ] },
            { zh: '换屏幕八百块，两个小时以后可以___。', zhT: '換螢幕八百塊，兩個小時以後可以___。', es: 'Cambiar la pantalla son ochocientos dólares; lo retira en dos horas.',
              opts: [
                { z: '拿', t: '拿', p: 'ná', e: 'Retirar, recoger', a: ['Tomar'] },
                { z: '买', t: '買', p: 'mǎi', e: 'Comprar' },
                { z: '给', t: '給', p: 'gěi', e: 'Dar' } ] },
            { zh: '八百块？有点___。可以便宜一点吗？', zhT: '八百塊？有點___。可以便宜一點嗎？', es: '¿Ochocientos? Es bastante caro. ¿No me hace un poco de precio?',
              opts: [
                { z: '贵', t: '貴', p: 'guì', e: 'Caro' },
                { z: '便宜', t: '便宜', p: 'piányi', e: 'Barato' },
                { z: '好', t: '好', p: 'hǎo', e: 'Bueno' } ] },
            { zh: '换屏幕的价钱是___的，不能少。', zhT: '換螢幕的價錢是___的，不能少。', es: 'El precio del cambio de pantalla es fijo, no se puede bajar.',
              opts: [
                { z: '固定', t: '固定', p: 'gùdìng', e: 'Fijo' },
                { z: '便宜', t: '便宜', p: 'piányi', e: 'Barato' },
                { z: '高', t: '高', p: 'gāo', e: 'Alto' } ] },
            { zh: '那我的手机还在保___吗？', zhT: '那我的手機還在保___嗎？', es: '¿Y mi celular todavía está en garantía?',
              opts: [
                { z: '修', t: '修', p: 'xiū', e: '保修 = garantía de reparación' },
                { z: '险', t: '險', p: 'xiǎn', e: '保险 = seguro (otra cosa)' },
                { z: '护', t: '護', p: 'hù', e: '保护 = proteger' } ] },
            { zh: '您的手机买了不到一___，可以先回原店问问。', zhT: '您的手機買了不到一___，可以先回原店問問。', es: 'Su celular tiene menos de un año; puede consultar en la tienda original.',
              opts: [
                { z: '年', t: '年', p: 'nián', e: 'Año' },
                { z: '月', t: '月', p: 'yuè', e: 'Mes' },
                { z: '天', t: '天', p: 'tiān', e: 'Día' } ] },
            { zh: '记得给手机加一个保护___。', zhT: '記得給手機加一個保護___。', es: 'Acuérdese de ponerle una funda protectora al celular.',
              opts: [
                { z: '壳', t: '殼', p: 'ké', e: 'Carcasa, funda (保护壳)' },
                { z: '衣', t: '衣', p: 'yī', e: 'Ropa' },
                { z: '盒', t: '盒', p: 'hé', e: 'Caja' } ] },
            { zh: '你说得对，我一定买！谢谢您的___。', zhT: '你說得對，我一定買！謝謝您的___。', es: 'Tiene razón, ¡seguro la compro! Gracias por el consejo.',
              opts: [
                { z: '建议', t: '建議', p: 'jiànyì', e: 'Consejo, sugerencia' },
                { z: '办法', t: '辦法', p: 'bànfǎ', e: 'Método, solución' },
                { z: '消息', t: '消息', p: 'xiāoxi', e: 'Noticia, aviso' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 5 · 你好，我叫玛丽 — TOCFL 準備級 Prep (≈HSK 1) · presentarse
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-prep-jianjie',
        hsk: 1, exam: 'TOCFL', examLvl: 'Prep',
        emoji: '👋',
        titleZh: '你好，我叫玛丽',
        titleZhT: '你好，我叫瑪麗',
        titleEs: 'Hola, me llamo Mary',
        blurb: 'Mary conoce a un profesor de chino en su primer día: nombre, nacionalidad y una charla muy simple. Vocabulario básico del TOCFL 準備級.',
        lines: [
            { zh: '你好！我叫玛丽。', zhT: '你好！我叫瑪麗。', es: '¡Hola! Me llamo Mary.' },
            { zh: '你好，我姓林。很高兴认识你！', zhT: '你好，我姓林。很高興認識你！', es: 'Hola, mi apellido es Lin. ¡Mucho gusto en conocerte!' },
            { zh: '我也很高兴。你是哪国人？', zhT: '我也很高興。你是哪國人？', es: 'Yo también. ¿De dónde eres?' },
            { zh: '我是美国人，你呢？', zhT: '我是美國人，你呢？', es: 'Soy estadounidense, ¿y tú?' },
            { zh: '我是台湾人。你是学生吗？', zhT: '我是台灣人。你是學生嗎？', es: 'Soy taiwanés. ¿Eres estudiante?' },
            { zh: '是，我是大学生。你的工作是什么？', zhT: '是，我是大學生。你的工作是什麼？', es: 'Sí, soy universitaria. ¿Cuál es tu trabajo?' },
            { zh: '我是老师，我教中文。', zhT: '我是老師，我教中文。', es: 'Soy profesor, enseño chino.' },
            { zh: '太好了！我想学中文。', zhT: '太好了！我想學中文。', es: '¡Qué bien! Quiero aprender chino.' }
        ],
        quiz: [
            { zh: '你好！我___玛丽。', zhT: '你好！我___瑪麗。', es: '¡Hola! Me llamo Mary.',
              opts: [
                { z: '叫', t: '叫', p: 'jiào', e: 'Llamarse' },
                { z: '是', t: '是', p: 'shì', e: 'Ser' },
                { z: '姓', t: '姓', p: 'xìng', e: 'Apellidarse' } ] },
            { zh: '很___认识你！', zhT: '很___認識你！', es: '¡Mucho gusto en conocerte!',
              opts: [
                { z: '高兴', t: '高興', p: 'gāoxìng', e: 'Contento' },
                { z: '漂亮', t: '漂亮', p: 'piàoliang', e: 'Lindo' },
                { z: '忙', t: '忙', p: 'máng', e: 'Ocupado' } ] },
            { zh: '你是___国人？', zhT: '你是___國人？', es: '¿De dónde eres?',
              opts: [
                { z: '哪', t: '哪', p: 'nǎ', e: 'Cuál' },
                { z: '那', t: '那', p: 'nà', e: 'Ese' },
                { z: '这', t: '這', p: 'zhè', e: 'Este' } ] },
            { zh: '我是美国人，你___？', zhT: '我是美國人，你___？', es: 'Soy estadounidense, ¿y tú?',
              opts: [
                { z: '呢', t: '呢', p: 'ne', e: 'Partícula (¿y...?)' },
                { z: '吗', t: '嗎', p: 'ma', e: 'Partícula de pregunta sí/no' },
                { z: '吧', t: '吧', p: 'ba', e: 'Partícula de sugerencia' } ] },
            { zh: '你是___吗？', zhT: '你是___嗎？', es: '¿Eres estudiante?',
              opts: [
                { z: '学生', t: '學生', p: 'xuésheng', e: 'Estudiante' },
                { z: '老师', t: '老師', p: 'lǎoshī', e: 'Profesor' },
                { z: '医生', t: '醫生', p: 'yīshēng', e: 'Médico' } ] },
            { zh: '是，我是___生。', zhT: '是，我是___生。', es: 'Sí, soy universitaria.',
              opts: [
                { z: '大学', t: '大學', p: 'dàxué', e: 'Universidad' },
                { z: '中学', t: '中學', p: 'zhōngxué', e: 'Secundaria' },
                { z: '小学', t: '小學', p: 'xiǎoxué', e: 'Primaria' } ] },
            { zh: '我是老师，我___中文。', zhT: '我是老師，我___中文。', es: 'Soy profesor, enseño chino.',
              opts: [
                { z: '教', t: '教', p: 'jiāo', e: 'Enseñar' },
                { z: '学', t: '學', p: 'xué', e: 'Aprender' },
                { z: '说', t: '說', p: 'shuō', e: 'Hablar' } ] },
            { zh: '太好了！我___学中文。', zhT: '太好了！我___學中文。', es: '¡Qué bien! Quiero aprender chino.',
              opts: [
                { z: '想', t: '想', p: 'xiǎng', e: 'Querer' },
                { z: '会', t: '會', p: 'huì', e: 'Saber (hacer algo)' },
                { z: '能', t: '能', p: 'néng', e: 'Poder' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 6 · 我的一天 — TOCFL 準備級 Prep (≈HSK 1) · familia y rutina
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-prep-wodejia',
        hsk: 1, exam: 'TOCFL', examLvl: 'Prep',
        emoji: '🏠',
        titleZh: '我的一天',
        titleZhT: '我的一天',
        titleEs: 'Mi día',
        blurb: 'Una descripción muy simple de la familia y la rutina diaria — números, horas y gustos básicos del TOCFL 準備級.',
        lines: [
            { zh: '这是我的家。', zhT: '這是我的家。', es: 'Esta es mi familia.' },
            { zh: '爸爸、妈妈、哥哥和我，一家四口。', zhT: '爸爸、媽媽、哥哥和我，一家四口。', es: 'Papá, mamá, mi hermano mayor y yo, somos cuatro en la familia.' },
            { zh: '爸爸是医生，妈妈是老师。', zhT: '爸爸是醫生，媽媽是老師。', es: 'Papá es médico, mamá es profesora.' },
            { zh: '哥哥是大学生，他在台北上学。', zhT: '哥哥是大學生，他在臺北上學。', es: 'Mi hermano es universitario, estudia en Taipéi.' },
            { zh: '我每天早上七点起床。', zhT: '我每天早上七點起床。', es: 'Me levanto todos los días a las siete de la mañana.' },
            { zh: '我喜欢喝咖啡，不喜欢喝茶。', zhT: '我喜歡喝咖啡，不喜歡喝茶。', es: 'Me gusta tomar café, no me gusta el té.' },
            { zh: '晚上我们一起吃饭，很高兴。', zhT: '晚上我們一起吃飯，很高興。', es: 'Por la noche comemos juntos, estamos contentos.' },
            { zh: '周末，我们常常去公园。', zhT: '週末，我們常常去公園。', es: 'Los fines de semana solemos ir al parque.' },
            { zh: '我很爱我的家人。', zhT: '我很愛我的家人。', es: 'Quiero mucho a mi familia.' }
        ],
        quiz: [
            { zh: '爸爸、妈妈、哥哥和我，一家四___。', zhT: '爸爸、媽媽、哥哥和我，一家四___。', es: 'Papá, mamá, mi hermano mayor y yo, somos cuatro en la familia.',
              opts: [
                { z: '口', t: '口', p: 'kǒu', e: 'Clasificador de personas de una familia' },
                { z: '个', t: '個', p: 'gè', e: 'Clasificador general' },
                { z: '位', t: '位', p: 'wèi', e: 'Clasificador de personas (cortés)' } ] },
            { zh: '爸爸是___，妈妈是老师。', zhT: '爸爸是___，媽媽是老師。', es: 'Papá es médico, mamá es profesora.',
              opts: [
                { z: '医生', t: '醫生', p: 'yīshēng', e: 'Médico' },
                { z: '学生', t: '學生', p: 'xuésheng', e: 'Estudiante' },
                { z: '司机', t: '司機', p: 'sījī', e: 'Chofer' } ] },
            { zh: '哥哥是大学生，他在台北上___。', zhT: '哥哥是大學生，他在臺北上___。', es: 'Mi hermano es universitario, estudia en Taipéi.',
              opts: [
                { z: '学', t: '學', p: 'xué', e: 'Estudiar (上学 = ir a clase)' },
                { z: '班', t: '班', p: 'bān', e: 'Trabajar (上班 = ir a trabajar)' },
                { z: '课', t: '課', p: 'kè', e: 'Clase' } ] },
            { zh: '我每天早上七点___。', zhT: '我每天早上七點___。', es: 'Me levanto todos los días a las siete de la mañana.',
              opts: [
                { z: '起床', t: '起床', p: 'qǐchuáng', e: 'Levantarse' },
                { z: '睡觉', t: '睡覺', p: 'shuìjiào', e: 'Dormir' },
                { z: '吃饭', t: '吃飯', p: 'chīfàn', e: 'Comer' } ] },
            { zh: '我___喝咖啡，不喜欢喝茶。', zhT: '我___喝咖啡，不喜歡喝茶。', es: 'Me gusta tomar café, no me gusta el té.',
              opts: [
                { z: '喜欢', t: '喜歡', p: 'xǐhuan', e: 'Gustar' },
                { z: '想', t: '想', p: 'xiǎng', e: 'Querer' },
                { z: '要', t: '要', p: 'yào', e: 'Querer, necesitar' } ] },
            { zh: '晚上我们一起吃饭，很___。', zhT: '晚上我們一起吃飯，很___。', es: 'Por la noche comemos juntos, estamos contentos.',
              opts: [
                { z: '高兴', t: '高興', p: 'gāoxìng', e: 'Contento' },
                { z: '忙', t: '忙', p: 'máng', e: 'Ocupado' },
                { z: '累', t: '累', p: 'lèi', e: 'Cansado' } ] },
            { zh: '周末，我们常常去___。', zhT: '週末，我們常常去___。', es: 'Los fines de semana solemos ir al parque.',
              opts: [
                { z: '公园', t: '公園', p: 'gōngyuán', e: 'Parque' },
                { z: '餐厅', t: '餐廳', p: 'cāntīng', e: 'Restaurante' },
                { z: '学校', t: '學校', p: 'xuéxiào', e: 'Escuela' } ] },
            { zh: '我很___我的家人。', zhT: '我很___我的家人。', es: 'Quiero mucho a mi familia.',
              opts: [
                { z: '爱', t: '愛', p: 'ài', e: 'Amar' },
                { z: '想', t: '想', p: 'xiǎng', e: 'Extrañar, pensar en' },
                { z: '喜欢', t: '喜歡', p: 'xǐhuan', e: 'Gustar' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 7 · 去图书馆的路 — TOCFL 入門級 A1 (≈HSK 1) · direcciones
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-a1-tushuguan',
        hsk: 1, exam: 'TOCFL', examLvl: 'A1',
        emoji: '📚',
        titleZh: '去图书馆的路',
        titleZhT: '去圖書館的路',
        titleEs: 'El camino a la biblioteca',
        blurb: 'Alguien busca la biblioteca y pide indicaciones en la calle — direcciones, distancias y cortesía básica del TOCFL 入門級.',
        lines: [
            { zh: '请问，图书馆怎么走？', zhT: '請問，圖書館怎麼走？', es: 'Disculpe, ¿cómo se llega a la biblioteca?' },
            { zh: '你先往前走，到十字路口左转。', zhT: '你先往前走，到十字路口左轉。', es: 'Primero sigue derecho, en el cruce dobla a la izquierda.' },
            { zh: '图书馆在邮局的对面。', zhT: '圖書館在郵局的對面。', es: 'La biblioteca está frente al correo.' },
            { zh: '离这里远不远？', zhT: '離這裡遠不遠？', es: '¿Está lejos de aquí?' },
            { zh: '不远，走路五分钟就到了。', zhT: '不遠，走路五分鐘就到了。', es: 'No, a pie se llega en cinco minutos.' },
            { zh: '谢谢你！我找了很久。', zhT: '謝謝你！我找了很久。', es: '¡Gracias! Hace rato que la busco.' },
            { zh: '不客气。你要借书吗？', zhT: '不客氣。你要借書嗎？', es: 'De nada. ¿Vas a pedir prestado un libro?' },
            { zh: '对，我要还书，也要借一本新的。', zhT: '對，我要還書，也要借一本新的。', es: 'Sí, voy a devolver uno y pedir uno nuevo.' },
            { zh: '希望你找到想看的书。', zhT: '希望你找到想看的書。', es: 'Espero que encuentres el libro que quieres.' }
        ],
        quiz: [
            { zh: '请问，图书馆___走？', zhT: '請問，圖書館___走？', es: 'Disculpe, ¿cómo se llega a la biblioteca?',
              opts: [
                { z: '怎么', t: '怎麼', p: 'zěnme', e: 'Cómo' },
                { z: '什么', t: '什麼', p: 'shénme', e: 'Qué' },
                { z: '哪里', t: '哪裡', p: 'nǎlǐ', e: 'Dónde' } ] },
            { zh: '到十字路口___转。', zhT: '到十字路口___轉。', es: 'En el cruce dobla a la izquierda.',
              opts: [
                { z: '左', t: '左', p: 'zuǒ', e: 'Izquierda' },
                { z: '右', t: '右', p: 'yòu', e: 'Derecha' },
                { z: '前', t: '前', p: 'qián', e: 'Adelante' } ] },
            { zh: '图书馆在邮局的___。', zhT: '圖書館在郵局的___。', es: 'La biblioteca está frente al correo.',
              opts: [
                { z: '对面', t: '對面', p: 'duìmiàn', e: 'Enfrente' },
                { z: '旁边', t: '旁邊', p: 'pángbiān', e: 'Al lado' },
                { z: '中间', t: '中間', p: 'zhōngjiān', e: 'En medio' } ] },
            { zh: '___这里远不远？', zhT: '___這裡遠不遠？', es: '¿Está lejos de aquí?',
              opts: [
                { z: '离', t: '離', p: 'lí', e: 'A una distancia de' },
                { z: '从', t: '從', p: 'cóng', e: 'Desde' },
                { z: '到', t: '到', p: 'dào', e: 'Hasta' } ] },
            { zh: '不远，走路五___就到了。', zhT: '不遠，走路五___就到了。', es: 'No, a pie se llega en cinco minutos.',
              opts: [
                { z: '分钟', t: '分鐘', p: 'fēnzhōng', e: 'Minutos' },
                { z: '小时', t: '小時', p: 'xiǎoshí', e: 'Horas' },
                { z: '点', t: '點', p: 'diǎn', e: 'En punto (hora)' } ] },
            { zh: '谢谢你！我___了很久。', zhT: '謝謝你！我___了很久。', es: '¡Gracias! Hace rato que la busco.',
              opts: [
                { z: '找', t: '找', p: 'zhǎo', e: 'Buscar' },
                { z: '等', t: '等', p: 'děng', e: 'Esperar' },
                { z: '看', t: '看', p: 'kàn', e: 'Mirar' } ] },
            { zh: '你要___书吗？', zhT: '你要___書嗎？', es: '¿Vas a pedir prestado un libro?',
              opts: [
                { z: '借', t: '借', p: 'jiè', e: 'Pedir prestado' },
                { z: '买', t: '買', p: 'mǎi', e: 'Comprar' },
                { z: '还', t: '還', p: 'huán', e: 'Devolver' } ] },
            { zh: '我要___书，也要借一本新的。', zhT: '我要___書，也要借一本新的。', es: 'Voy a devolver uno y pedir uno nuevo.',
              opts: [
                { z: '还', t: '還', p: 'huán', e: 'Devolver' },
                { z: '借', t: '借', p: 'jiè', e: 'Pedir prestado' },
                { z: '读', t: '讀', p: 'dú', e: 'Leer' } ] },
            { zh: '___你找到想看的书。', zhT: '___你找到想看的書。', es: 'Espero que encuentres el libro que quieres.',
              opts: [
                { z: '希望', t: '希望', p: 'xīwàng', e: 'Esperar (desear)' },
                { z: '以为', t: '以為', p: 'yǐwéi', e: 'Creer (erróneamente)' },
                { z: '相信', t: '相信', p: 'xiāngxìn', e: 'Creer' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 8 · 朋友的生日礼物 — TOCFL 入門級 A1 (≈HSK 1) · compras y colores
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-a1-shengri',
        hsk: 1, exam: 'TOCFL', examLvl: 'A1',
        emoji: '🎁',
        titleZh: '朋友的生日礼物',
        titleZhT: '朋友的生日禮物',
        titleEs: 'El regalo de cumpleaños de una amiga',
        blurb: 'Dos amigas van de compras para elegir un regalo de cumpleaños — colores, precios y gustos del TOCFL 入門級.',
        lines: [
            { zh: '下星期是小华的生日。', zhT: '下星期是小華的生日。', es: 'La próxima semana es el cumpleaños de Xiaohua.' },
            { zh: '我们去商店买生日礼物，好不好？', zhT: '我們去商店買生日禮物，好不好？', es: 'Vamos a la tienda a comprar un regalo de cumpleaños, ¿sí?' },
            { zh: '好啊，她喜欢什么颜色？', zhT: '好啊，她喜歡什麼顏色？', es: 'Bueno, ¿qué color le gusta?' },
            { zh: '她最喜欢白色和黄色。', zhT: '她最喜歡白色和黃色。', es: 'Le gustan más el blanco y el amarillo.' },
            { zh: '这条裙子怎么样？颜色很漂亮。', zhT: '這條裙子怎麼樣？顏色很漂亮。', es: '¿Qué tal esta falda? El color es muy lindo.' },
            { zh: '太贵了，我们买不起。', zhT: '太貴了，我們買不起。', es: 'Es muy cara, no nos alcanza.' },
            { zh: '那这个呢？比较便宜。', zhT: '那這個呢？比較便宜。', es: '¿Y esto? Es más barato.' },
            { zh: '这个不错，而且很特别。', zhT: '這個不錯，而且很特別。', es: 'Este está bien, y además es especial.' },
            { zh: '老板，这个多少钱？可以便宜一点吗？', zhT: '老闆，這個多少錢？可以便宜一點嗎？', es: 'Señor, ¿cuánto cuesta esto? ¿Puede hacer un descuento?' },
            { zh: '当然可以，希望她会喜欢。', zhT: '當然可以，希望她會喜歡。', es: 'Claro que sí, espero que le guste.' }
        ],
        quiz: [
            { zh: '我们去商店买生日___，好不好？', zhT: '我們去商店買生日___，好不好？', es: 'Vamos a la tienda a comprar un regalo de cumpleaños, ¿sí?',
              opts: [
                { z: '礼物', t: '禮物', p: 'lǐwù', e: 'Regalo' },
                { z: '东西', t: '東西', p: 'dōngxi', e: 'Cosa' },
                { z: '衣服', t: '衣服', p: 'yīfu', e: 'Ropa' } ] },
            { zh: '她喜欢什么___？', zhT: '她喜歡什麼___？', es: '¿Qué color le gusta?',
              opts: [
                { z: '颜色', t: '顏色', p: 'yánsè', e: 'Color' },
                { z: '样子', t: '樣子', p: 'yàngzi', e: 'Aspecto, forma' },
                { z: '大小', t: '大小', p: 'dàxiǎo', e: 'Tamaño' } ] },
            { zh: '这条裙子怎么样？颜色很___。', zhT: '這條裙子怎麼樣？顏色很___。', es: '¿Qué tal esta falda? El color es muy lindo.',
              opts: [
                { z: '漂亮', t: '漂亮', p: 'piàoliang', e: 'Lindo' },
                { z: '便宜', t: '便宜', p: 'piányí', e: 'Barato' },
                { z: '简单', t: '簡單', p: 'jiǎndān', e: 'Simple' } ] },
            { zh: '太___了，我们买不起。', zhT: '太___了，我們買不起。', es: 'Es muy cara, no nos alcanza.',
              opts: [
                { z: '贵', t: '貴', p: 'guì', e: 'Caro' },
                { z: '便宜', t: '便宜', p: 'piányí', e: 'Barato' },
                { z: '重', t: '重', p: 'zhòng', e: 'Pesado' } ] },
            { zh: '那这个呢？___便宜。', zhT: '那這個呢？___便宜。', es: '¿Y esto? Es más barato.',
              opts: [
                { z: '比较', t: '比較', p: 'bǐjiào', e: 'Relativamente, más' },
                { z: '最', t: '最', p: 'zuì', e: 'El más' },
                { z: '非常', t: '非常', p: 'fēicháng', e: 'Muy, extremadamente' } ] },
            { zh: '这个不错，而且很___。', zhT: '這個不錯，而且很___。', es: 'Este está bien, y además es especial.',
              opts: [
                { z: '特别', t: '特別', p: 'tèbié', e: 'Especial' },
                { z: '奇怪', t: '奇怪', p: 'qíguài', e: 'Raro' },
                { z: '普通', t: '普通', p: 'pǔtōng', e: 'Común' } ] },
            { zh: '老板，这个___钱？', zhT: '老闆，這個___錢？', es: 'Señor, ¿cuánto cuesta esto?',
              opts: [
                { z: '多少', t: '多少', p: 'duōshǎo', e: 'Cuánto' },
                { z: '多么', t: '多麼', p: 'duōme', e: 'Qué tan (exclamativo)' },
                { z: '几', t: '幾', p: 'jǐ', e: 'Cuántos (número pequeño)' } ] },
            { zh: '___便宜一点吗？', zhT: '___便宜一點嗎？', es: '¿Puede hacer un descuento?',
              opts: [
                { z: '可以', t: '可以', p: 'kěyǐ', e: 'Poder, se puede' },
                { z: '应该', t: '應該', p: 'yīnggāi', e: 'Debería' },
                { z: '要', t: '要', p: 'yào', e: 'Querer, necesitar' } ] },
            { zh: '当然可以，___她会喜欢。', zhT: '當然可以，___她會喜歡。', es: 'Claro que sí, espero que le guste.',
              opts: [
                { z: '希望', t: '希望', p: 'xīwàng', e: 'Esperar (desear)' },
                { z: '知道', t: '知道', p: 'zhīdào', e: 'Saber' },
                { z: '觉得', t: '覺得', p: 'juéde', e: 'Sentir, opinar' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 9 · 工作面试 — TOCFL 高階級 B2 (≈HSK 6) · entrevista de trabajo
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-b2-mianshi',
        hsk: 6, exam: 'TOCFL', examLvl: 'B2',
        emoji: '💼',
        titleZh: '工作面试',
        titleZhT: '工作面試',
        titleEs: 'La entrevista de trabajo',
        blurb: 'Una entrevista laboral: experiencia, motivos de cambio y expectativas de desarrollo — vocabulario profesional del TOCFL 高階級.',
        lines: [
            { zh: '王先生，谢谢你今天来面试。', zhT: '王先生，謝謝你今天來面試。', es: 'Sr. Wang, gracias por venir hoy a la entrevista.' },
            { zh: '不客气，我对这个职位很有兴趣。', zhT: '不客氣，我對這個職位很有興趣。', es: 'De nada, estoy muy interesado en este puesto.' },
            { zh: '可以说说你过去的工作经验吗？', zhT: '可以說說你過去的工作經驗嗎？', es: '¿Puede contarme sobre su experiencia laboral previa?' },
            { zh: '我在一家贸易公司工作了三年，负责客户服务。', zhT: '我在一家貿易公司工作了三年，負責客戶服務。', es: 'Trabajé tres años en una empresa de comercio, a cargo de atención al cliente.' },
            { zh: '那你为什么想离开那家公司？', zhT: '那你為什麼想離開那家公司？', es: '¿Y por qué quiere dejar esa empresa?' },
            { zh: '我希望能有更多发展的机会，学习新的技能。', zhT: '我希望能有更多發展的機會，學習新的技能。', es: 'Espero tener más oportunidades de desarrollo y aprender nuevas habilidades.' },
            { zh: '我们公司常常需要跟国外客户沟通，你的外语能力怎么样？', zhT: '我們公司常常需要跟國外客戶溝通，你的外語能力怎麼樣？', es: 'Nuestra empresa suele comunicarse con clientes extranjeros, ¿cómo es su nivel de idiomas?' },
            { zh: '我的英文不错，最近也在学中文。', zhT: '我的英文不錯，最近也在學中文。', es: 'Mi inglés es bueno, y últimamente también estudio chino.' },
            { zh: '很好，如果录取了，你什么时候可以上班？', zhT: '很好，如果錄取了，你什麼時候可以上班？', es: 'Muy bien, si lo contratamos, ¿cuándo podría empezar?' },
            { zh: '我可以下个月一号开始。', zhT: '我可以下個月一號開始。', es: 'Puedo empezar el primero del próximo mes.' },
            { zh: '我们会尽快跟你联络，谢谢你的耐心等待。', zhT: '我們會盡快跟你聯絡，謝謝你的耐心等待。', es: 'Nos pondremos en contacto lo antes posible, gracias por su paciencia.' },
            { zh: '谢谢您给我这个机会，期待您的消息。', zhT: '謝謝您給我這個機會，期待您的消息。', es: 'Gracias por darme esta oportunidad, espero su respuesta.' }
        ],
        quiz: [
            { zh: '我对这个职位很有___。', zhT: '我對這個職位很有___。', es: 'Estoy muy interesado en este puesto.',
              opts: [
                { z: '兴趣', t: '興趣', p: 'xìngqù', e: 'Interés' },
                { z: '意思', t: '意思', p: 'yìsi', e: 'Significado' },
                { z: '把握', t: '把握', p: 'bǎwò', e: 'Certeza, seguridad' } ] },
            { zh: '可以说说你过去的工作___吗？', zhT: '可以說說你過去的工作___嗎？', es: '¿Puede contarme sobre su experiencia laboral previa?',
              opts: [
                { z: '经验', t: '經驗', p: 'jīngyàn', e: 'Experiencia' },
                { z: '计划', t: '計劃', p: 'jìhuà', e: 'Plan' },
                { z: '态度', t: '態度', p: 'tàidù', e: 'Actitud' } ] },
            { zh: '我在贸易公司工作三年，___客户服务。', zhT: '我在貿易公司工作三年，___客戶服務。', es: 'Trabajé tres años en una empresa de comercio, a cargo de atención al cliente.',
              opts: [
                { z: '负责', t: '負責', p: 'fùzé', e: 'Estar a cargo de' },
                { z: '关于', t: '關於', p: 'guānyú', e: 'Acerca de' },
                { z: '帮忙', t: '幫忙', p: 'bāngmáng', e: 'Ayudar' } ] },
            { zh: '你为什么想___那家公司？', zhT: '你為什麼想___那家公司？', es: '¿Por qué quiere dejar esa empresa?',
              opts: [
                { z: '离开', t: '離開', p: 'líkāi', e: 'Dejar, irse de' },
                { z: '进入', t: '進入', p: 'jìnrù', e: 'Entrar a' },
                { z: '加入', t: '加入', p: 'jiārù', e: 'Unirse a' } ] },
            { zh: '我希望能有更多发展的___。', zhT: '我希望能有更多發展的___。', es: 'Espero tener más oportunidades de desarrollo.',
              opts: [
                { z: '机会', t: '機會', p: 'jīhuì', e: 'Oportunidad' },
                { z: '压力', t: '壓力', p: 'yālì', e: 'Presión' },
                { z: '问题', t: '問題', p: 'wèntí', e: 'Problema' } ] },
            { zh: '我们公司常常需要跟国外客户___。', zhT: '我們公司常常需要跟國外客戶___。', es: 'Nuestra empresa suele comunicarse con clientes extranjeros.',
              opts: [
                { z: '沟通', t: '溝通', p: 'gōutōng', e: 'Comunicarse' },
                { z: '竞争', t: '競爭', p: 'jìngzhēng', e: 'Competir' },
                { z: '合作', t: '合作', p: 'hézuò', e: 'Colaborar' } ] },
            { zh: '你的外语___怎么样？', zhT: '你的外語___怎麼樣？', es: '¿Cómo es su nivel de idiomas?',
              opts: [
                { z: '能力', t: '能力', p: 'nénglì', e: 'Capacidad' },
                { z: '成绩', t: '成績', p: 'chéngjì', e: 'Calificación' },
                { z: '兴趣', t: '興趣', p: 'xìngqù', e: 'Interés' } ] },
            { zh: '如果___了，你什么时候可以上班？', zhT: '如果___了，你什麼時候可以上班？', es: 'Si lo contratamos, ¿cuándo podría empezar?',
              opts: [
                { z: '录取', t: '錄取', p: 'lùqǔ', e: 'Ser contratado/admitido' },
                { z: '拒绝', t: '拒絕', p: 'jùjué', e: 'Rechazar' },
                { z: '通过', t: '通過', p: 'tōngguò', e: 'Aprobar, pasar' } ] },
            { zh: '我们会尽快跟你___。', zhT: '我們會盡快跟你___。', es: 'Nos pondremos en contacto lo antes posible.',
              opts: [
                { z: '联络', t: '聯絡', p: 'liánluò', e: 'Contactar' },
                { z: '讨论', t: '討論', p: 'tǎolùn', e: 'Discutir' },
                { z: '见面', t: '見面', p: 'jiànmiàn', e: 'Encontrarse en persona' } ] },
            { zh: '谢谢您给我这个机会，___您的消息。', zhT: '謝謝您給我這個機會，___您的消息。', es: 'Gracias por darme esta oportunidad, espero su respuesta.',
              opts: [
                { z: '期待', t: '期待', p: 'qídài', e: 'Esperar con ilusión' },
                { z: '等待', t: '等待', p: 'děngdài', e: 'Esperar' },
                { z: '担心', t: '擔心', p: 'dānxīn', e: 'Preocuparse' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 10 · 环保与生活 — TOCFL 高階級 B2 (≈HSK 6) · medioambiente
    // ─────────────────────────────────────────────────────────────
    {
        id: 'tocfl-b2-huanbao',
        hsk: 6, exam: 'TOCFL', examLvl: 'B2',
        emoji: '🌱',
        titleZh: '环保与生活',
        titleZhT: '環保與生活',
        titleEs: 'El medioambiente y la vida cotidiana',
        blurb: 'Dos amigos debaten cómo reducir la basura y qué responsabilidad le toca a cada parte de la sociedad — vocabulario abstracto del TOCFL 高階級.',
        lines: [
            { zh: '最近环保的议题越来越受到重视。', zhT: '最近環保的議題越來越受到重視。', es: 'Últimamente el tema del medioambiente recibe cada vez más atención.' },
            { zh: '你觉得我们应该怎么减少垃圾呢？', zhT: '你覺得我們應該怎麼減少垃圾呢？', es: '¿Qué crees que deberíamos hacer para reducir la basura?' },
            { zh: '我认为从日常生活做起最重要，比如少用塑胶袋。', zhT: '我認為從日常生活做起最重要，比如少用塑膠袋。', es: 'Creo que lo más importante es empezar por la vida diaria, como usar menos bolsas de plástico.' },
            { zh: '对，很多人出门都会自备环保杯和购物袋。', zhT: '對，很多人出門都會自備環保杯和購物袋。', es: 'Sí, mucha gente al salir lleva su propio vaso ecológico y bolsa de compras.' },
            { zh: '不过有些人觉得这样很麻烦，不愿意改变习惯。', zhT: '不過有些人覺得這樣很麻煩，不願意改變習慣。', es: 'Pero algunos creen que es muy molesto y no quieren cambiar sus hábitos.' },
            { zh: '政府应该提供更多方便的回收设施。', zhT: '政府應該提供更多方便的回收設施。', es: 'El gobierno debería ofrecer más instalaciones de reciclaje accesibles.' },
            { zh: '没错，而且可以透过教育让孩子从小养成习惯。', zhT: '沒錯，而且可以透過教育讓孩子從小養成習慣。', es: 'Exacto, y se puede educar a los niños desde pequeños para que adquieran el hábito.' },
            { zh: '企业的责任也很大，应该减少包装的浪费。', zhT: '企業的責任也很大，應該減少包裝的浪費。', es: 'La responsabilidad de las empresas también es grande; deberían reducir el desperdicio de empaques.' },
            { zh: '我同意，环保不只是个人的事，是全社会的责任。', zhT: '我同意，環保不只是個人的事，是全社會的責任。', es: 'Estoy de acuerdo, el cuidado ambiental no es solo cosa individual, es responsabilidad de toda la sociedad.' },
            { zh: '如果大家一起努力，环境一定会越来越好。', zhT: '如果大家一起努力，環境一定會越來越好。', es: 'Si todos nos esforzamos juntos, el medioambiente seguramente mejorará cada vez más.' },
            { zh: '我们学校下个月也要办一个环保活动。', zhT: '我們學校下個月也要辦一個環保活動。', es: 'Nuestra escuela también va a organizar una actividad ecológica el próximo mes.' },
            { zh: '真的吗？我很愿意参加，一起为地球尽一份力。', zhT: '真的嗎？我很願意參加，一起為地球盡一份力。', es: '¿De verdad? Con gusto participo, aportemos juntos por el planeta.' },
            { zh: '那我们先约时间讨论细节吧。', zhT: '那我們先約時間討論細節吧。', es: 'Entonces quedemos para hablar de los detalles.' }
        ],
        quiz: [
            { zh: '环保的议题越来越受到___。', zhT: '環保的議題越來越受到___。', es: 'El tema del medioambiente recibe cada vez más atención.',
              opts: [
                { z: '重视', t: '重視', p: 'zhòngshì', e: 'Atención, importancia' },
                { z: '欢迎', t: '歡迎', p: 'huānyíng', e: 'Bienvenida' },
                { z: '怀疑', t: '懷疑', p: 'huáiyí', e: 'Sospecha, duda' } ] },
            { zh: '我们应该怎么___垃圾呢？', zhT: '我們應該怎麼___垃圾呢？', es: '¿Qué deberíamos hacer para reducir la basura?',
              opts: [
                { z: '减少', t: '減少', p: 'jiǎnshǎo', e: 'Reducir' },
                { z: '增加', t: '增加', p: 'zēngjiā', e: 'Aumentar' },
                { z: '处理', t: '處理', p: 'chǔlǐ', e: 'Procesar, manejar' } ] },
            { zh: '有些人不愿意改变___。', zhT: '有些人不願意改變___。', es: 'Algunos no quieren cambiar sus hábitos.',
              opts: [
                { z: '习惯', t: '習慣', p: 'xíguàn', e: 'Costumbre, hábito' },
                { z: '想法', t: '想法', p: 'xiǎngfǎ', e: 'Idea, opinión' },
                { z: '生活', t: '生活', p: 'shēnghuó', e: 'Vida' } ] },
            { zh: '政府应该提供更多方便的回收___。', zhT: '政府應該提供更多方便的回收___。', es: 'El gobierno debería ofrecer más instalaciones de reciclaje accesibles.',
              opts: [
                { z: '设施', t: '設施', p: 'shèshī', e: 'Instalaciones' },
                { z: '政策', t: '政策', p: 'zhèngcè', e: 'Política (pública)' },
                { z: '资源', t: '資源', p: 'zīyuán', e: 'Recurso' } ] },
            { zh: '让孩子从小___习惯。', zhT: '讓孩子從小___習慣。', es: 'Que los niños adquieran el hábito desde pequeños.',
              opts: [
                { z: '养成', t: '養成', p: 'yǎngchéng', e: 'Adquirir, formar (un hábito)' },
                { z: '改变', t: '改變', p: 'gǎibiàn', e: 'Cambiar' },
                { z: '学习', t: '學習', p: 'xuéxí', e: 'Aprender' } ] },
            { zh: '企业的___也很大。', zhT: '企業的___也很大。', es: 'La responsabilidad de las empresas también es grande.',
              opts: [
                { z: '责任', t: '責任', p: 'zérèn', e: 'Responsabilidad' },
                { z: '利益', t: '利益', p: 'lìyì', e: 'Beneficio' },
                { z: '压力', t: '壓力', p: 'yālì', e: 'Presión' } ] },
            { zh: '应该减少包装的___。', zhT: '應該減少包裝的___。', es: 'Deberían reducir el desperdicio de empaques.',
              opts: [
                { z: '浪费', t: '浪費', p: 'làngfèi', e: 'Desperdicio' },
                { z: '成本', t: '成本', p: 'chéngběn', e: 'Costo' },
                { z: '数量', t: '數量', p: 'shùliàng', e: 'Cantidad' } ] },
            { zh: '我___，环保是全社会的责任。', zhT: '我___，環保是全社會的責任。', es: 'Estoy de acuerdo, el cuidado ambiental es responsabilidad de toda la sociedad.',
              opts: [
                { z: '同意', t: '同意', p: 'tóngyì', e: 'Estar de acuerdo' },
                { z: '反对', t: '反對', p: 'fǎnduì', e: 'Oponerse' },
                { z: '怀疑', t: '懷疑', p: 'huáiyí', e: 'Dudar' } ] },
            { zh: '如果大家一起___，环境一定会越来越好。', zhT: '如果大家一起___，環境一定會越來越好。', es: 'Si todos nos esforzamos juntos, el medioambiente mejorará.',
              opts: [
                { z: '努力', t: '努力', p: 'nǔlì', e: 'Esforzarse' },
                { z: '休息', t: '休息', p: 'xiūxí', e: 'Descansar' },
                { z: '抱怨', t: '抱怨', p: 'bàoyuàn', e: 'Quejarse' } ] },
            { zh: '那我们先约时间讨论___吧。', zhT: '那我們先約時間討論___吧。', es: 'Entonces quedemos para hablar de los detalles.',
              opts: [
                { z: '细节', t: '細節', p: 'xìjié', e: 'Detalle' },
                { z: '结果', t: '結果', p: 'jiéguǒ', e: 'Resultado' },
                { z: '原因', t: '原因', p: 'yuányīn', e: 'Causa' } ] }
        ]
    }

    ];

    // Añade las lecciones TOCFL a las existentes (lessons.js se carga antes)
    window.GRADED_LESSONS = (window.GRADED_LESSONS || []).concat(TOCFL_LESSONS);
})();
