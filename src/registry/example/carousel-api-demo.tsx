import { createEffect, createSignal, Index } from "solid-js";

import { Card, CardContent } from "~/registry/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/registry/ui/carousel";

export default function CarouselApiDemo() {
  const [api, setApi] = createSignal<ReturnType<CarouselApi>>();
  const [current, setCurrent] = createSignal(0);
  const [count, setCount] = createSignal(0);

  const onSelect = () => {
    setCurrent(api()!.selectedScrollSnap() + 1);
  };

  createEffect(() => {
    if (!api()) {
      return;
    }

    setCount(api()!.scrollSnapList().length);
    setCurrent(api()!.selectedScrollSnap() + 1);

    api()!.on("select", onSelect);
  });

  return (
    <div>
      <Carousel class="w-full max-w-xs" setApi={setApi}>
        <CarouselContent>
          <Index each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem>
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="font-semibold text-4xl">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </Index>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="py-2 text-center text-muted-foreground text-sm">
        Slide {current()} of {count()}
      </div>
    </div>
  );
}
