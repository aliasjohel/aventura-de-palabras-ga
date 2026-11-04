/* Temporary visual access for the development build. Never an entitlement. */
(() => {
  'use strict';
  // RELEASE GATE: set false before Google Play / production. No URL/storage override.
  const DEVELOPMENT_OUTFIT_PREVIEW = true;
  const poses = ['base','preparacion','ataque','habilidad','impacto','final','planta','mano','vidrio','envejecido','anciano'];
  // Separate from CosmeticStore.catalog and CostumeResources: no ownership or RPC ID.
  const catalog = Object.freeze([Object.freeze({id:'aren-campeon',character:'explorador',hero:'Aren',name:'Campeón del Último Piso',poses:Object.freeze(poses)}),...(globalThis.TowerOutfitArtwork||[]).map(item=>Object.freeze({...item,poses:Object.freeze(Object.keys(item.assets))}))]);
  let selected = null, account = null, generation = 0;
  const loaded = new Map();
  // Keep the worker's optional file cache, but release decoded Image references
  // from other outfits when switching. Ten complete sets must not stay in RAM.
  function releaseDecoded(){const prefix=selected?'assets/images/tower-preview/'+selected.id+'-':null;for(const src of loaded.keys())if(!prefix||!src.startsWith(prefix))loaded.delete(src);}
  const identity = () => { try { return globalThis.CosmeticStore?.read().accountId || null; } catch (_) { return null; } };
  const current = character => DEVELOPMENT_OUTFIT_PREVIEW && selected?.character === character && account === identity() && globalThis.CosmeticStore?.read().equipped[character]!=='aren-union' ? selected : null;
  const path = (item,pose) => item.assets ? item.assets[pose]||null : 'assets/images/tower-preview/'+item.id+'-'+(item.poses.includes(pose)?pose:'base')+'-v1.webp';
  const asset = (character,pose='base') => { const item=current(character);return item?path(item,pose):null; };
  const combat = character => {const item=current(character);return item?(item.combat||item.poses.slice(0,5)).map(p=>path(item,p)).filter(Boolean):[];};
  const source = (character,original,herido=false) => {const item=current(character);return item?.sourceMap?(herido?item.assets.impacto:item.sourceMap[original])||null:null;};
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
    const item=current(player);
    const wanted=winner===player?(item.finals||['final']):victim!==player?[]:winner==='guardiana'?['base','impacto','planta']:winner==='azrak'?['base','impacto','mano']:winner==='kalamo'?['base','impacto','vidrio']:winner==='kairos'?['base','envejecido','anciano']:['base','impacto','impacto-tronco'];
    try{await prepare(wanted.map(p=>asset(player,p)).filter(Boolean));}finally{releaseDecoded();}
  }
  function changed(){globalThis.dispatchEvent(new Event('tower-outfit-preview-changed'));render();}
  function reset(){generation++;selected=null;account=null;loaded.clear();changed();}
  async function select(id) {
    if(!DEVELOPMENT_OUTFIT_PREVIEW)return false;
    if(!id){reset();return true;}
    const item=catalog.find(p=>p.id===id);if(!item)throw Error('Unknown development outfit');
    // Aren Union is a different server-authorized character with its own effects.
    if(globalThis.CosmeticStore?.read().equipped[item.character]==='aren-union')throw Error(labels().union);
    const version=++generation,owner=identity();
    try{await prepare((item.combat||item.poses.slice(0,5)).map(p=>path(item,p)).filter(Boolean));}catch(error){releaseDecoded();throw error;}
    if(version!==generation||owner!==identity()){releaseDecoded();return false;}
    selected=item;account=owner;releaseDecoded();changed();return true;
  }
  const translations={
    es:{title:'Trajes de Torre · Prueba visual',help:'Acceso temporal de desarrollo. No agrega premios ni cambia tu inventario. La selección se borra al recargar o cambiar de cuenta.',choose:'Traje de prueba',off:'Desactivado · Usar mi traje habitual',on:'Aren · Campeón del Último Piso',apply:'Aplicar a esta sesión',busy:'Preparando las poses de combate…',ready:'Traje de Torre activo en esta sesión.',inactive:'Prueba visual desactivada.',scope:'Para probar personajes bloqueados, elegí este traje y entrá en Torre Arcade: el personaje queda disponible temporalmente y no se guarda el avance de pisos. También se aplica en combates de Aventura y Versus con personajes disponibles. En Multijugador solo cambia tu vista: el rival ve tu traje habitual. No cambia habilidades ni reglas.',union:'Desactivá Aren Unión antes de probar el traje de Aren normal.',failed:'No se pudo preparar el traje. Reintentá con conexión.'},
    en:{title:'Tower outfits · Visual playtest',help:'Temporary development access. No rewards or inventory changes. Selection resets on reload or account change.',choose:'Test outfit',off:'Off · Use my usual outfit',on:'Aren · Champion of the Final Floor',apply:'Apply for this session',busy:'Preparing combat poses…',ready:'Tower outfit is active for this session.',inactive:'Visual playtest is off.',scope:'To try locked characters, select an outfit and enter Arcade Tower: that character is temporarily available and floor progress is not saved. Also applies in Adventure and Versus battles with available characters. In Multiplayer only your view changes: opponents see your usual outfit. Abilities and rules stay the same.',union:'Turn off Aren Union before testing the normal Aren outfit.',failed:'Could not prepare the outfit. Retry with a connection.'},
    'pt-BR':{title:'Trajes da Torre · Teste visual',help:'Acesso temporário de desenvolvimento. Não concede prêmios nem altera o inventário. A seleção é apagada ao recarregar ou trocar de conta.',choose:'Traje de teste',off:'Desativado · Usar meu traje habitual',on:'Aren · Campeão do Último Andar',apply:'Aplicar nesta sessão',busy:'Preparando as poses de combate…',ready:'Traje da Torre ativo nesta sessão.',inactive:'Teste visual desativado.',scope:'Para testar personagens bloqueados, selecione um traje e entre na Torre Arcade: o personagem fica disponível temporariamente e o avanço dos andares não é salvo. Também se aplica em Aventura e Versus com personagens disponíveis. No Multijogador só muda sua visão: o rival vê seu traje habitual. Não altera habilidades nem regras.',union:'Desative Aren União antes de testar o traje de Aren normal.',failed:'Não foi possível preparar o traje. Tente novamente com conexão.'}
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
    for(const item of catalog){const option=document.createElement('option');option.value=item.id;option.textContent=item.hero+' · '+item.name;if(item.id==='aren-campeon')option.dataset.previewLabel='on';selector.append(option);}
    button.onclick=async()=>{const choice=selector.value;button.disabled=true;status.textContent=labels().busy;try{await select(choice);status.textContent=selected?labels().ready:labels().inactive;}catch(e){status.textContent=e.message===labels().union?e.message:labels().failed;}finally{button.disabled=false;selector.value=selected?.id||'';}};
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
  }
  // Clear before another account can inherit the session-only visual selection.
  globalThis.addEventListener('wallet-session-ended',reset);
  globalThis.addEventListener('wallet-updated',()=>{if(selected&&(account!==identity()||globalThis.CosmeticStore?.read().equipped[selected.character]==='aren-union'))reset();});
  globalThis.TowerOutfitPreview=Object.freeze({enabled:DEVELOPMENT_OUTFIT_PREVIEW,catalog,asset,source,combat,prepareFinal,select,reset,stats:()=>({decodedPoses:loaded.size}),selection:()=>current(selected?.character)?.id||null});
  mount();
  // Outfit-specific calibration composes with the existing engine transforms.
  const calibration={base:[37,1443],preparacion:[107,1402],ataque:[104,1359],habilidad:[55,1471],impacto:[66,1465]};
  function sync(img){
    const match=(img.getAttribute('src')||'').match(/(?:^|\/)tower-preview\/aren-campeon-([a-z]+)-v1\.webp$/);
    if(!match){if(img.dataset.championPose){delete img.dataset.championPose;img.style.removeProperty('--champion-scale');img.style.removeProperty('--champion-y');}return;}
    const pose=match[1];img.dataset.championPose=pose;
    const card=img.matches('.tarjeta-personaje-versus img');
    if((img.classList.contains('versus-personaje')||card)&&calibration[pose]){
      if(!img.clientHeight||!img.clientWidth)return;
      const height=img.clientHeight,renderHeight=Math.min(height,img.clientWidth*1024/683),origin=(card?1:.88)*height;
      // Original Aren and Forest use a 1024x1536 canvas: opaque y=120..1381.
      // Match their visible height and ground, not the larger Champion drawing.
      const referenceHeight=Math.min(height,img.clientWidth*1536/1024);
      const [top,foot]=calibration[pose],scale=referenceHeight/renderHeight*1261/(foot-top),baseFoot=height-referenceHeight+referenceHeight*1381/1536,poseFoot=height-renderHeight+renderHeight*foot/1536;
      img.style.setProperty('--champion-scale',String(scale));img.style.setProperty('--champion-y',(baseFoot-(origin+scale*(poseFoot-origin)))+'px');
    }
  }
  function syncAll(){for(const img of document.querySelectorAll('.versus-personaje, .tarjeta-personaje-versus img, #cinematicaFinalVersus img'))sync(img);}
  if(DEVELOPMENT_OUTFIT_PREVIEW){new MutationObserver(records=>{for(const {target}of records)if(target.tagName==='IMG')sync(target);}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['src']});globalThis.addEventListener('resize',syncAll);globalThis.addEventListener('tower-outfit-preview-changed',syncAll);const resize=new ResizeObserver(syncAll);for(const img of document.querySelectorAll('.versus-personaje, .tarjeta-personaje-versus img'))resize.observe(img);}
})();
