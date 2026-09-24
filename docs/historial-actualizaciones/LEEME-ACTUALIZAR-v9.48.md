# 🚀 Kit v9.48 — Intentos en el repaso del mazo + Tolerancia de trazos

**Qué agrega**: las dos funciones que quedaron en agenda. Son 4 archivos a
reemplazar (esta vez **stats.js NO cambia**) y todo lo demás queda intacto.

| Función | Dónde se ve | Qué hace |
|---|---|---|
| **🎯 Contador en el repaso del mazo** | Fila de datos de cada tarjeta del repaso (junto a "Repaso" y la caja) | Ahora el repaso del mazo TAMBIÉN alimenta el mismo contador de la práctica: cada tarjeta revelada suma un pase (🧠 recordada antes de mirar = **ok** · ✍️ producción mal = **ko** · 🤷 "No lo sé" o ver respuesta directa = **rv**). Como comparten identidad, si practicaste 谢谢 en la lección y después la repasás en el mazo, el chip muestra los pases de AMBOS lados. Repasar 2 veces la misma tarjeta ("Otra vez") suma 2. |
| **🎚️ Tolerancia de trazos (leniency)** | Vista **Yo → ⚙️ Ajustes → Tolerancia de trazos** | Un control con 3 niveles para el validador de trazos de HanziWriter — cuánto puede desviarse un trazo dibujado y aún contar como bien: **🎯 Estricta** te exige más · **⚖️ Normal** (la de siempre) · **🫧 Permisiva** perdona más (útil en celus con pantalla chica). Vale para la práctica con contorno Y para escribir de memoria. Se aplica desde el próximo carácter que practiques y queda guardada en tu dispositivo. |

**Los niveles**: Estricta = 1.2/1.6 · Normal = 1.6/2.0 (los valores fijos de
siempre) · Permisiva = 2.2/2.8 — el primer número es para practicar con
contorno, el segundo para escribir de memoria.

---

## Qué hay en este kit

| Archivo | Destino en tu repo | Qué es |
|---|---|---|
| `app.js` | `app.js` (REEMPLAZA) | v9.48: registro de pases del mazo + chip 🎯 en el repaso + módulo de tolerancia |
| `index.html` | `index.html` (REEMPLAZA) | Fila nueva en Ajustes + sellos nuevos (app/style 20260922d) |
| `style.css` | `style.css` (REEMPLAZA) | Chip ámbar del mazo + estado activo del nivel elegido |
| `sw.js` | `sw.js` (REEMPLAZA) | v93: invalida la caché del shell para traerse todo lo nuevo |

⚠️ **NO toques** `api/index.py`, `api/tts.py`, `vercel.json`,
`voice-evaluator.js` y **esta vez tampoco `stats.js`**: nada de eso cambia
en este kit.

---

## PASO 1 — Subir los 4 archivos

Todos van a la **raíz** del repo (no a ninguna carpeta):

1. Abrí tu repo en GitHub → **Add file → Upload files**.
2. Arrastrá los **4 archivos** de este kit: `app.js`, `index.html`,
   `style.css`, `sw.js`.
   - GitHub te va a avisar que ya existen → están reemplazando los viejos,
     es correcto.
3. **Commit changes** ("Commit directly to the main branch").

> 💡 Si preferís de a uno: en cada archivo → lápiz (Edit) → Ctrl+A → borrar
> → pegar el contenido del kit → Commit changes. El resultado es el mismo.

## PASO 2 — Esperar el deploy

Vercel → pestaña **Deployments** → esperá que el nuevo diga **Ready** (1-2 min).

## PASO 3 — Verificar (2 minutos)

1. Abrí la **app** en el celu. Si avisa "actualizada", cerrala y volvé a
   abrir (el shell nuevo entra al 2.º arranque).
2. **Contador en el mazo**: si tenés tarjetas vencidas, tocá **🔁 Repaso →
   ▶ Empezar repaso**. En la fila de arriba de la tarjeta (donde dice
   "Repaso · 1/3 · caja") ahora puede aparecer el chip `🎯 N` si ya la
   practicaste antes. Fallá el recordatorio y tocá **🤷 No lo sé, ver
   respuesta** → calificá **😵 Otra vez** → cuando la tarjeta vuelve,
   el chip aparece con la cuenta actualizada al instante.
3. **Tolerancia de trazos**: **Yo → ⚙️ Ajustes** → nueva fila **Tolerancia
   de trazos** con 🎯 Estricta / ⚖️ Normal / 🫧 Permisiva. Elegí una,
   abrí cualquier práctica de trazos y sentí la diferencia (si estás
   empezando, dejala en ⚖️ Normal o probá 🫧 Permisiva).
4. **Respaldo**: la preferencia viaja en el respaldo JSON como
   `ac_leniency_v1` (se suma sola, no cambié nada del flujo de respaldo).

## PASO 4 (opcional) — Prueba completa en la compu

```
node scripts/verify_final.js              # chequeo integral: TODO OK
node scripts/test_v948_srs_leniency.js    # 52 asserts
python3 scripts/qa_v948.py                # QA en navegador real: 26/26
```

---

## Por qué es seguro

- **Cero invasión**: si localStorage falla (modo privado al límite, storage
  lleno), el registro del mazo y la preferencia quedan en silencio y la app
  sigue exactamente igual — la tolerancia vuelve a Normal si no puede leer.
- **Sin cambios de lógica**: las cajas de Leitner, los intervalos, los
  veredictos de la práctica, la evaluación de pronunciación y los puntajes
  no se tocan. El mazo solo REGISTRA lo que ya pasa; la tolerancia es el
  mismo validador de siempre con un número que ahora podés elegir.
- **Borrado progreso**: la preferencia NO se borra con 🗑️ Borrar progreso
  (es un ajuste, como el tema). El contador del mazo sí, como siempre.
- **JSON corrupto → se recrea**: si alguna clave se dañara, el próximo uso
  la reconstruye sin tirar excepción.

## Qué NO cambia

- Contrato de velocidad v9.40, aviso v9.41, evaluación china por
  sonido+tonos, confianza española con piso 50 % (v9.44), calificación
  v9.38, onboarding v9.39, DELE/Argentina, planillas, manuscrito, cola de
  dramas, caché de audios v9.45, evaluación rápida v9.46, y las funciones
  v9.47 (chip de la práctica diaria + Tus caracteres difíciles).
- El api (v9.44), vercel.json y stats.js siguen igual: este kit no los toca.
