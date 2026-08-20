import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarRange() {
  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const [dateRange, setDateRange] = createSignal<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
  })

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          defaultMonth={dateRange().from ?? undefined}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          mode="range"
          numberOfMonths={2}
          onValueChange={setDateRange}
          value={dateRange()}
        />
      </CardContent>
    </Card>
  )
}
