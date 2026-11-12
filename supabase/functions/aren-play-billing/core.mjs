export const PRODUCT='aren_union_permanent';
export const PACKAGE='com.gagames.aventura.experimental';
const encoder=new TextEncoder();
export class BillingError extends Error {constructor(code,status=400){super(code);this.code=code;this.status=status;}}
export async function hash(value){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value)))].map(b=>b.toString(16).padStart(2,'0')).join('');}
export const accountId=user=>hash(`gagames.play.v1:${PACKAGE}:${user}`);
export function classify(proof,expectedAccount,{allowRevocation=false}={}){
 if(!proof||typeof proof!=='object')throw new BillingError('INVALID_PURCHASE',422);
 const state=proof.purchaseStateContext?.purchaseState;
 const items=proof.productLineItem,item=items?.[0],details=item?.productOfferDetails;
 if(!Array.isArray(items)||items.length!==1||item.productId!==PRODUCT)throw new BillingError('WRONG_PRODUCT',422);
 if(proof.obfuscatedExternalAccountId!==expectedAccount)throw new BillingError('PURCHASE_ACCOUNT_MISMATCH',403);
 if(state==='PENDING')return 'pending';
 if(state==='CANCELLED'||details?.refundableQuantity===0){if(allowRevocation)return 'revoked';throw new BillingError('PURCHASE_REVOKED',422);}
 if(state!=='PURCHASED'||proof.testPurchaseContext?.fopType!=='TEST')throw new BillingError('ONLY_GOOGLE_VERIFIED_TEST_PURCHASES',403);
 if(details?.quantity!==1||details?.refundableQuantity!==1||details?.consumptionState!=='CONSUMPTION_STATE_YET_TO_BE_CONSUMED'||details?.rentOfferDetails||details?.preorderOfferDetails)throw new BillingError('WRONG_PERMANENT_PRODUCT',422);
 return 'purchased';
}
// The provider, Auth and database adapters are injected only by the server entry
// point or isolated tests. HTTP callers cannot supply an adapter or proof.
export function createService({authenticate,status,google,commit,enabled=false}){
 return async function handle(input,bearer){
  const user=await authenticate(bearer);
  if(!user?.id||user.is_anonymous!==false||!user.email_confirmed_at)throw new BillingError('VERIFIED_GAME_ACCOUNT_REQUIRED',401);
  if(!input||!['status','prepare','verify'].includes(input.action)||Object.keys(input).some(k=>!['action','purchaseToken'].includes(k)))throw new BillingError('INVALID_REQUEST');
  const state=await status(user.id),binding=await accountId(user.id);
  if(input.action==='status')return {...state,testAllowed:Boolean(enabled&&state.testAllowed),testOnly:true};
  if(!enabled||!state.testAllowed)throw new BillingError('TEST_CHECKOUT_NOT_CONFIGURED',503);
  if(input.action==='prepare')return {productId:PRODUCT,packageName:PACKAGE,obfuscatedAccountId:binding,testOnly:true};
  const token=input.purchaseToken;if(typeof token!=='string'||token.length<20||token.length>4096||/[\s\u0000-\u001f]/.test(token))throw new BillingError('INVALID_PURCHASE_TOKEN');
  const tokenHash=await hash(token);
  let proof=await google.get(token),kind=classify(proof,binding,{allowRevocation:true});
  if(kind==='pending')return {status:'pending',owned:false,testOnly:true};
  if(kind==='purchased'){
   if(proof.acknowledgementState==='ACKNOWLEDGEMENT_STATE_PENDING')await google.acknowledge(token);
   else if(proof.acknowledgementState!=='ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED')throw new BillingError('INVALID_ACKNOWLEDGEMENT',422);
   // Read again after acknowledgement to reject cancellations/refunds and to
   // persist only the acknowledged Google result, never a client success flag.
   proof=await google.get(token);kind=classify(proof,binding,{allowRevocation:true});
   if(kind==='pending')return {status:'pending',owned:false,testOnly:true};
   if(kind==='purchased'&&proof.acknowledgementState!=='ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED')throw new BillingError('ACKNOWLEDGEMENT_UNCONFIRMED',503);
  }
  const result=await commit(user.id,tokenHash,proof);
  return {...result,status:kind==='revoked'?'revoked':'verified',testOnly:true};
 };
}
function b64url(bytes){let text='';for(const b of bytes)text+=String.fromCharCode(b);return btoa(text).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');}
export function googleProvider({serviceAccount,fetcher=fetch,now=()=>Date.now()}){
 let cached=null;
 const request=async(url,options={})=>{let response;try{response=await fetcher(url,{...options,signal:AbortSignal.timeout(12000)});}catch{throw new BillingError('GOOGLE_UNAVAILABLE',503);}if(!response.ok)throw new BillingError('GOOGLE_VERIFICATION_FAILED',response.status===404?422:503);return response;};
 async function accessToken(){
  if(cached&&cached.until>now()+60000)return cached.value;
  const sa=serviceAccount;if(!sa?.client_email||!sa.private_key||sa.token_uri&&sa.token_uri!=='https://oauth2.googleapis.com/token')throw new BillingError('GOOGLE_NOT_CONFIGURED',503);
  const issued=Math.floor(now()/1000),header=b64url(encoder.encode(JSON.stringify({alg:'RS256',typ:'JWT'}))),payload=b64url(encoder.encode(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:'https://oauth2.googleapis.com/token',iat:issued,exp:issued+3300})));
  const pem=sa.private_key.replace(/-----[^-]+-----/g,'').replace(/\s/g,''),key=await crypto.subtle.importKey('pkcs8',Uint8Array.from(atob(pem),c=>c.charCodeAt(0)),{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
  const signature=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,encoder.encode(header+'.'+payload));
  const r=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:header+'.'+payload+'.'+b64url(new Uint8Array(signature))})}),data=await r.json();
  if(typeof data.access_token!=='string')throw new BillingError('GOOGLE_AUTH_FAILED',503);cached={value:data.access_token,until:now()+Math.min(Number(data.expires_in)||0,3300)*1000};return cached.value;
 }
 return {
  async get(token){const auth=await accessToken();return (await request(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE}/purchases/productsv2/tokens/${encodeURIComponent(token)}`,{headers:{Authorization:'Bearer '+auth}})).json();},
  async acknowledge(token){const auth=await accessToken();await request(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE}/purchases/products/${PRODUCT}/tokens/${encodeURIComponent(token)}:acknowledge`,{method:'POST',headers:{Authorization:'Bearer '+auth,'Content-Type':'application/json'},body:'{}'});},
 };
}
