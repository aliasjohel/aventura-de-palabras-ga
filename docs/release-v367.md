# v367 — Frame selector and forest profile preview

- Frame choices now render the frame alone, without a placeholder character.
  The selected avatar remains visible in the live profile preview.
- The own-profile header shows the forest/fireflies visual trial for everyone;
  there is no store, price, unlock or persisted background selection yet.
- New image: `assets/images/perfil/fondo-bosque-luciernagas-v1.webp`, 960×640,
  113406 bytes. Built-in image generation prompt: premium fantasy twilight forest,
  emerald/teal foliage, warm firefly accents, dark low-detail center for white
  profile text, no characters, lettering or UI. Exported as WebP quality 82.
- Eight decorative lights animate only transform/opacity. They pause when the
  profile closes or the document is hidden. Reduced-motion preference disables
  animation. No video, timers, purchases, database or wallet changes.
- Cache v367 and avatar CSS/script query versions updated; manifest regenerated.

Validation: complete Node suite; rank/frame/profile browser checks in es/en/pt-BR
including 320/390/844 px, reduced motion, background-tab/closed-dialog pause;
Friends browser checks; incremental PWA check; v366→v367 storage-preserving upgrade.
After deployment verify public hashes and profile rendering. Physical phones
still need visual, scrolling, suspension and smoothness checks.
