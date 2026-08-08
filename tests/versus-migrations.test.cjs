const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const migrations = path.resolve(__dirname, "..", "supabase", "migrations");
const accents = fs.readFileSync(
  path.join(migrations, "20260808222835_versus_accent_equivalence.sql"),
  "utf8",
);
const fiveRounds = fs.readFileSync(
  path.join(migrations, "20260808222843_versus_five_rounds.sql"),
  "utf8",
);
const abilities = fs.readFileSync(
  path.join(migrations, "20260808222852_versus_character_abilities.sql"),
  "utf8",
);
const effectDurations = fs.readFileSync(
  path.join(migrations, "20260808230456_versus_ability_effect_durations.sql"),
  "utf8",
);
const guardianDuration = fs.readFileSync(
  path.join(migrations, "20260808233756_versus_guardian_roots_four_seconds.sql"),
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
assert.match(effectDurations, /when 'guardiana' then interval '3 seconds'/);
assert.match(effectDurations, /when 'dragon' then interval '4 seconds'/);
assert.match(effectDurations, /else interval '5 seconds'/);
assert.match(effectDurations, /revoke execute on function public\.activate_versus_ability\(uuid\) from public, anon/);
assert.match(guardianDuration, /when 'guardiana' then interval '4 seconds'/);

console.log("versus-migrations: 15 comprobaciones correctas");
