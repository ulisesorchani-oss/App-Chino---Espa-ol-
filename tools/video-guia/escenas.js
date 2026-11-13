// Fuente única del video: escenas → subtítulos → pasos. Cambiá acá textos, tiempos y selectores.
// Pasos (cada uno saca capturas; la última del subtítulo absorbe el tiempo que sobra):
//   { tap: sel, nth?, hold? }     marcador de toque sobre el elemento y clic (hold = segundos de la captura de resultado)
//   { click: sel }                clic sin marcador (cerrar ventanas, volver)
//   { fill: sel, text }           tipea el texto letra por letra
//   { select: sel, value }        elige una opción de un <select> nativo
//   { mira: sel, nth? }           resalta (sin tocar) con un marco amarillo
//   { scroll: sel | px, a? }      desplaza la página (a: 'arriba' | número | selector a dejar a ~mitad de pantalla)
//   { espera: s }                 captura quieta de s segundos
// Cada subtítulo dura exactamente `secs`; la suma de escenas da el total (85 s).
const LECCION = 'h1-primer-dia'; // HSK 1 «第一天» (data-id de la lección)
module.exports = {
    W: 360, H: 780, DPR: 2, FPS: 25,
    LECCION,
    RESPUESTA: 'amar',                  // primera tarjeta de HSK 1: 爱 → "Amar / Gustar"
    escenas: [
        { id: 'titulo', nombre: 'Título', tarjeta: { t1: 'Huayu Diario en 90 segundos', icono: 'icons/logo-192.png' }, secs: 3 },
        { id: 'bienvenida', nombre: 'Bienvenida', subs: [
            { arriba: true, txt: 'Al abrir, verás tres pantallas.', secs: 3.5, pasos: [{ espera: 1.2 }, { tap: '.ob-next' }] },
            { arriba: true, txt: 'Elegí «Desde cero».', secs: 3.5, pasos: [{ tap: '.ob-s-choice', nth: 0 }] },
            { arriba: true, txt: 'Tocá Siguiente hasta Empezar.', secs: 4, pasos: [{ tap: '.ob-next', hold: 0.5 }, { tap: '.ob-next', hold: 0.4 }] }
        ] },
        { id: 'hoy', nombre: 'Hoy', subs: [
            { txt: 'Esta es tu tarjeta de hoy.', secs: 3.5, pasos: [{ scroll: '#sentence-card' }, { espera: 1 }] },
            { txt: 'Tocá 🔊 para escuchar.', secs: 3.5, pasos: [{ tap: '#btn-play-cn', hold: 0.9 }] },
            { txt: 'Escribí qué significa.', secs: 3.5, pasos: [{ tap: '#answer-input', click: false, hold: 0.2 }, { fill: '#answer-input', text: 'amar' }] },
            { txt: 'Tocá Verificar.', secs: 3.5, pasos: [{ tap: '#btn-check', hold: 0.9 }] },
            { txt: 'Tocá acá para elegir qué practicar.', secs: 4, pasos: [{ tap: '#mod-btn', hold: 1.2 }, { click: '#btn-mod-sheet-close' }] }
        ] },
        { id: 'aprender', nombre: 'Aprender', subs: [
            { txt: 'Acá aprendés con lecciones.', secs: 3.5, pasos: [{ tap: '#nav-aprender', hold: 0.9 }] },
            { txt: 'Elegí tu nivel: HSK o TOCFL.', secs: 3.5, pasos: [{ tap: '#sel-lv-hsk', click: false, hold: 0.1 }, { select: '#sel-lv-hsk', value: '1', hold: 0.4 }, { tap: '#sel-lv-tocfl', click: false, hold: 0.2 }] },
            { txt: 'Tocá Leer.', secs: 3.5, pasos: [{ tap: '.lc-read[data-id="' + LECCION + '"]', hold: 0.5 }, { tap: '#lq-gloss-continue', hold: 0.3 }] },
            { arriba: true, txt: 'Tocá una palabra.', secs: 3.5, pasos: [{ tap: '.lq-line-zh .lq-ch', nth: 2, hold: 1.3 }, { click: '#btn-vocab-pop-close' }] },
            { txt: 'Tocá Escuchar todo.', secs: 3.5, pasos: [{ tap: '#ll-play', hold: 0.9 }] },
            { txt: 'Tocá Practicar.', secs: 3.5, pasos: [{ click: '#lq-close' }, { tap: '.lc-practice[data-id="' + LECCION + '"]', hold: 0.8 }] }
        ] },
        { id: 'examenes', nombre: 'Exámenes', subs: [
            { txt: 'También hay exámenes.', secs: 3.5, pasos: [{ click: '#lq-close' }, { tap: '#tab-exams', hold: 0.8 }] },
            { txt: 'Test de nivel y lecturas.', secs: 3.5, pasos: [{ mira: '#btn-placement' }, { espera: 1 }, { scroll: 'text=Lecturas tipo examen' }] }
        ] },
        { id: 'entrenar', nombre: 'Entrenar', subs: [
            { txt: 'Acá practicás oído, voz y mano.', secs: 3.5, pasos: [{ tap: '#nav-entrenar', hold: 0.9 }] },
            { txt: 'Escuchá y distinguí tonos.', secs: 3.5, pasos: [{ mira: '#btn-mp-pairs' }] },
            { txt: 'Escribí a mano.', secs: 3.5, pasos: [{ mira: '#btn-train-write' }] },
            { txt: 'Y practicá como en el examen.', secs: 3.5, pasos: [{ mira: '#btn-exam-practice' }] }
        ] },
        { id: 'yo', nombre: 'Yo', subs: [
            { txt: 'Mirá tu racha.', secs: 3.5, pasos: [{ tap: '#nav-yo', hold: 0.6 }, { tap: '#btn-stats', hold: 0.8 }] },
            { txt: 'Ajustá voz y velocidad.', secs: 3.5, pasos: [{ click: '#btn-stats-close' }, { mira: '#btn-voice-zh' }, { espera: 1 }, { mira: '#btn-speed' }] }
        ] },
        { id: 'cierre', nombre: 'Cierre', tarjeta: { t1: 'Un poquito cada día', icono: 'icons/logo-192.png' }, secs: 4 }
    ]
};
