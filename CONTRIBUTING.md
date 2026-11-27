# Contributing

Thanks for your interest in contributing to Solid UI. Please take a moment to read this guide before opening a pull request.

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [workspaces](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [Changesets](https://github.com/changesets/changesets) for managing releases.
- The docs are an [Astro](https://astro.build) site with [Solid 2](https://github.com/solidjs/solid) islands and [Tailwind CSS 4](https://tailwindcss.com).
- Components are built on [UI SDK](https://ui-sdk.dev).

## Structure

| Path                              | Purpose                                            |
| --------------------------------- | -------------------------------------------------- |
| `apps/docs`                       | Documentation site and component registry          |
| `apps/docs/src/registry/ui`       | Component source                                   |
| `apps/docs/src/registry/examples` | Live component examples                            |
| `apps/docs/src/registry/styles`   | Theme CSS for every style                          |
| `apps/docs/src/content/docs`      | MDX documentation                                  |
| `packages/cli`                    | The `solidui-cli` package                          |
| `packages/registry`               | Code the docs and CLI share                        |
| `vendor/astro-solid`              | Pinned Astro Solid 2 integration until it releases |

[REGISTRY.md](./REGISTRY.md) describes the registry format, the shared package and the CLI.

## Development

### Requirements

The root `package.json` pins Node.js `24.22.0` and pnpm `12.14.0`. Install pnpm `12.14.0` (or run `pnpm self-update 12.14.0`); `pnpm install` downloads the pinned Node.js runtime for the repository scripts.

### Setup

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/solid-ui.git
   cd solid-ui
   ```

2. Create a branch:

   ```bash
   git checkout -b my-new-branch
   ```

3. Install dependencies and the test browser:

   ```bash
   pnpm install
   pnpm exec playwright install chromium
   ```

4. Start the docs:

   ```bash
   pnpm dev
   ```

## Components

Components target **Solid 2** (`solid-js` and `@solidjs/web` `2.0.1`). Solid 1 APIs and Solid 1-only libraries such as Kobalte or Corvu won't work. If you're new to Solid 2, read its [migration guide](https://github.com/solidjs/solid/blob/main/documentation/solid-2.0/MIGRATION.md) first.

When adding or updating a component:

1. Import UI SDK parts by name with an `Sdk` alias (`Dialog as SdkDialog`) and compose them directly.
2. Inline icons as SVG copied from [Lucide](https://lucide.dev), `aria-hidden="true"` unless the markup names them, and credit Lucide in the first line of the file.
3. Edit theme styles in `apps/docs/src/registry/styles`, not in the component.
4. Add examples to `apps/docs/src/registry/examples` and update the MDX docs.
5. Run `pnpm validate`.

Some components wait on Solid 2 support in their dependencies. Check [TODO.md](./TODO.md) before starting one.

## CLI

Build the CLI and test it against the local registry in a Solid 2 app:

```bash
pnpm --filter solidui-cli build
pnpm --filter docs dev
SOLID_UI_REGISTRY_URL=http://localhost:4321 node <path-to-solid-ui>/packages/cli/dist/index.js init
```

## Astro integration

The docs use reproducible builds of Astro's official Solid 2 pull request. Read [vendor/astro-solid/README.md](./vendor/astro-solid/README.md) before changing it, add a failing regression test before a fix, and run `pnpm validate:full`.

## Testing

```bash
pnpm validate        # format, lint, types, unit tests, builds and smoke browser tests (~1 min)
pnpm validate:full   # everything above plus every browser test (~7 min)
pnpm test:e2e tests/<name>.spec.ts
```

Run `pnpm validate` while you work and `pnpm validate:full` before submitting larger changes. Oxfmt owns formatting (`pnpm format`), ESLint owns linting (`pnpm lint:fix`).

## Commit convention

We follow [Conventional Commits](https://www.conventionalcommits.org): `category(scope): message`.

- `feat`: a new feature
- `fix`: a bug fix
- `refactor`: a code change that is neither a fix nor a feature
- `docs`: documentation only
- `test`: tests only
- `build`: build system or dependencies
- `ci`: CI configuration
- `chore`: anything else

For example: `fix(calendar): square the inner corners of a range`.

## Pull requests

- Add a changeset with `pnpm changeset` for every user-facing change to the docs or the CLI.
- Keep a pull request focused on one change.
- [Greptile](https://www.greptile.com) reviews pull requests automatically. Address or answer its comments.

## Requesting new components

Open an [issue](https://github.com/stefan-karger/solid-ui/issues) describing the component. If shadcn/ui ships it, link its page.
