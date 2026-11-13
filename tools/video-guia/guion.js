#!/usr/bin/env node
// Regenera guion.md (guion de locución) a partir de escenas.js (textos y locución) y out/duraciones.json (segundos reales
// del último render de build.js). Uso: node tools/video-guia/guion.js
'use strict';
const fs = require('fs');
const path = require('path');
const E = require('./escenas');

const dur = path.join(__dirname, 'out', 'duraciones.json');
if (!fs.existsSync(dur)) { console.error('Falta out/duraciones.json: corré primero «node tools/video-guia/build.js».'); process.exit(2); }
const D = JSON.parse(fs.readFileSync(dur, 'utf8'));
const t = (s) => { const m = Math.floor(s / 60); return m + ':' + (s - m * 60).toFixed(1).replace('.', ',').padStart(4, '0'); };
const n = (s) => s.toFixed(1).replace('.', ',');
const palabras = (s) => s.trim().split(/\s+/).length;

const L = [];
L.push('# Guion de locución — «Huayu Diario en 90 segundos»', '');
L.push('Video de **' + n(D.total) + ' s**, vertical (720 px de ancho), sin música y con pista de audio silenciosa. El título dice «90 segundos»: es el nombre, no la duración exacta.', '');
L.push('**Qué se ve en pantalla.** Cada paso con toque lleva un **globo** de 2 a 4 palabras pegado al botón (con flechita) y un aro amarillo sobre lo que se toca. La **barra** de subtítulos solo aparece en los pasos sin toque. Cada globo dura 2,5 s o más. Los segundos de abajo son los del render actual; si cambiás `secs` o los `hold` en `escenas.js`, corré `build.js` y después `guion.js` para regenerar esta tabla.', '');
L.push('## Para leer de corrido', '', 'Una frase por escena; cada una entra en los segundos de su escena (unas 2,5 palabras por segundo, dejando respiro).', '');
L.push('| Escena | Desde – hasta | Seg. | Locución sugerida |', '|---|---|---|---|');
for (const e of D.escenas) {
    const esc = E.escenas.find(x => x.nombre === e.nombre);
    L.push('| ' + e.nombre + ' | ' + t(e.desde) + ' – ' + t(e.hasta) + ' | ' + n(e.seg) + ' | ' + esc.locucion + ' (' + palabras(esc.locucion) + ' palabras) |');
}
L.push('', '**Texto seguido (' + n(D.total) + ' s):**', '');
L.push(D.escenas.map(e => E.escenas.find(x => x.nombre === e.nombre).locucion).join(' '), '');
L.push('## Detalle por escena: lo que aparece y cuánto dura', '');
for (const e of D.escenas) {
    L.push('### ' + e.nombre + ' — ' + t(e.desde) + ' a ' + t(e.hasta) + ' (' + n(e.seg) + ' s)', '');
    L.push('| Tipo | Texto en pantalla | Frase del guion | Desde – hasta | Seg. |', '|---|---|---|---|---|');
    for (const it of e.items) {
        const tipo = it.tipo === 'globo' ? 'Globo' : it.tipo === 'barra' ? 'Barra' : 'Tarjeta';
        L.push('| ' + tipo + ' | «' + it.texto.replace(/\n/g, ' ') + '» | ' + (it.frase ? it.frase : '—') + ' | ' + t(it.desde) + ' – ' + t(it.hasta) + ' | ' + n(it.seg) + ' |');
    }
    L.push('');
}
L.push('## Qué no se muestra', '');
L.push('- Nunca se toca 🎤 ni se abre el aviso de descarga del modelo.', '- El audio de la app va en silencio en la grabación: la voz es la tuya.', '- El perfil es nuevo, sin datos personales. Se muestran la guía de bienvenida y el aviso de la primera tarjeta; se marcan como vistos (sin mostrarlos) los de Pares mínimos y el de la hoja de módulos.', '');
fs.writeFileSync(path.join(__dirname, 'guion.md'), L.join('\n'));
console.log('guion.md escrito (' + D.escenas.length + ' escenas, ' + n(D.total) + ' s).');
