let collapsibleId = 0

function initializeCodeCollapsible(root: HTMLElement) {
  if (root.dataset.initialized === "true") return
  root.dataset.initialized = "true"

  const content = root.querySelector<HTMLElement>("[data-code-content]")
  const toggles = root.querySelectorAll<HTMLButtonElement>("[data-code-toggle]")
  if (!content || !toggles.length) return

  content.id ||= `code-collapsible-${++collapsibleId}`

  const setExpanded = (expanded: boolean) => {
    root.dataset.expanded = expanded ? "true" : "false"
    for (const toggle of toggles) {
      toggle.setAttribute("aria-controls", content.id)
      toggle.setAttribute("aria-expanded", String(expanded))
    }
    for (const label of root.querySelectorAll<HTMLElement>(
      "[data-code-label-collapsed]"
    )) {
      label.hidden = expanded
    }
    for (const label of root.querySelectorAll<HTMLElement>(
      "[data-code-label-expanded]"
    )) {
      label.hidden = !expanded
    }
  }

  setExpanded(false)
  root.dataset.codeEnhanced = "true"

  const top = root.querySelector<HTMLButtonElement>("[data-code-top-toggle]")
  const reveal = root.querySelector<HTMLButtonElement>(
    "[data-code-reveal-toggle]"
  )

  for (const toggle of toggles) {
    toggle.addEventListener("click", () => {
      const expanded = root.dataset.expanded !== "true"
      const hadFocus = document.activeElement === toggle
      setExpanded(expanded)
      if (!hadFocus) return
      // The reveal overlay hides while expanded, and a collapsed preview hides
      // its top control, so focus follows the control that stays visible.
      if (expanded && toggle === reveal) top?.focus()
      else if (
        !expanded &&
        toggle === top &&
        root.dataset.variant === "preview"
      )
        reveal?.focus()
    })
  }
}

export function initializeCodeCollapsibles() {
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-code-collapsible]"
  )) {
    initializeCodeCollapsible(root)
  }
}
