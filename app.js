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

const MODULE_LABELS = {
    'todas': 'Práctica diaria (todas)',
    'Saludos': 'Saludos',
    'Migraciones': 'Migraciones',
    'Supermercado': 'Supermercado',
    'HSK1': 'HSK 1',
    'HSK2': 'HSK 2',
    'HSK3': 'HSK 3',
    'HSK4': 'HSK 4',
    'HSK5': 'HSK 5',
    'HSK6': 'HSK 6',
    'TOCFL': 'TOCFL',
    'DELE': 'DELE'
};

function moduleStatus(msg, isError) {
    const el = document.getElementById('module-status');
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
    el.classList.toggle('hidden', !msg);
}

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
    showPinyin: true,
    answered: false
};

// Variable global para el botón de colores
let showToneColors = false; 

// ===== Velocidad de audio (persistente, default 0.85) =====
const SPEED_STEPS = [0.85, 1, 0.7];
const SPEED_LABELS = { '0.85': '🐢 0.85x', '1': '⚡ 1.0x', '0.7': '🐌 0.7x' };
let playbackSpeed = parseFloat(localStorage.getItem('ac_speed'));
if (SPEED_STEPS.indexOf(playbackSpeed) === -1) playbackSpeed = 0.85;

// ===== Voz TTS (persistente: 'f' = femenina, 'm' = masculina) =====
const VOICE_ICONS = { f: '👩', m: '👨' };
let voiceZh = localStorage.getItem('ac_voice_zh') === 'm' ? 'm' : 'f';
let voiceEs = localStorage.getItem('ac_voice_es') === 'm' ? 'm' : 'f';
const VOICE_SAMPLES = {
    zh: '你好！我们一起练习吧。',
    es: '¡Hola! Vamos a practicar juntos.'
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
            showPinyin: state.showPinyin,
            showToneColors: showToneColors // Guardar estado de colores
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
        if (data.showToneColors !== undefined) showToneColors = data.showToneColors;
    } catch (e) { /* silencioso */ }
}

// ===== Helpers =====
function ck() {
    return state.charType === 'trad' ? 'trad' : 'simp';
}

/**
 * Detecta el tono de una sílaba pinyin y devuelve la clase CSS correspondiente
 */
function getToneClass(syllable) {
    if (!syllable) return 'tone-0';
    const py = syllable.toLowerCase();
    if (/[āēīōūǖ]/.test(py)) return 'tone-1';
    if (/[áéíóúǘ]/.test(py)) return 'tone-2';
    if (/[ǎěǐǒǔǚ]/.test(py)) return 'tone-3';
    if (/[àèìòùǜ]/.test(py)) return 'tone-4';
    return 'tone-0';
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

        // Actualizar estado visual de botones simp/trad
    const btnSimp = document.getElementById('btn-simplified');
    const btnTrad = document.getElementById('btn-traditional');

    if (btnSimp) {
        btnSimp.classList.toggle('active', state.charType === 'simp');
        btnSimp.innerHTML = state.charType === 'simp' ? '<b>简</b> 简体' : '简 简体';
    }

    if (btnTrad) {
        btnTrad.classList.toggle('active', state.charType === 'trad');
        btnTrad.innerHTML = state.charType === 'trad' ? '<b>繁</b> 繁體' : '繁 繁體';
    }
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

    const btnSpeed = document.getElementById('btn-speed');
    if (btnSpeed) {
        btnSpeed.textContent = SPEED_LABELS[String(playbackSpeed)];
        btnSpeed.title = 'Velocidad del audio: ' + playbackSpeed + 'x (clic para cambiar)';
    }

    // Botones de voz (F/M por idioma)
    const btnVoiceZh = document.getElementById('btn-voice-zh');
    if (btnVoiceZh) {
        btnVoiceZh.textContent = '🇨🇳 ' + VOICE_ICONS[voiceZh];
        btnVoiceZh.title = 'Voz china: ' + (voiceZh === 'f' ? 'femenina' : 'masculina') + ' (clic para cambiar)';
    }
    const btnVoiceEs = document.getElementById('btn-voice-es');
    if (btnVoiceEs) {
        btnVoiceEs.textContent = '🇪🇸 ' + VOICE_ICONS[voiceEs];
        btnVoiceEs.title = 'Voz española: ' + (voiceEs === 'f' ? 'femenina' : 'masculina') + ' (clic para cambiar)';
    }

    // Actualizar botón de tonos (SIEMPRE visible)
    const btnTones = document.getElementById('btn-tones');
    if (btnTones) {
        btnTones.textContent = showToneColors ? '🎨 Tonos: ON' : '🎨 Tonos: OFF';
        btnTones.classList.toggle('active', showToneColors);
        btnTones.classList.remove('hidden'); // ← Siempre visible
    }
}

