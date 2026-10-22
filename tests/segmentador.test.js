const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const URL=APP_URL;
const MODES={
  'Android simulado (Segmenter corta por carácter)':()=>{const R=Intl.Segmenter;class S{constructor(l,o){this.o=o||{}}segment(t){const a=[];let i=0;for(const c of String(t)){a.push({segment:c,index:i,input:t,isWordLike:/[\p{L}\p{N}]/u.test(c)});i+=c.length;}return a;}resolvedOptions(){return {locale:'zh',granularity:'word'}}}Intl.Segmenter=S;},
  'Sin Intl.Segmenter':()=>{delete Intl.Segmenter;},
  'Escritorio real':null,
};
const WANT=['跳舞','公園','早上','唱歌','明天'];
const toS={'公園':'公园'};
(async()=>{
 const b=await chromium.launch({...LAUNCH});
 let fails=0; const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m); if(!c)fails++;};
 for(const [name,stub] of Object.entries(MODES)){
  for(const script of ['trad','simp']){
   console.log('\n== '+name+' · '+script);
   const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});
   if(stub) await ctx.addInitScript(stub);
   await ctx.addInitScript((sc)=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_lesson_level','tocfl:Prep');if(sc==='simp')localStorage.setItem('ac_script_tocfl','simp');},script);
   const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
   await p.goto(URL); await p.waitForTimeout(1300);
   await p.evaluate(()=>showView('aprender'));
   await p.click('.lq-btn[data-act="read"][data-id="tocfl-prep-gongyuan"]'); await p.waitForTimeout(300);
   const gl=await p.evaluate((sc)=>{const l=GRADED_LESSONS.find(x=>x.id==='tocfl-prep-gongyuan');return extractKeyWords(l.lines.map(x=>sc==='trad'?x.zhT:x.zh),5,l.hsk).map(k=>k.zh);},script); // corte automático (la lección ya trae keywords)
   const want=WANT.map(w=>script==='simp'?(toS[w]||w):w);
   ok(want.every(w=>gl.includes(w)),'glosario: '+gl.join(' ')+'  (esperado '+want.join(' ')+')');
   await p.click('#lq-gloss-continue'); await p.waitForTimeout(200);
   // karaoke: un .lq-ch por hanzi
   const kc=await p.evaluate(()=>{let n=0,h=0;document.querySelectorAll('.lq-line').forEach(l=>{n+=l.querySelectorAll('.lq-ch').length;const s=l.querySelector('.lq-line-say');h+=(s.dataset.zh.match(/[㐀-鿿豈-﫿]/g)||[]).length;});return [n,h];});
   ok(kc[0]===kc[1],'karaoke: '+kc[0]+' spans .lq-ch = '+kc[1]+' hanzi');
   // toques en 公 y en 園 de 公園
   const yuan=script==='simp'?'园':'園', gong='公';
   for(const ch of [gong,yuan]){
     const found=await p.evaluate(({ch,yuan})=>{for(const l of document.querySelectorAll('.lq-line')){const cs=[...l.querySelectorAll('.lq-ch')];for(let i=0;i<cs.length;i++){const w=cs[i].dataset.ch+(cs[i+1]?cs[i+1].dataset.ch:'');const w0=(cs[i-1]?cs[i-1].dataset.ch:'')+cs[i].dataset.ch;if((ch==='公'&&w==='公'+yuan)||(ch===yuan&&w0==='公'+yuan)){cs[i].setAttribute('data-t','1');return true;}}}return false;},{ch,yuan});
     if(!found){ok(false,'no encontré '+ch);continue;}
     await p.click('.lq-ch[data-t="1"]'); await p.waitForTimeout(350);
     const pop=await p.evaluate(()=>{const v=document.getElementById('vocab-pop');return v&&!v.classList.contains('hidden')?v.innerText.replace(/\n/g,' | ').slice(0,120):'';});
     ok(pop.includes('公'+yuan)&&/parque/i.test(pop),'toque en '+ch+' de 公'+yuan+' → '+pop);
     await p.evaluate(()=>{document.querySelector('.lq-ch[data-t="1"]').removeAttribute('data-t');const v=document.getElementById('vocab-pop');if(v)v.classList.add('hidden');});
   }
   // carácter que no forma palabra: 很 en 很熱鬧? tocá un hanzi suelto cualquiera que el corte deje solo
   const single=await p.evaluate(()=>{for(const l of document.querySelectorAll('.lq-line')){for(const c of l.querySelectorAll('.lq-ch')){if(c.dataset.ch==='的'){c.setAttribute('data-t','1');return true;}}}return false;});
   if(single){await p.click('.lq-ch[data-t="1"]');await p.waitForTimeout(300);const pop=await p.evaluate(()=>document.getElementById('vocab-pop').innerText.split('\n')[0]);ok(/的/.test(pop)&&!/的\S/.test(pop.split(' ')[0]),'toque en 的 (sin palabra) → '+pop.slice(0,40));}
   // Lector
   const rw=await p.evaluate((sc)=>{const t=sc==='simp'?'早上的公园有很多人跳舞。':'早上的公園有很多人跳舞。';const d=document.createElement('div');d.innerHTML=renderZhLineHtml(t,true,true);return [...d.querySelectorAll('.reader-word')].map(x=>x.dataset.word);},script);
   ok(rw.includes(script==='simp'?'公园':'公園')&&rw.includes('跳舞'),'Lector: '+rw.join('|'));
   if(script==='trad'){
     const tm=await p.evaluate(()=>{const base='早上的公園有很多人。老太太們在跳舞，老先生們在唱歌。我們明天一起去公園運動吧！';let t='';while(t.length<1200)t+=base;t=t.slice(0,1200);const a=performance.now();const r=zhSegmentByDict(t);const m=performance.now()-a;const a2=performance.now();zhWordsList(t);const m2=performance.now()-a2;return {build:zhDictIndex.buildMs,size:zhDictIndex().size,seg:m,words:zhWordsList(t).length,whole:m2,works:zhSegmenterWorks()};});
     console.log('tiempos: índice '+tm.build.toFixed(1)+' ms ('+tm.size+' palabras) · corte por diccionario de 1200 car. '+tm.seg.toFixed(1)+' ms · zhWordsList 1200 car. '+tm.whole.toFixed(1)+' ms · Segmenter sirve: '+tm.works);
   }
   ok(errs.length===0,'sin errores JS'+(errs.length?': '+errs.join(' / '):''));
   await ctx.close();
  }
 }
 await b.close(); console.log('\nFAILS: '+fails);
})();
