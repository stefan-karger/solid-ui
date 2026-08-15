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
    registryDependencies: ["alert-dialog", "button"],
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
    name: "breadcrumb-collapsed",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-collapsed.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-demo",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "breadcrumb-dropdown",
    type: "registry:example",
    registryDependencies: ["breadcrumb", "dropdown-menu", "button"],
    files: [
      {
        path: "examples/breadcrumb-dropdown.tsx",
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
    registryDependencies: ["button", "button-group", "input-group"],
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
    name: "button-group-select",
    type: "registry:example",
    registryDependencies: ["button", "button-group", "select"],
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
    name: "carousel-api",
    type: "registry:example",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "examples/carousel-api.tsx",
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
    name: "carousel-orientation",
    type: "registry:example",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "examples/carousel-orientation.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "carousel-plugin",
    type: "registry:example",
    dependencies: ["embla-carousel-autoplay"],
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "examples/carousel-plugin.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "carousel-size",
    type: "registry:example",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "examples/carousel-size.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "carousel-spacing",
    type: "registry:example",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "examples/carousel-spacing.tsx",
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
    name: "combobox-groups-separator",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/combobox-groups-separator.tsx",
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
    registryDependencies: ["combobox", "field"],
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
    name: "combobox-dialog",
    type: "registry:example",
    registryDependencies: ["combobox", "dialog", "field", "button"],
    files: [
      {
        path: "examples/combobox-dialog.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-close-button",
    type: "registry:example",
    registryDependencies: ["dialog", "button"],
    files: [
      {
        path: "examples/dialog-close-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "dialog-demo",
    type: "registry:example",
    registryDependencies: ["dialog", "button", "field", "input"],
    files: [
      {
        path: "examples/dialog-demo.tsx",
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
    name: "context-menu-radio-group",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/context-menu-radio-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "drawer-demo",
    type: "registry:example",
    registryDependencies: ["drawer", "badge", "button", "field", "radio-group", "use-mobile"],
    files: [
      {
        path: "examples/drawer-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "drawer-position",
    type: "registry:example",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "examples/drawer-position.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "drawer-nested",
    type: "registry:example",
    registryDependencies: ["drawer", "button", "use-mobile"],
    files: [
      {
        path: "examples/drawer-nested.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "drawer-non-modal",
    type: "registry:example",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "examples/drawer-non-modal.tsx",
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
    name: "empty-outline",
    type: "registry:example",
    registryDependencies: ["empty", "button"],
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
    registryDependencies: ["empty", "button"],
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
    registryDependencies: ["empty", "avatar", "button"],
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
    registryDependencies: ["empty", "avatar", "button"],
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
    registryDependencies: ["empty", "input-group", "button"],
    files: [
      {
        path: "examples/empty-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "empty-rtl",
    type: "registry:example",
    registryDependencies: ["empty", "button", "rtl"],
    files: [
      {
        path: "examples/empty-rtl.tsx",
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
    registryDependencies: ["hover-card", "button"],
    files: [
      {
        path: "examples/hover-card-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "hover-card-placement",
    type: "registry:example",
    registryDependencies: ["hover-card", "button"],
    files: [
      {
        path: "examples/hover-card-placement.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "hover-card-rtl",
    type: "registry:example",
    registryDependencies: ["hover-card", "button", "rtl"],
    files: [
      {
        path: "examples/hover-card-rtl.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-demo",
    type: "registry:example",
    registryDependencies: ["input", "field"],
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
    registryDependencies: ["input", "field"],
    files: [
      {
        path: "examples/input-field.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-field-group",
    type: "registry:example",
    registryDependencies: ["input", "field", "button"],
    files: [
      {
        path: "examples/input-field-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-disabled",
    type: "registry:example",
    registryDependencies: ["input", "field"],
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
    registryDependencies: ["input", "field"],
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
    registryDependencies: ["input", "field"],
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
    registryDependencies: ["input", "field", "button"],
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
    registryDependencies: ["input", "field"],
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
    registryDependencies: ["input", "field"],
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
    registryDependencies: ["input", "field", "badge"],
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
    registryDependencies: ["input", "input-group", "field"],
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
    registryDependencies: ["input", "field", "button", "button-group"],
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
    registryDependencies: ["input", "field", "button", "select"],
    files: [
      {
        path: "examples/input-form.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-rtl",
    type: "registry:example",
    registryDependencies: ["input", "field", "rtl"],
    files: [
      {
        path: "examples/input-rtl.tsx",
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
    name: "input-otp-pattern",
    type: "registry:example",
    dependencies: ["input-otp"],
    registryDependencies: ["input-otp", "field"],
    files: [
      {
        path: "examples/input-otp-pattern.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-separator",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-separator.tsx",
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
    name: "input-otp-controlled",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-controlled.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-invalid",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-invalid.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-four-digits",
    type: "registry:example",
    dependencies: ["input-otp"],
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-four-digits.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-alphanumeric",
    type: "registry:example",
    dependencies: ["input-otp"],
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-alphanumeric.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-form",
    type: "registry:example",
    registryDependencies: ["input-otp", "button", "card", "field"],
    files: [
      {
        path: "examples/input-otp-form.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "input-otp-rtl",
    type: "registry:example",
    registryDependencies: ["input-otp", "field", "rtl"],
    files: [
      {
        path: "examples/input-otp-rtl.tsx",
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
    registryDependencies: ["item", "button"],
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
    registryDependencies: ["avatar", "button", "item"],
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
    registryDependencies: ["avatar", "button", "item"],
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
    registryDependencies: ["avatar", "button", "dropdown-menu", "item"],
    files: [
      {
        path: "examples/item-dropdown.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "item-rtl",
    type: "registry:example",
    registryDependencies: ["button", "item", "rtl"],
    files: [
      {
        path: "examples/item-rtl.tsx",
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
    registryDependencies: ["kbd", "button"],
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
    registryDependencies: ["kbd", "button", "button-group", "tooltip"],
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
    registryDependencies: ["kbd", "input-group"],
    files: [
      {
        path: "examples/kbd-input-group.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "kbd-rtl",
    type: "registry:example",
    registryDependencies: ["kbd", "rtl"],
    files: [
      {
        path: "examples/kbd-rtl.tsx",
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
    name: "menubar-rtl",
    type: "registry:example",
    registryDependencies: ["menubar", "rtl"],
    files: [
      {
        path: "examples/menubar-rtl.tsx",
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
    name: "native-select-rtl",
    type: "registry:example",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "examples/native-select-rtl.tsx",
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
    name: "navigation-menu-rtl",
    type: "registry:example",
    registryDependencies: ["navigation-menu", "rtl"],
    files: [
      {
        path: "examples/navigation-menu-rtl.tsx",
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
    registryDependencies: ["pagination", "field", "select"],
    files: [
      {
        path: "examples/pagination-icons-only.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "pagination-rtl",
    type: "registry:example",
    registryDependencies: ["pagination", "rtl"],
    files: [
      {
        path: "examples/pagination-rtl.tsx",
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
    name: "popover-basic",
    type: "registry:example",
    registryDependencies: ["popover", "button"],
    files: [
      {
        path: "examples/popover-basic.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-form",
    type: "registry:example",
    registryDependencies: ["popover", "button", "input", "field"],
    files: [
      {
        path: "examples/popover-form.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-placement",
    type: "registry:example",
    registryDependencies: ["popover", "button"],
    files: [
      {
        path: "examples/popover-placement.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "popover-rtl",
    type: "registry:example",
    registryDependencies: ["popover", "button", "rtl"],
    files: [
      {
        path: "examples/popover-rtl.tsx",
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
    registryDependencies: ["progress"],
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
    name: "progress-rtl",
    type: "registry:example",
    registryDependencies: ["progress", "rtl"],
    files: [
      {
        path: "examples/progress-rtl.tsx",
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
    name: "separator-rtl",
    type: "registry:example",
    registryDependencies: ["separator", "rtl"],
    files: [
      {
        path: "examples/separator-rtl.tsx",
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
    name: "sheet-side",
    type: "registry:example",
    registryDependencies: ["sheet", "button"],
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
    registryDependencies: ["sheet", "button"],
    files: [
      {
        path: "examples/sheet-no-close-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "sheet-rtl",
    type: "registry:example",
    registryDependencies: ["sheet", "button", "field", "input", "rtl"],
    files: [
      {
        path: "examples/sheet-rtl.tsx",
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
    registryDependencies: ["spinner", "button"],
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
    registryDependencies: ["spinner", "badge"],
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
    registryDependencies: ["spinner", "input-group"],
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
    registryDependencies: ["spinner", "button", "empty"],
    files: [
      {
        path: "examples/spinner-empty.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "spinner-rtl",
    type: "registry:example",
    registryDependencies: ["spinner", "item", "rtl"],
    files: [
      {
        path: "examples/spinner-rtl.tsx",
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
    registryDependencies: ["table", "dropdown-menu", "button"],
    files: [
      {
        path: "examples/table-actions.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "table-rtl",
    type: "registry:example",
    registryDependencies: ["table", "rtl"],
    files: [
      {
        path: "examples/table-rtl.tsx",
        type: "registry:example"
      }
    ]
  },
    {
    name: "tabs-demo",
    type: "registry:example",
    registryDependencies: ["tabs", "card"],
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
    name: "tabs-rtl",
    type: "registry:example",
    registryDependencies: ["tabs", "card", "rtl"],
    files: [
      {
        path: "examples/tabs-rtl.tsx",
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
    registryDependencies: ["textarea", "field"],
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
    registryDependencies: ["textarea", "field"],
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
    registryDependencies: ["textarea", "field"],
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
    registryDependencies: ["textarea", "button"],
    files: [
      {
        path: "examples/textarea-button.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "textarea-rtl",
    type: "registry:example",
    registryDependencies: ["textarea", "field", "rtl"],
    files: [
      {
        path: "examples/textarea-rtl.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toast-demo",
    type: "registry:example",
    dependencies: ["solid-sonner"],
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/toast-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toast-types",
    type: "registry:example",
    dependencies: ["solid-sonner"],
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/toast-types.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toast-promise",
    type: "registry:example",
    dependencies: ["solid-sonner"],
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/toast-promise.tsx",
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
    name: "toggle-with-text",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-with-text.tsx",
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
    name: "toggle-rtl",
    type: "registry:example",
    registryDependencies: ["toggle", "rtl"],
    files: [
      {
        path: "examples/toggle-rtl.tsx",
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
    name: "toggle-group-custom",
    type: "registry:example",
    registryDependencies: ["toggle-group", "field"],
    files: [
      {
        path: "examples/toggle-group-custom.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "toggle-group-rtl",
    type: "registry:example",
    registryDependencies: ["toggle-group", "rtl"],
    files: [
      {
        path: "examples/toggle-group-rtl.tsx",
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
  }
]
