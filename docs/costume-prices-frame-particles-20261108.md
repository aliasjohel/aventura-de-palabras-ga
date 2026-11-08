# Outfit prices, character prerequisites and floating frame particles (v406)

## Shop

Public outfit prices are now:

- 1,000: Aren Bosque, Guardiana Otoño, Lume Lunar, Lobo Lunar, Nimbus Aviador.
- 1,500: Zafir Celestial, Kairós Real, Shadow Carmesí, Nivor Boreal,
  Azrak Eclipse, Kálamo Astral.

The preview shows the required character beside the disabled purchase button.
Character inventory synchronization now includes an additive `unlocked` field,
derived from verified adventure completions and purchased character inventory.
It remains scoped to the signed-in account. The shop updates immediately when
that inventory changes. A local story-completion flag cannot authorize a purchase.

Server migration `20261108152506_costume_prices_and_character_ownership` updates
only the two existing private functions. Purchase checks reuse the server's
existing verified-character rule. Existing outfit ownership stays idempotent,
wallet locks prevent duplicate charges, and public/private RPC permissions are
unchanged. No existing balances, collections or verified completions changed
during installation; a repeatable-read transaction checked their fingerprints.
The migration was recorded atomically with the function changes.

## Frames

Important frames now emit five, seven or nine particles depending on tier.
Particles leave the artwork edge, drift up/outward and fade. Platino/Diamante
emit ice crystals, Fuego/Tower Leyenda emit embers, and other prestige frames
emit matching gold/violet motes. Existing art, sheen and edge glints remain.
Only featured menu/profile avatars and hovered/focused choices animate;
miniatures contain no particle layers. Background tabs pause animations and
reduced-motion preferences disable particles. Movement uses CSS transforms and
opacity, without image generation, new image downloads or a JavaScript frame loop.

## Verification

- 33 shop, wallet, character-inventory and localization unit cases passed.
- 80 Tower outfit, cinematic-loading and account-readiness regression cases passed.
- Isolated real PostgreSQL: all 11 exact prices, unavailable-character rejection
  without debit, paid/story unlocks, insufficient funds, repeated and concurrent
  purchases, and preserved pre-existing rows/permissions passed.
- Hosted rollback rehearsal and post-install checks: 10 missing-character
  rejections, six exact prices and repeated purchases (Aren plus five purchased
  characters), six verified unlocks, and zero persisted synthetic rows. These
  checks do not fabricate verified story evidence in the hosted database.
- Security advisor baseline stayed at 24 existing notices, with no new notices.
- Browser shop checks: prices, visible prerequisite, enable after paid/story
  unlock, one charge, account isolation, three languages and mobile width.
- Browser frame checks: particle counts, actual outward/upward displacement,
  reduced motion and inspected desktop/mobile screenshots.

```
node tools/tower-rewards-qa/check-costume-prices-postgres.cjs
node tools/tower-rewards-qa/check-costume-prices-browser.cjs
node tools/tower-rewards-qa/check-frame-effects.cjs
```
