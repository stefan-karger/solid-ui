import { createSignal } from "solid-js"

import { ArrowRightIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Input } from "~/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

const CURRENCIES = [
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
  const [currency, setCurrency] = createSignal("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              <span class="text-muted-foreground">{props.item.rawValue}</span>
            </SelectItem>
          )}
          multiple={false}
          onChange={setCurrency}
          options={CURRENCIES}
          value={currency()}
        >
          <SelectTrigger class="font-mono">
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
          </SelectTrigger>
          <SelectContent class="min-w-24" />
        </Select>
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
