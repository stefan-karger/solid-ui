# solid-ui contribution execution plan

Branch: `feat/cli-dx-and-registry` (fork: AMDphreak/solid-ui)

## Quick wins

- [x] `SOLIDUI_REGISTRY_URL` env var in CLI `registry.ts`
- [x] Docs/cli copy fixes (`componentDir`, `components.json` → `ui.config.json`)
- [x] `init --with-color-mode` (+ `COLOR_MODE.md` snippets for SolidStart / Vite)
- [x] `init -y`, `init --with-tailwind` (+ postcss.config.cjs)
- [x] `docs/dark-mode/tauri.mdx` + link from overview
- [x] `mode-toggle` UI component (merged from prior PR branch)

## Medium

- [x] `solidui-cli add-block <name>` + SolidStart-friendly block targets
- [x] `solidui-cli update [components...]` with overwrite
- [x] Sidebar: v3-compatible `w-[var(--*)]` classes + docs callout

## Strategic

- [x] `CONTRIBUTING.md`
- [x] `apps/docs/public/llms.txt`
- [x] Tailwind v3/v4 callout in CLI `COLOR_MODE.md`, sidebar docs, CONTRIBUTING

## Skipped (per user)

- UnoCSS support
- cva → tailwind-variants migration
- Full shadcn block parity in one PR
- Separate `command-palette` ui (`command` already exports `CommandDialog`)

## Resume in a new chat

```text
Continue solid-ui fork AMDphreak/solid-ui branch feat/cli-dx-and-registry.
Read CONTRIBUTION-PLAN.md. Run pnpm --filter docs build:registry, commit public/registry,
pnpm --filter solidui-cli build, push branch, open/update PR to stefan-karger/solid-ui.
```
