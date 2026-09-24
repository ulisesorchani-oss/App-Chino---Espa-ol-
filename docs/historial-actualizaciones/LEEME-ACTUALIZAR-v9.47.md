# 🚀 Kit v9.47 — Contador de intentos + Tus hanzi difíciles

**Qué agrega**: dos funciones nuevas de estadística de práctica. Todo se
guarda en TU dispositivo, viaja con tu respaldo JSON y se borra con
🗑️ Borrar progreso.

| Función | Dónde se ve | Qué hace |
|---|---|---|
| **🎯 Contador de intentos por tarjeta** | Un chip junto al número de tarjeta de la práctica diaria | Cada vez que una tarjeta se resuelve (✅ correcto, ❌ mal o 💡 revelada) se suma un "pase". El chip muestra `🎯 N` cuántas veces la practicaste; al apoyar el dedo (o mouse) encima: cuántas correctas y cuántas salieron **al primer intento**. Si nunca la viste, el chip no aparece. |
| **✍️ Tus caracteres difíciles** | Abajo del popup de **📊 Racha** (nueva sección) | Los dos banners de escritura (✍️ respuesta a mano y "✍ Practicar" del popup de palabra) ahora registran **errores de trazo, pistas 💡 y quizzes completados por carácter**. El popup ordena tus 8 hanzi más difíciles (✗ errores · × veces). **Tocá un carácter y se abre la práctica de trazos de ese hanzi** — el círculo virtuoso: detectar → practicar. |

**Ejemplo real**: si al trazar 遇 te equivocás 5 veces y 谢 sale al toque,
el popup te lo muestra claro: `遇 ✗5` arriba, y con un toque pasás a
repasarlo con el dedo.

---

## Qué hay en este kit

| Archivo | Destino en tu repo | Qué es |
|---|---|---|
| `app.js` | `app.js` (REEMPLAZA) | v9.47: registro de pases + hooks de trazos + chip 🎯 |
| `stats.js` | `stats.js` (REEMPLAZA) | Sección «✍️ Tus caracteres difíciles» en el popup de rachas |
| `style.css` | `style.css` (REEMPLAZA) | Estilo del chip 🎯 y de los chips de hanzi |
| `sw.js` | `sw.js` (REEMPLAZA) | v92: invalida la caché del shell para traerse todo lo nuevo |
| `index.html` | `index.html` (REEMPLAZA) | Chip #card-attempts + sellos nuevos (20260922c) |

⚠️ **NO toques** `api/index.py`, `api/tts.py`, `vercel.json` ni
`voice-evaluator.js`: todo eso está en producción y no cambia en este kit.

---

## PASO 1 — Subir los 5 archivos

Todos van a la **raíz** del repo (no a ninguna carpeta):

1. Abrí tu repo en GitHub → **Add file → Upload files**.
2. Arrastrá los **5 archivos** de este kit: `app.js`, `stats.js`,
   `style.css`, `sw.js`, `index.html`.
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
2. **Chip 🎯**: respondé una tarjeta de la práctica diaria y volvé a ella
   (‹ Anterior). Ahora el chip `🎯 1` aparece junto al número de tarjeta.
   Apoyá el dedo: "Esta tarjeta: 1 prácticas · 1 correctas · 1 al primer
   intento".
3. **Hanzi difíciles**: tocá una palabra china en cualquier lugar → popup →
   `✍ Practicar` → trazá un carácter (o usá 💡 Pista) → cerrá el banner →
   botón **📊 Racha** → abajo de todo está la sección **✍️ Tus caracteres
   difíciles** con lo que acabás de hacer. Tocá ese hanzi: el banner de
   práctica se abre solo.
4. **Respaldo**: abrí 💾 Respaldo → Exportar → el JSON nuevo ya incluye
   `ac_attempts_v1` y `ac_hanzi_stats_v1` (viajan solos, no cambié nada
   del flujo de respaldo).

## PASO 4 (opcional) — Prueba completa en la compu

```
python3 scripts/verify_final.js        # chequeo integral: TODO OK
node scripts/test_v947_attempts_hanzi.js   # 76 asserts
python3 scripts/qa_v947.py             # QA en navegador real: 19/19
```

---

## Por qué es seguro

- **Cero invasión**: si localStorage falla (modo privado al límite, storage
  lleno), todo el registro queda en silencio y la app sigue exactamente
  igual — el chip simplemente no aparece y el popup muestra la nota vacía.
- **Sin cambios de lógica**: ni veredictos, ni puntajes, ni el mazo SRS,
  ni la evaluación de pronunciación. Las 2 funciones solo MIRAN lo que ya
  pasa y lo guardan.
- **JSON corrupto → se recrea**: si la clave se dañara, el próximo registro
  la reconstruye sin tirar excepción.
- **Respaldo y borrado**: las 2 claves empiezan con `ac_` → viajan con el
  respaldo JSON de siempre y se borran con 🗑️ Borrar progreso (como el resto).

## Qué NO cambia

- Contrato de velocidad v9.40, aviso v9.41, evaluación china por
  sonido+tonos, confianza española con piso 50 % (v9.44), calificación
  v9.38, onboarding v9.39, DELE/Argentina, planillas, manuscrito, cola de
  dramas, SRS, caché de audios v9.45, evaluación rápida v9.46.
- El api (v9.44) y vercel.json siguen igual: este kit no los toca.
