const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++;};
for(const saved of [null,'m','f']){
 const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});
 await ctx.addInitScript((sv)=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_lesson_level','tocfl:Prep');if(sv)localStorage.setItem('ac_voice_zh',sv);},saved);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 let reqs=[];await p.route('**/api/tts**',r=>{const q=r.request();let v=null,l=null;try{const j=JSON.parse(q.postData()||'{}');v=j.voice;l=j.lang;}catch(e){}const u=new URL(q.url());v=v||u.searchParams.get('voice');l=l||u.searchParams.get('lang');reqs.push({v,l});r.fulfill({status:503,body:'{}'});});
 const last=async(fn)=>{reqs=[];await fn();await p.waitForTimeout(500);return reqs.length?reqs[reqs.length-1]:{v:'(sin pedido)',l:''};};
 await p.goto(APP_URL);await p.waitForTimeout(1200);
 const tag='guardada='+(saved||'ninguna');const wantT=saved||'tw-f',wantH=saved||'f';
 const L=(v)=>v.indexOf('tw-')===0?'zh-TW':'zh-CN';
 // lección TOCFL
 await p.evaluate(()=>showView('aprender'));await p.click('.lq-btn[data-act="read"][data-id="tocfl-prep-gongyuan"]');await p.waitForTimeout(400);await p.click('#lq-gloss-continue').catch(()=>{});await p.waitForTimeout(200);
 let r=await last(()=>p.click('.lq-line[data-i="0"] .lq-line-say'));ok(r.v===wantT&&r.l===L(wantT),tag+' · lección TOCFL 🔊 → '+r.v+' '+r.l+' (esperado '+wantT+')');
 await p.keyboard.press('Escape');await p.evaluate(()=>{const x=document.getElementById('lq-close')||document.querySelector('.lq-pop:not(.hidden) .lq-close');if(x)x.click();});await p.waitForTimeout(300);
 // lección HSK
 await p.evaluate(()=>{const s=document.getElementById('sel-lv-hsk');s.value='1';s.dispatchEvent(new Event('change',{bubbles:true}));});await p.waitForTimeout(300);
 await p.click('.lq-btn[data-act="read"][data-id="h1-primer-dia"]');await p.waitForTimeout(400);await p.click('#lq-gloss-continue').catch(()=>{});await p.waitForTimeout(200);
 r=await last(()=>p.click('.lq-line[data-i="0"] .lq-line-say'));ok(r.v===wantH&&r.l===L(wantH),tag+' · lección HSK 🔊 → '+r.v+' '+r.l+' (esperado '+wantH+')');
 await p.evaluate(()=>{const x=document.querySelector('.lq-pop:not(.hidden) .lq-close');if(x)x.click();});await p.waitForTimeout(300);
 // podcast TOCFL y HSK
 for(const [id,want] of [['tocfl-prep-gongyuan',wantT],['h1-primer-dia',wantH]]){
   await p.evaluate(()=>openPodcast());await p.waitForTimeout(300);
   await p.evaluate(id=>{const b=document.querySelector('.pd-item[data-pd-id="'+id+'"]');if(b)b.click();},id);await p.waitForTimeout(300);
   r=await last(()=>p.click('#pd-playpause'));ok(r.v===want&&r.l===L(want),tag+' · Podcast '+id+' → '+r.v+' '+r.l+' (esperado '+want+')');
   await p.evaluate(()=>{const pop=document.getElementById('podcast-pop');const x=pop&&pop.querySelector('.lq-close,#pd-close');if(x)x.click();else if(pop)pop.classList.add('hidden');});await p.waitForTimeout(300);
 }
 // tarjetas de Hoy
 for(const [mod,want] of [['TOCFL-A1',wantT],['HSK1',wantH]]){
   await p.evaluate(m=>{showView('hoy');setModule(m);},mod);await p.waitForTimeout(700);
   r=await last(()=>p.evaluate(()=>playAudio('zh')));ok(r.v===want&&r.l===L(want),tag+' · tarjeta de Hoy '+mod+' → '+r.v+' '+r.l+' (esperado '+want+')');
 }
 ok(!errs.length,tag+' · sin errores JS '+errs.join(' / '));
 // botón de Ajustes: solo en el contexto sin elección, recorrer el ciclo completo
 if(!saved){
   const seq=[];const lab=async()=>p.evaluate(()=>[document.getElementById('btn-voice-zh').textContent,localStorage.getItem('ac_voice_zh')]);
   seq.push(await lab());for(let i=0;i<7;i++){await p.evaluate(()=>document.getElementById('btn-voice-zh').click());await p.waitForTimeout(150);seq.push(await lab());}
   console.log('   ciclo del botón: '+seq.map(([t,v])=>t+' ['+(v||'sin guardar')+']').join(' → '));
   ok(seq[0][1]===null&&/auto/.test(seq[0][0]),'botón sin elección: «'+seq[0][0]+'»');
   ok(JSON.stringify(seq.slice(1,7).map(x=>x[1]))===JSON.stringify(['f','m','tw-f','tw-m','f2','m2']),'ciclo guarda f → m → tw-f → tw-m → f2 → m2');
   ok(seq[7][1]===null&&/auto/.test(seq[7][0]),'después de m2 vuelve a «auto» y borra la elección');
 }
 await ctx.close();}
await b.close();console.log('\ncomprobaciones '+n+' · FAILS '+fails);})();
