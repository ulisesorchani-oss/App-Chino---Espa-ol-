# Lecturas tipo examen · HSK 4 · hoja de revisión

GENERADA por `tools/build-readings-examen.js` (no editar a mano). Nivel aproximado, no oficial. Los textos son originales, escritos para la app. `revision: pendiente` hasta que un hablante nativo los revise.

**Lista de referencia: HSK 3.0 (GF0025-2021)**, tal como está embebida en la app (`EMBEDDED_MODULE_DATA`): HSK 1–4 acumulado = 3166 palabras (HSK 1 = 497 · 1–2 = 1244 · 1–3 = 2193 · 1–9 = 10944). El encabezado de `data-embedded.js` avisa que HSK 4–9 no se re-verificó contra el original, así que «no está» significa «no está en la lista de la app».

**Regla de nivel (por palabras):** una palabra está dentro si figura en HSK 1..n (simplificado o tradicional, con erhua 儿 y partes fijas de patrones como …分之…) o se arma con palabras de la lista; si la lista la pone en un nivel más alto (毛笔 = HSK 5) está fuera aunque sus caracteres sean conocidos. Los nombres propios no cuentan. `*` = fuera de nivel. Detalle en `tools/lecturas-examen/nivel.js`.

| Tipo | Cobertura mínima | Tope de palabras fuera de nivel |
|---|---|---|
| `examen` | 90 % | 5 |
| `estudio` | 80 % | sin tope (entra solo como estudio, no en la práctica de examen) |

## Verificación contra las listas embebidas

| Tradicional | Simplificado | Nivel en la lista | Significado en la lista | ¿Dentro de HSK 4? |
|---|---|---|---|---|
| 悄悄 | 悄悄 | HSK 5 | Silenciosamente | **no** * |
| 擦 | 擦 | HSK 4 | Frotar | sí |
| 郊區 | 郊区 | HSK 5 | Suburbios | **no** * |
| 視頻 | 视频 | HSK 5 | Video | **no** * |
| 春聯 | 春联 | **no está** | — | **no** * |
| 毛筆 | 毛笔 | HSK 5 | Pincel chino | **no** * |
| 氣氛 | 气氛 | HSK 6 | Ambiente | **no** * |
| 現成 | 现成 | HSK 9 | Hecho | **no** * |
| 橫批 | 横批 | **no está** | — | **no** * |
| 婚禮 | 婚礼 | HSK 4 | Boda | sí |
| 晚點 | 晚点 | HSK 4 | Tarde | sí |
| 堵車 | 堵车 | HSK 4 | Tráfico | sí |
| 座位 | 座位 | HSK 2 | Asiento | sí |
| 省 | 省 | HSK 2 | Provincia | sí |

Nota: la lista registra 省 solo como «provincia» (HSK 2); el sentido «ahorrar» del texto 4 comparte la entrada pero no está registrado como tal. Se deja sin * por la entrada, a confirmar.

---

## 1. 🚄 错过的火车 / 錯過的火車 — El tren que se fue

`rx-h4-tren` · narración · HSK 4 · tipo: `examen` · revision: pendiente

### Tabla de control

| Control | Resultado |
|---|---|
| Largo | 146 hanzi (rango HSK 4: 120–200) |
| Nivel por palabras (HSK 3.0 (GF0025-2021), HSK 1–4) | 97.0 % (mínimo 90 %) · 99 palabras |
| Palabras fuera de nivel en el texto | 口气* (HSK 8) · 擦汗* (no está) · 悄悄* (HSK 5) — 3 de 5 permitidas |
| Nombres propios (no cuentan) | 小林 · 上海 |
| Coincidencias con palabra de nivel más alto, revisadas (cuentan como dentro) | — |
| Glosario | 11 palabras, 3 con * |
| Frase buscada 1 | «他一边擦汗，一边悄悄找座位» → sin coincidencia exacta (resultados sin relación) |
| Frase buscada 2 | «到火车站的时候，火车已经开走了» → sin coincidencia exacta (solo páginas generales sobre perder un tren) |

### Texto

