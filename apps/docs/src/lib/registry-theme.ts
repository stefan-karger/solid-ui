export function adaptTheme(source: string, extension: string) {
  const slots: Record<string, string> = {
    "accordion-content": "accordion-panel",
    "tabs-trigger": "tabs-tab",
    "tabs-content": "tabs-panel",
    "slider-range": "slider-indicator",
    "radio-group-item": "radio",
    "dropdown-menu-content": "menu-content"
  }
  let css = source.replace(
    /(slot=)([a-z-]+)(?=\])/g,
    (_, prefix, slot: string) => `${prefix}${slots[slot] ?? slot}`
  )
  css = css
    .replaceAll("data-horizontal:", "data-[orientation=horizontal]:")
    .replaceAll("data-vertical:", "data-[orientation=vertical]:")
    .replaceAll("data-closed:", "data-ending-style:")
    .replaceAll("**:[[cmdk-group-heading]]:", "**:data-[slot=command-group-label]:")
    .replaceAll("[data-slot=input-group-control]", "[data-ui=input-group-control]")
    .replaceAll("group-data-empty/combobox-content:", "data-empty:")
    .replaceAll("data-[vaul-drawer-direction=", "data-[side=")
  css = css.replace(
    /(\.cn-input-otp-slot\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start + body.replaceAll("data-[active=true]:", "data-active:") + end
  )
  css = css.replace(
    /(\.cn-switch-thumb\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body.replace(
        /(\S*data-(?:checked|unchecked):)(translate-x-[^\s;]+)/g,
        (_, prefix: string, translation: string) =>
          `${prefix}ltr:${translation} ${prefix}rtl:-${translation}`
      ) +
      end
  )
  css = css.replace(
    /(\.cn-combobox-list\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body.replaceAll(
        "data-empty:",
        "group-has-[[data-slot=combobox-empty][data-empty]]/combobox-content:"
      ) +
      end
  )
  // The SDK list can contain ungrouped items as well as groups.
  css = css.replace(
    /(\.cn-select-group\s*\{\s*@apply\s+)([^;]+)(;\s*\})/g,
    (_, start: string, utilities: string, end: string) => {
      const classes = utilities.trim().split(/\s+/)
      const padding = classes.find((name) => /^p-[\d.]+$/.test(name))
      return `${start}${classes.filter((name) => name !== padding).join(" ")}${end}\n\n  .cn-select-list { @apply ${padding ?? "p-1"}; }`
    }
  )
  css = css.replace(
    /(\.cn-navigation-menu-link\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body
        .replaceAll("data-[active=true]:", "data-current:")
        .replaceAll("data-active:", "data-current:") +
      end
  )
  css = css.replace(
    /(\.cn-button-group(?:-orientation-(?:horizontal|vertical))?\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body.replaceAll(
        "[data-slot]",
        "[data-slot]:not([aria-hidden=true],[type=hidden],[popover],[data-presentation])"
      ) +
      end
  )
  css = css.replace(
    /(\.cn-navigation-menu-indicator\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body
        .replaceAll("data-[state=visible]:", "data-visible:")
        .replaceAll("data-[state=hidden]:", "not-data-visible:") +
      end
  )
  css = css.replace(
    /(\.cn-(?:tabs-trigger|command-item|command-shortcut)\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body
        .replaceAll("data-active:", "data-selected:")
        .replaceAll("data-selected/command-item:", "data-highlighted/command-item:")
        .replaceAll(
          "data-selected:",
          start.includes("tabs-trigger") ? "data-selected:" : "data-highlighted:"
        ) +
      end
  )
  css = css.replace(
    /(\.cn-slider-thumb\s*\{)([^}]*)(\})/g,
    (_, start: string, body: string, end: string) =>
      start +
      body
        .replaceAll("focus-visible:", "has-[:focus-visible]:")
        .replace(/(?<![\w-])active:/g, "data-dragging:") +
      end
  )
  // shadcn's named selected variant expects data-selected="true". SDK parts
  // use attribute presence, so generate an explicit Tailwind data variant.
  return css
    .replace(/}\s*$/, `${extension}\n}\n`)
    .replace(/\bdata-selected(?=[:/])/g, "data-[selected]")
}
