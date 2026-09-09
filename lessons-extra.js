// ═══════════════════════════════════════════════════════════════════
// lessons-extra.js — v1.0 (2026-09-10) · MINI-DRAMAS HSK EXTRA
// -------------------------------------------------------------------
// +2 lecciones por nivel HSK 1..6 (12 en total), dificultad creciente:
// dentro de cada nivel, la «A» es más corta/simple y la «B» más larga
// y con gramática más exigente. Mismo contrato de app.js v9.x:
//   { id, hsk, emoji, titleZh, titleZhT, titleEs, blurb,
//     lines: [{ zh, zhT, es }],
//     quiz:  [{ zh (con ___), zhT (con ___), es,
//               opts: [{z, t, p, e, a?} × 3] }]  → opts[0] = correcta }
// Archivo ADITIVO: concatena a window.GRADED_LESSONS. Cargarlo
// DESPUÉS de lessons.js (+ lessons-tocfl.js) y ANTES de app.js.
// ═══════════════════════════════════════════════════════════════════
(function () {
    'use strict';
    var HSK_EXTRA = [

    // ─────────────────────────────────────────────────────────────
    // HSK 1 · A — 猫和小鸟 · oraciones de 4-9 caracteres, vocabulario base
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h1-gato',
        hsk: 1,
        emoji: '🐱',
        titleZh: '猫和小鸟',
        titleZhT: '貓和小鳥',
        titleEs: 'El gato y el pajarito',
        blurb: 'Un gatito blanco, un pajarito perdido y la amistad más simple del mundo: jugar, comer y dormir juntos.',
        lines: [
            { zh: '小王家有一只小猫。', zhT: '小王家有一隻小貓。', es: 'En casa de Xiao Wang hay un gatito.' },
            { zh: '小猫很白，很好看。', zhT: '小貓很白，很好看。', es: 'El gatito es blanco y muy lindo.' },
            { zh: '一天，家里来了一只小鸟。', zhT: '一天，家裡來了一隻小鳥。', es: 'Un día llegó a la casa un pajarito.' },
            { zh: '小猫看见了，很高兴。', zhT: '小貓看見了，很高興。', es: 'El gatito lo vio y se puso contento.' },
            { zh: '它想：「我要和小鸟玩。」', zhT: '牠想：「我要和小鳥玩。」', es: 'Pensó: «Quiero jugar con el pajarito.»' },
            { zh: '小鸟说：「你好！我们做朋友吧。」', zhT: '小鳥說：「你好！我們做朋友吧。」', es: 'El pajarito dijo: «¡Hola! Seamos amigos.»' },
            { zh: '小猫说：「好！你叫什么名字？」', zhT: '小貓說：「好！你叫什麼名字？」', es: 'El gato dijo: «¡Bien! ¿Cómo te llamas?»' },
            { zh: '小鸟说：「我叫小红。你呢？」', zhT: '小鳥說：「我叫小紅。你呢？」', es: 'El pajarito dijo: «Me llamo Xiaohong. ¿Y tú?»' },
            { zh: '他们一起看电视，一起吃饭。', zhT: '他們一起看電視，一起吃飯。', es: 'Miran televisión juntos y comen juntos.' },
            { zh: '小鸟喝水，小猫也喝水。', zhT: '小鳥喝水，小貓也喝水。', es: 'El pajarito bebe agua; el gato también.' },
            { zh: '晚上，小猫睡觉了，小鸟也睡觉了。', zhT: '晚上，小貓睡覺了，小鳥也睡覺了。', es: 'A la noche el gato se duerme, y el pajarito también.' },
            { zh: '他们是很好的朋友。', zhT: '他們是很好的朋友。', es: 'Son muy buenos amigos.' }
        ],
        quiz: [
            { zh: '小王家有一___小猫。', zhT: '小王家有一___小貓。', es: 'En casa de Xiao Wang hay un gatito.',
              opts: [
                { z: '只', t: '隻', p: 'zhī', e: 'Medida para animales' },
                { z: '个', t: '個', p: 'gè', e: 'Medida general' },
                { z: '杯', t: '杯', p: 'bēi', e: 'Medida: taza' } ] },
            { zh: '小猫很___，很好看。', zhT: '小貓很___，很好看。', es: 'El gatito es blanco y muy lindo.',
              opts: [
                { z: '白', t: '白', p: 'bái', e: 'Blanco' },
                { z: '冷', t: '冷', p: 'lěng', e: 'Frío' },
                { z: '热', t: '熱', p: 'rè', e: 'Caliente', a: ['Caluroso'] } ] },
            { zh: '一天，家里___了一只小鸟。', zhT: '一天，家裡___了一隻小鳥。', es: 'Un día llegó a la casa un pajarito.',
              opts: [
                { z: '来', t: '來', p: 'lái', e: 'Venir, llegar' },
                { z: '去', t: '去', p: 'qù', e: 'Ir' },
                { z: '走', t: '走', p: 'zǒu', e: 'Caminar, irse' } ] },
            { zh: '小猫看见了，很___。', zhT: '小貓看見了，很___。', es: 'El gatito lo vio y se puso contento.',
              opts: [
                { z: '高兴', t: '高興', p: 'gāoxìng', e: 'Contento' },
                { z: '坐', t: '坐', p: 'zuò', e: 'Sentarse' },
                { z: '说', t: '說', p: 'shuō', e: 'Hablar' } ] },
            { zh: '它想和小鸟___。', zhT: '牠想和小鳥___。', es: 'Quiere jugar con el pajarito.',
              opts: [
                { z: '玩', t: '玩', p: 'wán', e: 'Jugar' },
                { z: '买', t: '買', p: 'mǎi', e: 'Comprar' },
                { z: '吃', t: '吃', p: 'chī', e: 'Comer' } ] },
            { zh: '小鸟说：「你好！我们做___吧。」', zhT: '小鳥說：「你好！我們做___吧。」', es: 'El pajarito dijo: «¡Hola! Seamos amigos.»',
              opts: [
                { z: '朋友', t: '朋友', p: 'péngyou', e: 'Amigo' },
                { z: '电影', t: '電影', p: 'diànyǐng', e: 'Película' },
                { z: '水果', t: '水果', p: 'shuǐguǒ', e: 'Fruta' } ] },
            { zh: '小猫说：「好！你叫___名字？」', zhT: '小貓說：「好！你叫___名字？」', es: 'El gato dijo: «¡Bien! ¿Cómo te llamas?»',
              opts: [
                { z: '什么', t: '什麼', p: 'shénme', e: 'Qué' },
                { z: '谁', t: '誰', p: 'shéi', e: 'Quién' },
                { z: '哪儿', t: '哪兒', p: 'nǎr', e: 'Dónde' } ] },
            { zh: '他们___看电视，一起吃饭。', zhT: '他們___看電視，一起吃飯。', es: 'Miran televisión juntos y comen juntos.',
              opts: [
                { z: '一起', t: '一起', p: 'yìqǐ', e: 'Juntos' },
                { z: '不', t: '不', p: 'bù', e: 'No' },
                { z: '没', t: '沒', p: 'méi', e: 'No (negar pasado)' } ] },
            { zh: '小鸟___水，小猫也喝水。', zhT: '小鳥___水，小貓也喝水。', es: 'El pajarito bebe agua; el gato también.',
              opts: [
                { z: '喝', t: '喝', p: 'hē', e: 'Beber' },
                { z: '看', t: '看', p: 'kàn', e: 'Mirar, ver' },
                { z: '打', t: '打', p: 'dǎ', e: 'Golpear', a: ['Hacer (una llamada)'] } ] },
            { zh: '晚上，小猫___了。', zhT: '晚上，小貓___了。', es: 'A la noche el gato se duerme.',
              opts: [
                { z: '睡觉', t: '睡覺', p: 'shuìjiào', e: 'Dormir' },
                { z: '说话', t: '說話', p: 'shuōhuà', e: 'Hablar' },
                { z: '买东西', t: '買東西', p: 'mǎi dōngxi', e: 'Hacer compras' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 1 · B — 买水果 · suma números, dinero y medida 个/块
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h1-shuiguo',
        hsk: 1,
        emoji: '🍎',
        titleZh: '买水果',
        titleZhT: '買水果',
        titleEs: 'Fruta para la clase',
        blurb: 'Mercado, números y fruta: Xiaomei compra manzanas y bananas para compartir con sus compañeros.',
        lines: [
            { zh: '星期六，小美和妈妈去商店。', zhT: '星期六，小美和媽媽去商店。', es: 'El sábado, Xiaomei y mamá van a la tienda.' },
            { zh: '妈妈说：「我们买水果。」', zhT: '媽媽說：「我們買水果。」', es: 'Mamá dice: «Compramos fruta.»' },
            { zh: '商店里的水果很多。', zhT: '商店裡的水果很多。', es: 'En la tienda hay mucha fruta.' },
            { zh: '小美看见苹果和香蕉。', zhT: '小美看見蘋果和香蕉。', es: 'Xiaomei ve manzanas y bananas.' },
            { zh: '她问：「这个苹果多少钱？」', zhT: '她問：「這個蘋果多少錢？」', es: 'Pregunta: «¿Cuánto cuesta esta manzana?»' },
            { zh: '妈妈说：「好，我们买六个苹果。」', zhT: '媽媽說：「好，我們買六個蘋果。」', es: 'Mamá dice: «Bien, compremos seis manzanas.»' },
            { zh: '小美说：「我还要香蕉。」', zhT: '小美說：「我還要香蕉。」', es: 'Xiaomei dice: «Yo también quiero bananas.»' },
            { zh: '妈妈说：「好，再买八个香蕉。」', zhT: '媽媽說：「好，再買八個香蕉。」', es: 'Mamá dice: «Bien, llevamos también ocho bananas.»' },
            { zh: '一共二十块钱。', zhT: '一共二十塊錢。', es: 'En total son veinte yuanes.' },
            { zh: '妈妈给钱，小美拿水果。', zhT: '媽媽給錢，小美拿水果。', es: 'Mamá paga y Xiaomei agarra la fruta.' },
            { zh: '小美说：「谢谢妈妈！」', zhT: '小美說：「謝謝媽媽！」', es: 'Xiaomei dice: «¡Gracias, mamá!»' },
            { zh: '妈妈说：「不客气。」', zhT: '媽媽說：「不客氣。」', es: 'Mamá dice: «De nada.»' },
            { zh: '下午，同学们吃水果，都说很好吃。', zhT: '下午，同學們吃水果，都說很好吃。', es: 'A la tarde los compañeros comen la fruta y dicen que está riquísima.' }
        ],
        quiz: [
            { zh: '星期六，小美和妈妈去___。', zhT: '星期六，小美和媽媽去___。', es: 'El sábado, Xiaomei y mamá van a la tienda.',
              opts: [
                { z: '商店', t: '商店', p: 'shāngdiàn', e: 'Tienda' },
                { z: '学校', t: '學校', p: 'xuéxiào', e: 'Escuela' },
                { z: '医院', t: '醫院', p: 'yīyuàn', e: 'Hospital' } ] },
            { zh: '妈妈说：「我们买___。」', zhT: '媽媽說：「我們買___。」', es: 'Mamá dice: «Compramos fruta.»',
              opts: [
                { z: '水果', t: '水果', p: 'shuǐguǒ', e: 'Fruta' },
                { z: '电视', t: '電視', p: 'diànshì', e: 'Televisor' },
                { z: '桌子', t: '桌子', p: 'zhuōzi', e: 'Mesa' } ] },
            { zh: '商店里的水果很___。', zhT: '商店裡的水果很___。', es: 'En la tienda hay mucha fruta.',
              opts: [
                { z: '多', t: '多', p: 'duō', e: 'Mucho, muchos' },
                { z: '小', t: '小', p: 'xiǎo', e: 'Chico' },
                { z: '热', t: '熱', p: 'rè', e: 'Caliente' } ] },
            { zh: '小美看见苹果和___。', zhT: '小美看見蘋果和___。', es: 'Xiaomei ve manzanas y bananas.',
              opts: [
                { z: '香蕉', t: '香蕉', p: 'xiāngjiāo', e: 'Banana' },
                { z: '猫', t: '貓', p: 'māo', e: 'Gato' },
                { z: '书', t: '書', p: 'shū', e: 'Libro' } ] },
            { zh: '这个苹果多___钱？', zhT: '這個蘋果多___錢？', es: '¿Cuánto cuesta esta manzana?',
              opts: [
                { z: '少', t: '少', p: 'shǎo', e: 'Cuánto (多少钱)', a: ['Poco'] },
                { z: '大', t: '大', p: 'dà', e: 'Grande' },
                { z: '好', t: '好', p: 'hǎo', e: 'Bien, bueno' } ] },
            { zh: '我们买___个苹果。', zhT: '我們買___個蘋果。', es: 'Compremos seis manzanas.',
              opts: [
                { z: '六', t: '六', p: 'liù', e: 'Seis' },
                { z: '十', t: '十', p: 'shí', e: 'Diez' },
                { z: '二', t: '二', p: 'èr', e: 'Dos' } ] },
            { zh: '小美说：「我___要香蕉。」', zhT: '小美說：「我___要香蕉。」', es: 'Xiaomei dice: «Yo también quiero bananas.»',
              opts: [
                { z: '还', t: '還', p: 'hái', e: 'También, además' },
                { z: '很', t: '很', p: 'hěn', e: 'Muy' },
                { z: '都', t: '都', p: 'dōu', e: 'Todos' } ] },
            { zh: '一共二十___钱。', zhT: '一共二十___錢。', es: 'En total son veinte yuanes.',
              opts: [
                { z: '块', t: '塊', p: 'kuài', e: 'Medida de dinero (yuan)' },
                { z: '点', t: '點', p: 'diǎn', e: 'Hora, punto', a: ['Un poco'] },
                { z: '个', t: '個', p: 'gè', e: 'Medida general' } ] },
            { zh: '妈妈说：「不___。」', zhT: '媽媽說：「不___。」', es: 'Mamá dice: «De nada.»',
              opts: [
                { z: '客气', t: '客氣', p: 'kèqi', e: 'Cortés (不客气: de nada)' },
                { z: '看见', t: '看見', p: 'kànjiàn', e: 'Ver' },
                { z: '回来', t: '回來', p: 'huílái', e: 'Volver' } ] },
            { zh: '同学们吃水果，都说很___。', zhT: '同學們吃水果，都說很___。', es: 'Los compañeros comen la fruta y dicen que está riquísima.',
              opts: [
                { z: '好吃', t: '好吃', p: 'hǎochī', e: 'Rico (de comida)' },
                { z: '好看', t: '好看', p: 'hǎokàn', e: 'Lindo (a la vista)' },
                { z: '好听', t: '好聽', p: 'hǎotīng', e: 'Agradable (al oído)' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 2 · A — 帮妈妈做饭 · 已经/然后/觉得/虽然…但是
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h2-zuofan',
        hsk: 2,
        emoji: '🍳',
        titleZh: '帮妈妈做饭',
        titleZhT: '幫媽媽做飯',
        titleEs: 'Ayudo a cocinar',
        blurb: 'Mamá llega muerta de trabajo y Xiaoming se pone el delantal: su primer plato para la familia.',
        lines: [
            { zh: '星期天，妈妈很忙。', zhT: '星期天，媽媽很忙。', es: 'El domingo, mamá está muy ocupada.' },
            { zh: '小明说：「妈妈，我帮您做饭。」', zhT: '小明說：「媽媽，我幫您做飯。」', es: 'Xiaoming dice: «Mamá, te ayudo a cocinar.»' },
            { zh: '妈妈很高兴：「你会做饭吗？」', zhT: '媽媽很高興：「你會做飯嗎？」', es: 'Mamá se alegra: «¿Sabes cocinar?»' },
            { zh: '小明说：「会！我已经学会了。」', zhT: '小明說：「會！我已經學會了。」', es: 'Xiaoming dice: «¡Sí! Ya aprendí.»' },
            { zh: '他们先洗菜，然后做饭。', zhT: '他們先洗菜，然後做飯。', es: 'Primero lavan la verdura y después cocinan.' },
            { zh: '小明觉得做饭很有意思。', zhT: '小明覺得做飯很有意思。', es: 'A Xiaoming le parece que cocinar es muy interesante.' },
            { zh: '妈妈说：「菜要洗干净。」', zhT: '媽媽說：「菜要洗乾淨。」', es: 'Mamá dice: «La verdura hay que lavarla bien.»' },
            { zh: '饭做好了，很好吃。', zhT: '飯做好了，很好吃。', es: 'La comida está lista y está riquísima.' },
            { zh: '爸爸回来了，他也觉得很好吃。', zhT: '爸爸回來了，他也覺得很好吃。', es: 'Papá vuelve y a él también le parece riquísima.' },
            { zh: '爸爸问：「这是谁做的？」', zhT: '爸爸問：「這是誰做的？」', es: 'Papá pregunta: «¿Quién lo cocinó?»' },
            { zh: '小明说：「我和妈妈一起做的。」', zhT: '小明說：「我和媽媽一起做的。」', es: 'Xiaoming dice: «Lo hicimos mamá y yo juntos.»' },
            { zh: '爸爸很高兴，说：「谢谢你们！」', zhT: '爸爸很高興，說：「謝謝你們！」', es: 'Papá, muy contento, dice: «¡Gracias a los dos!»' },
            { zh: '虽然做饭很累，但是小明觉得很快乐。', zhT: '雖然做飯很累，但是小明覺得很快樂。', es: 'Aunque cocinar cansa, Xiaoming se siente feliz.' }
        ],
        quiz: [
            { zh: '星期天，妈妈很___。', zhT: '星期天，媽媽很___。', es: 'El domingo, mamá está muy ocupada.',
              opts: [
                { z: '忙', t: '忙', p: 'máng', e: 'Ocupado' },
                { z: '慢', t: '慢', p: 'màn', e: 'Lento' },
                { z: '早', t: '早', p: 'zǎo', e: 'Temprano' } ] },
            { zh: '小明说：「妈妈，我帮您___。」', zhT: '小明說：「媽媽，我幫您___。」', es: 'Xiaoming dice: «Mamá, te ayudo a cocinar.»',
              opts: [
                { z: '做饭', t: '做飯', p: 'zuòfàn', e: 'Cocinar' },
                { z: '看病', t: '看病', p: 'kànbìng', e: 'Ir al médico' },
                { z: '打球', t: '打球', p: 'dǎqiú', e: 'Jugar con pelota' } ] },
            { zh: '妈妈很高兴：「你___做饭吗？」', zhT: '媽媽很高興：「你___做飯嗎？」', es: 'Mamá se alegra: «¿Sabes cocinar?»',
              opts: [
                { z: '会', t: '會', p: 'huì', e: 'Saber hacer' },
                { z: '想', t: '想', p: 'xiǎng', e: 'Querer, pensar' },
                { z: '来', t: '來', p: 'lái', e: 'Venir' } ] },
            { zh: '小明说：「会！我___学会了。」', zhT: '小明說：「會！我___學會了。」', es: 'Xiaoming dice: «¡Sí! Ya aprendí.»',
              opts: [
                { z: '已经', t: '已經', p: 'yǐjīng', e: 'Ya' },
                { z: '就', t: '就', p: 'jiù', e: 'Entonces, justo' },
                { z: '还', t: '還', p: 'hái', e: 'Todavía' } ] },
            { zh: '他们先洗菜，___做饭。', zhT: '他們先洗菜，___做飯。', es: 'Primero lavan la verdura y después cocinan.',
              opts: [
                { z: '然后', t: '然後', p: 'ránhòu', e: 'Después' },
                { z: '因为', t: '因為', p: 'yīnwèi', e: 'Porque' },
                { z: '但是', t: '但是', p: 'dànshì', e: 'Pero' } ] },
            { zh: '小明___做饭很有意思。', zhT: '小明___做飯很有意思。', es: 'A Xiaoming le parece que cocinar es muy interesante.',
              opts: [
                { z: '觉得', t: '覺得', p: 'juéde', e: 'Parecer, opinar' },
                { z: '知道', t: '知道', p: 'zhīdào', e: 'Saber' },
                { z: '希望', t: '希望', p: 'xīwàng', e: 'Esperar, desear' } ] },
            { zh: '妈妈说：「菜要洗___。」', zhT: '媽媽說：「菜要洗___。」', es: 'Mamá dice: «La verdura hay que lavarla bien.»',
              opts: [
                { z: '干净', t: '乾淨', p: 'gānjìng', e: 'Limpio' },
                { z: '快', t: '快', p: 'kuài', e: 'Rápido' },
                { z: '多', t: '多', p: 'duō', e: 'Mucho' } ] },
            { zh: '爸爸问：「这是___做的？」', zhT: '爸爸問：「這是___做的？」', es: 'Papá pregunta: «¿Quién lo cocinó?»',
              opts: [
                { z: '谁', t: '誰', p: 'shéi', e: 'Quién' },
                { z: '什么', t: '什麼', p: 'shénme', e: 'Qué' },
                { z: '哪儿', t: '哪兒', p: 'nǎr', e: 'Dónde' } ] },
            { zh: '小明说：「我和妈妈___做的。」', zhT: '小明說：「我和媽媽___做的。」', es: 'Xiaoming dice: «Lo hicimos mamá y yo juntos.»',
              opts: [
                { z: '一起', t: '一起', p: 'yìqǐ', e: 'Juntos' },
                { z: '一共', t: '一共', p: 'yígòng', e: 'En total' },
                { z: '一定', t: '一定', p: 'yídìng', e: 'Seguro' } ] },
            { zh: '虽然做饭很___，但是小明觉得很快乐。', zhT: '雖然做飯很___，但是小明覺得很快樂。', es: 'Aunque cocinar cansa, Xiaoming se siente feliz.',
              opts: [
                { z: '累', t: '累', p: 'lèi', e: 'Cansado' },
                { z: '慢', t: '慢', p: 'màn', e: 'Lento' },
                { z: '高', t: '高', p: 'gāo', e: 'Alto' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 2 · B — 换座位考试 · 可能/问题/懂/自己 · narrativa con tensión
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h2-zuowei',
        hsk: 2,
        emoji: '🪑',
        titleZh: '考试那天',
        titleZhT: '考試那天',
        titleEs: 'El día del examen',
        blurb: 'Un examen sorpresa, un problema difícil y la lección callada de resolverlo sin copiar.',
        lines: [
            { zh: '小云的班上要考试了。', zhT: '小雲的班上要考試了。', es: 'En la clase de Xiaoyun se acerca un examen.' },
            { zh: '她的同学病了，没来上课。', zhT: '她的同學病了，沒來上課。', es: 'Una compañera enfermó y no vino a clase.' },
            { zh: '小云很担心。', zhT: '小雲很擔心。', es: 'Xiaoyun está preocupada.' },
            { zh: '她想：「今天的问题可能很难。」', zhT: '她想：「今天的問題可能很難。」', es: 'Piensa: «Los problemas de hoy quizá sean difíciles.»' },
            { zh: '老师走进教室，开始考试。', zhT: '老師走進教室，開始考試。', es: 'El maestro entra al aula y arranca el examen.' },
            { zh: '他说：「大家安静！」', zhT: '他說：「大家安靜！」', es: 'Dice: «¡Silencio, todos!»' },
            { zh: '前面的问题，小云都会。', zhT: '前面的問題，小雲都會。', es: 'Los primeros problemas, Xiaoyun sabía todos.' },
            { zh: '但是最后一个问题，她不懂。', zhT: '但是最後一個問題，她不懂。', es: 'Pero el último no lo entendía.' },
            { zh: '她想问旁边的同学。', zhT: '她想問旁邊的同學。', es: 'Quiere preguntarle a la compañera de al lado.' },
            { zh: '可是老师说：「考试的时候不能说话。」', zhT: '可是老師說：「考試的時候不能說話。」', es: 'Pero el maestro dice: «Durante el examen no se puede hablar.»' },
            { zh: '小云只能自己想。', zhT: '小雲只能自己想。', es: 'Xiaoyun no tiene más que pensarlo sola.' },
            { zh: '时间一分一分地过去。', zhT: '時間一分一分地過去。', es: 'Los minutos pasaban uno a uno.' },
            { zh: '后来，她想出来了。', zhT: '後來，她想出來了。', es: 'Al rato, dio con la respuesta.' },
            { zh: '下课了，老师说她做得不错。', zhT: '下課了，老師說她做得不錯。', es: 'Al terminar, el maestro dice que lo hizo bastante bien.' },
            { zh: '小云说：「下次我还要考一百分！」', zhT: '小雲說：「下次我還要考一百分！」', es: 'Xiaoyun dice: «¡En el próximo examen quiero otro cien!»' }
        ],
        quiz: [
            { zh: '小云的班上要___了。', zhT: '小雲的班上要___了。', es: 'En la clase de Xiaoyun se acerca un examen.',
              opts: [
                { z: '考试', t: '考試', p: 'kǎoshì', e: 'Examen' },
                { z: '看病', t: '看病', p: 'kànbìng', e: 'Ir al médico' },
                { z: '搬家', t: '搬家', p: 'bānjiā', e: 'Mudarse' } ] },
            { zh: '她的同学___了，没来上课。', zhT: '她的同學___了，沒來上課。', es: 'Una compañera enfermó y no vino a clase.',
              opts: [
                { z: '病', t: '病', p: 'bìng', e: 'Enfermar' },
                { z: '忙', t: '忙', p: 'máng', e: 'Ocupado' },
                { z: '慢', t: '慢', p: 'màn', e: 'Lento' } ] },
            { zh: '小云很___。', zhT: '小雲很___。', es: 'Xiaoyun está preocupada.',
              opts: [
                { z: '担心', t: '擔心', p: 'dānxīn', e: 'Preocuparse' },
                { z: '高兴', t: '高興', p: 'gāoxìng', e: 'Contento' },
                { z: '舒服', t: '舒服', p: 'shūfu', e: 'Cómodo' } ] },
            { zh: '今天的问题___很难。', zhT: '今天的問題___很難。', es: 'Los problemas de hoy quizá sean difíciles.',
              opts: [
                { z: '可能', t: '可能', p: 'kěnéng', e: 'Tal vez, posible' },
                { z: '一起', t: '一起', p: 'yìqǐ', e: 'Juntos' },
                { z: '已经', t: '已經', p: 'yǐjīng', e: 'Ya' } ] },
            { zh: '老师说：「大家___！」', zhT: '老師說：「大家___！」', es: 'El maestro dice: «¡Silencio, todos!»',
              opts: [
                { z: '安静', t: '安靜', p: 'ānjìng', e: 'Tranquilo, en silencio' },
                { z: '努力', t: '努力', p: 'nǔlì', e: 'Esforzarse' },
                { z: '客气', t: '客氣', p: 'kèqi', e: 'Cortés' } ] },
            { zh: '___的问题，小云都会。', zhT: '___的問題，小雲都會。', es: 'Los primeros problemas, Xiaoyun sabía todos.',
              opts: [
                { z: '前面', t: '前面', p: 'qiánmiàn', e: 'Adelante, primero' },
                { z: '旁边', t: '旁邊', p: 'pángbiān', e: 'Al lado' },
                { z: '后面', t: '後面', p: 'hòumiàn', e: 'Atrás, último' } ] },
            { zh: '但是最后一个问题，她不___。', zhT: '但是最後一個問題，她不___。', es: 'Pero el último no lo entendía.',
              opts: [
                { z: '懂', t: '懂', p: 'dǒng', e: 'Entender' },
                { z: '忘', t: '忘', p: 'wàng', e: 'Olvidar' },
                { z: '对', t: '對', p: 'duì', e: 'Correcto' } ] },
            { zh: '她想问___的同学。', zhT: '她想問___的同學。', es: 'Quiere preguntarle a la compañera de al lado.',
              opts: [
                { z: '旁边', t: '旁邊', p: 'pángbiān', e: 'Al lado' },
                { z: '前面', t: '前面', p: 'qiánmiàn', e: 'Adelante' },
                { z: '外面', t: '外面', p: 'wàimiàn', e: 'Afuera' } ] },
            { zh: '考试的时候不能___。', zhT: '考試的時候不能___。', es: 'Durante el examen no se puede hablar.',
              opts: [
                { z: '说话', t: '說話', p: 'shuōhuà', e: 'Hablar' },
                { z: '睡觉', t: '睡覺', p: 'shuìjiào', e: 'Dormir' },
                { z: '买东西', t: '買東西', p: 'mǎi dōngxi', e: 'Hacer compras' } ] },
            { zh: '小云只能___想。', zhT: '小雲只能___想。', es: 'Xiaoyun no tiene más que pensarlo sola.',
              opts: [
                { z: '自己', t: '自己', p: 'zìjǐ', e: 'Uno mismo' },
                { z: '别人', t: '別人', p: 'biérén', e: 'Otros' },
                { z: '大家', t: '大家', p: 'dàjiā', e: 'Todos' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 3 · A — 搬家 · 附近/邻居/终于/不但…而且 · oraciones más largas
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h3-banjia',
        hsk: 3,
        emoji: '📦',
        titleZh: '搬家',
        titleZhT: '搬家',
        titleEs: 'La mudanza',
        blurb: 'Cajas, un vecino generoso y una camioneta prestada: la mudanza que termina en amistad.',
        lines: [
            { zh: '小林一家要搬家了。', zhT: '小林一家要搬家了。', es: 'La familia de Xiaolin se va a mudar.' },
            { zh: '新房子在大学附近，环境很好。', zhT: '新房子在大學附近，環境很好。', es: 'El departamento nuevo queda cerca de la universidad, en un entorno muy agradable.' },
            { zh: '可是搬家很麻烦。', zhT: '可是搬家很麻煩。', es: 'Pero mudarse es un lío.' },
            { zh: '东西太多了，一个周末都搬不完。', zhT: '東西太多了，一個週末都搬不完。', es: 'Hay demasiadas cosas: ni un fin de semana alcanza.' },
            { zh: '邻居老王听说了，马上过来帮忙。', zhT: '鄰居老王聽說了，馬上過來幫忙。', es: 'El vecino Lao Wang se enteró y vino enseguida a ayudar.' },
            { zh: '他说：「我有车，我帮你们搬。」', zhT: '他說：「我有車，我幫你們搬。」', es: 'Dice: «Tengo auto, les ayudo a llevar.»' },
            { zh: '他们搬了一上午，终于搬完了。', zhT: '他們搬了一上午，終於搬完了。', es: 'Cargaron toda la mañana y por fin terminaron.' },
            { zh: '小林的妈妈说：「太谢谢您了！」', zhT: '小林的媽媽說：「太謝謝您了！」', es: 'La mamá de Xiaolin dice: «¡Mil gracias!»' },
            { zh: '老王说：「都是邻居，不用客气。」', zhT: '老王說：「都是鄰居，不用客氣。」', es: 'Lao Wang dice: «Somos vecinos, no hay de qué.»' },
            { zh: '下午，新家来了很多朋友。', zhT: '下午，新家來了很多朋友。', es: 'A la tarde llegaron muchos amigos al hogar nuevo.' },
            { zh: '有人送花，有人送杯子。', zhT: '有人送花，有人送杯子。', es: 'Unos traen flores, otros tazas.' },
            { zh: '小林发现：搬新家不但累，而且快乐。', zhT: '小林發現：搬新家不但累，而且快樂。', es: 'Xiaolin descubrió que mudarse, además de cansar, da alegría.' },
            { zh: '晚上，他给老王打了一个电话。', zhT: '晚上，他給老王打了一個電話。', es: 'A la noche le hace una llamada a Lao Wang.' },
            { zh: '他说：「以后常来我们家玩！」', zhT: '他說：「以後常來我們家玩！」', es: 'Le dice: «De ahora en más, vení seguido a casa.»' },
            { zh: '老王笑着说：「好啊，咱们已经是朋友了。」', zhT: '老王笑著說：「好啊，咱們已經是朋友了。」', es: 'Lao Wang, sonriendo: «¡Claro! Ya somos amigos.»' }
        ],
        quiz: [
            { zh: '新房子在大学___，环境很好。', zhT: '新房子在大學___，環境很好。', es: 'El departamento nuevo queda cerca de la universidad.',
              opts: [
                { z: '附近', t: '附近', p: 'fùjìn', e: 'Cerca, aledaño' },
                { z: '中间', t: '中間', p: 'zhōngjiān', e: 'En el medio' },
                { z: '后面', t: '後面', p: 'hòumiàn', e: 'Atrás' } ] },
            { zh: '可是搬家很___。', zhT: '可是搬家很___。', es: 'Pero mudarse es un lío.',
              opts: [
                { z: '麻烦', t: '麻煩', p: 'máfan', e: 'Complicado, un lío' },
                { z: '便宜', t: '便宜', p: 'piányi', e: 'Barato' },
                { z: '干净', t: '乾淨', p: 'gānjìng', e: 'Limpio' } ] },
            { zh: '东西太多了，一个周末都搬不___。', zhT: '東西太多了，一個週末都搬不___。', es: 'Hay demasiadas cosas: ni un fin de semana alcanza.',
              opts: [
                { z: '完', t: '完', p: 'wán', e: 'Terminar (搬不完: no se termina)' },
                { z: '对', t: '對', p: 'duì', e: 'Correcto' },
                { z: '懂', t: '懂', p: 'dǒng', e: 'Entender' } ] },
            { zh: '___老王听说了，马上过来帮忙。', zhT: '___老王聽說了，馬上過來幫忙。', es: 'El vecino Lao Wang se enteró y vino a ayudar.',
              opts: [
                { z: '邻居', t: '鄰居', p: 'línjū', e: 'Vecino' },
                { z: '同学', t: '同學', p: 'tóngxué', e: 'Compañero de estudio' },
                { z: '老板', t: '老闆', p: 'lǎobǎn', e: 'Jefe, patrón' } ] },
            { zh: '邻居老王听说了，___过来帮忙。', zhT: '鄰居老王聽說了，___過來幫忙。', es: 'El vecino Lao Wang se enteró y vino enseguida.',
              opts: [
                { z: '马上', t: '馬上', p: 'mǎshàng', e: 'Enseguida' },
                { z: '已经', t: '已經', p: 'yǐjīng', e: 'Ya' },
                { z: '还是', t: '還是', p: 'háishì', e: 'O bien, todavía' } ] },
            { zh: '他们搬了一上午，___搬完了。', zhT: '他們搬了一上午，___搬完了。', es: 'Cargaron toda la mañana y por fin terminaron.',
              opts: [
                { z: '终于', t: '終於', p: 'zhōngyú', e: 'Por fin' },
                { z: '其实', t: '其實', p: 'qíshí', e: 'En realidad' },
                { z: '突然', t: '突然', p: 'tūrán', e: 'De repente' } ] },
            { zh: '都是邻居，不用___。', zhT: '都是鄰居，不用___。', es: 'Somos vecinos, no hay de qué.',
              opts: [
                { z: '客气', t: '客氣', p: 'kèqi', e: 'Formalidad (不用客气: no hay de qué)' },
                { z: '着急', t: '著急', p: 'zhāojí', e: 'Preocuparse, apurarse' },
                { z: '生气', t: '生氣', p: 'shēngqì', e: 'Enojarse' } ] },
            { zh: '有人送花，有人送___。', zhT: '有人送花，有人送___。', es: 'Unos traen flores, otros tazas.',
              opts: [
                { z: '杯子', t: '杯子', p: 'bēizi', e: 'Taza, vaso' },
                { z: '手机', t: '手機', p: 'shǒujī', e: 'Celular' },
                { z: '眼镜', t: '眼鏡', p: 'yǎnjìng', e: 'Anteojos' } ] },
            { zh: '搬新家不但累，___快乐。', zhT: '搬新家不但累，___快樂。', es: 'Mudarse, además de cansar, da alegría.',
              opts: [
                { z: '而且', t: '而且', p: 'érqiě', e: 'Sino también' },
                { z: '然后', t: '然後', p: 'ránhòu', e: 'Después' },
                { z: '或者', t: '或者', p: 'huòzhě', e: 'O bien' } ] },
            { zh: '他说：「以后___来我们家玩！」', zhT: '他說：「以後___來我們家玩！」', es: '«De ahora en más, vení seguido a casa.»',
              opts: [
                { z: '常', t: '常', p: 'cháng', e: 'A menudo' },
                { z: '再', t: '再', p: 'zài', e: 'Otra vez' },
                { z: '还', t: '還', p: 'hái', e: 'Todavía' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 3 · B — 迟到之后 · 突然/生气/重要 · gramática 得/complemento
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h3-chidao',
        hsk: 3,
        emoji: '⏰',
        titleZh: '迟到之后',
        titleZhT: '遲到之後',
        titleEs: 'Después de llegar tarde',
        blurb: 'Una noche de estudio, una bici a toda velocidad y la lección más amable sobre el tiempo.',
        lines: [
            { zh: '李明是个好学生，上学从来不迟到。', zhT: '李明是個好學生，上學從來不遲到。', es: 'Liming es un buen alumno: nunca llega tarde.' },
            { zh: '可是今天，他迟到了二十分钟。', zhT: '可是今天，他遲到了二十分鐘。', es: 'Pero hoy llegó veinte minutos tarde.' },
            { zh: '昨天晚上，他复习到十二点。', zhT: '昨天晚上，他復習到十二點。', es: 'Anoche estuvo repasando hasta las doce.' },
            { zh: '早上，他起晚了。', zhT: '早上，他起晚了。', es: 'A la mañana se levantó tarde.' },
            { zh: '他骑车往学校跑，骑得很快。', zhT: '他騎車往學校跑，騎得很快。', es: 'Tomó la bici hacia la escuela y pedaleó a toda velocidad.' },
            { zh: '路上，突然下起雨来。', zhT: '路上，突然下起雨來。', es: 'En el camino, de repente se puso a llover.' },
            { zh: '他没带雨伞，衣服都湿了。', zhT: '他沒帶雨傘，衣服都濕了。', es: 'No llevó paraguas y se mojó toda la ropa.' },
            { zh: '雨越下越大，路上的人都在跑。', zhT: '雨越下越大，路上的人都在跑。', es: 'La lluvia caía cada vez más fuerte y todos corrían.' },
            { zh: '到学校的时候，第一节课已经开始了。', zhT: '到學校的時候，第一節課已經開始了。', es: 'Cuando llegó, la primera clase ya había empezado.' },
            { zh: '他站在门口，脸红了。', zhT: '他站在門口，臉紅了。', es: 'Quedó parado en la puerta, rojo de vergüenza.' },
            { zh: '老师没有生气。', zhT: '老師沒有生氣。', es: 'El maestro no se enojó.' },
            { zh: '下课后，老师把他叫到办公室。', zhT: '下課後，老師把他叫到辦公室。', es: 'Terminada la clase, lo llamó a la oficina.' },
            { zh: '老师说：「学习重要，身体也重要。」', zhT: '老師說：「學習重要，身體也重要。」', es: 'El maestro dice: «Estudiar es importante, pero la salud también.»' },
            { zh: '李明的脸更红了，他小声说：「对不起。」', zhT: '李明的臉更紅了，他小聲說：「對不起。」', es: 'Liming se puso aún más rojo y murmuró: «Perdón.»' },
            { zh: '老师笑着说：「以后早点睡，就不会迟到了。」', zhT: '老師笑著說：「以後早點睡，就不會遲到了。」', es: 'El maestro, sonriendo: «Dormí temprano y no llegarás tarde.»' },
            { zh: '从那天起，李明每天十点前睡觉。', zhT: '從那天起，李明每天十點前睡覺。', es: 'Desde ese día, Liming se acuesta antes de las diez.' }
        ],
        quiz: [
            { zh: '李明上学从来不___。', zhT: '李明上學從來不___。', es: 'Liming nunca llega tarde a la escuela.',
              opts: [
                { z: '迟到', t: '遲到', p: 'chídào', e: 'Llegar tarde' },
                { z: '生气', t: '生氣', p: 'shēngqì', e: 'Enojarse' },
                { z: '请假', t: '請假', p: 'qǐngjià', e: 'Pedir permiso' } ] },
            { zh: '可是今天，他___了二十分钟。', zhT: '可是今天，他___了二十分鐘。', es: 'Pero hoy llegó veinte minutos tarde.',
              opts: [
                { z: '迟到', t: '遲到', p: 'chídào', e: 'Llegar tarde' },
                { z: '出发', t: '出發', p: 'chūfā', e: 'Partir' },
                { z: '回答', t: '回答', p: 'huídá', e: 'Responder' } ] },
            { zh: '昨天晚上，他___到十二点。', zhT: '昨天晚上，他___到十二點。', es: 'Anoche estuvo repasando hasta las doce.',
              opts: [
                { z: '复习', t: '復習', p: 'fùxí', e: 'Repasar' },
                { z: '解决', t: '解決', p: 'jiějué', e: 'Resolver' },
                { z: '选择', t: '選擇', p: 'xuǎnzé', e: 'Elegir' } ] },
            { zh: '早上，他___晚了。', zhT: '早上，他___晚了。', es: 'A la mañana se levantó tarde.',
              opts: [
                { z: '起', t: '起', p: 'qǐ', e: 'Levantarse (起晚: tarde de levantarse)' },
                { z: '走', t: '走', p: 'zǒu', e: 'Caminar' },
                { z: '来', t: '來', p: 'lái', e: 'Venir' } ] },
            { zh: '路上，___下起雨来。', zhT: '路上，___下起雨來。', es: 'En el camino, de repente se puso a llover.',
              opts: [
                { z: '突然', t: '突然', p: 'tūrán', e: 'De repente' },
                { z: '当然', t: '當然', p: 'dāngrán', e: 'Por supuesto' },
                { z: '原来', t: '原來', p: 'yuánlái', e: 'Resulta que' } ] },
            { zh: '他没带雨伞，___都湿了。', zhT: '他沒帶雨傘，___都濕了。', es: 'No llevó paraguas y se mojó toda la ropa.',
              opts: [
                { z: '衣服', t: '衣服', p: 'yīfu', e: 'Ropa' },
                { z: '问题', t: '問題', p: 'wèntí', e: 'Problema' },
                { z: '作业', t: '作業', p: 'zuòyè', e: 'Tarea' } ] },
            { zh: '第一节课已经___了。', zhT: '第一節課已經___了。', es: 'La primera clase ya había empezado.',
              opts: [
                { z: '开始', t: '開始', p: 'kāishǐ', e: 'Empezar' },
                { z: '结束', t: '結束', p: 'jiéshù', e: 'Terminar' },
                { z: '上课', t: '上課', p: 'shàngkè', e: 'Dar/tomar clase' } ] },
            { zh: '他站在门口，___红了。', zhT: '他站在門口，___紅了。', es: 'Quedó parado en la puerta, rojo de vergüenza.',
              opts: [
                { z: '脸', t: '臉', p: 'liǎn', e: 'Cara' },
                { z: '头', t: '頭', p: 'tóu', e: 'Cabeza' },
                { z: '手', t: '手', p: 'shǒu', e: 'Mano' } ] },
            { zh: '老师没有___。', zhT: '老師沒有___。', es: 'El maestro no se enojó.',
              opts: [
                { z: '生气', t: '生氣', p: 'shēngqì', e: 'Enojarse' },
                { z: '说话', t: '說話', p: 'shuōhuà', e: 'Hablar' },
                { z: '睡觉', t: '睡覺', p: 'shuìjiào', e: 'Dormir' } ] },
            { zh: '老师说：「学习重要，___也重要。」', zhT: '老師說：「學習重要，___也重要。」', es: '«Estudiar es importante, pero la salud también.»',
              opts: [
                { z: '身体', t: '身體', p: 'shēntǐ', e: 'Cuerpo, salud' },
                { z: '问题', t: '問題', p: 'wèntí', e: 'Problema' },
                { z: '手机', t: '手機', p: 'shǒujī', e: 'Celular' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 4 · A — 面试 · 经验/态度/通知 · vocabulario laboral abstracto
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h4-mianshi',
        hsk: 4,
        emoji: '💼',
        titleZh: '一次难忘的面试',
        titleZhT: '一次難忘的面試',
        titleEs: 'La entrevista inolvidable',
        blurb: 'Veinte currículums, una sola respuesta y la honestidad convertida en mejor carta de presentación.',
        lines: [
            { zh: '大学毕业以后，大卫想找一份理想的工作。', zhT: '大學畢業以後，大衛想找一份理想的工作。', es: 'Después de recibirse, David buscaba el trabajo ideal.' },
            { zh: '他在网上发了二十份简历。', zhT: '他在網上發了二十份簡歷。', es: 'Mandó veinte currículums por internet.' },
            { zh: '大部分公司都没有消息。', zhT: '大部分公司都沒有消息。', es: 'La mayoría de las empresas no respondieron.' },
            { zh: '只有一家公司请他去面试。', zhT: '只有一家公司請他去面試。', es: 'Solo una empresa lo invitó a una entrevista.' },
            { zh: '面试那天，他很紧张。', zhT: '面試那天，他很緊張。', es: 'El día de la entrevista estaba muy nervioso.' },
            { zh: '经理问了他十个问题。', zhT: '經理問了他十個問題。', es: 'El gerente le hizo diez preguntas.' },
            { zh: '大卫以前没有工作经验。', zhT: '大衛以前沒有工作經驗。', es: 'David no tenía experiencia laboral previa.' },
            { zh: '但是他很诚实。', zhT: '但是他很誠實。', es: 'Pero era muy honesto.' },
            { zh: '他说：「经验少，我可以学；态度好，是我的优点。」', zhT: '他說：「經驗少，我可以學；態度好，是我的優點。」', es: 'Dijo: «Poca experiencia, la voy ganando; buena actitud, esa es mi virtud.»' },
            { zh: '经理觉得他的态度不错。', zhT: '經理覺得他的態度不錯。', es: 'Al gerente le gustó su actitud.' },
            { zh: '一个星期后，公司通知他被录取了。', zhT: '一個星期後，公司通知他被錄取了。', es: 'Una semana después, la empresa le avisó que había quedado.' },
            { zh: '大卫高兴得跳了起来。', zhT: '大衛高興得跳了起來。', es: 'David saltó de la alegría.' },
            { zh: '朋友问他成功的秘密。', zhT: '朋友問他成功的秘密。', es: 'Los amigos le preguntaron el secreto del éxito.' },
            { zh: '他说：「机会都会来，最重要的是准备好。」', zhT: '他說：「機會都會來，最重要的是準備好。」', es: 'Dijo: «Las oportunidades llegan; lo importante es estar preparado.»' },
            { zh: '现在，他每天都努力工作。', zhT: '現在，他每天都努力工作。', es: 'Ahora trabaja con ganas todos los días.' }
        ],
        quiz: [
            { zh: '大卫想找一份___的工作。', zhT: '大衛想找一份___的工作。', es: 'David buscaba el trabajo ideal.',
              opts: [
                { z: '理想', t: '理想', p: 'lǐxiǎng', e: 'Ideal' },
                { z: '便宜', t: '便宜', p: 'piányi', e: 'Barato' },
                { z: '危险', t: '危險', p: 'wēixiǎn', e: 'Peligroso' } ] },
            { zh: '他在网上发了二十份___。', zhT: '他在網上發了二十份___。', es: 'Mandó veinte currículums por internet.',
              opts: [
                { z: '简历', t: '簡歷', p: 'jiǎnlì', e: 'Currículum' },
                { z: '邮件', t: '郵件', p: 'yóujiàn', e: 'Correo (electrónico)' },
                { z: '礼物', t: '禮物', p: 'lǐwù', e: 'Regalo' } ] },
            { zh: '大部分公司都没有___。', zhT: '大部分公司都沒有___。', es: 'La mayoría de las empresas no respondieron.',
              opts: [
                { z: '消息', t: '消息', p: 'xiāoxi', e: 'Noticias, respuesta' },
                { z: '办法', t: '辦法', p: 'bànfǎ', e: 'Solución, manera' },
                { z: '时间', t: '時間', p: 'shíjiān', e: 'Tiempo' } ] },
            { zh: '只有一家公司请他去___。', zhT: '只有一家公司請他去___。', es: 'Solo una empresa lo invitó a una entrevista.',
              opts: [
                { z: '面试', t: '面試', p: 'miànshì', e: 'Entrevista' },
                { z: '聊天', t: '聊天', p: 'liáotiān', e: 'Charlar' },
                { z: '看病', t: '看病', p: 'kànbìng', e: 'Ir al médico' } ] },
            { zh: '面试那天，他很___。', zhT: '面試那天，他很___。', es: 'El día de la entrevista estaba muy nervioso.',
              opts: [
                { z: '紧张', t: '緊張', p: 'jǐnzhāng', e: 'Nervioso' },
                { z: '舒服', t: '舒服', p: 'shūfu', e: 'Cómodo' },
                { z: '骄傲', t: '驕傲', p: 'jiāo’ào', e: 'Orgulloso' } ] },
            { zh: '大卫以前没有工作___。', zhT: '大衛以前沒有工作___。', es: 'David no tenía experiencia laboral previa.',
              opts: [
                { z: '经验', t: '經驗', p: 'jīngyàn', e: 'Experiencia' },
                { z: '意见', t: '意見', p: 'yìjiàn', e: 'Opinión' },
                { z: '条件', t: '條件', p: 'tiáojiàn', e: 'Condición' } ] },
            { zh: '但是他很___。', zhT: '但是他很___。', es: 'Pero era muy honesto.',
              opts: [
                { z: '诚实', t: '誠實', p: 'chéngshí', e: 'Honesto' },
                { z: '严重', t: '嚴重', p: 'yánzhòng', e: 'Grave' },
                { z: '复杂', t: '複雜', p: 'fùzá', e: 'Complejo' } ] },
            { zh: '态度好，是我的___。', zhT: '態度好，是我的___。', es: 'Buena actitud, esa es mi virtud.',
              opts: [
                { z: '优点', t: '優點', p: 'yōudiǎn', e: 'Virtud, ventaja' },
                { z: '缺点', t: '缺點', p: 'quēdiàn', e: 'Defecto' },
                { z: '目的', t: '目的', p: 'mùdì', e: 'Objetivo' } ] },
            { zh: '一个星期后，公司___他被录取了。', zhT: '一個星期後，公司___他被錄取了。', es: 'Una semana después, la empresa le avisó que había quedado.',
              opts: [
                { z: '通知', t: '通知', p: 'tōngzhī', e: 'Avisar, notificar' },
                { z: '邀请', t: '邀請', p: 'yāoqǐng', e: 'Invitar' },
                { z: '要求', t: '要求', p: 'yāoqiú', e: 'Exigir' } ] },
            { zh: '朋友问他___的秘密。', zhT: '朋友問他___的秘密。', es: 'Los amigos le preguntaron el secreto del éxito.',
              opts: [
                { z: '成功', t: '成功', p: 'chénggōng', e: 'Éxito, triunfar' },
                { z: '失败', t: '失敗', p: 'shībài', e: 'Fracaso' },
                { z: '未来', t: '未來', p: 'wèilái', e: 'Futuro' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 4 · B — 减肥记 · 忍不住/不但…而且/又…又/坚持 · narrativa humor
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h4-jianfei',
        hsk: 4,
        emoji: '🥗',
        titleZh: '减肥记',
        titleZhT: '減肥記',
        titleEs: 'Crónica de una dieta',
        blurb: 'Torta contra fuerza de voluntad: Xiaoli aprende que lo difícil no es empezar, sino seguir.',
        lines: [
            { zh: '小李最近胖了五公斤。', zhT: '小李最近胖了五公斤。', es: 'A Xiaoli, últimamente, le engordaron cinco kilos.' },
            { zh: '医生说：「你要多锻炼，少吃肉。」', zhT: '醫生說：「你要多鍛煉，少吃肉。」', es: 'El médico dice: «Tenés que ejercitarte más y comer menos carne.»' },
            { zh: '小李决定减肥。', zhT: '小李決定減肥。', es: 'Xiaoli decide ponerse a dieta.' },
            { zh: '第一天，他只吃蔬菜和水果。', zhT: '第一天，他只吃蔬菜和水果。', es: 'El primer día comió solo verdura y fruta.' },
            { zh: '第二天，他忍不住了，吃了两块蛋糕。', zhT: '第二天，他忍不住了，吃了兩塊蛋糕。', es: 'Al segundo día no aguantó y se comió dos porciones de torta.' },
            { zh: '他一边吃，一边说：「明天再减肥。」', zhT: '他一邊吃，一邊說：「明天再減肥。」', es: 'Mientras comía repetía: «Mañana arranco la dieta.»' },
            { zh: '一个星期过去，一点儿效果都没有。', zhT: '一個星期過去，一點兒效果都沒有。', es: 'Pasó una semana y ni un pelo de resultado.' },
            { zh: '他很失望，想放弃。', zhT: '他很失望，想放棄。', es: 'Se desanimó y quiso rendirse.' },
            { zh: '女朋友说：「减肥不能着急。」', zhT: '女朋友說：「減肥不能著急。」', es: 'La novia dice: «La dieta no admite apuros.»' },
            { zh: '「不但要少吃，而且要多运动。」', zhT: '「不但要少吃，而且要多運動。」', es: '«No alcanza con comer menos: además hay que moverse.»' },
            { zh: '从那天起，他每天早上跑步半小时。', zhT: '從那天起，他每天早上跑步半小時。', es: 'Desde ese día corre media hora cada mañana.' },
            { zh: '开始的几天，他又累又饿。', zhT: '開始的幾天，他又累又餓。', es: 'Los primeros días andaba cansado y hambriento a la vez.' },
            { zh: '但是他坚持了下来。', zhT: '但是他堅持了下來。', es: 'Pero se mantuvo firme.' },
            { zh: '一个月以后，他瘦了三公斤，人也精神了。', zhT: '一個月以後，他瘦了三公斤，人也精神了。', es: 'Al mes había bajado tres kilos y se veía con más energía.' },
            { zh: '他说：「成功其实不难，难的是坚持。」', zhT: '他說：「成功其實不難，難的是堅持。」', es: 'Dice: «Triunfar no es difícil; lo difícil es sostenerlo.»' },
            { zh: '朋友们都说他变了一个人。', zhT: '朋友們都說他變了一個人。', es: 'Los amigos dicen que es otra persona.' }
        ],
        quiz: [
            { zh: '小李最近___了五公斤。', zhT: '小李最近___了五公斤。', es: 'A Xiaoli le engordaron cinco kilos.',
              opts: [
                { z: '胖', t: '胖', p: 'pàng', e: 'Engordar, gordo' },
                { z: '瘦', t: '瘦', p: 'shòu', e: 'Adelgazar, flaco' },
                { z: '累', t: '累', p: 'lèi', e: 'Cansado' } ] },
            { zh: '医生说：「你要多___，少吃肉。」', zhT: '醫生說：「你要多___，少吃肉。」', es: '«Tenés que ejercitarte más y comer menos carne.»',
              opts: [
                { z: '锻炼', t: '鍛煉', p: 'duànliàn', e: 'Ejercitarse' },
                { z: '休息', t: '休息', p: 'xiūxi', e: 'Descansar' },
                { z: '睡觉', t: '睡覺', p: 'shuìjiào', e: 'Dormir' } ] },
            { zh: '小李决定___。', zhT: '小李決定___。', es: 'Xiaoli decide ponerse a dieta.',
              opts: [
                { z: '减肥', t: '減肥', p: 'jiǎnféi', e: 'Hacer dieta, adelgazar' },
                { z: '搬家', t: '搬家', p: 'bānjiā', e: 'Mudarse' },
                { z: '请假', t: '請假', p: 'qǐngjià', e: 'Pedir permiso' } ] },
            { zh: '第二天，他___了，吃了两块蛋糕。', zhT: '第二天，他___了，吃了兩塊蛋糕。', es: 'Al segundo día no aguantó y se comió dos porciones de torta.',
              opts: [
                { z: '忍不住', t: '忍不住', p: 'rěnbuzhù', e: 'No poder aguantar' },
                { z: '来不及', t: '來不及', p: 'láibují', e: 'No llegar a tiempo' },
                { z: '舍不得', t: '捨不得', p: 'shěbude', e: 'No animarse a desprenderse' } ] },
            { zh: '一个星期过去，一点儿___都没有。', zhT: '一個星期過去，一點兒___都沒有。', es: 'Pasó una semana y ni un pelo de resultado.',
              opts: [
                { z: '效果', t: '效果', p: 'xiàoguǒ', e: 'Efecto, resultado' },
                { z: '意见', t: '意見', p: 'yìjiàn', e: 'Opinión' },
                { z: '机会', t: '機會', p: 'jīhuì', e: 'Oportunidad' } ] },
            { zh: '他很失望，想___。', zhT: '他很失望，想___。', es: 'Se desanimó y quiso rendirse.',
              opts: [
                { z: '放弃', t: '放棄', p: 'fàngqì', e: 'Rendirse, abandonar' },
                { z: '坚持', t: '堅持', p: 'jiānchí', e: 'Persistir' },
                { z: '提高', t: '提高', p: 'tígāo', e: 'Elevar, mejorar' } ] },
            { zh: '不但要少吃，___要多运动。', zhT: '不但要少吃，___要多運動。', es: 'No alcanza con comer menos: además hay que moverse.',
              opts: [
                { z: '而且', t: '而且', p: 'érqiě', e: 'Sino también' },
                { z: '但是', t: '但是', p: 'dànshì', e: 'Pero' },
                { z: '虽然', t: '雖然', p: 'suīrán', e: 'Aunque' } ] },
            { zh: '从那天起，他每天早上___半小时。', zhT: '從那天起，他每天早上___半小時。', es: 'Desde ese día corre media hora cada mañana.',
              opts: [
                { z: '跑步', t: '跑步', p: 'pǎobù', e: 'Correr' },
                { z: '散步', t: '散步', p: 'sànbù', e: 'Caminar, pasear' },
                { z: '购物', t: '購物', p: 'gòuwù', e: 'Hacer compras' } ] },
            { zh: '开始的几天，他___累又饿。', zhT: '開始的幾天，他___累又餓。', es: 'Los primeros días andaba cansado y hambriento a la vez.',
              opts: [
                { z: '又', t: '又', p: 'yòu', e: '又…又: tanto… como…' },
                { z: '再', t: '再', p: 'zài', e: 'Otra vez' },
                { z: '还', t: '還', p: 'hái', e: 'Todavía' } ] },
            { zh: '一个月以后，他___了三公斤。', zhT: '一個月以後，他___了三公斤。', es: 'Al mes había bajado tres kilos.',
              opts: [
                { z: '瘦', t: '瘦', p: 'shòu', e: 'Adelgazar' },
                { z: '胖', t: '胖', p: 'pàng', e: 'Engordar' },
                { z: '变', t: '變', p: 'biàn', e: 'Cambiar' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 5 · A — 网购改变生活 · 现象/观点/冲击/趋势 · debate argumental
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h5-wanggou',
        hsk: 5,
        emoji: '🛒',
        titleZh: '网购改变生活',
        titleZhT: '網購改變生活',
        titleEs: 'Comprar en línea cambió la vida',
        blurb: 'Debate en dos voces: la comodidad de la compra en línea contra las tiendas de barrio que se apagan.',
        lines: [
            { zh: '最近十年，网购在中国发展得非常快。', zhT: '最近十年，網購在中國發展得非常快。', es: 'En la última década, comprar en línea creció a una velocidad enorme en China.' },
            { zh: '小到文具，大到家具，都可以在网上买。', zhT: '小到文具，大到傢具，都可以在網上買。', es: 'Desde una lapicera hasta un mueble: todo se compra en la red.' },
            { zh: '这种现象引起了大家的讨论。', zhT: '這種現象引起了大家的討論。', es: 'El fenómeno despertó un gran debate.' },
            { zh: '支持的人认为，网购带来了巨大的便利。', zhT: '支持的人認為，網購帶來了巨大的便利。', es: 'Quienes lo apoyan creen que trajo una comodidad enorme.' },
            { zh: '顾客不用出门，商品直接送到家。', zhT: '顧客不用出門，商品直接送到家。', es: 'El cliente no sale de casa: la mercadería llega hasta la puerta.' },
            { zh: '而且，网上的价格往往更便宜。', zhT: '而且，網上的價格往往更便宜。', es: 'Además, los precios en línea suelen ser más baratos.' },
            { zh: '反对的人却有不同的观点。', zhT: '反對的人卻有不同的觀點。', es: 'Quienes se oponen, en cambio, tienen otra mirada.' },
            { zh: '他们指出，实体店受到了严重的冲击。', zhT: '他們指出，實體店受到了嚴重的衝擊。', es: 'Señalan que las tiendas físicas sufren un golpe durísimo.' },
            { zh: '一家老书店的老板说：「客人都上网了，我们很难维持。」', zhT: '一家老書店的老闆說：「客人都上網了，我們很難維持。」', es: 'El dueño de una librería antigua dice: «Los clientes se fueron a la red; nos cuesta seguir en pie.»' },
            { zh: '王教授认为，这两种观点都有道理。', zhT: '王教授認為，這兩種觀點都有道理。', es: 'El profesor Wang cree que ambas posturas tienen razón.' },
            { zh: '他说：「网购是一种趋势，我们无法阻止。」', zhT: '他說：「網購是一種趨勢，我們無法阻止。」', es: 'Dice: «Comprar en línea es una tendencia; no se puede frenar.»' },
            { zh: '但是，我们应该想办法，让网络和实体店互相促进。', zhT: '但是，我們應該想辦法，讓網絡和實體店互相促進。', es: 'Pero hay que ingeniárselas para que la red y la tienda se impulsen mutuamente.' },
            { zh: '比如，书店可以变成人们交流的场所。', zhT: '比如，書店可以變成人們交流的場所。', es: 'Por ejemplo, la librería puede volverse un punto de encuentro.' },
            { zh: '讨论没有结束，但大家都承认：生活已经改变了。', zhT: '討論沒有結束，但大家都承認：生活已經改變了。', es: 'El debate sigue abierto, pero todos admiten que la vida ya cambió.' },
            { zh: '未来会怎样？谁也说不准。', zhT: '未來會怎樣？誰也說不準。', es: '¿Y el futuro? Nadie lo sabe con certeza.' }
        ],
        quiz: [
            { zh: '小到文具，大到___，都可以在网上买。', zhT: '小到文具，大到___，都可以在網上買。', es: 'Desde una lapicera hasta un mueble: todo se compra en la red.',
              opts: [
                { z: '家具', t: '傢具', p: 'jiājù', e: 'Muebles' },
                { z: '水果', t: '水果', p: 'shuǐguǒ', e: 'Fruta' },
                { z: '书包', t: '書包', p: 'shūbāo', e: 'Mochila' } ] },
            { zh: '这种___引起了大家的讨论。', zhT: '這種___引起了大家的討論。', es: 'El fenómeno despertó un gran debate.',
              opts: [
                { z: '现象', t: '現象', p: 'xiànxiàng', e: 'Fenómeno' },
                { z: '意见', t: '意見', p: 'yìjiàn', e: 'Opinión' },
                { z: '观众', t: '觀眾', p: 'guānzhòng', e: 'Público' } ] },
            { zh: '网购带来了___的便利。', zhT: '網購帶來了___的便利。', es: 'Trajo una comodidad enorme.',
              opts: [
                { z: '巨大', t: '巨大', p: 'jùdà', e: 'Enorme' },
                { z: '严重', t: '嚴重', p: 'yánzhòng', e: 'Grave' },
                { z: '强烈', t: '強烈', p: 'qiángliè', e: 'Intenso' } ] },
            { zh: '顾客不用出门，___直接送到家。', zhT: '顧客不用出門，___直接送到家。', es: 'El cliente no sale de casa: la mercadería llega hasta la puerta.',
              opts: [
                { z: '商品', t: '商品', p: 'shāngpǐn', e: 'Mercadería, producto' },
                { z: '价格', t: '價格', p: 'jiàgé', e: 'Precio' },
                { z: '质量', t: '質量', p: 'zhìliàng', e: 'Calidad' } ] },
            { zh: '网上的价格___更便宜。', zhT: '網上的價格___更便宜。', es: 'Los precios en línea suelen ser más baratos.',
              opts: [
                { z: '往往', t: '往往', p: 'wǎngwǎng', e: 'Con frecuencia, suelen' },
                { z: '居然', t: '居然', p: 'jūrán', e: 'Sorprendentemente' },
                { z: '仍然', t: '仍然', p: 'réngrán', e: 'Aún, todavía' } ] },
            { zh: '反对的人却有___的观点。', zhT: '反對的人卻有___的觀點。', es: 'Quienes se oponen tienen otra mirada.',
              opts: [
                { z: '不同', t: '不同', p: 'bùtóng', e: 'Distinto' },
                { z: '丰富', t: '豐富', p: 'fēngfù', e: 'Abundante, rico' },
                { z: '普通', t: '普通', p: 'pǔtōng', e: 'Común' } ] },
            { zh: '实体店受到了严重的___。', zhT: '實體店受到了嚴重的___。', es: 'Las tiendas físicas sufren un golpe durísimo.',
              opts: [
                { z: '冲击', t: '衝擊', p: 'chōngjī', e: 'Golpe, impacto' },
                { z: '欢迎', t: '歡迎', p: 'huānyíng', e: 'Bienvenida' },
                { z: '保护', t: '保護', p: 'bǎohù', e: 'Protección' } ] },
            { zh: '「客人都上网了，我们很难___。」', zhT: '「客人都上網了，我們很難___。」', es: '«Los clientes se fueron a la red; nos cuesta seguir en pie.»',
              opts: [
                { z: '维持', t: '維持', p: 'wéichí', e: 'Mantener, sostener' },
                { z: '提高', t: '提高', p: 'tígāo', e: 'Elevar' },
                { z: '放弃', t: '放棄', p: 'fàngqì', e: 'Abandonar' } ] },
            { zh: '网购是一种___，我们无法阻止。', zhT: '網購是一種___，我們無法阻止。', es: 'Comprar en línea es una tendencia; no se puede frenar.',
              opts: [
                { z: '趋势', t: '趨勢', p: 'qūshì', e: 'Tendencia' },
                { z: '利益', t: '利益', p: 'lìyì', e: 'Interés, beneficio' },
                { z: '范围', t: '範圍', p: 'fànwéi', e: 'Alcance, ámbito' } ] },
            { zh: '书店可以变成人们___的场所。', zhT: '書店可以變成人們___的場所。', es: 'La librería puede volverse un punto de encuentro.',
              opts: [
                { z: '交流', t: '交流', p: 'jiāoliú', e: 'Intercambio' },
                { z: '劳动', t: '勞動', p: 'láodòng', e: 'Trabajo' },
                { z: '旅行', t: '旅行', p: 'lǚxíng', e: 'Viaje' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 5 · B — 茶馆的一下午 · 讲究/品尝/体现/积累 · cultura + procedimiento
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h5-chaguan',
        hsk: 5,
        emoji: '🍵',
        titleZh: '茶馆的一下午',
        titleZhT: '茶館的一下午',
        titleEs: 'Una tarde de casa de té',
        blurb: 'Té Longjing, pasos exactos y aroma lento: una amistad que aprende a detener el tiempo.',
        lines: [
            { zh: '周六下午，马丽请外国朋友安娜去茶馆。', zhT: '週六下午，馬麗請外國朋友安娜去茶館。', es: 'El sábado a la tarde, Mali invita a su amiga extranjera Anna a una casa de té.' },
            { zh: '茶馆在一条安静的老街上。', zhT: '茶館在一條安靜的老街上。', es: 'La casa de té queda en una calle vieja y tranquila.' },
            { zh: '屋里的布置古色古香。', zhT: '屋裡的佈置古色古香。', es: 'La ambientación del local respira aire antiguo.' },
            { zh: '马丽点了一壶龙井。', zhT: '馬麗點了一壺龍井。', es: 'Mali pide una tetera de Longjing.' },
            { zh: '她说：「喝茶在中国是一种文化。」', zhT: '她說：「喝茶在中國是一種文化。」', es: 'Dice: «Tomar té en China es toda una cultura.»' },
            { zh: '安娜问：「有什么讲究吗？」', zhT: '安娜問：「有什麼講究嗎？」', es: 'Anna pregunta: «¿Hay algún protocolo?»' },
            { zh: '马丽说：「首先，水不能太烫。」', zhT: '馬麗說：「首先，水不能太燙。」', es: 'Mali dice: «Primero: el agua no debe estar demasiado caliente.»' },
            { zh: '其次，第一泡茶一般用来洗杯子。', zhT: '其次，第一泡茶一般用來洗杯子。', es: 'Segundo: la primera infusión suele usarse para enjuagar las tazas.' },
            { zh: '安娜学着马丽的样子，慢慢地品尝。', zhT: '安娜學著馬麗的樣子，慢慢地品嚐。', es: 'Anna imita los gestos de Mali y prueba despacio.' },
            { zh: '她说：「这个茶有点苦，可是很香。」', zhT: '她說：「這個茶有點苦，可是很香。」', es: 'Dice: «Es un poco amargo, pero muy aromático.»' },
            { zh: '马丽说：「茶的香味，体现的是制茶人的功夫。」', zhT: '馬麗說：「茶的香味，體現的是製茶人的功夫。」', es: 'Mali dice: «El aroma del té refleja el oficio de quien lo elabora.»' },
            { zh: '她们一边喝茶，一边聊天，三个小时很快就过去了。', zhT: '她們一邊喝茶，一邊聊天，三個小時很快就過去了。', es: 'Entre té y charla, las tres horas volaron.' },
            { zh: '窗外偶尔有行人走过，脚步都不急。', zhT: '窗外偶爾有行人走過，腳步都不急。', es: 'Tras la ventana pasaban peatones ocasionales, sin apuro.' },
            { zh: '安娜说：「我体会到，喝茶不只是喝，更是休息心情。」', zhT: '安娜說：「我體會到，喝茶不只是喝，更是休息心情。」', es: 'Anna dice: «Me doy cuenta de que el té no es solo beber: es descansar el ánimo.»' },
            { zh: '马丽笑着说：「这就是茶文化的深厚积累。」', zhT: '馬麗笑著說：「這就是茶文化的深厚積累。」', es: 'Mali, sonriendo: «Eso es la profundidad que acumula la cultura del té.»' },
            { zh: '走出茶馆，安娜决定下个月再来。', zhT: '走出茶館，安娜決定下個月再來。', es: 'Al salir de la casa de té, Anna decide volver el mes próximo.' },
            { zh: '她还想学着泡茶呢。', zhT: '她還想學著泡茶呢。', es: 'Hasta quiere aprender a servir el té.' }
        ],
        quiz: [
            { zh: '屋里的___古色古香。', zhT: '屋裡的___古色古香。', es: 'La ambientación del local respira aire antiguo.',
              opts: [
                { z: '布置', t: '佈置', p: 'bùzhì', e: 'Ambientación, arreglo' },
                { z: '天气', t: '天氣', p: 'tiānqì', e: 'Clima' },
                { z: '计划', t: '計劃', p: 'jìhuà', e: 'Plan' } ] },
            { zh: '马丽___了一壶龙井。', zhT: '馬麗___了一壺龍井。', es: 'Mali pide una tetera de Longjing.',
              opts: [
                { z: '点', t: '點', p: 'diǎn', e: 'Pedir (de un menú)' },
                { z: '借', t: '借', p: 'jiè', e: 'Pedir prestado' },
                { z: '卖', t: '賣', p: 'mài', e: 'Vender' } ] },
            { zh: '喝茶在中国是一种___。', zhT: '喝茶在中國是一種___。', es: 'Tomar té en China es toda una cultura.',
              opts: [
                { z: '文化', t: '文化', p: 'wénhuà', e: 'Cultura' },
                { z: '体育', t: '體育', p: 'tǐyù', e: 'Deporte' },
                { z: '历史', t: '歷史', p: 'lìshǐ', e: 'Historia' } ] },
            { zh: '「___，水不能太烫。」', zhT: '「___，水不能太燙。」', es: '«Primero: el agua no debe estar demasiado caliente.»',
              opts: [
                { z: '首先', t: '首先', p: 'shǒuxiān', e: 'Primero' },
                { z: '其实', t: '其實', p: 'qíshí', e: 'En realidad' },
                { z: '果然', t: '果然', p: 'guǒrán', e: 'Tal como se esperaba' } ] },
            { zh: '「___，第一泡茶一般用来洗杯子。」', zhT: '「___，第一泡茶一般用來洗杯子。」', es: '«Segundo: la primera infusión sirve para enjuagar las tazas.»',
              opts: [
                { z: '其次', t: '其次', p: 'qícì', e: 'En segundo lugar' },
                { z: '突然', t: '突然', p: 'tūrán', e: 'De repente' },
                { z: '终于', t: '終於', p: 'zhōngyú', e: 'Por fin' } ] },
            { zh: '安娜学着马丽的样子，慢慢地___。', zhT: '安娜學著馬麗的樣子，慢慢地___。', es: 'Anna imita los gestos de Mali y prueba despacio.',
              opts: [
                { z: '品尝', t: '品嚐', p: 'pǐncháng', e: 'Degustar' },
                { z: '避免', t: '避免', p: 'bìmiǎn', e: 'Evitar' },
                { z: '满足', t: '滿足', p: 'mǎnzú', e: 'Satisfacer' } ] },
            { zh: '这个茶有点___，可是很香。', zhT: '這個茶有點___，可是很香。', es: 'Es un poco amargo, pero muy aromático.',
              opts: [
                { z: '苦', t: '苦', p: 'kǔ', e: 'Amargo' },
                { z: '甜', t: '甜', p: 'tián', e: 'Dulce' },
                { z: '辣', t: '辣', p: 'là', e: 'Picante' } ] },
            { zh: '茶的香味，___的是制茶人的功夫。', zhT: '茶的香味，___的是製茶人的功夫。', es: 'El aroma del té refleja el oficio de quien lo elabora.',
              opts: [
                { z: '体现', t: '體現', p: 'tǐxiàn', e: 'Reflejar, encarnar' },
                { z: '解决', t: '解決', p: 'jiějué', e: 'Resolver' },
                { z: '打破', t: '打破', p: 'dǎpò', e: 'Romper' } ] },
            { zh: '我___到，喝茶更是休息心情。', zhT: '我___到，喝茶更是休息心情。', es: 'Me doy cuenta de que el té es descansar el ánimo.',
              opts: [
                { z: '体会', t: '體會', p: 'tǐhuì', e: 'Comprender por experiencia' },
                { z: '打算', t: '打算', p: 'dǎsuàn', e: 'Pensar, planear' },
                { z: '估计', t: '估計', p: 'gūjì', e: 'Estimar' } ] },
            { zh: '这就是茶文化的深厚___。', zhT: '這就是茶文化的深厚___。', es: 'Eso es la profundidad que acumula la cultura del té.',
              opts: [
                { z: '积累', t: '積累', p: 'jīlěi', e: 'Acumulación' },
                { z: '优点', t: '優點', p: 'yōudiǎn', e: 'Virtud' },
                { z: '目的', t: '目的', p: 'mùdì', e: 'Objetivo' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 6 · A — 老字号的抉择 · 沿用/积淀/磋商/苛刻/破裂 · narrativa literaria
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h6-laozihao',
        hsk: 6,
        emoji: '🏮',
        titleZh: '老字号的抉择',
        titleZhT: '老字號的抉擇',
        titleEs: 'La decisión del local centenario',
        blurb: 'Doscientos años de salsa, una oferta imposible de rechazar y una conciencia que no está en venta.',
        lines: [
            { zh: '城南有一家两百年的老字号，专卖手工酱油。', zhT: '城南有一家兩百年的老字號，專賣手工醬油。', es: 'Al sur de la ciudad hay un local de doscientos años, de renombre, que vende solo salsa de soja artesanal.' },
            { zh: '店主姓陈，人称陈师傅。', zhT: '店主姓陳，人稱陳師傅。', es: 'El dueño se apellida Chen; todos le dicen maestro Chen.' },
            { zh: '他的酱油沿用祖传的工艺，从不偷工减料。', zhT: '他的醬油沿用祖傳的工藝，從不偷工減料。', es: 'Su salsa sigue el oficio heredado de los antepasados; jamás recorta pasos.' },
            { zh: '有人劝他：「用机器又快又便宜，何必这么固执？」', zhT: '有人勸他：「用機器又快又便宜，何必這麼固執？」', es: 'Algunos le dicen: «Con máquinas sería rápido y barato, ¿para qué tanta terquedad?»' },
            { zh: '陈师傅总是淡然一笑。', zhT: '陳師傅總是淡然一笑。', es: 'El maestro Chen sonríe siempre con serenidad.' },
            { zh: '他说：「味道里积淀着时间，机器省得掉工序，省不掉味道。」', zhT: '他說：「味道裡積澱著時間，機器省得掉工序，省不掉味道。」', es: 'Dice: «En el sabor se sedimenta el tiempo; las máquinas ahorran pasos, pero no ahorran sabor.»' },
            { zh: '去年冬天，一家集团看中了这块招牌。', zhT: '去年冬天，一家集團看中了這塊招牌。', es: 'El invierno pasado, un grupo empresarial puso el ojo en esa marca.' },
            { zh: '他们派人来磋商，愿意出高价收购。', zhT: '他們派人來磋商，願意出高價收購。', es: 'Enviaron negociadores dispuestos a comprarla a un precio alto.' },
            { zh: '条件很优厚，却也很苛刻：配方要交出来，招牌要换掉。', zhT: '條件很優厚，卻也很苛刻：配方要交出來，招牌要換掉。', es: 'La oferta era jugosa pero también dura: entregar la receta y cambiar el rótulo.' },
            { zh: '儿子劝父亲妥协：「时代变了，我们不能守着旧摊子过活。」', zhT: '兒子勸父親妥協：「時代變了，我們不能守著舊攤子過活。」', es: 'El hijo le pide ceder al padre: «Los tiempos cambiaron; no podemos vivir del puesto viejo.»' },
            { zh: '陈师傅沉默了很久。', zhT: '陳師傅沉默了很久。', es: 'El maestro Chen calló un largo rato.' },
            { zh: '他说：「招牌可以旧，良心不能旧。」', zhT: '他說：「招牌可以舊，良心不能舊。」', es: 'Dice: «El rótulo puede envejecer; la conciencia, no.»' },
            { zh: '谈判最终破裂，集团悻悻而去。', zhT: '談判最終破裂，集團悻悻而去。', es: 'La negociación se quebró y el grupo se retiró a regañadientes.' },
            { zh: '街坊们听说了，纷纷来店里买酱油，像过节一样。', zhT: '街坊們聽說了，紛紛來店裡買醬油，像過節一樣。', es: 'Los vecinos, al enterarse, llegaron en tropel a comprar salsa, como en las fiestas.' },
            { zh: '老字号依然立在巷口，酱香飘出很远。', zhT: '老字號依然立在巷口，醬香飄出很遠。', es: 'El local sigue en la esquina del callejón, y su aroma llega muy lejos.' }
        ],
        quiz: [
            { zh: '城南有一家两百年的老___，专卖手工酱油。', zhT: '城南有一家兩百年的老___，專賣手工醬油。', es: 'Al sur de la ciudad hay un local de renombre que vende salsa artesanal.',
              opts: [
                { z: '字号', t: '字號', p: 'zìhào', e: 'Negocio de renombre (老字号)' },
                { z: '价格', t: '價格', p: 'jiàgé', e: 'Precio' },
                { z: '地段', t: '地段', p: 'dìduàn', e: 'Ubicación, zona' } ] },
            { zh: '他的酱油___祖传的工艺。', zhT: '他的醬油___祖傳的工藝。', es: 'Su salsa sigue el oficio heredado de los antepasados.',
              opts: [
                { z: '沿用', t: '沿用', p: 'yányòng', e: 'Continuar usando' },
                { z: '摆脱', t: '擺脫', p: 'bǎituō', e: 'Despegarse de' },
                { z: '淡化', t: '淡化', p: 'dànhuà', e: 'Diluir, atenuar' } ] },
            { zh: '从不___减料。', zhT: '從不___減料。', es: 'Jamás recorta trabajo ni materiales.',
              opts: [
                { z: '偷工', t: '偷工', p: 'tōugōng', e: 'Escabullir trabajo (偷工减料)' },
                { z: '加工', t: '加工', p: 'jiāgōng', e: 'Procesar' },
                { z: '开工', t: '開工', p: 'kāigōng', e: 'Arrancar la obra' } ] },
            { zh: '用机器又快又便宜，何必这么___？', zhT: '用機器又快又便宜，何必這麼___？', es: 'Con máquinas sería rápido y barato, ¿para qué tanta terquedad?',
              opts: [
                { z: '固执', t: '固執', p: 'gùzhi', e: 'Terco, obstinado' },
                { z: '谦虚', t: '謙虛', p: 'qiānxū', e: 'Modesto' },
                { z: '委屈', t: '委屈', p: 'wěiqu', e: 'Sentirse agraviado' } ] },
            { zh: '陈师傅总是___一笑。', zhT: '陳師傅總是___一笑。', es: 'El maestro Chen sonríe siempre con serenidad.',
              opts: [
                { z: '淡然', t: '淡然', p: 'dànrán', e: 'Sereno, imperturbable' },
                { z: '愕然', t: '愕然', p: 'èrán', e: 'Estupefacto' },
                { z: '愤然', t: '憤然', p: 'fènrán', e: 'Indignado' } ] },
            { zh: '味道里___着时间。', zhT: '味道裡___著時間。', es: 'En el sabor se sedimenta el tiempo.',
              opts: [
                { z: '积淀', t: '積澱', p: 'jīdiàn', e: 'Sedimentar, acumularse' },
                { z: '缩小', t: '縮小', p: 'suōxiǎo', e: 'Reducir' },
                { z: '掩盖', t: '掩蓋', p: 'yǎngài', e: 'Encubrir' } ] },
            { zh: '一家集团看中了这块___。', zhT: '一家集團看中了這塊___。', es: 'Un grupo empresarial puso el ojo en esa marca.',
              opts: [
                { z: '招牌', t: '招牌', p: 'zhāopái', e: 'Marca, rótulo' },
                { z: '窗帘', t: '窗簾', p: 'chuānglián', e: 'Cortina' },
                { z: '柜台', t: '櫃檯', p: 'guìtái', e: 'Mostrador' } ] },
            { zh: '他们派人来___，愿意出高价收购。', zhT: '他們派人來___，願意出高價收購。', es: 'Enviaron negociadores dispuestos a comprarla.',
              opts: [
                { z: '磋商', t: '磋商', p: 'cuōshāng', e: 'Negociar' },
                { z: '插手', t: '插手', p: 'chāshǒu', e: 'Entrometerse' },
                { z: '抽查', t: '抽查', p: 'chōuchá', e: 'Inspeccionar por muestreo' } ] },
            { zh: '条件很优厚，却也很___：配方要交出来。', zhT: '條件很優厚，卻也很___：配方要交出來。', es: 'La oferta era jugosa pero también dura.',
              opts: [
                { z: '苛刻', t: '苛刻', p: 'kēkè', e: 'Duro, exigente' },
                { z: '优厚', t: '優厚', p: 'yōuhòu', e: 'Jugoso, generoso' },
                { z: '大方', t: '大方', p: 'dàfang', e: 'Generoso' } ] },
            { zh: '谈判最终___，集团悻悻而去。', zhT: '談判最終___，集團悻悻而去。', es: 'La negociación se quebró y el grupo se retiró.',
              opts: [
                { z: '破裂', t: '破裂', p: 'pòliè', e: 'Quebrarse, frustrarse' },
                { z: '达成', t: '達成', p: 'dáchéng', e: 'Concretar, acordar' },
                { z: '延续', t: '延續', p: 'yánxù', e: 'Prolongar' } ] }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // HSK 6 · B — 辩论赛 · 缜密/反驳/剖析/惰性 · registro académico, idiomarios
    // ─────────────────────────────────────────────────────────────
    {
        id: 'h6-bianlun',
        hsk: 6,
        emoji: '🎓',
        titleZh: '辩论赛决赛',
        titleZhT: '辯論賽決賽',
        titleEs: 'La gran final de debate',
        blurb: 'La final universitaria: ¿puede la inteligencia artificial reemplazar la creatividad humana? Duelo de oradores.',
        lines: [
            { zh: '大学中文系的辩论赛进入了决赛。', zhT: '大學中文系的辯論賽進入了決賽。', es: 'El torneo de debate de la facultad de chino llegó a la final.' },
            { zh: '辩题是「人工智能能否取代人类的创造力」。', zhT: '辯題是「人工智能能否取代人類的創造力」。', es: 'El tema: «¿Puede la inteligencia artificial sustituir la creatividad humana?»' },
            { zh: '正方立论缜密，引经据典。', zhT: '正方立論縝密，引經據典。', es: 'El lado afirmativo armó una tesis minuciosa, citando a los clásicos.' },
            { zh: '反方也不示弱，一开场就针锋相对。', zhT: '反方也不示弱，一開場就針鋒相對。', es: 'La oposición no se quedó atrás: salió al choque frontal desde el inicio.' },
            { zh: '二辩的发言言简意赅，赢得阵阵掌声。', zhT: '二辯的發言言簡意賅，贏得陣陣掌聲。', es: 'El segundo orador fue breve y sustancioso, y arrancó oleadas de aplausos.' },
            { zh: '对方随即反驳：「数据固然精确，却难以衡量灵感的温度。」', zhT: '對方隨即反駁：「數據固然精確，卻難以衡量靈感的溫度。」', es: 'El rival replicó enseguida: «Los datos son exactos, claro, pero no miden la temperatura de la inspiración.»' },
            { zh: '自由辩论环节，双方唇枪舌剑。', zhT: '自由辯論環節，雙方唇槍舌劍。', es: 'En el turno de debate libre, los dos bandos se trenzaron en un duelo de lenguas afiladas.' },
            { zh: '观众时而屏息，时而哄笑。', zhT: '觀眾時而屏息，時而哄笑。', es: 'El público contenía el aliento a ratos y a ratos estallaba en risas.' },
            { zh: '评委的提问颇为苛刻。', zhT: '評委的提問頗為苛刻。', es: 'Las preguntas del jurado fueron bastante exigentes.' },
            { zh: '他们要求辩手剖析概念的内涵，而不是玩弄辞藻。', zhT: '他們要求辯手剖析概念的內涵，而不是玩弄辭藻。', es: 'Pedían diseccionar el fondo de los conceptos, no lucirse con palabras vacías.' },
            { zh: '四辩总结陈词，条分缕析。', zhT: '四辯總結陳詞，條分縷析。', es: 'El cuarto orador cerró con una exposición desglosada al milímetro.' },
            { zh: '他说：「工具再精巧，也只是延伸；唯有人的困惑与好奇，才是创造的源泉。」', zhT: '他說：「工具再精巧，也只是延伸；唯有人的困惑與好奇，才是創造的源泉。」', es: 'Dijo: «Por refinada que sea la herramienta, es solo una prolongación; solo la perplejidad y la curiosidad humanas son el manantial de la creación.»' },
            { zh: '评委们低声商议了片刻。', zhT: '評委們低聲商議了片刻。', es: 'El jurado deliberó en voz baja un instante.' },
            { zh: '主席宣布：「最佳辩手——反方四辩！」', zhT: '主席宣佈：「最佳辯手——反方四辯！」', es: 'El moderador anunció: «¡Mejor orador: el cuarto de la oposición!»' },
            { zh: '有人替正方惋惜，觉得裁判的标准过于晦涩。', zhT: '有人替正方惋惜，覺得裁判的標準過於晦澀。', es: 'Algunos lamentaron por el equipo afirmativo: les parecieron demasiado herméticos los criterios del jurado.' },
            { zh: '而更多学生记住的是那句结语：真正的对手从来不是彼此，而是思维的惰性。', zhT: '而更多學生記住的是那句結語：真正的對手從來不是彼此，而是思維的惰性。', es: 'Pero la mayoría se llevó la frase de cierre: el verdadero rival nunca es el de enfrente, sino la pereza del pensamiento.' }
        ],
        quiz: [
            { zh: '大学中文系的辩论赛进入了___。', zhT: '大學中文系的辯論賽進入了___。', es: 'El torneo de debate llegó a la final.',
              opts: [
                { z: '决赛', t: '決賽', p: 'juésài', e: 'Final (de torneo)' },
                { z: '初赛', t: '初賽', p: 'chūsài', e: 'Eliminatoria inicial' },
                { z: '复赛', t: '復賽', p: 'fùsài', e: 'Semifinal, repesca' } ] },
            { zh: '正方___缜密，引经据典。', zhT: '正方___縝密，引經據典。', es: 'El lado afirmativo armó una tesis minuciosa.',
              opts: [
                { z: '立论', t: '立論', p: 'lìlùn', e: 'Plantear la tesis' },
                { z: '推翻', t: '推翻', p: 'tuīfān', e: 'Derribar' },
                { z: '搁置', t: '擱置', p: 'gēzhì', e: 'Aparcar, postergar' } ] },
            { zh: '二辩的发言___，赢得阵阵掌声。', zhT: '二辯的發言___，贏得陣陣掌聲。', es: 'El segundo orador fue breve y sustancioso.',
              opts: [
                { z: '言简意赅', t: '言簡意賅', p: 'yán jiǎn yì gāi', e: 'Breve y sustancioso' },
                { z: '拖泥带水', t: '拖泥帶水', p: 'tuō ní dài shuǐ', e: 'Arrastrado, farragoso' },
                { z: '夸夸其谈', t: '誇誇其談', p: 'kuā kuā qí tán', e: 'Parloteo pomposo' } ] },
            { zh: '对方随即___：「数据固然精确……」', zhT: '對方隨即___：「數據固然精確……」', es: 'El rival replicó enseguida.',
              opts: [
                { z: '反驳', t: '反駁', p: 'fǎnbó', e: 'Refutar' },
                { z: '赞叹', t: '讚嘆', p: 'zàntàn', e: 'Admirar' },
                { z: '附和', t: '附和', p: 'fùhè', e: 'Hacerse eco' } ] },
            { zh: '数据固然精确，却难以___灵感的温度。', zhT: '數據固然精確，卻難以___靈感的溫度。', es: 'Los datos son exactos, pero no miden la temperatura de la inspiración.',
              opts: [
                { z: '衡量', t: '衡量', p: 'héngliáng', e: 'Medir, sopesar' },
                { z: '淡忘', t: '淡忘', p: 'dànwàng', e: 'Olvidar poco a poco' },
                { z: '涉及', t: '涉及', p: 'shèjí', e: 'Abarcar, involucrar' } ] },
            { zh: '自由辩论___，双方唇枪舌剑。', zhT: '自由辯論___，雙方唇槍舌劍。', es: 'En el turno de debate libre se trenzaron en duelo.',
              opts: [
                { z: '环节', t: '環節', p: 'huánjié', e: 'Ronda, segmento' },
                { z: '局面', t: '局面', p: 'júmiàn', e: 'Situación, panorama' },
                { z: '场面', t: '場面', p: 'chǎngmiàn', e: 'Escena' } ] },
            { zh: '观众时而___，时而哄笑。', zhT: '觀眾時而___，時而哄笑。', es: 'El público contenía el aliento a ratos.',
              opts: [
                { z: '屏息', t: '屏息', p: 'bǐngxī', e: 'Contener el aliento' },
                { z: '鼓掌', t: '鼓掌', p: 'gǔzhǎng', e: 'Aplaudir' },
                { z: '叹气', t: '嘆氣', p: 'tànqì', e: 'Suspirar' } ] },
            { zh: '评委的提问颇为___。', zhT: '評委的提問頗為___。', es: 'Las preguntas del jurado fueron bastante exigentes.',
              opts: [
                { z: '苛刻', t: '苛刻', p: 'kēkè', e: 'Exigente, duro' },
                { z: '宽松', t: '寬鬆', p: 'kuānsōng', e: 'Flexibles, holgadas' },
                { z: '模糊', t: '模糊', p: 'móhú', e: 'Vagas, imprecisas' } ] },
            { zh: '他们要求辩手___概念的内涵。', zhT: '他們要求辯手___概念的內涵。', es: 'Pedían diseccionar el fondo de los conceptos.',
              opts: [
                { z: '剖析', t: '剖析', p: 'pōuxī', e: 'Diseccionar, analizar' },
                { z: '敷衍', t: '敷衍', p: 'fūyǎn', e: 'Salir del paso' },
                { z: '摹仿', t: '摹仿', p: 'mófǎng', e: 'Imitar' } ] },
            { zh: '真正的对手从来不是彼此，而是思维的___。', zhT: '真正的對手從來不是彼此，而是思維的___。', es: 'El verdadero rival nunca es el de enfrente, sino la pereza del pensamiento.',
              opts: [
                { z: '惰性', t: '惰性', p: 'duòxìng', e: 'Inercia, pereza' },
                { z: '潜力', t: '潛力', p: 'qiánlì', e: 'Potencial' },
                { z: '惯例', t: '慣例', p: 'guànlì', e: 'Convención, usanza' } ] }
        ]
    }

    ];

    // Añade las lecciones HSK extra a las existentes (lessons.js y
    // lessons-tocfl.js se cargan antes; app.js captura al inicializar)
    window.GRADED_LESSONS = (window.GRADED_LESSONS || []).concat(HSK_EXTRA);
})();
