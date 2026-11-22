import type { Registry } from "~/registry/schema"

export const lib: Registry["items"] = [
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
