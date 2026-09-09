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
    }

    ];

    // Añade las lecciones TOCFL a las existentes (lessons.js se carga antes)
    window.GRADED_LESSONS = (window.GRADED_LESSONS || []).concat(TOCFL_LESSONS);
})();
