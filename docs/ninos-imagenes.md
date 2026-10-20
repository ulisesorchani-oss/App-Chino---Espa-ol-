# Niños — guía para generar las imágenes

> Generado por `node tools/gen-ninos-imagenes.js` a partir de `lessons-ninos.js`, `ninos-sonidos.js` y `docs/ninos-imagenes-prompts.json`.
> **No se edita a mano**: editá el JSON (o las lecciones) y volvé a correr el script. `--check` verifica que no falte ni sobre ningún prompt.

## Resumen

| Qué | Cantidad |
|---|---|
| Imágenes de palabras (se reutilizan entre lecciones) | **144** |
| Portadas de lección (escena con los personajes) | **15** |
| Portadas de «Sonidos del español» (1 general + 9 tarjetas) | **10** |
| **Total** | **169** |

Hoy la app usa emoji; el campo `art` (`null`) de cada lección, palabra y opción de «Escuchá y tocá» está reservado para estas imágenes.

## 1. Cómo usar los prompts

1. **Estilo (siempre al principio de cada prompt):**

```text
Children's picture-book illustration, flat vector style with soft rounded shapes and clean medium-weight outlines, warm bright pastel palette, friendly and simple, plain white background, single centered subject, no text, no letters, no numbers, no logos, safe for young children
```

2. **Prompt negativo** (si el generador lo admite):

```text
text, letters, words, numbers, watermark, logo, brand names, realistic photo, scary, dark, creepy, gore, extra fingers, distorted hands, blurry, cluttered background
```

3. **Prompt completo** = `ESTILO` + `, ` + el texto de la tabla. En las **portadas** agregá, entre el estilo y la escena, la descripción de los personajes que aparecen (indicados en cada lección). Ejemplo de palabra: `Children's picture-book illustration, flat vecto…, a classic black-and-white soccer ball`. En las palabras, «a child» es un chico cualquiera; si querés coherencia total, reemplazalo por Lin o por Sofi.

4. **Personajes** (usar SIEMPRE el mismo texto para que se parezcan en todas las escenas; si el generador acepta imágenes de referencia o una semilla, generá primero una hoja de personaje —frente, perfil y tres cuartos, cara neutra y feliz— y usala de referencia):

   - **Lin** — 7-year-old Chinese boy, short straight black hair with a small fringe, round friendly face, big dark eyes; at school he wears a white Argentine school smock (guardapolvo) over a red sweater and a blue backpack; at home a yellow T-shirt
   - **Sofi** — 7-year-old Argentine girl, light-brown wavy hair in two ponytails with sky-blue ribbons, warm tan skin, freckles, big smile; white school smock (guardapolvo)
   - **Seño** — young woman teacher in her thirties, shoulder-length dark brown hair, round glasses, kind smile; white school smock (guardapolvo) over a light-blue blouse
   - **Mamá** — Chinese woman in her thirties, black hair in a low ponytail, gentle smile; green cardigan, often with a kitchen apron
   - **Kiosquero** — friendly middle-aged Argentine man with a grey moustache and a flat cap, striped apron, behind the window of a small street kiosk
   - **Familia de Sofi** — father (short dark beard, plaid shirt), mother (curly hair, orange top), grandmother (grey hair in a bun, lilac cardigan), little brother (toddler, round cheeks)

5. **Formato y archivos:**

| Tipo | Carpeta | Proporción | Tamaño | Peso |
|---|---|---|---|---|
| palabras | `img/ninos/palabras/` | 1:1 | 512 × 512 | hasta 40 KB (WebP) |
| portadas | `img/ninos/portadas/` | 4:3 | 1200 × 900 | hasta 120 KB (WebP) |
| sonidos | `img/ninos/sonidos/` | 4:3 | 1200 × 900 | hasta 120 KB (WebP) |

   Nombre de archivo = el que figura en cada tabla (minúsculas, sin acentos, `ñ` → `ny`). Fondo blanco liso (o transparente) y sin texto dentro de la imagen.

6. **Cómo se conectan** (cuando haya imágenes; hoy no hace falta tocar nada): en `lessons-ninos.js` / `ninos-sonidos.js`, el campo `art` de la pieza pasa de `null` a `{ "src": "img/ninos/palabras/pelota.webp", "alt": "Una pelota de fútbol" }`. `ninos-ui.js` ya dibuja el `<img>` cuando hay `art.src` y el emoji cuando no, así que se puede ir cargando de a poco. Al sumar las imágenes habrá que decidir qué se precachea en `sw.js` (169 imágenes de ~40–120 KB son varios MB: conviene cachear al usarlas, no todas de entrada).

## 2. Lección por lección

### 1 · ¡Hola! Me llamo Lin — 你好！我叫林 · `ni-hola` · 🌱 6–7 · unidad 1

**Portada** · `img/ninos/portadas/ni-hola.webp` · 4:3 · emoji hoy: 👋

