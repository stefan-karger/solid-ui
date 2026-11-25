// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

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
          <img
            alt="@ryansolid"
            class="size-10 rounded-full object-cover grayscale"
            src="https://github.com/ryansolid.png"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Ryan Carniato</ItemTitle>
          <ItemDescription>Last seen 5 minutes ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            aria-label="Invite"
            class="rounded-full"
            size="icon-sm"
            variant="outline"
          >
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

      <Item variant="outline">
        <ItemMedia>
          <div class="flex -space-x-2 [&>img]:ring-2 [&>img]:ring-background [&>img]:grayscale">
            <img
              alt="@stefan-karger"
              class="hidden size-8 rounded-full object-cover sm:block"
              src="https://github.com/stefan-karger.png"
            />
            <img
              alt="@carere"
              class="hidden size-8 rounded-full object-cover sm:block"
              src="https://github.com/carere.png"
            />
            <img
              alt="@ryansolid"
              class="size-8 rounded-full object-cover"
              src="https://github.com/ryansolid.png"
            />
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>
            Invite your team to collaborate on this project.
          </ItemDescription>
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
