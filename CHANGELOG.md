# 2026-11-19

Aligned 65 component docs and 435 preview placements with the pinned shadcn Radix
catalog. The registry contains 63 UI components and 442 examples. Date Picker
composes Calendar and Popover. Toast uses the SDK toast queue.

The docs define the Solid colors in the shared light and dark tokens.
The header uses the Solid UI favicon. Browser coverage
checks the colors of the page and preview buttons before hydration.

# 2026-11-18

Updated Solid, its web runtime, signals and compiler backends to 2.0.1, the Vite
plugin to 3.0.1, and UI SDK Core and Solid to beta.10. Replaced the private Astro
adapter with reproducible packages built from official PR #17891 at `bbf9faa`.
Source hashes and archive reproduction are checked during validation.

Tested the unmodified PR first. Added a separate pnpm renderer patch for two
reproduced client regressions: later islands recreating SDK server DOM after an
earlier hydration pass, and client-only named slots not matching server slot
normalization. Kept only the reproduced startup sequencing fix, using the public hydration hook.
Removed the extra Loading wrapper, custom asset
resolver. The Label docs regression also requires a head bootstrap so serialized
lazy data cannot run before Solid initializes hydration. Contract tests now target the upstream packages,
including SSR errors, Proxy components, lazy CSS and real Astro slot handling.

# 2026-11-17

Added the docs sidebar, header, responsive navigation, and active page contents. Style and light/dark choices persist across docs pages and iframe previews. Registry source and copy buttons follow the selected style. Added the pinned Sera and Rhea inputs; the selector follows shadcn order. Switch thumbs preserve upstream corner shapes and align in both directions, including Sera's one-pixel inset.

Added 17 supported component families and 27 examples, bringing the registry to 65 components and 311 examples. Native SDK behavior replaces the React-only engines for calendar, date picker, carousel, drawer, OTP, resizable panels, scroll area, notifications, and message following. Added chat presentation, code blocks, trace, and questionnaire components with registry metadata and documentation. Charts remain excluded because the upstream implementation needs Recharts.

Migrated the registered components and examples from Kobalte to UI SDK beta.6.
The docs, Astro adapter, signals, and both compiler backends now target Solid
2.0.0-rc.14. Updated Astro to 7.4.12, Vite to 8.3.8, MDX to 8.1.6, the Markdown
processor to 7.3.9, and Tailwind to 4.3.5. Release-age exceptions for UI SDK, Astro,
and Solid are scoped in the workspace configuration.

Compared the private adapter with Astro upstream and recorded the revision and
Solid 2 differences in its README. Added dependency discovery, escaped and
normalized slots, prop-update and cleanup regressions, queued-unmount cancellation,
and serialized hydration startup. The head bootstrap precedes Solid 2 lazy data.
Browser tests check DOM reuse, interactions, dev and production builds, and every
component docs page. Registry metadata and manual source instructions include the
shared helpers. Updated the six themes for UI SDK states and CSS variables.

Astro still has no published Solid 2 integration. Lucide still targets Solid 1,
so its existing patch remains. TypeScript stays on 6.0.3 during this runtime
migration. The initial migration identified seven unported components and their SDK replacements.
The subsequent ports above leave Chart as the remaining module.

# 2026-10-19

Updated the project toolchain to pnpm 12 and a pinned Node.js 24.22 runtime. Oxfmt now formats
Astro through its bundled Prettier plugin, and ESLint replaces Oxlint for TypeScript, Astro,
accessibility, SolidJS 2, and test linting. Updated Astro and its Markdown integrations,
the test tooling, and supporting documentation packages. Retained the original Solid rc.6 and
Kobalte alpha.2 versions without runtime modifications. Their published peer-version warnings remain visible.
Kept Kobalte and its primitives on one Solid instance in DOM tests. Compile the lazy preview
fixture during test collection so its render timeout
measures rendering. The regular preview test also checks that its button renders on the server.
Replaced the legacy Vite wrapper with `@solidjs/vite-plugin` so the compiler matches the Solid runtime.
The Astro/test toolchain pins both compiler backends to rc.6. Solid and Kobalte are consumed without
runtime patches or runtime dependency overrides.
The private Astro renderer forwards Solid streaming errors so failed previews fail the build.
Added coverage for real preview SSR, dialog dismissal, pointer blocking, and unmount cleanup.
Validation passes formatting, linting, type checks, SSR tests, and the 52-page production build.
The dialog regression test still fails. Production Chrome confirms missing modal pointer blocking
and Escape dismissal for dialogs and dropdown menus with the retained runtime versions.
Combobox suggestions also trigger a client hydration mismatch, despite correct SSR markup.

## Affected files

- `package.json`, `pnpm-workspace.yaml`, and `pnpm-lock.yaml`
- `apps/docs/package.json` and `packages/astro-solid2/package.json`
- `eslint.config.mjs`, `oxfmt.config.ts`, `.gitattributes`, and `.vscode/*`
- `README.md` and `packages/astro-solid2/README.md`
- `vitest.dom.config.ts` and the Solid preview, component, and example sources
- `patches/README.md` and the SSR and Dialog regression tests

# 2026-09-11

Kept Combobox and Command keyboard highlighting synchronized with filtered collections, so the
replacement first result remains announced and selectable when filtering removes the previous
focus. Added DOM coverage for active-descendant state, Enter activation, and closing behavior.

## Affected files

- `apps/docs/src/registry/ui/{combobox,command}.tsx`
- `apps/docs/src/registry/ui/auto-highlight.test.tsx`

# 2026-09-11

Added registry-backed component documentation with live and isolated previews, consumer-ready source
views, component navigation, and interactive MDX widgets for tabs, accordions, callouts, steps, code,
images, and the registry directory. Extended the Solid 2 Astro renderer to resolve lazy preview assets and added broad rendering, navigation, source-transformation, and interaction coverage.