// ===== Carga de datos =====
async function loadSentences() {
    const label = MODULE_LABELS[state.activeModule] || state.activeModule;
    moduleStatus('⏳ Cargando ' + label + '...');
    try {
        const sourceFile = DATA_SOURCES[state.activeModule] || DATA_SOURCES['todas'];
        const r = await fetch(sourceFile);
        if (!r.ok) throw new Error('Archivo no encontrado');
        
        const d = await r.json();
        state.sentences = Array.isArray(d) ? d : (d.sentences || []);
        indexSentencesForVocab(state.sentences); // amplía el diccionario de traducciones
        
        console.log(`✅ ${state.sentences.length} oraciones cargadas desde: ${sourceFile}`);
        if (state.sentences.length) {
            moduleStatus('📚 ' + label + ' · ' + state.sentences.length + ' oraciones disponibles');
        } else {
            moduleStatus('⚠ El módulo ' + label + ' todavía no tiene oraciones. Agregá el archivo data/exams/ correspondiente.', true);
        }
    } catch (e) {
        console.warn('⚠️ Falló carga externa:', e.message);
        if (['todas', 'Saludos', 'Migraciones', 'Supermercado'].includes(state.activeModule)) {
            state.sentences = EMBEDDED_SENTENCES || [];
            indexSentencesForVocab(state.sentences);
            moduleStatus('📚 ' + label + ' · ' + state.sentences.length + ' oraciones (copia local de respaldo)');
        } else {
            state.sentences = [];
            moduleStatus('⚠ No se pudo cargar ' + label + '. Revisá que exista el archivo de datos en data/exams/.', true);
        }
    }
}

// ===== Eventos =====
function setupEventListeners() {
    // Función auxiliar para evitar errores si falta algún botón
    const safeAdd = (id, callback) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', callback);
    };

    // Modo ES/CN
    safeAdd('btn-es-cn', () => setMode('es-cn'));
    safeAdd('btn-cn-es', () => setMode('cn-es'));
    
    // Tipo de carácter (Simplificado/Tradicional)
    safeAdd('btn-simplified', () => setCharType('simp'));
    safeAdd('btn-traditional', () => setCharType('trad'));
    
    // Acciones principales
    safeAdd('btn-check', checkAnswer);
    safeAdd('btn-reveal', revealAnswer);
    safeAdd('btn-know', () => markWord(true));
    safeAdd('btn-not-know', () => markWord(false));
    safeAdd('btn-reset', resetProgress);
    safeAdd('btn-pinyin', togglePinyin);
    safeAdd('btn-tones', toggleToneColors);
    safeAdd('btn-speed', cycleSpeed);
    safeAdd('btn-voice-zh', () => cycleVoice('zh'));
    safeAdd('btn-voice-es', () => cycleVoice('es'));

    // Lector de texto libre (banner)
    safeAdd('btn-reader-play', toggleReaderPlay);
    safeAdd('btn-reader-clear', clearReader);
    const readerTa = document.getElementById('reader-input');
    if (readerTa) {
        readerTa.addEventListener('input', () => {
            updateReaderLang();
            renderReaderPreview();
        });
        updateReaderLang();
        renderReaderPreview();
    }
    
    // Input Enter
    const input = document.getElementById('answer-input');
    if (input) {
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkAnswer();
            }
        });
    }

    // Hueco de la oración → foco en el banner de escritura (feedback de alumnos)
    const sentEl = document.getElementById('sentence-text');
    if (sentEl) {
        sentEl.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('blank-slot')) {
                e.preventDefault();
                focusAnswerInput();
            }
        });
    }

    // Cajón de vocabulario: clic en palabra → popup con traducción zh↔es
    const vocabList = document.getElementById('vocab-list');
    if (vocabList) {
        vocabList.addEventListener('click', (e) => {
            const chip = e.target.closest('.vocab-item');
            if (chip && chip.dataset.word) showVocabPop(chip.dataset.word);
        });
    }
    safeAdd('btn-vocab-pop-close', hideVocabPop);
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('vocab-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        if (pop.contains(e.target)) return;
        if (e.target.closest && e.target.closest('.vocab-item')) return;
        hideVocabPop();
    });
    
    // Audio
    safeAdd('btn-play-es', () => playAudio('es'));
    safeAdd('btn-play-cn', () => playAudio('cn'));
    
    // Filtros y Selects
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(btn => {
        btn.addEventListener('click', () => setModule(btn.dataset.module));
    });

    const hskSelect = document.getElementById('select-hsk-level');
    if (hskSelect) {
        hskSelect.addEventListener('change', (e) => setModule(e.target.value));
    }
}

// ===== Funciones de Estado =====
function setMode(mode) {
    state.mode = mode;
    document.getElementById('btn-es-cn').classList.toggle('active', mode === 'es-cn');
    document.getElementById('btn-cn-es').classList.toggle('active', mode === 'cn-es');
    saveProgress();
    renderCurrentSentence();
}

function setCharType(ct) {
    state.charType = ct;
    
    const btnSimp = document.getElementById('btn-simplified');
    const btnTrad = document.getElementById('btn-traditional');
    
    if (btnSimp) {
        btnSimp.classList.toggle('active', ct === 'simp');
        btnSimp.innerHTML = ct === 'simp' ? '<b>简</b> 简体' : '简 简体';
    }
    
    if (btnTrad) {
        btnTrad.classList.toggle('active', ct === 'trad');
        btnTrad.innerHTML = ct === 'trad' ? '<b>繁</b> 繁體' : '繁 繁體';
    }
    
    saveProgress();
    renderCurrentSentence();
}

