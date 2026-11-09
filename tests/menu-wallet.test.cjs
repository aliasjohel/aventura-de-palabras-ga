'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),{test}=require('node:test');
const source=fs.readFileSync(require('node:path').resolve(__dirname,'../js/menu-wallet.js'),'utf8');
function fixture(){
 const listeners={},elements={},classes=()=>{const s=new Set();return{add:x=>s.add(x),remove:x=>s.delete(x),contains:x=>s.has(x)}};
 for(const id of ['pantallaMenu','menuSaldo','menuSaldoValor','menuNivel','menuNivelValor','modoPruebas','btnTienda','btnMiAvatar'])elements[id]={hidden:false,textContent:'',classList:classes(),addEventListener(t,f){this[t]=f},click(){this.clicks=(this.clicks||0)+1},offsetWidth:100};
 elements.pantallaMenu.classList.add('activa');let wallet=null,xp=null,testing=false;const motion={matches:false,addEventListener(t,f){this.change=f}};
 const context={Intl,Number,document:{getElementById:id=>elements[id],hidden:false,addEventListener(){}},matchMedia:()=>motion,MutationObserver:class{observe(){}},GameUI:{text:(el,value)=>el.textContent=(value.key==='menu.levelShort'?'Nv. '+value.args.level:value.key),key:(key,args)=>({key,args}),attribute:(el,key,value)=>el[key]=value},CosmeticStore:{read:()=>wallet},PlayerXP:{read:()=>xp,text:(_,v)=>'Nivel '+v.n},AventuraShop:{testing:()=>testing},I18n:{language:'es',subscribe(){}},window:{addEventListener:(t,f)=>listeners[t]=f}};
 vm.runInNewContext(source,context);return{elements,motion,context,emit:t=>listeners[t](),wallet:v=>wallet=v,xp:v=>xp=v,testing:v=>testing=v};
}
test('confirmed snapshot only; updates without shop; account changes and logout',()=>{
 const f=fixture(),e=f.elements;assert.equal(e.menuSaldoValor.textContent,'—');assert.equal(e.menuNivel.hidden,false);assert.equal(e.menuNivelValor.textContent,'Nv. —');
 f.wallet({accountId:'qa-a',securityReady:false,coins:999});f.emit('wallet-updated');assert.equal(e.menuSaldoValor.textContent,'—');
 f.wallet({accountId:'qa-a',securityReady:true,coins:0});f.emit('wallet-updated');assert.equal(e.menuSaldoValor.textContent,'0');assert.equal(e.menuSaldo.classList.contains('menu-saldo-aumenta'),false);
 f.wallet({accountId:'qa-a',securityReady:true,coins:100});f.emit('wallet-updated');assert.equal(e.menuSaldoValor.textContent,'100');assert.equal(e.menuSaldo.classList.contains('menu-saldo-aumenta'),true);assert.equal(e.btnTienda.clicks,undefined);
 e.menuSaldo.animationend();f.wallet({accountId:'qa-a',securityReady:true,coins:90});f.emit('wallet-updated');assert.equal(e.menuSaldo.classList.contains('menu-saldo-aumenta'),false);
 f.wallet({accountId:'qa-b',securityReady:true,coins:500});f.emit('wallet-updated');assert.equal(e.menuSaldo.classList.contains('menu-saldo-aumenta'),false);
 f.emit('wallet-session-ended');assert.equal(e.menuSaldoValor.textContent,'—');assert.equal(e.menuNivel.hidden,false);assert.equal(e.menuNivelValor.textContent,'Nv. —');
});
test('reduced motion; test mode; matching XP; navigation and large balances',()=>{
 const f=fixture(),e=f.elements;f.wallet({accountId:'qa',securityReady:true,coins:12});f.emit('wallet-updated');f.motion.matches=true;
 f.wallet({accountId:'qa',securityReady:true,coins:1234567});f.emit('wallet-updated');assert.equal(e.menuSaldo.classList.contains('menu-saldo-aumenta'),false);assert.ok(e.menuSaldoValor.textContent.length<10);assert.equal(e.menuSaldo['aria-label'].args.coins,new Intl.NumberFormat('es').format(1234567));
 f.xp({userId:'other',level:12});f.emit('player-xp-updated');assert.equal(e.menuNivel.hidden,false);assert.equal(e.menuNivelValor.textContent,'Nv. —');
 f.xp({userId:'qa',level:12});f.emit('player-xp-updated');assert.equal(e.menuNivel.hidden,false);assert.equal(e.menuNivelValor.textContent,'Nv. 12');
 e.menuSaldo.click();e.btnMiAvatar.click();assert.equal(e.btnTienda.clicks,1);assert.equal(e.btnMiAvatar.clicks,1);
 f.testing(true);e.modoPruebas.change();assert.equal(e.menuSaldoValor.textContent,'—');assert.equal(e.menuNivel.hidden,false);assert.equal(e.menuNivelValor.textContent,'Nv. —');
});

test('real GameWallet and CosmeticStore pipeline: sync, reward snapshot, purchase and disconnect',async()=>{
 const f=fixture(),data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v))};
 const store=require('../js/cosmetic-store.js').create(storage),calls=[];
 f.context.CosmeticStore=store;
 let coins=3000,revision=1,xpLevel=7,owned=[];
 const client={rpc:async(name,args)=>{calls.push({name,args});if(name==='player_xp')return{data:{userId:'isolated-qa',xp:{userId:'isolated-qa',level:xpLevel,total:1000}}};if(name==='purchase_game_costume'){coins-=1000;revision++;owned=['aren-bosque'];}return{data:{userId:'isolated-qa',securityVersion:3,currencyVersion:2,coins,revision,owned,equipped:{},missionClaims:[]}};}};
 const root={dispatchEvent:event=>f.emit(event.type),addEventListener(){},setTimeout:()=>1,clearTimeout(){},PlayerXP:{apply:xp=>{f.xp(xp);f.emit('player-xp-updated');}}};
 const wallet=require('../js/game-wallet.js').create(store,root);
 wallet.connect(client,'isolated-qa');assert.equal(f.elements.menuSaldoValor.textContent,'—');
 await wallet.sync();assert.equal(f.elements.menuSaldoValor.textContent,new Intl.NumberFormat('es').format(3000));assert.equal(f.elements.menuNivelValor.textContent,'Nv. 7');
 coins=3500;revision++;xpLevel=8;await wallet.sync();assert.equal(f.elements.menuSaldoValor.textContent,new Intl.NumberFormat('es').format(3500));assert.equal(f.elements.menuNivelValor.textContent,'Nv. 8');
 await store.purchase('aren-bosque');assert.equal(f.elements.menuSaldoValor.textContent,new Intl.NumberFormat('es').format(2500));assert.ok(calls.some(c=>c.name==='purchase_game_costume'));
 wallet.connect(null,null);assert.equal(f.elements.menuSaldoValor.textContent,'—');assert.equal(f.elements.menuNivel.hidden,false);assert.equal(f.elements.menuNivelValor.textContent,'Nv. —');
});
