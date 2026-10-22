# Pruebas automáticas

Todo lo que se usó para probar la app a mano-con-navegador vive acá (`tests/`) y en `tools/`
(`tools/test-*.js` y `tools/check-*.js`, que se quedan donde estaban). **Nada de esto se publica con la web:**
está en `.vercelignore`.

## Correr todo

```
node tests/run-all.js
```

Corre las 28 suites de `tests/` y las 8 de `tools/`, una por una, y al final muestra una tabla:

```
SUITE                 COMPROBACIONES  RESULTADO
ajustes-velocidad     69              🟢 VERDE
…
36 suites · 5274 comprobaciones · 36 verdes · 0 rojas
```

**Sin falsos verdes.** Una suite es verde solo si terminó con código 0, informó su cantidad de
comprobaciones (mayor que 0), no imprimió ningún `FAIL`/`FALLAS`/excepción y mostró su marca de «todo bien».
Si falla, da *timeout* (900 s por suite; `TIMEOUT_S=300` lo cambia), se cae, no informa comprobaciones o no puede
correr por una dependencia faltante, queda **ROJA** con el motivo y las últimas líneas de su salida.
El código de salida es 0 solo si todas son verdes (sirve para CI). Tarda unos 25–30 minutos en total.
En las `check-*` de `tools/`, «comprobaciones» es la cantidad de elementos revisados (scripts, lecciones, lecturas).

Opciones:

```
node tests/run-all.js ninos hsk   # solo las suites cuyo nombre contiene «ninos» o «hsk»
node tests/run-all.js --list      # lista las suites y lo que necesita cada una
```

Una suite conocida como rota o desactualizada **no se esconde**: se corre igual y se marca en la tabla con el
motivo (`NOTAS` al principio de `run-all.js`).

## Correr una sola suite

Las de `tools/` levantan su propio servidor y se corren directo:

```
node tools/test-lecturas-ui.js
```

Las de `tests/*.test.js` necesitan la app servida por HTTP y la variable `BASE_URL`:

```
python3 -m http.server 8960            # en la raíz del repo, en otra terminal
BASE_URL=http://localhost:8960 node tests/ninos-sonidos.test.js
```

(o simplemente `node tests/run-all.js ninos-sonidos`, que levanta el servidor solo).

## Qué necesita cada una

| Grupo | Servidor local | Playwright + Chromium | Red | Otros |
|---|---|---|---|---|
| `tests/*.test.js` (28) | sí (`BASE_URL`; `run-all` lo levanta) | sí | **no** (el audio y las llamadas a `/api/tts` se simulan) | — |
| `tools/test-*.js` (5) | lo levantan ellas | sí | no | — |
| `tools/check-ninos.js` | no | no | no | solo Node |
| `tools/check-undef.js` | no | no | no | ESLint (`npx`) |
| `tools/check-readings.js` | lo levanta | sí | no | Python con `pip install opencc` (opcional `OPENCC_PYTHONPATH`) |
| `tools/medir-tts.js` | — | — | **sí** (llama al API real) | no es una suite: mide, no verifica; `run-all` no la corre |

- **Playwright**: `npm i -D playwright` (o global) y un Chromium. Se busca como `playwright` y, si no, en
  `/opt/node22/lib/node_modules/playwright`. Chromium: variable `CHROMIUM`, o `PLAYWRIGHT_BROWSERS_PATH`
  (por defecto `/opt/pw-browsers`), o el que trae Playwright.
- **Salidas** (capturas, `meas.json`, `rows.json`): van a `SHOTS_DIR` (por defecto `<tmp>/ac-tests/<suite>/`).
  Nada se escribe dentro del repo.
- **Puertos**: ninguna suite fija un puerto; todas usan `BASE_URL`.
- `selector-nivel-botones` compara además los estilos contra otra copia de la app si le pasás
  `BASE_URL_REF=http://localhost:8961` (p. ej. `main` en otro puerto); sin eso, esa comparación se omite.

## Qué cubre cada suite de `tests/`

| Suite | Cubre |
|---|---|
| `ajustes-velocidad` | chip de velocidad del audio en Hoy, Ajustes y lecciones (es/zh × 3 temas) |
| `aprender-simple` | pantalla Aprender simplificada: nivel, abrir/cerrar con ✕ y con Atrás |
| `diaria-practicar` | Diaria → «Practicar frases», botón de escena y contraste |
| `entrenar`, `entrenar-grilla` | pantalla Entrenar (secciones, Exámenes, Lecturas de estudio) y su grilla a 320/360 px |
| `escritura-pinyin` | capa de errores y pinyin por familia (HSK/TOCFL), carga de la tabla |
| `escritura-tradicional` | 6 pantallas de lección × escrituras 简/繁 |
| `hoja-modulos`, `hoja-ninos` | hoja de módulos (tabla módulo → botón, es-cn, Atrás) y pista Niños |
| `keywords-hsk`, `keywords-lecciones` | palabras clave de las lecciones (datos en `tests/data/`) |
| `lecciones-nombres`, `lecciones-tocfl-contraste` | nombres propios en lecciones (karaoke, audio, pinyin) y contraste en lecciones TOCFL |
| `lecturas-lista`, `lecturas-tocfl-b1` | lista de Lecturas (grupos, tarjetas, etiquetas) y lecturas TOCFL B1 |
| `navegacion-tanda1`, `navegacion-tanda2` | botón Atrás: capas apiladas, audio, tips, estadísticas ↔ respaldo |
| `ninos-pantalla`, `ninos-sonidos` | pantalla Niños y tarjetas de sonidos |
| `onboarding` | primer uso: pantallas, «Desde cero», «Ya sé algo», saltar |
| `ordenar-banco` | ejercicio de ordenar (usa `tests/lib/vocabcheck-lib.js`) |
| `practica-atras`, `practica-generadores`, `practica-lecturas` | práctica: Atrás en sesión, generadores y práctica de lecturas |
| `segmentador` | corte de palabras (escritorio, sin `Intl.Segmenter` y Android simulado) |
| `selector-nivel-botones` | selector de nivel de Aprender: opciones sin corte, colores, 320/360 px |
| `tocfl-menu-lecciones` | menú TOCFL en la hoja de módulos y en Lecciones |
| `voz-lecciones` | botones de voz/ciclo en lecciones, podcast y tarjetas de Hoy |

## Cómo se escribe una suite nueva

1. Archivo `tests/<nombre>.test.js` que arranca con
   `const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');`
   (`chromium.launch({ ...LAUNCH })`, `page.goto(APP_URL)`, capturas en `shots('<nombre>')`).
2. Al final imprime **una línea** `comprobaciones N · FAILS M` y sale con código distinto de 0 si `M > 0`.
3. Si una comprobación falla, imprime una línea que empiece con `FAIL`.

`run-all.js` descubre solo los `*.test.js`.

## Datos personales y secretos

El repo es público. Las pruebas no usan claves, tokens ni datos personales: trabajan con datos de la app,
perfiles de navegador vacíos y audio simulado. Antes de subir una suite nueva, buscá con
`grep -rniE "token|secret|api[_-]?key|password|@[a-z0-9.-]+\.[a-z]{2,}" tests/ tools/`.
