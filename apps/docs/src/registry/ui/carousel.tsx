// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
import {
  Carousel as SdkCarousel,
  CarouselViewport as SdkCarouselViewport,
  CarouselContent as SdkCarouselContent,
  CarouselItem as SdkCarouselItem,
  CarouselPrevious as SdkCarouselPrevious,
  CarouselNext as SdkCarouselNext
} from "@ui-sdk/solid/carousel"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"

export function Carousel(
  props: Omit<ComponentProps<typeof SdkCarousel>, "class"> & { class?: string }
) {
  return <SdkCarousel {...props} class={cn("relative w-full", props.class)} />
}

export function CarouselViewport(
  props: Omit<ComponentProps<typeof SdkCarouselViewport>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCarouselViewport
      {...props}
      class={cn("min-w-0 overflow-hidden", props.class)}
    />
  )
}

export function CarouselContent(
  props: Omit<ComponentProps<typeof SdkCarouselContent>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCarouselContent
      {...props}
      class={cn("flex data-[orientation=vertical]:flex-col", props.class)}
    />
  )
}

export function CarouselItem(
  props: Omit<ComponentProps<typeof SdkCarouselItem>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCarouselItem
      {...props}
      class={cn("min-w-0 shrink-0 grow-0 basis-full", props.class)}
    />
  )
}

export function CarouselPrevious(
  props: Omit<ComponentProps<typeof SdkCarouselPrevious>, "class"> & {
    class?: string
  }
) {
  const rest = omit(props, "class", "children")
  return (
    <SdkCarouselPrevious
      aria-label="Previous slide"
      render={(p) => <Button {...p} variant="outline" size="icon" />}
      {...rest}
      class={cn(
        "cn-carousel-previous absolute start-2 top-1/2 -translate-y-1/2",
        props.class
      )}
    >
      {props.children ?? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="size-4 rtl:rotate-180"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </SdkCarouselPrevious>
  )
}

export function CarouselNext(
  props: Omit<ComponentProps<typeof SdkCarouselNext>, "class"> & {
    class?: string
  }
) {
  const rest = omit(props, "class", "children")
  return (
    <SdkCarouselNext
      aria-label="Next slide"
      render={(p) => <Button {...p} variant="outline" size="icon" />}
      {...rest}
      class={cn(
        "cn-carousel-next absolute end-2 top-1/2 -translate-y-1/2",
        props.class
      )}
    >
      {props.children ?? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="size-4 rtl:rotate-180"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </SdkCarouselNext>
  )
}
