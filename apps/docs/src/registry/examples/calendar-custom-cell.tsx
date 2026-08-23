import { createSignal, Show } from "solid-js"

import { addDays } from "date-fns"

import { Calendar, type CustomCellProps } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarCustomCell() {
  const [range, setRange] = createSignal<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().getFullYear(), 0, 8),
    to: addDays(new Date(new Date().getFullYear(), 0, 8), 10)
  })

  const renderPriceCell = (props: CustomCellProps) => {
    const isWeekend = () => props.date.getDay() === 0 || props.date.getDay() === 6

    return (
      <Show when={!props.isOutsideMonth}>
        <span
          class={`text-[0.65rem] ${props.isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
        >
          ${isWeekend() ? "100" : "80"}
        </span>
      </Show>
    )
  }

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          class="[--cell-size:--spacing(11)]"
          customCell={renderPriceCell}
          mode="range"
          onValueChange={setRange}
          value={range()}
        />
      </CardContent>
    </Card>
  )
}
