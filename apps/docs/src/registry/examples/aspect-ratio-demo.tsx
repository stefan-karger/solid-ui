import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div class="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} class="rounded-lg bg-muted">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          class="size-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  )
}
