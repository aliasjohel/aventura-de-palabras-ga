const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const serviceWorker = fs.readFileSync(path.join(raiz, "sw.js"), "utf8");
const migracion = fs.readFileSync(
  path.join(
    raiz,
    "supabase",
    "migrations",
    "20260817010000_versus_rematch_and_recovery_words.sql",
  ),
  "utf8",
);

assert.match(app, /function agregarPalabraRecuperacionVersus\(/);
assert.match(app, /VersusEngine\.elegirPalabraRecuperacion\(/);
assert.match(app, /if \(demoVersus\.vidasJugador > 0\) agregarPalabraRecuperacionVersus\("jugador"\)/);
assert.match(app, /if \(demoVersus\.vidasRival > 0\) agregarPalabraRecuperacionVersus\("rival"\)/);
assert.match(app, /demoVersus\.palabrasCompletadasJugador >= maximoPalabrasVersus/);
assert.match(app, /demoVersus\.palabrasCompletadasRival >= maximoPalabrasVersus/);
assert.match(app, /partida\.me\?\.lastFailedWord \|\| palabraEvento/);
assert.match(app, /VersusEngine\.obtenerEtiquetaRonda\(propio\.wordIndex\)/);
assert.match(html, /js\/versus-engine\.js\?v=20260817-versus-recuperacion-1/);
assert.match(serviceWorker, /"\.\/js\/versus-engine\.js": "20260817-versus-recuperacion-1"/);

assert.match(migracion, /add column if not exists last_failed_word text/);
assert.match(migracion, /cardinality\(words\) between 5 and 9/);
assert.match(migracion, /current_word_index between 0 and 9/);
assert.match(migracion, /from private\.versus_word_dictionary as dictionary/);
assert.match(migracion, /dictionary\.theme_key = v_theme_key/);
assert.match(migracion, /set words = array_append\(words, v_recovery_word\)/);
assert.match(migracion, /new\.completed_words < 5/);
assert.match(migracion, /new\.finished := false/);
assert.match(migracion, /create trigger versus_match_syncs_finished_room/);
assert.match(migracion, /where room_id = p_room_id and status = 'finished'/);
assert.match(migracion, /'lastFailedWord', v_me\.last_failed_word/);
assert.doesNotMatch(
  migracion.slice(migracion.indexOf("'opponent'")),
  /lastFailedWord/,
  "La última palabra del rival no debe salir en el estado público.",
);

console.log("versus-recovery: comprobaciones correctas");
