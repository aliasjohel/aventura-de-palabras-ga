import {BillingError,PACKAGE,PRODUCT,hash,accountId,classify} from '../aren-play-billing/core.mjs';
const decode=text=>Uint8Array.from(atob(text.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
export function googleOidc({audience,email,fetcher=fetch,now=()=>Date.now()}){
 let keys=null,until=0;
 return async bearer=>{
  if(!audience||!email)throw new BillingError('RTDN_NOT_CONFIGURED',503);
  if(typeof bearer!=='string'||!/^Bearer [A-Za-z0-9_.-]{50,16384}$/.test(bearer))throw new BillingError('RTDN_AUTH_REQUIRED',401);
  const token=bearer.slice(7),parts=token.split('.');if(parts.length!==3)throw new BillingError('RTDN_AUTH_INVALID',401);
  let head,body;try{head=JSON.parse(new TextDecoder().decode(decode(parts[0])));body=JSON.parse(new TextDecoder().decode(decode(parts[1])));}catch{throw new BillingError('RTDN_AUTH_INVALID',401);}
  if(head.alg!=='RS256'||typeof head.kid!=='string'||!['accounts.google.com','https://accounts.google.com'].includes(body.iss)||body.aud!==audience||body.email!==email||body.email_verified!==true||!Number.isFinite(body.exp)||body.exp*1000<=now()||!Number.isFinite(body.iat)||body.iat*1000>now()+60000)throw new BillingError('RTDN_AUTH_INVALID',401);
  if(!keys||until<=now()){const r=await fetcher('https://www.googleapis.com/oauth2/v3/certs',{signal:AbortSignal.timeout(12000)});if(!r.ok)throw new BillingError('RTDN_AUTH_UNAVAILABLE',503);keys=(await r.json()).keys;until=now()+600000;}
  const jwk=keys?.find(k=>k.kid===head.kid&&k.kty==='RSA');if(!jwk)throw new BillingError('RTDN_AUTH_INVALID',401);
  const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
  if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode(parts[2]),new TextEncoder().encode(parts[0]+'.'+parts[1])))throw new BillingError('RTDN_AUTH_INVALID',401);
 };
}
export function createWebhook({authenticate,owner,google,commit}){
 return async (message,bearer)=>{
  await authenticate(bearer);
  let data;try{data=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(message.message.data),c=>c.charCodeAt(0))));}catch{throw new BillingError('INVALID_NOTIFICATION');}
  if(data.testNotification)return {accepted:true,test:true};
  const n=data.oneTimeProductNotification;if(data.packageName!==PACKAGE||!n||n.sku!==PRODUCT||![1,2].includes(n.notificationType)||typeof n.purchaseToken!=='string'||n.purchaseToken.length<20||n.purchaseToken.length>4096)throw new BillingError('WRONG_NOTIFICATION');
  const tokenHash=await hash(n.purchaseToken),user=await owner(tokenHash);if(!user)return {accepted:true,unclaimed:true};
  const proof=await google.get(n.purchaseToken),kind=classify(proof,await accountId(user),{allowRevocation:true});
  // A delivered notification is a prompt to re-read Google, never evidence of
  // a paid purchase. Only Google-confirmed refunds/cancellations revoke here.
  if(kind==='revoked')await commit(user,tokenHash,proof);
  return {accepted:true};
 };
}
