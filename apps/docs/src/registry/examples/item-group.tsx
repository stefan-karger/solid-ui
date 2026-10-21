import { For } from "solid-js"

import { PlusIcon } from "lucide-solid"

import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
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
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com"
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com"
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com"
  }
]

export default function ItemGroupExample() {
  return (
    <ItemGroup class="max-w-sm">
      <For each={people}>
        {(person) => (
          <Item id={person.username} variant="outline">
            <ItemMedia>
              <Avatar>
                <AvatarImage class="grayscale" src={person.avatar} />
                <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent class="gap-1">
              <ItemTitle>{person.username}</ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button class="rounded-full" size="icon" variant="ghost">
                <PlusIcon />
              </Button>
            </ItemActions>
          </Item>
        )}
      </For>
    </ItemGroup>
  )
}
