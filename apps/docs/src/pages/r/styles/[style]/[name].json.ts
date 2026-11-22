import type { APIRoute, GetStaticPaths } from "astro"

import { styles, type DocsStyle } from "~/lib/appearance"
import {
  getDistributionItem,
  installableItems
} from "~/lib/registry-distribution"

export const prerender = true

export const getStaticPaths: GetStaticPaths = () =>
  styles.flatMap((style) =>
    installableItems.map(({ name }) => ({
      params: { style, name },
      props: { name, style }
    }))
  )

export const GET: APIRoute = async ({ props }) => {
  const { name, style } = props as { name: string; style: DocsStyle }
  return Response.json(await getDistributionItem(name, style))
}
