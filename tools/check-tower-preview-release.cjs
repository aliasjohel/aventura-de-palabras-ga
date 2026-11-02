'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../js/tower-outfit-preview.js'),'utf8');
if(process.argv.includes('--production'))assert(source.includes('const DEVELOPMENT_OUTFIT_PREVIEW = false;'),'Production release blocked: disable DEVELOPMENT_OUTFIT_PREVIEW before Google Play');
else assert(source.includes('const DEVELOPMENT_OUTFIT_PREVIEW = true;'),'This candidate is the explicit development playtest');
assert(!/setItem\(|\.rpc\(|\.equip\(|\.purchase\(|applyAccount\(|setArenTrial\(/.test(source),'Visual module must not mutate business state');
console.log(process.argv.includes('--production')?'Production preview gate is off':'Development preview gate is explicit; no business mutations');
