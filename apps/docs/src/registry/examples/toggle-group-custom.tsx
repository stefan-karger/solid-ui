import { createSignal } from "solid-js"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/registry/ui/toggle-group"
import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"

export default function ToggleGroupFontWeightSelector() {
  const [fontWeight, setFontWeight] = createSignal("normal")
  return (
    <Field>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        value={fontWeight()}
        onChange={setFontWeight}
        variant="outline"
        spacing={2}
        size="lg"
        multiple={false}
      >
        <ToggleGroupItem
          value="light"
          aria-label="Light"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span class="text-2xl leading-none font-light">Aa</span>
          <span class="text-xs text-muted-foreground">Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="normal"
          aria-label="Normal"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span class="text-2xl leading-none font-normal">Aa</span>
          <span class="text-xs text-muted-foreground">Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="medium"
          aria-label="Medium"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span class="text-2xl leading-none font-medium">Aa</span>
          <span class="text-xs text-muted-foreground">Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bold"
          aria-label="Bold"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span class="text-2xl leading-none font-bold">Aa</span>
          <span class="text-xs text-muted-foreground">Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use{" "}
        <code class="rounded-md bg-muted px-1 py-0.5 font-mono">
          font-{fontWeight()}
        </code>{" "}
        to set the font weight.
      </FieldDescription>
    </Field>
  )
}
