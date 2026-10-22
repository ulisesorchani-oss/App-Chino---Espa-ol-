const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('hoja-ninos');
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
async function page(w,th,mode){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript((th)=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1','hoy');}},th);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(APP_URL);await p.waitForTimeout(1300);
 if(mode==='cn-es'){await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);}return {ctx,p,errs};}
const view=(p)=>p.evaluate(()=>[...document.querySelectorAll('section.view')].find(s=>!s.classList.contains('hidden')).id);
const sheetOpen=(p)=>p.evaluate(()=>!document.getElementById('mod-sheet').classList.contains('hidden'));
for(const w of [320,360]) for(const th of ['light','dark','paper']){
 let {ctx,p,errs}=await page(w,th,'cn-es');const tag='zh/'+w+'/'+th;
 await p.evaluate(()=>setModule('DELE-A2B1-Escolares',{stay:true}));await p.waitForTimeout(700);
 await p.click('#mod-btn');await p.waitForTimeout(350);
 const sh=await p.evaluate(()=>{const it=document.querySelector('.ms-sec[data-sec="dele"] .ms-item[data-track="Niños"]');return {has:!!it,txt:it?[...it.children].map(c=>c.textContent).join(' '):'',on:it&&it.classList.contains('on'),
   groups:[...document.querySelectorAll('.ms-sec[data-sec="dele"] .ms-group')].map(e=>e.textContent),
   h:it?Math.round(it.getBoundingClientRect().height):0,cut:it?it.scrollWidth>it.clientWidth+1:true,
   active:[...document.querySelectorAll('.ms-item.on')].map(e=>e.innerText.replace(/\s+/g,' '))};});
 ok(sh.has&&sh.txt==='Niños 儿童 18 课',tag+' entrada Niños en la hoja: '+sh.txt);
 ok(!sh.on&&sh.active.length===1&&/A2\/B1/.test(sh.active[0]),tag+' el activo sigue siendo DELE A2/B1: '+sh.active);
 ok(sh.groups[0]==='🧒 儿童'&&sh.h>=44&&!sh.cut,tag+' grupo y alto táctil '+JSON.stringify([sh.groups,sh.h,sh.cut]));
 await p.evaluate(()=>{const s=document.querySelector('.ms-sec[data-sec="dele"]');const bd=document.getElementById('ms-body');bd.scrollTop=s.offsetTop-bd.offsetTop;});
 await p.screenshot({path:OUT+`hoja-${w}-${th}.png`});
 // Atrás cierra la hoja
 await p.goBack().catch(()=>{});await p.waitForTimeout(400);ok(!(await sheetOpen(p))&&await view(p)==='view-hoy','Atrás cierra la hoja '+tag);
 await p.click('#mod-btn');await p.waitForTimeout(300);
 await p.click('.ms-item[data-track="Niños"]');await p.waitForTimeout(600);
 const st=await p.evaluate(()=>({view:[...document.querySelectorAll('section.view')].find(s=>!s.classList.contains('hidden')).id,tab:document.querySelector('#module-tabs .mtab.active').dataset.tab,
   sheet:!document.getElementById('mod-sheet').classList.contains('hidden'),mod:state.activeModule,
   chips:[...document.querySelectorAll('#dele-tracks .lv-chip')].map(c=>c.textContent+(c.classList.contains('active')?'*':'')),
   empty:(document.querySelector('#dele-list .dl-empty')||{}).textContent||'',cards:document.querySelectorAll('#dele-list .lesson-card').length,
   count:document.querySelectorAll('#dele-list .nino-card').length+' lecciones',
   chipCut:[...document.querySelectorAll('#dele-tracks .lv-chip')].some(c=>c.scrollWidth>c.clientWidth+1||c.getBoundingClientRect().right>innerWidth+.5),
   emptyCut:(()=>{const e=document.querySelector('#dele-list .dl-empty');return !e||e.getBoundingClientRect().right>innerWidth+.5||e.scrollWidth>e.clientWidth+1;})()}));
 ok(st.view==='view-aprender'&&st.tab==='lessons'&&!st.sheet,tag+' elegir Niños lleva a Aprender → Lecciones '+JSON.stringify([st.view,st.tab,st.sheet]));
 ok(st.mod==='DELE-A2B1-Escolares',tag+' no cambia el módulo de Hoy '+st.mod);
 ok(st.chips.join('|')==='🧒 Niños18*|🎓 DELE24|Todas*|🌱 6–79|🌿 8–109',tag+' chips (R14: Niños/DELE arriba + franja) '+st.chips.join('|'));
 ok(st.cards===19&&!st.empty&&st.count==='18 lecciones',tag+' Niños lista 18 lecciones + tarjeta «Sonidos» (sin estado vacío) '+st.cards+' '+st.count);
 ok(!st.chipCut,tag+' sin cortes en chips');
 await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(200);
 await (await p.$('#panel-lessons')).screenshot({path:OUT+`lecciones-${w}-${th}.png`});
 // R14: el botón DELE junta las 24; Escolares (sub-filtro) sigue andando
 await p.click('#dele-tracks [data-seg="dele"]');await p.waitForTimeout(200);
 let c1=await p.evaluate(()=>document.querySelectorAll('#dele-list .lesson-card').length);ok(c1===24,tag+' el botón DELE muestra las 24 ('+c1+')');
 await p.evaluate(()=>DeleLessons.showTrack('Escolares'));await p.waitForTimeout(200);
 c1=await p.evaluate(()=>document.querySelectorAll('#dele-list .lesson-card').length);ok(c1===24,tag+' R15: showTrack(Escolares) abre DELE con las 24 ('+c1+')');
 c1=await p.evaluate(()=>[...document.querySelectorAll('#dele-list .lc-var-es')].length);ok(c1===6,tag+' las 6 de España llevan su pastilla ('+c1+')');
 // la pista Niños lista las 6 lecciones con tarjetas propias y el rótulo de la hoja las cuenta
 await p.evaluate(()=>{DeleLessons.showTrack('Niños');});await p.waitForTimeout(200);
 const k=await p.evaluate(()=>({cards:document.querySelectorAll('#dele-list .lesson-card.nino-card').length,empty:!!document.querySelector('#dele-list .dl-empty')}));
 ok(k.cards===18&&!k.empty,tag+' dieciocho lecciones Niños se listan: '+JSON.stringify(k));
 await p.evaluate(()=>{showView('hoy');});await p.waitForTimeout(200);await p.click('#mod-btn');await p.waitForTimeout(300);
 const n1=await p.evaluate(()=>document.querySelector('.ms-item[data-track="Niños"] .mi-n').textContent);ok(n1==='18 课',tag+' rótulo con lecciones: '+n1);
 await p.keyboard.press('Escape');
 ok(errs.length===0,tag+' sin errores JS '+errs.join('|'));await ctx.close();
 // es-cn: la hoja no ofrece Niños
 ({ctx,p,errs}=await page(w,th,'es-cn'));
 await p.click('#mod-btn');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>!document.querySelector('.ms-item[data-track]')),'es/'+w+'/'+th+' es-cn sin entrada Niños');
 ok(errs.length===0,'es sin errores '+errs);await ctx.close();
}
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
