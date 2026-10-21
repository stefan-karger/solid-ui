import type { JSX } from "solid-js"

import { cn } from "~/lib/utils"
import { useIsMobile } from "~/registry/hooks/use-mobile"
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

function DrawerPanel(props: { children?: JSX.Element }) {
  return (
    <div class="flex-1 p-4">
      <div
        class={cn(
          "bg-muted",
          "group-data-[side=bottom]/drawer-content:aspect-video",
          "group-data-[side=bottom]/drawer-content:w-full",
          "group-data-[side=right]/drawer-content:size-full"
        )}
      >
        {props.children}
      </div>
    </div>
  )
}

export default function DrawerNested() {
  const isMobile = useIsMobile()
  const side = () => (isMobile() ? "bottom" : "right")

  return (
    <Drawer side={side()}>
      <DrawerTrigger as={Button} variant="secondary">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Open another drawer from the same direction.</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel />
        <DrawerFooter>
          <Drawer side={side()}>
            <DrawerTrigger as={Button} variant="outline">
              Open Nested Drawer
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
                <DrawerDescription>
                  The parent drawer stays mounted behind this one.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerPanel />
              <DrawerFooter>
                <Drawer side={side()}>
                  <DrawerTrigger as={Button} variant="outline">
                    Open Third Drawer
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Third Drawer</DrawerTitle>
                      <DrawerDescription>
                        Two drawers are stacked behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerPanel />
                    <DrawerFooter>
                      <Drawer side={side()}>
                        <DrawerTrigger as={Button} variant="outline">
                          Open Fourth Drawer
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Fourth Drawer</DrawerTitle>
                            <DrawerDescription>
                              This is the frontmost drawer in the stack.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerPanel />
                          <DrawerFooter>
                            <DrawerClose as={Button} variant="outline">
                              Close
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose as={Button} variant="outline">
                        Close
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose as={Button} variant="outline">
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DrawerClose as={Button} variant="outline">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
