// Read-only comparison: v368 Git bytes versus the local candidate, same server/browser.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),cp=require('node:child_process'),vm=require('node:vm');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),baseline='d3d0bf1',bodies=new Map();let old=false;
const text=/\.(?:html|js|json|css|svg|txt|webmanifest)$/;
function bytes(file){const key=(old?'old:':'new:')+file;if(!bodies.has(key)){
 let value=old&&text.test(file)?cp.execFileSync('git',['show',baseline+':'+file],{cwd:root,maxBuffer:8e6,stdio:['ignore','pipe','ignore']}):fs.readFileSync(path.join(root,file));
 if(text.test(file))value=Buffer.from(value.toString().replace(/\r\n/g,'\n'));bodies.set(key,value);
}return bodies.get(key);}
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';
 if(path.resolve(root,file).startsWith(root+path.sep)===false)throw Error('path');
 res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.json':'application/json','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.wav':'audio/wav','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream');
 res.setHeader('Cache-Control','no-store');res.end(bytes(file));
}catch{res.writeHead(404);res.end();}});
async function run(browser,version){old=version===368;const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage(),cdp=await context.newCDPSession(page);await cdp.send('Network.enable');
 await page.addInitScript(()=>{
  const observer=new MutationObserver(()=>{
   if(document.body&&!document.body.classList.contains('intro-pendiente')&&document.querySelector('#pantallaMenu.activa')){
    window.measuredMenuReady=performance.now();observer.disconnect();
   }
  });
  observer.observe(document,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
 });
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:5*1024*1024,uploadThroughput:1024*1024});
 let count=0,transferred=0,sdkStart,sdkEnd;const requested=[];const errors=[],networkFailures=[],httpErrors=[],consoleErrors=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('requestfailed',request=>networkFailures.push({url:request.url(),error:request.failure()?.errorText}));
 page.on('response',response=>{if(response.status()>=400)httpErrors.push({url:response.url(),status:response.status()});});
 page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});
 cdp.on('Network.requestWillBeSent',e=>{if(performance.now()-start<10000){count++;requested.push(e.request.url);}if(e.request.url.includes('vendor/supabase-'))sdkStart=e.timestamp;});
 cdp.on('Network.loadingFinished',e=>{if(performance.now()-start<10000)transferred+=e.encodedDataLength;});
 page.on('response',r=>{if(r.url().includes('vendor/supabase-'))sdkEnd=performance.now();});
 const start=performance.now();let sdkResult;
 await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded',timeout:90000});
 await page.evaluate(()=>I18n.ready);const ready=performance.now()-start;
 // Load the SDK only: no authentication, profiles, rooms or RPC writes.
 sdkResult=await page.evaluate(async()=>{const start=performance.now();try{await AventuraOnline.cargarSupabase();return {ms:performance.now()-start,ok:true};}catch(e){return {ms:performance.now()-start,ok:false,error:e.message};}});
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,ms:r.duration,bytes:r.transferSize})));
 await page.waitForTimeout(Math.max(0,10000-(performance.now()-start)));
 const menuReady=await page.evaluate(()=>window.measuredMenuReady || null);
 const result={version,readyMs:Math.round(ready),requestsFirst10s:count,networkMBFirst10s:+(transferred/1e6).toFixed(3),sdkWaitMs:Math.round(sdkResult.ms),sdkOk:sdkResult.ok,errors,requestedMB:+(requested.reduce((sum,url)=>{try{return sum+bytes(new URL(url).pathname.slice(1)||'index.html').length;}catch{return sum;}},0)/1e6).toFixed(3),largestRequests:requested.map(url=>{const file=new URL(url).pathname.slice(1)||'index.html';try{return {file,mb:+(bytes(file).length/1e6).toFixed(3)};}catch{return {file,mb:0};}}).sort((a,b)=>b.mb-a.mb).slice(0,12)};
 result.menuReadyMs=menuReady ? Math.round(Math.max(menuReady,ready)) : null;
 result.networkFailures=networkFailures.slice();result.httpErrors=httpErrors.slice();result.consoleErrors=consoleErrors.slice();
 const sdk=resources.find(r=>r.name.includes('vendor/supabase-'));if(sdk)result.sdkRequestMs=Math.round(sdk.ms);
 await context.close();return result;
}
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 // Warm text snapshots before the measured navigation; Git process startup is not browser load time.
 old=true;for(const file of cp.execFileSync('git',['ls-files'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).filter(f=>text.test(f))){try{bytes(file);}catch{}}
 const results=[];for(const version of (process.argv.includes('--candidate')?[369]:[368,369]))results.push(await run(browser,version));
 const installations=[];for(const version of [368,369]){old=version===368;const source=bytes('sw.js').toString(),c={self:{addEventListener(){}},URL,Request,Response};
 vm.runInNewContext(source+'\nglobalThis.core=CORE_ASSETS;',c);installations.push({version,coreFiles:c.core.length,coreMB:+(c.core.reduce((sum,p)=>sum+bytes(p==='./'?'index.html':p.slice(2)).length,0)/1e6).toFixed(3)});}
 console.log(JSON.stringify({method:'Edge headless, clean contexts, 40 ms latency, 5 MiB/s page network, SW blocked for comparable startup; uncompressed HTTP bytes; 10-second window. Installation sizes calculated from exact published bytes, not timed.',results,installations},null,2));
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
