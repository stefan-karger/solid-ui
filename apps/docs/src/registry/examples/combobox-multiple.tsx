import { For } from "solid-js"

import { ComboboxValue, ComboboxChips } from "~/registry/ui/combobox"
import {
  Combobox,
  ComboboxChip,
  ComboboxChipInput,
  ComboboxChipRemove,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList
} from "~/registry/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro"
] as const

export default function ComboboxMultiple() {
  return (
    <Combobox<string, true>
      multiple
      autoHighlight
      defaultValue={[frameworks[0]]}
    >
      <ComboboxChips class="w-full max-w-xs">
        <ComboboxValue>
          {(state) => (
            <>
              <For each={state.value as string[]}>
                {(option) => (
                  <ComboboxChip value={option}>
                    {option}
                    <ComboboxChipRemove aria-label={`Remove ${option}`} />
                  </ComboboxChip>
                )}
              </For>
            </>
          )}
        </ComboboxValue>
        <ComboboxChipInput
          aria-label="Frameworks"
          class="min-w-24"
          placeholder="Add a framework"
        />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxList>
          <For each={frameworks}>
            {(option) => (
              <ComboboxItem value={option} label={option}>
                {option}
              </ComboboxItem>
            )}
          </For>
        </ComboboxList>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
