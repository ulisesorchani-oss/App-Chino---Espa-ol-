const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const F=require('./data/keywords-hsk.json');
const stub=()=>{class S{segment(t){const a=[];let i=0;for(const c of String(t)){a.push({segment:c,index:i,input:t});i+=c.length;}return a;}}Intl.Segmenter=S;};
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
for(const mode of ['escritorio','android']) for(const sc of ['simp','trad']) for(const o of F){
 const lv=o.hsk>=7?'7-9':String(o.hsk);
 const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});
 if(mode==='android')await ctx.addInitScript(stub);
 await ctx.addInitScript(([sc,lv])=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_lesson_level',lv);if(sc==='trad')localStorage.setItem('ac_script_hsk','trad');},[sc,lv]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(APP_URL);await p.waitForTimeout(1000);await p.evaluate(()=>showView('aprender'));
 await p.click('.lq-btn[data-act="read"][data-id="'+o.id+'"]');await p.waitForTimeout(400);
 const g=await p.$$eval('.lq-gloss-item',a=>a.map(x=>[x.querySelector('.lq-gloss-zh').textContent,x.querySelector('.lq-gloss-py').textContent,x.querySelector('.lq-gloss-es').textContent]));
 const want=o.kw.map(w=>[sc==='trad'?w.zhT:w.zh,w.py,w.es]);
 ok(JSON.stringify(g)===JSON.stringify(want),mode+'/'+sc+'/'+o.id+'\n  sale:  '+JSON.stringify(g)+'\n  debía: '+JSON.stringify(want));
 ok(!errs.length,mode+'/'+sc+'/'+o.id+' errores JS '+errs.join('/'));
 await ctx.close();}
await b.close();console.log('comprobaciones '+n+' · FAILS '+fails);})();
