# Pinned Astro Solid 2 packages

The docs import `@astrojs/solid-js` built from the official
[Solid 2 PR #17891](https://github.com/withastro/astro/pull/17891). The old
`@solid-ui/astro-solid2` package has been removed.

Checked on 2026-11-18. Published integration 7.1.6 and renderer 0.1.2 still require
Solid 1. The PR is open and targets Solid 2. Its head is pinned to
`bbf9faa205689d1cd86a0575a775c99d57785e42`, with base
`3ac5ad3ae05ddc461bcc7748f0c55fd6da056652`. Current main was compared at
`c7a2f1d16a08bab8c9e2d380e0991fb22a5bafc1`.

The docs, test runtime, signals and both compiler backends use Solid 2.0.1.
The Vite plugin is 3.0.1. UI SDK Core and Solid are 0.1.0-beta.17, whose Solid
peer range includes 2.0.1. Solid and UI SDK runtime code is used as published.

## Source and packaging

- [PR integration source](https://github.com/withastro/astro/tree/bbf9faa205689d1cd86a0575a775c99d57785e42/packages/integrations/solid)
- [PR renderer source and tests](https://github.com/withastro/astro/tree/bbf9faa205689d1cd86a0575a775c99d57785e42/packages/renderers/solid-js)
- [Astro component and slot tests](https://github.com/withastro/astro/tree/bbf9faa205689d1cd86a0575a775c99d57785e42/packages/astro/test)

`upstream/` contains unchanged MIT-licensed PR package inputs. `revision.json`
records their SHA-256 hashes. `pnpm astro:build` transpiles the source with pinned
TypeScript 6.0.3, emits declarations, and creates deterministic tarballs with normalized timestamps, line endings and gzip OS headers. It follows
upstream's `build:ci` transpilation approach; project consumption is typechecked by
`pnpm check`. `pnpm astro:check` verifies source hashes and rebuilds the archives in
memory, requiring identical bytes. This check is part of `pnpm validate`.

Packaging replaces workspace dependency references with exact published versions,
sets local PR versions, and omits monorepo build scripts and development dependencies.
Runtime source is unchanged in the archives. The integration is
`8.0.0-pr.17891.bbf9faa`; the renderer is `0.2.0-pr.17891.bbf9faa`. These are local
versions, not official npm releases. A root pnpm override connects the two archives.
Patching the published integration alone would retain its Solid 1 dependency graph.

## Necessary differences

The unmodified PR was built and tested first. Its browser baseline passed 10 of 12
tests; both dev and production replaced SDK server DOM during hydration. The client
slot unit regression also failed. The separate
[renderer pnpm patch](../../patches/@astrojs__solid-js-renderer@0.2.0-pr.17891.bbf9faa.patch)
contains the client fixes below. A separate integration patch fixes bootstrap ordering:

- Sequence island startup and reset `globalThis._$HY.done` before hydrating each island. Solid 2.0.1 can leave
  it true after an earlier root finishes, causing later SDK parts to allocate client
  IDs and recreate their server nodes. The browser tests compare node identity for
  counters, Dialog and Combobox before and after hydration. A further test with lazy CSS
  and slotted client-only content reproduced a race even with the flag reset. Startup
  waits for the root to actually render, then uses public `onHydrationEnd` and waits
  a microtask and one timer for Solid's registry cleanup. This also prevents a client-only root from
  mounting during another root's deferred module preload. Queued unmounts cancel startup.
- Initialize hydration in the document head through Astro's `head-inline` hook. The
  Label docs regression reproduced serialized `_$HY.r` data before Astro's normal
  bootstrap, throwing `_$HY is not defined`. The separate
  [integration patch](../../patches/@astrojs__solid-js@8.0.0-pr.17891.bbf9faa.patch)
  uses Solid's idempotent bootstrap. It applies to pages using this integration,
  including static pages. A structural test requires the bootstrap to precede all data.
- Normalize client slot names using the same rule as the upstream server, including
  `named-slot` and `named_slot`. Client-only islands otherwise lose camelCase slot
  props. Unit and real Astro fixture tests cover default and named slots.

The previous adapter's extra Loading wrapper, asset resolver,
remount cache changes and devtools option are removed. The PR owns
SSR buffering, lazy asset manifests, CSS deduplication, renderer detection, request
events and client cleanup. The docs exclude `@ui-sdk/core` from dependency
prebundling as required by the SDK installation guide.

Experimental server functions and server components remain disabled. They are
upstream code, but this static docs project does not exercise them. The PR currently
emits an Astro request-header warning during prerendering; static output and browser
behavior are tested. No Astro core patch is needed because our tsconfig already
sets `jsxImportSource` to `@solidjs/web`.

## Verification and replacement

Tests adapt upstream `renderer.test.ts`, `solid-component.test.ts` and
`slots-solid.test.ts` contracts. They cover renderer identity, per-request IDs,
Proxy-safe cached probes, foreign component rejection, escaped slots, static output,
lazy SSR and CSS delivery, handled and unhandled errors, fallback replacement,
prop reconciliation, unmount cleanup, and independent island hydration. Browser
tests exercise UI SDK controls in Astro dev and production, then every component
docs page. Console errors and hydration errors fail the suite. The dev fixture disables
Astro's development toolbar and uses one browser worker to avoid exhausting Chromium
with concurrent requests for the unbundled SDK graph. Production and docs use four
local workers (two on CI). The fixture tests run in `pnpm validate:full`; the fast
loop's smoke tests cover the adapter through the production docs build.

To update the PR pin, fetch its integration and renderer source at one commit,
refresh the file hashes and package metadata in `revision.json`, rebuild, reinstall,
and run `pnpm validate`. Reproduce each client regression against unpatched packages
before retaining its patch. Keep the raw inputs unchanged.

When official Solid 2 packages ship, replace the docs file dependency and renderer
override with those releases, remove this vendor directory and the renderer patch,
and run the same contract tests. Retain any patch only if its regression still fails.