| 简体 | 繁體 (s2tw) | Español |
|---|---|---|
| 小林要去上海参加朋友的婚礼。早上六点他就出门了，可是路上堵车，到火车站的时候，火车已经开走了。 | 小林要去上海參加朋友的婚禮。早上六點他就出門了，可是路上堵車，到火車站的時候，火車已經開走了。 | Xiao Lin va a Shanghái a la boda de un amigo. Salió de casa a las seis de la mañana, pero había mucho tránsito en el camino y, cuando llegó a la estación, el tren ya se había ido. |
| 他很着急，马上给朋友打电话。朋友笑着说：“别担心，婚礼下午才开始，你坐下一班车吧。” | 他很著急，馬上給朋友打電話。朋友笑著說：“別擔心，婚禮下午才開始，你坐下一班車吧。” | Muy nervioso, llamó enseguida a su amigo. El amigo le dijo, riendo: «No te preocupes, la boda empieza recién por la tarde; tomá el próximo tren». |
| 他松了一口气，在车站旁边的小饭馆吃了一碗面。没想到下一班车也晚点了一个小时。他到的时候，婚礼已经开始了，他一边擦汗，一边悄悄找座位，可是大家还是都看见了他。 | 他鬆了一口氣，在車站旁邊的小飯館吃了一碗麵。沒想到下一班車也晚點了一個小時。他到的時候，婚禮已經開始了，他一邊擦汗，一邊悄悄找座位，可是大家還是都看見了他。 | Suspiró aliviado y comió un tazón de fideos en un restaurante chico cerca de la estación. Pero, para sorpresa suya, el siguiente tren también se retrasó una hora. Cuando llegó, la boda ya había empezado; mientras se secaba el sudor buscaba su asiento sin hacer ruido, pero igual todos lo vieron. |

### Comprensión (✅ = correcta)

1. **¿Por qué Xiao Lin perdió el primer tren?** _(detalle)_
   - A) ✅ Había mucho tránsito en el camino. — El texto dice que salió a las seis, pero «路上堵车» (había mucho tránsito en el camino).
   - B) Salió de su casa demasiado tarde. — Salió temprano, a las seis de la mañana.
   - C) Se equivocó de estación. — Llegó a la estación correcta; el tren ya había salido.
   - D) Su amigo lo llamó por teléfono. — La llamada ocurre después de perder el tren, no antes.

2. **¿Qué pasó al final?** _(idea)_
   - A) ✅ Llegó cuando la boda ya había empezado. — Último párrafo: «他到的时候，婚礼已经开始了».
   - B) Llegó a la boda antes que los invitados. — El segundo tren también se retrasó, así que llegó tarde.
   - C) Se volvió a su casa sin ir a la boda. — Sí fue a la boda: buscó asiento y todos lo vieron.
   - D) Esperó a su amigo en la estación. — Quien lo esperaba era la boda; no hay nadie en la estación.

_(En pantalla el orden de las opciones se baraja; acá la correcta va primera.)_

### Banco de palabras

| # | Frase con hueco | Respuesta |
|---|---|---|
| 1 | 路上＿＿，到火车站的时候，火车已经开走了 | **堵车** |
| 2 | 他很＿＿，马上给朋友打电话 | **着急** |
| 3 | 在车站旁边的小饭馆吃了一＿＿面 | **碗** |
| 4 | 没想到下一班车也＿＿了一个小时 | **晚点** |
| 5 | 他到的时候，婚礼已经＿＿了 | **开始** |
| 6 | 他一边＿＿汗，一边悄悄找座位 | **擦** |

Palabras del banco: 堵车 · 着急 · 碗 · 晚点 · 开始 · 擦 · 护照 · 机场 (sobrantes: 护照 · 机场)

### Palabras parecidas

1. 别＿＿，婚礼下午才开始，你坐下一班车吧。  →  ✅ 担心 · ❌ 关心 · ❌ 小心
   - 担心 es «preocuparse»; 关心 es «interesarse por alguien, cuidar de él» y 小心 es «tener cuidado». Solo 担心 encaja con «别… (no te preocupes)».

### Glosario (* = fuera de nivel)

