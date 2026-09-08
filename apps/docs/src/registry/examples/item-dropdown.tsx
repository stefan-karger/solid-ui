import { ChevronDownIcon } from "lucide-solid"
import { For } from "solid-js"

import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "~/registry/ui/item"

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

export default function ItemDropdown() {
  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Select
        <ChevronDownIcon class="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuGroup>
          <For each={people}>
            {(person) => (
              <DropdownMenuItem class="p-0">
                <Item class="w-full p-2" size="xs">
                  <ItemMedia>
                    <Avatar class="size-6.5">
                      <AvatarImage src={person.avatar} class="grayscale" />
                      <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent class="gap-0">
                    <ItemTitle>{person.username}</ItemTitle>
                    <ItemDescription class="leading-none">{person.twitter}</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuItem>
            )}
          </For>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
