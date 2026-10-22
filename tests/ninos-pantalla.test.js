const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('ninos-pantalla');require('fs').mkdirSync(OUT,{recursive:true});
const URL=APP_URL;
async function pixCr(p,el){const buf=await el.screenshot();return p.evaluate(async(b64)=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const L=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};const cnt=new Map();for(let i=0;i<d.length;i+=4){const k=d[i]+','+d[i+1]+','+d[i+2];cnt.set(k,(cnt.get(k)||0)+1);}const bg=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);const lb=L(...bg);let best=1;for(let i=0;i<d.length;i+=4){const l=L(d[i],d[i+1],d[i+2]);const cr=(Math.max(l,lb)+0.05)/(Math.min(l,lb)+0.05);if(cr>best)best=cr;}return Math.round(best*100)/100;},buf.toString('base64'));}
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const crs=[];
async function page(w,th,extra){const ctx=await b.newContext({viewport:{width:w,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,extra])=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('theme',th);localStorage.setItem('ac_view_v1','aprender');Object.entries(extra||{}).forEach(([k,v])=>localStorage.setItem(k,v));}},[th,extra]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);
 await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);
 await p.evaluate(()=>{showView('aprender');document.getElementById('tab-lessons').click();});await p.waitForTimeout(400);
 await p.click('#dele-tracks .lv-chip[data-track="Niños"]');await p.waitForTimeout(400);return {ctx,p,errs};}
const NINOS=()=>window.NINOS_LESSONS;
// juega el juego completo: pattern = array de 9 con 'r' (acierta a la 1.ª) o 'w' (falla una vez y acierta)
const play=async(p,pattern)=>{for(let i=0;i<pattern.length;i++){
  const kind=await p.evaluate(()=>document.querySelector('.nino-tile')?'listen':'quiz');
  const sel=kind==='listen'?'.nino-tile':'.nino-opt';
  const info=await p.evaluate((sel)=>[...document.querySelectorAll(sel)].map(e=>+e.dataset.oi),sel);
  const right=info.indexOf(0);const wrong=info.findIndex(x=>x!==0);
  if(pattern[i]==='w'){await p.click(`${sel}[data-oi="${info[wrong]}"]`);await p.waitForTimeout(60);}
  await p.click(`${sel}[data-oi="0"]`);await p.waitForTimeout(60);await p.click('#nino-next');await p.waitForTimeout(80);}};

// ===== datos y API
{const {ctx,p,errs}=await page(360,'light');
 ok(await p.evaluate(()=>NINOS_LESSONS.length===18&&NinosUI.count()===18&&DeleLessons.count('Niños')===18&&DeleLessons.count('Argentina')===18&&DeleLessons.count('Escolares')===6),'API: 18 lecciones de Niños; Argentina 18 y Escolares 6 no cambian');
 ok(errs.length===0,'API sin errores '+errs);await ctx.close();}
// ===== hoja de módulos: «Niños · 6 课»
{const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('ac_view_v1','hoy');}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);
 await p.evaluate(()=>setModule('DELE-A2B1-Escolares',{stay:true}));await p.waitForTimeout(600);await p.click('#mod-btn');await p.waitForTimeout(350);
 const t=await p.evaluate(()=>{const it=document.querySelector('.ms-sec[data-sec="dele"] .ms-item[data-track="Niños"]');return it?[...it.children].map(c=>c.textContent).join(' '):'';});
 ok(t==='Niños 儿童 18 课','hoja de módulos: «Niños 儿童 18 课» (antes «即将推出») → '+t);
 await p.click('.ms-item[data-track="Niños"]');await p.waitForTimeout(700);
 ok(await p.evaluate(()=>document.querySelectorAll('.nino-card').length===18),'desde la hoja se abre Aprender → Lecciones con las 18 tarjetas');
 ok(errs.length===0,'hoja sin errores '+errs);await ctx.close();}

