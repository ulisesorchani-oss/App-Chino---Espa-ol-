// ============================================================
// readings-examen.js — LECTURAS tipo examen · ESQUEMA v2 (solo datos, sin pantalla)
// ------------------------------------------------------------
// GENERADO por tools/build-readings-examen.js desde tools/lecturas-examen/fuente-*.json — NO editar a mano:
// tools/check-readings.js vuelve a calcular largo, fueraDeNivel y el tradicional y falla si no coinciden.
// Textos originales escritos para la app. Nivel aproximado, NO oficial. Tradicional: OpenCC s2tw (ida y vuelta tw2s verificada).
//
// Aditivo y separado de window.READINGS (v1): la rama de interfaz unificará ambas en una sola fuente.
//   { id, schema: 2, tipo: 'examen', nivel: 3|4|5, genero, emoji, revision: 'pendiente'|'nativo',
//     titulo: { zh, zhT, es },
//     parrafos: [{ zh, zhT, es }],                     // el texto, por párrafos (visible durante las preguntas)
//     largo,                                           // hanzi del texto — CALCULADO
//     glosario: [{ zh, zhT, categoria, es, fueraDeNivel }],  // 8–12; fueraDeNivel CALCULADO (pinyin: pinyinFor en pantalla)
//     comprension: [ { tipo: idea|detalle|vocabulario, es, opts[], why, whyNot[] }   // opts[0] = CORRECTA (se baraja al mostrar)
//                  | { tipo: 'vf', es, vf: true|false, why } ],                    // verdadero/falso: la pantalla lo resuelve la rama de interfaz
//     banco: { huecos: [{ zh (con ＿＿), zhT, resp, respT }], palabras[], palabrasT[] },  // palabras = respuestas + 1–2 sobrantes
//     parecidas: [{ zh (con ＿＿), zhT, opts[], optsT[], ok: [índices válidos], why }],   // desde HSK 4
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
  "revision": "pendiente",
  "titulo": {
   "zh": "错过的火车",
   "zhT": "錯過的火車",
   "es": "El tren que se fue"
  },
  "parrafos": [
   {
    "zh": "小林要去上海参加朋友的婚礼。早上六点他就出门了，可是路上堵车，到火车站的时候，火车已经开走了。",
    "zhT": "小林要去上海參加朋友的婚禮。早上六點他就出門了，可是路上堵車，到火車站的時候，火車已經開走了。",
    "es": "Xiao Lin va a Shanghái a la boda de un amigo. Salió de casa a las seis de la mañana, pero había atasco en el camino y, cuando llegó a la estación, el tren ya se había ido."
   },
   {
    "zh": "他很着急，马上给朋友打电话。朋友笑着说：“别担心，婚礼下午才开始，你坐下一班车吧。”",
    "zhT": "他很著急，馬上給朋友打電話。朋友笑著說：“別擔心，婚禮下午才開始，你坐下一班車吧。”",
    "es": "Muy nervioso, llamó enseguida a su amigo. El amigo le dijo, riendo: «No te preocupes, la boda empieza recién por la tarde; tomá el próximo tren»."
   },
   {
    "zh": "他松了一口气，在车站旁边的小饭馆吃了一碗面。没想到下一班车也晚点了一个小时。他到的时候，婚礼已经开始了，他一边擦汗，一边悄悄找座位，可是大家还是都看见了他。",
    "zhT": "他鬆了一口氣，在車站旁邊的小飯館吃了一碗麵。沒想到下一班車也晚點了一個小時。他到的時候，婚禮已經開始了，他一邊擦汗，一邊悄悄找座位，可是大家還是都看見了他。",
    "es": "Suspiró aliviado y comió un bol de fideos en un pequeño restaurante junto a la estación. Pero, para su sorpresa, el siguiente tren también se retrasó una hora. Cuando llegó, la boda ya había empezado; mientras se secaba el sudor buscaba su asiento sin hacer ruido, pero igual todos lo vieron."
   }
  ],
  "largo": 146,
  "glosario": [
   {
    "zh": "参加",
    "zhT": "參加",
    "categoria": "verbo",
    "es": "asistir, participar en",
    "fueraDeNivel": false
   },
   {
    "zh": "婚礼",
    "zhT": "婚禮",
    "categoria": "sustantivo",
    "es": "la boda",
    "fueraDeNivel": false
   },
   {
    "zh": "堵车",
    "zhT": "堵車",
    "categoria": "verbo",
    "es": "haber atasco",
    "fueraDeNivel": false
   },
   {
    "zh": "着急",
    "zhT": "著急",
    "categoria": "adjetivo",
    "es": "estar impaciente, nervioso",
    "fueraDeNivel": false
   },
   {
    "zh": "晚点",
    "zhT": "晚點",
    "categoria": "verbo",
    "es": "retrasarse (un transporte)",
    "fueraDeNivel": false
   },
   {
    "zh": "松了一口气",
    "zhT": "鬆了一口氣",
    "categoria": "expresión",
    "es": "suspirar aliviado",
    "fueraDeNivel": true
   },
   {
    "zh": "没想到",
    "zhT": "沒想到",
    "categoria": "expresión",
    "es": "no imaginaba que, para sorpresa de",
    "fueraDeNivel": false
   },
   {
    "zh": "一边…一边…",
    "zhT": "一邊…一邊…",
    "categoria": "estructura",
    "es": "mientras…, a la vez que…",
    "fueraDeNivel": false
   },
   {
    "zh": "擦汗",
    "zhT": "擦汗",
    "categoria": "expresión",
    "es": "secarse el sudor",
    "fueraDeNivel": true
   },
   {
    "zh": "悄悄",
    "zhT": "悄悄",
    "categoria": "adverbio",
    "es": "en silencio, sin hacer ruido",
    "fueraDeNivel": true
   },
   {
    "zh": "座位",
    "zhT": "座位",
    "categoria": "sustantivo",
    "es": "el asiento",
    "fueraDeNivel": false
   }
  ],
  "comprension": [
   {
    "tipo": "detalle",
    "es": "¿Por qué Xiao Lin perdió el primer tren?",
    "opts": [
     "Había mucho tráfico en el camino.",
     "Salió de su casa demasiado tarde.",
     "Se equivocó de estación.",
     "Su amigo lo llamó por teléfono."
    ],
    "why": "El texto dice que salió a las seis, pero «路上堵车» (había atasco en el camino).",
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
  "revision": "pendiente",
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
    "es": "La encuesta también mostró que los estudiantes que siguen con el celular después de las once de la noche se sienten más cansados en clase al día siguiente. El docente recomienda dejar el celular en otra habitación una hora antes de dormir."
   }
  ],
  "largo": 146,
  "glosario": [
   {
    "zh": "调查",
    "zhT": "調查",
    "categoria": "verbo / sustantivo",
    "es": "encuestar; la encuesta",
    "fueraDeNivel": false
   },
   {
    "zh": "超过",
    "zhT": "超過",
    "categoria": "verbo",
    "es": "superar, pasar de",
    "fueraDeNivel": false
   },
   {
    "zh": "百分之",
    "zhT": "百分之",
    "categoria": "estructura",
    "es": "por ciento (百分之四十 = 40 %)",
    "fueraDeNivel": true
   },
   {
    "zh": "其他",
    "zhT": "其他",
    "categoria": "pronombre",
    "es": "los demás, otros",
    "fueraDeNivel": false
   },
   {
    "zh": "比较",
    "zhT": "比較",
    "categoria": "adverbio",
    "es": "relativamente, bastante",
    "fueraDeNivel": false
   },
   {
    "zh": "大部分",
    "zhT": "大部分",
    "categoria": "sustantivo",
    "es": "la mayor parte",
    "fueraDeNivel": false
   },
   {
    "zh": "聊天",
    "zhT": "聊天",
    "categoria": "verbo",
    "es": "charlar, chatear",
    "fueraDeNivel": true
   },
   {
    "zh": "查资料",
    "zhT": "查資料",
    "categoria": "expresión",
    "es": "buscar información",
    "fueraDeNivel": false
   },
   {
    "zh": "容易",
    "zhT": "容易",
    "categoria": "adjetivo",
    "es": "fácil; propenso a",
    "fueraDeNivel": false
   },
   {
    "zh": "建议",
    "zhT": "建議",
    "categoria": "verbo",
    "es": "recomendar, sugerir",
    "fueraDeNivel": false
   },
   {
    "zh": "视频",
    "zhT": "視頻",
    "categoria": "sustantivo",
    "es": "el video",
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
  "tipo": "examen",
  "nivel": 4,
  "genero": "cultural",
  "emoji": "🧧",
  "revision": "pendiente",
  "titulo": {
   "zh": "贴春联",
   "zhT": "貼春聯",
   "es": "Pegar los pareados de Año Nuevo"
  },
  "parrafos": [
   {
    "zh": "春节前，中国的家家户户都会在门口贴红色的春联。春联是两句字数相同、意思相配的话，写在红纸上，左右各一句。",
    "zhT": "春節前，中國的家家戶戶都會在門口貼紅色的春聯。春聯是兩句字數相同、意思相配的話，寫在紅紙上，左右各一句。",
    "es": "Antes de la Fiesta de la Primavera, todas las casas de China pegan en la puerta pareados rojos. Son dos frases con el mismo número de caracteres y de sentido complementario, escritas en papel rojo, una a cada lado."
   },
   {
    "zh": "按传统习惯，站在门外看，上联贴在右边，下联贴在左边，门上面还会贴一张短短的横批。春联里常常有“平安”“幸福”“健康”这样的好词，人们希望新的一年一切顺利。",
    "zhT": "按傳統習慣，站在門外看，上聯貼在右邊，下聯貼在左邊，門上面還會貼一張短短的橫批。春聯裡常常有“平安”“幸福”“健康”這樣的好詞，人們希望新的一年一切順利。",
    "es": "Según la costumbre tradicional, mirando la puerta desde afuera, el primer verso (上联) se pega a la derecha y el segundo (下联) a la izquierda; arriba de la puerta se suele pegar además una tira corta, el 横批. Los pareados llevan a menudo palabras auspiciosas como «paz», «felicidad» y «salud»: la gente desea que todo salga bien en el año nuevo."
   },
   {
    "zh": "有的家庭自己用毛笔写春联，有的去市场买现成的。不管是写的还是买的，贴上春联以后，屋子里就有了过年的气氛。",
    "zhT": "有的家庭自己用毛筆寫春聯，有的去市場買現成的。不管是寫的還是買的，貼上春聯以後，屋子裡就有了過年的氣氛。",
    "es": "Algunas familias escriben los pareados con pincel; otras los compran ya hechos en el mercado. Sean escritos o comprados, una vez pegados la casa ya tiene el ambiente de las fiestas."
   }
  ],
  "largo": 157,
  "glosario": [
   {
    "zh": "春联",
    "zhT": "春聯",
    "categoria": "sustantivo",
    "es": "pareado de Año Nuevo",
    "fueraDeNivel": true
   },
   {
    "zh": "家家户户",
    "zhT": "家家戶戶",
    "categoria": "expresión",
    "es": "todas las familias, cada casa",
    "fueraDeNivel": true
   },
   {
    "zh": "相配",
    "zhT": "相配",
    "categoria": "verbo",
    "es": "combinar, hacer juego",
    "fueraDeNivel": true
   },
   {
    "zh": "上联",
    "zhT": "上聯",
    "categoria": "sustantivo",
    "es": "primer verso del pareado",
    "fueraDeNivel": true
   },
   {
    "zh": "下联",
    "zhT": "下聯",
    "categoria": "sustantivo",
    "es": "segundo verso del pareado",
    "fueraDeNivel": true
   },
   {
    "zh": "横批",
    "zhT": "橫批",
    "categoria": "sustantivo",
    "es": "tira horizontal sobre la puerta",
    "fueraDeNivel": true
   },
   {
    "zh": "平安",
    "zhT": "平安",
    "categoria": "adjetivo",
    "es": "en paz, a salvo",
    "fueraDeNivel": false
   },
   {
    "zh": "顺利",
    "zhT": "順利",
    "categoria": "adjetivo",
    "es": "sin contratiempos",
    "fueraDeNivel": false
   },
   {
    "zh": "毛笔",
    "zhT": "毛筆",
    "categoria": "sustantivo",
    "es": "pincel de escritura",
    "fueraDeNivel": true
   },
   {
    "zh": "现成",
    "zhT": "現成",
    "categoria": "adjetivo",
    "es": "ya hecho, listo para usar",
    "fueraDeNivel": true
   },
   {
    "zh": "气氛",
    "zhT": "氣氛",
    "categoria": "sustantivo",
    "es": "el ambiente",
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
     "es": "pegar los pareados de Año Nuevo"
    },
    {
     "zh": "过年的气氛",
     "zhT": "過年的氣氛",
     "es": "el ambiente de las fiestas de Año Nuevo"
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
  "revision": "pendiente",
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
    "zh": "我想了很久，最后选了第二个。因为我想省点儿钱，而且可以在地铁上看书，时间也不算浪费。",
    "zhT": "我想了很久，最後選了第二個。因為我想省點兒錢，而且可以在地鐵上看書，時間也不算浪費。",
    "es": "Lo pensé mucho y al final elegí el segundo. Quiero ahorrar un poco y, además, puedo leer en el subte, así que el tiempo tampoco se desperdicia."
   }
  ],
  "largo": 122,
  "glosario": [
   {
    "zh": "搬家",
    "zhT": "搬家",
    "categoria": "verbo",
    "es": "mudarse",
    "fueraDeNivel": false
   },
   {
    "zh": "一直",
    "zhT": "一直",
    "categoria": "adverbio",
    "es": "todo el tiempo, sin parar",
    "fueraDeNivel": false
   },
   {
    "zh": "郊区",
    "zhT": "郊區",
    "categoria": "sustantivo",
    "es": "las afueras",
    "fueraDeNivel": true
   },
   {
    "zh": "地铁",
    "zhT": "地鐵",
    "categoria": "sustantivo",
    "es": "el subte, el metro",
    "fueraDeNivel": false
   },
   {
    "zh": "不过",
    "zhT": "不過",
    "categoria": "conjunción",
    "es": "pero, sin embargo",
    "fueraDeNivel": false
   },
   {
    "zh": "房间",
    "zhT": "房間",
    "categoria": "sustantivo",
    "es": "la habitación",
    "fueraDeNivel": false
   },
   {
    "zh": "省",
    "zhT": "省",
    "categoria": "verbo",
    "es": "ahorrar",
    "fueraDeNivel": false
   },
   {
    "zh": "而且",
    "zhT": "而且",
    "categoria": "conjunción",
    "es": "además, y también",
    "fueraDeNivel": false
   },
   {
    "zh": "浪费",
    "zhT": "浪費",
    "categoria": "verbo",
    "es": "desperdiciar",
    "fueraDeNivel": false
   },
   {
    "zh": "算",
    "zhT": "算",
    "categoria": "verbo",
    "es": "contar como, considerarse",
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
 }
]);
