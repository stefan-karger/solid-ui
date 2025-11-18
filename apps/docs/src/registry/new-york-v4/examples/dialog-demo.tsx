import { Button } from "~/registry/new-york-v4/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/new-york-v4/ui/dialog"
import { Input } from "~/registry/new-york-v4/ui/input"
import { Label } from "~/registry/new-york-v4/ui/label"

export default function DialogDemo() {
  return (
    <Dialog>
      <form>
        <Button as={DialogTrigger} variant="outline">
          Open Dialog
        </Button>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4">
            <div class="grid gap-3">
              <Label for="name-1">Name</Label>
              <Input id="name-1" name="name" value="Pedro Duarte" />
            </div>
            <div class="grid gap-3">
              <Label for="username-1">Username</Label>
              <Input id="username-1" name="username" value="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <Button as={DialogClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
