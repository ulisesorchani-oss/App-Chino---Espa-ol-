# Pruebas automáticas

Todo lo que se usó para probar la app a mano-con-navegador vive acá (`tests/`) y en `tools/`
(`tools/test-*.js` y `tools/check-*.js`, que se quedan donde estaban). **Nada de esto se publica con la web:**
está en `.vercelignore`.

## Correr todo

```
node tests/run-all.js
```

Corre las 32 suites de `tests/` y las 8 de `tools/`, una por una, y al final muestra una tabla:

```
SUITE                 COMPROBACIONES  RESULTADO
ajustes-velocidad     69              🟢 VERDE
…
36 suites · 5274 comprobaciones · 36 verdes · 0 rojas
```

**Sin falsos verdes.** Una suite es verde solo si terminó con código 0, informó su cantidad de
comprobaciones (mayor que 0), no imprimió ningún `FAIL`/`FALLAS`/excepción, mostró su marca de «todo bien»
y no declaró que salteó algo. Cada resultado es uno de estos:

| Resultado | Cuándo |
|---|---|
| 🟢 VERDE | corrió completa y todo pasó |
| 🟡 PARCIAL | corrió y pasó, pero salteó una parte (la suite imprime `PARCIAL: motivo`; también `SKIP_CONTRAST=1` en `test-dele-layout`). El motivo va en la tabla |
| 🟡 OMITIDA | no se pudo correr (p. ej. falta `pip install opencc` para `check-readings`) o la suite imprimió `OMITIDA: motivo` |
| 🔴 ROJO | falló, *timeout* (900 s por suite; `TIMEOUT_S=300` lo cambia), se cayó, o no informó comprobaciones |

Una parcial u omitida **nunca** se muestra como verde. Código de salida: `0` = todo verde, `1` = hay alguna roja,
`3` = sin rojas pero con parciales u omitidas (`--permitir-parciales` lo convierte en 0, para un CI que sabe que
no tiene OpenCC, por ejemplo). Tarda unos 25–30 minutos en total.
En las `check-*` de `tools/`, «comprobaciones» es la cantidad de elementos revisados (scripts, lecciones, lecturas).

Opciones:

