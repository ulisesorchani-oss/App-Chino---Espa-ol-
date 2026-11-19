// ═══════════════════════════════════════════════════════════════════
// lessons-familia.js — LECCIONES DE FAMILIA (fichas) · TOCFL, nivel aproximado
// GENERADO por tools/build-familia.js desde tools/lecciones-familia/fuente-guofeng.json + ajustes.json. NO editar a mano:
// tools/check-familia.js lo vuelve a calcular y falla si no coincide.
// Fuente: material del Instituto Guó Fēng («Mapa de la familia», transcrito de una captura). Permiso de uso: a confirmar con el maestro.
// revision: todos «pendiente» (el chino lo revisa Ulises; constancia en docs/revision-familia.md). Zhuyin derivado del pinyin
// de la fuente (tono neutro adelante: ˙ㄇㄚ), pendiente de revisión. No entra en GRADED_LESSONS ni en el SRS.
// Esquema: { id, kind:"familia", hsk, exam:"TOCFL", examLvl, nivelAprox, emoji, titleZh, titleZhT, titleEs, blurb, fuente,
//   grupos:[{ titulo, items:[{ id, zh, zhT, py, zy, es, gen, linea, cat, revision, verificar?, ancla?, destacarCotidiano?,
//   cotidianoIgual?, cotidiano:[{ zh, zhT, py, zy, verificar?, repetido? }] }] }] | reglas:[{ marcas, es, ejemplos }] }
// ═══════════════════════════════════════════════════════════════════
window.FAMILY_LESSONS = [
  {"id":"tocfl-fam-abuelos","kind":"familia","hsk":2,"exam":"TOCFL","examLvl":"A2","nivelAprox":true,"emoji":"👵","titleZh":"祖父母和曾祖父母","titleZhT":"祖父母和曾祖父母","titleEs":"Abuelos y bisabuelos","blurb":"Los abuelos y bisabuelos por el lado de mamá y por el lado de papá, con la forma formal y la que se usa en casa. Tocá 🔊 para escuchar cada una.","fuente":"material del Instituto Guó Fēng",
   "grupos": [
    {"titulo": "Lado de mamá", "items": [
     {"id":"fam-waizengzufu","zh":"外曾祖父","zhT":"外曾祖父","py":"wàizēngzǔfù","zy":"ㄨㄞˋ ㄗㄥ ㄗㄨˇ ㄈㄨˋ","es":"Bisabuelo materno","gen":3,"linea":"materna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"太外公","zhT":"太外公","py":"tài wàigōng","zy":"ㄊㄞˋ ㄨㄞˋ ㄍㄨㄥ"}]},
     {"id":"fam-waizengzumu","zh":"外曾祖母","zhT":"外曾祖母","py":"wàizēngzǔmǔ","zy":"ㄨㄞˋ ㄗㄥ ㄗㄨˇ ㄇㄨˇ","es":"Bisabuela materna","gen":3,"linea":"materna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"太外婆","zhT":"太外婆","py":"tài wàipó","zy":"ㄊㄞˋ ㄨㄞˋ ㄆㄛˊ"}]},
     {"id":"fam-waizufu","zh":"外祖父","zhT":"外祖父","py":"wàizǔfù","zy":"ㄨㄞˋ ㄗㄨˇ ㄈㄨˋ","es":"Abuelo materno","gen":2,"linea":"materna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"外公","zhT":"外公","py":"wàigōng","zy":"ㄨㄞˋ ㄍㄨㄥ"}]},
     {"id":"fam-waizumu","zh":"外祖母","zhT":"外祖母","py":"wàizǔmǔ","zy":"ㄨㄞˋ ㄗㄨˇ ㄇㄨˇ","es":"Abuela materna","gen":2,"linea":"materna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"外婆","zhT":"外婆","py":"wàipó","zy":"ㄨㄞˋ ㄆㄛˊ"}]}
    ]},
    {"titulo": "Lado de papá", "items": [
     {"id":"fam-zengzufu","zh":"曾祖父","zhT":"曾祖父","py":"zēngzǔfù","zy":"ㄗㄥ ㄗㄨˇ ㄈㄨˋ","es":"Bisabuelo paterno","gen":3,"linea":"paterna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"太爷爷","zhT":"太爺爺","py":"tài yéye","zy":"ㄊㄞˋ ㄧㄝˊ ˙ㄧㄝ"}]},
     {"id":"fam-zengzumu","zh":"曾祖母","zhT":"曾祖母","py":"zēngzǔmǔ","zy":"ㄗㄥ ㄗㄨˇ ㄇㄨˇ","es":"Bisabuela paterna","gen":3,"linea":"paterna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"太奶奶","zhT":"太奶奶","py":"tài nǎinai","zy":"ㄊㄞˋ ㄋㄞˇ ˙ㄋㄞ"}]},
     {"id":"fam-zufu","zh":"祖父","zhT":"祖父","py":"zǔfù","zy":"ㄗㄨˇ ㄈㄨˋ","es":"Abuelo paterno","gen":2,"linea":"paterna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"爷爷","zhT":"爺爺","py":"yéye","zy":"ㄧㄝˊ ˙ㄧㄝ"}]},
     {"id":"fam-zumu","zh":"祖母","zhT":"祖母","py":"zǔmǔ","zy":"ㄗㄨˇ ㄇㄨˇ","es":"Abuela paterna","gen":2,"linea":"paterna","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"奶奶","zhT":"奶奶","py":"nǎinai","zy":"ㄋㄞˇ ˙ㄋㄞ"}]}
    ]}
   ]},
  {"id":"tocfl-fam-tios","kind":"familia","hsk":2,"exam":"TOCFL","examLvl":"A2","nivelAprox":true,"emoji":"👨‍👩‍👧","titleZh":"父母和他们的兄弟姊妹","titleZhT":"父母和他們的兄弟姊妹","titleEs":"Papá, mamá y tíos","blurb":"Papá, mamá y sus hermanos, separados por lado: por papá cambia si el tío es mayor o menor que él. Tocá 🔊 para escuchar cada forma.","fuente":"material del Instituto Guó Fēng",
   "grupos": [
    {"titulo": "Papá y mamá", "items": [
     {"id":"fam-fuqin","zh":"父亲","zhT":"父親","py":"fùqīn","zy":"ㄈㄨˋ ㄑㄧㄣ","es":"Papá","gen":1,"linea":"centro","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"爸爸","zhT":"爸爸","py":"bàba","zy":"ㄅㄚˋ ˙ㄅㄚ"}]},
     {"id":"fam-muqin","zh":"母亲","zhT":"母親","py":"mǔqīn","zy":"ㄇㄨˇ ㄑㄧㄣ","es":"Mamá","gen":1,"linea":"centro","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"妈妈","zhT":"媽媽","py":"māma","zy":"ㄇㄚ ˙ㄇㄚ"}]}
    ]},
    {"titulo": "Lado de papá", "items": [
     {"id":"fam-bofu","zh":"伯父","zhT":"伯父","py":"bófù","zy":"ㄅㄛˊ ㄈㄨˋ","es":"Tío, hermano mayor de papá","gen":1,"linea":"paterna","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"伯伯","zhT":"伯伯","py":"bóbo","zy":"ㄅㄛˊ ˙ㄅㄛ"}]},
     {"id":"fam-shufu","zh":"叔父","zhT":"叔父","py":"shúfù","zy":"ㄕㄨˊ ㄈㄨˋ","es":"Tío, hermano menor de papá","gen":1,"linea":"paterna","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"叔叔","zhT":"叔叔","py":"shúshu","zy":"ㄕㄨˊ ˙ㄕㄨ"}]},
     {"id":"fam-bomu","zh":"伯母","zhT":"伯母","py":"bómǔ","zy":"ㄅㄛˊ ㄇㄨˇ","es":"Esposa del hermano mayor de papá","gen":1,"linea":"paterna","cat":"afinidad","revision":"pendiente","verificar":true,"cotidianoIgual":true,"cotidiano":[{"zh":"伯母","zhT":"伯母","py":"bómǔ","zy":"ㄅㄛˊ ㄇㄨˇ","verificar":true,"repetido":true}]},
     {"id":"fam-shumu","zh":"叔母","zhT":"叔母","py":"shúmǔ","zy":"ㄕㄨˊ ㄇㄨˇ","es":"Esposa del hermano menor de papá","gen":1,"linea":"paterna","cat":"afinidad","revision":"pendiente","verificar":true,"cotidiano":[{"zh":"婶婶","zhT":"嬸嬸","py":"shěnshen","zy":"ㄕㄣˇ ˙ㄕㄣ","verificar":true}]},
     {"id":"fam-gumu","zh":"姑母","zhT":"姑母","py":"gūmǔ","zy":"ㄍㄨ ㄇㄨˇ","es":"Tía (hermana de papá)","gen":1,"linea":"paterna","cat":"colateral","revision":"pendiente","verificar":true,"cotidiano":[{"zh":"姑姑","zhT":"姑姑","py":"gūgu","zy":"ㄍㄨ ˙ㄍㄨ","verificar":true},{"zh":"大姑","zhT":"大姑","py":"dàgū","zy":"ㄉㄚˋ ㄍㄨ","verificar":true},{"zh":"小姑","zhT":"小姑","py":"xiǎogū","zy":"ㄒㄧㄠˇ ㄍㄨ","verificar":true}]},
     {"id":"fam-gufu","zh":"姑父","zhT":"姑父","py":"gūfù","zy":"ㄍㄨ ㄈㄨˋ","es":"Esposo de la tía (hermana de papá)","gen":1,"linea":"paterna","cat":"afinidad","revision":"pendiente","cotidiano":[{"zh":"姑丈","zhT":"姑丈","py":"gūzhàng","zy":"ㄍㄨ ㄓㄤˋ"}]}
    ]},
    {"titulo": "Lado de mamá", "items": [
     {"id":"fam-jiufu","zh":"舅父","zhT":"舅父","py":"jiùfù","zy":"ㄐㄧㄡˋ ㄈㄨˋ","es":"Tío (hermano de mamá)","gen":1,"linea":"materna","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"舅舅","zhT":"舅舅","py":"jiùjiu","zy":"ㄐㄧㄡˋ ˙ㄐㄧㄡ"}]},
     {"id":"fam-jiumu","zh":"舅母","zhT":"舅母","py":"jiùmǔ","zy":"ㄐㄧㄡˋ ㄇㄨˇ","es":"Esposa del tío (hermano de mamá)","gen":1,"linea":"materna","cat":"afinidad","revision":"pendiente","cotidiano":[{"zh":"舅妈","zhT":"舅媽","py":"jiùmā","zy":"ㄐㄧㄡˋ ㄇㄚ"}]},
     {"id":"fam-yimu","zh":"姨母","zhT":"姨母","py":"yímǔ","zy":"ㄧˊ ㄇㄨˇ","es":"Tía (hermana de mamá)","gen":1,"linea":"materna","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"阿姨","zhT":"阿姨","py":"āyí","zy":"ㄚ ㄧˊ"}]},
     {"id":"fam-yifu","zh":"姨父","zhT":"姨父","py":"yífù","zy":"ㄧˊ ㄈㄨˋ","es":"Esposo de la tía (hermana de mamá)","gen":1,"linea":"materna","cat":"afinidad","revision":"pendiente","cotidiano":[{"zh":"姨丈","zhT":"姨丈","py":"yízhàng","zy":"ㄧˊ ㄓㄤˋ"}]}
    ]}
   ]},
  {"id":"tocfl-fam-hermanos","kind":"familia","hsk":1,"exam":"TOCFL","examLvl":"Prep","nivelAprox":true,"emoji":"👫","titleZh":"兄弟姊妹和夫妻","titleZhT":"兄弟姊妹和夫妻","titleEs":"Hermanos y pareja","blurb":"Desde vos: tus hermanos, mayores y menores, y tu pareja. Tocá 🔊 para escuchar cada forma.","fuente":"material del Instituto Guó Fēng",
   "grupos": [
    {"titulo": "Punto de partida", "items": [
     {"id":"fam-ziji","zh":"自己","zhT":"自己","py":"zìjǐ","zy":"ㄗˋ ㄐㄧˇ","es":"Yo","gen":0,"linea":"centro","cat":"directo","revision":"pendiente","ancla":true,"cotidiano":[{"zh":"我","zhT":"我","py":"wǒ","zy":"ㄨㄛˇ"}]}
    ]},
    {"titulo": "Hermanos", "items": [
     {"id":"fam-xiong","zh":"兄","zhT":"兄","py":"xiōng","zy":"ㄒㄩㄥ","es":"Hermano mayor","gen":0,"linea":"centro","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"哥哥","zhT":"哥哥","py":"gēge","zy":"ㄍㄜ ˙ㄍㄜ"}]},
     {"id":"fam-di","zh":"弟","zhT":"弟","py":"dì","zy":"ㄉㄧˋ","es":"Hermano menor","gen":0,"linea":"centro","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"弟弟","zhT":"弟弟","py":"dìdi","zy":"ㄉㄧˋ ˙ㄉㄧ"}]},
     {"id":"fam-jie","zh":"姊","zhT":"姊","py":"jiě","zy":"ㄐㄧㄝˇ","es":"Hermana mayor","gen":0,"linea":"centro","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"姊姊","zhT":"姊姊","py":"jiějie","zy":"ㄐㄧㄝˇ ˙ㄐㄧㄝ"}]},
     {"id":"fam-mei","zh":"妹","zhT":"妹","py":"mèi","zy":"ㄇㄟˋ","es":"Hermana menor","gen":0,"linea":"centro","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"妹妹","zhT":"妹妹","py":"mèimei","zy":"ㄇㄟˋ ˙ㄇㄟ"}]}
    ]},
    {"titulo": "Pareja", "items": [
     {"id":"fam-fu","zh":"夫","zhT":"夫","py":"fū","zy":"ㄈㄨ","es":"Esposo","gen":0,"linea":"centro","cat":"afinidad","revision":"pendiente","cotidiano":[{"zh":"老公","zhT":"老公","py":"lǎogōng","zy":"ㄌㄠˇ ㄍㄨㄥ"}]},
     {"id":"fam-qi","zh":"妻","zhT":"妻","py":"qī","zy":"ㄑㄧ","es":"Esposa","gen":0,"linea":"centro","cat":"afinidad","revision":"pendiente","cotidiano":[{"zh":"老婆","zhT":"老婆","py":"lǎopó","zy":"ㄌㄠˇ ㄆㄛˊ"}]}
    ]}
   ]},
  {"id":"tocfl-fam-primos","kind":"familia","hsk":4,"exam":"TOCFL","examLvl":"B1","nivelAprox":true,"emoji":"🧑‍🤝‍🧑","titleZh":"嫂、姊夫和堂表兄弟姊妹","titleZhT":"嫂、姊夫和堂表兄弟姊妹","titleEs":"Cuñados y primos","blurb":"Las parejas de tus hermanos y tus primos: el nombre cambia según el apellido y según si son mayores o menores que vos.","fuente":"material del Instituto Guó Fēng",
   "grupos": [
    {"titulo": "Cuñados", "items": [
     {"id":"fam-sao","zh":"嫂","zhT":"嫂","py":"sǎo","zy":"ㄙㄠˇ","es":"Cuñada, esposa del hermano mayor","gen":0,"linea":"centro","cat":"afinidad","revision":"pendiente","verificar":true,"cotidiano":[{"zh":"大嫂","zhT":"大嫂","py":"dàsǎo","zy":"ㄉㄚˋ ㄙㄠˇ","verificar":true}]},
     {"id":"fam-difu","zh":"弟妇","zhT":"弟婦","py":"dìfù","zy":"ㄉㄧˋ ㄈㄨˋ","es":"Cuñada, esposa del hermano menor","gen":0,"linea":"centro","cat":"afinidad","revision":"pendiente","verificar":true,"cotidiano":[{"zh":"弟妹","zhT":"弟妹","py":"dìmèi","zy":"ㄉㄧˋ ㄇㄟˋ","verificar":true}]},
     {"id":"fam-jiefu","zh":"姊夫","zhT":"姊夫","py":"jiěfū","zy":"ㄐㄧㄝˇ ㄈㄨ","es":"Cuñado, esposo de la hermana mayor","gen":0,"linea":"centro","cat":"afinidad","revision":"pendiente","cotidiano":[]},
     {"id":"fam-meifu","zh":"妹夫","zhT":"妹夫","py":"mèifū","zy":"ㄇㄟˋ ㄈㄨ","es":"Cuñado, esposo de la hermana menor","gen":0,"linea":"centro","cat":"afinidad","revision":"pendiente","cotidiano":[]}
    ]},
    {"titulo": "Primos 堂: hijos de los hermanos de papá (mismo apellido)", "items": [
     {"id":"fam-tangxiong","zh":"堂兄","zhT":"堂兄","py":"tángxiōng","zy":"ㄊㄤˊ ㄒㄩㄥ","es":"Primo mayor, hijo de un hermano de papá","gen":0,"linea":"paterna","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"堂哥","zhT":"堂哥","py":"tánggē","zy":"ㄊㄤˊ ㄍㄜ"}]},
     {"id":"fam-tangdi","zh":"堂弟","zhT":"堂弟","py":"tángdì","zy":"ㄊㄤˊ ㄉㄧˋ","es":"Primo menor, hijo de un hermano de papá","gen":0,"linea":"paterna","cat":"colateral","revision":"pendiente","cotidiano":[]},
     {"id":"fam-tangjie","zh":"堂姊","zhT":"堂姊","py":"tángjiě","zy":"ㄊㄤˊ ㄐㄧㄝˇ","es":"Prima mayor, hija de un hermano de papá","gen":0,"linea":"paterna","cat":"colateral","revision":"pendiente","verificar":true,"cotidiano":[]},
     {"id":"fam-tangmei","zh":"堂妹","zhT":"堂妹","py":"tángmèi","zy":"ㄊㄤˊ ㄇㄟˋ","es":"Prima menor, hija de un hermano de papá","gen":0,"linea":"paterna","cat":"colateral","revision":"pendiente","verificar":true,"cotidiano":[]}
    ]},
    {"titulo": "Primos 表: hijos de las hermanas de papá y de los hermanos y hermanas de mamá (otro apellido)", "items": [
     {"id":"fam-biaoxiong","zh":"表兄","zhT":"表兄","py":"biǎoxiōng","zy":"ㄅㄧㄠˇ ㄒㄩㄥ","es":"Primo mayor, de otro apellido","gen":0,"linea":"materna","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"表哥","zhT":"表哥","py":"biǎogē","zy":"ㄅㄧㄠˇ ㄍㄜ"}]},
     {"id":"fam-biaodi","zh":"表弟","zhT":"表弟","py":"biǎodì","zy":"ㄅㄧㄠˇ ㄉㄧˋ","es":"Primo menor, de otro apellido","gen":0,"linea":"materna","cat":"colateral","revision":"pendiente","cotidiano":[]},
     {"id":"fam-biaojie","zh":"表姊","zhT":"表姊","py":"biǎojiě","zy":"ㄅㄧㄠˇ ㄐㄧㄝˇ","es":"Prima mayor, de otro apellido","gen":0,"linea":"materna","cat":"colateral","revision":"pendiente","verificar":true,"cotidiano":[{"zh":"表姐","zhT":"表姐","py":"biǎojiě","zy":"ㄅㄧㄠˇ ㄐㄧㄝˇ","verificar":true}]},
     {"id":"fam-biaomei","zh":"表妹","zhT":"表妹","py":"biǎomèi","zy":"ㄅㄧㄠˇ ㄇㄟˋ","es":"Prima menor, de otro apellido","gen":0,"linea":"materna","cat":"colateral","revision":"pendiente","verificar":true,"cotidiano":[]}
    ]}
   ]},
  {"id":"tocfl-fam-hijos","kind":"familia","hsk":2,"exam":"TOCFL","examLvl":"A2","nivelAprox":true,"emoji":"👶","titleZh":"儿女、媳妇和侄甥","titleZhT":"兒女、媳婦和姪甥","titleEs":"Hijos, nueras y sobrinos","blurb":"Hijos, sus parejas y sobrinos: el sobrino cambia de nombre si es hijo de tu hermano o de tu hermana.","fuente":"material del Instituto Guó Fēng",
   "grupos": [
    {"titulo": "Hijos y sus parejas", "items": [
     {"id":"fam-zi","zh":"子","zhT":"子","py":"zǐ","zy":"ㄗˇ","es":"Hijo","gen":-1,"linea":"descendientes","cat":"directo","revision":"pendiente","destacarCotidiano":true,"cotidiano":[{"zh":"儿子","zhT":"兒子","py":"érzi","zy":"ㄦˊ ˙ㄗ"}]},
     {"id":"fam-nv","zh":"女","zhT":"女","py":"nǚ","zy":"ㄋㄩˇ","es":"Hija","gen":-1,"linea":"descendientes","cat":"directo","revision":"pendiente","destacarCotidiano":true,"cotidiano":[{"zh":"女儿","zhT":"女兒","py":"nǚ'ér","zy":"ㄋㄩˇ ㄦˊ"}]},
     {"id":"fam-xi","zh":"媳","zhT":"媳","py":"xí","zy":"ㄒㄧˊ","es":"Nuera","gen":-1,"linea":"descendientes","cat":"afinidad","revision":"pendiente","destacarCotidiano":true,"cotidiano":[{"zh":"媳妇","zhT":"媳婦","py":"xífù","zy":"ㄒㄧˊ ㄈㄨˋ"}]},
     {"id":"fam-nvxu","zh":"女婿","zhT":"女婿","py":"nǚxù","zy":"ㄋㄩˇ ㄒㄩˋ","es":"Yerno","gen":-1,"linea":"descendientes","cat":"afinidad","revision":"pendiente","cotidiano":[]}
    ]},
    {"titulo": "Sobrinos", "items": [
     {"id":"fam-zhi","zh":"侄","zhT":"姪","py":"zhí","zy":"ㄓˊ","es":"Sobrino (hijo del hermano)","gen":-1,"linea":"descendientes","cat":"colateral","revision":"pendiente","cotidiano":[{"zh":"侄子","zhT":"姪子","py":"zhízi","zy":"ㄓˊ ˙ㄗ"}]},
     {"id":"fam-zhinv","zh":"侄女","zhT":"姪女","py":"zhínǚ","zy":"ㄓˊ ㄋㄩˇ","es":"Sobrina (hija del hermano)","gen":-1,"linea":"descendientes","cat":"colateral","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waisheng","zh":"外甥","zhT":"外甥","py":"wàishēng","zy":"ㄨㄞˋ ㄕㄥ","es":"Sobrino (hijo de la hermana)","gen":-1,"linea":"descendientes","cat":"colateral","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waishengnv","zh":"外甥女","zhT":"外甥女","py":"wàishēngnǚ","zy":"ㄨㄞˋ ㄕㄥ ㄋㄩˇ","es":"Sobrina (hija de la hermana)","gen":-1,"linea":"descendientes","cat":"colateral","revision":"pendiente","cotidiano":[]}
    ]}
   ]},
  {"id":"tocfl-fam-nietos","kind":"familia","hsk":4,"exam":"TOCFL","examLvl":"B1","nivelAprox":true,"emoji":"🍼","titleZh":"孙子和曾孙","titleZhT":"孫子和曾孫","titleEs":"Nietos y bisnietos","blurb":"Nietos y bisnietos, con sus parejas: los hijos de tu hija llevan 外 adelante.","fuente":"material del Instituto Guó Fēng",
   "grupos": [
    {"titulo": "Nietos por mi hijo", "items": [
     {"id":"fam-sun","zh":"孙","zhT":"孫","py":"sūn","zy":"ㄙㄨㄣ","es":"Nieto (hijo de mi hijo)","gen":-2,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[{"zh":"孙子","zhT":"孫子","py":"sūnzi","zy":"ㄙㄨㄣ ˙ㄗ"}]},
     {"id":"fam-sunnv","zh":"孙女","zhT":"孫女","py":"sūnnǚ","zy":"ㄙㄨㄣ ㄋㄩˇ","es":"Nieta (hija de mi hijo)","gen":-2,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]},
     {"id":"fam-sunfu","zh":"孙妇","zhT":"孫婦","py":"sūnfù","zy":"ㄙㄨㄣ ㄈㄨˋ","es":"Esposa del nieto (hijo de mi hijo)","gen":-2,"linea":"descendientes","cat":"afinidad","revision":"pendiente","verificar":true,"cotidiano":[{"zh":"孙媳妇","zhT":"孫媳婦","py":"sūnxífù","zy":"ㄙㄨㄣ ㄒㄧˊ ㄈㄨˋ","verificar":true}]},
     {"id":"fam-sunnvxu","zh":"孙女婿","zhT":"孫女婿","py":"sūnnǚxù","zy":"ㄙㄨㄣ ㄋㄩˇ ㄒㄩˋ","es":"Esposo de la nieta (hija de mi hijo)","gen":-2,"linea":"descendientes","cat":"afinidad","revision":"pendiente","cotidiano":[]}
    ]},
    {"titulo": "Nietos por mi hija", "items": [
     {"id":"fam-waisun","zh":"外孙","zhT":"外孫","py":"wàisūn","zy":"ㄨㄞˋ ㄙㄨㄣ","es":"Nieto (hijo de mi hija)","gen":-2,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waisunnv","zh":"外孙女","zhT":"外孫女","py":"wàisūnnǚ","zy":"ㄨㄞˋ ㄙㄨㄣ ㄋㄩˇ","es":"Nieta (hija de mi hija)","gen":-2,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waisunfu","zh":"外孙妇","zhT":"外孫婦","py":"wàisūnfù","zy":"ㄨㄞˋ ㄙㄨㄣ ㄈㄨˋ","es":"Esposa del nieto (hijo de mi hija)","gen":-2,"linea":"descendientes","cat":"afinidad","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waisunnvxu","zh":"外孙女婿","zhT":"外孫女婿","py":"wàisūnnǚxù","zy":"ㄨㄞˋ ㄙㄨㄣ ㄋㄩˇ ㄒㄩˋ","es":"Esposo de la nieta (hija de mi hija)","gen":-2,"linea":"descendientes","cat":"afinidad","revision":"pendiente","cotidiano":[]}
    ]},
    {"titulo": "Bisnietos", "items": [
     {"id":"fam-zengsun","zh":"曾孙","zhT":"曾孫","py":"zēngsūn","zy":"ㄗㄥ ㄙㄨㄣ","es":"Bisnieto (por mi hijo)","gen":-3,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]},
     {"id":"fam-zengsunnv","zh":"曾孙女","zhT":"曾孫女","py":"zēngsūnnǚ","zy":"ㄗㄥ ㄙㄨㄣ ㄋㄩˇ","es":"Bisnieta (por mi hijo)","gen":-3,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waizengsun","zh":"外曾孙","zhT":"外曾孫","py":"wàizēngsūn","zy":"ㄨㄞˋ ㄗㄥ ㄙㄨㄣ","es":"Bisnieto (por mi hija)","gen":-3,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]},
     {"id":"fam-waizengsunnv","zh":"外曾孙女","zhT":"外曾孫女","py":"wàizēngsūnnǚ","zy":"ㄨㄞˋ ㄗㄥ ㄙㄨㄣ ㄋㄩˇ","es":"Bisnieta (por mi hija)","gen":-3,"linea":"descendientes","cat":"directo","revision":"pendiente","cotidiano":[]}
    ]}
   ]},
  {"id":"tocfl-fam-reglas","kind":"familia","hsk":4,"exam":"TOCFL","examLvl":"B1","nivelAprox":true,"emoji":"🧩","titleZh":"称谓怎么组成","titleZhT":"稱謂怎麼組成","titleEs":"Cómo se arman los términos","blurb":"Cuatro piezas que se repiten en todo el mapa de la familia. Con ellas podés adivinar muchos términos nuevos.","fuente":"material del Instituto Guó Fēng",
   "reglas": [
    {"marcas":[{"zh":"外","zhT":"外","py":"wài","zy":"ㄨㄞˋ"}],"es":"«De afuera»: la familia de mamá y los hijos de las mujeres de la familia.","ejemplos":[{"zh":"外公","zhT":"外公","py":"wàigōng","zy":"ㄨㄞˋ ㄍㄨㄥ"},{"zh":"外甥","zhT":"外甥","py":"wàishēng","zy":"ㄨㄞˋ ㄕㄥ"},{"zh":"外孙","zhT":"外孫","py":"wàisūn","zy":"ㄨㄞˋ ㄙㄨㄣ"}]},
    {"marcas":[{"zh":"堂","zhT":"堂","py":"táng","zy":"ㄊㄤˊ"},{"zh":"表","zhT":"表","py":"biǎo","zy":"ㄅㄧㄠˇ"}],"es":"堂: primos con el mismo apellido. 表: primos de otro apellido.","ejemplos":[{"zh":"堂哥","zhT":"堂哥","py":"tánggē","zy":"ㄊㄤˊ ㄍㄜ"},{"zh":"表哥","zhT":"表哥","py":"biǎogē","zy":"ㄅㄧㄠˇ ㄍㄜ"}]},
    {"marcas":[{"zh":"兄","zhT":"兄","py":"xiōng","zy":"ㄒㄩㄥ"},{"zh":"姊","zhT":"姊","py":"jiě","zy":"ㄐㄧㄝˇ"},{"zh":"弟","zhT":"弟","py":"dì","zy":"ㄉㄧˋ"},{"zh":"妹","zhT":"妹","py":"mèi","zy":"ㄇㄟˋ"},{"zh":"伯","zhT":"伯","py":"bó","zy":"ㄅㄛˊ"},{"zh":"叔","zhT":"叔","py":"shú","zy":"ㄕㄨˊ"}],"es":"兄 y 姊: mayores que yo; 弟 y 妹: menores. 伯: mayor que papá; 叔: menor que papá.","ejemplos":[{"zh":"兄","zhT":"兄","py":"xiōng","zy":"ㄒㄩㄥ"},{"zh":"姊","zhT":"姊","py":"jiě","zy":"ㄐㄧㄝˇ"},{"zh":"弟","zhT":"弟","py":"dì","zy":"ㄉㄧˋ"},{"zh":"妹","zhT":"妹","py":"mèi","zy":"ㄇㄟˋ"},{"zh":"伯父","zhT":"伯父","py":"bófù","zy":"ㄅㄛˊ ㄈㄨˋ"},{"zh":"叔父","zhT":"叔父","py":"shúfù","zy":"ㄕㄨˊ ㄈㄨˋ"}]},
    {"marcas":[{"zh":"曾","zhT":"曾","py":"zēng","zy":"ㄗㄥ"}],"es":"Una generación más lejos, hacia arriba y hacia abajo.","ejemplos":[{"zh":"曾祖父","zhT":"曾祖父","py":"zēngzǔfù","zy":"ㄗㄥ ㄗㄨˇ ㄈㄨˋ"},{"zh":"曾孙","zhT":"曾孫","py":"zēngsūn","zy":"ㄗㄥ ㄙㄨㄣ"}]}
   ]}
];
