import { Textarea } from "~/registry/ui/textarea"

export default function TextareaField() {
  return (
    <div class="grid w-full max-w-xs gap-2">
      <label class="text-sm font-medium" for="field-message">
        Message
      </label>
      <Textarea id="field-message" placeholder="Type your message here." rows={4} />
      <p class="text-sm text-muted-foreground">Max 500 characters.</p>
    </div>
  )
}