function setModule(mod) {
    state.activeModule = mod;
    state.currentIndex = 0;
    state.translationRevealed = false;
    
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(b => {
        b.classList.toggle('active', b.dataset.module === mod);
    });
    
    saveProgress();
    loadSentences().then(() => {
        renderCurrentSentence();
        updateStats();
    });
}
function renderCurrentSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    
    // Reiniciar índice si nos salimos de rango
    if (state.currentIndex >= filtered.length) state.currentIndex = 0;
    
    const s = filtered[state.currentIndex];
    if (!s) return;

    state.answered = false;
    const btnCheck = document.getElementById('btn-check');
    if (btnCheck) btnCheck.textContent = 'Verificar';

    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // Actualizar Header
    document.getElementById('card-level').textContent = 'Nivel ' + s.level;
    document.getElementById('card-number').textContent = (state.currentIndex + 1) + '/' + filtered.length;

    // 1. Determinar texto base y posición del hueco
    let displayText = '';
    let blankStart = -1, blankEnd = -1;

    if (learningChinese) {
        displayText = s['chinese_' + k + '_full'];
        const cloze = s['chinese_' + k + '_cloze'];
        const answer = s['chinese_' + k + '_answer'];
        
        // Si hay huecos, calculamos dónde están para no colorearlos
        if (cloze && cloze.includes('___') && answer && displayText.includes(answer)) {
            blankStart = displayText.indexOf(answer);
            blankEnd = blankStart + answer.length;
        }
    } else {
        displayText = s.spanish_cloze || s.spanish_full;
    }

    const sentenceTextEl = document.getElementById('sentence-text');

    // 2. Renderizar con colores usando pinyin-pro (SI ESTÁ ACTIVADO Y DISPONIBLE)
    if (learningChinese && showToneColors && typeof pinyinPro !== 'undefined') {
        try {
            // pinyinPro analiza cada carácter individualmente
            const items = pinyinPro.pinyin(displayText, { type: 'all' });

            let html = '';
            let charPos = 0; // contador solo para caracteres chinos

            for (const it of items) {
                if (it.isZh) { // Si es carácter chino
                    // Verificar si estamos en la zona del hueco
                    if (charPos >= blankStart && charPos < blankEnd) {
                        if (charPos === blankStart) html += '___'; // Insertar hueco una vez
                    } else {
                        // Colorear según tono (1-4) o neutro (5)
                        const toneNum = it.num || 5; 
                        html += `<span class="tone-${toneNum}">${it.origin}</span>`;
                    }
                    charPos++;
                } else {
                    // Puntuación, espacios, números pasan limpios
                    html += it.origin;
                }
            }
            sentenceTextEl.innerHTML = html;
        } catch (e) {
            console.warn('Error en pinyin-pro, mostrando texto plano:', e);
            sentenceTextEl.textContent = displayText;
        }
    } else {
        // 3. Fallback: Texto plano seguro (sin colores o sin librería)
        sentenceTextEl.textContent = displayText || 'Error en datos';
    }

    // 4. Mostrar Pinyin debajo (si está activado)
    var pinyinEl = document.getElementById('pinyin-display');
    if (learningChinese && s.pinyin && state.showPinyin) {
        pinyinEl.textContent = s.pinyin;
        pinyinEl.classList.remove('hidden');
    } else {
        pinyinEl.classList.add('hidden');
    }

    // 5. Resetear traducción y feedback
    state.translationRevealed = false;
    const transEl = document.getElementById('translation-text');
    transEl.textContent = '💡 La traducción aparecerá al verificar...';
    transEl.style.opacity = '0.4';
    transEl.style.fontStyle = 'italic';

    document.getElementById('answer-input').value = '';
    hideFeedback();

    // 6. Placeholder dinámico
    const input = document.getElementById('answer-input');
    if (learningChinese) {
        const charLabel = state.charType === 'trad' ? 'tradicional' : 'simplificado';
        input.placeholder = 'Escribe en chino (' + charLabel + ')...';
    } else {
        input.placeholder = 'Escribe en español (conjugado)...';
    }

    // 7. Barra de progreso
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = ((state.currentIndex + 1) / filtered.length * 100) + '%';

    // 8. Hacer el hueco "___" clicable (los alumnos intentan tocarlo para escribir)
    makeBlanksClickable();
} // <--- ¡CIERRE DE LA FUNCIÓN!

