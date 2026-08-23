import { For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "~/registry/ui/carousel"

export default function CarouselOrientation() {
  return (
    <Carousel
      class="w-full max-w-xs"
      opts={{
        align: "start"
      }}
      orientation="vertical"
    >
      <CarouselContent class="-mt-1 h-[200px]">
        <For each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem class="pt-1 md:basis-1/2">
              <div class="p-1">
                <Card>
                  <CardContent class="flex items-center justify-center p-6">
                    <span class="font-semibold text-3xl">{index() + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </For>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
