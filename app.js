// ===== Datos embebidos (fallback sin servidor) =====
const EMBEDDED_SENTENCES = [
   {
    "id": 1,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Hola, 聶c籀mo est獺s?",
    "spanish_cloze": "___, 聶c籀mo est獺s?",
    "spanish_answer": "Hola",
    "chinese_simp_full": "雿末嚗?憟賢?嚗?,
    "chinese_simp_cloze": "___嚗?憟賢?嚗?,
    "chinese_simp_answer": "雿末",
    "chinese_trad_full": "雿末嚗?憟賢?嚗?,
    "chinese_trad_cloze": "___嚗?憟賢?嚗?,
    "chinese_trad_answer": "雿末",
    "pinyin": "N? h?o, n? h?o ma?"
  },
  {
    "id": 2,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Me llamo Carlos.",
    "spanish_cloze": "Me ___ Carlos.",
    "spanish_answer": "llamo",
    "chinese_simp_full": "??⊥??胯?,
    "chinese_simp_cloze": "?__?⊥??胯?,
    "chinese_simp_answer": "??,
    "chinese_trad_full": "??⊥??胯?,
    "chinese_trad_cloze": "?__?⊥??胯?,
    "chinese_trad_answer": "??,
    "pinyin": "W? ji?o K?lu簷s蘋."
  },
  {
    "id": 3,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Gracias por tu ayuda.",
    "spanish_cloze": "___ por tu ayuda.",
    "spanish_answer": "Gracias",
    "chinese_simp_full": "靚Ｚ陝雿?撣桀??,
    "chinese_simp_cloze": "___雿?撣桀??,
    "chinese_simp_answer": "靚Ｚ陝",
    "chinese_trad_full": "雓?雿?撟怠??,
    "chinese_trad_cloze": "___雿?撟怠??,
    "chinese_trad_answer": "雓?",
    "pinyin": "Xi癡xie n? de b?ngzh羅."
  },
  {
    "id": 4,
    "level": 2,
    "module": "Saludos",
    "spanish_full": "Vivo en Buenos Aires.",
    "spanish_cloze": "___ en Buenos Aires.",
    "spanish_answer": "Vivo",
    "chinese_simp_full": "???典?摰笑?航?拇??,
    "chinese_simp_cloze": "?__?典?摰笑?航?拇??,
    "chinese_simp_answer": "雿?,
    "chinese_trad_full": "???典?摰姥?航?拇??,
    "chinese_trad_cloze": "?__?典?摰姥?航?拇??,
    "chinese_trad_answer": "雿?,
    "pinyin": "W? zh羅 z?i B羅y穩nu簷s蘋'?il穫s蘋."
  },
  {
    "id": 5,
    "level": 2,
    "module": "Saludos",
    "spanish_full": "聶D籀nde est獺 el ba簽o?",
    "spanish_cloze": "聶___ el ba簽o?",
    "spanish_answer": "D籀nde est獺",
    "chinese_simp_full": "瘣??游?芷?嚗?,
    "chinese_simp_cloze": "瘣??復__嚗?,
    "chinese_simp_answer": "?典??,
    "chinese_trad_full": "瘣???芾ㄐ嚗?,
    "chinese_trad_cloze": "瘣??__嚗?,
    "chinese_trad_answer": "?典鋆?,
    "pinyin": "X?sh?uji?n z?i n?l??"
  },
  {
    "id": 6,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Buen d穩a, 聶c籀mo and獺s?",
    "spanish_cloze": "Buen d穩a, 聶___?",
    "spanish_answer": "c籀mo and獺s",
    "chinese_simp_full": "?拐?憟踝?雿??瘀?",
    "chinese_simp_cloze": "?拐?憟踝?雿__嚗?,
    "chinese_simp_answer": "????,
    "chinese_trad_full": "?拐?憟踝?雿獐璅??",
    "chinese_trad_cloze": "?拐?憟踝?雿__嚗?,
    "chinese_trad_answer": "?獐璅?,
    "pinyin": "Z?oshang h?o, n? z?nmey?ng?"
  },
  {
    "id": 7,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Mucho gusto, soy de China.",
    "spanish_cloze": "Mucho gusto, ___ de China.",
    "spanish_answer": "soy",
    "chinese_simp_full": "敺??渲恕霂?嚗??臭葉?賭犖??,
    "chinese_simp_cloze": "敺??復__雿??銝剖鈭箝?,
    "chinese_simp_answer": "霈方?",
    "chinese_trad_full": "敺???霅?嚗??臭葉?犖??,
    "chinese_trad_cloze": "敺??__雿??銝剖?鈭箝?,
    "chinese_trad_answer": "隤?",
    "pinyin": "H?n g?ox穫ng r癡nshi n?, w? sh穫 Zh?nggu籀 r矇n."
  },
  {
    "id": 8,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Hasta ma簽ana, descansa.",
    "spanish_cloze": "Hasta ma簽ana, ___.",
    "spanish_answer": "descansa",
    "chinese_simp_full": "?予閫?憟賢末隡??,
    "chinese_simp_cloze": "?予閫?憟賢末___.",
    "chinese_simp_answer": "隡",
    "chinese_trad_full": "?予閬?憟賢末隡??,
    "chinese_trad_cloze": "?予閬?憟賢末___.",
    "chinese_trad_answer": "隡",
    "pinyin": "M穩ngti?n ji?n, h?oh?o xi贖xi."
  },
  {
    "id": 9,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "聶Todo bien? S穩, todo bien.",
    "spanish_cloze": "聶___ bien? S穩, todo bien.",
    "spanish_answer": "Todo",
    "chinese_simp_full": "銝?憟賢?嚗??銝?憟賬?,
    "chinese_simp_cloze": "___?賢末???舐?嚗??憟賬?,
    "chinese_simp_answer": "銝??,
    "chinese_trad_full": "銝?憟賢?嚗??銝?憟賬?,
    "chinese_trad_cloze": "___?賢末???舐?嚗??憟賬?,
    "chinese_trad_answer": "銝??,
    "pinyin": "Y穩qi癡 d?u h?o ma? Sh穫 de, y穩qi癡 d?u h?o."
  },
  {
    "id": 10,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Chau, nos vemos despu矇s.",
    "spanish_cloze": "___, nos vemos despu矇s.",
    "spanish_answer": "Chau",
    "chinese_simp_full": "??嚗?隡閫?,
    "chinese_simp_cloze": "___嚗?隡閫?,
    "chinese_simp_answer": "??",
    "chinese_trad_full": "??嚗???閬?,
    "chinese_trad_cloze": "___嚗???閬?,
    "chinese_trad_answer": "??",
    "pinyin": "Z?iji?n, y穩hu穫r ji?n.",
    "spanish_alternatives": [
      "Chao",
      "Adi籀s",
      "Hasta luego"
    ]
  },
  {
    "id": 11,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Bienvenidos a mi casa.",
    "spanish_cloze": "___ a mi casa.",
    "spanish_answer": "Bienvenidos",
    "chinese_simp_full": "甈Ｚ??交?摰嗚?,
    "chinese_simp_cloze": "___?交?摰嗚?,
    "chinese_simp_answer": "甈Ｚ?",
    "chinese_trad_full": "甇∟?靘?摰嗚?,
    "chinese_trad_cloze": "___靘?摰嗚?,
    "chinese_trad_answer": "甇∟?",
    "pinyin": "Hu?ny穩ng l獺i w? ji?."
  },
  {
    "id": 12,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Necesito renovar mi visa.",
    "spanish_cloze": "Necesito ___ mi visa.",
    "spanish_answer": "renovar",
    "chinese_simp_full": "??閬賒蝑暹??倌霂?,
    "chinese_simp_cloze": "??閬__??蝑曇???,
    "chinese_simp_answer": "蝏剔倌",
    "chinese_trad_full": "??閬?蝪賣??偷霅?,
    "chinese_trad_cloze": "??閬__??蝪質???,
    "chinese_trad_answer": "蝥偷",
    "pinyin": "W? x贖y?o x羅qi?n qi?nzh癡ng.",
    "spanish_alternatives": [
      "tramitar",
      "extender",
      "prorrogar"
    ]
  },
  {
    "id": 13,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "聶D籀nde puedo sacar el turno?",
    "spanish_cloze": "聶D籀nde puedo ___ el turno?",
    "spanish_answer": "sacar",
    "chinese_simp_full": "??芷??臭誑憸漲嚗?,
    "chinese_simp_cloze": "??芷??臭誑___嚗?,
    "chinese_simp_answer": "憸漲",
    "chinese_trad_full": "??芾ㄐ?臭誑??嚗?,
    "chinese_trad_cloze": "??芾ㄐ?臭誑___嚗?,
    "chinese_trad_answer": "??",
    "pinyin": "W? z?i n?l? k?y? y羅yu??",
    "spanish_alternatives": [
      "obtener",
      "conseguir",
      "reservar"
    ]
  },
  {
    "id": 14,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Mi pasaporte vence en marzo.",
    "spanish_cloze": "Mi ___ vence en marzo.",
    "spanish_answer": "pasaporte",
    "chinese_simp_full": "???斤銝?隞賢??,
    "chinese_simp_cloze": "??___銝?隞賢??,
    "chinese_simp_answer": "?斤",
    "chinese_trad_full": "??霅瑞銝?隞賢??,
    "chinese_trad_cloze": "??___銝?隞賢??,
    "chinese_trad_answer": "霅瑞",
    "pinyin": "W? de h羅zh?o s?n yu癡f癡n d?oq蘋."
  },
  {
    "id": 15,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Tengo que tramitar el DNI.",
    "spanish_cloze": "Tengo que ___ el DNI.",
    "spanish_answer": "tramitar",
    "chinese_simp_full": "??閬??澈隞質???,
    "chinese_simp_cloze": "??閬__頨思遢霂?,
    "chinese_simp_answer": "??",
    "chinese_trad_full": "??閬齒?澈隞質???,
    "chinese_trad_cloze": "??閬__頨思遢霅?,
    "chinese_trad_answer": "颲衣?",
    "pinyin": "W? x贖y?o b?nl? sh?nf癡nzh癡ng.",
    "spanish_alternatives": [
      "hacer",
      "gestionar",
      "solicitar"
    ]
  },
  {
    "id": 16,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "聶Cu獺nto sale la gesti籀n?",
    "spanish_cloze": "聶Cu獺nto sale la ___?",
    "spanish_answer": "gesti籀n",
    "chinese_simp_full": "??韐寧?臬?撠?",
    "chinese_simp_cloze": "??___?臬?撠?",
    "chinese_simp_answer": "韐寧",
    "chinese_trad_full": "颲衣?鞎餌?臬?撠?",
    "chinese_trad_cloze": "颲衣?___?臬?撠?",
    "chinese_trad_answer": "鞎餌",
    "pinyin": "B?nl? f癡iy簷ng sh穫 du?sh?o?",
    "spanish_alternatives": [
      "tr獺mite"
    ]
  },
  {
    "id": 17,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "Necesito una certificaci籀n de domicilio.",
    "spanish_cloze": "Necesito una ___ de domicilio.",
    "spanish_answer": "certificaci籀n",
    "chinese_simp_full": "??閬??霂???,
    "chinese_simp_cloze": "??閬??___??,
    "chinese_simp_answer": "霂?",
    "chinese_trad_full": "??閬??霅???,
    "chinese_trad_cloze": "??閬??___??,
    "chinese_trad_answer": "霅?",
    "pinyin": "W? x贖y?o zh羅zh? zh癡ngm穩ng.",
    "spanish_alternatives": [
      "constancia",
      "comprobante"
    ]
  },
  {
    "id": 18,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "聶Esta documentaci籀n es v獺lida?",
    "spanish_cloze": "聶Esta documentaci籀n es ___?",
    "spanish_answer": "v獺lida",
    "chinese_simp_full": "餈葵?辣????",
    "chinese_simp_cloze": "餈葵?辣___??",
    "chinese_simp_answer": "??",
    "chinese_trad_full": "??隞嗆???嚗?,
    "chinese_trad_cloze": "??隞跛__??",
    "chinese_trad_answer": "??",
    "pinyin": "Zh癡ge w矇nji?n y?uxi?o ma?",
    "spanish_alternatives": [
      "vigente"
    ]
  },
  {
    "id": 19,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Fui a la Direcci籀n Nacional de Migraciones.",
    "spanish_cloze": "Fui a la Direcci籀n Nacional de ___.",
    "spanish_answer": "Migraciones",
    "chinese_simp_full": "??憭拙鈭宏瘞???,
    "chinese_simp_cloze": "??憭拙鈭__??,
    "chinese_simp_answer": "蝘餅?撅",
    "chinese_trad_full": "??憭拙鈭宏瘞???,
    "chinese_trad_cloze": "??憭拙鈭__??,
    "chinese_trad_answer": "蝘餅?撅",
    "pinyin": "W? j蘋nti?n q羅le y穩m穩nj繳."
  },
  {
    "id": 20,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "El tr獺mite demora dos semanas.",
    "spanish_cloze": "El ___ demora dos semanas.",
    "spanish_answer": "tr獺mite",
    "chinese_simp_full": "餈葵?賒?閬舅?冽?氬?,
    "chinese_simp_cloze": "餈葵___?閬舅?冽?氬?,
    "chinese_simp_answer": "?賒",
    "chinese_trad_full": "??蝥?閬?望???,
    "chinese_trad_cloze": "?__?閬?望???,
    "chinese_trad_answer": "??",
    "pinyin": "Zh癡ge sh?ux羅 x贖y?o li?ng zh?u sh穩ji?n.",
    "spanish_alternatives": [
      "gesti籀n",
      "proceso"
    ]
  },
  {
    "id": 21,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "聶Me pueden dar un comprobante?",
    "spanish_cloze": "聶Me pueden dar un ___?",
    "spanish_answer": "comprobante",
    "chinese_simp_full": "?賜???撘?桀?嚗?,
    "chinese_simp_cloze": "?賜???撘__??",
    "chinese_simp_answer": "?嗆",
    "chinese_trad_full": "?賜策??撘菜??嚗?,
    "chinese_trad_cloze": "?賜策??撘琯__??",
    "chinese_trad_answer": "?嗆?",
    "pinyin": "N矇ng g?i w? y穫 zh?ng sh?uj羅 ma?",
    "spanish_alternatives": [
      "recibo",
      "constancia"
    ]
  },
  {
    "id": 22,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶D籀nde est獺n los fideos?",
    "spanish_cloze": "聶D籀nde est獺n los ___?",
    "spanish_answer": "fideos",
    "chinese_simp_full": "?Ｘ?典??",
    "chinese_simp_cloze": "___?典??",
    "chinese_simp_answer": "?Ｘ",
    "chinese_trad_full": "暻菜??典鋆∴?",
    "chinese_trad_cloze": "___?典鋆∴?",
    "chinese_trad_answer": "暻菜?",
    "pinyin": "Mi?nti獺o z?i n?l??",
    "spanish_alternatives": [
      "pastas"
    ]
  },
  {
    "id": 23,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶Tienen facturas de manteca?",
    "spanish_cloze": "聶Tienen ___ de manteca?",
    "spanish_answer": "facturas",
    "chinese_simp_full": "雿賑??瘝寥未撟脣?嚗?,
    "chinese_simp_cloze": "雿賑??瘝鉤__??",
    "chinese_simp_answer": "擖澆僕",
    "chinese_trad_full": "雿?暺硃擗嗾??",
    "chinese_trad_cloze": "雿?暺硃___??",
    "chinese_trad_answer": "擗嗾",
    "pinyin": "N?men y?u hu獺ngy籀u b?ngg?n ma?"
  },
  {
    "id": 24,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "Quiero medio kilo de yerba mate.",
    "spanish_cloze": "Quiero ___ de yerba mate.",
    "spanish_answer": "medio kilo",
    "chinese_simp_full": "????日帕暺??,
    "chinese_simp_cloze": "??___撽祇??嗚?,
    "chinese_simp_answer": "???,
    "chinese_trad_full": "????日收暺??,
    "chinese_trad_cloze": "??___擐祇??嗚?,
    "chinese_trad_answer": "???,
    "pinyin": "W? y?o b?n g?ngj蘋n m?d?ich獺."
  },
  {
    "id": 25,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶Cu獺nto sale el pan franc矇s?",
    "spanish_cloze": "聶___ el pan franc矇s?",
    "spanish_answer": "Cu獺nto sale",
    "chinese_simp_full": "瘜??Ｗ?憭??梧?",
    "chinese_simp_cloze": "瘜??Ｗ?___嚗?,
    "chinese_simp_answer": "憭???,
    "chinese_trad_full": "瘜?暻萄?憭??ｇ?",
    "chinese_trad_cloze": "瘜?暻萄?___嚗?,
    "chinese_trad_answer": "憭???,
    "pinyin": "F?g羅n mi?nb?o du?sh?o qi獺n?",
    "spanish_alternatives": [
      "Cu獺nto cuesta",
      "Cu獺nto es",
      "Cu獺nto vale"
    ]
  },
  {
    "id": 26,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "Pago con tarjeta o en efectivo.",
    "spanish_cloze": "Pago con tarjeta o en ___.",
    "spanish_answer": "efectivo",
    "chinese_simp_full": "??⊥??????,
    "chinese_simp_cloze": "??⊥??__隞?,
    "chinese_simp_answer": "?圈?",
    "chinese_trad_full": "??⊥??????,
    "chinese_trad_cloze": "??⊥??__隞?,
    "chinese_trad_answer": "?暸?",
    "pinyin": "W? y簷ng k? hu簷zh? xi?nj蘋n f羅.",
    "spanish_alternatives": [
      "dinero",
      "billetes"
    ]
  },
  {
    "id": 27,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶Hay descuento con la tarjeta?",
    "spanish_cloze": "聶Hay ___ con la tarjeta?",
    "spanish_answer": "descuento",
    "chinese_simp_full": "?瑕?????嚗?,
    "chinese_simp_cloze": "?瑕?__??",
    "chinese_simp_answer": "?",
    "chinese_trad_full": "?瑕?????嚗?,
    "chinese_trad_cloze": "?瑕?__??",
    "chinese_trad_answer": "?",
    "pinyin": "Shu?k? y?u zh矇k簷u ma?",
    "spanish_alternatives": [
      "promoci籀n",
      "rebaja",
      "oferta"
    ]
  },
  {
    "id": 28,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶D籀nde est獺 la caja?",
    "spanish_cloze": "聶D籀nde est獺 la ___?",
    "spanish_answer": "caja",
    "chinese_simp_full": "?園?啣?芷?嚗?,
    "chinese_simp_cloze": "___?典??",
    "chinese_simp_answer": "?園??,
    "chinese_trad_full": "?園??啣?芾ㄐ嚗?,
    "chinese_trad_cloze": "___?典鋆∴?",
    "chinese_trad_answer": "?園???,
    "pinyin": "Sh?uy穩nt獺i z?i n?l??"
  },
  {
    "id": 29,
    "level": 1,
    "module": "Supermercado",
    "spanish_full": "Necesito una bolsa, por favor.",
    "spanish_cloze": "Necesito una bolsa, ___.",
    "spanish_answer": "por favor",
    "chinese_simp_full": "霂瑞???銝芾?摮?,
    "chinese_simp_cloze": "___蝏?銝銝芾?摮?,
    "chinese_simp_answer": "霂?,
    "chinese_trad_full": "隢策????摮?,
    "chinese_trad_cloze": "___蝯行?銝??摮?,
    "chinese_trad_answer": "隢?,
    "pinyin": "Q?ng g?i w? y穩 ge d?izi."
  },
  {
    "id": 30,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶Tienen delivery a domicilio?",
    "spanish_cloze": "聶Tienen ___ a domicilio?",
    "spanish_answer": "delivery",
    "chinese_simp_full": "雿賑?揮銝???",
    "chinese_simp_cloze": "雿賑?揮銝___??",
    "chinese_simp_answer": "?",
    "chinese_trad_full": "雿??疏銝?????",
    "chinese_trad_cloze": "雿??疏銝?___??",
    "chinese_trad_answer": "??",
    "pinyin": "N?men y?u s簷nghu簷 sh?ngm矇n f繳w羅 ma?",
    "spanish_alternatives": [
      "env穩o"
    ]
  },
  {
    "id": 31,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "El precio subi籀 otra vez.",
    "spanish_cloze": "El precio ___ otra vez.",
    "spanish_answer": "subi籀",
    "chinese_simp_full": "隞瑟?隅鈭?,
    "chinese_simp_cloze": "隞瑟?__鈭?,
    "chinese_simp_answer": "瘨?,
    "chinese_trad_full": "?寞?撞鈭?,
    "chinese_trad_cloze": "?寞?__鈭?,
    "chinese_trad_answer": "瞍?,
    "pinyin": "Ji?g矇 y簷u zh?ng le.",
    "spanish_alternatives": [
      "aument籀",
      "creci籀"
    ]
  },
  {
    "id": 32,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "聶D籀nde puedo encontrar leche de almendras?",
    "spanish_cloze": "聶D籀nde puedo ___ leche de almendras?",
    "spanish_answer": "encontrar",
    "chinese_simp_full": "?典?隞交?唳?隞扒嚗?,
    "chinese_simp_cloze": "?典?隞北__??憟塚?",
    "chinese_simp_answer": "?曉",
    "chinese_trad_full": "?典鋆∪隞交?唳?隞扒嚗?,
    "chinese_trad_cloze": "?典鋆∪隞北__??憟塚?",
    "chinese_trad_answer": "?曉",
    "pinyin": "Z?i n?l? k?y? zh?od?o x蘋ngr矇n n?i?",
    "spanish_alternatives": [
      "hallar",
      "conseguir",
      "buscar"
    ]
  },
  {
    "id": 33,
    "level": 1,
    "module": "Supermercado",
    "spanish_full": "聶Me hac矇s un favor?",
    "spanish_cloze": "聶Me ___ un favor?",
    "spanish_answer": "hac矇s",
    "chinese_simp_full": "雿撣格?銝銝芸???",
    "chinese_simp_cloze": "雿___??銝芸???",
    "chinese_simp_answer": "撣?,
    "chinese_trad_full": "雿撟急?銝????",
    "chinese_trad_cloze": "雿___??????",
    "chinese_trad_answer": "撟?,
    "pinyin": "N? n矇ng b?ng w? y穩 ge m獺ng ma?",
    "spanish_alternatives": [
      "pod矇s",
      "puedes"
    ]
  },
  {
    "id": 34,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "Me dieron el certificado de antecedentes.",
    "spanish_cloze": "Me dieron el certificado de ___.",
    "spanish_answer": "antecedentes",
    "chinese_simp_full": "??唬??蝵芾扇敶???,
    "chinese_simp_cloze": "??唬??蝵泣__霂???,
    "chinese_simp_answer": "霈啣?",
    "chinese_trad_full": "??唬??∠蝵芾?????,
    "chinese_trad_cloze": "??唬??∠蝵泣__霅???,
    "chinese_trad_answer": "閮?",
    "pinyin": "W? n獺 d?o le w繳 f?nzu穫 j穫l羅 zh癡ngm穩ng.",
    "spanish_alternatives": [
      "certificado"
    ]
  },
  {
    "id": 35,
    "level": 3,
    "module": "Supermercado",
    "spanish_full": "聶Aceptan Mercado Pago?",
    "spanish_cloze": "聶___ Mercado Pago?",
    "spanish_answer": "Aceptan",
    "chinese_simp_full": "?臭誑?決ercado Pago隞?嚗?,
    "chinese_simp_cloze": "___?決ercado Pago隞?嚗?,
    "chinese_simp_answer": "?臭誑",
    "chinese_trad_full": "?臭誑?決ercado Pago隞?嚗?,
    "chinese_trad_cloze": "___?決ercado Pago隞?嚗?,
    "chinese_trad_answer": "?臭誑",
    "pinyin": "K?y? y簷ng Mercado Pago f羅 ma?",
    "spanish_alternatives": [
      "Toman",
      "Reciben"
    ]
  }
];

