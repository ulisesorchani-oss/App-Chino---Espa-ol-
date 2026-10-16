// ============================================================
// readings-pilot.js — LECTURAS tipo examen · PILOTO (HSK 3 y HSK 5)
// ------------------------------------------------------------
// SOLO DATOS (sin pantalla): la UI llega en una rama posterior. Todos los
// textos están escritos de cero para la app; ninguno es copia ni adaptación de
// un texto existente. Nivel aproximado, NO oficial.
//
// Archivo ADITIVO: concatena a window.READINGS (las lecciones graduadas
// siguen en window.GRADED_LESSONS; esto no las toca).
//
// Esquema por lectura:
//   { id, kind: 'reading', hsk,            // nivel aproximado (3 o 5 en el piloto)
//     genre,                              // narración | aviso | carta | artículo …
//     emoji, titleZh, titleZhT, titleEs, blurb,
//     names:  [zh]  / namesT: [zhT],       // nombres propios (no cuentan como fuera de nivel)
//     keywords: [{ zh, zhT, es }],         // palabras que se pre-enseñan (fuera de nivel o clave)
//     lines: [{ zh, zhT, es }],            // oraciones del texto (zhT: tradicional, s2tw)
//     questions: [{
//        type,                             // detalle | idea | inferencia | vocabulario
//        es, opts[],                       // pregunta y opciones en español; opts[0] = CORRECTA
//        qZh, qZhT, optsZh[], optsZhT[],   // solo desde HSK 5: la pregunta va en chino y «ver en español» muestra es/opts
//        why, whyT?,                       // por qué la correcta es correcta
//        whyNot[], whyNotT?                // una explicación por cada distractor (opts[1..])
//     }] }
// HSK 3: preguntas en español, 3 opciones. HSK 5: preguntas en chino, 4 opciones.
// El orden visible de las opciones se baraja al mostrar (opts[0] es solo el contrato).
// Control de nivel: tools/check-readings.js (≥ 90 % con las listas embebidas
// acumuladas HSK1..n; lo que queda fuera va en keywords/names).
// ============================================================
window.READINGS = (window.READINGS || []).concat([
 {
  "id": "rd-h3-montana",
  "kind": "reading",
  "hsk": 3,
  "genre": "narración",
  "emoji": "⛰️",
  "titleZh": "周末爬山",
  "titleZhT": "週末爬山",
  "titleEs": "Una excursión de fin de semana",
  "blurb": "Un plan que cambia por el pronóstico del tiempo. Comprensión de detalles.",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "山顶",
    "zhT": "山頂",
    "es": "la cima"
   },
   {
    "zh": "风景",
    "zhT": "風景",
    "es": "el paisaje"
   },
   {
    "zh": "天气预报",
    "zhT": "天氣預報",
    "es": "el pronóstico del tiempo"
   },
   {
    "zh": "出发",
    "zhT": "出發",
    "es": "salir, partir"
   }
  ],
  "lines": [
   {
    "zh": "这个周末，我本来想和朋友去爬山，可是天气预报说，星期六会下大雨。",
    "zhT": "這個週末，我本來想和朋友去爬山，可是天氣預報說，星期六會下大雨。",
    "es": "Este fin de semana yo pensaba ir a la montaña con unos amigos, pero el pronóstico decía que el sábado iba a llover fuerte."
   },
   {
    "zh": "所以我们决定改到星期天去。",
    "zhT": "所以我們決定改到星期天去。",
    "es": "Así que decidimos ir el domingo."
   },
   {
    "zh": "星期天早上，天气非常好，天上一点儿云也没有。",
    "zhT": "星期天早上，天氣非常好，天上一點兒雲也沒有。",
    "es": "El domingo por la mañana el tiempo estaba buenísimo: no había ni una nube en el cielo."
   },
   {
    "zh": "我们八点就出发了，差不多走了两个小时才到山顶。",
    "zhT": "我們八點就出發了，差不多走了兩個小時才到山頂。",
    "es": "Salimos a las ocho y caminamos casi dos horas hasta llegar a la cima."
   },
   {
    "zh": "在山上，我们一边吃东西，一边看风景。",
    "zhT": "在山上，我們一邊吃東西，一邊看風景。",
    "es": "Arriba, comimos algo mientras mirábamos el paisaje."
   },
   {
    "zh": "大家都觉得很累，可是都很高兴。",
    "zhT": "大家都覺得很累，可是都很高興。",
    "es": "Todos estábamos cansados, pero muy contentos."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Por qué cambiaron el día de la excursión?",
    "opts": [
     "Porque el pronóstico anunciaba lluvia fuerte para el sábado",
     "Porque uno de los amigos se enfermó",
     "Porque querían dormir hasta tarde el sábado"
    ],
    "why": "El texto dice «天气预报说，星期六会下大雨»: el motivo fue el pronóstico.",
    "whyT": "El texto dice «天氣預報說，星期六會下大雨»: el motivo fue el pronóstico.",
    "whyNot": [
     "Nadie se enferma en el texto.",
     "El texto no habla de sueño: el motivo es el clima."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Cuánto tardaron en llegar a la cima?",
    "opts": [
     "Casi dos horas",
     "Casi una hora",
     "Casi cuatro horas"
    ],
    "why": "«差不多走了两个小时»: casi dos horas.",
    "whyT": "«差不多走了兩個小時»: casi dos horas.",
    "whyNot": [
     "Una hora es la mitad de lo que dice el texto.",
     "«八点» (las ocho) es la hora de salida, no la duración."
    ],
    "whyNotT": [
     "Una hora es la mitad de lo que dice el texto.",
     "«八點» (las ocho) es la hora de salida, no la duración."
    ]
   },
   {
    "type": "idea",
    "es": "¿Cómo estaban al final de la excursión?",
    "opts": [
     "Cansados, pero contentos",
     "Tristes porque la lluvia arruinó el plan",
     "Enojados porque el pronóstico se equivocó"
    ],
    "why": "«大家都觉得很累，可是都很高兴»: cansados pero contentos.",
    "whyT": "«大家都覺得很累，可是都很高興»: cansados pero contentos.",
    "whyNot": [
     "No llovió: el domingo hizo buen tiempo.",
     "Nadie dice que el pronóstico fallara: cambiaron el día justamente por él."
    ]
   }
  ]
 },
 {
  "id": "rd-h3-aviso",
  "kind": "reading",
  "hsk": 3,
  "genre": "aviso",
  "emoji": "📢",
  "titleZh": "开会通知",
  "titleZhT": "開會通知",
  "titleEs": "Aviso de reunión",
  "blurb": "Un aviso breve de trabajo: fecha, lugar y qué hacer antes. Comprensión de detalles.",
  "names": [
   "小周"
  ],
  "namesT": [
   "小周"
  ],
  "keywords": [
   {
    "zh": "会议室",
    "zhT": "會議室",
    "es": "la sala de reuniones"
   },
   {
    "zh": "迟到",
    "zhT": "遲到",
    "es": "llegar tarde"
   },
   {
    "zh": "意见",
    "zhT": "意見",
    "es": "la opinión"
   },
   {
    "zh": "电子邮件",
    "zhT": "電子郵件",
    "es": "el correo electrónico"
   }
  ],
  "lines": [
   {
    "zh": "大家好：",
    "zhT": "大家好：",
    "es": "Hola a todos:"
   },
   {
    "zh": "下个星期三下午三点，我们要在二楼的会议室开会。",
    "zhT": "下個星期三下午三點，我們要在二樓的會議室開會。",
    "es": "El miércoles de la semana que viene a las tres de la tarde tenemos reunión en la sala del segundo piso."
   },
   {
    "zh": "这次会很重要，请大家不要迟到。",
    "zhT": "這次會很重要，請大家不要遲到。",
    "es": "Esta reunión es importante; por favor, no lleguen tarde."
   },
   {
    "zh": "开会以前，请每个人先看一下我发给大家的电子邮件，再想想自己的意见。",
    "zhT": "開會以前，請每個人先看一下我發給大家的電子郵件，再想想自己的意見。",
    "es": "Antes de la reunión, que cada uno lea el correo que les mandé y piense su propia opinión."
   },
   {
    "zh": "如果那天你有事，不能来，请在星期一以前告诉我。",
    "zhT": "如果那天你有事，不能來，請在星期一以前告訴我。",
    "es": "Si ese día tenés algo y no podés venir, avisame antes del lunes."
   },
   {
    "zh": "谢谢！小周",
    "zhT": "謝謝！小周",
    "es": "¡Gracias! Xiao Zhou"
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Cuándo y dónde es la reunión?",
    "opts": [
     "El miércoles de la semana próxima a las tres, en el segundo piso",
     "El lunes de la semana próxima a las tres, en el segundo piso",
     "El miércoles de la semana próxima a las tres, en la planta baja"
    ],
    "why": "«下个星期三下午三点… 二楼»: miércoles próximo, tres de la tarde, segundo piso.",
    "whyT": "«下個星期三下午三點… 二樓»: miércoles próximo, tres de la tarde, segundo piso.",
    "whyNot": [
     "El lunes es el plazo para avisar, no el día de la reunión.",
     "La planta baja es «一楼»; la reunión es en «二楼», el segundo piso."
    ],
    "whyNotT": [
     "El lunes es el plazo para avisar, no el día de la reunión.",
     "La planta baja es «一樓»; la reunión es en «二樓», el segundo piso."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Qué tiene que hacer cada persona antes de la reunión?",
    "opts": [
     "Leer el correo y pensar su opinión",
     "Preparar una presentación sobre el correo",
     "Llegar una hora antes a la sala"
    ],
    "why": "«请每个人先看一下…电子邮件，再想想自己的意见»: leer el correo y pensar la opinión.",
    "whyT": "«請每個人先看一下…電子郵件，再想想自己的意見»: leer el correo y pensar la opinión.",
    "whyNot": [
     "El aviso no pide ninguna presentación.",
     "Lo único que pide sobre la hora es no llegar tarde."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Qué tiene que hacer quien no pueda ir?",
    "opts": [
     "Avisar a Xiao Zhou antes del lunes",
     "Avisar a Xiao Zhou el mismo miércoles, antes de la hora",
     "Mandar a otra persona en su lugar sin avisar"
    ],
    "why": "«请在星期一以前告诉我»: hay que avisar antes del lunes.",
    "whyT": "«請在星期一以前告訴我»: hay que avisar antes del lunes.",
    "whyNot": [
     "El miércoles es el día de la reunión: el plazo es antes del lunes.",
     "El aviso no dice nada de mandar a otra persona."
    ]
   }
  ]
 },
 {
  "id": "rd-h3-bici",
  "kind": "reading",
  "hsk": 3,
  "genre": "narración",
  "emoji": "🚲",
  "titleZh": "学骑自行车",
  "titleZhT": "學騎自行車",
  "titleEs": "Aprender a andar en bici",
  "blurb": "Alguien aprende de adulto lo que no se animó a aprender de chico. Detalle e idea principal.",
  "names": [
   "小张"
  ],
  "namesT": [
   "小張"
  ],
  "keywords": [
   {
    "zh": "自行车",
    "zhT": "自行車",
    "es": "la bicicleta"
   },
   {
    "zh": "摔倒",
    "zhT": "摔倒",
    "es": "caerse"
   },
   {
    "zh": "同事",
    "zhT": "同事",
    "es": "el compañero de trabajo"
   },
   {
    "zh": "着急",
    "zhT": "著急",
    "es": "apurarse, desesperarse"
   }
  ],
  "lines": [
   {
    "zh": "我二十岁才学会骑自行车。",
    "zhT": "我二十歲才學會騎自行車。",
    "es": "Recién a los veinte años aprendí a andar en bicicleta."
   },
   {
    "zh": "小时候，我很怕摔倒，所以一直不敢学。",
    "zhT": "小時候，我很怕摔倒，所以一直不敢學。",
    "es": "De chico me daba mucho miedo caerme, así que nunca me animé a aprender."
   },
   {
    "zh": "去年夏天，我的同事小张说要教我。",
    "zhT": "去年夏天，我的同事小張說要教我。",
    "es": "El verano pasado, mi compañero de trabajo Xiao Zhang se ofreció a enseñarme."
   },
   {
    "zh": "第一天，我摔了三次，腿很疼，差点儿不想学了。",
    "zhT": "第一天，我摔了三次，腿很疼，差點兒不想學了。",
    "es": "El primer día me caí tres veces, me dolían las piernas y casi no quise seguir."
   },
   {
    "zh": "小张对我说：“别着急，慢慢骑，不要看脚，要看前面。”",
    "zhT": "小張對我說：“別著急，慢慢騎，不要看腳，要看前面。”",
    "es": "Xiao Zhang me dijo: «No te apures, andá despacio; no mires los pies, mirá hacia adelante»."
   },
   {
    "zh": "学了一个星期以后，我终于可以自己骑一段路了。",
    "zhT": "學了一個星期以後，我終於可以自己騎一段路了。",
    "es": "Después de una semana, por fin pude andar solo un buen tramo."
   },
   {
    "zh": "现在我每天骑车去上班，比坐公共汽车还快。",
    "zhT": "現在我每天騎車去上班，比坐公共汽車還快。",
    "es": "Ahora voy todos los días al trabajo en bici, y es más rápido que el colectivo."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Por qué no aprendió de chico?",
    "opts": [
     "Le daba miedo caerse",
     "No tenía una bicicleta propia",
     "Sus padres no lo dejaban salir"
    ],
    "why": "«小时候，我很怕摔倒，所以一直不敢学»: tenía miedo de caerse.",
    "whyT": "«小時候，我很怕摔倒，所以一直不敢學»: tenía miedo de caerse.",
    "whyNot": [
     "El texto no dice que le faltara la bicicleta.",
     "No se menciona a los padres."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Qué consejo le dio Xiao Zhang?",
    "opts": [
     "Mirar hacia adelante y no los pies",
     "Pedalear lo más rápido posible",
     "Practicar solo, de noche, sin público"
    ],
    "why": "«不要看脚，要看前面»: no mirar los pies, mirar adelante.",
    "whyT": "«不要看腳，要看前面»: no mirar los pies, mirar adelante.",
    "whyNot": [
     "Dijo lo contrario: «慢慢骑», andar despacio.",
     "No habla de practicar de noche."
    ],
    "whyNotT": [
     "Dijo lo contrario: «慢慢騎», andar despacio.",
     "No habla de practicar de noche."
    ]
   },
   {
    "type": "idea",
    "es": "¿Cómo va hoy al trabajo?",
    "opts": [
     "En bici, y llega antes que en colectivo",
     "En colectivo, que es más rápido que la bici",
     "En auto, con Xiao Zhang al volante"
    ],
    "why": "«现在我每天骑车去上班，比坐公共汽车还快»: en bici, más rápido que el colectivo.",
    "whyT": "«現在我每天騎車去上班，比坐公共汽車還快»: en bici, más rápido que el colectivo.",
    "whyNot": [
     "Dice que la bici es más rápida que el colectivo, no al revés.",
     "Xiao Zhang le enseñó a andar en bici; no lo lleva en auto."
    ]
   }
  ]
 },
 {
  "id": "rd-h3-colectivo",
  "kind": "reading",
  "hsk": 3,
  "genre": "narración",
  "emoji": "🚌",
  "titleZh": "坐错车",
  "titleZhT": "坐錯車",
  "titleEs": "El colectivo equivocado",
  "blurb": "Un error de línea y un amigo que viene al rescate. Orden de los hechos y causa.",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "窗外",
    "zhT": "窗外",
    "es": "afuera de la ventana"
   },
   {
    "zh": "原来",
    "zhT": "原來",
    "es": "resulta que"
   },
   {
    "zh": "看清楚",
    "zhT": "看清楚",
    "es": "ver bien, fijarse bien"
   },
   {
    "zh": "接",
    "zhT": "接",
    "es": "ir a buscar a alguien"
   }
  ],
  "lines": [
   {
    "zh": "昨天下班以后，我想去朋友家吃晚饭。",
    "zhT": "昨天下班以後，我想去朋友家吃晚飯。",
    "es": "Ayer, al salir del trabajo, quise ir a cenar a la casa de un amigo."
   },
   {
    "zh": "他家离公司不太远，坐三十二路公共汽车就可以到。",
    "zhT": "他家離公司不太遠，坐三十二路公共汽車就可以到。",
    "es": "Su casa no queda muy lejos de la oficina: con el colectivo 32 se llega."
   },
   {
    "zh": "可是我上车的时候一直在看手机，没有看清楚是几路车。",
    "zhT": "可是我上車的時候一直在看手機，沒有看清楚是幾路車。",
    "es": "Pero al subir yo estaba todo el tiempo con el celular y no miré bien qué línea era."
   },
   {
    "zh": "过了很久，我发现窗外的路我都不认识。",
    "zhT": "過了很久，我發現窗外的路我都不認識。",
    "es": "Pasó un buen rato y me di cuenta de que no reconocía ninguna de las calles de afuera."
   },
   {
    "zh": "原来我坐的是三十三路，不是三十二路！",
    "zhT": "原來我坐的是三十三路，不是三十二路！",
    "es": "¡Resulta que había subido al 33, no al 32!"
   },
   {
    "zh": "我马上下了车，给朋友打了电话。",
    "zhT": "我馬上下了車，給朋友打了電話。",
    "es": "Me bajé enseguida y llamé a mi amigo."
   },
   {
    "zh": "他笑着说：“别动，我开车去接你。”",
    "zhT": "他笑著說：“別動，我開車去接你。”",
    "es": "Se rio y me dijo: «No te muevas, voy a buscarte en auto»."
   },
   {
    "zh": "那天晚上，我们八点多才吃上饭。",
    "zhT": "那天晚上，我們八點多才吃上飯。",
    "es": "Esa noche recién pudimos cenar pasadas las ocho."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Qué colectivo tendría que haber tomado?",
    "opts": [
     "El 32",
     "El 33",
     "El 23"
    ],
    "why": "«坐三十二路公共汽车就可以到»: la línea correcta era el 32.",
    "whyT": "«坐三十二路公共汽車就可以到»: la línea correcta era el 32.",
    "whyNot": [
     "El 33 es el que tomó por error.",
     "El 23 no aparece en el texto."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Por qué se equivocó de línea?",
    "opts": [
     "Estaba mirando el celular y no vio qué línea era",
     "Se quedó dormido en el colectivo",
     "El chofer le dio mal el número"
    ],
    "why": "«上车的时候一直在看手机，没有看清楚是几路车».",
    "whyT": "«上車的時候一直在看手機，沒有看清楚是幾路車».",
    "whyNot": [
     "No se durmió: se dio cuenta mirando las calles por la ventana.",
     "El texto no menciona al chofer."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Qué hizo el amigo cuando lo llamó?",
    "opts": [
     "Fue a buscarlo en auto",
     "Le dijo que tomara un taxi",
     "Lo esperó en la parada"
    ],
    "why": "«别动，我开车去接你»: fue a buscarlo en auto.",
    "whyT": "«別動，我開車去接你»: fue a buscarlo en auto.",
    "whyNot": [
     "No le sugiere ningún taxi.",
     "Le dice «别动» (no te muevas) y va él a buscarlo; no hay parada de espera."
    ],
    "whyNotT": [
     "No le sugiere ningún taxi.",
     "Le dice «別動» (no te muevas) y va él a buscarlo; no hay parada de espera."
    ]
   }
  ]
 },
 {
  "id": "rd-h5-celular",
  "kind": "reading",
  "hsk": 5,
  "genre": "artículo",
  "emoji": "📱",
  "titleZh": "手机上的阅读",
  "titleZhT": "手機上的閱讀",
  "titleEs": "Leer en el celular",
  "blurb": "Un artículo breve sobre leer en pantalla y la atención. Idea principal e inferencia.",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "阅读",
    "zhT": "閱讀",
    "es": "la lectura"
   },
   {
    "zh": "打断",
    "zhT": "打斷",
    "es": "interrumpir"
   },
   {
    "zh": "静音",
    "zhT": "靜音",
    "es": "modo silencio"
   },
   {
    "zh": "设备",
    "zhT": "設備",
    "es": "el dispositivo"
   },
   {
    "zh": "纸质",
    "zhT": "紙質",
    "es": "de papel"
   }
  ],
  "lines": [
   {
    "zh": "近年来，越来越多的人习惯在手机上阅读。",
    "zhT": "近年來，越來越多的人習慣在手機上閱讀。",
    "es": "En los últimos años, cada vez más gente se acostumbra a leer en el celular."
   },
   {
    "zh": "一部手机就能装下几百本书，无论是在地铁上还是在排队的时候，随时都可以打开来看。",
    "zhT": "一部手機就能裝下幾百本書，無論是在地鐵上還是在排隊的時候，隨時都可以打開來看。",
    "es": "Un solo celular guarda cientos de libros, y tanto en el subte como haciendo cola se puede abrir y leer en cualquier momento."
   },
   {
    "zh": "不少人因此觉得，现在的人比以前读得更多了。",
    "zhT": "不少人因此覺得，現在的人比以前讀得更多了。",
    "es": "Por eso mucha gente piensa que hoy se lee más que antes."
   },
   {
    "zh": "然而，一些研究者发现，事情并没有这么简单。",
    "zhT": "然而，一些研究者發現，事情並沒有這麼簡單。",
    "es": "Sin embargo, algunos investigadores descubrieron que la cosa no es tan simple."
   },
   {
    "zh": "在手机上阅读，常常会被各种消息打断，读了几行，就忍不住去看看别的东西。",
    "zhT": "在手機上閱讀，常常會被各種消息打斷，讀了幾行，就忍不住去看看別的東西。",
    "es": "Al leer en el celular, los mensajes interrumpen a cada rato y, después de unas líneas, uno no puede evitar mirar otra cosa."
   },
   {
    "zh": "结果，虽然花在“阅读”上的时间不少，真正读进去、记在心里的内容却很有限。",
    "zhT": "結果，雖然花在“閱讀”上的時間不少，真正讀進去、記在心裡的內容卻很有限。",
    "es": "El resultado es que, aunque se dedica bastante tiempo a «leer», lo que realmente se absorbe y se recuerda es muy poco."
   },
   {
    "zh": "有一位老师建议学生这样做：每天固定留出半个小时，把手机调成静音，放到看不见的地方，只读一本纸质书。",
    "zhT": "有一位老師建議學生這樣做：每天固定留出半個小時，把手機調成靜音，放到看不見的地方，只讀一本紙質書。",
    "es": "Una maestra les propone a sus alumnos lo siguiente: reservar media hora fija por día, poner el celular en silencio, dejarlo donde no se vea y leer solo un libro de papel."
   },
   {
    "zh": "她说，重要的不是用什么设备，而是能不能安静下来。",
    "zhT": "她說，重要的不是用什麼設備，而是能不能安靜下來。",
    "es": "Ella dice que lo importante no es qué aparato se use, sino si uno logra aquietarse."
   },
   {
    "zh": "她自己试了一个月，发现读完的书比以前多了一倍。",
    "zhT": "她自己試了一個月，發現讀完的書比以前多了一倍。",
    "es": "Ella misma lo probó durante un mes y descubrió que terminó el doble de libros que antes."
   }
  ],
  "questions": [
   {
    "type": "idea",
    "qZh": "这篇文章主要想说明什么？",
    "qZhT": "這篇文章主要想說明什麼？",
    "es": "¿Qué quiere explicar principalmente el artículo?",
    "optsZh": [
     "花很多时间在手机上阅读，不等于读得好",
     "手机让人们读的书一年比一年少，越来越少",
     "纸质书比手机上的书便宜很多，所以更好",
     "老师不应该让学生把手机带进教室里来"
    ],
    "optsZhT": [
     "花很多時間在手機上閱讀，不等於讀得好",
     "手機讓人們讀的書一年比一年少，越來越少",
     "紙質書比手機上的書便宜很多，所以更好",
     "老師不應該讓學生把手機帶進教室裡來"
    ],
    "opts": [
     "Que dedicar mucho tiempo a leer en el celular no es lo mismo que leer bien",
     "Que el celular hace que se lean cada vez menos libros en el mundo",
     "Que los libros de papel son bastante más baratos que los del celular",
     "Que los maestros no deberían dejar entrar celulares al aula"
    ],
    "why": "El texto contrasta el mucho tiempo de «lectura» con lo poco que se retiene, y propone cómo concentrarse.",
    "whyNot": [
     "El texto no dice que se lean menos libros; dice que se lee con interrupciones.",
     "No compara precios.",
     "La maestra no prohíbe el celular: propone dejarlo en silencio y lejos durante media hora."
    ]
   },
   {
    "type": "detalle",
    "qZh": "研究者发现了什么？",
    "qZhT": "研究者發現了什麼？",
    "es": "¿Qué descubrieron los investigadores?",
    "optsZh": [
     "读的时间不少，但记住的内容很有限",
     "人们已经不再喜欢读书，只想看视频了",
     "手机上的书比纸质书更难读懂，也更贵",
     "大家都不愿意在地铁上和排队时看书"
    ],
    "optsZhT": [
     "讀的時間不少，但記住的內容很有限",
     "人們已經不再喜歡讀書，只想看視頻了",
     "手機上的書比紙質書更難讀懂，也更貴",
     "大家都不願意在地鐵上和排隊時看書"
    ],
    "opts": [
     "Que se lee bastante tiempo, pero se recuerda poco",
     "Que a la gente ya no le gusta leer y prefiere mirar videos",
     "Que los libros del celular son más difíciles de entender y más caros",
     "Que a nadie le gusta leer en el subte ni haciendo cola"
    ],
    "why": "«花在阅读上的时间不少，真正读进去、记在心里的内容却很有限».",
    "whyT": "«花在閱讀上的時間不少，真正讀進去、記在心裡的內容卻很有限».",
    "whyNot": [
     "El texto no dice que no les guste: dice que se distraen.",
     "No habla de dificultad de comprensión.",
     "Hacer cola es solo un ejemplo de dónde se lee."
    ]
   },
   {
    "type": "detalle",
    "qZh": "那位老师建议学生怎么做？",
    "qZhT": "那位老師建議學生怎麼做？",
    "es": "¿Qué les propone la maestra a sus alumnos?",
    "optsZh": [
     "每天固定半小时，把手机调成静音，只读一本纸质书",
     "每天在固定的时间读两个小时电子书",
     "每次上阅读课以前，把手机交给老师保管，下课再还给学生",
     "只在上班和下班坐地铁的路上读书"
    ],
    "optsZhT": [
     "每天固定半小時，把手機調成靜音，只讀一本紙質書",
     "每天在固定的時間讀兩個小時電子書",
     "每次上閱讀課以前，把手機交給老師保管，下課再還給學生",
     "只在上班和下班坐地鐵的路上讀書"
    ],
    "opts": [
     "Media hora fija por día, con el celular en silencio y un solo libro de papel",
     "Leer libros electrónicos dos horas por día, siempre a la misma hora",
     "Entregarle el celular a la maestra antes de cada clase de lectura",
     "Leer únicamente durante el viaje en subte, de ida y de vuelta"
    ],
    "why": "Es casi una cita del texto: «每天固定留出半个小时，把手机调成静音…只读一本纸质书».",
    "whyT": "Es casi una cita del texto: «每天固定留出半個小時，把手機調成靜音…只讀一本紙質書».",
    "whyNot": [
     "Son 30 minutos, no dos horas, y de papel.",
     "El texto no menciona entregar el celular.",
     "El subte aparece como ejemplo de dónde se lee con el celular, no como consejo."
    ]
   },
   {
    "type": "inferencia",
    "qZh": "“能不能安静下来”最可能是什么意思？",
    "qZhT": "“能不能安靜下來”最可能是什麼意思？",
    "es": "¿Qué significa más probablemente «能不能安静下来» (si uno logra aquietarse)?",
    "optsZh": [
     "能不能集中注意力，不被打扰",
     "能不能整整一个小时一句话也不说",
     "能不能关掉房间里所有的灯再看书",
     "能不能在很短的时间里很快睡着"
    ],
    "optsZhT": [
     "能不能集中注意力，不被打擾",
     "能不能整整一個小時一句話也不說",
     "能不能關掉房間裡所有的燈再看書",
     "能不能在很短的時間裡很快睡著"
    ],
    "opts": [
     "Si uno puede concentrarse sin que lo interrumpan",
     "Si uno puede pasar una hora entera sin decir una palabra",
     "Si uno puede apagar todas las luces de la habitación para leer",
     "Si uno puede dormirse en muy poco tiempo"
    ],
    "why": "El problema del texto son las interrupciones; «安静下来» es calmarse y concentrarse.",
    "whyT": "El problema del texto son las interrupciones; «安靜下來» es calmarse y concentrarse.",
    "whyNot": [
     "No se trata de hablar o no hablar.",
     "No hay nada sobre la luz.",
     "No se trata de dormir."
    ]
   }
  ]
 },
 {
  "id": "rd-h5-carta",
  "kind": "reading",
  "hsk": 5,
  "genre": "carta",
  "emoji": "✉️",
  "titleZh": "一封回信",
  "titleZhT": "一封回信",
  "titleEs": "Una carta de respuesta",
  "blurb": "Un amigo explica por qué dejó su trabajo estable. Motivos, comparación y actitud.",
  "names": [
   "小林",
   "阿明"
  ],
  "namesT": [
   "小林",
   "阿明"
  ],
  "keywords": [
   {
    "zh": "惭愧",
    "zhT": "慚愧",
    "es": "sentir vergüenza, quedar en deuda"
   },
   {
    "zh": "稳定",
    "zhT": "穩定",
    "es": "estable"
   },
   {
    "zh": "渐渐",
    "zhT": "漸漸",
    "es": "poco a poco"
   },
   {
    "zh": "邀请",
    "zhT": "邀請",
    "es": "la invitación"
   },
   {
    "zh": "与其…不如…",
    "zhT": "與其…不如…",
    "es": "más vale… que…"
   }
  ],
  "lines": [
   {
    "zh": "亲爱的小林：",
    "zhT": "親愛的小林：",
    "es": "Querido Xiaolin:"
   },
   {
    "zh": "好久不见！收到你的来信，我很高兴，也有点儿惭愧——这么长时间才给你回信。",
    "zhT": "好久不見！收到你的來信，我很高興，也有點兒慚愧——這麼長時間才給你回信。",
    "es": "¡Cuánto tiempo! Recibí tu carta y me alegré mucho, y también me dio un poco de vergüenza haber tardado tanto en responderte."
   },
   {
    "zh": "你问我为什么突然离开了那家大公司。",
    "zhT": "你問我為什麼突然離開了那家大公司。",
    "es": "Me preguntás por qué dejé de golpe aquella empresa grande."
   },
   {
    "zh": "说实话，这个决定我考虑了差不多一年。",
    "zhT": "說實話，這個決定我考慮了差不多一年。",
    "es": "Para ser sincero, esta decisión la estuve pensando casi un año."
   },
   {
    "zh": "在那里，收入不错，工作也很稳定，可是每天都在重复同样的事情，我渐渐发现自己不再进步了，甚至对工作失去了兴趣。",
    "zhT": "在那裡，收入不錯，工作也很穩定，可是每天都在重複同樣的事情，我漸漸發現自己不再進步了，甚至對工作失去了興趣。",
    "es": "Allá el sueldo era bueno y el trabajo, estable, pero todos los días repetía lo mismo; poco a poco noté que ya no progresaba e incluso que había perdido el interés por el trabajo."
   },
   {
    "zh": "上个月，我接受了一家小公司的邀请，负责一个刚刚起步的项目。",
    "zhT": "上個月，我接受了一家小公司的邀請，負責一個剛剛起步的項目。",
    "es": "El mes pasado acepté la invitación de una empresa chica para encargarme de un proyecto que recién arranca."
   },
   {
    "zh": "工资比以前少了三分之一，压力却大了不少，可是我每天都有新的东西要学，下班回家的路上，心情反而轻松多了。",
    "zhT": "工資比以前少了三分之一，壓力卻大了不少，可是我每天都有新的東西要學，下班回家的路上，心情反而輕鬆多了。",
    "es": "El sueldo es un tercio menor que antes y la presión es bastante mayor, pero todos los días tengo algo nuevo que aprender y, al volver a casa, me siento más aliviado."
   },
   {
    "zh": "当然，我也不知道这个选择是对是错。",
    "zhT": "當然，我也不知道這個選擇是對是錯。",
    "es": "Claro que tampoco sé si la elección fue acertada o no."
   },
   {
    "zh": "不过我想，与其一直后悔没有试过，不如先试一试。",
    "zhT": "不過我想，與其一直後悔沒有試過，不如先試一試。",
    "es": "Pero pienso que más vale probar que quedarse siempre arrepentido de no haberlo intentado."
   },
   {
    "zh": "希望你有空来看看我。",
    "zhT": "希望你有空來看看我。",
    "es": "Ojalá tengas tiempo de venir a verme."
   },
   {
    "zh": "阿明",
    "zhT": "阿明",
    "es": "Aming"
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "qZh": "阿明为什么离开了原来的公司？",
    "qZhT": "阿明為什麼離開了原來的公司？",
    "es": "¿Por qué Aming dejó su empresa anterior?",
    "optsZh": [
     "因为每天重复同样的事情，他觉得自己没有进步",
     "因为收入一直太低，他觉得工作很不值得做",
     "因为和同事的关系越来越不好，他不想再去上班了",
     "因为公司要他搬到别的城市去工作，他不愿意"
    ],
    "optsZhT": [
     "因為每天重複同樣的事情，他覺得自己沒有進步",
     "因為收入一直太低，他覺得工作很不值得做",
     "因為和同事的關係越來越不好，他不想再去上班了",
     "因為公司要他搬到別的城市去工作，他不願意"
    ],
    "opts": [
     "Porque repetía lo mismo todos los días y sentía que no progresaba",
     "Porque el sueldo era demasiado bajo y el trabajo no valía la pena",
     "Porque se llevaba mal con sus compañeros y ya no quería ir",
     "Porque la empresa le pidió mudarse a otra ciudad para trabajar"
    ],
    "why": "«每天都在重复同样的事情，我渐渐发现自己不再进步了».",
    "whyT": "«每天都在重複同樣的事情，我漸漸發現自己不再進步了».",
    "whyNot": [
     "Dice lo contrario: «收入不错» (el sueldo era bueno).",
     "No menciona problemas con los compañeros.",
     "No se habla de ninguna mudanza."
    ],
    "whyNotT": [
     "Dice lo contrario: «收入不錯» (el sueldo era bueno).",
     "No menciona problemas con los compañeros.",
     "No se habla de ninguna mudanza."
    ]
   },
   {
    "type": "detalle",
    "qZh": "和以前相比，新工作怎么样？",
    "qZhT": "和以前相比，新工作怎麼樣？",
    "es": "Comparado con antes, ¿cómo es el trabajo nuevo?",
    "optsZh": [
     "工资少了，压力却更大",
     "工资多了，压力也小了",
     "工资一样，但是更忙",
     "工资少了，压力也小了"
    ],
    "optsZhT": [
     "工資少了，壓力卻更大",
     "工資多了，壓力也小了",
     "工資一樣，但是更忙",
     "工資少了，壓力也小了"
    ],
    "opts": [
     "Paga menos, pero con más presión",
     "Paga más y con menos presión",
     "Paga lo mismo, pero hay más trabajo",
     "Paga menos y con menos presión"
    ],
    "why": "«工资比以前少了三分之一，压力却大了不少».",
    "whyT": "«工資比以前少了三分之一，壓力卻大了不少».",
    "whyNot": [
     "El sueldo bajó un tercio.",
     "El sueldo no es el mismo.",
     "La presión aumentó, no bajó."
    ]
   },
   {
    "type": "inferencia",
    "qZh": "阿明对自己的选择是什么态度？",
    "qZhT": "阿明對自己的選擇是什麼態度？",
    "es": "¿Qué actitud tiene Aming hacia su decisión?",
    "optsZh": [
     "不能肯定对不对，但是愿意试一试",
     "非常后悔，已经想回原来的那家公司了",
     "对结果完全有信心，觉得自己不会出错",
     "觉得很累，不想再谈起这件事了"
    ],
    "optsZhT": [
     "不能肯定對不對，但是願意試一試",
     "非常後悔，已經想回原來的那家公司了",
     "對結果完全有信心，覺得自己不會出錯",
     "覺得很累，不想再談起這件事了"
    ],
    "opts": [
     "No está seguro de que sea acertada, pero quiere intentarlo",
     "Está muy arrepentido y quiere volver a la empresa anterior",
     "Está totalmente seguro y confía por completo en el resultado",
     "Se siente cansado y no quiere volver a hablar del tema"
    ],
    "why": "«我也不知道这个选择是对是错… 与其一直后悔没有试过，不如先试一试».",
    "whyT": "«我也不知道這個選擇是對是錯… 與其一直後悔沒有試過，不如先試一試».",
    "whyNot": [
     "Dice que se siente más aliviado, no arrepentido.",
     "Admite que no sabe si acertó.",
     "Le cuenta todo a su amigo con detalle."
    ]
   },
   {
    "type": "vocabulario",
    "qZh": "“惭愧”在信里表示什么？",
    "qZhT": "“慚愧”在信裡表示什麼？",
    "es": "¿Qué expresa «惭愧» en la carta?",
    "optsZh": [
     "他觉得不好意思，因为回信回得太晚",
     "他对小林来信里问的问题很生气",
     "他对自己的新工作非常满意，很得意",
     "他觉得写信很无聊，所以回得很晚"
    ],
    "optsZhT": [
     "他覺得不好意思，因為回信回得太晚",
     "他對小林來信裡問的問題很生氣",
     "他對自己的新工作非常滿意，很得意",
     "他覺得寫信很無聊，所以回得很晚"
    ],
    "opts": [
     "Siente vergüenza por haber tardado tanto en contestar",
     "Está enojado por las preguntas de la carta de Xiaolin",
     "Está muy conforme con su nuevo trabajo",
     "Le parece aburrido escribir y por eso respondió tarde"
    ],
    "why": "Lo dice justo después: «这么长时间才给你回信».",
    "whyT": "Lo dice justo después: «這麼長時間才給你回信».",
    "whyNot": [
     "Dice que se alegró de recibirla.",
     "Cuenta que el trabajo nuevo paga menos y presiona más; no habla de estar conforme con eso.",
     "No hay ninguna queja sobre escribir."
    ]
   }
  ]
 },
 {
  "id": "rd-h5-sueno",
  "kind": "reading",
  "hsk": 5,
  "genre": "artículo",
  "emoji": "😴",
  "titleZh": "怎样睡个好觉",
  "titleZhT": "怎樣睡個好覺",
  "titleEs": "Cómo dormir bien",
  "blurb": "Consejos de especialistas sobre horas, regularidad y hábitos antes de dormir. Incluye una pregunta «¿cuál NO?».",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "规律",
    "zhT": "規律",
    "es": "la regularidad"
   },
   {
    "zh": "疲劳",
    "zhT": "疲勞",
    "es": "el cansancio"
   },
   {
    "zh": "屏幕",
    "zhT": "屏幕",
    "es": "la pantalla"
   },
   {
    "zh": "兴奋",
    "zhT": "興奮",
    "es": "excitado"
   },
   {
    "zh": "有助于",
    "zhT": "有助於",
    "es": "ayudar a, contribuir a"
   }
  ],
  "lines": [
   {
    "zh": "很多人认为，睡得越多越好，其实不然。",
    "zhT": "很多人認為，睡得越多越好，其實不然。",
    "es": "Mucha gente cree que cuanto más se duerme, mejor, pero no es así."
   },
   {
    "zh": "专家指出，成年人每天睡七到八个小时比较合适，睡得太少会影响注意力和记忆力，睡得太多也可能让人整天无精打采。",
    "zhT": "專家指出，成年人每天睡七到八個小時比較合適，睡得太少會影響注意力和記憶力，睡得太多也可能讓人整天無精打采。",
    "es": "Los especialistas señalan que a un adulto le conviene dormir de siete a ocho horas por día: dormir muy poco afecta la atención y la memoria, y dormir de más puede dejarlo desganado todo el día."
   },
   {
    "zh": "除了时间的长短，睡觉的规律同样重要。",
    "zhT": "除了時間的長短，睡覺的規律同樣重要。",
    "es": "Además de cuántas horas, la regularidad del sueño es igual de importante."
   },
   {
    "zh": "如果每天入睡和起床的时间都不一样，身体就很难适应，即使睡够了时间，也可能觉得疲劳。",
    "zhT": "如果每天入睡和起床的時間都不一樣，身體就很難適應，即使睡夠了時間，也可能覺得疲勞。",
    "es": "Si cada día uno se duerme y se levanta a una hora distinta, al cuerpo le cuesta adaptarse y, aunque duerma las horas necesarias, puede sentirse cansado."
   },
   {
    "zh": "因此，专家建议大家尽量在固定的时间睡觉，周末也不要改变太多。",
    "zhT": "因此，專家建議大家儘量在固定的時間睡覺，週末也不要改變太多。",
    "es": "Por eso los especialistas recomiendan dormirse a una hora fija en lo posible y no cambiarla demasiado los fines de semana."
   },
   {
    "zh": "另外，睡前的习惯也会影响睡眠质量。",
    "zhT": "另外，睡前的習慣也會影響睡眠質量。",
    "es": "Además, los hábitos antes de dormir influyen en la calidad del sueño."
   },
   {
    "zh": "睡觉以前的一个小时，最好不要看手机或电视，因为屏幕发出的光会让大脑一直保持兴奋；咖啡、浓茶更是要避免。",
    "zhT": "睡覺以前的一個小時，最好不要看手機或電視，因為屏幕發出的光會讓大腦一直保持興奮；咖啡、濃茶更是要避免。",
    "es": "Conviene no mirar el celular ni la tele en la hora previa a dormir, porque la luz de la pantalla mantiene el cerebro activado; el café y el té fuerte, con más razón, hay que evitarlos."
   },
   {
    "zh": "相反，洗个热水澡、听听轻松的音乐，都有助于入睡。",
    "zhT": "相反，洗個熱水澡、聽聽輕鬆的音樂，都有助於入睡。",
    "es": "En cambio, darse una ducha caliente o escuchar música tranquila ayuda a conciliar el sueño."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "qZh": "根据文章，成年人每天睡多长时间比较合适？",
    "qZhT": "根據文章，成年人每天睡多長時間比較合適？",
    "es": "Según el artículo, ¿cuánto le conviene dormir a un adulto por día?",
    "optsZh": [
     "七到八个小时",
     "五到六个小时",
     "九到十个小时",
     "越多越好"
    ],
    "optsZhT": [
     "七到八個小時",
     "五到六個小時",
     "九到十個小時",
     "越多越好"
    ],
    "opts": [
     "De siete a ocho horas",
     "De cinco a seis horas",
     "De nueve a diez horas",
     "Cuanto más, mejor"
    ],
    "why": "«成年人每天睡七到八个小时比较合适».",
    "whyT": "«成年人每天睡七到八個小時比較合適».",
    "whyNot": [
     "Dormir muy poco afecta la atención y la memoria.",
     "Dormir demasiado deja desganado.",
     "El texto abre justamente diciendo que esa idea es falsa («其实不然»)."
    ],
    "whyNotT": [
     "Dormir muy poco afecta la atención y la memoria.",
     "Dormir demasiado deja desganado.",
     "El texto abre justamente diciendo que esa idea es falsa («其實不然»)."
    ]
   },
   {
    "type": "detalle",
    "qZh": "下面哪一项不是专家的建议？",
    "qZhT": "下面哪一項不是專家的建議？",
    "es": "¿Cuál de las siguientes NO es una recomendación de los especialistas?",
    "optsZh": [
     "睡前喝一杯浓茶，让自己放松",
     "周末也尽量在固定的时间睡觉",
     "睡前一个小时少看手机",
     "睡前洗个热水澡"
    ],
    "optsZhT": [
     "睡前喝一杯濃茶，讓自己放鬆",
     "週末也儘量在固定的時間睡覺",
     "睡前一個小時少看手機",
     "睡前洗個熱水澡"
    ],
    "opts": [
     "Tomar un té fuerte antes de dormir para relajarse",
     "Mantener una hora fija de dormir también los fines de semana",
     "Mirar menos el celular en la hora previa a dormir",
     "Darse una ducha caliente antes de dormir"
    ],
    "why": "Es la única que contradice el texto: «咖啡、浓茶更是要避免» (el té fuerte hay que evitarlo).",
    "whyT": "Es la única que contradice el texto: «咖啡、濃茶更是要避免» (el té fuerte hay que evitarlo).",
    "whyNot": [
     "Sí la recomiendan: «周末也不要改变太多».",
     "Sí la recomiendan: «最好不要看手机或电视».",
     "Sí la recomiendan: «洗个热水澡… 有助于入睡»."
    ],
    "whyNotT": [
     "Sí la recomiendan: «週末也不要改變太多».",
     "Sí la recomiendan: «最好不要看手機或電視».",
     "Sí la recomiendan: «洗個熱水澡… 有助於入睡»."
    ]
   },
   {
    "type": "inferencia",
    "qZh": "为什么睡前最好不要看手机？",
    "qZhT": "為什麼睡前最好不要看手機？",
    "es": "¿Por qué conviene no mirar el celular antes de dormir?",
    "optsZh": [
     "屏幕的光会让大脑一直保持兴奋",
     "手机的声音会吵醒别人",
     "看手机会让眼睛变小",
     "手机会让房间变热"
    ],
    "optsZhT": [
     "屏幕的光會讓大腦一直保持興奮",
     "手機的聲音會吵醒別人",
     "看手機會讓眼睛變小",
     "手機會讓房間變熱"
    ],
    "opts": [
     "Porque la luz de la pantalla mantiene el cerebro activado",
     "Porque el sonido del celular despierta a otros",
     "Porque mirar el celular achica los ojos",
     "Porque el celular calienta la habitación"
    ],
    "why": "«屏幕发出的光会让大脑一直保持兴奋».",
    "whyT": "«屏幕發出的光會讓大腦一直保持興奮».",
    "whyNot": [
     "El texto habla de la luz, no del sonido.",
     "Eso no aparece en el texto.",
     "Eso no aparece en el texto."
    ]
   },
   {
    "type": "vocabulario",
    "qZh": "“无精打采”最接近什么意思？",
    "qZhT": "“無精打采”最接近什麼意思？",
    "es": "¿Qué significa más o menos «无精打采»?",
    "optsZh": [
     "没有精神，什么都不想做",
     "非常生气",
     "特别高兴",
     "肚子很饿"
    ],
    "optsZhT": [
     "沒有精神，什麼都不想做",
     "非常生氣",
     "特別高興",
     "肚子很餓"
    ],
    "opts": [
     "Estar sin energía, sin ganas de nada",
     "Estar muy enojado",
     "Estar especialmente contento",
     "Tener mucha hambre"
    ],
    "why": "Se dice de quien duerme de más: queda desganado «整天».",
    "whyT": "Se dice de quien duerme de más: queda desganado «整天».",
    "whyNot": [
     "No hay enojo en el texto.",
     "Lo opuesto: es un efecto negativo de dormir demasiado.",
     "El hambre no se menciona."
    ]
   }
  ]
 },
 {
  "id": "rd-h5-libros",
  "kind": "reading",
  "hsk": 5,
  "genre": "narración",
  "emoji": "📚",
  "titleZh": "小区里的图书角",
  "titleZhT": "小區裡的圖書角",
  "titleEs": "El rincón de libros del barrio",
  "blurb": "Un estante viejo que cambia la vida de un barrio. Origen, evolución y sorpresa.",
  "names": [
   "王阿姨"
  ],
  "namesT": [
   "王阿姨"
  ],
  "keywords": [
   {
    "zh": "小区",
    "zhT": "小區",
    "es": "el barrio cerrado, el conjunto residencial"
   },
   {
    "zh": "告示",
    "zhT": "告示",
    "es": "el cartel, el aviso"
   },
   {
    "zh": "绘本",
    "zhT": "繪本",
    "es": "el libro ilustrado"
   },
   {
    "zh": "特意",
    "zhT": "特意",
    "es": "a propósito, expresamente"
   },
   {
    "zh": "推荐",
    "zhT": "推薦",
    "es": "recomendar"
   },
   {
    "zh": "傍晚",
    "zhT": "傍晚",
    "es": "el atardecer"
   }
  ],
  "lines": [
   {
    "zh": "我们小区的门口新开了一个“图书角”。",
    "zhT": "我們小區的門口新開了一個“圖書角”。",
    "es": "En la entrada de nuestro barrio abrieron un «rincón de libros»."
   },
   {
    "zh": "说是图书角，其实只是一个旧书架，放在小区花园的旁边。",
    "zhT": "說是圖書角，其實只是一個舊書架，放在小區花園的旁邊。",
    "es": "Dicho así suena importante, pero en realidad es solo un estante viejo al lado del jardín."
   },
   {
    "zh": "这个主意最早来自住在三号楼的王阿姨。",
    "zhT": "這個主意最早來自住在三號樓的王阿姨。",
    "es": "La idea fue de la señora Wang, que vive en el edificio 3."
   },
   {
    "zh": "她退休以后，在家里整理了许多年轻时买的书，扔了可惜，留着又占地方，于是就把它们搬到了花园里，还写了一张告示：“欢迎免费借阅，看完请放回原处。”",
    "zhT": "她退休以後，在家裡整理了許多年輕時買的書，扔了可惜，留著又佔地方，於是就把它們搬到了花園裡，還寫了一張告示：“歡迎免費借閱，看完請放回原處。”",
    "es": "Después de jubilarse, ordenó muchos libros que había comprado de joven: tirarlos daba pena y guardarlos ocupaba lugar. Así que los llevó al jardín y puso un cartel: «Pueden llevarse libros prestados gratis; cuando terminen, por favor devuélvanlos a su lugar»."
   },
   {
    "zh": "一开始，大家都担心书会很快丢光。",
    "zhT": "一開始，大家都擔心書會很快丟光。",
    "es": "Al principio, todos temían que los libros desaparecieran enseguida."
   },
   {
    "zh": "没想到过了半年，书架上的书不但没有减少，反而越来越多——有人把孩子看过的绘本放了进来，有人留下了自己的旅行笔记，还有人特意写了纸条夹在书里，推荐给下一个读者。",
    "zhT": "沒想到過了半年，書架上的書不但沒有減少，反而越來越多——有人把孩子看過的繪本放了進來，有人留下了自己的旅行筆記，還有人特意寫了紙條夾在書裡，推薦給下一個讀者。",
    "es": "Contra lo esperado, a los seis meses los libros del estante no solo no habían disminuido, sino que eran cada vez más: alguien puso libros ilustrados que sus hijos ya habían leído, otro dejó sus cuadernos de viaje y otro escribió una notita a propósito, la metió entre las páginas y se la recomendó al próximo lector."
   },
   {
    "zh": "现在，每到傍晚，花园里总有人坐着看书。",
    "zhT": "現在，每到傍晚，花園裡總有人坐著看書。",
    "es": "Ahora, cada atardecer, siempre hay alguien sentado leyendo en el jardín."
   },
   {
    "zh": "王阿姨笑着说，她从来没有想到，一个小小的书架，竟然让邻居们熟悉了起来。",
    "zhT": "王阿姨笑著說，她從來沒有想到，一個小小的書架，竟然讓鄰居們熟悉了起來。",
    "es": "La señora Wang dice sonriendo que nunca imaginó que un estantecito iba a lograr que los vecinos se conocieran."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "qZh": "图书角是怎么来的？",
    "qZhT": "圖書角是怎麼來的？",
    "es": "¿Cómo surgió el rincón de libros?",
    "optsZh": [
     "王阿姨把自己的旧书搬到了花园里",
     "小区用大家的钱买了很多新书",
     "学校把很多书送给了这个小区",
     "邻居们一起开会以后决定的"
    ],
    "optsZhT": [
     "王阿姨把自己的舊書搬到了花園裡",
     "小區用大家的錢買了很多新書",
     "學校把很多書送給了這個小區",
     "鄰居們一起開會以後決定的"
    ],
    "opts": [
     "La señora Wang llevó sus libros viejos al jardín",
     "El barrio compró muchos libros nuevos con dinero de todos",
     "Una escuela le regaló una colección de libros al barrio",
     "Los vecinos lo decidieron en una reunión de edificio"
    ],
    "why": "«这个主意最早来自…王阿姨… 把它们搬到了花园里».",
    "whyT": "«這個主意最早來自…王阿姨… 把它們搬到了花園裡».",
    "whyNot": [
     "Eran libros viejos de la señora Wang, no nuevos.",
     "No interviene ninguna escuela.",
     "Fue iniciativa de una persona, no una votación."
    ]
   },
   {
    "type": "detalle",
    "qZh": "半年以后，书架上的书怎么样了？",
    "qZhT": "半年以後，書架上的書怎麼樣了？",
    "es": "Seis meses después, ¿cómo estaban los libros del estante?",
    "optsZh": [
     "比以前更多了",
     "很快就丢光了",
     "一本也没有变",
     "只剩下旧书了"
    ],
    "optsZhT": [
     "比以前更多了",
     "很快就丟光了",
     "一本也沒有變",
     "只剩下舊書了"
    ],
    "opts": [
     "Había más que antes",
     "Se habían perdido enseguida",
     "No había cambiado ni uno",
     "Solo quedaban libros viejos"
    ],
    "why": "«书架上的书不但没有减少，反而越来越多».",
    "whyT": "«書架上的書不但沒有減少，反而越來越多».",
    "whyNot": [
     "Eso era lo que temían al principio, pero no pasó.",
     "El texto cuenta que la gente fue sumando libros.",
     "Se sumaron libros ilustrados, cuadernos de viaje y notitas, no solo viejos."
    ]
   },
   {
    "type": "inferencia",
    "qZh": "王阿姨没有想到什么？",
    "qZhT": "王阿姨沒有想到什麼？",
    "es": "¿Qué no imaginaba la señora Wang?",
    "optsZh": [
     "书架会让邻居们互相熟悉起来",
     "书会像大家担心的那样很快丢光",
     "会有邻居坐在花园里看书",
     "自己家里竟然有这么多书"
    ],
    "optsZhT": [
     "書架會讓鄰居們互相熟悉起來",
     "書會像大家擔心的那樣很快丟光",
     "會有鄰居坐在花園裡看書",
     "自己家裡竟然有這麼多書"
    ],
    "opts": [
     "Que el estante iba a hacer que los vecinos se conocieran",
     "Que los libros se perdieran enseguida, como temían todos",
     "Que algún vecino fuera a leer sentado en el jardín",
     "Que ella tuviera tantos libros guardados en su casa"
    ],
    "why": "La frase final: «她从来没有想到…竟然让邻居们熟悉了起来».",
    "whyT": "La frase final: «她從來沒有想到…竟然讓鄰居們熟悉了起來».",
    "whyNot": [
     "Esa era la preocupación de «大家» al principio, no lo que sorprendió a la señora Wang.",
     "Que haya gente leyendo es parte de lo que ocurrió, no su sorpresa.",
     "Los libros eran suyos; sabía cuántos tenía."
    ],
    "whyNotT": [
     "Esa era la preocupación de «大家» al principio, no lo que sorprendió a la señora Wang.",
     "Que haya gente leyendo es parte de lo que ocurrió, no su sorpresa.",
     "Los libros eran suyos; sabía cuántos tenía."
    ]
   },
   {
    "type": "vocabulario",
    "qZh": "“特意写了纸条”说明那个人怎么样？",
    "qZhT": "“特意寫了紙條”說明那個人怎麼樣？",
    "es": "¿Qué indica «特意写了纸条» sobre esa persona?",
    "optsZh": [
     "他是专门为了推荐书才写的",
     "他不小心把纸条放进了书里，自己也没发现",
     "他想把这本书带回家再读一遍",
     "他不喜欢这本书，想告诉别人"
    ],
    "optsZhT": [
     "他是專門為了推薦書才寫的",
     "他不小心把紙條放進了書裡，自己也沒發現",
     "他想把這本書帶回家再讀一遍",
     "他不喜歡這本書，想告訴別人"
    ],
    "opts": [
     "Escribió la nota a propósito, para recomendar el libro",
     "Puso la nota sin querer dentro del libro, por descuido",
     "Quería llevarse el libro a su casa para releerlo",
     "No le gustó el libro y quiso avisar a los demás"
    ],
    "why": "«特意» = a propósito; la nota era «推荐给下一个读者».",
    "whyT": "«特意» = a propósito; la nota era «推薦給下一個讀者».",
    "whyNot": [
     "«特意» es lo contrario de sin querer.",
     "La nota está para el próximo lector, no para él.",
     "Recomienda el libro, así que le gustó."
    ],
    "whyNotT": [
     "«特意» es lo contrario de sin querer.",
     "La nota está para el próximo lector, no para él.",
     "Recomienda el libro, así que le gustó."
    ]
   }
  ]
 }
]);
