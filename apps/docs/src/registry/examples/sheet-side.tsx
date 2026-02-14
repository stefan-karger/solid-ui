import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
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

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export default function SheetSide() {
  return (
    <div class="flex flex-wrap gap-2">
      <For each={SHEET_SIDES}>
        {(side) => (
          <Sheet>
            <SheetTrigger as={Button} class="capitalize" variant="outline">
              {side}
            </SheetTrigger>
            <SheetContent
              class="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
              side={side}
            >
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div class="no-scrollbar overflow-y-auto px-4">
                <For each={Array.from({ length: 10 })}>
                  {() => (
                    <p class="mb-2 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  )}
                </For>
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose as={Button} variant="outline">
                  Cancel
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </For>
    </div>
  )
}
