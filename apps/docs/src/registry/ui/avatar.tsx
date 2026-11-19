import { type ComponentProps } from "@solidjs/web"
import {
  Avatar as SdkAvatar,
  AvatarImage as SdkAvatarImage,
  AvatarFallback as SdkAvatarFallback
} from "@ui-sdk/solid/avatar"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
type AvatarProps = (Omit<ComponentProps<typeof SdkAvatar>, "class"> & {
  class?: string
}) & {
  size?: "sm" | "default" | "lg"
}
const Avatar = (props: AvatarProps) => {
  const local = merge({ size: "default" } as const, props) as AvatarProps
  const others = omit(props, "class", "size")
  return (
    <SdkAvatar
      class={cn(
        "cn-avatar group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        local.class
      )}
      data-size={local.size}

      {...others}
    />
  )
}
type AvatarImageProps = Omit<ComponentProps<typeof SdkAvatarImage>, "class"> & {
  class?: string
}
const AvatarImage = (props: AvatarImageProps) => (
  <SdkAvatarImage
    {...props}
    class={cn("cn-avatar-image aspect-square size-full object-cover", props.class)}
  />
)
type AvatarFallbackProps = Omit<ComponentProps<typeof SdkAvatarFallback>, "class"> & {
  class?: string
}
const AvatarFallback = (props: AvatarFallbackProps) => (
  <SdkAvatarFallback
    {...props}
    class={cn(
      "cn-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs",
      props.class
    )}
  />
)
type AvatarBadgeProps = ComponentProps<"span">
const AvatarBadge = (props: AvatarBadgeProps) => (
  <span
    data-slot="avatar-badge"
    {...props}
    class={cn(
      "cn-avatar-badge absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
      "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
      "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
      "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
      props.class
    )}
  />
)
type AvatarGroupProps = ComponentProps<"div">
const AvatarGroup = (props: AvatarGroupProps) => (
  <div
    data-slot="avatar-group"
    {...props}
    class={cn(
      "cn-avatar-group group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
      props.class
    )}
  />
)
type AvatarGroupCountProps = ComponentProps<"div">
const AvatarGroupCount = (props: AvatarGroupCountProps) => (
  <div
    data-slot="avatar-group-count"
    {...props}
    class={cn(
      "cn-avatar-group-count relative flex shrink-0 items-center justify-center ring-2 ring-background",
      props.class
    )}
  />
)
export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