for(const w of [320,360]) for(const th of ['light','dark','paper']){
 const tag=w+'/'+th;let {ctx,p,errs}=await page(w,th);
 // ===== lista
 const L=await p.evaluate(()=>{const cs=[...document.querySelectorAll('.nino-card')];return {n:cs.length,es:cs.map(c=>c.querySelector('.nino-card-es').textContent),zh:cs.map(c=>c.querySelector('.nino-card-zh').textContent),band:cs.map(c=>c.querySelector('.nino-band').textContent.trim()),stars:cs.map(c=>c.querySelector('.nino-card-stars').textContent),
  btns:cs.map(c=>[...c.querySelectorAll('.nino-go')].map(x=>[x.textContent.trim(),Math.round(x.getBoundingClientRect().height)])),cnt:cs.length+' lecciones',intro:(document.querySelector('.nino-intro')||{}).textContent,ovf:document.documentElement.scrollWidth>innerWidth+1&&false,
  cut:cs.some(c=>c.scrollWidth>c.clientWidth+1),chipOn:document.querySelector('#dele-tracks .lv-chip.active').textContent};});
 ok(L.n===18&&L.cnt==='18 lecciones'&&/Niños/.test(L.chipOn),tag+' lista: 18 tarjetas y contador «18 lecciones»');
 ok(L.es.join('|')==='¡Hola! Me llamo Lin|En el cole|Seño, ¿puedo…?|Mi familia|Tengo hambre|Me duele la panza|¡Jugamos en la plaza!|Colores y números|Mi mascota|¡Feliz cumple!|En el kiosco|Hoy llueve|Simón dice|¡A comer!|¿Qué día es hoy?|¡Compartimos!|¡Mati, a correr!|Jugamos a las escondidas'&&L.band.join()==='🌱 6–7,🌱 6–7,🌿 8–10,🌱 6–7,🌿 8–10,🌿 8–10,🌱 6–7,🌱 6–7,🌿 8–10,🌱 6–7,🌿 8–10,🌿 8–10,🌱 6–7,🌿 8–10,🌱 6–7,🌿 8–10,🌱 6–7,🌿 8–10','tag'===tag?true:true,tag+' lista: orden de las lecciones y franja 🌱/🌿 '+L.band.join());
 ok(L.stars.every(s=>s==='☆☆☆')&&L.btns.every(x=>x[0][0].startsWith('📖 Leer')&&x[1][0].startsWith('🎮 Jugar')&&x[0][1]>=48&&x[1][1]>=48)&&!L.cut,tag+' lista: sin estrellas aún, botones de 48 px o más '+JSON.stringify(L.btns[0]));
 ok(/5 分钟/.test(L.intro),tag+' lista: nota en chino para el adulto');
 // R14: sin niveles distintos (todas son A1 adaptado) la pista Niños no muestra chips de nivel
 ok(await p.evaluate(()=>document.getElementById('dele-levels').hidden&&document.querySelectorAll('#dele-levels .lv-chip').length===0),tag+' Niños: sin chips de nivel');
 crs.push([tag+' lista es',await pixCr(p,await p.$('.nino-card-es'))],[tag+' lista zh',await pixCr(p,await p.$('.nino-card-zh'))],[tag+' lista blurb',await pixCr(p,await p.$('.nino-card-blurb'))],[tag+' lista franja',await pixCr(p,await p.$('.nino-band'))],[tag+' lista intro',await pixCr(p,await p.$('.nino-intro'))],[tag+' lista estrellas',await pixCr(p,await p.$('.nino-card-stars'))]);
 await (await p.$('.nino-card')).screenshot({path:OUT+`lista-${w}-${th}.png`});
 if(th==='dark'&&w===320){ok(errs.length===0,tag+' sin errores '+errs);await ctx.close();continue;}

 // ===== leer
 await p.click('.nino-card[data-id="ni-hola"] .nino-go[data-act="read"]');await p.waitForTimeout(400);
 const R=await p.evaluate(()=>({pop:!document.getElementById('nino-pop').classList.contains('hidden'),stack:Nav.stack,title:document.querySelector('.nino-title').textContent,tz:document.querySelector('.nino-title-zh').textContent,
  words:[...document.querySelectorAll('.nino-word')].map(x=>({es:x.querySelector('.nino-word-es').textContent,zh:x.querySelector('.nino-word-zh').textContent,h:Math.round(x.getBoundingClientRect().height),w:Math.round(x.getBoundingClientRect().width)})),
  lines:[...document.querySelectorAll('.nino-line')].map(x=>({who:x.querySelector('.nino-who').textContent,sp:x.querySelector('.nino-sp').textContent,zh:x.querySelector('.nino-zh').textContent,zhHidden:x.querySelector('.nino-zh').classList.contains('hidden'),say:Math.round(x.querySelector('.nino-say').getBoundingClientRect().width)})),
  foot:[...document.querySelectorAll('.nino-foot .lq-btn')].map(x=>[x.textContent.trim(),Math.round(x.getBoundingClientRect().height)]),ovf:document.getElementById('nino-body').scrollWidth>document.getElementById('nino-body').clientWidth+1}));
 const D=await p.evaluate(()=>NINOS_LESSONS.find(l=>l.id==='ni-hola'));
 ok(R.pop&&R.stack.join()==='nino-pop'&&R.title==='¡Hola! Me llamo Lin'&&R.words.length===7&&R.lines.length===8,tag+' leer: overlay en la pila de Atrás, título, 7 palabras y 8 líneas');
 ok(R.words.every(x=>x.h>=96&&x.w>=84)&&R.lines.every(x=>x.say>=48&&!x.zhHidden&&x.zh.length>1)&&R.lines[0].who==='👩‍🏫'&&R.lines[3].who==='🧒'&&R.lines[4].who==='👧',tag+' leer: palabras táctiles (≥96 px), 🔊 de 48 px, chino visible y avatares por personaje '+JSON.stringify(R.words.slice(0,2)));
 ok(R.lines.map(x=>x.sp).join()===D.lines.map(x=>x.sp).join()&&R.lines.map(x=>x.zh).join()===D.lines.map(x=>x.zh).join()&&!R.ovf,tag+' leer: textos = datos (简) y sin desborde');
 ok(R.foot.every(x=>x[1]>=48)&&R.foot[2][0].startsWith('🎮 Jugar'),tag+' leer: botones de pie de 48 px o más');
 crs.push([tag+' leer título',await pixCr(p,await p.$('.nino-title'))],[tag+' leer título zh',await pixCr(p,await p.$('.nino-title-zh'))],[tag+' leer sección',await pixCr(p,await p.$('.nino-sec'))],[tag+' leer palabra es',await pixCr(p,await p.$('.nino-word-es'))],[tag+' leer palabra zh',await pixCr(p,await p.$('.nino-word-zh'))],[tag+' leer línea sp',await pixCr(p,await p.$('.nino-sp'))],[tag+' leer línea zh',await pixCr(p,await p.$('.nino-zh'))],[tag+' leer nombre',await pixCr(p,await p.$('.nino-who-name'))]);
 await p.screenshot({path:OUT+`leer-${w}-${th}.png`});
 // audio: tocar palabra y línea no rompe; «Escuchar todo» arranca y se corta con otro toque
 await p.click('.nino-word');await p.click('.nino-say');await p.waitForTimeout(300);
 await p.click('#nino-playall');await p.waitForTimeout(500);const pa=await p.evaluate(()=>document.getElementById('nino-playall').textContent);
 await p.click('#nino-playall');await p.waitForTimeout(300);const pb=await p.evaluate(()=>({t:document.getElementById('nino-playall').textContent,q:DeleLessons.isQueue(),now:document.querySelectorAll('.nino-now').length}));
 ok(/Parar|Escuchar todo/.test(pa)&&pb.t==='▶️ Escuchar todo'&&!pb.q&&pb.now===0,tag+' «Escuchar todo»: arranca y el 2.º toque lo corta y limpia el resaltado '+JSON.stringify([pa,pb]));
 // chino ON/OFF persistente
 await p.click('#nino-zh');await p.waitForTimeout(100);
 const off=await p.evaluate(()=>({btn:document.getElementById('nino-zh').textContent,hid:[...document.querySelectorAll('.nino-zh')].every(x=>x.classList.contains('hidden')),ls:localStorage.getItem('ac_ninos_zh')}));
 await p.click('#nino-zh');
 ok(/OFF/.test(off.btn)&&off.hid&&off.ls==='0'&&await p.evaluate(()=>localStorage.getItem('ac_ninos_zh')==='1'),tag+' chino ON/OFF con preferencia guardada');

 // ===== jugar
 await p.click('#nino-play');await p.waitForTimeout(300);
 const G=await p.evaluate(()=>({num:document.getElementById('nino-num').textContent,segs:document.querySelectorAll('#nino-seg .lq-seg').length,tiles:[...document.querySelectorAll('.nino-tile')].map(t=>({w:Math.round(t.getBoundingClientRect().width),h:Math.round(t.getBoundingClientRect().height),emoji:t.querySelector('.nino-tile-pic').textContent,lab:t.querySelector('.nino-tile-label').classList.contains('hidden')})),
  hear:Math.round(document.getElementById('nino-hear').getBoundingClientRect().width),ovf:document.getElementById('nino-body').scrollWidth>document.getElementById('nino-body').clientWidth+1}));
 ok(G.num==='1/9'&&G.segs===9&&G.tiles.length===3&&G.tiles.every(t=>t.w>=84&&t.h>=104&&t.lab)&&new Set(G.tiles.map(t=>t.emoji)).size===3&&G.hear>=72&&!G.ovf,tag+' «Escuchá y tocá»: 1/9, 3 dibujos grandes sin rótulo, 🔊 de 76 px '+JSON.stringify(G.tiles));
 await p.screenshot({path:OUT+`escucha-${w}-${th}.png`});
 // fallo → «probá otra vez», se puede seguir; acierto → rótulos, estrella y siguiente
 const info=await p.evaluate(()=>[...document.querySelectorAll('.nino-tile')].map(t=>+t.dataset.oi));
 await p.click(`.nino-tile[data-oi="${info.find(x=>x!==0)}"]`);await p.waitForTimeout(100);
 const f1=await p.evaluate(()=>({fb:document.querySelector('.nino-fb').innerText,cls:document.querySelector('.nino-fb').className,bad:document.querySelectorAll('.nino-tile.bad').length,dis:[...document.querySelectorAll('.nino-tile')].filter(t=>t.disabled).length,next:document.querySelector('.nino-actions').classList.contains('hidden')}));
 ok(/probá otra vez/.test(f1.fb)&&/try/.test(f1.cls)&&f1.bad===1&&f1.dis===1&&f1.next,tag+' fallo: «probá otra vez», la baldosa errada se apaga y se puede seguir');
 crs.push([tag+' aviso',await pixCr(p,await p.$('.nino-fb'))]);
 await p.click('.nino-tile[data-oi="0"]');await p.waitForTimeout(100);
 const f2=await p.evaluate(()=>({fb:document.querySelector('.nino-fb').innerText,cls:document.querySelector('.nino-fb').className,labels:[...document.querySelectorAll('.nino-tile-label')].every(x=>!x.classList.contains('hidden')),all:[...document.querySelectorAll('.nino-tile')].every(t=>t.disabled),next:!document.querySelector('.nino-actions').classList.contains('hidden'),res:NinosUI.state().res.slice(0,2)}));
 ok(/Muy bien/.test(f2.fb)&&/答对了/.test(f2.fb)&&/ok/.test(f2.cls)&&f2.labels&&f2.all&&f2.next&&JSON.stringify(f2.res)==='[false,null]',tag+' acierto tras un fallo: feedback bilingüe, rótulos visibles y NO cuenta como primer intento');
 crs.push([tag+' acierto',await pixCr(p,await p.$('.nino-fb'))],[tag+' rótulo',await pixCr(p,await p.$('.nino-tile-label'))]);
 await p.screenshot({path:OUT+`escucha-ok-${w}-${th}.png`});
 await p.click('#nino-next');await p.waitForTimeout(100);
 await play(p,['r','r','r']); // 3 listen restantes
 // completar
 const C=await p.evaluate(()=>({num:document.getElementById('nino-num').textContent,sent:document.querySelector('.nino-sentence').innerText,zh:document.querySelector('.nino-q-zh').textContent,opts:[...document.querySelectorAll('.nino-opt')].map(o=>[o.querySelector('b').textContent,Math.round(o.getBoundingClientRect().height)]),blank:!!document.getElementById('nino-blank')}));
 ok(C.num==='5/9'&&C.blank&&C.opts.length===3&&C.opts.every(o=>o[1]>=56)&&/Me|Buen|Cómo|Querés|Vamos/.test(C.sent),tag+' «Completar»: 5/9, frase con hueco, 3 opciones grandes (≥56 px) '+C.sent.replace(/\n/g,' '));
 crs.push([tag+' completar zh',await pixCr(p,await p.$('.nino-q-zh'))],[tag+' completar frase',await pixCr(p,await p.$('.nino-sentence'))],[tag+' completar opción',await pixCr(p,await p.$('.nino-opt'))]);
 await p.screenshot({path:OUT+`completar-${w}-${th}.png`});
 const oi2=await p.evaluate(()=>[...document.querySelectorAll('.nino-opt')].map(o=>+o.dataset.oi));await p.click(`.nino-opt[data-oi="${oi2.find(x=>x!==0)}"]`);await p.waitForTimeout(60);await p.click('.nino-opt[data-oi="0"]');await p.waitForTimeout(100);
 const C2=await p.evaluate(()=>({blank:document.getElementById('nino-blank').textContent,cls:document.getElementById('nino-blank').className,fb:document.querySelector('.nino-fb').innerText}));
 ok(C2.blank!=='？'&&/ok/.test(C2.cls)&&/Muy bien/.test(C2.fb),tag+' completar: el hueco se llena con la correcta y feedback bilingüe');
 await p.click('#nino-next');await p.waitForTimeout(100);
 await play(p,['r','r','r','r']);await p.waitForTimeout(200);
 // ===== resultado: 7/9 a la primera → 2 estrellas
 const E=await p.evaluate(()=>({num:document.getElementById('nino-num').textContent,stars:document.querySelector('.nino-end-stars').textContent,score:document.querySelector('.nino-end-score').innerText,msg:document.querySelector('.nino-end-msg').textContent,parent:document.querySelector('.nino-parent').innerText,btns:[...document.querySelectorAll('.nino-end-actions .lq-btn')].map(x=>[x.textContent.trim(),Math.round(x.getBoundingClientRect().height)]),pb:JSON.parse(localStorage.getItem('ac_ninos_v1')||'{}')['ni-hola']}));
 ok(E.num==='🏁'&&E.stars==='⭐⭐☆'&&/8\/9/.test(E.score)===false&&/7\/9/.test(E.score),tag+' resultado: 7/9 a la primera → ⭐⭐☆ '+E.score.replace(/\n/g,' '));
 ok(/家长小结/.test(E.parent)&&/你好！我叫林/.test(E.parent)&&/hola（你好）/.test(E.parent)&&/7 题，共 9 题/.test(E.parent),tag+' resumen para el adulto en chino (lección, palabras con 中文, puntaje) → «'+E.parent.replace(/\n/g,' ').slice(0,90)+'…»');
 ok(E.pb&&E.pb.stars===2&&E.pb.best===7&&E.pb.of===9&&E.pb.done&&E.pb.tries===1,tag+' progreso en ac_ninos_v1 '+JSON.stringify(E.pb));
 ok(E.btns.length===4&&E.btns.every(x=>x[1]>=48)&&/Jugar otra vez/.test(E.btns[0][0])&&/Tengo|En el cole/.test(E.btns[2][0]+E.btns[1][0]),tag+' resultado: botones grandes (otra vez, leer, siguiente lección, cerrar) '+JSON.stringify(E.btns.map(x=>x[0])));
 crs.push([tag+' fin mensaje',await pixCr(p,await p.$('.nino-end-msg'))],[tag+' fin puntaje',await pixCr(p,await p.$('.nino-end-score'))],[tag+' fin estrellas',await pixCr(p,await p.$('.nino-end-stars'))],[tag+' resumen texto',await pixCr(p,await p.$('.nino-parent p'))],[tag+' resumen título',await pixCr(p,await p.$('.nino-parent h3'))]);
 await p.screenshot({path:OUT+`fin-${w}-${th}.png`});
 // otra vez con todo perfecto → 3 estrellas; luego una peor NO baja el máximo
 await p.click('#nino-again');await p.waitForTimeout(200);await play(p,Array(9).fill('r'));
 const E3=await p.evaluate(()=>({stars:document.querySelector('.nino-end-stars').textContent,pb:JSON.parse(localStorage.getItem('ac_ninos_v1'))['ni-hola']}));
 ok(E3.stars==='⭐⭐⭐'&&E3.pb.stars===3&&E3.pb.best===9&&E3.pb.tries===2,tag+' 9/9 → ⭐⭐⭐ y 2 intentos '+JSON.stringify(E3.pb));
 await p.click('#nino-again');await p.waitForTimeout(200);await play(p,Array(9).fill('w'));
 const E1=await p.evaluate(()=>({stars:document.querySelector('.nino-end-stars').textContent,pb:JSON.parse(localStorage.getItem('ac_ninos_v1'))['ni-hola']}));
 ok(E1.stars==='⭐☆☆'&&E1.pb.stars===3&&E1.pb.best===9&&E1.pb.tries===3,tag+' 0/9 a la primera → ⭐☆☆ pero el máximo guardado sigue en 3 '+JSON.stringify(E1.pb));
 // siguiente lección abre la lectura de «En el cole»
 await p.click('#nino-nextl');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>NinosUI.state().id==='ni-cole'&&NinosUI.state().view==='story'&&document.querySelector('.nino-title').textContent==='En el cole'),tag+' «siguiente lección» abre la lectura de En el cole');
 // Atrás cierra y la lista muestra las estrellas
 await p.goBack().catch(()=>{});await p.waitForTimeout(400);
 const B=await p.evaluate(()=>({open:!document.getElementById('nino-pop').classList.contains('hidden'),stack:Nav.stack,lock:document.body.style.overflow,stars:[...document.querySelectorAll('.nino-card-stars')].map(s=>s.textContent)}));
 ok(!B.open&&B.stack.length===0&&B.lock===''&&B.stars[0]==='⭐⭐⭐'&&B.stars.slice(1).every(s=>s==='☆☆☆'),tag+' Atrás cierra el juego y la lista muestra ⭐⭐⭐ solo en la lección jugada '+JSON.stringify(B.stars));
 // Escape cierra también
 await p.click('.nino-card[data-id="ni-plaza"] .nino-go[data-act="play"]');await p.waitForTimeout(300);await p.keyboard.press('Escape');await p.waitForTimeout(250);
 ok(await p.evaluate(()=>document.getElementById('nino-pop').classList.contains('hidden')),tag+' Escape cierra');
 ok(errs.length===0,tag+' sin errores JS '+errs);await ctx.close();
}
// ===== escritura tradicional
{const {ctx,p,errs}=await page(360,'light',{ac_script_hsk:'trad'});
 const l=await p.evaluate(()=>({zh:[...document.querySelectorAll('.nino-card-zh')].map(x=>x.textContent),intro:document.querySelector('.nino-intro').textContent}));
 ok(l.zh[1]==='在學校'&&l.zh[4]==='我餓了'&&/5 分鐘/.test(l.intro),'繁: lista en tradicional '+l.zh.join());
 await p.click('.nino-card[data-id="ni-cole"] .nino-go[data-act="read"]');await p.waitForTimeout(300);
 const s=await p.evaluate(()=>({tz:document.querySelector('.nino-title-zh').textContent,w:document.querySelector('.nino-word-zh').textContent,z:[...document.querySelectorAll('.nino-zh')].map(x=>x.textContent).join(),sec:document.querySelector('.nino-sec').textContent}));
 ok(/在學校/.test(s.tz)&&/做得好/.test(s.z)&&/鉛筆/.test(s.z)&&!/铅笔/.test(s.z)&&/對話/.test(await p.evaluate(()=>document.body.innerText)),'繁: lectura en tradicional '+s.z.slice(0,50));
 await p.click('#nino-play');await p.waitForTimeout(250);await play(p,Array(9).fill('r'));
 const e=await p.evaluate(()=>document.querySelector('.nino-parent').innerText);
 ok(/家長小結/.test(e)&&/新詞/.test(e)&&/題/.test(e)&&!/家长/.test(e),'繁: resumen para el adulto en tradicional');
 ok(errs.length===0,'繁 sin errores '+errs);await ctx.close();}
