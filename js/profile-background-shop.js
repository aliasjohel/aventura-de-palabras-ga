(() => {
 'use strict';
 const B=ProfileBackgrounds, shop=document.getElementById('tiendaMenu');
 const section=document.createElement('section');section.className='tienda-fondos';
 const title=document.createElement('h3'),help=document.createElement('p'),list=document.createElement('div'),status=document.createElement('p');
 status.setAttribute('role','status');status.setAttribute('aria-live','polite');list.className='tienda-fondos-catalogo';
 section.append(title,help,list,status);document.getElementById('tiendaIrPerfil').before(section);
 let busy=false,notice='';
 async function sync(){
  if(!navigator.onLine||globalThis.AventuraShop?.testing())return;
  try{await globalThis.AventuraShop?.connect();await B.sync();render();}catch(_){notice=B.text('connect');render();}
 }
 async function action(kind,id){
  if(busy)return;busy=true;notice='';render();
  try{if(!CosmeticStore.read().accountId)await globalThis.AventuraShop?.connect();await B[kind](id);notice=B.text(kind==='purchase'?'purchased':'success');}
  catch(error){notice=error.message||B.text('failed');}
  finally{busy=false;render();}
 }
 function render(){
  title.textContent=B.text('title');help.textContent=B.text('hint');status.textContent=notice;
  const state=B.read(),testing=Boolean(globalThis.AventuraShop?.testing());list.replaceChildren();
  for(const item of B.catalog){
   const card=document.createElement('article'),name=document.createElement('h4'),requirement=document.createElement('p'),preview=document.createElement('button');
   const owned=state.owned.includes(item.id);card.dataset.backgroundShop=item.id;name.textContent=B.name(item.id);
   requirement.textContent=state.equipped===item.id?B.text('equipped'):owned?B.text('owned'):B.requirement(item.id);
   preview.type='button';preview.textContent=B.text('preview');preview.disabled=busy;
   preview.addEventListener('click',()=>{shop.close();ProfileBackgroundsUI.preview(item.id);});
   card.append(name,requirement,preview);
   if(item.price||owned){const use=document.createElement('button');use.type='button';use.dataset.backgroundAction=owned?'equip':'purchase';
    use.textContent=owned?B.text(state.equipped===item.id?'equipped':'equip'):B.text('buy',{n:item.price});
    use.disabled=busy||testing||state.equipped===item.id;
    use.addEventListener('click',()=>void action(owned?'equip':'purchase',item.id));card.append(use);
   }
   list.append(card);
  }
 }
 document.getElementById('btnTienda').addEventListener('click',()=>{notice='';render();void sync();});
 window.addEventListener('profile-backgrounds-updated',render);window.addEventListener('wallet-updated',render);
 window.addEventListener('online',()=>{if(shop.open)void sync();});
 I18n.subscribe(render);render();
})();
