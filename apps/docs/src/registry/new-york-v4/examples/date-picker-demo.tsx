import { Index, Show } from "solid-js"

import { IconChevronDown } from "~/components/icons"
import { Label } from "~/registry/new-york-v4/ui//label"
import { Button } from "~/registry/new-york-v4/ui/button"
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
} from "~/registry/new-york-v4/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/new-york-v4/ui/popover"

export default function DatePickerDemo() {
  return (
    <Calendar mode="single">
      {(props) => (
        <Popover placement="bottom-start">
          <div class="flex flex-col gap-3">
            <Label class="px-1" for="date">
              Date of birth
            </Label>
            <Button as={PopoverTrigger} class="w-48 justify-between font-normal" variant="outline">
              <Show fallback={<span>Pick a date</span>} when={props.value}>
                <span>{formatTrigger(props.value!)}</span>
              </Show>
              <IconChevronDown />
            </Button>
          </div>
          <PopoverContent class="w-auto overflow-hidden">
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
          </PopoverContent>
        </Popover>
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
const { format: formatTrigger } = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric"
})
