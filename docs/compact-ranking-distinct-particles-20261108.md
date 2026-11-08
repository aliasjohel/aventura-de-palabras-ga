# Compact leaderboard and distinct particle themes (v407)

## Leaderboard

Replace large per-player cards with 54px profile buttons showing position, small
rank insignia, alias, rank/division and points. Detailed titles, progress and
statistics remain in the public profile reached by clicking the whole row.
Keep the caller's own row in a sticky header with the close control, even when
the position is outside the top 50. Rules and the medal catalog are collapsible.
The list uses the dialog's scroll container rather than a second nested scroller.

The existing API was already bounded, but `position <= 50 ... limit 51` could
exclude the caller when many players tied. Choose exactly 50 leaders in a
deterministic order, then append the caller when absent. An additive `listed`
flag distinguishes this extra row from the leader list. Scores, rank ties,
existing fields and RPC permissions are unchanged. Installation checked that
profile and ranked-result fingerprints were preserved and recorded migration
`20261108161938_compact_ranking_guaranteed_own_position` atomically.

## Frames

Remove the added image brightness/saturation/glow filter, masked sheen and edge
glints. Keep the original image colors and existing base rendering. Only the
surrounding particles animate:

- Conquistador: short metallic sparks.
- Platino: falling snowflakes.
- Diamante: rotating faceted ice shards.
- Fuego: rising small flames/embers.
- Maestro: flickering arcane lightning bolts.
- Torre Leyenda: larger inferno flames.
- Rango Leyenda: gold comets with tails.
- Códice: rotating boxed runes.
- Infinito: small celestial bodies with rings and curved orbital paths.

Tier still controls particle count. Featured/hovered views animate; small
thumbnails have no particle layers. Background pausing and reduced motion remain.
No artwork was regenerated.

## Validation

- Real PostgreSQL with 1,000 synthetic players: correct own position 800,
  exactly 50 leaders plus the caller, no duplicate caller inside top 50,
  unranked caller, 1,000 tied players and anonymous rejection.
- Hosted rollback rehearsal: response bounds and caller's true global position.
- Browser: four viewports (320, 390, 844 and 1365px), row height, sticky caller,
  own/other profile clicks, bounded list, translations and empty/offline states.
- Particle browser checks: nine different animation names, movement directions,
  no overlaid sheen/glints or image brightness/saturation/blur, reduced motion.
- Desktop/mobile screenshots inspected; 28 focused unit tests passed.
- Existing shop purchase browser regression and required PWA cache checks run.

```
node tools/tower-rewards-qa/check-compact-ranking.cjs
node tools/tower-rewards-qa/check-compact-ranking-postgres.cjs
node tools/tower-rewards-qa/check-frame-effects.cjs
```
