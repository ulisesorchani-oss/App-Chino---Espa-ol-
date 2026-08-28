[LEEME-INTEGRACION.txt](https://github.com/user-attachments/files/31561992/LEEME-INTEGRACION.txt)
CHINO-ESPAÑOL · VERSIÓN FUSIONADA — INSTRUCCIONES
====================================================

Qué hay en este paquete
-----------------------
index.html        -> reemplaza tu index.html actual
app.js            -> reemplaza tu app.js actual (bug corregido + mejoras)
style.css         -> reemplaza tu style.css actual (+ estilos nuevos)
data/exams/tocfl.json  -> NUEVO (20 oraciones, tu repo hoy da 404)
data/exams/dele.json   -> NUEVO (20 oraciones, tu repo hoy da 404)

NO se incluyen: api/, data/sentences.json, data/exams/hsk1-5.json,
vercel.json, serve.py, requirements.txt -> los tuyos siguen igual.
El TTS de Vercel (https://app-chino-espa-ol.vercel.app/api/tts)
queda 100% intacto, verificado en vivo (POST 200).

Pasos
-----
1. Hacé backup de tus 3 archivos actuales (por las dudas).
2. Subí index.html, app.js y style.css a la raíz del repo.
3. Subí data/exams/tocfl.json y data/exams/dele.json.
4. Commit + push -> Vercel y GitHub Pages se redespliegan solos.
5. ANTES de probar: refresco forzado Ctrl+Shift+R (el caché te
   puede seguir mostrando la versión vieja unos minutos).

Qué se corrigió
---------------
- BUG CRÍTICO: había un bloque de código duplicado/huérfano (unas 74
  líneas sueltas fuera de toda función, después de toggleToneColors).
  Al cargar, el script moría con "ReferenceError" y quedaban sin
  registrar el audio, el modo oscuro y varias funciones. Era la causa
  de los errores de consola que viste.
- Emoji del botón Pinyin en ON (faltaba el 📖).
- keypress (deprecado) -> keydown.

Qué se agregó
-------------
- Botón de velocidad de audio: 🐢 0.85x -> ⚡ 1.0x -> 🐌 0.7x
  (default 0.85x como pediste; se guarda solo; aplica a la voz de
  Vercel manteniendo el tono natural -preservesPitch- y al fallback
  del sistema).
- Barra de progreso en la tarjeta.
- Botón Verificar pasa a "Siguiente ▶" tras responder.
- Mensajes de estado por módulo (cargando / N oraciones / sin datos).
  HSK 6 avisa amablemente que todavía no tiene datos.
- Favicon (adiós error 404) y cache-busting ?v= en CSS/JS para que
  el navegador nunca más ejecute una versión vieja.

Notas de los datos nuevos
-------------------------
- TOCFL viene con caracteres tradicionales reales.
- En ambos archivos el campo chinese_trad_* es igual al simp_* por
  ahora (excepto TOCFL que ya es tradicional). Cuando mines más
  oraciones podés completarlos.
- HSK 6 sigue sin datos: la app ahora lo avisa en pantalla en vez de
  quedarse muda.

Pruebas hechas (navegador real, sin errores de consola)
-------------------------------------------------------
- 50 oraciones diarias + HSK2 + TOCFL cargan y se responden OK
- Flujo Verificar -> feedback -> Siguiente ▶ -> siguiente oración
- Botón de velocidad cicla y persiste
- POST a /api/tts -> 200, audio reproducido
