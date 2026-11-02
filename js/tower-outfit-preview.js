/* Temporary visual access for the development build. Never an entitlement. */
(() => {
  'use strict';
  // RELEASE GATE: set false before Google Play / production. No URL/storage override.
  const DEVELOPMENT_OUTFIT_PREVIEW = true;
  const poses = ['base','preparacion','ataque','habilidad','impacto','final','planta','mano','vidrio','envejecido','anciano'];
  // Separate from CosmeticStore.catalog and CostumeResources: no ownership or RPC ID.
  const catalog = Object.freeze([Object.freeze({id:'aren-campeon',character:'explorador',name:'Campeón del Último Piso',poses:Object.freeze(poses)})]);
  let selected = null, account = null, generation = 0;
  const loaded = new Map();
  const identity = () => { try { return globalThis.CosmeticStore?.read().accountId || null; } catch (_) { return null; } };
  const current = character => DEVELOPMENT_OUTFIT_PREVIEW && selected?.character === character && account === identity() && globalThis.CosmeticStore?.read().equipped[character]!=='aren-union' ? selected : null;
  const path = (item,pose) => 'assets/images/tower-preview/'+item.id+'-'+(item.poses.includes(pose)?pose:'base')+'-v1.webp';
  const asset = (character,pose='base') => { const item=current(character);return item?path(item,pose):null; };
  const combat = character => {const item=current(character);return item?item.poses.slice(0,5).map(p=>path(item,p)):[];};
  async function prepare(paths) {
    if(!paths.length)return;
    const missing=paths.filter(src=>!loaded.has(src));
    if(missing.length)await globalThis.GameResources?.ensure(missing);
    await Promise.all(paths.map(src=>{
      if(!loaded.has(src)){const image=new Image();image.src=src;loaded.set(src,image.decode().then(()=>image).catch(error=>{loaded.delete(src);throw error;}));}
      return loaded.get(src);
    }));
  }
  async function prepareFinal(winner,victim,player) {
    if(!current(player))return;
    const wanted=winner===player?['final']:victim!==player?[]:winner==='guardiana'?['planta']:winner==='azrak'?['mano']:winner==='kalamo'?['vidrio']:winner==='kairos'?['envejecido','anciano']:['base','impacto'];
    await prepare(wanted.map(p=>asset(player,p)).filter(Boolean));
  }
  function changed(){globalThis.dispatchEvent(new Event('tower-outfit-preview-changed'));render();}
  function reset(){generation++;selected=null;account=null;changed();}
  async function select(id) {
    if(!DEVELOPMENT_OUTFIT_PREVIEW)return false;
    if(!id){reset();return true;}
    const item=catalog.find(p=>p.id===id);if(!item)throw Error('Unknown development outfit');
    // Aren Union is a different server-authorized character with its own effects.
    if(globalThis.CosmeticStore?.read().equipped[item.character]==='aren-union')throw Error(labels().union);
    const version=++generation,owner=identity();
    await prepare(item.poses.slice(0,5).map(p=>path(item,p)));
    if(version!==generation||owner!==identity())return false;
    selected=item;account=owner;changed();return true;
  }
  const translations={
    es:{title:'Trajes de Torre · Prueba visual',help:'Acceso temporal de desarrollo. No agrega premios ni cambia tu inventario. La selección se borra al recargar o cambiar de cuenta.',choose:'Traje de prueba',off:'Desactivado · Usar mi traje habitual',on:'Aren · Campeón del Último Piso',apply:'Aplicar a esta sesión',busy:'Preparando cinco poses…',ready:'Aren Campeón activo en esta sesión.',inactive:'Prueba visual desactivada.',scope:'Se aplica a Aren en combates de Aventura, Torre y Versus. En Multijugador solo cambia tu vista: el rival ve tu traje habitual. No cambia habilidades ni reglas.',union:'Desactivá Aren Unión antes de probar el traje de Aren normal.',failed:'No se pudo preparar el traje. Reintentá con conexión.'},
    en:{title:'Tower outfits · Visual playtest',help:'Temporary development access. No rewards or inventory changes. Selection resets on reload or account change.',choose:'Test outfit',off:'Off · Use my usual outfit',on:'Aren · Champion of the Final Floor',apply:'Apply for this session',busy:'Preparing five poses…',ready:'Champion Aren is active for this session.',inactive:'Visual playtest is off.',scope:'Applies to Aren in Adventure, Tower and Versus battles. In Multiplayer only your view changes: opponents see your usual outfit. Abilities and rules stay the same.',union:'Turn off Aren Union before testing the normal Aren outfit.',failed:'Could not prepare the outfit. Retry with a connection.'},
    'pt-BR':{title:'Trajes da Torre · Teste visual',help:'Acesso temporário de desenvolvimento. Não concede prêmios nem altera o inventário. A seleção é apagada ao recarregar ou trocar de conta.',choose:'Traje de teste',off:'Desativado · Usar meu traje habitual',on:'Aren · Campeão do Último Andar',apply:'Aplicar nesta sessão',busy:'Preparando cinco poses…',ready:'Aren Campeão ativo nesta sessão.',inactive:'Teste visual desativado.',scope:'Aplica-se a Aren nos combates de Aventura, Torre e Versus. No Multijogador só muda sua visão: o rival vê seu traje habitual. Não altera habilidades nem regras.',union:'Desative Aren União antes de testar o traje de Aren normal.',failed:'Não foi possível preparar o traje. Tente novamente com conexão.'}
  };
  const labels=()=>translations[globalThis.I18n?.language]||translations.es;
  let section,selector,status,button;
  function render(){if(!section)return;const t=labels();for(const n of section.querySelectorAll('[data-preview-label]'))n.textContent=t[n.dataset.previewLabel];selector.value=selected?.id||'';if(!button.disabled)status.textContent=selected?t.ready:t.inactive;}
  function mount(){
    if(!DEVELOPMENT_OUTFIT_PREVIEW)return;
    const panel=document.querySelector('#modalConfiguracion .panel-configuracion');if(!panel)return;
    section=document.createElement('fieldset');section.id='towerOutfitPreview';
    section.innerHTML='<legend data-preview-label="title"></legend><p data-preview-label="help"></p><label for="towerOutfitPreviewSelect" data-preview-label="choose"></label><select id="towerOutfitPreviewSelect"><option value="" data-preview-label="off"></option></select><button id="towerOutfitPreviewApply" type="button" data-preview-label="apply"></button><p id="towerOutfitPreviewStatus" role="status" aria-live="polite"></p><small data-preview-label="scope"></small>';
    panel.querySelector('.audio-settings')?.before(section);if(!section.isConnected)panel.append(section);
    selector=section.querySelector('select');status=section.querySelector('[role=status]');button=section.querySelector('button');
    for(const item of catalog){const option=document.createElement('option');option.value=item.id;option.textContent=item.name;if(item.id==='aren-campeon')option.dataset.previewLabel='on';selector.append(option);}
    button.onclick=async()=>{const choice=selector.value;button.disabled=true;status.textContent=labels().busy;try{await select(choice);status.textContent=selected?labels().ready:labels().inactive;}catch(e){status.textContent=e.message===labels().union?e.message:labels().failed;}finally{button.disabled=false;selector.value=selected?.id||'';}};
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
  }
  // Clear before another account can inherit the session-only visual selection.
  globalThis.addEventListener('wallet-session-ended',reset);
  globalThis.addEventListener('wallet-updated',()=>{if(selected&&(account!==identity()||globalThis.CosmeticStore?.read().equipped[selected.character]==='aren-union'))reset();});
  globalThis.TowerOutfitPreview=Object.freeze({enabled:DEVELOPMENT_OUTFIT_PREVIEW,catalog,asset,combat,prepareFinal,select,reset,selection:()=>current(selected?.character)?.id||null});
  mount();
  // Outfit-specific calibration composes with the existing engine transforms.
  const calibration={base:[37,1443],preparacion:[107,1402],ataque:[104,1359],habilidad:[55,1471],impacto:[66,1465]};
  function sync(img){
    const match=(img.getAttribute('src')||'').match(/(?:^|\/)tower-preview\/aren-campeon-([a-z]+)-v1\.webp$/);
    if(!match){if(img.dataset.championPose){delete img.dataset.championPose;img.style.removeProperty('--champion-scale');img.style.removeProperty('--champion-y');}return;}
    const pose=match[1];img.dataset.championPose=pose;
    if(img.classList.contains('versus-personaje')&&calibration[pose]){
      const height=img.clientHeight,renderHeight=Math.min(height,img.clientWidth*1024/683),origin=.88*height;
      const [top,foot]=calibration[pose],scale=1406/(foot-top),baseFoot=height-renderHeight+renderHeight*1443/1536,poseFoot=height-renderHeight+renderHeight*foot/1536;
      img.style.setProperty('--champion-scale',String(scale));img.style.setProperty('--champion-y',(baseFoot-(origin+scale*(poseFoot-origin)))+'px');
    }
  }
  function syncAll(){for(const img of document.querySelectorAll('.versus-personaje, #cinematicaFinalVersus img'))sync(img);}
  if(DEVELOPMENT_OUTFIT_PREVIEW){new MutationObserver(records=>{for(const {target}of records)if(target.tagName==='IMG')sync(target);}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['src']});globalThis.addEventListener('resize',syncAll);globalThis.addEventListener('tower-outfit-preview-changed',syncAll);const resize=new ResizeObserver(syncAll);for(const img of document.querySelectorAll('.versus-personaje'))resize.observe(img);}
})();
