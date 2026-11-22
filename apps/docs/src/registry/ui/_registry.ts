import type { Registry } from "~/registry/schema"

export const ui: Registry["items"] = [
  {
    name: "attachment",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["button", "style-utilities"],
    files: [
      {
        path: "ui/attachment.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "bubble",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "ui/bubble.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "marker",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils", "style-utilities"],
    files: [
      {
        path: "ui/marker.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "message",
    type: "registry:ui",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "ui/message.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "trace",
    type: "registry:ui",
    dependencies: ["lucide-solid"],
    registryDependencies: ["collapsible", "utils", "style-utilities"],
    files: [
      {
        path: "ui/trace.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "code-block",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-solid"],
    registryDependencies: ["button", "utils", "style-utilities"],
    files: [
      {
        path: "ui/code-block.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "calendar",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["utils"],
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
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "ui/carousel.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "drawer",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "ui/drawer.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "input-otp",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "ui/input-otp.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "resizable",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["utils"],
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
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "ui/scroll-area.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "message-scroller",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "ui/message-scroller.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "toast",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "ui/toast.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "questionnaire",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "ui/questionnaire.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["style-utilities"],
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
    dependencies: ["class-variance-authority"],
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
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
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
    files: [
      {
        path: "ui/aspect-ratio.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "avatar",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "badge",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
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
    registryDependencies: [],
    name: "button",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "button-group",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["separator"],
    files: [
      {
        path: "ui/button-group.tsx",
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
    registryDependencies: [],
    name: "checkbox",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "command",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["dialog", "input-group"],
    files: [
      {
        path: "ui/command.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "context-menu",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    files: [
      {
        path: "ui/context-menu.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "collapsible",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
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
    dependencies: [
      "@ui-sdk/solid",
      "@ui-sdk/core",
      "class-variance-authority",
      "lucide-solid"
    ],
    registryDependencies: ["button", "input-group"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "delta-bar",
    type: "registry:ui",
    files: [
      {
        path: "ui/delta-bar.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "dialog",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["button"],
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
    dependencies: [],
    files: [
      {
        path: "ui/direction.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "dropdown-menu",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
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
    dependencies: ["class-variance-authority"],
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
    dependencies: ["class-variance-authority"],
    registryDependencies: ["label", "separator"],
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "hover-card",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
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
    dependencies: ["class-variance-authority"],
    registryDependencies: ["button", "input", "textarea"],
    files: [
      {
        path: "ui/input-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "item",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
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
    registryDependencies: [],
    name: "menubar",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    files: [
      {
        path: "ui/menubar.tsx",
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
    registryDependencies: [],
    name: "navigation-menu",
    type: "registry:ui",
    dependencies: [
      "@ui-sdk/solid",
      "@ui-sdk/core",
      "class-variance-authority",
      "lucide-solid"
    ],
    files: [
      {
        path: "ui/navigation-menu.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "pagination",
    type: "registry:ui",
    dependencies: ["lucide-solid"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/pagination.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "popover",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "progress",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/progress.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "radio-group",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "select",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    files: [
      {
        path: "ui/select.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "sheet",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "lucide-solid"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/sheet.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "sidebar",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-solid"],
    registryDependencies: [
      "button",
      "input",
      "separator",
      "sheet",
      "skeleton",
      "tooltip",
      "use-mobile"
    ],
    files: [
      {
        path: "ui/sidebar.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "skeleton",
    type: "registry:ui",
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "spinner",
    type: "registry:ui",
    dependencies: ["lucide-solid"],
    files: [
      {
        path: "ui/spinner.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "slider",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "switch",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "separator",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/separator.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "tabs",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "class-variance-authority"],
    registryDependencies: ["style-utilities"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    name: "table",
    type: "registry:ui",
    files: [
      {
        path: "ui/table.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "toggle",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "class-variance-authority"],
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
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core", "class-variance-authority"],
    registryDependencies: ["toggle", "style-utilities"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui"
      }
    ]
  },
  {
    registryDependencies: [],
    name: "tooltip",
    type: "registry:ui",
    dependencies: ["@ui-sdk/solid", "@ui-sdk/core"],
    files: [
      {
        path: "ui/tooltip.tsx",
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
  }
]
