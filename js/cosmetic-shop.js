(() => {
  'use strict';
  const el=id=>document.getElementById(id),store=CosmeticStore,U=GameUI,K=U.key;
  const outfit=item=>K('shop.skins.'+item.id+'.name');
  const poseName=pose=>K('shop.poses.'+pose);
  let selected=store.catalog[0].id,selectedPose='base',busy=false;
  const posePicker=document.createElement('div');posePicker.className='tienda-traje-poses';
  posePicker.setAttribute('role','group');U.attribute(posePicker,'aria-label',K('shop.preview'));
  el('tiendaTrajeDetalle').after(posePicker);
  function renderPoses(item){
    const testing=Boolean(globalThis.AventuraShop?.testing());
    posePicker.hidden=!testing;
    if(!testing){selectedPose='base';posePicker.replaceChildren();delete posePicker.dataset.skin;return;}
    const poses=[...new Set([...item.poses,'final','planta','mano','vidrio','envejecido','anciano'])];
    if(!poses.includes(selectedPose))selectedPose='base';
    if(posePicker.dataset.skin!==item.id){
      posePicker.dataset.skin=item.id;posePicker.replaceChildren();
      for(const pose of poses){const button=document.createElement('button');button.type='button';button.dataset.pose=pose;U.text(button,poseName(pose));
        button.addEventListener('click',()=>{selectedPose=pose;render();});posePicker.append(button);}
    }
    for(const button of posePicker.children)button.setAttribute('aria-pressed',String(button.dataset.pose===selectedPose));
  }
  const preview=document.createElement('dialog');preview.id='vistaTrajeTienda';preview.className='menu-dialogo tienda-traje-dialogo';preview.setAttribute('aria-labelledby','tiendaTrajeNombre');
  const close=document.createElement('button');close.type='button';close.className='cerrar-vista-traje';close.textContent='×';
  const closeLabels={es:'Cerrar vista previa',en:'Close preview','pt-BR':'Fechar prévia'};
  const price=document.createElement('p');price.className='precio-con-moneda';el('comprarTraje').before(price);
  const previewStatus=document.createElement('p');previewStatus.setAttribute('role','status');previewStatus.setAttribute('aria-live','polite');
  preview.append(close,document.querySelector('.tienda-traje-vista'),previewStatus);document.body.append(preview);
  close.addEventListener('click',()=>preview.close());
  el('tiendaMenu').addEventListener('close',()=>{if(preview.open)preview.close();});
  function announce(message){U.text(el('tiendaTrajesEstado'),message);U.text(previewStatus,message);}
  function render(){
    try {
      const state=store.read(),item=store.find(selected),owned=state.owned.includes(item.id),equipped=state.equipped[item.character]===item.id;
      for(const button of el('tiendaTrajesCatalogo').children){const entry=store.find(button.dataset.skin);button.hidden=Boolean(entry.adminOnly&&!state.owned.includes(entry.id));}
      if(item.adminOnly&&!owned){selected=store.catalog.find(entry=>!entry.adminOnly).id;selectedPose='base';return render();}
      GameUI.text(el('tiendaSaldo'), GameUI.key('shop.balance', {coins:state.coins}));
      el('tiendaTrajeHeroe').textContent=item.hero;
      U.text(el('tiendaTrajeNombre'),outfit(item));
      U.text(el('tiendaTrajeDetalle'),K('shop.skins.'+item.id+'.description'));
      renderPoses(item);
      el('tiendaTrajeImagen').src=store.previewAsset(item.id,selectedPose);
      U.attribute(el('tiendaTrajeImagen'),'alt',K('shop.previewAlt',{hero:item.hero,outfit:outfit(item),pose:poseName(selectedPose)}));
      el('tiendaTrajeImagen').classList.toggle('retrato-zafir', item.character === 'mago' && selectedPose==='base');
      price.hidden=Boolean(item.adminOnly);U.text(price,K('shop.price',{coins:item.price}));
      const testing=globalThis.AventuraShop?.testing();
      const buy=el('comprarTraje');buy.classList.toggle('precio-con-moneda',!item.adminOnly&&store.canPurchase(item.id)&&!testing);buy.hidden=owned;buy.disabled=busy||testing||!store.canPurchase(item.id)||state.coins<item.price;
      U.text(buy,item.adminOnly?K('shop.adminAccess'):!store.canPurchase(item.id)?K('shop.unlockAzrak'):testing?K('shop.leaveTest'):state.coins<item.price?K('shop.missingCoins',{coins:item.price-state.coins}):K('shop.buyPrice',{coins:item.price}));
      const equip=el('equiparTraje');equip.hidden=!owned;equip.disabled=busy||equipped;U.text(equip,K(equipped?'shop.equippedOutfit':'shop.equip'));
      el('restaurarTraje').hidden=!state.equipped[item.character];el('restaurarTraje').disabled=busy;
      for(const button of el('tiendaTrajesCatalogo').children){const data=store.find(button.dataset.skin);button.querySelector('small').classList.toggle('precio-con-moneda',!state.owned.includes(data.id));button.setAttribute('aria-pressed',String(data.id===selected));U.text(button.querySelector('small'),state.equipped[data.character]===data.id?K('shop.equipped'):state.owned.includes(data.id)?K('shop.owned'):K('shop.price',{coins:data.price}));}
    } catch(error){announce(U.error(error,'errors.shopSave'));el('comprarTraje').disabled=true;el('equiparTraje').disabled=true;}
  }
  async function action(callback){
    if(busy)return;busy=true;render();
    try {
      const execute=async()=>{const result=await callback();globalThis.AventuraShop?.sync();window.dispatchEvent(new Event('costume-equipped'));return result;};
      const message=navigator.locks?await navigator.locks.request('aventura-tienda',execute):await execute();
      announce(message);
    } catch(error){announce(U.error(error,'errors.shopSave'));}
    finally{busy=false;render();}
  }
  for(const item of store.catalog){
    const b=document.createElement('button');b.type='button';b.dataset.skin=item.id;
    const img=document.createElement('img');img.src=store.previewAsset(item.id);img.alt='';img.loading='lazy';
    const hero=document.createElement('span');hero.textContent=item.hero;
    const title=document.createElement('strong');U.text(title,outfit(item));
    b.append(img,hero,title,document.createElement('small'));
    b.addEventListener('click',()=>{selected=item.id;selectedPose='base';announce('');render();if(!preview.open)preview.showModal();});el('tiendaTrajesCatalogo').append(b);
  }
  el('comprarTraje').addEventListener('click',()=>{const id=selected;void action(async()=>{if(globalThis.AventuraShop?.testing())throw Error('Las monedas de prueba no se pueden gastar.');await store.purchase(id);return K('shop.purchased');});});
  el('equiparTraje').addEventListener('click',()=>{const item=store.find(selected);void action(()=>{store.equip(item.character,item.id);return K("shop.outfitSaved",{hero:item.hero,outfit:outfit(item)});});});
  el('restaurarTraje').addEventListener('click',()=>{const item=store.find(selected);void action(()=>{store.equip(item.character,null);return K("shop.originalSaved",{hero:item.hero});});});
  el('btnTienda').addEventListener('click',()=>{
    announce('');render();
    if(navigator.onLine&&!globalThis.AventuraShop?.testing()){
      void globalThis.AventuraShop?.connect().catch(()=>announce(K('errors.shopSync')));
    }
  });
  window.addEventListener('wallet-updated',()=>{globalThis.AventuraShop?.sync();window.dispatchEvent(new Event('costume-equipped'));render();});
  window.addEventListener('wallet-sync-pending',()=>{if(el('tiendaMenu').open)announce(K('shop.syncPending'));});
  window.addEventListener('storage',event=>{if(event.key===store.key){globalThis.AventuraShop?.sync();window.dispatchEvent(new Event('costume-equipped'));if(el('tiendaMenu').open)render();}});
  window.dispatchEvent(new Event('costume-equipped'));
})();
