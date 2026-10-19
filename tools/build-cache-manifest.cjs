// Run after runtime edits and before publishing. Hashes the exact Git bytes.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const crypto = require('node:crypto'), cp = require('node:child_process');
const root = path.resolve(__dirname, '..'), file = path.join(root, 'sw.js');
cp.execFileSync(process.execPath, [path.join(__dirname, 'prepare-progressive-assets.cjs'), ...(process.argv.includes('--check') ? ['--check'] : [])]);
const source = fs.readFileSync(file, 'utf8');
const context = {self: {addEventListener() {}}, URL, Request, Response};
vm.runInNewContext(source + '\nglobalThis.assets = RESOURCE_ASSETS;', context);
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, 'cache-legacy-v347.json')));
const hashes = {}, legacy = {};
for (const asset of context.assets) {
  const relative = asset === './' ? 'index.html' : asset.slice(2);
  const bytes = fs.readFileSync(path.join(root, relative));
  // Respect .gitattributes and Git's CRLF normalization, including new assets.
  let published = bytes;
  if (/\.(html|css|js|json|svg|txt|xml|webmanifest)$/.test(relative)) {
    const blob = cp.execFileSync('git', ['hash-object', '--path=' + relative, '--stdin', '-w'], {cwd: root, input: bytes, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore']}).trim();
    published = cp.execFileSync('git', ['cat-file', 'blob', blob], {cwd: root, maxBuffer: Math.max(bytes.length * 2, 1024 * 1024)});
  }
  hashes[asset] = 'sha256-' + crypto.createHash('sha256').update(published).digest('hex');
  // An old manual revision is trusted only for bytes identical to v347.
  if (baseline[asset]?.hash === hashes[asset]) legacy[asset] = baseline[asset].revision;
}
const generated = '// BEGIN GENERATED RESOURCE MANIFEST\nconst ASSET_REVISIONS = ' + JSON.stringify(hashes, null, 2) + ';\nconst LEGACY_RESOURCE_REVISIONS = ' + JSON.stringify(legacy, null, 2) + ';\n// END GENERATED RESOURCE MANIFEST';
const output = source.replace(/\/\/ BEGIN GENERATED RESOURCE MANIFEST[\s\S]*?\/\/ END GENERATED RESOURCE MANIFEST/, generated);
if (output === source && !source.includes(generated)) throw Error('Generated manifest markers missing');
if (process.argv.includes('--check')) {
  if (output !== source) throw Error('Runtime files changed: run node tools/build-cache-manifest.cjs');
} else fs.writeFileSync(file, output);
console.log('Cache manifest: ' + Object.keys(hashes).length + ' resources, hashes verified' + (process.argv.includes('--check') ? '' : ' and updated'));
