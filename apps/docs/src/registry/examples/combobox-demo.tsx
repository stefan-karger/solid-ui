import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxHiddenSelect,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from "~/registry/ui/combobox"
import { InputGroupAddon } from "~/registry/ui/input-group"

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
      options={frameworks}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      placeholder="Select a framework"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
    >
      <ComboboxHiddenSelect />
      <ComboboxControl class="max-w-sm">
        <ComboboxInput />
        <InputGroupAddon align="inline-end">
          <ComboboxTrigger />
        </InputGroupAddon>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
