import type { Registry } from "~/registry/schema"

export const components: Registry["items"] = [
  {
    name: "example",
    title: "Example",
    type: "registry:component",
    files: [
      {
        path: "components/example.tsx",
        type: "registry:component"
      }
    ]
  }
]
