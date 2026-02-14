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

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <div class="flex items-center space-x-2">
          <div class="grid flex-1 gap-2">
            <label class="sr-only" for="link">
              Link
            </label>
            <input
              class="cn-input h-8 w-full"
              data-slot="input"
              id="link"
              readonly
              value="https://ui.shadcn.com/docs/installation"
            />
          </div>
          <Button class="px-3" size="sm" type="submit">
            <span class="sr-only">Copy</span>
            <svg
              class="size-4"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </Button>
        </div>
        <DialogFooter class="sm:justify-start">
          <DialogClose as={Button<"button">} variant="secondary">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
