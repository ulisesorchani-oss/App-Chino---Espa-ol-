#!/usr/bin/env node
// tools/check-audio-matriz.js — chequeo ESTÁTICO de docs/matriz-de-audio.md (solo Node, sin navegador).
//   node tools/check-audio-matriz.js        → resumen + código de salida 1 si algo falla
// La matriz lista las 26 fuentes de audio de la app (14 `new Audio(` + 12 `speechSynthesis.speak(`) y qué corta cada una. Reglas:
//   1. por archivo y tipo, la cantidad de `new Audio(` / `speechSynthesis.speak(` del código (sin comentarios) es IGUAL a la de filas de la tabla
//      (un sitio nuevo sin fila, o una fila de un sitio que ya no existe, falla); y el total es 26
//   2. cada fila tiene sus 11 columnas completas y su «sitio» (el primer nombre entre comillas invertidas) existe en ese archivo
//   3. los IDs son A01… correlativos, sin repetir
//   4. por archivo, «llama a stopGlobalAudio / stopReader» según la tabla coincide con el código (una llamada fuera de su definición)
//   5. CORTE EXTERNO (regla escrita en docs/matriz-de-audio.md, «Qué cuenta como corte externo»): la columna 11 dice `sí` o `no`.
//      · `sí`: lleva al menos una prueba `archivo.js:fragmento` (entre comillas invertidas); el archivo es OTRO distinto del de la fila y su código
//        (sin comentarios) contiene el fragmento
//      · lo que alcanza un corte compartido tiene que decir `sí`: todo `speak` (stopReader / speechSynthesis.cancel de otro archivo), `globalAudioPlayer`
//        (A01, stopGlobalAudio de otro archivo) y `readerAudio` (A05, stopReader de otro archivo)
//      · `no`: sin pruebas, y NINGÚN otro archivo llama a un símbolo de corte del archivo de la fila (heurística: funciones globales y métodos de `window.X`
//        con nombre de corte: stop/close/cancel/pause/abort/clear/cortar/halt/silenc/reset; las funciones dentro de una IIFE no son alcanzables desde afuera)
//      · la frase del doc «**N** `Audio` sin corte externo … **IDs**» tiene que coincidir con las filas `Audio` marcadas `no`
//   6. AUTOPRUEBA: mutaciones (un `new Audio()` de más, una fila borrada, un sitio renombrado, una llamada a stopReader quitada y las de la regla de
//      corte externo) sobre una copia tienen que dar ROJO; si alguna da verde, el validador falla (no sirve de nada un validador que no detecta)
// `revisar(archivos, doc)` se exporta (archivos = { 'reader.js': texto, … }): tests o herramientas pueden correrlo sobre código mutado.
// Alcance: cuenta los sitios, no prueba CUÁNDO suenan; el contenido de las columnas de texto (qué corta, hallazgo) es a mano.
const fs = require('fs'), path = require('path');
const { sinComentarios } = require('./check-maquinas');
const ROOT = path.resolve(__dirname, '..');
const DOC = path.join(ROOT, 'docs', 'matriz-de-audio.md');
const TOTAL = 26;
const TIPOS = { Audio: /\bnew\s+Audio\s*\(/g, speak: /\bspeechSynthesis\s*\.\s*speak\s*\(/g };
const CORTES = { stopGlobalAudio: /(?<!function\s+)\bstopGlobalAudio\s*\(/g, stopReader: /(?<!function\s+)\bstopReader\s*\(/g };
const COLUMNAS = ['ID', 'Archivo', 'Tipo', 'Sitio', 'stopGlobalAudio', 'stopReader', 'Qué más corta', 'Lo corta', 'Al cerrar', 'Corte externo', 'Hallazgo'];
// Cortes que un módulo EXPONE para otros archivos (declarados a mano, tal cual se escriben en el código que los llama; incluye alias como `d.stop(` de
// ninos-ui.js, donde d = DeleLessons). Es la fuente independiente de la columna «Corte externo»: un `sí` con una prueba que no esté acá para ese archivo
// falla, y un `no` falla si otro archivo contiene alguno. Un corte expuesto NUEVO con otro nombre no se ve hasta que se agregue acá.
const EXPUESTOS = {
    'lessons-dele.js': ['DeleLessons.stop(', 'd.stop('],
    'lessons-graduated.js': ['LQ_TEXT.stop(', 'LQ_UI.stopSpeak(', 'u.stopSpeak('],
    'lessons-listen.js': ['LQ_LISTEN.stop('],
    'VoiceRecorder.js': ['VR.setTarget(']
};
// Cortes compartidos: a qué filas alcanzan (una prueba de este tipo solo vale para ellas)
const COMPARTIDOS = [
    { frag: 'stopGlobalAudio(', alcanza: (f) => f.tipo === 'Audio' && /\bglobalAudioPlayer\b/.test(f.sitio) },
    { frag: 'globalAudioPlayer.pause(', alcanza: (f) => f.tipo === 'Audio' && /\bglobalAudioPlayer\b/.test(f.sitio) },
    { frag: 'stopReader(', alcanza: (f) => f.tipo === 'speak' || (f.tipo === 'Audio' && /\breaderAudio\b/.test(f.sitio)) },
    { frag: 'speechSynthesis.cancel(', alcanza: (f) => f.tipo === 'speak' }
];
const VERBO_CORTE = '(?:stop|close|cancel|pause|abort|clear|cortar|halt|silenc|reset)';
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
        const ce = c[9] || '';
        const pruebas = [...ce.matchAll(/`([\w.-]+\.js):([^`]+)`/g)].map((m) => ({ archivo: m[1], fragmento: m[2] }));
        return { celdas: c, id: c[0], archivo: (c[1] || '').replace(/`/g, ''), tipo: c[2], sitio: sitio ? sitio[1] : '', sga: c[4], sr: c[5], ce: (ce.match(/^(sí|no)(?=\s|$)/) || [''])[0], pruebas, bruta: l };
    });
}
// Símbolos con los que OTRO archivo podría cortar a los de `codigo`: funciones globales (columna 0, no dentro de una IIFE) y nombres expuestos en
// `window.X = …`, con nombre de corte. Heurística: no ve llamadas dinámicas (`window[nombre]()`).
function simbolosDeCorte(codigo) {
    const re = new RegExp(VERBO_CORTE, 'i');
    const fn = [...codigo.matchAll(/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm)].map((m) => m[1]);
    const ar = [...codigo.matchAll(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[\w$]+)\s*=>/gm)].map((m) => m[1]);
    const win = [...codigo.matchAll(/\bwindow\.([A-Za-z_$][\w$]*)\s*=/g)].map((m) => m[1]);
    return { planos: [...new Set([...fn, ...ar])].filter((n) => re.test(n)), expuestos: [...new Set(win)] };
}
function llamadasDeAfuera(archivos, codigo, archivo) { // → ['otro.js:simbolo(', …]: llamadas de OTROS archivos a símbolos de corte de `archivo`
    const s = simbolosDeCorte(codigo[archivo] || ''), hits = [];
    Object.keys(codigo).forEach((o) => {
        if (o === archivo) return;
        s.planos.filter((n) => !CORTES[n]).forEach((n) => { // los cortes compartidos (stopGlobalAudio / stopReader) se juzgan por fuente aparte: cortan A01 y A05
            if (new RegExp('(?:function\\s+|\\b(?:const|let|var)\\s+)' + esc(n) + '\\b').test(codigo[o])) return; // otro archivo con un símbolo propio del mismo nombre
            if (new RegExp('(?<![\\w$])' + esc(n) + '\\s*\\(').test(codigo[o])) hits.push(o + ':' + n + '(');
        });
        s.expuestos.forEach((n) => {
            const m = codigo[o].match(new RegExp('\\b' + esc(n) + '\\s*\\.\\s*\\w*' + VERBO_CORTE + '\\w*\\s*\\(', 'i'));
            if (m) hits.push(o + ':' + m[0].replace(/\s+/g, ''));
        });
    });
    return hits;
}
function otrosLlaman(codigo, archivo, re) { return Object.keys(codigo).some((o) => o !== archivo && cuenta(re, codigo[o]) > 0); }

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
    // 5) corte externo: la regla de docs/matriz-de-audio.md («Qué cuenta como corte externo») aplicada fila por fila
    const CANCEL = /\bspeechSynthesis\s*\.\s*cancel\s*\(/g;
    filas.forEach((f) => {
        if (f.celdas.length !== COLUMNAS.length || !codigo[f.archivo]) return;
        if (!f.ce) { E.push(f.id + ': «Corte externo» debe empezar por sí o no (dice «' + f.celdas[9] + '»)'); return; }
        const porQue = [];
        if (f.tipo === 'speak' && (otrosLlaman(codigo, f.archivo, CANCEL) || otrosLlaman(codigo, f.archivo, CORTES.stopReader))) porQue.push('otro archivo llama a speechSynthesis.cancel() o a stopReader(), que cortan toda la voz del sistema');
        if (f.tipo === 'Audio' && /\bglobalAudioPlayer\b/.test(f.sitio) && otrosLlaman(codigo, f.archivo, CORTES.stopGlobalAudio)) porQue.push('otro archivo llama a stopGlobalAudio(), que pausa globalAudioPlayer');
        if (f.tipo === 'Audio' && /\breaderAudio\b/.test(f.sitio) && otrosLlaman(codigo, f.archivo, CORTES.stopReader)) porQue.push('otro archivo llama a stopReader(), que pausa readerAudio');
        if (f.ce === 'no') {
            if (porQue.length) E.push(f.id + ': dice «no» en Corte externo pero ' + porQue[0]);
            if (f.pruebas.length) E.push(f.id + ': dice «no» en Corte externo pero lista pruebas (`archivo.js:fragmento`)');
            const hits = llamadasDeAfuera(archivos, codigo, f.archivo);
            (EXPUESTOS[f.archivo] || []).forEach((fr) => Object.keys(codigo).forEach((o) => { if (o !== f.archivo && codigo[o].indexOf(fr) !== -1) hits.push(o + ':' + fr); }));
            if (hits.length) E.push(f.id + ': dice «no» en Corte externo pero otro archivo llama a un corte de ' + f.archivo + ': ' + hits.slice(0, 3).join(', ') + ' (¿es un corte externo? si es una llamada que no corta esta fuente, aclararlo en la regla)');
        } else {
            if (!f.pruebas.length) E.push(f.id + ': dice «sí» en Corte externo pero no lista ninguna prueba `archivo.js:fragmento`');
            const valida = f.pruebas.filter((p) => {
                const comp = COMPARTIDOS.find((c) => p.fragmento.indexOf(c.frag) === 0);
                return comp ? comp.alcanza(f) : (EXPUESTOS[f.archivo] || []).indexOf(p.fragmento) !== -1;
            });
            if (f.pruebas.length && !valida.length) E.push(f.id + ': dice «sí» en Corte externo pero ninguna de sus pruebas alcanza a esta fila');
            f.pruebas.forEach((p) => {
                const comp = COMPARTIDOS.find((c) => p.fragmento.indexOf(c.frag) === 0);
                if (comp && !comp.alcanza(f)) E.push(f.id + ': la prueba «' + p.archivo + ':' + p.fragmento + '» es un corte compartido que NO alcanza a esta fila (' + comp.frag + ' solo corta a ' + (comp.frag === 'stopReader(' ? 'los speak y readerAudio' : comp.frag === 'speechSynthesis.cancel(' ? 'los speak' : 'globalAudioPlayer') + ')');
                else if (!comp && (EXPUESTOS[f.archivo] || []).indexOf(p.fragmento) === -1) E.push(f.id + ': la prueba «' + p.fragmento + '» no es un corte expuesto de ' + f.archivo + ' (EXPUESTOS en tools/check-audio-matriz.js)');
                if (p.archivo === f.archivo) E.push(f.id + ': la prueba «' + p.archivo + ':' + p.fragmento + '» es del MISMO archivo de la fila: un corte externo viene de otro archivo');
                else if (!codigo[p.archivo]) E.push(f.id + ': la prueba apunta a «' + p.archivo + '», que no existe');
                else if (codigo[p.archivo].indexOf(p.fragmento) === -1) E.push(f.id + ': «' + p.archivo + '» ya no contiene «' + p.fragmento + '» (prueba del corte externo)');
            });
        }
    });
    Object.keys(EXPUESTOS).forEach((arch) => EXPUESTOS[arch].forEach((fr) => {
        const miembro = fr.replace(/\($/, '').split('.').pop();
        if (codigo[arch] && !new RegExp('\\b' + esc(miembro) + '\\b').test(codigo[arch])) E.push('EXPUESTOS: «' + fr + '» ya no existe en ' + arch + ' (¿se renombró «' + miembro + '»?)');
    }));
    const filasNo = filas.filter((f) => f.tipo === 'Audio' && f.ce === 'no').map((f) => f.id);
    const frase = doc.match(/\*\*(\d+)\*\* `Audio` sin corte externo: \*\*([^*]+)\*\*/);
    if (!frase) E.push('falta la frase «**N** `Audio` sin corte externo: **A04, …**» del resumen del doc (ver «Quién corta a quién»)');
    else {
        const ids = frase[2].split(',').map((x) => x.trim()).filter(Boolean);
        if (Number(frase[1]) !== filasNo.length || ids.join(',') !== filasNo.join(',')) E.push('el resumen dice ' + frase[1] + ' `Audio` sin corte externo (' + ids.join(', ') + ') y la tabla marca ' + filasNo.length + ' (' + filasNo.join(', ') + ')');
    }
    return { errores: E, resumen: { fuentes: filas.length, audio: filas.filter((f) => f.tipo === 'Audio').length, speak: filas.filter((f) => f.tipo === 'speak').length, archivos: Object.keys(claim).length, sinCorteExterno: filasNo } };
}

// ── autoprueba: las mutaciones TIENEN que dar rojo ──
function mutaciones(archivos, doc) {
    const out = [];
    const copia = (o) => JSON.parse(JSON.stringify(o));
    // `esperado` (opcional): la mutación solo cuenta como detectada si ALGUNO de los errores coincide: que dé rojo por la regla que se quiere probar, no por otra
    const m = (nombre, f, esperado) => { const a = copia(archivos); let d = doc; const r = f(a, doc); if (r && r.doc != null) d = r.doc; const e = revisar(a, d).errores; out.push({ nombre, errores: esperado ? e.filter((x) => esperado.test(x)).length : e.length }); };
    m('un new Audio() de más en reader.js', (a) => { a['reader.js'] += '\nconst audioDeMas = new Audio();\n'; });
    m('una fila borrada (A07)', (a, d) => ({ doc: d.split('\n').filter((l) => !/^\|\s*A07\s*\|/.test(l)).join('\n') }));
    m('un sitio renombrado (srsSpeak → srsSpeakX en la tabla)', (a, d) => ({ doc: d.split('\n').map((l) => (/^\|\s*A07\s*\|/.test(l) ? l.replace('`srsSpeak`', '`srsSpeakX`') : l)).join('\n') }));
    m('una llamada a stopReader quitada de podcast.js', (a) => { a['podcast.js'] = a['podcast.js'].replace(/\bstopReader\s*\(\)/g, 'noopReader()'); });
    const fila = (d, id) => d.split('\n').find((l) => new RegExp('^\\|\\s*' + id + '\\s*\\|').test(l));
    const celda = (l, i, nuevo) => { const c = l.split('|'); c[i + 1] = ' ' + nuevo + ' '; return c.join('|'); }; // i: índice de la columna (0 = ID)
    const enFila = (id, i, nuevo) => (a, d) => ({ doc: d.replace(fila(d, id), celda(fila(d, id), i, nuevo)) });
    // la frase del resumen acompaña a la fila (así la mutación solo puede ponerse en rojo por la regla de la fila, no por la cuenta)
    const conFrase = (d, ids) => d.replace(/\*\*\d+\*\* `Audio` sin corte externo: \*\*[^*]+\*\*/, '**' + ids.length + '** `Audio` sin corte externo: **' + ids.join(', ') + '**');
    const SIN = ['A04', 'A07', 'A09', 'A11', 'A13', 'A15', 'A20', 'A23'];
    const ordenar = (ids) => ids.sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
    const aNo = (id) => (a, d) => ({ doc: conFrase(enFila(id, 9, 'no')(a, d).doc, ordenar(SIN.concat([id]))) });
    const aSi = (id, prueba) => (a, d) => ({ doc: conFrase(enFila(id, 9, prueba)(a, d).doc, ordenar(SIN.filter((x) => x !== id))) });
    m('corte externo: una fila `speak` marcada «no» (A02)', aNo('A02'), /A02: dice «no» en Corte externo pero otro archivo llama a speechSynthesis\.cancel/);
    m('corte externo: A01 (`globalAudioPlayer`) marcada «no»', aNo('A01'), /A01: dice «no» en Corte externo pero otro archivo llama a stopGlobalAudio/);
    m('corte externo: A05 (`readerAudio`) marcada «no»', aNo('A05'), /A05: dice «no» en Corte externo pero otro archivo llama a stopReader/);
    m('corte externo: un `Audio` cortado por un método expuesto marcado «no» (A16, lo corta ninos-ui.js con d.stop())', aNo('A16'), /A16: dice «no» en Corte externo pero otro archivo llama a un corte de lessons-dele\.js: ninos-ui\.js:d\.stop\(/);
    m('corte externo: ídem con la llamada por alias (A18, la cortan `u.stopSpeak(` de familia-ui.js y `LQ_TEXT.stop(`)', aNo('A18'), /A18: dice «no» en Corte externo pero otro archivo llama a un corte de lessons-graduated\.js/);
    m('corte externo: ídem (A25, la corta app.js con VR.setTarget())', aNo('A25'), /A25: dice «no» en Corte externo pero otro archivo llama a un corte de VoiceRecorder\.js: app\.js:VR\.setTarget\(/);
    m('corte externo: un `Audio` sin corte externo (A04) con una prueba de un corte compartido que NO lo alcanza (stopReader)', aSi('A04', 'sí · `reader.js:stopReader(`'), /A04: la prueba «reader\.js:stopReader\(» es un corte compartido que NO alcanza a esta fila/);
    m('corte externo: ídem con una prueba que no es un corte expuesto de su archivo (A04 → LQ_TEXT.stop)', aSi('A04', 'sí · `exam-practice.js:LQ_TEXT.stop(`'), /A04: la prueba «LQ_TEXT\.stop\(» no es un corte expuesto de audio-tts\.js/);
    m('corte externo: «sí» sin ninguna prueba (A25)', enFila('A25', 9, 'sí'), /A25: dice «sí» en Corte externo pero no lista ninguna prueba/);
    m('corte externo: una prueba del MISMO archivo (A25 → VoiceRecorder.js)', enFila('A25', 9, 'sí · `VoiceRecorder.js:VR.setTarget(`'), /A25: la prueba .* es del MISMO archivo/);
    m('corte externo: una prueba cuyo fragmento ya no existe (ninos-ui.js: d.stop() → d.parar())', (a) => { a['ninos-ui.js'] = a['ninos-ui.js'].replace('d.stop(', 'd.parar('); }, /A16: «ninos-ui\.js» ya no contiene «d\.stop\(»/);
    m('corte externo: un `Audio` marcado «no» pero otro archivo llama a su cierre global (reader.js llama a dsStop() de A11)', (a) => { a['reader.js'] += '\nfunction _prueba() { dsStop(); }\n'; }, /A11: dice «no» en Corte externo pero otro archivo llama a un corte de daily-stories\.js: reader\.js:dsStop\(/);
    m('corte externo: un `Audio` marcado «no» pero otro archivo llama a su método expuesto (reader.js llama a LQ_LISTEN.stop() de A20)', (a) => { a['reader.js'] += '\nfunction _prueba() { LQ_LISTEN.stop(); }\n'; }, /A20: dice «no» en Corte externo pero otro archivo llama a un corte de lessons-listen\.js/);
    m('corte externo: un corte expuesto que ya no existe (EXPUESTOS: VR.setTarget( con setTarget renombrado en VoiceRecorder.js)', (a) => { a['VoiceRecorder.js'] = a['VoiceRecorder.js'].replace(/setTarget/g, 'fijarObjetivo'); }, /EXPUESTOS: «VR\.setTarget\(» ya no existe en VoiceRecorder\.js/);
    m('corte externo: la frase del resumen con otra cuenta (**8** → **9**)', (a, d) => ({ doc: d.replace(/\*\*8\*\* `Audio` sin corte externo/, '**9** `Audio` sin corte externo') }), /el resumen dice 9/);
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
    console.log(r.resumen.fuentes + ' fuentes (' + r.resumen.audio + ' new Audio + ' + r.resumen.speak + ' speechSynthesis.speak) en ' + r.resumen.archivos + ' archivos · ' + r.resumen.sinCorteExterno.length + ' Audio sin corte externo (' + r.resumen.sinCorteExterno.join(', ') + ') · ' + (mut.length ? mut.filter((x) => x.errores).length + '/' + mut.length + ' mutaciones detectadas' : 'autoprueba omitida (la matriz ya da rojo)'));
    console.log(malos ? '\nFALLAS: ' + malos : '\nTODO OK');
    process.exit(malos ? 1 : 0);
}
