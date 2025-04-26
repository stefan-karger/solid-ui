import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function CheckboxDemo() {
  return (
    <div class="flex items-center space-x-2">
      <Checkbox id="terms1" indeterminate />
      <Label for="terms1-input">Indeterminate Checkbox</Label>
    </div>
  )
}
