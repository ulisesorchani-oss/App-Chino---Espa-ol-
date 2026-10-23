const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT=shots('ninos-sonidos');require('fs').mkdirSync(OUT,{recursive:true});
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
const play=async(p,pattern)=>{for(let i=0;i<pattern.length;i++){
  const info=await p.evaluate(()=>[...document.querySelectorAll('.nino-tile')].map(e=>+e.dataset.oi));
  const wrong=info.findIndex(x=>x!==0);
  if(pattern[i]==='w'){await p.click(`.nino-tile[data-oi="${info[wrong]}"]`);await p.waitForTimeout(60);}
  await p.click('.nino-tile[data-oi="0"]');await p.waitForTimeout(60);await p.click('#nino-next');await p.waitForTimeout(80);}};
// ===== datos
{const {ctx,p,errs}=await page(360,'light');
 ok(await p.evaluate(()=>NinosUI.sounds()&&NINOS_SONIDOS.cards.length===9&&NINOS_SONIDOS.listen.length===9&&NinosUI.count()===18),'datos: 9 tarjetas y 9 ítems; las lecciones siguen siendo 18');
 // la tarjeta extra aparece al final, NO cuenta como lección ni cambia el contador
 const L=await p.evaluate(()=>({cards:document.querySelectorAll('.nino-card').length,extra:document.querySelectorAll('.nino-extra').length,last:document.querySelector('#dele-list').lastElementChild.className,cnt:document.querySelectorAll('.nino-card').length+' lecciones',es:document.querySelector('.nino-extra .nino-card-es').textContent,zh:document.querySelector('.nino-extra .nino-card-zh').textContent,btns:[...document.querySelectorAll('.nino-extra .nino-go')].map(x=>[x.textContent.trim(),Math.round(x.getBoundingClientRect().height)]),ovf:document.documentElement.scrollWidth>innerWidth+1}));
 ok(L.cards===18&&L.extra===1&&/nino-extra/.test(L.last)&&L.cnt==='18 lecciones','lista: 18 lecciones + 1 tarjeta extra al final; contador «18 lecciones» ('+JSON.stringify([L.cards,L.extra,L.cnt])+')');
 ok(L.es==='Sonidos del español'&&L.zh==='西班牙语的发音'&&L.btns.every(x=>x[1]>=48)&&!L.ovf,'tarjeta extra: títulos, botones ≥48 px, sin desborde '+JSON.stringify(L));
 // R14: franja 🌱 → la tarjeta de sonidos sigue; franja 🌿 → desaparece; Todas → vuelve
 await p.click('#dele-sub .lv-chip[data-band="A"]');await p.waitForTimeout(150);
 ok(await p.evaluate(()=>document.querySelectorAll('.nino-extra').length===1),'franja 🌱: la tarjeta extra sigue');
 await p.click('#dele-sub .lv-chip[data-band="B"]');await p.waitForTimeout(150);
 ok(await p.evaluate(()=>document.querySelectorAll('.nino-extra').length===0),'franja 🌿: la tarjeta extra no aparece');
 await p.click('#dele-sub .lv-chip[data-band="all"]');await p.waitForTimeout(150);
 // leer
 await p.click('.nino-extra .nino-go[data-act="read"]');await p.waitForTimeout(400);
 const R=await p.evaluate(()=>({open:!document.getElementById('nino-pop').classList.contains('hidden'),title:document.querySelector('.nino-title').textContent,secs:document.querySelectorAll('.nino-snd').length,words:document.querySelectorAll('.nino-snd .nino-word').length,likes:document.querySelectorAll('.nino-word-like').length,
   rules:[...document.querySelectorAll('.nino-snd-rule')].every(x=>x.textContent.length>20&&/[一-鿿]/.test(x.textContent)),letters:[...document.querySelectorAll('.nino-snd-letters')].map(x=>x.textContent),ovf:document.getElementById('nino-body').scrollWidth>document.getElementById('nino-body').clientWidth+1,
   small:[...document.querySelectorAll('.nino-word')].some(b=>b.getBoundingClientRect().height<48||b.getBoundingClientRect().width<48)}));
 ok(R.open&&R.title==='Sonidos del español'&&R.secs===9,'leer: abre el visor con 9 tarjetas '+JSON.stringify([R.open,R.title,R.secs]));
 ok(R.words===37&&R.likes===33&&R.rules&&!R.ovf&&!R.small,'leer: 37 palabras tocables (33 con «≈»), reglas en chino, sin desborde ni botones chicos '+JSON.stringify([R.words,R.likes,R.rules,R.ovf,R.small]));
 ok(R.letters[1]==='H h'&&R.letters[3]==='LL ll · Y y','leer: letras '+R.letters.join('|'));
 // tocar una palabra → pide voz de esa palabra; las voces no se superponen
 const said=await p.evaluate(()=>{window.__say=[];const d=DeleLessons;const o=d.speak;d.speak=(t,b)=>{window.__say.push(t);};document.querySelector('.nino-word[data-s="1"][data-w="0"]').click();document.querySelector('.nino-word[data-s="3"][data-w="1"]').click();d.speak=o;return window.__say;});
 ok(said.join()==='hola,pollo','tocar una palabra la dice: '+said.join());
 await p.screenshot({path:OUT+'leer-360-light.png'});
 // Atrás/Esc cierra
 await p.keyboard.press('Escape');await p.waitForTimeout(250);
 ok(await p.evaluate(()=>document.getElementById('nino-pop').classList.contains('hidden')),'Esc cierra el visor');
 // jugar: 9 ítems, estrellas guardadas con el id ni-sonidos
 await p.click('.nino-extra .nino-go[data-act="play"]');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>NinosUI.state().n===9&&NinosUI.state().view==='play'&&NinosUI.state().id==='ni-sonidos'&&document.querySelectorAll('.nino-tile').length===3),'jugar: 9 pasos, 3 fichas con dibujo');
 await play(p,'rrrrrrrrr'.split(''));
 const E=await p.evaluate(()=>({stars:document.querySelector('.nino-end-stars').getAttribute('aria-label'),sc:document.querySelector('.nino-end-score').textContent,parent:document.querySelector('.nino-parent').textContent,btns:[...document.querySelectorAll('.nino-end-actions button')].map(b=>b.textContent.trim()),pb:JSON.parse(localStorage.getItem('ac_ninos_v1'))['ni-sonidos']}));
 ok(E.stars==='3 / 3'&&/9\/9/.test(E.sc)&&E.pb.stars===3&&E.pb.of===9,'resultado 9/9 → 3 estrellas y se guarda: '+JSON.stringify(E.pb));
 ok(/学过的发音/.test(E.parent)&&/H h（h 不发音）/.test(E.parent)&&E.btns.length===3&&!E.btns.some(b=>/➡️/.test(b)),'resumen para el adulto con los sonidos; sin «siguiente lección»: '+E.btns.join('|'));
 await p.screenshot({path:OUT+'fin-360-light.png'});
 await p.click('#nino-reread');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>NinosUI.state().view==='story'&&document.querySelectorAll('.nino-snd').length===9),'«Volver a leer» regresa a las tarjetas de sonidos');
 await p.keyboard.press('Escape');await p.waitForTimeout(250);
 ok(await p.evaluate(()=>document.querySelector('.nino-extra .nino-card-stars').textContent==='⭐⭐⭐'),'la lista muestra las estrellas de la tarjeta extra');
 ok(errs.length===0,'sin errores JS '+errs);await ctx.close();}
