/* ============================================================
   lessons.js — Textos para "📖 Leer lección" + "📚 Biblioteca"
   ------------------------------------------------------------
   v7.15 · Este archivo es SOLO DATOS (patrón dict-mini.js):
   app.js NO se regenera para agregar lecciones o secciones.

   · CADA ENTRADA de window.LESSONS_DATA.lessons es una lectura
     legible en el Lector de texto (pinyin interlineal, colores
     de tono, diccionario al toque y lectura en voz alta).

   · CAMPOS:
     id                  único (requerido)
     title               nombre completo (mensaje 📖 y fallback)
     label               (opcional) nombre corto en la Biblioteca
     group               (opcional) agrupa la entrada en la
                         Biblioteca (un óptgroup por grupo)
     module              TODO el módulo de oraciones es la lección
     ids                 oraciones puntuales → una SECCIÓN o
                         capítulo (gana sobre "module")
     text_simp/text_trad texto chino; el pinyin lo genera el Lector
     status              'planned' = sección PLANTADA sin texto:
                         figura en la Biblioteca como
                         "· próximamente" (deshabilitada) y el
                         botón 📖 la ignora
     hsk                 (opcional) nivel HSK de una lectura graduada

   · PRIORIDAD del botón 📖: si la oración actual está en los ids
     de una sección, carga la sección; si no, la lección entera
     del módulo. El texto completo siempre queda en la Biblioteca
     ("Texto completo").

   · CÓMO AGREGAR UNA LECTURA O SECCIÓN NUEVA:
     1) Agregá una entrada al array (con module o ids; las que
        todavía no tienen texto van con status: 'planned').
     2) Para "rellenar" una plantada: pegá text_simp/text_trad y
        BORRÁ el campo status.
     3) Subí el archivo y aumentá ?v= en index.html + VERSION en
        sw.js.

   · LICENCIA: los textos clásicos (大学 论语 中庸 孟子 三字经
     孝经 道德经 心经 金刚经) son obras antiguas de dominio público.
   ============================================================ */
window.LESSONS_DATA = {
    "version": 2,
    "lessons": [
        /* ── Gran Estudio · 大学 ─────────────────────────────── */
        {
            "id": "daxue",
            "title": "Gran Estudio · 大学",
            "label": "Texto completo",
            "group": "Gran Estudio · 大学",
            "module": "Clasicos-Daxue",
            "text_simp": "大学之道，在明明德。\n苟日新，日日新，又日新。\n知止而后有定。\n德者本也，财者末也。\n物有本末，事有终始。\n欲修其身者，先正其心。\n君子必慎其独也。\n君子先慎乎德。\n一家仁，一国兴仁。\n上老老而民兴孝。\n与国人交，止于信。\n财聚则民散，财散则民聚。",
            "text_trad": "大學之道，在明明德。\n苟日新，日日新，又日新。\n知止而後有定。\n德者本也，財者末也。\n物有本末，事有終始。\n欲修其身者，先正其心。\n君子必慎其獨也。\n君子先慎乎德。\n一家仁，一國興仁。\n上老老而民興孝。\n與國人交，止於信。\n財聚則民散，財散則民聚。"
        },

        /* ── Analectas · 论语 ────────────────────────────────── */
        {
            "id": "lunyu",
            "title": "Analectas · 论语",
            "label": "Texto completo",
            "group": "Analectas · 论语",
            "module": "Clasicos-Lunyu",
            "text_simp": "学而时习之，不亦说乎？\n有朋自远方来，不亦乐乎？\n己所不欲，勿施于人。\n三人行，必有我师焉。\n温故而知新，可以为师矣。\n学而不思则罔，思而不学则殆。\n逝者如斯夫，不舍昼夜。\n岁寒，然后知松柏之后凋也。\n敏而好学，不耻下问。\n知之者不如好之者，好之者不如乐之者。\n君子和而不同，小人同而不和。\n见贤思齐焉，见不贤而内自省也。",
            "text_trad": "學而時習之，不亦說乎？\n有朋自遠方來，不亦樂乎？\n己所不欲，勿施於人。\n三人行，必有我師焉。\n溫故而知新，可以為師矣。\n學而不思則罔，思而不學則殆。\n逝者如斯夫，不捨晝夜。\n歲寒，然後知松柏之後凋也。\n敏而好學，不恥下問。\n知之者不如好之者，好之者不如樂之者。\n君子和而不同，小人同而不和。\n見賢思齊焉，見不賢而內自省也。"
        },

        /* ── Doctrina del Medio · 中庸 ───────────────────────── */
        {
            "id": "zhongyong",
            "title": "Doctrina del Medio · 中庸",
            "label": "Texto completo",
            "group": "Doctrina del Medio · 中庸",
            "module": "Clasicos-Zhongyong",
            "text_simp": "中也者，天下之大本也。\n和也者，天下之达道也。\n凡事预则立，不预则废。\n博学之，审问之，慎思之，明辨之，笃行之。\n天命之谓性，率性之谓道，修道之谓教。\n好学近乎知，力行近乎仁，知耻近乎勇。\n君子中庸，小人反中庸。\n诚者，天之道也；诚之者，人之道也。\n至诚无息。\n行远必自迩，登高必自卑。\n万物并育而不相害。\n君子素其位而行。",
            "text_trad": "中也者，天下之大本也。\n和也者，天下之達道也。\n凡事預則立，不預則廢。\n博學之，審問之，慎思之，明辨之，篤行之。\n天命之謂性，率性之謂道，修道之謂教。\n好學近乎知，力行近乎仁，知恥近乎勇。\n君子中庸，小人反中庸。\n誠者，天之道也；誠之者，人之道也。\n至誠無息。\n行遠必自邇，登高必自卑。\n萬物並育而不相害。\n君子素其位而行。"
        },

        /* ── Mencio · 孟子 ───────────────────────────────────── */
        {
            "id": "mengzi",
            "title": "Mencio · 孟子",
            "label": "Texto completo",
            "group": "Mencio · 孟子",
            "module": "Clasicos-Mengzi",
            "text_simp": "民为贵，社稷次之，君为轻。\n生于忧患，死于安乐。\n老吾老，以及人之老。\n得道者多助，失道者寡助。\n穷则独善其身，达则兼善天下。\n富贵不能淫，贫贱不能移，威武不能屈。\n天时不如地利，地利不如人和。\n爱人者，人恒爱之；敬人者，人恒敬之。\n尽信书，则不如无书。\n恻隐之心，仁之端也。\n不以规矩，不能成方圆。\n天将降大任于是人也，必先苦其心志。",
            "text_trad": "民為貴，社稷次之，君為輕。\n生於憂患，死於安樂。\n老吾老，以及人之老。\n得道者多助，失道者寡助。\n窮則獨善其身，達則兼善天下。\n富貴不能淫，貧賤不能移，威武不能屈。\n天時不如地利，地利不如人和。\n愛人者，人恆愛之；敬人者，人恆敬之。\n盡信書，則不如無書。\n惻隱之心，仁之端也。\n不以規矩，不能成方圓。\n天將降大任於是人也，必先苦其心志。"
        },

        /* ── Tres Caracteres · 三字经 + SECCIONES (v7.15) ────── */
        {
            "id": "sanzijing",
            "title": "Tres Caracteres · 三字经",
            "label": "Texto completo",
            "group": "Tres Caracteres · 三字经",
            "module": "Clasicos-Sanzijing",
            "text_simp": "人之初，性本善。\n性相近，习相远。\n玉不琢，不成器。\n勤有功，戏无益。\n养不教，父之过。\n教不严，师之惰。\n子不学，非所宜。\n幼不学，老何为。\n香九龄，能温席。\n融四岁，能让梨。\n三才者，天地人。\n曰仁义，礼智信。",
            "text_trad": "人之初，性本善。\n性相近，習相遠。\n玉不琢，不成器。\n勤有功，戲無益。\n養不教，父之過。\n教不嚴，師之惰。\n子不學，非所宜。\n幼不學，老何為。\n香九齡，能溫席。\n融四歲，能讓梨。\n三才者，天地人。\n曰仁義，禮智信。"
        },
        {
            "id": "sanzijing-s1",
            "title": "Tres Caracteres · Sección 1 — Nacer buenos, aprender bien",
            "label": "1 · Nacer buenos, aprender bien",
            "group": "Tres Caracteres · 三字经",
            "ids": ["sanzijing_01", "sanzijing_02"],
            "text_simp": "人之初，性本善。\n性相近，习相远。",
            "text_trad": "人之初，性本善。\n性相近，習相遠。"
        },
        {
            "id": "sanzijing-s2",
            "title": "Tres Caracteres · Sección 2 — Tallar la naturaleza",
            "label": "2 · Tallar la naturaleza",
            "group": "Tres Caracteres · 三字经",
            "ids": ["sanzijing_03", "sanzijing_04"],
            "text_simp": "玉不琢，不成器。\n勤有功，戏无益。",
            "text_trad": "玉不琢，不成器。\n勤有功，戲無益。"
        },
        {
            "id": "sanzijing-s3",
            "title": "Tres Caracteres · Sección 3 — La responsabilidad de educar",
            "label": "3 · La responsabilidad de educar",
            "group": "Tres Caracteres · 三字经",
            "ids": ["sanzijing_05", "sanzijing_06", "sanzijing_07", "sanzijing_08"],
            "text_simp": "养不教，父之过。\n教不严，师之惰。\n子不学，非所宜。\n幼不学，老何为。",
            "text_trad": "養不教，父之過。\n教不嚴，師之惰。\n子不學，非所宜。\n幼不學，老何為。"
        },
        {
            "id": "sanzijing-s4",
            "title": "Tres Caracteres · Sección 4 — Ejemplos para chicos",
            "label": "4 · Ejemplos para chicos",
            "group": "Tres Caracteres · 三字经",
            "ids": ["sanzijing_09", "sanzijing_10"],
            "text_simp": "香九龄，能温席。\n融四岁，能让梨。",
            "text_trad": "香九齡，能溫席。\n融四歲，能讓梨。"
        },
        {
            "id": "sanzijing-s5",
            "title": "Tres Caracteres · Sección 5 — Los tres fundamentos",
            "label": "5 · Los tres fundamentos",
            "group": "Tres Caracteres · 三字经",
            "ids": ["sanzijing_11", "sanzijing_12"],
            "text_simp": "三才者，天地人。\n曰仁义，礼智信。",
            "text_trad": "三才者，天地人。\n曰仁義，禮智信。"
        },

        /* ── Piedad Filial · 孝经 ────────────────────────────── */
        {
            "id": "xiaojing",
            "title": "Piedad Filial · 孝经",
            "label": "Texto completo",
            "group": "Piedad Filial · 孝经",
            "module": "Clasicos-Xiaojing",
            "text_simp": "百善孝为先。\n身体发肤，受之父母。\n爱亲者，不敢恶于人。\n孝，德之本也。\n先王有至德要道，以顺天下。\n教民亲爱，莫善于孝。\n夫孝，天之经也，地之义也。\n谨身节用，以养父母。\n罪莫大于不孝。\n敬亲者，不敢慢于人。\n安上治民，莫善于礼。\n移风易俗，莫善于乐。",
            "text_trad": "百善孝為先。\n身體髮膚，受之父母。\n愛親者，不敢惡於人。\n孝，德之本也。\n先王有至德要道，以順天下。\n教民親愛，莫善於孝。\n夫孝，天之經也，地之義也。\n謹身節用，以養父母。\n罪莫大於不孝。\n敬親者，不敢慢於人。\n安上治民，莫善於禮。\n移風易俗，莫善於樂。"
        },

        /* ── Tao Te King · 道德经 + CAPÍTULOS (v7.15) ──────────
           Cada verso del módulo = un capítulo real del DàoDéJīng.
           Cap. 1, 8, 64, 33, 25, 44, 41, 41, 58, 60, 64, 48.   */
        {
            "id": "daodejing",
            "title": "Tao Te King · 道德经",
            "label": "Texto completo (12 capítulos)",
            "group": "Tao Te King · 道德经",
            "module": "Clasicos-Daodejing",
            "text_simp": "道可道，非常道。\n上善若水。\n千里之行，始于足下。\n知人者智，自知者明。\n人法地，地法天，天法道，道法自然。\n知足不辱，知止不殆。\n大器晚成。\n大音希声，大象无形。\n祸兮福所倚，福兮祸所伏。\n治大国若烹小鲜。\n合抱之木，生于毫末。\n为学日益，为道日损。",
            "text_trad": "道可道，非常道。\n上善若水。\n千里之行，始於足下。\n知人者智，自知者明。\n人法地，地法天，天法道，道法自然。\n知足不辱，知止不殆。\n大器晚成。\n大音希聲，大象無形。\n禍兮福所倚，福兮禍所伏。\n治大國若烹小鮮。\n合抱之木，生於毫末。\n為學日益，為道日損。"
        },
        {
            "id": "daodejing-01",
            "title": "Tao Te King · Cap. 1 — El Tao que puede decirse",
            "label": "Cap. 1 · El Tao que puede decirse",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_01"],
            "text_simp": "道可道，非常道。",
            "text_trad": "道可道，非常道。"
        },
        {
            "id": "daodejing-02",
            "title": "Tao Te King · Cap. 8 — El bien supremo es como el agua",
            "label": "Cap. 8 · El bien supremo es como el agua",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_02"],
            "text_simp": "上善若水。",
            "text_trad": "上善若水。"
        },
        {
            "id": "daodejing-03",
            "title": "Tao Te King · Cap. 64 — Un viaje de mil leguas",
            "label": "Cap. 64 · Un viaje de mil leguas",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_03"],
            "text_simp": "千里之行，始于足下。",
            "text_trad": "千里之行，始於足下。"
        },
        {
            "id": "daodejing-04",
            "title": "Tao Te King · Cap. 33 — Conocerse a sí mismo",
            "label": "Cap. 33 · Conocerse a sí mismo",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_04"],
            "text_simp": "知人者智，自知者明。",
            "text_trad": "知人者智，自知者明。"
        },
        {
            "id": "daodejing-05",
            "title": "Tao Te King · Cap. 25 — Seguir la naturaleza",
            "label": "Cap. 25 · Seguir la naturaleza",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_05"],
            "text_simp": "人法地，地法天，天法道，道法自然。",
            "text_trad": "人法地，地法天，天法道，道法自然。"
        },
        {
            "id": "daodejing-06",
            "title": "Tao Te King · Cap. 44 — Saber cuándo basta",
            "label": "Cap. 44 · Saber cuándo basta",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_06"],
            "text_simp": "知足不辱，知止不殆。",
            "text_trad": "知足不辱，知止不殆。"
        },
        {
            "id": "daodejing-07",
            "title": "Tao Te King · Cap. 41 — El gran recipiente madura tarde",
            "label": "Cap. 41 · El gran recipiente madura tarde",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_07"],
            "text_simp": "大器晚成。",
            "text_trad": "大器晚成。"
        },
        {
            "id": "daodejing-08",
            "title": "Tao Te King · Cap. 41 — La gran música sin sonido",
            "label": "Cap. 41 · La gran música sin sonido",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_08"],
            "text_simp": "大音希声，大象无形。",
            "text_trad": "大音希聲，大象無形。"
        },
        {
            "id": "daodejing-09",
            "title": "Tao Te King · Cap. 58 — Fortuna y desgracia se enredan",
            "label": "Cap. 58 · Fortuna y desgracia se enredan",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_09"],
            "text_simp": "祸兮福所倚，福兮祸所伏。",
            "text_trad": "禍兮福所倚，福兮禍所伏。"
        },
        {
            "id": "daodejing-10",
            "title": "Tao Te King · Cap. 60 — Gobernar es como cocinar un pescado",
            "label": "Cap. 60 · Gobernar es como cocinar un pescado",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_10"],
            "text_simp": "治大国若烹小鲜。",
            "text_trad": "治大國若烹小鮮。"
        },
        {
            "id": "daodejing-11",
            "title": "Tao Te King · Cap. 64 — El árbol que abraza",
            "label": "Cap. 64 · El árbol que abraza",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_11"],
            "text_simp": "合抱之木，生于毫末。",
            "text_trad": "合抱之木，生於毫末。"
        },
        {
            "id": "daodejing-12",
            "title": "Tao Te King · Cap. 48 — Estudiar suma; el Tao resta",
            "label": "Cap. 48 · Estudiar suma; el Tao resta",
            "group": "Tao Te King · 道德经",
            "ids": ["daodejing_12"],
            "text_simp": "为学日益，为道日损。",
            "text_trad": "為學日益，為道日損。"
        },

        /* ── Sutra del Corazón · 心经 + SECCIONES (v7.15) ────── */
        {
            "id": "xinjing",
            "title": "Sutra del Corazón · 心经",
            "label": "Texto completo",
            "group": "Sutra del Corazón · 心经",
            "module": "Clasicos-Xinjing",
            "text_simp": "色即是空，空即是色。\n心无挂碍。\n照见五蕴皆空。\n度一切苦厄。\n不生不灭，不垢不净，不增不减。\n是诸法空相。\n无眼耳鼻舌身意。\n无色声香味触法。\n远离颠倒梦想，究竟涅槃。\n无智亦无得。\n无苦集灭道。\n能除一切苦，真实不虚。",
            "text_trad": "色即是空，空即是色。\n心無掛礙。\n照見五蘊皆空。\n度一切苦厄。\n不生不滅，不垢不淨，不增不減。\n是諸法空相。\n無眼耳鼻舌身意。\n無色聲香味觸法。\n遠離顛倒夢想，究竟涅槃。\n無智亦無得。\n無苦集滅道。\n能除一切苦，真實不虛。"
        },
        {
            "id": "xinjing-s1",
            "title": "Sutra del Corazón · Sección 1 — El vacío esencial",
            "label": "1 · El vacío esencial",
            "group": "Sutra del Corazón · 心经",
            "ids": ["xinjing_01", "xinjing_03"],
            "text_simp": "色即是空，空即是色。\n照见五蕴皆空。",
            "text_trad": "色即是空，空即是色。\n照見五蘊皆空。"
        },
        {
            "id": "xinjing-s2",
            "title": "Sutra del Corazón · Sección 2 — El vacío de todos los dharmas",
            "label": "2 · El vacío de todos los dharmas",
            "group": "Sutra del Corazón · 心经",
            "ids": ["xinjing_06", "xinjing_05"],
            "text_simp": "是诸法空相。\n不生不灭，不垢不净，不增不减。",
            "text_trad": "是諸法空相。\n不生不滅，不垢不淨，不增不減。"
        },
        {
            "id": "xinjing-s3",
            "title": "Sutra del Corazón · Sección 3 — Sin obstáculos",
            "label": "3 · Sin obstáculos",
            "group": "Sutra del Corazón · 心经",
            "ids": ["xinjing_02", "xinjing_10"],
            "text_simp": "心无挂碍。\n无智亦无得。",
            "text_trad": "心無掛礙。\n無智亦無得。"
        },
        {
            "id": "xinjing-s4",
            "title": "Sutra del Corazón · Sección 4 — Los seis sentidos vacíos",
            "label": "4 · Los seis sentidos vacíos",
            "group": "Sutra del Corazón · 心经",
            "ids": ["xinjing_07", "xinjing_08", "xinjing_11"],
            "text_simp": "无眼耳鼻舌身意。\n无色声香味触法。\n无苦集灭道。",
            "text_trad": "無眼耳鼻舌身意。\n無色聲香味觸法。\n無苦集滅道。"
        },
        {
            "id": "xinjing-s5",
            "title": "Sutra del Corazón · Sección 5 — Al otro lado del sufrimiento",
            "label": "5 · Al otro lado del sufrimiento",
            "group": "Sutra del Corazón · 心经",
            "ids": ["xinjing_04", "xinjing_09", "xinjing_12"],
            "text_simp": "度一切苦厄。\n远离颠倒梦想，究竟涅槃。\n能除一切苦，真实不虚。",
            "text_trad": "度一切苦厄。\n遠離顛倒夢想，究竟涅槃。\n能除一切苦，真實不虛。"
        },

        /* ── Sutra del Diamante · 金刚经 ─────────────────────── */
        {
            "id": "jingangjing",
            "title": "Sutra del Diamante · 金刚经",
            "label": "Texto completo",
            "group": "Sutra del Diamante · 金刚经",
            "module": "Clasicos-Jingangjing",
            "text_simp": "应无所住而生其心。\n凡所有相，皆是虚妄。\n如露亦如电，应作如是观。\n法尚应舍，何况非法。\n一切有为法，如梦幻泡影。\n过去心不可得。\n离一切诸相，则名诸佛。\n不取于相，如如不动。\n无有定法，如来可说。\n若见诸相非相，即见如来。\n佛说世界，即非世界，是名世界。\n无所从来，亦无所去，故名如来。",
            "text_trad": "應無所住而生其心。\n凡所有相，皆是虛妄。\n如露亦如電，應作如是觀。\n法尚應舍，何況非法。\n一切有為法，如夢幻泡影。\n過去心不可得。\n離一切諸相，則名諸佛。\n不取於相，如如不動。\n無有定法，如來可說。\n若見諸相非相，即見如來。\n佛說世界，即非世界，是名世界。\n無所從來，亦無所去，故名如來。"
        },

        /* ── v7.15: PRÁCTICA DIARIA — plantadas (status planned) ──
           Para publicar una: pegá text_simp/text_trad y BORRÁ status. */
        {
            "id": "diario-subte",
            "title": "Práctica diaria · Subte 地铁",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-shopping",
            "title": "Práctica diaria · Shopping 逛街",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-restaurante",
            "title": "Práctica diaria · Restaurante 餐厅",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-gimnasio",
            "title": "Práctica diaria · Gimnasio 健身房",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-colectivo",
            "title": "Práctica diaria · Colectivo 公交车",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-clase",
            "title": "Práctica diaria · Clase de idioma 语言课",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-cine",
            "title": "Práctica diaria · Cine 电影院",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "diario-barriochino",
            "title": "Práctica diaria · Barrio Chino 唐人街",
            "group": "Práctica diaria",
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },

        /* ── v7.15: LECTURAS GRADUADAS · HSK — plantadas ─────────
           Artículos cortos por nivel; mismo criterio para publicar. */
        {
            "id": "hsk1-art1",
            "title": "HSK 1 · Lectura 1",
            "group": "Lecturas graduadas · HSK",
            "hsk": 1,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk1-art2",
            "title": "HSK 1 · Lectura 2",
            "group": "Lecturas graduadas · HSK",
            "hsk": 1,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk2-art1",
            "title": "HSK 2 · Lectura 1",
            "group": "Lecturas graduadas · HSK",
            "hsk": 2,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk2-art2",
            "title": "HSK 2 · Lectura 2",
            "group": "Lecturas graduadas · HSK",
            "hsk": 2,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk3-art1",
            "title": "HSK 3 · Lectura 1",
            "group": "Lecturas graduadas · HSK",
            "hsk": 3,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk4-art1",
            "title": "HSK 4 · Lectura 1",
            "group": "Lecturas graduadas · HSK",
            "hsk": 4,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk5-art1",
            "title": "HSK 5 · Lectura 1",
            "group": "Lecturas graduadas · HSK",
            "hsk": 5,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        },
        {
            "id": "hsk6-art1",
            "title": "HSK 6 · Lectura 1",
            "group": "Lecturas graduadas · HSK",
            "hsk": 6,
            "status": "planned",
            "text_simp": "",
            "text_trad": ""
        }
    ]
};

