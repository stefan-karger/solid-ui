// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                  class="size-4"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </Button>
            </ItemActions>
          </Item>
        )}
      </For>
    </ItemGroup>
  )
}
