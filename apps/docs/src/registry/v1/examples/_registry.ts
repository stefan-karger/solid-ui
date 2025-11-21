import type { Registry } from "~/registry/schema"

export const examples: Registry["items"] = [
  {
    name: "accordion-demo",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-demo",
    type: "registry:example",
    registryDependencies: ["alert"],
    files: [
      {
        path: "examples/alert-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-demo",
    type: "registry:example",
    registryDependencies: ["alert-dialog"],
    files: [
      {
        path: "examples/alert-dialog-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "aspect-ratio-demo",
    type: "registry:example",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "examples/aspect-ratio-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "badge-demo",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-demo",
    type: "registry:example",
    registryDependencies: ["breadcrumb", "dropdown-menu"],
    files: [
      {
        path: "examples/breadcrumb-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-default",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-default.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-destructive",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-destructive.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-ghost",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-ghost.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-demo",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "dropdown-menu"],
    files: [
      {
        path: "examples/button-group-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-dropdown-menu",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "dropdown-menu"],
    files: [
      {
        path: "examples/button-group-dropdown-menu.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-input",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "input"],
    files: [
      {
        path: "examples/button-group-input.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-input-group",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "input-group", "tooltip"],
    files: [
      {
        path: "examples/button-group-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-nested",
    type: "registry:example",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "examples/button-group-nested.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-orientation",
    type: "registry:example",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "examples/button-group-orientation.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-popover",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "popover", "separator", "textarea"],
    files: [
      {
        path: "examples/button-group-popover.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-select",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "select", "input"],
    files: [
      {
        path: "examples/button-group-select.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-separator",
    type: "registry:example",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "examples/button-group-separator.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-size",
    type: "registry:example",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "examples/button-group-size.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-split",
    type: "registry:example",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "examples/button-group-split.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-icon",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-link",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-link.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-loading",
    type: "registry:example",
    registryDependencies: ["button", "spinner"],
    files: [
      {
        path: "examples/button-loading.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-outline",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-outline.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-rounded",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-rounded.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-secondary",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-secondary.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-sizes",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-sizes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-with-icon",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-with-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "calendar-demo",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [
      {
        path: "examples/calendar-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "card-demo",
    type: "registry:example",
    registryDependencies: ["card", "button", "input", "label"],
    files: [
      {
        path: "examples/card-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "carousel-demo",
    type: "registry:example",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "examples/carousel-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "checkbox-demo",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "collapsible-demo",
    type: "registry:example",
    registryDependencies: ["collapsible", "button"],
    files: [
      {
        path: "examples/collapsible-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-demo",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "command-demo",
    type: "registry:example",
    registryDependencies: ["command"],
    files: [
      {
        path: "examples/command-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-demo",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "data-table-demo",
    type: "registry:example",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input", "table"],
    files: [
      {
        path: "examples/data-table-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "date-picker-demo",
    type: "registry:example",
    registryDependencies: ["label", "button", "calendar", "popover"],
    files: [
      {
        path: "examples/date-picker-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-demo",
    type: "registry:example",
    registryDependencies: ["dialog", "button", "input", "label"],
    files: [
      {
        path: "examples/dialog-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "drawer-demo",
    type: "registry:example",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "examples/drawer-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "registry:example",
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-checkboxes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-demo",
    type: "registry:example",
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-dialog",
    type: "registry:example",
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-dialog.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-radio-group",
    type: "registry:example",
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-radio-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-demo",
    type: "registry:example",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "examples/empty-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-checkbox",
    type: "registry:example",
    registryDependencies: ["field", "checkbox"],
    files: [
      {
        path: "examples/field-checkbox.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-choice-card",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/field-choice-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-demo",
    type: "registry:example",
    registryDependencies: ["field"],
    files: [
      {
        path: "examples/field-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-fieldset",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/field-fieldset.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-group-example",
    type: "registry:example",
    registryDependencies: ["field", "checkbox"],
    files: [
      {
        path: "examples/field-group-example.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-input",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/field-input.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-radio",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/field-radio.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-responsive",
    type: "registry:example",
    registryDependencies: ["field", "button", "input", "textarea"],
    files: [
      {
        path: "examples/field-responsive.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-select",
    type: "registry:example",
    registryDependencies: ["field", "select"],
    files: [
      {
        path: "examples/field-select.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-slider",
    type: "registry:example",
    registryDependencies: ["field", "slider"],
    files: [
      {
        path: "examples/field-slider.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-switch",
    type: "registry:example",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "examples/field-switch.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-textarea",
    type: "registry:example",
    registryDependencies: ["field", "textarea"],
    files: [
      {
        path: "examples/field-textarea.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "hover-card-demo",
    type: "registry:example",
    registryDependencies: ["hover-card", "button", "avatar"],
    files: [
      {
        path: "examples/hover-card-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-demo",
    type: "registry:example",
    registryDependencies: ["input"],
    files: [
      {
        path: "examples/input-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-demo",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-demo",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-demo",
    type: "registry:example",
    registryDependencies: ["item", "button"],
    files: [
      {
        path: "examples/item-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "kbd-demo",
    type: "registry:example",
    registryDependencies: ["kbd"],
    files: [
      {
        path: "examples/kbd-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "label-demo",
    type: "registry:example",
    registryDependencies: ["label", "checkbox"],
    files: [
      {
        path: "examples/label-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "menubar-demo",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/menubar-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "native-select-demo",
    type: "registry:example",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "examples/native-select-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "navigation-menu-demo",
    type: "registry:example",
    registryDependencies: ["navigation-menu"],
    files: [
      {
        path: "examples/navigation-menu-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "pagination-demo",
    type: "registry:example",
    registryDependencies: ["pagination"],
    files: [
      {
        path: "examples/pagination-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-demo",
    type: "registry:example",
    registryDependencies: ["popover", "button", "input", "label"],
    files: [
      {
        path: "examples/popover-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "progress-demo",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-demo",
    type: "registry:example",
    registryDependencies: ["radio-group", "label"],
    files: [
      {
        path: "examples/radio-group-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "resizable-demo",
    type: "registry:example",
    registryDependencies: ["resizable"],
    files: [
      {
        path: "examples/resizable-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "scroll-area-demo",
    type: "registry:example",
    registryDependencies: ["scroll-area", "separator"],
    files: [
      {
        path: "examples/scroll-area-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "select-demo",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "separator-demo",
    type: "registry:example",
    registryDependencies: ["separator"],
    files: [
      {
        path: "examples/separator-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sheet-demo",
    type: "registry:example",
    registryDependencies: ["sheet", "button", "input", "label"],
    files: [
      {
        path: "examples/sheet-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "skeleton-card",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "skeleton-demo",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "slider-demo",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sonner-demo",
    type: "registry:example",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "examples/sonner-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sonner-types",
    type: "registry:example",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "examples/sonner-types.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-demo",
    type: "registry:example",
    registryDependencies: ["spinner", "item"],
    files: [
      {
        path: "examples/spinner-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-demo",
    type: "registry:example",
    registryDependencies: ["switch", "label"],
    files: [
      {
        path: "examples/switch-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "table-demo",
    type: "registry:example",
    registryDependencies: ["table"],
    files: [
      {
        path: "examples/table-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tabs-demo",
    type: "registry:example",
    registryDependencies: ["tabs", "card", "input", "label"],
    files: [
      {
        path: "examples/tabs-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "textarea-demo",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/textarea-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-demo",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-demo",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-blockquote",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-blockquote.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-h1",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-h1.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-h2",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-h2.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-h3",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-h3.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-h4",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-h4.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-inline-code",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-inline-code.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-large",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-large.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-lead",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-lead.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-list",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-list.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-muted",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-muted.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-p",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-p.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-small",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-small.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "typography-table",
    type: "registry:example",
    files: [
      {
        path: "examples/typography-table.tsx",
        type: "registry:example"
      }
    ]
  }
]
