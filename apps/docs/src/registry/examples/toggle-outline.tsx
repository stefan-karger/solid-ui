import { BoldIcon, ItalicIcon } from "lucide-solid"

import { Toggle } from "~/registry/ui/toggle"

export default function ToggleOutline() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle italic" variant="outline">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle bold" variant="outline">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}
