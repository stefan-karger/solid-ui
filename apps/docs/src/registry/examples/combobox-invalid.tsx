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

type Country = {
  value: string
  label: string
}

const countries: Country[] = [
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "japan", label: "Japan" }
]

export default function ComboboxInvalid() {
  return (
    <div class="grid w-full max-w-sm gap-2">
      <p class="text-sm font-medium">Country</p>
      <Combobox<Country>
        options={countries}
        optionValue="value"
        optionLabel="label"
        optionTextValue="label"
        placeholder="Choose a country"
        itemComponent={(props) => (
          <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
        )}
      >
        <ComboboxControl>
          <ComboboxInput aria-invalid="true" />
          <InputGroupAddon align="inline-end">
            <ComboboxTrigger />
          </InputGroupAddon>
        </ComboboxControl>
        <ComboboxContent>
          <ComboboxList />
          <ComboboxEmpty>No country found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
      <p class="text-sm text-destructive">Please select a valid country.</p>
    </div>
  )
}
