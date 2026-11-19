import { Calendar } from "~/registry/ui/calendar"

const booked = ["2026-11-07", "2026-11-15", "2026-11-21", "2026-11-28"]

export default function CalendarBookedDates() {
  return (
    <div class="grid gap-2">
      <Calendar
        aria-label="Book an appointment"
        unavailable={booked}
        defaultMonth="2026-11"
        class="rounded-lg border"
      />
      <p class="text-center text-xs text-muted-foreground">Booked dates are unavailable.</p>
    </div>
  )
}
