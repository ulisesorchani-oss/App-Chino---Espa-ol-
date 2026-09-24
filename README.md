# 中文 ⇄ Español — Huayu Diario

App web (PWA) para practicar chino mandarín y español: lecciones graduadas,
exámenes (HSK, TOCFL, DELE), práctica diaria con SRS, lectura de clásicos con
pinyin/tonos, evaluación de pronunciación por voz y síntesis de audio (TTS)
vía Microsoft Edge neural voices.

**Estado actual**: `app.js` (el "cerebro" de la app) se modularizó — pasó de
9.451 líneas en un solo archivo a **4.116 líneas**, con 11 módulos separados
por función (audio, diccionario, trazos, mazo de repaso, lectores, etc.). Ver
[`docs/historial-actualizaciones/`](docs/historial-actualizaciones/) para el
detalle de cada versión.

---

## Estructura del repo

### App principal

| Archivo | Qué hace |
|---|---|
| `index.html` | Estructura HTML + carga todos los scripts en el orden correcto |
| `app.js` | Núcleo: estado, eventos, lógica de juego (`checkAnswer`/`markWord`), dropdowns de módulos, popup de vocabulario, PWA |
| `style.css` | Estilos |
| `sw.js` | Service worker — cachea todo para que la app funcione offline |

### Módulos de `app.js` (extraídos, cada uno una responsabilidad)

