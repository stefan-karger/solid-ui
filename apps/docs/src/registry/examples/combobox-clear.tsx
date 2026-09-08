import { createSignal } from "solid-js"

import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "~/registry/ui/combobox"
import { InputGroupAddon } from "~/registry/ui/input-group"

type Language = {
  value: string
  label: string
}

const languages: Language[] = [
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" }
]

export default function ComboboxClearExample() {
  const [value, setValue] = createSignal<Language | null>(null)

  return (
    <Combobox<Language>
      options={languages}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      value={value()}
      onChange={setValue}
      placeholder="Choose a language"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
    >
      <ComboboxControl<Language> class="max-w-sm">
        <ComboboxInput />
        <InputGroupAddon align="inline-end">
          <ComboboxClear
            aria-label="Clear selection"
            class="text-muted-foreground transition-colors hover:text-foreground"
          />
        </InputGroupAddon>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No language found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
