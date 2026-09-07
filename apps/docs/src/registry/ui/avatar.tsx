import * as ImagePrimitive from "@kobalte/core/image"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type AvatarProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ImagePrimitive.ImageRootProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    size?: "sm" | "default" | "lg"
  }

const Avatar = <T extends ValidComponent = "span">(props: AvatarProps<T>) => {
  const local = merge({ size: "default" } as const, props) as AvatarProps
  const others = omit(props as AvatarProps, "class", "size")
  return (
    <ImagePrimitive.Root
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

type AvatarImageProps<T extends ValidComponent = "img"> = PolymorphicProps<
  T,
  ImagePrimitive.ImageImgProps<T>
> &
  Pick<ComponentProps<T>, "class">

const AvatarImage = <T extends ValidComponent = "img">(props: AvatarImageProps<T>) => {
  const others = omit(props as AvatarImageProps, "class")
  return (
    <ImagePrimitive.Img
      class={cn("cn-avatar-image aspect-square size-full object-cover", props.class)}
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
  const others = omit(props as AvatarFallbackProps, "class")
  return (
    <ImagePrimitive.Fallback
      class={cn(
        "cn-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs",
        props.class
      )}
      data-slot="avatar-fallback"
      {...others}
    />
  )
}

type AvatarBadgeProps = ComponentProps<"span">

const AvatarBadge = (props: AvatarBadgeProps) => {
  const others = omit(props, "class")
  return (
    <span
      class={cn(
        "cn-avatar-badge absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        props.class
      )}
      data-slot="avatar-badge"
      {...others}
    />
  )
}

type AvatarGroupProps = ComponentProps<"div">

const AvatarGroup = (props: AvatarGroupProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn(
        "cn-avatar-group group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        props.class
      )}
      data-slot="avatar-group"
      {...others}
    />
  )
}

type AvatarGroupCountProps = ComponentProps<"div">

const AvatarGroupCount = (props: AvatarGroupCountProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn(
        "cn-avatar-group-count relative flex shrink-0 items-center justify-center ring-2 ring-background",
        props.class
      )}
      data-slot="avatar-group-count"
      {...others}
    />
  )
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
