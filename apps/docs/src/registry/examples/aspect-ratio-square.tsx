import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioSquare() {
  return (
    <div class="w-full max-w-[12rem]">
      <AspectRatio ratio={1 / 1} class="rounded-lg bg-muted">
        <img
          src="/solid-brand/launch-light.svg"
          alt="Solid logo artwork"
          class="size-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  )
}
