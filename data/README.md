# data/: staging histórico

**La app no lee estos archivos.** Todos los módulos (Diaria, HSK 1-9, TOCFL, DELE y Clásicos) viajan embebidos en el JS:

- `EMBEDDED_MODULE_DATA` y `EMBEDDED_SENTENCES` están en `data-embedded.js`.
- Las lecciones están en `lessons*.js`.

Esta carpeta se conserva como referencia de origen. **No edites acá esperando ver el cambio en la app**: el dato que se muestra está en el JS.

## Qué hay

| Ruta | Qué es |
|---|---|
| `MANIFIESTO.json` | Notas de origen y licencias del vocabulario HSK 3.0 (GF0025-2021) |
| `hsk1.json` … `hsk9.json` | Vocabulario HSK 3.0 por nivel, en el formato de origen |
| `exams/*.json` | Versiones viejas de HSK 1-5, TOCFL (frases útiles) y DELE |
| `sentences.json`, `data/sentences.json` | Oraciones de Práctica diaria, versión vieja |

## El respaldo `DATA_SOURCES` de `app.js`

`loadSentences()` solo pide un archivo de acá si el módulo **no** está en `EMBEDDED_MODULE_DATA`. Hoy todos están, así que ese camino no se usa. Varias rutas de `DATA_SOURCES` ni siquiera existen: `data/daily/`, `data/hsk30/`, `data/tocfl/`, `data/classics/` y `exams/hsk6.json`.

`sw.js` no precachea esta carpeta.
