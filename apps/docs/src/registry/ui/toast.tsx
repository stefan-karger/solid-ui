import type { Component, ComponentProps, JSX } from "solid-js"

import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from "lucide-solid"
import { Toaster as Sonner } from "solid-sonner"

import { useColorMode } from "~/hooks/use-color-mode"
import { cn } from "~/lib/utils"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster: Component<ToasterProps> = (props) => {
  const { colorMode } = useColorMode()
  return (
    <Sonner
      class={cn("cn-toast toaster group")}
      icons={{
        success: <CircleCheck class="size-4" />,
        info: <Info class="size-4" />,
        warning: <TriangleAlert class="size-4" />,
        error: <OctagonX class="size-4" />,
        loading: <LoaderCircle class="size-4 animate-spin" />
      }}
      position="top-center"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        } as JSX.CSSProperties
      }
      theme={colorMode()}
      {...props}
    />
  )
}

export { Toaster }
