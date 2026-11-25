import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem
} from "@ui-sdk/solid/combobox"
import { For } from "solid-js"
const items = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" }
]
export default function Native() {
  return (
    <Combobox autoHighlight="always">
      <ComboboxInput aria-label="Native options" />
      <ComboboxContent>
        <ComboboxList>
          <For each={items}>
            {(item) => (
              <ComboboxItem value={item.value}>{item.label}</ComboboxItem>
            )}
          </For>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
