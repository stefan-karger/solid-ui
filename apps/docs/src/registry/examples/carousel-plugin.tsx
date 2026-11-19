import { For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport
} from "~/registry/ui/carousel"

export default function CarouselPlugin() {
  return (
    <Carousel defaultPlaying interval={2000} loop class="w-full max-w-[10rem] sm:max-w-xs">
      <CarouselViewport>
        <CarouselContent>
          <For each={[1, 2, 3, 4, 5]}>
            {(number) => (
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex aspect-square items-center justify-center p-6">
                      <span class="text-4xl font-semibold">{number}</span>
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
