import { CalendarIcon } from "lucide-solid"
import { createSignal, Show } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"
import { Button } from "~/registry/ui/button"
import { Card, CardContent } from "~/registry/ui/card"

export default function DatePickerWithRange() {
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const [date, setDate] = createSignal<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
      <Popover>
        <PopoverTrigger
          as={Button}
          variant="outline"
          id="date-picker-range"
          class="justify-start px-2.5 font-normal"
        >
          <CalendarIcon data-icon="inline-start" />
          <Show when={date().from} fallback={<span>Pick a date</span>} keyed>
            {(from) => (
              <Show when={date().to} fallback={formatDate(from)} keyed>
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
              mode="range"
              defaultMonth={date().from ?? undefined}
              value={date()}
              onValueChange={setDate}
              numberOfMonths={2}
            />
          </CardContent>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
