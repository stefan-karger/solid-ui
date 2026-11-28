import type { CollectionEntry } from "astro:content"

import { aiPatterns } from "~/lib/ai-patterns"
import {
  createComponentLinks,
  registryCodeTag,
  tagAttribute,
  toDocsPath,
  type ComponentListVariant
} from "~/lib/docs"
import { getRegistrySource } from "~/lib/registry.server"

type DocsPage = CollectionEntry<"docs">

// The page source with its generated lists written out as Markdown links.
export function formatDocsBody(page: DocsPage, pages: readonly DocsPage[]) {
  const descriptions = new Map(
    pages.map((entry) => [toDocsPath(entry.id), entry.data.description])
  )
  const list = (variant: ComponentListVariant) =>
    createComponentLinks(pages, variant)
      .map(
        ({ title, href }) =>
          `- [${title}](${href}/) — ${descriptions.get(href)}`
      )
      .join("\n")
  return (page.body ?? "")
    .replace(/<ComponentsList\s+variant=["']new["']\s*\/>/g, () => list("new"))
    .replace(/<ComponentsList\s*\/>/g, () => list("all"))
    .replace(/<AiPatternGrid\s*\/>/g, () =>
      aiPatterns
        .map(
          ({ title, href, description }) =>
            `- [${title}](${href}) — ${description}`
        )
        .join("\n")
    )
    .trim()
}

export function formatDocsMarkdown(page: DocsPage, pages: readonly DocsPage[]) {
  const { title, description, component, new: isNew } = page.data
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    ...(component ? ["component: true"] : []),
    ...(isNew ? ["new: true"] : []),
    "---",
    "",
    formatDocsBody(page, pages),
    ""
  ].join("\n")
}

// Writes out the code behind example previews and component sources, so the
// Markdown carries what the page shows. A source keeps its file path as title.
export async function includeDocsExamples(markdown: string) {
  const examples = await Promise.all(
    Array.from(
      markdown.matchAll(registryCodeTag),
      async ([tag, attributes = ""]) => {
        const name = tagAttribute(attributes, "name")
        if (!name) return tag
        const file = tagAttribute(attributes, "file")
        const source = await getRegistrySource({
          name,
          ...(file ? { file } : {})
        })
        const longestRun = Math.max(
          2,
          ...Array.from(source.code.matchAll(/`{3,}/g), ([run]) => run.length)
        )
        const fence = "`".repeat(longestRun + 1)
        const title = tag.startsWith("<ComponentSource")
          ? tagAttribute(attributes, "title")
          : undefined
        const meta = title ? ` title=${JSON.stringify(title)}` : ""
        return `${fence}${source.language}${meta}\n${source.code}\n${fence}`
      }
    )
  )
  let index = 0
  return markdown.replace(registryCodeTag, (tag) => examples[index++] ?? tag)
}
