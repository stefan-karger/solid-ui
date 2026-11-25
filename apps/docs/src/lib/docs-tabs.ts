const TABS_CHANGE_EVENT = "docs-tabs:change"

let tabsId = 0

type TabsChangeDetail = {
  storageKey: string
  value: string
}

function scopedElements<T extends Element>(
  root: HTMLElement,
  selector: string
) {
  return [...root.querySelectorAll<T>(selector)].filter(
    (element) => element.closest("[data-docs-tabs]") === root
  )
}

function initializeDocsTabsRoot(root: HTMLElement) {
  if (root.dataset.tabsInitialized === "true") return

  const allTriggers = scopedElements<HTMLButtonElement>(
    root,
    "[data-tabs-trigger]"
  )
  const allPanels = scopedElements<HTMLElement>(root, "[data-tabs-content]")
  const panelValues = new Set(
    allPanels.map((panel) => panel.dataset.value).filter(Boolean)
  )
  const values = [
    ...new Set(
      allTriggers
        .map((trigger) => trigger.dataset.value)
        .filter(
          (value): value is string => Boolean(value) && panelValues.has(value)
        )
    )
  ]

  if (!values.length) return

  const validValues = new Set(values)
  const triggers = allTriggers.filter((trigger) =>
    validValues.has(trigger.dataset.value ?? "")
  )
  const panels = allPanels.filter((panel) =>
    validValues.has(panel.dataset.value ?? "")
  )
  const rootId = ++tabsId

  for (const value of values) {
    const trigger = triggers.find((item) => item.dataset.value === value)
    const panel = panels.find((item) => item.dataset.value === value)
    if (!trigger || !panel) continue

    trigger.id = `docs-tabs-${rootId}-trigger-${value}`
    panel.id = `docs-tabs-${rootId}-panel-${value}`
    trigger.setAttribute("aria-controls", panel.id)
    panel.setAttribute("aria-labelledby", trigger.id)
  }

  const storageKey = root.dataset.storageKey
  let storedValue: string | null = null
  if (storageKey) {
    try {
      storedValue = localStorage.getItem(storageKey)
    } catch {
      storedValue = null
    }
  }

  const initialValue =
    (storedValue && validValues.has(storedValue) ? storedValue : undefined) ??
    (root.dataset.defaultValue && validValues.has(root.dataset.defaultValue)
      ? root.dataset.defaultValue
      : undefined) ??
    values[0]

  const setValue = (value: string) => {
    if (!validValues.has(value)) return

    root.dataset.value = value
    for (const trigger of triggers) {
      const active = trigger.dataset.value === value
      trigger.dataset.state = active ? "active" : "inactive"
      trigger.setAttribute("aria-selected", String(active))
      trigger.tabIndex = active ? 0 : -1
    }
    for (const panel of panels) {
      const active = panel.dataset.value === value
      panel.dataset.state = active ? "active" : "inactive"
      panel.hidden = !active
    }
  }

  const selectValue = (value: string) => {
    if (!validValues.has(value)) return
    setValue(value)

    if (!storageKey) return
    try {
      localStorage.setItem(storageKey, value)
    } catch {
      // Storage may be disabled; the in-page tabs should still work.
    }
    document.dispatchEvent(
      new CustomEvent<TabsChangeDetail>(TABS_CHANGE_EVENT, {
        detail: { storageKey, value }
      })
    )
  }

  for (const trigger of triggers) {
    trigger.addEventListener("click", () => {
      const value = trigger.dataset.value
      if (value) selectValue(value)
    })
    trigger.addEventListener("keydown", (event) => {
      const currentIndex = triggers.indexOf(trigger)
      let nextIndex: number | undefined

      if (event.key === "ArrowLeft")
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length
      if (event.key === "ArrowRight")
        nextIndex = (currentIndex + 1) % triggers.length
      if (event.key === "Home") nextIndex = 0
      if (event.key === "End") nextIndex = triggers.length - 1
      if (nextIndex === undefined) return

      event.preventDefault()
      const nextTrigger = triggers[nextIndex]
      if (!nextTrigger) return
      const value = nextTrigger.dataset.value
      if (!value) return
      selectValue(value)
      nextTrigger.focus()
    })
  }

  if (storageKey) {
    document.addEventListener(TABS_CHANGE_EVENT, (event) => {
      const detail = (event as CustomEvent<Partial<TabsChangeDetail>>).detail
      if (
        detail?.storageKey === storageKey &&
        detail.value &&
        validValues.has(detail.value)
      ) {
        setValue(detail.value)
      }
    })
  }

  setValue(initialValue!)
  root.dataset.tabsEnhanced = "true"
  root.dataset.tabsInitialized = "true"
}

export function initializeDocsTabs() {
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-docs-tabs]"
  )) {
    initializeDocsTabsRoot(root)
  }
}
