import { createSignal, For } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"

const presets = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "In 3 days", days: 3 },
  { label: "In a week", days: 7 },
  { label: "In 2 weeks", days: 14 }
]
const today = "2026-11-18"

export default function CalendarPresets() {
  const [value, setValue] = createSignal<string | null>(today)
  const [month, setMonth] = createSignal(today.slice(0, 7))
  const choose = (days: number) => {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() + days)
    const next = date.toISOString().slice(0, 10)
    setValue(next)
    setMonth(next.slice(0, 7))
  }

  return (
    <div class="flex flex-col items-stretch gap-2 rounded-lg border p-2">
      <Calendar
        aria-label="Choose date"
        value={value()}
        month={month()}
        onMonthChange={setMonth}
        onValueChange={(next) => setValue(typeof next === "string" ? next : null)}
      />
      <div class="flex max-w-72 flex-wrap gap-1">
        <For each={presets}>
          {(preset) => (
            <Button variant="outline" size="sm" onClick={() => choose(preset.days)}>
              {preset.label}
            </Button>
          )}
        </For>
      </div>
    </div>
  )
}
