import {createService,googleProvider,BillingError} from './core.mjs';
const env=(key:string)=>Deno.env.get(key)||'';
const base=env('SUPABASE_URL');
const origins=new Set(['https://aliasjohel.github.io','https://localhost']);
const headersFor=(origin:string|null)=>({'Content-Type':'application/json','Cache-Control':'no-store',...(origin&&origins.has(origin)?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{}),'Access-Control-Allow-Headers':'authorization, apikey, content-type, x-client-info','Access-Control-Allow-Methods':'POST, OPTIONS'});
async function jsonRequest(url:string,options:RequestInit){const r=await fetch(url,{...options,signal:AbortSignal.timeout(12000)});if(!r.ok)throw new BillingError('SERVER_VALIDATION_UNAVAILABLE',503);return r.json();}
Deno.serve(async(req:Request)=>{
 const origin=req.headers.get('Origin'),headers=headersFor(origin);
 if(origin&&!origins.has(origin))return new Response(JSON.stringify({error:'ORIGIN_NOT_ALLOWED'}),{status:403,headers});
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(req.method!=='POST')return new Response(JSON.stringify({error:'METHOD_NOT_ALLOWED'}),{status:405,headers});
 try{
  const bearer=req.headers.get('Authorization')||'';if(!/^Bearer \S+$/.test(bearer))throw new BillingError('AUTHENTICATION_REQUIRED',401);
  const text=await req.text();if(text.length>6144)throw new BillingError('REQUEST_TOO_LARGE',413);
  let input;try{input=JSON.parse(text);}catch{throw new BillingError('INVALID_REQUEST');}
  let account=null;try{account=JSON.parse(env('GOOGLE_PLAY_SERVICE_ACCOUNT_JSON'));}catch{/* No configuration means no checkout. */}
  const service=createService({
   enabled:env('PLAY_BILLING_MODE')==='test'&&Boolean(account)&&Boolean(env('GOOGLE_PLAY_RTDN_AUDIENCE'))&&Boolean(env('GOOGLE_PLAY_RTDN_SERVICE_ACCOUNT_EMAIL')),
   authenticate:async()=>jsonRequest(base+'/auth/v1/user',{headers:{apikey:env('SUPABASE_ANON_KEY'),Authorization:bearer}}),
   status:async()=>jsonRequest(base+'/rest/v1/rpc/aren_play_status',{method:'POST',headers:{apikey:env('SUPABASE_ANON_KEY'),Authorization:bearer,'Content-Type':'application/json'},body:'{}'}),
   google:googleProvider({serviceAccount:account}),
   commit:async(user:string,tokenHash:string,proof:unknown)=>jsonRequest(base+'/rest/v1/rpc/aren_play_commit',{method:'POST',headers:{apikey:env('SUPABASE_SERVICE_ROLE_KEY'),Authorization:'Bearer '+env('SUPABASE_SERVICE_ROLE_KEY'),'Content-Type':'application/json'},body:JSON.stringify({p_user:user,p_token_hash:tokenHash,p_proof:proof})}),
  });
  const result=await service(input,bearer);return new Response(JSON.stringify(result),{status:result.status==='pending'?202:200,headers});
 }catch(error){const e=error instanceof BillingError?error:new BillingError('SERVER_VALIDATION_UNAVAILABLE',503);return new Response(JSON.stringify({error:e.code}),{status:e.status,headers});}
});