// ===== Constantes =====
const STORAGE_KEY = 'chino-espanol-app-v2';

const DATA_SOURCES = {
    'todas': 'data/sentences.json',
    'Saludos': 'data/sentences.json',
    'Migraciones': 'data/sentences.json',
    'Supermercado': 'data/sentences.json',
    'HSK1': 'data/exams/hsk1.json',
    'HSK2': 'data/exams/hsk2.json',
    'HSK3': 'data/exams/hsk3.json',
    'HSK4': 'data/exams/hsk4.json',
    'HSK5': 'data/exams/hsk5.json',
    'HSK6': 'data/exams/hsk6.json',
    'TOCFL': 'data/exams/tocfl.json',
    'DELE': 'data/exams/dele.json'
};

// ===== Estado =====
let state = {
    sentences: [],
    currentIndex: 0,
    mode: 'es-cn',
    charType: 'simp',
    knownWords: new Set(),
    newWords: new Set(),
    score: 0,
    activeModule: 'todas',
    translationRevealed: false,
    showPinyin: true
};

// ===== Persistencia localStorage =====
function saveProgress() {
    try {
        const data = {
            knownWords: Array.from(state.knownWords),
            newWords: Array.from(state.newWords),
            score: state.score,
            mode: state.mode,
            charType: state.charType,
            currentIndex: state.currentIndex,
            activeModule: state.activeModule,
            showPinyin: state.showPinyin
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* silencioso */ }
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (data.knownWords) state.knownWords = new Set(data.knownWords);
        if (data.newWords) state.newWords = new Set(data.newWords);
        if (typeof data.score === 'number') state.score = data.score;
        if (data.mode) state.mode = data.mode;
        if (data.charType) state.charType = data.charType;
        if (typeof data.currentIndex === 'number') state.currentIndex = data.currentIndex;
        if (data.activeModule) state.activeModule = data.activeModule;
        if (data.showPinyin !== undefined) state.showPinyin = data.showPinyin;
    } catch (e) { /* silencioso */ }
}

