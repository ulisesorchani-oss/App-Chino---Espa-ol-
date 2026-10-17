// ============================================================
// ninos-sonidos.js — «Sonidos del español» para NIÑOS de habla china (español rioplatense)
// ------------------------------------------------------------
// Compara letras y sonidos del español con el pinyin que los chicos ya conocen (h, j, ll/y, rr, ñ, z/c/s, qu, v/b, vocales).
// Datos: una tarjeta por sonido { id, order, letters, emoji, art, pat, titleEs, titleZh(T), ruleZh(T), words[{ sp, emoji, zh(T), like, art }] }
//   · like: cómo suena la palabra escrita con pinyin SIN tonos (aproximación para recordar; no es una regla)
//   · pat: expresión regular que cumplen todas las palabras de la tarjeta (la verifica tools/check-ninos.js)
//   · art: gráfico futuro { src, alt } (null hoy: se usa el emoji)
//   · listen: 1 ítem «Escuchá y tocá» por tarjeta (opts[0] = correcta)
// La pantalla está en ninos-ui.js (tarjeta «🔊 Sonidos del español» al final de la lista de Niños).
// Sin grabación de voz: el audio sale del mismo motor de las lecciones (solo se envía el texto de la palabra).
// IMPORTANTE: contenido delicado (sheísmo rioplatense, aproximaciones con pinyin). Pendiente de revisión por un
// docente argentino y por un hablante nativo de chino; no verificado con el audio del servidor de voz.
// ============================================================
window.NINOS_SONIDOS = {
 "id": "ni-sonidos",
 "titleEs": "Sonidos del español",
 "titleZh": "西班牙语的发音",
 "titleZhT": "西班牙語的發音",
 "emoji": "🔊",
 "art": null,
 "blurbZh": "你已经会拼音了！这里比较西班牙语和拼音：哪些一样，哪些不一样。点一点单词，听阿根廷的发音。",
 "blurbZhT": "你已經會拼音了！這裡比較西班牙語和拼音：哪些一樣，哪些不一樣。點一點單詞，聽阿根廷的發音。",
 "noteZh": "“≈” 后面的拼音只是帮你记，不是准确的读音。多听多模仿，每天 5 分钟就好。",
 "noteZhT": "“≈” 後面的拼音只是幫你記，不是準確的讀音。多聽多模仿，每天 5 分鐘就好。",
 "cards": [
  {
   "id": "so-vocales",
   "order": 1,
   "letters": "A E I O U",
   "emoji": "🅰️",
   "art": null,
   "pat": "[aeiou]",
   "titleEs": "Cinco vocales",
   "titleZh": "五个元音",
   "titleZhT": "五個元音",
   "ruleZh": "西班牙语只有 5 个元音：a e i o u。每个都读得清楚、干净，没有声调，也没有 ü。注意：e 像“诶”的开头，不是拼音的 e（ē）。",
   "ruleZhT": "西班牙語只有 5 個元音：a e i o u。每個都讀得清楚、乾淨，沒有聲調，也沒有 ü。注意：e 像“誒”的開頭，不是拼音的 e（ē）。",
   "words": [
    {
     "sp": "mamá",
     "emoji": "👩",
     "zh": "妈妈",
     "zhT": "媽媽",
     "like": "ma-ma",
     "art": null
    },
    {
     "sp": "mesa",
     "emoji": "🪑",
     "zh": "桌子",
     "zhT": "桌子",
     "like": "mei-sa",
     "art": null
    },
    {
     "sp": "isla",
     "emoji": "🏝️",
     "zh": "岛",
     "zhT": "島",
     "like": "is-la",
     "art": null
    },
    {
     "sp": "oso",
     "emoji": "🐻",
     "zh": "熊",
     "zhT": "熊",
     "like": "o-so",
     "art": null
    },
    {
     "sp": "uva",
     "emoji": "🍇",
     "zh": "葡萄",
     "zhT": "葡萄",
     "like": "u-ba",
     "art": null
    }
   ]
  },
  {
   "id": "so-h",
   "order": 2,
   "letters": "H h",
   "emoji": "🤫",
   "art": null,
   "pat": "h",
   "titleEs": "La H no suena",
   "titleZh": "h 不发音",
   "titleZhT": "h 不發音",
   "ruleZh": "拼音里的 h 要发音（比如 hǎo）。西班牙语的 h 是“哑巴”，不发音：hola 读成“ola”。",
   "ruleZhT": "拼音裡的 h 要發音（比如 hǎo）。西班牙語的 h 是“啞巴”，不發音：hola 讀成“ola”。",
   "words": [
    {
     "sp": "hola",
     "emoji": "👋",
     "zh": "你好",
     "zhT": "你好",
     "like": "o-la",
     "art": null
    },
    {
     "sp": "helado",
     "emoji": "🍦",
     "zh": "冰淇淋",
     "zhT": "冰淇淋",
     "like": "e-la-do",
     "art": null
    },
    {
     "sp": "huevo",
     "emoji": "🥚",
     "zh": "鸡蛋",
     "zhT": "雞蛋",
     "like": "ue-bo",
     "art": null
    },
    {
     "sp": "hormiga",
     "emoji": "🐜",
     "zh": "蚂蚁",
     "zhT": "螞蟻",
     "like": "or-mi-ga",
     "art": null
    }
   ]
  },
  {
   "id": "so-j",
   "order": 3,
   "letters": "J j",
   "emoji": "🧃",
   "art": null,
   "pat": "j",
   "titleEs": "La J suena como la H del pinyin",
   "titleZh": "j 像拼音的 h",
   "titleZhT": "j 像拼音的 h",
   "ruleZh": "西班牙语的 j 和拼音的 h（比如 hǎo）很像：jugo 听起来像“hu-go”。别把它读成拼音的 j（jī）！",
   "ruleZhT": "西班牙語的 j 和拼音的 h（比如 hǎo）很像：jugo 聽起來像“hu-go”。別把它讀成拼音的 j（jī）！",
   "words": [
    {
     "sp": "jugo",
     "emoji": "🧃",
     "zh": "果汁",
     "zhT": "果汁",
     "like": "hu-go",
     "art": null
    },
    {
     "sp": "jirafa",
     "emoji": "🦒",
     "zh": "长颈鹿",
     "zhT": "長頸鹿",
     "like": "hi-ra-fa",
     "art": null
    },
    {
     "sp": "naranja",
     "emoji": "🍊",
     "zh": "橙子",
     "zhT": "橙子",
     "like": "na-ran-ha",
     "art": null
    },
    {
     "sp": "ojo",
     "emoji": "👁️",
     "zh": "眼睛",
     "zhT": "眼睛",
     "like": "o-ho",
     "art": null
    }
   ]
  },
  {
   "id": "so-ll",
   "order": 4,
   "letters": "LL ll · Y y",
   "emoji": "🌧️",
   "art": null,
   "pat": "ll|y",
   "titleEs": "LL e Y en Argentina",
   "titleZh": "阿根廷的 ll 和 y",
   "titleZhT": "阿根廷的 ll 和 y",
   "ruleZh": "在阿根廷，ll 和 y 听起来像拼音的“sh”：lluvia 像“shu-bia”，pollo 像“po-sho”。这是阿根廷的特色，别的国家可能不一样。",
   "ruleZhT": "在阿根廷，ll 和 y 聽起來像拼音的“sh”：lluvia 像“shu-bia”，pollo 像“po-sho”。這是阿根廷的特色，別的國家可能不一樣。",
   "words": [
    {
     "sp": "lluvia",
     "emoji": "🌧️",
     "zh": "下雨",
     "zhT": "下雨",
     "like": "shu-bia",
     "art": null
    },
    {
     "sp": "pollo",
     "emoji": "🍗",
     "zh": "鸡肉",
     "zhT": "雞肉",
     "like": "po-sho",
     "art": null
    },
    {
     "sp": "playa",
     "emoji": "🏖️",
     "zh": "海滩",
     "zhT": "海灘",
     "like": "pla-sha",
     "art": null
    },
    {
     "sp": "calle",
     "emoji": "🛣️",
     "zh": "街道",
     "zhT": "街道",
     "like": "ka-she",
     "art": null
    }
   ]
  },
  {
   "id": "so-rr",
   "order": 5,
   "letters": "RR rr · R",
   "emoji": "🐶",
   "art": null,
   "pat": "rr|^r",
   "titleEs": "La RR vibra",
   "titleZh": "rr 要颤动舌头",
   "titleZhT": "rr 要顫動舌頭",
   "ruleZh": "rr（还有词首的 r）要让舌尖快速颤动，像小马达“嘟噜噜”。拼音里没有这个音，要慢慢练，不着急。",
   "ruleZhT": "rr（還有詞首的 r）要讓舌尖快速顫動，像小馬達“嘟嚕嚕”。拼音裡沒有這個音，要慢慢練，不著急。",
   "words": [
    {
     "sp": "perro",
     "emoji": "🐶",
     "zh": "狗",
     "zhT": "狗",
     "like": null,
     "art": null
    },
    {
     "sp": "rojo",
     "emoji": "🔴",
     "zh": "红色",
     "zhT": "紅色",
     "like": null,
     "art": null
    },
    {
     "sp": "ratón",
     "emoji": "🐭",
     "zh": "老鼠",
     "zhT": "老鼠",
     "like": null,
     "art": null
    },
    {
     "sp": "carro",
     "emoji": "🚗",
     "zh": "汽车",
     "zhT": "汽車",
     "like": null,
     "art": null
    }
   ]
  },
  {
   "id": "so-n",
   "order": 6,
   "letters": "Ñ ñ",
   "emoji": "🧒",
   "art": null,
   "pat": "ñ",
   "titleEs": "La Ñ",
   "titleZh": "ñ 的读法",
   "titleZhT": "ñ 的讀法",
   "ruleZh": "ñ 像把“n”和“y”连在一起读：舌头贴着上颚，像拼音的“你”（nǐ）开头，再轻轻滑出去：niño ≈ “ni-nyo”。",
   "ruleZhT": "ñ 像把“n”和“y”連在一起讀：舌頭貼著上顎，像拼音的“你”（nǐ）開頭，再輕輕滑出去：niño ≈ “ni-nyo”。",
   "words": [
    {
     "sp": "niño",
     "emoji": "🧒",
     "zh": "男孩",
     "zhT": "男孩",
     "like": "ni-nyo",
     "art": null
    },
    {
     "sp": "araña",
     "emoji": "🕷️",
     "zh": "蜘蛛",
     "zhT": "蜘蛛",
     "like": "a-ra-nya",
     "art": null
    },
    {
     "sp": "piña",
     "emoji": "🍍",
     "zh": "菠萝",
     "zhT": "菠蘿",
     "like": "pi-nya",
     "art": null
    },
    {
     "sp": "año",
     "emoji": "🎈",
     "zh": "年；岁",
     "zhT": "年；歲",
     "like": "a-nyo",
     "art": null
    }
   ]
  },
  {
   "id": "so-z",
   "order": 7,
   "letters": "Z z · C (e, i) · S s",
   "emoji": "☀️",
   "art": null,
   "pat": "z|c[ei]|s",
   "titleEs": "Z, C y S suenan igual",
   "titleZh": "z、c、s 读起来一样",
   "titleZhT": "z、c、s 讀起來一樣",
   "ruleZh": "拼音里的 z、c（zī、cī）和西班牙语不一样。在阿根廷，z、ce、ci 和 s 都读成 “s”：zapatillas ≈ “sa-pa-ti-sha”。",
   "ruleZhT": "拼音裡的 z、c（zī、cī）和西班牙語不一樣。在阿根廷，z、ce、ci 和 s 都讀成 “s”：zapatillas ≈ “sa-pa-ti-sha”。",
   "words": [
    {
     "sp": "zapatillas",
     "emoji": "👟",
     "zh": "运动鞋",
     "zhT": "運動鞋",
     "like": "sa-pa-ti-sha",
     "art": null
    },
    {
     "sp": "cielo",
     "emoji": "☁️",
     "zh": "天空",
     "zhT": "天空",
     "like": "sie-lo",
     "art": null
    },
    {
     "sp": "sol",
     "emoji": "☀️",
     "zh": "太阳",
     "zhT": "太陽",
     "like": "sol",
     "art": null
    },
    {
     "sp": "zorro",
     "emoji": "🦊",
     "zh": "狐狸",
     "zhT": "狐狸",
     "like": "so-rro",
     "art": null
    }
   ]
  },
  {
   "id": "so-qu",
   "order": 8,
   "letters": "QU qu · C (a, o, u)",
   "emoji": "🧀",
   "art": null,
   "pat": "qu|c[aou]",
   "titleEs": "QU suena como K",
   "titleZh": "qu 读 k",
   "titleZhT": "qu 讀 k",
   "ruleZh": "西班牙语的 qu 读 “k”（像拼音的 kè），u 不发音。别把它读成拼音的 q（qī）！c 在 a、o、u 前面也读 “k”。",
   "ruleZhT": "西班牙語的 qu 讀 “k”（像拼音的 kè），u 不發音。別把它讀成拼音的 q（qī）！c 在 a、o、u 前面也讀 “k”。",
   "words": [
    {
     "sp": "queso",
     "emoji": "🧀",
     "zh": "奶酪",
     "zhT": "奶酪",
     "like": "ke-so",
     "art": null
    },
    {
     "sp": "casa",
     "emoji": "🏠",
     "zh": "房子",
     "zhT": "房子",
     "like": "ka-sa",
     "art": null
    },
    {
     "sp": "coco",
     "emoji": "🥥",
     "zh": "椰子",
     "zhT": "椰子",
     "like": "ko-ko",
     "art": null
    },
    {
     "sp": "cuatro",
     "emoji": "4️⃣",
     "zh": "四",
     "zhT": "四",
     "like": "kua-tro",
     "art": null
    }
   ]
  },
  {
   "id": "so-v",
   "order": 9,
   "letters": "V v · B b",
   "emoji": "🐄",
   "art": null,
   "pat": "v|b",
   "titleEs": "V y B suenan igual",
   "titleZh": "v 和 b 读音一样",
   "titleZhT": "v 和 b 讀音一樣",
   "ruleZh": "西班牙语的 v 和 b 读音一样，都是双唇轻轻一碰的“b”（像拼音的 b），不是英语的 v。",
   "ruleZhT": "西班牙語的 v 和 b 讀音一樣，都是雙唇輕輕一碰的“b”（像拼音的 b），不是英語的 v。",
   "words": [
    {
     "sp": "vaca",
     "emoji": "🐄",
     "zh": "奶牛",
     "zhT": "奶牛",
     "like": "ba-ka",
     "art": null
    },
    {
     "sp": "uva",
     "emoji": "🍇",
     "zh": "葡萄",
     "zhT": "葡萄",
     "like": "u-ba",
     "art": null
    },
    {
     "sp": "vaso",
     "emoji": "🥛",
     "zh": "杯子",
     "zhT": "杯子",
     "like": "ba-so",
     "art": null
    },
    {
     "sp": "baño",
     "emoji": "🚻",
     "zh": "厕所",
     "zhT": "廁所",
     "like": "ba-nyo",
     "art": null
    }
   ]
  }
 ],
 "listen": [
  {
   "say": "mamá",
   "opts": [
    {
     "emoji": "👩",
     "sp": "mamá",
     "zh": "妈妈",
     "zhT": "媽媽",
     "art": null
    },
    {
     "emoji": "🌧️",
     "sp": "lluvia",
     "zh": "下雨",
     "zhT": "下雨",
     "art": null
    },
    {
     "emoji": "👟",
     "sp": "zapatillas",
     "zh": "运动鞋",
     "zhT": "運動鞋",
     "art": null
    }
   ]
  },
  {
   "say": "helado",
   "opts": [
    {
     "emoji": "🍦",
     "sp": "helado",
     "zh": "冰淇淋",
     "zhT": "冰淇淋",
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
     "emoji": "🧀",
     "sp": "queso",
     "zh": "奶酪",
     "zhT": "奶酪",
     "art": null
    }
   ]
  },
  {
   "say": "naranja",
   "opts": [
    {
     "emoji": "🍊",
     "sp": "naranja",
     "zh": "橙子",
     "zhT": "橙子",
     "art": null
    },
    {
     "emoji": "🧒",
     "sp": "niño",
     "zh": "男孩",
     "zhT": "男孩",
     "art": null
    },
    {
     "emoji": "🐄",
     "sp": "vaca",
     "zh": "奶牛",
     "zhT": "奶牛",
     "art": null
    }
   ]
  },
  {
   "say": "calle",
   "opts": [
    {
     "emoji": "🛣️",
     "sp": "calle",
     "zh": "街道",
     "zhT": "街道",
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
     "emoji": "👩",
     "sp": "mamá",
     "zh": "妈妈",
     "zhT": "媽媽",
     "art": null
    }
   ]
  },
  {
   "say": "perro",
   "opts": [
    {
     "emoji": "🐶",
     "sp": "perro",
     "zh": "狗",
     "zhT": "狗",
     "art": null
    },
    {
     "emoji": "🧀",
     "sp": "queso",
     "zh": "奶酪",
     "zhT": "奶酪",
     "art": null
    },
    {
     "emoji": "👋",
     "sp": "hola",
     "zh": "你好",
     "zhT": "你好",
     "art": null
    }
   ]
  },
  {
   "say": "araña",
   "opts": [
    {
     "emoji": "🕷️",
     "sp": "araña",
     "zh": "蜘蛛",
     "zhT": "蜘蛛",
     "art": null
    },
    {
     "emoji": "🐄",
     "sp": "vaca",
     "zh": "奶牛",
     "zhT": "奶牛",
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
   "say": "sol",
   "opts": [
    {
     "emoji": "☀️",
     "sp": "sol",
     "zh": "太阳",
     "zhT": "太陽",
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
     "emoji": "🌧️",
     "sp": "lluvia",
     "zh": "下雨",
     "zhT": "下雨",
     "art": null
    }
   ]
  },
  {
   "say": "cuatro",
   "opts": [
    {
     "emoji": "4️⃣",
     "sp": "cuatro",
     "zh": "四",
     "zhT": "四",
     "art": null
    },
    {
     "emoji": "👋",
     "sp": "hola",
     "zh": "你好",
     "zhT": "你好",
     "art": null
    },
    {
     "emoji": "🐶",
     "sp": "perro",
     "zh": "狗",
     "zhT": "狗",
     "art": null
    }
   ]
  },
  {
   "say": "vaca",
   "opts": [
    {
     "emoji": "🐄",
     "sp": "vaca",
     "zh": "奶牛",
     "zhT": "奶牛",
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
     "emoji": "🧒",
     "sp": "niño",
     "zh": "男孩",
     "zhT": "男孩",
     "art": null
    }
   ]
  }
 ]
};
