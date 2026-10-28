(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcadeRules=api;})(globalThis,()=>{
 'use strict';
 const reductions=Object.freeze({kairos:.15,t_shadow:.12,azrak:.10});
 function rivalInterval(base,rival){return Math.round(base/(1-(reductions[rival]||0)));}
 function createCategoryRotation({storage,random=Math.random}={}){
  const memory=new Map(),prefix='categoriasRivalTorreV1:';
  function next(character,themes){
   const keys=[...new Set(themes)];if(!keys.length)throw Error('La torre necesita categorías válidas.');
   const key=prefix+character,signature=keys.slice().sort().join('|');let state=memory.get(key);
   if(!state)try{state=JSON.parse(storage?.getItem(key)||'null');}catch{}
   if(state?.version!==1||state.signature!==signature||!Array.isArray(state.remaining)||new Set(state.remaining).size!==state.remaining.length||state.remaining.some(topic=>!keys.includes(topic)))state={version:1,signature,remaining:[]};
   if(!state.remaining.length){state.remaining=keys.slice();for(let i=state.remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[state.remaining[i],state.remaining[j]]=[state.remaining[j],state.remaining[i]];}}
   const topic=state.remaining.shift();memory.set(key,state);try{storage?.setItem(key,JSON.stringify(state));}catch{}
   return topic;
  }
  return Object.freeze({next});
 }
 return Object.freeze({reductions,rivalInterval,createCategoryRotation});
});
