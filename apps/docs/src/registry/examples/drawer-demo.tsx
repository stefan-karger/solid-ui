import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "~/registry/ui/drawer"
export default function DrawerDemo() {
  const [goal, setGoal] = createSignal(350)
  return (
    <Drawer>
      <DrawerTrigger render={(p) => <Button {...p} variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto w-full max-w-sm">
          <DrawerHandle />
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div class="flex items-center justify-center gap-6 p-4">
            <Button
              aria-label="Decrease goal"
              variant="outline"
              disabled={goal() <= 200}
              onClick={() => setGoal(goal() - 10)}
            >
              −
            </Button>
            <output class="text-4xl font-semibold">{goal()}</output>
            <Button
              aria-label="Increase goal"
              variant="outline"
              disabled={goal() >= 400}
              onClick={() => setGoal(goal() + 10)}
            >
              +
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose render={(p) => <Button {...p} />}>Save goal</DrawerClose>
            <DrawerClose render={(p) => <Button {...p} variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
