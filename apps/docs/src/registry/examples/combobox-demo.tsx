import { createSignal } from "solid-js"

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger
} from "~/registry/ui/combobox"

const frameworks = [
  {
    value: "solidjs",
    label: "SolidJS"
  },
  {
    value: "react",
    label: "React"
  },
  {
    value: "vue",
    label: "Vue"
  },
  {
    value: "svelte",
    label: "Svelte"
  },
  {
    value: "angular",
    label: "Angular"
  }
]

export default function ComboboxDemo() {
  const [value, setValue] = createSignal("")

  return (
    <Combobox
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
      onChange={setValue}
      optionLabel="label"
      options={frameworks}
      optionTextValue="label"
      optionValue="value"
      placeholder="Select a framework..."
      value={value()}
    >
      <ComboboxControl class="w-[200px]">
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxContent />
    </Combobox>
  )
}
