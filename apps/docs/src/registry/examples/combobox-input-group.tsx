import { SearchIcon } from "lucide-solid"

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

type Package = {
  value: string
  label: string
}

const packages: Package[] = [
  { value: "@kobalte/core", label: "@kobalte/core" },
  { value: "solid-js", label: "solid-js" },
  { value: "astro", label: "astro" },
  { value: "class-variance-authority", label: "class-variance-authority" }
]

export default function ComboboxInputGroup() {
  return (
    <Combobox<Package>
      options={packages}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      placeholder="Search package"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
    >
      <ComboboxControl class="max-w-md">
        <InputGroupAddon>
          <SearchIcon class="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <ComboboxInput />
        <InputGroupAddon align="inline-end">
          <ComboboxTrigger />
        </InputGroupAddon>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No package found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
