import { createSignal } from "solid-js"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/registry/ui/dialog"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from "~/registry/ui/combobox"
import { Button } from "~/registry/ui/button"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxInDialog() {
  const [open, setOpen] = createSignal(false)

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
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
          <FieldLabel for="framework-dialog" class="sr-only">
            Framework
          </FieldLabel>
          <Combobox
            options={frameworks}
            placeholder="Select a framework..."
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
            )}
          >
            <ComboboxInput id="framework-dialog" placeholder="Select a framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        </Field>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              alert("Framework selected.")
              setOpen(false)
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}