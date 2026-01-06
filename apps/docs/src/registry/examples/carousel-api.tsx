import { createEffect, createSignal, For, on } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "~/registry/ui/carousel"

export default function CarouselApiDemo() {
  const [api, setApi] = createSignal<CarouselApi>()
  const [current, setCurrent] = createSignal(0)
  const [count, setCount] = createSignal(0)

  createEffect(
    on(api, (emblaApi) => {
      if (!emblaApi) return

      setCount(emblaApi.scrollSnapList().length)
      setCurrent(emblaApi.selectedScrollSnap() + 1)

      emblaApi.on("select", () => {
        setCurrent(emblaApi.selectedScrollSnap() + 1)
      })
    })
  )

  return (
    <div class="mx-auto max-w-xs">
      <Carousel setApi={setApi} class="w-full max-w-xs">
        <CarouselContent>
          <For each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem>
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{index() + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="text-muted-foreground py-2 text-center text-sm">
        Slide {current()} of {count()}
      </div>
    </div>
  )
}
