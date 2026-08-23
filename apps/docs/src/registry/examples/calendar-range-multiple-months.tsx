import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarRangeMultipleMonths() {
  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const [range, setRange] = createSignal<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().getFullYear(), 3, 12),
    to: addDays(new Date(new Date().getFullYear(), 3, 12), 60)
  })

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="overflow-x-auto p-0">
        <Calendar
          defaultMonth={range().from ?? undefined}
          fixedWeeks
          mode="range"
          numberOfMonths={3}
          onValueChange={setRange}
          value={range()}
        />
      </CardContent>
    </Card>
  )
}
