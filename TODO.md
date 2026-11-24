# Remaining registry work

The current registry has 63 components and 473 examples. Docs include responsive navigation, a page TOC, persistent light/dark mode, and eight styles. See [REGISTRY.md](./REGISTRY.md) for theme maintenance and SDK conventions.

Calendar, date picker, carousel, drawer, OTP, resizable panels, scroll area, and notifications now use UI SDK. The chat, attachment, code block, trace, and questionnaire families have examples, registry metadata, and docs.

Chart remains excluded. The upstream implementation uses React Recharts, and UI SDK has no chart engine. Select a Solid 2-compatible chart library before porting that component.

Data Table remains deferred. The upstream guide uses TanStack Table v9, whose Solid adapter targets Solid 1.

Further example coverage can add the remaining historical variants and optional product-specific chat integrations. The current examples exercise the exported components and their supported behavior. Do not add React, Kobalte, or Corvu compatibility layers for those variants.

## Solid 2 migration cleanup

Work through these items independently as official releases support the workspace's Solid 2 version. Keep the behavioral regression tests and run `pnpm validate` after each dependency change.

- [ ] **Astro integration and renderer.** Switch the docs to published Solid 2-compatible versions of `@astrojs/solid-js` and its renderer. Run the adapter tests against the published packages to see which hydration and slot fixes can be dropped. Remove the local archive dependency, renderer override, and superseded patches. Once the docs build from published packages, remove `vendor/astro-solid/`, `scripts/build-astro-solid.ts`, and the `astro:build` and `astro:check` scripts. Update the version test, validation command, and references in `AGENTS.md`, `README.md`, and `patches/README.md`. [Pinned adapter and regression checks](./vendor/astro-solid/README.md)
- [ ] **Solid runtime and compiler.** Keep `solid-js`, `@solidjs/web`, the signals package, and both compiler backends aligned across docs and tests. Drop the pnpm overrides once the supported runtime and Vite plugin resolve compatible versions themselves. Verify the lockfile and keep the version-alignment test.
- [ ] **Lucide in docs examples.** Installable items inline their icons, so only the docs examples import `lucide-solid`, through the local Solid 2 patch. Version 1.79.0 still requires Solid 1. When an official Solid 2 release builds and hydrates through its published entry point, switch the examples to it. Then remove the patch and its peer-range exception from `pnpm-workspace.yaml`. [Lucide patch](./patches/README.md#lucide-solid1410)
- [ ] **UI SDK and release-age exceptions.** Update `@ui-sdk/core` and `@ui-sdk/solid` together. Recheck the `@ui-sdk/core` Vite prebundling exclusion against the release's setup requirements and the dev hydration tests. Remove migration-only `minimumReleaseAgeExclude` entries as the selected versions meet the workspace's normal release-age policy.
- [ ] **Legacy CLI registry.** Once a supported CLI release installs directly from `/r/styles/<style>/` and support for old clients ends, remove the `public/registry/` compatibility output, its Git ignore and Turbo output entries, and its HTTP assertions. Keep the `/r/` registry and verify the replacement CLI against it. [Registry publishing](./REGISTRY.md#publishing-the-registry)
