import { createSignal, Show } from "solid-js"

import { MaximizeIcon, MinimizeIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function CollapsibleSettings() {
  const [open, setOpen] = createSignal(false)

  return (
    <Card class="mx-auto w-full max-w-xs" size="sm">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible class="flex items-start gap-2" onOpenChange={setOpen} open={open()}>
          <FieldGroup class="grid w-full grid-cols-2 gap-2">
            <Field>
              <FieldLabel class="sr-only" for="collapsible-radius-x">
                Radius X
              </FieldLabel>
              <Input id="collapsible-radius-x" placeholder="0" value="0" />
            </Field>
            <Field>
              <FieldLabel class="sr-only" for="collapsible-radius-y">
                Radius Y
              </FieldLabel>
              <Input id="collapsible-radius-y" placeholder="0" value="0" />
            </Field>
            <CollapsibleContent class="col-span-full grid grid-cols-subgrid gap-2">
              <Field>
                <FieldLabel class="sr-only" for="collapsible-radius-z">
                  Radius Z
                </FieldLabel>
                <Input id="collapsible-radius-z" placeholder="0" value="0" />
              </Field>
              <Field>
                <FieldLabel class="sr-only" for="collapsible-radius-w">
                  Radius W
                </FieldLabel>
                <Input id="collapsible-radius-w" placeholder="0" value="0" />
              </Field>
            </CollapsibleContent>
          </FieldGroup>
          <CollapsibleTrigger
            aria-label="Toggle radius settings"
            as={Button}
            size="icon"
            variant="outline"
          >
            <Show fallback={<MaximizeIcon />} when={open()}>
              <MinimizeIcon />
            </Show>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
