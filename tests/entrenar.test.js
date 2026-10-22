const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('entrenar');require('fs').mkdirSync(OUT,{recursive:true});
async function pixCr(p,el){const buf=await el.screenshot();return p.evaluate(async(b64)=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};const cnt=new Map();for(let i=0;i<d.length;i+=4){const k=d[i]+','+d[i+1]+','+d[i+2];cnt.set(k,(cnt.get(k)||0)+1);}const bg=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);const lb=L(...bg);let best=1;for(let i=0;i<d.length;i+=4){const l=L(d[i],d[i+1],d[i+2]);const cr=(Math.max(l,lb)+0.05)/(Math.min(l,lb)+0.05);if(cr>best)best=cr;}return Math.round(best*100)/100;},buf.toString('base64'));}
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const crs=[];
async function page(w,th,mode,view){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,view,fresh])=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');if(!fresh)localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1',view);}},[th,view,mode==='fresh']);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(APP_URL);await p.waitForTimeout(1300);
 if(mode==='cn-es'){await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);}return {ctx,p,errs};}
for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const tag=w+'/'+th;
 // ===== Entrenar (es-cn)
 let {ctx,p,errs}=await page(w,th,'es-cn','entrenar');
 const g=await p.evaluate(()=>{const cards=[...document.querySelectorAll('.train-grid .train-card')];const vis=cards.filter(c=>c.offsetParent!==null);const e=document.getElementById('btn-exam-practice');const r=e.getBoundingClientRect();const gr=document.querySelector('.train-grid').getBoundingClientRect();
  return {n:vis.length,ids:vis.map(c=>c.id),last:cards[cards.length-1].id,sub:document.querySelector('[data-i18n="viewEntrenarSub"]').textContent,title:e.querySelector('.tc-title').textContent,desc:e.querySelector('.tc-sub').textContent,
   full:Math.abs(r.width-gr.width)<2,cut:vis.some(c=>c.scrollWidth>c.clientWidth+1||c.getBoundingClientRect().right>innerWidth+.5),aria:[e.getAttribute('aria-haspopup'),e.getAttribute('aria-controls')],ico:e.querySelector('.tc-ico').textContent};});
 ok(g.n===5&&g.last==='btn-exam-practice'&&g.title==='Práctica tipo examen'&&g.desc==='Escuchar, leer y ordenar · no oficial'&&g.ico==='📝',tag+' Entrenar: 5 tarjetas, la nueva al final con su texto '+JSON.stringify(g));
 ok(g.sub==='Ejercicios sueltos: oído, voz, mano y práctica de examen.',tag+' subtítulo de Entrenar actualizado: '+g.sub);
 ok(!g.cut&&JSON.stringify(g.aria)==='["dialog","exam-pop"]',tag+' tarjetas sin cortes y con aria');
 if(w>380)ok(g.full,tag+' la tarjeta impar final ocupa el ancho completo');
 const e=await p.$('#btn-exam-practice');crs.push([tag+' título',await pixCr(p,await e.$('.tc-title'))],[tag+' sub',await pixCr(p,await e.$('.tc-sub'))]);
 await (await p.$('.train-grid')).screenshot({path:OUT+`entrenar-${w}-${th}.png`});
 // ===== Exámenes: sin la práctica, intro sin mención
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
 const ex=await p.evaluate(()=>({btn:!!document.querySelector('#panel-exams #btn-exam-practice'),intro:document.querySelector('#panel-exams .lessons-intro').textContent,pl:document.getElementById('btn-placement').offsetParent!==null,panel:document.getElementById('panel-exams').innerText}));
 ok(!ex.btn&&!/pr[aá]ctica tipo examen|escuch[aá]s|le[eé]s y orden/i.test(ex.intro+ex.panel),tag+' Exámenes sin la práctica y sin mencionarla: «'+ex.intro.slice(0,120)+'…»');
 ok(ex.pl&&/test de colocación/i.test(ex.intro)&&/bot[oó]n del m[oó]dulo/.test(ex.intro),tag+' Exámenes conserva test de colocación y la pista del botón de módulo');
 await (await p.$('#panel-exams')).screenshot({path:OUT+`examenes-${w}-${th}.png`});
 ok(errs.length===0,tag+' sin errores '+errs);await ctx.close();
 // ===== onboarding: la línea de Entrenar (guía simple)
 if(th==='light'){({ctx,p,errs}=await page(w,th,'fresh','hoy'));await p.waitForTimeout(2200);
  const open=await p.evaluate(()=>!!document.querySelector('#guide-pop:not(.hidden)'));
  if(open){
   for(let i=0;i<3;i++){const t=await p.evaluate(()=>document.getElementById('ob-body')?document.getElementById('ob-body').innerText:document.querySelector('#guide-pop').innerText);if(/Tus cuatro pestañas/.test(t))break;
     const opt=await p.$('.ob-opt, [data-choice]');if(opt&&i===1)await opt.click().catch(()=>{});await p.click('.ob-next').catch(()=>{});await p.waitForTimeout(250);}
   const tabs=await p.evaluate(()=>({txt:document.querySelector('#guide-pop').innerText,cut:[...document.querySelectorAll('#guide-pop *')].filter(e=>e.children.length===0&&(e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>innerWidth+.5)).map(e=>e.textContent.slice(0,30))}));
   ok(/Tus cuatro pestañas/.test(tabs.txt)&&/Entrenar\s*oído, escritura, lectura y práctica de examen/.test(tabs.txt.replace(/\n+/g,' ').replace(/Entrenar /,'Entrenar')||tabs.txt.replace(/\n+/g,' '))||/oído, escritura, lectura y práctica de examen/.test(tabs.txt),tag+' onboarding: Entrenar menciona la práctica de examen');
   ok(tabs.cut.length===0,tag+' onboarding sin cortes '+JSON.stringify(tabs.cut));
   await p.screenshot({path:OUT+`onboarding-${w}.png`});
  } else ok(false,tag+' no abrió la guía de 1.ª visita');
  ok(errs.length===0,tag+' onboarding sin errores '+errs);await ctx.close();}
}
// ===== aprendo español: la tarjeta no se ofrece; Entrenar queda con 2 tarjetas
{let {ctx,p,errs}=await page(360,'light','cn-es','entrenar');
 const z=await p.evaluate(()=>({card:getComputedStyle(document.getElementById('btn-exam-practice')).display,vis:[...document.querySelectorAll('.train-grid .train-card')].filter(c=>c.offsetParent!==null).map(c=>c.id),tab:document.getElementById('tab-exams').offsetParent===null}));
 ok(z.card==='none'&&z.vis.join()==='btn-train-record,btn-train-write'&&z.tab,'zh: la tarjeta de práctica está oculta, Entrenar queda con Pronunciación libre y Escribir a mano '+JSON.stringify(z));
 await p.evaluate(()=>setMode('es-cn'));await p.waitForTimeout(700);ok(await p.evaluate(()=>document.getElementById('btn-exam-practice').offsetParent!==null),'al volver a «aprendo chino» la tarjeta reaparece');
 ok(errs.length===0,'zh sin errores '+errs);await ctx.close();}
console.log('contraste de la tarjeta (píxeles reales):');crs.forEach(c=>{console.log('  ',c[0],c[1]);});
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
