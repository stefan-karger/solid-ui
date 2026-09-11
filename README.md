# solid-ui-next

The work-in-progress SolidJS 2 version of [Solid UI](https://www.solid-ui.com/).

This repository is rebuilding Solid UI's copy-and-own component registry and documentation
experience around SolidJS 2, Astro, Tailwind CSS, and Kobalte. It also contains a temporary local
Astro renderer used until Astro's official Solid integration supports the SolidJS 2 versions
targeted here.

> [!WARNING]
> This project is experimental. It currently depends on release-candidate, alpha, and patched
> packages and should not yet be treated as a stable production release.

## Goal

The goal is to:

- Port the Solid UI component registry and examples to SolidJS 2-compatible APIs.
- Provide an Astro-powered documentation site with statically rendered, progressively hydrated
  component previews.
- Expose consumer-ready component source that can be copied directly or installed through the
  Solid UI CLI.
- Complete the remaining components as their ecosystem dependencies add SolidJS 2 support.
- Remove the local Astro renderer once the official integration can replace it.

The Astro compatibility package is migration infrastructure, not part of the intended product.

## Current status

At the current migration snapshot:

- 48 UI components are registered.
- 284 component examples are registered.
- Registry-backed live previews and source-code displays are implemented.
- Preview markup is rendered during the static Astro build and hydrated when it approaches the
  viewport.
- The documentation foundation is working, but component documentation is still at an early
  stage.
- Seven components and 50 examples remain blocked by dependency compatibility.

See [TODO.md](./TODO.md) for the dependency-grouped compatibility backlog and
[CHANGELOG.md](./CHANGELOG.md) for recent progress.

### Compatibility constraints

- SolidJS and `@solidjs/web` are pinned to `2.0.0-rc.6`.
- Kobalte is available through its SolidJS 2-compatible alpha.
- Some Corvu integrations and other ecosystem packages remain blocked.
- Lucide Solid currently requires a local compatibility patch.
- The docs application currently produces a static site; no SSR deployment adapter is configured.
- Solid Devtools have not been validated.
- Astro files use Prettier because Oxfmt and Oxlint do not yet provide complete Astro support.

## Repository structure

| Path                              | Purpose                                           |
| --------------------------------- | ------------------------------------------------- |
| `apps/docs`                       | Astro documentation site and component registry   |
| `apps/docs/src/registry/ui`       | Solid UI component implementations                |
| `apps/docs/src/registry/examples` | Live component examples                           |
| `apps/docs/src/content/docs`      | MDX component documentation                       |
| `packages/astro-solid2`           | Private, temporary Astro renderer for SolidJS 2   |
| `patches`                         | Temporary dependency compatibility patches        |
| `TODO.md`                         | Components blocked on SolidJS 2 ecosystem support |

## Development

### Requirements

- Node.js 24
- pnpm 11.13.1

### Setup

```bash
pnpm install
pnpm dev
```

The development command starts the Astro documentation application.

### Verification

Run the complete repository validation before submitting changes:

```bash
pnpm validate
```

This checks formatting, linting, TypeScript/Astro diagnostics, tests, and the production build.

Individual commands are also available:

```bash
pnpm format:check
pnpm lint
pnpm check
pnpm test
pnpm test:watch
pnpm build
```

## Contributing to the migration

When adding or updating a registry component:

1. Match the existing registry metadata and source conventions.
2. Port its representative examples alongside the component.
3. Use SolidJS 2-compatible APIs and dependencies.
4. Add or update its MDX documentation.
5. Run `pnpm validate`.

For blocked components, confirm the dependency's current version and peer dependencies using the
checks documented in [TODO.md](./TODO.md) before beginning a port.

## Temporary Astro integration

`packages/astro-solid2` is a private compatibility port of Astro's Solid renderer. It is consumed
directly from TypeScript, is not published, and is not synchronized with Astro upstream.

It should be deleted—not evolved into a maintained fork—when Astro's official Solid integration
supports the SolidJS 2 target used by this repository.

See [packages/astro-solid2/README.md](./packages/astro-solid2/README.md) for implementation details
and attribution.

## License

[MIT](./LICENSE)
