import { createSignal, Show } from "solid-js"

import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerPreset,
  DatePickerPresets,
  DatePickerTrigger,
  formatDate
} from "~/registry/ui/date-picker"

export default function DatePickerWithPresetsDemo() {
  const [date, setDate] = createSignal<Date | null>(null)

  const addDays = (days: number): Date => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
  }

  return (
    <DatePicker>
      <DatePickerTrigger>
        <DatePickerInput placeholder="Pick a date">
          {date() ? formatDate(date()!) : null}
        </DatePickerInput>
      </DatePickerTrigger>
      <DatePickerContent>
        <div class="flex">
          <DatePickerCalendar
            mode="single"
            onValueChange={(value: Date | null) => setDate(value)}
            value={date()}
          />
          <DatePickerPresets>
            <DatePickerPreset onClick={() => setDate(new Date())}>Today</DatePickerPreset>
            <DatePickerPreset onClick={() => setDate(addDays(1))}>Tomorrow</DatePickerPreset>
            <DatePickerPreset onClick={() => setDate(addDays(3))}>In 3 days</DatePickerPreset>
            <DatePickerPreset onClick={() => setDate(addDays(7))}>In a week</DatePickerPreset>
            <DatePickerPreset onClick={() => setDate(addDays(30))}>In a month</DatePickerPreset>
          </DatePickerPresets>
        </div>
      </DatePickerContent>
    </DatePicker>
  )
}
