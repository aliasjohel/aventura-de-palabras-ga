(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VersusRanks=api;})(globalThis,()=>{
  "use strict";
  const tiers=Object.freeze([{"index":0,"key":"novato","name":"Novato","title":"Aprendiz","min":0,"next":10},{"index":1,"key":"bronce","name":"Bronce","title":"Aventurero","min":10,"next":30},{"index":2,"key":"plata","name":"Plata","title":"Explorador","min":30,"next":60},{"index":3,"key":"oro","name":"Oro","title":"Guardián","min":60,"next":120},{"index":4,"key":"platino","name":"Platino","title":"Maestro de Palabras","min":120,"next":240},{"index":5,"key":"diamante","name":"Diamante","title":"Campeón","min":240,"next":480},{"index":6,"key":"leyenda","name":"Leyenda","title":"Leyenda de los Cinco Mundos","min":480,"next":null}].map(Object.freeze));
  function points(value){const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.floor(n)):0;}
  function info(value){const score=points(value);return tiers.findLast(t=>score>=t.min);}
  function badge(value,progress=false){
    const score=points(value),rank=info(score),node=document.createElement('span');node.className='rango-jugador';
    const img=document.createElement('img');img.src='assets/images/rangos/'+rank.key+'.svg';img.alt='Insignia '+rank.name;img.width=64;img.height=72;
    const copy=document.createElement('span'),name=document.createElement('strong'),title=document.createElement('small');name.textContent=rank.name;title.textContent=rank.title;copy.append(name,title);
    if(progress){const label=document.createElement('small');label.textContent=rank.next===null?score+' puntos · Rango máximo':score+' / '+rank.next+' puntos · Próximo: '+tiers[rank.index+1].name;copy.append(label);if(rank.next!==null){const bar=document.createElement('progress');bar.max=rank.next-rank.min;bar.value=score-rank.min;bar.setAttribute('aria-label','Progreso hacia '+tiers[rank.index+1].name);copy.append(bar);}}
    node.append(img,copy);return node;
  }
  return Object.freeze({tiers,points,info,badge});
});
