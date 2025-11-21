import { For } from "solid-js"
import { createAsync, query, useParams } from "@solidjs/router"

import { BlockDisplay } from "~/components/block-display"
import { getAllBlockIds } from "~/lib/blocks"
import { getActiveStyle } from "~/registry/styles"

export default function BlocksPage() {
  const activeStyle = getActiveStyle()
  const params = useParams()

  const blocks = createAsync(() => {
    return getAllBlocks(params.categories)
  })

  return (
    <div class="flex flex-col gap-12 md:gap-24">
      <For each={blocks()}>
        {(name) => <BlockDisplay name={name} styleName={activeStyle.name} />}
      </For>
    </div>
  )
}

const getAllBlocks = query((categories: string) => {
  return getAllBlockIds(["registry:block"], [categories])
}, "getAllBlocks")
