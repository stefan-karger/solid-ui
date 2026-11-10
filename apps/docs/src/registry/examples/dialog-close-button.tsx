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

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger as={Button} variant="outline">
        Share
      </DialogTrigger>
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <div class="flex items-center gap-2">
          <div class="grid flex-1 gap-2">
            <Label class="sr-only" for="link">
              Link
            </Label>
            <Input id="link" readOnly value="https://ui.shadcn.com/docs/installation" />
          </div>
        </div>
        <DialogFooter class="sm:justify-start">
          <DialogClose as={Button} type="button">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