// ===== Helpers =====
function ck() {
    return state.charType === 'trad' ? 'trad' : 'simp';
}

function getFiltered() {
    if (state.activeModule === 'todas') return state.sentences;
    return state.sentences.filter(s => s.module === state.activeModule);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
    loadProgress();
    await loadSentences();
    setupEventListeners();
    applySavedUI();
    renderCurrentSentence();
    updateStats();
    updateVocabularyPanel();
});

function applySavedUI() {
    document.getElementById('btn-es-cn').classList.toggle('active', state.mode === 'es-cn');
    document.getElementById('btn-cn-es').classList.toggle('active', state.mode === 'cn-es');
    document.getElementById('btn-simplified').classList.toggle('active', state.charType === 'simp');
    document.getElementById('btn-traditional').classList.toggle('active', state.charType === 'trad');
    document.getElementById('script-label').textContent = state.charType === 'simp' ? '蝞雿? : '蝜?';
    
    // Actualizar botones diarios Y de ex獺menes
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(b => {
        b.classList.toggle('active', b.dataset.module === state.activeModule);
    });
    
    var pinyinBtn = document.getElementById('btn-pinyin');
    pinyinBtn.textContent = state.showPinyin ? '?? Pinyin: ON' : '?? Pinyin: OFF';
    pinyinBtn.classList.toggle('active', state.showPinyin);
}