// ===== 2 estrellas y 1 estrella
{const {ctx,p}=await page(360,'light');
 await p.click('.nino-extra .nino-go[data-act="play"]');await p.waitForTimeout(300);await play(p,'rrrrrrwww'.split(''));
 ok(await p.evaluate(()=>document.querySelector('.nino-end-stars').getAttribute('aria-label')==='2 / 3'),'6/9 → 2 estrellas');
 await p.click('#nino-again');await p.waitForTimeout(300);await play(p,'rwwwwwwww'.split(''));
 ok(await p.evaluate(()=>document.querySelector('.nino-end-stars').getAttribute('aria-label')==='1 / 3'&&JSON.parse(localStorage.getItem('ac_ninos_v1'))['ni-sonidos'].stars===2),'1/9 → 1 estrella, pero se conserva la mejor (2)');
 await ctx.close();}
// ===== 繁 y temas: tarjetas en la escritura elegida; contraste sobre píxeles reales
{const {ctx,p,errs}=await page(360,'light',{ac_script_hsk:'trad'});
 await p.click('.nino-extra .nino-go[data-act="read"]');await p.waitForTimeout(400);
 const t=await p.evaluate(()=>({title:document.querySelector('.nino-title-zh').textContent,rule:document.querySelector('.nino-snd-rule').textContent,w:document.querySelector('.nino-snd[data-s="2"] .nino-word-zh').textContent,note:document.querySelector('.nino-snd-note').textContent}));
 ok(t.title==='西班牙語的發音'&&/只有 5 個元音/.test(t.rule)&&t.w==='果汁'&&/幫你記/.test(t.note),'繁: tarjetas en tradicional '+JSON.stringify(t));
 ok(errs.length===0,'繁 sin errores '+errs);await ctx.close();}
