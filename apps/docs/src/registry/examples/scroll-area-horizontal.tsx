import { For } from "solid-js"
import { ScrollArea, ScrollBar } from "~/registry/ui/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export default function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea class="w-96 rounded-md border whitespace-nowrap">
      <div class="flex w-max space-x-4 p-4">
        <For each={works}>
          {(artwork) => (
            <figure id={artwork.artist} class="shrink-0">
              <div class="overflow-hidden rounded-md">
                <img
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  class="aspect-[3/4] h-fit w-fit object-cover"
                  width={300}
                  height={400}
                />
              </div>
              <figcaption class="pt-2 text-xs text-muted-foreground">
                Photo by{" "}
                <span class="font-semibold text-foreground">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          )}
        </For>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
