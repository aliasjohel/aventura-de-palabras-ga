'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
exports.load=async (client,{includeDrafts=true,sources=null,externalAuth=false}={})=>{
 await client.query(`create role anon;create role authenticated;create role service_role bypassrls;create role authenticator;
 create schema if not exists auth;grant usage on schema auth to public;
 ${externalAuth?'':`create table auth.users(id uuid primary key,created_at timestamptz default now(),email text,email_confirmed_at timestamptz,phone_confirmed_at timestamptz,is_anonymous boolean default false,raw_user_meta_data jsonb default '{}',raw_app_meta_data jsonb default '{}');
 create table auth.identities(id uuid primary key,user_id uuid references auth.users(id),provider text,provider_id text,created_at timestamptz,updated_at timestamptz,last_sign_in_at timestamptz);`}
 create or replace function auth.uid() returns uuid language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claim.sub',true),''),(nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'sub'))::uuid$$;
 create or replace function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),'')::jsonb,'{}'::jsonb)$$;
 create or replace function auth.role() returns text language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claim.role',true),''),auth.jwt()->>'role')$$;
 create publication supabase_realtime;create schema extensions;`);
 const dir=path.resolve(__dirname,'../../supabase/migrations');
 // Legacy files share a pre-CLI date. Their documented prerequisites require this order.
 const legacy=['20260805_versus_lobby.sql','20260805_versus_characters.sql','20260805_versus_challenges.sql','20260805_versus_matches.sql','20260805_versus_resilience.sql'];
 const files=legacy.concat((sources?Object.keys(sources):fs.readdirSync(dir)).filter(f=>f.endsWith('.sql')&&!legacy.includes(f)&&(includeDrafts||f<'20261023')).sort());
 const applied=[];
 for(const file of files){const sql=sources?sources[file]:fs.readFileSync(path.join(dir,file),'utf8');try{await client.query('begin');await client.query(sql);await client.query('commit');}catch(error){await client.query('rollback');error.message=file+': '+error.message;throw error;}
  applied.push({file,sha256:crypto.createHash('sha256').update(sql).digest('hex')});}
 return applied;
};
