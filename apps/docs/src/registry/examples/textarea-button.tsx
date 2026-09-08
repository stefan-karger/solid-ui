import { Button } from "~/registry/ui/button"
import { Textarea } from "~/registry/ui/textarea"

export default function TextareaButton() {
  return (
    <div class="grid w-full max-w-xs gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
