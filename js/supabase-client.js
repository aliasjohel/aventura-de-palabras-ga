(function iniciarClienteSupabase(raiz) {
  'use strict';
  let cliente=null;
  async function fetchAcotado(input,options={}){
    if(raiz.navigator?.onLine===false)throw new TypeError('Sin conexión; la sesión local se conserva.');
    const controller=new AbortController(),upstream=options.signal||input?.signal;
    const abort=()=>controller.abort();if(upstream?.aborted)abort();else upstream?.addEventListener('abort',abort,{once:true});
    const timer=setTimeout(abort,20000);
    try{
      const response=await raiz.fetch(input,{...options,signal:controller.signal});
      const bytes=await response.arrayBuffer(),headers=new Headers(response.headers);
      headers.delete('content-encoding');headers.delete('content-length');
      return new Response([204,205,304].includes(response.status)?null:bytes,{status:response.status,statusText:response.statusText,headers});
    }finally{clearTimeout(timer);upstream?.removeEventListener('abort',abort);}
  }
  function configuracionDisponible(){const c=raiz.AVENTURA_SUPABASE_CONFIG;return Boolean(c?.url?.startsWith('https://')&&c?.publishableKey?.startsWith('sb_publishable_'));}
  // Same key as Supabase's existing default: preserve v0.2 sessions and PKCE data.
  function claveSesion(){return 'sb-'+new URL(raiz.AVENTURA_SUPABASE_CONFIG.url).hostname.split('.')[0]+'-auth-token';}
  function leerSesionLocal(){
    if(raiz.navigator?.onLine!==false)return {data:{session:null},error:null};
    try{const s=JSON.parse(raiz.localStorage.getItem(claveSesion())||'null');
      if(!s||typeof s.access_token!=='string'||typeof s.refresh_token!=='string'||!/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(s.user?.id||''))return {data:{session:null},error:null};
      // Local owner hint only, including expired sessions. Never an online credential
      // or a grant: admission also requires a prior verification marker and snapshots.
      return {data:{session:{user:s.user,expires_at:s.expires_at}},error:null};
    }catch{return {data:{session:null},error:null};}
  }
  function obtenerCliente(){
    if(cliente)return cliente;if(!configuracionDisponible()||typeof raiz.supabase?.createClient!=='function')return null;
    const {url,publishableKey}=raiz.AVENTURA_SUPABASE_CONFIG;
    cliente=raiz.supabase.createClient(url,publishableKey,{
      global:{fetch:fetchAcotado},
      auth:{persistSession:true,autoRefreshToken:raiz.navigator?.onLine!==false,storageKey:claveSesion(),
        detectSessionInUrl: true,
      },
    });
    return cliente;
  }
  function actualizarRenovacion(){if(raiz.navigator?.onLine===false||raiz.document?.visibilityState==='hidden')void cliente?.auth.stopAutoRefresh?.();else void cliente?.auth.startAutoRefresh?.();}
  raiz.addEventListener('offline',actualizarRenovacion);
  raiz.addEventListener('online',actualizarRenovacion);
  raiz.document?.addEventListener('visibilitychange',actualizarRenovacion);
  raiz.AventuraSupabase=Object.freeze({configuracionDisponible,obtenerCliente,leerSesionLocal});
})(globalThis);
