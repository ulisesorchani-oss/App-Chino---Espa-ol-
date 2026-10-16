// ============================================================
// readings-tocfl.js — LECTURAS tipo examen · TOCFL B1 (piloto)
// ------------------------------------------------------------
// SOLO DATOS (la pantalla y la práctica ya los leen: readings-ui.js y exam-practice.js).
// Textos escritos de cero para la app, en tradicional (zh = simplificado generado con OpenCC);
// ninguno es copia ni adaptación de un texto existente. Nivel aproximado, NO oficial.
// Mismo esquema que readings-pilot.js, con exam: 'TOCFL', examLvl: 'B1' (hsk: 4 = equivalencia aproximada).
// TOCFL B1: preguntas en español con 4 opciones (como el formato de Band B/C); opts[0] = correcta.
// Control de nivel: tools/check-readings.js (≥ 90 % con las listas acumuladas Prep + A1 + A2 + B1).
// ============================================================
window.READINGS = (window.READINGS || []).concat([
 {
  "id": "rd-b1-fangdong",
  "kind": "reading",
  "hsk": 4,
  "exam": "TOCFL",
  "examLvl": "B1",
  "genre": "carta",
  "emoji": "💧",
  "titleZh": "给房东的一封信",
  "titleZhT": "給房東的一封信",
  "titleEs": "Una carta al casero",
  "blurb": "Un inquilino avisa de una gotera y pide que la arreglen. Detalle e intención de la carta.",
  "names": [
   "陈",
   "林美玲"
  ],
  "namesT": [
   "陳",
   "林美玲"
  ],
  "keywords": [
   {
    "zh": "漏水",
    "zhT": "漏水",
    "es": "tener una filtración, gotear"
   },
   {
    "zh": "天花板",
    "zhT": "天花板",
    "es": "el techo (interior)"
   },
   {
    "zh": "发霉",
    "zhT": "發霉",
    "es": "enmohecerse"
   },
   {
    "zh": "墙壁",
    "zhT": "牆壁",
    "es": "la pared"
   },
   {
    "zh": "尽快",
    "zhT": "盡快",
    "es": "lo antes posible"
   },
   {
    "zh": "事先",
    "zhT": "事先",
    "es": "de antemano"
   }
  ],
  "lines": [
   {
    "zh": "亲爱的陈先生：",
    "zhT": "親愛的陳先生：",
    "es": "Estimado señor Chen:"
   },
   {
    "zh": "您好！我是住在三楼的林美玲。",
    "zhT": "您好！我是住在三樓的林美玲。",
    "es": "¡Buenas! Soy Lin Meiling, la inquilina del tercer piso."
   },
   {
    "zh": "这个月初，我们家的浴室开始漏水，一开始只是天花板有一点点湿，我以为过几天就会好，所以没有马上告诉您。",
    "zhT": "這個月初，我們家的浴室開始漏水，一開始只是天花板有一點點濕，我以為過幾天就會好，所以沒有馬上告訴您。",
    "es": "A principios de este mes empezó a filtrarse agua en nuestro baño; al principio el techo solo estaba un poquito húmedo y pensé que en unos días se arreglaría solo, por eso no le avisé enseguida."
   },
   {
    "zh": "可是上星期下了几天大雨以后，水越流越多，现在连墙壁都发霉了。",
    "zhT": "可是上星期下了幾天大雨以後，水越流越多，現在連牆壁都發霉了。",
    "es": "Pero después de varios días de lluvia fuerte la semana pasada, el agua fue cada vez más y ahora hasta la pared tiene moho."
   },
   {
    "zh": "我知道您工作很忙，不过这个问题不能再等了。",
    "zhT": "我知道您工作很忙，不過這個問題不能再等了。",
    "es": "Sé que usted trabaja mucho, pero este problema ya no puede esperar."
   },
   {
    "zh": "请您尽快找人来看一看，修理的时间最好是平日白天，因为那时候家里一定有人。",
    "zhT": "請您盡快找人來看一看，修理的時間最好是平日白天，因為那時候家裡一定有人。",
    "es": "Le pido que mande cuanto antes a alguien a revisarlo; lo mejor es que la reparación sea un día de semana durante el día, porque a esa hora siempre hay alguien en casa."
   },
   {
    "zh": "如果需要我们先把东西搬开，也请事先通知，我会安排好。",
    "zhT": "如果需要我們先把東西搬開，也請事先通知，我會安排好。",
    "es": "Si hace falta que movamos antes algunas cosas, avíseme con anticipación y yo lo organizo."
   },
   {
    "zh": "谢谢您的帮忙，希望很快能收到您的回信。",
    "zhT": "謝謝您的幫忙，希望很快能收到您的回信。",
    "es": "Gracias por su ayuda; espero su respuesta pronto."
   },
   {
    "zh": "林美玲 敬上",
    "zhT": "林美玲 敬上",
    "es": "Atentamente, Lin Meiling"
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Por qué la inquilina no avisó enseguida al casero?",
    "opts": [
     "Pensó que la humedad se arreglaría sola en pocos días",
     "Estaba de viaje fuera del país y no tenía cómo comunicarse",
     "Quería juntar varios problemas para avisar de una vez",
     "Creyó que el arreglo le correspondía a ella"
    ],
    "why": "Dice «我以为过几天就会好，所以没有马上告诉您».",
    "whyT": "Dice «我以為過幾天就會好，所以沒有馬上告訴您».",
    "whyNot": [
     "No menciona ningún viaje.",
     "No habla de otros problemas: el único es la gotera.",
     "No habla de quién paga el arreglo."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Cuándo prefiere que vayan a reparar?",
    "opts": [
     "De lunes a viernes, de día, cuando hay alguien en casa",
     "Los fines de semana por la tarde, cuando ella descansa",
     "Por la noche, después de que el casero salga del trabajo",
     "En cualquier momento, aunque no haya nadie en casa"
    ],
    "why": "«修理的时间最好是平日白天，因为那时候家里一定有人».",
    "whyT": "«修理的時間最好是平日白天，因為那時候家裡一定有人».",
    "whyNot": [
     "«平日» son los días de semana, no el fin de semana.",
     "No menciona la noche: pide el día.",
     "Pide justo lo contrario: que haya alguien en casa."
    ],
    "whyNotT": [
     "«平日» son los días de semana, no el fin de semana.",
     "No menciona la noche: pide el día.",
     "Pide justo lo contrario: que haya alguien en casa."
    ]
   },
   {
    "type": "idea",
    "es": "¿Para qué escribe la carta?",
    "opts": [
     "Para pedir que manden a revisar y arreglar la filtración pronto",
     "Para reclamar que le bajen el alquiler del mes",
     "Para avisar que se va a mudar del departamento",
     "Para pedir permiso de pintar las paredes del baño"
    ],
    "why": "Pide «尽快找人来看一看» y explica que «这个问题不能再等了».",
    "whyT": "Pide «盡快找人來看一看» y explica que «這個問題不能再等了».",
    "whyNot": [
     "No habla de dinero ni de alquiler.",
     "No dice nada de mudarse.",
     "El moho es parte del problema, pero no pide pintar."
    ]
   }
  ]
 },
 {
  "id": "rd-b1-tushuguan",
  "kind": "reading",
  "hsk": 4,
  "exam": "TOCFL",
  "examLvl": "B1",
  "genre": "aviso",
  "emoji": "📚",
  "titleZh": "图书馆的新办法",
  "titleZhT": "圖書館的新辦法",
  "titleEs": "Nuevas reglas de la biblioteca",
  "blurb": "Un aviso de una biblioteca con cambios en el préstamo y las reservas. Incluye una pregunta «¿cuál NO?».",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "实施",
    "zhT": "實施",
    "es": "poner en práctica, entrar en vigor"
   },
   {
    "zh": "预约",
    "zhT": "預約",
    "es": "reservar"
   },
   {
    "zh": "简讯",
    "zhT": "簡訊",
    "es": "mensaje de texto (SMS)"
   },
   {
    "zh": "柜台",
    "zhT": "櫃台",
    "es": "el mostrador"
   },
   {
    "zh": "开放",
    "zhT": "開放",
    "es": "estar abierto al público"
   }
  ],
  "lines": [
   {
    "zh": "各位读者您好：",
    "zhT": "各位讀者您好：",
    "es": "Estimados lectores:"
   },
   {
    "zh": "为了让大家借书更方便，本馆从下个月一日开始，实施新的借书办法。",
    "zhT": "為了讓大家借書更方便，本館從下個月一日開始，實施新的借書辦法。",
    "es": "Para que prestarse libros sea más cómodo, desde el día 1 del mes que viene la biblioteca pone en práctica un nuevo sistema de préstamo."
   },
   {
    "zh": "第一，每个人一次最多可以借十本书，借书的时间从二十一天改成三十天。",
    "zhT": "第一，每個人一次最多可以借十本書，借書的時間從二十一天改成三十天。",
    "es": "Primero: cada persona podrá llevarse hasta diez libros a la vez y el plazo de préstamo pasa de 21 a 30 días."
   },
   {
    "zh": "第二，如果您想借的书已经被别人借走了，可以在网路上预约。",
    "zhT": "第二，如果您想借的書已經被別人借走了，可以在網路上預約。",
    "es": "Segundo: si el libro que quiere ya lo tiene otra persona, podrá reservarlo por internet."
   },
   {
    "zh": "书还回来以后，我们会用简讯通知您，也会替您留三天。",
    "zhT": "書還回來以後，我們會用簡訊通知您，也會替您留三天。",
    "es": "Cuando el libro sea devuelto, le avisaremos con un mensaje de texto y se lo guardaremos tres días."
   },
   {
    "zh": "第三，周日不再开放还书箱，请在周一到周六把书送回来。",
    "zhT": "第三，週日不再開放還書箱，請在週一到週六把書送回來。",
    "es": "Tercero: los domingos ya no se abrirá el buzón de devolución; por favor, traiga los libros de lunes a sábado."
   },
   {
    "zh": "如果有任何问题，欢迎到柜台问问，也可以打电话给我们。",
    "zhT": "如果有任何問題，歡迎到櫃台問問，也可以打電話給我們。",
    "es": "Si tiene cualquier duda, puede consultar en el mostrador o llamarnos por teléfono."
   },
   {
    "zh": "谢谢您的合作。",
    "zhT": "謝謝您的合作。",
    "es": "Gracias por su colaboración."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Cuántos días podrá tener cada libro con el nuevo sistema?",
    "opts": [
     "Treinta días",
     "Veintiún días",
     "Diez días",
     "Tres días"
    ],
    "why": "«借书的时间从二十一天改成三十天»: ahora son treinta.",
    "whyT": "«借書的時間從二十一天改成三十天»: ahora son treinta.",
    "whyNot": [
     "Veintiún días era el plazo anterior.",
     "Diez es la cantidad máxima de libros, no de días.",
     "Tres días es lo que guardan un libro reservado."
    ]
   },
   {
    "type": "detalle",
    "es": "Si el libro que quiere ya está prestado, ¿qué puede hacer?",
    "opts": [
     "Reservarlo por internet y esperar el mensaje de aviso",
     "Anotarse en una lista en el mostrador y volver cada día",
     "Pedir que se lo manden por correo a su casa",
     "Llamar por teléfono para que lo busquen en otra sede"
    ],
    "why": "«可以在网路上预约»; cuando vuelve, avisan por «简讯» y lo guardan tres días.",
    "whyT": "«可以在網路上預約»; cuando vuelve, avisan por «簡訊» y lo guardan tres días.",
    "whyNot": [
     "La reserva es por internet, no hace falta ir a anotarse.",
     "El aviso no habla de envíos a domicilio.",
     "El aviso no menciona otras sedes."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Cuál de estas afirmaciones NO es correcta según el aviso?",
    "opts": [
     "Hay que ir al mostrador para reservar un libro",
     "Los domingos no se podrá usar el buzón de devolución",
     "Cada persona podrá llevarse hasta diez libros a la vez",
     "El libro reservado se guarda tres días"
    ],
    "why": "Es la única falsa: la reserva se hace «在网路上», por internet.",
    "whyT": "Es la única falsa: la reserva se hace «在網路上», por internet.",
    "whyNot": [
     "Es cierta: «周日不再开放还书箱».",
     "Es cierta: «一次最多可以借十本书».",
     "Es cierta: «也会替您留三天»."
    ],
    "whyNotT": [
     "Es cierta: «週日不再開放還書箱».",
     "Es cierta: «一次最多可以借十本書».",
     "Es cierta: «也會替您留三天»."
    ]
   }
  ]
 },
 {
  "id": "rd-b1-zhigong",
  "kind": "reading",
  "hsk": 4,
  "exam": "TOCFL",
  "examLvl": "B1",
  "genre": "narración",
  "emoji": "🐕",
  "titleZh": "周末当志工",
  "titleZhT": "週末當志工",
  "titleEs": "Un sábado de voluntaria",
  "blurb": "Una estudiante ayuda en un refugio de perros y vive algo inesperado. Detalle, sentimientos e inferencia.",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "志工",
    "zhT": "志工",
    "es": "voluntario/a"
   },
   {
    "zh": "收容所",
    "zhT": "收容所",
    "es": "refugio, albergue"
   },
   {
    "zh": "流浪狗",
    "zhT": "流浪狗",
    "es": "perro callejero"
   },
   {
    "zh": "领养",
    "zhT": "領養",
    "es": "adoptar"
   },
   {
    "zh": "角落",
    "zhT": "角落",
    "es": "rincón"
   },
   {
    "zh": "尾巴",
    "zhT": "尾巴",
    "es": "la cola"
   }
  ],
  "lines": [
   {
    "zh": "上个月，我参加了学校举办的志工活动，到一家照顾流浪狗的收容所帮忙。",
    "zhT": "上個月，我參加了學校舉辦的志工活動，到一家照顧流浪狗的收容所幫忙。",
    "es": "El mes pasado participé en una actividad de voluntariado de mi escuela y fui a ayudar a un refugio que cuida perros callejeros."
   },
   {
    "zh": "那天早上我起得很早，本来以为只是陪小狗玩一玩，没想到工作人员先给了我一双手套和一把扫把，要我先把狗屋打扫干净，然后再替每一只狗洗澡。",
    "zhT": "那天早上我起得很早，本來以為只是陪小狗玩一玩，沒想到工作人員先給了我一雙手套和一把掃把，要我先把狗屋打掃乾淨，然後再替每一隻狗洗澡。",
    "es": "Esa mañana me levanté temprano; pensaba que solo iba a jugar un rato con los perritos, pero el personal me dio unos guantes y una escoba y me pidió que primero limpiara las casillas y después bañara a cada perro."
   },
   {
    "zh": "中午以前，我的衣服全湿了，手也累得不得了。",
    "zhT": "中午以前，我的衣服全濕了，手也累得不得了。",
    "es": "Antes del mediodía tenía la ropa empapada y las manos me dolían muchísimo."
   },
   {
    "zh": "可是看到小狗们干干净净、尾巴动个不停的样子，我突然觉得很值得。",
    "zhT": "可是看到小狗們乾乾淨淨、尾巴動個不停的樣子，我突然覺得很值得。",
    "es": "Pero al ver a los perros limpitos y con la cola sin parar de moverse, de repente sentí que valía la pena."
   },
   {
    "zh": "下午，一位老先生来领养了一只最瘦小的黑狗。",
    "zhT": "下午，一位老先生來領養了一隻最瘦小的黑狗。",
    "es": "A la tarde, un señor mayor vino a adoptar al perro negro más flaquito."
   },
   {
    "zh": "那只狗一直待在角落，谁靠近都不敢出来，没想到老先生只是坐在地上，轻轻说了几句话，那只狗就慢慢走过去了。",
    "zhT": "那隻狗一直待在角落，誰靠近都不敢出來，沒想到老先生只是坐在地上，輕輕說了幾句話，那隻狗就慢慢走過去了。",
    "es": "Ese perro se había quedado todo el tiempo en un rincón y no se animaba a salir cuando alguien se acercaba; pero el señor solo se sentó en el piso y le dijo unas palabras en voz baja, y el perro fue acercándose despacito."
   },
   {
    "zh": "回家的路上，我决定以后每个月都来一次。",
    "zhT": "回家的路上，我決定以後每個月都來一次。",
    "es": "De vuelta a casa decidí que iba a volver una vez por mes."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Qué pensaba que iba a hacer en el refugio?",
    "opts": [
     "Jugar un rato con los perros",
     "Cocinar la comida para los perros",
     "Llevar a pasear a todos los perros",
     "Ayudar a los visitantes con la adopción"
    ],
    "why": "«本来以为只是陪小狗玩一玩».",
    "whyT": "«本來以為只是陪小狗玩一玩».",
    "whyNot": [
     "No cocina: limpia y baña.",
     "No los saca a pasear: el texto habla de limpiar y bañar.",
     "No ayuda con trámites de adopción."
    ]
   },
   {
    "type": "idea",
    "es": "¿Cómo se sintió al final de la mañana?",
    "opts": [
     "Empapada y con las manos doloridas, pero contenta",
     "Aburrida porque el trabajo fue siempre el mismo y muy pesado",
     "Enojada con el personal por darle tantas tareas",
     "Triste porque los perros no querían bañarse"
    ],
    "why": "Tenía «衣服全湿了，手也累得不得了», pero pensó que «很值得».",
    "whyT": "Tenía «衣服全濕了，手也累得不得了», pero pensó que «很值得».",
    "whyNot": [
     "No dice que se aburriera: dice que valió la pena.",
     "No muestra enojo con el personal.",
     "No habla de que los perros se resistieran."
    ]
   },
   {
    "type": "inferencia",
    "es": "¿Qué se puede deducir de por qué el perro flaco se acercó al señor?",
    "opts": [
     "El señor lo trató con calma y le habló con suavidad",
     "El señor le ofreció comida para atraerlo",
     "El perro ya conocía al señor de antes",
     "El personal sacó al perro del rincón y lo llevó hasta el señor"
    ],
    "why": "El señor «坐在地上，轻轻说了几句话»: se sentó en el piso y le habló bajito; el perro se acercó despacio.",
    "whyT": "El señor «坐在地上，輕輕說了幾句話»: se sentó en el piso y le habló bajito; el perro se acercó despacio.",
    "whyNot": [
     "El texto no menciona comida.",
     "No hay ninguna señal de que se conocieran de antes.",
     "Nadie lo empuja: se acerca por sí mismo."
    ]
   }
  ]
 },
 {
  "id": "rd-b1-zuofan",
  "kind": "reading",
  "hsk": 4,
  "exam": "TOCFL",
  "examLvl": "B1",
  "genre": "narración",
  "emoji": "🍳",
  "titleZh": "第一次自己做饭",
  "titleZhT": "第一次自己做飯",
  "titleEs": "La primera vez que cocinó solo",
  "blurb": "Un desastre en la cocina y lo que aprendió después. Detalle, causa y vocabulario.",
  "names": [],
  "namesT": [],
  "keywords": [
   {
    "zh": "炒饭",
    "zhT": "炒飯",
    "es": "arroz frito"
   },
   {
    "zh": "冒烟",
    "zhT": "冒煙",
    "es": "echar humo"
   },
   {
    "zh": "警报器",
    "zhT": "警報器",
    "es": "la alarma"
   },
   {
    "zh": "材料",
    "zhT": "材料",
    "es": "los ingredientes"
   },
   {
    "zh": "邻居",
    "zhT": "鄰居",
    "es": "el vecino"
   }
  ],
  "lines": [
   {
    "zh": "搬出来住以后，我才发现做饭一点也不简单。",
    "zhT": "搬出來住以後，我才發現做飯一點也不簡單。",
    "es": "Después de mudarme solo, recién descubrí que cocinar no es nada fácil."
   },
   {
    "zh": "第一天，我想做一份简单的炒饭，结果油放得太多，火又开得太大，饭还没炒好，厨房就开始冒烟，连警报器都响了。",
    "zhT": "第一天，我想做一份簡單的炒飯，結果油放得太多，火又開得太大，飯還沒炒好，廚房就開始冒煙，連警報器都響了。",
    "es": "El primer día quise preparar un arroz frito sencillo, pero puse demasiado aceite y el fuego muy fuerte; antes de que el arroz estuviera listo, la cocina se llenó de humo y hasta sonó la alarma."
   },
   {
    "zh": "邻居急忙跑来问我有没有事，我只好不好意思地笑一笑，把窗全部打开。",
    "zhT": "鄰居急忙跑來問我有沒有事，我只好不好意思地笑一笑，把窗全部打開。",
    "es": "El vecino vino corriendo a golpear la puerta para preguntarme si estaba bien; yo, avergonzado, solo pude sonreír y abrir todas las ventanas."
   },
   {
    "zh": "后来，我向妈妈学了几个小方法：火不要开得太大，材料先切好再开火，用完的东西马上洗。",
    "zhT": "後來，我向媽媽學了幾個小方法：火不要開得太大，材料先切好再開火，用完的東西馬上洗。",
    "es": "Después le aprendí a mi mamá algunos truquitos: no poner el fuego muy fuerte, cortar los ingredientes antes de echarlos a la olla y lavar enseguida lo que uso."
   },
   {
    "zh": "现在我已经会做五、六道菜了，虽然味道不一定最好，但是至少不会再让警报器大叫了。",
    "zhT": "現在我已經會做五、六道菜了，雖然味道不一定最好，但是至少不會再讓警報器大叫了。",
    "es": "Ahora ya sé hacer cinco o seis platos; el sabor quizás no sea el mejor, pero al menos la alarma ya no vuelve a gritar."
   }
  ],
  "questions": [
   {
    "type": "detalle",
    "es": "¿Por qué se llenó de humo la cocina el primer día?",
    "opts": [
     "Puso mucho aceite y el fuego estaba demasiado fuerte",
     "Se olvidó de apagar el fuego y se fue a comprar al supermercado",
     "Cocinó con una olla que estaba sucia",
     "Dejó la ventana cerrada y la comida se quemó"
    ],
    "why": "«油放得太多，火又开得太大».",
    "whyT": "«油放得太多，火又開得太大».",
    "whyNot": [
     "No salió de casa: cuando el vecino llegó, él estaba adentro.",
     "No dice nada de que la olla estuviera sucia.",
     "Las ventanas las abrió después, cuando ya había humo."
    ]
   },
   {
    "type": "detalle",
    "es": "¿Cómo reaccionó cuando el vecino vino a ver qué pasaba?",
    "opts": [
     "Se rio con vergüenza y abrió las ventanas",
     "Se enojó con el vecino por molestarlo",
     "Le pidió al vecino que lo ayudara a cocinar",
     "Le explicó con calma que no había ningún problema"
    ],
    "why": "«不好意思地笑一笑，把窗全部打开».",
    "whyT": "«不好意思地笑一笑，把窗全部打開».",
    "whyNot": [
     "No muestra enojo: se siente avergonzado.",
     "No le pide ayuda al vecino.",
     "Estaba avergonzado, no tranquilo."
    ]
   },
   {
    "type": "idea",
    "es": "¿Qué aprendió después gracias a su mamá?",
    "opts": [
     "Algunos trucos: fuego moderado, cortar antes y lavar enseguida",
     "A pedir comida hecha todos los días para no tener que cocinar nunca más",
     "Una receta secreta de arroz frito de su familia",
     "A usar un horno nuevo que no hace humo"
    ],
    "why": "Aprendió «火不要开得太大，材料先切好再开火，用完的东西马上洗».",
    "whyT": "Aprendió «火不要開得太大，材料先切好再開火，用完的東西馬上洗».",
    "whyNot": [
     "Sigue cocinando: ya sabe «五、六道菜».",
     "No habla de recetas secretas, sino de trucos generales.",
     "No menciona ningún horno."
    ],
    "whyNotT": [
     "Sigue cocinando: ya sabe «五、六道菜».",
     "No habla de recetas secretas, sino de trucos generales.",
     "No menciona ningún horno."
    ]
   }
  ]
 }
]);
