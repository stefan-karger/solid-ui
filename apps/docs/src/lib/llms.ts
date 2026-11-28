import {
  registryCodeTag,
  sortDocsPages,
  tagAttribute,
  toDocsPath,
  toRouteId
} from "~/lib/docs"

// llms.txt (https://llmstxt.org) for the docs. Both files are generated from
// the docs collection at build time, so a new or renamed page shows up here
// without any edit.

export type LlmsPage = {
  id: string
  data: { title: string; description: string }
}

const notes = (
  fullUrl: string
) => `Solid UI is an unofficial Solid 2.0 port of shadcn/ui. Components are composed from UI SDK (\`@ui-sdk/solid\`) parts and styled with Tailwind CSS v4.

- Write Solid 2.0 code (\`solid-js\` and \`@solidjs/web\` 2.x). Solid 1.x and React APIs don't apply.
- Set up a project with \`npx solidui-cli@latest init\`. Add components by the name in their \`/docs/components/\` URL, such as \`npx solidui-cli@latest add button dropdown-menu\`. The CLI copies their source into the project.
- Each link below is the page as Markdown, with the source of its examples and components written out. [llms-full.txt](${fullUrl}) has the text of every page in one file, without that code.`

const markdownUrl = (page: LlmsPage, site: URL | string) =>
  new URL(`${toDocsPath(page.id)}.md`, site).href

// Top-level pages come first. Nested pages are grouped under the title of
// their folder's page, in the order of the docs navigation.
function groupPages<T extends LlmsPage>(pages: readonly T[]) {
  const sorted = sortDocsPages(pages)
  const routeIds = sorted.map((page) => toRouteId(page.id))
  const groups = new Map<string, T[]>()
  sorted.forEach((page, index) => {
    const folder = routeIds[index]!.split("/").slice(0, -1).join("/")
    groups.set(folder, [...(groups.get(folder) ?? []), page])
  })
  const position = (folder: string) =>
    folder ? routeIds.indexOf(folder) : -Infinity
  return [...groups]
    .toSorted(([a], [b]) => position(a) - position(b))
    .map(([folder, entries]) => ({
      title: folder
        ? (sorted[routeIds.indexOf(folder)]?.data.title ?? folder)
        : "Docs",
      pages: entries
    }))
}

export function formatLlmsIndex(
  pages: readonly LlmsPage[],
  site: URL | string
) {
  const intro = pages.find((page) => toRouteId(page.id) === "")
  return [
    "# Solid UI",
    ...(intro ? [`> ${intro.data.description}`] : []),
    notes(new URL("/llms-full.txt", site).href),
    ...groupPages(pages).map(({ title, pages }) =>
      [
        `## ${title}`,
        pages
          .map(
            (page) =>
              `- [${page.data.title}](${markdownUrl(page, site)}): ${page.data.description}`
          )
          .join("\n")
      ].join("\n\n")
    )
  ]
    .join("\n\n")
    .concat("\n")
}

// Example and component code makes up most of the page Markdown. Without it
// the text of every page fits a 200k-token context, so llms-full.txt names
// the code and leaves it to each page's Markdown.
const referenceRegistryCode = (body: string) =>
  body.replace(registryCodeTag, (tag, attributes: string) => {
    const name = tagAttribute(attributes, "name")
    if (!name) return tag
    return tag.startsWith("<ComponentSource")
      ? `[Source: ${tagAttribute(attributes, "title") ?? name}]`
      : `[Example: ${name}]`
  })

// llms-full.txt: the text of every page in llms.txt order. Each page's
// Markdown body is passed in, with its generated lists written out.
export function formatLlmsFull(
  pages: readonly { page: LlmsPage; body: string }[],
  site: URL | string
) {
  const order = new Map(
    groupPages(pages.map(({ page }) => page))
      .flatMap((group) => group.pages)
      .map((page, index) => [page.id, index])
  )
  return [
    "# Solid UI: full documentation",
    `> The text of every page listed in ${new URL("/llms.txt", site).href}, as Markdown.`,
    "Examples and component sources appear as `[Example: name]` and `[Source: path]`. The Markdown at each page's Source URL has their code.",
    ...pages
      .toSorted((a, b) => order.get(a.page.id)! - order.get(b.page.id)!)
      .map(({ page, body }) =>
        [
          `# ${page.data.title}`,
          `Source: ${markdownUrl(page, site)}`,
          `> ${page.data.description}`,
          referenceRegistryCode(body).trim()
        ].join("\n\n")
      )
  ]
    .join("\n\n")
    .concat("\n")
}
