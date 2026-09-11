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
