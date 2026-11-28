import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { formatDocsBody } from "~/lib/docs-markdown"
import { formatLlmsFull } from "~/lib/llms"

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("docs")
  const entries = pages.map((page) => ({
    page,
    body: formatDocsBody(page, pages)
  }))
  return new Response(formatLlmsFull(entries, site!), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  })
}
