import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"

export default function DialogDemo() {
  return (
    <Dialog>
      <form
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <DialogTrigger as={Button} variant="outline">
          Open Dialog
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4">
            <div class="grid gap-3">
              <Label for="dialog-demo-name">Name</Label>
              <Input id="dialog-demo-name" name="name" value="Pedro Duarte" />
            </div>
            <div class="grid gap-3">
              <Label for="dialog-demo-username">Username</Label>
              <Input id="dialog-demo-username" name="username" value="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose as={Button} variant="outline">
              Cancel
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
