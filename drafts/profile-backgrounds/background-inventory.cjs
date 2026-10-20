/* Draft: not loaded by the published game. The authenticated RPC adapter is pending. */
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
    storage.setItem(key(id),JSON.stringify(next));return next;
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
module.exports={catalog,create};
