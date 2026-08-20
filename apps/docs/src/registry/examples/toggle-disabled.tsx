import { Toggle } from "~/registry/ui/toggle"

export default function ToggleDisabled() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle disabled" disabled>
        Disabled
      </Toggle>
      <Toggle aria-label="Toggle disabled outline" disabled variant="outline">
        Disabled
      </Toggle>
    </div>
  )
}