| 简体 | 繁體 | Categoría | Español | Nivel en la lista |
|---|---|---|---|---|
| 参加 | 參加 | verbo | asistir, participar en | HSK 2 |
| 婚礼 | 婚禮 | sustantivo | la boda | HSK 4 |
| 堵车 | 堵車 | verbo | haber mucho tránsito | HSK 4 |
| 着急 | 著急 | adjetivo | estar impaciente, nervioso | HSK 4 |
| 晚点 | 晚點 | verbo | retrasarse (un transporte) | HSK 4 |
| 松了一口气* | 鬆了一口氣* | expresión | suspirar aliviado | no está |
| 没想到 | 沒想到 | expresión | no imaginaba que; para sorpresa suya | HSK 4 |
| 一边…一边… | 一邊…一邊… | estructura | mientras…, a la vez que… | no está (se arma con palabras del nivel) |
| 擦汗* | 擦汗* | expresión | secarse el sudor | no está |
| 悄悄* | 悄悄* | adverbio | en silencio, sin hacer ruido | HSK 5 |
| 座位 | 座位 | sustantivo | el asiento | HSK 2 |

### Capa 2 (opcional)

- Nota: **他一边擦汗，一边找座位。** — 一边…一边… une dos acciones simultáneas: «mientras se secaba el sudor, buscaba asiento».
- Colocación: **参加婚礼** (參加婚禮) — asistir a una boda
- Colocación: **松了一口气** (鬆了一口氣) — suspirar aliviado

---

## 2. 📱 你每天用多长时间手机？ / 你每天用多長時間手機？ — ¿Cuánto tiempo usás el celular por día?

`rx-h4-encuesta` · expositivo · HSK 4 · tipo: `examen` · revision: pendiente

### Tabla de control

| Control | Resultado |
|---|---|
| Largo | 146 hanzi (rango HSK 4: 120–200) |
| Nivel por palabras (HSK 3.0 (GF0025-2021), HSK 1–4) | 98.0 % (mínimo 90 %) · 102 palabras |
| Palabras fuera de nivel en el texto | 聊天* (no está) · 视频* (HSK 5) — 2 de 5 permitidas |
| Nombres propios (no cuentan) | — |
| Coincidencias con palabra de nivel más alto, revisadas (cuentan como dentro) | — |
| Glosario | 11 palabras, 2 con * |
| Frase buscada 1 | «百分之四十的学生每天用手机超过五个小时» → sin coincidencia exacta (solo encuestas reales con otras cifras) |
| Frase buscada 2 | «睡觉前一个小时把手机放在别的房间里» → sin coincidencia exacta (consejos generales de sueño, otra redacción) |

### Texto

| 简体 | 繁體 (s2tw) | Español |
|---|---|---|
| 一所大学最近调查了三百名学生，问他们每天用多长时间手机。 | 一所大學最近調查了三百名學生，問他們每天用多長時間手機。 | Una universidad encuestó hace poco a trescientos estudiantes y les preguntó cuánto tiempo usan el celular por día. |
| 结果发现，百分之四十的学生每天用手机超过五个小时，百分之三十五的学生用三到五个小时，其他学生用得比较少。大部分同学用手机聊天、看视频和查资料。 | 結果發現，百分之四十的學生每天用手機超過五個小時，百分之三十五的學生用三到五個小時，其他學生用得比較少。大部分同學用手機聊天、看視頻和查資料。 | El resultado: el 40 % de los estudiantes usa el celular más de cinco horas por día, el 35 % lo usa de tres a cinco horas y los demás lo usan relativamente poco. La mayoría usa el celular para chatear, ver videos y buscar información. |
| 调查还发现，晚上十一点以后还在玩手机的学生，第二天上课时更容易觉得累。老师建议大家睡觉前一个小时把手机放在别的房间里。 | 調查還發現，晚上十一點以後還在玩手機的學生，第二天上課時更容易覺得累。老師建議大家睡覺前一個小時把手機放在別的房間裡。 | La encuesta también mostró que los estudiantes que siguen pegados al celular después de las once de la noche se sienten más cansados en clase al día siguiente. El docente recomienda dejar el celular en otra habitación una hora antes de dormir. |

### Comprensión (✅ = correcta)

