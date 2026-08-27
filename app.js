// ===== Datos embebidos (fallback sin servidor) =====
const EMBEDDED_SENTENCES = [
   {
    "id": 1,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Hola, ¿cómo estás?",
    "spanish_cloze": "___, ¿cómo estás?",
    "spanish_answer": "Hola",
    "chinese_simp_full": "你好，你好吗？",
    "chinese_simp_cloze": "___，你好吗？",
    "chinese_simp_answer": "你好",
    "chinese_trad_full": "你好，你好嗎？",
    "chinese_trad_cloze": "___，你好嗎？",
    "chinese_trad_answer": "你好",
    "pinyin": "Nǐ hǎo, nǐ hǎo ma?"
  },
  {
    "id": 2,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Me llamo Carlos.",
    "spanish_cloze": "Me ___ Carlos.",
    "spanish_answer": "llamo",
    "chinese_simp_full": "我叫卡洛斯。",
    "chinese_simp_cloze": "我___卡洛斯。",
    "chinese_simp_answer": "叫",
    "chinese_trad_full": "我叫卡洛斯。",
    "chinese_trad_cloze": "我___卡洛斯。",
    "chinese_trad_answer": "叫",
    "pinyin": "Wǒ jiào Kǎluòsī."
  },
  {
    "id": 3,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Gracias por tu ayuda.",
    "spanish_cloze": "___ por tu ayuda.",
    "spanish_answer": "Gracias",
    "chinese_simp_full": "谢谢你的帮助。",
    "chinese_simp_cloze": "___你的帮助。",
    "chinese_simp_answer": "谢谢",
    "chinese_trad_full": "謝謝你的幫助。",
    "chinese_trad_cloze": "___你的幫助。",
    "chinese_trad_answer": "謝謝",
    "pinyin": "Xièxie nǐ de bāngzhù."
  },
  {
    "id": 4,
    "level": 2,
    "module": "Saludos",
    "spanish_full": "Vivo en Buenos Aires.",
    "spanish_cloze": "___ en Buenos Aires.",
    "spanish_answer": "Vivo",
    "chinese_simp_full": "我住在布宜诺斯艾利斯。",
    "chinese_simp_cloze": "我___在布宜诺斯艾利斯。",
    "chinese_simp_answer": "住",
    "chinese_trad_full": "我住在布宜諾斯艾利斯。",
    "chinese_trad_cloze": "我___在布宜諾斯艾利斯。",
    "chinese_trad_answer": "住",
    "pinyin": "Wǒ zhù zài Bùyínuòsī'àilìsī."
  },
  {
    "id": 5,
    "level": 2,
    "module": "Saludos",
    "spanish_full": "¿Dónde está el baño?",
    "spanish_cloze": "¿___ el baño?",
    "spanish_answer": "Dónde está",
    "chinese_simp_full": "洗手间在哪里？",
    "chinese_simp_cloze": "洗手间___？",
    "chinese_simp_answer": "在哪里",
    "chinese_trad_full": "洗手間在哪裡？",
    "chinese_trad_cloze": "洗手間___？",
    "chinese_trad_answer": "在哪裡",
    "pinyin": "Xǐshǒujiān zài nǎlǐ?"
  },
  {
    "id": 6,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Buen día, ¿cómo andás?",
    "spanish_cloze": "Buen día, ¿___?",
    "spanish_answer": "cómo andás",
    "chinese_simp_full": "早上好，你怎么样？",
    "chinese_simp_cloze": "早上好，你___？",
    "chinese_simp_answer": "怎么样",
    "chinese_trad_full": "早上好，你怎麼樣？",
    "chinese_trad_cloze": "早上好，你___？",
    "chinese_trad_answer": "怎麼樣",
    "pinyin": "Zǎoshang hǎo, nǐ zěnmeyàng?"
  },
  {
    "id": 7,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Mucho gusto, soy de China.",
    "spanish_cloze": "Mucho gusto, ___ de China.",
    "spanish_answer": "soy",
    "chinese_simp_full": "很高兴认识你，我是中国人。",
    "chinese_simp_cloze": "很高兴___你，我是中国人。",
    "chinese_simp_answer": "认识",
    "chinese_trad_full": "很高興認識你，我是中國人。",
    "chinese_trad_cloze": "很高興___你，我是中國人。",
    "chinese_trad_answer": "認識",
    "pinyin": "Hěn gāoxìng rènshi nǐ, wǒ shì Zhōngguó rén."
  },
  {
    "id": 8,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Hasta mañana, descansa.",
    "spanish_cloze": "Hasta mañana, ___.",
    "spanish_answer": "descansa",
    "chinese_simp_full": "明天见，好好休息。",
    "chinese_simp_cloze": "明天见，好好___.",
    "chinese_simp_answer": "休息",
    "chinese_trad_full": "明天見，好好休息。",
    "chinese_trad_cloze": "明天見，好好___.",
    "chinese_trad_answer": "休息",
    "pinyin": "Míngtiān jiàn, hǎohǎo xiūxi."
  },
  {
    "id": 9,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "¿Todo bien? Sí, todo bien.",
    "spanish_cloze": "¿___ bien? Sí, todo bien.",
    "spanish_answer": "Todo",
    "chinese_simp_full": "一切都好吗？是的，一切都好。",
    "chinese_simp_cloze": "___都好吗？是的，一切都好。",
    "chinese_simp_answer": "一切",
    "chinese_trad_full": "一切都好嗎？是的，一切都好。",
    "chinese_trad_cloze": "___都好嗎？是的，一切都好。",
    "chinese_trad_answer": "一切",
    "pinyin": "Yíqiè dōu hǎo ma? Shì de, yíqiè dōu hǎo."
  },
  {
    "id": 10,
    "level": 1,
    "module": "Saludos",
    "spanish_full": "Chau, nos vemos después.",
    "spanish_cloze": "___, nos vemos después.",
    "spanish_answer": "Chau",
    "chinese_simp_full": "再见，一会儿见。",
    "chinese_simp_cloze": "___，一会儿见。",
    "chinese_simp_answer": "再见",
    "chinese_trad_full": "再見，一會兒見。",
    "chinese_trad_cloze": "___，一會兒見。",
    "chinese_trad_answer": "再見",
    "pinyin": "Zàijiàn, yíhuìr jiàn.",
    "spanish_alternatives": [
      "Chao",
      "Adiós",
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
    "chinese_simp_full": "欢迎来我家。",
    "chinese_simp_cloze": "___来我家。",
    "chinese_simp_answer": "欢迎",
    "chinese_trad_full": "歡迎來我家。",
    "chinese_trad_cloze": "___來我家。",
    "chinese_trad_answer": "歡迎",
    "pinyin": "Huānyíng lái wǒ jiā."
  },
  {
    "id": 12,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Necesito renovar mi visa.",
    "spanish_cloze": "Necesito ___ mi visa.",
    "spanish_answer": "renovar",
    "chinese_simp_full": "我需要续签我的签证。",
    "chinese_simp_cloze": "我需要___我的签证。",
    "chinese_simp_answer": "续签",
    "chinese_trad_full": "我需要續簽我的簽證。",
    "chinese_trad_cloze": "我需要___我的簽證。",
    "chinese_trad_answer": "續簽",
    "pinyin": "Wǒ xūyào xùqiān qiānzhèng.",
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
    "spanish_full": "¿Dónde puedo sacar el turno?",
    "spanish_cloze": "¿Dónde puedo ___ el turno?",
    "spanish_answer": "sacar",
    "chinese_simp_full": "我在哪里可以预约？",
    "chinese_simp_cloze": "我在哪里可以___？",
    "chinese_simp_answer": "预约",
    "chinese_trad_full": "我在哪裡可以預約？",
    "chinese_trad_cloze": "我在哪裡可以___？",
    "chinese_trad_answer": "預約",
    "pinyin": "Wǒ zài nǎlǐ kěyǐ yùyuē?",
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
    "chinese_simp_full": "我的护照三月份到期。",
    "chinese_simp_cloze": "我的___三月份到期。",
    "chinese_simp_answer": "护照",
    "chinese_trad_full": "我的護照三月份到期。",
    "chinese_trad_cloze": "我的___三月份到期。",
    "chinese_trad_answer": "護照",
    "pinyin": "Wǒ de hùzhào sān yuèfèn dàoqī."
  },
  {
    "id": 15,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Tengo que tramitar el DNI.",
    "spanish_cloze": "Tengo que ___ el DNI.",
    "spanish_answer": "tramitar",
    "chinese_simp_full": "我需要办理身份证。",
    "chinese_simp_cloze": "我需要___身份证。",
    "chinese_simp_answer": "办理",
    "chinese_trad_full": "我需要辦理身份證。",
    "chinese_trad_cloze": "我需要___身份證。",
    "chinese_trad_answer": "辦理",
    "pinyin": "Wǒ xūyào bànlǐ shēnfènzhèng.",
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
    "spanish_full": "¿Cuánto sale la gestión?",
    "spanish_cloze": "¿Cuánto sale la ___?",
    "spanish_answer": "gestión",
    "chinese_simp_full": "办理费用是多少？",
    "chinese_simp_cloze": "办理___是多少？",
    "chinese_simp_answer": "费用",
    "chinese_trad_full": "辦理費用是多少？",
    "chinese_trad_cloze": "辦理___是多少？",
    "chinese_trad_answer": "費用",
    "pinyin": "Bànlǐ fèiyòng shì duōshǎo?",
    "spanish_alternatives": [
      "trámite"
    ]
  },
  {
    "id": 17,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "Necesito una certificación de domicilio.",
    "spanish_cloze": "Necesito una ___ de domicilio.",
    "spanish_answer": "certificación",
    "chinese_simp_full": "我需要住址证明。",
    "chinese_simp_cloze": "我需要住址___。",
    "chinese_simp_answer": "证明",
    "chinese_trad_full": "我需要住址證明。",
    "chinese_trad_cloze": "我需要住址___。",
    "chinese_trad_answer": "證明",
    "pinyin": "Wǒ xūyào zhùzhǐ zhèngmíng.",
    "spanish_alternatives": [
      "constancia",
      "comprobante"
    ]
  },
  {
    "id": 18,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "¿Esta documentación es válida?",
    "spanish_cloze": "¿Esta documentación es ___?",
    "spanish_answer": "válida",
    "chinese_simp_full": "这个文件有效吗？",
    "chinese_simp_cloze": "这个文件___吗？",
    "chinese_simp_answer": "有效",
    "chinese_trad_full": "這個文件有效嗎？",
    "chinese_trad_cloze": "這個文件___嗎？",
    "chinese_trad_answer": "有效",
    "pinyin": "Zhège wénjiàn yǒuxiào ma?",
    "spanish_alternatives": [
      "vigente"
    ]
  },
  {
    "id": 19,
    "level": 2,
    "module": "Migraciones",
    "spanish_full": "Fui a la Dirección Nacional de Migraciones.",
    "spanish_cloze": "Fui a la Dirección Nacional de ___.",
    "spanish_answer": "Migraciones",
    "chinese_simp_full": "我今天去了移民局。",
    "chinese_simp_cloze": "我今天去了___。",
    "chinese_simp_answer": "移民局",
    "chinese_trad_full": "我今天去了移民局。",
    "chinese_trad_cloze": "我今天去了___。",
    "chinese_trad_answer": "移民局",
    "pinyin": "Wǒ jīntiān qùle yímínjú."
  },
  {
    "id": 20,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "El trámite demora dos semanas.",
    "spanish_cloze": "El ___ demora dos semanas.",
    "spanish_answer": "trámite",
    "chinese_simp_full": "这个手续需要两周时间。",
    "chinese_simp_cloze": "这个___需要两周时间。",
    "chinese_simp_answer": "手续",
    "chinese_trad_full": "這個手續需要兩週時間。",
    "chinese_trad_cloze": "這個___需要兩週時間。",
    "chinese_trad_answer": "手續",
    "pinyin": "Zhège shǒuxù xūyào liǎng zhōu shíjiān.",
    "spanish_alternatives": [
      "gestión",
      "proceso"
    ]
  },
  {
    "id": 21,
    "level": 3,
    "module": "Migraciones",
    "spanish_full": "¿Me pueden dar un comprobante?",
    "spanish_cloze": "¿Me pueden dar un ___?",
    "spanish_answer": "comprobante",
    "chinese_simp_full": "能给我一张收据吗？",
    "chinese_simp_cloze": "能给我一张___吗？",
    "chinese_simp_answer": "收据",
    "chinese_trad_full": "能給我一張收據嗎？",
    "chinese_trad_cloze": "能給我一張___嗎？",
    "chinese_trad_answer": "收據",
    "pinyin": "Néng gěi wǒ yì zhāng shōujù ma?",
    "spanish_alternatives": [
      "recibo",
      "constancia"
    ]
  },
  {
    "id": 22,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Dónde están los fideos?",
    "spanish_cloze": "¿Dónde están los ___?",
    "spanish_answer": "fideos",
    "chinese_simp_full": "面条在哪里？",
    "chinese_simp_cloze": "___在哪里？",
    "chinese_simp_answer": "面条",
    "chinese_trad_full": "麵條在哪裡？",
    "chinese_trad_cloze": "___在哪裡？",
    "chinese_trad_answer": "麵條",
    "pinyin": "Miàntiáo zài nǎlǐ?",
    "spanish_alternatives": [
      "pastas"
    ]
  },
  {
    "id": 23,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Tienen facturas de manteca?",
    "spanish_cloze": "¿Tienen ___ de manteca?",
    "spanish_answer": "facturas",
    "chinese_simp_full": "你们有黄油饼干吗？",
    "chinese_simp_cloze": "你们有黄油___吗？",
    "chinese_simp_answer": "饼干",
    "chinese_trad_full": "你們有黃油餅乾嗎？",
    "chinese_trad_cloze": "你們有黃油___嗎？",
    "chinese_trad_answer": "餅乾",
    "pinyin": "Nǐmen yǒu huángyóu bǐnggān ma?"
  },
  {
    "id": 24,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "Quiero medio kilo de yerba mate.",
    "spanish_cloze": "Quiero ___ de yerba mate.",
    "spanish_answer": "medio kilo",
    "chinese_simp_full": "我要半公斤马黛茶。",
    "chinese_simp_cloze": "我要___马黛茶。",
    "chinese_simp_answer": "半公斤",
    "chinese_trad_full": "我要半公斤馬黛茶。",
    "chinese_trad_cloze": "我要___馬黛茶。",
    "chinese_trad_answer": "半公斤",
    "pinyin": "Wǒ yào bàn gōngjīn mǎdàichá."
  },
  {
    "id": 25,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Cuánto sale el pan francés?",
    "spanish_cloze": "¿___ el pan francés?",
    "spanish_answer": "Cuánto sale",
    "chinese_simp_full": "法棍面包多少钱？",
    "chinese_simp_cloze": "法棍面包___？",
    "chinese_simp_answer": "多少钱",
    "chinese_trad_full": "法棍麵包多少錢？",
    "chinese_trad_cloze": "法棍麵包___？",
    "chinese_trad_answer": "多少錢",
    "pinyin": "Fǎgùn miànbāo duōshǎo qián?",
    "spanish_alternatives": [
      "Cuánto cuesta",
      "Cuánto es",
      "Cuánto vale"
    ]
  },
  {
    "id": 26,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "Pago con tarjeta o en efectivo.",
    "spanish_cloze": "Pago con tarjeta o en ___.",
    "spanish_answer": "efectivo",
    "chinese_simp_full": "我用卡或者现金付。",
    "chinese_simp_cloze": "我用卡或者___付。",
    "chinese_simp_answer": "现金",
    "chinese_trad_full": "我用卡或者現金付。",
    "chinese_trad_cloze": "我用卡或者___付。",
    "chinese_trad_answer": "現金",
    "pinyin": "Wǒ yòng kǎ huòzhě xiànjīn fù.",
    "spanish_alternatives": [
      "dinero",
      "billetes"
    ]
  },
  {
    "id": 27,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Hay descuento con la tarjeta?",
    "spanish_cloze": "¿Hay ___ con la tarjeta?",
    "spanish_answer": "descuento",
    "chinese_simp_full": "刷卡有折扣吗？",
    "chinese_simp_cloze": "刷卡有___吗？",
    "chinese_simp_answer": "折扣",
    "chinese_trad_full": "刷卡有折扣嗎？",
    "chinese_trad_cloze": "刷卡有___嗎？",
    "chinese_trad_answer": "折扣",
    "pinyin": "Shuākǎ yǒu zhékòu ma?",
    "spanish_alternatives": [
      "promoción",
      "rebaja",
      "oferta"
    ]
  },
  {
    "id": 28,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Dónde está la caja?",
    "spanish_cloze": "¿Dónde está la ___?",
    "spanish_answer": "caja",
    "chinese_simp_full": "收银台在哪里？",
    "chinese_simp_cloze": "___在哪里？",
    "chinese_simp_answer": "收银台",
    "chinese_trad_full": "收銀台在哪裡？",
    "chinese_trad_cloze": "___在哪裡？",
    "chinese_trad_answer": "收銀台",
    "pinyin": "Shōuyíntái zài nǎlǐ?"
  },
  {
    "id": 29,
    "level": 1,
    "module": "Supermercado",
    "spanish_full": "Necesito una bolsa, por favor.",
    "spanish_cloze": "Necesito una bolsa, ___.",
    "spanish_answer": "por favor",
    "chinese_simp_full": "请给我一个袋子。",
    "chinese_simp_cloze": "___给我一个袋子。",
    "chinese_simp_answer": "请",
    "chinese_trad_full": "請給我一個袋子。",
    "chinese_trad_cloze": "___給我一個袋子。",
    "chinese_trad_answer": "請",
    "pinyin": "Qǐng gěi wǒ yí ge dàizi."
  },
  {
    "id": 30,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Tienen delivery a domicilio?",
    "spanish_cloze": "¿Tienen ___ a domicilio?",
    "spanish_answer": "delivery",
    "chinese_simp_full": "你们有送货上门服务吗？",
    "chinese_simp_cloze": "你们有送货上门___吗？",
    "chinese_simp_answer": "服务",
    "chinese_trad_full": "你們有送貨上門服務嗎？",
    "chinese_trad_cloze": "你們有送貨上門___嗎？",
    "chinese_trad_answer": "服務",
    "pinyin": "Nǐmen yǒu sònghuò shàngmén fúwù ma?",
    "spanish_alternatives": [
      "envío"
    ]
  },
  {
    "id": 31,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "El precio subió otra vez.",
    "spanish_cloze": "El precio ___ otra vez.",
    "spanish_answer": "subió",
    "chinese_simp_full": "价格又涨了。",
    "chinese_simp_cloze": "价格又___了。",
    "chinese_simp_answer": "涨",
    "chinese_trad_full": "價格又漲了。",
    "chinese_trad_cloze": "價格又___了。",
    "chinese_trad_answer": "漲",
    "pinyin": "Jiàgé yòu zhǎng le.",
    "spanish_alternatives": [
      "aumentó",
      "creció"
    ]
  },
  {
    "id": 32,
    "level": 2,
    "module": "Supermercado",
    "spanish_full": "¿Dónde puedo encontrar leche de almendras?",
    "spanish_cloze": "¿Dónde puedo ___ leche de almendras?",
    "spanish_answer": "encontrar",
    "chinese_simp_full": "在哪里可以找到杏仁奶？",
    "chinese_simp_cloze": "在哪里可以___杏仁奶？",
    "chinese_simp_answer": "找到",
    "chinese_trad_full": "在哪裡可以找到杏仁奶？",
    "chinese_trad_cloze": "在哪裡可以___杏仁奶？",
    "chinese_trad_answer": "找到",
    "pinyin": "Zài nǎlǐ kěyǐ zhǎodào xīngrén nǎi?",
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
    "spanish_full": "¿Me hacés un favor?",
    "spanish_cloze": "¿Me ___ un favor?",
    "spanish_answer": "hacés",
    "chinese_simp_full": "你能帮我一个忙吗？",
    "chinese_simp_cloze": "你能___我一个忙吗？",
    "chinese_simp_answer": "帮",
    "chinese_trad_full": "你能幫我一個忙嗎？",
    "chinese_trad_cloze": "你能___我一個忙嗎？",
    "chinese_trad_answer": "幫",
    "pinyin": "Nǐ néng bāng wǒ yí ge máng ma?",
    "spanish_alternatives": [
      "podés",
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
    "chinese_simp_full": "我拿到了无犯罪记录证明。",
    "chinese_simp_cloze": "我拿到了无犯罪___证明。",
    "chinese_simp_answer": "记录",
    "chinese_trad_full": "我拿到了無犯罪記錄證明。",
    "chinese_trad_cloze": "我拿到了無犯罪___證明。",
    "chinese_trad_answer": "記錄",
    "pinyin": "Wǒ ná dào le wú fànzuì jìlù zhèngmíng.",
    "spanish_alternatives": [
      "certificado"
    ]
  },
  {
    "id": 35,
    "level": 3,
    "module": "Supermercado",
    "spanish_full": "¿Aceptan Mercado Pago?",
    "spanish_cloze": "¿___ Mercado Pago?",
    "spanish_answer": "Aceptan",
    "chinese_simp_full": "可以用Mercado Pago付吗？",
    "chinese_simp_cloze": "___用Mercado Pago付吗？",
    "chinese_simp_answer": "可以",
    "chinese_trad_full": "可以用Mercado Pago付嗎？",
    "chinese_trad_cloze": "___用Mercado Pago付嗎？",
    "chinese_trad_answer": "可以",
    "pinyin": "Kěyǐ yòng Mercado Pago fù ma?",
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

/**
 * Detecta el tono de una sílaba pinyin y devuelve el carácter envuelto en span con clase de color
 */
function getColoredChar(char, pinyinSyllable) {
    if (!pinyinSyllable) return `<span>${char}</span>`;
    
    const py = pinyinSyllable.toLowerCase().trim();
    let toneClass = 'tone-0'; // Por defecto neutro
    
    // Detectar marca de tono (diacrítico)
    if (/[āēīōūǖ]/.test(py)) toneClass = 'tone-1';
    else if (/[áéíóúǘ]/.test(py)) toneClass = 'tone-2';
    else if (/[ǎěǐǒǔǚ]/.test(py)) toneClass = 'tone-3';
    else if (/[àèìòùǜ]/.test(py)) toneClass = 'tone-4';
    
    return `<span class="${toneClass}">${char}</span>`;
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
    const btnEsCn = document.getElementById('btn-es-cn');
    if (btnEsCn) btnEsCn.classList.toggle('active', state.mode === 'es-cn');

    const btnCnEs = document.getElementById('btn-cn-es');
    if (btnCnEs) btnCnEs.classList.toggle('active', state.mode === 'cn-es');

    const btnSimp = document.getElementById('btn-simplified');
    if (btnSimp) btnSimp.classList.toggle('active', state.charType === 'simp');

    const btnTrad = document.getElementById('btn-traditional');
    if (btnTrad) btnTrad.classList.toggle('active', state.charType === 'trad');

    const scriptLabel = document.getElementById('script-label');
    if (scriptLabel) scriptLabel.textContent = state.charType === 'simp' ? '简体' : '繁體';

    // Actualizar botones diarios Y de exámenes
    const cats = document.querySelectorAll('.cat-btn, .btn-exam');
    cats.forEach(b => {
        b.classList.toggle('active', b.dataset.module === state.activeModule);
    });

    const pinyinBtn = document.getElementById('btn-pinyin');
    if (pinyinBtn) {
        pinyinBtn.textContent = state.showPinyin ? '📖 Pinyin: ON' : '📖 Pinyin: OFF';
        pinyinBtn.classList.toggle('active', state.showPinyin);
    }
}

// ===== Carga de datos (INTEGRADA CON EXÁMENES) =====
async function loadSentences() {
    try {
        // Determinar qué archivo cargar según el módulo activo
        const sourceFile = DATA_SOURCES[state.activeModule] || DATA_SOURCES['todas'];
        
        const r = await fetch(sourceFile);
        if (!r.ok) throw new Error('Archivo no encontrado');
        
        const d = await r.json();
        
        // Manejar tanto formato array directo como objeto {sentences: []}
        state.sentences = Array.isArray(d) ? d : (d.sentences || []);
        
        console.log(`✅ ${state.sentences.length} oraciones cargadas desde: ${sourceFile}`);
    } catch (e) {
        console.warn('⚠️ Falló carga externa, usando datos embebidos:', e.message);
        // Fallback: usar datos embebidos solo para módulos diarios
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
    
    // NUEVO: Selecciona TODOS los botones de filtro (diarios + exámenes)
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(btn => {
        btn.addEventListener('click', () => setModule(btn.dataset.module));
    });
   // Evento para cambiar nivel HSK
document.getElementById('select-hsk-level').addEventListener('change', (e) => {
    setModule(e.target.value); // Reutiliza tu función existente
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

// ===== Tipo de carácter simp/trad =====
function setCharType(ct) {
    state.charType = ct;
    document.getElementById('btn-simplified').classList.toggle('active', ct === 'simp');
    document.getElementById('btn-traditional').classList.toggle('active', ct === 'trad');
    document.getElementById('script-label').textContent = ct === 'simp' ? '简体' : '繁體';
    saveProgress();
    renderCurrentSentence();
}

// ===== Filtro módulo (AHORA RECARGA DATOS) =====
function setModule(mod) {
    state.activeModule = mod;
    state.currentIndex = 0;
    state.translationRevealed = false;
    
    // Actualizar UI de TODOS los botones (diarios y exámenes)
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(b => {
        b.classList.toggle('active', b.dataset.module === mod);
    });
    
    saveProgress();
    
    // Recargar oraciones del nuevo módulo
    loadSentences().then(() => {
        renderCurrentSentence();
        updateStats();
    });
}

// ===== Toggle Pinyin =====
function togglePinyin() {
    state.showPinyin = !state.showPinyin;
    var btn = document.getElementById('btn-pinyin');
    btn.textContent = state.showPinyin ? '📖 Pinyin: ON' : '📖 Pinyin: OFF';
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

      // ===== FUNCIÓN AUXILIAR PARA COLORES (Versión 2.0 - Infalible) =====
function getColoredCharV2(char, fullPinyinString, charIndex) {
    if (!fullPinyinString) return `<span class="tone-0">${char}</span>`;
    
    // Buscar TODAS las marcas de tono en el string completo de pinyin
    const tonedVowels = fullPinyinString.match(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g);
    
    let toneClass = 'tone-0';
    
    // Si encontramos tonos y el índice del carácter chino es válido
    if (tonedVowels && charIndex < tonedVowels.length) {
        const mark = tonedVowels[charIndex];
        if (/[āēīōūǖ]/.test(mark)) toneClass = 'tone-1';
        else if (/[áéíóúǘ]/.test(mark)) toneClass = 'tone-2';
        else if (/[ǎěǐǒǔǚ]/.test(mark)) toneClass = 'tone-3';
        else if (/[àèìòùǜ]/.test(mark)) toneClass = 'tone-4';
    }
    
    return `<span class="${toneClass}">${char}</span>`;
}

// ===== FUNCIÓN AUXILIAR PARA COLORES (Versión 3.0 - Mapeo Directo) =====
function getToneClass(syllable) {
    if (!syllable) return 'tone-0';
    const py = syllable.toLowerCase();
    if (/[āēīōūǖ]/.test(py)) return 'tone-1';
    if (/[áéíóúǘ]/.test(py)) return 'tone-2';
    if (/[ǎěǐǒǔǚ]/.test(py)) return 'tone-3';
    if (/[àèìòùǜ]/.test(py)) return 'tone-4';
    return 'tone-0';
}

// ===== RENDERIZADO SEGURO CON COLORES DE TONO =====
const sentenceTextEl = document.getElementById('sentence-text');

// 1. Determinar texto base
let displayText = '';
if (learningChinese) {
    displayText = s['chinese_' + k + '_full']; 
    if (s['chinese_' + k + '_cloze'] && s['chinese_' + k + '_cloze'].includes('___')) {
        if (s['chinese_' + k + '_cloze'].length === displayText.length) {
            displayText = s['chinese_' + k + '_cloze'];
        } else {
            const answer = s['chinese_' + k + '_answer'];
            displayText = displayText.replace(answer, '___');
        }
    }
} else {
    displayText = s.spanish_cloze || s.spanish_full;
}

// 2. Renderizar con colores
if (learningChinese && s.pinyin && state.showPinyin && showToneColors) {
    const chars = Array.from(displayText);
    const pinyinWords = s.pinyin.split(/\s+/); // ["Nǐ", "hǎo,", "wǒ", "jiào", "Lǐ", "Míng," ...]
    
    let coloredHtml = '';
    let wordIndex = 0;
    let charInWordIndex = 0;
    
    // Contamos cuántos caracteres chinos reales hay en la palabra actual de pinyin
    // Para ello, miramos hacia adelante en 'chars' hasta encontrar un espacio/puntuación/hueco
    
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        
        // Si es hueco, espacio o puntuación -> tal cual, reseteamos contador de palabra
        if (char === '_' || /[\s\p{P}]/u.test(char)) {
            coloredHtml += char;
            // Solo avanzamos wordIndex si encontramos un separador real (espacio)
            // y si la palabra anterior tenía caracteres
            if (/[\s]/u.test(char)) {
                wordIndex++;
                charInWordIndex = 0;
            }
            continue;
        }
        
        // Es un carácter chino. Obtenemos la palabra de pinyin actual
        const currentPyWord = pinyinWords[wordIndex] || '';
        
        // Asignamos color basado en la palabra completa
        // (Para palabras de 1 carácter es exacto. Para palabras largas, todos tendrán el mismo color,
        // pero al menos no se desfasará el resto de la oración)
        const toneClass = getToneClass(currentPyWord);
        
        coloredHtml += `<span class="${toneClass}">${char}</span>`;
        
        charInWordIndex++;
        
        // Verificamos si terminamos la palabra china actual
        // Miramos el siguiente carácter: si es espacio/puntuación/hueco o fin de string, terminamos palabra
        const nextChar = chars[i + 1];
        const isEndOfWord = !nextChar || nextChar === '_' || /[\s\p{P}]/u.test(nextChar);
        
        if (isEndOfWord) {
            wordIndex++;
            charInWordIndex = 0;
        }
    }
    
    sentenceTextEl.innerHTML = coloredHtml;
} else {
    // Sin colores: texto plano seguro
    sentenceTextEl.textContent = displayText || 'Error en datos';
}
// ===== FIN DEL RENDERIZADO =====
    
    // Pinyin: solo cuando se aprende chino Y toggle activado
    var pinyinEl = document.getElementById('pinyin-display');
    if (learningChinese && state.showPinyin && s.pinyin) {
        pinyinEl.textContent = s.pinyin;
        pinyinEl.classList.remove('hidden');
    } else {
        pinyinEl.classList.add('hidden');
    }

    // Ocultar traducción (spoiler protection)
    state.translationRevealed = false;
    const transEl = document.getElementById('translation-text');
    transEl.textContent = '\ud83d\udca1 La traducci\u00f3n aparecer\u00e1 al verificar...';
    transEl.style.opacity = '0.4';
    transEl.style.fontStyle = 'italic';

    // Limpiar
    document.getElementById('answer-input').value = '';
    hideFeedback();

    // Placeholder en el idioma que se está APRENDIENDO
    if (learningChinese) {
        const charLabel = state.charType === 'trad' ? 'tradicional' : 'simplificado';
        document.getElementById('answer-input').placeholder = 'Escribe en chino (' + charLabel + ')...';
    } else {
        document.getElementById('answer-input').placeholder = 'Escribe en espa\u00f1ol (conjugado)...';
    }
}

// ===== Revelar traducción completa =====
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

// ===== Verificación con sinónimos =====
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
    showFeedback('💡 Respuestas válidas: "' + allOptions + '"', 'correct');

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

// ===== Navegación =====
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

// ===== Estadísticas =====
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

// ===== REPRODUCTOR DE AUDIO GLOBAL BLINDADO =====
const TTS_API_URL = 'https://app-chino-espa-ol.vercel.app/api/tts'; // <--

// Reproductor de audio global
const globalAudioPlayer = new Audio();
let activeBtn = null;
let originalBtnText = '';
let isPlaying = false;

async function playAudio(lang) {
    // Pausa: si ya está sonando y tocan el mismo botón, pausar
    const btn = document.activeElement.tagName === 'BUTTON' ? document.activeElement : null;
    if (isPlaying && btn && btn.innerText.includes('⏳')) {
        globalAudioPlayer.pause();
        isPlaying = false;
        restoreButton();
        return;
    }

    // Detener cualquier reproducción previa limpiamente
    if (globalAudioPlayer.src) {
        globalAudioPlayer.onended = null;
        globalAudioPlayer.onerror = null;
        globalAudioPlayer.pause();
        globalAudioPlayer.currentTime = 0;
        // Guardar y revocar URL vieja DESPUÉS de pausar
        if (globalAudioPlayer.src.startsWith('blob:')) {
            const oldUrl = globalAudioPlayer.src;
            URL.revokeObjectURL(oldUrl);
        }
        globalAudioPlayer.removeAttribute('src');
        globalAudioPlayer.load(); // Liberar recurso interno
    }

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

    // Capturar referencia del botón ACTUAL
    activeBtn = btn;
    originalBtnText = activeBtn ? activeBtn.innerText : '';

    // Feedback visual inmediato
    if (activeBtn) {
        activeBtn.innerText = '⏳...';
        activeBtn.disabled = true;
    }

    try {
        const response = await fetch(TTS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text, lang: langCode })
        });

        if (!response.ok) throw new Error('Error en servidor');

        const data = await response.json();

        if (!data.audio) {
            console.warn('API respondió sin datos de audio');
            restoreButton();
            return;
        }

        // Decodificar Base64 a Blob
        const binaryString = atob(data.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        globalAudioPlayer.src = url;

        try {
            isPlaying = true;
            await globalAudioPlayer.play();
        } catch (playErr) {
            console.warn('Autoplay bloqueado o error de reproducción:', playErr);
            restoreButton();
            return;
        }

        globalAudioPlayer.onended = () => {
            isPlaying = false;
            restoreButton();
            URL.revokeObjectURL(url);
        };

        globalAudioPlayer.onerror = () => {
            console.error('Error reproduciendo audio blob');
            restoreButton();
        };

    } catch (error) {
        console.warn('Vercel falló, usando voz del sistema:', error);

        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = langCode;
            u.rate = 0.8;
            u.onend = restoreButton;
            u.onerror = restoreButton;
            speechSynthesis.speak(u);
        } else {
            restoreButton();
        }
    }
}

function restoreButton() {
    if (activeBtn) {
        activeBtn.innerText = originalBtnText || '🔊';
        activeBtn.disabled = false;
        activeBtn = null;
        originalBtnText = '';
    }
}

// ===== MODO OSCURO =====
const themeBtn = document.getElementById('btn-theme');
if (themeBtn) { // Protección por si el botón no existe aún
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
function splitGroupedPinyin(word) {
    if (!word) return [];
    
    // Estrategia: Cortar la palabra cada vez que encontramos una vocal con tono
    // que NO esté al inicio de la palabra (indicando nueva sílaba)
    const syllables = [];
    let currentSyllable = '';
    
    for (const char of word) {
        // Si es una vocal con tono Y ya tenemos consonantes antes, es nueva sílaba
        const isTonedVowel = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(char);
        
        if (isTonedVowel && currentSyllable.length > 0 && /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/.test(currentSyllable.slice(-1))) {
             // Caso especial: a veces la consonante final de la sílaba anterior 
             // se pega al inicio de la siguiente en errores de tipeo, pero asumimos estándar.
             // Simplemente iniciamos nueva sílaba si la anterior ya tiene vocal con tono
             if (/[āáǎàēéěèīíǐìōóòūúǔùǖǘǜ]/.test(currentSyllable)) {
                 syllables.push(currentSyllable);
                 currentSyllable = char;
                 continue;
             }
        }
        
        currentSyllable += char;
    }
    
    if (currentSyllable) syllables.push(currentSyllable);
    
    // Fallback: si no detectó tonos, devuelve la palabra original
    return syllables.length > 0 ? syllables : [word];
}

