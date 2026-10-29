const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});
await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('ac_view_v1','entrenar');}});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(APP_URL);await p.waitForTimeout(1300);
const st=()=>p.evaluate(()=>({open:!document.getElementById('exam-pop').classList.contains('hidden'),stack:Nav.stack,lock:document.body.style.overflow,sess:!!ExamDebug.state(),ref:window.acScriptRef,hist:localStorage.getItem('ac_exam_v1'),tab:document.querySelector('#module-tabs .mtab.active').dataset.tab,view:[...document.querySelectorAll('section.view')].find(s=>!s.classList.contains('hidden')).id}));
const start=async()=>{await p.click('#btn-exam-practice');await p.waitForTimeout(300);await p.click('.ex-lv[data-k="HSK1"]');await p.waitForTimeout(500);
 for(let i=0;i<2;i++){const r=await p.evaluate(()=>{const S=ExamDebug.state();const it=S.items[S.idx];return it.opts.findIndex(o=>o.ok);});await p.click(`#ex-opts .lq-opt[data-i="${r}"]`);await p.click('#ex-next');await p.waitForTimeout(60);}};
await start();let s=await st();ok(s.open&&s.sess&&s.ref&&JSON.stringify(s.stack)==='["exam-pop"]'&&s.lock==='hidden','en sesión: capa en la pila, escritura de la familia y scroll bloqueado '+JSON.stringify(s));
await p.goBack().catch(()=>{});await p.waitForTimeout(400);s=await st();
ok(!s.open&&!s.sess&&!s.ref&&s.stack.length===0&&s.lock===''&&s.hist===null,'Atrás en medio de la sesión cierra y descarta: '+JSON.stringify(s));
ok(p.url().includes('index.html')&&s.view==='view-entrenar','Atrás no sale de la app y deja Entrenar: '+s.view);
await p.click('#btn-exam-practice');await p.waitForTimeout(300);ok(await p.evaluate(()=>document.querySelectorAll('.ex-lv').length)===7,'al reabrir vuelve a la entrada (sin sesión vieja; R11: +TOCFL B1; HSK 4: 7 niveles)');
await p.keyboard.press('Escape');await p.waitForTimeout(200);
await start();await p.keyboard.press('Escape');await p.waitForTimeout(200);s=await st();ok(!s.open&&!s.sess,'Escape en medio de la sesión cierra');
await start();await p.click('#ex-close');await p.waitForTimeout(200);s=await st();ok(!s.open&&!s.sess&&s.hist===null,'✕ en medio de la sesión cierra sin guardar');
// recarga en medio de la sesión: no queda nada colgado
await start();await p.reload();await p.waitForTimeout(1300);s=await st();ok(!s.open&&s.hist===null&&s.stack.length===0,'recarga en sesión: sin capa ni historial guardado '+JSON.stringify(s));
// la práctica abierta no rompe los otros overlays: test de colocación después
await p.evaluate(()=>{showView('aprender');document.getElementById('tab-exams').click();});await p.waitForTimeout(300);await p.click('#btn-placement');await p.waitForTimeout(300);ok(await p.evaluate(()=>!document.getElementById('placement-pop').classList.contains('hidden')&&JSON.stringify(Nav.stack)==='["placement-pop"]'),'el test de colocación sigue andando');
ok(errs.length===0,'sin errores JS '+errs.join(' | '));
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
