import { Index } from "solid-js"

import { Card, CardContent } from "@/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/registry/ui/carousel"

export default function CarouselSizeDemo() {
  return (
    <Carousel
      opts={{
        align: "start"
      }}
      class="w-full max-w-sm"
    >
      <CarouselContent>
        <Index each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem class="md:basis-1/2 lg:basis-1/3">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-3xl font-semibold">{index + 1}</span>
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
