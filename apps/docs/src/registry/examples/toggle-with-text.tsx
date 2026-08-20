import { ItalicIcon } from "lucide-solid"

import { Toggle } from "~/registry/ui/toggle"

export default function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
