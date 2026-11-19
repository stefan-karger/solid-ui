# Pinned shadcn inputs

The files in `styles` come unchanged from shadcn/ui at the revision in
`revision.json`, under `apps/v4/registry/styles`. SHA-256 hashes guard every input.
The upstream MIT license is in `LICENSE`.

The `delta-*.css` files are this project's Delta Bar extensions, retained from
its original themes. Sera uses the square extension and Rhea the compact rounded extension. They are not upstream shadcn styles.

To update, review a pinned upstream revision, replace all eight input files, update
the manifest hashes and revision, run `pnpm themes:generate`, then run
`pnpm validate`. The SDK mapping lives in
`apps/docs/src/lib/registry-theme.ts`; generated files live in
`apps/docs/src/registry/styles`. See `SHADCN_PARITY.md` for the comparison and
intentional SDK differences.

`tailwind.css` comes unchanged from `packages/shadcn/src/tailwind.css` at the same revision. The manifest also pins its checksum. The docs import the published `shadcn/tailwind.css` once in global CSS. `pnpm themes:check` verifies the installed stylesheet matches this reference. Generated Solid themes use explicit presence selectors where the SDK state differs from shadcn.
