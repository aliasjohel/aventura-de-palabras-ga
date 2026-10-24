(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CosmeticStore=api.create(root.localStorage);
})(globalThis,()=>{
  'use strict';
  const key='aventuraTiendaV1';
  const catalog=Object.freeze([
    Object.freeze({id:'aren-bosque',character:'explorador',hero:'Aren',name:'Guardián del Bosque',price:2000,description:'Cuero esmeralda, hojas de bronce y espíritu de explorador.',poses:['base','preparacion','ataque','habilidad','impacto']}),
    Object.freeze({id:'zafir-celestial',character:'mago',hero:'Zafir',name:'Celestial',price:2500,description:'Una túnica de estrellas y un báculo de luz azul.',poses:['base','ataque','impacto']}),
    Object.freeze({id:'kairos-real',character:'kairos',hero:'Kairós',name:'Relojero Real',price:3000,description:'Engranajes dorados y un abrigo digno del guardián del tiempo.',poses:['base','ataque','impacto']}),
    Object.freeze({id:'guardiana-otono',character:'guardiana',hero:'Guardiana',name:'Guardiana de Otoño',price:1500,description:'Hojas cobrizas, una capa carmesí y un báculo de ámbar. Se consigue con las monedas que ganás jugando.',poses:['base','ataque','impacto']}),
    Object.freeze({id:'alba-lunar',character:'guardian_alba',hero:'A. Lumen',name:'Alba Lunar',price:2000,description:'Armadura de plata, capa azul y una espada de luz lunar. Se consigue con las monedas que ganás jugando.',poses:['base','ataque','habilidad','carga','impacto']}),
    Object.freeze({id:'shadow-carmesi',character:'t_shadow',hero:'T. Shadow',name:'Sombra Carmesí',price:2500,description:'Capucha carmesí, armadura de obsidiana y dagas rojas. Se consigue con las monedas que ganás jugando.',poses:['base','ataque','impacto']}),
    Object.freeze({id:'lobo-lunar',character:'hombre_lobo',hero:'Hombre Lobo',name:'Centinela Lunar',price:2000,description:'Armadura de plata lunar, cuero azul y garras listas para la cacería.',poses:['base','ataque','impacto','humano','transformacion','aullido','salto']}),
    Object.freeze({id:'nimbus-aviador',character:'dragon',hero:'Nimbus',name:'Aviador de las Cumbres',price:1500,description:'Gafas de aviador, bufanda marfil y un arnés para explorar las cumbres.',poses:['base','ataque','impacto','llamado']}),
    Object.freeze({id:'nivor-boreal',character:'dragon_hielo',hero:'Nivor',name:'Soberano Boreal',price:2500,description:'Armadura de zafiro, filigranas de plata y una gema de aurora sobre el hielo.',poses:['base','ataque','impacto','vuelo','descenso-alto','descenso-bajo','frontal']}),
    Object.freeze({id:'azrak-eclipse',character:'azrak',hero:'Azrak',name:'Señor del Eclipse',price:2500,description:'Armadura de obsidiana, filos de plata y una espada de fuego violeta.',poses:['base','ataque','impacto','invocacion','susto']}),
    Object.freeze({id:'kalamo-astral',character:'kalamo',hero:'Kálamo',name:'Escriba Astral',price:2000,description:'Pergaminos azul noche, constelaciones de plata y tinta estelar.',poses:['base','ataque','habilidad','impacto','alcanza','extrae','prepara','lanza','golpea','formacion-1','formacion-2','formacion-3']}),
    Object.freeze({id:'aren-union',character:'explorador',hero:'Aren',name:'Guardián de los Cinco Cristales',price:null,adminOnly:true,description:'Aren Unión. Acceso de administrador para probar duelos online.',poses:['base','ataque','habilidad','impacto','invocacion','victoria']}),
  ]);
  const find=id=>catalog.find(item=>item.id===id);
  const cinemaPoses=Object.freeze(['planta','mano','vidrio','envejecido','anciano','final']);
  const currencyVersion=2;
  const integer=value=>Number.isSafeInteger(value)&&value>=0?value:0;
  function normalizeSkins(value){
    const result={};
    for(const item of catalog) if(value?.[item.character]===item.id) result[item.character]=item.id;
    return result;
  }
  function asset(id,pose='base'){
    if(id==='aren-union'&&cinemaPoses.includes(pose)&&pose!=='final')return `assets/images/trajes/aren-union-${pose}-v1.png`;
    if(id==='aren-union'&&pose==='habilidad')return 'assets/images/trajes/aren-union-habilidad-v1.png';
    if(id==='aren-union'&&pose==='ataque')return 'assets/images/trajes/aren-union-ataque-rayo-v2.png';
    if(id==='aren-union'&&pose==='impacto')return 'assets/images/trajes/aren-union-impacto-v2.png';
    if(id==='aren-union')return `assets/images/trajes/aren-union-${['invocacion','victoria','capa'].includes(pose)?pose:pose==='final'?'victoria':'base'}-v1.png`;
    const item=find(id);if(!item)return null;
    if(id==='kairos-real'&&pose==='final')pose='ataque';
    if(id==='lobo-lunar'&&pose==='final')pose='salto';
    return `assets/images/trajes/${id}-${item.poses.includes(pose)||cinemaPoses.includes(pose)?pose:'base'}-v1.png`;
  }
  function previewAsset(id,pose='base'){
    return id==='aren-union'&&pose==='base'?'assets/images/trajes/aren-union-concepto-v1.png':asset(id,pose);
  }
  function create(storage){
    let purchaseHandler=null;
    const changed=()=>globalThis.dispatchEvent?.(new Event('wallet-local-changed'));
    const missionKey=(world,mission)=>'aventura:'+world+':'+mission+':mision';
    const validMission=e=>e&&Number.isInteger(e.world)&&e.world>=0&&e.world<5&&Number.isInteger(e.mission)&&e.mission>=0&&e.mission<10;
    const requests=value=>[...new Map((Array.isArray(value)?value:[]).filter(validMission).map(e=>[missionKey(e.world,e.mission),{world:e.world,mission:e.mission}])).values()];
    function read(){
      const historicProgress=storage.getItem('progresoAventuraGA');
      if(historicProgress&&!storage.getItem(key+':pre-security-v3:story'))storage.setItem(key+':pre-security-v3:story',historicProgress);
      const raw=storage.getItem(key);
      let value;
      try{value=raw?JSON.parse(raw):null;}catch{throw Error('No pudimos leer tus compras. No se cobró ninguna moneda.');}
      if(raw&&(!value||typeof value!=='object'||Array.isArray(value)))throw Error('No pudimos leer tus compras. No se cobró ninguna moneda.');
      if(!value){
        // Display-only legacy state. Never import or rewrite a historic payload while reading.
        value={coins:0,owned:[],equipped:{}};
      }
      const owned=[...new Set((Array.isArray(value.owned)?value.owned:[]).filter(id=>find(id)&&(!find(id).adminOnly||(value.accountId&&value.adminUnion===true))))];
      const equipped=normalizeSkins(value.equipped);
      for(const char of Object.keys(equipped))if(!owned.includes(equipped[char]))delete equipped[char];
      return {currencyVersion,securityVersion:value.securityVersion,securityReady:value.securityVersion===3&&value.securityReady===true,
        coins:value.securityVersion===3?integer(value.coins):0,owned,equipped,requests:requests(value.requests),
        missionClaims:(Array.isArray(value.missionClaims)?value.missionClaims:[]).filter(e=>/^aventura:[0-4]:[0-9]:mision$/.test(e)),
        accountId:typeof value.accountId==='string'?value.accountId:null,revision:Number.isSafeInteger(value.revision)?value.revision:-1,
        equipmentVersion:integer(value.equipmentVersion),equipmentDirty:value.equipmentDirty===true,
        world5Complete:value.world5Complete===true,admin:false,arenTrial:value.arenTrial===true,adminUnion:value.adminUnion===true};
    }
    function archiveLegacy(raw){
      if(!raw)return;
      const old=JSON.parse(raw);if(old.securityVersion===3)return;
      const archive=key+':pre-security-v3:'+(old.accountId||'guest');
      if(!storage.getItem(archive))storage.setItem(archive,JSON.stringify({wallet:raw,progress:storage.getItem('progresoAventuraGA')}));
    }
    function save(state){
      archiveLegacy(storage.getItem(key));
      state.currencyVersion=currencyVersion;
      const encoded=JSON.stringify(state);
      storage.setItem(key,encoded);
      if(state.accountId)storage.setItem(key+':account:'+state.accountId,encoded);
      return state;
    }
    function beginAccount(id){
      if(typeof id!=='string'||!id)throw Error('Cuenta inválida.');
      const previous=read();
      archiveLegacy(storage.getItem(key));
      const cachedRaw=storage.getItem(key+':account:'+id);
      let cached;try{cached=cachedRaw?JSON.parse(cachedRaw):null;}catch{throw Error('No pudimos leer tus compras.');}
      if(cachedRaw&&(!cached||typeof cached!=='object'||Array.isArray(cached)||cached.accountId!==id))throw Error('No pudimos verificar el archivo de tu cuenta.');
      archiveLegacy(cachedRaw);
      const candidate=previous.accountId===id?previous:cached?.accountId===id?cached:null;
      if(candidate?.securityVersion===3){
        if(previous.accountId!==id)storage.setItem(key,JSON.stringify(candidate));
        return read();
      }
      // Preserve exact historical bytes before replacing a cache. Archives are never sent to RPC.
      const archive=key+':pre-security-v3:'+id;
      if(!storage.getItem(archive))storage.setItem(archive,JSON.stringify({wallet:previous.accountId===id?storage.getItem(key):cachedRaw||(!previous.accountId?storage.getItem(key):null),progress:storage.getItem('progresoAventuraGA')}));
      return save({currencyVersion,securityVersion:3,securityReady:false,accountId:id,coins:0,owned:[],equipped:{},revision:-1,
        requests:!previous.accountId?previous.requests:[],missionClaims:[],equipmentVersion:0,equipmentDirty:false});
    }
    function applyAccount(result,sentEquipmentVersion){
      if(result?.securityVersion!==3||result.currencyVersion!==currencyVersion)throw Error('Actualizá el juego y el servidor del monedero.');
      const state=read();
      if(state.accountId!==result.userId)return state;
      if(!Number.isSafeInteger(result.coins)||result.coins<0||!Number.isSafeInteger(result.revision)||result.revision<0||!Array.isArray(result.owned)||!Array.isArray(result.missionClaims))throw Error('Respuesta de monedero inválida.');
      if(result.revision<state.revision)return state;
      const owned=[...new Set(result.owned.filter(id=>find(id)&&(!find(id).adminOnly||result.adminUnion===true)))];
      const dirty=state.equipmentDirty&&state.equipmentVersion!==sentEquipmentVersion;
      const equipped=normalizeSkins(dirty?state.equipped:result.equipped);
      for(const char of Object.keys(equipped))if(!owned.includes(equipped[char]))delete equipped[char];
      const claims=[...new Set(result.missionClaims.filter(e=>/^aventura:[0-4]:[0-9]:mision$/.test(e)))];
      const pending=state.requests.filter(e=>!claims.includes(missionKey(e.world,e.mission)));
      return save({...state,securityVersion:3,securityReady:true,coins:result.coins,owned,equipped,requests:pending,missionClaims:claims,
        revision:result.revision,equipmentDirty:dirty,world5Complete:result.world5Complete===true,admin:false,arenTrial:result.arenTrial===true,adminUnion:result.adminUnion===true});
    }
    function claimAdventure(){throw Error('La recompensa requiere completar un intento online.');}
    function canPurchase(id){
      const item=find(id);if(!item||item.adminOnly)return false;
      const state=read();
      return state.owned.includes(id)||item.character!=='azrak'||state.world5Complete;
    }
    function purchase(id){
      const item=find(id);if(!item)throw Error('Este traje no está disponible.');
      const state=read();
      if(!state.accountId||!state.securityReady||!purchaseHandler)throw Error('Conectate para verificar tu monedero antes de comprar.');
      if(item.adminOnly)throw Error('Aren Unión requiere un desbloqueo de administrador.');
      if(state.owned.includes(id))return state;
      if(!canPurchase(id))throw Error('Completá el Mundo 5 para desbloquear a Azrak y comprar su traje.');
      return purchaseHandler(id);
    }
    function equip(character,id){
      const state=read();
      if(id){const item=find(id);if(!item||item.character!==character||!state.owned.includes(id))throw Error('Primero conseguí este traje.');state.equipped[character]=id;}
      else delete state.equipped[character];
      if(state.accountId){state.equipmentDirty=true;state.equipmentVersion+=1;}
      save(state);changed();return state;
    }
    function earn(){throw Error('Los créditos genéricos están desactivados.');}
    return Object.freeze({key,catalog,find,asset,previewAsset,normalizeSkins,read,claimAdventure,canPurchase,purchase,equip,earn,beginAccount,applyAccount,setPurchaseHandler:handler=>{purchaseHandler=handler;}});
  }
  return {key,catalog,find,asset,previewAsset,normalizeSkins,create};
});
