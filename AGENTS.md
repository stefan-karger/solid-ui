# Project instructions

Before using UI SDK, follow the ui-sdk skill if installed and read
`apps/docs/node_modules/@ui-sdk/solid/docs/llms.txt`. Read the relevant component
pages under `docs/components`. For a new primitive, search `docs/core.md` by heading
and read `docs/rendering.md`.

Keep `solid-js`, `@solidjs/web`, the signals package, and both compiler backends at
`2.0.1`. The docs and pinned upstream Astro packages must use the same versions.
Build the Astro PR packages with `pnpm astro:build`; `pnpm astro:check` verifies
the source hashes and reproducible archives. See `vendor/astro-solid/README.md`.

Import SDK parts by name, aliasing each as `SdkXxx`. Compose them directly rather
than introducing namespace imports or `Primitive.Root` maps. Use SDK `render` for
composition and explicit collection children. Edit the theme CSS directly in
`apps/docs/src/registry/styles`. The docs and registry source export both use
these styles. Shared Tailwind utilities live in
`apps/docs/src/registry/lib/style-utilities.css`.

Whenever changing the Solid 2 Astro adapter, compare its implementation and tests
with Astro's official integration and renderer:

- https://github.com/withastro/astro/tree/main/packages/integrations/solid
- https://github.com/withastro/astro/tree/main/packages/renderers/solid-js
- https://github.com/withastro/astro/tree/main/packages/astro/test

Record the upstream revision and intentional Solid 2 differences in `vendor/astro-solid/README.md`. Add a failing regression test before fixing adapter behavior. Run
`pnpm validate:full` before handing back an adapter change.

## Validation

`pnpm validate` is the fast loop (about a minute): Astro hashes, format, lint, types,
unit tests and builds run in parallel, then the browser tests tagged `@smoke`. Run it
after each step. Run a single browser spec with `pnpm test:e2e tests/<name>.spec.ts`
after a build. Run `pnpm validate:full`, which adds every browser test (about seven
minutes), once at the end of a plan, a larger task or a loop, and before handing back
changes to the adapter, the themes or shared docs rendering. Tag a browser test
`@smoke` in its title only when it guards a core path in a few seconds.
