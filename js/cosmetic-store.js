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
    Object.freeze({id:'aren-union',character:'explorador',hero:'Aren',name:'Guardián de los Cinco Cristales',price:null,adminOnly:true,description:'Aren Unión. Acceso de administrador para probar duelos online.',poses:['base','ataque','habilidad','invocacion','victoria']}),
  ]);
  const find=id=>catalog.find(item=>item.id===id);
  const cinemaPoses=Object.freeze(['planta','mano','vidrio','envejecido','anciano','final']);
  const currencyVersion=2;
  const scale=value=>{const result=integer(value)*10;if(!Number.isSafeInteger(result))throw Error('Saldo fuera de rango.');return result;};
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
    function previousMissions(progress){
      if(!progress){try{progress=JSON.parse(storage.getItem('progresoAventuraGA')||'{}');}catch{progress={};}}
      const claims=[];
      const world=Math.max(0,Math.min(4,integer(progress.escenarioActual)));
      for(let w=0;w<5;w++)for(let m=0;m<10;m++)if(progress.estadoFinalAzrak==='completo'||w<world||(w===world&&m<integer(progress.misionActual)))claims.push(`aventura:${w}:${m}:mision`);
      return claims;
    }
    function read(){
      const raw=storage.getItem(key);
      if(!raw){
        let legacy={};try{legacy=JSON.parse(storage.getItem('progresoAventuraGA')||'{}');}catch(_){}
        const state={currencyVersion,coins:legacy.currencyVersion===2?integer(legacy.monedas):scale(legacy.monedas),owned:[],equipped:{},missionClaims:previousMissions(legacy)};
        storage.setItem(key,JSON.stringify(state));return state;
      }
      let value;try{value=JSON.parse(raw);}catch(_){throw Error('No pudimos leer tus compras. No se cobró ninguna moneda.');}
      if(!value||typeof value!=='object')throw Error('No pudimos leer tus compras. No se cobró ninguna moneda.');
      if(value.currencyVersion!==currencyVersion){
        value.coins=scale(value.coins);
        if(Array.isArray(value.pending))value.pending=value.pending.map(e=>({...e,amount:scale(e.amount),currencyVersion}));
        if(value.legacy&&value.legacy.currencyVersion!==currencyVersion)value.legacy={...value.legacy,coins:scale(value.legacy.coins),currencyVersion};
        value.missionClaims=previousMissions();
        value.currencyVersion=currencyVersion;
        save(value);
      }
      const owned=[...new Set((Array.isArray(value.owned)?value.owned:[]).filter(id=>find(id)&&(!find(id).adminOnly||(value.accountId&&value.adminUnion===true))))];
      const equipped=normalizeSkins(value.equipped);
      for(const char of Object.keys(equipped)) if(!owned.includes(equipped[char]))delete equipped[char];
      const state={currencyVersion,coins:integer(value.coins),owned,equipped,missionClaims:Array.isArray(value.missionClaims)?value.missionClaims:[]};
      if(typeof value.accountId==='string')Object.assign(state,{accountId:value.accountId,revision:Number.isSafeInteger(value.revision)?value.revision:-1,
        pending:Array.isArray(value.pending)?value.pending:[],legacy:value.legacy||null,equipmentVersion:integer(value.equipmentVersion),equipmentDirty:Boolean(value.equipmentDirty),admin:value.admin===true,adminUnion:value.adminUnion===true});
      return state;
    }
    function save(state){state.currencyVersion=currencyVersion;storage.setItem(key,JSON.stringify(state));if(state.accountId)storage.setItem(key+':account:'+state.accountId,JSON.stringify(state));return state;}
    function beginAccount(id){
      const previous=read();if(previous.accountId===id)return previous;
      const cached=storage.getItem(key+':account:'+id);
      if(cached){storage.setItem(key,cached);return read();}
      const legacy=previous.accountId?null:{currencyVersion,missionClaims:previous.missionClaims,deviceId:globalThis.crypto.randomUUID(),coins:previous.coins,owned:previous.owned,equipped:previous.equipped};
      if(legacy)storage.setItem(key+':legacy-backup',JSON.stringify(legacy));
      return save({coins:legacy?.coins||0,owned:legacy?.owned||[],equipped:legacy?.equipped||{},accountId:id,revision:-1,pending:[],legacy,equipmentVersion:0,equipmentDirty:false,missionClaims:previous.accountId?[]:previous.missionClaims});
    }
    function applyAccount(result,sentEquipmentVersion){
      if(result.currencyVersion!==currencyVersion)throw Error('Actualizá el juego para sincronizar tus monedas.');
      const state=read();if(state.accountId!==result.userId||result.revision<state.revision)return state;
      const acknowledged=new Set(result.acknowledged||[]);
      const pending=state.pending.filter(e=>!acknowledged.has(e.id));
      const dirty=state.equipmentDirty&&state.equipmentVersion!==sentEquipmentVersion;
      const owned=result.owned.filter(id=>find(id)&&(!find(id).adminOnly||result.adminUnion===true));
      const equipped=normalizeSkins(dirty?state.equipped:result.equipped);
      for(const character of Object.keys(equipped))if(!owned.includes(equipped[character]))delete equipped[character];
      return save({...state,coins:integer(result.coins)+pending.reduce((sum,e)=>sum+e.amount,0),owned,
        equipped,pending,missionClaims:[...new Set([...(result.missionClaims||state.missionClaims),...pending.filter(e=>/^aventura:[0-4]:[0-9]:mision$/.test(e.origin)).map(e=>e.origin)])],revision:result.revision,legacy:null,equipmentDirty:dirty,admin:result.admin===true,adminUnion:result.adminUnion===true});
    }
    function claimAdventure(world,mission){
      if(!Number.isInteger(world)||world<0||world>4||!Number.isInteger(mission)||mission<0||mission>9)throw Error('Misión inválida.');
      const state=read(),origin=`aventura:${world}:${mission}:mision`;
      if(state.missionClaims.includes(origin))return 0;
      const amount=mission===9?300:50;
      if(!Number.isSafeInteger(state.coins+amount))throw Error('Saldo fuera de rango.');
      state.missionClaims.push(origin);state.coins+=amount;
      if(state.accountId)state.pending.push({id:globalThis.crypto.randomUUID(),amount,origin,currencyVersion});
      save(state);changed();return amount;
    }
    function canPurchase(id){
      if(find(id)?.adminOnly)return false;
      if(find(id)?.character!=='azrak')return true;
      try {
        const unlocked=JSON.parse(storage.getItem('personajesDesbloqueadosAventuraGA')||'[]');
        const progress=JSON.parse(storage.getItem('progresoAventuraGA')||'{}');
        return (Array.isArray(unlocked)&&unlocked.includes('azrak'))||progress.estadoFinalAzrak==='completo';
      } catch { return false; }
    }
    function purchase(id){
      const item=find(id);if(!item)throw Error('Este traje no está disponible.');
      const state=read();
      if(state.owned.includes(id))return state;
      if(item.adminOnly)throw Error('Aren Unión requiere un desbloqueo de administrador.');
      if(!canPurchase(id))throw Error('Completá el Mundo 5 para desbloquear a Azrak y comprar su traje.');
      if(state.accountId){if(!purchaseHandler)throw Error('Conectate para comprar con las monedas de tu cuenta.');return purchaseHandler(id);}
      if(state.coins<item.price)throw Error(`Te faltan ${item.price-state.coins} monedas.`);
      state.coins-=item.price;state.owned.push(id);return save(state);
    }
    function equip(character,id){
      const state=read();
      if(id){const item=find(id);if(!item||item.character!==character||!state.owned.includes(id))throw Error('Primero conseguí este traje.');state.equipped[character]=id;}
      else delete state.equipped[character];
      if(state.accountId){state.equipmentDirty=true;state.equipmentVersion+=1;}
      save(state);changed();return state;
    }
    function earn(amount,origin){
      if(!Number.isSafeInteger(amount)||amount<=0)throw Error('Cantidad de monedas inválida.');
      const state=read();if(!Number.isSafeInteger(state.coins+amount))throw Error('Saldo fuera de rango.');
      if(state.accountId){if(![50,100,300].includes(amount)||!/^aventura:[a-zA-Z0-9_:]+$/.test(origin||''))throw Error('Recompensa de aventura inválida.');state.pending.push({id:globalThis.crypto.randomUUID(),amount,origin,currencyVersion});}
      state.coins+=amount;save(state);changed();return state.coins;
    }
    return Object.freeze({key,catalog,find,asset,previewAsset,normalizeSkins,read,claimAdventure,canPurchase,purchase,equip,earn,beginAccount,applyAccount,setPurchaseHandler:handler=>{purchaseHandler=handler;}});
  }
  return {key,catalog,find,asset,previewAsset,normalizeSkins,create};
});
