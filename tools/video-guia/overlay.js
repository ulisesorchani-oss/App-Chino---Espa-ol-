// Overlay que se inyecta SOBRE la app (page.evaluate): subtítulo, marcador de toque,
// resaltado y tarjetas de título/cierre. No toca el código de la app: solo agrega
// elementos con id vg-* y los saca al terminar.
'use strict';

const CSS = `
#vg-sub, #vg-tap, #vg-hi, #vg-card { position: fixed; pointer-events: none; z-index: 2147483647; box-sizing: border-box; }
#vg-sub { left: 12px; right: 12px; display: none; background: rgba(8, 10, 24, .92); color: #fff; border: 2px solid rgba(255,255,255,.35);
  border-radius: 18px; padding: 12px 14px; text-align: center; font: 800 27px/1.18 Inter, "Noto Sans", "DejaVu Sans", Arial, "Noto Color Emoji", sans-serif; letter-spacing: .1px; }
#vg-tap { display: none; width: 56px; height: 56px; margin: -28px 0 0 -28px; border-radius: 50%; border: 5px solid #ffd400;
  background: rgba(255, 212, 0, .30); box-shadow: 0 0 0 3px rgba(0,0,0,.65), 0 0 18px 4px rgba(255,212,0,.65); transition: none; }
#vg-tap.a { transform: scale(.55); opacity: .55; }
#vg-tap.b { transform: scale(1); opacity: 1; }
#vg-tap.c { transform: scale(.78); opacity: 1; background: rgba(255, 212, 0, .75); }
#vg-hi { display: none; border: 5px solid #ffd400; border-radius: 20px; box-shadow: 0 0 0 3px rgba(0,0,0,.6), 0 0 18px 4px rgba(255,212,0,.55); }
#vg-card { inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; color: #fff;
  background: linear-gradient(160deg, #667eea 0%, #764ba2 100%); font-family: Inter, "Noto Sans", "DejaVu Sans", Arial, "Noto Color Emoji", sans-serif; }
#vg-card img { width: 112px; height: 112px; border-radius: 24px; box-shadow: 0 6px 24px rgba(0,0,0,.35); }
#vg-card .t1 { font-size: 46px; font-weight: 800; line-height: 1.1; padding: 0 20px; }
#vg-card .t2 { font-size: 32px; font-weight: 700; line-height: 1.15; padding: 0 24px; opacity: .97; }
`;

// Se evalúa dentro de la página: crea los elementos y expone window.__vg.
function instalar() {
    if (window.__vg) return;
    const st = document.createElement('style'); st.id = 'vg-style'; st.textContent = window.__VG_CSS;
    document.head.appendChild(st);
    const mk = (id, tag) => { const e = document.createElement(tag || 'div'); e.id = id; document.body.appendChild(e); return e; };
    const sub = mk('vg-sub'), tap = mk('vg-tap'), hi = mk('vg-hi'), card = mk('vg-card');
    const navTop = () => {
        let t = innerHeight;
        document.querySelectorAll('#nav-aprender,#nav-hoy,#nav-entrenar,#nav-yo').forEach(b => { const r = b.getBoundingClientRect(); if (r.height) t = Math.min(t, r.top); });
        return t;
    };
    const rect = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, b: r.bottom, r: r.right }; };
    window.__vg = {
        navTop,
        // Abajo (sobre la barra) por defecto; arriba cuando el fondo está ocupado por una hoja con botones.
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
        rect,
        // Rojo/voz/micrófono: banderas que la corrida revisa al final.
        mic: false
    };
    // Si algo toca 🎤 (por error del guion), queda anotado y la corrida falla.
    document.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('#btn-record, #btn-train-record, .record-summary')) window.__vg.mic = true;
    }, true);
}

module.exports = { CSS, instalar };
