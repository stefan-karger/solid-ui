import type { Registry } from "@/registry/schema"

export const ui: Registry = [
  {
    name: "accordion",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "alert",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/alert.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "alert-dialog",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/alert-dialog.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "aspect-ratio",
    type: "ui",
    files: [
      {
        path: "ui/aspect-ratio.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "avatar",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "badge-delta",
    type: "ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "ui/badge-delta.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "badge",
    type: "ui",
    files: [
      {
        path: "ui/badge.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "bar-list",
    type: "ui",
    files: [
      {
        path: "ui/bar-list.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "breadcrumb",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "button",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/button.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "callout",
    type: "ui",
    files: [
      {
        path: "ui/callout.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "card",
    type: "ui",
    files: [
      {
        path: "ui/card.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "carousel",
    type: "ui",
    dependencies: ["embla-carousel-solid"],
    files: [
      {
        path: "ui/carousel.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "charts",
    type: "ui",
    dependencies: ["chart.js", "@solid-primitives/refs"],
    files: [
      {
        path: "ui/charts.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "checkbox",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "combobox",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "command",
    type: "ui",
    dependencies: ["@kobalte/core", "cmdk-solid"],
    registryDependencies: ["dialog"],
    files: [
      {
        path: "ui/command.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "context-menu",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/context-menu.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "collapsible",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "date-picker",
    type: "ui",
    dependencies: ["@ark-ui/solid"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/date-picker.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "delta-bar",
    type: "ui",
    files: [
      {
        path: "ui/delta-bar.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "dialog",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/dialog.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "drawer",
    type: "ui",
    dependencies: ["@corvu/drawer"],
    files: [
      {
        path: "ui/drawer.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "dropdown-menu",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/dropdown-menu.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "flex",
    type: "ui",
    files: [
      {
        path: "ui/flex.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "grid",
    type: "ui",
    files: [
      {
        path: "ui/grid.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "hover-card",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/hover-card.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "label",
    type: "ui",
    files: [
      {
        path: "ui/label.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "menubar",
    type: "ui",
    files: [
      {
        path: "ui/menubar.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "navigation-menu",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/navigation-menu.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "number-field",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/number-field.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "otp-field",
    type: "ui",
    dependencies: ["@corvu/otp-field"],
    files: [
      {
        path: "ui/otp-field.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "pagination",
    type: "ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/pagination.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "popover",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "progress",
    type: "ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["label"],
    files: [
      {
        path: "ui/progress.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "progress-circle",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/progress-circle.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "radio-group",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "resizable",
    type: "ui",
    dependencies: ["@corvu/resizable"],
    files: [
      {
        path: "ui/resizable.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "select",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/select.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "separator",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/separator.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "sheet",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/sheet.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "sidebar",
    type: "ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: [
      "button",
      "separator",
      "sheet",
      "skeleton",
      "text-field",
      "tooltip",
      "use-mobile"
    ],
    files: [
      {
        path: "ui/sidebar.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "skeleton",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "slider",
    type: "ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["label"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "sonner",
    type: "ui",
    dependencies: ["solid-sonner"],
    files: [
      {
        path: "ui/sonner.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "switch",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "table",
    type: "ui",
    files: [
      {
        path: "ui/table.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "tabs",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "text-field",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/text-field.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "timeline",
    type: "ui",
    files: [
      {
        path: "ui/timeline.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "toast",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/toast.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "toggle",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/toggle.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "toggle-group",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "ui"
      }
    ]
  },
  {
    name: "tooltip",
    type: "ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "ui"
      }
    ]
  }
]
