const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('lecturas-lista');require('fs').mkdirSync(OUT,{recursive:true});
const URL=APP_URL;
async function pixCr(p,el){const buf=await el.screenshot();return p.evaluate(async(b64)=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};const cnt=new Map();for(let i=0;i<d.length;i+=4){const k=d[i]+','+d[i+1]+','+d[i+2];cnt.set(k,(cnt.get(k)||0)+1);}const bg=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);const lb=L(...bg);let best=1;for(let i=0;i<d.length;i+=4){const l=L(d[i],d[i+1],d[i+2]);const cr=(Math.max(l,lb)+0.05)/(Math.min(l,lb)+0.05);if(cr>best)best=cr;}return Math.round(best*100)/100;},buf.toString('base64'));}
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const crs=[];
async function page(w,th,extra){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,extra])=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1','aprender');Object.entries(extra||{}).forEach(([k,v])=>localStorage.setItem(k,v));}},[th,extra]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);return {ctx,p,errs};}
const answerAll=async(p,mode)=>{ // mode: 'right' | 'wrong' | 'mixed'
 const total=await p.evaluate(()=>LQ_DEBUG.state.results.length);const picks=[];
 for(let i=0;i<total;i++){const rp=await p.evaluate(()=>LQ_DEBUG.rightPos);const nOpt=await p.evaluate(()=>document.querySelectorAll('#lq-opts .lq-opt').length);
  const wrongPos=[...Array(nOpt).keys()].find(x=>x!==rp);const pos=mode==='right'?rp:mode==='wrong'?wrongPos:(i%2===0?rp:wrongPos);picks.push([pos,rp]);
  await p.click(`#lq-opts .lq-opt[data-pos="${pos}"]`);await p.waitForTimeout(80);await p.click('#lq-next');await p.waitForTimeout(80);}
 return picks;};
