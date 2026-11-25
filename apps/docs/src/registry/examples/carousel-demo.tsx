import { For } from "solid-js"

import {
  Carousel,
  CarouselViewport,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "~/registry/ui/carousel"
export default function CarouselDemo() {
  return (
    <Carousel aria-label="Featured slides" class="max-w-xs">
      <CarouselViewport>
        <CarouselContent>
          <For each={[1, 2, 3, 4, 5]}>
            {(n) => (
              <CarouselItem>
                <div class="flex aspect-square items-center justify-center rounded-xl border text-4xl font-semibold">
                  {n}
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
