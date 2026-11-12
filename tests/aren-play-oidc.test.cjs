'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const encode=v=>Buffer.from(typeof v==='string'?v:JSON.stringify(v)).toString('base64url');
test('RTDN verifies the real JWT signature, trusted Google issuer, audience, email and lifetime',async()=>{
 const {googleOidc}=await import('../supabase/functions/aren-play-rtdn/core.mjs');
 const pair=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);const jwk=await crypto.subtle.exportKey('jwk',pair.publicKey);jwk.kid='local-signing-key';
 const now=Date.parse('2026-11-12T12:00:00Z'),aud='https://test.invalid/rtdn',email='trusted-pubsub@example.invalid',claims={iss:'https://accounts.google.com',aud,email,email_verified:true,iat:now/1000,exp:now/1000+600};
 const sign=async body=>{const data=encode({alg:'RS256',kid:jwk.kid})+'.'+encode(body);const sig=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',pair.privateKey,Buffer.from(data));return 'Bearer '+data+'.'+Buffer.from(sig).toString('base64url');};
 const fetcher=async url=>{assert.equal(url,'https://www.googleapis.com/oauth2/v3/certs');return new Response(JSON.stringify({keys:[jwk]}));};
 const verify=googleOidc({audience:aud,email,fetcher,now:()=>now});await verify(await sign(claims));
 for(const change of [{iss:'https://attacker.invalid'},{aud:'other'},{email:'other@example.invalid'},{email_verified:false},{exp:now/1000-1},{iat:now/1000+500}])await assert.rejects(verify(await sign({...claims,...change})),/AUTH_INVALID/);
 const valid=await sign(claims),parts=valid.split('.');parts[2]=encode('forged signature');await assert.rejects(verify(parts.join('.')),/AUTH_INVALID/);
});
test('a signed notification cannot grant an unknown purchase; cancellations are re-read from Google',async()=>{
 const {createWebhook}=await import('../supabase/functions/aren-play-rtdn/core.mjs'),{PACKAGE,PRODUCT,accountId}=await import('../supabase/functions/aren-play-billing/core.mjs');let user=null,gets=0,commits=0;const proof={productLineItem:[{productId:PRODUCT,productOfferDetails:{refundableQuantity:0}}],obfuscatedExternalAccountId:await accountId('synthetic-user'),purchaseStateContext:{purchaseState:'CANCELLED'}};
 const handle=createWebhook({authenticate:async()=>{},owner:async()=>user,google:{get:async()=>{gets++;return proof;}},commit:async()=>{commits++;}});
 const message={message:{data:Buffer.from(JSON.stringify({packageName:PACKAGE,oneTimeProductNotification:{sku:PRODUCT,purchaseToken:'local-only-provider-token',notificationType:2}})).toString('base64')}};
 assert.equal((await handle(message,'signed')).unclaimed,true);assert.equal(gets,0);assert.equal(commits,0);user='synthetic-user';await handle(message,'signed');assert.equal(gets,1);assert.equal(commits,1);
});
