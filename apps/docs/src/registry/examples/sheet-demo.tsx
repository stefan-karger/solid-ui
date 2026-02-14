import { Button } from "~/registry/ui/button"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/registry/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger as={Button} variant="outline">
        Open
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div class="grid flex-1 auto-rows-min gap-6 px-4">
          <div class="grid gap-3">
            <Label for="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" value="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose as={Button} variant="outline">
            Close
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
