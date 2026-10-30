const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('practica-lecturas');require('fs').mkdirSync(OUT,{recursive:true});
const URL=APP_URL;
async function pixCr(p,el){const buf=await el.screenshot();return p.evaluate(async(b64)=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};const cnt=new Map();for(let i=0;i<d.length;i+=4){const k=d[i]+','+d[i+1]+','+d[i+2];cnt.set(k,(cnt.get(k)||0)+1);}const bg=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);const lb=L(...bg);let best=1;for(let i=0;i<d.length;i+=4){const l=L(d[i],d[i+1],d[i+2]);const cr=(Math.max(l,lb)+0.05)/(Math.min(l,lb)+0.05);if(cr>best)best=cr;}return Math.round(best*100)/100;},buf.toString('base64'));}
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const crs=[];
async function page(w,th,extra){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,extra])=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1','entrenar');Object.entries(extra||{}).forEach(([k,v])=>localStorage.setItem(k,v));}},[th,extra]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);return {ctx,p,errs};}
const st=(p)=>p.evaluate(()=>{const S=ExamDebug.state();return S?{idx:S.idx,n:S.items.length,type:S.items[S.idx].type,answered:S.answered,res:S.res.slice()}:null;});
const answer=async(p,mode)=>{const s=await st(p);const r=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].opts.findIndex(o=>o.ok);});const nOpt=await p.evaluate(()=>document.querySelectorAll('#ex-opts .lq-opt').length);
 const pick=mode==='right'?r:[...Array(nOpt).keys()].find(x=>x!==r);await p.click(`#ex-opts .lq-opt[data-i="${pick}"]`);await p.waitForTimeout(60);return s;};
const next=async(p)=>{await p.click('#ex-next');await p.waitForTimeout(60);};
const toType=async(p,type,mode)=>{for(let g=0;g<30;g++){const s=await st(p);if(!s)return false;if(s.type===type)return true;await answer(p,mode||'right');await next(p);}return false;};
const start=async(p,k)=>{await p.click('#btn-exam-practice');await p.waitForTimeout(300);await p.click(`.ex-lv[data-k="${k}"]`);await p.waitForTimeout(500);};

