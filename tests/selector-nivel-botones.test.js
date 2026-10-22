const { chromium, LAUNCH, BASE, shots } = require('./lib/env');
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
const REF=process.env.BASE_URL_REF; // opcional: otra copia de la app (p. ej. main) para comparar estilos
const look=async(base,w,th,lv)=>{const ctx=await b.newContext({viewport:{width:w,height:700},serviceWorkers:'block'});
 await ctx.addInitScript(([th,lv])=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('theme',th);localStorage.setItem('ac_lesson_level',lv);},[th,lv]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(base+'/index.html');await p.waitForTimeout(1100);await p.evaluate(()=>showView('aprender'));await p.waitForTimeout(600);
 const r=await p.evaluate(()=>[...document.querySelectorAll('.lvsel')].filter(l=>l.offsetParent!==null).map(l=>{const s=l.querySelector('select'),t=l.querySelector('.lvsel-tag');const cs=getComputedStyle(s);
   const c=document.createElement('canvas').getContext('2d');c.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;
   const avail=s.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
   const opts=[...s.options].map(o=>({t:o.textContent,w:c.measureText(o.textContent).width}));
   const tr=t&&t.getBoundingClientRect(),sr=s.getBoundingClientRect();
   return {cls:l.className,shown:s.options[s.selectedIndex].textContent,avail,opts,bg:cs.backgroundColor,fg:cs.color,border:cs.borderColor,shadow:cs.boxShadow,tag:t?{txt:t.textContent,color:getComputedStyle(t).color,inside:tr.left>=sr.left&&tr.right<=sr.right&&tr.top>=sr.top&&tr.bottom<=sr.bottom}:null,h:Math.round(sr.height)};}));
 await ctx.close();return {r,errs};};
for(const w of [360,320]) for(const th of ['light','dark','paper']) for(const lv of ['1','7-9','tocfl:Prep','tocfl:C1']){
 const B=await look(BASE,w,th,lv),A=REF?await look(REF,w,th,lv):null;const tag=w+'/'+th+'/'+lv;
 B.r.forEach((x,i)=>{const a=A&&A.r[i];
  ok(x.opts.every(o=>o.w<=x.avail),tag+' '+x.cls+' opciones sin corte: '+x.opts.map(o=>o.t+'='+o.w.toFixed(0)).join(' ')+' / disponible '+x.avail.toFixed(0));
  ok(x.tag&&x.tag.color===x.fg,tag+' '+x.cls+' etiqueta mismo color que el texto ('+(x.tag&&x.tag.color)+' vs '+x.fg+')');
  ok(x.tag&&x.tag.inside,tag+' '+x.cls+' etiqueta dentro del botón');
  if(a)ok(a.bg===x.bg&&a.fg===x.fg&&a.border===x.border&&a.shadow===x.shadow,tag+' '+x.cls+' colores/bordes iguales a main');
 });
 ok(!B.errs.length,tag+' sin errores JS');
 if(A&&th==='light'&&lv==='tocfl:Prep')console.log(w+'px: antes «'+A.r.map(x=>x.shown).join('» «')+'» (corte TOCFL: '+A.r[1].opts.filter(o=>o.w>A.r[1].avail).map(o=>o.t).join(', ')+') → ahora «'+B.r.map(x=>(x.tag?x.tag.txt+' / ':'')+x.shown).join('» «')+'», alto '+B.r[0].h+' px');
}
await b.close();console.log('comprobaciones '+n+' · FAILS '+fails);})();
