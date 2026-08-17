import { createSignal } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarWeekNumbers() {
  const [date, setDate] = createSignal<Date | null>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  );

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar mode="single" value={date()} onValueChange={setDate} weekNumbers />
      </CardContent>
    </Card>
  )
}
