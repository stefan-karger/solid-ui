import { afterEach, describe, expect, it } from "vitest"

import { initializeCodeCollapsibles } from "./code-collapsibles"

function renderCollapsible() {
  document.body.innerHTML = `
    <div data-code-collapsible>
      <div data-code-content>source</div>
      <button data-code-toggle type="button">
        <span data-code-label-collapsed>Expand</span>
        <span data-code-label-expanded hidden>Collapse</span>
      </button>
    </div>
  `
  return document.querySelector<HTMLElement>("[data-code-collapsible]")!
}

describe("initializeCodeCollapsibles", () => {
  afterEach(() => {
    document.body.innerHTML = ""
  })

  it("enhances code into an accessible collapsed state", () => {
    const root = renderCollapsible()
    initializeCodeCollapsibles()

    const content = root.querySelector<HTMLElement>("[data-code-content]")!
    const toggle = root.querySelector<HTMLButtonElement>("[data-code-toggle]")!
    expect(root.dataset.codeEnhanced).toBe("true")
    expect(root.dataset.expanded).toBe("false")
    expect(toggle.getAttribute("aria-expanded")).toBe("false")
    expect(toggle.getAttribute("aria-controls")).toBe(content.id)
  })

  it("toggles labels without installing duplicate listeners", () => {
    const root = renderCollapsible()
    initializeCodeCollapsibles()
    initializeCodeCollapsibles()

    const toggle = root.querySelector<HTMLButtonElement>("[data-code-toggle]")!
    toggle.click()

    expect(root.dataset.expanded).toBe("true")
    expect(toggle.getAttribute("aria-expanded")).toBe("true")
    expect(root.querySelector<HTMLElement>("[data-code-label-collapsed]")!.hidden).toBe(true)
    expect(root.querySelector<HTMLElement>("[data-code-label-expanded]")!.hidden).toBe(false)
  })
})
