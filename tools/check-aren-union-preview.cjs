const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});

async function assertCapeAttached(page){
  await page.waitForFunction(()=>{
    const body=document.getElementById('cuerpo'),cape=document.querySelector('.capa');
    const ratio=body.naturalWidth/body.naturalHeight,h=Math.min(body.offsetHeight,body.offsetWidth/ratio),w=h*ratio;
    const src=body.getAttribute('src'),[sx,sy]=src.includes('invocacion')?[.46,.49]:src.includes('victoria')?[.42,.28]:[.56,.31];
    const x=body.offsetLeft+(body.offsetWidth-w)/2+w*sx,y=body.offsetTop+(body.offsetHeight-h)/2+h*sy;
    return Math.hypot(cape.offsetLeft+cape.offsetWidth*.87-x,cape.offsetTop+cape.offsetHeight*.24-y)<2;
  });
}
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
for(const viewport of [{width:844,height:390},{width:390,height:844}])for(const victim of ['assets/images/personajes/versus/mago-base.png','assets/images/trajes/zafir-celestial-base-v1.png']){
const page=await browser.newPage({viewport,serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.clock.install();await page.goto('http://127.0.0.1:'+server.address().port+'/prueba-aren-union.html?integrado=1&victima='+encodeURIComponent(victim));
await page.locator('#escena.aren-solo').waitFor({state:'attached'});await page.clock.pauseAt(new Date(Date.now()+100));
await page.locator('.gema').evaluateAll(els=>els.forEach(el=>el.style.transition='none'));await page.clock.runFor(3600);await assertCapeAttached(page);
const orbit=await page.locator('.gema').first().evaluate(el=>parseFloat(getComputedStyle(el).left)/el.parentElement.clientWidth);assert(Math.abs(orbit-.49)<.02, String(orbit));
await page.clock.runFor(1800);assert(await page.locator('#escena').evaluate(el=>el.classList.contains('cristales-sellando')));assert.match(await page.locator('#cuerpo').getAttribute('src'),/invocacion/);assert.equal(await page.locator('.union-rayo').evaluate(el=>getComputedStyle(el).opacity),'0');
await page.clock.runFor(1100);assert(await page.locator('#escena').evaluate(el=>el.classList.contains('encerrado')));assert.equal(await page.locator('.union-rayo').evaluate(el=>getComputedStyle(el).opacity),'0');
const height=await page.locator('#rival').evaluate(el=>el.getBoundingClientRect().height/innerHeight);assert(height>(viewport.width<560?.4:.5));
await page.screenshot({path:path.join(root,'tools/union-sello-'+viewport.width+'-'+(victim.includes('celestial')?'celestial':'zafir')+'.png'),animations:'disabled'});
await page.clock.runFor(1700);assert.match(await page.locator('#cuerpo').getAttribute('src'),/disparo/);assert(await page.locator('#escena').evaluate(el=>el.classList.contains('disparando')&&!el.classList.contains('estallido')));
await page.locator('#cuerpo').evaluate(img=>img.decode());assert.equal(await page.locator('.capa').evaluate(el=>getComputedStyle(el).display),'none');await page.clock.runFor(300);assert(await page.locator('#escena').evaluate(el=>el.classList.contains('estallido')));assert.match(await page.locator('#cuerpo').getAttribute('src'),/disparo/);
await page.screenshot({path:path.join(root,'tools/union-destruccion-'+viewport.width+'.png'),animations:'disabled'});
await page.clock.runFor(1900);assert(await page.locator('#escena').evaluate(el=>el.classList.contains('victoria')));await assertCapeAttached(page);assert.deepEqual(errors,[]);await page.close();
}console.log('PASS: Zafir original/celestial scale, orbit centered on Aren, crystal seal without beam, single shot with extended arms, shatter and victory in both orientations');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
