const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');
const OUT = shots('lecciones-tocfl-contraste');
function lum(c){const a=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2];}
const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};
const parse=s=>{const m=s.match(/[\d.]+/g).map(Number);return {rgb:m.slice(0,3),a:m.length>3?m[3]:1};};
const blend=(f,b)=>f.rgb.map((v,i)=>Math.round(v*f.a+b[i]*(1-f.a)));
const L=[['tocfl-a2-yeshi','A2'],['tocfl-a2-jieyun','A2'],['tocfl-b1-kaihue','B1'],['tocfl-b1-shouji','B1'],['tocfl-c1-dushi','C1'],['tocfl-c1-luyan','C1'],['tocfl-prep-gongyuan','Prep']];
(async()=>{const b=await chromium.launch({...LAUNCH});
let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};const minCr={};
for(const th of ['light','dark','paper']) for(const sc of ['trad','simp']) for(const [id,lv] of L){
 const ctx=await b.newContext({viewport:{width:360,height:740},deviceScaleFactor:2,serviceWorkers:'block'});
 await ctx.addInitScript(([th,sc,lv])=>{localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('theme',th);localStorage.setItem('ac_lesson_level','tocfl:'+lv);if(sc==='simp')localStorage.setItem('ac_script_tocfl','simp');},[th,sc,lv]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(APP_URL);await p.waitForTimeout(1100);await p.evaluate(()=>showView('aprender'));
 await p.click('.lq-btn[data-act="read"][data-id="'+id+'"]');await p.waitForTimeout(250);await p.click('#lq-gloss-continue').catch(()=>{});await p.waitForTimeout(250);
 const r=await p.evaluate(([id,sc])=>{const l=GRADED_LESSONS.find(x=>x.id===id);const Ls=[...document.querySelectorAll('.lq-line')];
   const rows=Ls.map((el,i)=>{const w=el.querySelector('.lq-line-who');const ln=l.lines[i];return {want:ln.who?(sc==='trad'?ln.whoT:ln.who):'',got:w?w.firstChild.textContent:'',cls:w?w.className.match(/lq-who-(\w)/)[1]:'',kara:!(w&&w.querySelector('.lq-ch'))&&el.querySelectorAll('.lq-ch').length===((el.querySelector('.lq-line-say').dataset.zh.match(/[㐀-鿿豈-﫿]/g)||[]).length),say:el.querySelector('.lq-line-say').dataset.zh,first:el.querySelector('.lq-line-zh').textContent.slice(0,6)};});
   const col={};document.querySelectorAll('.lq-line-who').forEach(w=>{const c=w.className.match(/lq-who-(\w)/)[1];if(!col[c])col[c]={fg:getComputedStyle(w).color,bg:getComputedStyle(w).backgroundColor,line:getComputedStyle(w.closest('.lq-line')).backgroundColor};});
   return {rows,col};},[id,sc]);
 const tag=`${th}/${sc}/${id}`;
 ok(r.rows.every(x=>x.want===x.got),tag+' etiquetas = who/whoT');
 const per={};r.rows.forEach(x=>{if(x.got){per[x.got]=per[x.got]||new Set();per[x.got].add(x.cls);}});
 ok(Object.values(per).every(s=>s.size===1),tag+' un color fijo por persona');
 ok(new Set(Object.values(per).map(s=>[...s][0])).size===Object.keys(per).length,tag+' personas distintas = colores distintos');
 ok(r.rows.every(x=>x.kara),tag+' karaoke intacto');
 ok(r.rows.every(x=>!x.got||!x.say.startsWith(x.got)),tag+' el audio no lee el nombre');
 ok(r.rows.every(x=>!/^[^：，。]{1,8}：/.test(x.first)||id==='tocfl-b1-kaihue'),tag+' sin prefijos en el texto');
 ok(r.rows.every(x=>!x.first.startsWith('（旁白）')),tag+' sin （旁白）');
 for(const [c,v] of Object.entries(r.col)){const bg=blend(parse(v.bg),parse(v.line).rgb);const k=cr(parse(v.fg).rgb,bg);const key=th+' '+c;minCr[key]=Math.min(minCr[key]||99,k);ok(k>=4.5,tag+' contraste '+c+' '+k.toFixed(2));}
 ok(!errs.length,tag+' errores JS '+errs.join('/'));
 if(sc==='trad'&&(id==='tocfl-c1-dushi'||(th==='light'&&id==='tocfl-a2-yeshi'))) await p.screenshot({path:`${OUT}${th}-${id}.png`,clip:{x:0,y:0,width:360,height:740}});
 if(sc==='simp'&&th==='dark'&&id==='tocfl-c1-luyan'){await p.click('#lq-story-pinyin');await p.waitForTimeout(250);await p.screenshot({path:`${OUT}dark-simp-pinyin-${id}.png`,clip:{x:0,y:0,width:360,height:740}});}
 await ctx.close();}
console.log('contraste mínimo por tema y color:',Object.entries(minCr).map(([k,v])=>k+' '+v.toFixed(2)).join(' · '));
await b.close();console.log('comprobaciones '+n+' · FAILS '+fails);})();
