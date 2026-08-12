import { ChevronDownIcon } from "lucide-solid"
import { For } from "solid-js"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/registry/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "~/registry/ui/item"

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

export default function ItemDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button<"button">} variant="outline">
        Select <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-48 items-end">
        <DropdownMenuGroup>
          <For each={people}>
            {(person) => (
              <DropdownMenuItem id={person.username}>
                <Item size="xs" class="w-full p-2">
                  <ItemMedia>
                    <Avatar class="size-[--spacing(6.5)]">
                      <AvatarImage src={person.avatar} class="grayscale" />
                      <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent class="gap-0">
                    <ItemTitle>{person.username}</ItemTitle>
                    <ItemDescription class="leading-none">
                      {person.email}
                    </ItemDescription>
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
