import { createSignal } from "solid-js"

import { Button } from "~/registry/v1/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "~/registry/v1/ui/drawer"

export function MobileNavigation() {
  const [open, setOpen] = createSignal(false)

  return (
    <Drawer onOpenChange={setOpen} open={open()}>
      <DrawerTrigger
        as={Button<"button">}
        class="inline-flex lg:hidden"
        size="icon"
        variant="ghost"
      >
        <svg
          class="size-4"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Toggle Menu</title>
          <line
            style={{
              "transform-origin": "center",
              transition: "transform 0.3s ease-in-out",
              transform: open() ? "rotate(45deg) translateY(4px)" : ""
            }}
            x1="1"
            x2="23"
            y1="8"
            y2="8"
          />
          <line
            style={{
              "transform-origin": "center",
              transition: "transform 0.3s ease-in-out",
              transform: open() ? "rotate(-45deg) translateY(-4px)" : ""
            }}
            x1="1"
            x2="23"
            y1="16"
            y2="16"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent class="min-h-[80svh]">LOOK AT ME I'M THE CONTENT!</DrawerContent>
    </Drawer>
  )
}