for(const th of ['light','dark','paper']){
 const {ctx,p,errs}=await page(360,th);
 crs.push([th+' extra es',await pixCr(p,await p.$('.nino-extra .nino-card-es'))],[th+' extra zh',await pixCr(p,await p.$('.nino-extra .nino-card-zh'))],[th+' extra blurb',await pixCr(p,await p.$('.nino-extra .nino-card-blurb'))],[th+' extra estrellas',await pixCr(p,await p.$('.nino-extra .nino-card-stars'))]);
 await (await p.$('.nino-extra')).screenshot({path:OUT+`extra-${th}.png`});
 await p.click('.nino-extra .nino-go[data-act="read"]');await p.waitForTimeout(400);
 for(const [k,sel] of [['intro','.nino-snd-intro'],['letras','.nino-snd-letters'],['es','.nino-snd-es'],['zh','.nino-snd-zh'],['regla','.nino-snd-rule'],['palabra','.nino-word-es'],['zh palabra','.nino-word-zh'],['like','.nino-word-like'],['nota','.nino-snd-note']]) crs.push([th+' '+k,await pixCr(p,await p.$(sel))]);
 await p.evaluate(()=>document.querySelector('.nino-snd').scrollIntoView());await p.waitForTimeout(150);await p.screenshot({path:OUT+`tarjeta-${th}.png`});
 ok(errs.length===0,th+' sin errores '+errs);await ctx.close();}
// ===== es-cn sin la pista Niños; la pista Argentina no muestra la tarjeta extra
{const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('ac_view_v1','aprender');}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1300);
 ok(await p.evaluate(()=>document.querySelectorAll('.nino-extra').length===0),'es-cn: no aparece la tarjeta extra');
 await p.evaluate(()=>setMode('cn-es'));await p.waitForTimeout(900);await p.evaluate(()=>{showView('aprender');document.getElementById('tab-lessons').click();});await p.waitForTimeout(300);
 await p.evaluate(()=>DeleLessons.showTrack('Argentina'));await p.waitForTimeout(300);
 ok(await p.evaluate(()=>document.querySelectorAll('.nino-extra').length===0),'la pista Argentina no muestra la tarjeta extra');
 ok(errs.length===0,'adultos sin errores '+errs);await ctx.close();}
const bad=crs.filter(([,c])=>c<4.5);bad.forEach(([m,c])=>ok(false,'contraste '+m+' = '+c));ok(bad.length===0,'contraste de '+crs.length+' elementos de texto ≥ 4,5:1 (mín '+Math.min(...crs.map(x=>x[1]))+')');
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
