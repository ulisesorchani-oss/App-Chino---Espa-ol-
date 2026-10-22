const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('entrenar-grilla');require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
for(const [w,mode] of [[320,'es-cn'],[360,'es-cn'],[420,'es-cn'],[600,'es-cn'],[420,'cn-es']]) for(const th of (w===420&&mode==='es-cn'||w===360||w===320?['light','dark','paper']:['light'])){
 const ctx=await b.newContext({viewport:{width:w,height:760},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript((th)=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1','entrenar');},th);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(APP_URL);await p.waitForTimeout(1300);
 if(mode==='cn-es'){await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(800);}
 const g=await p.evaluate(()=>{const gr=document.querySelector('.train-grid');const cs=getComputedStyle(gr).gridTemplateColumns.split(' ').length;const vis=[...gr.querySelectorAll('.train-card')].filter(c=>c.offsetParent!==null);const r=vis.map(c=>c.getBoundingClientRect());const gw=gr.getBoundingClientRect().width;
  const last=vis[vis.length-1].getBoundingClientRect();return {cols:cs,n:vis.length,lastFull:Math.abs(last.width-gw)<2,rows:new Set(r.map(x=>Math.round(x.top))).size,overlap:r.some((a,i)=>r.some((c,j)=>j>i&&a.left<c.right-1&&c.left<a.right-1&&a.top<c.bottom-1&&c.top<a.bottom-1)),w:vis.map(c=>Math.round(c.getBoundingClientRect().width))};});
 const tag=w+'/'+mode+'/'+th;
 if(mode==='es-cn'){
  if(w>380){ok(g.cols===2&&g.n===5&&g.lastFull&&!g.overlap,tag+' 2 columnas: 5 tarjetas, la última al ancho completo '+JSON.stringify(g));}
  else{ok(g.cols===1&&g.n===5&&!g.overlap,tag+' 1 columna (≤380 px): 5 tarjetas '+JSON.stringify(g));}
 } else {ok(g.n===2&&!g.overlap&&g.cols===2&&!g.lastFull,tag+' aprendo español: 2 tarjetas lado a lado, sin hueco raro '+JSON.stringify(g));}
 await p.evaluate(()=>{const c=document.getElementById('btn-exam-practice');if(c.offsetParent)c.scrollIntoView({block:'center'});else window.scrollTo(0,0);});await p.waitForTimeout(250);
 await p.screenshot({path:OUT+`${w}-${mode}-${th}.png`});
 ok(errs.length===0,tag+' sin errores '+errs);await ctx.close();}
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
