# Ranked avatar frame artwork

Six approved square image frames replace the CSS decorations. Existing frame IDs,
rank thresholds, saved selection and earned rewards remain unchanged. Rank badges
continue to indicate the current rank independently of the selected frame.

Production assets: `assets/images/perfil/marco-{bronce,plata,oro,platino,diamante,leyenda}-v1.webp`
(384 px); matching 96 px assets live in `assets/images/perfil/miniaturas/`.
All have transparent centers and outside backgrounds. Total added assets: 234998 bytes.
No database migration, store, prices or currency changes are required.

Artwork was generated with the built-in image generation tool, using the approved
six-frame contact sheet as reference. Shared prompt: reproduce one isolated square
fantasy avatar border from the reference, front view, chamfered square opening,
true alpha transparency inside and outside, readable at 56 px, no text or avatar.
Material prompts:

- Bronze: reddish copper-bronze, forged bevels, rivets and corner engravings.
- Silver: polished neutral silver, swirling corner engravings and metal studs.
- Gold: rich yellow gold with ornamental laurel leaves and diamond-shaped studs.
- Platinum: luminous white metal, angular plates and restrained icy blue inlays.
- Diamond: pale silver with faceted cyan crystals at corners and edge centers.
- Legend: gold, violet-blue gems, crown and restrained side wings.

The generated PNG originals remain in the Codex generated-image library. WebP
exports preserve alpha, use quality 88 at 384 px and quality 84 at 96 px.

Validation: `node tools/check-rank-frames-ui.cjs` checks all six unlocks, retained
equipped identity, decoded full and thumbnail assets, removed CSS borders, and
Spanish/English/Portuguese rendering. Screenshots are written outside the repository.
Also run the existing unit suite, Friends UI checks and incremental cache checks.

Prepared for public release v366. Bump the public release and cache
version together when publication is authorized; regenerate the cache manifest
after any subsequent runtime edit.
