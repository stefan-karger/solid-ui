import { describe, expect, it } from "vitest"

import {
  createComponentLinks,
  findComponentNeighbors,
  findNeighbors,
  sortDocsPages,
  toDocsPath,
  toRouteId,
  type DocsPageLike
} from "./docs"

function page(id: string, title = id, component = false): DocsPageLike {
  return { id, data: { title, component } }
}

describe("toRouteId", () => {
  it.each([
    ["index.mdx", ""],
    ["index", ""],
    ["guides/index.md", "guides"],
    ["guides/index", "guides"],
    ["components/button.mdx", "components/button"],
    ["components/button", "components/button"]
  ])("normalizes %s", (id, expected) => {
    expect(toRouteId(id)).toBe(expected)
  })

  it("converts normalized and collection IDs to docs paths", () => {
    expect(toDocsPath("")).toBe("/docs")
    expect(toDocsPath("index.mdx")).toBe("/docs")
    expect(toDocsPath("components/button")).toBe("/docs/components/button")
  })
})

describe("docs page ordering and neighbors", () => {
  const pages = [
    page("guides/zebra.mdx"),
    page("components/tooltip.mdx", "Tooltip", true),
    page("index.mdx", "Docs"),
    page("components/button.mdx", "Button", true),
    page("guides/index.mdx", "Guides")
  ]

  it("sorts by normalized route with the docs root first without mutating input", () => {
    const sorted = sortDocsPages(pages)

    expect(sorted.map(({ id }) => id)).toEqual([
      "index.mdx",
      "components/button.mdx",
      "components/tooltip.mdx",
      "guides/index.mdx",
      "guides/zebra.mdx"
    ])
    expect(pages[0]?.id).toBe("guides/zebra.mdx")
  })

  it("returns neighbors at the middle and collection boundaries", () => {
    expect(findNeighbors(pages, "components/button")).toEqual({
      previous: pages[2],
      next: pages[1]
    })
    expect(findNeighbors(pages, "index")).toEqual({
      previous: null,
      next: pages[3]
    })
    expect(findNeighbors(pages, "guides/zebra.mdx")).toEqual({
      previous: pages[4],
      next: null
    })
  })

  it("returns empty neighbors when the current page is missing", () => {
    expect(findNeighbors(pages, "missing")).toEqual({
      previous: null,
      next: null
    })
  })

  it("filters non-component pages before finding neighbors", () => {
    expect(findComponentNeighbors(pages, "components/button")).toEqual({
      previous: null,
      next: pages[1]
    })
    expect(findComponentNeighbors(pages, "components/tooltip.mdx")).toEqual({
      previous: pages[3],
      next: null
    })
    expect(findComponentNeighbors(pages, "guides/zebra")).toEqual({
      previous: null,
      next: null
    })
  })
})

describe("createComponentLinks", () => {
  const pages: DocsPageLike[] = [
    page("components/zeta.mdx", "Zeta", true),
    {
      id: "components/alpha/index.mdx",
      data: { title: "Alpha", component: true, new: true }
    },
    page("guides/setup.mdx", "Setup"),
    {
      id: "components/alpha-alt.mdx",
      data: { title: "Alpha", component: true }
    },
    {
      id: "components/beta.md",
      data: { title: "Beta", component: true, new: true }
    }
  ]

  it("derives normalized links only from component pages", () => {
    expect(createComponentLinks(pages)).toEqual([
      { title: "Alpha", href: "/docs/components/alpha", isNew: true },
      { title: "Alpha", href: "/docs/components/alpha-alt", isNew: false },
      { title: "Beta", href: "/docs/components/beta", isNew: true },
      { title: "Zeta", href: "/docs/components/zeta", isNew: false }
    ])
  })

  it("filters new component links without changing their stable order", () => {
    expect(createComponentLinks(pages, "new")).toEqual([
      { title: "Alpha", href: "/docs/components/alpha", isNew: true },
      { title: "Beta", href: "/docs/components/beta", isNew: true }
    ])
  })

  it("returns an empty list for empty and non-component inputs", () => {
    expect(createComponentLinks([])).toEqual([])
    expect(
      createComponentLinks([page("guides/setup.mdx", "Setup")], "new")
    ).toEqual([])
  })
})
