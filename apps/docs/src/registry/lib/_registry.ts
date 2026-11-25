import type { Registry } from "@solid-ui/registry/schema"

export const lib: Registry["items"] = [
  {
    name: "ai-demo-chat",
    type: "registry:lib",
    files: [{ path: "lib/ai-demo-chat.ts", type: "registry:lib" }]
  },
  {
    name: "ai-demo-markdown",
    type: "registry:lib",
    dependencies: ["micromark"],
    registryDependencies: ["code-block"],
    files: [{ path: "lib/ai-demo-markdown.tsx", type: "registry:lib" }]
  },
  {
    name: "style-utilities",
    type: "registry:style",
    dependencies: ["tw-animate-css"],
    files: [
      {
        path: "lib/style-utilities.css",
        target: "styles/solid-ui.css",
        type: "registry:file"
      }
    ]
  },
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib"
      }
    ]
  }
]
