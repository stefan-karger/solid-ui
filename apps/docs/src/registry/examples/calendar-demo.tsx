import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
export default function CalendarDemo() {
  const [value, setValue] = createSignal<string | null>("2026-11-17")
  return (
    <div class="grid gap-3">
      <Calendar
        value={value()}
        onValueChange={(v) => setValue(typeof v === "string" ? v : null)}
        defaultMonth="2026-11"
        today="2026-11-17"
        class="rounded-md border"
      />
      <output class="text-center text-sm">{value() ?? "Choose a day"}</output>
    </div>
  )
}
