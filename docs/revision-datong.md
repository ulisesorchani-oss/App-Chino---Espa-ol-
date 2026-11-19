# 禮運大同篇 · hoja de revisión

GENERADA por `tools/build-datong.js` (no editar a mano, salvo el bloque «Constancia de revisión», que se conserva al regenerar).

**Fuente:** PDF «Presentación con traducción» (autoría a confirmar) (15 páginas de imágenes). **Permiso de uso: confirmado, informado por Ulises el 2026-11-19.** Fecha de la confirmación y autoría del PDF: no registradas. El PDF no está en el repo: solo la transcripción (`tools/clasico-datong/fuente.json`).

`revision`: todo **pendiente** (chino, zhuyin, pinyin derivado y traducción). Nada es `revisado` ni `nativo`. Una etiqueta distinta solo se escribe si la constancia de abajo registra quién y cuándo (regla 4 de «Después de editar» en el `README.md`).

## Constancia de revisión

<!-- constancia: se completa a mano; build-datong.js lo conserva tal cual -->
| Fecha | Quién | Qué se revisó | Resultado |
|---|---|---|---|
| — | — | — | — |
<!-- /constancia -->

## Título

- PDF, p.1: «SUTRA DE LA MANCOMUNIDAD». p.2, glosa por carácter: «(Cortesía - Transitar - Mundo Pacífico - Texto) “La Mancomunidad”».
- Interfaz: «Capítulo de la Gran Armonía» (`禮運大同篇` / `礼运大同篇`, `Lǐyùn Dàtóng piān`). En la interfaz, «Capítulo de la Gran Armonía». El PDF dice «SUTRA DE LA MANCOMUNIDAD»: «sutra» corresponde a 經 en contexto budista y 篇 es «capítulo». La elección final (Gran Armonía o Mancomunidad) es de Ulises y el maestro.
- «mancomunidad» no aparece en otros lugares de la interfaz; **sí** queda en la traducción literal de la frase 2 («será una mancomunidad»).

## Decisiones

- **pdf**: El PDF no se sube al repo (público): solo esta transcripción.
- **pinyin**: El pinyin que se muestra sale del zhuyin del PDF (tools/clasico-datong/zhuyin-pinyin.js), nunca de pinyin-pro. Sin fichas al tocar un carácter.
- **escritura**: Arranca en tradicional (como el PDF) si no se eligió una escritura para «HSK y el resto»; con 简 elegido, el texto sale en simplificado (OpenCC tw2s) y cada carácter conserva el mismo zhuyin del PDF (la misma sílaba, sobre su forma simplificada); el pinyin derivado tampoco cambia.
- **practica**: Sin práctica por ahora: el clásico no entra en el menú de Hoy (CLASSICS_MODULES) ni en la Biblioteca; solo en la lista de Clásicos.
- **puntuacion**: Se usa la puntuación de la versión frase por frase (p.2–9), tal cual (latina: , . ;). Las otras versiones puntúan distinto. Pasarla a la puntuación china completa (，。；「」) es decisión de Ulises.
- **终終**: p.4 escribe 终 (simplificado) en 使老有所終; p.11 y p.14 escriben 終. Se usa 終 en el tradicional.
- **鰥矜**: Se usa 鰥 (PDF, ㄍㄨㄢ). El texto base de Ulises decía 矜: queda anotado como variante.
- **於于**: Se usa 於 (p.6, p.7, p.12). La versión «solo tonos» (p.15) escribe 于.
- **comillas**: Sin 「」 en 大同: el PDF no las tiene.
- **Chino escrito por nosotros** (no está en el PDF; a revisar): el rótulo del bloque «全文 · Texto completo». También son nuestros, en español: la presentación («El texto completo, frase por frase, con el zhuyin y la traducción del PDF «Presentación con traducción». Tocá ㄅ para mostrar u ocultar el zhuyin.»), el nivel y el agrupado del pinyin del título («Lǐyùn Dàtóng piān»).

## Diferencias con el texto base de Ulises

Único carácter distinto: **矜** (texto base) → **鰥** (PDF). Además: el texto base usa 、 entre 鰥寡孤獨, 「大同」 y puntuación china; el PDF no.

## Pinyin: dónde el del PDF difiere del automático (pinyin-pro)

| Frase | Carácter | PDF (zhuyin → pinyin) | pinyin-pro |
|---|---|---|---|
| 9 | 長 | ㄓㄤˇ → zhǎng | cháng |
| 12 | 分 | ㄈㄣˋ → fèn | fēn |
| 13 | 惡 | ㄨˋ → wù | è |
| 15 | 惡 | ㄨˋ → wù | è |
| 17 | 謀 | ㄇㄡˇ → mǒu | móu |

Caracteres donde el pinyin derivado del zhuyin del PDF difiere de pinyin-pro (el resto coincide carácter por carácter). El PDF manda; 謀 = ㄇㄡˇ figura igual en p.8 y p.13 y puede ser un error del PDF: a revisar.

