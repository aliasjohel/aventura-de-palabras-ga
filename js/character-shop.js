(()=>{
'use strict';
const C=CharacterStore,shop=document.getElementById('tiendaMenu'),U=GameUI;
const text=(key,params={})=>U.resolve(U.key(key,params)),label=(key,params={})=>text('shop.characters.'+key,params);
// Existing HUD keys: this presentation never changes combat definitions.
const abilities={hombre_lobo:['invert','invertDetail'],kairos:['steal','stealDetail'],kalamo:['beast','beastDetail'],guardian_alba:['bounce','bounceDetail'],t_shadow:['blackHole','holeDetail'],'aren-union':['wisdom','flashDetail']};
const catalog=[...C.catalog,{id:'aren-union',premium:true}],cards=new Map();
const section=document.createElement('section');section.className='tienda-personajes';section.id='tiendaPersonajes';
const title=document.createElement('h3'),hint=document.createElement('p'),list=document.createElement('div'),status=document.createElement('p');list.className='tienda-personajes-catalogo';status.setAttribute('role','status');section.append(title,hint,list,status);document.querySelector('.tienda-seccion').before(section);
const panel=document.createElement('dialog');panel.id='detallePersonajeTienda';panel.className='menu-dialogo personaje-detalle';panel.setAttribute('aria-labelledby','detallePersonajeNombre');
panel.innerHTML='<header class="menu-dialogo-cabecera"><div><small data-character-tag></small><h2 id="detallePersonajeNombre"></h2></div><button type="button" data-character-close>×</button></header><div class="personaje-detalle-cuerpo"><div class="personaje-detalle-hero"><img alt=""></div><section class="personaje-detalle-habilidad"><small data-ability-label></small><h3 data-ability-name></h3><p data-ability-hint></p><p data-ability-description></p></section><dl class="personaje-detalle-tecnicas"><div data-character-attack><dt></dt><dd></dd></div><div data-character-final><dt></dt><dd></dd></div></dl><p class="personaje-detalle-premium" hidden></p></div><footer><p data-character-state></p><button type="button" data-character-buy></button><p data-character-notice role="status" aria-live="polite"></p></footer>';
document.body.append(panel);const part=s=>panel.querySelector(s);
let busy=false,notice='',selected=null,opener=null;
function wallet(){try{return CosmeticStore.read();}catch{return null;}}
const owns=item=>item.premium?wallet()?.owned.includes(item.id)===true:C.owns(item.id);
const name=item=>label('entries.'+item.id+'.name');
const ability=item=>text('adventure.combat.'+abilities[item.id][0]);
const image=item=>item.premium?CosmeticStore.previewAsset(item.id):'assets/images/personajes/versus/'+item.image;
function state(item){return item.premium?(owns(item)?label(wallet()?.arenTrial?'trialAccess':'accessGranted'):label('comingSoon')):owns(item)?label('owned'):text('shop.price',{coins:item.price});}
for(const item of catalog){
 const card=document.createElement('button');card.type='button';card.className='personaje-tienda-tarjeta';card.dataset.characterShop=item.id;card.setAttribute('aria-haspopup','dialog');card.setAttribute('aria-controls',panel.id);
 const img=document.createElement('img');img.alt='';img.loading='lazy';img.decoding='async';
 const badge=document.createElement('small');badge.className='personaje-tienda-insignia';badge.hidden=!item.premium;
 const heading=document.createElement('strong'),skill=document.createElement('span'),cost=document.createElement('small');skill.className='personaje-tienda-habilidad';cost.className='personaje-tienda-estado';
 card.append(badge,img,heading,skill,cost);card.classList.toggle('personaje-tienda-premium',Boolean(item.premium));card.addEventListener('click',()=>{selected=item;opener=card;renderPanel();panel.showModal();});list.append(card);cards.set(item.id,{card,img,badge,heading,skill,cost});
}
function renderPanel(){
 if(!selected)return;const item=selected,owned=owns(item),attack=part('[data-character-attack]'),final=part('[data-character-final]');
 part('[data-character-tag]').textContent=item.premium?label('premiumMoney'):label('details');part('#detallePersonajeNombre').textContent=name(item);
 part('[data-character-close]').setAttribute('aria-label',label('close'));
 const img=part('.personaje-detalle-hero img');img.src=image(item);img.alt=name(item);
 part('[data-ability-label]').textContent=label('mainAbility');part('[data-ability-name]').textContent=ability(item);
 part('[data-ability-hint]').hidden=!item.premium;part('[data-ability-hint]').textContent=item.premium?label('unionHint'):'';
 part('[data-ability-description]').textContent=text('adventure.combat.'+abilities[item.id][1]);
 attack.hidden=Boolean(item.premium);attack.querySelector('dt').textContent=label('attack');attack.querySelector('dd').textContent=item.premium?'':label('entries.'+item.id+'.attack');
 final.querySelector('dt').textContent=label('finisher');final.querySelector('dd').textContent=item.premium?text('adventure.combat.finalCrystals'):label('entries.'+item.id+'.finisher');
 const note=part('.personaje-detalle-premium');note.hidden=!item.premium;note.textContent=item.premium?label('premiumHelp')+' '+text('shop.premium.tentativePrice'):'';
 part('[data-character-state]').textContent=state(item);const buy=part('[data-character-buy]');buy.disabled=Boolean(item.premium||busy||owned||globalThis.AventuraShop?.testing());
 buy.classList.toggle('precio-con-moneda',!item.premium&&!owned);buy.textContent=item.premium?text('shop.premium.comingSoon'):owned?label('owned'):label('buy',{coins:item.price});
 part('[data-character-notice]').textContent=notice;
}
function render(){
 title.textContent=label('title');hint.textContent=label('hint');status.textContent=notice;
 for(const item of catalog){const refs=cards.get(item.id);if(shop.open&&!refs.img.getAttribute('src'))refs.img.src=image(item);refs.badge.textContent=label('premium');refs.heading.textContent=name(item);refs.skill.textContent=ability(item);refs.cost.textContent=state(item);refs.cost.classList.toggle('precio-con-moneda',!item.premium&&!owns(item));refs.card.setAttribute('aria-label',[name(item),ability(item),state(item)].join(' · '));}
 renderPanel();
}
async function buy(id){if(busy)return;busy=true;notice='';render();try{if(AventuraShop.testing())throw Error(label('leaveTest'));await AventuraShop.connect();await C.purchase(id);notice=label('unlocked');}catch(e){notice=U.resolve(U.error(e,'errors.shopSave'));}finally{busy=false;render();}}
part('[data-character-buy]').addEventListener('click',()=>{if(selected&&!selected.premium)void buy(selected.id);});part('[data-character-close]').addEventListener('click',()=>panel.close());
panel.addEventListener('close',()=>opener?.focus({preventScroll:true}));shop.addEventListener('close',()=>{if(panel.open)panel.close();});
async function sync(){if(AventuraShop.testing())return;try{await AventuraShop.connect();await C.sync();}catch{notice=label('syncRequired');}render();}
document.getElementById('btnTienda').addEventListener('click',()=>{notice='';render();void sync();});
for(const event of ['characters-updated','wallet-updated','aren-premium-updated'])window.addEventListener(event,render);
window.addEventListener('online',()=>{if(shop.open)void sync();});I18n.subscribe(render);render();
})();
