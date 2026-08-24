const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const leer = (...partes) => fs.readFileSync(path.join(raiz, ...partes), "utf8");
const html = leer("index.html");
const app = leer("js", "app.js");
const estilos = leer("css", "styles.css");
const sw = leer("sw.js");
const migracion = leer("supabase", "migrations", "20260823010000_add_kairos_time_steal.sql");

assert.match(html, /data-personaje="kairos"/);
assert.match(html, /Kair&oacute;s/);
assert.match(html, /id="agujaTiempoKairosVersus"/);
assert.match(html, /data-habilidad="kairos"/);
assert.match(html, /id="btnProbarCinematicaKairos"/);
assert.match(html, /id="victimaKairosEnvejecidaVersus"/);
assert.match(html, /id="victimaKairosAncianaVersus"/);
assert.match(html, /class="kairos-final-victoria"[\s\S]+kairos-seleccion-v2\.png/);
assert.match(html, />00:00</);

assert.match(app, /kairos:\s*\{[\s\S]+?ataque: "aguja-tiempo"[\s\S]+?final: "siglos-en-un-segundo"/);
assert.match(app, /efecto: "time_steal"[\s\S]+?segundos: 20/);
assert.match(app, /function calcularTiempoOnlineVersus\(/);
assert.match(app, /restanteGlobal - Number\(jugador\.timePenaltySeconds \|\| 0\)/);
assert.match(app, /function reproducirAtaqueKairosVersus\(/);
assert.match(app, /function reproducirAtaqueKairosRivalVersus\(/);
assert.match(app, /srcKairosAtaqueVersus/);
assert.match(app, /function programarEntradaKairosVersus\(/);
const entradaKairos = app.slice(
  app.indexOf("function programarEntradaKairosVersus"),
  app.indexOf("function limpiarEntradaDueloVersus"),
);
assert.match(entradaKairos, /elemento\.src = srcKairosBaseVersus/);
assert.doesNotMatch(entradaKairos, /srcKairosAtaqueVersus/);
assert.match(app, /function reproducirSiglosEnUnSegundoVersus\(/);
assert.match(app, /finalElegido === "siglos-en-un-segundo"/);
assert.match(app, /evento\.character === "kairos"/);

assert.match(estilos, /\.habilidad-kairos-versus/);
assert.match(estilos, /\.siglos-en-un-segundo \.kairos-final-reloj/);
assert.match(estilos, /@keyframes kairos-edad-media/);
assert.match(estilos, /@keyframes kairos-edad-anciana/);
assert.match(estilos, /@keyframes entradaKairosJugador/);
assert.match(estilos, /@keyframes entradaKairosRival/);
assert.match(estilos, /@keyframes ataqueKairosJugador/);
assert.match(estilos, /@keyframes ataqueKairosRival/);
assert.match(estilos, /personaje-kairos\s*\{[\s\S]+?width:\s*clamp\(190px,\s*36vw,\s*420px\)[\s\S]+?height:\s*78%/);
assert.match(estilos, /personaje-kairos\.lanzando-tiempo\s*\{[\s\S]+?width:\s*clamp\(285px,\s*54vw,\s*630px\)/);
const ataqueKairosCss = estilos.slice(
  estilos.indexOf("@keyframes ataqueKairosJugador"),
  estilos.indexOf(".aguja-tiempo-kairos-versus")
);
assert.doesNotMatch(ataqueKairosCss, /scale\((?!1\))/);
assert.match(estilos, /@keyframes kairos-victoria-frente/);
assert.match(estilos, /personaje-dos\.personaje-kairos[\s\S]+?scaleX\(-1\)/);
assert.doesNotMatch(estilos, /kairos-final-victima[\s\S]{0,300}mix-blend-mode/);
const victimaKairosCss = estilos.slice(
  estilos.indexOf(".siglos-en-un-segundo .kairos-final-victima"),
  estilos.indexOf(".siglos-en-un-segundo .victima-final-explorador"),
);
assert.match(victimaKairosCss, /transform: scaleX\(-1\)/);

assert.match(migracion, /add column if not exists time_penalty_seconds/);
assert.match(migracion, /time_penalty_seconds \+ 20/);
assert.match(migracion, /'effect', 'time_steal', 'seconds', 20/);
assert.match(migracion, /make_interval\(secs => player\.time_penalty_seconds\)/);
assert.match(migracion, /security definer[\s\S]+set search_path = ''/);
assert.match(migracion, /revoke execute on function private\.expire_versus_player_times/);
assert.match(migracion, /grant execute on function public\.activate_versus_ability\(uuid\) to authenticated/);

for (const archivo of [
  "kairos-seleccion-v2.png",
  "kairos-combate-v1.png",
  "kairos-ataque-v1.png",
  "explorador-envejecido-kairos-v2.png",
  "explorador-anciano-kairos-v2.png",
  "kairos-final-explorador-concepto-v1.png",
]) {
  const ruta = path.join(raiz, "assets", "images", "personajes", "versus", archivo);
  assert.ok(fs.existsSync(ruta), archivo);
  assert.match(sw, new RegExp(archivo.replaceAll(".", "\\.")));
  if (!archivo.includes("concepto")) {
    const png = fs.readFileSync(ruta);
    assert.equal(png[25], 6, `${archivo} debe ser RGBA`);
  }
}

console.log("versus-kairos: personaje, habilidad y cinemática verificados");
