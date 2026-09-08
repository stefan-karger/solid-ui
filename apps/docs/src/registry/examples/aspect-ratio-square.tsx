import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioSquare() {
  return (
    <div class="w-full max-w-[12rem]">
      <AspectRatio ratio={1 / 1} class="rounded-lg bg-muted">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          class="size-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  )
}
