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

export default function CarouselOrientation() {
  return (
    <Carousel orientation="vertical" class="w-full max-w-xs">
      <CarouselViewport>
        <CarouselContent class="-mt-1 h-[270px]">
          <For each={Array.from({ length: 5 }, (_, index) => index + 1)}>
            {(number) => (
              <CarouselItem class="basis-1/2 pt-1">
                <div class="p-1">
                  <Card>
                    <CardContent class="flex items-center justify-center p-6">
                      <span class="text-3xl font-semibold">{number}</span>
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
