import { For } from "solid-js"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "~/registry/ui/combobox"

type Framework = {
  value: string
  label: string
}

const frameworks: Framework[] = [
  { value: "solid", label: "Solid" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "react", label: "React" },
  { value: "astro", label: "Astro" }
]

export default function ComboboxDemo() {
  return (
    <Combobox<Framework>
      itemToLabel={(option) => String(option["label"])}
      itemToValue={(option) => String(option["value"])}
    >
      <ComboboxInput
        class="w-full max-w-sm"
        placeholder="Select a framework"
        aria-label="Select a framework"
      />
      <ComboboxContent>
        <ComboboxList>
          <For each={frameworks}>
            {(option) => (
              <ComboboxItem value={option} label={option["label"]}>
                {option.label}
              </ComboboxItem>
            )}
          </For>
        </ComboboxList>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