> Lin, the new boy, arrives at the school gate waving; Seño welcomes him and Sofi smiles beside her; the school patio behind, morning sun
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | buen día | 早上好 | 🌞 | `buen-dia.webp` | a smiling child waving good morning in front of a bright rising sun, school gate in the background |
| 2 | hola | 你好 | 👋 | `hola.webp` | a child waving hello with one hand and a big smile |
| 3 | me llamo | 我叫 | 🙋 | `me-llamo.webp` | a child pointing at their own chest with a proud smile, a blank name tag stuck on the sweater |
| 4 | ¿cómo te llamás? | 你叫什么名字？ | ❓ | `como-te-llamas.webp` | a teacher bending toward a shy child with a curious smile, a speech bubble containing only a question mark |
| 5 | jugar | 玩 | 🎲 | `jugar.webp` | two children happily playing with colorful toy blocks |
| 6 | gracias | 谢谢 | 🙏 | `gracias.webp` | a child with hands pressed together in thanks and a small heart floating above |
| 7 | patio | 操场 | 🏫 | `patio.webp` | a sunny school playground with a basketball hoop and hopscotch squares, no people |
| 8 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | a classic black-and-white soccer ball |
| 9 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | a glass of milk next to a small milk carton |
| 10 | lápiz *(opción de «Escuchá y tocá»)* | 铅笔 | ✏️ | `lapiz.webp` | a yellow pencil with a pink eraser |
| 11 | agua *(opción de «Escuchá y tocá»)* | 水 | 💧 | `agua.webp` | a glass of clear water with a water droplet |
| 12 | mamá *(opción de «Escuchá y tocá»)* | 妈妈 | 👩 | `mama.webp` | a smiling Chinese mother with black hair in a low ponytail, shoulders-up portrait |
| 13 | cuaderno *(opción de «Escuchá y tocá»)* | 本子 | 📓 | `cuaderno.webp` | a spiral school notebook with a colorful blank cover |
| 14 | seño *(opción de «Escuchá y tocá»)* | 老师 | 👩‍🏫 | `senyo.webp` | a friendly young woman teacher in a white school smock holding a book, shoulders-up portrait |
| 15 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | a blue school backpack |
| 16 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | a small orange-juice carton with a straw next to an orange slice |

### 2 · En el cole — 在学校 · `ni-cole` · 🌱 6–7 · unidad 2

**Portada** · `img/ninos/portadas/ni-cole.webp` · 4:3 · emoji hoy: 🎒

> classroom scene: Lin at his desk searching in his open backpack for a pencil, Sofi pointing helpfully, Seño at a blank blackboard
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | seño | 老师 | 👩‍🏫 | `senyo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 2 | cuaderno | 本子 | 📓 | `cuaderno.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 3 | lápiz | 铅笔 | ✏️ | `lapiz.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 4 | mochila | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 5 | ¿dónde está? | 在哪里？ | 📍 | `donde-esta.webp` | a child searching with a hand above the eyes and a puzzled look, a question mark floating above |
| 6 | acá | 这里 | 👇 | `aca.webp` | a child pointing at the floor right in front of them, a bold arrow pointing down |
| 7 | escribir | 写字 | ✍️ | `escribir.webp` | a child writing in a notebook with a pencil, tongue out in concentration |
| 8 | gol *(opción de «Escuchá y tocá»)* | 进球 | 🥅 | `gol.webp` | a soccer ball flying into a goal net with confetti around it |
| 9 | té *(opción de «Escuchá y tocá»)* | 茶 | 🍵 | `te.webp` | a cup of hot tea with rising steam and a tea-bag string |
| 10 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | campera *(opción de «Escuchá y tocá»)* | 外套 | 🧥 | `campera.webp` | a puffy blue winter jacket with a zipper |
| 12 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 13 | plaza *(opción de «Escuchá y tocá»)* | 公园 | 🌳 | `plaza.webp` | a sunny neighborhood park with trees, a bench and a swing, no people |
| 14 | mamá *(opción de «Escuchá y tocá»)* | 妈妈 | 👩 | `mama.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 15 | baño *(opción de «Escuchá y tocá»)* | 厕所 | 🚻 | `banyo.webp` | a cute small toilet and sink in a bright school bathroom |

### 3 · Seño, ¿puedo…? — 老师，我可以……吗？ · `ni-frases-utiles` · 🌿 8–10 · unidad 2

**Portada** · `img/ninos/portadas/ni-frases-utiles.webp` · 4:3 · emoji hoy: 🙋

