const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const world=require('../js/azrak-world.js');
test('seven distinct difference regions and offline illustrations exist',()=>{
 assert.equal(world.chamberDifferences.length,7);const worker=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
 for(const src of Object.values(world.differenceArt)){assert.ok(fs.existsSync(path.join(__dirname,'..',src)));assert.ok(worker.includes(src));}
 world.chamberDifferences.forEach((d,i)=>{assert.ok(d.x>=0&&d.y>=0&&d.x+d.w<=1536&&d.y+d.h<=1024);assert.equal(world.chamberDifferenceAt(d.x+d.w/2,d.y+d.h/2),i);assert.equal(world.chamberDifferenceAt(d.x+d.w/2,d.y+d.h/2,new Set([i])),-1);});
 assert.equal(world.chamberDifferenceAt(768,400),-1);
});
