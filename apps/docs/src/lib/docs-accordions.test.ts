import { afterEach, describe, expect, it, vi } from "vitest"

import { initializeDocsAccordions } from "./docs-accordions"

type AccordionFixture = {
  type?: "single" | "multiple" | string
  collapsible?: boolean
  defaultValue?: string
  items?: Array<{ value: string; disabled?: boolean; complete?: boolean }>
}

function accordionMarkup({
  type = "single",
  collapsible = false,
  defaultValue,
  items: fixtureItems = [{ value: "one" }, { value: "two" }, { value: "three" }]
}: AccordionFixture = {}) {
  const collapsibleAttribute = collapsible ? " data-collapsible" : ""
  const defaultAttribute = defaultValue
    ? ` data-default-value="${defaultValue}"`
    : ""

  return `
    <div data-docs-accordion data-type="${type}"${collapsibleAttribute}${defaultAttribute}>
      ${fixtureItems
        .map(
          ({ value, disabled, complete = true }) => `
            <div data-accordion-item data-value="${value}"${disabled ? " data-disabled" : ""}>
              <h3><button data-accordion-trigger${disabled ? " disabled" : ""}>${value}</button></h3>
              ${complete ? `<div data-accordion-content><div>${value} answer</div></div>` : ""}
            </div>`
        )
        .join("")}
    </div>`
}

function renderAccordions(fixtures: AccordionFixture[] = [{}]) {
  document.body.innerHTML = fixtures
    .map((fixture) => accordionMarkup(fixture))
    .join("")
  return [...document.querySelectorAll<HTMLElement>("[data-docs-accordion]")]
}

function items(root: HTMLElement) {
  return [
    ...root.querySelectorAll<HTMLElement>("[data-accordion-item]")
  ].filter((item) => item.closest("[data-docs-accordion]") === root)
}

function triggers(root: HTMLElement) {
  return [
    ...root.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]")
  ].filter((trigger) => trigger.closest("[data-docs-accordion]") === root)
}

function panels(root: HTMLElement) {
  return [
    ...root.querySelectorAll<HTMLElement>("[data-accordion-content]")
  ].filter((panel) => panel.closest("[data-docs-accordion]") === root)
}

describe("initializeDocsAccordions", () => {
  afterEach(() => {
    document.body.innerHTML = ""
    vi.restoreAllMocks()
  })

  it("applies a declared single default", () => {
    const root = renderAccordions([{ defaultValue: "two" }])[0]!
    expect(panels(root).every((panel) => !panel.hidden)).toBe(true)

    initializeDocsAccordions()

    expect(root.dataset.accordionEnhanced).toBe("true")
    expect(root.dataset.value).toBe("two")
    expect(panels(root).map((panel) => panel.hidden)).toEqual([
      true,
      false,
      true
    ])
  })

  it("allows a collapsible single accordion to close its open item", () => {
    const root = renderAccordions([
      { collapsible: true, defaultValue: "one" }
    ])[0]!
    initializeDocsAccordions()

    triggers(root)[0]!.click()

    expect(root.dataset.value).toBe("")
    expect(panels(root).every((panel) => panel.hidden)).toBe(true)
  })

  it("keeps one enabled item open in a non-collapsible single accordion", () => {
    const root = renderAccordions()[0]!
    initializeDocsAccordions()

    expect(root.dataset.value).toBe("one")
    triggers(root)[0]!.click()
    expect(root.dataset.value).toBe("one")
    triggers(root)[1]!.click()
    expect(root.dataset.value).toBe("two")
  })

  it("supports multiple encoded defaults and independent toggles", () => {
    const root = renderAccordions([
      { type: "multiple", defaultValue: "one,three" }
    ])[0]!
    initializeDocsAccordions()

    expect(root.dataset.value).toBe("one,three")
    expect(panels(root).map((panel) => panel.hidden)).toEqual([
      false,
      true,
      false
    ])
    triggers(root)[1]!.click()
    expect(root.dataset.value).toBe("one,two,three")
    triggers(root)[0]!.click()
    expect(root.dataset.value).toBe("two,three")
  })

  it("does not select disabled items and skips them during focus navigation", () => {
    const root = renderAccordions([
      {
        defaultValue: "two",
        items: [
          { value: "one" },
          { value: "two", disabled: true },
          { value: "three" }
        ]
      }
    ])[0]!
    initializeDocsAccordions()
    const buttons = triggers(root)

    expect(root.dataset.value).toBe("one")
    expect(buttons[1]!.getAttribute("aria-disabled")).toBe("true")
    buttons[0]!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    )
    expect(document.activeElement).toBe(buttons[2])
  })

  it("creates unique reciprocal ARIA relationships and synchronized state", () => {
    const roots = renderAccordions([{}, {}])
    initializeDocsAccordions()
    const allTriggers = roots.flatMap(triggers)
    const allPanels = roots.flatMap(panels)

    expect(new Set(allTriggers.map((trigger) => trigger.id)).size).toBe(6)
    expect(new Set(allPanels.map((panel) => panel.id)).size).toBe(6)
    for (const root of roots) {
      for (const [index, trigger] of triggers(root).entries()) {
        const panel = panels(root)[index]!
        expect(trigger.getAttribute("aria-controls")).toBe(panel.id)
        expect(panel.getAttribute("aria-labelledby")).toBe(trigger.id)
        expect(trigger.getAttribute("aria-expanded")).toBe(
          index === 0 ? "true" : "false"
        )
        expect(items(root)[index]!.dataset.state).toBe(
          index === 0 ? "open" : "closed"
        )
      }
    }
  })

  it("supports wrapped ArrowUp/ArrowDown plus Home and End focus navigation", () => {
    const root = renderAccordions()[0]!
    initializeDocsAccordions()
    const buttons = triggers(root)

    buttons[0]!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
    )
    expect(document.activeElement).toBe(buttons[2])
    buttons[2]!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    )
    expect(document.activeElement).toBe(buttons[0])
    buttons[0]!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "End", bubbles: true })
    )
    expect(document.activeElement).toBe(buttons[2])
    buttons[2]!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Home", bubbles: true })
    )
    expect(document.activeElement).toBe(buttons[0])
  })

  it("isolates roots from each other", () => {
    const roots = renderAccordions([{}, { defaultValue: "two" }])
    initializeDocsAccordions()

    triggers(roots[0]!)[2]!.click()

    expect(roots.map((root) => root.dataset.value)).toEqual(["three", "two"])
  })

  it("ignores malformed items without breaking valid siblings", () => {
    const root = renderAccordions([
      {
        items: [
          { value: "one" },
          { value: "broken", complete: false },
          { value: "three" }
        ]
      }
    ])[0]!
    initializeDocsAccordions()

    expect(root.dataset.accordionEnhanced).toBe("true")
    expect(triggers(root)[1]!.hasAttribute("aria-controls")).toBe(false)
    triggers(root)[2]!.click()
    expect(root.dataset.value).toBe("three")
  })

  it("ignores malformed roots and is idempotent for valid roots", () => {
    const roots = renderAccordions([{ type: "invalid" }, {}])
    const addEventListener = vi.spyOn(
      triggers(roots[1]!)[0]!,
      "addEventListener"
    )

    initializeDocsAccordions()
    initializeDocsAccordions()

    expect(roots[0]!.dataset.accordionEnhanced).toBeUndefined()
    expect(addEventListener).toHaveBeenCalledTimes(2)
    triggers(roots[1]!)[1]!.click()
    expect(roots[1]!.dataset.value).toBe("two")
  })
})
