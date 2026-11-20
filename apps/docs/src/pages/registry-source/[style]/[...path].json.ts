import type { APIRoute, GetStaticPaths } from "astro"

import { styles } from "~/lib/appearance"
import { getRegistrySource } from "~/lib/registry.server"
import { registry } from "~/registry"

export const getStaticPaths: GetStaticPaths = () => {
  const files = new Map<string, { name: string; file: string }>()
  for (const item of registry.items)
    for (const file of item.files ?? []) {
      if (!files.has(file.path))
        files.set(file.path, { name: item.name, file: file.path })
    }
  return styles.flatMap((style) =>
    Array.from(files.values(), (file) => ({
      params: { style, path: file.file },
      props: { ...file, styleName: style }
    }))
  )
}

export const GET: APIRoute = async ({ props }) => {
  const source = await getRegistrySource(
    props as { name: string; file: string; styleName: string }
  )
  return Response.json(source)
}
