import { CalendarIcon } from "lucide-solid"
import { createSignal, Show } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"
import { Button } from "~/registry/ui/button"
import { Card, CardContent } from "~/registry/ui/card"

export default function DatePickerWithDropdowns() {
  const [date, setDate] = createSignal<Date | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-dropdowns">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          as={Button}
          variant="outline"
          id="date-picker-dropdowns"
          class="justify-start px-2.5 font-normal"
        >
          <CalendarIcon data-icon="inline-start" />
          <Show when={date()} fallback={<span>Pick a date</span>} keyed>
            {(d) => formatDate(d)}
          </Show>
        </PopoverTrigger>
        <PopoverContent as={Card} class="w-fit p-0">
          <CardContent class="p-0">
            <Calendar mode="single" monthYearSelection value={date()} onValueChange={setDate} />
          </CardContent>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
