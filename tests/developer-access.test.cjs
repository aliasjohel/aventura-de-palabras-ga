'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync(require('path').join(__dirname,'../js/developer-access.js'),'utf8');
async function boot({hostname='game.test',protocol='https:',fragment='',saved='old-author-token',authorBuild=false,storageFails=false}={}){
 const data=new Map([['aventuraAccesoDesarrolladorV1',saved]]);
 const c={URLSearchParams,location:{hostname,protocol,pathname:'/game/',search:'',hash:fragment},history:{replaceState:(_s,_t,url)=>c.url=url},localStorage:{removeItem:k=>{if(storageFails)throw Error('unavailable');data.delete(k);}}};
 vm.runInNewContext(authorBuild?source.replace('const localAuthorBuild = false','const localAuthorBuild = true'):source,c);await c.AventuraDeveloper.ready;return{api:c.AventuraDeveloper,data,url:c.url};
}
test('public artifact rejects author access from URL, saved tokens and localhost',async()=>{
 for(const hostname of ['game.test','localhost','127.0.0.1','[::1]']){const r=await boot({hostname,fragment:'#desarrollador=old-author-token&other=keep'});assert.equal(r.api.enabled,false);assert.equal(r.data.has('aventuraAccesoDesarrolladorV1'),false);assert.equal(r.url,'/game/#other=keep');assert.equal(r.api.activate,undefined);}
});
test('only an explicit author build served over loopback HTTP can enable tools',async()=>{
 for(const hostname of ['localhost','127.0.0.1','[::1]'])assert.equal((await boot({hostname,protocol:'http:',authorBuild:true})).api.enabled,true);
 assert.equal((await boot({authorBuild:true})).api.enabled,false);assert.equal((await boot({hostname:'localhost',protocol:'file:',authorBuild:true})).api.enabled,false);
});
test('storage failure never enables public developer access',async()=>{assert.equal((await boot({storageFails:true,fragment:'#desarrollador=anything'})).api.enabled,false);});
