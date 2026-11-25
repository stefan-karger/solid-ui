import { Calendar } from "~/registry/ui/calendar"
export default function CalendarRange() {
  return (
    <Calendar
      mode="range"
      defaultValue={["2026-11-17", "2026-11-22"]}
      defaultMonth="2026-11"
      today="2026-11-17"
      months={2}
      class="max-w-full overflow-auto rounded-md border"
    />
  )
}
