'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/tower-outfit-preview.js'),'utf8');
test('production gate removes UI, assets and all selection paths even with stale local data',async()=>{
 const c={Event,addEventListener(){},CosmeticStore:{read:()=>({accountId:'stale',equipped:{}})}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/tower-outfit-catalog.js'),'utf8'),c);vm.runInContext(source.replace('const DEVELOPMENT_OUTFIT_PREVIEW = true;','const DEVELOPMENT_OUTFIT_PREVIEW = false;'),c);
 assert.equal(c.TowerOutfitPreview.enabled,false);assert.equal(c.TowerOutfitPreview.catalog.length,11);for(const item of c.TowerOutfitPreview.catalog){assert.equal(await c.TowerOutfitPreview.select(item.id),false);assert.equal(c.TowerOutfitPreview.asset(item.character),null);assert.equal(c.TowerOutfitPreview.combat(item.character).length,0);}
});
test('development artwork never becomes a wallet costume or initial media download',()=>{
 const store=require('../js/cosmetic-store.js'),resourceSource=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');const art={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/tower-outfit-catalog.js'),'utf8'),art);assert.equal(art.TowerOutfitArtwork.length,10);for(const id of ['aren-campeon',...art.TowerOutfitArtwork.map(c=>c.id)]){assert.equal(store.catalog.some(p=>p.id===id),false);assert.equal(store.asset(id),null);}
 const context={self:{addEventListener(){}},URL,Request,Response};vm.createContext(context);vm.runInContext(resourceSource+';globalThis.core=CORE_ASSETS;globalThis.all=RESOURCE_ASSETS;',context);
 assert.equal(context.core.filter(p=>p.includes('/tower-preview/')).length,0);const count=11+art.TowerOutfitArtwork.reduce((n,c)=>n+Object.keys(c.assets).length,0);assert.equal(count,126);assert.equal(context.all.filter(p=>p.includes('/tower-preview/')).length,count);
 assert(!/setItem\(|\.rpc\(|\.equip\(|\.purchase\(|applyAccount\(/.test(source));
});
