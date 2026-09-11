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
    for (const label of root.querySelectorAll<HTMLElement>("[data-code-label-collapsed]")) {
      label.hidden = expanded
    }
    for (const label of root.querySelectorAll<HTMLElement>("[data-code-label-expanded]")) {
      label.hidden = !expanded
    }
  }

  setExpanded(false)
  root.dataset.codeEnhanced = "true"

  for (const toggle of toggles) {
    toggle.addEventListener("click", () => setExpanded(root.dataset.expanded !== "true"))
  }
}

export function initializeCodeCollapsibles() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-code-collapsible]")) {
    initializeCodeCollapsible(root)
  }
}
