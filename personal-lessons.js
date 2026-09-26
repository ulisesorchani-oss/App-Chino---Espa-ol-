// ============================================================
// personal-lessons.js — Mis lecturas (Personales)
// ============================================================
// v9.7x: guarda el texto pegado en el Lector (banner de Entrenar) en
// IndexedDB — NO localStorage (ya compartido con SRS/stats/settings,
// cuota chica) — con nombre + nivel LIBRE (no ligado a HSK/TOCFL/DELE).
// Alcance v1 (confirmado): guardar y volver a leer/escuchar el texto
// tal cual. CERO generación de ejercicios/cloze — eso queda para más
// adelante si hace falta.
//
// Patrón: IIFE autocontenida (plInit), mismo espíritu que
// minimal-pairs.js/daily-stories.js. Expone window.PL = {
// openSaveDialog, renderList }:
//   - reader.js llama PL.openSaveDialog() desde el botón 💾 Guardar
//     del Lector.
//   - app.js llama PL.renderList() al activar la tab "📌 Personales"
//     de Aprender (setupModuleTabs).
//
// Es un script clásico (sin import/export): se carga después de
// app.js/reader.js (usa showView/stopReader/updateReaderLang/
// renderReaderPreview/detectReaderLang/moduleStatus/escHtml en tiempo
// de ejecución, igual que el resto de los módulos extraídos).
// ============================================================
(function plInit() {
    'use strict';

    const PL_DB_NAME = 'ac_personal_db';
    const PL_DB_VERSION = 1;
    const PL_STORE = 'readings';
    const PL_PERSIST_FLAG = 'ac_storage_persist_asked'; // flag chico (no el contenido)

    let dbPromise = null;
    function plOpenDB() {
        if (dbPromise) return dbPromise;
        dbPromise = new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) { reject(new Error('IndexedDB no disponible')); return; }
            const req = indexedDB.open(PL_DB_NAME, PL_DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(PL_STORE)) {
                    const store = db.createObjectStore(PL_STORE, { keyPath: 'id' });
                    store.createIndex('createdAt', 'createdAt');
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
        return dbPromise;
    }
    function plStore(mode) {
        return plOpenDB().then((db) => db.transaction(PL_STORE, mode).objectStore(PL_STORE));
    }
    function plAdd(entry) {
        return plStore('readwrite').then((store) => new Promise((resolve, reject) => {
            const req = store.add(entry);
            req.onsuccess = () => resolve(entry);
            req.onerror = () => reject(req.error);
        }));
    }
    function plPut(entry) {
        return plStore('readwrite').then((store) => new Promise((resolve, reject) => {
            const req = store.put(entry);
            req.onsuccess = () => resolve(entry);
            req.onerror = () => reject(req.error);
        }));
    }
    function plDelete(id) {
        return plStore('readwrite').then((store) => new Promise((resolve, reject) => {
            const req = store.delete(id);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        }));
    }
    function plGetAll() {
        return plStore('readonly').then((store) => new Promise((resolve, reject) => {
            const req = store.getAll();
            req.onsuccess = () => resolve((req.result || []).sort((a, b) => b.createdAt - a.createdAt));
            req.onerror = () => reject(req.error);
        }));
    }

    // Se pide UNA sola vez, en el momento del primer guardado exitoso —
    // no en cada guardado ni al cargar la app. En la mayoría de los
    // navegadores esto no muestra ningún diálogo (Chrome lo concede o no
    // en silencio); igual solo tiene sentido pedirlo una vez.
    async function plEnsurePersisted() {
        try {
            if (localStorage.getItem(PL_PERSIST_FLAG)) return;
            localStorage.setItem(PL_PERSIST_FLAG, '1');
        } catch (e) { return; }
        try {
            if (navigator.storage && typeof navigator.storage.persist === 'function') {
                await navigator.storage.persist();
            }
        } catch (e) { /* no bloquea el guardado si falla */ }
    }

    function esc(s) {
        return (typeof escHtml === 'function') ? escHtml(s)
            : String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function plFormatDate(ts) {
        try { return new Date(ts).toLocaleDateString(undefined, { day: '2-digit', month: 'short' }); }
        catch (e) { return ''; }
    }

    // ===== Popup de nombre + nivel (guardar / renombrar) =====
    function plPopupBody(defaults) {
        return '<h3 class="section-title">' + (defaults.id ? '✏️ Renombrar lectura' : '💾 Guardar en Mis lecturas') + '</h3>' +
            '<label class="sr-only" for="pl-name-input">Nombre</label>' +
            '<input type="text" id="pl-name-input" class="reader-input" style="min-height:auto;" maxlength="60" ' +
            'placeholder="Nombre (ej.: Cuento del zorro)" value="' + esc(defaults.name || '') + '">' +
            '<label class="sr-only" for="pl-level-input">Nivel</label>' +
            '<input type="text" id="pl-level-input" class="reader-input" style="min-height:auto;margin-top:8px;" maxlength="30" ' +
            'placeholder="Nivel (opcional, texto libre: B1, fácil, examen...)" value="' + esc(defaults.level || '') + '">' +
            '<div class="reader-actions" style="margin-top:12px;">' +
            '<button type="button" class="btn-secondary" id="btn-pl-cancel">Cancelar</button>' +
            '<button type="button" class="btn-primary" id="btn-pl-confirm">Guardar</button>' +
            '</div>';
    }
    function plClosePopup() {
        const pop = document.getElementById('personal-pop');
        if (pop) pop.classList.add('hidden');
    }
    function plOpenPopup(defaults, onConfirm) {
        const pop = document.getElementById('personal-pop');
        const body = document.getElementById('personal-pop-body');
        if (!pop || !body) return;
        body.innerHTML = plPopupBody(defaults);
        pop.classList.remove('hidden');
        const nameInput = document.getElementById('pl-name-input');
        if (nameInput) nameInput.focus();
        const cancelBtn = document.getElementById('btn-pl-cancel');
        const confirmBtn = document.getElementById('btn-pl-confirm');
        if (cancelBtn) cancelBtn.addEventListener('click', plClosePopup);
        if (confirmBtn) confirmBtn.addEventListener('click', () => {
            const name = (nameInput.value || '').trim();
            if (!name) { nameInput.focus(); return; }
            const level = (document.getElementById('pl-level-input').value || '').trim();
            plClosePopup();
            onConfirm(name, level);
        });
    }

    // ===== Guardar (botón 💾 del Lector) =====
    async function openSaveDialog() {
        const ta = document.getElementById('reader-input');
        const text = ta ? ta.value.trim() : '';
        if (!text) {
            if (typeof moduleStatus === 'function') moduleStatus('📝 Pegá un texto en el Lector antes de guardar.');
            return;
        }
        plOpenPopup({}, async (name, level) => {
            const lang = (typeof detectReaderLang === 'function') ? detectReaderLang(text) : 'zh';
            const entry = {
                id: Date.now() + '-' + Math.random().toString(36).slice(2, 8),
                name: name, level: level, text: text, lang: lang,
                createdAt: Date.now(), updatedAt: Date.now(),
            };
            try {
                await plAdd(entry);
                await plEnsurePersisted();
                if (typeof moduleStatus === 'function') moduleStatus('💾 Guardado en Mis lecturas: "' + name + '"');
                renderList();
            } catch (e) {
                console.warn('Personales: no se pudo guardar', e);
                if (typeof moduleStatus === 'function') moduleStatus('⚠ No se pudo guardar — reintentá.', true);
            }
        });
    }

    function openEditDialog(entry) {
        plOpenPopup({ id: entry.id, name: entry.name, level: entry.level }, async (name, level) => {
            entry.name = name;
            entry.level = level;
            entry.updatedAt = Date.now();
            try { await plPut(entry); renderList(); }
            catch (e) { console.warn('Personales: no se pudo renombrar', e); }
        });
    }

    async function deleteEntry(entry) {
        if (!window.confirm('¿Borrar "' + entry.name + '"? No se puede deshacer.')) return;
        try { await plDelete(entry.id); renderList(); }
        catch (e) { console.warn('Personales: no se pudo borrar', e); }
    }

    function openInReader(entry) {
        if (typeof showView === 'function') showView('entrenar');
        requestAnimationFrame(() => {
            const ta = document.getElementById('reader-input');
            const banner = document.getElementById('reader-banner');
            if (!ta) return;
            if (typeof stopReader === 'function') stopReader();
            ta.value = entry.text;
            if (typeof updateReaderLang === 'function') updateReaderLang();
            if (typeof renderReaderPreview === 'function') renderReaderPreview();
            if (banner && banner.scrollIntoView) {
                banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
                banner.classList.remove('lesson-glow');
                void banner.offsetWidth; // reinicia la animación si ya estaba
                banner.classList.add('lesson-glow');
                setTimeout(() => banner.classList.remove('lesson-glow'), 2500);
            }
            if (typeof moduleStatus === 'function') moduleStatus('📖 "' + entry.name + '" cargado en el Lector.');
        });
    }

    // ===== Lista (tab "📌 Personales" de Aprender) =====
    async function renderList() {
        const wrap = document.getElementById('personal-list');
        if (!wrap) return;
        let items = [];
        try { items = await plGetAll(); } catch (e) { /* IndexedDB no disponible: lista vacía, sin romper */ }
        if (!items.length) {
            wrap.innerHTML = '<p class="lessons-intro">Todavía no guardaste ninguna lectura. Pegá un texto en el <b>Lector</b> (Entrenar) y tocá <b>💾 Guardar</b>.</p>';
            return;
        }
        wrap.innerHTML = '';
        items.forEach((entry) => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            const chars = String(entry.text || '').replace(/\n/g, '').length;
            card.innerHTML =
                '<div class="lc-top"><span class="lc-emoji" aria-hidden="true">📌</span>' +
                (entry.level ? '<span class="lc-hsk">' + esc(entry.level) + '</span>' : '') +
                '<span class="lc-best">' + plFormatDate(entry.createdAt) + '</span></div>' +
                '<div class="lc-titles"><span class="lc-es">' + esc(entry.name) + '</span></div>' +
                '<div class="lc-meta">' + chars + ' caracteres · ' + (entry.lang === 'zh' ? '🇨🇳 chino' : '🇪🇸 español') + '</div>' +
                '<div class="pl-actions">' +
                '<button type="button" class="lq-btn pl-open">📖 Abrir</button>' +
                '<button type="button" class="lq-btn pl-rename">✏️ Renombrar</button>' +
                '<button type="button" class="lq-btn pl-delete">🗑️ Borrar</button>' +
                '</div>';
            card.querySelector('.pl-open').addEventListener('click', () => openInReader(entry));
            card.querySelector('.pl-rename').addEventListener('click', () => openEditDialog(entry));
            card.querySelector('.pl-delete').addEventListener('click', () => deleteEntry(entry));
            wrap.appendChild(card);
        });
    }

    // ===== Wiring del popup (cerrar con click afuera del popup / Escape) =====
    document.addEventListener('DOMContentLoaded', () => {
        const closeBtn = document.getElementById('btn-personal-close');
        if (closeBtn) closeBtn.addEventListener('click', plClosePopup);
        const pop = document.getElementById('personal-pop');
        if (pop) {
            document.addEventListener('click', (e) => {
                // v9.7x fix: además del botón que ABRE el popup para guardar
                // (#btn-reader-save), hay que excluir #personal-list — el
                // click en "✏️ Renombrar" también abre este popup, y sin
                // esta exclusión el mismo click (que ya lo abrió) burbujea
                // hasta acá y lo cierra en el mismo tick.
                if (!pop.classList.contains('hidden') && !pop.contains(e.target)
                    && !e.target.closest('#btn-reader-save') && !e.target.closest('#personal-list')) {
                    plClosePopup();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !pop.classList.contains('hidden')) plClosePopup();
            });
        }
    });

    window.PL = { openSaveDialog: openSaveDialog, renderList: renderList };
})();
