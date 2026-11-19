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
      <DialogTrigger render={(partProps) => <Button {...partProps} variant="outline" />}>
        Share
      </DialogTrigger>
      <DialogContent class="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <div class="flex items-center gap-2">
          <div class="grid flex-1 gap-2">
            <Label class="sr-only" for="dialog-close-button-link">
              Link
            </Label>
            <Input
              id="dialog-close-button-link"
              readonly
              value="https://ui.shadcn.com/docs/installation"
            />
          </div>
        </div>
        <DialogFooter class="sm:justify-start">
          <DialogClose render={(partProps) => <Button {...partProps} />} type="button">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
