let accordionId = 0

type AccordionItem = {
  element: HTMLElement
  trigger: HTMLButtonElement
  content: HTMLElement
  value: string
  disabled: boolean
}

function scopedElements<T extends Element>(root: HTMLElement, selector: string) {
  return [...root.querySelectorAll<T>(selector)].filter(
    (element) => element.closest("[data-docs-accordion]") === root
  )
}

function itemDescendants<T extends Element>(
  root: HTMLElement,
  item: HTMLElement,
  selector: string
) {
  return [...item.querySelectorAll<T>(selector)].filter(
    (element) =>
      element.closest("[data-docs-accordion]") === root &&
      element.closest("[data-accordion-item]") === item
  )
}

function collectItems(root: HTMLElement) {
  const values = new Set<string>()
  const validItems: AccordionItem[] = []

  for (const element of scopedElements<HTMLElement>(root, "[data-accordion-item]")) {
    const value = element.dataset.value?.trim()
    const itemTriggers = itemDescendants<HTMLButtonElement>(
      root,
      element,
      "[data-accordion-trigger]"
    )
    const itemContents = itemDescendants<HTMLElement>(root, element, "[data-accordion-content]")

    if (!value || value.includes(",") || values.has(value)) continue
    if (itemTriggers.length !== 1 || itemContents.length !== 1) continue

    values.add(value)
    const trigger = itemTriggers[0]!
    validItems.push({
      element,
      trigger,
      content: itemContents[0]!,
      value,
      disabled: element.hasAttribute("data-disabled") || trigger.disabled
    })
  }

  return validItems
}

function initializeDocsAccordionRoot(root: HTMLElement) {
  if (root.dataset.accordionInitialized === "true") return

  const type = root.dataset.type
  if (type !== "single" && type !== "multiple") return

  const items = collectItems(root)
  if (!items.length) return

  const rootId = ++accordionId
  const enabledItems = items.filter((item) => !item.disabled)
  const validDefaults = (root.dataset.defaultValue ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
  const defaultValues = new Set(
    validDefaults.filter((value) => enabledItems.some((item) => item.value === value))
  )
  const collapsible = root.hasAttribute("data-collapsible")
  const openValues = new Set<string>()

  if (type === "multiple") {
    for (const value of defaultValues) openValues.add(value)
  } else {
    const initialValue =
      [...defaultValues][0] ?? (!collapsible ? enabledItems[0]?.value : undefined)
    if (initialValue) openValues.add(initialValue)
  }

  const updateState = () => {
    const selectedValues = items
      .filter((item) => openValues.has(item.value))
      .map((item) => item.value)

    root.dataset.state = selectedValues.length ? "open" : "closed"
    root.dataset.value = selectedValues.join(",")

    for (const item of items) {
      const isOpen = openValues.has(item.value)
      const state = isOpen ? "open" : "closed"
      item.element.dataset.state = state
      item.trigger.dataset.state = state
      item.trigger.setAttribute("aria-expanded", String(isOpen))
      item.content.dataset.state = state
      item.content.hidden = !isOpen
    }
  }

  for (const [index, item] of items.entries()) {
    item.trigger.id = `docs-accordion-${rootId}-trigger-${index + 1}`
    item.content.id = `docs-accordion-${rootId}-content-${index + 1}`
    item.trigger.setAttribute("aria-controls", item.content.id)
    item.content.setAttribute("aria-labelledby", item.trigger.id)

    if (item.disabled) {
      item.trigger.disabled = true
      item.trigger.setAttribute("aria-disabled", "true")
    }

    item.trigger.addEventListener("click", () => {
      if (item.disabled) return

      if (type === "multiple") {
        if (openValues.has(item.value)) openValues.delete(item.value)
        else openValues.add(item.value)
      } else if (openValues.has(item.value)) {
        if (collapsible) openValues.delete(item.value)
      } else {
        openValues.clear()
        openValues.add(item.value)
      }

      updateState()
    })

    item.trigger.addEventListener("keydown", (event) => {
      if (!enabledItems.length) return

      const currentIndex = enabledItems.indexOf(item)
      let nextIndex: number | undefined

      if (event.key === "ArrowUp")
        nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length
      if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % enabledItems.length
      if (event.key === "Home") nextIndex = 0
      if (event.key === "End") nextIndex = enabledItems.length - 1
      if (nextIndex === undefined) return

      event.preventDefault()
      enabledItems[nextIndex]?.trigger.focus()
    })
  }

  updateState()
  root.dataset.accordionEnhanced = "true"
  root.dataset.accordionInitialized = "true"
}

export function initializeDocsAccordions() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-docs-accordion]")) {
    initializeDocsAccordionRoot(root)
  }
}
