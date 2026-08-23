import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarDemo() {
  const [date, setDate] = createSignal(new Date())

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar mode="single" onValueChange={setDate} value={date()} />
      </CardContent>
    </Card>
  )
}
