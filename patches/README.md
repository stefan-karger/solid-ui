# Compatibility patches

Solid, UI SDK, and other dependencies with official Solid 2 support must be used as published.
Do not require consumers to patch their runtimes or override runtime dependencies. Keep necessary Astro integration fixes as explicit patches to the pinned upstream PR packages,
with regression tests.

## Astro Solid 2 PR renderer

`@astrojs/solid-js-renderer@0.2.0-pr.17891.bbf9faa` is built from the official PR.
Its patch sequences startup through Solid's public hydration hook, resets the
hydration completion flag for each island, and normalizes
client slot names to match the server. Both have failing regression evidence from
the unmodified PR. See [the pinned source and replacement process](../vendor/astro-solid/README.md).

The integration patch for `@astrojs/solid-js@8.0.0-pr.17891.bbf9faa` adds an
idempotent head bootstrap. The Label docs page otherwise executes serialized
lazy data before Astro's normal renderer bootstrap.

## `lucide-solid@1.41.0`

Ports the Solid 1 implementation and JSX types to the Solid 2 APIs used by this registry. Astro
compiles the package's JSX source through the alias in `apps/docs/astro.config.ts`.

Lucide needs this compatibility port because it does not yet publish a Solid 2 version. Remove this patch when
an official Solid 2 implementation is available.
