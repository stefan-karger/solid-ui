import {
  CalendarMonthSelect as SdkCalendarMonthSelect,
  CalendarYearSelect as SdkCalendarYearSelect
} from "@ui-sdk/solid/calendar"
import { parseDate } from "chrono-node"
import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Calendar,
  CalendarMonth,
  CalendarNext,
  CalendarPrevious
} from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const referenceDate = new Date(2026, 10, 19)
const formatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
})

function isoDate(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    .toISOString()
    .slice(0, 10)
}

export default function DatePickerNaturalLanguage() {
  const [open, setOpen] = createSignal(false)
  const [value, setValue] = createSignal("In 2 days")
  const [date, setDate] = createSignal("2026-11-21")
  const formatted = () => (date() ? formatter.format(new Date(date())) : "")

  return (
    <Field class="mx-auto max-w-xs">
      <FieldLabel for="date-optional">Schedule Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-optional"
          value={value()}
          placeholder="Tomorrow or next week"
          onInput={(event) => {
            setValue(event.currentTarget.value)
            const parsed = parseDate(event.currentTarget.value, referenceDate)
            if (parsed) setDate(isoDate(parsed))
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open()} onOpenChange={setOpen}>
            <PopoverTrigger
              render={(part) => (
                <InputGroupButton
                  {...part}
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                >
                  <IconPlaceholder lucide="CalendarIcon" />
                </InputGroupButton>
              )}
            />
            <PopoverContent
              class="w-auto overflow-hidden p-0"
              align="end"
              sideOffset={8}
            >
              <Calendar
                aria-label="Select date"
                value={date()}
                defaultMonth={date().slice(0, 7)}
                onValueChange={(selection) => {
                  if (typeof selection !== "string") return
                  setDate(selection)
                  setValue(formatter.format(new Date(selection)))
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
        </InputGroupAddon>
      </InputGroup>
      <div class="px-1 text-sm text-muted-foreground">
        Your post will be published on{" "}
        <span class="font-medium">{formatted()}</span>.
      </div>
    </Field>
  )
}
