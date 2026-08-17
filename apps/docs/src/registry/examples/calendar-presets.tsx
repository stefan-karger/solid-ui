import { createSignal, For } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent, CardFooter } from "~/registry/ui/card"
import { Button } from "~/registry/ui/button"

const presets = [
  { label: "Today", value: 0 },
  { label: "Tomorrow", value: 1 },
  { label: "In 3 days", value: 3 },
  { label: "In a week", value: 7 },
  { label: "In 2 weeks", value: 14 },
]

export default function CalendarPresets() {
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const [date, setDate] = createSignal<Date | null>(new Date(new Date().getFullYear(), 1, 12));
  const [currentMonth, setCurrentMonth] = createSignal<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  return (
    <Card class="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent>
        <Calendar
          mode="single"
          value={date()}
          onValueChange={setDate}
          month={currentMonth()}
          onMonthChange={setCurrentMonth}
          fixedWeeks
          class="p-0 [--cell-size:--spacing(9.5)]"
        />
      </CardContent>
      <CardFooter class="flex flex-wrap gap-2 border-t">
        <For each={presets}>
          {(preset) => (
            <Button
              variant="outline"
              size="sm"
              class="flex-1"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value);
                setDate(newDate);
                setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
              }}
            >
              {preset.label}
            </Button>
          )}
        </For>
      </CardFooter>
    </Card>
  )
}
