import type { Registry } from "~/registry/schema"

export const blocks: Registry = [
  {
    name: "sidebar-01",
    description: "A simple sidebar with navigation grouped by section",
    type: "block",
    registryDependencies: ["sidebar", "breadcrumb", "separator", "label", "dropdown-menu"],
    files: [
      {
        path: "block/sidebar-01/index.tsx",
        type: "page",
        target: "src/routes/dashboard/index.tsx"
      },
      {
        path: "block/sidebar-01/components/app-sidebar.tsx",
        type: "component",
        target: "src/components/dashboard/app-sidebar.tsx"
      },
      {
        path: "block/sidebar-01/components/search-form.tsx",
        type: "component",
        target: "src/components/dashboard/search-form.tsx"
      },
      {
        path: "block/sidebar-01/components/version-switcher.tsx",
        type: "component",
        target: "src/components/dashboard/version-switcher.tsx"
      }
    ]
  },
  {
    name: "demo-sidebar",
    type: "block",
    files: [
      {
        path: "block/demo-sidebar.tsx",
        type: "component",
        target: "src/components/demo-sidebar.tsx"
      }
    ]
  }
]
