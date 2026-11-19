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
composition and explicit collection children. Keep upstream theme inputs in
`vendor/shadcn` unchanged; run `pnpm themes:generate` after changing the SDK mapping
or pinned inputs. The docs and installed registry source use the generated themes.

Whenever changing the Solid 2 Astro adapter, compare its implementation and tests
with Astro's official integration and renderer:

- https://github.com/withastro/astro/tree/main/packages/integrations/solid
- https://github.com/withastro/astro/tree/main/packages/renderers/solid-js
- https://github.com/withastro/astro/tree/main/packages/astro/test

Record the upstream revision and intentional Solid 2 differences in `vendor/astro-solid/README.md`. Add a failing regression test before fixing adapter behavior. Run
`pnpm validate` before handing back the change.
