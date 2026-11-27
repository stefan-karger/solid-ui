---
"solidui-cli": minor
"@solid-ui/registry": minor
"docs": minor
---

Components get their icons from Lucide's Solid 2 package, `@lucide/solid`, again. Registry items name each icon with an `IconPlaceholder`; `init` asks for the icon library, saves it as `iconLibrary` in `components.json` and installs it, and `add` turns the placeholders into the library's icons, one import per icon. Projects set up with solidui-cli 1.0 get Lucide. The Create page has an Icon Library picker.
