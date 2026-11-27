import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarBadgeIconExample() {
  return (
    <Avatar class="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <IconPlaceholder lucide="PlusIcon" />
      </AvatarBadge>
    </Avatar>
  )
}
