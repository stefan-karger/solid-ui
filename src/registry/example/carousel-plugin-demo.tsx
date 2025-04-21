import Autoplay from "embla-carousel-autoplay";
import { Index } from "solid-js";

import { Card, CardContent } from "~/registry/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/registry/ui/carousel";

export default function CarouselPluginDemo() {
  const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

  return (
    <Carousel
      class="w-full max-w-xs"
      onMouseEnter={plugin.stop}
      onMouseLeave={() => plugin.play(false)}
      plugins={[plugin]}
    >
      <CarouselContent>
        <Index each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem>
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="font-semibold text-4xl">{index + 1}</span>
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
  );
}
