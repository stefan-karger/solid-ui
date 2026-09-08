import { BoldIcon, ItalicIcon } from "lucide-solid"

import { Toggle } from "~/registry/ui/toggle"

export default function ToggleOutline() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}
