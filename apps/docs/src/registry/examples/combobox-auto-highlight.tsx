import { createMemo, createSignal } from "solid-js"

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from "~/registry/ui/combobox"
import { InputGroupAddon } from "~/registry/ui/input-group"

type Emoji = {
  value: string
  label: string
}

const emojis: Emoji[] = [
  { value: "sparkles", label: "Sparkles" },
  { value: "rocket", label: "Rocket" },
  { value: "wave", label: "Waving Hand" },
  { value: "fire", label: "Fire" },
  { value: "party", label: "Party Popper" },
  { value: "target", label: "Target" }
]

export default function ComboboxAutoHighlight() {
  const [query, setQuery] = createSignal("")

  const filteredEmojis = createMemo(() => {
    const normalizedQuery = query().trim().toLowerCase()

    if (!normalizedQuery) {
      return emojis
    }

    return emojis.filter((emoji) => emoji.label.toLowerCase().includes(normalizedQuery))
  })

  return (
    <Combobox<Emoji>
      autoHighlight
      options={filteredEmojis()}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      onInputChange={setQuery}
      placeholder="Search emojis"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
    >
      <ComboboxControl class="max-w-sm">
        <ComboboxInput />
        <InputGroupAddon align="inline-end">
          <ComboboxTrigger />
        </InputGroupAddon>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No emoji found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
