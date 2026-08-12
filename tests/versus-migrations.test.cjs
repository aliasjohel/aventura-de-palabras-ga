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
const werewolf = fs.readFileSync(
  path.join(migrations, "20260809001114_versus_werewolf_full_moon_hunt.sql"),
  "utf8",
);
const shadow = fs.readFileSync(
  path.join(migrations, "20260809194727_versus_t_shadow_black_hole.sql"),
  "utf8",
);
const fiveSecondAbilities = fs.readFileSync(
  path.join(migrations, "20260809194802_versus_ability_duration_five_seconds.sql"),
  "utf8",
);
const guardianAlba = fs.readFileSync(
  path.join(migrations, "20260809194812_add_guardian_alba.sql"),
  "utf8",
);
const nivor = fs.readFileSync(
  path.join(migrations, "20260812222516_add_nivor_ice_dragon.sql"),
  "utf8",
);
const dictionary = fs.readFileSync(
  path.join(migrations, "20260809015253_versus_thematic_dictionary.sql"),
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
assert.match(werewolf, /'hombre_lobo'/);
assert.match(werewolf, /when 'hombre_lobo' then 'invert'/);
assert.match(werewolf, /when 'hombre_lobo' then interval '4 seconds'/);
assert.match(werewolf, /active_effect in \('roots', 'roar', 'shuffle', 'invert'\)/);
assert.match(werewolf, /revoke execute on function public\.activate_versus_ability\(uuid\)[\s\S]+from public, anon/);
assert.match(shadow, /'t_shadow'/);
assert.match(shadow, /when 't_shadow' then 'black_hole'/);
assert.match(shadow, /active_effect in \('roots', 'roar', 'shuffle', 'invert', 'black_hole'\)/);
assert.match(shadow, /when 'mago' then interval '5 seconds'[\s\S]+else interval '4 seconds'/);
assert.match(shadow, /revoke execute on function public\.activate_versus_ability\(uuid\) from public, anon/);
assert.match(fiveSecondAbilities, /v_expires_at := now\(\) \+ interval '5 seconds'/);
assert.match(fiveSecondAbilities, /when 't_shadow' then 'black_hole'/);
assert.match(fiveSecondAbilities, /revoke execute on function public\.activate_versus_ability\(uuid\) from public, anon/);
assert.match(guardianAlba, /'guardian_alba'/);
assert.match(guardianAlba, /when 'guardian_alba' then 'key_bounce'/);
assert.match(guardianAlba, /active_effect in \('roots', 'roar', 'shuffle', 'invert', 'black_hole', 'key_bounce'\)/);
assert.match(guardianAlba, /v_expires_at := now\(\) \+ interval '5 seconds'/);
assert.match(guardianAlba, /revoke execute on function public\.set_versus_character\(uuid, text, boolean\) from public, anon/);
assert.match(nivor, /'dragon_hielo'/);
assert.match(nivor, /when 'dragon_hielo' then 'ice_screen'/);
assert.match(nivor, /active_effect in \('roots', 'roar', 'shuffle', 'invert', 'black_hole', 'key_bounce', 'ice_screen'\)/);
assert.match(nivor, /v_expires_at := now\(\) \+ interval '5 seconds'/);
assert.match(nivor, /revoke execute on function public\.activate_versus_ability\(uuid\) from public, anon/);
assert.match(dictionary, /create schema if not exists private/);
assert.match(dictionary, /alter table private\.versus_word_dictionary enable row level security/);
assert.match(dictionary, /revoke all on table private\.versus_word_dictionary from public, anon, authenticated/);
assert.match(dictionary, /dictionary\.word_key = public\.versus_letter_key\(supplied\.word\)/);
assert.match(dictionary, /before insert or update of theme_key, words/);
assert.match(dictionary, /Una o más palabras no figuran en el diccionario/);

console.log("versus-migrations: 36 comprobaciones correctas");