// ===== Carga de datos (INTEGRADA CON EX?MENES) =====
async function loadSentences() {
    try {
        // Determinar qu矇 archivo cargar seg繳n el m籀dulo activo
        const sourceFile = DATA_SOURCES[state.activeModule] || DATA_SOURCES['todas'];
        
        const r = await fetch(sourceFile);
        if (!r.ok) throw new Error('Archivo no encontrado');
        
        const d = await r.json();
        
        // Manejar tanto formato array directo como objeto {sentences: []}
        state.sentences = Array.isArray(d) ? d : (d.sentences || []);
        
        console.log(`??${state.sentences.length} oraciones cargadas desde: ${sourceFile}`);
    } catch (e) {
        console.warn('?? Fall籀 carga externa, usando datos embebidos:', e.message);
        // Fallback: usar datos embebidos solo para m籀dulos diarios
        if (['todas', 'Saludos', 'Migraciones', 'Supermercado'].includes(state.activeModule)) {
            state.sentences = EMBEDDED_SENTENCES;
        } else {
            state.sentences = [];
            alert(`No se pudieron cargar las oraciones de ${state.activeModule}. Verifica que el archivo exista.`);
        }
    }
}

// ===== Eventos (INTEGRADO CON BOTONES DE EXAMEN) =====
function setupEventListeners() {
    document.getElementById('btn-es-cn').addEventListener('click', () => setMode('es-cn'));
    document.getElementById('btn-cn-es').addEventListener('click', () => setMode('cn-es'));
    document.getElementById('btn-simplified').addEventListener('click', () => setCharType('simp'));
    document.getElementById('btn-traditional').addEventListener('click', () => setCharType('trad'));
    document.getElementById('btn-check').addEventListener('click', checkAnswer);
    document.getElementById('btn-reveal').addEventListener('click', revealAnswer);
    document.getElementById('btn-know').addEventListener('click', () => markWord(true));
    document.getElementById('btn-not-know').addEventListener('click', () => markWord(false));
    document.getElementById('answer-input').addEventListener('keypress', e => {
        if (e.key === 'Enter') checkAnswer();
    });
    document.getElementById('btn-play-es').addEventListener('click', () => playAudio('es'));
    document.getElementById('btn-play-cn').addEventListener('click', () => playAudio('cn'));
    
    // NUEVO: Selecciona TODOS los botones de filtro (diarios + ex獺menes)
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(btn => {
        btn.addEventListener('click', () => setModule(btn.dataset.module));
    });
   // Evento para cambiar nivel HSK
document.getElementById('select-hsk-level').addEventListener('change', (e) => {
    setModule(e.target.value); // Reutiliza tu funci籀n existente
});
    
    document.getElementById('btn-reset').addEventListener('click', resetProgress);
    document.getElementById('btn-pinyin').addEventListener('click', togglePinyin);
}

