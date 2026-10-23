const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const K=require('./data/keywords-lecciones.json');
const stub=()=>{class S{segment(t){const a=[];let i=0;for(const c of String(t)){a.push({segment:c,index:i,input:t});i+=c.length;}return a;}}Intl.Segmenter=S;};
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
for(const mode of ['escritorio','android']) for(const sc of ['trad','simp']) for(const [id,ws] of Object.entries(K)){
 const lv=id.includes('-prep-')?'Prep':'A1';
 const ctx=await b.newContext({viewport:{width:360,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 if(mode==='android')await ctx.addInitScript(stub);
 await ctx.addInitScript(([sc,lv])=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_lesson_level','tocfl:'+lv);if(sc==='simp')localStorage.setItem('ac_script_tocfl','simp');},[sc,lv]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(APP_URL);await p.waitForTimeout(1100);await p.evaluate(()=>showView('aprender'));
 await p.click('.lq-btn[data-act="read"][data-id="'+id+'"]');await p.waitForTimeout(450);
 const g=await p.$$eval('.lq-gloss-item',a=>a.map(x=>[x.querySelector('.lq-gloss-zh').textContent,x.querySelector('.lq-gloss-py').textContent,x.querySelector('.lq-gloss-es').textContent]));
 const want=await p.evaluate(([ws,sc])=>ws.map(([s,t,e])=>[sc==='trad'?t:s,pinyinFor(s,'tocfl'),e]),[ws,sc]);
 const tag=mode+'/'+sc+'/'+id;
 ok(JSON.stringify(g)===JSON.stringify(want),tag+' glosario = keywords\n   sale:  '+JSON.stringify(g)+'\n   debía: '+JSON.stringify(want));
 ok(!errs.length,tag+' errores JS '+errs.join('/'));
 if(mode==='escritorio'&&sc==='trad'&&id==='tocfl-a1-tushuguan')console.log('ejemplo '+tag+': '+g.map(x=>x.join(' ')).join(' · '));
 await ctx.close();}
// lección HSK sin keywords: sigue el glosario automático
for(const mode of ['escritorio','android']){const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});if(mode==='android')await ctx.addInitScript(stub);
 await ctx.addInitScript(()=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_lesson_level','3');});
 const p=await ctx.newPage();await p.goto(APP_URL);await p.waitForTimeout(1100);await p.evaluate(()=>showView('aprender'));
 const id=await p.locator('.lq-btn[data-act="read"]:visible').first().getAttribute('data-id');
 const hasKw=await p.evaluate(id=>!!GRADED_LESSONS.find(x=>x.id===id).keywords,id);
 await p.click('.lq-btn[data-act="read"][data-id="'+id+'"]');await p.waitForTimeout(450);
 const g=await p.$$eval('.lq-gloss-zh',a=>a.map(x=>x.textContent));
 const auto=await p.evaluate(id=>{const l=GRADED_LESSONS.find(x=>x.id===id);return extractKeyWords(l.lines.map(x=>x.zh),5,l.hsk).map(k=>k.zh);},id);
 const kwz=await p.evaluate(id=>(GRADED_LESSONS.find(x=>x.id===id).keywords||[]).map(k=>k.zh),id);
 ok(hasKw&&JSON.stringify(g)===JSON.stringify(kwz),mode+' HSK '+id+' con keywords: glosario = keywords '+g.join(' '));console.log(mode+' HSK '+id+' (automático): '+g.join(' '));await ctx.close();}
await b.close();console.log('comprobaciones '+n+' · FAILS '+fails);})();
