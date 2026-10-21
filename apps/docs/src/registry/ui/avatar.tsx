import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as ImagePrimitive from "@kobalte/core/image"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

type AvatarRootProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ImagePrimitive.ImageRootProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    size?: "sm" | "default" | "lg"
  }

const Avatar = <T extends ValidComponent = "span">(props: AvatarRootProps<T>) => {
  const mergedProps = mergeProps({ size: "default" }, props)
  const [local, others] = splitProps(mergedProps as AvatarRootProps, ["class", "size"])
  return (
    <ImagePrimitive.Root
      class={cn(
        "group/avatar cn-avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        local.class
      )}
      data-size={local.size}
      data-slot="avatar"
      {...others}
    />
  )
}

type AvatarImageProps<T extends ValidComponent = "img"> = PolymorphicProps<
  T,
  ImagePrimitive.ImageImgProps<T>
> &
  Pick<ComponentProps<T>, "class">

const AvatarImage = <T extends ValidComponent = "img">(props: AvatarImageProps<T>) => {
  const [local, others] = splitProps(props as AvatarImageProps, ["class"])
  return (
    <ImagePrimitive.Img
      class={cn("cn-avatar-image aspect-square size-full object-cover", local.class)}
      data-slot="avatar-image"
      {...others}
    />
  )
}

type AvatarFallbackProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ImagePrimitive.ImageFallbackProps<T>
> &
  Pick<ComponentProps<T>, "class">

const AvatarFallback = <T extends ValidComponent = "span">(props: AvatarFallbackProps<T>) => {
  const [local, others] = splitProps(props as AvatarFallbackProps, ["class"])
  return (
    <ImagePrimitive.Fallback
      class={cn(
        "cn-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs",
        local.class
      )}
      data-slot="avatar-fallback"
      {...others}
    />
  )
}

type AvatarBadgeProps = ComponentProps<"span">

function AvatarBadge(props: AvatarBadgeProps) {
  const [local, others] = splitProps(props as AvatarBadgeProps, ["class"])
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

type AvatarGroupProps = ComponentProps<"div">

function AvatarGroup(props: AvatarGroupProps) {
  const [local, others] = splitProps(props as AvatarGroupProps, ["class"])
  return (
    <div
      class={cn(
        "group/avatar-group cn-avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        local.class
      )}
      data-slot="avatar-group"
      {...others}
    />
  )
}

type AvatarGroupCountProps = ComponentProps<"div">

function AvatarGroupCount(props: AvatarGroupCountProps) {
  const [local, others] = splitProps(props as AvatarGroupCountProps, ["class"])
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

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
