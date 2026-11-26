import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "~/registry/ui/drawer"

const paragraphs = Array.from({ length: 10 }, (_, index) => index)

export default function DrawerSides() {
  return (
    <div class="flex flex-wrap gap-2">
      <For each={["top", "right", "bottom", "left"] as const}>
        {(side) => (
          <Drawer side={side}>
            <DrawerTrigger
              render={(p) => (
                <Button {...p} variant="outline" class="capitalize" />
              )}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent class="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div class="no-scrollbar overflow-y-auto px-4">
                <For each={paragraphs}>
                  {() => (
                    <p class="mb-4 leading-normal style-lyra:mb-2 style-lyra:leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  )}
                </For>
              </div>
              <DrawerFooter>
                <DrawerClose render={(p) => <Button {...p} />}>
                  Submit
                </DrawerClose>
                <DrawerClose
                  render={(p) => <Button {...p} variant="outline" />}
                >
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </For>
    </div>
  )
}
