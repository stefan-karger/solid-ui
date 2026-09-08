import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"

export default function DialogScrollableContent() {
  return (
    <Dialog>
      <DialogTrigger as={Button} variant="outline">
        Scrollable Content
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>This is a dialog with scrollable content.</DialogDescription>
        </DialogHeader>
        <div class="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <For each={Array.from({ length: 10 })}>
            {() => (
              <p class="mb-4 leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            )}
          </For>
        </div>
      </DialogContent>
    </Dialog>
  )
}
