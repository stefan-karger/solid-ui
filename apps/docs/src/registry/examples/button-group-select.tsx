import { createSignal } from "solid-js"

import { ArrowRight } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Input } from "~/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/registry/ui/select"

const currencies = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" }
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = createSignal(currencies[0]!.value)

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
          onChange={(item) => setCurrency(item?.value ?? "$")}
          options={currencies}
          optionTextValue="label"
          optionValue="value"
          value={currencies.find((item) => item.value === currency())}
        >
          <SelectTrigger class="font-mono">{currency()}</SelectTrigger>
          <SelectContent />
        </Select>
        <Input inputmode="numeric" placeholder="10.00" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
