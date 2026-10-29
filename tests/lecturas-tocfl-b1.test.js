const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('lecturas-tocfl-b1');require('fs').mkdirSync(OUT,{recursive:true});
const URL=APP_URL;
async function pixCr(p,el){const buf=await el.screenshot();return p.evaluate(async(b64)=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};const cnt=new Map();for(let i=0;i<d.length;i+=4){const k=d[i]+','+d[i+1]+','+d[i+2];cnt.set(k,(cnt.get(k)||0)+1);}const bg=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);const lb=L(...bg);let best=1;for(let i=0;i<d.length;i+=4){const l=L(d[i],d[i+1],d[i+2]);const cr=(Math.max(l,lb)+0.05)/(Math.min(l,lb)+0.05);if(cr>best)best=cr;}return Math.round(best*100)/100;},buf.toString('base64'));}
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const crs=[];
async function page(w,th,view,extra){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,view,extra])=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1',view);Object.entries(extra||{}).forEach(([k,v])=>localStorage.setItem(k,v));}},[th,view,extra]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1400);return {ctx,p,errs};}
const goExam=async(p)=>{await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);};

// ===== datos
{const {ctx,p,errs}=await page(360,'light','aprender');
 const D=await p.evaluate(()=>{const R=READINGS.filter(r=>r.exam==='TOCFL');return {n:R.length,ids:R.map(r=>r.id),ok:R.every(r=>r.kind==='reading'&&r.hsk===4&&r.examLvl==='B1'&&r.questions.length===3&&r.questions.every(q=>q.opts.length===4&&!q.qZh&&q.whyNot.length===3)&&r.titleZhT!==r.titleZh||r.titleZhT===r.titleZh),
  trad:R.every(r=>r.lines.every(l=>l.zhT&&l.zh)&&r.lines.some(l=>l.zh!==l.zhT)),noDup:new Set(READINGS.map(r=>r.id)).size===READINGS.length,
  shape:R.map(r=>[r.questions.length,r.questions.map(q=>q.opts.length).join(''),r.keywords.length,r.lines.length]),types:[...new Set(R.flatMap(r=>r.questions.map(q=>q.type)))].sort().join()};});
 ok(D.n===4&&D.noDup&&D.trad,'datos: 4 lecturas TOCFL B1, ids únicos y cada línea en los dos guiones '+JSON.stringify(D.ids));
 ok(D.shape.every(s=>s[0]===3&&s[1]==='444'&&s[2]>=5&&s[2]<=6),'datos: 3 preguntas con 4 opciones y 5–6 palabras clave por texto '+JSON.stringify(D.shape));
 ok(D.types.includes('detalle')&&D.types.includes('idea'),'datos: tipos de pregunta '+D.types);
 // voz y pinyin de la familia TOCFL
 const F=await p.evaluate(()=>{const r=READINGS.find(x=>x.id==='rd-b1-zuofan');return {fam:familyOf(r),script:scriptFor(r),voice:voiceZhFor(r)};});
 ok(F.fam==='tocfl'&&F.script==='trad'&&F.voice==='tw-f','familia TOCFL: escritura tradicional y voz taiwanesa '+JSON.stringify(F));
 ok(errs.length===0,'datos sin errores '+errs);await ctx.close();}

