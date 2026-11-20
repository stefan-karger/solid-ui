import type { CollectionEntry } from "astro:content"

export type DocsPage = CollectionEntry<"docs">

export type DocsPageLike = {
  id: string
  data: {
    title: string
    component?: boolean | undefined
    new?: boolean | undefined
  }
}

export type ComponentLink = {
  title: string
  href: string
  isNew: boolean
}

export type DocsNavigationGroup = {
  title: string
  links: { title: string; href: string; isNew?: boolean }[]
}

export type ComponentListVariant = "all" | "new"

export type DocsCollectionLoader = () => Promise<DocsPage[]>

export type PageNeighbors<T> = {
  previous: T | null
  next: T | null
}

const DOC_EXTENSION_PATTERN = /\.mdx?$/

export function toRouteId(id: string) {
  const routeId = id.replace(DOC_EXTENSION_PATTERN, "")

  if (routeId === "index") {
    return ""
  }

  if (routeId.endsWith("/index")) {
    return routeId.slice(0, -"/index".length)
  }

  return routeId
}

export function toDocsPath(routeId: string) {
  const normalizedId = toRouteId(routeId)
  return normalizedId ? `/docs/${normalizedId}` : "/docs"
}

export function sortDocsPages<T extends DocsPageLike>(pages: readonly T[]) {
  return pages.toSorted((a, b) => {
    const aRouteId = toRouteId(a.id)
    const bRouteId = toRouteId(b.id)

    if (aRouteId === bRouteId) {
      return a.id.localeCompare(b.id)
    }

    if (aRouteId === "") {
      return -1
    }

    if (bRouteId === "") {
      return 1
    }

    return aRouteId.localeCompare(bRouteId)
  })
}

export function findNeighbors<T extends DocsPageLike>(
  pages: readonly T[],
  currentId: string
): PageNeighbors<T> {
  const sortedPages = sortDocsPages(pages)
  const normalizedCurrentId = toRouteId(currentId)
  const index = sortedPages.findIndex((page) => toRouteId(page.id) === normalizedCurrentId)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: sortedPages[index - 1] ?? null,
    next: sortedPages[index + 1] ?? null
  }
}

export function findComponentNeighbors<T extends DocsPageLike>(
  pages: readonly T[],
  currentId: string
) {
  return findNeighbors(
    pages.filter((page) => page.data.component),
    currentId
  )
}

export function createComponentLinks(
  pages: readonly DocsPageLike[],
  variant: ComponentListVariant = "all"
): ComponentLink[] {
  return pages
    .filter((page) => page.data.component && (variant === "all" || page.data.new))
    .map((page) => ({
      title: page.data.title,
      href: toDocsPath(page.id),
      isNew: Boolean(page.data.new)
    }))
    .toSorted((a, b) => a.title.localeCompare(b.title) || a.href.localeCompare(b.href))
}

export function createDocsNavigation(pages: readonly DocsPageLike[]): DocsNavigationGroup[] {
  return [
    {
      title: "Sections",
      links: [
        { title: "Introduction", href: "/docs" },
        { title: "Components", href: "/docs/components" }
      ]
    },
    { title: "Components", links: createComponentLinks(pages) }
  ]
}

export async function getDocsPages(loadDocs: DocsCollectionLoader): Promise<DocsPage[]> {
  return sortDocsPages(await loadDocs())
}

export async function getNeighbors(id: string, loadDocs: DocsCollectionLoader) {
  return findNeighbors(await getDocsPages(loadDocs), id)
}

export async function getComponentNeighbors(id: string, loadDocs: DocsCollectionLoader) {
  return findComponentNeighbors(await getDocsPages(loadDocs), id)
}

export async function getComponentLinks(
  loadDocs: DocsCollectionLoader,
  variant: ComponentListVariant = "all"
) {
  return createComponentLinks(await getDocsPages(loadDocs), variant)
}
