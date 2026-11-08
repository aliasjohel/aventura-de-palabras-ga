# Restore Azrak's forced-key highlight (v405)

The authoritative Tower renderer showed the two-second keyboard fire effect and
copied the server's errors/used letters, but did not mark the actual forced key.
Local practice and normal multiplayer had separate presentation paths already.
The problem was shared by outfits rather than caused by the original artwork.

Read the existing player letter event immediately preceding an NPC forced-letter
impact to animate the exact key. Never infer a key from the NPC's private letters
or simulate an extra input. Keep the burn until the word changes, even after the
24-event rolling log discards the impact. Do not replay the animation on repeated
snapshots or carry the mark into the next word when the forced miss exhausts all
attempts. No damage, timing, server or payout logic changed.

Validation:

- Nine focused keyboard tests passed, including forced-letter selection, replay,
  event-log eviction, word changes, normal errors and local/practice behavior.
- Real browser fixture received a synthetic authoritative effect followed by
  the forced letter. Guardiana original, Otoño and Tower outfits all showed one
  burning disabled Q, one server-counted error and clearing on the next word.
- Inspected the mobile landscape screenshot with the original outfit.

```
node tools/tower-rewards-qa/check-azrak-forced-key.cjs
```