// ===== Modo ES<->CN =====
function setMode(mode) {
    state.mode = mode;
    document.getElementById('btn-es-cn').classList.toggle('active', mode === 'es-cn');
    document.getElementById('btn-cn-es').classList.toggle('active', mode === 'cn-es');
    saveProgress();
    renderCurrentSentence();
}

// ===== Tipo de car獺cter simp/trad =====
function setCharType(ct) {
    state.charType = ct;
    document.getElementById('btn-simplified').classList.toggle('active', ct === 'simp');
    document.getElementById('btn-traditional').classList.toggle('active', ct === 'trad');
    document.getElementById('script-label').textContent = ct === 'simp' ? '蝞雿? : '蝜?';
    saveProgress();
    renderCurrentSentence();
}

// ===== Filtro m籀dulo (AHORA RECARGA DATOS) =====
function setModule(mod) {
    state.activeModule = mod;
    state.currentIndex = 0;
    state.translationRevealed = false;
    
    // Actualizar UI de TODOS los botones (diarios y ex獺menes)
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(b => {
        b.classList.toggle('active', b.dataset.module === mod);
    });
    
    saveProgress();
    
    // Recargar oraciones del nuevo m籀dulo
    loadSentences().then(() => {
        renderCurrentSentence();
        updateStats();
    });
}

