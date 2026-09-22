(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VersusRanks=api;})(globalThis,()=>{
  "use strict";
  const tiers=Object.freeze([{"index":0,"key":"novato","name":"Novato","title":"Aprendiz","min":0,"next":10},{"index":1,"key":"bronce","name":"Bronce","title":"Aventurero","min":10,"next":30},{"index":2,"key":"plata","name":"Plata","title":"Explorador","min":30,"next":60},{"index":3,"key":"oro","name":"Oro","title":"Guardián","min":60,"next":120},{"index":4,"key":"platino","name":"Platino","title":"Maestro de Palabras","min":120,"next":240},{"index":5,"key":"diamante","name":"Diamante","title":"Campeón","min":240,"next":480},{"index":6,"key":"leyenda","name":"Leyenda","title":"Leyenda de los Cinco Mundos","min":480,"next":null}].map(Object.freeze));
  function points(value){const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.floor(n)):0;}
  function info(value){const score=points(value);return tiers.findLast(t=>score>=t.min);}
  function division(value) {
    const score=points(value),rank=info(score);
    const numbered=rank.index>0 && rank.next!==null;
    const step=numbered ? (rank.next-rank.min)/5 : 0;
    const stage=numbered ? Math.min(4,Math.floor((score-rank.min)/step)) : 0;
    const roman=['V','IV','III','II','I'];
    const min=numbered ? rank.min+stage*step : rank.min;
    const next=numbered ? min+step : rank.next;
    return {rank,stage,min,next,name:rank.name+(numbered?' '+roman[stage]:''),number:numbered?roman[stage]:null,
      nextName: next===null ? null : numbered && stage<4 ? rank.name+' '+roman[stage+1] : tiers[rank.index+1].name+(rank.index+1<6?' V':'')};
  }
  function badge(value,progress=false){
    const score=points(value),d=division(score),rank=d.rank,node=document.createElement('span');node.className='rango-jugador';
    const shield=document.createElement('span');shield.className='rango-escudo';
    const img=document.createElement('img');img.src='assets/images/rangos/'+rank.key+'-v2.png';img.alt='Insignia '+d.name;img.width=96;img.height=96;shield.append(img);
    if(d.number){const numeral=document.createElement('b');numeral.className='rango-numero';numeral.textContent=d.number;numeral.setAttribute('aria-hidden','true');shield.append(numeral);}
    const copy=document.createElement('span'),name=document.createElement('strong'),title=document.createElement('small');name.textContent=d.name;title.textContent=rank.title;copy.append(name,title);
    if(progress){const label=document.createElement('small');label.textContent=d.next===null?score+' puntos · Rango máximo':score+' / '+d.next+' puntos · Próximo: '+d.nextName;copy.append(label);if(d.next!==null){const bar=document.createElement('progress');bar.max=d.next-d.min;bar.value=score-d.min;bar.setAttribute('aria-label','Progreso hacia '+d.nextName);copy.append(bar);}}
    node.append(shield,copy);return node;
  }
  return Object.freeze({tiers,points,info,division,badge});
});