for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const tag=w+'/'+th;let {ctx,p,errs}=await page(w,th,'aprender');await goExam(p);
 // ===== lista: sección TOCFL B1 (tercera), título tradicional por defecto
 const L=await p.evaluate(()=>{const lv=[...document.querySelectorAll('#reading-list .rd-level')];const t=lv[3];return {n:lv.length,name:t.querySelector('.rd-level-name').textContent,sub:t.querySelector('.rd-level-sub').textContent,cards:[...t.querySelectorAll('.rd-card')].map(c=>({tag:c.querySelector('.rd-approx-label').textContent,zh:c.querySelector('.lc-zh').textContent,es:c.querySelector('.lc-es').textContent,meta:c.querySelector('.lc-meta').textContent,btns:[...c.querySelectorAll('.lq-btn')].map(x=>x.textContent.trim()).join('|')})),ovf:document.querySelector('.rd-section').scrollWidth>document.querySelector('.rd-section').clientWidth+1,lv:t.dataset.lv.replace(/^ex-/,'')};});
 ok(L.n===4&&L.name==='TOCFL B1'&&/nivel aproximado · 0\/4 hechas/.test(L.sub)&&L.lv==='TOCFL-B1'&&L.cards.length===4,tag+' lista: cuarta sección «TOCFL B1» con 4 textos '+JSON.stringify([L.name,L.sub,L.cards.length]));
 ok(L.cards.every(c=>c.tag==='Nivel aproximado: TOCFL B1 · no oficial'&&c.btns==='🎯 Practicar|📖 Leer'&&/字 · 3 preguntas/.test(c.meta))&&L.cards[0].zh==='給房東的一封信'&&!L.ovf,tag+' tarjetas: etiqueta «Nivel aproximado: TOCFL B1 · no oficial», título en tradicional, botones '+L.cards[0].zh);
 crs.push([tag+' nivel B1',await pixCr(p,await p.$('.rd-level[data-lv="ex-TOCFL-B1"] summary'))],[tag+' tarjeta zh',await pixCr(p,await p.$('.rd-level[data-lv="ex-TOCFL-B1"] .lc-zh'))],[tag+' tarjeta tag',await pixCr(p,await p.$('.rd-level[data-lv="ex-TOCFL-B1"] .rd-approx-label'))]);
 await (await p.$('.rd-level[data-lv="ex-TOCFL-B1"]')).screenshot({path:OUT+`lista-b1-${w}-${th}.png`});
 if(th!=='light'){ok(errs.length===0,tag+' sin errores '+errs);await ctx.close();continue;}

 // ===== Leer: glosario (con pinyin TOCFL) → texto tradicional tocable
 await p.click('.rd-level[data-lv="ex-TOCFL-B1"] .rd-card .lc-read');await p.waitForTimeout(900);
 const R0=await p.evaluate(()=>READINGS.find(r=>r.id==='rd-b1-fangdong'));
 const g=await p.evaluate(()=>({gloss:[...document.querySelectorAll('.lq-gloss-item')].map(e=>[e.querySelector('.lq-gloss-zh').textContent,e.querySelector('.lq-gloss-py').textContent,e.querySelector('.lq-gloss-es').textContent]),ref:window.acScriptRef&&window.acScriptRef.id,view:LQ_DEBUG.state.view,last:localStorage.getItem('ac_last_lesson_id')}));
 ok(g.ref==='rd-b1-fangdong'&&g.gloss.length===6&&g.gloss.every(x=>x[1].trim().length>2&&/[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(x[1])&&x[2].length>3)&&g.gloss.map(x=>x[0]).join()===R0.keywords.map(k=>k.zhT).join(),tag+' glosario: 6 palabras en tradicional con pinyin y glosa '+JSON.stringify(g.gloss.map(x=>x[0]+' '+x[1])));
 ok(g.last===null,tag+' leer una lectura TOCFL no pisa ac_last_lesson_id');
 await p.click('#lq-gloss-continue');await p.waitForTimeout(400);
 const s=await p.evaluate(()=>({head:document.querySelector('.lq-story-es').textContent,lbl:document.querySelector('#lq-body .rd-approx-label').textContent,title:document.querySelector('.lq-story-zh').textContent,l1:document.querySelector('#lq-body .lq-line-zh').textContent,lines:document.querySelectorAll('#lq-body .lq-line').length,prac:document.getElementById('lq-story-practice').textContent}));
 ok(/Nivel aproximado: TOCFL B1 · no oficial/.test(s.lbl)&&s.title==='給房東的一封信'&&s.l1===R0.lines[0].zhT&&s.lines===9&&s.prac==='🎯 Practicar',tag+' texto: etiqueta TOCFL B1, tradicional, 9 líneas '+JSON.stringify([s.head,s.title,s.prac]));
 await p.click('#lq-story-pinyin');await p.waitForTimeout(900);
 const py=await p.evaluate(()=>[...document.querySelectorAll('.lq-line-py')].map(e=>({v:!e.classList.contains('hidden'),t:e.textContent})));
 ok(py.length===9&&py.every(x=>x.v&&x.t.trim().length>3)&&!py.some(x=>/shuì jué/.test(x.t)),tag+' pinyin de TOCFL generado en las 9 líneas: «'+py[2].t.slice(0,60)+'…»');
 await p.click('#lq-body .lq-ch');await p.waitForTimeout(400);ok(await p.evaluate(()=>!document.getElementById('vocab-pop').classList.contains('hidden')),tag+' tocar un carácter abre la ficha');await p.click('#btn-vocab-pop-close');await p.waitForTimeout(250);
 crs.push([tag+' línea zh',await pixCr(p,await p.$('#lq-body .lq-line-zh'))],[tag+' línea py',await pixCr(p,await p.$('#lq-body .lq-line-py'))]);
 await p.screenshot({path:OUT+`story-b1-${w}-${th}.png`});

 // ===== Responder: preguntas en español con 4 opciones
 await p.click('#lq-story-practice');await p.waitForTimeout(300);
 const q=await p.evaluate(()=>({num:document.getElementById('lq-progress-num').textContent,opts:document.querySelectorAll('#lq-opts .lq-opt').length,zhq:!!document.querySelector('.rd-q-zh'),esBtn:!!document.getElementById('rd-es'),qes:document.querySelector('.rd-q-es').textContent,approx:document.querySelector('.rd-approx').textContent,txt:document.querySelector('.rd-lines .lq-line-zh').textContent,open:document.querySelector('.rd-text').open,ltr:['A','B','C','D'].join('')===[...document.querySelectorAll('#lq-opts .lq-opt-letter')].map(e=>e.textContent).join('')}));
 ok(q.num==='1/3'&&q.opts===4&&q.ltr&&!q.zhq&&!q.esBtn&&q.qes===R0.questions[0].es&&/TOCFL B1/.test(q.approx)&&/no oficial/.test(q.approx)&&q.txt===R0.lines[0].zhT&&q.open,tag+' pregunta en español, 4 opciones A–D, sin «ver en español», texto a la vista en tradicional');
 crs.push([tag+' pregunta',await pixCr(p,await p.$('.rd-q-es'))],[tag+' opción',await pixCr(p,await p.$('.rd-opt'))]);
 await p.screenshot({path:OUT+`quiz-b1-${w}-${th}.png`});
 // primera mal: explica el distractor; las otras bien
 const wr=await p.evaluate(()=>{const rp=LQ_DEBUG.rightPos;const pos=[0,1,2,3].find(x=>x!==rp);return {pos,txt:document.querySelectorAll('#lq-opts .lq-opt')[pos].querySelector('.rd-opt-es').textContent};});
 await p.click(`#lq-opts .lq-opt[data-pos="${wr.pos}"]`);await p.waitForTimeout(150);
 const di=R0.questions[0].opts.indexOf(wr.txt);
 const fb=await p.evaluate(()=>document.getElementById('lq-feedback').innerText);
 ok(fb.includes('No es esa')&&fb.includes(R0.questions[0].whyNot[di-1])&&fb.includes('La correcta'),tag+' error: explica el distractor elegido (opción '+di+') y la correcta');
 await p.click('#lq-next');for(let i=0;i<2;i++){await p.waitForTimeout(80);const r=await p.evaluate(()=>LQ_DEBUG.rightPos);await p.click(`#lq-opts .lq-opt[data-pos="${r}"]`);await p.click('#lq-next');}await p.waitForTimeout(200);
 const res=await p.evaluate(()=>({sc:document.querySelector('.lq-final-score').textContent,rec:JSON.parse(localStorage.getItem('ac_reading_v1')||'{}')['rd-b1-fangdong'],btns:[...document.querySelectorAll('.lq-final-actions .lq-btn')].map(x=>x.textContent.trim())}));
 ok(res.sc==='2/3'&&res.rec&&res.rec.best===2&&res.rec.of===3&&res.rec.done&&JSON.stringify(res.rec.qs)==='[false,true,true]',tag+' resultado 2/3 y progreso guardado '+JSON.stringify(res.rec));
 await p.click('#rd-final-next');await p.waitForTimeout(500);
 const nx=await p.evaluate(()=>window.acScriptRef&&window.acScriptRef.id);ok(/^rd-b1-/.test(nx)&&nx!=='rd-b1-fangdong',tag+' «Otro texto» abre otra lectura de TOCFL B1: '+nx);
 await p.goBack().catch(()=>{});await p.waitForTimeout(400);
 const bk=await p.evaluate(()=>({best:document.querySelector('.rd-level[data-lv="ex-TOCFL-B1"] .rd-card .lc-best').textContent.trim(),sub:document.querySelector('.rd-level[data-lv="ex-TOCFL-B1"] .rd-level-sub').textContent,other:document.querySelector('.rd-level[data-lv="ex-HSK3"] .rd-level-sub').textContent}));
 ok(bk.best==='🎯 2/3 ✓'&&/1\/4 hechas/.test(bk.sub)&&/0\/4 hechas/.test(bk.other),tag+' Atrás: la lista muestra 2/3 ✓ y 1/4 hechas solo en B1 '+JSON.stringify(bk));
 ok(errs.length===0,tag+' B1 sin errores '+errs);await ctx.close();

 // ===== con 简体 elegido para TOCFL
 ({ctx,p,errs}=await page(w,th,'aprender',{ac_script_tocfl:'simp'}));await goExam(p);
 const sm=await p.evaluate(()=>({zh:document.querySelector('.rd-level[data-lv="ex-TOCFL-B1"] .lc-zh').textContent}));
 await p.click('.rd-level[data-lv="ex-TOCFL-B1"] .rd-card .lc-practice');await p.waitForTimeout(300);
 const sq=await p.evaluate(()=>({l1:document.querySelector('.rd-lines .lq-line-zh').textContent,exp:READINGS.find(r=>r.id==='rd-b1-fangdong').lines[0].zh,exT:READINGS.find(r=>r.id==='rd-b1-fangdong').lines[0].zhT}));
 ok(sm.zh==='给房东的一封信'&&sq.l1===sq.exp&&sq.l1!==sq.exT,tag+' con 简体: lista y texto en simplificado '+sm.zh);
 ok(errs.length===0,tag+' simp sin errores '+errs);await ctx.close();

 // ===== práctica: nivel TOCFL B1
 ({ctx,p,errs}=await page(w,th,'entrenar'));
 await p.click('#btn-exam-practice');await p.waitForTimeout(300);
 const e=await p.evaluate(()=>{const r=[...document.querySelectorAll('.ex-lv')].find(x=>x.dataset.k==='TOCFL-B3');return {n:document.querySelectorAll('.ex-lv').length,t:r&&r.querySelector('.t').textContent,d:r&&r.querySelector('.d').textContent};});
 ok(e.n===7&&/^TOCFL B1/.test(e.t)&&e.t.includes('進階')&&/lecturas/.test(e.d)&&/lecciones/.test(e.d),tag+' práctica: entrada «TOCFL B1 進階» con lecturas '+JSON.stringify(e));
 await p.click('.ex-lv[data-k="TOCFL-B3"]');await p.waitForTimeout(700);
 const adv=async()=>{for(let g=0;g<30;g++){const t=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].type;});if(t==='rtext')return true;const r=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].opts.findIndex(o=>o.ok);});await p.click(`#ex-opts .lq-opt[data-i="${r}"]`);await p.click('#ex-next');await p.waitForTimeout(40);}return false;};
 ok(await adv(),tag+' práctica B1: llega al texto');
 const t1=await p.evaluate(()=>{const S=ExamDebug.state();const it=S.items[S.idx];return {n:S.items.length,rt:S.items.filter(i=>i.type==='rtext').length,id:S.rd.id,trad:S.trad,opts:document.querySelectorAll('#ex-opts .lq-opt').length,plain:document.querySelectorAll('#ex-rtext .lq-ch,#ex-rtext .lq-line-say').length,p1:document.querySelector('#ex-rtext p').textContent,e1:S.rd.lines[0].zhT,qes:document.getElementById('rd-q-es').textContent,zhq:!!document.querySelector('.rd-q-zh'),sec:document.querySelector('.ex-sec').textContent.trim()};});
 ok(t1.n===20&&t1.rt===3&&t1.trad&&/^rd-b1-/.test(t1.id)&&t1.opts===4&&t1.plain===0&&t1.p1===t1.e1&&!t1.zhq&&/Texto · 1 de 3/i.test(t1.sec),tag+' práctica B1: 20 ítems, texto plano en tradicional y 3 preguntas de 4 opciones '+JSON.stringify([t1.id,t1.opts,t1.sec]));
 await p.click('#ex-opts .lq-opt[data-i="0"]');await p.waitForTimeout(800);
 const a1=await p.evaluate(()=>({ch:document.querySelectorAll('#ex-rtext .lq-ch').length,py:[...document.querySelectorAll('#ex-rtext .lq-line-py')].filter(e=>!e.classList.contains('hidden')&&e.textContent.trim().length>3).length,lines:document.querySelectorAll('#ex-rtext .lq-line').length,fb:document.getElementById('ex-fb').innerText.slice(0,80)}));
 ok(a1.ch>100&&a1.lines===a1.py&&a1.lines>=5,tag+' al responder el texto B1 pasa a tocable con pinyin de TOCFL en cada línea '+JSON.stringify([a1.ch,a1.lines,a1.py]));
 crs.push([tag+' práctica texto',await pixCr(p,await p.$('#ex-rtext .lq-line-zh'))],[tag+' práctica pinyin',await pixCr(p,await p.$('#ex-rtext .lq-line-py'))],[tag+' práctica traducción',await pixCr(p,await p.$('#ex-rtext .lq-line-es'))]);
 await p.screenshot({path:OUT+`practica-b1-${w}-${th}.png`});
 for(let i=0;i<3;i++){await p.click('#ex-next');await p.waitForTimeout(60);const st=await p.evaluate(()=>{const S=ExamDebug.state();return S&&S.idx<S.items.length?S.items[S.idx].type:'fin'});if(i<2){const r=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].opts.findIndex(o=>o.ok);});await p.click(`#ex-opts .lq-opt[data-i="${r}"]`);}}
 // terminar el resto (si quedaran) y mirar el historial
 for(let g=0;g<30;g++){const fin=await p.evaluate(()=>!!document.querySelector('.ex-score'));if(fin)break;const nxt=await p.$('#ex-next');if(nxt)await p.click('#ex-next');else{const r=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].opts.findIndex(o=>o.ok);});await p.click(`#ex-opts .lq-opt[data-i="${r}"]`);}await p.waitForTimeout(40);}
 const h=await p.evaluate(()=>(JSON.parse(localStorage.getItem('ac_exam_v1')||'{}')['TOCFL-B3']||[]).slice(-1)[0]);
 ok(h&&h.n===20&&h.rd&&h.rd.length===1&&/^rd-b1-/.test(h.rd[0].id)&&h.rd[0].n===3,tag+' historial de TOCFL B1 guarda rd '+JSON.stringify(h&&h.rd));
 ok(errs.length===0,tag+' práctica B1 sin errores '+errs);await ctx.close();
}
// ===== generador + rotación de B1
{const {ctx,p,errs}=await page(360,'light','entrenar');
 const g=await p.evaluate(()=>{const o={bad:[],reads:{},min:99};for(let i=0;i<200;i++){const S=ExamDebug.build('TOCFL-B3');o.min=Math.min(o.min,S.items.length);const t={};S.items.forEach(it=>t[it.type]=(t[it.type]||0)+1);if(Object.keys(t).sort().join()!=='cloze,listen,rtext'||t.rtext!==3)o.bad.push(JSON.stringify(t));o.reads[S.rd.id]=(o.reads[S.rd.id]||0)+1;
   S.items.filter(x=>x.type==='rtext').forEach((it,q)=>{const d=S.rd.questions[q];if(it.opts.length!==4||it.opts.find(x=>x.ok).es!==d.opts[0]||it.qzh)o.bad.push('rtext '+S.rd.id+q);});}
  const ids=READINGS.filter(r=>r.examLvl==='B1').map(r=>r.id);localStorage.setItem('ac_exam_v1',JSON.stringify({'TOCFL-B3':ids.slice(0,3).map((id,i)=>({t:i,s:1,n:20,sec:{},rd:[{id,s:1,n:3}]}))}));const next=new Set();for(let i=0;i<40;i++)next.add(ExamDebug.build('TOCFL-B3').rd.id);localStorage.removeItem('ac_exam_v1');
  return {o,ids,next:[...next]};});
 ok(g.o.min===20&&g.o.bad.length===0&&Object.keys(g.o.reads).length===4,'generador TOCFL B1: 200 tandas de 20 ítems con escuchar+completar+texto y salen los 4 textos '+JSON.stringify([g.o.min,g.o.bad.slice(0,2),g.o.reads]));
 ok(g.next.length===1&&g.next[0]===g.ids[3],'rotación B1: tras 3 usados sale el que nunca salió '+JSON.stringify(g.next));
 // los niveles HSK siguen sin mezclarse con las lecturas TOCFL
 const sep=await p.evaluate(()=>{let bad=0;for(const k of ['HSK3','HSK5']){for(let i=0;i<40;i++){const S=ExamDebug.build(k);if(S.rd.exam)bad++;}}return bad;});ok(sep===0,'HSK 3 y HSK 5 no toman lecturas de TOCFL');
 ok(errs.length===0,'generador sin errores '+errs);await ctx.close();}
const bad=crs.filter(([,c])=>c<4.5);bad.forEach(([m,c])=>ok(false,'contraste '+m+' = '+c));ok(bad.length===0,'contraste de '+crs.length+' elementos de texto ≥ 4,5:1 (mín '+Math.min(...crs.map(x=>x[1]))+')');
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
