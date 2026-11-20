// fix/css-accesibilidad: tres arreglos de CSS medidos en el navegador (estilos calculados + rectángulos reales).
//   6. Anillo de foco (:focus-visible) con Tab real: ≥ 3:1 (WCAG 1.4.11) contra la tarjeta blanca Y contra los extremos
//      del fondo de la página, en los tres temas. En claro el anillo era blanco (1,00:1 sobre una tarjeta blanca).
//   7. Pestaña activa de Aprender (.mtab.active): texto ≥ 4,5:1 sobre su fondo, en los tres temas (en oscuro: 2,21:1).
//   8. Píldora «Sin conexión»: ningún pedazo se superpone con la barra #app-nav, a 360 px y a ≥ 768 px.
const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('css-accesibilidad');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

// ---- contraste (WCAG) ----
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const parse = (s) => { const m = String(s).match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?\s*\)/); return m ? { rgb: [+m[1], +m[2], +m[3]], a: m[4] === undefined ? 1 : +m[4] } : null; };
const over = (fg, bg) => fg.rgb.map((v, i) => Math.round(v * fg.a + bg[i] * (1 - fg.a))); // fg con alfa sobre bg opaco
const r2 = (x) => Math.round(x * 100) / 100;

async function abrir(b, theme, w, h) {
    const ctx = await b.newContext({ viewport: { width: w || 360, height: h || 740 }, serviceWorkers: 'block' });
    await ctx.route(/^(?!http:\/\/(127\.0\.0\.1|localhost)).*/, (r) => r.abort());
    await ctx.addInitScript((t) => {
        if (sessionStorage.getItem('i')) return; sessionStorage.setItem('i', '1'); localStorage.clear();
        localStorage.setItem('ac_onboarding_done_v2', '1'); localStorage.setItem('theme', t);
    }, theme);
    const p = await ctx.newPage(); p._errs = []; p.on('pageerror', (e) => p._errs.push(e.message));
    await p.goto(APP_URL); await p.waitForTimeout(1500);
    return { ctx, p };
}

