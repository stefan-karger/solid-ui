import { BadgeCheckIcon, ChevronRightIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

export default function ItemDemo() {
  return (
    <div class="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Action
          </Button>
        </ItemActions>
      </Item>

      <Item as="a" href="#" size="sm" variant="outline">
        <ItemMedia variant="icon">
          <BadgeCheckIcon class="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon class="size-4" />
        </ItemActions>
      </Item>
    </div>
  )
}
