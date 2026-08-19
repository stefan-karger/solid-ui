import { Label } from "~/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup class="w-fit" defaultValue="comfortable">
      <div class="flex items-center gap-3">
        <RadioGroupItem id="radio-group-demo-default" value="default" />
        <Label for="radio-group-demo-default">Default</Label>
      </div>
      <div class="flex items-center gap-3">
        <RadioGroupItem id="radio-group-demo-comfortable" value="comfortable" />
        <Label for="radio-group-demo-comfortable">Comfortable</Label>
      </div>
      <div class="flex items-center gap-3">
        <RadioGroupItem id="radio-group-demo-compact" value="compact" />
        <Label for="radio-group-demo-compact">Compact</Label>
      </div>
    </RadioGroup>
  )
}
