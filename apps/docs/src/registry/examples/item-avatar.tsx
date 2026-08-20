import { PlusIcon } from "lucide-solid"

import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

export default function ItemAvatar() {
  return (
    <div class="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia>
          <Avatar class="size-10">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button aria-label="Invite" class="rounded-full" size="icon-sm" variant="outline">
            <PlusIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <div class="-space-x-2 flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
            <Avatar class="hidden sm:flex">
              <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar class="hidden sm:flex">
              <AvatarImage alt="@maxleiter" src="https://github.com/maxleiter.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage alt="@evilrabbit" src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Invite
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
