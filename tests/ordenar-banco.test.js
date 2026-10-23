const { chromium, LAUNCH, APP_URL, shots } = require('./lib/env');const fs=require('fs');
const URL=APP_URL;
// ── Lista ESCRITA A MANO (independiente del código y de los datos): órdenes aceptados por oración.
//    [simplificado, tradicional, [variantes simp], [variantes trad], estado]  — del cuadro A/B/C que revisa el usuario.
const EXPECT={
 'TOCFL-Prep':{
  'prep-o2':['他有两个孩子','他有兩個孩子',[],[],'ok'],'prep-o3':['这本书很便宜','這本書很便宜',[],[],'ok'],'prep-o7':['那个学生很高','那個學生很高',[],[],'ok'],
  'prep-o4':['我喜欢吃水果','我喜歡吃水果',['水果我喜欢吃'],['水果我喜歡吃'],'ok'],'prep-o5':['弟弟想喝牛奶','弟弟想喝牛奶',['牛奶弟弟想喝'],['牛奶弟弟想喝'],'ok'],'prep-o8':['我可以坐这里吗','我可以坐這裡嗎',['这里我可以坐吗'],['這裡我可以坐嗎'],'ok'],
  'prep-o9':['这碗面很好吃','這碗麵很好吃',[],[],'ok'],'prep-o10':['教室里有很多学生','教室裡有很多學生',[],[],'ok'],'prep-o11':['你家有几个房间','你家有幾個房間',[],[],'ok'],'prep-o12':['我的电脑很新','我的電腦很新',[],[],'ok'],
  'prep-o13':['他的手机很旧','他的手機很舊',[],[],'ok'],'prep-o14':['这个蛋糕很甜','這個蛋糕很甜',[],[],'ok'],'prep-o15':['桌子上有一本书','桌子上有一本書',[],[],'ok'],
  'prep-o16':['我有两个弟弟','我有兩個弟弟',[],[],'ok'],'prep-o17':['桌子上有三杯咖啡','桌子上有三杯咖啡',[],[],'ok'],'prep-o18':['请你坐在这里','請你坐在這裡',[],[],'ok'],'prep-o19':['我是昨天来的','我是昨天來的',[],[],'ok']},
 'TOCFL-A1':{
  'a1-o2':['他不想去上班','他不想去上班',[],[],'ok'],'a1-o3':['图书馆的书很多','圖書館的書很多',[],[],'ok'],'a1-o5':['这家商店的衣服很便宜','這家商店的衣服很便宜',[],[],'ok'],'a1-o8':['请你把窗关上','請你把窗關上',[],[],'ok'],
  'a1-o4':['我想看那部电影','我想看那部電影',['那部电影我想看'],['那部電影我想看'],'ok'],'a1-o7':['我朋友喜欢吃辣的','我朋友喜歡吃辣的',['辣的我朋友喜欢吃'],['辣的我朋友喜歡吃'],'ok'],
  'a1-o9':['这件外套很轻','這件外套很輕',[],[],'ok'],'a1-o10':['老板的办公室很大','老闆的辦公室很大',[],[],'ok'],'a1-o11':['厨房里有很多东西','廚房裡有很多東西',[],[],'ok'],'a1-o12':['这个城市很大','這個城市很大',[],[],'ok'],
  'a1-o13':['他的头发很长','他的頭髮很長',[],[],'ok'],'a1-o14':['我的房租很贵','我的房租很貴',[],[],'ok'],'a1-o15':['冰箱里有很多水果','冰箱裡有很多水果',[],[],'ok'],'a1-o16':['洗手间在哪里','洗手間在哪裡',[],[],'ok'],
  'a1-o17':['请你把书放在桌子上','請你把書放在桌子上',[],[],'ok'],'a1-o18':['我把手机放在家里','我把手機放在家裡',[],[],'ok'],'a1-o19':['他把钱包忘在家里了','他把錢包忘在家裡了',[],[],'ok'],
  'a1-o20':['他是从台湾来的','他是從台灣來的',[],[],'ok'],'a1-o21':['我们班有二十个学生','我們班有二十個學生',[],[],'ok'],'a1-o22':['房间里有两张床','房間裡有兩張床',[],[],'ok']},
 'HSK1':{
  'h1-o3':['这本书很好看','這本書很好看',[],[],'ok'],'h1-o6':['你想去哪儿','你想去哪兒',[],[],'ok'],'h1-o7':['弟弟不想吃肉','弟弟不想吃肉',[],[],'ok'],'h1-o8':['这个手机不贵','這個手機不貴',[],[],'ok'],
  'h1-o2':['他喜欢看电影','他喜歡看電影',['电影他喜欢看'],['電影他喜歡看'],'ok'],'h1-o4':['妈妈想买衣服','媽媽想買衣服',['衣服妈妈想买'],['衣服媽媽想買'],'ok'],'h1-o5':['我的朋友会说汉语','我的朋友會說漢語',['汉语我的朋友会说'],['漢語我的朋友會說'],'ok'],
  'h1-o9':['这杯茶很热','這杯茶很熱',[],[],'ok'],'h1-o10':['我的手机很新','我的手機很新',[],[],'ok'],'h1-o11':['这个杯子很大','這個杯子很大',[],[],'ok'],'h1-o12':['学校的书店很大','學校的書店很大',[],[],'ok'],
  'h1-o13':['你的名字很好听','你的名字很好聽',[],[],'ok'],'h1-o14':['书包里有三本书','書包裡有三本書',[],[],'ok'],'h1-o15':['你的书包很重','你的書包很重',[],[],'ok'],
  'h1-o16':['我有三个朋友','我有三個朋友',[],[],'ok'],'h1-o17':['桌子上有两杯茶','桌子上有兩杯茶',[],[],'ok'],'h1-o18':['请你坐在这儿','請你坐在這兒',[],[],'ok'],
  'h1-o19':['请你等一下儿','請你等一下兒',[],[],'ok'],'h1-o20':['我是从北京来的','我是從北京來的',[],[],'ok'],'h1-o21':['我家有四口人','我家有四口人',[],[],'ok']}};
