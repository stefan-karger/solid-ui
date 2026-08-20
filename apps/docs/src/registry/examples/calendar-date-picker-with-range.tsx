import { createSignal, Show } from "solid-js"

import { CalendarIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function DatePickerWithRange() {
  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const [date, setDate] = createSignal<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
      <Popover>
        <PopoverTrigger
          as={Button}
          class="justify-start px-2.5 font-normal"
          id="date-picker-range"
          variant="outline"
        >
          <CalendarIcon data-icon="inline-start" />
          <Show fallback={<span>Pick a date</span>} keyed when={date().from}>
            {(from) => (
              <Show fallback={formatDate(from)} keyed when={date().to}>
                {(to) => (
                  <>
                    {formatDate(from)} - {formatDate(to)}
                  </>
                )}
              </Show>
            )}
          </Show>
        </PopoverTrigger>
        <PopoverContent as={Card} class="w-fit p-0">
          <CardContent class="p-0">
            <Calendar
              defaultMonth={date().from ?? undefined}
              mode="range"
              numberOfMonths={2}
              onValueChange={setDate}
              value={date()}
            />
          </CardContent>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