| Archivo | Qué contiene |
|---|---|
| `audio-tts.js` | Velocidad, elección de voz, pedido de TTS al servidor con su fallback, `playAudio` |
| `dict.js` | Motor de búsqueda del diccionario (toque en una palabra → traducción) |
| `trazos.js` | Escritor de trazos Hanzi Writer (orden de trazos, práctica, respuesta a mano) |
| `srs.js` | Mazo de repaso espaciado (Leitner de 6 cajas) |
| `reader.js` | Lector de texto libre (pegás texto y lo lee, con pinyin interlineal) |
| `karaoke.js` | Resaltado de caracteres al ritmo del audio (lector/clásicos) |
| `classics-reader.js` | Lector de los 9 clásicos chinos |
| `lessons-graduated.js` | Quiz de lecciones graduadas HSK 3.0/TOCFL |
| `placement-test.js` | Test de colocación HSK adaptativo |
| `minimal-pairs.js` | Ejercicio de pares mínimos (discriminación tonal) |
| `data-embedded.js` | **Datos**: oraciones de práctica y vocabulario embebido (ver [Cómo agregar contenido nuevo](#cómo-agregar-contenido-nuevo)) |

Todos son scripts clásicos (sin `import`/`export`) que se cargan en orden
desde `index.html` — mismas variables/funciones globales que antes, solo que
repartidas en archivos más chicos.

### Contenido y datos

| Archivo | Qué es |
|---|---|
| `lessons.js`, `lessons-tocfl.js`, `lessons-extra.js`, `lessons-dele.js` | Lecciones graduadas y textos largos |
| `classics.js` | Los 9 clásicos chinos (texto original) |
| `dict-mini.js` | Diccionario offline zh↔es |
| `data-embedded.js` | Oraciones de práctica + vocabulario HSK/TOCFL |
| `data/` | Datos de exámenes en JSON (respaldo, poco usado — casi todo está embebido) |

### Pronunciación y voz

| Archivo | Qué hace |
|---|---|
| `voice-evaluator.js`, `VoiceRecorder.js`, `pitch-analyzer.js`, `config.js` | Evaluador de pronunciación (Whisper WASM local + análisis de tono) |
| `api/` | Endpoint serverless (Vercel, Python) para TTS (`/api/tts`) |

### Otros

| Archivo | Qué es |
|---|---|
| `stats.js`, `onboarding.js`, `text-utils.js` | Estadísticas, onboarding y utilidades de texto |
| `manifest.json`, `icons/` | PWA instalable |
| `README-Pronunciacion.md` | Documentación viva del módulo de pronunciación |
| `docs/historial-actualizaciones/` | Notas de actualización de versiones anteriores (histórico, ya aplicadas) |

## Documentación

- **Cómo agregar contenido nuevo** (lecciones, oraciones, vocabulario,
  clásicos): ver la sección de abajo.
- **Módulo de pronunciación** (arquitectura, cómo se decide el veredicto,
  calibración del umbral de confianza, tabla de constantes): ver
  [`README-Pronunciacion.md`](README-Pronunciacion.md).
- **Historial de actualizaciones** (kits `LEEME-*` de versiones anteriores,
  ya integrados en el código actual): ver
  [`docs/historial-actualizaciones/`](docs/historial-actualizaciones/).

## Cómo agregar contenido nuevo

Ninguno de estos cambios toca `app.js` ni los demás módulos de lógica —
son archivos de puro contenido.

### 1. Una lectura/lección larga ("📖 Leer lección" + Biblioteca)

Archivo: `lessons.js` (o `lessons-tocfl.js`/`lessons-extra.js`/`lessons-dele.js`
según el examen). Cada entrada de `window.LESSONS_DATA.lessons` es un objeto:

```js
{
    id: 'mi-leccion-1',           // único, requerido
    title: 'En el mercado',       // nombre completo
    label: 'Mercado (corto)',     // opcional: nombre corto en la Biblioteca
    group: 'Vida diaria',         // opcional: agrupa en la Biblioteca
    module: 'Mercado',            // TODO el módulo de oraciones es la lección
    // — o en vez de "module" —
    // ids: [101, 102, 103],      // oraciones puntuales = una SECCIÓN
    text_simp: '你好...(texto completo simplificado)',
    text_trad: '你好...(texto completo tradicional, opcional)',
    hsk: 2                        // opcional: nivel HSK de una lectura graduada
}
```

Si todavía no tenés el texto listo, agregala con `status: 'planned'`: aparece
en la Biblioteca como "· próximamente" (deshabilitada) hasta que la
completes.

### 2. Una oración de práctica nueva (tarjetas con hueco `___`)

Archivo: `data-embedded.js` → `EMBEDDED_SENTENCES` (módulo base "todas") o
`EMBEDDED_MODULE_DATA['NombreDelMódulo']` (un módulo específico). Cada
entrada:

```js
{
    "id": 999,
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
}
```

`___` marca el hueco que hay que completar; `*_full` es la oración
completa y `*_answer` la respuesta esperada.

### 3. Vocabulario HSK/TOCFL (palabra suelta, no oración)

Archivo: `data-embedded.js` → `EMBEDDED_MODULE_DATA['HSK3']` (o el nivel que
sea). Viaja como tupla compacta, no como objeto, para que el archivo pese
menos — se expande sola con `expandWordCards()` al abrir el módulo:

```js
["爱", "愛", "ài", "Amar", ["Gustar"]]
// [simplificado, tradicional|null, pinyin, español, alternativas|null]
```

Si el tradicional es igual al simplificado, poné `null` en su lugar (ej.
`["八", null, "bā", "Ocho", null]`).

### 4. Un clásico chino nuevo (texto original por bloques)

Archivo: `classics.js`. Cada entrada de `window.CLASSIC_TEXTS[claveDelMódulo]`:

```js
"Clasicos-MiClasico": {
    es: "Nombre en español", emoji: "📜", badge: "completo",
    intro: "Una línea de descripción.",
    blocks: [
        { n: "Capítulo 1", l: [
            ["原文en chino.", "Traducción al español."],
            ["Otra línea del bloque.", "Su traducción."]
        ] }
    ]
}
```

El tradicional se genera aparte (mapas `T_LINE`/`T_TITLE` horneados con
`opencc`) — no hace falta escribirlo a mano si solo estás agregando texto
nuevo con la traducción en `es`.

### Después de editar

1. Guardá el archivo y subí `VERSION` en `sw.js` (línea `const VERSION = 'vNNN'`)
   para que el service worker le avise a todos los dispositivos que hay
   contenido nuevo — si no, quien ya tiene la app instalada puede seguir
   viendo la versión vieja cacheada un tiempo.
2. Si agregaste un `id` de oración, no lo repitas con uno ya existente en el
   mismo archivo.
3. Probá en el navegador con refresco forzado (Ctrl+Shift+R) antes de dar
   por terminado el cambio.

## Despliegue

- **Front-end**: GitHub Pages / hosting estático a partir de `index.html`.
- **API de TTS**: Vercel (`vercel.json` + `api/`), Microsoft Edge neural
  voices vía `edge-tts`.
- El service worker (`sw.js`) versiona la caché de shell y de audios; al
  subir cambios de cualquier `.js`/`index.html`/`style.css`/`sw.js` conviene
  refresco forzado (Ctrl+Shift+R) para evitar ver la versión cacheada.

## Desarrollo local

```bash
pip install -r requirements.txt
python serve.py
```