// ===== generadores (sin pantalla)
{const {ctx,p,errs}=await page(360,'light');
 const g=await p.evaluate(()=>{const out={};for(const k of ['HSK3','HSK5']){const o={min:99,bad:[],sig:{},reads:{},consec:true,dupEs:0,scriptBad:0};const want=k==='HSK3'?{nq:3,opts:3,zhq:false}:{nq:4,opts:4,zhq:true};
  for(let i=0;i<200;i++){const S=ExamDebug.build(k);o.min=Math.min(o.min,S.items.length);if(S.items.length!==20)o.bad.push('largo '+S.items.length);
   const t={};S.items.forEach(it=>t[it.type]=(t[it.type]||0)+1);o.sig[Object.keys(t).sort().join('+')]=(o.sig[Object.keys(t).sort().join('+')]||0)+1;
   const rt=S.items.filter(it=>it.type==='rtext');const nq=(S.rd.origen==='v2')?S.rd.preguntas.length:want.nq;if(rt.length!==nq)o.bad.push('rtext '+rt.length);
   const idxs=S.items.map((it,j)=>it.type==='rtext'?j:-1).filter(j=>j>=0);if(idxs.some((j,q)=>j!==20-nq+q))o.consec=false; // al final y contiguas, en orden
   const R=S.rd;o.reads[R.id]=(o.reads[R.id]||0)+1;
   if(rt.some(it=>it.rid!==R.id||it.rd!==R))o.bad.push('texto mezclado');
   rt.forEach((it,q)=>{const d=R.questions?R.questions[q]:R.preguntas[q],dok=R.questions?0:d.ok;if(it.qi!==q)o.bad.push('orden de preguntas');const nopt=(d.type==='vf')?2:want.opts;if(it.opts.length!==nopt||it.opts.filter(x=>x.ok).length!==1||new Set(it.opts.map(x=>x.es)).size!==nopt)o.bad.push('opts '+R.id+q);
    if(it.opts.find(x=>x.ok).es!==d.opts[dok])o.bad.push('correcta '+R.id+q);if(!!it.qzh!==want.zhq)o.bad.push('qzh '+R.id+q);if(want.zhq&&(it.qzh!==(S.trad?d.qZhT:d.qZh)||it.opts.some(x=>!x.zh)))o.bad.push('chino '+R.id+q);if(d.type==='vf'&&it.opts.map(x=>x.es).join()!=='Verdadero,Falso')o.bad.push('V/F fijo '+R.id+q);
    const wrong=it.opts.filter(x=>!x.ok);if(d.type!=='vf'&&wrong.some(x=>!x.whyNot))o.bad.push('whyNot '+R.id+q);if(!it.why)o.bad.push('why '+R.id+q);});
   const es=new Set();let dup=false;S.items.forEach(it=>{if(it.type==='listen'){if(es.has(it.es))dup=true;es.add(it.es);}});if(dup)o.dupEs++;
   if(S.items.some(it=>it.type==='order'||it.type==='dialogue'||it.type==='reading'))o.bad.push('tipo inesperado');
   if(S.items.filter(it=>it.type==='listen').length<7)o.bad.push('pocas de escuchar');}
  out[k]=o;}return out;});
 for(const k of ['HSK3','HSK5']){const o=g[k];ok(o.min===20&&o.bad.length===0,'generador '+k+': 20 ítems válidos, un texto con sus preguntas '+JSON.stringify([o.min,o.bad.slice(0,4)]));
  ok(o.consec&&o.dupEs===0,'generador '+k+': las preguntas del texto van juntas al final y en orden; sin escuchar repetidas '+JSON.stringify([o.consec,o.dupEs]));
  ok(Object.keys(o.sig).join()==='cloze+listen+rtext'&&Object.keys(o.reads).length===(k==='HSK5'?5:4),'generador '+k+': mezcla escuchar+completar+texto (sin ordenar) y salen los 4 textos '+JSON.stringify([o.sig,o.reads]));}
 // los niveles con banco no cambian y no llevan texto
 const same=await p.evaluate(()=>['TOCFL-Prep','TOCFL-A1','HSK1'].map(k=>{let bad=0;for(let i=0;i<50;i++){const S=ExamDebug.build(k);if(S.items.length!==20||S.items.some(it=>it.type==='rtext'))bad++;const t={};S.items.forEach(it=>t[it.type]=(t[it.type]||0)+1);if(['listen','dialogue','cloze','reading','order'].map(x=>t[x]||0).join('/')!=='5/3/6/3/3')bad++;}return bad;}));
 ok(same.every(x=>x===0),'Prep, A1 y HSK 1 siguen con la mezcla (fix/ordenar-banco: 5/3/6/3/3) y sin texto '+JSON.stringify(same));
 // rotación: sale primero el texto que hace más tiempo que no aparece
 const rot=await p.evaluate(()=>{const ids=READINGS.filter(r=>r.hsk===3).map(r=>r.id);const res={};
  const set=(h)=>localStorage.setItem('ac_exam_v1',JSON.stringify({HSK3:h.map((id,i)=>({t:i,s:1,n:20,sec:{},rd:[{id:id,s:1,n:3}]}))}));
  const pickN=()=>{const m={};for(let i=0;i<60;i++){const id=ExamDebug.build('HSK3').rd.id;m[id]=(m[id]||0)+1;}return Object.keys(m).sort();};
  localStorage.removeItem('ac_exam_v1');res.vacio=pickN().length;
  set([ids[0]]);res.uno=pickN();set([ids[0],ids[1]]);res.dos=pickN();set([ids[0],ids[1],ids[2]]);res.tres=pickN();set([ids[0],ids[1],ids[2],ids[3]]);res.cuatro=pickN();set([ids[1],ids[2],ids[3],ids[0]]);res.cinco=pickN();
  localStorage.removeItem('ac_exam_v1');return {ids,res};});
 const I=rot.ids;ok(rot.res.vacio===4&&JSON.stringify(rot.res.uno)===JSON.stringify([I[1],I[2],I[3]].sort())&&JSON.stringify(rot.res.dos)===JSON.stringify([I[2],I[3]].sort())&&JSON.stringify(rot.res.tres)===JSON.stringify([I[3]])&&JSON.stringify(rot.res.cuatro)===JSON.stringify([I[0]])&&JSON.stringify(rot.res.cinco)===JSON.stringify([I[1]]),'rotación de textos: nunca-vistos primero, luego el más antiguo '+JSON.stringify(rot.res));
 // sin lecturas cargadas para el nivel → vuelve al reparto genérico de 20
 const nor=await p.evaluate(()=>{const keep=window.READINGS;window.READINGS=[];const S=ExamDebug.build('HSK3');const t={};S.items.forEach(it=>t[it.type]=(t[it.type]||0)+1);window.READINGS=keep;return {n:S.items.length,t};});
 ok(nor.n===20&&!nor.t.rtext&&nor.t.listen&&nor.t.cloze,'sin lecturas el nivel vuelve al reparto genérico '+JSON.stringify(nor));
 ok(errs.length===0,'generadores sin errores '+errs);await ctx.close();}