const RETIRED=['prep-o1','prep-o6','a1-o1','a1-o6','h1-o1']; // las 5 dudosas: ya no están
(async()=>{const b=await chromium.launch({...LAUNCH});let fails=0,n=0;const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL '+m);}};
const ctx=await b.newContext({viewport:{width:360,height:740},serviceWorkers:'block'});
await ctx.addInitScript(()=>{if(!sessionStorage.getItem('_i')){sessionStorage.setItem('_i','1');localStorage.setItem('ac_onboarding_done_v2','1');localStorage.setItem('ac_seen_modsheet','1');localStorage.setItem('ac_view_v1','entrenar');}});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL);await p.waitForTimeout(1500);
await p.addScriptTag({content:fs.readFileSync(__dirname+'/lib/vocabcheck-lib.js','utf8')});

// ===== A. datos
const D=await p.evaluate((EXPECT)=>{const out={};const TU=/\b(tú|tienes|quieres|puedes|eres|haces|piensas|prefieres|sabes|necesitas)\b/i;
 const strip=s=>s.replace(/[。！？!?.，,、；：「」『』…\s]/g,'');const les=[];GRADED_LESSONS.forEach(l=>l.lines.forEach(x=>{les.push(strip(x.zh));if(x.zhT)les.push(strip(x.zhT));}));
 const allZh=[];const ids=new Set();
 for(const k of Object.keys(EXPECT)){const trad=k!=='HSK1';const O=EXPECT_ITEMS=EXAM_ITEMS[k].orders;const o={n:O.length,ids:O.map(x=>x.id),bad:[],active:O.filter(x=>x.st==='ok').length,pend:O.filter(x=>x.st==='pend').length};
  O.forEach(x=>{ if(ids.has(x.id))o.bad.push('id repetido '+x.id);ids.add(x.id);
   if(x.w.join('')!==x.zh||x.wT.join('')!==x.zhT)o.bad.push('fichas≠oración '+x.id);
   if(x.w.length<3||x.w.length>9||x.w.length!==x.wT.length)o.bad.push('fichas '+x.id);
   if(/[，、；：「」。！？,.]/.test(x.zh+x.zhT))o.bad.push('puntuación '+x.id);
   if(!['ok','pend'].includes(x.st))o.bad.push('st '+x.id);
   (x.alt||[]).forEach((a,i)=>{const T=x.altT[i];if([...a].sort().join('')!==[...x.zh].sort().join('')||[...T].sort().join('')!==[...x.zhT].sort().join('')||a===x.zh)o.bad.push('alt inválida '+x.id);
     // una variante tiene que ser una permutación de las FICHAS (no solo de los caracteres)
     const rest=x.w.slice();let pos=0,okc=true;const used=[];while(pos<a.length){const j=rest.findIndex(c=>a.startsWith(c,pos));if(j<0){okc=false;break;}pos+=rest[j].length;rest.splice(j,1);}if(!okc||rest.length)o.bad.push('alt no es permutación de fichas '+x.id);});
   const nat=trad?x.zhT:x.zh;const c=VC.check(k,nat);if(c.cov<1)o.bad.push('nivel '+x.id+' '+c.out.join(','));
   if(les.some(s=>s===x.zh||s===x.zhT||(s.length>=4&&(s.includes(x.zh)||s.includes(x.zhT)))))o.bad.push('está en una lección '+x.id);
   if(allZh.includes(x.zh))o.bad.push('oración repetida '+x.id);allZh.push(x.zh);
   if(TU.test(x.es))o.bad.push('tuteo '+x.id);if(!x.es||x.es.length<8)o.bad.push('es '+x.id);});
  out[k]=o;}
 return out;},EXPECT);
for(const k of Object.keys(EXPECT)){const o=D[k];const want=Object.keys(EXPECT[k]);
 ok(JSON.stringify(o.ids)===JSON.stringify(want),'datos '+k+': mismos ids y orden que la lista escrita a mano '+o.ids.join());
 ok(o.bad.length===0,'datos '+k+': fichas, variantes = permutación de fichas, nivel 100 %, sin lecciones ni repetidas, sin tuteo '+JSON.stringify(o.bad.slice(0,6)));
 ok(o.active===want.filter(i=>EXPECT[k][i][4]==='ok').length&&o.pend===want.filter(i=>EXPECT[k][i][4]==='pend').length,'datos '+k+': activas/pendientes = '+o.active+'/'+o.pend);
 ok(o.n>=9&&o.n<=20,'datos '+k+': banco de 9 a 20 = '+o.n);}
ok(D['TOCFL-Prep'].active===17&&D['TOCFL-A1'].active===20&&D.HSK1.active===20&&D['TOCFL-Prep'].pend+D['TOCFL-A1'].pend+D.HSK1.pend===0,'activas: Prep 17, A1 20, HSK 1 20 (ninguna pendiente)');
ok(await p.evaluate((R)=>R.every(id=>!Object.values(EXAM_ITEMS).some(l=>l.orders.some(o=>o.id===id))),RETIRED),'las 5 dudosas ya no están en el banco');

// ===== B. TODAS las permutaciones: se aceptan el original y las variantes, se rechaza el resto
const B=await p.evaluate((EXPECT)=>{const perm=(a)=>a.length<=1?[a]:a.flatMap((x,i)=>perm([...a.slice(0,i),...a.slice(i+1)]).map(r=>[x,...r]));
 const res=[];for(const k of Object.keys(EXPECT)){for(const o of EXAM_ITEMS[k].orders){for(const trad of [false,true]){
   const e=EXPECT[k][o.id];const want=new Set([trad?e[1]:e[0]].concat(trad?e[3]:e[2]));const it=ExamDebug.bankOrder(o,trad);const words=trad?o.wT:o.w;
   const seen=new Set();let acc=0,tot=0,wrongAcc=[],missed=[];
   perm(words.map((w,i)=>i)).forEach(pi=>{const s=pi.map(i=>words[i]).join('');if(seen.has(s))return;seen.add(s);tot++;const a=ExamDebug.accepts(it,s);if(a)acc++;if(a&&!want.has(s))wrongAcc.push(s);if(!a&&want.has(s))missed.push(s);});
   let shownOk=0;for(let i=0;i<60;i++){const it2=ExamDebug.bankOrder(o,trad);if(ExamDebug.accepts(it2,it2.chips.join('')))shownOk++;if([...it2.chips].sort().join('|')!==[...words].sort().join('|'))shownOk++;}
   res.push({id:o.id,trad,tot,acc,want:want.size,wrongAcc,missed,shownOk,accept:it.accept.length});}}}
 return res;},EXPECT);
const bad=B.filter(r=>r.wrongAcc.length||r.missed.length||r.acc!==r.want||r.shownOk||r.accept!==r.want);
ok(bad.length===0,'permutaciones: en cada oración y escritura se aceptan SOLO el original y las variantes y se rechaza todo lo demás '+JSON.stringify(bad.slice(0,3)));
const totPerm=B.reduce((s,r)=>s+r.tot,0);ok(B.length===114&&B.every(r=>r.tot>=6),'se probaron las '+totPerm.toLocaleString('es')+' permutaciones de '+B.length+' combinaciones (oración × escritura)');
ok(B.filter(r=>r.want===2).length===16,'8 oraciones con variante × 2 escrituras aceptan exactamente 2 órdenes');

// ===== C. tandas: banco solo, 3 de «Ordenar», mezcla 5/3/6/3/3, 20 ítems
const C=await p.evaluate(()=>{const out={};for(const k of ['TOCFL-Prep','TOCFL-A1','HSK1']){localStorage.removeItem('ac_order_deck_v1');const o={bad:[],sig:{},seqs:[],cnt:{}};const act=EXAM_ITEMS[k].orders.filter(x=>x.st==='ok');const actEs=new Set(act.map(x=>x.es));const les=new Set();GRADED_LESSONS.forEach(l=>l.lines.forEach(x=>les.add(x.es)));
 for(let i=0;i<300;i++){const S=ExamDebug.build(k);const t={};S.items.forEach(it=>t[it.type]=(t[it.type]||0)+1);const sig=['listen','dialogue','cloze','reading','order'].map(x=>t[x]||0).join('/');o.sig[sig]=(o.sig[sig]||0)+1;
  if(S.items.length!==20)o.bad.push('largo '+S.items.length);const ord=S.items.filter(it=>it.type==='order');
  if(new Set(ord.map(x=>x.es)).size!==ord.length)o.bad.push('repetida en la tanda');
  ord.forEach(x=>{if(!actEs.has(x.es))o.bad.push('fuera del banco activo: '+x.zh);if(les.has(x.es))o.bad.push('de una lección: '+x.es);if(!x.accept||x.accept[0]!==x.words.join(''))o.bad.push('sin accept');if(x.accept.includes(x.chips.join('')))o.bad.push('fichas ya ordenadas');
   if(S.trad?x.words.join('')!==act.find(a=>a.es===x.es).zhT:x.words.join('')!==act.find(a=>a.es===x.es).zh)o.bad.push('escritura '+x.zh);o.cnt[x.es]=(o.cnt[x.es]||0)+1;});
  o.seqs.push(ord.map(x=>x.es));}
 out[k]={bad:o.bad.slice(0,4),sig:o.sig,seqs:o.seqs.slice(0,8),cnt:Object.values(o.cnt),act:act.length};}return out;});
for(const k of Object.keys(C)){const o=C[k];ok(o.bad.length===0,'tandas '+k+': 20 ítems, 3 «Ordenar» del banco activo, sin repetidas, sin lecciones '+JSON.stringify(o.bad));
 ok(Object.keys(o.sig).join()==='5/3/6/3/3','tandas '+k+': mezcla 5/3/6/3/3 en las 300 tandas '+JSON.stringify(o.sig));
 const mx=Math.max(...o.cnt),mn=Math.min(...o.cnt);ok(mx-mn<=1+1&&o.cnt.length===o.act,'tandas '+k+': con '+o.act+' activas todas salen y parejo (máx−mín ≤ 2): '+o.cnt.join('/'));}

// ===== D. baraja guardada: con TODAS activadas (13/14/14), sin repetir hasta agotar
const E=await p.evaluate(()=>{const out={};for(const k of ['TOCFL-Prep','TOCFL-A1','HSK1']){const keep=JSON.stringify(EXAM_ITEMS[k].orders);EXAM_ITEMS[k].orders.forEach(o=>o.st='ok');localStorage.removeItem('ac_order_deck_v1');
  const Dn=EXAM_ITEMS[k].orders.length;const seq=[];for(let i=0;i<Dn*3;i++){seq.push(ExamDebug.build(k).items.filter(it=>it.type==='order').map(x=>x.es));}
  const win=Math.floor(Dn/3);let rep=0,rep2=0,rep3=0;for(let i=0;i+win<=seq.length;i++){const s=seq.slice(i,i+win).flat();if(new Set(s).size!==s.length)rep++;}
  for(let i=0;i+1<seq.length;i++){if(seq[i].some(x=>seq[i+1].includes(x)))rep2++;}for(let i=0;i+2<seq.length;i++){const s=seq.slice(i,i+3).flat();if(new Set(s).size!==s.length)rep3++;}
  const cnt={};seq.flat().forEach(x=>cnt[x]=(cnt[x]||0)+1);const deck=ExamDebug.deck()[k];
  out[k]={Dn,win,rep,rep2,rep3,distinct:Object.keys(cnt).length,cmin:Math.min(...Object.values(cnt)),cmax:Math.max(...Object.values(cnt)),deck:deck&&Object.keys(deck).join(),ids:deck&&deck.d.concat(deck.l).every(id=>EXAM_ITEMS[k].orders.some(o=>o.id===id))};
  EXAM_ITEMS[k].orders=JSON.parse(keep);}return out;});
for(const k of Object.keys(E)){const o=E[k];ok(o.rep2===0&&o.rep3===0,'baraja '+k+' ('+o.Dn+' oraciones): ninguna se repite entre 2 ni entre 3 tandas seguidas (ventanas deslizantes sobre '+o.Dn*3+' tandas) '+JSON.stringify([o.rep2,o.rep3]));
 ok(o.distinct===o.Dn&&o.cmax-o.cmin<=1,'baraja '+k+': salen todas las oraciones y parejo ('+o.cmin+'–'+o.cmax+' veces en '+o.Dn*3+' tandas)');
 ok(o.deck==='d,l,u,i'&&o.ids,'baraja '+k+': se guarda en ac_order_deck_v1 como {d, l, u, i} con ids válidos');}
// bancos sintéticos de 3 a 14 oraciones (3000 tandas cada uno): lo que promete la baraja según el tamaño
const G=await p.evaluate(()=>{const out=[];for(const N of [3,4,5,6,7,8,9,10,11,12,13,14]){localStorage.removeItem('ac_order_deck_v1');const B={orders:Array.from({length:N},(_,i)=>({id:'s'+i,st:'ok',w:['a','b','c'],wT:['a','b','c'],es:'x'+i}))};
 const seq=[];for(let i=0;i<3000;i++)seq.push(ExamDebug.draw('SYN',B,3).map(x=>x.id));let inS=0,r2=0,r3=0;seq.forEach(s=>{if(new Set(s).size!==s.length)inS++;});
 for(let i=0;i+1<seq.length;i++)if(seq[i].some(x=>seq[i+1].includes(x)))r2++;for(let i=0;i+2<seq.length;i++){const f=seq.slice(i,i+3).flat();if(new Set(f).size!==f.length)r3++;}
 const cnt={};seq.flat().forEach(x=>cnt[x]=(cnt[x]||0)+1);const v=Object.values(cnt);out.push({N,inS,r2,r3,spread:Math.max(...v)-Math.min(...v),n:v.length});}
 localStorage.removeItem('ac_order_deck_v1');return out;});
ok(G.every(g=>g.inS===0&&g.spread<=1&&g.n===g.N),'baraja sintética 3–14: nunca repite dentro de una tanda, sale cada oración y parejo '+JSON.stringify(G.map(g=>[g.N,g.inS,g.spread])));
ok(G.filter(g=>g.N>=6).every(g=>g.r2===0),'baraja sintética: con 6 o más, ninguna oración repite en la tanda siguiente');
ok(G.filter(g=>g.N>=9).every(g=>g.r3===0),'baraja sintética: con 9 o más, ninguna se repite en 3 tandas seguidas (0 de 3000 ventanas) '+JSON.stringify(G.filter(g=>g.N>=9).map(g=>[g.N,g.r3])));
// persistencia, ids que desaparecen, JSON roto, sin storage
const F=await p.evaluate(()=>{const k='HSK1';const r={};EXAM_ITEMS[k].orders.forEach(o=>o.st='ok');localStorage.removeItem('ac_order_deck_v1');
 const a=ExamDebug.build(k).items.filter(i=>i.type==='order').map(x=>x.es);const saved=JSON.parse(localStorage.getItem('ac_order_deck_v1'))[k];r.persist=saved.l.length===3&&saved.d.length>=0&&typeof saved.i==='number';
 const keepO=EXAM_ITEMS[k].orders;EXAM_ITEMS[k].orders=keepO.filter(o=>!saved.d.slice(0,2).includes(o.id));const b=ExamDebug.build(k).items.filter(i=>i.type==='order');r.gone=b.length===3&&!JSON.parse(localStorage.getItem('ac_order_deck_v1'))[k].d.some(id=>saved.d.slice(0,2).includes(id));EXAM_ITEMS[k].orders=keepO;
 localStorage.setItem('ac_order_deck_v1','{no es json');const c=ExamDebug.build(k).items.filter(i=>i.type==='order');r.broken=c.length===3&&new Set(c.map(x=>x.es)).size===3;
 localStorage.setItem('ac_order_deck_v1','[1,2]');r.arr=ExamDebug.build(k).items.filter(i=>i.type==='order').length===3;
 const orig=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error('cuota');};let d;try{d=ExamDebug.build(k).items.filter(i=>i.type==='order');r.noStorage=d.length===3&&new Set(d.map(x=>x.es)).size===3;}catch(e){r.noStorage='lanzó '+e.message;}Storage.prototype.setItem=orig;
 // deficit: 1 sola activa → 20 ítems igual (compensa con Escuchar y Completar)
 EXAM_ITEMS[k].orders.forEach((o,i)=>o.st=i===0?'ok':'pend');localStorage.removeItem('ac_order_deck_v1');const S=ExamDebug.build(k);const t={};S.items.forEach(it=>t[it.type]=(t[it.type]||0)+1);r.deficit=S.items.length===20&&t.order===1&&t.listen===6&&t.cloze===7;
 EXAM_ITEMS[k].orders.forEach(o=>o.st='pend');const S0=ExamDebug.build(k);const t0={};S0.items.forEach(it=>t0[it.type]=(t0[it.type]||0)+1);r.cero=S0.items.length===20&&!t0.order;
 return r;});
