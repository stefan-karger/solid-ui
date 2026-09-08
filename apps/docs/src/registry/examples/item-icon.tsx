import { ShieldIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

export default function ItemIcon() {
  return (
    <div class="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldIcon class="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>New login detected from unknown device.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
