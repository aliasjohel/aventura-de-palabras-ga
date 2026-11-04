'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'../..'),work=path.join(root,'.local-developer/tower-pose-review');
const input=process.argv[2];if(!input)throw Error('Provide generated transparent master');
async function bounds(input){const {data,info}=await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject:true});let l=info.width,t=info.height,r=0,b=0;for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>=128){l=Math.min(l,x);t=Math.min(t,y);r=Math.max(r,x);b=Math.max(b,y);}return {left:l,top:t,width:r-l+1,height:b-t+1,foot:b};}
(async()=>{
 const original=path.join(root,'assets/images/tower-preview/guardiana-orquidea-base-v1.webp'),meta=await sharp(original).metadata(),base=await bounds(original),body=await bounds(input),scale=base.height/body.height;
 const resized=await sharp(input).extract({left:body.left,top:body.top,width:body.width,height:body.height}).resize({height:base.height}).png().toBuffer(),rb=await bounds(resized);
 const left=Math.round(base.left+base.width/2-rb.left-rb.width/2),top=Math.round(base.foot-rb.foot);
 if(left<0||top<0)throw Error('Artwork exceeds canvas');
 const name='assets/images/tower-preview/guardiana-orquidea-impacto-v2.webp',target=path.join(root,name);
 await sharp({create:{width:meta.width,height:meta.height,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:resized,left,top}]).webp({quality:86,alphaQuality:100,effort:6}).toFile(target);
 fs.copyFileSync(input,path.join(work,'guardiana-impacto-v2-master.png'));
 const catalog=path.join(root,'js/tower-outfit-catalog.js');fs.writeFileSync(catalog,fs.readFileSync(catalog,'utf8').replaceAll('guardiana-orquidea-impacto-v1.webp','guardiana-orquidea-impacto-v2.webp'));
 // Keep the generated catalog reproducible without overwriting cinematic/source masters.
 fs.writeFileSync(path.join(work,'guardiana-impacto-v2.json'),JSON.stringify({tool:'built-in image_gen',input,output:name,baseBounds:base,bounds:await bounds(target),sha256:crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex')},null,2));
 console.log(JSON.stringify({output:name,baseBounds:base,bounds:await bounds(target)}));
})().catch(e=>{console.error(e);process.exitCode=1;});
