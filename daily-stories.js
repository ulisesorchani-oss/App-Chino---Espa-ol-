// ============================================================
// daily-stories.js — Escena coherente de Práctica Diaria
// ============================================================
// v9.61: antes, tocar una situación de "📚 Práctica Diaria" (Gimnasio,
// Subte, etc.) llevaba directo a practicar oraciones sueltas con hueco
// ___ (cada una ya existía en EMBEDDED_MODULE_DATA, sin conexión entre
// sí). Este módulo agrega el paso que faltaba: un diálogo corto y
// coherente que planta la escena ANTES de practicar — "primero se
// entiende la situación completa, después se repasan las frases".
//
// openDailyStory(mod) muestra el diálogo (chino con pinyin interlineal
// + traducción, reutilizando renderZhLineHtml/escHtml de reader.js) en
// un popup nuevo (#daily-story-pop). El botón "▶ Practicar frases
// sueltas" cierra el popup y sigue el flujo de siempre: setModule(mod)
// → el mismo mazo de oraciones con hueco que ya existía.
//
// v9.66: antes de esa escena, un paso corto y salteable con 3-5
// palabras clave (dsRenderGlossary/extractKeyWords, dict.js) —
// pre-entrenamiento (Mayer #7): activar el vocabulario antes de leer
// el diálogo completo, sin curar contenido nuevo a mano.
//
// Es un script clásico (sin import/export): se carga después de
// app.js/reader.js/dict.js/audio-tts.js (los usa en tiempo de
// ejecución) y expone openDailyStory/closeDailyStory como globales —
// app.js los llama desde el wiring de los ítems de #daily-menu.
// ============================================================

