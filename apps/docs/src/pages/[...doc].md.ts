import type { APIRoute, GetStaticPaths } from "astro"
import { getCollection } from "astro:content"

import { toDocsPath } from "~/lib/docs"
import { formatDocsMarkdown, includeDocsExamples } from "~/lib/docs-markdown"

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection("docs")
  return pages.map((page) => ({
    params: { doc: toDocsPath(page.id).slice(1) },
    props: { markdown: formatDocsMarkdown(page, pages) }
  }))
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await includeDocsExamples(props.markdown), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" }
  })
