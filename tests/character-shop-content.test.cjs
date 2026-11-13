'use strict';
const {test}=require('node:test'),assert=require('assert/strict'),fs=require('fs'),path=require('path'),cp=require('child_process'),vm=require('vm');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/\r\n/g,'\n');
test('shop-only presentation preserves combat, purchases, entitlements and original illustrations',()=>{
 for(const p of ['js/app.js','js/versus-engine.js','js/character-store.js','js/cosmetic-store.js','js/game-wallet.js','js/aren-premium.js','supabase/migrations/20261113224221_account_snapshot_readonly.sql'])assert.equal(read(p),cp.execFileSync('git',['show','f73b482:'+p],{cwd:root,encoding:'utf8',maxBuffer:16e6}).replace(/\r\n/g,'\n'),p);
 const C=require('../js/character-store.js');for(const c of C.catalog){const p='assets/images/personajes/versus/'+c.image;assert(fs.readFileSync(path.join(root,p)).equals(cp.execFileSync('git',['show','f73b482:'+p],{cwd:root,maxBuffer:16e6})),p);}
});
test('the six displayed abilities reuse real combat names and translated descriptions',()=>{
 const source=read('js/app.js'),body=source.match(/const habilidadesVersus = Object.freeze\((\{[\s\S]*?\n\})\);/)[1],context={};vm.runInNewContext('globalThis.abilities='+body,context);
 const skills={hombre_lobo:['invert','invertDetail'],kairos:['steal','stealDetail'],kalamo:['beast','beastDetail'],guardian_alba:['bounce','bounceDetail'],t_shadow:['blackHole','holeDetail']};
 for(const lang of ['es','en','pt-BR']){const combat=JSON.parse(read('locales/'+lang+'/adventure.json')).combat,shop=JSON.parse(read('locales/'+lang+'/shop.json')).characters;for(const [id,[name,description]] of Object.entries(skills)){assert(combat[name]);assert(combat[description]);assert(shop.entries[id].name);assert(shop.entries[id].attack);assert(shop.entries[id].finisher);if(lang==='es')assert.equal(combat[name],context.abilities[id].nombre);}assert(combat.wisdom);assert(combat.flashDetail);assert(shop.entries['aren-union'].name);assert(shop.premiumHelp);}
});
