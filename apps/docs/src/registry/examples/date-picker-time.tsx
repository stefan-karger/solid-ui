import {
  CalendarMonthSelect as SdkCalendarMonthSelect,
  CalendarYearSelect as SdkCalendarYearSelect
} from "@ui-sdk/solid/calendar"
import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  Calendar,
  CalendarMonth,
  CalendarNext,
  CalendarPrevious
} from "~/registry/ui/calendar"
import { Field, FieldLabel, FieldGroup } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const formatDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC"
})

export default function DatePickerTime() {
  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<string | null>(null)

  return (
    <FieldGroup class="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel for="date-picker-optional">Date</FieldLabel>
        <Popover open={open()} onOpenChange={setOpen}>
          <PopoverTrigger
            render={(part) => (
              <Button
                {...part}
                id="date-picker-optional"
                variant="outline"
                class="w-32 justify-between font-normal"
              />
            )}
          >
            {date() ? formatDate.format(new Date(date()!)) : "Select date"}
            <IconPlaceholder lucide="ChevronDownIcon" />
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
      <Field class="w-32">
        <FieldLabel for="time-picker-optional">Time</FieldLabel>
        <Input
          id="time-picker-optional"
          type="time"
          step="1"
          value="10:30:00"
          class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}
