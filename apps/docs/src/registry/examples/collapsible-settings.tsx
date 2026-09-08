import { MaximizeIcon, MinimizeIcon } from "lucide-solid"
import { createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function CollapsibleSettings() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <Card class="mx-auto w-full max-w-xs" size="sm">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="flex items-start gap-2">
          <FieldGroup class="grid w-full grid-cols-2 gap-2">
            <Field>
              <FieldLabel for="radius-x" class="sr-only">
                Radius X
              </FieldLabel>
              <Input id="radius" placeholder="0" value={0} />
            </Field>
            <Field>
              <FieldLabel for="radius-y" class="sr-only">
                Radius Y
              </FieldLabel>
              <Input id="radius" placeholder="0" value={0} />
            </Field>
            <CollapsibleContent class="col-span-full grid grid-cols-subgrid gap-2">
              <Field>
                <FieldLabel for="radius-x" class="sr-only">
                  Radius X
                </FieldLabel>
                <Input id="radius" placeholder="0" value={0} />
              </Field>
              <Field>
                <FieldLabel for="radius-y" class="sr-only">
                  Radius Y
                </FieldLabel>
                <Input id="radius" placeholder="0" value={0} />
              </Field>
            </CollapsibleContent>
          </FieldGroup>
          <CollapsibleTrigger as={Button<"button">} variant="outline" size="icon">
            <Show when={isOpen()} fallback={<MaximizeIcon />}>
              <MinimizeIcon />
            </Show>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
