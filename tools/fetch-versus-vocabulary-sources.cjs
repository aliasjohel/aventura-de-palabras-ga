// Optional lexical-audit setup; does not connect to Supabase. Large dictionaries
// remain in an explicit external cache and are never shipped with the game.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const source=require('../data/versus-vocabulary.json').sources;
const directory=process.argv[2];if(!directory)throw Error('Pass an absolute external cache directory.');
if(!path.isAbsolute(directory))throw Error('Cache directory must be absolute.');
(async()=>{fs.mkdirSync(directory,{recursive:true});
 for(const locale of ['en_US','pt_BR'])for(const ext of ['dic','aff']){
  const url='https://raw.githubusercontent.com/LibreOffice/dictionaries/'+source.dictionaries.commit+'/'+(locale==='en_US'?'en':'pt_BR')+'/'+locale+'.'+ext;
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(url+': '+response.status);
  const bytes=Buffer.from(await response.arrayBuffer());if(crypto.createHash('sha256').update(bytes).digest('hex')!==source[locale][ext])throw Error('Source digest mismatch: '+url);
  fs.writeFileSync(path.join(directory,locale+'.'+ext),bytes);
 }
 const response=await fetch(source.country_names.url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('Country source: '+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());if(crypto.createHash('sha256').update(bytes).digest('hex')!==source.country_names.sha256)throw Error('Country source digest mismatch');
 fs.writeFileSync(path.join(directory,'countries.json'),bytes);
 fs.writeFileSync(path.join(directory,'source.json'),JSON.stringify({...source.dictionaries,countryCommit:source.country_names.commit},null,2)+'\n');
 console.log('PASS pinned lexical sources downloaded and SHA-256 verified.');
})().catch(e=>{console.error(e);process.exitCode=1});