// ===== Hueco clicable: tocar el "___" lleva al banner de escritura =====
function makeBlanksClickable() {
    const el = document.getElementById('sentence-text');
    if (!el) return;
    // Envolver cada "___" de los nodos de texto en un span clicable
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
        if (!n.nodeValue || n.nodeValue.indexOf('___') === -1) return;
        const frag = document.createDocumentFragment();
        n.nodeValue.split('___').forEach((part, i) => {
            if (i > 0) {
                const b = document.createElement('span');
                b.className = 'blank-slot';
                b.setAttribute('role', 'button');
                b.setAttribute('aria-label', 'Tocá acá para escribir tu respuesta');
                b.setAttribute('title', 'Tocá el hueco para escribir');
                b.textContent = '___';
                frag.appendChild(b);
            }
            if (part) frag.appendChild(document.createTextNode(part));
        });
        n.parentNode.replaceChild(frag, n);
    });
}

function focusAnswerInput() {
    const input = document.getElementById('answer-input');
    if (!input) return;
    try { input.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { input.scrollIntoView(); }
    try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
    const sec = document.getElementById('answer-section');
    if (sec) {
        sec.classList.remove('answer-glow');
        void sec.offsetWidth; // fuerza reinicio de la animación
        sec.classList.add('answer-glow');
    }
}
function togglePinyin() {
    state.showPinyin = !state.showPinyin;
    var btn = document.getElementById('btn-pinyin');
    
    if (btn) {
        btn.textContent = state.showPinyin ? '📖 Pinyin: ON' : '📖 Pinyin: OFF';
        btn.classList.toggle('active', state.showPinyin);
    }
    
    saveProgress();
    renderCurrentSentence();
    renderReaderPreview(); // el lector libre también usa el pinyin
}

function toggleToneColors() {
    showToneColors = !showToneColors;
    const btn = document.getElementById('btn-tones');
    
    if (btn) {
        btn.textContent = showToneColors ? '🎨 Tonos: ON' : '🎨 Tonos: OFF';
        btn.classList.toggle('active', showToneColors);
    }
    
    saveProgress();
    renderCurrentSentence();
    renderReaderPreview(); // el lector libre también usa los colores de tono
}

// ===== Lógica de Juego =====
function showFullTranslation() {
    if (state.translationRevealed) return;
    state.translationRevealed = true;

    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    let translationText = learningChinese ? s.spanish_full : s['chinese_' + k + '_full'];

    const el = document.getElementById('translation-text');
    el.textContent = translationText || 'Error en datos';
    el.style.opacity = '1';
    el.style.fontStyle = 'normal';
}

function getValidAnswers(s, learningChinese, k) {
    const answers = [];
    if (learningChinese) {
        if (s.chinese_simp_answer) answers.push(s.chinese_simp_answer);
        if (s.chinese_trad_answer && s.chinese_trad_answer !== s.chinese_simp_answer) {
            answers.push(s.chinese_trad_answer);
        }
    } else {
        answers.push(s.spanish_answer);
        if (s.spanish_alternatives) {
            s.spanish_alternatives.forEach(alt => {
                if (!answers.includes(alt)) answers.push(alt);
            });
        }
    }
    return answers;
}

function checkAnswer() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    if (state.answered) { nextSentence(); return; } // el botón ahora dice "Siguiente ▶"
    const s = filtered[state.currentIndex];
    const input = document.getElementById('answer-input').value.trim();
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    if (!input) {
        showFeedback('Escribe una respuesta antes de verificar.', 'incorrect');
        return;
    }

    const validAnswers = getValidAnswers(s, learningChinese, k);
    showFullTranslation();

    const isCorrect = validAnswers.some(ans => {
        const a = ans.toLowerCase();
        const i = input.toLowerCase();
        return input === ans || i === a || i.includes(a) || a.includes(i);
    });

    const allOptions = validAnswers.join(' / ');

    if (isCorrect) {
        showFeedback('✅ ¡Correcto! "' + allOptions + '"', 'correct');
        validAnswers.forEach(a => {
            state.knownWords.add(a);
            state.newWords.delete(a);
        });
        state.score++;
    } else {
        showFeedback('❌ Respuestas válidas: "' + allOptions + '"', 'incorrect');
        state.newWords.add(validAnswers[0]);
    }

    state.answered = true;
    const btnCheck = document.getElementById('btn-check');
    if (btnCheck) btnCheck.textContent = 'Siguiente ▶';

    saveProgress();
    updateStats();
    updateVocabularyPanel();
}

function revealAnswer() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    const validAnswers = getValidAnswers(s, learningChinese, k);
    showFullTranslation();
    showFeedback('💡 Respuestas válidas: "' + validAnswers.join(' / ') + '"', 'correct');

    validAnswers.forEach(a => state.newWords.add(a));
    saveProgress();
    updateStats();
    updateVocabularyPanel();
}

function markWord(known) {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    let answer = learningChinese ? s['chinese_' + k + '_answer'] : s.spanish_answer;

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

function nextSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    state.currentIndex = (state.currentIndex + 1) % filtered.length;
    saveProgress();
    renderCurrentSentence();
}

function showFeedback(msg, type) {
    const el = document.getElementById('feedback');
    el.textContent = msg; 
    el.className = 'feedback ' + type;
    el.classList.remove('hidden');
}

function hideFeedback() {
    document.getElementById('feedback').classList.add('hidden');
}

