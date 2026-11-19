# Lecciones de familia · hoja de revisión

GENERADA por `tools/build-familia.js` (no editar a mano, salvo el bloque «Constancia de revisión», que se conserva al regenerar).

**Fuente: material del Instituto Guó Fēng** («Mapa de la familia», `tools/lecciones-familia/fuente-guofeng.json`, transcrito de una captura). **Permiso de uso: a confirmar con el maestro** (el PR queda sin mergear hasta confirmarlo). Nivel aproximado, no oficial.

`revision`: los 59 ítems están en `pendiente`. Ninguno es `revisado` ni `nativo`. Una etiqueta distinta de `pendiente` solo se escribe si la constancia de abajo registra quién la puso y cuándo (regla 4 de «Después de editar» en el `README.md`).

## Constancia de revisión

<!-- constancia: se completa a mano; build-familia.js lo conserva tal cual -->
| Fecha | Quién | Qué se revisó | Resultado |
|---|---|---|---|
| — | — | — | — |
<!-- /constancia -->

## A confirmar con el maestro

- **叔 = shú** (ㄕㄨˊ), la convención TOCFL de la app (`pinyin-tocfl.js`, módulo TOCFL-A2). La fuente dice **shū**. Afecta a: 叔父 (fuente: shūfù), 叔母 (fuente: shūmǔ), 叔叔 (fuente: shūshu) y la marca 叔 de «Cómo se arman los términos».
- **姊夫 / 妹夫**: el «mayor / menor» lo agregamos nosotros; la fuente dice «Cuñado (esposo de la hermana)».
- **Letra chica en la captura** (`verificar: true`, se conserva en los datos): 6 términos, 19 piezas: 伯母·叔母 (伯母·叔母 → 伯母·嬸嬸); 姑母 (姑母 → 姑姑·大姑·小姑); 表姊·表妹 (表姊·表妹 → 表姐); 堂姊·堂妹 (堂姊·堂妹); 嫂·弟婦 (嫂·弟婦 → 大嫂·弟妹); 孫婦 (孫婦 → 孫媳婦).

## Decisiones de armado (`tools/lecciones-familia/ajustes.json`)

- **Simplificado** escrito a mano, carácter por carácter: 爺→爷, 媽→妈, 親→亲, 兒→儿, 孫→孙, 婦→妇, 嬸→婶, 姪→侄. 姊 queda 姊 en las dos escrituras. **Resultado de OpenCC:** Ida y vuelta s2tw/tw2s con OpenCC 1.4.2, corrida el 2026-11-19 sobre los 111 pares simplificado/tradicional distintos de lessons-familia.js (ítems, formas cotidianas, marcas y ejemplos de las reglas, y títulos): 107 coinciden en las dos direcciones. Las 4 diferencias son todas 姪/侄, que OpenCC deja sin convertir: 姪, 姪子, 姪女 y el título 兒女、媳婦和姪甥. Se mantiene 姪 → 侄 por decisión de Ulises (excepción declarada en ajustes.json); tools/check-familia.js lo vuelve a comprobar en cada corrida.
- **Zhuyin** derivado del pinyin de la fuente con la tabla de `app.js` (`pzPinyinToZhuyin`, sin modificarla), alineado sílaba por sílaba; la marca del tono neutro va **adelante** (˙ㄇㄚ). Alineado a mano (pinyin-pro no conoce la lectura): 姊 = jie. **Todo el zhuyin está pendiente de revisión.**
- **Pares con «·»**: se separan por posición. Forma cotidiana única para dos formales, asignada por significado: 表哥 → 表兄, 表姐 → 表姊, 堂哥 → 堂兄.
- **Español**: el de la fuente, salvo las 22 piezas de los pares y las dos glosas que llevaban caracteres chinos (表兄·表弟, 表姊·表妹), escritas por nosotros.
- **Chino escrito por nosotros** (no está en la fuente; a revisar): los títulos de las lecciones (祖父母和曾祖父母, 父母和他們的兄弟姊妹, 兄弟姊妹和夫妻, 嫂、姊夫和堂表兄弟姊妹, 兒女、媳婦和姪甥, 孫子和曾孫, 稱謂怎麼組成).
- **«Cómo se arman los términos»**: las 4 reglas de la fuente, reordenadas en marca + explicación + ejemplos.

### Notas por término (solo en esta hoja)

