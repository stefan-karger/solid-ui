import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import {
  Polymorphic,
  type PolymorphicProps,
} from "@kobalte/core/polymorphic"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Button, buttonVariants } from "~/registry/ui/button"

const attachmentVariants = cva(
  "cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default: "cn-attachment-size-default",
        sm: "cn-attachment-size-sm",
        xs: "cn-attachment-size-xs",
      },
      orientation: {
        horizontal: "cn-attachment-orientation-horizontal items-center",
        vertical: "cn-attachment-orientation-vertical flex-col",
      },
    },
  }
)

type AttachmentState =
  | "idle"
  | "uploading"
  | "processing"
  | "error"
  | "done"

export type AttachmentOptions<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof attachmentVariants> & {
    class?: string | undefined;
    state?: AttachmentState
    as?: T
  }

const Attachment = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AttachmentOptions<T>>
) => {
  const merged = mergeProps(
    {
      as: "div" as T,
      state: "done" as const,
      size: "default" as const,
      orientation: "horizontal" as const,
    },
    props
  )

  const [local, others] = splitProps(merged as AttachmentOptions, [
    "as",
    "class",
    "state",
    "size",
    "orientation",
  ])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment"
      data-state={local.state}
      data-size={local.size}
      data-orientation={local.orientation}
      class={cn(
        attachmentVariants({
          size: local.size,
          orientation: local.orientation,
        }),
        local.class
      )}
      {...others}
    />
  )
}

const attachmentMediaVariants = cva(
  "cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        icon: "cn-attachment-media-variant-icon",
        image:
          "cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)


export type AttachmentMediaProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof attachmentMediaVariants> & {
    class?: string | undefined;
    as?: T
  }

const AttachmentMedia = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AttachmentMediaProps<T>>
) => {
  const merged = mergeProps(
    {
      as: "div" as const,
      variant: "icon" as const,
    },
    props
  )
  const [local, others] = splitProps(merged as AttachmentMediaProps, ["as", "class", "variant"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-media"
      data-variant={local.variant}
      class={cn(
        attachmentMediaVariants({
          variant: local.variant,
        }),
        local.class
      )}
      {...others}
    />
  )
}

export type AttachmentContentProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
    class?: string | undefined;
    as?: T
  }

const AttachmentContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AttachmentContentProps<T>>
) => {
  const merged = mergeProps({ as: "div" as const }, props)
  const [local, others] = splitProps(merged as AttachmentContentProps, ["as", "class"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-content"
      class={cn(
        "cn-attachment-content max-w-full min-w-0 flex-1",
        local.class
      )}
      {...others}
    />
  )
}

export type AttachmentTitleProps<T extends ValidComponent = "span"> = ComponentProps<T> & {
    class?: string | undefined;
    as?: T
  }

const AttachmentTitle = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AttachmentTitleProps<T>>
) => {
  const merged = mergeProps({ as: "span" as const }, props)
  const [local, others] = splitProps(merged as AttachmentContentProps, ["as", "class"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-title"
      class={cn(
        "cn-attachment-title block max-w-full min-w-0 truncate group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        local.class
      )}
      {...others}
    />
  )
}

export type AttachmentDescriptionProps<T extends ValidComponent = "span"> = ComponentProps<T> & {
    class?: string | undefined;
    as?: T
  }

const AttachmentDescription = <T extends ValidComponent = "span">(
  props: AttachmentDescriptionProps<T>
) => {
  const merged = mergeProps({ as: "span" as const }, props)
  const [local, others] = splitProps(merged as AttachmentContentProps, ["as", "class"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-description"
      class={cn(
        "cn-attachment-description block min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80",
        "max-w-full",
        local.class
      )}
      {...others}
    />
  )
}

export type AttachmentActionsProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
    class?: string | undefined;
    as?: T
  }

const AttachmentActions = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AttachmentActionsProps<T>>
) => {
  const merged = mergeProps({ as: "div" as const }, props)
  const [local, others] = splitProps(merged as AttachmentContentProps, ["as", "class"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-actions"
      class={cn(
        "cn-attachment-actions flex shrink-0 items-center",
        local.class
      )}
      {...others}
    />
  )
}

export type AttachmentActionProps<T extends ValidComponent = "button"> = ComponentProps<T> &
  VariantProps<typeof buttonVariants> & {
    class?: string | undefined;
  }

const AttachmentAction = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AttachmentActionProps<T>>
) => {
  const [local, others] = splitProps(props, [
    "class",
    "variant",
    "size",
  ])

  return (
    <Button
      data-slot="attachment-action"
      variant={local.variant ?? "ghost"}
      size={local.size ?? "icon-xs"}
      class={cn("cn-attachment-action", local.class)}
      {...others}
    />
  )
}

export type AttachmentTriggerProps<T extends ValidComponent = "button"> = ComponentProps<T> & {
    class?: string | undefined;
    type?: string | undefined;
    as?: T
  }

const AttachmentTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AttachmentTriggerProps<T>>
) => {
  const merged = mergeProps({ as: "button" as const }, props)
  const [local, others] = splitProps(merged as AttachmentTriggerProps, ["as", "class", "type"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-trigger"
      class={cn(
        "cn-attachment-trigger absolute inset-0 z-10 outline-none",
        local.class
      )}
      {...others}
    />
  )
}

export type AttachmentGroupProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
    class?: string | undefined;
    as?: T
  }

const AttachmentGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AttachmentGroupProps<T>>
) => {
  const merged = mergeProps({ as: "div" as const }, props)
  const [local, others] = splitProps(merged as AttachmentGroupProps, ["as", "class"])

  return (
    <Polymorphic
      as={local.as}
      data-slot="attachment-group"
      class={cn(
        "cn-attachment-group flex min-w-0 scroll-fade-x snap-x snap-mandatory no-scrollbar overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        local.class
      )}
      {...others}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}