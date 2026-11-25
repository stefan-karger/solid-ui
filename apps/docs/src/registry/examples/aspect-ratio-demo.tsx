import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div class="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} class="rounded-lg bg-muted">
        <img
          src="/solid-brand/launch-light.svg"
          alt="Solid logo artwork"
          class="size-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  )
}
