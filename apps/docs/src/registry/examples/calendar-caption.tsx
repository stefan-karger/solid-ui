import { createSignal, For } from "solid-js"

import { Calendar, CalendarMonth, CalendarNext, CalendarPrevious } from "~/registry/ui/calendar"

const months = Array.from({ length: 12 }, (_, index) => ({
  value: String(index + 1).padStart(2, "0"),
  label: new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2026, index, 1))
  )
}))
const years = Array.from({ length: 11 }, (_, index) => String(2021 + index))

export default function CalendarCaption() {
  const [month, setMonth] = createSignal("2026-11")
  return (
    <Calendar
      aria-label="Choose date"
      month={month()}
      onMonthChange={setMonth}
      class="rounded-lg border"
    >
      <div class="flex items-center justify-between gap-1">
        <CalendarPrevious />
        <select
          aria-label="Month"
          value={month().slice(5)}
          onChange={(event) => setMonth(`${month().slice(0, 4)}-${event.currentTarget.value}`)}
        >
          <For each={months}>
            {(option) => <option value={option.value}>{option.label}</option>}
          </For>
        </select>
        <select
          aria-label="Year"
          value={month().slice(0, 4)}
          onChange={(event) => setMonth(`${event.currentTarget.value}-${month().slice(5)}`)}
        >
          <For each={years}>{(year) => <option value={year}>{year}</option>}</For>
        </select>
        <CalendarNext />
      </div>
      <CalendarMonth />
    </Calendar>
  )
}
