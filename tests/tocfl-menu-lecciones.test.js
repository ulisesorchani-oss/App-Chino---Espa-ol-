const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('tocfl-menu-lecciones');
const MODS=[['TOCFL-Prep','Prep'],['TOCFL-A1','A1'],['TOCFL-A2','A2'],['TOCFL-B3','B1'],['TOCFL-B4','B2'],['TOCFL-C','C'],['TOCFL','Frases útiles']];
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
const cut=(sel)=>`[...document.querySelectorAll('${sel}')].filter(e=>e.offsetParent!==null).map(e=>({t:e.textContent.trim(),cut:e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>innerWidth+0.5}))`;
for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const ctx=await b.newContext({viewport:{width:w,height:760},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript((th)=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('theme',th);localStorage.setItem('ac_lesson_level','tocfl:C1');},th);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(APP_URL);await p.waitForTimeout(1200);const tag=w+'/'+th;
 for(const [mod,code] of MODS){
   await p.evaluate(m=>setModule(m),mod);await p.waitForTimeout(500);
   const r=await p.evaluate(()=>({badge:document.getElementById('card-flag').textContent+' '+document.getElementById('card-level').textContent,status:document.getElementById('module-status').textContent,btn:'TOCFL '+TOCFL_INFO[state.activeModule].badge,active:state.activeModule}));
   const wantBadge='🇹🇼 TOCFL '+code;
   ok(r.badge===wantBadge,tag+' '+mod+' distintivo «'+r.badge+'» (esperado «'+wantBadge+'»)');
   ok(r.btn==='TOCFL '+code,tag+' '+mod+' botón Exámenes «'+r.btn+'»');
   ok(!/Nivel [1-6]|N[1-5]\b|Novice|muestra/.test(r.badge+r.status+r.btn),tag+' '+mod+' sin nombres viejos: '+r.status);
   ok(r.active===mod,tag+' id interno intacto '+r.active);
   if(th==='light'&&w===320&&mod==='TOCFL-B4'){await p.screenshot({path:`${OUT}hoy-${w}.png`,clip:{x:0,y:360,width:w,height:240}});}
 }
 // R3: el menú TOCFL vive en la hoja de módulos (botón de Hoy)
 await p.evaluate(()=>{showView('hoy');});await p.waitForTimeout(300);
 await p.click('#mod-btn');await p.waitForTimeout(350);
 const menu=await p.evaluate(()=>[...document.querySelectorAll('.ms-sec[data-sec="tocfl"] li')].map(li=>li.textContent.replace(/\s+/g,' ').trim()));
 const items=await p.evaluate(new Function('return '+cut('.ms-sec[data-sec="tocfl"] .ms-item span, #mod-btn')));
 ok(items.every(x=>!x.cut),tag+' hoja TOCFL sin cortes '+JSON.stringify(items.filter(x=>x.cut)));
 const codes=await p.evaluate(()=>[...document.querySelectorAll('.ms-sec[data-sec="tocfl"] .ms-item')].map(it=>{const c=it.querySelector('.mi-code');return c&&getComputedStyle(c).display!=='none'&&c.getBoundingClientRect().width>0?c.textContent:'(oculto)';}));
 ok(JSON.stringify(codes)===JSON.stringify(['Prep','A1','A2','B1','B2','C','Frases útiles']),tag+' códigos visibles en la hoja: '+codes.join(','));
 ok(menu.indexOf('💬 Fuera de los niveles')>menu.findIndex(x=>/流利精通/.test(x)),tag+' Frases útiles fuera y después de los niveles');
 if(th==='light'&&w===320)console.log('hoja: '+menu.join(' | '));
 await p.keyboard.press('Escape');await p.waitForTimeout(200);
 await p.evaluate(()=>{showView('aprender');const t=document.getElementById('tab-exams');if(t)t.click();});await p.waitForTimeout(400);
 const intro=await p.evaluate(()=>document.querySelector('#panel-exams .lessons-intro').textContent);
 ok(!/opción simple/.test(intro),tag+' intro corregida');
 // Lecciones: botones y etiquetas
 await p.evaluate(()=>{const t=document.getElementById('tab-lessons');if(t)t.click();});await p.waitForTimeout(400);
 const les=await p.evaluate(()=>({opts:[...document.getElementById('sel-lv-tocfl').options].map(o=>o.textContent),vals:[...document.getElementById('sel-lv-tocfl').options].map(o=>o.value),shown:document.getElementById('sel-lv-tocfl').selectedOptions[0].textContent,tags:[...document.querySelectorAll('#lesson-list .lc-hsk')].map(e=>e.textContent)}));
 ok(JSON.stringify(les.opts)===JSON.stringify(['Prep–C','Prep','A1','A2','B1','B2','C']),tag+' opciones Lecciones '+les.opts.join(','));
 ok(les.vals.includes('tocfl:C1'),tag+' valor guardado tocfl:C1 intacto');
 ok(les.shown==='C'&&les.tags.every(t=>t==='TOCFL C'),tag+' nivel C activo, etiquetas '+les.tags.join(','));
 const lb=await p.evaluate(new Function('return '+cut('.lvsel select, .lvsel-tag')));ok(lb.every(x=>!x.cut),tag+' botones Lecciones sin cortes');
 if(th==='light')await (await p.$('#lesson-levels')).screenshot({path:`${OUT}lecciones-${w}.png`});
 ok(!errs.length,tag+' sin errores JS '+errs.join('/'));
 await ctx.close();}
await b.close();console.log('comprobaciones '+n+' · FAILS '+fails);})();
