import { For } from "solid-js"

import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "@/registry/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup>
      <For each={["Apple", "Orange", "Watermelon"]}>
        {(fruit) => (
          <RadioGroupItem value={fruit}>
            <RadioGroupItemLabel>{fruit}</RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
    </RadioGroup>
  )
}