for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const tag=w+'/'+th;
 let {ctx,p,errs}=await page(w,th);
 // ===== lista en Exámenes
 const L=await p.evaluate(()=>{const s=document.querySelector('.rd-section');const lv=[...document.querySelectorAll('#reading-list .rd-level')].map(d=>({t:d.querySelector('summary').innerText.replace(/\s+/g,' '),open:d.open,cards:d.querySelectorAll('.rd-card').length}));const cards=[...document.querySelectorAll('#reading-list .rd-card')];
  return {has:!!s,title:document.getElementById('rd-title').textContent,intro:s.querySelector('.rd-intro').innerText,lv,cards:cards.length,tags:cards.map(c=>c.querySelector('.rd-approx-label').textContent),best:cards.map(c=>c.querySelector('.lc-best').textContent.trim()),
   btns:cards.map(c=>[...c.querySelectorAll('.lq-btn')].map(x=>x.textContent.trim()).join('|')),ovf:document.documentElement.scrollWidth>innerWidth+1,cut:cards.some(c=>c.scrollWidth>c.clientWidth+1),placement:document.getElementById('btn-placement').offsetParent!==null,
   order:[...document.getElementById('panel-exams').children].map(e=>e.id||e.className.split(' ')[0])};});
 ok(L.has&&L.title==='📖 Lecturas tipo examen'&&/no es oficial/.test(L.intro)&&/aproximado/.test(L.intro),tag+' sección Exámenes con título y aviso «aproximado / no es oficial»');
 ok(L.lv.length===4&&/^HSK 3 nivel aproximado · 0\/4 hechas$/.test(L.lv[0].t)&&/^HSK 4 nivel aproximado · 0\/4 hechas$/.test(L.lv[1].t)&&/^HSK 5 nivel aproximado · 0\/5 hechas$/.test(L.lv[2].t)&&/^TOCFL B1 nivel aproximado · 0\/4 hechas$/.test(L.lv[3].t)&&L.lv.every((x,i)=>x.open&&x.cards===(i===2?5:4)),tag+' lista por nivel: HSK 3, HSK 4, HSK 5 y TOCFL B1, 4 textos cada uno salvo HSK 5 (5: los 4 v1 y «¿Los sonidos afectan la atención?») '+JSON.stringify(L.lv));
 ok(L.cards===17&&L.tags.slice(0,4).every(t=>t==='Nivel aproximado: HSK 3 · no oficial')&&L.tags.slice(4,8).every(t=>t==='Nivel aproximado: HSK 4 · no oficial')&&L.tags.slice(8,12).every(t=>t==='Nivel aproximado: HSK 5 · no oficial')&&L.tags[12]==='Nivel aproximado: HSK 5 · no oficial · Texto original; los datos son ilustrativos'&&L.tags.slice(13).every(t=>t==='Nivel aproximado: TOCFL B1 · no oficial')&&L.best.every(x=>x==='🎯 —'),tag+' 17 tarjetas con la etiqueta «Nivel aproximado: … · no oficial» (también TOCFL; la del texto con nota la lleva al final) y sin progreso');
 ok(L.btns.every(x=>x==='🎯 Practicar|📖 Leer')&&!L.ovf&&!L.cut&&L.placement,tag+' botones Practicar (principal) y Leer (secundario), sin desborde y el test de colocación sigue ahí');
 ok(L.order.indexOf('btn-placement')<L.order.indexOf('rd-section')||L.order.indexOf('btn-placement')<L.order.length-1,tag+' orden del panel '+L.order.join(','));
 const sec=await p.$('.rd-section');
 crs.push([tag+' título',await pixCr(p,await p.$('#rd-title'))],[tag+' intro',await pixCr(p,await p.$('.rd-intro'))],[tag+' nivel',await pixCr(p,await p.$('.rd-level summary'))],[tag+' card zh',await pixCr(p,await p.$('.rd-card .lc-zh'))],[tag+' card es',await pixCr(p,await p.$('.rd-card .lc-es'))],[tag+' card blurb',await pixCr(p,await p.$('.rd-card .lc-blurb'))]);
 await sec.screenshot({path:OUT+`lista-${w}-${th}.png`});
 // plegar un nivel y que sobreviva a un re-armado
 await p.click('.rd-level[data-lv="ex-HSK3"] summary');await p.waitForTimeout(150);await p.evaluate(()=>document.dispatchEvent(new Event('ac-reading-change')));await p.waitForTimeout(100);
 ok(await p.evaluate(()=>[...document.querySelectorAll('#reading-list .rd-level')].map(d=>d.open).join())==='false,true,true,true',tag+' un nivel plegado se mantiene tras re-armar la lista');
 await p.click('.rd-level[data-lv="ex-HSK3"] summary');await p.waitForTimeout(150);

 if(th!=='light'){ok(errs.length===0,tag+' sin errores JS '+errs);await ctx.close();continue;}

 // ===== HSK 3: Leer → glosario → texto
 await p.click('.rd-card[data-x],.rd-card .lc-read');await p.waitForTimeout(500);
 let s=await p.evaluate(()=>({pop:!document.getElementById('lesson-pop').classList.contains('hidden'),stack:Nav.stack,body:document.getElementById('lq-body').innerText,gloss:document.querySelectorAll('.lq-gloss-item').length,ref:window.acScriptRef&&window.acScriptRef.id,view:LQ_DEBUG.state.view,py:[...document.querySelectorAll('.lq-gloss-py')].map(e=>e.textContent)}));
 ok(s.pop&&JSON.stringify(s.stack)==='["lesson-pop"]'&&s.gloss===4&&s.ref==='rd-h3-montana'&&s.view==='story',tag+' Leer abre el visor de lecciones con el glosario (4 palabras) '+JSON.stringify([s.gloss,s.ref,s.view,s.stack]));
 ok(s.py.every(x=>/^[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ ]+$/i.test(x)&&x.length>2),tag+' pinyin del glosario generado: '+s.py.join(' / '));
 ok(await p.evaluate(()=>localStorage.getItem('ac_last_lesson_id')===null),tag+' leer una lectura no pisa el marcador del podcast (ac_last_lesson_id)');
 await p.click('#lq-gloss-continue');await p.waitForTimeout(300);
 s=await p.evaluate(()=>({lines:document.querySelectorAll('#lq-body .lq-line').length,head:document.querySelector('.lq-story-es').textContent,lbl:document.querySelector('#lq-body .rd-approx-label').textContent,prac:document.getElementById('lq-story-practice').textContent,chars:document.querySelectorAll('#lq-body .lq-ch').length,says:document.querySelectorAll('#lq-body .lq-line-say').length}));
 ok(s.lines===6&&s.lbl==='Nivel aproximado: HSK 3 · no oficial'&&s.prac==='🎯 Practicar'&&s.chars>80&&s.says===6,tag+' texto en el visor: 6 líneas, etiqueta «Nivel aproximado: HSK 3 · no oficial», botón «Practicar» '+JSON.stringify(s));
 await p.click('#lq-body .lq-ch');await p.waitForTimeout(400);
 ok(await p.evaluate(()=>{const v=document.getElementById('vocab-pop');return !!v&&!v.classList.contains('hidden');}),tag+' tocar un carácter abre la ficha de palabra');
 await p.click('#btn-vocab-pop-close');await p.waitForTimeout(300);
 await p.click('#lq-story-pinyin');await p.waitForTimeout(400);
 ok(await p.evaluate(()=>[...document.querySelectorAll('.lq-line-py')].every(e=>!e.classList.contains('hidden')&&e.textContent.trim().length>3)),tag+' el pinyin de la lectura se genera al activarlo');
 await p.click('#lq-story-es');await p.waitForTimeout(100);
 ok(await p.evaluate(()=>[...document.querySelectorAll('.lq-line-es')].every(e=>!e.classList.contains('hidden'))),tag+' la traducción se puede ver');
 await p.click('#lq-story-es');
 crs.push([tag+' lectura zh',await pixCr(p,await p.$('#lq-body .lq-line-zh'))],[tag+' lectura py',await pixCr(p,await p.$('#lq-body .lq-line-py'))]);
 await p.screenshot({path:OUT+`story-${w}-${th}.png`});

 // ===== Responder (HSK 3): texto visible, preguntas en español, 3 opciones
 await p.click('#lq-story-practice');await p.waitForTimeout(300);
 let q=await p.evaluate(()=>({view:LQ_DEBUG.state.view,num:document.getElementById('lq-progress-num').textContent,textOpen:document.querySelector('.rd-text').open,lines:document.querySelectorAll('.rd-lines .lq-line').length,vis:document.querySelector('.rd-lines').getBoundingClientRect().height>40,
  meta:document.querySelector('.rd-q-meta').textContent,qes:document.querySelector('.rd-q-es').textContent,hasZhQ:!!document.querySelector('.rd-q-zh'),esBtn:!!document.getElementById('rd-es'),opts:[...document.querySelectorAll('#lq-opts .lq-opt')].map(o=>o.innerText.replace(/\s+/g,' ')),
  approx:document.querySelector('.rd-approx').textContent,ovf:document.documentElement.scrollWidth>innerWidth+1||document.getElementById('lq-body').scrollWidth>document.getElementById('lq-body').clientWidth+1}));
 ok(q.view==='rquiz'&&q.num==='1/3'&&q.textOpen&&q.lines===6&&q.vis,tag+' el texto queda a la vista al responder '+JSON.stringify([q.view,q.num,q.textOpen,q.lines]));
 ok(!q.hasZhQ&&!q.esBtn&&q.opts.length===3&&/Detalle/.test(q.meta)&&/aprox/.test(q.approx)&&/no oficial/.test(q.approx)&&!q.ovf,tag+' HSK 3: pregunta y 3 opciones en español, sin botón «ver en español», etiqueta no oficial '+JSON.stringify(q.opts));
 const D=await p.evaluate(()=>READINGS.find(r=>r.id==='rd-h3-montana'));
 ok(q.qes===D.questions[0].es,tag+' texto de la pregunta = dato');
 crs.push([tag+' pregunta',await pixCr(p,await p.$('.rd-q-es'))],[tag+' opción',await pixCr(p,await p.$('.rd-opt'))],[tag+' resumen texto',await pixCr(p,await p.$('.rd-text summary'))]);
 await p.screenshot({path:OUT+`quiz3-${w}-${th}.png`});
 // contestar mal la 1.ª: explicación del distractor elegido
 const rp=await p.evaluate(()=>LQ_DEBUG.rightPos);const wp=[0,1,2].find(x=>x!==rp);
 const chosenTxt=await p.evaluate((wp)=>document.querySelectorAll('#lq-opts .lq-opt')[wp].querySelector('.rd-opt-es').textContent,wp);
 await p.click(`#lq-opts .lq-opt[data-pos="${wp}"]`);await p.waitForTimeout(150);
 const fb=await p.evaluate(()=>({txt:document.getElementById('lq-feedback').innerText,right:document.querySelector('.lq-opt.is-right')&&document.querySelector('.lq-opt.is-right').dataset.pos,wrong:document.querySelector('.lq-opt.is-wrong')&&document.querySelector('.lq-opt.is-wrong').dataset.pos,dis:[...document.querySelectorAll('#lq-opts .lq-opt')].every(o=>o.disabled),next:document.getElementById('lq-next').textContent,seg:[...document.querySelectorAll('#lq-segments .lq-seg')].map(x=>x.className)}));
 const di=D.questions[0].opts.indexOf(chosenTxt);
 ok(fb.txt.includes('No es esa')&&fb.txt.includes(D.questions[0].whyNot[di-1])&&fb.txt.includes(D.questions[0].why),tag+' error: se explica el distractor elegido y la correcta ('+di+')');
 ok(String(fb.right)===String(rp)&&String(fb.wrong)===String(wp)&&fb.dis&&fb.next==='Siguiente ▶'&&fb.seg[0].includes('bad'),tag+' marcas de correcta/incorrecta, opciones bloqueadas y barra de progreso');
 crs.push([tag+' explicación',await pixCr(p,await p.$('#lq-feedback'))],[tag+' veredicto bad',await pixCr(p,await p.$('.lq-verdict'))]);
 await p.screenshot({path:OUT+`quiz3-fb-${w}-${th}.png`});
 await p.click('#lq-next');await p.waitForTimeout(100);
 // correcta, correcta → resultado
 const rp2=await p.evaluate(()=>LQ_DEBUG.rightPos);await p.click(`#lq-opts .lq-opt[data-pos="${rp2}"]`);
 ok(await p.evaluate(()=>document.querySelector('#lq-feedback .lq-verdict').textContent.includes('Correcto')),tag+' acierto: veredicto y explicación');
 ok(await p.evaluate(()=>document.querySelector('.rd-text').open&&document.querySelectorAll('.rd-lines .lq-line').length===6),tag+' el texto sigue a la vista en la 2.ª pregunta');
 await p.click('#lq-next');await p.waitForTimeout(100);
 ok(await p.evaluate(()=>document.getElementById('lq-next')===null?false:true),tag+' 3.ª pregunta');
 const rp3=await p.evaluate(()=>LQ_DEBUG.rightPos);await p.click(`#lq-opts .lq-opt[data-pos="${rp3}"]`);
 ok(await p.evaluate(()=>document.getElementById('lq-next').textContent)==='Ver resultado 🏁',tag+' la última pregunta ofrece «Ver resultado»');
 await p.click('#lq-next');await p.waitForTimeout(200);
 const res=await p.evaluate(()=>({score:document.querySelector('.lq-final-score').textContent,msg:document.querySelector('.lq-final-msg').textContent,bd:[...document.querySelectorAll('.rd-breakdown li')].map(x=>x.innerText.replace(/\s+/g,' ')),btns:[...document.querySelectorAll('.lq-final-actions .lq-btn')].map(x=>x.textContent.trim()),store:JSON.parse(localStorage.getItem('ac_reading_v1')||'null'),lessonsKey:localStorage.getItem('ac_lessons_v1')}));
 ok(res.score==='2/3'&&/Muy bien/.test(res.msg),tag+' resultado 2/3 con mensaje: '+res.score+' '+res.msg);
 ok(res.bd.join('|')==='Detalle 2/3'||/Detalle/.test(res.bd[0]),tag+' desglose por tipo: '+res.bd.join(' | '));
 ok(res.btns.join('|')==='📖 Releer el texto|🔁 Repetir las preguntas|➡️ Otro texto|Seguir ✕',tag+' acciones del resultado '+res.btns.join('|'));
 const rec=res.store&&res.store['rd-h3-montana'];
 ok(rec&&rec.best===2&&rec.of===3&&rec.done===true&&rec.tries===1&&/^\d{4}-\d\d-\d\d$/.test(rec.last)&&JSON.stringify(rec.qs)==='[false,true,true]',tag+' progreso guardado en ac_reading_v1 '+JSON.stringify(rec));
 ok(res.lessonsKey===null||!/rd-h3/.test(res.lessonsKey),tag+' no toca ac_lessons_v1');
 crs.push([tag+' resultado',await pixCr(p,await p.$('.lq-final'))]);
 await p.screenshot({path:OUT+`result-${w}-${th}.png`});
 // Repetir: mejor puntaje no baja; intentos suben
 await p.click('#rd-final-retry');await p.waitForTimeout(200);await answerAll(p,'wrong');await p.waitForTimeout(200);
 const r2=await p.evaluate(()=>({sc:document.querySelector('.lq-final-score').textContent,rec:JSON.parse(localStorage.getItem('ac_reading_v1'))['rd-h3-montana']}));
 ok(r2.sc==='0/3'&&r2.rec.best===2&&r2.rec.tries===2&&JSON.stringify(r2.rec.qs)==='[false,false,false]',tag+' repetir: el mejor puntaje se conserva y suben los intentos '+JSON.stringify(r2.rec));
 // Perfecto
 await p.click('#rd-final-retry');await p.waitForTimeout(200);await answerAll(p,'right');
 ok(await p.evaluate(()=>document.querySelector('.lq-final-score').textContent==='3/3'&&/Perfecto/.test(document.querySelector('.lq-final-msg').textContent)&&JSON.parse(localStorage.getItem('ac_reading_v1'))['rd-h3-montana'].best===3),tag+' 3/3 = «Perfecto» y mejor 3');
 // Otro texto: abre otra lectura del mismo nivel no hecha
 await p.click('#rd-final-next');await p.waitForTimeout(400);
 const nx=await p.evaluate(()=>({id:window.acScriptRef&&window.acScriptRef.id,view:LQ_DEBUG.state.view}));
 ok(/^rd-h3-/.test(nx.id)&&nx.id!=='rd-h3-montana'&&nx.view==='story',tag+' «Otro texto» abre otra lectura HSK 3 no hecha: '+JSON.stringify(nx));
 // Atrás cierra el visor y vuelve a Exámenes con la lista actualizada
 await p.goBack().catch(()=>{});await p.waitForTimeout(400);
 const bk=await p.evaluate(()=>({open:!document.getElementById('lesson-pop').classList.contains('hidden'),stack:Nav.stack,lock:document.body.style.overflow,ref:window.acScriptRef,tab:document.querySelector('#module-tabs .mtab.active').dataset.tab,best:document.querySelector('.rd-card .lc-best').textContent.trim(),lv:document.querySelector('.rd-level summary').innerText.replace(/\s+/g,' ')}));
 ok(!bk.open&&bk.stack.length===0&&bk.lock===''&&!bk.ref&&bk.tab==='exams'&&bk.best==='🎯 3/3 ✓'&&/1\/4 hechas/.test(bk.lv),tag+' Atrás cierra el visor, vuelve a Exámenes y la lista muestra 3/3 ✓ y 1/4 hechas '+JSON.stringify(bk));
 await sec.scrollIntoViewIfNeeded();await sec.screenshot({path:OUT+`lista-hecha-${w}-${th}.png`});

 // ===== HSK 5: pregunta en chino + «ver en español»
 await p.click('.rd-level[data-lv="ex-HSK5"] .rd-card .lc-practice');await p.waitForTimeout(300);
 const D5=await p.evaluate(()=>READINGS.find(r=>r.id==='rd-h5-celular'));
 let h5=await p.evaluate(()=>({view:LQ_DEBUG.state.view,zhQ:document.querySelector('.rd-q-zh').innerText,esHidden:document.getElementById('rd-q-es').classList.contains('hidden'),opts:[...document.querySelectorAll('#lq-opts .lq-opt')].map(o=>o.querySelector('.rd-opt-zh').innerText),optEsHidden:[...document.querySelectorAll('.rd-opt-es')].every(e=>e.classList.contains('hidden')),btn:document.getElementById('rd-es').textContent,lines:document.querySelectorAll('.rd-lines .lq-line').length,title:document.querySelector('.rd-text summary').innerText}));
 ok(h5.view==='rquiz'&&h5.zhQ===D5.questions[0].qZh&&h5.opts.length===4&&h5.esHidden&&h5.optEsHidden&&h5.btn==='🇪🇸 Ver en español'&&h5.lines===9,tag+' HSK 5: pregunta y 4 opciones en chino, español oculto, botón «Ver en español» '+JSON.stringify([h5.zhQ,h5.opts.length,h5.esHidden]));
 ok(JSON.stringify(h5.opts.slice().sort())===JSON.stringify(D5.questions[0].optsZh.slice().sort()),tag+' las 4 opciones en chino son las del dato (en otro orden)');
 crs.push([tag+' pregunta zh',await pixCr(p,await p.$('.rd-q-zh'))],[tag+' opción zh',await pixCr(p,await p.$('.rd-opt-zh'))]);
 await p.screenshot({path:OUT+`quiz5-${w}-${th}.png`});
 await p.click('#rd-es');await p.waitForTimeout(100);
 const e1=await p.evaluate(()=>({q:document.getElementById('rd-q-es').innerText,qh:document.getElementById('rd-q-es').classList.contains('hidden'),oes:[...document.querySelectorAll('.rd-opt-es')].map(e=>!e.classList.contains('hidden')&&e.innerText),btn:document.getElementById('rd-es').textContent}));
 ok(e1.q===D5.questions[0].es&&!e1.qh&&e1.oes.every(Boolean)&&e1.btn==='🇨🇳 Ocultar el español',tag+' «Ver en español» muestra la pregunta y cada opción traducidas');
 crs.push([tag+' pregunta es',await pixCr(p,await p.$('#rd-q-es'))],[tag+' opción es',await pixCr(p,await p.$('.rd-opt-es'))]);
 await p.screenshot({path:OUT+`quiz5-es-${w}-${th}.png`});
 await p.click('#rd-es');await p.waitForTimeout(100);
 ok(await p.evaluate(()=>document.getElementById('rd-q-es').classList.contains('hidden')),tag+' se puede volver a ocultar');
 await p.click('.rd-q-zh .lq-ch');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>{const v=document.getElementById('vocab-pop');return !!v&&!v.classList.contains('hidden');}),tag+' tocar un carácter de la pregunta abre la ficha');
 await p.click('#btn-vocab-pop-close');await p.waitForTimeout(300);
 // responder mal en HSK 5: se ve todo en español + explicación del distractor
 const rpa=await p.evaluate(()=>LQ_DEBUG.rightPos);const wpa=[0,1,2,3].find(x=>x!==rpa);await p.click(`#lq-opts .lq-opt[data-pos="${wpa}"]`);await p.waitForTimeout(150);
 const a5=await p.evaluate(()=>({oes:[...document.querySelectorAll('.rd-opt-es')].every(e=>!e.classList.contains('hidden')),q:!document.getElementById('rd-q-es').classList.contains('hidden'),btnHidden:document.getElementById('rd-es').classList.contains('hidden'),fb:document.getElementById('lq-feedback').innerText}));
 ok(a5.oes&&a5.q&&a5.btnHidden&&a5.fb.includes('No es esa')&&a5.fb.includes('Tu respuesta'),tag+' HSK 5 tras responder: todo en español y explicación del distractor');
 await p.screenshot({path:OUT+`quiz5-fb-${w}-${th}.png`});
 // terminar con todo correcto (las 3 restantes)
 await p.click('#lq-next');for(let i=0;i<3;i++){await p.waitForTimeout(60);const r=await p.evaluate(()=>LQ_DEBUG.rightPos);await p.click(`#lq-opts .lq-opt[data-pos="${r}"]`);await p.click('#lq-next');}
 await p.waitForTimeout(200);
 const f5=await p.evaluate(()=>({sc:document.querySelector('.lq-final-score').textContent,rec:JSON.parse(localStorage.getItem('ac_reading_v1'))['rd-h5-celular'],bd:[...document.querySelectorAll('.rd-breakdown li')].map(x=>x.innerText.replace(/\s+/g,' '))}));
 ok(f5.sc==='3/4'&&f5.rec.best===3&&f5.rec.of===4&&f5.bd.length===3,tag+' HSK 5 resultado 3/4 con desglose '+f5.bd.join(' | '));
 // Releer el texto desde el resultado → vuelve al glosario/texto; cerrar con ✕
 await p.click('#rd-final-read');await p.waitForTimeout(400);
 ok(await p.evaluate(()=>LQ_DEBUG.state.view==='story'),tag+' «Releer el texto» vuelve al visor de lectura');
 await p.click('#lq-close');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>document.getElementById('lesson-pop').classList.contains('hidden')&&Nav.stack.length===0),tag+' ✕ cierra');
 // persistencia tras recargar
 await p.reload();await p.waitForTimeout(1300);await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);
 const pr=await p.evaluate(()=>({best:[...document.querySelectorAll('#reading-list .rd-card')].map(c=>c.querySelector('.lc-best').textContent.trim()),lv:[...document.querySelectorAll('#reading-list .rd-level summary')].map(s=>s.innerText.replace(/\s+/g,' '))}));
 ok(pr.best[0]==='🎯 3/3 ✓'&&pr.best[8]==='🎯 3/4 ✓'&&/1\/4 hechas/.test(pr.lv[0])&&/1\/5 hechas/.test(pr.lv[2]),tag+' el progreso sobrevive a la recarga '+JSON.stringify(pr));
 ok(errs.length===0,tag+' sin errores JS '+errs);await ctx.close();

 // ===== escritura tradicional (familia HSK elegida 繁)
 ({ctx,p,errs}=await page(w,th,{ac_script_hsk:'trad'}));
 const tl=await p.evaluate(()=>({zh:document.querySelector('.rd-card .lc-zh').textContent}));
 await p.click('.rd-level[data-lv="ex-HSK5"] .rd-card .lc-practice');await p.waitForTimeout(300);
 const T5=await p.evaluate(()=>{const r=READINGS.find(x=>x.id==='rd-h5-celular');return {q:document.querySelector('.rd-q-zh').innerText,l1:document.querySelector('.rd-lines .lq-line-zh').innerText,exp:[r.questions[0].qZhT,r.lines[0].zhT],opts:[...document.querySelectorAll('.rd-opt-zh')].map(e=>e.innerText),eo:r.questions[0].optsZhT,title:document.querySelector('.rd-text summary').innerText,tz:r.titleZhT};});
 ok(tl.zh==='週末爬山'&&T5.q===T5.exp[0]&&T5.l1===T5.exp[1]&&JSON.stringify(T5.opts.slice().sort())===JSON.stringify(T5.eo.slice().sort())&&T5.title.includes(T5.tz),tag+' con 繁: lista, texto, pregunta y opciones en tradicional '+JSON.stringify([tl.zh,T5.q]));
 await p.screenshot({path:OUT+`quiz5-trad-${w}-${th}.png`});
 // explicación con caracteres chinos sale en tradicional
 const rpt=await p.evaluate(()=>LQ_DEBUG.rightPos);await p.click(`#lq-opts .lq-opt[data-pos="${rpt}"]`);
 const whyT=await p.evaluate(()=>{const q=READINGS.find(x=>x.id==='rd-h5-celular').questions[0];return {fb:document.getElementById('lq-feedback').innerText,want:q.whyT||q.why};});
 ok(whyT.fb.includes(whyT.want),tag+' con 繁: la explicación cita el texto en tradicional');
 ok(errs.length===0,tag+' trad sin errores JS '+errs);await ctx.close();
}
// ===== modo «aprendo español»: la pestaña Exámenes (y la sección) no aparecen
{const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);
 ok(await p.evaluate(()=>document.getElementById('tab-exams').offsetParent===null),'cn-es: sin pestaña Exámenes (ni lecturas)');ok(errs.length===0,'cn-es sin errores '+errs);await ctx.close();}
