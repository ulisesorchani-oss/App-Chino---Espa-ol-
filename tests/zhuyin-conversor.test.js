// Conversor pinyin → zhuyin de app.js (pzPinyinToZhuyin): tabla LITERAL de sílabas y valores esperados escritos a mano.
// Sin navegador ni servidor: se lee la tabla de app.js (PZ_ZY_INITIALS … pzZhuyinOf) y se evalúa aislada, igual que tools/lecciones-familia/derivar.js.
// Motivo: «you» salía «ㄧ» (el pinyin pasaba a «iou», que no tiene fila) y «yo» también; ahora «you» = ㄧㄡ y «yo» = ㄧㄛ.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const a = app.indexOf('const PZ_ZY_INITIALS'), b = app.indexOf('function pzZhuyinOf');
ok(a > 0 && b > a, 'la tabla pinyin→zhuyin está en app.js');
const ctx = {};
vm.runInNewContext(app.slice(a, b) + '\nthis.f = pzPinyinToZhuyin;', ctx);
const f = ctx.f;

// [sílaba con tono numérico, zhuyin esperado]
const TABLA = [
    // you / yo en los cinco tonos y sin dígito (los dos casos del arreglo)
    ['you1', 'ㄧㄡ'], ['you2', 'ㄧㄡˊ'], ['you3', 'ㄧㄡˇ'], ['you4', 'ㄧㄡˋ'], ['you5', 'ㄧㄡ˙'], ['you', 'ㄧㄡ˙'],
    ['yo1', 'ㄧㄛ'], ['yo2', 'ㄧㄛˊ'], ['yo3', 'ㄧㄛˇ'], ['yo4', 'ㄧㄛˋ'], ['yo5', 'ㄧㄛ˙'], ['yo', 'ㄧㄛ˙'],
    // el resto de las y- y w- (no debe cambiar)
    ['ya1', 'ㄧㄚ'], ['ye2', 'ㄧㄝˊ'], ['yao3', 'ㄧㄠˇ'], ['yan4', 'ㄧㄢˋ'], ['yin1', 'ㄧㄣ'], ['yang2', 'ㄧㄤˊ'], ['ying3', 'ㄧㄥˇ'], ['yong4', 'ㄩㄥˋ'],
    ['yi1', 'ㄧ'], ['yu3', 'ㄩˇ'], ['yue4', 'ㄩㄝˋ'], ['yuan2', 'ㄩㄢˊ'], ['yun1', 'ㄩㄣ'],
    ['wa1', 'ㄨㄚ'], ['wo3', 'ㄨㄛˇ'], ['wai4', 'ㄨㄞˋ'], ['wei2', 'ㄨㄟˊ'], ['wan3', 'ㄨㄢˇ'], ['wen2', 'ㄨㄣˊ'], ['wang4', 'ㄨㄤˋ'], ['weng1', 'ㄨㄥ'], ['wu3', 'ㄨˇ'],
    // con inicial: -iu / -io ya andaban bien y no deben moverse
    ['jiu4', 'ㄐㄧㄡˋ'], ['liu2', 'ㄌㄧㄡˊ'], ['niu2', 'ㄋㄧㄡˊ'], ['miu4', 'ㄇㄧㄡˋ'], ['diu1', 'ㄉㄧㄡ'], ['xiu1', 'ㄒㄧㄡ'], ['qiu2', 'ㄑㄧㄡˊ'],
    ['jiao4', 'ㄐㄧㄠˋ'], ['bie2', 'ㄅㄧㄝˊ'], ['ou3', 'ㄡˇ'], ['mou2', 'ㄇㄡˊ'], ['zhou1', 'ㄓㄡ'], ['hou4', 'ㄏㄡˋ'],
    // -iong con inicial: la fila nueva 'io' (ㄧㄛ) es prefijo de 'iong'; este caso fija que gane la final larga (ㄩㄥ)
    ['jiong3', 'ㄐㄩㄥˇ'], ['xiong2', 'ㄒㄩㄥˊ'], ['qiong2', 'ㄑㄩㄥˊ'],
    // zumbidas, ü y neutros
    ['zhi1', 'ㄓ'], ['shi4', 'ㄕˋ'], ['zi3', 'ㄗˇ'], ['ma5', 'ㄇㄚ˙'], ['nv3', 'ㄋㄩˇ'], ['er2', 'ㄦˊ'], ['jue2', 'ㄐㄩㄝˊ']
];
for (const [s, esp] of TABLA) { const r = f(s); ok(r === esp, s + ' → ' + esp + (r === esp ? '' : ' (salió «' + r + '»)')); }

// palabras reales (pinyin-pro da una sílaba por carácter): 有 友 又 右 悠 哟
const PAL = { '有 you3': 'ㄧㄡˇ', '朋友 you3': 'ㄧㄡˇ', '又 you4': 'ㄧㄡˋ', '右 you4': 'ㄧㄡˋ', '悠 you1': 'ㄧㄡ', '哟 yo1': 'ㄧㄛ' };
for (const k of Object.keys(PAL)) { const r = f(k.split(' ')[1]); ok(r === PAL[k], k.split(' ')[0] + ' (' + k.split(' ')[1] + ') → ' + PAL[k]); }

// símbolo no mapeado: vacío, no un dato falso
ok(f('') === '' && f('xyz9') === '' && f('3') === '', 'entradas inválidas o vacías → cadena vacía');

console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
process.exit(fails ? 1 : 0);
