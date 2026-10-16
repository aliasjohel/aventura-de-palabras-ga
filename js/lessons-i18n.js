/* Localization of legacy puzzle renderers. Labels never become game state. */
(() => {
 'use strict';
 const normalize=value=>String(value??'').replace(/\s+/g,' ').trim();
 const entries=Object.entries(I18nSpanishUI).filter(([key])=>key.startsWith('adventure.lessons.'));
 const exact=new Map(),patterns=[];
 for(const [key,text] of entries){
  const source=normalize(text),names=[];
  if(!/\{\w+\}/.test(source)){exact.set(source,key);continue;}
  const parts=source.split(/(\{\w+\})/g);
  const pattern=parts.map(part=>{
   if(/^\{\w+\}$/.test(part)){names.push(part.slice(1,-1));return '(.*?)';}
   return part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  }).join('');
  patterns.push({key,names,pattern:new RegExp('^'+pattern+'$','u'),weight:source.replace(/\{\w+\}/g,'').length});
 }
 patterns.sort((a,b)=>b.weight-a.weight);
 function resolve(text,depth=0){
  if(typeof text!=='string'||!text||depth>5)return text;
  const source=normalize(text),key=exact.get(source);
  if(key)return GameUI.resolve(GameUI.key(key));
  for(const entry of patterns){
   const match=entry.pattern.exec(source);if(!match)continue;
   const params=Object.fromEntries(entry.names.map((name,n)=>[name,resolve(match[n+1],depth+1)]));
   return GameUI.resolve(GameUI.key(entry.key,params));
  }
  // Accessibility descriptions contain a comma-separated list of directions.
  if(source.includes(', ')){
   const parts=source.split(', ');if(parts.every(part=>exact.has(part)))return parts.map(part=>resolve(part,depth+1)).join(', ');
  }
  return text;
 }
 const selector='#modalPruebaBosque, #modalMuralSantuario, #modalTutorialVersus, .tutorial-combate-real .versus-etiqueta, .tutorial-combate-real #estadoProgresoDos';
 const originals=new WeakMap();
 function slot(node,attribute){
  const value=attribute?node.getAttribute(attribute):node.nodeValue;if(!value)return;
  let slots=originals.get(node);if(!slots){slots=new Map();originals.set(node,slots);}
  let state=slots.get(attribute);if(!state||value!==state.last)state={source:value,last:value};
  const output=resolve(state.source);state.last=output;slots.set(attribute,state);
  if(output!==value){if(attribute)node.setAttribute(attribute,output);else node.nodeValue=output;}
 }
 function localize(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node=root;
  do{if(node.nodeType===Node.TEXT_NODE)slot(node,null);else if(node.nodeType===Node.ELEMENT_NODE){
   for(const attribute of ['aria-label','alt','title','data-puzzle-label'])slot(node,attribute);
  }}while((node=walker.nextNode()));
 }
 function refresh(){document.querySelectorAll(selector).forEach(localize);}
 new MutationObserver(records=>{
  const roots=new Set();for(const record of records){
   const target=record.target.nodeType===Node.ELEMENT_NODE?record.target:record.target.parentElement;
   const owner=target?.closest(selector);if(owner)roots.add(owner);
   for(const added of record.addedNodes)if(added.nodeType===Node.ELEMENT_NODE){
    if(added.matches(selector))roots.add(added);added.querySelectorAll(selector).forEach(root=>roots.add(root));
   }
  }roots.forEach(localize);
 }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','alt','title','data-puzzle-label']});
 globalThis.LessonsI18n=Object.freeze({resolve,refresh});I18n.subscribe(refresh);I18n.ready.then(refresh);refresh();
})();