// ===== las lecciones de siempre siguen igual (Aprender → Lecciones: leer y practicar)
{const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('ac_view_v1','aprender');}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-lessons').click();});await p.waitForTimeout(300);
 const cards=await p.evaluate(()=>document.querySelectorAll('#lesson-list .lesson-card').length);ok(cards>0&&await p.evaluate(()=>LQ_DEBUG.lessons)>=41,'Lecciones: la lista sigue (tarjetas '+cards+')');
 await p.click('#lesson-list .lc-read');await p.waitForTimeout(500);
 let v=await p.evaluate(()=>({view:LQ_DEBUG.state.view,btn:(document.getElementById('lq-gloss-continue')||{}).textContent}));
 if(v.btn)await p.click('#lq-gloss-continue');await p.waitForTimeout(300);
 v=await p.evaluate(()=>({prac:document.getElementById('lq-story-practice').textContent,lines:document.querySelectorAll('#lq-body .lq-line').length,who:document.querySelectorAll('#lq-body .lq-line-who').length}));
 ok(/^🎯 Practicar \d+$/.test(v.prac)&&v.lines>3,'Lecciones: la lectura conserva «Practicar N» y sus líneas '+JSON.stringify(v));
 await p.click('#lq-story-practice');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>LQ_DEBUG.state.view==='quiz'&&document.querySelectorAll('#lq-opts .lq-opt').length===3&&document.getElementById('lq-blank')!==null),'Lecciones: el quiz de huecos sigue igual');
 const rr=await p.evaluate(()=>LQ_DEBUG.rightPos);await p.click(`#lq-opts .lq-opt[data-pos="${rr}"]`);await p.waitForTimeout(100);
 ok(await p.evaluate(()=>document.querySelector('.lq-verdict.ok')!==null),'Lecciones: acertar muestra la ficha de palabra');
 ok(await p.evaluate(()=>localStorage.getItem('ac_reading_v1')===null),'Lecciones: no escriben ac_reading_v1');
 ok(errs.length===0,'Lecciones sin errores '+errs);await ctx.close();}
// ===== contraste real (≥ 4,5:1)
const bad=crs.filter(([,c])=>c<4.5);bad.forEach(([m,c])=>ok(false,'contraste '+m+' = '+c));ok(bad.length===0,'contraste de '+crs.length+' elementos de texto ≥ 4,5:1 (mín '+Math.min(...crs.map(x=>x[1]))+')');
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
