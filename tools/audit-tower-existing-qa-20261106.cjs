'use strict';
// Re-run the existing Tower coin/authority suite against an ephemeral loopback
// PostgreSQL fixture. Exclude every later migration, including Multiplayer Lab.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),sourceFile='E:/Proyectos/Aventura-de-Palabras-i18n-stage2b/tools/tower-authority/check-postgres.cjs';
let source=fs.readFileSync(sourceFile,'utf8');
source=source.replace("f.endsWith('.sql')&&f!==migration","f.endsWith('.sql')&&f<migration")
 .replace("path.join(root,'docs/tower-authority-postgres-results.json')",JSON.stringify(path.join(root,'.local-developer/tower-rewards-audit-20261106/existing-postgres-results.json')))
 .replace('if(require.main===module)main()', 'main()');
const out=path.join(root,'.local-developer/tower-rewards-audit-20261106');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'qa-provenance.json'),JSON.stringify({source:sourceFile,sha256:crypto.createHash('sha256').update(fs.readFileSync(sourceFile)).digest('hex'),fixture:'ephemeral PostgreSQL on 127.0.0.1, synthetic accounts only',excluded:'all migrations after Tower, including Multiplayer Lab',productionConnections:0,coverage:'existing authority and coins only; Tower costume/frame grants do not exist yet'},null,2));
const child=new Module(sourceFile,module);child.filename=sourceFile;child.paths=Module._nodeModulePaths(path.dirname(sourceFile));child._compile(source,sourceFile);
