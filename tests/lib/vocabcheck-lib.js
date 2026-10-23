// Verificador de vocabulario por nivel: se inyecta en la página (usa EMBEDDED_MODULE_DATA y zhSegmentAll reales).
window.VC=(function(){
 const MODS={'TOCFL-Prep':['TOCFL-Prep'],'TOCFL-A1':['TOCFL-Prep','TOCFL-A1'],'HSK1':['HSK1']};
 const cache={};
 function sets(k){if(cache[k])return cache[k];const words=new Set(),chars=new Set();
  MODS[k].forEach(m=>EMBEDDED_MODULE_DATA[m].forEach(e=>{[e[0],e[1]].forEach(w=>{if(!w)return;words.add(w);Array.from(w).forEach(c=>chars.add(c));});}));
  // alias de caracteres simplificado↔tradicional del propio vocabulario
  return cache[k]={words,chars};}
 const HAN=/[㐀-鿿]/;
 function check(k,text,extra){const {words,chars}=sets(k);const ex=new Set(extra||[]);const seg=zhSegmentAll(text).filter(s=>HAN.test(s));
  const out=[];let ok=0;
  seg.forEach(w=>{if(words.has(w)||ex.has(w)){ok++;return;}
   if(Array.from(w).every(c=>chars.has(c))){ok++;return;} // compuesto de caracteres del nivel
   out.push(w);});
  const strict=seg.filter(w=>words.has(w)||ex.has(w)).length;return {n:seg.length,ok,cov:seg.length?ok/seg.length:1,strict:seg.length?strict/seg.length:1,out};}
 return {check,sets};
})();
