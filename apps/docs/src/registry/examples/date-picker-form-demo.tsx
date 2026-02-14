import { createSignal, Show } from "solid-js"

import { createForm, type SubmitHandler } from "@modular-forms/solid"

import { Button } from "~/registry/ui/button"
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
  formatDate
} from "~/registry/ui/date-picker"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/registry/ui/form"

type EventFormValues = {
  eventDate: string
}

export default function DatePickerFormDemo() {
  const [eventForm, { Form, Field }] = createForm<EventFormValues>({
    initialValues: {
      eventDate: ""
    }
  })

  const [date, setDate] = createSignal<Date | null>(null)

  const handleSubmit: SubmitHandler<EventFormValues> = (values) => {
    alert(`Event date: ${values.eventDate}`)
  }

  return (
    <div class="w-full max-w-md">
      <Form class="space-y-6" onSubmit={handleSubmit}>
        <FormField name="eventDate" of={eventForm}>
          <FormItem class="flex flex-col">
            <FormLabel>Event date</FormLabel>
            <Field name="eventDate">
              {(_field, props) => (
                <>
                  <input {...props} type="hidden" value={date()?.toISOString() ?? ""} />
                  <DatePicker>
                    <DatePickerTrigger>
                      <DatePickerInput placeholder="Pick a date">
                        <Show when={date()}>{(d) => <span>{formatDate(d())}</span>}</Show>
                      </DatePickerInput>
                    </DatePickerTrigger>
                    <DatePickerContent>
                      <DatePickerCalendar
                        mode="single"
                        onValueChange={(value: Date | null) => {
                          setDate(value)
                        }}
                        value={date()}
                      />
                    </DatePickerContent>
                  </DatePicker>
                  <FormDescription>The date of the event you are creating.</FormDescription>
                  <FormMessage />
                </>
              )}
            </Field>
          </FormItem>
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
