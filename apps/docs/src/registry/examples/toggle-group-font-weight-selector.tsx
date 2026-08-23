import { createSignal } from "solid-js"

import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupFontWeightSelector() {
  const [fontWeight, setFontWeight] = createSignal("normal")
  return (
    <Field>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        multiple={false}
        onChange={setFontWeight}
        size="lg"
        spacing={2}
        value={fontWeight()}
        variant="outline"
      >
        <ToggleGroupItem
          aria-label="Light"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="light"
        >
          <span class="font-light text-2xl leading-none">Aa</span>
          <span class="text-muted-foreground text-xs">Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Normal"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="normal"
        >
          <span class="font-normal text-2xl leading-none">Aa</span>
          <span class="text-muted-foreground text-xs">Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Medium"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="medium"
        >
          <span class="font-medium text-2xl leading-none">Aa</span>
          <span class="text-muted-foreground text-xs">Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Bold"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="bold"
        >
          <span class="font-bold text-2xl leading-none">Aa</span>
          <span class="text-muted-foreground text-xs">Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use <code class="rounded-md bg-muted px-1 py-0.5 font-mono">font-{fontWeight()}</code> to
        set the font weight.
      </FieldDescription>
    </Field>
  )
}
