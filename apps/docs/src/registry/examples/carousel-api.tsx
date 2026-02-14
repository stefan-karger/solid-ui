import { createEffect, createSignal, For, on } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
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
      <Carousel class="w-full max-w-xs" setApi={setApi}>
        <CarouselContent>
          <For each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem>
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="font-semibold text-4xl">{index() + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="py-2 text-center text-muted-foreground text-sm">
        Slide {current()} of {count()}
      </div>
    </div>
  )
}