- **小姑**: También significa «hermana menor del esposo» (小姑子). En pantalla solo figura como forma cotidiana de 姑母.
- **弟妹**: También significa «hermanos menores». En pantalla solo figura como forma cotidiana de 弟婦.
- **表姐**: La fuente escribe 表姐 (con 姐) como forma cotidiana de 表姊 (con 姊). Se deja como en la fuente; la app TOCFL usa 姊.
- **伯母**: La fuente da 伯母 como formal y como cotidiano. En pantalla se muestra una sola vez, con la nota «La forma cotidiana es la misma».
- **姊夫**: «mayor» lo agregamos nosotros: la fuente dice «Cuñado (esposo de la hermana)».
- **妹夫**: «menor» lo agregamos nosotros: la fuente dice «Cuñado (esposo de la hermana)».
- **自己**: Se muestra como punto de partida («Yo»), no como término de parentesco.
- **子**: Se muestra con la forma cotidiana a la vista y la nota «la forma formal casi no se usa sola».
- **女**: Se muestra con la forma cotidiana a la vista y la nota «la forma formal casi no se usa sola». La lista TOCFL de la app trae 女 como «femenino».
- **媳**: Se muestra con la forma cotidiana a la vista y la nota «la forma formal casi no se usa sola».

## Pinyin: dónde la fuente y la app difieren

Se muestra siempre el pinyin de la fuente (o el ajuste de 叔); nunca el generado. Columna «app»: lo que generaría la app (pinyin-pro + tabla TOCFL por palabra entera).

| Pieza | Fuente | Se muestra | App |
|---|---|---|---|
| 舅母 | jiùmǔ | jiùmǔ | jiù mu |
| 叔父 | shūfù | shúfù | shū fù |
| 叔叔 | shūshu | shúshu | shú shu |
| 叔母 | shūmǔ | shúmǔ | shū mǔ |
| 姑父 | gūfù | gūfù | gū fu |
| 表姊 | biǎojiě | biǎojiě | biǎo zǐ |
| 堂姊 | tángjiě | tángjiě | táng zǐ |
| 姊夫 | jiěfū | jiěfū | zǐ fū |
| 妹夫 | mèifū | mèifū | mèi fu |
| 姊 | jiě | jiě | zǐ |
| 外甥女 | wàishēngnǚ | wàishēngnǚ | wài sheng nǚ |
| 女婿 | nǚxù | nǚxù | nǚ xu |
| 外孫女婿 | wàisūnnǚxù | wàisūnnǚxù | wài sūn nǚ xu |
| 孫女婿 | sūnnǚxù | sūnnǚxù | sūn nǚ xu |

## Ítems por lección

### 👵 Abuelos y bisabuelos · 祖父母和曾祖父母 · TOCFL A2 (nivel aproximado)

| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |
|---|---|---|---|---|---|---|
| 外曾祖父 | wàizēngzǔfù | ㄨㄞˋ ㄗㄥ ㄗㄨˇ ㄈㄨˋ | Bisabuelo materno | 太外公 tài wàigōng ㄊㄞˋ ㄨㄞˋ ㄍㄨㄥ |  | pendiente |
| 外曾祖母 | wàizēngzǔmǔ | ㄨㄞˋ ㄗㄥ ㄗㄨˇ ㄇㄨˇ | Bisabuela materna | 太外婆 tài wàipó ㄊㄞˋ ㄨㄞˋ ㄆㄛˊ |  | pendiente |
| 外祖父 | wàizǔfù | ㄨㄞˋ ㄗㄨˇ ㄈㄨˋ | Abuelo materno | 外公 wàigōng ㄨㄞˋ ㄍㄨㄥ |  | pendiente |
| 外祖母 | wàizǔmǔ | ㄨㄞˋ ㄗㄨˇ ㄇㄨˇ | Abuela materna | 外婆 wàipó ㄨㄞˋ ㄆㄛˊ |  | pendiente |
| 曾祖父 | zēngzǔfù | ㄗㄥ ㄗㄨˇ ㄈㄨˋ | Bisabuelo paterno | 太爺爺 / 太爷爷 tài yéye ㄊㄞˋ ㄧㄝˊ ˙ㄧㄝ |  | pendiente |
| 曾祖母 | zēngzǔmǔ | ㄗㄥ ㄗㄨˇ ㄇㄨˇ | Bisabuela paterna | 太奶奶 tài nǎinai ㄊㄞˋ ㄋㄞˇ ˙ㄋㄞ |  | pendiente |
| 祖父 | zǔfù | ㄗㄨˇ ㄈㄨˋ | Abuelo paterno | 爺爺 / 爷爷 yéye ㄧㄝˊ ˙ㄧㄝ |  | pendiente |
| 祖母 | zǔmǔ | ㄗㄨˇ ㄇㄨˇ | Abuela paterna | 奶奶 nǎinai ㄋㄞˇ ˙ㄋㄞ |  | pendiente |

