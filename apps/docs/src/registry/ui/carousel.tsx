import type { Accessor, ComponentProps, JSX, ValidComponent } from "solid-js"
import {
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  splitProps,
  useContext
} from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import createEmblaCarousel from "embla-carousel-solid"
import { ChevronLeft, ChevronRight } from "lucide-solid"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

type CarouselApi = EmblaCarouselType | undefined
type CarouselOptions = EmblaOptionsType
type CarouselPlugin = EmblaPluginType

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof createEmblaCarousel>[0]
  api: ReturnType<typeof createEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: Accessor<boolean>
  canScrollNext: Accessor<boolean>
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

type CarouselRootProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  CarouselProps & {
    class?: string | undefined
    children?: JSX.Element
  }

const Carousel = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, CarouselRootProps<T>>
) => {
  const props = mergeProps({ orientation: "horizontal" as const }, rawProps)
  const [local, others] = splitProps(props as CarouselRootProps, [
    "class",
    "children",
    "opts",
    "plugins",
    "orientation",
    "setApi"
  ])

  const [carouselRef, api] = createEmblaCarousel(
    () => ({
      ...local.opts,
      axis: local.orientation === "horizontal" ? "x" : "y"
    }),
    () => local.plugins ?? []
  )

  const [canScrollPrev, setCanScrollPrev] = createSignal(false)
  const [canScrollNext, setCanScrollNext] = createSignal(false)

  const onSelect = (emblaApi: EmblaCarouselType) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }

  const scrollPrev = () => {
    api()?.scrollPrev()
  }

  const scrollNext = () => {
    api()?.scrollNext()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }

  createEffect(() => {
    const emblaApi = api()
    if (!emblaApi || !local.setApi) return
    local.setApi(emblaApi)
  })

  createEffect(() => {
    const emblaApi = api()
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)

    onCleanup(() => {
      emblaApi.off("select", onSelect)
    })
  })

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts: local.opts,
        orientation: local.orientation || (local.opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      }}
    >
      <div
        aria-roledescription="carousel"
        class={cn("relative", local.class)}
        data-slot="carousel"
        onKeyDown={handleKeyDown}
        role="region"
        {...others}
      >
        {local.children}
      </div>
    </CarouselContext.Provider>
  )
}

type CarouselContentProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
  class?: string | undefined
}

const CarouselContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CarouselContentProps<T>>
) => {
  const [local, others] = splitProps(props as CarouselContentProps, ["class"])
  const { carouselRef, orientation } = useCarousel()

  return (
    <div class="overflow-hidden" data-slot="carousel-content" ref={carouselRef}>
      <div
        class={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", local.class)}
        {...others}
      />
    </div>
  )
}

type CarouselItemProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
  class?: string | undefined
}

const CarouselItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CarouselItemProps<T>>
) => {
  const [local, others] = splitProps(props as CarouselItemProps, ["class"])
  const { orientation } = useCarousel()

  return (
    <div
      aria-roledescription="slide"
      class={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        local.class
      )}
      data-slot="carousel-item"
      role="group"
      {...others}
    />
  )
}

type CarouselPreviousProps<T extends ValidComponent = "button"> = ButtonProps<T> & {
  class?: string | undefined
}

const CarouselPrevious = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, CarouselPreviousProps<T>>
) => {
  const props = mergeProps({ variant: "outline" as const, size: "icon-sm" as const }, rawProps)
  const [local, others] = splitProps(props as CarouselPreviousProps, ["class", "variant", "size"])
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      class={cn(
        "cn-carousel-previous absolute touch-manipulation",
        orientation === "horizontal"
          ? "-left-12 -translate-y-1/2 top-1/2"
          : "-top-12 -translate-x-1/2 left-1/2 rotate-90",
        local.class
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev()}
      onClick={scrollPrev}
      size={local.size}
      variant={local.variant}
      {...others}
    >
      <ChevronLeft />
      <span class="sr-only">Previous slide</span>
    </Button>
  )
}

type CarouselNextProps<T extends ValidComponent = "button"> = ButtonProps<T> & {
  class?: string | undefined
}

const CarouselNext = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, CarouselNextProps<T>>
) => {
  const props = mergeProps({ variant: "outline" as const, size: "icon-sm" as const }, rawProps)
  const [local, others] = splitProps(props as CarouselNextProps, ["class", "variant", "size"])
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      class={cn(
        "cn-carousel-next absolute touch-manipulation",
        orientation === "horizontal"
          ? "-right-12 -translate-y-1/2 top-1/2"
          : "-bottom-12 -translate-x-1/2 left-1/2 rotate-90",
        local.class
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext()}
      onClick={scrollNext}
      size={local.size}
      variant={local.variant}
      {...others}
    >
      <ChevronRight />
      <span class="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel
}
