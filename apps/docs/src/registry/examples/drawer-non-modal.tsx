import { Button } from "~/registry/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "~/registry/ui/drawer"

export default function DrawerNonModal() {
  return (
    <Drawer closeOnOutsidePointer={false} modal={false} side="right">
      <DrawerTrigger as={Button} variant="outline">
        Non Modal
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non Modal Drawer</DrawerTitle>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="size-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose as={Button}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
