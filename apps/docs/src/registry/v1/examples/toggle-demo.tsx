import { Show } from "solid-js"

import { IconBookmark } from "~/components/icons"
import { Toggle } from "~/registry/v1/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      {(state) => (
        <>
          <Show fallback={<IconBookmark />} when={state.pressed()}>
            <IconBookmark class="fill-blue-500 stroke-blue-500" />
          </Show>
          Bookmark
        </>
      )}
    </Toggle>
  )
}
