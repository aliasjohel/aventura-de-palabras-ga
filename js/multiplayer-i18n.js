/* Presentation adapter for the legacy online UI. Player aliases remain literal. */
(() => {
 'use strict';
 const entries=Object.entries(I18nSpanishUI).filter(([key])=>key.startsWith('multiplayer.legacy.')).map(([key,source])=>{
  const names=[];const pattern=source.split(/(\{\w+\})/g).map(part=>{if(/^\{\w+\}$/.test(part)){names.push(part.slice(1,-1));return '(.*?)';}return part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}).join('');
  return {key,source,names,pattern:new RegExp('^'+pattern+'$','u')};
 }).sort((a,b)=>a.names.length-b.names.length||b.source.length-a.source.length);
 function value(text){
  if(typeof text!=='string'||!text)return text;
  for(const entry of entries){const match=entry.pattern.exec(text);if(!match)continue;return GameUI.key(entry.key,Object.fromEntries(entry.names.map((name,n)=>[name,name==='detail'?GameUI.error(new Error(match[n+1]),'multiplayer.failure'):match[n+1]])));}
  return globalThis.CombatUI?.value?.(text)??text;
 }
 function error(input){const message=String(input?.message??input??'');if(!message)return '';const translated=value(message);return typeof translated==='string'?GameUI.error(input,'multiplayer.failure'):translated;}
 globalThis.OnlineUI=Object.freeze({value,error,text:(node,text)=>GameUI.text(node,value(text))});
})();
