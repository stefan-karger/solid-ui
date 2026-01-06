import { Checkbox } from "~/registry/ui/checkbox"
import { Label } from "~/registry/ui/label"

export default function LabelDemo() {
  return (
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  )
}
