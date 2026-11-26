import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioPortrait() {
  return (
    <div class="w-full max-w-[10rem]">
      <AspectRatio ratio={9 / 16} class="rounded-lg bg-muted">
        <img
          src="/solid-brand/launch-light.svg"
          alt="Solid logo artwork"
          class="size-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  )
}