const DAILY_STORIES = {
    "Saludos": {
        "emoji": "👋",
        "lines": [
            { "zh": "你好！你好吗？", "zt": "你好！你好嗎？", "es": "¡Hola! ¿Cómo estás?" },
            { "zh": "我很好，谢谢。你呢？", "zt": "我很好，謝謝。你呢？", "es": "Yo bien, gracias. ¿Y vos?" },
            { "zh": "我也很好。你叫什么名字？", "zt": "我也很好。你叫什麼名字？", "es": "Yo también bien. ¿Cómo te llamás?" },
            { "zh": "我叫安娜。很高兴认识你。", "zt": "我叫安娜。很高興認識你。", "es": "Me llamo Ana. Mucho gusto." },
            { "zh": "我也很高兴认识你。你是哪国人？", "zt": "我也很高興認識你。你是哪國人？", "es": "Igualmente, mucho gusto. ¿De dónde sos?" },
            { "zh": "我是阿根廷人。你呢？", "zt": "我是阿根廷人。你呢？", "es": "Soy argentino/a. ¿Y vos?" }
        ]
    },
    "Migraciones": {
        "emoji": "🛂",
        "lines": [
            { "zh": "你好，请给我看一下你的护照。", "zt": "你好，請給我看一下你的護照。", "es": "Hola, mostrame tu pasaporte por favor." },
            { "zh": "好的，给你。", "zt": "好的，給你。", "es": "Bueno, acá tenés." },
            { "zh": "你来中国做什么？", "zt": "你來中國做什麼？", "es": "¿A qué venís a China?" },
            { "zh": "我来学习汉语。", "zt": "我來學習漢語。", "es": "Vengo a estudiar chino." },
            { "zh": "你要在中国待多久？", "zt": "你要在中國待多久？", "es": "¿Cuánto tiempo te vas a quedar en China?" },
            { "zh": "我要待三个月。", "zt": "我要待三個月。", "es": "Me voy a quedar tres meses." }
        ]
    },
    "Supermercado": {
        "emoji": "🛒",
        "lines": [
            { "zh": "你好，我可以帮你吗？", "zt": "你好，我可以幫你嗎？", "es": "Hola, ¿te puedo ayudar?" },
            { "zh": "我在找牛奶，牛奶在哪里？", "zt": "我在找牛奶，牛奶在哪裡？", "es": "Estoy buscando leche, ¿dónde está la leche?" },
            { "zh": "牛奶在那边，在水果旁边。", "zt": "牛奶在那邊，在水果旁邊。", "es": "La leche está allá, al lado de la fruta." },
            { "zh": "谢谢。这个多少钱？", "zt": "謝謝。這個多少錢？", "es": "Gracias. ¿Cuánto cuesta esto?" },
            { "zh": "十块钱。你还要别的吗？", "zt": "十塊錢。你還要別的嗎？", "es": "Diez yuanes. ¿Necesitás algo más?" },
            { "zh": "不用了，谢谢。", "zt": "不用了，謝謝。", "es": "No, gracias, nada más." }
        ]
    },
    "En un restaurante": {
        "emoji": "🍜",
        "lines": [
            { "zh": "欢迎光临！几位？", "zt": "歡迎光臨！幾位？", "es": "¡Bienvenido! ¿Cuántas personas?" },
            { "zh": "两位，谢谢。", "zt": "兩位，謝謝。", "es": "Dos personas, gracias." },
            { "zh": "请坐。你们想吃什么？", "zt": "請坐。你們想吃什麼？", "es": "Siéntense por favor. ¿Qué quieren comer?" },
            { "zh": "我要一碗面条和一杯茶。", "zt": "我要一碗麵條和一杯茶。", "es": "Quiero un plato de fideos y una taza de té." },
            { "zh": "好的，请稍等。", "zt": "好的，請稍等。", "es": "Bueno, esperen un momento por favor." },
            { "zh": "谢谢，很好吃！", "zt": "謝謝，很好吃！", "es": "¡Gracias, está muy rico!" }
        ]
    },
    "En el colectivo": {
        "emoji": "🚌",
        "lines": [
            { "zh": "请问，这辆车去火车站吗？", "zt": "請問，這輛車去火車站嗎？", "es": "Disculpe, ¿este colectivo va a la estación de tren?" },
            { "zh": "去，你在下一站下车。", "zt": "去，你在下一站下車。", "es": "Sí, te bajás en la próxima parada." },
            { "zh": "谢谢。车票多少钱？", "zt": "謝謝。車票多少錢？", "es": "Gracias. ¿Cuánto cuesta el boleto?" },
            { "zh": "两块钱。", "zt": "兩塊錢。", "es": "Dos yuanes." },
            { "zh": "车上人很多。", "zt": "車上人很多。", "es": "Hay mucha gente en el colectivo." },
            { "zh": "是的，现在是上班时间。", "zt": "是的，現在是上班時間。", "es": "Sí, ahora es hora pico." }
        ]
    },
    "En el subterráneo": {
        "emoji": "🚇",
        "lines": [
            { "zh": "请问，去动物园坐几号线？", "zt": "請問，去動物園坐幾號線？", "es": "Disculpe, ¿qué línea tomo para ir al zoológico?" },
            { "zh": "坐二号线，在下一站换车。", "zt": "坐二號線，在下一站換車。", "es": "Tomá la línea 2, hacé trasbordo en la próxima estación." },
            { "zh": "谢谢！地铁站在哪里？", "zt": "謝謝！地鐵站在哪裡？", "es": "¡Gracias! ¿Dónde está la estación de subte?" },
            { "zh": "就在前面，很近。", "zt": "就在前面，很近。", "es": "Está justo adelante, muy cerca." },
            { "zh": "地铁站的入口在哪儿？", "zt": "地鐵站的入口在哪兒？", "es": "¿Dónde está la entrada de la estación?" },
            { "zh": "在你的左边。", "zt": "在你的左邊。", "es": "A tu izquierda." }
        ]
    },
    "En la clase de idioma": {
        "emoji": "🏫",
        "lines": [
            { "zh": "同学们好，今天我们学习新的生词。", "zt": "同學們好，今天我們學習新的生詞。", "es": "Hola alumnos, hoy vamos a aprender palabras nuevas." },
            { "zh": "老师，这个字怎么读？", "zt": "老師，這個字怎麼讀？", "es": "Profe, ¿cómo se lee este carácter?" },
            { "zh": "你可以再说一遍吗？", "zt": "你可以再說一遍嗎？", "es": "¿Puede repetirlo de nuevo?" },
            { "zh": "当然可以。请跟我一起说。", "zt": "當然可以。請跟我一起說。", "es": "Claro que sí. Repitan conmigo." },
            { "zh": "这个句子是什么意思？", "zt": "這個句子是什麼意思？", "es": "¿Qué significa esta oración?" },
            { "zh": "很好，你学得很快！", "zt": "很好，你學得很快！", "es": "¡Muy bien, aprendés muy rápido!" }
        ]
    },
    "En el shopping": {
        "emoji": "🛍️",
        "lines": [
            { "zh": "你好，我可以试穿这件衣服吗？", "zt": "你好，我可以試穿這件衣服嗎？", "es": "Hola, ¿me puedo probar esta ropa?" },
            { "zh": "可以，试衣间在那边。", "zt": "可以，試衣間在那邊。", "es": "Sí, el probador está allá." },
            { "zh": "这件衣服有别的颜色吗？", "zt": "這件衣服有別的顏色嗎？", "es": "¿Esta ropa viene en otro color?" },
            { "zh": "有，我们还有红色和黑色。", "zt": "有，我們還有紅色和黑色。", "es": "Sí, también tenemos rojo y negro." },
            { "zh": "这双鞋子太贵了，可以便宜一点吗？", "zt": "這雙鞋子太貴了，可以便宜一點嗎？", "es": "Estos zapatos son muy caros, ¿me hacés un descuento?" },
            { "zh": "好吧，给你打九折。", "zt": "好吧，給你打九折。", "es": "Bueno, te hago un 10% de descuento." }
        ]
    },
    "En el cine": {
        "emoji": "🎬",
        "lines": [
            { "zh": "你好，我要两张电影票。", "zt": "你好，我要兩張電影票。", "es": "Hola, quiero dos entradas de cine." },
            { "zh": "你想看哪一场电影？", "zt": "你想看哪一場電影？", "es": "¿Qué función querés ver?" },
            { "zh": "七点那场，谢谢。", "zt": "七點那場，謝謝。", "es": "La de las siete, gracias." },
            { "zh": "好的，一共是六十块钱。", "zt": "好的，一共是六十塊錢。", "es": "Bueno, son sesenta yuanes en total." },
            { "zh": "电影几点开始？", "zt": "電影幾點開始？", "es": "¿A qué hora empieza la película?" },
            { "zh": "再过十分钟就开始了。", "zt": "再過十分鐘就開始了。", "es": "Empieza en diez minutos." }
        ]
    },
    "En el gimnasio": {
        "emoji": "🏋️",
        "lines": [
            { "zh": "你好，你也来锻炼身体吗？", "zt": "你好，你也來鍛鍊身體嗎？", "es": "¡Hola! ¿Vos también venís a entrenar?" },
            { "zh": "是的，我每天都来。", "zt": "是的，我每天都來。", "es": "Sí, vengo todos los días." },
            { "zh": "你喜欢做什么运动？", "zt": "你喜歡做什麼運動？", "es": "¿Qué ejercicio te gusta hacer?" },
            { "zh": "我喜欢跑步和游泳。你呢？", "zt": "我喜歡跑步和游泳。你呢？", "es": "Me gusta correr y nadar. ¿Y a vos?" },
            { "zh": "我喜欢举重。我们一起练习吧！", "zt": "我喜歡舉重。我們一起練習吧！", "es": "A mí me gusta levantar pesas. ¡Entrenemos juntos!" },
            { "zh": "好啊，加油！", "zt": "好啊，加油！", "es": "¡Dale, vamos!" }
        ]
    },
    "Barrio chino": {
        "emoji": "🏮",
        "lines": [
            { "zh": "你好，欢迎来到中国城！", "zt": "你好，歡迎來到中國城！", "es": "¡Hola, bienvenido al barrio chino!" },
            { "zh": "谢谢！这里有很多商店。", "zt": "謝謝！這裡有很多商店。", "es": "¡Gracias! Acá hay muchos negocios." },
            { "zh": "你想吃中国菜还是买东西？", "zt": "你想吃中國菜還是買東西？", "es": "¿Querés comer comida china o hacer compras?" },
            { "zh": "我想先吃饭，然后逛逛。", "zt": "我想先吃飯，然後逛逛。", "es": "Primero quiero comer, y después dar una vuelta." },
            { "zh": "这家饺子店很有名。", "zt": "這家餃子店很有名。", "es": "Esta casa de dumplings es muy famosa." },
            { "zh": "太好了，我们去尝一尝吧！", "zt": "太好了，我們去嘗一嘗吧！", "es": "¡Genial, vamos a probar!" }
        ]
    }
};

