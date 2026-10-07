(function(root,factory){
  'use strict';
  if(typeof module==='object'&&module.exports){module.exports=factory();return;}
  const api=factory(),base=new URL('../locales/',document.currentScript.src);
  let storage=null;try{storage=root.localStorage;}catch(_){}
  const instance=api.create({document,storage,deviceLanguages:()=>navigator.languages?.length?navigator.languages:[navigator.language],
    loadJson:async path=>{const response=await fetch(new URL(path,base));if(!response.ok)throw Error(`i18n resource unavailable: ${path}`);return response.json();}});
  root.I18n=instance;
  instance.ready=instance.init().then(()=>{instance.apply();return true;}).catch(error=>{console.warn('i18n: original Spanish HTML retained',error);return false;});
  root.addEventListener('languagechange',()=>{if(instance.preference==='auto')void instance.setPreference('auto',{persist:false}).catch(()=>{});});
  root.addEventListener('storage',event=>{if(event.key===api.preferenceKey)void instance.setPreference(event.newValue||'auto',{persist:false}).catch(()=>{});});
})(globalThis,()=>{
  'use strict';
  const preferenceKey='aventuraIdiomaV1';
  function create({loadJson,document:doc=null,storage=null,deviceLanguages=()=>[],report=message=>console.warn(message)}){
    const catalogs=new Map(),reported=new Set(),listeners=new Set();
    let registry=null,initialized=false,initialization=null,language='es',preference='auto',generation=0;
    const diagnostic=message=>{if(!reported.has(message)){reported.add(message);report(message);}};
    const formatLocale=id=>registry?.languages.find(item=>item.id===id)?.locale||registry?.formatLocale||'es-AR';
    const valid=value=>value==='auto'||registry?.languages.some(item=>item.id===value);
    function detect(){
      for(const candidate of deviceLanguages()||[]){
        const code=String(candidate).toLowerCase().replaceAll('_','-');
        const match=registry.languages.find(item=>item.id.toLowerCase()===code||item.matches?.some(prefix=>code===prefix||code.startsWith(prefix+'-')));
        if(match)return match.id;
      }
      return registry.defaultLanguage;
    }
    function lookup(id,key){
      if(typeof key!=='string'||!key.includes('.'))return undefined;
      const [namespace,...parts]=key.split('.');let value=catalogs.get(id)?.get(namespace);
      for(const part of parts){if(!value||typeof value!=='object'||!Object.hasOwn(value,part))return undefined;value=value[part];}
      return value;
    }
    function interpolate(value,id,params){
      if(value&&typeof value==='object'){
        const count=Number(params.count);if(!Number.isFinite(count))return undefined;
        value=value[new Intl.PluralRules(formatLocale(id)).select(count)]??value.other;
      }
      if(typeof value!=='string')return undefined;
      let complete=true;
      const text=value.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g,(placeholder,name)=>{if(!Object.hasOwn(params,name)){complete=false;return placeholder;}return String(params[name]);});
      return complete?text:undefined;
    }
    function translation(key,params={}){
      const value=interpolate(lookup(language,key),language,params);
      return value??interpolate(lookup(registry?.fallbackLanguage||'es',key),registry?.fallbackLanguage||'es',params);
    }
    function t(key,params={}){const value=translation(key,params);if(value===undefined)diagnostic(`i18n: missing key or parameters: ${key}`);return value??key;}
    function apply(scope=doc){
      if(!initialized||!scope)return;
      const selector='[data-i18n], [data-i18n-aria-label], [data-i18n-title], [data-i18n-placeholder], [data-i18n-alt]';
      const nodes=[...scope.querySelectorAll(selector)];if(scope.matches?.(selector))nodes.unshift(scope);
      for(const node of nodes)for(const attribute of ['text','aria-label','title','placeholder','alt']){
        const key=node.getAttribute(attribute==='text'?'data-i18n':`data-i18n-${attribute}`);if(!key)continue;
        const value=translation(key);if(value===undefined){diagnostic(`i18n: original text retained for ${key}`);continue;}
        if(attribute==='text'){if(node.children.length){diagnostic(`i18n: text binding requires a leaf: ${key}`);continue;}if(node.textContent!==value)node.textContent=value;}
        else if(node.getAttribute(attribute)!==value)node.setAttribute(attribute,value);
      }
    }
    async function loadLanguage(id){
      if(!catalogs.has(id))catalogs.set(id,new Map());
      const target=catalogs.get(id);
      await Promise.all(registry.namespaces.map(async namespace=>{
        if(target.has(namespace))return;
        try{const values=await loadJson(`${id}/${namespace}.json`);if(!values||Array.isArray(values)||typeof values!=='object')throw Error('Invalid catalog');target.set(namespace,values);}
        catch(_){diagnostic(`i18n: catalog unavailable: ${id}/${namespace}`);}
      }));
    }
    function notify(){if(doc?.documentElement)doc.documentElement.lang=formatLocale(language);apply();listeners.forEach(listener=>listener());}
    async function setPreference(value,{persist=true}={}){
      await init();if(!valid(value))value='auto';
      const version=++generation,id=value==='auto'?detect():value;
      await loadLanguage(registry.fallbackLanguage);if(id!==registry.fallbackLanguage)await loadLanguage(id);
      if(version!==generation)return {applied:false,saved:false};
      preference=value;language=id;let saved=!persist;
      if(persist){try{if(!storage)throw Error('Storage unavailable');storage.setItem(preferenceKey,value);saved=true;}catch(_){diagnostic('i18n: preference could not be saved');}}
      notify();return {applied:true,saved};
    }
    async function initialize(){
      registry=await loadJson('languages.json');
      if(registry.defaultLanguage!=='es'||registry.fallbackLanguage!=='es'||!registry.languages.some(item=>item.id==='es'))throw Error('Spanish fallback required');
      try{const stored=storage?.getItem(preferenceKey);preference=valid(stored)?stored:'auto';}catch(_){preference='auto';}
      language=preference==='auto'?detect():preference;
      await loadLanguage('es');if(language!=='es')await loadLanguage(language);initialized=true;notify();
    }
    function init(){if(!initialization)initialization=initialize().catch(error=>{initialization=null;throw error;});return initialization;}
    return {init,t,apply,setPreference,subscribe:listener=>{listeners.add(listener);return ()=>listeners.delete(listener);},
      get language(){return language;},get preference(){return preference;},get fallbackLanguage(){return registry?.fallbackLanguage||'es';},
      get languages(){return registry?.languages.map(item=>({...item}))||[];},
      number:(value,options)=>new Intl.NumberFormat(formatLocale(language),options).format(value),
      date:(value,options)=>new Intl.DateTimeFormat(formatLocale(language),options).format(value)};
  }
  return Object.freeze({create,preferenceKey});
});