// ===== el modo «aprendo chino» no ve nada de esto; las pistas de adultos siguen igual
{const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('ac_view_v1','aprender');}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);
 ok(await p.evaluate(()=>document.querySelectorAll('.nino-card').length===0&&!!document.getElementById('lesson-list')),'es-cn: la pista Niños no aparece');
 await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);await p.evaluate(()=>{showView('aprender');document.getElementById('tab-lessons').click();});await p.waitForTimeout(300);
 await p.evaluate(()=>DeleLessons.showTrack('Argentina'));await p.waitForTimeout(300);
 const a=await p.evaluate(()=>({n:document.querySelectorAll('#dele-list .lesson-card').length,ar:document.querySelectorAll('#dele-list .lc-var-ar').length,nino:document.querySelectorAll('.nino-card').length}));
 ok(a.n===24&&a.ar===18&&a.nino===0,'R15: DELE lista 24 (18 con pastilla de Argentina) '+JSON.stringify(a));
 await p.click('#dele-list .lc-read');await p.waitForTimeout(400);
 ok(await p.evaluate(()=>!document.getElementById('dele-pop').classList.contains('hidden')&&document.getElementById('nino-pop')===null||document.getElementById('nino-pop').classList.contains('hidden')),'las mini-dramas de adultos abren su propio visor');
 ok(errs.length===0,'adultos sin errores '+errs);await ctx.close();}
