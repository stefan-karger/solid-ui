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

type Member = {
  value: string
  label: string
}

const members: Member[] = [
  { value: "aaron", label: "Aaron Kim" },
  { value: "alex", label: "Alex Rivera" },
  { value: "maya", label: "Maya Patel" },
  { value: "liam", label: "Liam Walker" },
  { value: "nora", label: "Nora Chen" }
]

export default function ComboboxBasic() {
  return (
    <div class="grid w-full max-w-sm gap-2">
      <p class="text-sm font-medium">Assign reviewer</p>
      <Combobox<Member>
        options={members}
        optionValue="value"
        optionLabel="label"
        optionTextValue="label"
        placeholder="Search team members"
        itemComponent={(props) => (
          <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
        )}
      >
        <ComboboxControl>
          <ComboboxInput />
          <InputGroupAddon align="inline-end">
            <ComboboxTrigger />
          </InputGroupAddon>
        </ComboboxControl>
        <ComboboxContent>
          <ComboboxList />
          <ComboboxEmpty>No member found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
