// Overlay que se inyecta SOBRE la app (page.evaluate): globo de indicación anclado al elemento, aro de toque,
// marco de resaltado, barra de subtítulos (solo para pasos sin toque) y tarjetas de título/cierre.
// No toca el código de la app: solo agrega elementos con id vg-* y los saca al terminar.
'use strict';

const CSS = `
#vg-sub, #vg-tap, #vg-hi, #vg-card, #vg-tip { position: fixed; pointer-events: none; z-index: 2147483647; box-sizing: border-box; }
/* Barra de subtítulos: solo para los pasos sin toque */
#vg-sub { left: 12px; right: 12px; display: none; background: #0a0e1f; color: #fff; border: 3px solid #ffd400;
  border-radius: 18px; padding: 12px 14px; text-align: center; font: 800 27px/1.18 Inter, "Noto Sans", "DejaVu Sans", Arial, "Noto Color Emoji", sans-serif; letter-spacing: .1px; }
/* Globo: mismo estilo para todos (letra grande, fondo oscuro, borde amarillo = contraste alto, legible con poco brillo) */
#vg-tip { display: none; left: 0; top: 0; width: max-content; max-width: 328px; background: #0a0e1f; color: #fff; border: 3px solid #ffd400;
  border-radius: 16px; padding: 9px 16px 10px; text-align: center; font: 800 25px/1.14 Inter, "Noto Sans", "DejaVu Sans", Arial, "Noto Color Emoji", sans-serif;
  box-shadow: 0 6px 18px rgba(0,0,0,.55); }
#vg-tip i { position: absolute; width: 18px; height: 18px; background: #0a0e1f; border: 3px solid #ffd400; transform: rotate(45deg); }
#vg-tip.abajo i { top: -11px; border-right-color: transparent; border-bottom-color: transparent; }   /* globo debajo del elemento: flecha hacia arriba */
#vg-tip.arriba i { bottom: -11px; border-left-color: transparent; border-top-color: transparent; }  /* globo arriba del elemento: flecha hacia abajo */
/* Aro de toque: delgado, sin relleno */
#vg-tap { display: none; width: 54px; height: 54px; margin: -27px 0 0 -27px; border-radius: 50%; border: 3px solid #ffd400;
  box-shadow: 0 0 0 2px rgba(0,0,0,.7), inset 0 0 0 2px rgba(0,0,0,.45); transition: none; }
#vg-tap.a { transform: scale(1.45); opacity: .45; }
#vg-tap.b { transform: scale(1); opacity: 1; }
#vg-tap.c { transform: scale(.78); opacity: 1; }
#vg-hi { display: none; border: 4px solid #ffd400; border-radius: 20px; box-shadow: 0 0 0 2px rgba(0,0,0,.6); }
#vg-card { inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; color: #fff;
  background: linear-gradient(160deg, #667eea 0%, #764ba2 100%); font-family: Inter, "Noto Sans", "DejaVu Sans", Arial, "Noto Color Emoji", sans-serif; }
#vg-card img { width: 112px; height: 112px; border-radius: 24px; box-shadow: 0 6px 24px rgba(0,0,0,.35); }
#vg-card .t1 { font-size: 42px; font-weight: 800; line-height: 1.1; padding: 0 6px; text-wrap: balance; white-space: pre-line; }  /* reparte las líneas parejas: nada de una palabra suelta */
#vg-card .t2 { font-size: 32px; font-weight: 700; line-height: 1.15; padding: 0 24px; opacity: .97; }
`;

// Medidas del globo (px de pantalla, viewport 360 de ancho).
const GLOBO = { MARGEN: 16, FLECHA: 13, ARRIBA_MIN: 28, ABAJO_AIRE: 6, MAX_LINEAS: 2, ESQUINA: 22 };

