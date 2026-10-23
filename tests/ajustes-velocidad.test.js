const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('ajustes-velocidad');const fs=require('fs');
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++;};const meas=[];
(async()=>{const b=await chromium.launch({...LAUNCH});
for(const lang of ['es','zh'])for(const theme of ['light','dark','paper']){const T='['+lang+' '+theme+'] ';
 const ctx=await b.newContext({viewport:{width:360,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(({theme,mode})=>{if(sessionStorage.getItem('i'))return;sessionStorage.setItem('i','1');localStorage.clear();
  localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('theme',theme);localStorage.setItem('ac_speed','1');
  localStorage.setItem('chino-espanol-app-v2',JSON.stringify({mode,charType:'trad'}));},{theme,mode:lang==='es'?'es-cn':'cn-es'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(APP_URL);await p.waitForTimeout(1400);
 const st=()=>p.evaluate(()=>({hS:document.getElementById('btn-simplified').classList.contains('active'),hT:document.getElementById('btn-traditional').classList.contains('active'),
  aS:document.getElementById('btn-simplified-set').classList.contains('active'),aT:document.getElementById('btn-traditional-set').classList.contains('active'),
  ct:JSON.parse(localStorage.getItem('chino-espanol-app-v2')||'{}').charType,spA:document.getElementById('btn-speed').textContent,spH:document.getElementById('btn-speed-hoy').textContent,
  sp:localStorage.getItem('ac_speed'),grand:document.body.classList.contains('grand-mode'),gk:localStorage.getItem('ac_grand'),gl:document.getElementById('btn-grand').textContent,
  kaiti:document.body.classList.contains('font-kaiti'),fk:localStorage.getItem('ac_font_mode'),fl:document.getElementById('btn-font-mode').textContent}));
 let s=await st();
 ok(s.hT&&s.aT&&!s.hS&&!s.aS,T+'al abrir, Hoy y Ajustes muestran 繁 (valor guardado)');
 ok(s.spA===s.spH&&s.spA.includes('1.0x'),T+'al abrir, velocidad igual en Ajustes y Hoy ('+s.spA+')');
 ok(await p.evaluate(()=>!document.querySelector('#tools-row #btn-grand')&&!document.querySelector('#tools-row #btn-font-mode')&&!!document.querySelector('.yo-settings #btn-grand')&&!!document.querySelector('.yo-settings #btn-font-mode')&&!!document.querySelector('#tools-row #btn-speed-hoy')),T+'Grande y fuente en Ajustes; ⚡ en la hoja Ver de Hoy');
 const labels=await p.$$eval('.yo-settings .set-label',x=>x.map(e=>e.textContent));
 ok(lang==='es'?labels.includes('Escritura')&&labels.includes('Letra grande')&&labels.includes('Fuente china'):labels.includes('字形')&&labels.includes('大字')&&labels.includes('中文字体'),T+'etiquetas de Ajustes: '+labels.slice(1,6).join(' · '));
 // Hoy con la hoja abierta
 await p.evaluate(()=>{showView('hoy');window.scrollTo(0,0);});await p.click('#btn-tools-toggle');await p.waitForTimeout(400);
 await p.screenshot({path:OUT+'impl-'+lang+'-'+theme+'-hoy.png'});
 await p.click('#btn-simplified');s=await st();ok(s.hS&&s.aS&&s.ct==='simp',T+'Hoy 简 → Ajustes 简, guardado charType=simp');
 await p.click('#btn-speed-hoy');s=await st();ok(s.spA===s.spH&&s.sp==='0.7',T+'velocidad desde Hoy → Ajustes ('+s.spH+', ac_speed='+s.sp+')');
 const hoyChip=await p.evaluate(()=>{const e=document.getElementById('btn-speed-hoy'),cs=getComputedStyle(e),r=e.getBoundingClientRect();return {fg:cs.color,bg:cs.backgroundColor,r:{l:r.left,t:r.top,w:r.width,h:r.height}};});
 await p.screenshot({path:OUT+'m-'+lang+'-'+theme+'-hoy.png'});meas.push({lang,theme,what:'⚡ Hoy',png:'m-'+lang+'-'+theme+'-hoy.png',e:hoyChip});
 // Ajustes
 await p.evaluate(()=>{showView('yo');document.querySelector('.yo-settings').scrollIntoView({block:'start'});});await p.waitForTimeout(300);
 await p.click('#btn-traditional-set');s=await st();ok(s.hT&&s.aT&&s.ct==='trad',T+'Ajustes 繁 → Hoy 繁, guardado charType=trad');
 await p.click('#btn-speed');s=await st();ok(s.spA===s.spH&&s.sp==='0.85',T+'velocidad desde Ajustes → Hoy ('+s.spA+')');
 await p.click('#btn-grand');await p.click('#btn-font-mode');await p.waitForTimeout(300);s=await st();
 ok(s.grand&&s.gk==='1'&&s.gl.includes('ON')&&s.kaiti&&s.fk==='kaiti'&&s.fl==='楷体',T+'Grande y 楷体 desde Ajustes: aplicados y guardados (ac_grand, ac_font_mode)');
 await p.evaluate(()=>document.querySelector('.yo-settings').scrollIntoView({block:'start'}));await p.waitForTimeout(400);
 const seg=await p.evaluate(()=>['btn-simplified-set','btn-traditional-set'].map(id=>{const e=document.getElementById(id),cs=getComputedStyle(e),r=e.getBoundingClientRect();return {id,fg:cs.color,bg:cs.backgroundColor,r:{l:r.left,t:r.top,w:r.width,h:r.height}};}));
 await p.screenshot({path:OUT+'impl-'+lang+'-'+theme+'-ajustes.png'});seg.forEach(e=>meas.push({lang,theme,what:e.id.includes('trad')?'繁 activo (Ajustes)':'简 inactivo (Ajustes)',png:'impl-'+lang+'-'+theme+'-ajustes.png',e}));
 // recarga
 await p.reload();await p.waitForTimeout(1400);s=await st();
 ok(s.hT&&s.aT&&s.spA===s.spH&&s.spA.includes('0.85')&&s.grand&&s.kaiti,T+'recarga: 繁, 0.85x, Grande ON y 楷体 se conservan');
 // chip de velocidad de lecciones: sin cambios, comparte el valor
 if(lang==='es'){await p.evaluate(()=>showView('aprender'));await p.click('#tab-lessons');await p.click('#lesson-list .lq-btn[data-act="read"]');await p.waitForTimeout(300);
  await p.click('#lq-gloss-continue').catch(()=>{});await p.waitForTimeout(200);const lc=await p.textContent('#lq-story-speed');
  await p.click('#lq-close');ok(lc.includes('0.85'),T+'chip de velocidad de la lección muestra el mismo valor ('+lc.trim()+')');}
 ok(errs.length===0,T+'sin errores JS '+errs.join(' / '));await ctx.close();}
fs.writeFileSync(OUT+'meas.json',JSON.stringify(meas));console.log(fails?'FALLAS: '+fails:'TODO OK');await b.close();})();
