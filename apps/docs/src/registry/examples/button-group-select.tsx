// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For } from "solid-js"

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="size-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
