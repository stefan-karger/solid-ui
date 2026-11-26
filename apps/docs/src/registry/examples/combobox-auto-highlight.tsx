import { For } from "solid-js"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
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

export default function ComboboxAutoHighlight() {
  return (
    <Combobox<string> autoHighlight>
      <ComboboxInput
        placeholder="Select a framework"
        aria-label="Select a framework"
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          <For each={frameworks}>
            {(item) => <ComboboxItem value={item}>{item}</ComboboxItem>}
          </For>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
