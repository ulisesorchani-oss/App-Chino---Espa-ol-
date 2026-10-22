// ============================================================
// readings-unify.js — FUENTE ÚNICA de lecturas para las pantallas (window.LECTURAS)
// ------------------------------------------------------------
// Une, en una sola lista normalizada, las lecturas v1 (window.READINGS: readings-pilot.js,
// readings-tocfl.js) y las del esquema v2 (window.READINGS_V2: readings-examen.js). Las pantallas
// (lista de Exámenes, «Leer», comprensión) leen SOLO esto; no tocan los datos crudos.
//
// TRANSITORIO en su parte v1: cuando los 12 textos v1 pasen al generador (tools/build-readings-examen.js),
// se borra normV1() y window.READINGS. tools/check-readings.js falla si un mismo id está en los dos orígenes.
//
// Forma normalizada (superset; lo que no existe en un origen queda null/[]):
//   { id, kind: 'reading', origen: 'v1'|'v2', tipo: 'examen'|'estudio', revision,
//     hsk, exam?, examLvl?,              // los lee app.js (scriptFor/familyOf) para elegir 简/繁 y la familia
//     nivelKey ('HSK3', 'TOCFL-B1'), nivelLabel ('HSK 3', 'TOCFL B1'),
//     emoji, genre, titleZh, titleZhT, titleEs, blurb,
//     lines: [{ zh, zhT, es }],            // v1: las líneas; v2: los párrafos
//     glosario: [{ zh, zhT, es, categoria, nivelLista, fueraDeNivel }],   // fueraDeNivel: true | false | null (v1: no se calcula)
//     preguntas: [{ type, es, opts[], ok, fixed, vf?, why, whyNot[] }],  // ok = índice de la correcta; fixed = no se baraja (V/F)
//     banco, parecidas, capa2 (v2) }
// V/F existe SOLO en v2 (se muestra como Verdadero/Falso con opciones fijas); v1 no cambia.
// Filtro por `revision`: constante REVISION_FILTRO (sin parámetro de URL ni franja).
// ============================================================
(function readingsUnify() {
    'use strict';
    const REVISION_FILTRO = 'todas'; // 'todas' | 'revisado+' (revisado y nativo) | 'nativo'

    const TOCFL_LABEL = (l) => (l === 'C1' ? 'C' : l);
    const nivelOf = (r) => r.exam === 'TOCFL'
        ? { key: 'TOCFL-' + r.examLvl, label: 'TOCFL ' + TOCFL_LABEL(r.examLvl), rank: 100 + ['Prep', 'A1', 'A2', 'B1', 'B2', 'C1'].indexOf(r.examLvl) }
        : { key: 'HSK' + r.hsk, label: 'HSK ' + r.hsk, rank: Number(r.hsk) };
    // revision de los v1 (hoy no tienen el campo): HSK 3 lo revisó el autor; HSK 5 y TOCFL siguen pendientes
    const REVISION_V1 = { HSK3: 'revisado', HSK5: 'pendiente', 'TOCFL-B1': 'pendiente' };

    function normV1(r) {
        const n = nivelOf(r);
        return Object.assign({}, r, {
            origen: 'v1', tipo: 'examen', revision: REVISION_V1[n.key] || 'pendiente',
            nivelKey: n.key, nivelLabel: n.label, nivelRank: n.rank,
            glosario: (r.keywords || []).map(k => ({ zh: k.zh, zhT: k.zhT || k.zh, es: k.es, categoria: null, nivelLista: null, fueraDeNivel: null, py: k.py || '' })),
            preguntas: (r.questions || []).map(q => ({ type: q.type, es: q.es, opts: q.opts, ok: 0, fixed: false, why: q.why, whyNot: q.whyNot || [] })),
            banco: null, parecidas: [], capa2: null
        });
    }

    function normV2(r) {
        const hsk = r.nivel, n = nivelOf({ hsk: hsk });
        return {
            id: r.id, kind: 'reading', origen: 'v2', tipo: r.tipo, revision: r.revision,
            hsk: hsk, nivelKey: n.key, nivelLabel: n.label, nivelRank: n.rank,
            emoji: r.emoji, genre: r.genero, largo: r.largo,
            titleZh: r.titulo.zh, titleZhT: r.titulo.zhT, titleEs: r.titulo.es, blurb: '',
            lines: r.parrafos.map(p => ({ zh: p.zh, zhT: p.zhT, es: p.es })),
            glosario: r.glosario.map(g => ({ zh: g.zh, zhT: g.zhT, es: g.es, categoria: g.categoria, nivelLista: g.nivelLista, fueraDeNivel: g.fueraDeNivel })),
            preguntas: r.comprension.map(q => q.tipo === 'vf'
                ? { type: 'vf', es: q.es, opts: ['Verdadero', 'Falso'], ok: q.vf ? 0 : 1, fixed: true, vf: q.vf, why: q.why, whyNot: [] }
                : { type: q.tipo, es: q.es, opts: q.opts, ok: 0, fixed: false, why: q.why, whyNot: q.whyNot || [] }),
            banco: r.banco || null, parecidas: r.parecidas || [], capa2: r.capa2 || null,
            nombres: r.nombres || [], fueraDeNivelDeclarado: r.fueraDeNivelDeclarado || []
        };
    }

    const v1 = Array.isArray(window.READINGS) ? window.READINGS.filter(r => r && r.kind === 'reading') : [];
    const v2 = Array.isArray(window.READINGS_V2) ? window.READINGS_V2 : [];
    const ALL = v1.map(normV1).concat(v2.map(normV2));

    const visible = (r) => REVISION_FILTRO === 'todas' || (REVISION_FILTRO === 'revisado+' ? (r.revision === 'revisado' || r.revision === 'nativo') : r.revision === 'nativo');
    const byLevel = (a, b) => (a.nivelRank - b.nivelRank);

    window.LECTURAS = ALL;
    window.LECTURAS_API = {
        all: () => ALL.slice(),
        get: (id) => ALL.find(r => r.id === id) || null,
        visible: visible,
        examen: () => ALL.filter(r => visible(r) && r.tipo === 'examen').sort(byLevel),
        estudio: () => ALL.filter(r => visible(r) && r.tipo === 'estudio').sort(byLevel),
        // «Nivel aproximado: HSK 4 · no oficial»: la etiqueta de TODOS los textos (HSK y TOCFL)
        etiqueta: (r) => 'Nivel aproximado: ' + r.nivelLabel + ' · no oficial'
    };
})();
