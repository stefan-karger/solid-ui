import { createSignal } from "solid-js";

import { IconMinus, IconPlus } from "~/components/icons";
import { Button } from "~/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/registry/ui/drawer";

export default function DrawerDemo() {
  const [goal, setGoal] = createSignal(250);

  const onClick = (change: number) => {
    setGoal(goal() + change);
  };

  return (
    <Drawer>
      <DrawerTrigger as={Button<"button">} variant="outline">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div class="p-4 pb-0">
            <div class="flex items-center justify-center space-x-2">
              <Button
                class="size-8 shrink-0 rounded-full"
                disabled={goal() <= 200}
                onClick={() => onClick(-10)}
                size="icon"
                variant="outline"
              >
                <IconMinus class="size-4" />
                <span class="sr-only">Decrease</span>
              </Button>
              <div class="flex-1 text-center">
                <div class="font-bold text-7xl tracking-tighter">{goal()}</div>
                <div class="text-[0.70rem] text-muted-foreground uppercase">
                  Calories/day
                </div>
              </div>
              <Button
                class="size-8 shrink-0 rounded-full"
                disabled={goal() >= 400}
                onClick={() => onClick(10)}
                size="icon"
                variant="outline"
              >
                <IconPlus class="size-4" />
                <span class="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose as={Button<"button">} variant="outline">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
