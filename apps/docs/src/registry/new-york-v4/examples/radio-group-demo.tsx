import { Label } from "~/registry/new-york-v4/ui/label"
import { RadioGroup, RadioGroupItem } from "~/registry/new-york-v4/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div class="flex items-center gap-3">
        <RadioGroupItem id="r1" value="default" />
        <Label for="r1">Default</Label>
      </div>
      <div class="flex items-center gap-3">
        <RadioGroupItem id="r2" value="comfortable" />
        <Label for="r2">Comfortable</Label>
      </div>
      <div class="flex items-center gap-3">
        <RadioGroupItem id="r3" value="compact" />
        <Label for="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
