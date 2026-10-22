const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('diaria-practicar');
const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
async function pixCr(p,el){const buf=await el.screenshot();return p.evaluate(async(b64)=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};const cnt=new Map();for(let i=0;i<d.length;i+=4){const k=d[i]+','+d[i+1]+','+d[i+2];cnt.set(k,(cnt.get(k)||0)+1);}const bg=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);const lb=L(...bg);let best=1;for(let i=0;i<d.length;i+=4){const l=L(d[i],d[i+1],d[i+2]);const cr=(Math.max(l,lb)+0.05)/(Math.min(l,lb)+0.05);if(cr>best)best=cr;}return best;},buf.toString('base64'));}
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const crs=[];
for(const lang of ['es','zh']) for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const ctx=await b.newContext({viewport:{width:w,height:800},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,lang])=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('theme',th);},[th,lang]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(APP_URL);await p.waitForTimeout(1200);
 if(lang==='zh'){await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);}
 const has=(id)=>p.evaluate(i=>{const e=document.getElementById(i);return !!(e&&e.offsetParent!==null&&!e.classList.contains('hidden'));},id);
 const tag=lang+'/'+w+'/'+th;const view=()=>p.evaluate(()=>{const v=[...document.querySelectorAll('section.view')].find(s=>!s.classList.contains('hidden')&&s.offsetParent!==null);return v?v.id:'?';});
 // --- Diaria: situación con escena → Practicar frases sueltas
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-daily').click();});await p.waitForTimeout(300);
 const dailyVisible=await has('btn-daily-toggle');ok(dailyVisible,tag+' Diaria visible');
 await p.click('#btn-daily-toggle');await p.waitForTimeout(200);
 await p.click('#daily-menu [data-module="En el colectivo"]');await p.waitForTimeout(500);
 const scene=await p.evaluate(()=>!document.getElementById('daily-story-pop').classList.contains('hidden'));
 if(scene){await p.click('#btn-ds-continue').catch(()=>{});await p.waitForTimeout(300);await p.click('#btn-ds-practice');await p.waitForTimeout(600);}
 let st=await p.evaluate(()=>({mod:state.activeModule,box:!document.getElementById('daily-choice').classList.contains('hidden'),txt:document.getElementById('daily-choice').innerText.replace(/\n/g,' ')}));
 ok(scene,tag+' Diaria abre la escena');
 // el botón de la escena ES la acción: salta a Hoy con el módulo
 ok(await view()==='view-hoy'&&st.mod==='En el colectivo',tag+' Diaria (escena → Practicar frases sueltas) salta a Hoy: '+await view());
 // al volver a Diaria, la línea refleja la elección
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-daily').click();});await p.waitForTimeout(300);
 st=await p.evaluate(()=>({mod:state.activeModule,box:!document.getElementById('daily-choice').classList.contains('hidden'),txt:document.getElementById('daily-choice').innerText.replace(/\n/g,' ')}));
 ok(st.box&&/En el colectivo/.test(st.txt),tag+' al volver a Diaria se ve «Elegiste»: '+st.txt);
 const box=await p.$('#daily-choice');
 if(lang==='es')crs.push([tag+' Diaria',await pixCr(p,await p.$('#daily-choice .choice-go')),await pixCr(p,await p.$('#daily-choice .choice-label'))]);
 const cut=await p.evaluate(()=>[...document.querySelectorAll('#daily-choice .choice-label, #daily-choice .choice-go')].some(e=>e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>innerWidth+0.5));
 ok(!cut,tag+' línea de Diaria sin cortes');
 await box.screenshot({path:OUT+`diaria-${lang}-${w}-${th}.png`});
 await p.click('#daily-choice .choice-go');await p.waitForTimeout(600);
 ok(await view()==='view-hoy'&&(await p.evaluate(()=>state.activeModule))==='En el colectivo',tag+' ▶ Practicar en Hoy salta a Hoy con el módulo');
 // --- Diaria: «todas» (sin escena)
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-daily').click();});await p.waitForTimeout(300);
 await p.click('#btn-daily-toggle');await p.waitForTimeout(200);await p.click('#daily-menu [data-module="todas"]');await p.waitForTimeout(600);
 st=await p.evaluate(()=>({mod:state.activeModule,box:!document.getElementById('daily-choice').classList.contains('hidden')}));
 ok(await view()==='view-aprender'&&st.mod==='todas'&&st.box,tag+' Diaria «Todas» sin salto');
 // --- Clásicos
 await p.evaluate(()=>{showView('aprender');});await p.waitForTimeout(200);
 if(await has('tab-classics')){
 await p.evaluate(()=>{document.getElementById('tab-classics').click();});await p.waitForTimeout(300);
 await p.click('#btn-classics-toggle');await p.waitForTimeout(200);await p.click('#classics-menu [data-module="Clasicos-Lunyu"]');await p.waitForTimeout(600);
 st=await p.evaluate(()=>({mod:state.activeModule,box:!document.getElementById('classics-choice').classList.contains('hidden'),txt:document.getElementById('classics-choice').innerText.replace(/\n/g,' '),daily:!document.getElementById('daily-choice').classList.contains('hidden')}));
 ok(await view()==='view-aprender'&&st.mod==='Clasicos-Lunyu'&&st.box&&!st.daily,tag+' Clásicos sin salto: '+st.txt);
 if(lang==='es')crs.push([tag+' Clásicos',await pixCr(p,await p.$('#classics-choice .choice-go')),await pixCr(p,await p.$('#classics-choice .choice-label'))]);
 await (await p.$('#classics-choice')).screenshot({path:OUT+`clasicos-${lang}-${w}-${th}.png`});
 await p.click('#classics-choice .choice-go');await p.waitForTimeout(600);
 ok(await view()==='view-hoy',tag+' Clásicos ▶ Practicar en Hoy salta');
 } else console.log('  ('+tag+': sin pestaña Clásicos en este modo)');
 // --- Exámenes siguen saltando
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
 if(await has('select-hsk-level')){await p.selectOption('#select-hsk-level','HSK2');await p.waitForTimeout(600);
 ok(await view()==='view-hoy'&&(await p.evaluate(()=>state.activeModule))==='HSK2',tag+' Exámenes HSK sigue saltando a Hoy');}
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
 if(await has('btn-tocfl-toggle')){await p.click('#btn-tocfl-toggle');await p.waitForTimeout(200);await p.click('#tocfl-menu [data-module="TOCFL-A1"]');await p.waitForTimeout(600);
 ok(await view()==='view-hoy',tag+' Exámenes TOCFL sigue saltando a Hoy');}
 else if(await has('btn-dele-toggle')){await p.click('#btn-dele-toggle');await p.waitForTimeout(200);await p.click('#dele-menu [data-module="DELE-A1-Escolares"]');await p.waitForTimeout(600);
 ok(await view()==='view-hoy',tag+' Exámenes DELE sigue saltando a Hoy');}
 // --- test de nivel: dos errores → «Practicar HSK 1» → Hoy
 if(w===360&&th==='light'&&await p.evaluate(()=>{showView('aprender');return true;})&&await has('btn-placement')){
   await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
   await p.click('#btn-placement');await p.waitForTimeout(500);
   await p.evaluate(()=>{const s=document.querySelector('#placement-body .pl-start, #placement-body .btn-primary');if(s)s.click();});await p.waitForTimeout(500);
   for(let i=0;i<3;i++){const d=await p.evaluate(()=>window.PL_DEBUG&&PL_DEBUG());if(!d)break;await p.click('.pl-opt[data-i="'+((d.correctIdx+1)%d.options.length)+'"]');await p.waitForTimeout(1600);const nx=await p.$('.pl-next');if(nx){await nx.click();await p.waitForTimeout(400);}}
   const go=await p.$('.pl-gopractice');ok(!!go,tag+' test de nivel muestra «Practicar HSK X»');
   if(go){await go.click();await p.waitForTimeout(700);ok(await view()==='view-hoy'&&(await p.evaluate(()=>state.activeModule))==='HSK1',tag+' «Practicar HSK 1» salta a Hoy con HSK1 → '+await view());}
 }
 ok(!errs.length,tag+' sin errores JS '+errs.join('/'));
 await ctx.close();}
console.log('contraste (botón / texto), píxeles reales:');crs.forEach(([t,a,c])=>{console.log('  '+t+' · botón '+a.toFixed(2)+':1 · texto '+c.toFixed(2)+':1');ok(a>=4.5&&c>=4.5,t+' contraste ≥ 4,5');});
await b.close();console.log('comprobaciones '+n+' · FAILS '+fails);})();