// ===== Toggle Pinyin =====
function togglePinyin() {
    state.showPinyin = !state.showPinyin;
    var btn = document.getElementById('btn-pinyin');
    btn.textContent = state.showPinyin ? '?? Pinyin: ON' : '?? Pinyin: OFF';
    btn.classList.toggle('active', state.showPinyin);
    saveProgress();
    renderCurrentSentence();
}

// ===== Renderizado (SIN SPOILER) =====
function renderCurrentSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    if (state.currentIndex >= filtered.length) state.currentIndex = 0;
    const s = filtered[state.currentIndex];
    if (!s) return;

    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // Header
    document.getElementById('card-level').textContent = 'Nivel ' + s.level;
    document.getElementById('card-number').textContent = (state.currentIndex + 1) + '/' + filtered.length;

    // Mostrar el CLOZE en el idioma que se est獺 APRENDIENDO
    let clozeText;
    if (learningChinese) {
        clozeText = s['chinese_' + k + '_cloze'];
    } else {
        clozeText = s.spanish_cloze;
    }
    document.getElementById('sentence-text').textContent = clozeText || 'Error en datos';

    // Pinyin: solo cuando se aprende chino Y toggle activado
    var pinyinEl = document.getElementById('pinyin-display');
    if (learningChinese && state.showPinyin && s.pinyin) {
        pinyinEl.textContent = s.pinyin;
        pinyinEl.classList.remove('hidden');
    } else {
        pinyinEl.classList.add('hidden');
    }

    // Ocultar traducci籀n (spoiler protection)
    state.translationRevealed = false;
    const transEl = document.getElementById('translation-text');
    transEl.textContent = '\ud83d\udca1 La traducci\u00f3n aparecer\u00e1 al verificar...';
    transEl.style.opacity = '0.4';
    transEl.style.fontStyle = 'italic';

    // Limpiar
    document.getElementById('answer-input').value = '';
    hideFeedback();

    // Placeholder en el idioma que se est獺 APRENDIENDO
    if (learningChinese) {
        const charLabel = state.charType === 'trad' ? 'tradicional' : 'simplificado';
        document.getElementById('answer-input').placeholder = 'Escribe en chino (' + charLabel + ')...';
    } else {
        document.getElementById('answer-input').placeholder = 'Escribe en espa\u00f1ol (conjugado)...';
    }
}

