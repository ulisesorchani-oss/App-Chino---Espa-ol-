// ============================================================
// lessons-ninos.js — Lecciones para NIÑOS (6–10 años) · PILOTO (6 lecciones, solo datos)
// ------------------------------------------------------------
// Chicos de habla china que aprenden español en Argentina (español rioplatense, voseo).
// SOLO DATOS (sin pantalla): la pista «🧒 Niños» y los ejercicios con dibujos llegan en una rama
// posterior. Aún no se carga en index.html. Textos escritos para la app; nivel A1 adaptado,
// NO oficial (el DELE Escolar arranca a los 11 años).
//
// Esquema por lección (window.NINOS_LESSONS):
//   { id, track: 'Niños', dele: 'A1', kid: true,
//     band: 'A' | 'B',          // A = 6–7 años (líneas de 1–5 palabras) · B = 8–10 (líneas de hasta 9)
//     unit, order,              // unidad del plan y orden sugerido
//     emoji, art,               // art: GRÁFICO FUTURO { src, alt } (null hoy: se usa el emoji)
//     titleEs, titleZh, titleZhT, blurb, blurbZh, blurbZhT,
//     words: [{ sp, zh, zhT, emoji, art }],          // palabras nuevas (máx. 8)
//     lines: [{ who, sp, zh, zhT }],                 // el diálogo (zh = simplificado, zhT = tradicional)
//     listen: [{ say, opts: [{ emoji, sp, zh, zhT, art }] }],  // «Escuchá y tocá»: suena `say`; opts[0] = correcta
//     quiz:  [{ sp (con ___), zh, zhT, opts: [{ w, e, eT }] }] // «Completar» (como DELE); opts[0] = correcta
//   }
// art (lección, palabra, opción): para sumar gráficos más adelante alcanza con completar
// { src: 'ruta', alt: 'texto' } sin cambiar el esquema; mientras sea null se muestra el emoji.
// Control: tools/check-ninos.js. Español rioplatense con voseo (sin «tú»).
// ============================================================
window.NINOS_LESSONS = [
 {
  "id": "ni-hola",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 1,
  "order": 1,
  "emoji": "👋",
  "art": null,
  "titleEs": "¡Hola! Me llamo Lin",
  "titleZh": "你好！我叫林",
  "titleZhT": "你好！我叫林",
  "blurb": "Lin llega a su nueva escuela. La seño lo presenta y Sofi lo invita a jugar.",
  "blurbZh": "林来到新学校。老师介绍他，索菲邀请他一起玩。",
  "blurbZhT": "林來到新學校。老師介紹他，索菲邀請他一起玩。",
  "words": [
   {
    "sp": "buen día",
    "zh": "早上好",
    "zhT": "早上好",
    "emoji": "🌞",
    "art": null
   },
   {
    "sp": "hola",
    "zh": "你好",
    "zhT": "你好",
    "emoji": "👋",
    "art": null
   },
   {
    "sp": "me llamo",
    "zh": "我叫",
    "zhT": "我叫",
    "emoji": "🙋",
    "art": null
   },
   {
    "sp": "¿cómo te llamás?",
    "zh": "你叫什么名字？",
    "zhT": "你叫什麼名字？",
    "emoji": "❓",
    "art": null
   },
   {
    "sp": "jugar",
    "zh": "玩",
    "zhT": "玩",
    "emoji": "🎲",
    "art": null
   },
   {
    "sp": "gracias",
    "zh": "谢谢",
    "zhT": "謝謝",
    "emoji": "🙏",
    "art": null
   },
   {
    "sp": "patio",
    "zh": "操场",
    "zhT": "操場",
    "emoji": "🏫",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Seño",
    "sp": "¡Buen día, chicos!",
    "zh": "早上好，孩子们！",
    "zhT": "早上好，孩子們！"
   },
   {
    "who": "Seño",
    "sp": "Hoy llegó un compañero nuevo.",
    "zh": "今天来了一位新同学。",
    "zhT": "今天來了一位新同學。"
   },
   {
    "who": "Seño",
    "sp": "¿Cómo te llamás?",
    "zh": "你叫什么名字？",
    "zhT": "你叫什麼名字？"
   },
   {
    "who": "Lin",
    "sp": "Me llamo Lin.",
    "zh": "我叫林。",
    "zhT": "我叫林。"
   },
   {
    "who": "Sofi",
    "sp": "¡Hola, Lin! Yo soy Sofi.",
    "zh": "你好，林！我是索菲。",
    "zhT": "你好，林！我是索菲。"
   },
   {
    "who": "Sofi",
    "sp": "¿Querés jugar?",
    "zh": "你想玩吗？",
    "zhT": "你想玩嗎？"
   },
   {
    "who": "Lin",
    "sp": "¡Sí, gracias!",
    "zh": "好，谢谢！",
    "zhT": "好，謝謝！"
   },
   {
    "who": "Sofi",
    "sp": "¡Vamos al patio!",
    "zh": "我们去操场吧！",
    "zhT": "我們去操場吧！"
   }
  ],
  "listen": [
   {
    "say": "¡Hola!",
    "opts": [
     {
      "emoji": "👋",
      "sp": "hola",
      "zh": "你好",
      "zhT": "你好",
      "art": null
     },
     {
      "emoji": "⚽",
      "sp": "pelota",
      "zh": "球",
      "zhT": "球",
      "art": null
     },
     {
      "emoji": "🥛",
      "sp": "leche",
      "zh": "牛奶",
      "zhT": "牛奶",
      "art": null
     }
    ]
   },
   {
    "say": "Gracias",
    "opts": [
     {
      "emoji": "🙏",
      "sp": "gracias",
      "zh": "谢谢",
      "zhT": "謝謝",
      "art": null
     },
     {
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     },
     {
      "emoji": "💧",
      "sp": "agua",
      "zh": "水",
      "zhT": "水",
      "art": null
     }
    ]
   },
   {
    "say": "El patio",
    "opts": [
     {
      "emoji": "🏫",
      "sp": "patio",
      "zh": "操场",
      "zhT": "操場",
      "art": null
     },
     {
      "emoji": "👩",
      "sp": "mamá",
      "zh": "妈妈",
      "zhT": "媽媽",
      "art": null
     },
     {
      "emoji": "📓",
      "sp": "cuaderno",
      "zh": "本子",
      "zhT": "本子",
      "art": null
     }
    ]
   },
   {
    "say": "La seño",
    "opts": [
     {
      "emoji": "👩‍🏫",
      "sp": "seño",
      "zh": "老师",
      "zhT": "老師",
      "art": null
     },
     {
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     },
     {
      "emoji": "🧃",
      "sp": "jugo",
      "zh": "果汁",
      "zhT": "果汁",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Me ___ Lin.",
    "zh": "我叫林。",
    "zhT": "我叫林。",
    "opts": [
     {
      "w": "llamo",
      "e": "叫",
      "eT": "叫"
     },
     {
      "w": "llama",
      "e": "他/她叫",
      "eT": "他/她叫"
     },
     {
      "w": "llamás",
      "e": "你叫",
      "eT": "你叫"
     }
    ]
   },
   {
    "sp": "¡Buen ___, chicos!",
    "zh": "早上好，孩子们！",
    "zhT": "早上好，孩子們！",
    "opts": [
     {
      "w": "día",
      "e": "天，早上",
      "eT": "天，早上"
     },
     {
      "w": "noche",
      "e": "夜晚",
      "eT": "夜晚"
     },
     {
      "w": "tarde",
      "e": "下午",
      "eT": "下午"
     }
    ]
   },
   {
    "sp": "¿Cómo te ___?",
    "zh": "你叫什么名字？",
    "zhT": "你叫什麼名字？",
    "opts": [
     {
      "w": "llamás",
      "e": "你叫",
      "eT": "你叫"
     },
     {
      "w": "llamo",
      "e": "我叫",
      "eT": "我叫"
     },
     {
      "w": "llaman",
      "e": "他们叫",
      "eT": "他們叫"
     }
    ]
   },
   {
    "sp": "¿Querés ___?",
    "zh": "你想玩吗？",
    "zhT": "你想玩嗎？",
    "opts": [
     {
      "w": "jugar",
      "e": "玩",
      "eT": "玩"
     },
     {
      "w": "comer",
      "e": "吃",
      "eT": "吃"
     },
     {
      "w": "dormir",
      "e": "睡觉",
      "eT": "睡覺"
     }
    ]
   },
   {
    "sp": "¡Vamos al ___!",
    "zh": "我们去操场吧！",
    "zhT": "我們去操場吧！",
    "opts": [
     {
      "w": "patio",
      "e": "操场",
      "eT": "操場"
     },
     {
      "w": "lápiz",
      "e": "铅笔",
      "eT": "鉛筆"
     },
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-cole",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 2,
  "order": 2,
  "emoji": "🎒",
  "art": null,
  "titleEs": "En el cole",
  "titleZh": "在学校",
  "titleZhT": "在學校",
  "blurb": "La seño pide los útiles. Lin busca su lápiz en la mochila.",
  "blurbZh": "老师让大家拿出文具。林在书包里找他的铅笔。",
  "blurbZhT": "老師讓大家拿出文具。林在書包裡找他的鉛筆。",
  "words": [
   {
    "sp": "seño",
    "zh": "老师",
    "zhT": "老師",
    "emoji": "👩‍🏫",
    "art": null
   },
   {
    "sp": "cuaderno",
    "zh": "本子",
    "zhT": "本子",
    "emoji": "📓",
    "art": null
   },
   {
    "sp": "lápiz",
    "zh": "铅笔",
    "zhT": "鉛筆",
    "emoji": "✏️",
    "art": null
   },
   {
    "sp": "mochila",
    "zh": "书包",
    "zhT": "書包",
    "emoji": "🎒",
    "art": null
   },
   {
    "sp": "¿dónde está?",
    "zh": "在哪里？",
    "zhT": "在哪裡？",
    "emoji": "📍",
    "art": null
   },
   {
    "sp": "acá",
    "zh": "这里",
    "zhT": "這裡",
    "emoji": "👇",
    "art": null
   },
   {
    "sp": "escribir",
    "zh": "写字",
    "zhT": "寫字",
    "emoji": "✍️",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Seño",
    "sp": "¡Buen día, chicos!",
    "zh": "早上好，孩子们！",
    "zhT": "早上好，孩子們！"
   },
   {
    "who": "Seño",
    "sp": "¡Sacá el cuaderno!",
    "zh": "拿出本子！",
    "zhT": "拿出本子！"
   },
   {
    "who": "Lin",
    "sp": "¿Dónde está mi lápiz?",
    "zh": "我的铅笔在哪里？",
    "zhT": "我的鉛筆在哪裡？"
   },
   {
    "who": "Sofi",
    "sp": "Está en la mochila.",
    "zh": "在书包里。",
    "zhT": "在書包裡。"
   },
   {
    "who": "Lin",
    "sp": "¡Acá está! Gracias, Sofi.",
    "zh": "在这里！谢谢你，索菲。",
    "zhT": "在這裡！謝謝你，索菲。"
   },
   {
    "who": "Seño",
    "sp": "Ahora, a escribir.",
    "zh": "现在，开始写字。",
    "zhT": "現在，開始寫字。"
   },
   {
    "who": "Seño",
    "sp": "¡Muy bien, Lin!",
    "zh": "做得好，林！",
    "zhT": "做得好，林！"
   },
   {
    "who": "Lin",
    "sp": "¡Gracias, seño!",
    "zh": "谢谢老师！",
    "zhT": "謝謝老師！"
   }
  ],
  "listen": [
   {
    "say": "El cuaderno",
    "opts": [
     {
      "emoji": "📓",
      "sp": "cuaderno",
      "zh": "本子",
      "zhT": "本子",
      "art": null
     },
     {
      "emoji": "🥅",
      "sp": "gol",
      "zh": "进球",
      "zhT": "進球",
      "art": null
     },
     {
      "emoji": "🍵",
      "sp": "té",
      "zh": "茶",
      "zhT": "茶",
      "art": null
     }
    ]
   },
   {
    "say": "El lápiz",
    "opts": [
     {
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     },
     {
      "emoji": "⚽",
      "sp": "pelota",
      "zh": "球",
      "zhT": "球",
      "art": null
     },
     {
      "emoji": "🧥",
      "sp": "campera",
      "zh": "外套",
      "zhT": "外套",
      "art": null
     }
    ]
   },
   {
    "say": "La mochila",
    "opts": [
     {
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     },
     {
      "emoji": "🥛",
      "sp": "leche",
      "zh": "牛奶",
      "zhT": "牛奶",
      "art": null
     },
     {
      "emoji": "🌳",
      "sp": "plaza",
      "zh": "公园",
      "zhT": "公園",
      "art": null
     }
    ]
   },
   {
    "say": "La seño",
    "opts": [
     {
      "emoji": "👩‍🏫",
      "sp": "seño",
      "zh": "老师",
      "zhT": "老師",
      "art": null
     },
     {
      "emoji": "👩",
      "sp": "mamá",
      "zh": "妈妈",
      "zhT": "媽媽",
      "art": null
     },
     {
      "emoji": "🚻",
      "sp": "baño",
      "zh": "厕所",
      "zhT": "廁所",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¡Sacá el ___!",
    "zh": "拿出本子！",
    "zhT": "拿出本子！",
    "opts": [
     {
      "w": "cuaderno",
      "e": "本子",
      "eT": "本子"
     },
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     },
     {
      "w": "patio",
      "e": "操场",
      "eT": "操場"
     }
    ]
   },
   {
    "sp": "¿Dónde ___ mi lápiz?",
    "zh": "我的铅笔在哪里？",
    "zhT": "我的鉛筆在哪裡？",
    "opts": [
     {
      "w": "está",
      "e": "在",
      "eT": "在"
     },
     {
      "w": "estás",
      "e": "你在",
      "eT": "你在"
     },
     {
      "w": "soy",
      "e": "我是",
      "eT": "我是"
     }
    ]
   },
   {
    "sp": "Está en la ___.",
    "zh": "在书包里。",
    "zhT": "在書包裡。",
    "opts": [
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     },
     {
      "w": "seño",
      "e": "老师",
      "eT": "老師"
     },
     {
      "w": "leche",
      "e": "牛奶",
      "eT": "牛奶"
     }
    ]
   },
   {
    "sp": "¡Muy ___, Lin!",
    "zh": "做得好，林！",
    "zhT": "做得好，林！",
    "opts": [
     {
      "w": "bien",
      "e": "好",
      "eT": "好"
     },
     {
      "w": "mal",
      "e": "不好",
      "eT": "不好"
     },
     {
      "w": "frío",
      "e": "冷",
      "eT": "冷"
     }
    ]
   },
   {
    "sp": "¡Gracias, ___!",
    "zh": "谢谢老师！",
    "zhT": "謝謝老師！",
    "opts": [
     {
      "w": "seño",
      "e": "老师",
      "eT": "老師"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "agua",
      "e": "水",
      "eT": "水"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-frases-utiles",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 2,
  "order": 3,
  "emoji": "🙋",
  "art": null,
  "titleEs": "Seño, ¿puedo…?",
  "titleZh": "老师，我可以……吗？",
  "titleZhT": "老師，我可以……嗎？",
  "blurb": "Frases para el aula: pedir ir al baño, decir que no entiendo, pedir prestado y pedir agua.",
  "blurbZh": "课堂用语：请求上厕所、说“我不明白”、借东西和要水喝。",
  "blurbZhT": "課堂用語：請求上廁所、說“我不明白”、借東西和要水喝。",
  "words": [
   {
    "sp": "¿puedo ir al baño?",
    "zh": "我可以去厕所吗？",
    "zhT": "我可以去廁所嗎？",
    "emoji": "🚻",
    "art": null
   },
   {
    "sp": "no entiendo",
    "zh": "我不明白",
    "zhT": "我不明白",
    "emoji": "🤷",
    "art": null
   },
   {
    "sp": "otra vez",
    "zh": "再一次",
    "zhT": "再一次",
    "emoji": "🔁",
    "art": null
   },
   {
    "sp": "me prestás",
    "zh": "你借给我",
    "zhT": "你借給我",
    "emoji": "🤲",
    "art": null
   },
   {
    "sp": "tomá",
    "zh": "拿去吧",
    "zhT": "拿去吧",
    "emoji": "🤝",
    "art": null
   },
   {
    "sp": "tengo sed",
    "zh": "我渴了",
    "zhT": "我渴了",
    "emoji": "🥤",
    "art": null
   },
   {
    "sp": "agua",
    "zh": "水",
    "zhT": "水",
    "emoji": "💧",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Lin",
    "sp": "Seño, ¿puedo ir al baño?",
    "zh": "老师，我可以去厕所吗？",
    "zhT": "老師，我可以去廁所嗎？"
   },
   {
    "who": "Seño",
    "sp": "Sí, andá.",
    "zh": "可以，去吧。",
    "zhT": "可以，去吧。"
   },
   {
    "who": "Lin",
    "sp": "Seño, no entiendo.",
    "zh": "老师，我不明白。",
    "zhT": "老師，我不明白。"
   },
   {
    "who": "Seño",
    "sp": "Te lo explico otra vez.",
    "zh": "我再给你讲一遍。",
    "zhT": "我再給你講一遍。"
   },
   {
    "who": "Lin",
    "sp": "¿Me prestás un lápiz, Sofi?",
    "zh": "索菲，你能借我一支铅笔吗？",
    "zhT": "索菲，你能借我一支鉛筆嗎？"
   },
   {
    "who": "Sofi",
    "sp": "¡Claro! Tomá.",
    "zh": "当然！拿去吧。",
    "zhT": "當然！拿去吧。"
   },
   {
    "who": "Lin",
    "sp": "Tengo sed. ¿Puedo tomar agua?",
    "zh": "我渴了。我可以喝水吗？",
    "zhT": "我渴了。我可以喝水嗎？"
   },
   {
    "who": "Seño",
    "sp": "Sí, tomá agua.",
    "zh": "可以，喝点水吧。",
    "zhT": "可以，喝點水吧。"
   }
  ],
  "listen": [
   {
    "say": "El baño",
    "opts": [
     {
      "emoji": "🚻",
      "sp": "baño",
      "zh": "厕所",
      "zhT": "廁所",
      "art": null
     },
     {
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     },
     {
      "emoji": "🧃",
      "sp": "jugo",
      "zh": "果汁",
      "zhT": "果汁",
      "art": null
     }
    ]
   },
   {
    "say": "Agua",
    "opts": [
     {
      "emoji": "💧",
      "sp": "agua",
      "zh": "水",
      "zhT": "水",
      "art": null
     },
     {
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     },
     {
      "emoji": "🥅",
      "sp": "gol",
      "zh": "进球",
      "zhT": "進球",
      "art": null
     }
    ]
   },
   {
    "say": "Un lápiz",
    "opts": [
     {
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     },
     {
      "emoji": "🍵",
      "sp": "té",
      "zh": "茶",
      "zhT": "茶",
      "art": null
     },
     {
      "emoji": "🌳",
      "sp": "plaza",
      "zh": "公园",
      "zhT": "公園",
      "art": null
     }
    ]
   },
   {
    "say": "La seño",
    "opts": [
     {
      "emoji": "👩‍🏫",
      "sp": "seño",
      "zh": "老师",
      "zhT": "老師",
      "art": null
     },
     {
      "emoji": "🧥",
      "sp": "campera",
      "zh": "外套",
      "zhT": "外套",
      "art": null
     },
     {
      "emoji": "👩",
      "sp": "mamá",
      "zh": "妈妈",
      "zhT": "媽媽",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Seño, ¿puedo ir al ___?",
    "zh": "老师，我可以去厕所吗？",
    "zhT": "老師，我可以去廁所嗎？",
    "opts": [
     {
      "w": "baño",
      "e": "厕所",
      "eT": "廁所"
     },
     {
      "w": "patio",
      "e": "操场",
      "eT": "操場"
     },
     {
      "w": "cuaderno",
      "e": "本子",
      "eT": "本子"
     }
    ]
   },
   {
    "sp": "Seño, no ___.",
    "zh": "老师，我不明白。",
    "zhT": "老師，我不明白。",
    "opts": [
     {
      "w": "entiendo",
      "e": "我明白",
      "eT": "我明白"
     },
     {
      "w": "tengo",
      "e": "我有",
      "eT": "我有"
     },
     {
      "w": "juego",
      "e": "我玩",
      "eT": "我玩"
     }
    ]
   },
   {
    "sp": "¿Me ___ un lápiz, Sofi?",
    "zh": "索菲，你能借我一支铅笔吗？",
    "zhT": "索菲，你能借我一支鉛筆嗎？",
    "opts": [
     {
      "w": "prestás",
      "e": "你借",
      "eT": "你借"
     },
     {
      "w": "presta",
      "e": "他借",
      "eT": "他借"
     },
     {
      "w": "prestan",
      "e": "他们借",
      "eT": "他們借"
     }
    ]
   },
   {
    "sp": "Tengo ___. ¿Puedo tomar agua?",
    "zh": "我渴了。我可以喝水吗？",
    "zhT": "我渴了。我可以喝水嗎？",
    "opts": [
     {
      "w": "sed",
      "e": "渴",
      "eT": "渴"
     },
     {
      "w": "frío",
      "e": "冷",
      "eT": "冷"
     },
     {
      "w": "fiebre",
      "e": "发烧",
      "eT": "發燒"
     }
    ]
   },
   {
    "sp": "Sí, tomá ___.",
    "zh": "可以，喝点水吧。",
    "zhT": "可以，喝點水吧。",
    "opts": [
     {
      "w": "agua",
      "e": "水",
      "eT": "水"
     },
     {
      "w": "gol",
      "e": "进球",
      "eT": "進球"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-merienda",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 4,
  "order": 4,
  "emoji": "🥐",
  "art": null,
  "titleEs": "Tengo hambre",
  "titleZh": "我饿了",
  "titleZhT": "我餓了",
  "blurb": "Es la hora de la merienda: leche, medialunas y un «¡qué rico!».",
  "blurbZh": "到吃点心的时间了：牛奶、牛角包和一句“真好吃！”。",
  "blurbZhT": "到吃點心的時間了：牛奶、牛角包和一句“真好吃！”。",
  "words": [
   {
    "sp": "merienda",
    "zh": "下午点心",
    "zhT": "下午點心",
    "emoji": "🍪",
    "art": null
   },
   {
    "sp": "tengo hambre",
    "zh": "我饿了",
    "zhT": "我餓了",
    "emoji": "🍽️",
    "art": null
   },
   {
    "sp": "leche",
    "zh": "牛奶",
    "zhT": "牛奶",
    "emoji": "🥛",
    "art": null
   },
   {
    "sp": "jugo",
    "zh": "果汁",
    "zhT": "果汁",
    "emoji": "🧃",
    "art": null
   },
   {
    "sp": "medialunas",
    "zh": "牛角包",
    "zhT": "牛角包",
    "emoji": "🥐",
    "art": null
   },
   {
    "sp": "¡qué rico!",
    "zh": "真好吃！",
    "zhT": "真好吃！",
    "emoji": "😋",
    "art": null
   },
   {
    "sp": "más",
    "zh": "更多",
    "zhT": "更多",
    "emoji": "➕",
    "art": null
   },
   {
    "sp": "lleno",
    "zh": "饱",
    "zhT": "飽",
    "emoji": "😌",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Mamá",
    "sp": "¡Es la hora de la merienda!",
    "zh": "到吃点心的时间啦！",
    "zhT": "到吃點心的時間啦！"
   },
   {
    "who": "Lin",
    "sp": "¡Tengo hambre!",
    "zh": "我饿了！",
    "zhT": "我餓了！"
   },
   {
    "who": "Mamá",
    "sp": "¿Querés leche o jugo?",
    "zh": "你想喝牛奶还是果汁？",
    "zhT": "你想喝牛奶還是果汁？"
   },
   {
    "who": "Lin",
    "sp": "Leche, por favor.",
    "zh": "请给我牛奶。",
    "zhT": "請給我牛奶。"
   },
   {
    "who": "Mamá",
    "sp": "Acá tenés dos medialunas.",
    "zh": "这里有两个牛角包。",
    "zhT": "這裡有兩個牛角包。"
   },
   {
    "who": "Lin",
    "sp": "¡Gracias, mamá! ¡Qué rico!",
    "zh": "谢谢妈妈！真好吃！",
    "zhT": "謝謝媽媽！真好吃！"
   },
   {
    "who": "Mamá",
    "sp": "¿Querés más?",
    "zh": "还要吗？",
    "zhT": "還要嗎？"
   },
   {
    "who": "Lin",
    "sp": "No, gracias. ¡Estoy lleno!",
    "zh": "不要了，谢谢。我吃饱了！",
    "zhT": "不要了，謝謝。我吃飽了！"
   }
  ],
  "listen": [
   {
    "say": "La leche",
    "opts": [
     {
      "emoji": "🥛",
      "sp": "leche",
      "zh": "牛奶",
      "zhT": "牛奶",
      "art": null
     },
     {
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     },
     {
      "emoji": "⚽",
      "sp": "pelota",
      "zh": "球",
      "zhT": "球",
      "art": null
     }
    ]
   },
   {
    "say": "El jugo",
    "opts": [
     {
      "emoji": "🧃",
      "sp": "jugo",
      "zh": "果汁",
      "zhT": "果汁",
      "art": null
     },
     {
      "emoji": "📓",
      "sp": "cuaderno",
      "zh": "本子",
      "zhT": "本子",
      "art": null
     },
     {
      "emoji": "🧥",
      "sp": "campera",
      "zh": "外套",
      "zhT": "外套",
      "art": null
     }
    ]
   },
   {
    "say": "Las medialunas",
    "opts": [
     {
      "emoji": "🥐",
      "sp": "medialunas",
      "zh": "牛角包",
      "zhT": "牛角包",
      "art": null
     },
     {
      "emoji": "💧",
      "sp": "agua",
      "zh": "水",
      "zhT": "水",
      "art": null
     },
     {
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     }
    ]
   },
   {
    "say": "Mamá",
    "opts": [
     {
      "emoji": "👩",
      "sp": "mamá",
      "zh": "妈妈",
      "zhT": "媽媽",
      "art": null
     },
     {
      "emoji": "👩‍🏫",
      "sp": "seño",
      "zh": "老师",
      "zhT": "老師",
      "art": null
     },
     {
      "emoji": "🚻",
      "sp": "baño",
      "zh": "厕所",
      "zhT": "廁所",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¡Es la hora de la ___!",
    "zh": "到吃点心的时间啦！",
    "zhT": "到吃點心的時間啦！",
    "opts": [
     {
      "w": "merienda",
      "e": "下午点心",
      "eT": "下午點心"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     },
     {
      "w": "plaza",
      "e": "公园",
      "eT": "公園"
     }
    ]
   },
   {
    "sp": "¡Tengo ___!",
    "zh": "我饿了！",
    "zhT": "我餓了！",
    "opts": [
     {
      "w": "hambre",
      "e": "饿",
      "eT": "餓"
     },
     {
      "w": "sed",
      "e": "渴",
      "eT": "渴"
     },
     {
      "w": "frío",
      "e": "冷",
      "eT": "冷"
     }
    ]
   },
   {
    "sp": "¿Querés leche o ___?",
    "zh": "你想喝牛奶还是果汁？",
    "zhT": "你想喝牛奶還是果汁？",
    "opts": [
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     },
     {
      "w": "gol",
      "e": "进球",
      "eT": "進球"
     },
     {
      "w": "baño",
      "e": "厕所",
      "eT": "廁所"
     }
    ]
   },
   {
    "sp": "Acá ___ dos medialunas.",
    "zh": "这里有两个牛角包。",
    "zhT": "這裡有兩個牛角包。",
    "opts": [
     {
      "w": "tenés",
      "e": "你有",
      "eT": "你有"
     },
     {
      "w": "tengo",
      "e": "我有",
      "eT": "我有"
     },
     {
      "w": "tiene",
      "e": "他有",
      "eT": "他有"
     }
    ]
   },
   {
    "sp": "No, gracias. ¡Estoy ___!",
    "zh": "不要了，谢谢。我吃饱了！",
    "zhT": "不要了，謝謝。我吃飽了！",
    "opts": [
     {
      "w": "lleno",
      "e": "饱",
      "eT": "飽"
     },
     {
      "w": "frío",
      "e": "冷",
      "eT": "冷"
     },
     {
      "w": "nuevo",
      "e": "新的",
      "eT": "新的"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-me-duele",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 5,
  "order": 5,
  "emoji": "🤒",
  "art": null,
  "titleEs": "Me duele la panza",
  "titleZh": "我肚子疼",
  "titleZhT": "我肚子疼",
  "blurb": "Lin no se siente bien. Mamá lo cuida: fiebre, frío, campera y un té calentito.",
  "blurbZh": "林不舒服。妈妈照顾他：发烧、怕冷、外套和一杯热茶。",
  "blurbZhT": "林不舒服。媽媽照顧他：發燒、怕冷、外套和一杯熱茶。",
  "words": [
   {
    "sp": "me duele la panza",
    "zh": "我肚子疼",
    "zhT": "我肚子疼",
    "emoji": "😣",
    "art": null
   },
   {
    "sp": "¿qué te pasa?",
    "zh": "你怎么了？",
    "zhT": "你怎麼了？",
    "emoji": "🤔",
    "art": null
   },
   {
    "sp": "fiebre",
    "zh": "发烧",
    "zhT": "發燒",
    "emoji": "🌡️",
    "art": null
   },
   {
    "sp": "frío",
    "zh": "冷",
    "zhT": "冷",
    "emoji": "🥶",
    "art": null
   },
   {
    "sp": "campera",
    "zh": "外套",
    "zhT": "外套",
    "emoji": "🧥",
    "art": null
   },
   {
    "sp": "descansá",
    "zh": "休息一下",
    "zhT": "休息一下",
    "emoji": "🛌",
    "art": null
   },
   {
    "sp": "té",
    "zh": "茶",
    "zhT": "茶",
    "emoji": "🍵",
    "art": null
   },
   {
    "sp": "mejor",
    "zh": "更好",
    "zhT": "更好",
    "emoji": "👍",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Mamá",
    "sp": "Lin, ¿qué te pasa?",
    "zh": "林，你怎么了？",
    "zhT": "林，你怎麼了？"
   },
   {
    "who": "Lin",
    "sp": "Me duele la panza.",
    "zh": "我肚子疼。",
    "zhT": "我肚子疼。"
   },
   {
    "who": "Mamá",
    "sp": "¿Tenés fiebre? Dejame ver.",
    "zh": "你发烧吗？让我看看。",
    "zhT": "你發燒嗎？讓我看看。"
   },
   {
    "who": "Mamá",
    "sp": "No, no tenés fiebre.",
    "zh": "没有，你没发烧。",
    "zhT": "沒有，你沒發燒。"
   },
   {
    "who": "Lin",
    "sp": "Pero tengo frío, mamá.",
    "zh": "可是我觉得冷，妈妈。",
    "zhT": "可是我覺得冷，媽媽。"
   },
   {
    "who": "Mamá",
    "sp": "Ponete la campera y descansá.",
    "zh": "穿上外套，休息一下。",
    "zhT": "穿上外套，休息一下。"
   },
   {
    "who": "Mamá",
    "sp": "Después tomás un té calentito.",
    "zh": "然后喝一杯热热的茶。",
    "zhT": "然後喝一杯熱熱的茶。"
   },
   {
    "who": "Lin",
    "sp": "Gracias, mamá. Ya estoy mejor.",
    "zh": "谢谢妈妈。我已经好多了。",
    "zhT": "謝謝媽媽。我已經好多了。"
   }
  ],
  "listen": [
   {
    "say": "La fiebre",
    "opts": [
     {
      "emoji": "🌡️",
      "sp": "fiebre",
      "zh": "发烧",
      "zhT": "發燒",
      "art": null
     },
     {
      "emoji": "⚽",
      "sp": "pelota",
      "zh": "球",
      "zhT": "球",
      "art": null
     },
     {
      "emoji": "📓",
      "sp": "cuaderno",
      "zh": "本子",
      "zhT": "本子",
      "art": null
     }
    ]
   },
   {
    "say": "Frío",
    "opts": [
     {
      "emoji": "🥶",
      "sp": "frío",
      "zh": "冷",
      "zhT": "冷",
      "art": null
     },
     {
      "emoji": "🧃",
      "sp": "jugo",
      "zh": "果汁",
      "zhT": "果汁",
      "art": null
     },
     {
      "emoji": "🥅",
      "sp": "gol",
      "zh": "进球",
      "zhT": "進球",
      "art": null
     }
    ]
   },
   {
    "say": "La campera",
    "opts": [
     {
      "emoji": "🧥",
      "sp": "campera",
      "zh": "外套",
      "zhT": "外套",
      "art": null
     },
     {
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     },
     {
      "emoji": "🚻",
      "sp": "baño",
      "zh": "厕所",
      "zhT": "廁所",
      "art": null
     }
    ]
   },
   {
    "say": "El té",
    "opts": [
     {
      "emoji": "🍵",
      "sp": "té",
      "zh": "茶",
      "zhT": "茶",
      "art": null
     },
     {
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     },
     {
      "emoji": "🌳",
      "sp": "plaza",
      "zh": "公园",
      "zhT": "公園",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Lin, ¿qué te ___?",
    "zh": "林，你怎么了？",
    "zhT": "林，你怎麼了？",
    "opts": [
     {
      "w": "pasa",
      "e": "发生",
      "eT": "發生"
     },
     {
      "w": "paso",
      "e": "我走过",
      "eT": "我走過"
     },
     {
      "w": "pasás",
      "e": "你走过",
      "eT": "你走過"
     }
    ]
   },
   {
    "sp": "Me ___ la panza.",
    "zh": "我肚子疼。",
    "zhT": "我肚子疼。",
    "opts": [
     {
      "w": "duele",
      "e": "疼",
      "eT": "疼"
     },
     {
      "w": "dulce",
      "e": "甜的",
      "eT": "甜的"
     },
     {
      "w": "doy",
      "e": "我给",
      "eT": "我給"
     }
    ]
   },
   {
    "sp": "No, no tenés ___.",
    "zh": "没有，你没发烧。",
    "zhT": "沒有，你沒發燒。",
    "opts": [
     {
      "w": "fiebre",
      "e": "发烧",
      "eT": "發燒"
     },
     {
      "w": "sed",
      "e": "渴",
      "eT": "渴"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "Ponete la ___ y descansá.",
    "zh": "穿上外套，休息一下。",
    "zhT": "穿上外套，休息一下。",
    "opts": [
     {
      "w": "campera",
      "e": "外套",
      "eT": "外套"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "leche",
      "e": "牛奶",
      "eT": "牛奶"
     }
    ]
   },
   {
    "sp": "Gracias, mamá. Ya estoy ___.",
    "zh": "谢谢妈妈。我已经好多了。",
    "zhT": "謝謝媽媽。我已經好多了。",
    "opts": [
     {
      "w": "mejor",
      "e": "更好",
      "eT": "更好"
     },
     {
      "w": "lleno",
      "e": "饱",
      "eT": "飽"
     },
     {
      "w": "nuevo",
      "e": "新的",
      "eT": "新的"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-plaza",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 6,
  "order": 6,
  "emoji": "⚽",
  "art": null,
  "titleEs": "¡Jugamos en la plaza!",
  "titleZh": "我们去公园玩！",
  "titleZhT": "我們去公園玩！",
  "blurb": "Sofi y Lin juegan a la pelota: pasar, esperar el turno y festejar un gol.",
  "blurbZh": "索菲和林一起玩球：传球、等轮到自己、庆祝进球。",
  "blurbZhT": "索菲和林一起玩球：傳球、等輪到自己、慶祝進球。",
  "words": [
   {
    "sp": "plaza",
    "zh": "公园",
    "zhT": "公園",
    "emoji": "🌳",
    "art": null
   },
   {
    "sp": "pelota",
    "zh": "球",
    "zhT": "球",
    "emoji": "⚽",
    "art": null
   },
   {
    "sp": "¡dale!",
    "zh": "好啊！",
    "zhT": "好啊！",
    "emoji": "🙌",
    "art": null
   },
   {
    "sp": "pasame",
    "zh": "传给我",
    "zhT": "傳給我",
    "emoji": "➡️",
    "art": null
   },
   {
    "sp": "te toca a vos",
    "zh": "轮到你了",
    "zhT": "輪到你了",
    "emoji": "👉",
    "art": null
   },
   {
    "sp": "gol",
    "zh": "进球",
    "zhT": "進球",
    "emoji": "🥅",
    "art": null
   },
   {
    "sp": "jugás",
    "zh": "你玩",
    "zhT": "你玩",
    "emoji": "🏃",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Sofi",
    "sp": "¡Vamos a la plaza!",
    "zh": "我们去公园吧！",
    "zhT": "我們去公園吧！"
   },
   {
    "who": "Lin",
    "sp": "¿Querés jugar a la pelota?",
    "zh": "你想玩球吗？",
    "zhT": "你想玩球嗎？"
   },
   {
    "who": "Sofi",
    "sp": "¡Dale!",
    "zh": "好啊！",
    "zhT": "好啊！"
   },
   {
    "who": "Sofi",
    "sp": "¡Pasame la pelota!",
    "zh": "把球传给我！",
    "zhT": "把球傳給我！"
   },
   {
    "who": "Lin",
    "sp": "¡Tomá!",
    "zh": "接着！",
    "zhT": "接著！"
   },
   {
    "who": "Sofi",
    "sp": "Ahora te toca a vos.",
    "zh": "现在轮到你了。",
    "zhT": "現在輪到你了。"
   },
   {
    "who": "Lin",
    "sp": "¡Gol!",
    "zh": "进球啦！",
    "zhT": "進球啦！"
   },
   {
    "who": "Sofi",
    "sp": "¡Qué bien jugás, Lin!",
    "zh": "你踢得真好，林！",
    "zhT": "你踢得真好，林！"
   }
  ],
  "listen": [
   {
    "say": "La plaza",
    "opts": [
     {
      "emoji": "🌳",
      "sp": "plaza",
      "zh": "公园",
      "zhT": "公園",
      "art": null
     },
     {
      "emoji": "📓",
      "sp": "cuaderno",
      "zh": "本子",
      "zhT": "本子",
      "art": null
     },
     {
      "emoji": "🧃",
      "sp": "jugo",
      "zh": "果汁",
      "zhT": "果汁",
      "art": null
     }
    ]
   },
   {
    "say": "La pelota",
    "opts": [
     {
      "emoji": "⚽",
      "sp": "pelota",
      "zh": "球",
      "zhT": "球",
      "art": null
     },
     {
      "emoji": "🥛",
      "sp": "leche",
      "zh": "牛奶",
      "zhT": "牛奶",
      "art": null
     },
     {
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     }
    ]
   },
   {
    "say": "¡Gol!",
    "opts": [
     {
      "emoji": "🥅",
      "sp": "gol",
      "zh": "进球",
      "zhT": "進球",
      "art": null
     },
     {
      "emoji": "🍵",
      "sp": "té",
      "zh": "茶",
      "zhT": "茶",
      "art": null
     },
     {
      "emoji": "🚻",
      "sp": "baño",
      "zh": "厕所",
      "zhT": "廁所",
      "art": null
     }
    ]
   },
   {
    "say": "Hola",
    "opts": [
     {
      "emoji": "👋",
      "sp": "hola",
      "zh": "你好",
      "zhT": "你好",
      "art": null
     },
     {
      "emoji": "💧",
      "sp": "agua",
      "zh": "水",
      "zhT": "水",
      "art": null
     },
     {
      "emoji": "🧥",
      "sp": "campera",
      "zh": "外套",
      "zhT": "外套",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¡Vamos a la ___!",
    "zh": "我们去公园吧！",
    "zhT": "我們去公園吧！",
    "opts": [
     {
      "w": "plaza",
      "e": "公园",
      "eT": "公園"
     },
     {
      "w": "seño",
      "e": "老师",
      "eT": "老師"
     },
     {
      "w": "merienda",
      "e": "点心",
      "eT": "點心"
     }
    ]
   },
   {
    "sp": "¿Querés jugar a la ___?",
    "zh": "你想玩球吗？",
    "zhT": "你想玩球嗎？",
    "opts": [
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "campera",
      "e": "外套",
      "eT": "外套"
     },
     {
      "w": "leche",
      "e": "牛奶",
      "eT": "牛奶"
     }
    ]
   },
   {
    "sp": "¡___ la pelota!",
    "zh": "把球传给我！",
    "zhT": "把球傳給我！",
    "opts": [
     {
      "w": "Pasame",
      "e": "传给我",
      "eT": "傳給我"
     },
     {
      "w": "Tomá",
      "e": "拿着",
      "eT": "拿著"
     },
     {
      "w": "Sacá",
      "e": "拿出",
      "eT": "拿出"
     }
    ]
   },
   {
    "sp": "Ahora te ___ a vos.",
    "zh": "现在轮到你了。",
    "zhT": "現在輪到你了。",
    "opts": [
     {
      "w": "toca",
      "e": "轮到",
      "eT": "輪到"
     },
     {
      "w": "duele",
      "e": "疼",
      "eT": "疼"
     },
     {
      "w": "llamo",
      "e": "我叫",
      "eT": "我叫"
     }
    ]
   },
   {
    "sp": "¡Qué bien ___, Lin!",
    "zh": "你踢得真好，林！",
    "zhT": "你踢得真好，林！",
    "opts": [
     {
      "w": "jugás",
      "e": "你玩",
      "eT": "你玩"
     },
     {
      "w": "juego",
      "e": "我玩",
      "eT": "我玩"
     },
     {
      "w": "juega",
      "e": "他玩",
      "eT": "他玩"
     }
    ]
   }
  ]
 }
];
