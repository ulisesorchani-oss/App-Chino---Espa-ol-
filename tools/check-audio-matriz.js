#!/usr/bin/env node
// tools/check-audio-matriz.js — chequeo ESTÁTICO de docs/matriz-de-audio.md (solo Node, sin navegador).
//   node tools/check-audio-matriz.js        → resumen + código de salida 1 si algo falla
// La matriz lista las 26 fuentes de audio de la app (14 `new Audio(` + 12 `speechSynthesis.speak(`) y qué corta cada una. Reglas:
//   1. por archivo y tipo, la cantidad de `new Audio(` / `speechSynthesis.speak(` del código (sin comentarios) es IGUAL a la de filas de la tabla
//      (un sitio nuevo sin fila, o una fila de un sitio que ya no existe, falla); y el total es 26
//   2. cada fila tiene sus 10 columnas completas y su «sitio» (el primer nombre entre comillas invertidas) existe en ese archivo
//   3. los IDs son A01… correlativos, sin repetir
//   4. por archivo, «llama a stopGlobalAudio / stopReader» según la tabla coincide con el código (una llamada fuera de su definición)
//   5. AUTOPRUEBA: cuatro mutaciones (un `new Audio()` de más, una fila borrada, un sitio renombrado, una llamada a stopReader quitada)
//      sobre una copia tienen que dar ROJO; si alguna da verde, el validador falla (no sirve de nada un validador que no detecta)
// `revisar(archivos, doc)` se exporta (archivos = { 'reader.js': texto, … }): tests o herramientas pueden correrlo sobre código mutado.
// Alcance: cuenta los sitios, no prueba CUÁNDO suenan; el contenido de las columnas de texto (qué corta, hallazgo) es a mano.
const fs = require('fs'), path = require('path');
const { sinComentarios } = require('./check-maquinas');
const ROOT = path.resolve(__dirname, '..');
const DOC = path.join(ROOT, 'docs', 'matriz-de-audio.md');
const TOTAL = 26;
const TIPOS = { Audio: /\bnew\s+Audio\s*\(/g, speak: /\bspeechSynthesis\s*\.\s*speak\s*\(/g };
const CORTES = { stopGlobalAudio: /(?<!function\s+)\bstopGlobalAudio\s*\(/g, stopReader: /(?<!function\s+)\bstopReader\s*\(/g };
const COLUMNAS = ['ID', 'Archivo', 'Tipo', 'Sitio', 'stopGlobalAudio', 'stopReader', 'Qué más corta', 'Lo corta', 'Al cerrar', 'Hallazgo'];

function archivosDelCodigo() { // los .js de la raíz que carga la app (sin librerías minificadas)
    const o = {};
    fs.readdirSync(ROOT).filter((f) => /\.js$/.test(f) && !/\.min\.js$/.test(f)).forEach((f) => { o[f] = fs.readFileSync(path.join(ROOT, f), 'utf8'); });
    return o;
}
function cuenta(re, texto) { return (texto.match(new RegExp(re.source, 'g')) || []).length; }
function filasDeLaTabla(doc) {
    return doc.split('\n').filter((l) => /^\|\s*A\d+\s*\|/.test(l)).map((l) => {
        const c = l.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((x) => x.trim());
        const sitio = (c[3] || '').match(/`([^`]+)`/);
        return { celdas: c, id: c[0], archivo: (c[1] || '').replace(/`/g, ''), tipo: c[2], sitio: sitio ? sitio[1] : '', sga: c[4], sr: c[5], bruta: l };
    });
}

function revisar(archivos, doc) { // → { errores: [], resumen: {…} }
    const E = [];
    const codigo = {}; Object.keys(archivos).forEach((f) => { codigo[f] = sinComentarios(archivos[f]); });
    const filas = filasDeLaTabla(doc);
    // 3) IDs correlativos
    filas.forEach((f, i) => {
        const esperado = 'A' + String(i + 1).padStart(2, '0');
        if (f.id !== esperado) E.push('ID «' + f.id + '» donde iba «' + esperado + '» (los IDs son A01… correlativos, sin repetir)');
    });
    // 2) columnas y sitio
    filas.forEach((f) => {
        if (f.celdas.length !== COLUMNAS.length) { E.push(f.id + ': tiene ' + f.celdas.length + ' columnas y deberían ser ' + COLUMNAS.length); return; }
        COLUMNAS.forEach((n, i) => { if (!f.celdas[i]) E.push(f.id + ': columna «' + n + '» vacía'); });
        if (!TIPOS[f.tipo]) E.push(f.id + ': tipo «' + f.tipo + '» desconocido (Audio o speak)');
        if (!/^(sí|no)$/.test(f.sga)) E.push(f.id + ': «stopGlobalAudio» debe ser sí o no (dice «' + f.sga + '»)');
        if (!/^(sí|no)$/.test(f.sr)) E.push(f.id + ': «stopReader» debe ser sí o no (dice «' + f.sr + '»)');
        if (!codigo[f.archivo]) E.push(f.id + ': el archivo «' + f.archivo + '» no existe');
        else if (!f.sitio || archivos[f.archivo].indexOf(f.sitio) === -1) E.push(f.id + ': el sitio «' + f.sitio + '» ya no existe en ' + f.archivo + ' (¿se renombró?)');
    });
    // 1) cuentas por archivo y tipo
    const porClave = {};
    filas.forEach((f) => { const k = f.archivo + ' · ' + f.tipo; porClave[k] = (porClave[k] || 0) + 1; });
    let enCodigo = 0;
    Object.keys(codigo).sort().forEach((f) => {
        Object.keys(TIPOS).forEach((t) => {
            const n = cuenta(TIPOS[t], codigo[f]); enCodigo += n;
            const m = porClave[f + ' · ' + t] || 0;
            if (n !== m) E.push(f + ' · ' + t + ': el código tiene ' + n + ' y la tabla ' + m + (n > m ? ' → fuente NUEVA sin fila en docs/matriz-de-audio.md' : ' → fila de un sitio que ya no existe'));
            delete porClave[f + ' · ' + t];
        });
    });
    Object.keys(porClave).forEach((k) => E.push('la tabla tiene filas de «' + k + '» que no corresponden a ningún archivo del código'));
    if (filas.length !== TOTAL) E.push('la tabla tiene ' + filas.length + ' filas y el total esperado es ' + TOTAL + ' (si cambió a propósito, actualizá TOTAL en tools/check-audio-matriz.js y el texto de la matriz)');
    if (enCodigo !== TOTAL) E.push('el código tiene ' + enCodigo + ' fuentes y el total esperado es ' + TOTAL);
    // 4) llamadas a los cortes compartidos, por archivo
    const claim = {};
    filas.forEach((f) => { (claim[f.archivo] = claim[f.archivo] || { sga: false, sr: false }); if (f.sga === 'sí') claim[f.archivo].sga = true; if (f.sr === 'sí') claim[f.archivo].sr = true; });
    Object.keys(claim).forEach((f) => {
        if (!codigo[f]) return;
        const real = { sga: cuenta(CORTES.stopGlobalAudio, codigo[f]) > 0, sr: cuenta(CORTES.stopReader, codigo[f]) > 0 };
        if (real.sga !== claim[f].sga) E.push(f + ': la tabla dice que ' + (claim[f].sga ? 'llama' : 'no llama') + ' a stopGlobalAudio y el código ' + (real.sga ? 'sí lo llama' : 'no lo llama'));
        if (real.sr !== claim[f].sr) E.push(f + ': la tabla dice que ' + (claim[f].sr ? 'llama' : 'no llama') + ' a stopReader y el código ' + (real.sr ? 'sí lo llama' : 'no lo llama'));
    });
    return { errores: E, resumen: { fuentes: filas.length, audio: filas.filter((f) => f.tipo === 'Audio').length, speak: filas.filter((f) => f.tipo === 'speak').length, archivos: Object.keys(claim).length } };
}

// ── autoprueba: las mutaciones TIENEN que dar rojo ──
function mutaciones(archivos, doc) {
    const out = [];
    const copia = (o) => JSON.parse(JSON.stringify(o));
    const m = (nombre, f) => { const a = copia(archivos); let d = doc; const r = f(a, doc); if (r && r.doc != null) d = r.doc; out.push({ nombre, errores: revisar(a, d).errores.length }); };
    m('un new Audio() de más en reader.js', (a) => { a['reader.js'] += '\nconst audioDeMas = new Audio();\n'; });
    m('una fila borrada (A07)', (a, d) => ({ doc: d.split('\n').filter((l) => !/^\|\s*A07\s*\|/.test(l)).join('\n') }));
    m('un sitio renombrado (srsSpeak → srsSpeakX en la tabla)', (a, d) => ({ doc: d.split('\n').map((l) => (/^\|\s*A07\s*\|/.test(l) ? l.replace('`srsSpeak`', '`srsSpeakX`') : l)).join('\n') }));
    m('una llamada a stopReader quitada de podcast.js', (a) => { a['podcast.js'] = a['podcast.js'].replace(/\bstopReader\s*\(\)/g, 'noopReader()'); });
    return out;
}

module.exports = { revisar, mutaciones, filasDeLaTabla, TOTAL };
if (require.main === module) {
    const archivos = archivosDelCodigo();
    const doc = fs.existsSync(DOC) ? fs.readFileSync(DOC, 'utf8') : '';
    const r = revisar(archivos, doc);
    let malos = r.errores.length;
    r.errores.forEach((e) => console.error('✗ ' + e));
    let mut = [];
    if (!malos) { // la autoprueba solo tiene sentido sobre una matriz que hoy da verde
        mut = mutaciones(archivos, doc);
        mut.forEach((x) => { if (!x.errores) { malos++; console.error('✗ la mutación «' + x.nombre + '» NO dio rojo: el validador no la detecta'); } });
    }
    console.log(r.resumen.fuentes + ' fuentes (' + r.resumen.audio + ' new Audio + ' + r.resumen.speak + ' speechSynthesis.speak) en ' + r.resumen.archivos + ' archivos · ' + (mut.length ? mut.filter((x) => x.errores).length + '/' + mut.length + ' mutaciones detectadas' : 'autoprueba omitida (la matriz ya da rojo)'));
    console.log(malos ? '\nFALLAS: ' + malos : '\nTODO OK');
    process.exit(malos ? 1 : 0);
}
