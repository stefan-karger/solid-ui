import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC"
})

export default function DatePickerRange() {
  const [range, setRange] = createSignal<[string, string] | null>([
    "2026-01-20",
    "2026-02-09"
  ])

  return (
    <Field class="mx-auto w-60">
      <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={(part) => (
            <Button
              {...part}
              id="date-picker-range"
              variant="outline"
              class="justify-start px-2.5 font-normal"
            />
          )}
        >
          <IconPlaceholder lucide="CalendarIcon" />
          {range()
            ?.map((date) => formatDate.format(new Date(date)))
            .join(" - ") ?? <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent
          class="w-auto max-w-[calc(100vw-2rem)] overflow-auto p-0"
          align="start"
        >
          <Calendar
            mode="range"
            months={2}
            value={range()}
            defaultMonth={range()?.[0].slice(0, 7) ?? "2026-01"}
            onValueChange={(value) => {
              const [start, end] =
                value && typeof value !== "string" ? value : []
              setRange(start && end ? [start, end] : null)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