## Marcas de cambio de tono (3.º → 2.º, naranjas en p.11 y p.14–15)

| Frase | Texto | Carácter marcado | Confirmar con el maestro |
|---|---|---|---|
| 7 | 使老有所終 | 老 | clara |
| 7 | 使老有所終 | 有 | clara |
| 8 | 壯有所用 | 有 | clara |
| 9 | 幼有所長 | 所 | **ambigua en la imagen**: la marca arranca sobre el zhuyin de 有; medida, cae dentro de la caja de 所 en p.11 y p.14. A confirmar. |
| 11 | 廢疾者皆有所養 | 有 | clara |
| 12 | 男有分女有歸 | 女 | clara |

Marcas naranjas de cambio de tono (3.º → 2.º) de p.11 y p.14–15: frase y posición del carácter (desde 0, solo hanzi). La de 幼有所長 cae dentro de la caja de 所 en p.11 (x 458–523; 所 420–524) y en p.14 (x 300–366; 所 299–375).

## Erratas y dudas de la traducción (se anotan, no se corrigen)

1. Frase 13 (p.6): «no **sé** desperdiciarán» (lo esperable: «se»).
2. Nota de la frase 16 (p.7): «sino teme» (lo esperable: «sino que teme»).
3. p.1: «PRACTICAR LECTURA DE CARACTER» (lo esperable: «carácter»).
4. Estilo: «sólo» con tilde (frases 5 y 16); «la gran armonía» en minúscula (frase 20).

## Texto, zhuyin y pinyin derivado, frase por frase

