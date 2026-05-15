# Contributing to solid-ui

Thank you for helping improve Solid UI, the docs site, and `solidui-cli`.

## Repository layout

| Path | Purpose |
| ---- | ------- |
| `apps/docs` | solid-ui.com — registry source, MDX docs, examples |
| `packages/cli` | `solidui-cli` published to npm |

## Local setup

```bash
pnpm install
```

If `pnpm install` fails on older Corepack pnpm, use Node 22+ and `corepack prepare pnpm@9 --activate`, or install dependencies per-package.

### Docs app

```bash
pnpm --filter docs dev
```

### CLI

```bash
cd packages/cli
pnpm install
pnpm build
node dist/index.js --help
```

## Registry changes

1. Edit files under `apps/docs/src/registry/` (`ui/`, `example/`, `block/`).
2. Register entries in `registry-ui.ts`, `registry-examples.ts`, or `registry-blocks.ts`.
3. Rebuild published JSON:

```bash
pnpm --filter docs build:registry
```

4. Commit both source **and** `apps/docs/public/registry/**` if your PR includes registry output (maintainers may run this on release).

### Promoting examples to CLI-installable components

- `solidui-cli add` only lists `type: "ui"` in `registry/index.json`.
- If the docs site uses a pattern in production (e.g. `mode-toggle`), add `registry/ui/<name>.tsx` and an entry in `registry-ui.ts` with `registryDependencies` as needed.

### Blocks

- Define in `registry-blocks.ts` with SolidStart-friendly `target` paths (`src/routes/...`, `src/components/...`).
- Install via `solidui-cli add-block <name>` (after registry build).

## Pull requests

- Target `main` unless maintainers direct you to `dev` (Tailwind v4 migration).
- One feature per PR when possible (CLI change vs component fix vs docs).
- Link related issues (e.g. #229 sidebar / Tailwind).

## Claiming work (V4 checklist)

See [issue #199](https://github.com/stefan-karger/solid-ui/issues/199). Comment on the issue or open a draft PR with the component name you are implementing to avoid duplicate effort.

## Fork testing the CLI against your registry

```bash
cd packages/cli && pnpm build
SOLIDUI_REGISTRY_URL=https://your-preview.example.com node dist/index.js add mode-toggle
```

Deploy `apps/docs/public/registry` to that host or run docs locally and point the env var at `http://localhost:3000`.
