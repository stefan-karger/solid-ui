import { createSignal, Show } from "solid-js"

import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
  formatDate
} from "~/registry/ui/date-picker"

export default function DatePickerDemo() {
  const [date, setDate] = createSignal<Date | null>(null)

  return (
    <DatePicker>
      <DatePickerTrigger>
        <DatePickerInput placeholder="Pick a date">
          {date() ? formatDate(date()!) : null}
        </DatePickerInput>
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerCalendar
          mode="single"
          value={date()}
          onValueChange={(value: Date | null) => setDate(value)}
        />
      </DatePickerContent>
    </DatePicker>
  )
}
