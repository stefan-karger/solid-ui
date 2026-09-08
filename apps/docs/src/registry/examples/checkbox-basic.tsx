import { Checkbox } from "~/registry/ui/checkbox"

export default function CheckboxBasic() {
  return (
    <label class="flex items-center gap-2 text-sm leading-none">
      <Checkbox />
      Accept terms and conditions
    </label>
  )
}
