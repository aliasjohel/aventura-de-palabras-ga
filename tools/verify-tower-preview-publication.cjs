'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),expected=process.argv[2],baseline='4ac4b0b543698c9a03dafb4edebe6ee4fb29fa42',out=path.join(root,'.local-developer/aren-champion-qa');assert(/^[0-9a-f]{40}$/.test(expected||''));fs.mkdirSync(out,{recursive:true});
const git=(args,opts={})=>cp.execFileSync('git',args,{cwd:root,windowsHide:true,stdio:['pipe','pipe','pipe'],maxBuffer:10e6,...opts});
let browser;
(async()=>{try{
 // Credential stays in memory; never logged or written to a command argument/file.
 const raw=git(['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}});
 const fields=Object.fromEntries(raw.trim().split('\n').map(s=>[s.slice(0,s.indexOf('=')),s.slice(s.indexOf('=')+1)]));if(!fields.password)throw Error('GitHub credential unavailable');
 const headers={Authorization:'Bearer '+fields.password,Accept:'application/vnd.github+json','User-Agent':'Codex-Aren-visual-playtest'};
 const get=async endpoint=>{const r=await fetch('https://api.github.com/repos/aliasjohel/aventura-de-palabras-ga/'+endpoint,{headers});if(!r.ok)throw Error('GitHub metadata HTTP '+r.status);return r.json();};
 const pages=await get('pages'),build=await get('pages/builds/latest');
 const metadata={url:pages.html_url,status:pages.status,source:pages.source,commit:build.commit,buildStatus:build.status};fs.writeFileSync(path.join(out,'pages.json'),JSON.stringify(metadata,null,2));
 if(build.commit!==expected||build.status!=='built'||pages.status!=='built'){console.log(JSON.stringify({ready:false,...metadata}));process.exitCode=2;return;}
 assert.equal(pages.source.branch,'main');assert.equal(pages.source.path,'/');
 const changed=git(['diff','--name-only',baseline,expected],{encoding:'utf8'}).trim().split(/\r?\n/).filter(p=>p==='index.html'||p==='sw.js'||p.startsWith('js/')||p.startsWith('css/')||p.startsWith('assets/'));
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),files=[];
 for(const file of changed){const response=await fetch(new URL(file+'?verify='+expected,pages.html_url),{cache:'no-store'});assert.equal(response.status,200,file);const bytes=Buffer.from(await response.arrayBuffer()),wanted=sha(git(['show',expected+':'+file]));assert.equal(sha(bytes),wanted,file+' public Git bytes');files.push({path:file,sha256:wanted,bytes:bytes.length});}
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:844,height:390},isMobile:true,hasTouch:true,serviceWorkers:'block'}),page=await context.newPage(),errors=[],art=[];
 await context.route('**/*',route=>{const r=route.request(),u=new URL(r.url());if(!['GET','HEAD'].includes(r.method())||u.hostname.endsWith('.supabase.co'))return route.abort();return route.continue();});page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('/tower-preview/'))art.push(new URL(r.url()).pathname);});
 await page.goto(pages.html_url+'?verify='+expected,{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>globalThis.TowerOutfitPreview);assert.equal(art.length,0);
 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');});await page.click('#btnConfiguracion');await page.selectOption('#towerOutfitPreviewSelect','aren-campeon');await page.click('#towerOutfitPreviewApply');await page.waitForFunction(()=>TowerOutfitPreview.selection()==='aren-campeon');assert.equal(new Set(art).size,5);assert.equal(await page.evaluate(()=>CosmeticStore.catalog.some(p=>p.id==='aren-campeon')),false);
 await page.screenshot({path:path.join(out,'public-android-selector.png')});
 const sprite=await page.evaluate(()=>{personajeJugadorVersus='explorador';return spriteTrajeVersus(personajeVersusUno,'explorador',srcExploradorBaseVersus);});assert(sprite.endsWith('/aren-campeon-base-v1.webp'));
 await page.evaluate(()=>TowerOutfitPreview.select(''));assert.equal(await page.evaluate(()=>TowerOutfitPreview.selection()),null);assert.deepEqual(errors,[]);
 const result={passed:true,checkedAt:new Date().toISOString(),commit:expected,baseline,version:'v388-arenchampion1',url:pages.html_url,pagesBuiltExpectedCommit:true,files,publicAndroidEmulationSelectorPassed:true,beforeSelectionArtRequests:0,selectedUniqueImages:5,permanentInventoryEntry:false,serverWrites:0,physicalAndroidTest:false,pageErrors:errors};fs.writeFileSync(path.join(out,'public-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({passed:true,commit:expected,version:result.version,publicHashesVerified:files.length,url:result.url,pageErrors:errors}));
}finally{await browser?.close();}})().catch(e=>{console.error('Public verification failed: '+e.message);process.exitCode=1;});
