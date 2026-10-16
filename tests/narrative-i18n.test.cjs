const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const catalogs=Object.fromEntries(['es','en','pt-BR'].map(lang=>[lang,JSON.parse(fs.readFileSync(path.join(root,'locales',lang,'adventure.json'),'utf8')).narrative]));
const sources=new Set(Object.values(catalogs.es));
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function covered(source){
 assert(sources.has(source),'Missing narrative: '+source);
 for(const key of Object.keys(catalogs.es).filter(key=>catalogs.es[key]===source))for(const lang of ['en','pt-BR'])assert(catalogs[lang][key]?.trim(),'Missing '+lang+' '+key);
}
test('all fifty original mission titles, chapters and stories have translations',()=>{
 const app=read('js/app.js'),worlds=['Bosque','Desierto','Cumbres','Hielo'].map(world=>vm.runInNewContext(app.match(new RegExp('const historia'+world+' = ([\\s\\S]*?);\\r?\\n'))[1]));
 worlds.push(require('../js/azrak-world.js').missions);
 assert.equal(worlds.length,5);
 for(const world of worlds){assert.equal(world.length,10);for(const mission of world)for(const field of ['capitulo','titulo','texto'])covered(mission[field]);}
});
test('all active final cinematic, rescue and Kairos shots include localized text',()=>{
 const azrak=require('../js/azrak-world.js');const context={window:{}};vm.runInNewContext(read('js/kairos-forest.js'),context);
 const shots=[...azrak.betrayal,...azrak.finale,...azrak.shadowEncounter,...Object.values(context.window.KairosForest.scenes).flat()];
 assert(shots.length>=50);
 for(const shot of shots)for(const field of ['title','text','name'])if(shot[field]&&!['Zafir','Nivor','Nimbus','Aeralis','Lume','Shadow'].includes(shot[field]))covered(shot[field]);
});
test('all thirty trap stages retain the original Spanish source and have translations',()=>{
 let count=0;
 for(const file of ['js/desert-sand-trap.js','js/forest-root-trap.js','js/world-word-hazards.js']){
  for(const match of read(file).matchAll(/'([^'\r\n]*[.!])'/g)){covered(match[1]);count++;}
 }
 assert.equal(count,30);
});