1. **¿Qué porcentaje de los estudiantes usa el celular más de cinco horas por día?** _(detalle)_
   - A) ✅ El 40 % — Segundo párrafo: «百分之四十的学生每天用手机超过五个小时».
   - B) El 35 % — El 35 % es el grupo que lo usa de tres a cinco horas.
   - C) El 25 % — El 25 % no aparece en el texto; es lo que queda para «los demás» si se suman los otros dos grupos.
   - D) El 75 % — El 75 % sería la suma de los dos primeros grupos (más de tres horas), no solo el de más de cinco.

2. **¿Qué recomienda el docente?** _(idea)_
   - A) ✅ Dejar el celular en otra habitación antes de dormir. — Última oración: «老师建议大家睡觉前一个小时把手机放在别的房间里» (recomienda dejar el celular en otra habitación una hora antes de dormir).
   - B) Usar el celular solo para estudiar. — El texto no habla de limitar el celular a los estudios; solo menciona para qué lo usan.
   - C) Apagar el celular durante las clases. — No se menciona nada sobre las clases, sino sobre la noche antes de dormir.
   - D) Comprarse un celular nuevo. — Ninguna parte del texto sugiere comprar un celular.

_(En pantalla el orden de las opciones se baraja; acá la correcta va primera.)_

### Banco de palabras

| # | Frase con hueco | Respuesta |
|---|---|---|
| 1 | 一所大学最近＿＿了三百名学生 | **调查** |
| 2 | 百分之四十的学生每天用手机＿＿五个小时 | **超过** |
| 3 | 其他学生用得＿＿少 | **比较** |
| 4 | 大部分同学用手机聊天、看视频和＿＿资料 | **查** |
| 5 | 第二天上课时更容易觉得＿＿ | **累** |
| 6 | 老师＿＿大家睡觉前一个小时把手机放在别的房间里 | **建议** |

Palabras del banco: 调查 · 超过 · 比较 · 查 · 累 · 建议 · 比赛 · 照片 (sobrantes: 比赛 · 照片)

### Palabras parecidas

1. 百分之四十的学生每天用手机＿＿五个小时。  →  ✅ 超过 · ❌ 经过 · ❌ 通过
   - 超过 = «pasar de, superar» (una cantidad). 经过 = «pasar por, atravesar» y 通过 = «pasar a través de; por medio de»: no sirven para comparar con una cifra.
2. 老师建议大家睡觉前一个小时把手机放在＿＿房间里。  →  ✅ 别的 · ✅ 其他 · ❌ 另外
   - 别的 y 其他 significan «otro/otros» y ambos funcionan aquí. 另外 es «además, por otra parte» y no se pone delante de «房间».

### Glosario (* = fuera de nivel)

| 简体 | 繁體 | Categoría | Español | Nivel en la lista |
|---|---|---|---|---|
| 调查 | 調查 | verbo / sustantivo | encuestar; la encuesta | HSK 3 |
| 超过 | 超過 | verbo | superar, pasar de | HSK 2 |
| 百分之 | 百分之 | estructura | por ciento (百分之四十 = 40 %) | no está (se arma con palabras del nivel) |
| 其他 | 其他 | pronombre | los demás, otros | HSK 2 |
| 比较 | 比較 | adverbio | relativamente, bastante | HSK 3 |
| 大部分 | 大部分 | sustantivo | la mayor parte | HSK 2 |
| 聊天* | 聊天* | verbo | charlar, chatear | no está |
| 查资料 | 查資料 | expresión | buscar información | no está (se arma con palabras del nivel) |
| 容易 | 容易 | adjetivo | fácil; propenso a | HSK 3 |
| 建议 | 建議 | verbo | recomendar, sugerir | HSK 3 |
| 视频* | 視頻* | sustantivo | el video | HSK 5 |

### Capa 2 (opcional)

- Nota: **百分之四十** — Los porcentajes se dicen 百分之 + número: 百分之四十 = 40 %.
- Colocación: **做调查** (做調查) — hacer una encuesta
- Colocación: **查资料** (查資料) — buscar información

---

## 3. 🧧 贴春联 / 貼春聯 — Pegar los pareados de Año Nuevo Chino

