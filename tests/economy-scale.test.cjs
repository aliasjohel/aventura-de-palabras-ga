'use strict';
// Security v3 supersedes local currency scaling/import. Never resurrect client grants.
const test=require('node:test'),assert=require('node:assert/strict'),{create,key}=require('../js/cosmetic-store.js');
function fixture(entries=[]){const map=new Map(entries),storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};return{map,storage,store:create(storage)};}
const receipt=(id,coins,revision=1)=>({userId:id,currencyVersion:2,securityVersion:3,coins,revision,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'},missionClaims:['aventura:0:0:mision']});
test('historical currency and pending grants remain archived, never multiplied or imported',()=>{
 const raw=JSON.stringify({accountId:'a',coins:230,owned:['aren-bosque'],pending:[{id:'old',amount:30}],revision:7}),f=fixture([[key,raw],['progresoAventuraGA','{"monedas":200}']]);
 assert.equal(f.store.read().coins,0);assert.equal(f.map.get(key),raw);
 f.store.beginAccount('a');assert.equal(f.store.read().securityReady,false);assert.equal(f.store.read().coins,0);
 assert.equal(JSON.parse(f.map.get(key+':pre-security-v3:a')).wallet,raw);assert.equal(f.store.read().requests.length,0);
});
test('new and historical-progress-only installs require a verified wallet',()=>{
 for(const entries of [[],[['progresoAventuraGA','{"monedas":200}']]]){const f=fixture(entries);assert.equal(f.store.read().coins,0);f.store.beginAccount('a');assert.equal(f.store.read().coins,0);assert.equal(f.store.read().securityReady,false);}
});
test('local campaign claims and generic credits cannot create money, including replay/restart',()=>{
 const f=fixture();f.store.beginAccount('a');
 for(let world=0;world<5;world++)for(let mission=0;mission<10;mission++)assert.throws(()=>f.store.claimAdventure(world,mission),/intento online/);
 assert.throws(()=>f.store.earn(100),/desactivados/);assert.equal(f.store.read().coins,0);
 assert.throws(()=>create(f.storage).claimAdventure(0,0),/intento online/);
});
test('authoritative balances persist across restarts without scaling or duplicate receipts',()=>{
 const f=fixture();f.store.beginAccount('a');const r=receipt('a',2050,3);f.store.applyAccount(r);f.store.applyAccount(r);
 assert.equal(create(f.storage).read().coins,2050);assert.equal(f.store.read().missionClaims.length,1);assert.equal(f.store.read().securityReady,true);
 f.store.applyAccount(receipt('a',1,2));assert.equal(f.store.read().coins,2050);
 assert.throws(()=>f.store.applyAccount({...r,coins:-1,revision:4}),/inválida/);assert.equal(f.store.read().coins,2050);
 assert.throws(()=>f.store.applyAccount({...r,securityVersion:2}),/Actualizá/);
});
test('switching accounts isolates balances and ignores replies for the previous account',()=>{
 const f=fixture();f.store.beginAccount('a');f.store.applyAccount(receipt('a',2050));f.store.beginAccount('b');assert.equal(f.store.read().coins,0);
 f.store.applyAccount(receipt('a',9999,2));assert.equal(f.store.read().coins,0);f.store.applyAccount(receipt('b',500));
 f.store.beginAccount('a');assert.equal(f.store.read().coins,2050);f.store.beginAccount('b');assert.equal(f.store.read().coins,500);
});
