import { Checkbox } from "~/registry/v1/ui/checkbox"
import { Label } from "~/registry/v1/ui/label"

export default function LabelDemo() {
  return (
    <div>
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
