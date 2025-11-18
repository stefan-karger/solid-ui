import { type ComponentProps, createResource, mergeProps, splitProps } from "solid-js"
import { createAsync } from "@solidjs/router"

import { CopyButton } from "~/components/copy-button"
import { getIconForLanguageExtension } from "~/components/icons"
import { highlightCode } from "~/lib/highlight-code"
import { getRegistryItem } from "~/lib/registry"
import type { Style } from "~/registry/styles"

type ComponentSourceProps = ComponentProps<"div"> & {
  name: string
  title?: string
  language?: string
  collapsible: boolean
  styleName: Style["name"]
}

export function ComponentSource(rawProps: ComponentSourceProps) {
  const props = mergeProps(rawProps, {
    collapsible: true,
    styleName: "new-york-v4"
  })

  const [local, _other] = splitProps(props as ComponentSourceProps, [
    "class",
    "name",
    "title",
    "language",
    "collapsible",
    "styleName"
  ])

  const result = createAsync(async () => {
    const item = await getRegistryItem(local.name, local.styleName)

    let code = item?.files?.[0]?.content!

    // Fix imports.
    // Replace @/registry/${style}/ with @/components/.
    code = code.replaceAll(`~/registry/${local.styleName}/`, "~/components/")

    // Replace export default with export.
    code = code.replaceAll("export default", "export")

    const highlightedCode = await highlightCode(code, lang)
    return {
      code: code,
      highlightedCode: highlightedCode
    }
  })

  const lang = local.language ?? local.title?.split(".").pop() ?? "tsx"

  return (
    <figure class="[&>pre]:max-h-96" data-rehype-pretty-code-figure="">
      {local.title && (
        <figcaption
          class="flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70"
          data-language={lang}
          data-rehype-pretty-code-title=""
        >
          {getIconForLanguageExtension(lang)}
          {local.title}
        </figcaption>
      )}
      <CopyButton value={result()?.code!} />
      <div innerHTML={result()?.highlightedCode!} />
    </figure>
  )
}
