import { For, Show } from "solid-js"

import {
  Calendar,
  CalendarDayButton,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday
} from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

function weekNumber(date: string | undefined) {
  if (!date) return
  const thursday = new Date(date)
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7))
  const newYear = Date.UTC(thursday.getUTCFullYear(), 0, 1)
  return Math.ceil((thursday.getTime() - newYear + 86_400_000) / 604_800_000)
}

export default function CalendarWeekNumbers() {
  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar defaultMonth="2026-02" defaultValue="2026-02-03" weekStartsOn={1}>
          <div class="flex items-center">
            <CalendarPrevious />
            <CalendarHeading />
            <CalendarNext />
          </div>
          <CalendarGrid>
            {(grid) => (
              <>
                <thead>
                  <tr>
                    <th scope="col" class="w-(--cell-size)">
                      <span class="sr-only">Week number</span>
                    </th>
                    <For each={grid.weekdays} keyed={false}>
                      {(_, index) => <CalendarWeekday index={index} />}
                    </For>
                  </tr>
                </thead>
                <tbody>
                  <For each={grid.weeks} keyed={(week) => week[0]?.date}>
                    {(week) => (
                      <tr>
                        <th scope="row" class="text-xs font-normal text-muted-foreground">
                          {weekNumber(week()[0]?.date)}
                        </th>
                        <For each={week()} keyed={(day) => day.date}>
                          {(day) => (
                            <Show when={!day().hidden} fallback={<td />}>
                              <CalendarDayButton value={day().date} />
                            </Show>
                          )}
                        </For>
                      </tr>
                    )}
                  </For>
                </tbody>
              </>
            )}
          </CalendarGrid>
        </Calendar>
      </CardContent>
    </Card>
  )
}
