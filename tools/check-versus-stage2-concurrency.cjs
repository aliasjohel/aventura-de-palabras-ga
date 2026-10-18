// Real parallel requests. Needs an external trusted SQL runner; no credentials in repo.
// Creates only tagged synthetic identities and removes only those identities in finally.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process'),assert=require('node:assert/strict');
const runner=process.env.VERSUS_SQL_RUNNER;
if(!runner)throw Error('Set VERSUS_SQL_RUNNER to a trusted PowerShell SQL runner accepting -SqlFile.');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'versus-stage2-concurrency-')),files=[];
const wrapper=path.join(dir,'run.ps1');files.push(wrapper);
fs.writeFileSync(wrapper,"param([string]$Runner,[string]$SqlFile)\n$ErrorActionPreference='Stop'\n& $Runner -SqlFile $SqlFile\n");
let sequence=0;
async function query(sql){const file=path.join(dir,++sequence+'.sql');files.push(file);fs.writeFileSync(file,sql);return new Promise((resolve,reject)=>cp.execFile(process.env.VERSUS_PWSH||'pwsh.exe',['-NoProfile','-File',wrapper,'-Runner',runner,'-SqlFile',file],{timeout:60000,maxBuffer:2e6},(error,stdout,stderr)=>{if(error)return reject(Error(stderr||stdout||error.message));try{resolve(JSON.parse(stdout.replace(/^\uFEFF/,'')));}catch(e){reject(Error(stdout||e.message));}}));}
const claims=u=>`select set_config('request.jwt.claim.sub','${u}',true),set_config('request.jwt.claims','{"sub":"${u}","is_anonymous":false}',true);`;
(async()=>{
 try{
 for(const [mode,lang] of [['retry','es'],['join','en'],['matchmaking','pt-BR']]){
  const ids=[crypto.randomUUID(),crypto.randomUUID(),crypto.randomUUID()], [a,b,c]=ids,marker=crypto.randomUUID();
  let fixture;
  try{
   fixture=(await query(`begin;
    insert into auth.users(id,is_anonymous,raw_app_meta_data) values ${ids.map(id=>`('${id}',false,'{"stage2_fixture":"${marker}"}')`).join(',')};
    ${ids.map((id,k)=>claims(id)+`select public.upsert_versus_profile('QA Carrera ${k}');`).join('\n')}
    insert into public.versus_friendships(requester_id,addressee_id,status) values('${a}','${b}','accepted');
    ${claims(a)} select public.send_versus_invite_localized('${b}','${lang}');
    ${claims(c)} ${mode==='join'?`select public.create_versus_room_localized('QA Privada','${lang}');`:mode==='matchmaking'?`select public.find_versus_opponent_localized('QA Rival',false,'classic','${lang}');`:''}
    select jsonb_build_object('invite',(select id from public.versus_invites where challenger_id='${a}' and challenged_id='${b}' and status='pending'),'code',(select code from public.versus_rooms where host_id='${c}')) fixture;
    commit;`))[0].fixture;
   const accept=`select to_jsonb(public.respond_versus_invite_localized('${fixture.invite}',true)) result;`;
   const alternative=mode==='retry'?accept:mode==='join'?`select to_jsonb(public.join_versus_room_localized('${fixture.code}','QA Rival')) result;`:`select public.find_versus_opponent_localized('QA Rival',false,'classic','${lang}') result;`;
   const request=action=>`begin;${claims(b)}set local role authenticated;${action.replace(' result;', ' result, pg_sleep(0.5);')}commit;`;
   const responses=await Promise.allSettled([query(request(accept)),query(request(alternative))]);
   assert.equal(responses.filter(x=>x.status==='fulfilled').length,mode==='retry'?2:1,'exactly one admission, or two idempotent responses');
   const v=(await query(`select jsonb_build_object('active_rooms',(select count(*) from public.versus_players p join public.versus_rooms r on r.id=p.room_id where p.user_id='${b}' and r.status in ('complete','preparing','playing')),'rooms',(select count(*) from public.versus_rooms r join public.versus_players p on p.room_id=r.id where p.user_id='${b}'),'wrong_languages',(select count(*) from public.versus_rooms r join public.versus_players p on p.room_id=r.id where p.user_id='${b}' and r.word_language<>'${lang}')) verification;`))[0].verification;
   assert.equal(v.active_rooms,1);assert.equal(v.rooms,1);assert.equal(v.wrong_languages,0);
   if(mode==='retry')assert.equal(responses[0].value[0].result.id,responses[1].value[0].result.id);
   else assert.match(responses.find(x=>x.status==='rejected').reason.message,/Termin|partida actual|respondido/,'expected admission rejection, not infrastructure failure');
   console.log('PASS concurrent '+mode+' ('+lang+'): one active room, correct language'+(mode==='retry'?', same accepted room on both responses':''));
  }finally{
   // IDs generated in this run AND a unique server-side marker must both match.
   const removed=(await query(`with removed as (delete from auth.users where id in (${ids.map(id=>`'${id}'`).join(',')}) and raw_app_meta_data->>'stage2_fixture'='${marker}' returning id) select count(*) removed from removed;`))[0].removed;
   assert.equal(removed,3,'all and only our three synthetic identities cleaned');
  }
 }
 }finally{for(const file of files)if(fs.existsSync(file))fs.unlinkSync(file);fs.rmdirSync(dir);}
})().catch(e=>{console.error(e);process.exitCode=1;});
