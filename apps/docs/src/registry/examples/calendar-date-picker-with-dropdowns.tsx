import { createSignal, Show } from "solid-js"

import { CalendarIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function DatePickerWithDropdowns() {
  const [date, setDate] = createSignal<Date | null>(null)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-dropdowns">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          as={Button}
          class="justify-start px-2.5 font-normal"
          id="date-picker-dropdowns"
          variant="outline"
        >
          <CalendarIcon data-icon="inline-start" />
          <Show fallback={<span>Pick a date</span>} keyed when={date()}>
            {(d) => formatDate(d)}
          </Show>
        </PopoverTrigger>
        <PopoverContent as={Card} class="w-fit p-0">
          <CardContent class="p-0">
            <Calendar mode="single" monthYearSelection onValueChange={setDate} value={date()} />
          </CardContent>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