// Se evalúa dentro de la página: crea los elementos y expone window.__vg.
function instalar(G) {
    if (window.__vg) return;
    const st = document.createElement('style'); st.id = 'vg-style'; st.textContent = window.__VG_CSS;
    document.head.appendChild(st);
    const mk = (id, tag) => { const e = document.createElement(tag || 'div'); e.id = id; document.body.appendChild(e); return e; };
    const sub = mk('vg-sub'), tap = mk('vg-tap'), hi = mk('vg-hi'), card = mk('vg-card'), tip = mk('vg-tip');
    const flecha = document.createElement('i');
    const navTop = () => {
        let t = innerHeight;
        document.querySelectorAll('#nav-aprender,#nav-hoy,#nav-entrenar,#nav-yo').forEach(b => { const r = b.getBoundingClientRect(); if (r.height) t = Math.min(t, r.top); });
        return t;
    };
    const rect = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, b: r.bottom, r: r.right }; };
    const visible = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('.hidden'); };
    const cruza = (a, b, m) => { m = m || 0; return a.x < b.x + b.w + m && a.x + a.w > b.x - m && a.y < b.y + b.h + m && a.y + a.h > b.y - m; };
    // Zonas prohibidas para el globo (además del elemento tocado): hanzi grande de la tarjeta y avisos de primera vez.
    const prohibidas = () => {
        const out = [];
        [['hanzi', '#sentence-text'], ['aviso de primera vez', '.ob-hint'], ['aviso de primera vez', '.ob-win'], ['aviso de primera vez', '#feature-tip-pop']].forEach(([n, s]) => {
            document.querySelectorAll(s).forEach(e => { if (visible(e)) out.push({ nombre: n, r: rect(e) }); });
        });
        return out;
    };
    // Líneas de texto de la app que se ven de verdad (sin las de nuestro overlay y sin las tapadas por una hoja/ventana).
    const textos = () => {
        const out = [], tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), rg = document.createRange(); let n;
        while ((n = tw.nextNode())) {
            const t = n.nodeValue; if (!t || !t.trim()) continue;
            const e = n.parentElement; if (!e || e.closest('#vg-sub,#vg-tap,#vg-hi,#vg-card,#vg-tip,script,style,noscript,option')) continue;
            const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
            rg.selectNodeContents(n);
            for (const r of rg.getClientRects()) {
                if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight) continue;
                const top = document.elementFromPoint(Math.min(Math.max(r.x + r.width / 2, 0), innerWidth - 1), Math.min(Math.max(r.y + r.height / 2, 0), innerHeight - 1));
                if (!top || !(e.contains(top) || top.contains(e))) continue;
                const fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight, 10) || 400;
                // «Título» = encabezado, o texto en negrita de 16 px o más que es lo ÚNICO de su bloque (una palabra en negrita dentro de un párrafo no lo es).
                let blq = e; while (blq.parentElement && /^inline/.test(getComputedStyle(blq).display)) blq = blq.parentElement;
                const solo = blq.textContent.replace(/\s+/g, ' ').trim().length <= t.replace(/\s+/g, ' ').trim().length + 2;
                out.push({ x: r.x, y: r.y, w: r.width, h: r.height, el: e, txt: t.trim().slice(0, 28), titulo: /^H[1-6]$/.test(e.tagName) || (fw >= 700 && fs >= 16 && solo) });
            }
        }
        return out;
    };
    // Tarjeta que contiene al elemento (caja con esquinas redondeadas y fondo/sombra, de tamaño de tarjeta).
    const tarjetaDe = (el) => {
        const r0 = el.getBoundingClientRect();
        for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
            const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
            const fondo = cs.boxShadow !== 'none' || (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || parseFloat(cs.borderTopWidth) > 0;
            if (r.width >= 200 && r.width <= 345 && r.height >= r.height * 0 + r0.height * 1.5 && r.height <= 600 && parseFloat(cs.borderTopLeftRadius) >= 10 && fondo) return e;
        }
        return null;
    };
    // Texto que el globo NUNCA puede tapar: títulos de la tarjeta del elemento y etiquetas de su misma fila.
    const contexto = (el, R, lineas) => {
        const card = tarjetaDe(el) || (el.getBoundingClientRect().height > 60 ? el : null), prot = [];
        lineas.forEach(l => {
            const dentroEl = el.contains(l.el);
            if (dentroEl) return;                                   // el propio elemento ya está fuera de límites
            const mismaFila = l.y + l.h / 2 > R.y - 2 && l.y + l.h / 2 < R.y + R.h + 2;
            const tituloTarjeta = !!card && card.contains(l.el) && l.titulo;
            if (mismaFila) prot.push({ r: l, txt: l.txt, por: 'etiqueta de la misma fila' });
            else if (tituloTarjeta) prot.push({ r: l, txt: l.txt, por: 'nombre de la tarjeta' });
        });
        return { protegidas: prot.map(p => ({ r: { x: p.r.x, y: p.r.y, w: p.r.w, h: p.r.h }, txt: p.txt, por: p.por })) };
    };
    // Cuánto texto oculta el globo en esa posición (px² de texto; los títulos pesan 6 veces más).
    const puntaje = (G1, lineas) => {
        let puntos = 0, px = 0; const titulos = [];
        lineas.forEach(l => {
            const w = Math.min(G1.x + G1.w, l.x + l.w) - Math.max(G1.x, l.x), h = Math.min(G1.y + G1.h, l.y + l.h) - Math.max(G1.y, l.y);
            if (w > 0 && h > 0) { const a = w * h; px += a; puntos += a * (l.titulo ? 6 : 1); if (l.titulo) titulos.push(l.txt); }
        });
        return { puntos, px: Math.round(px), titulos };
    };
    const topDe = (b, lado, R) => (lado === 'abajo' ? R.y + R.h + G.FLECHA : R.y - G.FLECHA - b.h);
    const limites = () => ({ ymin: G.ARRIBA_MIN, ymax: navTop() - G.ABAJO_AIRE, xmin: G.MARGEN, xmax: innerWidth - G.MARGEN });
    window.__vg = {
        navTop, rect, mic: false,
        // Barra de subtítulos: abajo (sobre la barra) por defecto; arriba cuando el fondo está ocupado por una hoja con botones.
        sub(txt, arriba) {
            if (!txt) { sub.style.display = 'none'; return null; }
            sub.textContent = txt; sub.style.display = 'block';
            if (arriba) { sub.style.top = '12px'; sub.style.bottom = 'auto'; } else { sub.style.top = 'auto'; sub.style.bottom = Math.round(innerHeight - navTop() + 8) + 'px'; }
            const r = rect(sub); r.arriba = !!arriba; r.nav = navTop(); return r;
        },
        tap(el, estado) {
            if (!el) { tap.style.display = 'none'; return; }
            const r = el.getBoundingClientRect();
            tap.style.left = Math.round(r.x + r.width / 2) + 'px'; tap.style.top = Math.round(r.y + r.height / 2) + 'px';
            tap.className = estado; tap.style.display = 'block';
        },
        hi(el) {
            if (!el) { hi.style.display = 'none'; return; }
            const r = el.getBoundingClientRect(), p = 5;
            Object.assign(hi.style, { left: (r.x - p) + 'px', top: (r.y - p) + 'px', width: (r.width + 2 * p) + 'px', height: (r.height + 2 * p) + 'px', display: 'block' });
        },
        card(t1, t2, icono) {
            if (!t1) { card.style.display = 'none'; return; }
            card.innerHTML = (icono ? '<img alt="" src="' + icono + '">' : '') + '<div class="t1"></div>' + (t2 ? '<div class="t2"></div>' : '');
            card.querySelector('.t1').textContent = t1; if (t2) card.querySelector('.t2').textContent = t2;
            card.style.display = 'flex';
        },
        // Globo anclado al rectángulo del elemento (uno solo a la vez). Ubicación automática arriba/abajo según el espacio,
        // y entre las posiciones posibles elige la que OCULTA MENOS TEXTO de la app (los títulos pesan más).
        // Regla dura: nunca tapa el elemento, el hanzi grande, los avisos de primera vez, las barras, ni el nombre (título)
        // de la tarjeta que contiene al elemento, ni las etiquetas de su misma fila.
        // Devuelve { ok, lado, motivo?, globo, destino, pegado, ajuste, oculto: {px, titulos} }.
        globo(el, txt) {
            if (!el || !txt) { tip.style.display = 'none'; return { ok: true, oculto: true }; }
            const L = limites(), R0 = el.getBoundingClientRect();
            if (!visible(el) || R0.bottom < 0 || R0.top > innerHeight) { tip.style.display = 'none'; return { ok: false, oculto: true, motivo: 'el elemento no está a la vista' }; }
            // Si una hoja o ventana tapa el elemento (p. ej. la ventana de palabra), el globo se esconde: ya no hay a qué apuntar.
            const tope = document.elementFromPoint(R0.x + R0.width / 2, R0.y + R0.height / 2);
            if (tope && !el.contains(tope)) { tip.style.display = 'none'; return { ok: true, oculto: true, tapado: true }; }
            const R = { x: R0.x, y: R0.y, w: R0.width, h: R0.height };
            tip.textContent = txt; tip.appendChild(flecha); tip.style.display = 'block'; tip.style.left = '0px'; tip.style.top = '0px';
            const b = { w: tip.offsetWidth, h: tip.offsetHeight };
            const lh = parseFloat(getComputedStyle(tip).lineHeight);
            if (b.h > lh * G.MAX_LINEAS + 30) { tip.style.display = 'none'; return { ok: false, motivo: 'el texto «' + txt + '» no cabe en 2 líneas: acortalo' }; }
            const pro = prohibidas(), lineas = textos(), ctx = contexto(el, R, lineas);
            const cx = R.x + R.w / 2;
            const izq0 = Math.min(Math.max(cx - b.w / 2, L.xmin), L.xmax - b.w);
            const rango = L.xmax - b.w - L.xmin;
            const lefts = [izq0, L.xmin, L.xmax - b.w, L.xmin + rango * .25, L.xmin + rango * .5, L.xmin + rango * .75].filter(v => v >= L.xmin - .5 && v <= L.xmax - b.w + .5);
            const espacio = { abajo: L.ymax - (R.y + R.h + G.FLECHA), arriba: (R.y - G.FLECHA) - L.ymin };
            const orden = espacio.abajo >= espacio.arriba ? ['abajo', 'arriba'] : ['arriba', 'abajo'];
            const motivos = []; let mejor = null;
            for (const lado of orden) {
                const top = topDe(b, lado, R);
                if (top < L.ymin || top + b.h > L.ymax) { motivos.push(lado + ': no entra entre la barra de estado y la barra inferior'); continue; }
                for (const izq of lefts) {
                    const G1 = { x: izq, y: top, w: b.w, h: b.h };
                    if (cruza(G1, R, 2)) { motivos.push(lado + ': tapa el elemento'); continue; }
                    const choca = pro.find(p => cruza(G1, p.r, 2));
                    if (choca) { motivos.push(lado + ': tapa ' + choca.nombre); continue; }
                    // flecha: apunta al centro del elemento, dentro del globo y sobre el elemento
                    const ax = Math.min(Math.max(cx, izq + G.ESQUINA), izq + b.w - G.ESQUINA);
                    if (ax < R.x + 4 || ax > R.x + R.w - 4) { motivos.push(lado + ': la flecha no llega al elemento'); continue; }
                    const dura = ctx.protegidas.find(p => cruza(G1, p.r, 0));
                    if (dura) { motivos.push(lado + ': taparía «' + dura.txt + '» (' + dura.por + ')'); continue; }
                    const sc = puntaje(G1, lineas); sc.puntos += Math.abs(izq - izq0) * 15;   // desplazarse del centro cuesta: solo si oculta bastante menos texto
                    const cand = { lado, izq, top, ax, G1, sc };
                    if (!mejor || sc.puntos < mejor.sc.puntos - 0.5) mejor = cand;   // empate → queda el primero (más espacio y más centrado)
                }
            }
            if (!mejor) { tip.style.display = 'none'; return { ok: false, motivo: 'sin lugar para el globo «' + txt + '» (' + [...new Set(motivos)].join('; ') + ')' }; }
            const { lado, izq, top, ax } = mejor;
            tip.className = lado; tip.style.left = Math.round(izq) + 'px'; tip.style.top = Math.round(top) + 'px';
            flecha.style.left = Math.round(ax - izq - 9 - 3) + 'px';
            const pegado = [];
            if (R.x < G.MARGEN) pegado.push('izquierda'); if (R.x + R.w > innerWidth - G.MARGEN) pegado.push('derecha');
            if (R.y < G.ARRIBA_MIN + 10) pegado.push('arriba'); if (R.y + R.h > navTop() - 10 && R.y < navTop() - 4) pegado.push('barra inferior');
            if (R.y >= navTop() - 4) pegado.push('en la barra inferior');
            const ajuste = [];
            if (Math.abs(izq - (cx - b.w / 2)) > 1) ajuste.push(izq <= L.xmin + 1 ? 'globo pegado al margen izquierdo de 16 px' : izq >= L.xmax - b.w - 1 ? 'globo pegado al margen derecho de 16 px' : 'globo corrido');
            if (Math.abs(ax - cx) > 1) ajuste.push('flecha corrida');
            return { ok: true, lado, destino: R, globo: mejor.G1, pegado, ajuste, ocultaTexto: mejor.sc };
        },
        // Comprobación independiente (lee lo que realmente quedó dibujado): el globo no toca el elemento, no se sale de la
        // pantalla (márgenes de 16 px), no pisa la barra de estado, la barra inferior, el hanzi, los avisos de primera vez,
        // el nombre de la tarjeta del elemento ni las etiquetas de su fila.
        chequear(el) {
            if (tip.style.display === 'none') return [];
            const g = rect(tip), L = limites(), errs = [];
            const gg = { x: g.x, y: g.y, w: g.w, h: g.h };
            if (g.x < L.xmin - 0.5 || g.r > L.xmax + 0.5) errs.push('se sale de los márgenes laterales de 16 px');
            if (g.y < L.ymin - 0.5) errs.push('queda sobre la barra de estado');
            if (g.b > L.ymax + 0.5) errs.push('queda sobre la barra inferior');
            if (el) {
                const r = el.getBoundingClientRect(), R = { x: r.x, y: r.y, w: r.width, h: r.height };
                if (cruza(gg, R, 0)) errs.push('tapa el elemento tocado');
                contexto(el, R, textos()).protegidas.forEach(p => { if (cruza(gg, p.r, 0)) errs.push('tapa «' + p.txt + '» (' + p.por + ')'); });
            }
            prohibidas().forEach(p => { if (cruza(gg, p.r, 0)) errs.push('tapa ' + p.nombre); });
            return errs;
        }
    };
    // Si algo toca 🎤 (por error del guion), queda anotado y la corrida falla.
    document.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('#btn-record, #btn-train-record, .record-summary')) window.__vg.mic = true;
    }, true);
}

module.exports = { CSS, GLOBO, instalar };