ok(F.persist&&F.gone&&F.broken&&F.arr&&F.noStorage===true&&F.deficit&&F.cero,'baraja: persiste, filtra ids que ya no existen, tolera JSON roto/arreglo, funciona sin storage, compensa si faltan (1 → 6+7; 0 → sin Ordenar) '+JSON.stringify(F));
await p.evaluate(()=>{localStorage.removeItem('ac_order_deck_v1');});

// ===== E. pantalla: variante aceptada, orden equivocado, repaso sin gastar la baraja
const goOrder=async()=>{await p.click('#btn-exam-practice');await p.waitForTimeout(250);await p.click('.ex-lv[data-k="HSK1"]');await p.waitForTimeout(400);
 for(let g=0;g<30;g++){const t=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].type;});if(t==='order')return true;const r=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].opts.findIndex(o=>o.ok);});await p.click(`#ex-opts .lq-opt[data-i="${r}"]`);await p.click('#ex-next');await p.waitForTimeout(40);}return false;};
const place=async(str)=>{const it=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].chips.slice();});let rest=str;const idxs=[];const used=new Set();while(rest.length){const j=it.findIndex((c,i)=>!used.has(i)&&rest.startsWith(c));if(j<0)return false;used.add(j);idxs.push(j);rest=rest.slice(it[j].length);}for(const j of idxs){await p.click(`#ex-pool .ex-chip[data-i="${j}"]`);}return true;};
// 1) variante: solo h1-o2 activa (con su variante)
await p.evaluate(()=>{EXAM_ITEMS.HSK1.orders.forEach(o=>o.st=o.id==='h1-o2'?'ok':'pend');localStorage.removeItem('ac_order_deck_v1');});
ok(await goOrder(),'pantalla: llega al ítem «Ordenar»');
let u=await p.evaluate(()=>({chips:ExamDebug.state().items[ExamDebug.state().idx].chips,es:ExamDebug.state().items[ExamDebug.state().idx].es,btn:document.getElementById('ex-check').disabled,tray:document.getElementById('ex-tray').children.length}));
ok(u.chips.join('')!=='他喜欢看电影'&&u.chips.join('')!=='电影他喜欢看'&&u.btn&&u.tray===0,'pantalla: las fichas llegan desordenadas y «Comprobar» deshabilitado '+u.chips.join('|'));
ok(await place('电影他喜欢看'),'pantalla: se puede armar la variante');await p.click('#ex-check');await p.waitForTimeout(150);
let f=await p.evaluate(()=>({fb:document.getElementById('ex-fb').innerText,seg:ExamDebug.state().res.slice(-3)}));
ok(f.fb.includes('Correcto')&&f.fb.includes('电影他喜欢看')&&f.fb.includes('También se dice')&&f.fb.includes('他喜欢看电影'),'pantalla: la variante cuenta como correcta, muestra TU orden y el original: '+f.fb.replace(/\n+/g,' | '));
await p.click('#ex-close');await p.waitForTimeout(200);
// 2) el original también vale y NO muestra «También se dice»
await p.evaluate(()=>{localStorage.removeItem('ac_order_deck_v1');});ok(await goOrder(),'pantalla: 2.ª sesión llega a «Ordenar»');
ok(await place('他喜欢看电影'),'armar el original');await p.click('#ex-check');await p.waitForTimeout(150);
f=await p.evaluate(()=>document.getElementById('ex-fb').innerText);ok(f.includes('Correcto')&&!f.includes('También se dice'),'pantalla: el orden original es correcto sin aviso extra');
await p.click('#ex-close');await p.waitForTimeout(200);
// 3) orden inválido → incorrecto, muestra la oración
await p.evaluate(()=>{localStorage.removeItem('ac_order_deck_v1');});ok(await goOrder(),'3.ª sesión');
ok(await place('看电影他喜欢'),'armar un orden inválido');await p.click('#ex-check');await p.waitForTimeout(150);
f=await p.evaluate(()=>document.getElementById('ex-fb').innerText);ok(f.includes('Casi')&&f.includes('La oración era')&&f.includes('他喜欢看电影'),'pantalla: orden inválido → incorrecto y muestra la oración: '+f.replace(/\n+/g,' | '));
const ovf=await p.evaluate(()=>{const b=document.getElementById('ex-body');return b.scrollWidth>b.clientWidth+1;});ok(!ovf,'pantalla: sin desborde horizontal');
await p.click('#ex-close');await p.waitForTimeout(200);
// 4) repaso de errores: no gasta la baraja y vuelve a mostrar las fichas desordenadas
await p.evaluate(()=>{EXAM_ITEMS.HSK1.orders.forEach(o=>o.st=['h1-o3','h1-o6','h1-o7','h1-o8'].includes(o.id)?'ok':'pend');localStorage.removeItem('ac_order_deck_v1');});
await p.click('#btn-exam-practice');await p.waitForTimeout(250);await p.click('.ex-lv[data-k="HSK1"]');await p.waitForTimeout(400);
for(let g=0;g<20;g++){const t=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].type;});if(t==='order'){await p.evaluate(()=>{const S=ExamDebug.state();const it=S.items[S.idx];});await place(await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].words.slice().reverse().join('');}));await p.click('#ex-check');await p.waitForTimeout(80);}else{const r=await p.evaluate(()=>{const S=ExamDebug.state();return S.items[S.idx].opts.findIndex(o=>o.ok);});await p.click(`#ex-opts .lq-opt[data-i="${(r+1)%3}"]`);}
 const last=await p.evaluate(()=>{const S=ExamDebug.state();return S.idx===S.items.length-1;});await p.click('#ex-next');await p.waitForTimeout(40);if(last)break;}
const before=await p.evaluate(()=>localStorage.getItem('ac_order_deck_v1'));
await p.click('#ex-retry');await p.waitForTimeout(500);
const after=await p.evaluate(()=>({deck:localStorage.getItem('ac_order_deck_v1'),orders:ExamDebug.state().items.filter(i=>i.type==='order').map(i=>({sh:i.chips.join(''),ok:i.accept.includes(i.chips.join(''))})),n:ExamDebug.state().items.length,retry:ExamDebug.state().retry}));
ok(before===after.deck&&after.retry&&after.orders.length===3&&after.orders.every(o=>!o.ok),'repaso: no gasta la baraja y las fichas vuelven desordenadas '+JSON.stringify([before===after.deck,after.orders]));
ok(errs.length===0,'sin errores JS '+errs);
console.log(`comprobaciones ${n} · FAILS ${fails}`);await b.close();})();
