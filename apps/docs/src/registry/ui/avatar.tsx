import type { Component, ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as AvatarPrimitive from "@kobalte/core/image"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

type AvatarRootProps<T extends ValidComponent = "span"> = AvatarPrimitive.ImageRootProps<T> & {
  class?: string | undefined
  size?: "default" | "sm" | "lg"
}

const Avatar = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AvatarRootProps<T>>
) => {
  const [local, others] = splitProps(props as AvatarRootProps, ["class", "size"])
  return (
    <AvatarPrimitive.Root
      class={cn(
        "cn-avatar group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        local.class
      )}
      data-size={local.size}
      data-slot="avatar"
      {...others}
    />
  )
}

type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Img>

const AvatarImage: Component<AvatarImageProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <AvatarPrimitive.Img
      class={cn("cn-avatar-image aspect-square size-full object-cover", local.class)}
      data-slot="avatar-image"
      {...others}
    />
  )
}

type AvatarFallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback> & {
  class?: string | undefined
}

const AvatarFallback: Component<AvatarFallbackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <AvatarPrimitive.Fallback
      class={cn(
        "cn-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs",
        local.class
      )}
      data-slot="avatar-fallback"
      {...others}
    />
  )
}

type AvatarBadgeProps = ComponentProps<"span"> & {
  class?: string | undefined
}

const AvatarBadge: Component<AvatarBadgeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn(
        "cn-avatar-badge absolute right-0 bottom-0 z-10 inline-flex select-none items-center justify-center rounded-full bg-blend-color ring-2",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        local.class
      )}
      data-slot="avatar-badge"
      {...others}
    />
  )
}

type AvatarGroupProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const AvatarGroup: Component<AvatarGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-avatar-group group/avatar-group -space-x-2 flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        local.class
      )}
      data-slot="avatar-group"
      {...others}
    />
  )
}

type AvatarGroupCountProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const AvatarGroupCount: Component<AvatarGroupCountProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-avatar-group-count relative flex shrink-0 items-center justify-center ring-2 ring-background",
        "",
        local.class
      )}
      data-slot="avatar-group-count"
      {...others}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge }
