import { Textarea } from "~/registry/ui/textarea"

export default function TextareaInvalid() {
  return (
    <div class="grid w-full max-w-xs gap-2">
      <label class="text-sm font-medium" for="invalid-feedback">
        Feedback
      </label>
      <Textarea aria-invalid="true" id="invalid-feedback" rows={4}>
        Too short
      </Textarea>
      <p class="text-sm text-destructive">Feedback must be at least 20 characters.</p>
    </div>
  )
}