> Lin raising his hand in class to ask the teacher; thought bubbles with small pictograms (a toilet, a water glass, a pencil) instead of words
>
> *Personajes:* Lin (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | ¿puedo ir al baño? | 我可以去厕所吗？ | 🚻 | `puedo-ir-al-banyo.webp` | a child raising a hand politely to ask the teacher, a thought bubble with a small toilet picture |
| 2 | no entiendo | 我不明白 | 🤷 | `no-entiendo.webp` | a child with a puzzled face shrugging with palms up and a question mark above the head |
| 3 | otra vez | 再一次 | 🔁 | `otra-vez.webp` | a teacher showing a picture card to a child, a circular repeat arrow beside them |
| 4 | me prestás | 你借给我 | 🤲 | `me-prestas.webp` | a child with open hands asking a classmate who holds out a pencil |
| 5 | tomá | 拿去吧 | 🤝 | `toma.webp` | one child handing a pencil to another child with both hands, smiling |
| 6 | tengo sed | 我渴了 | 🥤 | `tengo-sed.webp` | a thirsty child with a dry tongue looking longingly at a water bottle, a sweat drop |
| 7 | agua | 水 | 💧 | `agua.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 8 | baño *(opción de «Escuchá y tocá»)* | 厕所 | 🚻 | `banyo.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 9 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | lápiz *(opción de «Escuchá y tocá»)* | 铅笔 | ✏️ | `lapiz.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | gol *(opción de «Escuchá y tocá»)* | 进球 | 🥅 | `gol.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 13 | té *(opción de «Escuchá y tocá»)* | 茶 | 🍵 | `te.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 14 | plaza *(opción de «Escuchá y tocá»)* | 公园 | 🌳 | `plaza.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 15 | seño *(opción de «Escuchá y tocá»)* | 老师 | 👩‍🏫 | `senyo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 16 | campera *(opción de «Escuchá y tocá»)* | 外套 | 🧥 | `campera.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 17 | mamá *(opción de «Escuchá y tocá»)* | 妈妈 | 👩 | `mama.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |

### 4 · Mi familia — 我的家人 · `ni-familia` · 🌱 6–7 · unidad 3

**Portada** · `img/ninos/portadas/ni-familia.webp` · 4:3 · emoji hoy: 👪

> Sofi shows Lin a framed family photo (father, mother, grandmother, little brother) in a classroom; Lin smiles
>
> *Personajes:* Lin, Sofi, Familia de Sofi (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | mirá | 看 | 👀 | `mira.webp` | a child pointing to the side with wide curious eyes, an arrow showing the direction |
| 2 | familia | 家人 | 👪 | `familia.webp` | a happy family portrait: father, mother, grandmother, a little brother and a girl, standing close together |
| 3 | mamá | 妈妈 | 👩 | `mama.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 4 | papá | 爸爸 | 👨 | `papa.webp` | a smiling father with a short dark beard, shoulders-up portrait |
| 5 | abuela | 奶奶 / 外婆 | 👵 | `abuela.webp` | a kind grandmother with grey hair in a bun and a lilac cardigan, shoulders-up portrait |
| 6 | hermanito | 小弟弟 | 👦 | `hermanito.webp` | a toddler boy with round cheeks smiling and holding a toy, little brother |
| 7 | hermana mayor | 姐姐 | 👧 | `hermana-mayor.webp` | a teenage girl with a ponytail smiling next to a smaller child, older sister |
| 8 | ¿y vos? | 你呢？ | 💬 | `y-vos.webp` | a child tilting the head toward the viewer with an open palm, a question mark bubble |
| 9 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |

### 5 · Tengo hambre — 我饿了 · `ni-merienda` · 🌿 8–10 · unidad 4

**Portada** · `img/ninos/portadas/ni-merienda.webp` · 4:3 · emoji hoy: 🥐

> home kitchen table in afternoon light: Mamá serves milk and medialunas to Lin
>
> *Personajes:* Lin (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | merienda | 下午点心 | 🍪 | `merienda.webp` | a snack table with a cup of milk, a plate of small croissants and cookies |
| 2 | tengo hambre | 我饿了 | 🍽️ | `tengo-hambre.webp` | a child holding their tummy with a rumbling stomach and an empty plate |
| 3 | leche | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 4 | jugo | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 5 | medialunas | 牛角包 | 🥐 | `medialunas.webp` | three golden Argentine medialunas (small sweet croissants) on a plate |
| 6 | ¡qué rico! | 真好吃！ | 😋 | `que-rico.webp` | a child tasting a treat with eyes closed and rosy cheeks, a delighted 'yum' face |
| 7 | más | 更多 | ➕ | `mas.webp` | a child holding out an empty plate asking for more, a plus sign floating above |
| 8 | lleno | 饱 | 😌 | `lleno.webp` | a child patting a full round belly with a content smile, an empty plate in front |
| 9 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | cuaderno *(opción de «Escuchá y tocá»)* | 本子 | 📓 | `cuaderno.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | campera *(opción de «Escuchá y tocá»)* | 外套 | 🧥 | `campera.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 13 | agua *(opción de «Escuchá y tocá»)* | 水 | 💧 | `agua.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 14 | lápiz *(opción de «Escuchá y tocá»)* | 铅笔 | ✏️ | `lapiz.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 15 | mamá *(opción de «Escuchá y tocá»)* | 妈妈 | 👩 | `mama.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 16 | seño *(opción de «Escuchá y tocá»)* | 老师 | 👩‍🏫 | `senyo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 17 | baño *(opción de «Escuchá y tocá»)* | 厕所 | 🚻 | `banyo.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |

### 6 · Me duele la panza — 我肚子疼 · `ni-me-duele` · 🌿 8–10 · unidad 5

**Portada** · `img/ninos/portadas/ni-me-duele.webp` · 4:3 · emoji hoy: 🤒

> Lin on the sofa wrapped in a blanket holding his tummy; Mamá brings a cup of hot tea and a jacket
>
> *Personajes:* Lin (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | me duele la panza | 我肚子疼 | 😣 | `me-duele-la-panza.webp` | a child hunched over holding their stomach with a pained face and a small zigzag mark on the tummy |
| 2 | ¿qué te pasa? | 你怎么了？ | 🤔 | `que-te-pasa.webp` | a mother kneeling beside a sad child with a worried, caring expression |
| 3 | fiebre | 发烧 | 🌡️ | `fiebre.webp` | a thermometer with a high temperature next to a child's flushed face |
| 4 | frío | 冷 | 🥶 | `frio.webp` | a child shivering with a blue nose and hugging themselves, snowflakes around |
| 5 | campera | 外套 | 🧥 | `campera.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 6 | descansá | 休息一下 | 🛌 | `descansa.webp` | a child resting in bed under a blanket with a pillow, a moon in the window |
| 7 | té | 茶 | 🍵 | `te.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 8 | mejor | 更好 | 👍 | `mejor.webp` | a child smiling with a big thumbs up and sparkles around, healthy glow |
| 9 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | cuaderno *(opción de «Escuchá y tocá»)* | 本子 | 📓 | `cuaderno.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | gol *(opción de «Escuchá y tocá»)* | 进球 | 🥅 | `gol.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 13 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 14 | baño *(opción de «Escuchá y tocá»)* | 厕所 | 🚻 | `banyo.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 15 | lápiz *(opción de «Escuchá y tocá»)* | 铅笔 | ✏️ | `lapiz.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 16 | plaza *(opción de «Escuchá y tocá»)* | 公园 | 🌳 | `plaza.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |

### 7 · ¡Jugamos en la plaza! — 我们去公园玩！ · `ni-plaza` · 🌱 6–7 · unidad 6

**Portada** · `img/ninos/portadas/ni-plaza.webp` · 4:3 · emoji hoy: ⚽

> Sofi and Lin playing soccer in a sunny neighborhood plaza with trees and a swing, celebrating a goal
>
> *Personajes:* Lin, Sofi (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | plaza | 公园 | 🌳 | `plaza.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 2 | pelota | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 3 | ¡dale! | 好啊！ | 🙌 | `dale.webp` | two children high-fiving enthusiastically |
| 4 | pasame | 传给我 | ➡️ | `pasame.webp` | a child kicking a soccer ball toward another child who holds out both hands, a dotted path arrow |
| 5 | te toca a vos | 轮到你了 | 👉 | `te-toca-a-vos.webp` | a child pointing at another child inviting them to play, a soccer ball at their feet |
| 6 | gol | 进球 | 🥅 | `gol.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 7 | jugás | 你玩 | 🏃 | `jugas.webp` | a child running and playing with a ball, joyful |
| 8 | cuaderno *(opción de «Escuchá y tocá»)* | 本子 | 📓 | `cuaderno.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 9 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | té *(opción de «Escuchá y tocá»)* | 茶 | 🍵 | `te.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 13 | baño *(opción de «Escuchá y tocá»)* | 厕所 | 🚻 | `banyo.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 14 | hola *(opción de «Escuchá y tocá»)* | 你好 | 👋 | `hola.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 15 | agua *(opción de «Escuchá y tocá»)* | 水 | 💧 | `agua.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 16 | campera *(opción de «Escuchá y tocá»)* | 外套 | 🧥 | `campera.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |

### 8 · Colores y números — 颜色和数字 · `ni-colores` · 🌱 6–7 · unidad 7

**Portada** · `img/ninos/portadas/ni-colores.webp` · 4:3 · emoji hoy: 🎨

> art class: Lin and Sofi painting at easels with red and green paint, colored pencils in a cup, Seño smiling, four pencils on the desk
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | color | 颜色 | 🎨 | `color.webp` | an artist's paint palette with colorful blobs and a brush |
| 2 | rojo | 红色 | 🔴 | `rojo.webp` | a bright red apple next to a big red paint swatch |
| 3 | verde | 绿色 | 🟢 | `verde.webp` | a green leaf next to a big green paint swatch |
| 4 | amarillo | 黄色 | 🟡 | `amarillo.webp` | a yellow sun next to a big yellow paint swatch |
| 5 | uno | 一 | 1️⃣ | `uno.webp` | one single colored pencil standing up |
| 6 | dos | 二 | 2️⃣ | `dos.webp` | two colored pencils side by side |
| 7 | tres | 三 | 3️⃣ | `tres.webp` | three colored pencils side by side |
| 8 | cuatro | 四 | 4️⃣ | `cuatro.webp` | four colored pencils side by side |
| 9 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |

### 9 · Mi mascota — 我的宠物 · `ni-animales` · 🌿 8–10 · unidad 8

**Portada** · `img/ninos/portadas/ni-animales.webp` · 4:3 · emoji hoy: 🐶

> classroom circle: Sofi hugging her small brown dog Firulais, Lin holding a grey cat, a small bird in a cage, Seño asking
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | mascota | 宠物 | 🐾 | `mascota.webp` | a happy child hugging a small dog |
| 2 | perro | 狗 | 🐶 | `perro.webp` | a friendly small brown dog sitting with its tongue out |
| 3 | gato | 猫 | 🐱 | `gato.webp` | a cute grey tabby cat sitting |
| 4 | pájaro | 小鸟 | 🐦 | `pajaro.webp` | a small colorful songbird on a branch |
| 5 | grande | 大 | 🐘 | `grande.webp` | a big elephant standing next to a tiny mouse, to show large size |
| 6 | chiquito | 很小 | 🤏 | `chiquito.webp` | a tiny kitten resting on a child's open palm, to show small size |
| 7 | simpático | 讨人喜欢 | 😊 | `simpatico.webp` | a cheerful friendly child waving with small hearts around |
| 8 | se llama | 它叫 | 🏷️ | `se-llama.webp` | a small dog wearing a collar with a blank bone-shaped name tag |
| 9 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | plaza *(opción de «Escuchá y tocá»)* | 公园 | 🌳 | `plaza.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 13 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |

### 10 · ¡Feliz cumple! — 生日快乐！ · `ni-cumple` · 🌱 6–7 · unidad 9

**Portada** · `img/ninos/portadas/ni-cumple.webp` · 4:3 · emoji hoy: 🎂

> classroom birthday party: Sofi blowing out seven candles on a cake, Lin offering a wrapped gift, Seño holding the cake, balloons
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | cumple | 生日 | 🎉 | `cumple.webp` | a birthday party scene with balloons, streamers and confetti |
| 2 | ¡feliz cumple! | 生日快乐！ | 🥳 | `feliz-cumple.webp` | children in party hats cheering around a cake with arms raised |
| 3 | regalo | 礼物 | 🎁 | `regalo.webp` | a wrapped gift box with a big ribbon bow |
| 4 | torta | 蛋糕 | 🎂 | `torta.webp` | a layered birthday cake with strawberries and frosting |
| 5 | velitas | 小蜡烛 | 🕯️ | `velitas.webp` | seven small colorful birthday candles with little flames |
| 6 | siete | 七 | 7️⃣ | `siete.webp` | seven colorful balloons tied together |
| 7 | años | 岁 | 🎈 | `anyos.webp` | a happy child holding up seven fingers next to a cake |
| 8 | soplá | 吹一吹 | 💨 | `sopla.webp` | a child puffing out the cheeks and blowing out candles, wind lines |
| 9 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | lápiz *(opción de «Escuchá y tocá»)* | 铅笔 | ✏️ | `lapiz.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 13 | medialunas *(opción de «Escuchá y tocá»)* | 牛角包 | 🥐 | `medialunas.webp` | ↩ misma imagen que en `ni-merienda` (ya descrita) |
| 14 | papá *(opción de «Escuchá y tocá»)* | 爸爸 | 👨 | `papa.webp` | ↩ misma imagen que en `ni-familia` (ya descrita) |
| 15 | tres *(opción de «Escuchá y tocá»)* | 三 | 3️⃣ | `tres.webp` | ↩ misma imagen que en `ni-colores` (ya descrita) |
| 16 | cuatro *(opción de «Escuchá y tocá»)* | 四 | 4️⃣ | `cuatro.webp` | ↩ misma imagen que en `ni-colores` (ya descrita) |

### 11 · En el kiosco — 在小卖部 · `ni-kiosco` · 🌿 8–10 · unidad 10

**Portada** · `img/ninos/portadas/ni-kiosco.webp` · 4:3 · emoji hoy: 🏪

> street kiosk: Lin points at an alfajor behind the window, the Kiosquero smiles and hands it over, Mamá holds a few coins
>
> *Personajes:* Lin, Kiosquero (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | kiosco | 小卖部 | 🏪 | `kiosco.webp` | a small Argentine street kiosk with a window full of candy and magazines and a striped awning, no people |
| 2 | alfajor | 阿尔法霍饼干 | 🍪 | `alfajor.webp` | a round sandwich cookie (alfajor) covered in chocolate, one cut open to show dulce de leche |
| 3 | chocolate | 巧克力 | 🍫 | `chocolate.webp` | a chocolate bar partly unwrapped with squares showing |
| 4 | dulce de leche | 牛奶焦糖酱 | 🍮 | `dulce-de-leche.webp` | a glass jar of golden-brown dulce de leche with a spoon dripping |
| 5 | por favor | 请 | 🙏 | `por-favor.webp` | a child with hands together asking politely with sparkling eyes |
| 6 | ¿cuánto sale? | 多少钱？ | 💰 | `cuanto-sale.webp` | a child holding a few coins and asking a kiosk seller, a price-tag shape with a question mark |
| 7 | pesos | 比索 | 💵 | `pesos.webp` | a few generic banknotes and coins fanned out (no real currency details) |
| 8 | diez | 十 | 🔟 | `diez.webp` | ten small round candies arranged in two rows of five |
| 9 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 10 | leche *(opción de «Escuchá y tocá»)* | 牛奶 | 🥛 | `leche.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | plaza *(opción de «Escuchá y tocá»)* | 公园 | 🌳 | `plaza.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 12 | baño *(opción de «Escuchá y tocá»)* | 厕所 | 🚻 | `banyo.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 13 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 14 | cuatro *(opción de «Escuchá y tocá»)* | 四 | 4️⃣ | `cuatro.webp` | ↩ misma imagen que en `ni-colores` (ya descrita) |
| 15 | tres *(opción de «Escuchá y tocá»)* | 三 | 3️⃣ | `tres.webp` | ↩ misma imagen que en `ni-colores` (ya descrita) |

### 12 · Hoy llueve — 今天下雨 · `ni-ropa` · 🌿 8–10 · unidad 11

**Portada** · `img/ninos/portadas/ni-ropa.webp` · 4:3 · emoji hoy: ☔

> rainy morning at home: Lin in a white guardapolvo and sneakers, Mamá hands him an umbrella and a jacket, rain outside the window
>
> *Personajes:* Lin (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | hoy | 今天 | 📅 | `hoy.webp` | a big sun above a desk calendar with one day circled (no readable numbers) |
| 2 | llueve | 下雨 | 🌧️ | `llueve.webp` | a rainy day: grey cloud with raindrops over a puddle, a child in a yellow raincoat |
| 3 | hace frío | 天气冷 | 🥶 | `hace-frio.webp` | a thermometer showing cold with snowflakes next to a child in a scarf shivering |
| 4 | llevá | 带上 | 🧳 | `lleva.webp` | a child packing a backpack and putting a jacket inside |
| 5 | ponete | 穿上 | 👚 | `ponete.webp` | a child pulling on a jacket, putting it on |
| 6 | guardapolvo | 校服罩衫 | 🥼 | `guardapolvo.webp` | a white Argentine school smock (guardapolvo) with a collar and buttons hanging on a hanger |
| 7 | zapatillas | 运动鞋 | 👟 | `zapatillas.webp` | a pair of colorful sneakers |
| 8 | paraguas | 雨伞 | ☂️ | `paraguas.webp` | an open red umbrella with raindrops |
| 9 | campera *(opción de «Escuchá y tocá»)* | 外套 | 🧥 | `campera.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 10 | mochila *(opción de «Escuchá y tocá»)* | 书包 | 🎒 | `mochila.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 11 | pelota *(opción de «Escuchá y tocá»)* | 球 | ⚽ | `pelota.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 12 | lápiz *(opción de «Escuchá y tocá»)* | 铅笔 | ✏️ | `lapiz.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 13 | té *(opción de «Escuchá y tocá»)* | 茶 | 🍵 | `te.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |
| 14 | gato *(opción de «Escuchá y tocá»)* | 猫 | 🐱 | `gato.webp` | ↩ misma imagen que en `ni-animales` (ya descrita) |
| 15 | papá *(opción de «Escuchá y tocá»)* | 爸爸 | 👨 | `papa.webp` | ↩ misma imagen que en `ni-familia` (ya descrita) |

### 13 · Simón dice — 西蒙说 · `ni-cuerpo` · 🌱 6–7 · unidad 12

**Portada** · `img/ninos/portadas/ni-cuerpo.webp` · 4:3 · emoji hoy: 🙌

> gym class: Seño in front of a line of kids (Lin, Sofi) all touching their heads, playing «Simón dice» in a sports hall
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | Simón dice | 西蒙说 | 🗣️ | `simon-dice.webp` | a teacher with one finger raised giving an instruction while a group of kids copies the pose |
| 2 | cabeza | 头 | 😃 | `cabeza.webp` | a child touching the top of their head with both hands, smiling |
| 3 | manos | 手 | 🙌 | `manos.webp` | a child raising both hands high with open palms |
| 4 | pies | 脚 | 🦶 | `pies.webp` | close-up of a child's two sneakered feet side by side |
| 5 | ojos | 眼睛 | 👀 | `ojos.webp` | close-up of a child's big bright eyes |
| 6 | nariz | 鼻子 | 👃 | `nariz.webp` | a child touching their nose with one finger, funny face |
| 7 | arriba | 上面；向上 | ⬆️ | `arriba.webp` | a child stretching both arms up toward the sky, a big upward arrow |
| 8 | ¡qué risa! | 真好笑！ | 😂 | `que-risa.webp` | a child laughing out loud with tears of joy |

### 14 · ¡A comer! — 吃饭啦！ · `ni-almuerzo` · 🌿 8–10 · unidad 13

**Portada** · `img/ninos/portadas/ni-almuerzo.webp` · 4:3 · emoji hoy: 🍽️

> family lunch table: Lin and Mamá sitting with milanesa and mashed potatoes, a salad bowl, glasses of water and juice
>
> *Personajes:* Lin, Familia de Sofi (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | ¡a comer! | 吃饭啦！ | 🍽️ | `a-comer.webp` | a set table with plates and steaming food and a happy child sitting ready to eat |
| 2 | ¿qué hay de comer? | 有什么吃的？ | ❓ | `que-hay-de-comer.webp` | a child peeking into a steaming pot with a curious expression and a question mark |
| 3 | milanesa | 炸肉排 | 🥩 | `milanesa.webp` | a golden breaded milanesa cutlet on a plate with a lemon wedge |
| 4 | puré | 土豆泥 | 🥔 | `pure.webp` | a scoop of creamy mashed potatoes on a plate |
| 5 | ensalada | 沙拉 | 🥗 | `ensalada.webp` | a bowl of fresh salad with tomato, lettuce and carrot |
| 6 | tenedor | 叉子 | 🍴 | `tenedor.webp` | a single silver fork |
| 7 | postre | 甜点 | 🍨 | `postre.webp` | a bowl of vanilla ice cream with a cherry on top |
| 8 | jugo *(opción de «Escuchá y tocá»)* | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 9 | agua *(opción de «Escuchá y tocá»)* | 水 | 💧 | `agua.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |

### 15 · ¿Qué día es hoy? — 今天星期几？ · `ni-dias` · 🌱 6–7 · unidad 14

**Portada** · `img/ninos/portadas/ni-dias.webp` · 4:3 · emoji hoy: 📅

> classroom wall with a big colorful weekly calendar (seven columns, no readable text); Seño points, Lin and Sofi raise their hands
>
> *Personajes:* Lin, Sofi, Seño (copiar su descripción de la sección 1).

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | ¿qué día es hoy? | 今天星期几？ | 📅 | `que-dia-es-hoy.webp` | a teacher pointing at a big wall calendar (a week grid without readable text) while kids look |
| 2 | lunes | 星期一 | 🟥 | `lunes.webp` | a weekly calendar page with the first column highlighted in red |
| 3 | martes | 星期二 | 🟧 | `martes.webp` | a weekly calendar page with the second column highlighted in orange |
| 4 | miércoles | 星期三 | 🟨 | `miercoles.webp` | a weekly calendar page with the third column highlighted in yellow |
| 5 | jueves | 星期四 | 🟩 | `jueves.webp` | a weekly calendar page with the fourth column highlighted in green |
| 6 | viernes | 星期五 | 🟦 | `viernes.webp` | a weekly calendar page with the fifth column highlighted in blue |
| 7 | sábado | 星期六 | 🟪 | `sabado.webp` | a weekly calendar page with the sixth column highlighted in purple, a small soccer ball beside it |
| 8 | domingo | 星期天 | ⬜ | `domingo.webp` | a weekly calendar page with the seventh column highlighted in white with a sun, a cozy house beside it |

## 3. Sonidos del español

**Portada general** · `img/ninos/sonidos/sonidos-general.webp` · 4:3 · emoji hoy: 🔊

> a smiling cartoon mouth and an ear connected by sound waves and musical notes, in Chinese red and Argentine sky blue

### A E I O U — Cinco vocales (五个元音) · `so-vocales`

**Portada** · `img/ninos/sonidos/so-vocales.webp` · 4:3 · emoji hoy: 🅰️

> five big friendly cartoon mouths, each shaped differently to say a vowel, in five colors, no letters

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | mamá | 妈妈 | 👩 | `mama.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 2 | mesa | 桌子 | 🪑 | `mesa.webp` | a simple wooden table with a chair |
| 3 | isla | 岛 | 🏝️ | `isla.webp` | a small tropical island with a palm tree |
| 4 | oso | 熊 | 🐻 | `oso.webp` | a friendly brown bear sitting |
| 5 | uva | 葡萄 | 🍇 | `uva.webp` | a bunch of purple grapes with a leaf |

### H h — La H no suena (h 不发音) · `so-h`

**Portada** · `img/ninos/sonidos/so-h.webp` · 4:3 · emoji hoy: 🤫

> a child with a finger on the lips saying shh, next to a faded dashed empty speech bubble

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | hola | 你好 | 👋 | `hola.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 2 | helado | 冰淇淋 | 🍦 | `helado.webp` | an ice-cream cone with two scoops |
| 3 | huevo | 鸡蛋 | 🥚 | `huevo.webp` | a whole white egg next to a cracked egg showing the yolk |
| 4 | hormiga | 蚂蚁 | 🐜 | `hormiga.webp` | a cute cartoon ant carrying a crumb |

### J j — La J suena como la H del pinyin (j 像拼音的 h) · `so-j`

**Portada** · `img/ninos/sonidos/so-j.webp` · 4:3 · emoji hoy: 🧃

> a child blowing a soft breath onto a mirror that fogs up

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | jugo | 果汁 | 🧃 | `jugo.webp` | ↩ misma imagen que en `ni-hola` (ya descrita) |
| 2 | jirafa | 长颈鹿 | 🦒 | `jirafa.webp` | a tall smiling giraffe with a long neck |
| 3 | naranja | 橙子 | 🍊 | `naranja.webp` | an orange fruit with a leaf and a slice |
| 4 | ojo | 眼睛 | 👁️ | `ojo.webp` | a single big friendly cartoon eye |

### LL ll · Y y — LL e Y en Argentina (阿根廷的 ll 和 y) · `so-ll`

**Portada** · `img/ninos/sonidos/so-ll.webp` · 4:3 · emoji hoy: 🌧️

> a child making a shh sound with lips pursed and sound waves, rain falling behind

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | lluvia | 下雨 | 🌧️ | `lluvia.webp` | rain falling from a cloud onto a puddle |
| 2 | pollo | 鸡肉 | 🍗 | `pollo.webp` | a roast chicken drumstick on a plate |
| 3 | playa | 海滩 | 🏖️ | `playa.webp` | a sunny beach with sand, a beach umbrella and gentle waves |
| 4 | calle | 街道 | 🛣️ | `calle.webp` | a quiet city street with small houses and a crosswalk, no people |

### RR rr · R — La RR vibra (rr 要颤动舌头) · `so-rr`

**Portada** · `img/ninos/sonidos/so-rr.webp` · 4:3 · emoji hoy: 🐶

> a little toy motor revving with vibration lines next to a child curling the tongue

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | perro | 狗 | 🐶 | `perro.webp` | ↩ misma imagen que en `ni-animales` (ya descrita) |
| 2 | rojo | 红色 | 🔴 | `rojo.webp` | ↩ misma imagen que en `ni-colores` (ya descrita) |
| 3 | ratón | 老鼠 | 🐭 | `raton.webp` | a small grey mouse with big ears holding a piece of cheese |
| 4 | carro | 汽车 | 🚗 | `carro.webp` | a cute red toy car |

### Ñ ñ — La Ñ (ñ 的读法) · `so-n`

**Portada** · `img/ninos/sonidos/so-n.webp` · 4:3 · emoji hoy: 🧒

> a child smiling and saying nyo with a wavy ribbon curl above the head

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | niño | 男孩 | 🧒 | `ninyo.webp` | a smiling boy waving |
| 2 | araña | 蜘蛛 | 🕷️ | `aranya.webp` | a friendly cartoon spider on its web |
| 3 | piña | 菠萝 | 🍍 | `pinya.webp` | a whole pineapple |
| 4 | año | 年；岁 | 🎈 | `anyo.webp` | a calendar page with a big bright circle and balloons, to show a year |

### Z z · C (e, i) · S s — Z, C y S suenan igual (z、c、s 读起来一样) · `so-z`

**Portada** · `img/ninos/sonidos/so-z.webp` · 4:3 · emoji hoy: ☀️

> a friendly snake in an S-curve making an sss sound under the sun

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | zapatillas | 运动鞋 | 👟 | `zapatillas.webp` | ↩ misma imagen que en `ni-ropa` (ya descrita) |
| 2 | cielo | 天空 | ☁️ | `cielo.webp` | a bright blue sky with fluffy clouds |
| 3 | sol | 太阳 | ☀️ | `sol.webp` | a smiling sun with rays |
| 4 | zorro | 狐狸 | 🦊 | `zorro.webp` | a friendly orange fox sitting |

### QU qu · C (a, o, u) — QU suena como K (qu 读 k) · `so-qu`

**Portada** · `img/ninos/sonidos/so-qu.webp` · 4:3 · emoji hoy: 🧀

> a cartoon cheese wedge with a pop burst of sound lines

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | queso | 奶酪 | 🧀 | `queso.webp` | a wedge of cheese with holes |
| 2 | casa | 房子 | 🏠 | `casa.webp` | a cozy house with a red roof and a chimney |
| 3 | coco | 椰子 | 🥥 | `coco.webp` | a coconut cut in half with a straw |
| 4 | cuatro | 四 | 4️⃣ | `cuatro.webp` | ↩ misma imagen que en `ni-colores` (ya descrita) |

### V v · B b — V y B suenan igual (v 和 b 读音一样) · `so-v`

**Portada** · `img/ninos/sonidos/so-v.webp` · 4:3 · emoji hoy: 🐄

> two lips pressed together making a b sound with a bubble popping

| # | Español | 中文 | Emoji hoy | Archivo (`img/ninos/palabras/`) | Prompt (agregar el estilo antes) |
|---|---|---|---|---|---|
| 1 | vaca | 奶牛 | 🐄 | `vaca.webp` | a friendly cow with black patches |
| 2 | uva | 葡萄 | 🍇 | `uva.webp` | ↩ misma imagen que en `sonidos:so-vocales` (ya descrita) |
| 3 | vaso | 杯子 | 🥛 | `vaso.webp` | a clear drinking glass of milk |
| 4 | baño | 厕所 | 🚻 | `banyo.webp` | ↩ misma imagen que en `ni-cole` (ya descrita) |

## 4. Lista de verificación al recibir las imágenes

- [ ] Mismo estilo y paleta en todas; los personajes se reconocen de una escena a otra.
- [ ] Sin texto, letras ni números dentro de la imagen (el calendario es solo una grilla de colores).
- [ ] Nada que asuste o resulte inadecuado para chicos de 6 a 10 años; sin marcas reales.
- [ ] Las banderas y la ropa argentinas (guardapolvo blanco, celeste y blanco) son correctas; los rasgos de Lin y de Mamá son respetuosos y no caricaturescos.
- [ ] Cada archivo con el nombre exacto de la tabla y dentro del peso indicado.
