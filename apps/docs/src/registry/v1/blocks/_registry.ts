import type { Registry } from "~/registry/schema"

export const blocks: Registry["items"] = [
  {
    name: "login-01",
    description: "A simple login form.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label", "field"],
    files: [
      {
        path: "blocks/login-01/index.tsx",
        target: "app/login/index.tsx",
        type: "registry:page"
      },
      {
        path: "blocks/login-01/components/login-form.tsx",
        type: "registry:component"
      }
    ],
    categories: ["authentication", "login"]
  },
  {
    name: "otp-01",
    description: "A simple OTP verification form.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input-otp", "label", "field"],
    files: [
      {
        path: "blocks/otp-01/index.tsx",
        target: "app/otp/index.tsx",
        type: "registry:page"
      },
      {
        path: "blocks/otp-01/components/otp-form.tsx",
        type: "registry:component"
      }
    ],
    categories: ["authentication", "otp"]
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    description: "A sidebar that collapses to icons.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar"
    ],
    files: [
      {
        path: "blocks/sidebar-07/index.tsx",
        type: "registry:page",
        target: "app/dashboard/index.tsx"
      },
      {
        path: "blocks/sidebar-07/components/app-sidebar.tsx",
        type: "registry:component"
      },
      {
        path: "blocks/sidebar-07/components/nav-main.tsx",
        type: "registry:component"
      },
      {
        path: "blocks/sidebar-07/components/nav-projects.tsx",
        type: "registry:component"
      },
      {
        path: "blocks/sidebar-07/components/nav-user.tsx",
        type: "registry:component"
      },
      {
        path: "blocks/sidebar-07/components/team-switcher.tsx",
        type: "registry:component"
      }
    ],
    categories: ["sidebar", "dashboard"]
  }
]
