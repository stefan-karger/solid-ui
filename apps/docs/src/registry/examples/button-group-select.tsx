import { For } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Input } from "~/registry/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"

type Currency = {
  label: string
  value: string
}

const currencies: Currency[] = [
  { value: "$", label: "US Dollar" },
  { value: "€", label: "Euro" },
  { value: "£", label: "British Pound" }
]

export default function ButtonGroupSelect() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select<Currency>
          itemToLabel={(option) => String(option["label"])}
          itemToValue={(option) => String(option["value"])}
          defaultValue={currencies[0]!}
        >
          <SelectTrigger aria-label="Select an option" class="font-mono">
            <SelectValue>
              {(state) =>
                String((state.value as { value: string } | null)?.value ?? "")
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <For each={currencies}>
              {(option) => (
                <SelectItem value={option} label={option["label"]}>
                  <span class="font-mono">{option.value}</span>
                  <span class="text-muted-foreground">{option.label}</span>
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </Select>
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>

      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <IconPlaceholder lucide="ArrowRightIcon" class="size-4" />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
