import type { CollectionEntry } from "astro:content"

import { aiPatterns } from "~/lib/ai-patterns"
import {
  createComponentLinks,
  toDocsPath,
  type ComponentListVariant
} from "~/lib/docs"
import { getRegistrySource } from "~/lib/registry.server"

type DocsPage = CollectionEntry<"docs">

export function formatDocsMarkdown(page: DocsPage, pages: readonly DocsPage[]) {
  const { title, description, component, new: isNew } = page.data
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
  const body = (page.body ?? "")
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

  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    ...(component ? ["component: true"] : []),
    ...(isNew ? ["new: true"] : []),
    "---",
    "",
    body,
    ""
  ].join("\n")
}

export async function includeDocsExamples(markdown: string) {
  const previewTag = /<ComponentPreview\b([^>]*?)\/>/g
  const examples = await Promise.all(
    Array.from(markdown.matchAll(previewTag), async ([tag, attributes]) => {
      const name = attributes?.match(/\bname=["']([^"']+)["']/)?.[1]
      if (!name) return tag
      const file = attributes?.match(/\bfile=["']([^"']+)["']/)?.[1]
      const source = await getRegistrySource({
        name,
        ...(file ? { file } : {})
      })
      const longestRun = Math.max(
        2,
        ...Array.from(source.code.matchAll(/`{3,}/g), ([run]) => run.length)
      )
      const fence = "`".repeat(longestRun + 1)
      return `${fence}${source.language}\n${source.code}\n${fence}`
    })
  )
  let index = 0
  return markdown.replace(previewTag, (tag) => examples[index++] ?? tag)
}