function updateStats() {
    document.getElementById('stats-known').textContent = 'Conocidas: ' + state.knownWords.size;
    document.getElementById('stats-new').textContent = 'Nuevas: ' + state.newWords.size;
}

function updateVocabularyPanel() {
    const list = document.getElementById('vocab-list');
    list.innerHTML = '';
    const mk = (w, cls) => {
        const el = document.createElement('span');
        el.className = 'vocab-item ' + cls;
        el.textContent = w;
        el.dataset.word = w;
        el.setAttribute('title', 'Tocá para ver la traducción');
        list.appendChild(el);
    };
    state.knownWords.forEach(w => mk(w, 'known'));
    state.newWords.forEach(w => mk(w, ''));
}

// ===== Diccionario palabra → traducción (cajón de vocabulario) =====
// Se alimenta con los datos embebidos y se va AMPLIANDO con cada módulo
// cargado (Saludos/HSK/TOCFL/DELE), así las palabras guardadas siguen
// teniendo traducción aunque cambies de módulo.
const vocabDict = new Map();

function indexSentencesForVocab(arr) {
    (arr || []).forEach(s => {
        const es = (s.spanish_answer || '').trim();
        const zhS = (s.chinese_simp_answer || '').trim();
        const zhT = (s.chinese_trad_answer || '').trim();
        const rec = {
            es: es,
            zhSimp: zhS,
            zhTrad: zhT || zhS,
            pinyin: s.pinyin || '',
            fullEs: s.spanish_full || '',
            fullZh: s.chinese_simp_full || ''
        };
        [es, zhS, zhT].forEach(w => {
            if (w && !vocabDict.has(w)) vocabDict.set(w, rec);
        });
    });
}
indexSentencesForVocab(typeof EMBEDDED_SENTENCES !== 'undefined' ? EMBEDDED_SENTENCES : []);

function isZhText(t) { return /[\u3400-\u4dbf\u4e00-\u9fff]/.test(t || ''); }

function wordPinyin(word) {
    try {
        if (typeof pinyinPro !== 'undefined' && word) return pinyinPro.pinyin(word, { toneType: 'mark' });
    } catch (e) {}
    return '';
}

function showVocabPop(word) {
    const pop = document.getElementById('vocab-pop');
    const body = document.getElementById('vocab-pop-body');
    if (!pop || !body) return;
    const rec = vocabDict.get(word);
    const zh = isZhText(word);
    let html = '<div class="vp-word">' + escHtml(word) + '</div>';
    if (zh) {
        // Palabra china → traducción al español (+ pinyin + ejemplo)
        const py = wordPinyin(word) || (rec ? rec.pinyin : '');
        if (py) html += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
        if (rec && rec.es) html += '<div class="vp-trans">🇪🇸 ' + escHtml(rec.es) + '</div>';
        if (rec && rec.fullEs) html += '<div class="vp-example">“' + escHtml(rec.fullEs) + '”</div>';
    } else {
        // Palabra española → traducción al chino (+ pinyin + ejemplo)
        if (rec) {
            let zhLine = rec.zhSimp ? escHtml(rec.zhSimp) : '';
            if (rec.zhTrad && rec.zhTrad !== rec.zhSimp) zhLine += ' <span class="vp-trad">(' + escHtml(rec.zhTrad) + ')</span>';
            if (zhLine) html += '<div class="vp-trans">🇨🇳 ' + zhLine + '</div>';
            const py = rec.pinyin || wordPinyin(rec.zhSimp);
            if (py) html += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
            if (rec.fullZh) html += '<div class="vp-example">“' + escHtml(rec.fullZh) + '”</div>';
        }
    }
    if (!rec) html += '<div class="vp-missing">🤔 No tengo la traducción de esta palabra en este módulo. Cargá el módulo donde la aprendiste y volvé a tocarla.</div>';
    body.innerHTML = html;
    pop.classList.remove('hidden');
}

function hideVocabPop() {
    const pop = document.getElementById('vocab-pop');
    if (pop) pop.classList.add('hidden');
}

function resetProgress() {
    if (!confirm('¿Borrar todo el progreso guardado?')) return;
    localStorage.removeItem(STORAGE_KEY);
    state.knownWords = new Set();
    state.newWords = new Set();
    state.score = 0;
    state.currentIndex = 0;
    showToneColors = false;
    updateStats();
    updateVocabularyPanel();
    renderCurrentSentence();
    applySavedUI();
}

// ===== Audio Global =====
const TTS_API_URL = 'https://app-chino-espa-ol.vercel.app/api/tts';
const globalAudioPlayer = new Audio();
globalAudioPlayer.preservesPitch = true;        // mantiene la voz natural a distinta velocidad
globalAudioPlayer.webkitPreservesPitch = true;  // Safari
let activeBtn = null;
let originalBtnText = '';
let isPlaying = false;

// ===== Petición TTS con timeout (AbortController) =====
// Evita botones trabados en "⏳" si el servidor tarda o la red falla
function fetchTTS(body, timeoutMs) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs || 15000);
    return fetch(TTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctrl.signal
    }).finally(() => clearTimeout(timer));
}

