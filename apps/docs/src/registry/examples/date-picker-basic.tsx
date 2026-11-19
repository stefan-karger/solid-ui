import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const formatDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" })

export default function DatePickerBasic() {
  const [date, setDate] = createSignal<string | null>(null)

  return (
    <Field class="mx-auto w-44">
      <FieldLabel for="date-picker-simple">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={(part) => (
            <Button
              {...part}
              id="date-picker-simple"
              variant="outline"
              class="justify-start font-normal"
            />
          )}
        >
          {date() ? formatDate.format(new Date(date()!)) : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <Calendar
            value={date()}
            defaultMonth={date()?.slice(0, 7) ?? "2026-11"}
            onValueChange={(selection) => setDate(typeof selection === "string" ? selection : null)}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
