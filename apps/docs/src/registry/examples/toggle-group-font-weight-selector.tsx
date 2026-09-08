import { createSignal } from "solid-js"

import { FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupFontWeightSelector() {
  const [fontWeight, setFontWeight] = createSignal("normal")

  return (
    <FieldGroup class="w-full max-w-xs">
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        onChange={(value) => setFontWeight(value ?? "normal")}
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
          <span class="text-2xl leading-none font-light">Aa</span>
          <span class="text-xs text-muted-foreground">Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Normal"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="normal"
        >
          <span class="text-2xl leading-none font-normal">Aa</span>
          <span class="text-xs text-muted-foreground">Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Medium"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="medium"
        >
          <span class="text-2xl leading-none font-medium">Aa</span>
          <span class="text-xs text-muted-foreground">Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Bold"
          class="flex size-16 flex-col items-center justify-center rounded-xl"
          value="bold"
        >
          <span class="text-2xl leading-none font-bold">Aa</span>
          <span class="text-xs text-muted-foreground">Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use <code class="rounded-md bg-muted px-1 py-0.5 font-mono">font-{fontWeight()}</code> to
        set the font weight.
      </FieldDescription>
    </FieldGroup>
  )
}
