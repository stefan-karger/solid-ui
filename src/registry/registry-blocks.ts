import type { Registry } from "~/registry/schema";

export const blocks: Registry = [
  {
    description: "A simple sidebar with navigation grouped by section",
    files: [
      {
        path: "block/sidebar-01/index.tsx",
        target: "app/dashboard/page.tsx",
        type: "page",
      },
      {
        path: "block/sidebar-01/components/app-sidebar.tsx",
        type: "component",
      },
      {
        path: "block/sidebar-01/components/search-form.tsx",
        type: "component",
      },
      {
        path: "block/sidebar-01/components/version-switcher.tsx",
        type: "component",
      },
    ],
    name: "sidebar-01",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "dropdown-menu",
    ],
    type: "block",
  },
  {
    files: [
      {
        path: "block/demo-sidebar.tsx",
        type: "component",
      },
    ],
    name: "demo-sidebar",
    type: "block",
  },
];
