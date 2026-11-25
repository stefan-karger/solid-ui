<p align="center">
 <img align="center" src="apps/docs/public/web-app-manifest-192x192.png" height="96" />
 <h1 align="center">
  Solid UI
 </h1>
</p>

An unofficial port of [shadcn/ui](https://github.com/shadcn-ui/ui) to [Solid](https://www.solidjs.com/).

Accessible and customizable components that you can copy and paste into your apps. Free. Open Source. **Use this to build your own component library**.

Visit https://www.solid-ui.com to view the documentation.

## Version 2

Version 2 rebuilds Solid UI's copy-and-own component registry and documentation
around SolidJS 2, [UI SDK](https://ui-sdk.dev), Astro, and Tailwind CSS 4.
The docs use reproducible local builds of Astro's official Solid 2 pull request until those
packages are published. Version 1 (Solid 1, Kobalte, SolidStart docs) is available at the
[`v1-final`](https://github.com/stefan-karger/solid-ui/tree/v1-final) tag.

> [!WARNING]
> Version 2 currently depends on beta and patched packages and should not yet be treated as
> a stable production release.

## Goal

The goal is to:

- Port the Solid UI component registry and examples to SolidJS 2-compatible APIs.
- Provide an Astro-powered documentation site with statically rendered, progressively hydrated
  component previews.
- Expose consumer-ready component source that can be copied directly or installed through the
  Solid UI CLI.
- Complete the remaining components as their ecosystem dependencies add SolidJS 2 support.
- Switch the pinned Astro PR packages to published releases once Solid 2 support ships.

The Astro compatibility package is migration infrastructure, not part of the intended product.

## Current status

At the current migration snapshot:

- 63 UI components are registered.
- 442 component examples are registered.
- Registry-backed live previews and source-code displays are implemented.
- Preview markup is rendered during the static Astro build and hydrated when it approaches the
  viewport.
- Docs include sidebar and mobile navigation, page contents, and persistent light/dark and style controls.
- The docs and previews use shared Solid color tokens.
- Eight styles are available: Vega, Nova, Maia, Lyra, Mira, Luma, Sera, and Rhea.
- Supported component families include messages, attachments, bubbles, traces, code blocks, questionnaires, and native SDK scrolling and notifications.
- Chart and Data Table still need Solid 2-compatible implementations.

See [TODO.md](./TODO.md) for the dependency-grouped compatibility backlog and
[CHANGELOG.md](./CHANGELOG.md) for recent progress.

### Compatibility constraints

- The docs and tests pin `solid-js`, `@solidjs/web`, and `@solidjs/signals` to `2.0.1`.
- UI SDK Solid and Core are pinned to `0.1.0-beta.17`. Kobalte and Corvu are not runtime dependencies.
- The official `@solidjs/vite-plugin@3.0.1` uses both compiler backends at `2.0.1`.
- Astro is pinned to 7.4.12, Vite to 8.3.8, MDX to 8.1.6, and Tailwind to 4.3.5.
- Published Astro Solid packages still require Solid 1. The docs use PR #17891 at `bbf9faa`, with tested client fixes and an early hydration bootstrap. See [provenance and replacement steps](./vendor/astro-solid/README.md).
- UI SDK Core stays out of Vite dependency prebundling to preserve shared behavior identity.
- UI SDK popups use the browser top layer. Themes use its state attributes and CSS variables. Declare `@layer ui-sdk;` before Tailwind in consumer stylesheets too.
- Icons are inlined as SVG from Lucide, whose Solid package still targets Solid 1. Solid and UI SDK use their published runtime code.
- The docs build a static site. No deployment SSR adapter is configured.
- Solid Devtools remain optional and unvalidated with Solid 2.
- Oxfmt owns formatting. ESLint checks TypeScript, Astro, accessibility, Solid 2, and tests.

### Interaction regression coverage

Tests cover dialog Escape and close-button dismissal, focus restoration, menus, keyboard tabs, Combobox, and Select. Adapter tests cover SSR, async failures, lazy components, slot normalization and escaping, unique island IDs, client-only fallbacks, prop reconciliation, and unmount cleanup. Playwright tests run against Astro dev and a production fixture. Hydration errors and browser console errors fail the suite.

## Repository structure

| Path                              | Purpose                                           |
| --------------------------------- | ------------------------------------------------- |
| `apps/docs`                       | Astro documentation site and component registry   |
| `packages/cli`                    | The `solidui-cli` package                         |
| `apps/docs/src/registry/ui`       | Solid UI component implementations                |
| `apps/docs/src/registry/examples` | Live component examples                           |
| `apps/docs/src/content/docs`      | MDX component documentation                       |
| `vendor/astro-solid`              | Pinned official Astro Solid 2 source and packages |
| `patches`                         | Temporary dependency compatibility patches        |
| `TODO.md`                         | Components blocked on SolidJS 2 ecosystem support |
| `.changeset`                      | Pending release notes for the docs and CLI        |

## Development

### Requirements

- Node.js 24.22.0
- pnpm 12.14.0

The root `package.json` pins both tools. `pnpm install` downloads the pinned Node.js runtime,
and repository scripts use it even when the machine's default Node.js version differs.
Check the project runtime with `pnpm exec node --version` and the package manager with
`pnpm --version`.

On another computer, install pnpm 12.14.0 or update an existing installation with
`pnpm self-update 12.14.0`, then run the setup commands below. A system-wide Node.js update
on Windows may require an administrator; the project runtime does not.

### Setup

```bash
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

The development command starts the Astro documentation application.

### Verification

Run the fast validation while working and the full validation before submitting changes:

```bash
pnpm validate
pnpm validate:full
```

Both verify upstream source hashes and reproducible Astro archives and check formatting, linting, TypeScript/Astro diagnostics, unit and SSR tests and the production builds in parallel. `pnpm validate` then runs the browser tests tagged `@smoke`; `pnpm validate:full` runs every browser test in dev and production mode. CI runs the fast validation on every pull request push and the full browser suite on `main`, on manual runs and on pull requests labeled `full-ci`.

Oxfmt owns formatting, import ordering, package.json ordering, and Tailwind class sorting.
ESLint owns linting. The recommended VS Code extensions use the same tools, including for
Astro files. Repository text files use LF line endings on every platform.

Individual commands are also available:

```bash
pnpm format:check
pnpm lint
pnpm check
pnpm test
pnpm test:watch
pnpm test:adapter
pnpm test:e2e
pnpm build
```

## Releases

The docs and `solidui-cli` are versioned with [Changesets](https://github.com/changesets/changesets).
Add a changeset with `pnpm changeset` for every user-facing change. On `main`, the release
workflow opens a version pull request and publishes the CLI once it is merged.

## Contributing to the migration

SDK imports use named aliases such as `Dialog as SdkDialog`, and components compose
the SDK parts directly. Collection examples render explicit items and groups.
Edit the theme CSS in `apps/docs/src/registry/styles`. The docs and registry
source exporter share these files. See [REGISTRY.md](./REGISTRY.md) for theme
maintenance, SDK conventions, and source export.

When adding or updating a registry component:

1. Match the existing registry metadata and source conventions.
2. Port its representative examples alongside the component.
3. Use SolidJS 2-compatible APIs and dependencies.
4. Add or update its MDX documentation.
5. Run `pnpm validate`.

For blocked components, confirm the dependency's current version and peer dependencies using the
checks documented in [TODO.md](./TODO.md) before beginning a port.

## Temporary Astro integration

The docs import `@astrojs/solid-js` from reproducible archives built from the official
[Solid 2 PR](https://github.com/withastro/astro/pull/17891). The former private adapter
has been removed. The raw upstream source stays unchanged; pnpm applies the small
client regression patch separately.

See [vendor/astro-solid/README.md](./vendor/astro-solid/README.md) for the pinned commit,
packaging process, test coverage, and steps to switch to published packages.

## License

Published under the [MIT license](LICENSE). Built by [@stefan-karger](https://github.com/stefan-karger), [@michaelessiet](https://github.com/michaelessiet) & [community](https://github.com/stefan-karger/solid-ui/graphs/contributors).

<a href="https://github.com/stefan-karger/solid-ui/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=stefan-karger/solid-ui" />
</a>
