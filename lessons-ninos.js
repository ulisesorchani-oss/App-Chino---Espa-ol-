// ============================================================
// lessons-ninos.js — Lecciones para NIÑOS (6–10 años) · piloto + unidades (se amplía de a 3 lecciones)
// ------------------------------------------------------------
// Chicos de habla china que aprenden español en Argentina (español rioplatense, voseo).
// La pantalla vive en ninos-ui.js (pista «🧒 Niños»). Textos escritos para la app; nivel A1 adaptado,
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
  "order": 5,
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
  "order": 6,
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
  "order": 7,
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
 },
 {
  "id": "ni-familia",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 3,
  "order": 4,
  "emoji": "👪",
  "art": null,
  "titleEs": "Mi familia",
  "titleZh": "我的家人",
  "titleZhT": "我的家人",
  "blurb": "Sofi le muestra a Lin las fotos de su familia: mamá, papá, abuela y hermanito.",
  "blurbZh": "索菲给林看她家人的照片：妈妈、爸爸、奶奶和小弟弟。",
  "blurbZhT": "索菲給林看她家人的照片：媽媽、爸爸、奶奶和小弟弟。",
  "words": [
   {
    "sp": "mirá",
    "zh": "看",
    "zhT": "看",
    "emoji": "👀",
    "art": null
   },
   {
    "sp": "familia",
    "zh": "家人",
    "zhT": "家人",
    "emoji": "👪",
    "art": null
   },
   {
    "sp": "mamá",
    "zh": "妈妈",
    "zhT": "媽媽",
    "emoji": "👩",
    "art": null
   },
   {
    "sp": "papá",
    "zh": "爸爸",
    "zhT": "爸爸",
    "emoji": "👨",
    "art": null
   },
   {
    "sp": "abuela",
    "zh": "奶奶 / 外婆",
    "zhT": "奶奶 / 外婆",
    "emoji": "👵",
    "art": null
   },
   {
    "sp": "hermanito",
    "zh": "小弟弟",
    "zhT": "小弟弟",
    "emoji": "👦",
    "art": null
   },
   {
    "sp": "hermana mayor",
    "zh": "姐姐",
    "zhT": "姐姐",
    "emoji": "👧",
    "art": null
   },
   {
    "sp": "¿y vos?",
    "zh": "你呢？",
    "zhT": "你呢？",
    "emoji": "💬",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Sofi",
    "sp": "¡Hola, Lin! Mirá mi familia.",
    "zh": "你好，林！看看我的家人。",
    "zhT": "你好，林！看看我的家人。"
   },
   {
    "who": "Sofi",
    "sp": "Ella es mi mamá.",
    "zh": "她是我妈妈。",
    "zhT": "她是我媽媽。"
   },
   {
    "who": "Sofi",
    "sp": "Él es mi papá.",
    "zh": "他是我爸爸。",
    "zhT": "他是我爸爸。"
   },
   {
    "who": "Sofi",
    "sp": "Y ella es mi abuela.",
    "zh": "她是我奶奶。",
    "zhT": "她是我奶奶。"
   },
   {
    "who": "Lin",
    "sp": "¿Tenés hermanos?",
    "zh": "你有兄弟姐妹吗？",
    "zhT": "你有兄弟姐妹嗎？"
   },
   {
    "who": "Sofi",
    "sp": "Sí, un hermanito.",
    "zh": "有，一个小弟弟。",
    "zhT": "有，一個小弟弟。"
   },
   {
    "who": "Sofi",
    "sp": "¿Y vos, Lin?",
    "zh": "你呢，林？",
    "zhT": "你呢，林？"
   },
   {
    "who": "Lin",
    "sp": "Tengo una hermana mayor.",
    "zh": "我有一个姐姐。",
    "zhT": "我有一個姐姐。"
   },
   {
    "who": "Sofi",
    "sp": "¡Qué linda familia!",
    "zh": "多么可爱的一家人！",
    "zhT": "多麼可愛的一家人！"
   }
  ],
  "listen": [
   {
    "say": "Mi papá",
    "opts": [
     {
      "emoji": "👨",
      "sp": "papá",
      "zh": "爸爸",
      "zhT": "爸爸",
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
      "emoji": "👵",
      "sp": "abuela",
      "zh": "奶奶",
      "zhT": "奶奶",
      "art": null
     }
    ]
   },
   {
    "say": "La abuela",
    "opts": [
     {
      "emoji": "👵",
      "sp": "abuela",
      "zh": "奶奶",
      "zhT": "奶奶",
      "art": null
     },
     {
      "emoji": "👨",
      "sp": "papá",
      "zh": "爸爸",
      "zhT": "爸爸",
      "art": null
     },
     {
      "emoji": "👦",
      "sp": "hermanito",
      "zh": "小弟弟",
      "zhT": "小弟弟",
      "art": null
     }
    ]
   },
   {
    "say": "Mi familia",
    "opts": [
     {
      "emoji": "👪",
      "sp": "familia",
      "zh": "家人",
      "zhT": "家人",
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
    "say": "El hermanito",
    "opts": [
     {
      "emoji": "👦",
      "sp": "hermanito",
      "zh": "小弟弟",
      "zhT": "小弟弟",
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
      "emoji": "🥛",
      "sp": "leche",
      "zh": "牛奶",
      "zhT": "牛奶",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Ella es mi ___.",
    "zh": "她是我妈妈。",
    "zhT": "她是我媽媽。",
    "opts": [
     {
      "w": "mamá",
      "e": "妈妈",
      "eT": "媽媽"
     },
     {
      "w": "papá",
      "e": "爸爸",
      "eT": "爸爸"
     },
     {
      "w": "hermanito",
      "e": "小弟弟",
      "eT": "小弟弟"
     }
    ]
   },
   {
    "sp": "Él es mi ___.",
    "zh": "他是我爸爸。",
    "zhT": "他是我爸爸。",
    "opts": [
     {
      "w": "papá",
      "e": "爸爸",
      "eT": "爸爸"
     },
     {
      "w": "mamá",
      "e": "妈妈",
      "eT": "媽媽"
     },
     {
      "w": "abuela",
      "e": "奶奶",
      "eT": "奶奶"
     }
    ]
   },
   {
    "sp": "Y ella es mi ___.",
    "zh": "她是我奶奶。",
    "zhT": "她是我奶奶。",
    "opts": [
     {
      "w": "abuela",
      "e": "奶奶",
      "eT": "奶奶"
     },
     {
      "w": "papá",
      "e": "爸爸",
      "eT": "爸爸"
     },
     {
      "w": "hermanito",
      "e": "小弟弟",
      "eT": "小弟弟"
     }
    ]
   },
   {
    "sp": "Tengo una ___ mayor.",
    "zh": "我有一个姐姐。",
    "zhT": "我有一個姐姐。",
    "opts": [
     {
      "w": "hermana",
      "e": "姐妹",
      "eT": "姐妹"
     },
     {
      "w": "hermano",
      "e": "兄弟",
      "eT": "兄弟"
     },
     {
      "w": "hermanito",
      "e": "小弟弟",
      "eT": "小弟弟"
     }
    ]
   },
   {
    "sp": "¡Qué linda ___!",
    "zh": "多么可爱的一家人！",
    "zhT": "多麼可愛的一家人！",
    "opts": [
     {
      "w": "familia",
      "e": "家人",
      "eT": "家人"
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
  "id": "ni-colores",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 7,
  "order": 8,
  "emoji": "🎨",
  "art": null,
  "titleEs": "Colores y números",
  "titleZh": "颜色和数字",
  "titleZhT": "顏色和數字",
  "blurb": "En la clase de plástica, Lin y Sofi eligen colores y cuentan lápices del uno al cuatro.",
  "blurbZh": "美术课上，林和索菲选颜色，还从一数到四。",
  "blurbZhT": "美術課上，林和索菲選顏色，還從一數到四。",
  "words": [
   {
    "sp": "color",
    "zh": "颜色",
    "zhT": "顏色",
    "emoji": "🎨",
    "art": null
   },
   {
    "sp": "rojo",
    "zh": "红色",
    "zhT": "紅色",
    "emoji": "🔴",
    "art": null
   },
   {
    "sp": "verde",
    "zh": "绿色",
    "zhT": "綠色",
    "emoji": "🟢",
    "art": null
   },
   {
    "sp": "amarillo",
    "zh": "黄色",
    "zhT": "黃色",
    "emoji": "🟡",
    "art": null
   },
   {
    "sp": "uno",
    "zh": "一",
    "zhT": "一",
    "emoji": "1️⃣",
    "art": null
   },
   {
    "sp": "dos",
    "zh": "二",
    "zhT": "二",
    "emoji": "2️⃣",
    "art": null
   },
   {
    "sp": "tres",
    "zh": "三",
    "zhT": "三",
    "emoji": "3️⃣",
    "art": null
   },
   {
    "sp": "cuatro",
    "zh": "四",
    "zhT": "四",
    "emoji": "4️⃣",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Seño",
    "sp": "¡A pintar, chicos!",
    "zh": "孩子们，来画画吧！",
    "zhT": "孩子們，來畫畫吧！"
   },
   {
    "who": "Sofi",
    "sp": "¿Qué color querés, Lin?",
    "zh": "林，你想要什么颜色？",
    "zhT": "林，你想要什麼顏色？"
   },
   {
    "who": "Lin",
    "sp": "Quiero el rojo. ¿Y vos?",
    "zh": "我想要红色的。你呢？",
    "zhT": "我想要紅色的。你呢？"
   },
   {
    "who": "Sofi",
    "sp": "Yo quiero el verde.",
    "zh": "我想要绿色的。",
    "zhT": "我想要綠色的。"
   },
   {
    "who": "Seño",
    "sp": "El sol es amarillo.",
    "zh": "太阳是黄色的。",
    "zhT": "太陽是黃色的。"
   },
   {
    "who": "Lin",
    "sp": "Tengo un lápiz amarillo.",
    "zh": "我有一支黄色的铅笔。",
    "zhT": "我有一支黃色的鉛筆。"
   },
   {
    "who": "Seño",
    "sp": "¿Cuántos lápices hay?",
    "zh": "有几支铅笔？",
    "zhT": "有幾支鉛筆？"
   },
   {
    "who": "Lin",
    "sp": "Uno, dos, tres, cuatro.",
    "zh": "一、二、三、四。",
    "zhT": "一、二、三、四。"
   },
   {
    "who": "Sofi",
    "sp": "¡Qué lindos colores!",
    "zh": "多漂亮的颜色啊！",
    "zhT": "多漂亮的顏色啊！"
   }
  ],
  "listen": [
   {
    "say": "Rojo",
    "opts": [
     {
      "emoji": "🔴",
      "sp": "rojo",
      "zh": "红色",
      "zhT": "紅色",
      "art": null
     },
     {
      "emoji": "🟢",
      "sp": "verde",
      "zh": "绿色",
      "zhT": "綠色",
      "art": null
     },
     {
      "emoji": "🟡",
      "sp": "amarillo",
      "zh": "黄色",
      "zhT": "黃色",
      "art": null
     }
    ]
   },
   {
    "say": "Tres",
    "opts": [
     {
      "emoji": "3️⃣",
      "sp": "tres",
      "zh": "三",
      "zhT": "三",
      "art": null
     },
     {
      "emoji": "1️⃣",
      "sp": "uno",
      "zh": "一",
      "zhT": "一",
      "art": null
     },
     {
      "emoji": "4️⃣",
      "sp": "cuatro",
      "zh": "四",
      "zhT": "四",
      "art": null
     }
    ]
   },
   {
    "say": "Verde",
    "opts": [
     {
      "emoji": "🟢",
      "sp": "verde",
      "zh": "绿色",
      "zhT": "綠色",
      "art": null
     },
     {
      "emoji": "🔴",
      "sp": "rojo",
      "zh": "红色",
      "zhT": "紅色",
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
    "say": "Cuatro",
    "opts": [
     {
      "emoji": "4️⃣",
      "sp": "cuatro",
      "zh": "四",
      "zhT": "四",
      "art": null
     },
     {
      "emoji": "2️⃣",
      "sp": "dos",
      "zh": "二",
      "zhT": "二",
      "art": null
     },
     {
      "emoji": "🟡",
      "sp": "amarillo",
      "zh": "黄色",
      "zhT": "黃色",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¿Qué color ___, Lin?",
    "zh": "林，你想要什么颜色？",
    "zhT": "林，你想要什麼顏色？",
    "opts": [
     {
      "w": "querés",
      "e": "你想要",
      "eT": "你想要"
     },
     {
      "w": "quiero",
      "e": "我想要",
      "eT": "我想要"
     },
     {
      "w": "quiere",
      "e": "他想要",
      "eT": "他想要"
     }
    ]
   },
   {
    "sp": "El sol es ___.",
    "zh": "太阳是黄色的。",
    "zhT": "太陽是黃色的。",
    "opts": [
     {
      "w": "amarillo",
      "e": "黄色",
      "eT": "黃色"
     },
     {
      "w": "verde",
      "e": "绿色",
      "eT": "綠色"
     },
     {
      "w": "azul",
      "e": "蓝色",
      "eT": "藍色"
     }
    ]
   },
   {
    "sp": "Uno, dos, ___, cuatro.",
    "zh": "一、二、三、四。",
    "zhT": "一、二、三、四。",
    "opts": [
     {
      "w": "tres",
      "e": "三",
      "eT": "三"
     },
     {
      "w": "seis",
      "e": "六",
      "eT": "六"
     },
     {
      "w": "diez",
      "e": "十",
      "eT": "十"
     }
    ]
   },
   {
    "sp": "¿Cuántos ___ hay?",
    "zh": "有几支铅笔？",
    "zhT": "有幾支鉛筆？",
    "opts": [
     {
      "w": "lápices",
      "e": "铅笔",
      "eT": "鉛筆"
     },
     {
      "w": "pelotas",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "mochilas",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "¡Qué lindos ___!",
    "zh": "多漂亮的颜色啊！",
    "zhT": "多漂亮的顏色啊！",
    "opts": [
     {
      "w": "colores",
      "e": "颜色",
      "eT": "顏色"
     },
     {
      "w": "plazas",
      "e": "公园",
      "eT": "公園"
     },
     {
      "w": "medialunas",
      "e": "牛角包",
      "eT": "牛角包"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-animales",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 8,
  "order": 9,
  "emoji": "🐶",
  "art": null,
  "titleEs": "Mi mascota",
  "titleZh": "我的宠物",
  "titleZhT": "我的寵物",
  "blurb": "La seño pregunta por las mascotas: Sofi tiene un perro llamado Firulais y Lin, un gato.",
  "blurbZh": "老师问起宠物：索菲有一只叫菲鲁莱斯的狗，林有一只猫。",
  "blurbZhT": "老師問起寵物：索菲有一隻叫菲魯萊斯的狗，林有一隻貓。",
  "words": [
   {
    "sp": "mascota",
    "zh": "宠物",
    "zhT": "寵物",
    "emoji": "🐾",
    "art": null
   },
   {
    "sp": "perro",
    "zh": "狗",
    "zhT": "狗",
    "emoji": "🐶",
    "art": null
   },
   {
    "sp": "gato",
    "zh": "猫",
    "zhT": "貓",
    "emoji": "🐱",
    "art": null
   },
   {
    "sp": "pájaro",
    "zh": "小鸟",
    "zhT": "小鳥",
    "emoji": "🐦",
    "art": null
   },
   {
    "sp": "grande",
    "zh": "大",
    "zhT": "大",
    "emoji": "🐘",
    "art": null
   },
   {
    "sp": "chiquito",
    "zh": "很小",
    "zhT": "很小",
    "emoji": "🤏",
    "art": null
   },
   {
    "sp": "simpático",
    "zh": "讨人喜欢",
    "zhT": "討人喜歡",
    "emoji": "😊",
    "art": null
   },
   {
    "sp": "se llama",
    "zh": "它叫",
    "zhT": "它叫",
    "emoji": "🏷️",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Seño",
    "sp": "Sofi, ¿tenés mascota?",
    "zh": "索菲，你有宠物吗？",
    "zhT": "索菲，你有寵物嗎？"
   },
   {
    "who": "Sofi",
    "sp": "Sí, tengo un perro.",
    "zh": "有，我有一只狗。",
    "zhT": "有，我有一隻狗。"
   },
   {
    "who": "Sofi",
    "sp": "Se llama Firulais.",
    "zh": "它叫菲鲁莱斯。",
    "zhT": "它叫菲魯萊斯。"
   },
   {
    "who": "Lin",
    "sp": "¿Es grande?",
    "zh": "它大吗？",
    "zhT": "它大嗎？"
   },
   {
    "who": "Sofi",
    "sp": "No, es chiquito y muy simpático.",
    "zh": "不大，它很小，而且很讨人喜欢。",
    "zhT": "不大，它很小，而且很討人喜歡。"
   },
   {
    "who": "Seño",
    "sp": "¿Y vos, Lin? ¿Tenés mascota?",
    "zh": "林，你呢？你有宠物吗？",
    "zhT": "林，你呢？你有寵物嗎？"
   },
   {
    "who": "Lin",
    "sp": "Sí, tengo un gato.",
    "zh": "有，我有一只猫。",
    "zhT": "有，我有一隻貓。"
   },
   {
    "who": "Lin",
    "sp": "Le gusta tomar leche.",
    "zh": "它爱喝牛奶。",
    "zhT": "它愛喝牛奶。"
   },
   {
    "who": "Sofi",
    "sp": "¡Qué lindo! Yo quiero un pájaro.",
    "zh": "真可爱！我想要一只小鸟。",
    "zhT": "真可愛！我想要一隻小鳥。"
   }
  ],
  "listen": [
   {
    "say": "El perro",
    "opts": [
     {
      "emoji": "🐶",
      "sp": "perro",
      "zh": "狗",
      "zhT": "狗",
      "art": null
     },
     {
      "emoji": "🐱",
      "sp": "gato",
      "zh": "猫",
      "zhT": "貓",
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
    "say": "El gato",
    "opts": [
     {
      "emoji": "🐱",
      "sp": "gato",
      "zh": "猫",
      "zhT": "貓",
      "art": null
     },
     {
      "emoji": "🐶",
      "sp": "perro",
      "zh": "狗",
      "zhT": "狗",
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
    "say": "Un pájaro",
    "opts": [
     {
      "emoji": "🐦",
      "sp": "pájaro",
      "zh": "小鸟",
      "zhT": "小鳥",
      "art": null
     },
     {
      "emoji": "🐶",
      "sp": "perro",
      "zh": "狗",
      "zhT": "狗",
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
    "say": "Mi mascota",
    "opts": [
     {
      "emoji": "🐾",
      "sp": "mascota",
      "zh": "宠物",
      "zhT": "寵物",
      "art": null
     },
     {
      "emoji": "🌳",
      "sp": "plaza",
      "zh": "公园",
      "zhT": "公園",
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
    "sp": "Se ___ Firulais.",
    "zh": "它叫菲鲁莱斯。",
    "zhT": "它叫菲魯萊斯。",
    "opts": [
     {
      "w": "llama",
      "e": "叫",
      "eT": "叫"
     },
     {
      "w": "llamo",
      "e": "我叫",
      "eT": "我叫"
     },
     {
      "w": "llamás",
      "e": "你叫",
      "eT": "你叫"
     }
    ]
   },
   {
    "sp": "No, es chiquito y muy ___.",
    "zh": "不大，它很小，而且很讨人喜欢。",
    "zhT": "不大，它很小，而且很討人喜歡。",
    "opts": [
     {
      "w": "simpático",
      "e": "讨人喜欢",
      "eT": "討人喜歡"
     },
     {
      "w": "plaza",
      "e": "公园",
      "eT": "公園"
     },
     {
      "w": "baño",
      "e": "厕所",
      "eT": "廁所"
     }
    ]
   },
   {
    "sp": "Le gusta tomar ___.",
    "zh": "它爱喝牛奶。",
    "zhT": "它愛喝牛奶。",
    "opts": [
     {
      "w": "leche",
      "e": "牛奶",
      "eT": "牛奶"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "Sí, tengo un ___.",
    "zh": "有，我有一只猫。",
    "zhT": "有，我有一隻貓。",
    "opts": [
     {
      "w": "gato",
      "e": "猫",
      "eT": "貓"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     }
    ]
   },
   {
    "sp": "Sofi, ¿___ mascota?",
    "zh": "索菲，你有宠物吗？",
    "zhT": "索菲，你有寵物嗎？",
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
   }
  ]
 },
 {
  "id": "ni-cumple",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 9,
  "order": 10,
  "emoji": "🎂",
  "art": null,
  "titleEs": "¡Feliz cumple!",
  "titleZh": "生日快乐！",
  "titleZhT": "生日快樂！",
  "blurb": "Hoy es el cumple de Sofi: regalo, torta, velitas y un «¡hip, hip, hurra!».",
  "blurbZh": "今天是索菲的生日：礼物、蛋糕、小蜡烛，还有一声“嘿嘿呼啦！”。",
  "blurbZhT": "今天是索菲的生日：禮物、蛋糕、小蠟燭，還有一聲“嘿嘿呼啦！”。",
  "words": [
   {
    "sp": "cumple",
    "zh": "生日",
    "zhT": "生日",
    "emoji": "🎉",
    "art": null
   },
   {
    "sp": "¡feliz cumple!",
    "zh": "生日快乐！",
    "zhT": "生日快樂！",
    "emoji": "🥳",
    "art": null
   },
   {
    "sp": "regalo",
    "zh": "礼物",
    "zhT": "禮物",
    "emoji": "🎁",
    "art": null
   },
   {
    "sp": "torta",
    "zh": "蛋糕",
    "zhT": "蛋糕",
    "emoji": "🎂",
    "art": null
   },
   {
    "sp": "velitas",
    "zh": "小蜡烛",
    "zhT": "小蠟燭",
    "emoji": "🕯️",
    "art": null
   },
   {
    "sp": "siete",
    "zh": "七",
    "zhT": "七",
    "emoji": "7️⃣",
    "art": null
   },
   {
    "sp": "años",
    "zh": "岁",
    "zhT": "歲",
    "emoji": "🎈",
    "art": null
   },
   {
    "sp": "soplá",
    "zh": "吹一吹",
    "zhT": "吹一吹",
    "emoji": "💨",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Sofi",
    "sp": "¡Hoy es mi cumple!",
    "zh": "今天是我的生日！",
    "zhT": "今天是我的生日！"
   },
   {
    "who": "Lin",
    "sp": "¡Feliz cumple, Sofi!",
    "zh": "生日快乐，索菲！",
    "zhT": "生日快樂，索菲！"
   },
   {
    "who": "Lin",
    "sp": "Tomá, es un regalo.",
    "zh": "拿着，这是礼物。",
    "zhT": "拿著，這是禮物。"
   },
   {
    "who": "Sofi",
    "sp": "¡Gracias! Cumplo siete años.",
    "zh": "谢谢！我今天七岁了。",
    "zhT": "謝謝！我今天七歲了。"
   },
   {
    "who": "Seño",
    "sp": "Acá está la torta.",
    "zh": "蛋糕来啦。",
    "zhT": "蛋糕來啦。"
   },
   {
    "who": "Seño",
    "sp": "Tiene siete velitas.",
    "zh": "上面有七根小蜡烛。",
    "zhT": "上面有七根小蠟燭。"
   },
   {
    "who": "Lin",
    "sp": "¡Soplá las velitas!",
    "zh": "吹蜡烛吧！",
    "zhT": "吹蠟燭吧！"
   },
   {
    "who": "Lin",
    "sp": "¡Hip, hip, hurra!",
    "zh": "嘿，嘿，呼啦！",
    "zhT": "嘿，嘿，呼啦！"
   },
   {
    "who": "Sofi",
    "sp": "¡Qué rica torta!",
    "zh": "多好吃的蛋糕啊！",
    "zhT": "多好吃的蛋糕啊！"
   }
  ],
  "listen": [
   {
    "say": "La torta",
    "opts": [
     {
      "emoji": "🎂",
      "sp": "torta",
      "zh": "蛋糕",
      "zhT": "蛋糕",
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
    "say": "Un regalo",
    "opts": [
     {
      "emoji": "🎁",
      "sp": "regalo",
      "zh": "礼物",
      "zhT": "禮物",
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
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     }
    ]
   },
   {
    "say": "Las velitas",
    "opts": [
     {
      "emoji": "🕯️",
      "sp": "velitas",
      "zh": "小蜡烛",
      "zhT": "小蠟燭",
      "art": null
     },
     {
      "emoji": "🥐",
      "sp": "medialunas",
      "zh": "牛角包",
      "zhT": "牛角包",
      "art": null
     },
     {
      "emoji": "👨",
      "sp": "papá",
      "zh": "爸爸",
      "zhT": "爸爸",
      "art": null
     }
    ]
   },
   {
    "say": "Siete",
    "opts": [
     {
      "emoji": "7️⃣",
      "sp": "siete",
      "zh": "七",
      "zhT": "七",
      "art": null
     },
     {
      "emoji": "3️⃣",
      "sp": "tres",
      "zh": "三",
      "zhT": "三",
      "art": null
     },
     {
      "emoji": "4️⃣",
      "sp": "cuatro",
      "zh": "四",
      "zhT": "四",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¡Feliz ___, Sofi!",
    "zh": "生日快乐，索菲！",
    "zhT": "生日快樂，索菲！",
    "opts": [
     {
      "w": "cumple",
      "e": "生日",
      "eT": "生日"
     },
     {
      "w": "plaza",
      "e": "公园",
      "eT": "公園"
     },
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     }
    ]
   },
   {
    "sp": "Tomá, es un ___.",
    "zh": "拿着，这是礼物。",
    "zhT": "拿著，這是禮物。",
    "opts": [
     {
      "w": "regalo",
      "e": "礼物",
      "eT": "禮物"
     },
     {
      "w": "torta",
      "e": "蛋糕",
      "eT": "蛋糕"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "Acá está la ___.",
    "zh": "蛋糕来啦。",
    "zhT": "蛋糕來啦。",
    "opts": [
     {
      "w": "torta",
      "e": "蛋糕",
      "eT": "蛋糕"
     },
     {
      "w": "regalo",
      "e": "礼物",
      "eT": "禮物"
     },
     {
      "w": "lápiz",
      "e": "铅笔",
      "eT": "鉛筆"
     }
    ]
   },
   {
    "sp": "¡Soplá las ___!",
    "zh": "吹蜡烛吧！",
    "zhT": "吹蠟燭吧！",
    "opts": [
     {
      "w": "velitas",
      "e": "小蜡烛",
      "eT": "小蠟燭"
     },
     {
      "w": "regalos",
      "e": "礼物",
      "eT": "禮物"
     },
     {
      "w": "lápices",
      "e": "铅笔",
      "eT": "鉛筆"
     }
    ]
   },
   {
    "sp": "¡Gracias! Cumplo siete ___.",
    "zh": "谢谢！我今天七岁了。",
    "zhT": "謝謝！我今天七歲了。",
    "opts": [
     {
      "w": "años",
      "e": "岁",
      "eT": "歲"
     },
     {
      "w": "tortas",
      "e": "蛋糕",
      "eT": "蛋糕"
     },
     {
      "w": "regalos",
      "e": "礼物",
      "eT": "禮物"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-kiosco",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 10,
  "order": 11,
  "emoji": "🏪",
  "art": null,
  "titleEs": "En el kiosco",
  "titleZh": "在小卖部",
  "titleZhT": "在小賣部",
  "blurb": "Lin va al kiosco con mamá y compra un alfajor de dulce de leche.",
  "blurbZh": "林和妈妈去小卖部，买了一个牛奶焦糖阿尔法霍饼干。",
  "blurbZhT": "林和媽媽去小賣部，買了一個牛奶焦糖阿爾法霍餅乾。",
  "words": [
   {
    "sp": "kiosco",
    "zh": "小卖部",
    "zhT": "小賣部",
    "emoji": "🏪",
    "art": null
   },
   {
    "sp": "alfajor",
    "zh": "阿尔法霍饼干",
    "zhT": "阿爾法霍餅乾",
    "emoji": "🍪",
    "art": null
   },
   {
    "sp": "chocolate",
    "zh": "巧克力",
    "zhT": "巧克力",
    "emoji": "🍫",
    "art": null
   },
   {
    "sp": "dulce de leche",
    "zh": "牛奶焦糖酱",
    "zhT": "牛奶焦糖醬",
    "emoji": "🍮",
    "art": null
   },
   {
    "sp": "por favor",
    "zh": "请",
    "zhT": "請",
    "emoji": "🙏",
    "art": null
   },
   {
    "sp": "¿cuánto sale?",
    "zh": "多少钱？",
    "zhT": "多少錢？",
    "emoji": "💰",
    "art": null
   },
   {
    "sp": "pesos",
    "zh": "比索",
    "zhT": "比索",
    "emoji": "💵",
    "art": null
   },
   {
    "sp": "diez",
    "zh": "十",
    "zhT": "十",
    "emoji": "🔟",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Mamá",
    "sp": "Vamos al kiosco, Lin.",
    "zh": "我们去小卖部吧，林。",
    "zhT": "我們去小賣部吧，林。"
   },
   {
    "who": "Lin",
    "sp": "Hola, quiero un alfajor.",
    "zh": "你好，我想要一个阿尔法霍饼干。",
    "zhT": "你好，我想要一個阿爾法霍餅乾。"
   },
   {
    "who": "Kiosquero",
    "sp": "¿De chocolate o de dulce de leche?",
    "zh": "要巧克力的，还是牛奶焦糖的？",
    "zhT": "要巧克力的，還是牛奶焦糖的？"
   },
   {
    "who": "Lin",
    "sp": "De dulce de leche, por favor.",
    "zh": "请给我牛奶焦糖的。",
    "zhT": "請給我牛奶焦糖的。"
   },
   {
    "who": "Kiosquero",
    "sp": "Acá tenés.",
    "zh": "给你。",
    "zhT": "給你。"
   },
   {
    "who": "Lin",
    "sp": "¿Cuánto sale?",
    "zh": "多少钱？",
    "zhT": "多少錢？"
   },
   {
    "who": "Kiosquero",
    "sp": "Sale diez pesos.",
    "zh": "十比索。",
    "zhT": "十比索。"
   },
   {
    "who": "Mamá",
    "sp": "Tomá, diez pesos.",
    "zh": "拿着，十比索。",
    "zhT": "拿著，十比索。"
   },
   {
    "who": "Kiosquero",
    "sp": "¡Gracias! ¡Chau!",
    "zh": "谢谢！再见！",
    "zhT": "謝謝！再見！"
   }
  ],
  "listen": [
   {
    "say": "El alfajor",
    "opts": [
     {
      "emoji": "🍪",
      "sp": "alfajor",
      "zh": "阿尔法霍饼干",
      "zhT": "阿爾法霍餅乾",
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
    "say": "El kiosco",
    "opts": [
     {
      "emoji": "🏪",
      "sp": "kiosco",
      "zh": "小卖部",
      "zhT": "小賣部",
      "art": null
     },
     {
      "emoji": "🌳",
      "sp": "plaza",
      "zh": "公园",
      "zhT": "公園",
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
    "say": "Chocolate",
    "opts": [
     {
      "emoji": "🍫",
      "sp": "chocolate",
      "zh": "巧克力",
      "zhT": "巧克力",
      "art": null
     },
     {
      "emoji": "🍪",
      "sp": "alfajor",
      "zh": "阿尔法霍饼干",
      "zhT": "阿爾法霍餅乾",
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
    "say": "Diez",
    "opts": [
     {
      "emoji": "🔟",
      "sp": "diez",
      "zh": "十",
      "zhT": "十",
      "art": null
     },
     {
      "emoji": "4️⃣",
      "sp": "cuatro",
      "zh": "四",
      "zhT": "四",
      "art": null
     },
     {
      "emoji": "3️⃣",
      "sp": "tres",
      "zh": "三",
      "zhT": "三",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Vamos al ___, Lin.",
    "zh": "我们去小卖部吧，林。",
    "zhT": "我們去小賣部吧，林。",
    "opts": [
     {
      "w": "kiosco",
      "e": "小卖部",
      "eT": "小賣部"
     },
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     },
     {
      "w": "lápiz",
      "e": "铅笔",
      "eT": "鉛筆"
     }
    ]
   },
   {
    "sp": "Hola, quiero un ___.",
    "zh": "你好，我想要一个阿尔法霍饼干。",
    "zhT": "你好，我想要一個阿爾法霍餅乾。",
    "opts": [
     {
      "w": "alfajor",
      "e": "阿尔法霍饼干",
      "eT": "阿爾法霍餅乾"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     }
    ]
   },
   {
    "sp": "¿De chocolate o de dulce de ___?",
    "zh": "要巧克力的，还是牛奶焦糖的？",
    "zhT": "要巧克力的，還是牛奶焦糖的？",
    "opts": [
     {
      "w": "leche",
      "e": "牛奶",
      "eT": "牛奶"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "¿Cuánto ___?",
    "zh": "多少钱？",
    "zhT": "多少錢？",
    "opts": [
     {
      "w": "sale",
      "e": "（价格）是",
      "eT": "（價格）是"
     },
     {
      "w": "salgo",
      "e": "我出去",
      "eT": "我出去"
     },
     {
      "w": "salís",
      "e": "你出去",
      "eT": "你出去"
     }
    ]
   },
   {
    "sp": "Sale diez ___.",
    "zh": "十比索。",
    "zhT": "十比索。",
    "opts": [
     {
      "w": "pesos",
      "e": "比索",
      "eT": "比索"
     },
     {
      "w": "patios",
      "e": "操场",
      "eT": "操場"
     },
     {
      "w": "mochilas",
      "e": "书包",
      "eT": "書包"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-ropa",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 11,
  "order": 12,
  "emoji": "☔",
  "art": null,
  "titleEs": "Hoy llueve",
  "titleZh": "今天下雨",
  "titleZhT": "今天下雨",
  "blurb": "Antes de ir al cole, mamá ayuda a Lin: guardapolvo, zapatillas, campera y paraguas.",
  "blurbZh": "上学前，妈妈帮林准备：校服罩衫、运动鞋、外套和雨伞。",
  "blurbZhT": "上學前，媽媽幫林準備：校服罩衫、運動鞋、外套和雨傘。",
  "words": [
   {
    "sp": "hoy",
    "zh": "今天",
    "zhT": "今天",
    "emoji": "📅",
    "art": null
   },
   {
    "sp": "llueve",
    "zh": "下雨",
    "zhT": "下雨",
    "emoji": "🌧️",
    "art": null
   },
   {
    "sp": "hace frío",
    "zh": "天气冷",
    "zhT": "天氣冷",
    "emoji": "🥶",
    "art": null
   },
   {
    "sp": "llevá",
    "zh": "带上",
    "zhT": "帶上",
    "emoji": "🧳",
    "art": null
   },
   {
    "sp": "ponete",
    "zh": "穿上",
    "zhT": "穿上",
    "emoji": "👚",
    "art": null
   },
   {
    "sp": "guardapolvo",
    "zh": "校服罩衫",
    "zhT": "校服罩衫",
    "emoji": "🥼",
    "art": null
   },
   {
    "sp": "zapatillas",
    "zh": "运动鞋",
    "zhT": "運動鞋",
    "emoji": "👟",
    "art": null
   },
   {
    "sp": "paraguas",
    "zh": "雨伞",
    "zhT": "雨傘",
    "emoji": "☂️",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Mamá",
    "sp": "Hoy llueve, Lin.",
    "zh": "今天下雨，林。",
    "zhT": "今天下雨，林。"
   },
   {
    "who": "Lin",
    "sp": "¿Hace frío?",
    "zh": "冷吗？",
    "zhT": "冷嗎？"
   },
   {
    "who": "Mamá",
    "sp": "Sí, hace frío. Llevá la campera.",
    "zh": "冷，带上外套。",
    "zhT": "冷，帶上外套。"
   },
   {
    "who": "Mamá",
    "sp": "Ponete el guardapolvo y las zapatillas.",
    "zh": "穿上校服罩衫和运动鞋。",
    "zhT": "穿上校服罩衫和運動鞋。"
   },
   {
    "who": "Lin",
    "sp": "¿Y el paraguas?",
    "zh": "那雨伞呢？",
    "zhT": "那雨傘呢？"
   },
   {
    "who": "Mamá",
    "sp": "Acá está, en la mochila.",
    "zh": "在这里，在书包里。",
    "zhT": "在這裡，在書包裡。"
   },
   {
    "who": "Lin",
    "sp": "Gracias, mamá. ¡Chau!",
    "zh": "谢谢妈妈。再见！",
    "zhT": "謝謝媽媽。再見！"
   },
   {
    "who": "Mamá",
    "sp": "¡Chau! ¡Portate bien!",
    "zh": "再见！要乖哦！",
    "zhT": "再見！要乖哦！"
   }
  ],
  "listen": [
   {
    "say": "El guardapolvo",
    "opts": [
     {
      "emoji": "🥼",
      "sp": "guardapolvo",
      "zh": "校服罩衫",
      "zhT": "校服罩衫",
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
      "emoji": "🎒",
      "sp": "mochila",
      "zh": "书包",
      "zhT": "書包",
      "art": null
     }
    ]
   },
   {
    "say": "Las zapatillas",
    "opts": [
     {
      "emoji": "👟",
      "sp": "zapatillas",
      "zh": "运动鞋",
      "zhT": "運動鞋",
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
      "emoji": "✏️",
      "sp": "lápiz",
      "zh": "铅笔",
      "zhT": "鉛筆",
      "art": null
     }
    ]
   },
   {
    "say": "El paraguas",
    "opts": [
     {
      "emoji": "☂️",
      "sp": "paraguas",
      "zh": "雨伞",
      "zhT": "雨傘",
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
      "emoji": "🐱",
      "sp": "gato",
      "zh": "猫",
      "zhT": "貓",
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
      "emoji": "👟",
      "sp": "zapatillas",
      "zh": "运动鞋",
      "zhT": "運動鞋",
      "art": null
     },
     {
      "emoji": "👨",
      "sp": "papá",
      "zh": "爸爸",
      "zhT": "爸爸",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Hoy ___, Lin.",
    "zh": "今天下雨，林。",
    "zhT": "今天下雨，林。",
    "opts": [
     {
      "w": "llueve",
      "e": "下雨",
      "eT": "下雨"
     },
     {
      "w": "llevo",
      "e": "我带",
      "eT": "我帶"
     },
     {
      "w": "llama",
      "e": "叫",
      "eT": "叫"
     }
    ]
   },
   {
    "sp": "Sí, hace frío. Llevá la ___.",
    "zh": "冷，带上外套。",
    "zhT": "冷，帶上外套。",
    "opts": [
     {
      "w": "campera",
      "e": "外套",
      "eT": "外套"
     },
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     },
     {
      "w": "lápiz",
      "e": "铅笔",
      "eT": "鉛筆"
     }
    ]
   },
   {
    "sp": "Ponete el ___ y las zapatillas.",
    "zh": "穿上校服罩衫和运动鞋。",
    "zhT": "穿上校服罩衫和運動鞋。",
    "opts": [
     {
      "w": "guardapolvo",
      "e": "校服罩衫",
      "eT": "校服罩衫"
     },
     {
      "w": "campera",
      "e": "外套",
      "eT": "外套"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "¿Y el ___?",
    "zh": "那雨伞呢？",
    "zhT": "那雨傘呢？",
    "opts": [
     {
      "w": "paraguas",
      "e": "雨伞",
      "eT": "雨傘"
     },
     {
      "w": "campera",
      "e": "外套",
      "eT": "外套"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "Acá está, en la ___.",
    "zh": "在这里，在书包里。",
    "zhT": "在這裡，在書包裡。",
    "opts": [
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     },
     {
      "w": "paraguas",
      "e": "雨伞",
      "eT": "雨傘"
     },
     {
      "w": "guardapolvo",
      "e": "校服罩衫",
      "eT": "校服罩衫"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-cuerpo",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 12,
  "order": 13,
  "emoji": "🙌",
  "art": null,
  "titleEs": "Simón dice",
  "titleZh": "西蒙说",
  "titleZhT": "西蒙說",
  "blurb": "En gimnasia, la seño juega a «Simón dice»: cabeza, manos, pies, ojos y nariz.",
  "blurbZh": "体育课上，老师带大家玩“西蒙说”：头、手、脚、眼睛和鼻子。",
  "blurbZhT": "體育課上，老師帶大家玩“西蒙說”：頭、手、腳、眼睛和鼻子。",
  "words": [
   {
    "sp": "Simón dice",
    "zh": "西蒙说",
    "zhT": "西蒙說",
    "emoji": "🗣️",
    "art": null
   },
   {
    "sp": "cabeza",
    "zh": "头",
    "zhT": "頭",
    "emoji": "😃",
    "art": null
   },
   {
    "sp": "manos",
    "zh": "手",
    "zhT": "手",
    "emoji": "🙌",
    "art": null
   },
   {
    "sp": "pies",
    "zh": "脚",
    "zhT": "腳",
    "emoji": "🦶",
    "art": null
   },
   {
    "sp": "ojos",
    "zh": "眼睛",
    "zhT": "眼睛",
    "emoji": "👀",
    "art": null
   },
   {
    "sp": "nariz",
    "zh": "鼻子",
    "zhT": "鼻子",
    "emoji": "👃",
    "art": null
   },
   {
    "sp": "arriba",
    "zh": "上面；向上",
    "zhT": "上面；向上",
    "emoji": "⬆️",
    "art": null
   },
   {
    "sp": "¡qué risa!",
    "zh": "真好笑！",
    "zhT": "真好笑！",
    "emoji": "😂",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Seño",
    "sp": "¡Jugamos a Simón dice!",
    "zh": "我们来玩“西蒙说”！",
    "zhT": "我們來玩“西蒙說”！"
   },
   {
    "who": "Seño",
    "sp": "Simón dice: ¡tocá la cabeza!",
    "zh": "西蒙说：摸摸头！",
    "zhT": "西蒙說：摸摸頭！"
   },
   {
    "who": "Lin",
    "sp": "¡Acá está mi cabeza!",
    "zh": "这是我的头！",
    "zhT": "這是我的頭！"
   },
   {
    "who": "Seño",
    "sp": "Simón dice: ¡manos arriba!",
    "zh": "西蒙说：举起手来！",
    "zhT": "西蒙說：舉起手來！"
   },
   {
    "who": "Seño",
    "sp": "Simón dice: ¡tocá los pies!",
    "zh": "西蒙说：摸摸脚！",
    "zhT": "西蒙說：摸摸腳！"
   },
   {
    "who": "Seño",
    "sp": "Simón dice: ¡tocá los ojos!",
    "zh": "西蒙说：摸摸眼睛！",
    "zhT": "西蒙說：摸摸眼睛！"
   },
   {
    "who": "Seño",
    "sp": "¡Tocá la nariz!",
    "zh": "摸摸鼻子！",
    "zhT": "摸摸鼻子！"
   },
   {
    "who": "Seño",
    "sp": "¡Uy! Simón no dijo.",
    "zh": "哎呀！西蒙没说。",
    "zhT": "哎呀！西蒙沒說。"
   },
   {
    "who": "Lin",
    "sp": "¡Ay, qué risa!",
    "zh": "哎呀，真好笑！",
    "zhT": "哎呀，真好笑！"
   }
  ],
  "listen": [
   {
    "say": "La cabeza",
    "opts": [
     {
      "emoji": "😃",
      "sp": "cabeza",
      "zh": "头",
      "zhT": "頭",
      "art": null
     },
     {
      "emoji": "👃",
      "sp": "nariz",
      "zh": "鼻子",
      "zhT": "鼻子",
      "art": null
     },
     {
      "emoji": "🦶",
      "sp": "pies",
      "zh": "脚",
      "zhT": "腳",
      "art": null
     }
    ]
   },
   {
    "say": "Los pies",
    "opts": [
     {
      "emoji": "🦶",
      "sp": "pies",
      "zh": "脚",
      "zhT": "腳",
      "art": null
     },
     {
      "emoji": "🙌",
      "sp": "manos",
      "zh": "手",
      "zhT": "手",
      "art": null
     },
     {
      "emoji": "👀",
      "sp": "ojos",
      "zh": "眼睛",
      "zhT": "眼睛",
      "art": null
     }
    ]
   },
   {
    "say": "La nariz",
    "opts": [
     {
      "emoji": "👃",
      "sp": "nariz",
      "zh": "鼻子",
      "zhT": "鼻子",
      "art": null
     },
     {
      "emoji": "😃",
      "sp": "cabeza",
      "zh": "头",
      "zhT": "頭",
      "art": null
     },
     {
      "emoji": "👀",
      "sp": "ojos",
      "zh": "眼睛",
      "zhT": "眼睛",
      "art": null
     }
    ]
   },
   {
    "say": "Los ojos",
    "opts": [
     {
      "emoji": "👀",
      "sp": "ojos",
      "zh": "眼睛",
      "zhT": "眼睛",
      "art": null
     },
     {
      "emoji": "🙌",
      "sp": "manos",
      "zh": "手",
      "zhT": "手",
      "art": null
     },
     {
      "emoji": "😃",
      "sp": "cabeza",
      "zh": "头",
      "zhT": "頭",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "Simón dice: ¡tocá la ___!",
    "zh": "西蒙说：摸摸头！",
    "zhT": "西蒙說：摸摸頭！",
    "opts": [
     {
      "w": "cabeza",
      "e": "头",
      "eT": "頭"
     },
     {
      "w": "pies",
      "e": "脚",
      "eT": "腳"
     },
     {
      "w": "ojos",
      "e": "眼睛",
      "eT": "眼睛"
     }
    ]
   },
   {
    "sp": "Simón dice: ¡tocá los ___!",
    "zh": "西蒙说：摸摸脚！",
    "zhT": "西蒙說：摸摸腳！",
    "opts": [
     {
      "w": "pies",
      "e": "脚",
      "eT": "腳"
     },
     {
      "w": "cabeza",
      "e": "头",
      "eT": "頭"
     },
     {
      "w": "nariz",
      "e": "鼻子",
      "eT": "鼻子"
     }
    ]
   },
   {
    "sp": "Simón dice: ¡tocá los ___!",
    "zh": "西蒙说：摸摸眼睛！",
    "zhT": "西蒙說：摸摸眼睛！",
    "opts": [
     {
      "w": "ojos",
      "e": "眼睛",
      "eT": "眼睛"
     },
     {
      "w": "nariz",
      "e": "鼻子",
      "eT": "鼻子"
     },
     {
      "w": "cabeza",
      "e": "头",
      "eT": "頭"
     }
    ]
   },
   {
    "sp": "¡Tocá la ___!",
    "zh": "摸摸鼻子！",
    "zhT": "摸摸鼻子！",
    "opts": [
     {
      "w": "nariz",
      "e": "鼻子",
      "eT": "鼻子"
     },
     {
      "w": "pies",
      "e": "脚",
      "eT": "腳"
     },
     {
      "w": "manos",
      "e": "手",
      "eT": "手"
     }
    ]
   },
   {
    "sp": "¡Jugamos a Simón ___!",
    "zh": "我们来玩“西蒙说”！",
    "zhT": "我們來玩“西蒙說”！",
    "opts": [
     {
      "w": "dice",
      "e": "说",
      "eT": "說"
     },
     {
      "w": "come",
      "e": "吃",
      "eT": "吃"
     },
     {
      "w": "duerme",
      "e": "睡觉",
      "eT": "睡覺"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-almuerzo",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "B",
  "unit": 13,
  "order": 14,
  "emoji": "🍽️",
  "art": null,
  "titleEs": "¡A comer!",
  "titleZh": "吃饭啦！",
  "titleZhT": "吃飯啦！",
  "blurb": "Hora del almuerzo en casa: milanesa con puré, ensalada, agua y postre.",
  "blurbZh": "在家吃午饭：炸肉排配土豆泥、沙拉、水和甜点。",
  "blurbZhT": "在家吃午飯：炸肉排配土豆泥、沙拉、水和甜點。",
  "words": [
   {
    "sp": "¡a comer!",
    "zh": "吃饭啦！",
    "zhT": "吃飯啦！",
    "emoji": "🍽️",
    "art": null
   },
   {
    "sp": "¿qué hay de comer?",
    "zh": "有什么吃的？",
    "zhT": "有什麼吃的？",
    "emoji": "❓",
    "art": null
   },
   {
    "sp": "milanesa",
    "zh": "炸肉排",
    "zhT": "炸肉排",
    "emoji": "🥩",
    "art": null
   },
   {
    "sp": "puré",
    "zh": "土豆泥",
    "zhT": "土豆泥",
    "emoji": "🥔",
    "art": null
   },
   {
    "sp": "ensalada",
    "zh": "沙拉",
    "zhT": "沙拉",
    "emoji": "🥗",
    "art": null
   },
   {
    "sp": "tenedor",
    "zh": "叉子",
    "zhT": "叉子",
    "emoji": "🍴",
    "art": null
   },
   {
    "sp": "postre",
    "zh": "甜点",
    "zhT": "甜點",
    "emoji": "🍨",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Mamá",
    "sp": "¡Lin, a comer!",
    "zh": "林，吃饭啦！",
    "zhT": "林，吃飯啦！"
   },
   {
    "who": "Lin",
    "sp": "¿Qué hay de comer?",
    "zh": "有什么吃的？",
    "zhT": "有什麼吃的？"
   },
   {
    "who": "Mamá",
    "sp": "Hay milanesa con puré.",
    "zh": "有炸肉排配土豆泥。",
    "zhT": "有炸肉排配土豆泥。"
   },
   {
    "who": "Lin",
    "sp": "¡Qué rico! ¿Hay ensalada?",
    "zh": "真好吃！有沙拉吗？",
    "zhT": "真好吃！有沙拉嗎？"
   },
   {
    "who": "Mamá",
    "sp": "Sí. Tomá el tenedor, Lin.",
    "zh": "有的。拿着叉子，林。",
    "zhT": "有的。拿著叉子，林。"
   },
   {
    "who": "Lin",
    "sp": "¡Mmm, la milanesa está rica!",
    "zh": "嗯，炸肉排真香！",
    "zhT": "嗯，炸肉排真香！"
   },
   {
    "who": "Mamá",
    "sp": "¿Querés agua o jugo?",
    "zh": "你想喝水还是果汁？",
    "zhT": "你想喝水還是果汁？"
   },
   {
    "who": "Lin",
    "sp": "Agua, por favor.",
    "zh": "请给我水。",
    "zhT": "請給我水。"
   },
   {
    "who": "Mamá",
    "sp": "Después hay postre.",
    "zh": "一会儿还有甜点。",
    "zhT": "一會兒還有甜點。"
   }
  ],
  "listen": [
   {
    "say": "La milanesa",
    "opts": [
     {
      "emoji": "🥩",
      "sp": "milanesa",
      "zh": "炸肉排",
      "zhT": "炸肉排",
      "art": null
     },
     {
      "emoji": "🥗",
      "sp": "ensalada",
      "zh": "沙拉",
      "zhT": "沙拉",
      "art": null
     },
     {
      "emoji": "🍴",
      "sp": "tenedor",
      "zh": "叉子",
      "zhT": "叉子",
      "art": null
     }
    ]
   },
   {
    "say": "La ensalada",
    "opts": [
     {
      "emoji": "🥗",
      "sp": "ensalada",
      "zh": "沙拉",
      "zhT": "沙拉",
      "art": null
     },
     {
      "emoji": "🥔",
      "sp": "puré",
      "zh": "土豆泥",
      "zhT": "土豆泥",
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
    "say": "El tenedor",
    "opts": [
     {
      "emoji": "🍴",
      "sp": "tenedor",
      "zh": "叉子",
      "zhT": "叉子",
      "art": null
     },
     {
      "emoji": "🥩",
      "sp": "milanesa",
      "zh": "炸肉排",
      "zhT": "炸肉排",
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
    "say": "El postre",
    "opts": [
     {
      "emoji": "🍨",
      "sp": "postre",
      "zh": "甜点",
      "zhT": "甜點",
      "art": null
     },
     {
      "emoji": "🥔",
      "sp": "puré",
      "zh": "土豆泥",
      "zhT": "土豆泥",
      "art": null
     },
     {
      "emoji": "🍴",
      "sp": "tenedor",
      "zh": "叉子",
      "zhT": "叉子",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¡Lin, a ___!",
    "zh": "林，吃饭啦！",
    "zhT": "林，吃飯啦！",
    "opts": [
     {
      "w": "comer",
      "e": "吃饭",
      "eT": "吃飯"
     },
     {
      "w": "plaza",
      "e": "公园",
      "eT": "公園"
     },
     {
      "w": "lápiz",
      "e": "铅笔",
      "eT": "鉛筆"
     }
    ]
   },
   {
    "sp": "Hay milanesa con ___.",
    "zh": "有炸肉排配土豆泥。",
    "zhT": "有炸肉排配土豆泥。",
    "opts": [
     {
      "w": "puré",
      "e": "土豆泥",
      "eT": "土豆泥"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     }
    ]
   },
   {
    "sp": "Sí. Tomá el ___, Lin.",
    "zh": "有的。拿着叉子，林。",
    "zhT": "有的。拿著叉子，林。",
    "opts": [
     {
      "w": "tenedor",
      "e": "叉子",
      "eT": "叉子"
     },
     {
      "w": "ensalada",
      "e": "沙拉",
      "eT": "沙拉"
     },
     {
      "w": "milanesa",
      "e": "炸肉排",
      "eT": "炸肉排"
     }
    ]
   },
   {
    "sp": "¿Querés agua o ___?",
    "zh": "你想喝水还是果汁？",
    "zhT": "你想喝水還是果汁？",
    "opts": [
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "plaza",
      "e": "公园",
      "eT": "公園"
     }
    ]
   },
   {
    "sp": "Después hay ___.",
    "zh": "一会儿还有甜点。",
    "zhT": "一會兒還有甜點。",
    "opts": [
     {
      "w": "postre",
      "e": "甜点",
      "eT": "甜點"
     },
     {
      "w": "mochila",
      "e": "书包",
      "eT": "書包"
     },
     {
      "w": "baño",
      "e": "厕所",
      "eT": "廁所"
     }
    ]
   }
  ]
 },
 {
  "id": "ni-dias",
  "track": "Niños",
  "dele": "A1",
  "kid": true,
  "band": "A",
  "unit": 14,
  "order": 15,
  "emoji": "📅",
  "art": null,
  "titleEs": "¿Qué día es hoy?",
  "titleZh": "今天星期几？",
  "titleZhT": "今天星期幾？",
  "blurb": "La seño pregunta por los días de la semana: cinco días de cole y el fin de semana para jugar.",
  "blurbZh": "老师问起星期几：上学五天，周末可以玩。",
  "blurbZhT": "老師問起星期幾：上學五天，週末可以玩。",
  "words": [
   {
    "sp": "¿qué día es hoy?",
    "zh": "今天星期几？",
    "zhT": "今天星期幾？",
    "emoji": "📅",
    "art": null
   },
   {
    "sp": "lunes",
    "zh": "星期一",
    "zhT": "星期一",
    "emoji": "🟥",
    "art": null
   },
   {
    "sp": "martes",
    "zh": "星期二",
    "zhT": "星期二",
    "emoji": "🟧",
    "art": null
   },
   {
    "sp": "miércoles",
    "zh": "星期三",
    "zhT": "星期三",
    "emoji": "🟨",
    "art": null
   },
   {
    "sp": "jueves",
    "zh": "星期四",
    "zhT": "星期四",
    "emoji": "🟩",
    "art": null
   },
   {
    "sp": "viernes",
    "zh": "星期五",
    "zhT": "星期五",
    "emoji": "🟦",
    "art": null
   },
   {
    "sp": "sábado",
    "zh": "星期六",
    "zhT": "星期六",
    "emoji": "🟪",
    "art": null
   },
   {
    "sp": "domingo",
    "zh": "星期天",
    "zhT": "星期天",
    "emoji": "⬜",
    "art": null
   }
  ],
  "lines": [
   {
    "who": "Seño",
    "sp": "¿Qué día es hoy?",
    "zh": "今天星期几？",
    "zhT": "今天星期幾？"
   },
   {
    "who": "Sofi",
    "sp": "Hoy es lunes.",
    "zh": "今天是星期一。",
    "zhT": "今天是星期一。"
   },
   {
    "who": "Seño",
    "sp": "¡Muy bien, Sofi!",
    "zh": "说得好，索菲！",
    "zhT": "說得好，索菲！"
   },
   {
    "who": "Lin",
    "sp": "Lunes, martes, miércoles.",
    "zh": "星期一、星期二、星期三。",
    "zhT": "星期一、星期二、星期三。"
   },
   {
    "who": "Sofi",
    "sp": "Jueves, viernes.",
    "zh": "星期四、星期五。",
    "zhT": "星期四、星期五。"
   },
   {
    "who": "Seño",
    "sp": "¡Cinco días de cole!",
    "zh": "上学五天！",
    "zhT": "上學五天！"
   },
   {
    "who": "Lin",
    "sp": "Sábado y domingo: ¡a jugar!",
    "zh": "星期六和星期天：去玩吧！",
    "zhT": "星期六和星期天：去玩吧！"
   },
   {
    "who": "Sofi",
    "sp": "¡Qué lindo, el domingo!",
    "zh": "星期天真好！",
    "zhT": "星期天真好！"
   }
  ],
  "listen": [
   {
    "say": "Lunes",
    "opts": [
     {
      "emoji": "🟥",
      "sp": "lunes",
      "zh": "星期一",
      "zhT": "星期一",
      "art": null
     },
     {
      "emoji": "🟧",
      "sp": "martes",
      "zh": "星期二",
      "zhT": "星期二",
      "art": null
     },
     {
      "emoji": "⬜",
      "sp": "domingo",
      "zh": "星期天",
      "zhT": "星期天",
      "art": null
     }
    ]
   },
   {
    "say": "Viernes",
    "opts": [
     {
      "emoji": "🟦",
      "sp": "viernes",
      "zh": "星期五",
      "zhT": "星期五",
      "art": null
     },
     {
      "emoji": "🟩",
      "sp": "jueves",
      "zh": "星期四",
      "zhT": "星期四",
      "art": null
     },
     {
      "emoji": "🟪",
      "sp": "sábado",
      "zh": "星期六",
      "zhT": "星期六",
      "art": null
     }
    ]
   },
   {
    "say": "Sábado",
    "opts": [
     {
      "emoji": "🟪",
      "sp": "sábado",
      "zh": "星期六",
      "zhT": "星期六",
      "art": null
     },
     {
      "emoji": "🟥",
      "sp": "lunes",
      "zh": "星期一",
      "zhT": "星期一",
      "art": null
     },
     {
      "emoji": "🟦",
      "sp": "viernes",
      "zh": "星期五",
      "zhT": "星期五",
      "art": null
     }
    ]
   },
   {
    "say": "Domingo",
    "opts": [
     {
      "emoji": "⬜",
      "sp": "domingo",
      "zh": "星期天",
      "zhT": "星期天",
      "art": null
     },
     {
      "emoji": "🟨",
      "sp": "miércoles",
      "zh": "星期三",
      "zhT": "星期三",
      "art": null
     },
     {
      "emoji": "🟧",
      "sp": "martes",
      "zh": "星期二",
      "zhT": "星期二",
      "art": null
     }
    ]
   }
  ],
  "quiz": [
   {
    "sp": "¿Qué ___ es hoy?",
    "zh": "今天星期几？",
    "zhT": "今天星期幾？",
    "opts": [
     {
      "w": "día",
      "e": "天",
      "eT": "天"
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
   },
   {
    "sp": "Lunes, martes, ___.",
    "zh": "星期一、星期二、星期三。",
    "zhT": "星期一、星期二、星期三。",
    "opts": [
     {
      "w": "miércoles",
      "e": "星期三",
      "eT": "星期三"
     },
     {
      "w": "viernes",
      "e": "星期五",
      "eT": "星期五"
     },
     {
      "w": "domingo",
      "e": "星期天",
      "eT": "星期天"
     }
    ]
   },
   {
    "sp": "Jueves, ___.",
    "zh": "星期四、星期五。",
    "zhT": "星期四、星期五。",
    "opts": [
     {
      "w": "viernes",
      "e": "星期五",
      "eT": "星期五"
     },
     {
      "w": "lunes",
      "e": "星期一",
      "eT": "星期一"
     },
     {
      "w": "domingo",
      "e": "星期天",
      "eT": "星期天"
     }
    ]
   },
   {
    "sp": "¡Cinco días de ___!",
    "zh": "上学五天！",
    "zhT": "上學五天！",
    "opts": [
     {
      "w": "cole",
      "e": "学校",
      "eT": "學校"
     },
     {
      "w": "pelota",
      "e": "球",
      "eT": "球"
     },
     {
      "w": "jugo",
      "e": "果汁",
      "eT": "果汁"
     }
    ]
   },
   {
    "sp": "Sábado y ___: ¡a jugar!",
    "zh": "星期六和星期天：去玩吧！",
    "zhT": "星期六和星期天：去玩吧！",
    "opts": [
     {
      "w": "domingo",
      "e": "星期天",
      "eT": "星期天"
     },
     {
      "w": "martes",
      "e": "星期二",
      "eT": "星期二"
     },
     {
      "w": "jueves",
      "e": "星期四",
      "eT": "星期四"
     }
    ]
   }
  ]
 }
];
