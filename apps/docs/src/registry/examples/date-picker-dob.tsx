import {
  CalendarMonthSelect as SdkCalendarMonthSelect,
  CalendarYearSelect as SdkCalendarYearSelect
} from "@ui-sdk/solid/calendar"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar, CalendarMonth, CalendarNext, CalendarPrevious } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const formatDate = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" })

export default function DatePickerDob() {
  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<string | null>(null)

  return (
    <Field class="mx-auto w-44">
      <FieldLabel for="date-picker-dob">Date of birth</FieldLabel>
      <Popover open={open()} onOpenChange={setOpen}>
        <PopoverTrigger
          render={(part) => (
            <Button
              {...part}
              id="date-picker-dob"
              variant="outline"
              class="justify-start font-normal"
            />
          )}
        >
          {date() ? formatDate.format(new Date(date()!)) : "Select date"}
        </PopoverTrigger>
        <PopoverContent class="w-auto overflow-hidden p-0" align="start">
          <Calendar
            value={date()}
            defaultMonth={date()?.slice(0, 7) ?? "2026-11"}
            onValueChange={(selection) => {
              setDate(typeof selection === "string" ? selection : null)
              setOpen(false)
            }}
          >
            <div class="flex items-center justify-between">
              <CalendarPrevious />
              <SdkCalendarMonthSelect aria-label="Month" />
              <SdkCalendarYearSelect aria-label="Year" />
              <CalendarNext />
            </div>
            <CalendarMonth />
          </Calendar>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
