import type { APIRoute } from "astro"

import { getDistributionIndex } from "~/lib/registry-distribution"

export const prerender = true

export const GET: APIRoute = async () =>
  Response.json(await getDistributionIndex())
