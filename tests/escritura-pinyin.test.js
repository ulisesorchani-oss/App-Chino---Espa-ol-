const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++;};
const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});
await ctx.addInitScript(()=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_lesson_level','tocfl:Prep');});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const loaded=[];p.on('request',r=>{if(r.url().includes('pinyin-tocfl.js'))loaded.push(r.url());});
await p.goto(APP_URL);await p.waitForTimeout(1300);
ok(loaded.length===0 && await p.evaluate(()=>typeof window.PINYIN_TOCFL==='undefined'),'al arrancar NO se carga pinyin-tocfl.js');
// capa errores (global) en las dos escrituras y las dos familias
const er=await p.evaluate(()=>[['我要还书','hsk'],['我要還書','hsk'],['包子','hsk'],['裙子','tocfl'],['东西','hsk'],['東西','tocfl'],['客气','hsk'],['不客氣','hsk'],['她還在家','hsk'],['我還沒吃飯，你還要等嗎？','hsk']].map(([t,f])=>t+' ['+f+'] → '+pinyinFor(t,f)));
er.forEach(x=>console.log('   '+x));
ok(/huán shū/.test(er[0])&&/huán shū/.test(er[1])&&/bāo zi/.test(er[2])&&/qún zi/.test(er[3])&&/dōng xi/.test(er[4])&&/dōng xi/.test(er[5])&&/kè qi/.test(er[6])&&/kè qi/.test(er[7]),'capa «errores» en simplificado y tradicional');
ok(/tā hái zài jiā/.test(er[8])&&/hái méi/.test(er[9])&&/hái yào/.test(er[9])&&/ ma/.test(er[9]),'tradicional pasado a simplificado solo para el pinyin: 她還在家 → hái');
const st=await p.evaluate(()=>{t2sForPinyin();return t2sForPinyin.stats;});console.log('   tabla carácter→carácter:',JSON.stringify(st));
ok(await p.evaluate(()=>!t2sForPinyin().has('畫')&&!t2sForPinyin().has('著')),'畫 y 著 no se convierten');
// sin tabla todavía: TOCFL = pinyin-pro
ok(await p.evaluate(()=>pinyinFor('我喜欢她','tocfl')==='wǒ xǐ huan tā'),'TOCFL antes de cargar la tabla = pinyin-pro (sin romper)');
await p.evaluate(()=>showView('aprender'));
// abrir una lección HSK: no carga la tabla
await p.evaluate(()=>{const s=document.getElementById('sel-lv-hsk');s.value='1';s.dispatchEvent(new Event('change',{bubbles:true}));});await p.waitForTimeout(300);
const hskId=await p.locator('.lq-btn[data-act="read"]:visible').first().getAttribute('data-id');
await p.click('.lq-btn[data-act="read"][data-id="'+hskId+'"]');await p.waitForTimeout(400);
ok(loaded.length===0,'abrir una lección HSK ('+hskId+') NO carga la tabla TOCFL');
await p.evaluate(()=>{try{localStorage.setItem('ac_lesson_level','tocfl:Prep');}catch(e){}});await p.reload();await p.waitForTimeout(1300);await p.evaluate(()=>showView('aprender'));await p.waitForTimeout(300);
await p.click('.lq-btn[data-act="read"][data-id="tocfl-prep-gongyuan"]');await p.waitForTimeout(600);
ok(loaded.length===1,'abrir una lección TOCFL carga la tabla una vez ('+loaded.length+')');
const gl=await p.$$eval('.lq-gloss-item',a=>a.map(x=>x.querySelector('.lq-gloss-zh').textContent+' '+x.querySelector('.lq-gloss-py').textContent));console.log('   glosario:',gl.join(' · '));
await p.click('#lq-gloss-continue');await p.waitForTimeout(250);await p.click('#lq-story-pinyin');await p.waitForTimeout(400);
const lines=await p.$$eval('.lq-line',a=>a.map(l=>(l.querySelector('.lq-who-py')?.textContent||'')+' | '+l.querySelector('.lq-line-py').textContent));
lines.forEach((x,i)=>console.log('   '+i+' '+x));
ok(/xǐ huān tiào wǔ/.test(lines[5]),'TOCFL: 喜歡 → xǐ huān en el texto');
ok(lines[0].startsWith('wáng tài tai'),'TOCFL: etiqueta 王太太 → wáng tài tai');
// familias alternadas: ninguna pisa a la otra
const alt=await p.evaluate(()=>{const r=[];for(let i=0;i<3;i++){r.push(pinyinFor('我喜欢她','tocfl'));r.push(pinyinFor('我喜欢她','hsk'));}return r;});
ok(alt.every((x,i)=>x===(i%2?'wǒ xǐ huan tā':'wǒ xǐ huān tā')),'alternando familias: TOCFL xǐ huān / HSK xǐ huan, sin pisarse');
ok(await p.evaluate(()=>pinyinPro.pinyin('喜欢')==='xǐ huan'),'pinyin-pro directo (resto de la app) no cambia por la tabla TOCFL');
// Lector con texto pegado en tradicional
const lec=await p.evaluate(()=>{const d=document.createElement('div');d.innerHTML=renderZhLineHtml('她還在家，我要還書。',true,true);return [...d.querySelectorAll('.ruby-col')].map(c=>c.querySelector('.ruby-char').textContent+(c.querySelector('.ruby-py')?c.querySelector('.ruby-py').textContent:'')).join(' ');});
console.log('   Lector:',lec);
ok(/還hái/.test(lec)&&lec.includes('還'),'Lector: muestra 還 (sin convertir) con pinyin hái');
ok(/還huán 書shū/.test(lec),'Lector: 我要還書 → huán (pinyin de la línea con contexto)');
ok(!errs.length,'sin errores JS '+errs.join('/'));
await b.close();console.log('\ncomprobaciones '+n+' · FAILS '+fails);})();
