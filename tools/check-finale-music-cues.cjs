const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();await page.waitForTimeout(500);
await page.evaluate(()=>{
const now=performance.now.bind(performance);performance.now=()=>now()*30;
window.tracks=[];window.seen=[];
window.Audio=class extends EventTarget {
 constructor(src){super();this.src=src;this.duration=src.includes('victoria-mundo5')?130.951813:src.includes('musiclfiles')?134.896313:183.864;this.readyState=2;this.paused=true;this.base=0;this.start=now();this.seeks=[];window.tracks.push(this);}
 get currentTime(){return Math.min(this.duration,this.base+(this.paused?0:(now()-this.start)*.03));}
 set currentTime(v){this.base=v;this.start=now();this.seeks.push(v);}
 get ended(){return this.currentTime>=this.duration;}
 play(){if(this.paused){this.start=now();this.paused=false;}return Promise.resolve();}
 pause(){this.base=this.currentTime;this.paused=true;}
 removeAttribute(){} load(){}
};
new MutationObserver(()=>{const l=document.querySelector('.cinematica-azrak');if(l&&l.dataset.shot!==window.seen.at(-1)?.key)window.seen.push({key:l.dataset.shot,t:window.tracks[0].currentTime,peacePaused:window.tracks[2].paused,battlePaused:window.tracks[0].paused,endingPaused:tracks[1].paused,endingTime:tracks[1].currentTime,endingVolume:tracks[1].volume});}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['data-shot']});
window.done=AzrakWorld.playCinematic('final');
});
await page.waitForFunction(()=>seen.some(s=>s.key==='portal-nivor'),{},{timeout:15000});
const entry=await page.evaluate(()=>seen.find(s=>s.key==='portal-nivor'));assert.ok(Math.abs(entry.t-17)<3.2);
await page.waitForFunction(()=>seen.some(s=>s.key==='silencio'),{},{timeout:15000});
assert.ok(await page.evaluate(()=>{const s=seen.find(s=>s.key==='silencio');return s.peacePaused&&s.battlePaused;}));
await page.waitForFunction(()=>seen.some(s=>s.key==='amanecer'));
assert.ok(await page.evaluate(()=>{const s=seen.find(s=>s.key==='amanecer');return s.battlePaused&&!s.peacePaused;}));
await page.waitForSelector('.cinematica-azrak',{state:'detached',timeout:15000});
assert.equal(await page.evaluate(()=>tracks[0].seeks.filter(t=>t>0).length),0);
assert.equal(await page.evaluate(()=>tracks[1].seeks.filter(t=>t>0).length),0);
const cue=await page.evaluate(()=>({intro:seen.find(s=>s.key==='azrak-interrumpe'),smile:seen.find(s=>s.key==='calamo-llegada'),silent:seen.find(s=>s.key==='silencio')}));
assert.equal(cue.intro.endingPaused,false);
assert.ok(cue.intro.endingTime<.3);
assert.ok(Math.abs(cue.smile.endingTime-10)<3.2);
assert.ok(cue.silent.endingPaused);
assert.ok(cue.silent.endingVolume<.01);
assert.ok(cue.silent.endingTime<134);
assert.deepEqual(errors,[]);console.log('PASS battle cue, ending starts at zero with Azrak, smile at 10s, fade to silence, peace and cleanup');

}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});