'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),old=file=>cp.execFileSync('git',['show','9404dcf:'+file],{cwd:root,encoding:'utf8',maxBuffer:16e6}),read=file=>fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n');
const family=require('../js/costume-resources.js').families['aren-union'];
test('21 WebP assets are progressive-only; PNG masters remain identical to the published originals',()=>{
 const c={self:{addEventListener(){}},URL,Request,Response};vm.runInNewContext(read('sw.js')+'\nglobalThis.a={resources:RESOURCE_ASSETS,core:CORE_ASSETS};',c);
 assert.equal(family.files.length,21);
 for(const file of family.files){assert(file.endsWith('.webp'));assert(c.a.resources.includes(file));assert(!c.a.core.includes(file));const master=file.slice(2).replace(/\.webp$/,'.png');assert(!c.a.resources.includes('./'+master));assert(fs.readFileSync(path.join(root,master)).equals(cp.execFileSync('git',['show','9404dcf:'+master],{cwd:root,maxBuffer:8e6})));}
});
test('combat implementation is byte-identical after normalizing the two resource URL changes',()=>{
 assert.equal(read('js/app.js').replace(/(assets\/images\/trajes\/aren-union-[a-z0-9-]+)\.webp/g,'$1.png'),old('js/app.js').replace(/\r\n/g,'\n'));
 const current=read('js/aren-union-preview.js').replaceAll('.webp','.png').replaceAll('(?:png|webp)','png');assert.equal(current,old('js/aren-union-preview.js').replace(/\r\n/g,'\n'));
});
test('all original outfit pose selectors preserve the same logical paths; only Union changes extension',()=>{
 const store=require('../js/cosmetic-store.js'),m={exports:{}};vm.runInNewContext(old('js/cosmetic-store.js'),{module:m,exports:m.exports});const before=m.exports;
 for(const item of store.catalog)for(const pose of [...item.poses,'final','planta','mano','vidrio','envejecido','anciano'])assert.equal(store.asset(item.id,pose),item.id==='aren-union'?before.asset(item.id,pose).replace(/\.png$/,'.webp'):before.asset(item.id,pose));
});
test('world downloads exclude Union outfits; explicit outfit preparation uses WebP without PNG masters',async()=>{
 const requests=[],saved=new Set(),downloads=[];const c={URL,CostumeResources:require('../js/costume-resources.js'),setTimeout:()=>1,clearTimeout(){},addEventListener(){},document:{baseURI:'https://game.test/',body:{append(){}},addEventListener(){},createElement:()=>({style:{},setAttribute(){},replaceChildren(){},remove(){}})},MessageChannel:class{constructor(){this.port1={close(){}};this.port2={postMessage:data=>this.port1.onmessage({data})};}},navigator:{serviceWorker:{controller:{postMessage(data,ports){if(data.type==='GET_VERSION')return ports[0].postMessage({resourcePacks:true});requests.push(data);if(data.checkOnly)return ports[0].postMessage({available:data.paths.every(p=>saved.has(p))});data.paths.forEach(p=>{if(!saved.has(p))downloads.push(p);saved.add(p);});ports[0].postMessage({available:true});}}}}};
 vm.runInNewContext(read('js/resource-catalog.js'),c);vm.runInNewContext(read('js/resource-loader.js'),c);
 await c.GameResources.world([],4);assert(requests.every(r=>r.paths.every(p=>!p.includes('/trajes/aren-union-'))));requests.length=0;
 await c.GameResources.combat([family.combat[0]],['explorador','mago']);const requested=requests.flatMap(r=>r.paths);for(const p of family.files)assert(requested.includes(p),p);assert(requested.every(p=>!(/aren-union-.*\.png$/.test(p))));
 const count=downloads.length;await c.GameResources.combat([family.combat[0]],['explorador','mago']);assert.equal(downloads.length,count,'Preparing the same cached outfit does not download it again');
});
