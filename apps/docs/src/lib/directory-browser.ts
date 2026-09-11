import type { RegistryDirectoryEntry } from "./registry-directory"

export const DIRECTORY_PAGE_SIZE = 12

export type DirectoryState = {
  page: number
  query: string
}

export type DirectoryPage<T> = {
  items: readonly T[]
  page: number
  pageCount: number
  total: number
}

export function normalizeDirectoryQuery(query: string) {
  return query.trim().replace(/\s+/g, " ")
}

export function filterRegistryDirectory(entries: readonly RegistryDirectoryEntry[], query: string) {
  const terms = normalizeDirectoryQuery(query).toLocaleLowerCase().split(" ").filter(Boolean)
  if (!terms.length) return [...entries]

  return entries.filter((entry) => {
    const searchable = [entry.name, entry.description, ...(entry.tags ?? [])]
      .join(" ")
      .toLocaleLowerCase()
    return terms.every((term) => searchable.includes(term))
  })
}

export function paginateDirectory<T>(
  items: readonly T[],
  requestedPage: number,
  pageSize = DIRECTORY_PAGE_SIZE
): DirectoryPage<T> {
  const safePageSize =
    Number.isSafeInteger(pageSize) && pageSize > 0 ? pageSize : DIRECTORY_PAGE_SIZE
  const pageCount = Math.max(1, Math.ceil(items.length / safePageSize))
  const normalizedPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const page = Math.min(normalizedPage, pageCount)
  const start = (page - 1) * safePageSize

  return {
    items: items.slice(start, start + safePageSize),
    page,
    pageCount,
    total: items.length
  }
}

export function parseDirectoryState(search: string): DirectoryState {
  const params = new URLSearchParams(search)
  const query = normalizeDirectoryQuery(params.get("q") ?? "")
  const rawPage = params.get("page")
  const page = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1

  return {
    query,
    page: Number.isSafeInteger(page) && page > 0 ? page : 1
  }
}

export function directoryStateSearch({ page, query }: DirectoryState) {
  const params = new URLSearchParams()
  const normalizedQuery = normalizeDirectoryQuery(query)
  if (normalizedQuery) params.set("q", normalizedQuery)
  if (page > 1) params.set("page", String(page))
  const serialized = params.toString()
  return serialized ? `?${serialized}` : ""
}

function initializeDirectoryRoot(root: HTMLElement) {
  if (root.dataset.directoryInitialized === "true") return

  const input = root.querySelector<HTMLInputElement>("[data-directory-search]")
  const count = root.querySelector<HTMLElement>("[data-directory-count]")
  const empty = root.querySelector<HTMLElement>("[data-directory-empty]")
  const cards = [...root.querySelectorAll<HTMLElement>("[data-directory-entry]")]
  const pageLinks = [...root.querySelectorAll<HTMLAnchorElement>("[data-directory-page]")]
  if (!input || !count || !empty) return

  const configuredPageSize = Number(root.dataset.pageSize)
  const pageSize =
    Number.isSafeInteger(configuredPageSize) && configuredPageSize > 0
      ? configuredPageSize
      : DIRECTORY_PAGE_SIZE

  const render = (requestedState: DirectoryState, historyMode?: "push" | "replace") => {
    const query = normalizeDirectoryQuery(requestedState.query)
    const terms = query.toLocaleLowerCase().split(" ").filter(Boolean)
    const matches = cards.filter((card) => {
      const searchable = (card.dataset.searchText ?? "").toLocaleLowerCase()
      return terms.every((term) => searchable.includes(term))
    })
    const result = paginateDirectory(matches, requestedState.page, pageSize)
    const visibleCards = new Set(result.items)

    input.value = query
    for (const card of cards) card.hidden = !visibleCards.has(card)
    count.textContent = `${result.total} ${result.total === 1 ? "registry" : "registries"}`
    empty.hidden = result.total !== 0
    root.dataset.query = query
    root.dataset.page = String(result.page)
    root.dataset.pageCount = String(result.pageCount)

    for (const link of pageLinks) {
      const linkPage = Number(link.dataset.directoryPage)
      link.hidden = !Number.isSafeInteger(linkPage) || linkPage > result.pageCount
      link.setAttribute("aria-current", linkPage === result.page ? "page" : "false")
      link.href = directoryStateSearch({ page: linkPage, query }) || location.pathname
    }

    if (historyMode) {
      const url = `${location.pathname}${directoryStateSearch({ page: result.page, query })}${location.hash}`
      history[`${historyMode}State`](null, "", url)
    }
  }

  input.addEventListener("input", () => {
    render({ page: 1, query: input.value }, "replace")
  })

  for (const link of pageLinks) {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      event.preventDefault()
      render({ page: Number(link.dataset.directoryPage), query: input.value }, "push")
    })
  }

  window.addEventListener("popstate", () => render(parseDirectoryState(location.search)))
  render(parseDirectoryState(location.search))
  root.dataset.directoryEnhanced = "true"
  root.dataset.directoryInitialized = "true"
}

export function initializeDirectoryBrowsers() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-registry-directory]")) {
    initializeDirectoryRoot(root)
  }
}
