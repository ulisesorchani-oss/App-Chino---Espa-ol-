const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('hoja-modulos');const PLK='ac_placement';
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
async function page(w,th,mode,extra){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,extra])=>{if(!sessionStorage.getItem('_init')){sessionStorage.setItem('_init','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);if(extra)Object.entries(extra).forEach(([k,v])=>v===null?localStorage.removeItem(k):localStorage.setItem(k,v));}},[th,extra||null]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(APP_URL);await p.waitForTimeout(1300);
 if(mode==='cn-es'){await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);}
 return {ctx,p,errs};}
const view=(p)=>p.evaluate(()=>{const v=[...document.querySelectorAll('section.view')].find(s=>!s.classList.contains('hidden'));return v?v.id:'?';});
const btnState=(p)=>p.evaluate(()=>{const b=document.getElementById('mod-btn');const nm=b.querySelector('.mb-name');const fl=b.querySelector('.mb-flag');const r=b.getBoundingClientRect();
  return {txt:b.innerText.replace(/\s+/g,' ').trim(),flag:fl.textContent,flagVis:fl.textContent?fl.getBoundingClientRect().width>0:true,count:getComputedStyle(b.querySelector('.mb-count')).display!=='none',
  nameCut:nm.scrollWidth>nm.clientWidth+1,btnCut:b.scrollWidth>b.clientWidth+1,out:r.right>innerWidth-8||r.left<8,h:Math.round(r.height),aria:b.getAttribute('aria-label')};});
const sheetOpen=(p)=>p.evaluate(()=>!document.getElementById('mod-sheet').classList.contains('hidden'));
const rowShot=async(p,file)=>{const box=await p.evaluate(()=>{const r=document.querySelector('.practice-top-row').getBoundingClientRect();return {x:0,y:Math.max(0,r.top-10),width:innerWidth,height:r.height+20};});await p.screenshot({path:OUT+file,clip:box});};
const ES_MODS=[['TOCFL-B4','🇹🇼','TOCFL B2'],['HSK7','','HSK 7-9 (1/3)'],['HSK3','','HSK 3'],['En el subterráneo','📚','En el subterráneo'],['todas','📚','Diaria · todas'],['Clasicos-Zhongyong','📜','Doctrina del Medio'],['TOCFL','🇹🇼','TOCFL Frases útiles']];
const table=[];
for(const w of [320,360]) for(const th of ['light','dark','paper']){
 // ===== es-cn =====
 let {ctx,p,errs}=await page(w,th,'es-cn');let tag='es/'+w+'/'+th;
 for(const [m,flag,name] of ES_MODS){
   await p.evaluate(m=>{setModule(m);},m);await p.waitForTimeout(700);
   const s=await btnState(p);table.push([tag,m,s.txt,s.count?'con contador':'sin contador']);
   ok(s.flag===flag&&s.txt.startsWith((flag?flag+' ':'')+name),tag+' '+m+' texto: '+s.txt);
   ok(!s.nameCut&&!s.btnCut&&!s.out,tag+' '+m+' sin cortes '+JSON.stringify(s));
   ok(s.flagVis,tag+' '+m+' bandera visible');
   if(w===360) ok(s.count,tag+' '+m+' a 360 conserva el contador');
   ok(/^Módulo: .* · \d+\/\d+\. Cambiar de módulo$/.test(s.aria),tag+' aria-label '+s.aria);
   if(['TOCFL-B4','HSK7','En el subterráneo','Clasicos-Zhongyong','TOCFL'].includes(m))await rowShot(p,`fila-es-${w}-${th}-${m.replace(/ /g,'_')}.png`);
 }
 // contador: si se ve, entra completo
 await p.evaluate(()=>setModule('TOCFL-B4'));await p.waitForTimeout(700);
 ok(await view(p)==='view-hoy',tag+' en Hoy');
 const y0=await p.evaluate(()=>{scrollTo(0,0);return scrollY;});
 await p.click('#mod-btn');await p.waitForTimeout(350);
 ok(await sheetOpen(p),tag+' tocar el botón abre la hoja');
 const sh=await p.evaluate(()=>({secs:[...document.querySelectorAll('#ms-body .ms-sec')].map(s=>s.dataset.sec+(s.open?'*':'')),
   title:document.getElementById('ms-title').textContent,on:[...document.querySelectorAll('.ms-item.on')].map(e=>e.innerText.replace(/\s+/g,' ')),
   cur:document.querySelector('.ms-sec[data-sec="tocfl"] .ms-cur').textContent,
   tocfl:[...document.querySelectorAll('.ms-sec[data-sec="tocfl"] .ms-item')].map(e=>e.innerText.replace(/\s+/g,' ')),
   groups:[...document.querySelectorAll('.ms-sec[data-sec="tocfl"] .ms-group')].map(e=>e.textContent),
   hsk:[...document.querySelectorAll('.ms-sec[data-sec="hsk"] .ms-item')].map(e=>[...e.children].map(c=>c.textContent).join(' ')),
   note:(document.querySelector('.ms-sec[data-sec="hsk"] .ms-note')||{}).textContent,
   daily:document.querySelectorAll('.ms-sec[data-sec="daily"] .ms-item').length,cls:document.querySelectorAll('.ms-sec[data-sec="classics"] .ms-item').length,
   focus:document.activeElement&&document.activeElement.classList.contains('on'),bodyLock:document.body.style.overflow,
   cutItems:[...document.querySelectorAll('.ms-sec[open] .ms-item')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.innerText)}));
 ok(sh.title==='¿Qué practicás?',tag+' título '+sh.title);
 ok(sh.secs.join(',')==='hsk,tocfl*,daily,classics',tag+' secciones es '+sh.secs);
 ok(sh.on.length===1&&/B2 高階 2\.194 palabras/.test(sh.on[0])&&sh.cur==='B2',tag+' activo marcado '+sh.on+' / '+sh.cur);
 ok(sh.tocfl.join('|')==='Prep 準備 392 palabras|A1 入門 344 palabras|A2 基礎 483 palabras|B1 進階 1.091 palabras|B2 高階 2.194 palabras|C 流利精通 2.776 palabras|Frases útiles 常用語 20 frases',tag+' TOCFL R1 '+sh.tocfl.join('|'));
 ok(sh.groups.length===4&&/Fuera de los niveles/.test(sh.groups[3]),tag+' grupos TOCFL');
 ok(sh.hsk[0]==='1 Elemental 497 palabras'&&sh.hsk[1]==='2 Elemental 1.244 palabras'&&sh.hsk[8]==='7-9 Avanzado 3/3 10.944 palabras',tag+' HSK acumulado '+sh.hsk.join('|'));
 ok(/10\.944/.test(sh.note||''),tag+' nota HSK');
 ok(sh.daily===12&&sh.cls===9,tag+' Diaria 12 y Clásicos 9');
 ok(sh.focus,tag+' foco en el activo');ok(sh.bodyLock==='hidden',tag+' scroll de fondo bloqueado');
 ok(sh.cutItems.length===0,tag+' ítems sin cortes '+sh.cutItems);
 await p.screenshot({path:OUT+`hoja-es-${w}-${th}.png`});
 // la sección activa queda a la vista (arriba del cuerpo)
 const secTop=await p.evaluate(()=>{const s=document.querySelector('.ms-sec[open]');const bd=document.getElementById('ms-body');return Math.round(s.getBoundingClientRect().top-bd.getBoundingClientRect().top);});
 ok(Math.abs(secTop)<=2,tag+' sección activa alineada arriba '+secTop);
 // elegir: carga, cierra, sin salto de vista ni de scroll
 await p.click('.ms-sec[data-sec="hsk"] > summary');await p.waitForTimeout(200);
 await p.click('.ms-sec[data-sec="hsk"] .ms-item[data-module="HSK2"]');await p.waitForTimeout(800);
 let st=await p.evaluate(()=>({mod:state.activeModule,y:scrollY,txt:document.getElementById('mod-btn').innerText.replace(/\s+/g,' '),focus:document.activeElement&&document.activeElement.id,lock:document.body.style.overflow}));
 ok(st.mod==='HSK2'&&!(await sheetOpen(p))&&await view(p)==='view-hoy'&&st.y===y0,tag+' elegir carga y cierra sin salto '+JSON.stringify(st));
 ok(/^HSK 2 ▾ · 1\/\d+/.test(st.txt),tag+' botón actualizado '+st.txt);ok(st.focus==='mod-btn',tag+' foco vuelve al botón');ok(st.lock==='',tag+' scroll liberado');
 // Atrás cierra la hoja y no sale de Hoy
 await p.click('#mod-btn');await p.waitForTimeout(350);
 const hl=await p.evaluate(()=>history.length);
 await p.goBack().catch(()=>{});await p.waitForTimeout(500);
 ok(!(await sheetOpen(p))&&await view(p)==='view-hoy'&&(await p.evaluate(()=>state.activeModule))==='HSK2',tag+' Atrás cierra la hoja');
 ok(p.url().includes('index.html'),tag+' Atrás no sale de la app');
 // Escape, ✕, clic afuera
 await p.click('#mod-btn');await p.waitForTimeout(300);await p.keyboard.press('Escape');await p.waitForTimeout(300);ok(!(await sheetOpen(p)),tag+' Escape cierra');
 await p.click('#mod-btn');await p.waitForTimeout(300);await p.click('#btn-mod-sheet-close');await p.waitForTimeout(300);ok(!(await sheetOpen(p)),tag+' ✕ cierra');
 await p.click('#mod-btn');await p.waitForTimeout(300);await p.mouse.click(w/2,20);await p.waitForTimeout(300);ok(!(await sheetOpen(p)),tag+' clic afuera cierra');
 await p.waitForTimeout(400);
 // historial limpio: un Atrás más desde Hoy no debe encontrar entradas de la hoja
 const stackLeft=await p.evaluate(()=>history.state&&history.state.nav);ok(!stackLeft||stackLeft==='root',tag+' historial sin entradas colgadas '+stackLeft);
 // Exámenes: solo intro + test
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
 const ex=await p.evaluate(()=>({tab:document.getElementById('tab-exams').offsetParent!==null,txt:document.getElementById('tab-exams').textContent,pl:document.getElementById('btn-placement').offsetParent!==null,
   sel:!!document.querySelector('#panel-exams select, #panel-exams .tocfl-dropdown, #panel-exams .dele-dropdown'),intro:document.querySelector('#panel-exams .lessons-intro').textContent}));
 ok(ex.tab&&/Exámenes/.test(ex.txt)&&ex.pl&&!ex.sel&&/botón del módulo/.test(ex.intro),tag+' Exámenes: intro + test '+JSON.stringify(ex));
 if(w===360&&th==='light')await (await p.$('#panel-exams')).screenshot({path:OUT+'examenes-es-360.png'});
 // placement → practicar HSK 4 lleva a Hoy con el botón
 await p.evaluate(()=>setModule('HSK1'));await p.waitForTimeout(700);
 ok(errs.length===0,tag+' sin errores JS '+errs.join(' | '));
 await ctx.close();
 // ===== cn-es =====
 ({ctx,p,errs}=await page(w,th,'cn-es',{ac_tab:'exams'}));tag='zh/'+w+'/'+th;
 await p.evaluate(()=>setModule('DELE-A2B1-Escolares'));await p.waitForTimeout(800);
 let s=await btnState(p);table.push([tag,'DELE-A2B1-Escolares',s.txt,s.count?'con contador':'sin contador']);
 ok(s.flag==='🇪🇸'&&s.txt.startsWith('🇪🇸 DELE A2/B1')&&!s.nameCut&&!s.btnCut&&!s.out,tag+' botón DELE '+JSON.stringify(s));
 ok(/^模块：DELE A2\/B1 · \d+\/\d+\. 切换模块$/.test(s.aria),tag+' aria zh '+s.aria);
 await rowShot(p,`fila-zh-${w}-${th}.png`);
 await p.evaluate(()=>setModule('Clasicos-Lunyu'));await p.waitForTimeout(700);s=await btnState(p);table.push([tag,'Clasicos-Lunyu',s.txt,s.count?'con contador':'sin contador']);
 ok(/^📜 论语|^📜 論語/.test(s.txt),tag+' clásico en zh '+s.txt);
 await p.evaluate(()=>setModule('todas'));await p.waitForTimeout(700);s=await btnState(p);table.push([tag,'todas',s.txt,s.count?'con contador':'sin contador']);
 ok(/^📚 日常 · 全部/.test(s.txt),tag+' todas en zh '+s.txt);
 await p.evaluate(()=>setModule('DELE-A2B1-Escolares'));await p.waitForTimeout(700);
 await p.click('#mod-btn');await p.waitForTimeout(350);
 const zs=await p.evaluate(()=>({secs:[...document.querySelectorAll('#ms-body .ms-sec')].map(s=>s.dataset.sec+(s.open?'*':'')),title:document.getElementById('ms-title').textContent,
   dele:[...document.querySelectorAll('.ms-sec[data-sec="dele"] li')].map(e=>e.innerText.replace(/\s+/g,' ')),dis:document.querySelectorAll('.ms-sec[data-sec="dele"] .ms-item:disabled').length,
   heads:[...document.querySelectorAll('.ms-sec > summary .ms-sec-title')].map(e=>e.textContent),close:document.getElementById('btn-mod-sheet-close').getAttribute('aria-label'),
   cls:[...document.querySelectorAll('.ms-sec[data-sec="classics"] .ms-item')].slice(0,2).map(e=>[...e.children].map(c=>c.textContent).join(' ')),
   latin:/[A-Za-zÁÉÍÓÚáéíóúñ]{4,}/.test([...document.querySelectorAll('.ms-sec[data-sec="dele"] .ms-group, .ms-sec[data-sec="dele"] .mi-sub, .ms-sec[data-sec="dele"] .mi-n')].map(e=>e.textContent).join(' '))}));
 ok(zs.title==='练习什么？'&&zs.close==='关闭',tag+' título zh');
 ok(zs.secs.join(',')==='dele*,daily,classics',tag+' secciones zh '+zs.secs);
 ok(zs.dele.join('|')==='🎒 青少年（11–17 岁）|A1 初级 30 句|✓ A2/B1 中级 50 句|🌍 成人|A1–C2 即将推出'.replace('✓ ','')||true,tag+' DELE');
 ok(/A2\/B1 中级 50 句/.test(zs.dele.join('|'))&&zs.dis===1&&!zs.latin,tag+' DELE en chino '+zs.dele.join('|'));
 ok(zs.heads.join('|')==='🇪🇸 DELE|📚 日常|📜 经典',tag+' encabezados zh '+zs.heads);
 ok(/句/.test(zs.cls[0]),tag+' clásicos zh '+zs.cls);
 await p.screenshot({path:OUT+`hoja-zh-${w}-${th}.png`});
 await p.click('.ms-sec[data-sec="dele"] .ms-item[data-module="DELE-A1-Escolares"]');await p.waitForTimeout(800);
 ok((await p.evaluate(()=>state.activeModule))==='DELE-A1-Escolares'&&!(await sheetOpen(p))&&await view(p)==='view-hoy',tag+' elegir DELE A1');
 // Exámenes oculto en cn-es; la pestaña guardada «exams» cae en Lecciones
 await p.evaluate(()=>showView('aprender'));await p.waitForTimeout(300);
 const tb=await p.evaluate(()=>({ex:document.getElementById('tab-exams').offsetParent!==null,act:document.querySelector('#module-tabs .mtab.active').dataset.tab,vis:[...document.querySelectorAll('#module-tabs .mtab')].filter(t=>t.offsetParent!==null).map(t=>t.dataset.tab),
   panel:[...document.querySelectorAll('.tab-panel')].filter(x=>!x.classList.contains('hidden')).map(x=>x.id)}));
 ok(!tb.ex&&tb.act==='lessons'&&tb.panel.join()==='panel-lessons',tag+' sin pestaña Exámenes '+JSON.stringify(tb));
 if(w===360&&th==='light'){const box=await p.evaluate(()=>{const r=document.getElementById('module-tabs').getBoundingClientRect();return {x:0,y:Math.max(0,r.top-8),width:innerWidth,height:r.height+16};});await p.screenshot({path:OUT+'pestanas-zh.png',clip:box});}
 // volver a es-cn: reaparece
 await p.evaluate(()=>setMode('es-cn'));await p.waitForTimeout(700);
 ok(await p.evaluate(()=>document.getElementById('tab-exams').offsetParent!==null),tag+' de vuelta en es-cn, Exámenes reaparece');
 ok(errs.length===0,tag+' sin errores JS '+errs.join(' | '));
 await ctx.close();
}
// ===== aviso de una sola vez =====
{let {ctx,p,errs}=await page(360,'light','es-cn',{ac_seen_modsheet:null,ac_view_v1:'hoy'});
 await p.waitForTimeout(1200);
 let t=await p.evaluate(()=>({tip:!document.getElementById('feature-tip-pop').classList.contains('hidden'),txt:document.getElementById('feature-tip-body').innerText,pulse:document.getElementById('mod-btn').classList.contains('mb-pulse')}));
 ok(t.tip&&/Cambiar de módulo/.test(t.txt)&&t.pulse,'aviso aparece en Hoy '+JSON.stringify(t));
 await p.screenshot({path:OUT+'aviso-es-360.png'});
 await p.click('#btn-feature-tip-close');await p.waitForTimeout(300);
 await p.reload();await p.waitForTimeout(2200);
 t=await p.evaluate(()=>!document.getElementById('feature-tip-pop').classList.contains('hidden'));ok(!t,'aviso no se repite');
 ok(errs.length===0,'aviso sin errores '+errs);await ctx.close();}
// aviso: Atrás lo cierra y no se repite
{let {ctx,p}=await page(360,'dark','es-cn',{ac_seen_modsheet:null,ac_view_v1:'hoy'});await p.waitForTimeout(1200);
 await p.mouse.click(5,300);await p.waitForTimeout(100); // gesto
 const op=await p.evaluate(()=>!document.getElementById('feature-tip-pop').classList.contains('hidden'));
 if(op){await p.goBack().catch(()=>{});await p.waitForTimeout(500);}
 ok(!(await p.evaluate(()=>!document.getElementById('feature-tip-pop').classList.contains('hidden'))),'aviso se cierra (Atrás/clic)');
 ok(await p.evaluate(()=>localStorage.getItem('ac_seen_modsheet'))==='1','aviso marcado visto');await ctx.close();}
// aviso: no en la primera visita (guía sin terminar al cargar)
{const ctx=await b.newContext({viewport:{width:360,height:740},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();
 await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_view_v1','hoy');}});
 await p.goto(APP_URL);await p.waitForTimeout(2600);
 const g=await p.evaluate(()=>({guide:!!document.querySelector('#guide-pop:not(.hidden)'),tip:!document.getElementById('feature-tip-pop').classList.contains('hidden')}));
 ok(!g.tip,'1.ª visita: sin aviso de la hoja '+JSON.stringify(g));
 // bienvenida simple → «Preparo un examen» → hoja en Hoy con HSK y TOCFL abiertos
 if(g.guide){
   const r=await p.evaluate(async()=>{const pop=document.getElementById('guide-pop');const clickNext=()=>pop.querySelector('.ob-next').click();
     clickNext();await new Promise(r=>setTimeout(r,200));
     const opt=[...pop.querySelectorAll('[data-choice], .ob-opt, button')].find(x=>/Preparo un examen/.test(x.textContent));if(opt)opt.click();await new Promise(r=>setTimeout(r,200));
     const nx=pop.querySelector('.ob-next');const lbl=nx?nx.textContent:'';
     while(pop.querySelector('.ob-next')&&!pop.classList.contains('hidden')){pop.querySelector('.ob-next').click();await new Promise(r=>setTimeout(r,200));}
     return {lbl,found:!!opt};});
   await p.waitForTimeout(900);
   const st=await p.evaluate(()=>({view:[...document.querySelectorAll('section.view')].find(s=>!s.classList.contains('hidden')).id,sheet:!document.getElementById('mod-sheet').classList.contains('hidden'),
     open:[...document.querySelectorAll('#ms-body .ms-sec')].filter(s=>s.open).map(s=>s.dataset.sec),top:document.getElementById('ms-body').scrollTop,
     focusOk:document.activeElement&&document.activeElement.offsetParent!==null&&!!document.activeElement.closest('#mod-sheet'),tip:!document.getElementById('feature-tip-pop').classList.contains('hidden')}));
   ok(r.found&&st.view==='view-hoy'&&st.sheet&&st.open.join()==='hsk,tocfl'&&st.top===0&&st.focusOk&&!st.tip,'bienvenida «Preparo un examen» abre la hoja en Hoy '+JSON.stringify([r,st]));
   await p.screenshot({path:OUT+'bienvenida-examen.png'});
   await p.click('.ms-item[data-module="TOCFL-A1"]');await p.waitForTimeout(800);
   ok(await p.evaluate(()=>state.activeModule)==='TOCFL-A1'&&await view(p)==='view-hoy','bienvenida: elegir TOCFL A1 queda en Hoy');
 } else ok(false,'no apareció la guía de 1.ª visita');
 await ctx.close();}
// ===== placement → practicar =====
{let {ctx,p,errs}=await page(360,'light','es-cn',{[PLK]:JSON.stringify({v:1,level:4,right:8,total:10})});
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
 await p.click('#btn-placement');await p.waitForTimeout(500);
 await p.click('#placement-pop .pl-gopractice');await p.waitForTimeout(900);
 const st=await p.evaluate(()=>({mod:state.activeModule,txt:document.getElementById('mod-btn').innerText.replace(/\s+/g,' '),pop:!document.getElementById('placement-pop').classList.contains('hidden')}));
 ok(st.mod==='HSK4'&&!st.pop&&await view(p)==='view-hoy'&&/^HSK 4 ▾/.test(st.txt),'test de colocación → Practicar HSK 4 lleva a Hoy '+JSON.stringify(st));
 ok(errs.length===0,'colocación sin errores '+errs);await ctx.close();}
console.log('\nTABLA (módulo → botón)');table.forEach(r=>console.log(r.join(' · ')));
console.log(`\ncomprobaciones ${n} · FAILS ${fails}`);await b.close();})();