let dsPlayer = null; // Audio en curso (una sola voz a la vez)
let dsTok = 0;        // token: invalida reproducciones en vuelo si el popup se cierra

function dsStop() {
    dsTok++;
    if (dsPlayer) { try { dsPlayer.pause(); } catch (e) {} }
    dsPlayer = null;
}

// Reproduce UNA línea del diálogo (🔊 por renglón) reusando el mismo
// motor de TTS que el resto de la app (fetchTTS + fallback del sistema).
async function dsPlayLine(zh, btn) {
    if (typeof stopGlobalAudio === 'function') stopGlobalAudio(); // un solo audio a la vez en toda la app
    if (typeof stopReader === 'function') stopReader();
    dsStop();
    const myTok = ++dsTok;
    const original = btn ? btn.textContent : '';
    if (btn) { btn.textContent = '⏳'; btn.disabled = true; }
    try {
        const gender = (typeof voiceZh !== 'undefined') ? voiceZh : 'f';
        const langCode = (typeof ttsLangFor === 'function') ? ttsLangFor('zh', gender) : 'zh-CN';
        const body = (typeof ttsBody === 'function') ? ttsBody(zh, langCode, gender) : { text: zh, lang: langCode, voice: gender };
        const resp = await fetchTTS(body, 12000);
        if (myTok !== dsTok) return;
        if (!resp.ok) throw new Error('tts http ' + resp.status);
        const data = await resp.json();
        if (myTok !== dsTok) return;
        if (!data.audio) throw new Error('sin audio');
        const bin = atob(data.audio);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const url = URL.createObjectURL(new Blob([bytes], { type: data.mime || 'audio/wav' }));
        const audio = new Audio(url);
        if (typeof applyTtsSpeed === 'function') applyTtsSpeed(audio, data);
        dsPlayer = audio;
        audio.onended = () => { URL.revokeObjectURL(url); if (myTok === dsTok && btn) { btn.textContent = original; btn.disabled = false; } };
        audio.onerror = () => { if (myTok === dsTok && btn) { btn.textContent = original; btn.disabled = false; } };
        await audio.play();
    } catch (e) {
        // Fallback: voz del sistema (mismo patrón que el resto de la app)
        if (myTok !== dsTok) return;
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(zh);
            u.lang = 'zh-CN';
            u.onend = () => { if (myTok === dsTok && btn) { btn.textContent = original; btn.disabled = false; } };
            u.onerror = u.onend;
            speechSynthesis.speak(u);
        } else if (btn) {
            btn.textContent = original; btn.disabled = false;
        }
    }
}

