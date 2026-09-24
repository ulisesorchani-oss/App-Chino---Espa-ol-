# 🚀 Kit v9.46 — Evaluación de grabaciones más rápida

**Qué logra**: la evaluación de pronunciación (🎤 grabar → ver el resultado)
sale bastante más rápida que antes, sin cambiar NINGÚN resultado:

| Mejora | Qué sentís |
|---|---|
| **Warmup al arrancar** | El motor de voz se carga y se "calienta" ~6 s después de abrir la app. Antes, el primer "Analizando…" pagaba toda la carga del modelo (los segundos más feos). Ahora el primer "evaluar" arranca ya caliente. |
| **Multihilo (donde se puede)** | En Chrome/Edge/Firefox el análisis ahora usa varios hilos del procesador en vez de uno solo. En Safari sigue igual que hoy (sin romper nada). |
| **Español más liviano** | El camino del español corría el "encoder" de Whisper 2 veces por evaluación; ahora 1 sola (validado: mismo texto, misma confianza). |
| **Referencia instantánea** | El audio de referencia (el mismo 🔊 que escuchás para estudiar) ahora va por el caché del CDN: la 2.ª vez que evaluás una frase, sale al toque — también offline. |
| **Detalles** | El decode del audio y la espera del motor ya no se hacen en fila (se solapan). Recorte del tope de generación: frases ruidosas no pueden trabar el análisis. |

**Sin cambios visibles**: mismos veredictos, mismos puntajes, misma interfaz.
La evaluación china (tonos) y la española (confianza · piso 50 %) quedan
idénticas — solo llega más rápido.

---

## Qué hay en este kit

| Archivo | Destino en tu repo | Qué es |
|---|---|---|
| `vercel.json` | `vercel.json` (REEMPLAZA) | Agrega 2 cabeceras (COOP/COEP) que habilitan el multihilo |
| `voice-evaluator.js` | `voice-evaluator.js` (REEMPLAZA) | El evaluador: warmup + multihilo + encoder compartido + referencias por GET |
| `app.js` | `app.js` (REEMPLAZA) | v9.46: dispara el warmup al arrancar |
| `sw.js` | `sw.js` (REEMPLAZA) | v91: invalida la caché del shell para traerse todo lo nuevo |
| `index.html` | `index.html` (REEMPLAZA) | Sellos nuevos (20260922b) |

⚠️ **NO toques** `api/index.py` ni `api/tts.py`: el api v9.44 que ya está en
producción sigue perfecto y no cambia en este kit.

---

## PASO 1 — Subir los 5 archivos

Todos van a la **raíz** del repo (no a ninguna carpeta):

1. Abrí tu repo en GitHub → **Add file → Upload files**.
2. Arrastrá los **5 archivos** de este kit: `vercel.json`,
   `voice-evaluator.js`, `app.js`, `sw.js`, `index.html`.
   - GitHub te va a avisar que ya existen → están reemplazando los viejos,
     es correcto.
3. **Commit changes** ("Commit directly to the main branch").

> 💡 Si preferís de a uno: en cada archivo → lápiz (Edit) → Ctrl+A → borrar
> → pegar el contenido del kit → Commit changes. El resultado es el mismo.

## PASO 2 — Esperar el deploy

Vercel → pestaña **Deployments** → esperá que el nuevo diga **Ready** (1-2 min).

## PASO 3 — Verificar (1 minuto)

1. Abrí la **app** en el celu (o compu). Si avisa "actualizada", cerrala y
   volvé a abrir (el shell nuevo entra al 2.º arranque).
2. Abrí una lección con 🎤 y grabá una frase → el análisis debe salir como
   siempre, y a partir del segundo intento se nota la velocidad.
3. **Truco para ver el warmup**: abrí la app, esperá unos 8-10 segundos sin
   hacer nada (en la consola de la compu aparece
   `[VE] warmup listo en … ms`), y recién ahí grabá: la 1.ª evaluación ya
   sale rápida, sin la descarga de siempre.

## PASO 4 (opcional) — Prueba completa en la compu

```
python3 scripts/verify_final.js   # chequeo integral: TODO OK
node scripts/test_v946_eval_speed.js
python3 scripts/qa_v946.py        # QA en navegador real: 12/12
```

---

## Por qué es seguro (redes de contención)

- **Multihilo progresivo**: solo se activa si el navegador está aislado
  (COOP/COEP). Safari no soporta `credentialless` → ignora la cabecera →
  queda exactamente como hoy (1 hilo). Si en algún navegador raro el
  multihilo fallara al cargar, el evaluador reintenta UNA vez con 1 hilo
  forzado (el comportamiento exacto de v9.45) y después por hilo principal.
  Nada se rompe: solo cambia la velocidad.
- **Encoder compartido con guard**: si la corrida directa del encoder
  fallara, el código vuelve solo al camino de siempre (v9.44) — mismo
  resultado, solo un poco más lento.
- **Referencias GET con red de contención**: el GET solo se acepta con la
  marca `X-TTS-Audio: 1` (server viejo detectado → POST de reserva); si el
  GET falla por red, cae al POST de siempre; sin TTS, la referencia
  china usa la plantilla canónica de siempre. El audio del alumno jamás
  sale del dispositivo (esto no cambió nunca y no va a cambiar).
- **Warmup silencioso**: corre en un hilo separado ~6 s después de abrir;
  si falla (sin red, navegador raro), no avisa ni molesta — al grabar se
  carga igual que antes.

## Qué NO cambia

- Contrato de velocidad v9.40 (0.85x sin eco), aviso v9.41, evaluación
  china por sonido+tonos, confianza española con piso 50 % (v9.44),
  calificación v9.38, onboarding v9.39, DELE/Argentina, planillas,
  manuscrito, cola de dramas, SRS, caché de audios v9.45.
- El api (v9.44) sigue igual: este kit no toca la carpeta `api/`.
