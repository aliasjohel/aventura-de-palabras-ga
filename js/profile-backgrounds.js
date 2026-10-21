(function(root,factory){const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;else root.ProfileBackgrounds=Object.freeze({...api,...api.create({storage:root.localStorage,account:()=>{try{return root.CosmeticStore.read().accountId||null;}catch{return null;}},request:(action,id)=>root.GameWallet.backgrounds(action,id)})});})(globalThis,root=>{
'use strict';
const catalog=Object.freeze([
  {id:'bosque',free:true},
  {id:'desierto',price:100},
  {id:'zafir',price:150},
  {id:'cumbres',world:3},
  {id:'hielo',world:4},
  {id:'azrak',rank:'diamante',points:240},
].map(Object.freeze));
const ids=new Set(catalog.map(item=>item.id));
function create({storage,account,request}){
  const pending=new Map();
  const key=id=>'aventuraFondosV1:account:'+id;
  const empty=id=>({userId:id,owned:['bosque'],equipped:'bosque',revision:-1});
  function normalize(value,id){
    if(value?.userId!==id)return empty(id);
    const owned=[...new Set(['bosque',...(Array.isArray(value.owned)?value.owned:[]).filter(item=>ids.has(item))])];
    return {userId:id,owned,equipped:owned.includes(value.equipped)?value.equipped:'bosque',revision:Number.isSafeInteger(value.revision)?value.revision:-1};
  }
  function read(){
    const id=account();if(!id)return empty(null);
    try{return normalize(JSON.parse(storage.getItem(key(id))),id);}catch{return empty(id);}
  }
  function apply(value,id){
    if(account()!==id||value?.userId!==id)throw Error('La cuenta cambió. Volvé a intentar.');
    const next=normalize(value,id),previous=read();
    if(next.revision<previous.revision)return previous;
    storage.setItem(key(id),JSON.stringify(next));root.dispatchEvent?.(new Event('profile-backgrounds-updated'));return next;
  }
  function operation(action,id){
    const owner=account();if(!owner)return Promise.reject(Error('Iniciá sesión para guardar tus fondos.'));
    const lock=owner+':'+action+':'+(id||'');
    if(pending.has(lock))return pending.get(lock);
    const task=Promise.resolve().then(async()=>{
      if(account()!==owner)throw Error('La cuenta cambió. Volvé a intentar.');
      const result=await request(action,id);
      // The server transaction validates ownership and debits the existing wallet.
      // A preview never adds an item to owned and the browser never invents a debit.
      return apply(result,owner);
    }).finally(()=>pending.delete(lock));
    pending.set(lock,task);return task;
  }
  function preview(id){const item=catalog.find(item=>item.id===id);if(!item)throw Error('Fondo no disponible.');return {...item,owned:read().owned.includes(id)};}
  function purchase(id){
    const item=catalog.find(item=>item.id===id);
    if(!item?.price)return Promise.reject(Error('Este fondo se consigue mediante un logro.'));
    if(read().owned.includes(id))return Promise.resolve(read());
    return operation('purchase',id);
  }
  function equip(id){
    if(!ids.has(id)||!read().owned.includes(id))return Promise.reject(Error('Primero conseguí este fondo.'));
    return operation('equip',id);
  }
  return Object.freeze({read,preview,purchase,equip,sync:()=>operation('sync',null)});
}
const words={
 es:{title:'Fondos de perfil',free:'Gratis',coins:'{n} monedas',world:'Completá el mundo {n}',rank:'Alcanzá Diamante',owned:'En tu colección',equipped:'Equipado',preview:'Probar',buy:'Comprar por {n} monedas',equip:'Usar este fondo',hint:'Podés probar todos. Para usar uno, primero tenés que conseguirlo.',locked:'Vista previa · {requirement}',success:'¡Fondo equipado!',purchased:'¡Fondo comprado! Ya podés usarlo.',connect:'Conectate para sincronizar tus fondos.',failed:'No pudimos guardar el cambio. Reintentá con conexión.',testing:'Volvé del modo de prueba para comprar o equipar.',balance:'Saldo: {n} monedas'},
 en:{title:'Profile backgrounds',free:'Free',coins:'{n} coins',world:'Complete world {n}',rank:'Reach Diamond',owned:'In your collection',equipped:'Equipped',preview:'Preview',buy:'Buy for {n} coins',equip:'Use this background',hint:'Preview any background. Earn or buy it before equipping it.',locked:'Preview · {requirement}',success:'Background equipped!',purchased:'Background purchased! You can now use it.',connect:'Connect to sync your backgrounds.',failed:'Could not save the change. Reconnect and retry.',testing:'Leave test mode to buy or equip.',balance:'Balance: {n} coins'},
 'pt-BR':{title:'Fundos de perfil',free:'Grátis',coins:'{n} moedas',world:'Complete o mundo {n}',rank:'Alcance Diamante',owned:'Na sua coleção',equipped:'Equipado',preview:'Experimentar',buy:'Comprar por {n} moedas',equip:'Usar este fundo',hint:'Você pode experimentar todos. Para usar um fundo, primeiro precisa conquistá-lo.',locked:'Prévia · {requirement}',success:'Fundo equipado!',purchased:'Fundo comprado! Você já pode usá-lo.',connect:'Conecte-se para sincronizar seus fundos.',failed:'Não foi possível salvar. Conecte-se e tente novamente.',testing:'Saia do modo de teste para comprar ou equipar.',balance:'Saldo: {n} moedas'}
};
const names={bosque:['Bosque con luciérnagas','Firefly forest','Floresta de vaga-lumes'],zafir:['Zafir · Invocación arcana','Zafir · Arcane invocation','Zafir · Invocação arcana'],desierto:['Desierto · Arenas del crepúsculo','Desert · Twilight sands','Deserto · Areias do crepúsculo'],cumbres:['Nimbus · Cumbres celestes','Nimbus · Celestial peaks','Nimbus · Cumes celestes'],hielo:['Nivor · Aurora de hielo','Nivor · Frozen aurora','Nivor · Aurora de gelo'],azrak:['Azrak · Reino del eclipse','Azrak · Eclipse kingdom','Azrak · Reino do eclipse']};
function text(key,params={}){let value=(words[root.I18n?.language]||words.es)[key]||key;for(const [key,replacement]of Object.entries(params))value=value.replaceAll('{'+key+'}',String(replacement));return value;}
function name(id){return names[id]?.[['es','en','pt-BR'].indexOf(root.I18n?.language)]||names[id]?.[0]||names.bosque[0];}
function requirement(id){const item=catalog.find(item=>item.id===id);return item?.price?text('coins',{n:item.price}):item?.world?text('world',{n:item.world}):item?.rank?text('rank'):text('free');}
return {catalog,create,text,name,requirement};
});
