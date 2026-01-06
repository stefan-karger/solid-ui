import { Checkbox } from "~/registry/ui/checkbox"
import { Label } from "~/registry/ui/label"

export default function CheckboxDemo() {
  return (
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>
      <div class="flex items-start gap-3">
        <Checkbox defaultChecked id="terms-2" />
        <div class="grid gap-2">
          <Label for="terms-2">Accept terms and conditions</Label>
          <p class="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <Checkbox disabled id="toggle" />
        <Label for="toggle">Enable notifications</Label>
      </div>
      <Label
        class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[data-checked]]:border-blue-600 has-[[data-checked]]:bg-blue-50 dark:has-[[data-checked]]:border-blue-900 dark:has-[[data-checked]]:bg-blue-950"
        for="toggle-2"
      >
        <Checkbox
          class="data-[checked]:border-blue-600 data-[checked]:bg-blue-600 data-[checked]:text-white dark:data-[checked]:border-blue-700 dark:data-[checked]:bg-blue-700"
          defaultChecked
          id="toggle-2"
        />
        <div class="grid gap-1.5 font-normal">
          <p class="font-medium text-sm leading-none">Enable notifications</p>
          <p class="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    </div>
  )
}
