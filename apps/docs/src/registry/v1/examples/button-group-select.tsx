import { createSignal } from "solid-js"

import { IconArrowRight } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import { ButtonGroup } from "~/registry/v1/ui/button-group"
import { Input } from "~/registry/v1/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/v1/ui/select"

type Currency = {
  value: string
  label: string
}

const CURRENCIES: Currency[] = [
  {
    value: "$",
    label: "US Dollar"
  },
  {
    value: "€",
    label: "Euro"
  },
  {
    value: "£",
    label: "British Pound"
  }
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = createSignal<Currency>(CURRENCIES[0])

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {props.item.rawValue.value}{" "}
              <span class="text-muted-foreground">{props.item.rawValue.label}</span>
            </SelectItem>
          )}
          onChange={setCurrency}
          options={CURRENCIES}
          optionTextValue="label"
          optionValue="value"
          value={currency()}
        >
          <SelectTrigger class="font-mono">
            <SelectValue<Currency>>{(state) => state.selectedOption().value}</SelectValue>
          </SelectTrigger>
          <SelectContent class="min-w-24" />
        </Select>
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <IconArrowRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
