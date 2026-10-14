/* ═══════════════════════════════════════════════════════════════════
 * pinyin-tocfl.js — v9.7x · convención de pinyin de la familia TOCFL
 *
 * Fuente: lista de vocabulario 華語八千詞表 (2023), archivo 8000zhuyin_202307
 *   de tocfl.edu.tw, tal como está embebida en la app (EMBEDDED_MODULE_DATA,
 *   módulos TOCFL-Prep … TOCFL-C).
 * Tabla generada por programa el 2026-10-14; no se editó a mano.
 * Método de conversión de zhuyin a pinyin: no documentado.
 * No verificado contra el diccionario del Ministerio de Educación.
 *
 * Contenido: solo las 327 palabras de 2 o más caracteres cuya lectura en la
 * lista difiere de la que genera pinyin-pro. Se excluyen: las palabras con
 * lecturas en conflicto dentro de la lista, las de un solo carácter, las 70
 * que solo difieren en el cambio de tono de 一/不, las 12 que quedan iguales
 * al tomar la primera variante de las entradas con "/" y la que solo difiere
 * en cómo se escribe el 兒 final. En las entradas con "/" se usa la primera
 * variante. Claves en simplificado; una sílaba por carácter, en minúscula.
 *
 * Se carga SOLO la primera vez que una pantalla de la familia TOCFL pide
 * pinyin (ensureTocflPinyin en pinyin-familias.js).
 * ═══════════════════════════════════════════════════════════════════ */
