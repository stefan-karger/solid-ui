import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioPortrait() {
  return (
    <AspectRatio class="w-full max-w-[10rem] rounded-lg bg-muted" ratio={9 / 16}>
      <img
        alt="Abstract avatar"
        class="absolute inset-0 size-full rounded-lg object-cover grayscale dark:brightness-20"
        src="https://avatar.vercel.sh/shadcn1"
      />
    </AspectRatio>
  )
}
