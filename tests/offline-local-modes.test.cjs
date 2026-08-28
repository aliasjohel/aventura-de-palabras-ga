const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const pwa = fs.readFileSync(path.join(root, "js", "pwa.js"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const loader = fs.readFileSync(path.join(root, "js", "supabase-loader.js"), "utf8");

assert.doesNotMatch(html, /<script[^>]+https:\/\/cdn\.jsdelivr\.net[^>]+supabase/i);
assert.match(html, /js\/supabase-loader\.js/);
assert.ok(
  html.indexOf("js/supabase-loader.js") < html.indexOf("js/supabase-config.js"),
  "el cargador diferido debe estar disponible antes de configurar Supabase",
);
assert.match(loader, /function cargarSupabase\(\)/);
assert.match(loader, /document\.head\.appendChild\(script\)/);
assert.match(loader, /Aventura, Modo Pruebas y Torre siguen disponibles sin conexión/);
assert.match(app, /await globalThis\.AventuraOnline\?\.cargarSupabase\?\.\(\)/);

assert.match(html, /id="estadoOfflineJuego"/);
assert.match(pwa, /Aventura, Pruebas y Torre disponibles sin conexión/);
assert.match(pwa, /window\.addEventListener\("offline"/);
assert.match(pwa, /navigator\.storage\.persist\(\)/);
assert.match(sw, /\.\.\.RECURSOS_MODOS_LOCALES/);

const bloqueRecursosLocales = sw.match(
  /const RECURSOS_MODOS_LOCALES = \[([\s\S]+?)\n\];/,
)?.[1] || "";
const recursosLocales = [...bloqueRecursosLocales.matchAll(/"(\.\/assets\/[^"?]+)"/g)]
  .map((coincidencia) => coincidencia[1]);
assert.ok(recursosLocales.length >= 55, "el paquete local debe incluir los recursos faltantes");
for (const recurso of recursosLocales) {
  assert.ok(fs.existsSync(path.join(root, recurso.slice(2))), `falta ${recurso}`);
}

const manejadorFetch = sw.slice(sw.lastIndexOf('self.addEventListener("fetch"'));
assert.match(manejadorFetch, /event\.respondWith\(responderRecursoEstatico\(event\)\)/);
assert.doesNotMatch(manejadorFetch, /request\.destination/);
assert.doesNotMatch(manejadorFetch, /responderDesdeRed\(request\)/);

assert.match(app, /const claveRecompensasMonedasPendientes/);
assert.match(app, /function otorgarMonedas\(cantidad, origen\)/);
assert.match(app, /AventuraMonedasOffline = Object\.freeze/);
assert.match(app, /confirmarSincronizadas: confirmarRecompensasMonedasSincronizadas/);
assert.doesNotMatch(app, /monedas \+= (?:10|30)/);

console.log("offline-local-modes: carga diferida, caché local y monedas pendientes verificadas");
