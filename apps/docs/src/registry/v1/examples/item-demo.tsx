import { IconBadgeCheck, IconChevronRight } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "~/registry/v1/ui/item"

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
        <ItemMedia>
          <IconBadgeCheck class="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <IconChevronRight class="size-4" />
        </ItemActions>
      </Item>
    </div>
  )
}
