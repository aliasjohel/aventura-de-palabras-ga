(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CosmeticStore=api.create(root.localStorage);
})(globalThis,()=>{
  'use strict';
  const key='aventuraTiendaV1';
  const catalog=Object.freeze([
    Object.freeze({id:'aren-bosque',character:'explorador',hero:'Aren',name:'Guardián del Bosque',price:200,description:'Cuero esmeralda, hojas de bronce y espíritu de explorador.',poses:['base','preparacion','ataque','habilidad','impacto']}),
    Object.freeze({id:'zafir-celestial',character:'mago',hero:'Zafir',name:'Celestial',price:250,description:'Una túnica de estrellas y un báculo de luz azul.',poses:['base','ataque','impacto']}),
    Object.freeze({id:'kairos-real',character:'kairos',hero:'Kairós',name:'Relojero Real',price:300,description:'Engranajes dorados y un abrigo digno del guardián del tiempo.',poses:['base','ataque','impacto']}),
  ]);
  const find=id=>catalog.find(item=>item.id===id);
  const cinemaPoses=Object.freeze(['planta','mano','vidrio','envejecido','anciano','final']);
  const integer=value=>Number.isSafeInteger(value)&&value>=0?value:0;
  function normalizeSkins(value){
    const result={};
    for(const item of catalog) if(value?.[item.character]===item.id) result[item.character]=item.id;
    return result;
  }
  function asset(id,pose='base'){
    const item=find(id);if(!item)return null;
    if(id==='kairos-real'&&pose==='final')pose='ataque';
    return `assets/images/trajes/${id}-${item.poses.includes(pose)||cinemaPoses.includes(pose)?pose:'base'}-v1.png`;
  }
  function create(storage){
    function read(){
      const raw=storage.getItem(key);
      if(!raw){
        let legacy={};try{legacy=JSON.parse(storage.getItem('progresoAventuraGA')||'{}');}catch(_){}
        const state={coins:integer(legacy?.monedas),owned:[],equipped:{}};
        storage.setItem(key,JSON.stringify(state));return state;
      }
      let value;try{value=JSON.parse(raw);}catch(_){throw Error('No pudimos leer tus compras. No se cobró ninguna moneda.');}
      if(!value||typeof value!=='object')throw Error('No pudimos leer tus compras. No se cobró ninguna moneda.');
      const owned=[...new Set((Array.isArray(value.owned)?value.owned:[]).filter(id=>find(id)))];
      const equipped=normalizeSkins(value.equipped);
      for(const char of Object.keys(equipped)) if(!owned.includes(equipped[char]))delete equipped[char];
      return {coins:integer(value.coins),owned,equipped};
    }
    function save(state){storage.setItem(key,JSON.stringify(state));return state;}
    function purchase(id){
      const item=find(id);if(!item)throw Error('Este traje no está disponible.');
      const state=read();
      if(state.owned.includes(id))return state;
      if(state.coins<item.price)throw Error(`Te faltan ${item.price-state.coins} monedas.`);
      state.coins-=item.price;state.owned.push(id);return save(state);
    }
    function equip(character,id){
      const state=read();
      if(id){const item=find(id);if(!item||item.character!==character||!state.owned.includes(id))throw Error('Primero conseguí este traje.');state.equipped[character]=id;}
      else delete state.equipped[character];
      return save(state);
    }
    function earn(amount){
      if(!Number.isSafeInteger(amount)||amount<=0)throw Error('Cantidad de monedas inválida.');
      const state=read();if(!Number.isSafeInteger(state.coins+amount))throw Error('Saldo fuera de rango.');
      state.coins+=amount;return save(state).coins;
    }
    return Object.freeze({key,catalog,find,asset,normalizeSkins,read,purchase,equip,earn});
  }
  return {key,catalog,find,asset,normalizeSkins,create};
});
