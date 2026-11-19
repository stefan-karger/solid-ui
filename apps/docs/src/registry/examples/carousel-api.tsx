import { createSignal, For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport
} from "~/registry/ui/carousel"

export default function CarouselDApiDemo() {
  const [current, setCurrent] = createSignal(1)
  const slides = [1, 2, 3, 4, 5]

  return (
    <div class="mx-auto max-w-[10rem] sm:max-w-xs">
      <Carousel page={current()} onPageChange={setCurrent} class="w-full max-w-xs">
        <CarouselViewport>
          <CarouselContent>
            <For each={slides}>
              {(number) => (
                <CarouselItem>
                  <Card class="m-px">
                    <CardContent class="flex aspect-square items-center justify-center p-6">
                      <span class="text-4xl font-semibold">{number}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
            </For>
          </CarouselContent>
        </CarouselViewport>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="py-2 text-center text-sm text-muted-foreground">
        Slide {current()} of {slides.length}
      </div>
    </div>
  )
}
