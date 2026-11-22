import type { APIRoute, GetStaticPaths } from "astro"

import {
  getLegacyIndex,
  getLegacyItem,
  legacyItems
} from "~/lib/registry-distribution"

export const prerender = true

export const getStaticPaths: GetStaticPaths = () => [
  { params: { path: "index" }, props: {} },
  ...legacyItems.map(({ name }) => ({
    params: { path: `ui/${name}` },
    props: { name }
  }))
]

export const GET: APIRoute = async ({ props }) => {
  const { name } = props as { name?: string }
  return Response.json(
    name ? await getLegacyItem(name) : await getLegacyIndex()
  )
}
