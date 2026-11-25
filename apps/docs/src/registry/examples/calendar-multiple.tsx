import { Calendar } from "~/registry/ui/calendar"
export default function CalendarMultiple() {
  return (
    <Calendar
      mode="multiple"
      defaultValue={["2026-11-05", "2026-11-12"]}
      defaultMonth="2026-11"
      today="2026-11-17"
      class="rounded-md border"
    />
  )
}
