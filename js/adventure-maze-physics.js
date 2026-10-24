(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AdventureMazePhysics=api;})(globalThis,()=>{
 'use strict';const DT=1/60;
 function collides(x,y,map){const radius=.27;for(let row=Math.floor(y-radius);row<=Math.floor(y+radius);row++)for(let column=Math.floor(x-radius);column<=Math.floor(x+radius);column++){
  if(map[row]?.[column]==='0')continue;const nearestX=Math.max(column,Math.min(x,column+1)),nearestY=Math.max(row,Math.min(y,row+1));if((x-nearestX)**2+(y-nearestY)**2<radius**2)return true;
 }return false;}
 function step(state,force,map){const next={...state};next.vx=(next.vx+force.x*7.2*DT)*.975;next.vy=(next.vy+force.y*7.2*DT)*.975;const speed=Math.hypot(next.vx,next.vy);if(speed>4.2){next.vx*=4.2/speed;next.vy*=4.2/speed;}
  if(!collides(next.x+next.vx*DT,next.y,map))next.x+=next.vx*DT;else next.vx*= -.24;
  if(!collides(next.x,next.y+next.vy*DT,map))next.y+=next.vy*DT;else next.vy*= -.24;
  next.done=Math.hypot(next.x-(map.length-1.5),next.y-(map.length-1.5))<.42;return next;
 }
 return Object.freeze({DT,step,collides});
});
