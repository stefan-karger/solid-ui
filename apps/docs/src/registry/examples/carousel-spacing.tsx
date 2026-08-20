import { For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "~/registry/ui/carousel"

export default function CarouselSpacing() {
  return (
    <Carousel class="w-full max-w-sm">
      <CarouselContent class="-ml-1">
        <For each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem class="pl-1 md:basis-1/2 lg:basis-1/3">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="font-semibold text-2xl">{index() + 1}</span>
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
