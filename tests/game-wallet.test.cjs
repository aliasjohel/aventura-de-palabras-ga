const test=require('node:test');
const assert=require('node:assert/strict');
const {create:createStore}=require('../js/cosmetic-store.js');
const {create:createWallet}=require('../js/game-wallet.js');
function fixture(){
  const data=new Map([['progresoAventuraGA','{"currencyVersion":2,"monedas":5000}']]);
  const store=createStore({getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)});
  const wallet=createWallet(store,{setTimeout:()=>0,clearTimeout:()=>{}});
  let fail=false,after=null;const calls=[];
  const server={currencyVersion:2,userId:'one',coins:0,owned:[],equipped:{},revision:0};
  const seen=new Set();let imported=false;
  const client={rpc:async(name,args)=>{
    calls.push([name,args]);if(fail)throw Error('Sin conexión');
    if(name==='sync_game_wallet_v2'){
      if(!imported){server.coins+=args.p_legacy?.coins||0;server.owned=args.p_legacy?.owned||[];imported=true;}
      for(const e of args.p_events){if(!seen.has(e.id)){seen.add(e.id);server.coins+=e.amount;}}
      if(args.p_equipped)server.equipped=args.p_equipped;
    }else if(!server.owned.includes(args.p_skin)){
      server.coins-=store.find(args.p_skin).price;server.owned.push(args.p_skin);
    }
    server.revision++;
    const response=structuredClone({...server,acknowledged:args.p_events?.map(e=>e.id)||[],reward:args.p_match_id?{amount:100}:null});
    if(after){const fn=after;after=null;await fn();}
    return {data:response,error:null};
  }};
  wallet.connect(client,'one');
  return {store,wallet,server,client,calls,fail:v=>fail=v,after:fn=>after=fn};
}
test('importa saldo y conserva recompensas ganadas durante la sincronización',async()=>{
  const f=fixture();f.after(()=>f.store.earn(100,'aventura:bosque:palabra'));
  await f.wallet.sync();assert.equal(f.store.read().coins,5100);assert.equal(f.server.coins,5100);assert.equal(f.store.read().pending.length,0);
});
test('fallo de red mantiene eventos; reintento no duplica monedas',async()=>{
  const f=fixture();await f.wallet.sync();f.store.earn(300,'aventura:bosque:duelo');
  f.fail(true);await assert.rejects(f.wallet.sync(),/conexión/);assert.equal(f.store.read().coins,5300);assert.equal(f.store.read().pending.length,1);
  f.fail(false);await f.wallet.sync();await f.wallet.sync();assert.equal(f.store.read().coins,5300);assert.equal(f.server.coins,5300);
});
test('respuesta perdida tras compra se recupera sin doble cobro',async()=>{
  const f=fixture();await f.wallet.sync();
  f.after(()=>f.after(()=>{throw Error('Respuesta perdida');}));
  await assert.rejects(f.store.purchase('aren-bosque'),/perdida/);
  assert.equal(f.server.coins,3000);await f.store.purchase('aren-bosque');
  assert.equal(f.store.read().coins,3000);assert.equal(f.server.coins,3000);assert.deepEqual(f.store.read().owned,['aren-bosque']);
});
test('cambiar de cuenta durante petición no aplica saldo de la anterior',async()=>{
  const f=fixture();f.after(()=>f.wallet.connect(f.client,'two'));
  await assert.rejects(f.wallet.sync(),/cuenta cambió/);assert.equal(f.store.read().accountId,'two');assert.equal(f.store.read().coins,0);
  f.wallet.connect(f.client,'one');await f.wallet.sync();assert.equal(f.store.read().coins,5000);
});
test('equipo cambiado durante sincronización permanece pendiente',async()=>{
  const f=fixture();await f.store.purchase('aren-bosque');
  f.after(()=>f.store.equip('explorador','aren-bosque'));await f.wallet.sync();
  assert.equal(f.store.read().equipmentDirty,true);assert.equal(f.store.read().equipped.explorador,'aren-bosque');
  await f.wallet.sync();assert.equal(f.store.read().equipmentDirty,false);assert.equal(f.server.equipped.explorador,'aren-bosque');
});
test('cola de más de 100 premios se envía en lotes y premio versus viene del servidor',async()=>{
  const f=fixture();for(let i=0;i<105;i++)f.store.earn(100,'aventura:bosque:palabra');
  const result=await f.wallet.sync('match');assert.equal(result.reward.amount,100);assert.equal(f.store.read().coins,15500);
  assert.deepEqual(f.calls.map(([,args])=>args.p_events.length),[100,5]);
});
