'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/tower-outfit-preview.js'),'utf8');
test('production gate removes UI, assets and all selection paths even with stale local data',async()=>{
 const c={Event,addEventListener(){},CosmeticStore:{read:()=>({accountId:'stale',equipped:{}})}};vm.createContext(c);vm.runInContext(source.replace('const DEVELOPMENT_OUTFIT_PREVIEW = true;','const DEVELOPMENT_OUTFIT_PREVIEW = false;'),c);
 assert.equal(c.TowerOutfitPreview.enabled,false);assert.equal(await c.TowerOutfitPreview.select('aren-campeon'),false);assert.equal(c.TowerOutfitPreview.asset('explorador'),null);assert.equal(c.TowerOutfitPreview.combat('explorador').length,0);
});
test('development artwork never becomes a wallet costume or initial media download',()=>{
 const store=require('../js/cosmetic-store.js'),resourceSource=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');assert.equal(store.catalog.some(p=>p.id==='aren-campeon'),false);assert.equal(store.asset('aren-campeon'),null);
 const context={self:{addEventListener(){}},URL,Request,Response};vm.createContext(context);vm.runInContext(resourceSource+';globalThis.core=CORE_ASSETS;globalThis.all=RESOURCE_ASSETS;',context);
 assert.equal(context.core.filter(p=>p.includes('/tower-preview/')).length,0);assert.equal(context.all.filter(p=>p.includes('/tower-preview/')).length,11);
 assert(!/setItem\(|\.rpc\(|\.equip\(|\.purchase\(|applyAccount\(/.test(source));
});