/* ═══════════════════════════════════════════════════════════════════
   v9.0 — LECCIONES GRADUADAS (mini-dramas HSK 3.0) · Huayu Diario
   -------------------------------------------------------------------
   10 historias ORIGINALES (2×HSK1-4, 1×HSK5-6). Cada línea del texto
   usa SOLO vocabulario oficial HSK 3.0 ≤ nivel (validado por script
   con segmentación longest-match contra las listas GF0025-2021 que
   viajan en app.js) + nombres propios de la whitelist.
   Cada historia trae 10 ítems de práctica: oración con ___ y 3
   opciones (1 correcta del nivel + 2 distractores del mismo nivel),
   con pinyin/español/alternativas horneados desde las tuplas — el
   sentido del homógrafo es SIEMPRE el del nivel de la lección.
   Campos:
     id/hsk/emoji/titleEs/titleZh/blurb · lines[{zh,zhT,es}]
     quiz[{zh,zhT (con ___), es, opts[3]{z,p,e,a}, ans(índice correcta)}]
   El pinyin de las líneas lo genera el runtime con pinyin-pro.
   Regenerar: scripts/build_lessons_v9.py --write
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   v9.0 — LECCIONES GRADUADAS (mini-dramas HSK 3.0) · Huayu Diario
   -------------------------------------------------------------------
   10 historias ORIGINALES (2×HSK1-4, 1×HSK5-6). Cada línea del texto
   usa SOLO vocabulario oficial HSK 3.0 ≤ nivel (validado por script
   con segmentación longest-match contra las listas GF0025-2021 que
   viajan en app.js) + nombres propios de la whitelist.
   Cada historia trae 10 ítems de práctica: oración con ___ y 3
   opciones (1 correcta del nivel + 2 distractores del mismo nivel),
   con pinyin/español/alternativas horneados desde las tuplas — el
   sentido del homógrafo es SIEMPRE el del nivel de la lección.
   Campos:
     id/hsk/emoji/titleEs/titleZh/titleZhT/blurb · lines[{zh,zhT,es}]
     quiz[{zh,zhT (con ___), es, opts[3]{z,p,e,a}, ans(índice correcta)}]
   El pinyin de las líneas lo genera el runtime con pinyin-pro.
   Regenerar: scripts/build_lessons_v9.py --write
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   v9.0 — LECCIONES GRADUADAS (mini-dramas HSK 3.0) · Huayu Diario
   -------------------------------------------------------------------
   10 historias ORIGINALES (2×HSK1-4, 1×HSK5-6). Cada línea del texto
   usa SOLO vocabulario oficial HSK 3.0 ≤ nivel (validado por script
   con segmentación longest-match contra las listas GF0025-2021 que
   viajan en app.js) + nombres propios de la whitelist.
   Cada historia trae 10 ítems de práctica: oración con ___ y 3
   opciones (1 correcta del nivel + 2 distractores del mismo nivel),
   con pinyin/español/alternativas horneados desde las tuplas — el
   sentido del homógrafo es SIEMPRE el del nivel de la lección.
   Campos:
     id/hsk/emoji/titleEs/titleZh/titleZhT/blurb · lines[{zh,zhT,es}]
     quiz[{zh,zhT (con ___), es, opts[3]{z,p,e,a}, ans(índice correcta)}]
   El pinyin de las líneas lo genera el runtime con pinyin-pro.
   Regenerar: scripts/build_lessons_v9.py --write
   ═══════════════════════════════════════════════════════════════════ */
