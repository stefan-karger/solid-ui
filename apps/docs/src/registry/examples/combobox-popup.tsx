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

type Timezone = {
  value: string
  label: string
}

const timezones: Timezone[] = [
  { value: "utc", label: "UTC" },
  { value: "pst", label: "Pacific Time (PST)" },
  { value: "est", label: "Eastern Time (EST)" },
  { value: "cet", label: "Central European Time (CET)" },
  { value: "jst", label: "Japan Standard Time (JST)" }
]

export default function ComboboxPopup() {
  return (
    <Combobox<Timezone>
      triggerMode="manual"
      options={timezones}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      placeholder="Select timezone"
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
        <ComboboxEmpty>No timezone found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
