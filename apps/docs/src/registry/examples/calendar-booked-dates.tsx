import { createSignal } from "solid-js"
import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarBookedDates() {
  const [date, setDate] = createSignal<Date | null>(null);

  // Dates that are "booked" (shown as disabled with different styling)
  const bookedDates = [
    new Date(new Date().getFullYear(), new Date().getMonth(), 8),
    new Date(new Date().getFullYear(), new Date().getMonth(), 9),
    new Date(new Date().getFullYear(), new Date().getMonth(), 10),
    new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    new Date(new Date().getFullYear(), new Date().getMonth(), 16),
    new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    new Date(new Date().getFullYear(), new Date().getMonth(), 25),
  ];

  const isSameDay = (a: Date, b: Date): boolean => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const isBooked = (day: Date) => {
    return bookedDates.some((bookedDate) => isSameDay(bookedDate, day));
  };

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar mode="single" value={date()} onValueChange={setDate} booked={isBooked} />
      </CardContent>
    </Card>
  )
}