for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const tag=w+'/'+th;let {ctx,p,errs}=await page(w,th);
 // ===== entrada: 5 niveles, los de lecturas lo dicen
 await p.click('#btn-exam-practice');await p.waitForTimeout(300);
 const e=await p.evaluate(()=>({lv:[...document.querySelectorAll('.ex-lv')].map(x=>x.dataset.k+'|'+x.querySelector('.d').textContent),notes:[...document.querySelectorAll('.ex-note')].map(x=>x.textContent),ovf:document.getElementById('ex-body').scrollWidth>document.getElementById('ex-body').clientWidth+1}));
 ok(e.lv.map(x=>x.split('|')[0]).join()==='TOCFL-Prep,TOCFL-A1,HSK1,HSK3,HSK4,HSK5,TOCFL-B3'&&/lecturas/.test(e.lv[3])&&/lecturas/.test(e.lv[4])&&/lecturas/.test(e.lv[5])&&/lecturas/.test(e.lv[6])&&!/lecturas/.test(e.lv[2]),tag+' entrada: 7 niveles (R11: +TOCFL B1; HSK 4) y los de HSK 3, HSK 4, HSK 5 y B1 anuncian «lecturas» '+JSON.stringify(e.lv));
 ok(e.notes.some(x=>/texto con varias preguntas/.test(x)&&/no trae «Ordenar»/.test(x))&&!e.ovf,tag+' la entrada aclara que esos niveles traen un texto y no «Ordenar»');
 await p.screenshot({path:OUT+`entrada-${w}-${th}.png`});
 await p.click('#ex-close');await p.waitForTimeout(200);
 if(th==='dark'&&w===320){ok(errs.length===0,tag+' sin errores '+errs);await ctx.close();continue;}

 // ===== HSK 3: texto plano al responder → tocable después
 await start(p,'HSK3');
 ok(await toType(p,'rtext','right'),tag+' llega al primer ítem de texto tras escuchar y completar');
 const R3=await p.evaluate(()=>ExamDebug.state().rd);
 let q=await p.evaluate(()=>({sec:document.querySelector('.ex-sec').textContent,num:document.getElementById('ex-num').textContent,open:document.querySelector('.rd-text').open,lines:document.querySelectorAll('#ex-rtext p').length,tap:document.querySelectorAll('#ex-rtext .lq-ch, #ex-rtext .lq-line-say, #ex-rtext .lq-line-py').length,lang:document.getElementById('ex-rtext').getAttribute('lang'),
  zhq:!!document.querySelector('.rd-q-zh'),esBtn:!!document.getElementById('ex-rd-es'),opts:document.querySelectorAll('#ex-opts .lq-opt').length,qes:document.getElementById('rd-q-es').textContent,txt:document.getElementById('ex-rtext').innerText.replace(/\s+/g,''),ovf:document.getElementById('ex-body').scrollWidth>document.getElementById('ex-body').clientWidth+1}));
 ok(/^📖 TEXTO · 1 DE 3$/i.test(q.sec.replace(/\s+/g,' ').trim())||/Texto · 1 de 3/.test(q.sec),tag+' encabezado «Texto · 1 de 3»: '+q.sec);
 ok(q.open&&q.lines===R3.lines.length&&q.tap===0&&q.lang==='zh',tag+' el texto va PLANO mientras se responde (sin caracteres tocables, sin 🔊, sin pinyin) '+JSON.stringify([q.lines,q.tap]));
 ok(!q.zhq&&!q.esBtn&&q.opts===3&&q.qes===R3.questions[0].es&&!q.ovf,tag+' HSK 3: pregunta y 3 opciones en español, sin botón «ver en español»');
 ok(q.txt===(await p.evaluate(()=>{const S=ExamDebug.state();return S.rd.lines.map(l=>S.trad?l.zhT:l.zh).join('').replace(/\s+/g,'');})),tag+' el texto mostrado es el del dato, en la escritura de la familia');
 crs.push([tag+' texto plano',await pixCr(p,await p.$('#ex-rtext p'))],[tag+' pregunta',await pixCr(p,await p.$('.rd-q-es'))],[tag+' opción',await pixCr(p,await p.$('.rd-opt'))]);
 await p.screenshot({path:OUT+`rtext3-${w}-${th}.png`});
 // responder mal
 const wrongIdx=await p.evaluate(()=>{const S=ExamDebug.state();const it=S.items[S.idx];return {i:it.opts.findIndex(o=>!o.ok),why:it.opts.find(o=>!o.ok).whyNot,right:it.why};});
 await p.click(`#ex-opts .lq-opt[data-i="${wrongIdx.i}"]`);await p.waitForTimeout(200);
 const a=await p.evaluate(()=>({fb:document.getElementById('ex-fb').innerText,lines:document.querySelectorAll('#ex-rtext .lq-line').length,ch:document.querySelectorAll('#ex-rtext .lq-ch').length,says:document.querySelectorAll('#ex-rtext .lq-line-say').length,py:[...document.querySelectorAll('#ex-rtext .lq-line-py')].map(e=>!e.classList.contains('hidden')&&e.textContent.trim().length>3),es:[...document.querySelectorAll('#ex-rtext .lq-line-es')].map(e=>!e.classList.contains('hidden')&&e.textContent.trim().length>3),plain:document.getElementById('ex-rtext').classList.contains('rd-plain'),lang:document.getElementById('ex-rtext').getAttribute('lang'),
  esAll:[...document.querySelectorAll('.rd-opt-es')].every(e=>!e.classList.contains('hidden')),seg:[...document.querySelectorAll('#ex-seg .lq-seg')].filter(x=>x.className.includes('bad')).length,rt:ExamDebug.state().res.slice(-3)}));
 ok(a.fb.includes('Casi')&&a.fb.includes('Tu respuesta')&&a.fb.includes(wrongIdx.why)&&a.fb.includes(wrongIdx.right),tag+' error: se explica el distractor elegido y la correcta');
 ok(a.lines===R3.lines.length&&a.ch>80&&a.says===R3.lines.length&&a.py.every(Boolean)&&a.es.every(Boolean)&&!a.plain,tag+' al responder el texto pasa a tocable, con 🔊, pinyin y traducción por línea '+JSON.stringify([a.lines,a.ch,a.says]));
 crs.push([tag+' texto tocable',await pixCr(p,await p.$('#ex-rtext .lq-line-zh'))],[tag+' pinyin',await pixCr(p,await p.$('#ex-rtext .lq-line-py'))],[tag+' traducción',await pixCr(p,await p.$('#ex-rtext .lq-line-es'))],[tag+' explicación',await pixCr(p,await p.$('#ex-fb .ex-fb'))]);
 await p.screenshot({path:OUT+`rtext3-fb-${w}-${th}.png`});
 // ficha de palabra; Escape cierra solo la ficha
 await p.click('#ex-rtext .lq-ch');await p.waitForTimeout(400);
 ok(await p.evaluate(()=>!document.getElementById('vocab-pop').classList.contains('hidden')),tag+' tocar un carácter abre la ficha de palabra');
 await p.keyboard.press('Escape');await p.waitForTimeout(300);
 const esc=await p.evaluate(()=>({vp:!document.getElementById('vocab-pop').classList.contains('hidden'),pop:!document.getElementById('exam-pop').classList.contains('hidden'),stack:Nav.stack}));
 ok(!esc.vp&&esc.pop&&esc.stack.join()==='exam-pop',tag+' Escape con la ficha abierta cierra solo la ficha y la práctica sigue '+JSON.stringify(esc));
 // 🔊 de una línea no rompe (sin red → respaldo)
 await p.click('#ex-rtext .lq-line-say');await p.waitForTimeout(500);
 await next(p);
 // 2.ª pregunta: el texto vuelve a plano
 const q2=await p.evaluate(()=>({sec:document.querySelector('.ex-sec').textContent,plain:document.getElementById('ex-rtext').classList.contains('rd-plain'),tap:document.querySelectorAll('#ex-rtext .lq-ch').length}));
 ok(/2 de 3/.test(q2.sec)&&q2.plain&&q2.tap===0,tag+' en la 2.ª pregunta el texto vuelve a plano');
 // plegar el texto se recuerda en la siguiente
 await p.click('.rd-text summary');await p.waitForTimeout(100);await answer(p,'right');await next(p);
 ok(await p.evaluate(()=>!document.querySelector('.rd-text').open),tag+' si plegás el texto, queda plegado en la pregunta siguiente');
 await p.click('.rd-text summary');
 await answer(p,'right');await p.waitForTimeout(100);await next(p);await p.waitForTimeout(200);
 // resultado
 const r=await p.evaluate(()=>({score:document.querySelector('.ex-score').textContent,bars:[...document.querySelectorAll('.ex-bar')].map(x=>x.innerText.replace(/\s+/g,' ')),hist:JSON.parse(localStorage.getItem('ac_exam_v1')||'{}')}));
 const h=(r.hist.HSK3||[]).slice(-1)[0];
 ok(h&&h.n===20&&h.rd&&h.rd.length===1&&h.rd[0].id===R3.id&&h.rd[0].n===3&&h.rd[0].s===2,tag+' el historial guarda rd: [{id, s, n}] = '+JSON.stringify(h&&h.rd));
 ok(r.bars.length===2&&/Escuchar/.test(r.bars[0])&&/Leer/.test(r.bars[1])&&!r.bars.some(x=>/Ordenar/.test(x)),tag+' resultado en 2 partes (Escuchar y Leer; sin Ordenar): '+r.bars.join(' | '));
 const secLeer=h.sec.c;const nCloze=await p.evaluate(()=>0);
 ok(h.sec.l[1]+h.sec.c[1]===20&&h.sec.o[1]===0&&h.sec.c[1]>=3+7&&h.sec.c[0]>=2,tag+' la parte «Leer» suma completar + texto '+JSON.stringify(h.sec));
 crs.push([tag+' resultado',await pixCr(p,await p.$('.ex-score'))]);
 // repasar errores: vuelve el texto con la pregunta fallada
 const hasRetry=await p.$('#ex-retry');ok(!!hasRetry,tag+' hay «Repasar» (falló una del texto)');
 await p.click('#ex-retry');await p.waitForTimeout(400);
 const rt=await p.evaluate(()=>{const S=ExamDebug.state();return {retry:S.retry,types:S.items.map(i=>i.type)};});
 ok(rt.retry&&rt.types.includes('rtext'),tag+' el repaso incluye la pregunta de texto fallada '+JSON.stringify(rt.types));
 await toType(p,'rtext','right');
 ok(await p.evaluate(()=>!!document.getElementById('ex-rtext')&&document.querySelectorAll('#ex-opts .lq-opt').length===3),tag+' en el repaso se ve el texto con las 3 opciones');
 // el repaso no suma al historial
 await p.click('#ex-close');await p.waitForTimeout(200);
 ok(await p.evaluate(()=>JSON.parse(localStorage.getItem('ac_exam_v1')).HSK3.length)===1,tag+' el repaso no suma al historial');
 ok(errs.length===0,tag+' HSK 3 sin errores JS '+errs);

 // ===== HSK 5: pregunta en chino + «ver en español»
 await p.evaluate(()=>{const i=LECTURAS.findIndex(r=>r.id==='rx-h5-ruido');if(i>=0)LECTURAS.splice(i,1);});await start(p,'HSK5');ok(await toType(p,'rtext','right'),tag+' HSK 5: llega al texto');
 const R5=await p.evaluate(()=>ExamDebug.state().rd);
 const h5=await p.evaluate(()=>({sec:document.querySelector('.ex-sec').textContent,zhq:document.querySelector('.rd-q-zh').innerText,esHid:document.getElementById('rd-q-es').classList.contains('hidden'),opts:[...document.querySelectorAll('#ex-opts .lq-opt')].map(o=>o.querySelector('.rd-opt-zh').innerText),optEsHid:[...document.querySelectorAll('.rd-opt-es')].every(e=>e.classList.contains('hidden')),btn:document.getElementById('ex-rd-es').textContent,ovf:document.getElementById('ex-body').scrollWidth>document.getElementById('ex-body').clientWidth+1}));
 ok(/1 de 4/.test(h5.sec)&&h5.zhq===R5.questions[0].qZh&&h5.opts.length===4&&h5.esHid&&h5.optEsHid&&h5.btn==='🇪🇸 Ver en español'&&!h5.ovf,tag+' HSK 5: pregunta y 4 opciones en chino, español oculto '+JSON.stringify([h5.sec.trim(),h5.zhq]));
 crs.push([tag+' pregunta zh',await pixCr(p,await p.$('.rd-q-zh'))],[tag+' opción zh',await pixCr(p,await p.$('.rd-opt-zh'))]);
 await p.click('#ex-rd-es');await p.waitForTimeout(100);
 const es5=await p.evaluate(()=>({q:document.getElementById('rd-q-es').innerText,vis:!document.getElementById('rd-q-es').classList.contains('hidden'),oes:[...document.querySelectorAll('.rd-opt-es')].every(e=>!e.classList.contains('hidden')&&e.innerText.length>5),btn:document.getElementById('ex-rd-es').textContent}));
 ok(es5.q===R5.questions[0].es&&es5.vis&&es5.oes&&es5.btn==='🇨🇳 Ocultar el español',tag+' «Ver en español» muestra la pregunta y cada opción');
 crs.push([tag+' pregunta es',await pixCr(p,await p.$('#rd-q-es'))],[tag+' opción es',await pixCr(p,await p.$('.rd-opt-es'))]);
 await p.screenshot({path:OUT+`rtext5-es-${w}-${th}.png`});
 await p.click('#ex-rd-es');ok(await p.evaluate(()=>document.getElementById('rd-q-es').classList.contains('hidden')),tag+' se vuelve a ocultar');
 await answer(p,'right');await p.waitForTimeout(100);
 ok(await p.evaluate(()=>!document.getElementById('rd-q-es').classList.contains('hidden')&&document.getElementById('ex-rd-es').classList.contains('hidden')&&document.querySelectorAll('#ex-rtext .lq-ch').length>100),tag+' HSK 5 tras responder: todo en español y el texto tocable');
 await p.screenshot({path:OUT+`rtext5-fb-${w}-${th}.png`});
 // Atrás en medio del texto cierra y no guarda
 await p.goBack().catch(()=>{});await p.waitForTimeout(400);
 const bk=await p.evaluate(()=>({open:!document.getElementById('exam-pop').classList.contains('hidden'),stack:Nav.stack,lock:document.body.style.overflow,ref:window.acScriptRef,hist:(JSON.parse(localStorage.getItem('ac_exam_v1')||'{}').HSK5||[]).length}));
 ok(!bk.open&&bk.stack.length===0&&bk.lock===''&&!bk.ref&&bk.hist===0,tag+' Atrás en medio del texto cierra y no guarda '+JSON.stringify(bk));
 ok(errs.length===0,tag+' HSK 5 sin errores JS '+errs);await ctx.close();

 // ===== escritura tradicional (familia HSK en 繁)
 if(th==='light'){({ctx,p,errs}=await page(w,th,{ac_script_hsk:'trad'}));await p.evaluate(()=>{const i=LECTURAS.findIndex(r=>r.id==='rx-h5-ruido');if(i>=0)LECTURAS.splice(i,1);});await start(p,'HSK5');await toType(p,'rtext','right');
  const t=await p.evaluate(()=>{const S=ExamDebug.state();const it=S.items[S.idx];const d=S.rd.questions[it.qi];return {q:document.querySelector('.rd-q-zh').innerText,eq:d.qZhT,l1:document.querySelector('#ex-rtext p').innerText,el:S.rd.lines[0].zhT,opts:[...document.querySelectorAll('.rd-opt-zh')].map(x=>x.innerText).sort(),eo:d.optsZhT.slice().sort()};});
  ok(t.q===t.eq&&t.l1===t.el&&JSON.stringify(t.opts)===JSON.stringify(t.eo),tag+' con 繁: texto, pregunta y opciones en tradicional '+t.q);
  await answer(p,'right');const w2=await p.evaluate(()=>({fb:document.getElementById('ex-fb').innerText,want:(()=>{const S=ExamDebug.state();const d=S.rd.questions[S.items[S.idx].qi];return d.whyT||d.why;})(),l1:document.querySelector('#ex-rtext .lq-line-zh').innerText,el:ExamDebug.state().rd.lines[0].zhT}));
  ok(w2.fb.includes(w2.want)&&w2.l1===w2.el,tag+' con 繁: la explicación y el texto tocable salen en tradicional');
  ok(errs.length===0,tag+' trad sin errores '+errs);await ctx.close();}
}
// ===== contraste real
const bad=crs.filter(([,c])=>c<4.5);bad.forEach(([m,c])=>ok(false,'contraste '+m+' = '+c));ok(bad.length===0,'contraste de '+crs.length+' elementos de texto ≥ 4,5:1 (mín '+Math.min(...crs.map(x=>x[1]))+')');
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
