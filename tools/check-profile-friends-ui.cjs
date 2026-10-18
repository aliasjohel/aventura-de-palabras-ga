const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const offline=process.argv.includes('--offline');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');if(/\.(js|html|css|json|txt|svg|webmanifest)$/.test(file))data=Buffer.from(data.toString().replace(/\r\n/g,'\n'));if(offline&&path.basename(file)==='sw.js')data=Buffer.from(data.toString()+"\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...CORE_ASSETS.filter(p=>!p.startsWith('./assets/')));self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));");res.end(data);});});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 if(offline){
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});await context.route('https://**/*',r=>r.abort());
  const page=await context.newPage();await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
  await page.waitForFunction(async()=>{const r=await navigator.serviceWorker.getRegistration();return r?.active&&!!await caches.match(new URL('./js/app.js',location.href));},null,{timeout:60000});
  await page.reload();await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.evaluate(()=>I18n.ready);
  for(const lang of ['es','en','pt-BR']){
   await page.evaluate(async lang=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);},lang);
   await page.locator('#btnMiAvatar').click();await page.locator('#btnAmigosPerfil').click();
   assert.equal(await page.locator('#amigosPerfil').evaluate(e=>e.open),true);
   assert.equal(await page.locator('#btnGuardarCuentaVersus').isDisabled(),true);
   assert.equal(await page.locator('#formAgregarAmigoVersus button').isDisabled(),true);
   assert.equal(await page.locator('#tituloAmigosVersus').textContent(),lang==='en'?'Friends':'Amigos');
   assert(!await page.locator('#amigosPerfil').textContent().then(t=>t.includes('profile.friends.')));
   await page.locator('#cerrarAmigosPerfil').click();await page.locator('#cerrarAvatar').click();
  }
  console.log('PASS Friends actual PWA offline: three languages, Profile entry, clear connection message and online actions disabled');await context.close();return;
 }
 for(const [lang,width,height] of [['es',390,844],['en',390,844],['pt-BR',390,844],['pt-BR',320,740],['en',844,390]]){
  const context=await browser.newContext({viewport:{width,height},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());
  const page=await context.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
  await page.evaluate(async lang=>{
   document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);
   window.qa={online:true,calls:[],wins:4,guest:false,state:{profile:{alias:'QA Propio',friend_code:'QA123456'},friends:[{user_id:'friend',friendship_id:'friendship',alias:'Copiar <amigo>',friend_code:'QA654321',avatar:'mago',frame:'bosque',points:30}],incoming_requests:[{id:'incoming',alias:'Aceptar',friend_code:'QA111111'}],outgoing_requests:[{id:'outgoing',alias:'Cancelar',friend_code:'QA222222'}],incoming_invites:[],outgoing_invites:[]}};
   Object.defineProperty(navigator,'onLine',{configurable:true,get:()=>qa.online});
   qa.refresh=()=>actualizarPanelAmigosVersus(qa.guest?null:qa.state,{id:'own'},null,!qa.guest);
   const adapter={proveedor:'supabase',obtenerSala:()=>null,obtenerUsuarioId:()=> 'own',cargarEstadoSocial:async()=>{qa.calls.push(['load']);qa.refresh();return qa.state;},obtenerPerfilJugador:async()=>({alias:'QA Propio',played:4,points:30,favorites:[]}),obtenerPerfilPublico:async id=>{qa.calls.push(['profile',id]);return {id,alias:'Copiar <amigo>',avatar:'mago',frame:'bosque',points:30,played:12,wins:qa.wins,losses:7,draws:1,favorites:[],recent:[]};},responderSolicitudAmistad:async(id,accept)=>{qa.calls.push(['request',id,accept]);qa.state.incoming_requests=[];qa.refresh();},cancelarSolicitudAmistad:async id=>{qa.calls.push(['cancel',id]);qa.state.outgoing_requests=[];qa.refresh();},enviarSolicitudAmistad:async code=>{qa.calls.push(['add',code]);qa.refresh();},enviarInvitacion:async id=>{qa.calls.push(['challenge',id]);qa.state.outgoing_invites=[{id:'invite',alias:'Copiar <amigo>'}];qa.refresh();}};
   qa.adapter=adapter;qa.originalConnect=asegurarConexionSalasVersus;adaptadorSalasVersus=adapter;asegurarConexionSalasVersus=async()=>adapter;qa.refresh();
  },lang);
  await page.locator('#btnMiAvatar').click();await page.locator('#btnAmigosPerfil').click();
  assert.equal(await page.locator('#amigosPerfil').evaluate(e=>e.open),true);
  assert.equal(await page.locator('#pantallaMenu').evaluate(e=>e.classList.contains('activa')),true,'Profile opens Friends without entering multiplayer');
  assert.equal(await page.locator('#listaAmigosVersus strong').first().textContent(),'Copiar <amigo>');
  assert((await page.locator('#listaAmigosVersus .amigo-rango').textContent()).includes(lang==='pt-BR'?'Prata':lang==='en'?'Silver':'Plata'));
  assert.equal(await page.locator('#listaAmigosVersus .player-avatar img').count(),2);
  for(const url of await page.locator('#listaAmigosVersus img').evaluateAll(images=>images.map(i=>i.src)))assert(url.includes('/miniaturas/')&&url.endsWith('.webp'));
  assert.equal(await page.locator('#amigosPerfil').evaluate(e=>e.scrollWidth<=e.clientWidth),true,'no horizontal overflow');
  for (const tab of await page.locator('[data-amigos-tab]').all())assert.equal(await tab.evaluate(e=>e.scrollWidth<=e.clientWidth),true,'tab text fits');
  await page.locator('#listaAmigosVersus button').nth(0).click();await page.waitForFunction(()=>document.getElementById('estadoPerfilPublico').textContent==='');
  assert.equal(await page.locator('#estadisticasPerfilPublico dd').nth(1).textContent(),'4');await page.locator('#cerrarPerfilPublico').click();
  await page.evaluate(()=>qa.wins=9);await page.locator('#listaAmigosVersus button').nth(0).click();await page.waitForFunction(()=>document.getElementById('estadoPerfilPublico').textContent==='');
  assert.equal(await page.locator('#estadisticasPerfilPublico dd').nth(1).textContent(),'9','public profile reloads current stats');await page.locator('#cerrarPerfilPublico').click();
  await page.locator('#listaAmigosVersus button').nth(1).click();assert(await page.evaluate(()=>qa.calls.some(c=>c[0]==='challenge'&&c[1]==='friend')));
  await page.screenshot({path:require('os').tmpdir()+'/profile-friends-'+lang+'-'+width+'.png'});
  await page.locator('#tabAmigos-solicitudes').click();await page.locator('#solicitudesAmigosVersus button').nth(0).click();assert(await page.evaluate(()=>qa.calls.some(c=>c[0]==='request'&&c[2]===true)));
  await page.evaluate(()=>{qa.state.incoming_requests=[{id:'incoming2',alias:'Aceptar',friend_code:'QA111111'}];qa.refresh();});
  await page.locator('#solicitudesAmigosVersus button').nth(1).click();assert(await page.evaluate(()=>qa.calls.some(c=>c[0]==='request'&&c[2]===false)));
  await page.locator('#solicitudesEnviadasAmigos button').click();assert(await page.evaluate(()=>qa.calls.some(c=>c[0]==='cancel'&&c[1]==='outgoing')));
  await page.locator('#tabAmigos-agregar').click();await page.locator('#codigoNuevoAmigoVersus').fill('ab12cd34');assert.equal(await page.locator('#codigoNuevoAmigoVersus').inputValue(),'AB12CD34');await page.locator('#formAgregarAmigoVersus button').click();assert(await page.evaluate(()=>qa.calls.some(c=>c[0]==='add'&&c[1]==='AB12CD34')));
  await page.evaluate(()=>{qa.online=false;window.dispatchEvent(new Event('offline'));});assert.equal(await page.locator('#formAgregarAmigoVersus button').isDisabled(),true);assert((await page.locator('#conexionAmigosPerfil').textContent()).length>25);
  await page.evaluate(()=>{qa.online=true;window.dispatchEvent(new Event('online'));});await page.waitForFunction(()=>!document.querySelector('#formAgregarAmigoVersus button').disabled);
  await page.locator('#tabAmigos-lista').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tabAmigos-solicitudes').getAttribute('aria-selected'),'true');
  await page.locator('#cerrarAmigosPerfil').click();assert.equal(await page.locator('#editorAvatar').evaluate(e=>e.open),true,'Back returns to Profile');await page.locator('#cerrarAvatar').click();
  await page.setViewportSize({width:844,height:390});await page.evaluate(()=>mostrarPantalla(pantallaSalaVersus));await page.locator('#btnAmigosSala').click();assert.equal(await page.locator('#amigosPerfil').count(),1,'single shared panel');
  await page.evaluate(()=>{qa.guest=true;qa.refresh();});assert.equal(await page.locator('#registroCuentaVersus').isVisible(),true);assert.equal(await page.locator('#contenidoAmigosVersus').isVisible(),false);
  if(lang==='es'){
   await page.evaluate(async()=>{
    qa.guest=false;qa.refresh();
    const adapter=qa.adapter;
    Object.assign(adapter,{inicializar:async()=>{},suscribir:()=>()=>{},suscribirPartida:()=>()=>{},suscribirSocial:()=>()=>{},suscribirInvitacionesAceptadas:fn=>{qa.accepted=fn;return ()=>{};},obtenerPartida:()=>null});
    globalThis.AventuraSupabase={configuracionDisponible:()=>true,obtenerCliente:()=>({})};
    globalThis.AventuraOnline={cargarSupabase:async()=>{}};
    globalThis.VersusRoomSupabase={crearAdaptador:()=>adapter};
    adaptadorSalasVersus=adaptadorLocalSalasVersus;
    await qa.originalConnect();
    document.getElementById('amigosPerfil').close();document.getElementById('editorAvatar').showModal();document.getElementById('amigosPerfil').showModal();
    await PublicPlayerProfile.abrir('friend');
    qa.room={id:'accepted',codigo:'ABC123',estado:'complete',idioma:'pt-BR',jugadores:[{id:'own',alias:'Propio',anfitrion:true,listo:false},{id:'friend',alias:'Amigo',listo:false}]};
    adapter.obtenerSala=()=>qa.room;
    qa.accepted(qa.room);
   });
   for(const id of ['editorAvatar','amigosPerfil','perfilPublico'])assert.equal(await page.locator('#'+id).evaluate(e=>e.open),false,'accepted duel closes '+id);
   assert.equal(await page.locator('#pantallaSeleccionPersonajeVersus').evaluate(e=>e.classList.contains('activa')),true);
  }
  assert.deepEqual(errors,[]);assert(!await page.locator('#amigosPerfil').textContent().then(t=>t.includes('profile.friends.')),'no untranslated keys');
  console.log('PASS Friends UI '+lang+' '+width+'x'+height+': profile/multiplayer, stats, requests, code, challenge, offline, tabs, guest, thumbnails');await context.close();
 }
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
