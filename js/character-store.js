(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CharacterStore=Object.freeze({...api,...api.create(root.localStorage,()=>root.CosmeticStore.read().accountId, (action,id)=>root.GameWallet.characters(action,id),()=>root.dispatchEvent(new Event('characters-updated'))) });})(globalThis,()=>{
'use strict';
const catalog=Object.freeze([
{id:'hombre_lobo',name:'Hombre Lobo',price:200,image:'hombre-lobo-base.png'},
{id:'kairos',name:'Kairós',price:250,image:'kairos-seleccion-v2.png'},
{id:'kalamo',name:'Kálamo',price:300,image:'kalamo-base.png'},
{id:'guardian_alba',name:'Lume',price:300,image:'guardian-alba-base.png'},
{id:'t_shadow',name:'Shadow',price:350,image:'t-shadow-base.png'}
].map(Object.freeze));
function create(storage,account,request,changed=()=>{}){
 const pending=new Map(),key=id=>'aventuraPersonajesV1:account:'+id;
 const empty=userId=>({userId,owned:[],revision:-1});
 function read(){const id=account();if(!id)return empty(null);try{const value=JSON.parse(storage.getItem(key(id)));if(value?.userId!==id)return empty(id);return {userId:id,owned:(value.owned||[]).filter(id=>catalog.some(c=>c.id===id)),revision:value.revision};}catch{return empty(id);}}
 function apply(value,id=account()){if(!id||id!==account()||value?.userId!==id||!Array.isArray(value.owned)||!Number.isSafeInteger(value.revision))throw Error('No pudimos verificar tus personajes.');if(value.revision<read().revision)return read();storage.setItem(key(id),JSON.stringify({userId:id,owned:value.owned.filter(id=>catalog.some(c=>c.id===id)),revision:value.revision}));changed();return read();}
 function operation(action,id){const owner=account();if(!owner)return Promise.reject(Error('Iniciá sesión para comprar personajes.'));const lock=owner+':'+action+':'+id;if(pending.has(lock))return pending.get(lock);const task=Promise.resolve().then(()=>{if(account()!==owner)throw Error('La cuenta cambió. Volvé a intentar.');return request(action,id);}).then(value=>apply(value,owner)).finally(()=>pending.delete(lock));pending.set(lock,task);return task;}
 function purchase(id){if(!catalog.some(c=>c.id===id))return Promise.reject(Error('Personaje no disponible.'));return read().owned.includes(id)?Promise.resolve(read()):operation('purchase',id);}
 return {read,apply,purchase,sync:()=>operation('sync',null),owns:id=>read().owned.includes(id)};
}
return {catalog,create};
});
