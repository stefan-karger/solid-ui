import { Show } from "solid-js"

import { IconBookmark, IconHeart, IconStar } from "~/components/icons"
import { ToggleGroup, ToggleGroupItem } from "~/registry/v1/ui/toggle-group"

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup multiple size="sm" spacing={2} variant="outline">
      <ToggleGroupItem aria-label="Toggle star" value="star">
        {(state) => (
          <>
            <Show fallback={<IconStar />} when={state.pressed()}>
              <IconStar class="fill-yellow-500 stroke-yellow-500" />
            </Show>
            Star
          </>
        )}
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle heart" value="heart">
        {(state) => (
          <>
            <Show fallback={<IconHeart />} when={state.pressed()}>
              <IconHeart class="fill-red-500 stroke-red-500" />
            </Show>
            Heart
          </>
        )}
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle bookmark" value="bookmark">
        {(state) => (
          <>
            <Show fallback={<IconBookmark />} when={state.pressed()}>
              <IconBookmark class="fill-blue-500 stroke-blue-500" />
            </Show>
            Bookmark
          </>
        )}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
