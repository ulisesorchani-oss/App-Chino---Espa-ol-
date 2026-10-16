// ============================================================
// exam-items.js — Banco de ítems escritos de la práctica tipo examen
// ============================================================
// Archivo ADITIVO de datos (patrón lessons-tocfl.js): lo lee exam-practice.js.
// Por nivel (TOCFL-Prep, TOCFL-A1, HSK1):
//   · dialogues (6): { id, lines: [{ who: 'a'|'b', zh, zhT, es }], q: { es, opts } }
//       4 a 6 líneas de dos voces + una pregunta en español con 3 opciones.
//   · readings (6):  { id, zh, zhT, es, q: { es, opts } }
//       texto corto + pregunta en español con 3 opciones.
//   · orders (9 a 12 por nivel): { id, zh, zhT, es, w, wT, alt?, altT?, st }
//       oración de UNA sola cláusula (sin puntuación). w / wT = las FICHAS escritas a mano
//       (simplificado / tradicional; de 3 a 9) y su concatenación es la oración. El orden correcto
//       es el original MÁS los de alt / altT (otro orden de las MISMAS fichas, revisado una por una).
//       st: 'ok' = revisada y activa · 'pend' = espera la confirmación del revisor: NO sale en las
//       tandas. Las tandas sacan 3 por nivel con una baraja guardada ('ac_order_deck_v1').
//       No se toman oraciones de las lecciones.
// q.opts[0] es la correcta; el orden visible se baraja en cada sesión.
// zh = simplificado, zhT = tradicional (se muestra el de la escritura de la
// familia: TOCFL tradicional, HSK simplificado, salvo elección explícita 简/繁).
// Traducciones al español rioplatense (voseo).
// Control de nivel: cada ítem se escribió con el vocabulario del nivel (A1 usa
// Prep + A1) y se verificó que TODOS sus caracteres estén en ese vocabulario
// (cobertura 100 %). Al sumar ítems, repetir esa verificación.
// ============================================================
window.EXAM_ITEMS = {
 "TOCFL-Prep": {
  "dialogues": [
   {
    "id": "prep-d1",
    "lines": [
     {
      "who": "a",
      "zh": "请问，这个多少钱？",
      "zhT": "請問，這個多少錢？",
      "es": "Disculpe, ¿cuánto cuesta esto?"
     },
     {
      "who": "b",
      "zh": "一个十五块。",
      "zhT": "一個十五塊。",
      "es": "Quince yuanes cada uno."
     },
     {
      "who": "a",
      "zh": "太贵了。有没有便宜的？",
      "zhT": "太貴了。有沒有便宜的？",
      "es": "Es muy caro. ¿Tiene alguno más barato?"
     },
     {
      "who": "b",
      "zh": "这个八块。",
      "zhT": "這個八塊。",
      "es": "Este cuesta ocho."
     },
     {
      "who": "a",
      "zh": "好，我买两个。",
      "zhT": "好，我買兩個。",
      "es": "Bien, llevo dos."
     }
    ],
    "q": {
     "es": "¿Cuánto cuesta cada uno de los que compra?",
     "opts": [
      "Ocho yuanes",
      "Quince yuanes",
      "Dos yuanes"
     ]
    }
   },
   {
    "id": "prep-d2",
    "lines": [
     {
      "who": "a",
      "zh": "你叫什么名字？",
      "zhT": "你叫什麼名字？",
      "es": "¿Cómo te llamás?"
     },
     {
      "who": "b",
      "zh": "我叫大明。你呢？",
      "zhT": "我叫大明。你呢？",
      "es": "Me llamo Daming. ¿Y vos?"
     },
     {
      "who": "a",
      "zh": "我姓高。你今年几岁？",
      "zhT": "我姓高。你今年幾歲？",
      "es": "Mi apellido es Gao. ¿Cuántos años tenés?"
     },
     {
      "who": "b",
      "zh": "我今年十岁。你呢？",
      "zhT": "我今年十歲。你呢？",
      "es": "Tengo diez años. ¿Y vos?"
     },
     {
      "who": "a",
      "zh": "我也十岁。我们都是学生。",
      "zhT": "我也十歲。我們都是學生。",
      "es": "Yo también tengo diez. Los dos somos estudiantes."
     }
    ],
    "q": {
     "es": "¿Cuántos años tienen?",
     "opts": [
      "Diez los dos",
      "Diez y once",
      "Once los dos"
     ]
    }
   },
   {
    "id": "prep-d3",
    "lines": [
     {
      "who": "a",
      "zh": "你想吃什么？",
      "zhT": "你想吃什麼？",
      "es": "¿Qué querés comer?"
     },
     {
      "who": "b",
      "zh": "我想吃面。你呢？",
      "zhT": "我想吃麵。你呢？",
      "es": "Quiero fideos. ¿Y vos?"
     },
     {
      "who": "a",
      "zh": "我要一碗汤和一个蛋。",
      "zhT": "我要一碗湯和一個蛋。",
      "es": "Quiero un cuenco de sopa y un huevo."
     },
     {
      "who": "b",
      "zh": "你喝水还是茶？",
      "zhT": "你喝水還是茶？",
      "es": "¿Tomás agua o té?"
     },
     {
      "who": "a",
      "zh": "我喝茶。",
      "zhT": "我喝茶。",
      "es": "Tomo té."
     }
    ],
    "q": {
     "es": "¿Qué toma la persona A?",
     "opts": [
      "Té",
      "Agua",
      "Café"
     ]
    }
   },
   {
    "id": "prep-d4",
    "lines": [
     {
      "who": "a",
      "zh": "现在几点？",
      "zhT": "現在幾點？",
      "es": "¿Qué hora es?"
     },
     {
      "who": "b",
      "zh": "现在两点半。",
      "zhT": "現在兩點半。",
      "es": "Son las dos y media."
     },
     {
      "who": "a",
      "zh": "你下午有课吗？",
      "zhT": "你下午有課嗎？",
      "es": "¿Tenés clase por la tarde?"
     },
     {
      "who": "b",
      "zh": "有，三点上课。你呢？",
      "zhT": "有，三點上課。你呢？",
      "es": "Sí, tengo clase a las tres. ¿Y vos?"
     },
     {
      "who": "a",
      "zh": "我没有课。我想去公园玩。",
      "zhT": "我沒有課。我想去公園玩。",
      "es": "Yo no tengo. Quiero ir a jugar al parque."
     }
    ],
    "q": {
     "es": "¿A qué hora tiene clase la persona B?",
     "opts": [
      "A las tres",
      "A las dos y media",
      "A las cinco"
     ]
    }
   },
   {
    "id": "prep-d5",
    "lines": [
     {
      "who": "a",
      "zh": "今天天气怎么样？",
      "zhT": "今天天氣怎麼樣？",
      "es": "¿Cómo está el tiempo hoy?"
     },
     {
      "who": "b",
      "zh": "很冷，还下雨。",
      "zhT": "很冷，還下雨。",
      "es": "Hace mucho frío y además llueve."
     },
     {
      "who": "a",
      "zh": "那我们不去公园了。",
      "zhT": "那我們不去公園了。",
      "es": "Entonces no vamos al parque."
     },
     {
      "who": "b",
      "zh": "好，我们在家看电影吧。",
      "zhT": "好，我們在家看電影吧。",
      "es": "Bueno, miremos una película en casa."
     }
    ],
    "q": {
     "es": "¿Qué deciden hacer?",
     "opts": [
      "Ver una película en casa",
      "Ir al parque",
      "Salir a comer"
     ]
    }
   },
   {
    "id": "prep-d6",
    "lines": [
     {
      "who": "a",
      "zh": "请问，公园在哪里？",
      "zhT": "請問，公園在哪裡？",
      "es": "Disculpe, ¿dónde queda el parque?"
     },
     {
      "who": "b",
      "zh": "在学校的旁边。",
      "zhT": "在學校的旁邊。",
      "es": "Al lado de la escuela."
     },
     {
      "who": "a",
      "zh": "我怎么走？",
      "zhT": "我怎麼走？",
      "es": "¿Cómo llego?"
     },
     {
      "who": "b",
      "zh": "你坐公共汽车，十分钟就到。",
      "zhT": "你坐公共汽車，十分鐘就到。",
      "es": "Tomá el colectivo: en diez minutos llegás."
     },
     {
      "who": "a",
      "zh": "谢谢！",
      "zhT": "謝謝！",
      "es": "¡Gracias!"
     }
    ],
    "q": {
     "es": "¿Cómo se llega al parque?",
     "opts": [
      "En colectivo, diez minutos",
      "A pie, cinco minutos",
      "En taxi, veinte minutos"
     ]
    }
   }
  ],
  "readings": [
   {
    "id": "prep-r1",
    "zh": "我家有五个人：爸爸、妈妈、哥哥、妹妹和我。我爸爸是医生，我妈妈是老师。我哥哥是大学生。",
    "zhT": "我家有五個人：爸爸、媽媽、哥哥、妹妹和我。我爸爸是醫生，我媽媽是老師。我哥哥是大學生。",
    "es": "En mi casa somos cinco: papá, mamá, mi hermano mayor, mi hermana menor y yo. Mi papá es médico y mi mamá es maestra. Mi hermano mayor es universitario.",
    "q": {
     "es": "¿Quién es médico?",
     "opts": [
      "El papá",
      "La mamá",
      "El hermano mayor"
     ]
    }
   },
   {
    "id": "prep-r2",
    "zh": "我每天早上七点起床，七点半吃早饭。然后我去学校上课。下午四点我回家。",
    "zhT": "我每天早上七點起床，七點半吃早飯。然後我去學校上課。下午四點我回家。",
    "es": "Todos los días me levanto a las siete de la mañana y desayuno a las siete y media. Después voy a la escuela a tomar clase. A las cuatro de la tarde vuelvo a casa.",
    "q": {
     "es": "¿A qué hora se levanta?",
     "opts": [
      "A las siete",
      "A las siete y media",
      "A las cuatro"
     ]
    }
   },
   {
    "id": "prep-r3",
    "zh": "我喜欢吃水果。我最喜欢香蕉。我不喜欢吃肉，也不喝牛奶。",
    "zhT": "我喜歡吃水果。我最喜歡香蕉。我不喜歡吃肉，也不喝牛奶。",
    "es": "Me gusta comer fruta. Mi favorita es la banana. No me gusta la carne y tampoco tomo leche.",
    "q": {
     "es": "¿Qué fruta le gusta más?",
     "opts": [
      "La banana",
      "La manzana",
      "La naranja"
     ]
    }
   },
   {
    "id": "prep-r4",
    "zh": "我是学生。我的学校很大，学校旁边有一个公园。下课以后，我们常常在公园玩。",
    "zhT": "我是學生。我的學校很大，學校旁邊有一個公園。下課以後，我們常常在公園玩。",
    "es": "Soy estudiante. Mi escuela es muy grande y al lado hay un parque. Después de clase, jugamos seguido en el parque.",
    "q": {
     "es": "¿Dónde juegan después de clase?",
     "opts": [
      "En el parque",
      "En el aula",
      "En su casa"
     ]
    }
   },
   {
    "id": "prep-r5",
    "zh": "这个星期天我不上课。我想和朋友去看电影，然后一起吃饭。晚上我回家。",
    "zhT": "這個星期天我不上課。我想和朋友去看電影，然後一起吃飯。晚上我回家。",
    "es": "Este domingo no tengo clase. Quiero ir al cine con mis amigos y después comer juntos. A la noche vuelvo a casa.",
    "q": {
     "es": "¿Qué hace después del cine?",
     "opts": [
      "Come con sus amigos",
      "Vuelve a casa",
      "Va al parque"
     ]
    }
   },
   {
    "id": "prep-r6",
    "zh": "这件衣服很新，也很漂亮，可是太贵了。那件旧的很便宜，只要五十块。我买那件。",
    "zhT": "這件衣服很新，也很漂亮，可是太貴了。那件舊的很便宜，只要五十塊。我買那件。",
    "es": "Esta prenda es nueva y muy linda, pero es demasiado cara. Aquella usada es barata: cuesta solo cincuenta yuanes. Compro aquella.",
    "q": {
     "es": "¿Qué prenda compra?",
     "opts": [
      "La vieja y barata",
      "La nueva y cara",
      "Las dos"
     ]
    }
   }
  ],
  "orders": [
   {
    "id": "prep-o2",
    "zh": "他有两个孩子",
    "zhT": "他有兩個孩子",
    "es": "Tiene dos hijos.",
    "w": [
     "他有",
     "两个",
     "孩子"
    ],
    "wT": [
     "他有",
     "兩個",
     "孩子"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o3",
    "zh": "这本书很便宜",
    "zhT": "這本書很便宜",
    "es": "Este libro es muy barato.",
    "w": [
     "这本书",
     "很",
     "便宜"
    ],
    "wT": [
     "這本書",
     "很",
     "便宜"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o7",
    "zh": "那个学生很高",
    "zhT": "那個學生很高",
    "es": "Ese estudiante es muy alto.",
    "w": [
     "那个",
     "学生",
     "很高"
    ],
    "wT": [
     "那個",
     "學生",
     "很高"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o4",
    "zh": "我喜欢吃水果",
    "zhT": "我喜歡吃水果",
    "es": "Me gusta comer fruta.",
    "w": [
     "我",
     "喜欢",
     "吃",
     "水果"
    ],
    "wT": [
     "我",
     "喜歡",
     "吃",
     "水果"
    ],
    "alt": [
     "水果我喜欢吃"
    ],
    "altT": [
     "水果我喜歡吃"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o5",
    "zh": "弟弟想喝牛奶",
    "zhT": "弟弟想喝牛奶",
    "es": "Mi hermano menor quiere tomar leche.",
    "w": [
     "弟弟",
     "想喝",
     "牛奶"
    ],
    "wT": [
     "弟弟",
     "想喝",
     "牛奶"
    ],
    "alt": [
     "牛奶弟弟想喝"
    ],
    "altT": [
     "牛奶弟弟想喝"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o8",
    "zh": "我可以坐这里吗",
    "zhT": "我可以坐這裡嗎",
    "es": "¿Puedo sentarme aquí?",
    "w": [
     "我",
     "可以",
     "坐",
     "这里",
     "吗"
    ],
    "wT": [
     "我",
     "可以",
     "坐",
     "這裡",
     "嗎"
    ],
    "alt": [
     "这里我可以坐吗"
    ],
    "altT": [
     "這裡我可以坐嗎"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o9",
    "zh": "这碗面很好吃",
    "zhT": "這碗麵很好吃",
    "es": "Estos fideos están muy ricos.",
    "w": [
     "这碗",
     "面",
     "很",
     "好吃"
    ],
    "wT": [
     "這碗",
     "麵",
     "很",
     "好吃"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o10",
    "zh": "教室里有很多学生",
    "zhT": "教室裡有很多學生",
    "es": "En el aula hay muchos estudiantes.",
    "w": [
     "教室",
     "里",
     "有",
     "很多学生"
    ],
    "wT": [
     "教室",
     "裡",
     "有",
     "很多學生"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o11",
    "zh": "你家有几个房间",
    "zhT": "你家有幾個房間",
    "es": "¿Cuántas habitaciones tiene tu casa?",
    "w": [
     "你家",
     "有",
     "几个房间"
    ],
    "wT": [
     "你家",
     "有",
     "幾個房間"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o12",
    "zh": "我的电脑很新",
    "zhT": "我的電腦很新",
    "es": "Mi computadora es muy nueva.",
    "w": [
     "我的",
     "电脑",
     "很",
     "新"
    ],
    "wT": [
     "我的",
     "電腦",
     "很",
     "新"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o13",
    "zh": "他的手机很旧",
    "zhT": "他的手機很舊",
    "es": "Su celular es muy viejo.",
    "w": [
     "他的",
     "手机",
     "很",
     "旧"
    ],
    "wT": [
     "他的",
     "手機",
     "很",
     "舊"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o14",
    "zh": "这个蛋糕很甜",
    "zhT": "這個蛋糕很甜",
    "es": "Esta torta es muy dulce.",
    "w": [
     "这个",
     "蛋糕",
     "很",
     "甜"
    ],
    "wT": [
     "這個",
     "蛋糕",
     "很",
     "甜"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o15",
    "zh": "桌子上有一本书",
    "zhT": "桌子上有一本書",
    "es": "Hay un libro sobre la mesa.",
    "w": [
     "桌子",
     "上",
     "有",
     "一本书"
    ],
    "wT": [
     "桌子",
     "上",
     "有",
     "一本書"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o16",
    "zh": "我有两个弟弟",
    "zhT": "我有兩個弟弟",
    "es": "Tengo dos hermanos menores.",
    "w": [
     "我",
     "有",
     "两个弟弟"
    ],
    "wT": [
     "我",
     "有",
     "兩個弟弟"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o17",
    "zh": "桌子上有三杯咖啡",
    "zhT": "桌子上有三杯咖啡",
    "es": "Sobre la mesa hay tres cafés.",
    "w": [
     "桌子",
     "上",
     "有",
     "三杯咖啡"
    ],
    "wT": [
     "桌子",
     "上",
     "有",
     "三杯咖啡"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o18",
    "zh": "请你坐在这里",
    "zhT": "請你坐在這裡",
    "es": "Por favor, sentate aquí.",
    "w": [
     "请",
     "你",
     "坐在",
     "这里"
    ],
    "wT": [
     "請",
     "你",
     "坐在",
     "這裡"
    ],
    "st": "ok"
   },
   {
    "id": "prep-o19",
    "zh": "我是昨天来的",
    "zhT": "我是昨天來的",
    "es": "Vine ayer.",
    "w": [
     "我是",
     "昨天",
     "来",
     "的"
    ],
    "wT": [
     "我是",
     "昨天",
     "來",
     "的"
    ],
    "st": "ok"
   }
  ]
 },
 "TOCFL-A1": {
  "dialogues": [
   {
    "id": "a1-d1",
    "lines": [
     {
      "who": "a",
      "zh": "喂，你这个周末有空吗？",
      "zhT": "喂，你這個週末有空嗎？",
      "es": "¿Hola? ¿Tenés tiempo este fin de semana?"
     },
     {
      "who": "b",
      "zh": "有，你想做什么？",
      "zhT": "有，你想做什麼？",
      "es": "Sí, ¿qué querés hacer?"
     },
     {
      "who": "a",
      "zh": "我们去看电影，好不好？",
      "zhT": "我們去看電影，好不好？",
      "es": "Vamos a ver una película, ¿te parece?"
     },
     {
      "who": "b",
      "zh": "好啊。几点？",
      "zhT": "好啊。幾點？",
      "es": "Dale. ¿A qué hora?"
     },
     {
      "who": "a",
      "zh": "下午两点，在电影院见面。",
      "zhT": "下午兩點，在電影院見面。",
      "es": "A las dos de la tarde, nos encontramos en el cine."
     }
    ],
    "q": {
     "es": "¿Dónde se van a encontrar?",
     "opts": [
      "En el cine",
      "En la biblioteca",
      "En la casa de B"
     ]
    }
   },
   {
    "id": "a1-d2",
    "lines": [
     {
      "who": "a",
      "zh": "请问，图书馆在哪里？",
      "zhT": "請問，圖書館在哪裡？",
      "es": "Disculpe, ¿dónde queda la biblioteca?"
     },
     {
      "who": "b",
      "zh": "你往前走，到十字路口左转。",
      "zhT": "你往前走，到十字路口左轉。",
      "es": "Andá derecho y en el cruce doblá a la izquierda."
     },
     {
      "who": "a",
      "zh": "远不远？",
      "zhT": "遠不遠？",
      "es": "¿Queda lejos?"
     },
     {
      "who": "b",
      "zh": "不远，走五分钟就到。",
      "zhT": "不遠，走五分鐘就到。",
      "es": "No, caminando llegás en cinco minutos."
     },
     {
      "who": "a",
      "zh": "谢谢你！",
      "zhT": "謝謝你！",
      "es": "¡Gracias!"
     },
     {
      "who": "b",
      "zh": "不客气。",
      "zhT": "不客氣。",
      "es": "De nada."
     }
    ],
    "q": {
     "es": "¿Qué tiene que hacer en el cruce?",
     "opts": [
      "Doblar a la izquierda",
      "Doblar a la derecha",
      "Seguir derecho"
     ]
    }
   },
   {
    "id": "a1-d3",
    "lines": [
     {
      "who": "a",
      "zh": "下星期是我朋友的生日。",
      "zhT": "下星期是我朋友的生日。",
      "es": "La semana que viene es el cumpleaños de mi amigo."
     },
     {
      "who": "b",
      "zh": "你想送他什么礼物？",
      "zhT": "你想送他什麼禮物？",
      "es": "¿Qué regalo pensás darle?"
     },
     {
      "who": "a",
      "zh": "我想买一本书。",
      "zhT": "我想買一本書。",
      "es": "Quiero comprarle un libro."
     },
     {
      "who": "b",
      "zh": "这家书店的书很多，也不贵。",
      "zhT": "這家書店的書很多，也不貴。",
      "es": "Esa librería tiene muchos libros y no son caros."
     },
     {
      "who": "a",
      "zh": "好，我们现在去吧。",
      "zhT": "好，我們現在去吧。",
      "es": "Bien, vayamos ahora."
     }
    ],
    "q": {
     "es": "¿Qué piensa regalar?",
     "opts": [
      "Un libro",
      "Una camisa",
      "Una torta"
     ]
    }
   },
   {
    "id": "a1-d4",
    "lines": [
     {
      "who": "a",
      "zh": "喂，我想看病。",
      "zhT": "喂，我想看病。",
      "es": "¿Hola? Quiero ir al médico."
     },
     {
      "who": "b",
      "zh": "你哪里不舒服？",
      "zhT": "你哪裡不舒服？",
      "es": "¿Qué te pasa?"
     },
     {
      "who": "a",
      "zh": "我头痛，也很累。",
      "zhT": "我頭痛，也很累。",
      "es": "Me duele la cabeza y estoy muy cansado."
     },
     {
      "who": "b",
      "zh": "请你明天上午来医院。",
      "zhT": "請你明天上午來醫院。",
      "es": "Vení mañana por la mañana al hospital."
     },
     {
      "who": "a",
      "zh": "好，谢谢。",
      "zhT": "好，謝謝。",
      "es": "Bien, gracias."
     }
    ],
    "q": {
     "es": "¿Cuándo tiene que ir al hospital?",
     "opts": [
      "Mañana por la mañana",
      "Hoy por la tarde",
      "El domingo"
     ]
    }
   },
   {
    "id": "a1-d5",
    "lines": [
     {
      "who": "a",
      "zh": "你想喝什么？",
      "zhT": "你想喝什麼？",
      "es": "¿Qué querés tomar?"
     },
     {
      "who": "b",
      "zh": "我要一杯红茶。",
      "zhT": "我要一杯紅茶。",
      "es": "Quiero un té negro."
     },
     {
      "who": "a",
      "zh": "你要不要吃点心？",
      "zhT": "你要不要吃點心？",
      "es": "¿Querés algo para picar?"
     },
     {
      "who": "b",
      "zh": "好，我想吃冰淇淋。",
      "zhT": "好，我想吃冰淇淋。",
      "es": "Bueno, quiero un helado."
     },
     {
      "who": "a",
      "zh": "一共一百二十块。",
      "zhT": "一共一百二十塊。",
      "es": "En total son ciento veinte yuanes."
     }
    ],
    "q": {
     "es": "¿Qué quiere comer?",
     "opts": [
      "Un helado",
      "Una torta",
      "Un sándwich"
     ]
    }
   },
   {
    "id": "a1-d6",
    "lines": [
     {
      "who": "a",
      "zh": "你平常做什么运动？",
      "zhT": "你平常做什麼運動？",
      "es": "¿Qué deporte hacés normalmente?"
     },
     {
      "who": "b",
      "zh": "我喜欢游泳，也常常踢足球。",
      "zhT": "我喜歡游泳，也常常踢足球。",
      "es": "Me gusta nadar y también juego seguido al fútbol."
     },
     {
      "who": "a",
      "zh": "你周末有比赛吗？",
      "zhT": "你週末有比賽嗎？",
      "es": "¿Tenés partido este fin de semana?"
     },
     {
      "who": "b",
      "zh": "有，星期六下午。",
      "zhT": "有，星期六下午。",
      "es": "Sí, el sábado por la tarde."
     }
    ],
    "q": {
     "es": "¿Cuándo es el partido?",
     "opts": [
      "El sábado por la tarde",
      "El domingo por la mañana",
      "El viernes por la noche"
     ]
    }
   }
  ],
  "readings": [
   {
    "id": "a1-r1",
    "zh": "我的房间不大，但是很干净。里面有一张床、一张桌子和一把椅子。窗外有树，我很喜欢。",
    "zhT": "我的房間不大，但是很乾淨。裡面有一張床、一張桌子和一把椅子。窗外有樹，我很喜歡。",
    "es": "Mi habitación no es grande, pero está muy limpia. Adentro hay una cama, una mesa y una silla. Afuera de la ventana hay un árbol y me gusta mucho.",
    "q": {
     "es": "¿Qué hay afuera de la ventana?",
     "opts": [
      "Un árbol",
      "Un parque",
      "Una bicicleta"
     ]
    }
   },
   {
    "id": "a1-r2",
    "zh": "春天来了，天气不冷也不热。我喜欢和朋友去河边走路。河边有很多花和树。",
    "zhT": "春天來了，天氣不冷也不熱。我喜歡和朋友去河邊走路。河邊有很多花和樹。",
    "es": "Llegó la primavera y el clima no es ni frío ni caliente. Me gusta ir a caminar con mis amigos junto al río. Junto al río hay muchas flores y árboles.",
    "q": {
     "es": "¿Qué hay junto al río?",
     "opts": [
      "Muchas flores y árboles",
      "Muchas tiendas",
      "Un parque grande"
     ]
    }
   },
   {
    "id": "a1-r3",
    "zh": "今天我写信给朋友。我明天去邮局寄信，然后去银行。",
    "zhT": "今天我寫信給朋友。我明天去郵局寄信，然後去銀行。",
    "es": "Hoy le escribo una carta a mi amigo. Mañana voy al correo a enviarla y después al banco.",
    "q": {
     "es": "¿A dónde va primero mañana?",
     "opts": [
      "Al correo",
      "Al banco",
      "A la casa de su amigo"
     ]
    }
   },
   {
    "id": "a1-r4",
    "zh": "我的爸爸是司机，他每天早上六点上班。我的妈妈是护士，在医院工作。妈妈下班以后很累。",
    "zhT": "我的爸爸是司機，他每天早上六點上班。我的媽媽是護士，在醫院工作。媽媽下班以後很累。",
    "es": "Mi papá es conductor y empieza a trabajar todos los días a las seis de la mañana. Mi mamá es enfermera y trabaja en un hospital. Después del trabajo, mi mamá está muy cansada.",
    "q": {
     "es": "¿Dónde trabaja la mamá?",
     "opts": [
      "En un hospital",
      "En una oficina",
      "En un banco"
     ]
    }
   },
   {
    "id": "a1-r5",
    "zh": "我想买一件新外套。这件外套很轻，也很漂亮，可是有点贵。我想一想，然后再决定。",
    "zhT": "我想買一件新外套。這件外套很輕，也很漂亮，可是有點貴。我想一想，然後再決定。",
    "es": "Quiero comprar un abrigo nuevo. Este abrigo es liviano y muy lindo, pero un poco caro. Lo voy a pensar y después decido.",
    "q": {
     "es": "¿Qué hace al final?",
     "opts": [
      "Lo piensa y decide después",
      "Lo compra enseguida",
      "Ya no lo quiere"
     ]
    }
   },
   {
    "id": "a1-r6",
    "zh": "我们去台北旅行。我们坐火车，两个小时就到。我们在旅馆住两天，也参观了很多地方。",
    "zhT": "我們去台北旅行。我們坐火車，兩個小時就到。我們在旅館住兩天，也參觀了很多地方。",
    "es": "Viajamos a Taipéi. Vamos en tren y en dos horas llegamos. Nos quedamos dos días en un hotel y también visitamos muchos lugares.",
    "q": {
     "es": "¿Cómo viajan?",
     "opts": [
      "En tren",
      "En avión",
      "En colectivo"
     ]
    }
   }
  ],
  "orders": [
   {
    "id": "a1-o2",
    "zh": "他不想去上班",
    "zhT": "他不想去上班",
    "es": "No quiere ir a trabajar.",
    "w": [
     "他不",
     "想去",
     "上班"
    ],
    "wT": [
     "他不",
     "想去",
     "上班"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o3",
    "zh": "图书馆的书很多",
    "zhT": "圖書館的書很多",
    "es": "La biblioteca tiene muchos libros.",
    "w": [
     "图书馆",
     "的",
     "书",
     "很多"
    ],
    "wT": [
     "圖書館",
     "的",
     "書",
     "很多"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o5",
    "zh": "这家商店的衣服很便宜",
    "zhT": "這家商店的衣服很便宜",
    "es": "La ropa de esta tienda es muy barata.",
    "w": [
     "这家",
     "商店",
     "的",
     "衣服",
     "很",
     "便宜"
    ],
    "wT": [
     "這家",
     "商店",
     "的",
     "衣服",
     "很",
     "便宜"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o8",
    "zh": "请你把窗关上",
    "zhT": "請你把窗關上",
    "es": "Por favor, cerrá la ventana.",
    "w": [
     "请",
     "你",
     "把",
     "窗",
     "关上"
    ],
    "wT": [
     "請",
     "你",
     "把",
     "窗",
     "關上"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o4",
    "zh": "我想看那部电影",
    "zhT": "我想看那部電影",
    "es": "Quiero ver esa película.",
    "w": [
     "我想",
     "看",
     "那部",
     "电影"
    ],
    "wT": [
     "我想",
     "看",
     "那部",
     "電影"
    ],
    "alt": [
     "那部电影我想看"
    ],
    "altT": [
     "那部電影我想看"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o7",
    "zh": "我朋友喜欢吃辣的",
    "zhT": "我朋友喜歡吃辣的",
    "es": "A mi amigo le gusta comer picante.",
    "w": [
     "我",
     "朋友",
     "喜欢",
     "吃",
     "辣",
     "的"
    ],
    "wT": [
     "我",
     "朋友",
     "喜歡",
     "吃",
     "辣",
     "的"
    ],
    "alt": [
     "辣的我朋友喜欢吃"
    ],
    "altT": [
     "辣的我朋友喜歡吃"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o9",
    "zh": "这件外套很轻",
    "zhT": "這件外套很輕",
    "es": "Este abrigo es muy liviano.",
    "w": [
     "这件",
     "外套",
     "很",
     "轻"
    ],
    "wT": [
     "這件",
     "外套",
     "很",
     "輕"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o10",
    "zh": "老板的办公室很大",
    "zhT": "老闆的辦公室很大",
    "es": "La oficina del jefe es muy grande.",
    "w": [
     "老板的",
     "办公室",
     "很",
     "大"
    ],
    "wT": [
     "老闆的",
     "辦公室",
     "很",
     "大"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o11",
    "zh": "厨房里有很多东西",
    "zhT": "廚房裡有很多東西",
    "es": "En la cocina hay muchas cosas.",
    "w": [
     "厨房",
     "里",
     "有",
     "很多东西"
    ],
    "wT": [
     "廚房",
     "裡",
     "有",
     "很多東西"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o12",
    "zh": "这个城市很大",
    "zhT": "這個城市很大",
    "es": "Esta ciudad es muy grande.",
    "w": [
     "这个",
     "城市",
     "很",
     "大"
    ],
    "wT": [
     "這個",
     "城市",
     "很",
     "大"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o13",
    "zh": "他的头发很长",
    "zhT": "他的頭髮很長",
    "es": "Su pelo es muy largo.",
    "w": [
     "他的",
     "头发",
     "很",
     "长"
    ],
    "wT": [
     "他的",
     "頭髮",
     "很",
     "長"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o14",
    "zh": "我的房租很贵",
    "zhT": "我的房租很貴",
    "es": "Mi alquiler es muy caro.",
    "w": [
     "我的",
     "房租",
     "很",
     "贵"
    ],
    "wT": [
     "我的",
     "房租",
     "很",
     "貴"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o15",
    "zh": "冰箱里有很多水果",
    "zhT": "冰箱裡有很多水果",
    "es": "En la heladera hay mucha fruta.",
    "w": [
     "冰箱",
     "里",
     "有",
     "很多水果"
    ],
    "wT": [
     "冰箱",
     "裡",
     "有",
     "很多水果"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o16",
    "zh": "洗手间在哪里",
    "zhT": "洗手間在哪裡",
    "es": "¿Dónde está el baño?",
    "w": [
     "洗手间",
     "在",
     "哪里"
    ],
    "wT": [
     "洗手間",
     "在",
     "哪裡"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o17",
    "zh": "请你把书放在桌子上",
    "zhT": "請你把書放在桌子上",
    "es": "Por favor, poné el libro sobre la mesa.",
    "w": [
     "请",
     "你",
     "把",
     "书",
     "放在",
     "桌子上"
    ],
    "wT": [
     "請",
     "你",
     "把",
     "書",
     "放在",
     "桌子上"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o18",
    "zh": "我把手机放在家里",
    "zhT": "我把手機放在家裡",
    "es": "Dejé el celular en casa.",
    "w": [
     "我",
     "把",
     "手机",
     "放在",
     "家里"
    ],
    "wT": [
     "我",
     "把",
     "手機",
     "放在",
     "家裡"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o19",
    "zh": "他把钱包忘在家里了",
    "zhT": "他把錢包忘在家裡了",
    "es": "Se olvidó la billetera en casa.",
    "w": [
     "他",
     "把",
     "钱包",
     "忘在",
     "家里",
     "了"
    ],
    "wT": [
     "他",
     "把",
     "錢包",
     "忘在",
     "家裡",
     "了"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o20",
    "zh": "他是从台湾来的",
    "zhT": "他是從台灣來的",
    "es": "Viene de Taiwán.",
    "w": [
     "他是",
     "从",
     "台湾",
     "来",
     "的"
    ],
    "wT": [
     "他是",
     "從",
     "台灣",
     "來",
     "的"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o21",
    "zh": "我们班有二十个学生",
    "zhT": "我們班有二十個學生",
    "es": "En nuestra clase hay veinte estudiantes.",
    "w": [
     "我们班",
     "有",
     "二十个学生"
    ],
    "wT": [
     "我們班",
     "有",
     "二十個學生"
    ],
    "st": "ok"
   },
   {
    "id": "a1-o22",
    "zh": "房间里有两张床",
    "zhT": "房間裡有兩張床",
    "es": "En el cuarto hay dos camas.",
    "w": [
     "房间",
     "里",
     "有",
     "两张床"
    ],
    "wT": [
     "房間",
     "裡",
     "有",
     "兩張床"
    ],
    "st": "ok"
   }
  ]
 },
 "HSK1": {
  "dialogues": [
   {
    "id": "h1-d1",
    "lines": [
     {
      "who": "a",
      "zh": "你好，我想买书。",
      "zhT": "你好，我想買書。",
      "es": "Hola, quiero comprar libros."
     },
     {
      "who": "b",
      "zh": "你要几本？",
      "zhT": "你要幾本？",
      "es": "¿Cuántos querés?"
     },
     {
      "who": "a",
      "zh": "两本。多少钱？",
      "zhT": "兩本。多少錢？",
      "es": "Dos. ¿Cuánto es?"
     },
     {
      "who": "b",
      "zh": "二十块钱。",
      "zhT": "二十塊錢。",
      "es": "Veinte yuanes."
     },
     {
      "who": "a",
      "zh": "好的，给你钱。",
      "zhT": "好的，給你錢。",
      "es": "Bien, tomá el dinero."
     }
    ],
    "q": {
     "es": "¿Cuántos libros compra?",
     "opts": [
      "Dos",
      "Veinte",
      "Cinco"
     ]
    }
   },
   {
    "id": "h1-d2",
    "lines": [
     {
      "who": "a",
      "zh": "你叫什么名字？",
      "zhT": "你叫什麼名字？",
      "es": "¿Cómo te llamás?"
     },
     {
      "who": "b",
      "zh": "我叫小明，你呢？",
      "zhT": "我叫小明，你呢？",
      "es": "Me llamo Xiaoming. ¿Y vos?"
     },
     {
      "who": "a",
      "zh": "我叫小高。你几岁？",
      "zhT": "我叫小高。你幾歲？",
      "es": "Me llamo Xiaogao. ¿Cuántos años tenés?"
     },
     {
      "who": "b",
      "zh": "我八岁。",
      "zhT": "我八歲。",
      "es": "Tengo ocho."
     }
    ],
    "q": {
     "es": "¿Cuántos años tiene Xiaoming?",
     "opts": [
      "Ocho",
      "Siete",
      "Nueve"
     ]
    }
   },
   {
    "id": "h1-d3",
    "lines": [
     {
      "who": "a",
      "zh": "明天你去学校吗？",
      "zhT": "明天你去學校嗎？",
      "es": "¿Mañana vas a la escuela?"
     },
     {
      "who": "b",
      "zh": "不去，明天不上课。",
      "zhT": "不去，明天不上課。",
      "es": "No, mañana no hay clase."
     },
     {
      "who": "a",
      "zh": "那我们去商店吧。",
      "zhT": "那我們去商店吧。",
      "es": "Entonces vayamos a la tienda."
     },
     {
      "who": "b",
      "zh": "好，几点？",
      "zhT": "好，幾點？",
      "es": "Bueno, ¿a qué hora?"
     },
     {
      "who": "a",
      "zh": "上午十点，在学校前边见面。",
      "zhT": "上午十點，在學校前邊見面。",
      "es": "A las diez de la mañana, nos encontramos frente a la escuela."
     }
    ],
    "q": {
     "es": "¿A qué hora se encuentran?",
     "opts": [
      "A las diez de la mañana",
      "A las dos de la tarde",
      "A las ocho de la mañana"
     ]
    }
   },
   {
    "id": "h1-d4",
    "lines": [
     {
      "who": "a",
      "zh": "你想吃什么？",
      "zhT": "你想吃什麼？",
      "es": "¿Qué querés comer?"
     },
     {
      "who": "b",
      "zh": "我想吃米饭和鸡蛋。",
      "zhT": "我想吃米飯和雞蛋。",
      "es": "Quiero arroz y huevo."
     },
     {
      "who": "a",
      "zh": "喝什么？",
      "zhT": "喝什麼？",
      "es": "¿Y para tomar?"
     },
     {
      "who": "b",
      "zh": "我喝茶，你呢？",
      "zhT": "我喝茶，你呢？",
      "es": "Yo tomo té, ¿y vos?"
     },
     {
      "who": "a",
      "zh": "我喝水。",
      "zhT": "我喝水。",
      "es": "Yo tomo agua."
     }
    ],
    "q": {
     "es": "¿Qué toma la persona A?",
     "opts": [
      "Agua",
      "Té",
      "Leche"
     ]
    }
   },
   {
    "id": "h1-d5",
    "lines": [
     {
      "who": "a",
      "zh": "你好，你现在在哪儿？",
      "zhT": "你好，你現在在哪兒？",
      "es": "Hola, ¿dónde estás ahora?"
     },
     {
      "who": "b",
      "zh": "我在家。你呢？",
      "zhT": "我在家。你呢？",
      "es": "Estoy en casa. ¿Y vos?"
     },
     {
      "who": "a",
      "zh": "我在医院，我身体不好。",
      "zhT": "我在醫院，我身體不好。",
      "es": "Estoy en el hospital, no me siento bien."
     },
     {
      "who": "b",
      "zh": "你马上回家休息吧。",
      "zhT": "你馬上回家休息吧。",
      "es": "Volvé enseguida a casa a descansar."
     }
    ],
    "q": {
     "es": "¿Dónde está la persona A?",
     "opts": [
      "En el hospital",
      "En su casa",
      "En la escuela"
     ]
    }
   },
   {
    "id": "h1-d6",
    "lines": [
     {
      "who": "a",
      "zh": "你怎么去学校？",
      "zhT": "你怎麼去學校？",
      "es": "¿Cómo vas a la escuela?"
     },
     {
      "who": "b",
      "zh": "我坐汽车。",
      "zhT": "我坐汽車。",
      "es": "Voy en auto."
     },
     {
      "who": "a",
      "zh": "要多少时间？",
      "zhT": "要多少時間？",
      "es": "¿Cuánto tarda?"
     },
     {
      "who": "b",
      "zh": "一个小时。",
      "zhT": "一個小時。",
      "es": "Una hora."
     }
    ],
    "q": {
     "es": "¿Cuánto tarda en llegar a la escuela?",
     "opts": [
      "Una hora",
      "Diez minutos",
      "Dos horas"
     ]
    }
   }
  ],
  "readings": [
   {
    "id": "h1-r1",
    "zh": "今天星期六，天气很好。我和朋友去商店买东西。我们在饭店吃饭。",
    "zhT": "今天星期六，天氣很好。我和朋友去商店買東西。我們在飯店吃飯。",
    "es": "Hoy es sábado y hace muy buen tiempo. Voy con mi amigo a la tienda a comprar cosas. Comemos en un restaurante.",
    "q": {
     "es": "¿Adónde van primero?",
     "opts": [
      "A la tienda",
      "A la escuela",
      "A la casa de un amigo"
     ]
    }
   },
   {
    "id": "h1-r2",
    "zh": "我家有四个人：爸爸、妈妈、妹妹和我。爸爸是医生，妈妈是老师。妹妹六岁，她喜欢看电视。",
    "zhT": "我家有四個人：爸爸、媽媽、妹妹和我。爸爸是醫生，媽媽是老師。妹妹六歲，她喜歡看電視。",
    "es": "En mi casa somos cuatro: papá, mamá, mi hermana menor y yo. Mi papá es médico y mi mamá es maestra. Mi hermana tiene seis años y le gusta ver televisión.",
    "q": {
     "es": "¿Qué le gusta a la hermana?",
     "opts": [
      "Ver televisión",
      "Leer libros",
      "Jugar a la pelota"
     ]
    }
   },
   {
    "id": "h1-r3",
    "zh": "我早上七点起床，七点半吃饭。八点我去学校上课。下午四点回家。",
    "zhT": "我早上七點起床，七點半吃飯。八點我去學校上課。下午四點回家。",
    "es": "Me levanto a las siete de la mañana y como a las siete y media. A las ocho voy a la escuela a tener clase. A las cuatro de la tarde vuelvo a casa.",
    "q": {
     "es": "¿A qué hora va a la escuela?",
     "opts": [
      "A las ocho",
      "A las siete",
      "A las cuatro"
     ]
    }
   },
   {
    "id": "h1-r4",
    "zh": "昨天下雨，天气很冷。今天天气很好，不冷也不热。明天我想去山上玩儿。",
    "zhT": "昨天下雨，天氣很冷。今天天氣很好，不冷也不熱。明天我想去山上玩兒。",
    "es": "Ayer llovió y hizo mucho frío. Hoy hace muy buen tiempo, ni frío ni calor. Mañana quiero ir a jugar a la montaña.",
    "q": {
     "es": "¿Cómo estuvo el tiempo ayer?",
     "opts": [
      "Lluvioso y frío",
      "Soleado y caluroso",
      "Frío pero sin lluvia"
     ]
    }
   },
   {
    "id": "h1-r5",
    "zh": "我想买一个新手机。那个手机很好看。太贵了，要三百块。我没有钱，我不买。",
    "zhT": "我想買一個新手機。那個手機很好看。太貴了，要三百塊。我沒有錢，我不買。",
    "es": "Quiero comprar un teléfono nuevo. Ese teléfono es muy lindo. Es demasiado caro: cuesta trescientos yuanes. No tengo dinero, así que no lo compro.",
    "q": {
     "es": "¿Por qué no lo compra?",
     "opts": [
      "No tiene dinero",
      "No le gusta",
      "Ya tiene uno"
     ]
    }
   },
   {
    "id": "h1-r6",
    "zh": "我的爱好是打球。我哥哥的爱好是唱歌。我们星期天都不上课，我们在家玩儿。",
    "zhT": "我的愛好是打球。我哥哥的愛好是唱歌。我們星期天都不上課，我們在家玩兒。",
    "es": "Mi afición es jugar a la pelota. A mi hermano mayor le gusta cantar. Los domingos no tenemos clase y jugamos en casa.",
    "q": {
     "es": "¿Qué le gusta hacer al hermano?",
     "opts": [
      "Cantar",
      "Jugar a la pelota",
      "Ver televisión"
     ]
    }
   }
  ],
  "orders": [
   {
    "id": "h1-o3",
    "zh": "这本书很好看",
    "zhT": "這本書很好看",
    "es": "Este libro es muy bueno.",
    "w": [
     "这本书",
     "很",
     "好看"
    ],
    "wT": [
     "這本書",
     "很",
     "好看"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o6",
    "zh": "你想去哪儿",
    "zhT": "你想去哪兒",
    "es": "¿Adónde querés ir?",
    "w": [
     "你",
     "想去",
     "哪儿"
    ],
    "wT": [
     "你",
     "想去",
     "哪兒"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o7",
    "zh": "弟弟不想吃肉",
    "zhT": "弟弟不想吃肉",
    "es": "Mi hermano menor no quiere comer carne.",
    "w": [
     "弟弟",
     "不想",
     "吃肉"
    ],
    "wT": [
     "弟弟",
     "不想",
     "吃肉"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o8",
    "zh": "这个手机不贵",
    "zhT": "這個手機不貴",
    "es": "Este teléfono no es caro.",
    "w": [
     "这个",
     "手机",
     "不",
     "贵"
    ],
    "wT": [
     "這個",
     "手機",
     "不",
     "貴"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o2",
    "zh": "他喜欢看电影",
    "zhT": "他喜歡看電影",
    "es": "Le gusta ver películas.",
    "w": [
     "他",
     "喜欢",
     "看",
     "电影"
    ],
    "wT": [
     "他",
     "喜歡",
     "看",
     "電影"
    ],
    "alt": [
     "电影他喜欢看"
    ],
    "altT": [
     "電影他喜歡看"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o4",
    "zh": "妈妈想买衣服",
    "zhT": "媽媽想買衣服",
    "es": "Mamá quiere comprar ropa.",
    "w": [
     "妈妈",
     "想",
     "买",
     "衣服"
    ],
    "wT": [
     "媽媽",
     "想",
     "買",
     "衣服"
    ],
    "alt": [
     "衣服妈妈想买"
    ],
    "altT": [
     "衣服媽媽想買"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o5",
    "zh": "我的朋友会说汉语",
    "zhT": "我的朋友會說漢語",
    "es": "Mi amigo sabe hablar chino.",
    "w": [
     "我的",
     "朋友",
     "会说",
     "汉语"
    ],
    "wT": [
     "我的",
     "朋友",
     "會說",
     "漢語"
    ],
    "alt": [
     "汉语我的朋友会说"
    ],
    "altT": [
     "漢語我的朋友會說"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o9",
    "zh": "这杯茶很好喝",
    "zhT": "這杯茶很好喝",
    "es": "Este té está muy rico.",
    "w": [
     "这杯",
     "茶",
     "很",
     "好喝"
    ],
    "wT": [
     "這杯",
     "茶",
     "很",
     "好喝"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o10",
    "zh": "我的手机很新",
    "zhT": "我的手機很新",
    "es": "Mi celular es muy nuevo.",
    "w": [
     "我的",
     "手机",
     "很",
     "新"
    ],
    "wT": [
     "我的",
     "手機",
     "很",
     "新"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o11",
    "zh": "这个杯子很大",
    "zhT": "這個杯子很大",
    "es": "Este vaso es muy grande.",
    "w": [
     "这个",
     "杯子",
     "很",
     "大"
    ],
    "wT": [
     "這個",
     "杯子",
     "很",
     "大"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o12",
    "zh": "学校的书店很大",
    "zhT": "學校的書店很大",
    "es": "La librería de la escuela es muy grande.",
    "w": [
     "学校的",
     "书店",
     "很",
     "大"
    ],
    "wT": [
     "學校的",
     "書店",
     "很",
     "大"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o13",
    "zh": "你的名字很好听",
    "zhT": "你的名字很好聽",
    "es": "Tu nombre suena muy lindo.",
    "w": [
     "你的",
     "名字",
     "很",
     "好听"
    ],
    "wT": [
     "你的",
     "名字",
     "很",
     "好聽"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o14",
    "zh": "书包里有三本书",
    "zhT": "書包裡有三本書",
    "es": "En la mochila hay tres libros.",
    "w": [
     "书包",
     "里",
     "有",
     "三本书"
    ],
    "wT": [
     "書包",
     "裡",
     "有",
     "三本書"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o15",
    "zh": "你的书包很重",
    "zhT": "你的書包很重",
    "es": "Tu mochila es muy pesada.",
    "w": [
     "你的",
     "书包",
     "很",
     "重"
    ],
    "wT": [
     "你的",
     "書包",
     "很",
     "重"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o16",
    "zh": "我有三个朋友",
    "zhT": "我有三個朋友",
    "es": "Tengo tres amigos.",
    "w": [
     "我",
     "有",
     "三个朋友"
    ],
    "wT": [
     "我",
     "有",
     "三個朋友"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o17",
    "zh": "桌子上有两杯茶",
    "zhT": "桌子上有兩杯茶",
    "es": "Sobre la mesa hay dos tés.",
    "w": [
     "桌子",
     "上",
     "有",
     "两杯茶"
    ],
    "wT": [
     "桌子",
     "上",
     "有",
     "兩杯茶"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o18",
    "zh": "请你坐在这儿",
    "zhT": "請你坐在這兒",
    "es": "Por favor, sentate acá.",
    "w": [
     "请",
     "你",
     "坐在",
     "这儿"
    ],
    "wT": [
     "請",
     "你",
     "坐在",
     "這兒"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o19",
    "zh": "请你等一下儿",
    "zhT": "請你等一下兒",
    "es": "Esperá un momento, por favor.",
    "w": [
     "请",
     "你",
     "等",
     "一下儿"
    ],
    "wT": [
     "請",
     "你",
     "等",
     "一下兒"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o20",
    "zh": "我是从北京来的",
    "zhT": "我是從北京來的",
    "es": "Vengo de Pekín.",
    "w": [
     "我是",
     "从",
     "北京",
     "来",
     "的"
    ],
    "wT": [
     "我是",
     "從",
     "北京",
     "來",
     "的"
    ],
    "st": "ok"
   },
   {
    "id": "h1-o21",
    "zh": "我家有四口人",
    "zhT": "我家有四口人",
    "es": "Somos cuatro en mi familia.",
    "w": [
     "我家",
     "有",
     "四口",
     "人"
    ],
    "wT": [
     "我家",
     "有",
     "四口",
     "人"
    ],
    "st": "ok"
   }
  ]
 }
};
