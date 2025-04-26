import type { ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as ImagePrimitive from "@kobalte/core/image"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "@/lib/utils"

type AvatarRootProps<T extends ValidComponent = "span"> = ImagePrimitive.ImageRootProps<T> & {
  class?: string | undefined
}

const Avatar = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AvatarRootProps<T>>
) => {
  const [local, others] = splitProps(props as AvatarRootProps, ["class"])
  return (
    <ImagePrimitive.Root
      class={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", local.class)}
      {...others}
    />
  )
}

type AvatarImageProps<T extends ValidComponent = "img"> = ImagePrimitive.ImageImgProps<T> & {
  class?: string | undefined
}

const AvatarImage = <T extends ValidComponent = "img">(
  props: PolymorphicProps<T, AvatarImageProps<T>>
) => {
  const [local, others] = splitProps(props as AvatarImageProps, ["class"])
  return <ImagePrimitive.Img class={cn("aspect-square size-full", local.class)} {...others} />
}

type AvatarFallbackProps<T extends ValidComponent = "span"> =
  ImagePrimitive.ImageFallbackProps<T> & { class?: string | undefined }

const AvatarFallback = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AvatarFallbackProps<T>>
) => {
  const [local, others] = splitProps(props as AvatarFallbackProps, ["class"])
  return (
    <ImagePrimitive.Fallback
      class={cn("flex size-full items-center justify-center bg-muted", local.class)}
      {...others}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