### 👨‍👩‍👧 Papá, mamá y tíos · 父母和他們的兄弟姊妹 / 父母和他们的兄弟姊妹 · TOCFL A2 (nivel aproximado)

| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |
|---|---|---|---|---|---|---|
| 父親 / 父亲 | fùqīn | ㄈㄨˋ ㄑㄧㄣ | Papá | 爸爸 bàba ㄅㄚˋ ˙ㄅㄚ |  | pendiente |
| 母親 / 母亲 | mǔqīn | ㄇㄨˇ ㄑㄧㄣ | Mamá | 媽媽 / 妈妈 māma ㄇㄚ ˙ㄇㄚ |  | pendiente |
| 伯父 | bófù | ㄅㄛˊ ㄈㄨˋ | Tío, hermano mayor de papá | 伯伯 bóbo ㄅㄛˊ ˙ㄅㄛ |  | pendiente |
| 叔父 | shúfù | ㄕㄨˊ ㄈㄨˋ | Tío, hermano menor de papá | 叔叔 shúshu ㄕㄨˊ ˙ㄕㄨ |  | pendiente |
| 伯母 ⚠ | bómǔ | ㄅㄛˊ ㄇㄨˇ | Esposa del hermano mayor de papá | (la misma) | una sola vez | pendiente |
| 叔母 ⚠ | shúmǔ | ㄕㄨˊ ㄇㄨˇ | Esposa del hermano menor de papá | 嬸嬸 / 婶婶 shěnshen ㄕㄣˇ ˙ㄕㄣ ⚠ |  | pendiente |
| 姑母 ⚠ | gūmǔ | ㄍㄨ ㄇㄨˇ | Tía (hermana de papá) | 姑姑 gūgu ㄍㄨ ˙ㄍㄨ ⚠; 大姑 dàgū ㄉㄚˋ ㄍㄨ ⚠; 小姑 xiǎogū ㄒㄧㄠˇ ㄍㄨ ⚠ |  | pendiente |
| 姑父 | gūfù | ㄍㄨ ㄈㄨˋ | Esposo de la tía (hermana de papá) | 姑丈 gūzhàng ㄍㄨ ㄓㄤˋ |  | pendiente |
| 舅父 | jiùfù | ㄐㄧㄡˋ ㄈㄨˋ | Tío (hermano de mamá) | 舅舅 jiùjiu ㄐㄧㄡˋ ˙ㄐㄧㄡ |  | pendiente |
| 舅母 | jiùmǔ | ㄐㄧㄡˋ ㄇㄨˇ | Esposa del tío (hermano de mamá) | 舅媽 / 舅妈 jiùmā ㄐㄧㄡˋ ㄇㄚ |  | pendiente |
| 姨母 | yímǔ | ㄧˊ ㄇㄨˇ | Tía (hermana de mamá) | 阿姨 āyí ㄚ ㄧˊ |  | pendiente |
| 姨父 | yífù | ㄧˊ ㄈㄨˋ | Esposo de la tía (hermana de mamá) | 姨丈 yízhàng ㄧˊ ㄓㄤˋ |  | pendiente |

### 👫 Hermanos y pareja · 兄弟姊妹和夫妻 · TOCFL Prep (nivel aproximado)

| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |
|---|---|---|---|---|---|---|
| 自己 | zìjǐ | ㄗˋ ㄐㄧˇ | Yo | 我 wǒ ㄨㄛˇ | ancla «Yo» (fuera del conteo) | pendiente |
| 兄 | xiōng | ㄒㄩㄥ | Hermano mayor | 哥哥 gēge ㄍㄜ ˙ㄍㄜ |  | pendiente |
| 弟 | dì | ㄉㄧˋ | Hermano menor | 弟弟 dìdi ㄉㄧˋ ˙ㄉㄧ |  | pendiente |
| 姊 | jiě | ㄐㄧㄝˇ | Hermana mayor | 姊姊 jiějie ㄐㄧㄝˇ ˙ㄐㄧㄝ |  | pendiente |
| 妹 | mèi | ㄇㄟˋ | Hermana menor | 妹妹 mèimei ㄇㄟˋ ˙ㄇㄟ |  | pendiente |
| 夫 | fū | ㄈㄨ | Esposo | 老公 lǎogōng ㄌㄠˇ ㄍㄨㄥ |  | pendiente |
| 妻 | qī | ㄑㄧ | Esposa | 老婆 lǎopó ㄌㄠˇ ㄆㄛˊ |  | pendiente |

