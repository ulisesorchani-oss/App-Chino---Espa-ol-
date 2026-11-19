// tests/lecciones-familia.test.js — fichas de familia (lessons-familia.js + familia-ui.js; lista en lessons-graduated.js, #fam-list).
//   · la lista: con un nivel TOCFL que tiene fichas aparecen sus tarjetas (Prep, A2, B1); con otro nivel, con HSK y en
//     «aprendo español» #fam-list no se ve. #lesson-list sigue mostrando EXACTAMENTE GRADED_LESSONS (las fichas no entran)
//   · el visor: cada forma muestra el hanzi de la escritura elegida y el pinyin GUARDADO (el de la fuente: 姊 = jiě,
//     叔叔 = shúshu; nunca el generado) y, con el botón, el zhuyin guardado (tono neutro adelante)
//   · 伯母 una sola vez; 自己 como ancla «Yo»; 子/女/媳 con la forma cotidiana a la vista; reglas con sus marcas
//   · sin caracteres tocables ni pinyin generado ni barra «Escuchar todo»; el 🔊 pide el audio de esa forma (mismo camino de voz)
//   · lo que se ve: sin países ni banderas, sin tuteo, con «Fuente: material del Instituto Guó Fēng» en la tarjeta y en el visor
//   · 320 y 360 px, temas claro/oscuro/papel, tradicional y simplificado: sin desborde horizontal ni errores JS
const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('lecciones-familia');
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS' };
// límites de palabra Unicode (\b de JS es solo ASCII: no corta después de «ú» ni de «á»)
const PAIS = /Taiw[aá]n|China(?!\p{L})|continental|Argentin|España|México|(?<!\p{L})país|🇹🇼|🇨🇳|🇦🇷|🇪🇸/iu;
const TUTEO = /(?<!\p{L})(tú|tienes|quieres|puedes|eres|haces|sabes|necesitas|fíjate|escucha|toca|elige)(?!\p{L})/iu;
const FUENTE = 'Fuente: material del Instituto Guó Fēng';
(async () => {
    const b = await chromium.launch({ ...LAUNCH });
    let fails = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('FAIL ' + m); } };
    async function abrir({ th = 'light', sc = 'trad', w = 360, lv = 'tocfl:A2', mode = 'es-cn', pron } = {}) {
        const ctx = await b.newContext({ viewport: { width: w, height: 760 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
        await ctx.addInitScript(([th, sc, lv, mode, pron]) => {
            localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('theme', th); localStorage.setItem('ac_tab', 'lessons');
            localStorage.setItem('ac_lesson_level', lv); localStorage.setItem('chino-espanol-app-v2', JSON.stringify({ mode, interleaving: false }));
            if (sc === 'simp') localStorage.setItem('ac_script_tocfl', 'simp');
            if (pron) localStorage.setItem('ac_fam_pron', pron);
        }, [th, sc, lv, mode, pron || '']);
        const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
        const tts = [];
        await p.route(/\/api\/tts/, (route) => {
            const req = route.request();
            if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
            let text = new URL(req.url()).searchParams.get('text') || '', voice = new URL(req.url()).searchParams.get('voice') || '';
            try { const j = JSON.parse(req.postData() || '{}'); text = j.text || text; voice = j.voice || voice; } catch (e) { /* GET */ }
            tts.push({ text, voice });
            return route.fulfill({ status: 503, headers: Object.assign({ 'content-type': 'application/json', 'cache-control': 'no-store' }, CORS), body: '{"error":"prueba"}' });
        });
        await p.goto(APP_URL); await p.waitForTimeout(1200);
        await p.evaluate(() => showView('aprender')); await p.waitForTimeout(250);
        return { ctx, p, errs, tts };
    }
    const lista = (p) => p.evaluate(() => {
        const fw = document.getElementById('fam-list');
        const lv = document.getElementById('lesson-list').dataset.level;
        const want = GRADED_LESSONS.filter(l => lv.indexOf('tocfl:') === 0 ? (l.exam === 'TOCFL' && String(l.examLvl || '') === lv.slice(6)) : (!l.exam && String(l.hsk) === lv)).map(l => l.id);
        return { visible: fw.offsetParent !== null, ids: [...fw.querySelectorAll('.lq-btn[data-act="fichas"]')].map(x => x.dataset.id),
            texto: fw.innerText, lessons: [...document.querySelectorAll('#lesson-list .lesson-card')].map(c => c.querySelector('.lq-btn').dataset.id), want,
            enGraded: GRADED_LESSONS.filter(l => l.kind === 'familia' || /^tocfl-fam-/.test(l.id)).length, nGraded: GRADED_LESSONS.length,
            desb: document.documentElement.scrollWidth > innerWidth + 1 };
    });

    // 1) la lista por nivel
    const ESPERADO = { 'tocfl:Prep': ['tocfl-fam-hermanos'], 'tocfl:A1': [], 'tocfl:A2': ['tocfl-fam-abuelos', 'tocfl-fam-tios', 'tocfl-fam-hijos'],
        'tocfl:B1': ['tocfl-fam-primos', 'tocfl-fam-nietos', 'tocfl-fam-reglas'], 'tocfl:B2': [], 'tocfl:C1': [], '1': [], '2': [] };
    let nGradedBase = null;
    for (const [lv, ids] of Object.entries(ESPERADO)) {
        const { ctx, p, errs } = await abrir({ lv });
        const r = await lista(p);
        if (nGradedBase === null) nGradedBase = r.nGraded;
        ok(JSON.stringify(r.ids) === JSON.stringify(ids), lv + ': fichas ' + JSON.stringify(r.ids) + ' (esperado ' + JSON.stringify(ids) + ')');
        ok(r.visible === !!ids.length, lv + ': #fam-list ' + (ids.length ? 'visible' : 'oculta') + ' (visible=' + r.visible + ')');
        ok(JSON.stringify(r.lessons) === JSON.stringify(r.want), lv + ': #lesson-list sigue = GRADED_LESSONS del nivel');
        ok(r.enGraded === 0 && r.nGraded === nGradedBase, lv + ': ninguna ficha en GRADED_LESSONS (' + r.nGraded + ' lecciones)');
        if (ids.length) {
            ok((r.texto.match(new RegExp(FUENTE, 'g')) || []).length === ids.length, lv + ': cada tarjeta dice «' + FUENTE + '»');
            ok(/nivel aproximado/.test(r.texto), lv + ': la etiqueta dice «nivel aproximado»');
            ok(!PAIS.test(r.texto) && !TUTEO.test(r.texto), lv + ': lista sin países/banderas ni tuteo');
        }
        ok(!errs.length, lv + ': sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    {   // «aprendo español»: ni la lista de chino ni las fichas
        const { ctx, p, errs } = await abrir({ lv: 'tocfl:A2', mode: 'cn-es' });
        const r = await lista(p);
        ok(!r.visible, 'aprendo español: #fam-list oculta');
        ok(!errs.length, 'aprendo español: sin errores JS ' + errs.join('/'));
        await ctx.close();
    }

    // 2) el visor, lección por lección, en las dos escrituras, con pinyin y con zhuyin
    const LVL = { 'tocfl-fam-hermanos': 'Prep', 'tocfl-fam-abuelos': 'A2', 'tocfl-fam-tios': 'A2', 'tocfl-fam-hijos': 'A2', 'tocfl-fam-primos': 'B1', 'tocfl-fam-nietos': 'B1', 'tocfl-fam-reglas': 'B1' };
    const CASOS = [['light', 'trad', 320], ['dark', 'simp', 320], ['paper', 'trad', 320], ['light', 'simp', 360]];
    for (const [th, sc, w] of CASOS) for (const id of Object.keys(LVL)) {
        const { ctx, p, errs, tts } = await abrir({ th, sc, w, lv: 'tocfl:' + LVL[id] });
        const tag = th + '/' + sc + '/' + w + '/' + id;
        await p.click('#fam-list .lq-btn[data-act="fichas"][data-id="' + id + '"]'); await p.waitForTimeout(300);
        const leer = () => p.evaluate(([id, sc]) => {
            const l = FAMILY_LESSONS.find(x => x.id === id), body = document.getElementById('lq-body');
            const zhOf = (x) => sc === 'trad' ? x.zhT : x.zh;
            // lo esperado, en el orden en que se dibuja
            const filas = [];
            (l.grupos || []).forEach(g => g.items.forEach(it => {
                const cot = it.cotidiano.filter(c => !c.repetido);
                if (it.destacarCotidiano) cot.concat([it]).forEach(x => filas.push(x)); else [it].concat(cot).forEach(x => filas.push(x));
            }));
            (l.reglas || []).forEach(r => r.ejemplos.forEach(x => filas.push(x)));
            const vistas = [...body.querySelectorAll('.fam-row')].map(r => ({ zh: r.querySelector('.fam-zh').textContent, pron: r.querySelector('.fam-pron').textContent, say: r.querySelector('.lq-line-say').dataset.zh }));
            const marcas = [...body.querySelectorAll('.fam-marca')].map(m => ({ zh: m.querySelector('.fam-zh').textContent, pron: m.querySelector('.fam-pron').textContent }));
            const fuera = [...body.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 0.5; }).map(e => e.className).slice(0, 4);
            return { filas: filas.map(x => ({ zh: zhOf(x), py: x.py, zy: x.zy })), vistas, marcas,
                marcasData: (l.reglas || []).flatMap(r => r.marcas.map(m => ({ zh: zhOf(m), py: m.py, zy: m.zy }))),
                items: body.querySelectorAll('.fam-item:not(.fam-ejemplos)').length, nItems: (l.grupos || []).reduce((a, g) => a + g.items.length, 0),
                texto: body.innerText, prohibidos: body.querySelectorAll('.lq-ch, .lq-line-py, .lq-lines, #ll-bar').length,
                view: LQ_UI.state.view, desb: document.documentElement.scrollWidth > innerWidth + 1, fuera, pron: LQ_FAMILIA.pron };
        }, [id, sc]);
        let r = await leer();
        ok(r.view === 'fichas', tag + ' vista «fichas»');
        ok(r.vistas.length === r.filas.length && r.vistas.every((v, i) => v.zh === r.filas[i].zh && v.say === r.filas[i].zh && v.pron === r.filas[i].py),
            tag + ' cada forma: hanzi de la escritura, 🔊 de ese texto y pinyin guardado (' + r.vistas.length + ' formas)' +
            (r.vistas.length === r.filas.length ? '' : ' — se ven ' + r.vistas.length + ' de ' + r.filas.length));
        if (r.marcasData.length) ok(JSON.stringify(r.marcas.map(m => [m.zh, m.pron])) === JSON.stringify(r.marcasData.map(m => [m.zh, m.py])), tag + ' marcas de las reglas con su pinyin');
        ok(r.items === r.nItems, tag + ' una ficha por ítem (' + r.items + ')');
        ok(r.prohibidos === 0, tag + ' sin .lq-ch, .lq-line-py, .lq-lines ni barra «Escuchar todo»');
        ok(r.texto.includes(FUENTE + '.'), tag + ' «' + FUENTE + '» al pie');
        ok(/nivel aproximado/.test(r.texto), tag + ' «nivel aproximado» en la cabecera');
        ok(!PAIS.test(r.texto), tag + ' sin países ni banderas en pantalla');
        ok(!TUTEO.test(r.texto), tag + ' sin tuteo en pantalla');
        ok(!r.desb && !r.fuera.length, tag + ' sin desborde horizontal ' + JSON.stringify(r.fuera));
        // casos puntuales
        const vis = (zh) => r.vistas.filter(v => v.zh === zh);
        if (id === 'tocfl-fam-hermanos') {
            ok(vis('姊').length === 1 && vis('姊')[0].pron === 'jiě' && vis('姊姊')[0].pron === 'jiějie', tag + ' 姊 = jiě, 姊姊 = jiějie (no el zǐ generado)');
            ok(/(^|\n)Yo(\n|$)/.test(r.texto) && r.texto.includes('Punto de partida del mapa.'), tag + ' 自己 como ancla «Yo»');
        }
        if (id === 'tocfl-fam-tios') {
            ok(vis('伯母').length === 1, tag + ' 伯母 una sola vez (' + vis('伯母').length + ')');
            ok(vis('叔叔').length === 1 && vis('叔叔')[0].pron === 'shúshu' && vis('叔父')[0].pron === 'shúfù', tag + ' 叔 = shú');
            ok(r.texto.includes('La forma cotidiana es la misma.'), tag + ' nota de 伯母');
        }
        if (id === 'tocfl-fam-hijos') {
            const first = r.vistas[0];
            ok(first && first.zh === (sc === 'trad' ? '兒子' : '儿子') && vis(sc === 'trad' ? '女兒' : '女儿')[0].pron === "nǚ'ér", tag + ' 子: la forma cotidiana a la vista; 女兒 = nǚ\'ér');
            ok((r.texto.match(/La forma formal casi no se usa sola\./g) || []).length === 3, tag + ' nota de 子, 女 y 媳');
            ok(vis(sc === 'trad' ? '姪' : '侄').length === 1, tag + ' 姪/侄 según la escritura');
        }
        ok(!/hermana menor del esposo|hermanos menores|小姑子/.test(r.texto), tag + ' los otros sentidos de 小姑 y 弟妹 no van en pantalla');
        // zhuyin
        await p.click('#fam-pron'); await p.waitForTimeout(150);
        r = await leer();
        ok(r.pron === 'zy' && r.vistas.every((v, i) => v.pron === r.filas[i].zy), tag + ' con «Zhuyin»: cada forma muestra el zhuyin guardado');
        if (id === 'tocfl-fam-tios') ok(r.vistas.find(v => v.zh === '叔叔').pron === 'ㄕㄨˊ ˙ㄕㄨ' && r.vistas.find(v => v.zh === (sc === 'trad' ? '媽媽' : '妈妈')).pron === 'ㄇㄚ ˙ㄇㄚ', tag + ' zhuyin: 叔叔 ㄕㄨˊ ˙ㄕㄨ, 媽媽 ㄇㄚ ˙ㄇㄚ (neutro adelante)');
        if (r.marcasData.length) ok(JSON.stringify(r.marcas.map(m => m.pron)) === JSON.stringify(r.marcasData.map(m => m.zy)), tag + ' marcas con zhuyin');
        ok(!r.desb && !r.fuera.length, tag + ' con zhuyin: sin desborde ' + JSON.stringify(r.fuera));
        // 🔊: el mismo camino de voz de las lecciones (pide al servidor ese texto; si falla, voz del sistema)
        if (th === 'light' && sc === 'trad') {
            const say = await p.$('.fam-row .lq-line-say'); const txt = await say.evaluate(e => e.dataset.zh);
            await say.click(); await p.waitForTimeout(600);
            ok(tts.some(x => x.text === txt), tag + ' 🔊 pide el audio de «' + txt + '» ' + JSON.stringify(tts.slice(-2)));
        }
        if (th === 'light' && w === 320 && (id === 'tocfl-fam-tios' || id === 'tocfl-fam-reglas')) await p.screenshot({ path: OUT + id + '-' + sc + '.png' });
        await p.click('#lq-close'); await p.waitForTimeout(200);
        const tras = await p.evaluate(() => ({ view: LQ_UI.state.view, oculto: document.getElementById('lesson-pop').classList.contains('hidden'), fichas: document.querySelectorAll('#fam-list .fam-card').length }));
        ok(tras.view === null && tras.oculto && tras.fichas > 0, tag + ' cerrar: el visor se cierra y la lista sigue');
        ok(!errs.length, tag + ' sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    {   // la preferencia de zhuyin se recuerda
        const { ctx, p, errs } = await abrir({ lv: 'tocfl:A2', pron: 'zy' });
        await p.click('#fam-list .lq-btn[data-id="tocfl-fam-abuelos"]'); await p.waitForTimeout(250);
        const t = await p.evaluate(() => [document.getElementById('fam-pron').textContent, document.querySelector('.fam-pron').textContent]);
        ok(/Zhuyin/.test(t[0]) && /^[ㄅ-ㄯ˙ˊˇˋ ]+$/.test(t[1]), 'preferencia ac_fam_pron=zy: abre con zhuyin ' + JSON.stringify(t));
        ok(!errs.length, 'preferencia: sin errores JS ' + errs.join('/'));
        await ctx.close();
    }
    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails);
    process.exit(fails ? 1 : 0);
})();
