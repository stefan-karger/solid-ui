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
const docsSections = [
  { title: "Introduction", routeId: "" },
  { title: "Installation", routeId: "installation" },
  { title: "CLI", routeId: "cli" },
  { title: "Migration", routeId: "migration" },
  { title: "Components", routeId: "components" },
  { title: "AI Elements", routeId: "ai-elements" }
]

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
  const order = new Map(
    docsSections.map(({ routeId }, index) => [routeId, index])
  )
  // AI patterns and framework guides sort with their section; component
  // pages come last.
  const sectionOrder = (id: string) =>
    order.get(id) ??
    (/^(?:ai-elements|installation)\//.test(id)
      ? order.get(id.split("/")[0]!)!
      : order.size)
  return pages.toSorted((a, b) => {
    const aRouteId = toRouteId(a.id)
    const bRouteId = toRouteId(b.id)
    return (
      sectionOrder(aRouteId) - sectionOrder(bRouteId) ||
      aRouteId.localeCompare(bRouteId) ||
      a.id.localeCompare(b.id)
    )
  })
}

export function findNeighbors<T extends DocsPageLike>(
  pages: readonly T[],
  currentId: string
): PageNeighbors<T> {
  const sortedPages = sortDocsPages(pages)
  const normalizedCurrentId = toRouteId(currentId)
  const index = sortedPages.findIndex(
    (page) => toRouteId(page.id) === normalizedCurrentId
  )

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
    .filter(
      (page) => page.data.component && (variant === "all" || page.data.new)
    )
    .map((page) => ({
      title: page.data.title,
      href: toDocsPath(page.id),
      isNew: Boolean(page.data.new)
    }))
    .toSorted(
      (a, b) => a.title.localeCompare(b.title) || a.href.localeCompare(b.href)
    )
}

export function createDocsNavigation(
  pages: readonly DocsPageLike[]
): DocsNavigationGroup[] {
  return [
    {
      title: "Sections",
      links: docsSections.map(({ title, routeId }) => ({
        title,
        href: toDocsPath(routeId)
      }))
    },
    { title: "Components", links: createComponentLinks(pages) },
    {
      title: "AI Elements",
      links: sortDocsPages(pages)
        .filter((page) => toRouteId(page.id).startsWith("ai-elements/"))
        .map((page) => ({ title: page.data.title, href: toDocsPath(page.id) }))
    }
  ]
}

export async function getDocsPages(
  loadDocs: DocsCollectionLoader
): Promise<DocsPage[]> {
  return sortDocsPages(await loadDocs())
}

export async function getNeighbors(id: string, loadDocs: DocsCollectionLoader) {
  return findNeighbors(await getDocsPages(loadDocs), id)
}

export async function getComponentNeighbors(
  id: string,
  loadDocs: DocsCollectionLoader
) {
  return findComponentNeighbors(await getDocsPages(loadDocs), id)
}

export async function getComponentLinks(
  loadDocs: DocsCollectionLoader,
  variant: ComponentListVariant = "all"
) {
  return createComponentLinks(await getDocsPages(loadDocs), variant)
}

// MDX tags that stand for registry code: an example preview or a source file.
export const registryCodeTag = /<Component(?:Preview|Source)\b([^>]*?)\/>/g

export const tagAttribute = (attributes: string, key: string) =>
  attributes.match(new RegExp(`\\b${key}=["']([^"']+)["']`))?.[1]
