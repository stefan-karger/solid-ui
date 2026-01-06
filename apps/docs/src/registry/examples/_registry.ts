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