`rx-h4-chunlian` · cultural · HSK 4 · tipo: `estudio` (fuera de la práctica de examen) · revision: pendiente

### Tabla de control

| Control | Resultado |
|---|---|
| Largo | 157 hanzi (rango HSK 4: 120–200) |
| Nivel por palabras (HSK 3.0 (GF0025-2021), HSK 1–4) | 89.7 % (mínimo 80 %) · 117 palabras |
| Palabras fuera de nivel en el texto | 春联* (no está) · 相配* (no está) · 横* (HSK 6) · 毛笔* (HSK 5) · 现成* (HSK 9) · 气氛* (HSK 6) — 6 (sin tope) |
| Nombres propios (no cuentan) | — |
| Coincidencias con palabra de nivel más alto, revisadas (cuentan como dentro) | 都会 |
| Glosario | 11 palabras, 9 con * |
| Frase buscada 1 | «上联贴在右边，下联贴在左边，门上面还会贴一张短短的横批» → sin coincidencia exacta; la costumbre (上联 a la derecha de quien mira la puerta) sí coincide con las fuentes, que también aclaran que hoy hay variantes → se agregó «按传统习惯» |
| Frase buscada 2 | «屋子里就有了过年的气氛» → sin coincidencia exacta |

### Texto

| 简体 | 繁體 (s2tw) | Español |
|---|---|---|
| 春节前，中国的家家户户都会在门口贴红色的春联。春联是两句字数相同、意思相配的话，写在红纸上，左右各一句。 | 春節前，中國的家家戶戶都會在門口貼紅色的春聯。春聯是兩句字數相同、意思相配的話，寫在紅紙上，左右各一句。 | Antes del Año Nuevo Chino (la Fiesta de la Primavera), todas las casas de China pegan en la puerta pareados rojos. Son dos frases con el mismo número de caracteres y de sentido complementario, escritas en papel rojo, una a cada lado. |
| 按传统习惯，站在门外看，上联贴在右边，下联贴在左边，门上面还会贴一张短短的横批。春联里常常有“平安”“幸福”“健康”这样的好词，人们希望新的一年一切顺利。 | 按傳統習慣，站在門外看，上聯貼在右邊，下聯貼在左邊，門上面還會貼一張短短的橫批。春聯裡常常有“平安”“幸福”“健康”這樣的好詞，人們希望新的一年一切順利。 | Según la costumbre tradicional, mirando la puerta desde afuera, el primer verso (上联) se pega a la derecha y el segundo (下联) a la izquierda; arriba de la puerta se suele pegar además una tira corta, el 横批. Los pareados llevan a menudo palabras auspiciosas como «paz», «felicidad» y «salud»: la gente desea que todo salga bien en el año nuevo. |
| 有的家庭自己用毛笔写春联，有的去市场买现成的。不管是写的还是买的，贴上春联以后，屋子里就有了过年的气氛。 | 有的家庭自己用毛筆寫春聯，有的去市場買現成的。不管是寫的還是買的，貼上春聯以後，屋子裡就有了過年的氣氛。 | Algunas familias escriben los pareados con pincel; otras los compran ya hechos en el mercado. Sean escritos o comprados, una vez pegados ya se respira el clima de Año Nuevo. |

### Comprensión (✅ = correcta)

1. **Según el texto, mirando la puerta desde afuera, ¿dónde se pega el primer verso (上联)?** _(detalle)_
   - A) ✅ A la derecha de la puerta. — Segundo párrafo: «上联贴在右边».
   - B) A la izquierda de la puerta. — A la izquierda va el segundo verso (下联).
   - C) Encima de la puerta. — Encima de la puerta se pega la tira corta, el 横批.
   - D) Dentro de la casa. — El texto habla de la puerta de entrada, no del interior.

2. **Todas las familias escriben ellas mismas los pareados con pincel.** _(vf)_
   - ✅ Falso — Falso: «有的家庭自己用毛笔写…，有的去市场买现成的». Algunas los escriben y otras los compran.

_(En pantalla el orden de las opciones se baraja; acá la correcta va primera.)_

### Banco de palabras

