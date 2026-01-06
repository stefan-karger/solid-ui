import { AspectRatio } from "~/registry/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        alt="by Drew Beamer"
        class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      />
    </AspectRatio>
  )
}
