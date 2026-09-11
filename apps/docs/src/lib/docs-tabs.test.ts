import { afterEach, describe, expect, it, vi } from "vitest"

import { initializeDocsTabs } from "./docs-tabs"

type TabsFixture = {
  defaultValue?: string
  storageKey?: string
  values?: string[]
}

function tabsMarkup({
  defaultValue = "cli",
  storageKey,
  values = ["cli", "manual"]
}: TabsFixture = {}) {
  const storageAttribute = storageKey ? ` data-storage-key="${storageKey}"` : ""

  return `
    <div data-docs-tabs data-default-value="${defaultValue}"${storageAttribute}>
      <div data-tabs-list role="tablist">
        ${values
          .map(
            (value) =>
              `<button data-tabs-trigger data-value="${value}" role="tab">${value}</button>`
          )
          .join("")}
      </div>
      ${values
        .map(
          (value) =>
            `<div data-tabs-content data-value="${value}" role="tabpanel">${value} content</div>`
        )
        .join("")}
    </div>
  `
}

function renderTabs(fixtures: TabsFixture[] = [{}]) {
  document.body.innerHTML = fixtures.map((fixture) => tabsMarkup(fixture)).join("")
  return [...document.querySelectorAll<HTMLElement>("[data-docs-tabs]")]
}

function triggers(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLButtonElement>("[data-tabs-trigger]")].filter(
    (trigger) => trigger.closest("[data-docs-tabs]") === root
  )
}

function panels(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>("[data-tabs-content]")].filter(
    (panel) => panel.closest("[data-docs-tabs]") === root
  )
}

describe("initializeDocsTabs", () => {
  afterEach(() => {
    document.body.innerHTML = ""
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it("selects the declared default and hides inactive panels after enhancement", () => {
    const root = renderTabs()[0]!
    initializeDocsTabs()

    expect(root.dataset.tabsEnhanced).toBe("true")
    expect(root.dataset.value).toBe("cli")
    expect(panels(root).map((panel) => panel.hidden)).toEqual([false, true])
  })

  it("selects a tab when its trigger is clicked", () => {
    const root = renderTabs()[0]!
    initializeDocsTabs()

    triggers(root)[1]!.click()

    expect(root.dataset.value).toBe("manual")
    expect(panels(root).map((panel) => panel.hidden)).toEqual([true, false])
  })

  it("supports wrapped arrow navigation plus Home and End", () => {
    const root = renderTabs([{ values: ["one", "two", "three"] }])[0]!
    initializeDocsTabs()
    const tabs = triggers(root)

    tabs[0]!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }))
    expect(root.dataset.value).toBe("three")
    expect(document.activeElement).toBe(tabs[2])

    tabs[2]!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }))
    expect(root.dataset.value).toBe("one")
    expect(document.activeElement).toBe(tabs[0])

    tabs[0]!.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }))
    expect(root.dataset.value).toBe("three")

    tabs[2]!.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }))
    expect(root.dataset.value).toBe("one")
  })

  it("synchronizes active state, selection, tab stops, and visibility", () => {
    const root = renderTabs()[0]!
    initializeDocsTabs()
    triggers(root)[1]!.click()

    expect(
      triggers(root).map((trigger) => [
        trigger.dataset.state,
        trigger.getAttribute("aria-selected"),
        trigger.tabIndex
      ])
    ).toEqual([
      ["inactive", "false", -1],
      ["active", "true", 0]
    ])
    expect(panels(root).map((panel) => [panel.dataset.state, panel.hidden])).toEqual([
      ["inactive", true],
      ["active", false]
    ])
  })

  it("generates unique reciprocal trigger and panel relationships", () => {
    const roots = renderTabs([{}, {}])
    initializeDocsTabs()
    const allTriggers = roots.flatMap(triggers)
    const allPanels = roots.flatMap(panels)

    expect(new Set(allTriggers.map((trigger) => trigger.id)).size).toBe(4)
    expect(new Set(allPanels.map((panel) => panel.id)).size).toBe(4)
    for (const root of roots) {
      for (const trigger of triggers(root)) {
        const panel = panels(root).find((item) => item.dataset.value === trigger.dataset.value)!
        expect(trigger.getAttribute("aria-controls")).toBe(panel.id)
        expect(panel.getAttribute("aria-labelledby")).toBe(trigger.id)
      }
    }
  })

  it("persists an installation selection and synchronizes roots sharing its key", () => {
    const roots = renderTabs([{ storageKey: "installation" }, { storageKey: "installation" }])
    initializeDocsTabs()

    triggers(roots[0]!)[1]!.click()

    expect(localStorage.getItem("installation")).toBe("manual")
    expect(roots.map((root) => root.dataset.value)).toEqual(["manual", "manual"])
  })

  it("falls back from unavailable or malformed stored values", () => {
    localStorage.setItem("unavailable", "missing")
    localStorage.setItem("malformed", "{not-json")
    const roots = renderTabs([
      { defaultValue: "manual", storageKey: "unavailable" },
      { defaultValue: "missing", storageKey: "malformed" }
    ])
    initializeDocsTabs()

    expect(roots.map((root) => root.dataset.value)).toEqual(["manual", "cli"])
  })

  it("continues to work when storage access throws", () => {
    vi.spyOn(localStorage, "getItem").mockImplementation(() => {
      throw new DOMException("denied")
    })
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("denied")
    })
    const root = renderTabs([{ storageKey: "installation" }])[0]!

    expect(() => initializeDocsTabs()).not.toThrow()
    expect(() => triggers(root)[1]!.click()).not.toThrow()
    expect(root.dataset.value).toBe("manual")
  })

  it("does not install duplicate listeners when initialized twice", () => {
    const root = renderTabs([{ storageKey: "installation" }])[0]!
    const setItem = vi.spyOn(localStorage, "setItem")
    initializeDocsTabs()
    initializeDocsTabs()

    triggers(root)[1]!.click()

    expect(setItem).toHaveBeenCalledTimes(1)
  })

  it("keeps nested roots scoped to their own triggers and panels", () => {
    document.body.innerHTML = tabsMarkup()
    const outer = document.querySelector<HTMLElement>("[data-docs-tabs]")!
    outer
      .querySelector<HTMLElement>("[data-tabs-content]")!
      .insertAdjacentHTML("beforeend", tabsMarkup({ defaultValue: "manual" }))
    initializeDocsTabs()
    const inner = outer.querySelector<HTMLElement>("[data-docs-tabs] [data-docs-tabs]")!

    expect(outer.dataset.value).toBe("cli")
    expect(inner.dataset.value).toBe("manual")
    triggers(inner)[0]!.click()
    expect(outer.dataset.value).toBe("cli")
    expect(inner.dataset.value).toBe("cli")
  })
})
