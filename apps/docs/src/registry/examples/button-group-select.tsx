import { ArrowRightIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Input } from "~/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

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
          defaultValue={currencies[0]!}
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              <span class="font-mono">{props.item.rawValue.value}</span>
              <span class="text-muted-foreground">{props.item.rawValue.label}</span>
            </SelectItem>
          )}
          optionTextValue="label"
          optionValue="value"
          options={currencies}
        >
          <SelectTrigger class="font-mono">
            <SelectValue<Currency>>{(state) => state.selectedOption()?.value}</SelectValue>
          </SelectTrigger>
          <SelectContent class="min-w-32" />
        </Select>
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>

      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon class="size-4" />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
