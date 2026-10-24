(function(root,factory){
 const api=factory(typeof module==='object'&&module.exports?require('./adventure-maze-physics.js'):root.AdventureMazePhysics);
 if(typeof module==='object'&&module.exports)module.exports=api;else root.AdventureMazeOnline=api;
})(globalThis,physics=>{
 'use strict';
 const point=s=>({x:s.x,y:s.y,vx:s.vx,vy:s.vy,done:Boolean(s.done)});
 const force=f=>({x:Math.max(-35/24,Math.min(35/24,Number(f.x)||0)),y:Math.max(-35/24,Math.min(35/24,Number(f.y)||0))});
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function clearSegment(from,to,map){
  const steps=Math.max(1,Math.ceil(distance(from,to)/.03));
  for(let i=1;i<=steps;i++)if(physics.collides(from.x+(to.x-from.x)*i/steps,from.y+(to.y-from.y)*i/steps,map))return false;
  return true;
 }
 function route(from,to,map){
  if(clearSegment(from,to,map))return [to];
  const width=map[0].length,start=Math.floor(from.y)*width+Math.floor(from.x),end=Math.floor(to.y)*width+Math.floor(to.x);
  const queue=[start],previous=new Map([[start,null]]);
  for(let at=0;at<queue.length&&!previous.has(end);at++){
   const cell=queue[at],x=cell%width,y=Math.floor(cell/width);
   for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){
    const xx=x+dx,yy=y+dy,next=yy*width+xx;
    if(xx<0||xx>=width||yy<0||yy>=map.length||map[yy][xx]!=='0'||previous.has(next))continue;
    previous.set(next,cell);queue.push(next);
   }
  }
  if(!previous.has(end))return [];
  const cells=[];for(let cell=end;cell!==null;cell=previous.get(cell))cells.unshift(cell);
  const path=cells.map(cell=>({x:cell%width+.5,y:Math.floor(cell/width)+.5})).concat(to);
  // Do not return towards the centre of the current cell on every animation frame.
  while(path.length>1&&clearSegment(from,path[1],map))path.shift();
  return path;
 }
 function move(from,target,fallback,budget,map){
  const path=clearSegment(from,target,map)?[target]:route(from,fallback,map);
  let result={x:from.x,y:from.y};
  for(const waypoint of path){
   const length=distance(result,waypoint);if(length<1e-10)continue;
   const amount=Math.min(length,budget),next={x:result.x+(waypoint.x-result.x)*amount/length,y:result.y+(waypoint.y-result.y)*amount/length};
   if(!clearSegment(result,next,map))break;
   result=next;budget-=amount;if(budget<1e-10)break;
  }
  return result;
 }
 function create({map,initial,now=0}){
  let predicted=point(initial),visual=point(initial),lastTime=now,accumulator=0,lastSequence=-1;
  let offset={x:0,y:0},history=[{time:now,force:{x:0,y:0}}],replaySteps=0;
  function remember(time,input){
   const f=force(input),last=history.at(-1);
   if(f.x!==last.force.x||f.y!==last.force.y)history.push({time,force:f});
   while(history.length>256||history.length>1&&history[1].time<time-5000)history.shift();
   return f;
  }
  function frame(time,input){
   if(!Number.isFinite(time)||time<lastTime)return {...visual};
   const f=remember(time,input),elapsed=Math.min(.25,(time-lastTime)/1000);lastTime=time;accumulator+=elapsed;
   while(accumulator+1e-12>=physics.DT){
    if(!predicted.done)predicted=physics.step(predicted,f,map);
    const decay=Math.exp(-physics.DT/.18);offset.x*=decay;offset.y*=decay;
    let target={x:predicted.x+offset.x,y:predicted.y+offset.y};
    if(physics.collides(target.x,target.y,map))target=predicted;
    const next=move(visual,target,predicted,4.2*physics.DT,map);
    visual={...next,vx:(next.x-visual.x)/physics.DT,vy:(next.y-visual.y)/physics.DT,done:predicted.done};
    accumulator-=physics.DT;
   }
   return {...visual};
  }
  function reconcile(snapshot,{sentAt,receivedAt,sequence}){
   if(!Number.isInteger(sequence)||sequence<=lastSequence||!Number.isFinite(sentAt)||!Number.isFinite(receivedAt)||receivedAt<sentAt)return false;
   if(!['x','y','vx','vy'].every(k=>Number.isFinite(snapshot?.[k]))||physics.collides(snapshot.x,snapshot.y,map))return false;
   // RTT is used only for presentation. No client time or position is sent to the server.
   const horizon=Math.min(1500,(receivedAt-sentAt)/2),acceptedAt=receivedAt-horizon;
   let next=point(snapshot);replaySteps=0;
   const acknowledged=force({x:snapshot.force_x,y:snapshot.force_y});
   const simulationAt=Math.min(receivedAt,lastTime-accumulator*1000);
   for(let time=acceptedAt;time+physics.DT*1000<=simulationAt+1e-8&&!next.done;time+=physics.DT*1000){
    let f=acknowledged;
    for(const entry of history)if(entry.time>sentAt&&entry.time<=time)f=entry.force;
    next=physics.step(next,f,map);replaySteps++;
   }
   predicted=next;offset={x:visual.x-predicted.x,y:visual.y-predicted.y};lastSequence=sequence;
   // Do not assign the rendered position or reset its frame accumulator on a network callback.
   return true;
  }
  return Object.freeze({frame,reconcile,view:()=>({...visual}),diagnostics:()=>({sequence:lastSequence,replaySteps,historyLength:history.length,predicted:{...predicted}})});
 }
 return Object.freeze({create,clearSegment});
});
