(() => {
  'use strict';
  const bindings=new Set(),slots=new WeakMap();
  const key=(name,params={})=>({i18nKey:name,params:params.coins!==undefined?{count:params.coins,...params}:params});
  function resolve(value){
    if(value?.i18nError)return globalThis.I18n?.language==='es'?value.i18nError:resolve(value.fallback);
    if(value?.i18nDate){const date=new Date(value.i18nDate);return Number.isNaN(date.getTime())?'Invalid Date':globalThis.I18n?.date(date)??date.toLocaleDateString('es-AR');}
    if(!value || typeof value!=='object' || !value.i18nKey)return String(value??'');
    const params=Object.fromEntries(Object.entries(value.params).map(([name,item])=>[name,resolve(item)]));
    // An older installed worker can still serve the previous core during an update.
    const translated=globalThis.I18n?.resolve?.(value.i18nKey,params);
    return translated??(globalThis.I18nSpanishUI?.[value.i18nKey]??value.i18nKey).replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g,(_,name)=>params[name]??'{'+name+'}');
  }
  function bind(node,value,attribute){
    if(!node)return;
    let targets=slots.get(node);if(!targets){targets=new Map();slots.set(node,targets);}
    const previous=targets.get(attribute);if(previous)bindings.delete(previous);
    if(attribute==='text')node.removeAttribute?.('data-i18n');
    else node.removeAttribute?.('data-i18n-'+attribute);
    const output=resolve(value);
    let target=node;
    if(attribute==='text'){target=document.createTextNode(output);node.replaceChildren(target);}
    else node.setAttribute(attribute,output);
    if(value && typeof value==='object' && (value.i18nKey||value.i18nError)){
      const binding={target:new WeakRef(target),value,attribute,last:output};
      targets.set(attribute,binding);bindings.add(binding);
    }else targets.delete(attribute);
  }
  function refresh(){
    for(const binding of bindings){
      const node=binding.target.deref();
      if(!node || !node.isConnected){bindings.delete(binding);continue;}
      const current=binding.attribute==='text'?node.nodeValue:node.getAttribute(binding.attribute);
      // A later nontranslated value (e.g. a player's alias) owns the slot.
      if(current!==binding.last){bindings.delete(binding);continue;}
      const output=resolve(binding.value);
      if(binding.attribute==='text')node.nodeValue=output;else node.setAttribute(binding.attribute,output);
      binding.last=output;
    }
  }
  function rankBadge(points,progress=false){
    const node=VersusRanks.badge(points,progress),score=VersusRanks.points(points),d=VersusRanks.division(score);
    const rankName=division=>key('profile.rankDivision',{rank:key('profile.ranks.'+division.rank.key+'.name'),division:division.number?' '+division.number:''});
    const name=rankName(d),copy=node.children[1];
    bind(copy.children[0],name,'text');bind(copy.children[1],key('profile.ranks.'+d.rank.key+'.title'),'text');
    bind(node.querySelector('img'),key('profile.rankBadge',{rank:name}),'alt');
    if(progress){
      const next=d.next===null?null:rankName(VersusRanks.division(d.next));
      bind(copy.children[2],d.next===null?key('profile.rankMaximum',{points:score}):key('profile.rankProgress',{points:score,next:d.next,rank:next}),'text');
      if(next)bind(copy.querySelector('progress'),key('profile.rankProgressLabel',{rank:next}),'aria-label');
    }
    return node;
  }
  function error(value,fallback='errors.interfaceFailure'){
    const message=String(value?.message??value??'');
    const known=Object.entries(globalThis.I18nSpanishUI||{}).find(([name,text])=>name.startsWith('errors.')&&text===message);
    if(known)return key(known[0]);
    const missing=message.match(/^Te faltan (\d+) monedas\.$/);if(missing)return key('errors.missingCoins',{coins:missing[1]});
    if(message)console.warn('Interface operation failed:',message);
    // Unknown backend messages stay intact in Spanish; other locales get a clear UI notice.
    return message?{i18nError:message,fallback:key(fallback)}:key(fallback);
  }
  globalThis.GameUI=Object.freeze({key,resolve,text:(node,value)=>bind(node,value,'text'),attribute:(node,name,value)=>bind(node,value,name),rankBadge,error});
  I18n.subscribe(refresh);I18n.ready.then(refresh);
})();
