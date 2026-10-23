const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('lecciones-nombres');
function lum(c){const a=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2];}
function cr(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);}
function parse(s){const m=s.match(/[\d.]+/g).map(Number);return {rgb:m.slice(0,3),a:m.length>3?m[3]:1};}
function blend(fg,bg){return fg.rgb.map((v,i)=>Math.round(v*fg.a+bg[i]*(1-fg.a)));}
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++;};
const cases=[['light','trad','gongyuan'],['dark','trad','gongyuan'],['paper','trad','gongyuan'],['light','simp','zaocan'],['dark','simp','taifeng'],['paper','trad','yuyan']];
for(const [th,sc,les] of cases){
 const ctx=await b.newContext({viewport:{width:360,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,sc,les])=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('theme',th);localStorage.setItem('ac_lesson_level',les==='gongyuan'||les==='zaocan'?'tocfl:Prep':'tocfl:A1');if(sc==='simp')localStorage.setItem('ac_script_tocfl','simp');},[th,sc,les]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(APP_URL);await p.waitForTimeout(1300);await p.evaluate(()=>showView('aprender'));
 const id=await p.evaluate((les)=>document.querySelector('.lq-btn[data-act="read"][data-id$="-'+les+'"]').dataset.id,les);
 await p.click('.lq-btn[data-act="read"][data-id="'+id+'"]');await p.waitForTimeout(300);await p.click('#lq-gloss-continue').catch(()=>{});await p.waitForTimeout(300);
 const tag=`${th}-${sc}-${les}`;
 const r=await p.evaluate(()=>{const L=[...document.querySelectorAll('.lq-line')];return {labels:L.map(l=>{const w=l.querySelector('.lq-line-who');return w?w.className.split(' ')[1]+':'+w.firstChild.textContent:'-';}),
   karaOk:L.every(l=>!l.querySelector('.lq-line-who .lq-ch')&&l.querySelectorAll('.lq-ch').length===(l.querySelector('.lq-line-say').dataset.zh.match(/[㐀-鿿豈-﫿]/g)||[]).length),
   sayHasName:L.some(l=>{const w=l.querySelector('.lq-line-who');return w&&l.querySelector('.lq-line-say').dataset.zh.indexOf(w.firstChild.textContent)===0;}),
   col:(()=>{const a=document.querySelector('.lq-who-a'),b=document.querySelector('.lq-who-b');const line=getComputedStyle(document.querySelector('.lq-line')).backgroundColor;return [a,b].map(x=>({fg:getComputedStyle(x).color,bg:getComputedStyle(x).backgroundColor,line}));})()};});
 console.log('\n== '+tag+'  '+r.labels.join(' '));
 ok(r.labels.every((x,i)=>x.startsWith(i%2?'lq-who-b':'lq-who-a')),'10 etiquetas, colores alternados por persona');
 ok(r.karaOk,'karaoke: la etiqueta no tiene .lq-ch y cada línea conserva sus spans');
 ok(!r.sayHasName,'el audio (🔊 data-zh) no incluye el nombre');
 r.col.forEach((c,i)=>{const line=parse(c.line).rgb;const bg=blend(parse(c.bg),line);const fg=parse(c.fg).rgb;const v=cr(fg,bg);ok(v>=4.5,'contraste '+(i?'B':'A')+': '+v.toFixed(2)+':1');});
 await p.screenshot({path:`${OUT}rama-${tag}-pinyin-off.png`,clip:{x:0,y:0,width:360,height:600}});
 await p.click('#lq-story-pinyin');await p.waitForTimeout(300);
 const py=await p.$$eval('.lq-who-py',a=>a.slice(0,2).map(x=>x.textContent+(x.classList.contains('hidden')?'(oculto)':'')));
 ok(py.every(x=>x&&!x.includes('oculto')),'pinyin de la etiqueta con el botón Pinyin: '+py.join(' / '));
 await p.screenshot({path:`${OUT}rama-${tag}-pinyin-on.png`,clip:{x:0,y:0,width:360,height:600}});
 // quiz sin nombres
 if(tag==='light-trad-gongyuan'){await p.click('#lq-story-practice');await p.waitForTimeout(400);const q=await p.evaluate(()=>document.querySelector('.lq-pop, #lq-pop')?.innerText||document.body.innerText);ok(!/王太太|李先生/.test(q),'quiz sin nombres');}
 ok(errs.length===0,'sin errores JS '+errs.join('/'));
 await ctx.close();}
await b.close();console.log('\nFAILS: '+fails);})();
