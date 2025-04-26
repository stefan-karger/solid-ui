import type { Registry } from "@/registry/schema"

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
        target: "app/dashboard/page.tsx"
      },
      {
        path: "block/sidebar-01/components/app-sidebar.tsx",
        type: "component"
      },
      {
        path: "block/sidebar-01/components/search-form.tsx",
        type: "component"
      },
      {
        path: "block/sidebar-01/components/version-switcher.tsx",
        type: "component"
      }
    ]
  },
  {
    name: "demo-sidebar",
    type: "block",
    files: [
      {
        path: "block/demo-sidebar.tsx",
        type: "component"
      }
    ]
  }
]
