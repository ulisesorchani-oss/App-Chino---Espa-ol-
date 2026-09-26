# Ideas anotadas para más adelante (sin implementar todavía)

## 1. Azure TTS oficial como 3.er escalón de fallback del Lector

Hoy `api/index.py`/`api/tts.py` cascadean: edge-tts (gratis, no oficial —
ingeniería inversa del "Leer en voz alta" de Microsoft Edge, puede
cortarse sin aviso) → si falla, Piper local (voz robótica).

Idea: sumar Azure Cognitive Services Speech (API REST oficial) como
escalón del medio, con una clave propia (nivel gratis: 500.000
caracteres/mes) — reduciría la frecuencia de caída a voz robótica que
se vio en producción con textos largos del Lector (ver sesión
2026-09-26, "se rompió un poco de veces" con un artículo de 345
caracteres — ya mitigado parcialmente con 1 reintento silencioso por
trozo en `reader.js`, pero Azure oficial sería más confiable que
depender solo de edge-tts).

Referencia de implementación real (Flutter/Dart, no portable
directo pero sirve de guía):
`nar-ran/yueting_reader`, rama `dev`,
`lib/features/reader/domain/services/tts/azure_tts_engine.dart`:
- Guarda `azure_api_key` + `azure_region` en almacenamiento local.
- SSML manual: `<speak version='1.0' ...><voice name='zh-CN-XiaoxiaoNeural'><prosody rate='...'>TEXTO</prosody></voice></speak>`
- POST a `https://$region.tts.speech.microsoft.com/cognitiveservices/v1`
  con headers `Ocp-Apim-Subscription-Key`, `Content-Type:
  application/ssml+xml`, `X-Microsoft-OutputFormat`.
- Dato clave: `zh-CN-XiaoxiaoNeural` es LA MISMA voz que ya usa nuestra
  app vía edge-tts — Azure oficial no trae voces nuevas, trae
  confiabilidad (acceso soportado, no reverse-engineered).

Costo de implementar: clave de Azure propia (no del usuario — no tiene
sentido pedírsela a un alumno), un paso más en `api/index.py`/
`api/tts.py`, y cuidar que el fallback no se coma la cuota gratis si
edge-tts empezara a fallar seguido.

## 2. `nar-ran/yueting_reader` como referencia para una futura versión Android

Repo del mismo autor de `nar-ran/hsk-vocab-es` (ya citado en
`data/MANIFIESTO.json`). App Flutter/Dart, no una web app — nada de
código portable directo a esta PWA, pero puede servir de referencia de
arquitectura si algún día se arma una versión Android nativa (o un
wrapper) en vez de seguir 100% PWA.

Notas de la exploración (repo público, sin acceso a `gh`/API
autenticada desde este sandbox — la API de GitHub devolvía 403 vía
proxy, así que esto es lo que se pudo ver por las páginas normales de
GitHub, no un audit completo del código):
- Rama `main`: scaffold default de Flutter sin tocar. El código real
  está en la rama `dev`.
- Dependencias reales (`pubspec.yaml`): `hive`/`hive_flutter` (DB local
  — equivalente a nuestro IndexedDB de Mis Lecturas), `flutter_tts` +
  `audioplayers` (TTS local + reproducción), `lpinyin` (conversión a
  pinyin — equivalente a nuestro `pinyin-pro.min.js`), `http` (llamadas
  directas a APIs de TTS en la nube, sin SDK dedicado).
- Arquitectura por features: `lib/features/{reader,library,settings}`
  — conceptualmente parecido a lo que ya tenemos (Lector + tab
  Personales + Yo/ajustes).
- `TtsEngineFactory` elige entre 4 motores según un setting guardado en
  Hive (`selected_engine`): `SystemTtsEngine`, `EdgeTtsEngine`,
  `AzureTtsEngine`, `OpenAiTtsEngine` — un patrón de fallback/selección
  de proveedor más explícito que el nuestro (nosotros cascadeamos fijo
  edge-tts→Piper, ellos dejan elegir motor).

Si en algún momento se retoma esto: repasar `lib/features/reader/`
completo (no se pudo bajar el código fuente de `reading_screen.dart` ni
de los widgets — solo resúmenes vía WebFetch, no el contenido literal)
para ver cómo resuelven la sincronización de resaltado con cada motor
y el manejo de progreso de lectura persistente.
