/* ============================================================
   lessons.js — Textos completos para el botón "📖 Leer lección"
   ------------------------------------------------------------
   v7.14 · Este archivo es SOLO DATOS (patrón dict-mini.js):
   app.js NO se regenera para agregar lecciones.

   · Cada entrada de window.LESSONS_DATA.lessons es una lección
     legible de corrido en el Lector de texto (pinyin interlineal,
     colores de tono, diccionario al toque y lectura en voz alta).
   · Mapeo oración → lección:
       "module": "Clasicos-Daxue"  → el módulo entero es la lección
       "ids": ["lunyu_01", ...]    → lección parcial (futuro)
   · CAMPOS: id, title, module (o ids), text_simp, text_trad.
     Solo chino por diseño: el pinyin lo genera el Lector.
   · CÓMO AGREGAR UNA LECCIÓN NUEVA:
     1) Agregá una entrada al array (con module o ids).
     2) Subí el archivo y aumentá ?v= en index.html + VERSION en sw.js.
   · LICENCIA: los textos clásicos (大学 论语 中庸 孟子 三字经
     孝经 道德经 心经 金刚经) son obras antiguas de dominio público.
   ============================================================ */
window.LESSONS_DATA = {
    "version": 1,
    "lessons": [
        {
            "id": "daxue",
            "title": "Gran Estudio · 大学",
            "module": "Clasicos-Daxue",
            "text_simp": "大学之道，在明明德。\n苟日新，日日新，又日新。\n知止而后有定。\n德者本也，财者末也。\n物有本末，事有终始。\n欲修其身者，先正其心。\n君子必慎其独也。\n君子先慎乎德。\n一家仁，一国兴仁。\n上老老而民兴孝。\n与国人交，止于信。\n财聚则民散，财散则民聚。",
            "text_trad": "大學之道，在明明德。\n苟日新，日日新，又日新。\n知止而後有定。\n德者本也，財者末也。\n物有本末，事有終始。\n欲修其身者，先正其心。\n君子必慎其獨也。\n君子先慎乎德。\n一家仁，一國興仁。\n上老老而民興孝。\n與國人交，止於信。\n財聚則民散，財散則民聚。"
        },
        {
            "id": "lunyu",
            "title": "Analectas · 论语",
            "module": "Clasicos-Lunyu",
            "text_simp": "学而时习之，不亦说乎？\n有朋自远方来，不亦乐乎？\n己所不欲，勿施于人。\n三人行，必有我师焉。\n温故而知新，可以为师矣。\n学而不思则罔，思而不学则殆。\n逝者如斯夫，不舍昼夜。\n岁寒，然后知松柏之后凋也。\n敏而好学，不耻下问。\n知之者不如好之者，好之者不如乐之者。\n君子和而不同，小人同而不和。\n见贤思齐焉，见不贤而内自省也。",
            "text_trad": "學而時習之，不亦說乎？\n有朋自遠方來，不亦樂乎？\n己所不欲，勿施於人。\n三人行，必有我師焉。\n溫故而知新，可以為師矣。\n學而不思則罔，思而不學則殆。\n逝者如斯夫，不捨晝夜。\n歲寒，然後知松柏之後凋也。\n敏而好學，不恥下問。\n知之者不如好之者，好之者不如樂之者。\n君子和而不同，小人同而不和。\n見賢思齊焉，見不賢而內自省也。"
        },
        {
            "id": "zhongyong",
            "title": "Doctrina del Medio · 中庸",
            "module": "Clasicos-Zhongyong",
            "text_simp": "中也者，天下之大本也。\n和也者，天下之达道也。\n凡事预则立，不预则废。\n博学之，审问之，慎思之，明辨之，笃行之。\n天命之谓性，率性之谓道，修道之谓教。\n好学近乎知，力行近乎仁，知耻近乎勇。\n君子中庸，小人反中庸。\n诚者，天之道也；诚之者，人之道也。\n至诚无息。\n行远必自迩，登高必自卑。\n万物并育而不相害。\n君子素其位而行。",
            "text_trad": "中也者，天下之大本也。\n和也者，天下之達道也。\n凡事預則立，不預則廢。\n博學之，審問之，慎思之，明辨之，篤行之。\n天命之謂性，率性之謂道，修道之謂教。\n好學近乎知，力行近乎仁，知恥近乎勇。\n君子中庸，小人反中庸。\n誠者，天之道也；誠之者，人之道也。\n至誠無息。\n行遠必自邇，登高必自卑。\n萬物並育而不相害。\n君子素其位而行。"
        },
        {
            "id": "mengzi",
            "title": "Mencio · 孟子",
            "module": "Clasicos-Mengzi",
            "text_simp": "民为贵，社稷次之，君为轻。\n生于忧患，死于安乐。\n老吾老，以及人之老。\n得道者多助，失道者寡助。\n穷则独善其身，达则兼善天下。\n富贵不能淫，贫贱不能移，威武不能屈。\n天时不如地利，地利不如人和。\n爱人者，人恒爱之；敬人者，人恒敬之。\n尽信书，则不如无书。\n恻隐之心，仁之端也。\n不以规矩，不能成方圆。\n天将降大任于是人也，必先苦其心志。",
            "text_trad": "民為貴，社稷次之，君為輕。\n生於憂患，死於安樂。\n老吾老，以及人之老。\n得道者多助，失道者寡助。\n窮則獨善其身，達則兼善天下。\n富貴不能淫，貧賤不能移，威武不能屈。\n天時不如地利，地利不如人和。\n愛人者，人恆愛之；敬人者，人恆敬之。\n盡信書，則不如無書。\n惻隱之心，仁之端也。\n不以規矩，不能成方圓。\n天將降大任於是人也，必先苦其心志。"
        },
        {
            "id": "sanzijing",
            "title": "Tres Caracteres · 三字经",
            "module": "Clasicos-Sanzijing",
            "text_simp": "人之初，性本善。\n性相近，习相远。\n玉不琢，不成器。\n勤有功，戏无益。\n养不教，父之过。\n教不严，师之惰。\n子不学，非所宜。\n幼不学，老何为。\n香九龄，能温席。\n融四岁，能让梨。\n三才者，天地人。\n曰仁义，礼智信。",
            "text_trad": "人之初，性本善。\n性相近，習相遠。\n玉不琢，不成器。\n勤有功，戲無益。\n養不教，父之過。\n教不嚴，師之惰。\n子不學，非所宜。\n幼不學，老何為。\n香九齡，能溫席。\n融四歲，能讓梨。\n三才者，天地人。\n曰仁義，禮智信。"
        },
        {
            "id": "xiaojing",
            "title": "Piedad Filial · 孝经",
            "module": "Clasicos-Xiaojing",
            "text_simp": "百善孝为先。\n身体发肤，受之父母。\n爱亲者，不敢恶于人。\n孝，德之本也。\n先王有至德要道，以顺天下。\n教民亲爱，莫善于孝。\n夫孝，天之经也，地之义也。\n谨身节用，以养父母。\n罪莫大于不孝。\n敬亲者，不敢慢于人。\n安上治民，莫善于礼。\n移风易俗，莫善于乐。",
            "text_trad": "百善孝為先。\n身體髮膚，受之父母。\n愛親者，不敢惡於人。\n孝，德之本也。\n先王有至德要道，以順天下。\n教民親愛，莫善於孝。\n夫孝，天之經也，地之義也。\n謹身節用，以養父母。\n罪莫大於不孝。\n敬親者，不敢慢於人。\n安上治民，莫善於禮。\n移風易俗，莫善於樂。"
        },
        {
            "id": "daodejing",
            "title": "Tao Te King · 道德经",
            "module": "Clasicos-Daodejing",
            "text_simp": "道可道，非常道。\n上善若水。\n千里之行，始于足下。\n知人者智，自知者明。\n人法地，地法天，天法道，道法自然。\n知足不辱，知止不殆。\n大器晚成。\n大音希声，大象无形。\n祸兮福所倚，福兮祸所伏。\n治大国若烹小鲜。\n合抱之木，生于毫末。\n为学日益，为道日损。",
            "text_trad": "道可道，非常道。\n上善若水。\n千里之行，始於足下。\n知人者智，自知者明。\n人法地，地法天，天法道，道法自然。\n知足不辱，知止不殆。\n大器晚成。\n大音希聲，大象無形。\n禍兮福所倚，福兮禍所伏。\n治大國若烹小鮮。\n合抱之木，生於毫末。\n為學日益，為道日損。"
        },
        {
            "id": "xinjing",
            "title": "Sutra del Corazón · 心经",
            "module": "Clasicos-Xinjing",
            "text_simp": "色即是空，空即是色。\n心无挂碍。\n照见五蕴皆空。\n度一切苦厄。\n不生不灭，不垢不净，不增不减。\n是诸法空相。\n无眼耳鼻舌身意。\n无色声香味触法。\n远离颠倒梦想，究竟涅槃。\n无智亦无得。\n无苦集灭道。\n能除一切苦，真实不虚。",
            "text_trad": "色即是空，空即是色。\n心無掛礙。\n照見五蘊皆空。\n度一切苦厄。\n不生不滅，不垢不淨，不增不減。\n是諸法空相。\n無眼耳鼻舌身意。\n無色聲香味觸法。\n遠離顛倒夢想，究竟涅槃。\n無智亦無得。\n無苦集滅道。\n能除一切苦，真實不虛。"
        },
        {
            "id": "jingangjing",
            "title": "Sutra del Diamante · 金刚经",
            "module": "Clasicos-Jingangjing",
            "text_simp": "应无所住而生其心。\n凡所有相，皆是虚妄。\n如露亦如电，应作如是观。\n法尚应舍，何况非法。\n一切有为法，如梦幻泡影。\n过去心不可得。\n离一切诸相，则名诸佛。\n不取于相，如如不动。\n无有定法，如来可说。\n若见诸相非相，即见如来。\n佛说世界，即非世界，是名世界。\n无所从来，亦无所去，故名如来。",
            "text_trad": "應無所住而生其心。\n凡所有相，皆是虛妄。\n如露亦如電，應作如是觀。\n法尚應舍，何況非法。\n一切有為法，如夢幻泡影。\n過去心不可得。\n離一切諸相，則名諸佛。\n不取於相，如如不動。\n無有定法，如來可說。\n若見諸相非相，即見如來。\n佛說世界，即非世界，是名世界。\n無所從來，亦無所去，故名如來。"
        }
    ]
};
