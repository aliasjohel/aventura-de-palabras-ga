'use strict';const fs=require('fs'),path=require('path'),cp=require('child_process');const root=path.resolve(__dirname,'../..'),work=path.join(root,'.local-developer/tower-ten-outfits');process.chdir(root);const production=JSON.parse(fs.readFileSync(path.join(work,'production.json'))),tests=JSON.parse(fs.readFileSync(path.join(work,'tests.json'))),upgrade=JSON.parse(fs.readFileSync(path.join(work,'upgrade.json'))),audit=JSON.parse(fs.readFileSync(path.join(work,'audit.json')));
const git=(args,input)=>cp.execFileSync('git',args,{input,stdio:['pipe','pipe','ignore'],maxBuffer:20e6}),base=audit.baseline;
const publicFiles=['index.html','js/app.js','js/resource-catalog.js','js/tower-outfit-preview.js','js/tower-outfit-catalog.js','sw.js'];let codeDelta=0;
const files=publicFiles.map(file=>{let old=0;try{old=git(['show',base+':'+file]).length;}catch{}const bytes=fs.readFileSync(file),blob=git(['hash-object','--path='+file,'--stdin','-w'],bytes).toString().trim(),now=git(['cat-file','blob',blob]).length;codeDelta+=now-old;return{path:file,baselineBytes:old,candidateBytes:now,delta:now-old};});
const geometry=tests.results.flatMap(c=>c.geometry).filter(g=>g.original),mib=b=>(b/1048576).toFixed(2);
const summary={baseline:base,branch:'development/tower-ten-outfits-20261103',version:'v391-towerten-candidate1',published:false,producedImages:production.producedImages,publicWebPBytes:production.publicWebPBytes,publicCodeDeltaBytes:codeDelta,totalPublicGameResourceIncreaseBytes:production.publicWebPBytes+codeDelta,changedPublicCode:files,masterPNGBytes:production.masterPNGBytes,compressionSavedPercent:100*(1-production.publicWebPBytes/production.masterPNGBytes),geometryChecks:geometry.length,maxHeightDifferencePixels:Math.max(...geometry.map(g=>Math.abs(g.original.height-g.exclusive.height))),maxFootDifferencePixels:Math.max(...geometry.map(g=>Math.abs(g.original.ground-g.exclusive.ground))),sceneChecks:tests.results.reduce((n,c)=>n+c.scenes.length,0),regressionTestCount:21,regressionTestsPassed:/# pass 21\s*\r?\n# fail 0/.test(fs.readFileSync(path.join(work,'regression.tap'),'utf8')),decodedReferencesReleasedAfterReset:tests.decodedReferencesReleasedAfterReset,physicalAndroidTest:false};
if(!production.complete||!tests.passed||!upgrade.passed||!summary.regressionTestsPassed)throw Error('Candidate checks are incomplete');fs.writeFileSync(path.join(work,'summary.json'),JSON.stringify(summary,null,2));fs.copyFileSync(path.join(work,'audit.json'),path.join(root,'docs/tower-ten-outfit-audit.json'));
const table=production.characters.map(c=>{const t=tests.results.find(t=>t.id===c.id);return '| '+c.hero+' | '+c.name+' | '+c.poses.length+' | '+mib(c.poses.reduce((n,p)=>n+p.webpBytes,0))+' | '+mib(t.initialBytes)+' |';}).join('\n');
const doc=`# Diez trajes de Torre Arcade · Candidata de desarrollo

Los diez conjuntos están producidos e integrados en el selector temporal Configuración → Trajes de Torre · Prueba visual. Se prepararon juntos sobre la versión de Aren ya aprobada. La rama es \`development/tower-ten-outfits-20261103\`; esta candidata **no está publicada**.

| Personaje real | Traje nuevo | Imágenes | WebP (MiB) | Selección inicial (MiB) |
|---|---|---:|---:|---:|
${table}

## Recursos y calidad

- ${production.producedImages} PNG maestros conservados, ${mib(production.masterPNGBytes)} MiB. Se utilizó el generador integrado image_gen; los prompts y las referencias están guardados junto a los maestros y en el ZIP de revisión.
- ${mib(production.publicWebPBytes)} MiB en WebP (${production.publicWebPBytes.toLocaleString('en-US')} bytes), calidad 86, alfa 100, borde máximo 1024 px. Reducción del ${summary.compressionSavedPercent.toFixed(2)} % frente a los maestros.
- Incremento neto del código y catálogos de juego: ${codeDelta.toLocaleString('en-US')} bytes. Incremento total de recursos públicos de juego: ${(production.publicWebPBytes+codeDelta).toLocaleString('en-US')} bytes (${mib(production.publicWebPBytes+codeDelta)} MiB), calculado con los bytes normalizados que publica Git. No incluye maestros ni galería local de revisión, que no se añaden al juego público.
- Normalización uniforme por pose: se conserva el aspecto del dibujo y se alinea su centro y borde inferior opaco con el lienzo original. No se estiran las figuras. El inventario técnico completo registra dimensiones, límites opacos, recursos originales, trajes previos, ataques, habilidades y transformaciones en [tower-ten-outfit-audit.json](tower-ten-outfit-audit.json).
- Cero recortes de arte detectados. Esquinas transparentes revisadas; la captura escenográfica de Kairós conserva el fondo que ya tenía su escena original.

## Pruebas del candidato

- Diez trajes: ataques, habilidades, daño, recuperación y cambio al traje habitual. El rival del mismo personaje conserva su apariencia habitual.
- ${summary.geometryChecks} comparaciones de combate y selección en 844×390, 667×375 y 1280×820. Diferencia máxima: ${summary.maxHeightDifferencePixels.toFixed(3)} px de altura y ${summary.maxFootDifferencePixels.toFixed(3)} px en el apoyo.
- ${summary.sceneChecks} comprobaciones de cinemáticas en dos pantallas móviles: final propio y escenas como víctima de Aren, Guardiana, Azrak, Kálamo y Kairós cuando corresponde.
- Secuencia real humana → transformación → aullido → lobo; fotogramas reales de descenso de Nivor; tres fases reales de formación de Kálamo.
- 21/21 pruebas de caché, rangos multimedia, puertas de desarrollo, motor de Versus, reloj de Kairós y bloqueo del teclado de la IA. Se actualizó el fixture aislado del teclado para declarar la dependencia de autoridad ya existente; no se cambiaron sus reglas.
- La escala de Aren aprobado mantiene sus 15 comprobaciones de poses de combate y tres tarjetas de selección correctas.
- Actualización real de PWA v390 → candidata v391: solo cinco archivos de código/catálogos, cero imágenes descargadas durante la actualización, versión previa activa hasta confirmar, datos locales e IndexedDB conservados y selección temporal borrada al recargar.
- Selección y reutilización offline verificadas con un traje nuevo en el Service Worker real. El módulo libera referencias de imágenes decodificadas al desactivar o cambiar de traje; no mantiene los diez conjuntos decodificados a la vez.
- Almacenamiento de negocio idéntico antes y después de la revisión; cero escrituras remotas. Los trajes temporales no aparecen en CosmeticStore ni se serializan como equipamiento autorizado.

## Correcciones incluidas

- Guardiana: sustituida la pose de impacto de tres brazos por una pose anatómica de dos brazos. El descarte está archivado fuera de assets y no forma parte de la galería ni de los recursos públicos. El defecto provenía de la referencia original, que se conserva sin editar.
- Kálamo: reemplazado el diseño apagado por Maestro de las Mil Tintas, con turquesa, coral, violeta y oro. Sus 18 poses usan la nueva referencia.
- Nivor y T. Shadow: corregidas las siluetas base que inicialmente excedían el encuadre.
- Nimbus: eliminada la neblina rectangular de la pose contra el vidrio.
- Entrada de Nivor: el observador de daño recupera reposo solo desde la pose de impacto, para no interrumpir el aleteo exclusivo al cambiar una clase visual.

## Límites y publicación pendiente

Las pruebas se realizaron en Edge Chromium con emulación móvil y táctil. **No se probó físicamente esta candidata en Android**; la validación de memoria, fluidez y descarga en el dispositivo real se hará después de una publicación candidata autorizada. No se afirma una tasa de cuadros ni un consumo de RAM físico.

El acceso es visual, temporal y local a la sesión. En Multijugador el rival conserva la apariencia autorizada habitual. No se modifican monedas, XP, ranking, inventarios, recompensas ni esquemas de Supabase. Los originales y los trajes existentes permanecen sin cambios.

El desbloqueo definitivo no está implementado ni activado: deberá validar en Supabase los diez pisos completos con el personaje correspondiente y otorgar exclusivamente su traje. Antes de Google Play se mantiene obligatoria la desactivación de la puerta DEVELOPMENT_OUTFIT_PREVIEW.

Galería local: http://127.0.0.1:4198/gallery/ . Artefactos completos: \`.local-developer/tower-ten-outfits/\`. Comprobaciones reproducibles: \`tools/tower-ten-outfits/check.cjs\`, \`upgrade.cjs\`, \`report.cjs\`, \`tools/check-tower-preview-scale.cjs\` y \`tools/check-incremental-update.cjs\`.
`;
fs.writeFileSync(path.join(root,'docs/tower-ten-development-playtest.md'),doc);console.log(JSON.stringify(summary));
