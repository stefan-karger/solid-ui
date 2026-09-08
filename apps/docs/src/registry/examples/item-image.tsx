import { For } from "solid-js"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

const tracks = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45"
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05"
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30"
  }
]

export default function ItemImage() {
  return (
    <div class="flex w-full max-w-md flex-col gap-6">
      <ItemGroup class="gap-4">
        <For each={tracks}>
          {(track) => (
            <Item as="a" href="#" role="listitem" variant="outline">
              <ItemMedia variant="image">
                <img
                  alt={track.title}
                  class="grayscale"
                  src={`https://avatar.vercel.sh/${track.title}`}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle class="line-clamp-1">
                  {track.title} - <span class="text-muted-foreground">{track.album}</span>
                </ItemTitle>
                <ItemDescription>{track.artist}</ItemDescription>
              </ItemContent>
              <ItemContent class="flex-none text-center">
                <ItemDescription>{track.duration}</ItemDescription>
              </ItemContent>
            </Item>
          )}
        </For>
      </ItemGroup>
    </div>
  )
}
