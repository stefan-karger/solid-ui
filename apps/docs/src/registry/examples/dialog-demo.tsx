import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup class="py-4">
          <Field orientation="horizontal">
            <FieldLabel class="text-right" for="name">
              Name
            </FieldLabel>
            <Input class="col-span-3" id="name" value="Pedro Duarte" />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel class="text-right" for="username">
              Username
            </FieldLabel>
            <Input class="col-span-3" id="username" value="@peduarte" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
