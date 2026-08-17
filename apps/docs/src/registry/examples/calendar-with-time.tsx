import { createSignal } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function CalendarWithTime() {
  const [date, setDate] = createSignal<Date | null>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  );
  const [startTime, setStartTime] = createSignal("10:30");
  const [endTime, setEndTime] = createSignal("12:30");

  return (
    <Card class="mx-auto w-fit max-w-sm" size="sm">
      <CardContent>
        <Calendar mode="single" value={date()} onValueChange={setDate} fixedWeeks class="p-0" />
        <div class="mt-4 flex gap-2">
          <Field class="flex-1">
            <FieldLabel for="start-time">Start Time</FieldLabel>
            <Input
              id="start-time"
              type="time"
              value={startTime()}
              onInput={(e) => setStartTime(e.currentTarget.value)}
            />
          </Field>
          <Field class="flex-1">
            <FieldLabel for="end-time">End Time</FieldLabel>
            <Input
              id="end-time"
              type="time"
              value={endTime()}
              onInput={(e) => setEndTime(e.currentTarget.value)}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  )
}
