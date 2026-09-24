# 中文 ⇄ Español — Huayu Diario

App web (PWA) para practicar chino mandarín y español: lecciones graduadas,
exámenes (HSK, TOCFL, DELE), práctica diaria con SRS, lectura de clásicos con
pinyin/tonos, evaluación de pronunciación por voz y síntesis de audio (TTS)
vía Microsoft Edge neural voices.

**Versión actual: v9.50** — "Aprender primero · modo oscuro en capas · voces
masculinas arregladas". La app abre en **Aprender** (Lecciones · Exámenes ·
Diaria · Clásicos), con **Hoy · Entrenar · Yo** como resto de la barra
inferior.

---

## Estructura del repo

| Ruta | Qué es |
|---|---|
| `index.html`, `app.js`, `style.css` | App principal (front-end) |
| `sw.js`, `manifest.json`, `icons/` | Service worker + PWA instalable/offline |
| `api/` | Endpoint serverless (Vercel, Python) para TTS (`/api/tts`) |
| `data/` | Datos de exámenes y lecciones (`data/exams/*.json`, etc.) |
| `lessons*.js`, `classics.js`, `dict-mini.js`, `pinyin-pro.min.js` | Contenido de lecciones, clásicos y diccionario |
| `voice-evaluator.js`, `VoiceRecorder.js`, `pitch-analyzer.js`, `config.js` | Evaluador de pronunciación (Whisper WASM local + análisis de tono) |
| `stats.js`, `onboarding.js`, `text-utils.js` | Estadísticas, onboarding y utilidades de texto |
| `README-Pronunciacion.md` | Documentación viva del módulo de pronunciación (arquitectura, calibración, constantes) |
| `docs/historial-actualizaciones/` | Notas de actualización de versiones anteriores (histórico, ya aplicadas) |

## Documentación

- **Módulo de pronunciación** (arquitectura, cómo se decide el veredicto,
  calibración del umbral de confianza, tabla de constantes): ver
  [`README-Pronunciacion.md`](README-Pronunciacion.md).
- **Historial de actualizaciones** (kits `LEEME-*` de versiones anteriores,
  desde v2 hasta v9.50, ya integrados en el código actual): ver
  [`docs/historial-actualizaciones/`](docs/historial-actualizaciones/).

## Despliegue

- **Front-end**: GitHub Pages / hosting estático a partir de `index.html`.
- **API de TTS**: Vercel (`vercel.json` + `api/`), Microsoft Edge neural
  voices vía `edge-tts`.
- El service worker (`sw.js`) versiona la caché de shell y de audios; al
  subir cambios de `app.js`/`index.html`/`style.css`/`sw.js` conviene
  refresco forzado (Ctrl+Shift+R) para evitar ver la versión cacheada.

## Desarrollo local

```bash
pip install -r requirements.txt
python serve.py
```
