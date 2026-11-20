import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "~/registry/ui/drawer"

export default function DrawerScrollableContent() {
  return (
    <Drawer side="right">
      <DrawerTrigger
        render={(partProps) => (
          <Button {...partProps} variant="outline">
            Scrollable Content
          </Button>
        )}
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="no-scrollbar overflow-y-auto px-4">
          <For each={Array.from({ length: 10 }, (_, index) => index + 1)}>
            {() => (
              <p class="mb-4 leading-normal style-lyra:mb-2 style-lyra:leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            )}
          </For>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose
            render={(partProps) => (
              <Button {...partProps} variant="outline">
                Cancel
              </Button>
            )}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
