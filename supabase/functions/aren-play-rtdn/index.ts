import {createWebhook,googleOidc} from './core.mjs';
import {googleProvider,BillingError} from '../aren-play-billing/core.mjs';
const env=(key:string)=>Deno.env.get(key)||'';
Deno.serve(async(req:Request)=>{
 if(req.method!=='POST')return new Response(null,{status:405});
 try{
  const text=await req.text();if(text.length>16384)throw new BillingError('REQUEST_TOO_LARGE',413);
  let account;try{account=JSON.parse(env('GOOGLE_PLAY_SERVICE_ACCOUNT_JSON'));}catch{throw new BillingError('RTDN_NOT_CONFIGURED',503);}
  const rpc=async(name:string,args:unknown)=>{const r=await fetch(env('SUPABASE_URL')+'/rest/v1/rpc/'+name,{method:'POST',headers:{apikey:env('SUPABASE_SERVICE_ROLE_KEY'),Authorization:'Bearer '+env('SUPABASE_SERVICE_ROLE_KEY'),'Content-Type':'application/json'},body:JSON.stringify(args),signal:AbortSignal.timeout(12000)});if(!r.ok)throw new BillingError('SERVER_VALIDATION_UNAVAILABLE',503);return r.json();};
  const handle=createWebhook({authenticate:googleOidc({audience:env('GOOGLE_PLAY_RTDN_AUDIENCE'),email:env('GOOGLE_PLAY_RTDN_SERVICE_ACCOUNT_EMAIL')}),google:googleProvider({serviceAccount:account}),owner:(tokenHash:string)=>rpc('aren_play_receipt_owner',{p_token_hash:tokenHash}),commit:(user:string,tokenHash:string,proof:unknown)=>rpc('aren_play_commit',{p_user:user,p_token_hash:tokenHash,p_proof:proof})});
  const result=await handle(JSON.parse(text),req.headers.get('Authorization'));return new Response(JSON.stringify(result),{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
 }catch(error){const e=error instanceof BillingError?error:new BillingError('RTDN_UNAVAILABLE',503);return new Response(JSON.stringify({error:e.code}),{status:e.status,headers:{'Cache-Control':'no-store'}});}
});
