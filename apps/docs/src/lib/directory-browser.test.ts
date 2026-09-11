import { afterEach, describe, expect, it, vi } from "vitest"

import {
  directoryStateSearch,
  filterRegistryDirectory,
  initializeDirectoryBrowsers,
  paginateDirectory,
  parseDirectoryState
} from "./directory-browser"
import type { RegistryDirectoryEntry } from "./registry-directory"

const entries: RegistryDirectoryEntry[] = [
  {
    name: "forms",
    description: "Accessible form controls",
    homepage: "https://example.com/forms",
    registryUrl: "https://example.com/forms/registry.json",
    tags: ["input", "solid"]
  },
  {
    name: "charts",
    description: "Data visualization components",
    homepage: "https://example.com/charts",
    registryUrl: "https://example.com/charts/registry.json",
    tags: ["data"]
  }
]

function renderDirectory() {
  document.body.innerHTML = `
    <div data-registry-directory data-page-size="2">
      <input data-directory-search />
      <p data-directory-count></p>
      <div data-directory-entries>
        ${["alpha solid", "beta charts", "gamma solid", "delta forms", "epsilon data"]
          .map(
            (searchText, index) =>
              `<article data-directory-entry data-search-text="${searchText}">${index}</article>`
          )
          .join("")}
      </div>
      <p data-directory-empty hidden>No registries found.</p>
      <nav>
        ${[1, 2, 3].map((page) => `<a data-directory-page="${page}" href="?page=${page}">${page}</a>`).join("")}
      </nav>
    </div>`

  return document.querySelector<HTMLElement>("[data-registry-directory]")!
}

function visibleEntries(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>("[data-directory-entry]")].filter(
    (entry) => !entry.hidden
  )
}

describe("directory helpers", () => {
  it("searches names, descriptions, and tags case-insensitively", () => {
    expect(filterRegistryDirectory(entries, "  SOLID input ").map((entry) => entry.name)).toEqual([
      "forms"
    ])
    expect(filterRegistryDirectory(entries, "visualization").map((entry) => entry.name)).toEqual([
      "charts"
    ])
    expect(filterRegistryDirectory(entries, "missing")).toEqual([])
    expect(filterRegistryDirectory(entries, " ")).toEqual(entries)
  })

  it("paginates and clamps invalid or excessive pages", () => {
    expect(paginateDirectory([1, 2, 3, 4, 5], 2, 2)).toEqual({
      items: [3, 4],
      page: 2,
      pageCount: 3,
      total: 5
    })
    expect(paginateDirectory([1], 99, 2).page).toBe(1)
    expect(paginateDirectory([], Number.NaN, 0)).toMatchObject({ page: 1, pageCount: 1, total: 0 })
  })

  it("round-trips normalized URL state and omits defaults", () => {
    expect(parseDirectoryState("?q=%20solid+++forms%20&page=03")).toEqual({
      page: 3,
      query: "solid forms"
    })
    expect(parseDirectoryState("?page=-2")).toEqual({ page: 1, query: "" })
    expect(directoryStateSearch({ page: 1, query: " " })).toBe("")
    expect(directoryStateSearch({ page: 2, query: " solid  forms " })).toBe("?q=solid+forms&page=2")
  })
})

describe("initializeDirectoryBrowsers", () => {
  afterEach(() => {
    document.body.innerHTML = ""
    history.replaceState(null, "", "/")
    vi.restoreAllMocks()
  })

  it("restores URL state, filters cards, updates counts, and clamps pages", () => {
    history.replaceState(null, "", "/docs/directory?q=solid&page=9")
    const root = renderDirectory()

    initializeDirectoryBrowsers()

    expect(root.dataset.query).toBe("solid")
    expect(root.dataset.page).toBe("1")
    expect(root.querySelector("[data-directory-count]")?.textContent).toBe("2 registries")
    expect(visibleEntries(root)).toHaveLength(2)
  })

  it("resets to page one on input and displays the empty state", () => {
    history.replaceState(null, "", "/docs/directory?page=2")
    const root = renderDirectory()
    initializeDirectoryBrowsers()
    const input = root.querySelector<HTMLInputElement>("[data-directory-search]")!

    input.value = "missing"
    input.dispatchEvent(new Event("input", { bubbles: true }))

    expect(root.dataset.page).toBe("1")
    expect(root.querySelector<HTMLElement>("[data-directory-empty]")!.hidden).toBe(false)
    expect(location.search).toBe("?q=missing")
  })

  it("uses real links, pushes page changes, and preserves modified clicks", () => {
    const root = renderDirectory()
    initializeDirectoryBrowsers()
    const secondPage = root.querySelector<HTMLAnchorElement>('[data-directory-page="2"]')!
    const pushState = vi.spyOn(history, "pushState")

    expect(
      secondPage.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
    ).toBe(false)
    expect(root.dataset.page).toBe("2")
    expect(pushState).toHaveBeenCalledOnce()

    secondPage.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true })
    )
    expect(pushState).toHaveBeenCalledOnce()
  })

  it("restores state on popstate", () => {
    const root = renderDirectory()
    initializeDirectoryBrowsers()
    history.replaceState(null, "", "/docs/directory?q=forms")

    window.dispatchEvent(new PopStateEvent("popstate"))

    expect(root.dataset.query).toBe("forms")
    expect(visibleEntries(root)).toHaveLength(1)
  })

  it("is idempotent", () => {
    const root = renderDirectory()
    const input = root.querySelector<HTMLInputElement>("[data-directory-search]")!
    const addEventListener = vi.spyOn(input, "addEventListener")

    initializeDirectoryBrowsers()
    initializeDirectoryBrowsers()

    expect(addEventListener).toHaveBeenCalledTimes(1)
  })
})