// ===== Revelar traducci籀n completa =====
function showFullTranslation() {
    if (state.translationRevealed) return;
    state.translationRevealed = true;

    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    let translationText;
    if (learningChinese) {
        translationText = s.spanish_full;
    } else {
        translationText = s['chinese_' + k + '_full'];
    }

    const el = document.getElementById('translation-text');
    el.textContent = translationText || 'Error en datos';
    el.style.opacity = '1';
    el.style.fontStyle = 'normal';
}

// ===== Verificaci籀n con sin籀nimos =====
function getValidAnswers(s, learningChinese, k) {
    const answers = [];
    if (learningChinese) {
        const simpAns = s.chinese_simp_answer;
        const tradAns = s.chinese_trad_answer;
        if (simpAns) answers.push(simpAns);
        if (tradAns && tradAns !== simpAns) answers.push(tradAns);
    } else {
        answers.push(s.spanish_answer);
        if (s.spanish_alternatives) {
            s.spanish_alternatives.forEach(function(alt) {
                if (answers.indexOf(alt) === -1) answers.push(alt);
            });
        }
    }
    return answers;
}

function checkAnswer() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const input = document.getElementById('answer-input').value.trim();
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    if (!input) {
        showFeedback('Escribe una respuesta antes de verificar.', 'incorrect');
        return;
    }

    const validAnswers = getValidAnswers(s, learningChinese, k);
    const correctAnswer = validAnswers[0];
    const inputLower = input.toLowerCase();

    showFullTranslation();

    const isCorrect = validAnswers.some(function(ans) {
        const a = ans.toLowerCase();
        return input === ans || inputLower === a || inputLower.includes(a) || a.includes(inputLower);
    });

    const allOptions = validAnswers.join(' / ');

    if (isCorrect) {
        showFeedback('\u2705 \u00a1Correcto! "' + allOptions + '"', 'correct');
        validAnswers.forEach(function(a) {
            state.knownWords.add(a);
            state.newWords.delete(a);
        });
        state.score++;
    } else {
        showFeedback('\u274c Respuestas v\u00e1lidas: "' + allOptions + '"', 'incorrect');
        state.newWords.add(correctAnswer);
    }

    saveProgress();
    updateStats();
    updateVocabularyPanel();
}

