(() => {
  'use strict';
  const el=id=>document.getElementById(id),store=CosmeticStore;
  let selected=store.catalog[0].id,selectedPose='base',busy=false;
  const poseLabels={base:'De pie',preparacion:'Preparación',ataque:'Ataque',habilidad:'Habilidad',carga:'Técnica final',impacto:'Impacto',final:'Victoria',planta:'Planta',mano:'Azrak',vidrio:'Kálamo',envejecido:'Envejecido',anciano:'Anciano'};
  const posePicker=document.createElement('div');posePicker.className='tienda-traje-poses';
  posePicker.setAttribute('role','group');posePicker.setAttribute('aria-label','Vista previa del traje');
  el('tiendaTrajeDetalle').after(posePicker);
  function renderPoses(item){
    const poses=[...new Set([...item.poses,'final','planta','mano','vidrio','envejecido','anciano'])];
    if(!poses.includes(selectedPose))selectedPose='base';
    if(posePicker.dataset.skin!==item.id){
      posePicker.dataset.skin=item.id;posePicker.replaceChildren();
      for(const pose of poses){const button=document.createElement('button');button.type='button';button.dataset.pose=pose;button.textContent=poseLabels[pose]||pose;
        button.addEventListener('click',()=>{selectedPose=pose;render();});posePicker.append(button);}
    }
    for(const button of posePicker.children)button.setAttribute('aria-pressed',String(button.dataset.pose===selectedPose));
  }
  function announce(message){el('tiendaTrajesEstado').textContent=message;}
  function render(){
    try {
      const state=store.read(),item=store.find(selected),owned=state.owned.includes(item.id),equipped=state.equipped[item.character]===item.id;
      el('tiendaSaldo').textContent=`🪙 ${state.coins} monedas`;
      el('tiendaTrajeHeroe').textContent=item.hero;
      el('tiendaTrajeNombre').textContent=item.name;
      el('tiendaTrajeDetalle').textContent=item.description;
      renderPoses(item);
      el('tiendaTrajeImagen').src=store.asset(item.id,selectedPose);
      el('tiendaTrajeImagen').alt=`${item.hero} · ${item.name} · ${poseLabels[selectedPose]||selectedPose}`;
      el('tiendaTrajeImagen').classList.toggle('retrato-zafir', item.character === 'mago' && selectedPose==='base');
      const testing=globalThis.AventuraShop?.testing();
      const buy=el('comprarTraje');buy.hidden=owned;buy.disabled=busy||testing||state.coins<item.price;
      buy.textContent=testing?'Volvé del modo de prueba para comprar':state.coins<item.price?`Te faltan ${item.price-state.coins} monedas`:`Comprar por ${item.price} monedas`;
      const equip=el('equiparTraje');equip.hidden=!owned;equip.disabled=busy||equipped;equip.textContent=equipped?'Traje equipado':'Equipar traje';
      el('restaurarTraje').hidden=!state.equipped[item.character];el('restaurarTraje').disabled=busy;
      for(const button of el('tiendaTrajesCatalogo').children){const data=store.find(button.dataset.skin);button.setAttribute('aria-pressed',String(data.id===selected));button.querySelector('small').textContent=state.equipped[data.character]===data.id?'Equipado':state.owned.includes(data.id)?'En tu colección':`${data.price} monedas`;}
    } catch(error){announce(error.message);el('comprarTraje').disabled=true;el('equiparTraje').disabled=true;}
  }
  async function action(callback){
    if(busy)return;busy=true;render();
    try {
      const execute=async()=>{const result=await callback();globalThis.AventuraShop?.sync();window.dispatchEvent(new Event('costume-equipped'));return result;};
      const message=navigator.locks?await navigator.locks.request('aventura-tienda',execute):await execute();
      announce(message);
    } catch(error){announce(error.message||'No pudimos guardar la compra. Reintentá.');}
    finally{busy=false;render();}
  }
  for(const item of store.catalog){
    const b=document.createElement('button');b.type='button';b.dataset.skin=item.id;
    const img=document.createElement('img');img.src=store.asset(item.id);img.alt='';img.loading='lazy';
    const hero=document.createElement('span');hero.textContent=item.hero;
    const title=document.createElement('strong');title.textContent=item.name;
    b.append(img,hero,title,document.createElement('small'));
    b.addEventListener('click',()=>{selected=item.id;selectedPose='base';announce('');render();});el('tiendaTrajesCatalogo').append(b);
  }
  el('comprarTraje').addEventListener('click',()=>{const id=selected;void action(async()=>{if(globalThis.AventuraShop?.testing())throw Error('Las monedas de prueba no se pueden gastar.');await store.purchase(id);return '¡Traje comprado! Ya podés equiparlo.';});});
  el('equiparTraje').addEventListener('click',()=>{const item=store.find(selected);void action(()=>{store.equip(item.character,item.id);return `¡${item.hero} lleva ${item.name}!`;});});
  el('restaurarTraje').addEventListener('click',()=>{const item=store.find(selected);void action(()=>{store.equip(item.character,null);return `${item.hero} volvió a su traje original.`;});});
  el('btnTienda').addEventListener('click',()=>{
    announce('');render();
    if(navigator.onLine&&!globalThis.AventuraShop?.testing()){
      void globalThis.AventuraShop?.connect().catch(()=>announce('No pudimos sincronizar tu cuenta. Tus monedas guardadas se conservan; reintentá al volver a abrir la tienda.'));
    }
  });
  window.addEventListener('wallet-updated',()=>{globalThis.AventuraShop?.sync();window.dispatchEvent(new Event('costume-equipped'));render();});
  window.addEventListener('wallet-sync-pending',()=>{if(el('tiendaMenu').open)announce('Tu saldo guardado sigue disponible. Las compras necesitan conexión; volveremos a sincronizar al reconectar.');});
  window.addEventListener('storage',event=>{if(event.key===store.key){globalThis.AventuraShop?.sync();window.dispatchEvent(new Event('costume-equipped'));if(el('tiendaMenu').open)render();}});
  window.dispatchEvent(new Event('costume-equipped'));
})();
