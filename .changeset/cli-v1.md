---
"solidui-cli": major
---

solidui-cli 1.0 sets up Solid UI for Solid 2. Projects on Solid 1 keep using `solidui-cli@0.7.2`, which installs from the previous registry; the [migration guide](https://www.solid-ui.com/docs/migration) walks through the move.

**Breaking changes**

- Requires Solid 2, Vite with `@solidjs/vite-plugin`, Tailwind CSS 4.3 or later and TypeScript. On Solid 1 or Tailwind CSS 3, init stops and points to 0.7.2 and the migration guide.
- `components.json` replaces `ui.config.json`. A project that still has `ui.config.json` is pointed to 0.7.2.
- Components come from the per-style registry at `/r/` and are built with UI SDK instead of Kobalte and Corvu.
- No `tailwind.config`, Tailwind prefix or JavaScript output: the theme lives in a generated `solid-ui.css`.

**init**

- Starts from one of eight presets or a preset code from the Create page (`--preset`) and writes `components.json`, `solid-ui.css` with the theme tokens, fonts and shared utilities, and the `cn` helper.
- Installs the project's dependencies when they aren't installed yet, with the package manager that runs it.
- Checks `solid-js` and `tailwindcss` against the tested ranges and offers to update older minors. It only changes an installed version after asking, or with `--yes` where the components need it.
- Sets up the import alias (`~` by default, `--alias` for another prefix) in `tsconfig.json` and `vite.config`.
- `--force` switches the preset and keeps your components and aliases.

**add**

- Adds components with the components they use, rewrites their imports to your aliases and applies your preset's menu color.
- Keeps files you changed unless you pass `--overwrite`, and installs the exact UI SDK build the components are tested with.
- `SOLID_UI_REGISTRY_URL` points the CLI at another registry host, such as a local docs server.
