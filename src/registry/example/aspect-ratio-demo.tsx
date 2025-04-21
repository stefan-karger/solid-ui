import { AspectRatio } from "~/registry/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <AspectRatio class="bg-muted" ratio={16 / 9}>
      <img
        alt="By Drew Beamer"
        class="size-full rounded-md object-cover"
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      />
    </AspectRatio>
  );
}