window.PINYIN_TOCFL = {
    '哎哟': 'āi yāo', // 哎喲
    '爱惜': 'ài xí', // 愛惜
    '案子': 'àn zi',
    '傍晚': 'bāng wǎn',
    '棒子': 'bàng zi',
    '包子': 'bāo zi',
    '暴露': 'pù lù',
    '本质': 'běn zhí', // 本質
    '便宜': 'pián yí',
    '辨识': 'biàn shì', // 辨識
    '病菌': 'bìng jùn',
    '剥削': 'bō xuè', // 剝削
    '播出': 'bò chū',
    '不当': 'bù dàng', // 不當
    '不见得': 'bù jiàn de', // 不見得
    '不惜': 'bù xí',
    '不由得': 'bù yóu de',
    '步骤': 'bù zòu', // 步驟
    '部署': 'bù shù',
    '裁缝': 'cái féng', // 裁縫
    '差不多': 'chā bù duō',
    '差点': 'chā diǎn', // 差點
    '颤抖': 'zhàn dǒu', // 顫抖
    '肠(子)': 'cháng ( zi )', // 腸(子)
    '常识': 'cháng shì', // 常識
    '称呼': 'chēng hū', // 稱呼
    '成绩': 'chéng jī', // 成績
    '成熟': 'chéng shóu',
    '池(子)': 'chí ( zi )',
    '冲击': 'chōng jí', // 衝擊
    '冲突': 'chōng tú', // 衝突
    '虫子': 'chóng zi', // 蟲子
    '抽空': 'chōu kòng',
    '出息': 'chū xi',
    '出血': 'chū xiě',
    '初期': 'chū qí',
    '除夕': 'chú xì',
    '储备': 'chú bèi', // 儲備
    '储存': 'chú cún', // 儲存
    '储蓄': 'chú xù', // 儲蓄
    '传播': 'chuán bò', // 傳播
    '伺候': 'cì hòu',
    '聪明': 'cōng míng', // 聰明
    '从容': 'cōng róng', // 從容
    '簇拥': 'cù yǒng', // 簇擁
    '撮合': 'cuò hé',
    '答应': 'dā yìng', // 答應
    '打击': 'dǎ jí', // 打擊
    '打量': 'dǎ liàng',
    '打烊': 'dǎ yáng',
    '大夫': 'dài fū',
    '带子': 'dài zi', // 帶子
    '待会': 'dāi huì', // 待會
    '袋子': 'dài zi',
    '单行道': 'dān xíng dào', // 單行道
    '蛋白质': 'dàn bái zhí', // 蛋白質
    '当天': 'dàng tiān', // 當天
    '档案': 'dǎng àn', // 檔案
    '到期': 'dào qí',
    '倒是': 'dào shì',
    '地质': 'dì zhí', // 地質
    '灯笼': 'dēng lóng', // 燈籠
    '凳子': 'dèng zi',
    '底下': 'dǐ xia',
    '弟兄': 'dì xiōng',
    '跌倒': 'dié dǎo',
    '定期': 'dìng qí',
    '东西': 'dōng xi', // 東西
    '动不动': 'dòng bù dòng', // 動不動
    '洞穴': 'dòng xuè',
    '短暂': 'duǎn zhàn', // 短暫
    '队伍': 'duì wǔ', // 隊伍
    '发脾气': 'fā pí qì', // 發脾氣
    '发型': 'fǎ xíng', // 髮型
    '法子': 'fá zi',
    '藩篱': 'fán lí', // 藩籬
    '反击': 'fǎn jí', // 反擊
    '疯子': 'fēng zi', // 瘋子
    '讽刺': 'fèng cì', // 諷刺
    '奉养': 'fèng yàng', // 奉養
    '斧头': 'fǔ tou', // 斧頭
    '概括': 'gài guā',
    '干嘛': 'gàn ma', // 幹嘛
    '胳膊': 'gē bó',
    '鸽(子)': 'gē ( zi )', // 鴿(子)
    '给予': 'gěi yǔ', // 給予
    '工夫': 'gōng fu',
    '公公': 'gōng gōng',
    '功夫': 'gōng fu',
    '攻击': 'gōng jí', // 攻擊
    '供养': 'gòng yàng', // 供養
    '姑娘': 'gū niang',
    '古迹': 'gǔ jī', // 古蹟
    '骨头': 'gú tou', // 骨頭
    '故事': 'gù shi',
    '怪不得': 'guài bù de',
    '管(子)': 'guǎn ( zi )',
    '罐头': 'guàn tou', // 罐頭
    '罐子': 'guàn zi',
    '广播': 'guǎng bò', // 廣播
    '棍(子)': 'gùn ( zi )',
    '锅子': 'guō zi', // 鍋子
    '过期': 'guò qí', // 過期
    '咳嗽': 'ké sòu',
    '合同': 'hé tóng',
    '痕迹': 'hén jī', // 痕跡
    '恨不得': 'hèn bù de',
    '混淆': 'hùn yáo',
    '豁达': 'huò dá', // 豁達
    '活期': 'huó qí',
    '击落': 'jí luò', // 擊落
    '记载': 'jì zài', // 記載
    '寂寞': 'jí mò',
    '夹杂': 'jiá zá', // 夾雜
    '家伙': 'jiā huǒ', // 傢伙
    '假期': 'jià qí',
    '假日': 'jià rì',
    '见识': 'jiàn shì', // 見識
    '建筑': 'jiàn zhú', // 建築
    '讲究': 'jiǎng jiù', // 講究
    '搅和': 'jiǎo huò', // 攪和
    '教书': 'jiāo shū', // 教書
    '结实': 'jié shi', // 結實
    '解剖': 'jiě pǒu',
    '金子': 'jīn zi',
    '尽量': 'jìn liàng', // 盡量
    '究竟': 'jiù jìng',
    '鞠躬': 'jú gōng',
    '绝大部分': 'jué dà bù fèn', // 絕大部分
    '绝迹': 'jué jī', // 絕跡
    '看见': 'kàn jian', // 看見
    '看看': 'kàn kan',
    '可惜': 'kě xí',
    '客气': 'kè qi', // 客氣
    '垃圾': 'lè sè',
    '拉肚子': 'lā dù zi',
    '喇叭': 'lǎ bā',
    '唠叨': 'láo dāo', // 嘮叨
    '老人家': 'lǎo rén jia',
    '老太太': 'lǎo tài tai',
    '老子': 'lǎo zi',
    '梨子': 'lí zi',
    '力气': 'lì qì', // 力氣
    '利息': 'lì xí',
    '凉快': 'liáng kuài', // 涼快
    '两口子': 'liǎng kǒu zi', // 兩口子
    '流血': 'liú xiě',
    '笼(子)': 'lóng ( zi )', // 籠(子)
    '笼罩': 'lóng zhào', // 籠罩
    '炉(子)': 'lú ( zi )', // 爐(子)
    '轮子': 'lún zi', // 輪子
    '落得': 'luò dé',
    '落魄': 'luò tuò',
    '马虎': 'mǎ hū', // 馬虎
    '码头': 'mǎ tou', // 碼頭
    '麦(子)': 'mài ( zi )', // 麥(子)
    '没关系': 'méi guān xi', // 沒關係
    '迷糊': 'mí hú',
    '名字': 'míng zi',
    '模糊': 'mó hú',
    '模具': 'mó jù',
    '模样': 'mó yàng', // 模樣
    '末期': 'mò qí',
    '目击': 'mù jí', // 目擊
    '囊括': 'náng guā',
    '脑子': 'nǎo zi', // 腦子
    '宁可': 'níng kě', // 寧可
    '宁愿': 'níng yuàn', // 寧願
    '片子': 'piàn zi',
    '漂亮': 'piào liàng',
    '品质': 'pǐn zhí', // 品質
    '婆家': 'pó jiā',
    '葡萄': 'pú tao',
    '朴素': 'pú sù', // 樸素
    '曝光': 'pù guāng',
    '期待': 'qí dài',
    '期货': 'qí huò', // 期貨
    '期间': 'qí jiān', // 期間
    '期望': 'qí wàng',
    '期限': 'qí xiàn',
    '奇迹': 'qí jī', // 奇蹟
    '旗子': 'qí zi',
    '企图': 'qì tú', // 企圖
    '企业': 'qì yè', // 企業
    '气息': 'qì xí', // 氣息
    '签署': 'qiān shù', // 簽署
    '悄悄': 'qiǎo qiǎo',
    '亲戚': 'qīn qī', // 親戚
    '热闹': 'rè nao', // 熱鬧
    '认识': 'rèn shì', // 認識
    '任期': 'rèn qí',
    '任务': 'rèn wù', // 任務
    '日期': 'rì qí',
    '上头': 'shàng tou', // 上頭
    '稍微': 'shāo wéi',
    '舍不得': 'shě bù de', // 捨不得
    '射击': 'shè jí', // 射擊
    '身为': 'shēn wéi', // 身為
    '师父': 'shī fù', // 師父
    '师傅': 'shī fù', // 師傅
    '时期': 'shí qí', // 時期
    '实质': 'shí zhí', // 實質
    '使劲': 'shǐ jìng', // 使勁
    '视为': 'shì wéi', // 視為
    '受得了': 'shòu de liǎo',
    '叔叔': 'shú shu',
    '舒服': 'shū fu',
    '输血': 'shū xiě', // 輸血
    '熟悉': 'shóu xī',
    '暑期': 'shǔ qí',
    '束缚': 'shù fú', // 束縛
    '说服': 'shuì fú', // 說服
    '似的': 'sì de',
    '素质': 'sù zhí', // 素質
    '太太': 'tài tai',
    '毯子': 'tǎn zi',
    '探究': 'tàn jiù',
    '桃子': 'táo zi',
    '体质': 'tǐ zhí', // 體質
    '通缉': 'tōng qì', // 通緝
    '头发': 'tóu fǎ', // 頭髮
    '突出': 'tú chū',
    '突击': 'tú jí', // 突擊
    '突破': 'tú pò',
    '突然': 'tú rán',
    '突兀': 'tú wù',
    '拖累': 'tuō lèi',
    '惋惜': 'wàn xí',
    '危害': 'wéi hài',
    '危机': 'wéi jī', // 危機
    '危险': 'wéi xiǎn', // 危險
    '微弱': 'wéi ruò',
    '微小': 'wéi xiǎo',
    '微笑': 'wéi xiào',
    '尾巴': 'wěi bā',
    '委屈': 'wěi qū',
    '萎缩': 'wēi suō', // 萎縮
    '为人': 'wéi rén', // 為人
    '位子': 'wèi zi',
    '温驯': 'wēn xún', // 溫馴
    '紊乱': 'wèn luàn', // 紊亂
    '蜗牛': 'guā niú', // 蝸牛
    '侮辱': 'wǔ rù',
    '舞蹈': 'wǔ dào',
    '物质': 'wù zhí', // 物質
    '昔日': 'xí rì',
    '袭击': 'xí jí', // 襲擊
    '喜欢': 'xǐ huān', // 喜歡
    '细菌': 'xì jùn', // 細菌
    '虾子': 'xiā zi', // 蝦子
    '下跌': 'xià dié',
    '鲜血': 'xiān xiě', // 鮮血
    '相亲': 'xiàng qīn', // 相親
    '相声': 'xiàng shēng', // 相聲
    '消息': 'xiāo xí',
    '小伙子': 'xiǎo huǒ zi',
    '谢谢': 'xiè xie', // 謝謝
    '心脏': 'xīn zàng', // 心臟
    '信息': 'xìn xí',
    '星期': 'xīng qí',
    '星期天': 'xīng qí tiān',
    '星星': 'xīng xing',
    '行李': 'xíng lǐ',
    '性质': 'xìng zhí', // 性質
    '休息': 'xiū xí',
    '修筑': 'xiū zhú', // 修築
    '悬崖': 'xuán yái', // 懸崖
    '削减': 'xuè jiǎn', // 削減
    '削弱': 'xuè ruò',
    '靴子': 'xuē zi',
    '学期': 'xué qí', // 學期
    '学识': 'xué shì', // 學識
    '血管': 'xiě guǎn',
    '血汗': 'xiě hàn',
    '血迹': 'xiě jī', // 血跡
    '血型': 'xiě xíng',
    '血压': 'xiě yā', // 血壓
    '血液': 'xiě yè',
    '研究': 'yán jiù',
    '研究所': 'yán jiù suǒ',
    '燕(子)': 'yàn ( zi )',
    '要是': 'yào shì',
    '业绩': 'yè jī', // 業績
    '一会儿': 'yī huǐ r', // 一會兒
    '衣服': 'yī fú',
    '意识': 'yì shì', // 意識
    '意识到': 'yì shì dào', // 意識到
    '意思': 'yì si',
    '应酬': 'yìng chóu', // 應酬
    '拥抱': 'yǒng bào', // 擁抱
    '拥护': 'yǒng hù', // 擁護
    '拥挤': 'yǒng jǐ', // 擁擠
    '拥有': 'yǒng yǒu', // 擁有
    '用不着': 'yòng bù zháo', // 用不著
    '用处': 'yòng chù', // 用處
    '用得着': 'yòng de zháo', // 用得著
    '有空': 'yǒu kòng',
    '有时候': 'yǒu shí hou', // 有時候
    '有为': 'yǒu wéi', // 有為
    '有意思': 'yǒu yì si',
    '月分': 'yuè fèn',
    '暂时': 'zhàn shí', // 暫時
    '丈夫': 'zhàng fū',
    '折腾': 'zhē téng', // 折騰
    '着急': 'zhāo jí', // 著急
    '着想': 'zháo xiǎng', // 著想
    '珍惜': 'zhēn xí',
    '阵子': 'zhèn zi', // 陣子
    '政绩': 'zhèng jī', // 政績
    '知识': 'zhī shì', // 知識
    '值得': 'zhí de',
    '只得': 'zhǐ dé',
    '质量': 'zhí liàng', // 質量
    '质疑': 'zhí yí', // 質疑
    '中暑': 'zhòng shǔ',
    '终究': 'zhōng jiù', // 終究
    '种植': 'zhòng zhí', // 種植
    '种子': 'zhǒng zǐ', // 種子
    '柱(子)': 'zhù ( zi )',
    '转播': 'zhuǎn bò', // 轉播
    '转动': 'zhuǎn dòng', // 轉動
    '追究': 'zhuī jiù',
    '酌量': 'zhuó liáng',
    '姊妹': 'jiě mèi',
    '姊姊': 'jiě jie',
    '综合': 'zòng hé', // 綜合
    '罪行': 'zuì xìng',
};
