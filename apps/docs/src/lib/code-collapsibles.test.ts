import { afterEach, describe, expect, it } from "vitest"

import { initializeCodeCollapsibles } from "./code-collapsibles"

function renderCollapsible(variant: "preview" | "source") {
  document.body.innerHTML = `
    <div data-code-collapsible data-variant="${variant}">
      <div data-code-content>source</div>
      <div data-code-control data-code-top-control>
        <button data-code-toggle data-code-top-toggle type="button">
          <span data-code-label-collapsed>Expand</span>
          <span data-code-label-expanded hidden>Collapse</span>
        </button>
      </div>
      <div data-code-control data-code-reveal>
        <button data-code-toggle data-code-reveal-toggle type="button">
          <span data-code-label-collapsed>View Code</span>
          <span data-code-label-expanded hidden>Collapse</span>
        </button>
      </div>
    </div>
  `
  initializeCodeCollapsibles()
  const root = document.querySelector<HTMLElement>("[data-code-collapsible]")!
  return {
    root,
    content: root.querySelector<HTMLElement>("[data-code-content]")!,
    top: root.querySelector<HTMLButtonElement>("[data-code-top-toggle]")!,
    reveal: root.querySelector<HTMLButtonElement>("[data-code-reveal-toggle]")!
  }
}

function activate(button: HTMLButtonElement) {
  button.focus()
  button.click()
}

describe("initializeCodeCollapsibles", () => {
  afterEach(() => {
    document.body.innerHTML = ""
  })

  it("moves focus to the visible control when a preview expands and collapses", () => {
    const { root, top, reveal } = renderCollapsible("preview")

    activate(reveal)
    expect(root.dataset.expanded).toBe("true")
    expect(document.activeElement).toBe(top)

    activate(top)
    expect(root.dataset.expanded).toBe("false")
    expect(document.activeElement).toBe(reveal)
  })

  it("keeps focus on the source's top control, which stays visible", () => {
    const { root, top, reveal } = renderCollapsible("source")

    activate(reveal)
    expect(document.activeElement).toBe(top)

    activate(top)
    expect(root.dataset.expanded).toBe("false")
    expect(document.activeElement).toBe(top)
  })

  it("does not move focus that the activated control never had", () => {
    const { top, reveal } = renderCollapsible("preview")

    reveal.click()
    expect(document.activeElement).not.toBe(top)
  })

  it("keeps both controls' ARIA state in sync and initializes once", () => {
    const { root, content, top, reveal } = renderCollapsible("preview")
    initializeCodeCollapsibles()

    reveal.click()
    expect(root.dataset.expanded).toBe("true")
    for (const toggle of [top, reveal]) {
      expect(toggle.getAttribute("aria-controls")).toBe(content.id)
      expect(toggle.getAttribute("aria-expanded")).toBe("true")
    }
    expect(
      root.querySelector<HTMLElement>("[data-code-label-expanded]")!.hidden
    ).toBe(false)
  })
})
