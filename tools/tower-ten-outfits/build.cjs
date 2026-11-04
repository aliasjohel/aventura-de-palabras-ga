'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'../..'),work=path.join(root,'.local-developer/tower-ten-outfits'),audit=JSON.parse(fs.readFileSync(path.join(work,'audit.json')));
const publicDir=path.join(root,'assets/images/tower-preview'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const previous=fs.existsSync(path.join(work,'production.json'))?JSON.parse(fs.readFileSync(path.join(work,'production.json'))).characters:[];
async function bounds(file){const{data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});let left=info.width,top=info.height,right=-1,bottom=-1;for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>=128){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}assert(right>left&&bottom>top,'No opaque artwork: '+file);return{left,top,width:right-left+1,height:bottom-top+1,foot:bottom};}
(async()=>{const all=[],missing=[];let total=0,masters=0;fs.mkdirSync(publicDir,{recursive:true});
 for(const c of audit.characters){const rows=[],sources={},combat=[],finals=[];for(const p of c.poses){const master=path.join(work,c.id,'masters',p.pose+'.png');if(!fs.existsSync(master)){missing.push(c.id+'/'+p.pose);continue;}
  const bytes=fs.readFileSync(master),prior=previous.find(r=>r.id===c.id)?.poses.find(r=>r.pose===p.pose);
  if(prior?.masterSHA256===sha(bytes)&&fs.existsSync(path.join(root,prior.image))&&sha(fs.readFileSync(path.join(root,prior.image)))===prior.webpSHA256){rows.push(prior);sources[p.source]=prior.image;total+=prior.webpBytes;masters+=bytes.length;continue;}
  const m=await sharp(bytes).metadata();assert(m.hasAlpha,'Master must have alpha');const b=await bounds(bytes),ratio=Math.min(1,1024/Math.max(p.width,p.height)),width=Math.round(p.width*ratio),height=Math.round(p.height*ratio);
  // Use one uniform scale. Align the opaque lower edge and horizontal centre
  // with the exact original pose; retain transparent padding and alpha.
  const scale=p.bounds.height*ratio/b.height,rw=Math.max(1,Math.round(m.width*scale)),rh=Math.max(1,Math.round(m.height*scale));
  const x=Math.round((p.bounds.x+p.bounds.width/2)*ratio-(b.left+b.width/2)*scale),y=Math.round(p.bounds.foot*ratio-b.foot*scale);
  const resized=await sharp(bytes).resize(rw,rh).png().toBuffer(),left=Math.max(0,x),top=Math.max(0,y),extract={left:Math.max(0,-x),top:Math.max(0,-y),width:Math.min(rw-Math.max(0,-x),width-left),height:Math.min(rh-Math.max(0,-y),height-top)};
  assert(extract.width>0&&extract.height>0);const layer=await sharp(resized).extract(extract).png().toBuffer();const normalized=await sharp({create:{width,height,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:layer,left,top}]).png().toBuffer();
  const relative='assets/images/tower-preview/'+c.id+'-'+p.pose+'-v1.webp',target=path.join(root,relative);await sharp(normalized).webp({quality:86,alphaQuality:100,effort:6}).toFile(target);const encoded=fs.readFileSync(target),actual=await bounds(encoded),expectedHeight=p.bounds.height*ratio,expectedFoot=p.bounds.foot*ratio;
  const heightError=Math.abs(actual.height-expectedHeight),footError=Math.abs(actual.foot-expectedFoot);const clipped=b.left*scale+x<-.5||b.top*scale+y<-.5||(b.left+b.width)*scale+x>width+.5||(b.top+b.height)*scale+y>height+.5;
  rows.push({...p,master:master.slice(root.length+1),masterSHA256:sha(bytes),masterBytes:bytes.length,image:relative,webpBytes:encoded.length,webpSHA256:sha(encoded),outputWidth:width,outputHeight:height,actualBounds:actual,heightError,footError,clipped,alpha:true});sources[p.source]=relative;total+=encoded.length;masters+=bytes.length;
 }
 for(const {pose} of rows){
  if(!['final','planta','mano','vidrio','envejecido','anciano','frontal','carga','llamado','salto','susto','aleteo-alto','aleteo-bajo','impacto-tronco','impacto-final','alcanza','extrae','prepara','lanza','golpea'].includes(pose))combat.push(pose);
  if(['final','frontal','carga','llamado','salto','invocacion','alcanza','extrae','prepara','lanza','golpea'].includes(pose))finals.push(pose);
 }
 const byPose=Object.fromEntries(rows.map(p=>[p.pose,p.image]));if(c.character==='hombre_lobo')combat.push('salto');if(c.character==='dragon_hielo')combat.push('vuelo','descenso-alto','descenso-bajo');
 all.push({id:c.id,character:c.character,name:c.name,hero:c.hero,direction:c.direction,poses:rows,sourceMap:sources,assets:byPose,combat:[...new Set(combat)],finals:[...new Set(finals)]});
 }
 const report={baseline:audit.baseline,complete:missing.length===0,missing,requiredImages:audit.requiredImages,producedImages:all.reduce((n,c)=>n+c.poses.length,0),publicWebPBytes:total,masterPNGBytes:masters,quality:86,alphaQuality:100,longEdge:1024,characters:all};
 fs.writeFileSync(path.join(work,'production.json'),JSON.stringify(report,null,2));
 // Incomplete artwork never becomes selectable. The gallery can show progress.
 const runtime=all.filter(c=>c.poses.length===audit.characters.find(a=>a.id===c.id).poses.length).map(({id,character,name,hero,assets,sourceMap,combat,finals})=>({id,character,name,hero,assets,sourceMap,combat,finals}));
 // A reviewed combat correction keeps its own immutable asset version.
 const guardiana=runtime.find(c=>c.character==='guardiana');
 const correctedImpact='assets/images/tower-preview/guardiana-orquidea-impacto-v2.webp';
 if(guardiana&&fs.existsSync(path.join(root,correctedImpact))){const old=guardiana.assets.impacto;guardiana.assets.impacto=correctedImpact;for(const key of Object.keys(guardiana.sourceMap))if(guardiana.sourceMap[key]===old)guardiana.sourceMap[key]=correctedImpact;}
 fs.writeFileSync(path.join(root,'js/tower-outfit-catalog.js'),'/* Generated by tools/tower-ten-outfits/build.cjs; development artwork only. */\nglobalThis.TowerOutfitArtwork=Object.freeze('+JSON.stringify(runtime)+');\n');
 console.log(JSON.stringify({complete:report.complete,produced:report.producedImages,required:report.requiredImages,publicWebPBytes:total,masterPNGBytes:masters,selectable:runtime.length,missing:missing.length,geometryFailures:all.flatMap(c=>c.poses.filter(p=>p.clipped||p.heightError>3||p.footError>3).map(p=>c.id+'/'+p.pose))}));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