async function playAudio(lang) {
    const btn = document.activeElement.tagName === 'BUTTON' ? document.activeElement : null;
    if (isPlaying && btn && btn.innerText.includes('⏳')) {
        globalAudioPlayer.pause();
        isPlaying = false;
        restoreButton();
        return;
    }

    if (globalAudioPlayer.src) {
        globalAudioPlayer.onended = null;
        globalAudioPlayer.onerror = null;
        globalAudioPlayer.pause();
        globalAudioPlayer.currentTime = 0;
        if (globalAudioPlayer.src.startsWith('blob:')) URL.revokeObjectURL(globalAudioPlayer.src);
        globalAudioPlayer.removeAttribute('src');
        globalAudioPlayer.load();
    }
    stopReader(); // si el lector libre está sonando, se corta (un solo audio a la vez)

    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    const k = ck();

    let text = lang === 'es' ? s.spanish_full : s['chinese_' + k + '_full'];
    let langCode = lang === 'es' ? 'es-ES' : 'zh-CN';
    let voiceGender = lang === 'es' ? voiceEs : voiceZh;

    activeBtn = btn;
    originalBtnText = activeBtn ? activeBtn.innerText : '';

    if (activeBtn) {
        activeBtn.innerText = '...';
        activeBtn.disabled = true;
    }

    try {
        const response = await fetchTTS({ text, lang: langCode, voice: voiceGender });

        if (!response.ok) throw new Error('Error en servidor');
        const data = await response.json();
        if (!data.audio) { restoreButton(); return; }

        const binaryString = atob(data.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        
        const blob = new Blob([bytes], { type: data.mime || 'audio/wav' });
        const url = URL.createObjectURL(blob);
        globalAudioPlayer.src = url;
        globalAudioPlayer.playbackRate = playbackSpeed; // velocidad elegida, voz natural

        try {
            isPlaying = true;
            await globalAudioPlayer.play();
        } catch (playErr) {
            console.warn('Autoplay bloqueado:', playErr);
            restoreButton();
            return;
        }

        globalAudioPlayer.onended = () => { isPlaying = false; restoreButton(); URL.revokeObjectURL(url); };
        globalAudioPlayer.onerror = () => { console.error('Error audio'); restoreButton(); };

    } catch (error) {
        console.warn('Vercel falló, usando voz sistema:', error);
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = langCode; u.rate = playbackSpeed;
            u.onend = restoreButton; u.onerror = restoreButton;
            speechSynthesis.speak(u);
        } else { restoreButton(); }
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

// ===== Botón de velocidad: 0.85x -> 1.0x -> 0.7x =====
function cycleSpeed() {
    const idx = SPEED_STEPS.indexOf(playbackSpeed);
    playbackSpeed = SPEED_STEPS[(idx + 1) % SPEED_STEPS.length];
    try { localStorage.setItem('ac_speed', String(playbackSpeed)); } catch (e) { /* sin storage */ }
    const btn = document.getElementById('btn-speed');
    if (btn) {
        btn.textContent = SPEED_LABELS[String(playbackSpeed)];
        btn.title = 'Velocidad del audio: ' + playbackSpeed + 'x (clic para cambiar)';
    }
    // Aplicar en vivo si hay audio reproduciéndose
    globalAudioPlayer.playbackRate = playbackSpeed;
    if ('speechSynthesis' in window) speechSynthesis.cancel(); // el próximo TTS usará la nueva velocidad
}

// ===== Botones de voz: 👩/👨 por idioma (persistente + muestra de audio) =====
function cycleVoice(lang) {
    if (lang === 'es') {
        voiceEs = voiceEs === 'f' ? 'm' : 'f';
        try { localStorage.setItem('ac_voice_es', voiceEs); } catch (e) { /* sin storage */ }
    } else {
        voiceZh = voiceZh === 'f' ? 'm' : 'f';
        try { localStorage.setItem('ac_voice_zh', voiceZh); } catch (e) { /* sin storage */ }
    }
    applySavedUI();
    playVoiceSample(lang); // reproduce una frase corta para escuchar la voz nueva
}

function playVoiceSample(lang) {
    try {
        const text = VOICE_SAMPLES[lang];
        const langCode = lang === 'es' ? 'es-ES' : 'zh-CN';
        const gender = lang === 'es' ? voiceEs : voiceZh;
        fetch(TTS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, lang: langCode, voice: gender })
        })
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                if (!d || !d.audio) return;
                const bin = atob(d.audio);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                const url = URL.createObjectURL(new Blob([bytes], { type: d.mime || 'audio/wav' }));
                const a = new Audio(url);
                a.playbackRate = playbackSpeed;
                a.onended = () => URL.revokeObjectURL(url);
                a.play().catch(() => { /* autoplay bloqueado */ });
            })
            .catch(() => { /* sin muestra de audio */ });
    } catch (e) { /* silencioso */ }
}

// ===== Lector de texto libre (banner): pega chino o español y lo lee =====
const readerAudio = new Audio();
readerAudio.preservesPitch = true;        // mantiene la voz natural a distinta velocidad
readerAudio.webkitPreservesPitch = true;  // Safari
let readerPlaying = false;

