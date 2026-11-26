# solidui-cli

Add [Solid UI](https://www.solid-ui.com) components to your Solid 2 app. Like shadcn/ui, the CLI copies the component source into your project, so you own and edit it. The components are built with [UI SDK](https://ui-sdk.dev) and Tailwind CSS.

**Requires** Solid 2, Vite with `@solidjs/vite-plugin`, Tailwind CSS 4.3 or later and TypeScript. Projects on Solid 1 or Tailwind CSS 3 keep using `solidui-cli@0.7.2`, or follow the [migration guide](https://www.solid-ui.com/docs/migration).

## Quick start

```bash
npm create solid@latest     # choose Solid 2.0, TypeScript and with-tailwindcss
cd my-app
npx solidui-cli@latest init
npx solidui-cli@latest add button
```

Run the CLI with your package manager (`pnpm dlx`, `bunx`, `yarn dlx`): `init` installs the dependencies with it if they aren't installed yet.

```tsx
import { Button } from "~/components/ui/button"

export default function App() {
  return <Button>Click me</Button>
}
```

## Commands

**`init`** checks your Solid and Tailwind CSS versions, writes `components.json`, the theme in `solid-ui.css` and the `cn` helper, sets up the `~/` import alias in `tsconfig.json` and `vite.config.ts`, and installs the shared packages.

| Option                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `-p, --preset <code>` | a preset code from [Create](https://www.solid-ui.com/create) |
| `-y, --yes`           | skip the prompts and use the defaults                        |
| `-f, --force`         | replace an existing `components.json` and `solid-ui.css`     |
| `--css <file>`        | the app stylesheet that imports Tailwind CSS                 |
| `--alias <prefix>`    | the import alias for the components (default: `~`)           |
| `-c, --cwd <dir>`     | the project directory                                        |

**`add [components...]`** copies components and the components they use into your project and installs their packages. Without names, it lets you pick from the catalog.

| Option            | Description                              |
| ----------------- | ---------------------------------------- |
| `-o, --overwrite` | replace files that differ                |
| `-y, --yes`       | skip the prompts; keep files that differ |
| `-a, --all`       | add every component                      |
| `-c, --cwd <dir>` | the project directory                    |

## Common tasks

| Task                                                                                           | Command                        |
| ---------------------------------------------------------------------------------------------- | ------------------------------ |
| [Run without prompts in CI or scripts](https://www.solid-ui.com/docs/cli/#skip-the-prompts)    | `init --preset <code> --yes`   |
| [Switch the theme](https://www.solid-ui.com/docs/cli/#switch-the-theme)                        | `init --preset <code> --force` |
| [Use `@/` instead of `~/`](https://www.solid-ui.com/docs/cli/#use-another-import-alias)        | `init --alias @`               |
| [Take the latest version of a component](https://www.solid-ui.com/docs/cli/#update-components) | `add button --overwrite`       |

The CLI only changes the version of a package you already have after asking, or with `--yes` where the components need it, and never replaces a component you edited unless you pass `--overwrite`.

## Documentation

- [Installation](https://www.solid-ui.com/docs/installation)
- [CLI reference and examples](https://www.solid-ui.com/docs/cli)
- [Components](https://www.solid-ui.com/docs/components)

To test against another registry host, such as a local docs server, set `SOLID_UI_REGISTRY_URL=http://localhost:4321`.

## License

Licensed under the [MIT license](https://github.com/stefan-karger/solid-ui/blob/main/LICENSE).