| # | Frase con hueco | Respuesta |
|---|---|---|
| 1 | 上联贴在＿＿边 | **右** |
| 2 | 门上面还会贴一张短短的＿＿ | **横批** |
| 3 | 人们希望新的一年一切＿＿ | **顺利** |
| 4 | 有的家庭自己用毛笔＿＿春联 | **写** |
| 5 | 有的去市场买＿＿的 | **现成** |
| 6 | 屋子里就有了过年的＿＿ | **气氛** |

Palabras del banco: 右 · 横批 · 顺利 · 写 · 现成 · 气氛 · 头发 · 医院 (sobrantes: 头发 · 医院)

### Palabras parecidas

1. 人们＿＿新的一年一切顺利。  →  ✅ 希望 · ❌ 愿望 · ❌ 失望
   - 希望 es el verbo «esperar, desear que». 愿望 es el sustantivo «deseo» (no lleva complemento así) y 失望 significa «decepcionarse».

### Glosario (* = fuera de nivel)

| 简体 | 繁體 | Categoría | Español | Nivel en la lista |
|---|---|---|---|---|
| 春联* | 春聯* | sustantivo | pareado de Año Nuevo Chino | no está |
| 家家户户* | 家家戶戶* | expresión | todas las familias, cada casa | HSK 8 |
| 相配* | 相配* | verbo | combinar, hacer juego | no está |
| 上联* | 上聯* | sustantivo | primer verso del pareado | no está |
| 下联* | 下聯* | sustantivo | segundo verso del pareado | no está |
| 横批* | 橫批* | sustantivo | tira horizontal sobre la puerta | no está |
| 平安 | 平安 | adjetivo | en paz, a salvo | HSK 2 |
| 顺利 | 順利 | adjetivo | sin contratiempos | HSK 2 |
| 毛笔* | 毛筆* | sustantivo | pincel de escritura | HSK 5 |
| 现成* | 現成* | adjetivo | ya hecho, listo para usar | HSK 9 |
| 气氛* | 氣氛* | sustantivo | el clima, la atmósfera | HSK 6 |

### Capa 2 (opcional)

- Nota: **家家户户** — Duplicación de 家 y 户: «cada casa, todas las familias». Sirve para decir «todo el mundo».
- Colocación: **贴春联** (貼春聯) — pegar los pareados de Año Nuevo Chino
- Colocación: **过年的气氛** (過年的氣氛) — el clima de Año Nuevo

---

## 4. 🏠 找房子 / 找房子 — Buscar casa

`rx-h4-casa` · cotidiano · HSK 4 · tipo: `examen` · revision: pendiente

### Tabla de control

| Control | Resultado |
|---|---|
| Largo | 122 hanzi (rango HSK 4: 120–200) |
| Nivel por palabras (HSK 3.0 (GF0025-2021), HSK 1–4) | 98.9 % (mínimo 90 %) · 90 palabras |
| Palabras fuera de nivel en el texto | 郊区* (HSK 5) — 1 de 5 permitidas |
| Nombres propios (no cuentan) | — |
| Coincidencias con palabra de nivel más alto, revisadas (cuentan como dentro) | 不算 |
| Glosario | 10 palabras, 1 con * |
| Frase buscada 1 | «第二个在郊区，房间大一些» → sin coincidencia exacta (solo una oración de diccionario con otra redacción) |
| Frase buscada 2 | «可以在地铁上看书，时间也不算浪费» → sin coincidencia exacta (solo notas sobre leer en el metro) |

### Texto

