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
const migracionDerrotaPorTiempo = leer(
  "supabase",
  "migrations",
  "20260825214904_finish_match_on_individual_timeout.sql",
);
const migracionReparacionOnline = leer(
  "supabase",
  "migrations",
  "20260829172605_repair_kairos_online_selection_and_time_steal.sql",
);

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
assert.match(app, /function aplicarRoboTiempoLocalVersus\([\s\S]+?agotarTiempoRivalVersus\(\)/);
const agotamientoJugadorLocal = app.slice(
  app.indexOf("function agotarTiempoJugadorVersus"),
  app.indexOf("function agotarTiempoRivalVersus"),
);
const agotamientoRivalLocal = app.slice(
  app.indexOf("function agotarTiempoRivalVersus"),
  app.indexOf("function agotarTiemposSimultaneosVersus"),
);
assert.match(agotamientoJugadorLocal, /finalizarPartidaVersus\([\s\S]+?"rival"/);
assert.match(agotamientoRivalLocal, /finalizarPartidaVersus\([\s\S]+?"jugador"/);
assert.match(app, /function agotarTiemposSimultaneosVersus\(/);
assert.match(app, /resultadoTiempo === "ambos"[\s\S]+?agotarTiemposSimultaneosVersus\(\)/);
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
assert.match(app, /const imagenesEdadKairosVersus = Object\.freeze\(/);
assert.match(app, /dragon:\s*Object\.freeze\(\{\s*intermedia: "assets\/images\/personajes\/versus\/dragon-adulto-kairos-v1\.png",\s*anciana: "assets\/images\/personajes\/versus\/dragon-anciano-kairos-v1\.png"/);
assert.match(app, /victimaKairosAncianaVersus\.src = imagenesEdad\.anciana/);
assert.match(app, /kairosFinalMontajeVersus\.id = "kairosFinalMontajeVersus"/);
assert.match(app, /const imagenesFinalKairosVersus = Object\.freeze\(/);
assert.match(app, /dragon_hielo: "assets\/images\/personajes\/versus\/kairos-final-dragon-hielo-v1\.png"/);
assert.match(app, /kairosFinalMontajeVersus\.src = imagenesFinalKairosVersus\[victimaFinal\]/);
assert.match(app, /cinematicaFinalVersus\.classList\.add\(`kairos-victima-\$\{victimaFinal\}`\)/);
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
assert.match(estilos, /personaje-kairos\s*\{[\s\S]+?width:\s*clamp\(220px,\s*41vw,\s*480px\)[\s\S]+?height:\s*84%/);
assert.match(estilos, /personaje-t_shadow\s*\{[\s\S]+?width:\s*clamp\(215px,\s*40vw,\s*470px\)[\s\S]+?height:\s*82%/);
assert.match(estilos, /personaje-guardian_alba\s*\{[\s\S]+?width:\s*clamp\(215px,\s*39vw,\s*465px\)[\s\S]+?height:\s*82%/);
assert.match(estilos, /personaje-kairos\.lanzando-tiempo\s*\{[\s\S]+?width:\s*clamp\(285px,\s*54vw,\s*630px\)/);
const ataqueKairosCss = estilos.slice(
  estilos.indexOf("@keyframes ataqueKairosJugador"),
  estilos.indexOf(".aguja-tiempo-kairos-versus")
);
assert.doesNotMatch(ataqueKairosCss, /scale\((?!1\))/);
assert.match(estilos, /@keyframes kairos-victoria-frente/);
assert.match(estilos, /\.siglos-en-un-segundo:not\(\.kairos-victima-explorador\):not\(\.kairos-victima-kairos\) \.kairos-final-montaje/);
assert.match(estilos, /@keyframes kairos-montaje-cierre/);
assert.match(estilos, /kairos-victima-dragon \.kairos-edad-intermedia[\s\S]+?width:\s*min\(58vw, 690px\)/);
assert.match(estilos, /kairos-victima-azrak \.kairos-edad-final/);
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
assert.match(migracionDerrotaPorTiempo, /cardinality\(v_timed_out_ids\) = 0/);
assert.match(migracionDerrotaPorTiempo, /perform public\.finish_versus_match\(p_match_id, 'time'\)/);
assert.match(migracionDerrotaPorTiempo, /cardinality\(v_timed_out_ids\) = 1/);
assert.match(migracionDerrotaPorTiempo, /user_id <> v_timed_out_ids\[1\]/);
assert.match(migracionDerrotaPorTiempo, /'loserId', v_timed_out_ids\[1\]/);
assert.doesNotMatch(migracionDerrotaPorTiempo, /bool_and\(finished\)/);
assert.match(migracionReparacionOnline, /time_penalty_seconds/);
assert.match(migracionReparacionOnline, /'''kairos'''/);
assert.match(migracionReparacionOnline, /activate_versus_ability_without_kairos\(uuid\)/);

for (const archivo of [
  "kairos-seleccion-v2.png",
  "kairos-combate-v1.png",
  "kairos-ataque-v2.png",
  "explorador-envejecido-kairos-v2.png",
  "explorador-anciano-kairos-v2.png",
  "mago-envejecido-kairos-v1.png",
  "mago-anciano-kairos-v1.png",
  "guardiana-envejecida-kairos-v1.png",
  "guardiana-anciana-kairos-v1.png",
  "dragon-adulto-kairos-v1.png",
  "dragon-anciano-kairos-v1.png",
  "hombre-lobo-envejecido-kairos-v1.png",
  "hombre-lobo-anciano-kairos-v1.png",
  "t-shadow-envejecido-kairos-v1.png",
  "t-shadow-anciano-kairos-v1.png",
  "guardian-alba-envejecido-kairos-v1.png",
  "guardian-alba-anciano-kairos-v1.png",
  "dragon-hielo-envejecido-kairos-v1.png",
  "dragon-hielo-anciano-kairos-v1.png",
  "azrak-envejecido-kairos-v1.png",
  "azrak-anciano-kairos-v1.png",
  "kalamo-envejecido-kairos-v1.png",
  "kalamo-anciano-kairos-v1.png",
  "kairos-final-mago-v1.png",
  "kairos-final-guardiana-v1.png",
  "kairos-final-dragon-v1.png",
  "kairos-final-hombre-lobo-v1.png",
  "kairos-final-t-shadow-v1.png",
  "kairos-final-guardian-alba-v1.png",
  "kairos-final-dragon-hielo-v1.png",
  "kairos-final-azrak-v1.png",
  "kairos-final-kalamo-v1.png",
  "kairos-final-explorador-concepto-v1.png",
]) {
  const ruta = path.join(raiz, "assets", "images", "personajes", "versus", archivo);
  assert.ok(fs.existsSync(ruta), archivo);
  assert.match(sw, new RegExp(archivo.replaceAll(".", "\\.")));
  if (!archivo.startsWith("kairos-final-")) {
    const png = fs.readFileSync(ruta);
    assert.equal(png[25], 6, `${archivo} debe ser RGBA`);
  }
}

console.log("versus-kairos: personaje, habilidad y cinemática verificados");
