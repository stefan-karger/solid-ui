import { CalendarIcon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const initialDate = "2025-06-01"
const formatDate = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
})

export default function DatePickerInputDemo() {
  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal(initialDate)
  const [month, setMonth] = createSignal(initialDate.slice(0, 7))
  const [value, setValue] = createSignal(
    formatDate.format(new Date(initialDate))
  )

  return (
    <Field class="mx-auto w-48">
      <FieldLabel for="date-required">Subscription Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          placeholder="June 01, 2025"
          value={value()}
          onInput={(event) => {
            const text = event.currentTarget.value
            setValue(text)
            const parsed = new Date(text)
            if (Number.isNaN(parsed.getTime())) return
            const isoDate = /^\d{4}-\d{2}-\d{2}$/.test(text)
              ? text
              : new Date(
                  Date.UTC(
                    parsed.getFullYear(),
                    parsed.getMonth(),
                    parsed.getDate()
                  )
                )
                  .toISOString()
                  .slice(0, 10)
            setDate(isoDate)
            setMonth(isoDate.slice(0, 7))
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
                  <CalendarIcon />
                </InputGroupButton>
              )}
            />
            <PopoverContent
              class="w-auto overflow-hidden p-0"
              align="end"
              sideOffset={10}
            >
              <Calendar
                value={date()}
                month={month()}
                onMonthChange={setMonth}
                onValueChange={(selection) => {
                  if (typeof selection !== "string") return
                  setDate(selection)
                  setValue(formatDate.format(new Date(selection)))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
