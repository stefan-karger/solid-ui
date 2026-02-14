import { createSignal, Show } from "solid-js"

import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
  formatDateRange
} from "~/registry/ui/date-picker"

export default function DatePickerRangeDemo() {
  const [range, setRange] = createSignal<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  })

  return (
    <DatePicker>
      <DatePickerTrigger>
        <DatePickerInput class="min-w-[300px]" placeholder="Pick a date range">
          {range().from ? formatDateRange(range().from, range().to) : null}
        </DatePickerInput>
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerCalendar
          mode="range"
          numberOfMonths={2}
          onValueChange={(value: { from: Date | null; to: Date | null }) => setRange(value)}
          value={range()}
        />
      </DatePickerContent>
    </DatePicker>
  )
}
