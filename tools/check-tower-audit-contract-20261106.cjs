'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.local-developer/tower-rewards-audit-20261106');
const audit=JSON.parse(fs.readFileSync(path.join(root,'docs/tower-rewards-audit-20261106.json'))),plan=JSON.parse(fs.readFileSync(path.join(root,'docs/tower-rewards-integration-plan-20261106.json'))),live=JSON.parse(fs.readFileSync(path.join(out,'functions.json')));
const migration='E:/Proyectos/Aventura-de-Palabras-i18n-stage2b/supabase/migrations/20261031183634_tower_authoritative_combat_and_coins.sql',sql=fs.readFileSync(migration,'utf8');
function body(text){const marker=/\bas\s+(\$[A-Za-z_]*\$)/i.exec(text);assert(marker);const start=marker.index+marker[0].length,end=text.indexOf(marker[1],start);assert(end>=start);return text.slice(start,end).replaceAll('\r\n','\n').trim();}
const rows=[];for(const match of sql.matchAll(/create (?:or replace )?function\s+([a-z_]+\.[a-z_]+)\(/gi)){
 if(!match[1].split('.')[1].startsWith('tower_'))continue;
 const fn=live.find(f=>(f.signature.startsWith('versus_private.')?f.signature.split('(')[0]:'public.'+f.signature.split('(')[0])===match[1]);assert(fn,match[1]);
 rows.push({name:match[1],matches:body(fn.definition)===body(sql.slice(match.index))});
}
assert.equal(rows.length,live.filter(f=>f.signature.startsWith('tower_')||f.signature.startsWith('versus_private.tower_')).length);assert(rows.length>0);assert(rows.every(r=>r.matches),'Local tested function bodies must match installed Tower');
assert.equal(audit.readOnly,'on');assert.equal(audit.rollout.globalEnabled,false);assert.equal(audit.rollout.onlyPreviouslyApprovedOwner,true);assert(audit.towerTables.every(t=>t.rls&&!t.anonAccess&&!t.authenticatedAccess));
assert.equal(new Set(plan.floorMatrix.map(r=>r.caseId)).size,110);assert.equal(plan.characters.length,11);assert.equal(plan.frames.length,3);assert.equal(plan.floorMatrix.reduce((n,r)=>n+r.coins,0),5720);
assert(/const DEVELOPMENT_OUTFIT_PREVIEW = true;/.test(fs.readFileSync(path.join(root,'js/tower-outfit-preview.js'),'utf8')),'Keep the user-authorized visual selector');
const owned=new Set();for(const char of plan.characters){const floors=plan.floorMatrix.filter(r=>r.character===char.character);assert.deepEqual(floors.map(r=>r.floor),[1,2,3,4,5,6,7,8,9,10]);assert.equal(floors.reduce((n,r)=>n+r.coins,0),520);assert(floors.slice(0,9).every(r=>r.eligibleCostume===null));assert.equal(floors[9].eligibleCostume,char.proposedItemId);assert(!owned.has(char.proposedItemId));owned.add(char.proposedItemId);}
assert.deepEqual(plan.frames.map(f=>f.completedCharacters),[1,6,11]);assert(!owned.has('tower_leyenda'));
const result={passed:true,kind:'audit snapshot and proposed contract, not implemented cosmetic grants',floorCases:110,characters:11,frames:3,maximumCoins:5720,previewEnabled:true,comparedFunctionBodies:rows.length,allInstalledBodiesMatch:true,migrationSHA256:crypto.createHash('sha256').update(fs.readFileSync(migration)).digest('hex'),rows,productionWrites:0};
fs.writeFileSync(path.join(out,'contract-tests.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,rows:undefined}));
