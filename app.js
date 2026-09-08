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
      "chinese_simp_cloze": "明天见，好好___。",
      "chinese_simp_answer": "休息",
      "chinese_trad_full": "明天見，好好休息。",
      "chinese_trad_cloze": "明天見，好好___。",
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
      "pinyin": "Wǒ xūyào xùqiān wǒ de qiānzhèng.",
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
      "pinyin": "Zài nǎlǐ kěyǐ zhǎodào xìngrén nǎi?",
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

// ===== DATOS INCLUIDOS EN LA APP (v6.2) =====
// Todo el contenido vive acá dentro: la app NO necesita la carpeta data/.
// Si editás acá, subí VERSION en sw.js para que todos reciban el update.
const EMBEDDED_MODULE_DATA = {
'todas': [{"id":1,"level":1,"module":"Saludos","spanish_full":"Hola, ¿cómo estás?","spanish_cloze":"___, ¿cómo estás?","spanish_answer":"Hola","chinese_simp_full":"你好，你好吗？","chinese_simp_cloze":"___，你好吗？","chinese_simp_answer":"你好","chinese_trad_full":"你好，你好嗎？","chinese_trad_cloze":"___，你好嗎？","chinese_trad_answer":"你好","pinyin":"Nǐ hǎo, nǐ hǎo ma?"},{"id":2,"level":1,"module":"Saludos","spanish_full":"Me llamo Carlos.","spanish_cloze":"Me ___ Carlos.","spanish_answer":"llamo","chinese_simp_full":"我叫卡洛斯。","chinese_simp_cloze":"我___卡洛斯。","chinese_simp_answer":"叫","chinese_trad_full":"我叫卡洛斯。","chinese_trad_cloze":"我___卡洛斯。","chinese_trad_answer":"叫","pinyin":"Wǒ jiào Kǎluòsī."},{"id":3,"level":1,"module":"Saludos","spanish_full":"Gracias por tu ayuda.","spanish_cloze":"___ por tu ayuda.","spanish_answer":"Gracias","chinese_simp_full":"谢谢你的帮助。","chinese_simp_cloze":"___你的帮助。","chinese_simp_answer":"谢谢","chinese_trad_full":"謝謝你的幫助。","chinese_trad_cloze":"___你的幫助。","chinese_trad_answer":"謝謝","pinyin":"Xièxie nǐ de bāngzhù."},{"id":4,"level":2,"module":"Saludos","spanish_full":"Vivo en Buenos Aires.","spanish_cloze":"___ en Buenos Aires.","spanish_answer":"Vivo","chinese_simp_full":"我住在布宜诺斯艾利斯。","chinese_simp_cloze":"我___在布宜诺斯艾利斯。","chinese_simp_answer":"住","chinese_trad_full":"我住在布宜諾斯艾利斯。","chinese_trad_cloze":"我___在布宜諾斯艾利斯。","chinese_trad_answer":"住","pinyin":"Wǒ zhù zài Bùyínuòsī'àilìsī."},{"id":5,"level":2,"module":"Saludos","spanish_full":"¿Dónde está el baño?","spanish_cloze":"¿___ el baño?","spanish_answer":"Dónde está","chinese_simp_full":"洗手间在哪里？","chinese_simp_cloze":"洗手间___？","chinese_simp_answer":"在哪里","chinese_trad_full":"洗手間在哪裡？","chinese_trad_cloze":"洗手間___？","chinese_trad_answer":"在哪裡","pinyin":"Xǐshǒujiān zài nǎlǐ?"},{"id":6,"level":1,"module":"Saludos","spanish_full":"Buen día, ¿cómo andás?","spanish_cloze":"Buen día, ¿___?","spanish_answer":"cómo andás","chinese_simp_full":"早上好，你怎么样？","chinese_simp_cloze":"早上好，你___？","chinese_simp_answer":"怎么样","chinese_trad_full":"早上好，你怎麼樣？","chinese_trad_cloze":"早上好，你___？","chinese_trad_answer":"怎麼樣","pinyin":"Zǎoshang hǎo, nǐ zěnmeyàng?"},{"id":7,"level":1,"module":"Saludos","spanish_full":"Mucho gusto, soy de China.","spanish_cloze":"Mucho gusto, ___ de China.","spanish_answer":"soy","chinese_simp_full":"很高兴认识你，我是中国人。","chinese_simp_cloze":"很高兴认识你，我___中国人。","chinese_simp_answer":"是","chinese_trad_full":"很高興認識你，我是中國人。","chinese_trad_cloze":"很高興認識你，我___中國人。","chinese_trad_answer":"是","pinyin":"Hěn gāoxìng rènshi nǐ, wǒ shì Zhōngguó rén."},{"id":8,"level":1,"module":"Saludos","spanish_full":"Hasta mañana, descansa.","spanish_cloze":"Hasta mañana, ___.","spanish_answer":"descansa","chinese_simp_full":"明天见，好好休息。","chinese_simp_cloze":"明天见，好好___。","chinese_simp_answer":"休息","chinese_trad_full":"明天見，好好休息。","chinese_trad_cloze":"明天見，好好___。","chinese_trad_answer":"休息","pinyin":"Míngtiān jiàn, hǎohǎo xiūxi."},{"id":9,"level":1,"module":"Saludos","spanish_full":"¿Todo bien? Sí, todo bien.","spanish_cloze":"¿___ bien? Sí, todo bien.","spanish_answer":"Todo","chinese_simp_full":"一切都好吗？是的，一切都好。","chinese_simp_cloze":"___都好吗？是的，一切都好。","chinese_simp_answer":"一切","chinese_trad_full":"一切都好嗎？是的，一切都好。","chinese_trad_cloze":"___都好嗎？是的，一切都好。","chinese_trad_answer":"一切","pinyin":"Yíqiè dōu hǎo ma? Shì de, yíqiè dōu hǎo."},{"id":10,"level":1,"module":"Saludos","spanish_full":"Chau, nos vemos después.","spanish_cloze":"___, nos vemos después.","spanish_answer":"Chau","chinese_simp_full":"再见，一会儿见。","chinese_simp_cloze":"___，一会儿见。","chinese_simp_answer":"再见","chinese_trad_full":"再見，一會兒見。","chinese_trad_cloze":"___，一會兒見。","chinese_trad_answer":"再見","pinyin":"Zàijiàn, yíhuìr jiàn.","spanish_alternatives":["Chao","Adiós","Hasta luego"]},{"id":11,"level":1,"module":"Saludos","spanish_full":"Bienvenidos a mi casa.","spanish_cloze":"___ a mi casa.","spanish_answer":"Bienvenidos","chinese_simp_full":"欢迎来我家。","chinese_simp_cloze":"___来我家。","chinese_simp_answer":"欢迎","chinese_trad_full":"歡迎來我家。","chinese_trad_cloze":"___來我家。","chinese_trad_answer":"歡迎","pinyin":"Huānyíng lái wǒ jiā."},{"id":12,"level":2,"module":"Migraciones","spanish_full":"Necesito renovar mi visa.","spanish_cloze":"Necesito ___ mi visa.","spanish_answer":"renovar","chinese_simp_full":"我需要续签我的签证。","chinese_simp_cloze":"我需要___我的签证。","chinese_simp_answer":"续签","chinese_trad_full":"我需要續簽我的簽證。","chinese_trad_cloze":"我需要___我的簽證。","chinese_trad_answer":"續簽","pinyin":"Wǒ xūyào xùqiān wǒ de qiānzhèng.","spanish_alternatives":["tramitar","extender","prorrogar"]},{"id":13,"level":2,"module":"Migraciones","spanish_full":"¿Dónde puedo sacar el turno?","spanish_cloze":"¿Dónde puedo ___?","spanish_answer":"sacar el turno","chinese_simp_full":"我在哪里可以预约？","chinese_simp_cloze":"我在哪里可以___？","chinese_simp_answer":"预约","chinese_trad_full":"我在哪裡可以預約？","chinese_trad_cloze":"我在哪裡可以___？","chinese_trad_answer":"預約","pinyin":"Wǒ zài nǎlǐ kěyǐ yùyuē?","spanish_alternatives":["obtener","conseguir","reservar"]},{"id":14,"level":2,"module":"Migraciones","spanish_full":"Mi pasaporte vence en marzo.","spanish_cloze":"Mi ___ vence en marzo.","spanish_answer":"pasaporte","chinese_simp_full":"我的护照三月份到期。","chinese_simp_cloze":"我的___三月份到期。","chinese_simp_answer":"护照","chinese_trad_full":"我的護照三月份到期。","chinese_trad_cloze":"我的___三月份到期。","chinese_trad_answer":"護照","pinyin":"Wǒ de hùzhào sān yuèfèn dàoqī."},{"id":15,"level":2,"module":"Migraciones","spanish_full":"Tengo que tramitar el DNI.","spanish_cloze":"Tengo que ___ el DNI.","spanish_answer":"tramitar","chinese_simp_full":"我需要办理身份证。","chinese_simp_cloze":"我需要___身份证。","chinese_simp_answer":"办理","chinese_trad_full":"我需要辦理身份證。","chinese_trad_cloze":"我需要___身份證。","chinese_trad_answer":"辦理","pinyin":"Wǒ xūyào bànlǐ shēnfènzhèng.","spanish_alternatives":["hacer","gestionar","solicitar"]},{"id":16,"level":2,"module":"Migraciones","spanish_full":"¿Cuánto sale la gestión?","spanish_cloze":"¿Cuánto sale la ___?","spanish_answer":"gestión","chinese_simp_full":"办理费用是多少？","chinese_simp_cloze":"___费用是多少？","chinese_simp_answer":"办理","chinese_trad_full":"辦理費用是多少？","chinese_trad_cloze":"___費用是多少？","chinese_trad_answer":"辦理","pinyin":"Bànlǐ fèiyòng shì duōshǎo?","spanish_alternatives":["trámite"]},{"id":17,"level":3,"module":"Migraciones","spanish_full":"Necesito una certificación de domicilio.","spanish_cloze":"Necesito una ___ de domicilio.","spanish_answer":"certificación","chinese_simp_full":"我需要住址证明。","chinese_simp_cloze":"我需要住址___。","chinese_simp_answer":"证明","chinese_trad_full":"我需要住址證明。","chinese_trad_cloze":"我需要住址___。","chinese_trad_answer":"證明","pinyin":"Wǒ xūyào zhùzhǐ zhèngmíng.","spanish_alternatives":["constancia","comprobante"]},{"id":18,"level":3,"module":"Migraciones","spanish_full":"¿Esta documentación es válida?","spanish_cloze":"¿Esta documentación es ___?","spanish_answer":"válida","chinese_simp_full":"这个文件有效吗？","chinese_simp_cloze":"这个文件___吗？","chinese_simp_answer":"有效","chinese_trad_full":"這個文件有效嗎？","chinese_trad_cloze":"這個文件___嗎？","chinese_trad_answer":"有效","pinyin":"Zhège wénjiàn yǒuxiào ma?","spanish_alternatives":["vigente"]},{"id":19,"level":2,"module":"Migraciones","spanish_full":"Fui a la Dirección Nacional de Migraciones.","spanish_cloze":"Fui a la Dirección Nacional de ___.","spanish_answer":"Migraciones","chinese_simp_full":"我今天去了移民局。","chinese_simp_cloze":"我今天去了___。","chinese_simp_answer":"移民局","chinese_trad_full":"我今天去了移民局。","chinese_trad_cloze":"我今天去了___。","chinese_trad_answer":"移民局","pinyin":"Wǒ jīntiān qùle yímínjú."},{"id":20,"level":3,"module":"Migraciones","spanish_full":"El trámite demora dos semanas.","spanish_cloze":"El ___ demora dos semanas.","spanish_answer":"trámite","chinese_simp_full":"这个手续需要两周时间。","chinese_simp_cloze":"这个___需要两周时间。","chinese_simp_answer":"手续","chinese_trad_full":"這個手續需要兩週時間。","chinese_trad_cloze":"這個___需要兩週時間。","chinese_trad_answer":"手續","pinyin":"Zhège shǒuxù xūyào liǎng zhōu shíjiān.","spanish_alternatives":["gestión","proceso"]},{"id":21,"level":3,"module":"Migraciones","spanish_full":"¿Me pueden dar un comprobante?","spanish_cloze":"¿Me pueden dar un ___?","spanish_answer":"comprobante","chinese_simp_full":"能给我一张收据吗？","chinese_simp_cloze":"能给我一张___吗？","chinese_simp_answer":"收据","chinese_trad_full":"能給我一張收據嗎？","chinese_trad_cloze":"能給我一張___嗎？","chinese_trad_answer":"收據","pinyin":"Néng gěi wǒ yì zhāng shōujù ma?","spanish_alternatives":["recibo","constancia"]},{"id":22,"level":2,"module":"Supermercado","spanish_full":"¿Dónde están los fideos?","spanish_cloze":"¿Dónde están los ___?","spanish_answer":"fideos","chinese_simp_full":"面条在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"面条","chinese_trad_full":"麵條在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"麵條","pinyin":"Miàntiáo zài nǎlǐ?","spanish_alternatives":["pastas"]},{"id":23,"level":2,"module":"Supermercado","spanish_full":"¿Tienen galletitas de manteca?","spanish_cloze":"¿Tienen ___ de manteca?","spanish_answer":"galletitas","chinese_simp_full":"你们有黄油饼干吗？","chinese_simp_cloze":"你们有黄油___吗？","chinese_simp_answer":"饼干","chinese_trad_full":"你們有黃油餅乾嗎？","chinese_trad_cloze":"你們有黃油___嗎？","chinese_trad_answer":"餅乾","pinyin":"Nǐmen yǒu huángyóu bǐnggān ma?"},{"id":24,"level":2,"module":"Supermercado","spanish_full":"Quiero medio kilo de yerba mate.","spanish_cloze":"Quiero ___ de yerba mate.","spanish_answer":"medio kilo","chinese_simp_full":"我要半公斤马黛茶。","chinese_simp_cloze":"我要___马黛茶。","chinese_simp_answer":"半公斤","chinese_trad_full":"我要半公斤馬黛茶。","chinese_trad_cloze":"我要___馬黛茶。","chinese_trad_answer":"半公斤","pinyin":"Wǒ yào bàn gōngjīn mǎdàichá."},{"id":25,"level":2,"module":"Supermercado","spanish_full":"¿Cuánto sale el pan francés?","spanish_cloze":"¿___ el pan francés?","spanish_answer":"Cuánto sale","chinese_simp_full":"法棍面包多少钱？","chinese_simp_cloze":"法棍面包___？","chinese_simp_answer":"多少钱","chinese_trad_full":"法棍麵包多少錢？","chinese_trad_cloze":"法棍麵包___？","chinese_trad_answer":"多少錢","pinyin":"Fǎgùn miànbāo duōshǎo qián?","spanish_alternatives":["Cuánto cuesta","Cuánto es","Cuánto vale"]},{"id":26,"level":2,"module":"Supermercado","spanish_full":"Pago con tarjeta o en efectivo.","spanish_cloze":"Pago con tarjeta o en ___.","spanish_answer":"efectivo","chinese_simp_full":"我用卡或者现金付。","chinese_simp_cloze":"我用卡或者___付。","chinese_simp_answer":"现金","chinese_trad_full":"我用卡或者現金付。","chinese_trad_cloze":"我用卡或者___付。","chinese_trad_answer":"現金","pinyin":"Wǒ yòng kǎ huòzhě xiànjīn fù.","spanish_alternatives":["dinero","billetes"]},{"id":27,"level":2,"module":"Supermercado","spanish_full":"¿Hay descuento con la tarjeta?","spanish_cloze":"¿Hay ___ con la tarjeta?","spanish_answer":"descuento","chinese_simp_full":"刷卡有折扣吗？","chinese_simp_cloze":"刷卡有___吗？","chinese_simp_answer":"折扣","chinese_trad_full":"刷卡有折扣嗎？","chinese_trad_cloze":"刷卡有___嗎？","chinese_trad_answer":"折扣","pinyin":"Shuākǎ yǒu zhékòu ma?","spanish_alternatives":["promoción","rebaja","oferta"]},{"id":28,"level":2,"module":"Supermercado","spanish_full":"¿Dónde está la caja?","spanish_cloze":"¿Dónde está la ___?","spanish_answer":"caja","chinese_simp_full":"收银台在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"收银台","chinese_trad_full":"收銀台在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"收銀台","pinyin":"Shōuyíntái zài nǎlǐ?"},{"id":29,"level":1,"module":"Supermercado","spanish_full":"Necesito una bolsa, por favor.","spanish_cloze":"Necesito una bolsa, ___.","spanish_answer":"por favor","chinese_simp_full":"请给我一个袋子。","chinese_simp_cloze":"___给我一个袋子。","chinese_simp_answer":"请","chinese_trad_full":"請給我一個袋子。","chinese_trad_cloze":"___給我一個袋子。","chinese_trad_answer":"請","pinyin":"Qǐng gěi wǒ yí ge dàizi."},{"id":30,"level":2,"module":"Supermercado","spanish_full":"¿Tienen delivery a domicilio?","spanish_cloze":"¿Tienen ___ a domicilio?","spanish_answer":"delivery","chinese_simp_full":"你们有送货上门服务吗？","chinese_simp_cloze":"你们有送货上门___吗？","chinese_simp_answer":"服务","chinese_trad_full":"你們有送貨上門服務嗎？","chinese_trad_cloze":"你們有送貨上門___嗎？","chinese_trad_answer":"服務","pinyin":"Nǐmen yǒu sònghuò shàngmén fúwù ma?","spanish_alternatives":["envío"]},{"id":31,"level":2,"module":"Supermercado","spanish_full":"El precio subió otra vez.","spanish_cloze":"El precio ___ otra vez.","spanish_answer":"subió","chinese_simp_full":"价格又涨了。","chinese_simp_cloze":"价格又___了。","chinese_simp_answer":"涨","chinese_trad_full":"價格又漲了。","chinese_trad_cloze":"價格又___了。","chinese_trad_answer":"漲","pinyin":"Jiàgé yòu zhǎng le.","spanish_alternatives":["aumentó","creció"]},{"id":32,"level":2,"module":"Supermercado","spanish_full":"¿Dónde puedo encontrar leche de almendras?","spanish_cloze":"¿Dónde puedo ___ leche de almendras?","spanish_answer":"encontrar","chinese_simp_full":"在哪里可以找到杏仁奶？","chinese_simp_cloze":"在哪里可以___杏仁奶？","chinese_simp_answer":"找到","chinese_trad_full":"在哪裡可以找到杏仁奶？","chinese_trad_cloze":"在哪裡可以___杏仁奶？","chinese_trad_answer":"找到","pinyin":"Zài nǎlǐ kěyǐ zhǎodào xìngrén nǎi?","spanish_alternatives":["hallar","conseguir","buscar"]},{"id":33,"level":1,"module":"Supermercado","spanish_full":"¿Me hacés un favor?","spanish_cloze":"¿Me ___ un favor?","spanish_answer":"hacés","chinese_simp_full":"你能帮我一个忙吗？","chinese_simp_cloze":"你能___我一个忙吗？","chinese_simp_answer":"帮","chinese_trad_full":"你能幫我一個忙嗎？","chinese_trad_cloze":"你能___我一個忙嗎？","chinese_trad_answer":"幫","pinyin":"Nǐ néng bāng wǒ yí ge máng ma?","spanish_alternatives":["podés","puedes"]},{"id":34,"level":3,"module":"Migraciones","spanish_full":"Me dieron el certificado de antecedentes.","spanish_cloze":"Me dieron el certificado de ___.","spanish_answer":"antecedentes","chinese_simp_full":"我拿到了无犯罪记录证明。","chinese_simp_cloze":"我拿到了无犯罪___证明。","chinese_simp_answer":"记录","chinese_trad_full":"我拿到了無犯罪記錄證明。","chinese_trad_cloze":"我拿到了無犯罪___證明。","chinese_trad_answer":"記錄","pinyin":"Wǒ ná dào le wú fànzuì jìlù zhèngmíng.","spanish_alternatives":["certificado"]},{"id":35,"level":3,"module":"Supermercado","spanish_full":"¿Aceptan Mercado Pago?","spanish_cloze":"¿___ Mercado Pago?","spanish_answer":"Aceptan","chinese_simp_full":"可以用Mercado Pago付吗？","chinese_simp_cloze":"___用Mercado Pago付吗？","chinese_simp_answer":"可以","chinese_trad_full":"可以用Mercado Pago付嗎？","chinese_trad_cloze":"___用Mercado Pago付嗎？","chinese_trad_answer":"可以","pinyin":"Kěyǐ yòng Mercado Pago fù ma?","spanish_alternatives":["Toman","Reciben"]},{"id":36,"level":1,"module":"Familia","spanish_full":"Mi madre cocina muy rico.","spanish_cloze":"Mi ___ cocina muy rico.","spanish_answer":"madre","chinese_simp_full":"我妈妈做饭很好吃。","chinese_simp_cloze":"我___做饭很好吃。","chinese_simp_answer":"妈妈","chinese_trad_full":"我媽媽做飯很好吃。","chinese_trad_cloze":"我___做飯很好吃。","chinese_trad_answer":"媽媽","pinyin":"Wǒ māma zuò fàn hěn hǎochī."},{"id":37,"level":1,"module":"Tiempo","spanish_full":"Hoy hace mucho calor.","spanish_cloze":"Hoy ___ mucho calor.","spanish_answer":"hace","chinese_simp_full":"今天天气很热。","chinese_simp_cloze":"今天___很热。","chinese_simp_answer":"天气","chinese_trad_full":"今天天氣很熱。","chinese_trad_cloze":"今天___很熱。","chinese_trad_answer":"天氣","pinyin":"Jīntiān tiānqì hěn rè."},{"id":38,"level":2,"module":"Transporte","spanish_full":"El subte está lleno a esta hora.","spanish_cloze":"El ___ está lleno a esta hora.","spanish_answer":"subte","spanish_alternatives":["metro"],"chinese_simp_full":"这个点地铁很挤。","chinese_simp_cloze":"这个点___很挤。","chinese_simp_answer":"地铁","chinese_trad_full":"這個點地鐵很擠。","chinese_trad_cloze":"這個點___很擠。","chinese_trad_answer":"地鐵","pinyin":"Zhège diǎn dìtiě hěn jǐ."},{"id":39,"level":2,"module":"Compras","spanish_full":"¿Me lo puede envolver para regalo?","spanish_cloze":"¿Me lo puede ___ para regalo?","spanish_answer":"envolver","chinese_simp_full":"能帮我包成礼物吗？","chinese_simp_cloze":"能帮我___成礼物吗？","chinese_simp_answer":"包","chinese_trad_full":"能幫我包成禮物嗎？","chinese_trad_cloze":"能幫我___成禮物嗎？","chinese_trad_answer":"包","pinyin":"Néng bāng wǒ bāo chéng lǐwù ma?"},{"id":40,"level":2,"module":"Direcciones","spanish_full":"Doble a la izquierda en la esquina.","spanish_cloze":"Doble a la ___ en la esquina.","spanish_answer":"izquierda","chinese_simp_full":"在拐角处向左转。","chinese_simp_cloze":"在拐角处向___转。","chinese_simp_answer":"左","chinese_trad_full":"在拐角處向左轉。","chinese_trad_cloze":"在拐角處向___轉。","chinese_trad_answer":"左","pinyin":"Zài guǎijiǎo chù xiàng zuǒzhuǎn."},{"id":41,"level":3,"module":"Salud","spanish_full":"Tengo que tomar esta medicina tres veces al día.","spanish_cloze":"Tengo que ___ esta medicina tres veces al día.","spanish_answer":"tomar","chinese_simp_full":"我得一天吃三次这个药。","chinese_simp_cloze":"我得一天___三次这个药。","chinese_simp_answer":"吃","chinese_trad_full":"我得一天吃三次這個藥。","chinese_trad_cloze":"我得一天___三次這個藥。","chinese_trad_answer":"吃","pinyin":"Wǒ děi yì tiān chī sān cì zhège yào."},{"id":42,"level":3,"module":"Trabajo","spanish_full":"Mi jefe me pidió que termine el informe hoy.","spanish_cloze":"Mi ___ me pidió que termine el informe hoy.","spanish_answer":"jefe","chinese_simp_full":"老板让我今天完成报告。","chinese_simp_cloze":"___让我今天完成报告。","chinese_simp_answer":"老板","chinese_trad_full":"老闆讓我今天完成報告。","chinese_trad_cloze":"___讓我今天完成報告。","chinese_trad_answer":"老闆","pinyin":"Lǎobǎn ràng wǒ jīntiān wánchéng bàogào."},{"id":43,"level":3,"module":"Opiniones","spanish_full":"Creo que aprender español es difícil pero útil.","spanish_cloze":"___ que aprender español es difícil pero útil.","spanish_answer":"Creo","chinese_simp_full":"我觉得学西班牙语虽然难但是很有用。","chinese_simp_cloze":"我___学西班牙语虽然难但是很有用。","chinese_simp_answer":"觉得","chinese_trad_full":"我覺得學西班牙語雖然難但是很有用。","chinese_trad_cloze":"我___學西班牙語雖然難但是很有用。","chinese_trad_answer":"覺得","pinyin":"Wǒ juéde xué Xībānyáyǔ suīrán nán dànshì hěn yǒuyòng."},{"id":44,"level":1,"module":"Comida","spanish_full":"Quiero comer empanadas de carne.","spanish_cloze":"Quiero ___ empanadas de carne.","spanish_answer":"comer","chinese_simp_full":"我想吃肉馅的馅饼。","chinese_simp_cloze":"我想___肉馅的馅饼。","chinese_simp_answer":"吃","chinese_trad_full":"我想吃肉餡的餡餅。","chinese_trad_cloze":"我想___肉餡的餡餅。","chinese_trad_answer":"吃","pinyin":"Wǒ xiǎng chī ròu xiàn de xiànbǐng."},{"id":45,"level":2,"module":"Vivienda","spanish_full":"El alquiler subió mucho este mes.","spanish_cloze":"El ___ subió mucho este mes.","spanish_answer":"alquiler","chinese_simp_full":"这个月房租涨了很多。","chinese_simp_cloze":"这个月___涨了很多。","chinese_simp_answer":"房租","chinese_trad_full":"這個月房租漲了很多。","chinese_trad_cloze":"這個月___漲了很多。","chinese_trad_answer":"房租","pinyin":"Zhège yuè fángzū zhǎngle hěn duō."},{"id":46,"level":3,"module":"Sentimientos","spanish_full":"Estoy cansado porque trabajé demasiado.","spanish_cloze":"Estoy ___ porque trabajé demasiado.","spanish_answer":"cansado","chinese_simp_full":"我很累因为工作太多了。","chinese_simp_cloze":"我很___因为工作太多了。","chinese_simp_answer":"累","chinese_trad_full":"我很累因為工作太多了。","chinese_trad_cloze":"我很___因為工作太多了。","chinese_trad_answer":"累","pinyin":"Wǒ hěn lèi yīnwèi gōngzuò tài duō le."},{"id":47,"level":2,"module":"Supermercado","spanish_full":"¿Tiene cambio de mil pesos?","spanish_cloze":"¿Tiene ___ de mil pesos?","spanish_answer":"cambio","chinese_simp_full":"您有一千块的零钱吗？","chinese_simp_cloze":"您有一千块的___吗？","chinese_simp_answer":"零钱","chinese_trad_full":"您有一千塊的零錢嗎？","chinese_trad_cloze":"您有一千塊的___嗎？","chinese_trad_answer":"零錢","pinyin":"Nín yǒu yì qiān kuài de língqián ma?"},{"id":48,"level":3,"module":"Migraciones","spanish_full":"Debo presentar los originales y las copias.","spanish_cloze":"Debo presentar los ___ y las copias.","spanish_answer":"originales","chinese_simp_full":"我必须提交原件和复印件。","chinese_simp_cloze":"我必须提交___和复印件。","chinese_simp_answer":"原件","chinese_trad_full":"我必須提交原件和複印件。","chinese_trad_cloze":"我必須提交___和複印件。","chinese_trad_answer":"原件","pinyin":"Wǒ bìxū tíjiāo yuánjiàn hé fùyìnjiàn."},{"id":49,"level":1,"module":"Rutina","spanish_full":"Me levanto temprano todos los días.","spanish_cloze":"Me ___ temprano todos los días.","spanish_answer":"levanto","chinese_simp_full":"我每天早起。","chinese_simp_cloze":"我每天___。","chinese_simp_answer":"早起","chinese_trad_full":"我每天早起。","chinese_trad_cloze":"我每天___。","chinese_trad_answer":"早起","pinyin":"Wǒ měitiān zǎoqǐ."},{"id":50,"level":3,"module":"Conectores","spanish_full":"No fui a trabajar porque estaba enfermo.","spanish_cloze":"No fui a trabajar ___ estaba enfermo.","spanish_answer":"porque","chinese_simp_full":"我没去上班因为我病了。","chinese_simp_cloze":"我没去上班___我病了。","chinese_simp_answer":"因为","chinese_trad_full":"我沒去上班因為我病了。","chinese_trad_cloze":"我沒去上班___我病了。","chinese_trad_answer":"因為","pinyin":"Wǒ méi qù shàngbān yīnwèi wǒ bìng le."},{"level":1,"module":"En un restaurante","spanish_full":"Mozo, queremos pedir.","spanish_cloze":"Mozo, queremos ___.","spanish_answer":"pedir","chinese_simp_full":"服务员，我们要点菜。","chinese_simp_cloze":"服务员，我们要___。","chinese_simp_answer":"点菜","chinese_trad_full":"服務員，我們要點菜。","chinese_trad_cloze":"服務員，我們要___。","chinese_trad_answer":"點菜","pinyin":"Fúwùyuán, wǒmen yào diǎncài.","spanish_alternatives":["ordenar"],"id":51},{"level":1,"module":"En un restaurante","spanish_full":"¿Este plato es un poco picante?","spanish_cloze":"¿Este plato es un poco ___?","spanish_answer":"picante","chinese_simp_full":"这道菜有点辣吗？","chinese_simp_cloze":"这道菜有点___吗？","chinese_simp_answer":"辣","chinese_trad_full":"這道菜有點辣嗎？","chinese_trad_cloze":"這道菜有點___嗎？","chinese_trad_answer":"辣","pinyin":"Zhè dào cài yǒudiǎn là ma?","id":52},{"level":1,"module":"En un restaurante","spanish_full":"Mozo, ¡la cuenta por favor!","spanish_cloze":"Mozo, ¡la ___ por favor!","spanish_answer":"cuenta","chinese_simp_full":"服务员，买单！","chinese_simp_cloze":"服务员，___！","chinese_simp_answer":"买单","chinese_trad_full":"服務員，買單！","chinese_trad_cloze":"服務員，___！","chinese_trad_answer":"買單","pinyin":"Fúwùyuán, mǎidān!","spanish_alternatives":["pagar"],"id":53},{"level":1,"module":"En un restaurante","spanish_full":"Sin cilantro, por favor.","spanish_cloze":"Sin ___, por favor.","spanish_answer":"cilantro","chinese_simp_full":"我不要香菜。","chinese_simp_cloze":"我不要___。","chinese_simp_answer":"香菜","chinese_trad_full":"我不要香菜。","chinese_trad_cloze":"我不要___。","chinese_trad_answer":"香菜","pinyin":"Wǒ bú yào xiāngcài.","id":54},{"level":1,"module":"En un restaurante","spanish_full":"Otro plato de arroz, por favor.","spanish_cloze":"Otro plato de ___, por favor.","spanish_answer":"arroz","chinese_simp_full":"再来一碗米饭。","chinese_simp_cloze":"再来一碗___。","chinese_simp_answer":"米饭","chinese_trad_full":"再來一碗米飯。","chinese_trad_cloze":"再來一碗___。","chinese_trad_answer":"米飯","pinyin":"Zài lái yì wǎn mǐfàn.","id":55},{"level":1,"module":"En un restaurante","spanish_full":"¿Se puede reservar mesa para esta noche?","spanish_cloze":"¿Se puede ___ mesa para esta noche?","spanish_answer":"reservar","chinese_simp_full":"可以订今晚的位子吗？","chinese_simp_cloze":"可以___今晚的位子吗？","chinese_simp_answer":"订","chinese_trad_full":"可以訂今晚的位子嗎？","chinese_trad_cloze":"可以___今晚的位子嗎？","chinese_trad_answer":"訂","pinyin":"Kěyǐ dìng jīnwǎn de wèizi ma?","spanish_alternatives":["reserva"],"id":56},{"level":1,"module":"En el colectivo","spanish_full":"¿Esta línea pasa por la estación de tren?","spanish_cloze":"¿Esta línea ___ la estación de tren?","spanish_answer":"pasa por","chinese_simp_full":"这路车经过火车站吗？","chinese_simp_cloze":"这路车___火车站吗？","chinese_simp_answer":"经过","chinese_trad_full":"這路車經過火車站嗎？","chinese_trad_cloze":"這路車___火車站嗎？","chinese_trad_answer":"經過","pinyin":"Zhè lù chē jīngguò huǒchēzhàn ma?","id":57},{"level":1,"module":"En el colectivo","spanish_full":"¿Cuánto lleva llegar al centro?","spanish_cloze":"¿___ lleva llegar al centro?","spanish_answer":"Cuánto","chinese_simp_full":"到市中心要多久？","chinese_simp_cloze":"到市中心要___？","chinese_simp_answer":"多久","chinese_trad_full":"到市中心要多久？","chinese_trad_cloze":"到市中心要___？","chinese_trad_answer":"多久","pinyin":"Dào shìzhōngxīn yào duō jiǔ?","spanish_alternatives":["cuánto tiempo"],"id":58},{"level":1,"module":"En el colectivo","spanish_full":"Quiero comprar una tarjeta de colectivo.","spanish_cloze":"Quiero comprar una ___ de colectivo.","spanish_answer":"tarjeta","chinese_simp_full":"我要买一张公交卡。","chinese_simp_cloze":"我要买一张___。","chinese_simp_answer":"公交卡","chinese_trad_full":"我要買一張公交卡。","chinese_trad_cloze":"我要買一張___。","chinese_trad_answer":"公交卡","pinyin":"Wǒ yào mǎi yì zhāng gōngjiāokǎ.","id":59},{"level":1,"module":"En el colectivo","spanish_full":"¿Cuál es la próxima parada?","spanish_cloze":"¿Cuál es la próxima ___?","spanish_answer":"parada","chinese_simp_full":"下一站是哪站？","chinese_simp_cloze":"下一___是哪站？","chinese_simp_answer":"站","chinese_trad_full":"下一站是哪站？","chinese_trad_cloze":"下一___是哪站？","chinese_trad_answer":"站","pinyin":"Xià yí zhàn shì nǎ zhàn?","id":60},{"level":1,"module":"En el colectivo","spanish_full":"Avisame cuando lleguemos a la parada, por favor.","spanish_cloze":"___ cuando lleguemos a la parada, por favor.","spanish_answer":"Avisame","chinese_simp_full":"请在到站时提醒我。","chinese_simp_cloze":"请在到站时___我。","chinese_simp_answer":"提醒","chinese_trad_full":"請在到站時提醒我。","chinese_trad_cloze":"請在到站時___我。","chinese_trad_answer":"提醒","pinyin":"Qǐng zài dàozhàn shí tíxǐng wǒ.","spanish_alternatives":["avisá"],"id":61},{"level":1,"module":"En el colectivo","spanish_full":"El colectivo viene lleno; parate firme.","spanish_cloze":"El colectivo viene lleno; ___.","spanish_answer":"parate firme","chinese_simp_full":"车上人多，站稳一点。","chinese_simp_cloze":"车上人多，___一点。","chinese_simp_answer":"站稳","chinese_trad_full":"車上人多，站穩一點。","chinese_trad_cloze":"車上人多，___一點。","chinese_trad_answer":"站穩","pinyin":"Chē shàng rén duō, zhànwěn yìdiǎn.","id":62},{"level":1,"module":"En el subterráneo","spanish_full":"¿Qué línea de subte va al aeropuerto?","spanish_cloze":"¿Qué ___ de subte va al aeropuerto?","spanish_answer":"línea","chinese_simp_full":"地铁几号线去机场？","chinese_simp_cloze":"地铁几号___去机场？","chinese_simp_answer":"线","chinese_trad_full":"地鐵幾號線去機場？","chinese_trad_cloze":"地鐵幾號___去機場？","chinese_trad_answer":"線","pinyin":"Dìtiě jǐ hào xiàn qù jīchǎng?","id":63},{"level":1,"module":"En el subterráneo","spanish_full":"¿Dónde se hace la fila para el control?","spanish_cloze":"¿Dónde se hace la fila para el ___?","spanish_answer":"control","chinese_simp_full":"安检在哪里排队？","chinese_simp_cloze":"___在哪里排队？","chinese_simp_answer":"安检","chinese_trad_full":"安檢在哪裡排隊？","chinese_trad_cloze":"___在哪裡排隊？","chinese_trad_answer":"安檢","pinyin":"Ānjiǎn zài nǎlǐ páiduì?","id":64},{"level":1,"module":"En el subterráneo","spanish_full":"No olvides pasar la tarjeta para entrar.","spanish_cloze":"No olvides pasar la ___ para entrar.","spanish_answer":"tarjeta","chinese_simp_full":"别忘了刷卡进站。","chinese_simp_cloze":"别忘了___进站。","chinese_simp_answer":"刷卡","chinese_trad_full":"別忘了刷卡進站。","chinese_trad_cloze":"別忘了___進站。","chinese_trad_answer":"刷卡","pinyin":"Bié wàngle shuākǎ jìn zhàn.","id":65},{"level":1,"module":"En el subterráneo","spanish_full":"En hora pico hay muchísima gente.","spanish_cloze":"En ___ hay muchísima gente.","spanish_answer":"hora pico","chinese_simp_full":"高峰期人真多啊。","chinese_simp_cloze":"___人真多啊。","chinese_simp_answer":"高峰期","chinese_trad_full":"高峰期人真多啊。","chinese_trad_cloze":"___人真多啊。","chinese_trad_answer":"高峰期","pinyin":"Gāofēngqī rén zhēn duō a.","id":66},{"level":1,"module":"En el subterráneo","spanish_full":"¿En qué estación cambio a la línea 2?","spanish_cloze":"¿En qué estación ___ a la línea 2?","spanish_answer":"cambio","chinese_simp_full":"换二号线在哪站？","chinese_simp_cloze":"___二号线在哪站？","chinese_simp_answer":"换","chinese_trad_full":"換二號線在哪站？","chinese_trad_cloze":"___二號線在哪站？","chinese_trad_answer":"換","pinyin":"Huàn èr hào xiàn zài nǎ zhàn?","id":67},{"level":1,"module":"En el subterráneo","spanish_full":"El subte es mucho más rápido que el colectivo.","spanish_cloze":"El subte es mucho más ___ que el colectivo.","spanish_answer":"rápido","chinese_simp_full":"地铁比公交快多了。","chinese_simp_cloze":"地铁比公交___多了。","chinese_simp_answer":"快","chinese_trad_full":"地鐵比公交快多了。","chinese_trad_cloze":"地鐵比公交___多了。","chinese_trad_answer":"快","pinyin":"Dìtiě bǐ gōngjiāo kuài duō le.","id":68},{"level":1,"module":"En la clase de idioma","spanish_full":"Profe, ¿qué significa esta palabra?","spanish_cloze":"Profe, ¿qué ___ esta palabra?","spanish_answer":"significa","chinese_simp_full":"老师，这个词什么意思？","chinese_simp_cloze":"老师，这个词什么___？","chinese_simp_answer":"意思","chinese_trad_full":"老師，這個詞什麼意思？","chinese_trad_cloze":"老師，這個詞什麼___？","chinese_trad_answer":"意思","pinyin":"Lǎoshī, zhège cí shénme yìsi?","id":69},{"level":1,"module":"En la clase de idioma","spanish_full":"Otra vez, por favor.","spanish_cloze":"___, por favor.","spanish_answer":"Otra vez","chinese_simp_full":"请再读一遍。","chinese_simp_cloze":"请再读一___。","chinese_simp_answer":"遍","chinese_trad_full":"請再讀一遍。","chinese_trad_cloze":"請再讀一___。","chinese_trad_answer":"遍","pinyin":"Qǐng zài dú yí biàn.","id":70},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Mi tono está mal?","spanish_cloze":"¿Mi ___ está mal?","spanish_answer":"tono","chinese_simp_full":"我的声调不对吗？","chinese_simp_cloze":"我的___不对吗？","chinese_simp_answer":"声调","chinese_trad_full":"我的聲調不對嗎？","chinese_trad_cloze":"我的___不對嗎？","chinese_trad_answer":"聲調","pinyin":"Wǒ de shēngdiào bú duì ma?","id":71},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Hoy dejaron tarea?","spanish_cloze":"¿Hoy dejaron ___?","spanish_answer":"tarea","chinese_simp_full":"今天布置作业吗？","chinese_simp_cloze":"今天布置___吗？","chinese_simp_answer":"作业","chinese_trad_full":"今天佈置作業嗎？","chinese_trad_cloze":"今天佈置___嗎？","chinese_trad_answer":"作業","pinyin":"Jīntiān bùzhì zuòyè ma?","id":72},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Puedo usar el diccionario chino?","spanish_cloze":"¿Puedo usar el ___ chino?","spanish_answer":"diccionario","chinese_simp_full":"我可以用汉语词典吗？","chinese_simp_cloze":"我可以用汉语___吗？","chinese_simp_answer":"词典","chinese_trad_full":"我可以用漢語詞典嗎？","chinese_trad_cloze":"我可以用漢語___嗎？","chinese_trad_answer":"詞典","pinyin":"Wǒ kěyǐ yòng hànyǔ cídiǎn ma?","id":73},{"level":1,"module":"En la clase de idioma","spanish_full":"Chicos, el examen se pasa al viernes.","spanish_cloze":"Chicos, el ___ se pasa al viernes.","spanish_answer":"examen","chinese_simp_full":"同学们，考试改到周五。","chinese_simp_cloze":"同学们，___改到周五。","chinese_simp_answer":"考试","chinese_trad_full":"同學們，考試改到週五。","chinese_trad_cloze":"同學們，___改到週五。","chinese_trad_answer":"考試","pinyin":"Tóngxuémen, kǎoshì gǎi dào zhōuwǔ.","id":74},{"level":1,"module":"En el shopping","spanish_full":"¿Esta prenda tiene un talle más grande?","spanish_cloze":"¿Esta prenda tiene un talle ___?","spanish_answer":"más grande","chinese_simp_full":"这件衣服有大一号的吗？","chinese_simp_cloze":"这件衣服有___的吗？","chinese_simp_answer":"大一号","chinese_trad_full":"這件衣服有大一號的嗎？","chinese_trad_cloze":"這件衣服有___的嗎？","chinese_trad_answer":"大一號","pinyin":"Zhè jiàn yīfu yǒu dà yí hào de ma?","id":75},{"level":1,"module":"En el shopping","spanish_full":"¿Puede ser un poco más barato?","spanish_cloze":"¿Puede ser un poco más ___?","spanish_answer":"barato","chinese_simp_full":"能便宜一点吗？","chinese_simp_cloze":"能___一点吗？","chinese_simp_answer":"便宜","chinese_trad_full":"能便宜一點嗎？","chinese_trad_cloze":"能___一點嗎？","chinese_trad_answer":"便宜","pinyin":"Néng piányi yìdiǎn ma?","id":76},{"level":1,"module":"En el shopping","spanish_full":"¿Puedo pagar con el celular?","spanish_cloze":"¿Puedo ___ con el celular?","spanish_answer":"pagar","chinese_simp_full":"我可以用手机支付吗？","chinese_simp_cloze":"我可以用手机___吗？","chinese_simp_answer":"支付","chinese_trad_full":"我可以用手機支付嗎？","chinese_trad_cloze":"我可以用手機___嗎？","chinese_trad_answer":"支付","pinyin":"Wǒ kěyǐ yòng shǒujī zhīfù ma?","id":77},{"level":1,"module":"En el shopping","spanish_full":"¿Hace falta el ticket para devolver?","spanish_cloze":"¿Hace falta el ticket para ___?","spanish_answer":"devolver","chinese_simp_full":"退货需要小票吗？","chinese_simp_cloze":"___需要小票吗？","chinese_simp_answer":"退货","chinese_trad_full":"退貨需要小票嗎？","chinese_trad_cloze":"___需要小票嗎？","chinese_trad_answer":"退貨","pinyin":"Tuìhuò xūyào xiǎopiào ma?","id":78},{"level":1,"module":"En el shopping","spanish_full":"¿Con cuánto descuento hoy?","spanish_cloze":"¿Con cuánto ___ hoy?","spanish_answer":"descuento","chinese_simp_full":"今天打几折？","chinese_simp_cloze":"今天打几___？","chinese_simp_answer":"折","chinese_trad_full":"今天打幾折？","chinese_trad_cloze":"今天打幾___？","chinese_trad_answer":"折","pinyin":"Jīntiān dǎ jǐ zhé?","id":79},{"level":1,"module":"En el shopping","spanish_full":"¿De qué lado están los probadores?","spanish_cloze":"¿De qué lado están los ___?","spanish_answer":"probadores","chinese_simp_full":"试衣间在哪边？","chinese_simp_cloze":"___在哪边？","chinese_simp_answer":"试衣间","chinese_trad_full":"試衣間在哪邊？","chinese_trad_cloze":"___在哪邊？","chinese_trad_answer":"試衣間","pinyin":"Shìyījiān zài nǎ biān?","id":80},{"level":1,"module":"En el cine","spanish_full":"Dos entradas para las ocho de esta noche.","spanish_cloze":"Dos ___ para las ocho de esta noche.","spanish_answer":"entradas","chinese_simp_full":"两张今晚八点的票。","chinese_simp_cloze":"两张今晚八点的___。","chinese_simp_answer":"票","chinese_trad_full":"兩張今晚八點的票。","chinese_trad_cloze":"兩張今晚八點的___。","chinese_trad_answer":"票","pinyin":"Liǎng zhāng jīnwǎn bā diǎn de piào.","id":81},{"level":1,"module":"En el cine","spanish_full":"¿Esta película tiene subtítulos?","spanish_cloze":"¿Esta película tiene ___?","spanish_answer":"subtítulos","chinese_simp_full":"这部电影有字幕吗？","chinese_simp_cloze":"这部电影有___吗？","chinese_simp_answer":"字幕","chinese_trad_full":"這部電影有字幕嗎？","chinese_trad_cloze":"這部電影有___嗎？","chinese_trad_answer":"字幕","pinyin":"Zhè bù diànyǐng yǒu zìmù ma?","id":82},{"level":1,"module":"En el cine","spanish_full":"Un balde grande de pochoclos.","spanish_cloze":"Un balde grande de ___.","spanish_answer":"pochoclos","chinese_simp_full":"一大桶爆米花。","chinese_simp_cloze":"一大桶___。","chinese_simp_answer":"爆米花","chinese_trad_full":"一大桶爆米花。","chinese_trad_cloze":"一大桶___。","chinese_trad_answer":"爆米花","pinyin":"Yí dà tǒng bàomǐhuā.","id":83},{"level":1,"module":"En el cine","spanish_full":"¿Para qué lado queda la sala 3?","spanish_cloze":"¿Para qué lado queda la ___ 3?","spanish_answer":"sala","chinese_simp_full":"三号厅往哪边走？","chinese_simp_cloze":"三号___往哪边走？","chinese_simp_answer":"厅","chinese_trad_full":"三號廳往哪邊走？","chinese_trad_cloze":"三號___往哪邊走？","chinese_trad_answer":"廳","pinyin":"Sān hào tīng wǎng nǎ biān zǒu?","id":84},{"level":1,"module":"En el cine","spanish_full":"¿A qué hora termina la película?","spanish_cloze":"¿A qué hora ___ la película?","spanish_answer":"termina","chinese_simp_full":"电影几点结束？","chinese_simp_cloze":"电影几点___？","chinese_simp_answer":"结束","chinese_trad_full":"電影幾點結束？","chinese_trad_cloze":"電影幾點___？","chinese_trad_answer":"結束","pinyin":"Diànyǐng jǐ diǎn jiéshù?","id":85},{"level":1,"module":"En el cine","spanish_full":"Esta peli tiene muy buena puntuación.","spanish_cloze":"Esta peli tiene muy buena ___.","spanish_answer":"puntuación","chinese_simp_full":"这片子评分很高。","chinese_simp_cloze":"这片子___很高。","chinese_simp_answer":"评分","chinese_trad_full":"這片子評分很高。","chinese_trad_cloze":"這片子___很高。","chinese_trad_answer":"評分","pinyin":"Zhè piānzi píngfēn hěn gāo.","spanish_alternatives":["puntaje"],"id":86},{"level":1,"module":"En el gimnasio","spanish_full":"Quiero sacar un carnet del gimnasio.","spanish_cloze":"Quiero sacar un ___ del gimnasio.","spanish_answer":"carnet","chinese_simp_full":"我想办一张健身卡。","chinese_simp_cloze":"我想办一张___。","chinese_simp_answer":"健身卡","chinese_trad_full":"我想辦一張健身卡。","chinese_trad_cloze":"我想辦一張___。","chinese_trad_answer":"健身卡","pinyin":"Wǒ xiǎng bàn yì zhāng jiànshēnkǎ.","id":87},{"level":1,"module":"En el gimnasio","spanish_full":"¿Está libre la cinta?","spanish_cloze":"¿Está libre la ___?","spanish_answer":"cinta","chinese_simp_full":"跑步机空着吗？","chinese_simp_cloze":"___空着吗？","chinese_simp_answer":"跑步机","chinese_trad_full":"跑步機空著嗎？","chinese_trad_cloze":"___空著嗎？","chinese_trad_answer":"跑步機","pinyin":"Pǎobùjī kòng zhe ma?","id":88},{"level":1,"module":"En el gimnasio","spanish_full":"Profe, mirame el movimiento.","spanish_cloze":"Profe, mirame el ___.","spanish_answer":"movimiento","chinese_simp_full":"教练，帮我看看动作。","chinese_simp_cloze":"教练，帮我看看___。","chinese_simp_answer":"动作","chinese_trad_full":"教練，幫我看看動作。","chinese_trad_cloze":"教練，幫我看看___。","chinese_trad_answer":"動作","pinyin":"Jiàoliàn, bāng wǒ kànkan dòngzuò.","id":89},{"level":1,"module":"En el gimnasio","spanish_full":"Después de entrenar toca estirar.","spanish_cloze":"Después de entrenar toca ___.","spanish_answer":"estirar","chinese_simp_full":"练完要拉伸一下。","chinese_simp_cloze":"练完要___一下。","chinese_simp_answer":"拉伸","chinese_trad_full":"練完要拉伸一下。","chinese_trad_cloze":"練完要___一下。","chinese_trad_answer":"拉伸","pinyin":"Liàn wán yào lāshēn yíxià.","id":90},{"level":1,"module":"En el gimnasio","spanish_full":"¿Hay duchas por acá?","spanish_cloze":"¿Hay ___ por acá?","spanish_answer":"duchas","chinese_simp_full":"这边有淋浴间吗？","chinese_simp_cloze":"这边有___吗？","chinese_simp_answer":"淋浴间","chinese_trad_full":"這邊有淋浴間嗎？","chinese_trad_cloze":"這邊有___嗎？","chinese_trad_answer":"淋浴間","pinyin":"Zhè biān yǒu línyùjiān ma?","id":91},{"level":1,"module":"En el gimnasio","spanish_full":"Saqué el abono anual, sale conveniente.","spanish_cloze":"Saqué el ___, sale conveniente.","spanish_answer":"abono anual","chinese_simp_full":"我办了年卡，很划算。","chinese_simp_cloze":"我办了___，很划算。","chinese_simp_answer":"年卡","chinese_trad_full":"我辦了年卡，很划算。","chinese_trad_cloze":"我辦了___，很划算。","chinese_trad_answer":"年卡","pinyin":"Wǒ bàn le niánkǎ, hěn huásuàn.","id":92},{"level":1,"module":"Barrio chino","spanish_full":"¿El barrio chino queda lejos de acá?","spanish_cloze":"¿El ___ queda lejos de acá?","spanish_answer":"barrio chino","chinese_simp_full":"唐人街离这儿远吗？","chinese_simp_cloze":"___离这儿远吗？","chinese_simp_answer":"唐人街","chinese_trad_full":"唐人街離這兒遠嗎？","chinese_trad_cloze":"___離這兒遠嗎？","chinese_trad_answer":"唐人街","pinyin":"Tángrénjiē lí zhèr yuǎn ma?","id":93},{"level":1,"module":"Barrio chino","spanish_full":"¿Acá se puede cambiar yuanes?","spanish_cloze":"¿Acá se puede cambiar ___?","spanish_answer":"yuanes","chinese_simp_full":"这里能换人民币吗？","chinese_simp_cloze":"这里能换___吗？","chinese_simp_answer":"人民币","chinese_trad_full":"這裡能換人民幣嗎？","chinese_trad_cloze":"這裡能換___嗎？","chinese_trad_answer":"人民幣","pinyin":"Zhèlǐ néng huàn rénmínbì ma?","id":94},{"level":1,"module":"Barrio chino","spanish_full":"¿A cómo salen estos rollitos primavera?","spanish_cloze":"¿A cómo salen estos ___?","spanish_answer":"rollitos primavera","chinese_simp_full":"这个春卷怎么卖？","chinese_simp_cloze":"这个___怎么卖？","chinese_simp_answer":"春卷","chinese_trad_full":"這個春捲怎麼賣？","chinese_trad_cloze":"這個___怎麼賣？","chinese_trad_answer":"春捲","pinyin":"Zhège chūnjuǎn zěnme mài?","id":95},{"level":1,"module":"Barrio chino","spanish_full":"¿Hay té barato?","spanish_cloze":"¿Hay ___ barato?","spanish_answer":"té","chinese_simp_full":"有便宜的茶叶吗？","chinese_simp_cloze":"有便宜的___吗？","chinese_simp_answer":"茶叶","chinese_trad_full":"有便宜的茶葉嗎？","chinese_trad_cloze":"有便宜的___嗎？","chinese_trad_answer":"茶葉","pinyin":"Yǒu piányi de cháyè ma?","id":96},{"level":1,"module":"Barrio chino","spanish_full":"¡Qué lindos los faroles!","spanish_cloze":"¡Qué lindos los ___!","spanish_answer":"faroles","chinese_simp_full":"灯笼真漂亮！","chinese_simp_cloze":"___真漂亮！","chinese_simp_answer":"灯笼","chinese_trad_full":"燈籠真漂亮！","chinese_trad_cloze":"___真漂亮！","chinese_trad_answer":"燈籠","pinyin":"Dēnglóng zhēn piàoliang!","id":97},{"level":1,"module":"Barrio chino","spanish_full":"En Año Nuevo chino esto se llena de vida.","spanish_cloze":"En ___ esto se llena de vida.","spanish_answer":"Año Nuevo chino","chinese_simp_full":"春节这里最热闹。","chinese_simp_cloze":"___这里最热闹。","chinese_simp_answer":"春节","chinese_trad_full":"春節這裡最熱鬧。","chinese_trad_cloze":"___這裡最熱鬧。","chinese_trad_answer":"春節","pinyin":"Chūnjié zhèlǐ zuì rènao.","id":98},{"level":1,"module":"En un restaurante","spanish_full":"Este plato está demasiado salado.","spanish_cloze":"Este plato está demasiado ___.","spanish_answer":"salado","chinese_simp_full":"这个菜太咸了。","chinese_simp_cloze":"这个菜太___了。","chinese_simp_answer":"咸","chinese_trad_full":"這個菜太鹹了。","chinese_trad_cloze":"這個菜太___了。","chinese_trad_answer":"鹹","pinyin":"Zhège cài tài xián le.","id":99},{"level":1,"module":"En un restaurante","spanish_full":"El menú, por favor.","spanish_cloze":"El ___, por favor.","spanish_answer":"menú","chinese_simp_full":"请给我菜单。","chinese_simp_cloze":"请给我___。","chinese_simp_answer":"菜单","chinese_trad_full":"請給我菜單。","chinese_trad_cloze":"請給我___。","chinese_trad_answer":"菜單","pinyin":"Qǐng gěi wǒ càidān.","spanish_alternatives":["carta"],"id":100},{"level":1,"module":"En un restaurante","spanish_full":"Quiero pedir una sopa.","spanish_cloze":"Quiero pedir una ___.","spanish_answer":"sopa","chinese_simp_full":"我想点一份汤。","chinese_simp_cloze":"我想点一份___。","chinese_simp_answer":"汤","chinese_trad_full":"我想點一份湯。","chinese_trad_cloze":"我想點一份___。","chinese_trad_answer":"湯","pinyin":"Wǒ xiǎng diǎn yí fèn tāng.","id":101},{"level":1,"module":"En un restaurante","spanish_full":"¿El agua es gratis?","spanish_cloze":"¿El agua es ___?","spanish_answer":"gratis","chinese_simp_full":"水是免费的吗？","chinese_simp_cloze":"水是___的吗？","chinese_simp_answer":"免费","chinese_trad_full":"水是免費的嗎？","chinese_trad_cloze":"水是___的嗎？","chinese_trad_answer":"免費","pinyin":"Shuǐ shì miǎnfèi de ma?","id":102},{"level":1,"module":"En un restaurante","spanish_full":"Para llevar, gracias.","spanish_cloze":"Para ___, gracias.","spanish_answer":"llevar","chinese_simp_full":"打包，谢谢。","chinese_simp_cloze":"___，谢谢。","chinese_simp_answer":"打包","chinese_trad_full":"打包，謝謝。","chinese_trad_cloze":"___，謝謝。","chinese_trad_answer":"打包","pinyin":"Dǎbāo, xièxie.","id":103},{"level":1,"module":"En un restaurante","spanish_full":"¿Hay platos vegetarianos?","spanish_cloze":"¿Hay platos ___?","spanish_answer":"vegetarianos","chinese_simp_full":"有素食的菜吗？","chinese_simp_cloze":"有___的菜吗？","chinese_simp_answer":"素食","chinese_trad_full":"有素食的菜嗎？","chinese_trad_cloze":"有___的菜嗎？","chinese_trad_answer":"素食","pinyin":"Yǒu sùshí de cài ma?","id":104},{"level":1,"module":"En el colectivo","spanish_full":"¿Este colectivo llega a la Plaza del Pueblo?","spanish_cloze":"¿Este colectivo ___ a la Plaza del Pueblo?","spanish_answer":"llega","chinese_simp_full":"这辆车到人民广场吗？","chinese_simp_cloze":"这辆车___人民广场吗？","chinese_simp_answer":"到","chinese_trad_full":"這輛車到人民廣場嗎？","chinese_trad_cloze":"這輛車___人民廣場嗎？","chinese_trad_answer":"到","pinyin":"Zhè liàng chē dào Rénmín Guǎngchǎng ma?","id":105},{"level":1,"module":"En el colectivo","spanish_full":"Me pasé de la parada.","spanish_cloze":"Me ___ de la parada.","spanish_answer":"pasé","chinese_simp_full":"我坐过站了。","chinese_simp_cloze":"我___了。","chinese_simp_answer":"坐过站","chinese_trad_full":"我坐過站了。","chinese_trad_cloze":"我___了。","chinese_trad_answer":"坐過站","pinyin":"Wǒ zuò guò zhàn le.","id":106},{"level":1,"module":"En el colectivo","spanish_full":"Un boleto, por favor.","spanish_cloze":"Un ___, por favor.","spanish_answer":"boleto","chinese_simp_full":"请给我一张票。","chinese_simp_cloze":"请给我一张___。","chinese_simp_answer":"票","chinese_trad_full":"請給我一張票。","chinese_trad_cloze":"請給我一張___。","chinese_trad_answer":"票","pinyin":"Qǐng gěi wǒ yì zhāng piào.","spanish_alternatives":["ticket"],"id":107},{"level":1,"module":"En el colectivo","spanish_full":"Quiero hacer transbordo al subte.","spanish_cloze":"Quiero hacer ___ al subte.","spanish_answer":"transbordo","chinese_simp_full":"我要转地铁。","chinese_simp_cloze":"我要___地铁。","chinese_simp_answer":"转","chinese_trad_full":"我要轉地鐵。","chinese_trad_cloze":"我要___地鐵。","chinese_trad_answer":"轉","pinyin":"Wǒ yào zhuǎn dìtiě.","id":108},{"level":1,"module":"En el colectivo","spanish_full":"¿Cuánto cuesta el pasaje?","spanish_cloze":"¿Cuánto cuesta el ___?","spanish_answer":"pasaje","chinese_simp_full":"车费是多少？","chinese_simp_cloze":"___是多少？","chinese_simp_answer":"车费","chinese_trad_full":"車費是多少？","chinese_trad_cloze":"___是多少？","chinese_trad_answer":"車費","pinyin":"Chēfèi shì duōshao?","id":109},{"level":1,"module":"En el colectivo","spanish_full":"Chofer, pare en la próxima parada.","spanish_cloze":"___, pare en la próxima parada.","spanish_answer":"Chofer","chinese_simp_full":"司机，到站停一下。","chinese_simp_cloze":"___，到站停一下。","chinese_simp_answer":"司机","chinese_trad_full":"司機，到站停一下。","chinese_trad_cloze":"___，到站停一下。","chinese_trad_answer":"司機","pinyin":"Sījī, dào zhàn tíng yíxià.","spanish_alternatives":["chofer"],"id":110},{"level":1,"module":"En el subterráneo","spanish_full":"¿Dónde queda la estación de subte más cercana?","spanish_cloze":"¿Dónde queda la estación de subte más ___?","spanish_answer":"cercana","chinese_simp_full":"最近地铁站在哪里？","chinese_simp_cloze":"___地铁站在哪里？","chinese_simp_answer":"最近","chinese_trad_full":"最近地鐵站在哪裡？","chinese_trad_cloze":"___地鐵站在哪裡？","chinese_trad_answer":"最近","pinyin":"Zuìjìn dìtiězhàn zài nǎlǐ?","id":111},{"level":1,"module":"En el subterráneo","spanish_full":"¿A qué hora pasa el último tren?","spanish_cloze":"¿A qué hora pasa el ___?","spanish_answer":"último tren","chinese_simp_full":"末班车几点？","chinese_simp_cloze":"___几点？","chinese_simp_answer":"末班车","chinese_trad_full":"末班車幾點？","chinese_trad_cloze":"___幾點？","chinese_trad_answer":"末班車","pinyin":"Mòbānchē jǐ diǎn?","id":112},{"level":1,"module":"En el subterráneo","spanish_full":"No encuentro la salida de la estación.","spanish_cloze":"No encuentro la ___ de la estación.","spanish_answer":"salida","chinese_simp_full":"我找不到出站口。","chinese_simp_cloze":"我找不到___。","chinese_simp_answer":"出站口","chinese_trad_full":"我找不到出站口。","chinese_trad_cloze":"我找不到___。","chinese_trad_answer":"出站口","pinyin":"Wǒ zhǎo bu dào chūzhànkǒu.","id":113},{"level":1,"module":"En el subterráneo","spanish_full":"¿Este tren va directo?","spanish_cloze":"¿Este tren va ___?","spanish_answer":"directo","chinese_simp_full":"这趟车直达吗？","chinese_simp_cloze":"这趟车___吗？","chinese_simp_answer":"直达","chinese_trad_full":"這趟車直達嗎？","chinese_trad_cloze":"這趟車___嗎？","chinese_trad_answer":"直達","pinyin":"Zhè tàng chē zhídá ma?","id":114},{"level":1,"module":"En el subterráneo","spanish_full":"¿El andén está arriba o abajo?","spanish_cloze":"¿El ___ está arriba o abajo?","spanish_answer":"andén","chinese_simp_full":"站台在楼上还是楼下？","chinese_simp_cloze":"___在楼上还是楼下？","chinese_simp_answer":"站台","chinese_trad_full":"站臺在樓上還是樓下？","chinese_trad_cloze":"___在樓上還是樓下？","chinese_trad_answer":"站臺","pinyin":"Zhàntái zài lóushàng háishì lóuxià?","id":115},{"level":1,"module":"En el subterráneo","spanish_full":"¿Se puede recargar la tarjeta del subte?","spanish_cloze":"¿Se puede ___ la tarjeta del subte?","spanish_answer":"recargar","chinese_simp_full":"地铁卡可以充值吗？","chinese_simp_cloze":"地铁卡可以___吗？","chinese_simp_answer":"充值","chinese_trad_full":"地鐵卡可以充值嗎？","chinese_trad_cloze":"地鐵卡可以___嗎？","chinese_trad_answer":"充值","pinyin":"Dìtiě kǎ kěyǐ chōngzhí ma?","id":116},{"level":1,"module":"En la clase de idioma","spanish_full":"Hable más despacio, por favor.","spanish_cloze":"Hable más ___, por favor.","spanish_answer":"despacio","chinese_simp_full":"请慢一点说。","chinese_simp_cloze":"请___一点说。","chinese_simp_answer":"慢","chinese_trad_full":"請慢一點說。","chinese_trad_cloze":"請___一點說。","chinese_trad_answer":"慢","pinyin":"Qǐng màn yìdiǎn shuō.","id":117},{"level":1,"module":"En la clase de idioma","spanish_full":"No entendí, perdón.","spanish_cloze":"No ___, perdón.","spanish_answer":"entendí","chinese_simp_full":"我没听懂，对不起。","chinese_simp_cloze":"我没___，对不起。","chinese_simp_answer":"听懂","chinese_trad_full":"我沒聽懂，對不起。","chinese_trad_cloze":"我沒___，對不起。","chinese_trad_answer":"聽懂","pinyin":"Wǒ méi tīngdǒng, duìbuqǐ.","id":118},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Cómo se escribe este carácter?","spanish_cloze":"¿Cómo se ___ este carácter?","spanish_answer":"escribe","chinese_simp_full":"这个字怎么写？","chinese_simp_cloze":"这个字怎么___？","chinese_simp_answer":"写","chinese_trad_full":"這個字怎麼寫？","chinese_trad_cloze":"這個字怎麼___？","chinese_trad_answer":"寫","pinyin":"Zhège zì zěnme xiě?","id":119},{"level":1,"module":"En la clase de idioma","spanish_full":"Quiero inscribirme al curso de chino.","spanish_cloze":"Quiero ___ al curso de chino.","spanish_answer":"inscribirme","chinese_simp_full":"我要报名汉语课。","chinese_simp_cloze":"我要___汉语课。","chinese_simp_answer":"报名","chinese_trad_full":"我要報名漢語課。","chinese_trad_cloze":"我要___漢語課。","chinese_trad_answer":"報名","pinyin":"Wǒ yào bàomíng Hànyǔ kè.","id":120},{"level":1,"module":"En la clase de idioma","spanish_full":"Abran el libro en la página doce.","spanish_cloze":"Abran el ___ en la página doce.","spanish_answer":"libro","chinese_simp_full":"请打开课本第十二页。","chinese_simp_cloze":"请打开___第十二页。","chinese_simp_answer":"课本","chinese_trad_full":"請打開課本第十二頁。","chinese_trad_cloze":"請打開___第十二頁。","chinese_trad_answer":"課本","pinyin":"Qǐng dǎkāi kèběn dì shí'èr yè.","id":121},{"level":1,"module":"En la clase de idioma","spanish_full":"Hoy hay muchísimas palabras nuevas.","spanish_cloze":"Hoy hay muchísimas ___ nuevas.","spanish_answer":"palabras","chinese_simp_full":"今天的生词真多。","chinese_simp_cloze":"今天的___真多。","chinese_simp_answer":"生词","chinese_trad_full":"今天的生詞真多。","chinese_trad_cloze":"今天的___真多。","chinese_trad_answer":"生詞","pinyin":"Jīntiān de shēngcí zhēn duō.","id":122},{"level":1,"module":"En el shopping","spanish_full":"Quiero probarme este abrigo.","spanish_cloze":"Quiero ___ este abrigo.","spanish_answer":"probarme","chinese_simp_full":"我想试试这件外套。","chinese_simp_cloze":"我想___这件外套。","chinese_simp_answer":"试试","chinese_trad_full":"我想試試這件外套。","chinese_trad_cloze":"我想___這件外套。","chinese_trad_answer":"試試","pinyin":"Wǒ xiǎng shìshi zhè jiàn wàitào.","id":123},{"level":1,"module":"En el shopping","spanish_full":"¿Lo hay en otro color?","spanish_cloze":"¿Lo hay en otro ___?","spanish_answer":"color","chinese_simp_full":"有别的颜色吗？","chinese_simp_cloze":"有别的___吗？","chinese_simp_answer":"颜色","chinese_trad_full":"有別的顏色嗎？","chinese_trad_cloze":"有別的___嗎？","chinese_trad_answer":"顏色","pinyin":"Yǒu biéde yánsè ma?","id":124},{"level":1,"module":"En el shopping","spanish_full":"¿Dónde está la caja?","spanish_cloze":"¿Dónde está la ___?","spanish_answer":"caja","chinese_simp_full":"收银台在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"收银台","chinese_trad_full":"收銀臺在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"收銀臺","pinyin":"Shōuyíntái zài nǎlǐ?","id":125},{"level":1,"module":"En el shopping","spanish_full":"¿Esto tiene garantía?","spanish_cloze":"¿Esto tiene ___?","spanish_answer":"garantía","chinese_simp_full":"这个有保修吗？","chinese_simp_cloze":"这个有___吗？","chinese_simp_answer":"保修","chinese_trad_full":"這個有保修嗎？","chinese_trad_cloze":"這個有___嗎？","chinese_trad_answer":"保修","pinyin":"Zhège yǒu bǎoxiū ma?","id":126},{"level":1,"module":"En el shopping","spanish_full":"Solo estoy mirando, gracias.","spanish_cloze":"Solo estoy ___, gracias.","spanish_answer":"mirando","chinese_simp_full":"我只看看，谢谢。","chinese_simp_cloze":"我只___，谢谢。","chinese_simp_answer":"看看","chinese_trad_full":"我只看看，謝謝。","chinese_trad_cloze":"我只___，謝謝。","chinese_trad_answer":"看看","pinyin":"Wǒ zhǐ kànkan, xièxie.","id":127},{"level":1,"module":"En el shopping","spanish_full":"Escaneá este código QR para pagar.","spanish_cloze":"Escaneá este ___ QR para pagar.","spanish_answer":"código","chinese_simp_full":"扫这个二维码付款。","chinese_simp_cloze":"扫这个___付款。","chinese_simp_answer":"二维码","chinese_trad_full":"掃這個二維碼付款。","chinese_trad_cloze":"掃這個___付款。","chinese_trad_answer":"二維碼","pinyin":"Sǎo zhège èrwéimǎ fùkuǎn.","id":128},{"level":1,"module":"En el cine","spanish_full":"Sentémonos en el medio.","spanish_cloze":"Sentémonos en el ___.","spanish_answer":"medio","chinese_simp_full":"我们坐中间的位子吧。","chinese_simp_cloze":"我们坐___的位子吧。","chinese_simp_answer":"中间","chinese_trad_full":"我們坐中間的位子吧。","chinese_trad_cloze":"我們坐___的位子吧。","chinese_trad_answer":"中間","pinyin":"Wǒmen zuò zhōngjiān de wèizi ba.","id":129},{"level":1,"module":"En el cine","spanish_full":"El volumen está muy alto.","spanish_cloze":"El ___ está muy alto.","spanish_answer":"volumen","chinese_simp_full":"音量太大了。","chinese_simp_cloze":"___太大了。","chinese_simp_answer":"音量","chinese_trad_full":"音量太大了。","chinese_trad_cloze":"___太大了。","chinese_trad_answer":"音量","pinyin":"Yīnliàng tài dà le.","id":130},{"level":1,"module":"En el cine","spanish_full":"Celular en silencio, por favor.","spanish_cloze":"Celular en ___, por favor.","spanish_answer":"silencio","chinese_simp_full":"手机请调成静音。","chinese_simp_cloze":"手机请调成___。","chinese_simp_answer":"静音","chinese_trad_full":"手機請調成靜音。","chinese_trad_cloze":"手機請調成___。","chinese_trad_answer":"靜音","pinyin":"Shǒujī qǐng tiáochéng jìngyīn.","id":131},{"level":1,"module":"En el cine","spanish_full":"¿Dónde nos juntamos al terminar?","spanish_cloze":"¿Dónde nos ___ al terminar?","spanish_answer":"juntamos","chinese_simp_full":"散场后在哪里集合？","chinese_simp_cloze":"散场后在哪里___？","chinese_simp_answer":"集合","chinese_trad_full":"散場後在哪裡集合？","chinese_trad_cloze":"散場後在哪裡___？","chinese_trad_answer":"集合","pinyin":"Sànchǎng hòu zài nǎlǐ jíhé?","id":132},{"level":1,"module":"En el cine","spanish_full":"Quiero una gaseosa.","spanish_cloze":"Quiero una ___.","spanish_answer":"gaseosa","chinese_simp_full":"我想要一杯可乐。","chinese_simp_cloze":"我想要一杯___。","chinese_simp_answer":"可乐","chinese_trad_full":"我想要一杯可樂。","chinese_trad_cloze":"我想要一杯___。","chinese_trad_answer":"可樂","pinyin":"Wǒ xiǎng yào yì bēi kělè.","id":133},{"level":1,"module":"En el cine","spanish_full":"Esta peli recién se estrenó.","spanish_cloze":"Esta peli recién se ___.","spanish_answer":"estrenó","chinese_simp_full":"这部片刚上映。","chinese_simp_cloze":"这部片刚___。","chinese_simp_answer":"上映","chinese_trad_full":"這部片剛上映。","chinese_trad_cloze":"這部片剛___。","chinese_trad_answer":"上映","pinyin":"Zhè bù piàn gāng shàngyìng.","id":134},{"level":1,"module":"En el gimnasio","spanish_full":"Primero caliento cinco minutos.","spanish_cloze":"Primero ___ cinco minutos.","spanish_answer":"caliento","chinese_simp_full":"我先热身五分钟。","chinese_simp_cloze":"我先___五分钟。","chinese_simp_answer":"热身","chinese_trad_full":"我先熱身五分鐘。","chinese_trad_cloze":"我先___五分鐘。","chinese_trad_answer":"熱身","pinyin":"Wǒ xiān rèshēn wǔ fēnzhōng.","id":135},{"level":1,"module":"En el gimnasio","spanish_full":"¿Dónde están las mancuernas?","spanish_cloze":"¿Dónde están las ___?","spanish_answer":"mancuernas","chinese_simp_full":"哑铃放在哪里？","chinese_simp_cloze":"___放在哪里？","chinese_simp_answer":"哑铃","chinese_trad_full":"啞鈴放在哪裡？","chinese_trad_cloze":"___放在哪裡？","chinese_trad_answer":"啞鈴","pinyin":"Yǎlíng fàng zài nǎlǐ?","id":136},{"level":1,"module":"En el gimnasio","spanish_full":"¿El vestuario tiene armarios?","spanish_cloze":"¿El ___ tiene armarios?","spanish_answer":"vestuario","chinese_simp_full":"更衣室有储物柜吗？","chinese_simp_cloze":"___有储物柜吗？","chinese_simp_answer":"更衣室","chinese_trad_full":"更衣室有儲物櫃嗎？","chinese_trad_cloze":"___有儲物櫃嗎？","chinese_trad_answer":"更衣室","pinyin":"Gēngyīshì yǒu chǔwùguì ma?","id":137},{"level":1,"module":"En el gimnasio","spanish_full":"Tomé una clase de yoga.","spanish_cloze":"Tomé una clase de ___.","spanish_answer":"yoga","chinese_simp_full":"我上了一节瑜伽课。","chinese_simp_cloze":"我上了一节___课。","chinese_simp_answer":"瑜伽","chinese_trad_full":"我上了一節瑜伽課。","chinese_trad_cloze":"我上了一節___課。","chinese_trad_answer":"瑜伽","pinyin":"Wǒ shàngle yì jié yújiā kè.","id":138},{"level":1,"module":"En el gimnasio","spanish_full":"¿Cuántas series hago de este ejercicio?","spanish_cloze":"¿Cuántas ___ hago de este ejercicio?","spanish_answer":"series","chinese_simp_full":"这个动作做几组？","chinese_simp_cloze":"这个动作做几___？","chinese_simp_answer":"组","chinese_trad_full":"這個動作做幾組？","chinese_trad_cloze":"這個動作做幾___？","chinese_trad_answer":"組","pinyin":"Zhège dòngzuò zuò jǐ zǔ?","id":139},{"level":1,"module":"En el gimnasio","spanish_full":"Todos los días vengo a correr.","spanish_cloze":"Todos los días vengo a ___.","spanish_answer":"correr","chinese_simp_full":"我每天都来跑步。","chinese_simp_cloze":"我每天都来___。","chinese_simp_answer":"跑步","chinese_trad_full":"我每天都來跑步。","chinese_trad_cloze":"我每天都來___。","chinese_trad_answer":"跑步","pinyin":"Wǒ měitiān dōu lái pǎobù.","id":140},{"level":1,"module":"Barrio chino","spanish_full":"Quiero aprender a cocinar comida china.","spanish_cloze":"Quiero ___ a cocinar comida china.","spanish_answer":"aprender","chinese_simp_full":"我想学做中国菜。","chinese_simp_cloze":"我想___做中国菜。","chinese_simp_answer":"学","chinese_trad_full":"我想學做中國菜。","chinese_trad_cloze":"我想___做中國菜。","chinese_trad_answer":"學","pinyin":"Wǒ xiǎng xué zuò Zhōngguó cài.","id":141},{"level":1,"module":"Barrio chino","spanish_full":"¿Esta tienda tiene pasteles de luna?","spanish_cloze":"¿Esta tienda tiene ___?","spanish_answer":"pasteles de luna","chinese_simp_full":"这家店有月饼吗？","chinese_simp_cloze":"这家店有___吗？","chinese_simp_answer":"月饼","chinese_trad_full":"這家店有月餅嗎？","chinese_trad_cloze":"這家店有___嗎？","chinese_trad_answer":"月餅","pinyin":"Zhè jiā diàn yǒu yuèbǐng ma?","id":142},{"level":1,"module":"Barrio chino","spanish_full":"Quiero comprar hierbas medicinales.","spanish_cloze":"Quiero comprar ___ medicinales.","spanish_answer":"hierbas","chinese_simp_full":"我想买些药材。","chinese_simp_cloze":"我想买些___。","chinese_simp_answer":"药材","chinese_trad_full":"我想買些藥材。","chinese_trad_cloze":"我想買些___。","chinese_trad_answer":"藥材","pinyin":"Wǒ xiǎng mǎi xiē yàocái.","id":143},{"level":1,"module":"Barrio chino","spanish_full":"Acá hay muchas comidas callejeras.","spanish_cloze":"Acá hay muchas ___ callejeras.","spanish_answer":"comidas","chinese_simp_full":"这里有很多小吃。","chinese_simp_cloze":"这里有很多___。","chinese_simp_answer":"小吃","chinese_trad_full":"這裡有很多小吃。","chinese_trad_cloze":"這裡有很多___。","chinese_trad_answer":"小吃","pinyin":"Zhèlǐ yǒu hěn duō xiǎochī.","id":144},{"level":1,"module":"Barrio chino","spanish_full":"Allá hay gente jugando mahjong.","spanish_cloze":"Allá hay gente jugando ___.","spanish_answer":"mahjong","chinese_simp_full":"那边有人在打麻将。","chinese_simp_cloze":"那边有人在打___。","chinese_simp_answer":"麻将","chinese_trad_full":"那邊有人在打麻將。","chinese_trad_cloze":"那邊有人在打___。","chinese_trad_answer":"麻將","pinyin":"Nàbiān yǒu rén zài dǎ májiàng.","id":145},{"level":1,"module":"Barrio chino","spanish_full":"Los fines de semana hay feria grande acá.","spanish_cloze":"Los fines de semana hay ___ grande acá.","spanish_answer":"feria","chinese_simp_full":"周末这里有大市场。","chinese_simp_cloze":"周末这里有大___。","chinese_simp_answer":"市场","chinese_trad_full":"週末這裡有大市場。","chinese_trad_cloze":"週末這裡有大___。","chinese_trad_answer":"市場","pinyin":"Zhōumò zhèlǐ yǒu dà shìchǎng.","id":146}],
'HSK1': [["爱","愛","ài","Amar",["Gustar"]],["爱好","愛好","àihào","Tener afición/hobby",null],["八",null,"bā","Ocho",null],["爸爸",null,"bàba","Papá",["Padre"]],["吧",null,"ba","Partícula modal",null],["白",null,"bái","Blanco",null],["白天",null,"báitiān","Día",null],["百",null,"bǎi","Cien",null],["班",null,"bān","Clase/semana",null],["半",null,"bàn","Medio",null],["半年",null,"bàn nián","Medio año",null],["半天",null,"bàntiān","Medio día",null],["帮","幫","bāng","Ayudar",null],["帮忙","幫忙","bāngmáng","Ayudar",null],["包",null,"bāo","Bolsa/envolver",null],["包子",null,"bāozi","Bollo al vapor",null],["杯",null,"bēi","Taza",null],["杯子",null,"bēizi","Taza",null],["北",null,"běi","Norte",null],["北边","北邊","běibian","Lado norte",null],["北京",null,"Běijīng","Pekín",null],["本",null,"běn","Libro",null],["本子",null,"běnzi","Cuaderno",null],["比",null,"bǐ","Comparar/más que",null],["别","別","bié","No",null],["别的","別的","biéde","Otros",null],["别人","別人","biérén","Otros",null],["病",null,"bìng","Enfermedad/enfermar",null],["病人",null,"bìngrén","Paciente",null],["不大",null,"bù dà","No muy",null],["不对","不對","bùduì","Incorrecto",null],["不客气","不客氣","bù kèqì","De nada",null],["不用",null,"bùyòng","No es necesario",null],["不",null,"bù","No",null],["菜",null,"cài","Plato/vegetal",null],["茶",null,"chá","Té",null],["差",null,"chà","Mal/faltar",null],["常",null,"cháng","A menudo",null],["常常",null,"chángcháng","A menudo",null],["唱",null,"chàng","Cantar",null],["唱歌",null,"chànggē","Cantar",null],["车","車","chē","Coche",null],["车票","車票","chēpiào","Billete de tren",null],["车上","車上","chē shang","En el coche",null],["车站","車站","chēzhàn","Estación",null],["吃",null,"chī","Comer",null],["吃饭","吃飯","chīfàn","Comer",null],["出",null,"chū","Salir",null],["出来","出來","chūlái","Salir",null],["出去",null,"chūqù","Salir",null],["穿",null,"chuān","Vestir",null],["床",null,"chuáng","Cama",null],["次",null,"cì","Vez",null],["从","從","cóng","Desde",null],["错","錯","cuò","Equivocado",null],["打",null,"dǎ","Golpear/tomar",null],["打车","打車","dǎchē","Tomar taxi",null],["打电话","打電話","dǎ diànhuà","Llamar por teléfono",null],["打开","打開","dǎkāi","Abrir",null],["打球",null,"dǎ qiú","Jugar",null],["大",null,"dà","Grande",null],["大学","大學","dàxué","Universidad",null],["大学生","大學生","dàxuéshēng","Estudiante universitario",null],["到",null,"dào","Llegar",null],["得到",null,"dédào","Obtener",null],["地",null,"de","Partícula",null],["的",null,"de","Partícula",null],["等",null,"děng","Esperar",null],["地点","地點","dìdiǎn","Lugar",null],["地方",null,"dìfang","Lugar",null],["地上",null,"dìshang","En el suelo",null],["地图","地圖","dìtú","Mapa",null],["弟弟",null,"dìdi","Hermano menor",null],["第",null,"dì (dì-èr)","Prefijo ordinal",null],["点","點","diǎn","Punto/hora",null],["电","電","diàn","Electricidad",null],["电话","電話","diànhuà","Teléfono",null],["电脑","電腦","diànnǎo","Computadora",null],["电视","電視","diànshì","Televisión",null],["电视机","電視機","diànshìjī","Televisor",null],["电影","電影","diànyǐng","Película",null],["电影院","電影院","diànyǐngyuàn","Cine",null],["东","東","dōng","Este",null],["东边","東邊","dōngbian","Lado este",null],["东西","東西","dōngxi","Cosa/cosas",null],["动","動","dòng","Mover",null],["动作","動作","dòngzuò","Movimiento",null],["都",null,"dōu","Todos",null],["读","讀","dú","Leer",null],["读书","讀書","dúshū","Leer",null],["对","對","duì","Correcto",null],["对不起","對不起","duìbuqǐ","Perdonar",null],["多",null,"duō","Mucho",null],["多少",null,"duōshao","Cuánto",null],["饿","餓","è","Hambre/hambriento",null],["儿子","兒子","érzi","Hijo",null],["二",null,"èr","Dos",null],["饭","飯","fàn","Comida",null],["饭店","飯店","fàndiàn","Restaurante",null],["房间","房間","fángjiān","Habitación",null],["房子",null,"fángzi","Casa",null],["放",null,"fàng","Poner",null],["放假",null,"fàngjià","Tomar vacaciones",null],["放学","放學","fàngxué","Salir de clase",null],["飞","飛","fēi","Volar",null],["飞机","飛機","fēijī","Avión",null],["非常",null,"fēicháng","Muy",null],["分",null,"fēn","Minuto",null],["风","風","fēng","Viento",null],["干","乾","gān","Seco",null],["干净","乾淨","gānjìng","Limpio",null],["干什么","幹什麼","gàn shénme","Qué hacer",null],["高",null,"gāo","Alto",null],["高兴","高興","gāoxìng","Feliz",null],["告诉","告訴","gàosu","Decir",null],["哥哥",null,"gēge","Hermano mayor",null],["歌",null,"gē","Canción",null],["个","個","gè","Uno",null],["给","給","gěi","Dar/con",null],["跟",null,"gēn","Con/y",null],["工人",null,"gōngrén","Trabajador",null],["工作",null,"gōngzuò","Trabajar/trabajo",null],["关","關","guān","Cerrar",null],["关上","關上","guānshang","Cerrar",["Apagar"]],["贵","貴","guì","Caro",["Valioso"]],["国","國","guó","País",["Nación"]],["国家","國家","guójiā","Nación",["Estado"]],["国外","國外","guó wài","Extranjero",["En el exterior"]],["过","過","guò","Pasar",["Cruzar"]],["还","還","hái","Todavía",["Aún"]],["还是","還是","háishi","O",["Tal vez"]],["还有","還有","hái yǒu","Además",["También"]],["孩子",null,"háizi","Niño",["Hija"]],["汉语","漢語","Hànyǔ","Chino",["Idioma chino"]],["汉字","漢字","Hànzì","Carácter chino",["Ideograma"]],["好",null,"hǎo","Bueno",["Excelente"]],["好吃",null,"hǎochī","Sabroso",["Delicioso"]],["好看",null,"hǎokàn","Bonito",["Atractivo"]],["好听","好聽","hǎotīng","Agradable",["Melodioso"]],["好玩儿","好玩兒","hǎowánr","Divertido",["Entretenido"]],["号","號","hào","Número",["Signo"]],["喝",null,"hē","Beber",["Tomar"]],["和",null,"hé","Y",["Con"]],["很",null,"hěn","Muy",["Bastante"]],["后","後","hòu","Después",["Atrás"]],["后边","後邊","hòubian","Detrás",["Atrás"]],["后天","後天","hòutiān","Pasado mañana",["Dentro de dos días"]],["花",null,"huā","Flor",["Gastar"]],["话","話","huà","Palabra",["Historia"]],["坏","壞","huài","Malo",["Dañado"]],["回",null,"huí","Volver",["Regresar"]],["回答",null,"huídá","Responder",["Contestar"]],["回到",null,"huídào","Volver a",["Arribar a"]],["回家",null,"huí jiā","Volver a casa",["Regresar al hogar"]],["回来","回來","huílái","Volver",["Regresar"]],["回去",null,"huíqù","Volver",["Regresar"]],["会","會","huì","Poder",["Conocer"]],["火车","火車","huǒchē","Tren",["Ferrocarril"]],["机场","機場","jīchǎng","Aeropuerto",["Terminal"]],["机票","機票","jīpiào","Billete de avión",["Pasaje"]],["鸡蛋","雞蛋","jīdàn","Huevo",["Huevo de gallina"]],["几","幾","jǐ","Cuántos",["Algunos"]],["记","記","jì","Recordar",["Anotar"]],["记得","記得","jìde","Acordarse",["Memorizar"]],["记住","記住","jìzhù","Memorizar",["Fijar"]],["家",null,"jiā","Casa",["Hogar"]],["家里","家裡","jiā li","En casa",["Domicilio"]],["家人",null,"jiārén","Familiar",["Pariente"]],["间","間","jiān","Habitación",["Cuarto"]],["见","見","jiàn","Ver",["Encontrar"]],["见面","見面","jiànmiàn","Encontrarse",["Verse"]],["教",null,"jiāo","Enseñar",["Instruir"]],["叫",null,"jiào","Llamar",["Gritar"]],["教学楼","教學樓","jiàoxuélóu","Edificio de aulas",["Pabellón"]],["姐姐",null,"jiějie","Hermana mayor",null],["介绍","介紹","jièshào","Presentar",["Introducir"]],["今年",null,"jīnnián","Este año",["Año actual"]],["今天",null,"jīntiān","Hoy",["Día de hoy"]],["进","進","jìn","Entrar",["Avanzar"]],["进来","進來","jìnlái","Entrar",["Entrar adentro"]],["进去","進去","jìnqù","Entrar",["Entrar dentro"]],["九",null,"jiǔ","Nueve",["Nona"]],["就",null,"jiù","Entonces",["Justo"]],["觉得","覺得","juéde","Sentir",["Pensar"]],["开","開","kāi","Abrir",["Empezar"]],["开车","開車","kāichē","Manejar",["Conducir"]],["开会","開會","kāihuì","Reunirse",["Tener reunión"]],["开玩笑","開玩笑","kāi wánxiào","Bromear",["Hacer chistes"]],["看",null,"kàn","Ver",["Mirar"]],["看病",null,"kànbìng","Consultar al médico",["Atenderse"]],["看到",null,"kàndào","Ver",["Notar"]],["看见","看見","kànjiàn","Ver",["Divisar"]],["考",null,"kǎo","Examinar",["Probar"]],["考试","考試","kǎoshì","Examen",["Prueba"]],["渴",null,"kě","Sediento",["Árido"]],["课","課","kè","Clase",["Lección"]],["课本","課本","kèběn","Libro de texto",["Manual"]],["课文","課文","kèwén","Texto",["Lección"]],["口",null,"kǒu","Boca",["Entrada"]],["块","塊","kuài","Yuan",["Pedazo"]],["快",null,"kuài","Rápido",["Pronto"]],["来","來","lái","Venir",["Llegar"]],["来到","來到","láidào","Llegar",["Arribar"]],["老",null,"lǎo","Viejo",["Antiguo"]],["老人",null,"lǎorén","Anciano",["Mayor"]],["老师","老師","lǎoshī","Maestro",["Profesora"]],["了",null,"le","Partícula final",["Marca aspecto perfecto"]],["累",null,"lèi","Cansado",["Fatigado"]],["冷",null,"lěng","Frío",["Helado"]],["里","裡","lǐ","Dentro",["Interior"]],["里边","裡邊","lǐbian","Dentro",["Adentro"]],["两","兩","liǎng","Dos",["Doble"]],["零",null,"líng","Cero",["Nada"]],["六",null,"liù","Seis",["Sexta"]],["楼","樓","lóu","Edificio",["Piso"]],["楼上","樓上","lóu shàng","Arriba",["En el piso superior"]],["楼下","樓下","lóu xià","Abajo",["En el piso inferior"]],["路",null,"lù","Camino",["Calle"]],["路口",null,"lùkǒu","Esquina",["Cruce"]],["路上",null,"lùshang","Camino",["En el camino"]],["妈妈","媽媽","māma","Mamá",["Madre"]],["马路","馬路","mǎlù","Calle",["Avenida"]],["马上","馬上","mǎshàng","Inmediatamente",["Al instante"]],["吗","嗎","ma","Partícula interrogativa",["Marca pregunta"]],["买","買","mǎi","Comprar",["Adquirir"]],["慢",null,"màn","Lento",["Pausado"]],["忙",null,"máng","Ocupado",["Ajetreado"]],["毛",null,"máo","Jiao",["Décima de yuan"]],["没","沒","méi","No",["No haber"]],["没关系","沒關係","méi guānxi","No importa",["No hay problema"]],["没什么","沒什麼","méi shénme","No hay nada",["Nada importante"]],["没事儿","沒事兒","méishìr","No hay problema",["Está bien"]],["没有","沒有","méiyǒu","No tener",["No haber"]],["妹妹",null,"mèimei","Hermana menor",null],["门","門","mén","Puerta",["Entrada"]],["门口","門口","ménkǒu","Entrada",["Puerta"]],["门票","門票","ménpiào","Boleto",["Entrada"]],["们","們","men (péngyoumen)","Sufijo plural",["Marca plural"]],["米饭","米飯","mǐfàn","Arroz",["Plato de arroz"]],["面包","麵包","miànbāo","Pan",["Barra de pan"]],["面条儿","麵條兒","miàntiáor","Fideos",["Tallarines"]],["名字",null,"míngzi","Nombre",["Apodo"]],["明白",null,"míngbai","Entender",["Claro"]],["明年",null,"míngnián","Año próximo",["El que viene"]],["明天",null,"míngtiān","Mañana",["Día siguiente"]],["拿",null,"ná","Tomar",["Agarrar"]],["哪",null,"nǎ","Qué",["Cuál"]],["哪里","哪裡","nǎlǐ","Dónde",["Adónde"]],["哪儿","哪兒","nǎr","Dónde",["Adónde"]],["哪些",null,"nǎxiē","Cuáles",["Qué"]],["那",null,"nà","Ese/aquel",["Aquel"]],["那边","那邊","nàbiān","Allá",["Por allá"]],["那里","那裡","nàlǐ","Allá",["Por allí"]],["那儿","那兒","nàr","Allá",["Por allí"]],["那些",null,"nàxiē","Esos/esas",["Aquellos"]],["奶",null,"nǎi","Leche",["Pecho"]],["奶奶",null,"nǎinai","Abuela",["Abuelita"]],["男",null,"nán","Masculino",["Varón"]],["男孩儿","男孩兒","nánháir","Niño",["Chico"]],["男朋友",null,"nánpéngyou","Novio",["Pareja masculina"]],["男人",null,"nánrén","Hombre",["Varón"]],["男生",null,"nánshēng","Estudiante masculino",["Chico"]],["南",null,"nán","Sur",["Austral"]],["南边","南邊","nánbian","Sur",["Lado sur"]],["难","難","nán","Difícil",["Complicado"]],["呢",null,"ne","Partícula interrogativa",["¿eh?"]],["能",null,"néng","Poder",["Ser capaz"]],["你",null,"nǐ","Tú",["Usted"]],["你们","你們","nǐmen","Vosotros/ustedes",["Ustedes"]],["年",null,"nián","Año",["Edad"]],["您",null,"nín","Usted",["Formal"]],["牛奶",null,"niúnǎi","Leche",["Leche de vaca"]],["女",null,"nǚ","Femenino",["Hembra"]],["女儿","女兒","nǚ'ér","Hija",["Niña"]],["女孩儿","女孩兒","nǚháir","Niña",["Chica"]],["女朋友",null,"nǚpéngyou","Novia",["Pareja femenina"]],["女人",null,"nǚrén","Mujer",["Hembra"]],["女生",null,"nǚshēng","Estudiante femenina",["Chica"]],["旁边","旁邊","pángbiān","Al lado",["Junto a"]],["跑",null,"pǎo","Correr",["Huir"]],["朋友",null,"péngyou","Amigo",["Conocido"]],["票",null,"piào","Billete",["Entrada"]],["七",null,"qī","Siete",null],["起",null,"qǐ","Levantar",["Comenzar"]],["起床",null,"qǐchuáng","Levantarse",null],["起来","起來","qǐlái","Levantarse",null],["汽车","汽車","qìchē","Coche",["Automóvil"]],["前",null,"qián","Frente",["Delante"]],["前边","前邊","qiánbian","Frente",["Delante"]],["前天",null,"qiántiān","Anteayer",["Pasado mañana"]],["钱","錢","qián","Dinero",["Moneda"]],["钱包","錢包","qiánbāo","Billetera",["Monedero"]],["请","請","qǐng","Pedir",["Invitar"]],["请假","請假","qǐngjià","Pedir permiso",null],["请进","請進","qǐng jìn","Entre",null],["请问","請問","qǐngwèn","Preguntar",["Disculpe"]],["请坐","請坐","qǐng zuò","Siéntese",null],["球",null,"qiú","Bola",["Pelota"]],["去",null,"qù","Ir",["Marchar"]],["去年",null,"qùnián","Año pasado",null],["热","熱","rè","Caliente",["Caluroso"]],["人",null,"rén","Persona",["Gente"]],["认识","認識","rènshi","Conocer",["Reconocer"]],["认真","認真","rènzhēn","Serio",["Cuidadoso"]],["日",null,"rì","Día",["Sol"]],["日期",null,"rìqī","Fecha",["Día"]],["肉",null,"ròu","Carne",["Carne de animal"]],["三",null,"sān","Tres",null],["山",null,"shān","Montaña",["Cerro"]],["商场","商場","shāngchǎng","Centro comercial",["Mercado"]],["商店",null,"shāngdiàn","Tienda",["Comercio"]],["上",null,"shàng","Subir",["Encima"]],["上班",null,"shàngbān","Ir al trabajo",null],["上边","上邊","shàngbian","Arriba",["Encima"]],["上车","上車","shàng chē","Subir al coche",null],["上次",null,"shàng cì","Última vez",null],["上课","上課","shàngkè","Tener clase",null],["上网","上網","shàngwǎng","Navegar por internet",null],["上午",null,"shàngwǔ","Mañana",null],["上学","上學","shàngxué","Ir a la escuela",null],["少",null,"shǎo","Poco",["Escaso"]],["谁","誰","shéi/shuí","Quién",null],["身上",null,"shēnshang","En el cuerpo",["Encima"]],["身体","身體","shēntǐ","Cuerpo",["Físico"]],["什么","什麼","shénme","Qué",["Cuál"]],["生病",null,"shēngbìng","Enfermarse",null],["生气","生氣","shēngqì","Enfadarse",null],["生日",null,"shēngrì","Cumpleaños",null],["十",null,"shí","Diez",null],["时候","時候","shíhou","Momento",["Ocasión"]],["时间","時間","shíjiān","Tiempo",["Hora"]],["事",null,"shì","Cosa",["Asunto"]],["试","試","shì","Probar",["Intentar"]],["是",null,"shì","Ser",["Estar"]],["是不是",null,"shì bu shì","Es o no",null],["手",null,"shǒu","Mano",["Brazo"]],["手机","手機","shǒujī","Móvil",["Teléfono"]],["书","書","shū","Libro",["Texto"]],["书包","書包","shūbāo","Mochila",["Bolso"]],["书店","書店","shūdiàn","Librería",null],["树","樹","shù","Árbol",["Planta"]],["水",null,"shuǐ","Agua",["Líquido"]],["水果",null,"shuǐguǒ","Fruta",null],["睡",null,"shuì","Dormir",["Descansar"]],["睡觉","睡覺","shuìjiào","Dormir",null],["说","說","shuō","Decir",["Hablar"]],["说话","說話","shuōhuà","Hablar",["Conversar"]],["四",null,"sì","Cuatro",null],["送",null,"sòng","Regalar",["Enviar"]],["岁","歲","suì","Año",["Edad"]],["他",null,"tā","Él",null],["他们","他們","tāmen","Ellos",null],["她",null,"tā","Ella",null],["她们","她們","tāmen","Ellas",null],["太",null,"tài","Demasiado",["Muy"]],["天",null,"tiān","Cielo",["Día"]],["天气","天氣","tiānqì","Clima",["Tiempo"]],["听","聽","tīng","Oír",["Escuchar"]],["听到","聽到","tīngdào","Oír",null],["听见","聽見","tīngjiàn","Oír",null],["听写","聽寫","tīngxiě","Dictado",null],["同学","同學","tóngxué","Compañero/a de clase",null],["图书馆","圖書館","túshūguǎn","Biblioteca",null],["外",null,"wài","Fuera",["Exterior"]],["外边","外邊","wàibian","Fuera",["Afuera"]],["外国","外國","wàiguó","País extranjero",["Extranjero"]],["外语","外語","wàiyǔ","Idioma extranjero",["Lengua foránea"]],["玩儿","玩兒","wánr","Jugar",["Divertirse"]],["晚",null,"wǎn","Tarde",["Nocturno"]],["晚饭","晚飯","wǎnfàn","Cena",["Comida nocturna"]],["晚上",null,"wǎnshang","Noche",["Tarde"]],["网上","網上","wǎng shang","En línea",["Por internet"]],["网友","網友","wǎngyǒu","Internauta",["Contacto virtual"]],["忘",null,"wàng","Olvidar",["Dejar de recordar"]],["忘记","忘記","wàngjì","Olvidar",["No acordarse"]],["问","問","wèn","Preguntar",["Interrogar"]],["我",null,"wǒ","Yo",["Personal"]],["我们","我們","wǒmen","Nosotros",["Personal"]],["五",null,"wǔ","Cinco",["Numeral"]],["午饭","午飯","wǔfàn","Almuerzo",["Comida mediodía"]],["西",null,"xī","Oeste",["Dirección"]],["西边","西邊","xībian","Lado oeste",["Occidente"]],["洗",null,"xǐ","Lavar",["Limpiar"]],["洗手间","洗手間","xǐshǒujiān","Baño",["Servicios"]],["喜欢","喜歡","xǐhuan","Gustar",["Preferir"]],["下",null,"xià","Bajar",["Siguiente"]],["下班",null,"xiàbān","Terminar trabajo",["Salir del trabajo"]],["下边","下邊","xiàbian","Parte inferior",["Abajo"]],["下车","下車","xià chē","Bajarse del transporte",["Salir del vehículo"]],["下次",null,"xià cì","Próxima vez",["Otra ocasión"]],["下课","下課","xiàkè","Terminar clase",["Salir del aula"]],["下午",null,"xiàwǔ","Tarde",["Mediodía"]],["下雨",null,"xià yǔ","Llover",["Precipitación"]],["先",null,"xiān","Primero",["Antes"]],["先生",null,"xiānsheng","Señor",["Caballero"]],["现在","現在","xiànzài","Ahora",["Presente"]],["想",null,"xiǎng","Pensar",["Desear"]],["小",null,"xiǎo","Pequeño",["Diminutivo"]],["小孩儿","小孩兒","xiǎoháir","Niño",["Niño pequeño"]],["小姐",null,"xiǎojiě","Señorita",["Dama"]],["小朋友",null,"xiǎopéngyǒu","Niño",["Pequeño amigo"]],["小时","小時","xiǎoshí","Hora",["Unidad de tiempo"]],["小学","小學","xiǎoxué","Escuela primaria",["Educación básica"]],["小学生","小學生","xiǎoxuéshēng","Estudiante primaria",["Niño escolar"]],["笑",null,"xiào","Reír",["Sonreír"]],["写","寫","xiě","Escribir",["Trazar"]],["谢谢","謝謝","xièxie","Agradecer",["Dar las gracias"]],["新",null,"xīn","Nuevo",["Reciente"]],["新年",null,"xīnnián","Año nuevo",["Celebración"]],["星期",null,"xīngqī","Semana",["Período"]],["星期日",null,"xīngqīrì","Domingo",["Día"]],["星期天",null,"xīngqītiān","Domingo",["Día festivo"]],["行",null,"xíng","Ir",["Estar bien"]],["休息",null,"xiūxi","Descansar",["Relajarse"]],["学","學","xué","Estudiar",["Aprender"]],["学生","學生","xuéshēng","Estudiante",["Alumno"]],["学习","學習","xuéxí","Estudiar",["Aprender"]],["学校","學校","xuéxiào","Escuela",["Centro educativo"]],["学院","學院","xuéyuàn","Facultad",["Institución"]],["要",null,"yào","Querer",["Necesitar"]],["爷爷","爺爺","yéye","Abuelo paterno",["Anciano"]],["也",null,"yě","También",["Igualmente"]],["页","頁","yè","Página",["Hoja"]],["一",null,"yī","Uno",["Numeral"]],["衣服",null,"yīfu","Ropa",["Vestimenta"]],["医生","醫生","yīshēng","Médico",["Profesional"]],["医院","醫院","yīyuàn","Hospital",["Clínica"]],["一半",null,"yībàn","Mitad",["Porción"]],["一会儿","一會兒","yīhuìr","Un momento",["Corto tiempo"]],["一块儿","一塊兒","yīkuàir","Juntos",["Simultáneamente"]],["一下儿","一下兒","yīxiàr","Un poco",["Rápidamente"]],["一样","一樣","yīyàng","Igual",["Semejante"]],["一边","一邊","yībiān","Lado",["Mientras"]],["一点儿","一點兒","yīdiǎnr","Un poco",["Ligeramente"]],["一起",null,"yīqǐ","Juntos",["Simultáneamente"]],["一些",null,"yīxiē","Algunos",["Varios"]],["用",null,"yòng","Usar",["Emplear"]],["有",null,"yǒu","Tener",["Existir"]],["有的",null,"yǒude","Algunos",["Ciertos"]],["有名",null,"yǒumíng","Famoso",["Célebre"]],["有时候","有時候","yǒushíhou","A veces",null],["有些",null,"yǒu(yī)xiē","Algunos",["Un poco","Algo"]],["有用",null,"yǒuyòng","Ser útil",["Servir"]],["右",null,"yòu","Derecha",["Lado"]],["右边","右邊","yòubian","Lado derecho",["Oriente"]],["雨",null,"yǔ","Lluvia",["Precipitación"]],["元",null,"yuán","Yuan",["Moneda"]],["远","遠","yuǎn","Lejano",["Distante"]],["月",null,"yuè","Mes",["Luna"]],["再",null,"zài","Otra vez",["Nuevamente"]],["再见","再見","zàijiàn","Despedirse",["Hasta luego"]],["在",null,"zài","Estar",["En"]],["在家",null,"zàijiā","Estar en casa",["Permanecer"]],["早",null,"zǎo","Temprano",["Matutino"]],["早饭","早飯","zǎofàn","Desayuno",["Comida matutina"]],["早上",null,"zǎoshang","Mañana",["Temprano"]],["怎么","怎麼","zěnme","Cómo",["Por qué"]],["站",null,"zhàn","Parada",["Estación"]],["找",null,"zhǎo","Buscar",["Encontrar"]],["找到",null,"zhǎodào","Encontrar",["Descubrir"]],["这","這","zhè","Este",["Aquí"]],["这边","這邊","zhèbiān","Este lado",["Por aquí"]],["这里","這裡","zhèlǐ","Aquí",["En este lugar"]],["这儿","這兒","zhèr","Aquí",["En este sitio"]],["这些","這些","zhèxiē","Estos",null],["着","著","zhe","(partícula)",["(auxiliar)"]],["真",null,"zhēn","Real",["Verdadero"]],["真的",null,"zhēn de","Realmente",["En verdad"]],["正",null,"zhèng","Justo",["Precisamente"]],["正在",null,"zhèngzài","En proceso",["Actualmente"]],["知道",null,"zhīdào","Saber",["Conocer"]],["知识","知識","zhīshi","Conocimiento",["Saber"]],["中",null,"zhōng","Centro",["Medio"]],["中国","中國","Zhōngguó","China",["País"]],["中间","中間","zhōngjiān","Medio",["Entre"]],["中文",null,"Zhōngwén","Chino",["Idioma"]],["中午",null,"zhōngwǔ","Mediodía",null],["中学","中學","zhōngxué","Escuela secundaria",["Instituto"]],["中学生","中學生","zhōngxuéshēng","Estudiante secundario",["Adolescente"]],["重",null,"zhòng","Pesado",["Importante"]],["重要",null,"zhòngyào","Importante",["Crucial"]],["住",null,"zhù","Vivir",["Habitar"]],["准备","準備","zhǔnbèi","Preparar",["Planear"]],["桌子",null,"zhuōzi","Mesa",["Escritorio"]],["字",null,"zì","Carácter",["Letra"]],["子",null,"zi (zhuōzi)","(sufijo)",["Diminutivo"]],["走",null,"zǒu","Caminar",["Ir"]],["走路",null,"zǒulù","Caminar",["Andar"]],["最",null,"zuì","Más",null],["最好",null,"zuìhǎo","Lo mejor",null],["最后","最後","zuìhòu","Final",["Último"]],["昨天",null,"zuótiān","Ayer",null],["左",null,"zuǒ","Izquierda",null],["左边","左邊","zuǒbian","Lado izquierdo",["Izquierda"]],["坐",null,"zuò","Sentarse",["Sentar"]],["坐下",null,"zuò xia","Sentarse",["Sentar"]],["做",null,"zuò","Hacer",null]],
'HSK2': [["啊",null,"a","Interjección",["Oh"]],["爱情","愛情","àiqíng","Amor",["Afecto"]],["爱人","愛人","àiren","Pareja",["Cónyuge"]],["安静","安靜","ānjìng","Tranquilo",["Silencioso"]],["安全",null,"ānquán","Seguro",["Seguridad"]],["白色",null,"báisè","Blanco",null],["班长","班長","bānzhǎng","Delegado",["Monitor"]],["办","辦","bàn","Gestionar",["Tramitar"]],["办法","辦法","bànfǎ","Método",["Solución"]],["办公室","辦公室","bàngōngshì","Oficina",["Despacho"]],["半夜",null,"bànyè","Medianoche",["Noche"]],["帮助","幫助","bāngzhù","Ayudar",["Auxiliar"]],["饱","飽","bǎo","Lleno",["Saciado"]],["报名","報名","bàomíng","Inscribirse",["Anotarse"]],["报纸","報紙","bàozhǐ","Periódico",["Diario"]],["北方",null,"běifāng","Norte",null],["背",null,"bèi","Cargar",["Llevar"]],["比如",null,"bǐrú","Por ejemplo",["Tal como"]],["比如说","比如說","bǐrú shuō","Por ejemplo",["Tal como"]],["笔","筆","bǐ","Bolígrafo",["Lápiz"]],["笔记","筆記","bǐjì","Apuntes",["Notas"]],["笔记本","筆記本","bǐjìběn","Cuaderno",["Libreta"]],["必须","必須","bìxū","Deber",["Necesitar"]],["边","邊","biān","Lado",["Orilla"]],["变","變","biàn","Cambiar",["Convertir"]],["变成","變成","biànchéng","Convertirse en",["Transformarse"]],["遍",null,"biàn","Vez",null],["表",null,"biǎo","Superficie",["Tabla"]],["表示",null,"biǎoshì","Expresar",["Mostrar"]],["不错","不錯","bùcuò","Bueno",["Correcto"]],["不但",null,"bùdàn","No solo",["No únicamente"]],["不够","不夠","bùgòu","No suficiente",["Insuficiente"]],["不过","不過","bùguò","Pero",["Sin embargo"]],["不太",null,"bù tài","No muy",["Relativamente"]],["不要",null,"bùyào","No",["Prohibido"]],["不好意思",null,"bù hǎoyìsi","Disculpe",["Perdón"]],["不久",null,"bùjiǔ","Pronto",["Próximamente"]],["不满","不滿","bùmǎn","Insatisfecho",["Molesto"]],["不如",null,"bùrú","No tan bueno como",["Inferior"]],["不少",null,"bù shǎo","Bastante",["Mucho"]],["不同",null,"bù tóng","Diferente",["Distinto"]],["不行",null,"bùxíng","No poder",["Imposible"]],["不一定",null,"bùyīdìng","No necesariamente",["Quizás"]],["不一会儿","不一會兒","bù yīhuìr","En un momento",["Rápidamente"]],["部分",null,"bùfen","Parte",["Porción"]],["才",null,"cái","Solo",["Recién"]],["菜单","菜單","càidān","Menú",["Carta"]],["参观","參觀","cānguān","Visitar",["Revisar"]],["参加","參加","cānjiā","Participar",["Asistir"]],["草",null,"cǎo","Hierba",["Planta"]],["草地",null,"cǎodì","Prado",["Cesped"]],["层","層","céng","Piso",["Nivel"]],["查",null,"chá","Buscar",["Investigar"]],["差不多",null,"chàbuduō","Casi",["Aproximadamente"]],["长","長","cháng","Largo",null],["常见","常見","cháng jiàn","Común",["Frecuente"]],["常用",null,"cháng yòng","Común",["Usado"]],["场","場","chǎng","Evento",["Partido"]],["超过","超過","chāoguò","Superar",["Pasar"]],["超市",null,"chāoshì","Supermercado",["Market"]],["车辆","車輛","chēliàng","Vehículo",["Coche"]],["称","稱","chēng","Llamar",["Pesar","Nombrar"]],["成",null,"chéng","Formar",["Convertir"]],["成绩","成績","chéngjì","Nota",["Calificación"]],["成为","成為","chéngwéi","Convertirse en",["Ser"]],["重复","重複","chóngfù","Repetir",["Volver"]],["重新",null,"chóngxīn","Nuevamente",["De nuevo"]],["出发","出發","chūfā","Partir",["Salir"]],["出国","出國","chūguó","Salir del país",["Emigrar"]],["出口",null,"chūkǒu","Salida",["Puerta de salida"]],["出门","出門","chūmén","Salir",["Irse"]],["出生",null,"chūshēng","Nacer",["Nacimiento"]],["出现","出現","chūxiàn","Aparecer",["Surgir"]],["出院",null,"chūyuàn","Dar de alta",["Salir"]],["出租",null,"chūzū","Alquilar",["Arrendar"]],["出租车","出租車","chūzūchē","Taxi",["Coche"]],["船",null,"chuán","Barco",["Embarcación"]],["吹",null,"chuī","Soplar",["Viento"]],["春节","春節","Chūnjié","Año nuevo chino",["Fiesta"]],["春天",null,"chūntiān","Primavera",["Estación"]],["词","詞","cí","Palabra",["Término"]],["词典","詞典","cídiǎn","Diccionario",["Lexicón"]],["词语","詞語","cíyǔ","Término",["Expresión"]],["从小","從小","cóngxiǎo","Desde niño",["Desde pequeño"]],["答应","答應","dāying","Aceptar",["Prometer"]],["打工",null,"dǎgōng","Trabajar",["Emplearse"]],["打算",null,"dǎsuàn","Planear",["Proyectar"]],["打印",null,"dǎyìn","Imprimir",["Imponer"]],["大部分",null,"dàbùfen","Mayoría",["Casi todos"]],["大大",null,"dàdà","Mucho",["Significativamente"]],["大多数","大多數","dàduōshù","Mayoría",["Casi todos"]],["大海",null,"dàhǎi","Mar",["Océano"]],["大家",null,"dàjiā","Todos",["Gente"]],["大量",null,"dàliàng","Gran cantidad",["Mucho"]],["大门","大門","dàmén","Puerta principal",["Entrada"]],["大人",null,"dàren","Adulto",["Persona"]],["大声","大聲","dà shēng","En voz alta",["Grande"]],["大小",null,"dàxiǎo","Tamaño",["Medida"]],["大衣",null,"dàyī","Abrigo",["Chubasquero"]],["大自然",null,"dàzìrán","Naturaleza",["Medio ambiente"]],["带","帶","dài","Llevar",["Trasportar"]],["带来","帶來","dàilái","Traer",["Llevar"]],["单位","單位","dānwèi","Organización",["Institución"]],["但",null,"dàn","Pero",["Sin embargo"]],["但是",null,"dànshì","Pero",["Sin embargo"]],["蛋",null,"dàn","Huevo",null],["当","當","dāng","Cuando",["Mientras"]],["当时","當時","dāngshí","En ese momento",["Entonces"]],["倒",null,"dǎo","Volcar",["Girar"]],["到处","到處","dàochù","En todas partes",["Por todas partes"]],["道",null,"dào","Camino",["Vía"]],["道理",null,"dàolǐ","Razón",["Principio"]],["道路",null,"dàolù","Camino",["Calzada"]],["得",null,"dé","Obtener/conseguir",["Lograr","Consigui"]],["得出",null,"déchū","Deducir/concluir",["Inferir"]],["的话","的話","dehuà","Si",["En caso de que"]],["灯","燈","dēng","Lámpara",["Bombilla"]],["等到",null,"děngdào","Cuando",["Al llegar"]],["等于","等於","děngyú","Equivaler a",["Ser igual a"]],["低",null,"dī","Bajo",["Deprimir"]],["地球",null,"dìqiú","Tierra",["Planeta"]],["地铁","地鐵","dìtiě","Metro",["Subterráneo"]],["地铁站","地鐵站","dìtiězhàn","Estación de metro",["Parada"]],["点头","點頭","diǎntóu","Asentir",["Asentir con la cabeza"]],["店",null,"diàn","Tienda",["Negocio"]],["掉",null,"diào","Caer/eliminar",["Perder"]],["东北","東北","dōngběi","Noreste",["Región"]],["东方","東方","dōngfāng","Oriente",["Este"]],["东南","東南","dōngnán","Sureste",["Región"]],["冬天",null,"dōngtiān","Invierno",["Estación"]],["懂",null,"dǒng","Entender",["Comprender"]],["懂得",null,"dǒngde","Saber",["Conocer"]],["动物","動物","dòngwù","Animal",["Ser vivo"]],["动物园","動物園","dòngwùyuán","Zoológico",["Parque"]],["读音","讀音","dúyīn","Pronunciación",["Fonética"]],["度",null,"dù","Grado",["Medida"]],["短",null,"duǎn","Corto",["Breve"]],["短信",null,"duǎnxìn","Mensaje de texto",["SMS"]],["段",null,"duàn","Tramo",["Sección"]],["队","隊","duì","Equipo",["Grupo"]],["队长","隊長","duìzhǎng","Capitán",["Jefe"]],["对话","對話","duìhuà","Conversar/diálogo",["Charlar"]],["对面","對面","duìmiàn","Enfrente",["Frente"]],["多久",null,"duōjiǔ","Cuánto tiempo",["Qué tiempo"]],["多么","多麼","duōme","Qué",["Cuán"]],["多数","多數","duōshù","Mayoría",["Gran parte"]],["多云","多雲","duōyún","Nublado",["Cubierto"]],["而且",null,"érqiě","Además",["Y además"]],["发","發","fā","Enviar/empezar",["Publicar"]],["发现","發現","fāxiàn","Descubrir",["Notar"]],["饭馆","飯館","fànguǎn","Restaurante",["Comedor"]],["方便",null,"fāngbiàn","Conveniente",["Práctico"]],["方便面","方便麵","fāngbiànmiàn","Fideos instantáneos",["Tallarines"]],["方法",null,"fāngfǎ","Método",["Forma"]],["方面",null,"fāngmiàn","Aspecto",["Campo"]],["方向",null,"fāngxiàng","Dirección",["Rumbo"]],["放下",null,"fàngxia","Dejar",["Soltar"]],["放心",null,"fàngxīn","Tranquilizarse",["No preocuparse"]],["分开","分開","fēnkāi","Separar",["Dividir"]],["分数","分數","fēnshù","Puntuación",["Nota"]],["分钟","分鐘","fēnzhōng","Minuto",["Hora"]],["份",null,"fèn","Porción",["Ración"]],["封",null,"fēng","Sobre",["Carta"]],["服务","服務","fúwù","Servir",["Atender"]],["复习","複習","fùxí","Repasar",["Estudiar"]],["该","該","gāi","Deber",["Tener que"]],["改",null,"gǎi","Cambiar",["Modificar"]],["改变","改變","gǎibiàn","Cambiar",["Transformar"]],["干杯","乾杯","gānbēi","Brindar",["Saludar"]],["感到",null,"gǎndào","Sentir",["Experimentar"]],["感动","感動","gǎndòng","Conmovido",["Emocionar"]],["感觉","感覺","gǎnjué","Sentir",["Sensación"]],["感谢","感謝","gǎnxiè","Agradecer",["Dar las gracias"]],["干活儿","幹活兒","gànhuór","Trabajar",["Labor"]],["刚","剛","gāng","Justo",["Apenas"]],["刚才","剛才","gāngcái","Hace un momento",["Ahora"]],["刚刚","剛剛","gānggāng","Justo ahora",["Hace poco"]],["高级","高級","gāojí","Avanzado",["Superior"]],["高中",null,"gāozhōng","Bachillerato",["Secundaria"]],["个子","個子","gèzi","Estatura",["Talla"]],["更",null,"gèng","Más",["Aún"]],["公共汽车","公共汽車","gōnggòng qìchē","Autobús",["Colectivo"]],["公交车","公交車","gōngjiāochē","Autobús",["Bus"]],["公斤",null,"gōngjīn","Kilogramo",["Kg"]],["公里",null,"gōnglǐ","Kilómetro",["Km"]],["公路",null,"gōnglù","Carretera",["Ruta"]],["公平",null,"gōngpíng","Justo",["Imparcial"]],["公司",null,"gōngsī","Empresa",["Corporación"]],["公园","公園","gōngyuán","Parque",["Jardín"]],["狗",null,"gǒu","Perro",["Can"]],["够","夠","gòu","Ser suficiente",["Bastante"]],["故事",null,"gùshi","Historia",["Cuento"]],["故意",null,"gùyì","Intencionalmente",["A propósito"]],["顾客","顧客","gùkè","Cliente",["Comprador"]],["关机","關機","guānjī","Apagar",["Desconectar"]],["关心","關心","guānxīn","Preocuparse",["Importar"]],["观点","觀點","guāndiǎn","Punto de vista",["Opinión"]],["广场","廣場","guǎngchǎng","Plaza",["Espacio"]],["广告","廣告","guǎnggào","Publicidad",["Anuncio"]],["国际","國際","guójì","Internacional",["Mundial"]],["过来","過來","guòlái","Venir",["Acercarse"]],["过年","過年","guònián","Celebrar el año nuevo",["Fiesta"]],["过去","過去","guòqù","Pasado",["Antes","Ir"]],["海",null,"hǎi","Mar",["Océano"]],["海边","海邊","hǎi biān","Orilla",["Playa"]],["喊",null,"hǎn","Gritar",["Vociferar"]],["好处","好處","hǎochù","Beneficio",["Ventaja"]],["好多",null,"hǎoduō","Mucho",["Numeroso"]],["好久",null,"hǎojiǔ","Mucho tiempo",["Largo"]],["好人",null,"hǎorén","Buena persona",["Bondadoso"]],["好事",null,"hǎoshì","Buena acción",["Suerte"]],["好像",null,"hǎoxiàng","Parecer",["Como si"]],["合适","合適","héshì","Adecuado",["Conveniente"]],["河",null,"hé","Río",["Corriente"]],["黑",null,"hēi","Negro",["Oscuro"]],["黑板",null,"hēibǎn","Pizarra",["Tablero"]],["黑色",null,"hēisè","Negro",["Color"]],["红","紅","hóng","Rojo",["Colorido"]],["红色","紅色","hóngsè","Rojo",["Color"]],["后来","後來","hòulái","Después",["Luego"]],["忽然",null,"hūrán","De repente",["Súbitamente"]],["湖",null,"hú","Lago",["Estanque"]],["护照","護照","hùzhào","Pasaporte",["Documento"]],["花园","花園","huāyuán","Jardín",["Parque"]],["画","畫","huà","Dibujar",["Pintar"]],["画家","畫家","huàjiā","Pintor",["Artista"]],["画儿","畫兒","huàr","Dibujo",["Cuadro"]],["坏处","壞處","huàichù","Daño",["Perjuicio"]],["坏人","壞人","huàirén","Mala persona",["Villano"]],["欢迎","歡迎","huānyíng","Recibir",["Acoger"]],["换","換","huàn","Cambiar",["Intercambiar"]],["黄","黃","huáng","Amarillo",["Color"]],["黄色","黃色","huángsè","Amarillo",["Color"]],["回国","回國","huí guó","Volver al país",["Regresar"]],["活动","活動","huódòng","Actividad",["Evento"]],["或",null,"huò","O",null],["或者",null,"huòzhě","O bien",["Tal vez"]],["机会","機會","jīhuì","Oportunidad",["Ocasión"]],["鸡","雞","jī","Pollo",["Gallo"]],["级","級","jí","Nivel",["Grado"]],["急",null,"jí","Apurado",["Urgente"]],["计划","計劃","jìhuà","Planificar",["Proyecto"]],["计算机","計算機","jìsuànjī","Computadora",["Ordenador"]],["加",null,"jiā","Sumar",["Agregar"]],["加油",null,"jiāyóu","Animar",["Esfuerzo"]],["家庭",null,"jiātíng","Familia",["Hogar"]],["家长","家長","jiāzhǎng","Padres",["Tutor"]],["假",null,"jiǎ","Falso",["Vacaciones"]],["假期",null,"jiàqī","Vacaciones",["Descanso"]],["检查","檢查","jiǎnchá","Revisar",["Control"]],["见到","見到","jiàndào","Ver",["Encontrarse"]],["见过","見過","jiànguo","Haber visto",["Conocer"]],["件",null,"jiàn","Pieza",["Asunto"]],["健康",null,"jiànkāng","Salud",["Sano"]],["讲","講","jiǎng","Contar",["Explicar"]],["讲话","講話","jiǎnghuà","Hablar",["Discurso"]],["交",null,"jiāo","Entregar",["Cruzar"]],["交给","交給","jiāo gěi","Entregar a",["Pasar"]],["交朋友",null,"jiāo péngyou","Hacer amigos",["Ligar"]],["交通",null,"jiāotōng","Transporte",["Tránsito"]],["角",null,"jiǎo","Esquina",["Ángulo"]],["角度",null,"jiǎodù","Perspectiva",["Ángulo"]],["饺子","餃子","jiǎozi","Ravioles",["Empanadita"]],["脚","腳","jiǎo","Pie",["Pata"]],["叫作",null,"jiàozuò","Llamarse",["Denominar"]],["教师","教師","jiàoshī","Profesor",["Maestro"]],["教室",null,"jiàoshì","Aula",["Salón"]],["教学","教學","jiàoxué","Enseñanza",["Pedagogía"]],["教育",null,"jiàoyù","Educar",["Instrucción"]],["接",null,"jiē","Recibir",["Recoger"]],["接到",null,"jiēdào","Recibir",["Llegar"]],["接受",null,"jiēshòu","Aceptar",["Recibir"]],["接下来","接下來","jiē xiàlái","Después",["Luego"]],["接着","接著","jiēzhe","Continuar",["Seguidamente"]],["街",null,"jiē","Calle",["Callejón"]],["节","節","jié","Sección",["Fiesta"]],["节目","節目","jiémù","Programa",["Espectáculo"]],["节日","節日","jiérì","Festividad",["Celebración"]],["结果","結果","jiéguǒ","Resultado",["Por lo tanto"]],["借",null,"jiè","Prestar",["Pedir"]],["斤",null,"jīn","Jin (medida)",["Libra"]],["今后","今後","jīnhòu","De ahora en adelante",["Futuro"]],["进入","進入","jìnrù","Entrar",["Acceder"]],["进行","進行","jìnxíng","Realizar",["Llevar a cabo"]],["近",null,"jìn","Cerca",["Próximo"]],["经常","經常","jīngcháng","A menudo",["Usualmente"]],["经过","經過","jīngguò","Pasar",["Experimentar"]],["经理","經理","jīnglǐ","Gerente",["Director"]],["酒",null,"jiǔ","Alcohol",["Bebida"]],["酒店",null,"jiǔdiàn","Hotel",["Posada"]],["就要",null,"jiùyào","A punto de",["Próximo"]],["举","舉","jǔ","Levantar",["Mencionar"]],["举手","舉手","jǔshǒu","Levantar la mano",["Votar"]],["举行","舉行","jǔxíng","Celebrar",["Organizar"]],["句",null,"jù","Frase",["Oración"]],["句子",null,"jùzi","Oración",["Frase"]],["卡",null,"kǎ","Tarjeta",["Atasco"]],["开机","開機","kāijī","Encender",["Arrancar"]],["开心","開心","kāixīn","Feliz",["Alegrar"]],["开学","開學","kāixué","Iniciar clases",["Volver a clase"]],["看法",null,"kànfǎ","Opinión",["Punto de vista"]],["考生",null,"kǎoshēng","Examinado",["Postulante"]],["靠",null,"kào","Depender",["Apoyar"]],["科",null,"kē","Materia",["Rama"]],["科学","科學","kēxué","Ciencia",["Científico"]],["可爱","可愛","kě'ài","Adorable",["Tierno"]],["可能",null,"kěnéng","Posible",["Quizás"]],["可怕",null,"kěpà","Terrible",["Aterrador"]],["可是",null,"kěshì","Pero",["Sin embargo"]],["可以",null,"kěyǐ","Poder",["Permitir"]],["克",null,"kè","Gramo",["Quilo"]],["刻",null,"kè","Momento",["Cuarto"]],["客人",null,"kèrén","Invitado",["Huésped"]],["课堂","課堂","kètáng","Clase",["Aula"]],["空气","空氣","kōngqì","Aire",["Ambiente"]],["哭",null,"kū","Llorar",["Sollozar"]],["快餐",null,"kuàicān","Comida rápida",["Fast food"]],["快点儿","快點兒","kuài diǎnr","Rápido",["Aprisa"]],["快乐","快樂","kuàilè","Feliz",["Contento"]],["快要",null,"kuàiyào","A punto de",["Casi"]],["筷子",null,"kuàizi","Palillos",["Tenedores"]],["拉",null,"lā","Tirar",["Jalar"]],["来自","來自","láizì","Venir de",["Proceder"]],["蓝","藍","lán","Azul",["Celeste"]],["蓝色","藍色","lánsè","Azul",["Color azul"]],["篮球","籃球","lánqiú","Baloncesto",["Canasta"]],["老年",null,"lǎonián","Vejez",["Ancianidad"]],["老朋友",null,"lǎo péngyou","Viejo amigo",["Conocido"]],["老是",null,"lǎoshì","Siempre",["Constantemente"]],["离","離","lí","Alejarse",["Distancia"]],["离开","離開","líkāi","Irse",["Abandonar"]],["礼物","禮物","lǐwù","Regalo",["Presente"]],["里头","裡頭","lǐtou","Dentro",["Adentro"]],["理想",null,"lǐxiǎng","Ideal",["Aspiración"]],["例如",null,"lìrú","Por ejemplo",["Como"]],["例子",null,"lìzi","Ejemplo",["Caso"]],["脸","臉","liǎn","Cara",["Rostro"]],["练","練","liàn","Practicar",["Ejercitar"]],["练习","練習","liànxí","Practicar",["Ejercicio"]],["凉","涼","liáng","Fresco",["Frío"]],["凉快","涼快","liángkuai","Fresco",["Agradable"]],["亮",null,"liàng","Brillar",["Claro"]],["辆","輛","liàng","Vehículo",["Unidad"]],["零下",null,"líng xià","Bajo cero",["Congelado"]],["留",null,"liú","Quedarse",["Dejar"]],["留下",null,"liúxia","Dejar",["Quedar"]],["留学生","留學生","liúxuéshēng","Estudiante extranjero",["Intercambio"]],["流",null,"liú","Fluir",["Corriente"]],["流利",null,"liúlì","Fluido",["Elocuente"]],["流行",null,"liúxíng","Moda",["Popular"]],["路边","路邊","lù biān","Borde de la calle",["Acera"]],["旅客",null,"lǚkè","Pasajero",["Viajero"]],["旅行",null,"lǚxíng","Viajar",["Excursionar"]],["旅游","旅遊","lǚyóu","Turismo",["Viajar"]],["绿","綠","lǜ","Verde",["Colorido"]],["绿色","綠色","lǜsè","Color verde",["Tono verde"]],["卖","賣","mài","Vender",["Comercializar"]],["满","滿","mǎn","Lleno",["Completo"]],["满意","滿意","mǎnyì","Estar satisfecho",["Contentarse"]],["猫","貓","māo","Gato",["Felino"]],["米",null,"mǐ","Arroz",["Grano"]],["面",null,"miàn","Fideos",["Cara","Cara y fideos"]],["面前",null,"miànqián","Frente a",["Delante de"]],["名",null,"míng","Nombre",["Fama"]],["名称","名稱","míngchēng","Nombre",["Denominación"]],["名单","名單","míngdān","Lista",["Nómina"]],["明星",null,"míngxīng","Celebridad",["Estrella"]],["目的",null,"mùdì","Propósito",["Meta"]],["拿出",null,"náchū","Sacar",["Presentar"]],["拿到",null,"nádào","Obtener",["Conseguir"]],["那会儿","那會兒","nàhuìr","Aquel entonces",["En aquel momento"]],["那么","那麼","nàme","Entonces",["Así"]],["那时候","那時候","nà shíhou","En aquel entonces",["Por entonces"]],["那样","那樣","nàyàng","Así",["De esa manera"]],["南方",null,"nánfāng","Sur",["Región meridional"]],["难过","難過","nánguò","Triste",["Apenado"]],["难看","難看","nánkàn","Feo",["Desagradable"]],["难受","難受","nánshòu","Incómodo",["Molesto"]],["难题","難題","nántí","Problema difícil",["Desafío"]],["难听","難聽","nántīng","Desagradable al oído",["Vulgar"]],["能够","能夠","nénggòu","Poder",["Ser capaz"]],["年级","年級","niánjí","Grado",["Curso"]],["年轻","年輕","niánqīng","Joven",["Juvenil"]],["鸟","鳥","niǎo","Pájaro",["Ave"]],["弄",null,"nòng","Hacer",["Arreglar"]],["努力",null,"nǔlì","Esforzarse",["Trabajar duro"]],["爬",null,"pá","Trepar",["Arrastrarse"]],["爬山",null,"pá shān","Escalar montañas",["Hacer senderismo"]],["怕",null,"pà","Tener miedo",["Temer"]],["排",null,"pái","Fila",["Línea"]],["排队","排隊","páiduì","Hacer fila",["Formarse"]],["排球",null,"páiqiú","Voleibol",["Deporte"]],["碰",null,"pèng","Chocar",["Encontrar"]],["碰到",null,"pèngdào","Encontrarse",["Tropezar"]],["碰见","碰見","pèngjiàn","Encontrarse",["Topar con"]],["篇",null,"piān","Artículo",["Escrito"]],["便宜",null,"piányi","Barato",["Económico"]],["片",null,"piàn","Trozo",["Película"]],["漂亮",null,"piàoliang","Hermoso",["Guapo"]],["平",null,"píng","Plano",["Tranquilo"]],["平安",null,"píng'ān","Seguro",["En paz"]],["平常",null,"píngcháng","Normal",["Corriente"]],["平等",null,"píngděng","Igual",["Equitativo"]],["平时","平時","píngshí","Normalmente",["Habitualmente"]],["瓶",null,"píng","Botella",["Frasco"]],["瓶子",null,"píngzi","Botella",["Recipiente"]],["普通",null,"pǔtōng","Común",["Ordinario"]],["普通话","普通話","pǔtōnghuà","Mandarín",["Idioma oficial"]],["其他",null,"qítā","Otros",["Demás"]],["其中",null,"qízhōng","Entre ellos",["De los cuales"]],["骑","騎","qí","Montar",["Conducir"]],["骑车","騎車","qí chē","Montar bicicleta",["Usar bicicleta"]],["起飞","起飛","qǐfēi","Despegar",["Iniciar vuelo"]],["气","氣","qì","Aire",["Enojo"]],["气温","氣溫","qìwēn","Temperatura",["Calor"]],["千",null,"qiān","Mil",["Millar"]],["千克",null,"qiānkè","Kilogramo",["Kg"]],["前年",null,"qiánnián","El año pasado",["Año anterior"]],["墙","牆","qiáng","Pared",["Muro"]],["青年",null,"qīngnián","Joven",["Adolescente"]],["青少年",null,"qīng-shàonián","Joven",["Adolescente"]],["轻","輕","qīng","Ligero",["Suave"]],["清楚",null,"qīngchu","Claro",["Distinto"]],["晴",null,"qíng","Despejado",["Soleado"]],["晴天",null,"qíngtiān","Día soleado",["Tiempo bueno"]],["请客","請客","qǐngkè","Invitar",["Pagar un banquete"]],["请求","請求","qǐngqiú","Pedir",["Solicitar"]],["秋天",null,"qiūtiān","Otoño",["Estación"]],["求",null,"qiú","Buscar",["Pedir"]],["球场","球場","qiúchǎng","Cancha",["Campo"]],["球队","球隊","qiúduì","Equipo",["Conjunto"]],["球鞋",null,"qiúxié","Zapatillas",["Calzado deportivo"]],["取",null,"qǔ","Tomar",["Recoger"]],["取得",null,"qǔdé","Obtener",["Lograr"]],["全",null,"quán","Todo",["Completo"]],["全部",null,"quánbù","Todo",["Entero"]],["全国","全國","quánguó","País",["Nación"]],["全家",null,"quánjiā","Familia",["Hogar"]],["全年",null,"quánnián","Año entero",["Todo el año"]],["全身",null,"quánshēn","Cuerpo",["Todo el cuerpo"]],["全体","全體","quántǐ","Todos",["Conjunto"]],["然后","然後","ránhòu","Luego",["Después"]],["让","讓","ràng","Dejar",["Permitir"]],["热情","熱情","rèqíng","Entusiasmo",["Cálido"]],["人口",null,"rénkǒu","Población",["Habitantes"]],["人们","人們","rénmen","Gente",["Personas"]],["人数","人數","rénshù","Número de personas",["Cantidad"]],["认为","認為","rènwéi","Pensar",["Considerar"]],["日报","日報","rìbào","Periódico",["Diario"]],["日子",null,"rìzi","Día",["Vida"]],["如果",null,"rúguǒ","Si",["En caso de"]],["入口",null,"rùkǒu","Entrada",["Acceso"]],["商量",null,"shāngliang","Discutir",["Consultar"]],["商人",null,"shāngrén","Comerciante",["Empresario"]],["上周",null,"shàng zhōu","La semana pasada",["Semana anterior"]],["少数","少數","shǎoshù","Minoría",["Escaso"]],["少年",null,"shàonián","Adolescente",["Joven"]],["身边","身邊","shēnbiān","Alrededor",["Cerca"]],["什么样","什麼樣","shénmeyàng","Qué tipo",["Cómo"]],["生",null,"shēng","Nacer",["Crío"]],["生词","生詞","shēngcí","Palabra nueva",["Vocabulario"]],["生活",null,"shēnghuó","Vida",["Vivir"]],["声音","聲音","shēngyīn","Voz",["Sonido"]],["省",null,"shěng","Provincia",["Región"]],["十分",null,"shífēn","Muy",["Totalmente"]],["实际","實際","shíjì","Real",["Práctico"]],["实习","實習","shíxí","Practicar",["Hacer prácticas"]],["实现","實現","shíxiàn","Lograr",["Cumplir"]],["实在","實在","shízài","Realmente",["En verdad"]],["食物",null,"shíwù","Comida",["Alimento"]],["使用",null,"shǐyòng","Usar",["Emplear"]],["市",null,"shì","Ciudad",["Municipio"]],["市长","市長","shìzhǎng","Alcalde",["Intendente"]],["事情",null,"shìqing","Cosa asunto",["Asunto"]],["收",null,"shōu","Recibir",["Recoger"]],["收到",null,"shōudào","Recibir",["Obtener"]],["收入",null,"shōurù","Ganar/ingreso",null],["手表","手錶","shǒubiǎo","Reloj",null],["受到",null,"shòudào","Recibir",null],["舒服",null,"shūfu","Cómodo",null],["熟",null,"shú/shóu","Cocido/conocido",null],["数","數","shǔ","Contar",null],["数字","數字","shùzì","Número",null],["水平",null,"shuǐpíng","Nivel",null],["顺利","順利","shùnlì","Exitoso",null],["说明","說明","shuōmíng","Explicar/nota",null],["司机","司機","sījī","Conductor",null],["送到",null,"sòngdào","Entregar",null],["送给","送給","sòng gěi","Regalar",null],["算",null,"suàn","Calcular",null],["虽然","雖然","suīrán","Aunque",null],["随便","隨便","suíbiàn","Casual",null],["随时","隨時","suíshí","En cualquier momento",null],["所以",null,"suǒyǐ","Por eso",null],["所有",null,"suǒyǒu","Todo",null],["它",null,"tā","Él/ella",null],["它们","它們","tāmen","Ellos/ellas",null],["太太",null,"tàitai","Señora",null],["太阳","太陽","tàiyáng","Sol",null],["态度","態度","tàidù","Actitud",null],["讨论","討論","tǎolùn","Discutir",null],["套",null,"tào","Juego/serie",null],["特别","特別","tèbié","Especial",null],["特点","特點","tèdiǎn","Característica",null],["疼",null,"téng","Doler",null],["提",null,"tí","Levantar",null],["提出",null,"tíchū","Proponer",null],["提到",null,"tídào","Mencionar",null],["提高",null,"tígāo","Mejorar",null],["题","題","tí","Pregunta",null],["体育","體育","tǐyù","Deporte",null],["体育场","體育場","tǐyùchǎng","Estadio",null],["体育馆","體育館","tǐyùguǎn","Gimnasio",null],["天上",null,"tiānshàng","Cielo",null],["条","條","tiáo","Barra/pieza",null],["条件","條件","tiáojiàn","Condición",null],["听讲","聽講","tīngjiǎng","Escuchar clase",null],["听说","聽說","tīngshuō","Oír decir",null],["停",null,"tíng","Parar",null],["停车","停車","tíngchē","Aparcar",null],["停车场","停車場","tíngchēchǎng","Estacionamiento",null],["挺",null,"tǐng","Bastante",null],["挺好",null,"tǐng hǎo","Bastante bueno",null],["通",null,"tōng","Pasar/comunicar",null],["通过","通過","tōngguò","A través de",null],["通知",null,"tōngzhī","Notificar/aviso",null],["同时","同時","tóngshí","Al mismo tiempo",null],["同事",null,"tóngshì","Compañero",null],["同样","同樣","tóngyàng","Igual",null],["头","頭","tóu","Cabeza",null],["头发","頭髮","tóufa","Pelo",null],["图片","圖片","túpiàn","Imagen",null],["推",null,"tuī","Empujar",null],["腿",null,"tuǐ","Pierna",null],["外地",null,"wàidì","Extranjero",null],["外卖","外賣","wàimài","Comida a domicilio",null],["完",null,"wán","Terminar",null],["完成",null,"wánchéng","Completar",null],["完全",null,"wánquán","Completamente",null],["晚安",null,"wǎn'ān","Buenas noches",null],["晚报","晚報","wǎnbào","Periódico vespertino",null],["晚餐",null,"wǎncān","Cena",null],["晚会","晚會","wǎnhuì","Fiesta",null],["碗",null,"wǎn","Cuenco",null],["万","萬","wàn","Diez mil",null],["网","網","wǎng","Red",null],["网球","網球","wǎngqiú","Tenis",null],["网站","網站","wǎngzhàn","Sitio web",null],["往",null,"wǎng","Hacia",null],["为","為","wèi","Para",null],["为什么","為什麼","wèi shénme","Por qué",null],["位",null,"wèi","Señor/señora",null],["味道",null,"wèidào","Sabor",null],["喂",null,"wèi","¿diga?",null],["温度","溫度","wēndù","Temperatura",null],["闻","聞","wén","Oler",null],["问路","問路","wènlù","Preguntar el camino",null],["问题","問題","wèntí","Problema",null],["午餐",null,"wǔcān","Almuerzo",null],["午睡",null,"wǔshuì","Siesta",["Descanso diurno"]],["西北",null,"xīběi","Noroeste",["Región noroeste"]],["西餐",null,"xīcān","Comida occidental",["Plato occidental"]],["西方",null,"xīfāng","Occidente",["Mundo occidental"]],["西南",null,"xīnán","Suroeste",["Región suroeste"]],["西医","西醫","xīyī","Medicina occidental",["Doctor occidental"]],["习惯","習慣","xíguàn","Costumbre/acostumbrar",null],["洗衣机","洗衣機","xǐyījī","Lavadora",null],["洗澡",null,"xǐzǎo","Bañarse",null],["下雪",null,"xià xuě","Nevar",["Precipitación de nieve"]],["下周","下週","xià zhōu","Próxima semana",null],["夏天",null,"xiàtiān","Verano",null],["相同",null,"xiāngtóng","Igual",null],["相信",null,"xiāngxìn","Creer",null],["响","響","xiǎng","Sonar",null],["想到",null,"xiǎngdào","Pensar en",null],["想法",null,"xiǎngfǎ","Idea",null],["想起",null,"xiǎngqǐ","Acordarse",null],["向",null,"xiàng","Hacia",null],["相机","相機","xiàngjī","Cámara",null],["像",null,"xiàng","Parecer",null],["小声","小聲","xiǎo shēng","En voz baja",null],["小时候","小時候","xiǎoshíhou","Infancia",null],["小说","小說","xiǎoshuō","Novela",null],["小心",null,"xiǎoxīn","Cuidado",null],["小组","小組","xiǎozǔ","Grupo",null],["校园","校園","xiàoyuán","Campus",null],["校长","校長","xiàozhǎng","Director",null],["笑话","笑話","xiàohua","Burlarse",null],["笑话儿","笑話兒","xiàohuar","Chiste",null],["鞋",null,"xié","Zapato",null],["心里","心裡","xīnlǐ","En el corazón",null],["心情",null,"xīnqíng","Estado de ánimo",null],["心中",null,"xīnzhōng","En el corazón",null],["新闻","新聞","xīnwén","Noticia",null],["信",null,"xìn","Carta",null],["信号","信號","xìnhào","Señal",null],["信息",null,"xìnxī","Información",["Datos"]],["信心",null,"xìnxīn","Confianza",["Fe"]],["信用卡",null,"xìnyòngkǎ","Tarjeta de crédito",null],["星星",null,"xīngxing","Estrella",null],["行动","行動","xíngdòng","Actuar/acción",null],["行人",null,"xíngrén","Peatón",null],["行为","行為","xíngwéi","Comportamiento",null],["姓",null,"xìng","Apellido/nombre de familia",null],["姓名",null,"xìngmíng","Nombre completo",null],["休假",null,"xiūjià","Tomar vacaciones",null],["许多","許多","xǔduō","Muchos",null],["选","選","xuǎn","Elegir",null],["学期","學期","xuéqī","Semestre",null],["雪",null,"xuě","Nieve",null],["颜色","顏色","yánsè","Color",null],["眼",null,"yǎn","Ojo/medida",null],["眼睛",null,"yǎnjing","Ojo",null],["养","養","yǎng","Criar/cuidar",null],["样子","樣子","yàngzi","Aspecto",null],["要求",null,"yāoqiú","Pedir/exigencia",null],["药","藥","yào","Medicina",null],["药店","藥店","yàodiàn","Farmacia",null],["药片","藥片","yàopiàn","Pastilla",null],["药水","藥水","yàoshuǐ","Líquido medicinal",null],["也许","也許","yěxǔ","Quizás",null],["夜",null,"yè","Noche",null],["夜里","夜裡","yèlǐ","Durante la noche",null],["一部分",null,"yī bùfen","Una parte",null],["一定",null,"yīdìng","Seguro/definitivamente",null],["一共",null,"yīgòng","En total",null],["一路平安",null,"yīlù-píng'ān","Buen viaje",null],["一路顺风","一路順風","yīlù-shùnfēng","Buen viaje",null],["已经","已經","yǐjīng","Ya",null],["以后","以後","yǐhòu","Después",null],["以前",null,"yǐqián","Antes",null],["以上",null,"yǐshàng","Arriba",null],["以外",null,"yǐwài","Fuera",null],["以为","以為","yǐwéi","Creer",null],["以下",null,"yǐxià","Abajo",null],["椅子",null,"yǐzi","Silla",null],["一般",null,"yībān","Común",null],["一点点","一點點","yī diǎndiǎn","Un poco",null],["一生",null,"yīshēng","Toda la vida",null],["一直",null,"yīzhí","Siempre",null],["亿","億","yì","Cien millones",null],["意见","意見","yìjiàn","Opinión",null],["意思",null,"yìsi","Significado",null],["因为","因為","yīnwèi","Porque",null],["阴","陰","yīn","Nublado",null],["阴天","陰天","yīntiān","Día nublado",null],["音节","音節","yīnjié","Sílaba",null],["音乐","音樂","yīnyuè","Música",null],["音乐会","音樂會","yīnyuèhuì","Concierto",null],["银行","銀行","yínháng","Banco",null],["银行卡","銀行卡","yínhángkǎ","Tarjeta bancaria",null],["应该","應該","yīnggāi","Deber",null],["英文",null,"Yīngwén","Inglés",null],["英语","英語","Yīngyǔ","Inglés",null],["影片",null,"yǐngpiàn","Película",null],["影响","影響","yǐngxiǎng","Influir/influencia",null],["永远","永遠","yǒngyuǎn","Para siempre",null],["油",null,"yóu","Aceite",null],["游客","遊客","yóukè","Turista",null],["友好",null,"yǒuhǎo","Amigable",null],["有空儿","有空兒","yǒukòngr","Tener tiempo",null],["有人",null,"yǒu rén","Alguien",null],["有点儿","有點兒","yǒu(yī)diǎnr","Un poco",null],["有意思",null,"yǒu yìsi","Interesante",null],["又",null,"yòu","Otra vez",null],["鱼","魚","yú","Pescado",null],["语言","語言","yǔyán","Idioma",null],["原来","原來","yuánlái","Resulta",null],["原因",null,"yuányīn","Razón",null],["院",null,"yuàn","Patio",null],["院长","院長","yuànzhǎng","Director",null],["院子",null,"yuànzi","Patio",null],["愿意","願意","yuànyì","Querer",null],["月份",null,"yuèfèn","Mes",null],["月亮",null,"yuèliang","Luna",null],["越",null,"yuè","Cuanto",null],["越来越","越來越","yuè lái yuè","Cada vez más",null],["云","雲","yún","Nube",null],["运动","運動","yùndòng","Hacer ejercicio/deporte",null],["咱",null,"zán","Yo",null],["咱们","咱們","zánmen","Nosotros",null],["脏","髒","zāng","Sucio",null],["早餐",null,"zǎocān","Desayuno",null],["早晨",null,"zǎochen","Mañana",null],["早就",null,"zǎo jiù","Hace mucho tiempo",null],["怎么办","怎麼辦","zěnme bàn","Qué hacer",null],["怎么样","怎麼樣","zěnmeyàng","Cómo",null],["怎样","怎樣","zěnyàng","Cómo",null],["占",null,"zhàn","Ocupar",null],["站住",null,"zhànzhù","¡detente!",null],["长大","長大","zhǎngdà","Crecer",null],["找出",null,"zhǎochū","Encontrar",null],["照顾","照顧","zhàogù","Cuidar",null],["照片",null,"zhàopiàn","Fotografía",null],["照相",null,"zhàoxiàng","Fotografiar",null],["这么","這麼","zhème","Tan",null],["这时候","這時候","zhè shíhou","En este momento",null],["这样","這樣","zhèyàng","Así",null],["真正",null,"zhēnzhèng","Verdadero",null],["正常",null,"zhèngcháng","Normal",null],["正好",null,"zhènghǎo","Justo",null],["正确","正確","zhèngquè","Correcto",null],["正是",null,"zhèngshì","Es precisamente",null],["直接",null,"zhíjiē","Directo",null],["只",null,"zhǐ","Solo",null],["只能",null,"zhǐ néng","Solo",null],["只要",null,"zhǐyào","Siempre que",null],["纸","紙","zhǐ","Papel",null],["中餐",null,"zhōngcān","Comida china",null],["中级","中級","zhōngjí","Intermedio",null],["中年",null,"zhōngnián","Edad mediana",null],["中小学","中小學","zhōng-xiǎoxué","Escuela primaria y secundaria",null],["中心",null,"zhōngxīn","Centro",null],["中医","中醫","zhōngyī","Medicina tradicional china",null],["重点","重點","zhòngdiǎn","Importante/enfatizar",null],["重视","重視","zhòngshì","Valorar",null],["周","週","zhōu","Semana",null],["周末","週末","zhōumò","Fin de semana",null],["周年","週年","zhōunián","Aniversario",null],["主人",null,"zhǔrén","Dueño",null],["主要",null,"zhǔyào","Principal",null],["住房",null,"zhùfáng","Vivienda",null],["住院",null,"zhùyuàn","Hospitalizarse",null],["装","裝","zhuāng","Instalar",null],["准确","準確","zhǔnquè","Preciso",null],["自己",null,"zìjǐ","Uno mismo",null],["自行车","自行車","zìxíngchē","Bicicleta",null],["自由",null,"zìyóu","Libertad",null],["字典",null,"zìdiǎn","Diccionario",null],["走过","走過","zǒuguò","Pasar por",null],["走进","走進","zǒujìn","Entrar en",null],["走开","走開","zǒukāi","Alejarse",null],["租",null,"zū","Alquilar",null],["组","組","zǔ","Formar",null],["组成","組成","zǔchéng","Componer",null],["组长","組長","zǔzhǎng","Jefe de grupo",null],["嘴",null,"zuǐ","Boca",null],["最近",null,"zuìjìn","Últimamente",null],["作家",null,"zuòjiā","Escritor",null],["作文",null,"zuòwén","Composición",null],["作业","作業","zuòyè","Tarea",null],["作用",null,"zuòyòng","Función",null],["座",null,"zuò","Asiento",null],["座位",null,"zuòwèi","Asiento",null],["做到",null,"zuòdào","Lograr",null],["做法",null,"zuòfǎ","Método",null],["做饭","做飯","zuòfàn","Cocinar",null]],
'HSK3': [["爱心","愛心","àixīn","Amor",null],["安排",null,"ānpái","Organizar",null],["安装","安裝","ānzhuāng","Instalar",null],["按",null,"àn","Presionar",null],["按照",null,"ànzhào","Según",null],["把",null,"bǎ","Tomar",null],["把握",null,"bǎwò","Controlar",null],["白菜",null,"báicài","Col china",null],["班级","班級","bānjí","Clase",null],["搬",null,"bān","Mudar",null],["搬家",null,"bānjiā","Mudarse",null],["板",null,"bǎn","Tabla",null],["办理","辦理","bànlǐ","Gestionar",null],["保",null,"bǎo","Mantener",null],["保安",null,"bǎo'ān","Guardia de seguridad",null],["保持",null,"bǎochí","Mantener",null],["保存",null,"bǎocún","Guardar",null],["保护","保護","bǎohù","Proteger",null],["保留",null,"bǎoliú","Conservar",null],["保险","保險","bǎoxiǎn","Seguro",null],["保证","保證","bǎozhèng","Garantizar",null],["报","報","bào","Periódico",null],["报到","報到","bàodào","Registrarse",null],["报道","報道","bàodào","Informar",null],["报告","報告","bàogào","Informar",null],["北部",null,"běibù","Norte",null],["背后","背後","bèihòu","Detrás",null],["被",null,"bèi","Por",null],["被子",null,"bèizi","Edredón",null],["本来","本來","běnlái","Originalmente",null],["本领","本領","běnlǐng","Habilidad",null],["本事",null,"běnshi","Talento",null],["比较","比較","bǐjiào","Comparar",null],["比例",null,"bǐlì","Proporción",null],["比赛","比賽","bǐsài","Competir",null],["必然",null,"bìrán","Inevitable",null],["必要",null,"bìyào","Necesario",null],["变化","變化","biànhuà","Cambiar",null],["变为","變為","biànwéi","Convertirse en",null],["标题","標題","biāotí","Título",null],["标准","標準","biāozhǔn","Estándar",null],["表达","表達","biǎodá","Expresar",["Manifestar"]],["表格",null,"biǎogé","Tabla",null],["表面",null,"biǎomiàn","Superficie",null],["表明",null,"biǎomíng","Demostrar",null],["表现","表現","biǎoxiàn","Manifestar",null],["表演",null,"biǎoyǎn","Actuar",null],["并","並","bìng","Y",null],["并且","並且","bìngqiě","Y además",null],["播出",null,"bōchū","Transmitir",null],["播放",null,"bōfàng","Reproducir",null],["不必",null,"bùbì","No es necesario",null],["不断","不斷","bùduàn","Constantemente",null],["不论","不論","bùlùn","Sin importar",null],["补","補","bǔ","Reponer",null],["补充","補充","bǔchōng","Complementar",null],["不安",null,"bù'ān","Inquieto",null],["不得不",null,"bùdébù","Tener que",null],["不光",null,"bùguāng","No solo",null],["不仅","不僅","bùjǐn","No solo",null],["布",null,"bù","Tela",null],["步",null,"bù","Paso",null],["部",null,"bù","Departamento",null],["部门","部門","bùmén","Departamento",null],["部长","部長","bùzhǎng","Ministro",null],["才能",null,"cáinéng","Talento",null],["采取","採取","cǎiqǔ","Adoptar",null],["采用","採用","cǎiyòng","Adoptar",null],["彩色",null,"cǎisè","Colorido",null],["曾经","曾經","céngjīng","Alguna vez",null],["产生","產生","chǎnshēng","Producir",null],["长城","長城","Chángchéng","Gran Muralla",null],["长处","長處","chángchù","Ventaja",null],["长期","長期","chángqī","A largo plazo",null],["厂","廠","chǎng","Fábrica",null],["场合","場合","chǎnghé","Ocasión",null],["场所","場所","chǎngsuǒ","Lugar",null],["超级","超級","chāojí","Super",null],["朝",null,"cháo","Hacia",null],["吵",null,"chǎo","Ruidoso",null],["吵架",null,"chǎojià","Discutir",null],["衬衫","襯衫","chènshān","Camisa",null],["衬衣","襯衣","chènyī","Camisa",null],["称为","稱為","chēngwéi","Ser llamado",null],["成功",null,"chénggōng","Tener éxito",null],["成果",null,"chéngguǒ","Resultado",null],["成就",null,"chéngjiù","Logro",null],["成立",null,"chénglì","Establecer",null],["成熟",null,"chéngshú","Maduro",null],["成员","成員","chéngyuán","Miembro",null],["成长","成長","chéngzhǎng","Crecer",["Desarrollarse"]],["城",null,"chéng","Ciudad",["Urbe"]],["城市",null,"chéngshì","Ciudad",["Metrópoli"]],["程度",null,"chéngdù","Nivel",["Grado"]],["持续","持續","chíxù","Continuar",["Mantener"]],["充满","充滿","chōngmǎn","Llenar",["Llenarse de"]],["初",null,"chū","Inicial",["Primero"]],["初步",null,"chūbù","Básico",["Elemental"]],["初级","初級","chūjí","Elemental",["Principiante"]],["初中",null,"chūzhōng","Escuela secundaria",["Instituto"]],["除了",null,"chúle","Excepto",["Salvo"]],["处理","處理","chǔlǐ","Manejar",["Tratar"]],["传","傳","chuán","Transmitir",["Pasar"]],["传播","傳播","chuánbō","Difundir",["Propagar"]],["传来","傳來","chuánlái","Venir",["Proceder"]],["传说","傳說","chuánshuō","Leyenda",["Tradición"]],["创新","創新","chuàngxīn","Innovar",["Renovar"]],["创业","創業","chuàngyè","Emprender",["Fundar empresa"]],["创造","創造","chuàngzào","Crear",["Inventar"]],["创作","創作","chuàngzuò","Crear",["Componer"]],["从来","從來","cónglái","Nunca",["Jamás"]],["从前","從前","cóngqián","Antes",["Pasado"]],["从事","從事","cóngshì","Dedicarse a",["Ejercer"]],["村",null,"cūn","Pueblo",["Aldea"]],["存",null,"cún","Guardar",["Existir"]],["存在",null,"cúnzài","Existir",["Haber"]],["错误","錯誤","cuòwù","Error",["Equivocado"]],["达到","達到","dádào","Alcanzar",["Lograr"]],["打破",null,"dǎpò","Romper",["Quebrar"]],["打听","打聽","dǎting","Preguntar",["Indagar"]],["大概",null,"dàgài","Aproximadamente",["Probablemente"]],["大使馆","大使館","dàshǐguǎn","Embajada",["Legación"]],["大约","大約","dàyuē","Aproximadamente",["Unos"]],["大夫",null,"dàifu","Médico",["Doctor"]],["代",null,"dài","Representar",["Época"]],["代表",null,"dàibiǎo","Representante",["Delegado"]],["代表团","代表團","dàibiǎotuán","Delegación",["Comisión"]],["带动","帶動","dàidòng","Impulsar",["Promover"]],["带领","帶領","dàilǐng","Guiar",["Dirigir"]],["单元","單元","dānyuán","Unidad",["Módulo"]],["当初","當初","dāngchū","En ese entonces",["Originalmente"]],["当地","當地","dāngdì","Local",["Autóctono"]],["当然","當然","dāngrán","Claro",["Naturalmente"]],["当中","當中","dāngzhōng","En medio",["Entre"]],["刀",null,"dāo","Cuchillo",["Navaja"]],["导演","導演","dǎoyǎn","Director",["Cineasta"]],["到达","到達","dàodá","Llegar",["Arribar"]],["到底",null,"dàodǐ","Finalmente",["En realidad"]],["得分",null,"défēn","Marcar puntos",["Puntuar"]],["等待",null,"děngdài","Esperar",["Aguardar"]],["底下",null,"dǐxia","Debajo",["Fondo"]],["地区","地區","dìqū","Región",["Zona"]],["电视剧","電視劇","diànshìjù","Serie de televisión",["Telenovela"]],["电视台","電視臺","diànshìtái","Canal de televisión",["Emisora"]],["电台","電臺","diàntái","Radioemisora",["Estación de radio"]],["电子邮件","電子郵件","diànzǐ yóujiàn","Correo electrónico",["E-mail"]],["调","調","diào","Cambiar",["Ajustar"]],["调查","調查","diàochá","Investigar",["Encuesta"]],["订","訂","dìng","Suscribir",["Reservar"]],["定期",null,"dìngqī","Periódico",["Regular"]],["东部","東部","dōngbù","Este",["Región oriental"]],["动力","動力","dònglì","Energía",["Impulso"]],["动人","動人","dòngrén","Conmovedor",["Emotivo"]],["读者","讀者","dúzhě","Lector",["Público"]],["短处","短處","duǎnchù","Defecto",["Debilidad"]],["短裤","短褲","duǎnkù","Pantalón corto",["Short"]],["短期",null,"duǎnqī","A corto plazo",["Temporal"]],["断","斷","duàn","Cortar",["Interrumpir"]],["队员","隊員","duìyuán","Miembro",["Integrante"]],["对待","對待","duìdài","Tratar",["Manejar"]],["对方","對方","duìfāng","Contraparte",["Interlocutor"]],["对手","對手","duìshǒu","Rival",["Oponente"]],["对象","對象","duìxiàng","Pareja",["Objetivo"]],["顿","頓","dùn","Comida",["Porción"]],["发表","發表","fābiǎo","Publicar",["Expresar"]],["发出","發出","fāchū","Emitir",["Enviar"]],["发达","發達","fādá","Desarrollado",["Próspero"]],["发动","發動","fādòng","Iniciar",["Promover"]],["发明","發明","fāmíng","Inventar",["Creación"]],["发生","發生","fāshēng","Ocurrir",["Suceder"]],["发送","發送","fāsòng","Enviar",["Transmitir"]],["发言","發言","fāyán","Hablar",["Declarar"]],["发展","發展","fāzhǎn","Desarrollar",["Progresar"]],["反对","反對","fǎnduì","Oponerse",["Rechazar"]],["反复","反覆","fǎnfù","Repetidamente",["Constantemente"]],["反应","反應","fǎnyìng","Reacción",["Respuesta"]],["反正",null,"fǎnzhèng","De todos modos",["En cualquier caso"]],["范围","範圍","fànwéi","Ámbito",["Extensión"]],["方式",null,"fāngshì","Manera",["Método"]],["防",null,"fáng","Prevenir",["Defender"]],["防止",null,"fángzhǐ","Evitar",["Impedir"]],["房东","房東","fángdōng","Casero",["Propietario"]],["房屋",null,"fángwū","Casa",["Edificio"]],["房租",null,"fángzū","Alquiler",["Renta"]],["访问","訪問","fǎngwèn","Visitar",["Entrevistar"]],["放到",null,"fàngdào","Poner",["Dejar"]],["飞行","飛行","fēixíng","Volar",null],["费","費","fèi","Gastar",["Costo"]],["费用","費用","fèiyong","Gasto",["Costo"]],["分别","分別","fēnbié","Separar respectivamente",["Por separado"]],["分配",null,"fēnpèi","Distribuir",["Repartir"]],["分组","分組","fēn zǔ","Agrupar",["Dividir en grupos"]],["丰富","豐富","fēngfù","Rico variado",["Abundante"]],["风险","風險","fēngxiǎn","Riesgo",["Peligro"]],["否定",null,"fǒudìng","Negar",["Rechazar"]],["否认","否認","fǒurèn","Negar",["Rechazar"]],["服装","服裝","fúzhuāng","Ropa",["Vestimenta"]],["福",null,"fú","Felicidad",["Bendición"]],["父母",null,"fùmǔ","Padres",["Familia"]],["父亲","父親","fùqīn","Padre",["Progenitor"]],["付",null,"fù","Pagar",["Entregar"]],["负责","負責","fùzé","Responsable",["Encargado"]],["复印","複印","fùyìn","Fotocopiar",["Copiar"]],["复杂","複雜","fùzá","Complejo",["Complicado"]],["富",null,"fù","Rico",["Afluente"]],["改进","改進","gǎijìn","Mejorar",["Perfeccionar"]],["改造",null,"gǎizào","Transformar",["Reformar"]],["概念",null,"gàiniàn","Concepto",["Idea"]],["赶","趕","gǎn","Apresurarse",["Alcanzar"]],["赶到","趕到","gǎndào","Llegar a tiempo",["Alcanzar"]],["赶紧","趕緊","gǎnjǐn","Apresurarse",["Urgentemente"]],["赶快","趕快","gǎnkuài","Apresurarse",["Rápidamente"]],["敢",null,"gǎn","Atreverse",["Osar"]],["感冒",null,"gǎnmào","Resfriado/enfermarse",["Catarro","Influenza"]],["感情",null,"gǎnqíng","Sentimiento",["Emoción","Afecto"]],["感受",null,"gǎnshòu","Sentir/impresión",["Experiencia","Percepción"]],["干吗","幹嗎","gànmá","Para qué",["Por qué"]],["高速",null,"gāosù","Rápido",["Veloz"]],["高速公路",null,"gāosù gōnglù","Autopista",["Carretera express"]],["告别","告別","gàobié","Despedirse",["Adiós"]],["歌迷",null,"gēmí","Fan de música",["Seguidor"]],["歌声","歌聲","gēshēng","Voz cantante",["Canto"]],["歌手",null,"gēshǒu","Cantante",["Músico"]],["个人","個人","gèrén","Persona",["Individuo"]],["个性","個性","gèxìng","Personalidad",["Carácter"]],["各",null,"gè","Cada",["Todo"]],["各地",null,"gèdì","Lugares diversos",["Regiones"]],["各位",null,"gèwèi","Señores/as",["Ustedes"]],["各种","各種","gèzhǒng","Varios tipos",["Toda clase"]],["各自",null,"gèzì","Cada uno",["Por separado"]],["根本",null,"gēnběn","Fundamental",["Esencial"]],["更加",null,"gèngjiā","Más",["Aún"]],["工厂","工廠","gōngchǎng","Fábrica",["Planta"]],["工程师","工程師","gōngchéngshī","Ingeniero",["Técnico"]],["工夫",null,"gōngfu","Tiempo",["Habilidad"]],["工具",null,"gōngjù","Herramienta",["Instrumento"]],["工业","工業","gōngyè","Industria",["Fábrica"]],["工资","工資","gōngzī","Salario",["Sueldo"]],["公布","公佈","gōngbù","Anunciar",["Publicar"]],["公共",null,"gōnggòng","Público",["Común"]],["公开","公開","gōngkāi","Público",["Revelar"]],["公民",null,"gōngmín","Ciudadano",["Nacional"]],["公务员","公務員","gōngwùyuán","Funcionario",["Empleado público"]],["功夫",null,"gōngfu","Arte marcial",["Habilidad"]],["功课","功課","gōngkè","Tarea",["Estudio"]],["功能",null,"gōngnéng","Función",["Utilidad"]],["共同",null,"gòngtóng","Común",["Conjunto"]],["共有",null,"gòngyǒu","Tener en común",["Compartir"]],["姑娘",null,"gūniang","Chica",["Muchacha"]],["古",null,"gǔ","Antiguo",["Arcaico"]],["古代",null,"gǔdài","Antigüedad",["Pasado"]],["故乡","故鄉","gùxiāng","Patria",["Tierra natal"]],["挂","掛","guà","Colgar",["Suspender"]],["关系","關係","guānxì","Relación",["Asunto"]],["关注","關注","guānzhù","Prestar atención",["Fijarse"]],["观察","觀察","guānchá","Observar",["Examinar"]],["观看","觀看","guānkàn","Ver",["Mirar"]],["观念","觀念","guānniàn","Concepto",["Idea"]],["观众","觀眾","guānzhòng","Espectador",["Público"]],["管",null,"guǎn","Cuidar",["Gestionar"]],["管理",null,"guǎnlǐ","Administrar",["Gestionar"]],["光",null,"guāng","Luz",["Solo"]],["光明",null,"guāngmíng","Luz",["Brillante"]],["广播","廣播","guǎngbō","Radio",["Difundir"]],["广大","廣大","guǎngdà","Amplio",["Extenso"]],["规定","規定","guīdìng","Reglamentar",["Norma"]],["规范","規範","guīfàn","Normalizar",["Estándar"]],["国内","國內","guó nèi","Dentro del país",["Local"]],["国庆","國慶","guóqìng","Fiesta nacional",["Día patrio"]],["果然",null,"guǒrán","Efectivamente",["Realmente"]],["果汁",null,"guǒzhī","Jugo",["Zumo"]],["过程","過程","guòchéng","Proceso",["Desarrollo"]],["哈哈",null,"hāhā","Jajá",["Risa"]],["海关","海關","hǎiguān","Aduana",["Frontera"]],["害怕",null,"hàipà","Tener miedo",["Temer"]],["好好",null,"hǎohǎo","Bueno",["Cuidadosamente"]],["好奇",null,"hàoqí","Curioso",["Inquisitivo"]],["合",null,"hé","Unir",["Combinar"]],["合法",null,"héfǎ","Legal",["Válido"]],["合格",null,"hégé","Cualificado",["Aprobado"]],["合理",null,"hélǐ","Razonable",["Justo"]],["合作",null,"hézuò","Cooperar",["Trabajar juntos"]],["和平",null,"hépíng","Paz",["Tranquilidad"]],["红茶","紅茶","hóngchá","Té negro",["Té rojo"]],["红酒","紅酒","hóngjiǔ","Vino tinto",["Vino"]],["后果","後果","hòuguǒ","Consecuencia",["Resultado"]],["后面","後面","hòumiàn","Detrás",["Parte posterior"]],["后年","後年","hòunián","Después del próximo año",["Dentro de dos años"]],["互联网","互聯網","hùliánwǎng","Internet",["Red"]],["互相",null,"hùxiāng","Mutuamente",["Recíprocamente"]],["划船",null,"huáchuán","Remar",["Navegar"]],["华人","華人","huárén","Chino/a",["Sinó"]],["化",null,"huà (xiàndàihuà)","-ización",["-ificar"]],["话剧","話劇","huàjù","Teatro",["Obra"]],["话题","話題","huàtí","Tema",["Asunto"]],["欢乐","歡樂","huānlè","Alegre",["Feliz"]],["环","環","huán","Anillo",["Círculo"]],["环保","環保","huánbǎo","Protección ambiental",["Ecológico"]],["环境","環境","huánjìng","Ambiente",["Surroundings"]],["会议","會議","huìyì","Reunión",["Congreso"]],["会员","會員","huìyuán","Miembro",["Asociado"]],["活",null,"huó","Vivo",["Activo"]],["火",null,"huǒ","Fuego",["Calor"]],["机器","機器","jīqì","Máquina",["Aparato"]],["积极","積極","jījí","Positivo",["Activo"]],["基本",null,"jīběn","Básico",["Fundamental"]],["基本上",null,"jīběnshàng","Básicamente",["En general"]],["基础","基礎","jīchǔ","Base",["Fundamento"]],["及时","及時","jíshí","Oportuno",["A tiempo"]],["…极了","…極了","…jí le","Extremadamente",["Muy"]],["集体","集體","jítǐ","Colectivo",["Grupo"]],["集中",null,"jízhōng","Concentrar",["Agrupar"]],["计算","計算","jìsuàn","Calcular",["Computar"]],["记录","記錄","jìlù","Grabar",["Anotar"]],["记者","記者","jìzhě","Periodista",["Corresponsal"]],["纪录","紀錄","jìlù","Récord",["Marca"]],["纪念","紀念","jìniàn","Conmemorar",["Recuerdo"]],["技术","技術","jìshù","Tecnología",["Técnica"]],["继续","繼續","jìxù","Continuar",["Seguir"]],["加工",null,"jiāgōng","Procesar",["Manufacturar"]],["加快",null,"jiākuài","Acelerar",["Apresurar"]],["加强","加強","jiāqiáng","Fortalecer",["Intensificar"]],["家具",null,"jiājù","Muebles",["Enseres"]],["家属","家屬","jiāshǔ","Familia",["Parientes"]],["家乡","家鄉","jiāxiāng","Pueblo natal",["Cuna"]],["价格","價格","jiàgé","Precio",["Costo"]],["价钱","價錢","jiàqián","Precio",["Valor"]],["价值","價值","jiàzhí","Valor",["Mérito"]],["架",null,"jià","Estante",["Montar"]],["坚持","堅持","jiānchí","Insistir",["Perseverar"]],["坚决","堅決","jiānjué","Decidido",["Firme","Contundente"]],["坚强","堅強","jiānqiáng","Fuerte",["Resistente","Robusto"]],["简单","簡單","jiǎndān","Simple",["Fácil","Elemental"]],["简直","簡直","jiǎnzhí","Simplemente",["Literalmente"]],["建",null,"jiàn","Construir",["Levantar","Edificar"]],["建成",null,"jiànchéng","Construir completamente",["Finalizar","Terminar"]],["建立",null,"jiànlì","Establecer",["Fundar","Crear"]],["建设","建設","jiànshè","Construir",["Desarrollo","Construcción"]],["建议","建議","jiànyì","Sugerir",["Propuesta","Recomendación"]],["将近","將近","jiāngjìn","Casi",["Aproximadamente","Cercano"]],["将来","將來","jiānglái","Futuro",["Porvenir","Venidero"]],["交费","交費","jiāofèi","Pagar",["Abonar","Cancelar"]],["交警",null,"jiāojǐng","Policía de tráfico",["Agente tránsito"]],["交流",null,"jiāoliú","Comunicar",["Intercambio","Diálogo"]],["交往",null,"jiāowǎng","Relacionarse",["Socializar","Tratar"]],["交易",null,"jiāoyì","Transacción",["Negocio","Comercio"]],["较","較","jiào","Más",["Comparativamente","Relativamente"]],["教材",null,"jiàocái","Material didáctico",["Texto","Libro"]],["教练","教練","jiàoliàn","Entrenador",["Instructor","Adiestrador"]],["结实","結實","jiēshi","Sólido",["Resistente","Firme"]],["接待",null,"jiēdài","Recibir",["Atender","Hospedar"]],["接近",null,"jiējìn","Acercarse",["Aproximarse","Contiguo"]],["节约","節約","jiéyuē","Ahorrar",["Economizar","Reducir"]],["结合","結合","jiéhé","Combinar",["Unir","Fusionar"]],["结婚","結婚","jiéhūn","Casarse",["Contraer matrimonio"]],["结束","結束","jiéshù","Terminar",["Concluir","Acabar"]],["解决","解決","jiějué","Resolver",["Solucionar","Aclarar"]],["解开","解開","jiěkāi","Desatar",["Soltar","Desabrochar"]],["金",null,"jīn","Oro",["Metálico","Dorado"]],["金牌",null,"jīnpái","Medalla de oro",["Presea","Distinción"]],["仅","僅","jǐn","Solo",["Únicamente","Solamente"]],["仅仅","僅僅","jǐnjǐn","Solo",["Tan solo","No más"]],["尽量","儘量","jǐnliàng","尽力",["En lo posible","Todo lo posible"]],["紧","緊","jǐn","Apretado",["Ajustado","Estricto"]],["紧急","緊急","jǐnjí","Urgente",["Apremiante","Critico"]],["紧张","緊張","jǐnzhāng","Nervioso",["Tenso","Estresado"]],["进步","進步","jìnbù","Progresar",["Avanzar","Mejorar"]],["进一步","進一步","jìnyībù","Más allá",["Adicionalmente","Adelante"]],["进展","進展","jìnzhǎn","Avanzar",["Progreso","Desarrollo"]],["近期",null,"jìnqī","Próximo",["Cercano"]],["京剧","京劇","jīngjù","Ópera de Pekín",["Teatro tradicional"]],["经济","經濟","jīngjì","Economía",["Económico","Financiero"]],["经历","經歷","jīnglì","Experimentar",["Vivencia","Pasaje"]],["经验","經驗","jīngyàn","Experiencia",["Saber","Práctica"]],["经营","經營","jīngyíng","Gestionar",["Administrar","Dirigir"]],["精彩",null,"jīngcǎi","Brillante",["Espectacular","Magnífico"]],["精神",null,"jīngshén","Espíritu",["Mental","Energía"]],["景色",null,"jǐngsè","Paisaje",["Panorámica","Escena"]],["警察",null,"jǐngchá","Policía",["Agente","Autoridad"]],["静","靜","jìng","Tranquilo",["Silencioso","Calmado"]],["久",null,"jiǔ","Largo",["Prolongado","Duradero"]],["旧","舊","jiù","Viejo",["Antiguo","Obsoleto"]],["救",null,"jiù","Salvar",["Rescatar","Ayudar"]],["就是",null,"jiùshì","Es decir",["Precisamente","Justamente"]],["就业","就業","jiùyè","Trabajar",["Empleo","Ocupación"]],["举办","舉辦","jǔbàn","Organizar",["Celebrar","Conducir"]],["具体","具體","jùtǐ","Concreto",["Específico","Detallado"]],["具有",null,"jùyǒu","Tener",["Poseer","Disfrutar"]],["剧场","劇場","jùchǎng","Teatro",["Sala","Espectáculo"]],["据说","據說","jùshuō","Se dice",["Según se comenta","Por rumores"]],["决定","決定","juédìng","Decidir",["Determinación","Decisión"]],["决赛","決賽","juésài","Final",["Competencia decisiva"]],["决心","決心","juéxīn","Determinación",["Propósito","Firmeza"]],["绝对","絕對","juéduì","Absoluto",["Totalmente","Completamente"]],["咖啡",null,"kāfēi","Café",["Taza","Bebida"]],["开发","開發","kāifā","Desarrollar",["Explotar","Crear"]],["开放","開放","kāifàng","Abrir",["Liberalizar","Abierto"]],["开始","開始","kāishǐ","Comenzar",["Inicio","Comienzo"]],["开业","開業","kāiyè","Abrir negocio",["Inauguración","Inicio"]],["开展","開展","kāizhǎn","Desarrollar",["Emprender","Promover"]],["看起来","看起來","kàn qǐlái","Parecer",["Se ve"]],["看上去",null,"kàn shàngqù","Parecer",["Se ve"]],["考验","考驗","kǎoyàn","Probar",["Desafío","Verificación"]],["科技",null,"kējì","Tecnología",["Científico","Técnico"]],["可靠",null,"kěkào","Fiable",["Seguro","Confiable"]],["可乐","可樂","kělè","Refresco",["Gaseosa","Bebida"]],["克服",null,"kèfú","Superar",["Vencer","Derrotar"]],["客观","客觀","kèguān","Objetivo",["Real","Imparcial"]],["课程","課程","kèchéng","Curso",["Asignatura","Materia"]],["空",null,"kōng","Vacío",["Hueco","Ocioso"]],["空调","空調","kōngtiáo","Aire acondicionado",["Climatizador","Refrigerador"]],["恐怕",null,"kǒngpà","Temer",["Quizás","Mejor"]],["空儿","空兒","kòngr","Momento",["Espacio","Libre"]],["裤子","褲子","kùzi","Pantalón",["Prenda","Vestimenta"]],["快速",null,"kuàisù","Rápido",["Veloz","Urgente"]],["困",null,"kùn","Cansado",["Somnoliento","Molesto"]],["困难","困難","kùnnan","Dificultad",["Problema","Arduamente"]],["浪费","浪費","làngfèi","Desperdiciar",["Malgastar","Gastar"]],["老百姓",null,"lǎobǎixìng","Gente común",["Pueblo","Ciudadano"]],["老板","老闆","lǎobǎn","Patrón",["Jefe","Empleador"]],["老太太",null,"lǎotàitai","Anciana",["Viejita","Mayor"]],["老头儿","老頭兒","lǎotóur","Anciano",["Viejito","Mayor"]],["乐","樂","lè","Alegrarse",["Gozar","Disfrutar"]],["乐观","樂觀","lèguān","Optimista",["Positivo","Bueno"]],["类","類","lèi","Tipo",["Especie","Categoría"]],["类似","類似","lèisì","Similar",["Análogo","Semejante"]],["离婚","離婚","líhūn","Divorciarse",["Separación legal"]],["里面","裡面","lǐmiàn","Dentro",["Interior","Adentro"]],["理发","理髮","lǐfà","Cortarse el pelo",["Peinado"]],["理解",null,"lǐjiě","Comprender",["Entender","Interpretar"]],["理论","理論","lǐlùn","Teoría",["Doctrina","Doctrinal"]],["理由",null,"lǐyóu","Razón",["Causa","Motivo"]],["力",null,"lì","Fuerza",["Capacidad","Poder"]],["力量",null,"lìliàng","Fuerza",["Poder","Energía"]],["立刻",null,"lìkè","Inmediatamente",["Ahora","En seguida"]],["利用",null,"lìyòng","Utilizar",["Aprovechar","Hacer uso"]],["连","連","lián","Incluso",["Hasta","También"]],["连忙","連忙","liánmáng","Rápidamente",["Aprisa","De inmediato"]],["连续","連續","liánxù","Continuar",["Seguido","Sucesivo"]],["连续剧","連續劇","liánxùjù","Serie",["Telenovela","Serial"]],["联合","聯合","liánhé","Unir",["Coalición","Alianza"]],["联合国","聯合國","Liánhéguó","ONU",["Organización mundial"]],["联系","聯繫","liánxì","Contactar",["Relación","Enlace"]],["凉水","涼水","liángshuǐ","Agua fría",["Fresca","Fria"]],["领","領","lǐng","Recibir",["Guiar","Cobrar"]],["领导","領導","lǐngdǎo","Dirigir",["Liderazgo","Mando"]],["领先","領先","lǐngxiān","Estar adelante",["Aventajar","Superar"]],["另外",null,"lìngwài","Además",["Por otro lado","Separado"]],["另一方面",null,"lìng yīfāngmiàn","Por otro lado",["Inversamente","Opuesto"]],["留学","留學","liúxué","Estudiar en el extranjero",["Beca","Estudios"]],["龙","龍","lóng","Dragón",["Mítica","Serpiente"]],["录","錄","lù","Grabar",["Registrar"]],["录音","錄音","lùyīn","Grabar/grabación",["Grabar audio"]],["路线","路線","lùxiàn","Ruta",["Camino"]],["旅馆","旅館","lǚguǎn","Hotel",["Posada"]],["旅行社",null,"lǚxíngshè","Agencia de viajes",["Tour operador"]],["绿茶","綠茶","lǜchá","Té verde",["Té sin fermentar"]],["乱","亂","luàn","Desordenado",["Caótico"]],["落后","落後","luòhòu","Atrasado",["Rezagado"]],["麻烦","麻煩","máfan","Molestar/problemático",["Incomodar"]],["马","馬","mǎ","Caballo",["Equino"]],["满足","滿足","mǎnzú","Satisfacer",["Contentar"]],["慢慢",null,"mànmàn","Lentamente",["Gradualmente"]],["毛病",null,"máobìng","Problema",["Defecto"]],["没用","沒用","méiyòng","Inútil",["Sin valor"]],["媒体","媒體","méitǐ","Medio",["Prensa"]],["每",null,"měi","Cada/todos",["Cada uno"]],["美",null,"měi","Hermoso",["Bello"]],["美好",null,"měihǎo","Maravilloso",["Excelente"]],["美丽","美麗","měilì","Hermoso",["Bonito"]],["美食",null,"měishí","Comida deliciosa",["Gastronomía"]],["美术","美術","měishù","Arte",["Bellas artes"]],["美元",null,"měiyuán","Dólar",["Moneda estadounidense"]],["迷",null,"mí","Perderse",["Fascinar"]],["面对","面對","miànduì","Enfrentar",["Confrontar"]],["面积","面積","miànjī","Superficie",["Extensión"]],["民间","民間","mínjiān","Popular",["Tradicional"]],["民族",null,"mínzú","Etnia",["Nación"]],["明确","明確","míngquè","Claro",["Definido"]],["明显","明顯","míngxiǎn","Obvio",["Evidente"]],["命运","命運","mìngyùn","Destino",["Suerte"]],["某",null,"mǒu","Cierto/un",["Algún"]],["母亲","母親","mǔqīn","Madre",["Progenitora"]],["木头","木頭","mùtou","Madera",["Leña"]],["目标","目標","mùbiāo","Objetivo",["Meta"]],["目前",null,"mùqián","Actualmente",["Ahora"]],["奶茶",null,"nǎichá","Té con leche",["Bubble tea"]],["男子",null,"nánzǐ","Hombre",["Varón"]],["南部",null,"nánbù","Sur",["Región sur"]],["难道","難道","nándào","Acaso",["¿será que?"]],["难度","難度","nándù","Dificultad",["Complejidad"]],["内","內","nèi","Interior",["Dentro"]],["内容","內容","nèiróng","Contenido",["Tema"]],["内心","內心","nèixīn","Corazón",["Interior"]],["能不能",null,"néng bu néng","¿puedes?",["¿es posible?"]],["能力",null,"nénglì","Capacidad",["Talento"]],["年初",null,"niánchū","Principio de año",["Enero"]],["年代",null,"niándài","Década",["Época"]],["年底",null,"niándǐ","Fin de año",["Diciembre"]],["年纪","年紀","niánjì","Edad",["Años"]],["念",null,"niàn","Pensar",["Estudiar"]],["牛",null,"niú","Buey",["Ganado"]],["农村","農村","nóngcūn","Campo",["Zona rural"]],["农民","農民","nóngmín","Campesino",["Agricultor"]],["农业","農業","nóngyè","Agricultura",["Campo"]],["女子",null,"nǚzǐ","Mujer",["Dama"]],["暖和",null,"nuǎnhuo","Cálido",["Caluroso"]],["拍",null,"pāi","Golpear",["Fotografiar"]],["排名",null,"páimíng","Clasificación",["Posición"]],["牌子",null,"páizi","Marca",["Etiqueta"]],["派",null,"pài","Enviar/delegar",["Grupo"]],["判断","判斷","pànduàn","Juzgar",["Opinión"]],["胖",null,"pàng","Gordo",["Grueso"]],["跑步",null,"pǎobù","Correr",["Footing"]],["配",null,"pèi","Emparejar",["Combinar"]],["配合",null,"pèihé","Cooperar",["Coordinar"]],["批评","批評","pīpíng","Criticar",["Reprochar"]],["批准",null,"pīzhǔn","Aprobar",["Autorizar"]],["皮",null,"pí","Piel",["Cuero"]],["皮包",null,"píbāo","Bolso",["Cartera"]],["啤酒",null,"píjiǔ","Cerveza",["Birra"]],["票价","票價","piàojià","Precio de entrada",["Costo"]],["评价","評價","píngjià","Evaluar",["Opinión"]],["苹果","蘋果","píngguǒ","Manzana",["Pomo"]],["破",null,"pò","Roto",["Viejo"]],["破坏","破壞","pòhuài","Destruir",["Arruinar"]],["普遍",null,"pǔbiàn","General",["Común"]],["普及",null,"pǔjí","Popularizar",["Extender"]],["期",null,"qī","Período",["Sesión"]],["齐","齊","qí","Completo",["Ordenado"]],["其次",null,"qícì","En segundo lugar",["Luego"]],["其实","其實","qíshí","En realidad",["De hecho"]],["奇怪",null,"qíguài","Raro",["Extraño"]],["气候","氣候","qìhòu","Clima",["Tiempo"]],["千万","千萬","qiānwàn","千万",["Por todos los medios"]],["前后","前後","qiánhòu","Alrededor",["Antes y después"]],["前进","前進","qiánjìn","Avanzar",["Progresar"]],["前面",null,"qiánmiàn","Frente",["Delante"]],["前往",null,"qiánwǎng","Ir a",["Dirigirse"]],["强","強","qiáng","Fuerte",["Poderoso"]],["强大","強大","qiángdà","Poderoso",["Fuerte"]],["强调","強調","qiángdiào","Enfatizar",["Destacar"]],["强烈","強烈","qiángliè","Intenso",["Fuerte"]],["桥","橋","qiáo","Puente",["Paso"]],["巧",null,"qiǎo","Hábil",["Ingenioso"]],["亲","親","qīn","Cercano",["Querido"]],["亲切","親切","qīnqiè","Amable",["Cordial"]],["亲人","親人","qīnrén","Ser querido",["Pariente"]],["亲自","親自","qīnzì","Personalmente",["En persona"]],["情感",null,"qínggǎn","Emoción",["Sentimiento"]],["情况","情況","qíngkuàng","Situación",["Estado"]],["请教","請教","qǐngjiào","Preguntar",["Consultar"]],["庆祝","慶祝","qìngzhù","Celebrar",["Festejar"]],["球迷",null,"qiúmí","Aficionado al fútbol",["Hincha"]],["区","區","qū","Distrito",["Zona"]],["区别","區別","qūbié","Diferencia",["Distinguir"]],["取消",null,"qǔxiāo","Cancelar",["Anular"]],["去世",null,"qùshì","Morir",["Fallecer"]],["全场","全場","quánchǎng","Todo el estadio",["Completo"]],["全面",null,"quánmiàn","Completo",["Integral"]],["全球",null,"quánqiú","Mundial",["Global"]],["缺",null,"quē","Faltar",["Carecer"]],["缺点","缺點","quēdiǎn","Defecto",["Fallo"]],["缺少",null,"quēshǎo","Carecer",["Faltar"]],["确保","確保","quèbǎo","Asegurar",["Garantizar"]],["确定","確定","quèdìng","Confirmar",["Seguro"]],["确实","確實","quèshí","Seguro",["Realmente"]],["裙子",null,"qúnzi","Falda",["Enagua"]],["群",null,"qún","Grupo",["Multitud"]],["热爱","熱愛","rè'ài","Amar",["Querer"]],["热烈","熱烈","rèliè","Entusiasta",["Apasionado"]],["人才",null,"réncái","Talento",["Habilidad","Persona capacitada"]],["人工",null,"réngōng","Mano de obra",["Artificial"]],["人类","人類","rénlèi","Humanidad",["Especie humana"]],["人民",null,"rénmín","Pueblo",["Nación"]],["人民币","人民幣","rénmínbì","Yuan",["Moneda china"]],["人群",null,"rénqún","Multitud",["Grupo de personas"]],["人生",null,"rénshēng","Vida",["Existencia humana"]],["人员","人員","rényuán","Personal",["Equipo"]],["认出","認出","rènchū","Identificar",["Reconocer"]],["认得","認得","rènde","Conocer",["Saber"]],["认可","認可","rènkě","Aceptar",["Aprobar"]],["任",null,"rèn","Asumir",["Nombrar"]],["任何",null,"rènhé","Cualquier",["Alguno"]],["任务","任務","rènwu","Tarea",["Misión"]],["仍",null,"réng","Todavía",["Aún"]],["仍然",null,"réngrán","Todavía",["Aún"]],["日常",null,"rìcháng","Cotidiano",["Habitual"]],["容易",null,"róngyì","Fácil",["Sencillo"]],["如何",null,"rúhé","Cómo",["De qué manera"]],["散步",null,"sànbù","Pasear",["Caminar"]],["沙发","沙發","shāfā","Sofá",["Sillón"]],["沙子",null,"shāzi","Arena",["Grano"]],["伤","傷","shāng","Herir",["Daño"]],["伤心","傷心","shāngxīn","Entristecerse",["Apenar"]],["商品",null,"shāngpǐn","Producto",["Bien"]],["商业","商業","shāngyè","Comercio",["Negocio"]],["上来","上來","shànglái","Subir",["Ascender"]],["上面",null,"shàngmiàn","Arriba",["Superficie"]],["上去",null,"shàngqù","Subir",["Ascender"]],["上升",null,"shàngshēng","Ascender",["Aumentar"]],["上衣",null,"shàngyī","Camisa",["Prenda superior"]],["设备","設備","shèbèi","Equipo",["Instalación"]],["设计","設計","shèjì","Diseñar",["Planificación"]],["设立","設立","shèlì","Establecer",["Crear"]],["社会","社會","shèhuì","Sociedad",["Comunidad"]],["身份证","身份證","shēnfènzhèng","Documento",["Cédula"]],["深",null,"shēn","Profundo",["Hondo"]],["深刻",null,"shēnkè","Profundo",["Intenso"]],["深入",null,"shēnrù","Profundizar",["Detallado"]],["升",null,"shēng","Ascender",["Aumentar"]],["生产","生產","shēngchǎn","Producir",["Fabricar"]],["生存",null,"shēngcún","Sobrevivir",["Existir"]],["生动","生動","shēngdòng","Vivaz",["Animado"]],["生命",null,"shēngmìng","Vida",["Existencia"]],["生意",null,"shēngyi","Negocio",["Comercio"]],["生长","生長","shēngzhǎng","Crecer",["Desarrollarse"]],["声明","聲明","shēngmíng","Declarar",["Comunicado"]],["胜","勝","shèng","Ganar",["Vencer"]],["胜利","勝利","shènglì","Ganar",["Triunfo"]],["失去",null,"shīqù","Perder",["Extrañar"]],["石头","石頭","shítou","Piedra",["Roca"]],["石油",null,"shíyóu","Petróleo",["Crudo"]],["时","時","shí","Tiempo",["Momento"]],["时代","時代","shídài","Época",["Era"]],["时刻","時刻","shíkè","Instante",["Momento"]],["实际上","實際上","shíjìshàng","En realidad",["De hecho"]],["实力","實力","shílì","Poder",["Capacidad"]],["实行","實行","shíxíng","Implementar",["Aplicar"]],["实验","實驗","shíyàn","Experimentar",["Prueba"]],["实验室","實驗室","shíyànshì","Laboratorio",["Gabinete"]],["食品",null,"shípǐn","Alimento",["Comida"]],["使",null,"shǐ","Hacer",["Dejar"]],["始终","始終","shǐzhōng","Siempre",["Constantemente"]],["世纪","世紀","shìjì","Siglo",["Era"]],["世界",null,"shìjiè","Mundo",["Planeta"]],["世界杯",null,"shìjièbēi","Mundial",["Copa"]],["市场","市場","shìchǎng","Mercado",["Plaza"]],["事故",null,"shìgù","Accidente",["Suceso"]],["事件",null,"shìjiàn","Evento | hecho",null],["事实","事實","shìshí","Hecho",["Realidad"]],["事实上","事實上","shìshíshang","En realidad",["De hecho"]],["事业","事業","shìyè","Carrera",["Empresa"]],["试题","試題","shìtí","Examen",["Prueba"]],["试验","試驗","shìyàn","Probar",["Ensayar"]],["适合","適合","shìhé","Convenir",["Adaptarse"]],["适应","適應","shìyìng","Adaptarse",["Acostumbrarse"]],["适用","適用","shìyòng","Aplicable",["Válido"]],["室",null,"shì","Habitación",["Sala"]],["收费","收費","shōufèi","Cobrar",["Pagar"]],["收看",null,"shōukàn","Ver",["Mirar"]],["收听","收聽","shōutīng","Oír",["Escuchar"]],["收音机","收音機","shōuyīnjī","Radio",["Aparato"]],["手续","手續","shǒuxù","Trámite",["Gestión"]],["手指",null,"shǒuzhǐ","Dedo",["Falange"]],["首都",null,"shǒudū","Capital",["Ciudad principal"]],["首先",null,"shǒuxiān","Primero",["Ante todo"]],["受",null,"shòu","Sufrir",["Recibir"]],["受伤","受傷","shòushāng","Herirse",["Doler"]],["书架","書架","shūjià","Estante",["Repisa"]],["输","輸","shū","Perder",["Fallar"]],["输入","輸入","shūrù","Introducir",["Ingresar"]],["熟人",null,"shúrén","Conocido",["Amigo"]],["属","屬","shǔ","Pertenecer",["Ser"]],["属于","屬於","shǔyú","Pertenecer",["Ser"]],["束",null,"shù","Manojo",["Atado"]],["数量","數量","shùliàng","Cantidad",["Número"]],["双","雙","shuāng","Par",["Doble"]],["双方","雙方","shuāngfāng","Ambas partes",["Los dos"]],["思想",null,"sīxiǎng","Pensamiento",["Idea"]],["死",null,"sǐ","Morir",["Fallecer"]],["速度",null,"sùdù","Velocidad",["Rapidez"]],["随","隨","suí","Seguir",["Acompañar"]],["所",null,"suǒ","Lugar",["Parte"]],["所长","所長","suǒzhǎng","Director",["Jefe"]],["台",null,"tái","Mesa",["Aparato"]],["谈","談","tán","Hablar",["Conversar"]],["谈话","談話","tánhuà","Conversar",["Charlar"]],["谈判","談判","tánpàn","Negociar",["Discutir"]],["汤","湯","tāng","Sopa | caldo",null],["糖",null,"táng","Azúcar | dulce",null],["特色",null,"tèsè","Característica",["Particularidad"]],["提前",null,"tíqián","Adelantar",["Anticipar"]],["提问","提問","tíwèn","Preguntar",["Interrogar"]],["题目","題目","tímù","Pregunta",["Tema"]],["体会","體會","tǐhuì","Entender | sentir",null],["体现","體現","tǐxiàn","Reflejar",["Mostrar"]],["体验","體驗","tǐyàn","Experimentar",["Vivir"]],["天空",null,"tiānkōng","Cielo",["Firmamento"]],["甜",null,"tián","Dulce",["Azucarado"]],["调整","調整","tiáozhěng","Ajustar",["Modificar"]],["跳",null,"tiào","Saltar",["Brincar"]],["跳高",null,"tiàogāo","Saltar en alto",["Salto alto"]],["跳舞",null,"tiàowǔ","Bailar",["Danzar"]],["跳远","跳遠","tiàoyuǎn","Saltar en largo",["Salto largo"]],["铁","鐵","tiě","Hierro",["Metal"]],["铁路","鐵路","tiělù","Ferrocarril",["Línea férrea"]],["听力","聽力","tīnglì","Audición",["Capacidad de oír"]],["听众","聽眾","tīngzhòng","Oyente",["Público"]],["停止",null,"tíngzhǐ","Detenerse",["Parar"]],["通常",null,"tōngcháng","Común",["Habitual"]],["通信",null,"tōngxìn","Comunicarse",["Corresponder"]],["同意",null,"tóngyì","Estar de acuerdo",["Consentir"]],["痛",null,"tòng","Doloroso",["Adolorido"]],["痛苦",null,"tòngkǔ","Doloroso",["Penoso"]],["头脑","頭腦","tóunǎo","Mente",["Cerebro"]],["突出",null,"tūchū","Destacado",["Prominente"]],["突然",null,"tūrán","Repentino",["Inesperado"]],["图","圖","tú","Imagen",["Cuadro"]],["图画","圖畫","túhuà","Dibujo",["Pintura"]],["土",null,"tǔ","Tierra",["Suelo"]],["团","團","tuán","Grupo",["Pelota"]],["团结","團結","tuánjié","Unirse",["Cohesionar"]],["团体","團體","tuántǐ","Grupo",["Colectivo"]],["推动","推動","tuīdòng","Impulsar",["Promover"]],["推广","推廣","tuīguǎng","Difundir",["Extender"]],["推进","推進","tuījìn","Avanzar",["Promover"]],["推开","推開","tuīkāi","Empujar",["Abrir"]],["退",null,"tuì","Retirarse",["Retroceder"]],["退出",null,"tuìchū","Salir",["Abandonar"]],["退休",null,"tuìxiū","Jubilarse",["Retirarse"]],["外交",null,"wàijiāo","Relaciones exteriores",["Política exterior"]],["外面",null,"wàimiàn","Afuera",["Exterior"]],["外文",null,"wàiwén","Idioma extranjero",["Lengua extranjera"]],["完美",null,"wánměi","Perfecto",["Ideal"]],["完善",null,"wánshàn","Perfeccionar",["Completo"]],["完整",null,"wánzhěng","Completo",["Íntegro"]],["玩具",null,"wánjù","Juguete",["Juego"]],["往往",null,"wǎngwǎng","Generalmente",["Usualmente"]],["危害",null,"wēihài","Dañar",["Perjudicar"]],["危险","危險","wēixiǎn","Peligroso",["Arriesgado"]],["围","圍","wéi","Rodear",["Cercar"]],["伟大","偉大","wěidà","Grande",["Magnífico"]],["卫生","衛生","wèishēng","Higiene",["Saneamiento"]],["卫生间","衛生間","wèishēngjiān","Baño",["Aseo"]],["为了","為了","wèile","Para",["Con el fin de"]],["温暖","溫暖","wēnnuǎn","Cálido",["Acogedor"]],["文化",null,"wénhuà","Cultura",["Civilización"]],["文件",null,"wénjiàn","Documento",["Expediente"]],["文明",null,"wénmíng","Civilización",["Culto"]],["文学","文學","wénxué","Literatura",["Letras"]],["文章",null,"wénzhāng","Artículo",["Ensayo"]],["文字",null,"wénzì","Escritura",["Caracteres"]],["握手",null,"wòshǒu","Estrechar la mano",["Saludar"]],["屋子",null,"wūzi","Habitación",["Cuarto"]],["武器",null,"wǔqì","Arma",["Armamento"]],["武术","武術","wǔshù","Artes marciales",["Kung fu"]],["舞台","舞臺","wǔtái","Escenario",["Tablado"]],["西部",null,"xībù","Oeste",["Región occidental"]],["希望",null,"xīwàng","Esperar",["Desear"]],["系",null,"xì","Departamento",["Facultad"]],["下来","下來","xiàlái","Bajar",["Descender"]],["下面",null,"xiàmiàn","Debajo",["Inferior"]],["下去",null,"xiàqù","Continuar",["Seguir"]],["先进","先進","xiānjìn","Avanzado",["Progresista"]],["显得","顯得","xiǎnde","Parecer",["Resultar"]],["显然","顯然","xiǎnrán","Obvio",["Evidente"]],["显示","顯示","xiǎnshì","Mostrar",["Exhibir"]],["现场","現場","xiànchǎng","Lugar del evento",["Escena"]],["现代","現代","xiàndài","Moderno",["Contemporáneo"]],["现金","現金","xiànjīn","Efectivo",["Dinero en metálico"]],["现实","現實","xiànshí","Realidad",["Concreto"]],["现象","現象","xiànxiàng","Fenómeno",["Aspecto"]],["线","線","xiàn","Línea",["Hilo"]],["相比",null,"xiāngbǐ","Comparar",["Contrastar"]],["相当","相當","xiāngdāng","Bastante",["Relativamente"]],["相关","相關","xiāngguān","Relacionarse",["Concernir"]],["相互",null,"xiānghù","Mutuamente",["Recíproco"]],["相似",null,"xiāngsì","Similar",["Parecido"]],["香",null,"xiāng","Aromático",["Perfumado"]],["香蕉",null,"xiāngjiāo","Plátano",["Banano"]],["消费","消費","xiāofèi","Consumir",["Gastar"]],["消失",null,"xiāoshī","Desaparecer",["Desvanecerse"]],["消息",null,"xiāoxi","Noticia",["Información"]],["效果",null,"xiàoguǒ","Efecto",["Resultado"]],["写作","寫作","xiězuò","Escribir",["Redactar"]],["血",null,"xiě","Sangre",["Líquido rojo"]],["心",null,"xīn","Corazón",["Mente"]],["信封",null,"xìnfēng","Sobre",null],["信任",null,"xìnrèn","Confiar",["Fiarse"]],["行李",null,"xíngli","Equipaje",["Maleta"]],["形成",null,"xíngchéng","Formar",["Constituir"]],["形式",null,"xíngshì","Forma",["Tipo"]],["形象",null,"xíngxiàng","Imagen",["Figura"]],["形状","形狀","xíngzhuàng","Forma",["Figura"]],["幸福",null,"xìngfú","Feliz",["Dichoso"]],["幸运","幸運","xìngyùn","Afortunado",["Con suerte"]],["性",null,"xìng(jījíxìng)","Naturaleza",["Cualidad"]],["性别","性別","xìngbié","Sexo",["Género"]],["性格",null,"xìnggé","Carácter",["Personalidad"]],["修",null,"xiū","Reparar",["Arreglar"]],["修改",null,"xiūgǎi","Modificar",["Corregir"]],["需求",null,"xūqiú","Necesidad",["Requerimiento"]],["需要",null,"xūyào","Necesitar",["Requerir"]],["宣布",null,"xuānbù","Anunciar",["Declarar"]],["宣传","宣傳","xuānchuán","Promocionar",["Propagar"]],["选手","選手","xuǎnshǒu","Concursante",["Participante"]],["学费","學費","xuéfèi","Matrícula",["Colegiatura"]],["训练","訓練","xùnliàn","Entrenar",["Practicar"]],["压","壓","yā","Presionar",["Aplastar"]],["压力","壓力","yālì","Presión",["Tensión"]],["烟","煙","yān","Humo",["Tabaco"]],["眼前",null,"yǎnqián","Frente a los ojos",["Actual"]],["演",null,"yǎn","Actuar",["Representar"]],["演唱",null,"yǎnchàng","Cantar",["Interpretar"]],["演唱会","演唱會","yǎnchànghuì","Concierto",["Recital"]],["演出",null,"yǎnchū","Representar",["Espectáculo"]],["演员","演員","yǎnyuán","Actor",["Intérprete"]],["羊",null,"yáng","Oveja",["Cordero"]],["阳光","陽光","yángguāng","Sol",["Luz solar"]],["要是",null,"yàoshi","Si",["En caso de"]],["衣架",null,"yījià","Perchero",["Soporte"]],["一切",null,"yīqiè","Todo",["Totalidad"]],["已",null,"yǐ","Ya",["Ya mismo"]],["以来","以來","yǐlái","Desde",["Desde entonces"]],["一方面",null,"yīfāngmiàn","Por un lado",["Por una parte"]],["艺术","藝術","yìshù","Arte",["Bellas artes"]],["意外",null,"yìwài","Inesperado",["Accidente"]],["意义","意義","yìyì","Significado",["Importancia"]],["因此",null,"yīncǐ","Por lo tanto",["Así pues"]],["银","銀","yín","Plata",["Metal plateado"]],["银牌","銀牌","yínpái","Medalla de plata",["Segundo puesto"]],["印象",null,"yìnxiàng","Impresión",["Recuerdo"]],["应当","應當","yīngdāng","Deber",["Ought"]],["迎接",null,"yíngjiē","Recibir",["Dar la bienvenida"]],["营养","營養","yíngyǎng","Nutrición",["Alimentación"]],["赢","贏","yíng","Ganar",["Vencer"]],["影视","影視","yǐngshì","Cine y televisión",["Audiovisual"]],["应用","應用","yìngyòng","Aplicar",["Uso"]],["优点","優點","yōudiǎn","Ventaja",["Cualidad positiva"]],["优势","優勢","yōushì","Ventaja",["Superioridad"]],["由",null,"yóu","Por",["Desde"]],["由于","由於","yóuyú","Debido a",["A causa de"]],["邮件","郵件","yóujiàn","Correo",["Correspondencia"]],["邮票","郵票","yóupiào","Sello",["Estampilla"]],["邮箱","郵箱","yóuxiāng","Buzón",["Casilla"]],["游",null,"yóu","Viajar",["Pasear"]],["游戏","遊戲","yóuxì","Juego",["Entretenimiento"]],["游泳",null,"yóuyǒng","Nadar",["Natación"]],["有的是",null,"yǒudeshì","Hay de sobra",["Abunda"]],["有利",null,"yǒulì","Beneficioso",["Favorable"]],["有效",null,"yǒuxiào","Ser válido",["Eficaz"]],["预报","預報","yùbào","Prever",["Pronóstico"]],["预防","預防","yùfáng","Prevenir",["Evitar"]],["预计","預計","yùjì","Calcular",["Estimar"]],["预习","預習","yùxí","Estudiar con anticipación",["Repasar"]],["员","員","yuán (fúwùyuán)","Miembro",["Trabajador"]],["员工","員工","yuángōng","Empleado",["Personal"]],["愿望","願望","yuànwàng","Deseo",["Aspiración"]],["约","約","yuē","Acordar",["Cita"]],["乐队","樂隊","yuèduì","Banda musical",["Orquesta"]],["运输","運輸","yùnshū","Transportar",["Traslado"]],["杂志","雜誌","zázhì","Revista",["Publicación"]],["早已",null,"zǎoyǐ","Ya hace mucho",["Desde hace tiempo"]],["造",null,"zào","Hacer",["Construir"]],["造成",null,"zàochéng","Causar",["Provocar"]],["责任","責任","zérèn","Responsabilidad",["Deber"]],["增加",null,"zēngjiā","Aumentar",["Incrementar"]],["增长","增長","zēngzhǎng","Crecer",["Aumentar"]],["展开","展開","zhǎnkāi","Desarrollar",["Desplegar"]],["张","張","zhāng","Hoja",["Medido"]],["照",null,"zhào","Según",["Iluminar"]],["者",null,"zhě (zhìyuànzhě)","Persona",["-ista"]],["真实","真實","zhēnshí","Real",["Auténtico"]],["争","爭","zhēng","Competir",["Luchar"]],["争取","爭取","zhēngqǔ","Conseguir",["Luchar por"]],["整",null,"zhěng","Entero",["Completo"]],["整个","整個","zhěnggè","Todo",["Entero"]],["整理",null,"zhěnglǐ","Ordenar",["Clasificar"]],["整齐","整齊","zhěngqí","Ordenado",["Arreglado"]],["整体","整體","zhěngtǐ","Conjunto",["Totalidad"]],["整天",null,"zhěngtiān","Todo el día",["Jornada"]],["整整",null,"zhěngzhěng","Exactamente",["Precisamente"]],["正式",null,"zhèngshì","Oficial",["Formal"]],["证","證","zhèng","Certificado",["Documento"]],["证件","證件","zhèngjiàn","Documento",["Identificación"]],["证据","證據","zhèngjù","Evidencia",["Prueba"]],["证明","證明","zhèngmíng","Demostrar",["Prueba"]],["支",null,"zhī","Ramificación",["Medido"]],["支持",null,"zhīchí","Apoyar",["Respaldar"]],["支付",null,"zhīfù","Pagar",["Abonar"]],["直",null,"zhí","Directo",["Recto"]],["直播",null,"zhíbō","Transmitir en vivo",["Emisión"]],["直到",null,"zhídào","Hasta",["Hasta que"]],["值",null,"zhí","Valer",["Costar"]],["值得",null,"zhídé","Valer la pena",["Merecer"]],["职工","職工","zhígōng","Trabajador",["Empleado"]],["职业","職業","zhíyè","Profesión",["Ocupación"]],["只好",null,"zhǐhǎo","Tener que",["Verse obligado"]],["只是",null,"zhǐshì","Solo",["Únicamente"]],["只有",null,"zhǐyǒu","Solo",["Únicamente"]],["指",null,"zhǐ","Señalar",["Apuntar"]],["指出",null,"zhǐchū","Señalar",["Indicar"]],["指导","指導","zhǐdǎo","Guiar",["Asesorar"]],["至今",null,"zhìjīn","Hasta ahora",["Hasta el día de hoy"]],["至少",null,"zhìshǎo","Al menos",["Mínimo"]],["志愿","志願","zhìyuàn","Voluntad",["Deseo"]],["志愿者","志願者","zhìyuànzhě","Voluntario",["Colaborador"]],["制定",null,"zhìdìng","Elaborar",["Redactar"]],["制度",null,"zhìdù","Sistema",["Régimen"]],["制造","製造","zhìzào","Fabricar",["Producir"]],["制作","製作","zhìzuò","Hacer",["Elaborar"]],["中部",null,"zhōngbù","Centro",["Parte media"]],["中华民族","中華民族","Zhōnghuá Mínzú","Pueblo chino",["Nación china"]],["终于","終於","zhōngyú","Finalmente",["Al fin"]],["钟","鐘","zhōng","Reloj",["Campana"]],["种","種","zhǒng","Tipo",["Especie"]],["种子","種子","zhǒngzi","Semilla",["Grano"]],["重大",null,"zhòngdà","Importante",["Significativo"]],["周围","周圍","zhōuwéi","Alrededor",["Entorno"]],["猪","豬","zhū","Cerdo",["Cochino"]],["主持",null,"zhǔchí","Dirigir",["Moderar"]],["主动","主動","zhǔdòng","Proactivo",["Voluntario"]],["主任",null,"zhǔrèn","Director",["Jefe"]],["主意",null,"zhǔyi","Idea",["Plan"]],["主张","主張","zhǔzhāng","Defender",["Opinión"]],["注意",null,"zhùyì","Prestar atención",["Fijarse"]],["祝",null,"zhù","Desear",["Congratular"]],["抓",null,"zhuā","Agarrar",["Capturar"]],["抓住",null,"zhuāzhù","Agarrar",["Capturar"]],["专家","專家","zhuānjiā","Experto",["Especialista"]],["专门","專門","zhuānmén","Específico",["Especial"]],["专题","專題","zhuāntí","Tema específico",["Monográfico"]],["专业","專業","zhuānyè","Profesión",["Especialidad"]],["转","轉","zhuǎn","Girar",["Cambiar"]],["转变","轉變","zhuǎnbiàn","Transformar",["Cambiar"]],["状况","狀況","zhuàngkuàng","Situación",["Estado"]],["状态","狀態","zhuàngtài","Estado",["Condición"]],["追",null,"zhuī","Perseguir",["Seguir"]],["准","準","zhǔn","Exacto",["Permitido"]],["资格","資格","zīgé","Cualificación",["Requisito"]],["资金","資金","zījīn","Capital",null],["子女",null,"zǐnǚ","Hijos",null],["自从","自從","zìcóng","Desde",null],["自动","自動","zìdòng","Automático",null],["自觉","自覺","zìjué","Consciente",null],["自然",null,"zìrán","Naturaleza",null],["自身",null,"zìshēn","Mismo",null],["自主",null,"zìzhǔ","Autogestionar",null],["总","總","zǒng","Siempre",null],["总结","總結","zǒngjié","Resumir",null],["总是","總是","zǒngshì","Siempre",null],["足够","足夠","zúgòu","Ser suficiente",null],["足球",null,"zúqiú","Fútbol",null],["组合","組合","zǔhé","Combinar",null],["左右",null,"zuǒyòu","Aproximadamente",null],["作品",null,"zuòpǐn","Obra",null],["作者",null,"zuòzhě","Autor",null],["做客",null,"zuòkè","Visitar",null]],
'HSK4': [["阿姨",null,"āyí","Tía/ama",null],["矮",null,"ǎi","Bajo",null],["矮小",null,"ǎixiǎo","Bajo de estatura",null],["爱国","愛國","àiguó","Amar al país",null],["爱护","愛護","àihù","Cuidar",null],["安",null,"ān","Amperio (abreviatura de 培)",["Apellido un","(forma atada) calma; pacífico"]],["安置",null,"ānzhì","Alojó",["Instaló"]],["按时","按時","ànshí","A tiempo",["Puntual"]],["暗",null,"àn","Oscuro",null],["暗示",null,"ànshì","Indirectas",["Señales"]],["巴士",null,"bāshì","Bus",["Colectivo"]],["百货","百貨","bǎihuò","Mercancías",null],["摆","擺","bǎi","Mover de lado a lado",null],["摆动","擺動","bǎidòng","Oscilar",null],["摆脱","擺脫","bǎituō","Se libró",["Se deshizo de"]],["败","敗","bài","Perder",null],["办事","辦事","bànshì","Hacer trámites",null],["包裹",null,"bāoguǒ","Paquete",["Envolver"]],["包含",null,"bāohán","Incluir",null],["包括",null,"bāokuò","Incluir",null],["薄",null,"báo","Delgado",null],["宝","寶","bǎo","Tesoro",null],["宝宝","寶寶","bǎobao","Bebé",["Nene"]],["宝贝","寶貝","bǎobèi","Tesoro",null],["宝贵","寶貴","bǎoguì","Valioso",["Precioso"]],["宝石","寶石","bǎoshí","Gema",null],["保密",null,"bǎomì","Mantener en secreto",["Guardar secreto"]],["保守",null,"bǎoshǒu","Conservadoras",null],["抱",null,"bào","Abrazar",["Sostener (en brazos)","Acariciar (ideas)"]],["背景",null,"bèijǐng","Fondo",null],["倍",null,"bèi","Doble",null],["被迫",null,"bèipò","Ser obligado",null],["本科",null,"běnkē","Licenciatura",null],["笨",null,"bèn","Tonto",null],["比分",null,"bǐfēn","Marcador",null],["毕业","畢業","bìyè","Recibe",["Egresa"]],["毕业生","畢業生","bìyèshēng","Graduado",null],["避",null,"bì","Evitar",null],["避免",null,"bìmiǎn","Evitar",null],["编","編","biān","Tejer",null],["辩论","辯論","biànlùn","Debatir",null],["标志","標誌","biāozhì","Símbolo",null],["表情",null,"biǎoqíng","Expresión (facial)",null],["表扬","表揚","biǎoyáng","Elogiar",["Reconocimiento"]],["冰",null,"bīng","Hielo",null],["冰箱",null,"bīngxiāng","Refrigerador",null],["冰雪",null,"bīngxuě","Nieve y hielo",null],["兵",null,"bīng","Soldado",null],["不要紧","不要緊","bùyàojǐn","No importa",null],["不在乎",null,"bùzàihu","No importar",null],["不管",null,"bùguǎn","Sin importar",null],["不然",null,"bùrán","De lo contrario",null],["布置","佈置","bùzhì","Arreglado",["Decorado"]],["步行",null,"bùxíng","Caminar",null],["擦",null,"cā","Frotar",["Limpiar","Untar (crema)"]],["材料",null,"cáiliào","Material",["Datos","Madera de (para un oficio)"]],["财产","財產","cáichǎn","Propiedad",null],["财富","財富","cáifù","Riqueza",null],["采访","採訪","cǎifǎng","Entrevistar",null],["参考","參考","cānkǎo","Consultar",null],["参与","參與","cānyù","Participar",null],["操场","操場","cāochǎng","Cancha",["Patio de recreo"]],["操作",null,"cāozuò","Usar",["Manejar"]],["测","測","cè","Medir",null],["测量","測量","cèliáng","Medir",["Medición"]],["测试","測試","cèshì","Examinar",null],["曾",null,"céng","Apellido Zeng",["Una vez","Ya"]],["茶叶","茶葉","cháyè","Té",null],["产品","產品","chǎnpǐn","Producto",null],["长途","長途","chángtú","De larga distancia",null],["常识","常識","chángshí","Conocimiento básico",null],["唱片",null,"chàngpiàn","Disco",null],["抄",null,"chāo","Copiar",null],["抄写","抄寫","chāoxiě","Copiar",null],["潮",null,"cháo","Marea",null],["潮流",null,"cháoliú","Moda",["Tendencia"]],["潮湿","潮濕","cháoshī","Húmedo",null],["彻底","徹底","chèdǐ","Completo",null],["沉",null,"chén","Hundir",null],["沉默",null,"chénmò","Silencioso",null],["沉重",null,"chénzhòng","Pesado",["Apesadumbrados"]],["称赞","稱讚","chēngzàn","Elogiar",null],["成人",null,"chéngrén","Adulto",null],["诚实","誠實","chéngshí","Honesto",["Sincero"]],["诚信","誠信","chéngxìn","Honesto",null],["承担","承擔","chéngdān","Asumir",null],["承认","承認","chéngrèn","Admitir",["Reconocer"]],["承受",null,"chéngshòu","Soportar",null],["程序",null,"chéngxù","Programa",null],["吃惊","吃驚","chījīng","Sorprenderse",null],["迟到","遲到","chídào","Llegar tarde",null],["尺",null,"chǐ","Regla",null],["尺寸",null,"chǐcùn","Medida",null],["尺子",null,"chǐzi","Regla",null],["冲","衝","chōng","Hacia / hacia",null],["充电","充電","chōngdiàn","Cargar",null],["充电器","充電器","chōngdiànqì","Cargador",null],["充分",null,"chōngfèn","Amplio",["Suficiente","Pleno"]],["虫子","蟲子","chóngzi","Insecto",null],["抽",null,"chōu","Sacar",null],["抽奖","抽獎","chōujiǎng","Sortear",null],["抽烟","抽煙","chōuyān","Fumar",null],["出色",null,"chūsè","Sobresaliente",["Excelente"]],["出售",null,"chūshòu","Vender",null],["出席",null,"chūxí","Asistir",null],["处于","處於","chǔyú","Estar en (una situación)",null],["处","處","chù","Punto",["Lugar","Para lidiar con"]],["穿上",null,"chuānshang","Ponerse",null],["传统","傳統","chuántǒng","Tradicional",null],["窗户","窗戶","chuānghu","Ventana",["Ventanilla"]],["窗台","窗臺","chuāngtái","Alféizar",null],["窗子",null,"chuāngzi","Ventana",null],["春季",null,"chūnjì","Primavera",null],["纯","純","chún","Puro",null],["纯净水","純淨水","chúnjìngshuǐ","Agua pura",null],["词汇","詞彙","cíhuì","Vocabulario",null],["此",null,"cǐ","Este; estos",null],["此外",null,"cǐwài","Además",null],["刺",null,"cì","Espinas",null],["刺激",null,"cìjī","Estimular",null],["从此","從此","cóngcǐ","Desde ahora",null],["粗",null,"cū","Grueso",null],["粗心",null,"cūxīn","Descuidado",null],["促进","促進","cùjìn","Promueve",null],["促使",null,"cùshǐ","Impulsar",null],["促销","促銷","cùxiāo","Promocionar",null],["措施",null,"cuòshī","Medida",null],["答案",null,"dá'àn","Respuesta",null],["打败","打敗","dǎbài","Vencer",null],["打雷",null,"dǎléi","Tronar",null],["打扫","打掃","dǎsǎo","Limpiar",["Barrer"]],["打折",null,"dǎzhé","Descuento",["Rebaja"]],["打针","打針","dǎzhēn","Inyectar",null],["大巴",null,"dàbā","Autobús",null],["大多",null,"dàduō","La mayoría",null],["大方",null,"dàfang","Generoso",["De buen gusto","Desenvuelto"]],["大哥",null,"dàgē","Hermano mayor",null],["大规模","大規模","dà guīmó","A gran escala",null],["大会","大會","dàhuì","Asamblea",null],["大姐",null,"dàjiě","Hermana mayor",null],["大楼","大樓","dà lóu","Edificio",null],["大陆","大陸","dàlù","Continente",null],["大妈","大媽","dàmā","Señora mayor",null],["大型",null,"dàxíng","Grande",null],["大爷","大爺","dàye","Señor mayor",null],["大众","大眾","dàzhòng","Público",null],["代替",null,"dàitì","Reemplazar",null],["待遇",null,"dàiyù","Salario",null],["袋",null,"dài","Bolsa",null],["戴",null,"dài","Llevar",null],["担保","擔保","dānbǎo","Garantizo",["Aseguro"]],["担任","擔任","dānrèn","Desempeñar",null],["担心","擔心","dānxīn","Preocupa",null],["单","單","dān","Número impar",["Lista","Forma"]],["单纯","單純","dānchún","Simple",null],["单调","單調","dāndiào","Monótono",null],["单独","單獨","dāndú","Solo",null],["淡",null,"dàn","Tenue/insípido",null],["导游","導遊","dǎoyóu","Guía",null],["导致","導致","dǎozhì","Causar",null],["倒闭","倒閉","dǎobì","Quebró",["Cerró"]],["倒车","倒車","dǎochē","Dar marcha atrás",null],["得意",null,"déyì","Satisfecho/encantado",null],["灯光","燈光","dēngguāng","Luces",["Iluminación"]],["登",null,"dēng","Subir",null],["登记","登記","dēngjì","Registrar",null],["登录","登錄","dēnglù","Iniciar sesión",null],["登山",null,"dēngshān","Alpinismo",["Subir (una montaña)"]],["的确","的確","díquè","Realmente / ciertamente",null],["敌人","敵人","dírén","Enemigo",null],["底",null,"dǐ","Abajo",["Restos","(matemáticas) raíz"]],["地面",null,"dìmiàn","Piso",["Suelo","Superficie"]],["地位",null,"dìwèi","Posición",null],["地下",null,"dìxià","Subsuelo",null],["地址",null,"dìzhǐ","Dirección",null],["典型",null,"diǎnxíng","Ejemplar / típico",null],["点名","點名","diǎnmíng","Llamar nombres",null],["电灯","電燈","diàndēng","Bombilla",null],["电动车","電動車","diàndòngchē","Bicicleta eléctrica",null],["电梯","電梯","diàntī","Ascensor",["Escalera mecánica"]],["电源","電源","diànyuán","Fuente de energía",null],["顶","頂","dǐng","Cima / alcanzar / cubrir",null],["定",null,"dìng","Decidir",["Establecer","Para determinar"]],["冬季",null,"dōngjì","Invierno",null],["动画片","動畫片","dònghuàpiàn","Dibujo animado",null],["动摇","動搖","dòngyáo","Vacilar",null],["豆腐",null,"dòufu","Tofu",null],["独立","獨立","dúlì","Independizarse",null],["独特","獨特","dútè","Único",null],["独自","獨自","dúzì","Solo",null],["堵",null,"dǔ","Atascar",null],["堵车","堵車","dǔchē","Tráfico",null],["肚子",null,"dùzi","Estómago",null],["度过","度過","dùguò","Pasar",null],["锻炼","鍛鍊","duànliàn","Entrenar",["Hacer ejercicio"]],["对比","對比","duìbǐ","Comparar / contraste",null],["对付","對付","duìfu","Hacer frente",null],["对于","對於","duìyú","Con respecto",null],["多次",null,"duō cì","Varias veces",null],["多年",null,"duō nián","Muchos años",null],["多样","多樣","duōyàng","Variado",null],["多种","多種","duō zhǒng","Varios",null],["恶心","噁心","ěxin","Asqueroso / sentir náuseas",null],["儿童","兒童","értóng","Niño",null],["而",null,"ér","Así como",["Y entonces","(indica cambio de estado)"]],["而是",null,"ér shì","Sino (… en lugar de …)",null],["耳机","耳機","ěrjī","Audífono",null],["二手",null,"èrshǒu","De segunda mano",null],["发挥","發揮","fāhuī","Desarrollar",null],["发票","發票","fāpiào","Factura",null],["发烧","發燒","fāshāo","Tener fiebre",null],["法",null,"fǎ","Forma",["Antigua variante de 法","Francia"]],["法官",null,"fǎguān","Juez",null],["法律",null,"fǎlǜ","Ley",null],["法院",null,"fǎyuàn","Tribunal",null],["翻",null,"fān","Voltear",null],["翻译","翻譯","fānyì","Traducir / traducción",null],["烦","煩","fán","Superfluo y confuso",["Molestar","Tenso"]],["反",null,"fǎn","Abbr. para el sistema fonético",["Marcha atrás","Revertir"]],["反而",null,"fǎn'ér","Por el contrario",null],["反映",null,"fǎnyìng","Refleja",null],["方",null,"fāng","Cuadrado",["Dirección"]],["方案",null,"fāng'àn","Plan",["Propuesta"]],["方针","方針","fāngzhēn","Línea",null],["放松","放鬆","fàngsōng","Relajarse",["Aflojar","Soltar"]],["非",null,"fēi","No-",["Prefijo de negación","Sin"]],["肥",null,"féi","Gordo",null],["分布","分佈","fēnbù","Distribuir",null],["分散",null,"fēnsàn","Dispersar / disperso",null],["分手",null,"fēnshǒu","Separarse",null],["分为","分為","fēnwéi","Dividirse en",null],["…分之…",null,"…fēn zhī…","Por cada",null],["纷纷","紛紛","fēnfēn","Uno tras otro",["Sin cesar"]],["奋斗","奮鬥","fèndòu","Luchando",null],["风格","風格","fēnggé","Estilo",null],["风景","風景","fēngjǐng","Paisaje",null],["风俗","風俗","fēngsú","Costumbre",null],["封闭","封閉","fēngbì","Cerrar / cerrado",null],["否则","否則","fǒuzé","De lo contrario",null],["夫妇","夫婦","fūfù","Pareja",null],["夫妻",null,"fūqī","Esposos",null],["夫人",null,"fūrén","Señora",null],["符号","符號","fúhào","Símbolo",null],["符合",null,"fúhé","Cumple",null],["付出",null,"fùchū","Pagar",["Invertir (esfuerzo, tiempo)"]],["负担","負擔","fùdān","Cargar / carga",null],["附近",null,"fùjìn","Cerca",["Cercanía"]],["复制","複製","fùzhì","Copiar",null],["改善",null,"gǎishàn","Mejorar",null],["改正",null,"gǎizhèng","Corregir",null],["盖","蓋","gài","Tapar",null],["概括",null,"gàikuò","Resumir / general",null],["感兴趣","感興趣","gǎn xìngqù","Estar interesado (en algo)",null],["高潮",null,"gāocháo","Clímax",null],["高价","高價","gāojià","Precio alto",null],["高尚",null,"gāoshàng","Noble",null],["高铁","高鐵","gāotiě","Tren bala",["Tren de alta velocidad"]],["格外",null,"géwài","Especialmente",null],["隔",null,"gé","Separar",null],["隔开","隔開","gékāi","Separar",null],["个别","個別","gèbié","Individual",null],["个体","個體","gètǐ","Individuo",null],["各个","各個","gègè","Cada",null],["根",null,"gēn","Radical (química)",["Raíz","Base"]],["根据","根據","gēnjù","Según",null],["工程",null,"gōngchéng","Obra",["Proyecto","Ingeniería"]],["公元",null,"gōngyuán","Era cristiana",null],["供应","供應","gōngyìng","Suministrar",null],["共",null,"gòng","En total",["General","Compartir"]],["构成","構成","gòuchéng","Constituir",null],["构造","構造","gòuzào","Estructura",null],["购买","購買","gòumǎi","Comprar",null],["购物","購物","gòuwù","Hacer compras",null],["骨头","骨頭","gǔtou","Hueso",null],["固定",null,"gùdìng","Fijo / fijar",null],["瓜",null,"guā","Sandía",null],["怪",null,"guài","Extraño",["Bastante","Monstruo"]],["关闭","關閉","guānbì","Cerrar",null],["关于","關於","guānyú","Sobre",null],["官",null,"guān","Funcionario",null],["官方",null,"guānfāng","Oficial",["Autoridades"]],["光临","光臨","guānglín","Visitar",null],["光盘","光盤","guāngpán","Disco compacto",null],["逛",null,"guàng","Pasear",null],["归","歸","guī","Volver",null],["规律","規律","guīlǜ","Ley",null],["规模","規模","guīmó","Escala",null],["规则","規則","guīzé","Regla / regular",null],["果实","果實","guǒshí","Fruto",null],["过分","過分","guòfèn","Excesivo",null],["海水",null,"hǎishuǐ","Agua de mar",null],["海鲜","海鮮","hǎixiān","Mariscos",null],["含",null,"hán","Contener",null],["含量",null,"hánliàng","Contenido",null],["含义","含義","hányì","Significado",null],["含有",null,"hányǒu","Contener",["Incluir"]],["寒假",null,"hánjià","Vacaciones de invierno",null],["寒冷",null,"hánlěng","Frío",null],["行业","行業","hángyè","Sector",null],["航班",null,"hángbān","Vuelo",null],["航空",null,"hángkōng","Aviación",null],["毫米",null,"háomǐ","Milímetro",null],["毫升",null,"háoshēng","Mililitro",null],["好友",null,"hǎoyǒu","Buen amigo",null],["号码","號碼","hàomǎ","Número",null],["合同",null,"hétóng","Contrato",null],["黑暗",null,"hēi'àn","Oscuro",null],["红包","紅包","hóngbāo","Sobre rojo",null],["后头","後頭","hòutou","Detrás",null],["厚",null,"hòu","Grueso",null],["呼吸",null,"hūxī","Respirar",null],["忽视","忽視","hūshì","Ignorar",null],["户","戶","hù","Hogar",null],["护士","護士","hùshi","Enfermero",null],["划",null,"huá","Remar",["Trazo de un carácter chino","Vale la pena (hacer algo)"]],["怀念","懷念","huáiniàn","Añorar",null],["怀疑","懷疑","huáiyí","Dudar",null],["缓解","緩解","huǎnjiě","Aliviar",["Mitigar"]],["黄瓜","黃瓜","huángguā","Pepino",null],["黄金","黃金","huángjīn","Oro",null],["回复","回復","huífù","Responder",null],["汇","匯","huì","Reunir",null],["汇报","匯報","huìbào","Informar / informe",null],["汇率","匯率","huìlǜ","Tipo de cambio",null],["婚礼","婚禮","hūnlǐ","Boda",["Casamiento"]],["伙","夥","huǒ","Socio",null],["伙伴",null,"huǒbàn","Compañero",null],["或许","或許","huòxǔ","Quizás / tal vez",null],["货","貨","huò","Mercancía",["Goods"]],["获","獲","huò","Obtener",null],["获得","獲得","huòdé","Obtener",["Conseguir","Recibir"]],["获奖","獲獎","huòjiǎng","Ganar un premio",["Premiado"]],["获取","獲取","huòqǔ","Conseguir",null],["几乎","幾乎","jīhū","Casi",["Prácticamente"]],["机构","機構","jīgòu","Organización",null],["机遇","機遇","jīyù","Oportunidad",null],["积累","積累","jīlěi","Acumular",null],["激动","激動","jīdòng","Emocionado /激动",null],["激烈",null,"jīliè","Intenso",["Feroz","Agudo (dolor)"]],["及格",null,"jígé","Aprobé",["Aprobe"]],["极","極","jí","Arriba",["Mayor","Extremadamente"]],["极其","極其","jíqí","Extremadamente",null],["即将","即將","jíjiāng","A punto de",null],["急忙",null,"jímáng","Apresuradamente",null],["集合",null,"jíhé","Juntamos",null],["记载","記載","jìzǎi","Registrar",null],["纪律","紀律","jìlǜ","Disciplina",null],["技巧",null,"jìqiǎo","Habilidad",null],["季",null,"jì","Estación",null],["季度",null,"jìdù","Trimestre",null],["季节","季節","jìjié","Estación (del año)",["Época"]],["既",null,"jì","Ya que / tanto",null],["既然",null,"jìrán","Ya",null],["寄",null,"jì","Enviar",null],["加班",null,"jiābān","Hacer horas extra",null],["加入",null,"jiārù","Unirse",null],["加油站",null,"jiāyóuzhàn","Gasolinera",null],["家务","家務","jiāwù","Quehaceres (de la casa)",["Tareas domésticas"]],["假如",null,"jiǎrú","Si",null],["坚固","堅固","jiāngù","Sólido",null],["检测","檢測","jiǎncè","Detectar",null],["减","減","jiǎn","Bajar",["Disminuir","Restar"]],["减肥","減肥","jiǎnféi","Adelgazar",null],["减少","減少","jiǎnshǎo","Disminuir",null],["简历","簡歷","jiǎnlì","Currículum",null],["健身",null,"jiànshēn","Ejercitarse",["Gimnasio","Ponerse en forma"]],["渐渐","漸漸","jiànjiàn","Gradualmente",null],["江",null,"jiāng","Río",null],["讲究","講究","jiǎngjiu","Importar / elegante",null],["讲座","講座","jiǎngzuò","Conferencia",null],["奖","獎","jiǎng","Premiar / premio",null],["奖金","獎金","jiǎngjīn","Premio (en dinero)",["Bono"]],["奖学金","獎學金","jiǎngxuéjīn","Beca",null],["降",null,"jiàng","Bajar",["Caer","Descender (jiàng)"]],["降低",null,"jiàngdī","Bajar",["Reducir"]],["降价","降價","jiàngjià","Rebajar",null],["降落",null,"jiàngluò","Aterrizar",null],["降温","降溫","jiàngwēn","Enfriar",null],["交换","交換","jiāohuàn","Intercambiar",["Intercambio"]],["交际","交際","jiāojì","Socializar",null],["教授",null,"jiàoshòu","Enseñar (jiāo)",["Profesor universitario (jiào)"]],["教训","教訓","jiàoxùn","Aprender / lección",null],["阶段","階段","jiēduàn","Etapa",null],["街道",null,"jiēdào","Calle",null],["节省","節省","jiéshěng","Ahorrar",null],["结","結","jié","Atar",["Robusto","Nudo"]],["结构","結構","jiégòu","Estructura",null],["结论","結論","jiélùn","Conclusión",null],["姐妹",null,"jiěmèi","Hermanas",null],["解释","解釋","jiěshì","Explicar",null],["尽快","儘快","jǐnkuài","Lo antes posible",["Cuanto antes"]],["紧密","緊密","jǐnmì","Apretado",null],["尽力","盡力","jìnlì","Hacer lo posible",["Esforzarse al máximo"]],["进口","進口","jìnkǒu","Importar / entrada",null],["近代",null,"jìndài","Época moderna",null],["禁止",null,"jìnzhǐ","Prohibir",null],["经典","經典","jīngdiǎn","Clásico",null],["精力",null,"jīnglì","Energía",null],["竟然",null,"jìngrán","Increíblemente",null],["镜头","鏡頭","jìngtóu","Lente",null],["镜子","鏡子","jìngzi","Espejo",null],["究竟",null,"jiūjìng","Al fin y al cabo",["En realidad","(interrog.) exactamente"]],["酒吧",null,"jiǔbā","Bar",null],["居民",null,"jūmín","Residente",null],["居住",null,"jūzhù","Vivir",null],["局",null,"jú","Oficina",["Situación","Juego"]],["巨大",null,"jùdà","Enorme",["Gigantesco"]],["具备","具備","jùbèi","Tener",null],["距离","距離","jùlí","Distancia / alejar",null],["聚",null,"jù","Reunirse",["Juntar"]],["聚会","聚會","jùhuì","Reunirse / reunión",null],["卷",null,"juǎn","Tomo",null],["角色",null,"juésè","Personaje",null],["开花","開花","kāihuā","Florecer",null],["开水","開水","kāishuǐ","Agua hervida",null],["看不起",null,"kànbuqǐ","Despreciar",null],["看来","看來","kànlái","Parece que",null],["看望",null,"kànwàng","Visitar",null],["考察",null,"kǎochá","Investigar / inspección",null],["考虑","考慮","kǎolǜ","Considerar",["Pensar bien"]],["棵",null,"kē","Árbol",null],["可见","可見","kějiàn","Por lo tanto",null],["空间","空間","kōngjiān","Espacio",null],["口袋",null,"kǒudai","Bolsillo",["Bolsa"]],["口语","口語","kǒuyǔ","Lengua hablada",["Coloquial"]],["苦",null,"kǔ","Dolor",["Sufrir","Amargo"]],["会计","會計","kuàijì","Contador",null],["快递","快遞","kuàidì","Mensajería",null],["宽","寬","kuān","Ancho",null],["宽广","寬廣","kuānguǎng","Amplio",null],["矿泉水","礦泉水","kuàngquánshuǐ","Agua mineral",null],["扩大","擴大","kuòdà","Ampliar",null],["扩展","擴展","kuòzhǎn","Extender",null],["括号","括號","kuòhào","Paréntesis",null],["垃圾",null,"lājī","Basura",null],["拉开","拉開","lākāi","Abrir",null],["辣",null,"là","Picante",null],["来不及","來不及","láibují","No tener tiempo",null],["来得及","來得及","láidejí","Tener tiempo",null],["来源","來源","láiyuán","Origen",null],["老公",null,"lǎogōng","Esposo",null],["老家",null,"lǎojiā","Pueblo natal",null],["老婆",null,"lǎopo","Esposa",null],["老实","老實","lǎoshi","Honesto",null],["乐趣","樂趣","lèqù","Placer",null],["泪","淚","lèi","Lágrima",null],["泪水","淚水","lèishuǐ","Lágrimas",null],["类型","類型","lèixíng","Tipo",null],["冷静","冷靜","lěngjìng","Tranquilo",["Con la cabeza fría"]],["厘米","釐米","límǐ","Centímetro",null],["离不开","離不開","lí bu kāi","No poder separarse",null],["力气","力氣","lìqi","Fuerza",null],["历史","歷史","lìshǐ","Historia",null],["立即",null,"lìjí","Inmediatamente",null],["利息",null,"lìxī","Interés",null],["利益",null,"lìyì","Beneficio",null],["俩","倆","liǎ","Dos",null],["良好",null,"liánghǎo","Bueno",["Favorable"]],["量",null,"liáng","Abbr. para 量词, clasificador (en gramática china)",["Estimar","Cantidad"]],["粮食","糧食","liángshi","Alimentos",["Cereal","Grano"]],["两边","兩邊","liǎngbiān","Ambos lados",null],["疗养","療養","liáoyǎng","Recuperarse",null],["了不起",null,"liǎobuqǐ","Impresionante",null],["了解",null,"liǎojiě","Entender",["Conocer","Informarse"]],["列",null,"liè","Fila",["Columna","Enumerar"]],["列车","列車","lièchē","Tren",null],["列入",null,"lièrù","Incluir",null],["列为","列為","lièwéi","Clasificar como",null],["临时","臨時","línshí","Provisorio",["A último momento"]],["零食",null,"língshí","Snack",null],["流传","流傳","liúchuán","Circular",null],["楼梯","樓梯","lóutī","Escalera",null],["陆地","陸地","lùdì","Tierra",null],["陆续","陸續","lùxù","Sucesivamente",null],["录取","錄取","lùqǔ","Admitir",null],["律师","律師","lǜshī","Abogado",null],["轮","輪","lún","Turno/fase",null],["轮船","輪船","lúnchuán","Barco",null],["轮椅","輪椅","lúnyǐ","Silla de ruedas",null],["轮子","輪子","lúnzi","Rueda",null],["论文","論文","lùnwén","Tesina",["Trabajo académico","Artículo"]],["落",null,"luò","Estar desaparecido",["Dejar atrás u olvidar traer","Asentamiento"]],["毛巾",null,"máojīn","Toalla",null],["毛衣",null,"máoyī","Sweater",["Suéter"]],["帽子",null,"màozi","Gorro",null],["没错","沒錯","méi cuò","Correcto",null],["没法儿","沒法兒","méifǎr","No poder",null],["没想到","沒想到","méi xiǎngdào","No esperado",null],["美金",null,"měijīn","Dólar",["Divisa"]],["美女",null,"měinǚ","Mujer hermosa",["Chica guapa"]],["梦","夢","mèng","Sueño",["Sueño, ilusión"]],["梦见","夢見","mèngjiàn","Soñar con",["Tener un sueño"]],["梦想","夢想","mèngxiǎng","Sueño",["Soñar con"]],["秘密",null,"mìmì","Secreto",["Confidencial"]],["秘书","秘書","mìshū","Secretario/a",["Asistente"]],["密",null,"mì","Denso/apretado",["Tupido"]],["密码","密碼","mìmǎ","Contraseña",["Código"]],["密切",null,"mìqiè","Cercano/estrecho",["Íntimo"]],["免费","免費","miǎnfèi","Gratis",null],["面临","面臨","miànlín","Enfrentar",["Confrontar"]],["面试","面試","miànshì","Entrevista (laboral)",["Entrevistar"]],["描述",null,"miáoshù","Describir",["Representar"]],["描写","描寫","miáoxiě","Describir",["Retrato","Descripción"]],["名牌儿","名牌兒","míngpáir","Marca famosa",["Marca conocida"]],["名片",null,"míngpiàn","Tarjeta de visita",["Ficha"]],["名人",null,"míngrén","Persona famosa",["Celebridad"]],["摸",null,"mō","Tocar",["Palpar"]],["模特儿","模特兒","mótèr","Modelo",["Maniquí"]],["模型",null,"móxíng","Modelo",["Maqueta"]],["末",null,"mò","Polvo",["Detalle no esencial","Fin"]],["默默",null,"mòmò","Silenciosamente",["Calladamente"]],["哪怕",null,"nǎpà","Incluso",null],["男女",null,"nánnǚ","Hombres y mujeres",["Sexos"]],["男士",null,"nánshì","Caballero",["Hombre"]],["难免","難免","nánmiǎn","Difícil de evitar",["Inevitablemente"]],["脑袋","腦袋","nǎodai","Cabeza",["Cerebro"]],["闹","鬧","nào","Ruidoso/pelearse",["Molestar"]],["闹钟","鬧鐘","nàozhōng","Despertador",["Alarma"]],["内部","內部","nèibù","Interior",["Dentro"]],["内科","內科","nèikē","Medicina interna",["Clínica"]],["能干","能幹","nénggàn","Capaz/hábil",["Competente"]],["宁静","寧靜","níngjìng","Tranquilo/sereno",["Pacífico"]],["浓","濃","nóng","Espeso/intenso",["Concentrado"]],["女士",null,"nǚshì","Señora/dama",["Mujer"]],["暖气","暖氣","nuǎnqì","Calefacción",["Calefactor"]],["拍照",null,"pāizhào","Sacar fotos",["Fotografiar"]],["排列",null,"páiliè","Ordenar",["Colocar en fila","Permutación"]],["牌",null,"pái","Piezas de juego",["Letrero","Tableta"]],["盘","盤","pán","Servir",["Ofrecer"]],["盘子","盤子","pánzi","Plato",["Fuente"]],["胖子",null,"pàngzi","Persona gorda",["Obeso"]],["培训","培訓","péixùn","Capacitar",["Instruir"]],["培训班","培訓班","péixùnbān","Curso de capacitación",["Clase"]],["培养","培養","péiyǎng","Cultivar/educar",["Formar"]],["培育",null,"péiyù","Criar/cultivar",["Nutrir"]],["批",null,"pī","Criticar",["Actuar sobre"]],["片面",null,"piànmiàn","Unilateral/parcial",["Sesgado"]],["品质","品質","pǐnzhì","Calidad",["Característica"]],["平方",null,"píngfāng","Metro cuadrado",["Cuadrado"]],["平静","平靜","píngjìng","Tranquilo/sereno",["Pacífico"]],["平均",null,"píngjūn","Promediar/igual",["Equitativo"]],["平稳","平穩","píngwěn","Estable/sereno",["Constante"]],["迫切",null,"pòqiè","Urgente/imprescindible",["Apremiante"]],["破产","破產","pòchǎn","Quebrar",["Irse a la quiebra"]],["妻子",null,"qīzi","Esposa",["Mujer"]],["期待",null,"qīdài","Esperar",["Aguardar"]],["期间","期間","qījiān","Durante",["En el lapso"]],["期末",null,"qīmò","Final de período",["Fin de curso"]],["期限",null,"qīxiàn","Plazo",["Fecha límite"]],["期中",null,"qīzhōng","Medio período",["Mitad de curso"]],["其余","其餘","qíyú","El resto",["Los demás"]],["企业","企業","qǐyè","Empresa",["Compañía"]],["气球","氣球","qìqiú","Globo",["Pelota"]],["汽水",null,"qìshuǐ","Refresco",["Gaseosa"]],["汽油",null,"qìyóu","Gasolina",["Nafta"]],["器官",null,"qìguān","Órgano",["Miembro"]],["前头","前頭","qiántou","Adelante/frente",["Por delante"]],["前途",null,"qiántú","Futuro",["Porvenir"]],["浅","淺","qiǎn","Poco profundo/ligero",["Superficial"]],["巧克力",null,"qiǎokèlì","Chocolate",["Bombón"]],["切",null,"qiē","(forma encuadernada) ansioso",["Corresponder a","(matemáticas) tangencial"]],["亲爱","親愛","qīn'ài","Querido",["Estimado (亲爱的)"]],["亲密","親密","qīnmì","Íntimo/cercano",["Familiar"]],["青春",null,"qīngchūn","Juventud",["Adolescencia"]],["轻松","輕鬆","qīngsōng","Relajado",["Ligero","Fácil"]],["轻易","輕易","qīngyì","Fácilmente",["Sin dificultad"]],["清醒",null,"qīngxǐng","Despierto/consciente",["Lúcido"]],["情景",null,"qíngjǐng","Escena",["Situación"]],["穷","窮","qióng","Pobre",["Agotar","A fondo"]],["穷人","窮人","qióngrén","Persona pobre",["Necesitado"]],["秋季",null,"qiūjì","Otoño",["Estación de otoño"]],["趋势","趨勢","qūshì","Tendencia",["Rumbo"]],["圈",null,"quān","Círculo",["Figura cerrada"]],["权利","權利","quánlì","Derecho (entitlement)",["Derechos"]],["却","卻","què","Pero/sin embargo",null],["确认","確認","quèrèn","Confirmar",["Verificar"]],["然而",null,"rán'ér","Sin embargo",["No obstante"]],["燃料",null,"ránliào","Combustible",["Carburante"]],["燃烧","燃燒","ránshāo","Quemar/arder",["Incendiarse"]],["热闹","熱鬧","rènao","Animado",["Bullicioso","Concurrido"]],["热心","熱心","rèxīn","Entusiasta",["Afable","Cordial"]],["人家",null,"rénjia","Otra gente/otros",["Alguien más"]],["日记","日記","rìjì","Diario",["Bitácora"]],["日历","日曆","rìlì","Calendario",["Almanaque"]],["如今",null,"rújīn","Ahora",["Actualmente"]],["弱",null,"ruò","Débil/tenue",["Frágil"]],["伞","傘","sǎn","Paraguas",["Sombrilla"]],["散",null,"sàn","Disipar",["Romper (una reunión, etc.)","(coloc.) despedir"]],["扫","掃","sǎo","Barrer",["Limpiar","Barrer con la mirada"]],["色",null,"sè","Color",["Apariencia","Sexo"]],["色彩",null,"sècǎi","Color",["Tonalidad"]],["森林",null,"sēnlín","Bosque",["Selva"]],["晒","曬","shài","Exponer al sol/secar",["Broncearse"]],["闪","閃","shǎn","Brillar/parpadear",["Relucir"]],["闪电","閃電","shǎndiàn","Rayo",["Relámpago"]],["善良",null,"shànliáng","Bueno/bondadoso",["Amable"]],["善于","善於","shànyú","Ser bueno en",["Tener talento para"]],["伤害","傷害","shānghài","Dañar/hacer daño",["Perjudicar"]],["商务","商務","shāngwù","Negocios/comercio",["Mercantil"]],["赏","賞","shǎng","Recompensar",["Premiar"]],["上个月","上個月","shàng ge yuè","El mes pasado",["El último mes"]],["上楼","上樓","shàng lóu","Subir (las escaleras, el piso)",null],["上门","上門","shàngmén","Ir a casa de alguien",["Visitar"]],["烧","燒","shāo","Quemar/ferviente",["Calentar"]],["设施","設施","shèshī","Instalaciones",["Equipamiento"]],["设置","設置","shèzhì","Establecer/instalar",["Configurar"]],["申请","申請","shēnqǐng","Solicitar/pedir",null],["身材",null,"shēncái","Físico",["Complexión"]],["身份",null,"shēnfèn","Identidad",["Estatus","Papel"]],["身高",null,"shēngāo","Estatura",["Altura"]],["深厚",null,"shēnhòu","Profundo/fuerte",["Intenso"]],["神话","神話","shénhuà","Mitología",["Leyenda"]],["神秘",null,"shénmì","Misterioso/enigmático",["Secreto"]],["甚至",null,"shènzhì","Incluso",["Hasta"]],["失败","失敗","shībài","Fracasar",["Fallar","Derrota"]],["失望",null,"shīwàng","Decepcionado",["Frustrado"]],["失业","失業","shīyè","Perder el trabajo",["Quedarse sin empleo"]],["诗","詩","shī","Poesía",["Poema"]],["诗人","詩人","shīrén","Poeta",null],["湿","濕","shī","Húmedo",["Mojado"]],["实施","實施","shíshī","Implementar/poner en práctica",["Ejecutar"]],["实用","實用","shíyòng","Práctico/útil",["Funcional"]],["食堂",null,"shítáng","Comedor",["Cantina"]],["使劲","使勁","shǐjìn","Esforzarse",["Esforzarse al máximo"]],["士兵",null,"shìbīng","Soldado",null],["市区","市區","shìqū","Centro de la ciudad",["Zona urbana"]],["似的",null,"shìde","Como si",["Parecer"]],["事物",null,"shìwù","Cosa",["Asunto"]],["事先",null,"shìxiān","De antemano",["Previamente"]],["试卷","試卷","shìjuàn","Examen",["Prueba"]],["是否",null,"shìfǒu","Si/no",["Siquiera"]],["收回",null,"shōuhuí","Recuperar",["Retractar"]],["收获","收穫","shōuhuò","Cosechar/beneficio",["Obtener"]],["收益",null,"shōuyì","Beneficio",["Ganancia"]],["手工",null,"shǒugōng","Artesanía",null],["手里","手裡","shǒu li","En la mano",null],["手术","手術","shǒushù","Operación (quirúrgica)",["Cirugía"]],["手套",null,"shǒutào","Guante",null],["守",null,"shǒu","Guardar",null],["首",null,"shǒu","Cabeza",["Jefe","Primero (ocasión, cosa, etc.)"]],["受不了",null,"shòubuliǎo","Aguantar",null],["售货员","售貨員","shòuhuòyuán","Vendedor",null],["叔叔",null,"shūshu","Tío",["Padre hermano"]],["舒适","舒適","shūshì","Cómodo",["Agradable"]],["熟练","熟練","shúliàn","Experto",["Hábil"]],["暑假",null,"shǔjià","Vacaciones de verano",["Periodo vacacional"]],["树林","樹林","shùlín","Bosque",["Arbolado"]],["树叶","樹葉","shùyè","Hojas (de árbol)",null],["数据","數據","shùjù","Datos",["Cifras"]],["数码","數碼","shùmǎ","Digital",["Numérico"]],["刷",null,"shuā","Frotar",["Limpiar"]],["刷牙",null,"shuā yá","Cepillarse los dientes",["Lavar dientes"]],["刷子",null,"shuāzi","Cepillo",["Brocha"]],["帅","帥","shuài","Guapo",["Atractivo"]],["帅哥","帥哥","shuàigē","Hombre guapo",["Chico apuesto"]],["率先",null,"shuàixiān","Primero",["Pionero"]],["睡着","睡著","shuìzháo","Dormirse",["Conciliar sueño"]],["顺序","順序","shùnxù","Orden",["Secuencia"]],["说不定","說不定","shuōbudìng","Quizás",["Tal vez"]],["说服","說服","shuōfú","Convencer",["Persuadir"]],["思考",null,"sīkǎo","Pensar",["Reflexionar"]],["似乎",null,"sìhū","Parece",["Parece que"]],["松","鬆","sōng","Suelto",["Flojo"]],["松树","松樹","sōngshù","Pino",["Árbol de pino"]],["塑料",null,"sùliào","Plástico",["Material sintético"]],["塑料袋",null,"sùliàodài","Bolsa de plástico",["Envase plástico"]],["酸",null,"suān","Agrio",["Ácido"]],["酸奶",null,"suānnǎi","Yogur",["Leche fermentada"]],["随手","隨手","suíshǒu","Fácilmente",["Al pasar"]],["孙女","孫女","sūnnǚ","Nieta",["Descendiente femenino"]],["孙子","孫子","sūnzi","Nieto",["Descendiente masculino"]],["缩短","縮短","suōduǎn","Acortar",["Reducir"]],["缩小","縮小","suōxiǎo","Reducir",["Disminuir"]],["台阶","臺階","táijiē","Escalón",["Grada"]],["台上","臺上","táishàng","Sobre el escenario",["En el estrado"]],["躺",null,"tǎng","Acostarse",["Estar tumbado"]],["套餐",null,"tàocān","Menú",["Combo"]],["特价","特價","tèjià","Oferta",["Precio especial"]],["特殊",null,"tèshū","Especial",["Único"]],["特征","特徵","tèzhēng","Característica",["Rasgo"]],["提供",null,"tígōng","Ofrecer",["Suministrar"]],["提醒",null,"tíxǐng","Avisame",["Avisá"]],["体操","體操","tǐcāo","Gimnasia",["Ejercicio físico"]],["体检","體檢","tǐjiǎn","Chequeo médico",["Revisión médica"]],["体重","體重","tǐzhòng","Peso corporal",["Masa corporal"]],["替",null,"tì","En lugar de",["Por"]],["替代",null,"tìdài","Reemplazar",["Sustituir"]],["天真",null,"tiānzhēn","Inocente",["Puro"]],["填",null,"tián","Llenar",["Rellenar"]],["填空",null,"tiánkòng","Completar espacios",["Rellenar huecos"]],["挑",null,"tiāo","Levantar",["Alzar"]],["挑选","挑選","tiāoxuǎn","Elegir",["Escoger"]],["调皮","調皮","tiáopí","Travieso",["Juguetón"]],["挑战","挑戰","tiǎozhàn","Desafiar",["Retar"]],["贴","貼","tiē","Pegar",["Adosar","Publicar (en un blog)"]],["停下",null,"tíngxia","Detenerse",["Parar"]],["通知书","通知書","tōngzhīshū","Notificación",["Carta de admisión"]],["同情",null,"tóngqíng","Compadecerse",["Sentir lástima"]],["童话","童話","tónghuà","Cuento de hadas",["Narración infantil"]],["童年",null,"tóngnián","Infancia",["Niñez"]],["统计","統計","tǒngjì","Estadística",["Calcular"]],["统一","統一","tǒngyī","Unificar",["Unificado"]],["痛快",null,"tòngkuài","Satisfactorio",["Liberador"]],["投",null,"tóu","Lanzar",["Arrojar"]],["投入",null,"tóurù","Involucrarse",["Dedicar"]],["投诉","投訴","tóusù","Quejarse",["Reclamar"]],["投资","投資","tóuzī","Inversión",["Capitalizar"]],["透",null,"tòu","Transparente",["Claro"]],["透明",null,"tòumíng","Transparente",["Diáfano"]],["图案","圖案","tú'àn","Diseño",["Patrón"]],["途中",null,"túzhōng","Durante el viaje",["En el camino"]],["土地",null,"tǔdì","Tierra",["Suelo"]],["推迟","推遲","tuīchí","Posponer",["Aplazar"]],["推销","推銷","tuīxiāo","Vender",["Promocionar"]],["脱","脫","tuō","Quitarse",["Desvestir"]],["袜子","襪子","wàzi","Calcetín",["Prenda de pie"]],["外汇","外匯","wàihuì","Moneda extranjera",["Divisas"]],["外交官",null,"wàijiāoguān","Diplomático",["Embajador"]],["外套",null,"wàitào","Abrigo",["Chaqueta","Saco"]],["弯","彎","wān","Curvo",["Torcido"]],["晚点","晚點","wǎndiǎn","Tarde",["Retrasado"]],["万一","萬一","wànyī","Por si acaso",["Eventualidad"]],["王",null,"wáng","Mejor o más fuerte de su tipo",["Magnífico","Excelente"]],["网络","網絡","wǎngluò","Red",["Internet"]],["网址","網址","wǎngzhǐ","Dirección web",["Enlace"]],["微笑",null,"wēixiào","Sonrisa",["Sonreír"]],["微信",null,"wēixìn","WeChat",["Mensajería"]],["围巾","圍巾","wéijīn","Bufanda",["Pañuelo"]],["维持","維持","wéichí","Mantener",["Conservar"]],["维护","維護","wéihù","Mantener",["Cuidar"]],["维修","維修","wéixiū","Reparar",["Arreglar"]],["尾巴",null,"wěiba","Cola",["Extremo"]],["未必",null,"wèibì","No necesariamente",["Quizás no"]],["未来","未來","wèilái","Futuro",["Porvenir"]],["位于","位於","wèiyú","Ubicarse",["Situarse"]],["位置",null,"wèizhì","Posición",["Lugar"]],["味儿","味兒","wèir","Sabor",["Olor"]],["稳","穩","wěn","Estable",["Firme"]],["稳定","穩定","wěndìng","Estable",["Constante"]],["问候","問候","wènhòu","Saludar",["Enviar saludos"]],["无","無","wú","Sin",["No tener"]],["无法","無法","wúfǎ","No poder",["Ser incapaz de"]],["无聊","無聊","wúliáo","Aburrido",["Monótono"]],["无论","無論","wúlùn","Sin importar",null],["无数","無數","wúshù","Innumerable",["Incontable"]],["无所谓","無所謂","wúsuǒwèi","Da igual",["No importa"]],["无限","無限","wúxiàn","Infinito",["Ilimitado"]],["五颜六色","五顏六色","wǔyán-liùsè","De todos los colores",["Multicolor"]],["误会","誤會","wùhuì","Malentender",["Malentendido"]],["西瓜",null,"xīguā","Sandía",null],["吸",null,"xī","Absorber",["Inhalar"]],["吸管",null,"xīguǎn","Pajilla",["Sorbete"]],["吸收",null,"xīshōu","Absorber",["Asimilar"]],["吸烟","吸煙","xīyān","Fumar",["Tabaquismo"]],["吸引",null,"xīyǐn","Atraer",["Fascinar"]],["喜爱","喜愛","xǐ'ài","Gustar",["Querer"]],["系列",null,"xìliè","Serie",["Conjunto"]],["系统","系統","xìtǒng","Sistema",null],["细","細","xì","Fino",["Delgado"]],["细节","細節","xìjié","Detalle",["Particularidad"]],["细致","細緻","xìzhì","Minucioso",["Cuidadoso"]],["下个月","下個月","xià ge yuè","Próximo mes",["Mes que viene"]],["下降",null,"xiàjiàng","Descender",["Bajar"]],["下楼","下樓","xià lóu","Bajar las escaleras",["Bajar"]],["下载","下載","xiàzài","Descargué",["Descargue","Bajé"]],["夏季",null,"xiàjì","Verano",["Estación cálida"]],["鲜","鮮","xiān","Fresco",["Vivo (color)","Delicioso"]],["鲜花","鮮花","xiānhuā","Flor fresca",["Planta ornamental"]],["鲜明","鮮明","xiānmíng","Vívido",["Nítido"]],["咸","鹹","xián","Salado",null],["显著","顯著","xiǎnzhù","Notable",["Evidente"]],["县","縣","xiàn","Condado",["Subdivisión administrativa"]],["限制",null,"xiànzhì","Limitar",["Restringir"]],["相处","相處","xiāngchǔ","Llevarse bien",null],["相反",null,"xiāngfǎn","Por el contrario",["Al revés"]],["箱",null,"xiāng","Caja",["Pecho","Trompa"]],["箱子",null,"xiāngzi","Valija",["Caja","Baúl"]],["想念",null,"xiǎngniàn","Extrañar",null],["想象",null,"xiǎngxiàng","Imaginar",null],["项","項","xiàng","Artículo",null],["项目","項目","xiàngmù","Proyecto",["Ítem","Evento (deportivo)"]],["相片",null,"xiàngpiàn","Fotografía",null],["消化",null,"xiāohuà","Digerir",null],["销售","銷售","xiāoshòu","Vender",["Ventas"]],["小吃",null,"xiǎochī","Comidas",null],["小伙子",null,"xiǎohuǒzi","Chico",null],["小型",null,"xiǎoxíng","Pequeño tipo",["Compacto"]],["效率",null,"xiàolǜ","Eficiencia",["Rendimiento"]],["些",null,"xiē","Algunos",["Unos pocos"]],["心理",null,"xīnlǐ","Mentalidad",["Psicológico"]],["新郎",null,"xīnláng","Novio",["Esposo"]],["新娘",null,"xīnniáng","Novia",["Esposa"]],["新鲜","新鮮","xīnxiān","Fresco",["Novedoso"]],["新型",null,"xīnxíng","Nuevo tipo",["Moderno"]],["兴奋","興奮","xīngfèn","Emocionado",["Entusiasmado"]],["形容",null,"xíngróng","Describir",["Retratar"]],["形势","形勢","xíngshì","Situación",["Contexto"]],["型",null,"xíng","Modelo",["Tipo"]],["型号","型號","xínghào","Modelo",["Referencia"]],["醒",null,"xǐng","Despertar",["Recobrar"]],["兴趣","興趣","xìngqù","Interés",["Afición"]],["性质","性質","xìngzhì","Naturaleza",["Característica"]],["兄弟",null,"xiōngdì","Hermanos",["Hermano menor","Fraternal"]],["胸部",null,"xiōngbù","Pecho",["Tórax"]],["修理",null,"xiūlǐ","Reparar",["Arreglar"]],["选择","選擇","xuǎnzé","Elegir",["Selección","Opción"]],["学分","學分","xuéfēn","Crédito",["Unidad académica"]],["学年","學年","xuénián","Año académico",["Curso"]],["学时","學時","xuéshí","Hora de clase",["Sesión"]],["学术","學術","xuéshù","Académico",["Científico"]],["学问","學問","xuéwen","Saber",["Erudición","Ciencia"]],["寻找","尋找","xúnzhǎo","Buscar",null],["迅速",null,"xùnsù","Rápido",["Veloz"]],["牙",null,"yá","Diente",["Muela"]],["牙刷",null,"yáshuā","Cepillo de dientes",["Cepillo"]],["亚运会","亞運會","Yàyùnhuì","Juegos asiáticos",["Asiada"]],["呀",null,"ya","Interjección",["Expresión"]],["延长","延長","yáncháng","Prolongar",["Extender"]],["延期",null,"yánqī","Posponer",["Aplazar"]],["延续","延續","yánxù","Continuar",["Extender"]],["严","嚴","yán","Severo",["Estricto","Hermético"]],["严格","嚴格","yángé","Estricto",["Riguroso"]],["严重","嚴重","yánzhòng","Grave",["Serio"]],["研究",null,"yánjiū","Investigar",["Estudio"]],["研究生",null,"yánjiūshēng","Estudiante de posgrado",["Graduado"]],["研制","研製","yánzhì","Desarrollar",["Investigar"]],["盐","鹽","yán","Sal",["Cloruro sódico"]],["眼镜","眼鏡","yǎnjìng","Gafas",["Lentes"]],["眼泪","眼淚","yǎnlèi","Lágrima",null],["眼里","眼裡","yǎnli","A los ojos",["En la vista"]],["演讲","演講","yǎnjiǎng","Dar un discurso",["Conferencia"]],["阳台","陽臺","yángtái","Balcón",["Terraza"]],["养成","養成","yǎngchéng","Adquirir",["Formar"]],["腰",null,"yāo","Cintura",["Lomo"]],["摇","搖","yáo","Agitar",["Menear"]],["药物","藥物","yàowù","Medicamento",["Fármaco"]],["业余","業餘","yèyú","Aficionado",["业余"]],["叶子","葉子","yèzi","Hoja",["Follaje"]],["医疗","醫療","yīliáo","Atención médica",["Curar"]],["医学","醫學","yīxué","Medicina (ciencia)",null],["依靠",null,"yīkào","Depender",["Apoyar"]],["依然",null,"yīrán","Todavía",["Aún"]],["一律",null,"yīlǜ","Uniformemente",["Todos"]],["一再",null,"yīzài","Repetidamente",["Una y otra vez"]],["一致",null,"yīzhì","Unánime",["Coincidir","Consistente"]],["移",null,"yí","Desvía",null],["移动","移動","yídòng","Mover",["Trasladar"]],["移民",null,"yímín","Emigrar",["Inmigrante"]],["遗产","遺產","yíchǎn","Herencia",["Legado"]],["遗传","遺傳","yíchuán","Heredar",["Transmitir"]],["疑问","疑問","yíwèn","Duda",["Pregunta"]],["以及",null,"yǐjí","Y también",["Así como"]],["以内","以內","yǐnèi","Dentro de",["Dentro"]],["一般来说","一般來說","yībānláishuō","Por lo general",["Normalmente"]],["义务","義務","yìwù","Deber",["Obligación"]],["议论","議論","yìlùn","Comentar",["Discutir"]],["引",null,"yǐn","Tirar",["Extraer"]],["引导","引導","yǐndǎo","Guiar",["Dirigir"]],["引进","引進","yǐnjìn","Introducir",["Importar"]],["引起",null,"yǐnqǐ","Causar",["Provocar"]],["应","應","yīng","Responder",["(legal) deberá","Debería"]],["英勇",null,"yīngyǒng","Valiente",["Heroico"]],["营业","營業","yíngyè","Abrir",["Comerciar"]],["赢得","贏得","yíngdé","Ganar",["Conseguir (mérito)"]],["影子",null,"yǐngzi","Sombra",["Reflejo"]],["勇敢",null,"yǒnggǎn","Valiente",null],["勇气","勇氣","yǒngqì","Coraje",["Valor"]],["用途",null,"yòngtú","Uso",["Función"]],["优良","優良","yōuliáng","Excelente",["Bueno"]],["优美","優美","yōuměi","Elegante",["Bello"]],["优秀","優秀","yōuxiù","Excelente",["Destacado"]],["邮局","郵局","yóujú","Oficina de correos",["Correo"]],["有劲儿","有勁兒","yǒujìnr","Con energía",["Fuerte"]],["有趣",null,"yǒuqù","Divertido",["Ameno"]],["有限",null,"yǒuxiàn","Limitado",["Escaso"]],["幼儿园","幼兒園","yòu'éryuán","Guardería",["Kindergarten"]],["于是","於是","yúshì","Entonces",["Por lo tanto","Así"]],["语法","語法","yǔfǎ","Gramática",["Sintaxis"]],["语音","語音","yǔyīn","Sonido",["Fonética"]],["玉",null,"yù","Jade",null],["玉米",null,"yùmǐ","Maíz",["Choclo"]],["预测","預測","yùcè","Predecir",["Pronosticar"]],["预订","預訂","yùdìng","Reservar",["Encargar"]],["遇",null,"yù","Encontrar",["Toparse"]],["遇到",null,"yùdào","Encontrarse con",["Toparse con"]],["遇见","遇見","yùjiàn","Encontrarse",["Toparse"]],["原料",null,"yuánliào","Materia prima",["Insumo"]],["原则","原則","yuánzé","Principio",["Regla"]],["圆","圓","yuán","Redondo",["Circular"]],["圆满","圓滿","yuánmǎn","Satisfactorio",["Completo"]],["约会","約會","yuēhuì","Cita",["Encuentro"]],["月底",null,"yuèdǐ","Fin de mes",["Cierre"]],["阅读","閱讀","yuèdú","Leer",["Lectura"]],["运动会","運動會","yùndònghuì","Juegos deportivos",["Olimpiada"]],["运动员","運動員","yùndòngyuán","Atleta",["Deportista"]],["运气","運氣","yùnqi","Suerte",["Fortuna"]],["运用","運用","yùnyòng","Utilizar",["Aplicar"]],["再三",null,"zàisān","Una y otra vez",["Repetidamente"]],["在乎",null,"zàihu","Importar",["Preocupar"]],["在于","在於","zàiyú","Consistir",["Radicar"]],["赞成","贊成","zànchéng","Aprobar",["Apoyar"]],["赞赏","讚賞","zànshǎng","Elogiar",["Admirar"]],["赞助","贊助","zànzhù","Patrocinar",["Financiar"]],["造型",null,"zàoxíng","Diseño",["Modelo"]],["战斗","戰鬥","zhàndòu","Combatir",["Pelear"]],["战胜","戰勝","zhànshèng","Vencer",["Superar"]],["战士","戰士","zhànshì","Soldado",["Combatiente"]],["战争","戰爭","zhànzhēng","Guerra",null],["丈夫",null,"zhàngfu","Esposo",["Marido"]],["招呼",null,"zhāohu","Saludar",["Llamar"]],["着火","著火","zháohuǒ","Incendiarse",["Quemar"]],["着急","著急","zháojí","Preocuparse",["Tener apuro","Inquietarse"]],["召开","召開","zhàokāi","Convocar",["Organizar"]],["折",null,"zhé","Descuento",null],["针","針","zhēn","Aguja",["Alfiler"]],["针对","針對","zhēnduì","Dirigirse a",["Enfocar"]],["阵","陣","zhèn","Oleada",["Racha"]],["争论","爭論","zhēnglùn","Discutir",["Debatir"]],["征服",null,"zhēngfú","Conquistar",["Dominar"]],["征求","徵求","zhēngqiú","Solicitar",["Pedir"]],["政府",null,"zhèngfǔ","Gobierno",null],["政治",null,"zhèngzhì","Política",["Gobierno"]],["之后","之後","zhīhòu","Después de",["Detrás","Desde entonces"]],["之间","之間","zhījiān","Entre (dos o más cosas)",null],["之前",null,"zhīqián","Antes",["Previamente"]],["之一",null,"zhīyī","Uno de",["Entre"]],["植物",null,"zhíwù","Planta",["Vegetación"]],["指挥","指揮","zhǐhuī","Dirigir",["Mandar"]],["制订","制訂","zhìdìng","Formular",["Establecer"]],["质量","質量","zhìliàng","Calidad",["Masa (física)"]],["治",null,"zhì","Gobernar",["Administrar","Tratar, curar"]],["治疗","治療","zhìliáo","Tratar (médicamente)",["Terapia"]],["智力",null,"zhìlì","Inteligencia",["Capacidad"]],["智能",null,"zhìnéng","Inteligencia artificial",["Inteligente"]],["中介",null,"zhōngjiè","Intermediario",["Agente"]],["种类","種類","zhǒnglèi","Tipo",["Clase"]],["中奖","中獎","zhòngjiǎng","Ganar premio",["Acertar"]],["种植","種植","zhòngzhí","Cultivar",["Sembrar"]],["重量",null,"zhòngliàng","Peso",["Masa"]],["逐步",null,"zhúbù","Gradualmente",["Poco a poco"]],["逐渐","逐漸","zhújiàn","Gradualmente",["Poco a poco"]],["主题","主題","zhǔtí","Tema",["Asunto"]],["主席",null,"zhǔxí","Presidente",["Presidenta","Chairman"]],["祝福",null,"zhùfú","Bendecir",["Bendición","Felicitación"]],["著名",null,"zhùmíng","Famoso/a",["Célebre"]],["著作",null,"zhùzuò","Obra",["Publicación"]],["抓紧","抓緊","zhuājǐn","Apresurarse",["Aferrarse"]],["专心","專心","zhuānxīn","Concentrado/a",["Atento"]],["转动","轉動","zhuǎndòng","Girar",["Rotar"]],["转告","轉告","zhuǎngào","Transmitir",["Comunicar"]],["转身","轉身","zhuǎnshēn","Volverse",["Dar la vuelta"]],["转弯","轉彎","zhuǎnwān","Girar",["Doblar"]],["转移","轉移","zhuǎnyí","Trasladar",["Mudar"]],["装修","裝修","zhuāngxiū","Decorar",["Renovar (interiores)"]],["装置","裝置","zhuāngzhì","Dispositivo",["Instalar"]],["追求",null,"zhuīqiú","Perseguir",["Buscar"]],["准时","準時","zhǔnshí","Puntual",["Exacto"]],["资料","資料","zīliào","Material",["Datos","Información"]],["资源","資源","zīyuán","Recurso",["Fuente"]],["自",null,"zì","Uno mismo",["De","Desde"]],["自信",null,"zìxìn","Confiar",["Creerse"]],["字母",null,"zìmǔ","Letra",["Abecedario"]],["综合","綜合","zōnghé","Combinar",["Integrar"]],["总共","總共","zǒnggòng","En total",["Sumando"]],["总理","總理","zǒnglǐ","Primer ministro",["Jefe de gobierno"]],["总统","總統","zǒngtǒng","Presidente",["Jefe de estado"]],["总之","總之","zǒngzhī","En resumen",["En conclusión"]],["阻止",null,"zǔzhǐ","Impedir",["Evitar"]],["嘴巴",null,"zuǐba","Boca",["Hocico"]],["最初",null,"zuìchū","Principio",["Comienzo"]],["作出",null,"zuòchū","Hacer",["Realizar"]],["作为","作為","zuòwéi","Como",["Actuar como"]],["做梦","做夢","zuòmèng","Soñar",["Fantasear"]]],
'HSK5': [["安慰",null,"ānwèi","Consolar",["Tranquilizar"]],["岸",null,"àn","Orilla",["Ribera"]],["岸上",null,"àn shang","En la orilla",["A orillas"]],["按摩",null,"ànmó","Masaje",null],["拔",null,"bá","Arrancar",["Extraer"]],["白酒",null,"báijiǔ","Aguardiente",["Vodka"]],["拜访","拜訪","bàifǎng","Visitar",null],["版",null,"bǎn","Edición",["Versión"]],["扮演",null,"bànyǎn","Hace el papel de",["Interpreta a"]],["棒",null,"bàng","Palo",["Garrote","Genial, buenísimo"]],["包围","包圍","bāowéi","Cercó",["Rodeó"]],["包装","包裝","bāozhuāng","Embalaje",["Empaquetado"]],["保卫","保衛","bǎowèi","Defender",["Proteger"]],["保养","保養","bǎoyǎng","Mantenimiento",["Mantenerlo bien"]],["报答","報答","bàodá","Retribuir",["Pagar"]],["报警","報警","bàojǐng","Llamar a la policía",["Avisar a la policía"]],["抱怨",null,"bàoyuàn","Quejarse",["Reclamar"]],["背包",null,"bēibāo","Mochila",["Bolso"]],["悲剧","悲劇","bēijù","Tragedia",["Desgracia"]],["悲伤","悲傷","bēishāng","Triste",["Penoso"]],["北极","北極","běijí","Polo Norte",null],["被动","被動","bèidòng","Pasiva",null],["辈","輩","bèi","Generación",["Época"]],["本人",null,"běnrén","La persona misma",["El interesado"]],["鼻子",null,"bízi","Nariz",["Hocico"]],["比方",null,"bǐfang","Ejemplo",null],["比重",null,"bǐzhòng","Proporción",null],["彼此",null,"bǐcǐ","Mutuamente",["Recíprocamente"]],["必",null,"bì","Ciertamente",["Debe","Necesariamente"]],["必需",null,"bìxū","Necesario",["Imprescindible"]],["毕竟","畢竟","bìjìng","Después de todo",["Al fin y al cabo"]],["闭幕","閉幕","bìmù","Clausurar",["Finalizar"]],["闭幕式","閉幕式","bìmùshì","Clausura",["Ceremonia de cierre"]],["边境","邊境","biānjìng","Frontera",null],["编辑","編輯","biānjí","Editor",["Redactor"]],["变动","變動","biàndòng","Cambiar",["Modificar"]],["便利",null,"biànlì","Comodidad",["Conveniencia"]],["便条","便條","biàntiáo","Notita",["Nota"]],["便于","便於","biànyú","Facilita la búsqueda",["Hace fácil la búsqueda"]],["宾馆","賓館","bīnguǎn","Hotel",["Hospedaje"]],["饼","餅","bǐng","Tarta",["Pastel"]],["饼干","餅乾","bǐnggān","Galletitas",null],["病毒",null,"bìngdú","Virus",["Germen"]],["玻璃",null,"bōli","Vidrio",["Cristal"]],["博客",null,"bókè","Blog",["Bitácora"]],["博览会","博覽會","bólǎnhuì","Feria",["Exposición"]],["博士",null,"bóshì","Doctor/a",["PhD"]],["博物馆","博物館","bówùguǎn","Museo",null],["薄弱",null,"bóruò","Floja",["Débil"]],["不顾","不顧","bùgù","Sin hacer caso de",["Ignorando"]],["不利",null,"bùlì","Desfavorable",["Perjudicial"]],["不耐烦","不耐煩","bù nàifán","Impaciente",["Irritable"]],["不幸",null,"bùxìng","Desgraciado/a",["Infortunado"]],["不易",null,"bùyì","Difícil",["Complicado"]],["补偿","補償","bǔcháng","Compensar",["Indemnizar"]],["补贴","補貼","bǔtiē","Subsidio",["Asignación"]],["不曾",null,"bùcéng","Nunca",["Jamás"]],["不得了",null,"bùdéliǎo","Terrible",["Increíble"]],["不敢当","不敢當","bùgǎndāng","No lo merezco",["No se lo merece"]],["不良",null,"bùliáng","Malo",["Dañino","Defectuoso"]],["不免",null,"bùmiǎn","Inevitablemente",["Es inevitable que"]],["不能不",null,"bù néng bù","Tener que",["Debe"]],["不时","不時","bùshí","De vez en cuando",["A cada rato"]],["不停",null,"bù tíng","Constantemente",["Sin parar"]],["不许","不許","bùxǔ","Prohibir",["No permitir"]],["不止",null,"bùzhǐ","Más de una vez",null],["不足",null,"bùzú","Insuficiente",["Deficiente"]],["部位",null,"bùwèi","Zona",["Parte del cuerpo"]],["猜",null,"cāi","Adivinar",["Suponer"]],["猜测","猜測","cāicè","Suponer",["Especular"]],["裁判",null,"cáipàn","Árbitro",null],["采购","採購","cǎigòu","Compra",["Adquiere"]],["彩票",null,"cǎipiào","Boleto de lotería",["Ticket de lotería"]],["餐馆","餐館","cānguǎn","Restaurante",["Comedor"]],["餐厅","餐廳","cāntīng","Comedor",["Restaurante","Cantina"]],["餐饮","餐飲","cānyǐn","Restauración",["Hostelería"]],["草原",null,"cǎoyuán","Pradera",["Estepa"]],["册","冊","cè","Tomo",["Volumen"]],["层次","層次","céngcì","Organizado",["Estructurado"]],["叉",null,"chā","Cruzar",["Entrelazar"]],["叉子",null,"chāzi","Tenedor",["Horqueta"]],["差别","差別","chābié","Diferencia",["No difieren mucho"]],["差距",null,"chājù","Diferencia",["Brecha"]],["插",null,"chā","Insertar",["Meter"]],["查询","查詢","cháxún","Consultar",["Buscar"]],["差点儿","差點兒","chà(yī)diǎnr","Casi",["Por poco"]],["拆",null,"chāi","Desmontar",["Demoler"]],["拆除",null,"chāichú","Demoler",["Derribar"]],["产业","產業","chǎnyè","Industria",["Sector principal"]],["长度","長度","chángdù","Longitud",["Tamaño"]],["长寿","長壽","chángshòu","Longevo/a",["Duradero"]],["肠","腸","cháng","Intestino",["Tripas"]],["尝","嚐","cháng","Probar",["Saborear"]],["尝试","嘗試","chángshì","Probar",["Probar un poco"]],["厂长","廠長","chǎngzhǎng","Director/a",["Gerente"]],["场面","場面","chǎngmiàn","Escena",["Ambiente"]],["倡导","倡導","chàngdǎo","Fomenta",["Promueve"]],["超越",null,"chāoyuè","Superarse",["Supera"]],["车主","車主","chēzhǔ","Dueño del coche",["Propietario del vehículo"]],["称号","稱號","chēnghào","Título",null],["成本",null,"chéngběn","Costos",["Costos de producción"]],["成交",null,"chéngjiāo","Trato hecho",null],["成效",null,"chéngxiào","Resultados",["Efectos"]],["成语","成語","chéngyǔ","Modismo",["Refrán"]],["承办","承辦","chéngbàn","Organiza",["Se encarga de organizar"]],["城里","城裡","chénglǐ","En la ciudad",["Dentro de la ciudad"]],["乘",null,"chéng","Multiplicar",["Viajar"]],["乘车","乘車","chéng chē","Viajar en coche",["Usar transporte"]],["乘客",null,"chéngkè","Pasajero",["Viajero"]],["乘坐",null,"chéngzuò","Usar",["Tomar"]],["吃力",null,"chīlì","Costaba",["Le pesaba"]],["池子",null,"chízi","Estanque",["Alberca"]],["迟","遲","chí","Tarde",["Demorado"]],["冲动","衝動","chōngdòng","Impulso",null],["冲突","衝突","chōngtū","Conflicto",null],["充足",null,"chōngzú","Suficiente",["Abundante"]],["愁",null,"chóu","Preocupar",["Angustiar"]],["丑","醜","chǒu","Feo/a",["Horrible"]],["臭",null,"chòu","Hediondo/a",["Maloliente"]],["出版",null,"chūbǎn","Publicar",["Editar"]],["出差",null,"chūchāi","Viaje de trabajo",["Ir de comisión"]],["出汗",null,"chūhàn","Sudar",["Transpirar"]],["出于","出於","chūyú","Debido a",["Partir de"]],["初期",null,"chūqī","Etapa inicial",["Principio"]],["除非",null,"chúfēi","A menos que",["Salvo que"]],["除夕",null,"chúxī","Nochevieja",["Fin de año"]],["厨房","廚房","chúfáng","Cocina",["Comedero"]],["处罚","處罰","chǔfá","Castigar",["Sanción","Penalizar"]],["处分","處分","chǔfèn","Sanción",["Castigo"]],["处在","處在","chǔzài","Encontrarse",["Situarse"]],["传达","傳達","chuándá","Transmití",["Transmite"]],["传递","傳遞","chuándì","Transmitir",["Pasar"]],["传真","傳真","chuánzhēn","Fax",["Enviar fax"]],["窗帘","窗簾","chuānglián","Cortina",["Persiana"]],["闯","闖","chuǎng","Entrar",["Irrumpir"]],["创立","創立","chuànglì","Fundada",null],["辞典","辭典","cídiǎn","Diccionario",["Léxico"]],["辞职","辭職","cízhí","Renunciar",["Dimitir"]],["此后","此後","cǐhòu","Después de esto",["Ulteriormente"]],["此刻",null,"cǐkè","Ahora",["En este instante"]],["此时","此時","cǐshí","En ese momento",["Entonces"]],["聪明","聰明","cōngmíng","Inteligente",["Despabilado"]],["从而","從而","cóng'ér","Por lo tanto",["Así"]],["从中","從中","cóngzhōng","De entre",["De ahí"]],["脆",null,"cuì","Crujiente",["Quebradizo"]],["存款",null,"cúnkuǎn","Depósito",["Ahorro"]],["寸",null,"cùn","Pulgada",["Centímetro"]],["达成","達成","dáchéng","Acuerdo",null],["答",null,"dá","Responder",null],["答复","答覆","dáfù","Respuesta",null],["打扮",null,"dǎban","Arreglarse",["Vestir"]],["打包",null,"dǎbāo","Llevar",null],["打击","打擊","dǎjī","Golpees",["Desanimes"]],["打架",null,"dǎjià","Pelearon",["Se pelearon"]],["打扰","打擾","dǎrǎo","Molestar",["Interrumpir"]],["大胆","大膽","dàdǎn","Audaz",["Atrevido"]],["大都",null,"dàdū","Generalmente",["Por lo general"]],["大纲","大綱","dàgāng","Esquema",["Resumen"]],["大伙儿","大伙兒","dàhuǒr","Todos",null],["大奖赛","大獎賽","dàjiǎngsài","Gran premio",["Competencia"]],["大脑","大腦","dànǎo","Cerebro",["Seso"]],["大事",null,"dàshì","Asunto importante",["Gran acontecimiento"]],["大厅","大廳","dàtīng","Sala principal",["Salón grande"]],["大象",null,"dàxiàng","Elefante",null],["大熊猫","大熊貓","dàxióngmāo","Oso panda",["Panda gigante"]],["大于","大於","dàyú","Ser mayor que",["Superar"]],["大致",null,"dàzhì","Aproximadamente",["Más o menos así"]],["呆",null,"dāi","Estar pasmado",["Atontado","Boquiabierto"]],["待",null,"dāi","A punto de",["Con la intención de","Ir a (hacer algo)"]],["代价","代價","dàijià","Precio",["Costo"]],["代理",null,"dàilǐ","Representa",["Lleva"]],["带有","帶有","dàiyǒu","Tener (una característica)",["Llevar consigo"]],["贷款","貸款","dàikuǎn","Prestar dinero",["Solicitar préstamo"]],["单一","單一","dānyī","Único",["Monótono"]],["胆","膽","dǎn","Vesícula biliar",["Coraje"]],["胆小","膽小","dǎnxiǎo","Cobarde",["Tímido"]],["蛋糕",null,"dàngāo","Torta",["Pastel"]],["当场","當場","dāngchǎng","Acto",["Momento"]],["当代","當代","dāngdài","Actual",null],["当年","當年","dāngnián","En aquel año",["En ese entonces"]],["当前","當前","dāngqián","Actual",["En el presente"]],["当选","當選","dāngxuǎn","Elegido",["Electo"]],["挡","擋","dǎng","Bloquear",["Obstaculizar"]],["到来","到來","dàolái","Llegar",["Arribar"]],["倒是",null,"dàoshì","Por el contrario",["Al contrario"]],["道德",null,"dàodé","Moralidad",["Ética"]],["得了",null,"déle","Ya basta",["Suficiente"]],["得以",null,"déyǐ","Poder",["Lograr"]],["等候",null,"děnghòu","Esperar",["Aguardar"]],["等级","等級","děngjí","Nivel",["Categoría"]],["低于","低於","dīyú","Ser menor que",["Estar por debajo"]],["地带","地帶","dìdài","Zona",["Región"]],["地形",null,"dìxíng","Relieve geográfico",["Orografía"]],["地震",null,"dìzhèn","Terremoto",["Temblor"]],["递","遞","dì","Entregar",["Pasar"]],["递给","遞給","dì gěi","Entregar a",["Dar a"]],["典礼","典禮","diǎnlǐ","Ceremonia",["Acto protocolario"]],["点燃","點燃","diǎnrán","Encender",["Prender"]],["电池","電池","diànchí","Batería",["Pila"]],["电饭锅","電飯鍋","diànfànguō","Arroz eléctrico",["Olla arrocera"]],["电子版","電子版","diànzǐbǎn","Versión digital",["Electrónico"]],["调动","調動","diàodòng","Transferir",["Movilizar"]],["丢","丟","diū","Perder",["Tirar"]],["动机","動機","dòngjī","Motivo",["Intención"]],["动手","動手","dòngshǒu","Empezar a",["Poner manos a la obra"]],["动态","動態","dòngtài","Dinámica",["Movimiento"]],["动员","動員","dòngyuán","Movilizar",["Convocar"]],["冻","凍","dòng","Congelar",["Helar"]],["洞",null,"dòng","Agujero",["Cueva"]],["豆制品","豆製品","dòuzhìpǐn","Productos de soja",["Legumbres"]],["毒",null,"dú","Veneno",["Tóxico"]],["堆",null,"duī","Amontonar",["Pila"]],["对立","對立","duìlì","Oponerse",["Confrontar"]],["对应","對應","duìyìng","Corresponder",["Equivaler"]],["吨","噸","dūn","Tonelada",["Unidad de peso"]],["朵",null,"duǒ","Flor",["Clasificador (flores, nubes)"]],["躲",null,"duǒ","Esconderse",["Esquivar","Evitar"]],["儿女","兒女","érnǚ","Hijos",["Descendencia"]],["耳朵",null,"ěrduo","Oído",["Oreja"]],["二维码","二維碼","èrwéimǎ","Código",null],["发布","發布","fābù","Publicar",["Anunciar","Emitir"]],["发觉","發覺","fājué","Darse cuenta",["Notar"]],["发射","發射","fāshè","Lanzar",["Disparar","Emitir"]],["发行","發行","fāxíng","Publicar",["Editar"]],["罚","罰","fá","Castigar",["Multa"]],["罚款","罰款","fákuǎn","Multa",["Sanción económica"]],["法规","法規","fǎguī","Reglamento",["Normativa"]],["法制",null,"fǎzhì","Sistema legal",["Estado de derecho"]],["繁荣","繁榮","fánróng","Próspero",["En auge"]],["返回",null,"fǎnhuí","Volver",["Regresar"]],["防治",null,"fángzhì","Prevenir y tratar",["Combatir"]],["放大",null,"fàngdà","Ampliar",["Agrandar"]],["放弃","放棄","fàngqì","Abandonar",["Renunciar","Darse por vencido"]],["分成",null,"fēnchéng","Dividir en",["Fraccionar"]],["分解",null,"fēnjiě","Descomponer",["Desintegrar"]],["分类","分類","fēnlèi","Clasificar",["Categorizar"]],["分离","分離","fēnlí","Separar",["Dividir"]],["分析",null,"fēnxī","Analizar",["Examinar"]],["分享",null,"fēnxiǎng","Comparto",null],["丰收","豐收","fēngshōu","Cosecha abundante",["Buena cosecha"]],["风度","風度","fēngdù","Elegancia",["Porte"]],["风光","風光","fēngguāng","Paisaje",["Panorama"]],["疯","瘋","fēng","Loco",["Enloquecer"]],["疯狂","瘋狂","fēngkuáng","Frenético",["Desbocado"]],["扶",null,"fú","Sostener",["Apoyar"]],["服从","服從","fúcóng","Obedecer",["Someterse"]],["幅",null,"fú","Ancho",["Medida"]],["幅度",null,"fúdù","Amplitud",["Margen"]],["福利",null,"fúlì","Beneficio",["Bienestar"]],["辅助","輔助","fǔzhù","Ayudar",["Asistir"]],["负责人","負責人","fùzérén","Responsable",["Encargado"]],["附件",null,"fùjiàn","Archivo adjunto",["Anexo"]],["改革",null,"gǎigé","Reforma",["Reformar"]],["干脆","乾脆","gāncuì","Directo",["Sin rodeos"]],["干扰","干擾","gānrǎo","Interferir",["Molestar"]],["干预","干預","gānyù","Intervenir",["Entrometerse"]],["感想",null,"gǎnxiǎng","Impresión",["Sentimiento"]],["钢笔","鋼筆","gāngbǐ","Bolígrafo",["Pluma"]],["钢琴","鋼琴","gāngqín","Piano",null],["高大",null,"gāodà","Alto y grande",["Imponente"]],["高度",null,"gāodù","Altitud",["Elevación"]],["高跟鞋",null,"gāogēnxié","Tacones",["Zapatos de tacón alto"]],["高温","高溫","gāowēn","Temperatura alta",["Calor"]],["高于","高於","gāoyú","Ser superior a",["Exceder"]],["高原",null,"gāoyuán","Meseta",["Altiplano"]],["搞",null,"gǎo","Hacer",["Organizar"]],["搞好",null,"gǎohǎo","Hacer bien",["Mejorar"]],["歌曲",null,"gēqǔ","Canción",null],["隔壁",null,"gébì","Vecino",["Al lado"]],["个儿","個兒","gèr","Estatura",["Tamaño"]],["跟前",null,"gēnqián","Delante",["Enfrente"]],["跟随","跟隨","gēnsuí","Seguir",["Acompañar"]],["更换","更換","gēnghuàn","Cambiar",["Sustituir"]],["更新",null,"gēngxīn","Renovar",["Actualizar"]],["工艺","工藝","gōngyì","Artesanía",["Técnica"]],["工作日",null,"gōngzuòrì","Día laboral",["Día de trabajo"]],["公告",null,"gōnggào","Anuncio",null],["公认","公認","gōngrèn","Reconocido",["Admitido"]],["公式",null,"gōngshì","Fórmula",["Ecuación"]],["公正",null,"gōngzhèng","Justo",null],["共计","共計","gòngjì","Total",["Sumar"]],["共享",null,"gòngxiǎng","Compartir",["Usar en común"]],["沟","溝","gōu","Zanja",["Surco"]],["沟通","溝通","gōutōng","Comunicar",["Dialogar"]],["估计","估計","gūjì","Estimar",["Calcular"]],["古老",null,"gǔlǎo","Antiguo",["Viejo"]],["鼓",null,"gǔ","Tambor",["鼓动"]],["鼓励","鼓勵","gǔlì","Alentar",["Ánimo","Estímulo"]],["鼓掌",null,"gǔzhǎng","Aplaudir",["Dar palmadas"]],["顾问","顧問","gùwèn","Asesor",["Consultor"]],["关怀","關懷","guānhuái","Cuidar",["Preocuparse"]],["关键","關鍵","guānjiàn","Clave",["Crucial"]],["冠军","冠軍","guànjūn","Campeón/campeona",null],["光荣","光榮","guāngróng","Glorioso",["Honorable"]],["光线","光線","guāngxiàn","Luz",["Iluminación"]],["广","廣","guǎng","Apellido guang",["Numeroso","Ancho"]],["广泛","廣泛","guǎngfàn","Amplio",["Extenso"]],["规划","規劃","guīhuà","Planificar",["Proyecto"]],["鬼",null,"guǐ","Fantasma",["Espíritu"]],["柜子","櫃子","guìzi","Armario",["Gaveta"]],["滚","滾","gǔn","Rodar",["Girar"]],["锅","鍋","guō","Olla",["Sartén"]],["国籍","國籍","guójí","Nacionalidad",["Ciudadanía"]],["国民","國民","guómín","Ciudadano",["Pueblo"]],["过度","過度","guòdù","Excesivo",["Extremo"]],["过敏","過敏","guòmǐn","Alergia",["Reacción"]],["过于","過於","guòyú","Demasiado",["Excesivamente"]],["害",null,"hài","Causar problemas a",["Demonio","Hacer daño a"]],["汗",null,"hàn","Sudor",["Transpiración"]],["好运","好運","hǎoyùn","Buena suerte",["Fortuna"]],["号召","號召","hàozhào","Convocar",["Llamar"]],["合并","合併","hébìng","Fusionar",["Unir"]],["合成",null,"héchéng","Combinar",["Unir","Fusionar"]],["盒",null,"hé","Caja",["Recipiente"]],["盒饭","盒飯","héfàn","Comida para llevar",["Bandeja de comida"]],["盒子",null,"hézi","Caja",["Recipiente"]],["贺卡","賀卡","hèkǎ","Tarjeta de felicitación",["Postal"]],["恨",null,"hèn","Odiar",["Detestar"]],["猴",null,"hóu","Mono",["Simio"]],["后悔","後悔","hòuhuǐ","Arrepentirse",["Lamentar"]],["胡同儿","胡同兒","hútòngr","Callejón",["Callejón sin salida"]],["胡子","鬍子","húzi","Barba",["Bigote"]],["虎",null,"hǔ","Tigre",["Felino"]],["华语","華語","Huáyǔ","Chino idioma",["Lengua china"]],["滑",null,"huá","Resbaladizo",["Deslizante"]],["化石",null,"huàshí","Fósil",["Resto petrificado"]],["划分","劃分","huàfēn","Dividir",["Clasificar"]],["画面","畫面","huàmiàn","Imagen",["Escena"]],["环节","環節","huánjié","Eslabón",["Etapa"]],["慌",null,"huāng","Entrar en pánico",["(con 得) terriblemente"]],["慌忙",null,"huāngmáng","Apresurado",["Precipitado"]],["灰色",null,"huīsè","Gris",["Color gris"]],["恢复","恢復","huīfù","Recuperar",["Restablecer"]],["回报","回報","huíbào","Recompensar",["Devolver"]],["回避","迴避","huíbì","Evitar",["Eludir"]],["回顾","回顧","huígù","Repasar",["Mirar atrás"]],["回收",null,"huíshōu","Reciclar",["Recuperar"]],["回头","回頭","huítóu","Volver",["Después"]],["回信",null,"huíxìn","Respuesta",["Contestación"]],["回忆","回憶","huíyì","Recordar",["Recuerdos","Memoria"]],["汇款","匯款","huìkuǎn","Transferencia",["Remesa"]],["会谈","會談","huìtán","Negociación",["Conferencia"]],["活力",null,"huólì","Energía",["Vitalidad"]],["活泼","活潑","huópō","Vivaz",["Animado"]],["火柴",null,"huǒchái","Cerilla",["Fósforo"]],["火腿",null,"huǒtuǐ","Jamón",["Pernil"]],["火灾","火災","huǒzāi","Incendio",null],["或是",null,"huòshì","O",["Tal vez"]],["机器人","機器人","jīqìrén","Robot",["Autómata"]],["机制","機制","jīzhì","Mecanismo",["Sistema"]],["肌肉",null,"jīròu","Músculo",null],["基地",null,"jīdì","Base",["Cuartel"]],["基金",null,"jījīn","Fondo",["Capital"]],["即使",null,"jíshǐ","Incluso",null],["集团","集團","jítuán","Grupo",["Conglomerado"]],["挤","擠","jǐ","Apretar",["Hacinarse"]],["记忆","記憶","jìyì","Recordar",["Memoria"]],["技能",null,"jìnéng","Habilidad",["Destreza"]],["继承","繼承","jìchéng","Heredar",["Continuar"]],["加热","加熱","jiārè","Calentar",["Calentarse"]],["加上",null,"jiāshàng","Además",["Sumar"]],["加速",null,"jiāsù","Acelerar",["Aumentar"]],["加以",null,"jiāyǐ","Aplicar",["Usar"]],["夹","夾","jiā","Meter",["Pinchar"]],["甲",null,"jiǎ","Primera",["Coraza"]],["价","價","jià","Valor",["Precio","Intermediario"]],["驾驶","駕駛","jiàshǐ","Conducir",["Pilotar"]],["驾照","駕照","jiàzhào","Licencia de conducir",null],["坚定","堅定","jiāndìng","Firme",["Decidido"]],["肩",null,"jiān","Hombro",["Espalda"]],["艰苦","艱苦","jiānkǔ","Duro",["Penoso"]],["艰难","艱難","jiānnán","Difícil",["Penoso","Arduo"]],["检验","檢驗","jiǎnyàn","Verificar",["Examinar"]],["减轻","減輕","jiǎnqīng","Aliviar",["Disminuir"]],["剪",null,"jiǎn","Cortar",["Recortar"]],["剪刀",null,"jiǎndāo","Tijeras",["Cortaúñas"]],["剪子",null,"jiǎnzi","Tijeras",["Cortaúñas"]],["间接","間接","jiànjiē","Indirecto",["Mediato"]],["建造",null,"jiànzào","Construir",["Edificar"]],["建筑","建築","jiànzhù","Construir",["Edificio"]],["健全",null,"jiànquán","Sano",["Completo"]],["键","鍵","jiàn","Tecla",["Botón"]],["键盘","鍵盤","jiànpán","Teclado",["Panel"]],["将","將","jiāng","(literario) mandar; liderar",["Usar","Hace poco tiempo"]],["将要","將要","jiāngyào","Va a",["Próximamente"]],["奖励","獎勵","jiǎnglì","Premiar",["Galardonar"]],["交代",null,"jiāodài","Explicar",["Entregar"]],["郊区","郊區","jiāoqū","Suburbios",["Afueras"]],["胶带","膠帶","jiāodài","Cinta adhesiva",["Celo"]],["胶水","膠水","jiāoshuǐ","Pegamento",["Cola"]],["脚步","腳步","jiǎobù","Paso",["Pisada"]],["接触","接觸","jiēchù","Tocar",["Contactar"]],["接连","接連","jiēlián","Seguidos",["En cadena","Sucesivos"]],["解除",null,"jiěchú","Quitar",["Eliminar"]],["解放",null,"jiěfàng","Liberar",["Soltar"]],["戒",null,"jiè","Abstenerse",["Prohibir"]],["届","屆","jiè","Edición",["Convocatoria"]],["今日",null,"jīnrì","Hoy",["Día de hoy"]],["尽管","儘管","jǐnguǎn","Aunque",null],["紧紧","緊緊","jǐnjǐn","Firmemente",["Apretadamente"]],["尽可能","盡可能","jìn kěnéng","Si es posible",["En lo posible"]],["进化","進化","jìnhuà","Evolucionar",["Transformarse"]],["近来","近來","jìnlái","Últimamente",["Hace poco"]],["经费","經費","jīngfèi","Presupuesto",["Fondos"]],["景象",null,"jǐngxiàng","Panorama",["Vista"]],["警告",null,"jǐnggào","Advertir",["Alertar"]],["竞赛","競賽","jìngsài","Competir",["Concursar"]],["竞争","競爭","jìngzhēng","Competir",["Competencia"]],["酒鬼",null,"jiǔguǐ","Borracho",["Alcohólico"]],["救灾","救災","jiùzāi","Socorro por desastres",["Ayudar a los damnificados"]],["居然",null,"jūrán","Increíblemente",["Sorprendentemente"]],["局面",null,"júmiàn","Situación",["Panorama"]],["局长","局長","júzhǎng","Director",["Jefe"]],["举动","舉動","jǔdòng","Acción",["Movimiento"]],["拒绝","拒絕","jùjué","Rechazar",["Negar"]],["俱乐部","俱樂部","jùlèbù","Club",null],["剧本","劇本","jùběn","Guion",["Libreto"]],["决不","決不","jué bù","Nunca jamás",["De ninguna manera"]],["绝望","絕望","juéwàng","Desesperar",["Perder toda esperanza"]],["军人","軍人","jūnrén","Militar",["Soldado"]],["开幕","開幕","kāimù","Comenzar",["Iniciar"]],["开幕式","開幕式","kāimùshì","Ceremonia de apertura",["Inauguración"]],["看成",null,"kànchéng","Considerar",["Ver como"]],["看出",null,"kànchū","Darse cuenta",["Notar"]],["看待",null,"kàndài","Ver",["Considerar"]],["考核",null,"kǎohé","Evaluar",["Examinar"]],["烤肉",null,"kǎoròu","Asado",["Hacer asado, asar carne"]],["烤鸭","烤鴨","kǎoyā","Pato laqueado",["Pato asado"]],["靠近",null,"kàojìn","Acercarse",["Aproximarse"]],["颗","顆","kē","Grano",["Unidad"]],["咳",null,"ké","Toser",["Carraspear"]],["可",null,"kě","Usado en 汗",["Aprobar; permitir"]],["可怜","可憐","kělián","可怜",["Lastimable"]],["可惜",null,"kěxī","Lastima",["Lástima"]],["渴望",null,"kěwàng","Anhelar",["Desear"]],["客户","客戶","kèhù","Cliente",null],["客气","客氣","kèqi","Cortés",["Formal","Modesto"]],["客厅","客廳","kètīng","Salón",["Living"]],["课题","課題","kètí","Tema",["Asunto"]],["肯定",null,"kěndìng","Afirmar",["Seguro"]],["空中",null,"kōngzhōng","Aire",["Cielo"]],["控制",null,"kòngzhì","Controlar",["Dominar"]],["口号","口號","kǒuhào","Eslogan",["Lema"]],["库","庫","kù","Almacén",["Depósito"]],["快活",null,"kuàihuo","Alegre",["Feliz"]],["宽度","寬度","kuāndù","Ancho",["Anchura"]],["狂",null,"kuáng","Loco",["Desenfrenado"]],["亏","虧","kuī","Perder",["Dañar"]],["困扰","困擾","kùnrǎo","Molestar",["Atormentar"]],["来信","來信","láixìn","Carta",["Mensaje"]],["烂","爛","làn","Podrido",["Malo"]],["朗读","朗讀","lǎngdú","Leer en voz alta",["Recitar"]],["浪漫",null,"làngmàn","Romántico",null],["劳动","勞動","láodòng","Trabajo (físico)",["Laborar"]],["梨",null,"lí","Pera",null],["礼","禮","lǐ","Regalo",["Ceremonia","Etiqueta"]],["礼拜","禮拜","lǐbài","Día/semana",null],["礼貌","禮貌","lǐmào","Cortesía",null],["厉害","厲害","lìhai","Formidable/impresionante",null],["立",null,"lì","Estar de pie",["Apellido Li","Para configurar"]],["立场","立場","lìchǎng","Postura",null],["利润","利潤","lìrùn","Ganancia",null],["例外",null,"lìwài","Excepción",null],["连接","連接","liánjiē","Unir",null],["联络","聯絡","liánluò","Contactar",null],["联想","聯想","liánxiǎng","Asociar",null],["脸盆","臉盆","liǎnpén","Palangana",null],["脸色","臉色","liǎnsè","Expresión",null],["恋爱","戀愛","liàn'ài","Enamorarse",null],["两岸","兩岸","liǎng'àn","Orillas",null],["邻居","鄰居","línjū","Vecino",null],["铃","鈴","líng","Campana",null],["铃声","鈴聲","língshēng","Timbre",null],["领带","領帶","lǐngdài","Corbata",null],["令",null,"lìng","Ordenar",null],["流动","流動","liúdòng","Circular",null],["流通",null,"liútōng","Circular",null],["漏",null,"lòu","Filtrar",null],["漏洞",null,"lòudòng","Fuga",["Agujero","Vulnerabilidad"]],["逻辑","邏輯","luójí","Lógica",null],["落实","落實","luòshí","Implementar",null],["码头","碼頭","mǎtóu","Muelle",null],["骂","罵","mà","Insultar",null],["买卖","買賣","mǎimai","Negocio",null],["漫长","漫長","màncháng","Interminable",null],["漫画","漫畫","mànhuà","Cómic",null],["毛笔","毛筆","máobǐ","Pincel chino",null],["矛盾",null,"máodùn","Contradictorio",null],["冒",null,"mào","Antigua variante de 冒",["Enviar (o arriba, adelante)","Apellido mao"]],["贸易","貿易","màoyì","Comercio",["Intercambio comercial"]],["煤",null,"méi","Carbón",null],["煤气","煤氣","méiqì","Gas",null],["门诊","門診","ménzhěn","Consulta",null],["迷人",null,"mírén","Encantador",null],["迷信",null,"míxìn","Superstición",null],["面貌",null,"miànmào","Apariencia",null],["面子",null,"miànzi","Orgullo",null],["秒",null,"miǎo","Segundo",null],["敏感",null,"mǐngǎn","Sensible",null],["明亮",null,"míngliàng","Brillante",null],["明明",null,"míngmíng","Claramente",["Obviamente"]],["命令",null,"mìnglìng","Orden",null],["模范","模範","mófàn","Modelo",null],["模仿",null,"mófǎng","Imitar",null],["模糊",null,"móhu","Borroso",null],["模式",null,"móshì","Modelo",null],["摩擦",null,"mócā","Fricción",null],["摩托",null,"mótuō","Motocicleta",null],["模样","模樣","múyàng","Apariencia",null],["目光",null,"mùguāng","Mirada",null],["耐心",null,"nàixīn","Paciencia",["Paciente"]],["男性",null,"nánxìng","Hombre",null],["南北",null,"nánběi","Norte y sur",null],["南极","南極","nánjí","Polo sur",null],["难得","難得","nándé","Raro",null],["难以","難以","nányǐ","Difícil",null],["脑子","腦子","nǎozi","Cerebro",null],["内在","內在","nèizài","Interno",null],["能量",null,"néngliàng","Energía",null],["年度",null,"niándù","Anual",null],["年龄","年齡","niánlíng","Edad",null],["年前",null,"niánqián","Para fin de año",["Hace … años (con número)"]],["牛仔裤","牛仔褲","niúzǎikù","Vaqueros",null],["农产品","農產品","nóngchǎnpǐn","Producto agrícola",null],["女性",null,"nǚxìng","Mujer",null],["暖",null,"nuǎn","Cálido",["Calentar","Variante de 暖"]],["偶尔","偶爾","ǒu'ěr","Ocasionalmente",null],["偶然",null,"ǒurán","Casual",["Por azar","Ocasional"]],["偶像",null,"ǒuxiàng","Ídolo",null],["拍摄","拍攝","pāishè","Filmar",null],["排除",null,"páichú","Eliminar",null],["旁",null,"páng","Lado",["Costado"]],["陪",null,"péi","Acompañar",null],["赔","賠","péi","Compensar",null],["赔偿","賠償","péicháng","Indemnizar",null],["配备","配備","pèibèi","Equipar",null],["配套",null,"pèitào","Conjunto",null],["喷","噴","pēn","Rociar",null],["盆",null,"pén","Cuenco",null],["披",null,"pī","Cubrir",null],["皮肤","皮膚","pífū","Piel",null],["皮鞋",null,"píxié","Zapatos de cuero",null],["脾气","脾氣","píqi","Genio",null],["匹",null,"pǐ","Unidad (animales)",null],["骗","騙","piàn","Engañar",null],["骗子","騙子","piànzi","Estafador",null],["拼",null,"pīn","Unir",null],["频道","頻道","píndào","Canal",null],["频繁","頻繁","pínfán","Frecuente",null],["品",null,"pǐn","Personaje; disposición; naturaleza; temperamento",["Amable; tipo; variedad"]],["品种","品種","pǐnzhǒng","Variedad",null],["平坦",null,"píngtǎn","Plano",null],["平原",null,"píngyuán","Llanura",null],["评估","評估","pínggū","Evaluar",null],["评论","評論","pínglùn","Comentar",null],["凭","憑","píng","Según",null],["泼","潑","pō","Salpicar",null],["葡萄",null,"pútao","Uva",null],["葡萄酒",null,"pútaojiǔ","Vino",null],["期望",null,"qīwàng","Esperar",null],["齐全","齊全","qíquán","Completo",null],["其",null,"qí","Semejante",["Es","Eso"]],["启动","啟動","qǐdòng","Iniciar",null],["启发","啟發","qǐfā","Inspirar",null],["启事","啟事","qǐshì","Aviso",null],["起到",null,"qǐdào","Lograr",null],["起码","起碼","qǐmǎ","Mínimo",null],["气体","氣體","qìtǐ","Gas",null],["气象","氣象","qìxiàng","Clima",null],["签","簽","qiān","Firmar",["Etiqueta","Palillo de la suerte"]],["签订","簽訂","qiāndìng","Firmar",null],["签名","簽名","qiānmíng","Firmar",null],["签约","簽約","qiānyuē","Firmar contrato",null],["签证","簽證","qiānzhèng","Visa",["Visado"]],["签字","簽字","qiānzì","Firmar",null],["前景",null,"qiánjǐng","Futuro",null],["前提",null,"qiántí","Condición",null],["欠",null,"qiàn","Deber",null],["枪","槍","qiāng","Pistola",null],["强度","強度","qiángdù","Intensidad",null],["墙壁","牆壁","qiángbì","Pared",null],["抢","搶","qiǎng","Robar",null],["抢救","搶救","qiǎngjiù","Rescatar",null],["强迫","強迫","qiǎngpò","Obligar",null],["悄悄",null,"qiāoqiāo","Silenciosamente",null],["敲",null,"qiāo","Golpear",null],["敲门","敲門","qiāo mén","Llamar a la puerta",null],["瞧",null,"qiáo","Mirar",null],["琴",null,"qín","Instrumento musical",null],["勤奋","勤奮","qínfèn","Diligente",null],["青",null,"qīng","Azul",["Juventud","Joven (de personas)"]],["清晨",null,"qīngchén","Amanecer",null],["清理",null,"qīnglǐ","Ordenar / limpiar",null],["情节","情節","qíngjié","Trama",null],["情形",null,"qíngxing","Situación",null],["晴朗",null,"qínglǎng","Despejado",null],["区域","區域","qūyù","Zona",null],["全都",null,"quándōu","Totalmente",null],["全世界",null,"quán shìjiè","Todo el mundo",null],["泉",null,"quán","Fuente",null],["劝","勸","quàn","Aconsejar",null],["缺乏",null,"quēfá","Falta",null],["确立","確立","quèlì","Establecer",null],["群体","群體","qúntǐ","Grupo",null],["群众","群眾","qúnzhòng","Gente",null],["染",null,"rǎn","Teñir",null],["绕","繞","rào","Rodear",null],["热量","熱量","rèliàng","Calor",null],["热门","熱門","rèmén","Popular",null],["人间","人間","rénjiān","Mundo",null],["人力",null,"rénlì","Fuerza laboral",null],["人士",null,"rénshì","Persona",["Figura (pública)"]],["人物",null,"rénwù","Personaje",null],["忍",null,"rěn","Aguantar",null],["忍不住",null,"rěn bu zhù","No poder evitar",null],["忍受",null,"rěnshòu","Soportar",null],["认","認","rèn","Reconocer",null],["认定","認定","rèndìng","Considerar",null],["扔",null,"rēng","Tirar",null],["仍旧","仍舊","réngjiù","Todavía",null],["如此",null,"rúcǐ","Así",["De este modo","Tal"]],["如同",null,"rútóng","Como",null],["如下",null,"rúxià","Como sigue",null],["入门","入門","rùmén","Introducción",null],["软","軟","ruǎn","Blando",null],["软件","軟件","ruǎnjiàn","Software",null],["洒","灑","sǎ","Rociar",null],["散文",null,"sǎnwén","Prosa",null],["杀","殺","shā","Matar",null],["杀毒","殺毒","shādú","Eliminar virus",null],["沙漠",null,"shāmò","Desierto",null],["傻",null,"shǎ","Tonto",null],["山区","山區","shānqū","Zona montañosa",["Serranía"]],["扇",null,"shān","Agitar (verbo)",null],["扇子",null,"shànzi","Abanico",null],["商标","商標","shāngbiāo","Marca",null],["上级","上級","shàngjí","Superior",null],["上下",null,"shàngxià","Arriba y abajo",["Aprox","Subir y bajar"]],["上涨","上漲","shàngzhǎng","Aumentar",null],["稍",null,"shāo","Un poco",null],["稍微",null,"shāowēi","Un poco",null],["蛇",null,"shé","Serpiente",null],["舍不得","捨不得","shěbude","No querer desprenderse",null],["舍得","捨得","shěde","Querer desprenderse",null],["设想","設想","shèxiǎng","设想 / suposición",null],["社",null,"shè","(antiguo) dios de la tierra",null],["社区","社區","shèqū","Comunidad",null],["射",null,"shè","Disparar",null],["射击","射擊","shèjī","Disparar / tiro",null],["摄像","攝像","shèxiàng","Grabar video",null],["摄像机","攝像機","shèxiàngjī","Cámara de video",null],["摄影","攝影","shèyǐng","Fotografiar",null],["摄影师","攝影師","shèyǐngshī","Fotógrafo",null],["伸",null,"shēn","Estirar",["Extender"]],["深处","深處","shēnchù","Profundidad",null],["深度",null,"shēndù","Profundidad",null],["神",null,"shén","Inusual",["Expresivo","Deidad"]],["神经","神經","shénjīng","Nervio",null],["神奇",null,"shénqí","Mágico",null],["神情",null,"shénqíng","Expresión",null],["升高",null,"shēnggāo","Subir",null],["生成",null,"shēngchéng","Generar",null],["声","聲","shēng","Tono",["Voz","Clasificador de sonidos"]],["胜负","勝負","shèngfù","Victoria o derrota",null],["剩",null,"shèng","Quedar",null],["剩下",null,"shèngxia","Quedar",null],["失误","失誤","shīwù","Error",null],["师傅","師傅","shīfu","Maestro",["Oficial (de oficio)","Fórmula respetuosa"]],["诗歌","詩歌","shīgē","Poesía",null],["十足",null,"shízú","Completo",null],["时常","時常","shícháng","A menudo",null],["时光","時光","shíguāng","Tiempo",null],["时机","時機","shíjī","Oportunidad",null],["时事","時事","shíshì","Noticias actuales",null],["实惠","實惠","shíhuì","Práctico / beneficio",null],["拾",null,"shí","Recoger",null],["使得",null,"shǐde","Hacer que",null],["示范","示範","shìfàn","Demostrar",null],["式",null,"shì","Estilo",["Patrón","Forma"]],["势力","勢力","shìlì","Poder",null],["试图","試圖","shìtú","Intentar",null],["视频","視頻","shìpín","Video",null],["视为","視為","shìwéi","Considerar",null],["收购","收購","shōugòu","Adquirir",null],["收集",null,"shōují","Recopilar",null],["收拾",null,"shōushi","Ordenar",null],["手段",null,"shǒuduàn","Medio",["Método","Recurso"]],["手法",null,"shǒufǎ","Método",null],["寿司","壽司","shòusī","Sushi",null],["受灾","受災","shòuzāi","Sufrir desastre",null],["瘦",null,"shòu","Delgado",null],["书法","書法","shūfǎ","Caligrafía",null],["书柜","書櫃","shūguì","Estante de libros",null],["书桌","書桌","shūzhuō","Escritorio",null],["输出","輸出","shūchū","Exportar",null],["蔬菜",null,"shūcài","Verdura",null],["熟悉",null,"shúxi","Conocer",null],["鼠",null,"shǔ","Ratón",null],["鼠标","鼠標","shǔbiāo","Ratón",null],["数目","數目","shùmù","Número",null],["摔",null,"shuāi","Caerse",null],["摔倒",null,"shuāidǎo","Caerse",null],["率领","率領","shuàilǐng","Liderar",null],["双手","雙手","shuāng shǒu","Manos",null],["水产品","水產品","shuǐchǎnpǐn","Producto acuático",null],["水分",null,"shuǐfèn","Humedad",null],["水库","水庫","shuǐkù","Embalse",null],["水灾","水災","shuǐzāi","Inundación",null],["睡眠",null,"shuìmián","Sueño",null],["说法","說法","shuōfǎ","Versión",null],["硕士","碩士","shuòshì","Máster",null],["私人",null,"sīrén","Privado",null],["思维","思維","sīwéi","Pensamiento",null],["四周",null,"sìzhōu","Alrededor",null],["搜",null,"sōu","Buscar",null],["搜索",null,"sōusuǒ","Buscar",null],["宿舍",null,"sùshè","Dormitorio",null],["酸甜苦辣",null,"suān-tián-kǔ-là","Experiencias de vida",null],["随后","隨後","suíhòu","Luego",null],["随意","隨意","suíyì","Al azar",null],["随着","隨著","suízhe","Con",null],["岁月","歲月","suìyuè","Años",null],["碎",null,"suì","Roto",null],["损害","損害","sǔnhài","Dañar",null],["损失","損失","sǔnshī","Pérdida",null],["所在",null,"suǒzài","Lugar",null],["锁","鎖","suǒ","Cerradura / cerrar",null],["台风","颱風","táifēng","Tifón",["Tormenta tropical"]],["抬",null,"tái","Levantar",["Alzar"]],["抬头","抬頭","táitóu","Levantar la cabeza",["Erguir el rostro"]],["太空",null,"tàikōng","Espacio exterior",["Cosmos"]],["弹","彈","tán","Toco",null],["逃",null,"táo","Escapar",["Huir","Fugarse"]],["逃跑",null,"táopǎo","Huir",["Escapar"]],["逃走",null,"táozǒu","Escapar",["Fugar"]],["桃",null,"táo","Melocotonero",["Durazno"]],["桃花",null,"táohuā","Flor de melocotonero",["Flor de durazno"]],["桃树","桃樹","táoshù","Árbol de melocotonero",["Árbol de durazno"]],["讨厌","討厭","tǎoyàn","Detestar",["Molestar"]],["特定",null,"tèdìng","Específico",["Concreto"]],["特性",null,"tèxìng","Característica",["Propiedad"]],["特有",null,"tèyǒu","Peculiar",["Exclusivo"]],["提倡",null,"tíchàng","Promover",["Sugerir"]],["提起",null,"tíqǐ","Mencionar",["Nombrar"]],["提示",null,"tíshì","Sugerir",["Indicar"]],["题材","題材","tícái","Tema",["Asunto"]],["体积","體積","tǐjī","Volumen",["Tamaño"]],["体力","體力","tǐlì","Fuerza física",["Energía"]],["天才",null,"tiāncái","Talento",["Genio"]],["天然气","天然氣","tiānránqì","Gas natural",["Metano"]],["天文",null,"tiānwén","Astronomía",["Ciencia celeste"]],["调节","調節","tiáojié","Regular",["Ajustar"]],["调解","調解","tiáojiě","Mediar",["Conciliar"]],["厅","廳","tīng","Sala",null],["停留",null,"tíngliú","Quedarse",["Permanecer"]],["通用",null,"tōngyòng","Ser universal",["Servir para todos"]],["偷",null,"tōu","Robar",["Hurtar"]],["偷偷",null,"tōutōu","Secretamente",["A escondidas"]],["突破",null,"tūpò","Romper",["Superar"]],["土豆",null,"tǔdòu","Papa",["Patata"]],["吐",null,"tǔ","Decir",["Expresar"]],["兔",null,"tù","Conejo",["Liebre"]],["团长","團長","tuánzhǎng","Líder",["Jefe"]],["推行",null,"tuīxíng","Implementar",["Aplicar"]],["脱离","脫離","tuōlí","Separarse",["Desvincularse"]],["外界",null,"wàijiè","Mundo exterior",["Ambiente"]],["完了",null,"wánle","Terminado",["Concluido"]],["微博",null,"wēibó","Microblog",["Twitter"]],["为难","為難","wéinán","Sentirse incómodo",["Complicar"]],["为期","為期","wéiqī","Durar",["Extenderse"]],["为止","為止","wéizhǐ","Hasta",["Concluir"]],["为主","為主","wéizhǔ","Principalmente",["Básicamente"]],["违法","違法","wéifǎ","Ilegal",["Antijurídico"]],["违反","違反","wéifǎn","Infringir",["Violar"]],["违规","違規","wéiguī","Infringir normas",["Desobedecer"]],["围绕","圍繞","wéirào","Girar en torno a",["Rodear"]],["唯一",null,"wéiyī","Único",["Solo"]],["委托","委託","wěituō","Encargar",["Delegar"]],["卫星","衛星","wèixīng","Satélite",["Asteroide"]],["胃",null,"wèi","Estómago",["Panza"]],["慰问","慰問","wèiwèn","Consolar",["Expresar condolencias"]],["温和","溫和","wēnhé","Suave",["Amable"]],["文艺","文藝","wényì","Literatura y arte",["Cultura"]],["卧室","臥室","wòshì","Dormitorio",["Habitación"]],["握",null,"wò","Clasificador: un puñado",["Apretar (el puño)","Sostener; agarrar"]],["污染",null,"wūrǎn","Contaminar",["Ensuciar"]],["污水",null,"wūshuǐ","Agua contaminada",["Aguas residuales"]],["屋",null,"wū","(forma encuadernada) habitación",["(forma encuadernada) casa"]],["无奈","無奈","wúnài","Sin remedio",["Obligado"]],["无疑","無疑","wúyí","Sin duda",["Indudable"]],["舞",null,"wǔ","Empuñar",["Bailar","Blandir"]],["物价","物價","wùjià","Precios",["Costo"]],["物业","物業","wùyè","Administración de propiedades",["Servicios inmobiliarios"]],["物质","物質","wùzhì","Materia",["Sustancia"]],["误解","誤解","wùjiě","Malentender",["Error"]],["西红柿","西紅柿","xīhóngshì","Tomate",["Jitomate"]],["西装","西裝","xīzhuāng","Traje (occidental)",null],["喜剧","喜劇","xǐjù","Comedia",["Obra cómica"]],["戏","戲","xì","Variante de 戏",["Jugar","Truco"]],["戏剧","戲劇","xìjù","Teatro",["Drama"]],["吓","嚇","xià","Asustar",["Espantar"]],["先后","先後","xiānhòu","Orden secuencia",["Sucesivamente"]],["先前",null,"xiānqián","Antes",["Previamente"]],["鲜艳","鮮艷","xiānyàn","Vivo",["Llamativo"]],["闲","閒","xián","Ocioso",["Libre"]],["显","顯","xiǎn","Prominente",["(prefijo) phanero-","Conspicuo"]],["现有","現有","xiànyǒu","Existente",["Actual"]],["现状","現狀","xiànzhuàng","Situación actual",["Estado actual"]],["线索","線索","xiànsuǒ","Pista",["Indicio"]],["献","獻","xiàn","Ofrecer",["Donar"]],["乡","鄉","xiāng","Municipio (unidad administrativa de la República Popular China)",["Lugar nativo","Pueblo o ciudad natal"]],["乡村","鄉村","xiāngcūn","Campo",["Pueblo"]],["相等",null,"xiāngděng","Ser igual",["Equivaler"]],["相应","相應","xiāngyìng","Correspondiente",["Acorde"]],["香肠","香腸","xiāngcháng","Salchicha",["Chorizo"]],["详细","詳細","xiángxì","Detallado",["Minucioso"]],["享受",null,"xiǎngshòu","Disfrutar",["Gozar"]],["向导","嚮導","xiàngdǎo","Guía",["Conductor"]],["向前",null,"xiàng qián","Hacia adelante",["De frente"]],["向上",null,"xiàngshàng","Ascender",["Subir"]],["相声","相聲","xiàngsheng","Comedia de diálogo",["Monólogo cómico"]],["象征","象徵","xiàngzhēng","Simbolizar",["Representar"]],["消除",null,"xiāochú","Eliminar",["Quitar","Disipar"]],["消毒",null,"xiāodú","Desinfectar",["Esterilizar"]],["消防",null,"xiāofáng","Bomberos",["Extinción de incendios"]],["消费者","消費者","xiāofèizhě","Consumidor",["Cliente"]],["消极","消極","xiāojí","Negativo",["Pasivo"]],["小偷儿","小偷兒","xiǎotōur","Ladrón",["Ratero"]],["歇",null,"xiē","Descansar",["Parar"]],["协议","協議","xiéyì","Acuerdo",["Convenio"]],["协议书","協議書","xiéyìshū","Documento de acuerdo",["Contrato"]],["斜",null,"xié","Oblicuo",["Inclinado"]],["心态","心態","xīntài","Estado de ánimo",["Mentalidad"]],["心疼",null,"xīnténg","Sentir pena",["Dolerse"]],["辛苦",null,"xīnkǔ","Duro",["Agotador","Esforzarse"]],["欣赏","欣賞","xīnshǎng","Apreciar",["Disfrutar"]],["信念",null,"xìnniàn","Creencia",["Convicción"]],["信箱",null,"xìnxiāng","Buzón",["Casilla"]],["行驶","行駛","xíngshǐ","Conducir",["Circular"]],["形态","形態","xíngtài","Forma",["Aspecto"]],["性能",null,"xìngnéng","Rendimiento",["Capacidad"]],["雄伟","雄偉","xióngwěi","Imponente",["Majestuoso"]],["熊",null,"xióng","Oso",["Oso pardo"]],["休闲","休閒","xiūxián","Recrearse",["Descansar"]],["修复","修復","xiūfù","Restaurar",["Reparar"]],["修建",null,"xiūjiàn","Construir",["Edificar"]],["修养","修養","xiūyǎng","Cultura",["Refinamiento"]],["虚心","虛心","xūxīn","Humilde",["Modesto"]],["许可","許可","xǔkě","Permitir",["Autorizar"]],["选修","選修","xuǎnxiū","Elegir como optativa",["Cursar electivamente"]],["学科","學科","xuékē","Disciplina",["Materia"]],["学位","學位","xuéwèi","Título académico",["Grado"]],["学者","學者","xuézhě","Erudito",["Investigador"]],["寻求","尋求","xúnqiú","Buscar",null],["询问","詢問","xúnwèn","Preguntar",["Consultar"]],["押金",null,"yājīn","Depósito",["Fianza"]],["鸭子","鴨子","yāzi","Pato",["Ánade"]],["亚军","亞軍","yàjūn","Subcampeón",["Segundo lugar"]],["延伸",null,"yánshēn","Extenderse",["Prolongarse"]],["严厉","嚴厲","yánlì","Severo",["Estricto"]],["严肃","嚴肅","yánsù","Serio/a",["Severo"]],["言语","言語","yányǔ","Palabra",["Habla"]],["研究所",null,"yánjiūsuǒ","Instituto de investigación",["Centro de estudio"]],["眼光",null,"yǎnguāng","Mirada",["Criterio","Visión"]],["邀请","邀請","yāoqǐng","Invitar",["Convocatoria"]],["摇头","搖頭","yáotóu","Mover la cabeza",["Negar con la cabeza"]],["咬",null,"yǎo","Morder",["Clavar los dientes"]],["也好",null,"yěhǎo","También vale",["Puede ser"]],["业务","業務","yèwù","Negocio",["Labor profesional"]],["夜间","夜間","yèjiān","Nocturno",["De noche"]],["一流",null,"yīliú","De primera",["Excelente"]],["依法",null,"yīfǎ","Conforme a la ley",["Legalmente"]],["依旧","依舊","yījiù","Seguir igual",["Como antes"]],["依据","依據","yījù","Basarse en",["Fundamento"]],["依照",null,"yīzhào","Según",["Conforme a"]],["一辈子","一輩子","yībèizi","Toda la vida",null],["一带","一帶","yīdài","Zona",["Región"]],["一旦",null,"yīdàn","En cuanto",["Si alguna vez"]],["一句话","一句話","yī jù huà","En una frase",["Dicho de otro modo"]],["一路",null,"yīlù","Todo el camino",["Durante todo el trayecto"]],["一下子",null,"yīxiàzi","De repente",["De golpe"]],["一向",null,"yīxiàng","Siempre",["Constantemente"]],["乙",null,"yǐ","Segundo",["Letra b"]],["以便",null,"yǐbiàn","Para que",["A fin de"]],["以往",null,"yǐwǎng","En el pasado",["Antes"]],["一口气","一口氣","yīkǒuqì","De un tirón",["De una vez"]],["一身",null,"yīshēn","Todo el cuerpo",["Entero"]],["意识","意識","yìshí","Conciencia",["Darse cuenta"]],["意味着","意味著","yìwèizhe","Significar",["Implicar"]],["意志",null,"yìzhì","Voluntad",["Determinación"]],["因而",null,"yīn'ér","Por lo tanto",["Así que"]],["饮料","飲料","yǐnliào","Bebida",["Refresco"]],["饮食","飲食","yǐnshí","Alimentación",["Comida"]],["印刷",null,"yìnshuā","Imprimir",["Publicar"]],["硬",null,"yìng","Duro",["Firme"]],["硬件",null,"yìngjiàn","Hardware",["Equipo físico"]],["拥抱","擁抱","yōngbào","Abrazar",["Abrazo"]],["拥有","擁有","yōngyǒu","Poseer",["Tener"]],["用不着","用不著","yòngbuzháo","No hace falta",["Innecesario"]],["用户","用戶","yònghù","Usuario",["Cliente"]],["用来","用來","yònglái","Sirve para",["Utilizado para"]],["用于","用於","yòngyú","Se usa para",["Destinado a"]],["优惠","優惠","yōuhuì","Favorable",["Con descuento"]],["优先","優先","yōuxiān","Tener prioridad",["Preferir"]],["幽默",null,"yōumò","Humorístico",["Gracioso"]],["尤其",null,"yóuqí","Especialmente",["Sobre todo"]],["由此",null,"yóu cǐ","Por esto",["A partir de aquí"]],["犹豫","猶豫","yóuyù","Dudar",["Indeciso"]],["游泳池",null,"yóuyǒngchí","Piscina",["Pileta"]],["友谊","友誼","yǒuyì","Amistad",["Vínculo"]],["有毒",null,"yǒu dú","Venenoso",["Tóxico"]],["有害",null,"yǒu hài","Dañino",["Perjudicial"]],["有力",null,"yǒulì","Fuerte",["Vigoroso"]],["有利于","有利於","yǒulì yú","Beneficiar",["Ser favorable para"]],["有着","有著","yǒuzhe","Tener",["Poseer"]],["羽毛球",null,"yǔmáoqiú","Bádminton",["Volant"]],["羽绒服","羽絨服","yǔróngfú","Chaqueta de plumón",["Abrigo de plumas"]],["雨水",null,"yǔshuǐ","Lluvia",["Aguacero"]],["预备","預備","yùbèi","Preparar",["Listo"]],["预期","預期","yùqī","Esperar",["Prever"]],["元旦",null,"Yuándàn","Año Nuevo chino",["1 de enero"]],["园林","園林","yuánlín","Jardín",["Parque"]],["原理",null,"yuánlǐ","Principio",["Fundamento"]],["原始",null,"yuánshǐ","Primitivo",["Original"]],["原先",null,"yuánxiān","Originalmente",["Antes"]],["原有",null,"yuányǒu","Existente",["Previo"]],["远处","遠處","yuǎnchù","Lejos",["A distancia"]],["怨",null,"yuàn","Resentirse",["Quejarse"]],["愿","願","yuàn","Tener esperanza",["Esperado","Honesto"]],["约束","約束","yuēshù","Restringir",["Limitar"]],["月饼","月餅","yuèbing","Pasteles de luna",null],["月球",null,"yuèqiú","Luna",["Satélite"]],["阅览室","閱覽室","yuèlǎnshì","Sala de lectura",["Biblioteca"]],["运","運","yùn","Moverse",["Transportar","Destino"]],["运行","運行","yùnxíng","Funcionar",["Operar"]],["灾","災","zāi","Desastre",["Calamidad"]],["灾害","災害","zāihài","Desastre",["Catástrofe"]],["灾难","災難","zāinàn","Tragedia",["Calamidad"]],["灾区","災區","zāiqū","Zona afectada",["Región de desastre"]],["再次",null,"zàicì","Otra vez",["Nuevamente"]],["再也",null,"zài yě","Ya no más",["Nunca más"]],["在场","在場","zàichǎng","Estar presente",["Asistir"]],["在内","在內","zàinèi","Dentro",["Incluido"]],["暂时","暫時","zànshí","Temporario",["Por ahora"]],["暂停","暫停","zàntíng","Suspender",["Pausar"]],["糟",null,"zāo","Malo",["Pésimo"]],["糟糕",null,"zāogāo","Terrible",["Horrible"]],["早期",null,"zǎoqī","Etapa inicial",["Principio"]],["增",null,"zēng","(forma encuadernada) para aumentar; aumentar; para agregar a",null],["增产","增產","zēngchǎn","Aumentar la producción",["Incrementar la producción"]],["增大",null,"zēngdà","Aumentar",["Ampliar"]],["增多",null,"zēngduō","Aumentar",["Multiplicar"]],["增强","增強","zēngqiáng","Fortalecer",["Intensificar"]],["赠","贈","zèng","Regalar",["Obsequiar"]],["赠送","贈送","zèngsòng","Obsequiar",["Hacer un regalo"]],["摘",null,"zhāi","Coger",["Arrancar"]],["展览","展覽","zhǎnlǎn","Exhibir",["Exposición"]],["展示",null,"zhǎnshì","Mostrar",["Presentar"]],["展现","展現","zhǎnxiàn","Mostrar",["Revelar","Desplegarse"]],["占领","佔領","zhànlǐng","Ocupar",["Conquistar"]],["占有","佔有","zhànyǒu","Poseer",["Tener"]],["涨","漲","zhǎng","Subió",["Aumentó","Creció"]],["涨价","漲價","zhǎngjià","Subir de precio",["Encarecer"]],["掌握",null,"zhǎngwò","Dominar",["Controlar"]],["招生",null,"zhāoshēng","Admisión de estudiantes",["Reclutar alumnos"]],["招手",null,"zhāoshǒu","Hacer señas",["Llamar con la mano"]],["珍贵","珍貴","zhēnguì","Precioso",["Valioso"]],["珍惜",null,"zhēnxī","Apreciar",["Valorar"]],["珍珠",null,"zhēnzhū","Perlas",["Burbujas","Tapioca"]],["真诚","真誠","zhēnchéng","Sincero",["Genuino"]],["真理",null,"zhēnlǐ","Verdad",["Principio"]],["真相",null,"zhēnxiàng","Verdad",["Realidad"]],["诊断","診斷","zhěnduàn","Diagnosticar",["Examinar"]],["振动","振動","zhèndòng","Vibrar",["Temblar"]],["震惊","震驚","zhènjīng","Asombrado",["Impactado"]],["争议","爭議","zhēngyì","Disputar",["Debatir"]],["正版",null,"zhèngbǎn","Versión original",["Auténtico"]],["正规","正規","zhèngguī","Oficial",["Regular"]],["正如",null,"zhèngrú","Como",["Tal como"]],["正义","正義","zhèngyì","Justicia",["Justo"]],["证实","證實","zhèngshí","Confirmar",["Verificar"]],["证书","證書","zhèngshū","Certificado",["Credencial","Diploma"]],["挣","掙","zhèng","Ganar",["Esforzarse"]],["挣钱","掙錢","zhèngqián","Ganar dinero",["Trabajar"]],["之内","之內","zhīnèi","Dentro",["Interior"]],["之外",null,"zhīwài","Fuera de",["Excluyendo"]],["之下",null,"zhīxià","Debajo",["Bajo"]],["之中",null,"zhīzhōng","Entre",["Medio"]],["支出",null,"zhīchū","Gasto",["Desembolso"]],["支配",null,"zhīpèi","Controlar",["Gobernar"]],["执行","執行","zhíxíng","Ejecutar",["Aplicar"]],["直线","直線","zhíxiàn","Línea recta",["Directo"]],["值班",null,"zhíbān","Estar de guardia",["Turnar"]],["职能","職能","zhínéng","Función",["Rol"]],["职位","職位","zhíwèi","Puesto",["Cargo"]],["职务","職務","zhíwù","Cargo",["Función"]],["只不过","只不過","zhǐbùguò","Simplemente / únicamente",null],["只见","只見","zhǐ jiàn","Solo se ve",null],["指标","指標","zhǐbiāo","Indicador",null],["指甲",null,"zhǐjia","Uña",null],["指示",null,"zhǐshì","Instrucción / indicar",null],["指责","指責","zhǐzé","Criticar",null],["至",null,"zhì","Hasta",["Llegar","A"]],["制成","製成","zhìchéng","Fabricado",null],["制约","制約","zhìyuē","Restringir",null],["治安",null,"zhì'ān","Seguridad pública",null],["治理",null,"zhìlǐ","Gobernar / administrar",null],["中断","中斷","zhōngduàn","Interrumpir",null],["中秋节","中秋節","Zhōngqiū Jié","Fiesta del medio otoño",null],["中央",null,"zhōngyāng","Centro / central",null],["中药","中藥","zhōngyào","Medicina china",null],["终点","終點","zhōngdiǎn","Final",null],["终身","終身","zhōngshēn","De por vida",null],["终止","終止","zhōngzhǐ","Finalizar",null],["中毒",null,"zhòngdú","Virus",null],["众多","眾多","zhòngduō","Numeroso",null],["周期","週期","zhōuqī","Ciclo",null],["竹子",null,"zhúzi","Bambú",null],["主办","主辦","zhǔbàn","Organizar",null],["主导","主導","zhǔdǎo","Dominar / principal",null],["主观","主觀","zhǔguān","Subjetivo",null],["主管",null,"zhǔguǎn","Supervisar / director",null],["主体","主體","zhǔtǐ","主体",null],["助理",null,"zhùlǐ","Asistente",null],["助手",null,"zhùshǒu","Ayudante",null],["注册","註冊","zhùcè","Registrar",null],["注射",null,"zhùshè","Inyectar",null],["注视","注視","zhùshì","Fijar la vista en",null],["注重",null,"zhùzhòng","Prestar atención a",null],["祝贺","祝賀","zhùhè","Felicitar",null],["专辑","專輯","zhuānjí","Álbum",null],["专利","專利","zhuānlì","Patente",null],["转化","轉化","zhuǎnhuà","Transformar",null],["转换","轉換","zhuǎnhuàn","Cambiar",null],["转让","轉讓","zhuǎnràng","Ceder",null],["转向","轉向","zhuǎnxiàng","Girar hacia",null],["装饰","裝飾","zhuāngshì","Decorar / adorno",null],["撞",null,"zhuàng","Chocar contra",["Toparse con"]],["资本","資本","zīběn","Capital (económico)",null],["资产","資產","zīchǎn","Activos",null],["资助","資助","zīzhù","Financiar",null],["子弹","子彈","zǐdàn","Bala",null],["仔细","仔細","zǐxì","Cuidadoso",null],["紫",null,"zǐ","Morado",null],["自豪",null,"zìháo","Orgulloso",null],["自杀","自殺","zìshā","Suicidarse",null],["自愿","自願","zìyuàn","Voluntario",["Por voluntad propia"]],["总裁","總裁","zǒngcái","Director ejecutivo",null],["总数","總數","zǒngshù","Total",null],["总算","總算","zǒngsuàn","Finalmente",null],["总体","總體","zǒngtǐ","General",null],["阻碍","阻礙","zǔ'ài","Obstaculizar / obstáculo",null],["组织","組織","zǔzhī","Organizar / organización",null],["醉",null,"zuì","Embriagarse",null],["尊敬",null,"zūnjìng","Respetar / respetuoso",null],["尊重",null,"zūnzhòng","Respetar",null],["遵守",null,"zūnshǒu","Cumplir",null]],
'HSK6': [["挨着","挨著","āizhe","Junto a",null],["挨",null,"ái","Sufrió",null],["挨打",null,"áidǎ","Recibir una paliza",null],["安检","安檢","ānjiǎn","Control",null],["罢工","罷工","bàgōng","Ir a la huelga",["Hacer huelga","Parar"]],["罢了","罷了","bàle","Nada más",null],["白领","白領","báilǐng","白领",null],["百分点","百分點","bǎifēndiǎn","Punto porcentual",null],["办公","辦公","bàngōng","Trabajar (en oficina)",null],["办事处","辦事處","bànshìchù","Oficina",null],["办学","辦學","bànxué","Gestionar una escuela",null],["半决赛","半決賽","bànjuésài","Semifinal",null],["傍晚",null,"bàngwǎn","Atardecer",null],["保健",null,"bǎojiàn","Salud",null],["报刊","報刊","bàokān","Prensa",null],["报考","報考","bàokǎo","Presentarse a un examen",null],["抱歉",null,"bàoqiàn","Disculpar",null],["暴风雨","暴風雨","bàofēngyǔ","Tormenta",null],["暴力",null,"bàolì","Violencia",null],["暴露",null,"bàolù","Quedó al descubierto",["Se reveló"]],["暴雨",null,"bàoyǔ","Lluvia torrencial",null],["爆",null,"bào","Explotar",null],["爆发","爆發","bàofā","Estalló",null],["爆炸",null,"bàozhà","Explosión",null],["悲惨","悲慘","bēicǎn","Trágica",null],["背心",null,"bèixīn","Camiseta sin mangas",null],["背着","背著","bèizhe","Cargando",null],["被告",null,"bèigào","Acusado",null],["奔跑",null,"bēnpǎo","Correr",null],["本地",null,"běndì","Local",null],["本期",null,"běn qī","Este período",null],["本身",null,"běnshēn","En sí",null],["本土",null,"běntǔ","Nativo",null],["本质","本質","běnzhì","Esencia",null],["逼",null,"bī","Forzar",null],["笔试","筆試","bǐshì","Examen escrito",null],["必将","必將","bìjiāng","Inevitablemente",null],["必修",null,"bìxiū","Obligatorio",null],["闭","閉","bì","Cerrar",null],["边缘","邊緣","biānyuán","Borde",["Margen"]],["编制","編制","biānzhì","Organizar",null],["扁",null,"biǎn","Aplastada",["Chata"]],["变更","變更","biàngēng","Cambiar",null],["变换","變換","biànhuàn","Transformar",null],["变形","變形","biànxíng","Deformarse",null],["便",null,"biàn","Orinar o defecar",["Usado en 便宜","Usado en 便"]],["便是",null,"biàn shì","Es que",null],["遍地",null,"biàndì","Por todas partes",null],["表面上",null,"biǎomiàn shang","Aparentemente",["En apariencia"]],["病房",null,"bìngfáng","Habitación de hospital",null],["病情",null,"bìngqíng","Estado de la enfermedad",null],["拨打","撥打","bōdǎ","Marcar (teléfono)",null],["波动","波動","bōdòng","Fluctuar",null],["波浪",null,"bōlàng","Olas",null],["播",null,"bō","Transmitir",["Taiwán pr. [bo]","Dispersarse"]],["不便",null,"bùbiàn","Inconveniente / no ser conveniente",null],["不见","不見","bùjiàn","No ver",null],["不料",null,"bùliào","Inesperadamente",["Para sorpresa"]],["不再",null,"bùzài","No más",null],["不至于","不至於","bùzhìyú","No llegar al extremo de",null],["补考","補考","bǔkǎo","Examen de recuperación",null],["补课","補課","bǔkè","Recuperar clases",null],["补习","補習","bǔxí","Estudiar de refuerzo",null],["补助","補助","bǔzhù","Subsidio / ayudar",null],["捕",null,"bǔ","Capturar",null],["不成",null,"bùchéng","No servir",["No poder","¿será posible que …?"]],["不禁",null,"bùjīn","No pude evitar",null],["不仅仅","不僅僅","bù jǐnjǐn","No solo",null],["不通",null,"bùtōng","No pasar / no entender",null],["不怎么","不怎麼","bùzěnme","No muy",null],["不怎么样","不怎麼樣","bùzěnmeyàng","Nada especial",null],["不值",null,"bùzhí","No valer la pena",null],["布满","布滿","bùmǎn","Cubrir de",null],["部队","部隊","bùduì","Tropa",null],["采纳","採納","cǎinà","Adoptó",["Aceptó"]],["踩",null,"cǎi","Pisar",null],["参赛","參賽","cānsài","Participar en una competición",null],["参展","參展","cānzhǎn","Participar en una exposición",null],["餐",null,"cān","Comida",["Comer","Clasificador de comidas"]],["残疾","殘疾","cánjí","Discapacidad",null],["残疾人","殘疾人","cánjírén","Persona con discapacidad",null],["残酷","殘酷","cánkù","Cruel",null],["惨","慘","cǎn","Miserable",null],["仓库","倉庫","cāngkù","Depósito",["Almacén"]],["藏",null,"cáng","Esconder",null],["操纵","操縱","cāozòng","Manejar",["Operar"]],["厕所","廁所","cèsuǒ","Baño",["Inodoro","Letrina"]],["侧","側","cè","Lado / lateral",null],["测定","測定","cèdìng","Medir",null],["策划","策劃","cèhuà","Organizó",["Planificó"]],["策略",null,"cèlüè","Estrategia",null],["层面","層面","céngmiàn","Nivel",null],["差异","差異","chāyì","Diferencia",null],["查出",null,"cháchū","Descubrir / investigar",null],["查看",null,"chákàn","Examinar / revisar",null],["拆迁","拆遷","chāiqiān","Demoler y reubicar",null],["产量","產量","chǎnliàng","Producción",null],["昌盛",null,"chāngshèng","Próspera",["Floreciente"]],["长短","長短","chángduǎn","Longitud",null],["长假","長假","chángjià","Vacaciones largas",null],["长久","長久","chángjiǔ","Duradero / permanente",null],["长跑","長跑","chángpǎo","Carrera de larga distancia",null],["长远","長遠","chángyuǎn","A largo plazo",null],["常规","常規","chángguī","Rutina / procedimiento",null],["常年",null,"chángnián","Durante todo el año / anual",null],["厂商","廠商","chǎngshāng","Fabricante",null],["场地","場地","chǎngdì","Lugar / recinto",null],["场馆","場館","chǎngguǎn","Instalación",null],["场景","場景","chǎngjǐng","Escenario",null],["畅通","暢通","chàngtōng","Despejada",["Sin trabas"]],["超",null,"chāo","Superar",["Adelantar","Cruzar"]],["超出",null,"chāochū","Exceder",null],["炒",null,"chǎo","Saltear / especular",null],["炒股",null,"chǎogǔ","Especular en bolsa",null],["炒作",null,"chǎozuò","Especular / crear sensacionalismo",null],["车号","車號","chēhào","Número de placa",null],["车牌","車牌","chēpái","Patente",["Chapa (del auto)"]],["车展","車展","chēzhǎn","Exposición de automóviles",null],["撤离","撤離","chèlí","Evacuar",null],["撤销","撤銷","chèxiāo","Anulen",["Dejen sin efecto"]],["撑","撐","chēng","Sostener / aguantar",null],["成分",null,"chéngfèn","Componente",null],["成品",null,"chéngpǐn","Producto terminado",null],["承诺","承諾","chéngnuò","Prometió",["Se comprometió"]],["城区","城區","chéngqū","Zona urbana",null],["城乡","城鄉","chéng xiāng","Ciudad y campo",null],["城镇","城鎮","chéngzhèn","Ciudad / pueblo",null],["持有",null,"chíyǒu","Poseer",null],["冲击","衝擊","chōngjī","Golpean",["Pegan contra"]],["重建",null,"chóngjiàn","Reconstruir",null],["重组","重組","chóngzǔ","Reestructurar",null],["崇拜",null,"chóngbài","Admira",["Idolatra"]],["宠物","寵物","chǒngwù","Mascota",null],["出场","出場","chūchǎng","Entrar en escena",null],["出动","出動","chūdòng","Movilizar",null],["出访","出訪","chūfǎng","Visitar oficialmente",null],["出路",null,"chūlù","Futuro",["Un camino"]],["出面",null,"chūmiàn","Intervenir personalmente",null],["出名",null,"chūmíng","Ser famoso",null],["出入",null,"chūrù","Entrar y salir",null],["出事",null,"chūshì","Tener un accidente",null],["出台","出臺","chūtái","Implementar / lanzar",null],["出行",null,"chūxíng","Viajar",null],["初等",null,"chūděng","Elemental / básico",null],["除",null,"chú","Sin incluir",["Dividir","Eliminar"]],["厨师","廚師","chúshī","Cocinero",null],["储存","儲存","chǔcún","Almacenar",["Guardar"]],["处处","處處","chùchù","En todas partes",null],["处长","處長","chùzhǎng","Jefe de departamento",null],["传出","傳出","chuánchū","Difundir",null],["传媒","傳媒","chuánméi","Medios de comunicación",null],["传输","傳輸","chuánshū","Transmitir",null],["传言","傳言","chuányán","Rumor",null],["船员","船員","chuányuán","Miembro de la tripulación",null],["船长","船長","chuánzhǎng","Capitán",null],["船只","船隻","chuánzhī","Barco",null],["串",null,"chuàn","Racimo",null],["窗口",null,"chuāngkǒu","Ventana",null],["创办","創辦","chuàngbàn","Fundar",null],["创建","創建","chuàngjiàn","Crear",null],["创意","創意","chuàngyì","Idea creativa",null],["此处","此處","cǐ chù","En este lugar",null],["此次",null,"cǐ cì","Esta vez",null],["此前",null,"cǐqián","Antes",null],["此事",null,"cǐshì","Este asunto",null],["此致",null,"cǐzhì","Para",null],["次数","次數","cìshù","Número de veces",null],["从不","從不","cóng bù","Nunca",null],["从没","從沒","cóng méi","Nunca",null],["醋",null,"cù","Vinagre",null],["村庄","村莊","cūnzhuāng","Aldea",null],["错过","錯過","cuòguò","Perder",null],["搭",null,"dā","Tomamos",["Agarramos"]],["搭档","搭檔","dādàng","Socio",["Compañero"]],["搭配",null,"dāpèi","Combina",null],["打动","打動","dǎdòng","Conmover",null],["打断","打斷","dǎduàn","Interrumpir",null],["打发","打發","dǎfa","Despedir / desocupar",null],["打官司",null,"dǎ guānsi","Juicio",["Pleito"]],["打牌",null,"dǎpái","Jugar a las cartas",["Jugar mahjong"]],["打印机","打印機","dǎyìnjī","Impresora",null],["打造",null,"dǎzào","Crear / forjar",null],["大道",null,"dàdào","Avenida principal",null],["大街",null,"dàjiē","Calle principal",null],["大力",null,"dàlì","Intensamente",null],["大米",null,"dàmǐ","Arroz",null],["大批",null,"dàpī","Gran cantidad",null],["大赛","大賽","dàsài","Competencia importante",null],["大师","大師","dàshī","Maestro",null],["大使",null,"dàshǐ","Embajador",null],["待会儿","待會兒","dāihuìr","En un rato",null],["担忧","擔憂","dānyōu","Preocuparse",null],["单打","單打","dāndǎ","Individual",null],["诞生","誕生","dànshēng","Nació",null],["党","黨","dǎng","Partido",null],["当成","當成","dàngchéng","Considerar",null],["当天","當天","dàngtiān","Ese día",null],["当作","當作","dàngzuò","Tratar como",null],["档","檔","dàng","Archivo",["Categoría, clase"]],["档案","檔案","dàng'àn","Expedientes",["Archivos"]],["岛","島","dǎo","Isla",null],["到期",null,"dàoqī","Vencer (plazo)",["Expirar"]],["盗版","盜版","dàobǎn","Piratería",null],["道教",null,"Dàojiào","Taoísmo",null],["道歉",null,"dàoqiàn","Disculparse",null],["低头","低頭","dītóu","Bajar la cabeza",null],["低温","低溫","dīwēn","Baja temperatura",null],["滴",null,"dī","Gota / gotear",null],["抵达","抵達","dǐdá","Llegar",null],["抵抗",null,"dǐkàng","Resistir",null],["地板",null,"dìbǎn","Piso",null],["地名",null,"dìmíng","Topónimo",null],["地下室",null,"dìxiàshì","Sótano",null],["电车","電車","diànchē","Tranvía",null],["电动","電動","diàndòng","Eléctrico",null],["电力","電力","diànlì","Electricidad",null],["电器","電器","diànqì","Electrodoméstico",null],["吊",null,"diào","Colgar",null],["调研","調研","diàoyán","Investigar",null],["跌",null,"diē","Caer / bajar",null],["定价","定價","dìngjià","Fijar precio",null],["定时","定時","dìngshí","Programar / cronometrar",null],["定位",null,"dìngwèi","Posicionarse",null],["动画","動畫","dònghuà","Animación",null],["斗争","鬥爭","dòuzhēng","Luchar / lucha",null],["都市",null,"dūshì","Ciudad metropolitana",null],["毒品",null,"dúpǐn","Droga",null],["赌","賭","dǔ","Apostar",null],["赌博","賭博","dǔbó","Jugar / apostar",null],["渡",null,"dù","Cruzar",null],["端",null,"duān","Semilla",null],["端午节","端午節","Duānwǔ Jié","Festival del bote del dragón",null],["短片",null,"duǎnpiàn","Cortometraje",null],["队伍","隊伍","duìwu","Fila",["Tropa","Columna"]],["对抗","對抗","duìkàng","Oponerse",null],["对外","對外","duìwài","Hacia afuera",null],["蹲",null,"dūn","Agacharse",null],["多半",null,"duōbàn","Probablemente",null],["多方面",null,"duō fāngmiàn","En varios aspectos",null],["多媒体","多媒體","duōméitǐ","Multimedia",null],["夺","奪","duó","Quitar / arrebatar",null],["夺取","奪取","duóqǔ","Conquistar / apoderarse",null],["恩人",null,"ēnrén","Benefactor",null],["儿科","兒科","érkē","Pediatría",null],["发病","發病","fābìng","Enfermar",null],["发电","發電","fādiàn","Generar electricidad",null],["发放","發放","fāfàng","Entregar",["Otorgar","Distribuir"]],["发怒","發怒","fānù","Enfadarse",null],["发起","發起","fāqǐ","Iniciar",null],["发言人","發言人","fāyánrén","Portavoz",null],["发炎","發炎","fāyán","Inflamarse",null],["法庭",null,"fǎtíng","Tribunal",null],["法语","法語","Fǎyǔ","Francés (idioma)",null],["番",null,"fān","Vez",null],["番茄",null,"fānqié","Tomate",null],["凡是",null,"fánshì","Todo",null],["繁殖",null,"fánzhí","Reproducirse",null],["反抗",null,"fǎnkàng","Rebelarse",null],["反问","反問","fǎnwèn","Replicar",null],["反响","反響","fǎnxiǎng","Repercusión",null],["犯",null,"fàn","Cometer",null],["犯规","犯規","fànguī","Infringir",null],["犯罪",null,"fànzuì","Delinquir",["Delito"]],["防范","防範","fángfàn","Prevenir",null],["防守",null,"fángshǒu","Defender",null],["房价","房價","fángjià","Precio de la vivienda",null],["仿佛","彷彿","fǎngfú","Parecer",null],["飞船","飛船","fēichuán","Nave espacial",null],["飞行员","飛行員","fēixíngyuán","Piloto",null],["肺",null,"fèi","Pulmón",null],["分工",null,"fēngōng","División del trabajo",null],["分裂",null,"fēnliè","Dividirse",null],["愤怒","憤怒","fènnù","Enojado",null],["风暴","風暴","fēngbào","Tormenta",null],["峰会","峰會","fēnghuì","Cumbre",null],["奉献","奉獻","fèngxiàn","Dedicar",null],["佛",null,"fó","Buda",["Budismo"]],["佛教",null,"Fójiào","Budismo",null],["服",null,"fú","Ropa",null],["浮",null,"fú","Flotar",null],["父女",null,"fùnǚ","Padre e hija",null],["父子",null,"fùzǐ","Padre e hijo",null],["负","負","fù","Soportar",["Dar la espalda","Llevar (en la espalda)"]],["妇女","婦女","fùnǚ","Mujer",null],["复苏","復甦","fùsū","Recuperarse",null],["副",null,"fù","Vice",null],["富人",null,"fùrén","Rico",null],["富有",null,"fùyǒu","Rico",null],["改装","改裝","gǎizhuāng","Modificar",null],["干涉",null,"gānshè","Intervenir",null],["肝",null,"gān","Hígado",null],["杆","桿","gǎn","Vara",null],["赶不上","趕不上","gǎnbushàng","No alcanzar",null],["赶忙","趕忙","gǎnmáng","Apresuradamente",null],["赶上","趕上","gǎnshàng","Alcanzar",null],["敢于","敢於","gǎnyú","Osar",null],["感人",null,"gǎnrén","Conmovedor",null],["刚好","剛好","gānghǎo","Justo",null],["岗位","崗位","gǎngwèi","Puesto",null],["港口",null,"gǎngkǒu","Puerto",null],["高层","高層","gāocéng","Alto nivel",null],["高档","高檔","gāodàng","De alta gama",null],["高等",null,"gāoděng","Superior",null],["高峰",null,"gāofēng","Pico",["Cima","Hora pico"]],["高考",null,"gāokǎo","Examen de ingreso",null],["高科技",null,"gāokējì","Alta tecnología",null],["高手",null,"gāoshǒu","Experto",null],["稿子",null,"gǎozi","Borrador",null],["歌唱",null,"gēchàng","Cantar",null],["歌词","歌詞","gēcí","Letra",null],["歌星",null,"gēxīng","Cantante",null],["革新",null,"géxīn","Innovar",null],["更是",null,"gèng shì","Aún más",null],["工商",null,"gōngshāng","Comercio e industria",null],["公",null,"gōng","Promulgar",["Propiedad colectiva","Justo"]],["公安",null,"gōng'ān","Seguridad pública",null],["公鸡","公雞","gōngjī","Gallo",null],["公众","公眾","gōngzhòng","Público",null],["公主",null,"gōngzhǔ","Princesa",null],["攻击","攻擊","gōngjī","Atacar",null],["供给","供給","gōngjǐ","Suministrar",null],["宫","宮","gōng","Palacio",null],["巩固","鞏固","gǒnggù","Consolidar",null],["贡献","貢獻","gòngxiàn","Contribuir",null],["构建","構建","gòujiàn","Construir",null],["孤独","孤獨","gūdú","Solitario",null],["孤儿","孤兒","gū'ér","Huérfano",null],["姑姑",null,"gūgu","Tía paterna",null],["古典",null,"gǔdiǎn","Clásico",null],["股",null,"gǔ","Acción",null],["股东","股東","gǔdōng","Accionista",null],["股票",null,"gǔpiào","Acción",null],["故障",null,"gùzhàng","Avería",["Falla","Mal funcionamiento"]],["顾","顧","gù","Tomar en consideración",["Cuidar","Atender a"]],["刮",null,"guā","Raspar",null],["拐",null,"guǎi","Torcer",null],["关爱","關愛","guān'ài","Cuidar",null],["关联","關聯","guānlián","Relacionar",null],["观光","觀光","guānguāng","Visitar",null],["官司",null,"guānsi","Litigio",null],["管道",null,"guǎndào","Tubería",null],["光辉","光輝","guānghuī","Esplendor",null],["广阔","廣闊","guǎngkuò","Amplio",null],["轨道","軌道","guǐdào","Vía",null],["跪",null,"guì","Arrodillarse",null],["国产","國產","guóchǎn","Nacional",null],["国歌","國歌","guógē","Himno nacional",null],["国会","國會","guóhuì","Parlamento",null],["国旗","國旗","guóqí","Bandera nacional",null],["国王","國王","guówáng","Rey",null],["果酱","果醬","guǒjiàng","Mermelada",null],["果树","果樹","guǒshù","Árbol frutal",null],["过渡","過渡","guòdù","Transición",null],["过后","過後","guòhòu","Después",null],["过时","過時","guòshí","Anticuado",null],["海报","海報","hǎibào","Cartel",null],["海底",null,"hǎidǐ","Fondo marino",null],["海军","海軍","hǎijūn","Marina",null],["海浪",null,"hǎilàng","Ola (del mar)",null],["海外",null,"hǎiwài","Extranjero",null],["海湾","海灣","hǎiwān","Bahía",null],["海洋",null,"hǎiyáng","Océano",null],["好容易",null,"hǎo(bù)róngyì","Con mucha dificultad",["Finalmente"]],["好似",null,"hǎosì","Parecer",null],["好转","好轉","hǎozhuǎn","Mejorar",null],["好学","好學","hàoxué","Estudioso",["Con ganas de aprender"]],["合约","合約","héyuē","Contrato",null],["和谐","和諧","héxié","Armonioso",null],["核心",null,"héxīn","Núcleo",null],["黑夜",null,"hēiyè","Noche",null],["很难说","很難說","hěn nánshuō","Difícil de decir",null],["狠",null,"hěn","Cruel",null],["横","橫","héng","Obstinado",["Arrogante"]],["衡量",null,"héngliáng","Medir",["Evaluar","Pesar"]],["宏大",null,"hóngdà","Grande",["Enorme","Masivo"]],["洪水",null,"hóngshuǐ","Inundación",["Riada","Creciente"]],["忽略",null,"hūlüè","Pasar por alto",["Omitir","Desatender"]],["壶","壺","hú","Jarra",["Cántaro","Vaso"]],["互动","互動","hùdòng","Interactuar",["Comunicarse","Dialógo"]],["户外","戶外","hùwài","Exterior",["Afuera","Naturaleza"]],["护","護","hù","Proteger",null],["花费","花費","huāfèi","Gastar",["Invertir","Despender"]],["花瓶",null,"huāpíng","Florero",["Jarrón","Vaso"]],["花生",null,"huāshēng","Maní",["Cacahuete","Cacahuate"]],["化解",null,"huàjiě","Resolver",["Disolver","Superar"]],["幻想",null,"huànxiǎng","Imaginar",["Soñar","Ensoñar"]],["患者",null,"huànzhě","Paciente",["Enfermo","Doliente"]],["皇帝",null,"huángdì","Emperador",["Monarca","Soberano"]],["回应","回應","huíyìng","Responder",["Reaccionar","Contestar"]],["毁","毀","huǐ","Destruir",["Arruinar","Dañar"]],["会见","會見","huìjiàn","Reunirse",["Encontrarse","Ver"]],["会长","會長","huìzhǎng","Presidente",["Director","Jefe"]],["绘画","繪畫","huìhuà","Pintar",["Dibujar","Esbozar"]],["昏",null,"hūn","Oscurecer",["Atardecer","Embotar"]],["混",null,"hùn","Mezclar",["Combinar","Juntar"]],["混合",null,"hùnhé","Mezclar",["Combinar","Unir"]],["混乱","混亂","hùnluàn","Desordenado",["Caótico","Desorganizado"]],["活跃","活躍","huóyuè","Activo",["Dinámico","Animado"]],["火箭",null,"huǒjiàn","Cohete",["Misil","Proyectil"]],["机动车","機動車","jīdòngchē","Vehículo automotor",["Auto","Moto"]],["机关","機關","jīguān","机关",["Mecanismo","Institución"]],["机械","機械","jīxiè","Maquinaria",["Ingenio","Mecánica"]],["基督教",null,"Jīdūjiào","Cristianismo",["Fe"]],["激情",null,"jīqíng","Pasión",["Entusiasmo","Ardor"]],["吉利",null,"jílì","Afortunado",["Propicio","Suerte"]],["吉祥",null,"jíxiáng","Auspicioso",["Bendito","Venturoso"]],["极端","極端","jíduān","Extremo",["Radical","Máximo"]],["急救",null,"jíjiù","Primeros auxilios",["Socorrer","Emergencia"]],["疾病",null,"jíbìng","Enfermedad",["Dolencia","Malestar"]],["集",null,"jí","Obras recopiladas",["Recoger","Reunir"]],["给予","給予","jǐyǔ","Dar",["Otorgar","Conceder"]],["加盟",null,"jiāméng","Afiliarse",["Unirse","Associarse"]],["家电","家電","jiādiàn","Electrodomésticos",["Aparatos","Hogar"]],["家园","家園","jiāyuán","Hogar",["Tierra natal"]],["嘉宾","嘉賓","jiābīn","Invitado",["Huésped","Visitante"]],["假日",null,"jiàrì","Día festivo",["Vacaciones","Puente"]],["尖",null,"jiān","Puntiagudo",["Agudo","Afilado"]],["监测","監測","jiāncè","Supervisar",["Vigilar","Controlar"]],["监督","監督","jiāndū","Supervisar",["Inspeccionar","Fiscalizar"]],["捡","撿","jiǎn","Recoger",["Levizar","Recuperar"]],["简介","簡介","jiǎnjiè","Resumir",["Sinopsis","Resumen"]],["剑","劍","jiàn","Espada",["Sable","Cuchilla"]],["鉴定","鑑定","jiàndìng","Evaluar",["Identificar","Juzgar"]],["箭",null,"jiàn","Flecha",["Dardo","Proyectil"]],["将军","將軍","jiāngjūn","General",["Comandante","Mariscal"]],["讲课","講課","jiǎngkè","Dar clase",["Enseñar","Explicar"]],["酱","醬","jiàng","Salsa",["Pasta","Condimento"]],["酱油","醬油","jiàngyóu","Salsa de soja",["Soya","Fermento"]],["骄傲","驕傲","jiāo'ào","Orgulloso",["Altivo","Arrogante"]],["焦点","焦點","jiāodiǎn","Foco",["Centro","Interés"]],["脚印","腳印","jiǎoyìn","Huella",["Pisada","Señal"]],["觉","覺","jiào","Dormir (sueño)",null],["教堂",null,"jiàotáng","Iglesia",["Templo","Santuario"]],["教育部",null,"jiàoyùbù","Ministerio de educación",["Educativo","Académico"]],["接收",null,"jiēshōu","Recibir",["Aceptar","Tomar"]],["揭",null,"jiē","Descubrir",["Revelar","Quitar"]],["街头","街頭","jiētóu","Calle",["Esquina","Avenida"]],["节假日","節假日","jiéjiàrì","Día festivo",["Vacaciones","Puente"]],["节能","節能","jiénéng","Ahorrar energía",["Eficiente","Económico"]],["节奏","節奏","jiézòu","Ritmo",["Cadencia","Pulso"]],["杰出","傑出","jiéchū","Destacado",["Excelente","Notable"]],["截止",null,"jiézhǐ","Finalizar",["Terminar","Cerrar"]],["截至",null,"jiézhì","Hasta",["Finalizado"]],["解",null,"jiě","Una solución",["Una disección","Explicar"]],["解说","解說","jiěshuō","Explicar",["Comentar","Describir"]],["界",null,"jiè","(forma encuadernada) límite; borde",["(forma encuadernada) reino"]],["借鉴","借鑒","jièjiàn","Tomar como ejemplo",["Copiar","Aprender"]],["金额","金額","jīn'é","Cantidad",["Suma","Monto"]],["金钱","金錢","jīnqián","Dinero",null],["金融",null,"jīnróng","Finanzas",["Dinero","Economía"]],["尽","盡","jìn","(cuando se usa antes de un sustantivo de ubicación) más lejano o extremo",["Finalizado","Agotar"]],["进攻","進攻","jìngōng","Atacar",["Asaltar","Avanzar"]],["近日",null,"jìnrì","Últimamente",["Hace poco","Reciente"]],["近视","近視","jìnshì","Miope",["Corto de vista"]],["惊人","驚人","jīngrén","Asombroso",["Increíble","Extraordinario"]],["惊喜","驚喜","jīngxǐ","Sorpresa",["Asombro","Emoción"]],["精",null,"jīng","Altamente perfeccionado",["Esencia","Élite"]],["精美",null,"jīngměi","Exquisito",["Delicado","Bello"]],["精品",null,"jīngpǐn","Producto de calidad",["Lujo","Primera"]],["井",null,"jǐng","Pozo",["Fuente","Hoyo"]],["景",null,"jǐng","(literario) luz del sol",["(forma encuadernada) paisaje","Escena (de una obra de teatro)"]],["景点","景點","jǐngdiǎn","Atracción",["Lugar","Destino"]],["净","淨","jìng","Limpio",["Neto"]],["纠纷","糾紛","jiūfēn","Disputa",["Conflicto","Controversia"]],["纠正","糾正","jiūzhèng","Corregir",["Enmendar","Fijar"]],["酒水",null,"jiǔshuǐ","Bebidas alcohólicas",["Alcohol","Licor"]],["救命",null,"jiùmìng","Salvar la vida",["Socorrer","Rescatar"]],["救援",null,"jiùyuán","Rescatar",["Auxiliar","Salvar"]],["救助",null,"jiùzhù","Ayudar",["Socorrer","Auxiliar"]],["就是说","就是說","jiùshìshuō","Es decir",["O sea","Esto es"]],["就算",null,"jiùsuàn","Incluso si",["Aunque","Aun si"]],["剧","劇","jù","Obra teatral (obra teatral, ópera, serie de televisión, etc.)",["Severo","Agudo"]],["据","據","jù","Usado en 据",["De acuerdo a","Variante de 据"]],["捐",null,"juān","Donar",["Contribuir","Ceder"]],["捐款",null,"juānkuǎn","Donación",["Aporte","Obsequio"]],["捐赠","捐贈","juānzèng","Donar",["Contribuir","Ceder"]],["捐助",null,"juānzhù","Ayudar",["Apoyar","Sostener"]],["决策","決策","juécè","Tomar decisiones",["Decidir","Elegir"]],["觉悟","覺悟","juéwù","Darse cuenta",["Comprender","Realizar"]],["绝","絕","jué","De ninguna manera",["Desaparecer","Para acortar"]],["绝大多数","絕大多數","jué dàduōshù","Inmensa mayoría",["Casi todos","Prácticamente"]],["军队","軍隊","jūnduì","Ejército",["Tropas"]],["军舰","軍艦","jūnjiàn","Buque de guerra",["Navío","Barco"]],["军事","軍事","jūnshì","Militar",["Ejército","Guerra"]],["开创","開創","kāichuàng","Crear",["Iniciar","Fundar"]],["开关","開關","kāiguān","Interruptor",["Llave","Botón"]],["开设","開設","kāishè","Ofrecer (servicios)",["Abrir (un negocio)"]],["开通","開通","kāitōng","Habilitar",["Inaugurar","Abierto (de mente)"]],["开头","開頭","kāitóu","Principio",["Inicio","Comienzo"]],["开夜车","開夜車","kāi yèchē","Estudiar de noche",["Trabajar hasta tarde"]],["看管",null,"kānguǎn","Vigilar",["Cuidar","Controlar"]],["看得见","看得見","kàndejiàn","Ser visible",["Aparecer","Verse"]],["看得起",null,"kàndeqǐ","Apreciar",["Respetar","Valorar"]],["看好",null,"kànhǎo","Tener buena opinión",["Esperar","Confiar"]],["看作",null,"kànzuò","Considerar",["Tratar","Ver"]],["康复","康復","kāngfù","Recuperarse",["Sanar","Mejorar"]],["抗议","抗議","kàngyì","Protestar",["Objetar","Reclamar"]],["考场","考場","kǎochǎng","Aula de examen",null],["考题","考題","kǎotí","Pregunta de examen",["Prueba","Examen"]],["科研",null,"kēyán","Investigación científica",["Estudio","Investigar"]],["客车","客車","kèchē","Autobús",["Colectivo","Ómnibus"]],["肯",null,"kěn","Estar dispuesto",null],["空军","空軍","kōngjūn","Fuerza aérea",null],["口试","口試","kǒushì","Examen oral",["Prueba verbal"]],["扣",null,"kòu","Deducir",["Quitar","Fijar"]],["酷",null,"kù","Genial",["Moderno","Estilo"]],["跨",null,"kuà","Cruzar",["Pasar","Saltar"]],["快车","快車","kuàichē","Tren expreso",["Rápido","Veloz"]],["宽阔","寬闊","kuānkuò","Amplio",["Extenso"]],["矿","礦","kuàng","Mina",null],["阔","闊","kuò","Amplio",null],["啦",null,"la","Partícula final",null],["来往","來往","láiwǎng","Visitar",null],["赖","賴","lài","Depender/perezoso",null],["栏目","欄目","lánmù","Sección",null],["蓝领","藍領","lánlǐng","Trabajador manual",null],["蓝天","藍天","lán tiān","Cielo azul",null],["懒","懶","lǎn","Perezoso",null],["牢",null,"láo","Firme",null],["老乡","老鄉","lǎoxiāng","Paisano",null],["冷气","冷氣","lěngqì","Aire acondicionado",null],["冷水",null,"lěngshuǐ","Agua fría",null],["礼堂","禮堂","lǐtáng","Auditorio",null],["理",null,"lǐ","Razón",["Gestionar","Veta (de madera)"]],["理财","理財","lǐcái","Administrar finanzas",null],["理智",null,"lǐzhì","Razón",null],["利",null,"lì","Beneficio",["Ventaja","Afilado"]],["联盟","聯盟","liánméng","Alianza",null],["联赛","聯賽","liánsài","Liga",null],["联手","聯手","liánshǒu","Colaborar",null],["凉鞋","涼鞋","liángxié","Sandalias",null],["两侧","兩側","liǎngcè","Ambos lados",null],["两手","兩手","liǎngshǒu","Ambas manos",null],["聊",null,"liáo","Charlar",["Un poco (literario)"]],["聊天儿","聊天兒","liáotiānr","Charlar",null],["料",null,"liào","Material",["Ingrediente","Esperar, prever"]],["裂",null,"liè","Romper",null],["灵活","靈活","línghuó","Flexible",null],["领取","領取","lǐngqǔ","Recoger",null],["领袖","領袖","lǐngxiù","Líder",null],["另",null,"lìng","Otro",["Separado","Por separado"]],["留言",null,"liúyán","Dejar mensaje/glosa",null],["流感",null,"liúgǎn","Gripe",null],["楼道","樓道","lóudào","Pasillo",null],["楼房","樓房","lóufáng","Edificio",null],["露",null,"lòu","Mostrar",null],["陆军","陸軍","lùjūn","Ejército terrestre",null],["录像","錄像","lùxiàng","Grabar video",null],["录音机","錄音機","lùyīnjī","Grabadora",null],["路过","路過","lùguò","Pasar por",null],["旅店",null,"lǚdiàn","Hostal",null],["绿化","綠化","lǜhuà","Reforestar",null],["马车","馬車","mǎchē","Carro",null],["嘛",null,"ma","Partícula",null],["埋",null,"mái","Enterrar",null],["馒头","饅頭","mántou","Mantou",null],["慢车","慢車","mànchē","Tren lento",null],["盲人",null,"mángrén","Ciego",null],["梅花",null,"méihuā","Flor de ciruelo",null],["美容",null,"měiróng","Embellecer",null],["蒙",null,"mēng","Cubrir",null],["猛",null,"měng","Feroz",null],["棉",null,"mián","Algodón",null],["免得",null,"miǎnde","Para que",null],["面对面","面對面","miànduìmiàn","Cara a cara",null],["面向","面嚮","miànxiàng","Orientar",null],["妙",null,"miào","Maravilloso",null],["灭","滅","miè","Extinguir",null],["民歌",null,"míngē","Canción folclórica",null],["民工",null,"míngōng","Trabajador migrante",null],["民警",null,"mínjǐng","Policía",null],["民意",null,"mínyì","Opinión pública",null],["民主",null,"mínzhǔ","Democrático",null],["名额","名額","míng'é","Cuota",null],["名胜","名勝","míngshèng","Lugar famoso",null],["名义","名義","míngyì","Nombre",null],["名誉","名譽","míngyù","Reputación",null],["明日",null,"míngrì","Mañana",null],["命",null,"mìng","Vida",["Destino","Orden o comando"]],["膜",null,"mó","Membrana",null],["磨",null,"mó","Moler",null],["没收","沒收","mòshōu","Confiscar",null],["墨水",null,"mòshuǐ","Tinta",null],["母",null,"mǔ","Pariente anciana",["Madre","Fuente"]],["母鸡","母雞","mǔjī","Gallina",null],["母女",null,"mǔnǚ","Madre e hija",null],["母子",null,"mǔzǐ","Madre e hijo",null],["墓",null,"mù","Tumba",null],["拿走",null,"názǒu","Llevarse",null],["奶粉",null,"nǎifěn","Leche en polvo",null],["奶牛",null,"nǎiniú","Vaca lechera",null],["难忘","難忘","nánwàng","Recordar",null],["内地","內地","nèidì","Interior",null],["内外","內外","nèiwài","Interior y exterior",null],["内衣","內衣","nèiyī","Ropa interior",null],["能否",null,"néngfǒu","Poder",null],["泥",null,"ní","Lodo",null],["扭",null,"niǔ","Torcer",null],["排行榜",null,"páihángbǎng","Lista",null],["派出",null,"pàichū","Enviar",null],["判",null,"pàn","Discriminar",["Claramente distinguible","Sentenciar"]],["盼望",null,"pànwàng","Esperar",null],["泡",null,"pào","Remojar/café",null],["炮",null,"pào","Cañón",null],["陪同",null,"péitóng","Acompañar",null],["配置",null,"pèizhì","Configurar",null],["皮球",null,"píqiú","Pelota",null],["偏",null,"piān","Sesgado/parcialmente",null],["贫困","貧困","pínkùn","Pobre",null],["品牌",null,"pǐnpái","Marca",null],["聘请","聘請","pìnqǐng","Contratar",null],["平凡",null,"píngfán","Común",null],["平方米",null,"píngfāngmǐ","Metro cuadrado",null],["平衡",null,"pínghéng","Equilibrado",null],["平台","平臺","píngtái","Plataforma",null],["评","評","píng","Comentar",["Criticar","Discutir"]],["评选","評選","píngxuǎn","Elegir",null],["屏幕",null,"píngmù","Pantalla",null],["坡",null,"pō","Pendiente",null],["扑","撲","pū","Golpear",null],["铺","鋪","pū","Extender",null],["欺负","欺負","qīfu","Intimidar",null],["奇妙",null,"qímiào","Maravilloso",null],["企图","企圖","qǐtú","Intentar",null],["起点","起點","qǐdiǎn","Punto de partida",null],["起诉","起訴","qǐsù","Demandar",null],["气氛","氣氛","qìfēn","Ambiente",null],["恰当","恰當","qiàdàng","Adecuado",null],["恰好",null,"qiàhǎo","Justo",null],["恰恰",null,"qiàqià","Precisamente",null],["牵","牽","qiān","Tirar",null],["铅笔","鉛筆","qiānbǐ","Lápiz",null],["谦虚","謙虛","qiānxū","Modesto",["Humilde"]],["前方",null,"qiánfāng","Frente",null],["前来","前來","qiánlái","Venir",null],["潜力","潛力","qiánlì","Potencial",null],["强盗","強盜","qiángdào","Ladrón",["Bandido"]],["强化","強化","qiánghuà","Fortalecer",["Reforzar"]],["强势","強勢","qiángshì","Poderío",["Dominante"]],["强壮","強壯","qiángzhuàng","Fuerte",["Robusto"]],["桥梁","橋梁","qiáoliáng","Puente",["Pasarela"]],["巧妙",null,"qiǎomiào","Ingenioso",["Astuto"]],["茄子",null,"qiézi","Berenjena",null],["切实","切實","qièshí","Práctico",["Concreto"]],["侵犯",null,"qīnfàn","Violar",["Infringir"]],["亲属","親屬","qīnshǔ","Pariente",["Familiar"]],["亲眼","親眼","qīnyǎn","Con los propios ojos",["En persona"]],["倾向","傾向","qīngxiàng","Tender",["Inclinación"]],["清",null,"qīng","Puro; incorrupto",["Apellido Qing","Limpiar; saldar (cuentas)"]],["清洁","清潔","qīngjié","Limpio",["Aseado"]],["清洁工","清潔工","qīngjiégōng","Limpiador",["Conserje"]],["清明节","清明節","Qīngmíng Jié","Festival Qingming",null],["清洗",null,"qīngxǐ","Lavar",["Limpiar"]],["情绪","情緒","qíngxù","Emoción",["Ánimo"]],["求职","求職","qiúzhí","Buscar empleo",null],["球拍",null,"qiúpāi","Raqueta",null],["球星",null,"qiúxīng","Estrella del deporte",["Jugador estrella"]],["球员","球員","qiúyuán","Jugador",["Deportista"]],["区分","區分","qūfēn","Distinguir",["Diferenciar"]],["渠道",null,"qúdào","Canal",["Vía"]],["取款",null,"qǔkuǎn","Retirar dinero",null],["取款机","取款機","qǔkuǎnjī","Cajero automático",null],["去掉",null,"qùdiào","Quitar",["Eliminar"]],["权","權","quán","Poder",["Autoridad"]],["权力","權力","quánlì","Poder",["Autoridad"]],["全力",null,"quánlì","Con todo",["Máximo esfuerzo"]],["全新",null,"quánxīn","Totalmente nuevo",null],["券",null,"quàn","Cupón",["Boleto"]],["缺陷",null,"quēxiàn","Defecto",["Fallo"]],["却是","卻是","què shì","Pero",["Sin embargo"]],["让座","讓座","ràngzuò","Ceder el asiento",null],["热点","熱點","rèdiǎn","Tema candente",["Punto caliente"]],["热水","熱水","rèshuǐ","Agua caliente",null],["热水器","熱水器","rèshuǐqì","Calentador de agua",["Termotanque"]],["热线","熱線","rèxiàn","Línea directa",null],["人权","人權","rénquán","Derechos humanos",null],["认同","認同","rèntóng","Identificar",["Aceptar"]],["日夜",null,"rìyè","Día y noche",null],["日语","日語","Rìyǔ","Idioma japonés",null],["融合",null,"rónghé","Fusionar",["Mezclar"]],["融入",null,"róngrù","Integrarse",null],["如",null,"rú","Como",["Como si"]],["如一",null,"rúyī","Consistente",["Uniforme"]],["乳制品","乳製品","rǔzhìpǐn","Lácteos",null],["入",null,"rù","Entrar",["Abbr. para 入声","Unirse"]],["入学","入學","rùxué","Ingresar a la escuela",null],["若",null,"ruò","Parecer",["Como","Si"]],["塞",null,"sāi","Tapar",["Rellenar","Tapón (sāi)"]],["赛","賽","sài","Superar",["Fósforo","Sobresalir"]],["赛场","賽場","sàichǎng","Campo de juego",null],["三明治",null,"sānmíngzhì","Sándwich",null],["丧失","喪失","sàngshī","Perder",null],["山峰",null,"shānfēng","Cima",["Pico"]],["山谷",null,"shāngǔ","Valle",["Cañón"]],["山坡",null,"shānpō","Ladera",["Pendiente"]],["伤口","傷口","shāngkǒu","Herida",["Llaga"]],["伤亡","傷亡","shāngwáng","Bajas",["Víctimas"]],["伤员","傷員","shāngyuán","Herido",["Damnificado"]],["商城",null,"shāngchéng","Centro comercial",null],["上当","上當","shàngdàng","Ser estafado",["Caer en la trampa"]],["上帝",null,"Shàngdì","Dios",null],["上市",null,"shàngshì","Salir al mercado",null],["上台",null,"shàngtái","Subir al escenario",["Llegar al poder"]],["上演",null,"shàngyǎn","Representar",["Escenificar"]],["勺",null,"sháo","Cuchara",null],["少儿","少兒","shào'ér","Niño",["Infante"]],["舌头","舌頭","shétou","Lengua",null],["设计师","設計師","shèjìshī","Diseñador",null],["涉及",null,"shèjí","Involucrar",["Tratar"]],["深化",null,"shēnhuà","Profundizar",null],["深深",null,"shēnshēn","Profundamente",null],["审查","審查","shěnchá","Revisar",["Examinar"]],["升级","升級","shēngjí","Actualizar",["Mejorar"]],["升学","升學","shēngxué","Continuar estudios",null],["升值",null,"shēngzhí","Apreciarse",["Incrementar valor"]],["生活费","生活費","shēnghuófèi","Gastos de vida",null],["省钱","省錢","shěngqián","Ahorrar",null],["圣诞节","聖誕節","Shèngdàn Jié","Navidad",null],["盛行",null,"shèngxíng","Prevalecer",["Estar de moda"]],["师父","師父","shīfu","Maestro",["Instructor"]],["师生","師生","shīshēng","Maestros y alumnos",null],["时而","時而","shí'ér","A veces",["Ocasionalmente"]],["时节","時節","shíjié","Estación",["Época"]],["时期","時期","shíqī","Período",["Etapa"]],["时时","時時","shíshí","Constantemente",["Siempre"]],["时装","時裝","shízhuāng","Moda",["Vestimenta"]],["识","識","shí","Conocer",["Saber"]],["识字","識字","shízì","Aprender caracteres",null],["实践","實踐","shíjiàn","Practicar",["Aplicación"]],["食欲","食慾","shíyù","Apetito",null],["市民",null,"shìmín","Ciudadano",["Vecino (de una ciudad)"]],["事后","事後","shìhòu","Después",null],["试点","試點","shìdiǎn","Experimentar",["Proyecto piloto"]],["适当","適當","shìdàng","Adecuado",["Conveniente"]],["收藏",null,"shōucáng","Coleccionar",["Guardar"]],["收取",null,"shōuqǔ","Cobrar",["Recoger"]],["收养","收養","shōuyǎng","Adoptar",null],["手续费","手續費","shǒuxùfèi","Comisión",null],["首次",null,"shǒucì","Primera vez",null],["首脑","首腦","shǒunǎo","Líder",["Jefe"]],["首席",null,"shǒuxí","Principal",null],["首相",null,"shǒuxiàng","Primer ministro",null],["书房","書房","shūfáng","Estudio",["Biblioteca"]],["薯片",null,"shǔpiàn","Papas fritas",null],["薯条","薯條","shǔtiáo","Papas fritas",["Patatas fritas"]],["双打","雙打","shuāngdǎ","Dobles",null],["爽",null,"shuǎng","Genial",["Agradable"]],["水泥",null,"shuǐní","Cemento",null],["税","稅","shuì","Impuesto",null],["顺","順","shùn","Hacer razonable",["Seguir","Arreglar"]],["说明书","說明書","shuōmíngshū","Manual",["Instrucciones"]],["说实话","說實話","shuō shíhuà","Decir la verdad",null],["司长","司長","sīzhǎng","Director general",null],["死亡",null,"sǐwáng","Morir",["Fallecer"]],["四处","四處","sìchù","Por todas partes",null],["寺",null,"sì","Templo",null],["送礼","送禮","sònglǐ","Dar regalos",null],["送行",null,"sòngxíng","Despedir",null],["素质","素質","sùzhì","Calidad",["Aptitud"]],["算了",null,"suànle","Olvidarlo",["Mejor no"]],["算是",null,"suànshì","Considerar",["Se puede decir"]],["虽","雖","suī","A pesar de",null],["岁数","歲數","suìshu","Edad",null],["踏实","踏實","tāshi","Firme",["Confiable"]],["塔",null,"tǎ","Torre",null],["踏",null,"tà","Pisar",null],["台灯","檯燈","táidēng","Lámpara de escritorio",null],["太阳能","太陽能","tàiyángnéng","Energía solar",null],["叹气","嘆氣","tànqì","Suspirar",null],["探索",null,"tànsuǒ","Explorar",["Sondear"]],["探讨","探討","tàntǎo","Investigar",null],["趟",null,"tàng","Viaje (clasificador: una pasada de ida y vuelta)",null],["掏",null,"tāo","Sacar",null],["特",null,"tè","Distinguido",["Muy","Especialmente"]],["特大",null,"tèdà","Muy grande",null],["特地",null,"tèdì","Específicamente",null],["特快",null,"tèkuài","Expreso",null],["特意",null,"tèyì","Deliberadamente",null],["疼痛",null,"téngtòng","Doloroso",null],["踢",null,"tī","Patear",["Jugar (fútbol)"]],["提交",null,"tíjiāo","Presentar",["Entregar (un informe)"]],["提升",null,"tíshēng","Elevar",null],["天然",null,"tiānrán","Natural",null],["天堂",null,"tiāntáng","Paraíso",null],["天下",null,"tiānxià","El mundo",["Todo el país"]],["添",null,"tiān","Añadir",null],["田",null,"tián","Campo",null],["田径","田徑","tiánjìng","Atletismo",null],["跳水",null,"tiàoshuǐ","Saltar al agua",null],["听取","聽取","tīngqǔ","Escuchar (un informe)",["Tomar en cuenta"]],["通报","通報","tōngbào","Informar/noticia",null],["通道",null,"tōngdào","Pasadizo",null],["通红","通紅","tōnghóng","Rojo vivo",null],["通话","通話","tōnghuà","Hablar por teléfono",null],["通行",null,"tōngxíng","Pasar",null],["通讯","通訊","tōngxùn","Comunicación",null],["同",null,"tóng","Mismo",["Juntos"]],["同胞",null,"tóngbāo","Compatriota",null],["同行",null,"tóngháng","Colega",null],["同期",null,"tóngqī","Período mismo",null],["同一",null,"tóngyī","Mismo",null],["铜牌","銅牌","tóngpái","Medalla de bronce",null],["头疼","頭疼","tóuténg","Dolor de cabeza",null],["投票",null,"tóupiào","Votar",null],["透露",null,"tòulù","Revelar",null],["图书","圖書","túshū","Libros (de biblioteca o librería)",null],["徒弟",null,"túdì","Aprendiz",["Discípulo"]],["途径","途徑","tújìng","Vía",null],["团队","團隊","tuánduì","Equipo",null],["推出",null,"tuīchū","Lanzar",null],["退票",null,"tuìpiào","Devolver billete",null],["吞",null,"tūn","Tragar",null],["托",null,"tuō","Encargar",null],["拖",null,"tuō","Arrastrar",null],["拖鞋",null,"tuōxié","Chanclas",null],["挖",null,"wā","Cavar",null],["娃娃",null,"wáwa","Muñeca",null],["哇",null,"wa","Expresión asombro",null],["外币","外幣","wàibì","Moneda extranjera",null],["外部",null,"wàibù","Exterior",null],["外出",null,"wàichū","Salir",null],["外观","外觀","wàiguān","Apariencia",null],["外科",null,"wàikē","Cirugía",null],["外来","外來","wàilái","Extranjero",null],["外头","外頭","wàitou","Afuera",null],["外衣",null,"wàiyī","Abrigo",null],["外资","外資","wàizī","Inversión extranjera",null],["弯曲","彎曲","wānqū","Curvo",null],["顽皮","頑皮","wánpí","Travieso",null],["顽强","頑強","wánqiáng","顽强",null],["王后",null,"wánghòu","Reina",null],["王子",null,"wángzǐ","Príncipe",null],["网吧","網吧","wǎngbā","Cibercafé",null],["网页","網頁","wǎngyè","Página web",null],["往后","往後","wǎnghòu","Futuro",null],["往来","往來","wǎnglái","Interactuar",null],["往年",null,"wǎngnián","Años anteriores",null],["望见","望見","wàngjiàn","Ver a lo lejos",null],["危机","危機","wēijī","Crisis",null],["威胁","威脅","wēixié","Amenazar",null],["微波炉","微波爐","wēibōlú","Microondas",null],["维生素","維生素","wéishēngsù","Vitamina",null],["为此","為此","wèicǐ","Por lo tanto",null],["为何","為何","wèihé","Por qué",null],["文娱","文娛","wényú","Cultura y entretenimiento",null],["卧铺","臥鋪","wòpù","Litera",null],["乌云","烏雲","wūyún","Nube oscura",null],["无边","無邊","wúbiān","Ilimitado",null],["无关","無關","wúguān","No relacionado",null],["无效","無效","wúxiào","Inválido",null],["舞蹈",null,"wǔdǎo","Danza",null],["物品",null,"wùpǐn","Objeto",null],["误","誤","wù","Hacer daño",["Retrasar","Descuidar"]],["西班牙语","西班牙語","Xībānyáyǔ","Español (idioma)",null],["吸毒",null,"xīdú","Consumir drogas",null],["牺牲","犧牲","xīshēng","Sacrificar",null],["洗衣粉",null,"xǐyīfěn","Detergente",null],["戏曲","戲曲","xìqǔ","Ópera tradicional",null],["细胞","細胞","xìbāo","Célula",null],["细菌","細菌","xìjūn","Bacteria",null],["先锋","先鋒","xiānfēng","Pionero",null],["嫌",null,"xián","Desagradar",null],["显出","顯出","xiǎnchū","Mostrar",null],["险","險","xiǎn","Escabroso",["Peligroso","Peligro"]],["线路","線路","xiànlù","Línea",null],["陷入",null,"xiànrù","Caer en",["Verse envuelto en (problemas)"]],["响声","響聲","xiǎngshēng","Sonido",null],["想不到",null,"xiǎngbudào","No esperado",null],["消耗",null,"xiāohào","Consumir",null],["消灭","消滅","xiāomiè","Eliminar",null],["小费","小費","xiǎofèi","Propina",null],["小麦","小麥","xiǎomài","Trigo",null],["小于","小於","xiǎoyú","Menor que",null],["晓得","曉得","xiǎode","Saber",null],["笑脸","笑臉","xiàoliǎn","Sonrisa",null],["笑容",null,"xiàoróng","Sonrisa",null],["笑声","笑聲","xiàoshēng","Risa",null],["协会","協會","xiéhuì","Asociación",null],["协商","協商","xiéshāng","Negociar",null],["协调","協調","xiétiáo","Coordinar",null],["协助","協助","xiézhù","Ayudar",null],["写字楼","寫字樓","xiězìlóu","Edificio de oficinas",null],["写字台","寫字檯","xiězìtái","Escritorio",null],["心灵","心靈","xīnlíng","Espíritu",null],["心愿","心願","xīnyuàn","Deseo",null],["心脏","心臟","xīnzàng","Corazón",null],["心脏病","心臟病","xīnzàngbìng","Enfermedad cardíaca",null],["新人",null,"xīnrén","Novio/novia",null],["新兴","新興","xīnxīng","Emergente",null],["薪水",null,"xīnshui","Salario",null],["信仰",null,"xìnyǎng","Creer",null],["信用",null,"xìnyòng","Crédito",null],["兴旺","興旺","xīngwàng","Próspero",["Floreciente"]],["行程",null,"xíngchéng","Itinerario",["Agenda"]],["形",null,"xíng","Mirar",["Forma","Aparecer"]],["凶",null,"xiōng","Feroz",["Agresivo"]],["凶手","兇手","xiōngshǒu","Asesino",["Homicida"]],["修车","修車","xiū chē","Reparar auto",["Arreglar coche"]],["袖珍",null,"xiùzhēn","De bolsillo",["Miniatura"]],["悬","懸","xuán","Colgar",["Pendiente"]],["旋转","旋轉","xuánzhuǎn","Girar",["Rotar"]],["选拔","選拔","xuǎnbá","Seleccionar",["Escoger"]],["选举","選舉","xuǎnjǔ","Elegir/votación",["Votar","Elección"]],["学会","學會","xuéhuì","Aprender a (dominar algo)",["Asociación académica"]],["学员","學員","xuéyuán","Estudiante",["Alumno"]],["血管",null,"xuèguǎn","Vaso sanguíneo",["Arteria","Vena"]],["血液",null,"xuèyè","Sangre",["Líquido rojo"]],["循环","循環","xúnhuán","Circular",["Recorrer","Repetir"]],["压迫","壓迫","yāpò","Presionar",["Apretar","Comprimir"]],["烟花","煙花","yānhuā","Fuegos artificiales",["Cohetes","Pirotecnia"]],["沿",null,"yán","A lo largo de",["Siguiendo por"]],["沿海",null,"yánhǎi","Costa",["Litoral","Litoral marítimo"]],["沿着","沿著","yánzhe","A lo largo de",["Siguiendo por"]],["研发","研發","yánfā","Investigar y desarrollar",["Innovar","Desarrollar"]],["眼看",null,"yǎnkàn","Por ver",["A punto de","Por momentos"]],["演奏",null,"yǎnzòu","Tocar",["Interpretar","Reproducir"]],["宴会","宴會","yànhuì","Banquete",["Cena","Fiesta"]],["洋",null,"yáng","Extranjero",["Occidental","Moderno"]],["仰",null,"yǎng","Mirar hacia arriba",["Respetar","Admirar"]],["养老","養老","yǎnglǎo","Cuidar a los ancianos",["Jubilación","Vejez"]],["氧气","氧氣","yǎngqì","Oxígeno",["Gas vital"]],["样","樣","yàng","Tipo",["Forma","Manera"]],["药品","藥品","yàopǐn","Medicamento",["Fármaco","Medicina"]],["要不然",null,"yàobùrán","O si no",["De lo contrario","En otro caso"]],["要好",null,"yàohǎo","Ser bueno",["Ser amigo","Amistoso"]],["要么","要麼","yàome","O",["Bien","Entonces"]],["要素",null,"yàosù","Elemento",["Factor","Parte"]],["野",null,"yě","Salvaje",["Silvestre","Selvático"]],["野生",null,"yěshēng","Silvestre",["Salvaje","Natural"]],["医药","醫藥","yīyào","Medicina",["Farmacia","Curación"]],["依次",null,"yīcì","Sucesivamente",["En orden","Por turno"]],["依赖","依賴","yīlài","Depender",["Necesitar","Confiar"]],["一次性",null,"yīcìxìng","De un solo uso",["Desechable","Único"]],["一代",null,"yīdài","Generación",["Época","Familia"]],["一道",null,"yīdào","Juntos",null],["一贯","一貫","yīguàn","Consistente",["Siempre","Constantemente"]],["一路上",null,"yīlù shang","Durante todo el camino",["A lo largo del trayecto"]],["仪器","儀器","yíqì","Instrumento",["Aparato","Dispositivo"]],["仪式","儀式","yíshì","Ceremonia",["Acto","Celebración"]],["遗憾","遺憾","yíhàn","Arrepentimiento",["Pesar","Lamento"]],["一番",null,"yīfān","Una vez",["Intento","Esfuerzo"]],["一模一样","一模一樣","yīmú-yīyàng","Idéntico",["Igual","Gemelo"]],["一齐","一齊","yīqí","Juntos",["Simultáneamente","A la vez"]],["一时","一時","yīshí","Momento",["Temporalmente","Por un tiempo"]],["一同",null,"yītóng","Juntos",["Simultáneamente","En conjunto"]],["一行",null,"yīxíng","Grupo",["Delegación","Comitiva"]],["艺人","藝人","yìrén","Artista",["Intérprete","Actor"]],["议题","議題","yìtí","Tema",["Asunto","Punto"]],["异常","異常","yìcháng","Anormal",["Raro","Extraordinario"]],["意想不到",null,"yìxiǎng bù dào","Inesperado",["Sorprendente","Imprevisto"]],["意愿","意願","yìyuàn","Deseo",["Intención"]],["因",null,"yīn","Razón",["Causa","Antigua variante de 因"]],["因素",null,"yīnsù","Factor",["Elemento","Causa"]],["阴谋","陰謀","yīnmóu","Conspiración",["Trama","Plan"]],["阴影","陰影","yīnyǐng","Sombra",["Oscuridad","Amenaza"]],["音量",null,"yīnliàng","Volumen",null],["音像",null,"yīnxiàng","Audiovisual",["Sonido","Imagen"]],["隐藏","隱藏","yǐncáng","Esconder",["Ocultar","Disimular"]],["隐私","隱私","yǐnsī","Privacidad",["Asunto privado"]],["印",null,"yìn","Un rastro",["Grabar","Apellido yin"]],["英雄",null,"yīngxióng","Héroe",null],["迎来","迎來","yínglái","Recibir",["Acoger","Bienvenido"]],["影迷",null,"yǐngmí","Cinéfilo",["Fan","Fanático"]],["影星",null,"yǐngxīng","Estrella de cine",["Actor","Actriz"]],["应对","應對","yìngduì","Hacer frente",["Responder","Afrontar"]],["应急","應急","yìngjí","De emergencia",["Para emergencias"]],["用处","用處","yòngchù","Utilidad",["Función","Beneficio"]],["用得着","用得著","yòngdezháo","Ser útil",["Necesitar","Servir"]],["用法",null,"yòngfǎ","Uso",["Manera","Empleo"]],["用品",null,"yòngpǐn","Artículos (de uso)",["Productos"]],["用心",null,"yòngxīn","Atención",["Esmero","Cuidado"]],["优质","優質","yōuzhì","De alta calidad",["Excelente","Premium"]],["游人","遊人","yóurén","Turista",["Visitante"]],["游玩","遊玩","yóuwán","Jugar",["Divertirse","Pasear"]],["游戏机","遊戲機","yóuxìjī","Consola de juegos",["Videojuego","Máquina"]],["游行","遊行","yóuxíng","Manifestar",["Desfile","Protesta"]],["有关","有關","yǒuguān","Tener relación",["Concernir","Involucrar"]],["有没有","有沒有","yǒu méiyǒu","Tener o no",["Existencia","Presencia"]],["有事",null,"yǒushì","Estar ocupado",["Tener asuntos","Ocupado"]],["于",null,"yú","(indicando una fuente) de; fuera de",["Ir","(de tiempo o lugar) en; en; en"]],["娱乐","娛樂","yúlè","Entretener",["Divertir","Jugar"]],["愉快",null,"yúkuài","Alegre",["Feliz"]],["与","與","yǔ","Y",["Con (formal)"]],["宇航员","宇航員","yǔhángyuán","Astronauta",["Cosmonauta","Explorador espacial"]],["雨衣",null,"yǔyī","Impermeable",["Chubasco","Paraguas"]],["预约","預約","yùyuē","Sacar el turno",["Obtener","Conseguir"]],["元素",null,"yuánsù","Elemento",["Componente","Base"]],["园","園","yuán","Tierra utilizada para el cultivo de plantas",["Apellido yuan"]],["园地","園地","yuándì","Terreno",["Jardín","Espacio"]],["原",null,"yuán","Causa",["Original","Nivel"]],["原告",null,"yuángào","Demandante",["Acusador","Parte acusadora"]],["原谅","原諒","yuánliàng","Perdonar",["Disculpar","Absolver"]],["圆珠笔","圓珠筆","yuánzhūbǐ","Bolígrafo",["Esferográfica","Boli"]],["援助",null,"yuánzhù","Ayudar",["Asistir","Apoyar"]],["缘故","緣故","yuángù","Razón",["Causa","Motivo"]],["远方","遠方","yuǎnfāng","Lejos",["Lugar lejano"]],["远离","遠離","yuǎnlí","Lejos de",["Mantenerse alejado"]],["远远","遠遠","yuǎnyuǎn","Muy lejos",["Lejanamente","Distantemente"]],["约定","約定","yuēdìng","Acordar",["Concertar","Prometer"]],["乐曲","樂曲","yuèqǔ","Pieza musical",["Melodía","Canción"]],["晕","暈","yūn","Mareo",["Desmayar","Vértigo"]],["允许","允許","yǔnxǔ","Permitir",["Autorizar","Conceder"]],["运作","運作","yùnzuò","Operar",["Funcionar","Trabajar"]],["晕车","暈車","yùnchē","Mareo en coche",["Cinetosis","Mareo"]],["杂","雜","zá","Varios",["Variante de 杂","Mezclado"]],["再生",null,"zàishēng","Regenerar",["Reciclar","Recrear"]],["再说","再說","zàishuō","Además",["Por otra parte","En todo caso"]],["遭到",null,"zāodào","Sufrir",["Enfrentar","Ser víctima"]],["遭受",null,"zāoshòu","Sufrir",["Padecer","Soportar"]],["遭遇",null,"zāoyù","Encontrarse con (infortunios)",["Experiencia adversa"]],["早晚",null,"zǎowǎn","Temprano o tarde",["A la larga"]],["增进","增進","zēngjìn","Mejorar",["Aumentar","Promover"]],["增值",null,"zēngzhí","Aumentar valor",["Apreciar","Valorizar"]],["扎",null,"zhā","Atar",["Amarrar","Manojo (clasificador)"]],["扎实","紮實","zhāshi","Sólido",["Firme","Consistente"]],["炸",null,"zhà","Explotar",["Freír"]],["炸弹","炸彈","zhàdàn","Bomba",["Explosivo","Artefacto"]],["炸药","炸藥","zhàyào","Explosivo",["Dinamita","Pólvora"]],["债","債","zhài","Deuda",["Préstamo","Obligación"]],["占据","佔據","zhànjù","Ocupar",["Tomar","Controlar"]],["战场","戰場","zhànchǎng","Campo de batalla",["Frente","Conflicto"]],["战略","戰略","zhànlüè","Estrategia",["Plan","Táctica"]],["战术","戰術","zhànshù","Táctica",["Método","Estrategia"]],["战友","戰友","zhànyǒu","Camarada de armas",["Compañero","Aliado"]],["站台","站臺","zhàntái","Andén",null],["章",null,"zhāng","Sección",["Movimiento (de sinfonía)","Insignia"]],["掌声","掌聲","zhǎngshēng","Aplausos",["Ovación","Reconocimiento"]],["账","賬","zhàng","Cuenta",["Registro","Deuda"]],["账户","賬戶","zhànghù","Cuenta",["Depósito","Billetera"]],["障碍","障礙","zhàng'ài","Obstáculo",["Impedimento","Dificultad"]],["招",null,"zhāo","Reclutar",["Contratar","Buscar"]],["招聘",null,"zhāopìn","Contratar",["Reclutar","Buscar personal"]],["照样","照樣","zhàoyàng","Igualmente",["De la misma forma","También"]],["照耀",null,"zhàoyào","Iluminar",["Resplandecer","Brillar"]],["哲学","哲學","zhéxué","Filosofía",["Sabiduría","Razonamiento"]],["这就是说","這就是說","zhè jiùshì shuō","Es decir",["O sea"]],["镇","鎮","zhèn","Calmar",["Tranquilizar","Sosegar"]],["争夺","爭奪","zhēngduó","Competir",["Luchar","Disputar"]],["整顿","整頓","zhěngdùn","Reorganizar",["Reformar","Limpiar"]],["整治",null,"zhěngzhì","Remediar",["Solucionar","Mejorar"]],["正当","正當","zhèngdàng","Adecuado",["Correcto","Legítimo"]],["政策",null,"zhèngcè","Política",["Plan","Estrategia"]],["政党","政黨","zhèngdǎng","Partido político",["Agrupación","Facción"]],["政权","政權","zhèngquán","Poder político",["Gobierno","Autoridad"]],["症状","症狀","zhèngzhuàng","Síntoma",["Signo","Indicio"]],["之类","之類","zhīlèi","Tipo similar",["Clase","Estilo"]],["支撑","支撐","zhīchēng","Sostener",["Apoyar"]],["支援",null,"zhīyuán","Ayudar",["Asistir","Cooperar"]],["枝",null,"zhī","Rama",null],["知名",null,"zhīmíng","Conocido",["Famoso"]],["织","織","zhī","Tejer",["Confeccionar"]],["直升机","直升機","zhíshēngjī","Helicóptero",["Avión de hélices"]],["职责","職責","zhízé","Responsabilidad",["Obligación"]],["止",null,"zhǐ","Hasta",["Prohibir","Solo"]],["只得",null,"zhǐdé","Tener que",["Verse obligado"]],["只顾","只顧","zhǐgù","Preocuparse solo",["Enfocarse en"]],["只管",null,"zhǐguǎn","Encargarse de",["Ocuparse de"]],["指定",null,"zhǐdìng","Designar",["Nombrar"]],["指数","指數","zhǐshù","Índice",["Coeficiente"]],["指头","指頭","zhǐtou","Dedo",["Meñique"]],["指着","指著","zhǐzhe","Señalar hacia",["Indicar"]],["至于","至於","zhìyú","En cuanto a",["Respecto a"]],["治病",null,"zhì bìng","Curar enfermedades",["Sanar"]],["智慧",null,"zhìhuì","Sabiduría",["Inteligencia"]],["中等",null,"zhōngděng","Medio",["Promedio"]],["中华","中華","Zhōnghuá","China (civilización y cultura)",null],["中期",null,"zhōngqī","Mediano plazo",["Intermedio"]],["中外",null,"zhōngwài","China y extranjero",["Nacional e internacional"]],["忠心",null,"zhōngxīn","Lealtad",["Fidelidad"]],["钟头","鐘頭","zhōngtóu","Hora",["Reloj"]],["肿","腫","zhǒng","Hincharse",["Inflamarse"]],["种种","種種","zhǒngzhǒng","Varios",["Múltiples"]],["粥",null,"zhōu","Gachas",["Papilla"]],["珠宝","珠寶","zhūbǎo","Joyas",["Gemas"]],["诸位","諸位","zhūwèi","Ustedes",["Señores"]],["主持人",null,"zhǔchírén","Presentador",["Moderador"]],["主角",null,"zhǔjué","Protagonista",["Actor principal"]],["主流",null,"zhǔliú","Corriente principal",["Tendencia"]],["煮",null,"zhǔ","Cocer",["Hervir"]],["住宅",null,"zhùzhái","Vivienda",["Domicilio"]],["驻","駐","zhù","Estar estacionado",["Acampar"]],["柱子",null,"zhùzi","Columna",["Pilar"]],["祝愿","祝願","zhùyuàn","Desear",["Congratular"]],["专用","專用","zhuānyòng","Usar exclusivamente",["Destinar"]],["赚","賺","zhuàn","Ganar",["Obtener"]],["赚钱","賺錢","zhuànqián","Ganar dinero",["Lucrarse"]],["装备","裝備","zhuāngbèi","Equipar",["Armamento"]],["壮观","壯觀","zhuàngguān","Impresionante",["Majestuoso"]],["追究",null,"zhuījiū","Investigar",["Indagar"]],["捉",null,"zhuō","Atrapar",["Coger"]],["咨询","咨詢","zīxún","Consultar",["Preguntar"]],["自来水","自來水","zìláishuǐ","Agua corriente",["Grifo"]],["自我",null,"zìwǒ","Uno mismo",["Propio"]],["自学","自學","zìxué","Aprender solo",["Autodidacta"]],["自言自语","自言自語","zìyán-zìyǔ","Hablar consigo mismo",["Monólogo"]],["自在",null,"zìzai","Cómodo",["Relajado"]],["宗教",null,"zōngjiào","Religión",["Fe"]],["总部","總部","zǒngbù","Sede central",["Oficina principal"]],["总监","總監","zǒngjiān","Director general",["Supervisor"]],["总经理","總經理","zǒngjīnglǐ","Gerente general",["Director ejecutivo"]],["总量","總量","zǒngliàng","Volumen total",["Cantidad total"]],["走私",null,"zǒusī","Contrabandear",null],["奏",null,"zòu","Tocar",["Ejecutar"]],["租金",null,"zūjīn","Alquiler",["Canon"]],["足",null,"zú","Pie",["Ser suficiente","Excesivo"]],["足以",null,"zúyǐ","Ser suficiente",["Poder"]],["族",null,"zú","Clan",["Nacionalidad","Etnicidad"]],["祖父",null,"zǔfù","Abuelo",["Patriarca"]],["祖国","祖國","zǔguó","Patria",null],["祖母",null,"zǔmǔ","Abuela",["Matriarca"]],["钻","鑽","zuān","Perforar",["Meterse"]],["最佳",null,"zuìjiā","Óptimo",["Ideal"]],["最终","最終","zuìzhōng","Final último",["Conclusión"]],["罪",null,"zuì","Culpa",["Delito","Pecado"]],["罪恶","罪惡","zuì'è","Crimen",["Pecado"]],["作",null,"zuò","Hacer",["Crear"]],["作废","作廢","zuòfèi","Anular",["Invalidar"]],["作战","作戰","zuòzhàn","Combatir",["Pelear"]],["座谈会","座談會","zuòtánhuì","Coloquio",["Debate"]]],
'HSK7': [["阿拉伯语","阿拉伯語","Ālābóyǔ","Árabe",["Idioma árabe"]],["哎",null,"āi","¡ay!",["Oh"]],["哎呀",null,"āiyā","¡ay!",["Uf"]],["哀求",null,"āiqiú","Suplicar",["Rogar"]],["挨家挨户","挨家挨戶","āijiā-āihù","Casa por casa",["Puerta por puerta"]],["癌",null,"ái","Cáncer",["Tumor"]],["癌症",null,"áizhèng","Cáncer",null],["艾滋病",null,"àizībìng","Sida",["VIH"]],["唉",null,"ài","¡ay!",["Oh"]],["爱不释手","愛不釋手","àibùshìshǒu","No puedo soltarla",["No puedo dejarla"]],["爱理不理","愛理不理","àilǐ-bùlǐ","Hacer caso omiso",["Ignorar"]],["爱面子","愛面子","ài miànzi","Preocuparse por la imagen",["Vanidad"]],["爱惜","愛惜","àixī","Cuidar",["Apreciar"]],["碍事","礙事","àishì","Molestar",["Estorbar"]],["安定",null,"āndìng","Estable",["Tranquilo"]],["安抚","安撫","ānfǔ","Calmar",["Consolar"]],["安眠药","安眠藥","ānmiányào","Somnífero",["Pastilla para dormir"]],["安宁","安寧","ānníng","Tranquila",["Pacífica"]],["安稳","安穩","ānwěn","Tranquilo",["Seguro"]],["安心",null,"ānxīn","Tranquilo",["Sereno"]],["安逸",null,"ānyì","Cómodo",["Holgado"]],["按键","按鍵","ànjiàn","Botón",["Pulsador"]],["按理说","按理說","ànlǐ shuō","En teoría",["Normalmente"]],["按说","按說","ànshuō","Normalmente",["En principio"]],["案件",null,"ànjiàn","Caso",null],["暗地里","暗地裡","àndìlǐ","En secreto",["A escondidas"]],["暗杀","暗殺","ànshā","Asesinar",["Eliminar"]],["暗中",null,"ànzhōng","En secreto",["Clandestinamente"]],["昂贵","昂貴","ángguì","Costosas",["Caras"]],["凹",null,"āo","Hundido",["Concavo"]],["熬",null,"áo","Trasnochó",["Se quedó despierta"]],["熬夜",null,"áoyè","Quedarse despierto",["Velar"]],["傲",null,"ào","Arrogante",["Soberbio"]],["傲慢",null,"àomàn","Altivo",["Presuntuoso"]],["奥秘","奧祕","àomì","Misterios",null],["奥运会","奧運會","Àoyùnhuì","Olimpiada",["Juegos olímpicos"]],["八卦",null,"bāguà","Cotilleo",["Chisme"]],["巴不得",null,"bābudé","Estoy deseando",["Muero por"]],["扒",null,"bā","Abrió a la fuerza",["Rasgó"]],["芭蕾",null,"bālěi","Ballet",["Danza clásica"]],["把柄",null,"bǎbǐng","Pretexto",["Excusa"]],["把关","把關","bǎguān","Revisa",["Controla la calidad"]],["把手",null,"bǎshou","Picaporte",["Tirador"]],["靶子",null,"bǎzi","Blanco",["Objetivo"]],["坝","壩","bà","Presa",["Dique"]],["罢免","罷免","bàmiǎn","Destituir",["Remover"]],["罢休","罷休","bàxiū","Rendirse",["Abandonar"]],["霸占","霸佔","bàzhàn","Ocupar",["Usurpar"]],["掰",null,"bāi","Partió",["Rompió"]],["白白",null,"báibái","En vano",["Gratuitamente"]],["百分比",null,"bǎifēnbǐ","Porcentaje",["Tanto por ciento"]],["百合",null,"bǎihé","Lirio",["Flor de lirio"]],["百科全书","百科全書","bǎikē quánshū","Enciclopedia",["Diccionario"]],["柏树","柏樹","bǎishù","Ciprés",["Pino"]],["摆放","擺放","bǎifàng","Colocar",["Disponer"]],["摆平","擺平","bǎipíng","Solucionar",["Arreglar"]],["摆设","擺設","bǎishe","Adorno",["Ornamento"]],["拜会","拜會","bàihuì","Visitar",["Entrevistarse"]],["拜见","拜見","bàijiàn","Visitar",["Saludar"]],["拜年",null,"bàinián","Se felicita el Año Nuevo",["Visitan para felicitar el año"]],["拜托","拜託","bàituō","Te encargo",["Te lo dejo encargado"]],["扳",null,"bān","Jalar",["Tirar"]],["颁布","頒布","bānbù","Promulgó",null],["颁发","頒發","bānfā","Entregó",["Concedió"]],["颁奖","頒獎","bānjiǎng","Entregar premios",["Condecorar"]],["斑点","斑點","bāndiǎn","Mancha",["Punto"]],["搬迁","搬遷","bānqiān","Mudarse",["Trasladar"]],["板块","板塊","bǎnkuài","Placa",["Losa"]],["办不到","辦不到","bàn bu dào","Imposible",["No lograr"]],["半边天","半邊天","bànbiāntiān","Mujer fuerte",["Mujer poderosa"]],["半场","半場","bànchǎng","Medio partido",["Intermedio"]],["半岛","半島","bàndǎo","Península",["Istmo"]],["半路",null,"bànlù","A mitad de camino",["En el camino"]],["半数","半數","bànshù","Mitad",["La mitad"]],["半途而废","半途而廢","bàntú'érfèi","Abandonar a mitad de camino",["Rendirse a mitad de camino"]],["半信半疑",null,"bànxìn-bànyí","Dudar",["Con escepticismo"]],["半真半假",null,"bànzhēn-bànjiǎ","Fingir",["Falso","Verdadero"]],["扮",null,"bàn","Disfrazarse",["Caracterizar"]],["伴",null,"bàn","Compañero/a",["Acompañar"]],["伴侣","伴侶","bànlǚ","Pareja",null],["伴随","伴隨","bànsuí","Trae aparejados",["Viene acompañado de"]],["伴奏",null,"bànzòu","Acompañar",["Musicalizar"]],["拌",null,"bàn","Mezclar",["Revolver"]],["帮手","幫手","bāngshou","Ayudante",["Asistente"]],["绑","綁","bǎng","Atar",["Amarrar"]],["绑架","綁架","bǎngjià","Secuestrado",null],["榜样","榜樣","bǎngyàng","Ejemplo",null],["棒球",null,"bàngqiú","Béisbol",["Pelota"]],["磅",null,"bàng","Libras",null],["包袱",null,"bāofu","Carga",["Peso"]],["包容",null,"bāoróng","Tolerar",["Aceptar"]],["包扎","包紮","bāozā","Vendar",["Cubrir"]],["剥","剝","bāo","Pelar",["Descascarar"]],["煲",null,"bāo","Olla",["Cocinar"]],["饱和","飽和","bǎohé","Saturado",null],["饱满","飽滿","bǎomǎn","Lleno",["Abundante"]],["宝库","寶庫","bǎokù","Tesoro",["Riqueza"]],["宝藏","寶藏","bǎozàng","Tesoro",["Reliquia"]],["保管",null,"bǎoguǎn","Guardarse",["Conservarse"]],["保姆",null,"bǎomǔ","Niñera",null],["保暖",null,"bǎonuǎn","Abrigar",["Calentar"]],["保鲜","保鮮","bǎoxiān","Conservar",["Mantener"]],["保修",null,"bǎoxiū","Garantía",null],["保佑",null,"bǎoyòu","Bendecir",["Proteger"]],["保障",null,"bǎozhàng","Garantiza",["Asegura"]],["保质期","保質期","bǎozhìqī","Fecha de caducidad",["Vida útil"]],["保重",null,"bǎozhòng","Cuídate mucho",["Cuídate"]],["堡垒","堡壘","bǎolěi","Fortaleza",["Baluarte"]],["报仇","報仇","bàochóu","Vengar",["Tomar venganza"]],["报酬","報酬","bàochou","Remuneración",["Pago"]],["报废","報廢","bàofèi","Desechar",["Inutilizar"]],["报复","報復","bàofù","Se venga",["Toma represalias contra"]],["报社","報社","bàoshè","Redacción",["Periódico"]],["报亭","報亭","bàotíng","Kiosco",["Quiosco"]],["报销","報銷","bàoxiāo","Reembolsar",null],["抱负","抱負","bàofù","Aspiraciones",["Ambiciones"]],["豹",null,"bào","Leopardo",["Pantera"]],["暴风骤雨","暴風驟雨","bàofēng-zhòuyǔ","Tormenta",["Temporal"]],["暴利",null,"bàolì","Ganancia excesiva",["Súper beneficio"]],["暴躁",null,"bàozào","Irritable",["Colérico"]],["曝光",null,"bàoguāng","Expuesta",["Revelada"]],["爆冷门","爆冷門","bào lěngmén","Sorpresa",["Inesperado"]],["爆满","爆滿","bàomǎn","Abarrotarse",["Lleno"]],["爆竹",null,"bàozhú","Petardo",["Cohete"]],["卑鄙",null,"bēibǐ","Viles",["Despreciables"]],["悲哀",null,"bēi'āi","Tristeza",["Dolor"]],["悲观","悲觀","bēiguān","Pesimista",["Negativo"]],["悲欢离合","悲歡離合","bēihuān-líhé","Alegrías y tristezas",["Emociones"]],["悲痛",null,"bēitòng","Doloroso",["Angustioso"]],["碑",null,"bēi","Estela",["Lápida"]],["贝壳","貝殼","bèiké","Conchas",null],["备课","備課","bèikè","Preparar clase",["Planificar"]],["备受","備受","bèishòu","Recibir",["Experimentar"]],["备用","備用","bèiyòng","De reserva",["Secundario"]],["背面",null,"bèimiàn","Reverso",["Dorso"]],["背叛",null,"bèipàn","Traición",null],["背诵","背誦","bèisòng","Recitar",["Repetir de memoria"]],["被捕",null,"bèibǔ","Ser arrestado",["Detener"]],["奔波",null,"bēnbō","Anduvo de un lado a otro",["Anduvo recorriendo"]],["奔赴",null,"bēnfù","Dirigirse",["Acudir"]],["本分",null,"běnfèn","Deber",["Obligación"]],["本能",null,"běnnéng","Instinto",null],["本钱","本錢","běnqián","Capital",null],["本色",null,"běnsè","Esencia",["Naturaleza"]],["本性",null,"běnxìng","Carácter",["Temperamento"]],["本意",null,"běnyì","Intención",["Propósito"]],["本着","本著","běnzhe","Según",["Conforme"]],["奔",null,"bèn","Correr",["Dirigirse"]],["笨蛋",null,"bèndàn","Tonto",["Idiota"]],["笨重",null,"bènzhòng","Pesado",["Voluminoso"]],["崩溃","崩潰","bēngkuì","Colapsar",["Derrumbarse"]],["绷","繃","bēng","Tensar",["Estirar"]],["绷带","繃帶","bēngdài","Venda",["Vendaje"]],["蹦",null,"bèng","Saltar y brincar",null],["逼近",null,"bījìn","Acercarse",["Avanzar"]],["逼迫",null,"bīpò","Forzar",["Obligar"]],["逼真",null,"bīzhēn","Realista",["Verosímil"]],["鼻涕",null,"bítì","Mocos",null],["比比皆是",null,"bǐbǐ-jiēshì","Común",["Abundante"]],["比不上",null,"bǐ bu shàng","No igualar",["Inferior"]],["比起",null,"bǐqǐ","En comparación",["Versus"]],["比试","比試","bǐshi","Competir",["Retar"]],["比喻",null,"bǐyù","Metáforas",null],["鄙视","鄙視","bǐshì","Despreciar",null],["必不可少",null,"bìbùkěshǎo","Indispensable",["Crucial"]],["必定",null,"bìdìng","Seguro",["Definitivo"]],["碧绿","碧綠","bìlǜ","Verde intenso",["Esmeralda"]],["弊病",null,"bìbìng","Vicios",["Defectos"]],["弊端",null,"bìduān","Abusos",["Inconvenientes"]],["壁画","壁畫","bìhuà","Mural",["Fresco"]],["避难","避難","bìnàn","Refugiarse",["Huir"]],["避暑",null,"bìshǔ","Refrescarse",["Escapar"]],["边疆","邊疆","biānjiāng","Frontera",null],["边界","邊界","biānjiè","Limítrofe",["Fronteriza"]],["边远","邊遠","biānyuǎn","Remoto",["Alejado"]],["编号","編號","biānhào","Código",["Numerar"]],["编剧","編劇","biānjù","Guionista",["Escritor"]],["编排","編排","biānpái","Organizar",["Estructurar"]],["编写","編寫","biānxiě","Redactar",["Escribir"]],["编造","編造","biānzào","Inventar",["Fingir"]],["鞭策",null,"biāncè","Impulsado",["Estimulado"]],["鞭炮",null,"biānpào","Petardos",["Cohetes"]],["贬值","貶值","biǎnzhí","Devaluar",["Depreciar"]],["变革","變革","biàngé","Transformar",["Cambiar"]],["变幻莫测","變幻莫測","biànhuàn-mòcè","Impredecible",["Cambiante"]],["变迁","變遷","biànqiān","Transformaciones",["Cambios"]],["变异","變異","biànyì","Mutar",["Variar"]],["变质","變質","biànzhì","Se echa a perder",["Se descompone"]],["便道",null,"biàndào","Atajo",["Camino"]],["便饭","便飯","biànfàn","Comida simple",["Informal"]],["便捷",null,"biànjié","Práctico",["Cómodo"]],["便利店",null,"biànlìdiàn","Minimercado",["Tienda"]],["遍布",null,"biànbù","Extendidas por todo el país",["En todo el país"]],["辨别","辨別","biànbié","Distinguir",["Identificar"]],["辨认","辨認","biànrèn","Identificar",["Reconocer"]],["辩","辯","biàn","Debatir",["Argumentar"]],["辩护","辯護","biànhù","Defiende",["Aboga por"]],["辩解","辯解","biànjiě","Justificativo",["Excusa"]],["辫子","辮子","biànzi","Trenzas",null],["标","標","biāo","Firmar",["Marca","Otorgar"]],["标榜","標榜","biāobǎng","Pretender",["Proclamar"]],["标本","標本","biāoběn","Especímenes",null],["标签","標籤","biāoqiān","Etiqueta",["Rótulo"]],["标示","標示","biāoshì","Indicar",["Señalar"]],["标语","標語","biāoyǔ","Eslogan",["Lema"]],["标致","標致","biāozhì","Guapo",["Hermoso"]],["飙升","飆升","biāoshēng","Dispararse",["Aumentar"]],["表白",null,"biǎobái","Declarar",["Confesar"]],["表决","表決","biǎojué","Sometió a votación",["Votó"]],["表述",null,"biǎoshù","Expresar",["Manifestar"]],["表率",null,"biǎoshuài","Ejemplo",["Modelo"]],["表态","表態","biǎotài","Se han pronunciado",["Han dado su postura"]],["表彰",null,"biǎozhāng","Condecoró",["Reconoció a"]],["憋",null,"biē","No lo guardes",["No te lo tragues"]],["别具匠心","別具匠心","biéjù-jiàngxīn","Original",["Creativo"]],["别看","別看","biékàn","Aunque",["A pesar de"]],["别墅","別墅","biéshù","Casa quinta",["Villa"]],["别说","別說","biéshuō","Ni hablar",["Olvídate"]],["别提了","別提了","biétí le","Ni hablar",["Mejor no"]],["别致","別緻","biézhì","Original",["Pintoresca"]],["别扭","彆扭","bièniu","Incómodos",null],["彬彬有礼","彬彬有禮","bīnbīn-yǒulǐ","Educado",["Cortés"]],["滨海","濱海","bīn hǎi","Costero",["Litoral"]],["缤纷","繽紛","bīnfēn","Colorido",["Variado"]],["冰棍儿","冰棍兒","bīnggùnr","Helado",["Palito"]],["冰山",null,"bīngshān","Iceberg",["Témpano"]],["丙",null,"bǐng","C",null],["秉承",null,"bǐngchéng","Seguir",["Mantener"]],["并非","並非","bìngfēi","No es en absoluto",["No es precisamente"]],["并购","併購","bìnggòu","Fusionar",["Absorber"]],["并列","並列","bìngliè","Empataron",["Quedaron igualados"]],["并行","並行","bìngxíng","Simultáneo",["Concurrente"]],["病床",null,"bìngchuáng","Cama de enfermo",["Lecho"]],["病症",null,"bìngzhèng","Síntoma",["Dolencia"]],["拨","撥","bō","Apartó",["Corrió a un lado"]],["拨款","撥款","bōkuǎn","Asignación",["Presupuesto"]],["拨通","撥通","bōtōng","Marcar",["Conectar"]],["波及",null,"bōjí","Afectar",["Influir"]],["波澜","波瀾","bōlán","Oleada",["Disturbio"]],["波涛","波濤","bōtāo","Oleaje",null],["波折",null,"bōzhé","Contratiempo",["Dificultad"]],["剥夺","剝奪","bōduó","Privar",["Quitar"]],["剥削","剝削","bōxuē","Explotan",null],["伯伯",null,"bóbo","Tío paterno",["Abuelo"]],["伯父",null,"bófù","Tío paterno",["Pariente"]],["伯母",null,"bómǔ","Tía",null],["驳回","駁回","bóhuí","Rechazar",["Negar"]],["脖子",null,"bózi","Cuello",["Nuca"]],["搏斗","搏鬥","bódòu","Luchó",null],["不定",null,"bùdìng","Incierto",["Variable"]],["不见得","不見得","bùjiàndé","Necesariamente",["Probablemente"]],["不利于","不利於","bùlì yú","Perjudicar",["Dañar"]],["不慎",null,"bùshèn","Descuidado/a",["Inadvertido"]],["不适","不適","bùshì","Malestar",["Indisposición"]],["不算",null,"bù suàn","No contar",["No considerarse"]],["不像话","不像話","bùxiànghuà","Escandaloso",["Inaudito"]],["不屑",null,"bùxiè","Despreciar",["No dignarse a"]],["不懈",null,"bùxiè","Incansable",["Perseverante"]],["不亚于","不亞於","bùyàyú","Igualar a",["Equipararse a"]],["不亦乐乎","不亦樂乎","bùyìlèhū","¿no es un placer? (de 论语: 学而时习之，不亦乐乎)",null],["不翼而飞","不翼而飛","bùyì'érfēi","Desaparecer misteriosamente",["Evaporarse"]],["不用说","不用說","bùyòngshuō","Obvio",["Por supuesto"]],["不正之风","不正之風","bùzhèngzhīfēng","Corrupción",["Vicios"]],["补给","補給","bǔjǐ","Suministrar",["Provisión"]],["补救","補救","bǔjiù","De remediarlo",["De arreglarlo"]],["捕捉",null,"bǔzhuō","Captura",["Caza"]],["哺育",null,"bǔyù","Criar",["Alimentar"]],["不耻下问","不恥下問","bùchǐ-xiàwèn","No avergonzarse de preguntar a los inferiores",null],["不辞而别","不辭而別","bùcí'érbié","Irse sin despedirse",["Marcharse abruptamente"]],["不得而知",null,"bùdé'érzhī","Imposible de saber",["Ignoto"]],["不得已",null,"bùdéyǐ","Se vio obligado",["No tuvo otra opción que"]],["不妨",null,"bùfáng","No está de más",["Podrías muy bien"]],["不服",null,"bùfú","No aceptar",["No rendirse"]],["不服气","不服氣","bù fúqì","Sentirse resentido",["Tener envidia"]],["不假思索",null,"bùjiǎ-sīsuǒ","Sin pensar",["Instantáneamente"]],["不解",null,"bùjiě","No entender",["Confundir"]],["不经意","不經意","bùjīngyì","Sin querer",["Accidentalmente"]],["不景气","不景氣","bùjǐngqì","En recesión",["Decaído"]],["不堪",null,"bùkān","Insoportable",["Demasiado doloroso"]],["不可避免",null,"bùkě-bìmiǎn","Inevitable",["Ineludible"]],["不可思议","不可思議","bùkě-sīyì","Increíble",["Inconcebible"]],["不肯",null,"bù kěn","Negarse a",["Rehusar"]],["不理",null,"bù lǐ","Ignorar",["Hacer caso omiso"]],["不了了之",null,"bùliǎo-liǎozhī","Quedar sin resolver",["Archivarse"]],["不难","不難","bù nán","Fácil",["Sencillo"]],["不平",null,"bùpíng","Injusticia",["Desigualdad"]],["不起眼",null,"bùqǐyǎn","Insignificante",["Discreto"]],["不容",null,"bùróng","No permitir",["No tolerar"]],["不如说","不如說","bùrú shuō","Más bien",["Antes que"]],["不同寻常","不同尋常","bùtóng-xúncháng","Extraordinario",["Excepcional"]],["不为人知","不為人知","bùwéirénzhī","Desconocido",["Secreto"]],["不惜",null,"bùxī","No escatima",["Está dispuesto a pagar"]],["不相上下",null,"bùxiāng-shàngxià","Prácticamente igual",["Pareja"]],["不宜",null,"bùyí","No convenir",["No ser apropiado"]],["不已",null,"bùyǐ","Incessantemente",["Constantemente"]],["不以为然","不以為然","bùyǐwéirán","No estar de acuerdo",["Disentir"]],["不由得",null,"bùyóude","Sin poder remediarlo",["No pudieron evitar"]],["不由自主",null,"bùyóuzìzhǔ","Involuntariamente",["Instintivamente"]],["不予",null,"bù yǔ","No otorgar",["Negar"]],["不约而同","不約而同","bùyuē'értóng","Coincidir espontáneamente",["Al unísono"]],["不知",null,"bùzhī","No saber",["Ignorar"]],["不知不觉","不知不覺","bùzhī-bùjué","Inconscientemente",["Sin darse cuenta"]],["不准",null,"bù zhǔn","No permitir",["Prohibir"]],["布局","佈局","bùjú","Distribución",["Disposición"]],["步伐",null,"bùfá","Paso",["Marcha"]],["步入",null,"bùrù","Entrar",["Adentrarse"]],["步骤","步驟","bùzhòu","Paso",["Etapa"]],["部件",null,"bùjiàn","Componente",["Pieza"]],["部署",null,"bùshǔ","Desplegó",["Puso en marcha"]],["猜谜","猜謎","cāimí","Adivinar",["Acertijo"]],["猜想",null,"cāixiǎng","Suponer",["Especular"]],["才华","才華","cáihuá","Talento",["Habilidad"]],["财经","財經","cáijīng","Finanzas",["Economía"]],["财力","財力","cáilì","Recursos financieros",["Solvencia"]],["财务","財務","cáiwù","Finanzas",null],["财物","財物","cáiwù","Bienes",["Posesiones"]],["财政","財政","cáizhèng","Fiscales",["De hacienda"]],["裁",null,"cái","Cortar",["Recortar"]],["裁定",null,"cáidìng","Decidir",["Resolver"]],["裁决","裁決","cáijué","Sentencia",["Fallo"]],["采","採","cǎi","Asignación a un noble feudal",["Escoger","Color"]],["采集","採集","cǎijí","Recolectan",["Recogen"]],["采矿","採礦","cǎikuàng","Minería",["Extraer minerales"]],["彩电","彩電","cǎidiàn","Televisor de color",["TV a color"]],["彩虹",null,"cǎihóng","Arcoíris",null],["彩霞",null,"cǎixiá","Atardecer",["Crepúsculo"]],["菜市场","菜市場","càishìchǎng","Mercado",["Verdulería"]],["参见","參見","cānjiàn","Asistir",["Participar"]],["参军","參軍","cānjūn","Alistarse",["Incorporarse"]],["参谋","參謀","cānmóu","Consejos",["Asesoramiento"]],["参照","參照","cānzhào","Basarse en",["Tomar como referencia"]],["餐桌",null,"cānzhuō","Mesa de comedor",["Mesa"]],["残","殘","cán","Mutilar",["Dañar"]],["残留","殘留","cánliú","Quedar restos de",["Quedar residuos de"]],["残缺","殘缺","cánquē","Incompleto",["Defectuoso"]],["残忍","殘忍","cánrěn","Despiadado",["Cruel"]],["惭愧","慚愧","cánkuì","Avergonzado",["Arrepentido"]],["惨白","慘白","cǎnbái","Pálido",["Demacrado"]],["惨痛","慘痛","cǎntòng","Doloroso",["Trágico"]],["惨重","慘重","cǎnzhòng","Grave",["Severo"]],["灿烂","燦爛","cànlàn","Sol radiante",["Sol brillante"]],["苍蝇","蒼蠅","cāngying","Mosca",["Insecto"]],["沧桑","滄桑","cāngsāng","Cambios",["Vicisitudes"]],["舱","艙","cāng","Bodega",null],["藏匿",null,"cángnì","Esconder",["Ocultar"]],["藏品",null,"cángpǐn","Colección",["Reliquia"]],["藏身",null,"cángshēn","Esconderse",["Ocultarse"]],["操控",null,"cāokòng","Controlar",["Manejar"]],["操劳","操勞","cāoláo","Trabajó sin descanso",null],["操心",null,"cāoxīn","Preocuparse",["Inquietarse"]],["槽",null,"cáo","Canal",["Canalización"]],["草案",null,"cǎo'àn","Borrador",["Esbozo"]],["草坪",null,"cǎopíng","Césped",["Prado"]],["侧面","側面","cèmiàn","Costado",["De perfil"]],["侧重","側重","cèzhòng","Enfatizar",["Centrarse"]],["测算","測算","cèsuàn","Calcular",["Estimar"]],["测验","測驗","cèyàn","Examinar",["Prueba"]],["层出不穷","層出不窮","céngchū-bùqióng","Sin parar",["No dejan de aparecer"]],["蹭",null,"cèng","Rozar",["Frotar"]],["差错","差錯","chācuò","Error",["Equivocación"]],["差额","差額","chā'é","Diferencia",["Margen"]],["插手",null,"chāshǒu","Intervenir",["Meterse"]],["插图","插圖","chātú","Ilustración",["Dibujo"]],["插嘴",null,"chāzuǐ","Interrumpir",["Meter la palabra"]],["茶道",null,"chádào","Ceremonia del té",["Té"]],["茶馆儿","茶館兒","cháguǎnr","Casa de té",["Cafetería"]],["查处","查處","cháchǔ","Investigar y sancionar",["Perseguir"]],["查明",null,"chámíng","Verificar",["Aclarar"]],["查找",null,"cházhǎo","Buscar",["Consultar"]],["察觉","察覺","chájué","Notar",["Percatarse"]],["察看",null,"chákàn","Inspeccionar",["Examinar"]],["诧异","詫異","chàyì","Sorprendidos",["Extrañados"]],["掺","摻","chān","Mezclar",["Combinar"]],["搀","攙","chān","Apoyen",["Sostengan"]],["馋","饞","chán","Antojo",["Se le antojó"]],["禅杖","禪杖","chánzhàng","Cayado de monje",["Báculo"]],["缠","纏","chán","Enredar",["Molestar"]],["产","產","chǎn","Producir",["Recurso","Reproducir"]],["产地","產地","chǎndì","Lugar de origen",["Procedencia"]],["产物","產物","chǎnwù","Producto",["Resultado"]],["产值","產值","chǎnzhí","Producción",["Valor"]],["铲","剷","chǎn","Cavar",["Pala"]],["铲子","鏟子","chǎnzi","Pala",["Azada"]],["阐述","闡述","chǎnshù","Expuso",["Explicó en detalle"]],["颤抖","顫抖","chàndǒu","Temblaba",["Vibraba"]],["猖狂",null,"chāngkuáng","Desenfrenado",["Atrevido"]],["长达","長達","cháng dá","Durar",["Extenderse"]],["长期以来","長期以來","chángqī yǐlái","Desde hace tiempo",["Históricamente"]],["长效","長效","chángxiào","Duradero",["Permanente"]],["长征","長征","chángzhēng","Larga marcha",["Expedición"]],["长足","長足","chángzú","Significativo",["Notable"]],["常理",null,"chánglǐ","Sentido común",["Lógica"]],["常人",null,"chángrén","Persona común",["Mortal"]],["常态","常態","chángtài","Norma",null],["常温","常溫","chángwēn","Temperatura ambiente",["Ambiente"]],["偿还","償還","chánghuán","Pagar",["Cancelar"]],["嫦娥",null,"Cháng'é","Chang'e",["Diosa lunar"]],["厂家","廠家","chǎngjiā","Fabricante",["Empresa"]],["敞开","敞開","chǎngkāi","Abiertas",["Abrí de par en par"]],["畅谈","暢談","chàngtán","Conversar",["Charlar"]],["畅销","暢銷","chàngxiāo","Se vende muy bien",["Es muy vendido"]],["倡议","倡議","chàngyì","Propuso",["Propone"]],["抄袭","抄襲","chāoxí","Plagiar",["Copiar"]],["钞票","鈔票","chāopiào","Billete",null],["超标","超標","chāobiāo","Exceder el límite",["Sobrepasar"]],["超车","超車","chāochē","Adelantar",["Sobrepasar"]],["超前",null,"chāoqián","Avanzado",["Progresista"]],["超速",null,"chāosù","Exceder la velocidad",["Acelerar"]],["朝代",null,"cháodài","Dinastía",null],["朝着","朝著","cháozhe","Hacia",["En dirección a"]],["嘲弄",null,"cháonòng","Burlarse",["Ridiculizar"]],["嘲笑",null,"cháoxiào","Burles",["Te rías de"]],["吵嘴",null,"chǎozuǐ","Discutir",["Pelear"]],["车道","車道","chēdào","Carril",["Pista"]],["车祸","車禍","chēhuò","Accidente de tráfico",["Colisión"]],["车间","車間","chējiān","Taller",["Fábrica"]],["车轮","車輪","chēlún","Rueda",["Llanta"]],["车速","車速","chēsù","Velocidad",["Rapidez"]],["车位","車位","chēwèi","Estacionamiento",["Plaza"]],["车厢","車廂","chēxiāng","Vagón",["Compartimento"]],["车型","車型","chēxíng","Modelo de vehículo",["Tipo de coche"]],["车轴","車軸","chēzhóu","Eje del vehículo",["Eje"]],["扯",null,"chě","Tirar",["Estirar"]],["彻夜","徹夜","chèyè","Toda la noche",["Durante toda la noche"]],["撤",null,"chè","Retirar",["Eliminar"]],["撤换","撤換","chèhuàn","Destituir",["Reemplazar"]],["沉甸甸",null,"chéndiàndiàn","Pesado",null],["沉淀","沉澱","chéndiàn","Asiente",["Se vaya al fondo"]],["沉浸",null,"chénjìn","Sumergir",["Absorber"]],["沉闷","沉悶","chénmèn","Pesada",["Aburrida"]],["沉迷",null,"chénmí","Obsesionarse",["Adicto"]],["沉思",null,"chénsī","Sumido",["Pensativo"]],["沉稳","沉穩","chénwěn","Sereno",["Estable"]],["沉着","沉著","chénzhuó","Sereno",["Tranquilo"]],["陈旧","陳舊","chénjiù","Anticuada",["Vieja"]],["陈列","陳列","chénliè","Exhiben",["Están expuestos"]],["陈述","陳述","chénshù","Relató",["Explicó"]],["衬托","襯托","chèntuō","Resalta",["Hace resaltar"]],["趁",null,"chèn","Aprovechar",["Mientras"]],["趁机","趁機","chènjī","Aprovechando la oportunidad",["Al momento"]],["趁早",null,"chènzǎo","Cuanto antes",["De prisa"]],["趁着","趁著","chènzhe","Aprovechando",["Mientras que"]],["称呼","稱呼","chēnghu","Llamar",["Denominar"]],["称作","稱作","chēngzuò","Llamar",["Considerar"]],["成才",null,"chéngcái","Convertirse en talento",["Tener éxito"]],["成家",null,"chéngjiā","Formar familia",["Casarse"]],["成年",null,"chéngnián","Llegar a adulto",["Mayor de edad"]],["成千上万","成千上萬","chéngqiān-shàngwàn","Miles y miles",["Innumerables"]],["成群结队","成群結隊","chéngqún-jiéduì","En grupos",["En multitud"]],["成天",null,"chéngtiān","Todo el día",["El día entero"]],["成问题","成問題","chéngwèntí","Ser problema",["Resultar problemático"]],["成型",null,"chéngxíng","Tomar forma",["Modelar"]],["呈现","呈現","chéngxiàn","Apareció",["Se presentó"]],["诚恳","誠懇","chéngkěn","Sincero",["Honesto"]],["诚心诚意","誠心誠意","chéngxīn-chéngyì","De todo corazón",["Sinceramente"]],["诚意","誠意","chéngyì","Buena voluntad",["Sinceridad"]],["诚挚","誠摯","chéngzhì","Cordial",["Sincero"]],["承包",null,"chéngbāo","Adjudicó",["Se quedó con"]],["承载","承載","chéngzài","Soportar",["Transportar"]],["城墙","城牆","chéngqiáng","Muralla",["Muralla de la ciudad"]],["乘人之危",null,"chéngrénzhīwēi","Aprovechar la debilidad ajena",["Explotar"]],["盛",null,"chéng","Sirvió",["Sirvió un bol"]],["惩处","懲處","chéngchǔ","Castigar",["Sancionar"]],["惩罚","懲罰","chéngfá","Castigados",["Castigo"]],["澄清",null,"chéngqīng","Aclarar",["Despejar"]],["橙汁",null,"chéngzhī","Jugo de naranja",null],["逞能",null,"chěngnéng","Presumir",["Vanagloriarse"]],["逞强","逞強","chěngqiáng","Mostrar fuerza",["Esforzarse"]],["秤",null,"chèng","Balanza",null],["吃不上",null,"chī bushàng","No poder comer",["Pasar hambre"]],["吃喝玩乐","吃喝玩樂","chī-hē-wán-lè","Comer y beber",["Disfrutar de la vida"]],["吃苦",null,"chīkǔ","Sufrir",["Aguantar las duras"]],["吃亏","吃虧","chīkuī","Sufrir una pérdida",["Perjudicarse"]],["痴呆","痴獃","chīdāi","Estúpido",["Lento"]],["痴迷",null,"chīmí","Obsesionarse",["Fanático"]],["痴心",null,"chīxīn","Amor obsesivo",["Devoción"]],["池塘",null,"chítáng","Estanque",["Charca"]],["驰名","馳名","chímíng","Famoso",["Renombrado"]],["迟迟","遲遲","chíchí","Lentamente",["Tarde"]],["迟疑","遲疑","chíyí","Dudó",["Dudó un momento"]],["迟早","遲早","chízǎo","Antes o después",["Temprano o tarde"]],["持",null,"chí","Sostener",["Controlar","Agarrar"]],["持久",null,"chíjiǔ","Dura",["Aguanta mucho"]],["持之以恒","持之以恆","chízhī-yǐhéng","Perseverar",["Constancia"]],["尺度",null,"chǐdù","Medida",["Estándar"]],["耻辱","恥辱","chǐrǔ","Vergüenza",["Deshonra"]],["耻笑","恥笑","chǐxiào","Burlarse",["Ridiculizar"]],["赤字",null,"chìzì","Números rojos",["Déficit"]],["翅膀",null,"chìbǎng","Ala",null],["冲刺","衝刺","chōngcì","Sprint",["Apurar"]],["冲浪","衝浪","chōnglàng","Surfear",["Practicar surf"]],["冲洗","沖洗","chōngxǐ","Enjuagar",["Limpiar"]],["冲撞","衝撞","chōngzhuàng","Chocar",["Embestir"]],["充",null,"chōng","Servir como; actuar como",["Llenar","Suficiente; lleno"]],["充当","充當","chōngdāng","Sirvió",["Le hizo de"]],["充沛",null,"chōngpèi","Energía",["Ánimo"]],["充实","充實","chōngshí","Provechosas",["Plenas"]],["重播",null,"chóngbō","Retransmitir",["Repetir"]],["重叠","重疊","chóngdié","Superponen",["Se enciman"]],["重返",null,"chóngfǎn","Volver",["Regresar"]],["重合",null,"chónghé","Coincidir",["Superponerse"]],["重申",null,"chóngshēn","Reafirmar",["Reiterar"]],["重现","重現","chóngxiàn","Reaparecer",["Volver"]],["崇高",null,"chónggāo","Noble",null],["崇尚",null,"chóngshàng","Venerar",["Respetar"]],["宠","寵","chǒng","Mimar",["Consentir"]],["宠爱","寵愛","chǒng'ài","Mimar",["Consentir"]],["抽签","抽籤","chōuqiān","Sortear",["Sacar un número"]],["抽屉","抽屜","chōuti","Cajón",["Gaveta"]],["抽象",null,"chōuxiàng","Abstracto",["Intangible"]],["仇",null,"chóu","Enemistad",["Rencor"]],["仇恨",null,"chóuhèn","Odiar",["Resentimiento"]],["仇人",null,"chóurén","Enemigo",["Adversario"]],["稠",null,"chóu","Denso",["Espeso"]],["稠密",null,"chóumì","Densamente",["Poblado"]],["愁眉苦脸","愁眉苦臉","chóuméi-kǔliǎn","Con ceño fruncido",["Triste"]],["筹","籌","chóu","Planear",["Preparar"]],["筹办","籌辦","chóubàn","Organizar",["Preparar"]],["筹备","籌備","chóubèi","Preparando",["Organizando"]],["筹措","籌措","chóucuò","Reunir",["Conseguir"]],["筹划","籌劃","chóuhuà","Planear",["Proyectar"]],["筹集","籌集","chóují","Recaudar",["Juntar"]],["筹码","籌碼","chóumǎ","Ficha",["Apuesta"]],["丑恶","醜惡","chǒu'è","Feo",["Lo más repugnante"]],["丑陋","醜陋","chǒulòu","Feo",["Horrible"]],["丑闻","醜聞","chǒuwén","Escándalo",["Vergüenza"]],["瞅",null,"chǒu","Mirar",["Echar un vistazo"]],["出版社",null,"chūbǎnshè","Editorial",["Casa de edición"]],["出厂","出廠","chūchǎng","Salir de fábrica",["Producir"]],["出丑","出醜","chūchǒu","Hacer el ridículo",["Avergonzarse"]],["出道",null,"chūdào","Debutar",["Iniciarse"]],["出发点","出發點","chūfādiǎn","Punto de partida",["Principio"]],["出风头","出風頭","chū fēngtou","Llamar la atención",["Presumir"]],["出境",null,"chūjìng","Salir del país",["Abandonar"]],["出局",null,"chūjú","Ser eliminado",["Quedar fuera"]],["出具",null,"chūjù","Emitir",["Expedir"]],["出口成章",null,"chūkǒu-chéngzhāng","Hablar con elocuencia",["Elocuente"]],["出卖","出賣","chūmài","Traicionó",["Vendió"]],["出毛病",null,"chū máobìng","Fallar",["Romperse"]],["出难题","出難題","chū nántí","Poner obstáculos",["Complicar"]],["出人意料",null,"chūrényìliào","Inesperado",["Sorpresivo"]],["出任",null,"chūrèn","Asumir un cargo",["Tomar"]],["出山",null,"chūshān","Volver a la vida pública",["Reaparecer"]],["出身",null,"chūshēn","Viene",["Es de origen rural"]],["出示",null,"chūshì","Mostrar",["Presentar"]],["出手",null,"chūshǒu","Ayudar",["Intervenir"]],["出头","出頭","chūtóu","Destacarse",["Progresar"]],["出土",null,"chūtǔ","Ser excavado",["Descubrir"]],["出息",null,"chūxi","Lejos",["Va a ser alguien"]],["出血",null,"chūxiě","Sangrar",["Perder sangre"]],["出演",null,"chūyǎn","Actuar",["Participar"]],["出洋相",null,"chū yángxiàng","Hacer el ridículo",["Avergonzarse"]],["出游","出遊","chūyóu","Viajar de excursión",["Pasear"]],["出众","出眾","chūzhòng","Destacarse",["Excepcional"]],["出主意",null,"chū zhǔyi","Sugerir",["Proponer"]],["出资","出資","chūzī","Invertir",["Financiar"]],["出自",null,"chūzì","Provenir",["Proceder"]],["出走",null,"chūzǒu","Irse",["Abandonar"]],["初次",null,"chūcì","Primera vez",null],["初衷",null,"chūzhōng","Intención original",["Propósito"]],["除此之外",null,"chúcǐzhīwài","Además",["Aparte de"]],["除去",null,"chúqù","Quitar",["Excepto"]],["除外",null,"chúwài","Excepto",["Aparte de"]],["处方","處方","chǔfāng","Receta",["Prescripción"]],["处境","處境","chǔjìng","Situación",null],["处置","處置","chǔzhì","Desecharlos",["Eliminarlos"]],["储备","儲備","chǔbèi","Reservó",["Almacenó"]],["储蓄","儲蓄","chǔxù","Ahorra",null],["触动","觸動","chùdòng","Conmover",["Afectar"]],["触犯","觸犯","chùfàn","Violó",null],["触觉","觸覺","chùjué","Tacto",["Sensibilidad"]],["触摸","觸摸","chùmō","Tocar",["Palpar"]],["触目惊心","觸目驚心","chùmù-jīngxīn","Impactante",["Alarmante"]],["揣",null,"chuāi","Meter en el bolsillo",["Guardar"]],["揣测","揣測","chuǎicè","Especular",["Suponer"]],["揣摩",null,"chuǎimó","Interpretar",["Adivinar"]],["踹",null,"chuài","Patear",["Dar una patada"]],["川流不息",null,"chuānliú-bùxī","Circular",null],["穿过","穿過","chuānguò","Atravesar",["Cruzar"]],["穿小鞋",null,"chuān xiǎoxié","Hacer la vida difícil",["Hostigar"]],["穿越",null,"chuānyuè","Atravesamos",null],["穿着","穿著","chuānzhuó","Vestir",["Indumentaria"]],["传承","傳承","chuánchéng","Transmitir",["Heredar"]],["传奇","傳奇","chuánqí","Leyenda",["Relato"]],["传染","傳染","chuánrǎn","Contagiar",["Infectar"]],["传染病","傳染病","chuánrǎnbìng","Enfermedad contagiosa",["Infección"]],["传人","傳人","chuánrén","Sucesor",["Discípulo"]],["传授","傳授","chuánshòu","Enseña",["Transmite"]],["传闻","傳聞","chuánwén","Rumor",["Oír decir"]],["船舶",null,"chuánbó","Barcos",null],["船桨","船槳","chuánjiǎng","Remo",["Pala"]],["喘",null,"chuǎn","Respirar con dificultad",["Jadear"]],["喘息",null,"chuǎnxī","Descansar",["Recuperar aliento"]],["串门","串門","chuànmén","Visitar",["Pasar a saludar"]],["创伤","創傷","chuāngshāng","Herida",["Trauma"]],["床位",null,"chuángwèi","Cama",["Lecho"]],["创","創","chuàng","Cortar",["Trauma","Variante de 创"]],["创始人","創始人","chuàngshǐrén","Fundador",["Creador"]],["吹了",null,"chuī le","Terminar",["Romper"]],["吹牛",null,"chuīniú","Fanfarronear",["Alardear"]],["吹捧",null,"chuīpěng","Ensalzaron",["Encumbraron"]],["垂",null,"chuí","Colgar",["Pender"]],["垂头丧气","垂頭喪氣","chuítóu-sàngqì","Desanimado",["Abatido"]],["捶",null,"chuí","Golpear",["Abofetear"]],["锤子","錘子","chuízi","Martillo",["Maza"]],["纯粹","純粹","chúncuì","Pura",null],["纯洁","純潔","chúnjié","Puro",null],["纯朴","純樸","chúnpǔ","Simple",["Ingenuo"]],["醇厚",null,"chúnhòu","Rico",["Sabroso"]],["蠢",null,"chǔn","Tonto",["Estúpido"]],["戳",null,"chuō","Pinchar",["Clavar"]],["绰号","綽號","chuòhào","Apodo",["Mote"]],["瓷",null,"cí","Porcelana",["Loza"]],["瓷器",null,"cíqì","Cerámica",["Vajilla"]],["辞","辭","cí","Renunciar",["Despedir"]],["辞呈","辭呈","cíchéng","Renuncia",["Dimisión"]],["辞去","辭去","cíqù","Abandonar",["Dejar"]],["辞退","辭退","cítuì","Despedir",["Desvincular"]],["慈善",null,"císhàn","Benéficas",null],["慈祥",null,"cíxiáng","Dulzura",["Ternura"]],["磁带","磁帶","cídài","Cintas",["Casetes"]],["磁卡",null,"cíkǎ","Tarjeta magnética",["Chip"]],["磁盘","磁盤","cípán","Disco duro",["Floppy"]],["此起彼伏",null,"cǐqǐ-bǐfú","Alternancia",["Ondular"]],["次日",null,"cìrì","Día siguiente",["Mañana"]],["伺候",null,"cìhou","Atiende",["Cuida"]],["刺耳",null,"cì'ěr","Desagradable",["Agudo"]],["刺骨",null,"cìgǔ","Penetrante",["Helado"]],["刺绣","刺繡","cìxiù","Bordar",["Coser"]],["赐","賜","cì","Conceder",["Otorgar"]],["赐教","賜教","cìjiào","Aconsejar",["Enseñar"]],["匆匆",null,"cōngcōng","Rápido",["Apurado"]],["匆忙",null,"cōngmáng","Urgente",["Precipitado"]],["葱","蔥","cōng","Cebollino",["Puerro"]],["从今以后","從今以後","cóng jīn yǐhòu","Desde ahora",["En adelante"]],["从来不","從來不","cónglái bù","Nunca",["Jamás"]],["从容","從容","cóngróng","Serena",["Tranquila"]],["从容不迫","從容不迫","cóngróng-bùpò","Sereno",["Calmo"]],["从头","從頭","cóngtóu","Desde el principio",["Nuevamente"]],["从未","從未","cóngwèi","Nunca",["Jamás"]],["从业","從業","cóngyè","Trabajar",["Ejercer"]],["从早到晚","從早到晚","cóngzǎo-dàowǎn","De mañana a noche",["Todo el día"]],["丛林","叢林","cónglín","Selva",["Bosque"]],["凑","湊","còu","Reunir",["Juntar"]],["凑合","湊合","còuhe","Arreglarte",["Apañarte"]],["凑巧","湊巧","còuqiǎo","Casual",["Por casualidad"]],["粗暴",null,"cūbào","Brusco",["Violento"]],["粗糙",null,"cūcāo","Áspero",["Burdo"]],["粗鲁","粗魯","cūlǔ","Groseramente",null],["粗略",null,"cūlüè","General",["Aproximado"]],["粗心大意",null,"cūxīn-dàyì","Descuidado",["Negligente"]],["促成",null,"cùchéng","Facilitar",["Lograr"]],["簇拥","簇擁","cùyōng","Rodear",["Aglomerar"]],["窜","竄","cuàn","Escabulló",["Se metió"]],["催",null,"cuī","Apresurar",["Presionar"]],["催促",null,"cuīcù","Instar",["Presionar"]],["催眠",null,"cuīmián","Hipnotizar",["Adormecer"]],["摧毁","摧毀","cuīhuǐ","Destruir",["Arruinar"]],["脆弱",null,"cuìruò","Frágil",["Sensible"]],["翠绿","翠綠","cuìlǜ","Verde intenso",["Esmeralda"]],["存放",null,"cúnfàng","Guardar",["Depositar"]],["存心",null,"cúnxīn","Deliberadamente",["A propósito"]],["存折","存摺","cúnzhé","Libreta",["Cuenta"]],["搓",null,"cuō","Frotan",null],["磋商",null,"cuōshāng","Negociaron",["Deliberaron"]],["挫折",null,"cuòzhé","Reveses",["Frustraciones"]],["措手不及",null,"cuòshǒu-bùjí","Desprevenido",["Sorpresivo"]],["错别字","錯別字","cuòbiézì","Error ortográfico",["Falta"]],["错觉","錯覺","cuòjué","Ilusión",["Engaño"]],["错位","錯位","cuòwèi","Desalineado",["Desplazado"]],["错综复杂","錯綜複雜","cuòzōng-fùzá","Complejo",["Intrincado"]],["搭乘",null,"dāchéng","Subir",["Tomar"]],["搭建",null,"dājiàn","Construir",["Montar"]],["达标","達標","dábiāo","Cumplir",["Alcanzar"]],["答辩","答辯","dábiàn","Defensa",null],["打岔",null,"dǎchà","Interrumpir",["Cambiar de tema"]],["打倒",null,"dǎdǎo","Derribar",["Vencer"]],["打盹儿","打盹兒","dǎdǔnr","Echar una siesta",["Reposar"]],["打交道",null,"dǎ jiāodao","Tratar",["Relacionarse"]],["打搅","打攪","dǎjiǎo","Molestar",["Interrumpir"]],["打捞","打撈","dǎlāo","Recuperar",["Rescatar"]],["打量",null,"dǎliang","Escudriña",["Mide con la mirada"]],["打猎","打獵","dǎliè","Cazar",null],["打磨",null,"dǎmó","Pulir",["Refinar"]],["打通",null,"dǎtōng","Conectar",["Unir"]],["打仗",null,"dǎzhàng","Guerra",null],["打招呼",null,"dǎ zhāohu","Saludar",null],["大包大揽","大包大攬","dàbāo-dàlǎn","Asumir todo",["Encargarse"]],["大笔","大筆","dàbǐ","Gran suma",["Fortuna"]],["大臣",null,"dàchén","Ministros",null],["大吃一惊","大吃一驚","dàchī-yījīng","Sorpresa",["Asombrarse"]],["大大咧咧",null,"dàdaliēliē","Descuidado",["Relajado"]],["大地",null,"dàdì","Tierra",["Suelo"]],["大队","大隊","dàduì","Grupo principal",["Batallón"]],["大幅度",null,"dà fúdù","Significativo",["Considerable"]],["大公无私","大公無私","dàgōng-wúsī","Desinteresado",["Altruista"]],["大家庭",null,"dàjiātíng","Familia extensa",["Clan"]],["大街小巷",null,"dàjiē-xiǎoxiàng","Calles y callejones",["Por todas partes"]],["大惊小怪","大驚小怪","dàjīng-xiǎoguài","Exagerar",["Alarmarse"]],["大局",null,"dàjú","Situación general",["Panorama"]],["大款",null,"dàkuǎn","Rico",["Adinerado"]],["大面积","大面積","dà miànjī","Extenso",["Amplio"]],["大名鼎鼎",null,"dàmíng-dǐngdǐng","Famoso",["Célebre"]],["大模大样","大模大樣","dàmú-dàyàng","Arrogante",["Altivo"]],["大棚",null,"dàpéng","Invernadero",["Cubierta"]],["大片",null,"dàpiàn","Película",["Blockbuster"]],["大气","大氣","dàqì","Atmósfera",["Ambiente"]],["大厦","大廈","dàshà","Rascacielos",["Edificio"]],["大数据","大數據","dàshùjù","Big data",["Información masiva"]],["大肆",null,"dàsì","Profusamente",["En exceso"]],["大体","大體","dàtǐ","General",null],["大体上","大體上","dàtǐ shang","Generalmente",["Básicamente"]],["大同小异","大同小異","dàtóng-xiǎoyì","Similar",["Parecido"]],["大腕儿","大腕兒","dàwànr","Celebridad",["Figura importante"]],["大选","大選","dàxuǎn","Elección general",["Votación"]],["大雁",null,"dàyàn","Ganso salvaje",["Cisne"]],["大意",null,"dàyì","Descuidarte",["Distraerte"]],["大有可为","大有可為","dàyǒu-kěwéi","Prometedor",["Alentador"]],["大宗",null,"dàzōng","Gran cantidad",["Volumen"]],["歹徒",null,"dǎitú","Delincuente",["Criminal"]],["逮",null,"dǎi","Capturar",["Atrapar"]],["代号","代號","dàihào","Código",["Seudónimo"]],["代理人",null,"dàilǐrén","Representante",["Apoderado"]],["代言人",null,"dàiyánrén","Portavoz",["Vocero"]],["带队","帶隊","dàiduì","Liderar",["Dirigir"]],["带路","帶路","dàilù","Guiar",["Acompañar"]],["带头","帶頭","dàitóu","Iniciar",["Comenzar"]],["带头人","帶頭人","dàitóurén","Líder",["Dirigente"]],["怠工",null,"dàigōng","Huelga",["Pereza"]],["怠慢",null,"dàimàn","Descuidar",null],["逮捕",null,"dàibǔ","Arrestó",["Detuvo"]],["担","擔","dān","Unidad de peso",null],["担当","擔當","dāndāng","Asumir",["Responsabilizarse"]],["担负","擔負","dānfù","Asumir / cargar",null],["单边","單邊","dānbiān","Unilateral",null],["单薄","單薄","dānbó","Débil / frágil",null],["单方面","單方面","dānfāngmiàn","Parte única",null],["单身","單身","dānshēn","Soltero",null],["耽搁","耽擱","dānge","Retrasar",null],["耽误","耽誤","dānwu","Demorar",null],["胆怯","膽怯","dǎnqiè","Tímido",["Miedoso"]],["胆子","膽子","dǎnzi","Valor",null],["但愿","但願","dànyuàn","Ojalá",null],["担子","擔子","dànzi","Carga",null],["诞辰","誕辰","dànchén","Nacimiento",["Natalicio"]],["淡化",null,"dànhuà","Atenuar",null],["淡季",null,"dànjì","Baja",null],["蛋白质","蛋白質","dànbáizhì","Proteínas",null],["当即","當即","dāngjí","Inmediatamente",null],["当今","當今","dāngjīn","Actual",null],["当面","當面","dāngmiàn","Frente",["En la cara"]],["当日","當日","dāngrì","Ese día",null],["当事人","當事人","dāngshìrén","Implicada",["Involucrada"]],["当务之急","當務之急","dāngwùzhījí","Urgente",["Prioritario"]],["当下","當下","dāngxià","Ahora mismo",null],["当心","當心","dāngxīn","Tener cuidado",null],["当着","當著","dāngzhe","Frente a",null],["当之无愧","當之無愧","dāngzhīwúkuì","Merecido",null],["当众","當眾","dāngzhòng","En público",null],["当晚","當晚","dàngwǎn","Esa noche",null],["当真","當真","dàngzhēn","En serio",null],["荡漾","盪漾","dàngyàng","Ondular",null],["档次","檔次","dàngcì","Nivel",["Categoría"]],["导弹","導彈","dǎodàn","Misiles",null],["导航","導航","dǎoháng","GPS",["Navegador"]],["导火索","導火索","dǎohuǒsuǒ","Detonante",null],["导师","導師","dǎoshī","Tutor",null],["导向","導向","dǎoxiàng","Rumbo",["Orientación"]],["岛屿","島嶼","dǎoyǔ","Isla",null],["捣乱","搗亂","dǎoluàn","Molestar",["Hacer lío"]],["倒卖","倒賣","dǎomài","Revender",null],["倒霉",null,"dǎoméi","Tener mala suerte",null],["倒塌",null,"dǎotā","Derrumbar",null],["倒下",null,"dǎoxia","Caer",null],["到头来","到頭來","dàotóulái","Finalmente",null],["到位",null,"dàowèi","Adecuado",null],["倒计时","倒計時","dàojìshí","Cuenta regresiva",null],["倒数","倒數","dàoshǔ","Contar hacia atrás",null],["盗","盜","dào","Robar",null],["盗窃","盜竊","dàoqiè","Robo",["Hurto"]],["悼念",null,"dàoniàn","Lamentar",null],["道具",null,"dàojù","Utilería",null],["稻草",null,"dàocǎo","Paja",null],["得不偿失","得不償失","débùchángshī","Pérdidas",null],["得当","得當","dédàng","Apropiado",null],["得力",null,"délì","Capaz",["Eficiente"]],["得失",null,"déshī","Ganancias y pérdidas",null],["得手",null,"déshǒu","Exitoso",null],["得体","得體","détǐ","Adecuado",null],["得天独厚","得天獨厚","détiāndúhòu","Privilegiado",null],["得益于","得益於","déyì yú","Beneficiarse de",null],["得意扬扬","得意揚揚","déyì-yángyáng","Satisfecho",null],["得知",null,"dézhī","Enterarse",null],["得罪",null,"dézuì","Ofender",null],["德",null,"dé","Virtud",null],["灯笼","燈籠","dēnglong","Faroles",null],["灯泡","燈泡","dēngpào","Bombilla",null],["登机","登機","dēngjī","Embarcar",null],["登陆","登陸","dēnglù","Desembarcar",null],["蹬",null,"dēng","Patear",null],["凳子",null,"dèngzi","Silla",null],["瞪",null,"dèng","Mirar fijamente",null],["低调","低調","dīdiào","Discreto",null],["低估",null,"dīgū","Subestimar",null],["低谷",null,"dīgǔ","Punto más bajo",null],["低价","低價","dījià","Bajo precio",null],["低迷",null,"dīmí","Deprimido",null],["低碳",null,"dītàn","Bajo en carbono",null],["低下",null,"dīxià","Bajo",null],["堤",null,"dī","Dique",null],["堤坝","堤壩","dībà","Dique",["Represa"]],["提防",null,"dīfang","Tener cuidado",null],["笛子",null,"dízi","Flauta",null],["抵触","抵觸","dǐchù","Oponerse",null],["抵挡","抵擋","dǐdǎng","Resistir",null],["抵消",null,"dǐxiāo","Cancelar",null],["抵押",null,"dǐyā","Hipotecar",null],["抵御","抵禦","dǐyù","Defender",null],["抵制",null,"dǐzhì","Boicotear",null],["底层","底層","dǐcéng","Base",null],["底线","底線","dǐxiàn","Línea de base",null],["底蕴","底蘊","dǐyùn","Fondo",null],["底子",null,"dǐzi","Base",null],["地步",null,"dìbù","Situación",null],["地道",null,"dìdào","Túnel",null],["地段",null,"dìduàn","Zona",null],["地理",null,"dìlǐ","Geografía",null],["地毯",null,"dìtǎn","Alfombra",null],["地下水",null,"dìxiàshuǐ","Agua subterránea",null],["地狱","地獄","dìyù","Infierno",null],["地域",null,"dìyù","Región",null],["地质","地質","dìzhì","Geología",null],["弟子",null,"dìzǐ","Discípulo",null],["帝国","帝國","dìguó","Imperio",null],["帝国主义","帝國主義","dìguó zhǔyì","Imperialismo",null],["递交","遞交","dìjiāo","Entregar",null],["第一手",null,"dìyīshǒu","Directo",null],["第一线","第一線","dìyīxiàn","Primera línea",null],["颠倒","顛倒","diāndǎo","Invertir",["Al revés","Boca abajo"]],["颠覆","顛覆","diānfù","Subvertir",null],["巅峰","巔峰","diānfēng","Cima",null],["典范","典範","diǎnfàn","Modelo",null],["点火","點火","diǎnhuǒ","Encender",null],["点击率","點擊率","diǎnjīlǜ","Tasa de clics",null],["点评","點評","diǎnpíng","Comentar",null],["点心","點心","diǎnxin","Tentempié",null],["点缀","點綴","diǎnzhuì","Adornar",null],["点子","點子","diǎnzi","Idea",null],["电报","電報","diànbào","Telegrama",null],["电铃","電鈴","diànlíng","Timbre eléctrico",null],["电网","電網","diànwǎng","Red eléctrica",null],["电线","電線","diànxiàn","Cable eléctrico",null],["电信","電信","diànxìn","Telecomunicaciones",null],["电讯","電訊","diànxùn","Comunicado",null],["垫","墊","diàn","Apoyar",null],["垫底","墊底","diàndǐ","Quedar último",null],["垫子","墊子","diànzi","Cojín",null],["淀粉","澱粉","diànfěn","Almidón",null],["惦记","惦記","diànjì","Acordarse",null],["奠定",null,"diàndìng","Establecer",null],["殿堂",null,"diàntáng","Salón",null],["刁难","刁難","diāonàn","Dificultar",null],["叼",null,"diāo","Sostener con los dientes",null],["雕",null,"diāo","Esculpir",null],["雕刻",null,"diāokè","Tallar",null],["雕塑",null,"diāosù","Esculpir",null],["吊销","吊銷","diàoxiāo","Revocar",null],["钓鱼","釣魚","diàoyú","Pescar",null],["调度","調度","diàodù","Organizar",null],["掉队","掉隊","diàoduì","Quedarse atrás",null],["掉头","掉頭","diàotóu","Dar la vuelta",["Cambiar de dirección"]],["爹",null,"diē","Padre",["Papá"]],["迭起",null,"diéqǐ","Sucederse sucesivamente",["Ocurrir uno tras otro"]],["叠","疊","dié","Apilar",["Superponer"]],["丁",null,"dīng","成年男子",["Persona adulta"]],["叮嘱","叮囑","dīngzhǔ","Exhortar insistentemente",["Aconsejar con insistencia"]],["盯",null,"dīng","Fijar la vista en",["Mirar fijamente"]],["钉子","釘子","dīngzi","Clavo",["Obstáculo"]],["顶多","頂多","dǐngduō","Como máximo",["A lo sumo"]],["顶级","頂級","dǐngjí","De nivel superior",["De primera clase"]],["顶尖","頂尖","dǐngjiān","Cúspide/élite",["Mejor","De más alto nivel"]],["订单","訂單","dìngdān","Pedido",["Encargo"]],["订购","訂購","dìnggòu","Encargar",["Pedir"]],["订婚","訂婚","dìnghūn","Comprometerse",["Comprometerse en matrimonio"]],["订立","訂立","dìnglì","Establecer",["Firmar"]],["钉","釘","dìng","Clavar",["Fijar"]],["定金",null,"dìngjīn","Señal",["Depósito"]],["定居",null,"dìngjū","Establecerse residencia",["Radicarse"]],["定论","定論","dìnglùn","Conclusión definitiva",["Veredicto"]],["定为","定為","dìngwéi","Considerar como",["Definir como"]],["定向",null,"dìngxiàng","Orientar",["Dirigir"]],["定心丸",null,"dìngxīnwán","Tranquilizante",null],["定义","定義","dìngyì","Definición",["Concepto"]],["定做",null,"dìngzuò","Hacer a medida",["Confeccionar"]],["丢掉","丟掉","diūdiào","Tirar",["Descartar"]],["丢脸","丟臉","diūliǎn","Perder la cara",["Avergonzarse"]],["丢弃","丟棄","diūqì","Desechar",["Tirar"]],["丢人","丟人","diūrén","Dar vergüenza",["Avergonzar"]],["丢失","丟失","diūshī","Perder",["Extraviar"]],["东奔西走","東奔西走","dōngbēn-xīzǒu","Correr de un lado a otro",["Moverse constantemente"]],["东道主","東道主","dōngdàozhǔ","Anfitrión",null],["东张西望","東張西望","dōngzhāng-xīwàng","Mirar a izquierda y derecha",["Mirar alrededor"]],["董事",null,"dǒngshì","Director",["Miembro del consejo"]],["董事会","董事會","dǒngshìhuì","Consejo de administración",["Junta directiva"]],["董事长","董事長","dǒngshìzhǎng","Presidente del consejo",["Director ejecutivo"]],["懂事",null,"dǒngshì","Ser comprensivo",["Entender las cosas"]],["动不动","動不動","dòngbudòng","Fácilmente",["Con facilidad"]],["动荡","動盪","dòngdàng","Conmover/turbulento",["Inestable"]],["动感","動感","dònggǎn","Sensación de movimiento",["Dinámico"]],["动工","動工","dònggōng","Comenzar la construcción",["Empezar a construir"]],["动静","動靜","dòngjing","Movimiento",["Ruido"]],["动脉","動脈","dòngmài","Arteria",null],["动身","動身","dòngshēn","Partir",["Emprender viaje"]],["动弹","動彈","dòngtan","Moverse",["Remecer"]],["动听","動聽","dòngtīng","Agradable al oído",["Melodioso"]],["动向","動向","dòngxiàng","Tendencia",["Rumbo"]],["动用","動用","dòngyòng","Utilizar",["Emplear"]],["冻结","凍結","dòngjié","Congelar",["Helar"]],["栋","棟","dòng","Clasificador (edificios, casas)",null],["栋梁","棟梁","dòngliáng","Pilar principal",["Soporte"]],["兜",null,"dōu","Llevar en el bolsillo",["Guardar"]],["兜儿","兜兒","dōur","Bolsillo",null],["兜售",null,"dōushòu","Vender ambulante",["Vender de puerta en puerta"]],["抖",null,"dǒu","Temblar",["Sacudir"]],["陡",null,"dǒu","Escarpado",["Abrupto"]],["斗","鬥","dòu","Luchar",["Combatir"]],["斗志","鬥志","dòuzhì","Espíritu combativo",["Combatividad"]],["豆浆","豆漿","dòujiāng","Leche de soja",["Soja"]],["豆子",null,"dòuzi","Habichuela",["Judía"]],["逗",null,"dòu","Divertir",["Provocar"]],["都会","都會","dūhuì","Metrópoli",["Ciudad grande"]],["督促",null,"dūcù","Presionar",["Impulsar"]],["独","獨","dú","Solo",["Único","Independiente"]],["独唱","獨唱","dúchàng","Cantar solo",["Recitar solo"]],["独家","獨家","dújiā","Exclusivo",["Único"]],["独立自主","獨立自主","dúlì-zìzhǔ","Independiente y autónomo",["Soberano"]],["独身","獨身","dúshēn","Vivir solo",["Soltero"]],["独一无二","獨一無二","dúyī-wú'èr","Único",["Incomparable"]],["堵塞",null,"dǔsè","Obstruir",["Taponar"]],["杜绝","杜絕","dùjué","Eliminar por completo",["Erradicar"]],["妒忌",null,"dùjì","Envidiar",["Celar"]],["度假",null,"dùjià","Tomar vacaciones",["Vacacionar"]],["渡过","渡過","dùguò","Cruzar",["Superar"]],["端正",null,"duānzhèng","Correcto/enderezar",["Recto"]],["短缺",null,"duǎnquē","Escasear",["Faltar"]],["短暂","短暫","duǎnzàn","Breve",["Pasajero"]],["段落",null,"duànluò","Párrafo",["Sección"]],["断定","斷定","duàndìng","Afirmar con certeza",["Concluir"]],["断断续续","斷斷續續","duànduànxùxù","Intermitente",["Discontinuo"]],["断裂","斷裂","duànliè","Romperse",["Quebrarse"]],["堆砌",null,"duīqì","Amontonar",["Acumular"]],["队形","隊形","duìxíng","Formación",null],["对白","對白","duìbái","Diálogo",["Conversación"]],["对策","對策","duìcè","Contramedida",["Solución"]],["对称","對稱","duìchèn","Simétrico",["Equilibrado"]],["对得起","對得起","duìdeqǐ","Ser merecedor de",["Corresponder a"]],["对联","對聯","duìlián","Pareado de versos",["Dístico"]],["对弈","對弈","duìyì","Jugar ajedrez",["Jugar"]],["对照","對照","duìzhào","Comparar",["Contrastar"]],["对峙","對峙","duìzhì","Enfrentamiento",["Oposición"]],["对准","對準","duìzhǔn","Apuntar",["Apuntar a"]],["兑换","兌換","duìhuàn","Cambiar",["Canjear"]],["兑现","兌現","duìxiàn","Cumplir",["Satisfacer"]],["敦促",null,"dūncù","Instar",["Presionar"]],["敦厚",null,"dūnhòu","Honesto y amable",["Bueno"]],["炖","燉","dùn","Estofar",["Cocer a fuego lento"]],["顿时","頓時","dùnshí","De repente",["Súbitamente"]],["多边","多邊","duōbiān","Multilateral",["De múltiples partes"]],["多功能",null,"duōgōngnéng","Multifunción",["Versátil"]],["多亏","多虧","duōkuī","Gracias a",["Por suerte"]],["多劳多得","多勞多得","duōláo-duōdé","Más trabajo, más ganancia",["Trabajar más para ganar más"]],["多年来","多年來","duō nián lái","Durante años",["A lo largo de los años"]],["多心",null,"duōxīn","Desconfiar",["Ser suspicaz"]],["多余","多餘","duōyú","Sobrante",["Innecesario","De más"]],["多元",null,"duōyuán","Múltiple",["Diverso"]],["哆嗦",null,"duōsuo","Temblar",["Estremecerse"]],["夺冠","奪冠","duóguàn","Ganar el campeonato",["Coronarse"]],["夺魁","奪魁","duókuí","Ganar el primer lugar",["Ganar"]],["躲避",null,"duǒbì","Esquivar",["Evitar"]],["躲藏",null,"duǒcáng","Esconderse",["Ocultarse"]],["舵手",null,"duòshǒu","Timonel",["Piloto"]],["堕落","墮落","duòluò","Degenerar",["Corromperse"]],["讹诈","訛詐","ézhà","Extorsionar",["Chantajear"]],["俄语","俄語","Éyǔ","Ruso",["Lengua rusa"]],["鹅","鵝","é","Ganso",null],["额外","額外","éwài","Adicional",["Extra"]],["厄运","厄運","èyùn","Infortunio",["Mala suerte"]],["恶","惡","è","Malo, malvado, feo (è)",["Odiar (wù)"]],["恶化","惡化","èhuà","Empeorar",["Deteriorarse"]],["恶劣","惡劣","èliè","Pésimo",["Vil","De mala calidad"]],["恶性","惡性","èxìng","Maligno",["Perjudicial"]],["恶意","惡意","èyì","Mala intención",["Malicia"]],["遏制",null,"èzhì","Reprimir",["Contener"]],["鳄鱼","鱷魚","èyú","Cocodrilo",null],["恩赐","恩賜","ēncì","Conceder como favor",["Donar"]],["恩惠",null,"ēnhuì","Favor",["Beneficio"]],["恩情",null,"ēnqíng","Afecto",["Gratitud","Favor (de alguien)"]],["恩怨",null,"ēnyuàn","Rencor/deuda",null],["而已",null,"éryǐ","Y nada más",null],["耳光",null,"ěrguāng","Bofetada",null],["耳目一新",null,"ěrmù-yīxīn","Renovar impresiones",null],["耳熟能详","耳熟能詳","ěrshú-néngxiáng","Muy conocido",null],["耳闻目睹","耳聞目睹","ěrwén-mùdǔ","Presenciar",null],["二手车","二手車","èrshǒuchē","Auto usado",null],["二氧化碳",null,"èryǎnghuàtàn","Dióxido de carbono",null],["发布会","發佈會","fābùhuì","Conferencia de prensa",null],["发财","發財","fācái","Hacerse rico",null],["发愁","發愁","fāchóu","Preocuparse",null],["发电机","發電機","fādiànjī","Generador eléctrico",null],["发抖","發抖","fādǒu","Temblar",null],["发愤图强","發憤圖強","fāfèn-túqiáng","Esforzarse por mejorar",null],["发光","發光","fāguāng","Brillar",null],["发火","發火","fāhuǒ","Enojarse",null],["发酵","發酵","fājiào","Fermentar",null],["发掘","發掘","fājué","Excavar",null],["发愣","發愣","fālèng","Quedarse pasmado",null],["发脾气","發脾氣","fā píqi","Enojarse",null],["发起人","發起人","fāqǐrén","Fundador",null],["发热","發熱","fārè","Calentarse",null],["发誓","發誓","fāshì","Jurar",["Prometer"]],["发泄","發洩","fāxiè","Desahogar",null],["发扬","發揚","fāyáng","Promover",null],["发扬光大","發揚光大","fāyáng-guāngdà","Hacer florecer",null],["发育","發育","fāyù","Desarrollarse",null],["发源地","發源地","fāyuándì","Origen",null],["发作","發作","fāzuò","Atacar",null],["阀门","閥門","fámén","Válvula",null],["发型","髮型","fàxíng","Peinado",null],["帆",null,"fān","Vela",null],["帆船",null,"fānchuán","Velero",null],["翻番",null,"fānfān","Duplicar",null],["翻来覆去","翻來覆去","fānlái-fùqù","Dar vueltas",null],["翻天覆地",null,"fāntiān-fùdì","Transformar",null],["凡",null,"fán","Ordinario",["Mundano","Cualquier (literario)"]],["烦闷","煩悶","fánmèn","Aburrido",null],["烦恼","煩惱","fánnǎo","Molesto",null],["烦躁","煩躁","fánzào","Impaciente",null],["繁华","繁華","fánhuá","Bullicioso",null],["繁忙",null,"fánmáng","Ocupado",null],["繁体字","繁體字","fántǐzì","Caracteres tradicionales",null],["繁重",null,"fánzhòng","Pesado",null],["反驳","反駁","fǎnbó","Refutar",null],["反差",null,"fǎnchā","Contraste",null],["反常",null,"fǎncháng","Anormal",null],["反倒",null,"fǎndào","Por el contrario",null],["反感",null,"fǎngǎn","Desagrado",null],["反过来","反過來","fǎn guòlái","Al revés",null],["反击","反擊","fǎnjī","Contraatacar",null],["反馈","反饋","fǎnkuì","Retroalimentar",null],["反面",null,"fǎnmiàn","Reverso",null],["反思",null,"fǎnsī","Reflexionar",null],["反弹","反彈","fǎntán","Rebotar",null],["反省",null,"fǎnxǐng","Examinarse",null],["返还","返還","fǎnhuán","Devolver",null],["犯愁",null,"fànchóu","Preocuparse",null],["饭碗","飯碗","fànwǎn","Plato",null],["泛滥","泛濫","fànlàn","Inundar",null],["范畴","範疇","fànchóu","Categoría",null],["贩卖","販賣","fànmài","Vender",null],["方方面面",null,"fāngfāngmiànmiàn","Aspectos",null],["方向盘","方向盤","fāngxiàngpán","Volante",null],["方言",null,"fāngyán","Dialecto",null],["防盗","防盜","fángdào","Prevenir robos",null],["防盗门","防盜門","fángdàomén","Puerta blindada",null],["防护","防護","fánghù","Proteger",null],["防火墙","防火牆","fánghuǒqiáng","Cortafuegos",null],["防卫","防衛","fángwèi","Defender",null],["防汛",null,"fángxùn","Prevenir inundaciones",null],["防疫",null,"fángyì","Prevenir epidemias",null],["防御","防禦","fángyù","Defender",null],["妨碍","妨礙","fáng'ài","Obstaculizar",null],["妨害",null,"fánghài","Dañar",null],["房地产","房地產","fángdìchǎn","Bienes raíces",null],["仿",null,"fǎng","Imitar",null],["仿制","仿製","fǎngzhì","Copiar",null],["访谈","訪談","fǎngtán","Entrevistar",null],["纺织","紡織","fǎngzhī","Tejer",null],["放过","放過","fàngguò","Perdonar",null],["放水",null,"fàngshuǐ","Dejar ganar",null],["放肆",null,"fàngsì","Descarado",null],["放映",null,"fàngyìng","Proyectar",null],["放置",null,"fàngzhì","Colocar",null],["放纵","放縱","fàngzòng","Consentir",null],["飞速","飛速","fēisù","Rápidamente",null],["飞往","飛往","fēiwǎng","Volar hacia",null],["飞翔","飛翔","fēixiáng","Volar",null],["飞跃","飛躍","fēiyuè","Salto",null],["非得",null,"fēiděi","Tener que",null],["非法",null,"fēifǎ","Ilegal",null],["非凡",null,"fēifán","Extraordinario",null],["绯闻","緋聞","fēiwén","Escándalo amoroso",null],["肥料",null,"féiliào","Fertilizante",null],["肥胖",null,"féipàng","Gordo",null],["肥沃",null,"féiwò","Fértil",null],["肥皂",null,"féizào","Jabón",null],["诽谤","誹謗","fěibàng","Difamar",null],["废","廢","fèi","Abolir",["Abandonar","Inútil, inválido"]],["废除","廢除","fèichú","Abolir",null],["废话","廢話","fèihuà","Tonterías",null],["废品","廢品","fèipǐn","Desperdicio",null],["废寝忘食","廢寢忘食","fèiqǐn-wàngshí","Trabajar sin descanso",null],["废物","廢物","fèiwù","Basura",null],["废墟","廢墟","fèixū","Ruinas",null],["沸沸扬扬","沸沸揚揚","fèifèiyángyáng","Comentado",null],["沸腾","沸騰","fèiténg","Hervir",null],["费劲","費勁","fèijìn","Costar esfuerzo",null],["分辨",null,"fēnbiàn","Distinguir",null],["分寸",null,"fēncun","Mesura",null],["分担","分擔","fēndān","Compartir",null],["分割",null,"fēngē","Dividir",null],["分红","分紅","fēnhóng","Repartir beneficios",null],["分化",null,"fēnhuà","Dividir",null],["分泌",null,"fēnmì","Secretar",null],["分明",null,"fēnmíng","Claro",null],["分歧",null,"fēnqí","Desacuerdo",["Divergencia"]],["分赃","分贓","fēnzāng","Repartir botín",null],["分支",null,"fēnzhī","Rama",null],["芬芳",null,"fēnfāng","Fragante",null],["吩咐",null,"fēnfù","Ordenar",null],["氛围","氛圍","fēnwéi","Ambiente",null],["坟","墳","fén","Tumba",null],["坟墓","墳墓","fénmù","Tumba",["Sepulcro"]],["焚烧","焚燒","fénshāo","Quemar",["Incinerar"]],["粉",null,"fěn","Harina",["Polvo"]],["粉丝","粉絲","fěnsī","Seguidor",["Fan"]],["粉碎",null,"fěnsuì","Triturar",["Hecho migajas"]],["分量",null,"fènliàng","Peso",["Importancia"]],["分外",null,"fènwài","Especialmente",["Particularmente"]],["份额","份額","fèn'é","Cuota",["Porción"]],["奋力","奮力","fènlì","Esforzarse",["Con fuerza"]],["奋勇","奮勇","fènyǒng","Luchar valientemente",["Arremeter"]],["粪","糞","fèn","Excremento",["Estiércol"]],["粪便","糞便","fènbiàn","Heces",["Caca"]],["丰富多彩","豐富多彩","fēngfù-duōcǎi","Rico y variado",["Diverso"]],["丰厚","豐厚","fēnghòu","Generoso",["Abundante"]],["丰满","豐滿","fēngmǎn","Regordete",["Completo"]],["丰盛","豐盛","fēngshèng","Abundante",["Copioso"]],["丰硕","豐碩","fēngshuò","Fructífero",["Abundante"]],["风波","風波","fēngbō","Controversia",["Disturbio"]],["风采","風采","fēngcǎi","Elegancia",["Presencia"]],["风餐露宿","風餐露宿","fēngcān-lùsù","Al raso",["A la intemperie"]],["风范","風範","fēngfàn","Estilo",["Dignidad"]],["风风雨雨","風風雨雨","fēngfēngyǔyǔ","Vicisitudes",["Tormentas"]],["风和日丽","風和日麗","fēnghé-rìlì","Día soleado",["Clima agradable"]],["风浪","風浪","fēnglàng","Olas",["Dificultades"]],["风力","風力","fēnglì","Fuerza del viento",["Viento"]],["风流","風流","fēngliú","Elegante",["Libertino"]],["风貌","風貌","fēngmào","Aspecto",["Paisaje"]],["风气","風氣","fēngqì","Ambiente",["Clima (social)","Moda"]],["风情","風情","fēngqíng","Costumbre",["Encanto"]],["风趣","風趣","fēngqù","Gracioso",["Divertido"]],["风沙","風沙","fēngshā","Arena del viento",["Polvareda"]],["风尚","風尚","fēngshàng","Moda",["Tendencia"]],["风水","風水","fēngshuǐ","Geomancia",["Ubicación"]],["风味","風味","fēngwèi","Sabor",["Estilo"]],["风雨","風雨","fēngyǔ","Lluvia y viento",["Adversidad"]],["风云","風雲","fēngyún","Nubes y viento",["Situación cambiante"]],["风筝","風箏","fēngzheng","Cometa",["Papalote"]],["封顶","封頂","fēngdǐng","Cubrir la cima",["Finalizar"]],["封建",null,"fēngjiàn","Feudal",["Sistema feudal"]],["封面",null,"fēngmiàn","Portada",["Cubierta"]],["封锁","封鎖","fēngsuǒ","Bloquear",["Aislar"]],["疯子","瘋子","fēngzi","Loco",["Demente"]],["峰回路转","峰回路轉","fēnghuí-lùzhuǎn","Giro inesperado",["Revés"]],["蜂蜜",null,"fēngmì","Miel",["Mel"]],["逢",null,"féng","Encontrarse",["Topar"]],["缝","縫","féng","Coser",["Unir"]],["缝合","縫合","fénghé","Suturar",["Juntar"]],["讽刺","諷刺","fěngcì","Satirizar",["Mofar"]],["凤凰","鳳凰","fènghuáng","Fénix",["Ave mitológica"]],["否决","否決","fǒujué","Vetar",["Rechazar"]],["孵化",null,"fūhuà","Incubar",["Eclosionar"]],["敷",null,"fū","Aplicar",["Untar"]],["扶持",null,"fúchí","Apoyar",["Sostener"]],["服饰","服飾","fúshì","Vestimenta",["Indumentaria"]],["服务器","服務器","fúwùqì","Servidor",["Equipo informático"]],["服用",null,"fúyòng","Tomar",["Ingerir"]],["俘获","俘獲","fúhuò","Capturar",["Apresar"]],["俘虏","俘虜","fúlǔ","Prisionero",["Cautivo"]],["浮力",null,"fúlì","Flotabilidad",["Empuje"]],["浮现","浮現","fúxiàn","Surgir",["Aparecer"]],["浮躁",null,"fúzào","Impulsivo",["Inquieto"]],["辐射","輻射","fúshè","Radiar",["Emitir"]],["福气","福氣","fúqi","Buena suerte",["Bendición"]],["抚摸","撫摸","fǔmō","Acariciar",["Palpar"]],["抚恤","撫卹","fǔxù","Compensar",["Indemnizar"]],["抚养","撫養","fǔyǎng","Criar",["Mantener"]],["抚养费","撫養費","fǔyǎngfèi","Manutención",["Pensión"]],["斧子",null,"fǔzi","Hacha",["Tajo"]],["俯首",null,"fǔshǒu","Inclinar cabeza",["Someterse"]],["辅导","輔導","fǔdǎo","Tutorizar",["Enseñar"]],["腐败","腐敗","fǔbài","Corrupto",["Podrido"]],["腐化",null,"fǔhuà","Corromper",["Degenerar"]],["腐烂","腐爛","fǔlàn","Podrirse",["Descomponer"]],["腐蚀","腐蝕","fǔshí","Corroer",["Deteriorar"]],["腐朽",null,"fǔxiǔ","Podrido",["Anticuado"]],["付费","付費","fùfèi","Pagar",["Abonar"]],["付款",null,"fùkuǎn","Pagar",["Pago"]],["负面","負面","fùmiàn","Negativo",["Perjudicial"]],["负有","負有","fùyǒu","Tener",["Asumir"]],["附",null,"fù","Adjuntar",["Añadir"]],["附带","附帶","fùdài","Incluir",["Adicional"]],["附和",null,"fùhè","Asentir",["Apoyar"]],["附加",null,"fùjiā","Añadir",["Agregar"]],["附属","附屬","fùshǔ","Depender",["Anexo"]],["赴",null,"fù","Asistir",["Ir"]],["复查","復查","fùchá","Revisar",["Verificar"]],["复发","復發","fùfā","Recaer",["Volver"]],["复合","復合","fùhé","Combinar",["Compuesto"]],["复活","復活","fùhuó","Resucitar",["Revivir"]],["复兴","復興","fùxīng","Revivir",["Restaurar"]],["复原","復原","fùyuán","Restaurar",["Recuperar"]],["副作用",null,"fùzuòyòng","Efecto secundario",["Reacción adversa"]],["赋予","賦予","fùyǔ","Conferir",["Dotar"]],["富含",null,"fùhán","Contener",["Estar lleno de"]],["富豪",null,"fùháo","Rico",["Millonario"]],["富强","富強","fùqiáng","Próspero y poderoso",["Floreciente"]],["富翁",null,"fùwēng","Hombre rico",["Adinerado"]],["富裕",null,"fùyù","Rico",["Afluente"]],["富足",null,"fùzú","Abundante",["Opulento"]],["腹部",null,"fùbù","Abdomen",["Vientre"]],["腹泻","腹瀉","fùxiè","Diarrea",["Tener diarrea"]],["覆盖","覆蓋","fùgài","Cubrir",["Recubrir"]],["改版",null,"gǎibǎn","Modificar versión",["Actualizar"]],["改编","改編","gǎibiān","Adaptar",["Modificar"]],["改动","改動","gǎidòng","Cambiar",["Modificar"]],["改革开放","改革開放","gǎigé kāifàng","Reforma y apertura",["Apertura económica"]],["改良",null,"gǎiliáng","Mejorar",["Perfeccionar"]],["改名",null,"gǎimíng","Cambiar nombre",["Renombrar"]],["改日",null,"gǎirì","Otro día",["Más tarde"]],["改为","改為","gǎiwéi","Cambiar a",["Convertir en"]],["改邪归正","改邪歸正","gǎixié-guīzhèng","Enmendar conducta",["Rectificar"]],["钙","鈣","gài","Calcio",["Mineral"]],["盖子","蓋子","gàizi","Tapa",["Cubierta"]],["概况","概況","gàikuàng","Resumen",["Panorama"]],["概率",null,"gàilǜ","Probabilidad",["Posibilidad"]],["概论","概論","gàilùn","Introducción",["Panorama"]],["干戈",null,"gāngē","Guerra",["Conflicto"]],["干旱","乾旱","gānhàn","Seco",["Árido"]],["干燥","乾燥","gānzào","Seco",["Árido"]],["甘心",null,"gānxīn","Aceptar voluntariamente",["Conformarse"]],["肝脏","肝臟","gānzàng","Hígado",["Órgano"]],["尴尬","尷尬","gāngà","Incómodo/a",["Desafiante","Avergonzado"]],["赶赴","趕赴","gǎnfù","Dirigirse a",["Acudir","Ir"]],["赶往","趕往","gǎnwǎng","Dirigirse a",["Acudir","Ir"]],["敢情",null,"gǎnqing","Resulta que",["En efecto","Por supuesto"]],["感",null,"gǎn (zérèngǎn)","Emoción",["Afectar","Moverse"]],["感触","感觸","gǎnchù","Impresión",["Sentimiento","Emoción"]],["感恩",null,"gǎn'ēn","Agradecer",["Dar gracias"]],["感激",null,"gǎnjī","Agradecer",["Estar agradecido"]],["感慨",null,"gǎnkǎi","Lamentar",["Suspirar","Emoverse"]],["感染",null,"gǎnrǎn","Infectar",["Contagiarse"]],["感染力",null,"gǎnrǎnlì","Atractivo",["Poder de convicción"]],["感叹","感嘆","gǎntàn","Exclamar",["Lamentar"]],["感性",null,"gǎnxìng","Emocional",["Sentimental"]],["干部","幹部","gànbù","Funcionario/a",["Directivo"]],["干事","幹事","gànshi","Empleado/a",["Funcionario"]],["刚毅","剛毅","gāngyì","Decidido/a",["Firme","Valiente"]],["纲领","綱領","gānglǐng","Programa",["Manifiesto"]],["纲要","綱要","gāngyào","Esbozo",["Resumen"]],["钢","鋼","gāng","Acero",["Metal"]],["缸",null,"gāng","Barril",["Tinaja"]],["港",null,"gǎng","Puerto",["Bahía"]],["杠铃","槓鈴","gànglíng","Halterofilia",["Pesas"]],["高昂",null,"gāo'áng","Elevar",["Caro","Inflado"]],["高傲",null,"gāo'ào","Arrogante",["Altivo"]],["高超",null,"gāochāo","Hábil",["Experto"]],["高低",null,"gāodī","Nivel",["Importancia"]],["高调","高調","gāodiào","Ostentación",["Perfil alto"]],["高额","高額","gāo'é","Alto",["Cuantioso"]],["高尔夫球","高爾夫球","gāo'ěrfūqiú","Golf",["Deporte"]],["高峰期",null,"gāofēngqī","Hora pico",null],["高贵","高貴","gāoguì","Noble",["Aristocrático"]],["高空",null,"gāokōng","Altitud",["Estratosfera"]],["高龄","高齡","gāolíng","Anciano/a",["Mayor"]],["高明",null,"gāomíng","Hábil",["Inteligente"]],["高山",null,"gāoshān","Montaña",["Cordillera"]],["高效",null,"gāoxiào","Eficiente",["Productivo"]],["高新技术","高新技術","gāoxīn-jìshù","Tecnología avanzada",["Innovación"]],["高血压","高血壓","gāoxuèyā","Hipertensión",["Presión arterial"]],["高压","高壓","gāoyā","Alta presión",["Autoritario"]],["高雅",null,"gāoyǎ","Elegante",["Refinado"]],["高涨","高漲","gāozhǎng","Aumentar",["Crecer"]],["搞鬼",null,"gǎoguǐ","Hacer trampas",["Intrigar"]],["搞笑",null,"gǎoxiào","Hacer reír",["Bromear"]],["告",null,"gào","Decir",["Informar"]],["告辞","告辭","gàocí","Despedirse",["Retirarse"]],["告诫","告誡","gàojiè","Advertir",["Aconsejar"]],["告示",null,"gàoshi","Aviso",["Cartel"]],["告知",null,"gàozhī","Informar",["Comunicar"]],["告状","告狀","gàozhuàng","Denunciar",["Quejarse"]],["戈壁",null,"gēbì","Desierto",["Estepa"]],["胳膊",null,"gēbo","Brazo",null],["鸽子","鴿子","gēzi","Paloma",["Ave"]],["搁","擱","gē","Dejar",["Posponer"]],["搁浅","擱淺","gēqiǎn","Encallar",["Estancar"]],["搁置","擱置","gēzhì","Posponer",["Diferir"]],["割",null,"gē","Cortar",["Segar"]],["歌剧","歌劇","gējù","Ópera",["Musical"]],["歌颂","歌頌","gēsòng","Alabar",["Elogiar"]],["歌舞",null,"gēwǔ","Canción y baile",["Espectáculo"]],["歌咏","歌詠","gēyǒng","Cantar",["Recitar"]],["革命",null,"gémìng","Revolucionar",["Transformar"]],["格",null,"gé","Cuadrado",["Personaje","Venir"]],["格格不入",null,"gégé-bùrù","Incompatible",["Extraño"]],["格局",null,"géjú","Estructura",["Disposición"]],["格式",null,"géshi","Formato",["Estilo"]],["隔阂","隔閡","géhé","Distancia",["Desconfianza"]],["隔离","隔離","gélí","Aislar",["Separar"]],["个案","個案","gè'àn","Caso particular",["Ejemplo"]],["个头儿","個頭兒","gètóur","Estatura",["Tamaño"]],["各奔前程",null,"gèbènqiánchéng","Seguir cada uno su camino",["Separarse"]],["各式各样","各式各樣","gèshì-gèyàng","Diversos",["Variados"]],["根基",null,"gēnjī","Base",["Fundamento"]],["根深蒂固",null,"gēnshēn-dìgù","Arraigado",["Profundo"]],["根源",null,"gēnyuán","Origen",["Causa"]],["根治",null,"gēnzhì","Curar",["Erradicar"]],["跟不上",null,"gēn bu shàng","No poder seguir",["Quedarse atrás"]],["跟上",null,"gēnshang","Seguir",["Mantenerse"]],["跟踪","跟蹤","gēnzōng","Seguir",["Rastrear"]],["更改",null,"gēnggǎi","Modificar",["Cambiar"]],["更衣室",null,"gēngyīshì","Vestuario",null],["耕地",null,"gēngdì","Campo",["Terreno"]],["耿直",null,"gěngzhí","Honesto",["Directo"]],["工地",null,"gōngdì","Obra",["Construcción"]],["工会","工會","gōnghuì","Sindicato",["Organización"]],["工科",null,"gōngkē","Ingeniería",["Técnica"]],["工商界",null,"gōngshāngjiè","Sector empresarial",["Comercio"]],["工序",null,"gōngxù","Proceso",["Etapa"]],["工整",null,"gōngzhěng","Ordenado",["Pulcro"]],["工作量",null,"gōngzuòliàng","Carga",["Tarea"]],["弓",null,"gōng","Arco",["Instrumento"]],["公安局",null,"gōng'ānjú","Comisaría",["Policía"]],["公车","公車","gōngchē","Transporte público",["Autobús"]],["公道",null,"gōngdao","Justo",["Imparcial"]],["公费","公費","gōngfèi","Gastos públicos",["Beca"]],["公共场所","公共場所","gōnggòng chǎngsuǒ","Lugar público",["Espacio"]],["公关","公關","gōngguān","Relaciones públicas",["Imagen"]],["公函",null,"gōnghán","Comunicación oficial",["Carta"]],["公积金","公積金","gōngjījīn","Fondo de ahorro",["Seguro"]],["公开信","公開信","gōngkāixìn","Carta abierta",["Manifiesto"]],["公款",null,"gōngkuǎn","Fondos públicos",["Dinero"]],["公立",null,"gōnglì","Público",["Estatal"]],["公墓",null,"gōngmù","Cementerio",["Panteón"]],["公仆","公僕","gōngpú","Servidor público",["Funcionario"]],["公顷","公頃","gōngqǐng","Hectárea",["Medida"]],["公然",null,"gōngrán","Abiertamente",["Descaradamente"]],["公示",null,"gōngshì","Publicar",["Anunciar"]],["公事",null,"gōngshì","Asunto oficial",["Trabajo"]],["公务","公務","gōngwù","Deber oficial",["Función"]],["公益",null,"gōngyì","Bien común",["Beneficencia"]],["公益性",null,"gōngyìxìng","Carácter benéfico",["Utilidad"]],["公用",null,"gōngyòng","Uso público",["Común"]],["公寓",null,"gōngyù","Apartamento",["Edificio"]],["公约","公約","gōngyuē","Tratado",["Acuerdo"]],["公证","公證","gōngzhèng","Notarial",["Legal"]],["公职","公職","gōngzhí","Cargo público",["Empleo"]],["功",null,"gōng","Logro",["Acto o servicio meritorio","Servicio"]],["功臣",null,"gōngchén","Héroe",["Benefactor"]],["功底",null,"gōngdǐ","Base",["Fundamentos"]],["功劳","功勞","gōngláo","Mérito",["Aporte"]],["功力",null,"gōnglì","Habilidad",["Talento"]],["功率",null,"gōnglǜ","Potencia",["Energía"]],["功效",null,"gōngxiào","Efecto",["Resultado"]],["攻",null,"gōng","Atacar",["Asaltar"]],["攻读","攻讀","gōngdú","Estudiar",["Especializarse"]],["攻关","攻關","gōngguān","Superar",["Resolver"]],["供",null,"gōng","Suministrar",["Ofrecer"]],["供不应求","供不應求","gōngbùyìngqiú","Demanda supera oferta",null],["供暖",null,"gōngnuǎn","Calefacción",null],["供求",null,"gōngqiú","Oferta y demanda",null],["宫殿","宮殿","gōngdiàn","Palacio",null],["宫廷","宮廷","gōngtíng","Corte imperial",null],["恭维","恭維","gōngwéi","Adular",null],["恭喜",null,"gōngxǐ","Felicitar",null],["拱",null,"gǒng","Arquear",null],["共鸣","共鳴","gòngmíng","Resonar",null],["共识","共識","gòngshí","Consenso",null],["共同体","共同體","gòngtóngtǐ","Comunidad",null],["共性",null,"gòngxìng","Característica común",null],["供奉",null,"gòngfèng","Rendir culto",null],["勾",null,"gōu","Trazar",null],["勾画","勾畫","gōuhuà","Bosquejar",null],["勾结","勾結","gōujié","Conspirar",null],["钩","鉤","gōu","Anzuelo",null],["钩子","鉤子","gōuzi","Gancho",null],["构思","構思","gòusī","Concebir",null],["构想","構想","gòuxiǎng","Concebir",null],["购","購","gòu","Comprar",null],["够呛","夠嗆","gòuqiàng","Agotador",null],["估算",null,"gūsuàn","Calcular",null],["沽名钓誉","沽名釣譽","gūmíng-diàoyù","Buscar fama",null],["孤单","孤單","gūdān","Solitario",null],["孤立",null,"gūlì","Aislado",null],["孤零零",null,"gūlínglíng","Solo",null],["孤陋寡闻","孤陋寡聞","gūlòu-guǎwén","Ignorante",null],["辜负","辜負","gūfù","Defraudar",null],["古董",null,"gǔdǒng","Antigüedad",null],["古怪",null,"gǔguài","Raro",null],["古迹","古蹟","gǔjì","Monumento histórico",null],["古今中外",null,"gǔjīn-zhōngwài","En todas épocas",null],["古朴","古樸","gǔpǔ","Simple",null],["古人",null,"gǔrén","Antepasado",null],["股份",null,"gǔfèn","Acción",null],["股民",null,"gǔmín","Accionista",null],["股市",null,"gǔshì","Bolsa",null],["骨干","骨幹","gǔgàn","Pilar",null],["骨气","骨氣","gǔqì","Dignidad",null],["骨折",null,"gǔzhé","Fractura",null],["鼓动","鼓動","gǔdòng","Instigar",null],["鼓舞",null,"gǔwǔ","Animar",null],["固然",null,"gùrán","Aunque",null],["固执","固執","gùzhi","Terco",null],["故",null,"gù","Razón",["Causa","Viejo"]],["顾不得","顧不得","gùbu dé","No poder",null],["顾不上","顧不上","gùbushàng","No tener",null],["顾及","顧及","gùjí","Considerar",null],["顾虑","顧慮","gùlǜ","Preocupación",null],["顾全大局","顧全大局","gùquán-dàjú","Priorizar",null],["雇",null,"gù","Contratar",null],["雇佣","雇傭","gùyōng","Emplear",null],["雇员","雇員","gùyuán","Empleado",null],["雇主",null,"gùzhǔ","Empleador",null],["瓜分",null,"guāfēn","Repartir",null],["瓜子",null,"guāzǐ","Semilla de calabaza",null],["刮风","颳風","guā fēng","Hacer viento",null],["寡妇","寡婦","guǎfu","Viuda",null],["挂钩","掛鉤","guàgōu","Conexión",null],["挂号","掛號","guàhào","Registrarse",null],["挂念","掛念","guàniàn","Preocuparse",null],["挂失","掛失","guàshī","Reportar",null],["乖",null,"guāi","Dócil",null],["乖巧",null,"guāiqiǎo","Encantador",null],["拐弯","拐彎","guǎiwān","Girar",null],["拐杖",null,"guǎizhàng","Bastón",null],["怪不得",null,"guàibude","No es de",null],["怪物",null,"guàiwu","Monstruo",null],["怪异","怪異","guàiyì","Extraño",null],["关掉","關掉","guāndiào","Apagar",null],["关节","關節","guānjié","Articulación",null],["关税","關稅","guānshuì","Arancel",null],["关头","關頭","guāntóu","Momento crucial",null],["关照","關照","guānzhào","Atender",null],["观测","觀測","guāncè","Observar",null],["观感","觀感","guāngǎn","Impresión",null],["观摩","觀摩","guānmó","Observar",null],["观赏","觀賞","guānshǎng","Disfrutar",null],["观望","觀望","guānwàng","Esperar",null],["官兵",null,"guānbīng","Oficiales",null],["官吏",null,"guānlì","Funcionario",null],["官僚",null,"guānliáo","Burócrata",null],["官僚主义","官僚主義","guānliáo zhǔyì","Burocracia",null],["官员","官員","guānyuán","Funcionario",null],["棺材",null,"guāncai","Ataúd",null],["管家",null,"guǎnjiā","Mayordomo",null],["管教",null,"guǎnjiào","Educar",null],["管理费","管理費","guǎnlǐfèi","Costo",null],["管辖","管轄","guǎnxiá","Administrar",null],["管用",null,"guǎnyòng","Útil",null],["管子",null,"guǎnzi","Tubo",null],["贯彻","貫徹","guànchè","Implementar",null],["贯穿","貫穿","guànchuān","Atravesar",null],["贯通","貫通","guàntōng","Comprender",null],["惯","慣","guàn","Acostumbrado a",["Malcriar (a un niño)","Solía hacerlo"]],["惯例","慣例","guànlì","Costumbre",null],["惯性","慣性","guànxìng","Inercia",null],["灌",null,"guàn","Llenar",null],["灌溉",null,"guàngài","Regar",null],["灌输","灌輸","guànshū","Inculcar",null],["罐",null,"guàn","Lata",null],["罐头","罐頭","guàntou","Lata",null],["光彩",null,"guāngcǎi","Esplendor",["Brillo","Honor"]],["光碟",null,"guāngdié","Disco",null],["光顾","光顧","guānggù","Visitar",null],["光滑",null,"guānghuá","Liso",null],["光环","光環","guānghuán","Aura",null],["光缆","光纜","guānglǎn","Cable",null],["光芒",null,"guāngmáng","Brillo",null],["光明磊落",null,"guāngmíng-lěiluò","Honorable",null],["光泽","光澤","guāngzé","Brillo",null],["广义","廣義","guǎngyì","Sentido amplio",null],["归根到底","歸根到底","guīgēn-dàodǐ","En esencia",null],["归还","歸還","guīhuán","Devolver",null],["归结","歸結","guījié","Resumir",null],["归来","歸來","guīlái","Volver",null],["归纳","歸納","guīnà","Concluir",null],["归属","歸屬","guīshǔ","Pertenecer",null],["归宿","歸宿","guīsù","Destino",null],["龟","龜","guī","Tortuga",null],["规格","規格","guīgé","Especificación",null],["规矩","規矩","guīju","Reglas",null],["闺女","閨女","guīnü","Hija",null],["瑰宝","瑰寶","guībǎo","Tesoro",["Joya"]],["轨迹","軌跡","guǐjì","Trayectoria",["Sendero"]],["柜台","櫃檯","guìtái","Mostrador",["Taquilla"]],["贵宾","貴賓","guìbīn","Invitado de honor",["Personalidad importante"]],["贵重","貴重","guìzhòng","Valioso",["Costoso"]],["贵族","貴族","guìzú","Nobleza",["Aristocracia"]],["桂花",null,"guìhuā","Flor de osmanthus",["Olíbano"]],["滚动","滾動","gǔndòng","Rodar",["Desplazarse"]],["棍",null,"gùn","Palo",["Garrote","Villano"]],["棍子",null,"gùnzi","Palo",["Vara"]],["国宝","國寶","guóbǎo","Tesoro nacional",["Patrimonio"]],["国防","國防","guófáng","Defensa nacional",["Seguridad"]],["国画","國畫","guóhuà","Pintura china",["Arte tradicional"]],["国徽","國徽","guóhuī","Escudo nacional",["Emblema"]],["国情","國情","guóqíng","Situación del país",["Contexto"]],["国土","國土","guótǔ","Territorio nacional",["Suelo"]],["国学","國學","guóxué","Estudios clásicos",["Sinología"]],["国有","國有","guóyǒu","Ser estatal",["Pertenecer al estado"]],["果断","果斷","guǒduàn","Decidido",["Contundente"]],["果园","果園","guǒyuán","Huerto",["Plantación"]],["果真",null,"guǒzhēn","Efectivamente",["Realmente"]],["裹",null,"guǒ","Envolver",["Cubrir"]],["过半","過半","guòbàn","Superar la mitad",["Mayoría"]],["过不去","過不去","guòbuqù","No poder pasar",["Tener dificultades"]],["过错","過錯","guòcuò","Error",["Falta"]],["过道","過道","guòdào","Pasillo",["Corredor"]],["过关","過關","guòguān","Pasar un control",["Superar"]],["过奖","過獎","guòjiǎng","Halagar",["Exagerar el elogio"]],["过节","過節","guòjié","Celebrar fiesta",["Rencor"]],["过境","過境","guòjìng","Tránsito",["Paso"]],["过滤","過濾","guòlǜ","Filtrar",["Colar"]],["过期","過期","guòqī","Vencer (fecha)",["Expirar","Fuera de plazo"]],["过日子","過日子","guò rìzi","Vivir",["Pasar el tiempo"]],["过剩","過剩","guòshèng","Excedente",["Sobrar"]],["过失","過失","guòshī","Descuido",["Impericia"]],["过头","過頭","guòtóu","Exagerar",["Pasarse"]],["过往","過往","guòwǎng","Pasar",["Transcurrir"]],["过意不去","過意不去","guòyìbùqù","Sentirse culpable",["Avergonzarse"]],["过瘾","過癮","guòyǐn","Satisfacer",["Disfrutar"]],["过硬","過硬","guòyìng","Sólido",["Competente"]],["过早","過早","guò zǎo","Prematuro",["Temprano"]],["海岸",null,"hǎi'àn","Costa",["Litoral"]],["海拔",null,"hǎibá","Altitud",["Elevación"]],["海滨","海濱","hǎibīn","Playa",["Litoral"]],["海盗","海盜","hǎidào","Pirata",["Bandido del mar"]],["海量",null,"hǎiliàng","Gran cantidad",["Muchísimo"]],["海绵","海綿","hǎimián","Esponja",["Material absorbente"]],["海面",null,"hǎimiàn","Superficie del mar",["Mar"]],["海内外","海內外","hǎi nèiwài","Dentro y fuera del país",["Internacional"]],["海滩","海灘","hǎitān","Playa",["Orilla"]],["海峡","海峽","hǎixiá","Estrecho",["Canal"]],["海啸","海嘯","hǎixiào","Tsunami",["Maremoto"]],["海域",null,"hǎiyù","Mar territorial",["Aguas"]],["海运","海運","hǎiyùn","Transporte marítimo",["Flete"]],["海藻",null,"hǎizǎo","Alga",["Alga marina"]],["骇人听闻","駭人聽聞","hàiréntīngwén","Escandaloso",["Impactante"]],["害虫","害蟲","hàichóng","Plaga",["Insecto dañino"]],["害臊",null,"hàisào","Avergonzarse",["Sonrojarse"]],["害羞",null,"hàixiū","Tímido",["Avergonzado"]],["酣畅","酣暢","hānchàng","Intenso",["Profundo"]],["酣睡",null,"hānshuì","Dormir profundamente",["Echar un sueño"]],["含糊",null,"hánhu","Vago",["Ambiguo"]],["含蓄",null,"hánxù","Reservado",["Sutil"]],["函授",null,"hánshòu","Educación por correspondencia",["A distancia"]],["涵盖","涵蓋","hángài","Incluir",["Abarcar"]],["涵义","涵義","hányì","Significado",["Sentido"]],["罕见","罕見","hǎnjiàn","Raro",["Excepcional"]],["汗水",null,"hànshuǐ","Sudor",["Transpiración"]],["旱",null,"hàn","Seco",["Árido"]],["旱灾","旱災","hànzāi","Sequía",["Calamidad"]],["捍卫","捍衛","hànwèi","Defender",["Proteger"]],["焊",null,"hàn","Soldar",["Unir"]],["行家",null,"hángjia","Experto",["Conocedor"]],["行列",null,"hángliè","Fila",["Columna"]],["行情",null,"hángqíng","Mercado",["Precios"]],["航海",null,"hánghǎi","Navegación",["Marinería"]],["航天",null,"hángtiān","Aeronáutica",["Espacial"]],["航天员","航天員","hángtiānyuán","Astronauta",["Cosmonauta"]],["航行",null,"hángxíng","Navegar",["Viajar"]],["航运","航運","hángyùn","Transporte marítimo",["Flota"]],["毫不",null,"háo bù","En absoluto",["Para nada"]],["毫不犹豫","毫不猶豫","háo bù yóuyù","Sin dudar",["Decididamente"]],["毫无","毫無","háo wú","Totalmente",["Completamente"]],["豪华","豪華","háohuá","Lujoso",["Elegante"]],["好比",null,"hǎobǐ","Como",["Por ejemplo"]],["好歹",null,"hǎodǎi","De cualquier manera",["Como sea"]],["好感",null,"hǎogǎn","Simpatía",["Buen sentimiento"]],["好坏","好壞","hǎohuài","Calidad",["Condición"]],["好家伙",null,"hǎojiāhuo","¡vaya!",["¡caray!"]],["好评","好評","hǎopíng","Crítica positiva",["Reseña"]],["好说","好說","hǎoshuō","Fácil de decir",["Negociable"]],["好笑",null,"hǎoxiào","Gracioso",["Cómico"]],["好心",null,"hǎoxīn","Bondad",["Buena intención"]],["好心人",null,"hǎoxīnrén","Persona amable",["Benévolo"]],["好意",null,"hǎoyì","Amabilidad",["Gesto amable"]],["好在",null,"hǎozài","Afortunadamente",["Por suerte"]],["号称","號稱","hàochēng","Llamado",["Supuestamente"]],["好客",null,"hàokè","Hospitalario",["Acogedor"]],["好奇心",null,"hàoqíxīn","Curiosidad",["Interés"]],["耗",null,"hào","Consumir",["Gastar"]],["耗费","耗費","hàofèi","Consumir",["Emplear"]],["耗时","耗時","hàoshí","Llevar tiempo",["Consumir tiempo"]],["浩劫",null,"hàojié","Catástrofe",["Desastre"]],["呵护","呵護","hēhù","Cuidar",["Proteger"]],["禾苗",null,"hémiáo","Plántula",["Brote"]],["合唱",null,"héchàng","Cantar en coro",["Coral"]],["合乎",null,"héhū","Cumplir",["Ajustarse"]],["合伙",null,"héhuǒ","Asociarse",["Unir negocios"]],["合计","合計","héjì","Calcular",["Sumar"]],["合情合理",null,"héqíng-hélǐ","Razonable",["Lógico"]],["合影",null,"héyǐng","Fotografiarse juntos",["Recuerdo"]],["合资","合資","hézī","Inversión conjunta",["Sociedad"]],["合作社",null,"hézuòshè","Cooperativa",["Asociación"]],["何必",null,"hébì","Para qué",["Con qué fin"]],["何处","何處","hé chù","Dónde",["Adónde"]],["何苦",null,"hékǔ","Por qué",["Para qué"]],["何况","何況","hékuàng","Por no hablar de",["Y además","Ni que decir"]],["何时","何時","hé shí","Cuándo",["Cuando"]],["和蔼","和藹","hé'ǎi","Amable",["Cordial"]],["和解",null,"héjiě","Reconciliarse",["Paz"]],["和睦",null,"hémù","Armonía",["Convivencia"]],["和平共处","和平共處","hépíng gòngchǔ","Coexistencia pacífica",["Entendimiento"]],["和气","和氣","héqi","Amistad",["Cortesía"]],["和尚",null,"héshang","Monje budista",["Sacerdote"]],["河流",null,"héliú","Río",["Arroyo"]],["河畔",null,"hépàn","Orilla",["Rivera"]],["荷花",null,"héhuā","Loto flor",null],["核",null,"hé","Núcleo",["Semilla"]],["核电站","核電站","hédiànzhàn","Central nuclear",null],["核对","核對","héduì","Verificar",["Comprobar"]],["核能",null,"hénéng","Energía nuclear",null],["核实","核實","héshí","Confirmar",["Verificar"]],["核桃",null,"hétao","Nuez",null],["核武器",null,"héwǔqì","Armas nucleares",null],["贺电","賀電","hèdiàn","Mensaje de felicitación",["Telegrama de congratulaciones"]],["贺信","賀信","hèxìn","Carta de felicitación",null],["喝彩",null,"hècǎi","Aplaudir",["Ovacionar"]],["赫然",null,"hèrán","Notablemente",["Sorprendentemente"]],["鹤立鸡群","鶴立雞群","hèlìjīqún","Destacar",["Sobresalir"]],["黑白",null,"hēibái","Blanco y negro",["Contraste"]],["黑客",null,"hēikè","Hacker",null],["黑马","黑馬","hēimǎ","Sorpresa",["Candidato inesperado"]],["黑手",null,"hēishǒu","Mano negra",["Instigador"]],["黑心",null,"hēixīn","Malvado",["Cruel"]],["嘿",null,"hēi","¡eh!",["¡hola!"]],["痕迹","痕跡","hénjì","Huella",["Rastro"]],["恨不得",null,"hènbude","Desearía poder",["Anhelar"]],["哼",null,"hēng","Gruñir",["Murmurar"]],["横七竖八","橫七豎八","héngqī-shùbā","Desordenado",["Caótico"]],["横向","橫向","héngxiàng","Horizontal",["Transversal"]],["轰","轟","hōng","Hacer ruido",["Explotar"]],["轰动","轟動","hōngdòng","Causar sensación",["Conmover"]],["轰炸","轟炸","hōngzhà","Bombardear",null],["哄",null,"hōng","Reír en masa",["Burlar"]],["哄堂大笑",null,"hōngtáng-dàxiào","Estallar en risa",["Carcajada general"]],["烘干","烘乾","hōnggān","Secar",["Desecar"]],["烘托",null,"hōngtuō","Resaltar",["Realzar"]],["弘扬","弘揚","hóngyáng","Promover",["Difundir"]],["红灯","紅燈","hóngdēng","Semáforo rojo",["Luz roja"]],["红火","紅火","hónghuo","Próspero",["Popular"]],["红扑扑","紅撲撲","hóngpūpū","Sonrojado",["Colorado"]],["红润","紅潤","hóngrùn","Rostro saludable",["Fresco"]],["红薯","紅薯","hóngshǔ","Batata",["Boniato"]],["红眼","紅眼","hóngyǎn","Tener envidia",["Celar"]],["宏观","宏觀","hóngguān","Macroscópico",["General"]],["宏伟","宏偉","hóngwěi","Imponente",["Majestuoso"]],["洪亮",null,"hóngliàng","Sonoro",["Resonante"]],["喉咙","喉嚨","hóulóng","Garganta",null],["吼",null,"hǒu","Rugir",["Bramar"]],["后备","後備","hòubèi","De reserva",["Suplente"]],["后备箱","後備箱","hòubèixiāng","Maletero",["Baúl"]],["后代","後代","hòudài","Descendencia",["Posteridad"]],["后盾","後盾","hòudùn","Apoyo respaldo",null],["后顾之忧","後顧之憂","hòugùzhīyōu","Preocupaciones futuras",["Temores"]],["后期","後期","hòuqī","Etapa final",["Última fase"]],["后勤","後勤","hòuqín","Logística",["Apoyo"]],["后人","後人","hòurén","Descendientes",["Sucesores"]],["后台","後台","hòutái","Bastidor",["Apoyo"]],["后退","後退","hòutuì","Retroceder",null],["后续","後續","hòuxù","Posterior",["Consecutivo"]],["后遗症","後遺症","hòuyízhèng","Secuela",["Consecuencia"]],["后裔","後裔","hòuyì","Descendiente",["Heredero"]],["后者","後者","hòuzhě","El segundo",["El último"]],["厚道",null,"hòudao","Bueno",["Generoso"]],["厚度",null,"hòudù","Grosor",["Espesor"]],["候选人","候選人","hòuxuǎnrén","Candidato",["Aspirante"]],["呼风唤雨","呼風喚雨","hūfēng-huànyǔ","Dominar",["Controlar"]],["呼唤","呼喚","hūhuàn","Llamar",["Invocar"]],["呼救",null,"hūjiù","Pedir auxilio",["Gritar socorro"]],["呼声","呼聲","hūshēng","Voz",["Clamor"]],["呼应","呼應","hūyìng","Responder",["Corresponder"]],["呼吁","呼籲","hūyù","Apelar",["Exhortar"]],["忽高忽低",null,"hūgāo-hūdī","Inestable",["Variable"]],["忽悠",null,"hūyou","Engañar",["Timar"]],["胡闹","胡鬧","húnào","Hacer travesuras",["Juntar"]],["胡说","胡說","húshuō","Hablar sin sentido",["Mentir"]],["胡思乱想","胡思亂想","húsī-luànxiǎng","Especular",["Divagar"]],["湖泊",null,"húpō","Lago",["Laguna"]],["糊",null,"hú","Pegar",["Untar"]],["糊涂","糊塗","hútu","Confundido",["Borroso"]],["互补","互補","hùbǔ","Complementarse",["Suplirse"]],["互访","互訪","hùfǎng","Visitar mutuamente",null],["互信",null,"hùxìn","Confianza mutua",null],["互助",null,"hùzhù","Ayudarse mutuamente",null],["护理","護理","hùlǐ","Cuidar",["Atender"]],["花瓣",null,"huābàn","Pétalo",null],["花卉",null,"huāhuì","Floraje",null],["花纹","花紋","huāwén","Dibujo",["Patrón"]],["花样","花樣","huāyàng","Diseño",["Variedad"]],["划算",null,"huásuàn","Que vale la pena",["Conveniente","Compensar"]],["华丽","華麗","huálì","Lujoso",["Fastuoso"]],["华侨","華僑","huáqiáo","Chino en el extranjero",null],["华裔","華裔","huáyì","Descendiente chino",null],["哗变","嘩變","huábiàn","Motín",["Rebelión"]],["哗然","譁然","huárán","Indignación",["Revuelo"]],["滑冰",null,"huábīng","Patinar",null],["滑稽",null,"huájī","Cómico",["Gracioso"]],["滑梯",null,"huátī","Tobogán",null],["滑雪",null,"huáxuě","Esquiar",null],["化肥",null,"huàféi","Fertilizante",null],["化身",null,"huàshēn","Encarnación",["Manifestación"]],["化纤","化纖","huàxiān","Fibra sintética",null],["化险为夷","化險為夷","huàxiǎnwéiyí","Superar",["Salvar"]],["化验","化驗","huàyàn","Analizar",["Examinar"]],["化妆","化妝","huàzhuāng","Maquillarse",null],["划时代","劃時代","huàshídài","Revolucionario",["Histórico"]],["画册","畫冊","huàcè","Álbum de arte",["Libro de dibujos"]],["画龙点睛","畫龍點睛","huàlóng-diǎnjīng","Dar el toque final",["Clave"]],["画蛇添足","畫蛇添足","huàshé-tiānzú","Superfluo",["Innecesario"]],["画展","畫展","huàzhǎn","Exposición de arte",null],["话费","話費","huàfèi","Costo de llamada",["Tarifa"]],["话筒","話筒","huàtǒng","Micrófono",["Megáfono"]],["话语","話語","huàyǔ","Palabra",["Discurso"]],["怀抱","懷抱","huáibào","Abrazar",["Tener"]],["怀旧","懷舊","huáijiù","Añorar el pasado",["Nostálgico"]],["怀里","懷裡","huái li","En el regazo",["En los brazos"]],["怀孕","懷孕","huáiyùn","Estar embarazada",null],["怀着","懷著","huáizhe","Llevar en el vientre",null],["槐树","槐樹","huáishù","Acacia",null],["坏事","壞事","huàishì","Mala acción",["Desastre"]],["欢呼","歡呼","huānhū","Vitorear",["Aclamar"]],["欢聚","歡聚","huānjù","Reunirse felizmente",null],["欢快","歡快","huānkuài","Alegre",["Jubiloso"]],["欢声笑语","歡聲笑語","huānshēng-xiàoyǔ","Alegría y risas",["Alegría","Risas"]],["还款","還款","huán kuǎn","Pagar una deuda",["Devolver el dinero"]],["还原","還原","huányuán","Restaurar",["Recuperar","Devolver"]],["环球","環球","huánqiú","Mundial",["Global","Internacional"]],["环绕","環繞","huánrào","Rodear",["Circundar","Envolver"]],["缓","緩","huǎn","Relentizar",["Ralentizar","Desacelerar"]],["缓和","緩和","huǎnhé","Calmar",["Suavizar","Aliviar"]],["缓缓","緩緩","huǎnhuǎn","Lentamente",["Despacio","Paulatinamente"]],["缓慢","緩慢","huǎnmàn","Lento",["Pausado","Tardo"]],["幻觉","幻覺","huànjué","Alucinación",["Delirio","Engaño"]],["幻影",null,"huànyǐng","Fantasma",["Espectro","Apariencia"]],["换成","換成","huànchéng","Cambiar por",["Sustituir por"]],["换取","換取","huànqǔ","Obtener a cambio",["Conseguir a cambio"]],["换位","換位","huànwèi","Cambiar de posición",["Intercambiar lugares"]],["换言之","換言之","huànyánzhī","En otras palabras",["Dicho de otro modo"]],["唤起","喚起","huànqǐ","Evocar",["Recordar","Despertar"]],["患",null,"huàn","Sufrir",["Padecer","Enfermar"]],["患病",null,"huànbìng","Tener una enfermedad",["Estar enfermo"]],["患有",null,"huànyǒu","Padecer",["Sufrir de"]],["焕发","煥發","huànfā","Irradiar",["Brillar","Emanar"]],["荒",null,"huāng","Abandonar",["Descuidar","Desatender"]],["荒诞","荒誕","huāngdàn","Absurdo",["Ridículo","Incongruente"]],["荒凉","荒涼","huāngliáng","Desolado",["Desértico","Yermo"]],["荒谬","荒謬","huāngmiù","Absurdo",["Ilógico","Ridículo"]],["慌乱","慌亂","huāngluàn","Nervioso",["Agitado","Precipitado"]],["慌张","慌張","huāngzhāng","Nervioso",["Apresurado","Ansioso"]],["皇宫","皇宮","huánggōng","Palacio imperial",["Castillo real"]],["皇后",null,"huánghòu","Emperatriz",["Reina"]],["皇上",null,"huángshang","Emperador",["Rey"]],["皇室",null,"huángshì","Familia imperial",["Casa real"]],["黄昏","黃昏","huánghūn","Atardecer",["Ocaso","Anochecer"]],["恍然大悟",null,"huǎngrán-dàwù","Darse cuenta de repente",["Entender de golpe"]],["晃",null,"huǎng","Temblar",["Oscilar","Moverse"]],["谎话","謊話","huǎnghuà","Mentira",["Falsedad","Fábula"]],["谎言","謊言","huǎngyán","Mentira",null],["晃荡","晃蕩","huàngdang","Balancearse",["Mecerse","Oscilar"]],["灰",null,"huī","Ceniza",["Gris"]],["灰尘","灰塵","huīchén","Polvo",["Polvareda"]],["灰心",null,"huīxīn","Desanimarse",["Perder el ánimo"]],["挥","揮","huī","Agitar",["Blandir","Mover"]],["辉煌","輝煌","huīhuáng","Brillante",["Espléndido","Magnífico"]],["回归","回歸","huíguī","Regresar",["Volver","Retornar"]],["回扣",null,"huíkòu","Comisión",["Soborno","Rebaja"]],["回馈","回饋","huíkuì","Recompensar",["Devolver","Gracias"]],["回落",null,"huíluò","Bajar",["Descender","Disminuir"]],["回升",null,"huíshēng","Subir",["Aumentar","Crecer"]],["回首",null,"huíshǒu","Mirar atrás",["Recordar","Retrospectivar"]],["回味",null,"huíwèi","Saborear",["Disfrutar","Recordar con nostalgia"]],["回想",null,"huíxiǎng","Recordar",["Evocar","Repasar"]],["回忆录","回憶錄","huíyìlù","Memorias",["Autobiografía"]],["悔恨",null,"huǐhèn","Arrepentirse",["Lamentar","Dolerse"]],["毁坏","毀壞","huǐhuài","Destruir",["Arruinar","Dañar"]],["毁灭","毀滅","huǐmiè","Destruir",["Aniquilar","Exterminar"]],["汇合","匯合","huìhé","Reunirse",["Confluir","Juntarse"]],["汇集","匯集","huìjí","Reunir",["Concentrar","Acumular"]],["汇聚","匯聚","huìjù","Reunir",["Confluir","Acumular"]],["会场","會場","huìchǎng","Sala",["Lugar de reunión"]],["会面","會面","huìmiàn","Encontrarse",["Reunión","Encuentro"]],["会晤","會晤","huìwù","Reunirse",["Entrevista","Encuentro formal"]],["会意","會意","huìyì","Entender",["Comprender","Dar a entender"]],["会诊","會診","huìzhěn","Diagnóstico conjunto",["Consulta médica"]],["绘声绘色","繪聲繪色","huìshēng-huìsè","Con detalle",["Vívidamente","Descriptivamente"]],["贿赂","賄賂","huìlù","Sobornar",["Cohechar","Corromper"]],["昏迷",null,"hūnmí","Desmayarse",["Inconsciencia","Letargo"]],["婚纱","婚紗","hūnshā","Vestido de novia",["Traje nupcial"]],["婚姻",null,"hūnyīn","Matrimonio",["Unión","Vinculo"]],["浑身","渾身","húnshēn","Todo el cuerpo",["Entero","Completo"]],["魂",null,"hún","Alma",["Espíritu","Ser"]],["混凝土",null,"hùnníngtǔ","Hormigón",["Concreto"]],["混淆",null,"hùnxiáo","Confundir",["Mezclar","Entremezclar"]],["混浊","混濁","hùnzhuó","Turbio",["Opaco","Limpido"]],["豁",null,"huō","Abrir",["Despejar","Abatir"]],["豁出去",null,"huōchuqu","Arriesgarse todo",["Jugársela todo"]],["活该","活該","huógāi","Merecer",["Tener lo que se merece"]],["活期",null,"huóqī","A la vista",["Inmediato","De demanda"]],["活儿","活兒","huór","Trabajo",["Faena","Ocupación"]],["火暴",null,"huǒbào","Popular",["En boga","Exitoso"]],["火锅","火鍋","huǒguō","Fondue",["Olla caliente"]],["火候",null,"huǒhou","Punto de cocción",["Momento adecuado"]],["火花",null,"huǒhuā","Chispa",["Centella","Destello"]],["火炬",null,"huǒjù","Antorcha",["Farol","Tejo"]],["火辣辣",null,"huǒlàlà","Picante",["Ardiente","Caliente"]],["火热","火熱","huǒrè","Ardiente",["Intenso","Apasionado"]],["火山",null,"huǒshān","Volcán",["Erupción"]],["火速",null,"huǒsù","Rápidamente",["Urgentemente","Velozmente"]],["火焰",null,"huǒyàn","Llama",["Fuego","Fogata"]],["火药","火藥","huǒyào","Pólvora",["Explosivo"]],["伙食",null,"huǒshí","Comida",["Ración","Alimentación"]],["或多或少",null,"huòduō-huòshǎo","Más o menos",["Aproximadamente","Relativamente"]],["货币","貨幣","huòbì","Moneda",["Dinero","Divisa"]],["货车","貨車","huòchē","Camión",["Camioneta","Vehículo de carga"]],["货物","貨物","huòwù","Mercadería",["Bienes","Carga"]],["货运","貨運","huòyùn","Transporte de mercancías",["Flete","Carga"]],["获胜","獲勝","huòshèng","Ganar",["Triunfar","Derrotar"]],["获悉","獲悉","huòxī","Enterarse",["Saber","Conocer"]],["祸害","禍害","huòhai","Desastre",["Calamidad","Plaga"]],["霍乱","霍亂","huòluàn","Cólera",["Epidemia","Tifus"]],["豁达","豁達","huòdá","Tolerante",["Comprensivo","Generoso"]],["几率","幾率","jīlǜ","Probabilidad",["Posibilidad","Chance"]],["讥笑","譏笑","jīxiào","Burlarse",["Ridiculizar","Mofarse"]],["饥饿","飢餓","jī'è","Hambre",["Sediento","Famélico"]],["机舱","機艙","jīcāng","Cabina",["Compartimiento","Sala"]],["机动","機動","jīdòng","Flexible",["Adaptable","Variable"]],["机灵","機靈","jīling","Listo",["Astuto","Despierto"]],["机密","機密","jīmì","Secreto",["Confidencial","Reservado"]],["机智","機智","jīzhì","Ingenioso",["Astuto","Avispado"]],["肌肤","肌膚","jīfū","Piel",["Cutis","Epidermis"]],["积","積","jī","De larga data",["Almacenar","Acumular"]],["积淀","積澱","jīdiàn","Acumular",["Sedimentar","Concentrar"]],["积蓄","積蓄","jīxù","Ahorrar",["Acumular","Juntar"]],["基本功",null,"jīběngōng","Fundamentos",["Bases","Elementos"]],["基层","基層","jīcéng","Base",["Nivel inferior","Fundamental"]],["基因",null,"jīyīn","Gen",["Herencia","Código"]],["基于","基於","jīyú","Basado en",["Según","En función de"]],["基准","基準","jīzhǔn","Estándar",["Patrón","Norma"]],["畸形",null,"jīxíng","Deformado",["Anormal","Desfigurado"]],["激发","激發","jīfā","Estimular",["Provocar","Despertar"]],["激光",null,"jīguāng","Láser",["Rayo luminoso"]],["激化",null,"jīhuà","Intensificar",["Agravar","Empeorar"]],["激活",null,"jīhuó","Activar",["Estimular","Despertar"]],["激励","激勵","jīlì","Motivar",["Animar","Impulsar"]],["激起",null,"jīqǐ","Provocar",["Despertar","Estimular"]],["激素",null,"jīsù","Hormona",["Bioquímico","Endocrino"]],["及",null,"jí","Y",["Arriba a","Alcanzar"]],["及其",null,"jí qí","Y su",["Así como","También"]],["及早",null,"jízǎo","Temprano / con tiempo",null],["吉普",null,"jípǔ","Jeep",null],["吉他",null,"jítā","Guitarra",null],["吉祥物",null,"jíxiángwù","Mascota",null],["级别","級別","jíbié","Nivel",null]],
'HSK8': [["极度","極度","jídù","Extremadamente",null],["极力","極力","jílì","Con todas las fuerzas",null],["极少数","極少數","jí shǎoshù","Minoría",null],["极为","極為","jíwéi","Extremadamente",null],["极限","極限","jíxiàn","Límite",null],["即",null,"jí","O sea",["Es decir","Inmediato"]],["即便",null,"jíbiàn","Incluso / aunque",null],["即可",null,"jíkě","Poder",null],["急剧","急劇","jíjù","Bruscamente",null],["急迫",null,"jípò","Urgente",null],["急性",null,"jíxìng","Agudo",null],["急需",null,"jíxū","Necesitar urgentemente",null],["急于","急於","jíyú","Tener prisa por",null],["急诊","急診","jízhěn","Urgencia / consulta de urgencia",null],["急转弯","急轉彎","jízhuǎnwān","Giro brusco",null],["棘手",null,"jíshǒu","Complicado",null],["集会","集會","jíhuì","Reunión / reunirse",null],["集结","集結","jíjié","Concentrarse",null],["集邮","集郵","jíyóu","Filatelia",null],["集装箱","集裝箱","jízhuāngxiāng","Contenedor",null],["集资","集資","jízī","Recaudar fondos",null],["嫉妒",null,"jídù","Envidiar",null],["挤压","擠壓","jǐyā","Apretar / comprimir",null],["脊梁",null,"jǐliáng","Espalda",null],["计","計","jì","Considerar como importante",["Calcular","Ardid"]],["计策","計策","jìcè","Estratagema",null],["计较","計較","jìjiào","Discutir / importar",null],["计时","計時","jìshí","Cronometrar",null],["记号","記號","jìhao","Señal",null],["记忆犹新","記憶猶新","jìyì-yóuxīn","Recordar como si fuera hoy",null],["纪录片","紀錄片","jìlùpiàn","Documental",null],["纪念碑","紀念碑","jìniànbēi","Monumento",null],["纪念馆","紀念館","jìniànguǎn","Museo conmemorativo",null],["纪念日","紀念日","jìniànrì","Fecha conmemorativa",null],["纪实","紀實","jìshí","Crónica / documentar",null],["技艺","技藝","jìyì","Habilidad",null],["忌",null,"jì","Evitar",null],["忌讳","忌諱","jìhuì","Tabú",null],["忌口",null,"jìkǒu","Dieta restrictiva",null],["剂","劑","jì","Dosis / preparado",null],["迹象","跡象","jìxiàng","Señal",null],["继","繼","jì","Para continuar con",["Tener éxito","Heredar"]],["继而","繼而","jì'ér","Luego / después",null],["继父","繼父","jìfù","Padrastro",null],["继母","繼母","jìmǔ","Madrastra",null],["祭",null,"jì","Ofrecer sacrificios",null],["祭奠",null,"jìdiàn","Honrar la memoria",null],["祭祀",null,"jìsì","Ritual",null],["寄托","寄託","jìtuō","Confiar / depositar",null],["寂静","寂靜","jìjìng","Silencioso",null],["寂寞",null,"jìmò","Solitario",null],["加紧","加緊","jiājǐn","Acelerar",null],["加剧","加劇","jiājù","Agravar",null],["加深",null,"jiāshēn","Profundizar",null],["加重",null,"jiāzhòng","Agravar",null],["佳节","佳節","jiājié","Festividad",null],["家伙","傢伙","jiāhuo","Tipo / cosa",null],["家家户户","家家戶戶","jiājiāhùhù","Cada hogar",null],["家教",null,"jiājiào","Educación familiar",null],["家境",null,"jiājìng","Situación económica",null],["家禽",null,"jiāqín","Aves de corral",null],["家用",null,"jiāyòng","Gastos domésticos",null],["家喻户晓","家喻戶曉","jiāyù-hùxiǎo","Conocido por todos",null],["家政",null,"jiāzhèng","Servicios domésticos",null],["家族",null,"jiāzú","Clan",null],["嘉年华","嘉年華","jiāniánhuá","Carnaval",null],["假定",null,"jiǎdìng","Suponer",null],["假冒",null,"jiǎmào","Falsificar",null],["假设","假設","jiǎshè","Suposición / suponer",null],["假使",null,"jiǎshǐ","Si",null],["假装","假裝","jiǎzhuāng","Fingir",null],["价位","價位","jiàwèi","Precio",null],["价值观","價值觀","jiàzhíguān","Valores",null],["驾","駕","jià","Conducir",null],["驾车","駕車","jià chē","Conducir un coche",null],["驾驭","駕馭","jiàyù","Dominar",null],["架势","架勢","jiàshi","Actitud / postura",null],["架子",null,"jiàzi","Orgullo / estante",null],["嫁",null,"jià","Casarse",null],["嫁妆","嫁妝","jiàzhuang","Dote",null],["尖端",null,"jiānduān","Puntero / avanzado",null],["尖锐","尖銳","jiānruì","Agudo / punzante",null],["奸诈","奸詐","jiānzhà","Astuto / malicioso",null],["歼灭","殲滅","jiānmiè","Aniquilar",null],["坚持不懈","堅持不懈","jiānchí-bùxiè","Perseverar",null],["坚韧","堅韌","jiānrèn","Tenaz",null],["坚实","堅實","jiānshí","Sólido",null],["坚守","堅守","jiānshǒu","Defender",null],["坚信","堅信","jiānxìn","Creer firmemente",null],["坚硬","堅硬","jiānyìng","Duro",null],["肩膀",null,"jiānbǎng","Hombro",null],["肩负","肩負","jiānfù","Llevar sobre los hombros",null],["艰巨","艱巨","jiānjù","Arduo",null],["艰苦奋斗","艱苦奮鬥","jiānkǔ-fèndòu","Luchar con perseverancia",null],["艰险","艱險","jiānxiǎn","Peligroso",null],["艰辛","艱辛","jiānxīn","Difícil",null],["监察","監察","jiānchá","Supervisar",null],["监管","監管","jiānguǎn","Supervisar",null],["监护","監護","jiānhù","Custodiar",null],["监控","監控","jiānkòng","Vigilar",null],["监视","監視","jiānshì","Vigilar",null],["监狱","監獄","jiānyù","Prisión",null],["兼",null,"jiān","Al mismo tiempo",null],["兼顾","兼顧","jiāngù","Equilibrar",null],["兼任",null,"jiānrèn","Desempeñar varios cargos",null],["兼容",null,"jiānróng","Compatible",null],["兼职","兼職","jiānzhí","Trabajo a tiempo parcial",null],["煎",null,"jiān","Freír",null],["拣","揀","jiǎn","Elegir",null],["检察","檢察","jiǎnchá","Investigar",null],["检讨","檢討","jiǎntǎo","Reflexionar",null],["减免","減免","jiǎnmiǎn","Reducir / eximir",null],["减弱","減弱","jiǎnruò","Debilitar",null],["减速","減速","jiǎnsù","Reducir la velocidad",null],["减压","減壓","jiǎnyā","Aliviar la presión",null],["简称","簡稱","jiǎnchēng","Abreviatura",null],["简短","簡短","jiǎnduǎn","Breve",null],["简化","簡化","jiǎnhuà","Simplificar",null],["简洁","簡潔","jiǎnjié","Conciso",null],["简陋","簡陋","jiǎnlòu","Rudimentario/precario",null],["简体字","簡體字","jiǎntǐzì","Caracteres simplificados",null],["简要","簡要","jiǎnyào","Conciso/breve",null],["简易","簡易","jiǎnyì","Fácil/simple",null],["见解","見解","jiànjiě","Opinión/punto de vista",null],["见钱眼开","見錢眼開","jiànqián-yǎnkāi","Codicioso/a",null],["见仁见智","見仁見智","jiànrén-jiànzhì","Subjetivo/a",null],["见识","見識","jiànshi","Experiencia/conocer",null],["见外","見外","jiànwài","Formal/distante",null],["见效","見效","jiànxiào","Surtir efecto",null],["见义勇为","見義勇為","jiànyì-yǒngwéi","Valiente/justiciero",null],["见证","見證","jiànzhèng","Atestiguar/testimonio",null],["间谍","間諜","jiàndié","Espía",null],["间断","間斷","jiànduàn","Interrumpir",null],["间隔","間隔","jiàngé","Espacio/intervalo",null],["间隙","間隙","jiànxì","Hueco/espacio",null],["建交",null,"jiànjiāo","Establecer relaciones diplomáticas",null],["建树","建樹","jiànshù","Contribución/logro",null],["建筑师","建築師","jiànzhùshī","Arquitecto",null],["建筑物","建築物","jiànzhùwù","Edificio",null],["贱","賤","jiàn","Barato/inferior",null],["健美",null,"jiànměi","Culturismo/tonificado",null],["健壮","健壯","jiànzhuàng","Robusto/fuerte",null],["溅","濺","jiàn","Salpicar",null],["鉴别","鑑別","jiànbié","Distinguir/diferenciar",null],["鉴赏","鑑賞","jiànshǎng","Apreciar",null],["鉴于","鑒於","jiànyú","Dada",null],["姜","薑","jiāng","Jengibre",null],["僵",null,"jiāng","Rígido/inmóvil",null],["僵化",null,"jiānghuà","Endurecer",null],["僵局",null,"jiāngjú","Punto muerto",null],["讲解","講解","jiǎngjiě","Explica",null],["讲述","講述","jiǎngshù","Contar/narrar",null],["讲学","講學","jiǎngxué","Dar conferencias",null],["奖杯","獎杯","jiǎngbēi","Copa trofeo",null],["奖牌","獎牌","jiǎngpái","Medalla",null],["奖品","獎品","jiǎngpǐn","Premio",null],["奖项","獎項","jiǎngxiàng","Categoría de premio",null],["降临","降臨","jiànglín","Llegar/ocurrir",null],["交叉",null,"jiāochā","Cruzar/intersecar",null],["交锋","交鋒","jiāofēng","Enfrentarse",null],["交付",null,"jiāofù","Entregar/entregar",null],["交集",null,"jiāojí","Intersección",null],["交接",null,"jiāojiē","Transferir",null],["交界",null,"jiāojiè","Frontera",null],["交纳","交納","jiāonà","Pagar",null],["交情",null,"jiāoqing","Amistad",null],["交涉",null,"jiāoshè","Negociar",null],["交谈","交談","jiāotán","Conversar",null],["交替",null,"jiāotì","Alternar",null],["交头接耳","交頭接耳","jiāotóu-jiē'ěr","Susurrar",null],["交响乐","交響樂","jiāoxiǎngyuè","Sinfonía",null],["郊外",null,"jiāowài","Afueras",null],["郊游","郊遊","jiāoyóu","Excursión",["Paseo"]],["浇","澆","jiāo","Regar",null],["娇惯","嬌慣","jiāoguàn","Consentir",null],["娇气","嬌氣","jiāoqì","Caprichoso/delicado",null],["胶囊","膠囊","jiāonáng","Cápsula",null],["胶片","膠片","jiāopiàn","Película/film",null],["焦",null,"jiāo","Nervioso/ansioso",null],["焦急",null,"jiāojí","Ansioso/inquieto",null],["焦距",null,"jiāojù","Distancia focal",null],["焦虑","焦慮","jiāolǜ","Ansiedad",null],["焦躁",null,"jiāozào","Impaciente",null],["礁石",null,"jiāoshí","Arrecife",null],["嚼",null,"jiáo","Masticar",null],["角落",null,"jiǎoluò","Rincón",null],["狡猾",null,"jiǎohuá","Astuto/maquiavélico",null],["绞","絞","jiǎo","Retorcer/estrangular",null],["矫正","矯正","jiǎozhèng","Corregir",null],["搅","攪","jiǎo","Revolver/mover",null],["搅拌","攪拌","jiǎobàn","Mezclar",null],["缴","繳","jiǎo","Pagar/entregar",null],["缴费","繳費","jiǎofèi","Pagar tarifas",null],["缴纳","繳納","jiǎonà","Pagar",null],["叫板",null,"jiàobǎn","Desafiar",null],["叫好",null,"jiàohǎo","Aplaudir",null],["轿车","轎車","jiàochē","Automóvil",null],["较劲","較勁","jiàojìn","Competir",null],["较量","較量","jiàoliàng","Competir",null],["教科书","教科書","jiàokēshū","Libro de texto",null],["教条","教條","jiàotiáo","Dogmático/rígido",null],["教养","教養","jiàoyǎng","Educación/cultura",null],["阶层","階層","jiēcéng","Estrato social",null],["阶级","階級","jiējí","Clase social",null],["阶梯","階梯","jiētī","Escalera",null],["皆",null,"jiē","Todos",["Cada uno (formal)"]],["接班",null,"jiēbān","Suceder",null],["接班人",null,"jiēbānrén","Sucesor",null],["接二连三","接二連三","jiē'èr-liánsān","Sucesivamente",null],["接轨","接軌","jiēguǐ","Integrar",null],["接济","接濟","jiējì","Ayudar",null],["接见","接見","jiējiàn","Recibir",null],["接力",null,"jiēlì","Relevo",null],["接纳","接納","jiēnà","Aceptar",null],["接手",null,"jiēshǒu","Asumir",null],["接送",null,"jiēsòng","Recoger/llevar",null],["接替",null,"jiētì","Reemplazar",null],["接听","接聽","jiētīng","Contestar",null],["接通",null,"jiētōng","Conectar",null],["揭发","揭發","jiēfā","Denunciar",null],["揭露",null,"jiēlù","Revelar",["Denunciar","Desenmascarar"]],["揭示",null,"jiēshì","Revelar",null],["揭晓","揭曉","jiēxiǎo","Revelar",null],["节俭","節儉","jiéjiǎn","Económico/a",null],["节气","節氣","jiéqì","Estación solar",null],["节水","節水","jiéshuǐ","Ahorrar agua",null],["节衣缩食","節衣縮食","jiéyī-suōshí","Ahorrar",null],["劫",null,"jié","Robar",null],["劫持",null,"jiéchí","Secuestrar",null],["洁净","潔淨","jiéjìng","Limpio/puro",null],["结冰","結冰","jiébīng","Congelar",null],["结晶","結晶","jiéjīng","Cristal",null],["结局","結局","jiéjú","Final",null],["结识","結識","jiéshí","Conocer",null],["结尾","結尾","jiéwěi","Final/concluir",null],["截",null,"jié","Cortar/interceptar",null],["截然不同",null,"jiérán-bùtóng","Completamente diferente",null],["竭尽全力","竭盡全力","jiéjìn-quánlì","Con todo el esfuerzo",null],["竭力",null,"jiélì","Con todas las fuerzas",null],["解答",null,"jiědá","Resolver",null],["解读","解讀","jiědú","Interpretar",null],["解雇","解僱","jiěgù","Despedir",null],["解救",null,"jiějiù","Rescatar",null],["解剖",null,"jiěpōu","Diseccionar",null],["解散",null,"jiěsàn","Disolver",["Separar"]],["解体","解體","jiětǐ","Desintegrar",["Descomponer"]],["解脱","解脫","jiětuō","Liberarse",["Liberar"]],["解围","解圍","jiěwéi","Romper el cerco",["Desbloquear"]],["解析",null,"jiěxī","Analizar",["Interpretar"]],["介入",null,"jièrù","Intervenir",["Meterse"]],["介意",null,"jièyì","Importar",["Preocupar"]],["介于","介於","jièyú","Estar entre",["Situarse"]],["戒备","戒備","jièbèi","Estar alerta",["Precaverse"]],["戒烟","戒煙","jiè yān","Dejar de fumar",["Dejar el tabaco"]],["戒指",null,"jièzhi","Anillo",["Sortija"]],["届时","屆時","jièshí","Para entonces",["En ese momento"]],["界定",null,"jièdìng","Definir",["Delimitar"]],["界限",null,"jièxiàn","Límite",["Frontera"]],["界线","界線","jièxiàn","Línea divisoria",["Límite"]],["借口",null,"jièkǒu","Excusa",["Pretexto"]],["借条","借條","jiètiáo","Recibo de préstamo",["Pagaré"]],["借用",null,"jièyòng","Tomar prestado",["Usar"]],["借助",null,"jièzhù","Valerse de",["Apoyarse"]],["金属","金屬","jīnshǔ","Metal",["Aleación"]],["金子",null,"jīnzi","Oro",["Metal precioso"]],["金字塔",null,"jīnzìtǎ","Pirámide",["Estructura triangular"]],["津津有味",null,"jīnjīn-yǒuwèi","Con gran apetito",["Disfrutando"]],["津贴","津貼","jīntiē","Subsidio",["Ayuda económica"]],["筋",null,"jīn","Tendón",["Fibra muscular"]],["禁不住",null,"jīnbuzhù","No poder evitar",["Resistirse"]],["仅次于","僅次於","jǐn cì yú","Ser inferior a",["Quedar segundo"]],["尽早","儘早","jǐnzǎo","Lo antes posible",["Cuanto antes"]],["紧凑","緊湊","jǐncòu","Compacto",["Denso"]],["紧接着","緊接著","jǐn jiēzhe","Inmediatamente después",["Seguidamente"]],["紧迫","緊迫","jǐnpò","Urgente",["Apremiante"]],["紧缺","緊缺","jǐnquē","Escasez",["Falta"]],["紧缩","緊縮","jǐnsuō","Reducir",["Contraer"]],["锦旗","錦旗","jǐnqí","Bandera",["Estandarte"]],["谨慎","謹慎","jǐnshèn","Prudente",["Cuidadoso"]],["尽情","盡情","jìnqíng","Sin restricciones",["A gusto"]],["尽头","盡頭","jìntóu","Final",["Extremo"]],["进场","進場","jìnchǎng","Entrar",["Acceder"]],["进程","進程","jìnchéng","Proceso",["Avance"]],["进出","進出","jìnchū","Entrar y salir",["Circular"]],["进出口","進出口","jìn-chūkǒu","Importación-exportación",["Comercio exterior"]],["进度","進度","jìndù","Ritmo",["Avance"]],["进而","進而","jìn'ér","Por lo tanto",["Así pues"]],["进修","進修","jìnxiū","Especializarse",["Perfeccionarse"]],["近年来","近年來","jìnnián lái","En los últimos años",["Últimamente"]],["劲头","勁頭","jìntóu","Energía",["Entusiasmo"]],["晋升","晉升","jìnshēng","Ascender",["Promocionar"]],["浸泡",null,"jìnpào","Remojar",["Empapar"]],["禁忌",null,"jìnjì","Tabú",["Prohibición"]],["禁区","禁區","jìnqū","Zona prohibida",["Área restringida"]],["茎","莖","jīng","Tallo",["Caña"]],["经","經","jīng","Abbr. para economía 经济",["Libro sagrado","Sagrada Escritura"]],["经度","經度","jīngdù","Longitud",["Coordenada"]],["经久不息","經久不息","jīngjiǔ-bùxī","Duradero incesante",["Perpetuo"]],["经贸","經貿","jīngmào","Economía y comercio",["Negocios"]],["经商","經商","jīngshāng","Comerciar",["Hacer negocios"]],["经受","經受","jīngshòu","Soportar",["Aguantar"]],["荆棘","荊棘","jīngjí","Espinas",["Obstáculos"]],["惊","驚","jīng","Asustar",["Sorprender"]],["惊诧","驚詫","jīngchà","Asombrado",["Sorprendido"]],["惊慌","驚慌","jīnghuāng","Pánico",["Miedo"]],["惊慌失措","驚慌失措","jīnghuāng-shīcuò","En pánico",["Aterrorizado"]],["惊奇","驚奇","jīngqí","Asombrado",["Extrañado"]],["惊叹","驚嘆","jīngtàn","Admirar",["Exclamar"]],["惊天动地","驚天動地","jīngtiān-dòngdì","Asombroso",["Impactante"]],["惊险","驚險","jīngxiǎn","Peligroso",["Emocionante"]],["惊心动魄","驚心動魄","jīngxīn-dòngpò","Conmovedor",["Impresionante"]],["惊醒","驚醒","jīngxǐng","Despertar sobresaltado",["Sobresaltarse"]],["惊讶","驚訝","jīngyà","Sorprendido",["Asombrado"]],["晶莹","晶瑩","jīngyíng","Brillante",["Transparente"]],["兢兢业业","兢兢業業","jīngjīngyèyè","Diligente",["Trabajador"]],["精打细算","精打細算","jīngdǎ-xìsuàn","Calcular detalladamente",["Ahorrar"]],["精华","精華","jīnghuá","Esencia",["Mejor parte"]],["精简","精簡","jīngjiǎn","Simplificar",["Reducir"]],["精练","精練","jīngliàn","Conciso",["Breve"]],["精妙",null,"jīngmiào","Sutil",["Delicado"]],["精明",null,"jīngmíng","Astuto",["Perspicaz"]],["精疲力竭",null,"jīngpí-lìjié","Exhausto",["Agotado"]],["精确","精確","jīngquè","Preciso",["Exacto"]],["精神病",null,"jīngshénbìng","Enfermedad mental",["Trastorno"]],["精髓",null,"jīngsuǐ","Esencia",["Núcleo"]],["精通",null,"jīngtōng","Dominar",["Especializarse"]],["精细","精細","jīngxì","Detallado",["Minucioso"]],["精心",null,"jīngxīn","Cuidadosamente",["Atentamente"]],["精益求精",null,"jīngyìqiújīng","Perfeccionarse constantemente",["Mejorar"]],["精英",null,"jīngyīng","Élite",["Mejor"]],["精致","精緻","jīngzhì","Exquisito",["Delicado"]],["颈部","頸部","jǐngbù","Cuello",["Nuca"]],["景观","景觀","jǐngguān","Paisaje",["Vista"]],["景区","景區","jǐngqū","Zona turística",["Atracción"]],["警车","警車","jǐngchē","Coche de policía",["Patrulla"]],["警官",null,"jǐngguān","Oficial de policía",["Agente"]],["警惕",null,"jǐngtì","Estar alerta",["Vigilar"]],["警钟","警鐘","jǐngzhōng","Campana de alarma",["Llamada"]],["净化","淨化","jìnghuà","Purificar",["Limpiar"]],["竞技","競技","jìngjì","Competir",["Rivalizar"]],["竞相","競相","jìngxiāng","Competir por",["Esforzarse por"]],["竞选","競選","jìngxuǎn","Postularse",["Presentarse"]],["竟",null,"jìng","Increíblemente",["Sorprendentemente"]],["竟敢",null,"jìnggǎn","Atreverse",["Osar"]],["敬",null,"jìng","Respetar",["Ofrecer con respeto"]],["敬爱","敬愛","jìng'ài","Respetar y amar",["Venerar"]],["敬而远之","敬而遠之","jìng'éryuǎnzhī","Mantener distancia",["Alejarse"]],["敬酒",null,"jìngjiǔ","Brindar",["Ofrecer un trago"]],["敬礼","敬禮","jìnglǐ","Saludar militarmente",["Rendir homenaje"]],["敬佩",null,"jìngpèi","Admirar",["Respetar"]],["敬请","敬請","jìngqǐng","Por favor",["Amablemente"]],["敬业","敬業","jìngyè","Dedicado al trabajo",["Profesional"]],["敬意",null,"jìngyì","Respeto",["Consideración"]],["敬重",null,"jìngzhòng","Venerar",["Estimar"]],["静止","靜止","jìngzhǐ","Estar quieto",["Parar"]],["境地",null,"jìngdì","Situación",["Estado"]],["境界",null,"jìngjiè","Nivel",["Esfera"]],["境内","境內","jìngnèi","Dentro del país",["Territorio nacional"]],["境外",null,"jìngwài","Fuera del país",["Extranjero"]],["境遇",null,"jìngyù","Situación",["Circunstancia"]],["窘迫",null,"jiǒngpò","Apurado",["Incómodo"]],["纠缠","糾纏","jiūchán","Enredar",["Molestar"]],["揪",null,"jiū","Agarrar",["Pellizcar"]],["久违","久違","jiǔwéi","Hace mucho tiempo",["Ausencia"]],["久仰",null,"jiǔyǎng","Conocer por fama",["Admirar"]],["酒精",null,"jiǔjīng","Alcohol",["Etanol"]],["酒楼","酒樓","jiǔlóu","Restaurante",["Local de comida"]],["救护车","救護車","jiùhùchē","Ambulancia",["Vehículo de emergencia"]],["救济","救濟","jiùjì","Asistir",["Ayudar a los necesitados"]],["救治",null,"jiùzhì","Curar",["Tratar médicamente"]],["就餐",null,"jiùcān","Comer",["Ingerir alimentos"]],["就地",null,"jiùdì","En el lugar",["En sitio"]],["就读","就讀","jiùdú","Estudiar",["Asistir a una escuela"]],["就近",null,"jiùjìn","Cerca",["En las cercanías"]],["就任",null,"jiùrèn","Asumir",["Tomar un cargo"]],["就医","就醫","jiùyī","Consultar",["Ir al médico"]],["就诊","就診","jiùzhěn","Ser atendido",["Recibir tratamiento médico"]],["就职","就職","jiùzhí","Tomar posesión",["Empezar un trabajo"]],["就座",null,"jiùzuò","Sentarse",["Tomar asiento"]],["舅舅",null,"jiùjiu","Tío materno",["Hermano de la madre"]],["拘留",null,"jūliú","Detener",["Encarcelar temporalmente"]],["拘束",null,"jūshù","Cohibido",["Tímido","Estricto"]],["居高临下","居高臨下","jūgāo-línxià","Dominar",["Tener ventaja"]],["居民楼","居民樓","jūmínlóu","Edificio de viviendas",["Bloque de apartamentos"]],["鞠躬",null,"jūgōng","Inclinarse",["Saludar con reverencia"]],["局部",null,"júbù","Parte",["Sección específica"]],["局势","局勢","júshì","Situación",["Estado de las cosas"]],["局限","侷限","júxiàn","Limitar",["Restringir"]],["菊花",null,"júhuā","Crisantemo",["Flor amarilla"]],["橘子",null,"júzi","Mandarina",["Cítrico pequeño"]],["沮丧","沮喪","jǔsàng","Deprimido",["Triste y sin ánimo"]],["举报","舉報","jǔbào","Denunciar",["Informar sobre algo"]],["举措","舉措","jǔcuò","Medida",["Acción tomada"]],["举例","舉例","jǔlì","Ejemplificar",["Dar un ejemplo"]],["举世闻名","舉世聞名","jǔshì-wénmíng","Famoso mundialmente",["Conocido en todo el mundo"]],["举世无双","舉世無雙","jǔshì-wúshuāng","Insuperable",["Sin igual"]],["举世瞩目","舉世矚目","jǔshì-zhǔmù","De interés mundial",["Bajo atención global"]],["举一反三","舉一反三","jǔyī-fǎnsān","Deducir",["Aprender por analogía"]],["举止","舉止","jǔzhǐ","Comportamiento",["Manera de actuar"]],["举重","舉重","jǔzhòng","Halterofilia",["Deporte de levantar pesos"]],["巨额","巨額","jù'é","Enorme",["Sumas grandes"]],["巨人",null,"jùrén","Gigante",["Persona muy alta"]],["巨头","巨頭","jùtóu","Magnate",["Líder poderoso"]],["巨星",null,"jùxīng","Superestrella",["Celebridad famosa"]],["巨型",null,"jùxíng","Gigante",["De gran tamaño"]],["剧烈","劇烈","jùliè","Intenso",["Muy fuerte"]],["剧目","劇目","jùmù","Obra",["Pieza teatral"]],["剧情","劇情","jùqíng","Trama",["Argumento de una obra"]],["剧团","劇團","jùtuán","Compañía teatral",["Grupo de actores"]],["剧院","劇院","jùyuàn","Teatro",["Edificio para obras"]],["剧组","劇組","jùzǔ","Equipo de rodaje",["Grupo de producción"]],["据此","據此","jùcǐ","Según esto",["Basado en esto"]],["据悉","據悉","jùxī","Se sabe",["Según se informa"]],["距",null,"jù","Estar a",["Distancia de"]],["锯","鋸","jù","Sierra",["Herramienta para cortar"]],["聚集",null,"jùjí","Reunir",["Juntarse en un lugar"]],["聚精会神","聚精會神","jùjīng-huìshén","Concentrado",["Con toda la atención"]],["捐献","捐獻","juānxiàn","Donar",["Contribuir con algo"]],["卷入","捲入","juǎnrù","Involucrarse",["Ser parte de algo"]],["卷子",null,"juànzi","Examen",["Prueba escrita"]],["决议","決議","juéyì","Resolución",["Decisión formal"]],["诀别","訣別","juébié","Despedirse definitivamente",["Separación final"]],["诀窍","訣竅","juéqiào","Secreto",["Método eficaz"]],["角逐",null,"juézhú","Competir",["Luchar por algo"]],["觉醒","覺醒","juéxǐng","Despertar",["Darse cuenta"]],["绝技","絕技","juéjì","Habilidad especial",["Talento excepcional"]],["绝缘","絕緣","juéyuán","Aislar",["Separar eléctricamente"]],["绝招","絕招","juézhāo","Recurso último",["Solución eficaz"]],["倔强","倔強","juéjiàng","Terco",["Obstinado"]],["崛起",null,"juéqǐ","Surgir",["Ascender rápidamente"]],["爵士",null,"juéshì","Jazz",["Género musical"]],["倔",null,"juè","Obstinado",["Terco"]],["军官","軍官","jūnguān","Militar",["Persona del ejército"]],["均衡",null,"jūnhéng","Equilibrado",["Balanceado"]],["均匀","均勻","jūnyún","Uniforme",["Mismo en todo"]],["君子",null,"jūnzǐ","Caballero (hombre noble)",null],["俊",null,"jùn","Guapo",["Atractivo"]],["俊俏",null,"jùnqiào","Hermoso",["Guapo y elegante"]],["骏马","駿馬","jùnmǎ","Caballo veloz",["Caballo noble"]],["竣工",null,"jùngōng","Finalizar",["Completar una construcción"]],["卡车","卡車","kǎchē","Camión",null],["卡片",null,"kǎpiàn","Tarjeta",["Pieza de cartón"]],["卡通",null,"kǎtōng","Dibujo animado",["Caricatura"]],["开办","開辦","kāibàn","Crear",["Iniciar un negocio"]],["开采","開採","kāicǎi","Extraer",["Sacar recursos de la tierra"]],["开场","開場","kāichǎng","Comenzar",["Iniciar un evento"]],["开场白","開場白","kāichǎngbái","Discurso inicial",["Presentación"]],["开除","開除","kāichú","Despedir",["Expulsar de un trabajo"]],["开动","開動","kāidòng","Arrancar",["Poner en movimiento"]],["开发区","開發區","kāifāqū","Zona de desarrollo",["Área industrial"]],["开发商","開發商","kāifāshāng","Promotor",["Constructor"]],["开工","開工","kāigōng","Comenzar",["Iniciar un proyecto"]],["开垦","開墾","kāikěn","Cultivar",null],["开口","開口","kāikǒu","Hablar",["Empezar a hablar"]],["开阔","開闊","kāikuò","Amplio",["Extenso","Abrir"]],["开朗","開朗","kāilǎng","Alegre",["Optimista"]],["开辟","開闢","kāipì","Crear",["Abrir algo nuevo"]],["开启","開啟","kāiqǐ","Abrir",["Iniciar"]],["开枪","開槍","kāi qiāng","Disparar",["Usar un arma"]],["开天辟地","開天闢地","kāitiān-pìdì","Creación",["Empezar algo desde cero"]],["开拓","開拓","kāituò","Explorar",["Descubrir nuevas cosas"]],["开销","開銷","kāixiāo","Gastos",["Expenses"]],["开张","開張","kāizhāng","Inaugurar",["Empezar un negocio"]],["开支","開支","kāizhī","Gastos",["Desembolsos"]],["凯歌","凱歌","kǎigē","Canción de victoria",["Himno triunfal"]],["楷模",null,"kǎimó","Modelo",["Ejemplo a seguir"]],["刊登",null,"kāndēng","Publicar",["Incluir en una publicación"]],["刊物",null,"kānwù","Publicación",["Revista o periódico"]],["看护","看護","kānhù","Cuidar",["Atender a alguien"]],["勘探",null,"kāntàn","Explorar",["Buscar recursos"]],["堪称","堪稱","kānchēng","Considerarse",["Ser llamado"]],["侃大山",null,"kǎn dàshān","Charlar",["Conversar informalmente"]],["砍",null,"kǎn","Cortar",["Tajar con un hacha"]],["看得出",null,"kàndechū","Se puede ver",["Se nota"]],["看热闹","看熱鬧","kàn rènao","Mirar curioso",["Observar algo sin participar"]],["看似",null,"kànsì","Parecer",["Dar la impresión de"]],["看台",null,"kàntái","Gradería",["Tribuna para espectadores"]],["看样子","看樣子","kàn yàngzi","Parece",["Por lo que se ve"]],["看中",null,"kànzhòng","Elegir",["Gustarle (algo tras pensarlo)"]],["看重",null,"kànzhòng","Valorar",["Apreciar"]],["慷慨",null,"kāngkǎi","Generoso",["Que da mucho"]],["扛",null,"káng","Cargar",["Levantar algo pesado"]],["抗衡",null,"kànghéng","Resistir",["Oponerse a"]],["抗拒",null,"kàngjù","Rechazar",["Oponerse a"]],["抗生素",null,"kàngshēngsù","Antibiótico",["Medicamento contra infecciones"]],["抗争","抗爭","kàngzhēng","Luchar",["Oponerse activamente"]],["考量",null,"kǎoliáng","Considerar",["Evaluar"]],["烤",null,"kǎo","Asar",["Cocinar al fuego"]],["靠拢","靠攏","kàolǒng","Acercarse",["Moverse hacia algo"]],["苛刻",null,"kēkè","Exigente",["Severo"]],["科幻",null,"kēhuàn","Ciencia ficción",["Fantacientífico"]],["科目",null,"kēmù","Asignatura",["Materia"]],["科普",null,"kēpǔ","Divulgación científica",["Ciencia popular"]],["磕",null,"kē","Golpear",["Chocar"]],["壳","殼","ké","Cáscara",["Concha"]],["咳嗽",null,"késou","Toser",["Carraspear"]],["可悲",null,"kěbēi","Lamentable",["Triste"]],["可不是",null,"kěbùshi","Realmente",["Es cierto"]],["可乘之机","可乘之機","kěchéngzhījī","Oportunidad",["Vacío"]],["可耻","可恥","kěchǐ","Vergonzoso",["Bochornoso"]],["可歌可泣",null,"kěgē-kěqì","Conmovedor",["Admirable"]],["可观","可觀","kěguān","Considerable",["Imponente"]],["可贵","可貴","kěguì","Valioso",["Precioso"]],["可口",null,"kěkǒu","Sabroso",["Delicioso"]],["可谓","可謂","kěwèi","Puede decirse",["Se puede llamar"]],["可恶","可惡","kěwù","Detestable",["Odioso"]],["可想而知",null,"kěxiǎng'érzhī","Se puede imaginar",["Obvio"]],["可笑",null,"kěxiào","Ridículo",["Absurdo"]],["可信",null,"kěxìn","Creíble",["Fiable"]],["可行",null,"kěxíng","Viable",["Factible"]],["可疑",null,"kěyí","Sospechoso",["Dudoso"]],["克隆",null,"kèlóng","Clonar",["Duplicar"]],["克制",null,"kèzhì","Contener",["Reprimir"]],["刻苦",null,"kèkǔ","Diligente",["Esforzado"]],["刻意",null,"kèyì","Deliberadamente",["Intencionadamente"]],["刻舟求剑","刻舟求劍","kèzhōu-qiújiàn","Rígido",["Inflexible"]],["客房",null,"kèfáng","Habitación",["Cuarto"]],["客机","客機","kèjī","Avión de línea",["Avión comercial"]],["客流",null,"kèliú","Flujo de pasajeros",["Afluencia"]],["客运","客運","kèyùn","Transporte de pasajeros",["Pasajeros"]],["恳求","懇求","kěnqiú","Suplicar",["Rogar"]],["啃",null,"kěn","Roer",["Mordisquear"]],["坑",null,"kēng","Hoyo",["Trampa"]],["空荡荡","空蕩蕩","kōngdàngdàng","Vacío",["Desocupado"]],["空难","空難","kōngnàn","Accidente aéreo",["Catástrofe aérea"]],["空前",null,"kōngqián","Sin precedentes",["Jamás visto"]],["空想",null,"kōngxiǎng","Soñar despierto",["Fantasear"]],["空虚","空虛","kōngxū","Vacío",["Hueco"]],["恐怖",null,"kǒngbù","Terrorífico",["Aterrador"]],["恐吓","恐嚇","kǒnghè","Amenazar",["Intimidar"]],["恐慌",null,"kǒnghuāng","Pánico",["Alarma"]],["恐惧","恐懼","kǒngjù","Miedo",["Temor"]],["恐龙","恐龍","kǒnglóng","Dinosaurio",["Saurio"]],["空白",null,"kòngbái","Espacio en blanco",["Vacío"]],["空地",null,"kòngdì","Terreno vacío",["Solar"]],["空隙",null,"kòngxì","Hueco",["间隙"]],["控告",null,"kònggào","Denunciar",["Acusar"]],["抠","摳","kōu","Escarbar",["Tacaño"]],["口碑",null,"kǒubēi","Reputación",["Fama"]],["口才",null,"kǒucái","Elocuencia",["Palabra"]],["口吃",null,"kǒuchī","Tartamudear",["Balbucear"]],["口感",null,"kǒugǎn","Textura",["Sabor"]],["口径","口徑","kǒujìng","Calibre",["Línea"]],["口令",null,"kǒulìng","Contraseña",["Grito"]],["口气","口氣","kǒuqì","Tono",["Aliento"]],["口腔",null,"kǒuqiāng","Boca",["Cavidad oral"]],["口哨",null,"kǒushào","Silbato",["Pito"]],["口水",null,"kǒushuǐ","Saliva",["Babas"]],["口头","口頭","kǒutóu","Oral",["Verbal"]],["口味",null,"kǒuwèi","Gusto",["Sabor"]],["口香糖",null,"kǒuxiāngtáng","Chicle",["Goma de mascar"]],["口音",null,"kǒuyīn","Acento",["Pronunciación"]],["口罩",null,"kǒuzhào","Mascarilla",["Cubrebocas"]],["口子",null,"kǒuzi","Apertura",["Herida"]],["扣除",null,"kòuchú","Deducir",["Descontar"]],["扣留",null,"kòuliú","Retener",["Detener"]],["扣人心弦",null,"kòurénxīnxián","Conmovedor",["Emocionante"]],["扣押",null,"kòuyā","Confiscar",["Embargar"]],["枯燥",null,"kūzào","Aburrido",["Monótono"]],["哭泣",null,"kūqì","Llorar",["Sollozar"]],["哭笑不得",null,"kūxiào-bùdé","Perplejo",["Desconcertado"]],["窟窿",null,"kūlong","Agujero",["Hueco"]],["苦力",null,"kǔlì","Trabajador manual",["Esclavo"]],["苦练","苦練","kǔ liàn","Entrenar duro",["Practicar incansablemente"]],["苦难","苦難","kǔnàn","Sufrimiento",["Dolor"]],["苦恼","苦惱","kǔnǎo","Angustiado",["Molesto"]],["苦笑",null,"kǔxiào","Sonrisa amarga",["Sonreír con amargura"]],["苦心",null,"kǔxīn","Esmero",["Afán"]],["酷似",null,"kùsì","Parecerse",["Ser idéntico"]],["夸","誇","kuā","Alabar",["Elogiar"]],["夸大","誇大","kuādà","Exagerar",["Magnificar"]],["夸奖","誇獎","kuājiǎng","Elogiar",["Felicitar"]],["夸夸其谈","誇誇其談","kuākuā-qítán","Charlatán",["Fanfarrón"]],["夸耀","誇耀","kuāyào","Vanagloriarse",["Presumir"]],["夸张","誇張","kuāzhāng","Exagerado",["Hipérbole"]],["垮",null,"kuǎ","Derrumbarse",["Colapsar"]],["挎",null,"kuà","Llevar al hombro",["Colgar"]],["跨国","跨國","kuàguó","Transnacional",["Internacional"]],["跨越",null,"kuàyuè","Cruzar",["Superar"]],["快捷",null,"kuàijié","Rápido",["Ágil"]],["宽敞","寬敞","kuānchang","Espacioso",["Amplio"]],["宽泛","寬泛","kuānfàn","Amplio",["General"]],["宽厚","寬厚","kuānhòu","Generoso",["Magnánimo"]],["宽容","寬容","kuānróng","Perdonar",["Indulgente"]],["宽恕","寬恕","kuānshù","Perdonar",["Absolver"]],["宽松","寬鬆","kuānsōng","Holgado",["Relajado"]],["款式",null,"kuǎnshì","Modelo",["Diseño"]],["款项","款項","kuǎnxiàng","Suma",["Fondo"]],["筐",null,"kuāng","Cesta",["Canasta"]],["狂欢","狂歡","kuánghuān","Festejar",["Celebrar"]],["狂欢节","狂歡節","kuánghuānjié","Carnaval",["Fiesta"]],["狂热","狂熱","kuángrè","Fanático",["Apasionado"]],["旷课","曠課","kuàngkè","Faltar a clase",["Ausentarse"]],["况且","況且","kuàngqiě","Además",["Por otra parte"]],["矿藏","礦藏","kuàngcáng","Yacimiento",["Minerales"]],["框",null,"kuàng","Marco",["Cuadro"]],["框架",null,"kuàngjià","Estructura",["Andamio"]],["亏本","虧本","kuīběn","Perder dinero",["Quebrar"]],["亏损","虧損","kuīsǔn","Perder",["Déficit"]],["昆虫","昆蟲","kūnchóng","Insecto",["Bicho"]],["捆",null,"kǔn","Atar",["Amarrar"]],["困惑",null,"kùnhuò","Confundido",["Perplejo"]],["困境",null,"kùnjìng","Apuro",["Dilema"]],["扩","擴","kuò","Expandir",["Ampliar"]],["扩建","擴建","kuòjiàn","Ampliar",["Extender"]],["扩散","擴散","kuòsàn","Extenderse",["Propagar"]],["扩张","擴張","kuòzhāng","Expandir",["Crecer"]],["括弧",null,"kuòhú","Paréntesis",["Corchete"]],["阔绰","闊綽","kuòchuò","Lujoso",["Opulento"]],["拉动","拉動","lādòng","Impulsar",["Tirar"]],["拉拢","拉攏","lālǒng","Ganar",["Atraer"]],["拉锁","拉鎖","lāsuǒ","Cremallera",["Cierre"]],["啦啦队","啦啦隊","lālāduì","Grupo de animación",["Banda de animación"]],["喇叭",null,"lǎba","Bocina",["Megáfono"]],["腊月","臘月","làyuè","Duodécimo lunar",["Último mes lunar"]],["蜡","蠟","là","Cera",["Parafina"]],["蜡烛","蠟燭","làzhú","Vela",["Cirio"]],["辣椒",null,"làjiāo","Chile",["Ají"]],["来宾","來賓","láibīn","Invitado",["Huésped"]],["来电","來電","láidiàn","Llamar",["Llamada"]],["来访","來訪","láifǎng","Visitar",["Acudir"]],["来回","來回","láihuí","Ida y vuelta",["Trayecto"]],["来历","來歷","láilì","Procedencia",["Origen"]],["来临","來臨","láilín","Llegar",["Aproximarse"]],["来龙去脉","來龍去脈","láilóng-qùmài","Historia completa",["Antecedentes"]],["来年","來年","láinián","Año siguiente",["Próximo año"]],["来源于","來源於","láiyuán yú","Provenir de",["Derivar de"]],["拦","攔","lán","Bloquear",["Impedir"]],["栏","欄","lán","Baranda",["Valla"]],["栏杆","欄杆","lángān","Baranda",["Barandal","Pasamanos"]],["蓝图","藍圖","lántú","Plan",["Diseño"]],["揽","攬","lǎn","Tomar",["Abarcar"]],["缆车","纜車","lǎnchē","Teleférico",["Cablebús"]],["懒得","懶得","lǎnde","Tener pereza",["No querer"]],["懒惰","懶惰","lǎnduò","Perezoso",["Holgazán"]],["滥用","濫用","lànyòng","Abusar",["Malutilizar"]],["狼",null,"láng","Lobo",["Loba"]],["狼狈","狼狽","lángbèi","Avergonzado",["Desdichado"]],["朗诵","朗誦","lǎngsòng","Recitar",["Declamar"]],["浪",null,"làng","Disipado",["Ola","Interruptor automático"]],["捞","撈","lāo","Pescar",["Sacar"]],["劳动力","勞動力","láodònglì","Mano de obra",["Fuerza laboral"]],["劳累","勞累","láolèi","Cansado",["Fatigado"]],["劳务","勞務","láowù","Servicios laborales",["Trabajo"]],["牢固",null,"láogù","Sólido",["Firme"]],["牢记","牢記","láojì","Memorizar",["Recordar"]],["牢牢",null,"láoláo","Firmemente",["Con seguridad"]],["唠叨","嘮叨","láodao","Charlar",["Reñir"]],["老伴儿","老伴兒","lǎobànr","Cónyuge",["Pareja"]],["老大",null,"lǎodà","Mayor",["Primogénito"]],["老汉","老漢","lǎohàn","Viejo",["Anciano"]],["老化",null,"lǎohuà","Envejecer",["Quedar desactualizado"]],["老人家",null,"lǎorenjia","Anciano",["Mayor"]],["老实说","老實說","lǎoshishuō","Francamente",["Sinceramente"]],["老远","老遠","lǎo yuǎn","Lejos de",["A distancia"]],["老字号","老字號","lǎozìhao","Establecimiento tradicional",["Marca tradicional"]],["姥姥",null,"lǎolao","Abuela materna",["Abuela"]],["姥爷","姥爺","lǎoye","Abuelo materno",["Abuelo"]],["涝","澇","lào","Inundado",["Anegado"]],["乐意","樂意","lèyì","Estar dispuesto",["Querer"]],["乐园","樂園","lèyuán","Parque de diversiones",["Paraíso"]],["勒",null,"lēi","Amarrar",["Apretar"]],["雷同",null,"léitóng","Idéntico",["Similar"]],["累积","累積","lěijī","Acumular",["Juntar"]],["累计","累計","lěijì","Sumar",["Totalizar"]],["类别","類別","lèibié","Categoría",["Tipo"]],["棱角","稜角","léngjiǎo","Esquina",["Ángulo"]],["冷淡",null,"lěngdàn","Frío",["Indiferente"]],["冷冻","冷凍","lěngdòng","Congelar",["Helar"]],["冷酷",null,"lěngkù","Cruel",["Despiadado"]],["冷酷无情","冷酷無情","lěngkù-wúqíng","Cruel sin piedad",["Despiadado"]],["冷落",null,"lěngluò","Descuidar",["Ignorar"]],["冷门","冷門","lěngmén","Tema poco común",["Nicho"]],["冷漠",null,"lěngmò","Indiferente",["Frío"]],["冷笑",null,"lěngxiào","Sonreír con desdén",["Esbozar"]],["冷战","冷戰","lěngzhàn","Guerra fría",["Enfrentamiento"]],["愣",null,"lèng","Sorprenderse",["Atónito"]],["离谱儿","離譜兒","lípǔr","Exagerado",["Ridículo"]],["离奇","離奇","líqí","Extraño",["Insólito"]],["离职","離職","lízhí","Renunciar",["Abandonar"]],["黎明",null,"límíng","Amanecer",["Alba"]],["礼服","禮服","lǐfú","Traje de gala",["Vestido formal"]],["礼品","禮品","lǐpǐn","Regalo",["Presente"]],["礼仪","禮儀","lǐyí","Protocolo",["Cortesía"]],["里程碑",null,"lǐchéngbēi","Hito",["Referencia"]],["理睬",null,"lǐcǎi","Hacer caso",["Prestar atención"]],["理会","理會","lǐhuì","Entender",["Notar"]],["理科",null,"lǐkē","Ciencias",["Física"]],["理念",null,"lǐniàn","Concepto",["Idea"]],["理事",null,"lǐshì","Administrador",["Directivo"]],["理所当然","理所當然","lǐsuǒdāngrán","Naturalmente",["Obviamente"]],["理性",null,"lǐxìng","Racional",["Sensato"]],["理直气壮","理直氣壯","lǐzhí-qìzhuàng","Con razón",["Con justificación"]],["力不从心","力不從心","lìbùcóngxīn","No poder hacer",["No poder lograr"]],["力度",null,"lìdù","Intensidad",["Fuerza"]],["力求",null,"lìqiú","Esforzarse por",["Intentar"]],["力所能及",null,"lìsuǒnéngjí","Dentro de lo posible",["Según las capacidades"]],["力争","力爭","lìzhēng","Luchar por",["Competir"]],["历程","歷程","lìchéng","Trayectoria",["Camino"]],["历届","歷屆","lìjiè","De todas las ediciones",["Anteriores"]],["历经","歷經","lìjīng","Pasar por",["Experimentar"]],["历来","歷來","lìlái","Siempre",["Históricamente"]],["历时","歷時","lìshí","Durar",["Tardar"]],["立方",null,"lìfāng","Metro cúbico",["Cubo"]],["立方米",null,"lìfāngmǐ","Metro cúbico",["M³"]],["立功",null,"lìgōng","Hacer méritos",["Distinguirse"]],["立交桥","立交橋","lìjiāoqiáo","Intercambiador",["Paso elevado"]],["立体","立體","lìtǐ","Tridimensional",["Volumétrico"]],["立足",null,"lìzú","Establecerse",["Asentarse"]],["励志","勵志","lìzhì","Inspirar",["Motivar"]],["利害",null,"lìhài","Ventaja y desventaja",["Consecuencias"]],["利率",null,"lìlǜ","Tasa de interés",["Porcentaje"]],["利索",null,"lìsuo","Ágil",["Rápido"]],["粒",null,"lì","Grano",["Partícula"]],["连滚带爬","連滾帶爬","liángǔn-dàipá","Rodando y gateando",["A toda prisa"]],["连绵","連綿","liánmián","Continuo",["Ininterrumpido"]],["连任","連任","liánrèn","Reelegirse",["Continuar"]],["连锁","連鎖","liánsuǒ","Cadena (de locales)",["Interconectado"]],["连锁店","連鎖店","liánsuǒdiàn","Tienda en cadena",null],["连夜","連夜","liányè","Durante la noche",["Esa misma noche"]],["怜惜","憐惜","liánxī","Compadecerse",["Tener lástima"]],["帘子","簾子","liánzi","Cortina",["Persiana"]],["莲子","蓮子","liánzǐ","Semilla de loto",["Pipa de loto"]],["联邦","聯邦","liánbāng","Federación",["Unión"]],["联欢","聯歡","liánhuān","Reunirse",["Celebrar"]],["联网","聯網","liánwǎng","Conectarse a internet",["En línea"]],["廉价","廉價","liánjià","Barato",["Económico"]],["廉洁","廉潔","liánjié","Honesto",["Íntegro"]],["廉正",null,"liánzhèng","Integro",["Honesto"]],["廉政",null,"liánzhèng","Integridad administrativa",["Anticorrupción"]],["脸颊","臉頰","liǎnjiá","Mejilla",["Carraspeo"]],["炼","煉","liàn","Refinar",["Templar"]],["恋恋不舍","戀戀不捨","liànliàn-bùshě","Con nostalgia",["Renuente"]],["良",null,"liáng","Bueno",["Excelente"]],["良心",null,"liángxīn","Conciencia",["Buen corazón"]],["良性",null,"liángxìng","Benigno",["Positivo"]],["凉爽","涼爽","liángshuǎng","Fresco",["Agradable"]],["两口子","兩口子","liǎngkǒuzi","Pareja de casados",["Esposos"]],["两栖","兩棲","liǎngqī","Anfibio",["Acuático","Terrestre"]],["亮点","亮點","liàngdiǎn","Punto brillante",["Atractivo","Destacado"]],["亮丽","亮麗","liànglì","Brillante y hermoso",["Vistoso","Luminoso"]],["亮相",null,"liàngxiàng","Presentarse",["Debutar","Aparecer"]],["谅解","諒解","liàngjiě","Perdonar y entender",["Disculpar","Comprometer"]],["辽阔","遼闊","liáokuò","Vasto y extenso",["Inmenso","Amplio"]],["疗法","療法","liáofǎ","Método de tratamiento",["Cura","Terapéutica"]],["疗效","療效","liáoxiào","Efecto terapéutico",["Resultado","Beneficio"]],["寥寥无几","寥寥無幾","liáoliáo-wújǐ","Muy pocos",["Escasos","Pocísimo"]],["潦草",null,"liáocǎo","Descuidado y rápido",["Desprolijo","Precipitado"]],["了结","了結","liǎojié","Terminar",["Concluir","Acabar"]],["了却","了卻","liǎoquè","Cumplir",["Satisfacer","Realizar"]],["料到",null,"liàodào","Prever",["Anticipar","Sospechar"]],["料理",null,"liàolǐ","Cocinar/administrar",["Preparar","Gestionar"]],["咧嘴",null,"liězuǐ","Sonreír con la boca abierta",["Sonreír","Reír"]],["列举","列舉","lièjǔ","Enumerar",["Mencionar","Numerar"]],["劣势","劣勢","lièshì","Desventaja",["Debilidad"]],["劣质","劣質","lièzhì","De mala calidad",["Deficiente","Pésimo"]],["烈士",null,"lièshì","Mártir",["Héroe","Caído"]],["猎犬","獵犬","lièquǎn","Perro de caza",["Sabueso","Lebrero"]],["猎人","獵人","lièrén","Cazador",null],["裂缝","裂縫","lièfèng","Grieta",["Hendidura","Abertura"]],["裂痕",null,"lièhén","Grieta",["Fisura","Ruptura"]],["拎",null,"līn","Llevar",["Cargar","Sostener"]],["邻国","鄰國","línguó","País vecino",["Colindante","Adyacente"]],["临","臨","lín","Enfrentar/estar cerca",["Frente a","Acerca"]],["临床","臨床","línchuáng","Clínico",["Práctico","Terapéutico"]],["临街","臨街","línjiē","Dar a la calle",["Frente a la calle"]],["临近","臨近","línjìn","Acercarse",["Aproximarse","Estar cerca"]],["淋",null,"lín","Mojar",["Empapar","Chorrear"]],["灵","靈","líng","Inteligente",["Ágil"]],["灵感","靈感","línggǎn","Inspiración",["Idea","Creatividad"]],["灵魂","靈魂","línghún","Alma",["Espíritu","Conciencia"]],["灵机一动","靈機一動","língjī-yīdòng","Tener una idea súbita",["Inspiración repentina"]],["灵敏","靈敏","língmǐn","Sensible",["Ágil","Preciso"]],["灵巧","靈巧","língqiǎo","Diestro",["Hábil","Agudo"]],["灵通","靈通","língtōng","Bien informado",["Actualizado","Bien conectado"]],["凌晨",null,"língchén","Madrugada",["Alba","Amanecer"]],["零花钱","零花錢","línghuāqián","Dinero de bolsillo",["Gastos personales"]],["零件",null,"língjiàn","Pieza",["Componente","Detalle"]],["零钱","零錢","língqián","Cambio",null],["零售",null,"língshòu","Vender al detalle",["Comercial","Vender"]],["领队","領隊","lǐngduì","Guiar",["Dirigir","Liderar"]],["领会","領會","lǐnghuì","Entender",["Comprender","Grasar"]],["领军","領軍","lǐngjūn","Liderar",["Dirigir","Encabezar"]],["领略","領略","lǐnglüè","Experimentar",["Sentir","Comprender"]],["领事","領事","lǐngshì","Cónsul",["Diplomático","Representante"]],["领事馆","領事館","lǐngshìguǎn","Consulado",["Embajada","Oficina diplomática"]],["领土","領土","lǐngtǔ","Territorio",["Dominio","País"]],["领悟","領悟","lǐngwù","Comprender",["Entender","Grasar"]],["领养","領養","lǐngyǎng","Adoptar",["Acoger","Fomentar"]],["领域","領域","lǐngyù","Campo",["Área","Dominio"]],["溜",null,"liū","Deslizarse",["Resbalar","Moverse"]],["溜达","溜達","liūda","Pasear",["Caminar"]],["浏览","瀏覽","liúlǎn","Navegar",["Revisar","Examinar"]],["浏览器","瀏覽器","liúlǎnqì","Navegador",["Programa","Explorador"]],["留恋","留戀","liúliàn","Añorar",["Extrañar","Anhelar"]],["留念",null,"liúniàn","Recordar",["Conmemorar","Suvenir"]],["留神",null,"liúshén","Tener cuidado",["Prestar atención","Cuidar"]],["留心",null,"liúxīn","Prestar atención",["Fijarse","Notar"]],["留意",null,"liúyì","Prestar atención",["Notar","Fijarse"]],["流畅","流暢","liúchàng","Fluido",["Natural","Elegante"]],["流程",null,"liúchéng","Proceso",["Secuencia","Pasos"]],["流浪",null,"liúlàng","Vagar",["Errar","Peregrinar"]],["流泪","流淚","liúlèi","Llorar",["Derramar lágrimas"]],["流量",null,"liúliàng","Flujo",["Volumen","Cantidad"]],["流露",null,"liúlù","Mostrar",["Expresar","Revelar"]],["流氓",null,"liúmáng","Rufián",["Gamberro","Vagabundo"]],["流入",null,"liúrù","Fluir hacia",["Entrar","Desembocar"]],["流失",null,"liúshī","Perderse",["Desaparecer","Desvanecerse"]],["流水",null,"liúshuǐ","Agua corriente",["Corriente","Flujo"]],["流淌",null,"liútǎng","Fluir",["Correr","Deslizarse"]],["流向",null,"liúxiàng","Dirección del flujo",["Corriente","Sentido"]],["流血",null,"liúxuè","Sangrar",["Perder sangre","Lesionar"]],["流域",null,"liúyù","Cuenca",["Valle","Área"]],["流转","流轉","liúzhuǎn","Circular",["Pasar","Girar"]],["柳树","柳樹","liǔshù","Sauce",["Álamo","Popo"]],["遛",null,"liù","Pasear",["Llevar a caminar"]],["龙舟","龍舟","lóngzhōu","Bote del dragón",["Embarcación","Tradicional"]],["聋","聾","lóng","Sordo",["Mudo","Sin oír"]],["聋人","聾人","lóngrén","Persona sorda",["Sordomudo","Sin oír"]],["笼子","籠子","lóngzi","Jaula",["Cesta","Estuche"]],["隆重",null,"lóngzhòng","Solemne",["Impresionante","Espectacular"]],["垄断","壟斷","lǒngduàn","Monopolizar",["Controlar","Dominar"]],["笼统","籠統","lǒngtǒng","General",["Vago","Impreciso"]],["笼罩","籠罩","lǒngzhào","Cubrir",["Envolver","Abarcar"]],["搂","摟","lǒu","Abrazar",["Estrechar","Agarrar"]],["露面",null,"lòumiàn","Aparecer",["Mostrarse","Presentarse"]],["芦花","蘆花","lúhuā","Pluma de junco",["Algodón","Junco"]],["炉灶","爐灶","lúzào","Cocina",["Fogón","Horno"]],["炉子","爐子","lúzi","Estufa",["Hornilla","Calentador"]],["卤味","滷味","lǔwèi","Comida en salmuera",["Condimentado","Encurtido"]],["鲁莽","魯莽","lǔmǎng","Imprudente",["Temerario","Atrevido"]],["录制","錄製","lùzhì","Grabar",["Registrar","Filmar"]],["鹿",null,"lù","Ciervo",["Gamo","Venado"]],["路程",null,"lùchéng","Distancia recorrida",["Trayecto","Distancia"]],["路灯","路燈","lùdēng","Farola",["Alumbrado","Poste"]],["路段",null,"lùduàn","Tramo de camino",["Sección","Parte"]],["路况","路況","lùkuàng","Estado de la carretera",["Condición","Estado"]],["路面",null,"lùmiàn","Superficie de la carretera",["Pavimento","Superficie"]],["路人",null,"lùrén","Transeúnte",["Desconocido","Pasante"]],["路途",null,"lùtú","Camino",["Trayecto","Viaje"]],["路子",null,"lùzi","Método",["Camino","Enfoque"]],["露天",null,"lùtiān","Al aire libre",["Descubierto","Abierto"]],["旅程",null,"lǚchéng","Viaje",["Excursión","Peregrinación"]],["旅途",null,"lǚtú","Viaje",["Trayecto","Recorrido"]],["铝","鋁","lǚ","Aluminio",["Metal","Ligero"]],["屡","屢","lǚ","Repetidamente",["Constantemente","Frecuentemente"]],["屡次","屢次","lǚcì","Repetidamente",["Muchas veces","Sucesivamente"]],["缕","縷","lǚ","Hebra",["Hilo","Rastro"]],["履行",null,"lǚxíng","Cumplir",["Realizar","Ejecutar"]],["率",null,"lǜ (chénggōnglǜ)","Tasa",["Proporción","Franqueza"]],["绿灯","綠燈","lǜdēng","Semáforo verde",["Autorización","Permiso"]],["绿地","綠地","lǜdì","Área verde",["Parque","Jardín"]],["孪生","孿生","luánshēng","Gemelo",["Similar","Igual"]],["卵",null,"luǎn","Huevo",["Óvulo","Gema"]],["乱七八糟","亂七八糟","luànqībāzāo","Desordenado",["Caótico","Desorganizado"]],["掠夺","掠奪","lüèduó","Saquear",["Robar","Exprimir"]],["略",null,"lüè","Omitir",["Simplificar","Resumir"]],["略微",null,"lüèwēi","Ligeramente",["Un poco","Leve"]],["抡","掄","lūn","Girar con fuerza",["Lanzar","Golpear"]],["伦理","倫理","lúnlǐ","Ética",["Moralidad"]],["轮换","輪換","lúnhuàn","Rotar",["Alternar"]],["轮廓","輪廓","lúnkuò","Contorno",["Silueta"]],["轮流","輪流","lúnliú","Turnarse",["Alternar"]],["轮胎","輪胎","lúntāi","Neumático",["Llanta"]],["论述","論述","lùnshù","Exponer",["Argumentar"]],["论坛","論壇","lùntán","Foro",["Debate"]],["论证","論證","lùnzhèng","Demostrar",["Fundamentar"]],["罗","羅","luó","Gasa",["Recoger","Cribar (罗)"]],["萝卜","蘿蔔","luóbo","Nabo",["Rábano"]],["螺丝","螺絲","luósī","Tornillo",["Rosca"]],["裸",null,"luǒ","Desnudar",["Desvestir"]],["裸露",null,"luǒlù","Quedar expuesto",["Al descubierto"]],["络绎不绝","絡繹不絕","luòyì-bùjué","Incesante",["Constante"]],["落差",null,"luòchā","Diferencia",["Desnivel"]],["落地",null,"luòdì","Aterrizar",["Tocar suelo"]],["落户","落戶","luòhù","Establecer residencia",["Radicarse"]],["落下",null,"luòxia","Dejar caer",["Omitir"]],["麻",null,"má","Sentirse entumecido",["(de materiales) áspero o basto","Picado"]],["麻痹","麻痺","mábì","Paralizar",["Entumecer"]],["麻将","麻將","májiàng","Mahjong",null],["麻辣",null,"málà","Picante",["Especiado"]],["麻木",null,"mámù","Entumecido",["Insensible"]],["麻醉",null,"mázuì","Anestesiar",["Adormecer"]],["马后炮","馬後炮","mǎhòupào","Jugada tardía",["事后聪明"]],["马虎","馬虎","mǎhu","Descuidado",["Negligente"]],["马力","馬力","mǎlì","Caballo de fuerza",["Potencia"]],["马桶","馬桶","mǎtǒng","Inodoro",["Retrete"]],["马戏","馬戲","mǎxì","Circo",["Espectáculo ecuestre"]],["码","碼","mǎ","Número",["Código","Ficha"]],["埋藏",null,"máicáng","Esconder",["Ocultar"]],["埋伏",null,"máifú","Acechar",["Emboscar"]],["埋没","埋沒","máimò","Enterrar",["Desaparecer"]],["买不起","買不起","mǎi bu qǐ","No poder comprar",["Resultar caro"]],["迈","邁","mài","Dar un paso",["Avanzar"]],["迈进","邁進","màijìn","Avanzar",["Progresar"]],["卖弄","賣弄","màinong","Presumir",["Ostentar"]],["脉搏","脈搏","màibó","Pulso",["Ritmo"]],["脉络","脈絡","màiluò","Trama",["Estructura"]],["埋怨",null,"mányuàn","Quejarse",["Reprochar"]],["蛮","蠻","mán","Brutal",["Salvaje"]],["瞒","瞞","mán","Ocultar",["Encubrir"]],["满怀","滿懷","mǎnhuái","Lleno de",["Cargado de"]],["蔓延",null,"mànyán","Extenderse",["Propagarse"]],["漫",null,"màn","Extenderse",["Vagar"]],["漫游","漫遊","mànyóu","Vagar",["Pasear"]],["慢慢来","慢慢來","mànmàn lái","Con calma",["Poco a poco"]],["慢性",null,"mànxìng","Crónico",["Gradual"]],["忙活",null,"mánghuo","Trabajar",["Afanarse"]],["忙碌",null,"mánglù","Ocupado",["Ajetreado"]],["忙乱","忙亂","mángluàn","Agitado",["Desordenado"]],["盲目",null,"mángmù","Ciego",["Irreflexivo"]],["茫然",null,"mángrán","Perplejo",["Confundido"]],["矛头","矛頭","máotóu","Punto de mira",["Objetivo"]],["茅台","茅臺","Máotái(jiǔ)","Moutai",["Licor baijiu de Guizhou"]],["茂密",null,"màomì","Denso",["Frondoso"]],["茂盛",null,"màoshèng","Exuberante",["Vigoroso"]],["冒充",null,"màochōng","Hacerse pasar por",["Suplantar"]],["冒犯",null,"màofàn","Ofender",["Injuriar"]],["冒昧",null,"màomèi","Atrevido",["Indiscreto"]],["冒险","冒險","màoxiǎn","Arriesgar",["Aventurarse"]],["没劲","沒勁","méijìn","Sin energía",["Aburrido"]],["没说的","沒說的","méishuōde","Innegable",["Indiscutible"]],["没完没了","沒完沒了","méiwán-méiliǎo","Interminable",["Sin fin"]],["没意思","沒意思","méi yìsi","Sin interés",["Aburrido"]],["没辙","沒轍","méizhé","Sin solución",["Sin remedio"]],["没准儿","沒準兒","méizhǔnr","Quizás",["Tal vez"]],["玫瑰",null,"méigui","Rosa (flor)",null],["枚",null,"méi","Unidad",["Pieza"]],["眉开眼笑","眉開眼笑","méikāi-yǎnxiào","Radiante",["Feliz"]],["眉毛",null,"méimao","Ceja",["Supercilio"]],["煤矿","煤礦","méikuàng","Mina de carbón",["Hulla"]],["煤炭",null,"méitàn","Carbón",["Hulla"]],["每当","每當","měidāng","Cada vez que",["Siempre que"]],["每逢",null,"měiféng","Cada vez que",["En cada ocasión"]],["美德",null,"měidé","Virtud",["Bondad"]],["美观","美觀","měiguān","Estético",["Atractivo"]],["美化",null,"měihuà","Embellecer",["Adornar"]],["美景",null,"měijǐng","Paisaje",["Panorama"]],["美满","美滿","měimǎn","Perfecto",["Dichoso"]],["美妙",null,"měimiào","Maravilloso",["Excelente"]],["美人",null,"měirén","Belleza",["Mujer hermosa"]],["美味",null,"měiwèi","Manjar",["Delicia"]],["美中不足",null,"měizhōng-bùzú","Defecto",["Inconveniente"]],["美滋滋",null,"měizīzī","Satisfecho",["Encantado"]],["魅力",null,"mèilì","Encanto",["Atractivo"]],["闷","悶","mēn","Aburrido",["Pesado"]],["门当户对","門當戶對","méndāng-hùduì","Pareja equilibrada",["Conveniente"]],["门槛","門檻","ménkǎn","Umbral",["Entrada"]],["门铃","門鈴","ménlíng","Timbre",["Campanilla"]],["门路","門路","ménlu","Contacto",["Vía"]],["萌发","萌發","méngfā","Surgir",["Brotar"]],["萌芽",null,"méngyá","Brote",["Principio"]],["盟友",null,"méngyǒu","Aliado",["Socio"]],["朦胧","朦朧","ménglóng","Borroso",["Vago"]],["猛烈",null,"měngliè","Violento",["Intenso"]],["猛然",null,"měngrán","De repente",["Súbitamente"]],["梦幻","夢幻","mènghuàn","Sueño",["Fantasía"]],["弥补","彌補","míbǔ","Compensar",["Remediar"]],["弥漫","彌漫","mímàn","Impregnar",["Llenar"]],["迷惑",null,"míhuò","Confundido",["Perplejo"]],["迷惑不解",null,"míhuò-bùjiě","Perplejo",["Atónito"]],["迷恋","迷戀","míliàn","Obsesionarse",["Encapricharse"]],["迷路",null,"mílù","Perderse",["Estar perdido"]],["迷失",null,"míshī","Extraviarse",["Desorientarse"]],["谜","謎","mí","Acertijo",["Enigma"]],["谜底","謎底","mídǐ","Solución",["Respuesta"]],["谜团","謎團","mítuán","Misterio",["Enigma"]],["谜语","謎語","míyǔ","Acertijo",["Adivinanza"]],["秘方","祕方","mìfāng","Receta secreta",["Fórmula"]],["秘诀","秘訣","mìjué","Secreto",["Truco"]],["密不可分",null,"mìbùkěfēn","Inseparable",["Íntimo"]],["密度",null,"mìdù","Densidad",["Concentración"]],["密封",null,"mìfēng","Sellar",["Herméticamente"]],["密集",null,"mìjí","Denso",["Compacto"]],["蜜",null,"mì","Miel",["Azúcar"]],["蜜蜂",null,"mìfēng","Abeja",["Panal"]],["蜜月",null,"mìyuè","Luna de miel",["Noviazgo"]],["棉花",null,"miánhuā","Algodón",["Fibra"]],["免",null,"miǎn","Eximir",["Omitir"]],["免不了",null,"miǎnbuliǎo","Inevitable",["Necesario"]],["免除",null,"miǎnchú","Eximir",["Liberar"]],["免疫",null,"miǎnyì","Inmunizar",["Resistir"]],["免职","免職","miǎnzhí","Destituir",["Remover"]],["勉强","勉強","miǎnqiǎng","Forzado",["Artificial"]],["缅怀","緬懷","miǎnhuái","Recordar/rememorar",null],["面部",null,"miànbù","Rostro",null],["面粉","麵粉","miànfěn","Harina",null],["面红耳赤","面紅耳赤","miànhóng-ěrchì","Ponerse rojo",null],["面面俱到",null,"miànmiàn-jùdào","Exhaustivo",null],["面目全非",null,"miànmù-quánfēi","Irreconocible",null],["苗",null,"miáo","Brote/planta",null],["苗条","苗條","miáotiao","Delgado/a",null],["苗头","苗頭","miáotou","Indicio",null],["描绘","描繪","miáohuì","Describir",null],["瞄准","瞄準","miáozhǔn","Apuntar",null],["渺小",null,"miǎoxiǎo","Insignificante",null],["庙","廟","miào","Templo",null],["庙会","廟會","miàohuì","Feria del templo",null],["灭绝","滅絕","mièjué","Extinguir",null],["灭亡","滅亡","mièwáng","Perecer",null],["民办","民辦","mínbàn","Privado",null],["民俗",null,"mínsú","Folclore",null],["民用",null,"mínyòng","Civil",null],["民众","民眾","mínzhòng","Pueblo",null],["敏捷",null,"mǐnjié","Ágil",null],["敏锐","敏銳","mǐnruì","Agudo",null],["名副其实","名副其實","míngfùqíshí","Merecido",null],["名贵","名貴","míngguì","Precioso",null],["名利",null,"mínglì","Fama y beneficio",null],["名气","名氣","míngqi","Renombre",null],["名声","名聲","míngshēng","Reputación",["Fama"]],["名言",null,"míngyán","Máxima",null],["名著",null,"míngzhù","Clásico",null],["明朗",null,"mínglǎng","Claro",null],["明媚",null,"míngmèi","Radiante",null],["明智",null,"míngzhì","Sensato",null],["铭记","銘記","míngjì","Grabar",null],["命名",null,"mìngmíng","Nombrar",null],["命题","命題","mìngtí","Formular",null],["摸索",null,"mōsuǒ","Buscar",null],["模拟","模擬","mónǐ","Imitar",null],["磨合",null,"móhé","Adaptar",null],["磨难","磨難","mónàn","Sufrimiento",null],["磨损","磨損","mósǔn","Desgastar",null],["蘑菇",null,"mógu","Champiñón",null],["魔鬼",null,"móguǐ","Demonio",null],["魔术","魔術","móshù","Magia",null],["抹",null,"mǒ","Untar",null],["末日",null,"mòrì","Fin del mundo",null],["没落","沒落","mòluò","Declinar",null],["陌生",null,"mòshēng","Ajeno",null],["莫非",null,"mòfēi","Acaso",null],["莫过于","莫過於","mòguòyú","Nada es más que",null],["莫名其妙",null,"mòmíngqímiào","Inexplicable",null],["漠然",null,"mòrán","/ indiferente",null],["墨",null,"mò","Tinta",null],["默读","默讀","mòdú","Leer en silencio",null],["默默无闻","默默無聞","mòmò-wúwén","/ anónimo",null],["默契",null,"mòqì","/ tácito",null],["谋害","謀害","móuhài","/ asesinar",null],["谋求","謀求","móuqiú","Buscar",null],["谋生","謀生","móushēng","Ganarse la vida",null],["牡丹",null,"mǔdan","Peonía",null],["亩","畝","mǔ","Mu",null],["木板",null,"mùbǎn","Tabla",null],["木材",null,"mùcái","Madera",null],["木匠",null,"mùjiàng","Carpintero",null],["木偶",null,"mù'ǒu","/ títere",null],["目不转睛","目不轉睛","mùbùzhuǎnjīng","Fijar la mirada",null],["目瞪口呆",null,"mùdèng-kǒudāi","/ pasmado",null],["目的地",null,"mùdìdì","Destino",null],["目睹",null,"mùdǔ","Presenciar",null],["目录","目錄","mùlù","Índice",null],["目中无人","目中無人","mùzhōng-wúrén","/ altivo",null],["沐浴露",null,"mùyùlù","Gel de ducha",null],["牧场","牧場","mùchǎng","Hacienda",null],["牧民",null,"mùmín","Pastor",null],["募捐",null,"mùjuān","Recaudar",null],["墓碑",null,"mùbēi","Lápida",null],["墓地",null,"mùdì","Cementerio",null],["幕",null,"mù","Cortina",null],["幕后","幕後","mùhòu","Tras bambalinas",null],["穆斯林",null,"mùsīlín","/ musulmán",null],["拿手",null,"náshǒu","Experto",null],["哪知道",null,"nǎ zhīdào","/ quién sabría",null],["呐喊","吶喊","nàhǎn","Gritar",null],["纳闷儿","納悶兒","nàmènr","/ extrañar",null],["纳入","納入","nàrù","Incluir",null],["纳税","納稅","nàshuì","Pagar impuestos",null],["纳税人","納稅人","nàshuìrén","Contribuyente",null],["乃",null,"nǎi","Por lo tanto",null],["乃至",null,"nǎizhì","E incluso",null],["耐",null,"nài","Resistir",null],["耐人寻味","耐人尋味","nàirénxúnwèi","/ profundo",null],["耐性",null,"nàixìng","/ paciencia",null],["南瓜",null,"nánguā","Calabaza",null],["难处","難處","nánchù","Dificultad",null],["难得一见","難得一見","nándé yī jiàn","/ raro",null],["难点","難點","nándiǎn","Dificultad",null],["难怪","難怪","nánguài","No es de extrañar",null],["难关","難關","nánguān","Obstáculo",null],["难堪","難堪","nánkān","/ vergonzoso",null],["难说","難說","nánshuō","Difícil decir",null],["难为情","難為情","nánwéiqíng","/ avergonzado",null],["难以想象","難以想象","nányǐ-xiǎngxiàng","/ inimaginable",null],["难以置信","難以置信","nányǐ-zhìxìn","/ increíble",null],["挠","撓","náo","Rascar",null],["恼羞成怒","惱羞成怒","nǎoxiū-chéngnù","/ enfadar",null],["脑海","腦海","nǎohǎi","Mente",null],["脑筋","腦筋","nǎojīn","Mente",null],["闹事","鬧事","nàoshì","/ causar problemas",null],["闹着玩儿","鬧著玩兒","nàozhewánr","/ en broma",null],["内存","內存","nèicún","Memoria",null],["内阁","內閣","nèigé","Gabinete",null],["内涵","內涵","nèihán","Contenido",null],["内行","內行","nèiháng","/ experto",null],["内幕","內幕","nèimù","/ escena",null],["内向","內向","nèixiàng","/ introvertido",null],["内需","內需","nèixū","/ demanda interna",null],["嫩",null,"nèn","/ tierno",null],["能耗",null,"nénghào","/ consumo energético",null],["能耐",null,"néngnai","/ capacidad",null],["能人",null,"néngrén","/ hábil",null],["能源",null,"néngyuán","/ energía",null],["尼龙","尼龍","nílóng","/ nailon",null],["泥潭",null,"nítán","Charco de lodo",["Lodazal"]],["泥土",null,"nítǔ","Tierra",["Terreno"]],["拟","擬","nǐ","Planear",["Proyectar"]],["拟定","擬定","nǐdìng","Redactar",["Elaborar"]],["逆",null,"nì","Oponerse",["Resistir"]],["匿名",null,"nìmíng","Anonimato",["Sin nombre"]],["年画","年畫","niánhuà","Cuadro de año nuevo",["Postal navideña"]],["年迈","年邁","niánmài","Anciano",["De avanzada edad"]],["年限",null,"niánxiàn","Plazo",["Tiempo límite"]],["年薪",null,"niánxīn","Salario anual",["Remuneración anual"]],["年夜饭","年夜飯","niányèfàn","Cena de año nuevo",["Festín de fin de año"]],["年终","年終","niánzhōng","Fin de año",["Cierre anual"]],["黏",null,"nián","Pegajoso",["Viscoso"]],["念念不忘",null,"niànniàn-bùwàng","Recordar siempre",["No olvidar jamás"]],["念书","念書","niànshū","Estudiar",["Leer"]],["念头","念頭","niàntou","Idea",["Pensamiento"]],["娘",null,"niáng","Señorita",["(coloc.) afeminado","Variante de 娘"]],["酿造","釀造","niàngzào","Fermentar",["Elaborar"]],["鸟巢","鳥巢","niǎocháo","Nido de pájaro",["Nidada"]],["尿",null,"niào","Orinar",["Orina"]],["捏",null,"niē","Apretar",["Amasar"]],["拧","擰","níng","Torcer",["Apretar"]],["凝固",null,"nínggù","Solidificar",["Endurecer"]],["凝聚",null,"níngjù","Concentrar",["Unir"]],["宁可","寧可","nìngkě","Preferir",["Antes que"]],["宁愿","寧願","nìngyuàn","Preferir",["Antes que"]],["扭曲",null,"niǔqū","Torcer",["Deformar"]],["扭头","扭頭","niǔtóu","Girar la cabeza",["Voltear"]],["扭转","扭轉","niǔzhuǎn","Cambiar",["Revertir"]],["纽带","紐帶","niǔdài","Vínculo",["Lazo"]],["纽扣","紐扣","niǔkòu","Botón",["Hebilla"]],["农场","農場","nóngchǎng","Granja",["Finca"]],["农历","農曆","nónglì","Calendario lunar",["Calendario agrícola"]],["农民工","農民工","nóngmíngōng","Trabajador rural",["Campesino urbano"]],["农作物","農作物","nóngzuòwù","Cultivo",["Producto agrícola"]],["浓厚","濃厚","nónghòu","Intenso",["Denso"]],["浓缩","濃縮","nóngsuō","Concentrar",["Condensar"]],["浓郁","濃郁","nóngyù","Fragante",["Intenso"]],["浓重","濃重","nóngzhòng","Pesado",["Fuerte"]],["弄虚作假","弄虛作假","nòngxū-zuòjiǎ","Hacer trampa",["Engañar"]],["奴隶","奴隸","núlì","Esclavo",["Siervo"]],["女婿",null,"nǚxu","Yerno",["Consorte"]],["暖烘烘",null,"nuǎnhōnghōng","Cálido",["Acogedor"]],["虐待",null,"nüèdài","Maltratar",["Abusar"]],["挪",null,"nuó","Mover",["Desplazar"]],["诺言","諾言","nuòyán","Promesa",["Palabra"]],["哦",null,"ò","Oh",["Ah"]],["殴打","毆打","ōudǎ","Golpear",["Agredir"]],["呕吐","嘔吐","ǒutù","Vomitar",["Náuseas"]],["趴",null,"pā","Acostarse boca abajo",["Tumbarse"]],["拍板",null,"pāibǎn","Decidir",["Autorizar"]],["拍卖","拍賣","pāimài","Subastar",["Rematar"]],["拍戏","拍戲","pāixì","Rodar una película",["Filmar"]],["排斥",null,"páichì","Excluir",["Rechazar"]],["排放",null,"páifàng","Emitir",["Descargar"]],["排练","排練","páiliàn","Ensayar",["Practicar"]],["徘徊",null,"páihuái","Vagar",["Deambular"]],["牌照",null,"páizhào","Placa",["Matrícula"]],["派别","派別","pàibié","Facción",["Bando"]],["派遣",null,"pàiqiǎn","Enviar",["Comisionar"]],["攀",null,"pān","Escalar",["Trepar"]],["攀升",null,"pānshēng","Ascender",["Aumentar"]],["盘算","盤算","pánsuan","Calcular",["Planear"]],["判处","判處","pànchǔ","Condenar",["Juzgar"]],["判定",null,"pàndìng","Determinar",["Decidir"]],["判决","判決","pànjué","Sentencia",["Fallar, sentenciar"]],["盼",null,"pàn","Esperar",["Anhelar"]],["叛逆",null,"pànnì","Rebelde",["Insubordinado"]],["庞大","龐大","pángdà","Enorme",["Masivo"]],["旁观","旁觀","pángguān","Observar",["Mirar"]],["抛","拋","pāo","Lanzar",["Echar"]],["抛开","拋開","pāokāi","Dejar de lado",["Ignorar"]],["抛弃","拋棄","pāoqì","Abandonar",["Desechar"]],["刨",null,"páo","Cavar",["Raer"]],["跑车","跑車","pǎochē","Coche deportivo",["Automóvel veloz"]],["跑道",null,"pǎodào","Pista de aterrizaje",["Carril"]],["跑龙套","跑龍套","pǎo lóngtào","Hacer de figurante",["Suplente"]],["泡沫",null,"pàomò","Espuma",["Burbuja"]],["胚胎",null,"pēitāi","Embrión",["Feto"]],["陪伴",null,"péibàn","Acompañar",null],["陪葬",null,"péizàng","Enterrar con",["Sepultar"]],["赔钱","賠錢","péiqián","Perder dinero",["Indemnizar"]],["佩服",null,"pèifú","Admirar",["Respetar"]],["配件",null,"pèijiàn","Accesorio",["Componente"]],["配偶",null,"pèi'ǒu","Cónyuge",["Pareja"]],["配送",null,"pèisòng","Entregar",["Distribuir"]],["配音",null,"pèiyīn","Doblar",["Subtitular"]],["喷泉","噴泉","pēnquán","Fuente",["Chorro"]],["抨击","抨擊","pēngjī","Criticar",["Atacar"]],["烹调","烹調","pēngtiáo","Cocinar",["Guisar"]],["蓬勃",null,"péngbó","Próspero",["Floreciente"]],["鹏程万里","鵬程萬里","péngchéng-wànlǐ","Gran futuro",["Éxito lejano"]],["膨胀","膨脹","péngzhàng","Expandirse",["Hinchar"]],["捧",null,"pěng","Sostener",["Levantar"]],["捧场","捧場","pěngchǎng","Apoyar",["Aplaudir"]],["碰钉子","碰釘子","pèng dīngzi","Encontrar obstáculos",["Toparse con muros"]],["碰巧",null,"pèngqiǎo","Por casualidad",["Afortunadamente"]],["碰上",null,"pèngshang","Encontrarse",["Tropezar"]],["碰撞",null,"pèngzhuàng","Chocar",["Colisionar"]],["批发","批發","pīfā","Vender al por mayor",["Mayorista"]],["批判",null,"pīpàn","Critica",null],["披露",null,"pīlù","Revelar",["Publicar"]],["劈",null,"pī","Cortar",["Dividir"]],["皮带","皮帶","pídài","Cinturón",["Correa"]],["疲惫","疲憊","píbèi","Agotado",["Cansado"]],["疲惫不堪","疲憊不堪","píbèi-bùkān","Exhausto",["Rendido"]],["疲倦",null,"píjuàn","Cansado",["Fatigado"]],["疲劳","疲勞","píláo","Cansancio",["Fatiga","Cansado"]],["脾",null,"pí","Bazo",["Temperamento"]],["匹配",null,"pǐpèi","Coincidir",["Emparejar"]],["媲美",null,"pìměi","Igualar",["Competir"]],["僻静","僻靜","pìjìng","Tranquilo",["Apartado"]],["譬如",null,"pìrú","Por ejemplo",["Tal como"]],["譬如说","譬如說","pìrú shuō","Por ejemplo",["Digamos"]],["片子",null,"piānzi","Película",["Radiografía","Disco"]],["偏差",null,"piānchā","Desviación",["Error"]],["偏方",null,"piānfāng","Remedio casero",["Fórmula tradicional"]],["偏见","偏見","piānjiàn","Prejuicio",["Parcialidad"]],["偏僻",null,"piānpì","Apartado",["Remoto"]],["偏偏",null,"piānpiān","Justo",["Precisamente"]],["偏向",null,"piānxiàng","Inclinarse",["Parcialidad"]],["偏远","偏遠","piānyuǎn","Lejano",["Distante"]],["篇幅",null,"piānfú","Extensión",["Longitud"]],["片段",null,"piànduàn","Fragmento",["Trozo"]],["骗人","騙人","piàn rén","Engañar",["Mentir"]],["漂",null,"piāo","Blanquear",["Elegante","A la deriva"]],["飘","飄","piāo","Flotar",["Flotar suavemente"]],["票房",null,"piàofáng","Taquilla",["Recaudación"]],["撇",null,"piě","Ignorar",["Dejar de lado"]],["拼搏",null,"pīnbó","Esforzarse",["Luchar"]],["拼命",null,"pīnmìng","Arriesgar la vida",["Esforzarse al máximo"]],["贫富","貧富","pín fù","Riqueza y pobreza",["Desigualdad económica"]],["贫穷","貧窮","pínqióng","Pobre",["Necesitado"]],["频率","頻率","pínlǜ","Frecuencia",["Repetición"]],["频频","頻頻","pínpín","Frecuentemente",["Constantemente"]],["品尝","品嘗","pǐncháng","Saborear",["Probar"]],["品德",null,"pǐndé","Moral",["Carácter"]],["品位",null,"pǐnwèi","Clase",["Elegancia"]],["品行",null,"pǐnxíng","Conducta",["Comportamiento"]],["聘",null,"pìn","Contratar",["Nombrar"]],["聘任",null,"pìnrèn","Contratar",["Emplear"]],["聘用",null,"pìnyòng","Contratar",null],["乒乓球",null,"pīngpāngqiú","Ping-pong",["Tenis de mesa"]],["平常心",null,"píngchángxīn","Calma",["Serenidad"]],["平淡",null,"píngdàn","平凡",["Insípido"]],["平和",null,"pínghé","Tranquilo",["Pacífico"]],["平价","平價","píngjià","Precio justo",["Regular"]],["平面",null,"píngmiàn","Plano",["Superficie"]],["平民",null,"píngmín","Ciudadano común",["Plebeyo"]],["平日",null,"píngrì","Día normal",["Habitual"]],["平息",null,"píngxī","Calmar",["Pacificar"]],["评定","評定","píngdìng","Evaluar",["Juzgar"]],["评论员","評論員","pínglùnyuán","Comentarista",["Analista"]],["评判","評判","píngpàn","Juzgar",["Evaluar"]],["评审","評審","píngshěn","Revisar",["Examinar"]],["评委","評委","píngwěi","Jurado",["Evaluador"]],["凭借","憑借","píngjiè","Mediante",["Basado en"]],["凭着","憑著","píngzhe","Gracias a",["Debido a"]],["凭证","憑證","píngzhèng","Comprobante",["Prueba"]],["瓶颈","瓶頸","píngjǐng","Cuello de botella",["Obstáculo"]],["萍水相逢",null,"píngshuǐ-xiāngféng","Encuentro casual",["Encuentro fortuito"]],["泼冷水","潑冷水","pō lěngshuǐ","Desanimar",["Quitar las ganas"]],["颇","頗","pō","Bastante",["Relativamente"]],["迫不及待",null,"pòbùjídài","Impaciente",["Con urgencia"]],["迫害",null,"pòhài","Perseguir",["Oprimir"]],["迫使",null,"pòshǐ","Obligar",["Forzar"]],["破案",null,"pò'àn","Resolver un caso",["Aclarar un crimen"]],["破除",null,"pòchú","Eliminar",["Destruir"]],["破解",null,"pòjiě","Descifrar",["Resolver"]],["破旧","破舊","pòjiù","Viejo y deteriorado",["Anticuado"]],["破裂",null,"pòliè","Romperse",["Estallar"]],["破灭","破滅","pòmiè","Desaparecer",["Frustrarse"]],["破碎",null,"pòsuì","Romperse",["Destrozarse"]],["魄力",null,"pòlì","Audacia",["Decisión"]],["扑克","撲克","pūkè","Naipes",["Juego de cartas"]],["扑面而来","撲面而來","pūmiàn-érlái","Llegar de frente",["Acercarse"]],["铺路","鋪路","pūlù","Pavimentar",["Allanar el camino"]],["菩萨","菩薩","púsà","Bodhisattva",["Deidad budista"]],["朴实","樸實","pǔshí","Simple",["Modesto"]],["朴素","樸素","pǔsù","Sencillo",["Austero"]],["普通人",null,"pǔtōng rén","Persona común",["Corriente"]],["谱","譜","pǔ","Escribir música",["Plan"]],["瀑布",null,"pùbù","Cascada",["Salto de agua"]],["七嘴八舌",null,"qīzuǐ-bāshé","Todos a la vez",["Confusión"]],["沏",null,"qī","Preparar té",["Infusionar"]],["凄凉","淒涼","qīliáng","Triste",["Desolado"]],["期盼",null,"qīpàn","Esperar",["Anhelar"]],["欺骗","欺騙","qīpiàn","Engañar",["Mentir"]],["欺诈","欺詐","qīzhà","Estafar",["Defraudar"]],["漆",null,"qī","Laca",["Pintura"]],["齐心协力","齊心協力","qíxīn-xiélì","Unidos",["Colaborar"]],["其后","其後","qíhòu","Después",["Luego"]],["其间","其間","qíjiān","Entre",["Durante"]],["奇花异草","奇花異草","qíhuā-yìcǎo","Flores raras",["Plantas exóticas"]],["奇迹","奇跡","qíjì","Milagro",["Prodigio"]],["奇特",null,"qítè","Extraño",["Peculiar"]],["歧视","歧視","qíshì","Discriminar",["Marginar"]],["祈祷","祈禱","qídǎo","Rezar",["Suplicar"]],["棋",null,"qí","Ajedrez",["Juego"]],["棋子",null,"qízǐ","Pieza de ajedrez",["Ficha"]],["旗袍",null,"qípáo","Qipao",["Vestido tradicional"]],["旗帜","旗幟","qízhì","Bandera",["Estandarte"]],["乞丐",null,"qǐgài","Mendigo",["Pordiosero"]],["乞求",null,"qǐqiú","Suplicar",["Rogar"]],["乞讨","乞討","qǐtǎo","Mendigar",["Pedir limosna"]],["岂有此理","豈有此理","qǐyǒucǐlǐ","Qué descortesía",["Impresentable"]],["启迪","啟迪","qǐdí","Inspirar",["Iluminar"]],["启蒙","啟蒙","qǐméng","Educar",["Iniciar"]],["启示","啟示","qǐshì","Revelación",["Enseñanza"]],["起步",null,"qǐbù","Comenzar",["Iniciar"]],["起草",null,"qǐcǎo","Redactar",["Elaborar"]],["起程",null,"qǐchéng","Partir",["Comenzar"]],["起初",null,"qǐchū","Principio",["Comienzo"]],["起伏",null,"qǐfú","Fluctuar",["Variar"]],["起劲","起勁","qǐjìn","Entusiasta",["Animado"]],["起跑线","起跑線","qǐpǎoxiàn","Línea de salida",["Punto de partida"]],["起源",null,"qǐyuán","Origen",["Proceder"]],["气愤","氣憤","qìfèn","Enojado",["Furioso"]],["气管","氣管","qìguǎn","Tráquea",["Conducto respiratorio"]],["气馁","氣餒","qìněi","Desanimado",["Abatido"]],["气派","氣派","qìpài","Impresionante",["Majestuoso"]],["气泡","氣泡","qìpào","Burbuja",["Ampolla"]],["气魄","氣魄","qìpò","Coraje",["Espíritu"]],["气势","氣勢","qìshì","Presencia",["Fuerza"]],["气味","氣味","qìwèi","Olor",["Fragancia"]],["气息","氣息","qìxī","Aliento",["Respiro"]],["气质","氣質","qìzhì","Temperamento",["Estilo"]],["迄今",null,"qìjīn","Hasta ahora",["Actualmente"]],["迄今为止","迄今為止","qìjīn-wéizhǐ","Hasta el momento",["Hasta la fecha"]],["契机","契機","qìjī","Oportunidad",["Punto de inflexión"]],["契约","契約","qìyuē","Contrato",["Convenio"]],["器材",null,"qìcái","Equipo",["Material"]],["器械",null,"qìxiè","Instrumento",["Aparato"]],["掐",null,"qiā","Apretar",["Oprimir"]],["卡子",null,"qiǎzi","Clip",["Sujetador"]],["洽谈","洽談","qiàtán","Negociar",["Conversar"]],["恰到好处","恰到好處","qiàdào-hǎochù","Justo",["Adecuado"]],["恰恰相反",null,"qiàqià xiāngfǎn","Todo lo contrario",["Inversamente"]],["恰巧",null,"qiàqiǎo","Casualmente",["Por suerte"]],["恰如其分",null,"qiàrú-qífèn","Apropiado",["Justo"]],["千变万化","千變萬化","qiānbiàn-wànhuà","Inmutable",["Cambiante"]],["千方百计","千方百計","qiānfāng-bǎijì","De todas formas",["Por todos los medios"]],["千家万户","千家萬戶","qiānjiā-wànhù","Cada hogar",["Todas las familias"]],["千军万马","千軍萬馬","qiānjūn-wànmǎ","Ejército numeroso",["Multitud"]],["千钧一发","千鈞一髮","qiānjūn-yīfà","Crítico",["Peligroso"]],["迁","遷","qiān","Mudar / trasladar",null],["迁就","遷就","qiānjiù","Ceder",null],["迁移","遷移","qiānyí","Mudar / emigrar",null],["牵扯","牽扯","qiānchě","Involucrar",null],["牵挂","牽掛","qiānguà","Preocuparse",null],["牵涉","牽涉","qiānshè","Implicar",null],["牵头","牽頭","qiāntóu","Encabezar",null],["牵制","牽制","qiānzhì","Restringir",null],["铅","鉛","qiān","Plomo",null],["谦逊","謙遜","qiānxùn","Humilde",null],["签署","簽署","qiānshǔ","Firmar",null],["前辈","前輩","qiánbèi","Antepasado",null],["前不久",null,"qiánbùjiǔ","Hace poco",null],["前赴后继","前赴後繼","qiánfù-hòujì","Seguir sin dudar",null],["前期",null,"qiánqī","Etapa inicial",null],["前任",null,"qiánrèn","Predecesor",null],["前所未有",null,"qiánsuǒwèiyǒu","Sin precedentes",null],["前台","前臺","qiántái","Recepción",null],["前无古人","前無古人","qiánwúgǔrén","Innovador",null],["前夕",null,"qiánxī","Víspera",null],["前线","前線","qiánxiàn","Frente",null],["前沿",null,"qiányán","Avanzado",null],["前仰后合","前仰後合","qiányǎng-hòuhé","Reírse a carcajadas",null],["前者",null,"qiánzhě","El primero",null],["虔诚","虔誠","qiánchéng","Devoto",null],["钱财","錢財","qiáncái","Dinero",null],["钳子","鉗子","qiánzi","Tenaza",null],["潜能","潛能","qiánnéng","Potencial",null],["潜水","潛水","qiánshuǐ","Bucear",null],["潜艇","潛艇","qiántǐng","Submarino",null],["潜移默化","潛移默化","qiányí-mòhuà","Influenciar sutilmente",null],["潜在","潛在","qiánzài","Latente",null],["谴责","譴責","qiǎnzé","Condenar",null],["欠缺",null,"qiànquē","Faltar",null],["欠条","欠條","qiàntiáo","Recibo de deuda",null],["歉意",null,"qiànyì","Disculpa",null],["呛","嗆","qiāng","Ahogarse",null],["枪毙","槍斃","qiāngbì","Fusilar",null],["腔",null,"qiāng","Tono",null],["强加","強加","qiángjiā","Imponer",null],["强劲","強勁","qiángjìng","Potente",null],["强项","強項","qiángxiàng","Fortaleza",null],["强行","強行","qiángxíng","Por la fuerza",null],["强硬","強硬","qiángyìng","Inflexible",null],["强占","強佔","qiángzhàn","Ocupar",null],["强制","強制","qiángzhì","Obligar",null],["抢夺","搶奪","qiǎngduó","Arrebatar",null],["抢劫","搶劫","qiǎngjié","Robar",null],["抢眼","搶眼","qiǎngyǎn","Llamativo",null],["敲边鼓","敲邊鼓","qiāo biāngǔ","Apoyar discretamente",null],["敲诈","敲詐","qiāozhà","Extorsionar",null],["乔装","喬裝","qiáozhuāng","Disfrazar",null],["瞧不起",null,"qiáobuqǐ","Despreciar",null],["巧合",null,"qiǎohé","Casual",null],["窍门","竅門","qiàomén","Consejo",null],["翘","翹","qiào","Levantarse",null],["撬",null,"qiào","Forzar",null],["切除",null,"qiēchú","Extirpar",null],["切断","切斷","qiēduàn","Cortar",null],["切割",null,"qiēgē","Dividir",null],["且",null,"qiě","Además",["Siendo por el momento","Y"]],["切身",null,"qièshēn","Personal",null],["窃取","竊取","qièqǔ","Robar",null],["钦佩","欽佩","qīnpèi","Admirar",null],["侵害",null,"qīnhài","Dañar",null],["侵略",null,"qīnlüè","Invadir",null],["侵权","侵權","qīnquán","Violar derechos",null],["侵占","侵佔","qīnzhàn","Ocupar",null],["亲和力","親和力","qīnhélì","Carisma",null],["亲近","親近","qīnjìn","Cercano",null],["亲朋好友","親朋好友","qīnpéng-hǎoyǒu","Amigos y familiares",null],["亲戚","親戚","qīnqi","Pariente",null],["亲情","親情","qīnqíng","Vínculo familiar",null],["亲热","親熱","qīnrè","Cariñoso",null],["亲身","親身","qīnshēn","Personal",null],["亲生","親生","qīnshēng","Biológico",null],["亲手","親手","qīnshǒu","Personalmente",null],["亲友","親友","qīnyǒu","Seres queridos",null],["勤工俭学","勤工儉學","qíngōng-jiǎnxué","Trabajar y estudiar",null],["勤快",null,"qínkuai","Trabajador",null],["勤劳","勤勞","qínláo","Laborioso",null],["寝室","寢室","qǐnshì","Dormitorio",null],["青春期",null,"qīngchūnqī","Adolescencia",null],["青蛙",null,"qīngwā","Rana",null],["轻而易举","輕而易舉","qīng'éryìjǔ","Fácil",null],["轻蔑","輕蔑","qīngmiè","Despreciar",null],["轻微","輕微","qīngwēi","Leve",null],["轻型","輕型","qīngxíng","Ligero",null],["倾家荡产","傾家蕩產","qīngjiā-dàngchǎn","Arruinarse",null],["倾诉","傾訴","qīngsù","Confesar",null],["倾听","傾聽","qīngtīng","Escuchar",null],["倾销","傾銷","qīngxiāo","Vender barato",null],["倾斜","傾斜","qīngxié","Inclinar",null],["清除",null,"qīngchú","Eliminar",null],["清脆",null,"qīngcuì","Sonoro",null],["清单","清單","qīngdān","Lista",null],["清淡",null,"qīngdàn","Suave",null],["清静","清靜","qīngjìng","Tranquilo",null],["清凉","清涼","qīngliáng","Fresco",null],["清明",null,"qīngmíng","Claro",null],["清晰",null,"qīngxī","Nítido",null],["清新",null,"qīngxīn","Fresco",null],["清真寺",null,"qīngzhēnsì","Mezquita",null],["情",null,"qíng","Emoción",["Situación","Pasión"]],["情报","情報","qíngbào","Información",null],["情不自禁",null,"qíngbùzìjīn","No poder contenerse",null],["情调","情調","qíngdiào","Ambiente",null],["情怀","情懷","qínghuái","Sentimiento",null],["情结","情結","qíngjié","Complejo",null],["情侣","情侶","qínglǚ","Pareja",null],["情人",null,"qíngrén","Amante",null],["情谊","情誼","qíngyì","Amistad",null],["情愿","情願","qíngyuàn","Preferir",null],["请柬","請柬","qǐngjiǎn","Invitación",null],["请帖","請帖","qǐngtiě","Invitación",null],["庆典","慶典","qìngdiǎn","Celebración",null],["庆贺","慶賀","qìnghè","Celebrar",null],["庆幸","慶幸","qìngxìng","Alegrarse",null],["丘陵",null,"qiūlíng","Colina",null],["囚犯",null,"qiúfàn","Prisionero",null],["求婚",null,"qiúhūn","Pedir matrimonio",null],["求救",null,"qiújiù","Pedir ayuda",null],["求学","求學","qiúxué","Estudiar",["Buscar conocimiento"]],["求医","求醫","qiúyī","Buscar médico",["Acudir al doctor"]],["求证","求證","qiúzhèng","Verificar",["Confirmar"]],["求助",null,"qiúzhù","Pedir ayuda",["Solicitar auxilio"]],["曲线","曲線","qūxiàn","Curva",["Línea curva"]],["曲折",null,"qūzhé","Tortuoso",["Complicado"]],["驱动","驅動","qūdòng","Impulsar",["Accionar"]],["驱逐","驅逐","qūzhú","Expulsar",["Echar"]],["屈服",null,"qūfú","Rendirse",["Someterse"]],["趋于","趨於","qūyú","Tender a",["Aproximarse"]],["曲",null,"qǔ","Canción",["Melodía"]],["取代",null,"qǔdài","Reemplazar",["Sustituir"]],["取缔","取締","qǔdì","Prohibir",["Abolir"]],["取而代之",null,"qǔ'érdàizhī","Tomar su lugar",["Suplantar"]],["取经","取經","qǔjīng","Buscar experiencia",["Aprender de otros"]],["取决于","取決於","qǔjué yú","Depender de",["Condicionarse por"]],["取暖",null,"qǔnuǎn","Calentarse",["Abrigarse"]],["取胜","取勝","qǔshèng","Ganar",["Triunfar"]],["取笑",null,"qǔxiào","Burlarse",["Ridiculizar"]],["娶",null,"qǔ","Casarse (con mujer)",["Desposar"]],["去除",null,"qùchú","Quitar",["Eliminar"]],["去处","去處","qùchù","Lugar",["Destino"]],["去向",null,"qùxiàng","Paradero",["Rumbo"]],["趣味",null,"qùwèi","Interés",["Gracia"]],["圈套",null,"quāntào","Trampa",["Lazo"]],["圈子",null,"quānzi","Círculo",["Grupo"]],["权衡","權衡","quánhéng","Sopesar",["Ponderar"]],["权威","權威","quánwēi","Autoridad",["Poder"]],["权益","權益","quányì","Derechos",["Beneficios"]],["全长","全長","quáncháng","Longitud total",["Extensión completa"]],["全程",null,"quánchéng","全程 completo",["Trayectoria total"]],["全方位",null,"quánfāngwèi","Integral",["Completo"]],["全局",null,"quánjú","全局 general",["Conjunto"]],["全力以赴",null,"quánlìyǐfù","Esforzarse al máximo",["Darlo todo"]],["全能",null,"quánnéng","Todopoderoso",["Versátil"]],["全文",null,"quánwén","Texto completo",["Cuerpo entero"]],["全心全意",null,"quánxīn-quányì","De todo corazón",["Sinceramente"]],["拳",null,"quán","Puño",["Golpe"]],["拳头","拳頭","quántóu","Puño",["Nudo"]],["劝告","勸告","quàngào","Aconsejar",["Exhortar"]],["劝说","勸說","quànshuō","Convencer",["Persuadir"]],["劝阻","勸阻","quànzǔ","Disuadir",["Impedir"]],["缺口",null,"quēkǒu","Brecha",["Hueco"]],["缺失",null,"quēshī","Falta",["Omisión"]],["缺席",null,"quēxí","Ausentarse",["Faltar"]],["确切","確切","quèqiè","Exacto",["Preciso"]],["确信","確信","quèxìn","Estar seguro",["Convencerse"]],["确凿","確鑿","quèzáo","Concluyente",["Irrefutable"]],["确诊","確診","quèzhěn","Diagnosticar",["Confirmar enfermedad"]],["燃放",null,"ránfàng","Encender y explotar",["Detonar"]],["燃气","燃氣","ránqì","Gas combustible",["Gas natural"]],["燃油",null,"rányóu","Combustible líquido",["Diésel"]],["嚷",null,"rǎng","Gritar",["Vociferar"]],["让步","讓步","ràngbù","Ceder",["Retroceder"]],["饶","饒","ráo","Perdonar",["Indultar"]],["饶恕","饒恕","ráoshù","Perdonar",["Absolver"]],["扰乱","擾亂","rǎoluàn","Perturbar",["Desordenar"]],["绕行","繞行","ràoxíng","Rodear",["Desviarse"]],["惹",null,"rě","Provocar",["Incomodar"]],["热潮","熱潮","rècháo","Auge",["Entusiasmo"]],["热带","熱帶","rèdài","Trópico",["Zona tropical"]],["热气","熱氣","rèqì","Vapor",["Calor"]],["热气球","熱氣球","rèqìqiú","Globo aerostático",["Balón"]],["热腾腾","熱騰騰","rèténgténg","Humeante",["Calentito"]],["热衷","熱衷","rèzhōng","Dedicarse a",["Apasionarse"]],["人次",null,"réncì","Visita persona",["Asistencia"]],["人道",null,"réndào","Humanidad",["Compasivo"]],["人格",null,"réngé","Personalidad",["Carácter"]],["人工智能",null,"réngōng-zhìnéng","Inteligencia artificial",["IA"]],["人均",null,"rénjūn","Por persona",["Promedio"]],["人品",null,"rénpǐn","Carácter",["Integridad"]],["人气","人氣","rénqì","Popularidad",["Afluencia"]],["人情",null,"rénqíng","Favor",["Obligación"]],["人身",null,"rénshēn","Persona física",["Integridad corporal"]],["人事",null,"rénshì","Personal",["Recursos humanos"]],["人手",null,"rénshǒu","Personal",["Ayudantes"]],["人体","人體","réntǐ","Cuerpo humano",["Anatomía"]],["人为","人為","rénwéi","Artificial",["Intencionado"]],["人文",null,"rénwén","Humanidades",["Cultura"]],["人行道",null,"rénxíngdào","Acera",["Vereda"]],["人性",null,"rénxìng","Naturaleza humana",["Condición humana"]],["人选","人選","rénxuǎn","Candidato",["Elección"]],["人缘儿","人緣兒","rényuánr","Popularidad",["Simpatía"]],["人造",null,"rénzào","Artificial",["Sintético"]],["人质","人質","rénzhì","Rehén",["Prisionero"]],["仁慈",null,"réncí","Compasivo",["Misericordioso"]],["忍饥挨饿","忍飢挨餓","rěnjī-ái'è","Pasar hambre",["Sufrir hambruna"]],["忍耐",null,"rěnnài","Aguantar",["Soportar"]],["忍心",null,"rěnxīn","Tener corazón",["Atreverse"]],["认错","認錯","rèncuò","Admitir error",["Reconocer fallo"]],["认证","認證","rènzhèng","Certificar",["Autenticar"]],["认知","認知","rènzhī","Conocer",["Percibir"]],["任命",null,"rènmìng","Nombrar",["Designar"]],["任期",null,"rènqī","Mandato",["Período"]],["任人宰割",null,"rènrén-zǎigē","Ser víctima",["Ser presa"]],["任意",null,"rènyì","Arbitrario",["A voluntad"]],["任职","任職","rènzhí","Ejercer cargo",["Desempeñar"]],["韧性","韌性","rènxìng","Resiliencia",["Flexibilidad"]],["日程",null,"rìchéng","Agenda",["Itinerario"]],["日复一日","日復一日","rìfùyīrì","Día tras día",["Constantemente"]],["日后","日後","rìhòu","En el futuro",["Más adelante"]],["日前",null,"rìqián","Hace poco",["Recientemente"]],["日趋","日趨","rìqū","Día a día",["Gradualmente"]],["日新月异","日新月異","rìxīn-yuèyì","Rápido cambio",["Constante evolución"]],["日益",null,"rìyì","Cada día más",["Crecientemente"]],["荣获","榮獲","rónghuò","Obtener",["Ganar"]],["荣幸","榮幸","róngxìng","Honor",["Privilegio"]],["荣誉","榮譽","róngyù","Honor",["Gloria"]],["容光焕发","容光煥發","róngguāng-huànfā","Radiante",["Deslumbrante"]],["容量",null,"róngliàng","Capacidad",["Volumen"]],["容纳","容納","róngnà","Contener",["Albergar"]],["容忍",null,"róngrěn","Tolerar",["Aguantar"]],["容许","容許","róngxǔ","Permitir",["Admitir"]],["容颜","容顏","róngyán","Rostro",["Apariencia"]],["溶解",null,"róngjiě","Disolver",["Diluir"]],["融",null,"róng","Derretirse",["Fusionarse","Armonía"]],["融化",null,"rónghuà","Derretir",["Fundir"]],["融洽",null,"róngqià","Armonioso",["Cordial"]],["冗长","冗長","rǒngcháng","Prolijo",["Extenso"]],["柔和",null,"róuhé","Suave",["Delicado"]],["柔软","柔軟","róuruǎn","Blando",["Flexible"]],["揉",null,"róu","Amasar",["Masajear"]],["如果说","如果說","rúguǒ shuō","Si se dice",["Suponiendo que"]],["如实","如實","rúshí","Fielmente",["Exactamente"]],["如意",null,"rúyì","Conforme a los deseos",["Como uno quiere"]],["如愿以偿","如願以償","rúyuànyǐcháng","Cumplir deseos",["Lograr lo deseado"]],["如醉如痴","如醉如癡","rúzuì-rúchī","Como ebrio",["Extasiado"]],["儒家",null,"Rújiā","Confucianismo",["Escuela confuciana"]],["儒学","儒學","rúxué","Confucianismo",["Estudio confuciano"]],["入场","入場","rùchǎng","Entrar",["Acceso"]],["入场券","入場券","rùchǎngquàn","Boleto",["Entrada"]],["入境",null,"rùjìng","Entrar país",["Ingreso"]],["入侵",null,"rùqīn","Invadir",["Agresión"]],["入手",null,"rùshǒu","Comenzar",["Empezar"]],["入选","入選","rùxuǎn","Ser seleccionado",["Admitido"]],["软弱","軟弱","ruǎnruò","Débil",["Flojo"]],["软实力","軟實力","ruǎnshílì","Poder blando",["Influencia"]],["瑞雪",null,"ruìxuě","Nieve auspiciosa",["Nevada venturosa"]],["润","潤","rùn","Humectar",["Lubricar"]],["若干",null,"ruògān","Varios",["Algunos"]],["弱点","弱點","ruòdiǎn","Debilidad",["Flaqueza"]],["弱势","弱勢","ruòshì","Posición débil",["Desventaja"]],["撒",null,"sā","Esparcir",["Rociar"]],["撒谎","撒謊","sāhuǎng","Mentir",["Falsear"]],["赛车","賽車","sàichē","Automovilismo",["Carreras"]],["赛跑","賽跑","sàipǎo","Correr",["Competición"]],["三番五次",null,"sānfān-wǔcì","Repetidamente",["Insistentemente"]],["三角",null,"sānjiǎo","Triángulo",["Angular"]],["三维","三維","sānwéi","Tridimensional",["Espacial"]],["散布","散佈","sànbù","Difundir",["Extender"]],["散发","散發","sànfā","Emitir",["Desprender"]],["桑拿",null,"sāngná","Sauna",["Baño de vapor"]],["嗓子",null,"sǎngzi","Voz",["Garganta"]],["丧生","喪生","sàngshēng","Morir",["Fallecer"]],["骚乱","騷亂","sāoluàn","Disturbio",["Revuelta"]],["骚扰","騷擾","sāorǎo","Molestar",["Acosar"]],["扫除","掃除","sǎochú","Limpiar",["Barrer"]],["扫描","掃描","sǎomiáo","Escanear",["Revisar"]],["扫墓","掃墓","sǎomù","Visitar tumbas",["Honrar muertos"]],["扫兴","掃興","sǎoxìng","Arruinar",["Fastidiar"]],["嫂子",null,"sǎozi","Cuñada",["Hermana mayor"]],["僧人",null,"sēngrén","Monje",["Religioso"]],["杀害","殺害","shāhài","Matar",["Asesinar"]],["杀手","殺手","shāshǒu","Asesino",["Homicida"]],["沙龙","沙龍","shālóng","Salón",["Tertulia"]],["沙滩","沙灘","shātān","Playa",["Arena"]],["纱","紗","shā","Tela",["Gasa"]],["刹车","剎車","shāchē","Freno",["Sistema de frenado"]],["砂糖",null,"shātáng","Azúcar",["Azúcar refinada"]],["鲨鱼","鯊魚","shāyú","Tiburón",["Escualo"]],["傻瓜",null,"shǎguā","Tonto",["Idiota"]],["筛","篩","shāi","Colar",["Tamizar"]],["筛选","篩選","shāixuǎn","Seleccionar",["Filtrar"]],["晒太阳","曬太陽","shài tàiyáng","Tomar sol",["Exponerse al sol"]],["山川",null,"shānchuān","Montañas y ríos",["Relieve"]],["山顶","山頂","shāndǐng","Cima",["Cumbre"]],["山冈","山岡","shāngāng","Colina",["Loma"]],["山岭","山嶺","shānlǐng","Cordillera",["Sierra"]],["山路",null,"shānlù","Sendero",["Camino"]],["山寨",null,"shānzhài","山寨",["Imitación"]],["删","刪","shān","Borrar",["Suprimir"]],["删除","刪除","shānchú","Eliminar",["Suprimir"]],["煽动","煽動","shāndòng","Instigar",["Provocar"]],["闪烁","閃爍","shǎnshuò","Parpadear",["Brillar"]],["善",null,"shàn","Bien dispuesto",["Benévolo","Bueno (virtuoso)"]],["善意",null,"shànyì","Buena voluntad",["Amabilidad"]],["擅长","擅長","shàncháng","Ser bueno en",["Dominar"]],["擅自",null,"shànzì","Por cuenta propia",["Arbitrariamente"]],["膳食",null,"shànshí","Comida",["Alimentación"]],["赡养","贍養","shànyǎng","Mantener",["Sustentar"]],["伤残","傷殘","shāngcán","Herir",["Incapacitar"]],["伤感","傷感","shānggǎn","Melancólico",["Triste"]],["伤痕","傷痕","shānghén","Cicatriz",["Herida"]],["伤脑筋","傷腦筋","shāng nǎojīn","Preocupar",["Complicar"]],["伤势","傷勢","shāngshì","Herida",["Lesión"]],["商贩","商販","shāngfàn","Vendedor",["Comerciante"]],["商贾","商賈","shānggǔ","Mercader",["Comerciante"]],["商讨","商討","shāngtǎo","Discutir",["Deliberar"]],["上报","上報","shàngbào","Informar",["Notificar"]],["上场","上場","shàngchǎng","Entrar",["Participar"]],["上方",null,"shàngfāng","Arriba",["Superior"]],["上岗","上崗","shànggǎng","Comenzar trabajo",["Incorporarse"]],["上火",null,"shànghuǒ","Inflamación",["Enojo"]],["上空",null,"shàngkōng","Cielo",["Espacio aéreo"]],["上流",null,"shàngliú","Alta sociedad",["Élite"]],["上期",null,"shàng qī","Edición anterior",["Período anterior"]],["上任",null,"shàngrèn","Asumir cargo",["Tomar posesión"]],["上述",null,"shàngshù","Mencionado",["Precedente"]],["上司",null,"shàngsi","Jefe",["Superior"]],["上诉","上訴","shàngsù","Apelar",["Reclamar"]],["上调","上調","shàngtiáo","Aumentar",["Subir"]],["上头","上頭","shàngtou","Superior",["Jefe"]],["上限",null,"shàngxiàn","Límite superior",["Tope"]],["上旬",null,"shàngxún","Primera decena",["Principios de mes"]],["上瘾","上癮","shàngyǐn","Adicto",["Viciado"]],["上映",null,"shàngyìng","Estrenó",null],["上游",null,"shàngyóu","Río arriba",["Fuente"]],["尚",null,"shàng","Todavía",["Aún","Valorar, estimar"]],["尚未",null,"shàngwèi","Todavía no",["Aún no"]],["捎",null,"shāo","Llevar",["Enviar"]],["烧毁","燒燬","shāohuǐ","Destruir por fuego",["Incinerar"]],["烧烤","燒烤","shāokǎo","Barbacoa",["Asado"]],["稍后","稍後","shāohòu","Más tarde",["Luego"]],["稍候",null,"shāohòu","Esperar",["Aguardar"]],["稍稍",null,"shāoshāo","Un poco",["Ligeramente"]],["少不了",null,"shǎobuliǎo","No poder faltar",["Imprescindible"]],["少见","少見","shǎojiàn","Raro",["Poco común"]],["少量",null,"shǎoliàng","Poca cantidad",["Escaso"]],["少有",null,"shǎoyǒu","Raro",["Excepcional"]],["少林寺",null,"Shàolín Sì","Templo Shaolin",["Monasterio Shaolin"]],["少女",null,"shàonǚ","Joven",["Muchacha"]],["奢侈",null,"shēchǐ","Lujoso",["Extravagante"]],["奢望",null,"shēwàng","Esperar demasiado",["Ambicionar"]],["设","設","shè","Establecer; poner en marcha",null],["设定","設定","shèdìng","Establecer",["Configurar"]],["设法","設法","shèfǎ","Intentar",["Buscar"]],["社会主义","社會主義","shèhuì zhǔyì","Socialismo",["Sistema social"]],["社交",null,"shèjiāo","Vida social",["Relaciones"]],["社论","社論","shèlùn","Editorial",["Artículo"]],["社团","社團","shètuán","Club",["Asociación","Sociedad"]],["涉嫌",null,"shèxián","Sospechoso",["Involucrado"]],["摄氏度","攝氏度","shèshìdù","Grado Celsius",["Centígrado"]],["谁知道","誰知道","shéi zhīdào","Quién sabe",["Quizás"]],["申办","申辦","shēnbàn","Solicitar",["Postular"]],["申报","申報","shēnbào","Declarar",["Informar"]],["申领","申領","shēnlǐng","Solicitar",["Reclamar"]],["伸手",null,"shēnshǒu","Extender mano",["Pedir"]],["伸缩","伸縮","shēnsuō","Extender y retraer",["Ajustar"]],["伸张","伸張","shēnzhāng","Defender",["Promover"]],["身不由己",null,"shēnbùyóujǐ","No poder controlar",["Impotente"]],["身价","身價","shēnjià","Valor",["Patrimonio"]],["身躯","身軀","shēnqū","Cuerpo",null],["身心",null,"shēnxīn","Cuerpo y mente",null],["身影",null,"shēnyǐng","Silueta",null],["身子",null,"shēnzi","Cuerpo",null],["绅士","紳士","shēnshì","Caballero",null],["深奥","深奧","shēn'ào","Profundo",null],["深切",null,"shēnqiè","Profundo",null],["深情",null,"shēnqíng","Sentimiento profundo/affectuoso",null],["深入人心",null,"shēnrù-rénxīn","Calar en el corazón",null],["深受",null,"shēnshòu","Recibir profundamente (深受…喜爱 = muy querido)",null],["深思",null,"shēnsī","Reflexionar",null],["深信",null,"shēnxìn","Creer firmemente",null],["深夜",null,"shēnyè","Medianoche",null],["深远","深遠","shēnyuǎn","Profundo y duradero",null],["神气","神氣","shénqì","Aire importante/apariencia",null],["神圣","神聖","shénshèng","Sagrado",null],["神态","神態","shéntài","Expresión",null],["神仙",null,"shénxiān","Inmortal",null],["审","審","shěn","Revisar",null],["审定","審定","shěndìng","Aprobar",null],["审核","審核","shěnhé","Examinar",null],["审美","審美","shěnměi","Apreciar la belleza",null],["审判","審判","shěnpàn","Juzgar",null],["审批","審批","shěnpī","Aprobar",null],["审视","審視","shěnshì","Examinar",null],["肾","腎","shèn","Riñón",null],["甚至于","甚至於","shènzhìyú","Incluso",null],["渗","滲","shèn","Filtrarse",null],["渗透","滲透","shèntòu","Infiltrarse",null],["慎重",null,"shènzhòng","Prudente",null],["升温","升溫","shēngwēn","Aumentar temperatura",null],["生机","生機","shēngjī","Vitalidad",null],["生理",null,"shēnglǐ","Fisiología",null],["生命线","生命線","shēngmìngxiàn","Cordón umbilical",null],["生怕",null,"shēngpà","Temer",null],["生平",null,"shēngpíng","Vida",null],["生前",null,"shēngqián","Antes de morir",null],["生死",null,"shēngsǐ","Vida y muerte",null],["生态","生態","shēngtài","Ecosistema",null],["生物",null,"shēngwù","Ser vivo",["Biología (attrib.)"]],["生效",null,"shēngxiào","Entrar en vigor",null],["生涯",null,"shēngyá","Carrera",null],["生硬",null,"shēngyìng","Rígido",null],["生育",null,"shēngyù","Procrear",null],["声称","聲稱","shēngchēng","Afirmar",null],["声望","聲望","shēngwàng","Prestigio",["Reputación"]],["声誉","聲譽","shēngyù","Reputación",null],["牲畜",null,"shēngchù","Ganado",null],["绳子","繩子","shéngzi","Cuerda",null],["省略",null,"shěnglüè","Omitir",null],["省事",null,"shěngshì","Ahorrar trabajo",null],["圣贤","聖賢","shèngxián","Sabio",null],["胜出","勝出","shèngchū","Ganar",null],["胜任","勝任","shèngrèn","Ser capaz",null],["盛大",null,"shèngdà","Solemne",null],["盛会","盛會","shènghuì","Evento importante",null],["盛开","盛開","shèngkāi","Florecer",null],["盛气凌人","盛氣凌人","shèngqì-língrén","Arrogante",null],["剩余","剩餘","shèngyú","Restante",["Sobrante","Quedar"]],["尸体","屍體","shītǐ","Cadáver",null],["失传","失傳","shīchuán","Perderse",null],["失控",null,"shīkòng","Perder control",null],["失利",null,"shīlì","Sufrir una derrota",null],["失恋","失戀","shīliàn","Ruptura amorosa",null],["失灵","失靈","shīlíng","Dejar de funcionar",null],["失落",null,"shīluò","Decepcionado",null],["失眠",null,"shīmián","Insomnio",null],["失明",null,"shīmíng","Ceguera",null],["失效",null,"shīxiào","Caducar",null],["失业率","失業率","shīyèlǜ","Tasa de desempleo",null],["失踪","失蹤","shīzōng","Desaparecer",null],["师范","師範","shīfàn","Formación docente",null],["师长","師長","shīzhǎng","Maestro",null],["师资","師資","shīzī","Profesorado",null],["狮子","獅子","shīzi","León",null],["施工",null,"shīgōng","Construir",null],["施加",null,"shījiā","Aplicar",null],["施行",null,"shīxíng","Implementar",null],["施压","施壓","shīyā","Presionar",null],["湿度","濕度","shīdù","Humedad",null],["湿润","濕潤","shīrùn","Húmedo",null],["十字路口",null,"shízì lùkǒu","Cruce",null],["时不时","時不時","shíbùshí","De vez en cuando",null],["时段","時段","shíduàn","Período",null],["时隔","時隔","shí gé","Después de",null],["时好时坏","時好時壞","shíhǎo-shíhuài","Inestable",null],["时间表","時間表","shíjiānbiǎo","Horario",null],["时空","時空","shíkōng","Espacio-tiempo",null],["时髦","時髦","shímáo","Moderno",null],["时尚","時尚","shíshàng","Elegante",null],["时速","時速","shísù","Velocidad",null],["识别","識別","shíbié","Identificar",null],["实地","實地","shídì","En el lugar",null],["实话","實話","shíhuà","Verdad",null],["实话实说","實話實說","shíhuà-shíshuō","Decir la verdad",null],["实况","實況","shíkuàng","Situación real",null],["实事求是","實事求是","shíshì-qiúshì","Realista",null],["实体","實體","shítǐ","Entidad",null],["实物","實物","shíwù","Objeto real",null],["实质","實質","shízhì","Esencia",null],["食宿",null,"shísù","Alojamiento y comida",null],["食用",null,"shíyòng","Consumir",null],["史无前例","史無前例","shǐwúqiánlì","Sin precedentes",null],["使唤","使喚","shǐhuan","Ordenar",null],["使命",null,"shǐmìng","Misión",null],["使者",null,"shǐzhě","Mensajero",null],["士气","士氣","shìqì","Moral",null],["示威",null,"shìwēi","Protestar",null],["示意",null,"shìyì","Indicar",null],["世代",null,"shìdài","Generación",null],["世故",null,"shìgu","Sofisticado",null],["世界级","世界級","shìjiè jí","Mundial",null],["世袭","世襲","shìxí","Heredar",null],["市场经济","市場經濟","shìchǎng jīngjì","Economía de mercado",null],["势必","勢必","shìbì","Inevitablemente",null],["势不可当","勢不可當","shìbùkědāng","Imparable",null],["势头","勢頭","shìtou","Tendencia",null],["事迹","事跡","shìjì","Logro",null],["事态","事態","shìtài","Situación",null],["事务","事務","shìwù","Asunto",null],["事务所","事務所","shìwùsuǒ","Oficina",null],["事项","事項","shìxiàng","Punto",null],["事宜",null,"shìyí","Asunto",null],["侍候",null,"shìhòu","Atender",["Cuidar"]],["试探","試探","shìtan","Sondear",["Probar"]],["试行","試行","shìxíng","Implementar",["Aplicar"]],["试用","試用","shìyòng","Probar",["Experimentar"]],["试用期","試用期","shìyòngqī","Período de prueba",["Etapa de prueba"]],["视察","視察","shìchá","Inspeccionar",["Revisar"]],["视角","視角","shìjiǎo","Punto de vista",["Perspectiva"]],["视觉","視覺","shìjué","Visión",["Sentido de la vista"]],["视力","視力","shìlì","Agudeza visual",["Vista"]],["视线","視線","shìxiàn","Línea de visión",["Mirada"]],["视野","視野","shìyě","Campo visual",["Horizonte"]],["柿子",null,"shìzi","Caqui",["Níspero"]],["是非",null,"shìfēi","Conflicto",["Disputa"]],["适度","適度","shìdù","Moderado",["Adecuado"]],["适量","適量","shìliàng","Cantidad adecuada",["Porción justa"]],["适时","適時","shìshí","Oportuno",["A tiempo"]],["适宜","適宜","shìyí","Adecuado",["Conveniente"]],["逝世",null,"shìshì","Fallecer",["Morir"]],["释放","釋放","shìfàng","Liberar",["Soltar"]],["嗜好",null,"shìhào","Afición",["Pasatiempo"]]],
'HSK9': [["收复","收復","shōufù","Recuperar",["Reconquistar"]],["收据","收據","shōujù","Comprobante",["Recibo","Constancia"]],["收敛","收斂","shōuliǎn","Contener",["Reprimir"]],["收留",null,"shōuliú","Acoger",["Alojar"]],["收买","收買","shōumǎi","Sobornar",["Comprar"]],["收视率","收視率","shōushìlǜ","Índice de audiencia",["Rating"]],["收缩","收縮","shōusuō","Contraer",["Encoger"]],["收支",null,"shōuzhī","Ingresos y gastos",["Finanzas"]],["手臂",null,"shǒubì","Brazo",["Miembro superior"]],["手册","手冊","shǒucè","Manual",["Guía"]],["手动","手動","shǒudòng","Manual",["Operado a mano"]],["手脚","手腳","shǒujiǎo","Manos y pies",["Extremidades"]],["手帕",null,"shǒupà","Pañuelo",["Pañuelo de tela"]],["手枪","手槍","shǒuqiāng","Pistola",["Arma de fuego"]],["手势","手勢","shǒushì","Gesto",["Seña"]],["手术室","手術室","shǒushùshì","Quirófano",["Sala de operaciones"]],["手头","手頭","shǒutóu","A mano",["Disponible"]],["手腕",null,"shǒuwàn","Muñeca",["Articulación"]],["手艺","手藝","shǒuyì","Destreza",["Oficio","Artesanía"]],["手掌",null,"shǒuzhǎng","Palma",["Mano abierta"]],["守候",null,"shǒuhòu","Esperar",["Aguardar"]],["守护","守護","shǒuhù","Proteger",["Custodiar"]],["守株待兔",null,"shǒuzhū-dàitù","Esperar sin hacer nada",["Pasividad"]],["首创","首創","shǒuchuàng","Crear",["Inventar"]],["首府",null,"shǒufǔ","Capital",["Sede del gobierno"]],["首批",null,"shǒupī","Primer lote",["Primera partida"]],["首饰","首飾","shǒushì","Joyas",["Bisutería"]],["首要",null,"shǒuyào","Principal",["Más importante"]],["寿命","壽命","shòumìng","Expectativa de vida",["Duración"]],["受过","受過","shòuguò","Haber experimentado",["Haber pasado"]],["受害",null,"shòuhài","Sufrir daño",["Ser víctima"]],["受害人",null,"shòuhàirén","Víctima",["Persona afectada"]],["受贿","受賄","shòuhuì","Aceptar sobornos",["Recibir sobornos"]],["受惊","受驚","shòujīng","Asustarse",["Alarmarse"]],["受苦",null,"shòukǔ","Sufrir",["Padecer"]],["受理",null,"shòulǐ","Aceptar un caso",["Tramitar"]],["受骗","受騙","shòupiàn","Ser engañado",["Ser estafado"]],["受益",null,"shòuyì","Beneficiarse",["Aprovechar"]],["授权","授權","shòuquán","Autorizar",["Delegar"]],["授予",null,"shòuyǔ","Conferir",["Otorgar"]],["售价","售價","shòujià","Precio de venta",["Costo"]],["售票",null,"shòupiào","Vender entradas",["Boletear"]],["书橱","書櫥","shūchú","Estante de libros",["Biblioteca"]],["书籍","書籍","shūjí","Libros",["Publicaciones"]],["书记","書記","shūjì","Secretario",["Funcionario"]],["书面","書面","shūmiàn","Escrito",["Documentado"]],["书写","書寫","shūxiě","Escribir",["Trazar"]],["抒情",null,"shūqíng","Expresar emociones",["Cantar"]],["枢纽","樞紐","shūniǔ","Centro",["Núcleo"]],["梳",null,"shū","Peinar",["Cepillar"]],["梳理",null,"shūlǐ","Ordenar",["Aclarar"]],["梳子",null,"shūzi","Peine",["Cepillo"]],["舒畅","舒暢","shūchàng","Cómodo",["Agradable"]],["疏导","疏導","shūdǎo","Desbloquear",["Aliviar"]],["疏忽",null,"shūhu","Descuido",["Negligencia"]],["疏散",null,"shūsàn","Evacuar",["Dispersar"]],["疏通",null,"shūtōng","Desobstruir",["Conectar"]],["输家","輸家","shūjiā","Perdedor",["Vencido"]],["输送","輸送","shūsòng","Transportar",["Suministrar"]],["输血","輸血","shūxuè","Transfusión sanguínea",["Donar sangre"]],["输液","輸液","shūyè","Infusión",["Administrar líquidos"]],["赎","贖","shú","Rescatar",["Redimir"]],["暑期",null,"shǔqī","Vacaciones de verano",["Estío"]],["属性","屬性","shǔxìng","Atributo",["Característica"]],["曙光",null,"shǔguāng","Amanecer",["Luz del alba"]],["束缚","束縛","shùfù","Atar",["Restringir"]],["树立","樹立","shùlì","Establecer",["Crear"]],["树木","樹木","shùmù","Árbol",["Planta"]],["树梢","樹梢","shùshāo","Copa del árbol",["Ápice"]],["树荫","樹蔭","shùyīn","Sombra del árbol",["Refugio"]],["树枝","樹枝","shùzhī","Rama",["Ramaje"]],["竖","豎","shù","Poner vertical",["Erguir"]],["数额","數額","shù'é","Cantidad",["Monto"]],["数据库","數據庫","shùjùkù","Base de datos",["Archivo"]],["刷新",null,"shuāxīn","Actualizar",["Renovar"]],["耍",null,"shuǎ","Jugar",["Bromear"]],["耍赖","耍賴","shuǎlài","Hacer trampas",["Engañar"]],["衰减","衰減","shuāijiǎn","Disminuir",["Debilitarse"]],["衰竭",null,"shuāijié","Colapsar",["Agotarse"]],["衰老",null,"shuāilǎo","Envejecer",["Decrepito"]],["衰弱",null,"shuāiruò","Débil",["Frágil"]],["衰退",null,"shuāituì","Declinar",["Deteriorarse"]],["摔跤",null,"shuāijiāo","Caer al suelo",["Tropezar"]],["甩",null,"shuǎi","Lanzar",["Agitar"]],["拴",null,"shuān","Atar",["Amarrar"]],["涮",null,"shuàn","Enjuagar",["Sumergir"]],["双胞胎","雙胞胎","shuāngbāotāi","Gemelos",["Mellizos"]],["双边","雙邊","shuāngbiān","Bilateral",["De dos partes"]],["双重","雙重","shuāngchóng","Doble",["Duplicado"]],["双向","雙向","shuāngxiàng","Bidireccional",["De dos sentidos"]],["双赢","雙贏","shuāngyíng","Beneficio mutuo",["Ganar-ganar"]],["霜",null,"shuāng","Escarcha",["Helada"]],["爽快",null,"shuǎngkuai","Directo",["Sin rodeos"]],["水槽",null,"shuǐcáo","Fregadero",["Pila"]],["水稻",null,"shuǐdào","Arroz",["Cultivo acuático"]],["水管",null,"shuǐguǎn","Tubería de agua",["Caño"]],["水壶","水壺","shuǐhú","Hervidor",["Tetera"]],["水货","水貨","shuǐhuò","Producto de contrabando",["Importado ilegal"]],["水晶",null,"shuǐjīng","Cristal",["Piedra preciosa"]],["水利",null,"shuǐlì","Recursos hídricos",["Irrigación"]],["水灵灵","水靈靈","shuǐlínglíng","Fresco y brillante",["Vivaz"]],["水龙头","水龍頭","shuǐlóngtóu","Grifo",["Llave"]],["水落石出",null,"shuǐluò-shíchū","La verdad sale a la luz",["Todo se aclara"]],["水面",null,"shuǐmiàn","Superficie del agua",["Superficie acuática"]],["水手",null,"shuǐshǒu","Marinero",["Marino"]],["水温","水溫","shuǐwēn","Temperatura del agua",["Temperatura acuática"]],["水域",null,"shuǐyù","Zona acuática",["Área acuática"]],["水源",null,"shuǐyuán","Fuente de agua",["Manantial"]],["水涨船高","水漲船高","shuǐzhǎng-chuángāo","Sube el agua sube el barco",["Crece todo simultáneamente"]],["水准","水準","shuǐzhǔn","Nivel",["Estándar"]],["税收","稅收","shuìshōu","Recaudación fiscal",["Impuestos"]],["税务","稅務","shuìwù","Asuntos fiscales",["Hacienda"]],["睡袋",null,"shuìdài","Saco de dormir",["Bolsa de dormir"]],["顺便","順便","shùnbiàn","Por casualidad",["Al pasar"]],["顺差","順差","shùnchā","Superávit comercial",["Excedente comercial"]],["顺畅","順暢","shùnchàng","Fluido",["Sin obstáculos"]],["顺从","順從","shùncóng","Obedecer",["Someterse"]],["顺理成章","順理成章","shùnlǐ-chéngzhāng","Lógico y natural",["Consecuencia inevitable"]],["顺路","順路","shùnlù","De paso",["Por el camino"]],["顺其自然","順其自然","shùnqízìrán","Dejar fluir",["Seguir el curso"]],["顺势","順勢","shùnshì","Aprovechar la tendencia",["Al momento"]],["顺手","順手","shùnshǒu","Cómodo",["Fácilmente"]],["顺心","順心","shùnxīn","Conforme a los deseos",["Satisfactorio"]],["顺应","順應","shùnyìng","Adaptarse",["Ajustarse"]],["顺着","順著","shùnzhe","Siguiendo",["A lo largo"]],["瞬间","瞬間","shùnjiān","Instante",["Momento"]],["说白了","說白了","shuōbáile","En otras palabras",["Francamente"]],["说不上","說不上","shuōbushàng","No poder decir",["Difícil de definir"]],["说到底","說到底","shuōdàodǐ","En el fondo",["Básicamente"]],["说道","說道","shuōdao","Mencionar",["Hablar de"]],["说干就干","說幹就幹","shuō gàn jiù gàn","Decir y hacer",["Actuar inmediatamente"]],["说谎","說謊","shuōhuǎng","Mentir",["Falsear"]],["说老实话","說老實話","shuō lǎoshi huà","Decir la verdad",["Hablar con franqueza"]],["说起来","說起來","shuō qǐlái","Hablar de",["En cuanto a"]],["说情","說情","shuōqíng","Interceder",["Abogar por"]],["说闲话","說閒話","shuō xiánhuà","Chismear",["Murmurar"]],["说真的","說真的","shuō zhēnde","En serio",["De verdad"]],["硕果","碩果","shuòguǒ","Fruto abundante",["Logro importante"]],["司法",null,"sīfǎ","Justicia judicial",["Sistema legal"]],["司空见惯","司空見慣","sīkōng-jiànguàn","Común y corriente",["Visto a menudo"]],["司令",null,"sīlìng","Comandante",["General"]],["丝","絲","sī","Seda",["Hilo"]],["丝绸","絲綢","sīchóu","Seda",["Tela de seda"]],["丝毫","絲毫","sīháo","Ni un poco",["En absoluto"]],["私房钱","私房錢","sīfángqián","Dinero secreto",["Ahorro personal"]],["私家车","私家車","sījiāchē","Coche particular",["Automóvil privado"]],["私立",null,"sīlì","Privado",["Instituto privado"]],["私事",null,"sīshì","Asunto personal",["Asunto privado"]],["私下",null,"sīxià","En privado",["Confidencialmente"]],["私营","私營","sīyíng","Propiedad privada",["Empresa privada"]],["私有",null,"sīyǒu","Poseer privatamente",["Propiedad privada"]],["私自",null,"sīzì","Secretamente",["Por cuenta propia"]],["思路",null,"sīlù","Línea de pensamiento",["Idea"]],["思念",null,"sīniàn","Añorar",["Extrañar"]],["思前想后","思前想後","sīqián-xiǎnghòu","Pensar mucho",["Reflexionar"]],["思索",null,"sīsuǒ","Reflexionar",["Pensar"]],["撕",null,"sī","Rasgar",["Desgarrar"]],["死心",null,"sǐxīn","Renunciar a algo",["Dejar de insistir"]],["死心塌地",null,"sǐxīn-tādì","Con firmeza",["Decididamente"]],["四合院",null,"sìhéyuàn","Casa patio tradicional",["Residencia tradicional"]],["四季",null,"sìjì","Las cuatro estaciones",["Estaciones del año"]],["四面八方",null,"sìmiàn-bāfāng","Todas direcciones",["De todas partes"]],["寺庙","寺廟","sìmiào","Templo budista",["Monasterio"]],["似曾相识","似曾相識","sìcéng-xiāngshí","Conocido pero no recordado",["Familiar"]],["似是而非",null,"sìshì-érfēi","Parecido pero no lo es",["Aparente"]],["伺机","伺機","sìjī","Esperar oportunidad",["Aguardar el momento"]],["饲料","飼料","sìliào","Alimento para animales",["Pienso"]],["饲养","飼養","sìyǎng","Criar",["Alimentar"]],["松绑","鬆綁","sōngbǎng","Desatar",["Liberalizar"]],["松弛","鬆弛","sōngchí","Relajado",["Flojo"]],["耸立","聳立","sǒnglì","Erguirse",["Levantarse"]],["送别","送別","sòngbié","Despedir",["Despedida"]],["搜查",null,"sōuchá","Registrar",["Allanar"]],["搜集",null,"sōují","Recopilar",["Recolectar"]],["搜救",null,"sōujiù","Búsqueda y rescate",["Buscar y salvar"]],["搜寻","搜尋","sōuxún","Buscar",["Rastrear"]],["艘",null,"sōu","Unidad de medida",["Barco"]],["苏醒","甦醒","sūxǐng","Despertar",["Reanimarse"]],["酥",null,"sū","Quebradizo",["Crujiente"]],["俗",null,"sú","Vulgar",["Común"]],["俗话","俗話","súhuà","Refrán",["Dicho"]],["俗话说","俗話說","súhuà shuō","Como dice el refrán",["Comúnmente se dice"]],["俗语","俗語","súyǔ","Refrán",["Proverbio"]],["诉苦","訴苦","sùkǔ","Quejarse",["Lamentar"]],["诉说","訴說","sùshuō","Contar",["Relatar"]],["诉讼","訴訟","sùsòng","Demanda",["Juicio"]],["素",null,"sù","Crudo, blanco",["Vegetariano","Esencia"]],["素不相识","素不相識","sùbùxiāngshí","Extraños",["Nunca se han visto"]],["素材",null,"sùcái","Material",["Recurso"]],["素描",null,"sùmiáo","Boceto",["Dibujo a lápiz"]],["素食",null,"sùshí","Vegetarianos",null],["素养","素養","sùyǎng","Formación",["Cultura"]],["塑造",null,"sùzào","Moldear",["Formar"]],["蒜",null,"suàn","Ajo",["Diente de ajo"]],["算计","算計","suànjì","Calcular",["Tramar"]],["算盘","算盤","suànpán","Ábaco",["Calculadora"]],["算账","算賬","suànzhàng","Hacer cuentas",["Liquidar"]],["虽说","雖說","suīshuō","Aunque",["Si bien"]],["随处可见","隨處可見","suíchù kě jiàn","Visible en todas partes",["Omnipresente"]],["随大溜","隨大溜","suí dàliù","Seguir la corriente",["Conformarse"]],["随机","隨機","suíjī","Aleatorio",["Fortuito"]],["随即","隨即","suíjí","Inmediatamente",["Luego"]],["随身","隨身","suíshēn","Personal",["Consigo mismo"]],["随时随地","隨時隨地","suíshí-suídì","En cualquier momento y lugar",["Siempre y cuando"]],["随心所欲","隨心所欲","suíxīnsuǒyù","Como se quiera",["A voluntad"]],["遂心",null,"suìxīn","Conforme a los deseos",["Satisfactorio"]],["隧道",null,"suìdào","Túnel",["Galería"]],["损","損","sǔn","Resta",null],["损坏","損壞","sǔnhuài","Dañar",["Romper"]],["损人利己","損人利己","sǔnrén-lìjǐ","Perjudicar a otros para beneficiarse",["Egoísta"]],["损伤","損傷","sǔnshāng","Dañar",["Perjudicar"]],["缩","縮","suō","Encoger",["Retraer"]],["缩水","縮水","suōshuǐ","Encoger",["Reducirse"]],["缩影","縮影","suōyǐng","缩影",["Reflejo"]],["所属","所屬","suǒshǔ","Perteneciente",["Correspondiente"]],["所谓","所謂","suǒwèi","Llamado",["Supuestamente"]],["所作所为","所作所為","suǒzuò-suǒwéi","Acciones hechas",["Comportamiento"]],["索赔","索賠","suǒpéi","Reclamar indemnización",["Demandar"]],["索取",null,"suǒqǔ","Exigir",["Pedir"]],["索性",null,"suǒxìng","Mejor",["Directamente"]],["锁定","鎖定","suǒdìng","Bloquear",["Fijar"]],["他人",null,"tārén","Otra persona",["Otros"]],["塌",null,"tā","Derrumbarse",["Hundirse"]],["踏上",null,"tàshang","Poner el pie en",["Pisar"]],["胎",null,"tāi","Feto",["Embrión"]],["胎儿","胎兒","tāi'ér","Feto",["Nonato"]],["台球",null,"táiqiú","Billar",["Ping-pong"]],["太极","太極","tàijí","太极",["Taichi"]],["太极拳","太極拳","tàijíquán","太极拳",["太极","Taichi"]],["太平",null,"tàipíng","Pacífico",["Tranquilo"]],["泰斗",null,"tàidǒu","Maestro",["Autoridad"]],["贪","貪","tān","Codiciar",["Desechar"]],["贪婪","貪婪","tānlán","Codicioso",["Avaricioso"]],["贪玩儿","貪玩兒","tānwánr","Juguetón",["Divertirse"]],["贪污","貪污","tānwū","Corrupto",["Sobornar"]],["摊","攤","tān","Tender",["Establecer"]],["瘫","癱","tān","Paralizar",["Inmovilizar"]],["瘫痪","癱瘓","tānhuàn","Paralizado",["Inmovilizado"]],["坛","壇","tán","Altar",["Foro"]],["谈不上","談不上","tán bu shàng","No merece",["Ni hablar"]],["谈到","談到","tándào","Hablar de",["Mencionar"]],["谈论","談論","tánlùn","Conversar",["Debatir"]],["谈起","談起","tánqǐ","Mencionar",["Hablar de"]],["弹性","彈性","tánxìng","Elasticidad",["Flexibilidad"]],["痰",null,"tán","Flema",["Moco"]],["坦白",null,"tǎnbái","Honesto",["Franco"]],["坦诚","坦誠","tǎnchéng","Franco",["Sincero"]],["坦克",null,"tǎnkè","Tanque",["Blindado"]],["坦然",null,"tǎnrán","Tranquilo",["Sereno"]],["坦率",null,"tǎnshuài","Sincero",["Directo"]],["毯子",null,"tǎnzi","Manta",["Edredón"]],["炭",null,"tàn","Carbón",["Vegetal"]],["探",null,"tàn","Explorar",["Investigar"]],["探测","探測","tàncè","Detectar",["Explorar"]],["探亲","探親","tànqīn","Visitar familiares",["Visitar a parientes"]],["探求",null,"tànqiú","Buscar",["Investigar"]],["探望",null,"tànwàng","Visitar",["Inspeccionar"]],["探险","探險","tànxiǎn","Aventurarse",["Explorar"]],["碳",null,"tàn","Carbono",["Elemento"]],["汤圆","湯圓","tāngyuán","Bollo de arroz",["Sopa dulce"]],["堂",null,"táng","Habitación grande para un propósito específico",["Del mismo clan"]],["糖果",null,"tángguǒ","Caramelo",["Dulce"]],["糖尿病",null,"tángniàobìng","Diabetes",["Enfermedad"]],["倘若",null,"tǎngruò","Si",["En caso de"]],["淌",null,"tǎng","Fluir",["Derramarse"]],["烫","燙","tàng","Quemar",["Caliente"]],["掏钱","掏錢","tāo qián","Pagar",["Dinero"]],["滔滔不绝","滔滔不絕","tāotāo-bùjué","Locuaz",["Hablar mucho"]],["逃避",null,"táobì","Huir",["Eludir"]],["逃生",null,"táoshēng","Sobrevivir",["Escapar"]],["逃亡",null,"táowáng","Huir",["Fugarse"]],["陶瓷",null,"táocí","Cerámica",["Porcelana"]],["陶冶",null,"táoyě","Cultivar",["Formar"]],["陶醉",null,"táozuì","Encantar",["Fascinar"]],["淘",null,"táo","Buscar",["Buscar tesoros"]],["淘气","淘氣","táoqì","Travieso",["Bromista"]],["淘汰",null,"táotài","Eliminar",["Depurar"]],["讨","討","tǎo","Discutir o estudiar",["Casarse (con una mujer)","Denunciar o condenar"]],["讨好","討好","tǎohǎo","Halagar",["Cautivar"]],["讨价还价","討價還價","tǎojià-huánjià","Regatear",["Negociar"]],["讨人喜欢","討人喜歡","tǎo rén xǐhuan","Encantador",["Simpático"]],["特产","特產","tèchǎn","Especialidad",["Producto local"]],["特长","特長","tècháng","Talento",["Habilidad"]],["特例",null,"tèlì","Excepción",["Particularidad"]],["特权","特權","tèquán","Privilegio",["Privilego","Ventaja"]],["特邀",null,"tèyāo","Invitar",["Convidar"]],["特制","特製","tèzhì","Especial",["Medido"]],["特质","特質","tèzhì","Característica",["Rasgo"]],["腾","騰","téng","Ascender",["Elevar"]],["藤椅",null,"téngyǐ","Silla de mimbre",["Bambú"]],["剔除",null,"tīchú","Eliminar",["Quitar"]],["梯子",null,"tīzi","Escalera",["Escalón"]],["提拔",null,"tíbá","Promover",["Ascender"]],["提炼","提煉","tíliàn","Extraer",["Refinar"]],["提名",null,"tímíng","Nominar",["Proponer"]],["提速",null,"tísù","Acelerar",["Aumentar velocidad"]],["提心吊胆","提心吊膽","tíxīn-diàodǎn","Nervioso",["Ansioso"]],["提议","提議","tíyì","Proponer",["Sugerir"]],["提早",null,"tízǎo","Adelantar",["Anticipar"]],["体谅","體諒","tǐliàng","Comprender",["Perdonar"]],["体面","體面","tǐmiàn","Digno",["Respetable"]],["体能","體能","tǐnéng","Físico",["Capacidad"]],["体贴","體貼","tǐtiē","Atento",["Cuidadoso"]],["体温","體溫","tǐwēn","Temperatura",["Corporal"]],["体系","體系","tǐxì","Sistema",["Estructura"]],["体制","體制","tǐzhì","Sistema",["Organización"]],["体质","體質","tǐzhì","Constitución",["Físico"]],["剃",null,"tì","Afeitar",["Cortar"]],["替换","替換","tìhuàn","Reemplazar",["Sustituir"]],["替身",null,"tìshēn","Doble",["Sustituto"]],["天长地久","天長地久","tiāncháng-dìjiǔ","Eterno",["Para siempre"]],["天地",null,"tiāndì","Cielo y tierra",["Mundo"]],["天鹅","天鵝","tiān'é","Cisne",["Blanco"]],["天分",null,"tiānfèn","Talento",["Don"]],["天赋","天賦","tiānfù","Talento",["Don"]],["天经地义","天經地義","tiānjīng-dìyì","Obvio",["Justo"]],["天平",null,"tiānpíng","Balanza",["Equilibrio"]],["天桥","天橋","tiānqiáo","Puente elevado",["Pasarela"]],["天生",null,"tiānshēng","Innato",["Natural"]],["天使",null,"tiānshǐ","Ángel",["Mensajero"]],["天线","天線","tiānxiàn","Antena",["Receptor"]],["天性",null,"tiānxìng","Naturaleza",["Instinto"]],["天主教",null,"Tiānzhǔjiào","Catolicismo",["Religión"]],["添加",null,"tiānjiā","Agregar",["Añadir"]],["甜美",null,"tiánměi","Dulce",["Agradable"]],["甜蜜",null,"tiánmì","Dulce",["Encantador"]],["甜头","甜頭","tiántou","Beneficio",["Recompensa"]],["填补","填補","tiánbǔ","Llenar",["Completar"]],["填充",null,"tiánchōng","Rellenar",["Llenar"]],["填写","填寫","tiánxiě","Completar (un formulario)",null],["舔",null,"tiǎn","Lamer",["Humedecer"]],["挑剔",null,"tiāoti","Exigente",["Crítico"]],["条款","條款","tiáokuǎn","Cláusula",["Artículo"]],["条例","條例","tiáolì","Reglamento",["Norma"]],["条约","條約","tiáoyuē","Tratado",["Acuerdo"]],["调侃","調侃","tiáokǎn","Burlar",["Mofar"]],["调控","調控","tiáokòng","Regular",["Controlar"]],["调料","調料","tiáoliào","Condimento",["Sazón"]],["调试","調試","tiáoshì","Ajustar",["Configurar"]],["挑起",null,"tiǎoqǐ","Provocar",["Iniciar"]],["挑衅","挑釁","tiǎoxìn","Provocar",["Desafiar"]],["跳槽",null,"tiàocáo","Cambiar de trabajo",["Cambiar de empleo"]],["跳动","跳動","tiàodòng","Latir",["Latido"]],["跳伞","跳傘","tiàosǎn","Paracaidismo",["Saltar"]],["跳跃","跳躍","tiàoyuè","Saltar",["Brincar"]],["贴近","貼近","tiējìn","Cercano",["Próximo"]],["贴切","貼切","tiēqiè","Apropiado",["Adecuado"]],["帖子",null,"tiězi","Mensaje",["Publicación"]],["听从","聽從","tīngcóng","Obedecer",["Seguir"]],["听话","聽話","tīnghuà","Obedecer",null],["停泊",null,"tíngbó","Atracar",null],["停车位","停車位","tíngchēwèi","Estacionamiento",null],["停电","停電","tíngdiàn","Cortar luz",null],["停顿","停頓","tíngdùn","Pausar",null],["停放",null,"tíngfàng","Aparcar",null],["停业","停業","tíngyè","Cerrar negocio",null],["通畅","通暢","tōngchàng","Fluido",null],["通车","通車","tōngchē","Circular vehículo",null],["通风","通風","tōngfēng","Ventilar",null],["通告",null,"tōnggào","Notificar/aviso",null],["通缉","通緝","tōngjī","Buscar captura",null],["通顺","通順","tōngshùn","Coherente",null],["通俗",null,"tōngsú","Popular",null],["通通",null,"tōngtōng","Todos",null],["通往",null,"tōngwǎng","Conduce a",null],["通宵",null,"tōngxiāo","Toda la noche",null],["通行证","通行證","tōngxíngzhèng","Pase",null],["同伴",null,"tóngbàn","Compañero",null],["同步",null,"tóngbù","Sincronizar",null],["同等",null,"tóngděng","Igual",null],["同感",null,"tónggǎn","Sentir igual",null],["同伙",null,"tónghuǒ","Asociarse/compinche",null],["同类","同類","tónglèi","Mismo tipo/especie",null],["同盟",null,"tóngméng","Aliarse/alianza",null],["同年",null,"tóngnián","Mismo año",null],["同人",null,"tóngrén","Mismo nombre",null],["同志",null,"tóngzhì","Camarada",null],["同舟共济","同舟共濟","tóngzhōu-gòngjì","Ayudarse mutuamente",null],["铜","銅","tóng","Cobre",null],["统筹","統籌","tǒngchóu","Coordinar",null],["统统","統統","tǒngtǒng","Todos",null],["统治","統治","tǒngzhì","Gobernar",null],["捅",null,"tǒng","Empujar",null],["桶",null,"tǒng","Cubo",null],["筒",null,"tǒng","Tubo",null],["痛心",null,"tòngxīn","Doloroso",null],["偷看",null,"tōukàn","Espiar",null],["偷窥","偷窺","tōukuī","Acechar",null],["偷懒","偷懶","tōulǎn","Holgazanear",null],["头部","頭部","tóubù","Cabeza",null],["头顶","頭頂","tóudǐng","Parte superior cabeza",null],["头号","頭號","tóuhào","Principal",null],["头条","頭條","tóutiáo","Titular",null],["头头是道","頭頭是道","tóutóu-shìdào","Lógico",null],["头衔","頭銜","tóuxián","Título",null],["头晕","頭暈","tóuyūn","Marearse",null],["投奔",null,"tóubèn","Refugiarse",null],["投稿",null,"tóugǎo","Enviar artículo",null],["投机","投機","tóujī","Oportuno/especular",null],["投射",null,"tóushè","Proyectar",null],["投身",null,"tóushēn","Dedicarse",null],["投降",null,"tóuxiáng","Rendirse",null],["透彻","透徹","tòuchè","Profundo",null],["透过","透過","tòuguò","透过",null],["透气","透氣","tòuqì","Ventilar",null],["透支",null,"tòuzhī","Sobrepasar",null],["凸",null,"tū","Saliente",null],["凸显","凸顯","tūxiǎn","Destacar",null],["秃","禿","tū","Calvo",null],["突发","突發","tūfā","Ocurrir repentinamente",null],["突击","突擊","tūjī","Asaltar",null],["突破口",null,"tūpòkǒu","Punto débil",null],["突如其来","突如其來","tūrú-qílái","Repentino",null],["图表","圖表","túbiǎo","Gráfico",null],["图像","圖像","túxiàng","Imagen",null],["图形","圖形","túxíng","Figura",null],["图纸","圖紙","túzhǐ","Plano",null],["徒步",null,"túbù","Caminando",null],["涂","塗","tú","Untar",null],["屠杀","屠殺","túshā","Masacrar",null],["土匪",null,"tǔfěi","Bandido",null],["土壤",null,"tǔrǎng","Suelo",null],["土生土长","土生土長","tǔshēng-tǔzhǎng","Autóctono",null],["团伙","團伙","tuánhuǒ","Banda",null],["团聚","團聚","tuánjù","Reunirse",null],["团员","團員","tuányuán","Miembro",null],["团圆","團圓","tuányuán","Reunirse familia",null],["推测","推測","tuīcè","Deducir",null],["推辞","推辭","tuīcí","Rechazar",null],["推断","推斷","tuīduàn","Concluir",null],["推翻",null,"tuīfān","Invalidar",null],["推荐","推薦","tuījiàn","Recomendó",["Recomendo","Sugirió"]],["推理",null,"tuīlǐ","Razonar",null],["推敲",null,"tuīqiāo","Deliberar",null],["推算",null,"tuīsuàn","Calcular",null],["推卸",null,"tuīxiè","Evadir",null],["推选","推選","tuīxuǎn","Elegir",null],["推移",null,"tuīyí","(el tiempo) transcurrir",["Desarrollarse"]],["颓废","頹廢","tuífèi","Decadente",null],["退回",null,"tuìhuí","Devolver",null],["退却","退卻","tuìquè","Retroceder",null],["退让","退讓","tuìràng","Ceder",null],["退缩","退縮","tuìsuō","Retraerse",null],["退休金",null,"tuìxiūjīn","Pensión",null],["退学","退學","tuìxué","Abandonar estudios",null],["退役",null,"tuìyì","Retirarse",null],["屯",null,"tún","Aldea",null],["托付",null,"tuōfù","Confiar",null],["拖累",null,"tuōlěi","Perjudicar",null],["拖欠",null,"tuōqiàn","Adeudar",null],["拖延",null,"tuōyán","Posponer",null],["脱节","脫節","tuōjié","Desconectar",null],["脱口而出","脫口而出","tuōkǒu'érchū","Decir sin pensar",null],["脱落","脫落","tuōluò","Desprender",null],["脱身","脫身","tuōshēn","Liberarse",null],["脱颖而出","脫穎而出","tuōyǐng'érchū","Destacar",null],["驮","馱","tuó","Cargar",null],["妥",null,"tuǒ","Adecuado",null],["妥当","妥當","tuǒdàng","Correcto",null],["妥善",null,"tuǒshàn","Apropiado",["Bien organizado"]],["妥协","妥協","tuǒxié","Transigir",null],["拓宽","拓寬","tuòkuān","Ampliar",null],["拓展",null,"tuòzhǎn","Expandir",null],["唾液",null,"tuòyè","Saliva",null],["挖掘",null,"wājué","Excavar",null],["挖苦",null,"wāku","Sarcasmo",null],["瓦",null,"wǎ","Teja",["Watt (瓦特)"]],["歪",null,"wāi","Torcido",null],["歪曲",null,"wāiqū","Distorsionar",null],["外表",null,"wàibiǎo","Apariencia",null],["外公",null,"wàigōng","Abuelo materno",null],["外行",null,"wàiháng","Inexperto",null],["外号","外號","wàihào","Apodo",null],["外籍",null,"wàijí","Nacionalidad extranjera",null],["外贸","外貿","wàimào","Comercio exterior",["Comercio internacional"]],["外貌",null,"wàimào","Apariencia física",["Rostro"]],["外婆",null,"wàipó","Abuela materna",["Abuela"]],["外企",null,"wàiqǐ","Empresa extranjera",["Compañía extranjera"]],["外星人",null,"wàixīngrén","Extraterrestre",["Alienígena"]],["外形",null,"wàixíng","Forma exterior",["Apariencia"]],["外援",null,"wàiyuán","Ayuda externa",["Suplemento externo"]],["丸",null,"wán","Píldora/bolita",["Pastilla"]],["完备","完備","wánbèi","Completo",null],["完毕","完畢","wánbì","Terminar",["Concluir"]],["完蛋",null,"wándàn","Estar perdido",["Hundirse"]],["完好",null,"wánhǎo","Intacto",["Sano"]],["玩耍",null,"wánshuǎ","Jugar",["Divertirse"]],["玩意儿","玩意兒","wányìr","Cosa/juguete",["Objeto"]],["顽固","頑固","wángù","Terco",["Duro de cabeza"]],["挽",null,"wǎn","Detener",["Retener"]],["挽回",null,"wǎnhuí","Recuperar",["Salvar"]],["挽救",null,"wǎnjiù","Salvar",["Rescatar"]],["晚间","晚間","wǎnjiān","Noche",["Atardecer"]],["晚年",null,"wǎnnián","Vejez",["Últimos años"]],["晚期",null,"wǎnqī","Etapa final",["Fase tardía"]],["惋惜",null,"wǎnxī","Lamentar",["Doler"]],["万分","萬分","wànfēn","Extremadamente",["Inmensamente"]],["万古长青","萬古長青","wàngǔ-chángqīng","Eternidad",["Para siempre"]],["万能","萬能","wànnéng","Todopoderoso",["Versátil"]],["万万","萬萬","wànwàn","Absolutamente",["Definitivamente"]],["万无一失","萬無一失","wànwú-yīshī","Infalible",["Seguro"]],["汪洋",null,"wāngyáng","Inmenso",["Vasto"]],["亡羊补牢","亡羊補牢","wángyáng-bǔláo","Aprender a tiempo",["Corregir errores"]],["王国","王國","wángguó","Reino",["Imperio"]],["王牌",null,"wángpái","As",["Arma secreta"]],["网点","網點","wǎngdiǎn","Sucursal",["Punto de venta"]],["网民","網民","wǎngmín","Internauta",["Usuario de internet"]],["往常",null,"wǎngcháng","De costumbre",["Acostumbrado"]],["往返",null,"wǎngfǎn","Viajar de ida y vuelta",["Ir y venir"]],["往日",null,"wǎngrì","Pasado",["Antes"]],["往事",null,"wǎngshì","Recuerdos",["Hechos pasados"]],["妄想",null,"wàngxiǎng","Imaginar",["Soñar"]],["忘不了",null,"wàng bu liǎo","Inolvidable",["Imposible olvidar"]],["忘掉",null,"wàngdiào","Olvidar",["Dejar de recordar"]],["旺",null,"wàng","Próspero",["Floreciente"]],["旺季",null,"wàngjì","Temporada alta",["Época buena"]],["旺盛",null,"wàngshèng","Vigoroso",["Fuerte"]],["望",null,"wàng","Esperar",["Mirar hacia","Tener esperanza"]],["望远镜","望遠鏡","wàngyuǎnjìng","Telescopio",["Lente"]],["危及",null,"wēijí","Poner en peligro",["Amenazar"]],["危急",null,"wēijí","Crítico",["Urgente"]],["威风","威風","wēifēng","Poderío",["Majestuosidad"]],["威力",null,"wēilì","Poder",["Fuerza"]],["威慑","威懾","wēishè","Intimidar",["Amedrentar"]],["威信",null,"wēixìn","Autoridad",["Prestigio"]],["微不足道",null,"wēibùzúdào","Insignificante",["Minúsculo"]],["微观","微觀","wēiguān","Microscópico",["Detallado"]],["微妙",null,"wēimiào","Sutil",["Delicado"]],["微弱",null,"wēiruò","Débil",["Tenue"]],["微型",null,"wēixíng","Miniatura",["Pequeño"]],["为人","為人","wéirén","Comportamiento",["Ser humano"]],["违背","違背","wéibèi","Violar",["Contravenir"]],["违约","違約","wéiyuē","Incumplir contrato",["Romper promesa"]],["违章","違章","wéizhāng","Infringir normas",["Violar reglas"]],["围墙","圍牆","wéiqiáng","Valla",["Muro"]],["唯",null,"wéi","Solo",["Unicamente"]],["唯独","唯獨","wéidú","Únicamente",["Solamente"]],["伪造","偽造","wěizào","Falsificar",["Imitar"]],["伪装","偽裝","wěizhuāng","Disfrazar",["Fingir"]],["尾气","尾氣","wěiqì","Gases de escape",["Emisiones"]],["尾声","尾聲","wěishēng","Final",["Remate"]],["纬度","緯度","wěidù","Latitud",["Paralelo"]],["委屈",null,"wěiqu","Sentirse agraviado",["Dolido"]],["委婉",null,"wěiwǎn","Delicado",["Suave"]],["委员","委員","wěiyuán","Miembro (de un comité)",null],["委员会","委員會","wěiyuánhuì","Comité",["Comisión"]],["萎缩","萎縮","wěisuō","Encoger",["Mermar"]],["卫视","衛視","wèishì","Televisión satelital",["Canal satelital"]],["未",null,"wèi","Aún no",["No haber"]],["未成年人",null,"wèichéngniánrén","Menor de edad",["Joven"]],["未经","未經","wèijīng","Sin pasar por",["No haber experimentado"]],["未免",null,"wèimiǎn","Un poco",["Quizás"]],["未知数","未知數","wèizhīshù","Incógnita",["Desconocido"]],["位子",null,"wèizi","Asiento",["Lugar"]],["味精",null,"wèijīng","Glutamato monosódico",["Saborizante"]],["畏惧","畏懼","wèijù","Temer",["Atemorizarse"]],["畏缩","畏縮","wèisuō","Retroceder",["Dudar"]],["胃口",null,"wèikǒu","Apetito",["Ganas de comer"]],["喂养","餵養","wèiyǎng","Alimentar",["Crías"]],["慰劳","慰勞","wèiláo","Recompensar",["Agradecer"]],["温度计","溫度計","wēndùjì","Termómetro",["Medidor de temperatura"]],["温泉","溫泉","wēnquán","Manantial caliente",["Balneario"]],["温柔","溫柔","wēnróu","Suave",["Dulce"]],["温室","溫室","wēnshì","Invernadero",["Casa de plantas"]],["温习","溫習","wēnxí","Repasar",["Estudiar de nuevo"]],["温馨","溫馨","wēnxīn","Acogedor",["Cálido"]],["瘟疫",null,"wēnyì","Plaga",["Epidemia"]],["文",null,"wén","Lengua",["Escritura","Cultura"]],["文具",null,"wénjù","Material de oficina",["Utensilios de escritura"]],["文科",null,"wénkē","Humanidades",["Ciencias sociales"]],["文盲",null,"wénmáng","Analfabeto",["Iletrado"]],["文凭","文憑","wénpíng","Título",["Diploma"]],["文人",null,"wénrén","Intelectual",["Erudito"]],["文物",null,"wénwù","Reliquia",["Antigüedad"]],["文献","文獻","wénxiàn","Documento",["Fuente"]],["文雅",null,"wényǎ","Elegante",["Refinado"]],["闻名","聞名","wénmíng","Ser famoso",["Conocerse"]],["蚊帐","蚊帳","wénzhàng","Mosquitero",["Red contra mosquitos"]],["蚊子",null,"wénzi","Mosquito",["Insecto"]],["吻",null,"wěn","Beso",["Besar"]],["吻合",null,"wěnhé","Coincidir",["Concordar"]],["紊乱","紊亂","wěnluàn","Desordenado",["Caótico"]],["稳固","穩固","wěngù","Estable",["Sólido"]],["稳健","穩健","wěnjiàn","Firme",["Constante"]],["稳妥","穩妥","wěntuǒ","Seguro",["Fiable"]],["稳重","穩重","wěnzhòng","Sereno",["Calmado"]],["问卷","問卷","wènjuàn","Encuesta",["Cuestionario"]],["问世","問世","wènshì","Publicarse",["Salir a la luz"]],["窝","窩","wō","Nido",["Agujero"]],["卧","臥","wò","Acostarse",["Recostarse"]],["污秽","污穢","wūhuì","Sucio",["Inmundo"]],["巫婆",null,"wūpó","Bruja",["Hechicera"]],["呜咽","嗚咽","wūyè","Sollozar",["Llorar"]],["屋顶","屋頂","wūdǐng","Techo",["Cubierta"]],["无比","無比","wúbǐ","Incomparable",["Único"]],["无不","無不","wúbù","Sin excepción",["Siempre"]],["无偿","無償","wúcháng","Gratuito",["Sin costo"]],["无敌","無敵","wúdí","Invencible",["Imbatible"]],["无恶不作","無惡不作","wú'è-bùzuò","Malvado",["Sinvergüenza"]],["无非","無非","wúfēi","Simplemente",["En realidad","Únicamente"]],["无辜","無辜","wúgū","Inocente",["Sin culpa"]],["无故","無故","wúgù","Sin motivo",["Injustificadamente"]],["无关紧要","無關緊要","wúguān-jǐnyào","Insignificante",["Trivial"]],["无话可说","無話可說","wúhuà-kěshuō","Sin palabras",["Mudo"]],["无济于事","無濟於事","wújìyúshì","Inútil",["De nada sirve"]],["无家可归","無家可歸","wújiā-kěguī","Sin hogar",["Sin techo"]],["无精打采","無精打采","wújīng-dǎcǎi","Apático",["Sin energía"]],["无可奉告","無可奉告","wúkěfènggào","Sin comentarios",["Reservado"]],["无可厚非","無可厚非","wúkěhòufēi","Comprensible",["Justificable"]],["无可奈何","無可奈何","wúkěnàihé","Inevitable",["Sin remedio"]],["无理","無理","wúlǐ","Grosero",["Impertinente"]],["无力","無力","wúlì","Sin fuerza",["Débil"]],["无论如何","無論如何","wúlùn-rúhé","De cualquier modo",["En todo caso"]],["无能","無能","wúnéng","Incapaz",["Inútil"]],["无能为力","無能為力","wúnéngwéilì","Impotente",["Indefenso"]],["无情","無情","wúqíng","Despiadado",["Frío"]],["无情无义","無情無義","wúqíng-wúyì","Desleal",["Traicionero"]],["无穷","無窮","wúqióng","Infinito",["Ilimitado"]],["无私","無私","wúsī","Desinteresado",["Altruista"]],["无所事事","無所事事","wúsuǒshìshì","Ocioso",["Perezoso"]],["无所作为","無所作為","wúsuǒzuòwéi","Pasivo",["Inactivo"]],["无条件","無條件","wútiáojiàn","Incondicional",["Sin restricciones"]],["无微不至","無微不至","wúwēi-bùzhì","Atento",["Minucioso"]],["无线","無線","wúxiàn","Inalámbrico",["Sin cables"]],["无线电","無線電","wúxiàndiàn","Radio",["Comunicación inalámbrica"]],["无形","無形","wúxíng","No tiene forma",null],["无形中","無形中","wúxíngzhōng","Inconscientemente",["Indirectamente"]],["无须","無須","wúxū","No es necesario",["Opcional"]],["无意","無意","wúyì","Accidentalmente",["Sin intención"]],["无忧无虑","無憂無慮","wúyōu-wúlǜ","Despreocupado",["Feliz"]],["无缘","無緣","wúyuán","Sin conexión",["Sin oportunidad"]],["无知","無知","wúzhī","Ignorante",["Inculto"]],["无足轻重","無足輕重","wúzú-qīngzhòng","Insignificante",["Trivial"]],["五花八门","五花八門","wǔhuā-bāmén","Variado",["Diverso"]],["五星级","五星級","wǔxīngjí","De cinco estrellas",["De lujo"]],["武力",null,"wǔlì","Fuerza",["Poder militar"]],["武装","武裝","wǔzhuāng","Armamento",["Militarizar"]],["侮辱",null,"wǔrǔ","Insultar",["Ofender"]],["捂",null,"wǔ","Tapar",["Cubrir"]],["舞厅","舞廳","wǔtīng","Discoteca",["Sala de baile"]],["勿",null,"wù","No (imperativo: 请勿 = se prohíbe)",null],["务必","務必","wùbì","Necesariamente",["Obligatoriamente"]],["务实","務實","wùshí","Práctico",["Realista"]],["物流",null,"wùliú","Logística",["Transporte"]],["物体","物體","wùtǐ","Objeto",["Cosa"]],["物证","物證","wùzhèng","Prueba material",["Evidencia física"]],["物资","物資","wùzī","Suministros",["Recursos"]],["误差","誤差","wùchā","Error",["Desviación"]],["误导","誤導","wùdǎo","Engañar",["Confundir"]],["误区","誤區","wùqū","Error conceptual",["Falsa idea"]],["雾","霧","wù","Niebla",["Bruma"]],["吸纳","吸納","xīnà","Absorber",["Incorporar"]],["吸取",null,"xīqǔ","Aprender",["Extraer"]],["昔日",null,"xīrì","Antaño",["Antes"]],["息息相关","息息相關","xīxī-xiāngguān","Íntimamente relacionado",["Conectado"]],["稀",null,"xī","Escaso",["Raro"]],["稀罕",null,"xīhan","Raro",["Inusual"]],["稀奇",null,"xīqí","Extraño",["Peculiar"]],["稀少",null,"xīshǎo","Escaso",["Poco"]],["锡","錫","xī","Estaño",["Metal"]],["熙熙攘攘",null,"xīxī-rǎngrǎng","Concurrido",["Abarrotado"]],["熄火",null,"xīhuǒ","Apagar el motor",["Parar"]],["膝盖","膝蓋","xīgài","Rodilla",["Articulación"]],["嬉笑",null,"xīxiào","Reír",["Bromear"]],["习俗","習俗","xísú","Costumbre",["Tradición"]],["席",null,"xí","Asiento",["Banquete","Lugar (en una asamblea)"]],["席位",null,"xíwèi","Asiento",["Lugar"]],["袭击","襲擊","xíjī","Atacar",["Asaltar"]],["媳妇","媳婦","xífu","Nuera",["Esposa"]],["洗涤剂","洗滌劑","xǐdíjì","Detergente",["Limpiador"]],["洗礼","洗禮","xǐlǐ","Bautismo",["Purificación"]],["喜出望外",null,"xǐchūwàngwài","Sorpresivamente feliz",["Encantado"]],["喜好",null,"xǐhào","Gusto",["Afición"]],["喜酒",null,"xǐjiǔ","Fiesta de boda",["Celebración nupcial"]],["喜怒哀乐","喜怒哀樂","xǐ-nù-āi-lè","Emociones",["Sentimientos"]],["喜庆","喜慶","xǐqìng","Festivo",["Alegre"]],["喜事",null,"xǐshì","Evento feliz",["Boda"]],["喜糖",null,"xǐtáng","Caramelos de boda",["Dulces nupciales"]],["喜洋洋",null,"xǐyángyáng","Alegre",["Feliz"]],["喜悦","喜悅","xǐyuè","Alegría",["Felicidad"]],["细腻","細膩","xìnì","Delicado",["Sutil"]],["细微","細微","xìwēi","Pequeño",["Insignificante"]],["细心","細心","xìxīn","Meticuloso",["Cuidadoso","Observador"]],["虾","蝦","xiā","Camarón",["Gamba"]],["瞎",null,"xiā","Ciego",["Erroneamente"]],["侠义","俠義","xiáyì","Caballeresco",["Heroico"]],["峡谷","峽谷","xiágǔ","Cañón",["Desfiladero"]],["狭隘","狹隘","xiá'ài","Estrecho",["Limitado"]],["狭小","狹小","xiáxiǎo","Pequeño",["Reducido"]],["狭窄","狹窄","xiázhǎi","Estrecho",["Angosto"]],["下场","下場","xiàchǎng","Resultado",["Destino"]],["下跌",null,"xiàdiē","Caer",["Bajar"]],["下岗","下崗","xiàgǎng","Perder el empleo",["Desemplearse"]],["下功夫",null,"xià gōngfu","Esforzarse",["Dedicarse"]],["下海",null,"xiàhǎi","Iniciar negocio",["Aventurarse"]],["下级","下級","xiàjí","Subordinado",["Inferior"]],["下决心","下決心","xià juéxīn","Decidirse",["Comprometerse"]],["下令",null,"xiàlìng","Ordenar",["Mandar"]],["下落",null,"xiàluò","Paradero",["Destino"]],["下期",null,"xià qī","Próximo número",["Siguiente edición"]],["下棋",null,"xiàqí","Jugar ajedrez",["Partida"]],["下山",null,"xiàshān","Bajar de la montaña",["Descender"]],["下手",null,"xiàshǒu","Empezar",["Atacar"]],["下属","下屬","xiàshǔ","Subordinado",["Empleado"]],["下台","下臺","xiàtái","Renunciar",["Retirarse"]],["下调","下調","xiàtiáo","Reducir",["Disminuir"]],["下乡","下鄉","xiàxiāng","Ir al campo",["Ruralizar"]],["下旬",null,"xiàxún","Última decena",["Fin de mes"]],["下一代",null,"xià yī dài","Próxima generación",["Descendientes"]],["下意识","下意識","xiàyìshí","Inconsciente",["Instintivo"]],["下游",null,"xiàyóu","Río abajo",["Sector final"]],["下坠","下墜","xiàzhuì","Caer",["Descender"]],["吓唬","嚇唬","xiàhu","Asustar",["Intimidar"]],["吓人","嚇人","xiàrén","Aterrador",["Espantoso"]],["夏令营","夏令營","xiàlìngyíng","Campamento de verano",["Colonia"]],["仙鹤","仙鶴","xiānhè","Grulla ave",["Ave elegante"]],["仙女",null,"xiānnǚ","Hada",["Ninfa"]],["先例",null,"xiānlì","Precedente",["Ejemplo"]],["先天",null,"xiāntiān","Innato",["Congénito"]],["纤维","纖維","xiānwéi","Fibra",["Hilo"]],["掀",null,"xiān","Levantar",["Descubrir"]],["掀起",null,"xiānqǐ","Levantar",["Iniciar"]],["鲜活","鮮活","xiānhuó","Fresco",["Vivo"]],["鲜美","鮮美","xiānměi","Sabroso/delicado",null],["鲜血","鮮血","xiānxuè","Sangre fresca",null],["弦",null,"xián","Cuerda de instrumento",null],["衔接","銜接","xiánjiē","Unir/conectar",null],["嫌弃","嫌棄","xiánqì","/despreciar",null],["嫌疑",null,"xiányí","Sospecha",null],["显而易见","顯而易見","xiǎn'éryìjiàn","Obvio",null],["显赫","顯赫","xiǎnhè","/ilustre",null],["显示器","顯示器","xiǎnshìqì","Pantalla",null],["显现","顯現","xiǎnxiàn","Aparecer",null],["显眼","顯眼","xiǎnyǎn","/notorio",null],["现成","現成","xiànchéng","Hecho",null],["现任","現任","xiànrèn","/actual",null],["现行","現行","xiànxíng","/vigente",null],["限",null,"xiàn","Limitar",null],["限定",null,"xiàndìng","Fijar límites",null],["限度",null,"xiàndù","Límite",null],["限于","限於","xiànyú","Restringirse a",null],["线条","線條","xiàntiáo","Línea",null],["宪法","憲法","xiànfǎ","Constitución",null],["陷",null,"xiàn","/caer",null],["陷阱",null,"xiànjǐng","/trampa",null],["馅儿","餡兒","xiànr","Relleno",null],["羡慕","羨慕","xiànmù","Envidiar",["Admirar"]],["献血","獻血","xiànxiě","Donar sangre",null],["腺",null,"xiàn","Glándula",null],["乡亲","鄉親","xiāngqīn","Paisanos",null],["乡下","鄉下","xiāngxia","/campo",null],["相伴",null,"xiāngbàn","Acompañar",null],["相比之下",null,"xiāngbǐ zhī xià","En comparación",null],["相差",null,"xiāngchà","Diferir",null],["相传","相傳","xiāngchuán","Transmitirse",null],["相当于","相當於","xiāngdāngyú","Equivaler a",null],["相对","相對","xiāngduì","/relativo",null],["相对而言","相對而言","xiāngduì-éryán","Relativamente",null],["相辅相成","相輔相成","xiāngfǔ-xiāngchéng","Complementarse",null],["相继","相繼","xiāngjì","Sucesivamente",null],["相连","相連","xiānglián","Conectar",null],["相识","相識","xiāngshí","Conocerse",null],["相提并论","相提並論","xiāngtí-bìnglùn","/equiparar",null],["相通",null,"xiāngtōng","/comunicarse",null],["相依为命","相依為命","xiāngyī-wéimìng","/apoyarse mutuamente",null],["相遇",null,"xiāngyù","/encontrarse",null],["相约","相約","xiāngyuē","/acordar encontrarse",null],["香料",null,"xiāngliào","Especia",null],["香水",null,"xiāngshuǐ","Perfume",null],["香味",null,"xiāngwèi","Aroma",["Fragancia"]],["香烟","香煙","xiāngyān","Cigarrillo",null],["香油",null,"xiāngyóu","Aceite de sésamo",null],["镶","鑲","xiāng","Incrustar",null],["镶嵌","鑲嵌","xiāngqiàn","Incrustar",null],["详尽","詳盡","xiángjìn","/detallado",null],["祥和",null,"xiánghé","/sereno",null],["享",null,"xiǎng","Disfrutar",null],["享有",null,"xiǎngyǒu","Tener",null],["响亮","響亮","xiǎngliàng","/sonoro",null],["响起","響起","xiǎngqǐ","Sonar",null],["响应","響應","xiǎngyìng","Responder",null],["想方设法","想方設法","xiǎngfāng-shèfǎ","/de cualquier manera",null],["向来","向來","xiànglái","Siempre",null],["向往","嚮往","xiàngwǎng","Anhelar",null],["向着","向著","xiàngzhe","/hacia",null],["项链","項鏈","xiàngliàn","Collar",null],["像样","像樣","xiàngyàng","/decente",null],["橡胶","橡膠","xiàngjiāo","/goma",null],["橡皮",null,"xiàngpí","/goma de borrar",null],["削",null,"xiāo","Pelar",null],["消",null,"xiāo","Consumir; reducir",["Holgazanear (el tiempo)","Disminuir; para disminuir"]],["消沉",null,"xiāochén","/deprimido",null],["消遣",null,"xiāoqiǎn","Entretenerse",null],["萧条","蕭條","xiāotiáo","/deprimido",null],["销","銷","xiāo","Vender",null],["销毁","銷毀","xiāohuǐ","Destruir",null],["销量","銷量","xiāoliàng","Ventas",null],["潇洒","瀟灑","xiāosǎ","/elegante",null],["小丑",null,"xiǎochǒu","/payaso",null],["小贩","小販","xiǎofàn","Vendedor callejero",null],["小看",null,"xiǎokàn","/despreciar",null],["小康",null,"xiǎokāng","/próspero",null],["小路",null,"xiǎolù","Sendero",["Camino pequeño"]],["小品",null,"xiǎopǐn","Sketch",null],["小气","小氣","xiǎoqi","/tacaño",null],["小区","小區","xiǎoqū","/barrio",null],["小曲",null,"xiǎoqǔ","Canción popular",null],["小人",null,"xiǎorén","Persona mezquina (≠ 君子)",null],["小提琴",null,"xiǎotíqín","Violín",null],["小溪",null,"xiǎoxī","/arroyo",null],["小心翼翼",null,"xiǎoxīn-yìyì","Con cuidado",null],["小卒",null,"xiǎozú","/peón",null],["孝敬",null,"xiàojìng","Respetar a los mayores",null],["孝顺","孝順","xiàoshùn","Ser piadoso con los padres",null],["肖像",null,"xiàoxiàng","Retrato",null],["效仿",null,"xiàofǎng","Imitar",null],["效力",null,"xiàolì","Servicio",null],["效益",null,"xiàoyì","Beneficio",null],["效应","效應","xiàoyìng","/efecto",null],["协定","協定","xiédìng","/acuerdo",null],["协同","協同","xiétóng","Cooperar",null],["协作","協作","xiézuò","/colaborar",null],["邪",null,"xié","/malvado",null],["邪恶","邪惡","xié'è","/malvado",null],["挟持","挾持","xiéchí","/secuestrar",null],["携带","攜帶","xiédài","Llevar",null],["携手","攜手","xiéshǒu","Unir manos",null],["写照","寫照","xiězhào","Reflejo",null],["泄","洩","xiè","Filtrar",null],["泄漏","洩漏","xièlòu","/filtrar",null],["泄露",null,"xièlòu","/filtrar",null],["泄密","洩密","xièmì","Revelar secretos",null],["泄气","洩氣","xièqì","/desanimarse",null],["泻","瀉","xiè","/diarrear",null],["卸",null,"xiè","/descargar",null],["心爱","心愛","xīn'ài","/querido",null],["心安理得",null,"xīn'ān-lǐdé","/consciente",null],["心病",null,"xīnbìng","Preocupación",null],["心肠","心腸","xīncháng","/corazón",null],["心得",null,"xīndé","/aprendizaje",null],["心慌",null,"xīnhuāng","/nervioso",null],["心急如焚",null,"xīnjí-rúfén","/impaciente",null],["心里话","心裡話","xīnlǐhuà","/pensamiento íntimo",null],["心灵手巧","心靈手巧","xīnlíng-shǒuqiǎo","/hábil",null],["心目",null,"xīnmù","Mente",null],["心声","心聲","xīnshēng","/pensamiento íntimo",null],["心事",null,"xīnshì","Preocupación",null],["心思",null,"xīnsi","Pensamiento",null],["心酸",null,"xīnsuān","Sentir amargura",["Triste","Penoso"]],["心想事成",null,"xīnxiǎng-shìchéng","Deseos se cumplen",["Sueños realizados"]],["心胸",null,"xīnxiōng","Capacidad de perdón",["Generosidad","Tolerancia"]],["心血",null,"xīnxuè","Esfuerzo dedicado",["Trabajo","Amor"]],["心眼儿","心眼兒","xīnyǎnr","Astucia",["Inteligencia","Malicia"]],["心意",null,"xīnyì","Sentimiento",["Afecto","Intención"]],["芯片",null,"xīnpiàn","Circuito integrado",["Microchip"]],["辛勤",null,"xīnqín","Trabajador",["Infatigable"]],["辛酸",null,"xīnsuān","Doloroso",["Amargo","Penoso"]],["欣慰",null,"xīnwèi","Sentirse aliviado",["Satisfecho","Contento"]],["欣喜",null,"xīnxǐ","Sentir alegría",["Feliz","Alegre"]],["欣欣向荣","欣欣向榮","xīnxīn-xiàngróng","Floreciente",["Próspero","Creciente"]],["新潮",null,"xīncháo","Moderno",["Actual","Vanguardista"]],["新陈代谢","新陳代謝","xīnchén-dàixiè","Metabolismo",["Renovación","Cambio"]],["新房",null,"xīnfáng","Nueva casa",["Vivienda","Matrimonio"]],["新款",null,"xīnkuǎn","Nuevo modelo",["Diseño","Estilo"]],["新奇",null,"xīnqí","Novedoso",["Extraño","Insólito"]],["新生",null,"xīnshēng","Recién nacido",["Nuevo","Renacido"]],["新式",null,"xīnshì","Moderno",["Actual","Novedoso"]],["新手",null,"xīnshǒu","Principiante",["Novato","Iniciado"]],["新颖","新穎","xīnyǐng","Original",["Innovador","Diferente"]],["信贷","信貸","xìndài","Crédito financiero",["Préstamo","Fianza"]],["信件",null,"xìnjiàn","Carta",["Correo","Mensaje"]],["信赖","信賴","xìnlài","Confiar en",["Fiar","Creer"]],["信誉","信譽","xìnyù","Prestigio",["Honor","Confianza"]],["兴奋剂","興奮劑","xīngfènjì","Estimulante",["Doping","Energizante"]],["兴建","興建","xīngjiàn","Construir",["Levantar","Edificar"]],["兴起","興起","xīngqǐ","Surgir",["Aparecer","Desarrollarse"]],["星座",null,"xīngzuò","Constelación",["Signo","Zodiaco"]],["猩猩",null,"xīngxing","Simio",["Mono","Chimpancé"]],["腥",null,"xīng","Con olor a pescado",["Rancio","Repugnante"]],["刑法",null,"xíngfǎ","Derecho penal",["Ley castigo"]],["行使",null,"xíngshǐ","Ejercer",["Aplicar","Usar"]],["行政",null,"xíngzhèng","Administración",["Administrativo"]],["行走",null,"xíngzǒu","Caminar",["Andar","Moverse"]],["形形色色",null,"xíngxíngsèsè","Diversos",["Variados","Diferentes"]],["形影不离","形影不離","xíngyǐng-bùlí","Inseparables",["Unidos","Siempre juntos"]],["醒来","醒來","xǐnglai","Despertar",["Levantarse","Renacer"]],["醒目",null,"xǐngmù","Llamativo",["Visible","Notable"]],["醒悟",null,"xǐngwù","Darse cuenta",["Comprender","Entender"]],["兴高采烈","興高采烈","xìnggāo-cǎiliè","Alegre",["Feliz","Entusiasta"]],["兴致","興致","xìngzhì","Entusiasmo",["Gusto","Interés"]],["幸存","倖存","xìngcún","Sobrevivir",["Escapar","Permanecer"]],["幸好",null,"xìnghǎo","Por suerte",["Afortunadamente","Gracias a"]],["幸亏","幸虧","xìngkuī","Gracias a",["Por suerte","Afortunadamente"]],["幸免","倖免","xìngmiǎn","Evitar",["Escapar","Salvarse"]],["性价比","性價比","xìngjiàbǐ","Relación calidad-precio",["Utilidad","Economía"]],["性命",null,"xìngmìng","Vida",["Existencia","Ser"]],["性情",null,"xìngqíng","Carácter",["Personalidad","Naturaleza"]],["姓氏",null,"xìngshì","Apellido",["Nombre","Familia"]],["凶残","兇殘","xiōngcán","Cruel",["Brutal","Salvaje"]],["凶恶","兇惡","xiōng'è","Malvado",["Feroz","Terrible"]],["凶狠",null,"xiōnghěn","Cruel",["Brutal","Implacable"]],["凶猛","兇猛","xiōngměng","Feroz",["Violento","Amenazante"]],["汹涌","洶湧","xiōngyǒng","Impetuoso",["Turbulento","Bravo"]],["胸膛",null,"xiōngtáng","Pecho",["Frente"]],["胸有成竹",null,"xiōngyǒuchéngzhú","Seguro de sí mismo",["Preparado","Decidido"]],["雄厚",null,"xiónghòu","Abundante",["Fuerte","Sólido"]],["休克",null,"xiūkè","Entrar en shock",["Desmayar","Collapse"]],["休眠",null,"xiūmián","Hibernar",["Dormir","Inactivo"]],["休想",null,"xiūxiǎng","Ni siquiera pensar",["Soñar","Imposible"]],["休养","休養","xiūyǎng","Descansar",["Recuperarse","Conciliar"]],["修补","修補","xiūbǔ","Reparar",["Arreglar","Corregir"]],["修长","修長","xiūcháng","Estilizado",["Largo","Delgado"]],["修订","修訂","xiūdìng","Revisar",["Corregir","Ampliar"]],["修路",null,"xiūlù","Reparar el camino",["Construir carretera"]],["修正",null,"xiūzhèng","Corregir",["Rectificar","Mejorar"]],["羞愧",null,"xiūkuì","Avergonzado",["Vergonzoso","Penoso"]],["秀丽","秀麗","xiùlì","Hermoso",["Bello","Agradable"]],["秀美",null,"xiùměi","Elegante",["Delicado","Bello"]],["袖手旁观","袖手旁觀","xiùshǒu-pángguān","Observar sin intervenir",["Indiferente","Pasivo"]],["绣","繡","xiù","Bordar",["Adornar","Coser"]],["锈","鏽","xiù","Óxido",["Herrumbre","Oxidar"]],["嗅觉","嗅覺","xiùjué","Olfato",["Sentido"]],["须","須","xū","Esperar",["Palpador (de un insecto, etc.)","Tener que"]],["虚","虛","xū","Vano",null],["虚构","虛構","xūgòu","Inventar",["Fingir","Crear"]],["虚幻","虛幻","xūhuàn","Ilusorio",["Irreal","Fantástico"]],["虚假","虛假","xūjiǎ","Falso",["Ficticio","Mentiroso"]],["虚拟","虛擬","xūnǐ","Virtual",["Simulado","Fingido"]],["虚弱","虛弱","xūruò","Débil",["Enfermo","Fragil"]],["虚伪","虛偽","xūwěi","Hipócrita",["Falso","Artificial"]],["需",null,"xū","Necesidad",["Requerir","Querer"]],["徐徐",null,"xúxú","Lentamente",["Gradualmente","Despacito"]],["许","許","xǔ","Tal vez",["Prometer","Un poco"]],["许可证","許可證","xǔkězhèng","Permiso",["Licencia","Autorización"]],["旭日",null,"xùrì","Sol naciente",["Amanecer","Aurora"]],["序",null,"xù","Prefacio",["Introducción","Prólogo"]],["序幕",null,"xùmù","Preámbulo",["Inicio","Comienzo"]],["叙述","敘述","xùshù","Narrar",["Contar","Describir"]],["酗酒",null,"xùjiǔ","Beber en exceso",["Alcoholismo","Vicio"]],["续","續","xù","Continuar",["Reponer"]],["絮叨",null,"xùdao","Charlatán",["Hablador","Insistente"]],["宣称","宣稱","xuānchēng","Afirmar",["Declarar","Proclamar"]],["宣读","宣讀","xuāndú","Leer en voz alta",["Recitar","Leer"]],["宣告",null,"xuāngào","Anunciar",["Proclamar","Declarar"]],["宣誓",null,"xuānshì","Jurar",["Prometer","Comprometer"]],["宣泄","宣洩","xuānxiè","Liberar",["Expresar","Desahogar"]],["宣言",null,"xuānyán","Declaración",["Manifiesto","Proclama"]],["宣扬","宣揚","xuānyáng","Propagar",["Difundir","Promover"]],["喧哗","喧嘩","xuānhuá","Ruidoso",["Bullicioso"]],["喧闹","喧鬧","xuānnào","Bullicioso",["Ruidoso","Vivo"]],["玄",null,"xuán","Misterioso",["Profundo","Oculto"]],["玄机","玄機","xuánjī","Secreto",["Misterio","Enigma"]],["悬挂","懸掛","xuánguà","Colgar",["Suspender","Pender"]],["悬念","懸念","xuánniàn","Suspenso",["Incertidumbre","Expectativa"]],["悬殊","懸殊","xuánshū","Desigual",["Enorme","Grave"]],["悬崖","懸崖","xuányá","Precipicio",["Acantilado"]],["旋律",null,"xuánlǜ","Melodía",["Tono","Canción"]],["旋涡","旋渦","xuánwō","Remolino",["Torbellino","Vórtice"]],["选民","選民","xuǎnmín","Elector",["Votante","Ciudadano"]],["选项","選項","xuǎnxiàng","Opción",["Alternativa","Elección"]],["选用","選用","xuǎnyòng","Seleccionar",["Elegir","Usar"]],["炫耀",null,"xuànyào","Presumir",["Mostrar","Alardear"]],["削弱",null,"xuēruò","Debilitar",["Reducir","Minar"]],["靴子",null,"xuēzi","Bota",["Calzado","Zapato"]],["穴位",null,"xuéwèi","Punto de acupuntura",["Presión","Punto"]],["学历","學歷","xuélì","Nivel educativo",["Formación","Título"]],["学士","學士","xuéshì","Licenciado",["Graduado","Título"]],["学说","學說","xuéshuō","Teoría",["Doctrina"]],["学堂","學堂","xuétáng","Escuela",["Centro","Estudio"]],["学业","學業","xuéyè","Estudios",["Formación","Aprendizaje"]],["学艺","學藝","xuéyì","Aprender arte",["Estudiar","Desarrollar"]],["学子","學子","xuézǐ","Estudiante",["Discípulo","Alumno"]],["雪山",null,"xuěshān","Montaña nevada",["Glaciar","Hielo"]],["雪上加霜",null,"xuěshàng-jiāshuāng","Malo para peor",["Problema adicional","Desastre"]],["血脉","血脈","xuèmài","Linaje",["Sangre","Familia"]],["血栓",null,"xuèshuān","Coágulo",["Trombosis","Obstrucción"]],["血压","血壓","xuèyā","Presión sanguínea",["Tensión","Hipertensión"]],["血缘","血緣","xuèyuán","Parentesco",["Lazo familiar"]],["勋章","勛章","xūnzhāng","Condecoración",["Medalla"]],["熏",null,"xūn","Ahumar",["Impregnar"]],["熏陶",null,"xūntáo","Influenciar",["Formar"]],["寻","尋","xún","Buscar",["Hallar"]],["寻常","尋常","xúncháng","Común",["Ordinario"]],["寻觅","尋覓","xúnmì","Buscar",["Buscar con esmero"]],["巡逻","巡邏","xúnluó","Patrullar",["Recorrer"]],["循序渐进","循序漸進","xúnxù-jiànjìn","Progresivo gradual",["Paso a paso"]],["训","訓","xùn","Entrenar",["Amonestar","Enseñar"]],["驯","馴","xùn","Domar",["Adiestrar"]],["逊色","遜色","xùnsè","Inferioridad",["Menosprecio"]],["丫头","丫頭","yātou","Muchacha",["Sirvienta"]],["压倒","壓倒","yādǎo","Superar",["Aplastar"]],["压缩","壓縮","yāsuō","Comprimir",["Reducir"]],["压抑","壓抑","yāyì","Reprimir",["Constreñir"]],["压制","壓制","yāzhì","Suprimir",["Aplastar"]],["押",null,"yā","Hipotecar",["Detener"]],["鸦雀无声","鴉雀無聲","yāquè-wúshēng","Silencio absoluto",["Completo silencio"]],["牙齿","牙齒","yáchǐ","Diente",["Pieza dental"]],["牙膏",null,"yágāo","Pasta dental",["Dentífrico"]],["芽",null,"yá","Brote",["Yema"]],["哑","啞","yǎ","Mudo",["Afónico"]],["咽喉",null,"yānhóu","Garganta",["Faringe"]],["烟囱","煙囪","yāncōng","Chimenea",["Conducto de humo"]],["烟火","煙火","yānhuǒ","Fuegos artificiales",["Celebración"]],["淹",null,"yān","Inundar",["Sumergir"]],["延",null,"yán","Prolongar",["Extender"]],["延缓","延緩","yánhuǎn","Retrasar",["Demorar"]],["延误","延誤","yánwù","Retraso",["Atrasarse, demorarse"]],["严谨","嚴謹","yánjǐn","Riguroso",null],["严禁","嚴禁","yánjìn","Prohibir estrictamente",["Vedar"]],["严峻","嚴峻","yánjùn","Severo",["Grave"]],["严密","嚴密","yánmì","Estricto",["Minucioso"]],["言辞","言辭","yáncí","Expresión",["Lenguaje"]],["言论","言論","yánlùn","Opinión",["Declaración"]],["言行",null,"yánxíng","Comportamiento",["Actos"]],["岩石",null,"yánshí","Roca",["Piedra"]],["炎热","炎熱","yánrè","Caluroso",["Abrasador"]],["炎症",null,"yánzhèng","Inflamación",["Proceso infeccioso"]],["沿岸",null,"yán'àn","Orilla",["Ribera"]],["沿途",null,"yántú","A lo largo del camino",["Durante el trayecto"]],["沿线","沿線","yánxiàn","A lo largo de la línea",["Ruta"]],["研讨","研討","yántǎo","Debatir",["Analizar"]],["阎王","閻王","Yánwang","Rey del infierno",["Deidad"]],["衍生",null,"yǎnshēng","Derivar",["Originar"]],["掩盖","掩蓋","yǎngài","Ocultar",["Encubrir"]],["掩护","掩護","yǎnhù","Proteger",["Amparar"]],["掩饰","掩飾","yǎnshì","Disimular",["Encubrir"]],["眼红","眼紅","yǎnhóng","Envidioso",["Celoso"]],["眼界",null,"yǎnjiè","Horizonte",["Perspectiva"]],["眼色",null,"yǎnsè","Gesto",["Mirada"]],["眼神",null,"yǎnshén","Mirada",["Expresión ocular"]],["眼下",null,"yǎnxià","Actualmente",["En este momento"]],["演变","演變","yǎnbiàn","Evolucionar",["Transformarse"]],["演播室",null,"yǎnbōshì","Estudio",["Plató"]],["演技",null,"yǎnjì","Interpretación",["Habilidad actoral"]],["演练","演練","yǎnliàn","Ensayar",["Practicar"]],["演示",null,"yǎnshì","Demostrar",["Exhibir"]],["演说","演說","yǎnshuō","Discurso",["Oratoria"]],["演习","演習","yǎnxí","Ejercicio",null],["演戏","演戲","yǎnxì","Actuar",["Representar"]],["演艺圈","演藝圈","yǎnyìquān","Mundo del espectáculo",["Industria del entretenimiento"]],["演绎","演繹","yǎnyì","Deducir",["Razonar"]],["厌烦","厭煩","yànfán","Cansancio",["Fastidio"]],["厌倦","厭倦","yànjuàn","Hartazgo",["Desgaste"]],["咽","嚥","yàn","Tragar",["Deglutir"]],["艳丽","艷麗","yànlì","Vistoso",["Llamativo"]],["验","驗","yàn","Examinar",["Comprobar","Variante de 验"]],["验收","驗收","yànshōu","Aceptar",["Verificar"]],["验证","驗證","yànzhèng","Confirmar",["Comprobar"]],["焰火",null,"yànhuǒ","Fuegos artificiales",["Celebración"]],["燕子",null,"yànzi","Golondrina",["Ave"]],["秧歌",null,"yāngge","Danza folclórica",["Baio"]],["扬","揚","yáng","Levantar",["Elevar"]],["阳性","陽性","yángxìng","Positivo",["Masculino"]],["杨树","楊樹","yángshù","Álamo",["Árbol"]],["洋溢",null,"yángyì","Rebosar",["Impregnar"]],["养活","養活","yǎnghuo","Mantener",["Sustentar"]],["养老金","養老金","yǎnglǎojīn","Jubilación",["Pensión"]],["养老院","養老院","yǎnglǎoyuàn","Asilo",["Residencia"]],["养生","養生","yǎngshēng","Cuidar la salud",["Preservar"]],["养殖","養殖","yǎngzhí","Cultivar",["Criar"]],["氧",null,"yǎng","Oxígeno",["Elemento"]],["痒","癢","yǎng","Picazón",["Comezón"]],["样本","樣本","yàngběn","Muestra",["Ejemplo"]],["样品","樣品","yàngpǐn","Muestra",["Producto"]],["妖怪",null,"yāoguài","Monstruo",["Ser sobrenatural"]],["邀",null,"yāo","Invitar",["Solicitar"]],["窑","窯","yáo","Horno",["Hornillo"]],["谣言","謠言","yáoyán","Rumor",["Chisme"]],["摇摆","搖擺","yáobǎi","Balancear",["Oscilar"]],["摇滚","搖滾","yáogǔn","Rock",["Género musical"]],["摇晃","搖晃","yáohuàng","Temblar",["Sacudir"]],["摇篮","搖籃","yáolán","Cuna",["Mueble"]],["摇摇欲坠","搖搖欲墜","yáoyáo-yùzhuì","A punto de caer",["Inestable"]],["遥控","遙控","yáokòng","Controlar a distancia",["Mando"]],["遥远","遙遠","yáoyuǎn","Lejano",["Distante"]],["药材","藥材","yàocái","Hierbas",null],["药方","藥方","yàofāng","Receta",["Fórmula"]],["要不",null,"yàobù","O si no",["De lo contrario"]],["要不是",null,"yàobùshì","Si no fuera",["De no ser"]],["要点","要點","yàodiǎn","Punto clave",["Lo esencial"]],["要害",null,"yàohài","Punto vital",["弱点"]],["要紧","要緊","yàojǐn","Importante",["Crucial"]],["要领","要領","yàolǐng","Esencia",["Punto clave"]],["要命",null,"yàomìng","Fatal",["Desesperante"]],["要强","要強","yàoqiáng","Ambicioso",["Competitivo"]],["钥匙","鑰匙","yàoshi","Llave",["Herramienta"]],["耀眼",null,"yàoyǎn","Deslumbrante",["Brillante"]],["椰子",null,"yēzi","Coco",["Fruta"]],["也就是说","也就是說","yějiùshìshuō","Es decir",["O sea"]],["野餐",null,"yěcān","Picnic",["Excursión"]],["野炊",null,"yěchuī","Cocinar al aire libre",["Barbacoa"]],["野蛮","野蠻","yěmán","Salvaje",["Bruto"]],["野兽","野獸","yěshòu","Animal salvaje",["Fiera"]],["野外",null,"yěwài","Campo",["Al aire libre"]],["野心",null,"yěxīn","Ambición",["Codicia"]],["野营","野營","yěyíng","Acampar",["Hacer camping"]],["业","業","yè (fúwùyè)","Industria",["Rama de actividad","Profesión"]],["业绩","業績","yèjì","Rendimiento",["Logro"]],["夜班",null,"yèbān","Turno nocturno",["Guardia"]],["夜市",null,"yèshì","Nocturno",["Noche"]],["夜晚",null,"yèwǎn","Noche",["Tarde"]],["夜校",null,"yèxiào","Escuela nocturna",["Academia"]],["夜以继日","夜以繼日","yèyǐjìrì","Día y noche",["Incesantemente"]],["夜总会","夜總會","yèzǒnghuì","Club nocturno",["Discoteca"]],["液晶",null,"yèjīng","Cristal líquido",["Pantalla"]],["液体","液體","yètǐ","Líquido",["Fluido"]],["一把手",null,"yībǎshǒu","Líder principal",["Máxima autoridad"]],["一线","一線","yīxiàn","Primera línea",["Frente"]],["一一",null,"yīyī","Uno por uno",["Sucesivamente"]],["伊斯兰教","伊斯蘭教","Yīsīlánjiào","Islam",["Religión musulmana"]],["衣食住行",null,"yī-shí-zhù-xíng","Necesidades básicas",["Comida y vestimenta"]],["医务","醫務","yīwù","Servicios médicos",["Atención sanitaria"]],["依",null,"yī","Depender",["Basándose en"]],["依托","依託","yītuō","Apoyarse en",["Fundamentar"]],["依依不舍","依依不捨","yīyī-bùshě","Con nostalgia",["Renuente a separarse"]],["一不小心",null,"yī bù xiǎoxīn","Sin querer",["Por descuido"]],["一刹那","一剎那","yīchànà","Instante",["Momento"]],["一大早",null,"yīdàzǎo","Temprano por la mañana",["Al alba"]],["一动不动","一動不動","yīdòng-bùdòng","Completamente quieto",["Inmóvil"]],["一度",null,"yīdù","Una vez",["En algún momento"]],["一概",null,"yīgài","En general",["Sin excepción"]],["一概而论","一概而論","yīgài'érlùn","Generalizar",["Juzgar igualmente"]],["一个劲儿","一個勁兒","yīgejìnr","Constantemente",["Sin parar"]],["一晃",null,"yīhuàng","En un instante",["Pasar rápidamente"]],["一技之长","一技之長","yījìzhīcháng","Habilidad especial",["Talento específico"]],["一面",null,"yīmiàn","Un lado",["Aspecto"]],["一目了然",null,"yīmù-liǎorán","Obvio",["Claro a simple vista"]],["一事无成","一事無成","yīshì-wúchéng","No lograr nada",["Fracasar en todo"]],["一瞬间","一瞬間","yīshùnjiān","Instante",["Momento"]],["一味",null,"yīwèi","Ciegamente",["Exclusivamente"]],["一系列",null,"yīxìliè","Una serie de",["Conjunto"]],["一阵","一陣","yīzhèn","Una ráfaga",["Un rato","De golpe"]],["仪表","儀表","yíbiǎo","Instrumento",["Medidor"]],["怡然自得",null,"yírán-zìdé","Satisfecho",["Contento"]],["姨",null,"yí","Tía materna",["Hermana de la madre"]],["移交",null,"yíjiāo","Transferir",["Entregar"]],["移植",null,"yízhí","Trasplantar",["Injertar"]],["遗留","遺留","yíliú","Dejar",["Heredar"]],["遗弃","遺棄","yíqì","Abandonar",["Desechar"]],["遗体","遺體","yítǐ","Cadáver",["Cuerpo"]],["遗忘","遺忘","yíwàng","Olvidar",["No recordar"]],["遗物","遺物","yíwù","Posesiones personales",["Efectos"]],["遗愿","遺願","yíyuàn","Último deseo",["Voluntad"]],["遗址","遺址","yízhǐ","Yacimiento",["Ruinas"]],["遗嘱","遺囑","yízhǔ","Testamento",["Disposición final"]],["疑点","疑點","yídiǎn","Punto dudoso",["Incógnita"]],["疑惑",null,"yíhuò","Dudar",["Vacilar"]],["疑虑","疑慮","yílǜ","Preocuparse",["Inquietarse"]],["以",null,"yǐ","Antigua variante de 以",["Con el fin de","De acuerdo a"]],["以免",null,"yǐmiǎn","Para evitar",["A fin de que"]],["以身作则","以身作則","yǐshēn-zuòzé","Dar ejemplo",["Servir de modelo"]],["以至于","以至於","yǐzhìyú","Hasta el punto de",["De modo que"]],["以致",null,"yǐzhì","Como resultado",["Por lo tanto"]],["矣",null,"yǐ","Partícula clásica final (como 了)",null],["倚",null,"yǐ","Apoyarse en",["Confiar en"]],["一长一短","一長一短","yī cháng yī duǎn","Detalles",["Pormenores"]],["一成不变","一成不變","yīchéng-bùbiàn","Inmutable",["Rígido"]],["一筹莫展","一籌莫展","yīchóu-mòzhǎn","Sin solución",["Sin ideas"]],["一帆风顺","一帆風順","yīfān-fēngshùn","Sin problemas",["Con éxito"]],["一干二净","一乾二淨","yīgān-èrjìng","Completamente",["Por completo"]],["一鼓作气","一鼓作氣","yīgǔ-zuòqì","De un tirón",["De golpe"]],["一锅粥","一鍋粥","yīguōzhōu","Desorden",["Caos"]],["一回事",null,"yīhuíshì","Otra cosa",["Asunto diferente"]],["一家人",null,"yījiārén","Familia",["Hogar"]],["一经","一經","yījīng","Una vez",["Apenas"]],["一举","一舉","yījǔ","Acción",["Movimiento"]],["一举一动","一舉一動","yījǔ-yīdòng","Cada movimiento",["Acción"]],["一卡通",null,"yīkǎtōng","Tarjeta multifunción",["Pase"]],["一揽子","一攬子","yīlǎnzi","Completo",["Integral"]],["一连","一連","yīlián","Seguidamente",["Consecutivamente"]],["一连串","一連串","yīliánchuàn","Una serie de",["Sucesión"]],["一毛不拔",null,"yīmáo-bùbá","Tacaño",["Avaro"]],["一年到头","一年到頭","yīnián-dàotóu","Todo el año",["Durante todo el año"]],["一旁",null,"yīpáng","Al lado",["Junto"]],["一如既往",null,"yīrú-jìwǎng","Como siempre",["Igual que antes"]],["一声不吭","一聲不吭","yīshēng-bùkēng","En silencio",["Callado"]],["一手",null,"yīshǒu","Habilidad",["Experto"]],["一塌糊涂","一塌糊塗","yītāhútú","Desastre",["Completo desorden"]],["一体","一體","yītǐ","Unidad",["Conjunto"]],["一天到晚",null,"yītiān-dàowǎn","Todo el día",["Durante el día"]],["一头","一頭","yītóu","Completamente",["De golpe"]],["一无所有","一無所有","yīwúsuǒyǒu","No tener nada",["Carecer de todo"]],["一无所知","一無所知","yīwúsuǒzhī","No saber nada",["Ignorar"]],["一心",null,"yīxīn","Con todo el corazón",["Concentrado"]],["一心一意",null,"yīxīn-yīyì","Con dedicación",["Enfocado"]],["一言不发","一言不發","yīyán-bùfā","En silencio",["Callado"]],["一言一行",null,"yīyán-yīxíng","Palabras y acciones",["Comportamiento"]],["一眼",null,"yīyǎn","A primera vista",["De un vistazo"]],["一应俱全","一應俱全","yīyīng-jùquán","Todo incluido",["Completo"]],["一早",null,"yīzǎo","Temprano por la mañana",["Al amanecer"]],["义工","義工","yìgōng","Voluntario",["Trabajador no remunerado"]],["议","議","yì","Discutir",["Sugerir","Comentar sobre"]],["议程","議程","yìchéng","Orden del día",["Programa"]],["议会","議會","yìhuì","Parlamento",["Asamblea"]],["议员","議員","yìyuán","Diputado",["Legislador"]],["屹立",null,"yìlì","Erguirse",["Mantenerse firme"]],["亦",null,"yì","También (literario)",null],["异口同声","異口同聲","yìkǒu-tóngshēng","Unánimemente",["Todos a la vez"]],["异想天开","異想天開","yìxiǎng-tiānkāi","Idea extravagante",["Fantasía"]],["异性","異性","yìxìng","Sexo opuesto",["Diferente"]],["异议","異議","yìyì","Objeción",["Disidencia"]],["抑扬顿挫","抑揚頓挫","yìyáng-dùncuò","Entonación",["Ritmo"]],["抑郁","抑鬱","yìyù","Deprimido",["Melancólico"]],["抑郁症","抑鬱症","yìyùzhèng","Depresión",["Trastorno depresivo"]],["抑制",null,"yìzhì","Suprimir",["Controlar"]],["译","譯","yì","Traducir",["Interpretar"]],["易拉罐",null,"yìlāguàn","Lata",["Envase de aluminio"]],["疫苗",null,"yìmiáo","Vacuna",["Inmunización"]],["益处","益處","yìchù","Beneficio",["Ventaja"]],["意料",null,"yìliào","Prever",["Esperar"]],["意料之外",null,"yìliào zhī wài","Inesperado",["Fuera de lo previsto"]],["意图","意圖","yìtú","Intención",["Propósito"]],["意向",null,"yìxiàng","Intención",["Plan"]],["溢",null,"yì","Derramarse",["Rebosar"]],["毅力",null,"yìlì","Perseverancia",["Voluntad"]],["毅然",null,"yìrán","Decididamente",["Firmemente"]],["因人而异","因人而異","yīnrén'éryì","Varía según la persona",["Diferente para cada uno"]],["阴暗","陰暗","yīn'àn","Oscuro",["Sombrío"]],["阴性","陰性","yīnxìng","Negativo",["Femenino"]],["音响","音響","yīnxiǎng","Sonido",["Audio"]],["殷勤",null,"yīnqín","Atento",["Servicial"]],["银幕","銀幕","yínmù","Pantalla",["Cine"]],["引发","引發","yǐnfā","Provocar",["Desencadenar"]],["引经据典","引經據典","yǐnjīng-jùdiǎn","Citar",["Referirse a autoridades"]],["引领","引領","yǐnlǐng","Guiar",["Dirigir"]],["引擎",null,"yǐnqíng","Motor",["Máquina"]],["引人入胜","引人入勝","yǐnrén-rùshèng","Atractivo",["Fascinante"]],["引人注目",null,"yǐnrén-zhùmù","Llamativo",["Notable"]],["引入",null,"yǐnrù","Introducir",["Incorporar"]],["引用",null,"yǐnyòng","Citar",["Mencionar"]],["引诱","引誘","yǐnyòu","Seducir",["Tentar"]],["饮水","飲水","yǐn shuǐ","Beber agua",["Hidratación"]],["饮用水","飲用水","yǐnyòngshuǐ","Agua potable",["Agua bebible"]],["隐蔽","隱蔽","yǐnbì","Esconderse/oculto",null],["隐患","隱患","yǐnhuàn","Peligro latente",["Riesgo oculto"]],["隐瞒","隱瞞","yǐnmán","Ocultar",["Encubrir"]],["隐情","隱情","yǐnqíng","Situación oculta",["Secreto"]],["隐身","隱身","yǐnshēn","Hacerse invisible",["Desaparecer"]],["隐形","隱形","yǐnxíng","Invisible",["Sutil"]],["隐性","隱性","yǐnxìng","Implícito",["Latente"]],["隐约","隱約","yǐnyuē","Vago",["Difuso"]],["瘾","癮","yǐn","Adicción",["Vicio"]],["印刷术","印刷術","yìnshuāshù","Impresión",["Arte de imprimir"]],["印章",null,"yìnzhāng","Sello",["Estampa"]],["印证","印證","yìnzhèng","Confirmar",["Corroborar"]],["应有尽有","應有盡有","yīngyǒu-jìnyǒu","Tener de todo",["Poseer todo"]],["英镑","英鎊","yīngbàng","Libra esterlina",["Moneda británica"]],["英俊",null,"yīngjùn","Apuesto",["Guapo"]],["婴儿","嬰兒","yīng'ér","Bebé",["Niño pequeño"]],["鹰","鷹","yīng","Águila",["Halcón","Ave de presa"]],["迎",null,"yíng","Dar la bienvenida; encontrarse",null],["迎合",null,"yínghé","Complacer",["Satisfacer"]],["荧光","熒光","yíngguāng","Luz fluorescente",["Brillo"]],["盈利",null,"yínglì","Obtener beneficios",["Ganar dinero"]],["营救","營救","yíngjiù","Rescatar",["Salvar"]],["营造","營造","yíngzào","Crear",["Construir"]],["赢家","贏家","yíngjiā","Ganador",["Vencedor"]],["影像",null,"yǐngxiàng","Imagen",["Reflejo"]],["应酬","應酬","yìngchou","Socializar",["Relacionarse"]],["应付","應付","yìngfu","Hacer frente",["Sobrevivir"]],["应聘","應聘","yìngpìn","Postular",["Solicitar trabajo"]],["应邀","應邀","yìngyāo","Ser invitado",["Aceptar invitación"]],["映",null,"yìng","Reflejar",["Iluminar"]],["硬币","硬幣","yìngbì","Moneda",["Cambio"]],["硬朗",null,"yìnglang","Fuerte",["Sano"]],["硬盘","硬盤","yìngpán","Disco duro",["Memoria"]],["拥护","擁護","yōnghù","Apoyar",["Defender"]],["拥挤","擁擠","yōngjǐ","Abarrotado",["Atestado"]],["庸俗",null,"yōngsú","Vulgar",["Cursi"]],["永不",null,"yǒng bù","Nunca jamás",["Eternamente"]],["永恒","永恆","yǒnghéng","Eterno",["Permanente"]],["永久",null,"yǒngjiǔ","Permanente",["Duradero"]],["勇往直前",null,"yǒngwǎng-zhíqián","Avanzar sin miedo",["Ir adelante"]],["勇于","勇於","yǒngyú","Atreverse a",["Tener valentía para"]],["涌","湧","yǒng","Brotar",["Surgir"]],["涌入","湧入","yǒngrù","Fluir hacia",["Entrar en masa"]],["涌现","湧現","yǒngxiàn","Surgir",["Aparecer"]],["踊跃","踴躍","yǒngyuè","Entusiasta",["Activo"]],["用餐",null,"yòngcān","Comer",["Almorzar"]],["用功",null,"yònggōng","Estudioso",["Aplicado"]],["用力",null,"yònglì","Usar fuerza",["Esforzarse"]],["用人",null,"yòngrén","Contratar personal",["Seleccionar personal"]],["用意",null,"yòngyì","Intención",["Propósito"]],["优","優","yōu","Superior",["Excelente"]],["优化","優化","yōuhuà","Optimizar",["Mejorar"]],["优雅","優雅","yōuyǎ","Elegante",["Refinado"]],["优异","優異","yōuyì","Excelente",["Sobresaliente"]],["优越","優越","yōuyuè","Superior",["Ventajoso"]],["忧愁","憂愁","yōuchóu","Triste",["Melancólico"]],["忧虑","憂慮","yōulǜ","Preocupar",["Angustiar"]],["忧郁","憂鬱","yōuyù","Melancólico",["Deprimido"]],["悠久",null,"yōujiǔ","Antiguo",["Secular"]],["悠闲","悠閒","yōuxián","Tranquilo",["Relajado"]],["尤为","尤為","yóuwéi","Especialmente",["Particularmente"]],["由此看来","由此看來","yóucǐ-kànlái","Por lo visto",["Aparentemente"]],["由此可见","由此可見","yóucǐ-kějiàn","Se deduce que",["Por consiguiente"]],["由来","由來","yóulái","Origen",["Procedencia"]],["由衷",null,"yóuzhōng","Sinceramente",["De corazón"]],["邮编","郵編","yóubiān","Código postal",["Código"]],["邮政","郵政","yóuzhèng","Correo",["Servicio postal"]],["犹如","猶如","yóurú","Como si",["Semejante a"]],["犹豫不决","猶豫不決","yóuyù-bùjué","Indeciso",["Dudar"]],["油画","油畫","yóuhuà","Óleo",["Pintura al óleo"]],["游船","遊船","yóuchuán","Barco de paseo",["Crucero"]],["游览","遊覽","yóulǎn","Visitar",["Recorrer"]],["友情",null,"yǒuqíng","Amistad",["Vínculo"]],["友人",null,"yǒurén","Amigo",["Conocido"]],["友善",null,"yǒushàn","Amable",["Cordial"]],["有待",null,"yǒudài","Necesita",["Requiere"]],["有的放矢",null,"yǒudì-fàngshǐ","Con propósito",["Con objetivo"]],["有机","有機","yǒujī","Orgánico",["Natural"]],["有口无心","有口無心","yǒukǒu-wúxīn","Decir sin pensar",["Sin malicia"]],["有两下子","有兩下子","yǒu liǎngxiàzi","Ser capaz",["Tener talento"]],["有声有色","有聲有色","yǒushēng-yǒusè","Vívido",["Expresivo"]],["有所",null,"yǒusuǒ","Tener",["Poseer"]],["有所不同",null,"yǒusuǒ bù tóng","Ser diferente",["Variar"]],["有望",null,"yǒuwàng","Tener esperanza",["Prometedor"]],["有效期",null,"yǒuxiàoqī","Fecha de caducidad",["Vigencia"]],["有幸",null,"yǒuxìng","Tener la suerte",["Afortunado"]],["有序",null,"yǒuxù","Ordenado",["Estructurado"]],["有益",null,"yǒuyì","Beneficioso",["Útil"]],["有意",null,"yǒuyì","A propósito",["Intencionadamente"]],["有朝一日",null,"yǒuzhāo-yīrì","Algún día",["En el futuro"]],["有助于","有助於","yǒuzhùyú","Ayudar a",["Contribuir a"]],["幼稚",null,"yòuzhì","Infantil",["Ingenuo"]],["诱饵","誘餌","yòu'ěr","Cebo",["Señuelo"]],["诱发","誘發","yòufā","Provocar",["Desencadenar"]],["诱惑","誘惑","yòuhuò","Tentar",["Seducir"]],["诱人","誘人","yòurén","Tentador",["Atractivo"]],["余",null,"yú","Sobrar",["Restar"]],["余地","餘地","yúdì","Margen",["Espacio"]],["余额","餘額","yú'é","Saldo",["Remanente"]],["渔船","漁船","yúchuán","Barco de pesca",["Pesquero"]],["渔民","漁民","yúmín","Pescador",["Marinero"]],["逾期",null,"yúqī","Después de fecha",["Vencido"]],["愚蠢",null,"yúchǔn","Estúpido",["Necio"]],["愚公移山",null,"yúgōng-yíshān","Constancia",["Perseverancia"]],["舆论","輿論","yúlùn","Opinión pública",["Debate"]],["与此同时","與此同時","yǔcǐ-tóngshí","Al mismo tiempo",["Simultáneamente"]],["与否","與否","yǔ fǒu","O no",["Si o no"]],["与其","與其","yǔqí","En lugar",null],["与日俱增","與日俱增","yǔrì-jùzēng","Aumentar con el tiempo",["Crecer"]],["与时俱进","與時俱進","yǔshí-jùjìn","Adaptarse a los tiempos",["Modernizarse"]],["与众不同","與眾不同","yǔzhòng-bùtóng","Diferente",["Especial"]],["予以",null,"yǔyǐ","Dar",["Conceder"]],["宇宙",null,"yǔzhòu","Universo",["Cosmos","Espacio"]],["语气","語氣","yǔqì","Tono",["Manera"]],["浴室",null,"yùshì","Baño",["Ducha"]],["预定","預定","yùdìng","Reservar",["Programar"]],["预感","預感","yùgǎn","Presentimiento",["Intuición"]],["预告","預告","yùgào","Anunciar",["Adelantar"]],["预见","預見","yùjiàn","Prever",["Anticipar"]],["预料","預料","yùliào","Prever",["Esperar"]],["预赛","預賽","yùsài","Clasificación",["Eliminatoria"]],["预示","預示","yùshì","Indicar",["Señalar"]],["预售","預售","yùshòu","Venta anticipada",["Preventa"]],["预算","預算","yùsuàn","Presupuesto",["Estimación"]],["预先","預先","yùxiān","Previamente",["Antes"]],["预言","預言","yùyán","Predecir/aviso",["Profecía"]],["预兆","預兆","yùzhào","Presagio/adelantar",["Augurio"]],["欲望","慾望","yùwàng","Deseo",["Ambición"]],["遇难","遇難","yùnàn","Sufrir desastre",["Hallar infortunio"]],["遇上",null,"yùshang","Encontrarse con",["Toparse con"]],["遇险","遇險","yùxiǎn","Estar en peligro",["Correr riesgo"]],["寓言",null,"yùyán","Fábula",["Cuento moral"]],["寓意",null,"yùyì","Lección moral",["Significado"]],["愈合","癒合","yùhé","Sanar",["Curar"]],["愈来愈","愈來愈","yù lái yù","Cada vez más",["Progresivamente"]],["愈演愈烈",null,"yùyǎn-yùliè","Intensificarse",["Agravarse"]],["冤",null,"yuān","Injusticia",["Agraviado"]],["冤枉",null,"yuānwang","Acusar falsamente",["Injusto"]],["渊源","淵源","yuānyuán","Origen",["Procedencia"]],["元老",null,"yuánlǎo","Fundador",["Veterano"]],["元首",null,"yuánshǒu","Jefe de estado",["Presidente"]],["元宵节","元宵節","Yuánxiāo Jié","Fiesta de lámparas",["Fifteenth day"]],["原本",null,"yuánběn","Originalmente",["En principio"]],["原材料",null,"yuáncáiliào","Materia prima",["Insumo"]],["原创","原創","yuánchuàng","Crear originalmente",["Innovar"]],["原地",null,"yuándì","Lugar original",["Sitio"]],["原型",null,"yuánxíng","Prototipo",["Modelo"]],["原汁原味",null,"yuánzhī-yuánwèi","Auténtico",["Original"]],["原装","原裝","yuánzhuāng","Original",["De fábrica"]],["圆形","圓形","yuánxíng","Círculo",["Redondo"]],["缘分","緣分","yuánfèn","Destino",["Vínculo kármico"]],["源泉",null,"yuánquán","Fuente",["Origen"]],["源头","源頭","yuántóu","Origen cabecera",["Principio"]],["源于","源於","yuányú","Provenir de",["Derivar de"]],["源源不断","源源不斷","yuányuán-bùduàn","Constante",["Incesante"]],["远程","遠程","yuǎnchéng","A distancia",["Lejano"]],["远见","遠見","yuǎnjiàn","Previsión",["Perspicacia"]],["远近闻名","遠近聞名","yuǎnjìn-wénmíng","Famoso",["Conocido"]],["怨恨",null,"yuànhèn","Resentir",["Rencor"]],["怨气","怨氣","yuànqì","Resentimiento",["Amargura"]],["怨言",null,"yuànyán","Queja",["Murmuración"]],["院士",null,"yuànshì","Académico",["Miembro"]],["曰",null,"yuē","Decir (clásico)",null],["约定俗成","約定俗成","yuēdìng-súchéng","Convención",["Establecido"]],["月初",null,"yuèchū","Principio de mes",["Primero del mes"]],["月票",null,"yuèpiào","Pase mensual",["Abono mensual"]],["乐器","樂器","yuèqì","Instrumento musical",["Música"]],["岳父",null,"yuèfù","Suegro",["Consuegro"]],["岳母",null,"yuèmǔ","Suegra",["Consuegra"]],["阅历","閱歷","yuèlì","Experiencia",["Vivencias"]],["悦耳","悅耳","yuè'ěr","Melodioso",["Agradable"]],["越发","越發","yuèfā","Más aún",["Todavía"]],["越过","越過","yuèguò","Cruzar",["Traspasar"]],["晕倒","暈倒","yūndǎo","Desmayarse",["Desvanecerse"]],["陨石","隕石","yǔnshí","Meteorito",["Piedra del cielo"]],["孕妇","孕婦","yùnfù","Embarazada",["Gestante"]],["孕育",null,"yùnyù","Gestar",["Desarrollar"]],["运河","運河","yùnhé","Canal de navegación",["Vía artificial"]],["运送","運送","yùnsòng","Transportar",["Enviar"]],["运营","運營","yùnyíng","Operar",["Gestionar"]],["运转","運轉","yùnzhuǎn","Funcionar",["Operar"]],["酝酿","醞釀","yùnniàng","Preparar",["Gestar"]],["韵味","韻味","yùnwèi","Encanto",["Estilo"]],["蕴藏","蘊藏","yùncáng","Contener",["Albergar"]],["蕴涵","蘊涵","yùnhán","Implicar",["Contener"]],["杂技","雜技","zájì","Circo",["Acrobacias"]],["杂交","雜交","zájiāo","Cruzar",["Hibridar"]],["杂乱无章","雜亂無章","záluàn-wúzhāng","Desordenado",["Caótico"]],["砸",null,"zá","Golpear",["Destrozar","Fracasar"]],["栽",null,"zāi","Plantar",["Caer"]],["栽培",null,"zāipéi","Cultivar",["Fomentar"]],["宰",null,"zǎi","Sacrificar",["Matar"]],["再度",null,"zàidù","Nuevamente",["Otra vez"]],["再现","再現","zàixiàn","Reaparecer",["Representar"]],["在线","在線","zàixiàn","En línea",["Conectado"]],["在意",null,"zàiyì","Importar",["Preocupar"]],["在职","在職","zàizhí","En el cargo",["Empleado"]],["载体","載體","zàitǐ","Soporte",["Medio"]],["攒","攢","zǎn","Ahorrar",["Juntar"]],["暂","暫","zàn","Temporalmente",["Por ahora"]],["赞不绝口","讚不絕口","zànbùjuékǒu","Elogiar sin parar",["Alabar"]],["赞美","讚美","zànměi","Alabar",["Ensalzar"]],["赞叹","讚嘆","zàntàn","Admirar",["Exclamar"]],["赞叹不已","贊嘆不已","zàntàn-bùyǐ","Admirar profundamente",["Asombrarse"]],["赞同","贊同","zàntóng","Estar de acuerdo",["Aprobar"]],["赞许","讚許","zànxǔ","Aprobar",["Elogiar"]],["赞扬","讚揚","zànyáng","Elogiar",["Alabar"]],["葬",null,"zàng","Enterrar",["Sepultar"]],["葬礼","葬禮","zànglǐ","Funeral",["Sepelio"]],["遭殃",null,"zāoyāng","Sufrir",["Padecer"]],["凿","鑿","záo","Cincelar",["Horadar"]],["早年",null,"zǎonián","Juventud",["Temprano"]],["早日",null,"zǎorì","Pronto",["Cuanto antes"]],["枣","棗","zǎo","Dátiles",["Ciruela"]],["造福",null,"zàofú","Beneficiar",["Mejorar"]],["造假",null,"zàojiǎ","Falsificar",["Adulterar"]],["造价","造價","zàojià","Costo de construcción",["Presupuesto"]],["造就",null,"zàojiù","Formar",["Crear"]],["造纸术","造紙術","zàozhǐshù","Arte del papel",["Técnica"]],["噪声","噪聲","zàoshēng","Ruido",["Estruendo"]],["噪音",null,"zàoyīn","Ruido",["Molesto"]],["则","則","zé","Entonces (literario)",["Norma","Regla"]],["责备","責備","zébèi","Reprender",["Culpar"]],["责怪","責怪","zéguài","Culpar",["Echar la culpa"]],["贼","賊","zéi","Ladrón",["Criminal"]],["增收",null,"zēngshōu","Aumentar ingresos",["Recaudar"]],["增添",null,"zēngtiān","Agregar",["Añadir"]],["扎根",null,"zhāgēn","Echar raíces",["Arraigar"]],["渣子",null,"zhāzi","Borra",["Escoria","Residuo"]],["闸","閘","zhá","Compuerta",["Esclusa"]],["眨眼",null,"zhǎyǎn","Parpadear",["Guiñar"]],["诈骗","詐騙","zhàpiàn","Estafar",["Defraudar"]],["榨",null,"zhà","Exprimir",["Presionar"]],["窄",null,"zhǎi","Estrecho",["Angosto"]],["债务","債務","zhàiwù","Deuda",null],["占卜",null,"zhānbǔ","Adivinar",["Predecir"]],["沾",null,"zhān","Tocar",["Manchar"]],["沾光",null,"zhānguāng","Beneficiarse",["Aprovechar"]],["粘",null,"zhān","Pegar",["Adherir"]],["瞻仰",null,"zhānyǎng","Venerar",["Admirar"]],["斩","斬","zhǎn","Cortar",["Decapitar"]],["斩草除根","斬草除根","zhǎncǎo-chúgēn","Arrancar de raíz",["Eliminar por completo"]],["盏","盞","zhǎn","Vaso",["Copa"]],["展出",null,"zhǎnchū","Exhibir",["Mostrar"]],["展览会","展覽會","zhǎnlǎnhuì","Exposición",["Feria"]],["展望",null,"zhǎnwàng","Proyectar",["Vislumbrar"]],["崭新","嶄新","zhǎnxīn","Nuevo",["Reciente"]],["占用","佔用","zhànyòng","Ocupar",["Usar"]],["站立",null,"zhànlì","Estar de pie",["Pararse"]],["绽放","綻放","zhànfàng","Florecer",["Abrirse"]],["蘸",null,"zhàn","Mojar",["Empapar"]],["张灯结彩","張燈結彩","zhāngdēng-jiécǎi","Adornado",["Iluminado"]],["张贴","張貼","zhāngtiē","Pegar",["Afichar"]],["张扬","張揚","zhāngyáng","Ostentar",["Presumir"]],["长辈","長輩","zhǎngbèi","Mayor",["Anciano"]],["长相","長相","zhǎngxiàng","Apariencia",["Rostro"]],["掌管",null,"zhǎngguǎn","Administrar",["Dirigir"]],["帐篷","帳篷","zhàngpeng","Carpa",["Toldo"]],["帐子","帳子","zhàngzi","Cortina",["Mosquitero"]],["账单","賬單","zhàngdān","Cuenta",["Factura"]],["账号","賬號","zhànghào","Cuenta",["Usuario"]],["胀","脹","zhàng","Hinchar",["Inflar"]],["招标","招標","zhāobiāo","Licitación",["Convocatoria"]],["招待",null,"zhāodài","Atender",["Recibir"]],["招待会","招待會","zhāodàihuì","Recepción",["Evento"]],["招揽","招攬","zhāolǎn","Atraer",["Captar"]],["招募",null,"zhāomù","Reclutar",["Enrolar"]],["招牌",null,"zhāopai","Letrero",["Cartel"]],["招收",null,"zhāoshōu","Admitir",["Incorporar"]],["招数","招數","zhāoshù","Método",["Truco"]],["朝气蓬勃","朝氣蓬勃","zhāoqì-péngbó","Enérgico",["Vital"]],["朝三暮四",null,"zhāosān-mùsì","Cambiante",["Inconstante"]],["朝夕相处","朝夕相處","zhāoxī-xiāngchǔ","Convivir",["Compartir"]],["着迷","著迷","zháomí","Encantar",["Fascinar"]],["沼泽","沼澤","zhǎozé","Pantano",["Ciénaga"]],["召集",null,"zhàojí","Convocar",["Juntar"]],["兆头","兆頭","zhàotou","Presagio",["Augurio"]],["照办","照辦","zhàobàn","Hacer",["Cumplir"]],["照常",null,"zhàocháng","Normalmente",["Habitualmente"]],["照例",null,"zhàolì","Usualmente",["Generalmente"]],["照料",null,"zhàoliào","Cuidar",["Atender"]],["照明",null,"zhàomíng","Iluminar",["Alumbrar"]],["罩",null,"zhào","Cubrir",["Tapar"]],["肇事",null,"zhàoshì","Provocar",["Causar"]],["折腾","折騰","zhēteng","Molestar",["Fastidiar"]],["遮",null,"zhē","Ocultar",["Tapar"]],["遮盖","遮蓋","zhēgài","Cubrir",["Tapar"]],["折叠","折疊","zhédié","Doblar",["Plegar"]],["折合",null,"zhéhé","Equivaler",["Convertir"]],["折扣",null,"zhékòu","Descuento",["Promoción","Rebaja"]],["折磨",null,"zhémó","Torturar",["Atormentar"]],["折射",null,"zhéshè","Refractar",["Desviar"]],["这会儿","這會兒","zhèhuìr","Ahora",["Actualmente"]],["这样一来","這樣一來","zhèyàng-yīlái","Así",["De este modo"]],["针锋相对","針鋒相對","zhēnfēng-xiāngduì","Confrontación",["Oposición"]],["针灸","針灸","zhēnjiǔ","Acupuntura",["Punción"]],["侦察","偵察","zhēnchá","Espiar",["Investigar"]],["珍藏",null,"zhēncáng","Atesorar",["Conservar"]],["珍视","珍視","zhēnshì","Apreciar",["Valorar"]],["珍重",null,"zhēnzhòng","Cuidar",["Apreciar"]],["真假",null,"zhēnjiǎ","Verdad",["Autenticidad"]],["真空",null,"zhēnkōng","Vacío",["Vacuidad"]],["真情",null,"zhēnqíng","Sentimiento",["Emoción"]],["真是的",null,"zhēnshide","Menudo",null],["真心",null,"zhēnxīn","Corazón",["Sentimiento"]],["真挚","真摯","zhēnzhì","Sincero",["Genuino"]],["诊所","診所","zhěnsuǒ","Consultorio",["Clínica"]],["枕头","枕頭","zhěntou","Almohada",["Cabezal"]],["阵容","陣容","zhènróng","Plantilla",["Formación"]],["阵营","陣營","zhènyíng","Bando",["Facción"]],["振奋","振奮","zhènfèn","Animar",["Entusiasmar"]],["振兴","振興","zhènxīng","Revivir",["Reactivar"]],["振作",null,"zhènzuò","Animarse",["Levantarse"]],["震",null,"zhèn","Temblar",["Sacudir"]],["震动","震動","zhèndòng","Temblar",["Sacudir"]],["震撼",null,"zhènhàn","Conmover",["Impactar"]],["镇定","鎮定","zhèndìng","Calma",["Sereno"]],["争吵","爭吵","zhēngchǎo","Discutir",["Pelear"]],["争端","爭端","zhēngduān","Conflicto",["Disputa"]],["争分夺秒","爭分奪秒","zhēngfēn-duómiǎo","Apurado",["Urgente"]],["争光","爭光","zhēngguāng","Honrar",["Dignificar"]],["争气","爭氣","zhēngqì","Esforzarse",["Superarse"]],["争先恐后","爭先恐後","zhēngxiān-kǒnghòu","Competir",["Adelantarse"]],["争执","爭執","zhēngzhí","Discutir",["Debatir"]],["征",null,"zhēng","Reclutar",["Exigir"]],["征集","徵集","zhēngjí","Recopilar",["Reunir"]],["征收","徵收","zhēngshōu","Cobrar",["Imponer"]],["挣扎","掙扎","zhēngzhá","Luchar",["Forcejear"]],["症结","癥結","zhēngjié","Problema",["Dificultad"]],["睁","睜","zhēng","Abrir",["Despejar"]],["蒸",null,"zhēng","Cocer",["Asar"]],["拯救",null,"zhěngjiù","Salvar",["Rescatar"]],["整合",null,"zhěnghé","Integrar",["Unir"]],["整洁","整潔","zhěngjié","Limpio",["Ordenado"]],["整数","整數","zhěngshù","Número entero",["Cifra"]],["正面",null,"zhèngmiàn","Frente",["Anverso"]],["正能量",null,"zhèngnéngliàng","Energía positiva",["Fuerza"]],["正视","正視","zhèngshì","Enfrentar",["Afrontar"]],["正直",null,"zhèngzhí","Honesto",["Íntegro"]],["正宗",null,"zhèngzōng","Auténtico",["Original"]],["证人","證人","zhèngrén","Testigo",["Declarante"]],["郑重","鄭重","zhèngzhòng","Serio",["Solemne"]],["之",null,"zhī","De (posesivo, literario)",["Lo","Él/ella (clásico)"]],["之所以",null,"zhīsuǒyǐ","Por eso",["Entonces"]],["支票",null,"zhīpiào","Cheque",["Pagaré"]],["支柱",null,"zhīzhù","Pilar",["Apoyo","Sostén"]],["汁",null,"zhī","Jugo",null],["芝麻",null,"zhīma","Sésamo",["Ajonjolí"]],["芝士",null,"zhīshì","Queso",null],["知己",null,"zhījǐ","Amigo íntimo",["Confidente"]],["知觉","知覺","zhījué","Percepción",["Conciencia"]],["知识分子","知識分子","zhīshi fènzǐ","Intelectual",["Culto"]],["知足",null,"zhīzú","Conforma",null],["肢体","肢體","zhītǐ","Miembro",["Extremidad"]],["脂肪",null,"zhīfáng","Grasa",["Sebo"]],["执法","執法","zhífǎ","Aplicar",["Cumplir"]],["执意","執意","zhíyì","Insistir",["Decidir"]],["执照","執照","zhízhào","Licencia",["Permiso"]],["执着","執著","zhízhuó","Persistente",["Obstinado"]],["直奔",null,"zhíbèn","Dirigirse",["Ir directamente"]],["直达","直達","zhídá","Directo",null],["直观","直觀","zhíguān","Directo",["Evidente"]],["直径","直徑","zhíjìng","Diámetro",["Ancho"]],["直觉","直覺","zhíjué","Instinto",["Presentimiento"]],["直视","直視","zhíshì","Mirar fijamente",["Observar"]],["直至",null,"zhízhì","Hasta",["Incluso"]],["值钱","值錢","zhíqián","Valioso",["Costoso"]],["职权","職權","zhíquán","Autoridad",["Competencia"]],["职业病","職業病","zhíyèbìng","Enfermedad profesional",["Dolencia"]],["职员","職員","zhíyuán","Empleado",["Funcionario"]],["止步",null,"zhǐbù","Detenerse",["Parar"]],["止咳",null,"zhǐ ké","Detener la tos",["Antitusígeno"]],["止血",null,"zhǐxuè","Detener la sangre",["Hemostasia"]],["旨在",null,"zhǐzài","Tener como objetivo",["Perseguir"]],["指点","指點","zhǐdiǎn","Indicar",["Sugerir"]],["指教",null,"zhǐjiào","Dar consejos / instruir",null],["指令",null,"zhǐlìng","Orden",null],["指南",null,"zhǐnán","Guía",null],["指南针","指南針","zhǐnánzhēn","Brújula",null],["指手画脚","指手畫腳","zhǐshǒu-huàjiǎo","Criticar con gestos",null],["指望",null,"zhǐwàng","Esperar / depender de",null],["指向",null,"zhǐxiàng","Apuntar a / dirigirse a",null],["指引",null,"zhǐyǐn","Guiar",null],["至此",null,"zhìcǐ","Hasta aquí",null],["至关重要","至關重要","zhìguān-zhòngyào","Crucial",null],["志气","志氣","zhìqì","Ambición",null],["制","製","zhì","Controlar",["Hacer","Variante de 制"]],["制裁",null,"zhìcái","Sancionar",null],["制服",null,"zhìfú","Uniforme",null],["制品","製品","zhìpǐn","Producto",null],["制止",null,"zhìzhǐ","Impedir",null],["质地","質地","zhìdì","Textura",null],["质朴","質樸","zhìpǔ","Simple / rústico",null],["质问","質問","zhìwèn","Cuestionar",null],["质疑","質疑","zhìyí","Dudar",null],["治学","治學","zhìxué","Estudiar",null],["治愈","治癒","zhìyù","Curar",null],["致",null,"zhì","Enviar",["Causar","Conducir a (literario)"]],["致辞","致辭","zhìcí","Dar un discurso",null],["致富",null,"zhìfù","Enriquecerse",null],["致敬",null,"zhìjìng","Rendir homenaje",null],["致力于","致力於","zhìlì yú","Dedicarse a",null],["致命",null,"zhìmìng","Mortal",null],["致使",null,"zhìshǐ","Causar / por lo tanto",null],["秩序",null,"zhìxù","Orden",null],["窒息",null,"zhìxī","Asfixiar",null],["智商",null,"zhìshāng","Coeficiente intelectual",null],["滞后","滯後","zhìhòu","Retrasarse",null],["滞留","滯留","zhìliú","Quedarse",null],["置",null,"zhì","Colocar",null],["中国画","中國畫","zhōngguóhuà","Pintura china",null],["中立",null,"zhōnglì","Neutral",null],["中途",null,"zhōngtú","Medio camino",null],["中型",null,"zhōngxíng","Mediano",null],["中性",null,"zhōngxìng","Neutro",null],["中旬",null,"zhōngxún","Década del mes",null],["中庸",null,"zhōngyōng","El justo medio (Confucio)",null],["中止",null,"zhōngzhǐ","Suspender",null],["忠诚","忠誠","zhōngchéng","Leal",null],["忠实","忠實","zhōngshí","Fiel",null],["忠于","忠於","zhōngyú","Ser leal a",null],["忠贞","忠貞","zhōngzhēn","Fiel",null],["终结","終結","zhōngjié","Finalizar",null],["终究","終究","zhōngjiū","Finalmente",null],["终生","終生","zhōngshēng","Toda la vida",null],["衷心",null,"zhōngxīn","Sincero",null],["肿瘤","腫瘤","zhǒngliú","Tumor",null],["种族","種族","zhǒngzú","Etnia",null],["仲裁",null,"zhòngcái","Arbitrar",null],["众人","眾人","zhòngrén","Mucha gente",null],["众所周知","眾所周知","zhòngsuǒzhōuzhī","Como es sabido",null],["众志成城","眾志成城","zhòngzhì-chéngchéng","Unidos somos fuertes",null],["重创","重創","zhòngchuāng","Herir gravemente",null],["重量级","重量級","zhòngliàngjí","De alto nivel",null],["重任",null,"zhòngrèn","Gran responsabilidad",null],["重伤","重傷","zhòngshāng","Herida grave",null],["重心",null,"zhòngxīn","Centro de gravedad",null],["重型",null,"zhòngxíng","Pesado",null],["重中之重",null,"zhòngzhōngzhīzhòng","Lo más importante",null],["周边","周邊","zhōubiān","Alrededores",null],["周到",null,"zhōudào","Atento",null],["周密",null,"zhōumì","Minucioso",null],["周旋",null,"zhōuxuán","Negociar",null],["昼夜","晝夜","zhòuyè","De noche y de día",null],["皱","皺","zhòu","Arrugarse / arruga",null],["骤然","驟然","zhòurán","Repentinamente",null],["朱红","朱紅","zhūhóng","Rojo carmesí",null],["株",null,"zhū","Planta",null],["诸多","諸多","zhūduō","Muchos",null],["诸如此类","諸如此類","zhūrú-cǐlèi","Cosas por el estilo",null],["竹竿",null,"zhúgān","Bambú",null],["逐年",null,"zhúnián","Año tras año",null],["主",null,"zhǔ","Anfitrión",["Indicar o significar","Dios"]],["主编","主編","zhǔbiān","Editor / editar",null],["主妇","主婦","zhǔfù","Ama de casa",null],["主力",null,"zhǔlì","Fuerza principal",null],["主权","主權","zhǔquán","Soberanía",null],["主人公",null,"zhǔréngōng","Protagonista",null],["主食",null,"zhǔshí","Plato principal",null],["主题歌","主題歌","zhǔtígē","Canción principal",null],["主演",null,"zhǔyǎn","Actor principal / protagonizar",null],["主页","主頁","zhǔyè","Página principal",null],["主义","主義","zhǔyì","Ideología",null],["主宰",null,"zhǔzǎi","Dominar",null],["拄",null,"zhǔ","Apoyarse",null],["嘱咐","囑咐","zhǔfù","Aconsejar",null],["瞩目","矚目","zhǔmù","Llamar la atención",null],["助威",null,"zhùwēi","Animar",null],["住处","住處","zhùchù","Residencia",["Vivienda"]],["住户","住戶","zhùhù","Residente",null],["住宿",null,"zhùsù","Alojarse",null],["住址",null,"zhùzhǐ","Domicilio",["Dirección"]],["贮藏","貯藏","zhùcáng","Almacenar",null],["注",null,"zhù","Inyectar",["Comentario","Nota"]],["注定","註定","zhùdìng","Estar destinado a",null],["注入",null,"zhùrù","Inyectar",null],["铸造","鑄造","zhùzào","Fundir",null],["筑","築","zhù","Construir",null],["爪子",null,"zhuǎzi","Garra",null],["拽",null,"zhuài","Jalar",null],["专长","專長","zhuāncháng","Especialidad",null],["专程","專程","zhuānchéng","Específicamente",null],["专柜","專櫃","zhuānguì","Mostrador",null],["专栏","專欄","zhuānlán","Columna",null],["专卖店","專賣店","zhuānmàidiàn","Tienda especializada",null],["专人","專人","zhuānrén","Persona específica",null],["专职","專職","zhuānzhí","Trabajo a tiempo completo",null],["专制","專制","zhuānzhì","Dictatorial",null],["专注","專注","zhuānzhù","Concentrado",null],["专著","專著","zhuānzhù","Tratado",null],["砖","磚","zhuān","Ladrillo",null],["转播","轉播","zhuǎnbō","Transmitir",null],["转达","轉達","zhuǎndá","Comunicar",null],["转机","轉機","zhuǎnjī","Vuelo de conexión / oportunidad",null],["转交","轉交","zhuǎnjiāo","Entregar",null],["转型","轉型","zhuǎnxíng","Transformarse",null],["转学","轉學","zhuǎnxué","Cambiar de escuela",null],["转眼","轉眼","zhuǎnyǎn","En un instante",null],["转载","轉載","zhuǎnzǎi","Reproducir",null],["转折","轉折","zhuǎnzhé","Giro",null],["转折点","轉折點","zhuǎnzhédiǎn","Punto de inflexión",null],["传记","傳記","zhuànjì","Biografía",null],["转悠","轉悠","zhuànyou","Pasear",null],["撰写","撰寫","zhuànxiě","Redactar",["Componer"]],["庄稼","莊稼","zhuāngjia","Cosecha",["Cultivo"]],["庄严","莊嚴","zhuāngyán","Solemne",["Majestuoso"]],["庄园","莊園","zhuāngyuán","Finca",["Hacienda"]],["桩","樁","zhuāng","Poste",["Estaca"]],["装扮","裝扮","zhuāngbàn","Disfrazar",["Ataviar"]],["壮","壯","zhuàng","Robusto",["Vigoroso"]],["壮大","壯大","zhuàngdà","Fortalecer",["Crecer"]],["壮胆","壯膽","zhuàngdǎn","Animarse",["Dar ánimos"]],["壮丽","壯麗","zhuànglì","Magnífico",["Espléndido"]],["壮实","壯實","zhuàngshi","Fornido",["Robusto"]],["状元","狀元","zhuàngyuan","Primer scholar",["Mejor examinado"]],["撞击","撞擊","zhuàngjī","Chocar",["Golpear"]],["幢",null,"zhuàng","Edificio",["Bloque"]],["追悼会","追悼會","zhuīdàohuì","Velorio",["Funeral"]],["追赶","追趕","zhuīgǎn","Perseguir",["Alcanzar"]],["追溯",null,"zhuīsù","Remontar",["Buscar origen"]],["追随","追隨","zhuīsuí","Seguir",["Imitar"]],["追尾",null,"zhuīwěi","Alcance",["Colisión trasera"]],["追问","追問","zhuīwèn","Indagar",["Insistir"]],["追逐",null,"zhuīzhú","Perseguir",["Cazar"]],["追踪","追蹤","zhuīzōng","Rastrear",["Seguir"]],["坠","墜","zhuì","Caer",["Precipitar"]],["准许","准許","zhǔnxǔ","Permitir",["Autorizar"]],["准则","準則","zhǔnzé","Principio",["Norma"]],["拙劣",null,"zhuōliè","Torpe",["Mediocre"]],["捉迷藏",null,"zhuōmícáng","Escondite",["Juego de escondidas"]],["灼热","灼熱","zhuórè","Ardiente",["Abrasador"]],["卓越",null,"zhuóyuè","Excelente",["Sobresaliente"]],["酌情",null,"zhuóqíng","Según conveniencia",["A criterio"]],["着力","著力","zhuólì","Esforzarse",["Aplicar fuerza"]],["着落","著落","zhuóluò","Paradero",["Destino"]],["着实","著實","zhuóshí","Realmente",["Verdaderamente"]],["着手","著手","zhuóshǒu","Empezar",["Comenzar"]],["着想","著想","zhuóxiǎng","Considerar",["Pensar"]],["着眼","著眼","zhuóyǎn","Centrarse",["Fijarse"]],["着眼于","著眼於","zhuóyǎn yú","Centrarse en",["Enfocar en"]],["着重","著重","zhuózhòng","Enfatizar",["Destacar"]],["姿势","姿勢","zīshì","Postura",["Posición"]],["姿态","姿態","zītài","Actitud",["Porte"]],["兹","茲","zī","Aquí",["Ahora"]],["资本主义","資本主義","zīběn zhǔyì","Capitalismo",["Sistema capitalista"]],["资历","資歷","zīlì","Antigüedad",["Experiencia"]],["资深","資深","zīshēn","Veterano",["Experimentado"]],["资讯","資訊","zīxùn","Información",["Noticias"]],["滋润","滋潤","zīrùn","Húmedo",["Nutritivo"]],["滋味",null,"zīwèi","Sabor",["Gusto"]],["子弟",null,"zǐdì","Descendiente",["Joven"]],["子孙","子孫","zǐsūn","Descendientes",["Herederos"]],["自卑",null,"zìbēi","Complejo de inferioridad",["Sentirse inferior"]],["自称","自稱","zìchēng","Autodenominarse",["Llamarse a sí mismo"]],["自发","自發","zìfā","Espontáneo",["Voluntario"]],["自费","自費","zìfèi","Pagar uno mismo",["Costearse"]],["自负","自負","zìfù","Arrogante",["Presuntuoso"]],["自理",null,"zìlǐ","Autocuidado",["Gestionar uno mismo"]],["自力更生",null,"zìlì-gēngshēng","Autosuficiencia",["Valerse por sí mismo"]],["自立",null,"zìlì","Independizarse",["Sostenerse"]],["自强不息","自強不息","zìqiáng-bùxī","Superarse constantemente",["Esforzarse sin cesar"]],["自然而然",null,"zìrán'érrán","Naturalmente",["Espontáneamente"]],["自然界",null,"zìránjiè","Naturaleza",["Mundo natural"]],["自如",null,"zìrú","Con soltura",["Con facilidad"]],["自始至终","自始至終","zìshǐ-zhìzhōng","Desde principio a fin",["Completamente"]],["自私",null,"zìsī","Egoísta",["Interesado"]],["自私自利",null,"zìsī-zìlì","Egoísta",["Interesado"]],["自卫","自衛","zìwèi","Defenderse",["Autoprotección"]],["自相矛盾",null,"zìxiāng-máodùn","Contradictorio",["Inconsistente"]],["自信心",null,"zìxìnxīn","Autoconfianza",["Seguridad"]],["自行",null,"zìxíng","Por sí mismo (自行车 = bicicleta)",null],["自以为是","自以為是","zìyǐwéishì","Creerse superior",["Dogmático"]],["自由自在",null,"zìyóu-zìzài","Libre",["Despreocupado"]],["自责","自責","zìzé","Reproparse",["Culparse"]],["自助",null,"zìzhù","Autoservicio",["Servirse uno mismo"]],["自尊",null,"zìzūn","Autoestima",["Respeto propio"]],["自尊心",null,"zìzūnxīn","Autoestima",["Orgullo"]],["字迹","字跡","zìjì","Caligrafía",["Escritura"]],["字幕",null,"zìmù","Subtítulos",null],["字体","字體","zìtǐ","Tipo de letra",["Fuente"]],["字眼",null,"zìyǎn","Palabra",["Término"]],["宗",null,"zōng","Secta",["Rama"]],["宗旨",null,"zōngzhǐ","Principio",["Objetivo"]],["综上所述","綜上所述","zōngshàng-suǒshù","En resumen",["Como se ha dicho"]],["总的来说","總的來說","zǒngde lái shuō","En general",["Básicamente"]],["总额","總額","zǒng'é","Total",["Suma"]],["总而言之","總而言之","zǒng'éryánzhī","En conclusión",["En resumen"]],["总计","總計","zǒngjì","Sumar",["Totalizar"]],["纵观","縱觀","zòngguān","纵观",["Examinar en general"]],["纵横交错","縱橫交錯","zònghéng-jiāocuò","Entrelazado",["Cruzado"]],["纵然","縱然","zòngrán","Aunque",["Si bien"]],["纵容","縱容","zòngróng","Consentir",["Tolerar"]],["纵深","縱深","zòngshēn","Profundidad",["Extensión"]],["粽子",null,"zòngzi","Zongzi",["Pastre de arroz"]],["走过场","走過場","zǒu guòchǎng","Hacer por cumplir",["Formalidad"]],["走后门","走後門","zǒu hòumén","Usar contactos",["Corrupción"]],["走近",null,"zǒujìn","Acercarse",["Aproximarse"]],["走廊",null,"zǒuláng","Pasillo",["Corredor"]],["走投无路","走投無路","zǒutóu-wúlù","Sin salida",["Desesperado"]],["走弯路","走彎路","zǒu wānlù","Dar rodeos",["Complicar"]],["奏效",null,"zòuxiào","Funcionar",["Surtir efecto"]],["揍",null,"zòu","Golpear",["Pegar"]],["租赁","租賃","zūlìn","Alquilar",["Arrendar"]],["足迹","足跡","zújì","Huella",["Rastro"]],["足智多谋","足智多謀","zúzhì-duōmóu","Astuto",["Ingenioso"]],["阻挡","阻擋","zǔdǎng","Bloquear",["Impedir"]],["阻拦","阻攔","zǔlán","Detener",["Impedir"]],["阻力",null,"zǔlì","Resistencia",["Obstáculo"]],["阻挠","阻撓","zǔnáo","Obstaculizar",["Dificultar"]],["组建","組建","zǔjiàn","Formar",["Crear"]],["组装","組裝","zǔzhuāng","Ensamblar",["Montar"]],["祖传","祖傳","zǔchuán","Heredado",["Tradicional"]],["祖籍",null,"zǔjí","Lugar de origen",["Patria"]],["祖先",null,"zǔxiān","Antepasado",["Predecesor"]],["祖宗",null,"zǔzong","Antepasado",["Ancestro"]],["钻空子","鑽空子","zuān kòngzi","Aprovechar",["Esquivar"]],["钻研","鑽研","zuānyán","Estudiar",["Investigar"]],["钻石","鑽石","zuànshí","Diamante",["Gema"]],["嘴唇",null,"zuǐchún","Labio",["Boca"]],["罪犯",null,"zuìfàn","Criminal",["Delincuente"]],["罪魁祸首","罪魁禍首","zuìkuí-huòshǒu","Culpable",["Principal responsable"]],["尊贵","尊貴","zūnguì","Noble",["Ilustre"]],["尊严","尊嚴","zūnyán","Dignidad",["Decoro"]],["遵循",null,"zūnxún","Seguir",["Respetar"]],["遵照",null,"zūnzhào","Conforme a",["Según"]],["琢磨",null,"zuómo","Reflexionar",["Considerar"]],["左顾右盼","左顧右盼","zuǒgù-yòupàn","Mirar alrededor",["Indeciso"]],["佐料",null,"zuǒliào","Condimento",["Especia"]],["作弊",null,"zuòbì","Hacer trampa",["Copiar"]],["作对","作對","zuòduì","Oponerse",["Desafiar"]],["作风","作風","zuòfēng","Estilo",["Modo"]],["作客",null,"zuòkè","Ser invitado",["Visitar"]],["作物",null,"zuòwù","Cultivo",["Producción agrícola"]],["坐落",null,"zuòluò","Estar situado",["Localizarse"]],["座谈","座談","zuòtán","Tener una charla",["Conversar"]],["座右铭","座右銘","zuòyòumíng","Lema",["Divisa"]],["做生意",null,"zuò shēngyi","Hacer negocios",null],["做证","做證","zuòzhèng","Testificar",["Declarar"]]],
'TOCFL-Prep': [["我",null,"wǒ","Yo",["Personal"]],["你",null,"nǐ","Tú",["Usted"]],["他",null,"tā","Él",null],["我们","我們","wǒmen","Nosotros",["Personal"]],["你们","你們","nǐmen","Vosotros/ustedes",["Ustedes"]],["他们","他們","tāmen","Ellos",null],["您",null,"nín","Usted",["Formal"]],["谁","誰","shéi","Quién",null],["姓名",null,"xìngmíng","Nombre completo",null],["人",null,"rén","Persona",["Gente"]],["国","國","guó","País",["Nación"]],["中国","中國","Zhōngguó","China",["País"]],["美国","美國","Měiguó","Estados Unidos",["América"]],["日本",null,"Rìběn","Japón",["Nipón"]],["台湾","台灣","Táiwān","Taiwán",["Isla formosa"]],["名字",null,"míngzi","Nombre",["Apodo"]],["家",null,"jiā","Casa",["Hogar"]],["电话","電話","diànhuà","Teléfono",null],["时间","時間","shíjiān","Tiempo",["Hora"]],["小时","小時","xiǎoshí","Hora",["Unidad de tiempo"]],["现在","現在","xiànzài","Ahora",["Presente"]],["今年",null,"jīnnián","Este año",["Año actual"]],["今天",null,"jīntiān","Hoy",["Día de hoy"]],["明天",null,"míngtiān","Mañana",["Día siguiente"]],["昨天",null,"zuótiān","Ayer",null],["早上",null,"zǎoshàng","Mañana",["Temprano"]],["上午",null,"shàngwǔ","Mañana",null],["中午",null,"zhōngwǔ","Mediodía",null],["下午",null,"xiàwǔ","Tarde",["Mediodía"]],["晚上",null,"wǎnshàng","Noche",["Tarde"]],["一",null,"yī","Uno",["Numeral"]],["二",null,"èr","Dos",null],["三",null,"sān","Tres",null],["四",null,"sì","Cuatro",null],["五",null,"wǔ","Cinco",["Numeral"]],["六",null,"liù","Seis",["Sexta"]],["七",null,"qī","Siete",null],["八",null,"bā","Ocho",null],["九",null,"jiǔ","Nueve",["Nona"]],["十",null,"shí","Diez",null],["两","兩","liǎng","Dos",["Doble"]],["时候","時候","shíhòu","Momento",["Ocasión"]],["百",null,"bǎi","Cien",null],["半",null,"bàn","Medio",null],["千",null,"qiān","Mil",["Millar"]],["爸爸",null,"bàba","Papá",["Padre"]],["妈妈","媽媽","māma","Mamá",["Madre"]],["哥哥",null,"gēge","Hermano mayor",null],["弟弟",null,"dìdi","Hermano menor",null],["姊姊",null,"jiějie","Hermana mayor",null],["妹妹",null,"mèimei","Hermana menor",null],["小孩",null,"xiǎohái","Niño",null],["的",null,"de","Partícula",null],["第",null,"dì","Prefijo ordinal",null],["分",null,"fēn","Minuto",null],["点","點","diǎn","Punto/hora",null],["个","個","ge","Uno",null],["岁","歲","suì","Año",["Edad"]],["年",null,"nián","Año",["Edad"]],["住",null,"zhù","Vivir",["Habitar"]],["来","來","lái","Venir",["Llegar"]],["是",null,"shì","Ser",["Estar"]],["姓",null,"xìng","Apellido/nombre de familia",null],["觉得","覺得","juéde","Sentir",["Pensar"]],["喜欢","喜歡","xǐhuān","Gustar",["Preferir"]],["打电话","打電話","dǎ diànhuà","Llamar por teléfono",null],["漂亮",null,"piàoliàng","Hermoso",["Guapo"]],["高",null,"gāo","Alto",null],["老",null,"lǎo","Viejo",["Antiguo"]],["好",null,"hǎo","Bueno",["Excelente"]],["很",null,"hěn","Muy",["Bastante"]],["真",null,"zhēn","Real",["Verdadero"]],["电脑","電腦","diànnǎo","Computadora",null],["老师","老師","lǎoshī","Maestro",["Profesora"]],["买","買","mǎi","Comprar",["Adquirir"]],["忙",null,"máng","Ocupado",["Ajetreado"]],["学生","學生","xuéshēng","Estudiante",["Alumno"]],["大学","大學","dàxué","Universidad",null],["学校","學校","xuéxiào","Escuela",["Centro educativo"]],["中文",null,"Zhōngwén","Chino",["Idioma"]],["同学","同學","tóngxué","Compañero/a de clase",null],["字",null,"zì","Carácter",["Letra"]],["笔","筆","bǐ","Bolígrafo",["Lápiz"]],["学","學","xué","Estudiar",["Aprender"]],["问","問","wèn","Preguntar",["Interrogar"]],["说","說","shuō","Decir",["Hablar"]],["写","寫","xiě","Escribir",["Trazar"]],["听","聽","tīng","Oír",["Escuchar"]],["对","對","duì","Correcto",null],["能",null,"néng","Poder",["Ser capaz"]],["可以",null,"kěyǐ","Poder",["Permitir"]],["上课","上課","shàngkè","Tener clase",null],["知道",null,"zhīdào","Saber",["Conocer"]],["电视","電視","diànshì","Televisión",null],["水",null,"shuǐ","Agua",["Líquido"]],["久",null,"jiǔ","Largo",["Prolongado","Duradero"]],["早",null,"zǎo","Temprano",["Matutino"]],["再",null,"zài","Otra vez",["Nuevamente"]],["书","書","shū","Libro",["Texto"]],["电影","電影","diànyǐng","Película",null],["以前",null,"yǐqián","Antes",null],["以后","以後","yǐhòu","Después",null],["走",null,"zǒu","Caminar",["Ir"]],["等",null,"děng","Esperar",null],["看",null,"kàn","Ver",["Mirar"]],["就",null,"jiù","Entonces",["Justo"]],["什么","什麼","shénme","Qué",["Cuál"]],["朋友",null,"péngyǒu","Amigo",["Conocido"]],["东西","東西","dōngxi","Cosa/cosas",null],["吧",null,"ba","Partícula modal",null],["呢",null,"ne","Partícula interrogativa",["¿eh?"]],["吗","嗎","ma","Partícula interrogativa",["Marca pregunta"]],["找",null,"zhǎo","Buscar",["Encontrar"]],["做",null,"zuò","Hacer",null],["再见","再見","zàijiàn","Despedirse",["Hasta luego"]],["怎么样","怎麼樣","zěnmeyàng","Cómo",null],["叫",null,"jiào","Llamar",["Gritar"]],["谢谢","謝謝","xièxie","Agradecer",["Dar las gracias"]],["对不起","對不起","duìbùqǐ","Perdonar",null],["请问","請問","qǐngwèn","Preguntar",["Disculpe"]],["这","這","zhè","Este",["Aquí"]],["那",null,"nà","Ese/aquel",["Aquel"]],["公共汽车","公共汽車","gōnggòngqìchē","Autobús",["Colectivo"]],["车","車","chē","Coche",null],["到",null,"dào","Llegar",null],["去",null,"qù","Ir",["Marchar"]],["回",null,"huí","Volver",["Regresar"]],["坐",null,"zuò","Sentarse",["Sentar"]],["这里","這裡","zhèlǐ","Aquí",["En este lugar"]],["那里","那裡","nàlǐ","Allá",["Por allí"]],["哪里","哪裡","nǎlǐ","Dónde",["Adónde"]],["开车","開車","kāichē","Manejar",["Conducir"]],["钱","錢","qián","Dinero",["Moneda"]],["多少",null,"duōshǎo","Cuánto",null],["给","給","gěi","Dar/con",null],["贵","貴","guì","Caro",["Valioso"]],["便宜",null,"piányí","Barato",["Económico"]],["大",null,"dà","Grande",null],["小",null,"xiǎo","Pequeño",["Diminutivo"]],["难","難","nán","Difícil",["Complicado"]],["容易",null,"róngyì","Fácil",["Sencillo"]],["有",null,"yǒu","Tener",["Existir"]],["想",null,"xiǎng","Pensar",["Desear"]],["几","幾","jǐ","Cuántos",["Algunos"]],["块","塊","kuài","Yuan",["Pedazo"]],["位",null,"wèi","Señor/señora",null],["饭","飯","fàn","Comida",null],["吃",null,"chī","Comer",null],["请","請","qǐng","Pedir",["Invitar"]],["也",null,"yě","También",["Igualmente"]],["不",null,"bù","No",null],["没","沒","méi","No",["No haber"]],["都",null,"dōu","Todos",null],["只",null,"zhǐ","Solo",null],["可是",null,"kěshì","Pero",["Sin embargo"]],["还是","還是","háishì","O",["Tal vez"]],["了",null,"le","Partícula final",["Marca aspecto perfecto"]],["得",null,"de","Obtener/conseguir",["Lograr","Tener que (děi)"]],["过","過","guò","Pasar",["Cruzar"]],["没有","沒有","méiyǒu","No tener",["No haber"]],["男",null,"nán","Masculino",["Varón"]],["女",null,"nǚ","Femenino",["Hembra"]],["孩子",null,"háizi","Niño",["Hija"]],["小姐",null,"xiǎojiě","Señorita",["Dama"]],["先生",null,"xiānshēng","Señor",["Caballero"]],["太太",null,"tàitai","Señora",null],["女儿","女兒","nǚ'ér","Hija",["Niña"]],["儿子","兒子","érzi","Hijo",null],["大家",null,"dàjiā","Todos",["Gente"]],["路",null,"lù","Camino",["Calle"]],["手机","手機","shǒujī","Móvil",["Teléfono"]],["明年",null,"míngnián","Año próximo",["El que viene"]],["去年",null,"qùnián","Año pasado",null],["生日",null,"shēngrì","Cumpleaños",null],["月",null,"yuè","Mes",["Luna"]],["日",null,"rì","Día",["Sol"]],["星期",null,"xīngqí","Semana",["Período"]],["星期天",null,"Xīngqítiān","Domingo",["Día festivo"]],["礼拜天","禮拜天","Lǐbàitiān","Domingo",["Día domingo"]],["周末","週末","zhōumò","Fin de semana",null],["号","號","hào","Número",["Signo"]],["天",null,"tiān","Cielo",["Día"]],["从","從","cóng","Desde",null],["在",null,"zài","Estar",["En"]],["爱","愛","ài","Amar",["Gustar"]],["快乐","快樂","kuàilè","Feliz",["Contento"]],["太",null,"tài","Demasiado",["Muy"]],["公园","公園","gōngyuán","Parque",["Jardín"]],["国家","國家","guójiā","Nación",["Estado"]],["分钟","分鐘","fēnzhōng","Minuto",["Hora"]],["家人",null,"jiārén","Familiar",["Pariente"]],["胖",null,"pàng","Gordo",["Grueso"]],["矮",null,"ǎi","Bajo",null],["瘦",null,"shòu","Delgado",null],["万","萬","wàn","Diez mil",null],["钟头","鐘頭","zhōngtóu","Hora",["Reloj"]],["晚",null,"wǎn","Tarde",["Nocturno"]],["前天",null,"qiántiān","Anteayer",["Pasado mañana"]],["后天","後天","hòutiān","Pasado mañana",["Dentro de dos días"]],["前年",null,"qiánnián","El año pasado",["Año anterior"]],["后年","後年","hòunián","Después del próximo año",["Dentro de dos años"]],["自己",null,"zìjǐ","Uno mismo",null],["它",null,"tā","Él/ella",null],["它们","它們","tāmen","Ellos/ellas",null],["最",null,"zuì","Más",null],["怕",null,"pà","Tener miedo",["Temer"]],["美",null,"měi","Hermoso",["Bello"]],["应该","應該","yīnggāi","Deber",null],["真的",null,"zhēnde","Realmente",["En verdad"]],["工作",null,"gōngzuò","Trabajar/trabajo",null],["医生","醫生","yīshēng","Médico",["Profesional"]],["一点","一點","yīdiǎn","Un poco",["Un poquito"]],["一些",null,"yīxiē","Algunos",["Varios"]],["本",null,"běn","Libro",null],["张","張","zhāng","Hoja",["Medido"]],["英文",null,"Yīngwén","Inglés",null],["纸","紙","zhǐ","Papel",null],["问题","問題","wèntí","Problema",null],["意思",null,"yìsi","Significado",null],["餐厅","餐廳","cāntīng","Comedor",["Restaurante","Cantina"]],["画","畫","huà","Dibujar",["Pintar"]],["读","讀","dú","Leer",null],["会","會","huì","Poder",["Conocer"]],["为什么","為什麼","wèishénme","Por qué",null],["下课","下課","xiàkè","Terminar clase",["Salir del aula"]],["说话","說話","shuōhuà","Hablar",["Conversar"]],["考试","考試","kǎoshì","Examen",["Prueba"]],["懂",null,"dǒng","Entender",["Comprender"]],["念",null,"niàn","Pensar",["Estudiar"]],["课","課","kè","Clase",["Lección"]],["教",null,"jiāo","Enseñar",["Instruir"]],["告诉","告訴","gàosù","Decir",null],["错","錯","cuò","Equivocado",null],["门口","門口","ménkǒu","Entrada",["Puerta"]],["枝",null,"zhī","Rama",null],["牛",null,"niú","Buey",["Ganado"]],["猪","豬","zhū","Cerdo",["Cochino"]],["雨",null,"yǔ","Lluvia",["Precipitación"]],["空气","空氣","kōngqì","Aire",["Ambiente"]],["功课","功課","gōngkè","Tarea",["Estudio"]],["教室",null,"jiàoshì","Aula",["Salón"]],["句子",null,"jùzi","Oración",["Frase"]],["休息",null,"xiūxí","Descansar",["Relajarse"]],["非常",null,"fēicháng","Muy",null],["房",null,"fáng","Casa/cuarto",["Habitación"]],["房间","房間","fángjiān","Habitación",null],["楼","樓","lóu","Edificio",["Piso"]],["门","門","mén","Puerta",["Entrada"]],["桌",null,"zhuō","Mesa",["Escritorio"]],["椅",null,"yǐ","Silla",["Asiento"]],["床",null,"chuáng","Cama",null],["开","開","kāi","Abrir",["Empezar"]],["低",null,"dī","Bajo",["Deprimir"]],["不错","不錯","bùcuò","Bueno",["Correcto"]],["天气","天氣","tiānqì","Clima",["Tiempo"]],["冷",null,"lěng","Frío",["Helado"]],["热","熱","rè","Caliente",["Caluroso"]],["下雨",null,"xiàyǔ","Llover",["Precipitación"]],["风","風","fēng","Viento",null],["山",null,"shān","Montaña",["Cerro"]],["花",null,"huā","Flor",["Gastar"]],["鱼","魚","yú","Pescado",null],["鸡","雞","jī","Pollo",["Gallo"]],["咖啡",null,"kāfēi","Café",["Taza","Bebida"]],["茶",null,"chá","Té",null],["用",null,"yòng","Usar",["Emplear"]],["穿",null,"chuān","Vestir",null],["起床",null,"qǐchuáng","Levantarse",null],["方便",null,"fāngbiàn","Conveniente",["Práctico"]],["睡觉","睡覺","shuìjiào","Dormir",null],["起来","起來","qǐlái","Levantarse",null],["先",null,"xiān","Primero",["Antes"]],["常常",null,"chángcháng","A menudo",null],["每",null,"měi","Cada/todos",["Cada uno"]],["打",null,"dǎ","Golpear/tomar",null],["玩",null,"wán","Jugar",["Divertirse","Juguete"]],["运动","運動","yùndòng","Hacer ejercicio/deporte",null],["走路",null,"zǒulù","Caminar",["Andar"]],["唱歌",null,"chànggē","Cantar",null],["跳",null,"tiào","Saltar",["Brincar"]],["还","還","hái","Todavía",["Aún"]],["唱",null,"chàng","Cantar",null],["歌",null,"gē","Canción",null],["跳舞",null,"tiàowǔ","Bailar",["Danzar"]],["又",null,"yòu","Otra vez",null],["球",null,"qiú","Bola",["Pelota"]],["介绍","介紹","jièshào","Presentar",["Introducir"]],["没关系","沒關係","méiguānxi","No importa",["No hay problema"]],["事",null,"shì","Cosa",["Asunto"]],["怎么","怎麼","zěnme","Cómo",["Por qué"]],["哪",null,"nǎ","Qué",["Cuál"]],["里面","裡面","lǐmiàn","Dentro",["Interior","Adentro"]],["上",null,"shàng","Subir",["Encima"]],["下",null,"xià","Bajar",["Siguiente"]],["外",null,"wài","Fuera",["Exterior"]],["外头","外頭","wàitou","Afuera",null],["前",null,"qián","Frente",["Delante"]],["后","後","hòu","Después",["Atrás"]],["左",null,"zuǒ","Izquierda",null],["右",null,"yòu","Derecha",["Lado"]],["旁",null,"páng","Lado",["Costado"]],["里","裡","lǐ","Dentro",["Interior"]],["中",null,"zhōng","Centro",["Medio"]],["地方",null,"dìfāng","Lugar",null],["附近",null,"fùjìn","Cerca",["Cercanía"]],["带","帶","dài","Llevar",["Trasportar"]],["拿",null,"ná","Tomar",["Agarrar"]],["站",null,"zhàn","Parada",["Estación"]],["快",null,"kuài","Rápido",["Pronto"]],["慢",null,"màn","Lento",["Pausado"]],["计程车","計程車","jìchéngchē","Taxi",["Coche de alquiler"]],["火车","火車","huǒchē","Tren",["Ferrocarril"]],["飞机","飛機","fēijī","Avión",null],["辆","輛","liàng","Vehículo",["Unidad"]],["出",null,"chū","Salir",null],["进","進","jìn","Entrar",["Avanzar"]],["外国","外國","wàiguó","País extranjero",["Extranjero"]],["手",null,"shǒu","Mano",["Brazo"]],["脚","腳","jiǎo","Pie",["Pata"]],["身体","身體","shēntǐ","Cuerpo",["Físico"]],["眼睛",null,"yǎnjīng","Ojo",null],["鼻",null,"bí","Nariz",["Hocico"]],["药","藥","yào","Medicina",null],["累",null,"lèi","Cansado",["Fatigado"]],["头","頭","tóu","Cabeza",null],["耳朵",null,"ěrduo","Oído",["Oreja"]],["感冒",null,"gǎnmào","Resfriado/enfermarse",["Catarro","Influenza"]],["生病",null,"shēngbìng","Enfermarse",null],["饿","餓","è","Hambre/hambriento",null],["痛",null,"tòng","Doloroso",["Adolorido"]],["嘴巴",null,"zuǐba","Boca",["Hocico"]],["病",null,"bìng","Enfermedad/enfermar",null],["看病",null,"kànbìng","Consultar al médico",["Atenderse"]],["元",null,"yuán","Yuan",["Moneda"]],["鞋",null,"xié","Zapato",null],["衣服",null,"yīfú","Ropa",["Vestimenta"]],["比",null,"bǐ","Comparar/más que",null],["要",null,"yào","Querer",["Necesitar"]],["长","長","cháng","Largo",null],["新",null,"xīn","Nuevo",["Reciente"]],["一样","一樣","yīyàng","Igual",["Semejante"]],["见","見","jiàn","Ver",["Encontrar"]],["看见","看見","kànjian","Ver",["Divisar"]],["听见","聽見","tīngjiàn","Oír",null],["店",null,"diàn","Tienda",["Negocio"]],["短",null,"duǎn","Corto",["Breve"]],["饱","飽","bǎo","Lleno",["Saciado"]],["旧","舊","jiù","Viejo",["Antiguo","Obsoleto"]],["像",null,"xiàng","Parecer",null],["一共",null,"yīgòng","En total",null],["够","夠","gòu","Ser suficiente",["Bastante"]],["筷",null,"kuài","Palito/palillos",["Cerdas"]],["有点","有點","yǒudiǎn","Un poco",["Algo (有点儿)"]],["件",null,"jiàn","Pieza",["Asunto"]],["杯",null,"bēi","Taza",["Vaso","Medida de bebida"]],["菜",null,"cài","Plato/vegetal",null],["肉",null,"ròu","Carne",["Carne de animal"]],["酒",null,"jiǔ","Alcohol",["Bebida"]],["喝",null,"hē","Beber",["Tomar"]],["少",null,"shǎo","Poco",["Escaso"]],["多",null,"duō","Mucho",null],["小吃",null,"xiǎochī","Comidas",null],["牛奶",null,"niúnǎi","Leche",["Leche de vaca"]],["蛋",null,"dàn","Huevo",null],["饺","餃","jiǎo","Empanada china",["Albóndiga china"]],["面","麵","miàn","Fideos",["Cara","Cara y fideos"]],["汤","湯","tāng","Sopa | caldo",null],["包子",null,"bāozi","Bollo al vapor",null],["蛋糕",null,"dàngāo","Torta",["Pastel"]],["面包","麵包","miànbāo","Pan",["Barra de pan"]],["水果",null,"shuǐguǒ","Fruta",null],["香蕉",null,"xiāngjiāo","Plátano",["Banano"]],["食物",null,"shíwù","Comida",["Alimento"]],["饮料","飲料","yǐnliào","Bebida",["Refresco"]],["果汁",null,"guǒzhī","Jugo",["Zumo"]],["甜",null,"tián","Dulce",["Azucarado"]],["菜单","菜單","càidān","Menú",["Carta"]],["巧克力",null,"qiǎokèlì","Chocolate",["Bombón"]],["碗",null,"wǎn","Cuenco",null],["冰",null,"bīng","Hielo",null],["一起",null,"yīqǐ","Juntos",["Simultáneamente"]],["因为","因為","yīnwèi","Porque",null],["和",null,"hé","Y",["Con"]],["所以",null,"suǒyǐ","Por eso",null],["跟",null,"gēn","Con/y",null],["一定",null,"yīdìng","Seguro/definitivamente",null],["可能",null,"kěnéng","Posible",["Quizás"]],["边","邊","biān","Lado",["Orilla"]],["别","別","bié","No",null],["马上","馬上","mǎshàng","Inmediatamente",["Al instante"]],["然后","然後","ránhòu","Luego",["Después"]],["着","著","zhe","(partícula)",["(auxiliar)"]]],
'TOCFL-A1': [["零",null,"líng","Cero",["Nada"]],["爷爷","爺爺","yéye","Abuelo paterno",["Anciano"]],["奶奶",null,"nǎinai","Abuela",["Abuelita"]],["家庭",null,"jiātíng","Familia",["Hogar"]],["别人","別人","biérén","Otros",null],["大人",null,"dàrén","Adulto",["Persona"]],["老人",null,"lǎorén","Anciano",["Mayor"]],["年轻","年輕","niánqīng","Joven",["Juvenil"]],["男生",null,"nánshēng","Estudiante masculino",["Chico"]],["女生",null,"nǚshēng","Estudiante femenina",["Chica"]],["号码","號碼","hàomǎ","Número",null],["在",null,"zài","Estar en proceso",["Actualmente","En curso"]],["哪",null,"na","Partícula enfática",["¿eh?"]],["地址",null,"dìzhǐ","Dirección",null],["市",null,"shì","Ciudad",["Municipio"]],["名",null,"míng","Nombre",["Fama"]],["城市",null,"chéngshì","Ciudad",["Metrópoli"]],["街",null,"jiē","Calle",["Callejón"]],["电子邮件","電子郵件","diànzǐyóujiàn","Correo electrónico",["E-mail"]],["礼拜","禮拜","lǐbài","Día/semana",null],["从前","從前","cóngqián","Antes",["Pasado"]],["刚刚","剛剛","gānggāng","Justo ahora",["Hace poco"]],["一会儿","一會兒","yīhuǐr","Un momento",["Corto tiempo"]],["结婚","結婚","jiéhūn","Casarse",["Contraer matrimonio"]],["春天",null,"chūntiān","Primavera",["Estación"]],["夏天",null,"xiàtiān","Verano",null],["秋天",null,"qiūtiān","Otoño",["Estación"]],["冬天",null,"dōngtiān","Invierno",["Estación"]],["笑",null,"xiào","Reír",["Sonreír"]],["哭",null,"kū","Llorar",["Sollozar"]],["高兴","高興","gāoxìng","Feliz",null],["紧张","緊張","jǐnzhāng","Nervioso",["Tenso","Estresado"]],["可爱","可愛","kě'ài","Adorable",["Tierno"]],["生气","生氣","shēngqì","Enfadarse",null],["难过","難過","nánguò","Triste",["Apenado"]],["聪明","聰明","cōngmíng","Inteligente",["Despabilado"]],["相信",null,"xiāngxìn","Creer",null],["经验","經驗","jīngyàn","Experiencia",["Saber","Práctica"]],["辛苦",null,"xīnkǔ","Duro",["Agotador","Esforzarse"]],["愿意","願意","yuànyì","Querer",null],["习惯","習慣","xíguàn","Costumbre/acostumbrar",null],["当然","當然","dāngrán","Claro",["Naturalmente"]],["更",null,"gèng","Más",["Aún"]],["医院","醫院","yīyuàn","Hospital",["Clínica"]],["公司",null,"gōngsī","Empresa",["Corporación"]],["办公室","辦公室","bàngōngshì","Oficina",["Despacho"]],["工人",null,"gōngrén","Trabajador",null],["护士","護士","hùshì","Enfermero",null],["司机","司機","sījī","Conductor",null],["老板","老闆","lǎobǎn","Patrón",["Jefe","Empleador"]],["上班",null,"shàngbān","Ir al trabajo",null],["下班",null,"xiàbān","Terminar trabajo",["Salir del trabajo"]],["能力",null,"nénglì","Capacidad",["Talento"]],["努力",null,"nǔlì","Esforzarse",["Trabajar duro"]],["准备","準備","zhǔnbèi","Preparar",["Planear"]],["打算",null,"dǎsuàn","Planear",["Proyectar"]],["计划","計畫","jìhuà","Planificar",["Proyecto"]],["机会","機會","jīhuì","Oportunidad",["Ocasión"]],["如果",null,"rúguǒ","Si",["En caso de"]],["小学","小學","xiǎoxué","Escuela primaria",["Educación básica"]],["高中",null,"gāozhōng","Bachillerato",["Secundaria"]],["上学","上學","shàngxué","Ir a la escuela",null],["开学","開學","kāixué","Iniciar clases",["Volver a clase"]],["班",null,"bān","Clase/semana",null],["年级","年級","niánjí","Grado",["Curso"]],["作业","作業","zuòyè","Tarea",null],["成绩","成績","chéngjī","Nota",["Calificación"]],["语言","語言","yǔyán","Idioma",null],["华语","華語","Huáyǔ","Chino idioma",["Lengua china"]],["黑板",null,"hēibǎn","Pizarra",["Tablero"]],["课本","課本","kèběn","Libro de texto",["Manual"]],["字典",null,"zìdiǎn","Diccionario",null],["注意",null,"zhùyì","Prestar atención",["Fijarse"]],["读书","讀書","dúshū","Leer",null],["回答",null,"huídá","Responder",["Contestar"]],["答",null,"dá","Responder",null],["句",null,"jù","Frase",["Oración"]],["图","圖","tú","Imagen",["Cuadro"]],["部分",null,"bùfen","Parte",["Porción"]],["想法",null,"xiǎngfǎ","Idea",null],["学习","學習","xuéxí","Estudiar",["Aprender"]],["练习","練習","liànxí","Practicar",["Ejercicio"]],["参加","參加","cānjiā","Participar",["Asistir"]],["文化",null,"wénhuà","Cultura",["Civilización"]],["认为","認為","rènwéi","Pensar",["Considerar"]],["清楚",null,"qīngchǔ","Claro",["Distinto"]],["决定","決定","juédìng","Decidir",["Determinación","Decisión"]],["记得","記得","jìde","Acordarse",["Memorizar"]],["忘",null,"wàng","Olvidar",["Dejar de recordar"]],["棒",null,"bàng","Palo",["Garrote","Genial, buenísimo"]],["行","行","xíng","Estar bien/andar",["Fila/renglón (háng)","De acuerdo"]],["讲","講","jiǎng","Contar",["Explicar"]],["加",null,"jiā","Sumar",["Agregar"]],["算",null,"suàn","Calcular",null],["交",null,"jiāo","Entregar",["Cruzar"]],["借",null,"jiè","Prestar",["Pedir"]],["还","還","huán","Devolver",["Regresar"]],["办法","辦法","bànfǎ","Método",["Solución"]],["方法",null,"fāngfǎ","Método",["Forma"]],["有用",null,"yǒuyòng","Ser útil",["Servir"]],["进步","進步","jìnbù","Progresar",["Avanzar","Mejorar"]],["图书馆","圖書館","túshūguǎn","Biblioteca",null],["洗手间","洗手間","xǐshǒujiān","Baño",["Servicios"]],["宿舍",null,"sùshè","Dormitorio",null],["屋","屋","wū","Habitación",["Casa"]],["间","間","jiān","Habitación",["Cuarto"]],["大楼","大樓","dàlóu","Edificio",null],["楼上","樓上","lóushàng","Arriba",["En el piso superior"]],["楼下","樓下","lóuxià","Abajo",["En el piso inferior"]],["楼梯","樓梯","lóutī","Escalera",null],["电梯","電梯","diàntī","Ascensor",["Escalera mecánica"]],["厨房","廚房","chúfáng","Cocina",["Comedero"]],["客厅","客廳","kètīng","Salón",["Living"]],["窗",null,"chuāng","Ventana",["Cristal"]],["家具",null,"jiājù","Muebles",["Enseres"]],["沙发","沙發","shāfā","Sofá",["Sillón"]],["盒",null,"hé","Caja",["Recipiente"]],["关","關","guān","Cerrar",null],["灯","燈","dēng","Lámpara",["Bombilla"]],["冷气","冷氣","lěngqì","Aire acondicionado",null],["冰箱",null,"bīngxiāng","Refrigerador",null],["台",null,"tái","Mesa",["Aparato"]],["电","電","diàn","Electricidad",null],["干净","乾淨","gānjìng","Limpio",null],["房租",null,"fángzū","Alquiler",["Renta"]],["租",null,"zū","Alquilar",null],["世界",null,"shìjiè","Mundo",["Planeta"]],["火",null,"huǒ","Fuego",["Calor"]],["雪",null,"xuě","Nieve",null],["下雪",null,"xiàxuě","Nevar",["Precipitación de nieve"]],["地",null,"dì","Suelo/tierra",["Partícula (de)"]],["河",null,"hé","Río",["Corriente"]],["湖",null,"hú","Lago",["Estanque"]],["马","馬","mǎ","Caballo",["Equino"]],["鸟","鳥","niǎo","Pájaro",["Ave"]],["猫","貓","māo","Gato",["Felino"]],["狗",null,"gǒu","Perro",["Can"]],["海",null,"hǎi","Mar",["Océano"]],["草",null,"cǎo","Hierba",["Planta"]],["树","樹","shù","Árbol",["Planta"]],["只","隻","zhī","Medida",["Medida de animales","Clasificador"]],["长","長","zhǎng","Crecer",["Desarrollarse"]],["太阳","太陽","tàiyáng","Sol",null],["洗",null,"xǐ","Lavar",["Limpiar"]],["洗澡",null,"xǐzǎo","Bañarse",null],["有空",null,"yǒukòng","Tener tiempo",["Estar disponible"]],["发现","發現","fāxiàn","Descubrir",["Notar"]],["餐",null,"cān","Comida",["Comer","Clasificador de comidas"]],["搬",null,"bān","Mudar",null],["挂","掛","guà","Colgar",["Suspender"]],["脱","脫","tuō","Quitarse",["Desvestir"]],["过年","過年","guònián","Celebrar el año nuevo",["Fiesta"]],["新年",null,"xīnnián","Año nuevo",["Celebración"]],["游泳",null,"yóuyǒng","Nadar",["Natación"]],["跑",null,"pǎo","Correr",["Huir"]],["踢",null,"tī","Patear",["Jugar (fútbol)"]],["足球",null,"zúqiú","Fútbol",null],["篮球","籃球","lánqiú","Baloncesto",["Canasta"]],["网球","網球","wǎngqiú","Tenis",null],["棒球",null,"bàngqiú","Béisbol",["Pelota"]],["比赛","比賽","bǐsài","Competir",null],["开始","開始","kāishǐ","Comenzar",["Inicio","Comienzo"]],["骑","騎","qí","Montar",["Conducir"]],["脚踏车","腳踏車","jiǎotàchē","Bicicleta",["Bici"]],["上网","上網","shàngwǎng","Navegar por internet",null],["网路","網路","wǎnglù","Internet",["Red"]],["网站","網站","wǎngzhàn","Sitio web",null],["报纸","報紙","bàozhǐ","Periódico",["Diario"]],["次",null,"cì","Vez",null],["电影院","電影院","diànyǐngyuàn","Cine",null],["部",null,"bù","Departamento",null],["场","場","chǎng","Evento",["Partido"]],["音乐","音樂","yīnyuè","Música",null],["票",null,"piào","Billete",["Entrada"]],["活动","活動","huódòng","Actividad",["Evento"]],["故事",null,"gùshi","Historia",["Cuento"]],["聊天",null,"liáotiān","Charlar",["Conversar"]],["有时候","有時候","yǒushíhou","A veces",null],["平常",null,"píngcháng","Normal",["Corriente"]],["总是","總是","zǒngshì","Siempre",null],["已经","已經","yǐjīng","Ya",null],["后来","後來","hòulái","Después",["Luego"]],["各",null,"gè","Cada",["Todo"]],["变","變","biàn","Cambiar",["Convertir"]],["才",null,"cái","Solo",["Recién"]],["客人",null,"kèrén","Invitado",["Huésped"]],["客气","客氣","kèqi","Cortés",["Formal","Modesto"]],["不客气","不客氣","bùkèqì","De nada",null],["不好意思",null,"bùhǎoyìsi","Disculpe",["Perdón"]],["喂",null,"wéi","¿diga?",null],["麻烦","麻煩","máfán","Molestar/problemático",["Incomodar"]],["礼物","禮物","lǐwù","Regalo",["Presente"]],["欢迎","歡迎","huānyíng","Recibir",["Acoger"]],["寄",null,"jì","Enviar",null],["接",null,"jiē","Recibir",["Recoger"]],["邮局","郵局","yóujú","Oficina de correos",["Correo"]],["银行","銀行","yínháng","Banco",null],["坏","壞","huài","Malo",["Dañado"]],["帮忙","幫忙","bāngmáng","Ayudar",null],["帮助","幫助","bāngzhù","Ayudar",["Auxiliar"]],["小朋友",null,"xiǎopéngyǒu","Niño",["Pequeño amigo"]],["信",null,"xìn","Carta",null],["信封",null,"xìnfēng","Sobre",null],["认识","認識","rènshì","Conocer",["Reconocer"]],["最近",null,"zuìjìn","Últimamente",null],["听说","聽說","tīngshuō","Oír decir",null],["见面","見面","jiànmiàn","Encontrarse",["Verse"]],["事情",null,"shìqíng","Cosa asunto",["Asunto"]],["帮","幫","bāng","Ayudar",null],["钱包","錢包","qiánbāo","Billetera",["Monedero"]],["拉",null,"lā","Tirar",["Jalar"]],["啊",null,"ā","Interjección",["Oh"]],["怎么办","怎麼辦","zěnmebàn","Qué hacer",null],["车站","車站","chēzhàn","Estación",null],["汽车","汽車","qìchē","Coche",["Automóvil"]],["飞机场","飛機場","fēijīchǎng","Aeropuerto",null],["马路","馬路","mǎlù","Calle",["Avenida"]],["路口",null,"lùkǒu","Esquina",["Cruce"]],["十字路口",null,"shízìlùkǒu","Cruce",null],["对面","對面","duìmiàn","Enfrente",["Frente"]],["旅行",null,"lǚxíng","Viajar",["Excursionar"]],["饭店","飯店","fàndiàn","Restaurante",null],["旅馆","旅館","lǚguǎn","Hotel",["Posada"]],["袋子",null,"dàizi","Bolsa",["Bolsa de plástico"]],["参观","參觀","cānguān","Visitar",["Revisar"]],["地图","地圖","dìtú","Mapa",null],["照相机","照相機","zhàoxiàngjī","Cámara",["Cámara fotográfica"]],["照相",null,"zhàoxiàng","Fotografiar",null],["照片",null,"zhàopiàn","Fotografía",null],["风景","風景","fēngjǐng","Paisaje",null],["南",null,"nán","Sur",["Austral"]],["西",null,"xī","Oeste",["Dirección"]],["北",null,"běi","Norte",null],["东","東","dōng","Este",null],["中间","中間","zhōngjiān","Medio",["Entre"]],["离","離","lí","Alejarse",["Distancia"]],["离开","離開","líkāi","Irse",["Abandonar"]],["经过","經過","jīngguò","Pasar",["Experimentar"]],["往",null,"wǎng","Hacia",null],["送",null,"sòng","Regalar",["Enviar"]],["放",null,"fàng","Poner",null],["近",null,"jìn","Cerca",["Próximo"]],["远","遠","yuǎn","Lejano",["Distante"]],["向",null,"xiàng","Hacia",null],["转","轉","zhuǎn","Girar",["Cambiar"]],["掉",null,"diào","Caer/eliminar",["Perder"]],["一直",null,"yīzhí","Siempre",null],["最后","最後","zuìhòu","Final",["Último"]],["病人",null,"bìngrén","Paciente",null],["头发","頭髮","tóufǎ","Pelo",null],["手指",null,"shǒuzhǐ","Dedo",["Falange"]],["肚",null,"dù","Vientre",["Estómago"]],["脸","臉","liǎn","Cara",["Rostro"]],["心",null,"xīn","Corazón",["Mente"]],["健康",null,"jiànkāng","Salud",["Sano"]],["渴",null,"kě","Sediento",["Árido"]],["舒服",null,"shūfu","Cómodo",null],["眼镜","眼鏡","yǎnjìng","Gafas",["Lentes"]],["卖","賣","mài","Vender",["Comercializar"]],["付",null,"fù","Pagar",["Entregar"]],["希望",null,"xīwàng","Esperar",["Desear"]],["书店","書店","shūdiàn","Librería",null],["商店",null,"shāngdiàn","Tienda",["Comercio"]],["市场","市場","shìchǎng","Mercado",["Plaza"]],["超级市场","超級市場","chāojíshìchǎng","Supermercado",["Supertienda"]],["信用卡",null,"xìnyòngkǎ","Tarjeta de crédito",null],["重要",null,"zhòngyào","Importante",["Crucial"]],["颜色","顏色","yánsè","Color",null],["黄色","黃色","huángsè","Amarillo",["Color"]],["白色",null,"báisè","Blanco",null],["手表","手錶","shǒubiǎo","Reloj",null],["袜","襪","wà","Calcetín",["Media"]],["双","雙","shuāng","Par",["Doble"]],["裙",null,"qún","Falda",["Enagua"]],["裤","褲","kù","Pantalón",["Calzoncillo"]],["大衣",null,"dàyī","Abrigo",["Chubasquero"]],["帽",null,"mào","Gorra",["Sombrero"]],["皮包",null,"píbāo","Bolso",["Cartera"]],["外套",null,"wàitào","Abrigo",["Chaqueta","Saco"]],["小心",null,"xiǎoxīn","Cuidado",null],["比较","比較","bǐjiào","Comparar",null],["差不多",null,"chābùduō","Casi",["Aproximadamente"]],["戴",null,"dài","Llevar puesto",["Usar (gafas/reloj)"]],["试","試","shì","Probar",["Intentar"]],["轻","輕","qīng","Ligero",["Suave"]],["重",null,"zhòng","Pesado",["Importante"]],["样子","樣子","yàngzi","Aspecto",null],["特别","特別","tèbié","Especial",null],["简单","簡單","jiǎndān","Simple",["Fácil","Elemental"]],["其他",null,"qítā","Otros",["Demás"]],["声音","聲音","shēngyīn","Voz",["Sonido"]],["好像",null,"hǎoxiàng","Parecer",["Como si"]],["奇怪",null,"qíguài","Raro",["Extraño"]],["三明治",null,"sānmíngzhì","Sándwich",null],["汉堡","漢堡","hànbǎo","Hamburguesa",null],["苹果","蘋果","píngguǒ","Manzana",["Pomo"]],["西瓜",null,"xīguā","Sandía",null],["啤酒",null,"píjiǔ","Cerveza",["Birra"]],["红茶","紅茶","hóngchá","Té negro",["Té rojo"]],["点心","點心","diǎnxīn","Tentempié",null],["冰淇淋",null,"bīngqílín","Helado",null],["青菜",null,"qīngcài","Verdura",["Vegetal"]],["糖",null,"táng","Azúcar | dulce",null],["叉",null,"chā","Cruzar",["Entrelazar"]],["刀",null,"dāo","Cuchillo",["Navaja"]],["汤匙","湯匙","tāngchí","Cuchara",null],["盘","盤","pán","Servir",["Ofrecer"]],["片",null,"piàn","Trozo",["Película"]],["瓶",null,"píng","Botella",["Frasco"]],["支",null,"zhī","Ramificación",["Medido"]],["份",null,"fèn","Porción",["Ración"]],["道",null,"dào","Camino",["Vía"]],["一半",null,"yībàn","Mitad",["Porción"]],["味道",null,"wèidào","Sabor",null],["酸",null,"suān","Agrio",["Ácido"]],["苦",null,"kǔ","Dolor",["Sufrir","Amargo"]],["咸","鹹","xián","Salado",null],["辣",null,"là","Picante",null],["香",null,"xiāng","Aromático",["Perfumado"]],["条","條","tiáo","Barra/pieza",null],["种","種","zhǒng","Tipo",["Especie"]],["包",null,"bāo","Bolsa/envolver",null],["全部",null,"quánbù","Todo",["Entero"]],["所有",null,"suǒyǒu","Todo",null],["需要",null,"xūyào","Necesitar",["Requerir"]],["烤",null,"kǎo","Asar",["Cocinar al fuego"]],["过","過","guò","Celebrar",["Festejar","Pasar tiempo"]],["但是",null,"dànshì","Pero",["Sin embargo"]],["或是",null,"huòshì","O",["Tal vez"]],["要是",null,"yàoshì","Si",["En caso de"]],["把",null,"bǎ","Tomar",null],["被",null,"bèi","Por",null],["让","讓","ràng","Dejar",["Permitir"]],["虽然","雖然","suīrán","Aunque",null],["那么","那麼","nàme","Entonces",["Así"]],["这么","這麼","zhème","Tan",null],["本来","本來","běnlái","Originalmente",null],["啦",null,"la","Partícula final",null],["呀",null,"yā","Interjección",["Expresión"]],["以为","以為","yǐwéi","Creer",null],["有的",null,"yǒude","Algunos",["Ciertos"]],["替",null,"tì","En lugar de",["Por"]],["一下",null,"yīxià","Un momento",["Un poco (suaviza el verbo)"]],["不过","不過","bùguò","Pero",["Sin embargo"]]],
'TOCFL-A2': [["出生",null,"chūshēng","Nacer",["Nacimiento"]],["不同",null,"bùtóng","Diferente",["Distinto"]],["住址",null,"zhùzhǐ","Domicilio",["Dirección"]],["母语","母語","mǔyǔ","Lengua materna",["Idioma materno"]],["表",null,"biǎo","Superficie",["Tabla"]],["钟","鐘","zhōng","Reloj",["Campana"]],["传真","傳真","chuánzhēn","Fax",["Enviar fax"]],["白天",null,"báitiān","Día",null],["半夜",null,"bànyè","Medianoche",["Noche"]],["夜晚",null,"yèwǎn","Noche",["Tarde"]],["日子",null,"rìzi","Día",["Vida"]],["夜",null,"yè","Noche",null],["春季",null,"chūnjì","Primavera",null],["时","時","shí","Tiempo",["Momento"]],["不久",null,"bùjiǔ","Pronto",["Próximamente"]],["刚才","剛才","gāngcái","Hace un momento",["Ahora"]],["早点","早點","zǎodiǎn","Temprano",["A la hora temprana"]],["正好",null,"zhènghǎo","Justo",null],["年纪","年紀","niánjì","Edad",["Años"]],["男人",null,"nánrén","Hombre",["Varón"]],["女人",null,"nǚrén","Mujer",["Hembra"]],["父亲","父親","fùqīn","Padre",["Progenitor"]],["母亲","母親","mǔqīn","Madre",["Progenitora"]],["父母",null,"fùmǔ","Padres",["Familia"]],["外公",null,"wàigōng","Abuelo materno",null],["外婆",null,"wàipó","Abuela materna",["Abuela"]],["伯伯",null,"bóbo","Tío paterno",["Abuelo"]],["伯父",null,"bófù","Tío paterno",["Pariente"]],["伯母",null,"bómǔ","Tía",null],["叔叔",null,"shúshu","Tío",["Padre hermano"]],["姑姑",null,"gūgu","Tía paterna",null],["孙女","孫女","sūnnǚ","Nieta",["Descendiente femenino"]],["孙子","孫子","sūnzi","Nieto",["Descendiente masculino"]],["关系","關係","guānxì","Relación",["Asunto"]],["害怕",null,"hàipà","Tener miedo",["Temer"]],["开心","開心","kāixīn","Feliz",["Alegrar"]],["担心","擔心","dānxīn","Preocuparse",null],["伤心","傷心","shāngxīn","Entristecerse",["Apenar"]],["美丽","美麗","měilì","Hermoso",["Bonito"]],["帅","帥","shuài","Guapo",["Atractivo"]],["笨",null,"bèn","Tonto",null],["认真","認真","rènzhēn","Serio",["Cuidadoso"]],["敢",null,"gǎn","Atreverse",["Osar"]],["急",null,"jí","Apurado",["Urgente"]],["礼貌","禮貌","lǐmào","Cortesía",null],["害羞",null,"hàixiū","Tímido",["Avergonzado"]],["关心","關心","guānxīn","Preocuparse",["Importar"]],["心情",null,"xīnqíng","Estado de ánimo",null],["幸福",null,"xìngfú","Feliz",["Dichoso"]],["差",null,"chà","Mal/faltar",null],["兄弟",null,"xiōngdì","Hermanos",["Hermano menor","Fraternal"]],["阿姨",null,"āyí","Tía/ama",null],["身边","身邊","shēnbiān","Alrededor",["Cerca"]],["身高",null,"shēngāo","Estatura",["Altura"]],["长大","長大","zhǎngdà","Crecer",null],["经理","經理","jīnglǐ","Gerente",["Director"]],["教书","教書","jiāoshū","Enseñar",["Dar clase"]],["开会","開會","kāihuì","Reunirse",["Tener reunión"]],["加班",null,"jiābān","Hacer horas extra",null],["危险","危險","wéixiǎn","Peligroso",["Arriesgado"]],["安全",null,"ānquán","Seguro",["Seguridad"]],["成功",null,"chénggōng","Tener éxito",null],["报告","報告","bàogào","Informar",null],["资料","資料","zīliào","Material",["Datos","Información"]],["管理",null,"guǎnlǐ","Administrar",["Gestionar"]],["做法",null,"zuòfǎ","Método",null],["看法",null,"kànfǎ","Opinión",["Punto de vista"]],["办","辦","bàn","Gestionar",["Tramitar"]],["打工",null,"dǎgōng","Trabajar",["Emplearse"]],["选","選","xuǎn","Elegir",null],["严重","嚴重","yánzhòng","Grave",["Serio"]],["正式",null,"zhèngshì","Oficial",["Formal"]],["查",null,"chá","Buscar",["Investigar"]],["考",null,"kǎo","Examinar",["Probar"]],["例如",null,"lìrú","Por ejemplo",["Como"]],["例",null,"lì","Ejemplo",["Caso"]],["题目","題目","tímù","Pregunta",["Tema"]],["题","題","tí","Pregunta",null],["答案",null,"dá'àn","Respuesta",null],["念书","念書","niànshū","Estudiar",["Leer"]],["历史","歷史","lìshǐ","Historia",null],["数学","數學","shùxué","Matemáticas",null],["书法","書法","shūfǎ","Caligrafía",null],["英语","英語","Yīngyǔ","Inglés",null],["作文",null,"zuòwén","Composición",null],["汉字","漢字","hànzì","Carácter chino",["Ideograma"]],["词","詞","cí","Palabra",["Término"]],["文法",null,"wénfǎ","Gramática",["Sintaxis"]],["加上",null,"jiāshàng","Además",["Sumar"]],["减","減","jiǎn","Bajar",["Disminuir","Restar"]],["乘",null,"chéng","Multiplicar",["Viajar"]],["除",null,"chú","Sin incluir",["Dividir","Eliminar"]],["国小","國小","guóxiǎo","Escuela primaria",["Colegio primario"]],["中学","中學","zhōngxué","Escuela secundaria",["Instituto"]],["学院","學院","xuéyuàn","Facultad",["Institución"]],["大学生","大學生","dàxuéshēng","Estudiante universitario",null],["教授",null,"jiàoshòu","Enseñar (jiāo)",["Profesor universitario (jiào)"]],["放假",null,"fàngjià","Tomar vacaciones",null],["春假",null,"chūnjià","Vacaciones de primavera",["Vacaciones de pascua"]],["暑假",null,"shǔjià","Vacaciones de verano",["Periodo vacacional"]],["寒假",null,"hánjià","Vacaciones de invierno",null],["假",null,"jià","Falso",["Vacaciones"]],["毕业","畢業","bìyè","Graduarse",["Egresarse"]],["学期","學期","xuéqí","Semestre",null],["服务","服務","fúwù","Servir",["Atender"]],["室友",null,"shìyǒu","Compañero/a de cuarto",null],["操场","操場","cāochǎng","Cancha",["Patio de recreo"]],["校园","校園","xiàoyuán","Campus",null],["位子",null,"wèizi","Asiento",["Lugar"]],["书桌","書桌","shūzhuō","Escritorio",null],["书包","書包","shūbāo","Mochila",["Bolso"]],["书架","書架","shūjià","Estante",["Repisa"]],["本子",null,"běnzi","Cuaderno",null],["尺",null,"chǐ","Regla",null],["讨论","討論","tǎolùn","Discutir",null],["同意",null,"tóngyì","Estar de acuerdo",["Consentir"]],["了解",null,"liǎojiě","Entender",["Conocer","Informarse"]],["无聊","無聊","wúliáo","Aburrido",["Monótono"]],["有趣",null,"yǒuqù","Divertido",["Ameno"]],["有意思",null,"yǒuyìsi","Interesante",null],["原因",null,"yuányīn","Razón",null],["遍",null,"biàn","Vez",null],["改",null,"gǎi","Cambiar",["Modificar"]],["忘记","忘記","wàngjì","Olvidar",["No acordarse"]],["程度",null,"chéngdù","Nivel",["Grado"]],["赶快","趕快","gǎnkuài","Apresurarse",["Rápidamente"]],["以上",null,"yǐshàng","Arriba",null],["以下",null,"yǐxià","Abajo",null],["意见","意見","yìjiàn","Opinión",null],["用功",null,"yònggōng","Estudioso",["Aplicado"]],["研究",null,"yánjiù","Investigar",["Estudio"]],["教育",null,"jiàoyù","Educar",["Instrucción"]],["选择","選擇","xuǎnzé","Elegir",["Selección","Opción"]],["建议","建議","jiànyì","Sugerir",["Propuesta","Recomendación"]],["知识","知識","zhīshì","Conocimiento",["Saber"]],["座",null,"zuò","Asiento",null],["卧室","臥室","wòshì","Dormitorio",["Habitación"]],["卧房","臥房","wòfáng","Dormitorio",["Habitación"]],["浴室",null,"yùshì","Baño",["Ducha"]],["院",null,"yuàn","Patio",null],["书房","書房","shūfáng","Estudio",["Biblioteca"]],["洗衣机","洗衣機","xǐyījī","Lavadora",null],["餐桌",null,"cānzhuō","Mesa de comedor",["Mesa"]],["打开","打開","dǎkāi","Abrir",null],["箱",null,"xiāng","Caja",["Pecho","Trompa"]],["层","層","céng","Piso",["Nivel"]],["柜","櫃","guì","Gabinete",["Armario","Mostrador"]],["大门","大門","dàmén","Puerta principal",["Entrada"]],["邻居","鄰居","línjū","Vecino",null],["热闹","熱鬧","rènao","Animado",["Bullicioso","Concurrido"]],["吵",null,"chǎo","Ruidoso",null],["乱","亂","luàn","Desordenado",["Caótico"]],["房东","房東","fángdōng","Casero",["Propietario"]],["房屋",null,"fángwū","Casa",["Edificio"]],["搬家",null,"bānjiā","Mudarse",null],["开水","開水","kāishuǐ","Agua hervida",null],["乡下","鄉下","xiāngxià","Campo",["Zona rural"]],["伞","傘","sǎn","Paraguas",["Sombrilla"]],["花",null,"huā","Gastar",["Invertir"]],["朵",null,"duǒ","Flor",["Clasificador (flores, nubes)"]],["蚊",null,"wén","Mosquito",null],["自然",null,"zìrán","Naturaleza",null],["月亮",null,"yuèliàng","Luna",null],["星星",null,"xīngxing","Estrella",null],["环境","環境","huánjìng","Ambiente",["Entorno"]],["晴天",null,"qíngtiān","Día soleado",["Tiempo bueno"]],["暖和",null,"nuǎnhuo","Cálido",["Caluroso"]],["凉快","涼快","liángkuài","Fresco",["Agradable"]],["凉","涼","liáng","Fresco",["Frío"]],["干","乾","gān","Seco",null],["湿","濕","shī","Húmedo",["Mojado"]],["度",null,"dù","Grado",["Medida"]],["台风","颱風","táifēng","Tifón",["Tormenta tropical"]],["季节","季節","jìjié","Estación (del año)",["Época"]],["环保","環保","huánbǎo","Protección ambiental",["Ecológico"]],["垃圾",null,"lèsè","Basura",null],["污染","汙染","wūrǎn","Contaminar",["Ensuciar"]],["底",null,"dǐ","Abajo",["Restos","(matemáticas) raíz"]],["底下",null,"dǐxia","Debajo",["Fondo"]],["内","內","nèi","Interior",["Dentro"]],["深",null,"shēn","Profundo",["Hondo"]],["浅","淺","qiǎn","Poco profundo/ligero",["Superficial"]],["发生","發生","fāshēng","Ocurrir",["Suceder"]],["照顾","照顧","zhàogù","Cuidar",null],["生活",null,"shēnghuó","Vida",["Vivir"]],["日记","日記","rìjì","Diario",["Bitácora"]],["流",null,"liú","Fluir",["Corriente"]],["流汗",null,"liúhàn","Sudar",["Transpirar"]],["梦","夢","mèng","Sueño",["Sueño, ilusión"]],["枕头","枕頭","zhěntou","Almohada",["Cabezal"]],["闹钟","鬧鐘","nàozhōng","Despertador",["Alarma"]],["拖鞋",null,"tuōxié","Chanclas",null],["毛巾",null,"máojīn","Toalla",null],["刷",null,"shuā","Frotar",["Limpiar"]],["肥皂",null,"féizào","Jabón",null],["牙膏",null,"yágāo","Pasta dental",["Dentífrico"]],["卫生纸","衛生紙","wèishēngzhǐ","Papel higiénico",["Papel sanitario"]],["篮","籃","lán","Canasta",["Cesta"]],["假日",null,"jiàrì","Día festivo",["Vacaciones","Puente"]],["结束","結束","jiéshù","Terminar",["Concluir","Acabar"]],["完",null,"wán","Terminar",null],["散步",null,"sànbù","Pasear",["Caminar"]],["慢跑",null,"mànpǎo","Trotar",["Correr suave"]],["野餐",null,"yěcān","Picnic",["Excursión"]],["爬",null,"pá","Trepar",["Arrastrarse"]],["拍",null,"pāi","Golpear",["Fotografiar"]],["抓",null,"zhuā","Agarrar",["Capturar"]],["座位",null,"zuòwèi","Asiento",null],["新闻","新聞","xīnwén","Noticia",null],["体育","體育","tǐyù","Deporte",null],["经常","經常","jīngcháng","A menudo",["Usualmente"]],["杂志","雜誌","zázhì","Revista",["Publicación"]],["美术","美術","měishù","Arte",["Bellas artes"]],["画家","畫家","huàjiā","Pintor",["Artista"]],["兴趣","興趣","xìngqù","Interés",["Afición"]],["收",null,"shōu","Recibir",["Recoger"]],["谈","談","tán","Hablar",["Conversar"]],["聊",null,"liáo","Charlar",["Un poco (literario)"]],["迟到","遲到","chídào","Llegar tarde",null],["乐器","樂器","yuèqì","Instrumento musical",["Música"]],["吉他",null,"jítā","Guitarra",null],["可怕",null,"kěpà","Terrible",["Aterrador"]],["轻松","輕鬆","qīngsōng","Relajado",["Ligero","Fácil"]],["情形",null,"qíngxíng","Situación",null],["消息",null,"xiāoxí","Noticia",["Información"]],["看起来","看起來","kànqǐlái","Parecer",["Se ve"]],["舞",null,"wǔ","Empuñar",["Bailar","Blandir"]],["游",null,"yóu","Viajar",["Pasear"]],["游泳池",null,"yóuyǒngchí","Piscina",["Pileta"]],["游戏","遊戲","yóuxì","Juego",["Entretenimiento"]],["茶馆","茶館","cháguǎn","Casa de té",["Salón de té"]],["门票","門票","ménpiào","Boleto",["Entrada"]],["陪",null,"péi","Acompañar",null],["利用",null,"lìyòng","Utilizar",["Aprovechar","Hacer uso"]],["好处","好處","hǎochù","Beneficio",["Ventaja"]],["坏处","壞處","huàichù","Daño",["Perjuicio"]],["目的",null,"mùdì","Propósito",["Meta"]],["要求",null,"yāoqiú","Pedir/exigencia",null],["合作",null,"hézuò","Cooperar",["Trabajar juntos"]],["主人",null,"zhǔrén","Dueño",null],["请客","請客","qǐngkè","Invitar",["Pagar un banquete"]],["约","約","yuē","Acordar",["Cita"]],["约会","約會","yuēhuì","Cita",["Encuentro"]],["派对","派對","pàiduì","Fiesta",["Celebración"]],["祝",null,"zhù","Desear",["Congratular"]],["留",null,"liú","Quedarse",["Dejar"]],["封",null,"fēng","Sobre",["Carta"]],["信箱",null,"xìnxiāng","Buzón",["Casilla"]],["邮票","郵票","yóupiào","Sello",["Estampilla"]],["回信",null,"huíxìn","Respuesta",["Contestación"]],["邮件","郵件","yóujiàn","Correo",["Correspondencia"]],["弄",null,"nòng","Hacer",["Arreglar"]],["放心",null,"fàngxīn","Tranquilizarse",["No preocuparse"]],["偷",null,"tōu","Robar",["Hurtar"]],["满","滿","mǎn","Lleno",["Completo"]],["丢","丟","diū","Perder",["Tirar"]],["换","換","huàn","Cambiar",["Intercambiar"]],["一块","一塊","yīkuài","Un trozo",["Una pieza"]],["同时","同時","tóngshí","Al mismo tiempo",null],["保护","保護","bǎohù","Proteger",null],["出门","出門","chūmén","Salir",["Irse"]],["现代","現代","xiàndài","Moderno",["Contemporáneo"]],["传统","傳統","chuántǒng","Tradicional",null],["除夕",null,"Chúxì","Nochevieja",["Fin de año"]],["春节","春節","Chūnjié","Año nuevo chino",["Fiesta"]],["节日","節日","jiérì","Festividad",["Celebración"]],["带来","帶來","dàilái","Traer",["Llevar"]],["当中","當中","dāngzhōng","En medio",["Entre"]],["法律",null,"fǎlǜ","Ley",null],["方面",null,"fāngmiàn","Aspecto",["Campo"]],["开玩笑","開玩笑","kāi wánxiào","Bromear",["Hacer chistes"]],["可惜",null,"kěxí","Lastima",["Lástima"]],["老太太",null,"lǎotàitai","Anciana",["Viejita","Mayor"]],["有名",null,"yǒumíng","Famoso",["Célebre"]],["自由",null,"zìyóu","Libertad",null],["社会","社會","shèhuì","Sociedad",["Comunidad"]],["时差","時差","shíchā","Diferencia horaria",["Desfase horario"]],["市区","市區","shìqū","Centro de la ciudad",["Zona urbana"]],["温泉","溫泉","wēnquán","Manantial caliente",["Balneario"]],["公路",null,"gōnglù","Carretera",["Ruta"]],["速度",null,"sùdù","Velocidad",["Rapidez"]],["到处","到處","dàochù","En todas partes",["Por todas partes"]],["地点","地點","dìdiǎn","Lugar",null],["巴士",null,"bāshì","Bus",["Colectivo"]],["加油",null,"jiāyóu","Animar",["Esfuerzo"]],["摩托车","摩托車","mótuōchē","Motocicleta",["Moto"]],["船",null,"chuán","Barco",["Embarcación"]],["地铁","地鐵","dìtiě","Metro",["Subterráneo"]],["捷运","捷運","jiéyùn","Metro",["Subterráneo"]],["停车场","停車場","tíngchēchǎng","Estacionamiento",null],["月台",null,"yuètái","Andén",["Plataforma"]],["搭","搭","dā","Tomar",["Agarrar"]],["飞","飛","fēi","Volar",null],["下",null,"xià","Bajar",["Bajarse"]],["上",null,"shàng","Subir",["Montar"]],["这些","這些","zhèxiē","Estos",null],["那些",null,"nàxiē","Esos/esas",["Aquellos"]],["东方","東方","dōngfāng","Oriente",["Este"]],["非洲",null,"Fēizhōu","África",["Continente africano"]],["美洲",null,"Měizhōu","América",["Continente americano"]],["欧洲","歐洲","Ōuzhōu","Europa",["Continente europeo"]],["亚洲","亞洲","Yàzhōu","Asia",["Continente asiático"]],["大陆","大陸","dàlù","Continente",null],["动","動","dòng","Mover",null],["起",null,"qǐ","Levantar",["Comenzar"]],["停",null,"tíng","Parar",null],["中心",null,"zhōngxīn","Centro",null],["签证","簽證","qiānzhèng","Visa",["Visado"]],["行李",null,"xínglǐ","Equipaje",["Maleta"]],["背包",null,"bēibāo","Mochila",["Bolso"]],["锁","鎖","suǒ","Cerradura / cerrar",null],["入口",null,"rùkǒu","Entrada",["Acceso"]],["出口",null,"chūkǒu","Salida",["Puerta de salida"]],["油",null,"yóu","Aceite",null],["钥匙","鑰匙","yàoshi","Llave",["Herramienta"]],["方向",null,"fāngxiàng","Dirección",["Rumbo"]],["交通",null,"jiāotōng","Transporte",["Tránsito"]],["标准","標準","biāozhǔn","Estándar",null],["拍照",null,"pāizhào","Sacar fotos",["Fotografiar"]],["腿",null,"tuǐ","Pierna",null],["背",null,"bèi","Cargar",["Llevar"]],["脖",null,"bó","Cuello",["Nuca"]],["汗",null,"hàn","Sudor",["Transpiración"]],["脸色","臉色","liǎnsè","Expresión",null],["救护车","救護車","jiùhùchē","Ambulancia",["Vehículo de emergencia"]],["咳嗽",null,"késòu","Toser",["Carraspear"]],["发烧","發燒","fāshāo","Tener fiebre",null],["头痛","頭痛","tóutòng","Tener dolor de cabeza",["Doler cabeza"]],["疼",null,"téng","Doler",null],["保险","保險","bǎoxiǎn","Seguro",null],["挂号","掛號","guàhào","Registrarse",null],["牙刷",null,"yáshuā","Cepillo de dientes",["Cepillo"]],["药房","藥房","yàofáng","Farmacia",["Botica"]],["救命",null,"jiùmìng","Salvar la vida",["Socorrer","Rescatar"]],["影响","影響","yǐngxiǎng","Influir/influencia",null],["感觉","感覺","gǎnjué","Sentir",["Sensación"]],["精神",null,"jīngshén","Espíritu",["Mental","Energía"]],["正常",null,"zhèngcháng","Normal",null],["有钱","有錢","yǒuqián","Tener dinero",["Ser rico"]],["生意",null,"shēngyì","Negocio",["Comercio"]],["商人",null,"shāngrén","Comerciante",["Empresario"]],["老板娘","老闆娘","lǎobǎnniáng","Dueña",["Patrona"]],["店员","店員","diànyuán","Dependiente",["Empleado"]],["订","訂","dìng","Suscribir",["Reservar"]],["订位","訂位","dìngwèi","Reservar",["Hacer reserva"]],["得到",null,"dédào","Obtener",null],["困难","困難","kùnnán","Dificultad",["Problema","Arduamente"]],["百货公司","百貨公司","bǎihuògōngsī","Almacén",["Centro comercial"]],["夜市",null,"yèshì","Nocturno",["Noche"]],["逛",null,"guàng","Pasear",null],["逛街",null,"guàngjiē","Pasear de compras",["Ir de compras"]],["排队","排隊","páiduì","Hacer fila",["Formarse"]],["客满","客滿","kèmǎn","Estar lleno",["Haber lleno"]],["刷卡",null,"shuākǎ","Tarjeta",null],["提",null,"tí","Levantar",null],["流行",null,"liúxíng","Moda",["Popular"]],["蓝色","藍色","lánsè","Azul",["Color azul"]],["绿色","綠色","lǜsè","Color verde",["Tono verde"]],["红色","紅色","hóngsè","Rojo",["Color"]],["黑色",null,"hēisè","Negro",["Color"]],["毛衣",null,"máoyī","Suéter",["Prenda tejida"]],["雨衣",null,"yǔyī","Impermeable",["Chubasco","Paraguas"]],["内衣","內衣","nèiyī","Ropa interior",null],["上衣",null,"shàngyī","Camisa",["Prenda superior"]],["皮鞋",null,"píxié","Zapatos de cuero",null],["手套",null,"shǒutào","Guante",null],["口袋",null,"kǒudài","Bolsillo",["Bolsa"]],["小费","小費","xiǎofèi","Propina",null],["打折",null,"dǎzhé","Descuento",["Rebaja"]],["零钱","零錢","língqián","Cambio",null],["零用钱","零用錢","língyòngqián","Dinero de bolsillo",["Mesada"]],["存",null,"cún","Guardar",["Existir"]],["毛",null,"máo","Jiao",["Décima de yuan"]],["高级","高級","gāojí","Avanzado",["Superior"]],["一般",null,"yībān","Común",null],["合适","合適","héshì","Adecuado",["Conveniente"]],["适合","適合","shìhé","Convenir",["Adaptarse"]],["圆","圓","yuán","Redondo",["Circular"]],["光",null,"guāng","Luz",["Solo"]],["死",null,"sǐ","Morir",["Fallecer"]],["脏","髒","zāng","Sucio",null],["破",null,"pò","Roto",["Viejo"]],["袋",null,"dài","Bolsa",null],["套",null,"tào","Juego/serie",null],["沙拉",null,"shālā","Ensalada",null],["牛排",null,"niúpái","Bife",["Bistec"]],["海鲜","海鮮","hǎixiān","Mariscos",null],["火腿",null,"huǒtuǐ","Jamón",["Pernil"]],["热狗","熱狗","règǒu","Perrito caliente",["Salchicha"]],["馒头","饅頭","mántou","Mantou",null],["米",null,"mǐ","Arroz",["Grano"]],["豆腐",null,"dòufu","Tofu",null],["橘",null,"jú","Mandarina",["Naranja"]],["葡萄",null,"pútao","Uva",null],["芒果",null,"mángguǒ","Mango",null],["乌龙茶","烏龍茶","wūlóngchá","Té oolong",["Té negro"]],["豆浆","豆漿","dòujiāng","Leche de soja",["Soja"]],["可乐","可樂","kělè","Refresco",["Gaseosa","Bebida"]],["奶茶",null,"nǎichá","Té con leche",["Té de burbujas"]],["汽水",null,"qìshuǐ","Refresco",["Gaseosa"]],["冰块","冰塊","bīngkuài","Cubo de hielo",["Hielo"]],["甜点","甜點","tiándiǎn","Postre",["Dulce"]],["饼干","餅乾","bǐnggān","Galletitas",null],["盐","鹽","yán","Sal",["Cloruro sódico"]],["味",null,"wèi","Sabor",["Olor","Sentido (de algo)"]],["闻","聞","wén","Oler",null],["臭",null,"chòu","Hediondo/a",["Maloliente"]],["口",null,"kǒu","Boca",["Entrada"]],["罐",null,"guàn","Lata",null],["颗","顆","kē","Grano",["Unidad"]],["任何",null,"rènhé","Cualquier",["Alguno"]],["许多","許多","xǔduō","Muchos",null],["新鲜","新鮮","xīnxiān","Fresco",["Novedoso"]],["熟",null,"shóu","Cocido/conocido",null],["炒",null,"chǎo","Saltear / especular",null],["炸",null,"zhá","Explotar",["Freír"]],["尝","嚐","cháng","Probar",["Saborear"]],["装","裝","zhuāng","Instalar",null],["不用",null,"bùyòng","No es necesario",null],["不但",null,"bùdàn","No solo",["No únicamente"]],["不必",null,"bùbì","No es necesario",null],["不得了",null,"bùdéliǎo","Terrible",["Increíble"]],["不管",null,"bùguǎn","Sin importar",null],["只好",null,"zhǐhǎo","Tener que",["Verse obligado"]],["或",null,"huò","O",null],["可能",null,"kěnéng","Posibilidad",["Probabilidad"]],["而且",null,"érqiě","Además",["Y además"]],["原来","原來","yuánlái","Resulta que",["Originalmente"]],["也许","也許","yěxǔ","Quizás",null],["必须","必須","bìxū","Deber",["Necesitar"]],["多么","多麼","duōme","Qué",["Cuán"]],["这样","這樣","zhèyàng","Así",null],["那样","那樣","nàyàng","Así",["De esa manera"]],["等",null,"děng","Etcétera",["Y otros"]],["别的","別的","biéde","Otros",null],["除了",null,"chúle","Excepto",["Salvo"]],["从来","從來","cónglái","Nunca",["Jamás"]],["大概",null,"dàgài","Aproximadamente",["Probablemente"]],["还好","還好","háihǎo","Afortunadamente",["Por suerte"]],["极","極","jí","Arriba",["Mayor","Extremadamente"]],["接着","接著","jiēzhe","Continuar",["Seguidamente"]],["结果","結果","jiéguǒ","Resultado",["Por lo tanto"]],["立刻",null,"lìkè","Inmediatamente",["Ahora","En seguida"]],["没想到","沒想到","méi xiǎngdào","No esperado",null],["其实","其實","qíshí","En realidad",["De hecho"]],["其中",null,"qízhōng","Entre ellos",["De los cuales"]],["完全",null,"wánquán","Completamente",null],["相当","相當","xiāngdāng","Bastante",["Relativamente"]],["一切",null,"yīqiè","Todo",["Totalidad"]],["已",null,"yǐ","Ya",["Ya mismo"]],["尤其",null,"yóuqí","Especialmente",["Sobre todo"]],["越",null,"yuè","Cuanto",null],["整",null,"zhěng","Entero",["Completo"]],["正",null,"zhèng","Justo",["Precisamente"]],["只要",null,"zhǐyào","Siempre que",null],["最好",null,"zuìhǎo","Lo mejor",null],["同样","同樣","tóngyàng","Igual",null],["空",null,"kōng","Vacío",["Hueco","Ocioso"]],["连","連","lián","Incluso",["Hasta","También"]],["倍",null,"bèi","Doble",null],["包括",null,"bāokuò","Incluir",null],["步",null,"bù","Paso",null],["当时","當時","dāngshí","En ese momento",["Entonces"]],["等到",null,"děngdào","Cuando",["Al llegar"]],["烦","煩","fán","Superfluo y confuso",["Molestar","Tenso"]],["刚好","剛好","gānghǎo","Justo",null],["或者",null,"huòzhě","O bien",["Tal vez"]],["哇",null,"wā","Expresión asombro",null],["需",null,"xū","Necesidad",["Requerir","Querer"]],["须","須","xū","Esperar",["Palpador (de un insecto, etc.)","Tener que"]],["直接",null,"zhíjiē","Directo",null],["总","總","zǒng","Siempre",null],["泡",null,"pào","Remojar/café",null],["且",null,"qiě","Además",["Siendo por el momento","Y"]],["比方",null,"bǐfāng","Ejemplo",null],["比方说","比方說","bǐfāngshuō","Por ejemplo",["Como por ejemplo"]],["传","傳","chuán","Transmitir",["Pasar"]],["另",null,"lìng","Otro",["Separado","Por separado"]],["另外",null,"lìngwài","Además",["Por otro lado","Separado"]],["左右",null,"zuǒyòu","Aproximadamente",null],["当","當","dāng","Cuando",["Mientras"]],["类","類","lèi","Tipo",["Especie","Categoría"]],["样","樣","yàng","Tipo",["Forma","Manera"]]],
'TOCFL': [{"id":"tocfl-01","level":1,"module":"TOCFL","spanish_full":"Gracias por tu ayuda.","spanish_cloze":"Gracias por tu ___.","spanish_answer":"ayuda","spanish_alternatives":["apoyo"],"chinese_simp_full":"谢谢您的帮忙。","chinese_simp_cloze":"谢谢您的___。","chinese_simp_answer":"帮忙","chinese_trad_full":"謝謝您的幫忙。","chinese_trad_cloze":"謝謝您的___。","chinese_trad_answer":"幫忙","pinyin":"Xièxie nín de bāngmáng."},{"id":"tocfl-02","level":1,"module":"TOCFL","spanish_full":"Disculpe, ¿dónde está el baño?","spanish_cloze":"___, ¿dónde está el baño?","spanish_answer":"Disculpe","spanish_alternatives":["perdón","perdon","oiga"],"chinese_simp_full":"请问，厕所在哪里？","chinese_simp_cloze":"___，厕所在哪里？","chinese_simp_answer":"请问","chinese_trad_full":"請問，廁所在哪裡？","chinese_trad_cloze":"___，廁所在哪裡？","chinese_trad_answer":"請問","pinyin":"Qǐngwèn, cèsuǒ zài nǎlǐ?"},{"id":"tocfl-03","level":1,"module":"TOCFL","spanish_full":"Quiero sacar una tarjeta de transporte.","spanish_cloze":"Quiero sacar una ___.","spanish_answer":"tarjeta de transporte","spanish_alternatives":["metro","transporte público"],"chinese_simp_full":"我想办一张悠游卡。","chinese_simp_cloze":"我想办一张___。","chinese_simp_answer":"悠游卡","chinese_trad_full":"我想辦一張悠遊卡。","chinese_trad_cloze":"我想辦一張___。","chinese_trad_answer":"悠遊卡","pinyin":"Wǒ xiǎng bàn yì zhāng Yōuyóukǎ."},{"id":"tocfl-04","level":1,"module":"TOCFL","spanish_full":"¿Mañana va a llover?","spanish_cloze":"¿Mañana va a ___?","spanish_answer":"llover","spanish_alternatives":[],"chinese_simp_full":"明天会下雨吗？","chinese_simp_cloze":"明天会___吗？","chinese_simp_answer":"下雨","chinese_trad_full":"明天會下雨嗎？","chinese_trad_cloze":"明天會___嗎？","chinese_trad_answer":"下雨","pinyin":"Míngtiān huì xiàyǔ ma?"},{"id":"tocfl-05","level":1,"module":"TOCFL","spanish_full":"La fruta de esta tienda es muy barata.","spanish_cloze":"La fruta de esta tienda es muy ___.","spanish_answer":"barata","spanish_alternatives":["barato","económica","economica"],"chinese_simp_full":"这家店的水果很便宜。","chinese_simp_cloze":"这家店的水果很___。","chinese_simp_answer":"便宜","chinese_trad_full":"這家店的水果很便宜。","chinese_trad_cloze":"這家店的水果很___。","chinese_trad_answer":"便宜","pinyin":"Zhè jiā diàn de shuǐguǒ hěn piányi."},{"id":"tocfl-06","level":1,"module":"TOCFL","spanish_full":"Yo trabajo en Taipéi.","spanish_cloze":"Yo ___ en Taipéi.","spanish_answer":"trabajo","spanish_alternatives":["laboro"],"chinese_simp_full":"我在台北工作。","chinese_simp_cloze":"我在台北___。","chinese_simp_answer":"工作","chinese_trad_full":"我在台北工作。","chinese_trad_cloze":"我在台北___。","chinese_trad_answer":"工作","pinyin":"Wǒ zài Táiběi gōngzuò."},{"id":"tocfl-07","level":1,"module":"TOCFL","spanish_full":"Espérame, por favor.","spanish_cloze":"___, por favor.","spanish_answer":"Espérame","spanish_alternatives":["esperame","espera","Espéreme","espereme"],"chinese_simp_full":"请等我一下。","chinese_simp_cloze":"请___我一下。","chinese_simp_answer":"等","chinese_trad_full":"請等我一下。","chinese_trad_cloze":"請___我一下。","chinese_trad_answer":"等","pinyin":"Qǐng děng wǒ yíxià."},{"id":"tocfl-08","level":1,"module":"TOCFL","spanish_full":"El mercado nocturno de aquí es muy famoso.","spanish_cloze":"El mercado ___ de aquí es muy famoso.","spanish_answer":"nocturno","spanish_alternatives":["noche"],"chinese_simp_full":"这里的夜市非常有名。","chinese_simp_cloze":"这里的___非常有名。","chinese_simp_answer":"夜市","chinese_trad_full":"這裡的夜市非常有名。","chinese_trad_cloze":"這裡的___非常有名。","chinese_trad_answer":"夜市","pinyin":"Zhèlǐ de yèshì fēicháng yǒumíng."},{"id":"tocfl-09","level":1,"module":"TOCFL","spanish_full":"No hablo bien el chino.","spanish_cloze":"No hablo bien el ___.","spanish_answer":"chino","spanish_alternatives":["mandarín","mandarin"],"chinese_simp_full":"我的中文说得不好。","chinese_simp_cloze":"我的___说得不好。","chinese_simp_answer":"中文","chinese_trad_full":"我的中文說得不好。","chinese_trad_cloze":"我的___說得不好。","chinese_trad_answer":"中文","pinyin":"Wǒ de Zhōngwén shuō de bù hǎo."},{"id":"tocfl-10","level":1,"module":"TOCFL","spanish_full":"¿Has comido fideos con carne de res?","spanish_cloze":"¿Has ___ fideos con carne de res?","spanish_answer":"comido","spanish_alternatives":["probado"],"chinese_simp_full":"你吃过牛肉面吗？","chinese_simp_cloze":"你___牛肉面吗？","chinese_simp_answer":"吃过","chinese_trad_full":"你吃過牛肉麵嗎？","chinese_trad_cloze":"你___牛肉麵嗎？","chinese_trad_answer":"吃過","pinyin":"Nǐ chī guò niúròu miàn ma?"},{"id":"tocfl-11","level":1,"module":"TOCFL","spanish_full":"El tiempo está cada vez más caluroso.","spanish_cloze":"El tiempo está cada vez más ___.","spanish_answer":"caluroso","spanish_alternatives":["caliente","cálido","calido"],"chinese_simp_full":"天气越来越热了。","chinese_simp_cloze":"天气越来越___了。","chinese_simp_answer":"热","chinese_trad_full":"天氣越來越熱了。","chinese_trad_cloze":"天氣越來越___了。","chinese_trad_answer":"熱","pinyin":"Tiānqì yuèláiyuè rè le."},{"id":"tocfl-12","level":1,"module":"TOCFL","spanish_full":"Por favor, pon el equipaje aquí.","spanish_cloze":"Por favor, pon el equipaje ___.","spanish_answer":"aquí","spanish_alternatives":["aqui","acá","aca"],"chinese_simp_full":"请把行李放在这里。","chinese_simp_cloze":"请把行李放在___。","chinese_simp_answer":"这里","chinese_trad_full":"請把行李放在這裡。","chinese_trad_cloze":"請把行李放在___。","chinese_trad_answer":"這裡","pinyin":"Qǐng bǎ xíngli fàng zài zhèlǐ."},{"id":"tocfl-13","level":1,"module":"TOCFL","spanish_full":"Quiero pedir hora con el médico.","spanish_cloze":"Quiero pedir ___ con el médico.","spanish_answer":"hora","spanish_alternatives":["cita","turno"],"chinese_simp_full":"我要预约看医生。","chinese_simp_cloze":"我要___看医生。","chinese_simp_answer":"预约","chinese_trad_full":"我要預約看醫生。","chinese_trad_cloze":"我要___看醫生。","chinese_trad_answer":"預約","pinyin":"Wǒ yào yùyuē kàn yīshēng."},{"id":"tocfl-14","level":1,"module":"TOCFL","spanish_full":"Esta calle está muy congestionada.","spanish_cloze":"Esta calle está muy ___.","spanish_answer":"congestionada","spanish_alternatives":["atascada","tapada"],"chinese_simp_full":"这条路很塞车。","chinese_simp_cloze":"这条路很___。","chinese_simp_answer":"塞车","chinese_trad_full":"這條路很塞車。","chinese_trad_cloze":"這條路很___。","chinese_trad_answer":"塞車","pinyin":"Zhè tiáo lù hěn sāichē."},{"id":"tocfl-15","level":1,"module":"TOCFL","spanish_full":"La semana que viene tenemos un examen.","spanish_cloze":"La semana que viene tenemos un ___.","spanish_answer":"examen","spanish_alternatives":["test"],"chinese_simp_full":"我们下个星期考试。","chinese_simp_cloze":"我们下个星期___。","chinese_simp_answer":"考试","chinese_trad_full":"我們下個星期考試。","chinese_trad_cloze":"我們下個星期___。","chinese_trad_answer":"考試","pinyin":"Wǒmen xià gè xīngqī kǎoshì."},{"id":"tocfl-16","level":1,"module":"TOCFL","spanish_full":"Este diccionario es muy útil.","spanish_cloze":"Este ___ es muy útil.","spanish_answer":"diccionario","spanish_alternatives":[],"chinese_simp_full":"这本字典很有用。","chinese_simp_cloze":"这本___很有用。","chinese_simp_answer":"字典","chinese_trad_full":"這本字典很有用。","chinese_trad_cloze":"這本___很有用。","chinese_trad_answer":"字典","pinyin":"Zhè běn zìdiǎn hěn yǒuyòng."},{"id":"tocfl-17","level":1,"module":"TOCFL","spanish_full":"La estación está muy lejos de aquí.","spanish_cloze":"La estación está muy ___ de aquí.","spanish_answer":"lejos","spanish_alternatives":["alejada","alejado"],"chinese_simp_full":"车站离这里很远。","chinese_simp_cloze":"车站离这里很___。","chinese_simp_answer":"远","chinese_trad_full":"車站離這裡很遠。","chinese_trad_cloze":"車站離這裡很___。","chinese_trad_answer":"遠","pinyin":"Chēzhàn lí zhèlǐ hěn yuǎn."},{"id":"tocfl-18","level":1,"module":"TOCFL","spanish_full":"¡Feliz año nuevo!","spanish_cloze":"¡Feliz año ___!","spanish_answer":"nuevo","spanish_alternatives":["nueva"],"chinese_simp_full":"祝你新年快乐！","chinese_simp_cloze":"祝你___！","chinese_simp_answer":"新年快乐","chinese_trad_full":"祝你新年快樂！","chinese_trad_cloze":"祝你___！","chinese_trad_answer":"新年快樂","pinyin":"Zhù nǐ xīnnián kuàilè!"},{"id":"tocfl-19","level":1,"module":"TOCFL","spanish_full":"Me gusta beber té de leche con perlas.","spanish_cloze":"Me gusta beber té de leche con ___.","spanish_answer":"perlas","spanish_alternatives":["burbujas","tapioca","perla"],"chinese_simp_full":"我喜欢喝珍珠奶茶。","chinese_simp_cloze":"我喜欢喝___奶茶。","chinese_simp_answer":"珍珠","chinese_trad_full":"我喜歡喝珍珠奶茶。","chinese_trad_cloze":"我喜歡喝___奶茶。","chinese_trad_answer":"珍珠","pinyin":"Wǒ xǐhuān hē zhēnzhū nǎichá."},{"id":"tocfl-20","level":1,"module":"TOCFL","spanish_full":"Hoy la entrada al museo es gratuita.","spanish_cloze":"Hoy la entrada al museo es ___.","spanish_answer":"gratuita","spanish_alternatives":["gratis","libre"],"chinese_simp_full":"博物馆今天免费参观。","chinese_simp_cloze":"博物馆今天___参观。","chinese_simp_answer":"免费","chinese_trad_full":"博物館今天免費參觀。","chinese_trad_cloze":"博物館今天___參觀。","chinese_trad_answer":"免費","pinyin":"Bówùguǎn jīntiān miǎnfèi cānguān."}],
'DELE-A1-Escolares': [{"id":"dele-a1-01","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi mochila es nueva.","spanish_cloze":"Mi ___ es nueva.","spanish_answer":"mochila","spanish_alternatives":["bolso","cartera"],"chinese_simp_full":"我的书包是新的。","chinese_simp_cloze":"我的___是新的。","chinese_simp_answer":"书包","chinese_trad_full":"我的書包是新的。","chinese_trad_cloze":"我的___是新的。","chinese_trad_answer":"書包","pinyin":"Wǒ de shūbāo shì xīn de."},{"id":"dele-a1-02","level":1,"module":"DELE-A1-Escolares","spanish_full":"Tengo un lápiz y dos libros.","spanish_cloze":"Tengo un lápiz y dos ___.","spanish_answer":"libros","spanish_alternatives":["libro"],"chinese_simp_full":"我有一支铅笔和两本书。","chinese_simp_cloze":"我有一支铅笔和两本___。","chinese_simp_answer":"书","chinese_trad_full":"我有一支鉛筆和兩本書。","chinese_trad_cloze":"我有一支鉛筆和兩本___。","chinese_trad_answer":"書","pinyin":"Wǒ yǒu yì zhī qiānbǐ hé liǎng běn shū."},{"id":"dele-a1-03","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi hermana tiene once años.","spanish_cloze":"Mi hermana ___ once años.","spanish_answer":"tiene","spanish_alternatives":[],"chinese_simp_full":"我妹妹十一岁。","chinese_simp_cloze":"我妹妹___。","chinese_simp_answer":"十一岁","chinese_trad_full":"我妹妹十一歲。","chinese_trad_cloze":"我妹妹___。","chinese_trad_answer":"十一歲","pinyin":"Wǒ mèimei shíyī suì."},{"id":"dele-a1-04","level":1,"module":"DELE-A1-Escolares","spanish_full":"El perro de mi amigo es muy grande.","spanish_cloze":"El perro de mi amigo es muy ___.","spanish_answer":"grande","spanish_alternatives":["grandote"],"chinese_simp_full":"我朋友的狗很大。","chinese_simp_cloze":"我朋友的狗很___。","chinese_simp_answer":"大","chinese_trad_full":"我朋友的狗很大。","chinese_trad_cloze":"我朋友的狗很___。","chinese_trad_answer":"大","pinyin":"Wǒ péngyou de gǒu hěn dà."},{"id":"dele-a1-05","level":1,"module":"DELE-A1-Escolares","spanish_full":"Me gusta el color verde.","spanish_cloze":"Me gusta el color ___.","spanish_answer":"verde","spanish_alternatives":[],"chinese_simp_full":"我喜欢绿色。","chinese_simp_cloze":"我喜欢___色。","chinese_simp_answer":"绿","chinese_trad_full":"我喜歡綠色。","chinese_trad_cloze":"我喜歡___色。","chinese_trad_answer":"綠","pinyin":"Wǒ xǐhuan lǜsè."},{"id":"dele-a1-06","level":1,"module":"DELE-A1-Escolares","spanish_full":"La escuela está cerca de mi casa.","spanish_cloze":"La escuela está ___ de mi casa.","spanish_answer":"cerca","spanish_alternatives":[],"chinese_simp_full":"学校离我家很近。","chinese_simp_cloze":"学校离我家很___。","chinese_simp_answer":"近","chinese_trad_full":"學校離我家很近。","chinese_trad_cloze":"學校離我家很___。","chinese_trad_answer":"近","pinyin":"Xuéxiào lí wǒ jiā hěn jìn."},{"id":"dele-a1-07","level":1,"module":"DELE-A1-Escolares","spanish_full":"Desayuno leche y pan todos los días.","spanish_cloze":"___ leche y pan todos los días.","spanish_answer":"Desayuno","spanish_alternatives":["Tomo"],"chinese_simp_full":"我每天早餐喝牛奶吃面包。","chinese_simp_cloze":"我每天早餐___牛奶吃面包。","chinese_simp_answer":"喝","chinese_trad_full":"我每天早餐喝牛奶吃麵包。","chinese_trad_cloze":"我每天早餐___牛奶吃麵包。","chinese_trad_answer":"喝","pinyin":"Wǒ měitiān zǎocān hē niúnǎi chī miànbāo."},{"id":"dele-a1-08","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi asignatura favorita es la música.","spanish_cloze":"Mi ___ favorita es la música.","spanish_answer":"asignatura","spanish_alternatives":["materia"],"chinese_simp_full":"我最喜欢的科目是音乐。","chinese_simp_cloze":"我最___的科目是音乐。","chinese_simp_answer":"喜欢","chinese_trad_full":"我最喜歡的科目是音樂。","chinese_trad_cloze":"我最___的科目是音樂。","chinese_trad_answer":"喜歡","pinyin":"Wǒ zuì xǐhuan de kēmù shì yīnyuè."},{"id":"dele-a1-09","level":1,"module":"DELE-A1-Escolares","spanish_full":"El profe escribe en el pizarrón.","spanish_cloze":"El profe ___ en el pizarrón.","spanish_answer":"escribe","spanish_alternatives":[],"chinese_simp_full":"老师在黑板上写字。","chinese_simp_cloze":"老师在黑板上___字。","chinese_simp_answer":"写","chinese_trad_full":"老師在黑板上寫字。","chinese_trad_cloze":"老師在黑板上___字。","chinese_trad_answer":"寫","pinyin":"Lǎoshī zài hēibǎn shàng xiě zì."},{"id":"dele-a1-10","level":1,"module":"DELE-A1-Escolares","spanish_full":"Tengo una mascota llamada Nube.","spanish_cloze":"Tengo una ___ llamada Nube.","spanish_answer":"mascota","spanish_alternatives":[],"chinese_simp_full":"我有一只宠物，叫云朵。","chinese_simp_cloze":"我有一只___，叫云朵。","chinese_simp_answer":"宠物","chinese_trad_full":"我有一隻寵物，叫雲朵。","chinese_trad_cloze":"我有一隻___，叫雲朵。","chinese_trad_answer":"寵物","pinyin":"Wǒ yǒu yì zhī chǒngwù, jiào Yúnduǒ."},{"id":"dele-a1-11","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mis compañeros son muy simpáticos.","spanish_cloze":"Mis ___ son muy simpáticos.","spanish_answer":"compañeros","spanish_alternatives":["amigos"],"chinese_simp_full":"我的同学们很友好。","chinese_simp_cloze":"我的___们很友好。","chinese_simp_answer":"同学","chinese_trad_full":"我的同學們很友好。","chinese_trad_cloze":"我的___們很友好。","chinese_trad_answer":"同學","pinyin":"Wǒ de tóngxuémen hěn yǒuhǎo."},{"id":"dele-a1-12","level":1,"module":"DELE-A1-Escolares","spanish_full":"Voy al colegio en bicicleta.","spanish_cloze":"Voy al colegio en ___.","spanish_answer":"bicicleta","spanish_alternatives":["bici"],"chinese_simp_full":"我骑自行车去上学。","chinese_simp_cloze":"我骑___去上学。","chinese_simp_answer":"自行车","chinese_trad_full":"我騎自行車去上學。","chinese_trad_cloze":"我騎___去上學。","chinese_trad_answer":"自行車","pinyin":"Wǒ qí zìxíngchē qù shàngxué."},{"id":"dele-a1-13","level":1,"module":"DELE-A1-Escolares","spanish_full":"El examen es el jueves.","spanish_cloze":"El examen es el ___.","spanish_answer":"jueves","spanish_alternatives":[],"chinese_simp_full":"考试在星期四。","chinese_simp_cloze":"考试在星期___。","chinese_simp_answer":"四","chinese_trad_full":"考試在星期四。","chinese_trad_cloze":"考試在星期___。","chinese_trad_answer":"四","pinyin":"Kǎoshì zài xīngqīsì."},{"id":"dele-a1-14","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi casa tiene tres habitaciones.","spanish_cloze":"Mi casa tiene ___ habitaciones.","spanish_answer":"tres","spanish_alternatives":[],"chinese_simp_full":"我的家有三个房间。","chinese_simp_cloze":"我的家有___个房间。","chinese_simp_answer":"三","chinese_trad_full":"我的家有三個房間。","chinese_trad_cloze":"我的家有___個房間。","chinese_trad_answer":"三","pinyin":"Wǒ de jiā yǒu sān gè fángjiān."},{"id":"dele-a1-15","level":1,"module":"DELE-A1-Escolares","spanish_full":"Como la fruta después del almuerzo.","spanish_cloze":"___ la fruta después del almuerzo.","spanish_answer":"Como","spanish_alternatives":[],"chinese_simp_full":"我午饭后吃水果。","chinese_simp_cloze":"我午饭后___水果。","chinese_simp_answer":"吃","chinese_trad_full":"我午飯後吃水果。","chinese_trad_cloze":"我午飯後___水果。","chinese_trad_answer":"吃","pinyin":"Wǒ wǔfàn hòu chī shuǐguǒ."},{"id":"dele-a1-16","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi mamá prepara empanadas los domingos.","spanish_cloze":"Mi mamá ___ empanadas los domingos.","spanish_answer":"prepara","spanish_alternatives":["hace","cocina"],"chinese_simp_full":"我妈妈星期天做馅饼。","chinese_simp_cloze":"我妈妈星期天___馅饼。","chinese_simp_answer":"做","chinese_trad_full":"我媽媽星期天做餡餅。","chinese_trad_cloze":"我媽媽星期天___餡餅。","chinese_trad_answer":"做","pinyin":"Wǒ māma xīngqītiān zuò xiànbǐng."},{"id":"dele-a1-17","level":1,"module":"DELE-A1-Escolares","spanish_full":"En verano hace mucho calor.","spanish_cloze":"En verano hace mucho ___.","spanish_answer":"calor","spanish_alternatives":[],"chinese_simp_full":"夏天天气很热。","chinese_simp_cloze":"夏天天气很___。","chinese_simp_answer":"热","chinese_trad_full":"夏天天氣很熱。","chinese_trad_cloze":"夏天天氣很___。","chinese_trad_answer":"熱","pinyin":"Xiàtiān tiānqì hěn rè."},{"id":"dele-a1-18","level":1,"module":"DELE-A1-Escolares","spanish_full":"Juego al fútbol con mis amigos.","spanish_cloze":"Juego al ___ con mis amigos.","spanish_answer":"fútbol","spanish_alternatives":["futbol"],"chinese_simp_full":"我和朋友们踢足球。","chinese_simp_cloze":"我和朋友们踢___。","chinese_simp_answer":"足球","chinese_trad_full":"我和朋友們踢足球。","chinese_trad_cloze":"我和朋友們踢___。","chinese_trad_answer":"足球","pinyin":"Wǒ hé péngyoumen tī zúqiú."},{"id":"dele-a1-19","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi cumpleaños es en marzo.","spanish_cloze":"Mi ___ es en marzo.","spanish_answer":"cumpleaños","spanish_alternatives":["cumpleanos","cumple"],"chinese_simp_full":"我的生日在三月。","chinese_simp_cloze":"我的___在三月。","chinese_simp_answer":"生日","chinese_trad_full":"我的生日在三月。","chinese_trad_cloze":"我的___在三月。","chinese_trad_answer":"生日","pinyin":"Wǒ de shēngrì zài sānyuè."},{"id":"dele-a1-20","level":1,"module":"DELE-A1-Escolares","spanish_full":"Necesito un cuaderno nuevo.","spanish_cloze":"Necesito un ___ nuevo.","spanish_answer":"cuaderno","spanish_alternatives":[],"chinese_simp_full":"我需要一个新本子。","chinese_simp_cloze":"我需要一个新___。","chinese_simp_answer":"本子","chinese_trad_full":"我需要一個新本子。","chinese_trad_cloze":"我需要一個新___。","chinese_trad_answer":"本子","pinyin":"Wǒ xūyào yí gè xīn běnzi."},{"id":"dele-a1-21","level":1,"module":"DELE-A1-Escolares","spanish_full":"La profesora explica la lección despacio.","spanish_cloze":"La profesora ___ la lección despacio.","spanish_answer":"explica","spanish_alternatives":[],"chinese_simp_full":"老师慢慢地讲解课文。","chinese_simp_cloze":"老师慢慢地___课文。","chinese_simp_answer":"讲解","chinese_trad_full":"老師慢慢地講解課文。","chinese_trad_cloze":"老師慢慢地___課文。","chinese_trad_answer":"講解","pinyin":"Lǎoshī mànmàn de jiǎngjiě kèwén."},{"id":"dele-a1-22","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mis zapatos son negros.","spanish_cloze":"Mis ___ son negros.","spanish_answer":"zapatos","spanish_alternatives":["zapatillas"],"chinese_simp_full":"我的鞋子是黑色的。","chinese_simp_cloze":"我的___是黑色的。","chinese_simp_answer":"鞋子","chinese_trad_full":"我的鞋子是黑色的。","chinese_trad_cloze":"我的___是黑色的。","chinese_trad_answer":"鞋子","pinyin":"Wǒ de xiézi shì hēisè de."},{"id":"dele-a1-23","level":1,"module":"DELE-A1-Escolares","spanish_full":"Estudio chino los sábados.","spanish_cloze":"___ chino los sábados.","spanish_answer":"Estudio","spanish_alternatives":[],"chinese_simp_full":"我星期六学中文。","chinese_simp_cloze":"我星期六___中文。","chinese_simp_answer":"学","chinese_trad_full":"我星期六學中文。","chinese_trad_cloze":"我星期六___中文。","chinese_trad_answer":"學","pinyin":"Wǒ xīngqīliù xué Zhōngwén."},{"id":"dele-a1-24","level":1,"module":"DELE-A1-Escolares","spanish_full":"El recreo es a las diez y media.","spanish_cloze":"El ___ es a las diez y media.","spanish_answer":"recreo","spanish_alternatives":["descanso"],"chinese_simp_full":"课间休息在十点半。","chinese_simp_cloze":"___在十点半。","chinese_simp_answer":"课间休息","chinese_trad_full":"課間休息在十點半。","chinese_trad_cloze":"___在十點半。","chinese_trad_answer":"課間休息","pinyin":"Kèjiān xiūxi zài shí diǎn bàn."},{"id":"dele-a1-25","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi papá trabaja en un hospital.","spanish_cloze":"Mi papá ___ en un hospital.","spanish_answer":"trabaja","spanish_alternatives":[],"chinese_simp_full":"我爸爸在医院工作。","chinese_simp_cloze":"我爸爸在医院___。","chinese_simp_answer":"工作","chinese_trad_full":"我爸爸在醫院工作。","chinese_trad_cloze":"我爸爸在醫院___。","chinese_trad_answer":"工作","pinyin":"Wǒ bàba zài yīyuàn gōngzuò."},{"id":"dele-a1-26","level":1,"module":"DELE-A1-Escolares","spanish_full":"Quiero un celular nuevo para mi cumpleaños.","spanish_cloze":"Quiero un ___ nuevo para mi cumpleaños.","spanish_answer":"celular","spanish_alternatives":["teléfono","telefono","móvil"],"chinese_simp_full":"我生日想要一部新手机。","chinese_simp_cloze":"我生日想要一部新___。","chinese_simp_answer":"手机","chinese_trad_full":"我生日想要一部新手機。","chinese_trad_cloze":"我生日想要一部新___。","chinese_trad_answer":"手機","pinyin":"Wǒ shēngrì xiǎng yào yí bù xīn shǒujī."},{"id":"dele-a1-27","level":1,"module":"DELE-A1-Escolares","spanish_full":"Hay veinte estudiantes en mi clase.","spanish_cloze":"Hay ___ estudiantes en mi clase.","spanish_answer":"veinte","spanish_alternatives":[],"chinese_simp_full":"我们班有二十个学生。","chinese_simp_cloze":"我们班有___个学生。","chinese_simp_answer":"二十","chinese_trad_full":"我們班有二十個學生。","chinese_trad_cloze":"我們班有___個學生。","chinese_trad_answer":"二十","pinyin":"Wǒmen bān yǒu èrshí gè xuésheng."},{"id":"dele-a1-28","level":1,"module":"DELE-A1-Escolares","spanish_full":"Mi abuela vive en Córdoba.","spanish_cloze":"Mi abuela ___ en Córdoba.","spanish_answer":"vive","spanish_alternatives":[],"chinese_simp_full":"我奶奶住在科尔多瓦。","chinese_simp_cloze":"我奶奶___在科尔多瓦。","chinese_simp_answer":"住","chinese_trad_full":"我奶奶住在科爾多瓦。","chinese_trad_cloze":"我奶奶___在科爾多瓦。","chinese_trad_answer":"住","pinyin":"Wǒ nǎinai zhù zài Kē'ěrduōwǎ."},{"id":"dele-a1-29","level":1,"module":"DELE-A1-Escolares","spanish_full":"Cierro la ventana porque hace frío.","spanish_cloze":"___ la ventana porque hace frío.","spanish_answer":"Cierro","spanish_alternatives":[],"chinese_simp_full":"因为天冷，我关上窗户。","chinese_simp_cloze":"因为天冷，我___窗户。","chinese_simp_answer":"关上","chinese_trad_full":"因為天冷，我關上窗戶。","chinese_trad_cloze":"因為天冷，我___窗戶。","chinese_trad_answer":"關上","pinyin":"Yīnwèi tiān lěng, wǒ guān shàng chuānghu."},{"id":"dele-a1-30","level":1,"module":"DELE-A1-Escolares","spanish_full":"En enero nado en la pileta.","spanish_cloze":"En enero ___ en la pileta.","spanish_answer":"nado","spanish_alternatives":[],"chinese_simp_full":"一月我在游泳池游泳。","chinese_simp_cloze":"一月我在游泳池___。","chinese_simp_answer":"游泳","chinese_trad_full":"一月我在游泳池游泳。","chinese_trad_cloze":"一月我在游泳池___。","chinese_trad_answer":"游泳","pinyin":"Yīyuè wǒ zài yóuyǒngchí yóuyǒng."}],
'DELE-A2B1-Escolares': [{"id":"dele-01","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Llevo tres años estudiando español.","spanish_cloze":"Llevo tres años ___ español.","spanish_answer":"estudiando","spanish_alternatives":["hablando","aprendiendo"],"chinese_simp_full":"我学西班牙语三年了。","chinese_simp_cloze":"我___西班牙语三年了。","chinese_simp_answer":"学","chinese_trad_full":"我學西班牙語三年了。","chinese_trad_cloze":"我___西班牙語三年了。","chinese_trad_answer":"學","pinyin":"Wǒ xué Xībānyáyǔ sān nián le."},{"id":"dele-02","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"¿Qué planes tienes para este sábado?","spanish_cloze":"¿Qué ___ tienes para este sábado?","spanish_answer":"planes","spanish_alternatives":["plan"],"chinese_simp_full":"这个星期六你有什么计划？","chinese_simp_cloze":"这个星期六你有什么___？","chinese_simp_answer":"计划","chinese_trad_full":"這個星期六你有什麼計劃？","chinese_trad_cloze":"這個星期六你有什麼___？","chinese_trad_answer":"計劃","pinyin":"Zhège xīngqīliù nǐ yǒu shénme jìhuà?"},{"id":"dele-03","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Este suéter me queda un poco pequeño.","spanish_cloze":"Este suéter me queda un poco ___.","spanish_answer":"pequeño","spanish_alternatives":["pequeno","chico","ajustado"],"chinese_simp_full":"这件毛衣有点儿小。","chinese_simp_cloze":"这件毛衣有点儿___。","chinese_simp_answer":"小","chinese_trad_full":"這件毛衣有點兒小。","chinese_trad_cloze":"這件毛衣有點兒___。","chinese_trad_answer":"小","pinyin":"Zhè jiàn máoyī yǒudiǎnr xiǎo."},{"id":"dele-04","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mañana voy al banco a cambiar dinero.","spanish_cloze":"Mañana voy al banco a ___ dinero.","spanish_answer":"cambiar","spanish_alternatives":[],"chinese_simp_full":"我明天要去银行换钱。","chinese_simp_cloze":"我明天要去银行___。","chinese_simp_answer":"换钱","chinese_trad_full":"我明天要去銀行換錢。","chinese_trad_cloze":"我明天要去銀行___。","chinese_trad_answer":"換錢","pinyin":"Wǒ míngtiān yào qù yínháng huàn qián."},{"id":"dele-05","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"El médico dice que debo beber más agua.","spanish_cloze":"El médico dice que debo beber más ___.","spanish_answer":"agua","spanish_alternatives":["líquidos","liquidos"],"chinese_simp_full":"医生说我需要多喝水。","chinese_simp_cloze":"医生说我需要多喝___。","chinese_simp_answer":"水","chinese_trad_full":"醫生說我需要多喝水。","chinese_trad_cloze":"醫生說我需要多喝___。","chinese_trad_answer":"水","pinyin":"Yīshēng shuō wǒ xūyào duō hē shuǐ."},{"id":"dele-06","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"El tren sale a las ocho y media.","spanish_cloze":"El tren ___ a las ocho y media.","spanish_answer":"sale","spanish_alternatives":["parte","se va"],"chinese_simp_full":"火车八点半出发。","chinese_simp_cloze":"火车八点半___。","chinese_simp_answer":"出发","chinese_trad_full":"火車八點半出發。","chinese_trad_cloze":"火車八點半___。","chinese_trad_answer":"出發","pinyin":"Huǒchē bā diǎn bàn chūfā."},{"id":"dele-07","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mi ordenador tiene un virus.","spanish_cloze":"Mi ordenador tiene un ___.","spanish_answer":"virus","spanish_alternatives":[],"chinese_simp_full":"我的电脑中毒了。","chinese_simp_cloze":"我的电脑___了。","chinese_simp_answer":"中毒","chinese_trad_full":"我的電腦中毒了。","chinese_trad_cloze":"我的電腦___了。","chinese_trad_answer":"中毒","pinyin":"Wǒ de diànnǎo zhòngdú le."},{"id":"dele-08","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Espera aquí el autobús, por favor.","spanish_cloze":"___ aquí el autobús, por favor.","spanish_answer":"Espera","spanish_alternatives":["esperad","Espere","espere"],"chinese_simp_full":"请在这里等巴士。","chinese_simp_cloze":"请在这里___巴士。","chinese_simp_answer":"等","chinese_trad_full":"請在這裡等巴士。","chinese_trad_cloze":"請在這裡___巴士。","chinese_trad_answer":"等","pinyin":"Qǐng zài zhèlǐ děng bāshì."},{"id":"dele-09","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Ayer compré una sandía en el supermercado.","spanish_cloze":"Ayer ___ una sandía en el supermercado.","spanish_answer":"compré","spanish_alternatives":["compre","conseguí","consegui"],"chinese_simp_full":"我昨天在超市买了西瓜。","chinese_simp_cloze":"我昨天在超市___了西瓜。","chinese_simp_answer":"买","chinese_trad_full":"我昨天在超市買了西瓜。","chinese_trad_cloze":"我昨天在超市___了西瓜。","chinese_trad_answer":"買","pinyin":"Wǒ zuótiān zài chāoshì mǎi le xīguā."},{"id":"dele-10","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Esta noche hay un partido de fútbol.","spanish_cloze":"Esta noche hay un ___ de fútbol.","spanish_answer":"partido","spanish_alternatives":["futbol","football"],"chinese_simp_full":"今晚有一场足球比赛。","chinese_simp_cloze":"今晚有一场足球___。","chinese_simp_answer":"比赛","chinese_trad_full":"今晚有一場足球比賽。","chinese_trad_cloze":"今晚有一場足球___。","chinese_trad_answer":"比賽","pinyin":"Jīnwǎn yǒu yì chǎng zúqiú bǐsài."},{"id":"dele-11","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mi compañero de piso es muy limpio.","spanish_cloze":"Mi compañero de piso es muy ___.","spanish_answer":"limpio","spanish_alternatives":["limpia","ordenado"],"chinese_simp_full":"我的室友很爱干净。","chinese_simp_cloze":"我的室友很___。","chinese_simp_answer":"爱干净","chinese_trad_full":"我的室友很愛乾淨。","chinese_trad_cloze":"我的室友很___。","chinese_trad_answer":"愛乾淨","pinyin":"Wǒ de shìyǒu hěn ài gānjìng."},{"id":"dele-12","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Hace frío, ponte más ropa.","spanish_cloze":"Hace frío, ___ más ropa.","spanish_answer":"ponte","spanish_alternatives":["póngase","abrígate","abrígate"],"chinese_simp_full":"天冷了，多穿点衣服。","chinese_simp_cloze":"天冷了，多___点衣服。","chinese_simp_answer":"穿","chinese_trad_full":"天冷了，多穿點衣服。","chinese_trad_cloze":"天冷了，多___點衣服。","chinese_trad_answer":"穿","pinyin":"Tiān lěng le, duō chuān diǎn yīfu."},{"id":"dele-13","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Hemos reservado mesa en el restaurante.","spanish_cloze":"Hemos ___ mesa en el restaurante.","spanish_answer":"reservado","spanish_alternatives":["pedido"],"chinese_simp_full":"我们在餐厅订了位子。","chinese_simp_cloze":"我们在餐厅___了位子。","chinese_simp_answer":"订","chinese_trad_full":"我們在餐廳訂了位子。","chinese_trad_cloze":"我們在餐廳___了位子。","chinese_trad_answer":"訂","pinyin":"Wǒmen zài cāntīng dìng le wèizi."},{"id":"dele-14","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Su fiesta de cumpleaños es el viernes por la noche.","spanish_cloze":"Su fiesta de cumpleaños es el viernes por la ___.","spanish_answer":"noche","spanish_alternatives":["tarde"],"chinese_simp_full":"他的生日派对在周五晚上。","chinese_simp_cloze":"他的生日派对在周五___。","chinese_simp_answer":"晚上","chinese_trad_full":"他的生日派對在週五晚上。","chinese_trad_cloze":"他的生日派對在週五___。","chinese_trad_answer":"晚上","pinyin":"Tā de shēngrì pàiduì zài zhōuwǔ wǎnshang."},{"id":"dele-15","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Estoy acostumbrado a levantarme temprano para estudiar.","spanish_cloze":"Estoy ___ a levantarme temprano para estudiar.","spanish_answer":"acostumbrado","spanish_alternatives":["acostumbrada","habituado"],"chinese_simp_full":"我习惯早起读书。","chinese_simp_cloze":"我___早起读书。","chinese_simp_answer":"习惯","chinese_trad_full":"我習慣早起讀書。","chinese_trad_cloze":"我___早起讀書。","chinese_trad_answer":"習慣","pinyin":"Wǒ xíguàn zǎo qǐ dúshū."},{"id":"dele-16","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Esta falda tiene un descuento del cincuenta por ciento.","spanish_cloze":"Esta falda tiene un ___ del cincuenta por ciento.","spanish_answer":"descuento","spanish_alternatives":["rebaja"],"chinese_simp_full":"这条裙子打折一半。","chinese_simp_cloze":"这条裙子___一半。","chinese_simp_answer":"打折","chinese_trad_full":"這條裙子打折一半。","chinese_trad_cloze":"這條裙子___一半。","chinese_trad_answer":"打折","pinyin":"Zhè tiáo qúnzi dǎzhé yíbàn."},{"id":"dele-17","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Abre la ventana un momento, por favor.","spanish_cloze":"Abre la ___ un momento, por favor.","spanish_answer":"ventana","spanish_alternatives":["ventanilla"],"chinese_simp_full":"请把窗户打开一下。","chinese_simp_cloze":"请把___打开一下。","chinese_simp_answer":"窗户","chinese_trad_full":"請把窗戶打開一下。","chinese_trad_cloze":"請把___打開一下。","chinese_trad_answer":"窗戶","pinyin":"Qǐng bǎ chuānghu dǎkāi yíxià."},{"id":"dele-18","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Quiero el filete en su punto.","spanish_cloze":"Quiero el filete en su ___.","spanish_answer":"punto","spanish_alternatives":["término","termino"],"chinese_simp_full":"我要一份牛排，五分熟。","chinese_simp_cloze":"我要一份牛排，___。","chinese_simp_answer":"五分熟","chinese_trad_full":"我要一份牛排，五分熟。","chinese_trad_cloze":"我要一份牛排，___。","chinese_trad_answer":"五分熟","pinyin":"Wǒ yào yí fèn niúpái, wǔ fēn shú."},{"id":"dele-19","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"En la biblioteca hay que guardar silencio.","spanish_cloze":"En la biblioteca hay que guardar ___.","spanish_answer":"silencio","spanish_alternatives":["calma"],"chinese_simp_full":"图书馆里要保持安静。","chinese_simp_cloze":"图书馆里要保持___。","chinese_simp_answer":"安静","chinese_trad_full":"圖書館裡要保持安靜。","chinese_trad_cloze":"圖書館裡要保持___。","chinese_trad_answer":"安靜","pinyin":"Túshūguǎn lǐ yào bǎochí ānjìng."},{"id":"dele-20","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"La semana próxima vamos a mudarnos de casa.","spanish_cloze":"La semana próxima vamos a ___ de casa.","spanish_answer":"mudarnos","spanish_alternatives":["piso","apartamento"],"chinese_simp_full":"我们下周要搬家了。","chinese_simp_cloze":"我们下周要___了。","chinese_simp_answer":"搬家","chinese_trad_full":"我們下週要搬家了。","chinese_trad_cloze":"我們下週要___了。","chinese_trad_answer":"搬家","pinyin":"Wǒmen xià zhōu yào bānjiā le."},{"id":"dele-a2b1-01","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Aprobé el examen de matemáticas.","spanish_cloze":"___ el examen de matemáticas.","spanish_answer":"Aprobé","spanish_alternatives":["aprobe"],"chinese_simp_full":"我数学考试及格了。","chinese_simp_cloze":"我数学考试___了。","chinese_simp_answer":"及格","chinese_trad_full":"我數學考試及格了。","chinese_trad_cloze":"我數學考試___了。","chinese_trad_answer":"及格","pinyin":"Wǒ shùxué kǎoshì jígé le."},{"id":"dele-a2b1-02","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"El finde vamos a ir al cine.","spanish_cloze":"El finde vamos a ___ al cine.","spanish_answer":"ir","spanish_alternatives":[],"chinese_simp_full":"周末我们去看电影。","chinese_simp_cloze":"周末我们___看电影。","chinese_simp_answer":"去","chinese_trad_full":"週末我們去看電影。","chinese_trad_cloze":"週末我們___看電影。","chinese_trad_answer":"去","pinyin":"Zhōumò wǒmen qù kàn diànyǐng."},{"id":"dele-a2b1-03","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Cuando era chico, vivía en Mendoza.","spanish_cloze":"Cuando era chico, ___ en Mendoza.","spanish_answer":"vivía","spanish_alternatives":["vivia"],"chinese_simp_full":"我小时候住在门多萨。","chinese_simp_cloze":"我小时候___在门多萨。","chinese_simp_answer":"住","chinese_trad_full":"我小時候住在門多薩。","chinese_trad_cloze":"我小時候___在門多薩。","chinese_trad_answer":"住","pinyin":"Wǒ xiǎoshíhou zhù zài Ménduōsà."},{"id":"dele-a2b1-04","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Tengo que entregar el trabajo el lunes.","spanish_cloze":"Tengo que ___ el trabajo el lunes.","spanish_answer":"entregar","spanish_alternatives":["presentar"],"chinese_simp_full":"我星期一得交作业。","chinese_simp_cloze":"我星期一得___作业。","chinese_simp_answer":"交","chinese_trad_full":"我星期一得交作業。","chinese_trad_cloze":"我星期一得___作業。","chinese_trad_answer":"交","pinyin":"Wǒ xīngqīyī děi jiāo zuòyè."},{"id":"dele-a2b1-05","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mi equipo ganó el partido del sábado.","spanish_cloze":"Mi equipo ___ el partido del sábado.","spanish_answer":"ganó","spanish_alternatives":["gano"],"chinese_simp_full":"我们队赢了星期六的比赛。","chinese_simp_cloze":"我们队___了星期六的比赛。","chinese_simp_answer":"赢","chinese_trad_full":"我們隊贏了星期六的比賽。","chinese_trad_cloze":"我們隊___了星期六的比賽。","chinese_trad_answer":"贏","pinyin":"Wǒmen duì yíng le xīngqīliù de bǐsài."},{"id":"dele-a2b1-06","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Todavía no me decido qué carrera estudiar.","spanish_cloze":"Todavía no me ___ qué carrera estudiar.","spanish_answer":"decido","spanish_alternatives":[],"chinese_simp_full":"我还没决定以后学什么专业。","chinese_simp_cloze":"我还没___以后学什么专业。","chinese_simp_answer":"决定","chinese_trad_full":"我還沒決定以後學什麼專業。","chinese_trad_cloze":"我還沒___以後學什麼專業。","chinese_trad_answer":"決定","pinyin":"Wǒ hái méi juédìng yǐhòu xué shénme zhuānyè."},{"id":"dele-a2b1-07","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Anoche estudié hasta muy tarde.","spanish_cloze":"Anoche ___ hasta muy tarde.","spanish_answer":"estudié","spanish_alternatives":["estudie"],"chinese_simp_full":"我昨晚学习到很晚。","chinese_simp_cloze":"我昨晚___到很晚。","chinese_simp_answer":"学习","chinese_trad_full":"我昨晚學習到很晚。","chinese_trad_cloze":"我昨晚___到很晚。","chinese_trad_answer":"學習","pinyin":"Wǒ zuówǎn xuéxí dào hěn wǎn."},{"id":"dele-a2b1-08","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Si apruebo, me voy de viaje con mis compañeros.","spanish_cloze":"Si ___, me voy de viaje con mis compañeros.","spanish_answer":"apruebo","spanish_alternatives":[],"chinese_simp_full":"如果我考过了，就和同学们去旅行。","chinese_simp_cloze":"如果我___了，就和同学们去旅行。","chinese_simp_answer":"考过","chinese_trad_full":"如果我考過了，就和同學們去旅行。","chinese_trad_cloze":"如果我___了，就和同學們去旅行。","chinese_trad_answer":"考過","pinyin":"Rúguǒ wǒ kǎoguò le, jiù hé tóngxuémen qù lǚxíng."},{"id":"dele-a2b1-09","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Me anoté al club de robótica.","spanish_cloze":"Me ___ al club de robótica.","spanish_answer":"anoté","spanish_alternatives":["anote","inscribí","inscribi"],"chinese_simp_full":"我报名参加了机器人社团。","chinese_simp_cloze":"我___参加了机器人社团。","chinese_simp_answer":"报名","chinese_trad_full":"我報名參加了機器人社團。","chinese_trad_cloze":"我___參加了機器人社團。","chinese_trad_answer":"報名","pinyin":"Wǒ bàomíng cānjiā le jīqìrén shètuán."},{"id":"dele-a2b1-10","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"El profesor nos recomendó esta novela.","spanish_cloze":"El profesor nos ___ esta novela.","spanish_answer":"recomendó","spanish_alternatives":["recomendo","sugirió","sugirio"],"chinese_simp_full":"老师向我们推荐了这本小说。","chinese_simp_cloze":"老师向我们___了这本小说。","chinese_simp_answer":"推荐","chinese_trad_full":"老師向我們推薦了這本小說。","chinese_trad_cloze":"老師向我們___了這本小說。","chinese_trad_answer":"推薦","pinyin":"Lǎoshī xiàng wǒmen tuījiàn le zhè běn xiǎoshuō."},{"id":"dele-a2b1-11","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"No me gusta hacer tareas los domingos.","spanish_cloze":"No me gusta ___ tareas los domingos.","spanish_answer":"hacer","spanish_alternatives":[],"chinese_simp_full":"我不喜欢星期天做作业。","chinese_simp_cloze":"我不喜欢星期天___作业。","chinese_simp_answer":"做","chinese_trad_full":"我不喜歡星期天做作業。","chinese_trad_cloze":"我不喜歡星期天___作業。","chinese_trad_answer":"做","pinyin":"Wǒ bù xǐhuan xīngqītiān zuò zuòyè."},{"id":"dele-a2b1-12","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mi hermanito aprendió a andar en bicicleta.","spanish_cloze":"Mi hermanito ___ a andar en bicicleta.","spanish_answer":"aprendió","spanish_alternatives":["aprendio"],"chinese_simp_full":"我弟弟学会骑自行车了。","chinese_simp_cloze":"我弟弟___会骑自行车了。","chinese_simp_answer":"学","chinese_trad_full":"我弟弟學會騎自行車了。","chinese_trad_cloze":"我弟弟___會騎自行車了。","chinese_trad_answer":"學","pinyin":"Wǒ dìdi xuéhuì qí zìxíngchē le."},{"id":"dele-a2b1-13","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"El año que viene viajamos a China de intercambio.","spanish_cloze":"___ viajamos a China de intercambio.","spanish_answer":"El año que viene","spanish_alternatives":[],"chinese_simp_full":"明年我们去中国交换学习。","chinese_simp_cloze":"___我们去中国交换学习。","chinese_simp_answer":"明年","chinese_trad_full":"明年我們去中國交換學習。","chinese_trad_cloze":"___我們去中國交換學習。","chinese_trad_answer":"明年","pinyin":"Míngnián wǒmen qù Zhōngguó jiāohuàn xuéxí."},{"id":"dele-a2b1-14","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Se me rompió la computadora y perdí el trabajo.","spanish_cloze":"Se me rompió la ___ y perdí el trabajo.","spanish_answer":"computadora","spanish_alternatives":["compu","notebook"],"chinese_simp_full":"我的电脑坏了，文件丢了。","chinese_simp_cloze":"我的___坏了，文件丢了。","chinese_simp_answer":"电脑","chinese_trad_full":"我的電腦壞了，文件丟了。","chinese_trad_cloze":"我的___壞了，文件丟了。","chinese_trad_answer":"電腦","pinyin":"Wǒ de diànnǎo huài le, wénjiàn diū le."},{"id":"dele-a2b1-15","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Los adolescentes duermen muy poco.","spanish_cloze":"Los adolescentes ___ muy poco.","spanish_answer":"duermen","spanish_alternatives":[],"chinese_simp_full":"青少年们睡得很少。","chinese_simp_cloze":"青少年们___得很少。","chinese_simp_answer":"睡","chinese_trad_full":"青少年們睡得很少。","chinese_trad_cloze":"青少年們___得很少。","chinese_trad_answer":"睡","pinyin":"Qīngshàoniánmen shuì de hěn shǎo."},{"id":"dele-a2b1-16","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Estoy preparando el DELE con mi profe.","spanish_cloze":"Estoy ___ el DELE con mi profe.","spanish_answer":"preparando","spanish_alternatives":["estudiando"],"chinese_simp_full":"我正在跟老师准备DELE考试。","chinese_simp_cloze":"我正在跟老师___DELE考试。","chinese_simp_answer":"准备","chinese_trad_full":"我正在跟老師準備DELE考試。","chinese_trad_cloze":"我正在跟老師___DELE考試。","chinese_trad_answer":"準備","pinyin":"Wǒ zhèngzài gēn lǎoshī zhǔnbèi DELE kǎoshì."},{"id":"dele-a2b1-17","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mi mejor amigo se muda a Rosario.","spanish_cloze":"Mi mejor amigo se ___ a Rosario.","spanish_answer":"muda","spanish_alternatives":[],"chinese_simp_full":"我最好的朋友要搬去罗萨里奥。","chinese_simp_cloze":"我最好的朋友要___去罗萨里奥。","chinese_simp_answer":"搬","chinese_trad_full":"我最好的朋友要搬去羅薩里奧。","chinese_trad_cloze":"我最好的朋友要___去羅薩里奧。","chinese_trad_answer":"搬","pinyin":"Wǒ zuì hǎo de péngyou yào bān qù Luósàlǐ'ào."},{"id":"dele-a2b1-18","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Descargué la app para practicar pinyin.","spanish_cloze":"___ la app para practicar pinyin.","spanish_answer":"Descargué","spanish_alternatives":["descargue","bajé","baje"],"chinese_simp_full":"我下载了一个练拼音的应用。","chinese_simp_cloze":"我___了一个练拼音的应用。","chinese_simp_answer":"下载","chinese_trad_full":"我下載了一個練拼音的應用。","chinese_trad_cloze":"我___了一個練拼音的應用。","chinese_trad_answer":"下載","pinyin":"Wǒ xiàzài le yí gè liàn pīnyīn de yìngyòng."},{"id":"dele-a2b1-19","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"En el recreo jugamos a las cartas.","spanish_cloze":"En el recreo ___ a las cartas.","spanish_answer":"jugamos","spanish_alternatives":[],"chinese_simp_full":"课间我们打牌。","chinese_simp_cloze":"课间我们___牌。","chinese_simp_answer":"打","chinese_trad_full":"課間我們打牌。","chinese_trad_cloze":"課間我們___牌。","chinese_trad_answer":"打","pinyin":"Kèjiān wǒmen dǎ pái."},{"id":"dele-a2b1-20","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mis padres me piden ayudar en casa.","spanish_cloze":"Mis padres me piden ___ en casa.","spanish_answer":"ayudar","spanish_alternatives":[],"chinese_simp_full":"我爸妈让我帮忙做家务。","chinese_simp_cloze":"我爸妈让我___做家务。","chinese_simp_answer":"帮忙","chinese_trad_full":"我爸媽讓我幫忙做家務。","chinese_trad_cloze":"我爸媽讓我___做家務。","chinese_trad_answer":"幫忙","pinyin":"Wǒ bàmā ràng wǒ bāngmáng zuò jiāwù."},{"id":"dele-a2b1-21","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"La excursión al museo fue genial.","spanish_cloze":"La excursión al museo fue ___.","spanish_answer":"genial","spanish_alternatives":["increíble","increible","bárbara","barbara"],"chinese_simp_full":"去博物馆的郊游太棒了。","chinese_simp_cloze":"去博物馆的郊游___棒了。","chinese_simp_answer":"太","chinese_trad_full":"去博物館的郊遊太棒了。","chinese_trad_cloze":"去博物館的郊遊___棒了。","chinese_trad_answer":"太","pinyin":"Qù bówùguǎn de jiāoyóu tài bàng le."},{"id":"dele-a2b1-22","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Toco la guitarra desde los ocho años.","spanish_cloze":"___ la guitarra desde los ocho años.","spanish_answer":"Toco","spanish_alternatives":[],"chinese_simp_full":"我八岁起就弹吉他。","chinese_simp_cloze":"我八岁起就___吉他。","chinese_simp_answer":"弹","chinese_trad_full":"我八歲起就彈吉他。","chinese_trad_cloze":"我八歲起就___吉他。","chinese_trad_answer":"彈","pinyin":"Wǒ bā suì qǐ jiù tán jítā."},{"id":"dele-a2b1-23","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Hoy no puedo salir, tengo que estudiar.","spanish_cloze":"Hoy no puedo salir, tengo que ___.","spanish_answer":"estudiar","spanish_alternatives":[],"chinese_simp_full":"今天我不能出去，我得学习。","chinese_simp_cloze":"今天我不能出去，我得___。","chinese_simp_answer":"学习","chinese_trad_full":"今天我不能出去，我得學習。","chinese_trad_cloze":"今天我不能出去，我得___。","chinese_trad_answer":"學習","pinyin":"Jīntiān wǒ bù néng chūqù, wǒ děi xuéxí."},{"id":"dele-a2b1-24","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mis compañeros eligieron el nuevo delegado.","spanish_cloze":"Mis compañeros ___ el nuevo delegado.","spanish_answer":"eligieron","spanish_alternatives":["elegieron","escogieron"],"chinese_simp_full":"同学们选出了新的班长。","chinese_simp_cloze":"同学们___出了新的班长。","chinese_simp_answer":"选","chinese_trad_full":"同學們選出了新的班長。","chinese_trad_cloze":"同學們___出了新的班長。","chinese_trad_answer":"選","pinyin":"Tóngxuémen xuǎn chū le xīn de bānzhǎng."},{"id":"dele-a2b1-25","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Estoy aprendiendo a cocinar pastas.","spanish_cloze":"Estoy ___ a cocinar pastas.","spanish_answer":"aprendiendo","spanish_alternatives":[],"chinese_simp_full":"我正在学做意大利面。","chinese_simp_cloze":"我正在___做意大利面。","chinese_simp_answer":"学","chinese_trad_full":"我正在學做意大利麵。","chinese_trad_cloze":"我正在___做意大利麵。","chinese_trad_answer":"學","pinyin":"Wǒ zhèngzài xué zuò Yìdàlì miàn."},{"id":"dele-a2b1-26","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"El semestre que viene empiezo a entrenar.","spanish_cloze":"El semestre que viene empiezo a ___.","spanish_answer":"entrenar","spanish_alternatives":["hacer ejercicio"],"chinese_simp_full":"下学期我要开始锻炼。","chinese_simp_cloze":"下学期我要开始___。","chinese_simp_answer":"锻炼","chinese_trad_full":"下學期我要開始鍛鍊。","chinese_trad_cloze":"下學期我要開始___。","chinese_trad_answer":"鍛鍊","pinyin":"Xià xuéqī wǒ yào kāishǐ duànliàn."},{"id":"dele-a2b1-27","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Comparto apuntes con mi compañera de clase.","spanish_cloze":"___ apuntes con mi compañera de clase.","spanish_answer":"Comparto","spanish_alternatives":[],"chinese_simp_full":"我和同学分享笔记。","chinese_simp_cloze":"我和同学___笔记。","chinese_simp_answer":"分享","chinese_trad_full":"我和同學分享筆記。","chinese_trad_cloze":"我和同學___筆記。","chinese_trad_answer":"分享","pinyin":"Wǒ hé tóngxué fēnxiǎng bǐjì."},{"id":"dele-a2b1-28","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Mi hermana se recibe de secundaria este año.","spanish_cloze":"Mi hermana se ___ de secundaria este año.","spanish_answer":"recibe","spanish_alternatives":["egresa"],"chinese_simp_full":"我姐姐今年高中毕业。","chinese_simp_cloze":"我姐姐今年高中___。","chinese_simp_answer":"毕业","chinese_trad_full":"我姐姐今年高中畢業。","chinese_trad_cloze":"我姐姐今年高中___。","chinese_trad_answer":"畢業","pinyin":"Wǒ jiějie jīnnián gāozhōng bìyè."},{"id":"dele-a2b1-29","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Hablamos del proyecto con el tutor.","spanish_cloze":"___ del proyecto con el tutor.","spanish_answer":"Hablamos","spanish_alternatives":["trabajo"],"chinese_simp_full":"我们和班主任谈了项目。","chinese_simp_cloze":"我们和班主任___了项目。","chinese_simp_answer":"谈","chinese_trad_full":"我們和班主任談了項目。","chinese_trad_cloze":"我們和班主任___了項目。","chinese_trad_answer":"談","pinyin":"Wǒmen hé bānzhǔrèn tán le xiàngmù."},{"id":"dele-a2b1-30","level":2,"module":"DELE-A2B1-Escolares","spanish_full":"Cuando termine la secundaria, quiero estudiar medicina.","spanish_cloze":"Cuando ___ la secundaria, quiero estudiar medicina.","spanish_answer":"termine","spanish_alternatives":["termino","terminara"],"chinese_simp_full":"我高中毕业后想学医。","chinese_simp_cloze":"我高中___后想学医。","chinese_simp_answer":"毕业","chinese_trad_full":"我高中畢業後想學醫。","chinese_trad_cloze":"我高中___後想學醫。","chinese_trad_answer":"畢業","pinyin":"Wǒ gāozhōng bìyè hòu xiǎng xué yī."}],
'Clasicos-Daxue': [{"level":1,"module":"Clasicos-Daxue","spanish_full":"El camino del Gran Estudio está en iluminar la virtud innata.","spanish_cloze":"El camino del Gran Estudio está en iluminar la ___ innata.","spanish_answer":"virtud","chinese_simp_full":"大学之道，在明明德。","chinese_simp_cloze":"大学之道，在___。","chinese_simp_answer":"明明德","chinese_trad_full":"大學之道，在明明德。","chinese_trad_cloze":"大學之道，在___。","chinese_trad_answer":"明明德","pinyin":"Dàxué zhī dào, zài míngmíngdé.","id":"daxue_01"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Si hoy te renuevas, renuévate cada día, y de nuevo cada día.","spanish_cloze":"Si hoy te ___, renuévate cada día, y de nuevo cada día.","spanish_answer":"renuevas","chinese_simp_full":"苟日新，日日新，又日新。","chinese_simp_cloze":"苟日新，___，又日新。","chinese_simp_answer":"日日新","chinese_trad_full":"苟日新，日日新，又日新。","chinese_trad_cloze":"苟日新，___，又日新。","chinese_trad_answer":"日日新","pinyin":"Gǒu rì xīn, rìrì xīn, yòu rì xīn.","id":"daxue_02"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Quien sabe dónde detenerse alcanza la serenidad.","spanish_cloze":"Quien sabe dónde detenerse alcanza la ___.","spanish_answer":"serenidad","chinese_simp_full":"知止而后有定。","chinese_simp_cloze":"知止而后有___。","chinese_simp_answer":"定","chinese_trad_full":"知止而後有定。","chinese_trad_cloze":"知止而後有___。","chinese_trad_answer":"定","pinyin":"Zhī zhǐ ér hòu yǒu dìng.","spanish_alternatives":["calma"],"id":"daxue_03"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"La virtud es la raíz; la riqueza, las ramas.","spanish_cloze":"La virtud es la ___; la riqueza, las ramas.","spanish_answer":"raíz","chinese_simp_full":"德者本也，财者末也。","chinese_simp_cloze":"德者___也，财者末也。","chinese_simp_answer":"本","chinese_trad_full":"德者本也，財者末也。","chinese_trad_cloze":"德者___也，財者末也。","chinese_trad_answer":"本","pinyin":"Dé zhě běn yě, cái zhě mò yě.","id":"daxue_04"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Las cosas tienen raíz y ramas; los actos, comienzo y fin.","spanish_cloze":"Las cosas tienen ___; los actos, comienzo y fin.","spanish_answer":"raíz y ramas","chinese_simp_full":"物有本末，事有终始。","chinese_simp_cloze":"物有___，事有终始。","chinese_simp_answer":"本末","chinese_trad_full":"物有本末，事有終始。","chinese_trad_cloze":"物有___，事有終始。","chinese_trad_answer":"本末","pinyin":"Wù yǒu běnmò, shì yǒu zhōngshǐ.","id":"daxue_05"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Quien quiere cultivarse, primero endereza su corazón.","spanish_cloze":"Quien quiere cultivarse, primero endereza su ___.","spanish_answer":"corazón","chinese_simp_full":"欲修其身者，先正其心。","chinese_simp_cloze":"欲修其身者，先正其___。","chinese_simp_answer":"心","chinese_trad_full":"欲修其身者，先正其心。","chinese_trad_cloze":"欲修其身者，先正其___。","chinese_trad_answer":"心","pinyin":"Yù xiū qí shēn zhě, xiān zhèng qí xīn.","id":"daxue_06"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"El noble es prudente incluso cuando está solo.","spanish_cloze":"El noble es ___ incluso cuando está solo.","spanish_answer":"prudente","chinese_simp_full":"君子必慎其独也。","chinese_simp_cloze":"君子必___其独也。","chinese_simp_answer":"慎","chinese_trad_full":"君子必慎其獨也。","chinese_trad_cloze":"君子必___其獨也。","chinese_trad_answer":"慎","pinyin":"Jūnzǐ bì shèn qí dú yě.","id":"daxue_07"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"El noble pone la virtud en primer lugar.","spanish_cloze":"El noble pone la ___ en primer lugar.","spanish_answer":"virtud","chinese_simp_full":"君子先慎乎德。","chinese_simp_cloze":"君子先慎乎___。","chinese_simp_answer":"德","chinese_trad_full":"君子先慎乎德。","chinese_trad_cloze":"君子先慎乎___。","chinese_trad_answer":"德","pinyin":"Jūnzǐ xiān shèn hū dé.","id":"daxue_08"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Si una familia es bondadosa, todo el país se vuelve bondadoso.","spanish_cloze":"Si una familia es ___, todo el país se vuelve bondadoso.","spanish_answer":"bondadosa","chinese_simp_full":"一家仁，一国兴仁。","chinese_simp_cloze":"一家___，一国兴仁。","chinese_simp_answer":"仁","chinese_trad_full":"一家仁，一國興仁。","chinese_trad_cloze":"一家___，一國興仁。","chinese_trad_answer":"仁","pinyin":"Yì jiā rén, yí guó xīng rén.","spanish_alternatives":["bondadoso"],"id":"daxue_09"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Si los de arriba honran a sus mayores, el pueblo cultiva el respeto filial.","spanish_cloze":"Si los de arriba honran a sus mayores, el pueblo cultiva el respeto ___.","spanish_answer":"filial","chinese_simp_full":"上老老而民兴孝。","chinese_simp_cloze":"上老老而民兴___。","chinese_simp_answer":"孝","chinese_trad_full":"上老老而民興孝。","chinese_trad_cloze":"上老老而民興___。","chinese_trad_answer":"孝","pinyin":"Shàng lǎo lǎo ér mín xīng xiào.","id":"daxue_10"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"En el trato con la gente, la meta es la confianza.","spanish_cloze":"En el trato con la gente, la meta es la ___.","spanish_answer":"confianza","chinese_simp_full":"与国人交，止于信。","chinese_simp_cloze":"与国人交，止于___。","chinese_simp_answer":"信","chinese_trad_full":"與國人交，止於信。","chinese_trad_cloze":"與國人交，止於___。","chinese_trad_answer":"信","pinyin":"Yǔ guórén jiāo, zhǐ yú xìn.","id":"daxue_11"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Cuando la riqueza se acumula, el pueblo se dispersa; cuando se reparte, se une.","spanish_cloze":"Cuando la riqueza se acumula, el ___ se dispersa; cuando se reparte, se une.","spanish_answer":"pueblo","chinese_simp_full":"财聚则民散，财散则民聚。","chinese_simp_cloze":"财聚则___散，财散则民聚。","chinese_simp_answer":"民","chinese_trad_full":"財聚則民散，財散則民聚。","chinese_trad_cloze":"財聚則___散，財散則民聚。","chinese_trad_answer":"民","pinyin":"Cái jù zé mín sàn, cái sàn zé mín jù.","id":"daxue_12"}],
'Clasicos-Lunyu': [{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Aprender y practicar a tiempo, ¿no es un placer?","spanish_cloze":"Aprender y practicar a tiempo, ¿no es un ___?","spanish_answer":"placer","chinese_simp_full":"学而时习之，不亦说乎？","chinese_simp_cloze":"学而___之，不亦说乎？","chinese_simp_answer":"时习","chinese_trad_full":"學而時習之，不亦說乎？","chinese_trad_cloze":"學而___之，不亦說乎？","chinese_trad_answer":"時習","pinyin":"Xué ér shí xí zhī, bú yì yuè hū?","spanish_alternatives":["practicar"],"id":"lunyu_01"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Que un amigo llegue de lejos, ¿no es una alegría?","spanish_cloze":"Que un ___ llegue de lejos, ¿no es una alegría?","spanish_answer":"amigo","chinese_simp_full":"有朋自远方来，不亦乐乎？","chinese_simp_cloze":"有___自远方来，不亦乐乎？","chinese_simp_answer":"朋","chinese_trad_full":"有朋自遠方來，不亦樂乎？","chinese_trad_cloze":"有___自遠方來，不亦樂乎？","chinese_trad_answer":"朋","pinyin":"Yǒu péng zì yuǎnfāng lái, bú yì lè hū?","id":"lunyu_02"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"No impongas a otros lo que no quieres para ti.","spanish_cloze":"No ___ a otros lo que no quieres para ti.","spanish_answer":"impongas","chinese_simp_full":"己所不欲，勿施于人。","chinese_simp_cloze":"己所不欲，勿___于人。","chinese_simp_answer":"施","chinese_trad_full":"己所不欲，勿施於人。","chinese_trad_cloze":"己所不欲，勿___於人。","chinese_trad_answer":"施","pinyin":"Jǐ suǒ bú yù, wù shī yú rén.","spanish_alternatives":["hagas"],"id":"lunyu_03"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Caminando entre tres, hay siempre un maestro del que aprender.","spanish_cloze":"Caminando entre tres, hay siempre un ___ del que aprender.","spanish_answer":"maestro","chinese_simp_full":"三人行，必有我师焉。","chinese_simp_cloze":"三人行，必有我___焉。","chinese_simp_answer":"师","chinese_trad_full":"三人行，必有我師焉。","chinese_trad_cloze":"三人行，必有我___焉。","chinese_trad_answer":"師","pinyin":"Sān rén xíng, bì yǒu wǒ shī yān.","id":"lunyu_04"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Repasa lo viejo y descubrirás lo nuevo: así podrás enseñar.","spanish_cloze":"Repasa lo viejo y descubrirás lo ___: así podrás enseñar.","spanish_answer":"nuevo","chinese_simp_full":"温故而知新，可以为师矣。","chinese_simp_cloze":"温故而知___，可以为师矣。","chinese_simp_answer":"新","chinese_trad_full":"溫故而知新，可以為師矣。","chinese_trad_cloze":"溫故而知___，可以為師矣。","chinese_trad_answer":"新","pinyin":"Wēn gù ér zhī xīn, kěyǐ wéi shī yǐ.","id":"lunyu_05"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Estudiar sin pensar no sirve; pensar sin estudiar es peligroso.","spanish_cloze":"Estudiar sin pensar no sirve; pensar sin estudiar es ___.","spanish_answer":"peligroso","chinese_simp_full":"学而不思则罔，思而不学则殆。","chinese_simp_cloze":"学而不思则罔，思而不学则___。","chinese_simp_answer":"殆","chinese_trad_full":"學而不思則罔，思而不學則殆。","chinese_trad_cloze":"學而不思則罔，思而不學則___。","chinese_trad_answer":"殆","pinyin":"Xué ér bù sī zé wǎng, sī ér bù xué zé dài.","id":"lunyu_06"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Todo pasa como este río, sin descanso, de noche y de día.","spanish_cloze":"Todo pasa como este río, sin descanso, ___.","spanish_answer":"de noche y de día","chinese_simp_full":"逝者如斯夫，不舍昼夜。","chinese_simp_cloze":"逝者如斯夫，不舍___。","chinese_simp_answer":"昼夜","chinese_trad_full":"逝者如斯夫，不捨晝夜。","chinese_trad_cloze":"逝者如斯夫，不捨___。","chinese_trad_answer":"晝夜","pinyin":"Shì zhě rú sī fú, bù shě zhòuyè.","id":"lunyu_07"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Solo en el frío se ve que el pino y el ciprés resisten.","spanish_cloze":"Solo en el frío se ve que ___ resisten.","spanish_answer":"el pino y el ciprés","chinese_simp_full":"岁寒，然后知松柏之后凋也。","chinese_simp_cloze":"岁寒，然后知___之后凋也。","chinese_simp_answer":"松柏","chinese_trad_full":"歲寒，然後知松柏之後凋也。","chinese_trad_cloze":"歲寒，然後知___之後凋也。","chinese_trad_answer":"松柏","pinyin":"Suì hán, ránhòu zhī sōngbǎi zhī hòu diāo yě.","id":"lunyu_08"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"El listo ama aprender y no se avergüenza de preguntar.","spanish_cloze":"El listo ama aprender y no se avergüenza de ___.","spanish_answer":"preguntar","chinese_simp_full":"敏而好学，不耻下问。","chinese_simp_cloze":"敏而好学，不耻下___。","chinese_simp_answer":"问","chinese_trad_full":"敏而好學，不恥下問。","chinese_trad_cloze":"敏而好學，不恥下___。","chinese_trad_answer":"問","pinyin":"Mǐn ér hào xué, bù chǐ xià wèn.","id":"lunyu_09"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Quien sabe vale menos que quien ama; quien ama, que quien lo disfruta.","spanish_cloze":"Quien sabe vale menos que quien ama; quien ama, que quien lo ___.","spanish_answer":"disfruta","chinese_simp_full":"知之者不如好之者，好之者不如乐之者。","chinese_simp_cloze":"知之者不如好之者，好之者不如___之者。","chinese_simp_answer":"乐","chinese_trad_full":"知之者不如好之者，好之者不如樂之者。","chinese_trad_cloze":"知之者不如好之者，好之者不如___之者。","chinese_trad_answer":"樂","pinyin":"Zhī zhī zhě bùrú hào zhī zhě, hào zhī zhě bùrú lè zhī zhě.","id":"lunyu_10"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"El noble armoniza sin imitar; el mezquino imita sin armonizar.","spanish_cloze":"El noble ___ sin imitar; el mezquino imita sin armonizar.","spanish_answer":"armoniza","chinese_simp_full":"君子和而不同，小人同而不和。","chinese_simp_cloze":"君子___而不同，小人同而不和。","chinese_simp_answer":"和","chinese_trad_full":"君子和而不同，小人同而不和。","chinese_trad_cloze":"君子___而不同，小人同而不和。","chinese_trad_answer":"和","pinyin":"Jūnzǐ hé ér bù tóng, xiǎo rén tóng ér bù hé.","id":"lunyu_11"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Al ver al virtuoso, piensa en igualarlo; al ver al que no, revisa tus faltas.","spanish_cloze":"Al ver al virtuoso, ___; al ver al que no, revisa tus faltas.","spanish_answer":"piensa en igualarlo","chinese_simp_full":"见贤思齐焉，见不贤而内自省也。","chinese_simp_cloze":"见贤___焉，见不贤而内自省也。","chinese_simp_answer":"思齐","chinese_trad_full":"見賢思齊焉，見不賢而內自省也。","chinese_trad_cloze":"見賢___焉，見不賢而內自省也。","chinese_trad_answer":"思齊","pinyin":"Jiàn xián sī qí yān, jiàn bù xián ér nèi zì xǐng yě.","id":"lunyu_12"}],
'Clasicos-Zhongyong': [{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"El equilibrio es la gran raíz del mundo.","spanish_cloze":"El equilibrio es la gran ___ del mundo.","spanish_answer":"raíz","chinese_simp_full":"中也者，天下之大本也。","chinese_simp_cloze":"中也者，天下之大___也。","chinese_simp_answer":"本","chinese_trad_full":"中也者，天下之大本也。","chinese_trad_cloze":"中也者，天下之大___也。","chinese_trad_answer":"本","pinyin":"Zhōng yě zhě, tiānxià zhī dà běn yě.","id":"zhongyong_01"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"La armonía es el camino universal.","spanish_cloze":"La armonía es el ___ universal.","spanish_answer":"camino","chinese_simp_full":"和也者，天下之达道也。","chinese_simp_cloze":"和也者，天下之达___也。","chinese_simp_answer":"道","chinese_trad_full":"和也者，天下之達道也。","chinese_trad_cloze":"和也者，天下之達___也。","chinese_trad_answer":"道","pinyin":"Hé yě zhě, tiānxià zhī dá dào yě.","id":"zhongyong_02"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Todo proyecto prospera con preparación y fracasa sin ella.","spanish_cloze":"Todo proyecto prospera con ___ y fracasa sin ella.","spanish_answer":"preparación","chinese_simp_full":"凡事预则立，不预则废。","chinese_simp_cloze":"凡事___则立，不预则废。","chinese_simp_answer":"预","chinese_trad_full":"凡事預則立，不預則廢。","chinese_trad_cloze":"凡事___則立，不預則廢。","chinese_trad_answer":"預","pinyin":"Fánshì yù zé lì, bú yù zé fèi.","id":"zhongyong_03"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Estudia ampliamente, pregunta con detalle, reflexiona con cuidado, distingue con claridad y actúa con firmeza.","spanish_cloze":"Estudia ampliamente, pregunta con detalle, reflexiona con cuidado, distingue con claridad y actúa con ___.","spanish_answer":"firmeza","chinese_simp_full":"博学之，审问之，慎思之，明辨之，笃行之。","chinese_simp_cloze":"博学之，审问之，慎思之，明辨之，___之。","chinese_simp_answer":"笃行","chinese_trad_full":"博學之，審問之，慎思之，明辨之，篤行之。","chinese_trad_cloze":"博學之，審問之，慎思之，明辨之，___之。","chinese_trad_answer":"篤行","pinyin":"Bó xué zhī, shěnwèn zhī, shènsī zhī, míngbiàn zhī, dǔxíng zhī.","id":"zhongyong_04"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Lo que el Cielo da se llama naturaleza; seguirla es el camino; cultivarlo, la enseñanza.","spanish_cloze":"Lo que el Cielo da se llama naturaleza; seguirla es el camino; cultivarlo, la ___.","spanish_answer":"enseñanza","chinese_simp_full":"天命之谓性，率性之谓道，修道之谓教。","chinese_simp_cloze":"天命之谓性，率性之谓道，修道之谓___。","chinese_simp_answer":"教","chinese_trad_full":"天命之謂性，率性之謂道，修道之謂教。","chinese_trad_cloze":"天命之謂性，率性之謂道，修道之謂___。","chinese_trad_answer":"教","pinyin":"Tiānmìng zhī wèi xìng, shuàixìng zhī wèi dào, xiū dào zhī wèi jiào.","id":"zhongyong_05"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Amar el estudio roza la sabiduría; obrar, la bondad; conocer la vergüenza, el coraje.","spanish_cloze":"Amar el estudio roza la sabiduría; obrar, la bondad; conocer la vergüenza, el ___.","spanish_answer":"coraje","chinese_simp_full":"好学近乎知，力行近乎仁，知耻近乎勇。","chinese_simp_cloze":"好学近乎知，力行近乎仁，知耻近乎___。","chinese_simp_answer":"勇","chinese_trad_full":"好學近乎知，力行近乎仁，知恥近乎勇。","chinese_trad_cloze":"好學近乎知，力行近乎仁，知恥近乎___。","chinese_trad_answer":"勇","pinyin":"Hào xué jìnhū zhī, lìxíng jìnhū rén, zhī chǐ jìnhū yǒng.","spanish_alternatives":["valor"],"id":"zhongyong_06"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"El noble guarda el equilibrio; el mezquino hace lo contrario.","spanish_cloze":"El noble guarda el equilibrio; el mezquino hace lo ___.","spanish_answer":"contrario","chinese_simp_full":"君子中庸，小人反中庸。","chinese_simp_cloze":"君子中庸，小人___中庸。","chinese_simp_answer":"反","chinese_trad_full":"君子中庸，小人反中庸。","chinese_trad_cloze":"君子中庸，小人___中庸。","chinese_trad_answer":"反","pinyin":"Jūnzǐ zhōngyōng, xiǎo rén fǎn zhōngyōng.","id":"zhongyong_07"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"La sinceridad es el camino del Cielo; buscarla, el del hombre.","spanish_cloze":"La sinceridad es el camino del Cielo; ___, el del hombre.","spanish_answer":"buscarla","chinese_simp_full":"诚者，天之道也；诚之者，人之道也。","chinese_simp_cloze":"诚者，天之道也；___，人之道也。","chinese_simp_answer":"诚之者","chinese_trad_full":"誠者，天之道也；誠之者，人之道也。","chinese_trad_cloze":"誠者，天之道也；___，人之道也。","chinese_trad_answer":"誠之者","pinyin":"Chéng zhě, tiān zhī dào yě; chéng zhī zhě, rén zhī dào yě.","id":"zhongyong_08"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"La sinceridad perfecta no descansa nunca.","spanish_cloze":"La sinceridad perfecta no ___ nunca.","spanish_answer":"descansa","chinese_simp_full":"至诚无息。","chinese_simp_cloze":"至诚无___。","chinese_simp_answer":"息","chinese_trad_full":"至誠無息。","chinese_trad_cloze":"至誠無___。","chinese_trad_answer":"息","pinyin":"Zhì chéng wú xī.","id":"zhongyong_09"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Para ir lejos, arranca de cerca; para subir alto, empieza por abajo.","spanish_cloze":"Para ir lejos, arranca ___; para subir alto, empieza por abajo.","spanish_answer":"de cerca","chinese_simp_full":"行远必自迩，登高必自卑。","chinese_simp_cloze":"行远必自___，登高必自卑。","chinese_simp_answer":"迩","chinese_trad_full":"行遠必自邇，登高必自卑。","chinese_trad_cloze":"行遠必自___，登高必自卑。","chinese_trad_answer":"邇","pinyin":"Xíng yuǎn bì zì ěr, dēng gāo bì zì bēi.","id":"zhongyong_10"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Todos los seres crecen juntos sin dañarse.","spanish_cloze":"Todos los seres crecen juntos sin ___.","spanish_answer":"dañarse","chinese_simp_full":"万物并育而不相害。","chinese_simp_cloze":"万物并育而不相___。","chinese_simp_answer":"害","chinese_trad_full":"萬物並育而不相害。","chinese_trad_cloze":"萬物並育而不相___。","chinese_trad_answer":"害","pinyin":"Wànwù bìng yù ér bù xiāng hài.","id":"zhongyong_11"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"El noble obra desde su propio lugar.","spanish_cloze":"El noble obra desde su propio ___.","spanish_answer":"lugar","chinese_simp_full":"君子素其位而行。","chinese_simp_cloze":"君子素其___而行。","chinese_simp_answer":"位","chinese_trad_full":"君子素其位而行。","chinese_trad_cloze":"君子素其___而行。","chinese_trad_answer":"位","pinyin":"Jūnzǐ sù qí wèi ér xíng.","id":"zhongyong_12"}],
'Clasicos-Mengzi': [{"level":1,"module":"Clasicos-Mengzi","spanish_full":"El pueblo es lo más valioso; el gobernante, lo menos.","spanish_cloze":"El pueblo es lo más ___; el gobernante, lo menos.","spanish_answer":"valioso","chinese_simp_full":"民为贵，社稷次之，君为轻。","chinese_simp_cloze":"民为___，社稷次之，君为轻。","chinese_simp_answer":"贵","chinese_trad_full":"民為貴，社稷次之，君為輕。","chinese_trad_cloze":"民為___，社稷次之，君為輕。","chinese_trad_answer":"貴","pinyin":"Mín wéi guì, shèjì cì zhī, jūn wéi qīng.","id":"mengzi_01"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Uno crece en la adversidad y perece en la comodidad.","spanish_cloze":"Uno crece en la ___ y perece en la comodidad.","spanish_answer":"adversidad","chinese_simp_full":"生于忧患，死于安乐。","chinese_simp_cloze":"生于___，死于安乐。","chinese_simp_answer":"忧患","chinese_trad_full":"生於憂患，死於安樂。","chinese_trad_cloze":"生於___，死於安樂。","chinese_trad_answer":"憂患","pinyin":"Shēng yú yōuhuàn, sǐ yú ānlè.","id":"mengzi_02"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Respeta a tus mayores y extiende ese respeto a los de los demás.","spanish_cloze":"Respeta a tus ___ y extiende ese respeto a los de los demás.","spanish_answer":"mayores","chinese_simp_full":"老吾老，以及人之老。","chinese_simp_cloze":"___吾老，以及人之老。","chinese_simp_answer":"老","chinese_trad_full":"老吾老，以及人之老。","chinese_trad_cloze":"___吾老，以及人之老。","chinese_trad_answer":"老","pinyin":"Lǎo wú lǎo, yǐjí rén zhī lǎo.","id":"mengzi_03"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Quien sigue el camino recibe mucha ayuda; quien lo pierde, poca.","spanish_cloze":"Quien sigue el camino recibe mucha ___; quien lo pierde, poca.","spanish_answer":"ayuda","chinese_simp_full":"得道者多助，失道者寡助。","chinese_simp_cloze":"得道者多___，失道者寡助。","chinese_simp_answer":"助","chinese_trad_full":"得道者多助，失道者寡助。","chinese_trad_cloze":"得道者多___，失道者寡助。","chinese_trad_answer":"助","pinyin":"Dé dào zhě duō zhù, shī dào zhě guǎ zhù.","id":"mengzi_04"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"En la adversidad, cuida tu propia virtud; en el éxito, beneficia al mundo.","spanish_cloze":"En la adversidad, cuida ___; en el éxito, beneficia al mundo.","spanish_answer":"tu propia virtud","chinese_simp_full":"穷则独善其身，达则兼善天下。","chinese_simp_cloze":"穷则___，达则兼善天下。","chinese_simp_answer":"独善其身","chinese_trad_full":"窮則獨善其身，達則兼善天下。","chinese_trad_cloze":"窮則___，達則兼善天下。","chinese_trad_answer":"獨善其身","pinyin":"Qióng zé dú shàn qí shēn, dá zé jiān shàn tiānxià.","id":"mengzi_05"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"La riqueza no lo corrompe, la pobreza no lo desvía, el poder no lo doblega.","spanish_cloze":"La riqueza no lo corrompe, la pobreza no lo ___, el poder no lo doblega.","spanish_answer":"desvía","chinese_simp_full":"富贵不能淫，贫贱不能移，威武不能屈。","chinese_simp_cloze":"富贵不能淫，贫贱不能___，威武不能屈。","chinese_simp_answer":"移","chinese_trad_full":"富貴不能淫，貧賤不能移，威武不能屈。","chinese_trad_cloze":"富貴不能淫，貧賤不能___，威武不能屈。","chinese_trad_answer":"移","pinyin":"Fùguì bù néng yín, pínjiàn bù néng yí, wēiwǔ bù néng qū.","id":"mengzi_06"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"El momento vale menos que el terreno; el terreno, menos que la unión de la gente.","spanish_cloze":"El momento vale menos que el terreno; el terreno, menos que la ___.","spanish_answer":"unión de la gente","chinese_simp_full":"天时不如地利，地利不如人和。","chinese_simp_cloze":"天时不如地利，地利不如___。","chinese_simp_answer":"人和","chinese_trad_full":"天時不如地利，地利不如人和。","chinese_trad_cloze":"天時不如地利，地利不如___。","chinese_trad_answer":"人和","pinyin":"Tiānshí bùrú dìlì, dìlì bùrú rén hé.","id":"mengzi_07"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Quien ama a la gente recibe amor; quien respeta, respeto.","spanish_cloze":"___ a la gente recibe amor; quien respeta, respeto.","spanish_answer":"Quien ama","chinese_simp_full":"爱人者，人恒爱之；敬人者，人恒敬之。","chinese_simp_cloze":"___，人恒爱之；敬人者，人恒敬之。","chinese_simp_answer":"爱人者","chinese_trad_full":"愛人者，人恆愛之；敬人者，人恆敬之。","chinese_trad_cloze":"___，人恆愛之；敬人者，人恆敬之。","chinese_trad_answer":"愛人者","pinyin":"Ài rén zhě, rén héng ài zhī; jìng rén zhě, rén héng jìng zhī.","id":"mengzi_08"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Creer todo lo que dicen los libros es peor que no tenerlos.","spanish_cloze":"___ lo que dicen los libros es peor que no tenerlos.","spanish_answer":"Creer todo","chinese_simp_full":"尽信书，则不如无书。","chinese_simp_cloze":"___，则不如无书。","chinese_simp_answer":"尽信书","chinese_trad_full":"盡信書，則不如無書。","chinese_trad_cloze":"___，則不如無書。","chinese_trad_answer":"盡信書","pinyin":"Jìn xìn shū, zé bùrú wú shū.","id":"mengzi_09"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"La compasión es la semilla de la bondad.","spanish_cloze":"La compasión es la ___ de la bondad.","spanish_answer":"semilla","chinese_simp_full":"恻隐之心，仁之端也。","chinese_simp_cloze":"恻隐之心，仁之___也。","chinese_simp_answer":"端","chinese_trad_full":"惻隱之心，仁之端也。","chinese_trad_cloze":"惻隱之心，仁之___也。","chinese_trad_answer":"端","pinyin":"Cèyǐn zhī xīn, rén zhī duān yě.","id":"mengzi_10"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Sin reglas no hay cuadrado ni círculo: sin normas no hay orden.","spanish_cloze":"Sin ___ no hay cuadrado ni círculo: sin normas no hay orden.","spanish_answer":"reglas","chinese_simp_full":"不以规矩，不能成方圆。","chinese_simp_cloze":"不以___，不能成方圆。","chinese_simp_answer":"规矩","chinese_trad_full":"不以規矩，不能成方圓。","chinese_trad_cloze":"不以___，不能成方圓。","chinese_trad_answer":"規矩","pinyin":"Bù yǐ guījǔ, bù néng chéng fāngyuán.","id":"mengzi_11"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Cuando el Cielo encarga una gran misión, primero fortalece la voluntad.","spanish_cloze":"Cuando el Cielo encarga una gran misión, primero fortalece la ___.","spanish_answer":"voluntad","chinese_simp_full":"天将降大任于是人也，必先苦其心志。","chinese_simp_cloze":"天将降大任于是人也，必先苦其___。","chinese_simp_answer":"心志","chinese_trad_full":"天將降大任於是人也，必先苦其心志。","chinese_trad_cloze":"天將降大任於是人也，必先苦其___。","chinese_trad_answer":"心志","pinyin":"Tiān jiāng jiàng dà rèn yú shì rén yě, bì xiān kǔ qí xīnzhì.","id":"mengzi_12"}],
'Clasicos-Sanzijing': [{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"El ser humano nace con la bondad natural.","spanish_cloze":"El ser humano nace con la ___ natural.","spanish_answer":"bondad","chinese_simp_full":"人之初，性本善。","chinese_simp_cloze":"人之初，性本___。","chinese_simp_answer":"善","chinese_trad_full":"人之初，性本善。","chinese_trad_cloze":"人之初，性本___。","chinese_trad_answer":"善","pinyin":"Rén zhī chū, xìng běn shàn.","id":"sanzijing_01"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Por naturaleza nos parecemos; la costumbre nos aleja.","spanish_cloze":"Por naturaleza nos parecemos; la ___ nos aleja.","spanish_answer":"costumbre","chinese_simp_full":"性相近，习相远。","chinese_simp_cloze":"性相近，___相远。","chinese_simp_answer":"习","chinese_trad_full":"性相近，習相遠。","chinese_trad_cloze":"性相近，___相遠。","chinese_trad_answer":"習","pinyin":"Xìng xiāng jìn, xí xiāng yuǎn.","id":"sanzijing_02"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"El jade sin tallar no se vuelve tesoro.","spanish_cloze":"El jade sin ___ no se vuelve tesoro.","spanish_answer":"tallar","chinese_simp_full":"玉不琢，不成器。","chinese_simp_cloze":"玉不___，不成器。","chinese_simp_answer":"琢","chinese_trad_full":"玉不琢，不成器。","chinese_trad_cloze":"玉不___，不成器。","chinese_trad_answer":"琢","pinyin":"Yù bù zhuó, bù chéng qì.","id":"sanzijing_03"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"La constancia trae logros; la distracción, nada.","spanish_cloze":"La ___ trae logros; la distracción, nada.","spanish_answer":"constancia","chinese_simp_full":"勤有功，戏无益。","chinese_simp_cloze":"___有功，戏无益。","chinese_simp_answer":"勤","chinese_trad_full":"勤有功，戲無益。","chinese_trad_cloze":"___有功，戲無益。","chinese_trad_answer":"勤","pinyin":"Qín yǒu gōng, xì wú yì.","spanish_alternatives":["esmero"],"id":"sanzijing_04"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Criar sin educar es falta del padre.","spanish_cloze":"Criar sin ___ es falta del padre.","spanish_answer":"educar","chinese_simp_full":"养不教，父之过。","chinese_simp_cloze":"养不___，父之过。","chinese_simp_answer":"教","chinese_trad_full":"養不教，父之過。","chinese_trad_cloze":"養不___，父之過。","chinese_trad_answer":"教","pinyin":"Yǎng bú jiào, fù zhī guò.","id":"sanzijing_05"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Enseñar sin exigir es flojedad del maestro.","spanish_cloze":"Enseñar sin exigir es flojedad del ___.","spanish_answer":"maestro","chinese_simp_full":"教不严，师之惰。","chinese_simp_cloze":"教不严，___之惰。","chinese_simp_answer":"师","chinese_trad_full":"教不嚴，師之惰。","chinese_trad_cloze":"教不嚴，___之惰。","chinese_trad_answer":"師","pinyin":"Jiào bù yán, shī zhī duò.","spanish_alternatives":["profe"],"id":"sanzijing_06"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Si el hijo no estudia, no está bien.","spanish_cloze":"Si el hijo no ___, no está bien.","spanish_answer":"estudia","chinese_simp_full":"子不学，非所宜。","chinese_simp_cloze":"子不___，非所宜。","chinese_simp_answer":"学","chinese_trad_full":"子不學，非所宜。","chinese_trad_cloze":"子不___，非所宜。","chinese_trad_answer":"學","pinyin":"Zǐ bù xué, fēi suǒ yí.","id":"sanzijing_07"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Si de chico no estudias, ¿qué serás de grande?","spanish_cloze":"Si ___ no estudias, ¿qué serás de grande?","spanish_answer":"de chico","chinese_simp_full":"幼不学，老何为。","chinese_simp_cloze":"___不学，老何为。","chinese_simp_answer":"幼","chinese_trad_full":"幼不學，老何為。","chinese_trad_cloze":"___不學，老何為。","chinese_trad_answer":"幼","pinyin":"Yòu bù xué, lǎo hé wéi.","id":"sanzijing_08"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"A sus nueve años, Xiang ya calentaba la cama de su padre.","spanish_cloze":"A sus ___, Xiang ya calentaba la cama de su padre.","spanish_answer":"nueve años","chinese_simp_full":"香九龄，能温席。","chinese_simp_cloze":"香___，能温席。","chinese_simp_answer":"九龄","chinese_trad_full":"香九齡，能溫席。","chinese_trad_cloze":"香___，能溫席。","chinese_trad_answer":"九齡","pinyin":"Xiāng jiǔ líng, néng wēn xí.","id":"sanzijing_09"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"A los cuatro años, Rong ya cedía la pera más grande.","spanish_cloze":"A los cuatro años, Rong ya cedía la ___ más grande.","spanish_answer":"pera","chinese_simp_full":"融四岁，能让梨。","chinese_simp_cloze":"融四岁，能让___。","chinese_simp_answer":"梨","chinese_trad_full":"融四歲，能讓梨。","chinese_trad_cloze":"融四歲，能讓___。","chinese_trad_answer":"梨","pinyin":"Róng sì suì, néng ràng lí.","id":"sanzijing_10"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Las tres fuerzas: cielo, tierra y persona.","spanish_cloze":"Las tres fuerzas: ___.","spanish_answer":"cielo, tierra y persona","chinese_simp_full":"三才者，天地人。","chinese_simp_cloze":"三才者，___。","chinese_simp_answer":"天地人","chinese_trad_full":"三才者，天地人。","chinese_trad_cloze":"三才者，___。","chinese_trad_answer":"天地人","pinyin":"Sān cái zhě, tiān dì rén.","id":"sanzijing_11"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Bondad, justicia, cortesía, sabiduría y fe: las cinco virtudes.","spanish_cloze":"Bondad, justicia, ___: las cinco virtudes.","spanish_answer":"cortesía, sabiduría y fe","chinese_simp_full":"曰仁义，礼智信。","chinese_simp_cloze":"曰仁义，___。","chinese_simp_answer":"礼智信","chinese_trad_full":"曰仁義，禮智信。","chinese_trad_cloze":"曰仁義，___。","chinese_trad_answer":"禮智信","pinyin":"Yuē rén yì, lǐ zhì xìn.","id":"sanzijing_12"}],
'Clasicos-Xiaojing': [{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Entre las cien virtudes, la piedad filial va primero.","spanish_cloze":"Entre las cien virtudes, la ___ va primero.","spanish_answer":"piedad filial","chinese_simp_full":"百善孝为先。","chinese_simp_cloze":"百善___为先。","chinese_simp_answer":"孝","chinese_trad_full":"百善孝為先。","chinese_trad_cloze":"百善___為先。","chinese_trad_answer":"孝","pinyin":"Bǎi shàn xiào wéi xiān.","id":"xiaojing_01"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Nuestro cuerpo y nuestra piel vienen de nuestros padres.","spanish_cloze":"Nuestro cuerpo y nuestra piel vienen de nuestros ___.","spanish_answer":"padres","chinese_simp_full":"身体发肤，受之父母。","chinese_simp_cloze":"身体发肤，受之___。","chinese_simp_answer":"父母","chinese_trad_full":"身體髮膚，受之父母。","chinese_trad_cloze":"身體髮膚，受之___。","chinese_trad_answer":"父母","pinyin":"Shēntǐ fàfū, shòu zhī fùmǔ.","id":"xiaojing_02"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Quien ama a su familia no desprecia a nadie.","spanish_cloze":"Quien ___ a su familia no desprecia a nadie.","spanish_answer":"ama","chinese_simp_full":"爱亲者，不敢恶于人。","chinese_simp_cloze":"___亲者，不敢恶于人。","chinese_simp_answer":"爱","chinese_trad_full":"愛親者，不敢惡於人。","chinese_trad_cloze":"___親者，不敢惡於人。","chinese_trad_answer":"愛","pinyin":"Ài qīn zhě, bù gǎn wù yú rén.","id":"xiaojing_03"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"El respeto filial es la raíz de la virtud.","spanish_cloze":"El respeto filial es la ___ de la virtud.","spanish_answer":"raíz","chinese_simp_full":"孝，德之本也。","chinese_simp_cloze":"孝，德之___也。","chinese_simp_answer":"本","chinese_trad_full":"孝，德之本也。","chinese_trad_cloze":"孝，德之___也。","chinese_trad_answer":"本","pinyin":"Xiào, dé zhī běn yě.","id":"xiaojing_04"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Los antiguos reyes tuvieron la virtud suprema para armonizar el mundo.","spanish_cloze":"Los antiguos reyes tuvieron la ___ para armonizar el mundo.","spanish_answer":"virtud suprema","chinese_simp_full":"先王有至德要道，以顺天下。","chinese_simp_cloze":"先王有___要道，以顺天下。","chinese_simp_answer":"至德","chinese_trad_full":"先王有至德要道，以順天下。","chinese_trad_cloze":"先王有___要道，以順天下。","chinese_trad_answer":"至德","pinyin":"Xiānwáng yǒu zhì dé yào dào, yǐ shùn tiānxià.","id":"xiaojing_05"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Para enseñar el cariño entre la gente, nada mejor que la piedad filial.","spanish_cloze":"Para enseñar el cariño entre la gente, nada mejor que la ___.","spanish_answer":"piedad filial","chinese_simp_full":"教民亲爱，莫善于孝。","chinese_simp_cloze":"教民亲爱，莫善于___。","chinese_simp_answer":"孝","chinese_trad_full":"教民親愛，莫善於孝。","chinese_trad_cloze":"教民親愛，莫善於___。","chinese_trad_answer":"孝","pinyin":"Jiào mín qīn'ài, mò shàn yú xiào.","id":"xiaojing_06"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"La piedad filial es la norma del Cielo y el sentido de la Tierra.","spanish_cloze":"La piedad filial es la ___ del Cielo y el sentido de la Tierra.","spanish_answer":"norma","chinese_simp_full":"夫孝，天之经也，地之义也。","chinese_simp_cloze":"夫孝，天之___也，地之义也。","chinese_simp_answer":"经","chinese_trad_full":"夫孝，天之經也，地之義也。","chinese_trad_cloze":"夫孝，天之___也，地之義也。","chinese_trad_answer":"經","pinyin":"Fú xiào, tiān zhī jīng yě, dì zhī yì yě.","id":"xiaojing_07"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Cuídate y gasta con mesura para sostener a tus padres.","spanish_cloze":"Cuídate y ___ para sostener a tus padres.","spanish_answer":"gasta con mesura","chinese_simp_full":"谨身节用，以养父母。","chinese_simp_cloze":"谨身___，以养父母。","chinese_simp_answer":"节用","chinese_trad_full":"謹身節用，以養父母。","chinese_trad_cloze":"謹身___，以養父母。","chinese_trad_answer":"節用","pinyin":"Jǐn shēn jié yòng, yǐ yǎng fùmǔ.","id":"xiaojing_08"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Ningún defecto es más grave que faltar a los padres.","spanish_cloze":"Ningún defecto es más grave que ___.","spanish_answer":"faltar a los padres","chinese_simp_full":"罪莫大于不孝。","chinese_simp_cloze":"罪莫大于___。","chinese_simp_answer":"不孝","chinese_trad_full":"罪莫大於不孝。","chinese_trad_cloze":"罪莫大於___。","chinese_trad_answer":"不孝","pinyin":"Zuì mò dà yú bú xiào.","id":"xiaojing_09"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Quien honra a sus padres no desatiende a nadie.","spanish_cloze":"Quien honra a sus padres no ___ a nadie.","spanish_answer":"desatiende","chinese_simp_full":"敬亲者，不敢慢于人。","chinese_simp_cloze":"敬亲者，不敢___于人。","chinese_simp_answer":"慢","chinese_trad_full":"敬親者，不敢慢於人。","chinese_trad_cloze":"敬親者，不敢___於人。","chinese_trad_answer":"慢","pinyin":"Jìng qīn zhě, bù gǎn màn yú rén.","id":"xiaojing_10"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Para dar orden a la gente, nada mejor que la cortesía.","spanish_cloze":"Para dar orden a la gente, nada mejor que la ___.","spanish_answer":"cortesía","chinese_simp_full":"安上治民，莫善于礼。","chinese_simp_cloze":"安上治民，莫善于___。","chinese_simp_answer":"礼","chinese_trad_full":"安上治民，莫善於禮。","chinese_trad_cloze":"安上治民，莫善於___。","chinese_trad_answer":"禮","pinyin":"Ān shàng zhì mín, mò shàn yú lǐ.","id":"xiaojing_11"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Para cambiar las costumbres, nada mejor que la música.","spanish_cloze":"Para cambiar las costumbres, nada mejor que la ___.","spanish_answer":"música","chinese_simp_full":"移风易俗，莫善于乐。","chinese_simp_cloze":"移风易俗，莫善于___。","chinese_simp_answer":"乐","chinese_trad_full":"移風易俗，莫善於樂。","chinese_trad_cloze":"移風易俗，莫善於___。","chinese_trad_answer":"樂","pinyin":"Yí fēng yì sú, mò shàn yú yuè.","id":"xiaojing_12"}],
'Clasicos-Daodejing': [{"level":1,"module":"Clasicos-Daodejing","spanish_full":"El camino que puede decirse no es el Camino eterno.","spanish_cloze":"El ___ que puede decirse no es el Camino eterno.","spanish_answer":"camino","chinese_simp_full":"道可道，非常道。","chinese_simp_cloze":"___可道，非常道。","chinese_simp_answer":"道","chinese_trad_full":"道可道，非常道。","chinese_trad_cloze":"___可道，非常道。","chinese_trad_answer":"道","pinyin":"Dào kě dào, fēi cháng dào.","id":"daodejing_01","spanish_alternatives":["Camino"]},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"La bondad suprema es como el agua.","spanish_cloze":"La bondad suprema es como el ___.","spanish_answer":"agua","chinese_simp_full":"上善若水。","chinese_simp_cloze":"上善若___。","chinese_simp_answer":"水","chinese_trad_full":"上善若水。","chinese_trad_cloze":"上善若___。","chinese_trad_answer":"水","pinyin":"Shàng shàn ruò shuǐ.","id":"daodejing_02"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Un viaje de mil kilómetros empieza bajo tus pies.","spanish_cloze":"Un viaje de mil kilómetros empieza bajo tus ___.","spanish_answer":"pies","chinese_simp_full":"千里之行，始于足下。","chinese_simp_cloze":"千里之行，始于___。","chinese_simp_answer":"足下","chinese_trad_full":"千里之行，始於足下。","chinese_trad_cloze":"千里之行，始於___。","chinese_trad_answer":"足下","pinyin":"Qiānlǐ zhī xíng, shǐ yú zúxià.","id":"daodejing_03"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Conocer a otros es sabiduría; conocerse, claridad.","spanish_cloze":"Conocer a otros es ___; conocerse, claridad.","spanish_answer":"sabiduría","chinese_simp_full":"知人者智，自知者明。","chinese_simp_cloze":"知人者___，自知者明。","chinese_simp_answer":"智","chinese_trad_full":"知人者智，自知者明。","chinese_trad_cloze":"知人者___，自知者明。","chinese_trad_answer":"智","pinyin":"Zhī rén zhě zhì, zì zhī zhě míng.","id":"daodejing_04"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"El hombre sigue a la tierra, la tierra al cielo, el cielo al camino, y el camino a la naturaleza.","spanish_cloze":"El hombre sigue a la tierra, la tierra al cielo, el cielo al camino, y el camino a la ___.","spanish_answer":"naturaleza","chinese_simp_full":"人法地，地法天，天法道，道法自然。","chinese_simp_cloze":"人法地，地法天，天法道，道法___。","chinese_simp_answer":"自然","chinese_trad_full":"人法地，地法天，天法道，道法自然。","chinese_trad_cloze":"人法地，地法天，天法道，道法___。","chinese_trad_answer":"自然","pinyin":"Rén fǎ dì, dì fǎ tiān, tiān fǎ dào, dào fǎ zìrán.","id":"daodejing_05"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Quien se conforma no se humilla; quien sabe parar no corre peligro.","spanish_cloze":"Quien se ___ no se humilla; quien sabe parar no corre peligro.","spanish_answer":"conforma","chinese_simp_full":"知足不辱，知止不殆。","chinese_simp_cloze":"___不辱，知止不殆。","chinese_simp_answer":"知足","chinese_trad_full":"知足不辱，知止不殆。","chinese_trad_cloze":"___不辱，知止不殆。","chinese_trad_answer":"知足","pinyin":"Zhī zú bù rǔ, zhī zhǐ bù dài.","id":"daodejing_06"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Las grandes obras maduran tarde.","spanish_cloze":"Las grandes obras maduran ___.","spanish_answer":"tarde","chinese_simp_full":"大器晚成。","chinese_simp_cloze":"大器___。","chinese_simp_answer":"晚成","chinese_trad_full":"大器晚成。","chinese_trad_cloze":"大器___。","chinese_trad_answer":"晚成","pinyin":"Dà qì wǎn chéng.","id":"daodejing_07"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"El gran sonido es casi silencio; la gran imagen no tiene forma.","spanish_cloze":"El gran sonido es casi silencio; la gran imagen ___.","spanish_answer":"no tiene forma","chinese_simp_full":"大音希声，大象无形。","chinese_simp_cloze":"大音希声，大象___。","chinese_simp_answer":"无形","chinese_trad_full":"大音希聲，大象無形。","chinese_trad_cloze":"大音希聲，大象___。","chinese_trad_answer":"無形","pinyin":"Dà yīn xī shēng, dà xiàng wú xíng.","id":"daodejing_08"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"En la desgracia anida la fortuna; en la fortuna, la desgracia.","spanish_cloze":"En la ___ anida la fortuna; en la fortuna, la desgracia.","spanish_answer":"desgracia","chinese_simp_full":"祸兮福所倚，福兮祸所伏。","chinese_simp_cloze":"___兮福所倚，福兮祸所伏。","chinese_simp_answer":"祸","chinese_trad_full":"禍兮福所倚，福兮禍所伏。","chinese_trad_cloze":"___兮福所倚，福兮禍所伏。","chinese_trad_answer":"禍","pinyin":"Huò xī fú suǒ yǐ, fú xī huò suǒ fú.","id":"daodejing_09"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Gobernar un gran país es como freír un pescado chico.","spanish_cloze":"Gobernar un gran país es como ___ un pescado chico.","spanish_answer":"freír","chinese_simp_full":"治大国若烹小鲜。","chinese_simp_cloze":"治大国若___小鲜。","chinese_simp_answer":"烹","chinese_trad_full":"治大國若烹小鮮。","chinese_trad_cloze":"治大國若___小鮮。","chinese_trad_answer":"烹","pinyin":"Zhì dà guó ruò pēng xiǎo xiān.","id":"daodejing_10"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"El árbol que abrazan dos brazos nace de un brote mínimo.","spanish_cloze":"El árbol que abrazan dos brazos nace de un ___ mínimo.","spanish_answer":"brote","chinese_simp_full":"合抱之木，生于毫末。","chinese_simp_cloze":"合抱之木，生于___。","chinese_simp_answer":"毫末","chinese_trad_full":"合抱之木，生於毫末。","chinese_trad_cloze":"合抱之木，生於___。","chinese_trad_answer":"毫末","pinyin":"Hébào zhī mù, shēng yú háomò.","id":"daodejing_11"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"El estudio suma cada día; el camino, resta.","spanish_cloze":"El estudio suma cada día; el camino, ___.","spanish_answer":"resta","chinese_simp_full":"为学日益，为道日损。","chinese_simp_cloze":"为学日益，为道日___。","chinese_simp_answer":"损","chinese_trad_full":"為學日益，為道日損。","chinese_trad_cloze":"為學日益，為道日___。","chinese_trad_answer":"損","pinyin":"Wéi xué rì yì, wéi dào rì sǔn.","id":"daodejing_12"}],
'Clasicos-Xinjing': [{"level":1,"module":"Clasicos-Xinjing","spanish_full":"La forma es vacío; el vacío es forma.","spanish_cloze":"La forma es ___; el vacío es forma.","spanish_answer":"vacío","chinese_simp_full":"色即是空，空即是色。","chinese_simp_cloze":"色即是___，空即是色。","chinese_simp_answer":"空","chinese_trad_full":"色即是空，空即是色。","chinese_trad_cloze":"色即是___，空即是色。","chinese_trad_answer":"空","pinyin":"Sè jí shì kōng, kōng jí shì sè.","id":"xinjing_01"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"La mente sin ataduras.","spanish_cloze":"La mente sin ___.","spanish_answer":"ataduras","chinese_simp_full":"心无挂碍。","chinese_simp_cloze":"心无___。","chinese_simp_answer":"挂碍","chinese_trad_full":"心無掛礙。","chinese_trad_cloze":"心無___。","chinese_trad_answer":"掛礙","pinyin":"Xīn wú guà'ài.","id":"xinjing_02"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Iluminó que los cinco agregados son vacíos.","spanish_cloze":"Iluminó que los ___ son vacíos.","spanish_answer":"cinco agregados","chinese_simp_full":"照见五蕴皆空。","chinese_simp_cloze":"照见___皆空。","chinese_simp_answer":"五蕴","chinese_trad_full":"照見五蘊皆空。","chinese_trad_cloze":"照見___皆空。","chinese_trad_answer":"五蘊","pinyin":"Zhàojiàn wǔyùn jiē kōng.","id":"xinjing_03"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Libera de todo sufrimiento.","spanish_cloze":"Libera de todo ___.","spanish_answer":"sufrimiento","chinese_simp_full":"度一切苦厄。","chinese_simp_cloze":"度一切___。","chinese_simp_answer":"苦厄","chinese_trad_full":"度一切苦厄。","chinese_trad_cloze":"度一切___。","chinese_trad_answer":"苦厄","pinyin":"Dù yíqiè kǔ'è.","spanish_alternatives":["dolor"],"id":"xinjing_04"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"No nace ni muere, no se ensucia ni se limpia, no crece ni mengua.","spanish_cloze":"No nace ni muere, no se ensucia ni se limpia, no ___.","spanish_answer":"crece ni mengua","chinese_simp_full":"不生不灭，不垢不净，不增不减。","chinese_simp_cloze":"不生不灭，不垢不净，___。","chinese_simp_answer":"不增不减","chinese_trad_full":"不生不滅，不垢不淨，不增不減。","chinese_trad_cloze":"不生不滅，不垢不淨，___。","chinese_trad_answer":"不增不減","pinyin":"Bù shēng bù miè, bú gòu bú jìng, bù zēng bù jiǎn.","id":"xinjing_05"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Todas las cosas tienen naturaleza vacía.","spanish_cloze":"Todas las cosas tienen ___.","spanish_answer":"naturaleza vacía","chinese_simp_full":"是诸法空相。","chinese_simp_cloze":"是诸法___。","chinese_simp_answer":"空相","chinese_trad_full":"是諸法空相。","chinese_trad_cloze":"是諸法___。","chinese_trad_answer":"空相","pinyin":"Shì zhū fǎ kōng xiàng.","id":"xinjing_06"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"No hay ojo, oído, nariz, lengua, cuerpo ni mente.","spanish_cloze":"No hay ___.","spanish_answer":"ojo, oído, nariz, lengua, cuerpo ni mente","chinese_simp_full":"无眼耳鼻舌身意。","chinese_simp_cloze":"无___。","chinese_simp_answer":"眼耳鼻舌身意","chinese_trad_full":"無眼耳鼻舌身意。","chinese_trad_cloze":"無___。","chinese_trad_answer":"眼耳鼻舌身意","pinyin":"Wú yǎn ěr bí shé shēn yì.","id":"xinjing_07"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"No hay forma, sonido, olor, gusto, tacto ni idea.","spanish_cloze":"No hay ___.","spanish_answer":"forma, sonido, olor, gusto, tacto ni idea","chinese_simp_full":"无色声香味触法。","chinese_simp_cloze":"无___。","chinese_simp_answer":"色声香味触法","chinese_trad_full":"無色聲香味觸法。","chinese_trad_cloze":"無___。","chinese_trad_answer":"色聲香味觸法","pinyin":"Wú sè shēng xiāng wèi chù fǎ.","id":"xinjing_08"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Lejos de toda ilusión, llega al nirvana pleno.","spanish_cloze":"Lejos de toda ilusión, llega al ___ pleno.","spanish_answer":"nirvana","chinese_simp_full":"远离颠倒梦想，究竟涅槃。","chinese_simp_cloze":"远离颠倒梦想，究竟___。","chinese_simp_answer":"涅槃","chinese_trad_full":"遠離顛倒夢想，究竟涅槃。","chinese_trad_cloze":"遠離顛倒夢想，究竟___。","chinese_trad_answer":"涅槃","pinyin":"Yuǎnlí diāndǎo mèngxiǎng, jiūjìng nièpán.","id":"xinjing_09"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Ni sabiduría que ganar, ni nada que obtener.","spanish_cloze":"Ni sabiduría que ganar, ni nada que ___.","spanish_answer":"obtener","chinese_simp_full":"无智亦无得。","chinese_simp_cloze":"无智亦无___。","chinese_simp_answer":"得","chinese_trad_full":"無智亦無得。","chinese_trad_cloze":"無智亦無___。","chinese_trad_answer":"得","pinyin":"Wú zhì yì wú dé.","id":"xinjing_10"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"No hay sufrimiento, origen, cese ni camino.","spanish_cloze":"No hay ___, origen, cese ni camino.","spanish_answer":"sufrimiento","chinese_simp_full":"无苦集灭道。","chinese_simp_cloze":"无___集灭道。","chinese_simp_answer":"苦","chinese_trad_full":"無苦集滅道。","chinese_trad_cloze":"無___集滅道。","chinese_trad_answer":"苦","pinyin":"Wú kǔ jí miè dào.","id":"xinjing_11"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Aleja todo sufrimiento: es verdad, no es vano.","spanish_cloze":"Aleja todo sufrimiento: es verdad, no es ___.","spanish_answer":"vano","chinese_simp_full":"能除一切苦，真实不虚。","chinese_simp_cloze":"能除一切苦，真实不___。","chinese_simp_answer":"虚","chinese_trad_full":"能除一切苦，真實不虛。","chinese_trad_cloze":"能除一切苦，真實不___。","chinese_trad_answer":"虛","pinyin":"Néng chú yíqiè kǔ, zhēnshí bù xū.","id":"xinjing_12"}],
'Clasicos-Jingangjing': [{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Cultiva la mente sin aferrarse a nada.","spanish_cloze":"Cultiva la ___ sin aferrarse a nada.","spanish_answer":"mente","chinese_simp_full":"应无所住而生其心。","chinese_simp_cloze":"应无所住而生其___。","chinese_simp_answer":"心","chinese_trad_full":"應無所住而生其心。","chinese_trad_cloze":"應無所住而生其___。","chinese_trad_answer":"心","pinyin":"Yīng wú suǒ zhù ér shēng qí xīn.","id":"jingangjing_01"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Todo lo que aparece es ilusión.","spanish_cloze":"Todo lo que aparece es ___.","spanish_answer":"ilusión","chinese_simp_full":"凡所有相，皆是虚妄。","chinese_simp_cloze":"凡所有相，皆是___。","chinese_simp_answer":"虚妄","chinese_trad_full":"凡所有相，皆是虛妄。","chinese_trad_cloze":"凡所有相，皆是___。","chinese_trad_answer":"虛妄","pinyin":"Fán suǒ yǒu xiàng, jiē shì xūwàng.","id":"jingangjing_02"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Como el rocío y el relámpago: así hay que verlo.","spanish_cloze":"Como el rocío y el ___: así hay que verlo.","spanish_answer":"relámpago","chinese_simp_full":"如露亦如电，应作如是观。","chinese_simp_cloze":"如露亦如___，应作如是观。","chinese_simp_answer":"电","chinese_trad_full":"如露亦如電，應作如是觀。","chinese_trad_cloze":"如露亦如___，應作如是觀。","chinese_trad_answer":"電","pinyin":"Rú lù yì rú diàn, yīng zuò rúshì guān.","id":"jingangjing_03"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Hasta las enseñanzas hay que soltar, y más lo demás.","spanish_cloze":"Hasta las enseñanzas hay que ___, y más lo demás.","spanish_answer":"soltar","chinese_simp_full":"法尚应舍，何况非法。","chinese_simp_cloze":"法尚应___，何况非法。","chinese_simp_answer":"舍","chinese_trad_full":"法尚應舍，何況非法。","chinese_trad_cloze":"法尚應___，何況非法。","chinese_trad_answer":"舍","pinyin":"Fǎ shàng yīng shě, hékuàng fēifǎ.","spanish_alternatives":["dejar ir"],"id":"jingangjing_04"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Todo lo condicionado es como sueño, ilusión, burbuja y sombra.","spanish_cloze":"Todo lo condicionado es como ___, ilusión, burbuja y sombra.","spanish_answer":"sueño","chinese_simp_full":"一切有为法，如梦幻泡影。","chinese_simp_cloze":"一切有为法，如___幻泡影。","chinese_simp_answer":"梦","chinese_trad_full":"一切有為法，如夢幻泡影。","chinese_trad_cloze":"一切有為法，如___幻泡影。","chinese_trad_answer":"夢","pinyin":"Yíqiè yǒuwéi fǎ, rú mèng huàn pào yǐng.","spanish_alternatives":["sueño, ilusión"],"id":"jingangjing_05"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"La mente de ayer no se puede atrapar.","spanish_cloze":"La mente de ayer no se puede ___.","spanish_answer":"atrapar","chinese_simp_full":"过去心不可得。","chinese_simp_cloze":"过去心不可___。","chinese_simp_answer":"得","chinese_trad_full":"過去心不可得。","chinese_trad_cloze":"過去心不可___。","chinese_trad_answer":"得","pinyin":"Guòqù xīn bù kě dé.","id":"jingangjing_06"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Apartarse de toda apariencia: eso es ser Buda.","spanish_cloze":"Apartarse de toda ___: eso es ser Buda.","spanish_answer":"apariencia","chinese_simp_full":"离一切诸相，则名诸佛。","chinese_simp_cloze":"离一切诸___，则名诸佛。","chinese_simp_answer":"相","chinese_trad_full":"離一切諸相，則名諸佛。","chinese_trad_cloze":"離一切諸___，則名諸佛。","chinese_trad_answer":"相","pinyin":"Lí yíqiè zhū xiàng, zé míng zhū fó.","id":"jingangjing_07"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Sin aferrarse a las apariencias, el corazón ni se mueve.","spanish_cloze":"Sin aferrarse a las apariencias, el corazón ___.","spanish_answer":"ni se mueve","chinese_simp_full":"不取于相，如如不动。","chinese_simp_cloze":"不取于相，如如___。","chinese_simp_answer":"不动","chinese_trad_full":"不取於相，如如不動。","chinese_trad_cloze":"不取於相，如如___。","chinese_trad_answer":"不動","pinyin":"Bù qǔ yú xiàng, rú rú bù dòng.","id":"jingangjing_08"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"No hay una enseñanza única que el Buda pueda explicar.","spanish_cloze":"No hay una enseñanza ___ que el Buda pueda explicar.","spanish_answer":"única","chinese_simp_full":"无有定法，如来可说。","chinese_simp_cloze":"无有___，如来可说。","chinese_simp_answer":"定法","chinese_trad_full":"無有定法，如來可說。","chinese_trad_cloze":"無有___，如來可說。","chinese_trad_answer":"定法","pinyin":"Wú yǒu dìng fǎ, Rúlái kě shuō.","id":"jingangjing_09"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Ver la nada de las apariencias es ver al Buda.","spanish_cloze":"Ver ___ es ver al Buda.","spanish_answer":"la nada de las apariencias","chinese_simp_full":"若见诸相非相，即见如来。","chinese_simp_cloze":"若见诸相___，即见如来。","chinese_simp_answer":"非相","chinese_trad_full":"若見諸相非相，即見如來。","chinese_trad_cloze":"若見諸相___，即見如來。","chinese_trad_answer":"非相","pinyin":"Ruò jiàn zhū xiàng fēi xiàng, jí jiàn Rúlái.","id":"jingangjing_10"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"El mundo que el Buda nombra no es el mundo: solo se llama mundo.","spanish_cloze":"El ___ que el Buda nombra no es el mundo: solo se llama mundo.","spanish_answer":"mundo","chinese_simp_full":"佛说世界，即非世界，是名世界。","chinese_simp_cloze":"佛说___，即非世界，是名世界。","chinese_simp_answer":"世界","chinese_trad_full":"佛說世界，即非世界，是名世界。","chinese_trad_cloze":"佛說___，即非世界，是名世界。","chinese_trad_answer":"世界","pinyin":"Fó shuō shìjiè, jí fēi shìjiè, shì míng shìjiè.","id":"jingangjing_11"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"No viene de ningún lado ni va a ninguno: por eso se llama Así-Venido.","spanish_cloze":"No viene de ningún lado ni va a ninguno: por eso se llama ___.","spanish_answer":"Así-Venido","chinese_simp_full":"无所从来，亦无所去，故名如来。","chinese_simp_cloze":"无所从来，亦无所去，故名___。","chinese_simp_answer":"如来","chinese_trad_full":"無所從來，亦無所去，故名如來。","chinese_trad_cloze":"無所從來，亦無所去，故名___。","chinese_trad_answer":"如來","pinyin":"Wú suǒ cóng lái, yì wú suǒ qù, gù míng Rúlái.","id":"jingangjing_12"}]
};
EMBEDDED_MODULE_DATA['Saludos'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['Migraciones'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['Supermercado'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En un restaurante'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En el colectivo'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En el subterráneo'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En la clase de idioma'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En el shopping'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En el cine'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['En el gimnasio'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['Barrio chino'] = EMBEDDED_MODULE_DATA['todas'];
// ===== FIN DATOS INCLUIDOS =====

// ===== v7.19 — HSK 3.0: expansión del vocabulario embebido =====
// Los 9 niveles HSK viajan como TUPLAS compactas [simp, trad|null, pinyin, español, alts|null]
// (11.092 palabras del estándar GF0025-2021) para mantener liviano app.js.
// expandWordCards() las convierte en tarjetas completas (w:1 = tarjeta de palabra)
// al cargar el módulo y memoiza el resultado: el costo de expansión se paga una vez.
const _wordCache = {};
// v8.3: claves TOCFL-Prep/A1/A2 comparten el formato de tuplas HSK 3.0.
// Band A completa al 100% con la lista oficial vigente (華語八千詞表, tocfl.edu.tw
// 8000zhuyin_202307): 392 (Novice 1+2) + 344 (入門級) + 483 (基礎級) = 1.219 palabras,
// en orden oficial de ID, con homógrafos POS-distintos por nivel (还 huán/hái,
// 长 zhǎng/cháng, 只 zhī/zhǐ, 上·下 verbos, 花 gastar, 等 etc.).
// nivel numérico informativo (Prep=0, A1=1, A2=2); la insignia de la tarjeta
// usa TOCFL_INFO (ver renderCard), no este número.
const TOCFL_MODULE_LEVEL = { 'TOCFL-Prep': 0, 'TOCFL-A1': 1, 'TOCFL-A2': 2 };
function expandWordCards(key, rows) {
    if (_wordCache[key]) return _wordCache[key];
    const isTocfl = key.indexOf('TOCFL-') === 0;
    const lv = isTocfl ? key.slice(6) : key.replace('HSK', '');
    const levelNum = isTocfl ? (TOCFL_MODULE_LEVEL[key] || 0) : Number(lv);
    _wordCache[key] = rows.map((r, i) => {
        const h = r[0], t = r[1] || h, py = r[2], es = r[3], alts = r[4] || null;
        return {
            id: (isTocfl ? 'tw' + lv : 'h3w' + lv) + '_' + (i + 1),
            level: levelNum,
            module: key,
            w: 1, // tarjeta de palabra (HSK 3.0 / TOCFL v8.2): el motor la muestra como traducción directa
            chinese_simp_full: h, chinese_simp_cloze: h, chinese_simp_answer: h,
            chinese_trad_full: t, chinese_trad_cloze: t, chinese_trad_answer: t,
            spanish_full: es, spanish_cloze: es, spanish_answer: es,
            pinyin: py,
            spanish_alternatives: alts
        };
    });
    return _wordCache[key];
}

// ===== Constantes =====
const STORAGE_KEY = 'chino-espanol-app-v2';

const DATA_SOURCES = {
    'todas': 'data/sentences.json',
    'Saludos': 'data/sentences.json',
    'Migraciones': 'data/sentences.json',
    'Supermercado': 'data/sentences.json',
    'En un restaurante': 'data/daily/restaurante.json',
    'En el colectivo': 'data/daily/colectivo.json',
    'En el subterráneo': 'data/daily/subterraneo.json',
    'En la clase de idioma': 'data/daily/clase-idioma.json',
    'En el shopping': 'data/daily/shopping.json',
    'En el cine': 'data/daily/cine.json',
    'En el gimnasio': 'data/daily/gimnasio.json',
    'Barrio chino': 'data/daily/barrio-chino.json',
    'HSK1': 'data/exams/hsk1.json',
    'HSK2': 'data/exams/hsk2.json',
    'HSK3': 'data/exams/hsk3.json',
    'HSK4': 'data/exams/hsk4.json',
    'HSK5': 'data/exams/hsk5.json',
    'HSK6': 'data/exams/hsk6.json',
    'HSK7': 'data/hsk30/hsk7.json', // v7.19: HSK 3.0 — fallback solo; el contenido real viaja embebido
    'HSK8': 'data/hsk30/hsk8.json',
    'HSK9': 'data/hsk30/hsk9.json',
    // v8.2: TOCFL Band A — fallback solo; el vocabulario real viaja embebido
    'TOCFL-Prep': 'data/tocfl/tocfl_prep.json',
    'TOCFL-A1': 'data/tocfl/tocfl_a1.json',
    'TOCFL-A2': 'data/tocfl/tocfl_a2.json',
    'TOCFL': 'data/exams/tocfl.json',
    'DELE-A1-Escolares': 'data/exams/dele-a1-escolares.json',
    'DELE-A2B1-Escolares': 'data/exams/dele-a2b1-escolares.json',
    'Clasicos-Daxue': 'data/classics/daxue.json',
    'Clasicos-Lunyu': 'data/classics/lunyu.json',
    'Clasicos-Zhongyong': 'data/classics/zhongyong.json',
    'Clasicos-Mengzi': 'data/classics/mengzi.json',
    'Clasicos-Sanzijing': 'data/classics/sanzijing.json',
    'Clasicos-Xiaojing': 'data/classics/xiaojing.json',
    'Clasicos-Daodejing': 'data/classics/daodejing.json',
    'Clasicos-Xinjing': 'data/classics/xinjing.json',
    'Clasicos-Jingangjing': 'data/classics/jingangjing.json'
};

const MODULE_LABELS = {
    'todas': 'Práctica diaria (todas)',
    'Saludos': 'Saludos',
    'Migraciones': 'Migraciones',
    'Supermercado': 'Supermercado',
    'En un restaurante': 'En un restaurante',
    'En el colectivo': 'En el colectivo',
    'En el subterráneo': 'En el subterráneo',
    'En la clase de idioma': 'En la clase de idioma',
    'En el shopping': 'En el shopping',
    'En el cine': 'En el cine',
    'En el gimnasio': 'En el gimnasio',
    'Barrio chino': 'Barrio chino',
    'HSK1': 'HSK 1',
    'HSK2': 'HSK 2',
    'HSK3': 'HSK 3',
    'HSK4': 'HSK 4',
    'HSK5': 'HSK 5',
    'HSK6': 'HSK 6',
    'HSK7': 'HSK 7',
    'HSK8': 'HSK 8',
    'HSK9': 'HSK 9',
    // v8.3: TOCFL Band A — lista oficial vigente (華語八千詞表 2023, tocfl.edu.tw)
    'TOCFL-Prep': 'TOCFL · Preparación (Novice)',
    'TOCFL-A1': 'TOCFL · Nivel 1 (入門)',
    'TOCFL-A2': 'TOCFL · Nivel 2 (基礎)',
    'TOCFL': 'TOCFL',
    'DELE-A1-Escolares': 'DELE A1 · Escolares',
    'DELE-A2B1-Escolares': 'DELE A2/B1 · Escolares',
    'Clasicos-Daxue': 'Gran Estudio 大学',
    'Clasicos-Lunyu': 'Analectas 论语',
    'Clasicos-Zhongyong': 'Doctrina del Medio 中庸',
    'Clasicos-Mengzi': 'Mencio 孟子',
    'Clasicos-Sanzijing': 'Tres Caracteres 三字经',
    'Clasicos-Xiaojing': 'Piedad Filial 孝经',
    'Clasicos-Daodejing': 'Tao Te King 道德经',
    'Clasicos-Xinjing': 'Sutra del Corazón 心经',
    'Clasicos-Jingangjing': 'Sutra del Diamante 金刚经'
};

// Módulos diarios (filtran el lote de práctica) y módulos clásicos
const DAILY_MODULES = ['todas', 'Saludos', 'Migraciones', 'Supermercado',
    'En un restaurante', 'En el colectivo', 'En el subterráneo',
    'En la clase de idioma', 'En el shopping', 'En el cine',
    'En el gimnasio', 'Barrio chino'];
const CLASSICS_MODULES = ['Clasicos-Daxue', 'Clasicos-Lunyu', 'Clasicos-Zhongyong',
    'Clasicos-Mengzi', 'Clasicos-Sanzijing', 'Clasicos-Xiaojing',
    'Clasicos-Daodejing', 'Clasicos-Xinjing', 'Clasicos-Jingangjing'];

// Datos de los 9 clásicos para el dropdown: nombres en simplificado (zh) y
// tradicional (zhT) — el switch 简/繁 los actualiza en vivo (v7.0)
const CLASSICS_INFO = {
    'Clasicos-Daxue':       { zh: '大学',   zhT: '大學',   py: 'Dàxué',       es: 'Gran Estudio' },
    'Clasicos-Lunyu':       { zh: '论语',   zhT: '論語',   py: 'Lúnyǔ',       es: 'Analectas' },
    'Clasicos-Zhongyong':   { zh: '中庸',   zhT: '中庸',   py: 'Zhōngyōng',   es: 'Doctrina del Medio' },
    'Clasicos-Mengzi':      { zh: '孟子',   zhT: '孟子',   py: 'Mèngzǐ',      es: 'Mencio' },
    'Clasicos-Sanzijing':   { zh: '三字经', zhT: '三字經', py: 'Sānzìjīng',   es: 'Tres Caracteres' },
    'Clasicos-Xiaojing':    { zh: '孝经',   zhT: '孝經',   py: 'Xiàojīng',    es: 'Piedad Filial' },
    'Clasicos-Daodejing':   { zh: '道德经', zhT: '道德經', py: 'Dàodéjīng',   es: 'Tao Te King' },
    'Clasicos-Xinjing':     { zh: '心经',   zhT: '心經',   py: 'Xīnjīng',     es: 'Sutra del Corazón' },
    'Clasicos-Jingangjing': { zh: '金刚经', zhT: '金剛經', py: 'Jīngāngjīng', es: 'Sutra del Diamante' }
};

// Info de los exámenes DELE para el dropdown (v7.4): badge del botón
// (DELE · A1 Escolares) y de la insignia de la tarjeta (🇪🇸 DELE A1).
// Los exámenes para adultos se agregarán a DELE_INFO cuando lleguen.
const DELE_INFO = {
    'DELE-A1-Escolares':   { badge: 'A1' },
    'DELE-A2B1-Escolares': { badge: 'A2/B1' }
};

// v8.2: badge de la insignia de tarjeta para los módulos de vocabulario TOCFL
// (['🇹🇼 TOCFL N1 · vocabulario']). Los niveles Band B/C llegarán cuando la
// data esté lista (mismo dropdown, sección "próximamente").
const TOCFL_INFO = {
    'TOCFL-Prep': { badge: 'Prep' },
    'TOCFL-A1':   { badge: 'N1' },
    'TOCFL-A2':   { badge: 'N2' }
};

// Etiqueta visible de un módulo (los clásicos muestran nombre ES + zh según el script activo)
function moduleLabel(mod) {
    const info = CLASSICS_INFO[mod];
    if (info) return info.es + ' ' + (ck() === 'trad' ? info.zhT : info.zh);
    return MODULE_LABELS[mod] || mod;
}

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
    answered: false,
    filledAnswer: null,  // v7.2: 'correct' | 'wrong' | 'reveal' → el hueco se muestra completo
    // v7.11: esquema de colores de tono + leyenda
    toneScheme: 'standard',   // 'standard' | 'colorblind' | 'custom'
    toneCustomColors: null,   // {'1':'#hex',...,'5':'#hex'} — 5 = neutro
    toneLegendSeen: false,    // la leyenda ya se mostró al activar tonos
    // v7.13: contexto guardado al marcar una palabra → wordContexts[palabra] =
    // { zh: oración simplificada, zt: oración tradicional, es: oración española,
    //   py: pinyin de la PALABRA }. Se muestra en el popup ("tu ejemplo").
    wordContexts: {}
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
            showToneColors: showToneColors, // Guardar estado de colores
            // v7.11: esquema de tonos
            toneScheme: state.toneScheme,
            toneCustomColors: state.toneCustomColors,
            toneLegendSeen: state.toneLegendSeen,
            // v7.13: contexto de las palabras marcadas
            wordContexts: state.wordContexts
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* silencioso */ }
}

// v9.0: canonicalización trad→simp para los guardados viejos. Hasta v8.3 las
// ORACIONES guardaban la respuesta en el guion activo: quien estudió con 繁
// tiene 謝謝/時間/哪裡 en "Palabras aprendidas" en vez de 谢谢/时间/哪里. El mapa
// se construye de los datos embebidos (todo trad guardado salió de acá).
let _trad2simp = null;
function canonicalHanzi(w) {
    if (!_trad2simp) {
        _trad2simp = {};
        try {
            for (const key in EMBEDDED_MODULE_DATA) {
                const rows = EMBEDDED_MODULE_DATA[key];
                if (!Array.isArray(rows)) continue;
                for (const s of rows) {
                    if (Array.isArray(s)) {
                        if (s[1] && s[1] !== s[0]) _trad2simp[s[1]] = s[0];
                    } else if (s && s.chinese_trad_answer && s.chinese_simp_answer &&
                               s.chinese_trad_answer !== s.chinese_simp_answer) {
                        _trad2simp[s.chinese_trad_answer] = s.chinese_simp_answer;
                    }
                }
            }
        } catch (e) { /* silencioso */ }
    }
    return _trad2simp[w] || w;
}
function canonicalizeWordSet(set) {
    const out = new Set();
    set.forEach(w => out.add(canonicalHanzi(w)));
    return out;
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        // v9.0: al cargar, los guardados legacy se canonicalizan a simplificado
        if (data.knownWords) state.knownWords = canonicalizeWordSet(new Set(data.knownWords));
        if (data.newWords) state.newWords = canonicalizeWordSet(new Set(data.newWords));
        if (typeof data.score === 'number') state.score = data.score;
        if (data.mode) state.mode = data.mode;
        if (data.charType) state.charType = data.charType;
        if (typeof data.currentIndex === 'number') state.currentIndex = data.currentIndex;
        if (data.activeModule) state.activeModule = data.activeModule;
        if (data.showPinyin !== undefined) state.showPinyin = data.showPinyin;
        if (data.showToneColors !== undefined) showToneColors = data.showToneColors;
        // v7.11: esquema de tonos (validado — localStorage puede venir viejo o trucado)
        if (['standard', 'colorblind', 'custom'].indexOf(data.toneScheme) !== -1) {
            state.toneScheme = data.toneScheme;
        }
        if (data.toneCustomColors && typeof data.toneCustomColors === 'object') {
            const clean = {};
            for (let n = 1; n <= 5; n++) {
                const v = data.toneCustomColors[String(n)];
                if (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) clean[String(n)] = v;
            }
            if (Object.keys(clean).length) state.toneCustomColors = clean;
        }
        if (data.toneLegendSeen !== undefined) state.toneLegendSeen = !!data.toneLegendSeen;
        // v7.13: contextos guardados (validados — localStorage puede venir viejo)
        if (data.wordContexts && typeof data.wordContexts === 'object') {
            const clean = {};
            for (const k in data.wordContexts) {
                const c = data.wordContexts[k];
                if (k && c && typeof c === 'object') {
                    clean[k] = {
                        zh: typeof c.zh === 'string' ? c.zh : '',
                        zt: typeof c.zt === 'string' ? c.zt : '',
                        es: typeof c.es === 'string' ? c.es : '',
                        py: typeof c.py === 'string' ? c.py : ''
                    };
                }
            }
            state.wordContexts = clean;
        }
    } catch (e) { /* silencioso */ }
}

// v7.13: guarda el CONTEXTO de las palabras marcadas (la oración actual).
// Compatibilidad hacia atrás: palabras viejas sin contexto → el popup las
// muestra sin ejemplo, sin romperse. Tope de 600 entradas (borra las viejas).
const WORD_CTX_MAX = 600;
function rememberWordContext(words, s) {
    if (!words || !words.length || !s) return;
    const zhS = String(s.chinese_simp_full || '');
    const zhT = String(s.chinese_trad_full || zhS);
    const esS = String(s.spanish_full || '');
    let changed = false;
    (Array.isArray(words) ? words : [words]).forEach(w => {
        if (!w) return;
        const cur = state.wordContexts[w];
        if (cur && cur.zh === zhS && cur.zt === zhT && cur.es === esS) return; // ya está
        state.wordContexts[w] = {
            zh: zhS,
            zt: zhT,
            es: esS,
            py: isZhText(w) ? (wordPinyin(w) || (cur ? cur.py : '')) : ''
        };
        changed = true;
    });
    if (changed) {
        const keys = Object.keys(state.wordContexts);
        if (keys.length > WORD_CTX_MAX) {
            keys.slice(0, keys.length - WORD_CTX_MAX).forEach(k => delete state.wordContexts[k]);
        }
        saveProgress();
    }
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
    applyToneScheme(); // v7.11: restaurar esquema de tonos guardado (respeta dark ya aplicado)
    await loadSentences();
    setupEventListeners();
    buildReaderLibrary(); // v7.15: poblar la Biblioteca de Lecturas (lessons.js)
    applySavedUI();
    // v7.8 (spec v4.0): sincronizar el MODO con el evaluador de voz lo
    // antes posible. No bloquea el render: si tarda, la evaluación de
    // voz espera la transición antes de analizar (VE._setModePromise).
    if (window.VE && typeof window.VE.setMode === 'function') {
        window.VE.setMode(state.mode).catch((e) =>
            console.warn('[app] VE.setMode inicial falló:', (e && e.message) || e));
    }
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
    // Actualizar botones diarios, de exámenes Y clásicos
    const cats = document.querySelectorAll('.cat-btn, .btn-exam');
    cats.forEach(b => {
        b.classList.toggle('active', b.dataset.module === state.activeModule);
    });
    updateDailyBtnLabel();
    updateClassicsBtnLabel();
    updateDeleBtnLabel();
    updateTocflBtnLabel(); // v8.2
    updateClassicsScript();

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
    const label = moduleLabel(state.activeModule);
    moduleStatus('⏳ Cargando ' + label + '...');
    let data = null;
    // 1) Datos incluidos en la app: funcionan sin carpeta data/, sin red y offline
    if (typeof EMBEDDED_MODULE_DATA !== 'undefined' && EMBEDDED_MODULE_DATA[state.activeModule]) {
        let included = EMBEDDED_MODULE_DATA[state.activeModule];
        // v7.19: HSK 3.0 viaja como tuplas compactas → expandir a tarjetas (memoizado)
        if (included.length && Array.isArray(included[0])) {
            included = expandWordCards(state.activeModule, included);
        }
        data = included;
        // v8.2: los módulos de vocabulario TOCFL también cuentan en palabras
        const isWordModule = state.activeModule.startsWith('HSK') || state.activeModule.startsWith('TOCFL-');
        const unit = isWordModule ? 'palabras' : 'oraciones';
        console.log('✅ ' + data.length + ' ' + unit + ' cargadas (datos incluidos en la app)');
    } else {
        // 2) Respaldo: archivo externo data/ (solo si el módulo no viene incluido, ej. HSK6)
        try {
            const sourceFile = DATA_SOURCES[state.activeModule] || DATA_SOURCES['todas'];
            const r = await fetch(sourceFile);
            if (r.ok) {
                const d = await r.json();
                data = Array.isArray(d) ? d : (d.sentences || []);
                console.log('✅ ' + data.length + ' oraciones cargadas desde: ' + sourceFile);
            }
        } catch (e) { console.warn('⚠️ Sin datos externos para ' + label + ':', e.message); }
    }
    state.sentences = Array.isArray(data) ? data : [];
    indexSentencesForVocab(state.sentences); // amplía el diccionario de traducciones
    if (state.sentences.length) {
        // v8.2: los módulos de vocabulario TOCFL también cuentan en palabras
        const isWordModule = state.activeModule.startsWith('HSK') || state.activeModule.startsWith('TOCFL-');
        const unit = isWordModule ? 'palabras' : 'oraciones';
        moduleStatus('📚 ' + label + ' · ' + state.sentences.length + ' ' + unit + ' disponibles');
    } else if (state.activeModule === 'HSK6') {
        moduleStatus('⚠ El módulo ' + label + ' todavía no tiene oraciones.', true);
    } else {
        moduleStatus('⚠ El módulo ' + label + ' no tiene oraciones.', true);
    }
}

// ===== Eventos =====
// v7.18: TABS de selectores de contenido — un solo panel visible, tab activo
// persistido. Solo mueve clases 'hidden'/'active': los dropdowns internos
// (daily/dele/classics) siguen usando su propia lógica y setModule() intactos.
function setupModuleTabs() {
    const bar = document.getElementById('module-tabs');
    if (!bar) return;
    // v9.0: + panel-lessons (Lecciones graduadas)
    const panels = { daily: 'panel-daily', exams: 'panel-exams', lessons: 'panel-lessons', classics: 'panel-classics' };
    const TAB_KEY = 'ac_tab';
    const activate = (name, save) => {
        if (!panels[name]) name = 'daily';
        bar.querySelectorAll('.mtab').forEach(b => {
            const on = b.dataset.tab === name;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        Object.keys(panels).forEach(k => {
            const p = document.getElementById(panels[k]);
            if (p) p.classList.toggle('hidden', k !== name);
        });
        if (save) { try { localStorage.setItem(TAB_KEY, name); } catch (e) {} }
    };
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('.mtab');
        if (b) activate(b.dataset.tab, true);
    });
    let saved = null;
    try { saved = localStorage.getItem(TAB_KEY); } catch (e) {}
    activate(saved || 'daily', false);
}

function setupEventListeners() {
    // Función auxiliar para evitar errores si falta algún botón
    const safeAdd = (id, callback) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', callback);
    };

    // v7.18: tabs de módulos (Diaria / Exámenes / Clásicos)
    setupModuleTabs();

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
    safeAdd('btn-read-lesson', readCurrentLesson); // v7.14: leer lección completa
    safeAdd('btn-library-load', loadLibraryLesson); // v7.15: Biblioteca de Lecturas
    safeAdd('btn-reset', resetProgress);
    safeAdd('btn-pinyin', togglePinyin);
    safeAdd('btn-tones', toggleToneColors);

    // ── v7.11: leyenda de tonos + esquema de colores ──
    safeAdd('btn-tone-info', showToneLegend);
    safeAdd('btn-tone-legend-close', hideToneLegend);
    // Cambio de esquema (radios estáticos → listener directo con 'change')
    document.querySelectorAll('input[name="tone-scheme"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.toneScheme = e.target.value;
            const customDiv = document.getElementById('tone-custom-colors');
            if (customDiv) customDiv.classList.toggle('hidden', state.toneScheme !== 'custom');
            if (state.toneScheme === 'custom' && !state.toneCustomColors) {
                // Sembrar el custom con el look actual (TONE_CUSTOM_DEFAULT)
                state.toneCustomColors = {};
                for (let n = 1; n <= 5; n++) {
                    state.toneCustomColors[String(n)] = TONE_CUSTOM_DEFAULT[String(n)];
                    const inp = document.getElementById('tc-' + n);
                    if (inp) inp.value = TONE_CUSTOM_DEFAULT[String(n)];
                }
            }
            applyToneScheme();
            saveProgress();
        });
    });
    // Colores personalizados: SOLO 'input' (actualización en vivo).
    // ⚠ No usar safeAdd (click) acá: dispararía doble con 'input'.
    for (let n = 1; n <= 5; n++) {
        const inp = document.getElementById('tc-' + n);
        if (inp) inp.addEventListener('input', (e) => {
            if (!state.toneCustomColors) state.toneCustomColors = {};
            state.toneCustomColors[String(n)] = e.target.value;
            applyToneScheme();
            saveProgress();
        });
    }
    // "No mostrar esta leyenda al activar los tonos"
    const chkLegend = document.getElementById('chk-tone-legend-once');
    if (chkLegend) chkLegend.addEventListener('change', (e) => {
        state.toneLegendSeen = !!e.target.checked;
        saveProgress();
    });
    // Clic fuera cierra el popup (mismo patrón que #vocab-pop). Los botones
    // que lo ABREN (🎨 Tonos y ℹ️) no deben cerrarlo con el mismo clic, y
    // 🌙 tema tampoco: sirven para previsualizar el esquema en ambos modos.
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('tone-legend-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        if (pop.contains(e.target)) return;
        if (e.target.closest && (e.target.closest('#btn-tones') || e.target.closest('#btn-tone-info') || e.target.closest('#btn-theme'))) return;
        hideToneLegend();
    });
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
    // v7.9: toque en palabra del lector → popup de vocabulario.
    // DELEGADO en #reader-preview (sobrevive a cada re-render del innerHTML).
    const readerPrev = document.getElementById('reader-preview');
    if (readerPrev) {
        readerPrev.addEventListener('click', (e) => {
            const w = e.target.closest('.reader-word');
            if (w && w.dataset.word) showVocabPop(w.dataset.word);
        });
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
    // v7.13: botones ▶ Animar / ✍ Practicar de la sección de trazos.
    // DELEGADO en #vocab-pop (el body del popup se re-renderiza en cada
    // apertura → los botones nuevos no necesitan listeners propios).
    const vocabPopEl = document.getElementById('vocab-pop');
    if (vocabPopEl) {
        vocabPopEl.addEventListener('click', (e) => {
            if (e.target.closest && e.target.closest('.vp-stroke-anim')) { vpStrokesAnimate(); return; }
            // v7.16: ✍ Practicar ya NO traza en los cuadros chicos del popup
            // (frustrante con el dedo) → cierra la consulta y abre el banner
            // de práctica grande con los caracteres de la palabra tocada.
            if (e.target.closest && e.target.closest('.vp-stroke-quiz')) {
                const vpBody = document.getElementById('vocab-pop-body');
                const word = vpBody && vpBody.dataset ? vpBody.dataset.word : '';
                openWriterPractice(word || '');
            }
        });
    }
    // v7.13: Escape cierra el popup de vocabulario y la leyenda de tonos
    // (los popups ya se cerraban con ✕ y clic fuera; teclado incluido).
    // v7.16: primero el banner de práctica (está siempre encima).
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const wpb = document.getElementById('writer-practice-banner');
        if (wpb && !wpb.classList.contains('hidden')) { closeWriterPractice(); return; }
        const tl = document.getElementById('tone-legend-pop');
        if (tl && !tl.classList.contains('hidden')) { hideToneLegend(); return; }
        hideVocabPop();
    });
    // v7.16: botones del banner de práctica (HTML estático → safeAdd sirve)
    safeAdd('btn-wp-close', closeWriterPractice);
    safeAdd('btn-wp-animate', () => {
        if (!wpPractice.writer) return;
        try { wpPractice.writer.cancelQuiz(); } catch (e) {}
        wpSetHint('▶ Mirá el orden de los trazos…');
        wpPractice.writer.animateCharacter().catch(() => {});
    });
    safeAdd('btn-wp-quiz', () => wpStartQuiz());
    safeAdd('btn-wp-prev', () => wpNavStep(-1));
    safeAdd('btn-wp-next', () => wpNavStep(1));
    // v7.16: rotación/redimensionado con el banner abierto → remonta el
    // lienzo al tamaño nuevo (debounce; solo si hay writer activo).
    window.addEventListener('resize', () => {
        const wpb = document.getElementById('writer-practice-banner');
        if (!wpb || wpb.classList.contains('hidden') || !wpPractice.writer) return;
        clearTimeout(wpPractice.resizeT);
        wpPractice.resizeT = setTimeout(() => wpShowChar({}), 250);
    });
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('vocab-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        if (pop.contains(e.target)) return;
        // v7.9: los .reader-word del lector ABREN el popup — ese mismo clic
        // no debe cerrarlo (igual que las chips .vocab-item del cajón)
        if (e.target.closest && (e.target.closest('.vocab-item') || e.target.closest('.reader-word'))) return;
        hideVocabPop();
    });
    
    // Audio
    safeAdd('btn-play-es', () => playAudio('es'));
    safeAdd('btn-play-cn', () => playAudio('cn'));
    
    // Filtros y Selects
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(btn => {
        btn.addEventListener('click', () => setModule(btn.dataset.module));
    });
    // (Los clásicos van por dropdown: sus ítems .cat-btn ya quedaron conectados arriba)
    initDailyDropdown();
    initClassicsDropdown();
    initDeleDropdown();
    initTocflDropdown(); // v8.2

    const hskSelect = document.getElementById('select-hsk-level');
    if (hskSelect) {
        hskSelect.addEventListener('change', (e) => setModule(e.target.value));
    }
}

// ===== Funciones de Estado =====
// v7.8 (spec v4.0 §4/§5): el cambio de modo es ASÍNCRONO. El evaluador
// de voz (window.VE) aborta la evaluación en curso y hace
// await pitchAnalyzer.dispose() ANTES de que mutemos state.mode (la
// Promise de dispose SIEMPRE resuelve — timeout 2 s — así que el
// cambio nunca se bloquea). Modo inválido → console.error y NO cambia.
async function setMode(mode) {
    if (mode !== 'es-cn' && mode !== 'cn-es') {
        console.error('[app] state.mode inválido: "' + mode +
                      '" — debe ser exactamente "es-cn" o "cn-es" (spec v4.0 §5)');
        return;
    }
    if (window.VE && typeof window.VE.setMode === 'function') {
        try { await window.VE.setMode(mode); }
        catch (e) {
            console.warn('[app] VE.setMode falló, no se cambia el modo:', (e && e.message) || e);
            return;
        }
    }
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
    updateClassicsScript();   // nombres de clásicos en 简/繁
    updateClassicsBtnLabel();
    renderCurrentSentence();
    // v9.2: hook para módulos nuevos (lector de clásicos) que siguen el guion
    try { document.dispatchEvent(new CustomEvent('ac-script-change')); } catch (e) { }
}

function setModule(mod) {
    state.activeModule = mod;
    state.currentIndex = 0;
    state.translationRevealed = false;
    
    document.querySelectorAll('.cat-btn, .btn-exam').forEach(b => {
        b.classList.toggle('active', b.dataset.module === mod);
    });
    updateDailyBtnLabel();
    updateClassicsBtnLabel();
    updateDeleBtnLabel();
    updateTocflBtnLabel(); // v8.2
    updateClassicsScript();
    
    saveProgress();
    loadSentences().then(() => {
        renderCurrentSentence();
        updateStats();
    });
}

// ===== Dropdown de Práctica Diaria (v6.9) =====
function updateDailyBtnLabel() {
    const lbl = document.getElementById('daily-current');
    if (!lbl) return;
    if (DAILY_MODULES.includes(state.activeModule) && state.activeModule !== 'todas') {
        lbl.textContent = MODULE_LABELS[state.activeModule] || state.activeModule;
    } else {
        lbl.textContent = 'Práctica Diaria';
    }
}

function initDailyDropdown() {
    const wrap = document.getElementById('daily-dropdown');
    const btn = document.getElementById('btn-daily-toggle');
    const menu = document.getElementById('daily-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        // foco inicial: ítem activo si existe, sino el primero
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    // cerrar al elegir un ítem (setModule lo dispara el wiring global del .cat-btn)
    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    // cerrar al hacer clic afuera
    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    // navegación por teclado (menú ARIA estándar)
    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}

// ===== Dropdown de Clásicos Antiguos (v7.0) =====
// El botón muestra el clásico activo (o el título de la sección) y los
// nombres chinos del menú siguen el switch 简/繁 en tiempo real.
function updateClassicsBtnLabel() {
    const lbl = document.getElementById('classics-current');
    if (!lbl) return;
    const info = CLASSICS_INFO[state.activeModule];
    if (info) {
        const zh = (ck() === 'trad') ? info.zhT : info.zh;
        lbl.textContent = zh + ' · ' + info.es;
    } else {
        lbl.textContent = 'Clásicos Antiguos';
    }
}

function updateClassicsScript() {
    const menu = document.getElementById('classics-menu');
    if (!menu) return;
    const trad = ck() === 'trad';
    menu.querySelectorAll('.classic-item').forEach(item => {
        const info = CLASSICS_INFO[item.dataset.module];
        const zhEl = item.querySelector('.ci-zh');
        if (info && zhEl) zhEl.textContent = trad ? info.zhT : info.zh;
    });
}

function initClassicsDropdown() {
    const wrap = document.getElementById('classics-dropdown');
    const btn = document.getElementById('btn-classics-toggle');
    const menu = document.getElementById('classics-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        // foco inicial: ítem activo si existe, sino el primero
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    // cerrar al elegir un ítem (setModule lo dispara el wiring global del .cat-btn)
    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    // cerrar al hacer clic afuera
    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    // navegación por teclado (menú ARIA estándar)
    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}
// ===== Dropdown de TOCFL (v8.2) — mismo patrón que DELE =====
// Band A: Preparación (Novice) + Nivel 1 (入門) + Nivel 2 (基礎) + las 20
// oraciones de muestra del módulo 'TOCFL' original; Band B/C llegan después.
function updateTocflBtnLabel() {
    const lbl = document.getElementById('tocfl-current');
    if (!lbl) return;
    const info = TOCFL_INFO[state.activeModule];
    lbl.textContent = info ? 'TOCFL · ' + info.badge : 'TOCFL';
}

function initTocflDropdown() {
    const wrap = document.getElementById('tocfl-dropdown');
    const btn = document.getElementById('btn-tocfl-toggle');
    const menu = document.getElementById('tocfl-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]:not([disabled])'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}
// ===== Dropdown de DELE (v7.4) — mismo patrón que Clásicos =====
// El botón muestra el examen activo (o "DELE") y el menú agrupa
// Escolares (11 a 17 años) primero; para adultos se sumará después.
function updateDeleBtnLabel() {
    const lbl = document.getElementById('dele-current');
    if (!lbl) return;
    const info = DELE_INFO[state.activeModule];
    lbl.textContent = info ? 'DELE · ' + info.badge + ' Escolares' : 'DELE';
}

function initDeleDropdown() {
    const wrap = document.getElementById('dele-dropdown');
    const btn = document.getElementById('btn-dele-toggle');
    const menu = document.getElementById('dele-menu');
    if (!wrap || !btn || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]:not([disabled])'));
    const isOpen = () => !menu.classList.contains('hidden');

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        const active = items().find(it => it.dataset.module === state.activeModule) || items()[0];
        if (active) active.focus();
    }
    function closeMenu(focusBack) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (focusBack) btn.focus();
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? closeMenu(false) : openMenu();
    });

    menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) closeMenu(false);
    });

    document.addEventListener('click', (e) => {
        if (isOpen() && !wrap.contains(e.target)) closeMenu(false);
    });

    menu.addEventListener('keydown', (e) => {
        const its = items();
        const i = its.indexOf(document.activeElement);
        if (e.key === 'Escape') {
            closeMenu(true); e.stopPropagation();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); its[(i + 1) % its.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); its[(i - 1 + its.length) % its.length].focus();
        } else if (e.key === 'Home') {
            e.preventDefault(); its[0].focus();
        } else if (e.key === 'End') {
            e.preventDefault(); its[its.length - 1].focus();
        } else if (e.key === 'Tab') {
            closeMenu(false);
        }
    });
    btn.addEventListener('keydown', (e) => {
        if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); openMenu();
        }
    });
}
// ============================================================
// v7.2 — Hueco de la oración: posición por CLOZE (no por indexOf del
// answer) y relleno al responder. Antes: si el answer no figuraba
// contiguo en la oración completa (挨/捱, Mediante/mediante) o aparecía
// dos veces, el hueco no se mostraba o quedaba en el lugar equivocado.
// ============================================================
function pzIsHanCh(ch) {
    const c = ch.codePointAt(0);
    return (c >= 0x3400 && c <= 0x9FFF) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0x20000 && c <= 0x2FA1F);
}

function escHtml(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Posición del hueco en coordenadas de caracteres han: el prefijo del
// cloze hasta '___' es idéntico al de la oración completa.
function blankZoneFromCloze(s, k) {
    const cloze = s['chinese_' + k + '_cloze'] || '';
    const bi = cloze.indexOf('___');
    if (bi === -1) return null;
    let start = 0;
    for (const ch of cloze.slice(0, bi)) if (pzIsHanCh(ch)) start++;
    let len = 0;
    for (const ch of (s['chinese_' + k + '_answer'] || '')) if (pzIsHanCh(ch)) len++;
    return len > 0 ? { start: start, len: len } : null;
}

// Segmento REAL de la oración completa que ocupa el hueco (p.ej. muestra
// 捱 aunque el answer sea 挨 — la respuesta del usuario se valida aparte).
function fullSegmentAt(fullText, zone) {
    if (!fullText || !zone) return null;
    const chars = Array.from(fullText);
    let seen = 0, sIdx = -1, eIdx = -1;
    for (let i = 0; i < chars.length; i++) {
        if (pzIsHanCh(chars[i])) {
            if (seen === zone.start) sIdx = i;
            seen++;
            if (seen === zone.start + zone.len) { eIdx = i + 1; break; }
        }
    }
    return (sIdx !== -1 && eIdx !== -1) ? chars.slice(sIdx, eIdx).join('') : null;
}

// v7.2 — Completa el hueco de la oración actual con la respuesta real:
// verde = correcto · rojo = error (muestra la palabra correcta) · ámbar = Revelar.
function refillBlank(cls) {
    const filtered = getFiltered();
    if (!filtered.length) return;
    const s = filtered[state.currentIndex];
    if (!s) return;
    state.filledAnswer = cls;
    renderSentenceText(s);
}

// v8.1: renderiza el hanzi de una tarjeta de palabra con colores de tono si
// están activos (fallback texto plano). Lo usa renderSentenceText.
function renderWordHanzi(el, zhWord) {
    if (showToneColors && typeof pinyinPro !== 'undefined') {
        try {
            const items = pinyinPro.pinyin(zhWord, { type: 'all' });
            let html = '';
            for (const it of items) {
                html += it.isZh ? '<span class="tone-' + (it.num || 5) + '">' + escHtml(it.origin) + '</span>' : escHtml(it.origin);
            }
            el.innerHTML = html;
            return;
        } catch (e) { console.warn('Error en pinyin-pro, mostrando texto plano:', e); }
    }
    el.textContent = zhWord || 'Error en datos';
}

// Renderiza SOLO el texto de la oración (hueco/tonos/relleno). La usa
// renderCurrentSentence para una oración nueva y refillBlank al responder.
function renderSentenceText(s) {
    const learningChinese = state.mode === 'es-cn';
    const k = ck();
    const sentenceTextEl = document.getElementById('sentence-text');
    const fill = state.filledAnswer;
    const fillSpan = (txt) => '<span class="blank-fill ' + fill + '">' + escHtml(txt) + '</span>';

    if (learningChinese) {
        // v8.1: tarjeta de palabra (HSK 3.0) → el prompt es el HANZI (con colores
        // de tono si están activos) y el alumno responde con el significado en
        // español. El pinyin de la palabra sigue de guía debajo si está ON.
        if (s.w) {
            renderWordHanzi(sentenceTextEl, s['chinese_' + k + '_full'] || '');
            return;
        }
        const displayText = s['chinese_' + k + '_full'];
        const cloze = s['chinese_' + k + '_cloze'] || '';
        const zone = blankZoneFromCloze(s, k);
        const fillTxt = zone ? (fullSegmentAt(displayText, zone) || s['chinese_' + k + '_answer'] || '') : '';

        // Con colores de tono: se recorren solo los caracteres han
        if (showToneColors && typeof pinyinPro !== 'undefined') {
            try {
                const items = pinyinPro.pinyin(displayText, { type: 'all' });
                let html = '';
                let charPos = 0; // contador solo para caracteres chinos
                for (const it of items) {
                    if (it.isZh) {
                        if (zone && charPos >= zone.start && charPos < zone.start + zone.len) {
                            if (charPos === zone.start) html += fill ? fillSpan(fillTxt) : '___';
                        } else {
                            const toneNum = it.num || 5;
                            html += `<span class="tone-${toneNum}">${it.origin}</span>`;
                        }
                        charPos++;
                    } else {
                        html += it.origin;
                    }
                }
                sentenceTextEl.innerHTML = html;
            } catch (e) {
                console.warn('Error en pinyin-pro, mostrando texto plano:', e);
                if (fill && cloze.includes('___')) {
                    sentenceTextEl.innerHTML = escHtml(cloze).replace('___', fillSpan(fillTxt));
                } else {
                    sentenceTextEl.textContent = (cloze.includes('___') ? cloze : displayText) || 'Error en datos';
                }
            }
        } else {
            // Fallback: texto plano. ⚠ En ES→CN se usa el cloze (con ___)
            // para NO revelar la respuesta; makeBlanksClickable() lo hace
            // clicable y con el relleno la oración queda completa.
            let plain = displayText || 'Error en datos';
            if (cloze.includes('___')) plain = cloze;
            if (fill && cloze.includes('___')) {
                sentenceTextEl.innerHTML = escHtml(cloze).replace('___', fillSpan(fillTxt));
            } else {
                sentenceTextEl.textContent = plain;
            }
        }
        return;
    }

    // CN→ES: el español se muestra con cloze; al responder, la oración completa
    // v8.1: tarjeta de palabra → modo espejo: se muestra la palabra ESPAÑOLA y
    // el alumno produce el hanzi (el hanzi se revela al verificar/revelar).
    if (s.w) {
        sentenceTextEl.textContent = s.spanish_full || 'Error en datos';
        return;
    }
    const shown = s.spanish_cloze || s.spanish_full;
    if (fill) {
        const full = s.spanish_full || shown || '';
        const a = s.spanish_answer || '';
        const idx = a ? full.toLowerCase().indexOf(a.toLowerCase()) : -1;
        if (idx !== -1) {
            sentenceTextEl.innerHTML = escHtml(full.slice(0, idx)) + fillSpan(full.slice(idx, idx + a.length)) + escHtml(full.slice(idx + a.length));
        } else {
            sentenceTextEl.innerHTML = escHtml(full);
        }
    } else {
        sentenceTextEl.textContent = shown || 'Error en datos';
    }
}

function renderCurrentSentence() {
    const filtered = getFiltered();
    if (!filtered.length) return;
    
    // Reiniciar índice si nos salimos de rango
    if (state.currentIndex >= filtered.length) state.currentIndex = 0;
    
    const s = filtered[state.currentIndex];
    if (!s) return;

    state.answered = false;
    state.filledAnswer = null;   // v7.2: oración nueva → hueco otra vez vacío
    const btnCheck = document.getElementById('btn-check');
    if (btnCheck) btnCheck.textContent = 'Verificar';

    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // Actualizar Header (los clásicos muestran su propia insignia)
    const deleInfo = DELE_INFO[s.module];
    const tocflInfo = TOCFL_INFO[s.module]; // v8.2: vocabulario TOCFL Band A
    document.getElementById('card-level').textContent =
        (s.module || '').startsWith('Clasicos-') ? '📜 Clásico' :
        (deleInfo ? '🇪🇸 DELE ' + deleInfo.badge :
        (tocflInfo ? '🇹🇼 TOCFL ' + tocflInfo.badge :
        (s.w ? 'Nivel ' + s.level + ' · vocabulario' : 'Nivel ' + s.level)));
    document.getElementById('card-number').textContent = (state.currentIndex + 1) + '/' + filtered.length;

    // 1-3. Texto de la oración (hueco posicionado por cloze + tonos + relleno)
    renderSentenceText(s);

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

    // 6. Placeholder dinámico (v8.1: las tarjetas de palabra invierten la dirección)
    const input = document.getElementById('answer-input');
    const charLabel = state.charType === 'trad' ? 'tradicional' : 'simplificado';
    if (s.w) {
        input.placeholder = learningChinese
            ? 'Escribí el significado en español...'
            : 'Escribe en chino (' + charLabel + ')...';
    } else if (learningChinese) {
        input.placeholder = 'Escribe en chino (' + charLabel + ')...';
    } else {
        input.placeholder = 'Escribe en español (conjugado)... 用西班牙语写';
    }

    // 6b. Instrucciones bilingües en modo "Aprendo español" (CN→ES):
    // los alumnos suman la traducción al chino en Revelar / La sé / Repetir
    const btnReveal = document.getElementById('btn-reveal');
    const btnKnow = document.getElementById('btn-know');
    const btnNotKnow = document.getElementById('btn-not-know');
    if (!learningChinese) {
        if (btnReveal) btnReveal.textContent = '👁️ Revelar 显示';
        if (btnKnow) btnKnow.textContent = '✅ La sé 我会';
        if (btnNotKnow) btnNotKnow.textContent = '🔄 Repetir 再练';
    } else {
        if (btnReveal) btnReveal.textContent = '👁️ Revelar';
        if (btnKnow) btnKnow.textContent = '✅ La sé';
        if (btnNotKnow) btnNotKnow.textContent = '🔄 Repetir';
    }

    // v7.14: botón "📖 Leer lección" — SOLO si la oración pertenece a un
    // texto continuo (p. ej. Clásicos) y el modo es "Aprendo Chino" (es-cn).
    // En CN→ES el botón desaparece (el texto de la lección es chino).
    const btnLesson = document.getElementById('btn-read-lesson');
    if (btnLesson) {
        const hasLesson = state.mode === 'es-cn' && !!lessonForSentence(s);
        btnLesson.classList.toggle('hidden', !hasLesson);
    }

    // 7. Barra de progreso
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = ((state.currentIndex + 1) / filtered.length * 100) + '%';

    // 8. Hacer el hueco "___" clicable (los alumnos intentan tocarlo para escribir)
    makeBlanksClickable();

    // 9. Módulo de pronunciación (v7.5): nueva oración → nuevo objetivo + reset.
    //    v7.8 (spec v4.0 §1): el objetivo depende del MODO —
    //      · es-cn (Aprendo Chino)   → oración china completa + pinyin
    //        (pipeline completo: Whisper contenido + F0/DTW tonos).
    //      · cn-es (Aprendo Español) → oración ESPAÑOLA, sin pinyin
    //        (SOLO Whisper: el español no es lengua tonal).
    if (window.VR && typeof window.VR.setTarget === 'function') {
        // v7.6: 3.er arg = guion activo (s/t) → mensajes zh en 简/繁
        // v7.8: 4.º arg = idioma del objetivo ('zh'|'es')
        const esMode = state.mode === 'cn-es';
        const target = esMode ? (s.spanish_full || '') : s['chinese_' + k + '_full'];
        window.VR.setTarget(target, esMode ? '' : (s.pinyin || ''), k, esMode ? 'es' : 'zh');
    }
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
    
    // v7.11: la PRIMERA vez que se activan los tonos se muestra la leyenda.
    // Se marca toneLegendSeen acá mismo (si no, reaparecería en cada
    // activación aunque no marcaras el checkbox); con el botón ℹ️ del panel
    // se puede reabrir cuando quieras.
    if (showToneColors && !state.toneLegendSeen) {
        state.toneLegendSeen = true;
        showToneLegend();
    }
    
    saveProgress();
    renderCurrentSentence();
    renderReaderPreview(); // el lector libre también usa los colores de tono
}

// ===== v7.11: esquemas de color para los tonos =====
// Estándar NO se aplica por JS: son las variables nativas de la app
// (--primary/--warning/--success/--danger/--text-secondary) a las que el CSS
// cae cuando no hay variable --tone-N definida. Así el look de siempre no
// cambia ni una pixel, y el modo oscuro sigue adaptándose solo.
const TONE_SCHEMES = {
    colorblind: { // paleta Okabe-Ito (segura para deuteranopía/protanopía)
        light: { 1: '#0072B2', 2: '#E69F00', 3: '#009E73', 4: '#D55E00', 5: '#999999' },
        dark:  { 1: '#56B4E9', 2: '#E69F00', 3: '#009E73', 4: '#D55E00', 5: '#999999' } // azul cielo: legible sobre fondo oscuro
    }
};
// Semilla del esquema personalizado = look actual de la app (el usuario parte
// de lo que conoce y ajusta desde ahí). Claves SIEMPRE como string '1'..'5'.
const TONE_CUSTOM_DEFAULT = { 1: '#2563eb', 2: '#d97706', 3: '#16a34a', 4: '#dc2626', 5: '#64748b' };

// Paleta activa según esquema + modo (light/dark). null = estándar → el CSS
// usa sus fallbacks nativos y NO se pisan los colores del usuario.
function toneActivePalette() {
    if (state.toneScheme === 'colorblind') {
        return document.body.classList.contains('dark-mode')
            ? TONE_SCHEMES.colorblind.dark
            : TONE_SCHEMES.colorblind.light;
    }
    if (state.toneScheme === 'custom' && state.toneCustomColors) return state.toneCustomColors;
    return null;
}

// Aplica (o limpia) las variables --tone-N en :root. El neutro (5) comparte
// la variable --tone-0 porque el CSS estiliza .tone-0 y .tone-5 juntas.
function applyToneScheme() {
    const root = document.documentElement;
    const pal = toneActivePalette();
    for (let n = 1; n <= 5; n++) {
        const varName = (n === 5) ? '--tone-0' : ('--tone-' + n);
        const val = pal ? pal[String(n)] : null;
        if (val) root.style.setProperty(varName, val);
        else root.style.removeProperty(varName);
    }
}

function showToneLegend() {
    const pop = document.getElementById('tone-legend-pop');
    if (!pop) return;
    // Sincronizar radios + grilla custom + checkbox con el estado real
    document.querySelectorAll('input[name="tone-scheme"]').forEach(r => {
        r.checked = (r.value === state.toneScheme);
    });
    const customDiv = document.getElementById('tone-custom-colors');
    if (customDiv) customDiv.classList.toggle('hidden', state.toneScheme !== 'custom');
    const colors = state.toneCustomColors || TONE_CUSTOM_DEFAULT;
    for (let n = 1; n <= 5; n++) {
        const inp = document.getElementById('tc-' + n);
        if (inp && colors[String(n)]) inp.value = colors[String(n)];
    }
    const chk = document.getElementById('chk-tone-legend-once');
    if (chk) chk.checked = !!state.toneLegendSeen;
    pop.classList.remove('hidden');
}

function hideToneLegend() {
    const pop = document.getElementById('tone-legend-pop');
    if (pop) pop.classList.add('hidden');
}

// ===== Lógica de Juego =====
function showFullTranslation() {
    if (state.translationRevealed) return;
    state.translationRevealed = true;

    const filtered = getFiltered();
    const s = filtered[state.currentIndex];
    const learningChinese = state.mode === 'es-cn';
    const k = ck();

    // v8.1: la revelación muestra la OTRA lengua respecto del prompt. Con la
    // inversión v8.1 de las tarjetas de palabra esta misma línea cubre los 4
    // casos: es-cn oración (prompt chino) → español · cn-es oración (prompt
    // español) → hanzi · es-cn palabra (prompt hanzi) → glosa española ·
    // cn-es palabra (prompt glosa) → hanzi.
    let translationText = learningChinese ? s.spanish_full : s['chinese_' + k + '_full'];

    const el = document.getElementById('translation-text');
    el.textContent = translationText || 'Error en datos';
    el.style.opacity = '1';
    el.style.fontStyle = 'normal';
}

function getValidAnswers(s, learningChinese, k) {
    const answers = [];
    // v8.1: en tarjetas de palabra (HSK 3.0) los modos invierten la dirección:
    // Aprendo Chino (es-cn) muestra el hanzi y espera la glosa española;
    // Aprendo Español (cn-es) muestra la glosa y espera el hanzi. Las
    // oraciones mantienen su dirección histórica.
    const expectChinese = s.w ? !learningChinese : learningChinese;
    if (expectChinese) {
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

    // v8.1: identidad canónica de una tarjeta de palabra = el hanzi
    // (el panel de vocabulario, las stats y el popup usan el hanzi como clave)
    const wordKey = s.w ? String(s.chinese_simp_answer || validAnswers[0] || '').trim() : null;

    // v7.19: tarjetas de palabra → coincidencia EXACTA (sin acentos y sin mayúsculas).
    // El matching por inclusión de las oraciones sería demasiado laxo con glosas cortas.
    const deacc = (x) => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const isCorrect = s.w
        ? validAnswers.some(ans => deacc(ans.toLowerCase()) === deacc(input.toLowerCase()))
        : validAnswers.some(ans => {
            const a = ans.toLowerCase();
            const i = input.toLowerCase();
            return input === ans || i === a || i.includes(a) || a.includes(i);
        });

    const allOptions = validAnswers.join(' / ');

    if (isCorrect) {
        showFeedback('✅ ¡Correcto! "' + allOptions + '"', 'correct');
        // v8.1: palabras → se registra el hanzi canónico (no las glosas)
        if (wordKey) {
            state.knownWords.add(wordKey);
            state.newWords.delete(wordKey);
        } else {
            // v9.0: oraciones → se registra UNA entrada canónica (el hanzi
            // SIMPLIFICADO si la respuesta es china). Antes se guardaban todas
            // las respuestas válidas en el guion activo: estudiando con 繁
            // quedaba 謝謝 (y además entraban simp+trad como dos palabras).
            const canon = learningChinese
                ? String(s.chinese_simp_answer || validAnswers[0] || '').trim()
                : validAnswers[0];
            state.knownWords.add(canon);
            state.newWords.delete(canon);
        }
        state.score++;
        rememberWordContext(wordKey ? [wordKey] : validAnswers, s); // v7.13: contexto de la oración actual
        refillBlank('correct');   // v7.2: la oración queda completa (verde)
    } else {
        showFeedback('❌ Respuestas válidas: "' + allOptions + '"', 'incorrect');
        state.newWords.add(wordKey || validAnswers[0]);
        rememberWordContext(wordKey ? [wordKey] : [validAnswers[0]], s); // v7.13
        if (typeof window.acSrsMiss === 'function') window.acSrsMiss(s); // v7.21: alimenta el mazo de repaso
        refillBlank('wrong');     // v7.2: se muestra la palabra correcta (rojo)
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
    // v8.1: identidad canónica de palabra = hanzi (coherente con checkAnswer)
    const wordKey = s.w ? String(s.chinese_simp_answer || validAnswers[0] || '').trim() : null;
    showFullTranslation();
    showFeedback('💡 Respuestas válidas: "' + validAnswers.join(' / ') + '"', 'correct');
    refillBlank('reveal');       // v7.2: oración completa con la respuesta (ámbar)

    if (wordKey) {
        state.newWords.add(wordKey);
    } else {
        // v9.0: oraciones → canónico simplificado (coherente con checkAnswer)
        const canon = learningChinese
            ? String(s.chinese_simp_answer || validAnswers[0] || '').trim()
            : validAnswers[0];
        state.newWords.add(canon);
    }
    rememberWordContext(wordKey ? [wordKey] : validAnswers, s); // v7.13: contexto de la oración actual
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

    // v8.1: palabras → el hanzi es la identidad canónica (coherente con
    // checkAnswer); v9.0: oraciones también registran el hanzi SIMPLIFICADO
    // canónico (antes usaban el guion activo → 謝謝 en vez de 谢谢).
    let answer = s.w
        ? String(s.chinese_simp_answer || s['chinese_' + k + '_answer']).trim()
        : (learningChinese ? String(s.chinese_simp_answer || s['chinese_' + k + '_answer']).trim() : s.spanish_answer);

    if (known) {
        state.knownWords.add(answer);
        state.newWords.delete(answer);
    } else {
        state.newWords.add(answer);
        state.knownWords.delete(answer);
        if (typeof window.acSrsMiss === 'function') window.acSrsMiss(s); // v7.21: "🔄 Repetir" también alimenta el mazo
    }
    rememberWordContext([answer], s); // v7.13: contexto de la oración actual

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

// ===== Diccionario palabra → traducción (cajón de vocabulario + lector) =====
// Se alimenta con los datos embebidos y se va AMPLIANDO con cada módulo
// cargado (Saludos/HSK/TOCFL/DELE), así las palabras guardadas siguen
// teniendo traducción aunque cambies de módulo.
//
// v7.10 (Opción B) — el toque resuelve en TRES niveles, de mejor a peor:
//   vocabDict    → respuestas EXACTAS de las lecciones (traducción directa)
//   wordHitDict  → Capa 1: cada palabra de los TEXTOS COMPLETOS indexada
//                  ("profesora", "中国", "朋友"...) → muestra la lección donde vive
//   lemas ES     → Capa 2: "amigos"→"amigo", "comieron"→"comer" (candidatos)
//   por carácter → Capa 3: "大小" se desglosa en 大 + 小 con su ficha individual
// Cero archivos nuevos: todo se deriva de los datos que ya viajan en app.js.
const vocabDict = new Map();
const wordHitDict = new Map();
// Regex compartida por diccionario y lector interlineal (fuente única)
const READER_HANZI = /[\u3400-\u4dbf\u4e00-\u9fff]/;
// Palabras funcionales que NO valen como "aparece en" en español
const ES_STOP = new Set(['el','la','los','las','un','una','unos','unas','de','del','al','a','en','y','o','u','que','se','su','sus','es','son','con','por','para','pero','muy','mas','más','yo','tu','tus','mi','mis','me','te','lo','le','les','no','si','sí','hay','fue','era','este','esta','esto','estos','estas','ese','esa','eso','como','donde','dónde','cuando','cuándo','qué','sino','porque','él','ella','ellos','ellas','nosotros','usted','ustedes','hoy','ya','aún','todavia','todavía','tambien','también']);

// Segmentador zh compartido (1 sola instancia para diccionario + lector)
let _zhSegmenter;
function getZhSegmenter() {
    if (_zhSegmenter === undefined) {
        _zhSegmenter = null;
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            try { _zhSegmenter = new Intl.Segmenter('zh', { granularity: 'word' }); } catch (e) { _zhSegmenter = null; }
        }
    }
    return _zhSegmenter;
}

function esWords(text) {
    return String(text || '').toLowerCase().match(/[a-záéíóúüñ]+/g) || [];
}

// Palabras hanzi de un texto (Intl.Segmenter; sin Segmenter → carácter a carácter)
function zhWordsList(text) {
    if (!text) return [];
    const seg = getZhSegmenter();
    if (seg) {
        try {
            return Array.from(seg.segment(String(text)), s => s.segment).filter(s => READER_HANZI.test(s));
        } catch (e) { /* cae al fallback */ }
    }
    return Array.from(String(text)).filter(ch => READER_HANZI.test(ch));
}

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
            fullZhSimp: s.chinese_simp_full || '',
            fullZhTrad: s.chinese_trad_full || s.chinese_simp_full || ''
        };
        [es, zhS, zhT].forEach(w => {
            if (w && !vocabDict.has(w)) vocabDict.set(w, rec);
        });
        // alias minúscula del ES (tocar "Hola" en el lector encuentra "hola")
        if (es) { const lw = es.toLowerCase(); if (!vocabDict.has(lw)) vocabDict.set(lw, rec); }
        indexWordHits(rec);
    });
}

// v7.10 Capa 1: indexa cada palabra de los textos completos de la oración
function indexWordHits(rec) {
    esWords(rec.fullEs).forEach(w => {
        if (w.length >= 3 && !ES_STOP.has(w) && !wordHitDict.has(w)) wordHitDict.set(w, rec);
    });
    [rec.fullZhSimp, rec.fullZhTrad].forEach(t => zhWordsList(t).forEach(w => {
        if (!wordHitDict.has(w)) wordHitDict.set(w, rec);
    }));
}

indexSentencesForVocab(typeof EMBEDDED_SENTENCES !== 'undefined' ? EMBEDDED_SENTENCES : []);
// v7.10: el diccionario nace COMPLETO — además del módulo base, indexa TODOS
// los módulos embebidos (deduplicados por referencia: los alias apuntan a la
// misma lista). Así "profesora" o "中国" resuelven aunque ese módulo no se abrió.
if (typeof EMBEDDED_MODULE_DATA !== 'undefined') {
    const _seenModArr = new Set();
    Object.keys(EMBEDDED_MODULE_DATA).forEach(k => {
        const arr = EMBEDDED_MODULE_DATA[k];
        // v7.19: las tuplas HSK 3.0 no se indexan al arrancar (se expanden al abrir
        // el módulo y ahí alimentan el diccionario) — evita iterar 11.092 registros
        if (Array.isArray(arr) && arr.length && Array.isArray(arr[0])) return;
        if (Array.isArray(arr) && !_seenModArr.has(arr)) {
            _seenModArr.add(arr);
            indexSentencesForVocab(arr);
        }
    });
}

// ===== v7.12 Capa 4 — diccionario offline (dict-mini.js, CC-BY-SA 4.0) =====
// ~1.630 entradas frecuentes zh→es seleccionadas del vocabulario del curso +
// CC-CEDICT (MDBG); definiciones ES propias. Los ALIAS (formas tradicionales y
// variantes) apuntan a la entrada real: "嗎"→"吗". Además se construye un índice
// INVERSO es→zh para tocar palabras españolas y proponer candidatos chinos.
const DICT_MINI_RAW = (typeof window !== 'undefined' && window.DICT_MINI) || {};
const dictMini = new Map();     // clave → { py, def }
const dictMiniAlias = new Map(); // alias → clave real
(function () {
    const keys = Object.keys(DICT_MINI_RAW);
    keys.forEach(k => {
        const v = DICT_MINI_RAW[k];
        if (Array.isArray(v)) dictMini.set(k, { py: v[0] || '', def: v[1] || '' });
    });
    keys.forEach(k => {
        const v = DICT_MINI_RAW[k];
        if (typeof v === 'string') { if (dictMini.has(v)) dictMiniAlias.set(k, v); return; }
        if (v[2] && dictMini.has(k) && !dictMini.has(v[2])) dictMiniAlias.set(v[2], k);
    });
})();

function dictMiniLookup(word) {
    const w = String(word || '').trim();
    if (!w) return null;
    const key = dictMini.has(w) ? w : (dictMiniAlias.get(w) || '');
    return key ? dictMini.get(key) : null;
}

// Índice inverso ES→ZH: cada sentido de cada entrada aporta sus palabras ES (≥3
// letras, sin stop words) → hasta 3 candidatos chinos por palabra española.
const dictMiniEs = new Map();
(function () {
    const push = (es, z, py, def) => {
        if (!ES_STOP.has(es)) {
            if (!dictMiniEs.has(es)) dictMiniEs.set(es, []);
            const list = dictMiniEs.get(es);
            if (list.length < 3 && !list.some(x => x.z === z)) list.push({ z: z, py: py, def: def });
        }
    };
    dictMini.forEach((val, z) => {
        (val.def || '').split(';').forEach(sense => {
            (sense.toLowerCase().match(/[a-záéíóúüñ]+/g) || []).forEach(tok => {
                if (tok.length >= 3) push(tok, z, val.py, sense.trim());
            });
        });
    });
})();

// v7.10 Capa 2: candidatos de lema para una palabra española (el 1.º es la
// palabra misma; el resto plurales y conjugaciones frecuentes → infinitivo)
function esLemmaCandidates(w) {
    const out = [w];
    const add = x => { if (x && x.length >= 3 && out.indexOf(x) === -1) out.push(x); };
    if (w.length >= 4) {
        if (/es$/.test(w)) add(w.slice(0, -2));
        if (/s$/.test(w)) add(w.slice(0, -1));
    }
    if (w.length >= 5) {
        const map = [
            ['ando', ['ar']], ['iendo', ['er', 'ir']],
            ['aron', ['ar']], ['ieron', ['er', 'ir']],
            ['aste', ['ar']], ['iste', ['er', 'ir']],
            ['amos', ['ar']], ['emos', ['er']], ['imos', ['ir']],
            ['aban', ['ar']], ['aba', ['ar']], ['ía', ['er', 'ir', 'ar']],
            ['an', ['ar', 'er', 'ir']], ['as', ['ar', 'er']],
            ['o', ['ar', 'er', 'ir']], ['a', ['ar', 'er']], ['é', ['ar']], ['ó', ['ar', 'er']]
        ];
        for (const pair of map) {
            if (w.endsWith(pair[0])) {
                const stem = w.slice(0, -pair[0].length);
                if (stem.length >= 3) {
                    pair[1].forEach(r => add(stem + r));
                    add(stem);
                }
                break;   // un solo sufijo: el más específico que matchea
            }
        }
    }
    return out;
}

// v7.10: resolución del toque — exacta > lema > aparece-en > por carácter
function lookupVocab(word) {
    const w = String(word || '').trim();
    if (!w) return { level: 'none' };
    const zh = isZhText(w);
    // 1) respuesta exacta (alias minúscula incluido)
    if (vocabDict.has(w)) return { level: 'exact', rec: vocabDict.get(w) };
    const lw = zh ? w : w.toLowerCase();
    if (!zh && lw !== w && vocabDict.has(lw)) return { level: 'exact', rec: vocabDict.get(lw) };
    // 2) ES: algún lema es respuesta exacta
    if (!zh) {
        for (const cand of esLemmaCandidates(lw)) {
            if (cand !== lw && vocabDict.has(cand)) return { level: 'lemma', lemma: cand, rec: vocabDict.get(cand) };
        }
    }
    // v7.12 Capa 4: definición breve del diccionario offline (dict-mini.js).
    // ZH: la entrada da pinyin de diccionario + sentidos ES (+ contexto de
    // lección si además vive en algún texto). ES: índice inverso → candidatos
    // chinos con pinyin y sentido.
    if (zh) {
        const d = dictMiniLookup(w);
        if (d) return { level: 'dict', py: d.py, def: d.def, rec: wordHitDict.get(w) || null };
    } else {
        let dItems = dictMiniEs.get(lw) || null;
        let dLemma = '';
        if (!dItems) {
            for (const cand of esLemmaCandidates(lw)) {
                if (cand !== lw && dictMiniEs.has(cand)) { dItems = dictMiniEs.get(cand); dLemma = cand; break; }
            }
        }
        if (dItems) return { level: 'dict-es', items: dItems, lemma: dLemma, rec: wordHitDict.get(w) || wordHitDict.get(lw) || null };
    }
    // 3) la palabra vive dentro del texto de una lección
    if (wordHitDict.has(w)) return { level: 'hit', rec: wordHitDict.get(w) };
    if (!zh && lw !== w && wordHitDict.has(lw)) return { level: 'hit', rec: wordHitDict.get(lw) };
    if (!zh) {
        for (const cand of esLemmaCandidates(lw)) {
            if (cand !== lw && wordHitDict.has(cand)) return { level: 'hit', lemma: cand, rec: wordHitDict.get(cand) };
        }
    }
    // 4) ZH: desglose carácter a carácter — solo si ALGÚN carácter tiene
    // ficha real (si no, mejor el mensaje honesto; el pinyin ya está arriba)
    if (zh) {
        const chars = [];
        for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
        const parts = chars.map(ch => ({ ch: ch, py: wordPinyin(ch), rec: vocabDict.get(ch) || wordHitDict.get(ch) || null }));
        if (parts.length && parts.some(p => p.rec)) return { level: 'chars', parts: parts };
    }
    return { level: 'none' };
}

function isZhText(t) { return READER_HANZI.test(t || ''); }

function wordPinyin(word) {
    try {
        if (typeof pinyinPro !== 'undefined' && word) return pinyinPro.pinyin(word, { toneType: 'mark' });
    } catch (e) {}
    return '';
}

// Ejemplo EN CHINO de una lección (respeta 简/繁 elegido) + pinyin + apoyo ES
function vpZhExampleHtml(rec, word) {
    let h = '';
    const ejemploZh = (ck() === 'trad' ? (rec.fullZhTrad || rec.fullZhSimp) : (rec.fullZhSimp || rec.fullZhTrad)) || '';
    if (ejemploZh && ejemploZh !== word) {
        h += '<div class="vp-example">🇨🇳 ' + escHtml(ejemploZh) + '</div>';
        const pyEj = rec.pinyin || wordPinyin(ejemploZh);
        if (pyEj) h += '<div class="vp-example-py">📖 ' + escHtml(pyEj) + '</div>';
        if (rec.fullEs) h += '<div class="vp-example-alt">🇪🇸 “' + escHtml(rec.fullEs) + '”</div>';
    }
    return h;
}

// Ejemplo EN ESPAÑOL de una lección + apoyo en chino con pinyin
function vpEsExampleHtml(rec, word) {
    let h = '';
    if (rec.fullEs && rec.fullEs !== word) {
        h += '<div class="vp-example">🇪🇸 “' + escHtml(rec.fullEs) + '”</div>';
    }
    const apoyoZh = (ck() === 'trad' ? (rec.fullZhTrad || rec.fullZhSimp) : (rec.fullZhSimp || rec.fullZhTrad)) || '';
    if (apoyoZh) {
        const pyAp = wordPinyin(apoyoZh) || rec.pinyin;
        h += '<div class="vp-example-alt">🇨🇳 ' + escHtml(apoyoZh) + (pyAp ? ' <span class="vp-example-py-inline">(' + escHtml(pyAp) + ')</span>' : '') + '</div>';
    }
    return h;
}

// Traducción directa ES→ZH (respuesta exacta tocada desde el modo español)
function vpEsExactHtml(rec, word) {
    let h = '';
    let zhLine = rec.zhSimp ? escHtml(rec.zhSimp) : '';
    if (rec.zhTrad && rec.zhTrad !== rec.zhSimp) zhLine += ' <span class="vp-trad">(' + escHtml(rec.zhTrad) + ')</span>';
    if (zhLine) h += '<div class="vp-trans">🇨🇳 ' + zhLine + '</div>';
    const py = wordPinyin(rec.zhSimp) || rec.pinyin;
    if (py) h += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
    h += vpEsExampleHtml(rec, word);
    return h;
}

function showVocabPop(word) {
    const pop = document.getElementById('vocab-pop');
    const body = document.getElementById('vocab-pop-body');
    if (!pop || !body) return;
    const w = String(word || '').trim();
    body.dataset.word = w; // v7.16: la práctica grande necesita la palabra tocada
    const zh = isZhText(w);
    const hit = lookupVocab(w);
    const rec = hit.rec;
    let html = '<div class="vp-word">' + escHtml(w) + '</div>';
    if (zh) {
        // Palabra china: pinyin SIEMPRE — v7.12: si hay entrada de diccionario
        // (dict-mini) su pinyin de diccionario va primero (tonos neutros reales)
        const py = (hit.level === 'dict' && hit.py) || wordPinyin(w) || (rec ? rec.pinyin : '');
        if (py) html += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
    }
    if (hit.level === 'exact') {
        // Respuesta exacta: EXACTAMENTE lo mismo que mostraba siempre
        if (zh) {
            if (rec && rec.es) html += '<div class="vp-trans">🇪🇸 ' + escHtml(rec.es) + '</div>';
            // v7.12: la ficha de la lección + sentidos extra del diccionario si suman
            const dX = dictMiniLookup(w);
            if (dX && dX.def && (!rec || !rec.es || rec.es.toLowerCase() !== dX.def.toLowerCase())) {
                html += '<div class="vp-def">📖 ' + escHtml(dX.def) + '</div>';
            }
            if (rec) html += vpZhExampleHtml(rec, w);
        } else if (rec) {
            html += vpEsExactHtml(rec, w);
        }
    } else if (hit.level === 'dict') {
        // v7.12 Capa 4: definición breve del diccionario offline (dict-mini.js)
        if (hit.def) html += '<div class="vp-def">🇪🇸 ' + escHtml(hit.def) + '</div>';
        if (hit.rec) html += '<div class="vp-note">🔎 También aparece en una lección:</div>' + vpZhExampleHtml(hit.rec, '');
    } else if (hit.level === 'dict-es') {
        // v7.12 Capa 4: candidatos chinos para una palabra española
        html += '<div class="vp-note">📖 Diccionario' + (hit.lemma ? ' (lema «' + escHtml(hit.lemma) + '»)' : '') + ':</div>';
        hit.items.forEach(it => {
            html += '<div class="vp-dict-es-row"><span class="vp-dict-zh">🇨🇳 ' + escHtml(it.z) + '</span>'
                + (it.py ? ' <span class="vp-dict-py">(' + escHtml(it.py) + ')</span>' : '')
                + ' <span class="vp-dict-def">— ' + escHtml(it.def) + '</span></div>';
        });
        if (hit.rec) html += vpEsExampleHtml(hit.rec, '');
    } else if (hit.level === 'lemma') {
        // v7.10 Capa 2: tocó una conjugación/plural → ficha del LEMA
        if (rec && rec.es) html += '<div class="vp-trans">🇪🇸 ' + escHtml(rec.es) + '</div>';
        html += '<div class="vp-note">🔎 Por el lema «' + escHtml(hit.lemma) + '»</div>';
        html += vpEsExampleHtml(rec, '');
    } else if (hit.level === 'hit') {
        // v7.10 Capa 1: la palabra vive dentro del texto de una lección.
        // Honestidad: se muestra la lección como contexto, NO como traducción 1:1.
        html += '<div class="vp-note">🔎 Aparece en una lección' + (hit.lemma ? ' (lema «' + escHtml(hit.lemma) + '»)' : '') + ':</div>';
        html += zh ? vpZhExampleHtml(rec, '') : vpEsExampleHtml(rec, '');
    } else if (hit.level === 'chars') {
        // v7.10 Capa 3: desglose carácter a carácter
        html += '<div class="vp-note">🔤 Carácter por carácter:</div><div class="vp-chars">';
        hit.parts.forEach(p => {
            html += '<div class="vp-char-row"><span class="vp-char">' + escHtml(p.ch) + '</span>'
                + (p.py ? '<span class="vp-char-py">' + escHtml(p.py) + '</span>' : '')
                + (p.rec && p.rec.es ? '<span class="vp-char-es">🇪🇸 ' + escHtml(p.rec.es) + '</span>' : '')
                + '</div>';
        });
        html += '</div>';
    } else {
        html += '<div class="vp-missing">🤔 No tengo la traducción de esta palabra en este módulo. Cargá el módulo donde la aprendiste y volvé a tocarla.</div>';
    }
    // v7.13: contexto guardado al marcar la palabra ("tu ejemplo").
    // Palabras viejas sin contexto → no hay sección (compatibilidad hacia atrás).
    const ctx = state.wordContexts[w];
    if (ctx) {
        const zhCtx = ck() === 'trad' ? (ctx.zt || ctx.zh) : (ctx.zh || ctx.zt);
        let inner = '';
        if (zhCtx) inner += '<div class="vp-ctx-zh">🇨🇳 ' + escHtml(zhCtx)
            + (zh && ctx.py ? ' <span class="vp-ctx-py">(' + escHtml(ctx.py) + ')</span>' : '') + '</div>';
        if (ctx.es) inner += '<div class="vp-ctx-es">🇪🇸 “' + escHtml(ctx.es) + '”</div>';
        if (inner) html += '<div class="vp-ctx"><div class="vp-ctx-title">📌 Tu ejemplo (donde la marcaste)</div>' + inner + '</div>';
    }
    // v7.13: ORDEN DE TRAZOS (Hanzi Writer) — solo palabras CHINAS.
    // En modo CN→ES la palabra es española → sin sección de trazos: queda la
    // palabra grande + ejemplo + traducción al chino (diccionario inverso).
    if (zh) {
        let chars = [];
        for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
        if (chars.length) {
            html += '<div class="vp-strokes" id="vp-strokes">'
                + '<div class="vp-strokes-title">✍️ Orden de trazos</div>'
                + '<div class="vp-stroke-row">'
                + chars.slice(0, VP_STROKES_MAX).map(ch =>
                    '<div class="vp-stroke-char loading"><div class="vp-stroke-target" data-char="' + escHtml(ch) + '"></div></div>'
                  ).join('')
                + '</div>'
                + (chars.length > VP_STROKES_MAX ? '<div class="vp-stroke-note">…y ' + (chars.length - VP_STROKES_MAX) + ' carácter(es) más</div>' : '')
                + '<div class="vp-stroke-btns">'
                + '<button type="button" class="vp-stroke-btn vp-stroke-anim">▶ Animar</button>'
                + '<button type="button" class="vp-stroke-btn vp-stroke-quiz">✍ Practicar</button>'
                + '</div>'
                + '<div class="vp-stroke-hint">Tocá ✍ Practicar para pasar a la pantalla grande y trazar con el dedo</div>'
                + '</div>';
        }
    }
    // v7.21: botón "Sumar a mi repaso" (SRS) para palabras chinas.
    // El handler delegado vive en la IIFE srsInit (final de app.js).
    if (zh && typeof window.acSrsHas === 'function') {
        const inDeck = !!window.acSrsHas(w);
        html += '<button type="button" class="vp-srs-add' + (inDeck ? ' is-in' : '') + '">'
            + (inDeck ? '✓ Ya está en tu repaso' : '🔁 Sumar a mi repaso') + '</button>';
    }
    body.innerHTML = html;
    pop.classList.remove('hidden');
    if (zh) mountVpStrokes(w); // v7.13: carga lazy del motor + instancias por carácter
}

function hideVocabPop() {
    // v7.13: corta quizzes/animaciones y montajes en curso de Hanzi Writer
    vpStrokes.gen++;
    vpStrokes.writers.forEach(wr => { try { if (wr.cancelQuiz) wr.cancelQuiz(); } catch (e) {} });
    vpStrokes.writers = [];
    vpStrokes.boxes = [];
    const pop = document.getElementById('vocab-pop');
    if (pop) pop.classList.add('hidden');
}

// ============================================================
// v7.13 — ORDEN DE TRAZOS con Hanzi Writer (librería MIT, chanind).
//  · Librería LOCAL (hanzi-writer.min.js, precacheada por el SW) que se
//    INYECTA solo la 1.ª vez que el popup muestra un hanzi → cero costo
//    inicial; si el archivo local falta, fallback al CDN de jsdelivr.
//  · Los datos de cada carácter (hanzi-writer-data, jsdelivr) los cachea
//    el Service Worker en caché PERSISTENTE → offline desde la 2.ª vez.
//  · Simplificado Y tradicional: el carácter viaja tal cual (el dataset
//    cubre ambos guiones) — vale el state.charType activo al abrir.
//  · Chars duplicados (妈妈) se muestran UNA vez; tope VP_STROKES_MAX.
// ============================================================
const VP_STROKES_MAX = 8;
const HANZI_WRITER_CDN = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
const vpStrokes = { libPromise: null, gen: 0, writers: [], boxes: [] };

function loadHanziWriter() {
    if (window.HanziWriter) return Promise.resolve();
    if (vpStrokes.libPromise) return vpStrokes.libPromise;
    vpStrokes.libPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'hanzi-writer.min.js?v=20260906j'; // local: el SW lo precachea → offline
        s.onload = () => resolve();
        s.onerror = () => {
            // Fallback CDN (mismo archivo): sin local y sin red → falla solo la
            // sección de trazos, el resto de la app sigue igual.
            const c = document.createElement('script');
            c.src = HANZI_WRITER_CDN;
            c.onload = () => resolve();
            c.onerror = () => { vpStrokes.libPromise = null; reject(new Error('Hanzi Writer no disponible')); };
            document.head.appendChild(c);
        };
        document.head.appendChild(s);
    });
    return vpStrokes.libPromise;
}

// Colores del trazo según tema (respeta body.dark-mode)
function vpStrokeColors() {
    const dark = document.body.classList.contains('dark-mode');
    return dark
        ? { stroke: '#e2e8f0', outline: '#475569', highlight: '#60a5fa', drawing: '#93c5fd' }
        : { stroke: '#1e293b', outline: '#cbd5e1', highlight: '#2563eb', drawing: '#2563eb' };
}

function mountVpStrokes(word) {
    const wrap = document.getElementById('vp-strokes');
    if (!wrap) return;
    const myGen = ++vpStrokes.gen; // invalida el montaje anterior si el popup reabre
    vpStrokes.writers = [];
    vpStrokes.boxes = [];
    loadHanziWriter().then(() => {
        if (myGen !== vpStrokes.gen) return; // el popup ya se cerró
        const size = (window.innerWidth <= 480) ? 100 : 120;
        const cols = vpStrokeColors();
        const targets = wrap.querySelectorAll('.vp-stroke-target');
        Array.prototype.forEach.call(targets, (target) => {
            const ch = target.dataset.char;
            const box = target.parentElement;
            if (!ch || !box) return;
            try {
                const writer = HanziWriter.create(target, ch, {
                    width: size,
                    height: size,
                    padding: 5,
                    showOutline: true,
                    strokeColor: cols.stroke,
                    outlineColor: cols.outline,
                    highlightColor: cols.highlight,
                    drawingColor: cols.drawing,
                    strokeAnimationSpeed: 1,
                    delayBetweenStrokes: 220,
                    showHintAfterMisses: 2,
                    onLoadCharDataSuccess: () => {
                        if (myGen === vpStrokes.gen) box.classList.remove('loading');
                    },
                    onLoadCharDataError: () => {
                        if (myGen !== vpStrokes.gen) return;
                        box.classList.remove('loading');
                        box.classList.add('nodata');
                    }
                });
                vpStrokes.writers.push(writer);
                vpStrokes.boxes.push(box);
            } catch (e) {
                box.classList.remove('loading');
                box.classList.add('nodata');
            }
        });
    }).catch(() => {
        if (myGen !== vpStrokes.gen) return;
        wrap.querySelectorAll('.vp-stroke-char').forEach(b => { b.classList.remove('loading'); b.classList.add('nodata'); });
        const note = document.createElement('div');
        note.className = 'vp-stroke-note';
        note.textContent = '⚠ No se pudo cargar el motor de trazos (¿sin conexión la primera vez?).';
        wrap.appendChild(note);
    });
}

// ▶ Animar: trazo a trazo, carácter por carácter en secuencia
function vpStrokesAnimate() {
    vpStrokes.boxes.forEach(b => b.classList.remove('quiz-on'));
    vpStrokes.writers.forEach(wr => { try { if (wr.cancelQuiz) wr.cancelQuiz(); } catch (e) {} });
    vpStrokes.writers.reduce(
        (p, wr) => p.then(() => wr.animateCharacter()).catch(() => {}),
        Promise.resolve()
    );
}

// ============================================================
// v7.16 — BANNER DE PRÁCTICA GRANDE (✍ Practicar del popup).
//  · Separación consulta / práctica: el popup queda para CONSULTAR
//    (traducción, pinyin, ejemplo y trazos en cuadros chicos con
//    ▶ Animar); la PRÁCTICA con el dedo va a un banner fullscreen
//    (#writer-practice-banner) con un lienzo de min(80vw, 340px).
//  · Reutiliza el motor v7.13: loadHanziWriter() (librería local +
//    fallback CDN), vpStrokeColors() (colores por tema) y la caché
//    persistente de datos por carácter (offline desde la 2.ª vez).
//  · Palabras de varios caracteres (爸爸, 谢谢) → navegación ◀ ▶ y
//    quiz secuencial: al completar un carácter avanza solo al
//    siguiente y arranca su quiz (misma "racha" que el v7.13).
//  · Generación wpPractice.gen: cerrar el banner o cambiar de
//    carácter invalida callbacks en vuelo (carga de datos, quiz,
//    animación) — mismo patrón que vpStrokes.gen del popup.
// ============================================================
const wpPractice = { gen: 0, word: '', chars: [], idx: 0, writer: null, pending: null, resizeT: null };

function wpSetHint(msg) {
    const h = document.getElementById('wp-hint');
    if (h) h.textContent = msg;
}

function wpUpdateNav() {
    const counter = document.getElementById('wp-counter');
    if (counter) counter.textContent = (wpPractice.idx + 1) + ' / ' + wpPractice.chars.length;
    const prev = document.getElementById('btn-wp-prev');
    if (prev) prev.disabled = wpPractice.idx === 0;
    const nxt = document.getElementById('btn-wp-next');
    if (nxt) nxt.disabled = wpPractice.idx >= wpPractice.chars.length - 1;
}

// Monta el carácter wpPractice.idx en el lienzo grande.
//  opts.quiz    → al cargar los datos arranca el quiz (racha del quiz)
//  opts.animate → al cargar los datos anima los trazos (guía visual)
function wpShowChar(opts) {
    opts = opts || {};
    const target = document.getElementById('wp-target');
    if (!target) return;
    const myGen = ++wpPractice.gen; // invalida montaje/callbacks anteriores
    wpPractice.pending = opts.quiz ? 'quiz' : (opts.animate ? 'animate' : null);
    const ch = wpPractice.chars[wpPractice.idx];
    if (!ch) return;
    if (wpPractice.writer) { try { wpPractice.writer.cancelQuiz(); } catch (e) {} }
    wpPractice.writer = null;
    target.innerHTML = ''; // nunca dos SVG montados (memoria)
    target.classList.add('loading');
    wpUpdateNav();
    loadHanziWriter().then(() => {
        if (myGen !== wpPractice.gen) return; // cerró el banner o cambió de char
        const cols = vpStrokeColors();
        const size = target.offsetWidth || 320; // el banner ya está visible
        try {
            wpPractice.writer = HanziWriter.create(target, ch, {
                width: size,
                height: size,
                padding: 16,
                showOutline: true,
                strokeColor: cols.stroke,
                outlineColor: cols.outline,
                highlightColor: cols.highlight,
                drawingColor: cols.drawing,
                strokeAnimationSpeed: 1,
                delayBetweenStrokes: 220,
                showHintAfterMisses: 2,
                onLoadCharDataSuccess: () => {
                    if (myGen !== wpPractice.gen) return;
                    target.classList.remove('loading');
                    if (wpPractice.pending === 'quiz') {
                        setTimeout(() => { if (myGen === wpPractice.gen) wpStartQuiz(myGen); }, 350);
                    } else if (wpPractice.pending === 'animate' && wpPractice.writer) {
                        wpPractice.writer.animateCharacter().catch(() => {});
                    }
                },
                onLoadCharDataError: () => {
                    if (myGen !== wpPractice.gen) return;
                    target.classList.remove('loading');
                    wpSetHint('⚠ No pude cargar los datos del carácter (¿sin conexión la primera vez?)');
                }
            });
        } catch (e) {
            target.classList.remove('loading');
            wpSetHint('⚠ No se pudo montar el carácter.');
        }
    }).catch(() => {
        if (myGen !== wpPractice.gen) return;
        target.classList.remove('loading');
        wpSetHint('⚠ No se pudo cargar el motor de trazos (¿sin conexión la primera vez?)');
    });
}

// ✍ Trazar: quiz del carácter actual con el dedo (o el mouse).
//  Al completar: si quedan caracteres → auto-avanza y encadena el
//  quiz; si era el último → mensaje de palabra completa.
function wpStartQuiz(myGen) {
    const wr = wpPractice.writer;
    if (!wr) return;
    if (typeof myGen === 'number' && myGen !== wpPractice.gen) return;
    try { wr.cancelQuiz(); } catch (e) {}
    // gen VIGENTE al arrancar el quiz: el botón ✍ Trazar llama sin myGen
    // (undefined) → el guard del closure compara contra este valor, nunca
    // contra el parámetro (undefined !== gen era SIEMPRE true y el
    // auto-avance onComplete no se ejecutaba jamás — bug cazado por el E2E).
    const gen = typeof myGen === 'number' ? myGen : wpPractice.gen;
    const total = wpPractice.chars.length;
    const i = wpPractice.idx;
    wpSetHint(total > 1
        ? '✍ Trazá «' + wpPractice.chars[i] + '» con el dedo (' + (i + 1) + ' de ' + total + ')'
        : '✍ Trazá con el dedo sobre el carácter gris');
    wr.quiz({
        onComplete: () => {
            if (gen !== wpPractice.gen) return; // cerró o navegó mientras tanto
            if (i < total - 1) {
                wpPractice.idx++;
                wpSetHint('👏 ¡Bien! Ahora «' + wpPractice.chars[wpPractice.idx] + '» (' + (wpPractice.idx + 1) + ' de ' + total + ')');
                wpShowChar({ quiz: true }); // racha: monta el siguiente y arranca su quiz
            } else {
                wpSetHint('🎉 ¡«' + wpPractice.word + '» completa! Repasá con ▶ Animar o volvé a ✍ Trazar.');
            }
        }
    });
}

// ◀ ▶ navegación manual entre los caracteres de la palabra
function wpNavStep(dir) {
    const next = wpPractice.idx + dir;
    if (next < 0 || next >= wpPractice.chars.length) return;
    wpPractice.idx = next;
    wpShowChar({ animate: true }); // navegar = ver cómo se escribe
}

// Punto de entrada (delegación .vp-stroke-quiz del popup): cierra la
// consulta y abre el banner con los caracteres únicos de la palabra.
function openWriterPractice(word) {
    const w = String(word || '').trim();
    const chars = [];
    for (const ch of w) if (READER_HANZI.test(ch) && chars.indexOf(ch) === -1) chars.push(ch);
    const banner = document.getElementById('writer-practice-banner');
    if (!chars.length || !banner) {
        moduleStatus('ℹ️ Tocá una palabra china para practicar sus trazos.', true);
        return;
    }
    hideVocabPop(); // primero se cierra el popup de consulta
    wpPractice.gen++;
    wpPractice.word = w;
    wpPractice.chars = chars.slice(0, VP_STROKES_MAX); // mismo tope que el popup
    wpPractice.idx = 0;
    wpPractice.pending = null;
    const title = document.getElementById('wp-title');
    if (title) title.textContent = 'Practicar: ' + w;
    const nav = document.getElementById('wp-nav');
    if (nav) nav.classList.toggle('hidden', wpPractice.chars.length < 2);
    banner.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // fullscreen: sin scroll detrás
    wpShowChar({ animate: true }); // guía: anima el primer carácter al abrir
}

function closeWriterPractice() {
    wpPractice.gen++; // invalida callbacks en vuelo (carga, quiz, animación)
    if (wpPractice.writer) { try { wpPractice.writer.cancelQuiz(); } catch (e) {} }
    wpPractice.writer = null;
    const banner = document.getElementById('writer-practice-banner');
    if (banner) banner.classList.add('hidden');
    const target = document.getElementById('wp-target');
    if (target) target.innerHTML = ''; // libera el SVG
    document.body.style.overflow = ''; // restaura el scroll de la app
}

function resetProgress() {
    if (!confirm('¿Borrar todo el progreso guardado?')) return;
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window.acSrsReset === 'function') window.acSrsReset(); // v7.21: el mazo de repaso también se borra
    state.knownWords = new Set();
    state.newWords = new Set();
    state.wordContexts = {}; // v7.13
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
        // v7.14: timeout escalado con el largo — una lección completa tarda
        // más de 15 s en sintetizarse (15 s base + 50 ms por carácter).
        const response = await fetchTTS({ text, lang: langCode, voice: gender }, Math.max(15000, text.length * 50));
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

// ===== v7.14/v7.15: LEER LA LECCIÓN COMPLETA + BIBLIOTECA =====
// Los textos viven en lessons.js (archivo plano de datos, patrón
// dict-mini.js) — agregar lecciones o secciones nuevas NO toca app.js:
// solo se agrega una entrada al array de LESSONS_DATA.
// Mapeo oración → lección:
//   · L.ids contiene s.id    → SECCIÓN / capítulo (coincidencia
//     específica — v7.15: GANA sobre el módulo entero)
//   · L.module === s.module  → el módulo entero es la lección
//   · L.status === 'planned' → plantada sin texto: solo Biblioteca
function lessonForSentence(s) {
    if (!s || typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) return null;
    const list = LESSONS_DATA.lessons;
    let exact = null, broad = null;
    for (let i = 0; i < list.length; i++) {
        const L = list[i];
        if (L.status === 'planned') continue; // plantada: sin texto, solo Biblioteca
        if (Array.isArray(L.ids) && L.ids.indexOf(s.id) !== -1) {
            if (!exact) exact = L;
        } else if (L.module && s.module === L.module) {
            if (!broad) broad = L;
        }
    }
    return exact || broad; // la sección (específica) gana sobre el módulo
}

// v7.15: vuelca el texto de una lección/sección en el Lector y avisa.
// Devuelve true si cargó texto (las plantadas avisan y devuelven false).
function fillReaderWithLesson(lesson) {
    const k = ck();
    const text = (k === 'trad' ? (lesson.text_trad || lesson.text_simp)
                               : (lesson.text_simp || lesson.text_trad)) || '';
    if (!text) {
        moduleStatus('📝 "' + (lesson.title || lesson.id) + '" todavía no tiene texto — está plantada para rellenar.');
        return false;
    }

    const ta = document.getElementById('reader-input');
    if (!ta) return false;

    stopReader(); // regla "un solo audio" — si el lector estaba sonando, se corta
    ta.value = text;
    if (typeof updateReaderLang === 'function') updateReaderLang();
    if (typeof renderReaderPreview === 'function') renderReaderPreview();

    // Bajar al lector + destello para que se entienda de dónde salió el texto
    const banner = document.getElementById('reader-banner');
    if (banner && banner.scrollIntoView) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
        banner.classList.remove('lesson-glow');
        void banner.offsetWidth; // reinicia la animación si ya estaba
        banner.classList.add('lesson-glow');
        setTimeout(() => banner.classList.remove('lesson-glow'), 2500);
    }

    const chars = text.replace(/\n/g, '').length;
    moduleStatus('📖 Leyendo: ' + (lesson.title || lesson.id) + ' · ' + chars + ' caracteres en el Lector');
    return true;
}

// Carga el texto de la lección/sección de la oración actual en el Lector
// (pinyin interlineal, tonos, diccionario al toque y lectura en voz alta).
async function readCurrentLesson() {
    if (state.mode !== 'es-cn') {
        moduleStatus('ℹ️ La lectura completa está disponible en modo "Aprendo Chino".');
        return;
    }
    const filtered = getFiltered();
    const s = filtered && filtered[state.currentIndex];
    if (!s) return;

    // v9.2: los CLÁSICOS abren su lector propio (texto original por bloques,
    // como las lecciones) en el bloque donde vive la frase practicada — ya no
    // vuelcan la concatenación de oraciones de práctica en el Lector.
    if (s.module && String(s.module).indexOf('Clasicos-') === 0 && typeof window.CR_open === 'function') {
        if (window.CR_open(s.module, s)) return;
    }

    if (typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) {
        moduleStatus('⚠ No se pudo cargar lessons.js — revisá que el archivo esté subido.', true);
        return;
    }

    const lesson = lessonForSentence(s);
    if (!lesson) {
        moduleStatus('ℹ️ Esta oración no pertenece a un texto continuo.');
        return;
    }

    fillReaderWithLesson(lesson);
}

// ===== v7.15: BIBLIOTECA DE LECTURAS (en el Lector) =====
// Un <select> + botón Cargar: cualquier lectura o sección de lessons.js
// se puede leer SIN estar estudiando ese módulo. Las plantadas
// (status 'planned') aparecen como "· próximamente" deshabilitadas.
function buildReaderLibrary() {
    const sel = document.getElementById('reader-library');
    if (!sel) return;
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = '';
    ph.textContent = '📚 Elegí una lectura…';
    sel.appendChild(ph);

    if (typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) {
        sel.disabled = true;
        return;
    }
    sel.disabled = false;

    // Orden del archivo = orden del autor; un óptgroup por 'group'
    const groups = [];
    const byGroup = {};
    LESSONS_DATA.lessons.forEach(L => {
        const g = L.group || 'Lecturas';
        if (!byGroup[g]) { byGroup[g] = []; groups.push(g); }
        byGroup[g].push(L);
    });
    groups.forEach(g => {
        const og = document.createElement('optgroup');
        og.label = g;
        byGroup[g].forEach(L => {
            const o = document.createElement('option');
            o.value = L.id;
            if (L.status === 'planned') {
                o.disabled = true;
                o.textContent = (L.label || L.title) + ' · próximamente';
            } else if (L.module && String(L.module).indexOf('Clasicos-') === 0) {
                // v9.2: los clásicos abren el lector de clásicos (texto original)
                o.textContent = '📖 Leer el texto original (lector de clásicos)';
            } else {
                o.textContent = L.label || L.title;
            }
            og.appendChild(o);
        });
        sel.appendChild(og);
    });
}

// Carga en el Lector la lectura elegida en la Biblioteca
function loadLibraryLesson() {
    const sel = document.getElementById('reader-library');
    if (!sel || !sel.value) {
        moduleStatus('📚 Elegí una lectura de la Biblioteca primero.');
        return;
    }
    if (typeof LESSONS_DATA === 'undefined' || !LESSONS_DATA || !LESSONS_DATA.lessons) {
        moduleStatus('⚠ No se pudo cargar lessons.js — revisá que el archivo esté subido.', true);
        return;
    }
    let L = null;
    for (let i = 0; i < LESSONS_DATA.lessons.length; i++) {
        if (LESSONS_DATA.lessons[i].id === sel.value) { L = LESSONS_DATA.lessons[i]; break; }
    }
    if (!L) {
        moduleStatus('⚠ No encontré esa lectura en lessons.js.', true);
        return;
    }
    // v9.2: los clásicos de la Biblioteca abren el lector de clásicos
    // (texto original por bloques) — los textos viejos de lessons.js eran
    // la concatenación de oraciones de práctica.
    if (L.module && String(L.module).indexOf('Clasicos-') === 0 && typeof window.CR_open === 'function') {
        window.CR_open(L.module);
        return;
    }
    fillReaderWithLesson(L);
}

// ===== Lector: vista previa con pinyin y colores de tono =====
// Reutiliza los toggles 📖 Pinyin y 🎨 Tonos de la app (y pinyin-pro)
function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===== v7.9: LECTOR INTERLINEAL =====
// Cambios clave vs v7.8 (dos filas planas pinyin/hanzi):
//  1. El texto chino se renderiza POR PALABRA (Intl.Segmenter): cada hanzi
//     lleva su pinyin DEBAJO (columnas ruby interlineales, como libro de texto).
//  2. Cada palabra es TOCABLE → abre el popup de vocabulario (#vocab-pop, el
//     mismo del cajón de palabras aprendidas). Base para Opción B/C.
//  3. Los toggles siguen mandando: 📖 Pinyin OFF oculta la fila de abajo;
//     🎨 Tonos ON colorea hanzi y pinyin (clases tone-1..5 existentes).
//  4. El pinyin se calcula POR SEGMENTO (no sobre el texto completo): la
//     alineación carácter↔pinyin queda garantizada dentro de cada palabra y
//     desaparece el problema de sincronizar el array global de pinyin-pro
//     con los límites de palabra del Segmenter. Cache por palabra: pinyin-pro
//     es lookup de diccionario y las palabras repetidas dominan el texto real.
const _readerPyCache = new Map();   // segmento → items|null (memoria de sesión)
// Puntuación que NO debe arrancar renglón: se pega dentro de la palabra anterior
const READER_STICKY = /[，。！？、；：…—·（）()《》〈〉「」『』,.!?;:]/;

function readerSegmentLine(line) {
    // Palabras naturales del chino (你好 = 1 palabra); fallback: carácter a carácter.
    // v7.10: comparte la ÚNICA instancia de Intl.Segmenter con el diccionario.
    const seg = getZhSegmenter();
    if (seg) {
        try { return Array.from(seg.segment(line), s => s.segment); } catch (e) { /* cae al fallback */ }
    }
    return Array.from(line);
}

function readerPinyinItems(word) {
    // items 1:1 con los caracteres del segmento: [{origin, pinyin, num, isZh}, ...]
    if (_readerPyCache.has(word)) return _readerPyCache.get(word);
    let items = null;
    try {
        if (typeof pinyinPro !== 'undefined' && READER_HANZI.test(word)) {
            const all = pinyinPro.pinyin(word, { type: 'all' });
            if (all && all.length) items = all;
        }
    } catch (e) { items = null; }
    _readerPyCache.set(word, items);
    return items;
}

function readerWordCols(word, wantPinyin, wantTones) {
    // Columnas ruby de una palabra; si items no aligna 1:1 → degrada a sin pinyin
    const items = (wantPinyin || wantTones) ? readerPinyinItems(word) : null;
    const chars = Array.from(word);
    const useItems = !!(items && items.length === chars.length);
    let cols = '';
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const it = useItems ? items[i] : null;
        const isZhChar = !!(it && it.isZh);
        const toneCls = (wantTones && isZhChar) ? ' tone-' + (it.num || 5) : '';
        let col = '<span class="ruby-col"><span class="ruby-char' + toneCls + '">' + escHtml(ch) + '</span>';
        if (wantPinyin && isZhChar) col += '<span class="ruby-py' + toneCls + '">' + escHtml(it.pinyin || ch) + '</span>';
        col += '</span>';
        cols += col;
    }
    return cols;
}

function renderZhLineHtml(line, wantPinyin, wantTones) {
    const segs = readerSegmentLine(line);
    const out = [];
    let lastWord = null;    // palabra en construcción (para pegarle puntuación)
    const flush = () => {
        if (!lastWord) return;
        out.push('<span class="reader-word" data-word="' + escHtml(lastWord.text) + '">'
            + lastWord.cols + lastWord.punct + '</span>');
        lastWord = null;
    };

    for (const seg of segs) {
        if (!seg) continue;
        if (READER_HANZI.test(seg)) {
            flush();
            lastWord = { text: seg, cols: readerWordCols(seg, wantPinyin, wantTones), punct: '' };
        } else if (lastWord && seg.length === 1 && READER_STICKY.test(seg)) {
            // puntuación pegada a la palabra anterior (columna propia, sin pinyin)
            lastWord.punct += '<span class="ruby-col ruby-punct"><span class="ruby-char">' + escHtml(seg) + '</span></span>';
        } else {
            flush();
            out.push('<span class="reader-non-zh">' + escHtml(seg) + '</span>');
        }
    }
    flush();
    return out.join('');
}

// v7.10: tokeniza una línea en ESPAÑOL envolviendo cada palabra en un span
// tocable (.reader-word-plain = mismo popup, visual plano sin ruby).
// Los números solos quedan como texto (no hay nada que traducir).
function readerEsLineHtml(line) {
    let out = '';
    let last = 0;
    const re = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g;
    let m;
    while ((m = re.exec(line))) {
        if (m.index > last) out += escHtml(line.slice(last, m.index));
        out += '<span class="reader-word reader-word-plain" data-word="' + escHtml(m[0]) + '">' + escHtml(m[0]) + '</span>';
        last = m.index + m[0].length;
    }
    out += escHtml(line.slice(last));
    return out;
}

function renderReaderPreview() {
    const prev = document.getElementById('reader-preview');
    if (!prev) return;
    const ta = document.getElementById('reader-input');
    const text = (ta && ta.value ? ta.value : '').trim();
    const wantPinyin = state.showPinyin;
    const wantTones = showToneColors;

    // Sin texto → placeholder (el box se descubre desde el arranque)
    if (!text) {
        prev.innerHTML = '<span class="reader-placeholder">Pegá texto chino o español acá… con chino verás el pinyin debajo de cada carácter y podés tocar cualquier palabra.</span>';
        prev.classList.remove('hidden');
        return;
    }

    // Español / no-chino → texto plano con saltos; SIN ruby pero con palabras
    // tocables (v7.10): el mismo popup de vocabulario sirve también en CN→ES.
    if (detectReaderLang(text) !== 'zh') {
        prev.innerHTML = '<div class="reader-es">' + text.split('\n').map(readerEsLineHtml).join('<br>') + '</div>';
        prev.classList.remove('hidden');
        return;
    }

    // Chino sin librería (CDN caído y sin precache) → plano legible, nunca romper
    if (typeof pinyinPro === 'undefined') {
        prev.innerHTML = '<div class="reader-hz">' + escHtml(text).replace(/\n/g, '<br>') + '</div>';
        prev.classList.remove('hidden');
        return;
    }

    try {
        prev.innerHTML = text.split('\n').map(l =>
            '<div class="reader-line">' + (l ? renderZhLineHtml(l, wantPinyin, wantTones) : '&nbsp;') + '</div>'
        ).join('');
        prev.classList.remove('hidden');
    } catch (e) {
        console.warn('Lector: error renderizando interlineal:', e);
        prev.innerHTML = '<div class="reader-hz">' + escHtml(text).replace(/\n/g, '<br>') + '</div>';
        prev.classList.remove('hidden');
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
        applyToneScheme(); // v7.11: los esquemas preset tienen variante oscura (Okabe-Ito)
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

// ============================================================
// ✍️ Generador de planillas de escritura 写字 (v6.5)
// Hoja A4 para imprimir con el formato XieZi: celda modelo +
// secuencia de trazos progresivos (gris) + celdas vacías con
// cruz guía. Datos de trazos: hanzi-writer-data vía CDN —
// el Service Worker los cachea → funcionan offline después
// del primer uso. Sin datos de red, la hoja se genera igual
// (carácter modelo con la fuente del sistema).
// ============================================================
const PZ_MEM = new Map();               // char → datos|null (memoria de sesión)
let pzTrazos = localStorage.getItem('ac_pz_trazos') !== '0';   // default ON
// v9.1: estilo de hoja — 'clasica' (de siempre) o 'cuaderno' (筆順 + 寫字 como la referencia)
let pzStyle = localStorage.getItem('ac_pz_style') === 'cuaderno' ? 'cuaderno' : 'clasica';
let pzCells = parseInt(localStorage.getItem('ac_pz_cells'), 10) || 12;
let pzLastSheet = '';                   // HTML de la última hoja generada

function pzIsHan(ch) {
    const c = ch.codePointAt(0);
    return (c >= 0x3400 && c <= 0x9FFF) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0x20000 && c <= 0x2FA1F);
}

// Extrae caracteres han únicos (en orden de aparición), tope 40 por hoja
function pzParseInput(str) {
    const seen = new Set();
    const out = [];
    for (const ch of String(str || '')) {
        if (!pzIsHan(ch) || seen.has(ch)) continue;
        seen.add(ch);
        out.push(ch);
        if (out.length >= 40) break;
    }
    return out;
}

// Descarga los datos de trazos de un carácter (2 CDNs de respaldo)
async function pzFetchChar(ch) {
    if (PZ_MEM.has(ch)) return PZ_MEM.get(ch);
    const urls = [
        'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/' + ch + '.json',
        'https://unpkg.com/hanzi-writer-data@2.0/' + ch + '.json'
    ];
    for (const u of urls) {
        try {
            const r = await fetch(u, { mode: 'cors' });
            if (r.ok) {
                const d = await r.json();
                if (d && Array.isArray(d.strokes) && d.strokes.length) {
                    PZ_MEM.set(ch, d);
                    return d;
                }
            }
        } catch (e) { /* probá el próximo CDN */ }
    }
    PZ_MEM.set(ch, null);
    return null;
}

// SVG del carácter con los primeros `upto` trazos (formato Make Me a Hanzi).
// v9.1: lastFill pinta el TRAZO NUEVO de cada etapa más oscuro — se ve qué
// trazo se agrega (antes todas las etapas eran el mismo gris clarito).
function pzSvg(data, upto, fill, lastFill) {
    const n = data.strokes.length;
    const k = Math.max(1, Math.min(upto || n, n));
    let paths = '';
    for (let i = 0; i < k; i++) {
        const f = (lastFill && i === k - 1 && k > 1) ? lastFill : fill;
        paths += '<path d="' + data.strokes[i] + '" fill="' + f + '"/>';
    }
    // width/height explícitos: el CSS de la celda los pisa (86%), pero
    // html2canvas necesita tamaño intrínseco para rasterizar el SVG.
    return '<svg viewBox="0 0 1024 1024" width="1024" height="1024" aria-hidden="true"><g transform="scale(1, -1) translate(0, -900)">' + paths + '</g></svg>';
}

function pzStatus(msg, isError) {
    const el = document.getElementById('pz-status');
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
    el.classList.toggle('hidden', !msg);
}

// Colores v9.1: etapas previas MÁS OSCURAS que antes (#c9ced6 → #a0a6ae) y el
// trazo nuevo aún más oscuro (#47505c) — antes en impresoras con poca tinta
// casi no se notaba. Renglones verdes más finos: borde 0.5→0.3mm, cruz 0.4→0.22mm.
const PZ_PREV_FILL = '#a0a6ae';   // trazos ya escritos en la etapa
const PZ_CUR_FILL = '#47505c';    // el trazo nuevo de la etapa
const PZ_TRACE_FILL = '#b5d6c4';  // calco verde suave (fila 寫字 del estilo cuaderno)

// CSS autocontenido de la hoja (verde estilo XieZi, A4)
const PZ_SHEET_CSS = [
    '@page { size: A4; margin: 11mm; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { font-family: "Segoe UI", Arial, "Helvetica Neue", sans-serif; background: #fff; }',
    '@media screen { body { padding: 9mm; } }',
    '.pz-title { font-size: 15pt; font-weight: 700; color: #16a085; margin-bottom: 2.5mm; }',
    '.pz-title .pz-hz span { margin: 0 1.5mm; }',
    '.pz-meta { font-size: 9pt; color: #475569; border-bottom: 0.5mm solid #16a085; padding-bottom: 2mm; margin-bottom: 3.5mm; }',
    '.pz-row { display: flex; gap: 1.2mm; margin-bottom: 1.8mm; break-inside: avoid; page-break-inside: avoid; }',
    '.pz-cell { flex: 1 1 0; aspect-ratio: 1 / 1; border: 0.3mm solid #2f9e77; position: relative; overflow: hidden; }',
    '.pz-cell::before { content: ""; position: absolute; inset: 0; background:',
    '  repeating-linear-gradient(to right, transparent 0 2.4mm, #a7d9c4 2.4mm 4.4mm) center / 100% 0.22mm no-repeat,',
    '  repeating-linear-gradient(to bottom, transparent 0 2.4mm, #a7d9c4 2.4mm 4.4mm) center / 0.22mm 100% no-repeat; }',
    '.pz-cell svg, .pz-cell span.pz-glyph { position: absolute; left: 7%; top: 7%; width: 86%; height: 86%; display: block; }',
    '.pz-cell span.pz-glyph { display: flex; align-items: center; justify-content: center; font-size: 42pt; line-height: 1; color: #1f2937;',
    '  font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "WenQuanYi Zen Hei", sans-serif; }',
    '.pz-cell svg path { stroke-linejoin: round; }',
    '.pz-note { font-size: 8pt; color: #b45309; margin-top: 3mm; }',
    // ── v9.1 estilo CUADERNO (筆順 + 寫字, como el modelo de la referencia) ──
    '.pz2-block { display: grid; grid-template-columns: 24mm 17mm 1fr; gap: 2.5mm 2.5mm; align-items: center;',
    '  margin-bottom: 4mm; break-inside: avoid; page-break-inside: avoid; }',
    '.pz2-card { grid-row: span 2; border: 0.3mm solid #64748b; border-radius: 1.5mm; padding: 2mm 1mm;',
    '  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5mm; min-height: 24mm; }',
    '.pz2-card .pz2-hz svg { width: 17mm; height: 17mm; display: block; }',
    '.pz2-card .pz2-hz span.pz2-fallback { font-size: 30pt; line-height: 1; color: #1f2937;',
    '  font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "WenQuanYi Zen Hei", sans-serif; }',
    '.pz2-card .pz2-py { font-size: 9pt; color: #475569; }',
    '.pz2-lab { font-size: 7.5pt; color: #475569; text-align: center; line-height: 1.3; }',
    '.pz2-lab b { display: block; font-size: 10pt; color: #16a085; }',
    '.pz2-strokes { display: flex; flex-wrap: wrap; gap: 0.6mm; align-items: center; }',
    '.pz2-strokes svg { width: 9.5mm; height: 9.5mm; display: block; }',
    '.pz2-cells { display: flex; gap: 1.2mm; }',
    '.pz2-cells .pz-cell { flex: 1 1 0; }'
].join('\n');

// Pinyin por carácter (mapa perezoso desde las tuplas HSK 3.0 + TOCFL embebidas)
let _pzPyMap = null;
function pzPinyinOf(ch) {
    if (!_pzPyMap) {
        _pzPyMap = {};
        try {
            for (const key in EMBEDDED_MODULE_DATA) {
                const rows = EMBEDDED_MODULE_DATA[key];
                if (!Array.isArray(rows)) continue;
                for (const r of rows) {
                    if (Array.isArray(r) && r[0] && r[0].length === 1 && r[2] && !_pzPyMap[r[0]]) {
                        _pzPyMap[r[0]] = String(r[2]).split('(')[0].trim();
                    }
                }
            }
        } catch (e) { _pzPyMap = {}; }
    }
    return _pzPyMap[ch] || '';
}

function pzSheetHTML(chars, datas, trazos, cells, style) {
    const fecha = new Date().toLocaleDateString('es-AR');
    const C = Math.min(20, Math.max(6, parseInt(cells, 10) || 12));
    const esCuaderno = (style === 'cuaderno');
    if (esCuaderno) {
        // ── estilo CUADERNO (v9.1): tarjeta del carácter + fila 筆順
        // (Orden de los trazos, progresión sin casilleros) + fila 寫字
        // (calco + casilleros) — como el modelo de la referencia. ──
        let blocks = '';
        chars.forEach((ch, i) => {
            const d = datas[i];
            const py = pzPinyinOf(ch);
            const hz = d
                ? pzSvg(d, d.strokes.length, '#1f2937')
                : '<span class="pz2-fallback">' + ch + '</span>';
            const trazosHtml = (trazos && d)
                ? (() => {
                    const n = d.strokes.length;
                    let s = '';
                    for (let k = 1; k <= n; k++) {
                        s += pzSvg(d, k, PZ_PREV_FILL, PZ_CUR_FILL);
                    }
                    s += pzSvg(d, n, '#c9ced6'); // el carácter completo en gris, como el modelo
                    return '<div class="pz2-strokes">' + s + '</div>';
                })()
                : '<div class="pz2-strokes"><span class="pz-glyph" style="position:static;font-size:18pt;color:#94a3b8;">—</span></div>';
            const boxes = Math.max(4, C);
            let cellsHtml = '';
            for (let b = 0; b < boxes; b++) {
                const traced = (trazos && d && b < 3) ? pzSvg(d, d.strokes.length, PZ_TRACE_FILL) : '';
                cellsHtml += '<div class="pz-cell">' + traced + '</div>';
            }
            blocks += '<div class="pz2-block">'
                + '<div class="pz2-card"><div class="pz2-hz">' + hz + '</div>'
                + (py ? '<div class="pz2-py">' + py + '</div>' : '') + '</div>'
                + '<div class="pz2-lab"><b>筆順</b>Orden de los trazos</div>'
                + trazosHtml
                + '<div class="pz2-lab"><b>寫字</b>Practicar</div>'
                + '<div class="pz2-cells">' + cellsHtml + '</div>'
                + '</div>';
        });
        const hz2 = chars.map((c) => '<span>' + c + '</span>').join(' ');
        return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Planilla de práctica 写字</title>'
            + '<style>' + PZ_SHEET_CSS + '</style></head><body>'
            + '<div class="pz-title">Planilla de práctica · Caracteres <span class="pz-hz">' + hz2 + '</span></div>'
            + '<div class="pz-meta">Nombre: ____________________________ &nbsp;&nbsp; Curso: ______________ &nbsp;&nbsp; Fecha: ' + fecha + '</div>'
            + blocks + '</body></html>';
    }
    let rows = '';
    chars.forEach((ch, i) => {
        const d = datas[i];
        // Contenido del bloque del carácter: modelo + etapas de trazos
        const celdas = ['<div class="pz-cell">' + (d ? pzSvg(d, d.strokes.length, '#1f2937') : '<span class="pz-glyph">' + ch + '</span>') + '</div>'];
        if (trazos && d) {
            const n = d.strokes.length;
            // v9.1: el trazo NUEVO de cada etapa va más oscuro — se ve qué trazo se agrega
            for (let k = 1; k <= n; k++) celdas.push('<div class="pz-cell">' + pzSvg(d, k, PZ_PREV_FILL, PZ_CUR_FILL) + '</div>');
        }
        // Todas las filas de la hoja tienen EXACTAMENTE C celdas → tamaño
        // uniforme (en v6.5 un carácter de 20 trazos agrandaba la fila y
        // se mezclaban cuadrados grandes y diminutos). Siempre quedan al
        // menos 2 celdas vacías para practicar.
        const base = celdas.length;
        const filas = Math.ceil((base + 2) / C);
        const total = filas * C;
        while (celdas.length < total) celdas.push('<div class="pz-cell"></div>');
        for (let r = 0; r < total; r += C) {
            rows += '<div class="pz-row">' + celdas.slice(r, r + C).join('') + '</div>';
        }
    });
    const faltan = chars.filter((c, i) => !datas[i]);
    const nota = faltan.length ? '<p class="pz-note">Sin datos de trazos para: ' + faltan.join(' ') + ' — el carácter modelo usa la fuente del sistema.</p>' : '';
    const hz = chars.map((c) => '<span>' + c + '</span>').join(' ');
    return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Planilla de práctica 写字</title>'
        + '<style>' + PZ_SHEET_CSS + '</style></head><body>'
        + '<div class="pz-title">Planilla de práctica · Caracteres <span class="pz-hz">' + hz + '</span></div>'
        + '<div class="pz-meta">Nombre: ____________________________ &nbsp;&nbsp; Curso: ______________ &nbsp;&nbsp; Fecha: ' + fecha + '</div>'
        + rows + nota + '</body></html>';
}

async function pzGenerate() {
    const ta = document.getElementById('pz-input');
    const chars = pzParseInput(ta ? ta.value : '');
    if (!chars.length) {
        pzStatus('✍️ Escribí primero los caracteres a practicar (ej.: 你是哪国人)', true);
        return;
    }
    const btn = document.getElementById('btn-pz-generate');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Generando…'; }
    pzStatus('⏳ Descargando trazos (0/' + chars.length + ')…');
    const datas = new Array(chars.length).fill(null);
    let done = 0;
    await Promise.all(chars.map(async (ch, i) => {
        datas[i] = await pzFetchChar(ch);
        done++;
        pzStatus('⏳ Descargando trazos (' + done + '/' + chars.length + ')…');
    }));
    pzLastSheet = pzSheetHTML(chars, datas, pzTrazos, pzCells, pzStyle);
    pzRenderPreview();
    pzCounterRender(); // v9.2: con datos reales el contador es exacto
    ['btn-pz-pdf', 'btn-pz-print'].forEach((id) => {
        const b = document.getElementById(id);
        if (b) b.classList.remove('hidden');
    });
    const faltan = datas.filter((d) => !d).length;
    pzStatus(faltan
        ? '⚠ Hoja lista, pero sin datos de trazos para ' + faltan + ' carácter(es) (¿sin conexión la primera vez?). Se usa el modelo del sistema.'
        : '✅ Hoja lista (' + chars.length + ' caracteres). Tocá ⬇️ Descargar PDF.');
    if (btn) { btn.disabled = false; btn.textContent = '📄 Generar hoja'; }
}

// Vista previa: iframe escalado al ancho disponible
function pzRenderPreview() {
    const wrap = document.getElementById('pz-preview');
    if (!wrap || !pzLastSheet) return;
    wrap.classList.remove('hidden');
    let f = wrap.querySelector('iframe');
    if (!f) {
        f = document.createElement('iframe');
        f.title = 'Vista previa de la planilla';
        wrap.appendChild(f);
    }
    f.srcdoc = pzLastSheet;
    f.onload = () => pzFitPreview();
}

function pzFitPreview() {
    const wrap = document.getElementById('pz-preview');
    if (!wrap) return;
    const f = wrap.querySelector('iframe');
    if (!f) return;
    try {
        const doc = f.contentDocument;
        if (!doc || !doc.body) return;
        const W = 794; // 210mm a 96dpi
        const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 1123);
        const scale = Math.min(1, wrap.clientWidth / W);
        f.style.width = W + 'px';
        f.style.height = h + 'px';
        f.style.transform = 'scale(' + scale + ')';
        wrap.style.height = Math.ceil(h * scale) + 'px';
    } catch (e) { /* vista previa es best-effort */ }
}

// ============================================================
// v7.1 — Descargar PDF directo (SIN abrir el diálogo de impresora)
// html2canvas rasteriza la hoja (SVGs incluidos) y jsPDF la envuelve
// en páginas A4. Libs LOCALES al repo (offline tras el 1er uso: el
// SW las precachea) y de carga PEREZOSA (no penalizan el arranque).
// ============================================================
function pzLoadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('No se pudo cargar ' + src));
        document.head.appendChild(s);
    });
}

async function pzEnsurePdfLibs() {
    if (!window.html2canvas) await pzLoadScript('html2canvas.min.js');
    if (!(window.jspdf && window.jspdf.jsPDF)) await pzLoadScript('jspdf.umd.min.js');
}

// CSS de la hoja re-escopado al holder: las reglas globales de la hoja
// (*, body, @page) no deben tocar el resto de la app.
function pzHolderCss() {
    return PZ_SHEET_CSS
        .replace('@page { size: A4; margin: 11mm; }', '')
        .replace('* { box-sizing: border-box; margin: 0; padding: 0; }',
                 '#pz-pdf-holder, #pz-pdf-holder * { box-sizing: border-box; margin: 0; padding: 0; }')
        .replace(/body \{[^}]*\}/g, '')
        .replace('@media screen {  }', '');
}

async function pzDownloadPDF() {
    if (!pzLastSheet) return;
    const btn = document.getElementById('btn-pz-pdf');
    try {
        if (btn) btn.disabled = true;
        await pzEnsurePdfLibs();
        pzStatus('⏳ Generando PDF…');

        // Holder fuera de pantalla: 794px = A4 a 96dpi; padding 42px ≈ 11mm
        // (igual que el margen @page de la versión impresa).
        const doc = new DOMParser().parseFromString(pzLastSheet, 'text/html');
        const holder = document.createElement('div');
        holder.id = 'pz-pdf-holder';
        holder.style.cssText = 'position:fixed;left:-12000px;top:0;width:794px;'
            + 'background:#fff;font-family:"Segoe UI",Arial,"Helvetica Neue",sans-serif;padding:42px;';
        const st = document.createElement('style');
        // .pz-cell usa aspect-ratio (que html2canvas no soporta) → alto
        // explícito = mismo cuadrado que en pantalla/impresión.
        const C = Math.min(20, Math.max(6, parseInt(pzCells, 10) || 12));
        const GAP = 1.2 * 96 / 25.4;
        const cw = (794 - 84 - (C - 1) * GAP) / C;
        // Guía en cruz de cada celda: el ::before original usa un shorthand
        // repeating-linear-gradient que html2canvas no pinta → equivalente
        // con gradientes simples (línea sólida 0.22mm horizontal + vertical,
        // v9.1: más finita igual que la hoja impresa).
        const mm = (x) => (x * 96 / 25.4).toFixed(2) + 'px';
        st.textContent = pzHolderCss() + '.pz-cell{height:' + cw.toFixed(2) + 'px;}'
            + '#pz-pdf-holder .pz-cell::before{content:"";position:absolute;inset:0;'
            + 'background-image:linear-gradient(#a7d9c4,#a7d9c4),linear-gradient(#a7d9c4,#a7d9c4);'
            + 'background-size:100% ' + mm(0.22) + ',' + mm(0.22) + ' 100%;'
            + 'background-position:0 50%,50% 0;background-repeat:no-repeat,no-repeat;}';
        holder.appendChild(st);
        while (doc.body.firstChild) holder.appendChild(doc.body.firstChild);
        document.body.appendChild(holder);

        const canvas = await window.html2canvas(holder, { scale: 2, backgroundColor: '#ffffff', logging: false });
        holder.remove();

        // Troceo en páginas A4 (1123px × escala 2) con fondo blanco
        const A4H = 1123 * 2;
        const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        const paginas = Math.max(1, Math.ceil(canvas.height / A4H));
        for (let p = 0; p < paginas; p++) {
            const h = Math.min(A4H, canvas.height - p * A4H);
            const c2 = document.createElement('canvas');
            c2.width = canvas.width; c2.height = A4H;
            const ctx = c2.getContext('2d');
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c2.width, c2.height);
            ctx.drawImage(canvas, 0, p * A4H, canvas.width, h, 0, 0, canvas.width, h);
            if (p > 0) pdf.addPage();
            pdf.addImage(c2.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        }
        const t = new Date();
        const pad = (x) => String(x).padStart(2, '0');
        const nombre = 'planilla-hanzi-' + t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate())
            + '-' + pad(t.getHours()) + pad(t.getMinutes()) + '.pdf';
        pdf.save(nombre);
        pzStatus('✅ PDF descargado: ' + nombre + (paginas > 1 ? ' (' + paginas + ' páginas)' : ''));
    } catch (err) {
        console.warn('[Planillas] descarga de PDF falló:', err);
        pzStatus('⚠ No se pudo generar el PDF. Probá el botón 🖨️ para imprimir y elegir "Guardar como PDF".', true);
    } finally {
        if (btn) btn.disabled = false;
    }
}

// Imprimir (secundario): hoja sola, sin la interfaz de la app
function pzPrint() {
    if (!pzLastSheet) return;
    const f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(f);
    f.srcdoc = pzLastSheet;
    f.onload = () => {
        setTimeout(() => {
            try {
                f.contentWindow.focus();
                f.contentWindow.print();
            } catch (e) {
                const w = window.open('', '_blank');
                if (w) {
                    w.document.write(pzLastSheet);
                    w.document.close();
                    setTimeout(() => { try { w.focus(); w.print(); } catch (e2) { /* noop */ } }, 400);
                }
            }
            setTimeout(() => f.remove(), 60000);
        }, 250);
    };
}

// Llena el input con los caracteres de las palabras del módulo activo
function pzUseModule() {
    const seen = new Set();
    let out = '';
    for (const s of getFiltered()) {
        for (const ch of String(s.chinese_simp_answer || '')) {
            if (!pzIsHan(ch) || seen.has(ch)) continue;
            seen.add(ch);
            out += ch;
            if (seen.size >= 40) break;
        }
        if (seen.size >= 40) break;
    }
    const ta = document.getElementById('pz-input');
    if (ta && out) {
        ta.value = out;
        pzStatus('📋 ' + seen.size + ' caracteres del módulo ' + (MODULE_LABELS[state.activeModule] || state.activeModule) + '. Ahora tocá 📄 Generar hoja.');
        pzCounterUpdate(); // v9.2: el módulo cargado entra al contador
    } else {
        pzStatus('⚠ El módulo activo no tiene palabras para practicar.', true);
    }
}

function pzUpdateControls() {
    const bt = document.getElementById('btn-pz-trazos');
    if (bt) {
        bt.textContent = '✍️ Trazos: ' + (pzTrazos ? 'ON' : 'OFF');
        bt.classList.toggle('active', pzTrazos);
    }
    const sel = document.getElementById('select-pz-cells');
    if (sel) sel.value = String(pzCells);
    const stl = document.getElementById('select-pz-style');
    if (stl) stl.value = pzStyle;
    const nm = document.getElementById('pz-module-name');
    if (nm) nm.textContent = MODULE_LABELS[state.activeModule] || state.activeModule;
}

// ======================================================================
// v9.2 — CONTADOR DE CARACTERES POR HOJA A4 (según 10/12/14 celdas)
// ======================================================================
// Le responde al docente la pregunta práctica: "¿cuántos caracteres entran
// en UNA hoja A4 con la config elegida y cuántos quedan por fuera?".
// · Estilo clásico: cada carácter ocupa ceil((modelo + etapas + 2)/C) filas
//   de celdas de altura fija → capacidad analítica con header medido.
// · Estilo cuaderno: se mide cada bloque real (la tira 筆順 envuelve según
//   los trazos) en un holder con la MISMA geometría del PDF (794px, pad 42px).
// · Sin datos de trazos todavía → n estimado 10 trazos y se marca "≈" — el
//   contador precarga los datos en silencio y se afila solo a exacto.
const PZ_PAGE_H = 1123;                    // A4 a 96dpi
const PZ_PAGE_PAD = 42;                    // padding del holder ≈ 11mm de margen
const PZ_PAGE_LIMIT = PZ_PAGE_PAD + (PZ_PAGE_H - 2 * PZ_PAGE_PAD); // fondo página 1
const PZ_MM = 96 / 25.4;                   // px por mm

function pzCounterData() {
    const ta = document.getElementById('pz-input');
    const raw = ta ? ta.value : '';
    const chars = pzParseInput(raw);
    let rawHan = 0;
    for (const ch of String(raw)) if (pzIsHan(ch)) rawHan++;
    return { chars, rawHan };
}

function pzCounterCompute() {
    const { chars, rawHan } = pzCounterData();
    const C = Math.min(20, Math.max(6, parseInt(pzCells, 10) || 12));
    const GAP = 1.2 * PZ_MM;
    const cw = (794 - 84 - (C - 1) * GAP) / C;
    const rowH = cw + 1.8 * PZ_MM;
    const datas = chars.map((ch) => (PZ_MEM.has(ch) ? PZ_MEM.get(ch) : null));
    const unknown = datas.filter((d) => !d).length;
    const estN = (i) => (pzTrazos ? (datas[i] ? datas[i].strokes.length : 10) : 0);

    let headerH = 60, blocks = null;
    try {
        // mide la hoja REAL (misma geometría que el PDF) — la altura de la
        // cabecera y de cada bloque cuaderno depende del contenido
        const html = pzSheetHTML(chars, datas, pzTrazos, pzCells, pzStyle);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const holder = document.createElement('div');
        holder.style.cssText = 'position:fixed;left:-12000px;top:0;width:794px;background:#fff;padding:42px;';
        const st = document.createElement('style');
        st.textContent = pzHolderCss() + '.pz-cell{height:' + cw.toFixed(2) + 'px;}';
        holder.appendChild(st);
        while (doc.body.firstChild) holder.appendChild(doc.body.firstChild);
        document.body.appendChild(holder);
        const first = holder.querySelector(pzStyle === 'cuaderno' ? '.pz2-block' : '.pz-row');
        const meta = holder.querySelector('.pz-meta');
        if (first) headerH = first.offsetTop;
        else if (meta) headerH = meta.offsetTop + meta.offsetHeight + 3.5 * PZ_MM;
        if (pzStyle === 'cuaderno') {
            blocks = [];
            holder.querySelectorAll('.pz2-block').forEach((b) => {
                blocks.push({ top: b.offsetTop, h: b.offsetHeight + 4 * PZ_MM });
            });
        }
        holder.remove();
    } catch (e) { /* medidas por defecto */ }

    let fit = 0, capOnly = 0;
    if (pzStyle === 'cuaderno') {
        if (blocks && blocks.length) {
            for (const b of blocks) { if (b.top + b.h <= PZ_PAGE_LIMIT) fit++; else break; }
        } else {
            const estH = 26 * PZ_MM; // bloque típico (tarjeta 24mm + envolturas)
            fit = Math.floor((PZ_PAGE_LIMIT - headerH) / estH);
        }
        capOnly = fit;
    } else {
        const rowsAvail = Math.floor((PZ_PAGE_LIMIT - headerH) / rowH);
        if (!chars.length) {
            // capacidad genérica: carácter de referencia de 10 trazos
            const rows1 = Math.ceil((1 + (pzTrazos ? 10 : 0) + 2) / C);
            capOnly = Math.floor(rowsAvail / Math.max(1, rows1));
        } else {
            let acc = 0;
            while (fit < chars.length && acc + Math.ceil((1 + estN(fit) + 2) / C) <= rowsAvail) {
                acc += Math.ceil((1 + estN(fit) + 2) / C);
                fit++;
            }
            capOnly = Math.floor(rowsAvail / Math.max(1, Math.ceil((1 + (pzTrazos ? 10 : 0) + 2) / C)));
        }
    }
    return { chars: chars.length, rawHan, fit, capOnly, unknown, est: unknown > 0 && chars.length > 0 };
}

function pzCounterRender() {
    const el = document.getElementById('pz-counter');
    if (!el) return;
    const C = Math.min(20, Math.max(6, parseInt(pzCells, 10) || 12));
    const r = pzCounterCompute();
    const cfg = C + ' celdas/fila · ' + (pzStyle === 'cuaderno' ? 'cuaderno 筆順' : 'clásica');
    if (!r.chars) {
        el.textContent = '📊 Hoja A4 (' + cfg + '): entran ≈' + r.capOnly +
            ' caracteres por hoja (carácter de referencia, 10 trazos).';
        return;
    }
    const est = r.est ? ' (≈ estimado: faltan datos de trazos)' : '';
    const sobran = Math.max(0, r.chars - r.fit);
    if (sobran === 0) {
        el.textContent = '📊 Hoja A4 (' + cfg + '): los ' + r.chars + ' caracteres entran en una hoja' + est +
            (r.rawHan > r.chars ? ' · solo los primeros 40 se usan' : '') + '.';
    } else {
        el.textContent = '📊 Hoja A4 (' + cfg + '): entran ' + r.fit + ' de ' + r.chars +
            ' caracteres · ' + sobran + ' quedan por fuera (hoja 2+)' + est +
            (r.rawHan > r.chars ? ' · solo los primeros 40 se usan' : '') + '.';
    }
}

// Precarga silenciosa de datos de trazos → el contador pasa de ≈ a exacto
function pzCounterPrefetch() {
    const { chars } = pzCounterData();
    const missing = chars.filter((ch) => !PZ_MEM.has(ch));
    if (!missing.length) return;
    Promise.all(missing.map((ch) => pzFetchChar(ch)))
        .then(() => pzCounterRender())
        .catch(() => { });
}

let pzCounterTimer = null;
function pzCounterUpdate() {
    pzCounterRender();
    clearTimeout(pzCounterTimer);
    pzCounterTimer = setTimeout(() => { pzCounterPrefetch(); }, 450);
}

(function pzInit() {
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-pz-generate', 'click', pzGenerate);
    safe('btn-pz-pdf', 'click', pzDownloadPDF);
    safe('btn-pz-print', 'click', pzPrint);
    safe('btn-pz-module', 'click', pzUseModule);
    safe('btn-pz-trazos', 'click', () => {
        pzTrazos = !pzTrazos;
        localStorage.setItem('ac_pz_trazos', pzTrazos ? '1' : '0');
        pzUpdateControls();
        pzCounterUpdate(); // v9.2: los trazos cambian cuánto ocupa cada carácter
    });
    safe('select-pz-cells', 'change', (e) => {
        pzCells = parseInt(e.target.value, 10) || 12;
        localStorage.setItem('ac_pz_cells', String(pzCells));
        pzCounterUpdate(); // v9.2: 10/12/14 cambian la capacidad de la hoja
    });
    safe('select-pz-style', 'change', (e) => {
        pzStyle = (e.target.value === 'cuaderno') ? 'cuaderno' : 'clasica';
        localStorage.setItem('ac_pz_style', pzStyle);
        pzCounterUpdate(); // v9.2: el estilo cambia el tamaño de cada bloque
    });
    safe('pz-input', 'input', pzCounterUpdate); // v9.2: contador en vivo
    window.addEventListener('resize', () => {
        const wrap = document.getElementById('pz-preview');
        if (wrap && !wrap.classList.contains('hidden')) pzFitPreview();
    });
    pzUpdateControls();
    pzCounterRender(); // v9.2: capacidad al abrir el panel
})();

// ======================================================================
// v7.20 — TEST DE COLOCACIÓN (HSK 3.0 · 9 niveles)
// ======================================================================
// Quiz adaptativo sobre las palabras embebidas de v7.19:
//   · Empieza en HSK 1 y sube de a un nivel.
//   · Por nivel: hanzi → 4 opciones en español. 2 aciertos pasan al
//     siguiente nivel; 2 fallos terminan el test; 1-1 = desempate con
//     una tercera palabra del mismo nivel.
//   · Resultado = primer nivel donde el alumno empieza a fallar
//     (o HSK 9 si aprueba todo). Se guarda en localStorage 'ac_placement'
//     y ofrece "📚 Practicar HSK X" (setModule + pestaña Exámenes).
// Popup clon de #vocab-pop (#placement-pop + body delegado + cierre por
// ✕ / Escape / clic fuera). IIFE autocontenida al estilo pzInit: cero
// cambios en el código existente de app.js.
(function placementInit() {
    'use strict';

    const PL_KEY = 'ac_placement'; // convención ac_ del proyecto
    const MAX_LV = 9;
    const PL_DESC = {
        1: 'Elemental · arranque desde cero',
        2: 'Elemental · bases del día a día',
        3: 'Elemental · supervivencia sólida',
        4: 'Intermedio · primeras conversaciones',
        5: 'Intermedio · fluidez cotidiana',
        6: 'Intermedio · comprensión amplia',
        7: 'Superior · debate y medios',
        8: 'Superior · académico y profesional',
        9: 'Superior · nivel casi nativo'
    };

    const plEsc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g,
        (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const deacc = (s) => String(s || '').toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').trim();
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }

    const PL = {
        phase: 'idle',   // idle | intro | quiz | result
        lv: 1,           // nivel bajo prueba
        qInLv: 0,        // preguntas respondidas en el nivel actual
        rightInLv: 0,    // aciertos en el nivel actual
        qTotal: 0,
        rightTotal: 0,
        used: new Set(), // palabras ya preguntadas (por hanzi simplificado)
        cur: null        // {card, opts, correctIdx}
    };

    // ---- almacenamiento ----
    function plSave(level, allPassed) {
        try {
            localStorage.setItem(PL_KEY, JSON.stringify({
                v: 1, level: level, allPassed: !!allPassed,
                right: PL.rightTotal, total: PL.qTotal,
                date: new Date().toISOString()
            }));
        } catch (e) { /* silencioso */ }
    }
    function plSaved() {
        try {
            const r = JSON.parse(localStorage.getItem(PL_KEY) || 'null');
            if (r && r.v === 1 && r.level >= 1 && r.level <= 9) return r;
        } catch (e) { /* silencioso */ }
        return null;
    }
    function plUpdateStatus() {
        const el = document.getElementById('placement-status');
        if (!el) return;
        const r = plSaved();
        if (!r) { el.classList.add('hidden'); return; }
        let fecha = '';
        try {
            fecha = new Date(r.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        } catch (e) { /* sin fecha */ }
        el.textContent = '🎯 Último test: HSK ' + r.level + ' · ' + r.right + '/' + r.total +
            ' aciertos' + (fecha ? ' · ' + fecha : '');
        el.classList.remove('hidden');
    }

    // ---- banco de palabras (tuplas v7.19 → tarjetas memoizadas) ----
    function plWordsFor(lv) {
        const key = 'HSK' + lv;
        if (typeof EMBEDDED_MODULE_DATA === 'undefined' || !EMBEDDED_MODULE_DATA[key]) return [];
        const rows = EMBEDDED_MODULE_DATA[key];
        if (Array.isArray(rows[0])) return expandWordCards(key, rows);
        return rows; // tarjetas completas (formato futuro)
    }

    // ---- opciones: 1 correcta + 3 distractores, sin duplicados (con/sin acentos) ----
    function plBuildOptions(correct) {
        const banned = new Set([deacc(correct.spanish_full)]);
        (correct.spanish_alternatives || []).forEach((a) => banned.add(deacc(a)));
        const opts = [String(correct.spanish_full || '')];
        const addFrom = (cards) => {
            shuffle(cards);
            for (const c of cards) {
                if (opts.length >= 4) break;
                const es = String(c.spanish_full || '');
                if (!es || banned.has(deacc(es))) continue;
                opts.push(es); banned.add(deacc(es));
            }
        };
        addFrom(plWordsFor(PL.lv).filter((c) => c !== correct));
        // respaldo: niveles vecinos (por si un glosario fuera demasiado chico)
        for (let d = 1; d <= 2 && opts.length < 4; d++) {
            const near = [];
            if (PL.lv - d >= 1) near.push(...plWordsFor(PL.lv - d));
            if (PL.lv + d <= MAX_LV) near.push(...plWordsFor(PL.lv + d));
            addFrom(near);
        }
        const correctEs = String(correct.spanish_full || '');
        shuffle(opts);
        return { opts: opts, correctIdx: opts.indexOf(correctEs) };
    }

    // ---- máquina de niveles: 2 ✓ pasan · 2 ✗ cortan · 1-1 desempate ----
    function plOutcome() {
        const wrongs = PL.qInLv - PL.rightInLv;
        if (wrongs >= 2) return 'fail';
        if (PL.rightInLv >= 2) return 'pass';
        return 'keep';
    }

    function plStart() {
        PL.phase = 'quiz';
        PL.lv = 1; PL.qInLv = 0; PL.rightInLv = 0;
        PL.qTotal = 0; PL.rightTotal = 0;
        PL.used = new Set(); PL.cur = null;
        plNextQuestion();
    }

    function plNextQuestion() {
        const cards = plWordsFor(PL.lv);
        if (!cards.length) return plFinish(false); // red de seguridad
        let card = null;
        for (let t = 0; t < 40 && !card; t++) {
            const c = cards[Math.floor(Math.random() * cards.length)];
            if (!PL.used.has(String(c.chinese_simp_full))) card = c;
        }
        if (!card) card = cards[Math.floor(Math.random() * cards.length)];
        PL.used.add(String(card.chinese_simp_full));
        const built = plBuildOptions(card);
        PL.cur = { card: card, opts: built.opts, correctIdx: built.correctIdx };
        plRenderQuestion();
    }

    function plRenderQuestion() {
        const body = document.getElementById('placement-body');
        if (!body) return;
        const card = PL.cur.card;
        const hanzi = ck() === 'trad'
            ? (card.chinese_trad_full || card.chinese_simp_full)
            : card.chinese_simp_full;
        const letras = ['A', 'B', 'C', 'D'];
        body.innerHTML =
            '<div class="pl-meta">' +
                '<span class="pl-lv">HSK ' + PL.lv + '</span>' +
                '<span class="pl-count">pregunta ' + (PL.qTotal + 1) + '</span>' +
                (PL.lv > 1 ? '<span class="pl-passed">✓ ' + (PL.lv - 1) +
                    (PL.lv > 2 ? ' niveles' : ' nivel') + '</span>' : '') +
            '</div>' +
            '<p class="pl-prompt">¿Qué significa esta palabra?</p>' +
            '<div class="pl-hanzi" lang="zh">' + plEsc(hanzi) + '</div>' +
            '<div class="pl-opts">' + PL.cur.opts.map((o, i) =>
                '<button type="button" class="pl-opt" data-i="' + i + '">' +
                '<span class="pl-opt-key">' + letras[i] + '</span>' + plEsc(o) + '</button>').join('') +
            '</div>' +
            '<div id="pl-fb" class="pl-fb hidden" aria-live="polite"></div>';
    }

    function plAnswer(idx) {
        if (PL.phase !== 'quiz' || !PL.cur || PL.qTotal >= 27) return; // tope absoluto 9×3
        PL.qTotal++; PL.qInLv++;
        const ok = idx === PL.cur.correctIdx;
        if (ok) { PL.rightInLv++; PL.rightTotal++; }
        const body = document.getElementById('placement-body');
        if (body) {
            body.querySelectorAll('.pl-opt').forEach((b) => {
                b.disabled = true;
                const bi = parseInt(b.dataset.i, 10);
                if (bi === PL.cur.correctIdx) b.classList.add('is-ok');
                else if (bi === idx) b.classList.add('is-bad');
            });
        }
        const card = PL.cur.card;
        const last = plOutcome() !== 'keep'; // tras esta respuesta ya no hay más en el nivel
        const fb = document.getElementById('pl-fb');
        if (fb) {
            fb.innerHTML =
                '<div class="pl-fb-head ' + (ok ? 'is-ok' : 'is-bad') + '">' +
                    (ok ? '✅ ¡Esa es!' : '❌ No era esa') + '</div>' +
                '<div class="pl-fb-word"><b lang="zh">' + plEsc(card.chinese_simp_full) + '</b>' +
                    (card.pinyin ? ' <span class="pl-fb-py">' + plEsc(card.pinyin) + '</span>' : '') + '</div>' +
                '<div class="pl-fb-es">= ' + plEsc(String(card.spanish_full || '')) + '</div>' +
                '<button type="button" class="btn-primary pl-next">' +
                    (last ? 'Ver mi nivel 🎯' : 'Siguiente ▶') + '</button>';
            fb.classList.remove('hidden');
        }
    }

    function plAdvance() {
        const out = plOutcome();
        if (out === 'pass') {
            PL.lv++; PL.qInLv = 0; PL.rightInLv = 0;
            if (PL.lv > MAX_LV) return plFinish(true); // aprobó los 9 niveles
            return plNextQuestion();
        }
        if (out === 'fail') return plFinish(false);
        plNextQuestion(); // desempate 1-1
    }

    function plFinish(allPassed) {
        PL.phase = 'result';
        const level = allPassed ? MAX_LV : PL.lv;
        plSave(level, allPassed);
        plUpdateStatus();
        const msg = allPassed
            ? '¡Dominio sobresaliente! Aprobaste los 9 niveles del HSK 3.0.'
            : (PL.lv === 1
                ? '¡Ideal para arrancar! HSK 1 es tu punto de partida perfecto.'
                : 'Pasaste con soltura los niveles anteriores; en HSK ' + level + ' empezá a consolidar.');
        const body = document.getElementById('placement-body');
        if (body) {
            body.innerHTML =
                '<div class="pl-result-badge">🎯</div>' +
                '<p class="pl-result-kicker">Tu nivel de partida</p>' +
                '<div class="pl-result-lv">HSK ' + level + '</div>' +
                '<p class="pl-result-desc">' + plEsc(PL_DESC[level] || '') + '</p>' +
                '<p class="pl-result-msg">' + plEsc(msg) + '</p>' +
                '<p class="pl-result-stats">' + PL.rightTotal + ' aciertos en ' + PL.qTotal +
                    ' pregunta' + (PL.qTotal === 1 ? '' : 's') + '</p>' +
                '<div class="pl-result-actions">' +
                    '<button type="button" class="btn-primary pl-gopractice" data-level="' + level + '">📚 Practicar HSK ' + level + '</button>' +
                    '<button type="button" class="btn-secondary pl-repeat">🔁 Repetir test</button>' +
                '</div>';
        }
    }

    function plGoPractice(level) {
        plClose();
        const lv = Math.min(Math.max(level || 1, 1), MAX_LV);
        const sel = document.getElementById('select-hsk-level');
        if (sel) sel.value = 'HSK' + lv;  // el selector refleja el nivel recomendado
        setModule('HSK' + lv);            // carga el módulo (insignia + conteo real)
        const tab = document.getElementById('tab-exams');
        if (tab) tab.click();             // muestra Exámenes (persiste ac_tab)
    }

    function plRenderIntro() {
        const body = document.getElementById('placement-body');
        if (!body) return;
        const saved = plSaved();
        body.innerHTML =
            '<h3 class="pl-title">🎯 Test de colocación</h3>' +
            '<p class="pl-intro">Te mostramos <b>palabras reales del HSK 3.0</b> y elegís el significado entre 4 opciones. Arrancamos en HSK 1 y subimos de a un nivel: con <b>2 aciertos</b> pasás al siguiente (desempate si queda 1-1). El test termina solo, cuando el nivel ya te exige.</p>' +
            '<ul class="pl-points">' +
                '<li>⏱️ De 2 a 5 minutos · sin registro</li>' +
                '<li>📱 Pensado para el celular</li>' +
                '<li>🔒 Todo queda en tu dispositivo</li>' +
            '</ul>' +
            (saved
                ? '<div class="pl-last">Último resultado: <b>HSK ' + saved.level + '</b> · ' +
                  saved.right + '/' + saved.total + ' aciertos</div>' +
                  '<div class="pl-intro-actions">' +
                    '<button type="button" class="btn-primary pl-start">▶ Empezar de nuevo</button>' +
                    '<button type="button" class="btn-secondary pl-gopractice" data-level="' + saved.level + '">📚 Practicar HSK ' + saved.level + '</button>' +
                  '</div>'
                : '<div class="pl-intro-actions"><button type="button" class="btn-primary pl-start">▶ Empezar test</button></div>');
    }

    function plOpen() {
        PL.phase = 'intro'; PL.cur = null;
        plRenderIntro();
        const pop = document.getElementById('placement-pop');
        if (pop) pop.classList.remove('hidden');
    }
    function plClose() {
        const pop = document.getElementById('placement-pop');
        if (pop) pop.classList.add('hidden');
        PL.phase = 'idle'; PL.cur = null;
    }

    // ---- wiring (patrón pzInit: autocontenida) ----
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-placement', 'click', plOpen);
    safe('btn-placement-daily', 'click', plOpen);
    safe('btn-placement-close', 'click', plClose);

    // Delegado en #placement-body (el body se re-renderiza por fase)
    const body = document.getElementById('placement-body');
    if (body) {
        body.addEventListener('click', (e) => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.classList.contains('pl-start') || b.classList.contains('pl-repeat')) plStart();
            else if (b.classList.contains('pl-opt')) plAnswer(parseInt(b.dataset.i, 10));
            else if (b.classList.contains('pl-next')) plAdvance();
            else if (b.classList.contains('pl-gopractice')) plGoPractice(parseInt(b.dataset.level, 10));
        });
    }

    // Clic fuera cierra (mismo patrón que #vocab-pop; los botones que ABREN no cierran).
    // ⚠ Se usa e.composedPath() y NO pop.contains(e.target): los clics internos
    // (.pl-opt/.pl-next/…) re-renderizan #placement-body y el botón queda
    // descolgado del DOM antes de que el evento llegue a document → contains()
    // daría falso negativo y cerraría el popup justo después de responder.
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('placement-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && (e.target.closest('#btn-placement') ||
                                 e.target.closest('#btn-placement-daily'))) return;
        plClose();
    });

    // Escape cierra (registrada antes que la de vocab-pop → esta corre primero)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const pop = document.getElementById('placement-pop');
        if (pop && !pop.classList.contains('hidden')) plClose();
    });

    // Gancho de solo lectura para tests E2E (vacío fuera del quiz)
    window.PL_DEBUG = function () {
        if (PL.phase !== 'quiz' || !PL.cur) return null;
        return {
            lv: PL.lv, qTotal: PL.qTotal, rightTotal: PL.rightTotal,
            hanzi: PL.cur.card.chinese_simp_full,
            correct: PL.cur.card.spanish_full,
            options: PL.cur.opts.slice(), correctIdx: PL.cur.correctIdx,
            outcome: plOutcome()
        };
    };

    plUpdateStatus(); // restaura la línea "Último test" junto al selector
})();

// ======================================================================
// v7.21 — REPASO SRS (repetición espaciada · Leitner de 6 cajas)
// ======================================================================
// El mazo se llena SOLO con las palabras que cuestan:
//   · ❌ respuesta incorrecta en la práctica   (hook en checkAnswer)
//   · 🔄 botón "Repetir" de la tarjeta         (hook en markWord)
//   · 🔁 "Sumar a mi repaso" del popup de vocabulario
//   · 🌱 semilla opcional desde el nivel del test de colocación
// Algoritmo: 6 cajas — 1 = relearning (10 min, re-encola en la sesión),
// 2..6 = 1 / 3 / 7 / 14 / 30 días. Botones Otra vez / Bien / Fácil
// (estilo Anki-lite). Todo persiste en localStorage 'ac_srs' (clave =
// hanzi simplificado, canónica). Popup #srs-pop clon de #placement-pop;
// IIFE autocontenida: el código existente solo llama hooks window.acSrs*.
(function srsInit() {
    'use strict';

    const SRS_KEY = 'ac_srs';
    const DAY = 86400000;
    const MIN = 60000;
    const AGAIN_MS = 10 * MIN;          // caja 1: relearning dentro de la sesión
    const BOX_DAYS = { 2: 1, 3: 3, 4: 7, 5: 14, 6: 30 };
    const MAX_CARDS = 1000;             // tope del mazo (localStorage sanísimo)
    const SESSION_MAX = 25;             // tarjetas por tanda
    const SEED_SIZE = 12;               // semilla desde el test de colocación

    // ---- almacenamiento ----
    let DB = { v: 1, cards: {} };
    function load() {
        try {
            const r = JSON.parse(localStorage.getItem(SRS_KEY) || 'null');
            if (r && r.v === 1 && r.cards && typeof r.cards === 'object') DB = r;
        } catch (e) { /* corrupto → mazo vacío */ }
    }
    function save() {
        try { localStorage.setItem(SRS_KEY, JSON.stringify(DB)); } catch (e) { /* silencioso */ }
    }

    // ---- consultas ----
    function dueList() {
        const now = Date.now(); const out = [];
        for (const zh in DB.cards) {
            const c = DB.cards[zh];
            if (c && c.d <= now) out.push({ zh: zh, card: c });
        }
        out.sort((a, b) => a.card.d - b.card.d); // la más vencida primero
        return out;
    }
    function dueCount() { return dueList().length; }
    function totalCount() { return Object.keys(DB.cards).length; }
    function futureCount() { return totalCount() - dueCount(); }
    function nextDueMs() {
        let m = Infinity;
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c.d > Date.now() && c.d < m) m = c.d; }
        return m;
    }
    function boxDist() {
        const dist = [0, 0, 0, 0, 0, 0, 0]; // índice = caja
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c.b >= 1 && c.b <= 6) dist[c.b]++; }
        return dist;
    }
    function fmtRel(ms) {
        if (ms <= AGAIN_MS + 2000) return '10 min';
        const d = Math.round(ms / DAY);
        if (d <= 1) return 'mañana';
        return 'en ' + d + ' días';
    }

    // ---- altas ----
    // Devuelve true si agregó; 'dup' si ya estaba; false si clave inválida o mazo lleno.
    function addCard(o) {
        const zh = String(o && o.zh || '').trim();
        if (!zh || zh.length > 20 || !READER_HANZI.test(zh)) return false;
        if (DB.cards[zh]) return 'dup';
        if (totalCount() >= MAX_CARDS) return false;
        const now = Date.now();
        DB.cards[zh] = {
            b: 1, d: o.dueNow ? now : now + AGAIN_MS, a: now, r: 0, l: 0,
            es: o.es || '', py: o.py || '', zt: o.zt || '',
            m: o.m || '', lv: o.lv || 0,
            ctxZh: o.ctxZh || '', ctxZt: o.ctxZt || '', ctxEs: o.ctxEs || ''
        };
        save(); updateBar();
        return true;
    }

    // Hook desde la práctica (checkAnswer ✗ y markWord(false)): recibe la oración.
    window.acSrsMiss = function (s) {
        if (!s) return;
        const zh = String(s.chinese_simp_answer || '').trim();
        const cur = DB.cards[zh];
        if (cur) { cur.b = 1; cur.d = Date.now() + AGAIN_MS; cur.l++; save(); updateBar(); return; }
        addCard({
            zh: zh,
            zt: s.chinese_trad_answer || '',
            es: s.w ? (s.spanish_full || '') : '', // w:1 → la glosa ES el spanish_full
            py: '', m: s.module || '', lv: s.level || 0,
            ctxZh: s.w ? '' : (s.chinese_simp_full || ''),
            ctxZt: s.w ? '' : (s.chinese_trad_full || ''),
            ctxEs: s.w ? '' : (s.spanish_full || '')
        });
    };

    // Alta manual (popup de vocabulario / semilla)
    window.acSrsAdd = function (o) { return addCard(o); };
    window.acSrsHas = function (w) { return !!DB.cards[String(w || '').trim()]; };
    window.acSrsReset = function () { DB = { v: 1, cards: {} }; save(); updateBar(); };

    // Glosa de respaldo para tarjetas sin es guardado (módulos de oraciones)
    function srsGloss(zh, card) {
        if (card && card.es) return card.es;
        try {
            const hit = lookupVocab(zh);
            if (hit && hit.rec && hit.rec.es) return hit.rec.es;
        } catch (e) { /* módulo no cargado */ }
        try {
            const d = dictMiniLookup(zh);
            if (d && d.def) return d.def;
        } catch (e) { /* sin diccionario */ }
        return '';
    }

    // ---- semilla desde el test de colocación ----
    function placementLevel() {
        try {
            const r = JSON.parse(localStorage.getItem('ac_placement') || 'null');
            if (r && r.v === 1 && r.level >= 1 && r.level <= 9) return r.level;
        } catch (e) { /* sin colocación */ }
        return 0;
    }
    function seedFromPlacement() {
        const lv = placementLevel();
        if (!lv) return 0;
        const key = 'HSK' + lv;
        if (typeof EMBEDDED_MODULE_DATA === 'undefined' || !EMBEDDED_MODULE_DATA[key]) return 0;
        const rows = EMBEDDED_MODULE_DATA[key];
        const cards = Array.isArray(rows[0]) ? expandWordCards(key, rows) : rows;
        const pool = cards.slice();
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        let n = 0;
        for (const c of pool) {
            if (n >= SEED_SIZE) break;
            const zh = String(c.chinese_simp_full || '');
            if (DB.cards[zh]) continue;
            if (addCard({ zh: zh, zt: c.chinese_trad_full || '', es: c.spanish_full || '',
                          py: c.pinyin || '', m: key, lv: lv, dueNow: true }) === true) n++;
        }
        return n;
    }

    // ---- calificación ----
    function grade(zh, kind) {
        const c = DB.cards[zh];
        if (!c) return;
        const now = Date.now();
        if (kind === 'again') { c.b = 1; c.d = now + AGAIN_MS; c.l++; }
        else if (kind === 'easy') { c.b = Math.min(c.b + 2, 6); c.d = now + (BOX_DAYS[c.b] * DAY); c.r++; }
        else { c.b = Math.min(c.b + 1, 6); c.d = now + (BOX_DAYS[c.b] * DAY); c.r++; }
        save(); updateBar();
    }

    // ---- TTS de la tarjeta (mismo pipeline que la app: Vercel → voz sistema) ----
    function srsSpeak(text) {
        const t = String(text || '').trim();
        if (!t) return;
        try {
            if (globalAudioPlayer && !globalAudioPlayer.paused) { globalAudioPlayer.pause(); }
            if (typeof stopReader === 'function') stopReader();
        } catch (e) { /* silencioso */ }
        const speakFallback = () => {
            if (!('speechSynthesis' in window)) return;
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(t);
            u.lang = 'zh-CN'; u.rate = playbackSpeed;
            speechSynthesis.speak(u);
        };
        fetchTTS({ text: t, lang: 'zh-CN', voice: voiceZh })
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                if (!d || !d.audio) return speakFallback();
                const bin = atob(d.audio);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                const url = URL.createObjectURL(new Blob([bytes], { type: d.mime || 'audio/wav' }));
                const a = new Audio(url);
                a.playbackRate = playbackSpeed;
                a.onended = () => URL.revokeObjectURL(url);
                a.play().catch(() => { speakFallback(); });
            })
            .catch(speakFallback);
    }

    // ---- sesión ----
    const SR = { phase: 'idle', queue: [], i: 0, total: 0, unique: 0, done: 0, again: 0, cur: null, revealed: false };

    function startSession() {
        SR.queue = dueList().slice(0, SESSION_MAX);
        if (!SR.queue.length) return renderIntro();
        SR.phase = 'quiz'; SR.i = 0; SR.total = SR.queue.length; SR.unique = SR.queue.length;
        SR.done = 0; SR.again = 0; SR.cur = null; SR.revealed = false;
        renderQuiz();
    }
    function aheadSession() {
        // "Adelantar": repasa hasta 10 tarjetas aún no vencidas (las más próximas)
        const now = Date.now(); const fut = [];
        for (const zh in DB.cards) { const c = DB.cards[zh]; if (c.d > now) fut.push({ zh: zh, card: c }); }
        fut.sort((a, b) => a.card.d - b.card.d);
        SR.queue = fut.slice(0, 10);
        if (!SR.queue.length) return renderStats();
        SR.phase = 'quiz'; SR.i = 0; SR.total = SR.queue.length; SR.unique = SR.queue.length;
        SR.done = 0; SR.again = 0; SR.cur = null; SR.revealed = false;
        renderQuiz();
    }

    function renderQuiz() {
        const body = document.getElementById('srs-body');
        if (!body) return;
        const item = SR.queue[SR.i];
        if (!item) return renderSummary();
        SR.cur = item; SR.revealed = false;
        const card = item.card;
        const zh = ck() === 'trad' ? (card.zt || item.zh) : item.zh;
        const box = card.b;
        const nextGood = Math.min(box + 1, 6);
        const nextEasy = Math.min(box + 2, 6);
        const hintB = (n) => (n === 1 ? '10 min' : (BOX_DAYS[n] === 1 ? '1 día' : BOX_DAYS[n] + ' días'));
        body.innerHTML =
            '<div class="srs-meta">' +
                '<span class="srs-chip">Repaso</span>' +
                '<span class="srs-count">' + (SR.i + 1) + ' / ' + SR.total + '</span>' +
                (card.lv ? '<span class="srs-lv">HSK ' + card.lv + '</span>' : '') +
                '<span class="srs-box">caja ' + box + '</span>' +
            '</div>' +
            '<div class="srs-card" lang="zh">' + escHtml(zh) + '</div>' +
            '<div class="srs-tools">' +
                '<button type="button" class="srs-tool srs-speak" title="Escuchar la palabra">🔊</button>' +
                '<button type="button" class="srs-tool srs-write" title="Practicar los trazos">✍</button>' +
            '</div>' +
            '<button type="button" class="btn-primary srs-reveal-btn srs-reveal">👁️ Ver respuesta</button>' +
            '<div id="srs-ans" class="srs-ans hidden">' +
                (card.py ? '<div class="srs-py">📖 ' + escHtml(card.py) + '</div>' : '') +
                '<div class="srs-es">🇪🇸 ' + (srsGloss(item.zh, card)
                    ? escHtml(srsGloss(item.zh, card)) : '<span class="srs-es-missing">—</span>') + '</div>' +
                (card.ctxZh ? '<div class="srs-ctx"><div class="srs-ctx-title">📌 Tu ejemplo</div>' +
                    '<div class="srs-ctx-zh" lang="zh">' + escHtml(ck() === 'trad' ? (card.ctxZt || card.ctxZh) : card.ctxZh) + '</div>' +
                    (card.ctxEs ? '<div class="srs-ctx-es">“' + escHtml(card.ctxEs) + '”</div>' : '') + '</div>' : '') +
                '<div class="srs-grades">' +
                    '<button type="button" class="srs-grade srs-g-again" data-k="again">😵 Otra vez<small>' + hintB(1) + '</small></button>' +
                    '<button type="button" class="srs-grade srs-g-good" data-k="good">🙂 Bien<small>' + hintB(nextGood) + '</small></button>' +
                    '<button type="button" class="srs-grade srs-g-easy" data-k="easy">😎 Fácil<small>' + hintB(nextEasy) + '</small></button>' +
                '</div>' +
            '</div>';
        const ans = document.getElementById('srs-ans');
        if (ans) ans.classList.add('hidden');
    }

    function doReveal() {
        SR.revealed = true;
        const ans = document.getElementById('srs-ans');
        const btn = document.querySelector('#srs-body .srs-reveal-btn');
        if (btn) btn.classList.add('hidden');
        if (ans) ans.classList.remove('hidden');
    }

    function doGrade(kind) {
        if (!SR.cur) return;
        const item = SR.cur;
        grade(item.zh, kind);
        SR.done++;
        if (kind === 'again') {
            SR.again++;
            if (!item.requeued) { item.requeued = true; SR.queue.push(item); SR.total++; }
        }
        SR.i++;
        if (SR.i >= SR.queue.length) return renderSummary();
        renderQuiz();
    }

    function renderSummary() {
        SR.phase = 'result'; SR.cur = null;
        const body = document.getElementById('srs-body');
        if (!body) return;
        const left = dueCount();
        const nxt = nextDueMs();
        const nextTxt = left > 0
            ? 'Quedan ' + left + ' vencida' + (left === 1 ? '' : 's') + ' para hoy'
            : (isFinite(nxt) ? 'Tu próxima tanda es ' + fmtRel(nxt - Date.now()) : 'Tu mazo sigue activo');
        body.innerHTML =
            '<div class="srs-done-badge">🎉</div>' +
            '<h3 class="srs-title" style="text-align:center">¡Repaso listo!</h3>' +
            '<p class="srs-sum-line">' + SR.done + ' respuesta' + (SR.done === 1 ? '' : 's') +
                ' · ' + SR.unique + ' tarjeta' + (SR.unique === 1 ? '' : 's') +
                (SR.again ? ' · ' + SR.again + ' para volver a ver' : '') + '</p>' +
            '<p class="srs-sum-next">' + nextTxt + '</p>' +
            '<div class="srs-actions">' +
                (left > 0 ? '<button type="button" class="btn-primary srs-start">▶ Seguir repaso (' + left + ')</button>' : '') +
                '<button type="button" class="btn-primary srs-close-btn">Listo ✅</button>' +
                '<button type="button" class="btn-secondary srs-stats-btn">📊 Ver mi mazo</button>' +
            '</div>';
    }

    function renderStats() {
        SR.phase = 'stats'; SR.cur = null;
        const body = document.getElementById('srs-body');
        if (!body) return;
        const total = totalCount(); const due = dueCount(); const fut = futureCount();
        const dist = boxDist();
        const nxt = nextDueMs();
        const boxNames = ['—', 'relearning', '1 d', '3 d', '7 d', '14 d', '30 d'];
        let rows = '';
        for (let b = 1; b <= 6; b++) {
            if (!dist[b]) continue;
            rows += '<div class="srs-stat-row"><span class="srs-stat-k">caja ' + b +
                ' <small>(' + boxNames[b] + ')</small></span><span class="srs-stat-v">' + dist[b] + '</span></div>';
        }
        body.innerHTML =
            '<h3 class="srs-title">📊 Mi mazo de repaso</h3>' +
            '<div class="srs-stat-row srs-stat-hero"><span class="srs-stat-k">Palabras</span><span class="srs-stat-v">' + total + '</span></div>' +
            '<div class="srs-stat-row"><span class="srs-stat-k">Vencen hoy</span><span class="srs-stat-v">' + due + '</span></div>' +
            (rows || '<p class="srs-sum-line">El mazo se llena solo: cada palabra que fallás en la práctica o marcás con 🔄 Repetir entra acá.</p>') +
            (isFinite(nxt) && fut > 0 ? '<p class="srs-sum-next">Próxima tarjeta ' + fmtRel(nxt - Date.now()) + '</p>' : '') +
            '<div class="srs-actions">' +
                (due > 0 ? '<button type="button" class="btn-primary srs-start">▶ Empezar repaso (' + due + ')</button>' : '') +
                (fut > 0 ? '<button type="button" class="btn-secondary srs-ahead">🌅 Adelantar (hasta 10)</button>' : '') +
                '<button type="button" class="btn-secondary srs-close-btn">Cerrar</button>' +
            '</div>' +
            (total > 0 ? '<button type="button" class="srs-clear">🗑️ Vaciar mazo</button>' : '');
    }

    function renderIntro() {
        SR.phase = 'intro'; SR.cur = null;
        const body = document.getElementById('srs-body');
        if (!body) return;
        const total = totalCount(); const due = dueCount();
        if (total === 0) {
            const lv = placementLevel();
            body.innerHTML =
                '<h3 class="srs-title">🔁 Repaso inteligente</h3>' +
                '<p class="srs-intro">Repasá <b>justo antes de olvidar</b>. Tu mazo se llena solo con las palabras que cuestan:</p>' +
                '<ul class="srs-points">' +
                    '<li>❌ Cada respuesta incorrecta de la práctica</li>' +
                    '<li>🔄 Cada palabra marcada con “Repetir”</li>' +
                    '<li>🔁 “Sumar a mi repaso” en el popup de vocabulario</li>' +
                '</ul>' +
                '<p class="srs-intro">Cada tarjeta vuelve a los <b>1 · 3 · 7 · 14 · 30 días</b>, y si la fallás, reaparece en minutos.</p>' +
                (lv ? '<div class="srs-actions"><button type="button" class="btn-primary srs-seed">🌱 Empezar con ' + SEED_SIZE +
                        ' palabras de HSK ' + lv + '</button></div>' :
                    '<p class="srs-sum-next">🎯 ¿No sabés por dónde empezar? Hacé el <b>test de colocación</b> y sembramos tu mazo con tu nivel.</p>') +
                '<div class="srs-actions"><button type="button" class="btn-secondary srs-close-btn">Entendido</button></div>';
            return;
        }
        // hay mazo
        if (due > 0) {
            body.innerHTML =
                '<h3 class="srs-title">🔁 Repaso del día</h3>' +
                '<div class="srs-hero-due">' + due + '</div>' +
                '<p class="srs-sum-line">tarjeta' + (due === 1 ? '' : 's') + ' vencida' + (due === 1 ? '' : 's') + ' de un mazo de ' + total + '</p>' +
                (due > SESSION_MAX ? '<p class="srs-sum-next">Esta tanda: ' + SESSION_MAX + ' · el resto sigue mañana</p>' : '') +
                '<div class="srs-actions">' +
                    '<button type="button" class="btn-primary srs-start">▶ Empezar repaso (' + Math.min(due, SESSION_MAX) + ')</button>' +
                    '<button type="button" class="btn-secondary srs-stats-btn">📊 Ver mi mazo</button>' +
                '</div>';
            return;
        }
        renderStats(); // mazo activo, nada vencido → estadísticas
    }

    // ---- barra sticky (label + badge) ----
    function updateBar() {
        const btn = document.getElementById('btn-srs');
        if (!btn) return;
        const label = document.getElementById('srs-bar-label');
        const badge = document.getElementById('srs-bar-badge');
        const total = totalCount(); const due = dueCount();
        btn.classList.toggle('has-due', due > 0);
        if (badge) {
            if (due > 0) { badge.textContent = due > 99 ? '99+' : String(due); badge.classList.remove('hidden'); }
            else badge.classList.add('hidden');
        }
        if (label) {
            label.textContent = total === 0 ? 'Repaso inteligente'
                : (due > 0 ? 'Repaso del día' : 'Repaso · todo al día');
        }
        btn.title = 'Repaso con repetición espaciada' +
            (total ? ' · ' + total + ' en el mazo' : '') + (due ? ' · ' + due + ' vencen hoy' : '');
    }

    // ---- abrir / cerrar ----
    function srsOpen() {
        load(); // por si otra pestaña modificó el mazo
        renderIntro();
        const pop = document.getElementById('srs-pop');
        if (pop) pop.classList.remove('hidden');
    }
    function srsClose() {
        const pop = document.getElementById('srs-pop');
        if (pop) pop.classList.add('hidden');
        SR.phase = 'idle'; SR.cur = null;
    }

    // ---- wiring (patrón placementInit: autocontenido) ----
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-srs', 'click', srsOpen);
    safe('btn-srs-close', 'click', srsClose);

    // Delegado en #srs-body (el body se re-renderiza por fase)
    const body = document.getElementById('srs-body');
    if (body) {
        body.addEventListener('click', (e) => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.classList.contains('srs-start')) startSession();
            else if (b.classList.contains('srs-reveal')) doReveal();
            else if (b.classList.contains('srs-grade')) doGrade(b.dataset.k);
            else if (b.classList.contains('srs-seed')) {
                const n = seedFromPlacement();
                if (n > 0) startSession();
                else renderIntro();
            }
            else if (b.classList.contains('srs-ahead')) aheadSession();
            else if (b.classList.contains('srs-stats-btn')) renderStats();
            else if (b.classList.contains('srs-close-btn')) srsClose();
            else if (b.classList.contains('srs-speak')) {
                if (SR.cur) srsSpeak(ck() === 'trad' ? (SR.cur.card.zt || SR.cur.zh) : SR.cur.zh);
            }
            else if (b.classList.contains('srs-write')) {
                if (SR.cur) openWriterPractice(SR.cur.zh); // banner grande de trazos (v7.16)
            }
            else if (b.classList.contains('srs-clear')) {
                if (confirm('¿Vaciar todo el mazo de repaso? Las palabras podrán sumarse de nuevo.')) {
                    window.acSrsReset();
                    renderIntro();
                }
            }
        });
    }

    // Botón "🔁 Sumar a mi repaso" del popup de vocabulario (delegado)
    const vpop = document.getElementById('vocab-pop');
    if (vpop) {
        vpop.addEventListener('click', (e) => {
            const btnEl = e.target.closest ? e.target.closest('.vp-srs-add') : null;
            if (!btnEl) return;
            const vb = document.getElementById('vocab-pop-body');
            const w = (vb && vb.dataset ? vb.dataset.word : '') || '';
            const zh = String(w).trim();
            if (!zh || DB.cards[zh]) return;
            let es = '', zt = '';
            try {
                const hit = lookupVocab(zh);
                if (hit && hit.rec) { es = hit.rec.es || ''; zt = hit.rec.zhTrad || ''; }
            } catch (err) { /* sin módulo cargado */ }
            try {
                if (!es) { const d = dictMiniLookup(zh); if (d && d.def) es = d.def; }
            } catch (err) { /* sin diccionario */ }
            const added = addCard({ zh: zh, zt: zt, es: es, py: wordPinyin(zh), dueNow: true });
            if (added === true) {
                // Actualización IN SITU (sin re-render): si re-renderizáramos el
                // body, este botón quedaría descolgado del DOM y el listener
                // "clic fuera" de vocab-pop (pop.contains) cerraría el popup
                // justo después de responder — el mismo falso positivo v7.20.
                btnEl.classList.add('is-in');
                btnEl.textContent = '✓ Ya está en tu repaso';
            }
        });
    }

    // Clic fuera cierra (composedPath, mismo fix v7.20: el body se re-renderiza)
    document.addEventListener('click', (e) => {
        const pop = document.getElementById('srs-pop');
        if (!pop || pop.classList.contains('hidden')) return;
        const path = (typeof e.composedPath === 'function') ? e.composedPath() : null;
        if (path ? path.indexOf(pop) !== -1 : pop.contains(e.target)) return;
        if (e.target.closest && e.target.closest('#btn-srs')) return;
        srsClose();
    });

    // Escape cierra (después de vocab/placement: cada popup cierra el propio)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const pop = document.getElementById('srs-pop');
        if (pop && !pop.classList.contains('hidden')) srsClose();
    });

    // Vuelta a la pestaña / app: refresca el badge (vencimientos por timestamp)
    window.addEventListener('focus', () => { load(); updateBar(); });

    // Gancho de solo lectura para tests E2E
    window.SRS_DEBUG = function () {
        return {
            total: totalCount(), due: dueCount(), phase: SR.phase,
            i: SR.i, totalQ: SR.total, done: SR.done, again: SR.again,
            cur: SR.cur ? SR.cur.zh : null, revealed: SR.revealed
        };
    };

    load();
    updateBar();
})();

// ═══════════════════════════════════════════════════════════════════
// v9.0 — LECCIONES GRADUADAS (Huayu Diario 日常華語)
// -------------------------------------------------------------------
// Mini-dramas HSK 3.0 (window.GRADED_LESSONS, datos en lessons.js):
//  · Lector de la historia con pinyin interlineal opcional y TTS por línea.
//  · Práctica estilo test: 10 oraciones del texto con un hueco ___ y 3
//    opciones (1 correcta + 2 distractores del mismo nivel), con ficha
//    comparativa al responder (tu respuesta vs correcta, como la referencia).
//  · Integración: aciertos → palabras aprendidas; errores → newWords +
//    mazo SRS (window.acSrsMiss). Progreso por lección en 'ac_lessons_v1'.
// Patrón IIFE (pzInit/srsInit/lessonsInit): cero acoplamiento, listeners
// delegados en #lesson-list / #lesson-pop.
// ═══════════════════════════════════════════════════════════════════
(function lessonsInit() {
    'use strict';
    const LESSONS = (typeof window.GRADED_LESSONS !== 'undefined') ? window.GRADED_LESSONS : [];
    if (!LESSONS.length) return;

    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ── progreso por lección ──
    const LKEY = 'ac_lessons_v1';
    let LB = {};
    try { LB = JSON.parse(localStorage.getItem(LKEY) || '{}') || {}; } catch (e) { LB = {}; }
    const saveLB = () => { try { localStorage.setItem(LKEY, JSON.stringify(LB)); } catch (e) { } };
    const progOf = (id) => LB[id] || {};

    // ── estado de la sesión abierta ──
    const S = { lesson: null, view: null, idx: 0, results: [], answered: false, pinyin: false };
    // v9.1: traducción OCULTA por defecto (lector y práctica) — el alumno elige
    // verla con el botón 🇪🇸. Preferencia persistente.
    let verEs = localStorage.getItem('ac_lq_es') === '1';
    const setVerEs = (v) => {
        verEs = !!v;
        try { localStorage.setItem('ac_lq_es', verEs ? '1' : '0'); } catch (e) { }
    };

    const pop = $('lesson-pop');
    if (!pop) return;
    const body = $('lq-body'), segs = $('lq-segments'), progNum = $('lq-progress-num');

    // ── utilidades compartidas ──
    const ckKey = (typeof ck === 'function') ? ck() : 'simp';
    const zhKey = () => (typeof ck === 'function') ? ck() : 'simp';
    const pyLine = (zh) => {
        try { return (typeof pinyinPro !== 'undefined') ? pinyinPro.pinyin(zh) : ''; }
        catch (e) { return ''; }
    };

    // TTS: reutiliza fetchTTS/Vercel con fallback speechSynthesis (patrón SRS)
    let lqAudio = null;
    async function speakZh(text, btn) {
        try {
            if (typeof globalAudioPlayer !== 'undefined' && globalAudioPlayer.src) {
                globalAudioPlayer.pause();
                if (typeof isPlaying !== 'undefined') isPlaying = false;
            }
            if (lqAudio) { lqAudio.pause(); lqAudio = null; }
            if (btn) { btn.disabled = true; btn.classList.add('lq-loading'); }
            const resp = await fetchTTS({ text, lang: 'zh-CN', voice: voiceZh }, 12000);
            if (!resp.ok) throw new Error('TTS http ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('TTS sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            lqAudio = new Audio(url);
            lqAudio.playbackRate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
            await lqAudio.play();
            lqAudio.onended = () => { URL.revokeObjectURL(url); lqAudio = null; };
        } catch (e) {
            // fallback: voz del sistema
            try {
                if ('speechSynthesis' in window) {
                    speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(text);
                    u.lang = 'zh-CN';
                    u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                    speechSynthesis.speak(u);
                }
            } catch (e2) { /* silencioso */ }
        } finally {
            if (btn) { btn.disabled = false; btn.classList.remove('lq-loading'); }
        }
    }
    function stopSpeak() {
        if (lqAudio) { lqAudio.pause(); lqAudio = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { }
    }

    // ── lista de lecciones ──
    function renderList() {
        const wrap = $('lesson-list');
        if (!wrap) return;
        const filt = wrap.dataset.level || 'all';
        wrap.innerHTML = '';
        LESSONS.filter(l => filt === 'all' || String(l.hsk) === filt).forEach(l => {
            const p = progOf(l.id);
            const best = (p.best != null) ? p.best + '/10' : '—';
            const flag = p.completed ? ' <span class="lq-done">✓ completada</span>' : '';
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.innerHTML =
                '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">' + l.emoji + '</span>' +
                '<span class="lc-hsk">HSK ' + l.hsk + '</span>' +
                '<span class="lc-best">🎯 ' + best + flag + '</span></div>' +
                '<div class="lc-titles"><span class="lc-zh">' + escHtml(l.titleZh) + '</span>' +
                '<span class="lc-es">' + escHtml(l.titleEs) + '</span></div>' +
                '<p class="lc-blurb">' + escHtml(l.blurb) + '</p>' +
                '<div class="lc-meta">' + l.lines.length + ' líneas · ' + l.quiz.length + ' ejercicios</div>' +
                '<div class="lc-actions">' +
                '<button type="button" class="lq-btn lc-read" data-act="read" data-id="' + l.id + '">📖 Leer</button>' +
                '<button type="button" class="lq-btn lc-practice" data-act="practice" data-id="' + l.id + '">🎯 Practicar</button>' +
                '</div>';
            wrap.appendChild(card);
        });
    }

    function bindList() {
        const wrap = $('lesson-list');
        if (!wrap) return;
        wrap.addEventListener('click', (e) => {
            const btn = e.target.closest('.lq-btn[data-act]');
            if (!btn) return;
            const l = LESSONS.find(x => x.id === btn.dataset.id);
            if (!l) return;
            if (btn.dataset.act === 'read') openStory(l);
            else openQuiz(l);
        });
        const chips = $('lesson-levels');
        if (chips) chips.addEventListener('click', (e) => {
            const chip = e.target.closest('.lv-chip');
            if (!chip) return;
            chips.querySelectorAll('.lv-chip').forEach(c => c.classList.toggle('active', c === chip));
            wrap.dataset.level = chip.dataset.level;
            renderList();
        });
    }

    // ── overlay: abrir/cerrar ──
    function openPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closePop() {
        stopSpeak();
        pop.classList.add('hidden');
        try { document.body.style.overflow = ''; } catch (e) { }
        S.lesson = null; S.view = null;
        renderList(); // refresca el mejor puntaje
    }
    function bindPop() {
        $('lq-close').addEventListener('click', closePop);
        pop.addEventListener('click', (e) => {
            if (e === null) return;
            const t = e.target;
            if (t === pop) closePop();                 // clic en el fondo
            if (t.closest && t.closest('#lq-close')) return;
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden')) closePop();
        });
    }

    // ── vista LECTURA ──
    function openStory(l) {
        S.lesson = l; S.view = 'story'; S.pinyin = false;
        openPop();
        progNum.textContent = '📖';
        segs.innerHTML = '';
        const k = zhKey();
        const lines = l.lines.map((ln, i) => {
            const zh = (k === 'trad' ? ln.zhT : ln.zh);
            return '<div class="lq-line" data-i="' + i + '" role="button" tabindex="0" title="Tocá para escuchar">' +
                '<div class="lq-line-zh">' + escHtml(zh) + '</div>' +
                '<div class="lq-line-py hidden" data-zh="' + escHtml(ln.zh) + '"></div>' +
                '<div class="lq-line-es' + (verEs ? '' : ' hidden') + '">' + escHtml(ln.es) + '</div></div>';
        }).join('');
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + l.emoji + '</span>' +
            '<div><div class="lq-story-zh">' + escHtml(k === 'trad' ? (l.titleZhT || l.titleZh) : l.titleZh) + '</div>' +
            '<div class="lq-story-es">' + escHtml(l.titleEs) + ' · HSK ' + l.hsk + '</div></div></div>' +
            '<p class="lq-blurb">' + escHtml(l.blurb) + '</p>' +
            '<div class="lq-lines">' + lines + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-es">🇪🇸 Español: ' + (verEs ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-story-pinyin">🔤 Pinyin: OFF</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-story-practice">🎯 Practicar ' + l.quiz.length + '</button>' +
            '</div>';
        body.querySelector('#lq-story-practice').addEventListener('click', () => openQuiz(l));
        body.querySelector('#lq-story-es').addEventListener('click', (e) => {
            setVerEs(!verEs);
            e.target.textContent = '🇪🇸 Español: ' + (verEs ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-es').forEach(el => el.classList.toggle('hidden', !verEs));
        });
        body.querySelector('#lq-story-pinyin').addEventListener('click', (e) => {
            S.pinyin = !S.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (S.pinyin ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-py').forEach(el => {
                if (S.pinyin && !el.textContent) el.textContent = pyLine(el.dataset.zh);
                el.classList.toggle('hidden', !S.pinyin);
            });
        });
        body.querySelector('.lq-lines').addEventListener('click', (e) => {
            const line = e.target.closest('.lq-line');
            if (!line) return;
            const ln = l.lines[+line.dataset.i];
            speakZh(k === 'trad' ? ln.zhT : ln.zh, line.querySelector('.lq-line-zh'));
        });
    }
    // ── vista PRÁCTICA ──
    function openQuiz(l) {
        S.lesson = l; S.view = 'quiz'; S.idx = 0; S.results = new Array(l.quiz.length).fill(null);
        // mezcla por sesión: los datos traen opts[0]=correcta; el orden visible
        // se baraja acá para que la posición de la correcta no sea predecible.
        S.order = l.quiz.map(() => {
            const d = [0, 1, 2];
            for (let i = d.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [d[i], d[j]] = [d[j], d[i]];
            }
            return d;
        });
        openPop();
        renderQuestion();
    }
    function renderSegments() {
        segs.innerHTML = S.results.map(r =>
            '<span class="lq-seg' + (r === true ? ' ok' : r === false ? ' bad' : '') + '"></span>').join('');
    }
    function renderQuestion() {
        const l = S.lesson, q = l.quiz[S.idx], ord = S.order[S.idx];
        S.answered = false;
        progNum.textContent = (S.idx + 1) + '/' + l.quiz.length;
        renderSegments();
        const k = zhKey();
        const zhFull = (k === 'trad' ? q.zhT : q.zh);
        const parts = zhFull.split('___');
        const zhHtml = escHtml(parts[0]) + '<span class="lq-blank" id="lq-blank">？</span>' + escHtml(parts[1] || '');
        const rightPos = ord.indexOf(0); // posición visible de la correcta
        const opts = ord.map((dataIdx, pos) => {
            const o = q.opts[dataIdx];
            const zh = (k === 'trad' && o.t) ? o.t : o.z;
            return '<button type="button" class="lq-opt" data-pos="' + pos + '"><span class="lq-opt-letter">' +
                'ABC'[pos] + '</span><span class="lq-opt-zh">' + escHtml(zh) + '</span></button>';
        }).join('');
        body.innerHTML =
            '<div class="lq-tag-row"><div class="lq-lesson-tag">' + l.emoji + ' ' + escHtml(l.titleEs) + '</div>' +
            '<button type="button" class="lq-btn lq-ghost lq-mini" id="lq-es-toggle">🇪🇸 Traducción: ' + (verEs ? 'ON' : 'OFF') + '</button></div>' +
            '<div class="lq-zh" id="lq-zh">' + zhHtml + '</div>' +
            '<div class="lq-es-box' + (verEs ? '' : ' hidden') + '" id="lq-es-box">' + escHtml(q.es) + '</div>' +
            '<div class="lq-opts" id="lq-opts">' + opts + '</div>' +
            '<div class="lq-feedback hidden" id="lq-feedback"></div>' +
            '<div class="lq-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-speak">🔊 Escuchar</button>' +
            '<button type="button" class="lq-btn lq-primary hidden" id="lq-next">Siguiente ▶</button>' +
            '</div>';
        body.querySelector('#lq-speak').addEventListener('click', (e) =>
            speakZh(zhFull.replace('___', q.opts[0].z), e.target));
        body.querySelector('#lq-es-toggle').addEventListener('click', (e) => {
            setVerEs(!verEs);
            e.target.textContent = '🇪🇸 Traducción: ' + (verEs ? 'ON' : 'OFF');
            const box = body.querySelector('#lq-es-box');
            if (box) box.classList.toggle('hidden', !verEs);
        });
        body.querySelector('#lq-opts').addEventListener('click', (e) => {
            const b = e.target.closest('.lq-opt');
            if (b && !S.answered) answer(+b.dataset.pos);
        });
        body.querySelector('#lq-next').addEventListener('click', next);
    }
    function wordCard(o, label, cls) {
        // ficha de palabra: hanzi con colores de tono + pinyin + 🔊 + significados
        let zhHtml = escHtml(o.z);
        try {
            if (typeof showToneColors !== 'undefined' && showToneColors && typeof pinyinPro !== 'undefined') {
                zhHtml = pinyinPro.pinyin(o.z, { type: 'all' }).map(it =>
                    it.isZh ? '<span class="tone-' + (it.num || 5) + '">' + escHtml(it.origin) + '</span>' : escHtml(it.origin)).join('');
            }
        } catch (e) { /* plano */ }
        const meanings = ['<li>' + escHtml(o.e) + '</li>'].concat((o.a || []).map(a => '<li>' + escHtml(a) + '</li>')).join('');
        return '<div class="lq-card ' + cls + '"><div class="lq-card-label">' + label + '</div>' +
            '<div class="lq-card-zh">' + zhHtml + '</div>' +
            '<div class="lq-card-py">' + escHtml(o.p) + ' <button type="button" class="lq-say" data-zh="' + escHtml(o.z) + '" aria-label="Escuchar palabra">🔊</button></div>' +
            '<ul class="lq-card-es">' + meanings + '</ul></div>';
    }
    function answer(pos) {
        const l = S.lesson, q = l.quiz[S.idx], ord = S.order[S.idx];
        S.answered = true;
        const dataIdx = ord[pos];
        const ok = dataIdx === 0;
        S.results[S.idx] = ok;
        renderSegments();
        // rellena el hueco con lo elegido y marca las opciones
        const blank = body.querySelector('#lq-blank');
        const k = zhKey();
        const chosen = q.opts[dataIdx], right = q.opts[0];
        if (blank) {
            blank.textContent = (k === 'trad' && chosen.t) ? chosen.t : chosen.z;
            blank.classList.add(ok ? 'fill-ok' : 'fill-bad');
        }
        body.querySelectorAll('.lq-opt').forEach((b, bi) => {
            b.disabled = true;
            if (bi === ord.indexOf(0)) b.classList.add('is-right');
            else if (bi === pos) b.classList.add('is-wrong');
        });
        // feedback: correcto → una tarjeta; error → tu respuesta vs correcta
        let fb;
        if (ok) {
            fb = '<div class="lq-verdict ok">✓ ¡Correcto!</div>' + wordCard(right, 'LA PALABRA', 'lq-card-green');
        } else {
            fb = '<div class="lq-verdict bad">✗ Casi — repasala en tu mazo</div>' +
                '<div class="lq-cards">' + wordCard(chosen, 'TU RESPUESTA', 'lq-card-red') +
                wordCard(right, 'RESPUESTA CORRECTA', 'lq-card-green') + '</div>';
        }
        const fbel = body.querySelector('#lq-feedback');
        fbel.innerHTML = fb;
        fbel.classList.remove('hidden');
        // bookkeeping idéntico al motor principal (identidad = hanzi simplificado)
        if (ok) {
            if (typeof state !== 'undefined') {
                state.knownWords.add(right.z);
                state.newWords.delete(right.z);
            }
        } else {
            if (typeof state !== 'undefined') state.newWords.add(right.z);
            if (typeof window.acSrsMiss === 'function') {
                window.acSrsMiss({
                    w: 1, module: 'Lección ' + l.titleEs, level: l.hsk,
                    chinese_simp_answer: right.z, chinese_trad_answer: right.t || right.z,
                    spanish_answer: right.e, spanish_alternatives: right.a || null,
                    spanish_full: q.es, chinese_simp_full: q.zh, pinyin: right.p
                });
            }
        }
        try { saveProgress(); updateStats(); updateVocabularyPanel(); } catch (e) { }
        // botón siguiente (o terminar)
        const nx = body.querySelector('#lq-next');
        nx.classList.remove('hidden');
        if (S.idx === l.quiz.length - 1) nx.textContent = 'Ver resultado 🏁';
    }
    function next() {
        const l = S.lesson;
        if (S.idx < l.quiz.length - 1) { S.idx++; renderQuestion(); return; }
        // resultado final
        const score = S.results.filter(Boolean).length;
        const prev = progOf(l.id);
        LB[l.id] = {
            best: Math.max(prev.best || 0, score),
            completed: true,
            last: new Date().toISOString().slice(0, 10)
        };
        saveLB();
        progNum.textContent = '🏁';
        segs.innerHTML = '';
        const msg = score === 10 ? '¡Perfecto! Diez de diez.' :
            score >= 7 ? '¡Muy bien! La historia ya es tuya.' :
                'Buen intento. Leé la historia otra vez y repetí.';
        body.innerHTML =
            '<div class="lq-final">' +
            '<div class="lq-final-emoji">' + l.emoji + '</div>' +
            '<div class="lq-final-score">' + score + '/' + l.quiz.length + '</div>' +
            '<div class="lq-final-msg">' + msg + '</div>' +
            '<div class="lq-final-actions">' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-final-read">📖 Leer la historia</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="lq-final-retry">🔁 Repetir práctica</button>' +
            '<button type="button" class="lq-btn lq-primary" id="lq-final-close">Seguir ✕</button>' +
            '</div></div>';
        body.querySelector('#lq-final-read').addEventListener('click', () => openStory(l));
        body.querySelector('#lq-final-retry').addEventListener('click', () => openQuiz(l));
        body.querySelector('#lq-final-close').addEventListener('click', closePop);
    }

    // ── arranque ──
    function boot() {
        bindList();
        bindPop();
        renderList();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    // API de solo lectura para pruebas E2E
    window.LQ_DEBUG = {
        get lessons() { return LESSONS.length; },
        get state() { return { view: S.view, idx: S.idx, answered: S.answered, results: S.results.slice() }; },
        get rightPos() { return (S.view === 'quiz' && S.order) ? S.order[S.idx].indexOf(0) : -1; }
    };
})();

// ======================================================================
// v9.2 — LECTOR DE CLÁSICOS (texto original por bloques, como las lecciones)
// ======================================================================
// Los clásicos ya no se "leen" como concatenación de oraciones de práctica:
// cada módulo muestra su TEXTO ORIGINAL en bloques (capítulos/pasajes) con
// la misma experiencia que el lector de lecciones: pinyin interlineal
// opcional (pinyin-pro), traducción 🇪🇸 oculta por defecto (misma
// preferencia 'ac_lq_es'), TTS por línea (fetchTTS + fallback sistema) y
// navegación entre bloques. Datos: classics.js (window.CLASSIC_TEXTS +
// window.CLASSIC_T con tradicional horneado vía opencc).
// Entradas: (a) lista directa en la pestaña Clásicos (#cread-list);
//           (b) botón 📖 Leer lección de la tarjeta → window.CR_open(mod, oración)
//               que salta al bloque/línea donde vive la frase practicada;
//           (c) Biblioteca del Lector (entradas de clásicos).
(function classicsReadInit() {
    'use strict';
    const DATA = (typeof window.CLASSIC_TEXTS !== 'undefined') ? window.CLASSIC_TEXTS : null;
    if (!DATA) return;
    const T = (typeof window.CLASSIC_T !== 'undefined') ? window.CLASSIC_T : { line: {}, label: {} };

    const $ = (id) => document.getElementById(id);
    const escHtml = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const pop = $('cread-pop');
    if (!pop) return;
    const body = $('cr-body'), progNum = $('cr-progress-num');

    const CR = { mod: null, block: 0, pinyin: false };

    // ── utilidades compartidas con lessonsInit ──
    const zhKey = () => (typeof ck === 'function') ? ck() : 'simp';
    const pyLine = (zh) => {
        try { return (typeof pinyinPro !== 'undefined') ? pinyinPro.pinyin(zh) : ''; }
        catch (e) { return ''; }
    };

    // ── matcher: oración practicada → bloque/línea del texto original ──
    // 1) normaliza (solo Han) · 2) alias de citas abreviadas · 3) contención
    // 4) respaldo: solapamiento de pares de caracteres (Dice ≥ 0.55).
    const CR_ALIAS = { // EL MISMO mapa vive en scripts/build_classics_v92.py
        '生于忧患死于安乐': '生于忧患而死于安乐',
        '祸兮福所倚福兮祸所伏': '祸兮福之所倚福兮祸之所伏',
        '佛说世界即非世界是名世界': '如来说世界非世界是名世界',
        '行远必自迩登高必自卑': '行远必自迩辟如登高必自卑'
    };
    const CR_NO_HIT = { '百善孝为先。': 1 }; // proverbio posterior, no es del 孝经
    function crNorm(s) {
        const m = String(s == null ? '' : s).match(/[\u3400-\u9FFF\uF900-\uFAFF]/g) || [];
        return m.join('');
    }
    function crDice(a, b) {
        if (!a || !b) return 0;
        const bg = (s) => { const out = new Set(); for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2)); return out; };
        const A = bg(a), B = bg(b);
        let inter = 0;
        A.forEach(x => { if (B.has(x)) inter++; });
        return (2 * inter) / (A.size + B.size);
    }
    function findLine(mod, sentence) {
        let target = crNorm(sentence && sentence.chinese_simp_full);
        if (!target) return { block: 0, line: -1 };
        if (CR_NO_HIT[sentence.chinese_simp_full]) return { block: 0, line: -1 };
        if (CR_ALIAS[target]) target = CR_ALIAS[target];
        const blocks = DATA[mod].blocks;
        let best = { r: 0, block: 0, line: -1 };
        for (let b = 0; b < blocks.length; b++) {
            const lines = blocks[b].l;
            for (let i = 0; i < lines.length; i++) {
                const ln = crNorm(lines[i][0]);
                if (!ln) continue;
                if (ln.indexOf(target) !== -1 || target.indexOf(ln) !== -1) return { block: b, line: i };
                const r = crDice(target, ln);
                if (r > best.r) best = { r, block: b, line: i };
            }
        }
        return best.r >= 0.55 ? { block: best.block, line: best.line } : { block: 0, line: -1 };
    }

    // ── TTS: mismo pipeline que el lector de lecciones ──
    let crAudio = null;
    async function speakCr(text, el) {
        try {
            if (typeof globalAudioPlayer !== 'undefined' && globalAudioPlayer.src) {
                globalAudioPlayer.pause();
                if (typeof isPlaying !== 'undefined') isPlaying = false;
            }
            if (crAudio) { crAudio.pause(); crAudio = null; }
            if (el) el.classList.add('lq-speaking');
            const resp = await fetchTTS({ text, lang: 'zh-CN', voice: voiceZh }, 12000);
            if (!resp.ok) throw new Error('TTS http ' + resp.status);
            const data = await resp.json();
            if (!data.audio) throw new Error('TTS sin audio');
            const bin = atob(data.audio);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
            crAudio = new Audio(url);
            crAudio.playbackRate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
            await crAudio.play();
            crAudio.onended = () => { URL.revokeObjectURL(url); crAudio = null; if (el) el.classList.remove('lq-speaking'); };
        } catch (e) {
            try {
                if ('speechSynthesis' in window) {
                    speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(text);
                    u.lang = 'zh-CN';
                    u.rate = (typeof playbackSpeed === 'number') ? playbackSpeed : 1;
                    speechSynthesis.speak(u);
                }
            } catch (e2) { /* silencioso */ }
            if (el) el.classList.remove('lq-speaking');
        }
    }
    function stopCrSpeak() {
        if (crAudio) { crAudio.pause(); crAudio = null; }
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { }
        body.querySelectorAll('.lq-speaking').forEach(el => el.classList.remove('lq-speaking'));
    }

    // ── preferencia 🇪🇸 COMPARTIDA con las lecciones ('ac_lq_es') ──
    const esPref = () => { try { return localStorage.getItem('ac_lq_es') === '1'; } catch (e) { return false; } };
    const setEsPref = (v) => { try { localStorage.setItem('ac_lq_es', v ? '1' : '0'); } catch (e) { } };

    // ── overlay ──
    function openCrPop() {
        pop.classList.remove('hidden');
        try { document.body.style.overflow = 'hidden'; } catch (e) { }
    }
    function closeCrPop() {
        stopCrSpeak();
        pop.classList.add('hidden');
        try { document.body.style.overflow = ''; } catch (e) { }
        CR.mod = null;
    }

    // ── vista: un bloque del texto original ──
    function renderBlock(hitLine) {
        const mod = CR.mod, info = DATA[mod];
        const k = zhKey(), trad = (k === 'trad');
        const blocks = info.blocks, b = CR.block, blk = blocks[b];
        const cinfo = (typeof CLASSICS_INFO !== 'undefined') ? CLASSICS_INFO[mod] : null;
        const titleZh = cinfo ? (trad ? cinfo.zhT : cinfo.zh) : (trad ? (T.label[mod] || '') : '');
        const flatBase = blocks.slice(0, b).reduce((a, x) => a + x.l.length, 0);
        const tlines = T.line[mod] || [];
        const tlabels = T.label[mod] || [];
        progNum.textContent = (b + 1) + '/' + blocks.length;

        const lines = blk.l.map((pair, i) => {
            const zh = trad ? (tlines[flatBase + i] || pair[0]) : pair[0];
            // v9.2 fix: si el pinyin está ON, las líneas de un bloque nuevo nacen
            // CON pinyin (antes quedaban vacías/ocultas hasta re-tocar el botón)
            const pyCls = CR.pinyin ? 'lq-line-py' : 'lq-line-py hidden';
            return '<div class="lq-line' + (i === hitLine ? ' cr-flash' : '') + '" data-i="' + i + '"' +
                (i === hitLine ? ' id="cr-hit"' : '') + ' role="button" tabindex="0" title="Tocá para escuchar">' +
                '<div class="lq-line-zh">' + escHtml(zh) + '</div>' +
                '<div class="' + pyCls + '" data-zh="' + escHtml(zh) + '">' + (CR.pinyin ? escHtml(pyLine(zh)) : '') + '</div>' +
                '<div class="lq-line-es' + (esPref() ? '' : ' hidden') + '">' + escHtml(pair[1]) + '</div></div>';
        }).join('');

        const chips = blocks.map((x, i) =>
            '<button type="button" class="cr-chip' + (i === b ? ' active' : '') + '" data-b="' + i + '">' +
            escHtml(trad ? (tlabels[i] || x.n) : x.n) + '</button>').join('');

        const badgeTxt = info.badge === 'completo' ? 'texto completo' : 'selección de capítulos';
        body.innerHTML =
            '<div class="lq-story-head"><span class="lq-story-emoji">' + info.emoji + '</span>' +
            '<div><div class="lq-story-zh">' + escHtml(titleZh) + '</div>' +
            '<div class="lq-story-es">' + escHtml(info.es) + ' · ' + badgeTxt + '</div></div></div>' +
            '<p class="cr-intro">' + escHtml(info.intro) + '</p>' +
            '<div class="cr-chips" id="cr-chips">' + chips + '</div>' +
            '<div class="lq-lines" id="cr-lines">' + lines + '</div>' +
            '<div class="lq-story-foot">' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-es">🇪🇸 Español: ' + (esPref() ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-py">🔤 Pinyin: ' + (CR.pinyin ? 'ON' : 'OFF') + '</button>' +
            '<button type="button" class="lq-btn lq-primary" id="cr-practice">🎯 Practicar este clásico</button>' +
            '</div>' +
            '<div class="cr-nav">' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-prev"' + (b === 0 ? ' disabled' : '') + '>‹ Anterior</button>' +
            '<span class="cr-nav-num">' + escHtml(trad ? (tlabels[b] || blk.n) : blk.n) + '</span>' +
            '<button type="button" class="lq-btn lq-ghost" id="cr-next"' + (b === blocks.length - 1 ? ' disabled' : '') + '>Siguiente ›</button>' +
            '</div>';

        body.querySelector('#cr-es').addEventListener('click', (e) => {
            const v = !esPref();
            setEsPref(v);
            e.target.textContent = '🇪🇸 Español: ' + (v ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-es').forEach(el => el.classList.toggle('hidden', !v));
        });
        body.querySelector('#cr-py').addEventListener('click', (e) => {
            CR.pinyin = !CR.pinyin;
            e.target.textContent = '🔤 Pinyin: ' + (CR.pinyin ? 'ON' : 'OFF');
            body.querySelectorAll('.lq-line-py').forEach(el => {
                if (CR.pinyin && !el.textContent) el.textContent = pyLine(el.dataset.zh);
                el.classList.toggle('hidden', !CR.pinyin);
            });
        });
        body.querySelector('#cr-practice').addEventListener('click', () => {
            closeCrPop();
            if (typeof setModule === 'function') setModule(mod);
            const card = $('sentence-card');
            if (card) try { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { }
        });
        body.querySelector('#cr-prev').addEventListener('click', () => {
            if (CR.block > 0) { CR.block--; renderBlock(-1); }
        });
        body.querySelector('#cr-next').addEventListener('click', () => {
            if (CR.block < DATA[mod].blocks.length - 1) { CR.block++; renderBlock(-1); }
        });
        body.querySelector('#cr-chips').addEventListener('click', (e) => {
            const chip = e.target.closest('.cr-chip');
            if (!chip) return;
            CR.block = +chip.dataset.b;
            renderBlock(-1);
        });
        body.querySelector('#cr-lines').addEventListener('click', (e) => {
            const line = e.target.closest('.lq-line');
            if (!line) return;
            const i = +line.dataset.i;
            const pair = blk.l[i];
            speakCr(trad ? (tlines[flatBase + i] || pair[0]) : pair[0], line.querySelector('.lq-line-zh'));
        });
        if (hitLine >= 0) {
            const hit = body.querySelector('#cr-hit');
            if (hit) try { hit.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { }
        }
    }

    function openCr(mod, blockIdx, hitLine) {
        if (!DATA[mod]) return false;
        CR.mod = mod;
        CR.block = Math.max(0, Math.min(blockIdx || 0, DATA[mod].blocks.length - 1));
        openCrPop();
        renderBlock(hitLine === undefined ? -1 : hitLine);
        return true;
    }

    // API pública: abrir el lector de un clásico (y saltar a la frase si hay)
    window.CR_open = function (mod, sentence) {
        if (!DATA[mod]) return false;
        let block = 0, line = -1;
        if (sentence) {
            const hit = findLine(mod, sentence);
            block = hit.block; line = hit.line;
        }
        return openCr(mod, block, line);
    };

    // ── lista directa en la pestaña Clásicos ──
    function renderCrList() {
        const wrap = $('cread-list');
        if (!wrap) return;
        const k = zhKey(), trad = (k === 'trad');
        wrap.innerHTML = '';
        Object.keys(DATA).forEach(mod => {
            const info = DATA[mod];
            const cinfo = (typeof CLASSICS_INFO !== 'undefined') ? CLASSICS_INFO[mod] : null;
            const zh = cinfo ? (trad ? cinfo.zhT : cinfo.zh) : '';
            const nLines = info.blocks.reduce((a, x) => a + x.l.length, 0);
            const card = document.createElement('div');
            card.className = 'cr-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.dataset.mod = mod;
            card.innerHTML =
                '<div class="cr-card-top"><span class="cr-emoji" aria-hidden="true">' + info.emoji + '</span>' +
                '<span class="cr-zh">' + escHtml(zh) + '</span>' +
                '<span class="cr-badge' + (info.badge === 'completo' ? ' full' : '') + '">' +
                (info.badge === 'completo' ? '✓ completo' : 'selección') + '</span></div>' +
                '<div class="cr-es">' + escHtml(info.es) + '</div>' +
                '<div class="cr-meta">' + info.blocks.length + ' bloques · ' + nLines + ' líneas</div>' +
                '<div class="cr-cta">📖 Leer el original</div>';
            wrap.appendChild(card);
        });
    }
    function bindCrList() {
        const wrap = $('cread-list');
        if (!wrap) return;
        wrap.addEventListener('click', (e) => {
            const card = e.target.closest('.cr-card');
            if (card) openCr(card.dataset.mod, 0, -1);
        });
        wrap.addEventListener('keydown', (e) => {
            const card = e.target.closest('.cr-card');
            if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openCr(card.dataset.mod, 0, -1); }
        });
    }

    function bindCrPop() {
        $('cr-close').addEventListener('click', closeCrPop);
        pop.addEventListener('click', (e) => { if (e.target === pop) closeCrPop(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !pop.classList.contains('hidden')) closeCrPop();
        });
        // el switch 简/繁 re-renderiza el bloque abierto y la lista
        document.addEventListener('ac-script-change', () => {
            if (CR.mod && !pop.classList.contains('hidden')) renderBlock(-1);
            renderCrList();
        });
    }

    function boot() {
        bindCrList();
        bindCrPop();
        renderCrList();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    // API de solo lectura para pruebas E2E
    window.CR_DEBUG = {
        get mods() { return Object.keys(DATA).length; },
        get view() { return { mod: CR.mod, block: CR.block, open: !pop.classList.contains('hidden') }; },
        get flash() { return !!body.querySelector('.cr-flash'); }
    };
})();