```
node tests/run-all.js ninos hsk   # solo las suites cuyo nombre contiene «ninos» o «hsk»
node tests/run-all.js --list [filtro]   # lista las suites (o las que coinciden) y lo que necesita cada una
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
| `tests/*.test.js` (31, de navegador) | sí (`BASE_URL`; `run-all` lo levanta) | sí | **no** (el audio y las llamadas a `/api/tts` se simulan) | — |
| `tests/api-tts.test.js` | no | no | **no** (edge-tts va simulado) | Python 3 + `fastapi`; sin eso figura 🟡 OMITIDA |
| `tools/test-*.js` (5) | lo levantan ellas | sí | no | — |
| `tools/check-keywords.js` | no | no | no | solo Node (lee `lessons.js`, `lessons-tocfl.js` y `lessons-extra.js`; falla si una lección no tiene keywords) |
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
  `BASE_URL_REF=http://localhost:8961` (p. ej. `main` en otro puerto); sin eso, esa comparación se omite y la
  suite figura como 🟡 PARCIAL.

## Qué cubre cada suite de `tests/`

| Suite | Cubre |
|---|---|
| `ajustes-velocidad` | chip de velocidad del audio en Hoy, Ajustes y lecciones (es/zh × 3 temas) |
| `aprender-simple` | pantalla Aprender simplificada: nivel, abrir/cerrar con ✕ y con Atrás |
| `diaria-practicar` | Diaria → «Practicar frases», botón de escena y contraste |
| `entrenar`, `entrenar-grilla` | pantalla Entrenar (secciones, Exámenes, Lecturas de estudio) y su grilla a 320/360 px |
| `escritura-pinyin` | capa de errores y pinyin por familia (HSK/TOCFL), carga de la tabla |
| `escritura-tradicional` | 6 pantallas de lección × escrituras 简/繁 |
| `glosario-tocfl` | glosario de las 8 lecciones TOCFL A2–C1 = keywords elegidas (简/繁, escritorio/Android, 320/360 px) y pinyin por escritura (`py`/`pyT`, sin copiar el de la otra escritura; casos 盐酥鸡/鹹酥雞 y 屏幕/螢幕) |
| `hoja-modulos`, `hoja-ninos` | hoja de módulos (tabla módulo → botón, es-cn, Atrás) y pista Niños |
| `keywords-hsk`, `keywords-lecciones` | palabras clave de las lecciones (datos en `tests/data/`) |
| `lecciones-escuchar-fallos` | «Escuchar todo» y `fetchTTS` con un servidor simulado que falla (`page.route`): precarga de 1, un reintento, sin POST tras un GET caído, corte de circuito con aviso (se reinicia en cada pulsación; no se rearma a mitad de lección), marca de línea, resaltado solo de la línea (sin karaoke, ni con el servidor ni con la voz del sistema) y Atrás cerrando «Escuchar todo» |
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
| `api-tts` | `api/index.py` y `api/tts.py` con edge-tts simulado: reintentos, semáforo, errores, registro, y que los dos archivos no diverjan |
| `vercelignore` | `.vercelignore` no deja fuera nada que la app o `sw.js` carguen (precaché, referencias del código, cargas perezosas y lo que el navegador pide al recorrer todas las vistas); tests/, tools/, docs/, data/ y los documentos de raíz sí quedan fuera |
| `tts-service-worker` | `sw.js` REAL frente a un `/api/tts` simulado en otro puerto: una respuesta con `X-TTS-Fallback` o `no-store` (voz alternativa) nunca entra en `chino-es-tts-v2` y una normal sí |
| `voz-no-disponible` | `VOCES_NO_DISPONIBLES = ['tw-m']` (temporal, `audio-tts.js`): con la constante activa no sale ningún pedido a tw-m (se pide la continental m), la elección del alumno y el botón no se tocan y el aviso sale una vez por sesión; apagada vuelve el comportamiento anterior; tw-f y las continentales no cambian |
| `voz-lecciones` | botones de voz/ciclo en lecciones, podcast y tarjetas de Hoy |

## Qué suites correr según lo que cambió

`run-all` acepta nombres (o partes de nombre) y corre solo las que coinciden; con `--list` mostrás cuáles serían
sin correr nada. Los comandos de abajo están pensados para copiar y pegar. Si tocaste `style.css`, `app.js`,
`index.html` o algo compartido, o vas a mergear algo grande: corré todo.

| Cambiaste… | Corré |
|---|---|
| **Lecciones** (`lessons*.js`, `karaoke.js`, pantalla de lección) | `node tests/run-all.js lecciones keywords glosario segmentador ninos lessons-listen dele-layout classics` |
| **Lecturas** (`readings-*.js`, `readings-ui.js`, `tools/lecturas-examen/`) | `node tests/run-all.js lecturas entrenar check-readings` |
| **Aprender** (pantalla, selector de nivel, hoja de módulos, Diaria) | `node tests/run-all.js aprender selector-nivel tocfl-menu hoja- diaria` |
| **Entrenar / práctica / exámenes** (`exam-practice.js`, `exam-items.js`) | `node tests/run-all.js entrenar practica ordenar-banco` |
| **Atrás** (`nav.js`, capas, hojas) | `node tests/run-all.js navegacion practica-atras hoja-modulos aprender-simple` |
| **Audio** (`audio-tts.js`, velocidad, «Escuchar todo», caché de TTS en `sw.js`) | `node tests/run-all.js ajustes-velocidad voz-lecciones lessons-listen escuchar-fallos tts-service-worker voz-no-disponible speak-es navegacion-tanda1 ninos-sonidos api-tts` |
| **Escritura 简/繁** (`text-utils.js`, preferencia de escritura) | `node tests/run-all.js escritura- lecciones-tocfl-contraste segmentador lecturas-tocfl-b1 practica-lecturas check-readings` |
| **Pinyin** (`pinyin-*.js`, interruptores de pinyin) | `node tests/run-all.js escritura-pinyin lecciones-nombres lecciones-tocfl-contraste lecturas-tocfl-b1 segmentador` |
| **API de voz** (`api/index.py`, `api/tts.py`, `requirements.txt`) | `node tests/run-all.js api-tts` (también corre solo: `python3 -m unittest discover -s tests/api-tts -v`) |
| **`.vercelignore`, `sw.js` (precaché) o archivos nuevos en la raíz** | `node tests/run-all.js vercelignore` |
| **Niños** (`lessons-ninos.js`, `ninos-*.js`) | `node tests/run-all.js ninos` |
| **Primer uso / onboarding** | `node tests/run-all.js onboarding` |

Notas:

- El filtro es por *contiene*: `lecciones` incluye `lecciones-nombres`, `keywords-lecciones`, `voz-lecciones`…
- Cualquier cambio de JavaScript: sumá `check-undef` (variables sin definir), p. ej. `node tests/run-all.js check-undef lecturas`.
- Un cambio en `sw.js` (`VERSION`, precaché) no tiene suite propia: probalo a mano instalando la app y
  recargando.

## Cómo se escribe una suite nueva

1. Archivo `tests/<nombre>.test.js` que arranca con
   `const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');`
   (`chromium.launch({ ...LAUNCH })`, `page.goto(APP_URL)`, capturas en `shots('<nombre>')`).
2. Al final imprime **una línea** `comprobaciones N · FAILS M` y sale con código distinto de 0 si `M > 0`.
3. Si una comprobación falla, imprime una línea que empiece con `FAIL`.
4. Si saltea algo (una rama que no se dio, una dependencia opcional), imprime `PARCIAL: motivo` —nunca lo
   dejes pasar en silencio—; si no pudo correr nada, `OMITIDA: motivo`.

`run-all.js` descubre solo los `*.test.js`.

## Datos personales y secretos

El repo es público. Las pruebas no usan claves, tokens ni datos personales: trabajan con datos de la app,
perfiles de navegador vacíos y audio simulado. Antes de subir una suite nueva, buscá con
`grep -rniE "token|secret|api[_-]?key|password|@[a-z0-9.-]+\.[a-z]{2,}" tests/ tools/`.