## Affected files

- `README.md`
- `apps/docs/public/images/*.png`
- `apps/docs/src/components/**/*.astro`
- `apps/docs/src/components/registry-preview.tsx`
- `apps/docs/src/content/docs/**/*.mdx`
- `apps/docs/src/layouts/*.astro`
- `apps/docs/src/lib/*.{ts,test.ts}`
- `apps/docs/src/pages/{docs,view}/**/*.astro`
- `apps/docs/src/registry/examples/{_registry,button-interactive,button-rtl}.tsx`
- `apps/docs/src/registry/{index,schema}.ts`
- `packages/astro-solid2/src/{index,server,server.test}.ts`
- `patches/lucide-solid@1.41.0.patch`

# 2026-09-08

Ported all 283 examples supported by the current UI registry, registered them with the docs app, and migrated their SolidJS, Kobalte, DOM, and icon usage to the 2.x-compatible APIs. Added a dependency-grouped compatibility checklist for the seven blocked components and their 50 remaining examples.

## Affected files

- `apps/docs/src/registry/examples/_registry.ts`
- `apps/docs/src/registry/examples/*.tsx`
- `apps/docs/src/registry/index.ts`
- `TODO.md`

# 2026-09-07

Preserved exact command and highlighted code-block markup to prevent formatting and hydration differences in the docs. Added a hydrated registry button to the MDX component showcase and updated Kobalte to the compatible alpha release.

## Affected files

- `apps/docs/src/components/code-block-command.astro`
- `apps/docs/src/components/docs/pre.astro`
- `apps/docs/src/components/test-button.tsx`
- `apps/docs/src/content/docs/mdx-components.mdx`

# 2026-09-07

Added the initial Solid UI component registry with schemas, dependency metadata, shared utilities, a responsive mobile hook, and a broad set of Kobalte-based UI components. Updated the docs workspace to consume the registry through the new source alias, added Solid 2 compatibility adjustments for Lucide icons, and standardized TypeScript and Astro formatting across the repository.

## Affected files

- `apps/docs/src/components/**/*.astro`
- `apps/docs/src/components/mdx-components.ts`
- `apps/docs/src/content.config.ts`
- `apps/docs/src/content/docs/mdx-components.mdx`
- `apps/docs/src/layouts/docs-layout.astro`
- `apps/docs/src/lib/*.ts`
- `apps/docs/src/pages/docs/[...slug].astro`
- `apps/docs/src/registry/hooks/*.ts`
- `apps/docs/src/registry/lib/*.ts`
- `apps/docs/src/registry/ui/*.tsx`
- `apps/docs/src/registry/index.ts`
- `apps/docs/src/registry/schema.ts`
- `packages/astro-solid2/src/*.ts`

# 2026-09-07

Removed the end-to-end suite and the counter fixtures now that the Astro Solid 2 integration is stable. Replaced the hydration playground at the root route with a minimal Hello World page.

## Affected files

- `apps/docs/src/components/client-*-counter.tsx`
- `apps/docs/src/components/client-*-counter.test.tsx`
- `apps/docs/src/components/server-counter.tsx`
- `apps/docs/src/components/server-counter.test.tsx`
- `apps/docs/src/pages/index.astro`
- `tests/e2e/hydration.spec.ts`
- `tests/e2e/mdx-components.spec.ts`

# 2026-09-07

Modernized documentation code-block copying around the Clipboard API, centralized regular copy-button initialization, and added temporary success and failure logging until toast notifications are available. Improved multiple-block behavior with isolated copy feedback and synchronized package-manager tabs, and moved command-block detection to the surrounding `pre` element through a Rehype metadata pass so the generated HTML remains valid.

## Affected files

- `apps/docs/astro.config.ts`
- `apps/docs/src/components/code-block-command.astro`
- `apps/docs/src/components/copy-button.astro`
- `apps/docs/src/components/docs/code.astro`
- `apps/docs/src/components/docs/pre.astro`
- `apps/docs/src/content/docs/mdx-components.mdx`
- `apps/docs/src/layouts/docs-layout.astro`
- `apps/docs/src/lib/clipboard.ts`
- `apps/docs/src/lib/command-metadata.ts`
- `apps/docs/src/lib/copy-buttons.ts`
- `tests/e2e/mdx-components.spec.ts`

# 2026-09-04

Added an MDX-powered documentation route with custom prose components, syntax highlighting, copy controls, and accessible package-manager command tabs. Expanded the docs design foundation with multiple themes and typography tokens, refreshed the Astro/Solid playground, normalized component filenames, and added end-to-end coverage for the new experience.

## Affected files

- `apps/docs/astro.config.ts`
- `apps/docs/src/components/client-*-counter.tsx`
- `apps/docs/src/components/client-*-counter.test.tsx`
- `apps/docs/src/components/server-counter.tsx`
- `apps/docs/src/components/server-counter.test.tsx`
- `apps/docs/src/components/code-block-command.astro`
- `apps/docs/src/components/copy-button.astro`
- `apps/docs/src/components/docs/*.astro`
- `apps/docs/src/components/mdx-components.ts`
- `apps/docs/src/content.config.ts`
- `apps/docs/src/content/docs/mdx-components.mdx`
- `apps/docs/src/layouts/docs-layout.astro`
- `apps/docs/src/lib/highlight-code.ts`
- `apps/docs/src/lib/utils.ts`
- `apps/docs/src/pages/docs/[...slug].astro`
- `apps/docs/src/pages/index.astro`
- `apps/docs/src/styles/global.css`
- `apps/docs/src/registry/styles/*.css`
- `playwright.config.ts`
- `tests/e2e/mdx-components.spec.ts`
