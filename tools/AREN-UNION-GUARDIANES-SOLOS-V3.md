# Guardianes independientes de Aren

Arte generado con la herramienta integrada ImageGen el 2 de octubre de 2026.
Referencia de estilo: `assets/images/trajes/aren-union-guardianes-v2.png`.
Entrega: `assets/images/trajes/aren-union-guardianes-solos-v3.png`, PNG transparente con cinco figuras y sin Aren.

La cinemática conserva el sprite de Aren en primer plano. Cinco máscaras CSS revelan los guardianes a los 1800, 2200, 2600, 3000 y 3400 ms; la invocación empieza a los 3700 ms y el rayo a los 5400 ms. Se conserva la duración del remate integrado. La ilustración anterior con Aren y los guardianes ya no se carga en esta secuencia.

## Prompt final

Use case: stylized-concept. Asset type: transparent game cinematic guardian sprite sheet. Use the reference only for the beautiful epic painted fantasy style and identities of the FIVE supporting guardians. Create ONLY those five guardians, NO Aren, NO explorer, NO boy, NO hat/scarf character. Genuine transparent background, no scenery, no text. Wide landscape canvas divided into FIVE equally wide invisible columns with clear transparent gaps; every figure and its glow contained within its own column, no overlapping neighbors. Left to right: emerald forest sorceress with leaf armor and wooden glowing staff; blond white-and-gold armored knight with radiant sword; majestic sapphire-blue dragon with gold horns; majestic white ice dragon with crystalline spikes; purple hooded shadow rogue with glowing violet eyes. Full figures including wings neatly folded to fit each column. All five face slightly toward the viewer, invoking magical power from their hands or mouths with subtle individual colored auras. Detailed polished painterly fantasy illustration, beautiful expressive faces, dramatic luminous edges. No shared energy beams crossing columns. Exactly five characters, isolated clean cutouts.

## Verificación

- `node tools/check-aren-union-preview.cjs`: aparición secuencial, ambas orientaciones, pausa, repetición y recursos.
- `node tools/check-aren-union-full-final.cjs`: remate integrado, prisión, ruptura y finalización.
- `node --test tests/game-assets.test.cjs`: recursos del caché y recursos dinámicos existentes.
