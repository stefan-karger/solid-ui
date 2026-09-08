import { Checkbox } from "~/registry/ui/checkbox"

export default function CheckboxInvalid() {
  return (
    <div class="grid w-full max-w-sm gap-2">
      <label class="flex items-start gap-3 text-sm">
        <Checkbox aria-invalid="true" />
        <div class="grid gap-1 leading-none">
          <span class="font-medium">Accept privacy policy</span>
          <span class="text-sm text-muted-foreground">This is required before you continue.</span>
        </div>
      </label>
      <p class="text-sm text-destructive">Please accept the privacy policy to continue.</p>
    </div>
  )
}
