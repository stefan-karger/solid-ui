import type { Registry } from "@solid-ui/registry/schema"

export const hooks: Registry["items"] = [
  {
    name: "use-highlighted-code",
    type: "registry:hook",
    dependencies: ["shiki"],
    files: [
      { path: "hooks/use-highlighted-code.ts", type: "registry:hook" },
      { path: "lib/highlighter.tsx", type: "registry:lib" }
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