| 简体 | 繁體 (s2tw) | Español |
|---|---|---|
| 我下个月要搬家，所以最近一直在找房子。上周末我看了两个地方。 | 我下個月要搬家，所以最近一直在找房子。上週末我看了兩個地方。 | El mes que viene me mudo, así que últimamente estoy buscando casa. El fin de semana pasado fui a ver dos lugares. |
| 第一个离公司很近，走路只要十分钟，不过房间有点儿小，一个月一千八。第二个在郊区，房间大一些，一个月只要一千二，可是坐地铁要一个小时。 | 第一個離公司很近，走路只要十分鐘，不過房間有點兒小，一個月一千八。第二個在郊區，房間大一些，一個月只要一千二，可是坐地鐵要一個小時。 | El primero queda muy cerca de la oficina, a solo diez minutos a pie, pero la habitación es un poco chica y cuesta 1.800 por mes. El segundo está en las afueras, la habitación es algo más grande y cuesta solo 1.200 por mes, pero en subte se tarda una hora. |
| 我想了很久，最后选了第二个，因为我想省点儿钱，而且可以在地铁上看书，时间也不算浪费。 | 我想了很久，最後選了第二個，因為我想省點兒錢，而且可以在地鐵上看書，時間也不算浪費。 | Lo pensé mucho y al final elegí el segundo, porque quiero ahorrar un poco y, además, puedo leer en el subte, así que el tiempo tampoco se desperdicia. |

### Comprensión (✅ = correcta)

1. **¿Cuánto cuesta por mes el lugar que queda cerca de la oficina?** _(detalle)_
   - A) ✅ 1.800 — Segundo párrafo: «第一个离公司很近…一个月一千八».
   - B) 1.200 — 1.200 es el precio del segundo lugar, el de las afueras.
   - C) 2.000 — 2.000 no aparece en el texto.
   - D) 1.000 — 1.000 no aparece en el texto.

2. **¿Por qué elige el segundo lugar?** _(idea)_
   - A) ✅ Quiere ahorrar y puede leer en el viaje. — Último párrafo: «我想省点儿钱，而且可以在地铁上看书».
   - B) Le queda más cerca de la oficina. — La oficina queda cerca del primero; el segundo queda a una hora en subte.
   - C) La habitación es más pequeña. — La habitación pequeña es del primer lugar, y no es una ventaja.
   - D) Allí vive un amigo suyo. — El texto no menciona a ningún amigo.

_(En pantalla el orden de las opciones se baraja; acá la correcta va primera.)_

### Banco de palabras

| # | Frase con hueco | Respuesta |
|---|---|---|
| 1 | 我下个月要＿＿，所以最近一直在找房子 | **搬家** |
| 2 | 第一个离公司很＿＿ | **近** |
| 3 | 走路只要十分钟，不过房间有点儿＿＿ | **小** |
| 4 | 第二个在＿＿，房间大一些 | **郊区** |
| 5 | 我想了很久，最后＿＿了第二个 | **选** |
| 6 | 因为我想＿＿点儿钱 | **省** |

Palabras del banco: 搬家 · 近 · 小 · 郊区 · 选 · 省 · 热闹 · 周围 (sobrantes: 热闹 · 周围)

### Palabras parecidas

1. 因为我想＿＿点儿钱。  →  ✅ 省 · ❌ 花 · ❌ 浪费
   - 省 = «ahorrar». 花 = «gastar» y 浪费 = «desperdiciar»: ambas van en contra de «因为我想… (porque quiero…)», que da la razón de elegir lo más barato.

### Glosario (* = fuera de nivel)

| 简体 | 繁體 | Categoría | Español | Nivel en la lista |
|---|---|---|---|---|
| 搬家 | 搬家 | verbo | mudarse | HSK 3 |
| 一直 | 一直 | adverbio | todo el tiempo, sin parar | HSK 2 |
| 郊区* | 郊區* | sustantivo | las afueras | HSK 5 |
| 地铁 | 地鐵 | sustantivo | el subte, el metro | HSK 2 |
| 不过 | 不過 | conjunción | pero, sin embargo | HSK 2 |
| 房间 | 房間 | sustantivo | la habitación | HSK 1 |
| 省 | 省 | verbo | ahorrar | HSK 2 |
| 而且 | 而且 | conjunción | además, y también | HSK 2 |
| 浪费 | 浪費 | verbo | desperdiciar | HSK 3 |
| 算 | 算 | verbo | contar como, considerarse | HSK 2 |

### Capa 2 (opcional)

- Nota: **房间有点儿小 / 房间大一些** — 有点儿 + adjetivo expresa un matiz poco deseado («un poco chico»). Adjetivo + 一些 compara: «algo más grande».
- Colocación: **搬家** (搬家) — mudarse
- Colocación: **省钱** (省錢) — ahorrar dinero

---
