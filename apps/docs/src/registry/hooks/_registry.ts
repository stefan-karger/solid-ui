import type { Registry } from "~/registry/schema"

export const hooks: Registry["items"] = [
  {
    name: "use-color-mode",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-color-mode.tsx",
        type: "registry:hook"
      }
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
  },
  {
    name: "use-questionnaire",
    type: "registry:hook",
    registryDependencies: ["button"],
    files: [
      {
        path: "hooks/use-questionnaire.ts",
        type: "registry:hook"
      }
    ]
  }
]
