import { toast } from "solid-sonner"

import { useIsMobile } from "~/registry/hooks/use-mobile"
import { Badge } from "~/registry/ui/badge"
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"
import { createSignal, For, Show } from "solid-js"

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
]

export default function DrawerDemo() {
  const [open, setOpen] = createSignal(false)
  const [deliveryTime, setDeliveryTime] = createSignal("asap")
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime())

    if (!selected) {
      return
    }

    setOpen(false)
    toast("Delivery time confirmed", {
      description: selected.label,
    })
  }

  return (
    <Drawer
      open={open()}
      onOpenChange={setOpen}
      side={isMobile() ? "bottom" : "right"}
    >
      <DrawerTrigger as={Button<"button">} variant="secondary">Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={deliveryTime()}
            onChange={setDeliveryTime}
            class="gap-2"
          >
            <For each={deliveryTimes}>
              {(time) => (
                <FieldLabel id={time.value} for={time.id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle class="flex items-center gap-2">
                        {time.label}
                        <Show when={time.badge}>
                          <Badge variant="secondary">{time.badge}</Badge>
                        </Show>
                      </FieldTitle>
                      <FieldDescription>{time.description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={time.value} id={time.id} />
                  </Field>
                </FieldLabel>
              )}
            </For>
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm} class="h-[34px]">
            Confirm Delivery Time
          </Button>
          <DrawerClose as={Button<"button">} variant="outline">Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