function dsRenderBody(mod) {
    const story = DAILY_STORIES[mod];
    if (!story) return '';
    const k = (typeof ck === 'function') ? ck() : 'simp';
    const wantPinyin = (typeof state !== 'undefined') ? state.showPinyin : true;
    const wantTones = (typeof showToneColors !== 'undefined') ? showToneColors : false;
    const label = (typeof MODULE_LABELS !== 'undefined' && MODULE_LABELS[mod]) ? MODULE_LABELS[mod] : mod;

    let html = '<div class="ds-head">' + (story.emoji || '💬') + ' ' + escHtml(label) + '</div>';
    html += '<p class="ds-intro">Leé la escena completa antes de practicar las frases sueltas:</p>';
    html += '<div class="ds-lines">';
    story.lines.forEach((line, i) => {
        const zh = (k === 'trad' && line.zt) ? line.zt : line.zh;
        const zhHtml = (typeof renderZhLineHtml === 'function') ? renderZhLineHtml(zh, wantPinyin, wantTones) : escHtml(zh);
        html += '<div class="ds-line">'
            + '<button type="button" class="ds-play" data-ds-idx="' + i + '" aria-label="Escuchar esta línea">🔊</button>'
            + '<div class="ds-line-text">'
            + '<div class="reader-line ds-zh">' + zhHtml + '</div>'
            + '<div class="ds-es">' + escHtml(line.es) + '</div>'
            + '</div>'
            + '</div>';
    });
    html += '</div>';
    html += '<div class="ds-actions">'
        + '<button type="button" id="btn-ds-practice" class="btn-primary">▶ Practicar frases sueltas</button>'
        + '</div>';
    return html;
}

