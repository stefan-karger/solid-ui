import { For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselViewport,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "~/registry/ui/carousel"

export default function CarouselSpacing() {
  return (
    <Carousel class="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm">
      <CarouselViewport>
        <CarouselContent class="-ml-1">
          <For each={Array.from({ length: 5 }, (_, index) => index + 1)}>
            {(number) => (
              <CarouselItem class="basis-1/2 pl-1 lg:basis-1/3">
                <div class="p-1">
                  <Card>
                    <CardContent class="flex aspect-square items-center justify-center p-6">
                      <span class="text-2xl font-semibold">{number}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
      </CarouselViewport>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
