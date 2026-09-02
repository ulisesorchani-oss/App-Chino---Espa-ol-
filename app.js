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
'todas': [{"id":1,"level":1,"module":"Saludos","spanish_full":"Hola, ¿cómo estás?","spanish_cloze":"___, ¿cómo estás?","spanish_answer":"Hola","chinese_simp_full":"你好，你好吗？","chinese_simp_cloze":"___，你好吗？","chinese_simp_answer":"你好","chinese_trad_full":"你好，你好嗎？","chinese_trad_cloze":"___，你好嗎？","chinese_trad_answer":"你好","pinyin":"Nǐ hǎo, nǐ hǎo ma?"},{"id":2,"level":1,"module":"Saludos","spanish_full":"Me llamo Carlos.","spanish_cloze":"Me ___ Carlos.","spanish_answer":"llamo","chinese_simp_full":"我叫卡洛斯。","chinese_simp_cloze":"我___卡洛斯。","chinese_simp_answer":"叫","chinese_trad_full":"我叫卡洛斯。","chinese_trad_cloze":"我___卡洛斯。","chinese_trad_answer":"叫","pinyin":"Wǒ jiào Kǎluòsī."},{"id":3,"level":1,"module":"Saludos","spanish_full":"Gracias por tu ayuda.","spanish_cloze":"___ por tu ayuda.","spanish_answer":"Gracias","chinese_simp_full":"谢谢你的帮助。","chinese_simp_cloze":"___你的帮助。","chinese_simp_answer":"谢谢","chinese_trad_full":"謝謝你的幫助。","chinese_trad_cloze":"___你的幫助。","chinese_trad_answer":"謝謝","pinyin":"Xièxie nǐ de bāngzhù."},{"id":4,"level":2,"module":"Saludos","spanish_full":"Vivo en Buenos Aires.","spanish_cloze":"___ en Buenos Aires.","spanish_answer":"Vivo","chinese_simp_full":"我住在布宜诺斯艾利斯。","chinese_simp_cloze":"我___在布宜诺斯艾利斯。","chinese_simp_answer":"住","chinese_trad_full":"我住在布宜諾斯艾利斯。","chinese_trad_cloze":"我___在布宜諾斯艾利斯。","chinese_trad_answer":"住","pinyin":"Wǒ zhù zài Bùyínuòsī'àilìsī."},{"id":5,"level":2,"module":"Saludos","spanish_full":"¿Dónde está el baño?","spanish_cloze":"¿___ el baño?","spanish_answer":"Dónde está","chinese_simp_full":"洗手间在哪里？","chinese_simp_cloze":"洗手间___？","chinese_simp_answer":"在哪里","chinese_trad_full":"洗手間在哪裡？","chinese_trad_cloze":"洗手間___？","chinese_trad_answer":"在哪裡","pinyin":"Xǐshǒujiān zài nǎlǐ?"},{"id":6,"level":1,"module":"Saludos","spanish_full":"Buen día, ¿cómo andás?","spanish_cloze":"Buen día, ¿___?","spanish_answer":"cómo andás","chinese_simp_full":"早上好，你怎么样？","chinese_simp_cloze":"早上好，你___？","chinese_simp_answer":"怎么样","chinese_trad_full":"早上好，你怎麼樣？","chinese_trad_cloze":"早上好，你___？","chinese_trad_answer":"怎麼樣","pinyin":"Zǎoshang hǎo, nǐ zěnmeyàng?"},{"id":7,"level":1,"module":"Saludos","spanish_full":"Mucho gusto, soy de China.","spanish_cloze":"Mucho gusto, ___ de China.","spanish_answer":"soy","chinese_simp_full":"很高兴认识你，我是中国人。","chinese_simp_cloze":"很高兴___你，我是中国人。","chinese_simp_answer":"认识","chinese_trad_full":"很高興認識你，我是中國人。","chinese_trad_cloze":"很高興___你，我是中國人。","chinese_trad_answer":"認識","pinyin":"Hěn gāoxìng rènshi nǐ, wǒ shì Zhōngguó rén."},{"id":8,"level":1,"module":"Saludos","spanish_full":"Hasta mañana, descansa.","spanish_cloze":"Hasta mañana, ___.","spanish_answer":"descansa","chinese_simp_full":"明天见，好好休息。","chinese_simp_cloze":"明天见，好好___。","chinese_simp_answer":"休息","chinese_trad_full":"明天見，好好休息。","chinese_trad_cloze":"明天見，好好___。","chinese_trad_answer":"休息","pinyin":"Míngtiān jiàn, hǎohǎo xiūxi."},{"id":9,"level":1,"module":"Saludos","spanish_full":"¿Todo bien? Sí, todo bien.","spanish_cloze":"¿___ bien? Sí, todo bien.","spanish_answer":"Todo","chinese_simp_full":"一切都好吗？是的，一切都好。","chinese_simp_cloze":"___都好吗？是的，一切都好。","chinese_simp_answer":"一切","chinese_trad_full":"一切都好嗎？是的，一切都好。","chinese_trad_cloze":"___都好嗎？是的，一切都好。","chinese_trad_answer":"一切","pinyin":"Yíqiè dōu hǎo ma? Shì de, yíqiè dōu hǎo."},{"id":10,"level":1,"module":"Saludos","spanish_full":"Chau, nos vemos después.","spanish_cloze":"___, nos vemos después.","spanish_answer":"Chau","chinese_simp_full":"再见，一会儿见。","chinese_simp_cloze":"___，一会儿见。","chinese_simp_answer":"再见","chinese_trad_full":"再見，一會兒見。","chinese_trad_cloze":"___，一會兒見。","chinese_trad_answer":"再見","pinyin":"Zàijiàn, yíhuìr jiàn.","spanish_alternatives":["Chao","Adiós","Hasta luego"]},{"id":11,"level":1,"module":"Saludos","spanish_full":"Bienvenidos a mi casa.","spanish_cloze":"___ a mi casa.","spanish_answer":"Bienvenidos","chinese_simp_full":"欢迎来我家。","chinese_simp_cloze":"___来我家。","chinese_simp_answer":"欢迎","chinese_trad_full":"歡迎來我家。","chinese_trad_cloze":"___來我家。","chinese_trad_answer":"歡迎","pinyin":"Huānyíng lái wǒ jiā."},{"id":12,"level":2,"module":"Migraciones","spanish_full":"Necesito renovar mi visa.","spanish_cloze":"Necesito ___ mi visa.","spanish_answer":"renovar","chinese_simp_full":"我需要续签我的签证。","chinese_simp_cloze":"我需要___我的签证。","chinese_simp_answer":"续签","chinese_trad_full":"我需要續簽我的簽證。","chinese_trad_cloze":"我需要___我的簽證。","chinese_trad_answer":"續簽","pinyin":"Wǒ xūyào xùqiān wǒ de qiānzhèng.","spanish_alternatives":["tramitar","extender","prorrogar"]},{"id":13,"level":2,"module":"Migraciones","spanish_full":"¿Dónde puedo sacar el turno?","spanish_cloze":"¿Dónde puedo ___ el turno?","spanish_answer":"sacar","chinese_simp_full":"我在哪里可以预约？","chinese_simp_cloze":"我在哪里可以___？","chinese_simp_answer":"预约","chinese_trad_full":"我在哪裡可以預約？","chinese_trad_cloze":"我在哪裡可以___？","chinese_trad_answer":"預約","pinyin":"Wǒ zài nǎlǐ kěyǐ yùyuē?","spanish_alternatives":["obtener","conseguir","reservar"]},{"id":14,"level":2,"module":"Migraciones","spanish_full":"Mi pasaporte vence en marzo.","spanish_cloze":"Mi ___ vence en marzo.","spanish_answer":"pasaporte","chinese_simp_full":"我的护照三月份到期。","chinese_simp_cloze":"我的___三月份到期。","chinese_simp_answer":"护照","chinese_trad_full":"我的護照三月份到期。","chinese_trad_cloze":"我的___三月份到期。","chinese_trad_answer":"護照","pinyin":"Wǒ de hùzhào sān yuèfèn dàoqī."},{"id":15,"level":2,"module":"Migraciones","spanish_full":"Tengo que tramitar el DNI.","spanish_cloze":"Tengo que ___ el DNI.","spanish_answer":"tramitar","chinese_simp_full":"我需要办理身份证。","chinese_simp_cloze":"我需要___身份证。","chinese_simp_answer":"办理","chinese_trad_full":"我需要辦理身份證。","chinese_trad_cloze":"我需要___身份證。","chinese_trad_answer":"辦理","pinyin":"Wǒ xūyào bànlǐ shēnfènzhèng.","spanish_alternatives":["hacer","gestionar","solicitar"]},{"id":16,"level":2,"module":"Migraciones","spanish_full":"¿Cuánto sale la gestión?","spanish_cloze":"¿Cuánto sale la ___?","spanish_answer":"gestión","chinese_simp_full":"办理费用是多少？","chinese_simp_cloze":"办理___是多少？","chinese_simp_answer":"费用","chinese_trad_full":"辦理費用是多少？","chinese_trad_cloze":"辦理___是多少？","chinese_trad_answer":"費用","pinyin":"Bànlǐ fèiyòng shì duōshǎo?","spanish_alternatives":["trámite"]},{"id":17,"level":3,"module":"Migraciones","spanish_full":"Necesito una certificación de domicilio.","spanish_cloze":"Necesito una ___ de domicilio.","spanish_answer":"certificación","chinese_simp_full":"我需要住址证明。","chinese_simp_cloze":"我需要住址___。","chinese_simp_answer":"证明","chinese_trad_full":"我需要住址證明。","chinese_trad_cloze":"我需要住址___。","chinese_trad_answer":"證明","pinyin":"Wǒ xūyào zhùzhǐ zhèngmíng.","spanish_alternatives":["constancia","comprobante"]},{"id":18,"level":3,"module":"Migraciones","spanish_full":"¿Esta documentación es válida?","spanish_cloze":"¿Esta documentación es ___?","spanish_answer":"válida","chinese_simp_full":"这个文件有效吗？","chinese_simp_cloze":"这个文件___吗？","chinese_simp_answer":"有效","chinese_trad_full":"這個文件有效嗎？","chinese_trad_cloze":"這個文件___嗎？","chinese_trad_answer":"有效","pinyin":"Zhège wénjiàn yǒuxiào ma?","spanish_alternatives":["vigente"]},{"id":19,"level":2,"module":"Migraciones","spanish_full":"Fui a la Dirección Nacional de Migraciones.","spanish_cloze":"Fui a la Dirección Nacional de ___.","spanish_answer":"Migraciones","chinese_simp_full":"我今天去了移民局。","chinese_simp_cloze":"我今天去了___。","chinese_simp_answer":"移民局","chinese_trad_full":"我今天去了移民局。","chinese_trad_cloze":"我今天去了___。","chinese_trad_answer":"移民局","pinyin":"Wǒ jīntiān qùle yímínjú."},{"id":20,"level":3,"module":"Migraciones","spanish_full":"El trámite demora dos semanas.","spanish_cloze":"El ___ demora dos semanas.","spanish_answer":"trámite","chinese_simp_full":"这个手续需要两周时间。","chinese_simp_cloze":"这个___需要两周时间。","chinese_simp_answer":"手续","chinese_trad_full":"這個手續需要兩週時間。","chinese_trad_cloze":"這個___需要兩週時間。","chinese_trad_answer":"手續","pinyin":"Zhège shǒuxù xūyào liǎng zhōu shíjiān.","spanish_alternatives":["gestión","proceso"]},{"id":21,"level":3,"module":"Migraciones","spanish_full":"¿Me pueden dar un comprobante?","spanish_cloze":"¿Me pueden dar un ___?","spanish_answer":"comprobante","chinese_simp_full":"能给我一张收据吗？","chinese_simp_cloze":"能给我一张___吗？","chinese_simp_answer":"收据","chinese_trad_full":"能給我一張收據嗎？","chinese_trad_cloze":"能給我一張___嗎？","chinese_trad_answer":"收據","pinyin":"Néng gěi wǒ yì zhāng shōujù ma?","spanish_alternatives":["recibo","constancia"]},{"id":22,"level":2,"module":"Supermercado","spanish_full":"¿Dónde están los fideos?","spanish_cloze":"¿Dónde están los ___?","spanish_answer":"fideos","chinese_simp_full":"面条在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"面条","chinese_trad_full":"麵條在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"麵條","pinyin":"Miàntiáo zài nǎlǐ?","spanish_alternatives":["pastas"]},{"id":23,"level":2,"module":"Supermercado","spanish_full":"¿Tienen facturas de manteca?","spanish_cloze":"¿Tienen ___ de manteca?","spanish_answer":"facturas","chinese_simp_full":"你们有黄油饼干吗？","chinese_simp_cloze":"你们有黄油___吗？","chinese_simp_answer":"饼干","chinese_trad_full":"你們有黃油餅乾嗎？","chinese_trad_cloze":"你們有黃油___嗎？","chinese_trad_answer":"餅乾","pinyin":"Nǐmen yǒu huángyóu bǐnggān ma?"},{"id":24,"level":2,"module":"Supermercado","spanish_full":"Quiero medio kilo de yerba mate.","spanish_cloze":"Quiero ___ de yerba mate.","spanish_answer":"medio kilo","chinese_simp_full":"我要半公斤马黛茶。","chinese_simp_cloze":"我要___马黛茶。","chinese_simp_answer":"半公斤","chinese_trad_full":"我要半公斤馬黛茶。","chinese_trad_cloze":"我要___馬黛茶。","chinese_trad_answer":"半公斤","pinyin":"Wǒ yào bàn gōngjīn mǎdàichá."},{"id":25,"level":2,"module":"Supermercado","spanish_full":"¿Cuánto sale el pan francés?","spanish_cloze":"¿___ el pan francés?","spanish_answer":"Cuánto sale","chinese_simp_full":"法棍面包多少钱？","chinese_simp_cloze":"法棍面包___？","chinese_simp_answer":"多少钱","chinese_trad_full":"法棍麵包多少錢？","chinese_trad_cloze":"法棍麵包___？","chinese_trad_answer":"多少錢","pinyin":"Fǎgùn miànbāo duōshǎo qián?","spanish_alternatives":["Cuánto cuesta","Cuánto es","Cuánto vale"]},{"id":26,"level":2,"module":"Supermercado","spanish_full":"Pago con tarjeta o en efectivo.","spanish_cloze":"Pago con tarjeta o en ___.","spanish_answer":"efectivo","chinese_simp_full":"我用卡或者现金付。","chinese_simp_cloze":"我用卡或者___付。","chinese_simp_answer":"现金","chinese_trad_full":"我用卡或者現金付。","chinese_trad_cloze":"我用卡或者___付。","chinese_trad_answer":"現金","pinyin":"Wǒ yòng kǎ huòzhě xiànjīn fù.","spanish_alternatives":["dinero","billetes"]},{"id":27,"level":2,"module":"Supermercado","spanish_full":"¿Hay descuento con la tarjeta?","spanish_cloze":"¿Hay ___ con la tarjeta?","spanish_answer":"descuento","chinese_simp_full":"刷卡有折扣吗？","chinese_simp_cloze":"刷卡有___吗？","chinese_simp_answer":"折扣","chinese_trad_full":"刷卡有折扣嗎？","chinese_trad_cloze":"刷卡有___嗎？","chinese_trad_answer":"折扣","pinyin":"Shuākǎ yǒu zhékòu ma?","spanish_alternatives":["promoción","rebaja","oferta"]},{"id":28,"level":2,"module":"Supermercado","spanish_full":"¿Dónde está la caja?","spanish_cloze":"¿Dónde está la ___?","spanish_answer":"caja","chinese_simp_full":"收银台在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"收银台","chinese_trad_full":"收銀台在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"收銀台","pinyin":"Shōuyíntái zài nǎlǐ?"},{"id":29,"level":1,"module":"Supermercado","spanish_full":"Necesito una bolsa, por favor.","spanish_cloze":"Necesito una bolsa, ___.","spanish_answer":"por favor","chinese_simp_full":"请给我一个袋子。","chinese_simp_cloze":"___给我一个袋子。","chinese_simp_answer":"请","chinese_trad_full":"請給我一個袋子。","chinese_trad_cloze":"___給我一個袋子。","chinese_trad_answer":"請","pinyin":"Qǐng gěi wǒ yí ge dàizi."},{"id":30,"level":2,"module":"Supermercado","spanish_full":"¿Tienen delivery a domicilio?","spanish_cloze":"¿Tienen ___ a domicilio?","spanish_answer":"delivery","chinese_simp_full":"你们有送货上门服务吗？","chinese_simp_cloze":"你们有送货上门___吗？","chinese_simp_answer":"服务","chinese_trad_full":"你們有送貨上門服務嗎？","chinese_trad_cloze":"你們有送貨上門___嗎？","chinese_trad_answer":"服務","pinyin":"Nǐmen yǒu sònghuò shàngmén fúwù ma?","spanish_alternatives":["envío"]},{"id":31,"level":2,"module":"Supermercado","spanish_full":"El precio subió otra vez.","spanish_cloze":"El precio ___ otra vez.","spanish_answer":"subió","chinese_simp_full":"价格又涨了。","chinese_simp_cloze":"价格又___了。","chinese_simp_answer":"涨","chinese_trad_full":"價格又漲了。","chinese_trad_cloze":"價格又___了。","chinese_trad_answer":"漲","pinyin":"Jiàgé yòu zhǎng le.","spanish_alternatives":["aumentó","creció"]},{"id":32,"level":2,"module":"Supermercado","spanish_full":"¿Dónde puedo encontrar leche de almendras?","spanish_cloze":"¿Dónde puedo ___ leche de almendras?","spanish_answer":"encontrar","chinese_simp_full":"在哪里可以找到杏仁奶？","chinese_simp_cloze":"在哪里可以___杏仁奶？","chinese_simp_answer":"找到","chinese_trad_full":"在哪裡可以找到杏仁奶？","chinese_trad_cloze":"在哪裡可以___杏仁奶？","chinese_trad_answer":"找到","pinyin":"Zài nǎlǐ kěyǐ zhǎodào xìngrén nǎi?","spanish_alternatives":["hallar","conseguir","buscar"]},{"id":33,"level":1,"module":"Supermercado","spanish_full":"¿Me hacés un favor?","spanish_cloze":"¿Me ___ un favor?","spanish_answer":"hacés","chinese_simp_full":"你能帮我一个忙吗？","chinese_simp_cloze":"你能___我一个忙吗？","chinese_simp_answer":"帮","chinese_trad_full":"你能幫我一個忙嗎？","chinese_trad_cloze":"你能___我一個忙嗎？","chinese_trad_answer":"幫","pinyin":"Nǐ néng bāng wǒ yí ge máng ma?","spanish_alternatives":["podés","puedes"]},{"id":34,"level":3,"module":"Migraciones","spanish_full":"Me dieron el certificado de antecedentes.","spanish_cloze":"Me dieron el certificado de ___.","spanish_answer":"antecedentes","chinese_simp_full":"我拿到了无犯罪记录证明。","chinese_simp_cloze":"我拿到了无犯罪___证明。","chinese_simp_answer":"记录","chinese_trad_full":"我拿到了無犯罪記錄證明。","chinese_trad_cloze":"我拿到了無犯罪___證明。","chinese_trad_answer":"記錄","pinyin":"Wǒ ná dào le wú fànzuì jìlù zhèngmíng.","spanish_alternatives":["certificado"]},{"id":35,"level":3,"module":"Supermercado","spanish_full":"¿Aceptan Mercado Pago?","spanish_cloze":"¿___ Mercado Pago?","spanish_answer":"Aceptan","chinese_simp_full":"可以用Mercado Pago付吗？","chinese_simp_cloze":"___用Mercado Pago付吗？","chinese_simp_answer":"可以","chinese_trad_full":"可以用Mercado Pago付嗎？","chinese_trad_cloze":"___用Mercado Pago付嗎？","chinese_trad_answer":"可以","pinyin":"Kěyǐ yòng Mercado Pago fù ma?","spanish_alternatives":["Toman","Reciben"]},{"id":36,"level":1,"module":"Familia","spanish_full":"Mi madre cocina muy rico.","spanish_cloze":"Mi ___ cocina muy rico.","spanish_answer":"madre","chinese_simp_full":"我妈妈做饭很好吃。","chinese_simp_cloze":"我___做饭很好吃。","chinese_simp_answer":"妈妈","chinese_trad_full":"我媽媽做飯很好吃。","chinese_trad_cloze":"我___做飯很好吃。","chinese_trad_answer":"媽媽","pinyin":"Wǒ māma zuò fàn hěn hǎochī."},{"id":37,"level":1,"module":"Tiempo","spanish_full":"Hoy hace mucho calor.","spanish_cloze":"Hoy ___ mucho calor.","spanish_answer":"hace","chinese_simp_full":"今天天气很热。","chinese_simp_cloze":"今天___很热。","chinese_simp_answer":"天气","chinese_trad_full":"今天天氣很熱。","chinese_trad_cloze":"今天___很熱。","chinese_trad_answer":"天氣","pinyin":"Jīntiān tiānqì hěn rè."},{"id":38,"level":2,"module":"Transporte","spanish_full":"El subte está lleno a esta hora.","spanish_cloze":"El ___ está lleno a esta hora.","spanish_answer":"subte","spanish_alternatives":["metro"],"chinese_simp_full":"这个点地铁很挤。","chinese_simp_cloze":"这个点___很挤。","chinese_simp_answer":"地铁","chinese_trad_full":"這個點地鐵很擠。","chinese_trad_cloze":"這個點___很擠。","chinese_trad_answer":"地鐵","pinyin":"Zhège diǎn dìtiě hěn jǐ."},{"id":39,"level":2,"module":"Compras","spanish_full":"¿Me lo puede envolver para regalo?","spanish_cloze":"¿Me lo puede ___ para regalo?","spanish_answer":"envolver","chinese_simp_full":"能帮我包成礼物吗？","chinese_simp_cloze":"能帮我___成礼物吗？","chinese_simp_answer":"包","chinese_trad_full":"能幫我包成禮物嗎？","chinese_trad_cloze":"能幫我___成禮物嗎？","chinese_trad_answer":"包","pinyin":"Néng bāng wǒ bāo chéng lǐwù ma?"},{"id":40,"level":2,"module":"Direcciones","spanish_full":"Doble a la izquierda en la esquina.","spanish_cloze":"Doble a la ___ en la esquina.","spanish_answer":"izquierda","chinese_simp_full":"在拐角处向左转。","chinese_simp_cloze":"在拐角处向___转。","chinese_simp_answer":"左","chinese_trad_full":"在拐角處向左轉。","chinese_trad_cloze":"在拐角處向___轉。","chinese_trad_answer":"左","pinyin":"Zài guǎijiǎo chù xiàng zuǒzhuǎn."},{"id":41,"level":3,"module":"Salud","spanish_full":"Tengo que tomar esta medicina tres veces al día.","spanish_cloze":"Tengo que ___ esta medicina tres veces al día.","spanish_answer":"tomar","chinese_simp_full":"我得一天吃三次这个药。","chinese_simp_cloze":"我得一天___三次这个药。","chinese_simp_answer":"吃","chinese_trad_full":"我得一天吃三次這個藥。","chinese_trad_cloze":"我得一天___三次這個藥。","chinese_trad_answer":"吃","pinyin":"Wǒ děi yì tiān chī sān cì zhège yào."},{"id":42,"level":3,"module":"Trabajo","spanish_full":"Mi jefe me pidió que termine el informe hoy.","spanish_cloze":"Mi ___ me pidió que termine el informe hoy.","spanish_answer":"jefe","chinese_simp_full":"老板让我今天完成报告。","chinese_simp_cloze":"___让我今天完成报告。","chinese_simp_answer":"老板","chinese_trad_full":"老闆讓我今天完成報告。","chinese_trad_cloze":"___讓我今天完成報告。","chinese_trad_answer":"老闆","pinyin":"Lǎobǎn ràng wǒ jīntiān wánchéng bàogào."},{"id":43,"level":3,"module":"Opiniones","spanish_full":"Creo que aprender español es difícil pero útil.","spanish_cloze":"___ que aprender español es difícil pero útil.","spanish_answer":"Creo","chinese_simp_full":"我觉得学西班牙语虽然难但是很有用。","chinese_simp_cloze":"我___学西班牙语虽然难但是很有用。","chinese_simp_answer":"觉得","chinese_trad_full":"我覺得學西班牙語雖然難但是很有用。","chinese_trad_cloze":"我___學西班牙語雖然難但是很有用。","chinese_trad_answer":"覺得","pinyin":"Wǒ juéde xué Xībānyáyǔ suīrán nán dànshì hěn yǒuyòng."},{"id":44,"level":1,"module":"Comida","spanish_full":"Quiero comer empanadas de carne.","spanish_cloze":"Quiero ___ empanadas de carne.","spanish_answer":"comer","chinese_simp_full":"我想吃肉馅的馅饼。","chinese_simp_cloze":"我想___肉馅的馅饼。","chinese_simp_answer":"吃","chinese_trad_full":"我想吃肉餡的餡餅。","chinese_trad_cloze":"我想___肉餡的餡餅。","chinese_trad_answer":"吃","pinyin":"Wǒ xiǎng chī ròu xiàn de xiànbǐng."},{"id":45,"level":2,"module":"Vivienda","spanish_full":"El alquiler subió mucho este mes.","spanish_cloze":"El ___ subió mucho este mes.","spanish_answer":"alquiler","chinese_simp_full":"这个月房租涨了很多。","chinese_simp_cloze":"这个月___涨了很多。","chinese_simp_answer":"房租","chinese_trad_full":"這個月房租漲了很多。","chinese_trad_cloze":"這個月___漲了很多。","chinese_trad_answer":"房租","pinyin":"Zhège yuè fángzū zhǎngle hěn duō."},{"id":46,"level":3,"module":"Sentimientos","spanish_full":"Estoy cansado porque trabajé demasiado.","spanish_cloze":"Estoy ___ porque trabajé demasiado.","spanish_answer":"cansado","chinese_simp_full":"我很累因为工作太多了。","chinese_simp_cloze":"我很___因为工作太多了。","chinese_simp_answer":"累","chinese_trad_full":"我很累因為工作太多了。","chinese_trad_cloze":"我很___因為工作太多了。","chinese_trad_answer":"累","pinyin":"Wǒ hěn lèi yīnwèi gōngzuò tài duō le."},{"id":47,"level":2,"module":"Supermercado","spanish_full":"¿Tiene cambio de mil pesos?","spanish_cloze":"¿Tiene ___ de mil pesos?","spanish_answer":"cambio","chinese_simp_full":"您有一千块的零钱吗？","chinese_simp_cloze":"您有一千块的___吗？","chinese_simp_answer":"零钱","chinese_trad_full":"您有一千塊的零錢嗎？","chinese_trad_cloze":"您有一千塊的___嗎？","chinese_trad_answer":"零錢","pinyin":"Nín yǒu yì qiān kuài de língqián ma?"},{"id":48,"level":3,"module":"Migraciones","spanish_full":"Debo presentar los originales y las copias.","spanish_cloze":"Debo presentar los ___ y las copias.","spanish_answer":"originales","chinese_simp_full":"我必须提交原件和复印件。","chinese_simp_cloze":"我必须提交___和复印件。","chinese_simp_answer":"原件","chinese_trad_full":"我必須提交原件和複印件。","chinese_trad_cloze":"我必須提交___和複印件。","chinese_trad_answer":"原件","pinyin":"Wǒ bìxū tíjiāo yuánjiàn hé fùyìnjiàn."},{"id":49,"level":1,"module":"Rutina","spanish_full":"Me levanto temprano todos los días.","spanish_cloze":"Me ___ temprano todos los días.","spanish_answer":"levanto","chinese_simp_full":"我每天早起。","chinese_simp_cloze":"我每天___。","chinese_simp_answer":"早起","chinese_trad_full":"我每天早起。","chinese_trad_cloze":"我每天___。","chinese_trad_answer":"早起","pinyin":"Wǒ měitiān zǎoqǐ."},{"id":50,"level":3,"module":"Conectores","spanish_full":"No fui a trabajar porque estaba enfermo.","spanish_cloze":"No fui a trabajar ___ estaba enfermo.","spanish_answer":"porque","chinese_simp_full":"我没去上班因为我病了。","chinese_simp_cloze":"我没去上班___我病了。","chinese_simp_answer":"因为","chinese_trad_full":"我沒去上班因為我病了。","chinese_trad_cloze":"我沒去上班___我病了。","chinese_trad_answer":"因為","pinyin":"Wǒ méi qù shàngbān yīnwèi wǒ bìng le."},{"level":1,"module":"En un restaurante","spanish_full":"Mozo, queremos pedir.","spanish_cloze":"Mozo, queremos ___.","spanish_answer":"pedir","chinese_simp_full":"服务员，我们要点菜。","chinese_simp_cloze":"服务员，我们要___。","chinese_simp_answer":"点菜","chinese_trad_full":"服務員，我們要點菜。","chinese_trad_cloze":"服務員，我們要___。","chinese_trad_answer":"點菜","pinyin":"Fúwùyuán, wǒmen yào diǎncài.","spanish_alternatives":["ordenar"],"id":51},{"level":1,"module":"En un restaurante","spanish_full":"¿Este plato es un poco picante?","spanish_cloze":"¿Este plato es un poco ___?","spanish_answer":"picante","chinese_simp_full":"这道菜有点辣吗？","chinese_simp_cloze":"这道菜有点___吗？","chinese_simp_answer":"辣","chinese_trad_full":"這道菜有點辣嗎？","chinese_trad_cloze":"這道菜有點___嗎？","chinese_trad_answer":"辣","pinyin":"Zhè dào cài yǒudiǎn là ma?","id":52},{"level":1,"module":"En un restaurante","spanish_full":"Mozo, ¡la cuenta por favor!","spanish_cloze":"Mozo, ¡la ___ por favor!","spanish_answer":"cuenta","chinese_simp_full":"服务员，买单！","chinese_simp_cloze":"服务员，___！","chinese_simp_answer":"买单","chinese_trad_full":"服務員，買單！","chinese_trad_cloze":"服務員，___！","chinese_trad_answer":"買單","pinyin":"Fúwùyuán, mǎidān!","spanish_alternatives":["pagar"],"id":53},{"level":1,"module":"En un restaurante","spanish_full":"Sin cilantro, por favor.","spanish_cloze":"Sin ___, por favor.","spanish_answer":"cilantro","chinese_simp_full":"我不要香菜。","chinese_simp_cloze":"我不要___。","chinese_simp_answer":"香菜","chinese_trad_full":"我不要香菜。","chinese_trad_cloze":"我不要___。","chinese_trad_answer":"香菜","pinyin":"Wǒ bú yào xiāngcài.","id":54},{"level":1,"module":"En un restaurante","spanish_full":"Otro plato de arroz, por favor.","spanish_cloze":"Otro plato de ___, por favor.","spanish_answer":"arroz","chinese_simp_full":"再来一碗米饭。","chinese_simp_cloze":"再来一碗___。","chinese_simp_answer":"米饭","chinese_trad_full":"再來一碗米飯。","chinese_trad_cloze":"再來一碗___。","chinese_trad_answer":"米飯","pinyin":"Zài lái yì wǎn mǐfàn.","id":55},{"level":1,"module":"En un restaurante","spanish_full":"¿Se puede reservar mesa para esta noche?","spanish_cloze":"¿Se puede ___ mesa para esta noche?","spanish_answer":"reservar","chinese_simp_full":"可以订今晚的位子吗？","chinese_simp_cloze":"可以___今晚的位子吗？","chinese_simp_answer":"订","chinese_trad_full":"可以訂今晚的位子嗎？","chinese_trad_cloze":"可以___今晚的位子嗎？","chinese_trad_answer":"訂","pinyin":"Kěyǐ dìng jīnwǎn de wèizi ma?","spanish_alternatives":["reserva"],"id":56},{"level":1,"module":"En el colectivo","spanish_full":"¿Esta línea pasa por la estación de tren?","spanish_cloze":"¿Esta línea ___ la estación de tren?","spanish_answer":"pasa por","chinese_simp_full":"这路车经过火车站吗？","chinese_simp_cloze":"这路车___火车站吗？","chinese_simp_answer":"经过","chinese_trad_full":"這路車經過火車站嗎？","chinese_trad_cloze":"這路車___火車站嗎？","chinese_trad_answer":"經過","pinyin":"Zhè lù chē jīngguò huǒchēzhàn ma?","id":57},{"level":1,"module":"En el colectivo","spanish_full":"¿Cuánto lleva llegar al centro?","spanish_cloze":"¿___ lleva llegar al centro?","spanish_answer":"Cuánto","chinese_simp_full":"到市中心要多久？","chinese_simp_cloze":"到市中心要___？","chinese_simp_answer":"多久","chinese_trad_full":"到市中心要多久？","chinese_trad_cloze":"到市中心要___？","chinese_trad_answer":"多久","pinyin":"Dào shìzhōngxīn yào duō jiǔ?","spanish_alternatives":["cuánto tiempo"],"id":58},{"level":1,"module":"En el colectivo","spanish_full":"Quiero comprar una tarjeta de colectivo.","spanish_cloze":"Quiero comprar una ___ de colectivo.","spanish_answer":"tarjeta","chinese_simp_full":"我要买一张公交卡。","chinese_simp_cloze":"我要买一张___。","chinese_simp_answer":"公交卡","chinese_trad_full":"我要買一張公交卡。","chinese_trad_cloze":"我要買一張___。","chinese_trad_answer":"公交卡","pinyin":"Wǒ yào mǎi yì zhāng gōngjiāokǎ.","id":59},{"level":1,"module":"En el colectivo","spanish_full":"¿Cuál es la próxima parada?","spanish_cloze":"¿Cuál es la próxima ___?","spanish_answer":"parada","chinese_simp_full":"下一站是哪站？","chinese_simp_cloze":"下一___是哪站？","chinese_simp_answer":"站","chinese_trad_full":"下一站是哪站？","chinese_trad_cloze":"下一___是哪站？","chinese_trad_answer":"站","pinyin":"Xià yí zhàn shì nǎ zhàn?","id":60},{"level":1,"module":"En el colectivo","spanish_full":"Avisame cuando lleguemos a la parada, por favor.","spanish_cloze":"___ cuando lleguemos a la parada, por favor.","spanish_answer":"Avisame","chinese_simp_full":"请在到站时提醒我。","chinese_simp_cloze":"请在到站时___我。","chinese_simp_answer":"提醒","chinese_trad_full":"請在到站時提醒我。","chinese_trad_cloze":"請在到站時___我。","chinese_trad_answer":"提醒","pinyin":"Qǐng zài dàozhàn shí tíxǐng wǒ.","spanish_alternatives":["avisá"],"id":61},{"level":1,"module":"En el colectivo","spanish_full":"El colectivo viene lleno; parate firme.","spanish_cloze":"El colectivo viene lleno; ___.","spanish_answer":"parate firme","chinese_simp_full":"车上人多，站稳一点。","chinese_simp_cloze":"车上人多，___一点。","chinese_simp_answer":"站稳","chinese_trad_full":"車上人多，站穩一點。","chinese_trad_cloze":"車上人多，___一點。","chinese_trad_answer":"站穩","pinyin":"Chē shàng rén duō, zhànwěn yìdiǎn.","id":62},{"level":1,"module":"En el subterráneo","spanish_full":"¿Qué línea de subte va al aeropuerto?","spanish_cloze":"¿Qué ___ de subte va al aeropuerto?","spanish_answer":"línea","chinese_simp_full":"地铁几号线去机场？","chinese_simp_cloze":"地铁几号___去机场？","chinese_simp_answer":"线","chinese_trad_full":"地鐵幾號線去機場？","chinese_trad_cloze":"地鐵幾號___去機場？","chinese_trad_answer":"線","pinyin":"Dìtiě jǐ hào xiàn qù jīchǎng?","id":63},{"level":1,"module":"En el subterráneo","spanish_full":"¿Dónde se hace la fila para el control?","spanish_cloze":"¿Dónde se hace la fila para el ___?","spanish_answer":"control","chinese_simp_full":"安检在哪里排队？","chinese_simp_cloze":"___在哪里排队？","chinese_simp_answer":"安检","chinese_trad_full":"安檢在哪裡排隊？","chinese_trad_cloze":"___在哪裡排隊？","chinese_trad_answer":"安檢","pinyin":"Ānjiǎn zài nǎlǐ páiduì?","id":64},{"level":1,"module":"En el subterráneo","spanish_full":"No olvides pasar la tarjeta para entrar.","spanish_cloze":"No olvides pasar la ___ para entrar.","spanish_answer":"tarjeta","chinese_simp_full":"别忘了刷卡进站。","chinese_simp_cloze":"别忘了___进站。","chinese_simp_answer":"刷卡","chinese_trad_full":"別忘了刷卡進站。","chinese_trad_cloze":"別忘了___進站。","chinese_trad_answer":"刷卡","pinyin":"Bié wàngle shuākǎ jìn zhàn.","id":65},{"level":1,"module":"En el subterráneo","spanish_full":"En hora pico hay muchísima gente.","spanish_cloze":"En ___ hay muchísima gente.","spanish_answer":"hora pico","chinese_simp_full":"高峰期人真多啊。","chinese_simp_cloze":"___人真多啊。","chinese_simp_answer":"高峰期","chinese_trad_full":"高峰期人真多啊。","chinese_trad_cloze":"___人真多啊。","chinese_trad_answer":"高峰期","pinyin":"Gāofēngqī rén zhēn duō a.","id":66},{"level":1,"module":"En el subterráneo","spanish_full":"¿En qué estación cambio a la línea 2?","spanish_cloze":"¿En qué estación ___ a la línea 2?","spanish_answer":"cambio","chinese_simp_full":"换二号线在哪站？","chinese_simp_cloze":"___二号线在哪站？","chinese_simp_answer":"换","chinese_trad_full":"換二號線在哪站？","chinese_trad_cloze":"___二號線在哪站？","chinese_trad_answer":"換","pinyin":"Huàn èr hào xiàn zài nǎ zhàn?","id":67},{"level":1,"module":"En el subterráneo","spanish_full":"El subte es mucho más rápido que el colectivo.","spanish_cloze":"El subte es mucho más ___ que el colectivo.","spanish_answer":"rápido","chinese_simp_full":"地铁比公交快多了。","chinese_simp_cloze":"地铁比公交___多了。","chinese_simp_answer":"快","chinese_trad_full":"地鐵比公交快多了。","chinese_trad_cloze":"地鐵比公交___多了。","chinese_trad_answer":"快","pinyin":"Dìtiě bǐ gōngjiāo kuài duō le.","id":68},{"level":1,"module":"En la clase de idioma","spanish_full":"Profe, ¿qué significa esta palabra?","spanish_cloze":"Profe, ¿qué ___ esta palabra?","spanish_answer":"significa","chinese_simp_full":"老师，这个词什么意思？","chinese_simp_cloze":"老师，这个词什么___？","chinese_simp_answer":"意思","chinese_trad_full":"老師，這個詞什麼意思？","chinese_trad_cloze":"老師，這個詞什麼___？","chinese_trad_answer":"意思","pinyin":"Lǎoshī, zhège cí shénme yìsi?","id":69},{"level":1,"module":"En la clase de idioma","spanish_full":"Otra vez, por favor.","spanish_cloze":"___, por favor.","spanish_answer":"Otra vez","chinese_simp_full":"请再读一遍。","chinese_simp_cloze":"请再读一___。","chinese_simp_answer":"遍","chinese_trad_full":"請再讀一遍。","chinese_trad_cloze":"請再讀一___。","chinese_trad_answer":"遍","pinyin":"Qǐng zài dú yí biàn.","id":70},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Mi tono está mal?","spanish_cloze":"¿Mi ___ está mal?","spanish_answer":"tono","chinese_simp_full":"我的声调不对吗？","chinese_simp_cloze":"我的___不对吗？","chinese_simp_answer":"声调","chinese_trad_full":"我的聲調不對嗎？","chinese_trad_cloze":"我的___不對嗎？","chinese_trad_answer":"聲調","pinyin":"Wǒ de shēngdiào bú duì ma?","id":71},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Hoy dejaron tarea?","spanish_cloze":"¿Hoy dejaron ___?","spanish_answer":"tarea","chinese_simp_full":"今天布置作业吗？","chinese_simp_cloze":"今天布置___吗？","chinese_simp_answer":"作业","chinese_trad_full":"今天佈置作業嗎？","chinese_trad_cloze":"今天佈置___嗎？","chinese_trad_answer":"作業","pinyin":"Jīntiān bùzhì zuòyè ma?","id":72},{"level":1,"module":"En la clase de idioma","spanish_full":"¿Puedo usar el diccionario chino?","spanish_cloze":"¿Puedo usar el ___ chino?","spanish_answer":"diccionario","chinese_simp_full":"我可以用汉语词典吗？","chinese_simp_cloze":"我可以用汉语___吗？","chinese_simp_answer":"词典","chinese_trad_full":"我可以用漢語詞典嗎？","chinese_trad_cloze":"我可以用漢語___嗎？","chinese_trad_answer":"詞典","pinyin":"Wǒ kěyǐ yòng hànyǔ cídiǎn ma?","id":73},{"level":1,"module":"En la clase de idioma","spanish_full":"Chicos, el examen se pasa al viernes.","spanish_cloze":"Chicos, el ___ se pasa al viernes.","spanish_answer":"examen","chinese_simp_full":"同学们，考试改到周五。","chinese_simp_cloze":"同学们，___改到周五。","chinese_simp_answer":"考试","chinese_trad_full":"同學們，考試改到週五。","chinese_trad_cloze":"同學們，___改到週五。","chinese_trad_answer":"考試","pinyin":"Tóngxuémen, kǎoshì gǎi dào zhōuwǔ.","id":74},{"level":1,"module":"En el shopping","spanish_full":"¿Esta prenda tiene un talle más grande?","spanish_cloze":"¿Esta prenda tiene un talle ___?","spanish_answer":"más grande","chinese_simp_full":"这件衣服有大一号的吗？","chinese_simp_cloze":"这件衣服有___的吗？","chinese_simp_answer":"大一号","chinese_trad_full":"這件衣服有大一號的嗎？","chinese_trad_cloze":"這件衣服有___的嗎？","chinese_trad_answer":"大一號","pinyin":"Zhè jiàn yīfu yǒu dà yí hào de ma?","id":75},{"level":1,"module":"En el shopping","spanish_full":"¿Puede ser un poco más barato?","spanish_cloze":"¿Puede ser un poco más ___?","spanish_answer":"barato","chinese_simp_full":"能便宜一点吗？","chinese_simp_cloze":"能___一点吗？","chinese_simp_answer":"便宜","chinese_trad_full":"能便宜一點嗎？","chinese_trad_cloze":"能___一點嗎？","chinese_trad_answer":"便宜","pinyin":"Néng piányi yìdiǎn ma?","id":76},{"level":1,"module":"En el shopping","spanish_full":"¿Puedo pagar con el celular?","spanish_cloze":"¿Puedo ___ con el celular?","spanish_answer":"pagar","chinese_simp_full":"我可以用手机支付吗？","chinese_simp_cloze":"我可以用手机___吗？","chinese_simp_answer":"支付","chinese_trad_full":"我可以用手機支付嗎？","chinese_trad_cloze":"我可以用手機___嗎？","chinese_trad_answer":"支付","pinyin":"Wǒ kěyǐ yòng shǒujī zhīfù ma?","id":77},{"level":1,"module":"En el shopping","spanish_full":"¿Hace falta el ticket para devolver?","spanish_cloze":"¿Hace falta el ticket para ___?","spanish_answer":"devolver","chinese_simp_full":"退货需要小票吗？","chinese_simp_cloze":"___需要小票吗？","chinese_simp_answer":"退货","chinese_trad_full":"退貨需要小票嗎？","chinese_trad_cloze":"___需要小票嗎？","chinese_trad_answer":"退貨","pinyin":"Tuìhuò xūyào xiǎopiào ma?","id":78},{"level":1,"module":"En el shopping","spanish_full":"¿Con cuánto descuento hoy?","spanish_cloze":"¿Con cuánto ___ hoy?","spanish_answer":"descuento","chinese_simp_full":"今天打几折？","chinese_simp_cloze":"今天打几___？","chinese_simp_answer":"折","chinese_trad_full":"今天打幾折？","chinese_trad_cloze":"今天打幾___？","chinese_trad_answer":"折","pinyin":"Jīntiān dǎ jǐ zhé?","id":79},{"level":1,"module":"En el shopping","spanish_full":"¿De qué lado están los probadores?","spanish_cloze":"¿De qué lado están los ___?","spanish_answer":"probadores","chinese_simp_full":"试衣间在哪边？","chinese_simp_cloze":"___在哪边？","chinese_simp_answer":"试衣间","chinese_trad_full":"試衣間在哪邊？","chinese_trad_cloze":"___在哪邊？","chinese_trad_answer":"試衣間","pinyin":"Shìyījiān zài nǎ biān?","id":80},{"level":1,"module":"En el cine","spanish_full":"Dos entradas para las ocho de esta noche.","spanish_cloze":"Dos ___ para las ocho de esta noche.","spanish_answer":"entradas","chinese_simp_full":"两张今晚八点的票。","chinese_simp_cloze":"两张今晚八点的___。","chinese_simp_answer":"票","chinese_trad_full":"兩張今晚八點的票。","chinese_trad_cloze":"兩張今晚八點的___。","chinese_trad_answer":"票","pinyin":"Liǎng zhāng jīnwǎn bā diǎn de piào.","id":81},{"level":1,"module":"En el cine","spanish_full":"¿Esta película tiene subtítulos?","spanish_cloze":"¿Esta película tiene ___?","spanish_answer":"subtítulos","chinese_simp_full":"这部电影有字幕吗？","chinese_simp_cloze":"这部电影有___吗？","chinese_simp_answer":"字幕","chinese_trad_full":"這部電影有字幕嗎？","chinese_trad_cloze":"這部電影有___嗎？","chinese_trad_answer":"字幕","pinyin":"Zhè bù diànyǐng yǒu zìmù ma?","id":82},{"level":1,"module":"En el cine","spanish_full":"Un balde grande de pochoclos.","spanish_cloze":"Un balde grande de ___.","spanish_answer":"pochoclos","chinese_simp_full":"一大桶爆米花。","chinese_simp_cloze":"一大桶___。","chinese_simp_answer":"爆米花","chinese_trad_full":"一大桶爆米花。","chinese_trad_cloze":"一大桶___。","chinese_trad_answer":"爆米花","pinyin":"Yí dà tǒng bàomǐhuā.","id":83},{"level":1,"module":"En el cine","spanish_full":"¿Para qué lado queda la sala 3?","spanish_cloze":"¿Para qué lado queda la ___ 3?","spanish_answer":"sala","chinese_simp_full":"三号厅往哪边走？","chinese_simp_cloze":"三号___往哪边走？","chinese_simp_answer":"厅","chinese_trad_full":"三號廳往哪邊走？","chinese_trad_cloze":"三號___往哪邊走？","chinese_trad_answer":"廳","pinyin":"Sān hào tīng wǎng nǎ biān zǒu?","id":84},{"level":1,"module":"En el cine","spanish_full":"¿A qué hora termina la película?","spanish_cloze":"¿A qué hora ___ la película?","spanish_answer":"termina","chinese_simp_full":"电影几点结束？","chinese_simp_cloze":"电影几点___？","chinese_simp_answer":"结束","chinese_trad_full":"電影幾點結束？","chinese_trad_cloze":"電影幾點___？","chinese_trad_answer":"結束","pinyin":"Diànyǐng jǐ diǎn jiéshù?","id":85},{"level":1,"module":"En el cine","spanish_full":"Esta peli tiene muy buenas críticas.","spanish_cloze":"Esta peli tiene muy buenas ___.","spanish_answer":"críticas","chinese_simp_full":"这片子评分很高。","chinese_simp_cloze":"这片子___很高。","chinese_simp_answer":"评分","chinese_trad_full":"這片子評分很高。","chinese_trad_cloze":"這片子___很高。","chinese_trad_answer":"評分","pinyin":"Zhè piānzi píngfēn hěn gāo.","spanish_alternatives":["buena fama"],"id":86},{"level":1,"module":"En el gimnasio","spanish_full":"Quiero sacar un carnet del gimnasio.","spanish_cloze":"Quiero sacar un ___ del gimnasio.","spanish_answer":"carnet","chinese_simp_full":"我想办一张健身卡。","chinese_simp_cloze":"我想办一张___。","chinese_simp_answer":"健身卡","chinese_trad_full":"我想辦一張健身卡。","chinese_trad_cloze":"我想辦一張___。","chinese_trad_answer":"健身卡","pinyin":"Wǒ xiǎng bàn yì zhāng jiànshēnkǎ.","id":87},{"level":1,"module":"En el gimnasio","spanish_full":"¿Está libre la cinta?","spanish_cloze":"¿Está libre la ___?","spanish_answer":"cinta","chinese_simp_full":"跑步机空着吗？","chinese_simp_cloze":"___空着吗？","chinese_simp_answer":"跑步机","chinese_trad_full":"跑步機空著嗎？","chinese_trad_cloze":"___空著嗎？","chinese_trad_answer":"跑步機","pinyin":"Pǎobùjī kòng zhe ma?","id":88},{"level":1,"module":"En el gimnasio","spanish_full":"Profe, mirame la postura.","spanish_cloze":"Profe, mirame la ___.","spanish_answer":"postura","chinese_simp_full":"教练，帮我看看动作。","chinese_simp_cloze":"教练，帮我看看___。","chinese_simp_answer":"动作","chinese_trad_full":"教練，幫我看看動作。","chinese_trad_cloze":"教練，幫我看看___。","chinese_trad_answer":"動作","pinyin":"Jiàoliàn, bāng wǒ kànkan dòngzuò.","id":89},{"level":1,"module":"En el gimnasio","spanish_full":"Después de entrenar toca estirar.","spanish_cloze":"Después de entrenar toca ___.","spanish_answer":"estirar","chinese_simp_full":"练完要拉伸一下。","chinese_simp_cloze":"练完要___一下。","chinese_simp_answer":"拉伸","chinese_trad_full":"練完要拉伸一下。","chinese_trad_cloze":"練完要___一下。","chinese_trad_answer":"拉伸","pinyin":"Liàn wán yào lāshēn yíxià.","id":90},{"level":1,"module":"En el gimnasio","spanish_full":"¿Hay duchas por acá?","spanish_cloze":"¿Hay ___ por acá?","spanish_answer":"duchas","chinese_simp_full":"这边有淋浴间吗？","chinese_simp_cloze":"这边有___吗？","chinese_simp_answer":"淋浴间","chinese_trad_full":"這邊有淋浴間嗎？","chinese_trad_cloze":"這邊有___嗎？","chinese_trad_answer":"淋浴間","pinyin":"Zhè biān yǒu línyùjiān ma?","id":91},{"level":1,"module":"En el gimnasio","spanish_full":"Saqué el abono anual, sale conveniente.","spanish_cloze":"Saqué el ___, sale conveniente.","spanish_answer":"abono anual","chinese_simp_full":"我办了年卡，很划算。","chinese_simp_cloze":"我办了___，很划算。","chinese_simp_answer":"年卡","chinese_trad_full":"我辦了年卡，很划算。","chinese_trad_cloze":"我辦了___，很划算。","chinese_trad_answer":"年卡","pinyin":"Wǒ bàn le niánkǎ, hěn huásuàn.","id":92},{"level":1,"module":"Barrio chino","spanish_full":"¿El barrio chino queda lejos de acá?","spanish_cloze":"¿El ___ queda lejos de acá?","spanish_answer":"barrio chino","chinese_simp_full":"唐人街离这儿远吗？","chinese_simp_cloze":"___离这儿远吗？","chinese_simp_answer":"唐人街","chinese_trad_full":"唐人街離這兒遠嗎？","chinese_trad_cloze":"___離這兒遠嗎？","chinese_trad_answer":"唐人街","pinyin":"Tángrénjiē lí zhèr yuǎn ma?","id":93},{"level":1,"module":"Barrio chino","spanish_full":"¿Acá se puede cambiar yuanes?","spanish_cloze":"¿Acá se puede cambiar ___?","spanish_answer":"yuanes","chinese_simp_full":"这里能换人民币吗？","chinese_simp_cloze":"这里能换___吗？","chinese_simp_answer":"人民币","chinese_trad_full":"這裡能換人民幣嗎？","chinese_trad_cloze":"這裡能換___嗎？","chinese_trad_answer":"人民幣","pinyin":"Zhèlǐ néng huàn rénmínbì ma?","id":94},{"level":1,"module":"Barrio chino","spanish_full":"¿A cómo salen estos rollitos primavera?","spanish_cloze":"¿A cómo salen estos ___?","spanish_answer":"rollitos primavera","chinese_simp_full":"这个春卷怎么卖？","chinese_simp_cloze":"这个___怎么卖？","chinese_simp_answer":"春卷","chinese_trad_full":"這個春捲怎麼賣？","chinese_trad_cloze":"這個___怎麼賣？","chinese_trad_answer":"春捲","pinyin":"Zhège chūnjuǎn zěnme mài?","id":95},{"level":1,"module":"Barrio chino","spanish_full":"¿Hay té barato?","spanish_cloze":"¿Hay ___ barato?","spanish_answer":"té","chinese_simp_full":"有便宜的茶叶吗？","chinese_simp_cloze":"有便宜的___吗？","chinese_simp_answer":"茶叶","chinese_trad_full":"有便宜的茶葉嗎？","chinese_trad_cloze":"有便宜的___嗎？","chinese_trad_answer":"茶葉","pinyin":"Yǒu piányi de cháyè ma?","id":96},{"level":1,"module":"Barrio chino","spanish_full":"¡Qué lindos los faroles!","spanish_cloze":"¡Qué lindos los ___!","spanish_answer":"faroles","chinese_simp_full":"灯笼真漂亮！","chinese_simp_cloze":"___真漂亮！","chinese_simp_answer":"灯笼","chinese_trad_full":"燈籠真漂亮！","chinese_trad_cloze":"___真漂亮！","chinese_trad_answer":"燈籠","pinyin":"Dēnglóng zhēn piàoliang!","id":97},{"level":1,"module":"Barrio chino","spanish_full":"En Año Nuevo chino esto se llena de vida.","spanish_cloze":"En ___ esto se llena de vida.","spanish_answer":"Año Nuevo chino","chinese_simp_full":"春节这里最热闹。","chinese_simp_cloze":"___这里最热闹。","chinese_simp_answer":"春节","chinese_trad_full":"春節這裡最熱鬧。","chinese_trad_cloze":"___這裡最熱鬧。","chinese_trad_answer":"春節","pinyin":"Chūnjié zhèlǐ zuì rènao.","id":98}],
'HSK1': [{"id":"hsk1_01","level":1,"module":"HSK1","chinese_simp_full":"你好，我叫李明，我是中国人。","chinese_simp_cloze":"___，我叫李明，我是中国人。","chinese_simp_answer":"你好","chinese_trad_full":"你好，我叫李明，我是中國人。","chinese_trad_cloze":"___，我叫李明，我是中國人。","chinese_trad_answer":"你好","spanish_full":"Hola, me llamo Li Ming, soy chino.","spanish_cloze":"___, me llamo Li Ming, soy chino.","spanish_answer":"Hola","pinyin":"Nǐ hǎo, wǒ jiào Lǐ Míng, wǒ shì Zhōngguó rén."},{"id":"hsk1_02","level":1,"module":"HSK1","chinese_simp_full":"请问，去火车站怎么走？","chinese_simp_cloze":"___，去火车站怎么走？","chinese_simp_answer":"请问","chinese_trad_full":"請問，去火車站怎麼走？","chinese_trad_cloze":"___，去火車站怎麼走？","chinese_trad_answer":"請問","spanish_full":"Disculpe, ¿cómo se va a la estación de tren?","spanish_cloze":"___, ¿cómo se va a la estación de tren?","spanish_answer":"Disculpe","pinyin":"Qǐngwèn, qù huǒchēzhàn zěnme zǒu?"},{"id":"hsk1_03","level":1,"module":"HSK1","chinese_simp_full":"这个苹果多少钱？太贵了，便宜一点儿吧。","chinese_simp_cloze":"这个苹果___？太贵了，便宜一点儿吧。","chinese_simp_answer":"多少钱","chinese_trad_full":"這個蘋果多少錢？太貴了，便宜一點兒吧。","chinese_trad_cloze":"這個蘋果___？太貴了，便宜一點兒吧。","chinese_trad_answer":"多少錢","spanish_full":"¿Cuánto cuesta esta manzana? Es muy cara, baje un poco el precio.","spanish_cloze":"¿___ cuesta esta manzana? Es muy cara, baje un poco el precio.","spanish_answer":"Cuánto","pinyin":"Zhège píngguǒ duōshao qián? Tài guì le, piányi yīdiǎnr ba."},{"id":"hsk1_04","level":1,"module":"HSK1","chinese_simp_full":"我想买一张去北京的机票，明天上午的。","chinese_simp_cloze":"我想___一张去北京的机票，明天上午的。","chinese_simp_answer":"买","chinese_trad_full":"我想買一張去北京的機票，明天上午的。","chinese_trad_cloze":"我想___一張去北京的機票，明天上午的。","chinese_trad_answer":"買","spanish_full":"Quiero comprar un boleto de avión a Beijing para mañana por la mañana.","spanish_cloze":"Quiero ___ un boleto de avión a Beijing para mañana por la mañana.","spanish_answer":"comprar","pinyin":"Wǒ xiǎng mǎi yī zhāng qù Běijīng de jīpiào, míngtiān shàngwǔ de."},{"id":"hsk1_05","level":1,"module":"HSK1","chinese_simp_full":"对不起，我没有带钱，可以打电话给我朋友吗？","chinese_simp_cloze":"___，我没有带钱，可以打电话给我朋友吗？","chinese_simp_answer":"对不起","chinese_trad_full":"對不起，我沒有帶錢，可以打電話給我朋友嗎？","chinese_trad_cloze":"___，我沒有帶錢，可以打電話給我朋友嗎？","chinese_trad_answer":"對不起","spanish_full":"Lo siento, no traje dinero, ¿puedo llamar a mi amigo?","spanish_cloze":"___, no traje dinero, ¿puedo llamar a mi amigo?","spanish_answer":"Lo siento","pinyin":"Duìbuqǐ, wǒ méiyǒu dài qián, kěyǐ dǎ diànhuà gěi wǒ péngyou ma?"},{"id":"hsk1_06","level":1,"module":"HSK1","chinese_simp_full":"今天天气很冷，我想喝热茶，不想吃冷的东西。","chinese_simp_cloze":"今天天气很___，我想喝热茶，不想吃冷的东西。","chinese_simp_answer":"冷","chinese_trad_full":"今天天氣很冷，我想喝熱茶，不想吃冷的東西。","chinese_trad_cloze":"今天天氣很___，我想喝熱茶，不想吃冷的東西。","chinese_trad_answer":"冷","spanish_full":"Hoy hace mucho frío, quiero tomar té caliente, no quiero comer cosas frías.","spanish_cloze":"Hoy hace mucho ___, quiero tomar té caliente, no quiero comer cosas frías.","spanish_answer":"frío","pinyin":"Jīntiān tiānqì hěn lěng, wǒ xiǎng hē rè chá, bù xiǎng chī lěng de dōngxi."},{"id":"hsk1_07","level":1,"module":"HSK1","chinese_simp_full":"我女儿在学校学习汉语，她很喜欢她的老师。","chinese_simp_cloze":"我女儿在学校___汉语，她很喜欢她的老师。","chinese_simp_answer":"学习","chinese_trad_full":"我女兒在學校學習漢語，她很喜歡她的老師。","chinese_trad_cloze":"我女兒在學校___漢語，她很喜歡她的老師。","chinese_trad_answer":"學習","spanish_full":"Mi hija estudia chino en la escuela, le gusta mucho su profesora.","spanish_cloze":"Mi hija ___ chino en la escuela, le gusta mucho su profesora.","spanish_answer":"estudia","pinyin":"Wǒ nǚ'ér zài xuéxiào xuéxí Hànyǔ, tā hěn xǐhuan tā de lǎoshī."},{"id":"hsk1_08","level":1,"module":"HSK1","chinese_simp_full":"现在几点？我们下午三点去看电影，然后去饭店吃饭。","chinese_simp_cloze":"现在___？我们下午三点去看电影，然后去饭店吃饭。","chinese_simp_answer":"几点","chinese_trad_full":"現在幾點？我們下午三點去看電影，然後去飯店吃飯。","chinese_trad_cloze":"現在___？我們下午三點去看電影，然後去飯店吃飯。","chinese_trad_answer":"幾點","spanish_full":"¿Qué hora es? Vamos al cine a las tres de la tarde, luego iremos al restaurante a cenar.","spanish_cloze":"¿___ hora es? Vamos al cine a las tres de la tarde, luego iremos al restaurante a cenar.","spanish_answer":"Qué","pinyin":"Xiànzài jǐ diǎn? Wǒmen xiàwǔ sān diǎn qù kàn diànyǐng, ránhòu qù fàndiàn chīfàn."},{"id":"hsk1_09","level":1,"module":"HSK1","chinese_simp_full":"这本书是我的，那本是你的，它们都在桌子上面。","chinese_simp_cloze":"这本书是___，那本是你的，它们都在桌子上面。","chinese_simp_answer":"我的","chinese_trad_full":"這本書是我的，那本是你的，它們都在桌子上面。","chinese_trad_cloze":"這本書是___，那本是你的，它們都在桌子上面。","chinese_trad_answer":"我的","spanish_full":"Este libro es mío, ese es tuyo, ambos están encima de la mesa.","spanish_cloze":"Este libro es ___, ese es tuyo, ambos están encima de la mesa.","spanish_answer":"mío","pinyin":"Zhè běn shū shì wǒ de, nà běn shì nǐ de, tāmen dōu zài zhuōzi shàngmiàn."},{"id":"hsk1_10","level":1,"module":"HSK1","chinese_simp_full":"谢谢你帮我，没关系，我们都是好朋友。","chinese_simp_cloze":"谢谢你帮我，___，我们都是好朋友。","chinese_simp_answer":"没关系","chinese_trad_full":"謝謝你幫我，沒關係，我們都是好朋友。","chinese_trad_cloze":"謝謝你幫我，___，我們都是好朋友。","chinese_trad_answer":"沒關係","spanish_full":"Gracias por ayudarme, no hay problema, todos somos buenos amigos.","spanish_cloze":"Gracias por ayudarme, ___, todos somos buenos amigos.","spanish_answer":"no hay problema","pinyin":"Xièxie nǐ bāng wǒ, méiguānxi, wǒmen dōu shì hǎo péngyou."},{"id":"hsk1_11","level":1,"module":"HSK1","chinese_simp_full":"我爸爸是医生，我妈妈是老师。","chinese_simp_cloze":"我___是医生，我妈妈是老师。","chinese_simp_answer":"爸爸","chinese_trad_full":"我爸爸是醫生，我媽媽是老師。","chinese_trad_cloze":"我___是醫生，我媽媽是老師。","chinese_trad_answer":"爸爸","spanish_full":"Mi papá es médico y mi mamá es profesora.","spanish_cloze":"Mi ___ es médico y mi mamá es profesora.","spanish_answer":"papá","pinyin":"Wǒ bàba shì yīshēng, wǒ māma shì lǎoshī."},{"id":"hsk1_12","level":1,"module":"HSK1","chinese_simp_full":"我喜欢吃苹果和香蕉。","chinese_simp_cloze":"我___吃苹果和香蕉。","chinese_simp_answer":"喜欢","chinese_trad_full":"我喜歡吃蘋果和香蕉。","chinese_trad_cloze":"我___吃蘋果和香蕉。","chinese_trad_answer":"喜歡","spanish_full":"Me gusta comer manzanas y bananas.","spanish_cloze":"Me ___ comer manzanas y bananas.","spanish_answer":"gusta","pinyin":"Wǒ xǐhuan chī píngguǒ hé xiāngjiāo."},{"id":"hsk1_13","level":1,"module":"HSK1","chinese_simp_full":"现在几点了？我想睡觉了。","chinese_simp_cloze":"现在___了？我想睡觉了。","chinese_simp_answer":"几点","chinese_trad_full":"現在幾點了？我想睡覺了。","chinese_trad_cloze":"現在___了？我想睡覺了。","chinese_trad_answer":"幾點","spanish_full":"¿Qué hora es? Quiero irme a dormir.","spanish_cloze":"¿___ es? Quiero irme a dormir.","spanish_answer":"Qué hora","pinyin":"Xiànzài jǐ diǎn le? Wǒ xiǎng shuìjiào le."},{"id":"hsk1_14","level":1,"module":"HSK1","chinese_simp_full":"这个杯子是我的，那个桌子是你的。","chinese_simp_cloze":"这个___是我的，那个桌子是你的。","chinese_simp_answer":"杯子","chinese_trad_full":"這個杯子是我的，那個桌子是你的。","chinese_trad_cloze":"這個___是我的，那個桌子是你的。","chinese_trad_answer":"杯子","spanish_full":"Este vaso es mío y esa mesa es tuya.","spanish_cloze":"Este ___ es mío y esa mesa es tuya.","spanish_answer":"vaso","pinyin":"Zhège bēizi shì wǒ de, nàge zhuōzi shì nǐ de."},{"id":"hsk1_15","level":1,"module":"HSK1","chinese_simp_full":"昨天我看见一只猫在椅子上。","chinese_simp_cloze":"昨天我___一只猫在椅子上。","chinese_simp_answer":"看见","chinese_trad_full":"昨天我看見一隻貓在椅子上。","chinese_trad_cloze":"昨天我___一隻貓在椅子上。","chinese_trad_answer":"看見","spanish_full":"Ayer vi un gato sentado en la silla.","spanish_cloze":"Ayer ___ un gato sentado en la silla.","spanish_answer":"vi","pinyin":"Zuótiān wǒ kànjiàn yī zhī māo zài yǐzi shàng."},{"id":"hsk1_16","level":1,"module":"HSK1","chinese_simp_full":"请问，我可以坐这儿吗？","chinese_simp_cloze":"___，我可以坐这儿吗？","chinese_simp_answer":"请问","chinese_trad_full":"請問，我可以坐這兒嗎？","chinese_trad_cloze":"___，我可以坐這兒嗎？","chinese_trad_answer":"請問","spanish_full":"Disculpe, ¿puedo sentarme aquí?","spanish_cloze":"___, ¿puedo sentarme aquí?","spanish_answer":"Disculpe","pinyin":"Qǐngwèn, wǒ kěyǐ zuò zhèr ma?"},{"id":"hsk1_17","level":1,"module":"HSK1","chinese_simp_full":"他正在看书，我在写作业。","chinese_simp_cloze":"他正在___，我在写作业。","chinese_simp_answer":"看书","chinese_trad_full":"他正在看書，我在寫作業。","chinese_trad_cloze":"他正在___，我在寫作業。","chinese_trad_answer":"看書","spanish_full":"Él está leyendo un libro y yo estoy haciendo la tarea.","spanish_cloze":"Él está ___ un libro y yo estoy haciendo la tarea.","spanish_answer":"leyendo","pinyin":"Tā zhèngzài kànshū, wǒ zài xiě zuòyè."},{"id":"hsk1_18","level":1,"module":"HSK1","chinese_simp_full":"今天天气很好，我们一起去公园吧。","chinese_simp_cloze":"今天___很好，我们一起去公园吧。","chinese_simp_answer":"天气","chinese_trad_full":"今天天氣很好，我們一起去公園吧。","chinese_trad_cloze":"今天___很好，我們一起去公園吧。","chinese_trad_answer":"天氣","spanish_full":"Hoy hace muy buen clima, vamos juntos al parque.","spanish_cloze":"Hoy hace muy buen ___, vamos juntos al parque.","spanish_answer":"clima","pinyin":"Jīntiān tiānqì hěn hǎo, wǒmen yīqǐ qù gōngyuán ba."},{"id":"hsk1_19","level":1,"module":"HSK1","chinese_simp_full":"这件衣服太贵了，我不要买。","chinese_simp_cloze":"这件衣服太___了，我不要买。","chinese_simp_answer":"贵","chinese_trad_full":"這件衣服太貴了，我不要買。","chinese_trad_cloze":"這件衣服太___了，我不要買。","chinese_trad_answer":"貴","spanish_full":"Esta ropa es demasiado cara, no quiero comprarla.","spanish_cloze":"Esta ropa es demasiado ___, no quiero comprarla.","spanish_answer":"cara","pinyin":"Zhè jiàn yīfu tài guì le, wǒ bùyào mǎi."},{"id":"hsk1_20","level":1,"module":"HSK1","chinese_simp_full":"谢谢你请我喝茶，不客气！","chinese_simp_cloze":"谢谢你___我喝茶，不客气！","chinese_simp_answer":"请","chinese_trad_full":"謝謝你請我喝茶，不客氣！","chinese_trad_cloze":"謝謝你___我喝茶，不客氣！","chinese_trad_answer":"請","spanish_full":"Gracias por invitarme a tomar té, ¡de nada!","spanish_cloze":"Gracias por ___me a tomar té, ¡de nada!","spanish_answer":"invitar","pinyin":"Xièxie nǐ qǐng wǒ hē chá, bú kèqi!"}],
'HSK2': [{"id":"hsk2_01","level":2,"module":"HSK2","chinese_simp_full":"我觉得中文比英文难，但是我非常喜欢。","chinese_simp_cloze":"我觉得中文___英文难，但是我非常喜欢。","chinese_simp_answer":"比","chinese_trad_full":"我覺得中文比英文難，但是我非常喜歡。","chinese_trad_cloze":"我覺得中文___英文難，但是我非常喜歡。","chinese_trad_answer":"比","spanish_full":"Creo que el chino es más difícil que el inglés, pero me gusta mucho.","spanish_cloze":"Creo que el chino es ___ difícil que el inglés, pero me gusta mucho.","spanish_answer":"más","pinyin":"Wǒ juéde Zhōngwén bǐ Yīngwén nán, dànshì wǒ fēicháng xǐhuan."},{"id":"hsk2_02","level":2,"module":"HSK2","chinese_simp_full":"因为下雨了，所以我们不去公园跑步了。","chinese_simp_cloze":"___下雨了，所以我们不去公园跑步了。","chinese_simp_answer":"因为","chinese_trad_full":"因為下雨了，所以我們不去公園跑步了。","chinese_trad_cloze":"___下雨了，所以我們不去公園跑步了。","chinese_trad_answer":"因為","spanish_full":"Como está lloviendo, no vamos al parque a correr.","spanish_cloze":"___ está lloviendo, no vamos al parque a correr.","spanish_answer":"Como","pinyin":"Yīnwèi xià yǔ le, suǒyǐ wǒmen bú qù gōngyuán pǎobù le."},{"id":"hsk2_03","level":2,"module":"HSK2","chinese_simp_full":"请问，去机场的公共汽车站在哪儿？","chinese_simp_cloze":"请问，去___的公共汽车站在哪儿？","chinese_simp_answer":"机场","chinese_trad_full":"請問，去機場的公共汽車站在哪兒？","chinese_trad_cloze":"請問，去___的公共汽車站在哪兒？","chinese_trad_answer":"機場","spanish_full":"Disculpe, ¿dónde está la parada del autobús al aeropuerto?","spanish_cloze":"Disculpe, ¿dónde está la parada del ___ al aeropuerto?","spanish_answer":"autobús","pinyin":"Qǐngwèn, qù jīchǎng de gōnggòng qìchē zhàn zài nǎr?"},{"id":"hsk2_04","level":2,"module":"HSK2","chinese_simp_full":"我身体不舒服，想去医院看看医生。","chinese_simp_cloze":"我___不舒服，想去医院看看医生。","chinese_simp_answer":"身体","chinese_trad_full":"我身體不舒服，想去醫院看看醫生。","chinese_trad_cloze":"我___不舒服，想去醫院看看醫生。","chinese_trad_answer":"身體","spanish_full":"No me siento bien del cuerpo, quiero ir al hospital a ver al médico.","spanish_cloze":"No me siento bien del ___, quiero ir al hospital a ver al médico.","spanish_answer":"cuerpo","pinyin":"Wǒ shēntǐ bù shūfu, xiǎng qù yīyuàn kànkan yīshēng."},{"id":"hsk2_05","level":2,"module":"HSK2","chinese_simp_full":"虽然这个宾馆很便宜，但是房间太小了。","chinese_simp_cloze":"___这个宾馆很便宜，但是房间太小了。","chinese_simp_answer":"虽然","chinese_trad_full":"雖然這個賓館很便宜，但是房間太小了。","chinese_trad_cloze":"___這個賓館很便宜，但是房間太小了。","chinese_trad_answer":"雖然","spanish_full":"Aunque este hotel es muy barato, la habitación es demasiado pequeña.","spanish_cloze":"___ este hotel es muy barato, la habitación es demasiado pequeña.","spanish_answer":"Aunque","pinyin":"Suīrán zhège bīnguǎn hěn piányi, dànshì fángjiān tài xiǎo le."},{"id":"hsk2_06","level":2,"module":"HSK2","chinese_simp_full":"我已经准备好了，可以开始考试了吗？","chinese_simp_cloze":"我已经___好了，可以开始考试了吗？","chinese_simp_answer":"准备","chinese_trad_full":"我已經準備好了，可以開始考試了嗎？","chinese_trad_cloze":"我已經___好了，可以開始考試了嗎？","chinese_trad_answer":"準備","spanish_full":"Ya estoy preparado, ¿podemos empezar el examen?","spanish_cloze":"Ya estoy ___, ¿podemos empezar el examen?","spanish_answer":"preparado","pinyin":"Wǒ yǐjīng zhǔnbèi hǎo le, kěyǐ kāishǐ kǎoshì le ma?"},{"id":"hsk2_07","level":2,"module":"HSK2","chinese_simp_full":"这件红色的衣服真漂亮，我要买两件。","chinese_simp_cloze":"这件___色的衣服真漂亮，我要买两件。","chinese_simp_answer":"红","chinese_trad_full":"這件紅色的衣服真漂亮，我要買兩件。","chinese_trad_cloze":"這件___色的衣服真漂亮，我要買兩件。","chinese_trad_answer":"紅","spanish_full":"Esta ropa roja es realmente hermosa, voy a comprar dos piezas.","spanish_cloze":"Esta ropa ___ es realmente hermosa, voy a comprar dos piezas.","spanish_answer":"roja","pinyin":"Zhè jiàn hóngsè de yīfu zhēn piàoliang, wǒ yào mǎi liǎng jiàn."},{"id":"hsk2_08","level":2,"module":"HSK2","chinese_simp_full":"他每天早上六点起床，然后去公司上班。","chinese_simp_cloze":"他每天早上六点___，然后去公司上班。","chinese_simp_answer":"起床","chinese_trad_full":"他每天早上六點起床，然後去公司上班。","chinese_trad_cloze":"他每天早上六點___，然後去公司上班。","chinese_trad_answer":"起床","spanish_full":"Él se levanta a las seis cada mañana, luego va a la empresa a trabajar.","spanish_cloze":"Él se ___ a las seis cada mañana, luego va a la empresa a trabajar.","spanish_answer":"levanta","pinyin":"Tā měitiān zǎoshang liù diǎn qǐchuáng, ránhòu qù gōngsī shàngbān."},{"id":"hsk2_09","level":2,"module":"HSK2","chinese_simp_full":"对不起，我把你的铅笔弄丢了，我再给你买一支新的。","chinese_simp_cloze":"对不起，我把你的___弄丢了，我再给你买一支新的。","chinese_simp_answer":"铅笔","chinese_trad_full":"對不起，我把你的鉛筆弄丟了，我再給你買一支新的。","chinese_trad_cloze":"對不起，我把你的___弄丟了，我再給你買一支新的。","chinese_trad_answer":"鉛筆","spanish_full":"Lo siento, perdí tu lápiz, te compraré uno nuevo.","spanish_cloze":"Lo siento, perdí tu ___, te compraré uno nuevo.","spanish_answer":"lápiz","pinyin":"Duìbuqǐ, wǒ bǎ nǐ de qiānbǐ nòngdiū le, wǒ zài gěi nǐ mǎi yī zhī xīn de."},{"id":"hsk2_10","level":2,"module":"HSK2","chinese_simp_full":"这家饭馆的面条很好吃，大家都喜欢来这儿吃。","chinese_simp_cloze":"这家饭馆的___很好吃，大家都喜欢来这儿吃。","chinese_simp_answer":"面条","chinese_trad_full":"這家飯館的麵條很好吃，大家都喜歡來這兒吃。","chinese_trad_cloze":"這家飯館的___很好吃，大家都喜歡來這兒吃。","chinese_trad_answer":"麵條","spanish_full":"Los fideos de este restaurante son deliciosos, a todos les gusta venir aquí a comer.","spanish_cloze":"Los ___ de este restaurante son deliciosos, a todos les gusta venir aquí a comer.","spanish_answer":"fideos","pinyin":"Zhè jiā fànguǎn de miàntiáo hěn hǎochī, dàjiā dōu xǐhuan lái zhèr chī."},{"id":"hsk2_11","level":2,"module":"HSK2","chinese_simp_full":"你左边的那个房间是我的教室，右边是办公室。","chinese_simp_cloze":"你___边的那个房间是我的教室，右边是办公室。","chinese_simp_answer":"左","chinese_trad_full":"你左邊的那個房間是我的教室，右邊是辦公室。","chinese_trad_cloze":"你___邊的那個房間是我的教室，右邊是辦公室。","chinese_trad_answer":"左","spanish_full":"La habitación a tu izquierda es mi aula, la derecha es la oficina.","spanish_cloze":"La habitación a tu ___ es mi aula, la derecha es la oficina.","spanish_answer":"izquierda","pinyin":"Nǐ zuǒbian de nàge fángjiān shì wǒ de jiàoshì, yòubian shì bàngōngshì."},{"id":"hsk2_12","level":2,"module":"HSK2","chinese_simp_full":"昨天我去火车站送朋友，他坐火车回老家了。","chinese_simp_cloze":"昨天我去___送朋友，他坐火车回老家了。","chinese_simp_answer":"火车站","chinese_trad_full":"昨天我去火車站送朋友，他坐火車回老家了。","chinese_trad_cloze":"昨天我去___送朋友，他坐火車回老家了。","chinese_trad_answer":"火車站","spanish_full":"Ayer fui a la estación de tren a despedir a mi amigo, se fue en tren a su pueblo natal.","spanish_cloze":"Ayer fui a la ___ de tren a despedir a mi amigo, se fue en tren a su pueblo natal.","spanish_answer":"estación","pinyin":"Zuótiān wǒ qù huǒchēzhàn sòng péngyou, tā zuò huǒchē huí lǎojiā le."},{"id":"hsk2_13","level":2,"module":"HSK2","chinese_simp_full":"这个问题太难了，我不懂，你能告诉我吗？","chinese_simp_cloze":"这个___太难了，我不懂，你能告诉我吗？","chinese_simp_answer":"问题","chinese_trad_full":"這個問題太難了，我不懂，你能告訴我嗎？","chinese_trad_cloze":"這個___太難了，我不懂，你能告訴我嗎？","chinese_trad_answer":"問題","spanish_full":"Este problema es demasiado difícil, no lo entiendo, ¿puedes decírmelo?","spanish_cloze":"Este ___ es demasiado difícil, no lo entiendo, ¿puedes decírmelo?","spanish_answer":"problema","pinyin":"Zhège wèntí tài nán le, wǒ bù dǒng, nǐ néng gàosu wǒ ma?"},{"id":"hsk2_14","level":2,"module":"HSK2","chinese_simp_full":"今天是妹妹的生日，我们给她买了蛋糕和牛奶。","chinese_simp_cloze":"今天是妹妹的___，我们给她买了蛋糕和牛奶。","chinese_simp_answer":"生日","chinese_trad_full":"今天是妹妹的生日，我們給她買了蛋糕和牛奶。","chinese_trad_cloze":"今天是妹妹的___，我們給她買了蛋糕和牛奶。","chinese_trad_answer":"生日","spanish_full":"Hoy es el cumpleaños de mi hermana menor, le compramos pastel y leche.","spanish_cloze":"Hoy es el ___ de mi hermana menor, le compramos pastel y leche.","spanish_answer":"cumpleaños","pinyin":"Jīntiān shì mèimei de shēngrì, wǒmen gěi tā mǎile dàngāo hé niúnǎi."},{"id":"hsk2_15","level":2,"module":"HSK2","chinese_simp_full":"外面下雪了，天气非常冷，你要多穿点衣服。","chinese_simp_cloze":"外面下___了，天气非常冷，你要多穿点衣服。","chinese_simp_answer":"雪","chinese_trad_full":"外面下雪了，天氣非常冷，你要多穿點衣服。","chinese_trad_cloze":"外面下___了，天氣非常冷，你要多穿點衣服。","chinese_trad_answer":"雪","spanish_full":"Está nevando afuera, hace mucho frío, debes ponerte más ropa.","spanish_cloze":"Está ___ndo afuera, hace mucho frío, debes ponerte más ropa.","spanish_answer":"neva","pinyin":"Wàimiàn xià xuě le, tiānqì fēicháng lěng, nǐ yào duō chuān diǎn yīfu."},{"id":"hsk2_16","level":2,"module":"HSK2","chinese_simp_full":"我想介绍我的哥哥给大家认识，他是公司的经理。","chinese_simp_cloze":"我想___我的哥哥给大家认识，他是公司的经理。","chinese_simp_answer":"介绍","chinese_trad_full":"我想介紹我的哥哥給大家認識，他是公司的經理。","chinese_trad_cloze":"我想___我的哥哥給大家認識，他是公司的經理。","chinese_trad_answer":"介紹","spanish_full":"Quiero presentar a mi hermano mayor a todos, él es gerente de la empresa.","spanish_cloze":"Quiero ___ a mi hermano mayor a todos, él es gerente de la empresa.","spanish_answer":"presentar","pinyin":"Wǒ xiǎng jièshào wǒ de gēge gěi dàjiā rènshi, tā shì gōngsī de jīnglǐ."},{"id":"hsk2_17","level":2,"module":"HSK2","chinese_simp_full":"别着急，还有半个小时才开车呢，我们先喝杯咖啡吧。","chinese_simp_cloze":"___着急，还有半个小时才开车呢，我们先喝杯咖啡吧。","chinese_simp_answer":"别","chinese_trad_full":"別著急，還有半個小時才開車呢，我們先喝杯咖啡吧。","chinese_trad_cloze":"___著急，還有半個小時才開車呢，我們先喝杯咖啡吧。","chinese_trad_answer":"別","spanish_full":"No te apresures, faltan media hora para que salga el tren, tomemos un café primero.","spanish_cloze":"No te ___, faltan media hora para que salga el tren, tomemos un café primero.","spanish_answer":"apresures","pinyin":"Bié zháojí, hái yǒu bàn ge xiǎoshí cái kāichē ne, wǒmen xiān hē bēi kāfēi ba."},{"id":"hsk2_18","level":2,"module":"HSK2","chinese_simp_full":"那个服务员正在跟客人说话，他在介绍今天的特色菜。","chinese_simp_cloze":"那个___正在跟客人说话，他在介绍今天的特色菜。","chinese_simp_answer":"服务员","chinese_trad_full":"那個服務員正在跟客人說話，他在介紹今天的特色菜。","chinese_trad_cloze":"那個___正在跟客人說話，他在介紹今天的特色菜。","chinese_trad_answer":"服務員","spanish_full":"Ese camarero está hablando con los clientes, les está presentando el plato especial de hoy.","spanish_cloze":"Ese ___ está hablando con los clientes, les está presentando el plato especial de hoy.","spanish_answer":"camarero","pinyin":"Nàge fúwùyuán zhèngzài gēn kèrén shuōhuà, tā zài jièshào jīntiān de tèsè cài."},{"id":"hsk2_19","level":2,"module":"HSK2","chinese_simp_full":"我希望明年可以去中国旅游，看看长城和故宫。","chinese_simp_cloze":"我___明年可以去中国旅游，看看长城和故宫。","chinese_simp_answer":"希望","chinese_trad_full":"我希望明年可以去中國旅遊，看看長城和故宮。","chinese_trad_cloze":"我___明年可以去中國旅遊，看看長城和故宮。","chinese_trad_answer":"希望","spanish_full":"Espero poder viajar a China el próximo año para ver la Gran Muralla y el Palacio Imperial.","spanish_cloze":"___ poder viajar a China el próximo año para ver la Gran Muralla y el Palacio Imperial.","spanish_answer":"Espero","pinyin":"Wǒ xīwàng míngnián kěyǐ qù Zhōngguó lǚyóu, kànkan Chángchéng hé Gùgōng."},{"id":"hsk2_20","level":2,"module":"HSK2","chinese_simp_full":"你知道为什么他不来上课吗？因为他生病了。","chinese_simp_cloze":"你知道___他不来上课吗？因为他生病了。","chinese_simp_answer":"为什么","chinese_trad_full":"你知道為什麼他不來上課嗎？因為他生病了。","chinese_trad_cloze":"你知道___他不來上課嗎？因為他生病了。","chinese_trad_answer":"為什麼","spanish_full":"¿Sabes por qué no vino a clase? Porque se enfermó.","spanish_cloze":"¿Sabes ___ no vino a clase? Porque se enfermó.","spanish_answer":"por qué","pinyin":"Nǐ zhīdào wèishénme tā bù lái shàngkè ma? Yīnwèi tā shēngbìng le."}],
'HSK3': [{"id":"hsk3_01","level":3,"module":"HSK3","chinese_simp_full":"我的护照被弄丢了，我必须去大使馆补办。","chinese_simp_cloze":"我的护照___弄丢了，我必须去大使馆补办。","chinese_simp_answer":"被","chinese_trad_full":"我的護照被弄丟了，我必須去大使館補辦。","chinese_trad_cloze":"我的護照___弄丟了，我必須去大使館補辦。","chinese_trad_answer":"被","spanish_full":"Mi pasaporte fue perdido, debo ir a la embajada a reponerlo.","spanish_cloze":"Mi pasaporte ___ perdido, debo ir a la embajada a reponerlo.","spanish_answer":"fue","pinyin":"Wǒ de hùzhào bèi nòngdiū le, wǒ bìxū qù dàshǐguǎn bǔbàn."},{"id":"hsk3_02","level":3,"module":"HSK3","chinese_simp_full":"虽然这里的生活比较贵，但是我觉得很值得。","chinese_simp_cloze":"虽然这里的生活___贵，但是我觉得很值得。","chinese_simp_answer":"比较","chinese_trad_full":"雖然這裡的生活比較貴，但是我覺得很值得。","chinese_trad_cloze":"雖然這裡的生活___貴，但是我覺得很值得。","chinese_trad_answer":"比較","spanish_full":"Aunque la vida aquí es relativamente cara, creo que vale mucho la pena.","spanish_cloze":"Aunque la vida aquí es ___ cara, creo que vale mucho la pena.","spanish_answer":"relativamente","pinyin":"Suīrán zhèlǐ de shēnghuó bǐjiào guì, dànshì wǒ juéde hěn zhídé."},{"id":"hsk3_03","level":3,"module":"HSK3","chinese_simp_full":"除了上班以外，我还打算晚上去学西班牙语。","chinese_simp_cloze":"___上班以外，我还打算晚上去学西班牙语。","chinese_simp_answer":"除了","chinese_trad_full":"除了上班以外，我還打算晚上去學西班牙語。","chinese_trad_cloze":"___上班以外，我還打算晚上去學西班牙語。","chinese_trad_answer":"除了","spanish_full":"Además de trabajar, también planeo estudiar español por las noches.","spanish_cloze":"___ de trabajar, también planeo estudiar español por las noches.","spanish_answer":"Además","pinyin":"Chúle shàngbān yǐwài, wǒ hái dǎsuàn wǎnshang qù xué Xībānyáyǔ."},{"id":"hsk3_04","level":3,"module":"HSK3","chinese_simp_full":"最近天气变化很大，你要多注意身体，别感冒了。","chinese_simp_cloze":"最近天气___很大，你要多注意身体，别感冒了。","chinese_simp_answer":"变化","chinese_trad_full":"最近天氣變化很大，你要多注意身體，別感冒了。","chinese_trad_cloze":"最近天氣___很大，你要多注意身體，別感冒了。","chinese_trad_answer":"變化","spanish_full":"Últimamente el clima ha cambiado mucho, debes cuidar tu salud y no resfriarte.","spanish_cloze":"Últimamente el clima ha ___ mucho, debes cuidar tu salud y no resfriarte.","spanish_answer":"cambiado","pinyin":"Zuìjìn tiānqì biànhuà hěn dà, nǐ yào duō zhùyì shēntǐ, bié gǎnmào le."},{"id":"hsk3_05","level":3,"module":"HSK3","chinese_simp_full":"这个超市的东西不但便宜，而且非常新鲜。","chinese_simp_cloze":"这个超市的东西不但便宜，___非常新鲜。","chinese_simp_answer":"而且","chinese_trad_full":"這個超市的東西不但便宜，而且非常新鮮。","chinese_trad_cloze":"這個超市的東西不但便宜，___非常新鮮。","chinese_trad_answer":"而且","spanish_full":"Las cosas de este supermercado no solo son baratas, sino también muy frescas.","spanish_cloze":"Las cosas de este supermercado no solo son baratas, ___ también muy frescas.","spanish_answer":"sino","pinyin":"Zhège chāoshì de dōngxi búdàn piányi, érqiě fēicháng xīnxiān."},{"id":"hsk3_06","level":3,"module":"HSK3","chinese_simp_full":"如果你有问题，可以随时给经理打电话或者发邮件。","chinese_simp_cloze":"___你有问题，可以随时给经理打电话或者发邮件。","chinese_simp_answer":"如果","chinese_trad_full":"如果你有問題，可以隨時給經理打電話或者發郵件。","chinese_trad_cloze":"___你有問題，可以隨時給經理打電話或者發郵件。","chinese_trad_answer":"如果","spanish_full":"Si tienes algún problema, puedes llamar o enviar un correo al gerente en cualquier momento.","spanish_cloze":"___ tienes algún problema, puedes llamar o enviar un correo al gerente en cualquier momento.","spanish_answer":"Si","pinyin":"Rúguǒ nǐ yǒu wèntí, kěyǐ suíshí gěi jīnglǐ dǎ diànhuà huòzhě fā yóujiàn."},{"id":"hsk3_07","level":3,"module":"HSK3","chinese_simp_full":"他越说越快，我都听不清楚他在说什么了。","chinese_simp_cloze":"他___说越快，我都听不清楚他在说什么了。","chinese_simp_answer":"越","chinese_trad_full":"他越說越快，我都聽不清楚他在說什麼了。","chinese_trad_cloze":"他___說越快，我都聽不清楚他在說什麼了。","chinese_trad_answer":"越","spanish_full":"Cuanto más habla, más rápido lo hace; ya no entiendo nada de lo que dice.","spanish_cloze":"___ más habla, más rápido lo hace; ya no entiendo nada de lo que dice.","spanish_answer":"Cuanto","pinyin":"Tā yuè shuō yuè kuài, wǒ dōu tīng bu qīngchu tā zài shuō shénme le."},{"id":"hsk3_08","level":3,"module":"HSK3","chinese_simp_full":"为了找到更好的工作，我决定努力提高中文水平。","chinese_simp_cloze":"___找到更好的工作，我决定努力提高中文水平。","chinese_simp_answer":"为了","chinese_trad_full":"為了找到更好的工作，我決定努力提高中文水平。","chinese_trad_cloze":"___找到更好的工作，我決定努力提高中文水平。","chinese_trad_answer":"為了","spanish_full":"Para encontrar un mejor trabajo, decidí esforzarme por mejorar mi nivel de chino.","spanish_cloze":"___ encontrar un mejor trabajo, decidí esforzarme por mejorar mi nivel de chino.","spanish_answer":"Para","pinyin":"Wèile zhǎodào gèng hǎo de gōngzuò, wǒ juédìng nǔlì tígāo Zhōngwén shuǐpíng."},{"id":"hsk3_09","level":3,"module":"HSK3","chinese_simp_full":"刚才我在地铁上遇到了以前的邻居，我们聊了一会儿天。","chinese_simp_cloze":"___我在地铁上遇到了以前的邻居，我们聊了一会儿天。","chinese_simp_answer":"刚才","chinese_trad_full":"剛才我在地鐵上遇到了以前的鄰居，我們聊了一會兒天。","chinese_trad_cloze":"___我在地鐵上遇到了以前的鄰居，我們聊了一會兒天。","chinese_trad_answer":"剛才","spanish_full":"Hace un rato me encontré con mi antiguo vecino en el metro y charlamos un momento.","spanish_cloze":"___ me encontré con mi antiguo vecino en el metro y charlamos un momento.","spanish_answer":"Hace un rato","pinyin":"Gāngcái wǒ zài dìtiě shàng yùdào le yǐqián de línjū, wǒmen liáo le yíhuìr tiān."},{"id":"hsk3_10","level":3,"module":"HSK3","chinese_simp_full":"这本书是关于中国历史的，我觉得非常有意思。","chinese_simp_cloze":"这本书是___中国历史的，我觉得非常有意思。","chinese_simp_answer":"关于","chinese_trad_full":"這本書是關於中國歷史的，我覺得非常有意思。","chinese_trad_cloze":"這本書是___中國歷史的，我覺得非常有意思。","chinese_trad_answer":"關於","spanish_full":"Este libro trata sobre la historia de China, me parece muy interesante.","spanish_cloze":"Este libro trata ___ la historia de China, me parece muy interesante.","spanish_answer":"sobre","pinyin":"Zhè běn shū shì guānyú Zhōngguó lìshǐ de, wǒ juéde fēicháng yǒuyìsi."},{"id":"hsk3_11","level":3,"module":"HSK3","chinese_simp_full":"只有每天坚持锻炼，身体才会更健康。","chinese_simp_cloze":"___每天坚持锻炼，身体才会更健康。","chinese_simp_answer":"只有","chinese_trad_full":"只有每天堅持鍛煉，身體才會更健康。","chinese_trad_cloze":"___每天堅持鍛煉，身體才會更健康。","chinese_trad_answer":"只有","spanish_full":"Solo si haces ejercicio todos los días, tu cuerpo estará más sano.","spanish_cloze":"___ si haces ejercicio todos los días, tu cuerpo estará más sano.","spanish_answer":"Solo","pinyin":"Zhǐyǒu měitiān jiānchí duànliàn, shēntǐ cái huì gèng jiànkāng."},{"id":"hsk3_12","level":3,"module":"HSK3","chinese_simp_full":"请把行李箱放在电梯旁边，然后我们去办公室。","chinese_simp_cloze":"请把___放在电梯旁边，然后我们去办公室。","chinese_simp_answer":"行李箱","chinese_trad_full":"請把行李箱放在電梯旁邊，然後我們去辦公室。","chinese_trad_cloze":"請把___放在電梯旁邊，然後我們去辦公室。","chinese_trad_answer":"行李箱","spanish_full":"Por favor pon la maleta al lado del ascensor, luego vamos a la oficina.","spanish_cloze":"Por favor pon la ___ al lado del ascensor, luego vamos a la oficina.","spanish_answer":"maleta","pinyin":"Qǐng bǎ xínglǐxiāng fàng zài diàntī pángbiān, ránhòu wǒmen qù bàngōngshì."},{"id":"hsk3_13","level":3,"module":"HSK3","chinese_simp_full":"他对中国文化特别感兴趣，经常去图书馆看中文书。","chinese_simp_cloze":"他对中国文化___感兴趣，经常去图书馆看中文书。","chinese_simp_answer":"特别","chinese_trad_full":"他對中國文化特別感興趣，經常去圖書館看中文書。","chinese_trad_cloze":"他對中國文化___感興趣，經常去圖書館看中文書。","chinese_trad_answer":"特別","spanish_full":"Él está especialmente interesado en la cultura china, va a menudo a la biblioteca a leer libros en chino.","spanish_cloze":"Él está ___ interesado en la cultura china, va a menudo a la biblioteca a leer libros en chino.","spanish_answer":"especialmente","pinyin":"Tā duì Zhōngguó wénhuà tèbié gǎn xìngqù, jīngcháng qù túshūguǎn kàn Zhōngwén shū."},{"id":"hsk3_14","level":3,"module":"HSK3","chinese_simp_full":"因为路上堵车，所以我上班迟到了半个小时。","chinese_simp_cloze":"因为路上___，所以我上班迟到了半个小时。","chinese_simp_answer":"堵车","chinese_simp_answer_alt":"堵车了","chinese_trad_full":"因為路上堵車，所以我上班遲到了半個小時。","chinese_trad_cloze":"因為路上___，所以我上班遲到了半個小時。","chinese_trad_answer":"堵車","spanish_full":"Como había tráfico en el camino, llegué media hora tarde al trabajo.","spanish_cloze":"Como había ___ en el camino, llegué media hora tarde al trabajo.","spanish_answer":"tráfico","pinyin":"Yīnwèi lùshang dǔchē, suǒyǐ wǒ shàngbān chídào le bàn ge xiǎoshí."},{"id":"hsk3_15","level":3,"module":"HSK3","chinese_simp_full":"这件衬衫的颜色和那条裤子不太一样，你换一件吧。","chinese_simp_cloze":"这件衬衫的颜色和那条裤子不太___，你换一件吧。","chinese_simp_answer":"一样","chinese_trad_full":"這件襯衫的顏色和那條褲子不太一樣，你換一件吧。","chinese_trad_cloze":"這件襯衫的顏色和那條褲子不太___，你換一件吧。","chinese_trad_answer":"一樣","spanish_full":"El color de esta camisa no es igual al de esos pantalones, cámbiate uno.","spanish_cloze":"El color de esta camisa no es ___ al de esos pantalones, cámbiate uno.","spanish_answer":"igual","pinyin":"Zhè jiàn chènshān de yánsè hé nà tiáo kùzi bú tài yíyàng, nǐ huàn yí jiàn ba."},{"id":"hsk3_16","level":3,"module":"HSK3","chinese_simp_full":"我担心明天会下雨，所以我们还是带上伞比较好。","chinese_simp_cloze":"我___明天会下雨，所以我们还是带上伞比较好。","chinese_simp_answer":"担心","chinese_trad_full":"我擔心明天會下雨，所以我們還是帶上傘比較好。","chinese_trad_cloze":"我___明天會下雨，所以我們還是帶上傘比較好。","chinese_trad_answer":"擔心","spanish_full":"Me preocupa que mañana llueva, así que será mejor que llevemos paraguas.","spanish_cloze":"Me ___ que mañana llueva, así que será mejor que llevemos paraguas.","spanish_answer":"preocupa","pinyin":"Wǒ dānxīn míngtiān huì xià yǔ, suǒyǐ wǒmen háishi dài shàng sǎn bǐjiào hǎo."},{"id":"hsk3_17","level":3,"module":"HSK3","chinese_simp_full":"根据地图显示，银行就在公园的东边。","chinese_simp_cloze":"___地图显示，银行就在公园的东边。","chinese_simp_answer":"根据","chinese_trad_full":"根據地圖顯示，銀行就在公園的東邊。","chinese_trad_cloze":"___地圖顯示，銀行就在公園的東邊。","chinese_trad_answer":"根據","spanish_full":"Según muestra el mapa, el banco está justo al este del parque.","spanish_cloze":"___ muestra el mapa, el banco está justo al este del parque.","spanish_answer":"Según","pinyin":"Gēnjù dìtú xiǎnshì, yínháng jiù zài gōngyuán de dōngbian."},{"id":"hsk3_18","level":3,"module":"HSK3","chinese_simp_full":"他一边听音乐，一边打扫房间，看起来很轻松。","chinese_simp_cloze":"他___听音乐，一边打扫房间，看起来很轻松。","chinese_simp_answer":"一边","chinese_trad_full":"他一邊聽音樂，一邊打掃房間，看起來很輕鬆。","chinese_trad_cloze":"他___聽音樂，一邊打掃房間，看起來很輕鬆。","chinese_trad_answer":"一邊","spanish_full":"Él escucha música mientras limpia la habitación, se ve muy relajado.","spanish_cloze":"Él escucha música ___ limpia la habitación, se ve muy relajado.","spanish_answer":"mientras","pinyin":"Tā yìbiān tīng yīnyuè, yìbiān dǎsǎo fángjiān, kàn qǐlái hěn qīngsōng."},{"id":"hsk3_19","level":3,"module":"HSK3","chinese_simp_full":"虽然这个问题很难，但是只要努力，一定能解决。","chinese_simp_cloze":"虽然这个问题很难，但是只要___，一定能解决。","chinese_simp_answer":"努力","chinese_trad_full":"雖然這個問題很難，但是只要努力，一定能解決。","chinese_trad_cloze":"雖然這個問題很難，但是只要___，一定能解決。","chinese_trad_answer":"努力","spanish_full":"Aunque este problema es difícil, mientras te esfuerces, seguro podrás resolverlo.","spanish_cloze":"Aunque este problema es difícil, mientras te ___, seguro podrás resolverlo.","spanish_answer":"esfuerces","pinyin":"Suīrán zhège wèntí hěn nán, dànshì zhǐyào nǔlì, yídìng néng jiějué."},{"id":"hsk3_20","level":3,"module":"HSK3","chinese_simp_full":"请帮我拿一下那个瓶子，它太高了我够不着。","chinese_simp_cloze":"请帮我___一下那个瓶子，它太高了我够不着。","chinese_simp_answer":"拿","chinese_trad_full":"請幫我拿一下那個瓶子，它太高了我夠不著。","chinese_trad_cloze":"請幫我___一下那個瓶子，它太高了我夠不著。","chinese_trad_answer":"拿","spanish_full":"Por favor ayúdame a tomar esa botella, está demasiado alta y no alcanzo.","spanish_cloze":"Por favor ayúdame a ___ esa botella, está demasiado alta y no alcanzo.","spanish_answer":"tomar","pinyin":"Qǐng bāng wǒ ná yíxià nàge píngzi, tā tài gāo le wǒ gòu bu zháo."},{"id":"hsk3_21","level":3,"module":"HSK3","chinese_simp_full":"我对阿根廷的历史和文化越来越感兴趣了。","chinese_simp_cloze":"我对阿根廷的历史和文化___感兴趣了。","chinese_simp_answer":"越来越","chinese_trad_full":"我對阿根廷的歷史和文化越來越感興趣了。","chinese_trad_cloze":"我對阿根廷的歷史和文化___感興趣了。","chinese_trad_answer":"越來越","spanish_full":"Cada vez estoy más interesado en la historia y cultura de Argentina.","spanish_cloze":"___ estoy más interesado en la historia y cultura de Argentina.","spanish_answer":"Cada vez","pinyin":"Wǒ duì Āgēntíng de lìshǐ hé wénhuà yuè lái yuè gǎn xìngqù le."},{"id":"hsk3_22","level":3,"module":"HSK3","chinese_simp_full":"昨天我去银行换了钱，准备周末去旅游。","chinese_simp_cloze":"昨天我去银行___了钱，准备周末去旅游。","chinese_simp_answer":"换","chinese_trad_full":"昨天我去銀行換了錢，準備週末去旅遊。","chinese_trad_cloze":"昨天我去銀行___了錢，準備週末去旅遊。","chinese_trad_answer":"換","spanish_full":"Ayer fui al banco a cambiar dinero, me preparo para viajar el fin de semana.","spanish_cloze":"Ayer fui al banco a ___ dinero, me preparo para viajar el fin de semana.","spanish_answer":"cambiar","pinyin":"Zuótiān wǒ qù yínháng huàn le qián, zhǔnbèi zhōumò qù lǚyóu."},{"id":"hsk3_23","level":3,"module":"HSK3","chinese_simp_full":"你觉得这个办法怎么样？能不能解决这个问题？","chinese_simp_cloze":"你觉得这个___怎么样？能不能解决这个问题？","chinese_simp_answer":"办法","chinese_trad_full":"你覺得這個辦法怎麼樣？能不能解決這個問題？","chinese_trad_cloze":"你覺得這個___怎麼樣？能不能解決這個問題？","chinese_trad_answer":"辦法","spanish_full":"¿Qué te parece este método? ¿Podrá resolver este problema?","spanish_cloze":"¿Qué te parece este ___? ¿Podrá resolver este problema?","spanish_answer":"método","pinyin":"Nǐ juéde zhège bànfǎ zěnme yàng? Néng bu néng jiějué zhège wèntí?"},{"id":"hsk3_24","level":3,"module":"HSK3","chinese_simp_full":"他本来打算坐飞机，后来因为天气不好改成了火车。","chinese_simp_cloze":"他本来打算坐飞机，___因为天气不好改成了火车。","chinese_simp_answer":"后来","chinese_trad_full":"他本來打算坐飛機，後來因為天氣不好改成了火車。","chinese_trad_cloze":"他本來打算坐飛機，___因為天氣不好改成了火車。","chinese_trad_answer":"後來","spanish_full":"Originalmente planeaba tomar el avión, pero después cambió al tren por el mal clima.","spanish_cloze":"Originalmente planeaba tomar el avión, pero ___ cambió al tren por el mal clima.","spanish_answer":"después","pinyin":"Tā běnlái dǎsuàn zuò fēijī, hòulái yīnwèi tiānqì bù hǎo gǎichéng le huǒchē."},{"id":"hsk3_25","level":3,"module":"HSK3","chinese_simp_full":"这家饭馆的菜太辣了，我吃了一点儿就饱了。","chinese_simp_cloze":"这家饭馆的菜太辣了，我吃了___就饱了。","chinese_simp_answer":"一点儿","chinese_trad_full":"這家飯館的菜太辣了，我吃了一點兒就飽了。","chinese_trad_cloze":"這家飯館的菜太辣了，我吃了___就飽了。","chinese_trad_answer":"一點兒","spanish_full":"La comida de este restaurante es demasiado picante, comí un poco y ya estoy lleno.","spanish_cloze":"La comida de este restaurante es demasiado picante, comí ___ y ya estoy lleno.","spanish_answer":"un poco","pinyin":"Zhè jiā fànguǎn de cài tài là le, wǒ chī le yìdiǎnr jiù bǎo le."},{"id":"hsk3_26","level":3,"module":"HSK3","chinese_simp_full":"请你放心，我一定会按时完成任务的。","chinese_simp_cloze":"请你___，我一定会按时完成任务的。","chinese_simp_answer":"放心","chinese_trad_full":"請你放心，我一定會按時完成任務的。","chinese_trad_cloze":"請你___，我一定會按時完成任務的。","chinese_trad_answer":"放心","spanish_full":"Por favor descuida, sin falta completaré la tarea a tiempo.","spanish_cloze":"Por favor ___, sin falta completaré la tarea a tiempo.","spanish_answer":"descuida","pinyin":"Qǐng nǐ fàngxīn, wǒ yídìng huì ànshí wánchéng rènwu de."},{"id":"hsk3_27","level":3,"module":"HSK3","chinese_simp_full":"除了英语之外，他还懂法语和日语，真聪明！","chinese_simp_cloze":"除了英语之外，他还___法语和日语，真聪明！","chinese_simp_answer":"懂","chinese_trad_full":"除了英語之外，他還懂法語和日語，真聰明！","chinese_trad_cloze":"除了英語之外，他還___法語和日語，真聰明！","chinese_trad_answer":"懂","spanish_full":"Además de inglés, él entiende francés y japonés, ¡qué inteligente!","spanish_cloze":"Además de inglés, él ___ francés y japonés, ¡qué inteligente!","spanish_answer":"entiende","pinyin":"Chúle Yīngyǔ zhīwài, tā hái dǒng Fǎyǔ hé Rìyǔ, zhēn cōngming!"},{"id":"hsk3_28","level":3,"module":"HSK3","chinese_simp_full":"我发现这里的空气比北京干净多了，环境很好。","chinese_simp_cloze":"我___这里的空气比北京干净多了，环境很好。","chinese_simp_answer":"发现","chinese_trad_full":"我發現這裡的空氣比北京乾淨多了，環境很好。","chinese_trad_cloze":"我___這裡的空氣比北京乾淨多了，環境很好。","chinese_trad_answer":"發現","spanish_full":"Descubrí que el aire aquí es mucho más limpio que en Beijing, el ambiente es excelente.","spanish_cloze":"___ que el aire aquí es mucho más limpio que en Beijing, el ambiente es excelente.","spanish_answer":"Descubrí","pinyin":"Wǒ fāxiàn zhèlǐ de kōngqì bǐ Běijīng gānjìng duō le, huánjìng hěn hǎo."},{"id":"hsk3_29","level":3,"module":"HSK3","chinese_simp_full":"虽然我很累，但是为了照顾生病的妈妈，我还是坚持工作。","chinese_simp_cloze":"虽然我很累，但是为了___生病的妈妈，我还是坚持工作。","chinese_simp_answer":"照顾","chinese_trad_full":"雖然我很累，但是為了照顧生病的媽媽，我還是堅持工作。","chinese_trad_cloze":"雖然我很累，但是為了___生病的媽媽，我還是堅持工作。","chinese_trad_answer":"照顧","spanish_full":"Aunque estoy muy cansado, para cuidar a mi mamá enferma, sigo trabajando.","spanish_cloze":"Aunque estoy muy cansado, para ___ a mi mamá enferma, sigo trabajando.","spanish_answer":"cuidar","pinyin":"Suīrán wǒ hěn lèi, dànshì wèile zhàogù shēngbìng de māma, wǒ háishi jiānchí gōngzuò."},{"id":"hsk3_30","level":3,"module":"HSK3","chinese_simp_full":"终于完成了所有的作业，我可以休息一下看电视了。","chinese_simp_cloze":"___完成了所有的作业，我可以休息一下看电视了。","chinese_simp_answer":"终于","chinese_trad_full":"終於完成了所有的作業，我可以休息一下看電視了。","chinese_trad_cloze":"___完成了所有的作業，我可以休息一下看電視了。","chinese_trad_answer":"終於","spanish_full":"Por fin terminé toda la tarea, puedo descansar un rato y ver televisión.","spanish_cloze":"___ terminé toda la tarea, puedo descansar un rato y ver televisión.","spanish_answer":"Por fin","pinyin":"Zhōngyú wánchéng le suǒyǒu de zuòyè, wǒ kěyǐ xiūxi yíxià kàn diànshì le."}],
'HSK4': [{"id":"hsk4_01","level":4,"module":"HSK4","chinese_simp_full":"尽管价格贵，质量很好。","chinese_simp_cloze":"___价格贵，质量很好。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管價格貴，質量很好。","chinese_trad_cloze":"___價格貴，質量很好。","chinese_trad_answer":"儘管","spanish_full":"Aunque es caro, la calidad es muy buena.","spanish_cloze":"___ es caro, la calidad es muy buena.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn jiàgé guì, zhìliàng hěn hǎo."},{"id":"hsk4_02","level":4,"module":"HSK4","chinese_simp_full":"由于感冒，他没来上课。","chinese_simp_cloze":"___感冒，他没来上课。","chinese_simp_answer":"由于","chinese_trad_full":"由於感冒，他沒來上課。","chinese_trad_cloze":"___感冒，他沒來上課。","chinese_trad_answer":"由於","spanish_full":"Debido a un resfrío, no vino a clase.","spanish_cloze":"___ a un resfrío, no vino a clase.","spanish_answer":"Debido","pinyin":"Yóuyú gǎnmào, tā méi lái shàngkè."},{"id":"hsk4_03","level":4,"module":"HSK4","chinese_simp_full":"无论去哪儿，他都带着书。","chinese_simp_cloze":"___去哪儿，他都带着书。","chinese_simp_answer":"无论","chinese_trad_full":"無論去哪兒，他都帶著書。","chinese_trad_cloze":"___去哪兒，他都帶著書。","chinese_trad_answer":"無論","spanish_full":"Sin importar a dónde va, siempre lleva un libro.","spanish_cloze":"___ a dónde va, siempre lleva un libro.","spanish_answer":"Sin importar","pinyin":"Wúlùn qù nǎr, tā dōu dàizhe shū."},{"id":"hsk4_04","level":4,"module":"HSK4","chinese_simp_full":"他对阿根廷的历史很了解。","chinese_simp_cloze":"他___阿根廷的历史很了解。","chinese_simp_answer":"对","chinese_trad_full":"他對阿根廷的歷史很瞭解。","chinese_trad_cloze":"他___阿根廷的歷史很瞭解。","chinese_trad_answer":"對","spanish_full":"Él conoce mucho sobre la historia de Argentina.","spanish_cloze":"Él conoce mucho ___ la historia de Argentina.","spanish_answer":"sobre","pinyin":"Tā duì Āgēntíng de lìshǐ hěn liǎojiě."},{"id":"hsk4_05","level":4,"module":"HSK4","chinese_simp_full":"早出发可以避免堵车。","chinese_simp_cloze":"早出发可以___堵车。","chinese_simp_answer":"避免","chinese_trad_full":"早出發可以避免堵車。","chinese_trad_cloze":"早出發可以___堵車。","chinese_trad_answer":"避免","spanish_full":"Salir temprano ayuda a evitar el embotellamiento.","spanish_cloze":"Salir temprano ayuda a ___ el embotellamiento.","spanish_answer":"evitar","pinyin":"Zǎo chūfā kěyǐ bìmiǎn dǔchē."},{"id":"hsk4_06","level":4,"module":"HSK4","chinese_simp_full":"来到新学校，他很快适应了。","chinese_simp_cloze":"来到新学校，他很快___了。","chinese_simp_answer":"适应","chinese_trad_full":"來到新學校，他很快適應了。","chinese_trad_cloze":"來到新學校，他很快___了。","chinese_trad_answer":"適應","spanish_full":"Al llegar a la escuela nueva, se adaptó rápido.","spanish_cloze":"Al llegar a la escuela nueva, se ___ rápido.","spanish_answer":"adaptó","pinyin":"Lái dào xīn xuéxiào, tā hěn kuài shìyìng le."},{"id":"hsk4_07","level":4,"module":"HSK4","chinese_simp_full":"根据天气预报，明天有雨。","chinese_simp_cloze":"___天气预报，明天有雨。","chinese_simp_answer":"根据","chinese_trad_full":"根據天氣預報，明天有雨。","chinese_trad_cloze":"___天氣預報，明天有雨。","chinese_trad_answer":"根據","spanish_full":"Según el pronóstico del tiempo, mañana llueve.","spanish_cloze":"___ el pronóstico del tiempo, mañana llueve.","spanish_answer":"Según","pinyin":"Gēnjù tiānqì yùbào, míngtiān yǒu yǔ."},{"id":"hsk4_08","level":4,"module":"HSK4","chinese_simp_full":"既然生病了，就休息一天。","chinese_simp_cloze":"___生病了，就休息一天。","chinese_simp_answer":"既然","chinese_trad_full":"既然生病了，就休息一天。","chinese_trad_cloze":"___生病了，就休息一天。","chinese_trad_answer":"既然","spanish_full":"Ya que estás enfermo, descansa un día.","spanish_cloze":"___ que estás enfermo, descansa un día.","spanish_answer":"Ya","pinyin":"Jìrán shēngbìng le, jiù xiūxi yì tiān."},{"id":"hsk4_09","level":4,"module":"HSK4","chinese_simp_full":"随着音乐，大家一起跳舞。","chinese_simp_cloze":"___音乐，大家一起跳舞。","chinese_simp_answer":"随着","chinese_trad_full":"隨著音樂，大家一起跳舞。","chinese_trad_cloze":"___音樂，大家一起跳舞。","chinese_trad_answer":"隨著","spanish_full":"Con la música, todos bailan juntos.","spanish_cloze":"___ la música, todos bailan juntos.","spanish_answer":"Con","pinyin":"Suízhe yīnyuè, dàjiā yīqǐ tiàowǔ."},{"id":"hsk4_10","level":4,"module":"HSK4","chinese_simp_full":"他靠坚持取得了成功。","chinese_simp_cloze":"___靠坚持取得了成功。","chinese_simp_answer":"他","chinese_trad_full":"他靠堅持取得了成功。","chinese_trad_cloze":"___靠堅持取得了成功。","chinese_trad_answer":"他","spanish_full":"Él triunfó gracias a la constancia.","spanish_cloze":"___ triunfó gracias a la constancia.","spanish_answer":"Él","pinyin":"Tā kào jiānchí qǔdé le chénggōng."},{"id":"hsk4_11","level":4,"module":"HSK4","chinese_simp_full":"不管多晚，他都回消息。","chinese_simp_cloze":"___多晚，他都回消息。","chinese_simp_answer":"不管","chinese_trad_full":"不管多晚，他都回消息。","chinese_trad_cloze":"___多晚，他都回消息。","chinese_trad_answer":"不管","spanish_full":"Sin importar qué tan tarde sea, siempre responde los mensajes.","spanish_cloze":"___ qué tan tarde sea, siempre responde los mensajes.","spanish_answer":"Sin importar","pinyin":"Bùguǎn duō wǎn, tā dōu huí xiāoxi."},{"id":"hsk4_12","level":4,"module":"HSK4","chinese_simp_full":"与其担心，不如行动。","chinese_simp_cloze":"___担心，不如行动。","chinese_simp_answer":"与其","chinese_trad_full":"與其擔心，不如行動。","chinese_trad_cloze":"___擔心，不如行動。","chinese_trad_answer":"與其","spanish_full":"En lugar de preocuparse, mejor actuar.","spanish_cloze":"___ de preocuparse, mejor actuar.","spanish_answer":"En lugar","pinyin":"Yǔqí dānxīn, bùrú xíngdòng."},{"id":"hsk4_13","level":4,"module":"HSK4","chinese_simp_full":"同学之间要相互帮助。","chinese_simp_cloze":"同学之间要___帮助。","chinese_simp_answer":"相互","chinese_trad_full":"同學之間要相互幫助。","chinese_trad_cloze":"同學之間要___幫助。","chinese_trad_answer":"相互","spanish_full":"Entre compañeros hay que ayudarse mutuamente.","spanish_cloze":"Entre compañeros hay que ayudarse ___.","spanish_answer":"mutuamente","pinyin":"Tóngxué zhījiān yào xiānghù bāngzhù."},{"id":"hsk4_14","level":4,"module":"HSK4","chinese_simp_full":"尽管害羞，她唱歌很好听。","chinese_simp_cloze":"___害羞，她唱歌很好听。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管害羞，她唱歌很好聽。","chinese_trad_cloze":"___害羞，她唱歌很好聽。","chinese_trad_answer":"儘管","spanish_full":"Aunque es tímida, canta muy lindo.","spanish_cloze":"___ es tímida, canta muy lindo.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn hàixiū, tā chàng gē hěn hǎotīng."},{"id":"hsk4_15","level":4,"module":"HSK4","chinese_simp_full":"对于这个问题，我不太了解。","chinese_simp_cloze":"___这个问题，我不太了解。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個問題，我不太瞭解。","chinese_trad_cloze":"___這個問題，我不太瞭解。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este tema, no sé mucho.","spanish_cloze":"___ a este tema, no sé mucho.","spanish_answer":"Con respecto","pinyin":"Duìyú zhège wèntí, wǒ bù tài liǎojiě."},{"id":"hsk4_16","level":4,"module":"HSK4","chinese_simp_full":"他的做法不符合规矩。","chinese_simp_cloze":"他的做法不___规矩。","chinese_simp_answer":"符合","chinese_trad_full":"他的做法不符合規矩。","chinese_trad_cloze":"他的做法不___規矩。","chinese_trad_answer":"符合","spanish_full":"Su manera de actuar no cumple las reglas.","spanish_cloze":"Su manera de actuar no ___ las reglas.","spanish_answer":"cumple","pinyin":"Tā de zuòfǎ bù fúhé guīju."},{"id":"hsk4_17","level":4,"module":"HSK4","chinese_simp_full":"只要努力练习，就会进步。","chinese_simp_cloze":"___努力练习，就会进步。","chinese_simp_answer":"只要","chinese_trad_full":"只要努力練習，就會進步。","chinese_trad_cloze":"___努力練習，就會進步。","chinese_trad_answer":"只要","spanish_full":"Siempre que practiques con esfuerzo, vas a progresar.","spanish_cloze":"___ practiques con esfuerzo, vas a progresar.","spanish_answer":"Siempre que","pinyin":"Zhǐyào nǔlì liànxí, jiù huì jìnbù."},{"id":"hsk4_18","level":4,"module":"HSK4","chinese_simp_full":"多听多说能提高口语。","chinese_simp_cloze":"多听多说能___口语。","chinese_simp_answer":"提高","chinese_trad_full":"多聽多說能提高口語。","chinese_trad_cloze":"多聽多說能___口語。","chinese_trad_answer":"提高","spanish_full":"Escuchar y hablar mucho mejora la expresión oral.","spanish_cloze":"Escuchar y hablar mucho ___ la expresión oral.","spanish_answer":"mejora","pinyin":"Duō tīng duō shuō néng tígāo kǒuyǔ."},{"id":"hsk4_19","level":4,"module":"HSK4","chinese_simp_full":"即使错了，也别灰心。","chinese_simp_cloze":"___错了，也别灰心。","chinese_simp_answer":"即使","chinese_trad_full":"即使錯了，也別灰心。","chinese_trad_cloze":"___錯了，也別灰心。","chinese_trad_answer":"即使","spanish_full":"Incluso si te equivocas, no te desanimes.","spanish_cloze":"___ si te equivocas, no te desanimes.","spanish_answer":"Incluso","pinyin":"Jíshǐ cuò le, yě bié huīxīn."},{"id":"hsk4_20","level":4,"module":"HSK4","chinese_simp_full":"他通过了驾照考试。","chinese_simp_cloze":"他___了驾照考试。","chinese_simp_answer":"通过","chinese_trad_full":"他通過了駕照考試。","chinese_trad_cloze":"他___了駕照考試。","chinese_trad_answer":"通過","spanish_full":"Aprobó el examen para la licencia de conducir.","spanish_cloze":"___ el examen para la licencia de conducir.","spanish_answer":"Aprobó","pinyin":"Tā tōngguò le jiàzhào kǎoshì."},{"id":"hsk4_21","level":4,"module":"HSK4","chinese_simp_full":"考虑到他刚来，我说话很慢。","chinese_simp_cloze":"___他刚来，我说话很慢。","chinese_simp_answer":"考虑到","chinese_trad_full":"考慮到他剛來，我說話很慢。","chinese_trad_cloze":"___他剛來，我說話很慢。","chinese_trad_answer":"考慮到","spanish_full":"Teniendo en cuenta que recién llegó, hablo despacio.","spanish_cloze":"___ en cuenta que recién llegó, hablo despacio.","spanish_answer":"Teniendo","pinyin":"Kǎolǜdào tā gāng lái, wǒ shuōhuà hěn màn."},{"id":"hsk4_22","level":4,"module":"HSK4","chinese_simp_full":"健康比钱更重要。","chinese_simp_cloze":"健康比钱___重要。","chinese_simp_answer":"更","chinese_trad_full":"健康比錢更重要。","chinese_trad_cloze":"健康比錢___重要。","chinese_trad_answer":"更","spanish_full":"La salud es aún más importante que el dinero.","spanish_cloze":"La salud es ___ importante que el dinero.","spanish_answer":"aún más","pinyin":"Jiànkāng bǐ qián gèng zhòngyào."},{"id":"hsk4_23","level":4,"module":"HSK4","chinese_simp_full":"与其等明天，不如现在开始。","chinese_simp_cloze":"___等明天，不如现在开始。","chinese_simp_answer":"与其","chinese_trad_full":"與其等明天，不如現在開始。","chinese_trad_cloze":"___等明天，不如現在開始。","chinese_trad_answer":"與其","spanish_full":"En lugar de esperar a mañana, mejor empieza ahora.","spanish_cloze":"___ de esperar a mañana, mejor empieza ahora.","spanish_answer":"En lugar","pinyin":"Yǔqí děng míngtiān, bùrú xiànzài kāishǐ."},{"id":"hsk4_24","level":4,"module":"HSK4","chinese_simp_full":"由于雪太大，航班延误了。","chinese_simp_cloze":"___雪太大，航班延误了。","chinese_simp_answer":"由于","chinese_trad_full":"由於雪太大，航班延誤了。","chinese_trad_cloze":"___雪太大，航班延誤了。","chinese_trad_answer":"由於","spanish_full":"Debido a la gran nevada, el vuelo se retrasó.","spanish_cloze":"___ a la gran nevada, el vuelo se retrasó.","spanish_answer":"Debido","pinyin":"Yóuyú xuě tài dà, hángbān yānwù le."},{"id":"hsk4_25","level":4,"module":"HSK4","chinese_simp_full":"不管输赢，开心最重要。","chinese_simp_cloze":"___输赢，开心最重要。","chinese_simp_answer":"不管","chinese_trad_full":"不管輸贏，開心最重要。","chinese_trad_cloze":"___輸贏，開心最重要。","chinese_trad_answer":"不管","spanish_full":"Sin importar ganar o perder, lo más importante es divertirse.","spanish_cloze":"___ ganar o perder, lo más importante es divertirse.","spanish_answer":"Sin importar","pinyin":"Bùguǎn shū yíng, kāixīn zuì zhòngyào."},{"id":"hsk4_26","level":4,"module":"HSK4","chinese_simp_full":"新系统能提高工作效率。","chinese_simp_cloze":"新系统能___工作效率。","chinese_simp_answer":"提高","chinese_trad_full":"新系統能提高工作效率。","chinese_trad_cloze":"新系統能___工作效率。","chinese_trad_answer":"提高","spanish_full":"El sistema nuevo mejora la eficiencia del trabajo.","spanish_cloze":"El sistema nuevo ___ la eficiencia del trabajo.","spanish_answer":"mejora","pinyin":"Xīn xìtǒng néng tígāo gōngzuò xiàolǜ."},{"id":"hsk4_27","level":4,"module":"HSK4","chinese_simp_full":"既然大家都同意，就按计划做。","chinese_simp_cloze":"___大家都同意，就按计划做。","chinese_simp_answer":"既然","chinese_trad_full":"既然大家都同意，就按計劃做。","chinese_trad_cloze":"___大家都同意，就按計劃做。","chinese_trad_answer":"既然","spanish_full":"Ya que todos están de acuerdo, hagamos lo planeado.","spanish_cloze":"___ que todos están de acuerdo, hagamos lo planeado.","spanish_answer":"Ya","pinyin":"Jìrán dàjiā dōu tóngyì, jiù àn jìhuà zuò."},{"id":"hsk4_28","level":4,"module":"HSK4","chinese_simp_full":"随着收入增加，生活变好了。","chinese_simp_cloze":"___收入增加，生活变好了。","chinese_simp_answer":"随着","chinese_trad_full":"隨著收入增加，生活變好了。","chinese_trad_cloze":"___收入增加，生活變好了。","chinese_trad_answer":"隨著","spanish_full":"Con el aumento del ingreso, la vida mejoró.","spanish_cloze":"___ el aumento del ingreso, la vida mejoró.","spanish_answer":"Con","pinyin":"Suízhe shōurù zēngjiā, shēnghuó biàn hǎo le."},{"id":"hsk4_29","level":4,"module":"HSK4","chinese_simp_full":"他每天六点就开始工作。","chinese_simp_cloze":"___每天六点就开始工作。","chinese_simp_answer":"他","chinese_trad_full":"他每天六點就開始工作。","chinese_trad_cloze":"___每天六點就開始工作。","chinese_trad_answer":"他","spanish_full":"Él empieza a trabajar a las seis cada día.","spanish_cloze":"___ empieza a trabajar a las seis cada día.","spanish_answer":"Él","pinyin":"Tā měitiān liù diǎn jiù kāishǐ gōngzuò."},{"id":"hsk4_30","level":4,"module":"HSK4","chinese_simp_full":"对于父母的建议，要认真听。","chinese_simp_cloze":"___父母的建议，要认真听。","chinese_simp_answer":"对于","chinese_trad_full":"對於父母的建議，要認真聽。","chinese_trad_cloze":"___父母的建議，要認真聽。","chinese_trad_answer":"對於","spanish_full":"Con respecto al consejo de los padres, hay que escucharlo con atención.","spanish_cloze":"___ al consejo de los padres, hay que escucharlo con atención.","spanish_answer":"Con respecto","pinyin":"Duìyú fùmǔ de jiànyì, yào rènzhēn tīng."},{"id":"hsk4_31","level":4,"module":"HSK4","chinese_simp_full":"只有亲眼看到，我才会相信。","chinese_simp_cloze":"___亲眼看到，我才会相信。","chinese_simp_answer":"只有","chinese_trad_full":"只有親眼看到，我才會相信。","chinese_trad_cloze":"___親眼看到，我才會相信。","chinese_trad_answer":"只有","spanish_full":"Solo si lo veo con mis propios ojos, lo creo.","spanish_cloze":"___ si lo veo con mis propios ojos, lo creo.","spanish_answer":"Solo","pinyin":"Zhǐyǒu qīnyǎn kàn dào, wǒ cái huì xiāngxìn."},{"id":"hsk4_32","level":4,"module":"HSK4","chinese_simp_full":"尽管只有十二岁，他钢琴弹得很好。","chinese_simp_cloze":"___只有十二岁，他钢琴弹得很好。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管只有十二歲，他鋼琴彈得很好。","chinese_trad_cloze":"___只有十二歲，他鋼琴彈得很好。","chinese_trad_answer":"儘管","spanish_full":"Aunque solo tiene doce años, toca el piano muy bien.","spanish_cloze":"___ solo tiene doce años, toca el piano muy bien.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn zhǐyǒu shí'èr suì, tā gāngqín tán de hěn hǎo."},{"id":"hsk4_33","level":4,"module":"HSK4","chinese_simp_full":"由于忘了带伞，他淋湿了。","chinese_simp_cloze":"___忘了带伞，他淋湿了。","chinese_simp_answer":"由于","chinese_trad_full":"由於忘了帶傘，他淋溼了。","chinese_trad_cloze":"___忘了帶傘，他淋溼了。","chinese_trad_answer":"由於","spanish_full":"Debido a que olvidó el paraguas, se mojó.","spanish_cloze":"___ a que olvidó el paraguas, se mojó.","spanish_answer":"Debido","pinyin":"Yóuyú wàng le dài sǎn, tā lín shī le."},{"id":"hsk4_34","level":4,"module":"HSK4","chinese_simp_full":"不管谁反对，我都要去。","chinese_simp_cloze":"___谁反对，我都要去。","chinese_simp_answer":"不管","chinese_trad_full":"不管誰反對，我都要去。","chinese_trad_cloze":"___誰反對，我都要去。","chinese_trad_answer":"不管","spanish_full":"Sin importar quién se oponga, yo voy a ir.","spanish_cloze":"___ quién se oponga, yo voy a ir.","spanish_answer":"Sin importar","pinyin":"Bùguǎn shéi fǎnduì, wǒ dōu yào qù."},{"id":"hsk4_35","level":4,"module":"HSK4","chinese_simp_full":"他通过看电影学中文。","chinese_simp_cloze":"他___看电影学中文。","chinese_simp_answer":"通过","chinese_trad_full":"他通過看電影學中文。","chinese_trad_cloze":"他___看電影學中文。","chinese_trad_answer":"通過","spanish_full":"Él aprende chino viendo películas.","spanish_cloze":"Él ___ chino viendo películas.","spanish_answer":"aprende","pinyin":"Tā tōngguò kàn diànyǐng xué zhōngwén."},{"id":"hsk4_36","level":4,"module":"HSK4","chinese_simp_full":"既然不懂，就大胆问。","chinese_simp_cloze":"___不懂，就大胆问。","chinese_simp_answer":"既然","chinese_trad_full":"既然不懂，就大膽問。","chinese_trad_cloze":"___不懂，就大膽問。","chinese_trad_answer":"既然","spanish_full":"Ya que no entiendes, pregunta sin miedo.","spanish_cloze":"___ que no entiendes, pregunta sin miedo.","spanish_answer":"Ya","pinyin":"Jìrán bù dǒng, jiù dàdǎn wèn."},{"id":"hsk4_37","level":4,"module":"HSK4","chinese_simp_full":"随着个子长高，裤子变短了。","chinese_simp_cloze":"___个子长高，裤子变短了。","chinese_simp_answer":"随着","chinese_trad_full":"隨著個子長高，褲子變短了。","chinese_trad_cloze":"___個子長高，褲子變短了。","chinese_trad_answer":"隨著","spanish_full":"Con el crecimiento, los pantalones le quedan cortos.","spanish_cloze":"___ el crecimiento, los pantalones le quedan cortos.","spanish_answer":"Con","pinyin":"Suízhe gèzi zhǎng gāo, kùzi biàn duǎn le."},{"id":"hsk4_38","level":4,"module":"HSK4","chinese_simp_full":"他谦虚又好学，大家很喜欢他。","chinese_simp_cloze":"___谦虚又好学，大家很喜欢他。","chinese_simp_answer":"他","chinese_trad_full":"他謙虛又好學，大家很喜歡他。","chinese_trad_cloze":"___謙虛又好學，大家很喜歡他。","chinese_trad_answer":"他","spanish_full":"Él es humilde y estudioso, todos lo aprecian.","spanish_cloze":"___ es humilde y estudioso, todos lo aprecian.","spanish_answer":"Él","pinyin":"Tā qiānxū yòu hàoxué, dàjiā hěn xǐhuan tā."},{"id":"hsk4_39","level":4,"module":"HSK4","chinese_simp_full":"对于迟到这件事，老师很生气。","chinese_simp_cloze":"___迟到这件事，老师很生气。","chinese_simp_answer":"对于","chinese_trad_full":"對於遲到這件事，老師很生氣。","chinese_trad_cloze":"___遲到這件事，老師很生氣。","chinese_trad_answer":"對於","spanish_full":"Con respecto a llegar tarde, el profesor se enojó.","spanish_cloze":"___ a llegar tarde, el profesor se enojó.","spanish_answer":"Con respecto","pinyin":"Duìyú chídào zhè jiàn shì, lǎoshī hěn shēngqì."},{"id":"hsk4_40","level":4,"module":"HSK4","chinese_simp_full":"只要一家人在一起，什么都不怕。","chinese_simp_cloze":"___一家人在一起，什么都不怕。","chinese_simp_answer":"只要","chinese_trad_full":"只要一家人在一起，什麼都不怕。","chinese_trad_cloze":"___一家人在一起，什麼都不怕。","chinese_trad_answer":"只要","spanish_full":"Siempre que la familia esté junta, no hay nada que temer.","spanish_cloze":"___ la familia esté junta, no hay nada que temer.","spanish_answer":"Siempre que","pinyin":"Zhǐyào yì jiā rén zài yìqǐ, shénme dōu bù pà."}],
'HSK5': [{"id":"hsk5_01","level":5,"module":"HSK5","chinese_simp_full":"尽管天气不好，我们还是出发了。","chinese_simp_cloze":"___天气不好，我们还是出发了。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管天氣不好，我們還是出發了。","chinese_trad_cloze":"___天氣不好，我們還是出發了。","chinese_trad_answer":"儘管","spanish_full":"Aunque hacía mal tiempo, salimos de todos modos.","spanish_cloze":"___ hacía mal tiempo, salimos de todos modos.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn tiānqì bù hǎo, wǒmen háishì chūfā le."},{"id":"hsk5_02","level":5,"module":"HSK5","chinese_simp_full":"与其等车，我们不如走路去。","chinese_simp_cloze":"___等车，我们不如走路去。","chinese_simp_answer":"与其","chinese_trad_full":"與其等車，我們不如走路去。","chinese_trad_cloze":"___等車，我們不如走路去。","chinese_trad_answer":"與其","spanish_full":"En lugar de esperar el colectivo, mejor vamos caminando.","spanish_cloze":"___ de esperar el colectivo, mejor vamos caminando.","spanish_answer":"En lugar","pinyin":"Yǔqí děng chē, wǒmen bùrú zǒulù qù."},{"id":"hsk5_03","level":5,"module":"HSK5","chinese_simp_full":"随着时间的推移，我的想法变了。","chinese_simp_cloze":"___时间的推移，我的想法变了。","chinese_simp_answer":"随着","chinese_trad_full":"隨著時間的推移，我的想法變了。","chinese_trad_cloze":"___時間的推移，我的想法變了。","chinese_trad_answer":"隨著","spanish_full":"Con el paso del tiempo, mis ideas cambiaron.","spanish_cloze":"___ el paso del tiempo, mis ideas cambiaron.","spanish_answer":"Con","pinyin":"Suízhe shíjiān de tuīyí, wǒ de xiǎngfǎ biàn le."},{"id":"hsk5_04","level":5,"module":"HSK5","chinese_simp_full":"他的成功得益于老师的帮助。","chinese_simp_cloze":"他的成功___于老师的帮助。","chinese_simp_answer":"得益","chinese_trad_full":"他的成功得益於老師的幫助。","chinese_trad_cloze":"他的成功___於老師的幫助。","chinese_trad_answer":"得益","spanish_full":"Su éxito se debe a la ayuda del profesor.","spanish_cloze":"Su éxito ___ a la ayuda del profesor.","spanish_answer":"se debe","pinyin":"Tā de chénggōng déyì yú lǎoshī de bāngzhù."},{"id":"hsk5_05","level":5,"module":"HSK5","chinese_simp_full":"无论多忙，他都坚持运动。","chinese_simp_cloze":"___多忙，他都坚持运动。","chinese_simp_answer":"无论","chinese_trad_full":"無論多忙，他都堅持運動。","chinese_trad_cloze":"___多忙，他都堅持運動。","chinese_trad_answer":"無論","spanish_full":"Sin importar cuán ocupado esté, siempre hace ejercicio.","spanish_cloze":"___ cuán ocupado esté, siempre hace ejercicio.","spanish_answer":"Sin importar","pinyin":"Wúlùn duō máng, tā dōu jiānchí yùndòng."},{"id":"hsk5_06","level":5,"module":"HSK5","chinese_simp_full":"这篇文章反映了社会的真实情况。","chinese_simp_cloze":"这篇文章___了社会的真实情况。","chinese_simp_answer":"反映","chinese_trad_full":"這篇文章反映了社會的真實情況。","chinese_trad_cloze":"這篇文章___了社會的真實情況。","chinese_trad_answer":"反映","spanish_full":"Este artículo refleja la verdadera situación de la sociedad.","spanish_cloze":"Este artículo ___ la verdadera situación de la sociedad.","spanish_answer":"refleja","pinyin":"Zhè piān wénzhāng fǎnyìng le shèhuì de zhēnshí qíngkuàng."},{"id":"hsk5_07","level":5,"module":"HSK5","chinese_simp_full":"由于下雨，比赛取消了。","chinese_simp_cloze":"___下雨，比赛取消了。","chinese_simp_answer":"由于","chinese_trad_full":"由於下雨，比賽取消了。","chinese_trad_cloze":"___下雨，比賽取消了。","chinese_trad_answer":"由於","spanish_full":"Debido a la lluvia, cancelaron el partido.","spanish_cloze":"___ a la lluvia, cancelaron el partido.","spanish_answer":"Debido","pinyin":"Yóuyú xiàyǔ, bǐsài qǔxiāo le."},{"id":"hsk5_08","level":5,"module":"HSK5","chinese_simp_full":"既然来了，就多坐一会儿吧。","chinese_simp_cloze":"___来了，就多坐一会儿吧。","chinese_simp_answer":"既然","chinese_trad_full":"既然來了，就多坐一會兒吧。","chinese_trad_cloze":"___來了，就多坐一會兒吧。","chinese_trad_answer":"既然","spanish_full":"Ya que viniste, quédate un rato más.","spanish_cloze":"___ que viniste, quédate un rato más.","spanish_answer":"Ya","pinyin":"Jìrán lái le, jiù duō zuò yíhuìr ba."},{"id":"hsk5_09","level":5,"module":"HSK5","chinese_simp_full":"通过这次活动，我们成了朋友。","chinese_simp_cloze":"___这次活动，我们成了朋友。","chinese_simp_answer":"通过","chinese_trad_full":"通過這次活動，我們成了朋友。","chinese_trad_cloze":"___這次活動，我們成了朋友。","chinese_trad_answer":"通過","spanish_full":"Mediante esta actividad, nos hicimos amigos.","spanish_cloze":"___ esta actividad, nos hicimos amigos.","spanish_answer":"Mediante","pinyin":"Tōngguò zhè cì huódòng, wǒmen chéng le péngyou."},{"id":"hsk5_10","level":5,"module":"HSK5","chinese_simp_full":"对于这个决定，大家有不同的看法。","chinese_simp_cloze":"___这个决定，大家有不同的看法。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個決定，大家有不同的看法。","chinese_trad_cloze":"___這個決定，大家有不同的看法。","chinese_trad_answer":"對於","spanish_full":"Con respecto a esta decisión, todos tienen opiniones distintas.","spanish_cloze":"___ a esta decisión, todos tienen opiniones distintas.","spanish_answer":"Con respecto","pinyin":"Duìyú zhège juédìng, dàjiā yǒu bùtóng de kànfǎ."},{"id":"hsk5_11","level":5,"module":"HSK5","chinese_simp_full":"表面上他很冷静，其实很紧张。","chinese_simp_cloze":"___上他很冷静，其实很紧张。","chinese_simp_answer":"表面","chinese_trad_full":"表面上他很冷靜，其實很緊張。","chinese_trad_cloze":"___上他很冷靜，其實很緊張。","chinese_trad_answer":"表面","spanish_full":"Aparentemente está tranquilo, pero en realidad está nervioso.","spanish_cloze":"___ está tranquilo, pero en realidad está nervioso.","spanish_answer":"Aparentemente","pinyin":"Biǎomiàn shàng tā hěn lěngjìng, qíshí hěn jǐnzhāng."},{"id":"hsk5_12","level":5,"module":"HSK5","chinese_simp_full":"只要坚持锻炼，身体就会更好。","chinese_simp_cloze":"___坚持锻炼，身体就会更好。","chinese_simp_answer":"只要","chinese_trad_full":"只要堅持鍛鍊，身體就會更好。","chinese_trad_cloze":"___堅持鍛鍊，身體就會更好。","chinese_trad_answer":"只要","spanish_full":"Siempre que hagas ejercicio con constancia, tu salud mejorará.","spanish_cloze":"___ hagas ejercicio con constancia, tu salud mejorará.","spanish_answer":"Siempre que","pinyin":"Zhǐyào jiānchí duànliàn, shēntǐ jiù huì gèng hǎo."},{"id":"hsk5_13","level":5,"module":"HSK5","chinese_simp_full":"幸福是奋斗出来的。","chinese_simp_cloze":"幸福是___出来的。","chinese_simp_answer":"奋斗","chinese_trad_full":"幸福是奮鬥出來的。","chinese_trad_cloze":"幸福是___出來的。","chinese_trad_answer":"奮鬥","spanish_full":"La felicidad se consigue luchando.","spanish_cloze":"La felicidad se consigue ___.","spanish_answer":"luchando","pinyin":"Xìngfú shì fèndòu chūlái de."},{"id":"hsk5_14","level":5,"module":"HSK5","chinese_simp_full":"考虑到天气，我们改天再去。","chinese_simp_cloze":"___天气，我们改天再去。","chinese_simp_answer":"考虑到","chinese_trad_full":"考慮到天氣，我們改天再去。","chinese_trad_cloze":"___天氣，我們改天再去。","chinese_trad_answer":"考慮到","spanish_full":"Teniendo en cuenta el clima, iremos otro día.","spanish_cloze":"___ en cuenta el clima, iremos otro día.","spanish_answer":"Teniendo","pinyin":"Kǎolǜdào tiānqì, wǒmen gǎitiān zài qù."},{"id":"hsk5_15","level":5,"module":"HSK5","chinese_simp_full":"网上办公已经成为常态。","chinese_simp_cloze":"网上办公已经成为___。","chinese_simp_answer":"常态","chinese_trad_full":"網上辦公已經成為常態。","chinese_trad_cloze":"網上辦公已經成為___。","chinese_trad_answer":"常態","spanish_full":"Trabajar en línea ya se volvió la norma.","spanish_cloze":"Trabajar en línea ya se volvió la ___.","spanish_answer":"norma","pinyin":"Wǎngshàng bàngōng yǐjīng chéngwéi chángtài."},{"id":"hsk5_16","level":5,"module":"HSK5","chinese_simp_full":"只有辛勤耕耘，才有好的收成。","chinese_simp_cloze":"只有辛勤___，才有好的收成。","chinese_simp_answer":"耕耘","chinese_trad_full":"只有辛勤耕耘，才有好的收成。","chinese_trad_cloze":"只有辛勤___，才有好的收成。","chinese_trad_answer":"耕耘","spanish_full":"Solo con un trabajo dedicado se obtiene una buena cosecha.","spanish_cloze":"Solo con un ___ dedicado se obtiene una buena cosecha.","spanish_answer":"trabajo","pinyin":"Zhǐyǒu xīnqín gēngyún, cái yǒu hǎo de shōuchéng."},{"id":"hsk5_17","level":5,"module":"HSK5","chinese_simp_full":"不管多贵，他都要买。","chinese_simp_cloze":"___多贵，他都要买。","chinese_simp_answer":"不管","chinese_trad_full":"不管多貴，他都要買。","chinese_trad_cloze":"___多貴，他都要買。","chinese_trad_answer":"不管","spanish_full":"Sin importar cuánto cueste, él lo va a comprar.","spanish_cloze":"___ cuánto cueste, él lo va a comprar.","spanish_answer":"Sin importar","pinyin":"Bùguǎn duō guì, tā dōu yào mǎi."},{"id":"hsk5_18","level":5,"module":"HSK5","chinese_simp_full":"多读书能提高写作水平。","chinese_simp_cloze":"多读书能___写作水平。","chinese_simp_answer":"提高","chinese_trad_full":"多讀書能提高寫作水平。","chinese_trad_cloze":"多讀書能___寫作水平。","chinese_trad_answer":"提高","spanish_full":"Leer mucho ayuda a mejorar el nivel de escritura.","spanish_cloze":"Leer mucho ayuda a ___ el nivel de escritura.","spanish_answer":"mejorar","pinyin":"Duō dúshū néng tígāo xiězuò shuǐpíng."},{"id":"hsk5_19","level":5,"module":"HSK5","chinese_simp_full":"即使失败了，也不要放弃。","chinese_simp_cloze":"___失败了，也不要放弃。","chinese_simp_answer":"即使","chinese_trad_full":"即使失敗了，也不要放棄。","chinese_trad_cloze":"___失敗了，也不要放棄。","chinese_trad_answer":"即使","spanish_full":"Incluso si fracasas, no te rindas.","spanish_cloze":"___ si fracasas, no te rindas.","spanish_answer":"Incluso","pinyin":"Jíshǐ shībài le, yě bù yào fàngqì."},{"id":"hsk5_20","level":5,"module":"HSK5","chinese_simp_full":"我们通过聊天练习中文。","chinese_simp_cloze":"我们___聊天练习中文。","chinese_simp_answer":"通过","chinese_trad_full":"我們通過聊天練習中文。","chinese_trad_cloze":"我們___聊天練習中文。","chinese_trad_answer":"通過","spanish_full":"Practicamos chino mediante la conversación.","spanish_cloze":"Practicamos chino ___ la conversación.","spanish_answer":"Mediante","pinyin":"Wǒmen tōngguò liáotiān liànxí zhōngwén."},{"id":"hsk5_21","level":5,"module":"HSK5","chinese_simp_full":"鉴于他的进步，老师表扬了他。","chinese_simp_cloze":"___他的进步，老师表扬了他。","chinese_simp_answer":"鉴于","chinese_trad_full":"鑑於他的進步，老師表揚了他。","chinese_trad_cloze":"___他的進步，老師表揚了他。","chinese_trad_answer":"鑑於","spanish_full":"Dada su mejora, el profesor lo elogió.","spanish_cloze":"___ su mejora, el profesor lo elogió.","spanish_answer":"Dada","pinyin":"Jiànyú tā de jìnbù, lǎoshī biǎoyáng le tā."},{"id":"hsk5_22","level":5,"module":"HSK5","chinese_simp_full":"健康关乎每个人的幸福。","chinese_simp_cloze":"健康___每个人的幸福。","chinese_simp_answer":"关乎","chinese_trad_full":"健康關乎每個人的幸福。","chinese_trad_cloze":"健康___每個人的幸福。","chinese_trad_answer":"關乎","spanish_full":"La salud concierne a la felicidad de cada persona.","spanish_cloze":"La salud ___ a la felicidad de cada persona.","spanish_answer":"concierne","pinyin":"Jiànkāng guānhū měi gè rén de xìngfú."},{"id":"hsk5_23","level":5,"module":"HSK5","chinese_simp_full":"与其后悔，不如现在努力。","chinese_simp_cloze":"___后悔，不如现在努力。","chinese_simp_answer":"与其","chinese_trad_full":"與其後悔，不如現在努力。","chinese_trad_cloze":"___後悔，不如現在努力。","chinese_trad_answer":"與其","spanish_full":"En lugar de arrepentirte, mejor esfuérzate ahora.","spanish_cloze":"___ de arrepentirte, mejor esfuérzate ahora.","spanish_answer":"En lugar","pinyin":"Yǔqí hòuhuǐ, bùrú xiànzài nǔlì."},{"id":"hsk5_24","level":5,"module":"HSK5","chinese_simp_full":"由于堵车，他迟到了。","chinese_simp_cloze":"___堵车，他迟到了。","chinese_simp_answer":"由于","chinese_trad_full":"由於堵車，他遲到了。","chinese_trad_cloze":"___堵車，他遲到了。","chinese_trad_answer":"由於","spanish_full":"Debido al embotellamiento, llegó tarde.","spanish_cloze":"___ al embotellamiento, llegó tarde.","spanish_answer":"Debido","pinyin":"Yóuyú dǔchē, tā chídào le."},{"id":"hsk5_25","level":5,"module":"HSK5","chinese_simp_full":"不管别人怎么说，坚持你的梦想。","chinese_simp_cloze":"___别人怎么说，坚持你的梦想。","chinese_simp_answer":"不管","chinese_trad_full":"不管別人怎麼說，堅持你的夢想。","chinese_trad_cloze":"___別人怎麼說，堅持你的夢想。","chinese_trad_answer":"不管","spanish_full":"Sin importar lo que digan los demás, sigue tu sueño.","spanish_cloze":"___ lo que digan los demás, sigue tu sueño.","spanish_answer":"Sin importar","pinyin":"Bùguǎn biérén zěnme shuō, jiānchí nǐ de mèngxiǎng."},{"id":"hsk5_26","level":5,"module":"HSK5","chinese_simp_full":"交流能促进相互理解。","chinese_simp_cloze":"交流能___相互理解。","chinese_simp_answer":"促进","chinese_trad_full":"交流能促進相互理解。","chinese_trad_cloze":"交流能___相互理解。","chinese_trad_answer":"促進","spanish_full":"El intercambio promueve la comprensión mutua.","spanish_cloze":"El intercambio ___ la comprensión mutua.","spanish_answer":"promueve","pinyin":"Jiāoliú néng cùjìn xiānghù lǐjiě."},{"id":"hsk5_27","level":5,"module":"HSK5","chinese_simp_full":"既然答应了，就要做到。","chinese_simp_cloze":"___答应了，就要做到。","chinese_simp_answer":"既然","chinese_trad_full":"既然答應了，就要做到。","chinese_trad_cloze":"___答應了，就要做到。","chinese_trad_answer":"既然","spanish_full":"Ya que lo prometiste, tienes que cumplirlo.","spanish_cloze":"___ que lo prometiste, tienes que cumplirlo.","spanish_answer":"Ya","pinyin":"Jìrán dāyìng le, jiù yào zuòdào."},{"id":"hsk5_28","level":5,"module":"HSK5","chinese_simp_full":"随着科技发展，手机越来越重要。","chinese_simp_cloze":"___科技发展，手机越来越重要。","chinese_simp_answer":"随着","chinese_trad_full":"隨著科技發展，手機越來越重要。","chinese_trad_cloze":"___科技發展，手機越來越重要。","chinese_trad_answer":"隨著","spanish_full":"Con el desarrollo de la tecnología, el celular es cada vez más importante.","spanish_cloze":"___ el desarrollo de la tecnología, el celular es cada vez más importante.","spanish_answer":"Con","pinyin":"Suízhe kējì fāzhǎn, shǒujī yuèláiyuè zhòngyào."},{"id":"hsk5_29","level":5,"module":"HSK5","chinese_simp_full":"他做学问一直很严谨。","chinese_simp_cloze":"他做学问一直很___。","chinese_simp_answer":"严谨","chinese_trad_full":"他做學問一直很嚴謹。","chinese_trad_cloze":"他做學問一直很___。","chinese_trad_answer":"嚴謹","spanish_full":"Él siempre es muy riguroso en su trabajo académico.","spanish_cloze":"Él siempre es muy ___ en su trabajo académico.","spanish_answer":"riguroso","pinyin":"Tā zuò xuéwen yìzhí hěn yánjǐn."},{"id":"hsk5_30","level":5,"module":"HSK5","chinese_simp_full":"对于未来，他充满信心。","chinese_simp_cloze":"___未来，他充满信心。","chinese_simp_answer":"对于","chinese_trad_full":"對於未來，他充滿信心。","chinese_trad_cloze":"___未來，他充滿信心。","chinese_trad_answer":"對於","spanish_full":"Con respecto al futuro, él está lleno de confianza.","spanish_cloze":"___ al futuro, él está lleno de confianza.","spanish_answer":"Con respecto","pinyin":"Duìyú wèilái, tā chōngmǎn xìnxīn."},{"id":"hsk5_31","level":5,"module":"HSK5","chinese_simp_full":"只有努力，才能成功。","chinese_simp_cloze":"___努力，才能成功。","chinese_simp_answer":"只有","chinese_trad_full":"只有努力，才能成功。","chinese_trad_cloze":"___努力，才能成功。","chinese_trad_answer":"只有","spanish_full":"Solo con esfuerzo se puede triunfar.","spanish_cloze":"___ con esfuerzo se puede triunfar.","spanish_answer":"Solo","pinyin":"Zhǐyǒu nǔlì, cái néng chénggōng."},{"id":"hsk5_32","level":5,"module":"HSK5","chinese_simp_full":"尽管很累，他还是完成了工作。","chinese_simp_cloze":"___很累，他还是完成了工作。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管很累，他還是完成了工作。","chinese_trad_cloze":"___很累，他還是完成了工作。","chinese_trad_answer":"儘管","spanish_full":"Aunque estaba cansado, terminó el trabajo.","spanish_cloze":"___ estaba cansado, terminó el trabajo.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn hěn lèi, tā háishì wánchéng le gōngzuò."},{"id":"hsk5_33","level":5,"module":"HSK5","chinese_simp_full":"由于准备充分，考试很顺利。","chinese_simp_cloze":"___准备充分，考试很顺利。","chinese_simp_answer":"由于","chinese_trad_full":"由於準備充分，考試很順利。","chinese_trad_cloze":"___準備充分，考試很順利。","chinese_trad_answer":"由於","spanish_full":"Debido a la buena preparación, el examen salió muy bien.","spanish_cloze":"___ a la buena preparación, el examen salió muy bien.","spanish_answer":"Debido","pinyin":"Yóuyú zhǔnbèi chōngfèn, kǎoshì hěn shùnlì."},{"id":"hsk5_34","level":5,"module":"HSK5","chinese_simp_full":"不管遇到什么困难，都别慌。","chinese_simp_cloze":"___遇到什么困难，都别慌。","chinese_simp_answer":"不管","chinese_trad_full":"不管遇到什麼困難，都別慌。","chinese_trad_cloze":"___遇到什麼困難，都別慌。","chinese_trad_answer":"不管","spanish_full":"Sin importar qué dificultades encuentres, no entres en pánico.","spanish_cloze":"___ qué dificultades encuentres, no entres en pánico.","spanish_answer":"Sin importar","pinyin":"Bùguǎn yùdào shénme kùnnán, dōu bié huāng."},{"id":"hsk5_35","level":5,"module":"HSK5","chinese_simp_full":"通过反复练习，他的发音进步很大。","chinese_simp_cloze":"___反复练习，他的发音进步很大。","chinese_simp_answer":"通过","chinese_trad_full":"通過反覆練習，他的發音進步很大。","chinese_trad_cloze":"___反覆練習，他的發音進步很大。","chinese_trad_answer":"通過","spanish_full":"A través de la práctica constante, su pronunciación mejoró mucho.","spanish_cloze":"___ de la práctica constante, su pronunciación mejoró mucho.","spanish_answer":"A través","pinyin":"Tōngguò fǎnfù liànxí, tā de fāyīn jìnbù hěn dà."},{"id":"hsk5_36","level":5,"module":"HSK5","chinese_simp_full":"既然选择了，就别后悔。","chinese_simp_cloze":"___选择了，就别后悔。","chinese_simp_answer":"既然","chinese_trad_full":"既然選擇了，就別後悔。","chinese_trad_cloze":"___選擇了，就別後悔。","chinese_trad_answer":"既然","spanish_full":"Ya que lo elegiste, no te arrepientas.","spanish_cloze":"___ que lo elegiste, no te arrepientas.","spanish_answer":"Ya","pinyin":"Jìrán xuǎnzé le, jiù bié hòuhuǐ."},{"id":"hsk5_37","level":5,"module":"HSK5","chinese_simp_full":"随着季节变化，天气越来越热。","chinese_simp_cloze":"___季节变化，天气越来越热。","chinese_simp_answer":"随着","chinese_trad_full":"隨著季節變化，天氣越來越熱。","chinese_trad_cloze":"___季節變化，天氣越來越熱。","chinese_trad_answer":"隨著","spanish_full":"Con el cambio de estaciones, hace cada vez más calor.","spanish_cloze":"___ el cambio de estaciones, hace cada vez más calor.","spanish_answer":"Con","pinyin":"Suízhe jìjié biànhuà, tiānqì yuèláiyuè rè."},{"id":"hsk5_38","level":5,"module":"HSK5","chinese_simp_full":"法官的判决很公正。","chinese_simp_cloze":"法官的判决很___。","chinese_simp_answer":"公正","chinese_trad_full":"法官的判決很公正。","chinese_trad_cloze":"法官的判決很___。","chinese_trad_answer":"公正","spanish_full":"El fallo del juez fue muy justo.","spanish_cloze":"El fallo del juez fue muy ___.","spanish_answer":"justo","pinyin":"Fǎguān de pànjué hěn gōngzhèng."},{"id":"hsk5_39","level":5,"module":"HSK5","chinese_simp_full":"对于自己的错误，要勇于承认。","chinese_simp_cloze":"___自己的错误，要勇于承认。","chinese_simp_answer":"对于","chinese_trad_full":"對於自己的錯誤，要勇於承認。","chinese_trad_cloze":"___自己的錯誤，要勇於承認。","chinese_trad_answer":"對於","spanish_full":"Con respecto a los propios errores, hay que atreverse a reconocerlos.","spanish_cloze":"___ a los propios errores, hay que atreverse a reconocerlos.","spanish_answer":"Con respecto","pinyin":"Duìyú zìjǐ de cuòwù, yào yǒngyú chéngrèn."},{"id":"hsk5_40","level":5,"module":"HSK5","chinese_simp_full":"只要有信心，就没有难事。","chinese_simp_cloze":"___有信心，就没有难事。","chinese_simp_answer":"只要","chinese_trad_full":"只要有信心，就沒有難事。","chinese_trad_cloze":"___有信心，就沒有難事。","chinese_trad_answer":"只要","spanish_full":"Siempre que tengas confianza, nada será difícil.","spanish_cloze":"___ tengas confianza, nada será difícil.","spanish_answer":"Siempre que","pinyin":"Zhǐyào yǒu xìnxīn, jiù méiyǒu nánshì."},{"id":"hsk5_41","level":5,"module":"HSK5","chinese_simp_full":"他的新书批判了社会上的不良风气。","chinese_simp_cloze":"他的新书___了社会上的不良风气。","chinese_simp_answer":"批判","chinese_trad_full":"他的新書批判了社會上的不良風氣。","chinese_trad_cloze":"他的新書___了社會上的不良風氣。","chinese_trad_answer":"批判","spanish_full":"Su nuevo libro critica las malas costumbres de la sociedad.","spanish_cloze":"Su nuevo libro ___ las malas costumbres de la sociedad.","spanish_answer":"critica","pinyin":"Tā de xīn shū pīpàn le shèhuì shàng de bùliáng fēngqì."},{"id":"hsk5_42","level":5,"module":"HSK5","chinese_simp_full":"尽管下着大雪，火车还是准点到了。","chinese_simp_cloze":"___下着大雪，火车还是准点到了。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管下著大雪，火車還是準點到了。","chinese_trad_cloze":"___下著大雪，火車還是準點到了。","chinese_trad_answer":"儘管","spanish_full":"Aunque nevaba con fuerza, el tren llegó puntual.","spanish_cloze":"___ nevaba con fuerza, el tren llegó puntual.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn xià zhe dàxuě, huǒchē háishì zhǔndiǎn dào le."},{"id":"hsk5_43","level":5,"module":"HSK5","chinese_simp_full":"由于技术故障，网站暂时无法访问。","chinese_simp_cloze":"___技术故障，网站暂时无法访问。","chinese_simp_answer":"由于","chinese_trad_full":"由於技術故障，網站暫時無法訪問。","chinese_trad_cloze":"___技術故障，網站暫時無法訪問。","chinese_trad_answer":"由於","spanish_full":"Debido a una falla técnica, la página no está disponible por ahora.","spanish_cloze":"___ a una falla técnica, la página no está disponible por ahora.","spanish_answer":"Debido","pinyin":"Yóuyú jìshù gùzhàng, wǎngzhàn zànshí wúfǎ fǎngwèn."},{"id":"hsk5_44","level":5,"module":"HSK5","chinese_simp_full":"不管多难，妈妈从不抱怨。","chinese_simp_cloze":"___多难，妈妈从不抱怨。","chinese_simp_answer":"不管","chinese_trad_full":"不管多難，媽媽從不抱怨。","chinese_trad_cloze":"___多難，媽媽從不抱怨。","chinese_trad_answer":"不管","spanish_full":"Sin importar qué tan difícil fuera, mamá nunca se quejaba.","spanish_cloze":"___ qué tan difícil fuera, mamá nunca se quejaba.","spanish_answer":"Sin importar","pinyin":"Bùguǎn duō nán, māma cónglái bù bàoyuàn."},{"id":"hsk5_45","level":5,"module":"HSK5","chinese_simp_full":"通过合作，两家公司都赚了钱。","chinese_simp_cloze":"___合作，两家公司都赚了钱。","chinese_simp_answer":"通过","chinese_trad_full":"通過合作，兩家公司都賺了錢。","chinese_trad_cloze":"___合作，兩家公司都賺了錢。","chinese_trad_answer":"通過","spanish_full":"Mediante la cooperación, ambas empresas ganaron dinero.","spanish_cloze":"___ la cooperación, ambas empresas ganaron dinero.","spanish_answer":"Mediante","pinyin":"Tōngguò hézuò, liǎng jiā gōngsī dōu zhuàn le qián."},{"id":"hsk5_46","level":5,"module":"HSK5","chinese_simp_full":"鉴于天气恶劣，学校停课了。","chinese_simp_cloze":"___天气恶劣，学校停课了。","chinese_simp_answer":"鉴于","chinese_trad_full":"鑑於天氣惡劣，學校停課了。","chinese_trad_cloze":"___天氣惡劣，學校停課了。","chinese_trad_answer":"鑑於","spanish_full":"Dado el mal tiempo, la escuela suspendió las clases.","spanish_cloze":"___ el mal tiempo, la escuela suspendió las clases.","spanish_answer":"Dado","pinyin":"Jiànyú tiānqì èliè, xuéxiào tíngkè le."},{"id":"hsk5_47","level":5,"module":"HSK5","chinese_simp_full":"良好的人际关系非常重要。","chinese_simp_cloze":"良好的人际___非常重要。","chinese_simp_answer":"关系","chinese_trad_full":"良好的人際關係非常重要。","chinese_trad_cloze":"良好的人際___非常重要。","chinese_trad_answer":"關係","spanish_full":"Las buenas relaciones interpersonales son muy importantes.","spanish_cloze":"Las buenas ___ interpersonales son muy importantes.","spanish_answer":"relaciones","pinyin":"Liánghǎo de rénjì guānxì fēicháng zhòngyào."},{"id":"hsk5_48","level":5,"module":"HSK5","chinese_simp_full":"与其躺着玩手机，不如出去走走。","chinese_simp_cloze":"___躺着玩手机，不如出去走走。","chinese_simp_answer":"与其","chinese_trad_full":"與其躺著玩手機，不如出去走走。","chinese_trad_cloze":"___躺著玩手機，不如出去走走。","chinese_trad_answer":"與其","spanish_full":"En lugar de estar acostado con el celular, mejor sal a caminar.","spanish_cloze":"___ de estar acostado con el celular, mejor sal a caminar.","spanish_answer":"En lugar","pinyin":"Yǔqí tǎng zhe wán shǒujī, bùrú chūqù zǒuzou."},{"id":"hsk5_49","level":5,"module":"HSK5","chinese_simp_full":"由于设备老化，机器经常出故障。","chinese_simp_cloze":"___设备老化，机器经常出故障。","chinese_simp_answer":"由于","chinese_trad_full":"由於設備老化，機器經常出故障。","chinese_trad_cloze":"___設備老化，機器經常出故障。","chinese_trad_answer":"由於","spanish_full":"Debido al desgaste del equipo, la máquina falla con frecuencia.","spanish_cloze":"___ al desgaste del equipo, la máquina falla con frecuencia.","spanish_answer":"Debido","pinyin":"Yóuyú shèbèi lǎohuà, jīqì jīngcháng chū gùzhàng."},{"id":"hsk5_50","level":5,"module":"HSK5","chinese_simp_full":"不管结果怎样，我们都尽力了。","chinese_simp_cloze":"___结果怎样，我们都尽力了。","chinese_simp_answer":"不管","chinese_trad_full":"不管結果怎樣，我們都盡力了。","chinese_trad_cloze":"___結果怎樣，我們都盡力了。","chinese_trad_answer":"不管","spanish_full":"Sin importar el resultado, lo intentamos con todo.","spanish_cloze":"___ el resultado, lo intentamos con todo.","spanish_answer":"Sin importar","pinyin":"Bùguǎn jiéguǒ zěnyàng, wǒmen dōu jìnlì le."},{"id":"hsk5_51","level":5,"module":"HSK5","chinese_simp_full":"他勇敢地面对困难。","chinese_simp_cloze":"他勇敢地___困难。","chinese_simp_answer":"面对","chinese_trad_full":"他勇敢地面對困難。","chinese_trad_cloze":"他勇敢地___困難。","chinese_trad_answer":"面對","spanish_full":"Él enfrentó las dificultades con valentía.","spanish_cloze":"Él ___ las dificultades con valentía.","spanish_answer":"enfrentó","pinyin":"Tā yǒnggǎn de miànduì kùnnán."},{"id":"hsk5_52","level":5,"module":"HSK5","chinese_simp_full":"哪怕下雨，我们也要去。","chinese_simp_cloze":"___下雨，我们也要去。","chinese_simp_answer":"哪怕","chinese_trad_full":"哪怕下雨，我們也要去。","chinese_trad_cloze":"___下雨，我們也要去。","chinese_trad_answer":"哪怕","spanish_full":"Incluso si llueve, vamos a ir igual.","spanish_cloze":"___ si llueve, vamos a ir igual.","spanish_answer":"Incluso","pinyin":"Nǎpà xiàyǔ, wǒmen yě yào qù."},{"id":"hsk5_53","level":5,"module":"HSK5","chinese_simp_full":"他缺乏经验，需要多学习。","chinese_simp_cloze":"他___经验，需要多学习。","chinese_simp_answer":"缺乏","chinese_trad_full":"他缺乏經驗，需要多學習。","chinese_trad_cloze":"他___經驗，需要多學習。","chinese_trad_answer":"缺乏","spanish_full":"Le falta experiencia y necesita aprender más.","spanish_cloze":"Le ___ experiencia y necesita aprender más.","spanish_answer":"falta","pinyin":"Tā quēfá jīngyàn, xūyào duō xuéxí."},{"id":"hsk5_54","level":5,"module":"HSK5","chinese_simp_full":"与其羡慕别人，不如做好自己。","chinese_simp_cloze":"___羡慕别人，不如做好自己。","chinese_simp_answer":"与其","chinese_trad_full":"與其羨慕別人，不如做好自己。","chinese_trad_cloze":"___羨慕別人，不如做好自己。","chinese_trad_answer":"與其","spanish_full":"En lugar de envidiar a otros, mejor esfuérzate en ser tú mismo.","spanish_cloze":"___ de envidiar a otros, mejor esfuérzate en ser tú mismo.","spanish_answer":"En lugar","pinyin":"Yǔqí xiànmù biérén, bùrú zuò hǎo zìjǐ."},{"id":"hsk5_55","level":5,"module":"HSK5","chinese_simp_full":"尽管任务很难，大家没有放弃。","chinese_simp_cloze":"___任务很难，大家没有放弃。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管任務很難，大家沒有放棄。","chinese_trad_cloze":"___任務很難，大家沒有放棄。","chinese_trad_answer":"儘管","spanish_full":"Aunque la tarea era muy difícil, nadie se rindió.","spanish_cloze":"___ la tarea era muy difícil, nadie se rindió.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn rènwu hěn nán, dàjiā méiyǒu fàngqì."},{"id":"hsk5_56","level":5,"module":"HSK5","chinese_simp_full":"随着天气变冷，树叶都黄了。","chinese_simp_cloze":"___天气变冷，树叶都黄了。","chinese_simp_answer":"随着","chinese_trad_full":"隨著天氣變冷，樹葉都黃了。","chinese_trad_cloze":"___天氣變冷，樹葉都黃了。","chinese_trad_answer":"隨著","spanish_full":"Con la llegada del frío, las hojas se pusieron amarillas.","spanish_cloze":"___ la llegada del frío, las hojas se pusieron amarillas.","spanish_answer":"Con","pinyin":"Suízhe tiānqì biàn lěng, shùyè dōu huáng le."},{"id":"hsk5_90","level":5,"module":"HSK5","chinese_simp_full":"尽管父母反对，他还是搬去了上海。","chinese_simp_cloze":"___父母反对，他还是搬去了上海。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管父母反對，他還是搬去了上海。","chinese_trad_cloze":"___父母反對，他還是搬去了上海。","chinese_trad_answer":"儘管","spanish_full":"Aunque sus padres se oponían, igual se mudó a Shanghái.","spanish_cloze":"___ sus padres se oponían, igual se mudó a Shanghái.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn fùmǔ fǎnduì, tā háishì bān qù le Shànghǎi."}],
'HSK6': [{"id":"hsk6_01","level":6,"module":"HSK6","chinese_simp_full":"他挨了批评，心里很难受。","chinese_simp_cloze":"他___了批评，心里很难受。","chinese_simp_answer":"挨","chinese_trad_full":"他捱了批評，心裡很難受。","chinese_trad_cloze":"他___了批評，心裡很難受。","chinese_trad_answer":"挨","spanish_full":"Sufrió una crítica y se sintió muy mal.","spanish_cloze":"___ una crítica y se sintió muy mal.","spanish_answer":"Sufrió","pinyin":"Tā ái le pīpíng, xīnlǐ hěn nánshòu."},{"id":"hsk6_02","level":6,"module":"HSK6","chinese_simp_full":"医学研究正在寻找治疗癌症的新方法。","chinese_simp_cloze":"医学研究正在寻找治疗___的新方法。","chinese_simp_answer":"癌症","chinese_trad_full":"醫學研究正在尋找治療癌症的新方法。","chinese_trad_cloze":"醫學研究正在尋找治療___的新方法。","chinese_trad_answer":"癌症","spanish_full":"La investigación médica está buscando nuevos métodos para tratar el cáncer.","spanish_cloze":"La investigación médica está buscando nuevos métodos para tratar el ___.","spanish_answer":"cáncer","pinyin":"Yīxué yánjiū zhèngzài xúnzhǎo zhìliáo áizhèng de xīn fāngfǎ."},{"id":"hsk6_03","level":6,"module":"HSK6","chinese_simp_full":"他们两个的关系很暧昧，谁也说不清。","chinese_simp_cloze":"他们两个的关系很___，谁也说不清。","chinese_simp_answer":"暧昧","chinese_trad_full":"他們兩個的關係很曖昧，誰也說不清。","chinese_trad_cloze":"他們兩個的關係很___，誰也說不清。","chinese_trad_answer":"曖昧","spanish_full":"La relación entre los dos es muy ambigua, nadie la sabe explicar bien.","spanish_cloze":"La relación entre los dos es muy ___, nadie la sabe explicar bien.","spanish_answer":"ambigua","pinyin":"Tāmen liǎng gè de guānxi hěn àimèi, shéi yě shuōbuqīng."},{"id":"hsk6_04","level":6,"module":"HSK6","chinese_simp_full":"这本小说太精彩了，我爱不释手。","chinese_simp_cloze":"这本小说太精彩了，我___。","chinese_simp_answer":"爱不释手","chinese_trad_full":"這本小說太精彩了，我愛不釋手。","chinese_trad_cloze":"這本小說太精彩了，我___。","chinese_trad_answer":"愛不釋手","spanish_full":"Esta novela es tan fascinante que no puedo soltarla.","spanish_cloze":"Esta novela es tan fascinante que ___.","spanish_answer":"no puedo soltarla","pinyin":"Zhè běn xiǎoshuō tài jīngcǎi le, wǒ àibúshìshǒu.","spanish_alternatives":["no puedo dejarla"]},{"id":"hsk6_05","level":6,"module":"HSK6","chinese_simp_full":"这位老教授深受学生的爱戴。","chinese_simp_cloze":"这位老教授深受学生的___。","chinese_simp_answer":"爱戴","chinese_trad_full":"這位老教授深受學生的愛戴。","chinese_trad_cloze":"這位老教授深受學生的___。","chinese_trad_answer":"愛戴","spanish_full":"Este viejo profesor es muy querido y respetado por sus estudiantes.","spanish_cloze":"Este viejo profesor es muy ___ por sus estudiantes.","spanish_answer":"querido y respetado","pinyin":"Zhè wèi lǎo jiàoshòu shēn shòu xuéshēng de àidài.","spanish_alternatives":["amado y respetado"]},{"id":"hsk6_06","level":6,"module":"HSK6","chinese_simp_full":"老人退休后在农村过着安宁的生活。","chinese_simp_cloze":"老人退休后在农村过着___的生活。","chinese_simp_answer":"安宁","chinese_trad_full":"老人退休後在農村過著安寧的生活。","chinese_trad_cloze":"老人退休後在農村過著___的生活。","chinese_trad_answer":"安寧","spanish_full":"Después de jubilarse, el anciano lleva una vida tranquila en el campo.","spanish_cloze":"Después de jubilarse, el anciano lleva una vida ___ en el campo.","spanish_answer":"tranquila","pinyin":"Lǎorén tuìxiū hòu zài nóngcūn guòzhe ānníng de shēnghuó.","spanish_alternatives":["pacífica"]},{"id":"hsk6_07","level":6,"module":"HSK6","chinese_simp_full":"爷爷睡着了，脸上带着安详的表情。","chinese_simp_cloze":"爷爷睡着了，脸上带着___的表情。","chinese_simp_answer":"安详","chinese_trad_full":"爺爺睡著了，臉上帶著安詳的表情。","chinese_trad_cloze":"爺爺睡著了，臉上帶著___的表情。","chinese_trad_answer":"安詳","spanish_full":"El abuelo está dormido, con una expresión serena en el rostro.","spanish_cloze":"El abuelo está dormido, con una expresión ___ en el rostro.","spanish_answer":"serena","pinyin":"Yéye shuìzháo le, liǎn shàng dàizhe ānxiáng de biǎoqíng."},{"id":"hsk6_08","level":6,"module":"HSK6","chinese_simp_full":"政府为灾民安置了临时住处。","chinese_simp_cloze":"政府为灾民___了临时住处。","chinese_simp_answer":"安置","chinese_trad_full":"政府為災民安置了臨時住處。","chinese_trad_cloze":"政府為災民___了臨時住處。","chinese_trad_answer":"安置","spanish_full":"El gobierno alojó a los damnificados en viviendas provisorias.","spanish_cloze":"El gobierno ___ a los damnificados en viviendas provisorias.","spanish_answer":"alojó","pinyin":"Zhèngfǔ wèi zāimín ānzhì le línshí zhùchù.","spanish_alternatives":["instaló"]},{"id":"hsk6_09","level":6,"module":"HSK6","chinese_simp_full":"按摩可以缓解肌肉的疲劳。","chinese_simp_cloze":"___可以缓解肌肉的疲劳。","chinese_simp_answer":"按摩","chinese_trad_full":"按摩可以緩解肌肉的疲勞。","chinese_trad_cloze":"___可以緩解肌肉的疲勞。","chinese_trad_answer":"按摩","spanish_full":"El masaje puede aliviar la fatiga de los músculos.","spanish_cloze":"El ___ puede aliviar la fatiga de los músculos.","spanish_answer":"masaje","pinyin":"Ànmó kěyǐ huǎnjiě jīròu de píláo."},{"id":"hsk6_10","level":6,"module":"HSK6","chinese_simp_full":"他不停地向我暗示，希望我能明白他的意思。","chinese_simp_cloze":"他不停地向我___，希望我能明白他的意思。","chinese_simp_answer":"暗示","chinese_trad_full":"他不停地向我暗示，希望我能明白他的意思。","chinese_trad_cloze":"他不停地向我___，希望我能明白他的意思。","chinese_trad_answer":"暗示","spanish_full":"No dejaba de darme indirectas, esperando que yo entendiera lo que quería decir.","spanish_cloze":"No dejaba de darme ___, esperando que yo entendiera lo que quería decir.","spanish_answer":"indirectas","pinyin":"Tā bù tíng de xiàng wǒ ànshì, xīwàng wǒ néng míngbai tā de yìsi.","spanish_alternatives":["señales"]},{"id":"hsk6_11","level":6,"module":"HSK6","chinese_simp_full":"警察正在调查这起盗窃案件。","chinese_simp_cloze":"警察正在调查这起盗窃___。","chinese_simp_answer":"案件","chinese_trad_full":"警察正在調查這起盜竊案件。","chinese_trad_cloze":"警察正在調查這起盜竊___。","chinese_trad_answer":"案件","spanish_full":"La policía está investigando este caso de robo.","spanish_cloze":"La policía está investigando este ___ de robo.","spanish_answer":"caso","pinyin":"Jǐngchá zhèngzài diàochá zhè qǐ dàoqiè ànjiàn."},{"id":"hsk6_12","level":6,"module":"HSK6","chinese_simp_full":"老师用真实的案例来讲解法律知识。","chinese_simp_cloze":"老师用真实的___来讲解法律知识。","chinese_simp_answer":"案例","chinese_trad_full":"老師用真實的案例來講解法律知識。","chinese_trad_cloze":"老師用真實的___來講解法律知識。","chinese_trad_answer":"案例","spanish_full":"El profesor usa ejemplos reales para explicar los conocimientos jurídicos.","spanish_cloze":"El profesor usa ___ reales para explicar los conocimientos jurídicos.","spanish_answer":"ejemplos","pinyin":"Lǎoshī yòng zhēnshí de ànlì lái jiǎngjiě fǎlǜ zhīshi.","spanish_alternatives":["casos"]},{"id":"hsk6_13","level":6,"module":"HSK6","chinese_simp_full":"这家商店里的首饰都非常昂贵。","chinese_simp_cloze":"这家商店里的首饰都非常___。","chinese_simp_answer":"昂贵","chinese_trad_full":"這家商店裡的首飾都非常昂貴。","chinese_trad_cloze":"這家商店裡的首飾都非常___。","chinese_trad_answer":"昂貴","spanish_full":"Las joyas de esta tienda son todas muy costosas.","spanish_cloze":"Las joyas de esta tienda son todas muy ___.","spanish_answer":"costosas","pinyin":"Zhè jiā shāngdiàn lǐ de shǒushì dōu fēicháng ángguì.","spanish_alternatives":["caras"]},{"id":"hsk6_14","level":6,"module":"HSK6","chinese_simp_full":"这条小路凹凸不平，下雨天更难走。","chinese_simp_cloze":"这条小路___不平，下雨天更难走。","chinese_simp_answer":"凹凸","chinese_trad_full":"這條小路凹凸不平，下雨天更難走。","chinese_trad_cloze":"這條小路___不平，下雨天更難走。","chinese_trad_answer":"凹凸","spanish_full":"Este sendero es muy desigual y cuando llueve es aún más difícil de andar.","spanish_cloze":"Este sendero es muy ___ y cuando llueve es aún más difícil de andar.","spanish_answer":"desigual","pinyin":"Zhè tiáo xiǎolù āotū bùpíng, xiàyǔ tiān gèng nán zǒu.","spanish_alternatives":["irregular"]},{"id":"hsk6_15","level":6,"module":"HSK6","chinese_simp_full":"为了照顾生病的母亲，她熬了好几个通宵。","chinese_simp_cloze":"为了照顾生病的母亲，她___了好几个通宵。","chinese_simp_answer":"熬","chinese_trad_full":"為了照顧生病的母親，她熬了好幾個通宵。","chinese_trad_cloze":"為了照顧生病的母親，她___了好幾個通宵。","chinese_trad_answer":"熬","spanish_full":"Para cuidar a su madre enferma, trasnochó varias noches seguidas.","spanish_cloze":"Para cuidar a su madre enferma, ___ varias noches seguidas.","spanish_answer":"trasnochó","pinyin":"Wèile zhàogù shēngbìng de mǔqīn, tā áo le hǎo jǐ gè tōngxiāo.","spanish_alternatives":["se quedó despierta"]},{"id":"hsk6_16","level":6,"module":"HSK6","chinese_simp_full":"科学家们一直在探索宇宙的奥秘。","chinese_simp_cloze":"科学家们一直在探索宇宙的___。","chinese_simp_answer":"奥秘","chinese_trad_full":"科學家們一直在探索宇宙的奧秘。","chinese_trad_cloze":"科學家們一直在探索宇宙的___。","chinese_trad_answer":"奧秘","spanish_full":"Los científicos siempre están explorando los misterios del universo.","spanish_cloze":"Los científicos siempre están explorando los ___ del universo.","spanish_answer":"misterios","pinyin":"Kēxuéjiāmen yīzhí zài tànsuǒ yǔzhòu de àomì."},{"id":"hsk6_17","level":6,"module":"HSK6","chinese_simp_full":"我巴不得马上放假，去旅行放松一下。","chinese_simp_cloze":"我___马上放假，去旅行放松一下。","chinese_simp_answer":"巴不得","chinese_trad_full":"我巴不得馬上放假，去旅行放鬆一下。","chinese_trad_cloze":"我___馬上放假，去旅行放鬆一下。","chinese_trad_answer":"巴不得","spanish_full":"Estoy deseando que empiecen ya las vacaciones para viajar y descansar.","spanish_cloze":"___ que empiecen ya las vacaciones para viajar y descansar.","spanish_answer":"Estoy deseando","pinyin":"Wǒ bābude mǎshàng fàngjià, qù lǚxíng fàngsōng yīxià.","spanish_alternatives":["Muero por"]},{"id":"hsk6_18","level":6,"module":"HSK6","chinese_simp_full":"他为了升职，总想巴结上司。","chinese_simp_cloze":"他为了升职，总想___上司。","chinese_simp_answer":"巴结","chinese_trad_full":"他為了升職，總想巴結上司。","chinese_trad_cloze":"他為了升職，總想___上司。","chinese_trad_answer":"巴結","spanish_full":"Para ascender, siempre intenta adular a su jefe.","spanish_cloze":"Para ascender, siempre intenta ___ a su jefe.","spanish_answer":"adular","pinyin":"Tā wèile shēngzhí, zǒng xiǎng bājie shàngsi.","spanish_alternatives":["halagar"]},{"id":"hsk6_19","level":6,"module":"HSK6","chinese_simp_full":"小偷扒开了他的口袋，偷走了钱包。","chinese_simp_cloze":"小偷___开了他的口袋，偷走了钱包。","chinese_simp_answer":"扒","chinese_trad_full":"小偷扒開了他的口袋，偷走了錢包。","chinese_trad_cloze":"小偷___開了他的口袋，偷走了錢包。","chinese_trad_answer":"扒","spanish_full":"El ladrón abrió a la fuerza su bolsillo y se robó la cartera.","spanish_cloze":"El ladrón ___ su bolsillo y se robó la cartera.","spanish_answer":"abrió a la fuerza","pinyin":"Xiǎotōu bā kāi le tā de kǒudài, tōu zǒu le qiánbāo.","spanish_alternatives":["rasgó"]},{"id":"hsk6_20","level":6,"module":"HSK6","chinese_simp_full":"手术后，他的胳膊上留下了一道疤。","chinese_simp_cloze":"手术后，他的胳膊上留下了一道___。","chinese_simp_answer":"疤","chinese_trad_full":"手術後，他的胳膊上留下了一道疤。","chinese_trad_cloze":"手術後，他的胳膊上留下了一道___。","chinese_trad_answer":"疤","spanish_full":"Después de la operación, le quedó una cicatriz en el brazo.","spanish_cloze":"Después de la operación, le quedó una ___ en el brazo.","spanish_answer":"cicatriz","pinyin":"Shǒushù hòu, tā de gēbo shàng liú xià le yī dào bā."},{"id":"hsk6_21","level":6,"module":"HSK6","chinese_simp_full":"教育孩子要有耐心，拔苗助长只会适得其反。","chinese_simp_cloze":"教育孩子要有耐心，___只会适得其反。","chinese_simp_answer":"拔苗助长","chinese_trad_full":"教育孩子要有耐心，拔苗助長只會適得其反。","chinese_trad_cloze":"教育孩子要有耐心，___只會適得其反。","chinese_trad_answer":"拔苗助長","spanish_full":"Para educar a los hijos hace falta paciencia; apurar las cosas solo da el resultado contrario.","spanish_cloze":"Para educar a los hijos hace falta paciencia; ___ solo da el resultado contrario.","spanish_answer":"apurar las cosas","pinyin":"Jiàoyù háizi yào yǒu nàixīn, bámiáozhùzhǎng zhǐ huì shìdéqífǎn.","spanish_alternatives":["forzar el crecimiento"]},{"id":"hsk6_22","level":6,"module":"HSK6","chinese_simp_full":"重要文件发布之前，他都要亲自把关。","chinese_simp_cloze":"重要文件发布之前，他都要亲自___。","chinese_simp_answer":"把关","chinese_trad_full":"重要文件發佈之前，他都要親自把關。","chinese_trad_cloze":"重要文件發佈之前，他都要親自___。","chinese_trad_answer":"把關","spanish_full":"Antes de publicar los documentos importantes, siempre los revisa personalmente.","spanish_cloze":"Antes de publicar los documentos importantes, siempre los ___ personalmente.","spanish_answer":"revisa","pinyin":"Zhòngyào wénjiàn fābù zhīqián, tā dōu yào qīnzì bǎguān.","spanish_alternatives":["controla la calidad"]},{"id":"hsk6_23","level":6,"module":"HSK6","chinese_simp_full":"门把手坏了，一推就掉。","chinese_simp_cloze":"门___坏了，一推就掉。","chinese_simp_answer":"把手","chinese_trad_full":"門把手壞了，一推就掉。","chinese_trad_cloze":"門___壞了，一推就掉。","chinese_trad_answer":"把手","spanish_full":"El picaporte de la puerta está roto: se cae apenas la empujas.","spanish_cloze":"El ___ de la puerta está roto: se cae apenas la empujas.","spanish_answer":"picaporte","pinyin":"Mén bǎshou huài le, yī tuī jiù diào.","spanish_alternatives":["tirador"]},{"id":"hsk6_24","level":6,"module":"HSK6","chinese_simp_full":"因为工资太低，工人们决定罢工。","chinese_simp_cloze":"因为工资太低，工人们决定___。","chinese_simp_answer":"罢工","chinese_trad_full":"因為工資太低，工人們決定罷工。","chinese_trad_cloze":"因為工資太低，工人們決定___。","chinese_trad_answer":"罷工","spanish_full":"Como el salario era demasiado bajo, los obreros decidieron ir a la huelga.","spanish_cloze":"Como el salario era demasiado bajo, los obreros decidieron ___.","spanish_answer":"ir a la huelga","pinyin":"Yīnwèi gōngzī tài dī, gōngrénmen juédìng bàgōng.","spanish_alternatives":["hacer huelga","parar"]},{"id":"hsk6_25","level":6,"module":"HSK6","chinese_simp_full":"他这个人非常霸道，从来不听别人的意见。","chinese_simp_cloze":"他这个人非常___，从来不听别人的意见。","chinese_simp_answer":"霸道","chinese_trad_full":"他這個人非常霸道，從來不聽別人的意見。","chinese_trad_cloze":"他這個人非常___，從來不聽別人的意見。","chinese_trad_answer":"霸道","spanish_full":"Es una persona muy autoritaria, nunca escucha la opinión de los demás.","spanish_cloze":"Es una persona muy ___, nunca escucha la opinión de los demás.","spanish_answer":"autoritaria","pinyin":"Tā zhège rén fēicháng bàdào, cónglái bù tīng biérén de yìjiàn."},{"id":"hsk6_26","level":6,"module":"HSK6","chinese_simp_full":"他把面包掰成两半，分给孩子吃。","chinese_simp_cloze":"他把面包___成两半，分给孩子吃。","chinese_simp_answer":"掰","chinese_trad_full":"他把麵包掰成兩半，分給孩子吃。","chinese_trad_cloze":"他把麵包___成兩半，分給孩子吃。","chinese_trad_answer":"掰","spanish_full":"Partió el pan en dos con las manos para dárselo a los niños.","spanish_cloze":"___ el pan en dos con las manos para dárselo a los niños.","spanish_answer":"Partió","pinyin":"Tā bǎ miànbāo bāi chéng liǎng bàn, fēn gěi háizi chī.","spanish_alternatives":["Rompió"]},{"id":"hsk6_27","level":6,"module":"HSK6","chinese_simp_full":"经过多年努力，他终于摆脱了债务。","chinese_simp_cloze":"经过多年努力，他终于___了债务。","chinese_simp_answer":"摆脱","chinese_trad_full":"經過多年努力，他終於擺脫了債務。","chinese_trad_cloze":"經過多年努力，他終於___了債務。","chinese_trad_answer":"擺脫","spanish_full":"Tras muchos años de esfuerzo, por fin se libró de las deudas.","spanish_cloze":"Tras muchos años de esfuerzo, por fin ___ de las deudas.","spanish_answer":"se libró","pinyin":"Jīngguò duō nián nǔlì, tā zhōngyú bǎituō le zhàiwù.","spanish_alternatives":["se deshizo de"]},{"id":"hsk6_28","level":6,"module":"HSK6","chinese_simp_full":"明天下午我要去拜访一位老朋友。","chinese_simp_cloze":"明天下午我要去___一位老朋友。","chinese_simp_answer":"拜访","chinese_trad_full":"明天下午我要去拜訪一位老朋友。","chinese_trad_cloze":"明天下午我要去___一位老朋友。","chinese_trad_answer":"拜訪","spanish_full":"Mañana por la tarde voy a visitar a un viejo amigo.","spanish_cloze":"Mañana por la tarde voy a ___ a un viejo amigo.","spanish_answer":"visitar","pinyin":"Míngtiān xiàwǔ wǒ yào qù bàifǎng yī wèi lǎo péngyou."},{"id":"hsk6_29","level":6,"module":"HSK6","chinese_simp_full":"春节的时候，人们互相拜年，送上祝福。","chinese_simp_cloze":"春节的时候，人们互相___，送上祝福。","chinese_simp_answer":"拜年","chinese_trad_full":"春節的時候，人們互相拜年，送上祝福。","chinese_trad_cloze":"春節的時候，人們互相___，送上祝福。","chinese_trad_answer":"拜年","spanish_full":"Durante la Fiesta de la Primavera, la gente se felicita el Año Nuevo y se desea lo mejor.","spanish_cloze":"Durante la Fiesta de la Primavera, la gente ___ y se desea lo mejor.","spanish_answer":"se felicita el Año Nuevo","pinyin":"Chūnjié de shíhou, rénmen hùxiāng bàinián, sòng shàng zhùfú.","spanish_alternatives":["visitan para felicitar el año"]},{"id":"hsk6_30","level":6,"module":"HSK6","chinese_simp_full":"我要出趟远门，家里的猫就拜托你照顾了。","chinese_simp_cloze":"我要出趟远门，家里的猫就___你照顾了。","chinese_simp_answer":"拜托","chinese_trad_full":"我要出趟遠門，家裡的貓就拜託你照顧了。","chinese_trad_cloze":"我要出趟遠門，家裡的貓就___你照顧了。","chinese_trad_answer":"拜託","spanish_full":"Me voy de viaje lejos: te encargo el cuidado de mi gato.","spanish_cloze":"Me voy de viaje lejos: ___ el cuidado de mi gato.","spanish_answer":"te encargo","pinyin":"Wǒ yào chū tàng yuǎnmén, jiā lǐ de māo jiù bàituō nǐ zhàogù le.","spanish_alternatives":["te lo dejo encargado"]},{"id":"hsk6_31","level":6,"module":"HSK6","chinese_simp_full":"这种行为败坏了公司的名声。","chinese_simp_cloze":"这种行为___了公司的名声。","chinese_simp_answer":"败坏","chinese_trad_full":"這種行為敗壞了公司的名聲。","chinese_trad_cloze":"這種行為___了公司的名聲。","chinese_trad_answer":"敗壞","spanish_full":"Este tipo de conducta arruina la reputación de la empresa.","spanish_cloze":"Este tipo de conducta ___ la reputación de la empresa.","spanish_answer":"arruina","pinyin":"Zhè zhǒng xíngwéi bàihuài le gōngsī de míngshēng.","spanish_alternatives":["daña"]},{"id":"hsk6_32","level":6,"module":"HSK6","chinese_simp_full":"蝴蝶翅膀上的斑非常漂亮。","chinese_simp_cloze":"蝴蝶翅膀上的___非常漂亮。","chinese_simp_answer":"斑","chinese_trad_full":"蝴蝶翅膀上的斑非常漂亮。","chinese_trad_cloze":"蝴蝶翅膀上的___非常漂亮。","chinese_trad_answer":"斑","spanish_full":"Las manchas en las alas de la mariposa son muy bonitas.","spanish_cloze":"Las ___ en las alas de la mariposa son muy bonitas.","spanish_answer":"manchas","pinyin":"Húdié chìbǎng shàng de bān fēicháng piàoliang."},{"id":"hsk6_33","level":6,"module":"HSK6","chinese_simp_full":"政府颁布了新的环境保护法。","chinese_simp_cloze":"政府___了新的环境保护法。","chinese_simp_answer":"颁布","chinese_trad_full":"政府頒佈了新的環境保護法。","chinese_trad_cloze":"政府___了新的環境保護法。","chinese_trad_answer":"頒佈","spanish_full":"El gobierno promulgó la nueva ley de protección del medio ambiente.","spanish_cloze":"El gobierno ___ la nueva ley de protección del medio ambiente.","spanish_answer":"promulgó","pinyin":"Zhèngfǔ bānbù le xīn de huánjìng bǎohù fǎ."},{"id":"hsk6_34","level":6,"module":"HSK6","chinese_simp_full":"校长为获奖的学生颁发了证书。","chinese_simp_cloze":"校长为获奖的学生___了证书。","chinese_simp_answer":"颁发","chinese_trad_full":"校長為獲獎的學生頒發了證書。","chinese_trad_cloze":"校長為獲獎的學生___了證書。","chinese_trad_answer":"頒發","spanish_full":"El director entregó los certificados a los estudiantes premiados.","spanish_cloze":"El director ___ los certificados a los estudiantes premiados.","spanish_answer":"entregó","pinyin":"Xiàozhǎng wèi huòjiǎng de xuéshēng bānfā le zhèngshū.","spanish_alternatives":["concedió"]},{"id":"hsk6_35","level":6,"module":"HSK6","chinese_simp_full":"这款软件的新版本修复了很多漏洞。","chinese_simp_cloze":"这款软件的新___修复了很多漏洞。","chinese_simp_answer":"版本","chinese_trad_full":"這款軟件的新版本修復了很多漏洞。","chinese_trad_cloze":"這款軟件的新___修復了很多漏洞。","chinese_trad_answer":"版本","spanish_full":"La nueva versión de este software corrigió muchas fallas.","spanish_cloze":"La nueva ___ de este software corrigió muchas fallas.","spanish_answer":"versión","pinyin":"Zhè kuǎn ruǎnjiàn de xīn bǎnběn xiūfù le hěn duō lòudòng."},{"id":"hsk6_36","level":6,"module":"HSK6","chinese_simp_full":"老年人也需要伴侣的陪伴和关心。","chinese_simp_cloze":"老年人也需要___的陪伴和关心。","chinese_simp_answer":"伴侣","chinese_trad_full":"老年人也需要伴侶的陪伴和關心。","chinese_trad_cloze":"老年人也需要___的陪伴和關心。","chinese_trad_answer":"伴侶","spanish_full":"Las personas mayores también necesitan la compañía y el cariño de una pareja.","spanish_cloze":"Las personas mayores también necesitan la compañía y el cariño de una ___.","spanish_answer":"pareja","pinyin":"Lǎoniánrén yě xūyào bànlǚ de péibàn hé guānxīn."},{"id":"hsk6_37","level":6,"module":"HSK6","chinese_simp_full":"科技的发展伴随着许多新的问题。","chinese_simp_cloze":"科技的发展___着许多新的问题。","chinese_simp_answer":"伴随","chinese_trad_full":"科技的發展伴隨著許多新的問題。","chinese_trad_cloze":"科技的發展___著許多新的問題。","chinese_trad_answer":"伴隨","spanish_full":"El desarrollo de la tecnología trae aparejados muchos problemas nuevos.","spanish_cloze":"El desarrollo de la tecnología ___ muchos problemas nuevos.","spanish_answer":"trae aparejados","pinyin":"Kējì de fāzhǎn bànsuízhe xǔduō xīn de wèntí.","spanish_alternatives":["viene acompañado de"]},{"id":"hsk6_38","level":6,"module":"HSK6","chinese_simp_full":"学外语贵在坚持，千万不能半途而废。","chinese_simp_cloze":"学外语贵在坚持，千万不能___。","chinese_simp_answer":"半途而废","chinese_trad_full":"學外語貴在堅持，千萬不能半途而廢。","chinese_trad_cloze":"學外語貴在堅持，千萬不能___。","chinese_trad_answer":"半途而廢","spanish_full":"Para aprender idiomas lo valioso es la constancia; jamás hay que abandonar a mitad de camino.","spanish_cloze":"Para aprender idiomas lo valioso es la constancia; jamás hay que ___.","spanish_answer":"abandonar a mitad de camino","pinyin":"Xué wàiyǔ guì zài jiānchí, qiānwàn bù néng bàntú'érfèi.","spanish_alternatives":["rendirse a mitad de camino"]},{"id":"hsk6_39","level":6,"module":"HSK6","chinese_simp_full":"他在电影里扮演一位勇敢的警察。","chinese_simp_cloze":"他在电影里___一位勇敢的警察。","chinese_simp_answer":"扮演","chinese_trad_full":"他在電影裡扮演一位勇敢的警察。","chinese_trad_cloze":"他在電影裡___一位勇敢的警察。","chinese_trad_answer":"扮演","spanish_full":"En la película hace el papel de un policía valiente.","spanish_cloze":"En la película ___ un policía valiente.","spanish_answer":"hace el papel de","pinyin":"Tā zài diànyǐng lǐ bànyǎn yī wèi yǒnggǎn de jǐngchá.","spanish_alternatives":["interpreta a"]},{"id":"hsk6_40","level":6,"module":"HSK6","chinese_simp_full":"父母是孩子最好的榜样。","chinese_simp_cloze":"父母是孩子最好的___。","chinese_simp_answer":"榜样","chinese_trad_full":"父母是孩子最好的榜樣。","chinese_trad_cloze":"父母是孩子最好的___。","chinese_trad_answer":"榜樣","spanish_full":"Los padres son el mejor ejemplo para los hijos.","spanish_cloze":"Los padres son el mejor ___ para los hijos.","spanish_answer":"ejemplo","pinyin":"Fùmǔ shì háizi zuì hǎo de bǎngyàng."},{"id":"hsk6_41","level":6,"module":"HSK6","chinese_simp_full":"那个富商的孩子被绑架了。","chinese_simp_cloze":"那个富商的孩子被___了。","chinese_simp_answer":"绑架","chinese_trad_full":"那個富商的孩子被綁架了。","chinese_trad_cloze":"那個富商的孩子被___了。","chinese_trad_answer":"綁架","spanish_full":"El hijo de ese empresario rico fue secuestrado.","spanish_cloze":"El hijo de ese empresario rico fue ___.","spanish_answer":"secuestrado","pinyin":"Nàge fùshāng de háizi bèi bǎngjià le."},{"id":"hsk6_42","level":6,"module":"HSK6","chinese_simp_full":"这个包裹重十磅，大约四公斤半。","chinese_simp_cloze":"这个包裹重十___，大约四公斤半。","chinese_simp_answer":"磅","chinese_trad_full":"這個包裹重十磅，大約四公斤半。","chinese_trad_cloze":"這個包裹重十___，大約四公斤半。","chinese_trad_answer":"磅","spanish_full":"Este paquete pesa diez libras, unos cuatro kilos y medio.","spanish_cloze":"Este paquete pesa diez ___, unos cuatro kilos y medio.","spanish_answer":"libras","pinyin":"Zhège bāoguǒ zhòng shí bàng, dàyuē sì gōngjīn bàn."},{"id":"hsk6_43","level":6,"module":"HSK6","chinese_simp_full":"包庇罪犯也是一种犯罪。","chinese_simp_cloze":"___罪犯也是一种犯罪。","chinese_simp_answer":"包庇","chinese_trad_full":"包庇罪犯也是一種犯罪。","chinese_trad_cloze":"___罪犯也是一種犯罪。","chinese_trad_answer":"包庇","spanish_full":"Encubrir a los delincuentes también es un delito.","spanish_cloze":"___ a los delincuentes también es un delito.","spanish_answer":"Encubrir","pinyin":"Bāobì zuìfàn yě shì yī zhǒng fànzuì.","spanish_alternatives":["Proteger"]},{"id":"hsk6_44","level":6,"module":"HSK6","chinese_simp_full":"她放下心里的包袱，整个人轻松了很多。","chinese_simp_cloze":"她放下心里的___，整个人轻松了很多。","chinese_simp_answer":"包袱","chinese_trad_full":"她放下心裡的包袱，整個人輕鬆了很多。","chinese_trad_cloze":"她放下心裡的___，整個人輕鬆了很多。","chinese_trad_answer":"包袱","spanish_full":"Dejó de lado su carga mental y se sintió mucho más liviana.","spanish_cloze":"Dejó de lado su ___ mental y se sintió mucho más liviana.","spanish_answer":"carga","pinyin":"Tā fàngxià xīnlǐ de bāofu, zhěng gè rén qīngsōng le hěn duō.","spanish_alternatives":["peso"]},{"id":"hsk6_45","level":6,"module":"HSK6","chinese_simp_full":"警察把那栋楼包围了整整一天。","chinese_simp_cloze":"警察把那栋楼___了整整一天。","chinese_simp_answer":"包围","chinese_trad_full":"警察把那棟樓包圍了整整一天。","chinese_trad_cloze":"警察把那棟樓___了整整一天。","chinese_trad_answer":"包圍","spanish_full":"La policía cercó ese edificio durante un día entero.","spanish_cloze":"La policía ___ ese edificio durante un día entero.","spanish_answer":"cercó","pinyin":"Jǐngchá bǎ nà dòng lóu bāowéi le zhěngzhěng yī tiān.","spanish_alternatives":["rodeó"]},{"id":"hsk6_46","level":6,"module":"HSK6","chinese_simp_full":"这家工厂专门负责食品的包装。","chinese_simp_cloze":"这家工厂专门负责食品的___。","chinese_simp_answer":"包装","chinese_trad_full":"這家工廠專門負責食品的包裝。","chinese_trad_cloze":"這家工廠專門負責食品的___。","chinese_trad_answer":"包裝","spanish_full":"Esta fábrica se especializa en el embalaje de alimentos.","spanish_cloze":"Esta fábrica se especializa en el ___ de alimentos.","spanish_answer":"embalaje","pinyin":"Zhè jiā gōngchǎng zhuānmén fùzé shípǐn de bāozhuāng.","spanish_alternatives":["empaquetado"]},{"id":"hsk6_47","level":6,"module":"HSK6","chinese_simp_full":"重要证件要妥善保管，不能随便乱放。","chinese_simp_cloze":"重要证件要妥善___，不能随便乱放。","chinese_simp_answer":"保管","chinese_trad_full":"重要證件要妥善保管，不能隨便亂放。","chinese_trad_cloze":"重要證件要妥善___，不能隨便亂放。","chinese_trad_answer":"保管","spanish_full":"Los documentos importantes deben guardarse bien, no se pueden dejar en cualquier lado.","spanish_cloze":"Los documentos importantes deben ___ bien, no se pueden dejar en cualquier lado.","spanish_answer":"guardarse","pinyin":"Zhòngyào zhèngjiàn yào tuǒshàn bǎoguǎn, bù néng suíbiàn luàn fàng.","spanish_alternatives":["conservarse"]},{"id":"hsk6_48","level":6,"module":"HSK6","chinese_simp_full":"公司规定，员工必须对客户信息保密。","chinese_simp_cloze":"公司规定，员工必须对客户信息___。","chinese_simp_answer":"保密","chinese_trad_full":"公司規定，員工必須對客戶信息保密。","chinese_trad_cloze":"公司規定，員工必須對客戶信息___。","chinese_trad_answer":"保密","spanish_full":"La empresa establece que los empleados deben mantener en secreto los datos de los clientes.","spanish_cloze":"La empresa establece que los empleados deben ___ los datos de los clientes.","spanish_answer":"mantener en secreto","pinyin":"Gōngsī guīdìng, yuángōng bìxū duì kèhù xìnxī bǎomì.","spanish_alternatives":["guardar secreto"]},{"id":"hsk6_49","level":6,"module":"HSK6","chinese_simp_full":"他们工作忙，请了一位保姆照顾孩子。","chinese_simp_cloze":"他们工作忙，请了一位___照顾孩子。","chinese_simp_answer":"保姆","chinese_trad_full":"他們工作忙，請了一位保姆照顧孩子。","chinese_trad_cloze":"他們工作忙，請了一位___照顧孩子。","chinese_trad_answer":"保姆","spanish_full":"Como trabajan mucho, contrataron a una niñera para cuidar a los niños.","spanish_cloze":"Como trabajan mucho, contrataron a una ___ para cuidar a los niños.","spanish_answer":"niñera","pinyin":"Tāmen gōngzuò máng, qǐng le yī wèi bǎomǔ zhàogù háizi."},{"id":"hsk6_50","level":6,"module":"HSK6","chinese_simp_full":"爷爷的思想比较保守，不容易接受新事物。","chinese_simp_cloze":"爷爷的思想比较___，不容易接受新事物。","chinese_simp_answer":"保守","chinese_trad_full":"爺爺的思想比較保守，不容易接受新事物。","chinese_trad_cloze":"爺爺的思想比較___，不容易接受新事物。","chinese_trad_answer":"保守","spanish_full":"Las ideas del abuelo son bastante conservadoras, le cuesta aceptar cosas nuevas.","spanish_cloze":"Las ideas del abuelo son bastante ___, le cuesta aceptar cosas nuevas.","spanish_answer":"conservadoras","pinyin":"Yéye de sīxiǎng bǐjiào bǎoshǒu, bù róngyì jiēshòu xīn shìwù."},{"id":"hsk6_51","level":6,"module":"HSK6","chinese_simp_full":"士兵们誓死保卫自己的祖国。","chinese_simp_cloze":"士兵们誓死___自己的祖国。","chinese_simp_answer":"保卫","chinese_trad_full":"士兵們誓死保衛自己的祖國。","chinese_trad_cloze":"士兵們誓死___自己的祖國。","chinese_trad_answer":"保衛","spanish_full":"Los soldados juran defender hasta la muerte a su patria.","spanish_cloze":"Los soldados juran ___ hasta la muerte a su patria.","spanish_answer":"defender","pinyin":"Shìbīngmen shìsǐ bǎowèi zìjǐ de zǔguó.","spanish_alternatives":["proteger"]},{"id":"hsk6_52","level":6,"module":"HSK6","chinese_simp_full":"定期保养汽车可以延长它的寿命。","chinese_simp_cloze":"定期___汽车可以延长它的寿命。","chinese_simp_answer":"保养","chinese_trad_full":"定期保養汽車可以延長它的壽命。","chinese_trad_cloze":"定期___汽車可以延長它的壽命。","chinese_trad_answer":"保養","spanish_full":"Darle mantenimiento periódico al auto prolonga su vida útil.","spanish_cloze":"Darle ___ periódico al auto prolonga su vida útil.","spanish_answer":"mantenimiento","pinyin":"Dìngqī bǎoyǎng qìchē kěyǐ yáncháng tā de shòumìng.","spanish_alternatives":["mantenerlo bien"]},{"id":"hsk6_53","level":6,"module":"HSK6","chinese_simp_full":"新法律保障了劳动者的基本权利。","chinese_simp_cloze":"新法律___了劳动者的基本权利。","chinese_simp_answer":"保障","chinese_trad_full":"新法律保障了勞動者的基本權利。","chinese_trad_cloze":"新法律___了勞動者的基本權利。","chinese_trad_answer":"保障","spanish_full":"La nueva ley garantiza los derechos básicos de los trabajadores.","spanish_cloze":"La nueva ley ___ los derechos básicos de los trabajadores.","spanish_answer":"garantiza","pinyin":"Xīn fǎlǜ bǎozhàng le láodòngzhě de jīběn quánlì.","spanish_alternatives":["asegura"]},{"id":"hsk6_54","level":6,"module":"HSK6","chinese_simp_full":"你就要出远门了，路上千万保重身体。","chinese_simp_cloze":"你就要出远门了，路上千万___身体。","chinese_simp_answer":"保重","chinese_trad_full":"你就要出遠門了，路上千萬保重身體。","chinese_trad_cloze":"你就要出遠門了，路上千萬___身體。","chinese_trad_answer":"保重","spanish_full":"Estás por irte lejos: cuídate mucho en el camino.","spanish_cloze":"Estás por irte lejos: ___ en el camino.","spanish_answer":"cuídate mucho","pinyin":"Nǐ jiù yào chū yuǎnmén le, lù shàng qiānwàn bǎozhòng shēntǐ.","spanish_alternatives":["cuídate"]},{"id":"hsk6_55","level":6,"module":"HSK6","chinese_simp_full":"这个市场已经接近饱和，竞争特别激烈。","chinese_simp_cloze":"这个市场已经接近___，竞争特别激烈。","chinese_simp_answer":"饱和","chinese_trad_full":"這個市場已經接近飽和，競爭特別激烈。","chinese_trad_cloze":"這個市場已經接近___，競爭特別激烈。","chinese_trad_answer":"飽和","spanish_full":"Este mercado ya está casi saturado y la competencia es fierísima.","spanish_cloze":"Este mercado ya está casi ___ y la competencia es fierísima.","spanish_answer":"saturado","pinyin":"Zhège shìchǎng yǐjīng jiējìn bǎohé, jìngzhēng tèbié jīliè."},{"id":"hsk6_56","level":6,"module":"HSK6","chinese_simp_full":"奶奶那饱经沧桑的脸上总是带着微笑。","chinese_simp_cloze":"奶奶那___的脸上总是带着微笑。","chinese_simp_answer":"饱经沧桑","chinese_trad_full":"奶奶那飽經滄桑的臉上總是帶著微笑。","chinese_trad_cloze":"奶奶那___的臉上總是帶著微笑。","chinese_trad_answer":"飽經滄桑","spanish_full":"El rostro de la abuela, que ha vivido tantas cosas, siempre lleva una sonrisa.","spanish_cloze":"El rostro de la abuela, ___, siempre lleva una sonrisa.","spanish_answer":"que ha vivido tantas cosas","pinyin":"Nǎinai nà bǎojīng cāngsāng de liǎn shàng zǒngshì dàizhe wēixiào.","spanish_alternatives":["marcado por la vida"]},{"id":"hsk6_57","level":6,"module":"HSK6","chinese_simp_full":"这份工作辛苦，但报酬很可观。","chinese_simp_cloze":"这份工作辛苦，但___很可观。","chinese_simp_answer":"报酬","chinese_trad_full":"這份工作辛苦，但報酬很可觀。","chinese_trad_cloze":"這份工作辛苦，但___很可觀。","chinese_trad_answer":"報酬","spanish_full":"Este trabajo es duro, pero la remuneración es bastante buena.","spanish_cloze":"Este trabajo es duro, pero la ___ es bastante buena.","spanish_answer":"remuneración","pinyin":"Zhè fèn gōngzuò xīnkǔ, dàn bàochou hěn kěguān.","spanish_alternatives":["pago"]},{"id":"hsk6_58","level":6,"module":"HSK6","chinese_simp_full":"他发誓要为死去的父亲报仇。","chinese_simp_cloze":"他发誓要为死去的父亲___。","chinese_simp_answer":"报仇","chinese_trad_full":"他發誓要為死去的父親報仇。","chinese_trad_cloze":"他發誓要為死去的父親___。","chinese_trad_answer":"報仇","spanish_full":"Juró vengar a su padre fallecido.","spanish_cloze":"Juró ___ a su padre fallecido.","spanish_answer":"vengar","pinyin":"Tā fāshì yào wèi sǐqù de fùqīn bàochóu.","spanish_alternatives":["tomar venganza"]},{"id":"hsk6_59","level":6,"module":"HSK6","chinese_simp_full":"我不知道怎样才能报答您的恩情。","chinese_simp_cloze":"我不知道怎样才能___您的恩情。","chinese_simp_answer":"报答","chinese_trad_full":"我不知道怎樣才能報答您的恩情。","chinese_trad_cloze":"我不知道怎樣才能___您的恩情。","chinese_trad_answer":"報答","spanish_full":"No sé cómo podría retribuir tanta bondad de su parte.","spanish_cloze":"No sé cómo podría ___ tanta bondad de su parte.","spanish_answer":"retribuir","pinyin":"Wǒ bù zhīdào zěnyàng cáinéng bàodá nín de ēnqíng.","spanish_alternatives":["pagar"]},{"id":"hsk6_60","level":6,"module":"HSK6","chinese_simp_full":"他打击报复那些批评过他的同事。","chinese_simp_cloze":"他打击___那些批评过他的同事。","chinese_simp_answer":"报复","chinese_trad_full":"他打擊報復那些批評過他的同事。","chinese_trad_cloze":"他打擊___那些批評過他的同事。","chinese_trad_answer":"報復","spanish_full":"Se venga de los colegas que lo han criticado.","spanish_cloze":"___ de los colegas que lo han criticado.","spanish_answer":"Se venga","pinyin":"Tā dǎjī bàofù nàxiē pīpíngguò tā de tóngshì.","spanish_alternatives":["Toma represalias contra"]},{"id":"hsk6_61","level":6,"module":"HSK6","chinese_simp_full":"遇到火灾要第一时间报警。","chinese_simp_cloze":"遇到火灾要第一时间___。","chinese_simp_answer":"报警","chinese_trad_full":"遇到火災要第一時間報警。","chinese_trad_cloze":"遇到火災要第一時間___。","chinese_trad_answer":"報警","spanish_full":"Ante un incendio, hay que llamar a la policía de inmediato.","spanish_cloze":"Ante un incendio, hay que ___ de inmediato.","spanish_answer":"llamar a la policía","pinyin":"Yùdào huǒzāi yào dì yī shíjiān bàojǐng.","spanish_alternatives":["avisar a la policía"]},{"id":"hsk6_62","level":6,"module":"HSK6","chinese_simp_full":"出差的费用回来以后可以报销。","chinese_simp_cloze":"出差的费用回来以后可以___。","chinese_simp_answer":"报销","chinese_trad_full":"出差的費用回來以後可以報銷。","chinese_trad_cloze":"出差的費用回來以後可以___。","chinese_trad_answer":"報銷","spanish_full":"Los gastos del viaje de trabajo se pueden reembolsar al volver.","spanish_cloze":"Los gastos del viaje de trabajo se pueden ___ al volver.","spanish_answer":"reembolsar","pinyin":"Chūchāi de fèiyòng huílái yǐhòu kěyǐ bàoxiāo."},{"id":"hsk6_63","level":6,"module":"HSK6","chinese_simp_full":"年轻人应该有远大的抱负。","chinese_simp_cloze":"年轻人应该有远大的___。","chinese_simp_answer":"抱负","chinese_trad_full":"年輕人應該有遠大的抱負。","chinese_trad_cloze":"年輕人應該有遠大的___。","chinese_trad_answer":"抱負","spanish_full":"Los jóvenes deben tener grandes aspiraciones.","spanish_cloze":"Los jóvenes deben tener grandes ___.","spanish_answer":"aspiraciones","pinyin":"Niánqīngrén yīnggāi yǒu yuǎndà de bàofù.","spanish_alternatives":["ambiciones"]},{"id":"hsk6_64","level":6,"module":"HSK6","chinese_simp_full":"任何形式的暴力都是不可接受的。","chinese_simp_cloze":"任何形式的___都是不可接受的。","chinese_simp_answer":"暴力","chinese_trad_full":"任何形式的暴力都是不可接受的。","chinese_trad_cloze":"任何形式的___都是不可接受的。","chinese_trad_answer":"暴力","spanish_full":"Cualquier forma de violencia es inaceptable.","spanish_cloze":"Cualquier forma de ___ es inaceptable.","spanish_answer":"violencia","pinyin":"Rènhé xíngshì de bàolì dōu shì bùkě jiēshòu de."},{"id":"hsk6_65","level":6,"module":"HSK6","chinese_simp_full":"他的谎言终于暴露了。","chinese_simp_cloze":"他的谎言终于___了。","chinese_simp_answer":"暴露","chinese_trad_full":"他的謊言終於暴露了。","chinese_trad_cloze":"他的謊言終於___了。","chinese_trad_answer":"暴露","spanish_full":"Su mentira por fin quedó al descubierto.","spanish_cloze":"Su mentira por fin ___.","spanish_answer":"quedó al descubierto","pinyin":"Tā de huǎngyán zhōngyú bàolù le.","spanish_alternatives":["se reveló"]},{"id":"hsk6_66","level":6,"module":"HSK6","chinese_simp_full":"这位明星的隐私被媒体曝光了。","chinese_simp_cloze":"这位明星的隐私被媒体___了。","chinese_simp_answer":"曝光","chinese_trad_full":"這位明星的隱私被媒體曝光了。","chinese_trad_cloze":"這位明星的隱私被媒體___了。","chinese_trad_answer":"曝光","spanish_full":"La intimidad de esa estrella fue expuesta por los medios.","spanish_cloze":"La intimidad de esa estrella fue ___ por los medios.","spanish_answer":"expuesta","pinyin":"Zhè wèi míngxīng de yǐnsī bèi méitǐ bàoguāng le.","spanish_alternatives":["revelada"]},{"id":"hsk6_67","level":6,"module":"HSK6","chinese_simp_full":"战争终于爆发了，人们纷纷逃离家园。","chinese_simp_cloze":"战争终于___了，人们纷纷逃离家园。","chinese_simp_answer":"爆发","chinese_trad_full":"戰爭終於爆發了，人們紛紛逃離家園。","chinese_trad_cloze":"戰爭終於___了，人們紛紛逃離家園。","chinese_trad_answer":"爆發","spanish_full":"La guerra finalmente estalló y la gente huyó en masa de sus hogares.","spanish_cloze":"La guerra finalmente ___ y la gente huyó en masa de sus hogares.","spanish_answer":"estalló","pinyin":"Zhànzhēng zhōngyú bàofā le, rénmen fēnfēn táolí jiāyuán."},{"id":"hsk6_68","level":6,"module":"HSK6","chinese_simp_full":"消防员赶到时，仓库已经发生了爆炸。","chinese_simp_cloze":"消防员赶到时，仓库已经发生了___。","chinese_simp_answer":"爆炸","chinese_trad_full":"消防員趕到時，倉庫已經發生了爆炸。","chinese_trad_cloze":"消防員趕到時，倉庫已經發生了___。","chinese_trad_answer":"爆炸","spanish_full":"Cuando llegaron los bomberos, en el almacén ya había ocurrido una explosión.","spanish_cloze":"Cuando llegaron los bomberos, en el almacén ya había ocurrido una ___.","spanish_answer":"explosión","pinyin":"Xiāofángyuán gǎndào shí, cāngkù yǐjīng fāshēng le bàozhà."},{"id":"hsk6_69","level":6,"module":"HSK6","chinese_simp_full":"用这种卑鄙的手段赢得比赛，并不光彩。","chinese_simp_cloze":"用这种___的手段赢得比赛，并不光彩。","chinese_simp_answer":"卑鄙","chinese_trad_full":"用這種卑鄙的手段贏得比賽，並不光彩。","chinese_trad_cloze":"用這種___的手段贏得比賽，並不光彩。","chinese_trad_answer":"卑鄙","spanish_full":"Ganar la competencia con medios tan viles no le hace ningún honor.","spanish_cloze":"Ganar la competencia con medios tan ___ no le hace ningún honor.","spanish_answer":"viles","pinyin":"Yòng zhè zhǒng bēibǐ de shǒuduàn yíngdé bǐsài, bìng bù guāngcǎi.","spanish_alternatives":["despreciables"]},{"id":"hsk6_70","level":6,"module":"HSK6","chinese_simp_full":"听到这个消息，他心里充满了悲哀。","chinese_simp_cloze":"听到这个消息，他心里充满了___。","chinese_simp_answer":"悲哀","chinese_trad_full":"聽到這個消息，他心裡充滿了悲哀。","chinese_trad_cloze":"聽到這個消息，他心裡充滿了___。","chinese_trad_answer":"悲哀","spanish_full":"Al escuchar la noticia, su corazón se llenó de tristeza.","spanish_cloze":"Al escuchar la noticia, su corazón se llenó de ___.","spanish_answer":"tristeza","pinyin":"Tīngdào zhège xiāoxi, tā xīnlǐ chōngmǎn le bēi'āi.","spanish_alternatives":["dolor"]},{"id":"hsk6_71","level":6,"module":"HSK6","chinese_simp_full":"小说描写了一个家庭的悲惨遭遇。","chinese_simp_cloze":"小说描写了一个家庭的___遭遇。","chinese_simp_answer":"悲惨","chinese_trad_full":"小說描寫了一個家庭的悲慘遭遇。","chinese_trad_cloze":"小說描寫了一個家庭的___遭遇。","chinese_trad_answer":"悲慘","spanish_full":"La novela describe la trágica suerte de una familia.","spanish_cloze":"La novela describe la ___ suerte de una familia.","spanish_answer":"trágica","pinyin":"Xiǎoshuō miáoxiě le yī gè jiātíng de bēicǎn zāoyù."},{"id":"hsk6_72","level":6,"module":"HSK6","chinese_simp_full":"生活在北极附近的动物适应了严寒。","chinese_simp_cloze":"生活在___附近的动物适应了严寒。","chinese_simp_answer":"北极","chinese_trad_full":"生活在北極附近的動物適應了嚴寒。","chinese_trad_cloze":"生活在___附近的動物適應了嚴寒。","chinese_trad_answer":"北極","spanish_full":"Los animales que viven cerca del Polo Norte están adaptados al frío extremo.","spanish_cloze":"Los animales que viven cerca del ___ están adaptados al frío extremo.","spanish_answer":"Polo Norte","pinyin":"Shēnghuó zài běijí fùjìn de dòngwù shìyìng le yánhán."},{"id":"hsk6_73","level":6,"module":"HSK6","chinese_simp_full":"重要资料一定要做好备份。","chinese_simp_cloze":"重要资料一定要做好___。","chinese_simp_answer":"备份","chinese_trad_full":"重要資料一定要做好備份。","chinese_trad_cloze":"重要資料一定要做好___。","chinese_trad_answer":"備份","spanish_full":"Con los archivos importantes hay que hacer siempre una copia de seguridad.","spanish_cloze":"Con los archivos importantes hay que hacer siempre una ___.","spanish_answer":"copia de seguridad","pinyin":"Zhòngyào zīliào yīdìng yào zuò hǎo bèifèn.","spanish_alternatives":["backup"]},{"id":"hsk6_74","level":6,"module":"HSK6","chinese_simp_full":"开会之前，请先阅读这份备忘录。","chinese_simp_cloze":"开会之前，请先阅读这份___。","chinese_simp_answer":"备忘录","chinese_trad_full":"開會之前，請先閱讀這份備忘錄。","chinese_trad_cloze":"開會之前，請先閱讀這份___。","chinese_trad_answer":"備忘錄","spanish_full":"Antes de la reunión, lean primero este memorándum.","spanish_cloze":"Antes de la reunión, lean primero este ___.","spanish_answer":"memorándum","pinyin":"Kāihuì zhīqián, qǐng xiān yuèdú zhè fèn bèiwànglù."},{"id":"hsk6_75","level":6,"module":"HSK6","chinese_simp_full":"最让他痛苦的是好朋友的背叛。","chinese_simp_cloze":"最让他痛苦的是好朋友的___。","chinese_simp_answer":"背叛","chinese_trad_full":"最讓他痛苦的是好朋友的背叛。","chinese_trad_cloze":"最讓他痛苦的是好朋友的___。","chinese_trad_answer":"背叛","spanish_full":"Lo que más le dolió fue la traición de su mejor amigo.","spanish_cloze":"Lo que más le dolió fue la ___ de su mejor amigo.","spanish_answer":"traición","pinyin":"Zuì ràng tā tòngkǔ de shì hǎo péngyou de bèipàn."},{"id":"hsk6_76","level":6,"module":"HSK6","chinese_simp_full":"小学生每天早上都要背诵古诗。","chinese_simp_cloze":"小学生每天早上都要___古诗。","chinese_simp_answer":"背诵","chinese_trad_full":"小學生每天早上都要背誦古詩。","chinese_trad_cloze":"小學生每天早上都要___古詩。","chinese_trad_answer":"背誦","spanish_full":"Los escolares deben recitar poemas antiguos todas las mañanas.","spanish_cloze":"Los escolares deben ___ poemas antiguos todas las mañanas.","spanish_answer":"recitar","pinyin":"Xiǎoxuéshēng měitiān zǎoshang dōu yào bèisòng gǔshī.","spanish_alternatives":["repetir de memoria"]},{"id":"hsk6_77","level":6,"module":"HSK6","chinese_simp_full":"在谈判中，我们不能一直处于被动。","chinese_simp_cloze":"在谈判中，我们不能一直处于___。","chinese_simp_answer":"被动","chinese_trad_full":"在談判中，我們不能一直處於被動。","chinese_trad_cloze":"在談判中，我們不能一直處於___。","chinese_trad_answer":"被動","spanish_full":"En la negociación no podemos quedarnos siempre en una posición pasiva.","spanish_cloze":"En la negociación no podemos quedarnos siempre en una posición ___.","spanish_answer":"pasiva","pinyin":"Zài tánpàn zhōng, wǒmen bù néng yīzhí chǔyú bèidòng."},{"id":"hsk6_78","level":6,"module":"HSK6","chinese_simp_full":"被告有权为自己辩护。","chinese_simp_cloze":"___有权为自己辩护。","chinese_simp_answer":"被告","chinese_trad_full":"被告有權為自己辯護。","chinese_trad_cloze":"___有權為自己辯護。","chinese_trad_answer":"被告","spanish_full":"El acusado tiene derecho a defenderse.","spanish_cloze":"El ___ tiene derecho a defenderse.","spanish_answer":"acusado","pinyin":"Bèigào yǒu quán wèi zìjǐ biànhù."},{"id":"hsk6_79","level":6,"module":"HSK6","chinese_simp_full":"孩子们在沙滩上捡了很多漂亮的贝壳。","chinese_simp_cloze":"孩子们在沙滩上捡了很多漂亮的___。","chinese_simp_answer":"贝壳","chinese_trad_full":"孩子們在沙灘上撿了很多漂亮的貝殼。","chinese_trad_cloze":"孩子們在沙灘上撿了很多漂亮的___。","chinese_trad_answer":"貝殼","spanish_full":"Los niños recogieron muchas conchas bonitas en la playa.","spanish_cloze":"Los niños recogieron muchas ___ bonitas en la playa.","spanish_answer":"conchas","pinyin":"Háizimen zài shātān shàng jiǎn le hěn duō piàoliang de bèiké."},{"id":"hsk6_80","level":6,"module":"HSK6","chinese_simp_full":"为了这份合同，他奔波了整整一个月。","chinese_simp_cloze":"为了这份合同，他___了整整一个月。","chinese_simp_answer":"奔波","chinese_trad_full":"為了這份合同，他奔波了整整一個月。","chinese_trad_cloze":"為了這份合同，他___了整整一個月。","chinese_trad_answer":"奔波","spanish_full":"Por este contrato anduvo de un lado a otro durante un mes entero.","spanish_cloze":"Por este contrato ___ durante un mes entero.","spanish_answer":"anduvo de un lado a otro","pinyin":"Wèile zhè fèn hétong, tā bēnbō le zhěngzhěng yī gè yuè.","spanish_alternatives":["anduvo recorriendo"]},{"id":"hsk6_81","level":6,"module":"HSK6","chinese_simp_full":"一列火车在原野上奔驰。","chinese_simp_cloze":"一列火车在原野上___。","chinese_simp_answer":"奔驰","chinese_trad_full":"一列火車在原野上奔馳。","chinese_trad_cloze":"一列火車在原野上___。","chinese_trad_answer":"奔馳","spanish_full":"Un tren corre a toda velocidad por la llanura.","spanish_cloze":"Un tren ___ por la llanura.","spanish_answer":"corre a toda velocidad","pinyin":"Yī liè huǒchē zài yuányě shàng bēnchí.","spanish_alternatives":["avanza velozmente"]},{"id":"hsk6_82","level":6,"module":"HSK6","chinese_simp_full":"遇到危险时，人会出于本能地躲开。","chinese_simp_cloze":"遇到危险时，人会出于___地躲开。","chinese_simp_answer":"本能","chinese_trad_full":"遇到危險時，人會出於本能地躲開。","chinese_trad_cloze":"遇到危險時，人會出於___地躲開。","chinese_trad_answer":"本能","spanish_full":"Ante el peligro, la gente se aparta por instinto.","spanish_cloze":"Ante el peligro, la gente se aparta por ___.","spanish_answer":"instinto","pinyin":"Yùdào wēixiǎn shí, rén huì chūyú běnnéng de duǒkāi."},{"id":"hsk6_83","level":6,"module":"HSK6","chinese_simp_full":"做生意首先得有本钱。","chinese_simp_cloze":"做生意首先得有___。","chinese_simp_answer":"本钱","chinese_trad_full":"做生意首先得有本錢。","chinese_trad_cloze":"做生意首先得有___。","chinese_trad_answer":"本錢","spanish_full":"Para hacer negocios, primero hace falta capital.","spanish_cloze":"Para hacer negocios, primero hace falta ___.","spanish_answer":"capital","pinyin":"Zuò shēngyì shǒuxiān děi yǒu běnqián."},{"id":"hsk6_84","level":6,"module":"HSK6","chinese_simp_full":"报名表必须由本人填写。","chinese_simp_cloze":"报名表必须由___填写。","chinese_simp_answer":"本人","chinese_trad_full":"報名表必須由本人填寫。","chinese_trad_cloze":"報名表必須由___填寫。","chinese_trad_answer":"本人","spanish_full":"El formulario de inscripción debe llenarlo la persona misma.","spanish_cloze":"El formulario de inscripción debe llenarlo ___.","spanish_answer":"la persona misma","pinyin":"Bàomíng biǎo bìxū yóu běnrén tiánxiě.","spanish_alternatives":["el interesado"]},{"id":"hsk6_85","level":6,"module":"HSK6","chinese_simp_full":"问题本身并不复杂，是我们想多了。","chinese_simp_cloze":"问题___并不复杂，是我们想多了。","chinese_simp_answer":"本身","chinese_trad_full":"問題本身並不複雜，是我們想多了。","chinese_trad_cloze":"問題___並不複雜，是我們想多了。","chinese_trad_answer":"本身","spanish_full":"El problema en sí no es complicado; nosotros lo complicamos de más.","spanish_cloze":"El problema ___ no es complicado; nosotros lo complicamos de más.","spanish_answer":"en sí","pinyin":"Wèntí běnshēn bìng bù fùzá, shì wǒmen xiǎng duō le."},{"id":"hsk6_86","level":6,"module":"HSK6","chinese_simp_full":"他真有本事，这么难的问题都解决了。","chinese_simp_cloze":"他真有___，这么难的问题都解决了。","chinese_simp_answer":"本事","chinese_trad_full":"他真有本事，這麼難的問題都解決了。","chinese_trad_cloze":"他真有___，這麼難的問題都解決了。","chinese_trad_answer":"本事","spanish_full":"Qué habilidad tiene: resolvió hasta un problema tan difícil.","spanish_cloze":"Qué ___ tiene: resolvió hasta un problema tan difícil.","spanish_answer":"habilidad","pinyin":"Tā zhēn yǒu běnshi, zhème nán de wèntí dōu jiějué le.","spanish_alternatives":["capacidad"]},{"id":"hsk6_87","level":6,"module":"HSK6","chinese_simp_full":"他第一次跳舞，动作很笨拙。","chinese_simp_cloze":"他第一次跳舞，动作很___。","chinese_simp_answer":"笨拙","chinese_trad_full":"他第一次跳舞，動作很笨拙。","chinese_trad_cloze":"他第一次跳舞，動作很___。","chinese_trad_answer":"笨拙","spanish_full":"Bailando por primera vez, sus movimientos eran muy torpes.","spanish_cloze":"Bailando por primera vez, sus movimientos eran muy ___.","spanish_answer":"torpes","pinyin":"Tā dì yī cì tiàowǔ, dòngzuò hěn bènzhuō."},{"id":"hsk6_88","level":6,"module":"HSK6","chinese_simp_full":"接连的打击让他的精神几乎崩溃。","chinese_simp_cloze":"接连的打击让他的精神几乎___。","chinese_simp_answer":"崩溃","chinese_trad_full":"接連的打擊讓他的精神幾乎崩潰。","chinese_trad_cloze":"接連的打擊讓他的精神幾乎___。","chinese_trad_answer":"崩潰","spanish_full":"Los golpes sucesivos casi hicieron colapsar su ánimo.","spanish_cloze":"Los golpes sucesivos casi hicieron ___ su ánimo.","spanish_answer":"colapsar","pinyin":"Jiēlián de dǎjī ràng tā de jīngshén jīhū bēngkuì.","spanish_alternatives":["derrumbarse"]},{"id":"hsk6_89","level":6,"module":"HSK6","chinese_simp_full":"甭客气，就当在自己家里一样。","chinese_simp_cloze":"___客气，就当在自己家里一样。","chinese_simp_answer":"甭","chinese_trad_full":"甭客氣，就當在自己家裡一樣。","chinese_trad_cloze":"___客氣，就當在自己家裡一樣。","chinese_trad_answer":"甭","spanish_full":"No hace falta que sean formales; pónganse como en su propia casa.","spanish_cloze":"___ que sean formales; pónganse como en su propia casa.","spanish_answer":"No hace falta","pinyin":"Béng kèqi, jiù dàng zài zìjǐ jiā lǐ yīyàng.","spanish_alternatives":["No se molesten"]},{"id":"hsk6_90","level":6,"module":"HSK6","chinese_simp_full":"孩子们高兴得又蹦又跳。","chinese_simp_cloze":"孩子们高兴得又___又跳。","chinese_simp_answer":"蹦","chinese_trad_full":"孩子們高興得又蹦又跳。","chinese_trad_cloze":"孩子們高興得又___又跳。","chinese_trad_answer":"蹦","spanish_full":"Los niños, contentos, no paran de saltar y brincar.","spanish_cloze":"Los niños, contentos, no paran de ___.","spanish_answer":"saltar y brincar","pinyin":"Háizimen gāoxìng de yòu bèng yòu tiào."},{"id":"hsk6_91","level":6,"module":"HSK6","chinese_simp_full":"听到胜利的消息，人群中迸发出一阵欢呼。","chinese_simp_cloze":"听到胜利的消息，人群中___出一阵欢呼。","chinese_simp_answer":"迸发","chinese_trad_full":"聽到勝利的消息，人群中迸發出一陣歡呼。","chinese_trad_cloze":"聽到勝利的消息，人群中___出一陣歡呼。","chinese_trad_answer":"迸發","spanish_full":"Al oír la noticia de la victoria, la multitud dejó escapar un grito de alegría.","spanish_cloze":"Al oír la noticia de la victoria, la multitud ___ un grito de alegría.","spanish_answer":"dejó escapar","pinyin":"Tīngdào shènglì de xiāoxi, rénqún zhōng bèngfā chū yī zhèn huānhū.","spanish_alternatives":["estalló en"]},{"id":"hsk6_92","level":6,"module":"HSK6","chinese_simp_full":"父母不该逼迫孩子学自己不喜欢的东西。","chinese_simp_cloze":"父母不该___孩子学自己不喜欢的东西。","chinese_simp_answer":"逼迫","chinese_trad_full":"父母不該逼迫孩子學自己不喜歡的東西。","chinese_trad_cloze":"父母不該___孩子學自己不喜歡的東西。","chinese_trad_answer":"逼迫","spanish_full":"Los padres no deberían forzar a los hijos a estudiar cosas que no les gustan.","spanish_cloze":"Los padres no deberían ___ a los hijos a estudiar cosas que no les gustan.","spanish_answer":"forzar","pinyin":"Fùmǔ bù gāi bīpò háizi xué zìjǐ bù xǐhuan de dōngxi.","spanish_alternatives":["obligar"]},{"id":"hsk6_93","level":6,"module":"HSK6","chinese_simp_full":"宝宝流鼻涕了，需要帮他擦干净。","chinese_simp_cloze":"宝宝流___了，需要帮他擦干净。","chinese_simp_answer":"鼻涕","chinese_trad_full":"寶寶流鼻涕了，需要幫他擦乾淨。","chinese_trad_cloze":"寶寶流___了，需要幫他擦乾淨。","chinese_trad_answer":"鼻涕","spanish_full":"El bebé tiene mocos: hay que ayudarle a limpiárselos.","spanish_cloze":"El bebé tiene ___: hay que ayudarle a limpiárselos.","spanish_answer":"mocos","pinyin":"Bǎobao liú bítì le, xūyào bāng tā cā gānjìng."},{"id":"hsk6_94","level":6,"module":"HSK6","chinese_simp_full":"打个比方，学习就像爬山一样。","chinese_simp_cloze":"打个___，学习就像爬山一样。","chinese_simp_answer":"比方","chinese_trad_full":"打個比方，學習就像爬山一樣。","chinese_trad_cloze":"打個___，學習就像爬山一樣。","chinese_trad_answer":"比方","spanish_full":"Por poner un ejemplo, estudiar es como escalar una montaña.","spanish_cloze":"Por poner un ___, estudiar es como escalar una montaña.","spanish_answer":"ejemplo","pinyin":"Dǎ gè bǐfang, xuéxí jiù xiàng páshān yīyàng."},{"id":"hsk6_95","level":6,"module":"HSK6","chinese_simp_full":"诗人用美丽的比喻描写春天。","chinese_simp_cloze":"诗人用美丽的___描写春天。","chinese_simp_answer":"比喻","chinese_trad_full":"詩人用美麗的比喻描寫春天。","chinese_trad_cloze":"詩人用美麗的___描寫春天。","chinese_trad_answer":"比喻","spanish_full":"El poeta usa bellas metáforas para describir la primavera.","spanish_cloze":"El poeta usa bellas ___ para describir la primavera.","spanish_answer":"metáforas","pinyin":"Shīrén yòng měilì de bǐyù miáoxiě chūntiān."},{"id":"hsk6_96","level":6,"module":"HSK6","chinese_simp_full":"在出口产品中，电子产品的比重越来越大。","chinese_simp_cloze":"在出口产品中，电子产品的___越来越大。","chinese_simp_answer":"比重","chinese_trad_full":"在出口產品中，電子產品的比重越來越大。","chinese_trad_cloze":"在出口產品中，電子產品的___越來越大。","chinese_trad_answer":"比重","spanish_full":"Dentro de los productos exportados, la proporción de los electrónicos es cada vez mayor.","spanish_cloze":"Dentro de los productos exportados, la ___ de los electrónicos es cada vez mayor.","spanish_answer":"proporción","pinyin":"Zài chūkǒu chǎnpǐn zhōng, diànzǐ chǎnpǐn de bǐzhòng yuèláiyuè dà."},{"id":"hsk6_97","level":6,"module":"HSK6","chinese_simp_full":"我们不能鄙视任何诚实劳动的人。","chinese_simp_cloze":"我们不能___任何诚实劳动的人。","chinese_simp_answer":"鄙视","chinese_trad_full":"我們不能鄙視任何誠實勞動的人。","chinese_trad_cloze":"我們不能___任何誠實勞動的人。","chinese_trad_answer":"鄙視","spanish_full":"No debemos despreciar a nadie que trabaje honestamente.","spanish_cloze":"No debemos ___ a nadie que trabaje honestamente.","spanish_answer":"despreciar","pinyin":"Wǒmen bù néng bǐshì rènhé chéngshí láodòng de rén."},{"id":"hsk6_98","level":6,"module":"HSK6","chinese_simp_full":"这种管理制度存在明显的弊病。","chinese_simp_cloze":"这种管理制度存在明显的___。","chinese_simp_answer":"弊病","chinese_trad_full":"這種管理制度存在明顯的弊病。","chinese_trad_cloze":"這種管理制度存在明顯的___。","chinese_trad_answer":"弊病","spanish_full":"Este sistema de gestión presenta vicios evidentes.","spanish_cloze":"Este sistema de gestión presenta ___ evidentes.","spanish_answer":"vicios","pinyin":"Zhè zhǒng guǎnlǐ zhìdù cúnzài míngxiǎn de bìbìng.","spanish_alternatives":["defectos"]},{"id":"hsk6_99","level":6,"module":"HSK6","chinese_simp_full":"改革的目的是消除制度中的弊端。","chinese_simp_cloze":"改革的目的是消除制度中的___。","chinese_simp_answer":"弊端","chinese_trad_full":"改革的目的是消除制度中的弊端。","chinese_trad_cloze":"改革的目的是消除制度中的___。","chinese_trad_answer":"弊端","spanish_full":"El objetivo de la reforma es eliminar los abusos del sistema.","spanish_cloze":"El objetivo de la reforma es eliminar los ___ del sistema.","spanish_answer":"abusos","pinyin":"Gǎigé de mùdì shì xiāochú zhìdù zhōng de bìduān.","spanish_alternatives":["inconvenientes"]},{"id":"hsk6_100","level":6,"module":"HSK6","chinese_simp_full":"她伸开双臂，拥抱了女儿。","chinese_simp_cloze":"她伸开双___，拥抱了女儿。","chinese_simp_answer":"臂","chinese_trad_full":"她伸開雙臂，擁抱了女兒。","chinese_trad_cloze":"她伸開雙___，擁抱了女兒。","chinese_trad_answer":"臂","spanish_full":"Abrió los brazos y abrazó a su hija.","spanish_cloze":"Abrió los ___ y abrazó a su hija.","spanish_answer":"brazos","pinyin":"Tā shēn kāi shuāng bì, yōngbào le nǚ'ér."},{"id":"hsk6_101","level":6,"module":"HSK6","chinese_simp_full":"山区交通闭塞，孩子们上学要走很远的路。","chinese_simp_cloze":"山区交通___，孩子们上学要走很远的路。","chinese_simp_answer":"闭塞","chinese_trad_full":"山區交通閉塞，孩子們上學要走很遠的路。","chinese_trad_cloze":"山區交通___，孩子們上學要走很遠的路。","chinese_trad_answer":"閉塞","spanish_full":"En la zona montañosa las comunicaciones están aisladas y los niños caminan mucho para ir a la escuela.","spanish_cloze":"En la zona montañosa las comunicaciones están ___ y los niños caminan mucho para ir a la escuela.","spanish_answer":"aisladas","pinyin":"Shānqū jiāotōng bìsè, háizimen shàngxué yào zǒu hěn yuǎn de lù.","spanish_alternatives":["bloqueadas"]},{"id":"hsk6_102","level":6,"module":"HSK6","chinese_simp_full":"奶奶坐在门口编织毛衣。","chinese_simp_cloze":"奶奶坐在门口___毛衣。","chinese_simp_answer":"编织","chinese_trad_full":"奶奶坐在門口編織毛衣。","chinese_trad_cloze":"奶奶坐在門口___毛衣。","chinese_trad_answer":"編織","spanish_full":"La abuela se sienta en la puerta tejiendo un suéter.","spanish_cloze":"La abuela se sienta en la puerta ___ un suéter.","spanish_answer":"tejiendo","pinyin":"Nǎinai zuò zài ménkǒu biānzhī máoyī.","spanish_alternatives":["tejido"]},{"id":"hsk6_103","level":6,"module":"HSK6","chinese_simp_full":"他自愿到边疆工作，一去就是十年。","chinese_simp_cloze":"他自愿到___工作，一去就是十年。","chinese_simp_answer":"边疆","chinese_trad_full":"他自願到邊疆工作，一去就是十年。","chinese_trad_cloze":"他自願到___工作，一去就是十年。","chinese_trad_answer":"邊疆","spanish_full":"Se fue por voluntad propia a trabajar a la frontera y estuvo diez años.","spanish_cloze":"Se fue por voluntad propia a trabajar a la ___ y estuvo diez años.","spanish_answer":"frontera","pinyin":"Tā zìyuàn dào biānjiāng gōngzuò, yī qù jiùshì shí nián."},{"id":"hsk6_104","level":6,"module":"HSK6","chinese_simp_full":"两国在边界地区开设了贸易市场。","chinese_simp_cloze":"两国在___地区开设了贸易市场。","chinese_simp_answer":"边界","chinese_trad_full":"兩國在邊界地區開設了貿易市場。","chinese_trad_cloze":"兩國在___地區開設了貿易市場。","chinese_trad_answer":"邊界","spanish_full":"Los dos países instalaron un mercado comercial en la zona limítrofe.","spanish_cloze":"Los dos países instalaron un mercado comercial en la zona ___.","spanish_answer":"limítrofe","pinyin":"Liǎng guó zài biānjiè dìqū kāishè le màoyì shìchǎng.","spanish_alternatives":["fronteriza"]},{"id":"hsk6_105","level":6,"module":"HSK6","chinese_simp_full":"走私活动在边境很猖獗。","chinese_simp_cloze":"走私活动在___很猖獗。","chinese_simp_answer":"边境","chinese_trad_full":"走私活動在邊境很猖獗。","chinese_trad_cloze":"走私活動在___很猖獗。","chinese_trad_answer":"邊境","spanish_full":"El contrabando está muy activo en la frontera.","spanish_cloze":"El contrabando está muy activo en la ___.","spanish_answer":"frontera","pinyin":"Zǒusī huódòng zài biānjìng hěn chāngjué."},{"id":"hsk6_106","level":6,"module":"HSK6","chinese_simp_full":"他站在悬崖的边缘，不敢往下看。","chinese_simp_cloze":"他站在悬崖的___，不敢往下看。","chinese_simp_answer":"边缘","chinese_trad_full":"他站在懸崖的邊緣，不敢往下看。","chinese_trad_cloze":"他站在懸崖的___，不敢往下看。","chinese_trad_answer":"邊緣","spanish_full":"Parado al borde del precipicio, no se atrevía a mirar hacia abajo.","spanish_cloze":"Parado al ___ del precipicio, no se atrevía a mirar hacia abajo.","spanish_answer":"borde","pinyin":"Tā zhàn zài xuányá de biānyuán, bù gǎn wǎngxià kàn.","spanish_alternatives":["margen"]},{"id":"hsk6_107","level":6,"module":"HSK6","chinese_simp_full":"老师的话一直鞭策着我前进。","chinese_simp_cloze":"老师的话一直___着我前进。","chinese_simp_answer":"鞭策","chinese_trad_full":"老師的話一直鞭策著我前進。","chinese_trad_cloze":"老師的話一直___著我前進。","chinese_trad_answer":"鞭策","spanish_full":"Las palabras del profesor me han impulsado a seguir adelante.","spanish_cloze":"Las palabras del profesor me han ___ a seguir adelante.","spanish_answer":"impulsado","pinyin":"Lǎoshī de huà yīzhí biāncèzhe wǒ qiánjìn.","spanish_alternatives":["estimulado"]},{"id":"hsk6_108","level":6,"module":"HSK6","chinese_simp_full":"这只皮箱被压得很扁。","chinese_simp_cloze":"这只皮箱被压得很___。","chinese_simp_answer":"扁","chinese_trad_full":"這隻皮箱被壓得很扁。","chinese_trad_cloze":"這隻皮箱被壓得很___。","chinese_trad_answer":"扁","spanish_full":"Esta maleta quedó muy aplastada.","spanish_cloze":"Esta maleta quedó muy ___.","spanish_answer":"aplastada","pinyin":"Zhè zhǐ píxiāng bèi yā de hěn biǎn.","spanish_alternatives":["chata"]},{"id":"hsk6_109","level":6,"module":"HSK6","chinese_simp_full":"不要为了抬高自己而贬低别人。","chinese_simp_cloze":"不要为了抬高自己而___别人。","chinese_simp_answer":"贬低","chinese_trad_full":"不要為了抬高自己而貶低別人。","chinese_trad_cloze":"不要為了抬高自己而___別人。","chinese_trad_answer":"貶低","spanish_full":"No hay que denigrar a los demás para quedar bien uno.","spanish_cloze":"No hay que ___ a los demás para quedar bien uno.","spanish_answer":"denigrar","pinyin":"Búyào wèile táigāo zìjǐ ér biǎndī biérén.","spanish_alternatives":["menospreciar"]},{"id":"hsk6_110","level":6,"module":"HSK6","chinese_simp_full":"这个词在这里带有贬义。","chinese_simp_cloze":"这个词在这里带有___。","chinese_simp_answer":"贬义","chinese_trad_full":"這個詞在這裡帶有貶義。","chinese_trad_cloze":"這個詞在這裡帶有___。","chinese_trad_answer":"貶義","spanish_full":"Esta palabra tiene aquí una connotación negativa.","spanish_cloze":"Esta palabra tiene aquí una ___.","spanish_answer":"connotación negativa","pinyin":"Zhège cí zài zhèlǐ dàiyǒu biǎnyì.","spanish_alternatives":["sentido negativo"]},{"id":"hsk6_111","level":6,"module":"HSK6","chinese_simp_full":"地铁的开通给市民带来很大便利。","chinese_simp_cloze":"地铁的开通给市民带来很大___。","chinese_simp_answer":"便利","chinese_trad_full":"地鐵的開通給市民帶來很大便利。","chinese_trad_cloze":"地鐵的開通給市民帶來很大___。","chinese_trad_answer":"便利","spanish_full":"La apertura del subterráneo trajo mucha comodidad a los vecinos.","spanish_cloze":"La apertura del subterráneo trajo mucha ___ a los vecinos.","spanish_answer":"comodidad","pinyin":"Dìtiě de kāitōng gěi shìmín dàilái hěn dà biànlì.","spanish_alternatives":["conveniencia"]},{"id":"hsk6_112","level":6,"module":"HSK6","chinese_simp_full":"他出门前给我留了一张便条。","chinese_simp_cloze":"他出门前给我留了一张___。","chinese_simp_answer":"便条","chinese_trad_full":"他出門前給我留了一張便條。","chinese_trad_cloze":"他出門前給我留了一張___。","chinese_trad_answer":"便條","spanish_full":"Antes de salir me dejó una notita.","spanish_cloze":"Antes de salir me dejó una ___.","spanish_answer":"notita","pinyin":"Tā chūmén qián gěi wǒ liú le yī zhāng biàntiáo.","spanish_alternatives":["nota"]},{"id":"hsk6_113","level":6,"module":"HSK6","chinese_simp_full":"这本词典按拼音排列，便于查找。","chinese_simp_cloze":"这本词典按拼音排列，___查找。","chinese_simp_answer":"便于","chinese_trad_full":"這本詞典按拼音排列，便於查找。","chinese_trad_cloze":"這本詞典按拼音排列，___查找。","chinese_trad_answer":"便於","spanish_full":"Este diccionario está ordenado por pinyin, lo que facilita la búsqueda.","spanish_cloze":"Este diccionario está ordenado por pinyin, lo que ___.","spanish_answer":"facilita la búsqueda","pinyin":"Zhè běn cídiǎn àn pīnyīn páiliè, biànyú cházhǎo.","spanish_alternatives":["hace fácil la búsqueda"]},{"id":"hsk6_114","level":6,"module":"HSK6","chinese_simp_full":"家里突然发生了变故，他只好辍学。","chinese_simp_cloze":"家里突然发生了___，他只好辍学。","chinese_simp_answer":"变故","chinese_trad_full":"家裡突然發生了變故，他只好輟學。","chinese_trad_cloze":"家裡突然發生了___，他只好輟學。","chinese_trad_answer":"變故","spanish_full":"En su familia ocurrió de repente una desgracia y tuvo que dejar los estudios.","spanish_cloze":"En su familia ocurrió de repente una ___ y tuvo que dejar los estudios.","spanish_answer":"desgracia","pinyin":"Jiā lǐ tūrán fāshēng le biàngù, tā zhǐhǎo chuòxué.","spanish_alternatives":["imprevisto"]},{"id":"hsk6_115","level":6,"module":"HSK6","chinese_simp_full":"这座小城经历了巨大的变迁。","chinese_simp_cloze":"这座小城经历了巨大的___。","chinese_simp_answer":"变迁","chinese_trad_full":"這座小城經歷了巨大的變遷。","chinese_trad_cloze":"這座小城經歷了巨大的___。","chinese_trad_answer":"變遷","spanish_full":"Esta pequeña ciudad atravesó enormes transformaciones.","spanish_cloze":"Esta pequeña ciudad atravesó enormes ___.","spanish_answer":"transformaciones","pinyin":"Zhè zuò xiǎochéng jīnglì le jùdà de biànqiān.","spanish_alternatives":["cambios"]},{"id":"hsk6_116","level":6,"module":"HSK6","chinese_simp_full":"天气太热，食物容易变质。","chinese_simp_cloze":"天气太热，食物容易___。","chinese_simp_answer":"变质","chinese_trad_full":"天氣太熱，食物容易變質。","chinese_trad_cloze":"天氣太熱，食物容易___。","chinese_trad_answer":"變質","spanish_full":"Con tanto calor, la comida se echa a perder fácilmente.","spanish_cloze":"Con tanto calor, la comida ___ fácilmente.","spanish_answer":"se echa a perder","pinyin":"Tiānqì tài rè, shíwù róngyì biànzhì.","spanish_alternatives":["se descompone"]},{"id":"hsk6_117","level":6,"module":"HSK6","chinese_simp_full":"现场只剩下半截车牌，很难辨认。","chinese_simp_cloze":"现场只剩下半截车牌，很难___。","chinese_simp_answer":"辨认","chinese_trad_full":"現場只剩下半截車牌，很難辨認。","chinese_trad_cloze":"現場只剩下半截車牌，很難___。","chinese_trad_answer":"辨認","spanish_full":"En el lugar solo quedó media patente, muy difícil de identificar.","spanish_cloze":"En el lugar solo quedó media patente, muy difícil de ___.","spanish_answer":"identificar","pinyin":"Xiànchǎng zhǐ shèngxià bànjié chēpái, hěn nán biànrèn.","spanish_alternatives":["reconocer"]},{"id":"hsk6_118","level":6,"module":"HSK6","chinese_simp_full":"律师依法为被告辩护。","chinese_simp_cloze":"律师依法为被告___。","chinese_simp_answer":"辩护","chinese_trad_full":"律師依法為被告辯護。","chinese_trad_cloze":"律師依法為被告___。","chinese_trad_answer":"辯護","spanish_full":"El abogado defiende al acusado conforme a la ley.","spanish_cloze":"El abogado ___ al acusado conforme a la ley.","spanish_answer":"defiende","pinyin":"Lǜshī yīfǎ wèi bèigào biànhù.","spanish_alternatives":["aboga por"]},{"id":"hsk6_119","level":6,"module":"HSK6","chinese_simp_full":"事实面前，任何辩解都是多余的。","chinese_simp_cloze":"事实面前，任何___都是多余的。","chinese_simp_answer":"辩解","chinese_trad_full":"事實面前，任何辯解都是多餘的。","chinese_trad_cloze":"事實面前，任何___都是多餘的。","chinese_trad_answer":"辯解","spanish_full":"Ante los hechos, cualquier justificativo sobra.","spanish_cloze":"Ante los hechos, cualquier ___ sobra.","spanish_answer":"justificativo","pinyin":"Shìshí miànqián, rènhé biànjiě dōu shì duōyú de.","spanish_alternatives":["excusa"]},{"id":"hsk6_120","level":6,"module":"HSK6","chinese_simp_full":"我们要用辩证的眼光看问题。","chinese_simp_cloze":"我们要用___的眼光看问题。","chinese_simp_answer":"辩证","chinese_trad_full":"我們要用辯證的眼光看問題。","chinese_trad_cloze":"我們要用___的眼光看問題。","chinese_trad_answer":"辯證","spanish_full":"Debemos mirar los problemas con una mirada dialéctica.","spanish_cloze":"Debemos mirar los problemas con una mirada ___.","spanish_answer":"dialéctica","pinyin":"Wǒmen yào yòng biànzhèng de yǎnguāng kàn wèntí."},{"id":"hsk6_121","level":6,"module":"HSK6","chinese_simp_full":"小女孩扎着两条长长的辫子。","chinese_simp_cloze":"小女孩扎着两条长长的___。","chinese_simp_answer":"辫子","chinese_trad_full":"小女孩扎著兩條長長的辮子。","chinese_trad_cloze":"小女孩扎著兩條長長的___。","chinese_trad_answer":"辮子","spanish_full":"La nena lleva dos trenzas larguísimas.","spanish_cloze":"La nena lleva dos ___ larguísimas.","spanish_answer":"trenzas","pinyin":"Xiǎo nǚhái zhāzhe liǎng tiáo chángcháng de biànzi."},{"id":"hsk6_122","level":6,"module":"HSK6","chinese_simp_full":"这家连锁店的分店遍布全国。","chinese_simp_cloze":"这家连锁店的分店___全国。","chinese_simp_answer":"遍布","chinese_trad_full":"這家連鎖店的分店遍佈全國。","chinese_trad_cloze":"這家連鎖店的分店___全國。","chinese_trad_answer":"遍佈","spanish_full":"Las sucursales de esta cadena están extendidas por todo el país.","spanish_cloze":"Las sucursales de esta cadena están ___.","spanish_answer":"extendidas por todo el país","pinyin":"Zhè jiā liánsuǒdiàn de fēndiàn biànbù quánguó.","spanish_alternatives":["en todo el país"]},{"id":"hsk6_123","level":6,"module":"HSK6","chinese_simp_full":"生物教室里陈列着各种蝴蝶标本。","chinese_simp_cloze":"生物教室里陈列着各种蝴蝶___。","chinese_simp_answer":"标本","chinese_trad_full":"生物教室裡陳列著各種蝴蝶標本。","chinese_trad_cloze":"生物教室裡陳列著各種蝴蝶___。","chinese_trad_answer":"標本","spanish_full":"En el aula de biología hay exhibidos especímenes de toda clase de mariposas.","spanish_cloze":"En el aula de biología hay exhibidos ___ de toda clase de mariposas.","spanish_answer":"especímenes","pinyin":"Shēngwù jiàoshì lǐ chénlièzhe gè zhǒng húdié biāoběn."},{"id":"hsk6_124","level":6,"module":"HSK6","chinese_simp_full":"他在地图上做了标记。","chinese_simp_cloze":"他在地图上做了___。","chinese_simp_answer":"标记","chinese_trad_full":"他在地圖上做了標記。","chinese_trad_cloze":"他在地圖上做了___。","chinese_trad_answer":"標記","spanish_full":"Hizo marcas en el mapa.","spanish_cloze":"Hizo ___ en el mapa.","spanish_answer":"marcas","pinyin":"Tā zài dìtú shàng zuò le biāojì.","spanish_alternatives":["señales"]},{"id":"hsk6_125","level":6,"module":"HSK6","chinese_simp_full":"这篇文章的标题吸引了很多读者。","chinese_simp_cloze":"这篇文章的___吸引了很多读者。","chinese_simp_answer":"标题","chinese_trad_full":"這篇文章的標題吸引了很多讀者。","chinese_trad_cloze":"這篇文章的___吸引了很多讀者。","chinese_trad_answer":"標題","spanish_full":"El título de este artículo atrajo a muchos lectores.","spanish_cloze":"El ___ de este artículo atrajo a muchos lectores.","spanish_answer":"título","pinyin":"Zhè piān wénzhāng de biāotí xīyǐn le hěn duō dúzhě."},{"id":"hsk6_126","level":6,"module":"HSK6","chinese_simp_full":"委员会对这项提案进行了表决。","chinese_simp_cloze":"委员会对这项提案进行了___。","chinese_simp_answer":"表决","chinese_trad_full":"委員會對這項提案進行了表決。","chinese_trad_cloze":"委員會對這項提案進行了___。","chinese_trad_answer":"表決","spanish_full":"El comité sometió a votación esta propuesta.","spanish_cloze":"El comité ___ esta propuesta.","spanish_answer":"sometió a votación","pinyin":"Wěiyuánhuì duì zhè xiàng tí'àn jìnxíng le biǎojué.","spanish_alternatives":["votó"]},{"id":"hsk6_127","level":6,"module":"HSK6","chinese_simp_full":"到目前为止，官方还没有表态。","chinese_simp_cloze":"到目前为止，官方还没有___。","chinese_simp_answer":"表态","chinese_trad_full":"到目前為止，官方還沒有表態。","chinese_trad_cloze":"到目前為止，官方還沒有___。","chinese_trad_answer":"表態","spanish_full":"Hasta ahora, las autoridades todavía no se han pronunciado.","spanish_cloze":"Hasta ahora, las autoridades todavía no ___.","spanish_answer":"se han pronunciado","pinyin":"Dào mùqián wéizhǐ, guānfāng hái méiyǒu biǎotài.","spanish_alternatives":["han dado su postura"]},{"id":"hsk6_128","level":6,"module":"HSK6","chinese_simp_full":"政府表彰了抗震救灾的英雄们。","chinese_simp_cloze":"政府___了抗震救灾的英雄们。","chinese_simp_answer":"表彰","chinese_trad_full":"政府表彰了抗震救災的英雄們。","chinese_trad_cloze":"政府___了抗震救災的英雄們。","chinese_trad_answer":"表彰","spanish_full":"El gobierno condecoró a los héroes del rescate tras el terremoto.","spanish_cloze":"El gobierno ___ a los héroes del rescate tras el terremoto.","spanish_answer":"condecoró","pinyin":"Zhèngfǔ biǎozhāng le kàngzhèn jiùzāi de yīngxióngmen.","spanish_alternatives":["reconoció a"]},{"id":"hsk6_129","level":6,"module":"HSK6","chinese_simp_full":"有话就说出来，别憋在心里。","chinese_simp_cloze":"有话就说出来，别___在心里。","chinese_simp_answer":"憋","chinese_trad_full":"有話就說出來，別憋在心裡。","chinese_trad_cloze":"有話就說出來，別___在心裡。","chinese_trad_answer":"憋","spanish_full":"Si tienes algo que decir, dilo; no lo guardes por dentro.","spanish_cloze":"Si tienes algo que decir, dilo; ___ por dentro.","spanish_answer":"no lo guardes","pinyin":"Yǒu huà jiù shuō chūlái, bié biē zài xīnlǐ.","spanish_alternatives":["no te lo tragues"]},{"id":"hsk6_130","level":6,"module":"HSK6","chinese_simp_full":"他们在郊区买了一栋别墅。","chinese_simp_cloze":"他们在郊区买了一栋___。","chinese_simp_answer":"别墅","chinese_trad_full":"他們在郊區買了一棟別墅。","chinese_trad_cloze":"他們在郊區買了一棟___。","chinese_trad_answer":"別墅","spanish_full":"Compraron una casa quinta en las afueras.","spanish_cloze":"Compraron una ___ en las afueras.","spanish_answer":"casa quinta","pinyin":"Tāmen zài jiāoqū mǎi le yī dòng biéshù.","spanish_alternatives":["villa"]},{"id":"hsk6_131","level":6,"module":"HSK6","chinese_simp_full":"这家咖啡馆的装修十分别致。","chinese_simp_cloze":"这家咖啡馆的装修十分___。","chinese_simp_answer":"别致","chinese_trad_full":"這家咖啡館的裝修十分別致。","chinese_trad_cloze":"這家咖啡館的裝修十分___。","chinese_trad_answer":"別緻","spanish_full":"La decoración de esta cafetería es sumamente original.","spanish_cloze":"La decoración de esta cafetería es sumamente ___.","spanish_answer":"original","pinyin":"Zhè jiā kāfēiguǎn de zhuāngxiū shíbié biézhì.","spanish_alternatives":["pintoresca"]},{"id":"hsk6_132","level":6,"module":"HSK6","chinese_simp_full":"两人吵过一架后，见面总觉得别扭。","chinese_simp_cloze":"两人吵过一架后，见面总觉得___。","chinese_simp_answer":"别扭","chinese_trad_full":"兩人吵過一架後，見面總覺得彆扭。","chinese_trad_cloze":"兩人吵過一架後，見面總覺得___。","chinese_trad_answer":"彆扭","spanish_full":"Después de pelearse una vez, se sienten incómodos cada vez que se ven.","spanish_cloze":"Después de pelearse una vez, se sienten ___ cada vez que se ven.","spanish_answer":"incómodos","pinyin":"Liǎng rén chǎoguò yī jià hòu, jiànmiàn zǒng juéde bièniu."},{"id":"hsk6_133","level":6,"module":"HSK6","chinese_simp_full":"这家百年老店濒临破产。","chinese_simp_cloze":"这家百年老店___破产。","chinese_simp_answer":"濒临","chinese_trad_full":"這家百年老店瀕臨破產。","chinese_trad_cloze":"這家百年老店___破產。","chinese_trad_answer":"瀕臨","spanish_full":"Este comercio centenario está al borde de la quiebra.","spanish_cloze":"Este comercio centenario está ___ la quiebra.","spanish_answer":"al borde de","pinyin":"Zhè jiā bǎinián lǎodiàn bīnlín pòchǎn."},{"id":"hsk6_134","level":6,"module":"HSK6","chinese_simp_full":"昨晚的冰雹把菜地的菜全砸坏了。","chinese_simp_cloze":"昨晚的___把菜地的菜全砸坏了。","chinese_simp_answer":"冰雹","chinese_trad_full":"昨晚的冰雹把菜地的菜全砸壞了。","chinese_trad_cloze":"昨晚的___把菜地的菜全砸壞了。","chinese_trad_answer":"冰雹","spanish_full":"El granizo de anoche destrozó todas las verduras de la huerta.","spanish_cloze":"El ___ de anoche destrozó todas las verduras de la huerta.","spanish_answer":"granizo","pinyin":"Zuówǎn de bīngbáo bǎ càidì de cài quán zá huài le."},{"id":"hsk6_135","level":6,"module":"HSK6","chinese_simp_full":"他这次考试的成绩是丙等。","chinese_simp_cloze":"他这次考试的成绩是___等。","chinese_simp_answer":"丙","chinese_trad_full":"他這次考試的成績是丙等。","chinese_trad_cloze":"他這次考試的成績是___等。","chinese_trad_answer":"丙","spanish_full":"Su calificación en este examen es de categoría C.","spanish_cloze":"Su calificación en este examen es de categoría ___.","spanish_answer":"C","pinyin":"Tā zhè cì kǎoshì de chéngjì shì bǐng děng.","spanish_alternatives":["c"]},{"id":"hsk6_136","level":6,"module":"HSK6","chinese_simp_full":"成功并非偶然，而是努力的结果。","chinese_simp_cloze":"成功___偶然，而是努力的结果。","chinese_simp_answer":"并非","chinese_trad_full":"成功並非偶然，而是努力的結果。","chinese_trad_cloze":"成功___偶然，而是努力的結果。","chinese_trad_answer":"並非","spanish_full":"El éxito no es en absoluto casualidad, sino el resultado del esfuerzo.","spanish_cloze":"El éxito ___ casualidad, sino el resultado del esfuerzo.","spanish_answer":"no es en absoluto","pinyin":"Chénggōng bìngfēi ǒurán, érshì nǔlì de jiéguǒ.","spanish_alternatives":["no es precisamente"]},{"id":"hsk6_137","level":6,"module":"HSK6","chinese_simp_full":"两队积分并列第一。","chinese_simp_cloze":"两队积分___第一。","chinese_simp_answer":"并列","chinese_trad_full":"兩隊積分並列第一。","chinese_trad_cloze":"兩隊積分___第一。","chinese_trad_answer":"並列","spanish_full":"Los dos equipos empataron en el primer puesto.","spanish_cloze":"Los dos equipos ___ en el primer puesto.","spanish_answer":"empataron","pinyin":"Liǎng duì jīfēn bìngliè dì yī.","spanish_alternatives":["quedaron igualados"]},{"id":"hsk6_138","level":6,"module":"HSK6","chinese_simp_full":"资本家剥削工人的剩余价值。","chinese_simp_cloze":"资本家___工人的剩余价值。","chinese_simp_answer":"剥削","chinese_trad_full":"資本家剝削工人的剩餘價值。","chinese_trad_cloze":"資本家___工人的剩餘價值。","chinese_trad_answer":"剝削","spanish_full":"Los capitalistas explotan la plusvalía de los obreros.","spanish_cloze":"Los capitalistas ___ la plusvalía de los obreros.","spanish_answer":"explotan","pinyin":"Zīběnjiā bōxuē gōngrén de shèngyú jiàzhí."},{"id":"hsk6_139","level":6,"module":"HSK6","chinese_simp_full":"他轻轻拨开草丛，发现了一只小兔子。","chinese_simp_cloze":"他轻轻___开草丛，发现了一只小兔子。","chinese_simp_answer":"拨","chinese_trad_full":"他輕輕撥開草叢，發現了一隻小兔子。","chinese_trad_cloze":"他輕輕___開草叢，發現了一隻小兔子。","chinese_trad_answer":"撥","spanish_full":"Apartó suavemente la hierba y descubrió un conejito.","spanish_cloze":"___ suavemente la hierba y descubrió un conejito.","spanish_answer":"Apartó","pinyin":"Tā qīngqīng bō kāi cǎocóng, fāxiàn le yī zhǐ xiǎo tùzi.","spanish_alternatives":["Corrió a un lado"]},{"id":"hsk6_140","level":6,"module":"HSK6","chinese_simp_full":"春天是播种的好季节。","chinese_simp_cloze":"春天是___的好季节。","chinese_simp_answer":"播种","chinese_trad_full":"春天是播種的好季節。","chinese_trad_cloze":"春天是___的好季節。","chinese_trad_answer":"播種","spanish_full":"La primavera es la mejor estación para sembrar.","spanish_cloze":"La primavera es la mejor estación para ___.","spanish_answer":"sembrar","pinyin":"Chūntiān shì bōzhǒng de hǎo jìjié."},{"id":"hsk6_141","level":6,"module":"HSK6","chinese_simp_full":"海边的波浪一浪高过一浪。","chinese_simp_cloze":"海边的___一浪高过一浪。","chinese_simp_answer":"波浪","chinese_trad_full":"海邊的波浪一浪高過一浪。","chinese_trad_cloze":"海邊的___一浪高過一浪。","chinese_trad_answer":"波浪","spanish_full":"Las olas en la playa crecen una tras otra.","spanish_cloze":"Las ___ en la playa crecen una tras otra.","spanish_answer":"olas","pinyin":"Hǎibiān de bōlàng yī làng gāo guò yī làng."},{"id":"hsk6_142","level":6,"module":"HSK6","chinese_simp_full":"夜里，船在波涛中艰难前行。","chinese_simp_cloze":"夜里，船在___中艰难前行。","chinese_simp_answer":"波涛","chinese_trad_full":"夜裡，船在波濤中艱難前行。","chinese_trad_cloze":"夜裡，船在___中艱難前行。","chinese_trad_answer":"波濤","spanish_full":"De noche, el barco avanzaba con dificultad entre el oleaje.","spanish_cloze":"De noche, el barco avanzaba con dificultad entre el ___.","spanish_answer":"oleaje","pinyin":"Yè lǐ, chuán zài bōtāo zhōng jiānnán qiánxíng."},{"id":"hsk6_143","level":6,"module":"HSK6","chinese_simp_full":"伯母做的饺子最好吃。","chinese_simp_cloze":"___做的饺子最好吃。","chinese_simp_answer":"伯母","chinese_trad_full":"伯母做的餃子最好吃。","chinese_trad_cloze":"___做的餃子最好吃。","chinese_trad_answer":"伯母","spanish_full":"Los jiaozi que hace la tía son los más ricos.","spanish_cloze":"Los jiaozi que hace la ___ son los más ricos.","spanish_answer":"tía","pinyin":"Bómǔ zuò de jiǎozi zuì hǎochī."},{"id":"hsk6_144","level":6,"module":"HSK6","chinese_simp_full":"中华文化博大精深，值得深入研究。","chinese_simp_cloze":"中华文化___，值得深入研究。","chinese_simp_answer":"博大精深","chinese_trad_full":"中華文化博大精深，值得深入研究。","chinese_trad_cloze":"中華文化___，值得深入研究。","chinese_trad_answer":"博大精深","spanish_full":"La cultura china es vasta y profunda; vale la pena estudiarla a fondo.","spanish_cloze":"La cultura china es ___; vale la pena estudiarla a fondo.","spanish_answer":"vasta y profunda","pinyin":"Zhōnghuá wénhuà bódàjīngshēn, zhídé shēnrù yánjiū."},{"id":"hsk6_145","level":6,"module":"HSK6","chinese_simp_full":"本月将举办国际图书博览会。","chinese_simp_cloze":"本月将举办国际图书___。","chinese_simp_answer":"博览会","chinese_trad_full":"本月將舉辦國際圖書博覽會。","chinese_trad_cloze":"本月將舉辦國際圖書___。","chinese_trad_answer":"博覽會","spanish_full":"Este mes se organizará la feria internacional del libro.","spanish_cloze":"Este mes se organizará la ___ internacional del libro.","spanish_answer":"feria","pinyin":"Běn yuè jiāng jǔbàn guójì túshū bólǎnhuì.","spanish_alternatives":["exposición"]},{"id":"hsk6_146","level":6,"module":"HSK6","chinese_simp_full":"警察与歹徒搏斗了很久。","chinese_simp_cloze":"警察与歹徒___了很久。","chinese_simp_answer":"搏斗","chinese_trad_full":"警察與歹徒搏鬥了很久。","chinese_trad_cloze":"警察與歹徒___了很久。","chinese_trad_answer":"搏鬥","spanish_full":"El policía luchó largo rato contra el delincuente.","spanish_cloze":"El policía ___ largo rato contra el delincuente.","spanish_answer":"luchó","pinyin":"Jǐngchá yǔ dǎitú bódòu le hěn jiǔ."},{"id":"hsk6_147","level":6,"module":"HSK6","chinese_simp_full":"他的数学基础比较薄弱。","chinese_simp_cloze":"他的数学基础比较___。","chinese_simp_answer":"薄弱","chinese_trad_full":"他的數學基礎比較薄弱。","chinese_trad_cloze":"他的數學基礎比較___。","chinese_trad_answer":"薄弱","spanish_full":"Su base en matemática es bastante floja.","spanish_cloze":"Su base en matemática es bastante ___.","spanish_answer":"floja","pinyin":"Tā de shùxué jīchǔ bǐjiào bóruò.","spanish_alternatives":["débil"]},{"id":"hsk6_148","level":6,"module":"HSK6","chinese_simp_full":"他不顾家人的反对，坚持自己的选择。","chinese_simp_cloze":"他___家人的反对，坚持自己的选择。","chinese_simp_answer":"不顾","chinese_trad_full":"他不顧家人的反對，堅持自己的選擇。","chinese_trad_cloze":"他___家人的反對，堅持自己的選擇。","chinese_trad_answer":"不顧","spanish_full":"Sin hacer caso de la oposición de su familia, mantuvo su decisión.","spanish_cloze":"___ la oposición de su familia, mantuvo su decisión.","spanish_answer":"Sin hacer caso de","pinyin":"Tā bùgù jiārén de fǎnduì, jiānchí zìjǐ de xuǎnzé.","spanish_alternatives":["Ignorando"]},{"id":"hsk6_149","level":6,"module":"HSK6","chinese_simp_full":"他不愧是我们班成绩最好的学生。","chinese_simp_cloze":"他___是我们班成绩最好的学生。","chinese_simp_answer":"不愧","chinese_trad_full":"他不愧是我們班成績最好的學生。","chinese_trad_cloze":"他___是我們班成績最好的學生。","chinese_trad_answer":"不愧","spanish_full":"Realmente merece llamarse el estudiante de mejores notas de nuestra clase.","spanish_cloze":"___ llamarse el estudiante de mejores notas de nuestra clase.","spanish_answer":"Realmente merece","pinyin":"Tā búkuì shì wǒmen bān chéngjì zuì hǎo de xuésheng.","spanish_alternatives":["Bien merece"]},{"id":"hsk6_150","level":6,"module":"HSK6","chinese_simp_full":"以为会下雨，不料天气转晴了。","chinese_simp_cloze":"以为会下雨，___天气转晴了。","chinese_simp_answer":"不料","chinese_trad_full":"以為會下雨，不料天氣轉晴了。","chinese_trad_cloze":"以為會下雨，___天氣轉晴了。","chinese_trad_answer":"不料","spanish_full":"Creía que iba a llover, pero inesperadamente el tiempo despejó.","spanish_cloze":"Creía que iba a llover, pero ___ el tiempo despejó.","spanish_answer":"inesperadamente","pinyin":"Yǐwéi huì xiàyǔ, búliào tiānqì zhuǎnqíng le.","spanish_alternatives":["para sorpresa"]},{"id":"hsk6_151","level":6,"module":"HSK6","chinese_simp_full":"今年夏天热得不像话。","chinese_simp_cloze":"今年夏天热得___。","chinese_simp_answer":"不像话","chinese_trad_full":"今年夏天熱得不像話。","chinese_trad_cloze":"今年夏天熱得___。","chinese_trad_answer":"不像話","spanish_full":"Este verano hace un calor escandaloso.","spanish_cloze":"Este verano hace un calor ___.","spanish_answer":"escandaloso","pinyin":"Jīnnián xiàtiān rè de búxiànghuà.","spanish_alternatives":["inaudito"]},{"id":"hsk6_152","level":6,"module":"HSK6","chinese_simp_full":"他对这种小道消息不屑一顾。","chinese_simp_cloze":"他对这种小道消息___。","chinese_simp_answer":"不屑一顾","chinese_trad_full":"他對這種小道消息不屑一顧。","chinese_trad_cloze":"他對這種小道消息___。","chinese_trad_answer":"不屑一顧","spanish_full":"No digna ni una mirada a esos rumores.","spanish_cloze":"___ a esos rumores.","spanish_answer":"No digna ni una mirada","pinyin":"Tā duì zhè zhǒng xiǎodào xiāoxi búxièyīgù.","spanish_alternatives":["Desdeña"]},{"id":"hsk6_153","level":6,"module":"HSK6","chinese_simp_full":"母鲸在浅海哺乳幼鲸。","chinese_simp_cloze":"母鲸在浅海___幼鲸。","chinese_simp_answer":"哺乳","chinese_trad_full":"母鯨在淺海哺乳幼鯨。","chinese_trad_cloze":"母鯨在淺海___幼鯨。","chinese_trad_answer":"哺乳","spanish_full":"La ballena madre amamanta a su cría en aguas poco profundas.","spanish_cloze":"La ballena madre ___ a su cría en aguas poco profundas.","spanish_answer":"amamanta","pinyin":"Mǔjīng zài qiǎnhǎi bǔrǔ yòujīng."},{"id":"hsk6_154","level":6,"module":"HSK6","chinese_simp_full":"猫头鹰夜间捕捉老鼠。","chinese_simp_cloze":"猫头鹰夜间___老鼠。","chinese_simp_answer":"捕捉","chinese_trad_full":"貓頭鷹夜間捕捉老鼠。","chinese_trad_cloze":"貓頭鷹夜間___老鼠。","chinese_trad_answer":"捕捉","spanish_full":"El búho captura ratones por la noche.","spanish_cloze":"El búho ___ ratones por la noche.","spanish_answer":"captura","pinyin":"Māotóuyīng yèjiān bǔzhuō lǎoshǔ.","spanish_alternatives":["caza"]},{"id":"hsk6_155","level":6,"module":"HSK6","chinese_simp_full":"公司决定用奖金补偿员工的加班。","chinese_simp_cloze":"公司决定用奖金___员工的加班。","chinese_simp_answer":"补偿","chinese_trad_full":"公司決定用獎金補償員工的加班。","chinese_trad_cloze":"公司決定用獎金___員工的加班。","chinese_trad_answer":"補償","spanish_full":"La empresa decidió compensar las horas extras de los empleados con un premio.","spanish_cloze":"La empresa decidió ___ las horas extras de los empleados con un premio.","spanish_answer":"compensar","pinyin":"Gōngsī juédìng yòng jiǎngjīn bǔcháng yuángōng de jiābān.","spanish_alternatives":["indemnizar"]},{"id":"hsk6_156","level":6,"module":"HSK6","chinese_simp_full":"发现错误后，他立刻想办法补救。","chinese_simp_cloze":"发现错误后，他立刻想办法___。","chinese_simp_answer":"补救","chinese_trad_full":"發現錯誤後，他立刻想辦法補救。","chinese_trad_cloze":"發現錯誤後，他立刻想辦法___。","chinese_trad_answer":"補救","spanish_full":"Tras descubrir el error, se apuró a buscar la manera de remediarlo.","spanish_cloze":"Tras descubrir el error, se apuró a buscar la manera ___.","spanish_answer":"de remediarlo","pinyin":"Fāxiàn cuòwù hòu, tā lìkè xiǎng bànfǎ bǔjiù.","spanish_alternatives":["de arreglarlo"]},{"id":"hsk6_157","level":6,"module":"HSK6","chinese_simp_full":"政府给低收入家庭发放住房补贴。","chinese_simp_cloze":"政府给低收入家庭发放住房___。","chinese_simp_answer":"补贴","chinese_trad_full":"政府給低收入家庭發放住房補貼。","chinese_trad_cloze":"政府給低收入家庭發放住房___。","chinese_trad_answer":"補貼","spanish_full":"El gobierno otorga a las familias de bajos ingresos un subsidio de vivienda.","spanish_cloze":"El gobierno otorga a las familias de bajos ingresos un ___ de vivienda.","spanish_answer":"subsidio","pinyin":"Zhèngfǔ gěi dī shōurù jiātíng fāfàng zhùfáng bǔtiē.","spanish_alternatives":["asignación"]},{"id":"hsk6_158","level":6,"module":"HSK6","chinese_simp_full":"实在没有办法，他不得已才借钱应急。","chinese_simp_cloze":"实在没有办法，他___才借钱应急。","chinese_simp_answer":"不得已","chinese_trad_full":"實在沒有辦法，他不得已才借錢應急。","chinese_trad_cloze":"實在沒有辦法，他___才借錢應急。","chinese_trad_answer":"不得已","spanish_full":"Como realmente no había otra salida, se vio obligado a pedir dinero prestado.","spanish_cloze":"Como realmente no había otra salida, ___ a pedir dinero prestado.","spanish_answer":"se vio obligado","pinyin":"Shízài méiyǒu bànfǎ, tā bùdéyǐ cái jiè qián yìngjí.","spanish_alternatives":["no tuvo otra opción que"]},{"id":"hsk6_159","level":6,"module":"HSK6","chinese_simp_full":"你不妨先试穿一下再决定买不买。","chinese_simp_cloze":"你___先试穿一下再决定买不买。","chinese_simp_answer":"不妨","chinese_trad_full":"你不妨先試穿一下再決定買不買。","chinese_trad_cloze":"你___先試穿一下再決定買不買。","chinese_trad_answer":"不妨","spanish_full":"No está de más que te lo pruebes antes de decidir si lo compras.","spanish_cloze":"___ que te lo pruebes antes de decidir si lo compras.","spanish_answer":"No está de más","pinyin":"Nǐ bùfáng xiān shìchuān yīxià zài juédìng mǎi bu mǎi.","spanish_alternatives":["Podrías muy bien"]},{"id":"hsk6_160","level":6,"module":"HSK6","chinese_simp_full":"您太夸奖了，实在不敢当。","chinese_simp_cloze":"您太夸奖了，实在___。","chinese_simp_answer":"不敢当","chinese_trad_full":"您太誇獎了，實在不敢當。","chinese_trad_cloze":"您太誇獎了，實在___。","chinese_trad_answer":"不敢當","spanish_full":"Me halaga demasiado; en verdad no lo merezco.","spanish_cloze":"Me halaga demasiado; en verdad ___.","spanish_answer":"no lo merezco","pinyin":"Nín tài kuājiǎng le, shízài bùgǎndāng.","spanish_alternatives":["no se lo merece"]},{"id":"hsk6_161","level":6,"module":"HSK6","chinese_simp_full":"看到孩子的画，我不禁笑了起来。","chinese_simp_cloze":"看到孩子的画，我___笑了起来。","chinese_simp_answer":"不禁","chinese_trad_full":"看到孩子的畫，我不禁笑了起來。","chinese_trad_cloze":"看到孩子的畫，我___笑了起來。","chinese_trad_answer":"不禁","spanish_full":"Al ver el dibujo del niño, no pude evitar reírme.","spanish_cloze":"Al ver el dibujo del niño, ___ reírme.","spanish_answer":"no pude evitar","pinyin":"Kàndào háizi de huà, wǒ bùjīn xiào le qǐlái."},{"id":"hsk6_162","level":6,"module":"HSK6","chinese_simp_full":"过去的回忆不堪回首。","chinese_simp_cloze":"过去的回忆___回首。","chinese_simp_answer":"不堪","chinese_trad_full":"過去的回憶不堪回首。","chinese_trad_cloze":"過去的回憶___回首。","chinese_trad_answer":"不堪","spanish_full":"El pasado resulta insoportable al recordarlo.","spanish_cloze":"El pasado resulta ___ al recordarlo.","spanish_answer":"insoportable","pinyin":"Guòqù de huíyì bùkān huíshǒu.","spanish_alternatives":["demasiado doloroso"]},{"id":"hsk6_163","level":6,"module":"HSK6","chinese_simp_full":"他三个月就学会了西班牙语，真不可思议。","chinese_simp_cloze":"他三个月就学会了西班牙语，真___。","chinese_simp_answer":"不可思议","chinese_trad_full":"他三個月就學會了西班牙語，真不可思議。","chinese_trad_cloze":"他三個月就學會了西班牙語，真___。","chinese_trad_answer":"不可思議","spanish_full":"Aprendió español en solo tres meses; es realmente increíble.","spanish_cloze":"Aprendió español en solo tres meses; es realmente ___.","spanish_answer":"increíble","pinyin":"Tā sān gè yuè jiù xuéhuì le Xībānyáyǔ, zhēn bùkěsīyì.","spanish_alternatives":["inconcebible"]},{"id":"hsk6_164","level":6,"module":"HSK6","chinese_simp_full":"初次上台演讲，不免有些紧张。","chinese_simp_cloze":"初次上台演讲，___有些紧张。","chinese_simp_answer":"不免","chinese_trad_full":"初次上臺演講，不免有些緊張。","chinese_trad_cloze":"初次上臺演講，___有些緊張。","chinese_trad_answer":"不免","spanish_full":"Al debutar hablando en público, inevitablemente uno se pone algo nervioso.","spanish_cloze":"Al debutar hablando en público, ___ uno se pone algo nervioso.","spanish_answer":"inevitablemente","pinyin":"Chūcì shàngtái yǎnjiǎng, bùmiǎn yǒuxiē jǐnzhāng.","spanish_alternatives":["es inevitable que"]},{"id":"hsk6_165","level":6,"module":"HSK6","chinese_simp_full":"窗外不时传来鸟叫声。","chinese_simp_cloze":"窗外___传来鸟叫声。","chinese_simp_answer":"不时","chinese_trad_full":"窗外不時傳來鳥叫聲。","chinese_trad_cloze":"窗外___傳來鳥叫聲。","chinese_trad_answer":"不時","spanish_full":"De vez en cuando llegan cantos de pájaros desde la ventana.","spanish_cloze":"___ llegan cantos de pájaros desde la ventana.","spanish_answer":"De vez en cuando","pinyin":"Chuāng wài bùshí chuánlái niǎojiào shēng.","spanish_alternatives":["A cada rato"]},{"id":"hsk6_166","level":6,"module":"HSK6","chinese_simp_full":"为了赢得比赛，他不惜付出一切代价。","chinese_simp_cloze":"为了赢得比赛，他___付出一切代价。","chinese_simp_answer":"不惜","chinese_trad_full":"為了贏得比賽，他不惜付出一切代價。","chinese_trad_cloze":"為了贏得比賽，他___付出一切代價。","chinese_trad_answer":"不惜","spanish_full":"Para ganar la competencia, no escatima ningún sacrificio.","spanish_cloze":"Para ganar la competencia, ___ ningún sacrificio.","spanish_answer":"no escatima","pinyin":"Wèile yíngdé bǐsài, tā bùxī fùchū yīqiè dàijià.","spanish_alternatives":["está dispuesto a pagar"]},{"id":"hsk6_167","level":6,"module":"HSK6","chinese_simp_full":"两支队伍的实力不相上下。","chinese_simp_cloze":"两支队伍的实力___。","chinese_simp_answer":"不相上下","chinese_trad_full":"兩支隊伍的實力不相上下。","chinese_trad_cloze":"兩支隊伍的實力___。","chinese_trad_answer":"不相上下","spanish_full":"La fuerza de los dos equipos es prácticamente igual.","spanish_cloze":"La fuerza de los dos equipos es ___.","spanish_answer":"prácticamente igual","pinyin":"Liǎng zhī duìwu de shílì bùxiāngshàngxià.","spanish_alternatives":["pareja"]},{"id":"hsk6_168","level":6,"module":"HSK6","chinese_simp_full":"双方的分歧如此之大，后果不言而喻。","chinese_simp_cloze":"双方的分歧如此之大，后果___。","chinese_simp_answer":"不言而喻","chinese_trad_full":"雙方的分歧如此之大，後果不言而喻。","chinese_trad_cloze":"雙方的分歧如此之大，後果___。","chinese_trad_answer":"不言而喻","spanish_full":"Las diferencias entre las partes son tan grandes que las consecuencias se sobreentienden.","spanish_cloze":"Las diferencias entre las partes son tan grandes que las consecuencias ___.","spanish_answer":"se sobreentienden","pinyin":"Shuāngfāng de fēnqí rúcǐ zhī dà, hòuguǒ bùyán'éryù.","spanish_alternatives":["son evidentes"]},{"id":"hsk6_169","level":6,"module":"HSK6","chinese_simp_full":"听到这个消息，大家不由得流下了眼泪。","chinese_simp_cloze":"听到这个消息，大家___流下了眼泪。","chinese_simp_answer":"不由得","chinese_trad_full":"聽到這個消息，大家不由得流下了眼淚。","chinese_trad_cloze":"聽到這個消息，大家___流下了眼淚。","chinese_trad_answer":"不由得","spanish_full":"Al escuchar la noticia, todos, sin poder remediarlo, se echaron a llorar.","spanish_cloze":"Al escuchar la noticia, todos, ___, se echaron a llorar.","spanish_answer":"sin poder remediarlo","pinyin":"Tīngdào zhège xiāoxi, dàjiā bùyóude liú xià le yǎnlèi.","spanish_alternatives":["no pudieron evitar"]},{"id":"hsk6_170","level":6,"module":"HSK6","chinese_simp_full":"他为了钱不择手段。","chinese_simp_cloze":"他为了钱___。","chinese_simp_answer":"不择手段","chinese_trad_full":"他為了錢不擇手段。","chinese_trad_cloze":"他為了錢___。","chinese_trad_answer":"不擇手段","spanish_full":"Por dinero, no elige los medios.","spanish_cloze":"Por dinero, ___.","spanish_answer":"no elige los medios","pinyin":"Tā wèile qián bùzéshǒuduàn.","spanish_alternatives":["es capaz de cualquier cosa"]},{"id":"hsk6_171","level":6,"module":"HSK6","chinese_simp_full":"这部小说他看了不止一遍。","chinese_simp_cloze":"这部小说他看了___一遍。","chinese_simp_answer":"不止","chinese_trad_full":"這部小說他看了不止一遍。","chinese_trad_cloze":"這部小說他看了___一遍。","chinese_trad_answer":"不止","spanish_full":"Esta novela la leyó más de una vez.","spanish_cloze":"Esta novela la leyó ___.","spanish_answer":"más de una vez","pinyin":"Zhè bù xiǎoshuō tā kàn le bùzhǐ yī biàn."},{"id":"hsk6_172","level":6,"module":"HSK6","chinese_simp_full":"校门口贴出了一张布告。","chinese_simp_cloze":"校门口贴出了一张___。","chinese_simp_answer":"布告","chinese_trad_full":"校門口貼出了一張佈告。","chinese_trad_cloze":"校門口貼出了一張___。","chinese_trad_answer":"佈告","spanish_full":"En la puerta de la escuela pusieron un aviso.","spanish_cloze":"En la puerta de la escuela pusieron un ___.","spanish_answer":"aviso","pinyin":"Xiàoménkǒu tiē chū le yī zhāng bùgào.","spanish_alternatives":["cartel"]},{"id":"hsk6_173","level":6,"module":"HSK6","chinese_simp_full":"这套房子布局很合理。","chinese_simp_cloze":"这套房子___很合理。","chinese_simp_answer":"布局","chinese_trad_full":"這套房子佈局很合理。","chinese_trad_cloze":"這套房子___很合理。","chinese_trad_answer":"佈局","spanish_full":"La distribución de este departamento es muy lógica.","spanish_cloze":"La ___ de este departamento es muy lógica.","spanish_answer":"distribución","pinyin":"Zhè tào fángzi bùjú hěn hélǐ.","spanish_alternatives":["disposición"]},{"id":"hsk6_174","level":6,"module":"HSK6","chinese_simp_full":"会场布置得漂亮又大方。","chinese_simp_cloze":"会场___得漂亮又大方。","chinese_simp_answer":"布置","chinese_trad_full":"會場佈置得漂亮又大方。","chinese_trad_cloze":"會場___得漂亮又大方。","chinese_trad_answer":"佈置","spanish_full":"El salón quedó arreglado con elegancia y sencillez.","spanish_cloze":"El salón quedó ___ con elegancia y sencillez.","spanish_answer":"arreglado","pinyin":"Huìchǎng bùzhì de piàoliang yòu dàfāng.","spanish_alternatives":["decorado"]},{"id":"hsk6_175","level":6,"module":"HSK6","chinese_simp_full":"队伍迈着整齐的步伐走过广场。","chinese_simp_cloze":"队伍迈着整齐的___走过广场。","chinese_simp_answer":"步伐","chinese_trad_full":"隊伍邁著整齊的步伐走過廣場。","chinese_trad_cloze":"隊伍邁著整齊的___走過廣場。","chinese_trad_answer":"步伐","spanish_full":"La columna cruzó la plaza con un paso marcial.","spanish_cloze":"La columna cruzó la plaza con un ___ marcial.","spanish_answer":"paso","pinyin":"Duìwu màizhe zhěngqí de bùfá zǒuguò guǎngchǎng.","spanish_alternatives":["marcha"]},{"id":"hsk6_176","level":6,"module":"HSK6","chinese_simp_full":"公司部署了新的销售计划。","chinese_simp_cloze":"公司___了新的销售计划。","chinese_simp_answer":"部署","chinese_trad_full":"公司部署了新的銷售計劃。","chinese_trad_cloze":"公司___了新的銷售計劃。","chinese_trad_answer":"部署","spanish_full":"La empresa desplegó un nuevo plan de ventas.","spanish_cloze":"La empresa ___ un nuevo plan de ventas.","spanish_answer":"desplegó","pinyin":"Gōngsī bùshǔ le xīn de xiāoshòu jìhuà.","spanish_alternatives":["puso en marcha"]},{"id":"hsk6_177","level":6,"module":"HSK6","chinese_simp_full":"医生检查了他受伤的部位。","chinese_simp_cloze":"医生检查了他受伤的___。","chinese_simp_answer":"部位","chinese_trad_full":"醫生檢查了他受傷的部位。","chinese_trad_cloze":"醫生檢查了他受傷的___。","chinese_trad_answer":"部位","spanish_full":"El médico examinó la zona lesionada.","spanish_cloze":"El médico examinó la ___ lesionada.","spanish_answer":"zona","pinyin":"Yīshēng jiǎnchá le tā shòushāng de bùwèi.","spanish_alternatives":["parte del cuerpo"]},{"id":"hsk6_178","level":6,"module":"HSK6","chinese_simp_full":"他在工作中展现了出色的才干。","chinese_simp_cloze":"他在工作中展现了出色的___。","chinese_simp_answer":"才干","chinese_trad_full":"他在工作中展現了出色的才幹。","chinese_trad_cloze":"他在工作中展現了出色的___。","chinese_trad_answer":"才幹","spanish_full":"En el trabajo demostró una capacidad sobresaliente.","spanish_cloze":"En el trabajo demostró una ___ sobresaliente.","spanish_answer":"capacidad","pinyin":"Tā zài gōngzuò zhōng zhǎnxiàn le chūsè de cáigàn.","spanish_alternatives":["talento"]},{"id":"hsk6_179","level":6,"module":"HSK6","chinese_simp_full":"裁缝把这件西装改小了两码。","chinese_simp_cloze":"___把这件西装改小了两码。","chinese_simp_answer":"裁缝","chinese_trad_full":"裁縫把這件西裝改小了兩碼。","chinese_trad_cloze":"___把這件西裝改小了兩碼。","chinese_trad_answer":"裁縫","spanish_full":"El sastre redujo dos tallas este traje.","spanish_cloze":"El ___ redujo dos tallas este traje.","spanish_answer":"sastre","pinyin":"Cáifeng bǎ zhè jiàn xīzhuāng gǎi xiǎo le liǎng mǎ."},{"id":"hsk6_180","level":6,"module":"HSK6","chinese_simp_full":"裁判判罚了一个点球。","chinese_simp_cloze":"___判罚了一个点球。","chinese_simp_answer":"裁判","chinese_trad_full":"裁判判罰了一個點球。","chinese_trad_cloze":"___判罰了一個點球。","chinese_trad_answer":"裁判","spanish_full":"El árbitro sancionó un penal.","spanish_cloze":"El ___ sancionó un penal.","spanish_answer":"árbitro","pinyin":"Cáipàn pànfá le yī gè diǎnqiú."},{"id":"hsk6_181","level":6,"module":"HSK6","chinese_simp_full":"经济不景气，公司宣布裁员。","chinese_simp_cloze":"经济不景气，公司宣布___。","chinese_simp_answer":"裁员","chinese_trad_full":"經濟不景氣，公司宣佈裁員。","chinese_trad_cloze":"經濟不景氣，公司宣佈___。","chinese_trad_answer":"裁員","spanish_full":"Con la economía en mala racha, la empresa anunció despidos.","spanish_cloze":"Con la economía en mala racha, la empresa anunció ___.","spanish_answer":"despidos","pinyin":"Jīngjì bù jǐngqì, gōngsī xuānbù cáiyuán.","spanish_alternatives":["recortes de personal"]},{"id":"hsk6_182","level":6,"module":"HSK6","chinese_simp_full":"知识是比金钱更宝贵的财富。","chinese_simp_cloze":"知识是比金钱更宝贵的___。","chinese_simp_answer":"财富","chinese_trad_full":"知識是比金錢更寶貴的財富。","chinese_trad_cloze":"知識是比金錢更寶貴的___。","chinese_trad_answer":"財富","spanish_full":"El conocimiento es una riqueza más valiosa que el dinero.","spanish_cloze":"El conocimiento es una ___ más valiosa que el dinero.","spanish_answer":"riqueza","pinyin":"Zhīshi shì bǐ jīnqián gèng bǎoguì de cáifù."},{"id":"hsk6_183","level":6,"module":"HSK6","chinese_simp_full":"她在一家大公司负责财务。","chinese_simp_cloze":"她在一家大公司负责___。","chinese_simp_answer":"财务","chinese_trad_full":"她在一家大公司負責財務。","chinese_trad_cloze":"她在一家大公司負責___。","chinese_trad_answer":"財務","spanish_full":"En una gran empresa se encarga de las finanzas.","spanish_cloze":"En una gran empresa se encarga de las ___.","spanish_answer":"finanzas","pinyin":"Tā zài yī jiā dà gōngsī fùzé cáiwù."},{"id":"hsk6_184","level":6,"module":"HSK6","chinese_simp_full":"政府面临财政困难。","chinese_simp_cloze":"政府面临___困难。","chinese_simp_answer":"财政","chinese_trad_full":"政府面臨財政困難。","chinese_trad_cloze":"政府面臨___困難。","chinese_trad_answer":"財政","spanish_full":"El gobierno atraviesa dificultades fiscales.","spanish_cloze":"El gobierno atraviesa dificultades ___.","spanish_answer":"fiscales","pinyin":"Zhèngfǔ miànlín cáizhèng kùnnán.","spanish_alternatives":["de hacienda"]},{"id":"hsk6_185","level":6,"module":"HSK6","chinese_simp_full":"他买彩票中了大奖。","chinese_simp_cloze":"他买___中了大奖。","chinese_simp_answer":"彩票","chinese_trad_full":"他買彩票中了大獎。","chinese_trad_cloze":"他買___中了大獎。","chinese_trad_answer":"彩票","spanish_full":"Le tocó el gran premio con un boleto de lotería.","spanish_cloze":"Le tocó el gran premio con un ___.","spanish_answer":"boleto de lotería","pinyin":"Tā mǎi cǎipiào zhòng le dàjiǎng.","spanish_alternatives":["ticket de lotería"]},{"id":"hsk6_186","level":6,"module":"HSK6","chinese_simp_full":"办公用品由行政部统一采购。","chinese_simp_cloze":"办公用品由行政部统一___。","chinese_simp_answer":"采购","chinese_trad_full":"辦公用品由行政部統一採購。","chinese_trad_cloze":"辦公用品由行政部統一___。","chinese_trad_answer":"採購","spanish_full":"Los artículos de oficina los compra de manera centralizada el área administrativa.","spanish_cloze":"Los artículos de oficina los ___ de manera centralizada el área administrativa.","spanish_answer":"compra","pinyin":"Bàngōng yòngpǐn yóu xíngzhèng bù tǒngyī cǎigòu.","spanish_alternatives":["adquiere"]},{"id":"hsk6_187","level":6,"module":"HSK6","chinese_simp_full":"科学家在野外采集植物标本。","chinese_simp_cloze":"科学家在野外___植物标本。","chinese_simp_answer":"采集","chinese_trad_full":"科學家在野外採集植物標本。","chinese_trad_cloze":"科學家在野外___植物標本。","chinese_trad_answer":"採集","spanish_full":"Los científicos recolectan especímenes de plantas en el campo.","spanish_cloze":"Los científicos ___ especímenes de plantas en el campo.","spanish_answer":"recolectan","pinyin":"Kēxuéjiā zài yěwài cǎijí zhíwù biāoběn.","spanish_alternatives":["recogen"]},{"id":"hsk6_188","level":6,"module":"HSK6","chinese_simp_full":"经理采纳了我的建议。","chinese_simp_cloze":"经理___了我的建议。","chinese_simp_answer":"采纳","chinese_trad_full":"經理採納了我的建議。","chinese_trad_cloze":"經理___了我的建議。","chinese_trad_answer":"採納","spanish_full":"El gerente adoptó mi sugerencia.","spanish_cloze":"El gerente ___ mi sugerencia.","spanish_answer":"adoptó","pinyin":"Jīnglǐ cǎinà le wǒ de jiànyì.","spanish_alternatives":["aceptó"]},{"id":"hsk6_189","level":6,"module":"HSK6","chinese_simp_full":"这次活动多亏你的参谋。","chinese_simp_cloze":"这次活动多亏你的___。","chinese_simp_answer":"参谋","chinese_trad_full":"這次活動多虧你的參謀。","chinese_trad_cloze":"這次活動多虧你的___。","chinese_trad_answer":"參謀","spanish_full":"Esta actividad salió bien gracias a tus consejos.","spanish_cloze":"Esta actividad salió bien gracias a tus ___.","spanish_answer":"consejos","pinyin":"Zhè cì huódòng duōkuī nǐ de cānmóu.","spanish_alternatives":["asesoramiento"]},{"id":"hsk6_190","level":6,"module":"HSK6","chinese_simp_full":"写论文时要参照最新的研究成果。","chinese_simp_cloze":"写论文时要___最新的研究成果。","chinese_simp_answer":"参照","chinese_trad_full":"寫論文時要參照最新的研究成果。","chinese_trad_cloze":"寫論文時要___最新的研究成果。","chinese_trad_answer":"參照","spanish_full":"Al escribir la tesis hay que basarse en los estudios más recientes.","spanish_cloze":"Al escribir la tesis hay que ___ los estudios más recientes.","spanish_answer":"basarse en","pinyin":"Xiě lùnwén shí yào cānzhào zuìxīn de yánjiū chéngguǒ.","spanish_alternatives":["tomar como referencia"]},{"id":"hsk6_191","level":6,"module":"HSK6","chinese_simp_full":"社会应当关心残疾人士。","chinese_simp_cloze":"社会应当关心___人士。","chinese_simp_answer":"残疾","chinese_trad_full":"社會應當關心殘疾人士。","chinese_trad_cloze":"社會應當關心___人士。","chinese_trad_answer":"殘疾","spanish_full":"La sociedad debería preocuparse por las personas con discapacidad.","spanish_cloze":"La sociedad debería preocuparse por las personas con ___.","spanish_answer":"discapacidad","pinyin":"Shèhuì yīngdāng guānxīn cánjí rénshì."},{"id":"hsk6_192","level":6,"module":"HSK6","chinese_simp_full":"战争是残酷的。","chinese_simp_cloze":"战争是___的。","chinese_simp_answer":"残酷","chinese_trad_full":"戰爭是殘酷的。","chinese_trad_cloze":"戰爭是___的。","chinese_trad_answer":"殘酷","spanish_full":"La guerra es cruel.","spanish_cloze":"La guerra es ___.","spanish_answer":"cruel","pinyin":"Zhànzhēng shì cánkù de."},{"id":"hsk6_193","level":6,"module":"HSK6","chinese_simp_full":"水果表面可能残留农药。","chinese_simp_cloze":"水果表面可能___农药。","chinese_simp_answer":"残留","chinese_trad_full":"水果表面可能殘留農藥。","chinese_trad_cloze":"水果表面可能___農藥。","chinese_trad_answer":"殘留","spanish_full":"En la superficie de la fruta pueden quedar restos de pesticida.","spanish_cloze":"En la superficie de la fruta pueden ___ pesticida.","spanish_answer":"quedar restos de","pinyin":"Shuǐguǒ biǎomiàn kěnéng cánliú nóngyào.","spanish_alternatives":["quedar residuos de"]},{"id":"hsk6_194","level":6,"module":"HSK6","chinese_simp_full":"猎人的做法实在太残忍了。","chinese_simp_cloze":"猎人的做法实在太___了。","chinese_simp_answer":"残忍","chinese_trad_full":"獵人的做法實在太殘忍了。","chinese_trad_cloze":"獵人的做法實在太___了。","chinese_trad_answer":"殘忍","spanish_full":"Lo que hizo el cazador es realmente despiadado.","spanish_cloze":"Lo que hizo el cazador es realmente ___.","spanish_answer":"despiadado","pinyin":"Lièrén de zuòfǎ shízài tài cánrěn le.","spanish_alternatives":["cruel"]},{"id":"hsk6_195","level":6,"module":"HSK6","chinese_simp_full":"阳光灿烂的日子里，公园里到处是游人。","chinese_simp_cloze":"阳光___的日子里，公园里到处是游人。","chinese_simp_answer":"灿烂","chinese_trad_full":"陽光燦爛的日子裡，公園裡到處是遊人。","chinese_trad_cloze":"陽光___的日子裡，公園裡到處是遊人。","chinese_trad_answer":"燦爛","spanish_full":"En los días de sol radiante, el parque se llena de paseantes.","spanish_cloze":"En los días de ___, el parque se llena de paseantes.","spanish_answer":"sol radiante","pinyin":"Yángguāng cànlàn de rìzi lǐ, gōngyuán lǐ dàochù shì yóurén.","spanish_alternatives":["sol brillante"]},{"id":"hsk6_196","level":6,"module":"HSK6","chinese_simp_full":"这个决定下得太仓促，考虑不周。","chinese_simp_cloze":"这个决定下得太___，考虑不周。","chinese_simp_answer":"仓促","chinese_trad_full":"這個決定下得太倉促，考慮不周。","chinese_trad_cloze":"這個決定下得太___，考慮不周。","chinese_trad_answer":"倉促","spanish_full":"Esta decisión se tomó con demasiado apuro, sin pensarlo bien.","spanish_cloze":"Esta decisión se tomó con demasiado ___, sin pensarlo bien.","spanish_answer":"apuro","pinyin":"Zhège juédìng xià de tài cāngcù, kǎolǜ bù zhōu.","spanish_alternatives":["premura"]},{"id":"hsk6_197","level":6,"module":"HSK6","chinese_simp_full":"仓库里堆满了货物。","chinese_simp_cloze":"___里堆满了货物。","chinese_simp_answer":"仓库","chinese_trad_full":"倉庫裡堆滿了貨物。","chinese_trad_cloze":"___裡堆滿了貨物。","chinese_trad_answer":"倉庫","spanish_full":"El depósito está repleto de mercadería.","spanish_cloze":"El ___ está repleto de mercadería.","spanish_answer":"depósito","pinyin":"Cāngkù lǐ duī mǎn le huòwù.","spanish_alternatives":["almacén"]},{"id":"hsk6_198","level":6,"module":"HSK6","chinese_simp_full":"飞机的前部是货舱。","chinese_simp_cloze":"飞机的前部是货___。","chinese_simp_answer":"舱","chinese_trad_full":"飛機的前部是貨艙。","chinese_trad_cloze":"飛機的前部是貨___。","chinese_trad_answer":"艙","spanish_full":"En la parte delantera del avión está la bodega de carga.","spanish_cloze":"En la parte delantera del avión está la ___ de carga.","spanish_answer":"bodega","pinyin":"Fēijī de qiánbù shì huòcāng."},{"id":"hsk6_199","level":6,"module":"HSK6","chinese_simp_full":"她脸色苍白，需要好好休息。","chinese_simp_cloze":"她脸色___，需要好好休息。","chinese_simp_answer":"苍白","chinese_trad_full":"她臉色蒼白，需要好好休息。","chinese_trad_cloze":"她臉色___，需要好好休息。","chinese_trad_answer":"蒼白","spanish_full":"Tiene el rostro pálido; necesita descansar bien.","spanish_cloze":"Tiene el rostro ___; necesita descansar bien.","spanish_answer":"pálido","pinyin":"Tā liǎnsè cāngbái, xūyào hǎohǎo xiūxi."},{"id":"hsk6_200","level":6,"module":"HSK6","chinese_simp_full":"母亲为这个家操劳了一辈子。","chinese_simp_cloze":"母亲为这个家___了一辈子。","chinese_simp_answer":"操劳","chinese_trad_full":"母親為這個家操勞了一輩子。","chinese_trad_cloze":"母親為這個家___了一輩子。","chinese_trad_answer":"操勞","spanish_full":"La madre trabajó sin descanso por esta familia toda su vida.","spanish_cloze":"La madre ___ por esta familia toda su vida.","spanish_answer":"trabajó sin descanso","pinyin":"Mǔqīn wèi zhège jiā cāoláo le yī bèizi."},{"id":"hsk6_201","level":6,"module":"HSK6","chinese_simp_full":"士兵们每天在操场操练。","chinese_simp_cloze":"士兵们每天在操场___。","chinese_simp_answer":"操练","chinese_trad_full":"士兵們每天在操場操練。","chinese_trad_cloze":"士兵們每天在操場___。","chinese_trad_answer":"操練","spanish_full":"Los soldados entrenan en la cancha todos los días.","spanish_cloze":"Los soldados ___ en la cancha todos los días.","spanish_answer":"entrenan","pinyin":"Shìbīngmen měitiān zài cāochǎng cāoliàn.","spanish_alternatives":["hacen instrucción"]},{"id":"hsk6_202","level":6,"module":"HSK6","chinese_simp_full":"你会操纵这台机器吗？","chinese_simp_cloze":"你会___这台机器吗？","chinese_simp_answer":"操纵","chinese_trad_full":"你會操縱這臺機器嗎？","chinese_trad_cloze":"你會___這臺機器嗎？","chinese_trad_answer":"操縱","spanish_full":"¿Sabés manejar esta máquina?","spanish_cloze":"¿Sabés ___ esta máquina?","spanish_answer":"manejar","pinyin":"Nǐ huì cāozòng zhè tái jīqì ma?","spanish_alternatives":["operar"]},{"id":"hsk6_203","level":6,"module":"HSK6","chinese_simp_full":"这个软件操作很简单。","chinese_simp_cloze":"这个软件___很简单。","chinese_simp_answer":"操作","chinese_trad_full":"這個軟件操作很簡單。","chinese_trad_cloze":"這個軟件___很簡單。","chinese_trad_answer":"操作","spanish_full":"Este programa es muy fácil de usar.","spanish_cloze":"Este programa es muy fácil de ___.","spanish_answer":"usar","pinyin":"Zhège ruǎnjiàn cāozuò hěn jiǎndān.","spanish_alternatives":["manejar"]},{"id":"hsk6_204","level":6,"module":"HSK6","chinese_simp_full":"这里太嘈杂，我没法睡觉。","chinese_simp_cloze":"这里太___，我没法睡觉。","chinese_simp_answer":"嘈杂","chinese_trad_full":"這裡太嘈雜，我沒法睡覺。","chinese_trad_cloze":"這裡太___，我沒法睡覺。","chinese_trad_answer":"嘈雜","spanish_full":"Acá hay demasiado ruido, no puedo dormir.","spanish_cloze":"Acá hay demasiado ___, no puedo dormir.","spanish_answer":"ruido","pinyin":"Zhèlǐ tài cáozá, wǒ méifǎ shuìjiào.","spanish_alternatives":["bullicio"]},{"id":"hsk6_205","level":6,"module":"HSK6","chinese_simp_full":"合同草案明天发给你们。","chinese_simp_cloze":"合同___明天发给你们。","chinese_simp_answer":"草案","chinese_trad_full":"合同草案明天發給你們。","chinese_trad_cloze":"合同___明天發給你們。","chinese_trad_answer":"草案","spanish_full":"Mañana les mando el borrador del contrato.","spanish_cloze":"Mañana les mando el ___ del contrato.","spanish_answer":"borrador","pinyin":"Hétong cǎo'àn míngtiān fā gěi nǐmen.","spanish_alternatives":["esbozo"]},{"id":"hsk6_206","level":6,"module":"HSK6","chinese_simp_full":"这么大的决定，不能太草率。","chinese_simp_cloze":"这么大的决定，不能太___。","chinese_simp_answer":"草率","chinese_trad_full":"這麼大的決定，不能太草率。","chinese_trad_cloze":"這麼大的決定，不能太___。","chinese_trad_answer":"草率","spanish_full":"Una decisión tan grande no se puede tomar a las apuradas.","spanish_cloze":"Una decisión tan grande no se puede tomar a las ___.","spanish_answer":"apuradas","pinyin":"Zhème dà de juédìng, bù néng tài cǎoshuài.","spanish_alternatives":["a la ligera"]},{"id":"hsk6_207","level":6,"module":"HSK6","chinese_simp_full":"我从侧面拍了这张照片。","chinese_simp_cloze":"我从___拍了这张照片。","chinese_simp_answer":"侧面","chinese_trad_full":"我從側面拍了這張照片。","chinese_trad_cloze":"我從___拍了這張照片。","chinese_trad_answer":"側面","spanish_full":"Saqué esta foto de costado.","spanish_cloze":"Saqué esta foto de ___.","spanish_answer":"costado","pinyin":"Wǒ cóng cèmiàn pāi le zhè zhāng zhàopiàn.","spanish_alternatives":["de perfil"]},{"id":"hsk6_208","level":6,"module":"HSK6","chinese_simp_full":"工人来测量房间的大小。","chinese_simp_cloze":"工人来___房间的大小。","chinese_simp_answer":"测量","chinese_trad_full":"工人來測量房間的大小。","chinese_trad_cloze":"工人來___房間的大小。","chinese_trad_answer":"測量","spanish_full":"El obrero vino a medir el tamaño de la habitación.","spanish_cloze":"El obrero vino a ___ el tamaño de la habitación.","spanish_answer":"medir","pinyin":"Gōngrén lái cèliáng fángjiān de dàxiǎo.","spanish_alternatives":["medición"]},{"id":"hsk6_209","level":6,"module":"HSK6","chinese_simp_full":"谁策划了这次活动？","chinese_simp_cloze":"谁___了这次活动？","chinese_simp_answer":"策划","chinese_trad_full":"誰策劃了這次活動？","chinese_trad_cloze":"誰___了這次活動？","chinese_trad_answer":"策劃","spanish_full":"¿Quién organizó esta actividad?","spanish_cloze":"¿Quién ___ esta actividad?","spanish_answer":"organizó","pinyin":"Shéi cèhuà le zhè cì huódòng?","spanish_alternatives":["planificó"]},{"id":"hsk6_210","level":6,"module":"HSK6","chinese_simp_full":"这是公司发展的新策略。","chinese_simp_cloze":"这是公司发展的新___。","chinese_simp_answer":"策略","chinese_trad_full":"這是公司發展的新策略。","chinese_trad_cloze":"這是公司發展的新___。","chinese_trad_answer":"策略","spanish_full":"Esta es la nueva estrategia de la empresa.","spanish_cloze":"Esta es la nueva ___ de la empresa.","spanish_answer":"estrategia","pinyin":"Zhè shì gōngsī fāzhǎn de xīn cèlüè."},{"id":"hsk6_211","level":6,"module":"HSK6","chinese_simp_full":"手机的新功能层出不穷。","chinese_simp_cloze":"手机的新功能___。","chinese_simp_answer":"层出不穷","chinese_trad_full":"手機的新功能層出不窮。","chinese_trad_cloze":"手機的新功能___。","chinese_trad_answer":"層出不窮","spanish_full":"Las funciones nuevas de los celulares aparecen sin parar.","spanish_cloze":"Las funciones nuevas de los celulares aparecen ___.","spanish_answer":"sin parar","pinyin":"Shǒujī de xīn gōngnéng céngchūbùqióng.","spanish_alternatives":["no dejan de aparecer"]},{"id":"hsk6_212","level":6,"module":"HSK6","chinese_simp_full":"这篇文章层次分明，很好懂。","chinese_simp_cloze":"这篇文章___分明，很好懂。","chinese_simp_answer":"层次","chinese_trad_full":"這篇文章層次分明，很好懂。","chinese_trad_cloze":"這篇文章___分明，很好懂。","chinese_trad_answer":"層次","spanish_full":"El artículo está claramente organizado y se entiende fácil.","spanish_cloze":"El artículo está claramente ___ y se entiende fácil.","spanish_answer":"organizado","pinyin":"Zhè piān wénzhāng céngcì fēnmíng, hěn hǎo dǒng.","spanish_alternatives":["estructurado"]},{"id":"hsk6_213","level":6,"module":"HSK6","chinese_simp_full":"这两个方案差别不大。","chinese_simp_cloze":"这两个方案___不大。","chinese_simp_answer":"差别","chinese_trad_full":"這兩個方案差別不大。","chinese_trad_cloze":"這兩個方案___不大。","chinese_trad_answer":"差別","spanish_full":"La diferencia entre estos dos planes es mínima.","spanish_cloze":"La ___ entre estos dos planes es mínima.","spanish_answer":"diferencia","pinyin":"Zhè liǎng gè fāng'àn chābié bú dà.","spanish_alternatives":["no difieren mucho"]},{"id":"hsk6_214","level":6,"module":"HSK6","chinese_simp_full":"插座就在桌子旁边。","chinese_simp_cloze":"___就在桌子旁边。","chinese_simp_answer":"插座","chinese_trad_full":"插座就在桌子旁邊。","chinese_trad_cloze":"___就在桌子旁邊。","chinese_trad_answer":"插座","spanish_full":"El enchufe está al lado de la mesa.","spanish_cloze":"El ___ está al lado de la mesa.","spanish_answer":"enchufe","pinyin":"Chāzuò jiù zài zhuōzi pángbiān."},{"id":"hsk6_215","level":6,"module":"HSK6","chinese_simp_full":"海关查获了一批假货。","chinese_simp_cloze":"海关___了一批假货。","chinese_simp_answer":"查获","chinese_trad_full":"海關查獲了一批假貨。","chinese_trad_cloze":"海關___了一批假貨。","chinese_trad_answer":"查獲","spanish_full":"La aduana incautó un lote de productos falsificados.","spanish_cloze":"La aduana ___ un lote de productos falsificados.","spanish_answer":"incautó","pinyin":"Hǎiguān cháhuò le yì pī jiǎhuò.","spanish_alternatives":["descubrió"]},{"id":"hsk6_216","level":6,"module":"HSK6","chinese_simp_full":"刹那间，屋里一片安静。","chinese_simp_cloze":"___间，屋里一片安静。","chinese_simp_answer":"刹那","chinese_trad_full":"剎那間，屋裡一片安靜。","chinese_trad_cloze":"___間，屋裡一片安靜。","chinese_trad_answer":"剎那","spanish_full":"En un instante, la habitación quedó en silencio.","spanish_cloze":"En un ___, la habitación quedó en silencio.","spanish_answer":"instante","pinyin":"Chànà jiān, wūlǐ yípiàn ānjìng.","spanish_alternatives":["momento"]},{"id":"hsk6_217","level":6,"module":"HSK6","chinese_simp_full":"别打岔，让他说完。","chinese_simp_cloze":"别打___，让他说完。","chinese_simp_answer":"岔","chinese_trad_full":"別打岔，讓他說完。","chinese_trad_cloze":"別打___，讓他說完。","chinese_trad_answer":"岔","spanish_full":"No lo interrumpas, dejalo terminar.","spanish_cloze":"No lo ___, dejalo terminar.","spanish_answer":"interrumpas","pinyin":"Bié dǎchà, ràng tā shuō wán.","spanish_alternatives":["interrumpir"]},{"id":"hsk6_218","level":6,"module":"HSK6","chinese_simp_full":"听到这个消息，大家都很诧异。","chinese_simp_cloze":"听到这个消息，大家都很___。","chinese_simp_answer":"诧异","chinese_trad_full":"聽到這個消息，大家都很詫異。","chinese_trad_cloze":"聽到這個消息，大家都很___。","chinese_trad_answer":"詫異","spanish_full":"Al escuchar la noticia, todos quedaron sorprendidos.","spanish_cloze":"Al escuchar la noticia, todos quedaron ___.","spanish_answer":"sorprendidos","pinyin":"Tīngdào zhège xiāoxi, dàjiā dōu hěn chàyì.","spanish_alternatives":["extrañados"]},{"id":"hsk6_219","level":6,"module":"HSK6","chinese_simp_full":"这辆卡车用柴油。","chinese_simp_cloze":"这辆卡车用___。","chinese_simp_answer":"柴油","chinese_trad_full":"這輛卡車用柴油。","chinese_trad_cloze":"這輛卡車用___。","chinese_trad_answer":"柴油","spanish_full":"Este camión funciona a diesel.","spanish_cloze":"Este camión funciona a ___.","spanish_answer":"diesel","pinyin":"Zhè liàng kǎchē yòng cháiyóu.","spanish_alternatives":["gasoil"]},{"id":"hsk6_220","level":6,"module":"HSK6","chinese_simp_full":"奶奶年纪大了，上楼要人搀。","chinese_simp_cloze":"奶奶年纪大了，上楼要人___。","chinese_simp_answer":"搀","chinese_trad_full":"奶奶年紀大了，上樓要人攙。","chinese_trad_cloze":"奶奶年紀大了，上樓要人___。","chinese_trad_answer":"攙","spanish_full":"La abuela ya es grande; para subir la escalera necesita que la apoyen.","spanish_cloze":"La abuela ya es grande; para subir la escalera necesita que la ___.","spanish_answer":"apoyen","pinyin":"Nǎinai niánjì dà le, shàng lóu yào rén chān.","spanish_alternatives":["sostengan"]},{"id":"hsk6_221","level":6,"module":"HSK6","chinese_simp_full":"藤蔓缠绕着栏杆。","chinese_simp_cloze":"藤蔓___着栏杆。","chinese_simp_answer":"缠绕","chinese_trad_full":"藤蔓纏繞著欄杆。","chinese_trad_cloze":"藤蔓___著欄杆。","chinese_trad_answer":"纏繞","spanish_full":"Las enredaderas se enroscan en la baranda.","spanish_cloze":"Las enredaderas se ___ en la baranda.","spanish_answer":"enroscan","pinyin":"Téngwàn chánrào zhe lángān.","spanish_alternatives":["se enredan"]},{"id":"hsk6_222","level":6,"module":"HSK6","chinese_simp_full":"闻到烤肉味，孩子馋了。","chinese_simp_cloze":"闻到烤肉味，孩子___了。","chinese_simp_answer":"馋","chinese_trad_full":"聞到烤肉味，孩子饞了。","chinese_trad_cloze":"聞到烤肉味，孩子___了。","chinese_trad_answer":"饞","spanish_full":"Al oler la carne asada, al nene le dio antojo.","spanish_cloze":"Al oler la carne asada, al nene le dio ___.","spanish_answer":"antojo","pinyin":"Wéndào kǎoròu wèi, háizi chán le.","spanish_alternatives":["se le antojó"]},{"id":"hsk6_223","level":6,"module":"HSK6","chinese_simp_full":"旅游业是这里的支柱产业。","chinese_simp_cloze":"旅游业是这里的支柱___。","chinese_simp_answer":"产业","chinese_trad_full":"旅遊業是這裡的支柱產業。","chinese_trad_cloze":"旅遊業是這裡的支柱___。","chinese_trad_answer":"產業","spanish_full":"El turismo es la industria principal de la zona.","spanish_cloze":"El turismo es la ___ principal de la zona.","spanish_answer":"industria","pinyin":"Lǚyóuyè shì zhèlǐ de zhīzhù chǎnyè.","spanish_alternatives":["sector principal"]},{"id":"hsk6_224","level":6,"module":"HSK6","chinese_simp_full":"他在报告里阐述了自己的观点。","chinese_simp_cloze":"他在报告里___了自己的观点。","chinese_simp_answer":"阐述","chinese_trad_full":"他在報告裡闡述了自己的觀點。","chinese_trad_cloze":"他在報告裡___了自己的觀點。","chinese_trad_answer":"闡述","spanish_full":"En el informe expuso su punto de vista.","spanish_cloze":"En el informe ___ su punto de vista.","spanish_answer":"expuso","pinyin":"Tā zài bàogào lǐ chǎnshù le zìjǐ de guāndiǎn.","spanish_alternatives":["explicó en detalle"]},{"id":"hsk6_225","level":6,"module":"HSK6","chinese_simp_full":"他气得声音都在颤抖。","chinese_simp_cloze":"他气得声音都在___。","chinese_simp_answer":"颤抖","chinese_trad_full":"他氣得聲音都在顫抖。","chinese_trad_cloze":"他氣得聲音都在___。","chinese_trad_answer":"顫抖","spanish_full":"Estaba tan enojado que le temblaba la voz.","spanish_cloze":"Estaba tan enojado que le ___ la voz.","spanish_answer":"temblaba","pinyin":"Tā qì de shēngyīn dōu zài chàndǒu.","spanish_alternatives":["vibraba"]},{"id":"hsk6_226","level":6,"module":"HSK6","chinese_simp_full":"祝祖国繁荣昌盛！","chinese_simp_cloze":"祝祖国繁荣___！","chinese_simp_answer":"昌盛","chinese_trad_full":"祝祖國繁榮昌盛！","chinese_trad_cloze":"祝祖國繁榮___！","chinese_trad_answer":"昌盛","spanish_full":"¡Que la patria sea próspera y floreciente!","spanish_cloze":"¡Que la patria sea ___ y floreciente!","spanish_answer":"próspera","pinyin":"Zhù zǔguó fánróng chāngshèng!","spanish_alternatives":["floreciente"]},{"id":"hsk6_227","level":6,"module":"HSK6","chinese_simp_full":"他计划三年内偿还所有债务。","chinese_simp_cloze":"他计划三年内___所有债务。","chinese_simp_answer":"偿还","chinese_trad_full":"他計劃三年內償還所有債務。","chinese_trad_cloze":"他計劃三年內___所有債務。","chinese_trad_answer":"償還","spanish_full":"Piensa pagar todas sus deudas en tres años.","spanish_cloze":"Piensa ___ todas sus deudas en tres años.","spanish_answer":"pagar","pinyin":"Tā jìhuà sān nián nèi chánghuán suǒyǒu zhàiwù.","spanish_alternatives":["cancelar"]},{"id":"hsk6_228","level":6,"module":"HSK6","chinese_simp_full":"我想尝试一下这道新菜。","chinese_simp_cloze":"我想___一下这道新菜。","chinese_simp_answer":"尝试","chinese_trad_full":"我想嘗試一下這道新菜。","chinese_trad_cloze":"我想___一下這道新菜。","chinese_trad_answer":"嘗試","spanish_full":"Quiero probar este plato nuevo.","spanish_cloze":"Quiero ___ este plato nuevo.","spanish_answer":"probar","pinyin":"Wǒ xiǎng chángshì yíxià zhè dào xīn cài.","spanish_alternatives":["probar un poco"]},{"id":"hsk6_229","level":6,"module":"HSK6","chinese_simp_full":"这种玩笑不适合正式场合。","chinese_simp_cloze":"这种玩笑不适合正式___。","chinese_simp_answer":"场合","chinese_trad_full":"這種玩笑不適合正式場合。","chinese_trad_cloze":"這種玩笑不適合正式___。","chinese_trad_answer":"場合","spanish_full":"Ese tipo de chistes no va bien en ocasiones formales.","spanish_cloze":"Ese tipo de chistes no va bien en ___ formales.","spanish_answer":"ocasiones","pinyin":"Zhè zhǒng wánxiào bù shìhé zhèngshì chǎnghé.","spanish_alternatives":["sitios formales"]},{"id":"hsk6_230","level":6,"module":"HSK6","chinese_simp_full":"婚礼的场面特别热闹。","chinese_simp_cloze":"婚礼的___特别热闹。","chinese_simp_answer":"场面","chinese_trad_full":"婚禮的場面特別熱鬧。","chinese_trad_cloze":"婚禮的___特別熱鬧。","chinese_trad_answer":"場面","spanish_full":"La escena del casamiento fue muy animada.","spanish_cloze":"La ___ del casamiento fue muy animada.","spanish_answer":"escena","pinyin":"Hūnlǐ de chǎngmiàn tèbié rènao.","spanish_alternatives":["ambiente"]},{"id":"hsk6_231","level":6,"module":"HSK6","chinese_simp_full":"图书馆是安静的学习场所。","chinese_simp_cloze":"图书馆是安静的学习___。","chinese_simp_answer":"场所","chinese_trad_full":"圖書館是安靜的學習場所。","chinese_trad_cloze":"圖書館是安靜的學習___。","chinese_trad_answer":"場所","spanish_full":"La biblioteca es un lugar tranquilo para estudiar.","spanish_cloze":"La biblioteca es un ___ tranquilo para estudiar.","spanish_answer":"lugar","pinyin":"Túshūguǎn shì ānjìng de xuéxí chǎngsuǒ.","spanish_alternatives":["espacio"]},{"id":"hsk6_232","level":6,"module":"HSK6","chinese_simp_full":"天好，把窗户敞开吧。","chinese_simp_cloze":"天好，把窗户___吧。","chinese_simp_answer":"敞开","chinese_trad_full":"天好，把窗戶敞開吧。","chinese_trad_cloze":"天好，把窗戶___吧。","chinese_trad_answer":"敞開","spanish_full":"Hace lindo; dejá las ventanas abiertas de par en par.","spanish_cloze":"Hace lindo; dejá las ventanas ___ de par en par.","spanish_answer":"abiertas","pinyin":"Tiān hǎo, bǎ chuānghu chǎngkāi ba.","spanish_alternatives":["abrí de par en par"]},{"id":"hsk6_233","level":6,"module":"HSK6","chinese_simp_full":"这位老师倡导学生多提问。","chinese_simp_cloze":"这位老师___学生多提问。","chinese_simp_answer":"倡导","chinese_trad_full":"這位老師倡導學生多提問。","chinese_trad_cloze":"這位老師___學生多提問。","chinese_trad_answer":"倡導","spanish_full":"Este profesor fomenta que los alumnos pregunten mucho.","spanish_cloze":"Este profesor ___ que los alumnos pregunten mucho.","spanish_answer":"fomenta","pinyin":"Zhè wèi lǎoshī chàngdǎo xuéshēng duō tíwèn.","spanish_alternatives":["promueve"]},{"id":"hsk6_234","level":6,"module":"HSK6","chinese_simp_full":"他倡议大家骑车上班。","chinese_simp_cloze":"他___大家骑车上班。","chinese_simp_answer":"倡议","chinese_trad_full":"他倡議大家騎車上班。","chinese_trad_cloze":"他___大家騎車上班。","chinese_trad_answer":"倡議","spanish_full":"Propuso que todos vayan al trabajo en bici.","spanish_cloze":"___ que todos vayan al trabajo en bici.","spanish_answer":"Propuso","pinyin":"Tā chàngyì dàjiā qíchē shàngbān.","spanish_alternatives":["Propone"]},{"id":"hsk6_235","level":6,"module":"HSK6","chinese_simp_full":"修好以后，这条路畅通了。","chinese_simp_cloze":"修好以后，这条路___了。","chinese_simp_answer":"畅通","chinese_trad_full":"修好以後，這條路暢通了。","chinese_trad_cloze":"修好以後，這條路___了。","chinese_trad_answer":"暢通","spanish_full":"Después de la obra, esta calle quedó despejada.","spanish_cloze":"Después de la obra, esta calle quedó ___.","spanish_answer":"despejada","pinyin":"Xiū hǎo yǐhòu, zhè tiáo lù chàngtōng le.","spanish_alternatives":["sin trabas"]},{"id":"hsk6_236","level":6,"module":"HSK6","chinese_simp_full":"这本书在年轻人中很畅销。","chinese_simp_cloze":"这本书在年轻人中很___。","chinese_simp_answer":"畅销","chinese_trad_full":"這本書在年輕人中很暢銷。","chinese_trad_cloze":"這本書在年輕人中很___。","chinese_trad_answer":"暢銷","spanish_full":"Este libro se vende muy bien entre los jóvenes.","spanish_cloze":"Este libro ___ entre los jóvenes.","spanish_answer":"se vende muy bien","pinyin":"Zhè běn shū zài niánqīngrén zhōng hěn chàngxiāo.","spanish_alternatives":["es muy vendido"]},{"id":"hsk6_237","level":6,"module":"HSK6","chinese_simp_full":"他不断超越自己。","chinese_simp_cloze":"他不断___自己。","chinese_simp_answer":"超越","chinese_trad_full":"他不斷超越自己。","chinese_trad_cloze":"他不斷___自己。","chinese_trad_answer":"超越","spanish_full":"No deja de superarse.","spanish_cloze":"No deja de ___.","spanish_answer":"superarse","pinyin":"Tā búduàn chāoyuè zìjǐ.","spanish_alternatives":["supera"]},{"id":"hsk6_238","level":6,"module":"HSK6","chinese_simp_full":"他掏出一张五十的钞票。","chinese_simp_cloze":"他掏出一张五十的___。","chinese_simp_answer":"钞票","chinese_trad_full":"他掏出一張五十的鈔票。","chinese_trad_cloze":"他掏出一張五十的___。","chinese_trad_answer":"鈔票","spanish_full":"Sacó un billete de cincuenta.","spanish_cloze":"Sacó un ___ de cincuenta.","spanish_answer":"billete","pinyin":"Tā tāo chū yì zhāng wǔshí de chāopiào."},{"id":"hsk6_239","level":6,"module":"HSK6","chinese_simp_full":"不要嘲笑别人的错误。","chinese_simp_cloze":"不要___别人的错误。","chinese_simp_answer":"嘲笑","chinese_trad_full":"不要嘲笑別人的錯誤。","chinese_trad_cloze":"不要___別人的錯誤。","chinese_trad_answer":"嘲笑","spanish_full":"No te burles de los errores de los demás.","spanish_cloze":"No te ___ de los errores de los demás.","spanish_answer":"burles","pinyin":"Bú yào cháoxiào biérén de cuòwù.","spanish_alternatives":["te rías de"]},{"id":"hsk6_240","level":6,"module":"HSK6","chinese_simp_full":"老鹰把巢穴建在悬崖上。","chinese_simp_cloze":"老鹰把___建在悬崖上。","chinese_simp_answer":"巢穴","chinese_trad_full":"老鷹把巢穴建在懸崖上。","chinese_trad_cloze":"老鷹把___建在懸崖上。","chinese_trad_answer":"巢穴","spanish_full":"El águila construye su nido en el precipicio.","spanish_cloze":"El águila construye su ___ en el precipicio.","spanish_answer":"nido","pinyin":"Lǎoyīng bǎ cháoxué jiàn zài xuányá shàng.","spanish_alternatives":["cueva"]},{"id":"hsk6_241","level":6,"module":"HSK6","chinese_simp_full":"唐朝是中国有名的朝代。","chinese_simp_cloze":"唐朝是中国有名的___。","chinese_simp_answer":"朝代","chinese_trad_full":"唐朝是中國有名的朝代。","chinese_trad_cloze":"唐朝是中國有名的___。","chinese_trad_answer":"朝代","spanish_full":"La dinastía Tang es una de las más famosas de China.","spanish_cloze":"La ___ Tang es una de las más famosas de China.","spanish_answer":"dinastía","pinyin":"Táng cháo shì Zhōngguó yǒumíng de cháodài."},{"id":"hsk6_242","level":6,"module":"HSK6","chinese_simp_full":"短视频成了新的潮流。","chinese_simp_cloze":"短视频成了新的___。","chinese_simp_answer":"潮流","chinese_trad_full":"短視頻成了新的潮流。","chinese_trad_cloze":"短視頻成了新的___。","chinese_trad_answer":"潮流","spanish_full":"Los videos cortos se volvieron la nueva moda.","spanish_cloze":"Los videos cortos se volvieron la nueva ___.","spanish_answer":"moda","pinyin":"Duǎn shìpín chéng le xīn de cháoliú.","spanish_alternatives":["tendencia"]},{"id":"hsk6_243","level":6,"module":"HSK6","chinese_simp_full":"登山队遇到暴雪，决定撤退。","chinese_simp_cloze":"登山队遇到暴雪，决定___。","chinese_simp_answer":"撤退","chinese_trad_full":"登山隊遇到暴雪，決定撤退。","chinese_trad_cloze":"登山隊遇到暴雪，決定___。","chinese_trad_answer":"撤退","spanish_full":"El equipo de montaña encontró una tormenta y decidió retirarse.","spanish_cloze":"El equipo de montaña encontró una tormenta y decidió ___.","spanish_answer":"retirarse","pinyin":"Dēngshān duì yùdào bàoxuě, juédìng chètuì.","spanish_alternatives":["retroceder"]},{"id":"hsk6_244","level":6,"module":"HSK6","chinese_simp_full":"他要求撤销这个处罚。","chinese_simp_cloze":"他要求___这个处罚。","chinese_simp_answer":"撤销","chinese_trad_full":"他要求撤銷這個處罰。","chinese_trad_cloze":"他要求___這個處罰。","chinese_trad_answer":"撤銷","spanish_full":"Pidió que anulen esta sanción.","spanish_cloze":"Pidió que ___ esta sanción.","spanish_answer":"anulen","pinyin":"Tā yāoqiú chèxiāo zhège chǔfá.","spanish_alternatives":["dejen sin efecto"]},{"id":"hsk6_245","level":6,"module":"HSK6","chinese_simp_full":"让茶里的渣子沉淀一下。","chinese_simp_cloze":"让茶里的渣子___一下。","chinese_simp_answer":"沉淀","chinese_trad_full":"讓茶裡的渣子沉澱一下。","chinese_trad_cloze":"讓茶裡的渣子___一下。","chinese_trad_answer":"沉澱","spanish_full":"Dejá que se asiente el poso del té.","spanish_cloze":"Dejá que se ___ el poso del té.","spanish_answer":"asiente","pinyin":"Ràng chá lǐ de zhāzi chéndiàn yíxià.","spanish_alternatives":["se vaya al fondo"]},{"id":"hsk6_246","level":6,"module":"HSK6","chinese_simp_full":"会议很沉闷，有人打瞌睡。","chinese_simp_cloze":"会议很___，有人打瞌睡。","chinese_simp_answer":"沉闷","chinese_trad_full":"會議很沉悶，有人打瞌睡。","chinese_trad_cloze":"會議很___，有人打瞌睡。","chinese_trad_answer":"沉悶","spanish_full":"La reunión era muy pesada; algunos se dormían.","spanish_cloze":"La reunión era muy ___; algunos se dormían.","spanish_answer":"pesada","pinyin":"Huìyì hěn chénmèn, yǒurén dǎ kēshuì.","spanish_alternatives":["aburrida"]},{"id":"hsk6_247","level":6,"module":"HSK6","chinese_simp_full":"他望着窗外，陷入沉思。","chinese_simp_cloze":"他望着窗外，陷入___。","chinese_simp_answer":"沉思","chinese_trad_full":"他望著窗外，陷入沉思。","chinese_trad_cloze":"他望著窗外，陷入___。","chinese_trad_answer":"沉思","spanish_full":"Miraba por la ventana, sumido en sus pensamientos.","spanish_cloze":"Miraba por la ventana, ___ en sus pensamientos.","spanish_answer":"sumido","pinyin":"Tā wàng zhe chuāng wài, xiànrù chénsī.","spanish_alternatives":["pensativo"]},{"id":"hsk6_248","level":6,"module":"HSK6","chinese_simp_full":"这个消息让大家心情沉重。","chinese_simp_cloze":"这个消息让大家心情___。","chinese_simp_answer":"沉重","chinese_trad_full":"這個消息讓大家心情沉重。","chinese_trad_cloze":"這個消息讓大家心情___。","chinese_trad_answer":"沉重","spanish_full":"La noticia dejó a todos con el corazón pesado.","spanish_cloze":"La noticia dejó a todos con el corazón ___.","spanish_answer":"pesado","pinyin":"Zhège xiāoxi ràng dàjiā xīnqíng chénzhòng.","spanish_alternatives":["apesadumbrados"]},{"id":"hsk6_249","level":6,"module":"HSK6","chinese_simp_full":"考场上他很沉着。","chinese_simp_cloze":"考场上他很___。","chinese_simp_answer":"沉着","chinese_trad_full":"考場上他很沉著。","chinese_trad_cloze":"考場上他很___。","chinese_trad_answer":"沉著","spanish_full":"En el examen se mantuvo muy sereno.","spanish_cloze":"En el examen se mantuvo muy ___.","spanish_answer":"sereno","pinyin":"Kǎochǎng shàng tā hěn chénzhuó.","spanish_alternatives":["tranquilo"]},{"id":"hsk6_250","level":6,"module":"HSK6","chinese_simp_full":"这台机器太陈旧，该换了。","chinese_simp_cloze":"这台机器太___，该换了。","chinese_simp_answer":"陈旧","chinese_trad_full":"這臺機器太陳舊，該換了。","chinese_trad_cloze":"這臺機器太___，該換了。","chinese_trad_answer":"陳舊","spanish_full":"Esta máquina ya está muy anticuada; hay que cambiarla.","spanish_cloze":"Esta máquina ya está muy ___; hay que cambiarla.","spanish_answer":"anticuada","pinyin":"Zhè tái jīqì tài chénjiù, gāi huàn le.","spanish_alternatives":["vieja"]},{"id":"hsk6_251","level":6,"module":"HSK6","chinese_simp_full":"橱窗里陈列着新到的鞋。","chinese_simp_cloze":"橱窗里___着新到的鞋。","chinese_simp_answer":"陈列","chinese_trad_full":"櫥窗裡陳列著新到的鞋。","chinese_trad_cloze":"櫥窗裡___著新到的鞋。","chinese_trad_answer":"陳列","spanish_full":"En la vidriera se exhiben los zapatos recién llegados.","spanish_cloze":"En la vidriera se ___ los zapatos recién llegados.","spanish_answer":"exhiben","pinyin":"Chúchuāng lǐ chénliè zhe xīn dào de xié.","spanish_alternatives":["están expuestos"]},{"id":"hsk6_252","level":6,"module":"HSK6","chinese_simp_full":"他向警察陈述了事情经过。","chinese_simp_cloze":"他向警察___了事情经过。","chinese_simp_answer":"陈述","chinese_trad_full":"他向警察陳述了事情經過。","chinese_trad_cloze":"他向警察___了事情經過。","chinese_trad_answer":"陳述","spanish_full":"Le relató a la policía lo que pasó.","spanish_cloze":"Le ___ a la policía lo que pasó.","spanish_answer":"relató","pinyin":"Tā xiàng jǐngchá chénshù le shìqing jīngguò.","spanish_alternatives":["explicó"]},{"id":"hsk6_253","level":6,"module":"HSK6","chinese_simp_full":"找到一份称心如意的工作。","chinese_simp_cloze":"找到一份___的工作。","chinese_simp_answer":"称心如意","chinese_trad_full":"找到一份稱心如意的工作。","chinese_trad_cloze":"找到一份___的工作。","chinese_trad_answer":"稱心如意","spanish_full":"Encontró un trabajo a su entera medida.","spanish_cloze":"Encontró un trabajo a su entera ___.","spanish_answer":"medida","pinyin":"Zhǎodào yí fèn chènxīnrúyì de gōngzuò.","spanish_alternatives":["como quería"]},{"id":"hsk6_254","level":6,"module":"HSK6","chinese_simp_full":"红裙子把她的皮肤衬托得很白。","chinese_simp_cloze":"红裙子把她的皮肤___得很白。","chinese_simp_answer":"衬托","chinese_trad_full":"紅裙子把她的皮膚襯托得很白。","chinese_trad_cloze":"紅裙子把她的皮膚___得很白。","chinese_trad_answer":"襯托","spanish_full":"El vestido rojo resalta lo blanca que es su piel.","spanish_cloze":"El vestido rojo ___ lo blanca que es su piel.","spanish_answer":"resalta","pinyin":"Hóng qúnzi bǎ tā de pífū chèntuō de hěn bái.","spanish_alternatives":["hace resaltar"]},{"id":"hsk6_255","level":6,"module":"HSK6","chinese_simp_full":"他获得了冠军的称号。","chinese_simp_cloze":"他获得了冠军的___。","chinese_simp_answer":"称号","chinese_trad_full":"他獲得了冠軍的稱號。","chinese_trad_cloze":"他獲得了冠軍的___。","chinese_trad_answer":"稱號","spanish_full":"Obtuvo el título de campeón.","spanish_cloze":"Obtuvo el ___ de campeón.","spanish_answer":"título","pinyin":"Tā huòdé le guànjūn de chēnghào."},{"id":"hsk6_256","level":6,"module":"HSK6","chinese_simp_full":"我们乘高铁去北京。","chinese_simp_cloze":"我们___高铁去北京。","chinese_simp_answer":"乘","chinese_trad_full":"我們乘高鐵去北京。","chinese_trad_cloze":"我們___高鐵去北京。","chinese_trad_answer":"乘","spanish_full":"Vamos a Beijing en el tren bala.","spanish_cloze":"Vamos a Beijing en el ___.","spanish_answer":"tren bala","pinyin":"Wǒmen chéng gāotiě qù Běijīng.","spanish_alternatives":["tren de alta velocidad"]},{"id":"hsk6_257","level":6,"module":"HSK6","chinese_simp_full":"雨后，天边呈现一道彩虹。","chinese_simp_cloze":"雨后，天边___一道彩虹。","chinese_simp_answer":"呈现","chinese_trad_full":"雨後，天邊呈現一道彩虹。","chinese_trad_cloze":"雨後，天邊___一道彩虹。","chinese_trad_answer":"呈現","spanish_full":"Después de la lluvia, apareció un arcoíris en el horizonte.","spanish_cloze":"Después de la lluvia, ___ un arcoíris en el horizonte.","spanish_answer":"apareció","pinyin":"Yǔ hòu, tiānbiān chéngxiàn yí dào cǎihóng.","spanish_alternatives":["se presentó"]},{"id":"hsk6_258","level":6,"module":"HSK6","chinese_simp_full":"山顶上有一座古老的城堡。","chinese_simp_cloze":"山顶上有一座古老的___。","chinese_simp_answer":"城堡","chinese_trad_full":"山頂上有一座古老的城堡。","chinese_trad_cloze":"山頂上有一座古老的___。","chinese_trad_answer":"城堡","spanish_full":"Sobre la colina hay un castillo antiguo.","spanish_cloze":"Sobre la colina hay un ___ antiguo.","spanish_answer":"castillo","pinyin":"Shāndǐng shàng yǒu yí zuò gǔlǎo de chéngbǎo."},{"id":"hsk6_259","level":6,"module":"HSK6","chinese_simp_full":"迟到的人受到了惩罚。","chinese_simp_cloze":"迟到的人受到了___。","chinese_simp_answer":"惩罚","chinese_trad_full":"遲到的人受到了懲罰。","chinese_trad_cloze":"遲到的人受到了___。","chinese_trad_answer":"懲罰","spanish_full":"Los que llegaron tarde fueron castigados.","spanish_cloze":"Los que llegaron tarde fueron ___.","spanish_answer":"castigados","pinyin":"Chídào de rén shòudào le chéngfá.","spanish_alternatives":["castigo"]},{"id":"hsk6_260","level":6,"module":"HSK6","chinese_simp_full":"新材料帮工厂降低了成本。","chinese_simp_cloze":"新材料帮工厂降低了___。","chinese_simp_answer":"成本","chinese_trad_full":"新材料幫工廠降低了成本。","chinese_trad_cloze":"新材料幫工廠降低了___。","chinese_trad_answer":"成本","spanish_full":"El material nuevo ayudó a la fábrica a bajar costos.","spanish_cloze":"El material nuevo ayudó a la fábrica a bajar ___.","spanish_answer":"costos","pinyin":"Xīn cáiliào bāng gōngchǎng jiàngdī le chéngběn.","spanish_alternatives":["costos de producción"]},{"id":"hsk6_261","level":6,"module":"HSK6","chinese_simp_full":"价钱谈好了，成交！","chinese_simp_cloze":"价钱谈好了，___！","chinese_simp_answer":"成交","chinese_trad_full":"價錢談好了，成交！","chinese_trad_cloze":"價錢談好了，___！","chinese_trad_answer":"成交","spanish_full":"El precio quedó acordado: ¡trato hecho!","spanish_cloze":"El precio quedó acordado: ¡___!","spanish_answer":"trato hecho","pinyin":"Jiàqián tán hǎo le, chéngjiāo!"},{"id":"hsk6_262","level":6,"module":"HSK6","chinese_simp_full":"他成天玩手机，不学习。","chinese_simp_cloze":"他___玩手机，不学习。","chinese_simp_answer":"成天","chinese_trad_full":"他成天玩手機，不學習。","chinese_trad_cloze":"他___玩手機，不學習。","chinese_trad_answer":"成天","spanish_full":"Pasa todo el día con el celular y no estudia.","spanish_cloze":"Pasa ___ con el celular y no estudia.","spanish_answer":"todo el día","pinyin":"Tā chéngtiān wán shǒujī, bù xuéxí.","spanish_alternatives":["el día entero"]},{"id":"hsk6_263","level":6,"module":"HSK6","chinese_simp_full":"锻炼三个月，成效明显。","chinese_simp_cloze":"锻炼三个月，___明显。","chinese_simp_answer":"成效","chinese_trad_full":"鍛鍊三個月，成效明顯。","chinese_trad_cloze":"鍛鍊三個月，___明顯。","chinese_trad_answer":"成效","spanish_full":"Tres meses de ejercicio y los resultados se notan.","spanish_cloze":"Tres meses de ejercicio y los ___ se notan.","spanish_answer":"resultados","pinyin":"Duànliàn sān gè yuè, chéngxiào míngxiǎn.","spanish_alternatives":["efectos"]},{"id":"hsk6_264","level":6,"module":"HSK6","chinese_simp_full":"他不是成心撞你的。","chinese_simp_cloze":"他不是___撞你的。","chinese_simp_answer":"成心","chinese_trad_full":"他不是成心撞你的。","chinese_trad_cloze":"他不是___撞你的。","chinese_trad_answer":"成心","spanish_full":"No te chocó a propósito.","spanish_cloze":"No te chocó a ___.","spanish_answer":"propósito","pinyin":"Tā bú shì chéngxīn zhuàng nǐ de.","spanish_alternatives":["a propósito"]},{"id":"hsk6_265","level":6,"module":"HSK6","chinese_simp_full":"我们俱乐部有三十名成员。","chinese_simp_cloze":"我们俱乐部有三十名___。","chinese_simp_answer":"成员","chinese_trad_full":"我們俱樂部有三十名成員。","chinese_trad_cloze":"我們俱樂部有三十名___。","chinese_trad_answer":"成員","spanish_full":"Nuestro club tiene treinta miembros.","spanish_cloze":"Nuestro club tiene treinta ___.","spanish_answer":"miembros","pinyin":"Wǒmen jùlèbù yǒu sānshí míng chéngyuán."},{"id":"hsk6_266","level":6,"module":"HSK6","chinese_simp_full":"明年运动会由我们学校承办。","chinese_simp_cloze":"明年运动会由我们学校___。","chinese_simp_answer":"承办","chinese_trad_full":"明年運動會由我們學校承辦。","chinese_trad_cloze":"明年運動會由我們學校___。","chinese_trad_answer":"承辦","spanish_full":"El año próximo nuestra escuela organiza los juegos deportivos.","spanish_cloze":"El año próximo nuestra escuela ___ los juegos deportivos.","spanish_answer":"organiza","pinyin":"Míngnián yùndònghuì yóu wǒmen xuéxiào chéngbàn.","spanish_alternatives":["se encarga de organizar"]},{"id":"hsk6_267","level":6,"module":"HSK6","chinese_simp_full":"这家公司承包了修路工程。","chinese_simp_cloze":"这家公司___了修路工程。","chinese_simp_answer":"承包","chinese_trad_full":"這家公司承包了修路工程。","chinese_trad_cloze":"這家公司___了修路工程。","chinese_trad_answer":"承包","spanish_full":"Esta empresa se adjudicó la obra del camino.","spanish_cloze":"Esta empresa se ___ la obra del camino.","spanish_answer":"adjudicó","pinyin":"Zhè jiā gōngsī chéngbāo le xiūlù gōngchéng.","spanish_alternatives":["se quedó con"]},{"id":"hsk6_268","level":6,"module":"HSK6","chinese_simp_full":"他承诺周末带孩子们去公园。","chinese_simp_cloze":"他___周末带孩子们去公园。","chinese_simp_answer":"承诺","chinese_trad_full":"他承諾週末帶孩子們去公園。","chinese_trad_cloze":"他___週末帶孩子們去公園。","chinese_trad_answer":"承諾","spanish_full":"Prometió llevar a los chicos al parque el fin de semana.","spanish_cloze":"___ llevar a los chicos al parque el fin de semana.","spanish_answer":"Prometió","pinyin":"Tā chéngnuò zhōumò dài háizimen qù gōngyuán.","spanish_alternatives":["Se comprometió"]},{"id":"hsk6_269","level":6,"module":"HSK6","chinese_simp_full":"早餐我喝了一杯橙汁。","chinese_simp_cloze":"早餐我喝了一杯___汁。","chinese_simp_answer":"橙","chinese_trad_full":"早餐我喝了一杯橙汁。","chinese_trad_cloze":"早餐我喝了一杯___汁。","chinese_trad_answer":"橙","spanish_full":"En el desayuno tomé un vaso de jugo de naranja.","spanish_cloze":"En el desayuno tomé un vaso de ___.","spanish_answer":"jugo de naranja","pinyin":"Zǎocān wǒ hē le yì bēi chéngzhī.","spanish_alternatives":["jugo"]},{"id":"hsk6_270","level":6,"module":"HSK6","chinese_simp_full":"他发声明澄清了误会。","chinese_simp_cloze":"他发声明___了误会。","chinese_simp_answer":"澄清","chinese_trad_full":"他發聲明澄清了誤會。","chinese_trad_cloze":"他發聲明___了誤會。","chinese_trad_answer":"澄清","spanish_full":"Publicó un comunicado para aclarar el malentendido.","spanish_cloze":"Publicó un comunicado para ___ el malentendido.","spanish_answer":"aclarar","pinyin":"Tā fā shēngmíng chéngqīng le wùhuì.","spanish_alternatives":["despejar"]},{"id":"hsk6_271","level":6,"module":"HSK6","chinese_simp_full":"妈妈给我盛了一碗汤。","chinese_simp_cloze":"妈妈给我___了一碗汤。","chinese_simp_answer":"盛","chinese_trad_full":"媽媽給我盛了一碗湯。","chinese_trad_cloze":"媽媽給我___了一碗湯。","chinese_trad_answer":"盛","spanish_full":"Mamá me sirvió un bol de sopa.","spanish_cloze":"Mamá me ___ un bol de sopa.","spanish_answer":"sirvió","pinyin":"Māma gěi wǒ chéng le yì wǎn tāng.","spanish_alternatives":["sirvió un bol"]},{"id":"hsk6_272","level":6,"module":"HSK6","chinese_simp_full":"向老师们致以诚挚的问候。","chinese_simp_cloze":"向老师们致以___的问候。","chinese_simp_answer":"诚挚","chinese_trad_full":"向老師們致以誠摯的問候。","chinese_trad_cloze":"向老師們致以___的問候。","chinese_trad_answer":"誠摯","spanish_full":"Un saludo muy cordial para los profesores.","spanish_cloze":"Un saludo muy ___ para los profesores.","spanish_answer":"cordial","pinyin":"Xiàng lǎoshīmen zhì yǐ chéngzhì de wènhòu.","spanish_alternatives":["sincero"]},{"id":"hsk6_273","level":6,"module":"HSK6","chinese_simp_full":"超市的电子秤很准。","chinese_simp_cloze":"超市的电子___很准。","chinese_simp_answer":"秤","chinese_trad_full":"超市的電子秤很準。","chinese_trad_cloze":"超市的電子___很準。","chinese_trad_answer":"秤","spanish_full":"La balanza electrónica del súper es bien precisa.","spanish_cloze":"La ___ electrónica del súper es bien precisa.","spanish_answer":"balanza","pinyin":"Chāoshì de diànzǐchèng hěn zhǔn."},{"id":"hsk6_274","level":6,"module":"HSK6","chinese_simp_full":"年轻人要能吃苦。","chinese_simp_cloze":"年轻人要能___。","chinese_simp_answer":"吃苦","chinese_trad_full":"年輕人要能吃苦。","chinese_trad_cloze":"年輕人要能___。","chinese_trad_answer":"吃苦","spanish_full":"Los jóvenes tienen que saber sufrir.","spanish_cloze":"Los jóvenes tienen que saber ___.","spanish_answer":"sufrir","pinyin":"Niánqīngrén yào néng chīkǔ.","spanish_alternatives":["aguantar las duras"]},{"id":"hsk6_275","level":6,"module":"HSK6","chinese_simp_full":"他爬山爬得很吃力。","chinese_simp_cloze":"他爬山爬得很___。","chinese_simp_answer":"吃力","chinese_trad_full":"他爬山爬得很吃力。","chinese_trad_cloze":"他爬山爬得很___。","chinese_trad_answer":"吃力","spanish_full":"Le costaba mucho subir la montaña.","spanish_cloze":"Le ___ mucho subir la montaña.","spanish_answer":"costaba","pinyin":"Tā pá shān pá de hěn chīlì.","spanish_alternatives":["le pesaba"]},{"id":"hsk6_276","level":6,"module":"HSK6","chinese_simp_full":"这种电池特别持久。","chinese_simp_cloze":"这种电池特别___。","chinese_simp_answer":"持久","chinese_trad_full":"這種電池特別持久。","chinese_trad_cloze":"這種電池特別___。","chinese_trad_answer":"持久","spanish_full":"Esta batería dura muchísimo.","spanish_cloze":"Esta batería ___ muchísimo.","spanish_answer":"dura","pinyin":"Zhè zhǒng diànchí tèbié chíjiǔ.","spanish_alternatives":["aguanta mucho"]},{"id":"hsk6_277","level":6,"module":"HSK6","chinese_simp_full":"年纪大了，反应有点迟钝。","chinese_simp_cloze":"年纪大了，反应有点___。","chinese_simp_answer":"迟钝","chinese_trad_full":"年紀大了，反應有點遲鈍。","chinese_trad_cloze":"年紀大了，反應有點___。","chinese_trad_answer":"遲鈍","spanish_full":"Con los años, reacciona un poco lento.","spanish_cloze":"Con los años, reacciona un poco ___.","spanish_answer":"lento","pinyin":"Niánjì dà le, fǎnyìng yǒudiǎn chídùn.","spanish_alternatives":["poco ágil"]},{"id":"hsk6_278","level":6,"module":"HSK6","chinese_simp_full":"爷爷动作迟缓，走得慢。","chinese_simp_cloze":"爷爷动作___，走得慢。","chinese_simp_answer":"迟缓","chinese_trad_full":"爺爺動作遲緩，走得慢。","chinese_trad_cloze":"爺爺動作___，走得慢。","chinese_trad_answer":"遲緩","spanish_full":"El abuelo se mueve despacio, camina lento.","spanish_cloze":"El abuelo se mueve ___, camina lento.","spanish_answer":"despacio","pinyin":"Yéye dòngzuò chíhuǎn, zǒu de màn.","spanish_alternatives":["con lentitud"]},{"id":"hsk6_279","level":6,"module":"HSK6","chinese_simp_full":"他迟疑了一下才回答。","chinese_simp_cloze":"他___了一下才回答。","chinese_simp_answer":"迟疑","chinese_trad_full":"他遲疑了一下才回答。","chinese_trad_cloze":"他___了一下才回答。","chinese_trad_answer":"遲疑","spanish_full":"Dudó un momento antes de contestar.","spanish_cloze":"___ un momento antes de contestar.","spanish_answer":"Dudó","pinyin":"Tā chíyí le yíxià cái huídá.","spanish_alternatives":["Dudó un momento"]},{"id":"hsk6_280","level":6,"module":"HSK6","chinese_simp_full":"赤道附近没有冬天。","chinese_simp_cloze":"___附近没有冬天。","chinese_simp_answer":"赤道","chinese_trad_full":"赤道附近沒有冬天。","chinese_trad_cloze":"___附近沒有冬天。","chinese_trad_answer":"赤道","spanish_full":"Cerca del ecuador no hay invierno.","spanish_cloze":"Cerca del ___ no hay invierno.","spanish_answer":"ecuador","pinyin":"Chìdào fùjìn méiyǒu dōngtiān."},{"id":"hsk6_281","level":6,"module":"HSK6","chinese_simp_full":"公司今年出现了赤字。","chinese_simp_cloze":"公司今年出现了___。","chinese_simp_answer":"赤字","chinese_trad_full":"公司今年出現了赤字。","chinese_trad_cloze":"公司今年出現了___。","chinese_trad_answer":"赤字","spanish_full":"La empresa terminó el año en números rojos.","spanish_cloze":"La empresa terminó el año en ___.","spanish_answer":"números rojos","pinyin":"Gōngsī jīnnián chūxiàn le chìzì.","spanish_alternatives":["déficit"]},{"id":"hsk6_282","level":6,"module":"HSK6","chinese_simp_full":"大箱子充当了他的桌子。","chinese_simp_cloze":"大箱子___了他的桌子。","chinese_simp_answer":"充当","chinese_trad_full":"大箱子充當了他的桌子。","chinese_trad_cloze":"大箱子___了他的桌子。","chinese_trad_answer":"充當","spanish_full":"Una caja grande le sirvió de escritorio.","spanish_cloze":"Una caja grande le ___ de escritorio.","spanish_answer":"sirvió","pinyin":"Dà xiāngzi chōngdāng le tā de zhuōzi.","spanish_alternatives":["le hizo de"]},{"id":"hsk6_283","level":6,"module":"HSK6","chinese_simp_full":"他精力充沛，从不喊累。","chinese_simp_cloze":"他精力___，从不喊累。","chinese_simp_answer":"充沛","chinese_trad_full":"他精力充沛，從不喊累。","chinese_trad_cloze":"他精力___，從不喊累。","chinese_trad_answer":"充沛","spanish_full":"Tiene una energía enorme; nunca dice que está cansado.","spanish_cloze":"Tiene una ___ enorme; nunca dice que está cansado.","spanish_answer":"energía","pinyin":"Tā jīnglì chōngpèi, cóngbù hǎn lèi.","spanish_alternatives":["ánimo"]},{"id":"hsk6_284","level":6,"module":"HSK6","chinese_simp_full":"读书让我的假期很充实。","chinese_simp_cloze":"读书让我的假期很___。","chinese_simp_answer":"充实","chinese_trad_full":"讀書讓我的假期很充實。","chinese_trad_cloze":"讀書讓我的假期很___。","chinese_trad_answer":"充實","spanish_full":"Leer hace que mis vacaciones sean muy provechosas.","spanish_cloze":"Leer hace que mis vacaciones sean muy ___.","spanish_answer":"provechosas","pinyin":"Dúshū ràng wǒ de jiàqī hěn chōngshí.","spanish_alternatives":["plenas"]},{"id":"hsk6_285","level":6,"module":"HSK6","chinese_simp_full":"灯光充足，房间很亮。","chinese_simp_cloze":"灯光___，房间很亮。","chinese_simp_answer":"充足","chinese_trad_full":"燈光充足，房間很亮。","chinese_trad_cloze":"燈光___，房間很亮。","chinese_trad_answer":"充足","spanish_full":"Con buena luz, la habitación queda bien iluminada.","spanish_cloze":"Con buena ___, la habitación queda bien iluminada.","spanish_answer":"luz","pinyin":"Dēngguāng chōngzú, fángjiān hěn liàng.","spanish_alternatives":["iluminación"]},{"id":"hsk6_286","level":6,"module":"HSK6","chinese_simp_full":"别冲动，先冷静想想。","chinese_simp_cloze":"别___，先冷静想想。","chinese_simp_answer":"冲动","chinese_trad_full":"別衝動，先冷靜想想。","chinese_trad_cloze":"別___，先冷靜想想。","chinese_trad_answer":"衝動","spanish_full":"No te guíes por el impulso; pensalo con calma.","spanish_cloze":"No te guíes por el ___; pensalo con calma.","spanish_answer":"impulso","pinyin":"Bié chōngdòng, xiān lěngjìng xiǎngxiǎng."},{"id":"hsk6_287","level":6,"module":"HSK6","chinese_simp_full":"海浪不停地冲击堤坝。","chinese_simp_cloze":"海浪不停地___堤坝。","chinese_simp_answer":"冲击","chinese_trad_full":"海浪不停地衝擊堤壩。","chinese_trad_cloze":"海浪不停地___堤壩。","chinese_trad_answer":"衝擊","spanish_full":"Las olas golpean el dique sin parar.","spanish_cloze":"Las olas ___ el dique sin parar.","spanish_answer":"golpean","pinyin":"Hǎilàng bú tíng de chōngjī dībà.","spanish_alternatives":["pegan contra"]},{"id":"hsk6_288","level":6,"module":"HSK6","chinese_simp_full":"两兄弟为小事起了冲突。","chinese_simp_cloze":"两兄弟为小事起了___。","chinese_simp_answer":"冲突","chinese_trad_full":"兩兄弟為小事起了衝突。","chinese_trad_cloze":"兩兄弟為小事起了___。","chinese_trad_answer":"衝突","spanish_full":"Los dos hermanos tuvieron un conflicto por una pavada.","spanish_cloze":"Los dos hermanos tuvieron un ___ por una pavada.","spanish_answer":"conflicto","pinyin":"Liǎng xiōngdì wèi xiǎoshì qǐ le chōngtū."},{"id":"hsk6_289","level":6,"module":"HSK6","chinese_simp_full":"小球迷特别崇拜那个前锋。","chinese_simp_cloze":"小球迷特别___那个前锋。","chinese_simp_answer":"崇拜","chinese_trad_full":"小球迷特別崇拜那個前鋒。","chinese_trad_cloze":"小球迷特別___那個前鋒。","chinese_trad_answer":"崇拜","spanish_full":"El chico admira muchísimo a ese delantero.","spanish_cloze":"El chico ___ muchísimo a ese delantero.","spanish_answer":"admira","pinyin":"Xiǎo qiúmí tèbié chóngbài nàge qiánfēng.","spanish_alternatives":["idolatra"]},{"id":"hsk6_290","level":6,"module":"HSK6","chinese_simp_full":"教师是很崇高的职业。","chinese_simp_cloze":"教师是很___的职业。","chinese_simp_answer":"崇高","chinese_trad_full":"教師是很崇高的職業。","chinese_trad_cloze":"教師是很___的職業。","chinese_trad_answer":"崇高","spanish_full":"Ser maestro es una profesión muy noble.","spanish_cloze":"Ser maestro es una profesión muy ___.","spanish_answer":"noble","pinyin":"Jiàoshī shì hěn chónggāo de zhíyè."},{"id":"hsk6_291","level":6,"module":"HSK6","chinese_simp_full":"学生们对老校长充满崇敬。","chinese_simp_cloze":"学生们对老校长充满___。","chinese_simp_answer":"崇敬","chinese_trad_full":"學生們對老校長充滿崇敬。","chinese_trad_cloze":"學生們對老校長充滿___。","chinese_trad_answer":"崇敬","spanish_full":"Los alumnos sienten enorme respeto por el viejo director.","spanish_cloze":"Los alumnos sienten enorme ___ por el viejo director.","spanish_answer":"respeto","pinyin":"Xuéshēngmen duì lǎo xiàozhǎng chōngmǎn chóngjìng.","spanish_alternatives":["admiración"]},{"id":"hsk6_292","level":6,"module":"HSK6","chinese_simp_full":"两座山的影子重叠在一起。","chinese_simp_cloze":"两座山的影子___在一起。","chinese_simp_answer":"重叠","chinese_trad_full":"兩座山的影子重疊在一起。","chinese_trad_cloze":"兩座山的影子___在一起。","chinese_trad_answer":"重疊","spanish_full":"Las sombras de los dos cerros se superponen.","spanish_cloze":"Las sombras de los dos cerros se ___.","spanish_answer":"superponen","pinyin":"Liǎng zuò shān de yǐngzi chóngdié zài yìqǐ.","spanish_alternatives":["se enciman"]},{"id":"hsk6_293","level":6,"module":"HSK6","chinese_simp_full":"市中心人口非常稠密。","chinese_simp_cloze":"市中心人口非常___。","chinese_simp_answer":"稠密","chinese_trad_full":"市中心人口非常稠密。","chinese_trad_cloze":"市中心人口非常___。","chinese_trad_answer":"稠密","spanish_full":"El centro de la ciudad está muy densamente poblado.","spanish_cloze":"El centro de la ciudad está muy ___ poblado.","spanish_answer":"densamente","pinyin":"Shì zhōngxīn rénkǒu fēicháng chóumì.","spanish_alternatives":["poblado"]},{"id":"hsk6_294","level":6,"module":"HSK6","chinese_simp_full":"大家正筹备毕业晚会。","chinese_simp_cloze":"大家正___毕业晚会。","chinese_simp_answer":"筹备","chinese_trad_full":"大家正籌備畢業晚會。","chinese_trad_cloze":"大家正___畢業晚會。","chinese_trad_answer":"籌備","spanish_full":"Todos están preparando la fiesta de graduación.","spanish_cloze":"Todos están ___ la fiesta de graduación.","spanish_answer":"preparando","pinyin":"Dàjiā zhèng chóubèi bìyè wǎnhuì.","spanish_alternatives":["organizando"]},{"id":"hsk6_295","level":6,"module":"HSK6","chinese_simp_full":"电影揭露了人性的丑恶。","chinese_simp_cloze":"电影揭露了人性的___。","chinese_simp_answer":"丑恶","chinese_trad_full":"電影揭露了人性的醜惡。","chinese_trad_cloze":"電影揭露了人性的___。","chinese_trad_answer":"醜惡","spanish_full":"La película muestra lo feo del ser humano.","spanish_cloze":"La película muestra lo ___ del ser humano.","spanish_answer":"feo","pinyin":"Diànyǐng jiēlù le rénxìng de chǒu'è.","spanish_alternatives":["lo más repugnante"]},{"id":"hsk6_296","level":6,"module":"HSK6","chinese_simp_full":"他想读书，给自己找出路。","chinese_simp_cloze":"他想读书，给自己找___。","chinese_simp_answer":"出路","chinese_trad_full":"他想讀書，給自己找出路。","chinese_trad_cloze":"他想讀書，給自己找___。","chinese_trad_answer":"出路","spanish_full":"Quiere estudiar para buscarse un futuro.","spanish_cloze":"Quiere estudiar para buscarse un ___.","spanish_answer":"futuro","pinyin":"Tā xiǎng dúshū, gěi zìjǐ zhǎo chūlù.","spanish_alternatives":["un camino"]},{"id":"hsk6_297","level":6,"module":"HSK6","chinese_simp_full":"他被最好的朋友出卖了。","chinese_simp_cloze":"他被最好的朋友___了。","chinese_simp_answer":"出卖","chinese_trad_full":"他被最好的朋友出賣了。","chinese_trad_cloze":"他被最好的朋友___了。","chinese_trad_answer":"出賣","spanish_full":"Su mejor amigo lo traicionó.","spanish_cloze":"Su mejor amigo lo ___.","spanish_answer":"traicionó","pinyin":"Tā bèi zuì hǎo de péngyou chūmài le.","spanish_alternatives":["vendió"]},{"id":"hsk6_298","level":6,"module":"HSK6","chinese_simp_full":"他出身农村，靠努力成功。","chinese_simp_cloze":"他___农村，靠努力成功。","chinese_simp_answer":"出身","chinese_trad_full":"他出身農村，靠努力成功。","chinese_trad_cloze":"他___農村，靠努力成功。","chinese_trad_answer":"出身","spanish_full":"Viene del campo y triunfó con esfuerzo.","spanish_cloze":"___ del campo y triunfó con esfuerzo.","spanish_answer":"Viene","pinyin":"Tā chūshēn nóngcūn, kào nǔlì chénggōng.","spanish_alternatives":["Es de origen rural"]},{"id":"hsk6_299","level":6,"module":"HSK6","chinese_simp_full":"他看老照片看得出神。","chinese_simp_cloze":"他看老照片看得___。","chinese_simp_answer":"出神","chinese_trad_full":"他看老照片看得出神。","chinese_trad_cloze":"他看老照片看得___。","chinese_trad_answer":"出神","spanish_full":"Mirando las fotos viejas, se quedó en su mundo.","spanish_cloze":"Mirando las fotos viejas, se quedó ___.","spanish_answer":"en su mundo","pinyin":"Tā kàn lǎo zhàopiàn kàn de chūshén.","spanish_alternatives":["absorto"]},{"id":"hsk6_300","level":6,"module":"HSK6","chinese_simp_full":"这孩子将来必有出息。","chinese_simp_cloze":"这孩子将来必有___。","chinese_simp_answer":"出息","chinese_trad_full":"這孩子將來必有出息。","chinese_trad_cloze":"這孩子將來必有___。","chinese_trad_answer":"出息","spanish_full":"Este chico va a llegar lejos.","spanish_cloze":"Este chico va a llegar ___.","spanish_answer":"lejos","pinyin":"Zhè háizi jiānglái bì yǒu chūxì.","spanish_alternatives":["va a ser alguien"]}],
'TOCFL': [{"id":"tocfl-01","level":1,"module":"TOCFL","spanish_full":"Gracias por tu ayuda.","spanish_cloze":"Gracias por tu ___.","spanish_answer":"ayuda","spanish_alternatives":["apoyo"],"chinese_simp_full":"谢谢您的帮忙。","chinese_simp_cloze":"谢谢您的___。","chinese_simp_answer":"帮忙","chinese_trad_full":"謝謝您的幫忙。","chinese_trad_cloze":"謝謝您的___。","chinese_trad_answer":"幫忙","pinyin":"Xièxie nín de bāngmáng."},{"id":"tocfl-02","level":1,"module":"TOCFL","spanish_full":"Disculpe, ¿dónde está el baño?","spanish_cloze":"___, ¿dónde está el baño?","spanish_answer":"Disculpe","spanish_alternatives":["perdón","perdon","oiga"],"chinese_simp_full":"请问，厕所在哪里？","chinese_simp_cloze":"___，厕所在哪里？","chinese_simp_answer":"请问","chinese_trad_full":"請問，廁所在哪裡？","chinese_trad_cloze":"___，廁所在哪裡？","chinese_trad_answer":"請問","pinyin":"Qǐngwèn, cèsuǒ zài nǎlǐ?"},{"id":"tocfl-03","level":1,"module":"TOCFL","spanish_full":"Quiero sacar una tarjeta de transporte.","spanish_cloze":"Quiero sacar una tarjeta de ___.","spanish_answer":"transporte","spanish_alternatives":["metro","transporte público"],"chinese_simp_full":"我想办一张悠游卡。","chinese_simp_cloze":"我想办一张___。","chinese_simp_answer":"悠游卡","chinese_trad_full":"我想辦一張悠遊卡。","chinese_trad_cloze":"我想辦一張___。","chinese_trad_answer":"悠遊卡","pinyin":"Wǒ xiǎng bàn yì zhāng Yōuyóukǎ."},{"id":"tocfl-04","level":1,"module":"TOCFL","spanish_full":"¿Mañana va a llover?","spanish_cloze":"¿Mañana va a ___?","spanish_answer":"llover","spanish_alternatives":[],"chinese_simp_full":"明天会下雨吗？","chinese_simp_cloze":"明天会___吗？","chinese_simp_answer":"下雨","chinese_trad_full":"明天會下雨嗎？","chinese_trad_cloze":"明天會___嗎？","chinese_trad_answer":"下雨","pinyin":"Míngtiān huì xiàyǔ ma?"},{"id":"tocfl-05","level":1,"module":"TOCFL","spanish_full":"La fruta de esta tienda es muy barata.","spanish_cloze":"La fruta de esta tienda es muy ___.","spanish_answer":"barata","spanish_alternatives":["barato","económica","economica"],"chinese_simp_full":"这家店的水果很便宜。","chinese_simp_cloze":"这家店的水果很___。","chinese_simp_answer":"便宜","chinese_trad_full":"這家店的水果很便宜。","chinese_trad_cloze":"這家店的水果很___。","chinese_trad_answer":"便宜","pinyin":"Zhè jiā diàn de shuǐguǒ hěn piányi."},{"id":"tocfl-06","level":1,"module":"TOCFL","spanish_full":"Yo trabajo en Taipéi.","spanish_cloze":"Yo ___ en Taipéi.","spanish_answer":"trabajo","spanish_alternatives":["laboro"],"chinese_simp_full":"我在台北工作。","chinese_simp_cloze":"我在台北___。","chinese_simp_answer":"工作","chinese_trad_full":"我在台北工作。","chinese_trad_cloze":"我在台北___。","chinese_trad_answer":"工作","pinyin":"Wǒ zài Táiběi gōngzuò."},{"id":"tocfl-07","level":1,"module":"TOCFL","spanish_full":"Espérame, por favor.","spanish_cloze":"___, por favor.","spanish_answer":"Espérame","spanish_alternatives":["esperame","espera","Espéreme","espereme"],"chinese_simp_full":"请等我一下。","chinese_simp_cloze":"请___我一下。","chinese_simp_answer":"等","chinese_trad_full":"請等我一下。","chinese_trad_cloze":"請___我一下。","chinese_trad_answer":"等","pinyin":"Qǐng děng wǒ yíxià."},{"id":"tocfl-08","level":1,"module":"TOCFL","spanish_full":"El mercado nocturno de aquí es muy famoso.","spanish_cloze":"El mercado ___ de aquí es muy famoso.","spanish_answer":"nocturno","spanish_alternatives":["noche"],"chinese_simp_full":"这里的夜市非常有名。","chinese_simp_cloze":"这里的___非常有名。","chinese_simp_answer":"夜市","chinese_trad_full":"這裡的夜市非常有名。","chinese_trad_cloze":"這裡的___非常有名。","chinese_trad_answer":"夜市","pinyin":"Zhèlǐ de yèshì fēicháng yǒumíng."},{"id":"tocfl-09","level":1,"module":"TOCFL","spanish_full":"No hablo bien el chino.","spanish_cloze":"No hablo bien el ___.","spanish_answer":"chino","spanish_alternatives":["mandarín","mandarin"],"chinese_simp_full":"我的中文说得不好。","chinese_simp_cloze":"我的___说得不好。","chinese_simp_answer":"中文","chinese_trad_full":"我的中文說得不好。","chinese_trad_cloze":"我的___說得不好。","chinese_trad_answer":"中文","pinyin":"Wǒ de Zhōngwén shuō de bù hǎo."},{"id":"tocfl-10","level":1,"module":"TOCFL","spanish_full":"¿Has comido fideos con carne de res?","spanish_cloze":"¿Has ___ fideos con carne de res?","spanish_answer":"comido","spanish_alternatives":["probado"],"chinese_simp_full":"你吃过牛肉面吗？","chinese_simp_cloze":"你___牛肉面吗？","chinese_simp_answer":"吃过","chinese_trad_full":"你吃過牛肉麵嗎？","chinese_trad_cloze":"你___牛肉麵嗎？","chinese_trad_answer":"吃過","pinyin":"Nǐ chī guò niúròu miàn ma?"},{"id":"tocfl-11","level":1,"module":"TOCFL","spanish_full":"El tiempo está cada vez más caluroso.","spanish_cloze":"El tiempo está cada vez más ___.","spanish_answer":"caluroso","spanish_alternatives":["caliente","cálido","calido"],"chinese_simp_full":"天气越来越热了。","chinese_simp_cloze":"天气越来越___了。","chinese_simp_answer":"热","chinese_trad_full":"天氣越來越熱了。","chinese_trad_cloze":"天氣越來越___了。","chinese_trad_answer":"熱","pinyin":"Tiānqì yuèláiyuè rè le."},{"id":"tocfl-12","level":1,"module":"TOCFL","spanish_full":"Por favor, pon el equipaje aquí.","spanish_cloze":"Por favor, pon el equipaje ___.","spanish_answer":"aquí","spanish_alternatives":["aqui","acá","aca"],"chinese_simp_full":"请把行李放在这里。","chinese_simp_cloze":"请把行李放在___。","chinese_simp_answer":"这里","chinese_trad_full":"請把行李放在這裡。","chinese_trad_cloze":"請把行李放在___。","chinese_trad_answer":"這裡","pinyin":"Qǐng bǎ xíngli fàng zài zhèlǐ."},{"id":"tocfl-13","level":1,"module":"TOCFL","spanish_full":"Quiero pedir hora con el médico.","spanish_cloze":"Quiero pedir ___ con el médico.","spanish_answer":"hora","spanish_alternatives":["cita","turno"],"chinese_simp_full":"我要预约看医生。","chinese_simp_cloze":"我要___看医生。","chinese_simp_answer":"预约","chinese_trad_full":"我要預約看醫生。","chinese_trad_cloze":"我要___看醫生。","chinese_trad_answer":"預約","pinyin":"Wǒ yào yùyuē kàn yīshēng."},{"id":"tocfl-14","level":1,"module":"TOCFL","spanish_full":"Esta calle está muy congestionada.","spanish_cloze":"Esta calle está muy ___.","spanish_answer":"congestionada","spanish_alternatives":["atascada","tapada"],"chinese_simp_full":"这条路很塞车。","chinese_simp_cloze":"这条路很___。","chinese_simp_answer":"塞车","chinese_trad_full":"這條路很塞車。","chinese_trad_cloze":"這條路很___。","chinese_trad_answer":"塞車","pinyin":"Zhè tiáo lù hěn sāichē."},{"id":"tocfl-15","level":1,"module":"TOCFL","spanish_full":"La semana que viene tenemos un examen.","spanish_cloze":"La semana que viene tenemos un ___.","spanish_answer":"examen","spanish_alternatives":["test"],"chinese_simp_full":"我们下个星期考试。","chinese_simp_cloze":"我们下个星期___。","chinese_simp_answer":"考试","chinese_trad_full":"我們下個星期考試。","chinese_trad_cloze":"我們下個星期___。","chinese_trad_answer":"考試","pinyin":"Wǒmen xià gè xīngqī kǎoshì."},{"id":"tocfl-16","level":1,"module":"TOCFL","spanish_full":"Este diccionario es muy útil.","spanish_cloze":"Este ___ es muy útil.","spanish_answer":"diccionario","spanish_alternatives":[],"chinese_simp_full":"这本字典很有用。","chinese_simp_cloze":"这本___很有用。","chinese_simp_answer":"字典","chinese_trad_full":"這本字典很有用。","chinese_trad_cloze":"這本___很有用。","chinese_trad_answer":"字典","pinyin":"Zhè běn zìdiǎn hěn yǒuyòng."},{"id":"tocfl-17","level":1,"module":"TOCFL","spanish_full":"La estación está muy lejos de aquí.","spanish_cloze":"La estación está muy ___ de aquí.","spanish_answer":"lejos","spanish_alternatives":["alejada","alejado"],"chinese_simp_full":"车站离这里很远。","chinese_simp_cloze":"车站离这里很___。","chinese_simp_answer":"远","chinese_trad_full":"車站離這裡很遠。","chinese_trad_cloze":"車站離這裡很___。","chinese_trad_answer":"遠","pinyin":"Chēzhàn lí zhèlǐ hěn yuǎn."},{"id":"tocfl-18","level":1,"module":"TOCFL","spanish_full":"¡Feliz año nuevo!","spanish_cloze":"¡Feliz año ___!","spanish_answer":"nuevo","spanish_alternatives":["nueva"],"chinese_simp_full":"祝你新年快乐！","chinese_simp_cloze":"祝你___！","chinese_simp_answer":"新年快乐","chinese_trad_full":"祝你新年快樂！","chinese_trad_cloze":"祝你___！","chinese_trad_answer":"新年快樂","pinyin":"Zhù nǐ xīnnián kuàilè!"},{"id":"tocfl-19","level":1,"module":"TOCFL","spanish_full":"Me gusta beber té de leche con perlas.","spanish_cloze":"Me gusta beber té de leche con ___.","spanish_answer":"perlas","spanish_alternatives":["burbujas","tapioca","perla"],"chinese_simp_full":"我喜欢喝珍珠奶茶。","chinese_simp_cloze":"我喜欢喝___奶茶。","chinese_simp_answer":"珍珠","chinese_trad_full":"我喜歡喝珍珠奶茶。","chinese_trad_cloze":"我喜歡喝___奶茶。","chinese_trad_answer":"珍珠","pinyin":"Wǒ xǐhuān hē zhēnzhū nǎichá."},{"id":"tocfl-20","level":1,"module":"TOCFL","spanish_full":"Hoy la entrada al museo es gratuita.","spanish_cloze":"Hoy la entrada al museo es ___.","spanish_answer":"gratuita","spanish_alternatives":["gratis","libre"],"chinese_simp_full":"博物馆今天免费参观。","chinese_simp_cloze":"博物馆今天___参观。","chinese_simp_answer":"免费","chinese_trad_full":"博物館今天免費參觀。","chinese_trad_cloze":"博物館今天___參觀。","chinese_trad_answer":"免費","pinyin":"Bówùguǎn jīntiān miǎnfèi cānguān."}],
'DELE': [{"id":"dele-01","level":2,"module":"DELE","spanish_full":"Llevo tres años estudiando español.","spanish_cloze":"Llevo tres años ___ español.","spanish_answer":"estudiando","spanish_alternatives":["hablando","aprendiendo"],"chinese_simp_full":"我学西班牙语三年了。","chinese_simp_cloze":"我___西班牙语三年了。","chinese_simp_answer":"学","chinese_trad_full":"我學西班牙語三年了。","chinese_trad_cloze":"我___西班牙語三年了。","chinese_trad_answer":"學","pinyin":"Wǒ xué Xībānyáyǔ sān nián le."},{"id":"dele-02","level":2,"module":"DELE","spanish_full":"¿Qué planes tienes para este sábado?","spanish_cloze":"¿Qué ___ tienes para este sábado?","spanish_answer":"planes","spanish_alternatives":["plan"],"chinese_simp_full":"这个星期六你有什么计划？","chinese_simp_cloze":"这个星期六你有什么___？","chinese_simp_answer":"计划","chinese_trad_full":"這個星期六你有什麼計劃？","chinese_trad_cloze":"這個星期六你有什麼___？","chinese_trad_answer":"計劃","pinyin":"Zhège xīngqīliù nǐ yǒu shénme jìhuà?"},{"id":"dele-03","level":2,"module":"DELE","spanish_full":"Este suéter me queda un poco pequeño.","spanish_cloze":"Este suéter me queda un poco ___.","spanish_answer":"pequeño","spanish_alternatives":["pequeno","chico","ajustado"],"chinese_simp_full":"这件毛衣有点儿小。","chinese_simp_cloze":"这件毛衣有点儿___。","chinese_simp_answer":"小","chinese_trad_full":"這件毛衣有點兒小。","chinese_trad_cloze":"這件毛衣有點兒___。","chinese_trad_answer":"小","pinyin":"Zhè jiàn máoyī yǒudiǎnr xiǎo."},{"id":"dele-04","level":2,"module":"DELE","spanish_full":"Mañana voy al banco a cambiar dinero.","spanish_cloze":"Mañana voy al banco a ___ dinero.","spanish_answer":"cambiar","spanish_alternatives":[],"chinese_simp_full":"我明天要去银行换钱。","chinese_simp_cloze":"我明天要去银行___。","chinese_simp_answer":"换钱","chinese_trad_full":"我明天要去銀行換錢。","chinese_trad_cloze":"我明天要去銀行___。","chinese_trad_answer":"換錢","pinyin":"Wǒ míngtiān yào qù yínháng huàn qián."},{"id":"dele-05","level":2,"module":"DELE","spanish_full":"El médico dice que debo beber más agua.","spanish_cloze":"El médico dice que debo beber más ___.","spanish_answer":"agua","spanish_alternatives":["líquidos","liquidos"],"chinese_simp_full":"医生说我需要多喝水。","chinese_simp_cloze":"医生说我需要多喝___。","chinese_simp_answer":"水","chinese_trad_full":"醫生說我需要多喝水。","chinese_trad_cloze":"醫生說我需要多喝___。","chinese_trad_answer":"水","pinyin":"Yīshēng shuō wǒ xūyào duō hē shuǐ."},{"id":"dele-06","level":2,"module":"DELE","spanish_full":"El tren sale a las ocho y media.","spanish_cloze":"El tren ___ a las ocho y media.","spanish_answer":"sale","spanish_alternatives":["parte","se va"],"chinese_simp_full":"火车八点半出发。","chinese_simp_cloze":"火车八点半___。","chinese_simp_answer":"出发","chinese_trad_full":"火車八點半出發。","chinese_trad_cloze":"火車八點半___。","chinese_trad_answer":"出發","pinyin":"Huǒchē bā diǎn bàn chūfā."},{"id":"dele-07","level":2,"module":"DELE","spanish_full":"Mi ordenador tiene un virus.","spanish_cloze":"Mi ordenador tiene un ___.","spanish_answer":"virus","spanish_alternatives":[],"chinese_simp_full":"我的电脑中毒了。","chinese_simp_cloze":"我的电脑___了。","chinese_simp_answer":"中毒","chinese_trad_full":"我的電腦中毒了。","chinese_trad_cloze":"我的電腦___了。","chinese_trad_answer":"中毒","pinyin":"Wǒ de diànnǎo zhòngdú le."},{"id":"dele-08","level":2,"module":"DELE","spanish_full":"Espera aquí el autobús, por favor.","spanish_cloze":"___ aquí el autobús, por favor.","spanish_answer":"Espera","spanish_alternatives":["esperad","Espere","espere"],"chinese_simp_full":"请在这里等巴士。","chinese_simp_cloze":"请在这里___巴士。","chinese_simp_answer":"等","chinese_trad_full":"請在這裡等巴士。","chinese_trad_cloze":"請在這裡___巴士。","chinese_trad_answer":"等","pinyin":"Qǐng zài zhèlǐ děng bāshì."},{"id":"dele-09","level":2,"module":"DELE","spanish_full":"Ayer compré una sandía en el supermercado.","spanish_cloze":"Ayer ___ una sandía en el supermercado.","spanish_answer":"compré","spanish_alternatives":["compre","conseguí","consegui"],"chinese_simp_full":"我昨天在超市买了西瓜。","chinese_simp_cloze":"我昨天在超市___了西瓜。","chinese_simp_answer":"买","chinese_trad_full":"我昨天在超市買了西瓜。","chinese_trad_cloze":"我昨天在超市___了西瓜。","chinese_trad_answer":"買","pinyin":"Wǒ zuótiān zài chāoshì mǎi le xīguā."},{"id":"dele-10","level":2,"module":"DELE","spanish_full":"Esta noche hay un partido de fútbol.","spanish_cloze":"Esta noche hay un partido de ___.","spanish_answer":"fútbol","spanish_alternatives":["futbol","football"],"chinese_simp_full":"今晚有一场足球比赛。","chinese_simp_cloze":"今晚有一场足球___。","chinese_simp_answer":"比赛","chinese_trad_full":"今晚有一場足球比賽。","chinese_trad_cloze":"今晚有一場足球___。","chinese_trad_answer":"比賽","pinyin":"Jīnwǎn yǒu yì chǎng zúqiú bǐsài."},{"id":"dele-11","level":2,"module":"DELE","spanish_full":"Mi compañero de piso es muy limpio.","spanish_cloze":"Mi compañero de piso es muy ___.","spanish_answer":"limpio","spanish_alternatives":["limpia","ordenado"],"chinese_simp_full":"我的室友很爱干净。","chinese_simp_cloze":"我的室友很___。","chinese_simp_answer":"爱干净","chinese_trad_full":"我的室友很愛乾淨。","chinese_trad_cloze":"我的室友很___。","chinese_trad_answer":"愛乾淨","pinyin":"Wǒ de shìyǒu hěn ài gānjìng."},{"id":"dele-12","level":2,"module":"DELE","spanish_full":"Hace frío, ponte más ropa.","spanish_cloze":"Hace frío, ___ más ropa.","spanish_answer":"ponte","spanish_alternatives":["póngase","abrígate","abrígate"],"chinese_simp_full":"天冷了，多穿点衣服。","chinese_simp_cloze":"天冷了，多___点衣服。","chinese_simp_answer":"穿","chinese_trad_full":"天冷了，多穿點衣服。","chinese_trad_cloze":"天冷了，多___點衣服。","chinese_trad_answer":"穿","pinyin":"Tiān lěng le, duō chuān diǎn yīfu."},{"id":"dele-13","level":2,"module":"DELE","spanish_full":"Hemos reservado mesa en el restaurante.","spanish_cloze":"Hemos ___ mesa en el restaurante.","spanish_answer":"reservado","spanish_alternatives":["pedido"],"chinese_simp_full":"我们在餐厅订了位子。","chinese_simp_cloze":"我们在餐厅___了位子。","chinese_simp_answer":"订","chinese_trad_full":"我們在餐廳訂了位子。","chinese_trad_cloze":"我們在餐廳___了位子。","chinese_trad_answer":"訂","pinyin":"Wǒmen zài cāntīng dìng le wèizi."},{"id":"dele-14","level":2,"module":"DELE","spanish_full":"Su fiesta de cumpleaños es el viernes por la noche.","spanish_cloze":"Su fiesta de cumpleaños es el viernes por la ___.","spanish_answer":"noche","spanish_alternatives":["tarde"],"chinese_simp_full":"他的生日派对在周五晚上。","chinese_simp_cloze":"他的生日派对在周五___。","chinese_simp_answer":"晚上","chinese_trad_full":"他的生日派對在週五晚上。","chinese_trad_cloze":"他的生日派對在週五___。","chinese_trad_answer":"晚上","pinyin":"Tā de shēngrì pàiduì zài zhōuwǔ wǎnshang."},{"id":"dele-15","level":2,"module":"DELE","spanish_full":"Estoy acostumbrado a levantarme temprano para estudiar.","spanish_cloze":"Estoy ___ a levantarme temprano para estudiar.","spanish_answer":"acostumbrado","spanish_alternatives":["acostumbrada","habituado"],"chinese_simp_full":"我习惯早起读书。","chinese_simp_cloze":"我___早起读书。","chinese_simp_answer":"习惯","chinese_trad_full":"我習慣早起讀書。","chinese_trad_cloze":"我___早起讀書。","chinese_trad_answer":"習慣","pinyin":"Wǒ xíguàn zǎo qǐ dúshū."},{"id":"dele-16","level":2,"module":"DELE","spanish_full":"Esta falda tiene un descuento del cincuenta por ciento.","spanish_cloze":"Esta falda tiene un ___ del cincuenta por ciento.","spanish_answer":"descuento","spanish_alternatives":["rebaja"],"chinese_simp_full":"这条裙子打折一半。","chinese_simp_cloze":"这条裙子___一半。","chinese_simp_answer":"打折","chinese_trad_full":"這條裙子打折一半。","chinese_trad_cloze":"這條裙子___一半。","chinese_trad_answer":"打折","pinyin":"Zhè tiáo qúnzi dǎzhé yíbàn."},{"id":"dele-17","level":2,"module":"DELE","spanish_full":"Abre la ventana un momento, por favor.","spanish_cloze":"Abre la ___ un momento, por favor.","spanish_answer":"ventana","spanish_alternatives":["ventanilla"],"chinese_simp_full":"请把窗户打开一下。","chinese_simp_cloze":"请把___打开一下。","chinese_simp_answer":"窗户","chinese_trad_full":"請把窗戶打開一下。","chinese_trad_cloze":"請把___打開一下。","chinese_trad_answer":"窗戶","pinyin":"Qǐng bǎ chuānghu dǎkāi yíxià."},{"id":"dele-18","level":2,"module":"DELE","spanish_full":"Quiero el filete en su punto.","spanish_cloze":"Quiero el filete en su ___.","spanish_answer":"punto","spanish_alternatives":["término","termino"],"chinese_simp_full":"我要一份牛排，五分熟。","chinese_simp_cloze":"我要一份牛排，___。","chinese_simp_answer":"五分熟","chinese_trad_full":"我要一份牛排，五分熟。","chinese_trad_cloze":"我要一份牛排，___。","chinese_trad_answer":"五分熟","pinyin":"Wǒ yào yí fèn niúpái, wǔ fēn shú."},{"id":"dele-19","level":2,"module":"DELE","spanish_full":"En la biblioteca hay que guardar silencio.","spanish_cloze":"En la biblioteca hay que guardar ___.","spanish_answer":"silencio","spanish_alternatives":["calma"],"chinese_simp_full":"图书馆里要保持安静。","chinese_simp_cloze":"图书馆里要保持___。","chinese_simp_answer":"安静","chinese_trad_full":"圖書館裡要保持安靜。","chinese_trad_cloze":"圖書館裡要保持___。","chinese_trad_answer":"安靜","pinyin":"Túshūguǎn lǐ yào bǎochí ānjìng."},{"id":"dele-20","level":2,"module":"DELE","spanish_full":"La semana próxima vamos a mudarnos de casa.","spanish_cloze":"La semana próxima vamos a mudarnos de ___.","spanish_answer":"casa","spanish_alternatives":["piso","apartamento"],"chinese_simp_full":"我们下周要搬家了。","chinese_simp_cloze":"我们下周要___了。","chinese_simp_answer":"搬家","chinese_trad_full":"我們下週要搬家了。","chinese_trad_cloze":"我們下週要___了。","chinese_trad_answer":"搬家","pinyin":"Wǒmen xià zhōu yào bānjiā le."}],
'Clasicos-Daxue': [{"level":1,"module":"Clasicos-Daxue","spanish_full":"El camino del Gran Estudio está en iluminar la virtud innata.","spanish_cloze":"El camino del Gran Estudio está en iluminar la ___ innata.","spanish_answer":"virtud","chinese_simp_full":"大学之道，在明明德。","chinese_simp_cloze":"大学之道，在___。","chinese_simp_answer":"明明德","chinese_trad_full":"大學之道，在明明德。","chinese_trad_cloze":"大學之道，在___。","chinese_trad_answer":"明明德","pinyin":"Dàxué zhī dào, zài míngmíngdé.","id":"daxue_01"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Si hoy te renuevas, renuévate cada día, y de nuevo cada día.","spanish_cloze":"Si hoy te ___, renuévate cada día, y de nuevo cada día.","spanish_answer":"renuevas","chinese_simp_full":"苟日新，日日新，又日新。","chinese_simp_cloze":"苟日新，___，又日新。","chinese_simp_answer":"日日新","chinese_trad_full":"苟日新，日日新，又日新。","chinese_trad_cloze":"苟日新，___，又日新。","chinese_trad_answer":"日日新","pinyin":"Gǒu rì xīn, rìrì xīn, yòu rì xīn.","id":"daxue_02"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"Quien sabe dónde detenerse alcanza la serenidad.","spanish_cloze":"Quien sabe dónde detenerse alcanza la ___.","spanish_answer":"serenidad","chinese_simp_full":"知止而后有定。","chinese_simp_cloze":"知止而后有___。","chinese_simp_answer":"定","chinese_trad_full":"知止而後有定。","chinese_trad_cloze":"知止而後有___。","chinese_trad_answer":"定","pinyin":"Zhī zhǐ ér hòu yǒu dìng.","spanish_alternatives":["calma"],"id":"daxue_03"},{"level":1,"module":"Clasicos-Daxue","spanish_full":"La virtud es la raíz; la riqueza, las ramas.","spanish_cloze":"La virtud es la ___; la riqueza, las ramas.","spanish_answer":"raíz","chinese_simp_full":"德者本也，财者末也。","chinese_simp_cloze":"德者___也，财者末也。","chinese_simp_answer":"本","chinese_trad_full":"德者本也，財者末也。","chinese_trad_cloze":"德者___也，財者末也。","chinese_trad_answer":"本","pinyin":"Dé zhě běn yě, cái zhě mò yě.","id":"daxue_04"}],
'Clasicos-Lunyu': [{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Aprender y practicar a tiempo, ¿no es un placer?","spanish_cloze":"Aprender y practicar a tiempo, ¿no es un ___?","spanish_answer":"placer","chinese_simp_full":"学而时习之，不亦说乎？","chinese_simp_cloze":"学而___之，不亦说乎？","chinese_simp_answer":"时习","chinese_trad_full":"學而時習之，不亦說乎？","chinese_trad_cloze":"學而___之，不亦說乎？","chinese_trad_answer":"時習","pinyin":"Xué ér shí xí zhī, bú yì yuè hū?","spanish_alternatives":["practicar"],"id":"lunyu_01"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Que un amigo llegue de lejos, ¿no es una alegría?","spanish_cloze":"Que un ___ llegue de lejos, ¿no es una alegría?","spanish_answer":"amigo","chinese_simp_full":"有朋自远方来，不亦乐乎？","chinese_simp_cloze":"有___自远方来，不亦乐乎？","chinese_simp_answer":"朋","chinese_trad_full":"有朋自遠方來，不亦樂乎？","chinese_trad_cloze":"有___自遠方來，不亦樂乎？","chinese_trad_answer":"朋","pinyin":"Yǒu péng zì yuǎnfāng lái, bú yì lè hū?","id":"lunyu_02"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"No impongas a otros lo que no quieres para ti.","spanish_cloze":"No ___ a otros lo que no quieres para ti.","spanish_answer":"impongas","chinese_simp_full":"己所不欲，勿施于人。","chinese_simp_cloze":"己所不欲，勿___于人。","chinese_simp_answer":"施","chinese_trad_full":"己所不欲，勿施於人。","chinese_trad_cloze":"己所不欲，勿___於人。","chinese_trad_answer":"施","pinyin":"Jǐ suǒ bú yù, wù shī yú rén.","spanish_alternatives":["hagas"],"id":"lunyu_03"},{"level":1,"module":"Clasicos-Lunyu","spanish_full":"Caminando entre tres, hay siempre un maestro del que aprender.","spanish_cloze":"Caminando entre tres, hay siempre un ___ del que aprender.","spanish_answer":"maestro","chinese_simp_full":"三人行，必有我师焉。","chinese_simp_cloze":"三人行，必有我___焉。","chinese_simp_answer":"师","chinese_trad_full":"三人行，必有我師焉。","chinese_trad_cloze":"三人行，必有我___焉。","chinese_trad_answer":"師","pinyin":"Sān rén xíng, bì yǒu wǒ shī yān.","id":"lunyu_04"}],
'Clasicos-Zhongyong': [{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"El equilibrio es la gran raíz del mundo.","spanish_cloze":"El equilibrio es la gran ___ del mundo.","spanish_answer":"raíz","chinese_simp_full":"中也者，天下之大本也。","chinese_simp_cloze":"中也者，天下之大___也。","chinese_simp_answer":"本","chinese_trad_full":"中也者，天下之大本也。","chinese_trad_cloze":"中也者，天下之大___也。","chinese_trad_answer":"本","pinyin":"Zhōng yě zhě, tiānxià zhī dà běn yě.","id":"zhongyong_01"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"La armonía es el camino universal.","spanish_cloze":"La armonía es el ___ universal.","spanish_answer":"camino","chinese_simp_full":"和也者，天下之达道也。","chinese_simp_cloze":"和也者，天下之达___也。","chinese_simp_answer":"道","chinese_trad_full":"和也者，天下之達道也。","chinese_trad_cloze":"和也者，天下之達___也。","chinese_trad_answer":"道","pinyin":"Hé yě zhě, tiānxià zhī dá dào yě.","id":"zhongyong_02"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Todo proyecto prospera con preparación y fracasa sin ella.","spanish_cloze":"Todo proyecto prospera con ___ y fracasa sin ella.","spanish_answer":"preparación","chinese_simp_full":"凡事预则立，不预则废。","chinese_simp_cloze":"凡事___则立，不预则废。","chinese_simp_answer":"预","chinese_trad_full":"凡事預則立，不預則廢。","chinese_trad_cloze":"凡事___則立，不預則廢。","chinese_trad_answer":"預","pinyin":"Fánshì yù zé lì, bú yù zé fèi.","id":"zhongyong_03"},{"level":1,"module":"Clasicos-Zhongyong","spanish_full":"Estudia ampliamente, pregunta con detalle, reflexiona con cuidado, distingue con claridad y actúa con firmeza.","spanish_cloze":"Estudia ampliamente, pregunta con detalle, reflexiona con cuidado, distingue con claridad y actúa con ___.","spanish_answer":"firmeza","chinese_simp_full":"博学之，审问之，慎思之，明辨之，笃行之。","chinese_simp_cloze":"博学之，审问之，慎思之，明辨之，___之。","chinese_simp_answer":"笃行","chinese_trad_full":"博學之，審問之，慎思之，明辨之，篤行之。","chinese_trad_cloze":"博學之，審問之，慎思之，明辨之，___之。","chinese_trad_answer":"篤行","pinyin":"Bó xué zhī, shěnwèn zhī, shènsī zhī, míngbiàn zhī, dǔxíng zhī.","id":"zhongyong_04"}],
'Clasicos-Mengzi': [{"level":1,"module":"Clasicos-Mengzi","spanish_full":"El pueblo es lo más valioso; el gobernante, lo menos.","spanish_cloze":"El pueblo es lo más ___; el gobernante, lo menos.","spanish_answer":"valioso","chinese_simp_full":"民为贵，社稷次之，君为轻。","chinese_simp_cloze":"民为___，社稷次之，君为轻。","chinese_simp_answer":"贵","chinese_trad_full":"民為貴，社稷次之，君為輕。","chinese_trad_cloze":"民為___，社稷次之，君為輕。","chinese_trad_answer":"貴","pinyin":"Mín wéi guì, shèjì cì zhī, jūn wéi qīng.","id":"mengzi_01"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Uno crece en la adversidad y perece en la comodidad.","spanish_cloze":"Uno crece en la ___ y perece en la comodidad.","spanish_answer":"adversidad","chinese_simp_full":"生于忧患，死于安乐。","chinese_simp_cloze":"生于___，死于安乐。","chinese_simp_answer":"忧患","chinese_trad_full":"生於憂患，死於安樂。","chinese_trad_cloze":"生於___，死於安樂。","chinese_trad_answer":"憂患","pinyin":"Shēng yú yōuhuàn, sǐ yú ānlè.","id":"mengzi_02"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Respeta a tus mayores y extiende ese respeto a los de los demás.","spanish_cloze":"Respeta a tus ___ y extiende ese respeto a los de los demás.","spanish_answer":"mayores","chinese_simp_full":"老吾老，以及人之老。","chinese_simp_cloze":"___吾老，以及人之老。","chinese_simp_answer":"老","chinese_trad_full":"老吾老，以及人之老。","chinese_trad_cloze":"___吾老，以及人之老。","chinese_trad_answer":"老","pinyin":"Lǎo wú lǎo, yǐjí rén zhī lǎo.","id":"mengzi_03"},{"level":1,"module":"Clasicos-Mengzi","spanish_full":"Quien sigue el camino recibe mucha ayuda; quien lo pierde, poca.","spanish_cloze":"Quien sigue el camino recibe mucha ___; quien lo pierde, poca.","spanish_answer":"ayuda","chinese_simp_full":"得道者多助，失道者寡助。","chinese_simp_cloze":"得道者多___，失道者寡助。","chinese_simp_answer":"助","chinese_trad_full":"得道者多助，失道者寡助。","chinese_trad_cloze":"得道者多___，失道者寡助。","chinese_trad_answer":"助","pinyin":"Dé dào zhě duō zhù, shī dào zhě guǎ zhù.","id":"mengzi_04"}],
'Clasicos-Sanzijing': [{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"El ser humano nace con la bondad natural.","spanish_cloze":"El ser humano nace con la ___ natural.","spanish_answer":"bondad","chinese_simp_full":"人之初，性本善。","chinese_simp_cloze":"人之初，性本___。","chinese_simp_answer":"善","chinese_trad_full":"人之初，性本善。","chinese_trad_cloze":"人之初，性本___。","chinese_trad_answer":"善","pinyin":"Rén zhī chū, xìng běn shàn.","id":"sanzijing_01"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"Por naturaleza nos parecemos; la costumbre nos aleja.","spanish_cloze":"Por naturaleza nos parecemos; la ___ nos aleja.","spanish_answer":"costumbre","chinese_simp_full":"性相近，习相远。","chinese_simp_cloze":"性相近，___相远。","chinese_simp_answer":"习","chinese_trad_full":"性相近，習相遠。","chinese_trad_cloze":"性相近，___相遠。","chinese_trad_answer":"習","pinyin":"Xìng xiāng jìn, xí xiāng yuǎn.","id":"sanzijing_02"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"El jade sin tallar no se vuelve tesoro.","spanish_cloze":"El jade sin ___ no se vuelve tesoro.","spanish_answer":"tallar","chinese_simp_full":"玉不琢，不成器。","chinese_simp_cloze":"玉不___，不成器。","chinese_simp_answer":"琢","chinese_trad_full":"玉不琢，不成器。","chinese_trad_cloze":"玉不___，不成器。","chinese_trad_answer":"琢","pinyin":"Yù bù zhuó, bù chéng qì.","id":"sanzijing_03"},{"level":1,"module":"Clasicos-Sanzijing","spanish_full":"La constancia trae logros; la distracción, nada.","spanish_cloze":"La ___ trae logros; la distracción, nada.","spanish_answer":"constancia","chinese_simp_full":"勤有功，戏无益。","chinese_simp_cloze":"___有功，戏无益。","chinese_simp_answer":"勤","chinese_trad_full":"勤有功，戲無益。","chinese_trad_cloze":"___有功，戲無益。","chinese_trad_answer":"勤","pinyin":"Qín yǒu gōng, xì wú yì.","spanish_alternatives":["esmero"],"id":"sanzijing_04"}],
'Clasicos-Xiaojing': [{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Entre las cien virtudes, la piedad filial va primero.","spanish_cloze":"Entre las cien virtudes, la ___ va primero.","spanish_answer":"piedad filial","chinese_simp_full":"百善孝为先。","chinese_simp_cloze":"百善___为先。","chinese_simp_answer":"孝","chinese_trad_full":"百善孝為先。","chinese_trad_cloze":"百善___為先。","chinese_trad_answer":"孝","pinyin":"Bǎi shàn xiào wéi xiān.","id":"xiaojing_01"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Nuestro cuerpo y nuestra piel vienen de nuestros padres.","spanish_cloze":"Nuestro cuerpo y nuestra piel vienen de nuestros ___.","spanish_answer":"padres","chinese_simp_full":"身体发肤，受之父母。","chinese_simp_cloze":"身体发肤，受之___。","chinese_simp_answer":"父母","chinese_trad_full":"身體髮膚，受之父母。","chinese_trad_cloze":"身體髮膚，受之___。","chinese_trad_answer":"父母","pinyin":"Shēntǐ fàfū, shòu zhī fùmǔ.","id":"xiaojing_02"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"Quien ama a su familia no desprecia a nadie.","spanish_cloze":"Quien ___ a su familia no desprecia a nadie.","spanish_answer":"ama","chinese_simp_full":"爱亲者，不敢恶于人。","chinese_simp_cloze":"___亲者，不敢恶于人。","chinese_simp_answer":"爱","chinese_trad_full":"愛親者，不敢惡於人。","chinese_trad_cloze":"___親者，不敢惡於人。","chinese_trad_answer":"愛","pinyin":"Ài qīn zhě, bù gǎn wù yú rén.","id":"xiaojing_03"},{"level":1,"module":"Clasicos-Xiaojing","spanish_full":"El respeto filial es la raíz de la virtud.","spanish_cloze":"El respeto filial es la ___ de la virtud.","spanish_answer":"raíz","chinese_simp_full":"孝，德之本也。","chinese_simp_cloze":"孝，德之___也。","chinese_simp_answer":"本","chinese_trad_full":"孝，德之本也。","chinese_trad_cloze":"孝，德之___也。","chinese_trad_answer":"本","pinyin":"Xiào, dé zhī běn yě.","id":"xiaojing_04"}],
'Clasicos-Daodejing': [{"level":1,"module":"Clasicos-Daodejing","spanish_full":"El camino que puede decirse no es el Camino eterno.","spanish_cloze":"El ___ que puede decirse no es el Camino eterno.","spanish_answer":"Camino","chinese_simp_full":"道可道，非常道。","chinese_simp_cloze":"___可道，非常道。","chinese_simp_answer":"道","chinese_trad_full":"道可道，非常道。","chinese_trad_cloze":"___可道，非常道。","chinese_trad_answer":"道","pinyin":"Dào kě dào, fēi cháng dào.","id":"daodejing_01"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"La bondad suprema es como el agua.","spanish_cloze":"La bondad suprema es como el ___.","spanish_answer":"agua","chinese_simp_full":"上善若水。","chinese_simp_cloze":"上善若___。","chinese_simp_answer":"水","chinese_trad_full":"上善若水。","chinese_trad_cloze":"上善若___。","chinese_trad_answer":"水","pinyin":"Shàng shàn ruò shuǐ.","id":"daodejing_02"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Un viaje de mil kilómetros empieza bajo tus pies.","spanish_cloze":"Un viaje de mil kilómetros empieza bajo tus ___.","spanish_answer":"pies","chinese_simp_full":"千里之行，始于足下。","chinese_simp_cloze":"千里之行，始于___。","chinese_simp_answer":"足下","chinese_trad_full":"千里之行，始於足下。","chinese_trad_cloze":"千里之行，始於___。","chinese_trad_answer":"足下","pinyin":"Qiānlǐ zhī xíng, shǐ yú zúxià.","id":"daodejing_03"},{"level":1,"module":"Clasicos-Daodejing","spanish_full":"Conocer a otros es sabiduría; conocerse, claridad.","spanish_cloze":"Conocer a otros es ___; conocerse, claridad.","spanish_answer":"sabiduría","chinese_simp_full":"知人者智，自知者明。","chinese_simp_cloze":"知人者___，自知者明。","chinese_simp_answer":"智","chinese_trad_full":"知人者智，自知者明。","chinese_trad_cloze":"知人者___，自知者明。","chinese_trad_answer":"智","pinyin":"Zhī rén zhě zhì, zì zhī zhě míng.","id":"daodejing_04"}],
'Clasicos-Xinjing': [{"level":1,"module":"Clasicos-Xinjing","spanish_full":"La forma es vacío; el vacío es forma.","spanish_cloze":"La forma es ___; el vacío es forma.","spanish_answer":"vacío","chinese_simp_full":"色即是空，空即是色。","chinese_simp_cloze":"色即是___，空即是色。","chinese_simp_answer":"空","chinese_trad_full":"色即是空，空即是色。","chinese_trad_cloze":"色即是___，空即是色。","chinese_trad_answer":"空","pinyin":"Sè jí shì kōng, kōng jí shì sè.","id":"xinjing_01"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"La mente sin ataduras.","spanish_cloze":"La mente sin ___.","spanish_answer":"ataduras","chinese_simp_full":"心无挂碍。","chinese_simp_cloze":"心无___。","chinese_simp_answer":"挂碍","chinese_trad_full":"心無掛礙。","chinese_trad_cloze":"心無___。","chinese_trad_answer":"掛礙","pinyin":"Xīn wú guà'ài.","id":"xinjing_02"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Iluminó que los cinco agregados son vacíos.","spanish_cloze":"Iluminó que los ___ son vacíos.","spanish_answer":"cinco agregados","chinese_simp_full":"照见五蕴皆空。","chinese_simp_cloze":"照见___皆空。","chinese_simp_answer":"五蕴","chinese_trad_full":"照見五蘊皆空。","chinese_trad_cloze":"照見___皆空。","chinese_trad_answer":"五蘊","pinyin":"Zhàojiàn wǔyùn jiē kōng.","id":"xinjing_03"},{"level":1,"module":"Clasicos-Xinjing","spanish_full":"Libera de todo sufrimiento.","spanish_cloze":"Libera de todo ___.","spanish_answer":"sufrimiento","chinese_simp_full":"度一切苦厄。","chinese_simp_cloze":"度一切___。","chinese_simp_answer":"苦厄","chinese_trad_full":"度一切苦厄。","chinese_trad_cloze":"度一切___。","chinese_trad_answer":"苦厄","pinyin":"Dù yíqiè kǔ'è.","spanish_alternatives":["dolor"],"id":"xinjing_04"}],
'Clasicos-Jingangjing': [{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Cultiva la mente sin aferrarse a nada.","spanish_cloze":"Cultiva la ___ sin aferrarse a nada.","spanish_answer":"mente","chinese_simp_full":"应无所住而生其心。","chinese_simp_cloze":"应无所住而生其___。","chinese_simp_answer":"心","chinese_trad_full":"應無所住而生其心。","chinese_trad_cloze":"應無所住而生其___。","chinese_trad_answer":"心","pinyin":"Yīng wú suǒ zhù ér shēng qí xīn.","id":"jingangjing_01"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Todo lo que aparece es ilusión.","spanish_cloze":"Todo lo que aparece es ___.","spanish_answer":"ilusión","chinese_simp_full":"凡所有相，皆是虚妄。","chinese_simp_cloze":"凡所有相，皆是___。","chinese_simp_answer":"虚妄","chinese_trad_full":"凡所有相，皆是虛妄。","chinese_trad_cloze":"凡所有相，皆是___。","chinese_trad_answer":"虛妄","pinyin":"Fán suǒ yǒu xiàng, jiē shì xūwàng.","id":"jingangjing_02"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Como el rocío y el relámpago: así hay que verlo.","spanish_cloze":"Como el rocío y el ___: así hay que verlo.","spanish_answer":"relámpago","chinese_simp_full":"如露亦如电，应作如是观。","chinese_simp_cloze":"如露亦如___，应作如是观。","chinese_simp_answer":"电","chinese_trad_full":"如露亦如電，應作如是觀。","chinese_trad_cloze":"如露亦如___，應作如是觀。","chinese_trad_answer":"電","pinyin":"Rú lù yì rú diàn, yīng zuò rúshì guān.","id":"jingangjing_03"},{"level":1,"module":"Clasicos-Jingangjing","spanish_full":"Hasta las enseñanzas hay que soltar, y más lo demás.","spanish_cloze":"Hasta las enseñanzas hay que ___, y más lo demás.","spanish_answer":"soltar","chinese_simp_full":"法尚应舍，何况非法。","chinese_simp_cloze":"法尚应___，何况非法。","chinese_simp_answer":"舍","chinese_trad_full":"法尚應舍，何況非法。","chinese_trad_cloze":"法尚應___，何況非法。","chinese_trad_answer":"舍","pinyin":"Fǎ shàng yīng shě, hékuàng fēifǎ.","spanish_alternatives":["dejar ir"],"id":"jingangjing_04"}]
};
// Práctica Diaria: todos los módulos diarios filtran el mismo lote (por s.module)
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
// ===== FIN DATOS INCLUIDOS =====
// ===== FIN DATOS INCLUIDOS =====
// ===== FIN DATOS INCLUIDOS =====
// ===== FIN DATOS INCLUIDOS =====
// ===== FIN DATOS INCLUIDOS =====

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
    'TOCFL': 'data/exams/tocfl.json',
    'DELE': 'data/exams/dele.json',
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
    'TOCFL': 'TOCFL',
    'DELE': 'DELE',
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
    // Actualizar botones diarios, de exámenes Y clásicos
    const cats = document.querySelectorAll('.cat-btn, .btn-exam, .classic-card');
    cats.forEach(b => {
        b.classList.toggle('active', b.dataset.module === state.activeModule);
    });
    updateDailyBtnLabel();

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
    let data = null;
    // 1) Datos incluidos en la app: funcionan sin carpeta data/, sin red y offline
    if (typeof EMBEDDED_MODULE_DATA !== 'undefined' && EMBEDDED_MODULE_DATA[state.activeModule]) {
        data = EMBEDDED_MODULE_DATA[state.activeModule];
        console.log('✅ ' + data.length + ' oraciones cargadas (datos incluidos en la app)');
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
        moduleStatus('📚 ' + label + ' · ' + state.sentences.length + ' oraciones disponibles');
    } else if (state.activeModule === 'HSK6') {
        moduleStatus('⚠ El módulo ' + label + ' todavía no tiene oraciones.', true);
    } else {
        moduleStatus('⚠ El módulo ' + label + ' no tiene oraciones.', true);
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
    // Tarjetas de Clásicos Antiguos
    document.querySelectorAll('.classic-card').forEach(btn => {
        btn.addEventListener('click', () => setModule(btn.dataset.module));
    });
    initDailyDropdown();

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
    
    document.querySelectorAll('.cat-btn, .btn-exam, .classic-card').forEach(b => {
        b.classList.toggle('active', b.dataset.module === mod);
    });
    updateDailyBtnLabel();
    
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

    // Actualizar Header (los clásicos muestran su propia insignia)
    document.getElementById('card-level').textContent =
        (s.module || '').startsWith('Clasicos-') ? '📜 Clásico' : ('Nivel ' + s.level);
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
            let fb = displayText;
            if (learningChinese) {
                const clozeFb = s['chinese_' + k + '_cloze'];
                if (clozeFb && clozeFb.indexOf('___') !== -1) fb = clozeFb;
            }
            sentenceTextEl.textContent = fb || 'Error en datos';
        }
    } else {
        // 3. Fallback: Texto plano seguro (sin colores o sin librería).
        //    ⚠ En ES→CN hay que usar el cloze (con ___) para NO revelar la
        //    respuesta — bug reportado: con Tonos OFF se veía la oración
        //    completa. makeBlanksClickable() vuelve el hueco clicable igual.
        let plain = displayText || 'Error en datos';
        if (learningChinese) {
            const clozeTxt = s['chinese_' + k + '_cloze'];
            if (clozeTxt && clozeTxt.indexOf('___') !== -1) plain = clozeTxt;
        }
        sentenceTextEl.textContent = plain;
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
            fullZhSimp: s.chinese_simp_full || '',
            fullZhTrad: s.chinese_trad_full || s.chinese_simp_full || ''
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
        // Palabra china → traducción al español + EJEMPLO EN CHINO (idioma de la
        // palabra tocada, respeta 简/繁 elegido) + apoyo en español (feedback de alumnos)
        const py = wordPinyin(word) || (rec ? rec.pinyin : '');
        if (py) html += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
        if (rec && rec.es) html += '<div class="vp-trans">🇪🇸 ' + escHtml(rec.es) + '</div>';
        if (rec) {
            const ejemploZh = (ck() === 'trad' ? (rec.fullZhTrad || rec.fullZhSimp) : (rec.fullZhSimp || rec.fullZhTrad)) || '';
            if (ejemploZh && ejemploZh !== word) {
                html += '<div class="vp-example">🇨🇳 ' + escHtml(ejemploZh) + '</div>';
                const pyEj = rec.pinyin || wordPinyin(ejemploZh);
                if (pyEj) html += '<div class="vp-example-py">📖 ' + escHtml(pyEj) + '</div>';
                if (rec.fullEs) html += '<div class="vp-example-alt">🇪🇸 “' + escHtml(rec.fullEs) + '”</div>';
            }
        }
    } else {
        // Palabra española → traducción al chino + EJEMPLO EN ESPAÑOL (idioma de
        // la palabra tocada) + apoyo en chino con pinyin (feedback de alumnos)
        if (rec) {
            let zhLine = rec.zhSimp ? escHtml(rec.zhSimp) : '';
            if (rec.zhTrad && rec.zhTrad !== rec.zhSimp) zhLine += ' <span class="vp-trad">(' + escHtml(rec.zhTrad) + ')</span>';
            if (zhLine) html += '<div class="vp-trans">🇨🇳 ' + zhLine + '</div>';
            const py = wordPinyin(rec.zhSimp) || rec.pinyin;
            if (py) html += '<div class="vp-pinyin">📖 ' + escHtml(py) + '</div>';
            if (rec.fullEs && rec.fullEs !== word) {
                html += '<div class="vp-example">🇪🇸 “' + escHtml(rec.fullEs) + '”</div>';
            }
            const apoyoZh = (ck() === 'trad' ? (rec.fullZhTrad || rec.fullZhSimp) : (rec.fullZhSimp || rec.fullZhTrad)) || '';
            if (apoyoZh) {
                const pyAp = wordPinyin(apoyoZh) || rec.pinyin;
                html += '<div class="vp-example-alt">🇨🇳 ' + escHtml(apoyoZh) + (pyAp ? ' <span class="vp-example-py-inline">(' + escHtml(pyAp) + ')</span>' : '') + '</div>';
            }
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

// SVG del carácter con los primeros `upto` trazos (formato Make Me a Hanzi)
function pzSvg(data, upto, fill) {
    const n = data.strokes.length;
    const k = Math.max(1, Math.min(upto || n, n));
    let paths = '';
    for (let i = 0; i < k; i++) paths += '<path d="' + data.strokes[i] + '"/>';
    return '<svg viewBox="0 0 1024 1024" aria-hidden="true"><g transform="scale(1, -1) translate(0, -900)" fill="' + fill + '">' + paths + '</g></svg>';
}

function pzStatus(msg, isError) {
    const el = document.getElementById('pz-status');
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
    el.classList.toggle('hidden', !msg);
}

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
    '.pz-cell { flex: 1 1 0; aspect-ratio: 1 / 1; border: 0.5mm solid #2f9e77; position: relative; overflow: hidden; }',
    '.pz-cell::before { content: ""; position: absolute; inset: 0; background:',
    '  repeating-linear-gradient(to right, transparent 0 2.4mm, #a7d9c4 2.4mm 4.4mm) center / 100% 0.4mm no-repeat,',
    '  repeating-linear-gradient(to bottom, transparent 0 2.4mm, #a7d9c4 2.4mm 4.4mm) center / 0.4mm 100% no-repeat; }',
    '.pz-cell svg, .pz-cell span.pz-glyph { position: absolute; left: 7%; top: 7%; width: 86%; height: 86%; display: block; }',
    '.pz-cell span.pz-glyph { display: flex; align-items: center; justify-content: center; font-size: 42pt; line-height: 1; color: #1f2937;',
    '  font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "WenQuanYi Zen Hei", sans-serif; }',
    '.pz-cell svg path { stroke-linejoin: round; }',
    '.pz-note { font-size: 8pt; color: #b45309; margin-top: 3mm; }'
].join('\n');

function pzSheetHTML(chars, datas, trazos, cells) {
    const fecha = new Date().toLocaleDateString('es-AR');
    const C = Math.min(20, Math.max(6, parseInt(cells, 10) || 12));
    let rows = '';
    chars.forEach((ch, i) => {
        const d = datas[i];
        // Contenido del bloque del carácter: modelo + etapas de trazos
        const celdas = ['<div class="pz-cell">' + (d ? pzSvg(d, d.strokes.length, '#1f2937') : '<span class="pz-glyph">' + ch + '</span>') + '</div>'];
        if (trazos && d) {
            const n = d.strokes.length;
            for (let k = 1; k <= n; k++) celdas.push('<div class="pz-cell">' + pzSvg(d, k, '#c9ced6') + '</div>');
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
    pzLastSheet = pzSheetHTML(chars, datas, pzTrazos, pzCells);
    pzRenderPreview();
    const btnPrint = document.getElementById('btn-pz-print');
    if (btnPrint) btnPrint.classList.remove('hidden');
    const faltan = datas.filter((d) => !d).length;
    pzStatus(faltan
        ? '⚠ Hoja lista, pero sin datos de trazos para ' + faltan + ' carácter(es) (¿sin conexión la primera vez?). Se usa el modelo del sistema.'
        : '✅ Hoja lista (' + chars.length + ' caracteres). Tocá 🖨️ Imprimir / PDF.');
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

// Imprimir / Guardar PDF: hoja sola, sin la interfaz de la app
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
    const nm = document.getElementById('pz-module-name');
    if (nm) nm.textContent = MODULE_LABELS[state.activeModule] || state.activeModule;
}

(function pzInit() {
    const safe = (id, ev, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, fn);
    };
    safe('btn-pz-generate', 'click', pzGenerate);
    safe('btn-pz-print', 'click', pzPrint);
    safe('btn-pz-module', 'click', pzUseModule);
    safe('btn-pz-trazos', 'click', () => {
        pzTrazos = !pzTrazos;
        localStorage.setItem('ac_pz_trazos', pzTrazos ? '1' : '0');
        pzUpdateControls();
    });
    safe('select-pz-cells', 'change', (e) => {
        pzCells = parseInt(e.target.value, 10) || 12;
        localStorage.setItem('ac_pz_cells', String(pzCells));
    });
    window.addEventListener('resize', () => {
        const wrap = document.getElementById('pz-preview');
        if (wrap && !wrap.classList.contains('hidden')) pzFitPreview();
    });
    pzUpdateControls();
})();
