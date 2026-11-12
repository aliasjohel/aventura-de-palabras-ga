(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else{
 let bridge=null;const plugin=()=>{if(!root.Capacitor?.isNativePlatform?.()||!root.Capacitor?.isPluginAvailable?.('ArenPlayBilling'))return null;if(!bridge){bridge=root.Capacitor.registerPlugin('ArenPlayBilling');void bridge.addListener('purchasesUpdated',()=>{if(root.CosmeticStore?.read().accountId&&!root.ArenPremium.read().busy)void root.ArenPremium.restore().catch(()=>{});}).catch(()=>{});}return bridge;};
 const client=async()=>{await root.AventuraShop?.connect();return root.AventuraSupabase?.obtenerCliente();};
 root.ArenPremium=api.create({owner:()=>root.CosmeticStore?.read().accountId,online:()=>root.navigator.onLine,
  transport:async body=>{const c=await client();if(!c)throw Error('SIGN_IN_REQUIRED');const {data,error}=await c.functions.invoke('aren-play-billing',{body});if(error){let code='VALIDATION_UNAVAILABLE';try{const value=await error.context?.json();code=value?.error||code;}catch{}throw Error(code);}return data;},
  native:()=>plugin(),refreshWallet:()=>root.AccountRuntimeV3?.installed?root.AccountRuntimeV3.refresh():root.GameWallet.sync(),
  changed:()=>root.dispatchEvent(new Event('aren-premium-updated'))});
 root.addEventListener('wallet-updated',()=>{root.ArenPremium.accountChanged();});
 root.document.addEventListener('visibilitychange',()=>{if(root.document.visibilityState==='visible'&&root.ArenPremium.read().nativeEnabled&&!root.ArenPremium.read().busy)void root.ArenPremium.restore().catch(()=>{});});
}})(globalThis,()=>{
 'use strict';const product='aren_union_permanent';
 function create({owner,online=()=>true,transport,native=()=>null,refreshWallet=async()=>{},changed=()=>{}}){
  let identity=null,generation=0,state={owned:false,testAllowed:false,nativeEnabled:false,price:null},busy=false;
  const read=()=>{accountChanged();return {...state,busy};};
  function accountChanged(){if(identity!==owner()){identity=owner();generation++;state={owned:false,testAllowed:false,nativeEnabled:false,price:null};changed();}}
  const fence=(id,g)=>{if(!id||owner()!==id||g!==generation)throw Error('ACCOUNT_CHANGED');};
  async function status(){accountChanged();const id=identity,g=generation;if(!id)return read();if(!online())return read();const result=await transport({action:'status'});fence(id,g);if(result.userId!==id||result.productId!==product||result.testOnly!==true)throw Error('INVALID_SERVER_RESPONSE');
   const bridge=native(),configuration=bridge?await bridge.status():null;fence(id,g);state={owned:result.owned===true,testAllowed:result.testAllowed===true,nativeEnabled:configuration?.testCheckoutEnabled===true,price:null};
   if(state.testAllowed&&state.nativeEnabled){const details=await bridge.product();fence(id,g);if(details.productId===product)state.price=details.formattedPrice||null;}changed();return read();
  }
  async function verify(purchases,id,g){let verified=false,pending=false;for(const purchase of purchases||[]){fence(id,g);if(purchase.productId!==product)continue;const result=await transport({action:'verify',purchaseToken:purchase.purchaseToken});fence(id,g);if(result.status==='pending')pending=true;else if(result.userId!==id||result.productId!==product||result.testOnly!==true)throw Error('INVALID_SERVER_RESPONSE');else if(result.status==='verified'&&result.owned===true)verified=true;}
   if(verified){await refreshWallet();fence(id,g);}await status();return {status:verified?'verified':pending?'pending':state.owned?'verified':'not_found'};
  }
  async function buy(){if(busy)throw Error('BUSY');busy=true;changed();try{await status();const id=identity,g=generation;fence(id,g);if(!online()||!state.testAllowed||!state.nativeEnabled||!native())throw Error('TEST_CHECKOUT_NOT_CONFIGURED');const prepared=await transport({action:'prepare'});fence(id,g);if(prepared.productId!==product||prepared.testOnly!==true||!/^[a-f0-9]{64}$/.test(prepared.obfuscatedAccountId))throw Error('INVALID_SERVER_RESPONSE');const result=await native().purchase({obfuscatedAccountId:prepared.obfuscatedAccountId});fence(id,g);if(result.status==='cancelled')return result;const list=result.status==='already_owned'?(await native().purchases()).purchases:result.purchases;return verify(list,id,g);}finally{busy=false;changed();}}
  async function restore(){if(busy)throw Error('BUSY');busy=true;changed();try{await status();const id=identity,g=generation;fence(id,g);if(!online())throw Error('CONNECTION_REQUIRED');if(state.owned){await refreshWallet();fence(id,g);return {status:'verified'};}if(!native())return {status:'not_found'};const list=await native().purchases();fence(id,g);return verify(list.purchases,id,g);}finally{busy=false;changed();}}
  return Object.freeze({read,status,buy,restore,accountChanged,canPurchase:()=>!busy&&online()&&state.testAllowed&&state.nativeEnabled&&Boolean(owner())});
 }
 return {create,product};
});
