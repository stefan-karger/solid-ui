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
