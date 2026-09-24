// Read-only audit. Candidates always require manual review before deletion.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const walk = dir => fs.readdirSync(path.join(root, dir), {withFileTypes:true})
  .flatMap(entry => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
function audit() {
  const files = walk('assets');
  const runtimeFiles = [...walk('js').filter(f => !f.includes('/vendor/')), ...walk('css'), 'index.html', 'actualizar.html', 'manifest.json'];
  const sources = runtimeFiles.map(file => [file, fs.readFileSync(path.join(root, file), 'utf8')]);
  const worker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const core = Array.from(vm.runInNewContext(worker.slice(0, worker.indexOf('const ASSET_REVISIONS')) + '; CORE_ASSETS;'));
  const cached = new Set(core.map(f => f.replace(/^\.\//, '')));
  const tracked = new Set(execFileSync('git', ['ls-files', 'assets'], {cwd:root, encoding:'utf8'}).trim().split('\n'));
  const dynamic = new Map();
  const keep = (file, reason) => dynamic.set(path.posix.normalize(file), reason);
  const world = require('../js/azrak-world.js');
  for (const mission of world.missions) for (const file of mission.fondos) keep(`assets/images/fondos/${file}`, 'AzrakWorld.missions');
  for (const shot of [...world.betrayal, ...world.finale]) {
    if (!shot.portrait && !shot.intertitle) keep(`assets/images/cinematicas/reino-azrak/${shot.image || shot.key + '-v1.png'}`, 'AzrakWorld cinematic image/key fallback');
    for (const actor of shot.actors || []) keep(`assets/images/personajes/versus/${actor.file}`, 'AzrakWorld cinematic actor');
  }
  const store = require('../js/cosmetic-store.js');
  for (const item of store.catalog) for (const pose of [...item.poses, 'planta', 'mano', 'vidrio', 'envejecido', 'anciano', 'final']) keep(store.asset(item.id, pose), 'CosmeticStore.asset');
  for (const tier of require('../js/versus-ranks.js').tiers) keep(`assets/images/rangos/${tier.key}-v2.png`, 'VersusRanks.badge');
  // These families are assembled with template strings in app.js/player-avatar.js.
  for (const file of files) {
    if (/^assets\/images\/personajes\/explorador-[^/]+\.png$/.test(file)) keep(file, 'obtenerSrcExplorador (conservative family)');
    if (/^assets\/images\/personajes\/caminata\/(bosque|portal-bosque)\//.test(file)) keep(file, 'crearRutasSpritesCaminata');
    if (/^assets\/images\/personajes\/versus\/mano-abismo-atrapa-/.test(file)) keep(file, 'victimaFinal hand cinematic');
    if (/^assets\/images\/perfil\/marco-.*-v1\.png$/.test(file)) keep(file, 'PlayerAvatar frame');
    if (/^assets\/images\/elementos\/hoja-[12]\.png$/.test(file)) keep(file, 'dynamic forest leaves');
  }
  const entries = files.map(file => ({path:file, bytes:fs.statSync(path.join(root,file)).size, cached:cached.has(file), tracked:tracked.has(file),
    references:sources.filter(([,text]) => text.includes(path.posix.basename(file))).map(([file]) => file), dynamic:dynamic.get(file) || null}));
  const candidates = entries.filter(e => /\.(png|webp|jpg|jpeg|svg|mp3|wav|mp4)$/i.test(e.path) && !e.references.length && !e.dynamic);
  return {assetBytes:entries.reduce((n,e)=>n+e.bytes,0), offlineMediaBytes:entries.filter(e=>e.cached).reduce((n,e)=>n+e.bytes,0),
    candidates, entries, missingOffline:core.filter(f=>f!=='./' && !fs.existsSync(path.join(root,f))),
    missingDynamic:[...dynamic.keys()].filter(f=>!fs.existsSync(path.join(root,f)))};
}
if (require.main === module) {
  const report = audit();
  console.log(JSON.stringify({...report, entries:undefined}, null, 2));
}
module.exports = {audit};