window.GRADED_LESSONS = [
 {
  "id": "h1-primer-dia",
  "hsk": 1,
  "emoji": "🎒",
  "titleEs": "El primer día de clase",
  "titleZh": "第一天",
  "titleZhT": "第一天",
  "blurb": "Xiaoming empieza a estudiar chino. Su maestro lo recibe con una pregunta.",
  "lines": [
   {
    "zh": "今天是小明学汉语的第一天。",
    "zhT": "今天是小明學漢語的第一天。",
    "es": "Hoy es el primer día de Xiaoming estudiando chino."
   },
   {
    "zh": "早上八点，他到学校。",
    "zhT": "早上八點，他到學校。",
    "es": "A las ocho de la mañana, él llega a la escuela."
   },
   {
    "zh": "学校很大，学生很多。",
    "zhT": "學校很大，學生很多。",
    "es": "La escuela es muy grande y tiene muchos estudiantes."
   },
   {
    "zh": "王老师是他的汉语老师。",
    "zhT": "王老師是他的漢語老師。",
    "es": "El maestro Wang es su maestro de chino."
   },
   {
    "zh": "王老师问他：「你叫什么名字？」",
    "zhT": "王老師問他：「你叫什麼名字？」",
    "es": "El maestro Wang le pregunta: «¿Cómo te llamas?»"
   },
   {
    "zh": "小明说：「我叫小明，我二十岁了。」",
    "zhT": "小明說：「我叫小明，我二十歲了。」",
    "es": "Xiaoming dice: «Me llamo Xiaoming, tengo veinte años.»"
   },
   {
    "zh": "王老师很高兴：「你的汉语很好！」",
    "zhT": "王老師很高興：「你的漢語很好！」",
    "es": "El maestro Wang está muy contento: «¡Tu chino es muy bueno!»"
   },
   {
    "zh": "小明说：「不，我的汉语不好。」",
    "zhT": "小明說：「不，我的漢語不好。」",
    "es": "Xiaoming dice: «No, mi chino no es bueno.»"
   },
   {
    "zh": "小明说：「谢谢老师！我要好好学习。」",
    "zhT": "小明說：「謝謝老師！我要好好學習。」",
    "es": "Xiaoming dice: «¡Gracias, maestro! Voy a estudiar mucho.»"
   },
   {
    "zh": "中午，他们一起吃饭。",
    "zhT": "中午，他們一起吃飯。",
    "es": "Al mediodía, comen juntos."
   },
   {
    "zh": "小明问：「老师，你忙吗？」",
    "zhT": "小明問：「老師，你忙嗎？」",
    "es": "Xiaoming pregunta: «Maestro, ¿está ocupado?»"
   },
   {
    "zh": "王老师说：「我不忙。我们喝茶，好吗？」",
    "zhT": "王老師說：「我不忙。我們喝茶，好嗎？」",
    "es": "El maestro Wang dice: «No estoy ocupado. ¿Tomamos té?»"
   },
   {
    "zh": "小明说：「好！谢谢老师！」",
    "zhT": "小明說：「好！謝謝老師！」",
    "es": "Xiaoming dice: «¡Bien! ¡Gracias, maestro!»"
   },
   {
    "zh": "王老师说：「不客气，你是我的朋友。」",
    "zhT": "王老師說：「不客氣，你是我的朋友。」",
    "es": "El maestro Wang dice: «De nada, eres mi amigo.»"
   },
   {
    "zh": "下午四点，小明回家。他今天很高兴。",
    "zhT": "下午四點，小明回家。他今天很高興。",
    "es": "A las cuatro de la tarde, Xiaoming vuelve a casa. Hoy está muy contento."
   }
  ],
  "quiz": [
   {
    "zh": "今天是小明___汉语的第一天。",
    "zhT": "今天是小明___漢語的第一天。",
    "es": "Hoy es el primer día de Xiaoming estudiando chino.",
    "opts": [
     {
      "z": "学",
      "t": "學",
      "p": "xué",
      "e": "Estudiar",
      "a": [
       "Aprender"
      ]
     },
     {
      "z": "写",
      "t": "寫",
      "p": "xiě",
      "e": "Escribir",
      "a": [
       "Trazar"
      ]
     },
     {
      "z": "教",
      "t": "教",
      "p": "jiāo",
      "e": "Enseñar",
      "a": [
       "Instruir"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "早上八点，他___学校。",
    "zhT": "早上八點，他___學校。",
    "es": "A las ocho de la mañana, él llega a la escuela.",
    "opts": [
     {
      "z": "到",
      "t": "到",
      "p": "dào",
      "e": "Llegar",
      "a": null
     },
     {
      "z": "找",
      "t": "找",
      "p": "zhǎo",
      "e": "Buscar",
      "a": [
       "Encontrar"
      ]
     },
     {
      "z": "回",
      "t": "回",
      "p": "huí",
      "e": "Volver",
      "a": [
       "Regresar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "学校很大，学生很___。",
    "zhT": "學校很大，學生很___。",
    "es": "La escuela es muy grande y tiene muchos estudiantes.",
    "opts": [
     {
      "z": "多",
      "t": "多",
      "p": "duō",
      "e": "Mucho",
      "a": null
     },
     {
      "z": "大",
      "t": "大",
      "p": "dà",
      "e": "Grande",
      "a": null
     },
     {
      "z": "少",
      "t": "少",
      "p": "shǎo",
      "e": "Poco",
      "a": [
       "Escaso"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "王老师问他：「你叫什么___？」",
    "zhT": "王老師問他：「你叫什麼___？」",
    "es": "El maestro Wang le pregunta: «¿Cómo te llamas?»",
    "opts": [
     {
      "z": "名字",
      "t": "名字",
      "p": "míngzi",
      "e": "Nombre",
      "a": [
       "Apodo"
      ]
     },
     {
      "z": "汉语",
      "t": "漢語",
      "p": "Hànyǔ",
      "e": "Chino",
      "a": [
       "Idioma chino"
      ]
     },
     {
      "z": "时间",
      "t": "時間",
      "p": "shíjiān",
      "e": "Tiempo",
      "a": [
       "Hora"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小明说：「我叫小明，我二十___了。」",
    "zhT": "小明說：「我叫小明，我二十___了。」",
    "es": "Xiaoming dice: «Me llamo Xiaoming, tengo veinte años.»",
    "opts": [
     {
      "z": "岁",
      "t": "歲",
      "p": "suì",
      "e": "Año",
      "a": [
       "Edad"
      ]
     },
     {
      "z": "年",
      "t": "年",
      "p": "nián",
      "e": "Año",
      "a": [
       "Edad"
      ]
     },
     {
      "z": "点",
      "t": "點",
      "p": "diǎn",
      "e": "Punto/hora",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小明说：「不，我的汉语不___。」",
    "zhT": "小明說：「不，我的漢語不___。」",
    "es": "Xiaoming dice: «No, mi chino no es bueno.»",
    "opts": [
     {
      "z": "好",
      "t": "好",
      "p": "hǎo",
      "e": "Bueno",
      "a": [
       "Excelente"
      ]
     },
     {
      "z": "对",
      "t": "對",
      "p": "duì",
      "e": "Correcto",
      "a": null
     },
     {
      "z": "大",
      "t": "大",
      "p": "dà",
      "e": "Grande",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "中午，他们一起___。",
    "zhT": "中午，他們一起___。",
    "es": "Al mediodía, comen juntos.",
    "opts": [
     {
      "z": "吃饭",
      "t": "吃飯",
      "p": "chīfàn",
      "e": "Comer",
      "a": null
     },
     {
      "z": "睡觉",
      "t": "睡覺",
      "p": "shuìjiào",
      "e": "Dormir",
      "a": null
     },
     {
      "z": "起床",
      "t": "起床",
      "p": "qǐchuáng",
      "e": "Levantarse",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "王老师说：「我不忙。我们___茶，好吗？」",
    "zhT": "王老師說：「我不忙。我們___茶，好嗎？」",
    "es": "El maestro Wang dice: «No estoy ocupado. ¿Tomamos té?»",
    "opts": [
     {
      "z": "喝",
      "t": "喝",
      "p": "hē",
      "e": "Beber",
      "a": [
       "Tomar"
      ]
     },
     {
      "z": "吃",
      "t": "吃",
      "p": "chī",
      "e": "Comer",
      "a": null
     },
     {
      "z": "看",
      "t": "看",
      "p": "kàn",
      "e": "Ver",
      "a": [
       "Mirar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "王老师说：「不客气，你是我的___。」",
    "zhT": "王老師說：「不客氣，你是我的___。」",
    "es": "El maestro Wang dice: «De nada, eres mi amigo.»",
    "opts": [
     {
      "z": "朋友",
      "t": "朋友",
      "p": "péngyou",
      "e": "Amigo",
      "a": [
       "Conocido"
      ]
     },
     {
      "z": "同学",
      "t": "同學",
      "p": "tóngxué",
      "e": "Compañero/a de clase",
      "a": null
     },
     {
      "z": "先生",
      "t": "先生",
      "p": "xiānsheng",
      "e": "Señor",
      "a": [
       "Caballero"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "下午四点，小明回家。他今天很___。",
    "zhT": "下午四點，小明回家。他今天很___。",
    "es": "A las cuatro de la tarde, Xiaoming vuelve a casa. Hoy está muy contento.",
    "opts": [
     {
      "z": "高兴",
      "t": "高興",
      "p": "gāoxìng",
      "e": "Feliz",
      "a": null
     },
     {
      "z": "累",
      "t": "累",
      "p": "lèi",
      "e": "Cansado",
      "a": [
       "Fatigado"
      ]
     },
     {
      "z": "忙",
      "t": "忙",
      "p": "máng",
      "e": "Ocupado",
      "a": [
       "Ajetreado"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h1-abuela",
  "hsk": 1,
  "emoji": "🏮",
  "titleEs": "Vamos a casa de la abuela",
  "titleZh": "去奶奶家",
  "titleZhT": "去奶奶家",
  "blurb": "Domingo de familia: fruta, una película china y un té con la abuela.",
  "lines": [
   {
    "zh": "星期日，小美去奶奶家。",
    "zhT": "星期日，小美去奶奶家。",
    "es": "El domingo, Xiaomei va a casa de la abuela."
   },
   {
    "zh": "爸爸和妈妈也去。",
    "zhT": "爸爸和媽媽也去。",
    "es": "Papá y mamá también van."
   },
   {
    "zh": "奶奶的家不太大，很干净。",
    "zhT": "奶奶的家不太大，很乾淨。",
    "es": "La casa de la abuela no es muy grande, está muy limpia."
   },
   {
    "zh": "奶奶很高兴：「你们都来了！」",
    "zhT": "奶奶很高興：「你們都來了！」",
    "es": "La abuela está feliz: «¡Ya llegaron los dos!»"
   },
   {
    "zh": "小美说：「奶奶，这是给您的水果。」",
    "zhT": "小美說：「奶奶，這是給您的水果。」",
    "es": "Xiaomei dice: «Abuela, esto es fruta para usted.»"
   },
   {
    "zh": "奶奶说：「太好了！我们一起吃。」",
    "zhT": "奶奶說：「太好了！我們一起吃。」",
    "es": "La abuela dice: «¡Qué bien! Comamos juntos.»"
   },
   {
    "zh": "下午，他们在家里看电视。",
    "zhT": "下午，他們在家裡看電視。",
    "es": "Por la tarde ven televisión en casa."
   },
   {
    "zh": "电视上有一个中国电影。",
    "zhT": "電視上有一箇中國電影。",
    "es": "En la tele hay una película china."
   },
   {
    "zh": "小美说：「这个电影很好看。」",
    "zhT": "小美說：「這個電影很好看。」",
    "es": "Xiaomei dice: «Esta película es muy linda.»"
   },
   {
    "zh": "奶奶问：「你爸爸在哪儿？」",
    "zhT": "奶奶問：「你爸爸在哪兒？」",
    "es": "La abuela pregunta: «¿Dónde está tu papá?»"
   },
   {
    "zh": "小美说：「他和妈妈在买东西。」",
    "zhT": "小美說：「他和媽媽在買東西。」",
    "es": "Xiaomei dice: «Está haciendo compras con mamá.»"
   },
   {
    "zh": "晚上，小美和爸爸妈妈回家。",
    "zhT": "晚上，小美和爸爸媽媽回家。",
    "es": "A la noche, Xiaomei y sus padres vuelven a casa."
   },
   {
    "zh": "奶奶说：「再见，早点回家。」",
    "zhT": "奶奶說：「再見，早點回家。」",
    "es": "La abuela dice: «Adiós, vuelvan temprano a casa.»"
   },
   {
    "zh": "小美说：「奶奶再见！我星期六再来。」",
    "zhT": "小美說：「奶奶再見！我星期六再來。」",
    "es": "Xiaomei dice: «¡Chau, abuela! El sábado vuelvo.»"
   }
  ],
  "quiz": [
   {
    "zh": "星期日，小美___奶奶家。",
    "zhT": "星期日，小美___奶奶家。",
    "es": "El domingo, Xiaomei va a casa de la abuela.",
    "opts": [
     {
      "z": "去",
      "t": "去",
      "p": "qù",
      "e": "Ir",
      "a": [
       "Marchar"
      ]
     },
     {
      "z": "来",
      "t": "來",
      "p": "lái",
      "e": "Venir",
      "a": [
       "Llegar"
      ]
     },
     {
      "z": "回",
      "t": "回",
      "p": "huí",
      "e": "Volver",
      "a": [
       "Regresar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "奶奶的家不太大，很___。",
    "zhT": "奶奶的家不太大，很___。",
    "es": "La casa de la abuela no es muy grande, está muy limpia.",
    "opts": [
     {
      "z": "干净",
      "t": "乾淨",
      "p": "gānjìng",
      "e": "Limpio",
      "a": null
     },
     {
      "z": "热",
      "t": "熱",
      "p": "rè",
      "e": "Caliente",
      "a": [
       "Caluroso"
      ]
     },
     {
      "z": "大",
      "t": "大",
      "p": "dà",
      "e": "Grande",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "奶奶很高兴：「你们___来了！」",
    "zhT": "奶奶很高興：「你們___來了！」",
    "es": "La abuela está feliz: «¡Ya llegaron los dos!»",
    "opts": [
     {
      "z": "都",
      "t": "都",
      "p": "dōu",
      "e": "Todos",
      "a": null
     },
     {
      "z": "也",
      "t": "也",
      "p": "yě",
      "e": "También",
      "a": [
       "Igualmente"
      ]
     },
     {
      "z": "不",
      "t": "不",
      "p": "bù",
      "e": "No",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美说：「奶奶，这是给您的___。」",
    "zhT": "小美說：「奶奶，這是給您的___。」",
    "es": "Xiaomei dice: «Abuela, esto es fruta para usted.»",
    "opts": [
     {
      "z": "水果",
      "t": "水果",
      "p": "shuǐguǒ",
      "e": "Fruta",
      "a": null
     },
     {
      "z": "米饭",
      "t": "米飯",
      "p": "mǐfàn",
      "e": "Arroz",
      "a": [
       "Plato de arroz"
      ]
     },
     {
      "z": "牛奶",
      "t": "牛奶",
      "p": "niúnǎi",
      "e": "Leche",
      "a": [
       "Leche de vaca"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "下午，他们在家里看___。",
    "zhT": "下午，他們在家裡看___。",
    "es": "Por la tarde ven televisión en casa.",
    "opts": [
     {
      "z": "电视",
      "t": "電視",
      "p": "diànshì",
      "e": "Televisión",
      "a": null
     },
     {
      "z": "电影",
      "t": "電影",
      "p": "diànyǐng",
      "e": "Película",
      "a": null
     },
     {
      "z": "书",
      "t": "書",
      "p": "shū",
      "e": "Libro",
      "a": [
       "Texto"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "电视上有一个中国___。",
    "zhT": "電視上有一箇中國___。",
    "es": "En la tele hay una película china.",
    "opts": [
     {
      "z": "电影",
      "t": "電影",
      "p": "diànyǐng",
      "e": "Película",
      "a": null
     },
     {
      "z": "电视",
      "t": "電視",
      "p": "diànshì",
      "e": "Televisión",
      "a": null
     },
     {
      "z": "汉字",
      "t": "漢字",
      "p": "Hànzì",
      "e": "Carácter chino",
      "a": [
       "Ideograma"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美说：「这个电影很___。」",
    "zhT": "小美說：「這個電影很___。」",
    "es": "Xiaomei dice: «Esta película es muy linda.»",
    "opts": [
     {
      "z": "好看",
      "t": "好看",
      "p": "hǎokàn",
      "e": "Bonito",
      "a": [
       "Atractivo"
      ]
     },
     {
      "z": "好吃",
      "t": "好吃",
      "p": "hǎochī",
      "e": "Sabroso",
      "a": [
       "Delicioso"
      ]
     },
     {
      "z": "贵",
      "t": "貴",
      "p": "guì",
      "e": "Caro",
      "a": [
       "Valioso"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "奶奶问：「你爸爸在___？」",
    "zhT": "奶奶問：「你爸爸在___？」",
    "es": "La abuela pregunta: «¿Dónde está tu papá?»",
    "opts": [
     {
      "z": "哪儿",
      "t": "哪兒",
      "p": "nǎr",
      "e": "Dónde",
      "a": [
       "Adónde"
      ]
     },
     {
      "z": "什么",
      "t": "什麼",
      "p": "shénme",
      "e": "Qué",
      "a": [
       "Cuál"
      ]
     },
     {
      "z": "谁",
      "t": "誰",
      "p": "shéi/shuí",
      "e": "Quién",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美说：「他和妈妈在___东西。」",
    "zhT": "小美說：「他和媽媽在___東西。」",
    "es": "Xiaomei dice: «Está haciendo compras con mamá.»",
    "opts": [
     {
      "z": "买",
      "t": "買",
      "p": "mǎi",
      "e": "Comprar",
      "a": [
       "Adquirir"
      ]
     },
     {
      "z": "做",
      "t": "做",
      "p": "zuò",
      "e": "Hacer",
      "a": null
     },
     {
      "z": "喝",
      "t": "喝",
      "p": "hē",
      "e": "Beber",
      "a": [
       "Tomar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美说：「奶奶再见！我星期六再___。」",
    "zhT": "小美說：「奶奶再見！我星期六再___。」",
    "es": "Xiaomei dice: «¡Chau, abuela! El sábado vuelvo.»",
    "opts": [
     {
      "z": "来",
      "t": "來",
      "p": "lái",
      "e": "Venir",
      "a": [
       "Llegar"
      ]
     },
     {
      "z": "去",
      "t": "去",
      "p": "qù",
      "e": "Ir",
      "a": [
       "Marchar"
      ]
     },
     {
      "z": "回",
      "t": "回",
      "p": "huí",
      "e": "Volver",
      "a": [
       "Regresar"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h2-cumpleanos",
  "hsk": 2,
  "emoji": "🎂",
  "titleEs": "El regalo de cumpleaños",
  "titleZh": "生日礼物",
  "titleZhT": "生日禮物",
  "blurb": "Xiaomei cumple años. Su amiga busca el regalo perfecto en el centro comercial.",
  "lines": [
   {
    "zh": "五月十二日是小美的生日。",
    "zhT": "五月十二日是小美的生日。",
    "es": "El 12 de mayo es el cumpleaños de Xiaomei."
   },
   {
    "zh": "她的朋友小丽想给她买一个礼物。",
    "zhT": "她的朋友小麗想給她買一個禮物。",
    "es": "Su amiga Xiaoli quiere comprarle un regalo."
   },
   {
    "zh": "她们一起去商场。",
    "zhT": "她們一起去商場。",
    "es": "Van juntas al centro comercial."
   },
   {
    "zh": "商场里的人真多！",
    "zhT": "商場裡的人真多！",
    "es": "¡Hay tanta gente en el centro comercial!"
   },
   {
    "zh": "小丽看见一件很好看的衣服。",
    "zhT": "小麗看見一件很好看的衣服。",
    "es": "Xiaoli ve una prenda muy bonita."
   },
   {
    "zh": "她问：「这件衣服多少钱？」",
    "zhT": "她問：「這件衣服多少錢？」",
    "es": "Pregunta: «¿Cuánto cuesta esta prenda?»"
   },
   {
    "zh": "卖衣服的人说：「一百块。」",
    "zhT": "賣衣服的人說：「一百塊。」",
    "es": "La vendedora dice: «Cien yuanes.»"
   },
   {
    "zh": "小丽觉得有点儿贵。",
    "zhT": "小麗覺得有點兒貴。",
    "es": "A Xiaoli le parece un poco caro."
   },
   {
    "zh": "可是小美很喜欢这件衣服。",
    "zhT": "可是小美很喜歡這件衣服。",
    "es": "Pero a Xiaomei le gusta mucho esa prenda."
   },
   {
    "zh": "小丽说：「好吧，我买了。」",
    "zhT": "小麗說：「好吧，我買了。」",
    "es": "Xiaoli dice: «Bueno, me la llevo.»"
   },
   {
    "zh": "生日那天，朋友们都来了。",
    "zhT": "生日那天，朋友們都來了。",
    "es": "El día del cumpleaños llegaron todos los amigos."
   },
   {
    "zh": "大家一起唱中文的生日歌。",
    "zhT": "大家一起唱中文的生日歌。",
    "es": "Todos cantan juntos la canción de cumpleaños en chino."
   },
   {
    "zh": "小美打开礼物，非常高兴。",
    "zhT": "小美打開禮物，非常高興。",
    "es": "Xiaomei abre el regalo, felicísima."
   },
   {
    "zh": "她说：「谢谢你们，我爱你们！」",
    "zhT": "她說：「謝謝你們，我愛你們！」",
    "es": "Dice: «¡Gracias a todos, los quiero!»"
   },
   {
    "zh": "这一天她过得非常快乐。",
    "zhT": "這一天她過得非常快樂。",
    "es": "Ese día lo pasó muy feliz."
   }
  ],
  "quiz": [
   {
    "zh": "五月十二日是小美的___。",
    "zhT": "五月十二日是小美的___。",
    "es": "El 12 de mayo es el cumpleaños de Xiaomei.",
    "opts": [
     {
      "z": "生日",
      "t": "生日",
      "p": "shēngrì",
      "e": "Cumpleaños",
      "a": null
     },
     {
      "z": "日期",
      "t": "日期",
      "p": "rìqī",
      "e": "Fecha",
      "a": [
       "Día"
      ]
     },
     {
      "z": "时间",
      "t": "時間",
      "p": "shíjiān",
      "e": "Tiempo",
      "a": [
       "Hora"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她的朋友小丽想给她买一个___。",
    "zhT": "她的朋友小麗想給她買一個___。",
    "es": "Su amiga Xiaoli quiere comprarle un regalo.",
    "opts": [
     {
      "z": "礼物",
      "t": "禮物",
      "p": "lǐwù",
      "e": "Regalo",
      "a": [
       "Presente"
      ]
     },
     {
      "z": "东西",
      "t": "東西",
      "p": "dōngxi",
      "e": "Cosa/cosas",
      "a": null
     },
     {
      "z": "衣服",
      "t": "衣服",
      "p": "yīfu",
      "e": "Ropa",
      "a": [
       "Vestimenta"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "___里的人真多！",
    "zhT": "___裡的人真多！",
    "es": "¡Hay tanta gente en el centro comercial!",
    "opts": [
     {
      "z": "商场",
      "t": "商場",
      "p": "shāngchǎng",
      "e": "Centro comercial",
      "a": [
       "Mercado"
      ]
     },
     {
      "z": "学校",
      "t": "學校",
      "p": "xuéxiào",
      "e": "Escuela",
      "a": [
       "Centro educativo"
      ]
     },
     {
      "z": "医院",
      "t": "醫院",
      "p": "yīyuàn",
      "e": "Hospital",
      "a": [
       "Clínica"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小丽___一件很好看的衣服。",
    "zhT": "小麗___一件很好看的衣服。",
    "es": "Xiaoli ve una prenda muy bonita.",
    "opts": [
     {
      "z": "看见",
      "t": "看見",
      "p": "kànjiàn",
      "e": "Ver",
      "a": [
       "Divisar"
      ]
     },
     {
      "z": "听见",
      "t": "聽見",
      "p": "tīngjiàn",
      "e": "Oír",
      "a": null
     },
     {
      "z": "找到",
      "t": "找到",
      "p": "zhǎodào",
      "e": "Encontrar",
      "a": [
       "Descubrir"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她问：「这___衣服多少钱？」",
    "zhT": "她問：「這___衣服多少錢？」",
    "es": "Pregunta: «¿Cuánto cuesta esta prenda?»",
    "opts": [
     {
      "z": "件",
      "t": "件",
      "p": "jiàn",
      "e": "Pieza",
      "a": [
       "Asunto"
      ]
     },
     {
      "z": "本",
      "t": "本",
      "p": "běn",
      "e": "Libro",
      "a": null
     },
     {
      "z": "个",
      "t": "個",
      "p": "gè",
      "e": "Uno",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小丽觉得有点儿___。",
    "zhT": "小麗覺得有點兒___。",
    "es": "A Xiaoli le parece un poco caro.",
    "opts": [
     {
      "z": "贵",
      "t": "貴",
      "p": "guì",
      "e": "Caro",
      "a": [
       "Valioso"
      ]
     },
     {
      "z": "便宜",
      "t": "便宜",
      "p": "piányi",
      "e": "Barato",
      "a": [
       "Económico"
      ]
     },
     {
      "z": "坏",
      "t": "壞",
      "p": "huài",
      "e": "Malo",
      "a": [
       "Dañado"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小丽说：「好吧，我___了。」",
    "zhT": "小麗說：「好吧，我___了。」",
    "es": "Xiaoli dice: «Bueno, me la llevo.»",
    "opts": [
     {
      "z": "买",
      "t": "買",
      "p": "mǎi",
      "e": "Comprar",
      "a": [
       "Adquirir"
      ]
     },
     {
      "z": "卖",
      "t": "賣",
      "p": "mài",
      "e": "Vender",
      "a": [
       "Comercializar"
      ]
     },
     {
      "z": "拿",
      "t": "拿",
      "p": "ná",
      "e": "Tomar",
      "a": [
       "Agarrar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "大家一起___中文的生日歌。",
    "zhT": "大家一起___中文的生日歌。",
    "es": "Todos cantan juntos la canción de cumpleaños en chino.",
    "opts": [
     {
      "z": "唱",
      "t": "唱",
      "p": "chàng",
      "e": "Cantar",
      "a": null
     },
     {
      "z": "写",
      "t": "寫",
      "p": "xiě",
      "e": "Escribir",
      "a": [
       "Trazar"
      ]
     },
     {
      "z": "说",
      "t": "說",
      "p": "shuō",
      "e": "Decir",
      "a": [
       "Hablar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美___礼物，非常高兴。",
    "zhT": "小美___禮物，非常高興。",
    "es": "Xiaomei abre el regalo, felicísima.",
    "opts": [
     {
      "z": "打开",
      "t": "打開",
      "p": "dǎkāi",
      "e": "Abrir",
      "a": null
     },
     {
      "z": "关上",
      "t": "關上",
      "p": "guānshang",
      "e": "Cerrar",
      "a": [
       "Apagar"
      ]
     },
     {
      "z": "看见",
      "t": "看見",
      "p": "kànjiàn",
      "e": "Ver",
      "a": [
       "Divisar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "这一天她过得非常___。",
    "zhT": "這一天她過得非常___。",
    "es": "Ese día lo pasó muy feliz.",
    "opts": [
     {
      "z": "快乐",
      "t": "快樂",
      "p": "kuàilè",
      "e": "Feliz",
      "a": [
       "Contento"
      ]
     },
     {
      "z": "累",
      "t": "累",
      "p": "lèi",
      "e": "Cansado",
      "a": [
       "Fatigado"
      ]
     },
     {
      "z": "生气",
      "t": "生氣",
      "p": "shēngqì",
      "e": "Enfadarse",
      "a": null
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h2-gripe",
  "hsk": 2,
  "emoji": "🤒",
  "titleEs": "Xiaoli está enferma",
  "titleZh": "小丽生病了",
  "titleZhT": "小麗生病了",
  "blurb": "Dolor de cabeza, un teléfono al maestro y dos días de reposo con mucha agua.",
  "lines": [
   {
    "zh": "星期一早上，小丽觉得不舒服。",
    "zhT": "星期一早上，小麗覺得不舒服。",
    "es": "El lunes a la mañana, Xiaoli se siente mal."
   },
   {
    "zh": "她头疼，也不想吃饭。",
    "zhT": "她頭疼，也不想吃飯。",
    "es": "Le duele la cabeza y no quiere comer."
   },
   {
    "zh": "她给王老师打电话：「老师，我今天不能上课。」",
    "zhT": "她給王老師打電話：「老師，我今天不能上課。」",
    "es": "Le habla por teléfono al maestro Wang: «Maestro, hoy no puedo ir a clase.»"
   },
   {
    "zh": "王老师说：「你应该去医院。」",
    "zhT": "王老師說：「你應該去醫院。」",
    "es": "El maestro Wang dice: «Deberías ir al hospital.»"
   },
   {
    "zh": "医院里的人很多，小丽等了一个小时。",
    "zhT": "醫院裡的人很多，小麗等了一個小時。",
    "es": "Había mucha gente en el hospital; Xiaoli esperó una hora."
   },
   {
    "zh": "医生问她：「你怎么了？」",
    "zhT": "醫生問她：「你怎麼了？」",
    "es": "El médico le pregunta: «¿Qué te pasa?»"
   },
   {
    "zh": "小丽说：「我生病了，头疼。」",
    "zhT": "小麗說：「我生病了，頭疼。」",
    "es": "Xiaoli dice: «Estoy enferma, me duele la cabeza.»"
   },
   {
    "zh": "医生看了看，说：「你生病了。要多喝水，多休息。」",
    "zhT": "醫生看了看，說：「你生病了。要多喝水，多休息。」",
    "es": "El médico la mira y dice: «Estás enferma. Tomá mucha agua y descansá mucho.»"
   },
   {
    "zh": "小丽问：「我明天可以上课吗？」",
    "zhT": "小麗問：「我明天可以上課嗎？」",
    "es": "Xiaoli pregunta: «¿Puedo ir a clase mañana?»"
   },
   {
    "zh": "医生说：「不行，你要在家休息两天。」",
    "zhT": "醫生說：「不行，你要在家休息兩天。」",
    "es": "El médico dice: «No, tienes que descansar dos días en casa.»"
   },
   {
    "zh": "小丽说：「好的，谢谢医生。」",
    "zhT": "小麗說：「好的，謝謝醫生。」",
    "es": "Xiaoli dice: «Está bien, gracias, doctor.»"
   },
   {
    "zh": "医生说：「不客气。身体最重要。」",
    "zhT": "醫生說：「不客氣。身體最重要。」",
    "es": "El médico dice: «De nada. La salud es lo más importante.»"
   },
   {
    "zh": "她回家睡觉，喝了很多水。",
    "zhT": "她回家睡覺，喝了很多水。",
    "es": "Vuelve a casa, duerme y toma mucha agua."
   },
   {
    "zh": "两天以后，她好了，又去上课了。",
    "zhT": "兩天以後，她好了，又去上課了。",
    "es": "Dos días después sanó y volvió a clase."
   }
  ],
  "quiz": [
   {
    "zh": "星期一早上，小丽觉得不___。",
    "zhT": "星期一早上，小麗覺得不___。",
    "es": "El lunes a la mañana, Xiaoli se siente mal.",
    "opts": [
     {
      "z": "舒服",
      "t": "舒服",
      "p": "shūfu",
      "e": "Cómodo",
      "a": null
     },
     {
      "z": "高兴",
      "t": "高興",
      "p": "gāoxìng",
      "e": "Feliz",
      "a": null
     },
     {
      "z": "干净",
      "t": "乾淨",
      "p": "gānjìng",
      "e": "Limpio",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "她头___，也不想吃饭。",
    "zhT": "她頭___，也不想吃飯。",
    "es": "Le duele la cabeza y no quiere comer.",
    "opts": [
     {
      "z": "疼",
      "t": "疼",
      "p": "téng",
      "e": "Doler",
      "a": null
     },
     {
      "z": "饿",
      "t": "餓",
      "p": "è",
      "e": "Hambre/hambriento",
      "a": null
     },
     {
      "z": "好",
      "t": "好",
      "p": "hǎo",
      "e": "Bueno",
      "a": [
       "Excelente"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她给王老师打电话：「老师，我今天不能___。」",
    "zhT": "她給王老師打電話：「老師，我今天不能___。」",
    "es": "Le habla por teléfono al maestro Wang: «Maestro, hoy no puedo ir a clase.»",
    "opts": [
     {
      "z": "上课",
      "t": "上課",
      "p": "shàngkè",
      "e": "Tener clase",
      "a": null
     },
     {
      "z": "下班",
      "t": "下班",
      "p": "xiàbān",
      "e": "Terminar trabajo",
      "a": [
       "Salir del trabajo"
      ]
     },
     {
      "z": "回家",
      "t": "回家",
      "p": "huí jiā",
      "e": "Volver a casa",
      "a": [
       "Regresar al hogar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "王老师说：「你___去医院。」",
    "zhT": "王老師說：「你___去醫院。」",
    "es": "El maestro Wang dice: «Deberías ir al hospital.»",
    "opts": [
     {
      "z": "应该",
      "t": "應該",
      "p": "yīnggāi",
      "e": "Deber",
      "a": null
     },
     {
      "z": "可能",
      "t": "可能",
      "p": "kěnéng",
      "e": "Posible",
      "a": [
       "Quizás"
      ]
     },
     {
      "z": "不用",
      "t": "不用",
      "p": "bùyòng",
      "e": "No es necesario",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "医院里的人很多，小丽___了一个小时。",
    "zhT": "醫院裡的人很多，小麗___了一個小時。",
    "es": "Había mucha gente en el hospital; Xiaoli esperó una hora.",
    "opts": [
     {
      "z": "等",
      "t": "等",
      "p": "děng",
      "e": "Esperar",
      "a": null
     },
     {
      "z": "找",
      "t": "找",
      "p": "zhǎo",
      "e": "Buscar",
      "a": [
       "Encontrar"
      ]
     },
     {
      "z": "给",
      "t": "給",
      "p": "gěi",
      "e": "Dar/con",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "___问她：「你怎么了？」",
    "zhT": "___問她：「你怎麼了？」",
    "es": "El médico le pregunta: «¿Qué te pasa?»",
    "opts": [
     {
      "z": "医生",
      "t": "醫生",
      "p": "yīshēng",
      "e": "Médico",
      "a": [
       "Profesional"
      ]
     },
     {
      "z": "老师",
      "t": "老師",
      "p": "lǎoshī",
      "e": "Maestro",
      "a": [
       "Profesora"
      ]
     },
     {
      "z": "同学",
      "t": "同學",
      "p": "tóngxué",
      "e": "Compañero/a de clase",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小丽说：「我___了，头疼。」",
    "zhT": "小麗說：「我___了，頭疼。」",
    "es": "Xiaoli dice: «Estoy enferma, me duele la cabeza.»",
    "opts": [
     {
      "z": "生病",
      "t": "生病",
      "p": "shēngbìng",
      "e": "Enfermarse",
      "a": null
     },
     {
      "z": "生气",
      "t": "生氣",
      "p": "shēngqì",
      "e": "Enfadarse",
      "a": null
     },
     {
      "z": "上班",
      "t": "上班",
      "p": "shàngbān",
      "e": "Ir al trabajo",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "医生看了看，说：「你生病了。要多喝水，多___。」",
    "zhT": "醫生看了看，說：「你生病了。要多喝水，多___。」",
    "es": "El médico la mira y dice: «Estás enferma. Tomá mucha agua y descansá mucho.»",
    "opts": [
     {
      "z": "休息",
      "t": "休息",
      "p": "xiūxi",
      "e": "Descansar",
      "a": [
       "Relajarse"
      ]
     },
     {
      "z": "工作",
      "t": "工作",
      "p": "gōngzuò",
      "e": "Trabajar/trabajo",
      "a": null
     },
     {
      "z": "考试",
      "t": "考試",
      "p": "kǎoshì",
      "e": "Examen",
      "a": [
       "Prueba"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小丽问：「我明天___上课吗？」",
    "zhT": "小麗問：「我明天___上課嗎？」",
    "es": "Xiaoli pregunta: «¿Puedo ir a clase mañana?»",
    "opts": [
     {
      "z": "可以",
      "t": "可以",
      "p": "kěyǐ",
      "e": "Poder",
      "a": [
       "Permitir"
      ]
     },
     {
      "z": "会",
      "t": "會",
      "p": "huì",
      "e": "Poder",
      "a": [
       "Conocer"
      ]
     },
     {
      "z": "想",
      "t": "想",
      "p": "xiǎng",
      "e": "Pensar",
      "a": [
       "Desear"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "两天___，她好了，又去上课了。",
    "zhT": "兩天___，她好了，又去上課了。",
    "es": "Dos días después sanó y volvió a clase.",
    "opts": [
     {
      "z": "以后",
      "t": "以後",
      "p": "yǐhòu",
      "e": "Después",
      "a": null
     },
     {
      "z": "以前",
      "t": "以前",
      "p": "yǐqián",
      "e": "Antes",
      "a": null
     },
     {
      "z": "现在",
      "t": "現在",
      "p": "xiànzài",
      "e": "Ahora",
      "a": [
       "Presente"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h3-celular",
  "hsk": 3,
  "emoji": "📱",
  "titleEs": "El celular roto",
  "titleZh": "坏手机",
  "titleZhT": "壞手機",
  "blurb": "Un teléfono prestado, una caída y una disculpa que salva la amistad.",
  "lines": [
   {
    "zh": "小李和小张住在一个房间里。",
    "zhT": "小李和小張住在一個房間裡。",
    "es": "Xiaoli y Xiaozhang viven en un mismo cuarto."
   },
   {
    "zh": "上个星期，小李的手机坏了。",
    "zhT": "上個星期，小李的手機壞了。",
    "es": "La semana pasada el celular de Xiaoli se rompió."
   },
   {
    "zh": "他向小张借手机用一下。",
    "zhT": "他向小張藉手機用一下。",
    "es": "Le pide el celular prestado a Xiaozhang un rato."
   },
   {
    "zh": "小张说：「行，你拿去吧。」",
    "zhT": "小張說：「行，你拿去吧。」",
    "es": "Xiaozhang dice: «Va, tómalo.»"
   },
   {
    "zh": "打电话的时候，手机突然掉到地上了。",
    "zhT": "打電話的時候，手機突然掉到地上了。",
    "es": "Mientras hablaba, de pronto el celular se cayó al piso."
   },
   {
    "zh": "小李很紧张：「对不起，手机坏了！」",
    "zhT": "小李很緊張：「對不起，手機壞了！」",
    "es": "Xiaoli, nervioso: «¡Perdón, se rompió el celular!»"
   },
   {
    "zh": "小张很生气，觉得小李太不小心了。",
    "zhT": "小張很生氣，覺得小李太不小心了。",
    "es": "Xiaozhang se enojó; piensa que Xiaoli fue muy descuidado."
   },
   {
    "zh": "那天晚上，他们没说话。",
    "zhT": "那天晚上，他們沒說話。",
    "es": "Esa noche no hablaron."
   },
   {
    "zh": "第二天，小李用自己的钱买了一个新手机。",
    "zhT": "第二天，小李用自己的錢買了一個新手機。",
    "es": "Al día siguiente, Xiaoli compró un celular nuevo con su propio dinero."
   },
   {
    "zh": "他对小张说：「这是我的错，请你别生气。」",
    "zhT": "他對小張說：「這是我的錯，請你別生氣。」",
    "es": "Le dice a Xiaozhang: «La culpa es mía, por favor no te enojes.»"
   },
   {
    "zh": "他还请小张喝茶。",
    "zhT": "他還請小張喝茶。",
    "es": "También invita té a Xiaozhang."
   },
   {
    "zh": "小张笑了：「没关系，我们还是朋友。」",
    "zhT": "小張笑了：「沒關係，我們還是朋友。」",
    "es": "Xiaozhang sonrió: «No pasa nada, seguimos siendo amigos.»"
   },
   {
    "zh": "小李说：「谢谢你，我以后一定小心。」",
    "zhT": "小李說：「謝謝你，我以後一定小心。」",
    "es": "Xiaoli dice: «Gracias; de ahora en más tengo cuidado.»"
   },
   {
    "zh": "从那以后，两个人的关系更好了。",
    "zhT": "從那以後，兩個人的關係更好了。",
    "es": "Desde entonces la relación entre los dos es aún mejor."
   }
  ],
  "quiz": [
   {
    "zh": "上个星期，小李的手机___了。",
    "zhT": "上個星期，小李的手機___了。",
    "es": "La semana pasada el celular de Xiaoli se rompió.",
    "opts": [
     {
      "z": "坏",
      "t": "壞",
      "p": "huài",
      "e": "Malo",
      "a": [
       "Dañado"
      ]
     },
     {
      "z": "贵",
      "t": "貴",
      "p": "guì",
      "e": "Caro",
      "a": [
       "Valioso"
      ]
     },
     {
      "z": "旧",
      "t": "舊",
      "p": "jiù",
      "e": "Viejo",
      "a": [
       "Antiguo",
       "Obsoleto"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "他向小张___手机用一下。",
    "zhT": "他向小張___手機用一下。",
    "es": "Le pide el celular prestado a Xiaozhang un rato.",
    "opts": [
     {
      "z": "借",
      "t": "借",
      "p": "jiè",
      "e": "Prestar",
      "a": [
       "Pedir"
      ]
     },
     {
      "z": "还",
      "t": "還",
      "p": "hái",
      "e": "Todavía",
      "a": [
       "Aún"
      ]
     },
     {
      "z": "买",
      "t": "買",
      "p": "mǎi",
      "e": "Comprar",
      "a": [
       "Adquirir"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "打电话的时候，手机___掉到地上了。",
    "zhT": "打電話的時候，手機___掉到地上了。",
    "es": "Mientras hablaba, de pronto el celular se cayó al piso.",
    "opts": [
     {
      "z": "突然",
      "t": "突然",
      "p": "tūrán",
      "e": "Repentino",
      "a": [
       "Inesperado"
      ]
     },
     {
      "z": "终于",
      "t": "終於",
      "p": "zhōngyú",
      "e": "Finalmente",
      "a": [
       "Al fin"
      ]
     },
     {
      "z": "一直",
      "t": "一直",
      "p": "yīzhí",
      "e": "Siempre",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小李很___：「对不起，手机坏了！」",
    "zhT": "小李很___：「對不起，手機壞了！」",
    "es": "Xiaoli, nervioso: «¡Perdón, se rompió el celular!»",
    "opts": [
     {
      "z": "紧张",
      "t": "緊張",
      "p": "jǐnzhāng",
      "e": "Nervioso",
      "a": [
       "Tenso",
       "Estresado"
      ]
     },
     {
      "z": "高兴",
      "t": "高興",
      "p": "gāoxìng",
      "e": "Feliz",
      "a": null
     },
     {
      "z": "舒服",
      "t": "舒服",
      "p": "shūfu",
      "e": "Cómodo",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "那天晚上，他们没___。",
    "zhT": "那天晚上，他們沒___。",
    "es": "Esa noche no hablaron.",
    "opts": [
     {
      "z": "说话",
      "t": "說話",
      "p": "shuōhuà",
      "e": "Hablar",
      "a": [
       "Conversar"
      ]
     },
     {
      "z": "睡觉",
      "t": "睡覺",
      "p": "shuìjiào",
      "e": "Dormir",
      "a": null
     },
     {
      "z": "上学",
      "t": "上學",
      "p": "shàngxué",
      "e": "Ir a la escuela",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "第二天，小李用自己的钱买了一个___手机。",
    "zhT": "第二天，小李用自己的錢買了一個___手機。",
    "es": "Al día siguiente, Xiaoli compró un celular nuevo con su propio dinero.",
    "opts": [
     {
      "z": "新",
      "t": "新",
      "p": "xīn",
      "e": "Nuevo",
      "a": [
       "Reciente"
      ]
     },
     {
      "z": "旧",
      "t": "舊",
      "p": "jiù",
      "e": "Viejo",
      "a": [
       "Antiguo",
       "Obsoleto"
      ]
     },
     {
      "z": "贵",
      "t": "貴",
      "p": "guì",
      "e": "Caro",
      "a": [
       "Valioso"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "他对小张说：「这是我的___，请你别生气。」",
    "zhT": "他對小張說：「這是我的___，請你別生氣。」",
    "es": "Le dice a Xiaozhang: «La culpa es mía, por favor no te enojes.»",
    "opts": [
     {
      "z": "错",
      "t": "錯",
      "p": "cuò",
      "e": "Equivocado",
      "a": null
     },
     {
      "z": "对",
      "t": "對",
      "p": "duì",
      "e": "Correcto",
      "a": null
     },
     {
      "z": "事",
      "t": "事",
      "p": "shì",
      "e": "Cosa",
      "a": [
       "Asunto"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小张___了：「没关系，我们还是朋友。」",
    "zhT": "小張___了：「沒關係，我們還是朋友。」",
    "es": "Xiaozhang sonrió: «No pasa nada, seguimos siendo amigos.»",
    "opts": [
     {
      "z": "笑",
      "t": "笑",
      "p": "xiào",
      "e": "Reír",
      "a": [
       "Sonreír"
      ]
     },
     {
      "z": "跑",
      "t": "跑",
      "p": "pǎo",
      "e": "Correr",
      "a": [
       "Huir"
      ]
     },
     {
      "z": "玩儿",
      "t": "玩兒",
      "p": "wánr",
      "e": "Jugar",
      "a": [
       "Divertirse"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小李说：「谢谢你，我以后一定___。」",
    "zhT": "小李說：「謝謝你，我以後一定___。」",
    "es": "Xiaoli dice: «Gracias; de ahora en más tengo cuidado.»",
    "opts": [
     {
      "z": "小心",
      "t": "小心",
      "p": "xiǎoxīn",
      "e": "Cuidado",
      "a": null
     },
     {
      "z": "高兴",
      "t": "高興",
      "p": "gāoxìng",
      "e": "Feliz",
      "a": null
     },
     {
      "z": "难过",
      "t": "難過",
      "p": "nánguò",
      "e": "Triste",
      "a": [
       "Apenado"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "从那以后，两个人的___更好了。",
    "zhT": "從那以後，兩個人的___更好了。",
    "es": "Desde entonces la relación entre los dos es aún mejor.",
    "opts": [
     {
      "z": "关系",
      "t": "關係",
      "p": "guānxì",
      "e": "Relación",
      "a": [
       "Asunto"
      ]
     },
     {
      "z": "样子",
      "t": "樣子",
      "p": "yàngzi",
      "e": "Aspecto",
      "a": null
     },
     {
      "z": "地方",
      "t": "地方",
      "p": "dìfang",
      "e": "Lugar",
      "a": null
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h3-montana",
  "hsk": 3,
  "emoji": "⛰️",
  "titleEs": "Plan para el fin de semana",
  "titleZh": "周末计划",
  "titleZhT": "週末計劃",
  "blurb": "Subir la montaña, ir a nadar o quedarse: un clásico debate entre amigos.",
  "lines": [
   {
    "zh": "星期五晚上，小李和同学们讨论周末的计划。",
    "zhT": "星期五晚上，小李和同學們討論週末的計劃。",
    "es": "El viernes a la noche, Xiaoli y sus compañeros discuten los planes del fin de semana."
   },
   {
    "zh": "小李说：「天气这么好，我们去爬山吧。」",
    "zhT": "小李說：「天氣這麼好，我們去爬山吧。」",
    "es": "Xiaoli dice: «Con un tiempo tan lindo, subamos la montaña.»"
   },
   {
    "zh": "小张说：「我不想去，我觉得太累了。」",
    "zhT": "小張說：「我不想去，我覺得太累了。」",
    "es": "Xiaozhang dice: «Yo no quiero ir, me parece muy cansado.»"
   },
   {
    "zh": "小李说：「可是这是一个好机会！」",
    "zhT": "小李說：「可是這是一個好機會！」",
    "es": "Xiaoli dice: «¡Pero es una buena oportunidad!»"
   },
   {
    "zh": "小王说：「我们可以去游泳，也可以打篮球。」",
    "zhT": "小王說：「我們可以去游泳，也可以打籃球。」",
    "es": "Xiaowang dice: «Podemos ir a nadar o jugar al básquet.»"
   },
   {
    "zh": "他们讨论了很久，没有决定。",
    "zhT": "他們討論了很久，沒有決定。",
    "es": "Discutieron un buen rato sin decidir."
   },
   {
    "zh": "老师说：「天气可能会变，你们明天再决定吧。」",
    "zhT": "老師說：「天氣可能會變，你們明天再決定吧。」",
    "es": "El maestro dice: «El tiempo puede cambiar; decidan mañana.»"
   },
   {
    "zh": "星期六早上，天气真的很好。",
    "zhT": "星期六早上，天氣真的很好。",
    "es": "El sábado a la mañana, el tiempo estaba realmente lindo."
   },
   {
    "zh": "大家都很高兴地出发了。",
    "zhT": "大家都很高興地出發了。",
    "es": "Todos salieron muy contentos."
   },
   {
    "zh": "他们一边走，一边唱歌。",
    "zhT": "他們一邊走，一邊唱歌。",
    "es": "Cantaban mientras caminaban."
   },
   {
    "zh": "到了山上，真美！大家都笑了。",
    "zhT": "到了山上，真美！大家都笑了。",
    "es": "Arriba de la montaña: ¡qué hermoso! Todos se rieron."
   },
   {
    "zh": "小张说：「你说得对，这个机会真好！」",
    "zhT": "小張說：「你說得對，這個機會真好！」",
    "es": "Xiaozhang dice: «Tenés razón, ¡esta oportunidad es genial!»"
   },
   {
    "zh": "他们用手机拍了很多照片。",
    "zhT": "他們用手機拍了很多照片。",
    "es": "Con el celular sacaron muchas fotos."
   },
   {
    "zh": "下山的时候，他们决定下个月再来。",
    "zhT": "下山的時候，他們決定下個月再來。",
    "es": "Al bajar, decidieron volver el mes próximo."
   },
   {
    "zh": "小李说：「下次我一定参加！」",
    "zhT": "小李說：「下次我一定參加！」",
    "es": "Xiaoli dice: «¡La próxima participo seguro!»"
   }
  ],
  "quiz": [
   {
    "zh": "星期五晚上，小李和同学们___周末的计划。",
    "zhT": "星期五晚上，小李和同學們___週末的計劃。",
    "es": "El viernes a la noche, Xiaoli y sus compañeros discuten los planes del fin de semana.",
    "opts": [
     {
      "z": "讨论",
      "t": "討論",
      "p": "tǎolùn",
      "e": "Discutir",
      "a": null
     },
     {
      "z": "解决",
      "t": "解決",
      "p": "jiějué",
      "e": "Resolver",
      "a": [
       "Solucionar",
       "Aclarar"
      ]
     },
     {
      "z": "准备",
      "t": "準備",
      "p": "zhǔnbèi",
      "e": "Preparar",
      "a": [
       "Planear"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "星期五晚上，小李和同学们讨论周末的___。",
    "zhT": "星期五晚上，小李和同學們討論週末的___。",
    "es": "El viernes a la noche, Xiaoli y sus compañeros discuten los planes del fin de semana.",
    "opts": [
     {
      "z": "计划",
      "t": "計劃",
      "p": "jìhuà",
      "e": "Planificar",
      "a": [
       "Proyecto"
      ]
     },
     {
      "z": "机会",
      "t": "機會",
      "p": "jīhuì",
      "e": "Oportunidad",
      "a": [
       "Ocasión"
      ]
     },
     {
      "z": "地方",
      "t": "地方",
      "p": "dìfang",
      "e": "Lugar",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小张说：「我不想去，我觉得太___了。」",
    "zhT": "小張說：「我不想去，我覺得太___了。」",
    "es": "Xiaozhang dice: «Yo no quiero ir, me parece muy cansado.»",
    "opts": [
     {
      "z": "累",
      "t": "累",
      "p": "lèi",
      "e": "Cansado",
      "a": [
       "Fatigado"
      ]
     },
     {
      "z": "忙",
      "t": "忙",
      "p": "máng",
      "e": "Ocupado",
      "a": [
       "Ajetreado"
      ]
     },
     {
      "z": "饱",
      "t": "飽",
      "p": "bǎo",
      "e": "Lleno",
      "a": [
       "Saciado"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小李说：「可是这是一个好___！」",
    "zhT": "小李說：「可是這是一個好___！」",
    "es": "Xiaoli dice: «¡Pero es una buena oportunidad!»",
    "opts": [
     {
      "z": "机会",
      "t": "機會",
      "p": "jīhuì",
      "e": "Oportunidad",
      "a": [
       "Ocasión"
      ]
     },
     {
      "z": "时间",
      "t": "時間",
      "p": "shíjiān",
      "e": "Tiempo",
      "a": [
       "Hora"
      ]
     },
     {
      "z": "问题",
      "t": "問題",
      "p": "wèntí",
      "e": "Problema",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小王说：「我们可以去___，也可以打篮球。」",
    "zhT": "小王說：「我們可以去___，也可以打籃球。」",
    "es": "Xiaowang dice: «Podemos ir a nadar o jugar al básquet.»",
    "opts": [
     {
      "z": "游泳",
      "t": "游泳",
      "p": "yóuyǒng",
      "e": "Nadar",
      "a": [
       "Natación"
      ]
     },
     {
      "z": "跑步",
      "t": "跑步",
      "p": "pǎobù",
      "e": "Correr",
      "a": [
       "Footing"
      ]
     },
     {
      "z": "爬山",
      "t": "爬山",
      "p": "pá shān",
      "e": "Escalar montañas",
      "a": [
       "Hacer senderismo"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "他们讨论了很久，没有___。",
    "zhT": "他們討論了很久，沒有___。",
    "es": "Discutieron un buen rato sin decidir.",
    "opts": [
     {
      "z": "决定",
      "t": "決定",
      "p": "juédìng",
      "e": "Decidir",
      "a": [
       "Determinación",
       "Decisión"
      ]
     },
     {
      "z": "开始",
      "t": "開始",
      "p": "kāishǐ",
      "e": "Comenzar",
      "a": [
       "Inicio",
       "Comienzo"
      ]
     },
     {
      "z": "影响",
      "t": "影響",
      "p": "yǐngxiǎng",
      "e": "Influir/influencia",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "大家都很高兴地___了。",
    "zhT": "大家都很高興地___了。",
    "es": "Todos salieron muy contentos.",
    "opts": [
     {
      "z": "出发",
      "t": "出發",
      "p": "chūfā",
      "e": "Partir",
      "a": [
       "Salir"
      ]
     },
     {
      "z": "回来",
      "t": "回來",
      "p": "huílái",
      "e": "Volver",
      "a": [
       "Regresar"
      ]
     },
     {
      "z": "回家",
      "t": "回家",
      "p": "huí jiā",
      "e": "Volver a casa",
      "a": [
       "Regresar al hogar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "他们___走，一边唱歌。",
    "zhT": "他們___走，一邊唱歌。",
    "es": "Cantaban mientras caminaban.",
    "opts": [
     {
      "z": "一边",
      "t": "一邊",
      "p": "yībiān",
      "e": "Lado",
      "a": [
       "Mientras"
      ]
     },
     {
      "z": "一起",
      "t": "一起",
      "p": "yīqǐ",
      "e": "Juntos",
      "a": [
       "Simultáneamente"
      ]
     },
     {
      "z": "一直",
      "t": "一直",
      "p": "yīzhí",
      "e": "Siempre",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "到了山上，真___！大家都笑了。",
    "zhT": "到了山上，真___！大家都笑了。",
    "es": "Arriba de la montaña: ¡qué hermoso! Todos se rieron.",
    "opts": [
     {
      "z": "美",
      "t": "美",
      "p": "měi",
      "e": "Hermoso",
      "a": [
       "Bello"
      ]
     },
     {
      "z": "贵",
      "t": "貴",
      "p": "guì",
      "e": "Caro",
      "a": [
       "Valioso"
      ]
     },
     {
      "z": "累",
      "t": "累",
      "p": "lèi",
      "e": "Cansado",
      "a": [
       "Fatigado"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小李说：「下次我一定___！」",
    "zhT": "小李說：「下次我一定___！」",
    "es": "Xiaoli dice: «¡La próxima participo seguro!»",
    "opts": [
     {
      "z": "参加",
      "t": "參加",
      "p": "cānjiā",
      "e": "Participar",
      "a": [
       "Asistir"
      ]
     },
     {
      "z": "离开",
      "t": "離開",
      "p": "líkāi",
      "e": "Irse",
      "a": [
       "Abandonar"
      ]
     },
     {
      "z": "回来",
      "t": "回來",
      "p": "huílái",
      "e": "Volver",
      "a": [
       "Regresar"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h4-piano",
  "hsk": 4,
  "emoji": "🎹",
  "titleEs": "El vecino que canta",
  "titleZh": "爱唱歌的邻居",
  "titleZhT": "愛唱歌的鄰居",
  "blurb": "Un departamento nuevo, una voz de ópera hasta las tantas y un final que nadie imaginaba.",
  "lines": [
   {
    "zh": "小陈搬进了新家。",
    "zhT": "小陳搬進了新家。",
    "es": "Xiaochen se mudó a un departamento nuevo."
   },
   {
    "zh": "这个小区很安静，他很喜欢。",
    "zhT": "這個小區很安靜，他很喜歡。",
    "es": "El barrio es muy tranquilo; le encanta."
   },
   {
    "zh": "可是每天晚上十点以后，旁边的房间有唱歌的声音。",
    "zhT": "可是每天晚上十點以後，旁邊的房間有唱歌的聲音。",
    "es": "Pero todas las noches después de las diez, se oye cantar en el departamento de al lado."
   },
   {
    "zh": "唱歌的声音让小陈睡不着。",
    "zhT": "唱歌的聲音讓小陳睡不著。",
    "es": "El canto no deja dormir a Xiaochen."
   },
   {
    "zh": "他想：「我应该去找他谈谈。」",
    "zhT": "他想：「我應該去找他談談。」",
    "es": "Piensa: «Debería ir a hablar con él.»"
   },
   {
    "zh": "第二天晚上，声音又开始了。",
    "zhT": "第二天晚上，聲音又開始了。",
    "es": "Al día siguiente por la noche, la voz empezó de nuevo."
   },
   {
    "zh": "小陈走过去，轻轻地拍了拍门。",
    "zhT": "小陳走過去，輕輕地拍了拍門。",
    "es": "Xiaochen va y toca la puerta suavemente."
   },
   {
    "zh": "开门的是一位老人，看起来很热情。",
    "zhT": "開門的是一位老人，看起來很熱情。",
    "es": "Abre la puerta un anciano, con cara muy amable."
   },
   {
    "zh": "老人说：「请进！」",
    "zhT": "老人說：「請進！」",
    "es": "El anciano dice: «¡Pasa!»"
   },
   {
    "zh": "小陈很小心地说了晚上唱歌的事。",
    "zhT": "小陳很小心地說了晚上唱歌的事。",
    "es": "Xiaochen, con tacto, le comenta lo del canto nocturno."
   },
   {
    "zh": "老人说：「真对不起，我不知道吵到你了。」",
    "zhT": "老人說：「真對不起，我不知道吵到你了。」",
    "es": "El anciano: «Mil perdones, no sabía que te molestaba.»"
   },
   {
    "zh": "他说：「我唱了四十年歌，习惯了晚上唱。」",
    "zhT": "他說：「我唱了四十年歌，習慣了晚上唱。」",
    "es": "Dice: «Canto desde hace cuarenta años, me acostumbré a la noche.»"
   },
   {
    "zh": "小陈说：「您唱得真好，可是晚上我想睡觉。」",
    "zhT": "小陳說：「您唱得真好，可是晚上我想睡覺。」",
    "es": "Xiaochen dice: «Canta muy bien, pero de noche quiero dormir.»"
   },
   {
    "zh": "老人说：「好，我以后白天唱歌。」",
    "zhT": "老人說：「好，我以後白天唱歌。」",
    "es": "El anciano dice: «Bien, de ahora en más canto de día.»"
   },
   {
    "zh": "从那天起，两个人成了好朋友。",
    "zhT": "從那天起，兩個人成了好朋友。",
    "es": "Desde ese día se hicieron muy buenos amigos."
   },
   {
    "zh": "周末小陈常去听他唱歌，还带水果给老人。",
    "zhT": "週末小陳常去聽他唱歌，還帶水果給老人。",
    "es": "Los fines de semana Xiaochen suele ir a escucharlo y lleva fruta al anciano."
   }
  ],
  "quiz": [
   {
    "zh": "小陈___进了新家。",
    "zhT": "小陳___進了新家。",
    "es": "Xiaochen se mudó a un departamento nuevo.",
    "opts": [
     {
      "z": "搬",
      "t": "搬",
      "p": "bān",
      "e": "Mudar",
      "a": null
     },
     {
      "z": "住",
      "t": "住",
      "p": "zhù",
      "e": "Vivir",
      "a": [
       "Habitar"
      ]
     },
     {
      "z": "换",
      "t": "換",
      "p": "huàn",
      "e": "Cambiar",
      "a": [
       "Intercambiar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "这个小区很___，他很喜欢。",
    "zhT": "這個小區很___，他很喜歡。",
    "es": "El barrio es muy tranquilo; le encanta.",
    "opts": [
     {
      "z": "安静",
      "t": "安靜",
      "p": "ānjìng",
      "e": "Tranquilo",
      "a": [
       "Silencioso"
      ]
     },
     {
      "z": "干净",
      "t": "乾淨",
      "p": "gānjìng",
      "e": "Limpio",
      "a": null
     },
     {
      "z": "热闹",
      "t": "熱鬧",
      "p": "rènao",
      "e": "Animado",
      "a": [
       "Bullicioso",
       "Concurrido"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "可是每天晚上十点以后，旁边的房间有唱歌的___。",
    "zhT": "可是每天晚上十點以後，旁邊的房間有唱歌的___。",
    "es": "Pero todas las noches después de las diez, se oye cantar en el departamento de al lado.",
    "opts": [
     {
      "z": "声音",
      "t": "聲音",
      "p": "shēngyīn",
      "e": "Voz",
      "a": [
       "Sonido"
      ]
     },
     {
      "z": "样子",
      "t": "樣子",
      "p": "yàngzi",
      "e": "Aspecto",
      "a": null
     },
     {
      "z": "时间",
      "t": "時間",
      "p": "shíjiān",
      "e": "Tiempo",
      "a": [
       "Hora"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "唱歌的声音___小陈睡不着。",
    "zhT": "唱歌的聲音___小陳睡不著。",
    "es": "El canto no deja dormir a Xiaochen.",
    "opts": [
     {
      "z": "让",
      "t": "讓",
      "p": "ràng",
      "e": "Dejar",
      "a": [
       "Permitir"
      ]
     },
     {
      "z": "看",
      "t": "看",
      "p": "kàn",
      "e": "Ver",
      "a": [
       "Mirar"
      ]
     },
     {
      "z": "问",
      "t": "問",
      "p": "wèn",
      "e": "Preguntar",
      "a": [
       "Interrogar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "他想：「我___去找他谈谈。」",
    "zhT": "他想：「我___去找他談談。」",
    "es": "Piensa: «Debería ir a hablar con él.»",
    "opts": [
     {
      "z": "应该",
      "t": "應該",
      "p": "yīnggāi",
      "e": "Deber",
      "a": null
     },
     {
      "z": "可能",
      "t": "可能",
      "p": "kěnéng",
      "e": "Posible",
      "a": [
       "Quizás"
      ]
     },
     {
      "z": "不用",
      "t": "不用",
      "p": "bùyòng",
      "e": "No es necesario",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "开门的是一位老人，看起来很___。",
    "zhT": "開門的是一位老人，看起來很___。",
    "es": "Abre la puerta un anciano, con cara muy amable.",
    "opts": [
     {
      "z": "热情",
      "t": "熱情",
      "p": "rèqíng",
      "e": "Entusiasmo",
      "a": [
       "Cálido"
      ]
     },
     {
      "z": "认真",
      "t": "認真",
      "p": "rènzhēn",
      "e": "Serio",
      "a": [
       "Cuidadoso"
      ]
     },
     {
      "z": "难过",
      "t": "難過",
      "p": "nánguò",
      "e": "Triste",
      "a": [
       "Apenado"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小陈很___地说了晚上唱歌的事。",
    "zhT": "小陳很___地說了晚上唱歌的事。",
    "es": "Xiaochen, con tacto, le comenta lo del canto nocturno.",
    "opts": [
     {
      "z": "小心",
      "t": "小心",
      "p": "xiǎoxīn",
      "e": "Cuidado",
      "a": null
     },
     {
      "z": "大方",
      "t": "大方",
      "p": "dàfang",
      "e": "Generoso",
      "a": [
       "De buen gusto",
       "Desenvuelto"
      ]
     },
     {
      "z": "努力",
      "t": "努力",
      "p": "nǔlì",
      "e": "Esforzarse",
      "a": [
       "Trabajar duro"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "老人说：「真___，我不知道吵到你了。」",
    "zhT": "老人說：「真___，我不知道吵到你了。」",
    "es": "El anciano: «Mil perdones, no sabía que te molestaba.»",
    "opts": [
     {
      "z": "对不起",
      "t": "對不起",
      "p": "duìbuqǐ",
      "e": "Perdonar",
      "a": null
     },
     {
      "z": "没关系",
      "t": "沒關係",
      "p": "méi guānxi",
      "e": "No importa",
      "a": [
       "No hay problema"
      ]
     },
     {
      "z": "不客气",
      "t": "不客氣",
      "p": "bù kèqì",
      "e": "De nada",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "他说：「我唱了四十年歌，___了晚上唱。」",
    "zhT": "他說：「我唱了四十年歌，___了晚上唱。」",
    "es": "Dice: «Canto desde hace cuarenta años, me acostumbré a la noche.»",
    "opts": [
     {
      "z": "习惯",
      "t": "習慣",
      "p": "xíguàn",
      "e": "Costumbre/acostumbrar",
      "a": null
     },
     {
      "z": "喜欢",
      "t": "喜歡",
      "p": "xǐhuan",
      "e": "Gustar",
      "a": [
       "Preferir"
      ]
     },
     {
      "z": "打算",
      "t": "打算",
      "p": "dǎsuàn",
      "e": "Planear",
      "a": [
       "Proyectar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "从那天起，两个人成了好___。",
    "zhT": "從那天起，兩個人成了好___。",
    "es": "Desde ese día se hicieron muy buenos amigos.",
    "opts": [
     {
      "z": "朋友",
      "t": "朋友",
      "p": "péngyou",
      "e": "Amigo",
      "a": [
       "Conocido"
      ]
     },
     {
      "z": "老师",
      "t": "老師",
      "p": "lǎoshī",
      "e": "Maestro",
      "a": [
       "Profesora"
      ]
     },
     {
      "z": "学生",
      "t": "學生",
      "p": "xuéshēng",
      "e": "Estudiante",
      "a": [
       "Alumno"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h4-receta",
  "hsk": 4,
  "emoji": "🥟",
  "titleEs": "El sabor de la abuela",
  "titleZh": "奶奶的味道",
  "titleZhT": "奶奶的味道",
  "blurb": "Un plato heredado, diez años de práctica y un secreto que no está en la receta.",
  "lines": [
   {
    "zh": "周末，小美回家看父母。",
    "zhT": "週末，小美回家看父母。",
    "es": "El fin de semana, Xiaomei va a casa a ver a sus padres."
   },
   {
    "zh": "妈妈在做她最喜欢的菜。",
    "zhT": "媽媽在做她最喜歡的菜。",
    "es": "Mamá está preparando su plato favorito."
   },
   {
    "zh": "这个菜是奶奶教妈妈的。",
    "zhT": "這個菜是奶奶教媽媽的。",
    "es": "Este plato la abuela se lo enseñó a mamá."
   },
   {
    "zh": "奶奶去年去世了。",
    "zhT": "奶奶去年去世了。",
    "es": "La abuela falleció el año pasado."
   },
   {
    "zh": "小美走进屋子，觉得特别香。",
    "zhT": "小美走進屋子，覺得特別香。",
    "es": "Xiaomei entra a la casa: huele delicioso."
   },
   {
    "zh": "她说：「妈妈，味道跟奶奶做的一样！」",
    "zhT": "她說：「媽媽，味道跟奶奶做的一樣！」",
    "es": "Dice: «Mamá, ¡sabe igual que cuando lo hacía la abuela!»"
   },
   {
    "zh": "妈妈笑了：「我做了十年，才有这个味道。」",
    "zhT": "媽媽笑了：「我做了十年，才有這個味道。」",
    "es": "Mamá sonríe: «Hice este plato diez años para lograr este sabor.»"
   },
   {
    "zh": "她说：「我失败过很多次，但是一直很努力。」",
    "zhT": "她說：「我失敗過很多次，但是一直很努力。」",
    "es": "Dice: «Fallé muchísimas veces, pero siempre me esforcé.»"
   },
   {
    "zh": "小美问：「奶奶做的为什么那么好吃？」",
    "zhT": "小美問：「奶奶做的為什麼那麼好吃？」",
    "es": "Xiaomei pregunta: «¿Por qué lo de la abuela era tan rico?»"
   },
   {
    "zh": "妈妈想了想：「因为她做饭的时候，心里有爱。」",
    "zhT": "媽媽想了想：「因為她做飯的時候，心裡有愛。」",
    "es": "Mamá piensa un momento: «Porque cuando cocinaba, tenía amor en el corazón.»"
   },
   {
    "zh": "小美说：「妈妈，教我做这个菜吧。」",
    "zhT": "小美說：「媽媽，教我做這個菜吧。」",
    "es": "Xiaomei dice: «Mamá, enseñame a hacer este plato.»"
   },
   {
    "zh": "妈妈说：「好，每个周末你回来，我们就做一次。」",
    "zhT": "媽媽說：「好，每個週末你回來，我們就做一次。」",
    "es": "Mamá dice: «Bien, cada fin de semana que vengas lo hacemos.»"
   },
   {
    "zh": "这样，奶奶的味道留了下来。",
    "zhT": "這樣，奶奶的味道留了下來。",
    "es": "Así el sabor de la abuela quedó guardado."
   },
   {
    "zh": "小美把这个菜的名字记在了心里。",
    "zhT": "小美把這個菜的名字記在了心裡。",
    "es": "Xiaomei guardó el nombre de este plato en su corazón."
   }
  ],
  "quiz": [
   {
    "zh": "周末，小美回家看___。",
    "zhT": "週末，小美回家看___。",
    "es": "El fin de semana, Xiaomei va a casa a ver a sus padres.",
    "opts": [
     {
      "z": "父母",
      "t": "父母",
      "p": "fùmǔ",
      "e": "Padres",
      "a": [
       "Familia"
      ]
     },
     {
      "z": "朋友",
      "t": "朋友",
      "p": "péngyou",
      "e": "Amigo",
      "a": [
       "Conocido"
      ]
     },
     {
      "z": "同学",
      "t": "同學",
      "p": "tóngxué",
      "e": "Compañero/a de clase",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "奶奶去年___了。",
    "zhT": "奶奶去年___了。",
    "es": "La abuela falleció el año pasado.",
    "opts": [
     {
      "z": "去世",
      "t": "去世",
      "p": "qùshì",
      "e": "Morir",
      "a": [
       "Fallecer"
      ]
     },
     {
      "z": "回来",
      "t": "回來",
      "p": "huílái",
      "e": "Volver",
      "a": [
       "Regresar"
      ]
     },
     {
      "z": "搬家",
      "t": "搬家",
      "p": "bānjiā",
      "e": "Mudarse",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美走进___，觉得特别香。",
    "zhT": "小美走進___，覺得特別香。",
    "es": "Xiaomei entra a la casa: huele delicioso.",
    "opts": [
     {
      "z": "屋子",
      "t": "屋子",
      "p": "wūzi",
      "e": "Habitación",
      "a": [
       "Cuarto"
      ]
     },
     {
      "z": "学校",
      "t": "學校",
      "p": "xuéxiào",
      "e": "Escuela",
      "a": [
       "Centro educativo"
      ]
     },
     {
      "z": "医院",
      "t": "醫院",
      "p": "yīyuàn",
      "e": "Hospital",
      "a": [
       "Clínica"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她说：「妈妈，___跟奶奶做的一样！」",
    "zhT": "她說：「媽媽，___跟奶奶做的一樣！」",
    "es": "Dice: «Mamá, ¡sabe igual que cuando lo hacía la abuela!»",
    "opts": [
     {
      "z": "味道",
      "t": "味道",
      "p": "wèidào",
      "e": "Sabor",
      "a": null
     },
     {
      "z": "样子",
      "t": "樣子",
      "p": "yàngzi",
      "e": "Aspecto",
      "a": null
     },
     {
      "z": "地方",
      "t": "地方",
      "p": "dìfang",
      "e": "Lugar",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "妈妈笑了：「我做了十年，___有这个味道。」",
    "zhT": "媽媽笑了：「我做了十年，___有這個味道。」",
    "es": "Mamá sonríe: «Hice este plato diez años para lograr este sabor.»",
    "opts": [
     {
      "z": "才",
      "t": "才",
      "p": "cái",
      "e": "Solo",
      "a": [
       "Recién"
      ]
     },
     {
      "z": "不",
      "t": "不",
      "p": "bù",
      "e": "No",
      "a": null
     },
     {
      "z": "很",
      "t": "很",
      "p": "hěn",
      "e": "Muy",
      "a": [
       "Bastante"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她说：「我___过很多次，但是一直很努力。」",
    "zhT": "她說：「我___過很多次，但是一直很努力。」",
    "es": "Dice: «Fallé muchísimas veces, pero siempre me esforcé.»",
    "opts": [
     {
      "z": "失败",
      "t": "失敗",
      "p": "shībài",
      "e": "Fracasar",
      "a": [
       "Fallar",
       "Derrota"
      ]
     },
     {
      "z": "成功",
      "t": "成功",
      "p": "chénggōng",
      "e": "Tener éxito",
      "a": null
     },
     {
      "z": "进步",
      "t": "進步",
      "p": "jìnbù",
      "e": "Progresar",
      "a": [
       "Avanzar",
       "Mejorar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她说：「我失败过很多次，但是一直很___。」",
    "zhT": "她說：「我失敗過很多次，但是一直很___。」",
    "es": "Dice: «Fallé muchísimas veces, pero siempre me esforcé.»",
    "opts": [
     {
      "z": "努力",
      "t": "努力",
      "p": "nǔlì",
      "e": "Esforzarse",
      "a": [
       "Trabajar duro"
      ]
     },
     {
      "z": "休息",
      "t": "休息",
      "p": "xiūxi",
      "e": "Descansar",
      "a": [
       "Relajarse"
      ]
     },
     {
      "z": "睡觉",
      "t": "睡覺",
      "p": "shuìjiào",
      "e": "Dormir",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "妈妈想了想：「因为她做饭的时候，___有爱。」",
    "zhT": "媽媽想了想：「因為她做飯的時候，___有愛。」",
    "es": "Mamá piensa un momento: «Porque cuando cocinaba, tenía amor en el corazón.»",
    "opts": [
     {
      "z": "心里",
      "t": "心裡",
      "p": "xīnlǐ",
      "e": "En el corazón",
      "a": null
     },
     {
      "z": "里面",
      "t": "裡面",
      "p": "lǐmiàn",
      "e": "Dentro",
      "a": [
       "Interior",
       "Adentro"
      ]
     },
     {
      "z": "上面",
      "t": "上面",
      "p": "shàngmiàn",
      "e": "Arriba",
      "a": [
       "Superficie"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美说：「妈妈，___我做这个菜吧。」",
    "zhT": "小美說：「媽媽，___我做這個菜吧。」",
    "es": "Xiaomei dice: «Mamá, enseñame a hacer este plato.»",
    "opts": [
     {
      "z": "教",
      "t": "教",
      "p": "jiāo",
      "e": "Enseñar",
      "a": [
       "Instruir"
      ]
     },
     {
      "z": "学",
      "t": "學",
      "p": "xué",
      "e": "Estudiar",
      "a": [
       "Aprender"
      ]
     },
     {
      "z": "给",
      "t": "給",
      "p": "gěi",
      "e": "Dar/con",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "小美把这个菜的名字___在了心里。",
    "zhT": "小美把這個菜的名字___在了心裡。",
    "es": "Xiaomei guardó el nombre de este plato en su corazón.",
    "opts": [
     {
      "z": "记",
      "t": "記",
      "p": "jì",
      "e": "Recordar",
      "a": [
       "Anotar"
      ]
     },
     {
      "z": "忘",
      "t": "忘",
      "p": "wàng",
      "e": "Olvidar",
      "a": [
       "Dejar de recordar"
      ]
     },
     {
      "z": "写",
      "t": "寫",
      "p": "xiě",
      "e": "Escribir",
      "a": [
       "Trazar"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h5-carta",
  "hsk": 5,
  "emoji": "💌",
  "titleEs": "La carta que llegó tarde",
  "titleZh": "迟到的信",
  "titleZhT": "遲到的信",
  "blurb": "Una carta vieja encontrada al mudarse revive el amor en tiempos sin teléfonos.",
  "lines": [
   {
    "zh": "搬家的时候，小林发现了一封旧信。",
    "zhT": "搬家的時候，小林發現了一封舊信。",
    "es": "Mudándose, Xiaolin descubrió una carta vieja."
   },
   {
    "zh": "信是十年前爷爷写给奶奶的。",
    "zhT": "信是十年前爺爺寫給奶奶的。",
    "es": "La carta se la escribió el abuelo a la abuela hace diez años."
   },
   {
    "zh": "那时爷爷在南方的城市工作。",
    "zhT": "那時爺爺在南方的城市工作。",
    "es": "En ese entonces el abuelo trabajaba en una ciudad del sur."
   },
   {
    "zh": "那时候，家里没有电话。",
    "zhT": "那時候，家裡沒有電話。",
    "es": "En esa época no había teléfono en casa."
   },
   {
    "zh": "他们只能写信。",
    "zhT": "他們只能寫信。",
    "es": "Solo podían comunicarse por cartas."
   },
   {
    "zh": "信上写着：「亲爱的，我很想你。」",
    "zhT": "信上寫著：「親愛的，我很想你。」",
    "es": "En la carta decía: «Querida, te extraño mucho.»"
   },
   {
    "zh": "「这里的冬天很冷，你要注意身体。」",
    "zhT": "「這裡的冬天很冷，你要注意身體。」",
    "es": "«Aquí el invierno es muy frío, cuida tu salud.»"
   },
   {
    "zh": "「等春天来了，我就回去看你。」",
    "zhT": "「等春天來了，我就回去看你。」",
    "es": "«Cuando llegue la primavera, vuelvo a verte.»"
   },
   {
    "zh": "奶奶把这封信读了几十遍。",
    "zhT": "奶奶把這封信讀了幾十遍。",
    "es": "La abuela leyó esta carta decenas de veces."
   },
   {
    "zh": "小林拿着信，眼睛湿了。",
    "zhT": "小林拿著信，眼睛溼了。",
    "es": "Xiaolin sostiene la carta con los ojos húmedos."
   },
   {
    "zh": "她把信拿给奶奶看。",
    "zhT": "她把信拿給奶奶看。",
    "es": "Le lleva la carta a la abuela."
   },
   {
    "zh": "奶奶慢慢地读了，笑了：「我还记得这一天。」",
    "zhT": "奶奶慢慢地讀了，笑了：「我還記得這一天。」",
    "es": "La abuela la lee despacio y sonríe: «Todavía recuerdo ese día.»"
   },
   {
    "zh": "她说：「那时候，我们用文字表达感情。」",
    "zhT": "她說：「那時候，我們用文字表達感情。」",
    "es": "Dice: «En ese tiempo expresábamos los sentimientos con palabras escritas.»"
   },
   {
    "zh": "「现在的人都用手机，可是字里没有温度。」",
    "zhT": "「現在的人都用手機，可是字裡沒有溫度。」",
    "es": "«Hoy todos usan celulares, pero las palabras perdieron su calor.»"
   },
   {
    "zh": "小林小心地把信收好，放回箱子里。",
    "zhT": "小林小心地把信收好，放回箱子裡。",
    "es": "Xiaolin guarda la carta con cuidado y la vuelve a poner en la caja."
   }
  ],
  "quiz": [
   {
    "zh": "搬家的时候，小林___了一封旧信。",
    "zhT": "搬家的時候，小林___了一封舊信。",
    "es": "Mudándose, Xiaolin descubrió una carta vieja.",
    "opts": [
     {
      "z": "发现",
      "t": "發現",
      "p": "fāxiàn",
      "e": "Descubrir",
      "a": [
       "Notar"
      ]
     },
     {
      "z": "发明",
      "t": "發明",
      "p": "fāmíng",
      "e": "Inventar",
      "a": [
       "Creación"
      ]
     },
     {
      "z": "发生",
      "t": "發生",
      "p": "fāshēng",
      "e": "Ocurrir",
      "a": [
       "Suceder"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "___是十年前爷爷写给奶奶的。",
    "zhT": "___是十年前爺爺寫給奶奶的。",
    "es": "La carta se la escribió el abuelo a la abuela hace diez años.",
    "opts": [
     {
      "z": "信",
      "t": "信",
      "p": "xìn",
      "e": "Carta",
      "a": null
     },
     {
      "z": "书",
      "t": "書",
      "p": "shū",
      "e": "Libro",
      "a": [
       "Texto"
      ]
     },
     {
      "z": "报纸",
      "t": "報紙",
      "p": "bàozhǐ",
      "e": "Periódico",
      "a": [
       "Diario"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "那时爷爷在南方的___工作。",
    "zhT": "那時爺爺在南方的___工作。",
    "es": "En ese entonces el abuelo trabajaba en una ciudad del sur.",
    "opts": [
     {
      "z": "城市",
      "t": "城市",
      "p": "chéngshì",
      "e": "Ciudad",
      "a": [
       "Metrópoli"
      ]
     },
     {
      "z": "国家",
      "t": "國家",
      "p": "guójiā",
      "e": "Nación",
      "a": [
       "Estado"
      ]
     },
     {
      "z": "地方",
      "t": "地方",
      "p": "dìfang",
      "e": "Lugar",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "信上写着：「亲爱的，我很___你。」",
    "zhT": "信上寫著：「親愛的，我很___你。」",
    "es": "En la carta decía: «Querida, te extraño mucho.»",
    "opts": [
     {
      "z": "想",
      "t": "想",
      "p": "xiǎng",
      "e": "Pensar",
      "a": [
       "Desear"
      ]
     },
     {
      "z": "爱",
      "t": "愛",
      "p": "ài",
      "e": "Amar",
      "a": [
       "Gustar"
      ]
     },
     {
      "z": "给",
      "t": "給",
      "p": "gěi",
      "e": "Dar/con",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "「这里的冬天很冷，你要___身体。」",
    "zhT": "「這裡的冬天很冷，你要___身體。」",
    "es": "«Aquí el invierno es muy frío, cuida tu salud.»",
    "opts": [
     {
      "z": "注意",
      "t": "注意",
      "p": "zhùyì",
      "e": "Prestar atención",
      "a": [
       "Fijarse"
      ]
     },
     {
      "z": "放心",
      "t": "放心",
      "p": "fàngxīn",
      "e": "Tranquilizarse",
      "a": [
       "No preocuparse"
      ]
     },
     {
      "z": "小心",
      "t": "小心",
      "p": "xiǎoxīn",
      "e": "Cuidado",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "「等___来了，我就回去看你。」",
    "zhT": "「等___來了，我就回去看你。」",
    "es": "«Cuando llegue la primavera, vuelvo a verte.»",
    "opts": [
     {
      "z": "春天",
      "t": "春天",
      "p": "chūntiān",
      "e": "Primavera",
      "a": [
       "Estación"
      ]
     },
     {
      "z": "秋天",
      "t": "秋天",
      "p": "qiūtiān",
      "e": "Otoño",
      "a": [
       "Estación"
      ]
     },
     {
      "z": "夏天",
      "t": "夏天",
      "p": "xiàtiān",
      "e": "Verano",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "奶奶把这封信___了几十遍。",
    "zhT": "奶奶把這封信___了幾十遍。",
    "es": "La abuela leyó esta carta decenas de veces.",
    "opts": [
     {
      "z": "读",
      "t": "讀",
      "p": "dú",
      "e": "Leer",
      "a": null
     },
     {
      "z": "写",
      "t": "寫",
      "p": "xiě",
      "e": "Escribir",
      "a": [
       "Trazar"
      ]
     },
     {
      "z": "看",
      "t": "看",
      "p": "kàn",
      "e": "Ver",
      "a": [
       "Mirar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "小林拿着信，眼睛___了。",
    "zhT": "小林拿著信，眼睛___了。",
    "es": "Xiaolin sostiene la carta con los ojos húmedos.",
    "opts": [
     {
      "z": "湿",
      "t": "濕",
      "p": "shī",
      "e": "Húmedo",
      "a": [
       "Mojado"
      ]
     },
     {
      "z": "干",
      "t": "乾",
      "p": "gān",
      "e": "Seco",
      "a": null
     },
     {
      "z": "热",
      "t": "熱",
      "p": "rè",
      "e": "Caliente",
      "a": [
       "Caluroso"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "她说：「那时候，我们用文字___感情。」",
    "zhT": "她說：「那時候，我們用文字___感情。」",
    "es": "Dice: «En ese tiempo expresábamos los sentimientos con palabras escritas.»",
    "opts": [
     {
      "z": "表达",
      "t": "表達",
      "p": "biǎodá",
      "e": "Expresar",
      "a": [
       "Manifestar"
      ]
     },
     {
      "z": "表现",
      "t": "表現",
      "p": "biǎoxiàn",
      "e": "Manifestar",
      "a": null
     },
     {
      "z": "翻译",
      "t": "翻譯",
      "p": "fānyì",
      "e": "Traducir / traducción",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "「现在的人都用手机，可是字里没有___。」",
    "zhT": "「現在的人都用手機，可是字裡沒有___。」",
    "es": "«Hoy todos usan celulares, pero las palabras perdieron su calor.»",
    "opts": [
     {
      "z": "温度",
      "t": "溫度",
      "p": "wēndù",
      "e": "Temperatura",
      "a": null
     },
     {
      "z": "高度",
      "t": "高度",
      "p": "gāodù",
      "e": "Altitud",
      "a": [
       "Elevación"
      ]
     },
     {
      "z": "速度",
      "t": "速度",
      "p": "sùdù",
      "e": "Velocidad",
      "a": [
       "Rapidez"
      ]
     }
    ],
    "ans": 0
   }
  ]
 },
 {
  "id": "h6-puente",
  "hsk": 6,
  "emoji": "🌉",
  "titleEs": "El puente del abuelo",
  "titleZh": "爷爷桥",
  "titleZhT": "爺爺橋",
  "blurb": "Un anciano, un río sin puente y la obstinación callada que cambia un pueblo entero.",
  "lines": [
   {
    "zh": "山里有一条小河，交通很不方便。",
    "zhT": "山裡有一條小河，交通很不方便。",
    "es": "En la montaña hay un río pequeño; el transporte es muy incómodo."
   },
   {
    "zh": "河上没有桥，人们过河得绕很远的路。",
    "zhT": "河上沒有橋，人們過河得繞很遠的路。",
    "es": "Sobre el río no hay puente; para cruzarlo hay que dar un gran rodeo."
   },
   {
    "zh": "孩子们上学，要走两个小时。",
    "zhT": "孩子們上學，要走兩個小時。",
    "es": "Los chicos caminan dos horas para ir a la escuela."
   },
   {
    "zh": "一位老人决定修一座桥。",
    "zhT": "一位老人決定修一座橋。",
    "es": "Un anciano decide construir un puente."
   },
   {
    "zh": "他说：「我在山里生活了一辈子，想给大家修一座桥。」",
    "zhT": "他說：「我在山裡生活了一輩子，想給大家修一座橋。」",
    "es": "Dice: «Viví toda mi vida en estas montañas; quiero construirles un puente.»"
   },
   {
    "zh": "一开始，人们都不相信他。",
    "zhT": "一開始，人們都不相信他。",
    "es": "Al principio la gente no le creía."
   },
   {
    "zh": "为了修桥，他捐出自己全部的钱。",
    "zhT": "為了修橋，他捐出自己全部的錢。",
    "es": "Para construir el puente donó todo su dinero."
   },
   {
    "zh": "他还请求政府帮助。",
    "zhT": "他還請求政府幫助。",
    "es": "También pide ayuda al gobierno."
   },
   {
    "zh": "三年以后，桥终于建成了。",
    "zhT": "三年以後，橋終於建成了。",
    "es": "Tres años después, el puente por fin quedó construido."
   },
   {
    "zh": "桥开通的那天，大家都来了。",
    "zhT": "橋開通的那天，大家都來了。",
    "es": "El día que se habilitó el puente, vino todo el mundo."
   },
   {
    "zh": "孩子们跑过桥去上学，只要二十分钟。",
    "zhT": "孩子們跑過橋去上學，只要二十分鐘。",
    "es": "Los chicos cruzan corriendo el puente al colegio: apenas veinte minutos."
   },
   {
    "zh": "老人站在桥上，流下了眼泪。",
    "zhT": "老人站在橋上，流下了眼淚。",
    "es": "El anciano, parado sobre el puente, se le caen las lágrimas."
   },
   {
    "zh": "他说：「一座桥，改变了一个地方。」",
    "zhT": "他說：「一座橋，改變了一個地方。」",
    "es": "Dice: «Un puente cambió un lugar entero.»"
   },
   {
    "zh": "后来，这座桥出了名，人们叫它「爷爷桥」。",
    "zhT": "後來，這座橋出了名，人們叫它「爺爺橋」。",
    "es": "Con el tiempo el puente se hizo famoso: la gente lo llama «Puente del Abuelo»."
   },
   {
    "zh": "这个感人的故事，会一直流传下去。",
    "zhT": "這個感人的故事，會一直流傳下去。",
    "es": "Esta historia conmovedora se seguirá contando."
   }
  ],
  "quiz": [
   {
    "zh": "山里有一条小河，___很不方便。",
    "zhT": "山裡有一條小河，___很不方便。",
    "es": "En la montaña hay un río pequeño; el transporte es muy incómodo.",
    "opts": [
     {
      "z": "交通",
      "t": "交通",
      "p": "jiāotōng",
      "e": "Transporte",
      "a": [
       "Tránsito"
      ]
     },
     {
      "z": "天气",
      "t": "天氣",
      "p": "tiānqì",
      "e": "Clima",
      "a": [
       "Tiempo"
      ]
     },
     {
      "z": "时间",
      "t": "時間",
      "p": "shíjiān",
      "e": "Tiempo",
      "a": [
       "Hora"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "河上没有桥，人们过河得___很远的路。",
    "zhT": "河上沒有橋，人們過河得___很遠的路。",
    "es": "Sobre el río no hay puente; para cruzarlo hay que dar un gran rodeo.",
    "opts": [
     {
      "z": "绕",
      "t": "繞",
      "p": "rào",
      "e": "Rodear",
      "a": null
     },
     {
      "z": "退",
      "t": "退",
      "p": "tuì",
      "e": "Retirarse",
      "a": [
       "Retroceder"
      ]
     },
     {
      "z": "飞",
      "t": "飛",
      "p": "fēi",
      "e": "Volar",
      "a": null
     }
    ],
    "ans": 0
   },
   {
    "zh": "孩子们___，要走两个小时。",
    "zhT": "孩子們___，要走兩個小時。",
    "es": "Los chicos caminan dos horas para ir a la escuela.",
    "opts": [
     {
      "z": "上学",
      "t": "上學",
      "p": "shàngxué",
      "e": "Ir a la escuela",
      "a": null
     },
     {
      "z": "下班",
      "t": "下班",
      "p": "xiàbān",
      "e": "Terminar trabajo",
      "a": [
       "Salir del trabajo"
      ]
     },
     {
      "z": "回家",
      "t": "回家",
      "p": "huí jiā",
      "e": "Volver a casa",
      "a": [
       "Regresar al hogar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "一位老人决定修一座___。",
    "zhT": "一位老人決定修一座___。",
    "es": "Un anciano decide construir un puente.",
    "opts": [
     {
      "z": "桥",
      "t": "橋",
      "p": "qiáo",
      "e": "Puente",
      "a": [
       "Paso"
      ]
     },
     {
      "z": "河",
      "t": "河",
      "p": "hé",
      "e": "Río",
      "a": [
       "Corriente"
      ]
     },
     {
      "z": "路",
      "t": "路",
      "p": "lù",
      "e": "Camino",
      "a": [
       "Calle"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "他说：「我在山里___了一辈子，想给大家修一座桥。」",
    "zhT": "他說：「我在山裡___了一輩子，想給大家修一座橋。」",
    "es": "Dice: «Viví toda mi vida en estas montañas; quiero construirles un puente.»",
    "opts": [
     {
      "z": "生活",
      "t": "生活",
      "p": "shēnghuó",
      "e": "Vida",
      "a": [
       "Vivir"
      ]
     },
     {
      "z": "工作",
      "t": "工作",
      "p": "gōngzuò",
      "e": "Trabajar/trabajo",
      "a": null
     },
     {
      "z": "休息",
      "t": "休息",
      "p": "xiūxi",
      "e": "Descansar",
      "a": [
       "Relajarse"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "一开始，人们都不___他。",
    "zhT": "一開始，人們都不___他。",
    "es": "Al principio la gente no le creía.",
    "opts": [
     {
      "z": "相信",
      "t": "相信",
      "p": "xiāngxìn",
      "e": "Creer",
      "a": null
     },
     {
      "z": "知道",
      "t": "知道",
      "p": "zhīdào",
      "e": "Saber",
      "a": [
       "Conocer"
      ]
     },
     {
      "z": "同意",
      "t": "同意",
      "p": "tóngyì",
      "e": "Estar de acuerdo",
      "a": [
       "Consentir"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "为了修桥，他___出自己全部的钱。",
    "zhT": "為了修橋，他___出自己全部的錢。",
    "es": "Para construir el puente donó todo su dinero.",
    "opts": [
     {
      "z": "捐",
      "t": "捐",
      "p": "juān",
      "e": "Donar",
      "a": [
       "Contribuir",
       "Ceder"
      ]
     },
     {
      "z": "交",
      "t": "交",
      "p": "jiāo",
      "e": "Entregar",
      "a": [
       "Cruzar"
      ]
     },
     {
      "z": "花",
      "t": "花",
      "p": "huā",
      "e": "Flor",
      "a": [
       "Gastar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "三年以后，桥终于___了。",
    "zhT": "三年以後，橋終於___了。",
    "es": "Tres años después, el puente por fin quedó construido.",
    "opts": [
     {
      "z": "建成",
      "t": "建成",
      "p": "jiànchéng",
      "e": "Construir completamente",
      "a": [
       "Finalizar",
       "Terminar"
      ]
     },
     {
      "z": "完成",
      "t": "完成",
      "p": "wánchéng",
      "e": "Completar",
      "a": null
     },
     {
      "z": "破坏",
      "t": "破壞",
      "p": "pòhuài",
      "e": "Destruir",
      "a": [
       "Arruinar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "桥___的那天，大家都来了。",
    "zhT": "橋___的那天，大家都來了。",
    "es": "El día que se habilitó el puente, vino todo el mundo.",
    "opts": [
     {
      "z": "开通",
      "t": "開通",
      "p": "kāitōng",
      "e": "Habilitar",
      "a": [
       "Inaugurar",
       "Abierto (de mente)"
      ]
     },
     {
      "z": "打开",
      "t": "打開",
      "p": "dǎkāi",
      "e": "Abrir",
      "a": null
     },
     {
      "z": "离开",
      "t": "離開",
      "p": "líkāi",
      "e": "Irse",
      "a": [
       "Abandonar"
      ]
     }
    ],
    "ans": 0
   },
   {
    "zh": "这个___的故事，会一直流传下去。",
    "zhT": "這個___的故事，會一直流傳下去。",
    "es": "Esta historia conmovedora se seguirá contando.",
    "opts": [
     {
      "z": "感人",
      "t": "感人",
      "p": "gǎnrén",
      "e": "Conmovedor",
      "a": null
     },
     {
      "z": "可怕",
      "t": "可怕",
      "p": "kěpà",
      "e": "Terrible",
      "a": [
       "Aterrador"
      ]
     },
     {
      "z": "好玩儿",
      "t": "好玩兒",
      "p": "hǎowánr",
      "e": "Divertido",
      "a": [
       "Entretenido"
      ]
     }
    ],
    "ans": 0
   }
  ]
 }
];