// ===== Revelar respuesta =====
function revealAnswer() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    const validAnswers = getValidAnswers(s, learningChinese, k);
    const correctAnswer = validAnswers[0];
    const allOptions = validAnswers.join(' / ');

    showFullTranslation();
    showFeedback('? Respuestas v獺lidas: "' + allOptions + '"', 'correct');

    validAnswers.forEach(function(a) { state.newWords.add(a); });
    saveProgress();
    updateStats();
    updateVocabularyPanel();
}

// ===== Marcar palabra =====
function markWord(known) {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    let answer;
    if (learningChinese) {
        answer = s['chinese_' + k + '_answer'];
    } else {
        answer = s.spanish_answer;
    }

    if (known) {
        state.knownWords.add(answer);
        state.newWords.delete(answer);
    } else {
        state.newWords.add(answer);
        state.knownWords.delete(answer);
    }

    saveProgress();
    updateStats();
    updateVocabularyPanel();
    nextSentence();
}

// ===== Navegaci籀n =====
function nextSentence() {
    const filtered = getFiltered();
    state.currentIndex = (state.currentIndex + 1) % filtered.length;
    saveProgress();
    renderCurrentSentence();
}

// ===== Feedback =====
function showFeedback(msg, type) {
    const el = document.getElementById('feedback');
    el.textContent = msg;
    el.className = 'feedback ' + type;
    el.classList.remove('hidden');
}

function hideFeedback() {
    document.getElementById('feedback').classList.add('hidden');
}

// ===== Estad穩sticas =====
function updateStats() {
    document.getElementById('stats-known').textContent = 'Conocidas: ' + state.knownWords.size;
    document.getElementById('stats-new').textContent = 'Nuevas: ' + state.newWords.size;
}

// ===== Panel vocabulario =====
function updateVocabularyPanel() {
    const list = document.getElementById('vocab-list');
    list.innerHTML = '';
    state.knownWords.forEach(w => {
        const el = document.createElement('span');
        el.className = 'vocab-item known';
        el.textContent = w;
        list.appendChild(el);
    });
    state.newWords.forEach(w => {
        const el = document.createElement('span');
        el.className = 'vocab-item';
        el.textContent = w;
        list.appendChild(el);
    });
}

// ===== Reset =====
function resetProgress() {
    if (!confirm('Borrar todo el progreso guardado?')) return;
    localStorage.removeItem(STORAGE_KEY);
    state.knownWords = new Set();
    state.newWords = new Set();
    state.score = 0;
    state.currentIndex = 0;
    updateStats();
    updateVocabularyPanel();
    renderCurrentSentence();
}

// ===== Audio TTS Nativo (Vercel + Piper) =====
const TTS_API_URL = 'https://app-chino-espa-ol.vercel.app/api/tts';

async function playAudio(lang) {
    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    const k = ck();

    let text, langCode;
    if (lang === 'es') {
        text = s.spanish_full;
        langCode = 'es-ES';
    } else {
        text = s['chinese_' + k + '_full'];
        langCode = 'zh-CN'; 
    }

    const btn = document.activeElement.tagName === 'BUTTON' ? document.activeElement : null;
    const originalText = btn ? btn.innerText : '';
    
    if (btn) {
        btn.innerText = '??Cargando...';
        btn.disabled = true;
    }

    try {
        const response = await fetch(TTS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text, lang: langCode })
        });

        if (!response.ok) throw new Error('Error en servidor');

        const data = await response.json();
        
        if (data.audio) {
            const binaryString = atob(data.audio);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            
            const audio = new Audio(url);
            await audio.play();
            audio.onended = () => URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.warn('Vercel fall籀, usando voz del sistema:', error);
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(text);
            u.lang = langCode;
            u.rate = 0.8;
            speechSynthesis.speak(u);
        }
    } finally {
        if (btn) {
            btn.innerText = originalText || '??';
        }
    }
}

// ===== MODO OSCURO =====
const themeBtn = document.getElementById('btn-theme');
if (themeBtn) { // Protecci籀n por si el bot籀n no existe a繳n
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '?儭?;
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '?儭? : '??';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
