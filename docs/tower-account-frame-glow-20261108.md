# Tower account readiness and frame effects (v403)

## Account readiness

Opening My profile initializes the online adapter and wallet, but Tower formerly
used whichever account state was already loaded. A cold session could therefore
start a practice fight even though the player's permanent session was stored.
A failed Tower status request also silently returned practice.

Tower now awaits the existing account connection before opening the floor list
and rechecks before combat. Account loading preserves the local opponent adapter.
Failures keep the player on selection/the floor list with a retry message, and
failed status requests return waiting rather than practice. Offline and developer
preview practice remain available. No server schema, account, rewards or payment
rules were changed. The read-only diagnosis showed three verified Guardiana
floors with one 30-coin receipt each and no new attempt from the reported practice
fight; unverified local play is not replayed to create a reward.

## Existing frame art

CSS adds a soft colored glow, an artwork-alpha-masked light sweep and four to six
small sparkles to Conquistador/Maestro/Leyenda, Platino/Diamante/Leyenda,
XP Codice/Infinito and the final-world Fuego frame. No image asset is replaced.
Higher tiers have more sparkles. Animation runs on the featured menu/profile
avatar and the hovered/focused frame choice; other choices keep a static glow.
Miniatures have no particle layers. Background tabs pause effects and reduced
motion disables sweeping/particles while keeping the static glow.

## Validation

- 86 account/wallet, Tower preview and cinematic unit cases passed.
- 11 interface localization checks passed after regenerating the stale Spanish
  fallback from the existing catalogs (the previous menu label was out of date).
- Browser account fixture: cold entry waits, starts by rewards without opening
  My profile, restores the local adapter, and does not start combat on failure.
- Browser frame fixture: nine effect frames, unchanged base frame, artwork mask,
  tier spark counts, reduced motion; desktop and mobile screenshots inspected.
- The older `offline-local-modes.test.cjs` still expects the removed legacy
  `claveRecompensasMonedasPendientes`; that assertion also fails on unchanged
  v402. It was not modified to restore obsolete client-side coin grants.

Browser regressions:

```
node tools/tower-rewards-qa/check-account-readiness.cjs
node tools/tower-rewards-qa/check-frame-effects.cjs
```
