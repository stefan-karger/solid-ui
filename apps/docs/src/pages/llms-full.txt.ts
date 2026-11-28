import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { formatDocsBody, includeDocsExamples } from "~/lib/docs-markdown"
import { formatLlmsFull } from "~/lib/llms"

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("docs")
  const entries = await Promise.all(
    pages.map(async (page) => ({
      page,
      body: await includeDocsExamples(formatDocsBody(page, pages))
    }))
  )
  return new Response(formatLlmsFull(entries, site!), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  })
}
