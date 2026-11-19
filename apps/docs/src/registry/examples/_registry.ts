import type { Registry } from "~/registry/schema"

export const examples: Registry["items"] = [
  {
    name: "attachment-states",
    type: "registry:example",
    registryDependencies: ["attachment", "spinner"],
    files: [{ path: "examples/attachment-states.tsx", type: "registry:example" }]
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
    name: "calendar-range",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [
      {
        path: "examples/calendar-range.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "calendar-multiple",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [
      {
        path: "examples/calendar-multiple.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "date-picker-demo",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "examples/date-picker-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "carousel-demo",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-demo.tsx",
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
    name: "drawer-sides",
    type: "registry:example",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "examples/drawer-sides.tsx",
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
    name: "input-otp-disabled",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-disabled.tsx",
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
    name: "resizable-vertical",
    type: "registry:example",
    registryDependencies: ["resizable"],
    files: [
      {
        path: "examples/resizable-vertical.tsx",
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
    name: "bubble-demo",
    type: "registry:example",
    registryDependencies: ["bubble"],
    files: [
      {
        path: "examples/bubble-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "message-demo",
    type: "registry:example",
    registryDependencies: ["message", "bubble"],
    files: [
      {
        path: "examples/message-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "attachment-demo",
    type: "registry:example",
    registryDependencies: ["attachment", "spinner"],
    files: [
      {
        path: "examples/attachment-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "marker-demo",
    type: "registry:example",
    registryDependencies: ["marker", "spinner"],
    files: [
      {
        path: "examples/marker-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "code-block-demo",
    type: "registry:example",
    registryDependencies: ["button", "code-block", "use-highlighted-code"],
    files: [
      {
        path: "examples/code-block-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "code-block-diff",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [
      {
        path: "examples/code-block-diff.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "trace-demo",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "code-block", "message", "trace"],
    files: [
      {
        path: "examples/trace-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "message-scroller-demo",
    type: "registry:example",
    registryDependencies: [
      "bubble",
      "button",
      "card",
      "dropdown-menu",
      "empty",
      "input-group",
      "message",
      "message-scroller",
      "tooltip"
    ],
    files: [
      {
        path: "examples/message-scroller-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "questionnaire-demo",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [
      {
        path: "examples/questionnaire-demo.tsx",
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
    name: "accordion-basic",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "accordion-borders",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-borders.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "accordion-card",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "accordion-disabled",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
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
    name: "accordion-multiple",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-multiple.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-action",
    type: "registry:example",
    registryDependencies: ["alert", "button"],
    files: [
      {
        path: "examples/alert-action.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-basic",
    type: "registry:example",
    registryDependencies: ["alert"],
    files: [
      {
        path: "examples/alert-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-colors",
    type: "registry:example",
    registryDependencies: ["alert"],
    files: [
      {
        path: "examples/alert-colors.tsx",
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
    name: "alert-destructive",
    type: "registry:example",
    registryDependencies: ["alert"],
    files: [
      {
        path: "examples/alert-destructive.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-demo",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-basic",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-small",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-small.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-media",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-media.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-small-media",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-small-media.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "alert-dialog-destructive",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-destructive.tsx",
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
    name: "aspect-ratio-square",
    type: "registry:example",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "examples/aspect-ratio-square.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "aspect-ratio-portrait",
    type: "registry:example",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "examples/aspect-ratio-portrait.tsx",
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
    name: "avatar-basic",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-badge",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-badge.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-badge-icon",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-badge-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-group",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-group-count",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-group-count.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-group-count-icon",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-group-count-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-size",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-size.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "avatar-dropdown",
    type: "registry:example",
    registryDependencies: ["avatar", "button", "dropdown-menu"],
    files: [
      {
        path: "examples/avatar-dropdown.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "badge-colors",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-colors.tsx",
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
    name: "badge-icon",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "badge-link",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-link.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "badge-spinner",
    type: "registry:example",
    registryDependencies: ["badge", "spinner"],
    files: [
      {
        path: "examples/badge-spinner.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "badge-variants",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-variants.tsx",
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
    name: "button-rtl",
    type: "registry:example",
    registryDependencies: ["button", "direction"],
    files: [
      {
        path: "examples/button-rtl.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-interactive",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-interactive.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-size",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-size.tsx",
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
    name: "button-spinner",
    type: "registry:example",
    registryDependencies: ["button", "spinner"],
    files: [
      {
        path: "examples/button-spinner.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-demo",
    type: "registry:example",
    meta: { docs: { clientOnly: true } },
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "examples/button-group-demo.tsx",
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
    name: "button-group-text",
    type: "registry:example",
    registryDependencies: ["button-group", "input", "label"],
    files: [
      {
        path: "examples/button-group-text.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-dropdown",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "dropdown-menu"],
    files: [
      {
        path: "examples/button-group-dropdown.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "button-group-select",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "input", "select"],
    files: [
      {
        path: "examples/button-group-select.tsx",
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
    name: "button-aschild",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-aschild.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-demo",
    type: "registry:example",
    registryDependencies: ["breadcrumb", "button", "dropdown-menu"],
    files: [
      {
        path: "examples/breadcrumb-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-basic",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-separator",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-separator.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-dropdown",
    type: "registry:example",
    registryDependencies: ["breadcrumb", "dropdown-menu"],
    files: [
      {
        path: "examples/breadcrumb-dropdown.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-ellipsis",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-ellipsis.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-link",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-link.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "card-demo",
    type: "registry:example",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "examples/card-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "card-small",
    type: "registry:example",
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "examples/card-small.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "card-image",
    type: "registry:example",
    registryDependencies: ["card"],
    files: [
      {
        path: "examples/card-image.tsx",
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
    name: "checkbox-invalid",
    type: "registry:example",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "examples/checkbox-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "checkbox-basic",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "checkbox-description",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-description.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "checkbox-disabled",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "checkbox-group",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "checkbox-table",
    type: "registry:example",
    registryDependencies: ["checkbox", "table"],
    files: [
      {
        path: "examples/checkbox-table.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "collapsible-basic",
    type: "registry:example",
    registryDependencies: ["collapsible"],
    files: [
      {
        path: "examples/collapsible-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "collapsible-demo",
    type: "registry:example",
    registryDependencies: ["collapsible"],
    files: [
      {
        path: "examples/collapsible-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "collapsible-file-tree",
    type: "registry:example",
    registryDependencies: ["collapsible"],
    files: [
      {
        path: "examples/collapsible-file-tree.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "collapsible-settings",
    type: "registry:example",
    registryDependencies: ["button", "card", "collapsible", "field", "input"],
    files: [
      {
        path: "examples/collapsible-settings.tsx",
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
    name: "combobox-basic",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-multiple",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-multiple.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-clear",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-clear.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-groups",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-groups.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-custom",
    type: "registry:example",
    registryDependencies: ["combobox", "item"],
    files: [
      {
        path: "examples/combobox-custom.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-invalid",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-disabled",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-auto-highlight",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-auto-highlight.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-popup",
    type: "registry:example",
    registryDependencies: ["button", "combobox"],
    files: [
      {
        path: "examples/combobox-popup.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "combobox-input-group",
    type: "registry:example",
    registryDependencies: ["combobox", "input-group"],
    files: [
      {
        path: "examples/combobox-input-group.tsx",
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
    name: "command-basic",
    type: "registry:example",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "examples/command-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "command-shortcuts",
    type: "registry:example",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "examples/command-shortcuts.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "command-groups",
    type: "registry:example",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "examples/command-groups.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "command-scrollable",
    type: "registry:example",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "examples/command-scrollable.tsx",
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
    name: "context-menu-basic",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-submenu",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-submenu.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-shortcuts",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-shortcuts.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-groups",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-groups.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-icons",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-icons.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-checkboxes",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-checkboxes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-radio",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-radio.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "context-menu-destructive",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-destructive.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "delta-bar-demo",
    type: "registry:example",
    registryDependencies: ["delta-bar"],
    files: [
      {
        path: "examples/delta-bar-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "delta-bar-inverted",
    type: "registry:example",
    registryDependencies: ["delta-bar"],
    files: [
      {
        path: "examples/delta-bar-inverted.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "delta-bar-custom-colors",
    type: "registry:example",
    registryDependencies: ["delta-bar"],
    files: [
      {
        path: "examples/delta-bar-custom-colors.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-demo",
    type: "registry:example",
    meta: { docs: { clientOnly: true } },
    registryDependencies: ["button", "dialog", "input", "label"],
    files: [
      {
        path: "examples/dialog-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-close-button",
    type: "registry:example",
    registryDependencies: ["button", "dialog", "input", "label"],
    files: [
      {
        path: "examples/dialog-close-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-no-close-button",
    type: "registry:example",
    registryDependencies: ["button", "dialog"],
    files: [
      {
        path: "examples/dialog-no-close-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-sticky-footer",
    type: "registry:example",
    registryDependencies: ["button", "dialog"],
    files: [
      {
        path: "examples/dialog-sticky-footer.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-scrollable-content",
    type: "registry:example",
    registryDependencies: ["button", "dialog"],
    files: [
      {
        path: "examples/dialog-scrollable-content.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "direction-demo",
    type: "registry:example",
    registryDependencies: ["button", "card", "direction", "input", "label"],
    files: [
      {
        path: "examples/direction-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-demo",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-basic",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-submenu",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-submenu.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-shortcuts",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-shortcuts.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-icons",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-icons.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-checkboxes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-checkboxes-icons",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-checkboxes-icons.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-radio-group",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-radio-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-radio-icons",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-radio-icons.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-destructive",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-destructive.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-avatar",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-avatar.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dropdown-menu-complex",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-complex.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sheet-demo",
    type: "registry:example",
    registryDependencies: ["button", "input", "label", "sheet"],
    files: [
      {
        path: "examples/sheet-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sheet-side",
    type: "registry:example",
    registryDependencies: ["button", "sheet"],
    files: [
      {
        path: "examples/sheet-side.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sheet-no-close-button",
    type: "registry:example",
    registryDependencies: ["button", "sheet"],
    files: [
      {
        path: "examples/sheet-no-close-button.tsx",
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
    name: "menubar-checkbox",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/menubar-checkbox.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "menubar-radio",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/menubar-radio.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "menubar-submenu",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/menubar-submenu.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "menubar-icons",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/menubar-icons.tsx",
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
    name: "native-select-groups",
    type: "registry:example",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "examples/native-select-groups.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "native-select-disabled",
    type: "registry:example",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "examples/native-select-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "native-select-invalid",
    type: "registry:example",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "examples/native-select-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "hover-card-demo",
    type: "registry:example",
    registryDependencies: ["button", "hover-card"],
    files: [
      {
        path: "examples/hover-card-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "hover-card-sides",
    type: "registry:example",
    registryDependencies: ["button", "hover-card"],
    files: [
      {
        path: "examples/hover-card-sides.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-demo",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-basic",
    type: "registry:example",
    registryDependencies: ["input"],
    files: [
      {
        path: "examples/input-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-field",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-field.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-fieldgroup",
    type: "registry:example",
    registryDependencies: ["button", "field", "input"],
    files: [
      {
        path: "examples/input-fieldgroup.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-disabled",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-invalid",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-file",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-file.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-inline",
    type: "registry:example",
    registryDependencies: ["button", "field", "input"],
    files: [
      {
        path: "examples/input-inline.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-grid",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-grid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-required",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-required.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-badge",
    type: "registry:example",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "examples/input-badge.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-input-group",
    type: "registry:example",
    registryDependencies: ["field", "input-group"],
    files: [
      {
        path: "examples/input-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-button-group",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "field", "input"],
    files: [
      {
        path: "examples/input-button-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-form",
    type: "registry:example",
    registryDependencies: ["button", "field", "input", "select"],
    files: [
      {
        path: "examples/input-form.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-example",
    type: "registry:example",
    registryDependencies: ["button", "item"],
    files: [
      {
        path: "examples/item-example.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-demo",
    type: "registry:example",
    registryDependencies: ["button", "item"],
    files: [
      {
        path: "examples/item-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-variant",
    type: "registry:example",
    registryDependencies: ["item"],
    files: [
      {
        path: "examples/item-variant.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-size",
    type: "registry:example",
    registryDependencies: ["item"],
    files: [
      {
        path: "examples/item-size.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-icon",
    type: "registry:example",
    registryDependencies: ["button", "item"],
    files: [
      {
        path: "examples/item-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-avatar",
    type: "registry:example",
    registryDependencies: ["button", "item"],
    files: [
      {
        path: "examples/item-avatar.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-image",
    type: "registry:example",
    registryDependencies: ["item"],
    files: [
      {
        path: "examples/item-image.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-group",
    type: "registry:example",
    registryDependencies: ["button", "item"],
    files: [
      {
        path: "examples/item-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-header",
    type: "registry:example",
    registryDependencies: ["item"],
    files: [
      {
        path: "examples/item-header.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-link",
    type: "registry:example",
    registryDependencies: ["item"],
    files: [
      {
        path: "examples/item-link.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-dropdown",
    type: "registry:example",
    registryDependencies: ["button", "dropdown-menu", "item"],
    files: [
      {
        path: "examples/item-dropdown.tsx",
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
    name: "kbd-group",
    type: "registry:example",
    registryDependencies: ["kbd"],
    files: [
      {
        path: "examples/kbd-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "kbd-button",
    type: "registry:example",
    registryDependencies: ["button", "kbd"],
    files: [
      {
        path: "examples/kbd-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "kbd-tooltip",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "kbd", "tooltip"],
    files: [
      {
        path: "examples/kbd-tooltip.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "kbd-input-group",
    type: "registry:example",
    registryDependencies: ["input-group", "kbd"],
    files: [
      {
        path: "examples/kbd-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "label-demo",
    type: "registry:example",
    registryDependencies: ["checkbox", "label"],
    files: [
      {
        path: "examples/label-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-choice-card",
    type: "registry:example",
    registryDependencies: ["field"],
    files: [
      {
        path: "examples/field-choice-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-checkbox",
    type: "registry:example",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "examples/field-checkbox.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "field-demo",
    type: "registry:example",
    registryDependencies: ["button", "checkbox", "field", "input", "select", "textarea"],
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
    name: "field-group",
    type: "registry:example",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "examples/field-group.tsx",
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
    registryDependencies: ["field"],
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
    registryDependencies: ["button", "field", "input", "textarea"],
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
    name: "pagination-simple",
    type: "registry:example",
    registryDependencies: ["pagination"],
    files: [
      {
        path: "examples/pagination-simple.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "pagination-icons-only",
    type: "registry:example",
    registryDependencies: ["pagination"],
    files: [
      {
        path: "examples/pagination-icons-only.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-demo",
    type: "registry:example",
    registryDependencies: ["button", "popover"],
    files: [
      {
        path: "examples/popover-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-basic",
    type: "registry:example",
    registryDependencies: ["button", "popover"],
    files: [
      {
        path: "examples/popover-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-alignments",
    type: "registry:example",
    registryDependencies: ["button", "popover"],
    files: [
      {
        path: "examples/popover-alignments.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-form",
    type: "registry:example",
    registryDependencies: ["button", "input", "label", "popover"],
    files: [
      {
        path: "examples/popover-form.tsx",
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
    name: "progress-label",
    type: "registry:example",
    registryDependencies: ["field", "progress"],
    files: [
      {
        path: "examples/progress-label.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "progress-controlled",
    type: "registry:example",
    registryDependencies: ["progress", "slider"],
    files: [
      {
        path: "examples/progress-controlled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-demo",
    type: "registry:example",
    registryDependencies: ["label", "radio-group"],
    files: [
      {
        path: "examples/radio-group-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-description",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/radio-group-description.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-choice-card",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/radio-group-choice-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-fieldset",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/radio-group-fieldset.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-disabled",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/radio-group-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "radio-group-invalid",
    type: "registry:example",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "examples/radio-group-invalid.tsx",
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
    name: "separator-vertical",
    type: "registry:example",
    registryDependencies: ["separator"],
    files: [
      {
        path: "examples/separator-vertical.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "separator-menu",
    type: "registry:example",
    registryDependencies: ["separator"],
    files: [
      {
        path: "examples/separator-menu.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "separator-list",
    type: "registry:example",
    registryDependencies: ["separator"],
    files: [
      {
        path: "examples/separator-list.tsx",
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
    name: "select-groups",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-groups.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "select-scrollable",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-scrollable.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "select-disabled",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "select-invalid",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sidebar-demo",
    type: "registry:example",
    meta: { docs: { blockPreview: true } },
    registryDependencies: ["sidebar"],
    files: [
      {
        path: "examples/sidebar-demo.tsx",
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
    name: "skeleton-avatar",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-avatar.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "skeleton-card",
    type: "registry:example",
    registryDependencies: ["card", "skeleton"],
    files: [
      {
        path: "examples/skeleton-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "skeleton-text",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-text.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "skeleton-form",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-form.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "skeleton-table",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-table.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-demo",
    type: "registry:example",
    registryDependencies: ["item", "spinner"],
    files: [
      {
        path: "examples/spinner-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-custom",
    type: "registry:example",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "examples/spinner-custom.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-size",
    type: "registry:example",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "examples/spinner-size.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-button",
    type: "registry:example",
    registryDependencies: ["button", "spinner"],
    files: [
      {
        path: "examples/spinner-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-badge",
    type: "registry:example",
    registryDependencies: ["badge", "spinner"],
    files: [
      {
        path: "examples/spinner-badge.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-input-group",
    type: "registry:example",
    registryDependencies: ["input-group", "spinner"],
    files: [
      {
        path: "examples/spinner-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-empty",
    type: "registry:example",
    registryDependencies: ["button", "spinner"],
    files: [
      {
        path: "examples/spinner-empty.tsx",
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
    name: "slider-range",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-range.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "slider-multiple",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-multiple.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "slider-vertical",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-vertical.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "slider-controlled",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-controlled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "slider-disabled",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-disabled.tsx",
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
    name: "input-group-inline-start",
    type: "registry:example",
    registryDependencies: ["field", "input-group"],
    files: [
      {
        path: "examples/input-group-inline-start.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-inline-end",
    type: "registry:example",
    registryDependencies: ["field", "input-group"],
    files: [
      {
        path: "examples/input-group-inline-end.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-block-start",
    type: "registry:example",
    registryDependencies: ["field", "input-group"],
    files: [
      {
        path: "examples/input-group-block-start.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-block-end",
    type: "registry:example",
    registryDependencies: ["field", "input-group"],
    files: [
      {
        path: "examples/input-group-block-end.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-icon",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-icon.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-text",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-text.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-button",
    type: "registry:example",
    registryDependencies: ["input-group", "popover"],
    files: [
      {
        path: "examples/input-group-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-kbd",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-kbd.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-dropdown",
    type: "registry:example",
    registryDependencies: ["dropdown-menu", "input-group"],
    files: [
      {
        path: "examples/input-group-dropdown.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-spinner",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-spinner.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-textarea",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-textarea.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-group-custom",
    type: "registry:example",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "examples/input-group-custom.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tabs-demo",
    type: "registry:example",
    registryDependencies: ["card", "tabs"],
    files: [
      {
        path: "examples/tabs-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tabs-line",
    type: "registry:example",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "examples/tabs-line.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tabs-vertical",
    type: "registry:example",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "examples/tabs-vertical.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tabs-disabled",
    type: "registry:example",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "examples/tabs-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tabs-icons",
    type: "registry:example",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "examples/tabs-icons.tsx",
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
    name: "table-footer",
    type: "registry:example",
    registryDependencies: ["table"],
    files: [
      {
        path: "examples/table-footer.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "table-actions",
    type: "registry:example",
    registryDependencies: ["button", "table"],
    files: [
      {
        path: "examples/table-actions.tsx",
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
    name: "toggle-outline",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-outline.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-text",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-text.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-sizes",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-sizes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-disabled",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-disabled.tsx",
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
    name: "toggle-group-outline",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-outline.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-sizes",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-sizes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-spacing",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-spacing.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-vertical",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-vertical.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-disabled",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-font-weight-selector",
    type: "registry:example",
    registryDependencies: ["field", "toggle-group"],
    files: [
      {
        path: "examples/toggle-group-font-weight-selector.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-demo",
    type: "registry:example",
    registryDependencies: ["label", "switch"],
    files: [
      {
        path: "examples/switch-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-description",
    type: "registry:example",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "examples/switch-description.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-choice-card",
    type: "registry:example",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "examples/switch-choice-card.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-disabled",
    type: "registry:example",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "examples/switch-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-invalid",
    type: "registry:example",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "examples/switch-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "switch-sizes",
    type: "registry:example",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "examples/switch-sizes.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "examples/tooltip-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tooltip-sides",
    type: "registry:example",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "examples/tooltip-sides.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tooltip-keyboard",
    type: "registry:example",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "examples/tooltip-keyboard.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "tooltip-disabled",
    type: "registry:example",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "examples/tooltip-disabled.tsx",
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
    name: "textarea-field",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/textarea-field.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "textarea-disabled",
    type: "registry:example",
    registryDependencies: ["field", "textarea"],
    files: [
      {
        path: "examples/textarea-disabled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "textarea-invalid",
    type: "registry:example",
    registryDependencies: ["field", "textarea"],
    files: [
      {
        path: "examples/textarea-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "textarea-button",
    type: "registry:example",
    registryDependencies: ["button", "textarea"],
    files: [
      {
        path: "examples/textarea-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-demo",
    type: "registry:example",
    registryDependencies: ["button", "empty"],
    files: [
      {
        path: "examples/empty-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-outline",
    type: "registry:example",
    registryDependencies: ["button", "empty"],
    files: [
      {
        path: "examples/empty-outline.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-background",
    type: "registry:example",
    registryDependencies: ["button", "empty"],
    files: [
      {
        path: "examples/empty-background.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-avatar",
    type: "registry:example",
    registryDependencies: ["avatar", "button", "empty"],
    files: [
      {
        path: "examples/empty-avatar.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-avatar-group",
    type: "registry:example",
    registryDependencies: ["avatar", "button", "empty"],
    files: [
      {
        path: "examples/empty-avatar-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-input-group",
    type: "registry:example",
    registryDependencies: ["empty", "input-group", "kbd"],
    files: [
      {
        path: "examples/empty-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "attachment-group",
    type: "registry:example",
    registryDependencies: ["attachment"],
    files: [{ path: "examples/attachment-group.tsx", type: "registry:example" }]
  },
  {
    name: "attachment-sizes",
    type: "registry:example",
    registryDependencies: ["attachment"],
    files: [{ path: "examples/attachment-sizes.tsx", type: "registry:example" }]
  },
  {
    name: "attachment-trigger",
    type: "registry:example",
    registryDependencies: ["attachment", "dialog"],
    files: [{ path: "examples/attachment-trigger.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-alignment",
    type: "registry:example",
    registryDependencies: ["bubble"],
    files: [{ path: "examples/bubble-alignment.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-group-demo",
    type: "registry:example",
    registryDependencies: ["bubble"],
    files: [{ path: "examples/bubble-group-demo.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-reactions",
    type: "registry:example",
    registryDependencies: ["sonner", "bubble", "button"],
    files: [{ path: "examples/bubble-reactions.tsx", type: "registry:example" }]
  },
  {
    name: "card-edge-to-edge",
    type: "registry:example",
    registryDependencies: ["button", "card"],
    files: [{ path: "examples/card-edge-to-edge.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-basic",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-basic.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-destructive",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-destructive.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-floating-actions",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-floating-actions.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-header",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-header.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-height",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-height.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-highlighted-lines",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-highlighted-lines.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-line-numbers",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-line-numbers.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-size",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-size.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-trace",
    type: "registry:example",
    registryDependencies: ["code-block", "trace"],
    files: [{ path: "examples/code-block-trace.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-wrap",
    type: "registry:example",
    registryDependencies: ["code-block"],
    files: [{ path: "examples/code-block-wrap.tsx", type: "registry:example" }]
  },
  {
    name: "marker-border",
    type: "registry:example",
    registryDependencies: ["marker"],
    files: [{ path: "examples/marker-border.tsx", type: "registry:example" }]
  },
  {
    name: "marker-icon",
    type: "registry:example",
    registryDependencies: ["marker"],
    files: [{ path: "examples/marker-icon.tsx", type: "registry:example" }]
  },
  {
    name: "marker-separator",
    type: "registry:example",
    registryDependencies: ["marker"],
    files: [{ path: "examples/marker-separator.tsx", type: "registry:example" }]
  },
  {
    name: "marker-shimmer",
    type: "registry:example",
    registryDependencies: ["marker"],
    files: [{ path: "examples/marker-shimmer.tsx", type: "registry:example" }]
  },
  {
    name: "marker-status",
    type: "registry:example",
    registryDependencies: ["marker", "spinner"],
    files: [{ path: "examples/marker-status.tsx", type: "registry:example" }]
  },
  {
    name: "marker-variants",
    type: "registry:example",
    registryDependencies: ["marker"],
    files: [{ path: "examples/marker-variants.tsx", type: "registry:example" }]
  },
  {
    name: "message-actions",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "message"],
    files: [{ path: "examples/message-actions.tsx", type: "registry:example" }]
  },
  {
    name: "message-attachment",
    type: "registry:example",
    registryDependencies: ["attachment", "bubble", "message"],
    files: [{ path: "examples/message-attachment.tsx", type: "registry:example" }]
  },
  {
    name: "message-avatar",
    type: "registry:example",
    registryDependencies: ["avatar", "bubble", "message"],
    files: [{ path: "examples/message-avatar.tsx", type: "registry:example" }]
  },
  {
    name: "message-group",
    type: "registry:example",
    registryDependencies: ["avatar", "bubble", "message"],
    files: [{ path: "examples/message-group.tsx", type: "registry:example" }]
  },
  {
    name: "message-header-footer",
    type: "registry:example",
    registryDependencies: ["bubble", "message"],
    files: [{ path: "examples/message-header-footer.tsx", type: "registry:example" }]
  },
  {
    name: "resizable-handle",
    type: "registry:example",
    registryDependencies: ["resizable"],
    files: [{ path: "examples/resizable-handle.tsx", type: "registry:example" }]
  },
  {
    name: "sonner-description",
    type: "registry:example",
    registryDependencies: ["sonner", "button"],
    files: [{ path: "examples/sonner-description.tsx", type: "registry:example" }]
  },
  {
    name: "sonner-position",
    type: "registry:example",
    registryDependencies: ["sonner", "button"],
    files: [{ path: "examples/sonner-position.tsx", type: "registry:example" }]
  },
  {
    name: "sonner-types",
    type: "registry:example",
    registryDependencies: ["sonner", "button"],
    files: [{ path: "examples/sonner-types.tsx", type: "registry:example" }]
  },
  {
    name: "trace-collapsible",
    type: "registry:example",
    registryDependencies: ["code-block", "trace"],
    files: [{ path: "examples/trace-collapsible.tsx", type: "registry:example" }]
  },
  {
    name: "trace-commit",
    type: "registry:example",
    registryDependencies: ["code-block", "sheet", "trace"],
    files: [{ path: "examples/trace-commit.tsx", type: "registry:example" }]
  },
  {
    name: "trace-dialog",
    type: "registry:example",
    registryDependencies: ["dialog", "trace"],
    files: [{ path: "examples/trace-dialog.tsx", type: "registry:example" }]
  },
  {
    name: "trace-group",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [{ path: "examples/trace-group.tsx", type: "registry:example" }]
  },
  {
    name: "trace-link",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [{ path: "examples/trace-link.tsx", type: "registry:example" }]
  },
  {
    name: "trace-sheet",
    type: "registry:example",
    registryDependencies: ["sheet", "trace"],
    files: [{ path: "examples/trace-sheet.tsx", type: "registry:example" }]
  },
  {
    name: "trace-sources",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [{ path: "examples/trace-sources.tsx", type: "registry:example" }]
  },
  {
    name: "trace-static",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [{ path: "examples/trace-static.tsx", type: "registry:example" }]
  },
  {
    name: "trace-status",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [{ path: "examples/trace-status.tsx", type: "registry:example" }]
  },
  {
    name: "trace-steps",
    type: "registry:example",
    registryDependencies: ["badge", "code-block", "trace"],
    files: [{ path: "examples/trace-steps.tsx", type: "registry:example" }]
  },
  {
    name: "trace-turn",
    type: "registry:example",
    registryDependencies: ["code-block", "trace"],
    files: [{ path: "examples/trace-turn.tsx", type: "registry:example" }]
  },
  {
    name: "typography-blockquote",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-blockquote.tsx", type: "registry:example" }]
  },
  {
    name: "typography-demo",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-demo.tsx", type: "registry:example" }]
  },
  {
    name: "typography-h1",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-h1.tsx", type: "registry:example" }]
  },
  {
    name: "typography-h2",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-h2.tsx", type: "registry:example" }]
  },
  {
    name: "typography-h3",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-h3.tsx", type: "registry:example" }]
  },
  {
    name: "typography-h4",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-h4.tsx", type: "registry:example" }]
  },
  {
    name: "typography-inline-code",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-inline-code.tsx", type: "registry:example" }]
  },
  {
    name: "typography-large",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-large.tsx", type: "registry:example" }]
  },
  {
    name: "typography-lead",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-lead.tsx", type: "registry:example" }]
  },
  {
    name: "typography-list",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-list.tsx", type: "registry:example" }]
  },
  {
    name: "typography-muted",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-muted.tsx", type: "registry:example" }]
  },
  {
    name: "typography-p",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-p.tsx", type: "registry:example" }]
  },
  {
    name: "typography-small",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-small.tsx", type: "registry:example" }]
  },
  {
    name: "typography-table",
    type: "registry:example",
    registryDependencies: [],
    files: [{ path: "examples/typography-table.tsx", type: "registry:example" }]
  },
  {
    name: "attachment-image",
    type: "registry:example",
    registryDependencies: ["attachment"],
    files: [{ path: "examples/attachment-image.tsx", type: "registry:example" }]
  },
  {
    name: "scroll-area-horizontal-demo",
    type: "registry:example",
    registryDependencies: ["scroll-area"],
    files: [{ path: "examples/scroll-area-horizontal-demo.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-collapsible",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "collapsible"],
    files: [{ path: "examples/bubble-collapsible.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-popover",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "popover"],
    files: [{ path: "examples/bubble-popover.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-tooltip",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "tooltip"],
    files: [{ path: "examples/bubble-tooltip.tsx", type: "registry:example" }]
  },
  {
    name: "card-spacing",
    type: "registry:example",
    registryDependencies: ["button", "card", "input", "label", "toggle-group"],
    files: [{ path: "examples/card-spacing.tsx", type: "registry:example" }]
  },
  {
    name: "carousel-orientation",
    type: "registry:example",
    registryDependencies: ["card", "carousel"],
    files: [{ path: "examples/carousel-orientation.tsx", type: "registry:example" }]
  },
  {
    name: "carousel-size",
    type: "registry:example",
    registryDependencies: ["card", "carousel"],
    files: [{ path: "examples/carousel-size.tsx", type: "registry:example" }]
  },
  {
    name: "carousel-spacing",
    type: "registry:example",
    registryDependencies: ["card", "carousel"],
    files: [{ path: "examples/carousel-spacing.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-ansi",
    type: "registry:example",
    registryDependencies: ["code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-ansi.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-highlighting",
    type: "registry:example",
    registryDependencies: ["code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-highlighting.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-languages",
    type: "registry:example",
    registryDependencies: ["code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-languages.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-start-line",
    type: "registry:example",
    registryDependencies: ["code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-start-line.tsx", type: "registry:example" }]
  },
  {
    name: "drawer-scrollable-content",
    type: "registry:example",
    registryDependencies: ["button", "drawer"],
    files: [{ path: "examples/drawer-scrollable-content.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-alphanumeric",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [{ path: "examples/input-otp-alphanumeric.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-controlled",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [{ path: "examples/input-otp-controlled.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-form",
    type: "registry:example",
    registryDependencies: ["button", "card", "field", "input-otp"],
    files: [{ path: "examples/input-otp-form.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-four-digits",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [{ path: "examples/input-otp-four-digits.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-invalid",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [{ path: "examples/input-otp-invalid.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-pattern",
    type: "registry:example",
    registryDependencies: ["field", "input-otp"],
    files: [{ path: "examples/input-otp-pattern.tsx", type: "registry:example" }]
  },
  {
    name: "input-otp-separator",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [{ path: "examples/input-otp-separator.tsx", type: "registry:example" }]
  },
  {
    name: "trace-open",
    type: "registry:example",
    registryDependencies: ["button", "code-block", "trace"],
    files: [{ path: "examples/trace-open.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-variants",
    type: "registry:example",
    registryDependencies: ["bubble"],
    files: [{ path: "examples/bubble-variants.tsx", type: "registry:example" }]
  },
  {
    name: "bubble-link-button",
    type: "registry:example",
    registryDependencies: ["bubble", "sonner"],
    files: [{ path: "examples/bubble-link-button.tsx", type: "registry:example" }]
  },
  {
    name: "marker-link-button",
    type: "registry:example",
    registryDependencies: ["marker", "sonner"],
    files: [{ path: "examples/marker-link-button.tsx", type: "registry:example" }]
  },
  {
    name: "carousel-api",
    type: "registry:example",
    registryDependencies: ["card", "carousel"],
    files: [{ path: "examples/carousel-api.tsx", type: "registry:example" }]
  },
  {
    name: "carousel-plugin",
    type: "registry:example",
    registryDependencies: ["card", "carousel"],
    files: [{ path: "examples/carousel-plugin.tsx", type: "registry:example" }]
  },
  {
    name: "select-align-item",
    type: "registry:example",
    registryDependencies: ["field", "select", "switch"],
    files: [{ path: "examples/select-align-item.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-basic",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [{ path: "examples/calendar-basic.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-booked-dates",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [{ path: "examples/calendar-booked-dates.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-presets",
    type: "registry:example",
    registryDependencies: ["calendar", "button"],
    files: [{ path: "examples/calendar-presets.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-time",
    type: "registry:example",
    registryDependencies: ["calendar", "field", "input-group"],
    files: [{ path: "examples/calendar-time.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-caption",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [{ path: "examples/calendar-caption.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-custom-days",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [{ path: "examples/calendar-custom-days.tsx", type: "registry:example" }]
  },
  {
    name: "date-picker-basic",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "field", "popover"],
    files: [{ path: "examples/date-picker-basic.tsx", type: "registry:example" }]
  },
  {
    name: "date-picker-range",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "field", "popover"],
    files: [{ path: "examples/date-picker-range.tsx", type: "registry:example" }]
  },
  {
    name: "date-picker-dob",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "field", "popover"],
    files: [{ path: "examples/date-picker-dob.tsx", type: "registry:example" }]
  },
  {
    name: "date-picker-input",
    type: "registry:example",
    registryDependencies: ["calendar", "field", "input-group", "popover"],
    files: [{ path: "examples/date-picker-input.tsx", type: "registry:example" }]
  },
  {
    name: "date-picker-time",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "field", "input", "popover"],
    files: [{ path: "examples/date-picker-time.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-multiple",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-multiple.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-freeform",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-freeform.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-animated",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-animated.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-controlled",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-controlled.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-resume",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner", "button"],
    files: [{ path: "examples/questionnaire-resume.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-skip",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-skip.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-actions",
    type: "registry:example",
    registryDependencies: ["button", "code-block"],
    files: [{ path: "examples/code-block-actions.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-example",
    title: "Message Scroller",
    type: "registry:example",
    registryDependencies: [
      "message-scroller",
      "message",
      "bubble",
      "marker",
      "button",
      "card",
      "message-scroller-demo"
    ],
    files: [{ path: "examples/message-scroller-example.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-anchoring",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-anchoring.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-group-chat",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-group-chat.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-previous-context",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-previous-context.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-streaming",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-streaming.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-opening-position",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-opening-position.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-load-history",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-load-history.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-animation",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-animation.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-commands",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-commands.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-visibility",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-visibility.tsx", type: "registry:example" }]
  },
  {
    name: "message-scroller-scrollable",
    type: "registry:example",
    registryDependencies: ["message-scroller-example"],
    files: [{ path: "examples/message-scroller-scrollable.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-shortcuts",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-shortcuts.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-validation",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-validation.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-conditional",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-conditional.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-navigation-state",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-navigation-state.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-progress",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner"],
    files: [{ path: "examples/questionnaire-progress.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-card",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner", "card"],
    files: [{ path: "examples/questionnaire-card.tsx", type: "registry:example" }]
  },
  {
    name: "questionnaire-dialog",
    type: "registry:example",
    registryDependencies: ["questionnaire", "sonner", "dialog", "button"],
    files: [{ path: "examples/questionnaire-dialog.tsx", type: "registry:example" }]
  },
  {
    name: "calendar-week-numbers",
    type: "registry:example",
    registryDependencies: ["calendar", "card"],
    files: [{ path: "examples/calendar-week-numbers.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-chat",
    type: "registry:example",
    registryDependencies: ["bubble", "code-block", "message", "use-highlighted-code"],
    files: [{ path: "examples/code-block-chat.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-markdown",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "code-block", "message", "use-highlighted-code"],
    files: [{ path: "examples/code-block-markdown.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-show-more-scroll",
    type: "registry:example",
    registryDependencies: ["button", "code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-show-more-scroll.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-show-more",
    type: "registry:example",
    registryDependencies: ["button", "code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-show-more.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-streaming",
    type: "registry:example",
    registryDependencies: ["button", "code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-streaming.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-tabs",
    type: "registry:example",
    registryDependencies: ["code-block", "tabs", "use-highlighted-code"],
    files: [{ path: "examples/code-block-tabs.tsx", type: "registry:example" }]
  },
  {
    name: "code-block-typeset",
    type: "registry:example",
    registryDependencies: ["code-block", "use-highlighted-code"],
    files: [{ path: "examples/code-block-typeset.tsx", type: "registry:example" }]
  },
  {
    name: "date-picker-natural-language",
    type: "registry:example",
    dependencies: ["chrono-node"],
    registryDependencies: ["calendar", "field", "input-group", "popover"],
    files: [{ path: "examples/date-picker-natural-language.tsx", type: "registry:example" }]
  },
  {
    name: "drawer-dialog",
    type: "registry:example",
    registryDependencies: ["button", "dialog", "drawer", "input", "label", "use-mobile"],
    files: [{ path: "examples/drawer-dialog.tsx", type: "registry:example" }]
  },
  {
    name: "trace-description",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [{ path: "examples/trace-description.tsx", type: "registry:example" }]
  },
  {
    name: "trace-thinking",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "message", "trace"],
    files: [{ path: "examples/trace-thinking.tsx", type: "registry:example" }]
  },
  {
    name: "trace-tool-calls",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "message", "trace"],
    files: [{ path: "examples/trace-tool-calls.tsx", type: "registry:example" }]
  }
]
