import { ChevronDownIcon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

const formatDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" })

export default function DatePickerDemo() {
  const [date, setDate] = createSignal<string | null>(null)
  return (
    <Popover>
      <PopoverTrigger
        render={(part) => (
          <Button
            {...part}
            variant="outline"
            data-empty={date() === null ? "true" : "false"}
            class="w-[212px] justify-between text-start font-normal data-[empty=true]:text-muted-foreground"
          />
        )}
      >
        <span>{date() ? formatDate.format(new Date(date()!)) : "Pick a date"}</span>
        <ChevronDownIcon />
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          value={date()}
          defaultMonth="2026-11"
          onValueChange={(selection) => setDate(typeof selection === "string" ? selection : null)}
        />
      </PopoverContent>
    </Popover>
  )
}
