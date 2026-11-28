import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { formatLlmsIndex } from "~/lib/llms"

export const GET: APIRoute = async ({ site }) =>
  new Response(formatLlmsIndex(await getCollection("docs"), site!), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  })
