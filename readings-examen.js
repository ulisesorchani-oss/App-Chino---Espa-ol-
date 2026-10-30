// ============================================================
// readings-examen.js — LECTURAS tipo examen · ESQUEMA v2 (solo datos, sin pantalla)
// ------------------------------------------------------------
// GENERADO por tools/build-readings-examen.js desde tools/lecturas-examen/fuente-*.json — NO editar a mano:
// tools/check-readings.js vuelve a calcular largo, fueraDeNivel y el tradicional y falla si no coinciden.
// Textos originales escritos para la app. Nivel aproximado, NO oficial. Tradicional: OpenCC s2tw (ida y vuelta tw2s verificada).
// Lista de referencia del nivel: HSK 3.0 (GF0025-2021), la embebida en la app (ver tools/lecturas-examen/nivel.js).
// tipo: 'examen' (corto, entra en la práctica de examen: ≥ 90 % de nivel y ≤ 5 palabras fuera) | 'estudio' (solo lectura/estudio, fuera de la práctica de examen).
//
// Aditivo y separado de window.READINGS (v1): la rama de interfaz unificará ambas en una sola fuente.
//   { id, schema: 2, tipo: 'examen', nivel: 3|4|5, genero, emoji, revision: 'pendiente'|'revisado'|'nativo',
//     revisor?: 'nombre',                             // obligatorio si revision = 'nativo' (quién lo confirmó)
//     titulo: { zh, zhT, es },
//     parrafos: [{ zh, zhT, es }],                     // el texto, por párrafos (visible durante las preguntas)
//     nombres?: [{ zh, zhT }],                         // nombres propios del texto: no cuentan para el nivel
//     dentroDeNivel?: [zh],                            // coincidencias con una palabra de nivel más alto revisadas a mano (都会 = 都 + 会)
//     fueraDeNivelDeclarado?: [zh],                    // el cálculo las da como dentro (se arman con palabras de la lista) pero el autor las declara fuera (大年三十); el validador falla si sobran
//     largo,                                           // hanzi del texto — CALCULADO
//     glosario: [{ zh, zhT, categoria, es, nivelLista, fueraDeNivel }],  // 8–12; nivelLista = HSK 1–9 de la entrada exacta o null; ambos CALCULADOS
//     nota?: 'texto',                                // aviso visible en las pantallas junto a «Nivel aproximado» (p. ej. «Texto original; los datos son ilustrativos»)
//     comprension: [ { tipo: idea|detalle|inferencia|vocabulario, es, opts[], why, whyNot[],   // opts[0] = CORRECTA (se baraja al mostrar)
//                     qZh?, qZhT?, optsZh?[], optsZhT?[] }          // HSK 5: la pregunta y las opciones van en chino y «ver en español» muestra es/opts; solo si el texto las trae (todas o ninguna)
//                  | { tipo: 'vf', es, vf, why, qZh?, qZhT? }   // V/F: con qZh la afirmación va en chino y las opciones fijas son 对/错 (Verdadero/Falso en español)
//                  | { tipo: 'vf', es, vf: true|false, why } ],                    // verdadero/falso: la pantalla lo resuelve la rama de interfaz
//     banco: { huecos: [{ zh (con ＿＿), zhT, resp, respT }], palabras[], palabrasT[] },  // palabras = respuestas + 1–2 sobrantes
//     parecidas: [{ zh (con ＿＿), zhT, opts[], optsT[], ok: [índices válidos], why, delTexto?: false }],   // desde HSK 4; delTexto:false = oración nueva
//     capa2?: { notas: [{ zh, zhT, es }], colocaciones: [{ zh, zhT, es }] } }
// Progreso: clave ac_reading_v1 (la misma de las lecturas v1).
// ============================================================
window.READINGS_V2 = (window.READINGS_V2 || []).concat([
 {
  "id": "rx-h4-tren",
  "schema": 2,
  "tipo": "examen",
  "nivel": 4,
  "genero": "narración",
  "emoji": "🚄",
  "revision": "revisado",
  "titulo": {
   "zh": "错过的火车",
   "zhT": "錯過的火車",
   "es": "El tren que se fue"
  },
  "parrafos": [
   {
    "zh": "小林要去上海参加朋友的婚礼。早上六点他就出门了，可是路上堵车，到火车站的时候，火车已经开走了。",
    "zhT": "小林要去上海參加朋友的婚禮。早上六點他就出門了，可是路上堵車，到火車站的時候，火車已經開走了。",
    "es": "Xiao Lin va a Shanghái a la boda de un amigo. Salió de casa a las seis de la mañana, pero había mucho tránsito en el camino y, cuando llegó a la estación, el tren ya se había ido."
   },
   {
    "zh": "他很着急，马上给朋友打电话。朋友笑着说：“别担心，婚礼下午才开始，你坐下一班车吧。”",
    "zhT": "他很著急，馬上給朋友打電話。朋友笑著說：“別擔心，婚禮下午才開始，你坐下一班車吧。”",
    "es": "Muy nervioso, llamó enseguida a su amigo. El amigo le dijo, riendo: «No te preocupes, la boda empieza recién por la tarde; tomá el próximo tren»."
   },
   {
    "zh": "他松了一口气，在车站旁边的小饭馆吃了一碗面。没想到下一班车也晚点了一个小时。他到的时候，婚礼已经开始了，他一边擦汗，一边悄悄找座位，可是大家还是都看见了他。",
    "zhT": "他鬆了一口氣，在車站旁邊的小飯館吃了一碗麵。沒想到下一班車也晚點了一個小時。他到的時候，婚禮已經開始了，他一邊擦汗，一邊悄悄找座位，可是大家還是都看見了他。",
    "es": "Suspiró aliviado y comió un tazón de fideos en un restaurante chico cerca de la estación. Pero, para sorpresa suya, el siguiente tren también se retrasó una hora. Cuando llegó, la boda ya había empezado; mientras se secaba el sudor buscaba su asiento sin hacer ruido, pero igual todos lo vieron."
   }
  ],
  "nombres": [
   {
    "zh": "小林",
    "zhT": "小林"
   },
   {
    "zh": "上海",
    "zhT": "上海"
   }
  ],
  "largo": 146,
  "glosario": [
   {
    "zh": "参加",
    "zhT": "參加",
    "categoria": "verbo",
    "es": "asistir, participar en",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "婚礼",
    "zhT": "婚禮",
    "categoria": "sustantivo",
    "es": "la boda",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "堵车",
    "zhT": "堵車",
    "categoria": "verbo",
    "es": "haber mucho tránsito",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "着急",
    "zhT": "著急",
    "categoria": "adjetivo",
    "es": "estar impaciente, nervioso",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "晚点",
    "zhT": "晚點",
    "categoria": "verbo",
    "es": "retrasarse (un transporte)",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "松了一口气",
    "zhT": "鬆了一口氣",
    "categoria": "expresión",
    "es": "suspirar aliviado",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "没想到",
    "zhT": "沒想到",
    "categoria": "expresión",
    "es": "no imaginaba que; para sorpresa suya",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "一边…一边…",
    "zhT": "一邊…一邊…",
    "categoria": "estructura",
    "es": "mientras…, a la vez que…",
    "nivelLista": null,
    "fueraDeNivel": false
   },
   {
    "zh": "擦汗",
    "zhT": "擦汗",
    "categoria": "expresión",
    "es": "secarse el sudor",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "悄悄",
    "zhT": "悄悄",
    "categoria": "adverbio",
    "es": "en silencio, sin hacer ruido",
    "nivelLista": 5,
    "fueraDeNivel": true
   },
   {
    "zh": "座位",
    "zhT": "座位",
    "categoria": "sustantivo",
    "es": "el asiento",
    "nivelLista": 2,
    "fueraDeNivel": false
   }
  ],
  "comprension": [
   {
    "tipo": "detalle",
    "es": "¿Por qué Xiao Lin perdió el primer tren?",
    "opts": [
     "Había mucho tránsito en el camino.",
     "Salió de su casa demasiado tarde.",
     "Se equivocó de estación.",
     "Su amigo lo llamó por teléfono."
    ],
    "why": "El texto dice que salió a las seis, pero «路上堵车» (había mucho tránsito en el camino).",
    "whyNot": [
     "Salió temprano, a las seis de la mañana.",
     "Llegó a la estación correcta; el tren ya había salido.",
     "La llamada ocurre después de perder el tren, no antes."
    ]
   },
   {
    "tipo": "idea",
    "es": "¿Qué pasó al final?",
    "opts": [
     "Llegó cuando la boda ya había empezado.",
     "Llegó a la boda antes que los invitados.",
     "Se volvió a su casa sin ir a la boda.",
     "Esperó a su amigo en la estación."
    ],
    "why": "Último párrafo: «他到的时候，婚礼已经开始了».",
    "whyNot": [
     "El segundo tren también se retrasó, así que llegó tarde.",
     "Sí fue a la boda: buscó asiento y todos lo vieron.",
     "Quien lo esperaba era la boda; no hay nadie en la estación."
    ]
   }
  ],
  "banco": {
   "huecos": [
    {
     "zh": "路上＿＿，到火车站的时候，火车已经开走了",
     "zhT": "路上＿＿，到火車站的時候，火車已經開走了",
     "resp": "堵车",
     "respT": "堵車"
    },
    {
     "zh": "他很＿＿，马上给朋友打电话",
     "zhT": "他很＿＿，馬上給朋友打電話",
     "resp": "着急",
     "respT": "著急"
    },
    {
     "zh": "在车站旁边的小饭馆吃了一＿＿面",
     "zhT": "在車站旁邊的小飯館吃了一＿＿麵",
     "resp": "碗",
     "respT": "碗"
    },
    {
     "zh": "没想到下一班车也＿＿了一个小时",
     "zhT": "沒想到下一班車也＿＿了一個小時",
     "resp": "晚点",
     "respT": "晚點"
    },
    {
     "zh": "他到的时候，婚礼已经＿＿了",
     "zhT": "他到的時候，婚禮已經＿＿了",
     "resp": "开始",
     "respT": "開始"
    },
    {
     "zh": "他一边＿＿汗，一边悄悄找座位",
     "zhT": "他一邊＿＿汗，一邊悄悄找座位",
     "resp": "擦",
     "respT": "擦"
    }
   ],
   "palabras": [
    "堵车",
    "着急",
    "碗",
    "晚点",
    "开始",
    "擦",
    "护照",
    "机场"
   ],
   "palabrasT": [
    "堵車",
    "著急",
    "碗",
    "晚點",
    "開始",
    "擦",
    "護照",
    "機場"
   ]
  },
  "parecidas": [
   {
    "zh": "别＿＿，婚礼下午才开始，你坐下一班车吧。",
    "zhT": "別＿＿，婚禮下午才開始，你坐下一班車吧。",
    "opts": [
     "担心",
     "关心",
     "小心"
    ],
    "optsT": [
     "擔心",
     "關心",
     "小心"
    ],
    "ok": [
     0
    ],
    "why": "担心 es «preocuparse»; 关心 es «interesarse por alguien, cuidar de él» y 小心 es «tener cuidado». Solo 担心 encaja con «别… (no te preocupes)»."
   }
  ],
  "capa2": {
   "notas": [
    {
     "zh": "他一边擦汗，一边找座位。",
     "zhT": "他一邊擦汗，一邊找座位。",
     "es": "一边…一边… une dos acciones simultáneas: «mientras se secaba el sudor, buscaba asiento»."
    }
   ],
   "colocaciones": [
    {
     "zh": "参加婚礼",
     "zhT": "參加婚禮",
     "es": "asistir a una boda"
    },
    {
     "zh": "松了一口气",
     "zhT": "鬆了一口氣",
     "es": "suspirar aliviado"
    }
   ]
  }
 },
 {
  "id": "rx-h4-encuesta",
  "schema": 2,
  "tipo": "examen",
  "nivel": 4,
  "genero": "expositivo",
  "emoji": "📱",
  "revision": "revisado",
  "titulo": {
   "zh": "你每天用多长时间手机？",
   "zhT": "你每天用多長時間手機？",
   "es": "¿Cuánto tiempo usás el celular por día?"
  },
  "parrafos": [
   {
    "zh": "一所大学最近调查了三百名学生，问他们每天用多长时间手机。",
    "zhT": "一所大學最近調查了三百名學生，問他們每天用多長時間手機。",
    "es": "Una universidad encuestó hace poco a trescientos estudiantes y les preguntó cuánto tiempo usan el celular por día."
   },
   {
    "zh": "结果发现，百分之四十的学生每天用手机超过五个小时，百分之三十五的学生用三到五个小时，其他学生用得比较少。大部分同学用手机聊天、看视频和查资料。",
    "zhT": "結果發現，百分之四十的學生每天用手機超過五個小時，百分之三十五的學生用三到五個小時，其他學生用得比較少。大部分同學用手機聊天、看視頻和查資料。",
    "es": "El resultado: el 40 % de los estudiantes usa el celular más de cinco horas por día, el 35 % lo usa de tres a cinco horas y los demás lo usan relativamente poco. La mayoría usa el celular para chatear, ver videos y buscar información."
   },
   {
    "zh": "调查还发现，晚上十一点以后还在玩手机的学生，第二天上课时更容易觉得累。老师建议大家睡觉前一个小时把手机放在别的房间里。",
    "zhT": "調查還發現，晚上十一點以後還在玩手機的學生，第二天上課時更容易覺得累。老師建議大家睡覺前一個小時把手機放在別的房間裡。",
    "es": "La encuesta también mostró que los estudiantes que siguen pegados al celular después de las once de la noche se sienten más cansados en clase al día siguiente. El docente recomienda dejar el celular en otra habitación una hora antes de dormir."
   }
  ],
  "largo": 146,
  "glosario": [
   {
    "zh": "调查",
    "zhT": "調查",
    "categoria": "verbo / sustantivo",
    "es": "encuestar; la encuesta",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "超过",
    "zhT": "超過",
    "categoria": "verbo",
    "es": "superar, pasar de",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "百分之",
    "zhT": "百分之",
    "categoria": "estructura",
    "es": "por ciento (百分之四十 = 40 %)",
    "nivelLista": null,
    "fueraDeNivel": false
   },
   {
    "zh": "其他",
    "zhT": "其他",
    "categoria": "pronombre",
    "es": "los demás, otros",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "比较",
    "zhT": "比較",
    "categoria": "adverbio",
    "es": "relativamente, bastante",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "大部分",
    "zhT": "大部分",
    "categoria": "sustantivo",
    "es": "la mayor parte",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "聊天",
    "zhT": "聊天",
    "categoria": "verbo",
    "es": "charlar, chatear",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "查资料",
    "zhT": "查資料",
    "categoria": "expresión",
    "es": "buscar información",
    "nivelLista": null,
    "fueraDeNivel": false
   },
   {
    "zh": "容易",
    "zhT": "容易",
    "categoria": "adjetivo",
    "es": "fácil; propenso a",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "建议",
    "zhT": "建議",
    "categoria": "verbo",
    "es": "recomendar, sugerir",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "视频",
    "zhT": "視頻",
    "categoria": "sustantivo",
    "es": "el video",
    "nivelLista": 5,
    "fueraDeNivel": true
   }
  ],
  "comprension": [
   {
    "tipo": "detalle",
    "es": "¿Qué porcentaje de los estudiantes usa el celular más de cinco horas por día?",
    "opts": [
     "El 40 %",
     "El 35 %",
     "El 25 %",
     "El 75 %"
    ],
    "why": "Segundo párrafo: «百分之四十的学生每天用手机超过五个小时».",
    "whyNot": [
     "El 35 % es el grupo que lo usa de tres a cinco horas.",
     "El 25 % no aparece en el texto; es lo que queda para «los demás» si se suman los otros dos grupos.",
     "El 75 % sería la suma de los dos primeros grupos (más de tres horas), no solo el de más de cinco."
    ]
   },
   {
    "tipo": "idea",
    "es": "¿Qué recomienda el docente?",
    "opts": [
     "Dejar el celular en otra habitación antes de dormir.",
     "Usar el celular solo para estudiar.",
     "Apagar el celular durante las clases.",
     "Comprarse un celular nuevo."
    ],
    "why": "Última oración: «老师建议大家睡觉前一个小时把手机放在别的房间里» (recomienda dejar el celular en otra habitación una hora antes de dormir).",
    "whyNot": [
     "El texto no habla de limitar el celular a los estudios; solo menciona para qué lo usan.",
     "No se menciona nada sobre las clases, sino sobre la noche antes de dormir.",
     "Ninguna parte del texto sugiere comprar un celular."
    ]
   }
  ],
  "banco": {
   "huecos": [
    {
     "zh": "一所大学最近＿＿了三百名学生",
     "zhT": "一所大學最近＿＿了三百名學生",
     "resp": "调查",
     "respT": "調查"
    },
    {
     "zh": "百分之四十的学生每天用手机＿＿五个小时",
     "zhT": "百分之四十的學生每天用手機＿＿五個小時",
     "resp": "超过",
     "respT": "超過"
    },
    {
     "zh": "其他学生用得＿＿少",
     "zhT": "其他學生用得＿＿少",
     "resp": "比较",
     "respT": "比較"
    },
    {
     "zh": "大部分同学用手机聊天、看视频和＿＿资料",
     "zhT": "大部分同學用手機聊天、看視頻和＿＿資料",
     "resp": "查",
     "respT": "查"
    },
    {
     "zh": "第二天上课时更容易觉得＿＿",
     "zhT": "第二天上課時更容易覺得＿＿",
     "resp": "累",
     "respT": "累"
    },
    {
     "zh": "老师＿＿大家睡觉前一个小时把手机放在别的房间里",
     "zhT": "老師＿＿大家睡覺前一個小時把手機放在別的房間裡",
     "resp": "建议",
     "respT": "建議"
    }
   ],
   "palabras": [
    "调查",
    "超过",
    "比较",
    "查",
    "累",
    "建议",
    "比赛",
    "照片"
   ],
   "palabrasT": [
    "調查",
    "超過",
    "比較",
    "查",
    "累",
    "建議",
    "比賽",
    "照片"
   ]
  },
  "parecidas": [
   {
    "zh": "百分之四十的学生每天用手机＿＿五个小时。",
    "zhT": "百分之四十的學生每天用手機＿＿五個小時。",
    "opts": [
     "超过",
     "经过",
     "通过"
    ],
    "optsT": [
     "超過",
     "經過",
     "通過"
    ],
    "ok": [
     0
    ],
    "why": "超过 = «pasar de, superar» (una cantidad). 经过 = «pasar por, atravesar» y 通过 = «pasar a través de; por medio de»: no sirven para comparar con una cifra."
   },
   {
    "zh": "老师建议大家睡觉前一个小时把手机放在＿＿房间里。",
    "zhT": "老師建議大家睡覺前一個小時把手機放在＿＿房間裡。",
    "opts": [
     "别的",
     "其他",
     "另外"
    ],
    "optsT": [
     "別的",
     "其他",
     "另外"
    ],
    "ok": [
     0,
     1
    ],
    "why": "别的 y 其他 significan «otro/otros» y ambos funcionan aquí. 另外 es «además, por otra parte» y no se pone delante de «房间»."
   }
  ],
  "capa2": {
   "notas": [
    {
     "zh": "百分之四十",
     "zhT": "百分之四十",
     "es": "Los porcentajes se dicen 百分之 + número: 百分之四十 = 40 %."
    }
   ],
   "colocaciones": [
    {
     "zh": "做调查",
     "zhT": "做調查",
     "es": "hacer una encuesta"
    },
    {
     "zh": "查资料",
     "zhT": "查資料",
     "es": "buscar información"
    }
   ]
  }
 },
 {
  "id": "rx-h4-chunlian",
  "schema": 2,
  "tipo": "estudio",
  "nivel": 4,
  "genero": "cultural",
  "emoji": "🧧",
  "revision": "revisado",
  "titulo": {
   "zh": "贴春联",
   "zhT": "貼春聯",
   "es": "Pegar los pareados de Año Nuevo Chino"
  },
  "parrafos": [
   {
    "zh": "春节前，中国的家家户户都会在门口贴红色的春联。春联是两句字数相同、意思相配的话，写在红纸上，左右各一句。",
    "zhT": "春節前，中國的家家戶戶都會在門口貼紅色的春聯。春聯是兩句字數相同、意思相配的話，寫在紅紙上，左右各一句。",
    "es": "Antes del Año Nuevo Chino (la Fiesta de la Primavera), todas las casas de China pegan en la puerta pareados rojos. Son dos frases con el mismo número de caracteres y de sentido complementario, escritas en papel rojo, una a cada lado."
   },
   {
    "zh": "按传统习惯，站在门外看，上联贴在右边，下联贴在左边，门上面还会贴一张短短的横批。春联里常常有“平安”“幸福”“健康”这样的好词，人们希望新的一年一切顺利。",
    "zhT": "按傳統習慣，站在門外看，上聯貼在右邊，下聯貼在左邊，門上面還會貼一張短短的橫批。春聯裡常常有“平安”“幸福”“健康”這樣的好詞，人們希望新的一年一切順利。",
    "es": "Según la costumbre tradicional, mirando la puerta desde afuera, el primer verso (上联) se pega a la derecha y el segundo (下联) a la izquierda; arriba de la puerta se suele pegar además una tira corta, el 横批. Los pareados llevan a menudo palabras auspiciosas como «paz», «felicidad» y «salud»: la gente desea que todo salga bien en el año nuevo."
   },
   {
    "zh": "有的家庭自己用毛笔写春联，有的去市场买现成的。不管是写的还是买的，贴上春联以后，屋子里就有了过年的气氛。",
    "zhT": "有的家庭自己用毛筆寫春聯，有的去市場買現成的。不管是寫的還是買的，貼上春聯以後，屋子裡就有了過年的氣氛。",
    "es": "Algunas familias escriben los pareados con pincel; otras los compran ya hechos en el mercado. Sean escritos o comprados, una vez pegados ya se respira el clima de Año Nuevo."
   }
  ],
  "dentroDeNivel": [
   "都会"
  ],
  "largo": 157,
  "glosario": [
   {
    "zh": "春联",
    "zhT": "春聯",
    "categoria": "sustantivo",
    "es": "pareado de Año Nuevo Chino",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "家家户户",
    "zhT": "家家戶戶",
    "categoria": "expresión",
    "es": "todas las familias, cada casa",
    "nivelLista": 8,
    "fueraDeNivel": true
   },
   {
    "zh": "相配",
    "zhT": "相配",
    "categoria": "verbo",
    "es": "combinar, hacer juego",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "上联",
    "zhT": "上聯",
    "categoria": "sustantivo",
    "es": "primer verso del pareado",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "下联",
    "zhT": "下聯",
    "categoria": "sustantivo",
    "es": "segundo verso del pareado",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "横批",
    "zhT": "橫批",
    "categoria": "sustantivo",
    "es": "tira horizontal sobre la puerta",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "平安",
    "zhT": "平安",
    "categoria": "adjetivo",
    "es": "en paz, a salvo",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "顺利",
    "zhT": "順利",
    "categoria": "adjetivo",
    "es": "sin contratiempos",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "毛笔",
    "zhT": "毛筆",
    "categoria": "sustantivo",
    "es": "pincel de escritura",
    "nivelLista": 5,
    "fueraDeNivel": true
   },
   {
    "zh": "现成",
    "zhT": "現成",
    "categoria": "adjetivo",
    "es": "ya hecho, listo para usar",
    "nivelLista": 9,
    "fueraDeNivel": true
   },
   {
    "zh": "气氛",
    "zhT": "氣氛",
    "categoria": "sustantivo",
    "es": "el clima, la atmósfera",
    "nivelLista": 6,
    "fueraDeNivel": true
   }
  ],
  "comprension": [
   {
    "tipo": "detalle",
    "es": "Según el texto, mirando la puerta desde afuera, ¿dónde se pega el primer verso (上联)?",
    "opts": [
     "A la derecha de la puerta.",
     "A la izquierda de la puerta.",
     "Encima de la puerta.",
     "Dentro de la casa."
    ],
    "why": "Segundo párrafo: «上联贴在右边».",
    "whyNot": [
     "A la izquierda va el segundo verso (下联).",
     "Encima de la puerta se pega la tira corta, el 横批.",
     "El texto habla de la puerta de entrada, no del interior."
    ]
   },
   {
    "tipo": "vf",
    "es": "Todas las familias escriben ellas mismas los pareados con pincel.",
    "vf": false,
    "why": "Falso: «有的家庭自己用毛笔写…，有的去市场买现成的». Algunas los escriben y otras los compran."
   }
  ],
  "banco": {
   "huecos": [
    {
     "zh": "上联贴在＿＿边",
     "zhT": "上聯貼在＿＿邊",
     "resp": "右",
     "respT": "右"
    },
    {
     "zh": "门上面还会贴一张短短的＿＿",
     "zhT": "門上面還會貼一張短短的＿＿",
     "resp": "横批",
     "respT": "橫批"
    },
    {
     "zh": "人们希望新的一年一切＿＿",
     "zhT": "人們希望新的一年一切＿＿",
     "resp": "顺利",
     "respT": "順利"
    },
    {
     "zh": "有的家庭自己用毛笔＿＿春联",
     "zhT": "有的家庭自己用毛筆＿＿春聯",
     "resp": "写",
     "respT": "寫"
    },
    {
     "zh": "有的去市场买＿＿的",
     "zhT": "有的去市場買＿＿的",
     "resp": "现成",
     "respT": "現成"
    },
    {
     "zh": "屋子里就有了过年的＿＿",
     "zhT": "屋子裡就有了過年的＿＿",
     "resp": "气氛",
     "respT": "氣氛"
    }
   ],
   "palabras": [
    "右",
    "横批",
    "顺利",
    "写",
    "现成",
    "气氛",
    "头发",
    "医院"
   ],
   "palabrasT": [
    "右",
    "橫批",
    "順利",
    "寫",
    "現成",
    "氣氛",
    "頭髮",
    "醫院"
   ]
  },
  "parecidas": [
   {
    "zh": "人们＿＿新的一年一切顺利。",
    "zhT": "人們＿＿新的一年一切順利。",
    "opts": [
     "希望",
     "愿望",
     "失望"
    ],
    "optsT": [
     "希望",
     "願望",
     "失望"
    ],
    "ok": [
     0
    ],
    "why": "希望 es el verbo «esperar, desear que». 愿望 es el sustantivo «deseo» (no lleva complemento así) y 失望 significa «decepcionarse»."
   }
  ],
  "capa2": {
   "notas": [
    {
     "zh": "家家户户",
     "zhT": "家家戶戶",
     "es": "Duplicación de 家 y 户: «cada casa, todas las familias». Sirve para decir «todo el mundo»."
    }
   ],
   "colocaciones": [
    {
     "zh": "贴春联",
     "zhT": "貼春聯",
     "es": "pegar los pareados de Año Nuevo Chino"
    },
    {
     "zh": "过年的气氛",
     "zhT": "過年的氣氛",
     "es": "el clima de Año Nuevo"
    }
   ]
  }
 },
 {
  "id": "rx-h4-casa",
  "schema": 2,
  "tipo": "examen",
  "nivel": 4,
  "genero": "cotidiano",
  "emoji": "🏠",
  "revision": "revisado",
  "titulo": {
   "zh": "找房子",
   "zhT": "找房子",
   "es": "Buscar casa"
  },
  "parrafos": [
   {
    "zh": "我下个月要搬家，所以最近一直在找房子。上周末我看了两个地方。",
    "zhT": "我下個月要搬家，所以最近一直在找房子。上週末我看了兩個地方。",
    "es": "El mes que viene me mudo, así que últimamente estoy buscando casa. El fin de semana pasado fui a ver dos lugares."
   },
   {
    "zh": "第一个离公司很近，走路只要十分钟，不过房间有点儿小，一个月一千八。第二个在郊区，房间大一些，一个月只要一千二，可是坐地铁要一个小时。",
    "zhT": "第一個離公司很近，走路只要十分鐘，不過房間有點兒小，一個月一千八。第二個在郊區，房間大一些，一個月只要一千二，可是坐地鐵要一個小時。",
    "es": "El primero queda muy cerca de la oficina, a solo diez minutos a pie, pero la habitación es un poco chica y cuesta 1.800 por mes. El segundo está en las afueras, la habitación es algo más grande y cuesta solo 1.200 por mes, pero en subte se tarda una hora."
   },
   {
    "zh": "我想了很久，最后选了第二个，因为我想省点儿钱，而且可以在地铁上看书，时间也不算浪费。",
    "zhT": "我想了很久，最後選了第二個，因為我想省點兒錢，而且可以在地鐵上看書，時間也不算浪費。",
    "es": "Lo pensé mucho y al final elegí el segundo, porque quiero ahorrar un poco y, además, puedo leer en el subte, así que el tiempo tampoco se desperdicia."
   }
  ],
  "dentroDeNivel": [
   "不算"
  ],
  "largo": 122,
  "glosario": [
   {
    "zh": "搬家",
    "zhT": "搬家",
    "categoria": "verbo",
    "es": "mudarse",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "一直",
    "zhT": "一直",
    "categoria": "adverbio",
    "es": "todo el tiempo, sin parar",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "郊区",
    "zhT": "郊區",
    "categoria": "sustantivo",
    "es": "las afueras",
    "nivelLista": 5,
    "fueraDeNivel": true
   },
   {
    "zh": "地铁",
    "zhT": "地鐵",
    "categoria": "sustantivo",
    "es": "el subte, el metro",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "不过",
    "zhT": "不過",
    "categoria": "conjunción",
    "es": "pero, sin embargo",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "房间",
    "zhT": "房間",
    "categoria": "sustantivo",
    "es": "la habitación",
    "nivelLista": 1,
    "fueraDeNivel": false
   },
   {
    "zh": "省",
    "zhT": "省",
    "categoria": "verbo",
    "es": "ahorrar",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "而且",
    "zhT": "而且",
    "categoria": "conjunción",
    "es": "además, y también",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "浪费",
    "zhT": "浪費",
    "categoria": "verbo",
    "es": "desperdiciar",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "算",
    "zhT": "算",
    "categoria": "verbo",
    "es": "contar como, considerarse",
    "nivelLista": 2,
    "fueraDeNivel": false
   }
  ],
  "comprension": [
   {
    "tipo": "detalle",
    "es": "¿Cuánto cuesta por mes el lugar que queda cerca de la oficina?",
    "opts": [
     "1.800",
     "1.200",
     "2.000",
     "1.000"
    ],
    "why": "Segundo párrafo: «第一个离公司很近…一个月一千八».",
    "whyNot": [
     "1.200 es el precio del segundo lugar, el de las afueras.",
     "2.000 no aparece en el texto.",
     "1.000 no aparece en el texto."
    ]
   },
   {
    "tipo": "idea",
    "es": "¿Por qué elige el segundo lugar?",
    "opts": [
     "Quiere ahorrar y puede leer en el viaje.",
     "Le queda más cerca de la oficina.",
     "La habitación es más pequeña.",
     "Allí vive un amigo suyo."
    ],
    "why": "Último párrafo: «我想省点儿钱，而且可以在地铁上看书».",
    "whyNot": [
     "La oficina queda cerca del primero; el segundo queda a una hora en subte.",
     "La habitación pequeña es del primer lugar, y no es una ventaja.",
     "El texto no menciona a ningún amigo."
    ]
   }
  ],
  "banco": {
   "huecos": [
    {
     "zh": "我下个月要＿＿，所以最近一直在找房子",
     "zhT": "我下個月要＿＿，所以最近一直在找房子",
     "resp": "搬家",
     "respT": "搬家"
    },
    {
     "zh": "第一个离公司很＿＿",
     "zhT": "第一個離公司很＿＿",
     "resp": "近",
     "respT": "近"
    },
    {
     "zh": "走路只要十分钟，不过房间有点儿＿＿",
     "zhT": "走路只要十分鐘，不過房間有點兒＿＿",
     "resp": "小",
     "respT": "小"
    },
    {
     "zh": "第二个在＿＿，房间大一些",
     "zhT": "第二個在＿＿，房間大一些",
     "resp": "郊区",
     "respT": "郊區"
    },
    {
     "zh": "我想了很久，最后＿＿了第二个",
     "zhT": "我想了很久，最後＿＿了第二個",
     "resp": "选",
     "respT": "選"
    },
    {
     "zh": "因为我想＿＿点儿钱",
     "zhT": "因為我想＿＿點兒錢",
     "resp": "省",
     "respT": "省"
    }
   ],
   "palabras": [
    "搬家",
    "近",
    "小",
    "郊区",
    "选",
    "省",
    "热闹",
    "周围"
   ],
   "palabrasT": [
    "搬家",
    "近",
    "小",
    "郊區",
    "選",
    "省",
    "熱鬧",
    "周圍"
   ]
  },
  "parecidas": [
   {
    "zh": "因为我想＿＿点儿钱。",
    "zhT": "因為我想＿＿點兒錢。",
    "opts": [
     "省",
     "花",
     "浪费"
    ],
    "optsT": [
     "省",
     "花",
     "浪費"
    ],
    "ok": [
     0
    ],
    "why": "省 = «ahorrar». 花 = «gastar» y 浪费 = «desperdiciar»: ambas van en contra de «因为我想… (porque quiero…)», que da la razón de elegir lo más barato."
   }
  ],
  "capa2": {
   "notas": [
    {
     "zh": "房间有点儿小 / 房间大一些",
     "zhT": "房間有點兒小 / 房間大一些",
     "es": "有点儿 + adjetivo expresa un matiz poco deseado («un poco chico»). Adjetivo + 一些 compara: «algo más grande»."
    }
   ],
   "colocaciones": [
    {
     "zh": "搬家",
     "zhT": "搬家",
     "es": "mudarse"
    },
    {
     "zh": "省钱",
     "zhT": "省錢",
     "es": "ahorrar dinero"
    }
   ]
  }
 },
 {
  "id": "rx-h4-jiaozi",
  "schema": 2,
  "tipo": "examen",
  "nivel": 4,
  "genero": "cultural",
  "emoji": "🥟",
  "revision": "revisado",
  "titulo": {
   "zh": "过年包饺子",
   "zhT": "過年包餃子",
   "es": "Armar dumplings en Año Nuevo"
  },
  "parrafos": [
   {
    "zh": "春节是中国最热闹的节日。在我们家，大年三十的晚上，全家人一起包饺子，这是我们家好多年的传统。",
    "zhT": "春節是中國最熱鬧的節日。在我們家，大年三十的晚上，全家人一起包餃子，這是我們家好多年的傳統。",
    "es": "El Año Nuevo Chino (la Fiesta de la Primavera) es la fiesta más animada de China. En mi casa, la noche de la víspera de Año Nuevo, toda la familia se junta a armar dumplings: es una tradición de hace muchísimos años."
   },
   {
    "zh": "奶奶准备好面和菜，爸爸妈妈负责包，我和妹妹也来帮忙。我们包得不太好看，但是大家都很开心。奶奶还会在其中一个饺子里放一块糖，谁吃到了，新的一年就会很顺利。",
    "zhT": "奶奶準備好麵和菜，爸爸媽媽負責包，我和妹妹也來幫忙。我們包得不太好看，但是大家都很開心。奶奶還會在其中一個餃子裡放一塊糖，誰吃到了，新的一年就會很順利。",
    "es": "Mi abuela prepara la masa y las verduras, mis papás se encargan de armarlos y mi hermanita y yo damos una mano. No nos quedan muy lindos, pero la pasamos bárbaro. Mi abuela además pone un caramelo en uno de los dumplings: al que le toca, le va a ir bien todo el año."
   },
   {
    "zh": "吃完饺子，我们一边看电视，一边等着十二点放鞭炮。那时候，外面特别热闹，家人团圆，互相说着祝福的话。我觉得，这就是春节最好的样子。",
    "zhT": "吃完餃子，我們一邊看電視，一邊等著十二點放鞭炮。那時候，外面特別熱鬧，家人團圓，互相說著祝福的話。我覺得，這就是春節最好的樣子。",
    "es": "Después de comer, miramos tele mientras esperamos las doce para tirar petardos. A esa hora afuera hay muchísimo bullicio; la familia está reunida y nos deseamos lo mejor. Para mí, así es el Año Nuevo en su mejor versión."
   }
  ],
  "fueraDeNivelDeclarado": [
   "大年三十"
  ],
  "largo": 164,
  "glosario": [
   {
    "zh": "顺利",
    "zhT": "順利",
    "categoria": "adjetivo",
    "es": "sin contratiempos, que sale bien",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "热闹",
    "zhT": "熱鬧",
    "categoria": "adjetivo",
    "es": "animado, con mucho bullicio",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "大年三十",
    "zhT": "大年三十",
    "categoria": "expresión",
    "es": "la víspera de Año Nuevo Chino (último día del año lunar)",
    "nivelLista": null,
    "fueraDeNivel": true
   },
   {
    "zh": "包",
    "zhT": "包",
    "categoria": "verbo",
    "es": "envolver, armar (un dumpling)",
    "nivelLista": 1,
    "fueraDeNivel": false
   },
   {
    "zh": "饺子",
    "zhT": "餃子",
    "categoria": "sustantivo",
    "es": "dumpling; empanadilla china",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "传统",
    "zhT": "傳統",
    "categoria": "sustantivo",
    "es": "la tradición",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "准备",
    "zhT": "準備",
    "categoria": "verbo",
    "es": "preparar",
    "nivelLista": 1,
    "fueraDeNivel": false
   },
   {
    "zh": "负责",
    "zhT": "負責",
    "categoria": "verbo",
    "es": "encargarse de",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "一边…一边…",
    "zhT": "一邊…一邊…",
    "categoria": "estructura",
    "es": "mientras…, a la vez que…",
    "nivelLista": null,
    "fueraDeNivel": false
   },
   {
    "zh": "鞭炮",
    "zhT": "鞭炮",
    "categoria": "sustantivo",
    "es": "petardo",
    "nivelLista": 7,
    "fueraDeNivel": true
   },
   {
    "zh": "团圆",
    "zhT": "團圓",
    "categoria": "verbo",
    "es": "reunirse la familia",
    "nivelLista": 9,
    "fueraDeNivel": true
   },
   {
    "zh": "祝福",
    "zhT": "祝福",
    "categoria": "sustantivo / verbo",
    "es": "buenos deseos; desear lo mejor",
    "nivelLista": 4,
    "fueraDeNivel": false
   }
  ],
  "comprension": [
   {
    "tipo": "detalle",
    "es": "¿Quiénes se encargan de armar los dumplings?",
    "opts": [
     "Los papás.",
     "La abuela.",
     "Los chicos solos.",
     "Los vecinos."
    ],
    "why": "Segundo párrafo: «爸爸妈妈负责包» (los papás se encargan de armarlos).",
    "whyNot": [
     "La abuela prepara la masa y las verduras, pero no los arma.",
     "Los chicos solo dan una mano («也来帮忙»).",
     "Los vecinos no aparecen en el texto."
    ]
   },
   {
    "tipo": "idea",
    "es": "¿Qué quiere decir el narrador en la última oración?",
    "opts": [
     "Que esa escena —la familia junta, el bullicio, los buenos deseos— es lo mejor del Año Nuevo.",
     "Que lo único que importa son los petardos.",
     "Que prefiere comer afuera esa noche.",
     "Que los dumplings le quedan perfectos."
    ],
    "why": "Última oración: «我觉得，这就是春节最好的样子» («esto» es la escena de las líneas anteriores: la familia junta, el bullicio y los buenos deseos).",
    "whyNot": [
     "Los petardos son solo una parte de la noche: el narrador no dice que sean lo único que importa, valora la escena completa.",
     "Todo ocurre en su casa; nunca habla de salir a comer.",
     "Dice que no les quedan muy lindos."
    ]
   }
  ],
  "banco": {
   "huecos": [
    {
     "zh": "春节是中国最热闹的＿＿",
     "zhT": "春節是中國最熱鬧的＿＿",
     "resp": "节日",
     "respT": "節日"
    },
    {
     "zh": "全家人一起＿＿饺子",
     "zhT": "全家人一起＿＿餃子",
     "resp": "包",
     "respT": "包"
    },
    {
     "zh": "奶奶＿＿好面和菜",
     "zhT": "奶奶＿＿好麵和菜",
     "resp": "准备",
     "respT": "準備"
    },
    {
     "zh": "爸爸妈妈＿＿包",
     "zhT": "爸爸媽媽＿＿包",
     "resp": "负责",
     "respT": "負責"
    },
    {
     "zh": "但是大家都很＿＿",
     "zhT": "但是大家都很＿＿",
     "resp": "开心",
     "respT": "開心"
    },
    {
     "zh": "那时候，外面特别＿＿",
     "zhT": "那時候，外面特別＿＿",
     "resp": "热闹",
     "respT": "熱鬧"
    }
   ],
   "palabras": [
    "节日",
    "包",
    "准备",
    "负责",
    "开心",
    "热闹",
    "节目",
    "礼物"
   ],
   "palabrasT": [
    "節日",
    "包",
    "準備",
    "負責",
    "開心",
    "熱鬧",
    "節目",
    "禮物"
   ]
  },
  "parecidas": [
   {
    "zh": "在中国，过年吃饺子是很多家庭的＿＿。",
    "zhT": "在中國，過年吃餃子是很多家庭的＿＿。",
    "opts": [
     "习惯",
     "传统",
     "风格"
    ],
    "optsT": [
     "習慣",
     "傳統",
     "風格"
    ],
    "ok": [
     0,
     1
    ],
    "why": "习惯 es «costumbre, hábito» y 传统 es «tradición»: las dos sirven para algo que muchas familias hacen cada año. 风格 es «estilo» (de una obra o de una persona) y no se dice de lo que hace una familia en una fiesta.",
    "delTexto": false
   }
  ],
  "capa2": {
   "notas": [
    {
     "zh": "谁吃到了，新的一年就会很顺利。",
     "zhT": "誰吃到了，新的一年就會很順利。",
     "es": "谁…就…: acá 谁 no pregunta «¿quién?»; significa «el que…, ese…»."
    }
   ],
   "colocaciones": [
    {
     "zh": "包饺子",
     "zhT": "包餃子",
     "es": "armar dumplings (envolverlos)"
    },
    {
     "zh": "放鞭炮",
     "zhT": "放鞭炮",
     "es": "tirar petardos"
    }
   ]
  }
 },
 {
  "id": "rx-h5-ruido",
  "schema": 2,
  "tipo": "examen",
  "nivel": 5,
  "genero": "expositivo",
  "emoji": "🎧",
  "revision": "pendiente",
  "nota": "Texto original; los datos son ilustrativos",
  "titulo": {
   "zh": "声音会影响注意力吗？",
   "zhT": "聲音會影響注意力嗎？",
   "es": "¿Los sonidos afectan la atención?"
  },
  "parrafos": [
   {
    "zh": "很多人习惯在有声音的地方学习。有人说，有一点声音反而能让人更专心；也有人觉得太吵了，根本没办法集中注意力。声音到底会不会影响注意力呢？研究人员做了一个实验。",
    "zhT": "很多人習慣在有聲音的地方學習。有人說，有一點聲音反而能讓人更專心；也有人覺得太吵了，根本沒辦法集中注意力。聲音到底會不會影響注意力呢？研究人員做了一個實驗。",
    "es": "Mucha gente suele estudiar en lugares con sonido. Hay quienes dicen que un poco de sonido, al contrario, ayuda a concentrarse mejor; otros piensan que hay demasiado ruido y que así no hay manera de mantener la atención. ¿Los sonidos afectan realmente la atención? Unos investigadores hicieron un experimento."
   },
   {
    "zh": "实验有六十名志愿者。研究人员请他们在三种环境里读文章、回答题目。三种环境里的题目都一样，有简单的，也有复杂的。第一种环境非常安静，第二种有普通的说话声，第三种有很大的噪音，像在马路旁边一样。",
    "zhT": "實驗有六十名志願者。研究人員請他們在三種環境裡讀文章、回答題目。三種環境裡的題目都一樣，有簡單的，也有複雜的。第一種環境非常安靜，第二種有普通的說話聲，第三種有很大的噪音，像在馬路旁邊一樣。",
    "es": "El experimento contó con sesenta voluntarios. Los investigadores les pidieron que leyeran textos y respondieran preguntas en tres ambientes. Las preguntas eran las mismas en los tres ambientes, y había tanto simples como complejas. El primer ambiente era muy silencioso; el segundo tenía voces normales; el tercero tenía mucho ruido, como junto a una calle."
   },
   {
    "zh": "结果显示，在安静的环境里，参加的人平均答对了百分之八十五的题；有普通说话声时，大约是百分之八十；而在噪音很大的环境里，只有百分之六十左右。可见，噪音很大时，答对的题目会明显减少。研究人员还发现，声音对简单的题目影响不大，但题目越复杂，干扰就越大。",
    "zhT": "結果顯示，在安靜的環境裡，參加的人平均答對了百分之八十五的題；有普通說話聲時，大約是百分之八十；而在噪音很大的環境裡，只有百分之六十左右。可見，噪音很大時，答對的題目會明顯減少。研究人員還發現，聲音對簡單的題目影響不大，但題目越複雜，干擾就越大。",
    "es": "Los resultados muestran que, en el ambiente silencioso, los participantes respondieron bien, en promedio, el 85 % de las preguntas; con voces normales fue de alrededor del 80 %; y en el ambiente con mucho ruido fue de solo alrededor del 60 %. Se ve, entonces, que cuando hay mucho ruido se responden bien claramente menos preguntas. Los investigadores también encontraron que el sonido casi no afecta las preguntas simples, pero cuanto más compleja es la pregunta, mayor es la interferencia."
   },
   {
    "zh": "研究人员认为，每个人的习惯并不相同，结果不一定适合所有人。不过，他们提出了几点建议：复杂的工作，最好选择安静的地方；做简单的事情时，有一点声音也没关系；如果只能在吵的地方，可以戴上耳机。",
    "zhT": "研究人員認為，每個人的習慣並不相同，結果不一定適合所有人。不過，他們提出了幾點建議：複雜的工作，最好選擇安靜的地方；做簡單的事情時，有一點聲音也沒關係；如果只能在吵的地方，可以戴上耳機。",
    "es": "Los investigadores creen que los hábitos de cada persona no son iguales y que el resultado no sirve necesariamente para todos. Aun así, hicieron algunas sugerencias: para un trabajo complejo, lo mejor es elegir un lugar silencioso; para hacer cosas simples, no importa que haya un poco de sonido; y si solo se puede estar en un lugar ruidoso, se pueden usar auriculares."
   }
  ],
  "largo": 347,
  "glosario": [
   {
    "zh": "噪音",
    "zhT": "噪音",
    "categoria": "sustantivo",
    "es": "ruido (sonido fuerte y molesto)",
    "nivelLista": 9,
    "fueraDeNivel": true
   },
   {
    "zh": "干扰",
    "zhT": "干擾",
    "categoria": "verbo",
    "es": "interferir, perturbar, estorbar",
    "nivelLista": 5,
    "fueraDeNivel": false
   },
   {
    "zh": "集中",
    "zhT": "集中",
    "categoria": "verbo",
    "es": "concentrar, centrar (la atención)",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "安静",
    "zhT": "安靜",
    "categoria": "adjetivo",
    "es": "silencioso, tranquilo",
    "nivelLista": 2,
    "fueraDeNivel": false
   },
   {
    "zh": "研究",
    "zhT": "研究",
    "categoria": "sustantivo",
    "es": "investigación (研究人员: investigadores)",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "志愿者",
    "zhT": "志願者",
    "categoria": "sustantivo",
    "es": "voluntario",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "实验",
    "zhT": "實驗",
    "categoria": "sustantivo",
    "es": "experimento",
    "nivelLista": 3,
    "fueraDeNivel": false
   },
   {
    "zh": "平均",
    "zhT": "平均",
    "categoria": "adverbio",
    "es": "en promedio, en término medio",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "减少",
    "zhT": "減少",
    "categoria": "verbo",
    "es": "disminuir, hacerse menos",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "反而",
    "zhT": "反而",
    "categoria": "adverbio",
    "es": "al contrario, en cambio (contra lo que se esperaba)",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "耳机",
    "zhT": "耳機",
    "categoria": "sustantivo",
    "es": "auriculares",
    "nivelLista": 4,
    "fueraDeNivel": false
   },
   {
    "zh": "建议",
    "zhT": "建議",
    "categoria": "sustantivo",
    "es": "sugerencia, recomendación",
    "nivelLista": 3,
    "fueraDeNivel": false
   }
  ],
  "comprension": [
   {
    "tipo": "idea",
    "qZh": "这篇文章主要介绍了什么？",
    "qZhT": "這篇文章主要介紹了什麼？",
    "es": "¿Qué presenta principalmente el artículo?",
    "opts": [
     "Un experimento sobre cómo el sonido afecta la atención y algunas recomendaciones",
     "Varios tipos de música adecuados para escuchar al estudiar",
     "Por qué los sonidos de la ciudad son cada vez más fuertes",
     "La experiencia personal de universitarios que participaron en el experimento"
    ],
    "optsZh": [
     "一次关于声音如何影响注意力的实验和一些建议",
     "几种适合学习时听的音乐",
     "为什么城市里的声音越来越大",
     "大学生参加实验的个人经历"
    ],
    "optsZhT": [
     "一次關於聲音如何影響注意力的實驗和一些建議",
     "幾種適合學習時聽的音樂",
     "為什麼城市裡的聲音越來越大",
     "大學生參加實驗的個人經歷"
    ],
    "why": "El texto plantea la pregunta «声音到底会不会影响注意力», describe el experimento con sus resultados y termina con recomendaciones.",
    "whyNot": [
     "El texto no habla de música: trata de los sonidos en general (voces, ruido) y de su efecto en la atención.",
     "El texto no explica por qué hay más ruido en las ciudades: estudia qué efecto tiene el sonido.",
     "Los voluntarios son los participantes del experimento, pero el texto no cuenta sus vivencias: da promedios y porcentajes."
    ]
   },
   {
    "tipo": "detalle",
    "qZh": "在哪种环境里，答对的题最少？",
    "qZhT": "在哪種環境裡，答對的題最少？",
    "es": "¿En qué ambiente se respondieron bien menos preguntas?",
    "opts": [
     "En el ambiente con mucho ruido",
     "En el ambiente muy silencioso",
     "En el ambiente con voces normales",
     "Los tres ambientes fueron parecidos"
    ],
    "optsZh": [
     "声音非常大的环境",
     "非常安静的环境",
     "有普通说话声的环境",
     "三种环境都差不多"
    ],
    "optsZhT": [
     "聲音非常大的環境",
     "非常安靜的環境",
     "有普通說話聲的環境",
     "三種環境都差不多"
    ],
    "why": "El texto dice que «在噪音很大的环境里，只有百分之六十左右»: es el porcentaje más bajo de los tres.",
    "whyNot": [
     "En silencio fue donde más acertaron: alrededor del 85 %.",
     "Con voces normales acertaron alrededor del 80 %, casi lo mismo que en silencio.",
     "Sí hubo una diferencia clara: del 85 % al 60 %."
    ]
   },
   {
    "tipo": "inferencia",
    "qZh": "有两个人：一个要准备一场很难的考试，一个要整理自己的房间。根据文章，下面哪种做法最合适？",
    "qZhT": "有兩個人：一個要準備一場很難的考試，一個要整理自己的房間。根據文章，下面哪種做法最合適？",
    "es": "Una persona tiene que preparar un examen muy difícil y otra, ordenar su cuarto. Según el artículo, ¿qué conducta es la más adecuada?",
    "opts": [
     "Quien prepara el examen debería buscar un lugar silencioso; quien ordena el cuarto no necesariamente",
     "Los dos deberían buscar el lugar más silencioso, porque el sonido siempre es malo",
     "Los dos pueden hacerlo en un lugar ruidoso, porque el sonido no influye",
     "Quien prepara el examen puede estar en un lugar ruidoso; quien ordena el cuarto debería buscar silencio"
    ],
    "optsZh": [
     "准备考试的人最好找安静的地方，整理房间的人不一定需要",
     "两个人都应该找最安静的地方，因为声音总是不好",
     "两个人都可以在吵的地方做，因为声音没有影响",
     "准备考试的人可以在吵的地方，整理房间的人应该找安静的地方"
    ],
    "optsZhT": [
     "準備考試的人最好找安靜的地方，整理房間的人不一定需要",
     "兩個人都應該找最安靜的地方，因為聲音總是不好",
     "兩個人都可以在吵的地方做，因為聲音沒有影響",
     "準備考試的人可以在吵的地方，整理房間的人應該找安靜的地方"
    ],
    "why": "La regla del texto es «复杂的工作，最好选择安静的地方» y «做简单的事情时，有一点声音也没关系». El texto no menciona exámenes ni cuartos: hay que aplicar la regla a dos casos nuevos (un examen difícil es un trabajo complejo; ordenar el cuarto es algo simple).",
    "whyNot": [
     "El texto no dice que cualquier sonido sea malo: para lo simple, un poco de sonido no importa.",
     "Para lo complejo el texto recomienda un lugar silencioso: el sonido interfiere más cuanto más complejo es lo que se hace.",
     "Está al revés: lo complejo (el examen difícil) pide silencio y lo simple (ordenar el cuarto) tolera algo de sonido."
    ]
   },
   {
    "tipo": "vocabulario",
    "qZh": "文章说“题目越复杂，干扰就越大”，其中的“干扰”是什么意思？",
    "qZhT": "文章說“題目越複雜，干擾就越大”，其中的“干擾”是什麼意思？",
    "es": "El artículo dice «cuanto más compleja la pregunta, mayor la interferencia»; ¿qué significa «干扰» ahí?",
    "opts": [
     "Hace que las cosas no puedan salir bien",
     "Ayuda a terminar más rápido",
     "Hace que a uno le resulte muy interesante",
     "Baja el volumen del sonido"
    ],
    "optsZh": [
     "让事情不能顺利进行",
     "帮助人更快完成",
     "让人觉得很有意思",
     "把声音变小"
    ],
    "optsZhT": [
     "讓事情不能順利進行",
     "幫助人更快完成",
     "讓人覺得很有意思",
     "把聲音變小"
    ],
    "why": "En «题目越复杂，干扰就越大» el sonido estorba más cuanto más compleja es la pregunta: 干扰 es «interferir, perturbar».",
    "whyNot": [
     "Es lo contrario: el sonido perjudica, no ayuda.",
     "El texto no habla de interés ni de diversión.",
     "El sonido es la causa de la interferencia; 干扰 no significa bajar el volumen."
    ]
   },
   {
    "tipo": "vf",
    "qZh": "有普通说话声时，结果比安静时更好。",
    "qZhT": "有普通說話聲時，結果比安靜時更好。",
    "es": "Con voces normales el resultado fue mejor que en silencio.",
    "vf": false,
    "why": "Con voces normales el resultado fue de alrededor del 80 % («有普通说话声时，大约是百分之八十»), algo menos que el 85 % del ambiente silencioso."
   }
  ],
  "banco": {
   "huecos": [
    {
     "zh": "第一种环境非常＿＿",
     "zhT": "第一種環境非常＿＿",
     "resp": "安静",
     "respT": "安靜"
    },
    {
     "zh": "根本没办法＿＿注意力",
     "zhT": "根本沒辦法＿＿注意力",
     "resp": "集中",
     "respT": "集中"
    },
    {
     "zh": "参加的人＿＿答对了百分之八十五的题",
     "zhT": "參加的人＿＿答對了百分之八十五的題",
     "resp": "平均",
     "respT": "平均"
    },
    {
     "zh": "答对的题目会明显＿＿",
     "zhT": "答對的題目會明顯＿＿",
     "resp": "减少",
     "respT": "減少"
    },
    {
     "zh": "他们提出了几点＿＿",
     "zhT": "他們提出了幾點＿＿",
     "resp": "建议",
     "respT": "建議"
    },
    {
     "zh": "可以戴上＿＿",
     "zhT": "可以戴上＿＿",
     "resp": "耳机",
     "respT": "耳機"
    }
   ],
   "palabras": [
    "安静",
    "集中",
    "平均",
    "减少",
    "建议",
    "耳机",
    "提高",
    "价格"
   ],
   "palabrasT": [
    "安靜",
    "集中",
    "平均",
    "減少",
    "建議",
    "耳機",
    "提高",
    "價格"
   ]
  },
  "parecidas": [
   {
    "zh": "声音太大，会＿＿我们的学习。",
    "zhT": "聲音太大，會＿＿我們的學習。",
    "opts": [
     "影响",
     "打扰",
     "帮助"
    ],
    "optsT": [
     "影響",
     "打擾",
     "幫助"
    ],
    "ok": [
     0,
     1
    ],
    "why": "影响 («afectar») y 打扰 («perturbar, molestar») sirven: un sonido demasiado fuerte perjudica el estudio. 帮助 («ayudar») dice lo contrario.",
    "delTexto": false
   },
   {
    "zh": "做复杂的工作时，最好＿＿一个安静的地方。",
    "zhT": "做複雜的工作時，最好＿＿一個安靜的地方。",
    "opts": [
     "选择",
     "寻找",
     "忘记"
    ],
    "optsT": [
     "選擇",
     "尋找",
     "忘記"
    ],
    "ok": [
     0,
     1
    ],
    "why": "选择 («elegir») y 寻找 («buscar») encajan con «un lugar silencioso». 忘记 («olvidar») es gramatical pero no tiene sentido aquí: nadie recomienda olvidar un lugar tranquilo para hacer un trabajo complejo.",
    "delTexto": false
   },
   {
    "zh": "在安静的环境里，事情往往做得更＿＿。",
    "zhT": "在安靜的環境裡，事情往往做得更＿＿。",
    "opts": [
     "顺利",
     "轻松",
     "热闹"
    ],
    "optsT": [
     "順利",
     "輕鬆",
     "熱鬧"
    ],
    "ok": [
     0,
     1
    ],
    "why": "顺利 («sin contratiempos») y 轻松 («con facilidad») describen cómo sale una tarea en silencio. 热闹 («animado, bullicioso») describe un lugar con gente y sonido, no cómo se hace algo.",
    "delTexto": false
   }
  ]
 }
]);
