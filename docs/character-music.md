# Character music

The approved themes are mapped in `js/character-music.js`. Azrak uses Goliath;
T. Shadow uses The Final Battle. Kálamo retains his existing asset.
New source/license details are shipped in `assets/licenses/character-music.txt`.
Goliath's required attribution is visible in Settings.

Music is local to each device. The existing `personajeRivalVersus` already
identifies the other player from the local account's perspective. The music
controller reads that opponent, never player 1 or the winning character. No
match schema, network messages, or server changes are needed.

All themes loop with native Audio.loop. Each source has one reusable Audio;
intro-to-duel transitions preserve playback position. Browser backgrounding and
cinematic pause stop playback. Autoplay rejection retries only on interaction.
Music is lazy loaded. Each theme is normalized to -18 LUFS / -3 dBTP, 112 kbps.

The battle header's Music button pauses/resumes only music, preserving time and
sound effects. Its preference is local and survives reloads. Exploration music
is independent. World music pauses while a character presentation owns audio.

Presentations covered: Kairós, Kálamo, Guardiana, Zafir, Hombre Lobo, Nivor,
Shadow, and Azrak's betrayal before the final duel. Battle entrance and victory
animations retain the rival theme until results. The already scored world
endings keep their narrative timing and existing music, including Kálamo's
reappearance in the final sequence.

Run `node --test tests/character-music.test.cjs` and
`node tools/check-character-music.cjs` for playback, persistence, and offline
coverage. Regenerate and check the cache manifest before publishing.
