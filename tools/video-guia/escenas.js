// Fuente única del video: escenas → subtítulos → pasos. Cambiá acá textos, tiempos y selectores.
//
// Cada subtítulo (sub) tiene:
//   txt     la frase completa (la de guion.md; máx. 8 palabras). Es lo que lee la locución.
//   secs    segundos exactos del subtítulo (≥ 3,5): NO cambian al cambiar el diseño.
//   globo   texto del globo anclado al elemento (2 a 4 palabras, máx. 2 líneas). Un texto por cada paso con elemento
//           (tap / mira / ancla), en orden: con dos toques el globo se mueve. Si es un solo string, vale para todos.
//   (a nivel de escena) locucion: texto corto para grabar la voz de la escena; lo usa guion.js.
//   barra   true → la frase va en la barra de subtítulos (solo para pasos SIN toque ni elemento: título, cierre, etc.).
//   arriba  true → la barra va arriba (cuando el fondo está ocupado por una hoja con botones).
//   muestra nombre → en `node build.js --muestra` guarda una captura de este paso.
//
// Pasos (cada uno saca capturas; la última del subtítulo absorbe el tiempo que sobra):
//   { tap: sel, nth?, hold? }     aro de toque + globo sobre el elemento, y clic (hold = segundos de la captura de resultado)
//   { click: sel }                clic sin aro ni globo (cerrar ventanas, volver)
//   { fill: sel, text }           tipea el texto letra por letra
//   { select: sel, value }        elige una opción de un <select> nativo
//   { mira: sel, nth?, hold? }    resalta (sin tocar) con un marco amarillo + globo
//   { ancla: sel }                solo globo anclado a ese elemento (sin aro ni marco)
//   { scroll: sel }               desplaza la página hasta ese elemento
//   { espera: s }                 captura quieta de s segundos
const LECCION = 'h1-primer-dia'; // HSK 1 «第一天» (data-id de la lección)
module.exports = {
    W: 360, H: 780, DPR: 2, FPS: 25,
    LECCION,
    RESPUESTA: 'amar',                  // primera tarjeta de HSK 1: 爱 → "Amar / Gustar"
    escenas: [
        { id: 'titulo', nombre: 'Título', locucion: 'Huayu Diario, en noventa segundos.', tarjeta: { t1: 'Huayu Diario\nen 90 segundos', icono: 'icons/logo-192.png' }, secs: 3 },
        { id: 'bienvenida', nombre: 'Bienvenida', locucion: 'Al abrir, ves tres pantallas de bienvenida. Tocá Empezar, elegí «Desde cero» y seguí con Siguiente hasta Empezar.', subs: [
            { barra: true, arriba: true, muestra: 'bienvenida-barra', txt: 'Al abrir, verás tres pantallas.', secs: 3.5, pasos: [{ espera: 1.2 }] },
            { muestra: 'bienvenida', txt: 'Elegí «Desde cero».', secs: 5.5, globo: ['Tocá Empezar', 'Elegí «Desde cero»'],
              pasos: [{ tap: '.ob-next', hold: 0.3 }, { tap: '.ob-s-choice', nth: 0, hold: 0.3 }] },
            { txt: 'Tocá Siguiente hasta Empezar.', secs: 4, globo: 'Tocá Siguiente hasta Empezar',
              pasos: [{ tap: '.ob-next', hold: 0.5 }, { tap: '.ob-next', hold: 0.4 }] }
        ] },
        { id: 'hoy', nombre: 'Hoy', locucion: 'Esta es tu tarjeta de hoy. Tocá el parlante para escuchar la palabra, escribí qué significa y tocá Verificar. Y con este botón elegís qué practicar.', subs: [
            { muestra: 'hoy-tarjeta', txt: 'Esta es tu tarjeta de hoy.', secs: 3.5, globo: 'Tu tarjeta de hoy', pasos: [{ ancla: '#sentence-text' }, { scroll: '#sentence-card' }, { mira: '#sentence-text', hold: 1 }] },
            { txt: 'Tocá 🔊 para escuchar.', secs: 3.5, globo: 'Tocá 🔊 y escuchá', pasos: [{ tap: '#btn-play-cn', hold: 0.9 }] },
            { txt: 'Escribí qué significa.', secs: 3.5, globo: 'Escribí qué significa', pasos: [{ tap: '#answer-input', click: false, hold: 0.2 }, { fill: '#answer-input', text: 'amar' }] },
            { muestra: 'hoy-verificar', txt: 'Tocá Verificar.', secs: 3.5, globo: 'Tocá Verificar', pasos: [{ tap: '#btn-check', hold: 0.6 }] },
            { txt: 'Tocá acá para elegir qué practicar.', secs: 4, globo: 'Elegí qué practicar', pasos: [{ tap: '#mod-btn', hold: 1.2 }, { click: '#btn-mod-sheet-close' }] }
        ] },
        { id: 'aprender', nombre: 'Aprender', locucion: 'En Aprender tenés lecciones cortas. Elegí tu nivel, HSK o TOCFL. Tocá Leer para ver la historia; si tocás una palabra, te dice qué significa. Con Escuchar todo la oís completa, y con Practicar la ejercitás.', subs: [
            { txt: 'Acá aprendés con lecciones.', secs: 3.5, globo: 'Aprendé con lecciones', pasos: [{ tap: '#nav-aprender', hold: 0.9 }] },
            { muestra: 'aprender-nivel', txt: 'Elegí tu nivel: HSK o TOCFL.', secs: 3.5, globo: 'Elegí HSK o TOCFL',
              pasos: [{ tap: '#sel-lv-hsk', click: false, hold: 0.1 }, { select: '#sel-lv-hsk', value: '1', hold: 0.4 }, { tap: '#sel-lv-tocfl', click: false, hold: 0.2 }] },
            { txt: 'Tocá Leer.', secs: 3.5, globo: 'Tocá Leer',
              pasos: [{ tap: '.lc-read[data-id="' + LECCION + '"]', hold: 0.4 }, { tap: '#lq-gloss-continue', hold: 0.2 }] },
            { muestra: 'leccion-palabra', txt: 'Tocá una palabra.', secs: 4, globo: 'Tocá una palabra', arriba: false,
              pasos: [{ tap: '.lq-line-zh .lq-ch', nth: 2, hold: 1.1 }, { click: '#btn-vocab-pop-close' }] },
            { muestra: 'leccion-escuchar', txt: 'Tocá Escuchar todo.', secs: 3.5, globo: 'Tocá Escuchar todo', pasos: [{ tap: '#ll-play', hold: 0.7 }] },
            { txt: 'Tocá Practicar.', secs: 3.5, globo: 'Tocá Practicar', pasos: [{ click: '#lq-close' }, { tap: '.lc-practice[data-id="' + LECCION + '"]', hold: 0.6 }] }
        ] },
        { id: 'examenes', nombre: 'Exámenes', locucion: 'También podés prepararte para exámenes: hay un test de nivel y lecturas de práctica.', subs: [
            { barra: true, muestra: 'examenes-barra', txt: 'También hay exámenes.', secs: 3.5, pasos: [{ click: '#lq-close' }, { espera: 1 }] },
            { muestra: 'examenes', txt: 'Test de nivel y lecturas.', secs: 3.5, globo: 'Nivel y lecturas',
              pasos: [{ tap: '#tab-exams', hold: 0.3 }, { mira: '#btn-placement', hold: 0.6 }, { ancla: 'text=Lecturas tipo examen' }, { scroll: 'text=Lecturas tipo examen' }] }
        ] },
        { id: 'entrenar', nombre: 'Entrenar', locucion: 'En Entrenar practicás el oído, la voz y la mano: distinguí los tonos, escribí a mano y practicá como en el examen.', subs: [
            { muestra: 'entrenar-nav', txt: 'Acá practicás oído, voz y mano.', secs: 3.5, globo: 'Oído, voz y mano', pasos: [{ tap: '#nav-entrenar', hold: 0.9 }] },
            { muestra: 'entrenar-pares', txt: 'Escuchá y distinguí tonos.', secs: 3.5, globo: 'Distinguí los tonos', pasos: [{ mira: '#btn-mp-pairs' }] },
            { muestra: 'entrenar-mano', txt: 'Escribí a mano.', secs: 3.5, globo: 'Escribí a mano', pasos: [{ mira: '#btn-train-write' }] },
            { muestra: 'entrenar-examen', txt: 'Y practicá como en el examen.', secs: 3.5, globo: 'Practicá tipo examen', pasos: [{ mira: '#btn-exam-practice' }] }
        ] },
        { id: 'yo', nombre: 'Yo', locucion: 'En Yo mirás tu racha, y ajustás la voz y la velocidad.', subs: [
            { muestra: 'yo-racha', txt: 'Mirá tu racha.', secs: 3.5, globo: 'Mirá tu racha', pasos: [{ tap: '#nav-yo', hold: 0.5 }, { tap: '#btn-stats', hold: 0.6 }] },
            { muestra: 'yo-ajustes', txt: 'Ajustá voz y velocidad.', secs: 3.5, globo: 'Ajustá voz y velocidad', pasos: [{ click: '#btn-stats-close' }, { mira: '#btn-voice-zh', hold: 1 }, { mira: '#btn-speed', hold: 1 }] }
        ] },
        { id: 'cierre', nombre: 'Cierre', locucion: 'Una frase al día.', tarjeta: { t1: 'Una frase al día', icono: 'icons/logo-192.png' }, secs: 4 }
    ]
};
