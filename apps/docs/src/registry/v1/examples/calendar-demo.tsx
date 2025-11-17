import { Index } from "solid-js"

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
} from "~/registry/v1/ui/calendar"

export default function CalendarDemo() {
  return (
    <Calendar mode="single">
      {(props) => (
        <div class="my-4 rounded-md border border-input p-3 shadow-md md:my-8">
          <CalendarHead>
            <CalendarPrevTrigger />
            <CalendarHeading>
              {formatMonth(props.month)} {props.month.getFullYear()}
            </CalendarHeading>
            <CalendarNextTrigger />
          </CalendarHead>
          <CalendarGrid>
            <CalendarGridHead>
              <CalendarGridHeadRow>
                <Index each={props.weekdays}>
                  {(weekday) => (
                    <CalendarGridHeadCell abbr={formatWeekdayLong(weekday())}>
                      {formatWeekdayShort(weekday())}
                    </CalendarGridHeadCell>
                  )}
                </Index>
              </CalendarGridHeadRow>
            </CalendarGridHead>
            <CalendarGridBody>
              <Index each={props.weeks}>
                {(week) => (
                  <CalendarGridBodyRow>
                    <Index each={week()}>
                      {(day) => (
                        <CalendarGridBodyCell>
                          <CalendarGridBodyCellTrigger day={day()}>
                            {day().getDate()}
                          </CalendarGridBodyCellTrigger>
                        </CalendarGridBodyCell>
                      )}
                    </Index>
                  </CalendarGridBodyRow>
                )}
              </Index>
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      )}
    </Calendar>
  )
}

const { format: formatWeekdayLong } = new Intl.DateTimeFormat("en", {
  weekday: "long"
})
const { format: formatWeekdayShort } = new Intl.DateTimeFormat("en", {
  weekday: "short"
})
const { format: formatMonth } = new Intl.DateTimeFormat("en", {
  month: "long"
})
