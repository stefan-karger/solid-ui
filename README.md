# solid-ui-next

The experimental Solid 2 foundation for [solid-ui.com](https://www.solid-ui.com/). This monorepo
proves that Astro 7 can server-render and hydrate Solid 2 components while producing a fully static
site.

## Status

Solid 2 is release candidate software. APIs, behavior, and dependencies may still change or contain
bugs. The Astro integration here is a local
compatibility port and is not intended to be published or maintained as an Astro fork.

## Requirements

- Node.js 24
- pnpm 11.13.1

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm check
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm test
pnpm test:watch
pnpm validate
```

## Architecture

- `apps/docs`: static Astro documentation site
- `packages/astro-solid2`: private Solid 2 compatibility port of Astro's renderer

## Known limitations

- Solid Devtools are not validated.
- There is no SSR adapter.
- Kobalte and Corvu are not included yet.
- Oxfmt skips `.astro` files.
- Oxlint only partially understands `.astro` files.
- Integration source is consumed directly from TypeScript.
- No attempt is made to track Astro upstream.

## Future official integration switch

When Astro officially supports Solid 2, manually replace the integration import:

```diff
-import solid from "@solid-ui/astro-solid2";
+import solid from "@astrojs/solid-js";
```

Replace the workspace dependency too:

```diff
-"@solid-ui/astro-solid2": "workspace:*"
+"@astrojs/solid-js": "<official Solid 2-compatible version>"
```
