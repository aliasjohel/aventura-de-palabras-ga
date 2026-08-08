const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const migrations = path.resolve(__dirname, "..", "supabase", "migrations");
const accents = fs.readFileSync(
  path.join(migrations, "20260808_01_versus_accent_equivalence.sql"),
  "utf8",
);
const fiveRounds = fs.readFileSync(
  path.join(migrations, "20260808_02_versus_five_rounds.sql"),
  "utf8",
);
const abilities = fs.readFileSync(
  path.join(migrations, "20260808_03_versus_character_abilities.sql"),
  "utf8",
);

assert.match(accents, /translate\(upper\(coalesce\(p_value, ''\)\), 'ÁÉÍÓÚÜ', 'AEIOUU'\)/);
assert.match(accents, /versus_letter_key\(character\) = any/);
assert.match(fiveRounds, /cardinality\(words\) = 5/);
assert.match(fiveRounds, /interval '240 seconds'/);
assert.match(fiveRounds, /current_word_index \+ 1 >= 5/);
assert.match(abilities, /ability_charge between 0 and 8/);
assert.match(abilities, /when 'guardiana' then interval '2 seconds'/);
assert.match(abilities, /when 'dragon' then interval '3 seconds'/);
assert.match(abilities, /else interval '4 seconds'/);
assert.match(abilities, /'type', 'ability_used'/);

console.log("versus-migrations: 10 comprobaciones correctas");
