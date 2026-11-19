import { dynamic, type ComponentProps, type JSX, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { isStatic, omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

const attachmentVariants = cva(
  "cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default: "cn-attachment-size-default",
        sm: "cn-attachment-size-sm",
        xs: "cn-attachment-size-xs"
      },
      orientation: {
        horizontal: "cn-attachment-orientation-horizontal items-center",
        vertical: "cn-attachment-orientation-vertical flex-col"
      }
    }
  }
)

const attachmentMediaVariants = cva(
  "cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        icon: "cn-attachment-media-variant-icon",
        image:
          "cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "icon"
    }
  }
)

export function Attachment(
  props: Omit<ComponentProps<"div">, "class"> & {
    class?: string
    state?: "idle" | "uploading" | "processing" | "error" | "done"
    size?: "default" | "sm" | "xs"
    orientation?: "horizontal" | "vertical"
  }
) {
  const rest = omit(props, "class", "state", "size", "orientation")
  return (
    <div
      {...rest}
      data-slot="attachment"
      data-state={props.state ?? "done"}
      data-size={props.size ?? "default"}
      data-orientation={props.orientation ?? "horizontal"}
      class={cn(
        attachmentVariants({
          size: props.size ?? "default",
          orientation: props.orientation ?? "horizontal"
        }),
        props.class
      )}
    />
  )
}

export function AttachmentMedia(
  props: Omit<ComponentProps<"div">, "class"> & {
    class?: string
    variant?: VariantProps<typeof attachmentMediaVariants>["variant"]
  }
) {
  const rest = omit(props, "class", "variant")
  return (
    <div
      {...rest}
      data-slot="attachment-media"
      data-variant={props.variant ?? "icon"}
      class={cn(attachmentMediaVariants({ variant: props.variant ?? "icon" }), props.class)}
    />
  )
}

export function AttachmentContent(
  props: Omit<ComponentProps<"div">, "class"> & { class?: string }
) {
  return (
    <div
      {...props}
      data-slot="attachment-content"
      class={cn("cn-attachment-content max-w-full min-w-0 flex-1", props.class)}
    />
  )
}

export function AttachmentTitle(props: Omit<ComponentProps<"span">, "class"> & { class?: string }) {
  return (
    <span
      {...props}
      data-slot="attachment-title"
      class={cn(
        "cn-attachment-title block max-w-full min-w-0 truncate group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        props.class
      )}
    />
  )
}

export function AttachmentDescription(
  props: Omit<ComponentProps<"span">, "class"> & { class?: string }
) {
  return (
    <span
      {...props}
      data-slot="attachment-description"
      class={cn(
        "cn-attachment-description block max-w-full min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80",
        props.class
      )}
    />
  )
}

export function AttachmentActions(
  props: Omit<ComponentProps<"div">, "class"> & { class?: string }
) {
  return (
    <div
      {...props}
      data-slot="attachment-actions"
      class={cn("cn-attachment-actions flex shrink-0 items-center", props.class)}
    />
  )
}

export function AttachmentAction<T extends ValidComponent = "button">(props: ButtonProps<T>) {
  return (
    <Button<T>
      variant="ghost"
      size="icon-xs"
      {...props}
      data-slot="attachment-action"
      class={cn("cn-attachment-action", props.class)}
    />
  )
}

export function AttachmentTrigger(
  props: Omit<ComponentProps<"button">, "class"> & {
    class?: string
    render?: (
      props: Record<string, unknown> & { class: string; children?: JSX.Element }
    ) => JSX.Element
  }
) {
  const Comp = dynamic(() => props.render ?? "button", { static: isStatic(props, "render") })
  const rest = omit(props, "class", "render", "type")
  return (
    <Comp
      data-slot="attachment-trigger"
      type={props.render ? undefined : (props.type ?? "button")}
      class={cn("cn-attachment-trigger", props.class)}
      {...rest}
    />
  )
}

export function AttachmentGroup(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="attachment-group"
      class={cn(
        "cn-attachment-group flex min-w-0 scroll-fade-x snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        props.class
      )}
    />
  )
}