### 🧑‍🤝‍🧑 Cuñados y primos · 嫂、姊夫和堂表兄弟姊妹 · TOCFL B1 (nivel aproximado)

| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |
|---|---|---|---|---|---|---|
| 嫂 ⚠ | sǎo | ㄙㄠˇ | Cuñada, esposa del hermano mayor | 大嫂 dàsǎo ㄉㄚˋ ㄙㄠˇ ⚠ |  | pendiente |
| 弟婦 / 弟妇 ⚠ | dìfù | ㄉㄧˋ ㄈㄨˋ | Cuñada, esposa del hermano menor | 弟妹 dìmèi ㄉㄧˋ ㄇㄟˋ ⚠ |  | pendiente |
| 姊夫 | jiěfū | ㄐㄧㄝˇ ㄈㄨ | Cuñado, esposo de la hermana mayor | — |  | pendiente |
| 妹夫 | mèifū | ㄇㄟˋ ㄈㄨ | Cuñado, esposo de la hermana menor | — |  | pendiente |
| 堂兄 | tángxiōng | ㄊㄤˊ ㄒㄩㄥ | Primo mayor, hijo de un hermano de papá | 堂哥 tánggē ㄊㄤˊ ㄍㄜ |  | pendiente |
| 堂弟 | tángdì | ㄊㄤˊ ㄉㄧˋ | Primo menor, hijo de un hermano de papá | — |  | pendiente |
| 堂姊 ⚠ | tángjiě | ㄊㄤˊ ㄐㄧㄝˇ | Prima mayor, hija de un hermano de papá | — |  | pendiente |
| 堂妹 ⚠ | tángmèi | ㄊㄤˊ ㄇㄟˋ | Prima menor, hija de un hermano de papá | — |  | pendiente |
| 表兄 | biǎoxiōng | ㄅㄧㄠˇ ㄒㄩㄥ | Primo mayor, de otro apellido | 表哥 biǎogē ㄅㄧㄠˇ ㄍㄜ |  | pendiente |
| 表弟 | biǎodì | ㄅㄧㄠˇ ㄉㄧˋ | Primo menor, de otro apellido | — |  | pendiente |
| 表姊 ⚠ | biǎojiě | ㄅㄧㄠˇ ㄐㄧㄝˇ | Prima mayor, de otro apellido | 表姐 biǎojiě ㄅㄧㄠˇ ㄐㄧㄝˇ ⚠ |  | pendiente |
| 表妹 ⚠ | biǎomèi | ㄅㄧㄠˇ ㄇㄟˋ | Prima menor, de otro apellido | — |  | pendiente |

### 👶 Hijos, nueras y sobrinos · 兒女、媳婦和姪甥 / 儿女、媳妇和侄甥 · TOCFL A2 (nivel aproximado)

| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |
|---|---|---|---|---|---|---|
| 子 | zǐ | ㄗˇ | Hijo | 兒子 / 儿子 érzi ㄦˊ ˙ㄗ | cotidiano a la vista | pendiente |
| 女 | nǚ | ㄋㄩˇ | Hija | 女兒 / 女儿 nǚ'ér ㄋㄩˇ ㄦˊ | cotidiano a la vista | pendiente |
| 媳 | xí | ㄒㄧˊ | Nuera | 媳婦 / 媳妇 xífù ㄒㄧˊ ㄈㄨˋ | cotidiano a la vista | pendiente |
| 女婿 | nǚxù | ㄋㄩˇ ㄒㄩˋ | Yerno | — |  | pendiente |
| 姪 / 侄 | zhí | ㄓˊ | Sobrino (hijo del hermano) | 姪子 / 侄子 zhízi ㄓˊ ˙ㄗ |  | pendiente |
| 姪女 / 侄女 | zhínǚ | ㄓˊ ㄋㄩˇ | Sobrina (hija del hermano) | — |  | pendiente |
| 外甥 | wàishēng | ㄨㄞˋ ㄕㄥ | Sobrino (hijo de la hermana) | — |  | pendiente |
| 外甥女 | wàishēngnǚ | ㄨㄞˋ ㄕㄥ ㄋㄩˇ | Sobrina (hija de la hermana) | — |  | pendiente |

### 🍼 Nietos y bisnietos · 孫子和曾孫 / 孙子和曾孙 · TOCFL B1 (nivel aproximado)

