import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem
} from "~/registry/ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import { Field, FieldLabel } from "~/registry/ui/field"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxInDialog() {
  const [open, setOpen] = createSignal(false)

  return (
    <Dialog onOpenChange={setOpen} open={open()}>
      <DialogTrigger as={Button} variant="outline">
        Open Dialog
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Framework</DialogTitle>
          <DialogDescription>
            Choose your preferred framework from the list below.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel class="sr-only" for="framework-dialog">
            Framework
          </FieldLabel>
          <Combobox
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
            )}
            options={frameworks}
            placeholder="Select a framework..."
          >
            <ComboboxInput id="framework-dialog" placeholder="Select a framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        </Field>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              alert("Framework selected.")
              setOpen(false)
            }}
            type="button"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
