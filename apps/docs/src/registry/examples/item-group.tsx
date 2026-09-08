import { PlusIcon } from "lucide-solid"
import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

const people = [
  {
    username: "stefan-karger",
    avatar: "https://github.com/stefan-karger.png",
    twitter: "@stefan_e_k"
  },
  {
    username: "carere",
    avatar: "https://github.com/carere.png",
    twitter: "@carere_dev"
  },
  {
    username: "ryansolid",
    avatar: "https://github.com/ryansolid.png",
    twitter: "@RyanCarniato"
  }
]

export default function ItemGroupExample() {
  return (
    <ItemGroup class="max-w-sm">
      <For each={people}>
        {(person) => (
          <Item variant="outline">
            <ItemMedia>
              <img
                alt={`@${person.username}`}
                class="size-8 rounded-full object-cover grayscale"
                src={person.avatar}
              />
            </ItemMedia>
            <ItemContent class="gap-1">
              <ItemTitle>{person.username}</ItemTitle>
              <ItemDescription>{person.twitter}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button class="rounded-full" size="icon" variant="ghost">
                <PlusIcon class="size-4" />
              </Button>
            </ItemActions>
          </Item>
        )}
      </For>
    </ItemGroup>
  )
}
