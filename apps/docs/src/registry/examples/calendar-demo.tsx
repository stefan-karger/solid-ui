import { createSignal, For } from "solid-js"

import {
  Calendar,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridBodyCell,
  CalendarGridBodyCellTrigger,
  CalendarGridBodyRow,
  CalendarGridHead,
  CalendarGridHeadCell,
  CalendarGridHeadRow,
  CalendarHead,
  CalendarHeading,
  CalendarNextTrigger,
  CalendarPrevTrigger
} from "~/registry/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = createSignal<Date | null>(new Date())

  return (
    <div class="rounded-md border p-3 shadow-sm">
      <Calendar mode="single" onValueChange={(value) => setDate(value)} value={date()}>
        {(props) => (
          <>
            <CalendarHead>
              <CalendarPrevTrigger />
              <CalendarHeading />
              <CalendarNextTrigger />
            </CalendarHead>
            <CalendarGrid>
              <CalendarGridHead>
                <CalendarGridHeadRow>
                  <For each={props.weekdays}>
                    {(weekday) => (
                      <CalendarGridHeadCell>
                        {weekday.toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}
                      </CalendarGridHeadCell>
                    )}
                  </For>
                </CalendarGridHeadRow>
              </CalendarGridHead>
              <CalendarGridBody>
                <For each={props.weeks}>
                  {(week) => (
                    <CalendarGridBodyRow>
                      <For each={week}>
                        {(day) => (
                          <CalendarGridBodyCell>
                            <CalendarGridBodyCellTrigger day={day}>
                              {day.getDate()}
                            </CalendarGridBodyCellTrigger>
                          </CalendarGridBodyCell>
                        )}
                      </For>
                    </CalendarGridBodyRow>
                  )}
                </For>
              </CalendarGridBody>
            </CalendarGrid>
          </>
        )}
      </Calendar>
    </div>
  )
}
