// Embedded PostgreSQL only. Never opens a production connection or creates real users.
const fs=require('node:fs'),assert=require('node:assert/strict');
const {PGlite}=require('C:/Users/User/.codex/cache/versus-rewards-test/node_modules/@electric-sql/pglite');
const expanded=require('../js/word-banks-versus-expanded.js').banks;
const rules=require('../js/word-gameplay.js');
const root=require('node:path').resolve(__dirname,'..');
const read=f=>fs.readFileSync(root+'/'+f,'utf8');
function fn(file,name){const s=read(file),start=s.toLowerCase().search(new RegExp('create(?: or replace)? function '+name.replaceAll('.','\\.')+'\\s*\\(','i'));assert(start>=0,name);const tail=s.slice(start),m=/\bas\s+(\$[a-z_]*\$)/i.exec(tail);assert(m,name);const close=tail.indexOf(m[1],m.index+m[0].length);assert(close>=0);return tail.slice(0,close+m[1].length)+';';}
const localized='supabase/migrations/20261018005734_online_word_languages.sql',stage2='supabase/migrations/20261018153728_versus_stage2_invites_reconnect.sql';
const migration=read('supabase/migrations/20261019005111_expand_versus_localized_vocabulary.sql');
const uid=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{const db=new PGlite();try{
 await db.exec(`create role anon;create role authenticated;create schema auth;create schema private;create schema versus_private;
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create table auth.users(id uuid primary key);
 create table public.versus_rooms(id uuid primary key,host_id uuid,status text,word_language text);
 create table public.versus_players(room_id uuid,user_id uuid,alias text,slot int,theme_key text,preparation_ready boolean default false,rematch_ready boolean default false);
 create table public.versus_matches(id uuid primary key,room_id uuid,status text,started_at timestamptz default now());
 create table public.versus_challenges(room_id uuid,owner_id uuid,target_id uuid,theme_key text,words text[],updated_at timestamptz default now(),primary key(room_id,owner_id));
 create table public.versus_match_players(match_id uuid,user_id uuid,current_word_index int,completed_words int,lives int,last_failed_word text,finished boolean,finish_reason text);
 create function public.is_versus_room_member(r uuid) returns boolean language sql as $$select exists(select 1 from public.versus_players where room_id=r and user_id=auth.uid())$$;
 create table versus_private.ranked_results(user_id uuid,points int);
 create table versus_private.game_wallets(user_id uuid,balance int);
 insert into auth.users values('${uid(1)}'),('${uid(2)}');
 insert into versus_private.ranked_results values('${uid(1)}',480),('${uid(2)}',10);
 insert into versus_private.game_wallets values('${uid(1)}',150),('${uid(2)}',200);`);
 await db.exec(fn(localized,'public.versus_letter_key'));
 for(const f of ['20260809015253_versus_thematic_dictionary.sql','20260830133000_expand_versus_dictionary.sql','20260921051546_expand_versus_dictionary_2000.sql']){
  const s=read('supabase/migrations/'+f);if(f.startsWith('202608090'))await db.exec(s.slice(0,s.indexOf('create or replace function private.validate_versus_challenge_dictionary')));
  else await db.exec(s);
 }
 const s=read(localized);await db.exec(s.slice(s.indexOf('create table versus_private.localized_dictionary'),s.indexOf('create function versus_private.check_word_language')));
 await db.exec(fn(localized,'private.validate_versus_challenge_dictionary'));
 await db.exec(fn(localized,'private.add_versus_recovery_word'));
 await db.exec(fn(stage2,'private.assert_versus_available'));
 await db.exec(fn(stage2,'public.set_versus_challenge'));
 await db.exec(fn(stage2,'public.request_versus_rematch'));
 await db.exec(`create trigger validate_dictionary before insert or update on public.versus_challenges for each row execute function private.validate_versus_challenge_dictionary();
 create trigger add_recovery before update of current_word_index,completed_words,lives on public.versus_match_players for each row execute function private.add_versus_recovery_word();`);
 await db.exec(`insert into public.versus_rooms values('${uid(50)}','${uid(1)}','finished','en');
 insert into public.versus_matches(id,room_id,status) values('${uid(60)}','${uid(50)}','finished');
 insert into public.versus_challenges values('${uid(50)}','${uid(1)}','${uid(2)}','frutas',array['APPLE','BANANA','CHERRY','GRAPE','PEAR'],now());`);
 // Remaining preservation-query tables need only harmless synthetic empty rows
 // here: the query hashes arbitrary complete rows without knowing their columns.
 for(const table of ['public.versus_profiles','public.versus_friendships','public.versus_invites','versus_private.ranked_rooms','versus_private.player_history','versus_private.player_appearance','versus_private.wallet_imports','versus_private.adventure_coin_events','versus_private.coin_rewards'])await db.exec('create table '+table+'(id uuid primary key)');
 const preservationBefore=(await db.query(read('tools/sql/versus-vocabulary-preservation.sql'))).rows;
 const snapshot=async()=>JSON.stringify((await db.query(`select (select jsonb_agg(t) from auth.users t) users,(select jsonb_agg(t) from versus_private.ranked_results t) points,(select jsonb_agg(t) from versus_private.game_wallets t) wallets,(select jsonb_agg(t) from public.versus_challenges t) challenges,(select jsonb_agg(t) from public.versus_rooms t) rooms,(select jsonb_agg(t) from public.versus_matches t) matches`)).rows);
 const before=await snapshot();
 await db.exec(`insert into public.versus_rooms values('${uid(10)}','${uid(1)}','playing','en');`);
 await assert.rejects(db.exec(migration),/Active preparation or match/);await db.exec('rollback');
 assert.equal((await db.query('select count(*)::int n from versus_private.localized_dictionary')).rows[0].n,1418);
 await db.exec(`delete from public.versus_rooms where id='${uid(10)}';update versus_private.localized_dictionary set word='APPLEZ' where word_language='en' and theme_key='frutas' and word='APPLE';`);
 await assert.rejects(db.exec(migration),/baseline\/normalizer mismatch/);await db.exec('rollback');
 await db.exec("update versus_private.localized_dictionary set word='APPLE' where word_language='en' and theme_key='frutas' and word='APPLEZ'");
 await db.exec(migration);await db.exec(migration);assert.equal(await snapshot(),before,'migration preserves synthetic users, challenges, points and wallets');
 assert.deepEqual((await db.query(read('tools/sql/versus-vocabulary-preservation.sql'))).rows,preservationBefore);
 assert.equal((await db.query('select count(*)::int n from versus_private.localized_dictionary')).rows[0].n,3999);
 for(const file of ['tools/sql/versus-vocabulary-preflight.sql','tools/sql/versus-vocabulary-postflight.sql']){
  await db.exec('begin read only');
  const results=await db.exec(read(file));for(const r of results)for(const row of r.rows||[]){if('problems'in row)assert.equal(Number(row.problems),0);if('passed'in row)assert.equal(row.passed,true);if('invalid_entries'in row)assert.equal(Number(row.invalid_entries),0);}
  await db.exec('rollback');
 }
 let checked=0;
 for(const language of ['es','en','pt-BR']){
  const topics=language==='es'?require('../js/word-banks-es.js').versus:expanded[language];
  await db.exec(`insert into public.versus_rooms values('${uid(10)}','${uid(1)}','preparing','${language}');
   insert into public.versus_players(room_id,user_id,slot) values('${uid(10)}','${uid(1)}',1),('${uid(10)}','${uid(2)}',2);
   select set_config('request.jwt.claim.sub','${uid(1)}',false);`);
  for(const[theme,words]of Object.entries(topics))for(let i=0;i<words.length;i+=5){
   const five=words.slice(i,i+5);for(const word of words){if(five.length===5)break;if(!five.some(w=>rules.rules(language).key(w)===rules.rules(language).key(word)))five.push(word);}
   await db.query('select public.set_versus_challenge($1,$2,$3)',[uid(10),theme,five]);checked+=Math.min(5,words.length-i);
  }
  await assert.rejects(db.query('select public.set_versus_challenge($1,$2,$3)',[uid(10),'frutas',['ZZZQQQ','ZZZQQA','ZZZQQB','ZZZQQC','ZZZQQD']]),/diccionario/);
  await db.exec(`delete from public.versus_challenges where room_id='${uid(10)}';delete from public.versus_players where room_id='${uid(10)}';delete from public.versus_rooms where id='${uid(10)}';`);
 }
 // Actual authoritative recovery trigger, including a newly added accented Portuguese word.
 await db.exec(`insert into public.versus_rooms values('${uid(10)}','${uid(1)}','playing','pt-BR');
 insert into public.versus_matches(id,room_id,status) values('${uid(20)}','${uid(10)}','playing');
 insert into public.versus_challenges values('${uid(10)}','${uid(2)}','${uid(1)}','frutas',array['ABRICÓ','AÇAÍ','MAÇÃ','LIMÃO','ROMÃ'],now());
 insert into public.versus_match_players values('${uid(20)}','${uid(1)}',0,0,3,null,false,null);
 update public.versus_match_players set current_word_index=1,lives=2 where user_id='${uid(1)}';`);
 const recovery=(await db.query('select words from public.versus_challenges where room_id=$1',[uid(10)])).rows[0].words;
 assert.equal(recovery.length,6);assert.equal(new Set(recovery.map(rules.rules('pt-BR').key)).size,6);assert(expanded['pt-BR'].frutas.includes(recovery[5]));
 assert.equal((await db.query('select last_failed_word from public.versus_match_players')).rows[0].last_failed_word,'ABRICÓ');
 await db.exec(`insert into public.versus_players(room_id,user_id,slot) values('${uid(10)}','${uid(1)}',1),('${uid(10)}','${uid(2)}',2);
 update public.versus_rooms set status='finished';update public.versus_matches set status='finished';
 select set_config('request.jwt.claim.sub','${uid(1)}',false);select public.request_versus_rematch('${uid(10)}');
 select set_config('request.jwt.claim.sub','${uid(2)}',false);select public.request_versus_rematch('${uid(10)}');`);
 assert.equal((await db.query('select status from public.versus_rooms where id=$1',[uid(10)])).rows[0].status,'preparing');
 assert.equal((await db.query('select word_language from public.versus_rooms where id=$1',[uid(10)])).rows[0].word_language,'pt-BR');
 assert.equal((await db.query('select count(*)::int n from public.versus_challenges where room_id=$1',[uid(10)])).rows[0].n,0);
 await db.exec('set role authenticated');await assert.rejects(db.query('select * from versus_private.localized_dictionary'),/permission denied/);await db.exec('reset role');
 console.log('PASS embedded PostgreSQL: '+checked+' words through real challenge RPC/trigger; additive migration, re-run, historical-row preservation, baseline drift and live-duel guards, read-only audits, Portuguese recovery, rematch and private dictionary permissions. No production connection.');
}finally{await db.close();}})().catch(e=>{console.error(e);process.exitCode=1});
