'use strict';
// Own, fresh cluster on loopback only. Never reads .env, remote URLs, production credentials or player data.
const fs=require('fs'),path=require('path'),os=require('os'),net=require('net'),crypto=require('crypto');
const {pathToFileURL}=require('url'),{spawn}=require('child_process');
exports.create=async()=>{
 const dependencies=process.env.AVENTURA_POSTGRES_QA_PATH||path.join(os.tmpdir(),'aventura-postgres-qa-20261023');
 const binaryPath=require.resolve('@embedded-postgres/'+(process.platform==='win32'?'windows':process.platform)+'-'+process.arch,{paths:[dependencies]});
 const binaries=await import(pathToFileURL(binaryPath).href),{Client}=require(require.resolve('pg',{paths:[dependencies]}));
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'aventura-isolated-postgres-')),data=path.join(root,'data'),password=crypto.randomBytes(24).toString('hex');
 const passwordFile=path.join(root,'initial-password');fs.writeFileSync(passwordFile,password,{mode:0o600});
 const run=(file,args)=>new Promise((resolve,reject)=>{const child=spawn(file,args,{windowsHide:true,stdio:['ignore','pipe','pipe']});let output='';child.stdout.on('data',v=>output+=v);child.stderr.on('data',v=>output+=v);child.on('error',reject);child.on('exit',code=>code===0?resolve(output):reject(Error(path.basename(file)+' exited '+code+': '+output)));});
 const listener=net.createServer();await new Promise(r=>listener.listen(0,'127.0.0.1',r));const port=listener.address().port;await new Promise(r=>listener.close(r));
 await run(binaries.initdb,['-D',data,'--username=qa_owner','--auth=scram-sha-256','--pwfile='+passwordFile,'--encoding=UTF8','--locale=C']);
 await run(binaries.pg_ctl,['-D',data,'-l',path.join(root,'postgres.log'),'-o',`-h 127.0.0.1 -p ${port} -c wal_level=logical -c max_connections=30`,'-w','start']);
 const clients=new Set();let stopped=false;
 async function connect(){const client=new Client({host:'127.0.0.1',port,user:'qa_owner',password,database:'postgres',connectionTimeoutMillis:10000});await client.connect();clients.add(client);return client;}
 async function close(){if(stopped)return;stopped=true;for(const c of clients)await c.end().catch(()=>{});await run(binaries.pg_ctl,['-D',data,'-m','fast','-w','stop']);}
 // Used only by loopback Auth/PostgREST integration tests. Never log this URL.
 try{return {root,connect,close,port,localLibraryDirectory:path.dirname(binaries.pg_ctl),localDatabaseUrl:()=>`postgresql://qa_owner:${password}@127.0.0.1:${port}/postgres`};}catch(error){await close();throw error;}
};
