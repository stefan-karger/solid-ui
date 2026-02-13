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
    name: "calendar",
    type: "registry:ui",
    dependencies: ["@corvu/calendar"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/calendar.tsx",
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
    name: "chart",
    type: "registry:ui",
    dependencies: ["chart.js"],
    files: [
      {
        path: "ui/chart.tsx",
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
    name: "combobox",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "lucide-solid"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "command",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "lucide-solid"],
    registryDependencies: ["dialog"],
    files: [
      {
        path: "ui/command.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "context-menu",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/context-menu.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "date-picker",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "@corvu/calendar"],
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "ui/date-picker.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "dialog",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/dialog.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "direction",
    type: "registry:ui",
    files: [
      {
        path: "ui/direction.tsx",
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
    name: "empty",
    type: "registry:ui",
    files: [
      {
        path: "ui/empty.tsx",
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
    name: "form",
    type: "registry:ui",
    dependencies: ["@modular-forms/solid"],
    registryDependencies: ["label"],
    files: [
      {
        path: "ui/form.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "hover-card",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/hover-card.tsx",
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
    name: "input-otp",
    type: "registry:ui",
    files: [
      {
        path: "ui/input-otp.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "item",
    type: "registry:ui",
    registryDependencies: ["separator"],
    files: [
      {
        path: "ui/item.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "kbd",
    type: "registry:ui",
    files: [
      {
        path: "ui/kbd.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "label",
    type: "registry:ui",
    files: [
      {
        path: "ui/label.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "menubar",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "lucide-solid"],
    files: [
      {
        path: "ui/menubar.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "navigation-menu",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "lucide-solid"],
    files: [
      {
        path: "ui/navigation-menu.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "native-select",
    type: "registry:ui",
    dependencies: ["lucide-solid"],
    files: [
      {
        path: "ui/native-select.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "pagination",
    type: "registry:ui",
    dependencies: ["@kobalte/core", "lucide-solid"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/pagination.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "popover",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "progress",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/progress.tsx",
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
    name: "resizable",
    type: "registry:ui",
    dependencies: ["@corvu/resizable"],
    files: [
      {
        path: "ui/resizable.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    files: [
      {
        path: "ui/scroll-area.tsx",
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
    name: "sonner",
    type: "registry:ui",
    dependencies: ["solid-sonner"],
    files: [
      {
        path: "ui/sonner.tsx",
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
  },
  {
    name: "tabs",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "textarea",
    type: "registry:ui",
    files: [
      {
        path: "ui/textarea.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "toggle",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/toggle.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["toggle"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "tooltip",
    type: "registry:ui",
    dependencies: ["@kobalte/core"],
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "registry:ui"
      }
    ]
  }
]
