import type { Registry } from "~/registry/schema"

export const ui: Registry["items"] = [
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "lucide-solid"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "alert",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/alert.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/alert-dialog.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "aspect-ratio",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/aspect-ratio.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "avatar",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "badge",
    type: "registry:ui",
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    dependencies: ["lucide-solid"],
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "card",
    type: "registry:ui",
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "button-group",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["button", "separator"],
    files: [
      {
        path: "ui/button-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "carousel",
    type: "registry:ui",
    dependencies: ["embla-carousel", "embla-carousel-solid", "lucide-solid"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/carousel.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "checkbox",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "collapsible",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/dropdown-menu.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "field",
    type: "registry:ui",
    registryDependencies: ["label", "separator"],
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "input",
    type: "registry:ui",
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "input-group",
    type: "registry:ui",
    registryDependencies: ["button", "input", "textarea"],
    files: [
      {
        path: "ui/input-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "radio-group",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "select",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/select.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "slider",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "switch",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui"
      }
    ]
  }
]
