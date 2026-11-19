import { dynamic, type ComponentProps, type JSX } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { isStatic, omit } from "solid-js"

import { cn } from "~/lib/utils"

const markerVariants = cva("cn-marker group/marker relative flex w-full items-center", {
  variants: {
    variant: {
      default: "cn-marker-variant-default",
      separator: "cn-marker-variant-separator",
      border: "cn-marker-variant-border"
    }
  }
})

export function Marker(
  props: Omit<ComponentProps<"div">, "class"> & {
    class?: string
    variant?: VariantProps<typeof markerVariants>["variant"]
    render?: (
      props: Record<string, unknown> & { class: string; children?: JSX.Element }
    ) => JSX.Element
  }
) {
  const Comp = dynamic(() => props.render ?? "div", { static: isStatic(props, "render") })
  const rest = omit(props, "class", "variant", "render")
  return (
    <Comp
      data-slot="marker"
      data-variant={props.variant ?? "default"}
      class={cn(markerVariants({ variant: props.variant ?? "default" }), props.class)}
      {...rest}
    />
  )
}

export function MarkerIcon(props: Omit<ComponentProps<"span">, "class"> & { class?: string }) {
  return (
    <span
      {...props}
      data-slot="marker-icon"
      aria-hidden="true"
      class={cn("cn-marker-icon shrink-0", props.class)}
    />
  )
}

export function MarkerContent(props: Omit<ComponentProps<"span">, "class"> & { class?: string }) {
  return (
    <span
      {...props}
      data-slot="marker-content"
      class={cn("cn-marker-content min-w-0 wrap-break-word", props.class)}
    />
  )
}

export { markerVariants }