function detectReaderLang(text) {
    // Si hay CJK (chino simplificado o tradicional) se lee como chino; si no, español
    return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text) ? 'zh' : 'es';
}

function updateReaderLang() {
    const ta = document.getElementById('reader-input');
    const label = document.getElementById('reader-lang');
    if (!ta || !label) return;
    const t = ta.value.trim();
    if (!t) { label.textContent = '🌐 Detectado: —'; return; }
    const lang = detectReaderLang(t);
    label.textContent = (lang === 'zh' ? '🇨🇳 Chino detectado' : '🇪🇸 Español detectado')
        + ' · ' + t.length + '/' + (ta.maxLength || 600);
}

function stopReader() {
    if (!readerPlaying && !readerAudio.src) return;
    readerPlaying = false;
    readerAudio.onended = null;
    readerAudio.onerror = null;
    readerAudio.pause();
    try { readerAudio.currentTime = 0; } catch (e) { /* sin src válido */ }
    if (readerAudio.src && readerAudio.src.startsWith('blob:')) URL.revokeObjectURL(readerAudio.src);
    readerAudio.removeAttribute('src');
    const btn = document.getElementById('btn-reader-play');
    if (btn) { btn.textContent = '🔊 Leer'; btn.disabled = false; }
}

async function toggleReaderPlay() {
    if (readerPlaying) { stopReader(); return; }

    const ta = document.getElementById('reader-input');
    const btn = document.getElementById('btn-reader-play');
    if (!ta || !btn) return;
    const text = ta.value.trim();
    if (!text) { ta.focus(); return; }

    const lang = detectReaderLang(text);
    const langCode = lang === 'zh' ? 'zh-CN' : 'es-ES';
    const gender = lang === 'zh' ? voiceZh : voiceEs; // usa la voz elegida en los botones 👩/👨

    btn.textContent = '⏳ ...';
    btn.disabled = true;

    // Un solo audio a la vez: cortar voz del sistema, tarjeta y lector
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (isPlaying && activeBtn) { restoreButton(); isPlaying = false; }
    if (globalAudioPlayer.src) {
        globalAudioPlayer.onended = null;
        globalAudioPlayer.pause();
        globalAudioPlayer.removeAttribute('src');
    }
    stopReader();

    try {
        const response = await fetchTTS({ text, lang: langCode, voice: gender });
        if (!response.ok) throw new Error('Error en servidor');
        const data = await response.json();
        if (!data.audio) throw new Error('Sin audio');

        const bin = atob(data.audio);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
        readerAudio.src = url;
        readerAudio.playbackRate = playbackSpeed;

        readerPlaying = true;
        btn.textContent = '⏹ Detener';
        btn.disabled = false;
        await readerAudio.play();
        readerAudio.onended = stopReader;
        readerAudio.onerror = stopReader;
    } catch (err) {
        console.warn('Lector: falló el TTS del servidor, usando voz del sistema:', err);
        stopReader();
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(text);
            u.lang = langCode;
            u.rate = playbackSpeed;
            speechSynthesis.speak(u);
        }
    }
}

function clearReader() {
    const ta = document.getElementById('reader-input');
    stopReader();
    if (ta) { ta.value = ''; ta.focus(); }
    updateReaderLang();
    renderReaderPreview();
}

// ===== Lector: vista previa con pinyin y colores de tono =====
// Reutiliza los toggles 📖 Pinyin y 🎨 Tonos de la app (y pinyin-pro)
function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderReaderPreview() {
    const prev = document.getElementById('reader-preview');
    if (!prev) return;
    const ta = document.getElementById('reader-input');
    const text = (ta && ta.value ? ta.value : '').trim();
    const isZh = !!text && detectReaderLang(text) === 'zh';
    const wantPinyin = state.showPinyin;
    const wantTones = showToneColors;

    // Solo para chino, con algún toggle activo y con la librería disponible
    if (!isZh || (!wantPinyin && !wantTones) || typeof pinyinPro === 'undefined') {
        prev.innerHTML = '';
        prev.classList.add('hidden');
        return;
    }

    try {
        const items = pinyinPro.pinyin(text, { type: 'all' });
        let pyHtml = '';
        let hzHtml = '';

        for (const it of items) {
            if (it.isZh) {
                const toneNum = it.num || 5;
                if (wantPinyin) pyHtml += '<span class="tone-' + toneNum + '">' + escHtml(it.pinyin || it.origin) + '</span> ';
                if (wantTones) hzHtml += '<span class="tone-' + toneNum + '">' + escHtml(it.origin) + '</span>';
                else hzHtml += escHtml(it.origin);
            } else {
                if (wantPinyin) pyHtml += escHtml(it.origin) + ' ';
                hzHtml += escHtml(it.origin);
            }
        }

        let html = '';
        if (wantPinyin) html += '<div class="reader-py">' + pyHtml.trim() + '</div>';
        html += '<div class="reader-hz">' + hzHtml + '</div>';
        prev.innerHTML = html;
        prev.classList.remove('hidden');
    } catch (e) {
        console.warn('Lector: error renderizando pinyin/tonos:', e);
        prev.classList.add('hidden');
    }
}

