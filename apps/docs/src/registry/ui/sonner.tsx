import type { Component } from "solid-js"
import { splitProps } from "solid-js"

import { Toaster as SolidSonner, type ToasterProps } from "solid-sonner"

import { cn } from "~/lib/utils"

type SonnerProps = ToasterProps & {
  class?: string
}

const Toaster: Component<SonnerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "theme", "richColors", "position"])
  return (
    <SolidSonner
      class={cn("toaster group", local.class)}
      data-slot="sonner-toaster"
      position={local.position ?? "bottom-right"}
      richColors={local.richColors ?? true}
      theme={local.theme ?? "system"}
      toastOptions={{
        classes: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }}
      {...others}
    />
  )
}

export { Toaster }

export { toast } from "solid-sonner"