| # | p. | Tradicional / simplificado | Zhuyin (PDF) | Pinyin (del zhuyin) | Traducción (PDF) |
|---|---|---|---|---|---|
| 1 | 2 | 大道之行也 / 大道之行也 | ㄉㄚˋ ㄉㄠˋ ㄓ ㄒㄧㄥˊ ㄧㄝˇ | dà dào zhī xíng yě | Cuando el Gran Tao esté actuando, |
| 2 | 2 | 天下為公 / 天下为公 | ㄊㄧㄢ ㄒㄧㄚˋ ㄨㄟˊ ㄍㄨㄥ | tiān xià wéi gōng | el mundo entero (bajo el cielo) será una mancomunidad, tendrá el propósito de ser para el bien común. |
| 3 | 2 | 選賢與能 / 选贤与能 | ㄒㄩㄢˇ ㄒㄧㄢˊ ㄩˇ ㄋㄥˊ | xuǎn xián yǔ néng | Las personas elegidas, virtuosas y capaces, ofrecerán ayuda, serán encomendadas por sus capacidades. |
| 4 | 2 | 講信修睦. / 讲信修睦. | ㄐㄧㄤˇ ㄒㄧㄣˋ ㄒㄧㄡ ㄇㄨˋ | jiǎng xìn xiū mù | En la comunicación habrá fe y confianza, cultivando la amistad entre vecinos, el buen trato y la armonía. |
| 5 | 3 | 故人不獨親其親, / 故人不独亲其亲, | ㄍㄨˋ ㄖㄣˊ ㄅㄨˋ ㄉㄨˊ ㄑㄧㄣ ㄑㄧˊ ㄑㄧㄣ | gù rén bù dú qīn qí qīn | El respeto a los mayores no será sólo hacia nuestros padres, se tratará a todos los mayores como nuestros propios padres. |
| 6 | 3 | 不獨子其子. / 不独子其子. | ㄅㄨˋ ㄉㄨˊ ㄗˇ ㄑㄧˊ ㄗˇ | bù dú zǐ qí zǐ | El cuidado de los niños no será solamente hacia nuestros hijos, se tratará a todos los niños como nuestros propios hijos. |
| 7 | 4 | 使老有所終 / 使老有所终 | ㄕˇ ㄌㄠˇ⁺ ㄧㄡˇ⁺ ㄙㄨㄛˇ ㄓㄨㄥ | shǐ lǎo yǒu suǒ zhōng | Los ancianos serán cuidados hasta el final (vivirán acorde a ello, pues en cada etapa de la vida todos cumplirán bien su función). |
| 8 | 4 | 壯有所用 / 壮有所用 | ㄓㄨㄤˋ ㄧㄡˇ⁺ ㄙㄨㄛˇ ㄩㄥˋ | zhuàng yǒu suǒ yòng | Los capaces (los jóvenes y adultos) harán uso de sus facultades en los trabajos. |
| 9 | 4 | 幼有所長 / 幼有所长 | ㄧㄡˋ ㄧㄡˇ ㄙㄨㄛˇ⁺ ㄓㄤˇ | yòu yǒu suǒ zhǎng | Los niños crecerán bien (serán cuidados, alimentados y educados). |
| 10 | 5 | 鰥寡孤獨 / 鳏寡孤独 | ㄍㄨㄢ ㄍㄨㄚˇ ㄍㄨ ㄉㄨˊ | guān guǎ gū dú | Los viudos y viudas, los huérfanos, los ancianos sin hijos |
| 11 | 5 | 廢疾者皆有所養; / 废疾者皆有所养; | ㄈㄟˋ ㄐㄧˊ ㄓㄜˇ ㄐㄧㄝ ㄧㄡˇ⁺ ㄙㄨㄛˇ ㄧㄤˇ | fèi jí zhě jiē yǒu suǒ yǎng | y las personas con discapacidad, todos y cada uno de ellos, tendrán cuidados y serán atendidos. |
| 12 | 6 | 男有分,女有歸, / 男有分,女有归, | ㄋㄢˊ ㄧㄡˇ ㄈㄣˋ ㄋㄩˇ⁺ ㄧㄡˇ ㄍㄨㄟ | nán yǒu fèn nǚ yǒu guī | Cada hombre tendrá su puesto (ocupación, deber) y cada mujer, un lugar donde retornar (hogar). |
| 13 | 6 | 貨惡其棄於地也 / 货恶其弃于地也 | ㄏㄨㄛˋ ㄨˋ ㄑㄧˊ ㄑㄧˋ ㄩˊ ㄉㄧˋ ㄧㄝˇ | huò wù qí qì yú dì yě | Los recursos naturales no sé desperdiciarán, ni echarán a perder. |
| 14 | 6 | 不必藏於己, / 不必藏于己, | ㄅㄨˊ ㄅㄧˋ ㄘㄤˊ ㄩˊ ㄐㄧˇ | bú bì cáng yú jǐ | Se compartirán y no guardarán para uno mismo. (Las capacidades, la fuerza física y los recursos no permanecen ociosos, ya que son ofrecidos en pos del bien común) |
| 15 | 7 | 力惡其不出於身也 / 力恶其不出于身也 | ㄌㄧˋ ㄨˋ ㄑㄧˊ ㄅㄨˋ ㄔㄨ ㄩˊ ㄕㄣ ㄧㄝˇ | lì wù qí bù chū yú shēn yě | Se repudiará la vagancia. La fuerza del cuerpo, las capacidades personales |
| 16 | 7 | 不必為己, / 不必为己, | ㄅㄨˊ ㄅㄧˋ ㄨㄟˋ ㄐㄧˇ | bú bì wèi jǐ | no serán sólo para abastecerse a uno mismo. (Cada persona no teme por su propia enfermedad, sino teme por no ser útil a los demás. Cada uno quiere cumplir con su justicia) |
| 17 | 8 | 是故謀閉而不興, / 是故谋闭而不兴, | ㄕˋ ㄍㄨˋ ㄇㄡˇ ㄅㄧˋ ㄦˊ ㄅㄨˋ ㄒㄧㄥ | shì gù mǒu bì ér bù xīng | Por lo tanto, las estratagemas, la intriga y la conspiración no tendrán vía y caerán en desuso. |
| 18 | 8 | 盜竊亂賊而不作, / 盗窃乱贼而不作, | ㄉㄠˋ ㄑㄧㄝˋ ㄌㄨㄢˋ ㄗㄟˊ ㄦˊ ㄅㄨˊ ㄗㄨㄛˋ | dào qiè luàn zéi ér bú zuò | Robos, disturbios, conspiradores, traidores y malvados, por eso, no podrán prosperar. |
| 19 | 9 | 故外戶而不閉, / 故外户而不闭, | ㄍㄨˋ ㄨㄞˋ ㄏㄨˋ ㄦˊ ㄅㄨˊ ㄅㄧˋ | gù wài hù ér bú bì | Por lo tanto, las puertas de las casas no necesitarán cerrarse. |
| 20 | 9 | 是謂大同. / 是谓大同. | ㄕˋ ㄨㄟˋ ㄉㄚˋ ㄊㄨㄥˊ | shì wèi dà tóng | Esto es lo que se denomina la gran armonía. |

⁺ = marca naranja de cambio de tono. La segunda versión del PDF (p.10–13) coincide sílaba por sílaba con esta tabla (lo verifica `tools/check-datong.js`).

## Fuera de esta versión

- La vista «solo tonos» (p.14–15) y la práctica quedan para después.
- Audio: el 🔊 de cada frase usa el mismo camino de voz que los demás clásicos (`speakCr` → servidor de voz, o la voz del sistema si falla). **No se verificó** cómo lee los polifónicos (惡, 為, 行, 長, 興, 鰥): el contenedor de desarrollo no llega al servidor de voz.
- Aparte (no es de esta rama): la tabla pinyin→zhuyin de `app.js` (`pzPinyinToZhuyin`) convierte «you» en «ㄧ» en lugar de «ㄧㄡ» (有, 又, 右…).