| Formal (繁 / 简) | Pinyin | Zhuyin | Español | Cotidiano | Pantalla | revision |
|---|---|---|---|---|---|---|
| 孫 / 孙 | sūn | ㄙㄨㄣ | Nieto (hijo de mi hijo) | 孫子 / 孙子 sūnzi ㄙㄨㄣ ˙ㄗ |  | pendiente |
| 孫女 / 孙女 | sūnnǚ | ㄙㄨㄣ ㄋㄩˇ | Nieta (hija de mi hijo) | — |  | pendiente |
| 孫婦 / 孙妇 ⚠ | sūnfù | ㄙㄨㄣ ㄈㄨˋ | Esposa del nieto (hijo de mi hijo) | 孫媳婦 / 孙媳妇 sūnxífù ㄙㄨㄣ ㄒㄧˊ ㄈㄨˋ ⚠ |  | pendiente |
| 孫女婿 / 孙女婿 | sūnnǚxù | ㄙㄨㄣ ㄋㄩˇ ㄒㄩˋ | Esposo de la nieta (hija de mi hijo) | — |  | pendiente |
| 外孫 / 外孙 | wàisūn | ㄨㄞˋ ㄙㄨㄣ | Nieto (hijo de mi hija) | — |  | pendiente |
| 外孫女 / 外孙女 | wàisūnnǚ | ㄨㄞˋ ㄙㄨㄣ ㄋㄩˇ | Nieta (hija de mi hija) | — |  | pendiente |
| 外孫婦 / 外孙妇 | wàisūnfù | ㄨㄞˋ ㄙㄨㄣ ㄈㄨˋ | Esposa del nieto (hijo de mi hija) | — |  | pendiente |
| 外孫女婿 / 外孙女婿 | wàisūnnǚxù | ㄨㄞˋ ㄙㄨㄣ ㄋㄩˇ ㄒㄩˋ | Esposo de la nieta (hija de mi hija) | — |  | pendiente |
| 曾孫 / 曾孙 | zēngsūn | ㄗㄥ ㄙㄨㄣ | Bisnieto (por mi hijo) | — |  | pendiente |
| 曾孫女 / 曾孙女 | zēngsūnnǚ | ㄗㄥ ㄙㄨㄣ ㄋㄩˇ | Bisnieta (por mi hijo) | — |  | pendiente |
| 外曾孫 / 外曾孙 | wàizēngsūn | ㄨㄞˋ ㄗㄥ ㄙㄨㄣ | Bisnieto (por mi hija) | — |  | pendiente |
| 外曾孫女 / 外曾孙女 | wàizēngsūnnǚ | ㄨㄞˋ ㄗㄥ ㄙㄨㄣ ㄋㄩˇ | Bisnieta (por mi hija) | — |  | pendiente |

### 🧩 Cómo se arman los términos · 稱謂怎麼組成 / 称谓怎么组成 · TOCFL B1 (nivel aproximado)

- 外 wài ㄨㄞˋ: «De afuera»: la familia de mamá y los hijos de las mujeres de la familia. Ejemplos: 外公, 外甥, 外孫.
- 堂 táng ㄊㄤˊ · 表 biǎo ㄅㄧㄠˇ: 堂: primos con el mismo apellido. 表: primos de otro apellido. Ejemplos: 堂哥, 表哥.
- 兄 xiōng ㄒㄩㄥ · 姊 jiě ㄐㄧㄝˇ · 弟 dì ㄉㄧˋ · 妹 mèi ㄇㄟˋ · 伯 bó ㄅㄛˊ · 叔 shú ㄕㄨˊ: 兄 y 姊: mayores que yo; 弟 y 妹: menores. 伯: mayor que papá; 叔: menor que papá. Ejemplos: 兄, 姊, 弟, 妹, 伯父, 叔父.
- 曾 zēng ㄗㄥ: Una generación más lejos, hacia arriba y hacia abajo. Ejemplos: 曾祖父, 曾孫.

⚠ = `verificar: true` (letra chica en la captura).

## La fuente no trae forma cotidiana

En pantalla no se muestra la línea «cotidiano» (no se inventa una forma): 表弟, 表妹, 堂弟, 堂姊, 堂妹, 姊夫, 妹夫, 外甥, 外甥女, 女婿, 姪女, 外孫女婿, 外孫女, 外孫婦, 外孫, 孫女, 孫女婿, 外曾孫女, 外曾孫, 曾孫, 曾孫女.
