/* Presentation only: open the existing search controls below the chosen card. */
(() => {
 'use strict';
 const panel=document.getElementById('accionesModalidadOnline');
 const alias=document.getElementById('aliasSalaVersus'),aliasField=alias.closest('label');
 const inputs=[...document.querySelectorAll('input[name="modoOnline"]')];
 const selector=document.getElementById('selectorModosJuego');
 const manual=document.querySelector('.salas-manuales-versus');
 function hasAlias(){return alias.value.trim().length>=2&&alias.validity.valid;}
 function syncAlias(){aliasField.hidden=hasAlias()||(panel.hidden&&!manual.open);}
 function open(input){
  if(input.disabled)return;
  const option=input.closest('.modo-online-opcion');
  panel.hidden=false;option.append(aliasField,panel);
  inputs.forEach(other=>other.closest('.modo-online-opcion').classList.toggle('opcion-abierta',other===input));
  syncAlias();
 }
 manual.addEventListener('toggle',()=>{
  if(manual.open&&!hasAlias())manual.insertBefore(aliasField,manual.querySelector('.acciones-sala-versus'));
  else if(!panel.hidden)panel.parentElement.insertBefore(aliasField,panel);
  syncAlias();
 });
 for(const input of inputs){
  input.addEventListener('change',()=>open(input));
  input.closest('label').addEventListener('click',()=>{
   if(input.disabled)return;
   if(!input.checked){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}
   open(input);
  });
 }
 // Dialogs reopen through map navigation or Escape without a card click.
 // Observe settled state so close/open pairs never resume the menu score.
 const menu=document.getElementById('pantallaMenu');
 const map=document.getElementById('mapaAventura');
 function syncMusic(){
  if(document.hidden || !menu.classList.contains('activa') || selector.open || map.open)pausarMusicaMenu();
  else reproducirMusicaMenu();
  CharacterMusic.sync();
 }
 const musicObserver=new MutationObserver(syncMusic);
 for(const dialog of [selector,map])musicObserver.observe(dialog,{attributes:true,attributeFilter:['open']});
 musicObserver.observe(menu,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',syncMusic);
 window.addEventListener('pageshow',syncMusic);
 globalThis.MultiplayerLobby=Object.freeze({syncAlias});
})();
