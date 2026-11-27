---
"solidui-cli": minor
"@solid-ui/registry": minor
---

solidui-cli takes the icon library from `components.json` and resolves the registry's icons to it. Lucide, through its Solid 2 package `@lucide/solid`, is the first library.

**Breaking changes**

- The registry names icons with an `IconPlaceholder` instead of inlining them as SVG, so components need this release: solidui-cli 1.0 would copy the placeholders unresolved. Run `npx solidui-cli@latest add`.
- Components with icons import them from the icon library, so `add` installs `@lucide/solid` alongside them.

**init**

- Asks which icon library to use after a named preset, saves it as `iconLibrary` in `components.json` and installs it. A preset code from the Create page carries its icon library.

**add**

- Resolves each icon to the project's library as `import { ChevronDownIcon } from "@lucide/solid"`. Projects set up with solidui-cli 1.0 have no `iconLibrary` and get Lucide.
