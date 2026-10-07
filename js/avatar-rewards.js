(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AvatarRewards=api;})(globalThis,()=>{
  'use strict';
  const catalog = Object.freeze([
    {id:'clasico',name:'Clásico',requirement:'Disponible desde el inicio'},
    {id:'bosque',name:'Hojas',world:1,requirement:'Completá el mundo 1 · Bosque'},
    {id:'arcano',name:'Arcano',world:2,requirement:'Completá el mundo 2 · Desierto'},
    {id:'real',name:'Real',world:3,requirement:'Completá el mundo 3 · Cumbres'},
    {id:'hielo',name:'Hielo',world:4,requirement:'Completá el mundo 4 · Reino del Invierno Eterno'},
    {id:'fuego',name:'Fuego',world:5,requirement:'Completá el mundo 5 · Azrak'},
    ...[['bronce','Bronce',10],['plata','Plata',30],['oro','Oro',60],['platino','Platino',120],['diamante','Diamante',240],['leyenda','Leyenda',480]].map(([id,name,points])=>({id,name,points,rank:true,requirement:`Alcanzá el rango ${name}`})),
  ].map(Object.freeze));
  function earned(progress={},points=0){
    const crystals=Number(progress?.cristalesObtenidos)||0;
    return catalog.filter(frame=>frame.id==='clasico'||(frame.world&&crystals>=frame.world)||(frame.rank&&Number(points)>=frame.points)).map(frame=>frame.id);
  }
  return Object.freeze({catalog,earned});
});
