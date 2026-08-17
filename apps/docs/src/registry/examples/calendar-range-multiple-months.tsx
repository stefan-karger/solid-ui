import { createSignal } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarRangeMultipleMonths() {
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const [range, setRange] = createSignal<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().getFullYear(), 3, 12),
    to: addDays(new Date(new Date().getFullYear(), 3, 12), 60),
  });

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0 overflow-x-auto">
        <Calendar
          mode="range"
          defaultMonth={range().from ?? undefined}
          value={range()}
          onValueChange={setRange}
          numberOfMonths={3}
          fixedWeeks
        />
      </CardContent>
    </Card>
  )
}
