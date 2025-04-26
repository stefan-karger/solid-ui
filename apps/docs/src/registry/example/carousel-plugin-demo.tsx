import { Index } from "solid-js"

import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/registry/ui/carousel"

export default function CarouselPluginDemo() {
  const plugin = Autoplay({ delay: 2000, stopOnInteraction: true })

  return (
    <Carousel
      plugins={[plugin]}
      class="w-full max-w-xs"
      onMouseEnter={plugin.stop}
      onMouseLeave={() => plugin.play(false)}
    >
      <CarouselContent>
        <Index each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem>
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </Index>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
