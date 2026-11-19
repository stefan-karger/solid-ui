import type { Registry } from "~/registry/schema"

export const hooks: Registry["items"] = [
  {
    name: "use-highlighted-code",
    type: "registry:hook",
    dependencies: ["shiki"],
    files: [
      { path: "hooks/use-highlighted-code.tsx", type: "registry:hook" },
      { path: "lib/code-highlighter.ts", type: "registry:lib" }
    ]
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook"
      }
    ]
  }
]