(async () => {
    const b = await chromium.launch({ ...LAUNCH });

    for (const th of ['light', 'dark', 'paper']) {
        const { ctx, p } = await abrir(b, th);
        // --- 6: anillo de foco con Tab real, medido en PÍXELES: el del anillo contra el del fondo que lo rodea ---
        // Tres superficies: una tarjeta blanca (Aprender), el fondo de la página junto a las pestañas (arriba) y el
        // fondo junto al botón de borrar (abajo, donde el degradado es más oscuro).
        const objetivos = [
            ['tarjeta blanca', 'aprender', '.lesson-card .lq-btn'],
            ['fondo de página (arriba)', 'aprender', '#tab-lessons'],
            ['fondo de página (abajo)', 'yo', '#btn-reset']
        ];
        for (const [nombre, vista, sel] of objetivos) {
            await p.evaluate((v) => showView(v), vista); await p.waitForTimeout(350);
            await p.evaluate(() => document.querySelectorAll('[data-probe]').forEach((e) => e.removeAttribute('data-probe')));
            const hay = await p.evaluate((s) => { const e = [...document.querySelectorAll(s)].find((x) => x.offsetParent); if (!e) return false; e.setAttribute('data-probe', '1'); e.scrollIntoView({ block: 'center' }); return true; }, sel);
            ok(hay, th + ' · ' + nombre + ': existe ' + sel);
            if (!hay) continue;
            await p.evaluate(() => {
                const t = document.querySelector('[data-probe]');
                const todos = [...document.querySelectorAll('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent);
                const i = todos.indexOf(t); (todos[i - 1] || document.body).focus();
            });
            await p.keyboard.press('Tab'); await p.waitForTimeout(450); // la transición de v11 dura 0,3 s
            const f = await p.evaluate(() => {
                const e = document.activeElement, cs = getComputedStyle(e), r = e.getBoundingClientRect();
                return { sonda: e.hasAttribute('data-probe'), fv: e.matches(':focus-visible'), estilo: cs.outlineStyle, ancho: parseFloat(cs.outlineWidth), off: parseFloat(cs.outlineOffset), color: cs.outlineColor, x: r.left, y: r.top + r.height / 2 };
            });
            ok(f.sonda && f.fv, th + ' · ' + nombre + ': Tab real deja el foco en la sonda con :focus-visible');
            ok(f.estilo === 'solid' && f.ancho >= 2, th + ' · ' + nombre + ': anillo sólido de ≥ 2 px (' + f.estilo + ' ' + f.ancho + 'px)');
            const png = (await p.screenshot()).toString('base64');
            // píxeles: trazo del anillo (mitad del trazo), halo (mitad del hueco del offset) y fondo (3 px más afuera)
            const xo = Math.round(f.x - f.off - f.ancho / 2), xh = Math.round(f.x - f.off / 2), xb = Math.round(f.x - f.off - f.ancho - 3), yy = Math.round(f.y);
            const px = await p.evaluate(async ([b64, pts]) => {
                const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
                const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
                return pts.map(([x, y]) => Array.from(g.getImageData(x, y, 1, 1).data).slice(0, 3));
            }, [png, [[xo, yy], [xh, yy], [xb, yy]]]);
            const [trazo, halo, fondo] = px;
            // anillo de un tono: el trazo contra el fondo. De dos tonos (trazo + halo): el halo se ve contra el fondo y el trazo contra el halo,
            // o el trazo se ve contra el fondo (≥ 3:1, WCAG 1.4.11) — alcanza con que el indicador se distinga en algún par adyacente.
            const cTF = ratio(trazo, fondo), cHF = ratio(halo, fondo), cTH = ratio(trazo, halo);
            ok(Math.max(cTF, Math.min(cHF, cTH)) >= 3, th + ' · ' + nombre + ': anillo ' + f.color + ' (trazo rgb(' + trazo + '), halo rgb(' + halo + ')) sobre fondo rgb(' + fondo + ') → trazo/fondo ' + r2(cTF) + ':1 · halo/fondo ' + r2(cHF) + ':1 · trazo/halo ' + r2(cTH) + ':1 (alguno ≥ 3)');
            // y el trazo SIEMPRE se distingue de lo que tiene adentro (el elemento o el halo) o de lo que tiene afuera
            ok(Math.max(cTF, cTH) >= 3, th + ' · ' + nombre + ': el trazo se distingue de su contorno inmediato (' + r2(Math.max(cTF, cTH)) + ':1)');
            if (nombre === 'tarjeta blanca') await p.screenshot({ path: OUT + 'foco-' + th + '.png' });
        }
        await p.evaluate(() => showView('aprender')); await p.waitForTimeout(350);

        // campos de texto (foco por clic = :focus-visible): anillo oscuro (en claro) y SIN el halo, para conservar su borde y brillo propios
        await p.evaluate(() => showView('hoy')); await p.waitForTimeout(300);
        const campo = await p.evaluate(() => { const e = document.getElementById('answer-input'); e.focus(); const cs = getComputedStyle(e); return { fv: e.matches(':focus-visible'), color: cs.outlineColor, sombra: cs.boxShadow }; });
        ok(campo.fv && (th !== 'light' || campo.color === 'rgb(27, 34, 48)'), th + ' · #answer-input con foco: anillo ' + campo.color);
        ok(!/rgb\(255, 255, 255\) 0px 0px 0px 2px/.test(campo.sombra), th + ' · #answer-input no recibe el halo blanco (box-shadow: ' + campo.sombra + ')');
        await p.evaluate(() => showView('aprender')); await p.waitForTimeout(300);

        // --- 7: pestaña activa de Aprender ---
        const m = await p.evaluate(() => { const e = document.querySelector('.mtab.active'); const cs = getComputedStyle(e); return { color: cs.color, bg: cs.backgroundColor, img: cs.backgroundImage }; });
        const mc = parse(m.color), mb = parse(m.bg);
        ok(m.img === 'none' && mb && mb.a === 1, th + ' · .mtab.active tiene fondo plano y opaco (' + m.bg + ')');
        const cm = ratio(mc.rgb, mb.rgb);
        ok(cm >= 4.5, th + ' · .mtab.active: texto ' + m.color + ' sobre ' + m.bg + ' = ' + r2(cm) + ':1 (≥ 4,5)');
        await p.screenshot({ path: OUT + 'mtab-' + th + '.png', clip: await p.evaluate(() => { const r = document.querySelector('.mtab.active').parentElement.getBoundingClientRect(); return { x: 0, y: Math.max(0, r.y), width: 360, height: r.height }; }) });
        ok(p._errs.length === 0, th + ' · sin errores JS ' + p._errs.join(' / '));
        await ctx.close();
    }

    // --- 8: píldora «Sin conexión» contra la barra inferior ---
    for (const [w, h] of [[360, 740], [412, 915], [768, 900], [1000, 800]]) {
        const { ctx, p } = await abrir(b, 'light', w, h);
        await ctx.setOffline(true); await p.waitForTimeout(500);
        const r = await p.evaluate(() => {
            const pill = document.getElementById('offline-pill'), nav = document.getElementById('app-nav');
            const a = pill.getBoundingClientRect(), c = nav.getBoundingClientRect();
            const inter = Math.max(0, Math.min(a.right, c.right) - Math.max(a.left, c.left)) * Math.max(0, Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top));
            const botones = [...nav.querySelectorAll('.nav-btn')].map((x) => { const q = x.getBoundingClientRect(); return Math.max(0, Math.min(a.right, q.right) - Math.max(a.left, q.left)) * Math.max(0, Math.min(a.bottom, q.bottom) - Math.max(a.top, q.top)); });
            return { visible: !pill.classList.contains('hidden') && a.width > 0, pill: [a.left, a.top, a.right, a.bottom].map(Math.round), nav: [c.left, c.top, c.right, c.bottom].map(Math.round), inter, botones, dentro: a.left >= 0 && a.right <= innerWidth && a.top >= 0 && a.bottom <= innerHeight };
        });
        ok(r.visible, w + 'px · sin conexión la píldora se ve');
        ok(r.inter === 0 && r.botones.every((x) => x === 0), w + 'px · la píldora no se superpone con #app-nav (píldora ' + r.pill + ' · barra ' + r.nav + ' · área ' + r.inter + ')');
        ok(r.dentro, w + 'px · la píldora entra completa en la pantalla');
        await p.screenshot({ path: OUT + 'pildora-' + w + '.png' });
        await ctx.close();
    }

    await b.close();
    console.log('comprobaciones ' + n + ' · FAILS ' + fails + (fails ? '' : ' · TODO OK'));
    process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