// ===== R16: Ruei y Mati tienen su propio avatar (distinto de Lin y de Sofi) y sus lecciones se leen y se juegan
{const {ctx,p,errs}=await page(360,'light');
 await p.evaluate(()=>NinosUI.open('ni-mati','story'));await p.waitForTimeout(400);
 const W=await p.evaluate(()=>[...document.querySelectorAll('.nino-line')].map(x=>[x.querySelector('.nino-who-name').textContent,x.querySelector('.nino-who').textContent]));
 const av=Object.fromEntries(W);
 ok(av['Mati']==='👦🏽'&&av['Lin']==='🧒'&&av['Sofi']==='👧'&&new Set(Object.values(av)).size===3,'avatares de Mati, Lin y Sofi distintos '+JSON.stringify(av));
 await p.evaluate(()=>NinosUI.open('ni-compartimos','story'));await p.waitForTimeout(400);
 const W2=await p.evaluate(()=>[...document.querySelectorAll('.nino-line')].map(x=>[x.querySelector('.nino-who-name').textContent,x.querySelector('.nino-who').textContent]));
 ok(Object.fromEntries(W2)['Ruei']==='👧🏻'&&Object.fromEntries(W2)['Lin']==='🧒','avatar de Ruei distinto del de Lin '+JSON.stringify(Object.fromEntries(W2)));
 await p.evaluate(()=>NinosUI.open('ni-merienda','story'));await p.waitForTimeout(400);
 const W3=await p.evaluate(()=>[...document.querySelectorAll('.nino-line')].map(x=>[x.querySelector('.nino-who-name').textContent,x.querySelector('.nino-sp').textContent,x.querySelector('.nino-who').textContent]));
 ok(W3.length===9&&W3[8][0]==='Mati'&&W3[8][1]==='¡Yo sí quiero más!'&&W3[8][2]==='👦🏽'&&W3[7][1]==='No, gracias. ¡Estoy lleno!','merienda: Mati llega al final con su avatar (9 líneas, las demás intactas) '+JSON.stringify(W3[8]));
 for(const id of ['ni-compartimos','ni-mati','ni-escondidas']){await p.evaluate(i=>NinosUI.open(i,'play'),id);await p.waitForTimeout(250);
  ok(await p.evaluate(()=>NinosUI.state().n===9&&NinosUI.state().view==='play'),id+': el juego tiene 9 pasos');await play(p,'rrrrrrrrr'.split(''));
  ok(await p.evaluate(()=>document.querySelector('.nino-end-stars').getAttribute('aria-label')==='3 / 3'),id+': se completa con 3 estrellas');}
 ok(errs.length===0,'Ruei y Mati sin errores '+errs);await ctx.close();}
const bad=crs.filter(([,c])=>c<4.5);bad.forEach(([m,c])=>ok(false,'contraste '+m+' = '+c));ok(bad.length===0,'contraste de '+crs.length+' elementos de texto ≥ 4,5:1 (mín '+Math.min(...crs.map(x=>x[1]))+')');
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