// ===== Modo Oscuro =====
const themeBtn = document.getElementById('btn-theme');
if (themeBtn) {
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

// ===== Utilidad Pinyin (Opcional, por si se necesita en el futuro) =====
function splitGroupedPinyin(word) {
    if (!word) return [];
    const syllables = [];
    let currentSyllable = '';
    for (const char of word) {
        const isTonedVowel = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(char);
        if (isTonedVowel && currentSyllable.length > 0 && /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/.test(currentSyllable.slice(-1))) {
             if (/[āáǎàēéěèīíǐìōóòūúǔùǘǚǜ]/.test(currentSyllable)) {
                 syllables.push(currentSyllable);
                 currentSyllable = char;
                 continue;
             }
        }
        currentSyllable += char;
    }
    if (currentSyllable) syllables.push(currentSyllable);
    return syllables.length > 0 ? syllables : [word];
}

// ===== PWA: botón "📲 Instalar app" + guía de instalación + indicador offline =====
// El botón está SIEMPRE visible (salvo que la app ya esté instalada).
// Si el navegador dispara beforeinstallprompt → instalación nativa.
// Si no (algunas versiones de Chrome lo retarden o lo omiten) → muestra
// una guía con los pasos exactos según el dispositivo.
(function setupPWA() {
    const btn = document.getElementById('btn-install');
    const pill = document.getElementById('offline-pill');
    const help = document.getElementById('install-help');
    let deferredPrompt = null;

    const ua = navigator.userAgent || '';
    const isIOS = /iphone|ipad|ipod/i.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /android/i.test(ua);
    const isOperaDesktop = /OPR\/|Opera/i.test(ua) && !isAndroid && !isIOS;

    // Clave de plataforma (Opera Android cae en 'android': su menú también
    // tiene "Añadir a pantalla de inicio"). Función pura para poder probarla
    // con UAs falsas desde la consola (__pwaDebug.detectaUA).
    function detectaUA(s) {
        s = String(s || '');
        if (/android/i.test(s)) return 'android';
        if (/iphone|ipad|ipod/i.test(s)) return 'ios';
        if (/OPR\/|Opera/i.test(s)) return 'opera';
        return 'desktop';
    }
    function platformKey() {
        if (isAndroid) return 'android';
        if (isIOS) return 'ios';
        if (isOperaDesktop) return 'opera';
        return 'desktop';
    }
    const alreadyStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

    function showHelp(show) {
        if (help) help.classList.toggle('hidden', !show);
    }

    const closeBtn = document.getElementById('btn-install-help-close');
    if (closeBtn) closeBtn.addEventListener('click', () => showHelp(false));
    if (help) {
        help.addEventListener('click', (e) => { if (e.target === help) showHelp(false); });
    }

    function highlightPlatform() {
        if (!help) return;
        const key = platformKey();
        help.querySelectorAll('[data-platform]').forEach((col) => {
            col.classList.toggle('install-help-active', col.getAttribute('data-platform') === key);
        });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        if (alreadyStandalone) return;
        deferredPrompt = e;
        console.log('[PWA] El navegador confirma: la app es instalable ✅');
        if (btn) btn.classList.remove('hidden');
    });

    if (btn) {
        if (!alreadyStandalone) {
            // pequeño delay para darle prioridad al diálogo nativo si viene
            setTimeout(() => btn.classList.remove('hidden'), 1500);
        }
        btn.addEventListener('click', async () => {
            if (deferredPrompt) {
                btn.textContent = '⏳ Instalando…';
                let outcome = 'dismissed';
                try {
                    deferredPrompt.prompt();
                    // seguro anti-cuelgue: algunos navegadores raros nunca resuelven
                    const choice = await Promise.race([
                        deferredPrompt.userChoice,
                        new Promise((res) => setTimeout(() => res(null), 30000))
                    ]);
                    if (choice && choice.outcome) outcome = choice.outcome;
                } catch (err) { /* usuario canceló o diálogo no disponible */ }
                deferredPrompt = null;
                btn.textContent = '📲 Instalar app';
                if (outcome !== 'timeout') btn.classList.add('hidden');
                return;
            }
            // Sin diálogo nativo disponible → guía paso a paso
            highlightPlatform();
            showHelp(true);
        });
    }

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (btn) btn.classList.add('hidden');
        showHelp(false);
        console.log('[PWA] ¡App instalada! 🎉');
    });

    function updatePill() {
        if (!pill) return;
        pill.classList.toggle('hidden', navigator.onLine);
    }
    window.addEventListener('online', updatePill);
    window.addEventListener('offline', updatePill);
    updatePill();

    // gancho de diagnóstico (consola): __pwaDebug
    window.__pwaDebug = {
        showHelp: showHelp,
        hayDialogoNativo: function () { return !!deferredPrompt; },
        plataforma: platformKey,
        detectaUA: detectaUA
    };
})();