// v9.66 (AUDITORIA-GAGNE-MAYER.md, Mayer #7 — pre-entrenamiento): paso
// corto y salteable ANTES de la escena completa, con 3-5 palabras clave
// extraídas de esa misma escena (extractKeyWords, dict.js — sin curar
// contenido nuevo a mano).
function dsRenderGlossary(mod, keyWords) {
    const story = DAILY_STORIES[mod];
    const label = (typeof MODULE_LABELS !== 'undefined' && MODULE_LABELS[mod]) ? MODULE_LABELS[mod] : mod;
    let html = '<div class="ds-head">' + (story.emoji || '💬') + ' ' + escHtml(label) + '</div>';
    html += '<p class="ds-intro">Antes de leer, estas son algunas palabras clave de la escena:</p>';
    html += '<div class="ds-glossary">';
    keyWords.forEach(kw => {
        html += '<div class="ds-gloss-item">'
            + '<span class="ds-gloss-zh" lang="zh">' + escHtml(kw.zh) + '</span>'
            + '<span class="ds-gloss-py">' + escHtml(kw.py) + '</span>'
            + '<span class="ds-gloss-es">' + escHtml(kw.es) + '</span>'
            + '</div>';
    });
    html += '</div>';
    html += '<div class="ds-actions ds-actions-row">'
        + '<button type="button" id="btn-ds-skip" class="btn-secondary">Saltar</button>'
        + '<button type="button" id="btn-ds-continue" class="btn-primary">Leer la escena →</button>'
        + '</div>';
    return html;
}

function dsShowScene(mod) {
    const body = document.getElementById('daily-story-body');
    if (!body) return;
    body.innerHTML = dsRenderBody(mod);

    const story = DAILY_STORIES[mod];
    body.querySelectorAll('.ds-play').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = parseInt(btn.dataset.dsIdx, 10);
            const line = story.lines[i];
            if (!line) return;
            const k = (typeof ck === 'function') ? ck() : 'simp';
            dsPlayLine((k === 'trad' && line.zt) ? line.zt : line.zh, btn);
        });
    });
    const practiceBtn = document.getElementById('btn-ds-practice');
    if (practiceBtn) {
        practiceBtn.addEventListener('click', () => {
            closeDailyStory();
            if (typeof setModule === 'function') setModule(mod);
        });
    }
}

function openDailyStory(mod) {
    const pop = document.getElementById('daily-story-pop');
    const body = document.getElementById('daily-story-body');
    if (!pop || !body || !DAILY_STORIES[mod]) return false;
    body.dataset.module = mod;
    pop.classList.remove('hidden');

    const story = DAILY_STORIES[mod];
    const keyWords = (typeof extractKeyWords === 'function')
        ? extractKeyWords(story.lines.map(l => l.zh), 5)
        : [];

    if (keyWords.length >= 3) {
        body.innerHTML = dsRenderGlossary(mod, keyWords);
        const skip = document.getElementById('btn-ds-skip');
        const cont = document.getElementById('btn-ds-continue');
        if (skip) skip.addEventListener('click', () => dsShowScene(mod));
        if (cont) cont.addEventListener('click', () => dsShowScene(mod));
    } else {
        dsShowScene(mod); // muy pocas palabras clave con entrada de diccionario → directo a la escena
    }
    return true;
}

function closeDailyStory() {
    dsStop();
    const pop = document.getElementById('daily-story-pop');
    if (pop) pop.classList.add('hidden');
}

(function wireDailyStoryPop() {
    document.addEventListener('DOMContentLoaded', () => {
        const closeBtn = document.getElementById('btn-daily-story-close');
        if (closeBtn) closeBtn.addEventListener('click', closeDailyStory);
        const pop = document.getElementById('daily-story-pop');
        if (pop) {
            document.addEventListener('click', (e) => {
                if (!pop.classList.contains('hidden') && !pop.contains(e.target)
                    && !e.target.closest('#daily-menu')) {
                    closeDailyStory();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !pop.classList.contains('hidden')) closeDailyStory();
            });
        }
    });
})();
