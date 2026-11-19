import { ClockIcon } from "lucide-solid"

import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export default function CalendarTime() {
  return (
    <div class="grid max-w-64 gap-3 rounded-lg border p-3">
      <Calendar aria-label="Appointment date" defaultValue="2026-11-18" defaultMonth="2026-11" />
      <FieldGroup>
        <Field>
          <FieldLabel for="time-from">Start Time</FieldLabel>
          <InputGroup>
            <InputGroupInput id="time-from" type="time" value="10:30" />
            <InputGroupAddon>
              <ClockIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="time-to">End Time</FieldLabel>
          <InputGroup>
            <InputGroupInput id="time-to" type="time" value="12:30" />
            <InputGroupAddon>
              <ClockIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </div>
  )
}
