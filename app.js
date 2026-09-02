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
'todas': [{"id":1,"level":1,"module":"Saludos","spanish_full":"Hola, ¿cómo estás?","spanish_cloze":"___, ¿cómo estás?","spanish_answer":"Hola","chinese_simp_full":"你好，你好吗？","chinese_simp_cloze":"___，你好吗？","chinese_simp_answer":"你好","chinese_trad_full":"你好，你好嗎？","chinese_trad_cloze":"___，你好嗎？","chinese_trad_answer":"你好","pinyin":"Nǐ hǎo, nǐ hǎo ma?"},{"id":2,"level":1,"module":"Saludos","spanish_full":"Me llamo Carlos.","spanish_cloze":"Me ___ Carlos.","spanish_answer":"llamo","chinese_simp_full":"我叫卡洛斯。","chinese_simp_cloze":"我___卡洛斯。","chinese_simp_answer":"叫","chinese_trad_full":"我叫卡洛斯。","chinese_trad_cloze":"我___卡洛斯。","chinese_trad_answer":"叫","pinyin":"Wǒ jiào Kǎluòsī."},{"id":3,"level":1,"module":"Saludos","spanish_full":"Gracias por tu ayuda.","spanish_cloze":"___ por tu ayuda.","spanish_answer":"Gracias","chinese_simp_full":"谢谢你的帮助。","chinese_simp_cloze":"___你的帮助。","chinese_simp_answer":"谢谢","chinese_trad_full":"謝謝你的幫助。","chinese_trad_cloze":"___你的幫助。","chinese_trad_answer":"謝謝","pinyin":"Xièxie nǐ de bāngzhù."},{"id":4,"level":2,"module":"Saludos","spanish_full":"Vivo en Buenos Aires.","spanish_cloze":"___ en Buenos Aires.","spanish_answer":"Vivo","chinese_simp_full":"我住在布宜诺斯艾利斯。","chinese_simp_cloze":"我___在布宜诺斯艾利斯。","chinese_simp_answer":"住","chinese_trad_full":"我住在布宜諾斯艾利斯。","chinese_trad_cloze":"我___在布宜諾斯艾利斯。","chinese_trad_answer":"住","pinyin":"Wǒ zhù zài Bùyínuòsī'àilìsī."},{"id":5,"level":2,"module":"Saludos","spanish_full":"¿Dónde está el baño?","spanish_cloze":"¿___ el baño?","spanish_answer":"Dónde está","chinese_simp_full":"洗手间在哪里？","chinese_simp_cloze":"洗手间___？","chinese_simp_answer":"在哪里","chinese_trad_full":"洗手間在哪裡？","chinese_trad_cloze":"洗手間___？","chinese_trad_answer":"在哪裡","pinyin":"Xǐshǒujiān zài nǎlǐ?"},{"id":6,"level":1,"module":"Saludos","spanish_full":"Buen día, ¿cómo andás?","spanish_cloze":"Buen día, ¿___?","spanish_answer":"cómo andás","chinese_simp_full":"早上好，你怎么样？","chinese_simp_cloze":"早上好，你___？","chinese_simp_answer":"怎么样","chinese_trad_full":"早上好，你怎麼樣？","chinese_trad_cloze":"早上好，你___？","chinese_trad_answer":"怎麼樣","pinyin":"Zǎoshang hǎo, nǐ zěnmeyàng?"},{"id":7,"level":1,"module":"Saludos","spanish_full":"Mucho gusto, soy de China.","spanish_cloze":"Mucho gusto, ___ de China.","spanish_answer":"soy","chinese_simp_full":"很高兴认识你，我是中国人。","chinese_simp_cloze":"很高兴___你，我是中国人。","chinese_simp_answer":"认识","chinese_trad_full":"很高興認識你，我是中國人。","chinese_trad_cloze":"很高興___你，我是中國人。","chinese_trad_answer":"認識","pinyin":"Hěn gāoxìng rènshi nǐ, wǒ shì Zhōngguó rén."},{"id":8,"level":1,"module":"Saludos","spanish_full":"Hasta mañana, descansa.","spanish_cloze":"Hasta mañana, ___.","spanish_answer":"descansa","chinese_simp_full":"明天见，好好休息。","chinese_simp_cloze":"明天见，好好___。","chinese_simp_answer":"休息","chinese_trad_full":"明天見，好好休息。","chinese_trad_cloze":"明天見，好好___。","chinese_trad_answer":"休息","pinyin":"Míngtiān jiàn, hǎohǎo xiūxi."},{"id":9,"level":1,"module":"Saludos","spanish_full":"¿Todo bien? Sí, todo bien.","spanish_cloze":"¿___ bien? Sí, todo bien.","spanish_answer":"Todo","chinese_simp_full":"一切都好吗？是的，一切都好。","chinese_simp_cloze":"___都好吗？是的，一切都好。","chinese_simp_answer":"一切","chinese_trad_full":"一切都好嗎？是的，一切都好。","chinese_trad_cloze":"___都好嗎？是的，一切都好。","chinese_trad_answer":"一切","pinyin":"Yíqiè dōu hǎo ma? Shì de, yíqiè dōu hǎo."},{"id":10,"level":1,"module":"Saludos","spanish_full":"Chau, nos vemos después.","spanish_cloze":"___, nos vemos después.","spanish_answer":"Chau","chinese_simp_full":"再见，一会儿见。","chinese_simp_cloze":"___，一会儿见。","chinese_simp_answer":"再见","chinese_trad_full":"再見，一會兒見。","chinese_trad_cloze":"___，一會兒見。","chinese_trad_answer":"再見","pinyin":"Zàijiàn, yíhuìr jiàn.","spanish_alternatives":["Chao","Adiós","Hasta luego"]},{"id":11,"level":1,"module":"Saludos","spanish_full":"Bienvenidos a mi casa.","spanish_cloze":"___ a mi casa.","spanish_answer":"Bienvenidos","chinese_simp_full":"欢迎来我家。","chinese_simp_cloze":"___来我家。","chinese_simp_answer":"欢迎","chinese_trad_full":"歡迎來我家。","chinese_trad_cloze":"___來我家。","chinese_trad_answer":"歡迎","pinyin":"Huānyíng lái wǒ jiā."},{"id":12,"level":2,"module":"Migraciones","spanish_full":"Necesito renovar mi visa.","spanish_cloze":"Necesito ___ mi visa.","spanish_answer":"renovar","chinese_simp_full":"我需要续签我的签证。","chinese_simp_cloze":"我需要___我的签证。","chinese_simp_answer":"续签","chinese_trad_full":"我需要續簽我的簽證。","chinese_trad_cloze":"我需要___我的簽證。","chinese_trad_answer":"續簽","pinyin":"Wǒ xūyào xùqiān wǒ de qiānzhèng.","spanish_alternatives":["tramitar","extender","prorrogar"]},{"id":13,"level":2,"module":"Migraciones","spanish_full":"¿Dónde puedo sacar el turno?","spanish_cloze":"¿Dónde puedo ___ el turno?","spanish_answer":"sacar","chinese_simp_full":"我在哪里可以预约？","chinese_simp_cloze":"我在哪里可以___？","chinese_simp_answer":"预约","chinese_trad_full":"我在哪裡可以預約？","chinese_trad_cloze":"我在哪裡可以___？","chinese_trad_answer":"預約","pinyin":"Wǒ zài nǎlǐ kěyǐ yùyuē?","spanish_alternatives":["obtener","conseguir","reservar"]},{"id":14,"level":2,"module":"Migraciones","spanish_full":"Mi pasaporte vence en marzo.","spanish_cloze":"Mi ___ vence en marzo.","spanish_answer":"pasaporte","chinese_simp_full":"我的护照三月份到期。","chinese_simp_cloze":"我的___三月份到期。","chinese_simp_answer":"护照","chinese_trad_full":"我的護照三月份到期。","chinese_trad_cloze":"我的___三月份到期。","chinese_trad_answer":"護照","pinyin":"Wǒ de hùzhào sān yuèfèn dàoqī."},{"id":15,"level":2,"module":"Migraciones","spanish_full":"Tengo que tramitar el DNI.","spanish_cloze":"Tengo que ___ el DNI.","spanish_answer":"tramitar","chinese_simp_full":"我需要办理身份证。","chinese_simp_cloze":"我需要___身份证。","chinese_simp_answer":"办理","chinese_trad_full":"我需要辦理身份證。","chinese_trad_cloze":"我需要___身份證。","chinese_trad_answer":"辦理","pinyin":"Wǒ xūyào bànlǐ shēnfènzhèng.","spanish_alternatives":["hacer","gestionar","solicitar"]},{"id":16,"level":2,"module":"Migraciones","spanish_full":"¿Cuánto sale la gestión?","spanish_cloze":"¿Cuánto sale la ___?","spanish_answer":"gestión","chinese_simp_full":"办理费用是多少？","chinese_simp_cloze":"办理___是多少？","chinese_simp_answer":"费用","chinese_trad_full":"辦理費用是多少？","chinese_trad_cloze":"辦理___是多少？","chinese_trad_answer":"費用","pinyin":"Bànlǐ fèiyòng shì duōshǎo?","spanish_alternatives":["trámite"]},{"id":17,"level":3,"module":"Migraciones","spanish_full":"Necesito una certificación de domicilio.","spanish_cloze":"Necesito una ___ de domicilio.","spanish_answer":"certificación","chinese_simp_full":"我需要住址证明。","chinese_simp_cloze":"我需要住址___。","chinese_simp_answer":"证明","chinese_trad_full":"我需要住址證明。","chinese_trad_cloze":"我需要住址___。","chinese_trad_answer":"證明","pinyin":"Wǒ xūyào zhùzhǐ zhèngmíng.","spanish_alternatives":["constancia","comprobante"]},{"id":18,"level":3,"module":"Migraciones","spanish_full":"¿Esta documentación es válida?","spanish_cloze":"¿Esta documentación es ___?","spanish_answer":"válida","chinese_simp_full":"这个文件有效吗？","chinese_simp_cloze":"这个文件___吗？","chinese_simp_answer":"有效","chinese_trad_full":"這個文件有效嗎？","chinese_trad_cloze":"這個文件___嗎？","chinese_trad_answer":"有效","pinyin":"Zhège wénjiàn yǒuxiào ma?","spanish_alternatives":["vigente"]},{"id":19,"level":2,"module":"Migraciones","spanish_full":"Fui a la Dirección Nacional de Migraciones.","spanish_cloze":"Fui a la Dirección Nacional de ___.","spanish_answer":"Migraciones","chinese_simp_full":"我今天去了移民局。","chinese_simp_cloze":"我今天去了___。","chinese_simp_answer":"移民局","chinese_trad_full":"我今天去了移民局。","chinese_trad_cloze":"我今天去了___。","chinese_trad_answer":"移民局","pinyin":"Wǒ jīntiān qùle yímínjú."},{"id":20,"level":3,"module":"Migraciones","spanish_full":"El trámite demora dos semanas.","spanish_cloze":"El ___ demora dos semanas.","spanish_answer":"trámite","chinese_simp_full":"这个手续需要两周时间。","chinese_simp_cloze":"这个___需要两周时间。","chinese_simp_answer":"手续","chinese_trad_full":"這個手續需要兩週時間。","chinese_trad_cloze":"這個___需要兩週時間。","chinese_trad_answer":"手續","pinyin":"Zhège shǒuxù xūyào liǎng zhōu shíjiān.","spanish_alternatives":["gestión","proceso"]},{"id":21,"level":3,"module":"Migraciones","spanish_full":"¿Me pueden dar un comprobante?","spanish_cloze":"¿Me pueden dar un ___?","spanish_answer":"comprobante","chinese_simp_full":"能给我一张收据吗？","chinese_simp_cloze":"能给我一张___吗？","chinese_simp_answer":"收据","chinese_trad_full":"能給我一張收據嗎？","chinese_trad_cloze":"能給我一張___嗎？","chinese_trad_answer":"收據","pinyin":"Néng gěi wǒ yì zhāng shōujù ma?","spanish_alternatives":["recibo","constancia"]},{"id":22,"level":2,"module":"Supermercado","spanish_full":"¿Dónde están los fideos?","spanish_cloze":"¿Dónde están los ___?","spanish_answer":"fideos","chinese_simp_full":"面条在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"面条","chinese_trad_full":"麵條在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"麵條","pinyin":"Miàntiáo zài nǎlǐ?","spanish_alternatives":["pastas"]},{"id":23,"level":2,"module":"Supermercado","spanish_full":"¿Tienen facturas de manteca?","spanish_cloze":"¿Tienen ___ de manteca?","spanish_answer":"facturas","chinese_simp_full":"你们有黄油饼干吗？","chinese_simp_cloze":"你们有黄油___吗？","chinese_simp_answer":"饼干","chinese_trad_full":"你們有黃油餅乾嗎？","chinese_trad_cloze":"你們有黃油___嗎？","chinese_trad_answer":"餅乾","pinyin":"Nǐmen yǒu huángyóu bǐnggān ma?"},{"id":24,"level":2,"module":"Supermercado","spanish_full":"Quiero medio kilo de yerba mate.","spanish_cloze":"Quiero ___ de yerba mate.","spanish_answer":"medio kilo","chinese_simp_full":"我要半公斤马黛茶。","chinese_simp_cloze":"我要___马黛茶。","chinese_simp_answer":"半公斤","chinese_trad_full":"我要半公斤馬黛茶。","chinese_trad_cloze":"我要___馬黛茶。","chinese_trad_answer":"半公斤","pinyin":"Wǒ yào bàn gōngjīn mǎdàichá."},{"id":25,"level":2,"module":"Supermercado","spanish_full":"¿Cuánto sale el pan francés?","spanish_cloze":"¿___ el pan francés?","spanish_answer":"Cuánto sale","chinese_simp_full":"法棍面包多少钱？","chinese_simp_cloze":"法棍面包___？","chinese_simp_answer":"多少钱","chinese_trad_full":"法棍麵包多少錢？","chinese_trad_cloze":"法棍麵包___？","chinese_trad_answer":"多少錢","pinyin":"Fǎgùn miànbāo duōshǎo qián?","spanish_alternatives":["Cuánto cuesta","Cuánto es","Cuánto vale"]},{"id":26,"level":2,"module":"Supermercado","spanish_full":"Pago con tarjeta o en efectivo.","spanish_cloze":"Pago con tarjeta o en ___.","spanish_answer":"efectivo","chinese_simp_full":"我用卡或者现金付。","chinese_simp_cloze":"我用卡或者___付。","chinese_simp_answer":"现金","chinese_trad_full":"我用卡或者現金付。","chinese_trad_cloze":"我用卡或者___付。","chinese_trad_answer":"現金","pinyin":"Wǒ yòng kǎ huòzhě xiànjīn fù.","spanish_alternatives":["dinero","billetes"]},{"id":27,"level":2,"module":"Supermercado","spanish_full":"¿Hay descuento con la tarjeta?","spanish_cloze":"¿Hay ___ con la tarjeta?","spanish_answer":"descuento","chinese_simp_full":"刷卡有折扣吗？","chinese_simp_cloze":"刷卡有___吗？","chinese_simp_answer":"折扣","chinese_trad_full":"刷卡有折扣嗎？","chinese_trad_cloze":"刷卡有___嗎？","chinese_trad_answer":"折扣","pinyin":"Shuākǎ yǒu zhékòu ma?","spanish_alternatives":["promoción","rebaja","oferta"]},{"id":28,"level":2,"module":"Supermercado","spanish_full":"¿Dónde está la caja?","spanish_cloze":"¿Dónde está la ___?","spanish_answer":"caja","chinese_simp_full":"收银台在哪里？","chinese_simp_cloze":"___在哪里？","chinese_simp_answer":"收银台","chinese_trad_full":"收銀台在哪裡？","chinese_trad_cloze":"___在哪裡？","chinese_trad_answer":"收銀台","pinyin":"Shōuyíntái zài nǎlǐ?"},{"id":29,"level":1,"module":"Supermercado","spanish_full":"Necesito una bolsa, por favor.","spanish_cloze":"Necesito una bolsa, ___.","spanish_answer":"por favor","chinese_simp_full":"请给我一个袋子。","chinese_simp_cloze":"___给我一个袋子。","chinese_simp_answer":"请","chinese_trad_full":"請給我一個袋子。","chinese_trad_cloze":"___給我一個袋子。","chinese_trad_answer":"請","pinyin":"Qǐng gěi wǒ yí ge dàizi."},{"id":30,"level":2,"module":"Supermercado","spanish_full":"¿Tienen delivery a domicilio?","spanish_cloze":"¿Tienen ___ a domicilio?","spanish_answer":"delivery","chinese_simp_full":"你们有送货上门服务吗？","chinese_simp_cloze":"你们有送货上门___吗？","chinese_simp_answer":"服务","chinese_trad_full":"你們有送貨上門服務嗎？","chinese_trad_cloze":"你們有送貨上門___嗎？","chinese_trad_answer":"服務","pinyin":"Nǐmen yǒu sònghuò shàngmén fúwù ma?","spanish_alternatives":["envío"]},{"id":31,"level":2,"module":"Supermercado","spanish_full":"El precio subió otra vez.","spanish_cloze":"El precio ___ otra vez.","spanish_answer":"subió","chinese_simp_full":"价格又涨了。","chinese_simp_cloze":"价格又___了。","chinese_simp_answer":"涨","chinese_trad_full":"價格又漲了。","chinese_trad_cloze":"價格又___了。","chinese_trad_answer":"漲","pinyin":"Jiàgé yòu zhǎng le.","spanish_alternatives":["aumentó","creció"]},{"id":32,"level":2,"module":"Supermercado","spanish_full":"¿Dónde puedo encontrar leche de almendras?","spanish_cloze":"¿Dónde puedo ___ leche de almendras?","spanish_answer":"encontrar","chinese_simp_full":"在哪里可以找到杏仁奶？","chinese_simp_cloze":"在哪里可以___杏仁奶？","chinese_simp_answer":"找到","chinese_trad_full":"在哪裡可以找到杏仁奶？","chinese_trad_cloze":"在哪裡可以___杏仁奶？","chinese_trad_answer":"找到","pinyin":"Zài nǎlǐ kěyǐ zhǎodào xìngrén nǎi?","spanish_alternatives":["hallar","conseguir","buscar"]},{"id":33,"level":1,"module":"Supermercado","spanish_full":"¿Me hacés un favor?","spanish_cloze":"¿Me ___ un favor?","spanish_answer":"hacés","chinese_simp_full":"你能帮我一个忙吗？","chinese_simp_cloze":"你能___我一个忙吗？","chinese_simp_answer":"帮","chinese_trad_full":"你能幫我一個忙嗎？","chinese_trad_cloze":"你能___我一個忙嗎？","chinese_trad_answer":"幫","pinyin":"Nǐ néng bāng wǒ yí ge máng ma?","spanish_alternatives":["podés","puedes"]},{"id":34,"level":3,"module":"Migraciones","spanish_full":"Me dieron el certificado de antecedentes.","spanish_cloze":"Me dieron el certificado de ___.","spanish_answer":"antecedentes","chinese_simp_full":"我拿到了无犯罪记录证明。","chinese_simp_cloze":"我拿到了无犯罪___证明。","chinese_simp_answer":"记录","chinese_trad_full":"我拿到了無犯罪記錄證明。","chinese_trad_cloze":"我拿到了無犯罪___證明。","chinese_trad_answer":"記錄","pinyin":"Wǒ ná dào le wú fànzuì jìlù zhèngmíng.","spanish_alternatives":["certificado"]},{"id":35,"level":3,"module":"Supermercado","spanish_full":"¿Aceptan Mercado Pago?","spanish_cloze":"¿___ Mercado Pago?","spanish_answer":"Aceptan","chinese_simp_full":"可以用Mercado Pago付吗？","chinese_simp_cloze":"___用Mercado Pago付吗？","chinese_simp_answer":"可以","chinese_trad_full":"可以用Mercado Pago付嗎？","chinese_trad_cloze":"___用Mercado Pago付嗎？","chinese_trad_answer":"可以","pinyin":"Kěyǐ yòng Mercado Pago fù ma?","spanish_alternatives":["Toman","Reciben"]},{"id":36,"level":1,"module":"Familia","spanish_full":"Mi madre cocina muy rico.","spanish_cloze":"Mi ___ cocina muy rico.","spanish_answer":"madre","chinese_simp_full":"我妈妈做饭很好吃。","chinese_simp_cloze":"我___做饭很好吃。","chinese_simp_answer":"妈妈","chinese_trad_full":"我媽媽做飯很好吃。","chinese_trad_cloze":"我___做飯很好吃。","chinese_trad_answer":"媽媽","pinyin":"Wǒ māma zuò fàn hěn hǎochī."},{"id":37,"level":1,"module":"Tiempo","spanish_full":"Hoy hace mucho calor.","spanish_cloze":"Hoy ___ mucho calor.","spanish_answer":"hace","chinese_simp_full":"今天天气很热。","chinese_simp_cloze":"今天___很热。","chinese_simp_answer":"天气","chinese_trad_full":"今天天氣很熱。","chinese_trad_cloze":"今天___很熱。","chinese_trad_answer":"天氣","pinyin":"Jīntiān tiānqì hěn rè."},{"id":38,"level":2,"module":"Transporte","spanish_full":"El subte está lleno a esta hora.","spanish_cloze":"El ___ está lleno a esta hora.","spanish_answer":"subte","spanish_alternatives":["metro"],"chinese_simp_full":"这个点地铁很挤。","chinese_simp_cloze":"这个点___很挤。","chinese_simp_answer":"地铁","chinese_trad_full":"這個點地鐵很擠。","chinese_trad_cloze":"這個點___很擠。","chinese_trad_answer":"地鐵","pinyin":"Zhège diǎn dìtiě hěn jǐ."},{"id":39,"level":2,"module":"Compras","spanish_full":"¿Me lo puede envolver para regalo?","spanish_cloze":"¿Me lo puede ___ para regalo?","spanish_answer":"envolver","chinese_simp_full":"能帮我包成礼物吗？","chinese_simp_cloze":"能帮我___成礼物吗？","chinese_simp_answer":"包","chinese_trad_full":"能幫我包成禮物嗎？","chinese_trad_cloze":"能幫我___成禮物嗎？","chinese_trad_answer":"包","pinyin":"Néng bāng wǒ bāo chéng lǐwù ma?"},{"id":40,"level":2,"module":"Direcciones","spanish_full":"Doble a la izquierda en la esquina.","spanish_cloze":"Doble a la ___ en la esquina.","spanish_answer":"izquierda","chinese_simp_full":"在拐角处向左转。","chinese_simp_cloze":"在拐角处向___转。","chinese_simp_answer":"左","chinese_trad_full":"在拐角處向左轉。","chinese_trad_cloze":"在拐角處向___轉。","chinese_trad_answer":"左","pinyin":"Zài guǎijiǎo chù xiàng zuǒzhuǎn."},{"id":41,"level":3,"module":"Salud","spanish_full":"Tengo que tomar esta medicina tres veces al día.","spanish_cloze":"Tengo que ___ esta medicina tres veces al día.","spanish_answer":"tomar","chinese_simp_full":"我得一天吃三次这个药。","chinese_simp_cloze":"我得一天___三次这个药。","chinese_simp_answer":"吃","chinese_trad_full":"我得一天吃三次這個藥。","chinese_trad_cloze":"我得一天___三次這個藥。","chinese_trad_answer":"吃","pinyin":"Wǒ děi yì tiān chī sān cì zhège yào."},{"id":42,"level":3,"module":"Trabajo","spanish_full":"Mi jefe me pidió que termine el informe hoy.","spanish_cloze":"Mi ___ me pidió que termine el informe hoy.","spanish_answer":"jefe","chinese_simp_full":"老板让我今天完成报告。","chinese_simp_cloze":"___让我今天完成报告。","chinese_simp_answer":"老板","chinese_trad_full":"老闆讓我今天完成報告。","chinese_trad_cloze":"___讓我今天完成報告。","chinese_trad_answer":"老闆","pinyin":"Lǎobǎn ràng wǒ jīntiān wánchéng bàogào."},{"id":43,"level":3,"module":"Opiniones","spanish_full":"Creo que aprender español es difícil pero útil.","spanish_cloze":"___ que aprender español es difícil pero útil.","spanish_answer":"Creo","chinese_simp_full":"我觉得学西班牙语虽然难但是很有用。","chinese_simp_cloze":"我___学西班牙语虽然难但是很有用。","chinese_simp_answer":"觉得","chinese_trad_full":"我覺得學西班牙語雖然難但是很有用。","chinese_trad_cloze":"我___學西班牙語雖然難但是很有用。","chinese_trad_answer":"覺得","pinyin":"Wǒ juéde xué Xībānyáyǔ suīrán nán dànshì hěn yǒuyòng."},{"id":44,"level":1,"module":"Comida","spanish_full":"Quiero comer empanadas de carne.","spanish_cloze":"Quiero ___ empanadas de carne.","spanish_answer":"comer","chinese_simp_full":"我想吃肉馅的馅饼。","chinese_simp_cloze":"我想___肉馅的馅饼。","chinese_simp_answer":"吃","chinese_trad_full":"我想吃肉餡的餡餅。","chinese_trad_cloze":"我想___肉餡的餡餅。","chinese_trad_answer":"吃","pinyin":"Wǒ xiǎng chī ròu xiàn de xiànbǐng."},{"id":45,"level":2,"module":"Vivienda","spanish_full":"El alquiler subió mucho este mes.","spanish_cloze":"El ___ subió mucho este mes.","spanish_answer":"alquiler","chinese_simp_full":"这个月房租涨了很多。","chinese_simp_cloze":"这个月___涨了很多。","chinese_simp_answer":"房租","chinese_trad_full":"這個月房租漲了很多。","chinese_trad_cloze":"這個月___漲了很多。","chinese_trad_answer":"房租","pinyin":"Zhège yuè fángzū zhǎngle hěn duō."},{"id":46,"level":3,"module":"Sentimientos","spanish_full":"Estoy cansado porque trabajé demasiado.","spanish_cloze":"Estoy ___ porque trabajé demasiado.","spanish_answer":"cansado","chinese_simp_full":"我很累因为工作太多了。","chinese_simp_cloze":"我很___因为工作太多了。","chinese_simp_answer":"累","chinese_trad_full":"我很累因為工作太多了。","chinese_trad_cloze":"我很___因為工作太多了。","chinese_trad_answer":"累","pinyin":"Wǒ hěn lèi yīnwèi gōngzuò tài duō le."},{"id":47,"level":2,"module":"Supermercado","spanish_full":"¿Tiene cambio de mil pesos?","spanish_cloze":"¿Tiene ___ de mil pesos?","spanish_answer":"cambio","chinese_simp_full":"您有一千块的零钱吗？","chinese_simp_cloze":"您有一千块的___吗？","chinese_simp_answer":"零钱","chinese_trad_full":"您有一千塊的零錢嗎？","chinese_trad_cloze":"您有一千塊的___嗎？","chinese_trad_answer":"零錢","pinyin":"Nín yǒu yì qiān kuài de língqián ma?"},{"id":48,"level":3,"module":"Migraciones","spanish_full":"Debo presentar los originales y las copias.","spanish_cloze":"Debo presentar los ___ y las copias.","spanish_answer":"originales","chinese_simp_full":"我必须提交原件和复印件。","chinese_simp_cloze":"我必须提交___和复印件。","chinese_simp_answer":"原件","chinese_trad_full":"我必須提交原件和複印件。","chinese_trad_cloze":"我必須提交___和複印件。","chinese_trad_answer":"原件","pinyin":"Wǒ bìxū tíjiāo yuánjiàn hé fùyìnjiàn."},{"id":49,"level":1,"module":"Rutina","spanish_full":"Me levanto temprano todos los días.","spanish_cloze":"Me ___ temprano todos los días.","spanish_answer":"levanto","chinese_simp_full":"我每天早起。","chinese_simp_cloze":"我每天___。","chinese_simp_answer":"早起","chinese_trad_full":"我每天早起。","chinese_trad_cloze":"我每天___。","chinese_trad_answer":"早起","pinyin":"Wǒ měitiān zǎoqǐ."},{"id":50,"level":3,"module":"Conectores","spanish_full":"No fui a trabajar porque estaba enfermo.","spanish_cloze":"No fui a trabajar ___ estaba enfermo.","spanish_answer":"porque","chinese_simp_full":"我没去上班因为我病了。","chinese_simp_cloze":"我没去上班___我病了。","chinese_simp_answer":"因为","chinese_trad_full":"我沒去上班因為我病了。","chinese_trad_cloze":"我沒去上班___我病了。","chinese_trad_answer":"因為","pinyin":"Wǒ méi qù shàngbān yīnwèi wǒ bìng le."}],
'HSK1': [{"id":"hsk1_01","level":1,"module":"HSK1","chinese_simp_full":"你好，我叫李明，我是中国人。","chinese_simp_cloze":"___，我叫李明，我是中国人。","chinese_simp_answer":"你好","chinese_trad_full":"你好，我叫李明，我是中國人。","chinese_trad_cloze":"___，我叫李明，我是中國人。","chinese_trad_answer":"你好","spanish_full":"Hola, me llamo Li Ming, soy chino.","spanish_cloze":"___, me llamo Li Ming, soy chino.","spanish_answer":"Hola","pinyin":"Nǐ hǎo, wǒ jiào Lǐ Míng, wǒ shì Zhōngguó rén."},{"id":"hsk1_02","level":1,"module":"HSK1","chinese_simp_full":"请问，去火车站怎么走？","chinese_simp_cloze":"___，去火车站怎么走？","chinese_simp_answer":"请问","chinese_trad_full":"請問，去火車站怎麼走？","chinese_trad_cloze":"___，去火車站怎麼走？","chinese_trad_answer":"請問","spanish_full":"Disculpe, ¿cómo se va a la estación de tren?","spanish_cloze":"___, ¿cómo se va a la estación de tren?","spanish_answer":"Disculpe","pinyin":"Qǐngwèn, qù huǒchēzhàn zěnme zǒu?"},{"id":"hsk1_03","level":1,"module":"HSK1","chinese_simp_full":"这个苹果多少钱？太贵了，便宜一点儿吧。","chinese_simp_cloze":"这个苹果___？太贵了，便宜一点儿吧。","chinese_simp_answer":"多少钱","chinese_trad_full":"這個蘋果多少錢？太貴了，便宜一點兒吧。","chinese_trad_cloze":"這個蘋果___？太貴了，便宜一點兒吧。","chinese_trad_answer":"多少錢","spanish_full":"¿Cuánto cuesta esta manzana? Es muy cara, baje un poco el precio.","spanish_cloze":"¿___ cuesta esta manzana? Es muy cara, baje un poco el precio.","spanish_answer":"Cuánto","pinyin":"Zhège píngguǒ duōshao qián? Tài guì le, piányi yīdiǎnr ba."},{"id":"hsk1_04","level":1,"module":"HSK1","chinese_simp_full":"我想买一张去北京的机票，明天上午的。","chinese_simp_cloze":"我想___一张去北京的机票，明天上午的。","chinese_simp_answer":"买","chinese_trad_full":"我想買一張去北京的機票，明天上午的。","chinese_trad_cloze":"我想___一張去北京的機票，明天上午的。","chinese_trad_answer":"買","spanish_full":"Quiero comprar un boleto de avión a Beijing para mañana por la mañana.","spanish_cloze":"Quiero ___ un boleto de avión a Beijing para mañana por la mañana.","spanish_answer":"comprar","pinyin":"Wǒ xiǎng mǎi yī zhāng qù Běijīng de jīpiào, míngtiān shàngwǔ de."},{"id":"hsk1_05","level":1,"module":"HSK1","chinese_simp_full":"对不起，我没有带钱，可以打电话给我朋友吗？","chinese_simp_cloze":"___，我没有带钱，可以打电话给我朋友吗？","chinese_simp_answer":"对不起","chinese_trad_full":"對不起，我沒有帶錢，可以打電話給我朋友嗎？","chinese_trad_cloze":"___，我沒有帶錢，可以打電話給我朋友嗎？","chinese_trad_answer":"對不起","spanish_full":"Lo siento, no traje dinero, ¿puedo llamar a mi amigo?","spanish_cloze":"___, no traje dinero, ¿puedo llamar a mi amigo?","spanish_answer":"Lo siento","pinyin":"Duìbuqǐ, wǒ méiyǒu dài qián, kěyǐ dǎ diànhuà gěi wǒ péngyou ma?"},{"id":"hsk1_06","level":1,"module":"HSK1","chinese_simp_full":"今天天气很冷，我想喝热茶，不想吃冷的东西。","chinese_simp_cloze":"今天天气很___，我想喝热茶，不想吃冷的东西。","chinese_simp_answer":"冷","chinese_trad_full":"今天天氣很冷，我想喝熱茶，不想吃冷的東西。","chinese_trad_cloze":"今天天氣很___，我想喝熱茶，不想吃冷的東西。","chinese_trad_answer":"冷","spanish_full":"Hoy hace mucho frío, quiero tomar té caliente, no quiero comer cosas frías.","spanish_cloze":"Hoy hace mucho ___, quiero tomar té caliente, no quiero comer cosas frías.","spanish_answer":"frío","pinyin":"Jīntiān tiānqì hěn lěng, wǒ xiǎng hē rè chá, bù xiǎng chī lěng de dōngxi."},{"id":"hsk1_07","level":1,"module":"HSK1","chinese_simp_full":"我女儿在学校学习汉语，她很喜欢她的老师。","chinese_simp_cloze":"我女儿在学校___汉语，她很喜欢她的老师。","chinese_simp_answer":"学习","chinese_trad_full":"我女兒在學校學習漢語，她很喜歡她的老師。","chinese_trad_cloze":"我女兒在學校___漢語，她很喜歡她的老師。","chinese_trad_answer":"學習","spanish_full":"Mi hija estudia chino en la escuela, le gusta mucho su profesora.","spanish_cloze":"Mi hija ___ chino en la escuela, le gusta mucho su profesora.","spanish_answer":"estudia","pinyin":"Wǒ nǚ'ér zài xuéxiào xuéxí Hànyǔ, tā hěn xǐhuan tā de lǎoshī."},{"id":"hsk1_08","level":1,"module":"HSK1","chinese_simp_full":"现在几点？我们下午三点去看电影，然后去饭店吃饭。","chinese_simp_cloze":"现在___？我们下午三点去看电影，然后去饭店吃饭。","chinese_simp_answer":"几点","chinese_trad_full":"現在幾點？我們下午三點去看電影，然後去飯店吃飯。","chinese_trad_cloze":"現在___？我們下午三點去看電影，然後去飯店吃飯。","chinese_trad_answer":"幾點","spanish_full":"¿Qué hora es? Vamos al cine a las tres de la tarde, luego iremos al restaurante a cenar.","spanish_cloze":"¿___ hora es? Vamos al cine a las tres de la tarde, luego iremos al restaurante a cenar.","spanish_answer":"Qué","pinyin":"Xiànzài jǐ diǎn? Wǒmen xiàwǔ sān diǎn qù kàn diànyǐng, ránhòu qù fàndiàn chīfàn."},{"id":"hsk1_09","level":1,"module":"HSK1","chinese_simp_full":"这本书是我的，那本是你的，它们都在桌子上面。","chinese_simp_cloze":"这本书是___，那本是你的，它们都在桌子上面。","chinese_simp_answer":"我的","chinese_trad_full":"這本書是我的，那本是你的，它們都在桌子上面。","chinese_trad_cloze":"這本書是___，那本是你的，它們都在桌子上面。","chinese_trad_answer":"我的","spanish_full":"Este libro es mío, ese es tuyo, ambos están encima de la mesa.","spanish_cloze":"Este libro es ___, ese es tuyo, ambos están encima de la mesa.","spanish_answer":"mío","pinyin":"Zhè běn shū shì wǒ de, nà běn shì nǐ de, tāmen dōu zài zhuōzi shàngmiàn."},{"id":"hsk1_10","level":1,"module":"HSK1","chinese_simp_full":"谢谢你帮我，没关系，我们都是好朋友。","chinese_simp_cloze":"谢谢你帮我，___，我们都是好朋友。","chinese_simp_answer":"没关系","chinese_trad_full":"謝謝你幫我，沒關係，我們都是好朋友。","chinese_trad_cloze":"謝謝你幫我，___，我們都是好朋友。","chinese_trad_answer":"沒關係","spanish_full":"Gracias por ayudarme, no hay problema, todos somos buenos amigos.","spanish_cloze":"Gracias por ayudarme, ___, todos somos buenos amigos.","spanish_answer":"no hay problema","pinyin":"Xièxie nǐ bāng wǒ, méiguānxi, wǒmen dōu shì hǎo péngyou."},{"id":"hsk1_11","level":1,"module":"HSK1","chinese_simp_full":"我爸爸是医生，我妈妈是老师。","chinese_simp_cloze":"我___是医生，我妈妈是老师。","chinese_simp_answer":"爸爸","chinese_trad_full":"我爸爸是醫生，我媽媽是老師。","chinese_trad_cloze":"我___是醫生，我媽媽是老師。","chinese_trad_answer":"爸爸","spanish_full":"Mi papá es médico y mi mamá es profesora.","spanish_cloze":"Mi ___ es médico y mi mamá es profesora.","spanish_answer":"papá","pinyin":"Wǒ bàba shì yīshēng, wǒ māma shì lǎoshī."},{"id":"hsk1_12","level":1,"module":"HSK1","chinese_simp_full":"我喜欢吃苹果和香蕉。","chinese_simp_cloze":"我___吃苹果和香蕉。","chinese_simp_answer":"喜欢","chinese_trad_full":"我喜歡吃蘋果和香蕉。","chinese_trad_cloze":"我___吃蘋果和香蕉。","chinese_trad_answer":"喜歡","spanish_full":"Me gusta comer manzanas y bananas.","spanish_cloze":"Me ___ comer manzanas y bananas.","spanish_answer":"gusta","pinyin":"Wǒ xǐhuan chī píngguǒ hé xiāngjiāo."},{"id":"hsk1_13","level":1,"module":"HSK1","chinese_simp_full":"现在几点了？我想睡觉了。","chinese_simp_cloze":"现在___了？我想睡觉了。","chinese_simp_answer":"几点","chinese_trad_full":"現在幾點了？我想睡覺了。","chinese_trad_cloze":"現在___了？我想睡覺了。","chinese_trad_answer":"幾點","spanish_full":"¿Qué hora es? Quiero irme a dormir.","spanish_cloze":"¿___ es? Quiero irme a dormir.","spanish_answer":"Qué hora","pinyin":"Xiànzài jǐ diǎn le? Wǒ xiǎng shuìjiào le."},{"id":"hsk1_14","level":1,"module":"HSK1","chinese_simp_full":"这个杯子是我的，那个桌子是你的。","chinese_simp_cloze":"这个___是我的，那个桌子是你的。","chinese_simp_answer":"杯子","chinese_trad_full":"這個杯子是我的，那個桌子是你的。","chinese_trad_cloze":"這個___是我的，那個桌子是你的。","chinese_trad_answer":"杯子","spanish_full":"Este vaso es mío y esa mesa es tuya.","spanish_cloze":"Este ___ es mío y esa mesa es tuya.","spanish_answer":"vaso","pinyin":"Zhège bēizi shì wǒ de, nàge zhuōzi shì nǐ de."},{"id":"hsk1_15","level":1,"module":"HSK1","chinese_simp_full":"昨天我看见一只猫在椅子上。","chinese_simp_cloze":"昨天我___一只猫在椅子上。","chinese_simp_answer":"看见","chinese_trad_full":"昨天我看見一隻貓在椅子上。","chinese_trad_cloze":"昨天我___一隻貓在椅子上。","chinese_trad_answer":"看見","spanish_full":"Ayer vi un gato sentado en la silla.","spanish_cloze":"Ayer ___ un gato sentado en la silla.","spanish_answer":"vi","pinyin":"Zuótiān wǒ kànjiàn yī zhī māo zài yǐzi shàng."},{"id":"hsk1_16","level":1,"module":"HSK1","chinese_simp_full":"请问，我可以坐这儿吗？","chinese_simp_cloze":"___，我可以坐这儿吗？","chinese_simp_answer":"请问","chinese_trad_full":"請問，我可以坐這兒嗎？","chinese_trad_cloze":"___，我可以坐這兒嗎？","chinese_trad_answer":"請問","spanish_full":"Disculpe, ¿puedo sentarme aquí?","spanish_cloze":"___, ¿puedo sentarme aquí?","spanish_answer":"Disculpe","pinyin":"Qǐngwèn, wǒ kěyǐ zuò zhèr ma?"},{"id":"hsk1_17","level":1,"module":"HSK1","chinese_simp_full":"他正在看书，我在写作业。","chinese_simp_cloze":"他正在___，我在写作业。","chinese_simp_answer":"看书","chinese_trad_full":"他正在看書，我在寫作業。","chinese_trad_cloze":"他正在___，我在寫作業。","chinese_trad_answer":"看書","spanish_full":"Él está leyendo un libro y yo estoy haciendo la tarea.","spanish_cloze":"Él está ___ un libro y yo estoy haciendo la tarea.","spanish_answer":"leyendo","pinyin":"Tā zhèngzài kànshū, wǒ zài xiě zuòyè."},{"id":"hsk1_18","level":1,"module":"HSK1","chinese_simp_full":"今天天气很好，我们一起去公园吧。","chinese_simp_cloze":"今天___很好，我们一起去公园吧。","chinese_simp_answer":"天气","chinese_trad_full":"今天天氣很好，我們一起去公園吧。","chinese_trad_cloze":"今天___很好，我們一起去公園吧。","chinese_trad_answer":"天氣","spanish_full":"Hoy hace muy buen clima, vamos juntos al parque.","spanish_cloze":"Hoy hace muy buen ___, vamos juntos al parque.","spanish_answer":"clima","pinyin":"Jīntiān tiānqì hěn hǎo, wǒmen yīqǐ qù gōngyuán ba."},{"id":"hsk1_19","level":1,"module":"HSK1","chinese_simp_full":"这件衣服太贵了，我不要买。","chinese_simp_cloze":"这件衣服太___了，我不要买。","chinese_simp_answer":"贵","chinese_trad_full":"這件衣服太貴了，我不要買。","chinese_trad_cloze":"這件衣服太___了，我不要買。","chinese_trad_answer":"貴","spanish_full":"Esta ropa es demasiado cara, no quiero comprarla.","spanish_cloze":"Esta ropa es demasiado ___, no quiero comprarla.","spanish_answer":"cara","pinyin":"Zhè jiàn yīfu tài guì le, wǒ bùyào mǎi."},{"id":"hsk1_20","level":1,"module":"HSK1","chinese_simp_full":"谢谢你请我喝茶，不客气！","chinese_simp_cloze":"谢谢你___我喝茶，不客气！","chinese_simp_answer":"请","chinese_trad_full":"謝謝你請我喝茶，不客氣！","chinese_trad_cloze":"謝謝你___我喝茶，不客氣！","chinese_trad_answer":"請","spanish_full":"Gracias por invitarme a tomar té, ¡de nada!","spanish_cloze":"Gracias por ___me a tomar té, ¡de nada!","spanish_answer":"invitar","pinyin":"Xièxie nǐ qǐng wǒ hē chá, bú kèqi!"}],
'HSK2': [{"id":"hsk2_01","level":2,"module":"HSK2","chinese_simp_full":"我觉得中文比英文难，但是我非常喜欢。","chinese_simp_cloze":"我觉得中文___英文难，但是我非常喜欢。","chinese_simp_answer":"比","chinese_trad_full":"我覺得中文比英文難，但是我非常喜歡。","chinese_trad_cloze":"我覺得中文___英文難，但是我非常喜歡。","chinese_trad_answer":"比","spanish_full":"Creo que el chino es más difícil que el inglés, pero me gusta mucho.","spanish_cloze":"Creo que el chino es ___ difícil que el inglés, pero me gusta mucho.","spanish_answer":"más","pinyin":"Wǒ juéde Zhōngwén bǐ Yīngwén nán, dànshì wǒ fēicháng xǐhuan."},{"id":"hsk2_02","level":2,"module":"HSK2","chinese_simp_full":"因为下雨了，所以我们不去公园跑步了。","chinese_simp_cloze":"___下雨了，所以我们不去公园跑步了。","chinese_simp_answer":"因为","chinese_trad_full":"因為下雨了，所以我們不去公園跑步了。","chinese_trad_cloze":"___下雨了，所以我們不去公園跑步了。","chinese_trad_answer":"因為","spanish_full":"Como está lloviendo, no vamos al parque a correr.","spanish_cloze":"___ está lloviendo, no vamos al parque a correr.","spanish_answer":"Como","pinyin":"Yīnwèi xià yǔ le, suǒyǐ wǒmen bú qù gōngyuán pǎobù le."},{"id":"hsk2_03","level":2,"module":"HSK2","chinese_simp_full":"请问，去机场的公共汽车站在哪儿？","chinese_simp_cloze":"请问，去___的公共汽车站在哪儿？","chinese_simp_answer":"机场","chinese_trad_full":"請問，去機場的公共汽車站在哪兒？","chinese_trad_cloze":"請問，去___的公共汽車站在哪兒？","chinese_trad_answer":"機場","spanish_full":"Disculpe, ¿dónde está la parada del autobús al aeropuerto?","spanish_cloze":"Disculpe, ¿dónde está la parada del ___ al aeropuerto?","spanish_answer":"autobús","pinyin":"Qǐngwèn, qù jīchǎng de gōnggòng qìchē zhàn zài nǎr?"},{"id":"hsk2_04","level":2,"module":"HSK2","chinese_simp_full":"我身体不舒服，想去医院看看医生。","chinese_simp_cloze":"我___不舒服，想去医院看看医生。","chinese_simp_answer":"身体","chinese_trad_full":"我身體不舒服，想去醫院看看醫生。","chinese_trad_cloze":"我___不舒服，想去醫院看看醫生。","chinese_trad_answer":"身體","spanish_full":"No me siento bien del cuerpo, quiero ir al hospital a ver al médico.","spanish_cloze":"No me siento bien del ___, quiero ir al hospital a ver al médico.","spanish_answer":"cuerpo","pinyin":"Wǒ shēntǐ bù shūfu, xiǎng qù yīyuàn kànkan yīshēng."},{"id":"hsk2_05","level":2,"module":"HSK2","chinese_simp_full":"虽然这个宾馆很便宜，但是房间太小了。","chinese_simp_cloze":"___这个宾馆很便宜，但是房间太小了。","chinese_simp_answer":"虽然","chinese_trad_full":"雖然這個賓館很便宜，但是房間太小了。","chinese_trad_cloze":"___這個賓館很便宜，但是房間太小了。","chinese_trad_answer":"雖然","spanish_full":"Aunque este hotel es muy barato, la habitación es demasiado pequeña.","spanish_cloze":"___ este hotel es muy barato, la habitación es demasiado pequeña.","spanish_answer":"Aunque","pinyin":"Suīrán zhège bīnguǎn hěn piányi, dànshì fángjiān tài xiǎo le."},{"id":"hsk2_06","level":2,"module":"HSK2","chinese_simp_full":"我已经准备好了，可以开始考试了吗？","chinese_simp_cloze":"我已经___好了，可以开始考试了吗？","chinese_simp_answer":"准备","chinese_trad_full":"我已經準備好了，可以開始考試了嗎？","chinese_trad_cloze":"我已經___好了，可以開始考試了嗎？","chinese_trad_answer":"準備","spanish_full":"Ya estoy preparado, ¿podemos empezar el examen?","spanish_cloze":"Ya estoy ___, ¿podemos empezar el examen?","spanish_answer":"preparado","pinyin":"Wǒ yǐjīng zhǔnbèi hǎo le, kěyǐ kāishǐ kǎoshì le ma?"},{"id":"hsk2_07","level":2,"module":"HSK2","chinese_simp_full":"这件红色的衣服真漂亮，我要买两件。","chinese_simp_cloze":"这件___色的衣服真漂亮，我要买两件。","chinese_simp_answer":"红","chinese_trad_full":"這件紅色的衣服真漂亮，我要買兩件。","chinese_trad_cloze":"這件___色的衣服真漂亮，我要買兩件。","chinese_trad_answer":"紅","spanish_full":"Esta ropa roja es realmente hermosa, voy a comprar dos piezas.","spanish_cloze":"Esta ropa ___ es realmente hermosa, voy a comprar dos piezas.","spanish_answer":"roja","pinyin":"Zhè jiàn hóngsè de yīfu zhēn piàoliang, wǒ yào mǎi liǎng jiàn."},{"id":"hsk2_08","level":2,"module":"HSK2","chinese_simp_full":"他每天早上六点起床，然后去公司上班。","chinese_simp_cloze":"他每天早上六点___，然后去公司上班。","chinese_simp_answer":"起床","chinese_trad_full":"他每天早上六點起床，然後去公司上班。","chinese_trad_cloze":"他每天早上六點___，然後去公司上班。","chinese_trad_answer":"起床","spanish_full":"Él se levanta a las seis cada mañana, luego va a la empresa a trabajar.","spanish_cloze":"Él se ___ a las seis cada mañana, luego va a la empresa a trabajar.","spanish_answer":"levanta","pinyin":"Tā měitiān zǎoshang liù diǎn qǐchuáng, ránhòu qù gōngsī shàngbān."},{"id":"hsk2_09","level":2,"module":"HSK2","chinese_simp_full":"对不起，我把你的铅笔弄丢了，我再给你买一支新的。","chinese_simp_cloze":"对不起，我把你的___弄丢了，我再给你买一支新的。","chinese_simp_answer":"铅笔","chinese_trad_full":"對不起，我把你的鉛筆弄丟了，我再給你買一支新的。","chinese_trad_cloze":"對不起，我把你的___弄丟了，我再給你買一支新的。","chinese_trad_answer":"鉛筆","spanish_full":"Lo siento, perdí tu lápiz, te compraré uno nuevo.","spanish_cloze":"Lo siento, perdí tu ___, te compraré uno nuevo.","spanish_answer":"lápiz","pinyin":"Duìbuqǐ, wǒ bǎ nǐ de qiānbǐ nòngdiū le, wǒ zài gěi nǐ mǎi yī zhī xīn de."},{"id":"hsk2_10","level":2,"module":"HSK2","chinese_simp_full":"这家饭馆的面条很好吃，大家都喜欢来这儿吃。","chinese_simp_cloze":"这家饭馆的___很好吃，大家都喜欢来这儿吃。","chinese_simp_answer":"面条","chinese_trad_full":"這家飯館的麵條很好吃，大家都喜歡來這兒吃。","chinese_trad_cloze":"這家飯館的___很好吃，大家都喜歡來這兒吃。","chinese_trad_answer":"麵條","spanish_full":"Los fideos de este restaurante son deliciosos, a todos les gusta venir aquí a comer.","spanish_cloze":"Los ___ de este restaurante son deliciosos, a todos les gusta venir aquí a comer.","spanish_answer":"fideos","pinyin":"Zhè jiā fànguǎn de miàntiáo hěn hǎochī, dàjiā dōu xǐhuan lái zhèr chī."},{"id":"hsk2_11","level":2,"module":"HSK2","chinese_simp_full":"你左边的那个房间是我的教室，右边是办公室。","chinese_simp_cloze":"你___边的那个房间是我的教室，右边是办公室。","chinese_simp_answer":"左","chinese_trad_full":"你左邊的那個房間是我的教室，右邊是辦公室。","chinese_trad_cloze":"你___邊的那個房間是我的教室，右邊是辦公室。","chinese_trad_answer":"左","spanish_full":"La habitación a tu izquierda es mi aula, la derecha es la oficina.","spanish_cloze":"La habitación a tu ___ es mi aula, la derecha es la oficina.","spanish_answer":"izquierda","pinyin":"Nǐ zuǒbian de nàge fángjiān shì wǒ de jiàoshì, yòubian shì bàngōngshì."},{"id":"hsk2_12","level":2,"module":"HSK2","chinese_simp_full":"昨天我去火车站送朋友，他坐火车回老家了。","chinese_simp_cloze":"昨天我去___送朋友，他坐火车回老家了。","chinese_simp_answer":"火车站","chinese_trad_full":"昨天我去火車站送朋友，他坐火車回老家了。","chinese_trad_cloze":"昨天我去___送朋友，他坐火車回老家了。","chinese_trad_answer":"火車站","spanish_full":"Ayer fui a la estación de tren a despedir a mi amigo, se fue en tren a su pueblo natal.","spanish_cloze":"Ayer fui a la ___ de tren a despedir a mi amigo, se fue en tren a su pueblo natal.","spanish_answer":"estación","pinyin":"Zuótiān wǒ qù huǒchēzhàn sòng péngyou, tā zuò huǒchē huí lǎojiā le."},{"id":"hsk2_13","level":2,"module":"HSK2","chinese_simp_full":"这个问题太难了，我不懂，你能告诉我吗？","chinese_simp_cloze":"这个___太难了，我不懂，你能告诉我吗？","chinese_simp_answer":"问题","chinese_trad_full":"這個問題太難了，我不懂，你能告訴我嗎？","chinese_trad_cloze":"這個___太難了，我不懂，你能告訴我嗎？","chinese_trad_answer":"問題","spanish_full":"Este problema es demasiado difícil, no lo entiendo, ¿puedes decírmelo?","spanish_cloze":"Este ___ es demasiado difícil, no lo entiendo, ¿puedes decírmelo?","spanish_answer":"problema","pinyin":"Zhège wèntí tài nán le, wǒ bù dǒng, nǐ néng gàosu wǒ ma?"},{"id":"hsk2_14","level":2,"module":"HSK2","chinese_simp_full":"今天是妹妹的生日，我们给她买了蛋糕和牛奶。","chinese_simp_cloze":"今天是妹妹的___，我们给她买了蛋糕和牛奶。","chinese_simp_answer":"生日","chinese_trad_full":"今天是妹妹的生日，我們給她買了蛋糕和牛奶。","chinese_trad_cloze":"今天是妹妹的___，我們給她買了蛋糕和牛奶。","chinese_trad_answer":"生日","spanish_full":"Hoy es el cumpleaños de mi hermana menor, le compramos pastel y leche.","spanish_cloze":"Hoy es el ___ de mi hermana menor, le compramos pastel y leche.","spanish_answer":"cumpleaños","pinyin":"Jīntiān shì mèimei de shēngrì, wǒmen gěi tā mǎile dàngāo hé niúnǎi."},{"id":"hsk2_15","level":2,"module":"HSK2","chinese_simp_full":"外面下雪了，天气非常冷，你要多穿点衣服。","chinese_simp_cloze":"外面下___了，天气非常冷，你要多穿点衣服。","chinese_simp_answer":"雪","chinese_trad_full":"外面下雪了，天氣非常冷，你要多穿點衣服。","chinese_trad_cloze":"外面下___了，天氣非常冷，你要多穿點衣服。","chinese_trad_answer":"雪","spanish_full":"Está nevando afuera, hace mucho frío, debes ponerte más ropa.","spanish_cloze":"Está ___ndo afuera, hace mucho frío, debes ponerte más ropa.","spanish_answer":"neva","pinyin":"Wàimiàn xià xuě le, tiānqì fēicháng lěng, nǐ yào duō chuān diǎn yīfu."},{"id":"hsk2_16","level":2,"module":"HSK2","chinese_simp_full":"我想介绍我的哥哥给大家认识，他是公司的经理。","chinese_simp_cloze":"我想___我的哥哥给大家认识，他是公司的经理。","chinese_simp_answer":"介绍","chinese_trad_full":"我想介紹我的哥哥給大家認識，他是公司的經理。","chinese_trad_cloze":"我想___我的哥哥給大家認識，他是公司的經理。","chinese_trad_answer":"介紹","spanish_full":"Quiero presentar a mi hermano mayor a todos, él es gerente de la empresa.","spanish_cloze":"Quiero ___ a mi hermano mayor a todos, él es gerente de la empresa.","spanish_answer":"presentar","pinyin":"Wǒ xiǎng jièshào wǒ de gēge gěi dàjiā rènshi, tā shì gōngsī de jīnglǐ."},{"id":"hsk2_17","level":2,"module":"HSK2","chinese_simp_full":"别着急，还有半个小时才开车呢，我们先喝杯咖啡吧。","chinese_simp_cloze":"___着急，还有半个小时才开车呢，我们先喝杯咖啡吧。","chinese_simp_answer":"别","chinese_trad_full":"別著急，還有半個小時才開車呢，我們先喝杯咖啡吧。","chinese_trad_cloze":"___著急，還有半個小時才開車呢，我們先喝杯咖啡吧。","chinese_trad_answer":"別","spanish_full":"No te apresures, faltan media hora para que salga el tren, tomemos un café primero.","spanish_cloze":"No te ___, faltan media hora para que salga el tren, tomemos un café primero.","spanish_answer":"apresures","pinyin":"Bié zháojí, hái yǒu bàn ge xiǎoshí cái kāichē ne, wǒmen xiān hē bēi kāfēi ba."},{"id":"hsk2_18","level":2,"module":"HSK2","chinese_simp_full":"那个服务员正在跟客人说话，他在介绍今天的特色菜。","chinese_simp_cloze":"那个___正在跟客人说话，他在介绍今天的特色菜。","chinese_simp_answer":"服务员","chinese_trad_full":"那個服務員正在跟客人說話，他在介紹今天的特色菜。","chinese_trad_cloze":"那個___正在跟客人說話，他在介紹今天的特色菜。","chinese_trad_answer":"服務員","spanish_full":"Ese camarero está hablando con los clientes, les está presentando el plato especial de hoy.","spanish_cloze":"Ese ___ está hablando con los clientes, les está presentando el plato especial de hoy.","spanish_answer":"camarero","pinyin":"Nàge fúwùyuán zhèngzài gēn kèrén shuōhuà, tā zài jièshào jīntiān de tèsè cài."},{"id":"hsk2_19","level":2,"module":"HSK2","chinese_simp_full":"我希望明年可以去中国旅游，看看长城和故宫。","chinese_simp_cloze":"我___明年可以去中国旅游，看看长城和故宫。","chinese_simp_answer":"希望","chinese_trad_full":"我希望明年可以去中國旅遊，看看長城和故宮。","chinese_trad_cloze":"我___明年可以去中國旅遊，看看長城和故宮。","chinese_trad_answer":"希望","spanish_full":"Espero poder viajar a China el próximo año para ver la Gran Muralla y el Palacio Imperial.","spanish_cloze":"___ poder viajar a China el próximo año para ver la Gran Muralla y el Palacio Imperial.","spanish_answer":"Espero","pinyin":"Wǒ xīwàng míngnián kěyǐ qù Zhōngguó lǚyóu, kànkan Chángchéng hé Gùgōng."},{"id":"hsk2_20","level":2,"module":"HSK2","chinese_simp_full":"你知道为什么他不来上课吗？因为他生病了。","chinese_simp_cloze":"你知道___他不来上课吗？因为他生病了。","chinese_simp_answer":"为什么","chinese_trad_full":"你知道為什麼他不來上課嗎？因為他生病了。","chinese_trad_cloze":"你知道___他不來上課嗎？因為他生病了。","chinese_trad_answer":"為什麼","spanish_full":"¿Sabes por qué no vino a clase? Porque se enfermó.","spanish_cloze":"¿Sabes ___ no vino a clase? Porque se enfermó.","spanish_answer":"por qué","pinyin":"Nǐ zhīdào wèishénme tā bù lái shàngkè ma? Yīnwèi tā shēngbìng le."}],
'HSK3': [{"id":"hsk3_01","level":3,"module":"HSK3","chinese_simp_full":"我的护照被弄丢了，我必须去大使馆补办。","chinese_simp_cloze":"我的护照___弄丢了，我必须去大使馆补办。","chinese_simp_answer":"被","chinese_trad_full":"我的護照被弄丟了，我必須去大使館補辦。","chinese_trad_cloze":"我的護照___弄丟了，我必須去大使館補辦。","chinese_trad_answer":"被","spanish_full":"Mi pasaporte fue perdido, debo ir a la embajada a reponerlo.","spanish_cloze":"Mi pasaporte ___ perdido, debo ir a la embajada a reponerlo.","spanish_answer":"fue","pinyin":"Wǒ de hùzhào bèi nòngdiū le, wǒ bìxū qù dàshǐguǎn bǔbàn."},{"id":"hsk3_02","level":3,"module":"HSK3","chinese_simp_full":"虽然这里的生活比较贵，但是我觉得很值得。","chinese_simp_cloze":"虽然这里的生活___贵，但是我觉得很值得。","chinese_simp_answer":"比较","chinese_trad_full":"雖然這裡的生活比較貴，但是我覺得很值得。","chinese_trad_cloze":"雖然這裡的生活___貴，但是我覺得很值得。","chinese_trad_answer":"比較","spanish_full":"Aunque la vida aquí es relativamente cara, creo que vale mucho la pena.","spanish_cloze":"Aunque la vida aquí es ___ cara, creo que vale mucho la pena.","spanish_answer":"relativamente","pinyin":"Suīrán zhèlǐ de shēnghuó bǐjiào guì, dànshì wǒ juéde hěn zhídé."},{"id":"hsk3_03","level":3,"module":"HSK3","chinese_simp_full":"除了上班以外，我还打算晚上去学西班牙语。","chinese_simp_cloze":"___上班以外，我还打算晚上去学西班牙语。","chinese_simp_answer":"除了","chinese_trad_full":"除了上班以外，我還打算晚上去學西班牙語。","chinese_trad_cloze":"___上班以外，我還打算晚上去學西班牙語。","chinese_trad_answer":"除了","spanish_full":"Además de trabajar, también planeo estudiar español por las noches.","spanish_cloze":"___ de trabajar, también planeo estudiar español por las noches.","spanish_answer":"Además","pinyin":"Chúle shàngbān yǐwài, wǒ hái dǎsuàn wǎnshang qù xué Xībānyáyǔ."},{"id":"hsk3_04","level":3,"module":"HSK3","chinese_simp_full":"最近天气变化很大，你要多注意身体，别感冒了。","chinese_simp_cloze":"最近天气___很大，你要多注意身体，别感冒了。","chinese_simp_answer":"变化","chinese_trad_full":"最近天氣變化很大，你要多注意身體，別感冒了。","chinese_trad_cloze":"最近天氣___很大，你要多注意身體，別感冒了。","chinese_trad_answer":"變化","spanish_full":"Últimamente el clima ha cambiado mucho, debes cuidar tu salud y no resfriarte.","spanish_cloze":"Últimamente el clima ha ___ mucho, debes cuidar tu salud y no resfriarte.","spanish_answer":"cambiado","pinyin":"Zuìjìn tiānqì biànhuà hěn dà, nǐ yào duō zhùyì shēntǐ, bié gǎnmào le."},{"id":"hsk3_05","level":3,"module":"HSK3","chinese_simp_full":"这个超市的东西不但便宜，而且非常新鲜。","chinese_simp_cloze":"这个超市的东西不但便宜，___非常新鲜。","chinese_simp_answer":"而且","chinese_trad_full":"這個超市的東西不但便宜，而且非常新鮮。","chinese_trad_cloze":"這個超市的東西不但便宜，___非常新鮮。","chinese_trad_answer":"而且","spanish_full":"Las cosas de este supermercado no solo son baratas, sino también muy frescas.","spanish_cloze":"Las cosas de este supermercado no solo son baratas, ___ también muy frescas.","spanish_answer":"sino","pinyin":"Zhège chāoshì de dōngxi búdàn piányi, érqiě fēicháng xīnxiān."},{"id":"hsk3_06","level":3,"module":"HSK3","chinese_simp_full":"如果你有问题，可以随时给经理打电话或者发邮件。","chinese_simp_cloze":"___你有问题，可以随时给经理打电话或者发邮件。","chinese_simp_answer":"如果","chinese_trad_full":"如果你有問題，可以隨時給經理打電話或者發郵件。","chinese_trad_cloze":"___你有問題，可以隨時給經理打電話或者發郵件。","chinese_trad_answer":"如果","spanish_full":"Si tienes algún problema, puedes llamar o enviar un correo al gerente en cualquier momento.","spanish_cloze":"___ tienes algún problema, puedes llamar o enviar un correo al gerente en cualquier momento.","spanish_answer":"Si","pinyin":"Rúguǒ nǐ yǒu wèntí, kěyǐ suíshí gěi jīnglǐ dǎ diànhuà huòzhě fā yóujiàn."},{"id":"hsk3_07","level":3,"module":"HSK3","chinese_simp_full":"他越说越快，我都听不清楚他在说什么了。","chinese_simp_cloze":"他___说越快，我都听不清楚他在说什么了。","chinese_simp_answer":"越","chinese_trad_full":"他越說越快，我都聽不清楚他在說什麼了。","chinese_trad_cloze":"他___說越快，我都聽不清楚他在說什麼了。","chinese_trad_answer":"越","spanish_full":"Cuanto más habla, más rápido lo hace; ya no entiendo nada de lo que dice.","spanish_cloze":"___ más habla, más rápido lo hace; ya no entiendo nada de lo que dice.","spanish_answer":"Cuanto","pinyin":"Tā yuè shuō yuè kuài, wǒ dōu tīng bu qīngchu tā zài shuō shénme le."},{"id":"hsk3_08","level":3,"module":"HSK3","chinese_simp_full":"为了找到更好的工作，我决定努力提高中文水平。","chinese_simp_cloze":"___找到更好的工作，我决定努力提高中文水平。","chinese_simp_answer":"为了","chinese_trad_full":"為了找到更好的工作，我決定努力提高中文水平。","chinese_trad_cloze":"___找到更好的工作，我決定努力提高中文水平。","chinese_trad_answer":"為了","spanish_full":"Para encontrar un mejor trabajo, decidí esforzarme por mejorar mi nivel de chino.","spanish_cloze":"___ encontrar un mejor trabajo, decidí esforzarme por mejorar mi nivel de chino.","spanish_answer":"Para","pinyin":"Wèile zhǎodào gèng hǎo de gōngzuò, wǒ juédìng nǔlì tígāo Zhōngwén shuǐpíng."},{"id":"hsk3_09","level":3,"module":"HSK3","chinese_simp_full":"刚才我在地铁上遇到了以前的邻居，我们聊了一会儿天。","chinese_simp_cloze":"___我在地铁上遇到了以前的邻居，我们聊了一会儿天。","chinese_simp_answer":"刚才","chinese_trad_full":"剛才我在地鐵上遇到了以前的鄰居，我們聊了一會兒天。","chinese_trad_cloze":"___我在地鐵上遇到了以前的鄰居，我們聊了一會兒天。","chinese_trad_answer":"剛才","spanish_full":"Hace un rato me encontré con mi antiguo vecino en el metro y charlamos un momento.","spanish_cloze":"___ me encontré con mi antiguo vecino en el metro y charlamos un momento.","spanish_answer":"Hace un rato","pinyin":"Gāngcái wǒ zài dìtiě shàng yùdào le yǐqián de línjū, wǒmen liáo le yíhuìr tiān."},{"id":"hsk3_10","level":3,"module":"HSK3","chinese_simp_full":"这本书是关于中国历史的，我觉得非常有意思。","chinese_simp_cloze":"这本书是___中国历史的，我觉得非常有意思。","chinese_simp_answer":"关于","chinese_trad_full":"這本書是關於中國歷史的，我覺得非常有意思。","chinese_trad_cloze":"這本書是___中國歷史的，我覺得非常有意思。","chinese_trad_answer":"關於","spanish_full":"Este libro trata sobre la historia de China, me parece muy interesante.","spanish_cloze":"Este libro trata ___ la historia de China, me parece muy interesante.","spanish_answer":"sobre","pinyin":"Zhè běn shū shì guānyú Zhōngguó lìshǐ de, wǒ juéde fēicháng yǒuyìsi."},{"id":"hsk3_11","level":3,"module":"HSK3","chinese_simp_full":"只有每天坚持锻炼，身体才会更健康。","chinese_simp_cloze":"___每天坚持锻炼，身体才会更健康。","chinese_simp_answer":"只有","chinese_trad_full":"只有每天堅持鍛煉，身體才會更健康。","chinese_trad_cloze":"___每天堅持鍛煉，身體才會更健康。","chinese_trad_answer":"只有","spanish_full":"Solo si haces ejercicio todos los días, tu cuerpo estará más sano.","spanish_cloze":"___ si haces ejercicio todos los días, tu cuerpo estará más sano.","spanish_answer":"Solo","pinyin":"Zhǐyǒu měitiān jiānchí duànliàn, shēntǐ cái huì gèng jiànkāng."},{"id":"hsk3_12","level":3,"module":"HSK3","chinese_simp_full":"请把行李箱放在电梯旁边，然后我们去办公室。","chinese_simp_cloze":"请把___放在电梯旁边，然后我们去办公室。","chinese_simp_answer":"行李箱","chinese_trad_full":"請把行李箱放在電梯旁邊，然後我們去辦公室。","chinese_trad_cloze":"請把___放在電梯旁邊，然後我們去辦公室。","chinese_trad_answer":"行李箱","spanish_full":"Por favor pon la maleta al lado del ascensor, luego vamos a la oficina.","spanish_cloze":"Por favor pon la ___ al lado del ascensor, luego vamos a la oficina.","spanish_answer":"maleta","pinyin":"Qǐng bǎ xínglǐxiāng fàng zài diàntī pángbiān, ránhòu wǒmen qù bàngōngshì."},{"id":"hsk3_13","level":3,"module":"HSK3","chinese_simp_full":"他对中国文化特别感兴趣，经常去图书馆看中文书。","chinese_simp_cloze":"他对中国文化___感兴趣，经常去图书馆看中文书。","chinese_simp_answer":"特别","chinese_trad_full":"他對中國文化特別感興趣，經常去圖書館看中文書。","chinese_trad_cloze":"他對中國文化___感興趣，經常去圖書館看中文書。","chinese_trad_answer":"特別","spanish_full":"Él está especialmente interesado en la cultura china, va a menudo a la biblioteca a leer libros en chino.","spanish_cloze":"Él está ___ interesado en la cultura china, va a menudo a la biblioteca a leer libros en chino.","spanish_answer":"especialmente","pinyin":"Tā duì Zhōngguó wénhuà tèbié gǎn xìngqù, jīngcháng qù túshūguǎn kàn Zhōngwén shū."},{"id":"hsk3_14","level":3,"module":"HSK3","chinese_simp_full":"因为路上堵车，所以我上班迟到了半个小时。","chinese_simp_cloze":"因为路上___，所以我上班迟到了半个小时。","chinese_simp_answer":"堵车","chinese_simp_answer_alt":"堵车了","chinese_trad_full":"因為路上堵車，所以我上班遲到了半個小時。","chinese_trad_cloze":"因為路上___，所以我上班遲到了半個小時。","chinese_trad_answer":"堵車","spanish_full":"Como había tráfico en el camino, llegué media hora tarde al trabajo.","spanish_cloze":"Como había ___ en el camino, llegué media hora tarde al trabajo.","spanish_answer":"tráfico","pinyin":"Yīnwèi lùshang dǔchē, suǒyǐ wǒ shàngbān chídào le bàn ge xiǎoshí."},{"id":"hsk3_15","level":3,"module":"HSK3","chinese_simp_full":"这件衬衫的颜色和那条裤子不太一样，你换一件吧。","chinese_simp_cloze":"这件衬衫的颜色和那条裤子不太___，你换一件吧。","chinese_simp_answer":"一样","chinese_trad_full":"這件襯衫的顏色和那條褲子不太一樣，你換一件吧。","chinese_trad_cloze":"這件襯衫的顏色和那條褲子不太___，你換一件吧。","chinese_trad_answer":"一樣","spanish_full":"El color de esta camisa no es igual al de esos pantalones, cámbiate uno.","spanish_cloze":"El color de esta camisa no es ___ al de esos pantalones, cámbiate uno.","spanish_answer":"igual","pinyin":"Zhè jiàn chènshān de yánsè hé nà tiáo kùzi bú tài yíyàng, nǐ huàn yí jiàn ba."},{"id":"hsk3_16","level":3,"module":"HSK3","chinese_simp_full":"我担心明天会下雨，所以我们还是带上伞比较好。","chinese_simp_cloze":"我___明天会下雨，所以我们还是带上伞比较好。","chinese_simp_answer":"担心","chinese_trad_full":"我擔心明天會下雨，所以我們還是帶上傘比較好。","chinese_trad_cloze":"我___明天會下雨，所以我們還是帶上傘比較好。","chinese_trad_answer":"擔心","spanish_full":"Me preocupa que mañana llueva, así que será mejor que llevemos paraguas.","spanish_cloze":"Me ___ que mañana llueva, así que será mejor que llevemos paraguas.","spanish_answer":"preocupa","pinyin":"Wǒ dānxīn míngtiān huì xià yǔ, suǒyǐ wǒmen háishi dài shàng sǎn bǐjiào hǎo."},{"id":"hsk3_17","level":3,"module":"HSK3","chinese_simp_full":"根据地图显示，银行就在公园的东边。","chinese_simp_cloze":"___地图显示，银行就在公园的东边。","chinese_simp_answer":"根据","chinese_trad_full":"根據地圖顯示，銀行就在公園的東邊。","chinese_trad_cloze":"___地圖顯示，銀行就在公園的東邊。","chinese_trad_answer":"根據","spanish_full":"Según muestra el mapa, el banco está justo al este del parque.","spanish_cloze":"___ muestra el mapa, el banco está justo al este del parque.","spanish_answer":"Según","pinyin":"Gēnjù dìtú xiǎnshì, yínháng jiù zài gōngyuán de dōngbian."},{"id":"hsk3_18","level":3,"module":"HSK3","chinese_simp_full":"他一边听音乐，一边打扫房间，看起来很轻松。","chinese_simp_cloze":"他___听音乐，一边打扫房间，看起来很轻松。","chinese_simp_answer":"一边","chinese_trad_full":"他一邊聽音樂，一邊打掃房間，看起來很輕鬆。","chinese_trad_cloze":"他___聽音樂，一邊打掃房間，看起來很輕鬆。","chinese_trad_answer":"一邊","spanish_full":"Él escucha música mientras limpia la habitación, se ve muy relajado.","spanish_cloze":"Él escucha música ___ limpia la habitación, se ve muy relajado.","spanish_answer":"mientras","pinyin":"Tā yìbiān tīng yīnyuè, yìbiān dǎsǎo fángjiān, kàn qǐlái hěn qīngsōng."},{"id":"hsk3_19","level":3,"module":"HSK3","chinese_simp_full":"虽然这个问题很难，但是只要努力，一定能解决。","chinese_simp_cloze":"虽然这个问题很难，但是只要___，一定能解决。","chinese_simp_answer":"努力","chinese_trad_full":"雖然這個問題很難，但是只要努力，一定能解決。","chinese_trad_cloze":"雖然這個問題很難，但是只要___，一定能解決。","chinese_trad_answer":"努力","spanish_full":"Aunque este problema es difícil, mientras te esfuerces, seguro podrás resolverlo.","spanish_cloze":"Aunque este problema es difícil, mientras te ___, seguro podrás resolverlo.","spanish_answer":"esfuerces","pinyin":"Suīrán zhège wèntí hěn nán, dànshì zhǐyào nǔlì, yídìng néng jiějué."},{"id":"hsk3_20","level":3,"module":"HSK3","chinese_simp_full":"请帮我拿一下那个瓶子，它太高了我够不着。","chinese_simp_cloze":"请帮我___一下那个瓶子，它太高了我够不着。","chinese_simp_answer":"拿","chinese_trad_full":"請幫我拿一下那個瓶子，它太高了我夠不著。","chinese_trad_cloze":"請幫我___一下那個瓶子，它太高了我夠不著。","chinese_trad_answer":"拿","spanish_full":"Por favor ayúdame a tomar esa botella, está demasiado alta y no alcanzo.","spanish_cloze":"Por favor ayúdame a ___ esa botella, está demasiado alta y no alcanzo.","spanish_answer":"tomar","pinyin":"Qǐng bāng wǒ ná yíxià nàge píngzi, tā tài gāo le wǒ gòu bu zháo."},{"id":"hsk3_21","level":3,"module":"HSK3","chinese_simp_full":"我对阿根廷的历史和文化越来越感兴趣了。","chinese_simp_cloze":"我对阿根廷的历史和文化___感兴趣了。","chinese_simp_answer":"越来越","chinese_trad_full":"我對阿根廷的歷史和文化越來越感興趣了。","chinese_trad_cloze":"我對阿根廷的歷史和文化___感興趣了。","chinese_trad_answer":"越來越","spanish_full":"Cada vez estoy más interesado en la historia y cultura de Argentina.","spanish_cloze":"___ estoy más interesado en la historia y cultura de Argentina.","spanish_answer":"Cada vez","pinyin":"Wǒ duì Āgēntíng de lìshǐ hé wénhuà yuè lái yuè gǎn xìngqù le."},{"id":"hsk3_22","level":3,"module":"HSK3","chinese_simp_full":"昨天我去银行换了钱，准备周末去旅游。","chinese_simp_cloze":"昨天我去银行___了钱，准备周末去旅游。","chinese_simp_answer":"换","chinese_trad_full":"昨天我去銀行換了錢，準備週末去旅遊。","chinese_trad_cloze":"昨天我去銀行___了錢，準備週末去旅遊。","chinese_trad_answer":"換","spanish_full":"Ayer fui al banco a cambiar dinero, me preparo para viajar el fin de semana.","spanish_cloze":"Ayer fui al banco a ___ dinero, me preparo para viajar el fin de semana.","spanish_answer":"cambiar","pinyin":"Zuótiān wǒ qù yínháng huàn le qián, zhǔnbèi zhōumò qù lǚyóu."},{"id":"hsk3_23","level":3,"module":"HSK3","chinese_simp_full":"你觉得这个办法怎么样？能不能解决这个问题？","chinese_simp_cloze":"你觉得这个___怎么样？能不能解决这个问题？","chinese_simp_answer":"办法","chinese_trad_full":"你覺得這個辦法怎麼樣？能不能解決這個問題？","chinese_trad_cloze":"你覺得這個___怎麼樣？能不能解決這個問題？","chinese_trad_answer":"辦法","spanish_full":"¿Qué te parece este método? ¿Podrá resolver este problema?","spanish_cloze":"¿Qué te parece este ___? ¿Podrá resolver este problema?","spanish_answer":"método","pinyin":"Nǐ juéde zhège bànfǎ zěnme yàng? Néng bu néng jiějué zhège wèntí?"},{"id":"hsk3_24","level":3,"module":"HSK3","chinese_simp_full":"他本来打算坐飞机，后来因为天气不好改成了火车。","chinese_simp_cloze":"他本来打算坐飞机，___因为天气不好改成了火车。","chinese_simp_answer":"后来","chinese_trad_full":"他本來打算坐飛機，後來因為天氣不好改成了火車。","chinese_trad_cloze":"他本來打算坐飛機，___因為天氣不好改成了火車。","chinese_trad_answer":"後來","spanish_full":"Originalmente planeaba tomar el avión, pero después cambió al tren por el mal clima.","spanish_cloze":"Originalmente planeaba tomar el avión, pero ___ cambió al tren por el mal clima.","spanish_answer":"después","pinyin":"Tā běnlái dǎsuàn zuò fēijī, hòulái yīnwèi tiānqì bù hǎo gǎichéng le huǒchē."},{"id":"hsk3_25","level":3,"module":"HSK3","chinese_simp_full":"这家饭馆的菜太辣了，我吃了一点儿就饱了。","chinese_simp_cloze":"这家饭馆的菜太辣了，我吃了___就饱了。","chinese_simp_answer":"一点儿","chinese_trad_full":"這家飯館的菜太辣了，我吃了一點兒就飽了。","chinese_trad_cloze":"這家飯館的菜太辣了，我吃了___就飽了。","chinese_trad_answer":"一點兒","spanish_full":"La comida de este restaurante es demasiado picante, comí un poco y ya estoy lleno.","spanish_cloze":"La comida de este restaurante es demasiado picante, comí ___ y ya estoy lleno.","spanish_answer":"un poco","pinyin":"Zhè jiā fànguǎn de cài tài là le, wǒ chī le yìdiǎnr jiù bǎo le."},{"id":"hsk3_26","level":3,"module":"HSK3","chinese_simp_full":"请你放心，我一定会按时完成任务的。","chinese_simp_cloze":"请你___，我一定会按时完成任务的。","chinese_simp_answer":"放心","chinese_trad_full":"請你放心，我一定會按時完成任務的。","chinese_trad_cloze":"請你___，我一定會按時完成任務的。","chinese_trad_answer":"放心","spanish_full":"Por favor descuida, sin falta completaré la tarea a tiempo.","spanish_cloze":"Por favor ___, sin falta completaré la tarea a tiempo.","spanish_answer":"descuida","pinyin":"Qǐng nǐ fàngxīn, wǒ yídìng huì ànshí wánchéng rènwu de."},{"id":"hsk3_27","level":3,"module":"HSK3","chinese_simp_full":"除了英语之外，他还懂法语和日语，真聪明！","chinese_simp_cloze":"除了英语之外，他还___法语和日语，真聪明！","chinese_simp_answer":"懂","chinese_trad_full":"除了英語之外，他還懂法語和日語，真聰明！","chinese_trad_cloze":"除了英語之外，他還___法語和日語，真聰明！","chinese_trad_answer":"懂","spanish_full":"Además de inglés, él entiende francés y japonés, ¡qué inteligente!","spanish_cloze":"Además de inglés, él ___ francés y japonés, ¡qué inteligente!","spanish_answer":"entiende","pinyin":"Chúle Yīngyǔ zhīwài, tā hái dǒng Fǎyǔ hé Rìyǔ, zhēn cōngming!"},{"id":"hsk3_28","level":3,"module":"HSK3","chinese_simp_full":"我发现这里的空气比北京干净多了，环境很好。","chinese_simp_cloze":"我___这里的空气比北京干净多了，环境很好。","chinese_simp_answer":"发现","chinese_trad_full":"我發現這裡的空氣比北京乾淨多了，環境很好。","chinese_trad_cloze":"我___這裡的空氣比北京乾淨多了，環境很好。","chinese_trad_answer":"發現","spanish_full":"Descubrí que el aire aquí es mucho más limpio que en Beijing, el ambiente es excelente.","spanish_cloze":"___ que el aire aquí es mucho más limpio que en Beijing, el ambiente es excelente.","spanish_answer":"Descubrí","pinyin":"Wǒ fāxiàn zhèlǐ de kōngqì bǐ Běijīng gānjìng duō le, huánjìng hěn hǎo."},{"id":"hsk3_29","level":3,"module":"HSK3","chinese_simp_full":"虽然我很累，但是为了照顾生病的妈妈，我还是坚持工作。","chinese_simp_cloze":"虽然我很累，但是为了___生病的妈妈，我还是坚持工作。","chinese_simp_answer":"照顾","chinese_trad_full":"雖然我很累，但是為了照顧生病的媽媽，我還是堅持工作。","chinese_trad_cloze":"雖然我很累，但是為了___生病的媽媽，我還是堅持工作。","chinese_trad_answer":"照顧","spanish_full":"Aunque estoy muy cansado, para cuidar a mi mamá enferma, sigo trabajando.","spanish_cloze":"Aunque estoy muy cansado, para ___ a mi mamá enferma, sigo trabajando.","spanish_answer":"cuidar","pinyin":"Suīrán wǒ hěn lèi, dànshì wèile zhàogù shēngbìng de māma, wǒ háishi jiānchí gōngzuò."},{"id":"hsk3_30","level":3,"module":"HSK3","chinese_simp_full":"终于完成了所有的作业，我可以休息一下看电视了。","chinese_simp_cloze":"___完成了所有的作业，我可以休息一下看电视了。","chinese_simp_answer":"终于","chinese_trad_full":"終於完成了所有的作業，我可以休息一下看電視了。","chinese_trad_cloze":"___完成了所有的作業，我可以休息一下看電視了。","chinese_trad_answer":"終於","spanish_full":"Por fin terminé toda la tarea, puedo descansar un rato y ver televisión.","spanish_cloze":"___ terminé toda la tarea, puedo descansar un rato y ver televisión.","spanish_answer":"Por fin","pinyin":"Zhōngyú wánchéng le suǒyǒu de zuòyè, wǒ kěyǐ xiūxi yíxià kàn diànshì le."}],
'HSK4': [{"id":"hsk4_01","level":4,"module":"HSK4","chinese_simp_full":"尽管签证申请过程非常复杂，但我还是决定亲自去大使馆办理。","chinese_simp_cloze":"___签证申请过程非常复杂，但我还是决定亲自去大使馆办理。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管簽證申請過程非常複雜，但我還是決定親自去大使館辦理。","chinese_trad_cloze":"___簽證申請過程非常複雜，但我還是決定親自去大使館辦理。","chinese_trad_answer":"儘管","spanish_full":"Aunque el proceso de solicitud de visa es muy complicado, decidí ir personalmente a la embajada a tramitarla.","spanish_cloze":"___ el proceso de solicitud de visa es muy complicado, decidí ir personalmente a la embajada a tramitarla.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn qiānzhèng shēnqǐng guòchéng fēicháng fùzá, dàn wǒ háishi juédìng qīnzì qù dàshǐguǎn bànlǐ."},{"id":"hsk4_02","level":4,"module":"HSK4","chinese_simp_full":"由于最近经济不景气，公司不得不减少员工数量，甚至取消了年终奖。","chinese_simp_cloze":"___最近经济不景气，公司不得不减少员工数量，甚至取消了年终奖。","chinese_simp_answer":"由于","chinese_trad_full":"由於最近經濟不景氣，公司不得不減少員工數量，甚至取消了年終獎。","chinese_trad_cloze":"___最近經濟不景氣，公司不得不減少員工數量，甚至取消了年終獎。","chinese_trad_answer":"由於","spanish_full":"Debido a la recesión económica reciente, la empresa tuvo que reducir el número de empleados e incluso canceló el bono anual.","spanish_cloze":"___ a la recesión económica reciente, la empresa tuvo que reducir el número de empleados e incluso canceló el bono anual.","spanish_answer":"Debido","pinyin":"Yóuyú zuìjìn jīngjì bù jǐngqì, gōngsī bùdébù jiǎnshǎo yuángōng shùliàng, shènzhì qǔxiāo le niánzhōngjiǎng."},{"id":"hsk4_03","level":4,"module":"HSK4","chinese_simp_full":"无论遇到什么困难，我们都应该保持积极的态度，勇敢地面对挑战。","chinese_simp_cloze":"___遇到什么困难，我们都应该保持积极的态度，勇敢地面对挑战。","chinese_simp_answer":"无论","chinese_trad_full":"無論遇到什麼困難，我們都應該保持積極的態度，勇敢地面對挑戰。","chinese_trad_cloze":"___遇到什麼困難，我們都應該保持積極的態度，勇敢地面對挑戰。","chinese_trad_answer":"無論","spanish_full":"Sin importar qué dificultades encontremos, debemos mantener una actitud positiva y enfrentar los desafíos con valentía.","spanish_cloze":"___ qué dificultades encontremos, debemos mantener una actitud positiva y enfrentar los desafíos con valentía.","spanish_answer":"Sin importar","pinyin":"Wúlùn yù dào shénme kùnnan, wǒmen dōu yīnggāi bǎochí jījí de tàidù, yǒnggǎn de miànduì tiǎozhàn."},{"id":"hsk4_04","level":4,"module":"HSK4","chinese_simp_full":"他不仅精通中文和西班牙语，还对阿根廷的历史文化有深刻的理解。","chinese_simp_cloze":"他不仅精通中文和西班牙语，还___阿根廷的历史文化有深刻的理解。","chinese_simp_answer":"对","chinese_trad_full":"他不僅精通中文和西班牙語，還對阿根廷的歷史文化有深刻的理解。","chinese_trad_cloze":"他不僅精通中文和西班牙語，還___阿根廷的歷史文化有深刻的理解。","chinese_trad_answer":"對","spanish_full":"Él no solo domina el chino y el español, sino que también tiene una comprensión profunda de la historia y cultura argentina.","spanish_cloze":"Él no solo domina el chino y el español, sino que también ___ una comprensión profunda de la historia y cultura argentina.","spanish_answer":"tiene","pinyin":"Tā bùjǐn jīngtōng Zhōngwén hé Xībānyáyǔ, hái duì Āgēntíng de lìshǐ wénhuà yǒu shēnkè de lǐjiě."},{"id":"hsk4_05","level":4,"module":"HSK4","chinese_simp_full":"为了避免误会，我觉得我们有必要坐下来好好商量一下具体的合作细节。","chinese_simp_cloze":"为了___误会，我觉得我们有必要坐下来好好商量一下具体的合作细节。","chinese_simp_answer":"避免","chinese_trad_full":"為了避免誤會，我覺得我們有必要坐下來好好商量一下具體的合作細節。","chinese_trad_cloze":"為了___誤會，我覺得我們有必要坐下來好好商量一下具體的合作細節。","chinese_trad_answer":"避免","spanish_full":"Para evitar malentendidos, creo que es necesario que nos sentemos a discutir bien los detalles específicos de la cooperación.","spanish_cloze":"Para ___ malentendidos, creo que es necesario que nos sentemos a discutir bien los detalles específicos de la cooperación.","spanish_answer":"evitar","pinyin":"Wèile bìmiǎn wùhuì, wǒ juéde wǒmen yǒu bìyào zuò xiàlái hǎohǎo shāngliang yíxià jùtǐ de hézuò xìjié."},{"id":"hsk4_06","level":4,"module":"HSK4","chinese_simp_full":"虽然他已经在这座城市生活了十年，但仍然觉得自己没有完全适应这里的生活节奏。","chinese_simp_cloze":"虽然他已经在这座城市生活了十年，但仍然觉得自己没有完全___这里的生活节奏。","chinese_simp_answer":"适应","chinese_trad_full":"雖然他已經在這座城市生活了十年，但仍然覺得自己沒有完全適應這裡的生活節奏。","chinese_trad_cloze":"雖然他已經在這座城市生活了十年，但仍然覺得自己沒有完全___這裡的生活節奏。","chinese_trad_answer":"適應","spanish_full":"Aunque ya lleva diez años viviendo en esta ciudad, todavía siente que no se ha adaptado completamente al ritmo de vida local.","spanish_cloze":"Aunque ya lleva diez años viviendo en esta ciudad, todavía siente que no se ha ___ completamente al ritmo de vida local.","spanish_answer":"adaptado","pinyin":"Suīrán tā yǐjīng zài zhè zuò chéngshì shēnghuó le shí nián, dàn réngrán juéde zìjǐ méiyǒu wánquán shìyìng zhèlǐ de shēnghuó jiézòu."},{"id":"hsk4_07","level":4,"module":"HSK4","chinese_simp_full":"根据最新的调查结果显示，超过百分之六十的外国投资者对当地的市场环境表示满意。","chinese_simp_cloze":"___最新的调查结果显示，超过百分之六十的外国投资者对当地的市场环境表示满意。","chinese_simp_answer":"根据","chinese_trad_full":"根據最新的調查結果顯示，超過百分之六十的外國投資者對當地的市場環境表示滿意。","chinese_trad_cloze":"___最新的調查結果顯示，超過百分之六十的外國投資者對當地的市場環境表示滿意。","chinese_trad_answer":"根據","spanish_full":"Según los resultados de la última encuesta, más del sesenta por ciento de los inversores extranjeros están satisfechos con el entorno del mercado local.","spanish_cloze":"___ los resultados de la última encuesta, más del sesenta por ciento de los inversores extranjeros están satisfechos con el entorno del mercado local.","spanish_answer":"Según","pinyin":"Gēnjù zuìxīn de diàochá jiéguǒ xiǎnshì, chāoguò bǎifēnzhī liùshí de wàiguó tóuzīzhě duì dāngdì de shìchǎng huánjìng biǎoshì mǎnyì."},{"id":"hsk4_08","level":4,"module":"HSK4","chinese_simp_full":"既然你已经决定了要出国留学，就应该提前做好准备，而不是到时候手忙脚乱。","chinese_simp_cloze":"___你已经决定了要出国留学，就应该提前做好准备，而不是到时候手忙脚乱。","chinese_simp_answer":"既然","chinese_trad_full":"既然你已經決定了要出國留學，就應該提前做好準備，而不是到時候手忙腳亂。","chinese_trad_cloze":"___你已經決定了要出國留學，就應該提前做好準備，而不是到時候手忙腳亂。","chinese_trad_answer":"既然","spanish_full":"Ya que has decidido estudiar en el extranjero, deberías prepararte con anticipación en lugar de entrar en pánico cuando llegue el momento.","spanish_cloze":"___ que has decidido estudiar en el extranjero, deberías prepararte con anticipación en lugar de entrar en pánico cuando llegue el momento.","spanish_answer":"Ya","pinyin":"Jìrán nǐ yǐjīng juédìng le yào chūguó liúxué, jiù yīnggāi tíqián zuò hǎo zhǔnbèi, ér búshì dào shíhou shǒumángjiǎoluàn."},{"id":"hsk4_09","level":4,"module":"HSK4","chinese_simp_full":"随着互联网技术的飞速发展，人们获取信息的方式发生了巨大的变化。","chinese_simp_cloze":"___互联网技术的飞速发展，人们获取信息的方式发生了巨大的变化。","chinese_simp_answer":"随着","chinese_trad_full":"隨著互聯網技術的飛速發展，人們獲取信息的方式發生了巨大的變化。","chinese_trad_cloze":"___互聯網技術的飛速發展，人們獲取信息的方式發生了巨大的變化。","chinese_trad_answer":"隨著","spanish_full":"Con el rápido desarrollo de la tecnología de Internet, la forma en que las personas obtienen información ha experimentado cambios enormes.","spanish_cloze":"___ el rápido desarrollo de la tecnología de Internet, la forma en que las personas obtienen información ha experimentado cambios enormes.","spanish_answer":"Con","pinyin":"Suízhe hùliánwǎng jìshù de fēisù fāzhǎn, rénmen huòqǔ xìnxī de fāngshì fāshēng le jùdà de biànhuà."},{"id":"hsk4_10","level":4,"module":"HSK4","chinese_simp_full":"他之所以能成功，主要是因为他拥有坚定的信念和不懈的努力。","chinese_simp_cloze":"他之所以能成功，主要是因为___拥有坚定的信念和不懈的努力。","chinese_simp_answer":"他","chinese_trad_full":"他之所以能成功，主要是因為他擁有堅定的信念和不懈的努力。","chinese_trad_cloze":"他之所以能成功，主要是因為___擁有堅定的信念和不懈的努力。","chinese_trad_answer":"他","spanish_full":"La razón por la que pudo tener éxito se debe principalmente a que él posee una convicción firme y un esfuerzo incansable.","spanish_cloze":"La razón por la que pudo tener éxito se debe principalmente a que ___ posee una convicción firme y un esfuerzo incansable.","spanish_answer":"él","pinyin":"Tā zhī suǒyǐ néng chénggōng, zhǔyào shì yīnwèi tā yōngyǒu jiāndìng de xìnniàn hé búxiè de nǔlì."},{"id":"hsk4_11","level":4,"module":"HSK4","chinese_simp_full":"不管天气多么恶劣，邮递员总是按时把信件送到每一个居民手中。","chinese_simp_cloze":"___天气多么恶劣，邮递员总是按时把信件送到每一个居民手中。","chinese_simp_answer":"不管","chinese_trad_full":"不管天氣多麼惡劣，郵遞員總是按時把信件送到每一個居民手中。","chinese_trad_cloze":"___天氣多麼惡劣，郵遞員總是按時把信件送到每一個居民手中。","chinese_trad_answer":"不管","spanish_full":"Sin importar cuán severo sea el clima, el cartero siempre entrega las cartas a tiempo en manos de cada residente.","spanish_cloze":"___ cuán severo sea el clima, el cartero siempre entrega las cartas a tiempo en manos de cada residente.","spanish_answer":"Sin importar","pinyin":"Bùguǎn tiānqì duōme èliè, yóudìyuán zǒngshì ànshí bǎ xìnjiàn sòng dào měi yí ge jūmín shǒuzhōng."},{"id":"hsk4_12","level":4,"module":"HSK4","chinese_simp_full":"与其抱怨环境不好，不如主动去寻找解决问题的方法，这样才能真正进步。","chinese_simp_cloze":"___抱怨环境不好，不如主动去寻找解决问题的方法，这样才能真正进步。","chinese_simp_answer":"与其","chinese_trad_full":"與其抱怨環境不好，不如主動去尋找解決問題的方法，這樣才能真正進步。","chinese_trad_cloze":"___抱怨環境不好，不如主動去尋找解決問題的方法，這樣才能真正進步。","chinese_trad_answer":"與其","spanish_full":"En lugar de quejarse de que el entorno no es bueno, es mejor tomar la iniciativa de buscar soluciones; solo así se puede progresar de verdad.","spanish_cloze":"___ de quejarse de que el entorno no es bueno, es mejor tomar la iniciativa de buscar soluciones; solo así se puede progresar de verdad.","spanish_answer":"En lugar","pinyin":"Yǔqí bàoyuàn huánjìng bù hǎo, bùrú zhǔdòng qù xúnzhǎo jiějué wèntí de fāngfǎ, zhèyàng cái néng zhēnzhèng jìnbù."},{"id":"hsk4_13","level":4,"module":"HSK4","chinese_simp_full":"这个项目的成功实施，离不开团队成员之间的相互信任和密切配合。","chinese_simp_cloze":"这个项目的成功实施，离不开团队成员之间的___信任和密切配合。","chinese_simp_answer":"相互","chinese_trad_full":"這個項目的成功實施，離不開團隊成員之間的相互信任和密切配合。","chinese_trad_cloze":"這個項目的成功實施，離不開團隊成員之間的___信任和密切配合。","chinese_trad_answer":"相互","spanish_full":"La implementación exitosa de este proyecto no habría sido posible sin la confianza mutua y la estrecha colaboración entre los miembros del equipo.","spanish_cloze":"La implementación exitosa de este proyecto no habría sido posible sin la confianza ___ y la estrecha colaboración entre los miembros del equipo.","spanish_answer":"mutua","pinyin":"Zhège xiàngmù de chénggōng shíshī, lí bu kāi tuánduì chéngyuán zhījiān de xiānghù xìnrèn hé mìqiè pèihé."},{"id":"hsk4_14","level":4,"module":"HSK4","chinese_simp_full":"尽管他已经很累了，但为了完成这项紧急任务，他仍然坚持工作到深夜。","chinese_simp_cloze":"___他已经很累了，但为了完成这项紧急任务，他仍然坚持工作到深夜。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管他已經很累了，但為了完成這項緊急任務，他仍然堅持工作到深夜。","chinese_trad_cloze":"___他已經很累了，但為了完成這項緊急任務，他仍然堅持工作到深夜。","chinese_trad_answer":"儘管","spanish_full":"Aunque ya estaba muy cansado, para completar esta tarea urgente, insistió en trabajar hasta altas horas de la noche.","spanish_cloze":"___ ya estaba muy cansado, para completar esta tarea urgente, insistió en trabajar hasta altas horas de la noche.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn tā yǐjīng hěn lèi le, dàn wèile wánchéng zhè xiàng jǐnjí rènwu, tā réngrán jiānchí gōngzuò dào shēnyè."},{"id":"hsk4_15","level":4,"module":"HSK4","chinese_simp_full":"对于这个问题，专家们持有不同的看法，目前还没有一个统一的解决方案。","chinese_simp_cloze":"___这个问题，专家们持有不同的看法，目前还没有一个统一的解决方案。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個問題，專家們持有不同的看法，目前還沒有一個統一的解決方案。","chinese_trad_cloze":"___這個問題，專家們持有不同的看法，目前還沒有一個統一的解決方案。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este problema, los expertos tienen opiniones diferentes y actualmente no existe una solución unificada.","spanish_cloze":"___ este problema, los expertos tienen opiniones diferentes y actualmente no existe una solución unificada.","spanish_answer":"Con respecto a","pinyin":"Duìyú zhège wèntí, zhuānjiāmen chíyǒu bùtóng de kànfǎ, mùqián hái méiyǒu yí ge tǒngyī de jiějué fāng'àn."},{"id":"hsk4_16","level":4,"module":"HSK4","chinese_simp_full":"他之所以拒绝那份高薪工作，是因为他觉得那不符合自己的职业理想。","chinese_simp_cloze":"他之所以拒绝那份高薪工作，是因为他觉得那不___自己的职业理想。","chinese_simp_answer":"符合","chinese_trad_full":"他之所以拒絕那份高薪工作，是因為他覺得那不符合自己的職業理想。","chinese_trad_cloze":"他之所以拒絕那份高薪工作，是因為他覺得那不___自己的職業理想。","chinese_trad_answer":"符合","spanish_full":"La razón por la que rechazó ese trabajo bien remunerado es porque sintió que no se ajustaba a sus ideales profesionales.","spanish_cloze":"La razón por la que rechazó ese trabajo bien remunerado es porque sintió que no se ___ a sus ideales profesionales.","spanish_answer":"ajustaba","pinyin":"Tā zhī suǒyǐ jùjué nà fèn gāoxīn gōngzuò, shì yīnwèi tā juéde nà bù fúhé zìjǐ de zhíyè lǐxiǎng."},{"id":"hsk4_17","level":4,"module":"HSK4","chinese_simp_full":"只要大家齐心协力，就没有克服不了的困难，也没有实现不了的目标。","chinese_simp_cloze":"___大家齐心协力，就没有克服不了的困难，也没有实现不了的目标。","chinese_simp_answer":"只要","chinese_trad_full":"只要大家齊心協力，就沒有克服不了的困難，也沒有實現不了的目標。","chinese_trad_cloze":"___大家齊心協力，就沒有克服不了的困難，也沒有實現不了的目標。","chinese_trad_answer":"只要","spanish_full":"Siempre que todos trabajen juntos con un mismo corazón, no habrá dificultad que no pueda superarse ni objetivo que no pueda alcanzarse.","spanish_cloze":"___ todos trabajen juntos con un mismo corazón, no habrá dificultad que no pueda superarse ni objetivo que no pueda alcanzarse.","spanish_answer":"Siempre que","pinyin":"Zhǐyào dàjiā qíxīnxiélì, jiù méiyǒu kèfú bu liǎo de kùnnan, yě méiyǒu shíxiàn bu liǎo de mùbiāo."},{"id":"hsk4_18","level":4,"module":"HSK4","chinese_simp_full":"这次会议的主要目的是讨论如何进一步提高产品质量，从而增强市场竞争力。","chinese_simp_cloze":"这次会议的主要目的是讨论如何进一步___产品质量，从而增强市场竞争力。","chinese_simp_answer":"提高","chinese_trad_full":"這次會議的主要目的是討論如何進一步提高產品質量，從而增強市場競爭力。","chinese_trad_cloze":"這次會議的主要目的是討論如何進一步___產品質量，從而增強市場競爭力。","chinese_trad_answer":"提高","spanish_full":"El propósito principal de esta reunión es discutir cómo mejorar aún más la calidad del producto y, por lo tanto, fortalecer la competitividad del mercado.","spanish_cloze":"El propósito principal de esta reunión es discutir cómo ___ aún más la calidad del producto y, por lo tanto, fortalecer la competitividad del mercado.","spanish_answer":"mejorar","pinyin":"Zhè cì huìyì de zhǔyào mùdì shì tǎolùn rúhé jìnyíbù tígāo chǎnpǐn zhìliàng, cóng'ér zēngqiáng shìchǎng jìngzhēnglì."},{"id":"hsk4_19","level":4,"module":"HSK4","chinese_simp_full":"即使面临巨大的压力，他也从未放弃过自己的梦想，始终坚持到底。","chinese_simp_cloze":"___面临巨大的压力，他也从未放弃过自己的梦想，始终坚持到底。","chinese_simp_answer":"即使","chinese_trad_full":"即使面臨巨大的壓力，他也從未放棄過自己的夢想，始終堅持到底。","chinese_trad_cloze":"___面臨巨大的壓力，他也從未放棄過自己的夢想，始終堅持到底。","chinese_trad_answer":"即使","spanish_full":"Incluso enfrentando una presión enorme, nunca abandonó sus sueños y siempre persistió hasta el final.","spanish_cloze":"___ enfrentando una presión enorme, nunca abandonó sus sueños y siempre persistió hasta el final.","spanish_answer":"Incluso","pinyin":"Jíshǐ miànlín jùdà de yālì, tā yě cóngwèi fàngqì guò zìjǐ de mèngxiǎng, shǐzhōng jiānchí dàodǐ."},{"id":"hsk4_20","level":4,"module":"HSK4","chinese_simp_full":"通过不断的努力和学习，他终于从一个普通员工成长为公司的核心管理人员。","chinese_simp_cloze":"___不断的努力和学习，他终于从一个普通员工成长为公司的核心管理人员。","chinese_simp_answer":"通过","chinese_trad_full":"通過不斷的努力和學習，他終於從一個普通員工成長為公司的核心管理人員。","chinese_trad_cloze":"___不斷的努力和學習，他終於從一個普通員工成長為公司的核心管理人員。","chinese_trad_answer":"通過","spanish_full":"Mediante esfuerzos y aprendizaje constantes, finalmente creció de un empleado ordinario a convertirse en personal directivo clave de la empresa.","spanish_cloze":"___ esfuerzos y aprendizaje constantes, finalmente creció de un empleado ordinario a convertirse en personal directivo clave de la empresa.","spanish_answer":"Mediante","pinyin":"Tōngguò búduàn de nǔlì hé xuéxí, tā zhōngyú cóng yí ge pǔtōng yuángōng chéngzhǎng wéi gōngsī de héxīn guǎnlǐ rényuán."},{"id":"hsk4_21","level":4,"module":"HSK4","chinese_simp_full":"考虑到他的实际情况，我们决定适当降低对他的要求，给他更多的适应时间。","chinese_simp_cloze":"___他的实际情况，我们决定适当降低对他的要求，给他更多的适应时间。","chinese_simp_answer":"考虑到","chinese_trad_full":"考慮到他的實際情況，我們決定適當降低對他的要求，給他更多的適應時間。","chinese_trad_cloze":"___他的實際情況，我們決定適當降低對他的要求，給他更多的適應時間。","chinese_trad_answer":"考慮到","spanish_full":"Teniendo en cuenta su situación real, decidimos reducir apropiadamente nuestras exigencias hacia él y darle más tiempo para adaptarse.","spanish_cloze":"___ su situación real, decidimos reducir apropiadamente nuestras exigencias hacia él y darle más tiempo para adaptarse.","spanish_answer":"Teniendo en cuenta","pinyin":"Kǎolǜ dào tā de shíjì qíngkuàng, wǒmen juédìng shìdàng jiàngdī duì tā de yāoqiú, gěi tā gèng duō de shìyìng shíjiān."},{"id":"hsk4_22","level":4,"module":"HSK4","chinese_simp_full":"这个问题不仅关系到个人的利益，更影响到整个团队的声誉和未来发展方向。","chinese_simp_cloze":"这个问题不仅关系到个人的利益，___影响到整个团队的声誉和未来发展方向。","chinese_simp_answer":"更","chinese_trad_full":"這個問題不僅關係到個人的利益，更影響到整個團隊的聲譽和未來發展方向。","chinese_trad_cloze":"這個問題不僅關係到個人的利益，___影響到整個團隊的聲譽和未來發展方向。","chinese_trad_answer":"更","spanish_full":"Este problema no solo afecta los intereses personales, sino que además influye en la reputación de todo el equipo y su dirección futura de desarrollo.","spanish_cloze":"Este problema no solo afecta los intereses personales, sino que ___ influye en la reputación de todo el equipo y su dirección futura de desarrollo.","spanish_answer":"además","pinyin":"Zhège wèntí bùjǐn guānxì dào gèrén de lìyì, gèng yǐngxiǎng dào zhěngge tuánduì de shēngyù hé wèilái fāzhǎn fāngxiàng."},{"id":"hsk4_23","level":4,"module":"HSK4","chinese_simp_full":"与其在这里浪费时间争论谁对谁错，不如赶紧想办法解决眼前的问题。","chinese_simp_cloze":"___在这里浪费时间争论谁对谁错，不如赶紧想办法解决眼前的问题。","chinese_simp_answer":"与其","chinese_trad_full":"與其在這裡浪費時間爭論誰對誰錯，不如趕緊想辦法解決眼前的問題。","chinese_trad_cloze":"___在這裡浪費時間爭論誰對誰錯，不如趕緊想辦法解決眼前的問題。","chinese_trad_answer":"與其","spanish_full":"En lugar de perder el tiempo aquí discutiendo quién tiene razón y quién no, sería mejor pensar rápidamente en una forma de resolver el problema inmediato.","spanish_cloze":"___ de perder el tiempo aquí discutiendo quién tiene razón y quién no, sería mejor pensar rápidamente en una forma de resolver el problema inmediato.","spanish_answer":"En lugar","pinyin":"Yǔqí zài zhèlǐ làngfèi shíjiān zhēnglùn shuí duì shuí cuò, bùrú gǎnjǐn xiǎng bànfǎ jiějué yǎnqián de wèntí."},{"id":"hsk4_24","level":4,"module":"HSK4","chinese_simp_full":"由于缺乏足够的经验，他在处理突发事件时显得有些手忙脚乱，不知所措。","chinese_simp_cloze":"___缺乏足够的经验，他在处理突发事件时显得有些手忙脚乱，不知所措。","chinese_simp_answer":"由于","chinese_trad_full":"由於缺乏足夠的經驗，他在處理突發事件時顯得有些手忙腳亂，不知所措。","chinese_trad_cloze":"___缺乏足夠的經驗，他在處理突發事件時顯得有些手忙腳亂，不知所措。","chinese_trad_answer":"由於","spanish_full":"Debido a la falta de experiencia suficiente, pareció un poco torpe y desconcertado al manejar situaciones imprevistas.","spanish_cloze":"___ a la falta de experiencia suficiente, pareció un poco torpe y desconcertado al manejar situaciones imprevistas.","spanish_answer":"Debido","pinyin":"Yóuyú quēfá zúgòu de jīngyàn, tā zài chǔlǐ tūfā shìjiàn shí xiǎnde yǒuxiē shǒumángjiǎoluàn, bùzhīsuǒcuò."},{"id":"hsk4_25","level":4,"module":"HSK4","chinese_simp_full":"不管别人怎么说，我都坚信自己的选择是正确的，并且会为之奋斗到底。","chinese_simp_cloze":"___别人怎么说，我都坚信自己的选择是正确的，并且会为之奋斗到底。","chinese_simp_answer":"不管","chinese_trad_full":"不管別人怎麼說，我都堅信自己的選擇是正確的，並且會為之奮鬥到底。","chinese_trad_cloze":"___別人怎麼說，我都堅信自己的選擇是正確的，並且會為之奮鬥到底。","chinese_trad_answer":"不管","spanish_full":"Sin importar lo que digan los demás, estoy firmemente convencido de que mi elección es correcta y lucharé por ella hasta el final.","spanish_cloze":"___ lo que digan los demás, estoy firmemente convencido de que mi elección es correcta y lucharé por ella hasta el final.","spanish_answer":"Sin importar","pinyin":"Bùguǎn biérén zěnme shuō, wǒ dōu jiānxìn zìjǐ de xuǎnzé shì zhèngquè de, bìngqiě huì wèi zhī fèndòu dàodǐ."},{"id":"hsk4_26","level":4,"module":"HSK4","chinese_simp_full":"为了提高工作效率，公司决定引进先进的管理系统，并对员工进行专业培训。","chinese_simp_cloze":"为了___工作效率，公司决定引进先进的管理系统，并对员工进行专业培训。","chinese_simp_answer":"提高","chinese_trad_full":"為了提高工作效率，公司決定引進先進的管理系統，並對員工進行專業培訓。","chinese_trad_cloze":"為了___工作效率，公司決定引進先進的管理系統，並對員工進行專業培訓。","chinese_trad_answer":"提高","spanish_full":"Para mejorar la eficiencia laboral, la empresa decidió introducir un sistema de gestión avanzado y brindar capacitación profesional a los empleados.","spanish_cloze":"Para ___ la eficiencia laboral, la empresa decidió introducir un sistema de gestión avanzado y brindar capacitación profesional a los empleados.","spanish_answer":"mejorar","pinyin":"Wèile tígāo gōngzuò xiàolǜ, gōngsī juédìng yǐnjìn xiānjìn de guǎnlǐ xìtǒng, bìng duì yuángōng jìnxíng zhuānyè péixùn."},{"id":"hsk4_27","level":4,"module":"HSK4","chinese_simp_full":"既然大家都同意这个方案，那我们就按照计划开始执行，争取早日完成任务。","chinese_simp_cloze":"___大家都同意这个方案，那我们就按照计划开始执行，争取早日完成任务。","chinese_simp_answer":"既然","chinese_trad_full":"既然大家都同意這個方案，那我們就按照計劃開始執行，爭取早日完成任務。","chinese_trad_cloze":"___大家都同意這個方案，那我們就按照計劃開始執行，爭取早日完成任務。","chinese_trad_answer":"既然","spanish_full":"Ya que todos están de acuerdo con este plan, entonces comencemos a ejecutarlo según lo programado y esforcémonos por completar la tarea lo antes posible.","spanish_cloze":"___ que todos están de acuerdo con este plan, entonces comencemos a ejecutarlo según lo programado y esforcémonos por completar la tarea lo antes posible.","spanish_answer":"Ya","pinyin":"Jìrán dàjiā dōu tóngyì zhège fāng'àn, nà wǒmen jiù ànzhào jìhuà kāishǐ zhíxíng, zhēngqǔ zǎorì wánchéng rènwu."},{"id":"hsk4_28","level":4,"module":"HSK4","chinese_simp_full":"随着生活水平的提高，人们对健康饮食的关注度也越来越高了。","chinese_simp_cloze":"___生活水平的提高，人们对健康饮食的关注度也越来越高了。","chinese_simp_answer":"随着","chinese_trad_full":"隨著生活水平的提高，人們對健康飲食的關注度也越來越高了。","chinese_trad_cloze":"___生活水平的提高，人們對健康飲食的關注度也越來越高了。","chinese_trad_answer":"隨著","spanish_full":"A medida que mejora el nivel de vida, la atención de las personas hacia una alimentación saludable también aumenta cada vez más.","spanish_cloze":"___ mejora el nivel de vida, la atención de las personas hacia una alimentación saludable también aumenta cada vez más.","spanish_answer":"A medida que","pinyin":"Suízhe shēnghuó shuǐpíng de tígāo, rénmen duì jiànkāng yǐnshí de guānzhù dù yě yuè lái yuè gāo le."},{"id":"hsk4_29","level":4,"module":"HSK4","chinese_simp_full":"他之所以能在短时间内取得这么大的成就，完全是因为他付出了常人难以想象的努力。","chinese_simp_cloze":"他之所以能在短时间内取得这么大的成就，完全是因为___付出了常人难以想象的努力。","chinese_simp_answer":"他","chinese_trad_full":"他之所以能在短時間內取得這麼大的成就，完全是因為他付出了常人難以想象的努力。","chinese_trad_cloze":"他之所以能在短時間內取得這麼大的成就，完全是因為___付出了常人難以想象的努力。","chinese_trad_answer":"他","spanish_full":"La razón por la que pudo lograr tal éxito en tan poco tiempo se debe enteramente a que él dedicó un esfuerzo que la gente común difícilmente puede imaginar.","spanish_cloze":"La razón por la que pudo lograr tal éxito en tan poco tiempo se debe enteramente a que ___ dedicó un esfuerzo que la gente común difícilmente puede imaginar.","spanish_answer":"él","pinyin":"Tā zhī suǒyǐ néng zài duǎn shíjiān nèi qǔdé zhème dà de chéngjiù, wánquán shì yīnwèi tā fùchū le chángrén nányǐ xiǎngxiàng de nǔlì."},{"id":"hsk4_30","level":4,"module":"HSK4","chinese_simp_full":"对于这个复杂的社会问题，我们不能简单地归咎于某一个人或某一个群体。","chinese_simp_cloze":"___这个复杂的社会问题，我们不能简单地归咎于某一个人或某一个群体。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個複雜的社會問題，我們不能簡單地歸咎於某一個人或某一個群體。","chinese_trad_cloze":"___這個複雜的社會問題，我們不能簡單地歸咎於某一個人或某一個群體。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este complejo problema social, no podemos culpar simplemente a una sola persona o a un solo grupo.","spanish_cloze":"___ este complejo problema social, no podemos culpar simplemente a una sola persona o a un solo grupo.","spanish_answer":"Con respecto a","pinyin":"Duìyú zhège fùzá de shèhuì wèntí, wǒmen bùnéng jiǎndān de guījiù yú mǒu yí ge rén huò mǒu yí ge qúntǐ."},{"id":"hsk4_31","level":4,"module":"HSK4","chinese_simp_full":"只有当我们真正理解了文化的差异，才能建立起相互尊重和信任的桥梁。","chinese_simp_cloze":"___当我们真正理解了文化的差异，才能建立起相互尊重和信任的桥梁。","chinese_simp_answer":"只有","chinese_trad_full":"只有當我們真正理解了文化的差異，才能建立起相互尊重和信任的橋樑。","chinese_trad_cloze":"___當我們真正理解了文化的差異，才能建立起相互尊重和信任的橋樑。","chinese_trad_answer":"只有","spanish_full":"Solo cuando comprendamos verdaderamente las diferencias culturales podremos construir puentes de respeto mutuo y confianza.","spanish_cloze":"___ cuando comprendamos verdaderamente las diferencias culturales podremos construir puentes de respeto mutuo y confianza.","spanish_answer":"Solo","pinyin":"Zhǐyǒu dāng wǒmen zhēnzhèng lǐjiě le wénhuà de chāyì, cái néng jiànlì qǐ xiānghù zūnzhòng hé xìnrèn de qiáoliáng."},{"id":"hsk4_32","level":4,"module":"HSK4","chinese_simp_full":"尽管遇到了许多挫折，但他从来没有失去信心，反而变得更加坚强和成熟。","chinese_simp_cloze":"___遇到了许多挫折，但他从来没有失去信心，反而变得更加坚强和成熟。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管遇到了許多挫折，但他從來沒有失去信心，反而變得更加堅強和成熟。","chinese_trad_cloze":"___遇到了許多挫折，但他從來沒有失去信心，反而變得更加堅強和成熟。","chinese_trad_answer":"儘管","spanish_full":"Aunque encontró muchos contratiempos, nunca perdió la confianza; por el contrario, se volvió más fuerte y maduro.","spanish_cloze":"___ encontró muchos contratiempos, nunca perdió la confianza; por el contrario, se volvió más fuerte y maduro.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn yù dào le xǔduō cuòzhé, dàn tā cóngláiméi yǒu shīqù xìnxīn, fn'ér biànde gèngjiā jiānqiáng hé chéngshú."},{"id":"hsk4_33","level":4,"module":"HSK4","chinese_simp_full":"由于交通堵塞严重，我们不得不改变原定的出行计划，改乘地铁前往目的地。","chinese_simp_cloze":"___交通堵塞严重，我们不得不改变原定的出行计划，改乘地铁前往目的地。","chinese_simp_answer":"由于","chinese_trad_full":"由於交通堵塞嚴重，我們不得不改變原定的出行計劃，改乘地鐵前往目的地。","chinese_trad_cloze":"___交通堵塞嚴重，我們不得不改變原定的出行計劃，改乘地鐵前往目的地。","chinese_trad_answer":"由於","spanish_full":"Debido al grave embotellamiento de tráfico, tuvimos que cambiar nuestro plan de viaje original y tomar el metro hacia el destino.","spanish_cloze":"___ al grave embotellamiento de tráfico, tuvimos que cambiar nuestro plan de viaje original y tomar el metro hacia el destino.","spanish_answer":"Debido","pinyin":"Yóuyú jiāotōng dǔsè yánzhòng, wǒmen bùdébù gǎibiàn yuándìng de chūxíng jìhuà, gǎichéng dìtiě qiánwǎng mùdìdì."},{"id":"hsk4_34","level":4,"module":"HSK4","chinese_simp_full":"不管未来有多么不确定，只要我们保持学习和进步的心态，就能应对各种挑战。","chinese_simp_cloze":"___未来有多么不确定，只要我们保持学习和进步的心态，就能应对各种挑战。","chinese_simp_answer":"不管","chinese_trad_full":"不管未來有多麼不確定，只要我們保持學習和進步的心態，就能應對各種挑戰。","chinese_trad_cloze":"___未來有多麼不確定，只要我們保持學習和進步的心態，就能應對各種挑戰。","chinese_trad_answer":"不管","spanish_full":"Sin importar cuán incierto sea el futuro, siempre que mantengamos una mentalidad de aprendizaje y progreso, podremos enfrentar diversos desafíos.","spanish_cloze":"___ cuán incierto sea el futuro, siempre que mantengamos una mentalidad de aprendizaje y progreso, podremos enfrentar diversos desafíos.","spanish_answer":"Sin importar","pinyin":"Bùguǎn wèilái yǒu duōme bù quèdìng, zhǐyào wǒmen bǎochí xuéxí hé jìnbù de xīntài, jiù néng yìngduì gèzhǒng tiǎozhàn."},{"id":"hsk4_35","level":4,"module":"HSK4","chinese_simp_full":"通过这次深刻的反思，他终于明白了自己过去犯下的错误，并决心彻底改正。","chinese_simp_cloze":"___这次深刻的反思，他终于明白了自己过去犯下的错误，并决心彻底改正。","chinese_simp_answer":"通过","chinese_trad_full":"通過這次深刻的反思，他終於明白了自己過去犯下的錯誤，並決心徹底改正。","chinese_trad_cloze":"___這次深刻的反思，他終於明白了自己過去犯下的錯誤，並決心徹底改正。","chinese_trad_answer":"通過","spanish_full":"A través de esta profunda reflexión, finalmente comprendió los errores que cometió en el pasado y determinó corregirlos por completo.","spanish_cloze":"___ esta profunda reflexión, finalmente comprendió los errores que cometió en el pasado y determinó corregirlos por completo.","spanish_answer":"A través de","pinyin":"Tōngguò zhè cì shēnkè de fǎnsī, tā zhōngyú míngbai le zìjǐ guòqù fànxià de cuòwù, bìng juéxīn chèdǐ gǎizhèng."},{"id":"hsk4_36","level":4,"module":"HSK4","chinese_simp_full":"既然选择了这条道路，就要勇敢地走下去，哪怕前方充满未知和风险。","chinese_simp_cloze":"___选择了这条道路，就要勇敢地走下去，哪怕前方充满未知和风险。","chinese_simp_answer":"既然","chinese_trad_full":"既然選擇了這條道路，就要勇敢地走下去，哪怕前方充滿未知和風險。","chinese_trad_cloze":"___選擇了這條道路，就要勇敢地走下去，哪怕前方充滿未知和風險。","chinese_trad_answer":"既然","spanish_full":"Ya que elegiste este camino, debes caminar valientemente hacia adelante, incluso si el futuro está lleno de incertidumbre y riesgos.","spanish_cloze":"___ elegiste este camino, debes caminar valientemente hacia adelante, incluso si el futuro está lleno de incertidumbre y riesgos.","spanish_answer":"Ya que","pinyin":"Jìrán xuǎnzé le zhè tiáo dàolù, jiù yào yǒnggǎn de zǒu xiàqù, nǎpà qiánfāng chōngmn wèizhī hé fēngxiǎn."},{"id":"hsk4_37","level":4,"module":"HSK4","chinese_simp_full":"随着全球化的深入发展，跨文化交流变得越来越重要，也越来越普遍。","chinese_simp_cloze":"___全球化的深入发展，跨文化交流变得越来越重要，也越来越普遍。","chinese_simp_answer":"随着","chinese_trad_full":"隨著全球化的深入發展，跨文化交流變得越來越重要，也越來越普遍。","chinese_trad_cloze":"___全球化的深入發展，跨文化交流變得越來越重要，也越來越普遍。","chinese_trad_answer":"隨著","spanish_full":"Con el profundo desarrollo de la globalización, el intercambio intercultural se vuelve cada vez más importante y también más común.","spanish_cloze":"___ el profundo desarrollo de la globalización, el intercambio intercultural se vuelve cada vez más importante y también más común.","spanish_answer":"Con","pinyin":"Suízhe quánqiúhuà de shēnrù fāzhǎn, kuà wénhuà jiāoliú biànde yuè lái yuè zhòngyào, yě yuè lái yuè pbiàn."},{"id":"hsk4_38","level":4,"module":"HSK4","chinese_simp_full":"他之所以能够获得大家的认可，是因为他始终保持着谦虚谨慎的工作态度。","chinese_simp_cloze":"他之所以能够获得大家的认可，是因为___始终保持着谦虚谨慎的工作态度。","chinese_simp_answer":"他","chinese_trad_full":"他之所以能夠獲得大家的認可，是因為他始終保持著謙虛謹慎的工作態度。","chinese_trad_cloze":"他之所以能夠獲得大家的認可，是因為___始終保持著謙虛謹慎的工作態度。","chinese_trad_answer":"他","spanish_full":"La razón por la que pudo obtener el reconocimiento de todos es porque él siempre mantuvo una actitud de trabajo humilde y prudente.","spanish_cloze":"La razón por la que pudo obtener el reconocimiento de todos es porque ___ siempre mantuvo una actitud de trabajo humilde y prudente.","spanish_answer":"él","pinyin":"Tā zhī suǒyǐ nénggòu huòdé dàjiā de rènkě, shì yīnwèi tā shǐzhōng bǎochí zhe qiānxū jǐnshèn de gōngzuò tàidù."},{"id":"hsk4_39","level":4,"module":"HSK4","chinese_simp_full":"对于这个敏感的话题，我们需要格外小心措辞，以免引起不必要的误解和冲突。","chinese_simp_cloze":"___这个敏感的话题，我们需要格外小心措辞，以免引起不必要的误解和冲突。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個敏感的話題，我們需要格外小心措辭，以免引起不必要的誤解和衝突。","chinese_trad_cloze":"___這個敏感的話題，我們需要格外小心措辭，以免引起不必要的誤解和衝突。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este tema sensible, necesitamos ser extremadamente cuidadosos con nuestras palabras para evitar causar malentendidos y conflictos innecesarios.","spanish_cloze":"___ este tema sensible, necesitamos ser extremadamente cuidadosos con nuestras palabras para evitar causar malentendidos y conflictos innecesarios.","spanish_answer":"Con respecto a","pinyin":"Duìyú zhège mǐngǎn de huàtí, wǒmen xūyào géwài xiǎoxīn cuòcí, yǐmiǎn yǐnqǐ bù bìyào de wùjiě hé chōngtū."},{"id":"hsk4_40","level":4,"module":"HSK4","chinese_simp_full":"只要我们还有一线希望，就不应该轻易放弃，而应该继续努力寻找突破口。","chinese_simp_cloze":"___我们还有一线希望，就不应该轻易放弃，而应该继续努力寻找突破口。","chinese_simp_answer":"只要","chinese_trad_full":"只要我們還有一線希望，就不應該輕易放棄，而應該繼續努力尋找突破口。","chinese_trad_cloze":"___我們還有一線希望，就不應該輕易放棄，而應該繼續努力尋找突破口。","chinese_trad_answer":"只要","spanish_full":"Siempre que tengamos aunque sea una mínima esperanza, no deberíamos rendirnos fácilmente, sino continuar esforzándonos por encontrar un punto de avance.","spanish_cloze":"___ tengamos aunque sea una mínima esperanza, no deberíamos rendirnos fácilmente, sino continuar esforzándonos por encontrar un punto de avance.","spanish_answer":"Siempre que","pinyin":"Zhǐyào wǒmen hái yǒu yí xiàn xīwàng, jiù bù yīnggāi qīngyì fàngqì, ér yīnggāi jìxù nǔlì xúnzhǎo tūpòkǒu."}],
'HSK5': [{"id":"hsk5_01","level":5,"module":"HSK5","chinese_simp_full":"尽管面临着巨大的文化冲击，但他始终保持着乐观的心态，努力适应新的生活环境。","chinese_simp_cloze":"___面临着巨大的文化冲击，但他始终保持着乐观的心态，努力适应新的生活环境。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管面臨著巨大的文化衝擊，但他始終保持著樂觀的心態，努力適應新的生活環境。","chinese_trad_cloze":"___面臨著巨大的文化衝擊，但他始終保持著樂觀的心態，努力適應新的生活環境。","chinese_trad_answer":"儘管","spanish_full":"Aunque enfrenta un enorme choque cultural, siempre mantiene una actitud optimista y se esfuerza por adaptarse al nuevo entorno vital.","spanish_cloze":"___ enfrenta un enorme choque cultural, siempre mantiene una actitud optimista y se esfuerza por adaptarse al nuevo entorno vital.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn miànlín zhe jùdà de wénhuà chōngjī, dàn tā shǐzhōng bǎochí zhe lèguān de xīntài, nǔlì shìyìng xīn de shēnghuó huánjìng."},{"id":"hsk5_02","level":5,"module":"HSK5","chinese_simp_full":"与其抱怨命运的不公，不如把精力集中在提升自己上，这才是解决问题的根本途径。","chinese_simp_cloze":"___抱怨命运的不公，不如把精力集中在提升自己上，这才是解决问题的根本途径。","chinese_simp_answer":"与其","chinese_trad_full":"與其抱怨命運的不公，不如把精力集中在提升自己上，這才是解決問題的根本途徑。","chinese_trad_cloze":"___抱怨命運的不公，不如把精力集中在提升自己上，這才是解決問題的根本途徑。","chinese_trad_answer":"與其","spanish_full":"En lugar de quejarse de la injusticia del destino, sería mejor concentrar la energía en superarse uno mismo; esta es la vía fundamental para resolver problemas.","spanish_cloze":"___ de quejarse de la injusticia del destino, sería mejor concentrar la energía en superarse uno mismo; esta es la vía fundamental para resolver problemas.","spanish_answer":"En lugar","pinyin":"Yǔqí bàoyuàn mìngyùn de bùgōng, bùrú bǎ jīnglì jízhōng zài tíshēng zìjǐ shàng, zhè cái shì jiějué wèntí de gēnběn tújìng."},{"id":"hsk5_03","level":5,"module":"HSK5","chinese_simp_full":"随着社交媒体的普及，人们获取信息的方式发生了翻天覆地的变化，但也带来了信息过载的困扰。","chinese_simp_cloze":"___社交媒体的普及，人们获取信息的方式发生了翻天覆地的变化，但也带来了信息过载的困扰。","chinese_simp_answer":"随着","chinese_trad_full":"隨著社交媒體的普及，人們獲取信息的方式發生了翻天覆地的變化，但也帶來了信息過載的困擾。","chinese_trad_cloze":"___社交媒體的普及，人們獲取信息的方式發生了翻天覆地的變化，但也帶來了信息過載的困擾。","chinese_trad_answer":"隨著","spanish_full":"Con la popularización de las redes sociales, la forma en que las personas obtienen información ha cambiado radicalmente, pero también ha traído consigo el problema de la sobrecarga informativa.","spanish_cloze":"___ la popularización de las redes sociales, la forma en que las personas obtienen información ha cambiado radicalmente, pero también ha traído consigo el problema de la sobrecarga informativa.","spanish_answer":"Con","pinyin":"Suízhe shèjiāo méitǐ de pǔjí, rénmen huòqǔ xìnxī de fāngshì fāshēng le fāntiānfùdì de biànhuà, dàn yě dàilái le xìnxī guòzài de kùnrǎo."},{"id":"hsk5_04","level":5,"module":"HSK5","chinese_simp_full":"他之所以能在激烈的竞争中脱颖而出，不仅靠的是扎实的专业知识，更得益于他独特的创新思维。","chinese_simp_cloze":"他之所以能在激烈的竞争中脱颖而出，不仅靠的是扎实的专业知识，更___于他独特的创新思维。","chinese_simp_answer":"得益","chinese_trad_full":"他之所以能在激烈的競爭中脫穎而出，不僅靠的是紮實的專業知識，更得益於他獨特的創新思維。","chinese_trad_cloze":"他之所以能在激烈的競爭中脫穎而出，不僅靠的是紮實的專業知識，更___於他獨特的創新思維。","chinese_trad_answer":"得益","spanish_full":"La razón por la que pudo destacar en la feroz competencia no solo se debe a sus sólidos conocimientos profesionales, sino también a su pensamiento innovador único.","spanish_cloze":"La razón por la que pudo destacar en la feroz competencia no solo ___ a sus sólidos conocimientos profesionales, sino también a su pensamiento innovador único.","spanish_answer":"se debe","pinyin":"Tā zhī suǒyǐ néng zài jīliè de jìngzhēng zhōng tuōyǐng'érchū, bùjǐn kào de shì zhāshi de zhuānyè zhīshi, gèng déyì yú tā dútè de chuàngxīn sīwéi."},{"id":"hsk5_05","level":5,"module":"HSK5","chinese_simp_full":"无论科技如何发展，人与人之间真诚的沟通和理解永远是维系关系最宝贵的纽带。","chinese_simp_cloze":"___科技如何发展，人与人之间真诚的沟通和理解永远是维系关系最宝贵的纽带。","chinese_simp_answer":"无论","chinese_trad_full":"無論科技如何發展，人與人之間真誠的溝通和理解永遠是維繫關係最寶貴的紐帶。","chinese_trad_cloze":"___科技如何發展，人與人之間真誠的溝通和理解永遠是維繫關係最寶貴的紐帶。","chinese_trad_answer":"無論","spanish_full":"Sin importar cómo evolucione la tecnología, la comunicación sincera y la comprensión mutua entre las personas seguirán siendo siempre el vínculo más valioso para mantener las relaciones.","spanish_cloze":"___ cómo evolucione la tecnología, la comunicación sincera y la comprensión mutua entre las personas seguirán siendo siempre el vínculo más valioso para mantener las relaciones.","spanish_answer":"Sin importar","pinyin":"Wúlùn kējì rúhé fāzhǎn, rén yǔ rén zhījiān zhēnchéng de gōutōng hé lǐjiě yǒngyuǎn shì wéixì guānxì zuì bǎoguì de niǔdài."},{"id":"hsk5_06","level":5,"module":"HSK5","chinese_simp_full":"这次展览不仅展示了中国传统艺术的独特魅力，也反映了当代艺术家对文化传承与创新的深刻思考。","chinese_simp_cloze":"这次展览不仅展示了中国传统艺术的独特魅力，也___了当代艺术家对文化传承与创新的深刻思考。","chinese_simp_answer":"反映","chinese_trad_full":"這次展覽不僅展示了中國傳統藝術的獨特魅力，也反映了當代藝術家對文化傳承與創新的深刻思考。","chinese_trad_cloze":"這次展覽不僅展示了中國傳統藝術的獨特魅力，也___了當代藝術家對文化傳承與創新的深刻思考。","chinese_trad_answer":"反映","spanish_full":"Esta exposición no solo muestra el encanto único del arte tradicional chino, sino que también refleja la profunda reflexión de los artistas contemporáneos sobre la herencia y la innovación cultural.","spanish_cloze":"Esta exposición no solo muestra el encanto único del arte tradicional chino, sino que también ___ la profunda reflexión de los artistas contemporáneos sobre la herencia y la innovación cultural.","spanish_answer":"refleja","pinyin":"Zhè cì zhǎnlǎn bùjǐn zhǎnshì le Zhōngguó chuántǒng yìshù de dútè mèilì, yě fǎnyìng le dāngdài yìshùjiā duì wénhuà chuánchéng yǔ chuàngxīn de shēnkè sīkǎo."},{"id":"hsk5_07","level":5,"module":"HSK5","chinese_simp_full":"由于长期熬夜工作，他的身体出现了严重的亚健康状态，医生强烈建议他立即调整作息规律。","chinese_simp_cloze":"___长期熬夜工作，他的身体出现了严重的亚健康状态，医生强烈建议他立即调整作息规律。","chinese_simp_answer":"由于","chinese_trad_full":"由於長期熬夜工作，他的身體出現了嚴重的亞健康狀態，醫生強烈建議他立即調整作息規律。","chinese_trad_cloze":"___長期熬夜工作，他的身體出現了嚴重的亞健康狀態，醫生強烈建議他立即調整作息規律。","chinese_trad_answer":"由於","spanish_full":"Debido al trabajo prolongado hasta altas horas de la noche, su cuerpo ha desarrollado un grave estado de sub-salud, y el médico le recomienda encarecidamente que ajuste inmediatamente su ritmo de vida.","spanish_cloze":"___ al trabajo prolongado hasta altas horas de la noche, su cuerpo ha desarrollado un grave estado de sub-salud, y el médico le recomienda encarecidamente que ajuste inmediatamente su ritmo de vida.","spanish_answer":"Debido","pinyin":"Yóuyú chángqī áoyè gōngzuò, tā de shēntǐ chūxiàn le yánzhòng de yà jiànkāng zhuàngtài, yīshēng qiángliè jiànyì tā lìjí tiáozhěng zuòxī guīlv."},{"id":"hsk5_08","level":5,"module":"HSK5","chinese_simp_full":"既然选择了远方，便只顾风雨兼程；既然目标是地平线，留给世界的只能是背影。","chinese_simp_cloze":"___选择了远方，便只顾风雨兼程；既然目标是地平线，留给世界的只能是背影。","chinese_simp_answer":"既然","chinese_trad_full":"既然選擇了遠方，便只顧風雨兼程；既然目標是地平線，留給世界的只能是背影。","chinese_trad_cloze":"___選擇了遠方，便只顧風雨兼程；既然目標是地平線，留給世界的只能是背影。","chinese_trad_answer":"既然","spanish_full":"Ya que has elegido el horizonte lejano, solo te queda avanzar bajo la lluvia y el viento; ya que tu meta es la línea del horizonte, lo único que puedes dejarle al mundo es tu espalda.","spanish_cloze":"___ que has elegido el horizonte lejano, solo te queda avanzar bajo la lluvia y el viento; ya que tu meta es la línea del horizonte, lo único que puedes dejarle al mundo es tu espalda.","spanish_answer":"Ya","pinyin":"Jìrán xuǎnzé le yuǎnfāng, biàn zhǐgù fēngyǔ jiānchéng; jìrán mùbiāo shì dìpíngxiàn, liú gěi shìjiè de zhǐnéng shì bèiyǐng."},{"id":"hsk5_09","level":5,"module":"HSK5","chinese_simp_full":"通过深入分析市场数据，我们发现消费者的需求正在发生微妙的变化，这为我们提供了新的商业机遇。","chinese_simp_cloze":"___深入分析市场数据，我们发现消费者的需求正在发生微妙的变化，这为我们提供了新的商业机遇。","chinese_simp_answer":"通过","chinese_trad_full":"通過深入分析市場數據，我們發現消費者的需求正在發生微妙的變化，這為我們提供了新的商業機遇。","chinese_trad_cloze":"___深入分析市場數據，我們發現消費者的需求正在發生微妙的變化，這為我們提供了新的商業機遇。","chinese_trad_answer":"通過","spanish_full":"Mediante un análisis profundo de los datos del mercado, descubrimos que las necesidades de los consumidores están experimentando cambios sutiles, lo que nos ofrece nuevas oportunidades comerciales.","spanish_cloze":"___ un análisis profundo de los datos del mercado, descubrimos que las necesidades de los consumidores están experimentando cambios sutiles, lo que nos ofrece nuevas oportunidades comerciales.","spanish_answer":"Mediante","pinyin":"Tōngguò shēnrù fēnxī shìchǎng shùjù, wǒmen fāxiàn xiāofèizhě de xūqiú zhèngzài fāshēng wēimiào de biànhuà, zhè wèi wǒmen tígōng le xīn de shāngyè jīyù."},{"id":"hsk5_10","level":5,"module":"HSK5","chinese_simp_full":"对于这个问题，专家们众说纷纭，莫衷一是，目前还没有形成一个公认的解决方案。","chinese_simp_cloze":"___这个问题，专家们众说纷纭，莫衷一是，目前还没有形成一个公认的解决方案。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個問題，專家們眾說紛紜，莫衷一是，目前還沒有形成一個公認的解決方案。","chinese_trad_cloze":"___這個問題，專家們眾說紛紜，莫衷一是，目前還沒有形成一個公認的解決方案。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este problema, los expertos tienen opiniones muy diversas y no llegan a un consenso; actualmente aún no se ha formado una solución generalmente aceptada.","spanish_cloze":"___ este problema, los expertos tienen opiniones muy diversas y no llegan a un consenso; actualmente aún no se ha formado una solución generalmente aceptada.","spanish_answer":"Con respecto a","pinyin":"Duìyú zhège wèntí, zhuānjiāmen zhòngshuōfēnyún, mòzhōngyīshì, mùqián hái méiyǒu xíngchéng yí ge gōngrèn de jiějué fāng'àn."},{"id":"hsk5_11","level":5,"module":"HSK5","chinese_simp_full":"他表面上看起来很平静，但内心却波涛汹涌，充满了矛盾和挣扎。","chinese_simp_cloze":"他___上看起来很平静，但内心却波涛汹涌，充满了矛盾和挣扎。","chinese_simp_answer":"表面","chinese_trad_full":"他表面上看起來很平靜，但內心卻波濤洶湧，充滿了矛盾和掙扎。","chinese_trad_cloze":"他___上看起來很平靜，但內心卻波濤洶湧，充滿了矛盾和掙扎。","chinese_trad_answer":"表面","spanish_full":"Superficialmente parece muy tranquilo, pero en su interior hay una tormenta emocional, llena de contradicciones y luchas internas.","spanish_cloze":"___mente parece muy tranquilo, pero en su interior hay una tormenta emocional, llena de contradicciones y luchas internas.","spanish_answer":"Superficial","pinyin":"Tā biǎomiàn shàng kàn qǐlái hěn píngjìng, dàn nèixīn què bōtāoxiōngyǒng, chōngmǎn le máodùn hé zhēngzhá."},{"id":"hsk5_12","level":5,"module":"HSK5","chinese_simp_full":"只要坚持不懈地努力，即使起点再低，也终有一天能够实现自己的人生价值。","chinese_simp_cloze":"___坚持不懈地努力，即使起点再低，也终有一天能够实现自己的人生价值。","chinese_simp_answer":"只要","chinese_trad_full":"只要堅持不懈地努力，即使起點再低，也終有一天能夠實現自己的人生價值。","chinese_trad_cloze":"___堅持不懈地努力，即使起點再低，也終有一天能夠實現自己的人生價值。","chinese_trad_answer":"只要","spanish_full":"Siempre que te esfuerces con perseverancia inquebrantable, incluso si tu punto de partida es muy bajo, algún día podrás realizar el valor de tu propia vida.","spanish_cloze":"___ te esfuerces con perseverancia inquebrantable, incluso si tu punto de partida es muy bajo, algún día podrás realizar el valor de tu propia vida.","spanish_answer":"Siempre que","pinyin":"Zhǐyào jiānchí búxiè de nǔlì, jíshǐ qǐdiǎn zài dī, yě zhōng yǒu yìtiān nénggòu shíxiàn zìjǐ de rénshēng jiàzhí."},{"id":"hsk5_13","level":5,"module":"HSK5","chinese_simp_full":"这部纪录片以独特的视角展现了普通人在时代洪流中的奋斗与坚守，令人深受感动。","chinese_simp_cloze":"这部纪录片以独特的视角展现了普通人在时代洪流中的___与坚守，令人深受感动。","chinese_simp_answer":"奋斗","chinese_trad_full":"這部紀錄片以獨特的視角展現了普通人在時代洪流中的奮鬥與堅守，令人深受感動。","chinese_trad_cloze":"這部紀錄片以獨特的視角展現了普通人在時代洪流中的___與堅守，令人深受感動。","chinese_trad_answer":"奮鬥","spanish_full":"Este documental muestra desde una perspectiva única la lucha y la perseverancia de las personas comunes en la corriente de la época, lo cual conmueve profundamente al espectador.","spanish_cloze":"Este documental muestra desde una perspectiva única la ___ y la perseverancia de las personas comunes en la corriente de la época, lo cual conmueve profundamente al espectador.","spanish_answer":"lucha","pinyin":"Zhè bù jìlùpiàn yǐ dútè de shìjiǎo zhǎnxiàn le pǔtōng rén zài shídài hóngliú zhōng de fèndòu yǔ jiānshǒu, lìng rén shēnshòu gǎndòng."},{"id":"hsk5_14","level":5,"module":"HSK5","chinese_simp_full":"考虑到他的实际情况和承受能力，我们决定暂时不给他施加太大的压力，让他慢慢调整。","chinese_simp_cloze":"___他的实际情况和承受能力，我们决定暂时不给他施加太大的压力，让他慢慢调整。","chinese_simp_answer":"考虑到","chinese_trad_full":"考慮到他的實際情況和承受能力，我們決定暫時不給他施加太大的壓力，讓他慢慢調整。","chinese_trad_cloze":"___他的實際情況和承受能力，我們決定暫時不給他施加太大的壓力，讓他慢慢調整。","chinese_trad_answer":"考慮到","spanish_full":"Teniendo en cuenta su situación real y su capacidad de resistencia, decidimos no ejercer demasiada presión sobre él por el momento y permitirle que se ajuste gradualmente.","spanish_cloze":"___ su situación real y su capacidad de resistencia, decidimos no ejercer demasiada presión sobre él por el momento y permitirle que se ajuste gradualmente.","spanish_answer":"Teniendo en cuenta","pinyin":"Kǎolǜ dào tā de shíjì qíngkuàng hé chéngshòu nénglì, wǒmen juédìng zànshí bù gěi tā shījiā tài dà de yālì, ràng tā mànman tiáozhěng."},{"id":"hsk5_15","level":5,"module":"HSK5","chinese_simp_full":"在全球化的背景下，跨文化交流已经成为一种常态，理解和尊重差异显得尤为重要。","chinese_simp_cloze":"在全球化的背景下，跨文化交流已经成为一种___，理解和尊重差异显得尤为重要。","chinese_simp_answer":"常态","chinese_trad_full":"在全球化的背景下，跨文化交流已經成為一種常態，理解和尊重差異顯得尤為重要。","chinese_trad_cloze":"在全球化的背景下，跨文化交流已經成為一種___，理解和尊重差異顯得尤為重要。","chinese_trad_answer":"常態","spanish_full":"En el contexto de la globalización, el intercambio intercultural se ha convertido en una norma, y comprender y respetar las diferencias resulta particularmente importante.","spanish_cloze":"En el contexto de la globalización, el intercambio intercultural se ha convertido en una ___, y comprender y respetar las diferencias resulta particularmente importante.","spanish_answer":"norma","pinyin":"Zài quánqiúhuà de bèijǐng xià, kuà wénhuà jiāoliú yǐjīng chéngwéi yì zhǒng chángtài, lǐjiě hé zūnzhòng chāyì xiǎnde yóuwéi zhòngyào."},{"id":"hsk5_16","level":5,"module":"HSK5","chinese_simp_full":"他之所以能够获得这项殊荣，完全是因为他多年来在科研领域默默耕耘、无私奉献的结果。","chinese_simp_cloze":"他之所以能够获得这项殊荣，完全是因为他多年来在科研领域默默___、无私奉献的结果。","chinese_simp_answer":"耕耘","chinese_trad_full":"他之所以能夠獲得這項殊榮，完全是因為他多年來在科研領域默默耕耘、無私奉獻的結果。","chinese_trad_cloze":"他之所以能夠獲得這項殊榮，完全是因為他多年來在科研領域默默___、無私奉獻的結果。","chinese_trad_answer":"耕耘","spanish_full":"La razón por la que pudo obtener este honor se debe enteramente a su trabajo silencioso y dedicación desinteresada en el campo de la investigación científica durante muchos años.","spanish_cloze":"La razón por la que pudo obtener este honor se debe enteramente a su ___ silencioso y dedicación desinteresada en el campo de la investigación científica durante muchos años.","spanish_answer":"trabajo","pinyin":"Tā zhī suǒyǐ nénggòu huòdé zhè xiàng shūróng, wánquán shì yīnwèi tā duōnián lái zài kēyán lǐngyù mòmò gēngyún, wúsī fèngxiàn de jiéguǒ."},{"id":"hsk5_17","level":5,"module":"HSK5","chinese_simp_full":"不管外界环境如何变化，我们都应该保持内心的宁静与坚定，不被外界的喧嚣所干扰。","chinese_simp_cloze":"___外界环境如何变化，我们都应该保持内心的宁静与坚定，不被外界的喧嚣所干扰。","chinese_simp_answer":"不管","chinese_trad_full":"不管外界環境如何變化，我們都應該保持內心的寧靜與堅定，不被外界的喧囂所幹擾。","chinese_trad_cloze":"___外界環境如何變化，我們都應該保持內心的寧靜與堅定，不被外界的喧囂所幹擾。","chinese_trad_answer":"不管","spanish_full":"Sin importar cómo cambie el entorno externo, debemos mantener la tranquilidad y la firmeza interior, sin dejarnos perturbar por el ruido del mundo exterior.","spanish_cloze":"___ cómo cambie el entorno externo, debemos mantener la tranquilidad y la firmeza interior, sin dejarnos perturbar por el ruido del mundo exterior.","spanish_answer":"Sin importar","pinyin":"Bùguǎn wàijiè huánjìng rúhé biànhuà, wǒmen dōu yīnggāi bǎochí nèixīn de níngjìng yǔ jiāndìng, bù bèi wàijiè de xuānxiāo suǒ gānrǎo."},{"id":"hsk5_18","level":5,"module":"HSK5","chinese_simp_full":"为了提高团队的整体效率，管理层决定引入先进的协作工具，并定期组织培训活动。","chinese_simp_cloze":"为了___团队的整体效率，管理层决定引入先进的协作工具，并定期组织培训活动。","chinese_simp_answer":"提高","chinese_trad_full":"為了提高團隊的整體效率，管理層決定引入先進的協作工具，並定期組織培訓活動。","chinese_trad_cloze":"為了___團隊的整體效率，管理層決定引入先進的協作工具，並定期組織培訓活動。","chinese_trad_answer":"提高","spanish_full":"Para mejorar la eficiencia general del equipo, la dirección decidió introducir herramientas de colaboración avanzadas y organizar sesiones de capacitación periódicas.","spanish_cloze":"Para ___ la eficiencia general del equipo, la dirección decidió introducir herramientas de colaboración avanzadas y organizar sesiones de capacitación periódicas.","spanish_answer":"mejorar","pinyin":"Wèile tígāo tuánduì de zhěngtǐ xiàolǜ, guǎnlǐcéng juédìng yǐnrù xiānjìn de xiézuò gōngjù, bìng dìngqī zǔzhī péixùn huódòng."},{"id":"hsk5_19","level":5,"module":"HSK5","chinese_simp_full":"即使面临重重困难，他也从未动摇过自己的信念，这种精神值得我们每个人学习。","chinese_simp_cloze":"___面临重重困难，他也从未动摇过自己的信念，这种精神值得我们每个人学习。","chinese_simp_answer":"即使","chinese_trad_full":"即使面臨重重困難，他也從未動搖過自己的信念，這種精神值得我們每個人學習。","chinese_trad_cloze":"___面臨重重困難，他也從未動搖過自己的信念，這種精神值得我們每個人學習。","chinese_trad_answer":"即使","spanish_full":"Incluso enfrentando múltiples dificultades, nunca vaciló en sus convicciones; este espíritu merece ser aprendido por cada uno de nosotros.","spanish_cloze":"___ enfrentando múltiples dificultades, nunca vaciló en sus convicciones; este espíritu merece ser aprendido por cada uno de nosotros.","spanish_answer":"Incluso","pinyin":"Jíshǐ miànlín chóngchóng kùnnan, tā yě cóngwèi dòngyáo guò zìjǐ de xìnniàn, zhè zhǒng jīngshén zhíde wǒmen měi ge rén xuéxí."},{"id":"hsk5_20","level":5,"module":"HSK5","chinese_simp_full":"通过不断的实践和反思，他逐渐摸索出了一套适合自己的学习方法，成绩也有了显著提升。","chinese_simp_cloze":"___不断的实践和反思，他逐渐摸索出了一套适合自己的学习方法，成绩也有了显著提升。","chinese_simp_answer":"通过","chinese_trad_full":"通過不斷的實踐和反思，他逐漸摸索出了一套適合自己的學習方法，成績也有了顯著提升。","chinese_trad_cloze":"___不斷的實踐和反思，他逐漸摸索出了一套適合自己的學習方法，成績也有了顯著提升。","chinese_trad_answer":"通過","spanish_full":"Mediante la práctica y la reflexión constantes, poco a poco encontró un método de estudio adecuado para sí mismo, y sus calificaciones también mejoraron notablemente.","spanish_cloze":"___ la práctica y la reflexión constantes, poco a poco encontró un método de estudio adecuado para sí mismo, y sus calificaciones también mejoraron notablemente.","spanish_answer":"Mediante","pinyin":"Tōngguò búduàn de shíjiàn hé fǎnsī, tā zhújiàn mōsuǒ chū le yí tào shìhé zìjǐ de xuéxí fāngfǎ, chéngjì yě yǒu le xiǎnzhù tíshēng."},{"id":"hsk5_21","level":5,"module":"HSK5","chinese_simp_full":"鉴于当前形势的复杂性，我们必须采取更加谨慎的态度，避免做出冲动的决定。","chinese_simp_cloze":"___当前形势的复杂性，我们必须采取更加谨慎的态度，避免做出冲动的决定。","chinese_simp_answer":"鉴于","chinese_trad_full":"鑑於當前形勢的複雜性，我們必須採取更加謹慎的態度，避免做出衝動的決定。","chinese_trad_cloze":"___當前形勢的複雜性，我們必須採取更加謹慎的態度，避免做出衝動的決定。","chinese_trad_answer":"鑑於","spanish_full":"Dada la complejidad de la situación actual, debemos adoptar una actitud más prudente y evitar tomar decisiones impulsivas.","spanish_cloze":"___ la complejidad de la situación actual, debemos adoptar una actitud más prudente y evitar tomar decisiones impulsivas.","spanish_answer":"Dada","pinyin":"Jiànyú dāngqián xíngshì de fùzáxìng, wǒmen bìxū cǎiqǔ gèngjiā jǐnshèn de tàidù, bìmiǎn zuòchū chōngdòng de juédìng."},{"id":"hsk5_22","level":5,"module":"HSK5","chinese_simp_full":"这个问题不仅涉及技术层面，更关乎伦理道德和社会责任，需要我们全面考量。","chinese_simp_cloze":"这个问题不仅涉及技术层面，更___伦理道德和社会责任，需要我们全面考量。","chinese_simp_answer":"关乎","chinese_trad_full":"這個問題不僅涉及技術層面，更關乎倫理道德和社會責任，需要我們全面考量。","chinese_trad_cloze":"這個問題不僅涉及技術層面，更___倫理道德和社會責任，需要我們全面考量。","chinese_trad_answer":"關乎","spanish_full":"Este problema no solo involucra aspectos técnicos, sino que además concierne a la ética moral y la responsabilidad social, requiriendo de nuestra consideración integral.","spanish_cloze":"Este problema no solo involucra aspectos técnicos, sino que además ___ a la ética moral y la responsabilidad social, requiriendo de nuestra consideración integral.","spanish_answer":"concierne","pinyin":"Zhège wèntí bùjǐn shèjí jìshù céngmiàn, gèng guānhū lúnlǐ dàodé hé shèhuì zérèn, xūyào wǒmen quánmiàn kǎoliáng."},{"id":"hsk5_23","level":5,"module":"HSK5","chinese_simp_full":"与其在原地等待机会降临，不如主动出击，创造属于自己的机遇。","chinese_simp_cloze":"___在原地等待机会降临，不如主动出击，创造属于自己的机遇。","chinese_simp_answer":"与其","chinese_trad_full":"與其在原地等待機會降臨，不如主動出擊，創造屬於自己的機遇。","chinese_trad_cloze":"___在原地等待機會降臨，不如主動出擊，創造屬於自己的機遇。","chinese_trad_answer":"與其","spanish_full":"En lugar de esperar pasivamente a que lleguen las oportunidades, es mejor tomar la iniciativa y crear tus propias oportunidades.","spanish_cloze":"___ de esperar pasivamente a que lleguen las oportunidades, es mejor tomar la iniciativa y crear tus propias oportunidades.","spanish_answer":"En lugar","pinyin":"Yǔqí zài yuándì děngdài jīhuì jiànglín, bùrú zhǔdòng chūjī, chuàngzào shǔyú zìjǐ de jīyù."},{"id":"hsk5_24","level":5,"module":"HSK5","chinese_simp_full":"由于缺乏有效的沟通机制，部门之间的协作出现了严重障碍，导致项目进度大幅延迟。","chinese_simp_cloze":"___缺乏有效的沟通机制，部门之间的协作出现了严重障碍，导致项目进度大幅延迟。","chinese_simp_answer":"由于","chinese_trad_full":"由於缺乏有效的溝通機制，部門之間的協作出現了嚴重障礙，導致項目進度大幅延遲。","chinese_trad_cloze":"___缺乏有效的溝通機制，部門之間的協作出現了嚴重障礙，導致項目進度大幅延遲。","chinese_trad_answer":"由於","spanish_full":"Debido a la falta de mecanismos de comunicación efectivos, surgieron graves obstáculos en la colaboración entre departamentos, lo que provocó un retraso significativo en el progreso del proyecto.","spanish_cloze":"___ a la falta de mecanismos de comunicación efectivos, surgieron graves obstáculos en la colaboración entre departamentos, lo que provocó un retraso significativo en el progreso del proyecto.","spanish_answer":"Debido","pinyin":"Yóuyú quēfá yǒuxiào de gōutōng jīzhì, bùmén zhījiān de xiézuò chūxiàn le yánzhòng zhàng'ài, dǎozhì xiàngmù jìndù dàfú yánchí."},{"id":"hsk5_25","level":5,"module":"HSK5","chinese_simp_full":"不管别人如何看待你的选择，只要你坚信这是正确的道路，就应该勇敢地走下去。","chinese_simp_cloze":"___别人如何看待你的选择，只要你坚信这是正确的道路，就应该勇敢地走下去。","chinese_simp_answer":"不管","chinese_trad_full":"不管別人如何看待你的選擇，只要你堅信這是正確的道路，就應該勇敢地走下去。","chinese_trad_cloze":"___別人如何看待你的選擇，只要你堅信這是正確的道路，就應該勇敢地走下去。","chinese_trad_answer":"不管","spanish_full":"Sin importar cómo los demás vean tu elección, mientras estés firmemente convencido de que es el camino correcto, debes caminar valientemente hacia adelante.","spanish_cloze":"___ cómo los demás vean tu elección, mientras estés firmemente convencido de que es el camino correcto, debes caminar valientemente hacia adelante.","spanish_answer":"Sin importar","pinyin":"Bùguǎn biérén rúhé kàndài nǐ de xuǎnzé, zhǐyào nǐ jiānxìn zhè shì zhèngquè de dàolù, jiù yīnggāi yǒnggǎn de zǒu xiàqù."},{"id":"hsk5_26","level":5,"module":"HSK5","chinese_simp_full":"为了促进可持续发展，政府出台了一系列环保政策，鼓励企业采用清洁能源技术。","chinese_simp_cloze":"为了___可持续发展，政府出台了一系列环保政策，鼓励企业采用清洁能源技术。","chinese_simp_answer":"促进","chinese_trad_full":"為了促進可持續發展，政府出台了一系列環保政策，鼓勵企業採用清潔能源技術。","chinese_trad_cloze":"為了___可持續發展，政府出台了一系列環保政策，鼓勵企業採用清潔能源技術。","chinese_trad_answer":"促進","spanish_full":"Para promover el desarrollo sostenible, el gobierno ha implementado una serie de políticas ambientales que animan a las empresas a adoptar tecnologías de energía limpia.","spanish_cloze":"Para ___ el desarrollo sostenible, el gobierno ha implementado una serie de políticas ambientales que animan a las empresas a adoptar tecnologías de energía limpia.","spanish_answer":"promover","pinyin":"Wèile cùjìn kěchíxù fāzhǎn, zhèngfǔ chūtái le yí xìliè huánbǎo zhèngcè, gǔlì qǐyè cǎiyòng qīngjié néngyuán jìshù."},{"id":"hsk5_27","level":5,"module":"HSK5","chinese_simp_full":"既然大家已经达成了共识，接下来就要制定详细的实施方案，确保各项工作有序推进。","chinese_simp_cloze":"___大家已经达成了共识，接下来就要制定详细的实施方案，确保各项工作有序推进。","chinese_simp_answer":"既然","chinese_trad_full":"既然大家已經達成了共識，接下來就要制定詳細的實施方案，確保各項工作有序推進。","chinese_trad_cloze":"___大家已經達成了共識，接下來就要制定詳細的實施方案，確保各項工作有序推進。","chinese_trad_answer":"既然","spanish_full":"Ya que todos han llegado a un consenso, el siguiente paso es formular un plan de implementación detallado para garantizar que todas las tareas avancen de manera ordenada.","spanish_cloze":"___ que todos han llegado a un consenso, el siguiente paso es formular un plan de implementación detallado para garantizar que todas las tareas avancen de manera ordenada.","spanish_answer":"Ya","pinyin":"Jìrán dàjiā yǐjīng dáchéng le gòngshí, jiēxiàlái jiù yào zhìdìng xiángxì de shíshī fāng'àn, quèbǎo gè xiàng gōngzuò yǒuxù tuījìn."},{"id":"hsk5_28","level":5,"module":"HSK5","chinese_simp_full":"随着人工智能技术的突破，许多传统行业正面临着前所未有的转型压力和挑战。","chinese_simp_cloze":"___人工智能技术的突破，许多传统行业正面临着前所未有的转型压力和挑战。","chinese_simp_answer":"随着","chinese_trad_full":"隨著人工智能技術的突破，許多傳統行業正面臨著前所未有的轉型壓力和挑戰。","chinese_trad_cloze":"___人工智能技術的突破，許多傳統行業正面臨著前所未有的轉型壓力和挑戰。","chinese_trad_answer":"隨著","spanish_full":"Con los avances en la tecnología de inteligencia artificial, muchas industrias tradicionales están enfrentando presiones y desafíos de transformación sin precedentes.","spanish_cloze":"___ los avances en la tecnología de inteligencia artificial, muchas industrias tradicionales están enfrentando presiones y desafíos de transformación sin precedentes.","spanish_answer":"Con","pinyin":"Suízhe réngōng zhìnéng jìshù de tūpò, xǔduō chuántǒng hángyè zhèng miànlín zhe qiánsuǒwèiyǒu de zhuǎnxíng yālì hé tiǎozhàn."},{"id":"hsk5_29","level":5,"module":"HSK5","chinese_simp_full":"他之所以能够在学术界享有盛誉，是因为他始终坚持严谨的治学态度和开放的学术视野。","chinese_simp_cloze":"他之所以能够在学术界享有盛誉，是因为他始终坚持___的治学态度和开放的学术视野。","chinese_simp_answer":"严谨","chinese_trad_full":"他之所以能夠在學術界享有盛譽，是因為他始終堅持嚴謹的治學態度和開放的學術視野。","chinese_trad_cloze":"他之所以能夠在學術界享有盛譽，是因為他始終堅持___的治學態度和開放的學術視野。","chinese_trad_answer":"嚴謹","spanish_full":"La razón por la que goza de gran prestigio en el ámbito académico se debe a que siempre ha mantenido una actitud rigurosa hacia el estudio y una visión académica abierta.","spanish_cloze":"La razón por la que goza de gran prestigio en el ámbito académico se debe a que siempre ha mantenido una actitud ___ hacia el estudio y una visión académica abierta.","spanish_answer":"rigurosa","pinyin":"Tā zhī suǒyǐ nénggòu zài xuéshùjiè xiǎngyǒu shèngyù, shì yīnwèi tā shǐzhōng jiānchí yánjǐn de zhìxué tàidù hé kāifàng de xuéshù shìyě."},{"id":"hsk5_30","level":5,"module":"HSK5","chinese_simp_full":"对于这个敏感议题，我们需要格外注意言辞的分寸，以免引发不必要的争议和对立。","chinese_simp_cloze":"___这个敏感议题，我们需要格外注意言辞的分寸，以免引发不必要的争议和对立。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個敏感議題，我們需要格外注意言辭的分寸，以免引發不必要的爭議和對立。","chinese_trad_cloze":"___這個敏感議題，我們需要格外注意言辭的分寸，以免引發不必要的爭議和對立。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este tema sensible, debemos prestar especial atención a la mesura en nuestras palabras para evitar provocar controversias y confrontaciones innecesarias.","spanish_cloze":"___ este tema sensible, debemos prestar especial atención a la mesura en nuestras palabras para evitar provocar controversias y confrontaciones innecesarias.","spanish_answer":"Con respecto a","pinyin":"Duìyú zhège mǐngǎn yìtí, wǒmen xūyào géwài zhùyì yáncí de fēncùn, yǐmiǎn yǐnfā bù bìyào de zhēngyì hé duìlì."},{"id":"hsk5_31","level":5,"module":"HSK5","chinese_simp_full":"只有当我们真正学会换位思考，才能消除偏见，建立起基于相互理解的和谐关系。","chinese_simp_cloze":"___当我们真正学会换位思考，才能消除偏见，建立起基于相互理解的和谐关系。","chinese_simp_answer":"只有","chinese_trad_full":"只有當我們真正學會換位思考，才能消除偏見，建立起基於相互理解的和諧關係。","chinese_trad_cloze":"___當我們真正學會換位思考，才能消除偏見，建立起基於相互理解的和諧關係。","chinese_trad_answer":"只有","spanish_full":"Solo cuando realmente aprendamos a ponernos en el lugar del otro podremos eliminar los prejuicios y construir relaciones armoniosas basadas en la comprensión mutua.","spanish_cloze":"___ cuando realmente aprendamos a ponernos en el lugar del otro podremos eliminar los prejuicios y construir relaciones armoniosas basadas en la comprensión mutua.","spanish_answer":"Solo","pinyin":"Zhǐyǒu dāng wǒmen zhēnzhèng xuéhuì huànwèi sīkǎo, cái néng xiāochú piānjiàn, jiànlì qǐ jīyú xiānghù lǐjiě de héxié guānxì."},{"id":"hsk5_32","level":5,"module":"HSK5","chinese_simp_full":"尽管经历了多次失败，但他从未放弃过对梦想的追求，这种坚韧不拔的精神令人敬佩。","chinese_simp_cloze":"___经历了多次失败，但他从未放弃过对梦想的追求，这种坚韧不拔的精神令人敬佩。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管經歷了多次失敗，但他從未放棄過對夢想的追求，這種堅韌不拔的精神令人敬佩。","chinese_trad_cloze":"___經歷了多次失敗，但他從未放棄過對夢想的追求，這種堅韌不拔的精神令人敬佩。","chinese_trad_answer":"儘管","spanish_full":"Aunque ha experimentado múltiples fracasos, nunca ha abandonado la búsqueda de sus sueños; esta espíritu de perseverancia inquebrantable es digno de admiración.","spanish_cloze":"___ ha experimentado múltiples fracasos, nunca ha abandonado la búsqueda de sus sueños; esta espíritu de perseverancia inquebrantable es digno de admiración.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn jīnglì le duōcì shībài, dàn tā cóngwèi fàngqì guò duì mèngxiǎng de zhuīqiú, zhè zhǒng jiānrèn bùbá de jīngshén lìng rén jìngpèi."},{"id":"hsk5_33","level":5,"module":"HSK5","chinese_simp_full":"由于气候变化导致的极端天气事件频发，各国政府不得不加强防灾减灾体系建设。","chinese_simp_cloze":"___气候变化导致的极端天气事件频发，各国政府不得不加强防灾减灾体系建设。","chinese_simp_answer":"由于","chinese_trad_full":"由於氣候變化導致的極端天氣事件頻發，各國政府不得不加強防災減災體系建設。","chinese_trad_cloze":"___氣候變化導致的極端天氣事件頻發，各國政府不得不加強防災減災體系建設。","chinese_trad_answer":"由於","spanish_full":"Debido a la frecuente ocurrencia de eventos climáticos extremos causados por el cambio climático, los gobiernos de diversos países se han visto obligados a fortalecer sus sistemas de prevención y reducción de desastres.","spanish_cloze":"___ a la frecuente ocurrencia de eventos climáticos extremos causados por el cambio climático, los gobiernos de diversos países se han visto obligados a fortalecer sus sistemas de prevención y reducción de desastres.","spanish_answer":"Debido","pinyin":"Yóuyú qìhòu biànhuà dǎozhì de jíduān tiānqì shìjiàn pínfā, gèguó zhèngfǔ bùdébù jiāqiáng fángzāi jiǎnzāi tǐxì jiànshè."},{"id":"hsk5_34","level":5,"module":"HSK5","chinese_simp_full":"不管未来充满多少不确定性，只要我们保持学习和成长的心态，就能在变化中找到机遇。","chinese_simp_cloze":"___未来充满多少不确定性，只要我们保持学习和成长的心态，就能在变化中找到机遇。","chinese_simp_answer":"不管","chinese_trad_full":"不管未來充滿多少不確定性，只要我們保持學習和成長的心態，就能在變化中找到機遇。","chinese_trad_cloze":"___未來充滿多少不確定性，只要我們保持學習和成長的心態，就能在變化中找到機遇。","chinese_trad_answer":"不管","spanish_full":"Sin importar cuánta incertidumbre depare el futuro, mientras mantengamos una mentalidad de aprendizaje y crecimiento, podremos encontrar oportunidades en medio del cambio.","spanish_cloze":"___ cuánta incertidumbre depare el futuro, mientras mantengamos una mentalidad de aprendizaje y crecimiento, podremos encontrar oportunidades en medio del cambio.","spanish_answer":"Sin importar","pinyin":"Bùguǎn wèilái chōngmǎn duōshǎo bù quèdìngxìng, zhǐyào wǒmen bǎochí xuéxí hé chéngzhǎng de xīntài, jiù néng zài biànhuà zhōng zhǎodào jīyù."},{"id":"hsk5_35","level":5,"module":"HSK5","chinese_simp_full":"通过这次深刻的自我反省，他终于认识到自己过去的不足，并决心彻底改正这些缺点。","chinese_simp_cloze":"___这次深刻的自我反省，他终于认识到自己过去的不足，并决心彻底改正这些缺点。","chinese_simp_answer":"通过","chinese_trad_full":"通過這次深刻的自我反省，他終於認識到自己過去的不足，並決心徹底改正這些缺點。","chinese_trad_cloze":"___這次深刻的自我反省，他終於認識到自己過去的不足，並決心徹底改正這些缺點。","chinese_trad_answer":"通過","spanish_full":"A través de esta profunda introspección, finalmente reconoció sus deficiencias pasadas y determinó corregir por completo estos defectos.","spanish_cloze":"___ esta profunda introspección, finalmente reconoció sus deficiencias pasadas y determinó corregir por completo estos defectos.","spanish_answer":"A través de","pinyin":"Tōngguò zhè cì shēnkè de zìwǒ fǎnxǐng, tā zhōngyú rènshi dào zìjǐ guòqù de bùzú, bìng juéxīn chèdǐ gǎizhèng zhèxiē quēdiǎn."},{"id":"hsk5_36","level":5,"module":"HSK5","chinese_simp_full":"既然踏上了这条创业之路，就要做好迎接一切挑战的准备，哪怕前方荆棘密布。","chinese_simp_cloze":"___踏上了这条创业之路，就要做好迎接一切挑战的准备，哪怕前方荆棘密布。","chinese_simp_answer":"既然","chinese_trad_full":"既然踏上了這條創業之路，就要做好迎接一切挑戰的準備，哪怕前方荊棘密佈。","chinese_trad_cloze":"___踏上了這條創業之路，就要做好迎接一切挑戰的準備，哪怕前方荊棘密佈。","chinese_trad_answer":"既然","spanish_full":"Ya que has emprendido este camino empresarial, debes estar preparado para enfrentar todos los desafíos, incluso si el camino ahead está lleno de espinas.","spanish_cloze":"___ que has emprendido este camino empresarial, debes estar preparado para enfrentar todos los desafíos, incluso si el camino ahead está lleno de espinas.","spanish_answer":"Ya","pinyin":"Jìrán tàshàng le zhè tiáo chuàngyè zhī lù, jiù yào zuò hǎo yíngjiē yíqiè tiǎozhàn de zhǔnbèi, nǎpà qiánfāng jīngjí mìbù."},{"id":"hsk5_37","level":5,"module":"HSK5","chinese_simp_full":"随着数字经济的蓬勃发展，传统的商业模式正经历着深刻的变革和重塑。","chinese_simp_cloze":"___数字经济的蓬勃发展，传统的商业模式正经历着深刻的变革和重塑。","chinese_simp_answer":"随着","chinese_trad_full":"隨著數字經濟的蓬勃發展，傳統的商業模式正經歷著深刻的變革和重塑。","chinese_trad_cloze":"___數字經濟的蓬勃發展，傳統的商業模式正經歷著深刻的變革和重塑。","chinese_trad_answer":"隨著","spanish_full":"Con el vigoroso desarrollo de la economía digital, los modelos de negocio tradicionales están experimentando una profunda transformación y reconfiguración.","spanish_cloze":"___ el vigoroso desarrollo de la economía digital, los modelos de negocio tradicionales están experimentando una profunda transformación y reconfiguración.","spanish_answer":"Con","pinyin":"Suízhe shùzì jīngjì de péngbó fāzhǎn, chuántǒng de shāngyè móshì zhèng jīnglì zhe shēnkè de biàngé hé chóngsù."},{"id":"hsk5_38","level":5,"module":"HSK5","chinese_simp_full":"他之所以能够赢得团队的信任，是因为他始终秉持公平公正的原则处理每一件事务。","chinese_simp_cloze":"他之所以能够赢得团队的信任，是因为他始终秉持公平___的原则处理每一件事务。","chinese_simp_answer":"公正","chinese_trad_full":"他之所以能夠贏得團隊的信任，是因為他始終秉持公平公正的原則處理每一件事務。","chinese_trad_cloze":"他之所以能夠贏得團隊的信任，是因為他始終秉持公平___的原則處理每一件事務。","chinese_trad_answer":"公正","spanish_full":"La razón por la que pudo ganar la confianza del equipo es porque siempre ha actuado con principios de justicia e imparcialidad al manejar cada asunto.","spanish_cloze":"La razón por la que pudo ganar la confianza del equipo es porque siempre ha actuado con principios de ___ e imparcialidad al manejar cada asunto.","spanish_answer":"justicia","pinyin":"Tā zhī suǒyǐ nénggòu yíngdé tuánduì de xìnrèn, shì yīnwèi tā shǐzhōng bǐngchí gōngzhèng gōngpíng de yuánzé chǔlǐ měi yí jiàn shìwù."},{"id":"hsk5_39","level":5,"module":"HSK5","chinese_simp_full":"对于这个复杂的社会现象，我们不能简单地用非黑即白的二元思维去评判。","chinese_simp_cloze":"___这个复杂的社会现象，我们不能简单地用非黑即白的二元思维去评判。","chinese_simp_answer":"对于","chinese_trad_full":"對於這個複雜的社會現象，我們不能簡單地用非黑即白的二元思維去評判。","chinese_trad_cloze":"___這個複雜的社會現象，我們不能簡單地用非黑即白的二元思維去評判。","chinese_trad_answer":"對於","spanish_full":"Con respecto a este complejo fenómeno social, no podemos juzgarlo simplemente con un pensamiento binario de blanco o negro.","spanish_cloze":"___ este complejo fenómeno social, no podemos juzgarlo simplemente con un pensamiento binario de blanco o negro.","spanish_answer":"Con respecto a","pinyin":"Duìyú zhège fùzá de shèhuì xiànxiàng, wǒmen bùnéng jiǎndān de yòng fēihēijíbái de èryuán sīwéi qù píngpàn."},{"id":"hsk5_40","level":5,"module":"HSK5","chinese_simp_full":"只要我们还保留着对美好事物的向往和追求，生活就永远不会失去色彩和希望。","chinese_simp_cloze":"___我们还保留着对美好事物的向往和追求，生活就永远不会失去色彩和希望。","chinese_simp_answer":"只要","chinese_trad_full":"只要我們還保留著對美好事物的嚮往和追求，生活就永遠不會失去色彩和希望。","chinese_trad_cloze":"___我們還保留著對美好事物的嚮往和追求，生活就永遠不會失去色彩和希望。","chinese_trad_answer":"只要","spanish_full":"Siempre que conservemos la aspiración y la búsqueda de las cosas bellas, la vida nunca perderá su color ni su esperanza.","spanish_cloze":"___ conservemos la aspiración y la búsqueda de las cosas bellas, la vida nunca perderá su color ni su esperanza.","spanish_answer":"Siempre que","pinyin":"Zhǐyào wǒmen hái bǎoliú zhe duì měihǎo shìwù de xiàngwǎng hé zhuīqiú, shēnghuó jiù yǒngyuǎn bú huì shīqù sècǎi hé xīwàng."},{"id":"hsk5_41","level":5,"module":"HSK5","chinese_simp_full":"在信息爆炸的时代，培养独立思考和批判性思维能力比单纯积累知识更为重要。","chinese_simp_cloze":"在信息爆炸的时代，培养独立思考和___性思维能力比单纯积累知识更为重要。","chinese_simp_answer":"批判","chinese_trad_full":"在信息爆炸的時代，培養獨立思考和批判性思維能力比單純積累知識更為重要。","chinese_trad_cloze":"在信息爆炸的時代，培養獨立思考和___性思維能力比單純積累知識更為重要。","chinese_trad_answer":"批判","spanish_full":"En la era de la explosión informativa, cultivar la capacidad de pensamiento independiente y crítico es más importante que simplemente acumular conocimientos.","spanish_cloze":"En la era de la explosión informativa, cultivar la capacidad de pensamiento independiente y ___ es más importante que simplemente acumular conocimientos.","spanish_answer":"crítico","pinyin":"Zài xìnxī bàozhà de shídài, péiyǎng dúlì sīkǎo hé pīpàn xìng sīwéi nénglì bǐ dānchún jīlěi zhīshi gèngwéi zhòngyào."},{"id":"hsk5_42","level":5,"module":"HSK5","chinese_simp_full":"尽管人工智能可以替代许多重复性工作，但它永远无法取代人类的创造力和情感共鸣。","chinese_simp_cloze":"___人工智能可以替代许多重复性工作，但它永远无法取代人类的创造力和情感共鸣。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管人工智能可以替代許多重複性工作，但它永遠無法取代人類的創造力和情感共鳴。","chinese_trad_cloze":"___人工智能可以替代許多重複性工作，但它永遠無法取代人類的創造力和情感共鳴。","chinese_trad_answer":"儘管","spanish_full":"Aunque la inteligencia artificial puede reemplazar muchas tareas repetitivas, nunca podrá sustituir la creatividad humana ni la resonancia emocional.","spanish_cloze":"___ la inteligencia artificial puede reemplazar muchas tareas repetitivas, nunca podrá sustituir la creatividad humana ni la resonancia emocional.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn réngōng zhìnéng kěyǐ tìdài xǔduō chóngfùxìng gōngzuò, dàn tā yǒngyuǎn wúfǎ qǔdài rénlèi de chuàngzàolì hé qínggǎn gòngmíng."},{"id":"hsk5_43","level":5,"module":"HSK5","chinese_simp_full":"由于全球供应链的中断，许多企业不得不重新评估其生产布局和物流策略。","chinese_simp_cloze":"___全球供应链的中断，许多企业不得不重新评估其生产布局和物流策略。","chinese_simp_answer":"由于","chinese_trad_full":"由於全球供應鏈的中斷，許多企業不得不重新評估其生產佈局和物流策略。","chinese_trad_cloze":"___全球供應鏈的中斷，許多企業不得不重新評估其生產佈局和物流策略。","chinese_trad_answer":"由於","spanish_full":"Debido a la interrupción de las cadenas de suministro globales, muchas empresas se han visto obligadas a reevaluar su configuración productiva y estrategias logísticas.","spanish_cloze":"___ a la interrupción de las cadenas de suministro globales, muchas empresas se han visto obligadas a reevaluar su configuración productiva y estrategias logísticas.","spanish_answer":"Debido","pinyin":"Yóuyú quánqiú gōngyìngliàn de zhōngduàn, xǔduō qǐyè bùdébù chóngxīn pínggū qí shēngchǎn bùjú hé wùliú cèlüè."},{"id":"hsk5_44","level":5,"module":"HSK5","chinese_simp_full":"不管技术如何进步，教育的本质始终是点燃学生内心的火焰，而非仅仅灌输知识。","chinese_simp_cloze":"___技术如何进步，教育的本质始终是点燃学生内心的火焰，而非仅仅灌输知识。","chinese_simp_answer":"不管","chinese_trad_full":"不管技術如何進步，教育的本質始終是點燃學生內心的火焰，而非僅僅灌輸知識。","chinese_trad_cloze":"___技術如何進步，教育的本質始終是點燃學生內心的火焰，而非僅僅灌輸知識。","chinese_trad_answer":"不管","spanish_full":"Sin importar cuánto avance la tecnología, la esencia de la educación siempre será encender la llama interior de los estudiantes, no simplemente transmitirles conocimientos.","spanish_cloze":"___ cuánto avance la tecnología, la esencia de la educación siempre será encender la llama interior de los estudiantes, no simplemente transmitirles conocimientos.","spanish_answer":"Sin importar","pinyin":"Bùguǎn jìshù rúhé jìnbù, jiàoyù de běnzhì shǐzhōng shì diǎnrán xuéshēng nèixīn de huǒyàn, ér fēi jǐnjǐn guànshū zhīshi."},{"id":"hsk5_45","level":5,"module":"HSK5","chinese_simp_full":"通过跨学科的合作研究，科学家们成功破解了这一困扰学界多年的难题。","chinese_simp_cloze":"___跨学科的合作研究，科学家们成功破解了这一困扰学界多年的难题。","chinese_simp_answer":"通过","chinese_trad_full":"通過跨學科的合作研究，科學家們成功破解了這一困擾學界多年的難題。","chinese_trad_cloze":"___跨學科的合作研究，科學家們成功破解了這一困擾學界多年的難題。","chinese_trad_answer":"通過","spanish_full":"Mediante la investigación colaborativa interdisciplinaria, los científicos lograron resolver este problema que había desconcertado a la comunidad académica durante años.","spanish_cloze":"___ la investigación colaborativa interdisciplinaria, los científicos lograron resolver este problema que había desconcertado a la comunidad académica durante años.","spanish_answer":"Mediante","pinyin":"Tōngguò kuà xuékē de hézuò yánjiū, kēxuéjiāmen chénggōng pòjiě le zhè yí kùnrǎo xuéjiè duōnián de nántí."},{"id":"hsk5_46","level":5,"module":"HSK5","chinese_simp_full":"鉴于人口老龄化趋势加剧，完善养老保障体系已成为当务之急。","chinese_simp_cloze":"___人口老龄化趋势加剧，完善养老保障体系已成为当务之急。","chinese_simp_answer":"鉴于","chinese_trad_full":"鑑於人口老齡化趨勢加劇，完善養老保障體系已成為當務之急。","chinese_trad_cloze":"___人口老齡化趨勢加劇，完善養老保障體系已成為當務之急。","chinese_trad_answer":"鑑於","spanish_full":"Dada la aceleración de la tendencia al envejecimiento poblacional, perfeccionar el sistema de seguridad social para la tercera edad se ha convertido en una prioridad urgente.","spanish_cloze":"___ la aceleración de la tendencia al envejecimiento poblacional, perfeccionar el sistema de seguridad social para la tercera edad se ha convertido en una prioridad urgente.","spanish_answer":"Dada","pinyin":"Jiànyú rénkǒu lǎolíng huà qūshì jiājù, wánshàn yǎnglǎo bǎozhàng tǐxì yǐ chéngwéi dāngwùzhījí."},{"id":"hsk5_47","level":5,"module":"HSK5","chinese_simp_full":"这个问题不仅影响个人发展，更关系到整个社会的公平正义与和谐稳定。","chinese_simp_cloze":"这个问题不仅影响个人发展，更___到整个社会的公平正义与和谐稳定。","chinese_simp_answer":"关系","chinese_trad_full":"這個問題不僅影響個人發展，更關係到整個社會的公平正義與和諧穩定。","chinese_trad_cloze":"這個問題不僅影響個人發展，更___到整個社會的公平正義與和諧穩定。","chinese_trad_answer":"關係","spanish_full":"Este problema no solo afecta el desarrollo personal, sino que además concierne a la justicia, equidad, armonía y estabilidad de toda la sociedad.","spanish_cloze":"Este problema no solo afecta el desarrollo personal, sino que además ___ a la justicia, equidad, armonía y estabilidad de toda la sociedad.","spanish_answer":"concierne","pinyin":"Zhège wèntí bùjǐn yǐngxiǎng gèrén fāzhǎn, gèng guānxì dào zhěngge shèhuì de gōngpíng zhèngyì yǔ héxié wěndìng."},{"id":"hsk5_48","level":5,"module":"HSK5","chinese_simp_full":"与其沉迷于虚拟世界的短暂快乐，不如在现实生活中寻找真正的意义和价值。","chinese_simp_cloze":"___沉迷于虚拟世界的短暂快乐，不如在现实生活中寻找真正的意义和价值。","chinese_simp_answer":"与其","chinese_trad_full":"與其沉迷於虛擬世界的短暫快樂，不如在現實生活中尋找真正的意義和價值。","chinese_trad_cloze":"___沉迷於虛擬世界的短暫快樂，不如在現實生活中尋找真正的意義和價值。","chinese_trad_answer":"與其","spanish_full":"En lugar de sumergirse en la felicidad efímera del mundo virtual, sería mejor buscar el verdadero significado y valor en la vida real.","spanish_cloze":"___ de sumergirse en la felicidad efímera del mundo virtual, sería mejor buscar el verdadero significado y valor en la vida real.","spanish_answer":"En lugar","pinyin":"Yǔqí chénmí yú xūnǐ shìjiè de duǎnzàn kuàilè, bùrú zài xiànshí shēnghuó zhōng xúnzhǎo zhēnzhèng de yìyì hé jiàzhí."},{"id":"hsk5_49","level":5,"module":"HSK5","chinese_simp_full":"由于过度依赖自动化系统，一旦出现故障，整个生产线就会陷入瘫痪状态。","chinese_simp_cloze":"___过度依赖自动化系统，一旦出现故障，整个生产线就会陷入瘫痪状态。","chinese_simp_answer":"由于","chinese_trad_full":"由於過度依賴自動化系統，一旦出現故障，整個生產線就會陷入癱瘓狀態。","chinese_trad_cloze":"___過度依賴自動化系統，一旦出現故障，整個生產線就會陷入癱瘓狀態。","chinese_trad_answer":"由於","spanish_full":"Debido a la excesiva dependencia de los sistemas automatizados, toda la línea de producción caerá en un estado de parálisis en cuanto se produzca una falla.","spanish_cloze":"___ a la excesiva dependencia de los sistemas automatizados, toda la línea de producción caerá en un estado de parálisis en cuanto se produzca una falla.","spanish_answer":"Debido","pinyin":"Yóuyú guòdù yīlài zìdònghuà xìtǒng, yídàn chūxiàn gùzhàng, zhěngge shēngchǎnxiàn jiù huì xiànrù tānhuàn zhuàngtài."},{"id":"hsk5_50","level":5,"module":"HSK5","chinese_simp_full":"不管身处何种逆境，保持内心的光明与希望，是我们穿越黑暗、走向新生的唯一灯塔。","chinese_simp_cloze":"___身处何种逆境，保持内心的光明与希望，是我们穿越黑暗、走向新生的唯一灯塔。","chinese_simp_answer":"不管","chinese_trad_full":"不管身處何種逆境，保持內心的光明與希望，是我們穿越黑暗、走向新生的唯一燈塔。","chinese_trad_cloze":"___身處何種逆境，保持內心的光明與希望，是我們穿越黑暗、走向新生的唯一燈塔。","chinese_trad_answer":"不管","spanish_full":"Sin importar en qué adversidad nos encontremos, mantener la luz y la esperanza interior es el único faro que nos guía a través de la oscuridad hacia un nuevo comienzo.","spanish_cloze":"___ en qué adversidad nos encontremos, mantener la luz y la esperanza interior es el único faro que nos guía a través de la oscuridad hacia un nuevo comienzo.","spanish_answer":"Sin importar","pinyin":"Bùguǎn shēnchǔ hézhǒng nìjìng, bǎochí nèixīn de guāngmíng yǔ xīwàng, shì wǒmen chuānyuè hēi'àn, zǒuxiàng xīnshēng de wéiyī dēngtǎ."},{"id":"hsk5_51","level":5,"module":"HSK5","chinese_simp_full":"面对陌生的环境，他难免会感到紧张和不安，这是完全正常的反应。","chinese_simp_cloze":"___陌生的环境，他难免会感到紧张和不安，这是完全正常的反应。","chinese_simp_answer":"面对","chinese_trad_full":"面對陌生的環境，他難免會感到緊張和不安，這是完全正常的反應。","chinese_trad_cloze":"___陌生的環境，他難免會感到緊張和不安，這是完全正常的反應。","chinese_trad_answer":"面對","spanish_full":"Al enfrentarse a un entorno desconocido, es inevitable que sienta nerviosismo e inquietud; esta es una reacción completamente normal.","spanish_cloze":"Al ___se a un entorno desconocido, es inevitable que sienta nerviosismo e inquietud; esta es una reacción completamente normal.","spanish_answer":"enfrentar","pinyin":"Miànduì mòshēng de huánjìng, tā nánmiǎn huì gǎndào jǐnzhāng hé bù'ān, zhè shì wánquán zhèngcháng de fǎnyìng."},{"id":"hsk5_52","level":5,"module":"HSK5","chinese_simp_full":"哪怕工作再忙，他也坚持每天抽出半小时阅读，这种习惯让他受益匪浅。","chinese_simp_cloze":"___工作再忙，他也坚持每天抽出半小时阅读，这种习惯让他受益匪浅。","chinese_simp_answer":"哪怕","chinese_trad_full":"哪怕工作再忙，他也堅持每天抽出半小時閱讀，這種習慣讓他受益匪淺。","chinese_trad_cloze":"___工作再忙，他也堅持每天抽出半小時閱讀，這種習慣讓他受益匪淺。","chinese_trad_answer":"哪怕","spanish_full":"Incluso si el trabajo es muy ocupado, él insiste en dedicar media hora diaria a la lectura; este hábito le ha traído grandes beneficios.","spanish_cloze":"___ si el trabajo es muy ocupado, él insiste en dedicar media hora diaria a la lectura; este hábito le ha traído grandes beneficios.","spanish_answer":"Incluso","pinyin":"Nǎpà gōngzuò zài máng, tā yě jiānchí měitiān chōuchū bàn xiǎoshí yuèdú, zhè zhǒng xíguàn ràng tā shòuyìfěiqiǎn."},{"id":"hsk5_53","level":5,"module":"HSK5","chinese_simp_full":"由于缺乏经验，他在处理复杂问题时显得有些犹豫不决，需要更多的指导和鼓励。","chinese_simp_cloze":"由于___经验，他在处理复杂问题时显得有些犹豫不决，需要更多的指导和鼓励。","chinese_simp_answer":"缺乏","chinese_trad_full":"由於缺乏經驗，他在處理複雜問題時顯得有些猶豫不決，需要更多的指導和鼓勵。","chinese_trad_cloze":"由於___經驗，他在處理複雜問題時顯得有些猶豫不決，需要更多的指導和鼓勵。","chinese_trad_answer":"缺乏","spanish_full":"Debido a la falta de experiencia, al manejar problemas complejos parece algo indeciso y necesita más orientación y estímulo.","spanish_cloze":"Debido a la ___ de experiencia, al manejar problemas complejos parece algo indeciso y necesita más orientación y estímulo.","spanish_answer":"falta","pinyin":"Yóuyú quēfá jīngyàn, tā zài chǔlǐ fùzá wèntí shí xiǎnde yǒuxiē yóuyùbùjué, xūyào gèng duō de zhǐdǎo hé gǔlì."},{"id":"hsk5_54","level":5,"module":"HSK5","chinese_simp_full":"与其羡慕别人的成功，不如脚踏实地地努力，创造属于自己的奇迹。","chinese_simp_cloze":"___羡慕别人的成功，不如脚踏实地地努力，创造属于自己的奇迹。","chinese_simp_answer":"与其","chinese_trad_full":"與其羨慕別人的成功，不如腳踏實地地努力，創造屬於自己的奇蹟。","chinese_trad_cloze":"___羨慕別人的成功，不如腳踏實地地努力，創造屬於自己的奇蹟。","chinese_trad_answer":"與其","spanish_full":"En lugar de envidiar el éxito ajeno, sería mejor esforzarse con los pies en la tierra y crear tus propios milagros.","spanish_cloze":"___ de envidiar el éxito ajeno, sería mejor esforzarse con los pies en la tierra y crear tus propios milagros.","spanish_answer":"En lugar","pinyin":"Yǔqí xiànmù biérén de chénggōng, bùrú jiǎotàshídì de nǔlì, chuàngzào shǔyú zìjǐ de qíjì."},{"id":"hsk5_55","level":5,"module":"HSK5","chinese_simp_full":"尽管这个任务非常艰巨，但团队成员们依然保持着高昂的士气，决心按时完成目标。","chinese_simp_cloze":"___这个任务非常艰巨，但团队成员们依然保持着高昂的士气，决心按时完成目标。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管這個任務非常艱鉅，但團隊成員們依然保持著高昂的士氣，決心按時完成目標。","chinese_trad_cloze":"___這個任務非常艱鉅，但團隊成員們依然保持著高昂的士氣，決心按時完成目標。","chinese_trad_answer":"儘管","spanish_full":"Aunque esta tarea es muy ardua, los miembros del equipo siguen manteniendo una moral alta, determinados a completar el objetivo a tiempo.","spanish_cloze":"___ esta tarea es muy ardua, los miembros del equipo siguen manteniendo una moral alta, determinados a completar el objetivo a tiempo.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn zhège rènwu fēicháng jiānjù, dàn tuánduì chéngyuánmen yīrán bǎochí zhe gāo'áng de shìqì, juéxīn ànshí wánchéng mùbiāo."},{"id":"hsk5_56","level":5,"module":"HSK5","chinese_simp_full":"随着人工智能技术的快速发展，许多传统行业正面临着前所未有的转型压力和挑战。","chinese_simp_cloze":"___人工智能技术的快速发展，许多传统行业正面临着前所未有的转型压力和挑战。","chinese_simp_answer":"随着","chinese_trad_full":"隨著人工智能技術的快速發展，許多傳統行業正面臨著前所未有的轉型壓力和挑戰。","chinese_trad_cloze":"___人工智能技術的快速發展，許多傳統行業正面臨著前所未有的轉型壓力和挑戰。","chinese_trad_answer":"隨著","spanish_full":"Con el rápido desarrollo de la tecnología de inteligencia artificial, muchas industrias tradicionales están enfrentando presiones y desafíos de transformación sin precedentes.","spanish_cloze":"___ el rápido desarrollo de la tecnología de inteligencia artificial, muchas industrias tradicionales están enfrentando presiones y desafíos de transformación sin precedentes.","spanish_answer":"Con","pinyin":"Suízhe réngōng zhìnéng jìshù de kuàisù fāzhǎn, xǔduō chuántǒng hángyè zhèng miànlín zhe qiánsuǒwèiyǒu de zhuǎnxíng yālì hé tiǎozhàn."},{"id":"hsk5_90","level":5,"module":"HSK5","chinese_simp_full":"尽管经历了多次失败，但他从未放弃过对梦想的追求，这种坚韧不拔的精神令人敬佩。","chinese_simp_cloze":"___经历了多次失败，但他从未放弃过对梦想的追求，这种坚韧不拔的精神令人敬佩。","chinese_simp_answer":"尽管","chinese_trad_full":"儘管經歷了多次失敗，但他從未放棄過對夢想的追求，這種堅韌不拔的精神令人敬佩。","chinese_trad_cloze":"___經歷了多次失敗，但他從未放棄過對夢想的追求，這種堅韌不拔的精神令人敬佩。","chinese_trad_answer":"儘管","spanish_full":"Aunque ha experimentado múltiples fracasos, nunca ha abandonado la búsqueda de sus sueños; este espíritu de perseverancia inquebrantable es digno de admiración.","spanish_cloze":"___ ha experimentado múltiples fracasos, nunca ha abandonado la búsqueda de sus sueños; este espíritu de perseverancia inquebrantable es digno de admiración.","spanish_answer":"Aunque","pinyin":"Jǐnguǎn jīnglì le duōcì shībài, dàn tā cóngwèi fàngqì guò duì mèngxiǎng de zhuīqiú, zhè zhǒng jiānrèn bùbá de jīngshén lìng rén jìngpèi."}],
'HSK6': [{"id":"hsk6_01","level":6,"module":"HSK6","chinese_simp_full":"他挨了批评，心里很难受。","chinese_simp_cloze":"他___了批评，心里很难受。","chinese_simp_answer":"挨","chinese_trad_full":"他捱了批評，心裡很難受。","chinese_trad_cloze":"他___了批評，心裡很難受。","chinese_trad_answer":"挨","spanish_full":"Sufrió una crítica y se sintió muy mal.","spanish_cloze":"___ una crítica y se sintió muy mal.","spanish_answer":"Sufrió","pinyin":"Tā ái le pīpíng, xīnlǐ hěn nánshòu."},{"id":"hsk6_02","level":6,"module":"HSK6","chinese_simp_full":"医学研究正在寻找治疗癌症的新方法。","chinese_simp_cloze":"医学研究正在寻找治疗___的新方法。","chinese_simp_answer":"癌症","chinese_trad_full":"醫學研究正在尋找治療癌症的新方法。","chinese_trad_cloze":"醫學研究正在尋找治療___的新方法。","chinese_trad_answer":"癌症","spanish_full":"La investigación médica está buscando nuevos métodos para tratar el cáncer.","spanish_cloze":"La investigación médica está buscando nuevos métodos para tratar el ___.","spanish_answer":"cáncer","pinyin":"Yīxué yánjiū zhèngzài xúnzhǎo zhìliáo áizhèng de xīn fāngfǎ."},{"id":"hsk6_03","level":6,"module":"HSK6","chinese_simp_full":"他们两个的关系很暧昧，谁也说不清。","chinese_simp_cloze":"他们两个的关系很___，谁也说不清。","chinese_simp_answer":"暧昧","chinese_trad_full":"他們兩個的關係很曖昧，誰也說不清。","chinese_trad_cloze":"他們兩個的關係很___，誰也說不清。","chinese_trad_answer":"曖昧","spanish_full":"La relación entre los dos es muy ambigua, nadie la sabe explicar bien.","spanish_cloze":"La relación entre los dos es muy ___, nadie la sabe explicar bien.","spanish_answer":"ambigua","pinyin":"Tāmen liǎng gè de guānxi hěn àimèi, shéi yě shuōbuqīng."},{"id":"hsk6_04","level":6,"module":"HSK6","chinese_simp_full":"这本小说太精彩了，我爱不释手。","chinese_simp_cloze":"这本小说太精彩了，我___。","chinese_simp_answer":"爱不释手","chinese_trad_full":"這本小說太精彩了，我愛不釋手。","chinese_trad_cloze":"這本小說太精彩了，我___。","chinese_trad_answer":"愛不釋手","spanish_full":"Esta novela es tan fascinante que no puedo soltarla.","spanish_cloze":"Esta novela es tan fascinante que ___.","spanish_answer":"no puedo soltarla","pinyin":"Zhè běn xiǎoshuō tài jīngcǎi le, wǒ àibúshìshǒu.","spanish_alternatives":["no puedo dejarla"]},{"id":"hsk6_05","level":6,"module":"HSK6","chinese_simp_full":"这位老教授深受学生的爱戴。","chinese_simp_cloze":"这位老教授深受学生的___。","chinese_simp_answer":"爱戴","chinese_trad_full":"這位老教授深受學生的愛戴。","chinese_trad_cloze":"這位老教授深受學生的___。","chinese_trad_answer":"愛戴","spanish_full":"Este viejo profesor es muy querido y respetado por sus estudiantes.","spanish_cloze":"Este viejo profesor es muy ___ por sus estudiantes.","spanish_answer":"querido y respetado","pinyin":"Zhè wèi lǎo jiàoshòu shēn shòu xuéshēng de àidài.","spanish_alternatives":["amado y respetado"]},{"id":"hsk6_06","level":6,"module":"HSK6","chinese_simp_full":"老人退休后在农村过着安宁的生活。","chinese_simp_cloze":"老人退休后在农村过着___的生活。","chinese_simp_answer":"安宁","chinese_trad_full":"老人退休後在農村過著安寧的生活。","chinese_trad_cloze":"老人退休後在農村過著___的生活。","chinese_trad_answer":"安寧","spanish_full":"Después de jubilarse, el anciano lleva una vida tranquila en el campo.","spanish_cloze":"Después de jubilarse, el anciano lleva una vida ___ en el campo.","spanish_answer":"tranquila","pinyin":"Lǎorén tuìxiū hòu zài nóngcūn guòzhe ānníng de shēnghuó.","spanish_alternatives":["pacífica"]},{"id":"hsk6_07","level":6,"module":"HSK6","chinese_simp_full":"爷爷睡着了，脸上带着安详的表情。","chinese_simp_cloze":"爷爷睡着了，脸上带着___的表情。","chinese_simp_answer":"安详","chinese_trad_full":"爺爺睡著了，臉上帶著安詳的表情。","chinese_trad_cloze":"爺爺睡著了，臉上帶著___的表情。","chinese_trad_answer":"安詳","spanish_full":"El abuelo está dormido, con una expresión serena en el rostro.","spanish_cloze":"El abuelo está dormido, con una expresión ___ en el rostro.","spanish_answer":"serena","pinyin":"Yéye shuìzháo le, liǎn shàng dàizhe ānxiáng de biǎoqíng."},{"id":"hsk6_08","level":6,"module":"HSK6","chinese_simp_full":"政府为灾民安置了临时住处。","chinese_simp_cloze":"政府为灾民___了临时住处。","chinese_simp_answer":"安置","chinese_trad_full":"政府為災民安置了臨時住處。","chinese_trad_cloze":"政府為災民___了臨時住處。","chinese_trad_answer":"安置","spanish_full":"El gobierno alojó a los damnificados en viviendas provisorias.","spanish_cloze":"El gobierno ___ a los damnificados en viviendas provisorias.","spanish_answer":"alojó","pinyin":"Zhèngfǔ wèi zāimín ānzhì le línshí zhùchù.","spanish_alternatives":["instaló"]},{"id":"hsk6_09","level":6,"module":"HSK6","chinese_simp_full":"按摩可以缓解肌肉的疲劳。","chinese_simp_cloze":"___可以缓解肌肉的疲劳。","chinese_simp_answer":"按摩","chinese_trad_full":"按摩可以緩解肌肉的疲勞。","chinese_trad_cloze":"___可以緩解肌肉的疲勞。","chinese_trad_answer":"按摩","spanish_full":"El masaje puede aliviar la fatiga de los músculos.","spanish_cloze":"El ___ puede aliviar la fatiga de los músculos.","spanish_answer":"masaje","pinyin":"Ànmó kěyǐ huǎnjiě jīròu de píláo."},{"id":"hsk6_10","level":6,"module":"HSK6","chinese_simp_full":"他不停地向我暗示，希望我能明白他的意思。","chinese_simp_cloze":"他不停地向我___，希望我能明白他的意思。","chinese_simp_answer":"暗示","chinese_trad_full":"他不停地向我暗示，希望我能明白他的意思。","chinese_trad_cloze":"他不停地向我___，希望我能明白他的意思。","chinese_trad_answer":"暗示","spanish_full":"No dejaba de darme indirectas, esperando que yo entendiera lo que quería decir.","spanish_cloze":"No dejaba de darme ___, esperando que yo entendiera lo que quería decir.","spanish_answer":"indirectas","pinyin":"Tā bù tíng de xiàng wǒ ànshì, xīwàng wǒ néng míngbai tā de yìsi.","spanish_alternatives":["señales"]},{"id":"hsk6_11","level":6,"module":"HSK6","chinese_simp_full":"警察正在调查这起盗窃案件。","chinese_simp_cloze":"警察正在调查这起盗窃___。","chinese_simp_answer":"案件","chinese_trad_full":"警察正在調查這起盜竊案件。","chinese_trad_cloze":"警察正在調查這起盜竊___。","chinese_trad_answer":"案件","spanish_full":"La policía está investigando este caso de robo.","spanish_cloze":"La policía está investigando este ___ de robo.","spanish_answer":"caso","pinyin":"Jǐngchá zhèngzài diàochá zhè qǐ dàoqiè ànjiàn."},{"id":"hsk6_12","level":6,"module":"HSK6","chinese_simp_full":"老师用真实的案例来讲解法律知识。","chinese_simp_cloze":"老师用真实的___来讲解法律知识。","chinese_simp_answer":"案例","chinese_trad_full":"老師用真實的案例來講解法律知識。","chinese_trad_cloze":"老師用真實的___來講解法律知識。","chinese_trad_answer":"案例","spanish_full":"El profesor usa ejemplos reales para explicar los conocimientos jurídicos.","spanish_cloze":"El profesor usa ___ reales para explicar los conocimientos jurídicos.","spanish_answer":"ejemplos","pinyin":"Lǎoshī yòng zhēnshí de ànlì lái jiǎngjiě fǎlǜ zhīshi.","spanish_alternatives":["casos"]},{"id":"hsk6_13","level":6,"module":"HSK6","chinese_simp_full":"这家商店里的首饰都非常昂贵。","chinese_simp_cloze":"这家商店里的首饰都非常___。","chinese_simp_answer":"昂贵","chinese_trad_full":"這家商店裡的首飾都非常昂貴。","chinese_trad_cloze":"這家商店裡的首飾都非常___。","chinese_trad_answer":"昂貴","spanish_full":"Las joyas de esta tienda son todas muy costosas.","spanish_cloze":"Las joyas de esta tienda son todas muy ___.","spanish_answer":"costosas","pinyin":"Zhè jiā shāngdiàn lǐ de shǒushì dōu fēicháng ángguì.","spanish_alternatives":["caras"]},{"id":"hsk6_14","level":6,"module":"HSK6","chinese_simp_full":"这条小路凹凸不平，下雨天更难走。","chinese_simp_cloze":"这条小路___不平，下雨天更难走。","chinese_simp_answer":"凹凸","chinese_trad_full":"這條小路凹凸不平，下雨天更難走。","chinese_trad_cloze":"這條小路___不平，下雨天更難走。","chinese_trad_answer":"凹凸","spanish_full":"Este sendero es muy desigual y cuando llueve es aún más difícil de andar.","spanish_cloze":"Este sendero es muy ___ y cuando llueve es aún más difícil de andar.","spanish_answer":"desigual","pinyin":"Zhè tiáo xiǎolù āotū bùpíng, xiàyǔ tiān gèng nán zǒu.","spanish_alternatives":["irregular"]},{"id":"hsk6_15","level":6,"module":"HSK6","chinese_simp_full":"为了照顾生病的母亲，她熬了好几个通宵。","chinese_simp_cloze":"为了照顾生病的母亲，她___了好几个通宵。","chinese_simp_answer":"熬","chinese_trad_full":"為了照顧生病的母親，她熬了好幾個通宵。","chinese_trad_cloze":"為了照顧生病的母親，她___了好幾個通宵。","chinese_trad_answer":"熬","spanish_full":"Para cuidar a su madre enferma, trasnochó varias noches seguidas.","spanish_cloze":"Para cuidar a su madre enferma, ___ varias noches seguidas.","spanish_answer":"trasnochó","pinyin":"Wèile zhàogù shēngbìng de mǔqīn, tā áo le hǎo jǐ gè tōngxiāo.","spanish_alternatives":["se quedó despierta"]},{"id":"hsk6_16","level":6,"module":"HSK6","chinese_simp_full":"科学家们一直在探索宇宙的奥秘。","chinese_simp_cloze":"科学家们一直在探索宇宙的___。","chinese_simp_answer":"奥秘","chinese_trad_full":"科學家們一直在探索宇宙的奧秘。","chinese_trad_cloze":"科學家們一直在探索宇宙的___。","chinese_trad_answer":"奧秘","spanish_full":"Los científicos siempre están explorando los misterios del universo.","spanish_cloze":"Los científicos siempre están explorando los ___ del universo.","spanish_answer":"misterios","pinyin":"Kēxuéjiāmen yīzhí zài tànsuǒ yǔzhòu de àomì."},{"id":"hsk6_17","level":6,"module":"HSK6","chinese_simp_full":"我巴不得马上放假，去旅行放松一下。","chinese_simp_cloze":"我___马上放假，去旅行放松一下。","chinese_simp_answer":"巴不得","chinese_trad_full":"我巴不得馬上放假，去旅行放鬆一下。","chinese_trad_cloze":"我___馬上放假，去旅行放鬆一下。","chinese_trad_answer":"巴不得","spanish_full":"Estoy deseando que empiecen ya las vacaciones para viajar y descansar.","spanish_cloze":"___ que empiecen ya las vacaciones para viajar y descansar.","spanish_answer":"Estoy deseando","pinyin":"Wǒ bābude mǎshàng fàngjià, qù lǚxíng fàngsōng yīxià.","spanish_alternatives":["Muero por"]},{"id":"hsk6_18","level":6,"module":"HSK6","chinese_simp_full":"他为了升职，总想巴结上司。","chinese_simp_cloze":"他为了升职，总想___上司。","chinese_simp_answer":"巴结","chinese_trad_full":"他為了升職，總想巴結上司。","chinese_trad_cloze":"他為了升職，總想___上司。","chinese_trad_answer":"巴結","spanish_full":"Para ascender, siempre intenta adular a su jefe.","spanish_cloze":"Para ascender, siempre intenta ___ a su jefe.","spanish_answer":"adular","pinyin":"Tā wèile shēngzhí, zǒng xiǎng bājie shàngsi.","spanish_alternatives":["halagar"]},{"id":"hsk6_19","level":6,"module":"HSK6","chinese_simp_full":"小偷扒开了他的口袋，偷走了钱包。","chinese_simp_cloze":"小偷___开了他的口袋，偷走了钱包。","chinese_simp_answer":"扒","chinese_trad_full":"小偷扒開了他的口袋，偷走了錢包。","chinese_trad_cloze":"小偷___開了他的口袋，偷走了錢包。","chinese_trad_answer":"扒","spanish_full":"El ladrón abrió a la fuerza su bolsillo y se robó la cartera.","spanish_cloze":"El ladrón ___ su bolsillo y se robó la cartera.","spanish_answer":"abrió a la fuerza","pinyin":"Xiǎotōu bā kāi le tā de kǒudài, tōu zǒu le qiánbāo.","spanish_alternatives":["rasgó"]},{"id":"hsk6_20","level":6,"module":"HSK6","chinese_simp_full":"手术后，他的胳膊上留下了一道疤。","chinese_simp_cloze":"手术后，他的胳膊上留下了一道___。","chinese_simp_answer":"疤","chinese_trad_full":"手術後，他的胳膊上留下了一道疤。","chinese_trad_cloze":"手術後，他的胳膊上留下了一道___。","chinese_trad_answer":"疤","spanish_full":"Después de la operación, le quedó una cicatriz en el brazo.","spanish_cloze":"Después de la operación, le quedó una ___ en el brazo.","spanish_answer":"cicatriz","pinyin":"Shǒushù hòu, tā de gēbo shàng liú xià le yī dào bā."},{"id":"hsk6_21","level":6,"module":"HSK6","chinese_simp_full":"教育孩子要有耐心，拔苗助长只会适得其反。","chinese_simp_cloze":"教育孩子要有耐心，___只会适得其反。","chinese_simp_answer":"拔苗助长","chinese_trad_full":"教育孩子要有耐心，拔苗助長只會適得其反。","chinese_trad_cloze":"教育孩子要有耐心，___只會適得其反。","chinese_trad_answer":"拔苗助長","spanish_full":"Para educar a los hijos hace falta paciencia; apurar las cosas solo da el resultado contrario.","spanish_cloze":"Para educar a los hijos hace falta paciencia; ___ solo da el resultado contrario.","spanish_answer":"apurar las cosas","pinyin":"Jiàoyù háizi yào yǒu nàixīn, bámiáozhùzhǎng zhǐ huì shìdéqífǎn.","spanish_alternatives":["forzar el crecimiento"]},{"id":"hsk6_22","level":6,"module":"HSK6","chinese_simp_full":"重要文件发布之前，他都要亲自把关。","chinese_simp_cloze":"重要文件发布之前，他都要亲自___。","chinese_simp_answer":"把关","chinese_trad_full":"重要文件發佈之前，他都要親自把關。","chinese_trad_cloze":"重要文件發佈之前，他都要親自___。","chinese_trad_answer":"把關","spanish_full":"Antes de publicar los documentos importantes, siempre los revisa personalmente.","spanish_cloze":"Antes de publicar los documentos importantes, siempre los ___ personalmente.","spanish_answer":"revisa","pinyin":"Zhòngyào wénjiàn fābù zhīqián, tā dōu yào qīnzì bǎguān.","spanish_alternatives":["controla la calidad"]},{"id":"hsk6_23","level":6,"module":"HSK6","chinese_simp_full":"门把手坏了，一推就掉。","chinese_simp_cloze":"门___坏了，一推就掉。","chinese_simp_answer":"把手","chinese_trad_full":"門把手壞了，一推就掉。","chinese_trad_cloze":"門___壞了，一推就掉。","chinese_trad_answer":"把手","spanish_full":"El picaporte de la puerta está roto: se cae apenas la empujas.","spanish_cloze":"El ___ de la puerta está roto: se cae apenas la empujas.","spanish_answer":"picaporte","pinyin":"Mén bǎshou huài le, yī tuī jiù diào.","spanish_alternatives":["tirador"]},{"id":"hsk6_24","level":6,"module":"HSK6","chinese_simp_full":"因为工资太低，工人们决定罢工。","chinese_simp_cloze":"因为工资太低，工人们决定___。","chinese_simp_answer":"罢工","chinese_trad_full":"因為工資太低，工人們決定罷工。","chinese_trad_cloze":"因為工資太低，工人們決定___。","chinese_trad_answer":"罷工","spanish_full":"Como el salario era demasiado bajo, los obreros decidieron ir a la huelga.","spanish_cloze":"Como el salario era demasiado bajo, los obreros decidieron ___.","spanish_answer":"ir a la huelga","pinyin":"Yīnwèi gōngzī tài dī, gōngrénmen juédìng bàgōng.","spanish_alternatives":["hacer huelga","parar"]},{"id":"hsk6_25","level":6,"module":"HSK6","chinese_simp_full":"他这个人非常霸道，从来不听别人的意见。","chinese_simp_cloze":"他这个人非常___，从来不听别人的意见。","chinese_simp_answer":"霸道","chinese_trad_full":"他這個人非常霸道，從來不聽別人的意見。","chinese_trad_cloze":"他這個人非常___，從來不聽別人的意見。","chinese_trad_answer":"霸道","spanish_full":"Es una persona muy autoritaria, nunca escucha la opinión de los demás.","spanish_cloze":"Es una persona muy ___, nunca escucha la opinión de los demás.","spanish_answer":"autoritaria","pinyin":"Tā zhège rén fēicháng bàdào, cónglái bù tīng biérén de yìjiàn."},{"id":"hsk6_26","level":6,"module":"HSK6","chinese_simp_full":"他把面包掰成两半，分给孩子吃。","chinese_simp_cloze":"他把面包___成两半，分给孩子吃。","chinese_simp_answer":"掰","chinese_trad_full":"他把麵包掰成兩半，分給孩子吃。","chinese_trad_cloze":"他把麵包___成兩半，分給孩子吃。","chinese_trad_answer":"掰","spanish_full":"Partió el pan en dos con las manos para dárselo a los niños.","spanish_cloze":"___ el pan en dos con las manos para dárselo a los niños.","spanish_answer":"Partió","pinyin":"Tā bǎ miànbāo bāi chéng liǎng bàn, fēn gěi háizi chī.","spanish_alternatives":["Rompió"]},{"id":"hsk6_27","level":6,"module":"HSK6","chinese_simp_full":"经过多年努力，他终于摆脱了债务。","chinese_simp_cloze":"经过多年努力，他终于___了债务。","chinese_simp_answer":"摆脱","chinese_trad_full":"經過多年努力，他終於擺脫了債務。","chinese_trad_cloze":"經過多年努力，他終於___了債務。","chinese_trad_answer":"擺脫","spanish_full":"Tras muchos años de esfuerzo, por fin se libró de las deudas.","spanish_cloze":"Tras muchos años de esfuerzo, por fin ___ de las deudas.","spanish_answer":"se libró","pinyin":"Jīngguò duō nián nǔlì, tā zhōngyú bǎituō le zhàiwù.","spanish_alternatives":["se deshizo de"]},{"id":"hsk6_28","level":6,"module":"HSK6","chinese_simp_full":"明天下午我要去拜访一位老朋友。","chinese_simp_cloze":"明天下午我要去___一位老朋友。","chinese_simp_answer":"拜访","chinese_trad_full":"明天下午我要去拜訪一位老朋友。","chinese_trad_cloze":"明天下午我要去___一位老朋友。","chinese_trad_answer":"拜訪","spanish_full":"Mañana por la tarde voy a visitar a un viejo amigo.","spanish_cloze":"Mañana por la tarde voy a ___ a un viejo amigo.","spanish_answer":"visitar","pinyin":"Míngtiān xiàwǔ wǒ yào qù bàifǎng yī wèi lǎo péngyou."},{"id":"hsk6_29","level":6,"module":"HSK6","chinese_simp_full":"春节的时候，人们互相拜年，送上祝福。","chinese_simp_cloze":"春节的时候，人们互相___，送上祝福。","chinese_simp_answer":"拜年","chinese_trad_full":"春節的時候，人們互相拜年，送上祝福。","chinese_trad_cloze":"春節的時候，人們互相___，送上祝福。","chinese_trad_answer":"拜年","spanish_full":"Durante la Fiesta de la Primavera, la gente se felicita el Año Nuevo y se desea lo mejor.","spanish_cloze":"Durante la Fiesta de la Primavera, la gente ___ y se desea lo mejor.","spanish_answer":"se felicita el Año Nuevo","pinyin":"Chūnjié de shíhou, rénmen hùxiāng bàinián, sòng shàng zhùfú.","spanish_alternatives":["visitan para felicitar el año"]},{"id":"hsk6_30","level":6,"module":"HSK6","chinese_simp_full":"我要出趟远门，家里的猫就拜托你照顾了。","chinese_simp_cloze":"我要出趟远门，家里的猫就___你照顾了。","chinese_simp_answer":"拜托","chinese_trad_full":"我要出趟遠門，家裡的貓就拜託你照顧了。","chinese_trad_cloze":"我要出趟遠門，家裡的貓就___你照顧了。","chinese_trad_answer":"拜託","spanish_full":"Me voy de viaje lejos: te encargo el cuidado de mi gato.","spanish_cloze":"Me voy de viaje lejos: ___ el cuidado de mi gato.","spanish_answer":"te encargo","pinyin":"Wǒ yào chū tàng yuǎnmén, jiā lǐ de māo jiù bàituō nǐ zhàogù le.","spanish_alternatives":["te lo dejo encargado"]},{"id":"hsk6_31","level":6,"module":"HSK6","chinese_simp_full":"这种行为败坏了公司的名声。","chinese_simp_cloze":"这种行为___了公司的名声。","chinese_simp_answer":"败坏","chinese_trad_full":"這種行為敗壞了公司的名聲。","chinese_trad_cloze":"這種行為___了公司的名聲。","chinese_trad_answer":"敗壞","spanish_full":"Este tipo de conducta arruina la reputación de la empresa.","spanish_cloze":"Este tipo de conducta ___ la reputación de la empresa.","spanish_answer":"arruina","pinyin":"Zhè zhǒng xíngwéi bàihuài le gōngsī de míngshēng.","spanish_alternatives":["daña"]},{"id":"hsk6_32","level":6,"module":"HSK6","chinese_simp_full":"蝴蝶翅膀上的斑非常漂亮。","chinese_simp_cloze":"蝴蝶翅膀上的___非常漂亮。","chinese_simp_answer":"斑","chinese_trad_full":"蝴蝶翅膀上的斑非常漂亮。","chinese_trad_cloze":"蝴蝶翅膀上的___非常漂亮。","chinese_trad_answer":"斑","spanish_full":"Las manchas en las alas de la mariposa son muy bonitas.","spanish_cloze":"Las ___ en las alas de la mariposa son muy bonitas.","spanish_answer":"manchas","pinyin":"Húdié chìbǎng shàng de bān fēicháng piàoliang."},{"id":"hsk6_33","level":6,"module":"HSK6","chinese_simp_full":"政府颁布了新的环境保护法。","chinese_simp_cloze":"政府___了新的环境保护法。","chinese_simp_answer":"颁布","chinese_trad_full":"政府頒佈了新的環境保護法。","chinese_trad_cloze":"政府___了新的環境保護法。","chinese_trad_answer":"頒佈","spanish_full":"El gobierno promulgó la nueva ley de protección del medio ambiente.","spanish_cloze":"El gobierno ___ la nueva ley de protección del medio ambiente.","spanish_answer":"promulgó","pinyin":"Zhèngfǔ bānbù le xīn de huánjìng bǎohù fǎ."},{"id":"hsk6_34","level":6,"module":"HSK6","chinese_simp_full":"校长为获奖的学生颁发了证书。","chinese_simp_cloze":"校长为获奖的学生___了证书。","chinese_simp_answer":"颁发","chinese_trad_full":"校長為獲獎的學生頒發了證書。","chinese_trad_cloze":"校長為獲獎的學生___了證書。","chinese_trad_answer":"頒發","spanish_full":"El director entregó los certificados a los estudiantes premiados.","spanish_cloze":"El director ___ los certificados a los estudiantes premiados.","spanish_answer":"entregó","pinyin":"Xiàozhǎng wèi huòjiǎng de xuéshēng bānfā le zhèngshū.","spanish_alternatives":["concedió"]},{"id":"hsk6_35","level":6,"module":"HSK6","chinese_simp_full":"这款软件的新版本修复了很多漏洞。","chinese_simp_cloze":"这款软件的新___修复了很多漏洞。","chinese_simp_answer":"版本","chinese_trad_full":"這款軟件的新版本修復了很多漏洞。","chinese_trad_cloze":"這款軟件的新___修復了很多漏洞。","chinese_trad_answer":"版本","spanish_full":"La nueva versión de este software corrigió muchas fallas.","spanish_cloze":"La nueva ___ de este software corrigió muchas fallas.","spanish_answer":"versión","pinyin":"Zhè kuǎn ruǎnjiàn de xīn bǎnběn xiūfù le hěn duō lòudòng."},{"id":"hsk6_36","level":6,"module":"HSK6","chinese_simp_full":"老年人也需要伴侣的陪伴和关心。","chinese_simp_cloze":"老年人也需要___的陪伴和关心。","chinese_simp_answer":"伴侣","chinese_trad_full":"老年人也需要伴侶的陪伴和關心。","chinese_trad_cloze":"老年人也需要___的陪伴和關心。","chinese_trad_answer":"伴侶","spanish_full":"Las personas mayores también necesitan la compañía y el cariño de una pareja.","spanish_cloze":"Las personas mayores también necesitan la compañía y el cariño de una ___.","spanish_answer":"pareja","pinyin":"Lǎoniánrén yě xūyào bànlǚ de péibàn hé guānxīn."},{"id":"hsk6_37","level":6,"module":"HSK6","chinese_simp_full":"科技的发展伴随着许多新的问题。","chinese_simp_cloze":"科技的发展___着许多新的问题。","chinese_simp_answer":"伴随","chinese_trad_full":"科技的發展伴隨著許多新的問題。","chinese_trad_cloze":"科技的發展___著許多新的問題。","chinese_trad_answer":"伴隨","spanish_full":"El desarrollo de la tecnología trae aparejados muchos problemas nuevos.","spanish_cloze":"El desarrollo de la tecnología ___ muchos problemas nuevos.","spanish_answer":"trae aparejados","pinyin":"Kējì de fāzhǎn bànsuízhe xǔduō xīn de wèntí.","spanish_alternatives":["viene acompañado de"]},{"id":"hsk6_38","level":6,"module":"HSK6","chinese_simp_full":"学外语贵在坚持，千万不能半途而废。","chinese_simp_cloze":"学外语贵在坚持，千万不能___。","chinese_simp_answer":"半途而废","chinese_trad_full":"學外語貴在堅持，千萬不能半途而廢。","chinese_trad_cloze":"學外語貴在堅持，千萬不能___。","chinese_trad_answer":"半途而廢","spanish_full":"Para aprender idiomas lo valioso es la constancia; jamás hay que abandonar a mitad de camino.","spanish_cloze":"Para aprender idiomas lo valioso es la constancia; jamás hay que ___.","spanish_answer":"abandonar a mitad de camino","pinyin":"Xué wàiyǔ guì zài jiānchí, qiānwàn bù néng bàntú'érfèi.","spanish_alternatives":["rendirse a mitad de camino"]},{"id":"hsk6_39","level":6,"module":"HSK6","chinese_simp_full":"他在电影里扮演一位勇敢的警察。","chinese_simp_cloze":"他在电影里___一位勇敢的警察。","chinese_simp_answer":"扮演","chinese_trad_full":"他在電影裡扮演一位勇敢的警察。","chinese_trad_cloze":"他在電影裡___一位勇敢的警察。","chinese_trad_answer":"扮演","spanish_full":"En la película hace el papel de un policía valiente.","spanish_cloze":"En la película ___ un policía valiente.","spanish_answer":"hace el papel de","pinyin":"Tā zài diànyǐng lǐ bànyǎn yī wèi yǒnggǎn de jǐngchá.","spanish_alternatives":["interpreta a"]},{"id":"hsk6_40","level":6,"module":"HSK6","chinese_simp_full":"父母是孩子最好的榜样。","chinese_simp_cloze":"父母是孩子最好的___。","chinese_simp_answer":"榜样","chinese_trad_full":"父母是孩子最好的榜樣。","chinese_trad_cloze":"父母是孩子最好的___。","chinese_trad_answer":"榜樣","spanish_full":"Los padres son el mejor ejemplo para los hijos.","spanish_cloze":"Los padres son el mejor ___ para los hijos.","spanish_answer":"ejemplo","pinyin":"Fùmǔ shì háizi zuì hǎo de bǎngyàng."},{"id":"hsk6_41","level":6,"module":"HSK6","chinese_simp_full":"那个富商的孩子被绑架了。","chinese_simp_cloze":"那个富商的孩子被___了。","chinese_simp_answer":"绑架","chinese_trad_full":"那個富商的孩子被綁架了。","chinese_trad_cloze":"那個富商的孩子被___了。","chinese_trad_answer":"綁架","spanish_full":"El hijo de ese empresario rico fue secuestrado.","spanish_cloze":"El hijo de ese empresario rico fue ___.","spanish_answer":"secuestrado","pinyin":"Nàge fùshāng de háizi bèi bǎngjià le."},{"id":"hsk6_42","level":6,"module":"HSK6","chinese_simp_full":"这个包裹重十磅，大约四公斤半。","chinese_simp_cloze":"这个包裹重十___，大约四公斤半。","chinese_simp_answer":"磅","chinese_trad_full":"這個包裹重十磅，大約四公斤半。","chinese_trad_cloze":"這個包裹重十___，大約四公斤半。","chinese_trad_answer":"磅","spanish_full":"Este paquete pesa diez libras, unos cuatro kilos y medio.","spanish_cloze":"Este paquete pesa diez ___, unos cuatro kilos y medio.","spanish_answer":"libras","pinyin":"Zhège bāoguǒ zhòng shí bàng, dàyuē sì gōngjīn bàn."},{"id":"hsk6_43","level":6,"module":"HSK6","chinese_simp_full":"包庇罪犯也是一种犯罪。","chinese_simp_cloze":"___罪犯也是一种犯罪。","chinese_simp_answer":"包庇","chinese_trad_full":"包庇罪犯也是一種犯罪。","chinese_trad_cloze":"___罪犯也是一種犯罪。","chinese_trad_answer":"包庇","spanish_full":"Encubrir a los delincuentes también es un delito.","spanish_cloze":"___ a los delincuentes también es un delito.","spanish_answer":"Encubrir","pinyin":"Bāobì zuìfàn yě shì yī zhǒng fànzuì.","spanish_alternatives":["Proteger"]},{"id":"hsk6_44","level":6,"module":"HSK6","chinese_simp_full":"她放下心里的包袱，整个人轻松了很多。","chinese_simp_cloze":"她放下心里的___，整个人轻松了很多。","chinese_simp_answer":"包袱","chinese_trad_full":"她放下心裡的包袱，整個人輕鬆了很多。","chinese_trad_cloze":"她放下心裡的___，整個人輕鬆了很多。","chinese_trad_answer":"包袱","spanish_full":"Dejó de lado su carga mental y se sintió mucho más liviana.","spanish_cloze":"Dejó de lado su ___ mental y se sintió mucho más liviana.","spanish_answer":"carga","pinyin":"Tā fàngxià xīnlǐ de bāofu, zhěng gè rén qīngsōng le hěn duō.","spanish_alternatives":["peso"]},{"id":"hsk6_45","level":6,"module":"HSK6","chinese_simp_full":"警察把那栋楼包围了整整一天。","chinese_simp_cloze":"警察把那栋楼___了整整一天。","chinese_simp_answer":"包围","chinese_trad_full":"警察把那棟樓包圍了整整一天。","chinese_trad_cloze":"警察把那棟樓___了整整一天。","chinese_trad_answer":"包圍","spanish_full":"La policía cercó ese edificio durante un día entero.","spanish_cloze":"La policía ___ ese edificio durante un día entero.","spanish_answer":"cercó","pinyin":"Jǐngchá bǎ nà dòng lóu bāowéi le zhěngzhěng yī tiān.","spanish_alternatives":["rodeó"]},{"id":"hsk6_46","level":6,"module":"HSK6","chinese_simp_full":"这家工厂专门负责食品的包装。","chinese_simp_cloze":"这家工厂专门负责食品的___。","chinese_simp_answer":"包装","chinese_trad_full":"這家工廠專門負責食品的包裝。","chinese_trad_cloze":"這家工廠專門負責食品的___。","chinese_trad_answer":"包裝","spanish_full":"Esta fábrica se especializa en el embalaje de alimentos.","spanish_cloze":"Esta fábrica se especializa en el ___ de alimentos.","spanish_answer":"embalaje","pinyin":"Zhè jiā gōngchǎng zhuānmén fùzé shípǐn de bāozhuāng.","spanish_alternatives":["empaquetado"]},{"id":"hsk6_47","level":6,"module":"HSK6","chinese_simp_full":"重要证件要妥善保管，不能随便乱放。","chinese_simp_cloze":"重要证件要妥善___，不能随便乱放。","chinese_simp_answer":"保管","chinese_trad_full":"重要證件要妥善保管，不能隨便亂放。","chinese_trad_cloze":"重要證件要妥善___，不能隨便亂放。","chinese_trad_answer":"保管","spanish_full":"Los documentos importantes deben guardarse bien, no se pueden dejar en cualquier lado.","spanish_cloze":"Los documentos importantes deben ___ bien, no se pueden dejar en cualquier lado.","spanish_answer":"guardarse","pinyin":"Zhòngyào zhèngjiàn yào tuǒshàn bǎoguǎn, bù néng suíbiàn luàn fàng.","spanish_alternatives":["conservarse"]},{"id":"hsk6_48","level":6,"module":"HSK6","chinese_simp_full":"公司规定，员工必须对客户信息保密。","chinese_simp_cloze":"公司规定，员工必须对客户信息___。","chinese_simp_answer":"保密","chinese_trad_full":"公司規定，員工必須對客戶信息保密。","chinese_trad_cloze":"公司規定，員工必須對客戶信息___。","chinese_trad_answer":"保密","spanish_full":"La empresa establece que los empleados deben mantener en secreto los datos de los clientes.","spanish_cloze":"La empresa establece que los empleados deben ___ los datos de los clientes.","spanish_answer":"mantener en secreto","pinyin":"Gōngsī guīdìng, yuángōng bìxū duì kèhù xìnxī bǎomì.","spanish_alternatives":["guardar secreto"]},{"id":"hsk6_49","level":6,"module":"HSK6","chinese_simp_full":"他们工作忙，请了一位保姆照顾孩子。","chinese_simp_cloze":"他们工作忙，请了一位___照顾孩子。","chinese_simp_answer":"保姆","chinese_trad_full":"他們工作忙，請了一位保姆照顧孩子。","chinese_trad_cloze":"他們工作忙，請了一位___照顧孩子。","chinese_trad_answer":"保姆","spanish_full":"Como trabajan mucho, contrataron a una niñera para cuidar a los niños.","spanish_cloze":"Como trabajan mucho, contrataron a una ___ para cuidar a los niños.","spanish_answer":"niñera","pinyin":"Tāmen gōngzuò máng, qǐng le yī wèi bǎomǔ zhàogù háizi."},{"id":"hsk6_50","level":6,"module":"HSK6","chinese_simp_full":"爷爷的思想比较保守，不容易接受新事物。","chinese_simp_cloze":"爷爷的思想比较___，不容易接受新事物。","chinese_simp_answer":"保守","chinese_trad_full":"爺爺的思想比較保守，不容易接受新事物。","chinese_trad_cloze":"爺爺的思想比較___，不容易接受新事物。","chinese_trad_answer":"保守","spanish_full":"Las ideas del abuelo son bastante conservadoras, le cuesta aceptar cosas nuevas.","spanish_cloze":"Las ideas del abuelo son bastante ___, le cuesta aceptar cosas nuevas.","spanish_answer":"conservadoras","pinyin":"Yéye de sīxiǎng bǐjiào bǎoshǒu, bù róngyì jiēshòu xīn shìwù."},{"id":"hsk6_51","level":6,"module":"HSK6","chinese_simp_full":"士兵们誓死保卫自己的祖国。","chinese_simp_cloze":"士兵们誓死___自己的祖国。","chinese_simp_answer":"保卫","chinese_trad_full":"士兵們誓死保衛自己的祖國。","chinese_trad_cloze":"士兵們誓死___自己的祖國。","chinese_trad_answer":"保衛","spanish_full":"Los soldados juran defender hasta la muerte a su patria.","spanish_cloze":"Los soldados juran ___ hasta la muerte a su patria.","spanish_answer":"defender","pinyin":"Shìbīngmen shìsǐ bǎowèi zìjǐ de zǔguó.","spanish_alternatives":["proteger"]},{"id":"hsk6_52","level":6,"module":"HSK6","chinese_simp_full":"定期保养汽车可以延长它的寿命。","chinese_simp_cloze":"定期___汽车可以延长它的寿命。","chinese_simp_answer":"保养","chinese_trad_full":"定期保養汽車可以延長它的壽命。","chinese_trad_cloze":"定期___汽車可以延長它的壽命。","chinese_trad_answer":"保養","spanish_full":"Darle mantenimiento periódico al auto prolonga su vida útil.","spanish_cloze":"Darle ___ periódico al auto prolonga su vida útil.","spanish_answer":"mantenimiento","pinyin":"Dìngqī bǎoyǎng qìchē kěyǐ yáncháng tā de shòumìng.","spanish_alternatives":["mantenerlo bien"]},{"id":"hsk6_53","level":6,"module":"HSK6","chinese_simp_full":"新法律保障了劳动者的基本权利。","chinese_simp_cloze":"新法律___了劳动者的基本权利。","chinese_simp_answer":"保障","chinese_trad_full":"新法律保障了勞動者的基本權利。","chinese_trad_cloze":"新法律___了勞動者的基本權利。","chinese_trad_answer":"保障","spanish_full":"La nueva ley garantiza los derechos básicos de los trabajadores.","spanish_cloze":"La nueva ley ___ los derechos básicos de los trabajadores.","spanish_answer":"garantiza","pinyin":"Xīn fǎlǜ bǎozhàng le láodòngzhě de jīběn quánlì.","spanish_alternatives":["asegura"]},{"id":"hsk6_54","level":6,"module":"HSK6","chinese_simp_full":"你就要出远门了，路上千万保重身体。","chinese_simp_cloze":"你就要出远门了，路上千万___身体。","chinese_simp_answer":"保重","chinese_trad_full":"你就要出遠門了，路上千萬保重身體。","chinese_trad_cloze":"你就要出遠門了，路上千萬___身體。","chinese_trad_answer":"保重","spanish_full":"Estás por irte lejos: cuídate mucho en el camino.","spanish_cloze":"Estás por irte lejos: ___ en el camino.","spanish_answer":"cuídate mucho","pinyin":"Nǐ jiù yào chū yuǎnmén le, lù shàng qiānwàn bǎozhòng shēntǐ.","spanish_alternatives":["cuídate"]},{"id":"hsk6_55","level":6,"module":"HSK6","chinese_simp_full":"这个市场已经接近饱和，竞争特别激烈。","chinese_simp_cloze":"这个市场已经接近___，竞争特别激烈。","chinese_simp_answer":"饱和","chinese_trad_full":"這個市場已經接近飽和，競爭特別激烈。","chinese_trad_cloze":"這個市場已經接近___，競爭特別激烈。","chinese_trad_answer":"飽和","spanish_full":"Este mercado ya está casi saturado y la competencia es fierísima.","spanish_cloze":"Este mercado ya está casi ___ y la competencia es fierísima.","spanish_answer":"saturado","pinyin":"Zhège shìchǎng yǐjīng jiējìn bǎohé, jìngzhēng tèbié jīliè."},{"id":"hsk6_56","level":6,"module":"HSK6","chinese_simp_full":"奶奶那饱经沧桑的脸上总是带着微笑。","chinese_simp_cloze":"奶奶那___的脸上总是带着微笑。","chinese_simp_answer":"饱经沧桑","chinese_trad_full":"奶奶那飽經滄桑的臉上總是帶著微笑。","chinese_trad_cloze":"奶奶那___的臉上總是帶著微笑。","chinese_trad_answer":"飽經滄桑","spanish_full":"El rostro de la abuela, que ha vivido tantas cosas, siempre lleva una sonrisa.","spanish_cloze":"El rostro de la abuela, ___, siempre lleva una sonrisa.","spanish_answer":"que ha vivido tantas cosas","pinyin":"Nǎinai nà bǎojīng cāngsāng de liǎn shàng zǒngshì dàizhe wēixiào.","spanish_alternatives":["marcado por la vida"]},{"id":"hsk6_57","level":6,"module":"HSK6","chinese_simp_full":"这份工作辛苦，但报酬很可观。","chinese_simp_cloze":"这份工作辛苦，但___很可观。","chinese_simp_answer":"报酬","chinese_trad_full":"這份工作辛苦，但報酬很可觀。","chinese_trad_cloze":"這份工作辛苦，但___很可觀。","chinese_trad_answer":"報酬","spanish_full":"Este trabajo es duro, pero la remuneración es bastante buena.","spanish_cloze":"Este trabajo es duro, pero la ___ es bastante buena.","spanish_answer":"remuneración","pinyin":"Zhè fèn gōngzuò xīnkǔ, dàn bàochou hěn kěguān.","spanish_alternatives":["pago"]},{"id":"hsk6_58","level":6,"module":"HSK6","chinese_simp_full":"他发誓要为死去的父亲报仇。","chinese_simp_cloze":"他发誓要为死去的父亲___。","chinese_simp_answer":"报仇","chinese_trad_full":"他發誓要為死去的父親報仇。","chinese_trad_cloze":"他發誓要為死去的父親___。","chinese_trad_answer":"報仇","spanish_full":"Juró vengar a su padre fallecido.","spanish_cloze":"Juró ___ a su padre fallecido.","spanish_answer":"vengar","pinyin":"Tā fāshì yào wèi sǐqù de fùqīn bàochóu.","spanish_alternatives":["tomar venganza"]},{"id":"hsk6_59","level":6,"module":"HSK6","chinese_simp_full":"我不知道怎样才能报答您的恩情。","chinese_simp_cloze":"我不知道怎样才能___您的恩情。","chinese_simp_answer":"报答","chinese_trad_full":"我不知道怎樣才能報答您的恩情。","chinese_trad_cloze":"我不知道怎樣才能___您的恩情。","chinese_trad_answer":"報答","spanish_full":"No sé cómo podría retribuir tanta bondad de su parte.","spanish_cloze":"No sé cómo podría ___ tanta bondad de su parte.","spanish_answer":"retribuir","pinyin":"Wǒ bù zhīdào zěnyàng cáinéng bàodá nín de ēnqíng.","spanish_alternatives":["pagar"]},{"id":"hsk6_60","level":6,"module":"HSK6","chinese_simp_full":"他打击报复那些批评过他的同事。","chinese_simp_cloze":"他打击___那些批评过他的同事。","chinese_simp_answer":"报复","chinese_trad_full":"他打擊報復那些批評過他的同事。","chinese_trad_cloze":"他打擊___那些批評過他的同事。","chinese_trad_answer":"報復","spanish_full":"Se venga de los colegas que lo han criticado.","spanish_cloze":"___ de los colegas que lo han criticado.","spanish_answer":"Se venga","pinyin":"Tā dǎjī bàofù nàxiē pīpíngguò tā de tóngshì.","spanish_alternatives":["Toma represalias contra"]},{"id":"hsk6_61","level":6,"module":"HSK6","chinese_simp_full":"遇到火灾要第一时间报警。","chinese_simp_cloze":"遇到火灾要第一时间___。","chinese_simp_answer":"报警","chinese_trad_full":"遇到火災要第一時間報警。","chinese_trad_cloze":"遇到火災要第一時間___。","chinese_trad_answer":"報警","spanish_full":"Ante un incendio, hay que llamar a la policía de inmediato.","spanish_cloze":"Ante un incendio, hay que ___ de inmediato.","spanish_answer":"llamar a la policía","pinyin":"Yùdào huǒzāi yào dì yī shíjiān bàojǐng.","spanish_alternatives":["avisar a la policía"]},{"id":"hsk6_62","level":6,"module":"HSK6","chinese_simp_full":"出差的费用回来以后可以报销。","chinese_simp_cloze":"出差的费用回来以后可以___。","chinese_simp_answer":"报销","chinese_trad_full":"出差的費用回來以後可以報銷。","chinese_trad_cloze":"出差的費用回來以後可以___。","chinese_trad_answer":"報銷","spanish_full":"Los gastos del viaje de trabajo se pueden reembolsar al volver.","spanish_cloze":"Los gastos del viaje de trabajo se pueden ___ al volver.","spanish_answer":"reembolsar","pinyin":"Chūchāi de fèiyòng huílái yǐhòu kěyǐ bàoxiāo."},{"id":"hsk6_63","level":6,"module":"HSK6","chinese_simp_full":"年轻人应该有远大的抱负。","chinese_simp_cloze":"年轻人应该有远大的___。","chinese_simp_answer":"抱负","chinese_trad_full":"年輕人應該有遠大的抱負。","chinese_trad_cloze":"年輕人應該有遠大的___。","chinese_trad_answer":"抱負","spanish_full":"Los jóvenes deben tener grandes aspiraciones.","spanish_cloze":"Los jóvenes deben tener grandes ___.","spanish_answer":"aspiraciones","pinyin":"Niánqīngrén yīnggāi yǒu yuǎndà de bàofù.","spanish_alternatives":["ambiciones"]},{"id":"hsk6_64","level":6,"module":"HSK6","chinese_simp_full":"任何形式的暴力都是不可接受的。","chinese_simp_cloze":"任何形式的___都是不可接受的。","chinese_simp_answer":"暴力","chinese_trad_full":"任何形式的暴力都是不可接受的。","chinese_trad_cloze":"任何形式的___都是不可接受的。","chinese_trad_answer":"暴力","spanish_full":"Cualquier forma de violencia es inaceptable.","spanish_cloze":"Cualquier forma de ___ es inaceptable.","spanish_answer":"violencia","pinyin":"Rènhé xíngshì de bàolì dōu shì bùkě jiēshòu de."},{"id":"hsk6_65","level":6,"module":"HSK6","chinese_simp_full":"他的谎言终于暴露了。","chinese_simp_cloze":"他的谎言终于___了。","chinese_simp_answer":"暴露","chinese_trad_full":"他的謊言終於暴露了。","chinese_trad_cloze":"他的謊言終於___了。","chinese_trad_answer":"暴露","spanish_full":"Su mentira por fin quedó al descubierto.","spanish_cloze":"Su mentira por fin ___.","spanish_answer":"quedó al descubierto","pinyin":"Tā de huǎngyán zhōngyú bàolù le.","spanish_alternatives":["se reveló"]},{"id":"hsk6_66","level":6,"module":"HSK6","chinese_simp_full":"这位明星的隐私被媒体曝光了。","chinese_simp_cloze":"这位明星的隐私被媒体___了。","chinese_simp_answer":"曝光","chinese_trad_full":"這位明星的隱私被媒體曝光了。","chinese_trad_cloze":"這位明星的隱私被媒體___了。","chinese_trad_answer":"曝光","spanish_full":"La intimidad de esa estrella fue expuesta por los medios.","spanish_cloze":"La intimidad de esa estrella fue ___ por los medios.","spanish_answer":"expuesta","pinyin":"Zhè wèi míngxīng de yǐnsī bèi méitǐ bàoguāng le.","spanish_alternatives":["revelada"]},{"id":"hsk6_67","level":6,"module":"HSK6","chinese_simp_full":"战争终于爆发了，人们纷纷逃离家园。","chinese_simp_cloze":"战争终于___了，人们纷纷逃离家园。","chinese_simp_answer":"爆发","chinese_trad_full":"戰爭終於爆發了，人們紛紛逃離家園。","chinese_trad_cloze":"戰爭終於___了，人們紛紛逃離家園。","chinese_trad_answer":"爆發","spanish_full":"La guerra finalmente estalló y la gente huyó en masa de sus hogares.","spanish_cloze":"La guerra finalmente ___ y la gente huyó en masa de sus hogares.","spanish_answer":"estalló","pinyin":"Zhànzhēng zhōngyú bàofā le, rénmen fēnfēn táolí jiāyuán."},{"id":"hsk6_68","level":6,"module":"HSK6","chinese_simp_full":"消防员赶到时，仓库已经发生了爆炸。","chinese_simp_cloze":"消防员赶到时，仓库已经发生了___。","chinese_simp_answer":"爆炸","chinese_trad_full":"消防員趕到時，倉庫已經發生了爆炸。","chinese_trad_cloze":"消防員趕到時，倉庫已經發生了___。","chinese_trad_answer":"爆炸","spanish_full":"Cuando llegaron los bomberos, en el almacén ya había ocurrido una explosión.","spanish_cloze":"Cuando llegaron los bomberos, en el almacén ya había ocurrido una ___.","spanish_answer":"explosión","pinyin":"Xiāofángyuán gǎndào shí, cāngkù yǐjīng fāshēng le bàozhà."},{"id":"hsk6_69","level":6,"module":"HSK6","chinese_simp_full":"用这种卑鄙的手段赢得比赛，并不光彩。","chinese_simp_cloze":"用这种___的手段赢得比赛，并不光彩。","chinese_simp_answer":"卑鄙","chinese_trad_full":"用這種卑鄙的手段贏得比賽，並不光彩。","chinese_trad_cloze":"用這種___的手段贏得比賽，並不光彩。","chinese_trad_answer":"卑鄙","spanish_full":"Ganar la competencia con medios tan viles no le hace ningún honor.","spanish_cloze":"Ganar la competencia con medios tan ___ no le hace ningún honor.","spanish_answer":"viles","pinyin":"Yòng zhè zhǒng bēibǐ de shǒuduàn yíngdé bǐsài, bìng bù guāngcǎi.","spanish_alternatives":["despreciables"]},{"id":"hsk6_70","level":6,"module":"HSK6","chinese_simp_full":"听到这个消息，他心里充满了悲哀。","chinese_simp_cloze":"听到这个消息，他心里充满了___。","chinese_simp_answer":"悲哀","chinese_trad_full":"聽到這個消息，他心裡充滿了悲哀。","chinese_trad_cloze":"聽到這個消息，他心裡充滿了___。","chinese_trad_answer":"悲哀","spanish_full":"Al escuchar la noticia, su corazón se llenó de tristeza.","spanish_cloze":"Al escuchar la noticia, su corazón se llenó de ___.","spanish_answer":"tristeza","pinyin":"Tīngdào zhège xiāoxi, tā xīnlǐ chōngmǎn le bēi'āi.","spanish_alternatives":["dolor"]},{"id":"hsk6_71","level":6,"module":"HSK6","chinese_simp_full":"小说描写了一个家庭的悲惨遭遇。","chinese_simp_cloze":"小说描写了一个家庭的___遭遇。","chinese_simp_answer":"悲惨","chinese_trad_full":"小說描寫了一個家庭的悲慘遭遇。","chinese_trad_cloze":"小說描寫了一個家庭的___遭遇。","chinese_trad_answer":"悲慘","spanish_full":"La novela describe la trágica suerte de una familia.","spanish_cloze":"La novela describe la ___ suerte de una familia.","spanish_answer":"trágica","pinyin":"Xiǎoshuō miáoxiě le yī gè jiātíng de bēicǎn zāoyù."},{"id":"hsk6_72","level":6,"module":"HSK6","chinese_simp_full":"生活在北极附近的动物适应了严寒。","chinese_simp_cloze":"生活在___附近的动物适应了严寒。","chinese_simp_answer":"北极","chinese_trad_full":"生活在北極附近的動物適應了嚴寒。","chinese_trad_cloze":"生活在___附近的動物適應了嚴寒。","chinese_trad_answer":"北極","spanish_full":"Los animales que viven cerca del Polo Norte están adaptados al frío extremo.","spanish_cloze":"Los animales que viven cerca del ___ están adaptados al frío extremo.","spanish_answer":"Polo Norte","pinyin":"Shēnghuó zài běijí fùjìn de dòngwù shìyìng le yánhán."},{"id":"hsk6_73","level":6,"module":"HSK6","chinese_simp_full":"重要资料一定要做好备份。","chinese_simp_cloze":"重要资料一定要做好___。","chinese_simp_answer":"备份","chinese_trad_full":"重要資料一定要做好備份。","chinese_trad_cloze":"重要資料一定要做好___。","chinese_trad_answer":"備份","spanish_full":"Con los archivos importantes hay que hacer siempre una copia de seguridad.","spanish_cloze":"Con los archivos importantes hay que hacer siempre una ___.","spanish_answer":"copia de seguridad","pinyin":"Zhòngyào zīliào yīdìng yào zuò hǎo bèifèn.","spanish_alternatives":["backup"]},{"id":"hsk6_74","level":6,"module":"HSK6","chinese_simp_full":"开会之前，请先阅读这份备忘录。","chinese_simp_cloze":"开会之前，请先阅读这份___。","chinese_simp_answer":"备忘录","chinese_trad_full":"開會之前，請先閱讀這份備忘錄。","chinese_trad_cloze":"開會之前，請先閱讀這份___。","chinese_trad_answer":"備忘錄","spanish_full":"Antes de la reunión, lean primero este memorándum.","spanish_cloze":"Antes de la reunión, lean primero este ___.","spanish_answer":"memorándum","pinyin":"Kāihuì zhīqián, qǐng xiān yuèdú zhè fèn bèiwànglù."},{"id":"hsk6_75","level":6,"module":"HSK6","chinese_simp_full":"最让他痛苦的是好朋友的背叛。","chinese_simp_cloze":"最让他痛苦的是好朋友的___。","chinese_simp_answer":"背叛","chinese_trad_full":"最讓他痛苦的是好朋友的背叛。","chinese_trad_cloze":"最讓他痛苦的是好朋友的___。","chinese_trad_answer":"背叛","spanish_full":"Lo que más le dolió fue la traición de su mejor amigo.","spanish_cloze":"Lo que más le dolió fue la ___ de su mejor amigo.","spanish_answer":"traición","pinyin":"Zuì ràng tā tòngkǔ de shì hǎo péngyou de bèipàn."},{"id":"hsk6_76","level":6,"module":"HSK6","chinese_simp_full":"小学生每天早上都要背诵古诗。","chinese_simp_cloze":"小学生每天早上都要___古诗。","chinese_simp_answer":"背诵","chinese_trad_full":"小學生每天早上都要背誦古詩。","chinese_trad_cloze":"小學生每天早上都要___古詩。","chinese_trad_answer":"背誦","spanish_full":"Los escolares deben recitar poemas antiguos todas las mañanas.","spanish_cloze":"Los escolares deben ___ poemas antiguos todas las mañanas.","spanish_answer":"recitar","pinyin":"Xiǎoxuéshēng měitiān zǎoshang dōu yào bèisòng gǔshī.","spanish_alternatives":["repetir de memoria"]},{"id":"hsk6_77","level":6,"module":"HSK6","chinese_simp_full":"在谈判中，我们不能一直处于被动。","chinese_simp_cloze":"在谈判中，我们不能一直处于___。","chinese_simp_answer":"被动","chinese_trad_full":"在談判中，我們不能一直處於被動。","chinese_trad_cloze":"在談判中，我們不能一直處於___。","chinese_trad_answer":"被動","spanish_full":"En la negociación no podemos quedarnos siempre en una posición pasiva.","spanish_cloze":"En la negociación no podemos quedarnos siempre en una posición ___.","spanish_answer":"pasiva","pinyin":"Zài tánpàn zhōng, wǒmen bù néng yīzhí chǔyú bèidòng."},{"id":"hsk6_78","level":6,"module":"HSK6","chinese_simp_full":"被告有权为自己辩护。","chinese_simp_cloze":"___有权为自己辩护。","chinese_simp_answer":"被告","chinese_trad_full":"被告有權為自己辯護。","chinese_trad_cloze":"___有權為自己辯護。","chinese_trad_answer":"被告","spanish_full":"El acusado tiene derecho a defenderse.","spanish_cloze":"El ___ tiene derecho a defenderse.","spanish_answer":"acusado","pinyin":"Bèigào yǒu quán wèi zìjǐ biànhù."},{"id":"hsk6_79","level":6,"module":"HSK6","chinese_simp_full":"孩子们在沙滩上捡了很多漂亮的贝壳。","chinese_simp_cloze":"孩子们在沙滩上捡了很多漂亮的___。","chinese_simp_answer":"贝壳","chinese_trad_full":"孩子們在沙灘上撿了很多漂亮的貝殼。","chinese_trad_cloze":"孩子們在沙灘上撿了很多漂亮的___。","chinese_trad_answer":"貝殼","spanish_full":"Los niños recogieron muchas conchas bonitas en la playa.","spanish_cloze":"Los niños recogieron muchas ___ bonitas en la playa.","spanish_answer":"conchas","pinyin":"Háizimen zài shātān shàng jiǎn le hěn duō piàoliang de bèiké."},{"id":"hsk6_80","level":6,"module":"HSK6","chinese_simp_full":"为了这份合同，他奔波了整整一个月。","chinese_simp_cloze":"为了这份合同，他___了整整一个月。","chinese_simp_answer":"奔波","chinese_trad_full":"為了這份合同，他奔波了整整一個月。","chinese_trad_cloze":"為了這份合同，他___了整整一個月。","chinese_trad_answer":"奔波","spanish_full":"Por este contrato anduvo de un lado a otro durante un mes entero.","spanish_cloze":"Por este contrato ___ durante un mes entero.","spanish_answer":"anduvo de un lado a otro","pinyin":"Wèile zhè fèn hétong, tā bēnbō le zhěngzhěng yī gè yuè.","spanish_alternatives":["anduvo recorriendo"]},{"id":"hsk6_81","level":6,"module":"HSK6","chinese_simp_full":"一列火车在原野上奔驰。","chinese_simp_cloze":"一列火车在原野上___。","chinese_simp_answer":"奔驰","chinese_trad_full":"一列火車在原野上奔馳。","chinese_trad_cloze":"一列火車在原野上___。","chinese_trad_answer":"奔馳","spanish_full":"Un tren corre a toda velocidad por la llanura.","spanish_cloze":"Un tren ___ por la llanura.","spanish_answer":"corre a toda velocidad","pinyin":"Yī liè huǒchē zài yuányě shàng bēnchí.","spanish_alternatives":["avanza velozmente"]},{"id":"hsk6_82","level":6,"module":"HSK6","chinese_simp_full":"遇到危险时，人会出于本能地躲开。","chinese_simp_cloze":"遇到危险时，人会出于___地躲开。","chinese_simp_answer":"本能","chinese_trad_full":"遇到危險時，人會出於本能地躲開。","chinese_trad_cloze":"遇到危險時，人會出於___地躲開。","chinese_trad_answer":"本能","spanish_full":"Ante el peligro, la gente se aparta por instinto.","spanish_cloze":"Ante el peligro, la gente se aparta por ___.","spanish_answer":"instinto","pinyin":"Yùdào wēixiǎn shí, rén huì chūyú běnnéng de duǒkāi."},{"id":"hsk6_83","level":6,"module":"HSK6","chinese_simp_full":"做生意首先得有本钱。","chinese_simp_cloze":"做生意首先得有___。","chinese_simp_answer":"本钱","chinese_trad_full":"做生意首先得有本錢。","chinese_trad_cloze":"做生意首先得有___。","chinese_trad_answer":"本錢","spanish_full":"Para hacer negocios, primero hace falta capital.","spanish_cloze":"Para hacer negocios, primero hace falta ___.","spanish_answer":"capital","pinyin":"Zuò shēngyì shǒuxiān děi yǒu běnqián."},{"id":"hsk6_84","level":6,"module":"HSK6","chinese_simp_full":"报名表必须由本人填写。","chinese_simp_cloze":"报名表必须由___填写。","chinese_simp_answer":"本人","chinese_trad_full":"報名表必須由本人填寫。","chinese_trad_cloze":"報名表必須由___填寫。","chinese_trad_answer":"本人","spanish_full":"El formulario de inscripción debe llenarlo la persona misma.","spanish_cloze":"El formulario de inscripción debe llenarlo ___.","spanish_answer":"la persona misma","pinyin":"Bàomíng biǎo bìxū yóu běnrén tiánxiě.","spanish_alternatives":["el interesado"]},{"id":"hsk6_85","level":6,"module":"HSK6","chinese_simp_full":"问题本身并不复杂，是我们想多了。","chinese_simp_cloze":"问题___并不复杂，是我们想多了。","chinese_simp_answer":"本身","chinese_trad_full":"問題本身並不複雜，是我們想多了。","chinese_trad_cloze":"問題___並不複雜，是我們想多了。","chinese_trad_answer":"本身","spanish_full":"El problema en sí no es complicado; nosotros lo complicamos de más.","spanish_cloze":"El problema ___ no es complicado; nosotros lo complicamos de más.","spanish_answer":"en sí","pinyin":"Wèntí běnshēn bìng bù fùzá, shì wǒmen xiǎng duō le."},{"id":"hsk6_86","level":6,"module":"HSK6","chinese_simp_full":"他真有本事，这么难的问题都解决了。","chinese_simp_cloze":"他真有___，这么难的问题都解决了。","chinese_simp_answer":"本事","chinese_trad_full":"他真有本事，這麼難的問題都解決了。","chinese_trad_cloze":"他真有___，這麼難的問題都解決了。","chinese_trad_answer":"本事","spanish_full":"Qué habilidad tiene: resolvió hasta un problema tan difícil.","spanish_cloze":"Qué ___ tiene: resolvió hasta un problema tan difícil.","spanish_answer":"habilidad","pinyin":"Tā zhēn yǒu běnshi, zhème nán de wèntí dōu jiějué le.","spanish_alternatives":["capacidad"]},{"id":"hsk6_87","level":6,"module":"HSK6","chinese_simp_full":"他第一次跳舞，动作很笨拙。","chinese_simp_cloze":"他第一次跳舞，动作很___。","chinese_simp_answer":"笨拙","chinese_trad_full":"他第一次跳舞，動作很笨拙。","chinese_trad_cloze":"他第一次跳舞，動作很___。","chinese_trad_answer":"笨拙","spanish_full":"Bailando por primera vez, sus movimientos eran muy torpes.","spanish_cloze":"Bailando por primera vez, sus movimientos eran muy ___.","spanish_answer":"torpes","pinyin":"Tā dì yī cì tiàowǔ, dòngzuò hěn bènzhuō."},{"id":"hsk6_88","level":6,"module":"HSK6","chinese_simp_full":"接连的打击让他的精神几乎崩溃。","chinese_simp_cloze":"接连的打击让他的精神几乎___。","chinese_simp_answer":"崩溃","chinese_trad_full":"接連的打擊讓他的精神幾乎崩潰。","chinese_trad_cloze":"接連的打擊讓他的精神幾乎___。","chinese_trad_answer":"崩潰","spanish_full":"Los golpes sucesivos casi hicieron colapsar su ánimo.","spanish_cloze":"Los golpes sucesivos casi hicieron ___ su ánimo.","spanish_answer":"colapsar","pinyin":"Jiēlián de dǎjī ràng tā de jīngshén jīhū bēngkuì.","spanish_alternatives":["derrumbarse"]},{"id":"hsk6_89","level":6,"module":"HSK6","chinese_simp_full":"甭客气，就当在自己家里一样。","chinese_simp_cloze":"___客气，就当在自己家里一样。","chinese_simp_answer":"甭","chinese_trad_full":"甭客氣，就當在自己家裡一樣。","chinese_trad_cloze":"___客氣，就當在自己家裡一樣。","chinese_trad_answer":"甭","spanish_full":"No hace falta que sean formales; pónganse como en su propia casa.","spanish_cloze":"___ que sean formales; pónganse como en su propia casa.","spanish_answer":"No hace falta","pinyin":"Béng kèqi, jiù dàng zài zìjǐ jiā lǐ yīyàng.","spanish_alternatives":["No se molesten"]},{"id":"hsk6_90","level":6,"module":"HSK6","chinese_simp_full":"孩子们高兴得又蹦又跳。","chinese_simp_cloze":"孩子们高兴得又___又跳。","chinese_simp_answer":"蹦","chinese_trad_full":"孩子們高興得又蹦又跳。","chinese_trad_cloze":"孩子們高興得又___又跳。","chinese_trad_answer":"蹦","spanish_full":"Los niños, contentos, no paran de saltar y brincar.","spanish_cloze":"Los niños, contentos, no paran de ___.","spanish_answer":"saltar y brincar","pinyin":"Háizimen gāoxìng de yòu bèng yòu tiào."},{"id":"hsk6_91","level":6,"module":"HSK6","chinese_simp_full":"听到胜利的消息，人群中迸发出一阵欢呼。","chinese_simp_cloze":"听到胜利的消息，人群中___出一阵欢呼。","chinese_simp_answer":"迸发","chinese_trad_full":"聽到勝利的消息，人群中迸發出一陣歡呼。","chinese_trad_cloze":"聽到勝利的消息，人群中___出一陣歡呼。","chinese_trad_answer":"迸發","spanish_full":"Al oír la noticia de la victoria, la multitud dejó escapar un grito de alegría.","spanish_cloze":"Al oír la noticia de la victoria, la multitud ___ un grito de alegría.","spanish_answer":"dejó escapar","pinyin":"Tīngdào shènglì de xiāoxi, rénqún zhōng bèngfā chū yī zhèn huānhū.","spanish_alternatives":["estalló en"]},{"id":"hsk6_92","level":6,"module":"HSK6","chinese_simp_full":"父母不该逼迫孩子学自己不喜欢的东西。","chinese_simp_cloze":"父母不该___孩子学自己不喜欢的东西。","chinese_simp_answer":"逼迫","chinese_trad_full":"父母不該逼迫孩子學自己不喜歡的東西。","chinese_trad_cloze":"父母不該___孩子學自己不喜歡的東西。","chinese_trad_answer":"逼迫","spanish_full":"Los padres no deberían forzar a los hijos a estudiar cosas que no les gustan.","spanish_cloze":"Los padres no deberían ___ a los hijos a estudiar cosas que no les gustan.","spanish_answer":"forzar","pinyin":"Fùmǔ bù gāi bīpò háizi xué zìjǐ bù xǐhuan de dōngxi.","spanish_alternatives":["obligar"]},{"id":"hsk6_93","level":6,"module":"HSK6","chinese_simp_full":"宝宝流鼻涕了，需要帮他擦干净。","chinese_simp_cloze":"宝宝流___了，需要帮他擦干净。","chinese_simp_answer":"鼻涕","chinese_trad_full":"寶寶流鼻涕了，需要幫他擦乾淨。","chinese_trad_cloze":"寶寶流___了，需要幫他擦乾淨。","chinese_trad_answer":"鼻涕","spanish_full":"El bebé tiene mocos: hay que ayudarle a limpiárselos.","spanish_cloze":"El bebé tiene ___: hay que ayudarle a limpiárselos.","spanish_answer":"mocos","pinyin":"Bǎobao liú bítì le, xūyào bāng tā cā gānjìng."},{"id":"hsk6_94","level":6,"module":"HSK6","chinese_simp_full":"打个比方，学习就像爬山一样。","chinese_simp_cloze":"打个___，学习就像爬山一样。","chinese_simp_answer":"比方","chinese_trad_full":"打個比方，學習就像爬山一樣。","chinese_trad_cloze":"打個___，學習就像爬山一樣。","chinese_trad_answer":"比方","spanish_full":"Por poner un ejemplo, estudiar es como escalar una montaña.","spanish_cloze":"Por poner un ___, estudiar es como escalar una montaña.","spanish_answer":"ejemplo","pinyin":"Dǎ gè bǐfang, xuéxí jiù xiàng páshān yīyàng."},{"id":"hsk6_95","level":6,"module":"HSK6","chinese_simp_full":"诗人用美丽的比喻描写春天。","chinese_simp_cloze":"诗人用美丽的___描写春天。","chinese_simp_answer":"比喻","chinese_trad_full":"詩人用美麗的比喻描寫春天。","chinese_trad_cloze":"詩人用美麗的___描寫春天。","chinese_trad_answer":"比喻","spanish_full":"El poeta usa bellas metáforas para describir la primavera.","spanish_cloze":"El poeta usa bellas ___ para describir la primavera.","spanish_answer":"metáforas","pinyin":"Shīrén yòng měilì de bǐyù miáoxiě chūntiān."},{"id":"hsk6_96","level":6,"module":"HSK6","chinese_simp_full":"在出口产品中，电子产品的比重越来越大。","chinese_simp_cloze":"在出口产品中，电子产品的___越来越大。","chinese_simp_answer":"比重","chinese_trad_full":"在出口產品中，電子產品的比重越來越大。","chinese_trad_cloze":"在出口產品中，電子產品的___越來越大。","chinese_trad_answer":"比重","spanish_full":"Dentro de los productos exportados, la proporción de los electrónicos es cada vez mayor.","spanish_cloze":"Dentro de los productos exportados, la ___ de los electrónicos es cada vez mayor.","spanish_answer":"proporción","pinyin":"Zài chūkǒu chǎnpǐn zhōng, diànzǐ chǎnpǐn de bǐzhòng yuèláiyuè dà."},{"id":"hsk6_97","level":6,"module":"HSK6","chinese_simp_full":"我们不能鄙视任何诚实劳动的人。","chinese_simp_cloze":"我们不能___任何诚实劳动的人。","chinese_simp_answer":"鄙视","chinese_trad_full":"我們不能鄙視任何誠實勞動的人。","chinese_trad_cloze":"我們不能___任何誠實勞動的人。","chinese_trad_answer":"鄙視","spanish_full":"No debemos despreciar a nadie que trabaje honestamente.","spanish_cloze":"No debemos ___ a nadie que trabaje honestamente.","spanish_answer":"despreciar","pinyin":"Wǒmen bù néng bǐshì rènhé chéngshí láodòng de rén."},{"id":"hsk6_98","level":6,"module":"HSK6","chinese_simp_full":"这种管理制度存在明显的弊病。","chinese_simp_cloze":"这种管理制度存在明显的___。","chinese_simp_answer":"弊病","chinese_trad_full":"這種管理制度存在明顯的弊病。","chinese_trad_cloze":"這種管理制度存在明顯的___。","chinese_trad_answer":"弊病","spanish_full":"Este sistema de gestión presenta vicios evidentes.","spanish_cloze":"Este sistema de gestión presenta ___ evidentes.","spanish_answer":"vicios","pinyin":"Zhè zhǒng guǎnlǐ zhìdù cúnzài míngxiǎn de bìbìng.","spanish_alternatives":["defectos"]},{"id":"hsk6_99","level":6,"module":"HSK6","chinese_simp_full":"改革的目的是消除制度中的弊端。","chinese_simp_cloze":"改革的目的是消除制度中的___。","chinese_simp_answer":"弊端","chinese_trad_full":"改革的目的是消除制度中的弊端。","chinese_trad_cloze":"改革的目的是消除制度中的___。","chinese_trad_answer":"弊端","spanish_full":"El objetivo de la reforma es eliminar los abusos del sistema.","spanish_cloze":"El objetivo de la reforma es eliminar los ___ del sistema.","spanish_answer":"abusos","pinyin":"Gǎigé de mùdì shì xiāochú zhìdù zhōng de bìduān.","spanish_alternatives":["inconvenientes"]},{"id":"hsk6_100","level":6,"module":"HSK6","chinese_simp_full":"她伸开双臂，拥抱了女儿。","chinese_simp_cloze":"她伸开双___，拥抱了女儿。","chinese_simp_answer":"臂","chinese_trad_full":"她伸開雙臂，擁抱了女兒。","chinese_trad_cloze":"她伸開雙___，擁抱了女兒。","chinese_trad_answer":"臂","spanish_full":"Abrió los brazos y abrazó a su hija.","spanish_cloze":"Abrió los ___ y abrazó a su hija.","spanish_answer":"brazos","pinyin":"Tā shēn kāi shuāng bì, yōngbào le nǚ'ér."},{"id":"hsk6_101","level":6,"module":"HSK6","chinese_simp_full":"山区交通闭塞，孩子们上学要走很远的路。","chinese_simp_cloze":"山区交通___，孩子们上学要走很远的路。","chinese_simp_answer":"闭塞","chinese_trad_full":"山區交通閉塞，孩子們上學要走很遠的路。","chinese_trad_cloze":"山區交通___，孩子們上學要走很遠的路。","chinese_trad_answer":"閉塞","spanish_full":"En la zona montañosa las comunicaciones están aisladas y los niños caminan mucho para ir a la escuela.","spanish_cloze":"En la zona montañosa las comunicaciones están ___ y los niños caminan mucho para ir a la escuela.","spanish_answer":"aisladas","pinyin":"Shānqū jiāotōng bìsè, háizimen shàngxué yào zǒu hěn yuǎn de lù.","spanish_alternatives":["bloqueadas"]},{"id":"hsk6_102","level":6,"module":"HSK6","chinese_simp_full":"奶奶坐在门口编织毛衣。","chinese_simp_cloze":"奶奶坐在门口___毛衣。","chinese_simp_answer":"编织","chinese_trad_full":"奶奶坐在門口編織毛衣。","chinese_trad_cloze":"奶奶坐在門口___毛衣。","chinese_trad_answer":"編織","spanish_full":"La abuela se sienta en la puerta tejiendo un suéter.","spanish_cloze":"La abuela se sienta en la puerta ___ un suéter.","spanish_answer":"tejiendo","pinyin":"Nǎinai zuò zài ménkǒu biānzhī máoyī.","spanish_alternatives":["tejido"]},{"id":"hsk6_103","level":6,"module":"HSK6","chinese_simp_full":"他自愿到边疆工作，一去就是十年。","chinese_simp_cloze":"他自愿到___工作，一去就是十年。","chinese_simp_answer":"边疆","chinese_trad_full":"他自願到邊疆工作，一去就是十年。","chinese_trad_cloze":"他自願到___工作，一去就是十年。","chinese_trad_answer":"邊疆","spanish_full":"Se fue por voluntad propia a trabajar a la frontera y estuvo diez años.","spanish_cloze":"Se fue por voluntad propia a trabajar a la ___ y estuvo diez años.","spanish_answer":"frontera","pinyin":"Tā zìyuàn dào biānjiāng gōngzuò, yī qù jiùshì shí nián."},{"id":"hsk6_104","level":6,"module":"HSK6","chinese_simp_full":"两国在边界地区开设了贸易市场。","chinese_simp_cloze":"两国在___地区开设了贸易市场。","chinese_simp_answer":"边界","chinese_trad_full":"兩國在邊界地區開設了貿易市場。","chinese_trad_cloze":"兩國在___地區開設了貿易市場。","chinese_trad_answer":"邊界","spanish_full":"Los dos países instalaron un mercado comercial en la zona limítrofe.","spanish_cloze":"Los dos países instalaron un mercado comercial en la zona ___.","spanish_answer":"limítrofe","pinyin":"Liǎng guó zài biānjiè dìqū kāishè le màoyì shìchǎng.","spanish_alternatives":["fronteriza"]},{"id":"hsk6_105","level":6,"module":"HSK6","chinese_simp_full":"走私活动在边境很猖獗。","chinese_simp_cloze":"走私活动在___很猖獗。","chinese_simp_answer":"边境","chinese_trad_full":"走私活動在邊境很猖獗。","chinese_trad_cloze":"走私活動在___很猖獗。","chinese_trad_answer":"邊境","spanish_full":"El contrabando está muy activo en la frontera.","spanish_cloze":"El contrabando está muy activo en la ___.","spanish_answer":"frontera","pinyin":"Zǒusī huódòng zài biānjìng hěn chāngjué."},{"id":"hsk6_106","level":6,"module":"HSK6","chinese_simp_full":"他站在悬崖的边缘，不敢往下看。","chinese_simp_cloze":"他站在悬崖的___，不敢往下看。","chinese_simp_answer":"边缘","chinese_trad_full":"他站在懸崖的邊緣，不敢往下看。","chinese_trad_cloze":"他站在懸崖的___，不敢往下看。","chinese_trad_answer":"邊緣","spanish_full":"Parado al borde del precipicio, no se atrevía a mirar hacia abajo.","spanish_cloze":"Parado al ___ del precipicio, no se atrevía a mirar hacia abajo.","spanish_answer":"borde","pinyin":"Tā zhàn zài xuányá de biānyuán, bù gǎn wǎngxià kàn.","spanish_alternatives":["margen"]},{"id":"hsk6_107","level":6,"module":"HSK6","chinese_simp_full":"老师的话一直鞭策着我前进。","chinese_simp_cloze":"老师的话一直___着我前进。","chinese_simp_answer":"鞭策","chinese_trad_full":"老師的話一直鞭策著我前進。","chinese_trad_cloze":"老師的話一直___著我前進。","chinese_trad_answer":"鞭策","spanish_full":"Las palabras del profesor me han impulsado a seguir adelante.","spanish_cloze":"Las palabras del profesor me han ___ a seguir adelante.","spanish_answer":"impulsado","pinyin":"Lǎoshī de huà yīzhí biāncèzhe wǒ qiánjìn.","spanish_alternatives":["estimulado"]},{"id":"hsk6_108","level":6,"module":"HSK6","chinese_simp_full":"这只皮箱被压得很扁。","chinese_simp_cloze":"这只皮箱被压得很___。","chinese_simp_answer":"扁","chinese_trad_full":"這隻皮箱被壓得很扁。","chinese_trad_cloze":"這隻皮箱被壓得很___。","chinese_trad_answer":"扁","spanish_full":"Esta maleta quedó muy aplastada.","spanish_cloze":"Esta maleta quedó muy ___.","spanish_answer":"aplastada","pinyin":"Zhè zhǐ píxiāng bèi yā de hěn biǎn.","spanish_alternatives":["chata"]},{"id":"hsk6_109","level":6,"module":"HSK6","chinese_simp_full":"不要为了抬高自己而贬低别人。","chinese_simp_cloze":"不要为了抬高自己而___别人。","chinese_simp_answer":"贬低","chinese_trad_full":"不要為了抬高自己而貶低別人。","chinese_trad_cloze":"不要為了抬高自己而___別人。","chinese_trad_answer":"貶低","spanish_full":"No hay que denigrar a los demás para quedar bien uno.","spanish_cloze":"No hay que ___ a los demás para quedar bien uno.","spanish_answer":"denigrar","pinyin":"Búyào wèile táigāo zìjǐ ér biǎndī biérén.","spanish_alternatives":["menospreciar"]},{"id":"hsk6_110","level":6,"module":"HSK6","chinese_simp_full":"这个词在这里带有贬义。","chinese_simp_cloze":"这个词在这里带有___。","chinese_simp_answer":"贬义","chinese_trad_full":"這個詞在這裡帶有貶義。","chinese_trad_cloze":"這個詞在這裡帶有___。","chinese_trad_answer":"貶義","spanish_full":"Esta palabra tiene aquí una connotación negativa.","spanish_cloze":"Esta palabra tiene aquí una ___.","spanish_answer":"connotación negativa","pinyin":"Zhège cí zài zhèlǐ dàiyǒu biǎnyì.","spanish_alternatives":["sentido negativo"]},{"id":"hsk6_111","level":6,"module":"HSK6","chinese_simp_full":"地铁的开通给市民带来很大便利。","chinese_simp_cloze":"地铁的开通给市民带来很大___。","chinese_simp_answer":"便利","chinese_trad_full":"地鐵的開通給市民帶來很大便利。","chinese_trad_cloze":"地鐵的開通給市民帶來很大___。","chinese_trad_answer":"便利","spanish_full":"La apertura del subterráneo trajo mucha comodidad a los vecinos.","spanish_cloze":"La apertura del subterráneo trajo mucha ___ a los vecinos.","spanish_answer":"comodidad","pinyin":"Dìtiě de kāitōng gěi shìmín dàilái hěn dà biànlì.","spanish_alternatives":["conveniencia"]},{"id":"hsk6_112","level":6,"module":"HSK6","chinese_simp_full":"他出门前给我留了一张便条。","chinese_simp_cloze":"他出门前给我留了一张___。","chinese_simp_answer":"便条","chinese_trad_full":"他出門前給我留了一張便條。","chinese_trad_cloze":"他出門前給我留了一張___。","chinese_trad_answer":"便條","spanish_full":"Antes de salir me dejó una notita.","spanish_cloze":"Antes de salir me dejó una ___.","spanish_answer":"notita","pinyin":"Tā chūmén qián gěi wǒ liú le yī zhāng biàntiáo.","spanish_alternatives":["nota"]},{"id":"hsk6_113","level":6,"module":"HSK6","chinese_simp_full":"这本词典按拼音排列，便于查找。","chinese_simp_cloze":"这本词典按拼音排列，___查找。","chinese_simp_answer":"便于","chinese_trad_full":"這本詞典按拼音排列，便於查找。","chinese_trad_cloze":"這本詞典按拼音排列，___查找。","chinese_trad_answer":"便於","spanish_full":"Este diccionario está ordenado por pinyin, lo que facilita la búsqueda.","spanish_cloze":"Este diccionario está ordenado por pinyin, lo que ___.","spanish_answer":"facilita la búsqueda","pinyin":"Zhè běn cídiǎn àn pīnyīn páiliè, biànyú cházhǎo.","spanish_alternatives":["hace fácil la búsqueda"]},{"id":"hsk6_114","level":6,"module":"HSK6","chinese_simp_full":"家里突然发生了变故，他只好辍学。","chinese_simp_cloze":"家里突然发生了___，他只好辍学。","chinese_simp_answer":"变故","chinese_trad_full":"家裡突然發生了變故，他只好輟學。","chinese_trad_cloze":"家裡突然發生了___，他只好輟學。","chinese_trad_answer":"變故","spanish_full":"En su familia ocurrió de repente una desgracia y tuvo que dejar los estudios.","spanish_cloze":"En su familia ocurrió de repente una ___ y tuvo que dejar los estudios.","spanish_answer":"desgracia","pinyin":"Jiā lǐ tūrán fāshēng le biàngù, tā zhǐhǎo chuòxué.","spanish_alternatives":["imprevisto"]},{"id":"hsk6_115","level":6,"module":"HSK6","chinese_simp_full":"这座小城经历了巨大的变迁。","chinese_simp_cloze":"这座小城经历了巨大的___。","chinese_simp_answer":"变迁","chinese_trad_full":"這座小城經歷了巨大的變遷。","chinese_trad_cloze":"這座小城經歷了巨大的___。","chinese_trad_answer":"變遷","spanish_full":"Esta pequeña ciudad atravesó enormes transformaciones.","spanish_cloze":"Esta pequeña ciudad atravesó enormes ___.","spanish_answer":"transformaciones","pinyin":"Zhè zuò xiǎochéng jīnglì le jùdà de biànqiān.","spanish_alternatives":["cambios"]},{"id":"hsk6_116","level":6,"module":"HSK6","chinese_simp_full":"天气太热，食物容易变质。","chinese_simp_cloze":"天气太热，食物容易___。","chinese_simp_answer":"变质","chinese_trad_full":"天氣太熱，食物容易變質。","chinese_trad_cloze":"天氣太熱，食物容易___。","chinese_trad_answer":"變質","spanish_full":"Con tanto calor, la comida se echa a perder fácilmente.","spanish_cloze":"Con tanto calor, la comida ___ fácilmente.","spanish_answer":"se echa a perder","pinyin":"Tiānqì tài rè, shíwù róngyì biànzhì.","spanish_alternatives":["se descompone"]},{"id":"hsk6_117","level":6,"module":"HSK6","chinese_simp_full":"现场只剩下半截车牌，很难辨认。","chinese_simp_cloze":"现场只剩下半截车牌，很难___。","chinese_simp_answer":"辨认","chinese_trad_full":"現場只剩下半截車牌，很難辨認。","chinese_trad_cloze":"現場只剩下半截車牌，很難___。","chinese_trad_answer":"辨認","spanish_full":"En el lugar solo quedó media patente, muy difícil de identificar.","spanish_cloze":"En el lugar solo quedó media patente, muy difícil de ___.","spanish_answer":"identificar","pinyin":"Xiànchǎng zhǐ shèngxià bànjié chēpái, hěn nán biànrèn.","spanish_alternatives":["reconocer"]},{"id":"hsk6_118","level":6,"module":"HSK6","chinese_simp_full":"律师依法为被告辩护。","chinese_simp_cloze":"律师依法为被告___。","chinese_simp_answer":"辩护","chinese_trad_full":"律師依法為被告辯護。","chinese_trad_cloze":"律師依法為被告___。","chinese_trad_answer":"辯護","spanish_full":"El abogado defiende al acusado conforme a la ley.","spanish_cloze":"El abogado ___ al acusado conforme a la ley.","spanish_answer":"defiende","pinyin":"Lǜshī yīfǎ wèi bèigào biànhù.","spanish_alternatives":["aboga por"]},{"id":"hsk6_119","level":6,"module":"HSK6","chinese_simp_full":"事实面前，任何辩解都是多余的。","chinese_simp_cloze":"事实面前，任何___都是多余的。","chinese_simp_answer":"辩解","chinese_trad_full":"事實面前，任何辯解都是多餘的。","chinese_trad_cloze":"事實面前，任何___都是多餘的。","chinese_trad_answer":"辯解","spanish_full":"Ante los hechos, cualquier justificativo sobra.","spanish_cloze":"Ante los hechos, cualquier ___ sobra.","spanish_answer":"justificativo","pinyin":"Shìshí miànqián, rènhé biànjiě dōu shì duōyú de.","spanish_alternatives":["excusa"]},{"id":"hsk6_120","level":6,"module":"HSK6","chinese_simp_full":"我们要用辩证的眼光看问题。","chinese_simp_cloze":"我们要用___的眼光看问题。","chinese_simp_answer":"辩证","chinese_trad_full":"我們要用辯證的眼光看問題。","chinese_trad_cloze":"我們要用___的眼光看問題。","chinese_trad_answer":"辯證","spanish_full":"Debemos mirar los problemas con una mirada dialéctica.","spanish_cloze":"Debemos mirar los problemas con una mirada ___.","spanish_answer":"dialéctica","pinyin":"Wǒmen yào yòng biànzhèng de yǎnguāng kàn wèntí."},{"id":"hsk6_121","level":6,"module":"HSK6","chinese_simp_full":"小女孩扎着两条长长的辫子。","chinese_simp_cloze":"小女孩扎着两条长长的___。","chinese_simp_answer":"辫子","chinese_trad_full":"小女孩扎著兩條長長的辮子。","chinese_trad_cloze":"小女孩扎著兩條長長的___。","chinese_trad_answer":"辮子","spanish_full":"La nena lleva dos trenzas larguísimas.","spanish_cloze":"La nena lleva dos ___ larguísimas.","spanish_answer":"trenzas","pinyin":"Xiǎo nǚhái zhāzhe liǎng tiáo chángcháng de biànzi."},{"id":"hsk6_122","level":6,"module":"HSK6","chinese_simp_full":"这家连锁店的分店遍布全国。","chinese_simp_cloze":"这家连锁店的分店___全国。","chinese_simp_answer":"遍布","chinese_trad_full":"這家連鎖店的分店遍佈全國。","chinese_trad_cloze":"這家連鎖店的分店___全國。","chinese_trad_answer":"遍佈","spanish_full":"Las sucursales de esta cadena están extendidas por todo el país.","spanish_cloze":"Las sucursales de esta cadena están ___.","spanish_answer":"extendidas por todo el país","pinyin":"Zhè jiā liánsuǒdiàn de fēndiàn biànbù quánguó.","spanish_alternatives":["en todo el país"]},{"id":"hsk6_123","level":6,"module":"HSK6","chinese_simp_full":"生物教室里陈列着各种蝴蝶标本。","chinese_simp_cloze":"生物教室里陈列着各种蝴蝶___。","chinese_simp_answer":"标本","chinese_trad_full":"生物教室裡陳列著各種蝴蝶標本。","chinese_trad_cloze":"生物教室裡陳列著各種蝴蝶___。","chinese_trad_answer":"標本","spanish_full":"En el aula de biología hay exhibidos especímenes de toda clase de mariposas.","spanish_cloze":"En el aula de biología hay exhibidos ___ de toda clase de mariposas.","spanish_answer":"especímenes","pinyin":"Shēngwù jiàoshì lǐ chénlièzhe gè zhǒng húdié biāoběn."},{"id":"hsk6_124","level":6,"module":"HSK6","chinese_simp_full":"他在地图上做了标记。","chinese_simp_cloze":"他在地图上做了___。","chinese_simp_answer":"标记","chinese_trad_full":"他在地圖上做了標記。","chinese_trad_cloze":"他在地圖上做了___。","chinese_trad_answer":"標記","spanish_full":"Hizo marcas en el mapa.","spanish_cloze":"Hizo ___ en el mapa.","spanish_answer":"marcas","pinyin":"Tā zài dìtú shàng zuò le biāojì.","spanish_alternatives":["señales"]},{"id":"hsk6_125","level":6,"module":"HSK6","chinese_simp_full":"这篇文章的标题吸引了很多读者。","chinese_simp_cloze":"这篇文章的___吸引了很多读者。","chinese_simp_answer":"标题","chinese_trad_full":"這篇文章的標題吸引了很多讀者。","chinese_trad_cloze":"這篇文章的___吸引了很多讀者。","chinese_trad_answer":"標題","spanish_full":"El título de este artículo atrajo a muchos lectores.","spanish_cloze":"El ___ de este artículo atrajo a muchos lectores.","spanish_answer":"título","pinyin":"Zhè piān wénzhāng de biāotí xīyǐn le hěn duō dúzhě."},{"id":"hsk6_126","level":6,"module":"HSK6","chinese_simp_full":"委员会对这项提案进行了表决。","chinese_simp_cloze":"委员会对这项提案进行了___。","chinese_simp_answer":"表决","chinese_trad_full":"委員會對這項提案進行了表決。","chinese_trad_cloze":"委員會對這項提案進行了___。","chinese_trad_answer":"表決","spanish_full":"El comité sometió a votación esta propuesta.","spanish_cloze":"El comité ___ esta propuesta.","spanish_answer":"sometió a votación","pinyin":"Wěiyuánhuì duì zhè xiàng tí'àn jìnxíng le biǎojué.","spanish_alternatives":["votó"]},{"id":"hsk6_127","level":6,"module":"HSK6","chinese_simp_full":"到目前为止，官方还没有表态。","chinese_simp_cloze":"到目前为止，官方还没有___。","chinese_simp_answer":"表态","chinese_trad_full":"到目前為止，官方還沒有表態。","chinese_trad_cloze":"到目前為止，官方還沒有___。","chinese_trad_answer":"表態","spanish_full":"Hasta ahora, las autoridades todavía no se han pronunciado.","spanish_cloze":"Hasta ahora, las autoridades todavía no ___.","spanish_answer":"se han pronunciado","pinyin":"Dào mùqián wéizhǐ, guānfāng hái méiyǒu biǎotài.","spanish_alternatives":["han dado su postura"]},{"id":"hsk6_128","level":6,"module":"HSK6","chinese_simp_full":"政府表彰了抗震救灾的英雄们。","chinese_simp_cloze":"政府___了抗震救灾的英雄们。","chinese_simp_answer":"表彰","chinese_trad_full":"政府表彰了抗震救災的英雄們。","chinese_trad_cloze":"政府___了抗震救災的英雄們。","chinese_trad_answer":"表彰","spanish_full":"El gobierno condecoró a los héroes del rescate tras el terremoto.","spanish_cloze":"El gobierno ___ a los héroes del rescate tras el terremoto.","spanish_answer":"condecoró","pinyin":"Zhèngfǔ biǎozhāng le kàngzhèn jiùzāi de yīngxióngmen.","spanish_alternatives":["reconoció a"]},{"id":"hsk6_129","level":6,"module":"HSK6","chinese_simp_full":"有话就说出来，别憋在心里。","chinese_simp_cloze":"有话就说出来，别___在心里。","chinese_simp_answer":"憋","chinese_trad_full":"有話就說出來，別憋在心裡。","chinese_trad_cloze":"有話就說出來，別___在心裡。","chinese_trad_answer":"憋","spanish_full":"Si tienes algo que decir, dilo; no lo guardes por dentro.","spanish_cloze":"Si tienes algo que decir, dilo; ___ por dentro.","spanish_answer":"no lo guardes","pinyin":"Yǒu huà jiù shuō chūlái, bié biē zài xīnlǐ.","spanish_alternatives":["no te lo tragues"]},{"id":"hsk6_130","level":6,"module":"HSK6","chinese_simp_full":"他们在郊区买了一栋别墅。","chinese_simp_cloze":"他们在郊区买了一栋___。","chinese_simp_answer":"别墅","chinese_trad_full":"他們在郊區買了一棟別墅。","chinese_trad_cloze":"他們在郊區買了一棟___。","chinese_trad_answer":"別墅","spanish_full":"Compraron una casa quinta en las afueras.","spanish_cloze":"Compraron una ___ en las afueras.","spanish_answer":"casa quinta","pinyin":"Tāmen zài jiāoqū mǎi le yī dòng biéshù.","spanish_alternatives":["villa"]},{"id":"hsk6_131","level":6,"module":"HSK6","chinese_simp_full":"这家咖啡馆的装修十分别致。","chinese_simp_cloze":"这家咖啡馆的装修十分___。","chinese_simp_answer":"别致","chinese_trad_full":"這家咖啡館的裝修十分別致。","chinese_trad_cloze":"這家咖啡館的裝修十分___。","chinese_trad_answer":"別緻","spanish_full":"La decoración de esta cafetería es sumamente original.","spanish_cloze":"La decoración de esta cafetería es sumamente ___.","spanish_answer":"original","pinyin":"Zhè jiā kāfēiguǎn de zhuāngxiū shíbié biézhì.","spanish_alternatives":["pintoresca"]},{"id":"hsk6_132","level":6,"module":"HSK6","chinese_simp_full":"两人吵过一架后，见面总觉得别扭。","chinese_simp_cloze":"两人吵过一架后，见面总觉得___。","chinese_simp_answer":"别扭","chinese_trad_full":"兩人吵過一架後，見面總覺得彆扭。","chinese_trad_cloze":"兩人吵過一架後，見面總覺得___。","chinese_trad_answer":"彆扭","spanish_full":"Después de pelearse una vez, se sienten incómodos cada vez que se ven.","spanish_cloze":"Después de pelearse una vez, se sienten ___ cada vez que se ven.","spanish_answer":"incómodos","pinyin":"Liǎng rén chǎoguò yī jià hòu, jiànmiàn zǒng juéde bièniu."},{"id":"hsk6_133","level":6,"module":"HSK6","chinese_simp_full":"这家百年老店濒临破产。","chinese_simp_cloze":"这家百年老店___破产。","chinese_simp_answer":"濒临","chinese_trad_full":"這家百年老店瀕臨破產。","chinese_trad_cloze":"這家百年老店___破產。","chinese_trad_answer":"瀕臨","spanish_full":"Este comercio centenario está al borde de la quiebra.","spanish_cloze":"Este comercio centenario está ___ la quiebra.","spanish_answer":"al borde de","pinyin":"Zhè jiā bǎinián lǎodiàn bīnlín pòchǎn."},{"id":"hsk6_134","level":6,"module":"HSK6","chinese_simp_full":"昨晚的冰雹把菜地的菜全砸坏了。","chinese_simp_cloze":"昨晚的___把菜地的菜全砸坏了。","chinese_simp_answer":"冰雹","chinese_trad_full":"昨晚的冰雹把菜地的菜全砸壞了。","chinese_trad_cloze":"昨晚的___把菜地的菜全砸壞了。","chinese_trad_answer":"冰雹","spanish_full":"El granizo de anoche destrozó todas las verduras de la huerta.","spanish_cloze":"El ___ de anoche destrozó todas las verduras de la huerta.","spanish_answer":"granizo","pinyin":"Zuówǎn de bīngbáo bǎ càidì de cài quán zá huài le."},{"id":"hsk6_135","level":6,"module":"HSK6","chinese_simp_full":"他这次考试的成绩是丙等。","chinese_simp_cloze":"他这次考试的成绩是___等。","chinese_simp_answer":"丙","chinese_trad_full":"他這次考試的成績是丙等。","chinese_trad_cloze":"他這次考試的成績是___等。","chinese_trad_answer":"丙","spanish_full":"Su calificación en este examen es de categoría C.","spanish_cloze":"Su calificación en este examen es de categoría ___.","spanish_answer":"C","pinyin":"Tā zhè cì kǎoshì de chéngjì shì bǐng děng.","spanish_alternatives":["c"]},{"id":"hsk6_136","level":6,"module":"HSK6","chinese_simp_full":"成功并非偶然，而是努力的结果。","chinese_simp_cloze":"成功___偶然，而是努力的结果。","chinese_simp_answer":"并非","chinese_trad_full":"成功並非偶然，而是努力的結果。","chinese_trad_cloze":"成功___偶然，而是努力的結果。","chinese_trad_answer":"並非","spanish_full":"El éxito no es en absoluto casualidad, sino el resultado del esfuerzo.","spanish_cloze":"El éxito ___ casualidad, sino el resultado del esfuerzo.","spanish_answer":"no es en absoluto","pinyin":"Chénggōng bìngfēi ǒurán, érshì nǔlì de jiéguǒ.","spanish_alternatives":["no es precisamente"]},{"id":"hsk6_137","level":6,"module":"HSK6","chinese_simp_full":"两队积分并列第一。","chinese_simp_cloze":"两队积分___第一。","chinese_simp_answer":"并列","chinese_trad_full":"兩隊積分並列第一。","chinese_trad_cloze":"兩隊積分___第一。","chinese_trad_answer":"並列","spanish_full":"Los dos equipos empataron en el primer puesto.","spanish_cloze":"Los dos equipos ___ en el primer puesto.","spanish_answer":"empataron","pinyin":"Liǎng duì jīfēn bìngliè dì yī.","spanish_alternatives":["quedaron igualados"]},{"id":"hsk6_138","level":6,"module":"HSK6","chinese_simp_full":"资本家剥削工人的剩余价值。","chinese_simp_cloze":"资本家___工人的剩余价值。","chinese_simp_answer":"剥削","chinese_trad_full":"資本家剝削工人的剩餘價值。","chinese_trad_cloze":"資本家___工人的剩餘價值。","chinese_trad_answer":"剝削","spanish_full":"Los capitalistas explotan la plusvalía de los obreros.","spanish_cloze":"Los capitalistas ___ la plusvalía de los obreros.","spanish_answer":"explotan","pinyin":"Zīběnjiā bōxuē gōngrén de shèngyú jiàzhí."},{"id":"hsk6_139","level":6,"module":"HSK6","chinese_simp_full":"他轻轻拨开草丛，发现了一只小兔子。","chinese_simp_cloze":"他轻轻___开草丛，发现了一只小兔子。","chinese_simp_answer":"拨","chinese_trad_full":"他輕輕撥開草叢，發現了一隻小兔子。","chinese_trad_cloze":"他輕輕___開草叢，發現了一隻小兔子。","chinese_trad_answer":"撥","spanish_full":"Apartó suavemente la hierba y descubrió un conejito.","spanish_cloze":"___ suavemente la hierba y descubrió un conejito.","spanish_answer":"Apartó","pinyin":"Tā qīngqīng bō kāi cǎocóng, fāxiàn le yī zhǐ xiǎo tùzi.","spanish_alternatives":["Corrió a un lado"]},{"id":"hsk6_140","level":6,"module":"HSK6","chinese_simp_full":"春天是播种的好季节。","chinese_simp_cloze":"春天是___的好季节。","chinese_simp_answer":"播种","chinese_trad_full":"春天是播種的好季節。","chinese_trad_cloze":"春天是___的好季節。","chinese_trad_answer":"播種","spanish_full":"La primavera es la mejor estación para sembrar.","spanish_cloze":"La primavera es la mejor estación para ___.","spanish_answer":"sembrar","pinyin":"Chūntiān shì bōzhǒng de hǎo jìjié."},{"id":"hsk6_141","level":6,"module":"HSK6","chinese_simp_full":"海边的波浪一浪高过一浪。","chinese_simp_cloze":"海边的___一浪高过一浪。","chinese_simp_answer":"波浪","chinese_trad_full":"海邊的波浪一浪高過一浪。","chinese_trad_cloze":"海邊的___一浪高過一浪。","chinese_trad_answer":"波浪","spanish_full":"Las olas en la playa crecen una tras otra.","spanish_cloze":"Las ___ en la playa crecen una tras otra.","spanish_answer":"olas","pinyin":"Hǎibiān de bōlàng yī làng gāo guò yī làng."},{"id":"hsk6_142","level":6,"module":"HSK6","chinese_simp_full":"夜里，船在波涛中艰难前行。","chinese_simp_cloze":"夜里，船在___中艰难前行。","chinese_simp_answer":"波涛","chinese_trad_full":"夜裡，船在波濤中艱難前行。","chinese_trad_cloze":"夜裡，船在___中艱難前行。","chinese_trad_answer":"波濤","spanish_full":"De noche, el barco avanzaba con dificultad entre el oleaje.","spanish_cloze":"De noche, el barco avanzaba con dificultad entre el ___.","spanish_answer":"oleaje","pinyin":"Yè lǐ, chuán zài bōtāo zhōng jiānnán qiánxíng."},{"id":"hsk6_143","level":6,"module":"HSK6","chinese_simp_full":"伯母做的饺子最好吃。","chinese_simp_cloze":"___做的饺子最好吃。","chinese_simp_answer":"伯母","chinese_trad_full":"伯母做的餃子最好吃。","chinese_trad_cloze":"___做的餃子最好吃。","chinese_trad_answer":"伯母","spanish_full":"Los jiaozi que hace la tía son los más ricos.","spanish_cloze":"Los jiaozi que hace la ___ son los más ricos.","spanish_answer":"tía","pinyin":"Bómǔ zuò de jiǎozi zuì hǎochī."},{"id":"hsk6_144","level":6,"module":"HSK6","chinese_simp_full":"中华文化博大精深，值得深入研究。","chinese_simp_cloze":"中华文化___，值得深入研究。","chinese_simp_answer":"博大精深","chinese_trad_full":"中華文化博大精深，值得深入研究。","chinese_trad_cloze":"中華文化___，值得深入研究。","chinese_trad_answer":"博大精深","spanish_full":"La cultura china es vasta y profunda; vale la pena estudiarla a fondo.","spanish_cloze":"La cultura china es ___; vale la pena estudiarla a fondo.","spanish_answer":"vasta y profunda","pinyin":"Zhōnghuá wénhuà bódàjīngshēn, zhídé shēnrù yánjiū."},{"id":"hsk6_145","level":6,"module":"HSK6","chinese_simp_full":"本月将举办国际图书博览会。","chinese_simp_cloze":"本月将举办国际图书___。","chinese_simp_answer":"博览会","chinese_trad_full":"本月將舉辦國際圖書博覽會。","chinese_trad_cloze":"本月將舉辦國際圖書___。","chinese_trad_answer":"博覽會","spanish_full":"Este mes se organizará la feria internacional del libro.","spanish_cloze":"Este mes se organizará la ___ internacional del libro.","spanish_answer":"feria","pinyin":"Běn yuè jiāng jǔbàn guójì túshū bólǎnhuì.","spanish_alternatives":["exposición"]},{"id":"hsk6_146","level":6,"module":"HSK6","chinese_simp_full":"警察与歹徒搏斗了很久。","chinese_simp_cloze":"警察与歹徒___了很久。","chinese_simp_answer":"搏斗","chinese_trad_full":"警察與歹徒搏鬥了很久。","chinese_trad_cloze":"警察與歹徒___了很久。","chinese_trad_answer":"搏鬥","spanish_full":"El policía luchó largo rato contra el delincuente.","spanish_cloze":"El policía ___ largo rato contra el delincuente.","spanish_answer":"luchó","pinyin":"Jǐngchá yǔ dǎitú bódòu le hěn jiǔ."},{"id":"hsk6_147","level":6,"module":"HSK6","chinese_simp_full":"他的数学基础比较薄弱。","chinese_simp_cloze":"他的数学基础比较___。","chinese_simp_answer":"薄弱","chinese_trad_full":"他的數學基礎比較薄弱。","chinese_trad_cloze":"他的數學基礎比較___。","chinese_trad_answer":"薄弱","spanish_full":"Su base en matemática es bastante floja.","spanish_cloze":"Su base en matemática es bastante ___.","spanish_answer":"floja","pinyin":"Tā de shùxué jīchǔ bǐjiào bóruò.","spanish_alternatives":["débil"]},{"id":"hsk6_148","level":6,"module":"HSK6","chinese_simp_full":"他不顾家人的反对，坚持自己的选择。","chinese_simp_cloze":"他___家人的反对，坚持自己的选择。","chinese_simp_answer":"不顾","chinese_trad_full":"他不顧家人的反對，堅持自己的選擇。","chinese_trad_cloze":"他___家人的反對，堅持自己的選擇。","chinese_trad_answer":"不顧","spanish_full":"Sin hacer caso de la oposición de su familia, mantuvo su decisión.","spanish_cloze":"___ la oposición de su familia, mantuvo su decisión.","spanish_answer":"Sin hacer caso de","pinyin":"Tā bùgù jiārén de fǎnduì, jiānchí zìjǐ de xuǎnzé.","spanish_alternatives":["Ignorando"]},{"id":"hsk6_149","level":6,"module":"HSK6","chinese_simp_full":"他不愧是我们班成绩最好的学生。","chinese_simp_cloze":"他___是我们班成绩最好的学生。","chinese_simp_answer":"不愧","chinese_trad_full":"他不愧是我們班成績最好的學生。","chinese_trad_cloze":"他___是我們班成績最好的學生。","chinese_trad_answer":"不愧","spanish_full":"Realmente merece llamarse el estudiante de mejores notas de nuestra clase.","spanish_cloze":"___ llamarse el estudiante de mejores notas de nuestra clase.","spanish_answer":"Realmente merece","pinyin":"Tā búkuì shì wǒmen bān chéngjì zuì hǎo de xuésheng.","spanish_alternatives":["Bien merece"]},{"id":"hsk6_150","level":6,"module":"HSK6","chinese_simp_full":"以为会下雨，不料天气转晴了。","chinese_simp_cloze":"以为会下雨，___天气转晴了。","chinese_simp_answer":"不料","chinese_trad_full":"以為會下雨，不料天氣轉晴了。","chinese_trad_cloze":"以為會下雨，___天氣轉晴了。","chinese_trad_answer":"不料","spanish_full":"Creía que iba a llover, pero inesperadamente el tiempo despejó.","spanish_cloze":"Creía que iba a llover, pero ___ el tiempo despejó.","spanish_answer":"inesperadamente","pinyin":"Yǐwéi huì xiàyǔ, búliào tiānqì zhuǎnqíng le.","spanish_alternatives":["para sorpresa"]},{"id":"hsk6_151","level":6,"module":"HSK6","chinese_simp_full":"今年夏天热得不像话。","chinese_simp_cloze":"今年夏天热得___。","chinese_simp_answer":"不像话","chinese_trad_full":"今年夏天熱得不像話。","chinese_trad_cloze":"今年夏天熱得___。","chinese_trad_answer":"不像話","spanish_full":"Este verano hace un calor escandaloso.","spanish_cloze":"Este verano hace un calor ___.","spanish_answer":"escandaloso","pinyin":"Jīnnián xiàtiān rè de búxiànghuà.","spanish_alternatives":["inaudito"]},{"id":"hsk6_152","level":6,"module":"HSK6","chinese_simp_full":"他对这种小道消息不屑一顾。","chinese_simp_cloze":"他对这种小道消息___。","chinese_simp_answer":"不屑一顾","chinese_trad_full":"他對這種小道消息不屑一顧。","chinese_trad_cloze":"他對這種小道消息___。","chinese_trad_answer":"不屑一顧","spanish_full":"No digna ni una mirada a esos rumores.","spanish_cloze":"___ a esos rumores.","spanish_answer":"No digna ni una mirada","pinyin":"Tā duì zhè zhǒng xiǎodào xiāoxi búxièyīgù.","spanish_alternatives":["Desdeña"]},{"id":"hsk6_153","level":6,"module":"HSK6","chinese_simp_full":"母鲸在浅海哺乳幼鲸。","chinese_simp_cloze":"母鲸在浅海___幼鲸。","chinese_simp_answer":"哺乳","chinese_trad_full":"母鯨在淺海哺乳幼鯨。","chinese_trad_cloze":"母鯨在淺海___幼鯨。","chinese_trad_answer":"哺乳","spanish_full":"La ballena madre amamanta a su cría en aguas poco profundas.","spanish_cloze":"La ballena madre ___ a su cría en aguas poco profundas.","spanish_answer":"amamanta","pinyin":"Mǔjīng zài qiǎnhǎi bǔrǔ yòujīng."},{"id":"hsk6_154","level":6,"module":"HSK6","chinese_simp_full":"猫头鹰夜间捕捉老鼠。","chinese_simp_cloze":"猫头鹰夜间___老鼠。","chinese_simp_answer":"捕捉","chinese_trad_full":"貓頭鷹夜間捕捉老鼠。","chinese_trad_cloze":"貓頭鷹夜間___老鼠。","chinese_trad_answer":"捕捉","spanish_full":"El búho captura ratones por la noche.","spanish_cloze":"El búho ___ ratones por la noche.","spanish_answer":"captura","pinyin":"Māotóuyīng yèjiān bǔzhuō lǎoshǔ.","spanish_alternatives":["caza"]},{"id":"hsk6_155","level":6,"module":"HSK6","chinese_simp_full":"公司决定用奖金补偿员工的加班。","chinese_simp_cloze":"公司决定用奖金___员工的加班。","chinese_simp_answer":"补偿","chinese_trad_full":"公司決定用獎金補償員工的加班。","chinese_trad_cloze":"公司決定用獎金___員工的加班。","chinese_trad_answer":"補償","spanish_full":"La empresa decidió compensar las horas extras de los empleados con un premio.","spanish_cloze":"La empresa decidió ___ las horas extras de los empleados con un premio.","spanish_answer":"compensar","pinyin":"Gōngsī juédìng yòng jiǎngjīn bǔcháng yuángōng de jiābān.","spanish_alternatives":["indemnizar"]},{"id":"hsk6_156","level":6,"module":"HSK6","chinese_simp_full":"发现错误后，他立刻想办法补救。","chinese_simp_cloze":"发现错误后，他立刻想办法___。","chinese_simp_answer":"补救","chinese_trad_full":"發現錯誤後，他立刻想辦法補救。","chinese_trad_cloze":"發現錯誤後，他立刻想辦法___。","chinese_trad_answer":"補救","spanish_full":"Tras descubrir el error, se apuró a buscar la manera de remediarlo.","spanish_cloze":"Tras descubrir el error, se apuró a buscar la manera ___.","spanish_answer":"de remediarlo","pinyin":"Fāxiàn cuòwù hòu, tā lìkè xiǎng bànfǎ bǔjiù.","spanish_alternatives":["de arreglarlo"]},{"id":"hsk6_157","level":6,"module":"HSK6","chinese_simp_full":"政府给低收入家庭发放住房补贴。","chinese_simp_cloze":"政府给低收入家庭发放住房___。","chinese_simp_answer":"补贴","chinese_trad_full":"政府給低收入家庭發放住房補貼。","chinese_trad_cloze":"政府給低收入家庭發放住房___。","chinese_trad_answer":"補貼","spanish_full":"El gobierno otorga a las familias de bajos ingresos un subsidio de vivienda.","spanish_cloze":"El gobierno otorga a las familias de bajos ingresos un ___ de vivienda.","spanish_answer":"subsidio","pinyin":"Zhèngfǔ gěi dī shōurù jiātíng fāfàng zhùfáng bǔtiē.","spanish_alternatives":["asignación"]},{"id":"hsk6_158","level":6,"module":"HSK6","chinese_simp_full":"实在没有办法，他不得已才借钱应急。","chinese_simp_cloze":"实在没有办法，他___才借钱应急。","chinese_simp_answer":"不得已","chinese_trad_full":"實在沒有辦法，他不得已才借錢應急。","chinese_trad_cloze":"實在沒有辦法，他___才借錢應急。","chinese_trad_answer":"不得已","spanish_full":"Como realmente no había otra salida, se vio obligado a pedir dinero prestado.","spanish_cloze":"Como realmente no había otra salida, ___ a pedir dinero prestado.","spanish_answer":"se vio obligado","pinyin":"Shízài méiyǒu bànfǎ, tā bùdéyǐ cái jiè qián yìngjí.","spanish_alternatives":["no tuvo otra opción que"]},{"id":"hsk6_159","level":6,"module":"HSK6","chinese_simp_full":"你不妨先试穿一下再决定买不买。","chinese_simp_cloze":"你___先试穿一下再决定买不买。","chinese_simp_answer":"不妨","chinese_trad_full":"你不妨先試穿一下再決定買不買。","chinese_trad_cloze":"你___先試穿一下再決定買不買。","chinese_trad_answer":"不妨","spanish_full":"No está de más que te lo pruebes antes de decidir si lo compras.","spanish_cloze":"___ que te lo pruebes antes de decidir si lo compras.","spanish_answer":"No está de más","pinyin":"Nǐ bùfáng xiān shìchuān yīxià zài juédìng mǎi bu mǎi.","spanish_alternatives":["Podrías muy bien"]},{"id":"hsk6_160","level":6,"module":"HSK6","chinese_simp_full":"您太夸奖了，实在不敢当。","chinese_simp_cloze":"您太夸奖了，实在___。","chinese_simp_answer":"不敢当","chinese_trad_full":"您太誇獎了，實在不敢當。","chinese_trad_cloze":"您太誇獎了，實在___。","chinese_trad_answer":"不敢當","spanish_full":"Me halaga demasiado; en verdad no lo merezco.","spanish_cloze":"Me halaga demasiado; en verdad ___.","spanish_answer":"no lo merezco","pinyin":"Nín tài kuājiǎng le, shízài bùgǎndāng.","spanish_alternatives":["no se lo merece"]},{"id":"hsk6_161","level":6,"module":"HSK6","chinese_simp_full":"看到孩子的画，我不禁笑了起来。","chinese_simp_cloze":"看到孩子的画，我___笑了起来。","chinese_simp_answer":"不禁","chinese_trad_full":"看到孩子的畫，我不禁笑了起來。","chinese_trad_cloze":"看到孩子的畫，我___笑了起來。","chinese_trad_answer":"不禁","spanish_full":"Al ver el dibujo del niño, no pude evitar reírme.","spanish_cloze":"Al ver el dibujo del niño, ___ reírme.","spanish_answer":"no pude evitar","pinyin":"Kàndào háizi de huà, wǒ bùjīn xiào le qǐlái."},{"id":"hsk6_162","level":6,"module":"HSK6","chinese_simp_full":"过去的回忆不堪回首。","chinese_simp_cloze":"过去的回忆___回首。","chinese_simp_answer":"不堪","chinese_trad_full":"過去的回憶不堪回首。","chinese_trad_cloze":"過去的回憶___回首。","chinese_trad_answer":"不堪","spanish_full":"El pasado resulta insoportable al recordarlo.","spanish_cloze":"El pasado resulta ___ al recordarlo.","spanish_answer":"insoportable","pinyin":"Guòqù de huíyì bùkān huíshǒu.","spanish_alternatives":["demasiado doloroso"]},{"id":"hsk6_163","level":6,"module":"HSK6","chinese_simp_full":"他三个月就学会了西班牙语，真不可思议。","chinese_simp_cloze":"他三个月就学会了西班牙语，真___。","chinese_simp_answer":"不可思议","chinese_trad_full":"他三個月就學會了西班牙語，真不可思議。","chinese_trad_cloze":"他三個月就學會了西班牙語，真___。","chinese_trad_answer":"不可思議","spanish_full":"Aprendió español en solo tres meses; es realmente increíble.","spanish_cloze":"Aprendió español en solo tres meses; es realmente ___.","spanish_answer":"increíble","pinyin":"Tā sān gè yuè jiù xuéhuì le Xībānyáyǔ, zhēn bùkěsīyì.","spanish_alternatives":["inconcebible"]},{"id":"hsk6_164","level":6,"module":"HSK6","chinese_simp_full":"初次上台演讲，不免有些紧张。","chinese_simp_cloze":"初次上台演讲，___有些紧张。","chinese_simp_answer":"不免","chinese_trad_full":"初次上臺演講，不免有些緊張。","chinese_trad_cloze":"初次上臺演講，___有些緊張。","chinese_trad_answer":"不免","spanish_full":"Al debutar hablando en público, inevitablemente uno se pone algo nervioso.","spanish_cloze":"Al debutar hablando en público, ___ uno se pone algo nervioso.","spanish_answer":"inevitablemente","pinyin":"Chūcì shàngtái yǎnjiǎng, bùmiǎn yǒuxiē jǐnzhāng.","spanish_alternatives":["es inevitable que"]},{"id":"hsk6_165","level":6,"module":"HSK6","chinese_simp_full":"窗外不时传来鸟叫声。","chinese_simp_cloze":"窗外___传来鸟叫声。","chinese_simp_answer":"不时","chinese_trad_full":"窗外不時傳來鳥叫聲。","chinese_trad_cloze":"窗外___傳來鳥叫聲。","chinese_trad_answer":"不時","spanish_full":"De vez en cuando llegan cantos de pájaros desde la ventana.","spanish_cloze":"___ llegan cantos de pájaros desde la ventana.","spanish_answer":"De vez en cuando","pinyin":"Chuāng wài bùshí chuánlái niǎojiào shēng.","spanish_alternatives":["A cada rato"]},{"id":"hsk6_166","level":6,"module":"HSK6","chinese_simp_full":"为了赢得比赛，他不惜付出一切代价。","chinese_simp_cloze":"为了赢得比赛，他___付出一切代价。","chinese_simp_answer":"不惜","chinese_trad_full":"為了贏得比賽，他不惜付出一切代價。","chinese_trad_cloze":"為了贏得比賽，他___付出一切代價。","chinese_trad_answer":"不惜","spanish_full":"Para ganar la competencia, no escatima ningún sacrificio.","spanish_cloze":"Para ganar la competencia, ___ ningún sacrificio.","spanish_answer":"no escatima","pinyin":"Wèile yíngdé bǐsài, tā bùxī fùchū yīqiè dàijià.","spanish_alternatives":["está dispuesto a pagar"]},{"id":"hsk6_167","level":6,"module":"HSK6","chinese_simp_full":"两支队伍的实力不相上下。","chinese_simp_cloze":"两支队伍的实力___。","chinese_simp_answer":"不相上下","chinese_trad_full":"兩支隊伍的實力不相上下。","chinese_trad_cloze":"兩支隊伍的實力___。","chinese_trad_answer":"不相上下","spanish_full":"La fuerza de los dos equipos es prácticamente igual.","spanish_cloze":"La fuerza de los dos equipos es ___.","spanish_answer":"prácticamente igual","pinyin":"Liǎng zhī duìwu de shílì bùxiāngshàngxià.","spanish_alternatives":["pareja"]},{"id":"hsk6_168","level":6,"module":"HSK6","chinese_simp_full":"双方的分歧如此之大，后果不言而喻。","chinese_simp_cloze":"双方的分歧如此之大，后果___。","chinese_simp_answer":"不言而喻","chinese_trad_full":"雙方的分歧如此之大，後果不言而喻。","chinese_trad_cloze":"雙方的分歧如此之大，後果___。","chinese_trad_answer":"不言而喻","spanish_full":"Las diferencias entre las partes son tan grandes que las consecuencias se sobreentienden.","spanish_cloze":"Las diferencias entre las partes son tan grandes que las consecuencias ___.","spanish_answer":"se sobreentienden","pinyin":"Shuāngfāng de fēnqí rúcǐ zhī dà, hòuguǒ bùyán'éryù.","spanish_alternatives":["son evidentes"]},{"id":"hsk6_169","level":6,"module":"HSK6","chinese_simp_full":"听到这个消息，大家不由得流下了眼泪。","chinese_simp_cloze":"听到这个消息，大家___流下了眼泪。","chinese_simp_answer":"不由得","chinese_trad_full":"聽到這個消息，大家不由得流下了眼淚。","chinese_trad_cloze":"聽到這個消息，大家___流下了眼淚。","chinese_trad_answer":"不由得","spanish_full":"Al escuchar la noticia, todos, sin poder remediarlo, se echaron a llorar.","spanish_cloze":"Al escuchar la noticia, todos, ___, se echaron a llorar.","spanish_answer":"sin poder remediarlo","pinyin":"Tīngdào zhège xiāoxi, dàjiā bùyóude liú xià le yǎnlèi.","spanish_alternatives":["no pudieron evitar"]},{"id":"hsk6_170","level":6,"module":"HSK6","chinese_simp_full":"他为了钱不择手段。","chinese_simp_cloze":"他为了钱___。","chinese_simp_answer":"不择手段","chinese_trad_full":"他為了錢不擇手段。","chinese_trad_cloze":"他為了錢___。","chinese_trad_answer":"不擇手段","spanish_full":"Por dinero, no elige los medios.","spanish_cloze":"Por dinero, ___.","spanish_answer":"no elige los medios","pinyin":"Tā wèile qián bùzéshǒuduàn.","spanish_alternatives":["es capaz de cualquier cosa"]},{"id":"hsk6_171","level":6,"module":"HSK6","chinese_simp_full":"这部小说他看了不止一遍。","chinese_simp_cloze":"这部小说他看了___一遍。","chinese_simp_answer":"不止","chinese_trad_full":"這部小說他看了不止一遍。","chinese_trad_cloze":"這部小說他看了___一遍。","chinese_trad_answer":"不止","spanish_full":"Esta novela la leyó más de una vez.","spanish_cloze":"Esta novela la leyó ___.","spanish_answer":"más de una vez","pinyin":"Zhè bù xiǎoshuō tā kàn le bùzhǐ yī biàn."},{"id":"hsk6_172","level":6,"module":"HSK6","chinese_simp_full":"校门口贴出了一张布告。","chinese_simp_cloze":"校门口贴出了一张___。","chinese_simp_answer":"布告","chinese_trad_full":"校門口貼出了一張佈告。","chinese_trad_cloze":"校門口貼出了一張___。","chinese_trad_answer":"佈告","spanish_full":"En la puerta de la escuela pusieron un aviso.","spanish_cloze":"En la puerta de la escuela pusieron un ___.","spanish_answer":"aviso","pinyin":"Xiàoménkǒu tiē chū le yī zhāng bùgào.","spanish_alternatives":["cartel"]},{"id":"hsk6_173","level":6,"module":"HSK6","chinese_simp_full":"这套房子布局很合理。","chinese_simp_cloze":"这套房子___很合理。","chinese_simp_answer":"布局","chinese_trad_full":"這套房子佈局很合理。","chinese_trad_cloze":"這套房子___很合理。","chinese_trad_answer":"佈局","spanish_full":"La distribución de este departamento es muy lógica.","spanish_cloze":"La ___ de este departamento es muy lógica.","spanish_answer":"distribución","pinyin":"Zhè tào fángzi bùjú hěn hélǐ.","spanish_alternatives":["disposición"]},{"id":"hsk6_174","level":6,"module":"HSK6","chinese_simp_full":"会场布置得漂亮又大方。","chinese_simp_cloze":"会场___得漂亮又大方。","chinese_simp_answer":"布置","chinese_trad_full":"會場佈置得漂亮又大方。","chinese_trad_cloze":"會場___得漂亮又大方。","chinese_trad_answer":"佈置","spanish_full":"El salón quedó arreglado con elegancia y sencillez.","spanish_cloze":"El salón quedó ___ con elegancia y sencillez.","spanish_answer":"arreglado","pinyin":"Huìchǎng bùzhì de piàoliang yòu dàfāng.","spanish_alternatives":["decorado"]},{"id":"hsk6_175","level":6,"module":"HSK6","chinese_simp_full":"队伍迈着整齐的步伐走过广场。","chinese_simp_cloze":"队伍迈着整齐的___走过广场。","chinese_simp_answer":"步伐","chinese_trad_full":"隊伍邁著整齊的步伐走過廣場。","chinese_trad_cloze":"隊伍邁著整齊的___走過廣場。","chinese_trad_answer":"步伐","spanish_full":"La columna cruzó la plaza con un paso marcial.","spanish_cloze":"La columna cruzó la plaza con un ___ marcial.","spanish_answer":"paso","pinyin":"Duìwu màizhe zhěngqí de bùfá zǒuguò guǎngchǎng.","spanish_alternatives":["marcha"]},{"id":"hsk6_176","level":6,"module":"HSK6","chinese_simp_full":"公司部署了新的销售计划。","chinese_simp_cloze":"公司___了新的销售计划。","chinese_simp_answer":"部署","chinese_trad_full":"公司部署了新的銷售計劃。","chinese_trad_cloze":"公司___了新的銷售計劃。","chinese_trad_answer":"部署","spanish_full":"La empresa desplegó un nuevo plan de ventas.","spanish_cloze":"La empresa ___ un nuevo plan de ventas.","spanish_answer":"desplegó","pinyin":"Gōngsī bùshǔ le xīn de xiāoshòu jìhuà.","spanish_alternatives":["puso en marcha"]},{"id":"hsk6_177","level":6,"module":"HSK6","chinese_simp_full":"医生检查了他受伤的部位。","chinese_simp_cloze":"医生检查了他受伤的___。","chinese_simp_answer":"部位","chinese_trad_full":"醫生檢查了他受傷的部位。","chinese_trad_cloze":"醫生檢查了他受傷的___。","chinese_trad_answer":"部位","spanish_full":"El médico examinó la zona lesionada.","spanish_cloze":"El médico examinó la ___ lesionada.","spanish_answer":"zona","pinyin":"Yīshēng jiǎnchá le tā shòushāng de bùwèi.","spanish_alternatives":["parte del cuerpo"]},{"id":"hsk6_178","level":6,"module":"HSK6","chinese_simp_full":"他在工作中展现了出色的才干。","chinese_simp_cloze":"他在工作中展现了出色的___。","chinese_simp_answer":"才干","chinese_trad_full":"他在工作中展現了出色的才幹。","chinese_trad_cloze":"他在工作中展現了出色的___。","chinese_trad_answer":"才幹","spanish_full":"En el trabajo demostró una capacidad sobresaliente.","spanish_cloze":"En el trabajo demostró una ___ sobresaliente.","spanish_answer":"capacidad","pinyin":"Tā zài gōngzuò zhōng zhǎnxiàn le chūsè de cáigàn.","spanish_alternatives":["talento"]},{"id":"hsk6_179","level":6,"module":"HSK6","chinese_simp_full":"裁缝把这件西装改小了两码。","chinese_simp_cloze":"___把这件西装改小了两码。","chinese_simp_answer":"裁缝","chinese_trad_full":"裁縫把這件西裝改小了兩碼。","chinese_trad_cloze":"___把這件西裝改小了兩碼。","chinese_trad_answer":"裁縫","spanish_full":"El sastre redujo dos tallas este traje.","spanish_cloze":"El ___ redujo dos tallas este traje.","spanish_answer":"sastre","pinyin":"Cáifeng bǎ zhè jiàn xīzhuāng gǎi xiǎo le liǎng mǎ."},{"id":"hsk6_180","level":6,"module":"HSK6","chinese_simp_full":"裁判判罚了一个点球。","chinese_simp_cloze":"___判罚了一个点球。","chinese_simp_answer":"裁判","chinese_trad_full":"裁判判罰了一個點球。","chinese_trad_cloze":"___判罰了一個點球。","chinese_trad_answer":"裁判","spanish_full":"El árbitro sancionó un penal.","spanish_cloze":"El ___ sancionó un penal.","spanish_answer":"árbitro","pinyin":"Cáipàn pànfá le yī gè diǎnqiú."},{"id":"hsk6_181","level":6,"module":"HSK6","chinese_simp_full":"经济不景气，公司宣布裁员。","chinese_simp_cloze":"经济不景气，公司宣布___。","chinese_simp_answer":"裁员","chinese_trad_full":"經濟不景氣，公司宣佈裁員。","chinese_trad_cloze":"經濟不景氣，公司宣佈___。","chinese_trad_answer":"裁員","spanish_full":"Con la economía en mala racha, la empresa anunció despidos.","spanish_cloze":"Con la economía en mala racha, la empresa anunció ___.","spanish_answer":"despidos","pinyin":"Jīngjì bù jǐngqì, gōngsī xuānbù cáiyuán.","spanish_alternatives":["recortes de personal"]},{"id":"hsk6_182","level":6,"module":"HSK6","chinese_simp_full":"知识是比金钱更宝贵的财富。","chinese_simp_cloze":"知识是比金钱更宝贵的___。","chinese_simp_answer":"财富","chinese_trad_full":"知識是比金錢更寶貴的財富。","chinese_trad_cloze":"知識是比金錢更寶貴的___。","chinese_trad_answer":"財富","spanish_full":"El conocimiento es una riqueza más valiosa que el dinero.","spanish_cloze":"El conocimiento es una ___ más valiosa que el dinero.","spanish_answer":"riqueza","pinyin":"Zhīshi shì bǐ jīnqián gèng bǎoguì de cáifù."},{"id":"hsk6_183","level":6,"module":"HSK6","chinese_simp_full":"她在一家大公司负责财务。","chinese_simp_cloze":"她在一家大公司负责___。","chinese_simp_answer":"财务","chinese_trad_full":"她在一家大公司負責財務。","chinese_trad_cloze":"她在一家大公司負責___。","chinese_trad_answer":"財務","spanish_full":"En una gran empresa se encarga de las finanzas.","spanish_cloze":"En una gran empresa se encarga de las ___.","spanish_answer":"finanzas","pinyin":"Tā zài yī jiā dà gōngsī fùzé cáiwù."},{"id":"hsk6_184","level":6,"module":"HSK6","chinese_simp_full":"政府面临财政困难。","chinese_simp_cloze":"政府面临___困难。","chinese_simp_answer":"财政","chinese_trad_full":"政府面臨財政困難。","chinese_trad_cloze":"政府面臨___困難。","chinese_trad_answer":"財政","spanish_full":"El gobierno atraviesa dificultades fiscales.","spanish_cloze":"El gobierno atraviesa dificultades ___.","spanish_answer":"fiscales","pinyin":"Zhèngfǔ miànlín cáizhèng kùnnán.","spanish_alternatives":["de hacienda"]},{"id":"hsk6_185","level":6,"module":"HSK6","chinese_simp_full":"他买彩票中了大奖。","chinese_simp_cloze":"他买___中了大奖。","chinese_simp_answer":"彩票","chinese_trad_full":"他買彩票中了大獎。","chinese_trad_cloze":"他買___中了大獎。","chinese_trad_answer":"彩票","spanish_full":"Le tocó el gran premio con un boleto de lotería.","spanish_cloze":"Le tocó el gran premio con un ___.","spanish_answer":"boleto de lotería","pinyin":"Tā mǎi cǎipiào zhòng le dàjiǎng.","spanish_alternatives":["ticket de lotería"]},{"id":"hsk6_186","level":6,"module":"HSK6","chinese_simp_full":"办公用品由行政部统一采购。","chinese_simp_cloze":"办公用品由行政部统一___。","chinese_simp_answer":"采购","chinese_trad_full":"辦公用品由行政部統一採購。","chinese_trad_cloze":"辦公用品由行政部統一___。","chinese_trad_answer":"採購","spanish_full":"Los artículos de oficina los compra de manera centralizada el área administrativa.","spanish_cloze":"Los artículos de oficina los ___ de manera centralizada el área administrativa.","spanish_answer":"compra","pinyin":"Bàngōng yòngpǐn yóu xíngzhèng bù tǒngyī cǎigòu.","spanish_alternatives":["adquiere"]},{"id":"hsk6_187","level":6,"module":"HSK6","chinese_simp_full":"科学家在野外采集植物标本。","chinese_simp_cloze":"科学家在野外___植物标本。","chinese_simp_answer":"采集","chinese_trad_full":"科學家在野外採集植物標本。","chinese_trad_cloze":"科學家在野外___植物標本。","chinese_trad_answer":"採集","spanish_full":"Los científicos recolectan especímenes de plantas en el campo.","spanish_cloze":"Los científicos ___ especímenes de plantas en el campo.","spanish_answer":"recolectan","pinyin":"Kēxuéjiā zài yěwài cǎijí zhíwù biāoběn.","spanish_alternatives":["recogen"]},{"id":"hsk6_188","level":6,"module":"HSK6","chinese_simp_full":"经理采纳了我的建议。","chinese_simp_cloze":"经理___了我的建议。","chinese_simp_answer":"采纳","chinese_trad_full":"經理採納了我的建議。","chinese_trad_cloze":"經理___了我的建議。","chinese_trad_answer":"採納","spanish_full":"El gerente adoptó mi sugerencia.","spanish_cloze":"El gerente ___ mi sugerencia.","spanish_answer":"adoptó","pinyin":"Jīnglǐ cǎinà le wǒ de jiànyì.","spanish_alternatives":["aceptó"]},{"id":"hsk6_189","level":6,"module":"HSK6","chinese_simp_full":"这次活动多亏你的参谋。","chinese_simp_cloze":"这次活动多亏你的___。","chinese_simp_answer":"参谋","chinese_trad_full":"這次活動多虧你的參謀。","chinese_trad_cloze":"這次活動多虧你的___。","chinese_trad_answer":"參謀","spanish_full":"Esta actividad salió bien gracias a tus consejos.","spanish_cloze":"Esta actividad salió bien gracias a tus ___.","spanish_answer":"consejos","pinyin":"Zhè cì huódòng duōkuī nǐ de cānmóu.","spanish_alternatives":["asesoramiento"]},{"id":"hsk6_190","level":6,"module":"HSK6","chinese_simp_full":"写论文时要参照最新的研究成果。","chinese_simp_cloze":"写论文时要___最新的研究成果。","chinese_simp_answer":"参照","chinese_trad_full":"寫論文時要參照最新的研究成果。","chinese_trad_cloze":"寫論文時要___最新的研究成果。","chinese_trad_answer":"參照","spanish_full":"Al escribir la tesis hay que basarse en los estudios más recientes.","spanish_cloze":"Al escribir la tesis hay que ___ los estudios más recientes.","spanish_answer":"basarse en","pinyin":"Xiě lùnwén shí yào cānzhào zuìxīn de yánjiū chéngguǒ.","spanish_alternatives":["tomar como referencia"]},{"id":"hsk6_191","level":6,"module":"HSK6","chinese_simp_full":"社会应当关心残疾人士。","chinese_simp_cloze":"社会应当关心___人士。","chinese_simp_answer":"残疾","chinese_trad_full":"社會應當關心殘疾人士。","chinese_trad_cloze":"社會應當關心___人士。","chinese_trad_answer":"殘疾","spanish_full":"La sociedad debería preocuparse por las personas con discapacidad.","spanish_cloze":"La sociedad debería preocuparse por las personas con ___.","spanish_answer":"discapacidad","pinyin":"Shèhuì yīngdāng guānxīn cánjí rénshì."},{"id":"hsk6_192","level":6,"module":"HSK6","chinese_simp_full":"战争是残酷的。","chinese_simp_cloze":"战争是___的。","chinese_simp_answer":"残酷","chinese_trad_full":"戰爭是殘酷的。","chinese_trad_cloze":"戰爭是___的。","chinese_trad_answer":"殘酷","spanish_full":"La guerra es cruel.","spanish_cloze":"La guerra es ___.","spanish_answer":"cruel","pinyin":"Zhànzhēng shì cánkù de."},{"id":"hsk6_193","level":6,"module":"HSK6","chinese_simp_full":"水果表面可能残留农药。","chinese_simp_cloze":"水果表面可能___农药。","chinese_simp_answer":"残留","chinese_trad_full":"水果表面可能殘留農藥。","chinese_trad_cloze":"水果表面可能___農藥。","chinese_trad_answer":"殘留","spanish_full":"En la superficie de la fruta pueden quedar restos de pesticida.","spanish_cloze":"En la superficie de la fruta pueden ___ pesticida.","spanish_answer":"quedar restos de","pinyin":"Shuǐguǒ biǎomiàn kěnéng cánliú nóngyào.","spanish_alternatives":["quedar residuos de"]},{"id":"hsk6_194","level":6,"module":"HSK6","chinese_simp_full":"猎人的做法实在太残忍了。","chinese_simp_cloze":"猎人的做法实在太___了。","chinese_simp_answer":"残忍","chinese_trad_full":"獵人的做法實在太殘忍了。","chinese_trad_cloze":"獵人的做法實在太___了。","chinese_trad_answer":"殘忍","spanish_full":"Lo que hizo el cazador es realmente despiadado.","spanish_cloze":"Lo que hizo el cazador es realmente ___.","spanish_answer":"despiadado","pinyin":"Lièrén de zuòfǎ shízài tài cánrěn le.","spanish_alternatives":["cruel"]},{"id":"hsk6_195","level":6,"module":"HSK6","chinese_simp_full":"阳光灿烂的日子里，公园里到处是游人。","chinese_simp_cloze":"阳光___的日子里，公园里到处是游人。","chinese_simp_answer":"灿烂","chinese_trad_full":"陽光燦爛的日子裡，公園裡到處是遊人。","chinese_trad_cloze":"陽光___的日子裡，公園裡到處是遊人。","chinese_trad_answer":"燦爛","spanish_full":"En los días de sol radiante, el parque se llena de paseantes.","spanish_cloze":"En los días de ___, el parque se llena de paseantes.","spanish_answer":"sol radiante","pinyin":"Yángguāng cànlàn de rìzi lǐ, gōngyuán lǐ dàochù shì yóurén.","spanish_alternatives":["sol brillante"]},{"id":"hsk6_196","level":6,"module":"HSK6","chinese_simp_full":"这个决定下得太仓促，考虑不周。","chinese_simp_cloze":"这个决定下得太___，考虑不周。","chinese_simp_answer":"仓促","chinese_trad_full":"這個決定下得太倉促，考慮不周。","chinese_trad_cloze":"這個決定下得太___，考慮不周。","chinese_trad_answer":"倉促","spanish_full":"Esta decisión se tomó con demasiado apuro, sin pensarlo bien.","spanish_cloze":"Esta decisión se tomó con demasiado ___, sin pensarlo bien.","spanish_answer":"apuro","pinyin":"Zhège juédìng xià de tài cāngcù, kǎolǜ bù zhōu.","spanish_alternatives":["premura"]},{"id":"hsk6_197","level":6,"module":"HSK6","chinese_simp_full":"仓库里堆满了货物。","chinese_simp_cloze":"___里堆满了货物。","chinese_simp_answer":"仓库","chinese_trad_full":"倉庫裡堆滿了貨物。","chinese_trad_cloze":"___裡堆滿了貨物。","chinese_trad_answer":"倉庫","spanish_full":"El depósito está repleto de mercadería.","spanish_cloze":"El ___ está repleto de mercadería.","spanish_answer":"depósito","pinyin":"Cāngkù lǐ duī mǎn le huòwù.","spanish_alternatives":["almacén"]},{"id":"hsk6_198","level":6,"module":"HSK6","chinese_simp_full":"飞机的前部是货舱。","chinese_simp_cloze":"飞机的前部是货___。","chinese_simp_answer":"舱","chinese_trad_full":"飛機的前部是貨艙。","chinese_trad_cloze":"飛機的前部是貨___。","chinese_trad_answer":"艙","spanish_full":"En la parte delantera del avión está la bodega de carga.","spanish_cloze":"En la parte delantera del avión está la ___ de carga.","spanish_answer":"bodega","pinyin":"Fēijī de qiánbù shì huòcāng."},{"id":"hsk6_199","level":6,"module":"HSK6","chinese_simp_full":"她脸色苍白，需要好好休息。","chinese_simp_cloze":"她脸色___，需要好好休息。","chinese_simp_answer":"苍白","chinese_trad_full":"她臉色蒼白，需要好好休息。","chinese_trad_cloze":"她臉色___，需要好好休息。","chinese_trad_answer":"蒼白","spanish_full":"Tiene el rostro pálido; necesita descansar bien.","spanish_cloze":"Tiene el rostro ___; necesita descansar bien.","spanish_answer":"pálido","pinyin":"Tā liǎnsè cāngbái, xūyào hǎohǎo xiūxi."},{"id":"hsk6_200","level":6,"module":"HSK6","chinese_simp_full":"母亲为这个家操劳了一辈子。","chinese_simp_cloze":"母亲为这个家___了一辈子。","chinese_simp_answer":"操劳","chinese_trad_full":"母親為這個家操勞了一輩子。","chinese_trad_cloze":"母親為這個家___了一輩子。","chinese_trad_answer":"操勞","spanish_full":"La madre trabajó sin descanso por esta familia toda su vida.","spanish_cloze":"La madre ___ por esta familia toda su vida.","spanish_answer":"trabajó sin descanso","pinyin":"Mǔqīn wèi zhège jiā cāoláo le yī bèizi."}],
'TOCFL': [{"id":"tocfl-01","level":1,"module":"TOCFL","spanish_full":"Gracias por tu ayuda.","spanish_cloze":"Gracias por tu ___.","spanish_answer":"ayuda","spanish_alternatives":["apoyo"],"chinese_simp_full":"谢谢您的帮忙。","chinese_simp_cloze":"谢谢您的___。","chinese_simp_answer":"帮忙","chinese_trad_full":"謝謝您的幫忙。","chinese_trad_cloze":"謝謝您的___。","chinese_trad_answer":"幫忙","pinyin":"Xièxie nín de bāngmáng."},{"id":"tocfl-02","level":1,"module":"TOCFL","spanish_full":"Disculpe, ¿dónde está el baño?","spanish_cloze":"___, ¿dónde está el baño?","spanish_answer":"Disculpe","spanish_alternatives":["perdón","perdon","oiga"],"chinese_simp_full":"请问，厕所在哪里？","chinese_simp_cloze":"___，厕所在哪里？","chinese_simp_answer":"请问","chinese_trad_full":"請問，廁所在哪裡？","chinese_trad_cloze":"___，廁所在哪裡？","chinese_trad_answer":"請問","pinyin":"Qǐngwèn, cèsuǒ zài nǎlǐ?"},{"id":"tocfl-03","level":1,"module":"TOCFL","spanish_full":"Quiero sacar una tarjeta de transporte.","spanish_cloze":"Quiero sacar una tarjeta de ___.","spanish_answer":"transporte","spanish_alternatives":["metro","transporte público"],"chinese_simp_full":"我想办一张悠游卡。","chinese_simp_cloze":"我想办一张___。","chinese_simp_answer":"悠游卡","chinese_trad_full":"我想辦一張悠遊卡。","chinese_trad_cloze":"我想辦一張___。","chinese_trad_answer":"悠遊卡","pinyin":"Wǒ xiǎng bàn yì zhāng Yōuyóukǎ."},{"id":"tocfl-04","level":1,"module":"TOCFL","spanish_full":"¿Mañana va a llover?","spanish_cloze":"¿Mañana va a ___?","spanish_answer":"llover","spanish_alternatives":[],"chinese_simp_full":"明天会下雨吗？","chinese_simp_cloze":"明天会___吗？","chinese_simp_answer":"下雨","chinese_trad_full":"明天會下雨嗎？","chinese_trad_cloze":"明天會___嗎？","chinese_trad_answer":"下雨","pinyin":"Míngtiān huì xiàyǔ ma?"},{"id":"tocfl-05","level":1,"module":"TOCFL","spanish_full":"La fruta de esta tienda es muy barata.","spanish_cloze":"La fruta de esta tienda es muy ___.","spanish_answer":"barata","spanish_alternatives":["barato","económica","economica"],"chinese_simp_full":"这家店的水果很便宜。","chinese_simp_cloze":"这家店的水果很___。","chinese_simp_answer":"便宜","chinese_trad_full":"這家店的水果很便宜。","chinese_trad_cloze":"這家店的水果很___。","chinese_trad_answer":"便宜","pinyin":"Zhè jiā diàn de shuǐguǒ hěn piányi."},{"id":"tocfl-06","level":1,"module":"TOCFL","spanish_full":"Yo trabajo en Taipéi.","spanish_cloze":"Yo ___ en Taipéi.","spanish_answer":"trabajo","spanish_alternatives":["laboro"],"chinese_simp_full":"我在台北工作。","chinese_simp_cloze":"我在台北___。","chinese_simp_answer":"工作","chinese_trad_full":"我在台北工作。","chinese_trad_cloze":"我在台北___。","chinese_trad_answer":"工作","pinyin":"Wǒ zài Táiběi gōngzuò."},{"id":"tocfl-07","level":1,"module":"TOCFL","spanish_full":"Espérame, por favor.","spanish_cloze":"___, por favor.","spanish_answer":"Espérame","spanish_alternatives":["esperame","espera","Espéreme","espereme"],"chinese_simp_full":"请等我一下。","chinese_simp_cloze":"请___我一下。","chinese_simp_answer":"等","chinese_trad_full":"請等我一下。","chinese_trad_cloze":"請___我一下。","chinese_trad_answer":"等","pinyin":"Qǐng děng wǒ yíxià."},{"id":"tocfl-08","level":1,"module":"TOCFL","spanish_full":"El mercado nocturno de aquí es muy famoso.","spanish_cloze":"El mercado ___ de aquí es muy famoso.","spanish_answer":"nocturno","spanish_alternatives":["noche"],"chinese_simp_full":"这里的夜市非常有名。","chinese_simp_cloze":"这里的___非常有名。","chinese_simp_answer":"夜市","chinese_trad_full":"這裡的夜市非常有名。","chinese_trad_cloze":"這裡的___非常有名。","chinese_trad_answer":"夜市","pinyin":"Zhèlǐ de yèshì fēicháng yǒumíng."},{"id":"tocfl-09","level":1,"module":"TOCFL","spanish_full":"No hablo bien el chino.","spanish_cloze":"No hablo bien el ___.","spanish_answer":"chino","spanish_alternatives":["mandarín","mandarin"],"chinese_simp_full":"我的中文说得不好。","chinese_simp_cloze":"我的___说得不好。","chinese_simp_answer":"中文","chinese_trad_full":"我的中文說得不好。","chinese_trad_cloze":"我的___說得不好。","chinese_trad_answer":"中文","pinyin":"Wǒ de Zhōngwén shuō de bù hǎo."},{"id":"tocfl-10","level":1,"module":"TOCFL","spanish_full":"¿Has comido fideos con carne de res?","spanish_cloze":"¿Has ___ fideos con carne de res?","spanish_answer":"comido","spanish_alternatives":["probado"],"chinese_simp_full":"你吃过牛肉面吗？","chinese_simp_cloze":"你___牛肉面吗？","chinese_simp_answer":"吃过","chinese_trad_full":"你吃過牛肉麵嗎？","chinese_trad_cloze":"你___牛肉麵嗎？","chinese_trad_answer":"吃過","pinyin":"Nǐ chī guò niúròu miàn ma?"},{"id":"tocfl-11","level":1,"module":"TOCFL","spanish_full":"El tiempo está cada vez más caluroso.","spanish_cloze":"El tiempo está cada vez más ___.","spanish_answer":"caluroso","spanish_alternatives":["caliente","cálido","calido"],"chinese_simp_full":"天气越来越热了。","chinese_simp_cloze":"天气越来越___了。","chinese_simp_answer":"热","chinese_trad_full":"天氣越來越熱了。","chinese_trad_cloze":"天氣越來越___了。","chinese_trad_answer":"熱","pinyin":"Tiānqì yuèláiyuè rè le."},{"id":"tocfl-12","level":1,"module":"TOCFL","spanish_full":"Por favor, pon el equipaje aquí.","spanish_cloze":"Por favor, pon el equipaje ___.","spanish_answer":"aquí","spanish_alternatives":["aqui","acá","aca"],"chinese_simp_full":"请把行李放在这里。","chinese_simp_cloze":"请把行李放在___。","chinese_simp_answer":"这里","chinese_trad_full":"請把行李放在這裡。","chinese_trad_cloze":"請把行李放在___。","chinese_trad_answer":"這裡","pinyin":"Qǐng bǎ xíngli fàng zài zhèlǐ."},{"id":"tocfl-13","level":1,"module":"TOCFL","spanish_full":"Quiero pedir hora con el médico.","spanish_cloze":"Quiero pedir ___ con el médico.","spanish_answer":"hora","spanish_alternatives":["cita","turno"],"chinese_simp_full":"我要预约看医生。","chinese_simp_cloze":"我要___看医生。","chinese_simp_answer":"预约","chinese_trad_full":"我要預約看醫生。","chinese_trad_cloze":"我要___看醫生。","chinese_trad_answer":"預約","pinyin":"Wǒ yào yùyuē kàn yīshēng."},{"id":"tocfl-14","level":1,"module":"TOCFL","spanish_full":"Esta calle está muy congestionada.","spanish_cloze":"Esta calle está muy ___.","spanish_answer":"congestionada","spanish_alternatives":["atascada","tapada"],"chinese_simp_full":"这条路很塞车。","chinese_simp_cloze":"这条路很___。","chinese_simp_answer":"塞车","chinese_trad_full":"這條路很塞車。","chinese_trad_cloze":"這條路很___。","chinese_trad_answer":"塞車","pinyin":"Zhè tiáo lù hěn sāichē."},{"id":"tocfl-15","level":1,"module":"TOCFL","spanish_full":"La semana que viene tenemos un examen.","spanish_cloze":"La semana que viene tenemos un ___.","spanish_answer":"examen","spanish_alternatives":["test"],"chinese_simp_full":"我们下个星期考试。","chinese_simp_cloze":"我们下个星期___。","chinese_simp_answer":"考试","chinese_trad_full":"我們下個星期考試。","chinese_trad_cloze":"我們下個星期___。","chinese_trad_answer":"考試","pinyin":"Wǒmen xià gè xīngqī kǎoshì."},{"id":"tocfl-16","level":1,"module":"TOCFL","spanish_full":"Este diccionario es muy útil.","spanish_cloze":"Este ___ es muy útil.","spanish_answer":"diccionario","spanish_alternatives":[],"chinese_simp_full":"这本字典很有用。","chinese_simp_cloze":"这本___很有用。","chinese_simp_answer":"字典","chinese_trad_full":"這本字典很有用。","chinese_trad_cloze":"這本___很有用。","chinese_trad_answer":"字典","pinyin":"Zhè běn zìdiǎn hěn yǒuyòng."},{"id":"tocfl-17","level":1,"module":"TOCFL","spanish_full":"La estación está muy lejos de aquí.","spanish_cloze":"La estación está muy ___ de aquí.","spanish_answer":"lejos","spanish_alternatives":["alejada","alejado"],"chinese_simp_full":"车站离这里很远。","chinese_simp_cloze":"车站离这里很___。","chinese_simp_answer":"远","chinese_trad_full":"車站離這裡很遠。","chinese_trad_cloze":"車站離這裡很___。","chinese_trad_answer":"遠","pinyin":"Chēzhàn lí zhèlǐ hěn yuǎn."},{"id":"tocfl-18","level":1,"module":"TOCFL","spanish_full":"¡Feliz año nuevo!","spanish_cloze":"¡Feliz año ___!","spanish_answer":"nuevo","spanish_alternatives":["nueva"],"chinese_simp_full":"祝你新年快乐！","chinese_simp_cloze":"祝你___！","chinese_simp_answer":"新年快乐","chinese_trad_full":"祝你新年快樂！","chinese_trad_cloze":"祝你___！","chinese_trad_answer":"新年快樂","pinyin":"Zhù nǐ xīnnián kuàilè!"},{"id":"tocfl-19","level":1,"module":"TOCFL","spanish_full":"Me gusta beber té de leche con perlas.","spanish_cloze":"Me gusta beber té de leche con ___.","spanish_answer":"perlas","spanish_alternatives":["burbujas","tapioca","perla"],"chinese_simp_full":"我喜欢喝珍珠奶茶。","chinese_simp_cloze":"我喜欢喝___奶茶。","chinese_simp_answer":"珍珠","chinese_trad_full":"我喜歡喝珍珠奶茶。","chinese_trad_cloze":"我喜歡喝___奶茶。","chinese_trad_answer":"珍珠","pinyin":"Wǒ xǐhuān hē zhēnzhū nǎichá."},{"id":"tocfl-20","level":1,"module":"TOCFL","spanish_full":"Hoy la entrada al museo es gratuita.","spanish_cloze":"Hoy la entrada al museo es ___.","spanish_answer":"gratuita","spanish_alternatives":["gratis","libre"],"chinese_simp_full":"博物馆今天免费参观。","chinese_simp_cloze":"博物馆今天___参观。","chinese_simp_answer":"免费","chinese_trad_full":"博物館今天免費參觀。","chinese_trad_cloze":"博物館今天___參觀。","chinese_trad_answer":"免費","pinyin":"Bówùguǎn jīntiān miǎnfèi cānguān."}],
'DELE': [{"id":"dele-01","level":2,"module":"DELE","spanish_full":"Llevo tres años estudiando español.","spanish_cloze":"Llevo tres años ___ español.","spanish_answer":"estudiando","spanish_alternatives":["hablando","aprendiendo"],"chinese_simp_full":"我学西班牙语三年了。","chinese_simp_cloze":"我___西班牙语三年了。","chinese_simp_answer":"学","chinese_trad_full":"我學西班牙語三年了。","chinese_trad_cloze":"我___西班牙語三年了。","chinese_trad_answer":"學","pinyin":"Wǒ xué Xībānyáyǔ sān nián le."},{"id":"dele-02","level":2,"module":"DELE","spanish_full":"¿Qué planes tienes para este sábado?","spanish_cloze":"¿Qué ___ tienes para este sábado?","spanish_answer":"planes","spanish_alternatives":["plan"],"chinese_simp_full":"这个星期六你有什么计划？","chinese_simp_cloze":"这个星期六你有什么___？","chinese_simp_answer":"计划","chinese_trad_full":"這個星期六你有什麼計劃？","chinese_trad_cloze":"這個星期六你有什麼___？","chinese_trad_answer":"計劃","pinyin":"Zhège xīngqīliù nǐ yǒu shénme jìhuà?"},{"id":"dele-03","level":2,"module":"DELE","spanish_full":"Este suéter me queda un poco pequeño.","spanish_cloze":"Este suéter me queda un poco ___.","spanish_answer":"pequeño","spanish_alternatives":["pequeno","chico","ajustado"],"chinese_simp_full":"这件毛衣有点儿小。","chinese_simp_cloze":"这件毛衣有点儿___。","chinese_simp_answer":"小","chinese_trad_full":"這件毛衣有點兒小。","chinese_trad_cloze":"這件毛衣有點兒___。","chinese_trad_answer":"小","pinyin":"Zhè jiàn máoyī yǒudiǎnr xiǎo."},{"id":"dele-04","level":2,"module":"DELE","spanish_full":"Mañana voy al banco a cambiar dinero.","spanish_cloze":"Mañana voy al banco a ___ dinero.","spanish_answer":"cambiar","spanish_alternatives":[],"chinese_simp_full":"我明天要去银行换钱。","chinese_simp_cloze":"我明天要去银行___。","chinese_simp_answer":"换钱","chinese_trad_full":"我明天要去銀行換錢。","chinese_trad_cloze":"我明天要去銀行___。","chinese_trad_answer":"換錢","pinyin":"Wǒ míngtiān yào qù yínháng huàn qián."},{"id":"dele-05","level":2,"module":"DELE","spanish_full":"El médico dice que debo beber más agua.","spanish_cloze":"El médico dice que debo beber más ___.","spanish_answer":"agua","spanish_alternatives":["líquidos","liquidos"],"chinese_simp_full":"医生说我需要多喝水。","chinese_simp_cloze":"医生说我需要多喝___。","chinese_simp_answer":"水","chinese_trad_full":"醫生說我需要多喝水。","chinese_trad_cloze":"醫生說我需要多喝___。","chinese_trad_answer":"水","pinyin":"Yīshēng shuō wǒ xūyào duō hē shuǐ."},{"id":"dele-06","level":2,"module":"DELE","spanish_full":"El tren sale a las ocho y media.","spanish_cloze":"El tren ___ a las ocho y media.","spanish_answer":"sale","spanish_alternatives":["parte","se va"],"chinese_simp_full":"火车八点半出发。","chinese_simp_cloze":"火车八点半___。","chinese_simp_answer":"出发","chinese_trad_full":"火車八點半出發。","chinese_trad_cloze":"火車八點半___。","chinese_trad_answer":"出發","pinyin":"Huǒchē bā diǎn bàn chūfā."},{"id":"dele-07","level":2,"module":"DELE","spanish_full":"Mi ordenador tiene un virus.","spanish_cloze":"Mi ordenador tiene un ___.","spanish_answer":"virus","spanish_alternatives":[],"chinese_simp_full":"我的电脑中毒了。","chinese_simp_cloze":"我的电脑___了。","chinese_simp_answer":"中毒","chinese_trad_full":"我的電腦中毒了。","chinese_trad_cloze":"我的電腦___了。","chinese_trad_answer":"中毒","pinyin":"Wǒ de diànnǎo zhòngdú le."},{"id":"dele-08","level":2,"module":"DELE","spanish_full":"Espera aquí el autobús, por favor.","spanish_cloze":"___ aquí el autobús, por favor.","spanish_answer":"Espera","spanish_alternatives":["esperad","Espere","espere"],"chinese_simp_full":"请在这里等巴士。","chinese_simp_cloze":"请在这里___巴士。","chinese_simp_answer":"等","chinese_trad_full":"請在這裡等巴士。","chinese_trad_cloze":"請在這裡___巴士。","chinese_trad_answer":"等","pinyin":"Qǐng zài zhèlǐ děng bāshì."},{"id":"dele-09","level":2,"module":"DELE","spanish_full":"Ayer compré una sandía en el supermercado.","spanish_cloze":"Ayer ___ una sandía en el supermercado.","spanish_answer":"compré","spanish_alternatives":["compre","conseguí","consegui"],"chinese_simp_full":"我昨天在超市买了西瓜。","chinese_simp_cloze":"我昨天在超市___了西瓜。","chinese_simp_answer":"买","chinese_trad_full":"我昨天在超市買了西瓜。","chinese_trad_cloze":"我昨天在超市___了西瓜。","chinese_trad_answer":"買","pinyin":"Wǒ zuótiān zài chāoshì mǎi le xīguā."},{"id":"dele-10","level":2,"module":"DELE","spanish_full":"Esta noche hay un partido de fútbol.","spanish_cloze":"Esta noche hay un partido de ___.","spanish_answer":"fútbol","spanish_alternatives":["futbol","football"],"chinese_simp_full":"今晚有一场足球比赛。","chinese_simp_cloze":"今晚有一场足球___。","chinese_simp_answer":"比赛","chinese_trad_full":"今晚有一場足球比賽。","chinese_trad_cloze":"今晚有一場足球___。","chinese_trad_answer":"比賽","pinyin":"Jīnwǎn yǒu yì chǎng zúqiú bǐsài."},{"id":"dele-11","level":2,"module":"DELE","spanish_full":"Mi compañero de piso es muy limpio.","spanish_cloze":"Mi compañero de piso es muy ___.","spanish_answer":"limpio","spanish_alternatives":["limpia","ordenado"],"chinese_simp_full":"我的室友很爱干净。","chinese_simp_cloze":"我的室友很___。","chinese_simp_answer":"爱干净","chinese_trad_full":"我的室友很愛乾淨。","chinese_trad_cloze":"我的室友很___。","chinese_trad_answer":"愛乾淨","pinyin":"Wǒ de shìyǒu hěn ài gānjìng."},{"id":"dele-12","level":2,"module":"DELE","spanish_full":"Hace frío, ponte más ropa.","spanish_cloze":"Hace frío, ___ más ropa.","spanish_answer":"ponte","spanish_alternatives":["póngase","abrígate","abrígate"],"chinese_simp_full":"天冷了，多穿点衣服。","chinese_simp_cloze":"天冷了，多___点衣服。","chinese_simp_answer":"穿","chinese_trad_full":"天冷了，多穿點衣服。","chinese_trad_cloze":"天冷了，多___點衣服。","chinese_trad_answer":"穿","pinyin":"Tiān lěng le, duō chuān diǎn yīfu."},{"id":"dele-13","level":2,"module":"DELE","spanish_full":"Hemos reservado mesa en el restaurante.","spanish_cloze":"Hemos ___ mesa en el restaurante.","spanish_answer":"reservado","spanish_alternatives":["pedido"],"chinese_simp_full":"我们在餐厅订了位子。","chinese_simp_cloze":"我们在餐厅___了位子。","chinese_simp_answer":"订","chinese_trad_full":"我們在餐廳訂了位子。","chinese_trad_cloze":"我們在餐廳___了位子。","chinese_trad_answer":"訂","pinyin":"Wǒmen zài cāntīng dìng le wèizi."},{"id":"dele-14","level":2,"module":"DELE","spanish_full":"Su fiesta de cumpleaños es el viernes por la noche.","spanish_cloze":"Su fiesta de cumpleaños es el viernes por la ___.","spanish_answer":"noche","spanish_alternatives":["tarde"],"chinese_simp_full":"他的生日派对在周五晚上。","chinese_simp_cloze":"他的生日派对在周五___。","chinese_simp_answer":"晚上","chinese_trad_full":"他的生日派對在週五晚上。","chinese_trad_cloze":"他的生日派對在週五___。","chinese_trad_answer":"晚上","pinyin":"Tā de shēngrì pàiduì zài zhōuwǔ wǎnshang."},{"id":"dele-15","level":2,"module":"DELE","spanish_full":"Estoy acostumbrado a levantarme temprano para estudiar.","spanish_cloze":"Estoy ___ a levantarme temprano para estudiar.","spanish_answer":"acostumbrado","spanish_alternatives":["acostumbrada","habituado"],"chinese_simp_full":"我习惯早起读书。","chinese_simp_cloze":"我___早起读书。","chinese_simp_answer":"习惯","chinese_trad_full":"我習慣早起讀書。","chinese_trad_cloze":"我___早起讀書。","chinese_trad_answer":"習慣","pinyin":"Wǒ xíguàn zǎo qǐ dúshū."},{"id":"dele-16","level":2,"module":"DELE","spanish_full":"Esta falda tiene un descuento del cincuenta por ciento.","spanish_cloze":"Esta falda tiene un ___ del cincuenta por ciento.","spanish_answer":"descuento","spanish_alternatives":["rebaja"],"chinese_simp_full":"这条裙子打折一半。","chinese_simp_cloze":"这条裙子___一半。","chinese_simp_answer":"打折","chinese_trad_full":"這條裙子打折一半。","chinese_trad_cloze":"這條裙子___一半。","chinese_trad_answer":"打折","pinyin":"Zhè tiáo qúnzi dǎzhé yíbàn."},{"id":"dele-17","level":2,"module":"DELE","spanish_full":"Abre la ventana un momento, por favor.","spanish_cloze":"Abre la ___ un momento, por favor.","spanish_answer":"ventana","spanish_alternatives":["ventanilla"],"chinese_simp_full":"请把窗户打开一下。","chinese_simp_cloze":"请把___打开一下。","chinese_simp_answer":"窗户","chinese_trad_full":"請把窗戶打開一下。","chinese_trad_cloze":"請把___打開一下。","chinese_trad_answer":"窗戶","pinyin":"Qǐng bǎ chuānghu dǎkāi yíxià."},{"id":"dele-18","level":2,"module":"DELE","spanish_full":"Quiero el filete en su punto.","spanish_cloze":"Quiero el filete en su ___.","spanish_answer":"punto","spanish_alternatives":["término","termino"],"chinese_simp_full":"我要一份牛排，五分熟。","chinese_simp_cloze":"我要一份牛排，___。","chinese_simp_answer":"五分熟","chinese_trad_full":"我要一份牛排，五分熟。","chinese_trad_cloze":"我要一份牛排，___。","chinese_trad_answer":"五分熟","pinyin":"Wǒ yào yí fèn niúpái, wǔ fēn shú."},{"id":"dele-19","level":2,"module":"DELE","spanish_full":"En la biblioteca hay que guardar silencio.","spanish_cloze":"En la biblioteca hay que guardar ___.","spanish_answer":"silencio","spanish_alternatives":["calma"],"chinese_simp_full":"图书馆里要保持安静。","chinese_simp_cloze":"图书馆里要保持___。","chinese_simp_answer":"安静","chinese_trad_full":"圖書館裡要保持安靜。","chinese_trad_cloze":"圖書館裡要保持___。","chinese_trad_answer":"安靜","pinyin":"Túshūguǎn lǐ yào bǎochí ānjìng."},{"id":"dele-20","level":2,"module":"DELE","spanish_full":"La semana próxima vamos a mudarnos de casa.","spanish_cloze":"La semana próxima vamos a mudarnos de ___.","spanish_answer":"casa","spanish_alternatives":["piso","apartamento"],"chinese_simp_full":"我们下周要搬家了。","chinese_simp_cloze":"我们下周要___了。","chinese_simp_answer":"搬家","chinese_trad_full":"我們下週要搬家了。","chinese_trad_cloze":"我們下週要___了。","chinese_trad_answer":"搬家","pinyin":"Wǒmen xià zhōu yào bānjiā le."}]
};
// Saludos / Migraciones / Supermercado usan el mismo lote diario (se filtra por s.module)
EMBEDDED_MODULE_DATA['Saludos'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['Migraciones'] = EMBEDDED_MODULE_DATA['todas'];
EMBEDDED_MODULE_DATA['Supermercado'] = EMBEDDED_MODULE_DATA['todas'];
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
