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

const SNAP_POINTS: (number | `${number}px`)[] = ["480px", 1]

export default function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={SNAP_POINTS}>
      <DrawerTrigger as={Button} variant="outline">
        Open Snap Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>
            Drag the drawer to snap between a compact peek and a near full-height view.
          </DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="h-80 w-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose as={Button}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
