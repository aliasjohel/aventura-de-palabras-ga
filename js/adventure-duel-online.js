(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AdventureDuelOnline=api;})(globalThis,()=>{
 'use strict';
 const kinds=Object.freeze({kairos_bosque:'duel:kairos',hombre_lobo:'duel:wolf',guardiana:'duel:forest',calamo_desierto:'duel:calamo',mago_desierto:'duel:desert',nimbus_cumbres:'duel:nimbus',nivor_glacial:'duel:nivor',nivor_cero_absoluto:'duel:absolute-zero',shadow_primero:'duel:shadow-first',shadow_final:'duel:shadow',azrak_final:'duel:azrak'});
 function create({authority,scope,render,fallback,interval=setInterval,stopInterval=clearInterval}){
  let timer=null,generation=0,polling=false;
  function active(){const view=authority.view(),context=scope();return Boolean(context&&view?.kind===kinds[context.type]&&authority.handles(context.world,context.mission,view.kind));}
  function stop(){generation++;if(timer!==null)stopInterval(timer);timer=null;polling=false;}
  async function send(payload){if(!active())return null;const token=generation,context=scope();const view=await authority.action('puzzle',payload);
   if(token!==generation||scope()?.type!==context.type)return null;
   if(view&&active()){render(view.detail,view);return view;}
   stop();fallback(context);return null;
  }
  async function start(){stop();if(!active())return false;const context=scope(),view=await send({op:'start_duel'});if(!view||view.detail.finished)return Boolean(view);
   timer=interval(async()=>{if(!active()){stop();if(scope()?.type===context.type&&!authority.view())fallback(context);return;}if(polling)return;polling=true;try{await send({op:'tick'});}finally{polling=false;}},250);return true;
  }
  return Object.freeze({active,start,send,stop});
 }
 return Object.freeze({kinds,create});
});
