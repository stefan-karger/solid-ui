import {
  CalendarWeeks as SdkCalendarWeeks,
  CalendarWeekdays as SdkCalendarWeekdays
} from "@ui-sdk/solid/calendar"

import {
  Calendar,
  CalendarDayButton,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday
} from "~/registry/ui/calendar"

function isWeekend(date: string) {
  return [0, 6].includes(new Date(date).getUTCDay())
}

export default function CalendarCustomDays() {
  return (
    <Calendar
      mode="range"
      defaultValue={["2026-11-15", "2026-11-22"]}
      defaultMonth="2026-11"
      class="rounded-lg border"
    >
      <div class="flex items-center">
        <CalendarPrevious />
        <CalendarHeading />
        <CalendarNext />
      </div>
      <CalendarGrid>
        <SdkCalendarWeekdays>{(index) => <CalendarWeekday index={index} />}</SdkCalendarWeekdays>
        <SdkCalendarWeeks>
          {(cell) => (
            <CalendarDayButton
              value={cell.date}
              class={isWeekend(cell.date) ? "text-destructive" : ""}
            />
          )}
        </SdkCalendarWeeks>
      </CalendarGrid>
    </Calendar>
  )
}
