const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../js/versus-room-supabase.js'),'utf8');
const roomId='11111111-1111-4111-8111-111111111111';
const otherId='22222222-2222-4222-8222-222222222222';
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function harness(language='es'){
 const events={},docEvents={},intervals=new Map(),timeouts=new Map(),storage=new Map(),channels=[],calls=[];
 let timer=0;const state={user:'alice',social:{accepted_invites:[]},failRoom:false,failSocial:false,socialPending:null};
 const session=()=>({user:{id:state.user,is_anonymous:false},access_token:'x.'+Buffer.from(JSON.stringify({is_anonymous:false})).toString('base64')+'.x'});
 const rooms=new Map([[roomId,{id:roomId,code:'ABC123',status:'complete',word_language:language,queue_mode:'classic'}],[otherId,{id:otherId,code:'XYZ123',status:'playing',word_language:'es',queue_mode:'classic'}]]);
 const players=[{user_id:'alice',alias:'Alice',slot:1},{user_id:'bob',alias:'Bob',slot:2}];
 const client={auth:{getSession:async()=>({data:{session:session()}}),refreshSession:async()=>({data:{session:session()}}),onAuthStateChange(fn){state.authChange=fn;return {data:{subscription:{}}};}},
  async rpc(name,args){calls.push({name,args});if(name==='get_versus_social_state'){if(state.socialPending)return state.socialPending;if(state.failSocial)return {error:{message:'offline'}};return {data:structuredClone(state.social)};}if(name==='get_versus_match_state')return {data:{matchId:args.p_room_id,status:rooms.get(args.p_room_id)?.status,wordLanguage:rooms.get(args.p_room_id)?.word_language}};return {data:null};},
  from(table){let id;const query={select(){return query;},eq(_key,value){id=value;return query;},async maybeSingle(){if(state.failRoom)return {error:{message:'offline'}};return {data:rooms.get(id)||null};},async order(){return {data:players};}};return query;},
  channel(name){const channel={name,handlers:[],on(type,filter,fn){channel.handlers.push({type,filter,fn});return channel;},subscribe(fn){channel.status=fn;channels.push(channel);return channel;}};return channel;},async removeChannel(){},
 };
 const context={console:{warn(){}},atob:s=>Buffer.from(s,'base64').toString(),Event,Promise,
  I18n:{language:language==='en'?'pt-BR':'en'},navigator:{onLine:true},
  document:{visibilityState:'visible',addEventListener:(e,fn)=>{docEvents[e]=fn;}},
  addEventListener:(e,fn)=>{events[e]=fn;},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  setInterval:(fn,ms)=>{intervals.set(++timer,{fn,ms});return timer;},clearInterval:id=>intervals.delete(id),setTimeout:(fn)=>{timeouts.set(++timer,fn);return timer;},clearTimeout:id=>timeouts.delete(id)};
 vm.runInNewContext(source,context);const adapter=context.VersusRoomSupabase.crearAdaptador(client);
 const accepted=(id=roomId)=>({room_id:id,challenger_id:'alice',challenged_id:'bob',word_language:language,room_status:rooms.get(id)?.status});
 return {adapter,state,rooms,players,accepted,events,docEvents,intervals,timeouts,storage,channels,calls,context};
}
for(const language of ['es','en','pt-BR'])test('missed acceptance recovers on startup with '+language+' room and another UI language',async()=>{
 const h=harness(language);h.state.social.accepted_invites=[h.accepted()];await h.adapter.inicializar();
 const received=[];h.adapter.suscribirInvitacionesAceptadas(room=>received.push(room));
 assert.equal(received.length,1);assert.equal(received[0].idioma,language);
 await h.adapter.cargarEstadoSocial();assert.equal(received.length,1,'must not navigate twice');
});
test('failed room recovery retries and does not poison the last recovered room',async()=>{
 const h=harness();await h.adapter.inicializar();h.state.social.accepted_invites=[h.accepted()];h.state.failRoom=true;
 await assert.rejects(h.adapter.cargarEstadoSocial(),/offline/);h.state.failRoom=false;
 const received=[];h.adapter.suscribirInvitacionesAceptadas(r=>received.push(r));await h.adapter.cargarEstadoSocial();assert.equal(received.length,1);
});
test('resume, online, polling and channel resubscribe recover without a realtime acceptance event',async()=>{
 for(const trigger of ['visibility','online','poll','subscribe']){
  const h=harness();await h.adapter.inicializar();let received=0;h.adapter.suscribirInvitacionesAceptadas(()=>received++);
  h.state.social.accepted_invites=[h.accepted()];
  if(trigger==='visibility')h.docEvents.visibilitychange();
  if(trigger==='online')h.events.online();
  if(trigger==='poll')[...h.intervals.values()].find(x=>x.ms===15000).fn();
  if(trigger==='subscribe')h.channels.find(x=>x.name.startsWith('versus-social-')).status('SUBSCRIBED');
  await tick();await tick();assert.equal(received,1,trigger);
 }
});
test('delayed or forged realtime payload cannot reopen a cancelled invitation',async()=>{
 const h=harness();await h.adapter.inicializar();let received=0;h.adapter.suscribirInvitacionesAceptadas(()=>received++);
 const channel=h.channels.find(x=>x.name.startsWith('versus-social-'));
 channel.handlers.find(x=>x.filter.table==='versus_invites').fn({table:'versus_invites',eventType:'UPDATE',new:{status:'accepted',room_id:roomId,challenger_id:'alice',challenged_id:'bob'}});
 await tick();assert.equal(received,0);assert.equal(h.adapter.obtenerSala(),null);
});
test('accepted invitation never replaces a different active room',async()=>{
 const h=harness();h.storage.set('aventura-versus-room-id',otherId);h.state.social.accepted_invites=[h.accepted()];
 await h.adapter.inicializar();assert.equal(h.adapter.obtenerSala().id,otherId);
});
test('outdated remembered room does not overwrite the newly recovered room',async()=>{
 const h=harness();h.storage.set('aventura-versus-room-id','33333333-3333-4333-8333-333333333333');h.state.social.accepted_invites=[h.accepted()];
 await h.adapter.inicializar();assert.equal(h.adapter.obtenerSala().id,roomId);
});
test('account switch discards a pending response belonging to the previous user',async()=>{
 const h=harness();await h.adapter.inicializar();let resolve;h.state.socialPending=new Promise(r=>{resolve=r;});const loading=h.adapter.cargarEstadoSocial();
 h.state.user='carol';h.state.authChange('SIGNED_IN',{user:{id:'carol',is_anonymous:false},access_token:'x.'+Buffer.from('{"is_anonymous":false}').toString('base64')+'.x'});
 resolve({data:{accepted_invites:[h.accepted()]}});await loading;assert.equal(h.adapter.obtenerSala(),null);assert.equal(h.adapter.obtenerEstadoSocial(),null);
});
test('explicitly leaving prevents delayed accepted snapshots from reopening the room',async()=>{
 const h=harness();h.state.social.accepted_invites=[h.accepted()];await h.adapter.inicializar();await h.adapter.salirSala();await h.adapter.cargarEstadoSocial();assert.equal(h.adapter.obtenerSala(),null);
});
test('hidden and offline tabs do not poll, simultaneous refreshes share one request',async()=>{
 const h=harness();await h.adapter.inicializar();const count=()=>h.calls.filter(x=>x.name==='get_versus_social_state').length;const before=count();
 h.context.document.visibilityState='hidden';h.events.focus();await tick();assert.equal(count(),before);
 h.context.document.visibilityState='visible';h.context.navigator.onLine=false;h.events.online();await tick();assert.equal(count(),before);
 let resolve;h.state.socialPending=new Promise(r=>{resolve=r;});const a=h.adapter.cargarEstadoSocial(),b=h.adapter.cargarEstadoSocial();assert.equal(count(),before+1);resolve({data:{accepted_invites:[]}});await Promise.all([a,b]);
});
test('late subscriber receives current preparation/combat state rather than the initial acceptance snapshot',async()=>{
 const h=harness('pt-BR');h.state.social.accepted_invites=[h.accepted()];await h.adapter.inicializar();
 h.rooms.get(roomId).status='playing';
 h.channels.find(x=>x.name.startsWith('versus-room-')).handlers.find(x=>x.filter.table==='versus_rooms').fn();
 await tick();await tick();const received=[];h.adapter.suscribirInvitacionesAceptadas(r=>received.push(r));
 assert.equal(received.length,1);assert.equal(received[0].estado,'playing');assert.equal(received[0].idioma,'pt-BR');
});
