# Publishing cached game resources

The Service Worker installs immutable resources using generated SHA-256 hashes.
After changing any resource in `CORE_ASSETS`, run:

```
node tools/build-cache-manifest.cjs
node tools/build-cache-manifest.cjs --check
```

Run these after all runtime edits and before committing or publishing. Hashes
follow Git's published bytes, including line-ending normalization. Do not edit
the generated manifest in `sw.js` manually. Bump `CACHE_NAME` for a release;
unchanged files keep their individual hashes and stay where they are cached.

Keep `tools/cache-legacy-v347.json` unchanged. It is the migration baseline for
previously installed releases, not a manifest to regenerate with new files.

For Service Worker changes, verify `tests/pwa-incremental-cache.test.cjs`,
`tests/media-offline-ranges.test.cjs`, and `tools/check-incremental-update.cjs`.
Preserve the active release until installation has completed. Never copy all
existing audio or images to a new release cache, or delete a cache still used
by the installed resource reference map.
