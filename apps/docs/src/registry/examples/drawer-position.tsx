import { Button } from "~/registry/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/registry/ui/drawer"

export default function DrawerWithSides() {
  return (
    <Drawer side="left">
      <DrawerTrigger as={Button<"button">} variant="secondary">Open Left Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="size-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose as={Button<"button">}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
